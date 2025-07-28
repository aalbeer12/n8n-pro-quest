export interface Profile {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  github_url: string | null
  linkedin_url: string | null
  website_url: string | null
  xp_total: number
  current_streak: number
  longest_streak: number
  last_activity_date: string | null
  current_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface Challenge {
  id: string
  slug: string
  title: string
  description: string
  story_context: string
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  category: 'data-processing' | 'api-integration' | 'workflow-logic' | 'error-handling' | 'optimization'
  points: number
  time_estimate_minutes: number | null
  requirements: any
  evaluation_criteria: any
  hints: any[]
  sample_solution: any | null
  is_active: boolean
  is_daily_challenge: boolean
  published_at: string | null
  created_at: string
}

export interface Submission {
  id: string
  user_id: string
  challenge_id: string
  workflow_json: any
  workflow_description: string | null
  score: number | null
  score_breakdown: any | null
  ai_feedback: any | null
  time_taken_seconds: number | null
  attempt_number: number
  status: 'pending' | 'evaluating' | 'completed' | 'error'
  created_at: string
  evaluated_at: string | null
}

export interface Achievement {
  id: string
  slug: string
  name: string
  description: string
  icon_name: string
  category: string
  xp_reward: number
  criteria: any
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  created_at: string
}

export interface UserAchievement {
  user_id: string
  achievement_id: string
  unlocked_at: string
  achievement: Achievement
}