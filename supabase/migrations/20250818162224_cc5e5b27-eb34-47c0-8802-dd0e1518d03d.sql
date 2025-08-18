-- Fix all function search path security warnings
CREATE OR REPLACE FUNCTION public.get_user_completed_challenges(user_uuid uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN (
    SELECT COUNT(DISTINCT challenge_id)
    FROM public.submissions
    WHERE user_id = user_uuid
    AND status = 'completed'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_total_challenges()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM public.challenges
    WHERE is_active = true
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.can_access_challenge_by_date(user_uuid uuid, challenge_published_date timestamp with time zone)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.get_sample_leaderboard()
RETURNS TABLE(rank_position integer, display_name text, xp_total integer, current_level text, current_streak integer)
LANGUAGE plpgsql
STABLE
SET search_path = 'public'
AS $$
BEGIN
  -- Return sample data if no real users exist, otherwise return actual data
  RETURN QUERY
  WITH real_users AS (
    SELECT 
      ROW_NUMBER() OVER (ORDER BY p.xp_total DESC) as rank_pos,
      COALESCE(p.display_name, p.username, 'Usuario') as name,
      p.xp_total,
      p.current_level,
      p.current_streak
    FROM public.profiles p
    WHERE p.is_public = true AND p.xp_total > 0
    ORDER BY p.xp_total DESC
    LIMIT 20
  ),
  sample_data AS (
    SELECT * FROM (VALUES
      (1, 'Alejandro García', 2850, 'expert', 12),
      (2, 'María Rodríguez', 2650, 'advanced', 8),
      (3, 'Carlos López', 2400, 'advanced', 15),
      (4, 'Ana Martínez', 2200, 'advanced', 6),
      (5, 'David Sánchez', 2050, 'intermediate', 11),
      (6, 'Lucía Fernández', 1950, 'intermediate', 9),
      (7, 'Miguel González', 1800, 'intermediate', 14),
      (8, 'Sofía Díaz', 1650, 'intermediate', 7),
      (9, 'Javier Ruiz', 1500, 'intermediate', 10),
      (10, 'Elena Moreno', 1350, 'beginner', 5),
      (11, 'Pablo Jiménez', 1200, 'beginner', 13),
      (12, 'Carmen Álvarez', 1100, 'beginner', 4),
      (13, 'Raúl Romero', 950, 'beginner', 8),
      (14, 'Laura Torres', 850, 'beginner', 6),
      (15, 'Antonio Vargas', 750, 'beginner', 12),
      (16, 'Cristina Ramos', 650, 'beginner', 3),
      (17, 'Fernando Guerrero', 550, 'beginner', 7),
      (18, 'Natalia Iglesias', 450, 'beginner', 5),
      (19, 'Rodrigo Mendoza', 350, 'beginner', 9),
      (20, 'Beatriz Herrera', 250, 'beginner', 2)
    ) AS t(rank_position, display_name, xp_total, current_level, current_streak)
  )
  SELECT 
    CASE 
      WHEN (SELECT COUNT(*) FROM real_users) < 10 THEN sample_data.rank_position
      ELSE real_users.rank_pos::INTEGER 
    END,
    CASE 
      WHEN (SELECT COUNT(*) FROM real_users) < 10 THEN sample_data.display_name
      ELSE real_users.name 
    END,
    CASE 
      WHEN (SELECT COUNT(*) FROM real_users) < 10 THEN sample_data.xp_total
      ELSE real_users.xp_total 
    END,
    CASE 
      WHEN (SELECT COUNT(*) FROM real_users) < 10 THEN sample_data.current_level
      ELSE real_users.current_level 
    END,
    CASE 
      WHEN (SELECT COUNT(*) FROM real_users) < 10 THEN sample_data.current_streak
      ELSE real_users.current_streak 
    END
  FROM (
    SELECT * FROM sample_data
    UNION ALL
    SELECT rank_pos, name, xp_total, current_level, current_streak FROM real_users
  ) AS combined_data
  WHERE (SELECT COUNT(*) FROM real_users) < 10 OR rank_pos IS NOT NULL
  ORDER BY 1
  LIMIT 20;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_weekly_free_usage()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.update_translations_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_user_stats_after_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.reset_weekly_challenges()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  UPDATE public.profiles 
  SET weekly_free_challenges_used = 0,
      last_weekly_reset = CURRENT_DATE
  WHERE last_weekly_reset < CURRENT_DATE - INTERVAL '7 days';
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  generated_username text;
  safe_display_name text;
BEGIN
  -- Generate a unique username
  generated_username := COALESCE(
    NEW.raw_user_meta_data ->> 'username', 
    'user_' || substring(NEW.id::text, 1, 8)
  );
  
  -- Generate a safe display_name that never includes email
  safe_display_name := COALESCE(
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'display_name'
  );
  
  -- If display_name would be an email, set it to NULL instead
  IF safe_display_name IS NOT NULL AND safe_display_name LIKE '%@%' THEN
    safe_display_name := NULL;
  END IF;
  
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (NEW.id, generated_username, safe_display_name);
  
  RETURN NEW;
END;
$$;