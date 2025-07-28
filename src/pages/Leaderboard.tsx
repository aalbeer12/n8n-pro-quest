import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowLeft, Users } from 'lucide-react'

const Leaderboard = () => {
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
          
          <h1 className="text-3xl font-bold text-primary">Ranking Global</h1>
          <p className="text-muted-foreground">
            Compite con otros desarrolladores de automatización
          </p>
        </div>

        <Card className="p-8 text-center bg-surface/50 backdrop-blur-sm border-border">
          <Users className="w-16 h-16 mx-auto text-primary mb-4" />
          <h2 className="text-xl font-semibold text-primary mb-2">
            Página en construcción
          </h2>
          <p className="text-muted-foreground mb-6">
            Aquí podrás ver el ranking global, tu posición y competir con otros usuarios.
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

export default Leaderboard