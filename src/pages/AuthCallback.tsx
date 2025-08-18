import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '@/integrations/supabase/client'
import { Loader2, Sparkles } from 'lucide-react'

const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Primero intentar procesar el hash si existe
        if (window.location.hash) {
          const { data, error } = await supabase.auth.getSession()
        }
        
        // Obtener la sesión actual
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('AuthCallback: Error en callback:', error)
          navigate('/auth?error=callback_error')
          return
        }

        if (data.session) {
          const user = data.session.user
          
          // Recuperar el plan que el usuario quería
          const intendedPlan = localStorage.getItem('intended_plan') || 'free'
          const registrationSource = localStorage.getItem('registration_source') || 'organic'
          
          // Limpiar localStorage
          localStorage.removeItem('intended_plan')
          localStorage.removeItem('registration_source')
          
          // Actualizar perfil con datos de tracking
          try {
            await supabase
              .from('profiles')
              .update({
                initial_plan_intent: intendedPlan,
                registration_source: registrationSource
              })
              .eq('id', user.id)
          } catch (error) {
            console.warn('Error updating profile tracking data:', error)
          }
          
          // Si eligió premium, crear sesión de Stripe
          if (intendedPlan === 'premium_monthly' || intendedPlan === 'premium_yearly') {
            try {
              const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-checkout', {
                body: {
                  plan: intendedPlan,
                  userId: user.id,
                  email: user.email
                }
              })
              
              if (checkoutError) {
                console.error('Error creating checkout:', checkoutError)
                navigate('/dashboard?error=payment_setup_failed')
                return
              }
              
              // Redirect a Stripe Checkout
              if (checkoutData?.url) {
                window.location.href = checkoutData.url
                return
              }
            } catch (error) {
              console.error('Error in checkout flow:', error)
              navigate('/dashboard?error=payment_setup_failed')
              return
            }
          }
          
          // Verificar si hay un redirect específico en los parámetros
          const urlParams = new URLSearchParams(window.location.search)
          const redirectPath = urlParams.get('redirect')
          
          if (redirectPath) {
            navigate(redirectPath)
            return
          }
          
          // Verificar si el usuario ha completado la configuración del perfil
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .maybeSingle()

          if (profileError) {
            console.error('AuthCallback: Error al obtener perfil:', profileError)
            navigate('/auth/welcome')
          } else if (!profile || !profile.username) {
            navigate('/auth/welcome')
          } else {
            navigate('/dashboard')
          }
        } else {
          navigate('/auth')
        }
      } catch (error) {
        console.error('AuthCallback: Error inesperado:', error)
        navigate('/auth?error=unexpected_error')
      }
    }

    // Agregar un pequeño delay para asegurar que Supabase procese el hash
    const timer = setTimeout(handleAuthCallback, 100)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-primary">Signing you in...</h1>
          <p className="text-muted-foreground">
            Please wait while we complete the authentication process
          </p>
        </div>

        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
      </motion.div>
    </div>
  )
}

export default AuthCallback