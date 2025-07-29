import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Zap, Star } from 'lucide-react'
import { useSubscription } from '@/hooks/use-subscription'

interface PricingCardProps {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  isPopular?: boolean
  isPremium?: boolean
  onSelect: () => void
  disabled?: boolean
}

export const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  isPopular = false,
  isPremium = false,
  onSelect,
  disabled = false
}: PricingCardProps) => {
  const { subscribed, subscriptionTier } = useSubscription()
  
  const isCurrentPlan = subscribed && (
    (subscriptionTier === 'monthly' && title.includes('Mensual')) ||
    (subscriptionTier === 'annual' && title.includes('Anual'))
  )

  return (
    <Card className={`relative h-full transition-all duration-300 hover:shadow-xl ${
      isPopular 
        ? 'border-primary shadow-lg scale-105' 
        : 'border-border hover:border-primary/50'
    } ${isCurrentPlan ? 'bg-primary/5 border-primary' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm">
            <Star className="w-3 h-3 mr-1" />
            Más Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          {isPremium && <Crown className="w-5 h-5 text-primary" />}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold">{price}</span>
            <span className="text-sm text-muted-foreground">/{period}</span>
          </div>
          {title.includes('Anual') && (
            <p className="text-sm text-green-600 font-medium">
              Ahorra 17% vs plan mensual
            </p>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          onClick={onSelect}
          disabled={disabled || isCurrentPlan}
          className={`w-full ${isPopular || isPremium 
            ? 'bg-gradient-to-r from-primary to-primary-glow shadow-lg hover:shadow-xl' 
            : ''
          }`}
          variant={isPopular || isPremium ? 'default' : 'outline'}
        >
          {isCurrentPlan ? (
            <>
              <Crown className="w-4 h-4 mr-2" />
              Plan Actual
            </>
          ) : disabled ? (
            'Procesando...'
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              {title.includes('Gratis') ? 'Plan Actual' : 'Seleccionar Plan'}
            </>
          )}
        </Button>
        
        {isCurrentPlan && (
          <p className="text-xs text-center text-muted-foreground">
            Tienes acceso completo a todas las funciones premium
          </p>
        )}
      </CardContent>
    </Card>
  )
}