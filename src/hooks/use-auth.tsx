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

  const sendWelcomeEmail = async (email: string, isNewUser: boolean = false) => {
    try {
      await supabase.functions.invoke('send-auth-email', {
        body: {
          to: email,
          type: isNewUser ? 'welcome' : 'login',
          data: { appUrl: window.location.origin }
        }
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Send email for login/signup  
        if (event === 'SIGNED_IN' && session?.user?.email) {
          // Check if this is a new user by checking if they have a profile
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('id, created_at')
              .eq('id', session.user.id)
              .single();
            
            // If no profile exists or profile was just created (less than 5 minutes ago), it's a new user
            const isNewUser = !profile || 
              (profile.created_at && new Date(profile.created_at) > new Date(Date.now() - 5 * 60 * 1000));
            
            sendWelcomeEmail(session.user.email!, isNewUser);
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
    const redirectUrl = redirectPath ? 
      `${window.location.origin}${redirectPath}` : 
      `${window.location.origin}/auth/callback`;
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
        data: firstName ? { first_name: firstName } : undefined
      }
    })
    
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