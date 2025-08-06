-- Add isPro field to profiles table for simplified subscription management
ALTER TABLE public.profiles 
ADD COLUMN is_pro BOOLEAN NOT NULL DEFAULT false;

-- Create index for better performance
CREATE INDEX idx_profiles_is_pro ON public.profiles(is_pro);

-- Update existing subscribed users to isPro = true based on subscribers table
UPDATE public.profiles 
SET is_pro = true 
WHERE id IN (
  SELECT user_id 
  FROM public.subscribers 
  WHERE subscribed = true 
  AND (subscription_end IS NULL OR subscription_end > NOW())
);