import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Play, Pause, Minimize2, Maximize2, RotateCcw } from 'lucide-react'

interface TimerComponentProps {
  timeElapsed: number
  onTimeUpdate: (time: number) => void
  paused: boolean
  onPauseToggle: () => void
}

export const TimerComponent = ({ 
  timeElapsed, 
  onTimeUpdate, 
  paused, 
  onPauseToggle 
}: TimerComponentProps) => {
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {
      onTimeUpdate(timeElapsed + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeElapsed, paused, onTimeUpdate])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const resetTimer = () => {
    onTimeUpdate(0)
  }

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed top-20 right-4 z-40"
      >
        <Card className="p-2 bg-surface/95 backdrop-blur border-border shadow-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">
              {formatTime(timeElapsed)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(false)}
              className="h-6 w-6 p-0"
            >
              <Maximize2 className="w-3 h-3" />
            </Button>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-4 bg-surface/50 backdrop-blur-sm border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            
            <div>
              <div className="text-lg font-mono font-bold text-primary">
                {formatTime(timeElapsed)}
              </div>
              <div className="text-xs text-muted-foreground">
                Tiempo transcurrido
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onPauseToggle}
              className="h-8 w-8 p-0"
            >
              {paused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={resetTimer}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="h-8 w-8 p-0"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress indicator for estimated time */}
        <div className="mt-3">
          <div className="text-xs text-muted-foreground mb-1">
            Progreso estimado
          </div>
          <div className="w-full bg-muted rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min((timeElapsed / (30 * 60)) * 100, 100)}%` // Assuming 30 min estimate
              }}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}