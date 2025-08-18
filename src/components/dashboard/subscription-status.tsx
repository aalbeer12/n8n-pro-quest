import { useSubscription } from '@/hooks/use-subscription'
import { useAuth } from '@/hooks/use-auth'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { Crown, Zap, Calendar, Gift } from 'lucide-react'
import { motion } from 'framer-motion'

export const SubscriptionStatus = () => {
  const { subscribed, subscriptionTier, subscriptionEnd, weeklyFreeUsed, canAccessChallenge } = useSubscription()
  const { session } = useAuth()
  const { toast } = useToast()

  const handleManageSubscription = async () => {
    if (!session?.access_token) {
      toast({
        title: "Error de autenticación",
        description: "Debes estar conectado para gestionar tu suscripción",
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
      console.error('Error managing subscription:', error)
      toast({
        title: "Error",
        description: "No se pudo abrir el portal de gestión. Inténtalo de nuevo.",
        variant: "destructive"
      })
    }
  }

  if (subscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Plan Premium Activo</h3>
                <Badge variant="default" className="text-xs">
                  {subscriptionTier === 'annual' ? 'Plan Anual' : 'Plan Mensual'}
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleManageSubscription}
              className="border-primary/20 hover:bg-primary/5"
            >
              Gestionar
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                {subscriptionEnd 
                  ? `Se renueva el ${new Date(subscriptionEnd).toLocaleDateString('es-ES')}`
                  : 'Suscripción activa'
                }
              </span>
            </div>
            
            <div className="text-sm text-primary font-medium">
              ✨ Acceso completo a todos los retos y funciones premium
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  // Free user
  const canAccess = canAccessChallenge()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Gift className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Plan Gratuito</h3>
              <Badge variant="outline" className="text-xs">
                1 reto semanal
              </Badge>
            </div>
          </div>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => window.location.href = '/pricing'}
          >
            Mejorar Plan
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="text-sm">
            {canAccess ? (
              <div className="flex items-center gap-2 text-green-600">
                <Zap className="w-4 h-4" />
                <span className="font-medium">¡Reto semanal disponible!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Próximo reto disponible en unos días</span>
              </div>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground">
            🎁 Tienes acceso a 1 reto gratuito cada semana de por vida
          </div>
        </div>
      </Card>
    </motion.div>
  )
}