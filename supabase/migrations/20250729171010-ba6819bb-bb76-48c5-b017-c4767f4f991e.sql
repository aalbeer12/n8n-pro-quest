-- Update subscription tracking when challenges are submitted
CREATE OR REPLACE FUNCTION public.update_weekly_free_usage()
RETURNS trigger AS $$
BEGIN
  -- Only update for free users (no active subscription)
  IF NOT EXISTS (
    SELECT 1 FROM subscribers 
    WHERE user_id = NEW.user_id 
    AND subscribed = true 
    AND (subscription_end IS NULL OR subscription_end > NOW())
  ) THEN
    -- Check if this is a new challenge submission (not a retry)
    IF NOT EXISTS (
      SELECT 1 FROM submissions 
      WHERE user_id = NEW.user_id 
      AND challenge_id = NEW.challenge_id 
      AND id != NEW.id
    ) THEN
      -- Increment weekly free challenges used
      UPDATE profiles 
      SET weekly_free_challenges_used = COALESCE(weekly_free_challenges_used, 0) + 1
      WHERE id = NEW.user_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger to update weekly usage
DROP TRIGGER IF EXISTS trigger_update_weekly_free_usage ON submissions;
CREATE TRIGGER trigger_update_weekly_free_usage
  AFTER INSERT ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_weekly_free_usage();