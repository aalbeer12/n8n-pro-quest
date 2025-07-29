-- Add a function to calculate user completed challenges
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add a function to calculate total available challenges
CREATE OR REPLACE FUNCTION public.get_total_challenges()
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM challenges
    WHERE is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;