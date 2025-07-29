import { useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  LogOut, 
  Sparkles, 
  MessageSquare, 
  Users, 
  Trophy,
  ExternalLink
} from 'lucide-react'

// Dashboard components
import { TodayChallenge } from '@/components/dashboard/today-challenge-section'
import { StreakSection } from '@/components/dashboard/streak-section'
import { StatsGrid } from '@/components/dashboard/stats-grid'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { AchievementsShowcase } from '@/components/dashboard/achievements-showcase'

const Dashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const {
    profile,
    todayChallenge,
    todaySubmission,
    recentSubmissions,
    recentAchievements,
    globalRank,
    loading,
    error
  } = useDashboardData()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth')
    }
  }, [user, authLoading, navigate])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Cargando tu dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    const username = profile?.display_name || profile?.username || 'Usuario'
    
    if (hour < 12) {
      return `¡Buenos días, ${username}! ¿Listo para el reto de hoy?`
    } else if (hour < 18) {
      return `¡Buenas tardes, ${username}! Mantengamos el impulso.`
    } else {
      return `¡Buenas noches, ${username}! Perfecto momento para practicar automatización.`
    }
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-primary">FlowForge</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-primary">
                  {profile?.display_name || profile?.username}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              
              <Button onClick={signOut} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-primary">
              {getTimeBasedGreeting()}
            </h2>
            <p className="text-muted-foreground capitalize">
              {getCurrentDate()}
            </p>
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Recent Activity */}
          <div className="lg:col-span-3 order-3 lg:order-1">
            <RecentActivity 
              submissions={recentSubmissions} 
              loading={loading} 
            />
          </div>

          {/* Center - Main Challenge + Stats */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
            {/* Today's Challenge */}
            <TodayChallenge
              challenge={todayChallenge}
              submission={todaySubmission}
              loading={loading}
            />

            {/* Stats Grid */}
            <StatsGrid
              profile={profile}
              globalRank={globalRank}
              loading={loading}
            />
          </div>

          {/* Right Sidebar - Streak + Achievements */}
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-3">
            <StreakSection profile={profile} loading={loading} />
            <AchievementsShowcase 
              achievements={recentAchievements} 
              loading={loading} 
            />
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card className="p-6 bg-surface/50 backdrop-blur-sm border-border">
            <h3 className="text-lg font-semibold text-primary mb-4">Acciones Rápidas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-12">
                <Link to="/challenges">
                  <Trophy className="w-4 h-4 mr-2" />
                  Explorar Retos
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-12">
                <Link to="/leaderboard">
                  <Users className="w-4 h-4 mr-2" />
                  Ver Ranking
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-12">
                <a 
                  href="https://discord.gg/hackyourflows" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Unirse a Discord
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <Card className="p-4 bg-destructive/10 border-destructive/20">
              <p className="text-destructive text-sm">
                Error: {error}
              </p>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default Dashboard