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
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          navigate('/auth?error=callback_error')
          return
        }

        if (data.session) {
          // Check if user has completed profile setup
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', data.session.user.id)
            .single()

          if (profileError || !profile?.username) {
            navigate('/auth/welcome')
          } else {
            navigate('/dashboard')
          }
        } else {
          navigate('/auth')
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error)
        navigate('/auth?error=unexpected_error')
      }
    }

    handleAuthCallback()
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