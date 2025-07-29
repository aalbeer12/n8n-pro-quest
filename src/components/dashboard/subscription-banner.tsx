import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Crown, Check, Zap } from 'lucide-react'
import { useSubscription } from '@/hooks/use-subscription'

export const SubscriptionBanner = () => {
  const { 
    subscribed, 
    subscriptionTier, 
    weeklyFreeUsed, 
    canAccessChallenge, 
    createCheckout 
  } = useSubscription()

  // Don't show banner if subscribed
  if (subscribed) {
    return (
      <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 mb-6">
        <div className="flex items-center gap-3">
          <Crown className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <h3 className="font-semibold text-primary">
              Plan {subscriptionTier === 'annual' ? 'Anual' : 'Mensual'} Activo
            </h3>
            <p className="text-sm text-muted-foreground">
              Acceso completo a todos los retos diarios
            </p>
          </div>
        </div>
      </Card>
    )
  }

  // Show upgrade prompt if free weekly challenge used
  if (!canAccessChallenge()) {
    return (
      <Card className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 mb-6">
        <div className="text-center space-y-4">
          <Crown className="w-12 h-12 mx-auto text-amber-500" />
          <div>
            <h3 className="font-bold text-lg text-primary mb-2">
              Reto Semanal Gratuito Usado
            </h3>
            <p className="text-muted-foreground mb-4">
              Has completado tu reto gratuito de esta semana ({weeklyFreeUsed}/1). 
              Suscríbete para acceso ilimitado a todos los retos diarios.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={async () => {
                console.log('Clicking monthly plan button')
                try {
                  await createCheckout('monthly')
                } catch (error) {
                  console.error('Error creating checkout:', error)
                  window.location.href = '/payment-auth?plan=monthly'
                }
              }}
              className="min-w-[140px]"
            >
              Plan Mensual
            </Button>
            <Button 
              onClick={async () => {
                console.log('Clicking annual plan button')
                try {
                  await createCheckout('annual')
                } catch (error) {
                  console.error('Error creating checkout:', error)
                  window.location.href = '/payment-auth?plan=annual'
                }
              }}
              variant="outline"
              className="min-w-[140px]"
            >
              Plan Anual
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  // Show free plan usage
  return (
    <Card className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-primary">Plan Gratuito</h3>
            <p className="text-sm text-muted-foreground">
              {weeklyFreeUsed}/1 reto semanal usado
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={async () => {
              console.log('Clicking premium upgrade button - proceding to checkout')
              try {
                await createCheckout('monthly')
              } catch (error) {
                console.error('Error creating checkout:', error)
                // Fallback to payment-auth if checkout fails
                window.location.href = '/payment-auth?plan=monthly'
              }
            }}
            size="sm"
            className="bg-gradient-to-r from-primary to-primary-glow text-white shadow-lg hover:shadow-xl transition-all"
          >
            🚀 Actualizar a Premium
          </Button>
        </div>
      </div>
    </Card>
  )
}