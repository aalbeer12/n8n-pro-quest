import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { Users, MessageSquare, Calendar, ExternalLink, ArrowLeft } from 'lucide-react'
import { SEOMeta } from '@/components/seo/seo-meta'

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title="Comunidad - FlowForge"
        description="Únete a nuestra comunidad de automatización y conecta con otros desarrolladores"
        canonical={`${window.location.origin}/community`}
      />
      
      <div className="container max-w-4xl mx-auto py-16 px-6">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Link>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Comunidad FlowForge
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conecta con otros desarrolladores, comparte conocimientos y crece junto a nuestra comunidad de automatización
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-primary/20 hover:border-primary/40 transition-colors h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Discord Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Únete a nuestro servidor de Discord para chatear en tiempo real, hacer preguntas y colaborar con otros miembros.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">24/7 Support</Badge>
                    <Badge variant="outline">Expert Tips</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Code Reviews</Badge>
                    <Badge variant="outline">Live Events</Badge>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <a 
                    href="https://discord.gg/flowforge" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Unirse a Discord
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-primary/20 hover:border-primary/40 transition-colors h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Foro de Discusión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Participa en discusiones detalladas, comparte tus proyectos y obtén feedback de la comunidad.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Q&A</Badge>
                    <Badge variant="outline">Project Showcase</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Tutorials</Badge>
                    <Badge variant="outline">Best Practices</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full" disabled>
                  <Calendar className="w-4 h-4 mr-2" />
                  Próximamente
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">¡Estamos Creciendo!</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Nuestra comunidad está en constante expansión. Síguenos en nuestras redes sociales 
                para estar al día con las últimas novedades y eventos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <a 
                    href="https://twitter.com/flowforge" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Twitter
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a 
                    href="https://linkedin.com/company/flowforge" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a 
                    href="https://github.com/flowforge" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    GitHub
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Community