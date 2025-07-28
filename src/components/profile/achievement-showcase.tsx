import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Trophy, Star, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface AchievementShowcaseProps {
  userId: string
}

interface Achievement {
  id: string
  name: string
  description: string
  icon_name: string
  rarity: string
  xp_reward: number
  unlocked_at?: string
}

export const AchievementShowcase = ({ userId }: AchievementShowcaseProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // Get user's unlocked achievements
        const { data: userAchievements, error } = await supabase
          .from('user_achievements')
          .select(`
            unlocked_at,
            achievements!inner(
              id,
              name,
              description,
              icon_name,
              rarity,
              xp_reward
            )
          `)
          .eq('user_id', userId)
          .order('unlocked_at', { ascending: false })

        if (error) {
          console.error('Error fetching achievements:', error)
          return
        }

        const processedAchievements = userAchievements?.map(ua => ({
          ...(Array.isArray(ua.achievements) ? ua.achievements[0] : ua.achievements),
          unlocked_at: ua.unlocked_at
        })) || []

        setAchievements(processedAchievements)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [userId])

  const getRarityColor = (rarity: string) => {
    switch (rarity?.toLowerCase()) {
      case 'legendary': return 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
      case 'epic': return 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
      case 'rare': return 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
      case 'uncommon': return 'bg-gradient-to-br from-green-500 to-emerald-500 text-white'
      default: return 'bg-gradient-to-br from-gray-500 to-slate-500 text-white'
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity?.toLowerCase()) {
      case 'legendary': return 'border-yellow-400 shadow-yellow-400/20'
      case 'epic': return 'border-purple-500 shadow-purple-500/20'
      case 'rare': return 'border-blue-500 shadow-blue-500/20'
      case 'uncommon': return 'border-green-500 shadow-green-500/20'
      default: return 'border-gray-500 shadow-gray-500/20'
    }
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return Trophy
      case 'star': return Star
      case 'award': return Award
      default: return Trophy
    }
  }

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle>Logros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (achievements.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Logros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Sin logros aún
            </h3>
            <p className="text-muted-foreground">
              Completa retos para desbloquear tus primeros logros
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalXpFromAchievements = achievements.reduce((sum, achievement) => sum + achievement.xp_reward, 0)

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <span>Logros ({achievements.length})</span>
          <Badge variant="secondary">
            {totalXpFromAchievements} XP total
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements.slice(0, 12).map((achievement) => {
            const IconComponent = getIconComponent(achievement.icon_name)
            
            return (
              <div
                key={achievement.id}
                className={`
                  relative p-4 rounded-lg border-2 shadow-lg transition-all hover:scale-105 
                  ${getRarityBorder(achievement.rarity)}
                  bg-card/80 backdrop-blur-sm
                `}
              >
                {/* Rarity badge */}
                <Badge 
                  className={`absolute -top-2 -right-2 text-xs ${getRarityColor(achievement.rarity)}`}
                >
                  {achievement.rarity}
                </Badge>

                {/* Achievement icon */}
                <div className="text-center mb-2">
                  <div className={`
                    w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2
                    ${getRarityColor(achievement.rarity)}
                  `}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <h4 className="font-semibold text-sm text-foreground leading-tight">
                    {achievement.name}
                  </h4>
                </div>

                {/* Achievement details */}
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3" />
                    <span>{achievement.xp_reward} XP</span>
                  </div>
                  
                  {achievement.unlocked_at && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(achievement.unlocked_at).toLocaleDateString('es-ES')}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {achievements.length > 12 && (
          <div className="text-center mt-6">
            <Button variant="outline">
              Ver todos los logros ({achievements.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}