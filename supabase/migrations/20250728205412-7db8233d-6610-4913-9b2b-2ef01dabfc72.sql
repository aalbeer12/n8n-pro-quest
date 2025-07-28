-- Add subscription tracking to profiles
ALTER TABLE public.profiles 
ADD COLUMN subscription_tier TEXT DEFAULT 'free',
ADD COLUMN subscription_end TIMESTAMPTZ,
ADD COLUMN weekly_free_challenges_used INTEGER DEFAULT 0,
ADD COLUMN last_weekly_reset DATE DEFAULT CURRENT_DATE;

-- Create subscribers table for Stripe integration
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT DEFAULT 'free',
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on subscribers
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Policies for subscribers
CREATE POLICY "Users can view own subscription" ON public.subscribers
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Insert subscription" ON public.subscribers
FOR INSERT WITH CHECK (true);

CREATE POLICY "Update subscription" ON public.subscribers
FOR UPDATE USING (true);

-- Update submissions to include score and level tracking
ALTER TABLE public.submissions 
ADD COLUMN points_earned INTEGER DEFAULT 0,
ADD COLUMN difficulty_level TEXT;

-- Create user_stats table for ranking system
CREATE TABLE public.user_stats (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  current_difficulty TEXT DEFAULT 'easy',
  total_challenges_completed INTEGER DEFAULT 0,
  average_score_last_7 DECIMAL(5,2) DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  rank_position INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on user_stats
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Policies for user_stats
CREATE POLICY "Users can view own stats" ON public.user_stats
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own stats" ON public.user_stats
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own stats" ON public.user_stats
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Public stats viewable by everyone" ON public.user_stats
FOR SELECT USING (EXISTS (
  SELECT 1 FROM profiles WHERE profiles.id = user_stats.user_id AND profiles.is_public = true
));

-- Create function to update user stats after submission
CREATE OR REPLACE FUNCTION update_user_stats_after_submission()
RETURNS TRIGGER AS $$
DECLARE
  avg_score DECIMAL(5,2);
  total_completed INTEGER;
  new_difficulty TEXT;
BEGIN
  -- Calculate average score of last 7 submissions
  SELECT COALESCE(AVG(score), 0) INTO avg_score
  FROM (
    SELECT score 
    FROM submissions 
    WHERE user_id = NEW.user_id AND score IS NOT NULL
    ORDER BY created_at DESC 
    LIMIT 7
  ) recent_scores;

  -- Count total completed challenges
  SELECT COUNT(*) INTO total_completed
  FROM submissions 
  WHERE user_id = NEW.user_id AND score IS NOT NULL;

  -- Determine new difficulty level
  SELECT current_difficulty INTO new_difficulty
  FROM user_stats 
  WHERE user_id = NEW.user_id;
  
  IF new_difficulty IS NULL THEN
    new_difficulty := 'easy';
  END IF;

  -- Level progression logic
  IF avg_score >= 90 THEN
    CASE new_difficulty
      WHEN 'easy' THEN new_difficulty := 'medium';
      WHEN 'medium' THEN new_difficulty := 'hard';
      WHEN 'hard' THEN new_difficulty := 'expert';
      ELSE new_difficulty := new_difficulty;
    END CASE;
  ELSIF avg_score < 55 THEN
    CASE new_difficulty
      WHEN 'expert' THEN new_difficulty := 'hard';
      WHEN 'hard' THEN new_difficulty := 'medium';
      WHEN 'medium' THEN new_difficulty := 'easy';
      ELSE new_difficulty := new_difficulty;
    END CASE;
  END IF;

  -- Upsert user stats
  INSERT INTO user_stats (
    user_id, 
    current_difficulty, 
    total_challenges_completed, 
    average_score_last_7,
    total_points,
    updated_at
  ) VALUES (
    NEW.user_id, 
    new_difficulty, 
    total_completed, 
    avg_score,
    COALESCE(NEW.points_earned, 0),
    now()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    current_difficulty = new_difficulty,
    total_challenges_completed = total_completed,
    average_score_last_7 = avg_score,
    total_points = user_stats.total_points + COALESCE(NEW.points_earned, 0),
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic stats update
CREATE TRIGGER update_user_stats_trigger
  AFTER INSERT OR UPDATE ON submissions
  FOR EACH ROW
  WHEN (NEW.score IS NOT NULL)
  EXECUTE FUNCTION update_user_stats_after_submission();

-- Function to reset weekly free challenges
CREATE OR REPLACE FUNCTION reset_weekly_challenges()
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET weekly_free_challenges_used = 0,
      last_weekly_reset = CURRENT_DATE
  WHERE last_weekly_reset < CURRENT_DATE - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;