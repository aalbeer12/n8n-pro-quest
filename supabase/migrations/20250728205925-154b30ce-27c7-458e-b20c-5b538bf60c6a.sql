-- Add level assessment fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN assessment_answers JSONB,
ADD COLUMN initial_level_assigned BOOLEAN DEFAULT false;

-- Create level assessment table for tracking
CREATE TABLE public.level_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  calculated_level TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on level_assessments
ALTER TABLE public.level_assessments ENABLE ROW LEVEL SECURITY;

-- Policies for level_assessments
CREATE POLICY "Users can view own assessments" ON public.level_assessments
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own assessments" ON public.level_assessments
FOR INSERT WITH CHECK (user_id = auth.uid());