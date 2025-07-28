import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Trophy, Star, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

interface XPAchievementsProps {
  score: number
  challengePoints: number
}

export const XPAchievements = ({ score, challengePoints }: XPAchievementsProps) => {
  const [animatedXP, setAnimatedXP] = useState(0)
  
  // Calculate XP gained based on score and challenge points
  const baseXP = Math.floor((score / 100) * challengePoints)
  const bonusXP = score >= 90 ? 50 : score >= 80 ? 25 : 0
  const totalXPGained = baseXP + bonusXP

  // Mock current level data (would come from user profile in real implementation)
  const currentXP = 1250
  const currentLevel = "Intermediate"
  const nextLevel = "Advanced"
  const xpToNextLevel = 500
  const newXP = currentXP + totalXPGained
  const xpRemaining = Math.max(0, xpToNextLevel - totalXPGained)

  // Mock achievements for demo
  const unlockedAchievements = [
    ...(score >= 90 ? [{
      id: 'perfectionist',
      name: 'Perfeccionista',
      description: 'Obtén una puntuación superior a 90',
      rarity: 'rare',
      icon: '🎯'
    }] : []),
    ...(score >= 80 ? [{
      id: 'high_achiever',
      name: 'Alto Rendimiento',
      description: 'Obtén una puntuación superior a 80',
      rarity: 'uncommon',
      icon: '⭐'
    }] : [])
  ]

  useEffect(() => {
    // Animate XP count up
    const timer = setTimeout(() => {
      const increment = totalXPGained / 30
      let current = 0
      
      const interval = setInterval(() => {
        current += increment
        if (current >= totalXPGained) {
          setAnimatedXP(totalXPGained)
          clearInterval(interval)
        } else {
          setAnimatedXP(Math.floor(current))
        }
      }, 50)
      
      return () => clearInterval(interval)
    }, 1000)

    return () => clearTimeout(timer)
  }, [totalXPGained])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'rare': return 'bg-purple-500/20 text-purple-400 border-purple-500/50'
      case 'uncommon': return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  return (
    <div className="space-y-6">
      {/* XP Gained */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Star className="w-5 h-5 text-primary" />
            Experiencia Ganada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* XP Animation */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                +{animatedXP} XP
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Base: {baseXP} XP</span>
                {bonusXP > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-green-400">Bonus: +{bonusXP} XP</span>
                  </>
                )}
              </div>
            </div>

            {/* Level Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground font-medium">{currentLevel}</span>
                <span className="text-muted-foreground">{nextLevel}</span>
              </div>
              
              <Progress 
                value={(totalXPGained / xpToNextLevel) * 100} 
                className="h-3"
              />
              
              <div className="text-center text-sm text-muted-foreground">
                {xpRemaining > 0 ? (
                  `${xpRemaining} XP para alcanzar ${nextLevel}`
                ) : (
                  <span className="text-green-400 font-medium">
                    ¡Felicidades! Alcanzaste {nextLevel}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      {unlockedAchievements.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Trophy className="w-5 h-5 text-primary" />
              Logros Desbloqueados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unlockedAchievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 animate-pulse"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {achievement.name}
                      </h3>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                  <Zap className="w-5 h-5 text-yellow-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}