import { motion } from 'framer-motion'
import { Calendar, Flame, Trophy } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Profile } from '@/types/database'

interface StreakSectionProps {
  profile: Profile | null
  loading: boolean
}

export const StreakSection = ({ profile, loading }: StreakSectionProps) => {
  if (loading) {
    return (
      <Card className="p-6 bg-surface/50 backdrop-blur-sm border-border">
        <div className="space-y-4">
          <div className="h-8 bg-muted animate-pulse rounded" />
          <div className="h-20 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
        </div>
      </Card>
    )
  }

  const generateStreakCalendar = () => {
    const days = []
    const today = new Date()
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      // Mock data - in real app, this would come from submissions
      const hasActivity = Math.random() > 0.3
      const isToday = i === 0
      
      days.push({
        date: date.getDate(),
        hasActivity,
        isToday
      })
    }
    
    return days
  }

  const streakDays = generateStreakCalendar()

  return (
    <Card className="p-6 bg-surface/50 backdrop-blur-sm border-border">
      <div className="space-y-4">
        {/* Streak Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">Racha actual</h3>
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Flame className="w-6 h-6 text-warning" />
          </motion.div>
        </div>

        {/* Current Streak */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-4xl font-bold text-primary mb-2"
          >
            {profile?.current_streak || 0}
          </motion.div>
          <p className="text-sm text-muted-foreground">
            días consecutivos
          </p>
        </div>

        {/* Streak Calendar */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>Últimos 30 días</span>
          </div>
          
          <div className="grid grid-cols-10 gap-1">
            {streakDays.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className={`
                  w-3 h-3 rounded-sm transition-colors
                  ${day.isToday 
                    ? 'ring-2 ring-primary ring-offset-1 ring-offset-background' 
                    : ''
                  }
                  ${day.hasActivity 
                    ? 'bg-primary' 
                    : 'bg-muted'
                  }
                `}
                title={`Día ${day.date}`}
              />
            ))}
          </div>
        </div>

        {/* Longest Streak */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Racha más larga:</span>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-warning" />
            <span className="font-medium text-primary">
              {profile?.longest_streak || 0} días
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}