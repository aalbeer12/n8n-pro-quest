import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowLeft, Trophy } from 'lucide-react'

const ChallengeResult = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold text-primary">Resultado del Reto</h1>
          <p className="text-muted-foreground">
            Aquí verás los resultados de tu evaluación
          </p>
        </div>

        <Card className="p-8 text-center bg-surface/50 backdrop-blur-sm border-border">
          <Trophy className="w-16 h-16 mx-auto text-primary mb-4" />
          <h2 className="text-xl font-semibold text-primary mb-2">
            Página en construcción
          </h2>
          <p className="text-muted-foreground mb-6">
            Aquí aparecerá tu puntuación, feedback de IA y análisis detallado de tu solución.
          </p>
          
          <Button asChild>
            <Link to="/dashboard">
              Volver al Dashboard
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default ChallengeResult