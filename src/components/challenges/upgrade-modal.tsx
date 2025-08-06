import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Crown, Check, Zap, Star } from 'lucide-react'
import { useSubscription } from '@/hooks/use-subscription'

interface UpgradeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const UpgradeModal = ({ open, onOpenChange }: UpgradeModalProps) => {
  const { createCheckout } = useSubscription()

  const handlePlanSelect = async (planType: 'monthly' | 'annual') => {
    await createCheckout(planType)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold gradient-text">
            Desbloquea Todo tu Potencial
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            Accede a retos ilimitados y funciones premium para acelerar tu aprendizaje
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Plan Mensual */}
          <Card className="border-2 border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold">Plan Mensual</h3>
                <div className="flex items-baseline justify-center gap-1 mt-2">
                  <span className="text-3xl font-bold">€19</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Retos diarios ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Retroalimentación avanzada de IA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Todas las categorías y dificultades</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Sistema de logros completo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Soporte prioritario</span>
                </li>
              </ul>
              
              <Button 
                onClick={() => handlePlanSelect('monthly')}
                className="w-full"
              >
                <Crown className="w-4 h-4 mr-2" />
                Elegir Plan Mensual
              </Button>
            </CardContent>
          </Card>

          {/* Plan Anual */}
          <Card className="border-2 border-primary bg-primary/5 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Star className="w-3 h-3" />
                Más Popular
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold">Plan Anual</h3>
                <div className="flex items-baseline justify-center gap-1 mt-2">
                  <span className="text-3xl font-bold">€190</span>
                  <span className="text-muted-foreground">/año</span>
                </div>
                <div className="text-sm text-green-600 font-medium">
                  Ahorra €38 (2 meses gratis)
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Todo del plan mensual</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">2 meses GRATIS</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Soporte premium</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Acceso anticipado a nuevas funciones</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Certificado de finalización</span>
                </li>
              </ul>
              
              <Button 
                onClick={() => handlePlanSelect('annual')}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <Crown className="w-4 h-4 mr-2" />
                Elegir Plan Anual
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>✓ Cancela cuando quieras • ✓ Sin compromisos • ✓ Pago seguro con Stripe</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}