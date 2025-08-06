import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { BookOpen, Calendar, ExternalLink, ArrowLeft, PenTool, Target } from 'lucide-react'
import { SEOMeta } from '@/components/seo/seo-meta'

const Blog = () => {
  const upcomingPosts = [
    {
      title: "Mejores Prácticas para Automatización n8n",
      description: "Descubre las técnicas más efectivas para crear flujos robustos y escalables",
      category: "Tutorial",
      date: "Próximamente"
    },
    {
      title: "Casos de Estudio: Automatización en Empresas Reales",
      description: "Explora cómo las empresas transforman sus procesos con automatización",
      category: "Caso de Estudio",
      date: "Próximamente"
    },
    {
      title: "Guía Completa de Integraciones API",
      description: "Domina las integraciones con APIs externas en tus flujos de automatización",
      category: "Guía",
      date: "Próximamente"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title="Blog - FlowForge"
        description="Artículos, tutoriales y recursos sobre automatización n8n y desarrollo"
        canonical={`${window.location.origin}/blog`}
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
            Blog FlowForge
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Artículos, tutoriales y recursos para dominar la automatización n8n y mejorar tus habilidades de desarrollo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <PenTool className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-2xl font-bold mb-4">¡Estamos Preparando Contenido Increíble!</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Nuestro equipo está trabajando en artículos de alta calidad que te ayudarán a dominar 
                la automatización. Mientras tanto, explora nuestros retos prácticos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/challenges">
                    <Target className="w-4 h-4 mr-2" />
                    Explorar Retos
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/community">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Unirse a la Comunidad
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Próximos Artículos</h3>
          <div className="space-y-6">
            {upcomingPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="border-border/50 hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                        <p className="text-muted-foreground">{post.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {post.category}
                        </Badge>
                        <p className="text-sm text-muted-foreground">{post.date}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="border-primary/20">
            <CardContent className="p-8">
              <Calendar className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Mantente Informado</h3>
              <p className="text-muted-foreground mb-6">
                Suscríbete a nuestro Discord para recibir notificaciones cuando publiquemos nuevos artículos y tutoriales.
              </p>
              <Button asChild>
                <a 
                  href="https://discord.gg/flowforge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Unirse a Discord
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Blog