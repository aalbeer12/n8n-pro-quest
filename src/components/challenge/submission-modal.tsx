import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, XCircle, AlertTriangle, Send } from 'lucide-react'
import { Challenge } from '@/types/database'

interface SubmissionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  challenge: Challenge
  detectedRequirements: string[]
  onConfirm: () => void
  submitting: boolean
}

export const SubmissionModal = ({
  open,
  onOpenChange,
  challenge,
  detectedRequirements,
  onConfirm,
  submitting
}: SubmissionModalProps) => {
  const requirements = (challenge.requirements as any) || {}
  const mustInclude = requirements.must_include || []
  const missingRequirements = mustInclude.filter((req: string) => !detectedRequirements.includes(req))
  const hasAllRequirements = missingRequirements.length === 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Confirmar Envío
          </DialogTitle>
          <DialogDescription>
            Revisa tu solución antes de enviarla para evaluación
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Challenge Info */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-primary mb-1">{challenge.title}</h4>
            <p className="text-sm text-muted-foreground">
              Puntos disponibles: {challenge.points}
            </p>
          </div>

          {/* Requirements Check */}
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Estado de Requisitos:</h4>
            
            {mustInclude.map((requirement: string, index: number) => {
              const isMet = detectedRequirements.includes(requirement)
              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-2 rounded-lg border ${
                    isMet
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-rose-500/10 border-rose-500/30'
                  }`}
                >
                  {isMet ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                  <span className="text-sm">
                    Nodo: <code className="px-1 py-0.5 bg-background/50 rounded text-xs">{requirement}</code>
                  </span>
                  <Badge 
                    variant={isMet ? "default" : "destructive"}
                    className="ml-auto text-xs"
                  >
                    {isMet ? "Detectado" : "Faltante"}
                  </Badge>
                </div>
              )
            })}
          </div>

          {/* Warning for missing requirements */}
          {!hasAllRequirements && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Tu solución no cumple con todos los requisitos obligatorios. 
                Puedes enviarla de todas formas, pero es posible que recibas una puntuación baja.
              </AlertDescription>
            </Alert>
          )}

          {/* Success message */}
          {hasAllRequirements && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                ¡Excelente! Tu solución cumple con todos los requisitos obligatorios.
              </AlertDescription>
            </Alert>
          )}

          {/* Summary */}
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Requisitos cumplidos:</span>
                <span className="font-medium">
                  {detectedRequirements.length} de {mustInclude.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Puntuación estimada:</span>
                <span className="font-medium text-primary">
                  {hasAllRequirements ? "Alta" : "Media/Baja"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Cancelar
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={submitting}
            className="min-w-[120px]"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar Solución
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}