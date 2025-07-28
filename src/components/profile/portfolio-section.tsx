import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Star, ExternalLink, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Link } from 'react-router-dom'

interface PortfolioSectionProps {
  userId: string
  isOwnProfile: boolean
}

interface FeaturedSolution {
  id: string
  score: number
  workflow_description: string | null
  created_at: string
  challenge: {
    slug: string
    title: string
    difficulty: string
    story_context: string
  }
}

export const PortfolioSection = ({ userId, isOwnProfile }: PortfolioSectionProps) => {
  const [featuredSolutions, setFeaturedSolutions] = useState<FeaturedSolution[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedSolutions = async () => {
      try {
        // Get user's best solutions (top 3 by score)
        const { data: submissionsData, error } = await supabase
          .from('submissions')
          .select(`
            id,
            score,
            workflow_description,
            created_at,
            challenges!inner(
              slug,
              title,
              difficulty,
              story_context
            )
          `)
          .eq('user_id', userId)
          .gte('score', 70) // Only show good solutions
          .order('score', { ascending: false })
          .limit(3)

        if (error) {
          console.error('Error fetching featured solutions:', error)
          return
        }

        const processedSolutions = submissionsData?.map(submission => ({
          ...submission,
          challenge: Array.isArray(submission.challenges) 
            ? submission.challenges[0] 
            : submission.challenges
        })) || []

        setFeaturedSolutions(processedSolutions)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedSolutions()
  }, [userId])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/50'
      case 'expert': return 'bg-purple-500/20 text-purple-400 border-purple-500/50'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  const getScoreStars = (score: number) => {
    if (score >= 95) return 5
    if (score >= 85) return 4
    if (score >= 75) return 3
    if (score >= 65) return 2
    return 1
  }

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle>Soluciones Destacadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (featuredSolutions.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-foreground">
            <span>Soluciones Destacadas</span>
            {isOwnProfile && (
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Gestionar
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Star className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Sin soluciones destacadas
            </h3>
            <p className="text-muted-foreground mb-4">
              {isOwnProfile 
                ? 'Completa retos con buenas puntuaciones para destacar tus mejores soluciones'
                : 'Este usuario aún no tiene soluciones destacadas'
              }
            </p>
            {isOwnProfile && (
              <Button asChild>
                <Link to="/challenges">Explorar retos</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <span>Soluciones Destacadas</span>
          {isOwnProfile && (
            <Button size="sm" variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Gestionar
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredSolutions.map((solution) => (
            <Card key={solution.id} className="bg-muted/20 border-border hover:bg-muted/30 transition-colors">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header with title and difficulty */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-foreground leading-tight">
                        {solution.challenge.title}
                      </h3>
                      <Badge className={getDifficultyColor(solution.challenge.difficulty)}>
                        {solution.challenge.difficulty}
                      </Badge>
                    </div>
                    
                    {/* Score with stars */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(getScoreStars(solution.score))].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        {[...Array(5 - getScoreStars(solution.score))].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-muted-foreground" />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {solution.score}/100
                      </span>
                    </div>
                  </div>

                  {/* Challenge context */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {solution.challenge.story_context.slice(0, 120)}...
                  </p>

                  {/* User description if available */}
                  {solution.workflow_description && (
                    <div className="border-l-2 border-primary/20 pl-3">
                      <p className="text-sm text-foreground italic">
                        "{solution.workflow_description.slice(0, 80)}..."
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(solution.created_at).toLocaleDateString('es-ES')}
                    </span>
                    
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/challenge/${solution.challenge.slug}/result`}>
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Ver solución
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}