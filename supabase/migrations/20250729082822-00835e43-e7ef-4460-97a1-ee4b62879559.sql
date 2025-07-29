-- Add challenge_type column to support different types of challenges
ALTER TABLE public.challenges 
ADD COLUMN challenge_type TEXT DEFAULT 'workflow' CHECK (challenge_type IN ('workflow', 'text_response'));

-- Add response_text column for text-based challenges
ALTER TABLE public.user_challenge_submissions 
ADD COLUMN response_text TEXT;