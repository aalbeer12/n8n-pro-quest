-- Fix security warnings: Add search_path to existing functions
CREATE OR REPLACE FUNCTION public.get_user_completed_challenges(user_uuid uuid)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COUNT(DISTINCT challenge_id)
    FROM submissions
    WHERE user_id = user_uuid
    AND status = 'completed'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.get_total_challenges()
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM challenges
    WHERE is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';