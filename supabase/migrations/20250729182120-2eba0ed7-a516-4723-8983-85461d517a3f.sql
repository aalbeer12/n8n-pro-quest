-- Fix the remaining functions
CREATE OR REPLACE FUNCTION public.update_user_stats_after_submission()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  avg_score DECIMAL(5,2);
  total_completed INTEGER;
  new_difficulty TEXT;
BEGIN
  -- Calculate average score of last 7 submissions
  SELECT COALESCE(AVG(score), 0) INTO avg_score
  FROM (
    SELECT score 
    FROM public.submissions 
    WHERE user_id = NEW.user_id AND score IS NOT NULL
    ORDER BY created_at DESC 
    LIMIT 7
  ) recent_scores;

  -- Count total completed challenges
  SELECT COUNT(*) INTO total_completed
  FROM public.submissions 
  WHERE user_id = NEW.user_id AND score IS NOT NULL;

  -- Determine new difficulty level
  SELECT current_difficulty INTO new_difficulty
  FROM public.user_stats 
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
  INSERT INTO public.user_stats (
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
    total_points = public.user_stats.total_points + COALESCE(NEW.points_earned, 0),
    updated_at = now();

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.reset_weekly_challenges()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.profiles 
  SET weekly_free_challenges_used = 0,
      last_weekly_reset = CURRENT_DATE
  WHERE last_weekly_reset < CURRENT_DATE - INTERVAL '7 days';
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'username', 'user_' || substring(NEW.id::text, 1, 8)),
    COALESCE(
      NEW.raw_user_meta_data ->> 'first_name',
      NEW.raw_user_meta_data ->> 'display_name', 
      NEW.email
    )
  );
  RETURN NEW;
END;
$function$;