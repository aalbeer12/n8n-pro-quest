import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  Coins, 
  Play, 
  RotateCcw, 
  Eye, 
  Timer,
  Database,
  Workflow,
  Zap,
  Shield,
  Settings
} from 'lucide-react'
import { Challenge, Submission } from '@/types/database'
import { Link } from 'react-router-dom'

interface TodayChallengeSectionProps {
  challenge: Challenge | null
  submission: Submission | null
  loading: boolean
}

const difficultyConfig = {
  easy: { color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', label: 'Fácil' },
  medium: { color: 'bg-amber-500/20 text-amber-300 border-amber-500/30', label: 'Medio' },
  hard: { color: 'bg-rose-500/20 text-rose-300 border-rose-500/30', label: 'Difícil' },
  expert: { color: 'bg-violet-500/20 text-violet-300 border-violet-500/30', label: 'Experto' }
}

const categoryIcons = {
  'data-processing': Database,
  'api-integration': Workflow,
  'workflow-logic': Zap,
  'error-handling': Shield,
  'optimization': Settings
}

const categoryLabels = {
  'data-processing': 'Procesamiento de Datos',
  'api-integration': 'Integración de APIs',
  'workflow-logic': 'Lógica de Flujo',
  'error-handling': 'Manejo de Errores',
  'optimization': 'Optimización'
}

export const TodayChhallengeSection = ({ challenge, submission, loading }: TodayChallengeSectionProps) => {
  if (loading) {
    return (
      <Card className="p-8 bg-surface/50 backdrop-blur-sm border-border">
        <div className="space-y-6">
          <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 bg-muted animate-pulse rounded w-16" />
            <div className="h-6 bg-muted animate-pulse rounded w-20" />
          </div>
          <div className="h-12 bg-muted animate-pulse rounded" />
        </div>
      </Card>
    )
  }

  if (!challenge) {
    return (
      <Card className="p-8 bg-surface/50 backdrop-blur-sm border-border text-center">
        <div className="space-y-4">
          <Timer className="w-16 h-16 mx-auto text-muted-foreground" />
          <h3 className="text-xl font-semibold text-primary">
            No hay reto disponible hoy
          </h3>
          <p className="text-muted-foreground">
            El próximo reto estará disponible mañana
          </p>
          <Button asChild variant="outline">
            <Link to="/challenges">
              Practicar retos anteriores
            </Link>
          </Button>
        </div>
      </Card>
    )
  }

  const CategoryIcon = categoryIcons[challenge.category]
  const difficultyStyle = difficultyConfig[challenge.difficulty]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 bg-gradient-to-br from-surface/50 to-surface/30 backdrop-blur-sm border-border relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Reto del día</span>
            </div>
            <h2 className="text-2xl font-bold text-primary leading-tight">
              {challenge.title}
            </h2>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {challenge.description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge 
              className={`${difficultyStyle.color} border`}
              variant="outline"
            >
              {difficultyStyle.label}
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1">
              <CategoryIcon className="w-3 h-3" />
              {categoryLabels[challenge.category]}
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1">
              <Coins className="w-3 h-3 text-warning" />
              {challenge.points} puntos
            </Badge>
            
            {challenge.time_estimate_minutes && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {challenge.time_estimate_minutes} min
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4">
            {submission ? (
              <div className="space-y-4">
                {/* Show completed status */}
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-primary">
                        ¡Reto completado!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Puntuación: {submission.score || 0}/100
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {submission.score || 0}
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button asChild className="flex-1">
                    <Link to={`/challenge/${challenge.slug}/result`}>
                      <Eye className="w-4 h-4 mr-2" />
                      Ver resultado
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline">
                    <Link to={`/challenge/${challenge.slug}`}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Intentar de nuevo
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild size="lg" className="w-full h-14 text-lg">
                  <Link to={`/challenge/${challenge.slug}`}>
                    <Play className="w-5 h-5 mr-2" />
                    Comenzar reto
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}