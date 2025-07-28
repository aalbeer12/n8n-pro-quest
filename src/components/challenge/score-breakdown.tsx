import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

interface ScoreBreakdownProps {
  breakdown: any
  timeTaken?: number
}

export const ScoreBreakdown = ({ breakdown, timeTaken }: ScoreBreakdownProps) => {
  // Default breakdown structure if not provided
  const defaultBreakdown = {
    functionality: { score: 0, max: 50, details: [] },
    efficiency: { score: 0, max: 20, details: [] },
    error_handling: { score: 0, max: 20, details: [] },
    best_practices: { score: 0, max: 10, details: [] }
  }

  const scores = breakdown || defaultBreakdown

  const criteriaConfig = [
    {
      key: 'functionality',
      title: 'Funcionalidad',
      description: 'Cumplimiento de todos los requisitos',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      key: 'efficiency',
      title: 'Eficiencia',
      description: 'Optimización y rendimiento',
      icon: Clock,
      color: 'text-blue-500'
    },
    {
      key: 'error_handling',
      title: 'Manejo de Errores',
      description: 'Robustez y validaciones',
      icon: XCircle,
      color: 'text-yellow-500'
    },
    {
      key: 'best_practices',
      title: 'Buenas Prácticas',
      description: 'Organización y nomenclatura',
      icon: CheckCircle,
      color: 'text-purple-500'
    }
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <CheckCircle className="w-5 h-5 text-primary" />
          Desglose de Puntuación
        </CardTitle>
        {timeTaken && (
          <p className="text-sm text-muted-foreground">
            Tiempo transcurrido: {formatTime(timeTaken)}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {criteriaConfig.map(({ key, title, description, icon: Icon, color }) => {
          const criteria = scores[key] || { score: 0, max: 0, details: [] }
          const percentage = criteria.max > 0 ? (criteria.score / criteria.max) * 100 : 0
          
          return (
            <div key={key} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-foreground">
                    {criteria.score}/{criteria.max}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {percentage.toFixed(0)}%
                  </div>
                </div>
              </div>
              
              <Progress value={percentage} className="h-2" />
              
              {criteria.details && criteria.details.length > 0 && (
                <div className="space-y-1 ml-8">
                  {criteria.details.map((detail: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {detail.passed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className={detail.passed ? 'text-foreground' : 'text-muted-foreground'}>
                        {detail.description}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}