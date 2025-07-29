import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { RefreshCcw, ArrowRight, Grid3X3, Share2, Twitter, Linkedin, Copy } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ResultActionsProps {
  slug: string
  score: number
  canRetry: boolean
}

export const ResultActions = ({ slug, score, canRetry }: ResultActionsProps) => {
  const { toast } = useToast()

  const handleShare = async (platform: 'twitter' | 'linkedin' | 'copy') => {
    const text = `¡Acabo de completar un reto de automatización en FlowForge con una puntuación de ${score}/100! 🚀`
    const url = window.location.href

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case 'copy':
        try {
          await navigator.clipboard.writeText(`${text} ${url}`)
          toast({
            title: "¡Copiado!",
            description: "El enlace se ha copiado al portapapeles"
          })
        } catch (error) {
          toast({
            title: "Error",
            description: "No se pudo copiar al portapapeles",
            variant: "destructive"
          })
        }
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Primary Actions */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {canRetry && (
              <Button asChild variant="outline" className="h-12">
                <Link to={`/challenge/${slug}`}>
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Intentar de nuevo
                </Link>
              </Button>
            )}
            
            <Button asChild className="h-12">
              <Link to="/challenges">
                <ArrowRight className="w-4 h-4 mr-2" />
                Siguiente reto
              </Link>
            </Button>
            
            <Button asChild variant="secondary" className="h-12">
              <Link to="/challenges">
                <Grid3X3 className="w-4 h-4 mr-2" />
                Todos los retos
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Share Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Comparte tu logro
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                onClick={() => handleShare('twitter')}
                variant="outline" 
                className="h-12 bg-[#1DA1F2]/10 border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/20"
              >
                <Twitter className="w-4 h-4 mr-2 text-[#1DA1F2]" />
                Twitter
              </Button>
              
              <Button 
                onClick={() => handleShare('linkedin')}
                variant="outline" 
                className="h-12 bg-[#0077B5]/10 border-[#0077B5]/30 hover:bg-[#0077B5]/20"
              >
                <Linkedin className="w-4 h-4 mr-2 text-[#0077B5]" />
                LinkedIn
              </Button>
              
              <Button 
                onClick={() => handleShare('copy')}
                variant="outline" 
                className="h-12"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar enlace
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Únete a la comunidad
            </h3>
            <p className="text-muted-foreground">
              Comparte tus soluciones, aprende de otros y participa en discusiones sobre automatización
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-12">
                <a href="https://discord.gg/hackyourflows" target="_blank" rel="noopener noreferrer">
                  Discord Community
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12">
                <Link to="/leaderboard">
                  Ver clasificación
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}