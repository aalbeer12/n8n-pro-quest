import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/integrations/supabase/client'
import { Challenge, Submission } from '@/types/database'
import { useToast } from '@/hooks/use-toast'

// Components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Clock, 
  Coins, 
  User, 
  Target, 
  Lightbulb,
  Save,
  RotateCcw,
  Send,
  HelpCircle,
  ChevronRight,
  Database,
  Workflow,
  Zap,
  Shield,
  Settings
} from 'lucide-react'

// Challenge components
import { StoryContextPanel } from '@/components/challenge/story-context-panel'
import { RequirementsSection } from '@/components/challenge/requirements-section'
import { CodeEditor } from '@/components/challenge/code-editor'
import { HintsSystem } from '@/components/challenge/hints-system'
import { TimerComponent } from '@/components/challenge/timer-component'
import { SubmissionModal } from '@/components/challenge/submission-modal'

const difficultyConfig = {
  easy: { color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', label: 'Fácil' },
  medium: { color: 'bg-amber-500/20 text-amber-300 border-amber-500/30', label: 'Medio' },
  hard: { color: 'bg-rose-500/20 text-rose-300 border-rose-500/30', label: 'Difícil' },
  expert: { color: 'bg-violet-500/20 text-violet-300 border-violet-500/30', label: 'Experto' }
}

const categoryIcons = {
  'data-processing': Database,
  'api-integration': Workflow,
  'workflow-logic': Zap,
  'error-handling': Shield,
  'optimization': Settings
}

const categoryLabels = {
  'data-processing': 'Procesamiento de Datos',
  'api-integration': 'Integración de APIs',
  'workflow-logic': 'Lógica de Flujo',
  'error-handling': 'Manejo de Errores',
  'optimization': 'Optimización'
}

const ChallengePage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()

  // State
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [solution, setSolution] = useState('')
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [detectedRequirements, setDetectedRequirements] = useState<string[]>([])
  const [usedHints, setUsedHints] = useState<number[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timerPaused, setTimerPaused] = useState(false)

  // Refs
  const autoSaveRef = useRef<NodeJS.Timeout>()
  const startTimeRef = useRef<Date>(new Date())

  // Load challenge data
  useEffect(() => {
    if (!slug) return

    const fetchChallenge = async () => {
      try {
        setLoading(true)

        // Fetch challenge
        const { data: challengeData, error: challengeError } = await supabase
          .from('challenges')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single()

        if (challengeError || !challengeData) {
          toast({
            title: "Reto no encontrado",
            description: "Este reto no existe o no está disponible.",
            variant: "destructive"
          })
          navigate('/challenges')
          return
        }

        setChallenge(challengeData as Challenge)

        // Load previous attempt or template
        if (user) {
          const { data: submissionData } = await supabase
            .from('submissions')
            .select('workflow_json')
            .eq('user_id', user.id)
            .eq('challenge_id', challengeData.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle()

          if (submissionData?.workflow_json) {
            setSolution(JSON.stringify(submissionData.workflow_json, null, 2))
          } else {
            // Load from localStorage if no previous submission
            const saved = localStorage.getItem(`challenge_${slug}_solution`)
            if (saved) {
              setSolution(saved)
            } else {
              // Set template
              setSolution('{\n  "nodes": [],\n  "connections": {}\n}')
            }
          }
        }

      } catch (error) {
        console.error('Error loading challenge:', error)
        toast({
          title: "Error",
          description: "No se pudo cargar el reto. Inténtalo de nuevo.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchChallenge()
  }, [slug, user, navigate, toast])

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (!solution || !user || !challenge) return

    setSaving(true)
    try {
      localStorage.setItem(`challenge_${slug}_solution`, solution)
      setLastSaved(new Date())
      
      // Optional: Save to database for persistence across devices
      // await supabase.from('challenge_drafts').upsert({
      //   user_id: user.id,
      //   challenge_id: challenge.id,
      //   draft_solution: solution
      // })
      
    } catch (error) {
      console.error('Auto-save failed:', error)
    } finally {
      setSaving(false)
    }
  }, [solution, user, challenge, slug])

  // Set up auto-save
  useEffect(() => {
    if (autoSaveRef.current) {
      clearTimeout(autoSaveRef.current)
    }

    autoSaveRef.current = setTimeout(() => {
      autoSave()
    }, 10000) // Auto-save every 10 seconds

    return () => {
      if (autoSaveRef.current) {
        clearTimeout(autoSaveRef.current)
      }
    }
  }, [solution, autoSave])

  // Validate JSON and detect requirements
  useEffect(() => {
    try {
      const parsed = JSON.parse(solution)
      setIsValid(true)
      
      // Basic validation for n8n workflow structure
      if (parsed.nodes && Array.isArray(parsed.nodes)) {
        // Detect requirements based on nodes
        const nodeTypes = parsed.nodes.map((node: any) => node.type || '').filter(Boolean)
        
        // This would be more sophisticated in a real implementation
        const detected: string[] = []
        if (challenge?.requirements) {
          const requirements = challenge.requirements as any
          if (requirements.must_include) {
            requirements.must_include.forEach((req: string) => {
              if (nodeTypes.some((type: string) => type.toLowerCase().includes(req.toLowerCase()))) {
                detected.push(req)
              }
            })
          }
        }
        
        setDetectedRequirements(detected)
      }
    } catch (error) {
      setIsValid(false)
      setDetectedRequirements([])
    }
  }, [solution, challenge])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'Enter':
            e.preventDefault()
            if (isValid) handleSubmit()
            break
          case 's':
            e.preventDefault()
            autoSave()
            break
          case 'f':
            e.preventDefault()
            formatCode()
            break
        }
      } else if (e.key === 'Escape') {
        // Exit fullscreen or close modals
        setShowSubmissionModal(false)
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [isValid, autoSave])

  const formatCode = () => {
    try {
      const parsed = JSON.parse(solution)
      setSolution(JSON.stringify(parsed, null, 2))
      toast({
        title: "Código formateado",
        description: "JSON formateado correctamente"
      })
    } catch (error) {
      toast({
        title: "Error de formato",
        description: "El JSON no es válido",
        variant: "destructive"
      })
    }
  }

  const handleSubmit = () => {
    if (!isValid) return
    setShowSubmissionModal(true)
  }

  const confirmSubmission = async () => {
    if (!user || !challenge || !isValid) return

    setSubmitting(true)
    try {
      const { error } = await supabase
        .from('submissions')
        .insert({
          user_id: user.id,
          challenge_id: challenge.id,
          workflow_json: JSON.parse(solution),
          workflow_description: `Submitted on ${new Date().toISOString()}`,
          time_taken_seconds: Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000),
          status: 'pending'
        })

      if (error) throw error

      toast({
        title: "¡Solución enviada!",
        description: "Tu solución está siendo evaluada..."
      })

      // Navigate to results page (to be implemented)
      navigate(`/challenge/${slug}/result`)

    } catch (error) {
      console.error('Submission error:', error)
      toast({
        title: "Error al enviar",
        description: "No se pudo enviar la solución. Inténtalo de nuevo.",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
      setShowSubmissionModal(false)
    }
  }

  const resetChallenge = () => {
    setSolution('{\n  "nodes": [],\n  "connections": {}\n}')
    setUsedHints([])
    setTimeElapsed(0)
    startTimeRef.current = new Date()
    localStorage.removeItem(`challenge_${slug}_solution`)
    
    toast({
      title: "Reto reiniciado",
      description: "Empezando de nuevo"
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Cargando reto...</p>
        </div>
      </div>
    )
  }

  if (!challenge) {
    return null
  }

  const CategoryIcon = categoryIcons[challenge.category]
  const difficultyStyle = difficultyConfig[challenge.difficulty]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/challenges" className="hover:text-primary transition-colors">
              Retos
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary">{challenge.title}</span>
          </nav>

          {/* Title and Metadata */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-primary">
                  {challenge.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={`${difficultyStyle.color} border`} variant="outline">
                    {difficultyStyle.label}
                  </Badge>
                  
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CategoryIcon className="w-3 h-3" />
                    {categoryLabels[challenge.category]}
                  </Badge>
                  
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Coins className="w-3 h-3 text-warning" />
                    {challenge.points} puntos
                  </Badge>
                  
                  {challenge.time_estimate_minutes && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ~{challenge.time_estimate_minutes} min
                    </Badge>
                  )}
                </div>
              </div>

              <Button asChild variant="ghost" size="sm">
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Story and Requirements */}
          <div className="lg:col-span-5 space-y-6">
            <StoryContextPanel challenge={challenge} />
            <RequirementsSection 
              challenge={challenge} 
              detectedRequirements={detectedRequirements}
            />
            <HintsSystem 
              challenge={challenge}
              usedHints={usedHints}
              onHintUsed={(hintIndex) => setUsedHints([...usedHints, hintIndex])}
            />
          </div>

          {/* Right Column - Editor */}
          <div className="lg:col-span-7 space-y-6">
            {challenge.time_estimate_minutes && (
              <TimerComponent
                timeElapsed={timeElapsed}
                onTimeUpdate={setTimeElapsed}
                paused={timerPaused}
                onPauseToggle={() => setTimerPaused(!timerPaused)}
              />
            )}
            
            <CodeEditor
              value={solution}
              onChange={setSolution}
              isValid={isValid}
              saving={saving}
              lastSaved={lastSaved}
              onFormat={formatCode}
              onReset={resetChallenge}
            />
          </div>
        </div>

        {/* Fixed Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:mt-8">
          <div className="lg:max-w-7xl lg:mx-auto lg:px-6">
            <Card className="m-4 lg:m-0 p-4 bg-surface/95 backdrop-blur border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Save className="w-4 h-4" />
                    {saving ? 'Guardando...' : lastSaved ? `Guardado ${lastSaved.toLocaleTimeString()}` : 'Sin guardar'}
                  </div>
                  
                  <Separator orientation="vertical" className="h-4" />
                  
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {detectedRequirements.length} requisitos detectados
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('https://discord.gg/hackyourflows', '_blank')}
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    ¿Necesitas ayuda?
                  </Button>
                  
                  <Button 
                    onClick={handleSubmit}
                    disabled={!isValid || submitting}
                    size="sm"
                    className="min-w-[120px]"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Solución
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      <SubmissionModal
        open={showSubmissionModal}
        onOpenChange={setShowSubmissionModal}
        challenge={challenge}
        detectedRequirements={detectedRequirements}
        onConfirm={confirmSubmission}
        submitting={submitting}
      />
    </div>
  )
}

export default ChallengePage