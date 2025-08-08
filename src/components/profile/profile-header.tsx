import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Calendar, 
  Github, 
  Linkedin, 
  Globe, 
  Share2, 
  Copy,
  Settings,
  Camera
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useSubscription } from '@/hooks/use-subscription'

interface ProfileHeaderProps {
  profile: {
    id: string
    username: string
    display_name: string | null
    bio: string | null
    avatar_url: string | null
    github_url: string | null
    linkedin_url: string | null
    website_url: string | null
    current_level: string
    created_at: string
  }
  isOwnProfile: boolean
}

export const ProfileHeader = ({ profile, isOwnProfile }: ProfileHeaderProps) => {
  const { toast } = useToast()
  const { isPro } = useSubscription()

  const handleCopyProfile = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "¡Copiado!",
        description: "El enlace del perfil se ha copiado al portapapeles"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar al portapapeles",
        variant: "destructive"
      })
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Perfil de ${profile.display_name || profile.username}`,
        text: `Mira el perfil de ${profile.display_name || profile.username} en FlowForge`,
        url: window.location.href
      })
    } else {
      handleCopyProfile()
    }
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'intermediate': return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
      case 'advanced': return 'bg-purple-500/20 text-purple-400 border-purple-500/50'
      case 'expert': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Avatar and basic info */}
          <div className="text-center">
            <div className="relative inline-block">
              <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20">
                <AvatarImage 
                  src={profile.avatar_url || undefined} 
                  alt={profile.display_name || profile.username}
                />
                <AvatarFallback className="text-2xl">
                  {getInitials(profile.display_name || profile.username)}
                </AvatarFallback>
              </Avatar>
              
              {isOwnProfile && (
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                {profile.display_name || profile.username}
              </h1>
              <p className="text-muted-foreground">@{profile.username}</p>
              
              <div className="flex items-center justify-center gap-2">
                <Badge className={getLevelColor(profile.current_level)}>
                  {profile.current_level}
                </Badge>
                {isPro ? (
                  <Badge className="bg-primary/10 text-primary border-primary/20">PRO</Badge>
                ) : (
                  <Badge variant="outline">FREE</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="text-center">
              <p className="text-foreground leading-relaxed">
                {profile.bio}
              </p>
            </div>
          )}

          {/* Member since */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              Miembro desde {new Date(profile.created_at).toLocaleDateString('es-ES', {
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-2">
            {profile.github_url && (
              <Button asChild size="sm" variant="outline">
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
            
            {profile.linkedin_url && (
              <Button asChild size="sm" variant="outline">
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
            )}
            
            {profile.website_url && (
              <Button asChild size="sm" variant="outline">
                <a href={profile.website_url} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            {isOwnProfile ? (
              <>
                <Button className="w-full" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Editar perfil
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyProfile}>
                    <Copy className="w-4 h-4 mr-1" />
                    Copiar
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-1" />
                    Compartir
                  </Button>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyProfile}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copiar
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-1" />
                  Compartir
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}