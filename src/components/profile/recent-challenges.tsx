import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Clock, Target, Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Link } from 'react-router-dom'

interface RecentChallengesProps {
  userId: string
}

interface ChallengeSubmission {
  id: string
  score: number
  time_taken_seconds: number
  created_at: string
  challenge: {
    slug: string
    title: string
    difficulty: string
    category: string
  }
}

export const RecentChallenges = ({ userId }: RecentChallengesProps) => {
  const [submissions, setSubmissions] = useState<ChallengeSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchRecentChallenges = async () => {
      try {
        const { data: submissionsData, error } = await supabase
          .from('submissions')
          .select(`
            id,
            score,
            time_taken_seconds,
            created_at,
            challenges!inner(
              slug,
              title,
              difficulty,
              category
            )
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(20)

        if (error) {
          console.error('Error fetching recent challenges:', error)
          return
        }

        const processedSubmissions = submissionsData?.map(submission => ({
          ...submission,
          challenge: Array.isArray(submission.challenges) 
            ? submission.challenges[0] 
            : submission.challenges
        })) || []

        setSubmissions(processedSubmissions)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentChallenges()
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    if (score >= 50) return 'text-orange-400'
    return 'text-red-400'
  }

  const formatTime = (seconds: number) => {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Hoy'
    if (diffDays === 1) return 'Ayer'
    if (diffDays < 7) return `Hace ${diffDays} días`
    
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    })
  }

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle>Retos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (submissions.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Retos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Sin retos completados
            </h3>
            <p className="text-muted-foreground mb-4">
              Completa tu primer reto para verlo aquí
            </p>
            <Button asChild>
              <Link to="/challenges">Explorar retos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const displayedSubmissions = showAll ? submissions : submissions.slice(0, 5)

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="text-foreground">
          Retos Recientes ({submissions.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <Link
                    to={`/challenge/${submission.challenge.slug}`}
                    className="font-semibold text-foreground hover:text-primary transition-colors truncate"
                  >
                    {submission.challenge.title}
                  </Link>
                  
                  <Badge className={getDifficultyColor(submission.challenge.difficulty)}>
                    {submission.challenge.difficulty}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span className={getScoreColor(submission.score)}>
                      {submission.score}/100
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(submission.time_taken_seconds)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(submission.created_at)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Button asChild size="sm" variant="outline">
                  <Link to={`/challenge/${submission.challenge.slug}/result`}>
                    Ver resultado
                  </Link>
                </Button>
              </div>
            </div>
          ))}

          {submissions.length > 5 && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Mostrar menos' : `Ver todos (${submissions.length})`}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}