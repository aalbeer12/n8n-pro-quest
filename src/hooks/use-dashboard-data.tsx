import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Profile, Challenge, Submission, UserAchievement } from '@/types/database'

export const useDashboardData = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [todayChallenge, setTodayChallenge] = useState<Challenge | null>(null)
  const [todaySubmission, setTodaySubmission] = useState<Submission | null>(null)
  const [recentSubmissions, setRecentSubmissions] = useState<Submission[]>([])
  const [recentAchievements, setRecentAchievements] = useState<UserAchievement[]>([])
  const [globalRank, setGlobalRank] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) throw profileError
      setProfile(profileData as Profile)

      // Fetch today's challenge
      const { data: challengeData, error: challengeError } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_daily_challenge', true)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (!challengeError && challengeData) {
        setTodayChallenge(challengeData as Challenge)

        // Check if user already attempted today's challenge
        const today = new Date().toISOString().split('T')[0]
        const { data: submissionData } = await supabase
          .from('submissions')
          .select('*')
          .eq('user_id', user.id)
          .eq('challenge_id', challengeData.id)
          .gte('created_at', today)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        setTodaySubmission(submissionData as Submission)
      }

      // Fetch recent submissions
      const { data: submissionsData } = await supabase
        .from('submissions')
        .select(`
          *,
          challenges:challenge_id (title, difficulty, points)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentSubmissions(submissionsData as Submission[] || [])

      // Fetch recent achievements
      const { data: achievementsData } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievement:achievement_id (*)
        `)
        .eq('user_id', user.id)
        .order('unlocked_at', { ascending: false })
        .limit(3)

      setRecentAchievements(achievementsData as UserAchievement[] || [])

      // Calculate global rank (simplified)
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gt('xp_total', profileData?.xp_total || 0)

      setGlobalRank((count || 0) + 1)

    } catch (err: any) {
      console.error('Error fetching dashboard data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [user])

  const refreshData = () => {
    fetchDashboardData()
  }

  return {
    profile,
    todayChallenge,
    todaySubmission,
    recentSubmissions,
    recentAchievements,
    globalRank,
    loading,
    error,
    refreshData
  }
}