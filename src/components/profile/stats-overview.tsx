import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Flame, Trophy, Target, Medal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface StatsOverviewProps {
  profile: {
    id: string
    xp_total: number
    current_streak: number
    longest_streak: number
    current_level: string
  }
}

interface UserStats {
  totalChallenges: number
  completedChallenges: number
  globalRank: number
  totalUsers: number
}

export const StatsOverview = ({ profile }: StatsOverviewProps) => {
  const [stats, setStats] = useState<UserStats>({
    totalChallenges: 0,
    completedChallenges: 0,
    globalRank: 0,
    totalUsers: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total challenges
        const { count: totalChallenges } = await supabase
          .from('challenges')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)

        // Get user's completed challenges
        const { count: completedChallenges } = await supabase
          .from('submissions')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', profile.id)
          .gte('score', 70) // Consider 70+ as completed

        // Get user rank (simplified - count users with more XP)
        const { count: usersAbove } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gt('xp_total', profile.xp_total)
          .eq('is_public', true)

        // Get total users
        const { count: totalUsers } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('is_public', true)

        setStats({
          totalChallenges: totalChallenges || 0,
          completedChallenges: completedChallenges || 0,
          globalRank: (usersAbove || 0) + 1,
          totalUsers: totalUsers || 0
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [profile.id, profile.xp_total])

  const getLevelProgress = () => {
    // Simple level progression: every 1000 XP is a new level
    const currentLevelXP = Math.floor(profile.xp_total / 1000) * 1000
    const nextLevelXP = currentLevelXP + 1000
    const progress = ((profile.xp_total - currentLevelXP) / 1000) * 100
    const xpToNext = nextLevelXP - profile.xp_total

    return { progress, xpToNext, nextLevelXP }
  }

  const { progress, xpToNext } = getLevelProgress()
  const completionRate = stats.totalChallenges > 0 
    ? Math.round((stats.completedChallenges / stats.totalChallenges) * 100)
    : 0

  const getRankPercentile = () => {
    if (stats.totalUsers === 0) return 0
    return Math.round(((stats.totalUsers - stats.globalRank + 1) / stats.totalUsers) * 100)
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Estadísticas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* XP and Level */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-medium text-foreground">XP Total</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              {profile.xp_total.toLocaleString()}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progreso al siguiente nivel</span>
              <span className="text-muted-foreground">{xpToNext} XP restantes</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Current Streak */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-medium text-foreground">Racha Actual</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-foreground">
              {profile.current_streak}
            </div>
            <div className="text-xs text-muted-foreground">
              Máxima: {profile.longest_streak}
            </div>
          </div>
        </div>

        {/* Challenges Completed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              <span className="font-medium text-foreground">Retos Completados</span>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-foreground">
                {stats.completedChallenges}
              </div>
              <div className="text-xs text-muted-foreground">
                de {stats.totalChallenges}
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tasa de finalización</span>
              <span className="font-medium text-foreground">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
        </div>

        {/* Global Rank */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Medal className="w-5 h-5 text-purple-500" />
            <span className="font-medium text-foreground">Ranking Global</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-foreground">
              #{stats.globalRank}
            </div>
            <Badge variant="secondary" className="text-xs">
              Top {getRankPercentile()}%
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}