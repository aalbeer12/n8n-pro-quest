-- Phase 1: Rolling 7-day free logic support
-- 1) Ensure column exists on profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS weekly_challenge_unlocked_at TIMESTAMPTZ;

-- 2) Create or replace function implementing rolling 7-day logic for free users
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
      -- Increment weekly free challenges used (legacy counter)
      UPDATE public.profiles 
      SET weekly_free_challenges_used = COALESCE(weekly_free_challenges_used, 0) + 1
      WHERE id = NEW.user_id;

      -- Set rolling unlock timestamp if not already set within the last 7 days
      UPDATE public.profiles
      SET weekly_challenge_unlocked_at = NOW()
      WHERE id = NEW.user_id
        AND (
          weekly_challenge_unlocked_at IS NULL 
          OR weekly_challenge_unlocked_at < NOW() - INTERVAL '7 days'
        );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 3) Attach trigger to submissions to keep counters in sync (idempotent)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'trg_update_weekly_free_usage'
  ) THEN
    CREATE TRIGGER trg_update_weekly_free_usage
    AFTER INSERT ON public.submissions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_weekly_free_usage();
  END IF;
END $$;