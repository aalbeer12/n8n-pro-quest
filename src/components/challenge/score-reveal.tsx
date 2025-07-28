import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface ScoreRevealProps {
  score: number
}

export const ScoreReveal = ({ score }: ScoreRevealProps) => {
  const [displayScore, setDisplayScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Animate score count up
    const timer = setTimeout(() => {
      const increment = score / 50 // 50 steps for smooth animation
      let current = 0
      
      const interval = setInterval(() => {
        current += increment
        if (current >= score) {
          setDisplayScore(score)
          clearInterval(interval)
          
          // Show confetti for high scores
          if (score > 80) {
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 3000)
          }
        } else {
          setDisplayScore(Math.floor(current))
        }
      }, 30)
      
      return () => clearInterval(interval)
    }, 500)

    return () => clearTimeout(timer)
  }, [score])

  const getScoreColor = (score: number) => {
    if (score >= 91) return 'text-purple-500'
    if (score >= 71) return 'text-green-500'
    if (score >= 41) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 91) return 'Perfect!'
    if (score >= 71) return 'Great Job!'
    if (score >= 41) return 'Good Effort'
    return 'Keep Practicing'
  }

  const getGradient = (score: number) => {
    if (score >= 91) return 'from-purple-500 to-yellow-500'
    if (score >= 71) return 'from-green-500 to-emerald-500'
    if (score >= 41) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-rose-500'
  }

  return (
    <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="confetti-animation">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-gradient-to-br ${getGradient(score)} animate-pulse`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="p-8 text-center">
        <div className="mb-6">
          <div className="relative w-48 h-48 mx-auto mb-4">
            {/* Circular progress background */}
            <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
            
            {/* Circular progress fill */}
            <div 
              className={`absolute inset-0 rounded-full border-8 border-transparent bg-gradient-to-r ${getGradient(score)} transition-all duration-1000 ease-out`}
              style={{
                background: `conic-gradient(from 0deg, transparent ${100 - displayScore}%, hsl(var(--primary)) ${100 - displayScore}%)`
              }}
            ></div>
            
            {/* Score display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(score)} transition-colors duration-500`}>
                  {displayScore}
                </div>
                <div className="text-sm text-muted-foreground">/ 100</div>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className={`text-3xl font-bold mb-2 ${getScoreColor(score)} transition-colors duration-500`}>
          {getScoreLabel(score)}
        </h2>
        
        <div className="space-y-2">
          <Progress 
            value={displayScore} 
            className="w-full max-w-md mx-auto h-3"
          />
          <p className="text-sm text-muted-foreground">
            Tu puntuación en este reto
          </p>
        </div>
      </div>
    </Card>
  )
}