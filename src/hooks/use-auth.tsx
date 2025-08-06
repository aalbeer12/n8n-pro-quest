
import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, firstName?: string, redirectPath?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const sendCustomWelcomeEmail = async (email: string, type: 'welcome' | 'magic_link', additionalData?: any) => {
    try {
      await supabase.functions.invoke('send-custom-auth-email', {
        body: {
          to: email,
          type: type,
          data: { 
            appUrl: window.location.origin,
            ...additionalData
          }
        }
      });
    } catch (error) {
      console.error('Error sending custom email:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Send welcome email for new users
        if (event === 'SIGNED_IN' && session?.user?.email) {
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('id, created_at')
              .eq('id', session.user.id)
              .single();
            
            const isNewUser = !profile || 
              (profile.created_at && new Date(profile.created_at) > new Date(Date.now() - 5 * 60 * 1000));
            
            if (isNewUser) {
              sendCustomWelcomeEmail(session.user.email!, 'welcome');
            }
          }, 1000);
        }
        
        // Handle redirect after successful authentication
        if (event === 'SIGNED_IN' && session) {
          // Check if user has completed profile setup
          setTimeout(() => {
            checkProfileSetup(session.user.id)
          }, 0)
        }
      }
    )

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkProfileSetup = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .single()

      if (error || !profile?.username) {
        navigate('/auth/welcome')
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error checking profile:', error)
      navigate('/auth/welcome')
    }
  }

  const signIn = async (email: string, firstName?: string, redirectPath?: string) => {
    console.log('🚀 signIn called with:', { email, firstName, redirectPath });
    
    // Detectar si estamos en producción o desarrollo
    const isProduction = window.location.hostname !== 'localhost';
    const baseUrl = isProduction ? 
      'https://07dc8c76-e23d-4b0c-a41a-3f16d01f0993.lovableproject.com' : 
      'http://localhost:3000';
    
    // Usar el redirectPath correcto o callback por defecto
    const redirectUrl = redirectPath ? 
      `${baseUrl}${redirectPath}` : 
      `${baseUrl}/auth/callback`;
    
    console.log('📧 Email redirect URL:', redirectUrl);
    console.log('🌍 Environment:', isProduction ? 'production' : 'development');
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
        data: firstName ? { first_name: firstName } : undefined
      }
    })

    // Si es para payment-auth, crear el magic link correcto que va directo al pago
    if (!error && redirectPath?.includes('payment-auth')) {
      const planMatch = redirectPath.match(/plan=(\w+)/);
      const planType = planMatch ? planMatch[1] : 'monthly';
      
      // Crear el magic link que va directo al checkout de Stripe
      console.log('📧 Creating magic link for payment plan:', planType);
      
      // Enviar email personalizado con el plan específico
      setTimeout(() => {
        sendCustomWelcomeEmail(email, 'magic_link', {
          planType: planType,
          redirectPath: redirectPath
        });
      }, 2000); // Esperar un poco para que Supabase procese el OTP
    }
    
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
