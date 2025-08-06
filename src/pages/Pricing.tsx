
import { motion } from 'framer-motion'
import { PricingSection } from '@/components/pricing/pricing-section'
import { SEOMeta } from '@/components/seo/seo-meta'

export const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title="Precios - FlowForge"
        description="Elige el plan perfecto para tu aprendizaje en automatización. Desde principiante hasta experto."
        canonical={`${window.location.origin}/pricing`}
      />
      
      <div className="container mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Precios Transparentes
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comienza gratis y actualiza cuando estés listo para desbloquear todo tu potencial
          </p>
        </motion.div>

        <PricingSection />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">¿Preguntas sobre los precios?</h3>
            <p className="text-muted-foreground mb-6">
              Estamos aquí para ayudarte a elegir el plan perfecto para tus necesidades de aprendizaje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-sm text-muted-foreground">
                ✓ Prueba gratuita para siempre
              </div>
              <div className="text-sm text-muted-foreground">
                ✓ Sin compromisos de permanencia
              </div>
              <div className="text-sm text-muted-foreground">
                ✓ Cancela cuando quieras
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
