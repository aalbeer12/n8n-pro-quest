import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Mail, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { signIn } = useAuth()
  const { toast } = useToast()
  const { t, i18n } = useTranslation()

  // Set language from URL parameter on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const langParam = urlParams.get('lang')
    if (langParam && (langParam === 'en' || langParam === 'es')) {
      i18n.changeLanguage(langParam)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🎯 Auth form submitted!', { email, firstName });
    e.preventDefault()
    if (!email || !firstName) {
      console.log('❌ Missing email or firstName', { email, firstName });
      return;
    }

    console.log('✅ Starting signIn process...');
    setIsLoading(true)
    
    try {
      console.log('📞 Calling signIn function...');
      const { error } = await signIn(email, firstName)
      console.log('📞 signIn result:', { error });
      
      if (error) {
        console.error('❌ signIn error:', error);
        toast({
          title: t('common.error'),
          description: error.message,
          variant: "destructive"
        })
      } else {
        console.log('✅ signIn successful, setting emailSent to true');
        setEmailSent(true)
        toast({
          title: "¡Enlace mágico enviado!",
          description: t('auth.checkEmailDesc'),
        })
      }
    } catch (error) {
      console.error('💥 Unexpected error in handleSubmit:', error);
      toast({
        title: t('common.error'),
        description: "Algo salió mal. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      })
    } finally {
      console.log('🏁 Setting loading to false');
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold text-xl mb-4">
            <Sparkles className="w-6 h-6" />
            FlowForge
          </Link>
          <h1 className="text-3xl font-bold text-primary mb-2">{t('auth.title')}</h1>
          <p className="text-muted-foreground">
            {t('auth.subtitle')}
          </p>
        </div>

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
                  {t('auth.continue')}
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
    </div>
  )
}

export default Auth