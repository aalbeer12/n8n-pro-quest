import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { 
  Trophy, 
  Star, 
  Target, 
  TrendingUp,
  Award,
  Zap
} from 'lucide-react'
import { Profile } from '@/types/database'

interface StatsGridProps {
  profile: Profile | null
  globalRank: number | null
  loading: boolean
}

const levelConfig = {
  beginner: { 
    label: 'Principiante', 
    color: 'text-emerald-400',
    icon: Star,
    nextLevel: 'intermediate',
    xpRequired: 1000
  },
  intermediate: { 
    label: 'Intermedio', 
    color: 'text-blue-400',
    icon: Target,
    nextLevel: 'advanced',
    xpRequired: 5000
  },
  advanced: { 
    label: 'Avanzado', 
    color: 'text-purple-400',
    icon: Award,
    nextLevel: 'expert',
    xpRequired: 15000
  },
  expert: { 
    label: 'Experto', 
    color: 'text-gold-400',
    icon: Trophy,
    nextLevel: null,
    xpRequired: null
  }
}

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  progress, 
  loading,
  delay = 0 
}: {
  title: string
  value: string | number
  subtitle?: string
  icon: any
  progress?: number
  loading: boolean
  delay?: number
}) => {
  if (loading) {
    return (
      <Card className="p-6 bg-surface/50 backdrop-blur-sm border-border">
        <div className="space-y-3">
          <div className="h-5 bg-muted animate-pulse rounded w-1/2" />
          <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-3 bg-muted animate-pulse rounded" />
        </div>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="p-6 bg-surface/50 backdrop-blur-sm border-border hover:border-primary/30 transition-colors">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <Icon className="w-5 h-5 text-primary" />
          </div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: delay + 0.2 }}
            className="text-2xl font-bold text-primary"
          >
            {value}
          </motion.div>
          
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          
          {progress !== undefined && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: delay + 0.4 }}
              className="space-y-1"
            >
              <Progress value={progress} className="h-2" />
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export const StatsGrid = ({ profile, globalRank, loading }: StatsGridProps) => {
  const [completedChallenges, setCompletedChallenges] = useState(0)
  const [totalChallenges, setTotalChallenges] = useState(0)
  const [statsLoading, setStatsLoading] = useState(true)

  // Fetch real challenge completion data
  useEffect(() => {
    const fetchChallengeStats = async () => {
      if (!profile?.id) return

      try {
        setStatsLoading(true)

        // Get completed challenges count
        const { data: completedData } = await supabase
          .rpc('get_user_completed_challenges', { user_uuid: profile.id })

        // Get total active challenges
        const { data: totalData } = await supabase
          .rpc('get_total_challenges')

        setCompletedChallenges(completedData || 0)
        setTotalChallenges(totalData || 0)
      } catch (error) {
        console.error('Error fetching challenge stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    fetchChallengeStats()
  }, [profile?.id])

  if (!profile && !loading) return null

  const currentLevel = profile?.current_level || 'beginner'
  const levelInfo = levelConfig[currentLevel]
  const LevelIcon = levelInfo.icon

  // Calculate progress to next level
  const currentXP = profile?.xp_total || 0
  const nextLevelXP = levelInfo.xpRequired
  const progressToNext = nextLevelXP ? Math.min((currentXP / nextLevelXP) * 100, 100) : 100
  const xpToNext = nextLevelXP ? Math.max(nextLevelXP - currentXP, 0) : 0

  // Calculate completion percentage
  const completionPercentage = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0

  const isLoading = loading || statsLoading

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="XP Total"
        value={profile?.xp_total?.toLocaleString() || '0'}
        subtitle={nextLevelXP ? `${xpToNext} XP para ${levelConfig[levelInfo.nextLevel as keyof typeof levelConfig]?.label}` : 'Nivel máximo alcanzado'}
        icon={Zap}
        progress={progressToNext}
        loading={isLoading}
        delay={0}
      />

      <StatCard
        title="Nivel Actual"
        value={levelInfo.label}
        subtitle={`${profile?.current_level || 'beginner'}`}
        icon={LevelIcon}
        loading={isLoading}
        delay={0.1}
      />

      <StatCard
        title="Retos Completados"
        value={completedChallenges.toString()}
        subtitle={`${completionPercentage}% del total disponible`}
        icon={Target}
        progress={completionPercentage}
        loading={isLoading}
        delay={0.2}
      />

      <StatCard
        title="Ranking Global"
        value={globalRank ? `#${globalRank.toLocaleString()}` : '#---'}
        subtitle="Posición mundial"
        icon={TrendingUp}
        loading={isLoading}
        delay={0.3}
      />
    </div>
  )
}