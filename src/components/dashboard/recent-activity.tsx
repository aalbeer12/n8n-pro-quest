import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, ExternalLink } from 'lucide-react'
import { Submission } from '@/types/database'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { Link } from 'react-router-dom'

interface RecentActivityProps {
  submissions: Submission[]
  loading: boolean
}

const getScoreColor = (score: number | null) => {
  if (!score) return 'text-muted-foreground'
  if (score >= 80) return 'text-emerald-400'
  if (score >= 60) return 'text-amber-400'
  return 'text-rose-400'
}

const getScoreBadgeVariant = (score: number | null) => {
  if (!score) return 'outline'
  if (score >= 80) return 'default'
  if (score >= 60) return 'secondary'
  return 'destructive'
}

export const RecentActivity = ({ submissions, loading }: RecentActivityProps) => {
  if (loading) {
    return (
      <Card className="p-6 bg-surface/50 backdrop-blur-sm border-border">
        <div className="space-y-4">
          <div className="h-6 bg-muted animate-pulse rounded w-1/2" />
          {[1, 2, 3].map((i) => (
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
        <h3 className="text-lg font-semibold text-primary">Actividad Reciente</h3>
        
        {submissions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No hay actividad reciente</p>
            <p className="text-sm">¡Completa tu primer reto!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/challenge/${(submission as any).challenges?.slug || submission.challenge_id}/result`}
                  className="block p-3 rounded-lg border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-primary truncate">
                          {(submission as any).challenges?.title || 'Reto sin título'}
                        </h4>
                        <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>
                          {formatDistanceToNow(new Date(submission.created_at), {
                            addSuffix: true,
                            locale: es
                          })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={getScoreBadgeVariant(submission.score)}
                        className="ml-2"
                      >
                        {submission.score || 0}/100
                      </Badge>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
        
        {submissions.length > 0 && (
          <div className="pt-2 border-t border-border">
            <Link 
              to="/profile"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Ver toda la actividad →
            </Link>
          </div>
        )}
      </div>
    </Card>
  )
}