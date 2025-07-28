import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

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

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchChallenges = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('challenges')
        .select('id, title, description, difficulty, category, points, time_estimate_minutes, slug, is_daily_challenge')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

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