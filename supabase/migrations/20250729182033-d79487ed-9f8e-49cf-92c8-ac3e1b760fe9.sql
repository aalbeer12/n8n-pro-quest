-- Fix the existing functions to have proper search_path
CREATE OR REPLACE FUNCTION public.get_user_completed_challenges(user_uuid uuid)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN (
    SELECT COUNT(DISTINCT challenge_id)
    FROM public.submissions
    WHERE user_id = user_uuid
    AND status = 'completed'
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_total_challenges()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM public.challenges
    WHERE is_active = true
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_weekly_free_usage()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Only update for free users (no active subscription)
  IF NOT EXISTS (
    SELECT 1 FROM public.subscribers 
    WHERE user_id = NEW.user_id 
    AND subscribed = true 
    AND (subscription_end IS NULL OR subscription_end > NOW())
  ) THEN
    -- Check if this is a new challenge submission (not a retry)
    IF NOT EXISTS (
      SELECT 1 FROM public.submissions 
      WHERE user_id = NEW.user_id 
      AND challenge_id = NEW.challenge_id 
      AND id != NEW.id
    ) THEN
      -- Increment weekly free challenges used
      UPDATE public.profiles 
      SET weekly_free_challenges_used = COALESCE(weekly_free_challenges_used, 0) + 1
      WHERE id = NEW.user_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Update the new function as well
CREATE OR REPLACE FUNCTION public.can_access_challenge_by_date(
  user_uuid uuid,
  challenge_published_date timestamptz
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  user_subscription_start timestamptz;
  is_subscribed boolean := false;
BEGIN
  -- Get user subscription info
  SELECT s.subscribed, s.subscription_start_date
  INTO is_subscribed, user_subscription_start
  FROM public.subscribers s
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