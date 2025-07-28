import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { ScoreReveal } from '@/components/challenge/score-reveal'
import { ScoreBreakdown } from '@/components/challenge/score-breakdown'
import { AIFeedback } from '@/components/challenge/ai-feedback'
import { XPAchievements } from '@/components/challenge/xp-achievements'
import { ResultActions } from '@/components/challenge/result-actions'

interface SubmissionResult {
  id: string
  score: number
  ai_feedback: any
  score_breakdown: any
  time_taken_seconds: number
  created_at: string
  attempt_number: number
  challenge: {
    title: string
    points: number
  }
}

const ChallengeResult = () => {
  const { slug } = useParams()
  const { toast } = useToast()
  const [result, setResult] = useState<SubmissionResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // Get the latest submission for this challenge by the current user
        const { data: submission, error } = await supabase
          .from('submissions')
          .select(`
            id,
            score,
            ai_feedback,
            score_breakdown,
            time_taken_seconds,
            created_at,
            attempt_number,
            challenges!inner(title, points)
          `)
          .eq('challenges.slug', slug)
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (error) {
          console.error('Error fetching result:', error)
          toast({
            title: "Error",
            description: "No se pudo cargar el resultado del reto",
            variant: "destructive"
          })
          return
        }

        setResult({
          ...submission,
          challenge: Array.isArray(submission.challenges) 
            ? submission.challenges[0] 
            : submission.challenges
        })
      } catch (error) {
        console.error('Error:', error)
        toast({
          title: "Error",
          description: "Ocurrió un error inesperado",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchResult()
    }
  }, [slug, toast])

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Link>
          </Button>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Resultado no encontrado
            </h1>
            <p className="text-muted-foreground mb-6">
              No se encontró ningún resultado para este reto.
            </p>
            <Button asChild>
              <Link to="/dashboard">Volver al Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Link>
          </Button>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {result.challenge.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Intento #{result.attempt_number}</span>
              <span>•</span>
              <span>{new Date(result.created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <ScoreReveal score={result.score} />
          
          <ScoreBreakdown 
            breakdown={result.score_breakdown}
            timeTaken={result.time_taken_seconds}
          />
          
          <AIFeedback feedback={result.ai_feedback} />
          
          <XPAchievements 
            score={result.score}
            challengePoints={result.challenge.points}
          />
          
          <ResultActions 
            slug={slug!}
            score={result.score}
            canRetry={result.score < 100}
          />
        </div>
      </div>
    </div>
  )
}

export default ChallengeResult