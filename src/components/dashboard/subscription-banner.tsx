
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Crown, Check, Zap, Settings, Calendar, CreditCard } from 'lucide-react'
import { useSubscription } from '@/hooks/use-subscription'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'

export const SubscriptionBanner = () => {
  const { 
    subscribed, 
    subscriptionTier, 
    subscriptionEnd,
    weeklyFreeUsed, 
    canAccessChallenge, 
    createCheckout 
  } = useSubscription()
  
  const { session } = useAuth()
  const { toast } = useToast()

  const handleManageSubscription = async () => {
    if (!session?.access_token) {
      toast({
        title: "Error de autenticación",
        description: "Por favor, inicia sesión para gestionar tu suscripción",
        variant: "destructive"
      })
      return
    }

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      if (error) throw error
      if (data?.url) {
        window.open(data.url, '_blank')
      }
    } catch (error) {
      console.error('Error opening customer portal:', error)
      toast({
        title: "Error",
        description: "No se pudo abrir el portal de gestión. Inténtalo de nuevo.",
        variant: "destructive"
      })
    }
  }

  // Show premium banner if subscribed
  if (subscribed) {
    const subscriptionEndDate = subscriptionEnd ? new Date(subscriptionEnd).toLocaleDateString() : null
    
    return (
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Crown className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-primary text-lg">
                ✨ Premium {subscriptionTier === 'annual' ? 'Anual' : 'Mensual'} Activo
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-500" />
                  Acceso ilimitado a todos los retos
                </span>
                {subscriptionEndDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Renueva el {subscriptionEndDate}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleManageSubscription}
            variant="outline" 
            size="sm"
            className="flex items-center gap-2 hover:bg-primary/10"
          >
            <Settings className="w-4 h-4" />
            Gestionar
          </Button>
        </div>
      </Card>
    )
  }

  // Show upgrade prompt if free weekly challenge used
  if (!canAccessChallenge()) {
    return (
      <Card className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 mb-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
            <Crown className="w-8 h-8 text-amber-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-primary mb-2">
              🚀 ¡Desbloquea Todo tu Potencial!
            </h3>
            <p className="text-muted-foreground mb-4">
              Has completado tu reto gratuito de esta semana ({weeklyFreeUsed}/1). 
              Suscríbete para acceso ilimitado y mejora tus habilidades sin límites.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={async () => {
                console.log('🚀 Clicking monthly plan button')
                try {
                  console.log('Attempting monthly checkout...')
                  const result = await createCheckout('monthly')
                  console.log('Monthly checkout result:', result)
                } catch (error) {
                  console.error('❌ Error creating monthly checkout:', error)
                  console.log('📍 Fallback: Redirecting to payment-auth')
                  window.location.href = '/payment-auth?plan=monthly'
                }
              }}
              className="min-w-[160px] bg-gradient-to-r from-primary to-primary-glow shadow-lg hover:shadow-xl"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              €19/mes
            </Button>
            <Button 
              onClick={async () => {
                console.log('🚀 Clicking annual plan button')
                try {
                  console.log('Attempting annual checkout...')
                  const result = await createCheckout('annual')
                  console.log('Annual checkout result:', result)
                } catch (error) {
                  console.error('❌ Error creating annual checkout:', error)
                  console.log('📍 Fallback: Redirecting to payment-auth')
                  window.location.href = '/payment-auth?plan=annual'
                }
              }}
              variant="outline"
              className="min-w-[160px] border-primary text-primary hover:bg-primary/10"
            >
              <Crown className="w-4 h-4 mr-2" />
              €190/año (17% dto)
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            💡 El plan anual incluye 2 meses gratis
          </p>
        </div>
      </Card>
    )
  }

  // Show free plan usage
  return (
    <Card className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Check className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-primary">Plan Gratuito</h3>
            <p className="text-sm text-muted-foreground">
              {weeklyFreeUsed}/1 reto semanal usado • Renueva cada lunes
            </p>
          </div>
        </div>
        <Button 
          onClick={async () => {
            console.log('🚀 Clicking premium upgrade button')
            try {
              console.log('Attempting createCheckout...')
              const result = await createCheckout('monthly')
              console.log('Checkout result:', result)
            } catch (error) {
              console.error('❌ Error creating checkout:', error)
              console.log('📍 Fallback: Redirecting to payment-auth')
              window.location.href = '/payment-auth?plan=monthly'
            }
          }}
          size="sm"
          className="bg-gradient-to-r from-primary to-primary-glow text-white shadow-lg hover:shadow-xl transition-all"
        >
          <Zap className="w-4 h-4 mr-2" />
          Actualizar a Premium
        </Button>
      </div>
    </Card>
  )
}
