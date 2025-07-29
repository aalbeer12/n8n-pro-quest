import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Filter } from 'lucide-react'
import { useChallenges } from '@/hooks/use-challenges'
import { ChallengeCard } from '@/components/challenges/challenge-card'
import { ChallengeFilters } from '@/components/challenges/challenge-filters'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { useDashboardData } from '@/hooks/use-dashboard-data'

const Challenges = () => {
  const { user } = useAuth()
  const { profile } = useDashboardData()
  const userLevel = profile?.current_level || 'beginner'
  const { challenges, loading, error } = useChallenges(userLevel)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredChallenges = useMemo(() => {
    return challenges.filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty
      const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory
      
      return matchesSearch && matchesDifficulty && matchesCategory
    })
  }, [challenges, searchTerm, selectedDifficulty, selectedCategory])

  const dailyChallenges = filteredChallenges.filter(c => c.is_daily_challenge)
  const regularChallenges = filteredChallenges.filter(c => !c.is_daily_challenge)

  const handleClearFilters = () => {
    setSelectedDifficulty('all')
    setSelectedCategory('all')
    setSearchTerm('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando retos...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16">
            <p className="text-red-500 mb-4">Error al cargar los retos: {error}</p>
            <Button onClick={() => window.location.reload()}>
              Intentar de nuevo
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Link>
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary">Explorar Retos</h1>
              <p className="text-muted-foreground">
                Descubre todos los retos disponibles para mejorar tus habilidades
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar retos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <ChallengeFilters
              selectedDifficulty={selectedDifficulty}
              selectedCategory={selectedCategory}
              onDifficultyChange={setSelectedDifficulty}
              onCategoryChange={setSelectedCategory}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>

        {dailyChallenges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">Retos Diarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  id={challenge.id}
                  title={challenge.title}
                  description={challenge.description}
                  difficulty={challenge.difficulty}
                  category={challenge.category}
                  points={challenge.points}
                  timeEstimate={challenge.time_estimate_minutes}
                  slug={challenge.slug}
                  isDailyChallenge={challenge.is_daily_challenge}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">
            Todos los Retos {regularChallenges.length > 0 && `(${regularChallenges.length})`}
          </h2>
          
          {regularChallenges.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-primary mb-2">
                No se encontraron retos
              </h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar tus filtros o términos de búsqueda
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  id={challenge.id}
                  title={challenge.title}
                  description={challenge.description}
                  difficulty={challenge.difficulty}
                  category={challenge.category}
                  points={challenge.points}
                  timeEstimate={challenge.time_estimate_minutes}
                  slug={challenge.slug}
                  isDailyChallenge={challenge.is_daily_challenge}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Challenges