import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '@/integrations/supabase/client'
import { Loader2, Sparkles } from 'lucide-react'

const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log('AuthCallback: Iniciando manejo del callback')
      console.log('AuthCallback: URL actual:', window.location.href)
      console.log('AuthCallback: Hash:', window.location.hash)
      
      try {
        // Primero intentar procesar el hash si existe
        if (window.location.hash) {
          console.log('AuthCallback: Procesando hash de la URL')
          const { data, error } = await supabase.auth.getSession()
          console.log('AuthCallback: Resultado después del hash', { data, error })
        }
        
        // Obtener la sesión actual
        const { data, error } = await supabase.auth.getSession()
        
        console.log('AuthCallback: Sesión obtenida', { data, error })
        
        if (error) {
          console.error('AuthCallback: Error en callback:', error)
          navigate('/auth?error=callback_error')
          return
        }

        if (data.session) {
          console.log('AuthCallback: Sesión válida, verificando perfil')
          
          // Verificar si el usuario ha completado la configuración del perfil
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', data.session.user.id)
            .maybeSingle()

          console.log('AuthCallback: Resultado de perfil', { profile, profileError })

          if (profileError) {
            console.error('AuthCallback: Error al obtener perfil:', profileError)
            navigate('/auth/welcome')
          } else if (!profile || !profile.username) {
            console.log('AuthCallback: Perfil no encontrado o sin username, redirigiendo a welcome')
            navigate('/auth/welcome')
          } else {
            console.log('AuthCallback: Perfil completo, redirigiendo a dashboard')
            navigate('/dashboard')
          }
        } else {
          console.log('AuthCallback: No hay sesión, redirigiendo a auth')
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