import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { useSubscription } from '@/hooks/use-subscription'
import { CreditCard, Lock, Star, Users, TrendingUp } from 'lucide-react'

export const PaymentAuth = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const planType = searchParams.get('plan') as 'monthly' | 'annual' || 'monthly'
  const authComplete = searchParams.get('auth') === 'complete'
  const { signIn, user } = useAuth()
  const { toast } = useToast()
  const { createCheckout } = useSubscription()

  useEffect(() => {
    // Si el usuario ya está autenticado, proceder directamente con el checkout
    if (user) {
      console.log('Usuario ya autenticado, procediendo al pago directamente')
      handleProceedToPayment()
    }
  }, [user])

  const handleProceedToPayment = async () => {
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
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Crear una URL de callback que incluye el plan como parámetro para el email
      const callbackUrl = `/payment-auth?plan=${planType}&auth=complete`;
      console.log('💳 PaymentAuth signIn with redirect:', callbackUrl);
      const { error } = await signIn(email, firstName, callbackUrl);
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        })
      } else {
        setEmailSent(true)
        toast({
          title: "¡Enlace enviado!",
          description: "Revisa tu email para completar el registro y continuar con el pago."
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Algo salió mal. Inténtalo de nuevo.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const planDetails = {
    monthly: {
      title: "Plan Mensual Premium",
      price: "€19",
      period: "mes",
      features: [
        "Retos diarios ilimitados",
        "Retroalimentación avanzada de IA",
        "Análisis detallado de código",
        "Sistema de logros completo"
      ]
    },
    annual: {
      title: "Plan Anual Premium",
      price: "€190",
      period: "año",
      features: [
        "Todo del plan mensual",
        "2 meses GRATIS (14 meses por 12)",
        "Soporte premium",
        "Acceso anticipado a nuevas funciones"
      ]
    }
  }

  const currentPlan = planDetails[planType]

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">¡Revisa tu email!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Hemos enviado un enlace de acceso a <strong>{email}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Una vez que confirmes tu cuenta desde el email, regresarás aquí y serás redirigido automáticamente al pago seguro de Stripe para completar tu suscripción al plan {planType === 'monthly' ? 'mensual' : 'anual'}.
              </p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="w-full"
              >
                Volver al inicio
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-3xl font-bold gradient-text">
                Completa tu registro para continuar
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Para procesar tu pago de forma segura, necesitamos que te registres primero. 
                Solo te tomará unos segundos.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario de registro */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Crear cuenta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Tu nombre"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creando cuenta..." : "Crear cuenta y proceder al pago"}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground text-center">
                      ¿Ya tienes cuenta?{' '}
                      <button
                        onClick={() => navigate(`/auth?redirect=payment-auth&plan=${planType}`)}
                        className="text-primary hover:underline"
                      >
                        Inicia sesión aquí
                      </button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Resumen del plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-center">
                    {currentPlan.title}
                  </CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">{currentPlan.price}</span>
                    <span className="text-muted-foreground">/{currentPlan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold text-center">¿Por qué elegir FlowForge?</h4>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-2">
                        <div className="mx-auto w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground">+500 estudiantes satisfechos</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="mx-auto w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground">92% mejora en habilidades</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="mx-auto w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground">Comunidad activa</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>🔒 Pago seguro con Stripe</p>
                    <p>💳 Cancela cuando quieras</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}