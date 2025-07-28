-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  xp_total INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  current_level TEXT DEFAULT 'beginner' CHECK (current_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Challenges table
CREATE TABLE public.challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  story_context TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard', 'expert')),
  category TEXT NOT NULL CHECK (category IN ('data-processing', 'api-integration', 'workflow-logic', 'error-handling', 'optimization')),
  points INTEGER NOT NULL,
  time_estimate_minutes INTEGER,
  requirements JSONB NOT NULL,
  evaluation_criteria JSONB NOT NULL,
  hints JSONB DEFAULT '[]'::jsonb,
  sample_solution JSONB,
  is_active BOOLEAN DEFAULT false,
  is_daily_challenge BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Submissions table
CREATE TABLE public.submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  workflow_json JSONB NOT NULL,
  workflow_description TEXT,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  score_breakdown JSONB,
  ai_feedback JSONB,
  time_taken_seconds INTEGER,
  attempt_number INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'evaluating', 'completed', 'error')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  evaluated_at TIMESTAMPTZ,
  UNIQUE(user_id, challenge_id, attempt_number)
);

-- Achievements table
CREATE TABLE public.achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  category TEXT NOT NULL,
  xp_reward INTEGER NOT NULL,
  criteria JSONB NOT NULL,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User achievements junction
CREATE TABLE public.user_achievements (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);

-- Streak freezes (for vacation mode)
CREATE TABLE public.streak_freezes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  used_at DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments for community interaction
CREATE TABLE public.submission_comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_helpful BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_submissions_user_challenge ON public.submissions(user_id, challenge_id);
CREATE INDEX idx_submissions_status ON public.submissions(status);
CREATE INDEX idx_challenges_active ON public.challenges(is_active);
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_xp ON public.profiles(xp_total DESC);

-- Row Level Security Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streak_freezes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_comments ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all public profiles, update only their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (is_public = true);
  
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
  
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Challenges: Everyone can read active challenges
CREATE POLICY "Active challenges are viewable by everyone" ON public.challenges
  FOR SELECT USING (is_active = true);

-- Submissions: Users can manage their own, view others on public profiles
CREATE POLICY "Users can create own submissions" ON public.submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can view own submissions" ON public.submissions
  FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "View submissions of public profiles" ON public.submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = submissions.user_id 
      AND profiles.is_public = true
    )
  );

-- Achievements: Everyone can read
CREATE POLICY "Achievements are viewable by everyone" ON public.achievements
  FOR SELECT TO authenticated USING (true);

-- User achievements: Users can view their own and others on public profiles
CREATE POLICY "Users can view own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "View achievements of public profiles" ON public.user_achievements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = user_achievements.user_id 
      AND profiles.is_public = true
    )
  );

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'username', 'user_' || substring(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();