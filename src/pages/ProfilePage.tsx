import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { Skeleton } from '@/components/ui/skeleton'
import { ProfileHeader } from '@/components/profile/profile-header'
import { StatsOverview } from '@/components/profile/stats-overview'
import { SkillsRadar } from '@/components/profile/skills-radar'
import { AchievementShowcase } from '@/components/profile/achievement-showcase'
import { ActivityHeatmap } from '@/components/profile/activity-heatmap'
import { RecentChallenges } from '@/components/profile/recent-challenges'
import { PortfolioSection } from '@/components/profile/portfolio-section'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface UserProfile {
  id: string
  username: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  github_url: string | null
  linkedin_url: string | null
  website_url: string | null
  xp_total: number
  current_streak: number
  longest_streak: number
  current_level: string
  is_public: boolean
  created_at: string
  last_activity_date: string | null
}

const ProfilePage = () => {
  const { username } = useParams()
  const { toast } = useToast()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOwnProfile, setIsOwnProfile] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return

      try {
        // Get profile by username
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single()

        if (profileError) {
          console.error('Error fetching profile:', profileError)
          toast({
            title: "Error",
            description: "No se pudo encontrar el perfil del usuario",
            variant: "destructive"
          })
          return
        }

        // Check if profile is public or if it's the user's own profile
        const { data: { user } } = await supabase.auth.getUser()
        const isOwn = user?.id === profileData.id
        setIsOwnProfile(isOwn)

        if (!profileData.is_public && !isOwn) {
          toast({
            title: "Perfil privado",
            description: "Este perfil es privado y no puede ser visualizado",
            variant: "destructive"
          })
          return
        }

        setProfile(profileData)
      } catch (error) {
        console.error('Error:', error)
        toast({
          title: "Error",
          description: "Ocurrió un error inesperado",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [username, toast])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-6">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-6">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Link>
          </Button>
          
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Usuario no encontrado
            </h1>
            <p className="text-muted-foreground mb-6">
              El perfil que buscas no existe o es privado.
            </p>
            <Button asChild>
              <Link to="/dashboard">Volver al Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Back button */}
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Link>
        </Button>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Profile info */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <ProfileHeader 
                profile={profile} 
                isOwnProfile={isOwnProfile}
              />
              
              <StatsOverview 
                profile={profile}
              />
            </div>
          </div>

          {/* Right content - Activities and achievements */}
          <div className="lg:col-span-2 space-y-8">
            <SkillsRadar userId={profile.id} />
            
            <AchievementShowcase userId={profile.id} />
            
            <ActivityHeatmap userId={profile.id} />
            
            <PortfolioSection 
              userId={profile.id} 
              isOwnProfile={isOwnProfile}
            />
            
            <RecentChallenges userId={profile.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage