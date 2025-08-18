import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Mail, Sparkles, Crown, Zap, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PRICING_CONFIG } from '@/lib/pricing-config'

const Register = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { signIn, user } = useAuth()
  const { toast } = useToast()
  const { t, i18n } = useTranslation()

  const intendedPlan = searchParams.get('plan') || 'free'

  // Set language from URL parameter on mount
  useEffect(() => {
    const langParam = searchParams.get('lang')
    if (langParam && (langParam === 'en' || langParam === 'es')) {
      i18n.changeLanguage(langParam)
    }
  }, [])

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const getPlanDetails = () => {
    switch (intendedPlan) {
      case 'premium_monthly':
        return {
          name: 'Plan Premium Mensual',
          price: PRICING_CONFIG.MONTHLY_DISPLAY,
          period: 'mes',
          badge: 'Premium',
          icon: Crown,
          features: [
            'Retos diarios ilimitados',
            'Retroalimentación avanzada de IA',
            'Análisis detallado de código',
            'Sistema de logros completo',
            'Soporte prioritario'
          ]
        }
      case 'premium_yearly':
        return {
          name: 'Plan Premium Anual',
          price: PRICING_CONFIG.ANNUAL_DISPLAY,
          period: 'año',
          badge: 'Más Popular',
          icon: Crown,
          features: [
            'Todo del plan mensual',
            `${PRICING_CONFIG.SAVINGS_MONTHS} meses GRATIS`,
            'Soporte premium',
            'Acceso anticipado a nuevas funciones',
            'Certificado de finalización'
          ]
        }
      default:
        return {
          name: 'Plan Gratuito',
          price: '€0',
          period: 'siempre',
          badge: 'Gratuito',
          icon: Zap,
          features: [
            `${PRICING_CONFIG.FREE_CHALLENGES_PER_WEEK} reto gratis semanal`,
            'Retroalimentación básica',
            'Acceso a la comunidad',
            'Progreso básico'
          ]
        }
    }
  }

  const planDetails = getPlanDetails()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !firstName) {
      return;
    }

    setIsLoading(true)
    
    // Store the intended plan for after auth callback
    localStorage.setItem('intended_plan', intendedPlan)
    localStorage.setItem('registration_source', `${intendedPlan}_cta`)
    
    try {
      const { error } = await signIn(email, firstName)
      
      if (error) {
        console.error('signIn error:', error);
        toast({
          title: t('common.error'),
          description: error.message,
          variant: "destructive"
        })
      } else {
        setEmailSent(true)
        toast({
          title: "¡Enlace mágico enviado!",
          description: t('auth.checkEmailDesc'),
        })
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast({
        title: t('common.error'),
        description: "Algo salió mal. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 bg-surface/50 backdrop-blur-sm border-border">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-primary">{t('auth.checkEmail')}</h1>
                <p className="text-muted-foreground">
                  {t('auth.checkEmailDesc')} <span className="font-medium text-primary">{email}</span>
                </p>
              </div>

              {intendedPlan !== 'free' && (
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary font-medium">
                    Después de confirmar tu email, serás redirigido automáticamente al checkout para completar tu suscripción {planDetails.name}.
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t('auth.emailExpires')}
                </p>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setEmailSent(false)
                    setEmail('')
                    setFirstName('')
                  }}
                  className="w-full"
                >
                  {t('auth.backToEmail')}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold text-xl mb-4">
              <Sparkles className="w-6 h-6" />
              FlowForge
            </Link>
            <h1 className="text-3xl font-bold text-primary mb-2">Crear Cuenta</h1>
            <p className="text-muted-foreground">
              Únete a miles de desarrolladores mejorando sus habilidades de automatización
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-8 bg-surface/50 backdrop-blur-sm border-border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t('auth.firstName')}</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder={t('auth.firstNamePlaceholder')}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('auth.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('auth.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading || !email || !firstName}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('auth.sendingLink')}
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        {intendedPlan === 'free' ? 'Empezar Gratis' : 'Continuar con Premium'}
                      </>
                    )}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    {t('auth.noPasswordsRequired')}
                  </div>
                </form>
              </Card>

              <div className="text-center mt-6">
                <Link 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('auth.backToHome')}
                </Link>
              </div>
            </motion.div>

            {/* Plan Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className={`p-8 ${intendedPlan !== 'free' ? 'border-primary shadow-lg' : ''}`}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <planDetails.icon className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold">{planDetails.name}</h3>
                    </div>
                    <Badge variant={intendedPlan !== 'free' ? 'default' : 'outline'}>
                      {planDetails.badge}
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {planDetails.price}
                      <span className="text-lg text-muted-foreground">/{planDetails.period}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Lo que incluye:</h4>
                    <ul className="space-y-2">
                      {planDetails.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {intendedPlan !== 'free' && (
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <p className="text-sm text-primary">
                        <strong>Sin riesgo:</strong> Después de registrarte, serás redirigido a Stripe para completar de forma segura tu suscripción. Si cambias de opinión, mantendrás acceso gratuito a 1 reto semanal.
                      </p>
                    </div>
                  )}

                  {intendedPlan === 'free' && (
                    <div className="text-center pt-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        ¿Quieres desbloquear todo?
                      </p>
                      <Link to="/pricing">
                        <Button variant="outline" size="sm">
                          Ver Planes Premium
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register