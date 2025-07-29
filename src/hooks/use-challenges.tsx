import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from './use-auth'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: string
  category: string
  points: number
  time_estimate_minutes: number | null
  slug: string
  is_daily_challenge: boolean
}

export const useChallenges = (userLevel?: string) => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchChallenges = async () => {
    try {
      setLoading(true)
      
      let query = supabase
        .from('challenges')
        .select('id, title, description, difficulty, category, points, time_estimate_minutes, slug, is_daily_challenge')
        .eq('is_active', true)

      // Filter challenges by user level if provided
      if (userLevel) {
        const levelMap = {
          'beginner': ['easy'],
          'intermediate': ['easy', 'medium'],
          'advanced': ['easy', 'medium', 'hard'],
          'expert': ['easy', 'medium', 'hard', 'expert']
        }
        
        const allowedDifficulties = levelMap[userLevel as keyof typeof levelMap] || ['easy']
        query = query.in('difficulty', allowedDifficulties)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setChallenges(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching challenges')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChallenges()
  }, [])

  return {
    challenges,
    loading,
    error,
    refetch: fetchChallenges
  }
}