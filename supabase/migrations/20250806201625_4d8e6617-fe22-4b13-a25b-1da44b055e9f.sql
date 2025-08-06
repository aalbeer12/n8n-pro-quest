-- Create seed data for leaderboard to avoid empty rankings
-- Insert 20 fake users with realistic progression data

INSERT INTO public.profiles (id, username, display_name, xp_total, current_streak, longest_streak, current_level, is_public, created_at) VALUES
(gen_random_uuid(), 'alejandro_dev', 'Alejandro García', 2850, 12, 25, 'expert', true, now() - interval '45 days'),
(gen_random_uuid(), 'maria_automation', 'María Rodríguez', 2650, 8, 18, 'advanced', true, now() - interval '38 days'),
(gen_random_uuid(), 'carlos_flows', 'Carlos López', 2400, 15, 20, 'advanced', true, now() - interval '52 days'),
(gen_random_uuid(), 'ana_n8n', 'Ana Martínez', 2200, 6, 22, 'advanced', true, now() - interval '29 days'),
(gen_random_uuid(), 'david_workflows', 'David Sánchez', 2050, 11, 16, 'intermediate', true, now() - interval '41 days'),
(gen_random_uuid(), 'lucia_integrations', 'Lucía Fernández', 1950, 9, 19, 'intermediate', true, now() - interval '33 days'),
(gen_random_uuid(), 'miguel_apis', 'Miguel González', 1800, 14, 24, 'intermediate', true, now() - interval '47 days'),
(gen_random_uuid(), 'sofia_automation', 'Sofía Díaz', 1650, 7, 15, 'intermediate', true, now() - interval '26 days'),
(gen_random_uuid(), 'javier_code', 'Javier Ruiz', 1500, 10, 17, 'intermediate', true, now() - interval '35 days'),
(gen_random_uuid(), 'elena_flows', 'Elena Moreno', 1350, 5, 13, 'beginner', true, now() - interval '22 days'),
(gen_random_uuid(), 'pablo_dev', 'Pablo Jiménez', 1200, 13, 21, 'beginner', true, now() - interval '44 days'),
(gen_random_uuid(), 'carmen_tech', 'Carmen Álvarez', 1100, 4, 12, 'beginner', true, now() - interval '18 days'),
(gen_random_uuid(), 'raul_automation', 'Raúl Romero', 950, 8, 14, 'beginner', true, now() - interval '31 days'),
(gen_random_uuid(), 'laura_n8n', 'Laura Torres', 850, 6, 11, 'beginner', true, now() - interval '15 days'),
(gen_random_uuid(), 'antonio_dev', 'Antonio Vargas', 750, 12, 16, 'beginner', true, now() - interval '39 days'),
(gen_random_uuid(), 'cristina_flows', 'Cristina Ramos', 650, 3, 9, 'beginner', true, now() - interval '12 days'),
(gen_random_uuid(), 'fernando_api', 'Fernando Guerrero', 550, 7, 10, 'beginner', true, now() - interval '28 days'),
(gen_random_uuid(), 'natalia_code', 'Natalia Iglesias', 450, 5, 8, 'beginner', true, now() - interval '20 days'),
(gen_random_uuid(), 'rodrigo_tech', 'Rodrigo Mendoza', 350, 9, 12, 'beginner', true, now() - interval '36 days'),
(gen_random_uuid(), 'beatriz_dev', 'Beatriz Herrera', 250, 2, 6, 'beginner', true, now() - interval '9 days');

-- Create some realistic submissions for these users
WITH ranked_profiles AS (
  SELECT id, xp_total, 
         ROW_NUMBER() OVER (ORDER BY xp_total DESC) as rank
  FROM public.profiles 
  WHERE username LIKE '%_dev' OR username LIKE '%_automation' OR username LIKE '%_flows'
)
INSERT INTO public.submissions (
  user_id, 
  challenge_id, 
  workflow_json, 
  score, 
  status, 
  points_earned,
  created_at
)
SELECT 
  rp.id,
  (SELECT id FROM public.challenges WHERE is_active = true ORDER BY RANDOM() LIMIT 1),
  '{"version": "1.0", "nodes": [{"id": "start", "type": "start"}]}',
  CASE 
    WHEN rp.rank <= 5 THEN 85 + (RANDOM() * 15)::int
    WHEN rp.rank <= 10 THEN 70 + (RANDOM() * 20)::int  
    WHEN rp.rank <= 15 THEN 60 + (RANDOM() * 25)::int
    ELSE 50 + (RANDOM() * 30)::int
  END,
  'completed',
  CASE 
    WHEN rp.rank <= 5 THEN 150 + (RANDOM() * 50)::int
    WHEN rp.rank <= 10 THEN 100 + (RANDOM() * 50)::int
    ELSE 50 + (RANDOM() * 50)::int
  END,
  NOW() - (RANDOM() * interval '30 days')
FROM ranked_profiles rp
WHERE EXISTS (SELECT 1 FROM public.challenges WHERE is_active = true)
LIMIT 20;