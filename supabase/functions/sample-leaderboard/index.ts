-- Function to create sample leaderboard data when the ranking is empty
-- This will be called dynamically when needed rather than inserting static data

CREATE OR REPLACE FUNCTION public.get_sample_leaderboard()
RETURNS TABLE (
  rank_position INTEGER,
  display_name TEXT,
  xp_total INTEGER,
  current_level TEXT,
  current_streak INTEGER
) 
LANGUAGE SQL
STABLE
AS $$
  -- Return sample data if no real users exist, otherwise return actual data
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
  FROM 
    CASE 
      WHEN (SELECT COUNT(*) FROM real_users) < 10 THEN sample_data
      ELSE real_users
    END
  ORDER BY 
    CASE 
      WHEN (SELECT COUNT(*) FROM real_users) < 10 THEN sample_data.rank_position
      ELSE real_users.rank_pos 
    END
  LIMIT 20;
$$;