export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          created_at: string | null
          criteria: Json
          description: string
          icon_name: string
          id: string
          name: string
          rarity: string | null
          slug: string
          xp_reward: number
        }
        Insert: {
          category: string
          created_at?: string | null
          criteria: Json
          description: string
          icon_name: string
          id?: string
          name: string
          rarity?: string | null
          slug: string
          xp_reward: number
        }
        Update: {
          category?: string
          created_at?: string | null
          criteria?: Json
          description?: string
          icon_name?: string
          id?: string
          name?: string
          rarity?: string | null
          slug?: string
          xp_reward?: number
        }
        Relationships: []
      }
      challenges: {
        Row: {
          category: string
          created_at: string | null
          description: string
          difficulty: string
          evaluation_criteria: Json
          hints: Json | null
          id: string
          is_active: boolean | null
          is_daily_challenge: boolean | null
          points: number
          published_at: string | null
          requirements: Json
          sample_solution: Json | null
          slug: string
          story_context: string
          time_estimate_minutes: number | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          difficulty: string
          evaluation_criteria: Json
          hints?: Json | null
          id?: string
          is_active?: boolean | null
          is_daily_challenge?: boolean | null
          points: number
          published_at?: string | null
          requirements: Json
          sample_solution?: Json | null
          slug: string
          story_context: string
          time_estimate_minutes?: number | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          difficulty?: string
          evaluation_criteria?: Json
          hints?: Json | null
          id?: string
          is_active?: boolean | null
          is_daily_challenge?: boolean | null
          points?: number
          published_at?: string | null
          requirements?: Json
          sample_solution?: Json | null
          slug?: string
          story_context?: string
          time_estimate_minutes?: number | null
          title?: string
        }
        Relationships: []
      }
      level_assessments: {
        Row: {
          answers: Json
          calculated_level: string
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          answers: Json
          calculated_level: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          answers?: Json
          calculated_level?: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "level_assessments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          assessment_answers: Json | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          current_level: string | null
          current_streak: number | null
          display_name: string | null
          github_url: string | null
          id: string
          initial_level_assigned: boolean | null
          is_public: boolean | null
          last_activity_date: string | null
          last_weekly_reset: string | null
          linkedin_url: string | null
          longest_streak: number | null
          onboarding_completed: boolean | null
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string | null
          username: string
          website_url: string | null
          weekly_free_challenges_used: number | null
          xp_total: number | null
        }
        Insert: {
          assessment_answers?: Json | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          current_level?: string | null
          current_streak?: number | null
          display_name?: string | null
          github_url?: string | null
          id: string
          initial_level_assigned?: boolean | null
          is_public?: boolean | null
          last_activity_date?: string | null
          last_weekly_reset?: string | null
          linkedin_url?: string | null
          longest_streak?: number | null
          onboarding_completed?: boolean | null
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          username: string
          website_url?: string | null
          weekly_free_challenges_used?: number | null
          xp_total?: number | null
        }
        Update: {
          assessment_answers?: Json | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          current_level?: string | null
          current_streak?: number | null
          display_name?: string | null
          github_url?: string | null
          id?: string
          initial_level_assigned?: boolean | null
          is_public?: boolean | null
          last_activity_date?: string | null
          last_weekly_reset?: string | null
          linkedin_url?: string | null
          longest_streak?: number | null
          onboarding_completed?: boolean | null
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          username?: string
          website_url?: string | null
          weekly_free_challenges_used?: number | null
          xp_total?: number | null
        }
        Relationships: []
      }
      streak_freezes: {
        Row: {
          created_at: string | null
          id: string
          used_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          used_at: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          used_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "streak_freezes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      submission_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_helpful: boolean | null
          submission_id: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_helpful?: boolean | null
          submission_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_helpful?: boolean | null
          submission_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submission_comments_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submission_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          ai_feedback: Json | null
          attempt_number: number | null
          challenge_id: string | null
          created_at: string | null
          difficulty_level: string | null
          evaluated_at: string | null
          id: string
          points_earned: number | null
          score: number | null
          score_breakdown: Json | null
          status: string | null
          time_taken_seconds: number | null
          user_id: string | null
          workflow_description: string | null
          workflow_json: Json
        }
        Insert: {
          ai_feedback?: Json | null
          attempt_number?: number | null
          challenge_id?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          evaluated_at?: string | null
          id?: string
          points_earned?: number | null
          score?: number | null
          score_breakdown?: Json | null
          status?: string | null
          time_taken_seconds?: number | null
          user_id?: string | null
          workflow_description?: string | null
          workflow_json: Json
        }
        Update: {
          ai_feedback?: Json | null
          attempt_number?: number | null
          challenge_id?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          evaluated_at?: string | null
          id?: string
          points_earned?: number | null
          score?: number | null
          score_breakdown?: Json | null
          status?: string | null
          time_taken_seconds?: number | null
          user_id?: string | null
          workflow_description?: string | null
          workflow_json?: Json
        }
        Relationships: [
          {
            foreignKeyName: "submissions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscribers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      translations: {
        Row: {
          content_id: string | null
          content_type: string
          created_at: string
          id: string
          source_content: string
          source_language: string
          target_language: string
          translated_content: string
          updated_at: string
        }
        Insert: {
          content_id?: string | null
          content_type: string
          created_at?: string
          id?: string
          source_content: string
          source_language?: string
          target_language: string
          translated_content: string
          updated_at?: string
        }
        Update: {
          content_id?: string | null
          content_type?: string
          created_at?: string
          id?: string
          source_content?: string
          source_language?: string
          target_language?: string
          translated_content?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          average_score_last_7: number | null
          created_at: string
          current_difficulty: string | null
          rank_position: number | null
          total_challenges_completed: number | null
          total_points: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          average_score_last_7?: number | null
          created_at?: string
          current_difficulty?: string | null
          rank_position?: number | null
          total_challenges_completed?: number | null
          total_points?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          average_score_last_7?: number | null
          created_at?: string
          current_difficulty?: string | null
          rank_position?: number | null
          total_challenges_completed?: number | null
          total_points?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      reset_weekly_challenges: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
