import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Star, AlertTriangle } from 'lucide-react'
import { Challenge } from '@/types/database'

interface RequirementsSectionProps {
  challenge: Challenge
  detectedRequirements: string[]
}

export const RequirementsSection = ({ challenge, detectedRequirements }: RequirementsSectionProps) => {
  const requirements = challenge.requirements as any || {}
  const mustInclude = requirements.must_include || []
  const constraints = requirements.constraints || []
  const bonusObjectives = requirements.bonus_objectives || []

  const isRequirementMet = (requirement: string) => {
    return detectedRequirements.includes(requirement)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="p-6 bg-surface/50 backdrop-blur-sm border-border">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-primary mb-2">Requisitos</h2>
            <p className="text-sm text-muted-foreground">
              Cumple estos requisitos para completar el reto exitosamente
            </p>
          </div>

          {/* Must-have Requirements */}
          {mustInclude.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-primary flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Obligatorios
              </h3>
              <div className="space-y-2">
                {mustInclude.map((requirement: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      isRequirementMet(requirement)
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-background/50 border-border'
                    }`}
                  >
                    {isRequirementMet(requirement) ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span className={`text-sm ${
                      isRequirementMet(requirement) ? 'text-emerald-400' : 'text-muted-foreground'
                    }`}>
                      Usar nodo: <code className="px-1 py-0.5 bg-background/50 rounded text-xs">{requirement}</code>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Constraints */}
          {constraints.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-warning flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Restricciones
              </h3>
              <div className="space-y-2">
                {constraints.map((constraint: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/30"
                  >
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-sm text-warning">{constraint}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Bonus Objectives */}
          {bonusObjectives.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-violet-400 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Objetivos Bonus
              </h3>
              <div className="space-y-2">
                {bonusObjectives.map((objective: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-violet-500/10 border border-violet-500/30"
                  >
                    <Star className="w-4 h-4 text-violet-400" />
                    <span className="text-sm text-violet-400">{objective}</span>
                    <Badge variant="outline" className="ml-auto text-xs text-violet-400 border-violet-500/30">
                      +25 puntos
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Summary */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progreso:</span>
              <span className="text-primary font-medium">
                {detectedRequirements.length} de {mustInclude.length} requisitos
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}