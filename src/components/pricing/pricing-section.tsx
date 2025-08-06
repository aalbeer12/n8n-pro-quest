import { useState } from 'react'
import { motion } from 'framer-motion'
import { PricingCard } from './pricing-card'
import { useSubscription } from '@/hooks/use-subscription'
import { useToast } from '@/hooks/use-toast'

export const PricingSection = () => {
  const { createCheckout, isPro } = useSubscription()
  const { toast } = useToast()
  const [loading, setLoading] = useState<string | null>(null)

  const handlePlanSelect = async (planType: 'monthly' | 'annual') => {
    setLoading(planType)
    try {
      await createCheckout(planType)
      toast({
        title: "Redirigiendo a Stripe",
        description: "Te estamos llevando al checkout seguro..."
      })
    } catch (error) {
      console.error('Error creating checkout:', error)
      toast({
        title: "Error",
        description: "No se pudo iniciar el proceso de pago. Inténtalo de nuevo.",
        variant: "destructive"
      })
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    {
      title: "Plan Gratuito",
      price: "€0",
      period: "siempre",
      description: "Ideal para empezar con la automatización",
      features: [
        "1 reto semanal",
        "Retroalimentación básica",
        "Acceso a la comunidad",
        "Progreso básico",
        "Perfil público"
      ],
      onSelect: () => {},
      disabled: true
    },
    {
      title: "Plan Mensual",
      price: "€19",
      period: "mes",
      description: "Acceso completo para usuarios activos",
      features: [
        "Retos diarios ilimitados",
        "Retroalimentación avanzada de IA",
        "Análisis detallado de código",
        "Todas las categorías y dificultades",
        "Sistema de logros completo",
        "Sin límites de acceso",
        "Soporte prioritario"
      ],
      isPremium: true,
      onSelect: () => handlePlanSelect('monthly'),
      disabled: loading === 'monthly'
    },
    {
        title: "Plan Anual",
        price: "€190",
        period: "año",
        description: "El mejor valor para learners serios",
        features: [
          "Todo del plan mensual",
          "2 meses GRATIS (14 meses por 12)",
          "Soporte premium",
          "Acceso anticipado a nuevas funciones",
          "Certificado de finalización",
          "Acceso de por vida a contenido creado"
        ],
      isPopular: true,
      isPremium: true,
      onSelect: () => handlePlanSelect('annual'),
      disabled: loading === 'annual'
    }
  ]

  return (
    <section id="pricing" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Elige Tu Plan de Aprendizaje
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Desde principiante hasta experto - tenemos el plan perfecto para tu viaje de automatización
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PricingCard {...plan} />
            </motion.div>
          ))}
        </div>

        {!isPro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-6 text-sm text-muted-foreground">
              <span>✓ Un reto semanal gratis de por vida</span>
              <span>✓ Sin compromiso</span>
              <span>✓ Cancela cuando quieras</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}