-- Add subscription_start_date to subscribers table to track when premium access begins
ALTER TABLE public.subscribers 
ADD COLUMN subscription_start_date TIMESTAMPTZ;

-- Update existing subscribers to have their subscription start date as today (for existing data)
UPDATE public.subscribers 
SET subscription_start_date = NOW() 
WHERE subscribed = true AND subscription_start_date IS NULL;

-- Add subscription_start_date to profiles table as well for easier querying
ALTER TABLE public.profiles 
ADD COLUMN subscription_start_date TIMESTAMPTZ;

-- Create function to check if user can access challenge based on subscription date
CREATE OR REPLACE FUNCTION public.can_access_challenge_by_date(
  user_uuid uuid,
  challenge_published_date timestamptz
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  user_subscription_start timestamptz;
  is_subscribed boolean := false;
BEGIN
  -- Get user subscription info
  SELECT s.subscribed, s.subscription_start_date
  INTO is_subscribed, user_subscription_start
  FROM subscribers s
  WHERE s.user_id = user_uuid
  AND s.subscribed = true
  AND (s.subscription_end IS NULL OR s.subscription_end > NOW());
  
  -- If not subscribed, return false
  IF NOT is_subscribed THEN
    RETURN false;
  END IF;
  
  -- If no subscription start date (shouldn't happen), allow access
  IF user_subscription_start IS NULL THEN
    RETURN true;
  END IF;
  
  -- Check if challenge was published after subscription start
  RETURN challenge_published_date >= user_subscription_start;
END;
$function$;