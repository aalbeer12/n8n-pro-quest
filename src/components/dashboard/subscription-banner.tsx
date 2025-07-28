import { useSubscription } from '@/hooks/use-subscription';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Zap } from 'lucide-react';

export const SubscriptionBanner = () => {
  const { subscribed, subscriptionTier, canAccessChallenge, weeklyFreeUsed, createCheckout } = useSubscription();

  if (subscribed) {
    return (
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 p-4 mb-6">
        <div className="flex items-center gap-3">
          <Crown className="w-5 h-5 text-primary" />
          <div>
            <p className="font-semibold text-primary">
              Plan {subscriptionTier === 'annual' ? 'Anual' : 'Mensual'} Activo
            </p>
            <p className="text-sm text-muted-foreground">
              Acceso completo a todos los retos diarios
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (!canAccessChallenge()) {
    return (
      <Card className="bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/20 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-destructive" />
            <div>
              <p className="font-semibold text-destructive">
                Reto semanal usado ({weeklyFreeUsed}/1)
              </p>
              <p className="text-sm text-muted-foreground">
                Suscríbete para acceso ilimitado a retos diarios
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => createCheckout('monthly')}
            >
              €12/mes
            </Button>
            <Button 
              size="sm"
              onClick={() => createCheckout('annual')}
            >
              €120/año
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-semibold text-blue-900">
              Plan Gratuito ({weeklyFreeUsed}/1 usado esta semana)
            </p>
            <p className="text-sm text-blue-700">
              Suscríbete para retos diarios ilimitados
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => createCheckout('monthly')}
          >
            €12/mes
          </Button>
          <Button 
            size="sm"
            onClick={() => createCheckout('annual')}
          >
            €120/año
          </Button>
        </div>
      </div>
    </Card>
  );
};