import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from 'react-router-dom'
import { Loader2, Sparkles, User } from 'lucide-react'

const AuthWelcome = () => {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  // Redirect if not authenticated
  if (!user) {
    navigate('/auth')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username) return

    setIsLoading(true)
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          display_name: displayName || username
        })
        .eq('id', user.id)

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Username taken",
            description: "This username is already taken. Please choose another one.",
            variant: "destructive"
          })
        } else {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive"
          })
        }
      } else {
        toast({
          title: "Welcome to Hack-Your-Flows!",
          description: "Your profile has been created successfully.",
        })
        navigate('/dashboard')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome!</h1>
          <p className="text-muted-foreground">
            Let's set up your profile to get started
          </p>
        </div>

        <Card className="p-8 bg-surface/50 backdrop-blur-sm border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">
                Username <span className="text-destructive">*</span>
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a unique username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                required
                className="bg-background/50"
                maxLength={30}
              />
              <p className="text-xs text-muted-foreground">
                Only lowercase letters, numbers, hyphens, and underscores allowed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display name (optional)</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="How others will see your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-background/50"
                maxLength={50}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || !username}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating profile...
                </>
              ) : (
                <>
                  <User className="mr-2 h-4 w-4" />
                  Complete setup
                </>
              )}
            </Button>
          </form>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          You'll be able to change these settings later in your profile
        </div>
      </motion.div>
    </div>
  )
}

export default AuthWelcome