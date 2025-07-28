import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Star, Award, Crown } from 'lucide-react'
import { UserAchievement } from '@/types/database'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

interface AchievementsShowcaseProps {
  achievements: UserAchievement[]
  loading: boolean
}

const rarityConfig = {
  common: { color: 'text-gray-400', bg: 'bg-gray-500/20', icon: Star },
  rare: { color: 'text-blue-400', bg: 'bg-blue-500/20', icon: Award },
  epic: { color: 'text-purple-400', bg: 'bg-purple-500/20', icon: Trophy },
  legendary: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: Crown }
}

export const AchievementsShowcase = ({ achievements, loading }: AchievementsShowcaseProps) => {
  if (loading) {
    return (
      <Card className="p-6 bg-surface/50 backdrop-blur-sm border-border">
        <div className="space-y-4">
          <div className="h-6 bg-muted animate-pulse rounded w-1/2" />
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-surface/50 backdrop-blur-sm border-border">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Logros Recientes</h3>
        
        {achievements.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No hay logros aún</p>
            <p className="text-sm">¡Completa retos para desbloquear logros!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {achievements.map((userAchievement, index) => {
              const achievement = userAchievement.achievement
              const rarity = rarityConfig[achievement.rarity]
              const RarityIcon = rarity.icon

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${rarity.bg} border-current/20`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${rarity.bg} ${rarity.color}`}>
                      <RarityIcon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-primary">{achievement.name}</h4>
                        <Badge variant="outline" className={`${rarity.color} border-current/30`}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      
                      <p className="text-xs text-muted-foreground">
                        Desbloqueado {formatDistanceToNow(new Date(userAchievement.unlocked_at), {
                          addSuffix: true,
                          locale: es
                        })}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium text-warning">
                        +{achievement.xp_reward} XP
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
        
        {achievements.length > 0 && (
          <div className="pt-2 border-t border-border">
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              Ver todos los logros →
            </button>
          </div>
        )}
      </div>
    </Card>
  )
}