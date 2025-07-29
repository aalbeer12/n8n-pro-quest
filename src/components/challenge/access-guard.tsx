import { ReactNode } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useSubscription } from '@/hooks/use-subscription'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lock, Crown } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AccessGuardProps {
  children: ReactNode
  requiresAuth?: boolean
  requiresSubscription?: boolean
}

export const AccessGuard = ({ 
  children, 
  requiresAuth = true, 
  requiresSubscription = false 
}: AccessGuardProps) => {
  const { user } = useAuth()
  const { subscribed, canAccessChallenge, weeklyFreeUsed, createCheckout } = useSubscription()

  // Auth check
  if (requiresAuth && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center">
          <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold text-primary mb-4">
            Acceso Requerido
          </h2>
          <p className="text-muted-foreground mb-6">
            Necesitas iniciar sesión para acceder a este contenido.
          </p>
          <Button asChild>
            <Link to="/auth">
              Iniciar Sesión
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  // Subscription/access check
  if (requiresSubscription && !canAccessChallenge()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center">
          <Crown className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold text-primary mb-4">
            Límite Alcanzado
          </h2>
          <p className="text-muted-foreground mb-6">
            Has usado tu reto gratuito semanal ({weeklyFreeUsed}/1). 
            Suscríbete para acceso ilimitado a todos los retos diarios.
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => createCheckout('monthly')}
              className="w-full"
            >
              Suscribirse - Plan Mensual
            </Button>
            <Button 
              onClick={() => createCheckout('annual')}
              variant="outline"
              className="w-full"
            >
              Suscribirse - Plan Anual
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link to="/dashboard">
                Volver al Dashboard
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}