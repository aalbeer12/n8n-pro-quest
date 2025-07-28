import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LogOut, User, Sparkles } from 'lucide-react'

const Dashboard = () => {
  const { user, signOut, loading } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth')
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Hack-Your-Flows</h1>
          </div>
          <Button onClick={signOut} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-8 bg-surface/50 backdrop-blur-sm border-border text-center">
            <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              ¡Bienvenido a Hack-Your-Flows!
            </h2>
            <p className="text-muted-foreground mb-4">
              Tu plataforma de aprendizaje gamificada para n8n
            </p>
            <p className="text-sm text-muted-foreground">
              Email: {user.email}
            </p>
          </Card>
        </motion.div>

        {/* Placeholder for future dashboard content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-surface/50 backdrop-blur-sm border-border">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Dashboard en construcción
            </h3>
            <p className="text-muted-foreground">
              Aquí aparecerá tu panel principal con:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Reto diario</li>
              <li>Racha actual</li>
              <li>Estadísticas de progreso</li>
              <li>Logros desbloqueados</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard