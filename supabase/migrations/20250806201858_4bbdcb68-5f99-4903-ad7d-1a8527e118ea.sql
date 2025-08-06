-- Create seed users in auth.users table first, then link to profiles
-- Note: We'll create a simpler approach by just inserting sample profiles that reference existing user structure

-- First, let's create some sample user stats data to populate the leaderboard
-- We'll use existing users if any, or create sample data differently

-- Insert sample user stats for demonstration (using placeholder UUIDs that won't conflict)
INSERT INTO public.user_stats (
  user_id, 
  current_difficulty, 
  total_challenges_completed, 
  average_score_last_7,
  total_points,
  rank_position,
  updated_at
) VALUES
-- Generate sample stats that will make the leaderboard look populated
('00000000-0000-0000-0000-000000000001', 'expert', 45, 92.5, 2850, 1, now()),
('00000000-0000-0000-0000-000000000002', 'advanced', 38, 88.2, 2650, 2, now()),
('00000000-0000-0000-0000-000000000003', 'advanced', 35, 85.7, 2400, 3, now()),
('00000000-0000-0000-0000-000000000004', 'advanced', 32, 82.1, 2200, 4, now()),
('00000000-0000-0000-0000-000000000005', 'intermediate', 28, 78.9, 2050, 5, now()),
('00000000-0000-0000-0000-000000000006', 'intermediate', 25, 75.3, 1950, 6, now()),
('00000000-0000-0000-0000-000000000007', 'intermediate', 22, 72.6, 1800, 7, now()),
('00000000-0000-0000-0000-000000000008', 'intermediate', 20, 69.4, 1650, 8, now()),
('00000000-0000-0000-0000-000000000009', 'intermediate', 18, 66.8, 1500, 9, now()),
('00000000-0000-0000-0000-000000000010', 'beginner', 16, 63.2, 1350, 10, now()),
('00000000-0000-0000-0000-000000000011', 'beginner', 14, 59.7, 1200, 11, now()),
('00000000-0000-0000-0000-000000000012', 'beginner', 12, 56.1, 1100, 12, now()),
('00000000-0000-0000-0000-000000000013', 'beginner', 10, 52.8, 950, 13, now()),
('00000000-0000-0000-0000-000000000014', 'beginner', 9, 49.3, 850, 14, now()),
('00000000-0000-0000-0000-000000000015', 'beginner', 8, 45.9, 750, 15, now()),
('00000000-0000-0000-0000-000000000016', 'beginner', 7, 42.4, 650, 16, now()),
('00000000-0000-0000-0000-000000000017', 'beginner', 6, 38.7, 550, 17, now()),
('00000000-0000-0000-0000-000000000018', 'beginner', 5, 35.2, 450, 18, now()),
('00000000-0000-0000-0000-000000000019', 'beginner', 4, 31.6, 350, 19, now()),
('00000000-0000-0000-0000-000000000020', 'beginner', 3, 28.1, 250, 20, now())
ON CONFLICT (user_id) DO NOTHING;