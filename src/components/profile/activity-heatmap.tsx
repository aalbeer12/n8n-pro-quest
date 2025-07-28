import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface ActivityHeatmapProps {
  userId: string
}

interface ActivityData {
  date: string
  count: number
}

export const ActivityHeatmap = ({ userId }: ActivityHeatmapProps) => {
  const [activityData, setActivityData] = useState<ActivityData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        // Get last 365 days of activity
        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - 365)

        const { data: submissions, error } = await supabase
          .from('submissions')
          .select('created_at')
          .eq('user_id', userId)
          .gte('created_at', startDate.toISOString())
          .lte('created_at', endDate.toISOString())

        if (error) {
          console.error('Error fetching activity data:', error)
          return
        }

        // Process data into daily counts
        const dailyCounts: { [key: string]: number } = {}
        
        submissions?.forEach(submission => {
          const date = new Date(submission.created_at).toISOString().split('T')[0]
          dailyCounts[date] = (dailyCounts[date] || 0) + 1
        })

        // Generate full year with empty days
        const activityArray: ActivityData[] = []
        const currentDate = new Date(startDate)
        
        while (currentDate <= endDate) {
          const dateStr = currentDate.toISOString().split('T')[0]
          activityArray.push({
            date: dateStr,
            count: dailyCounts[dateStr] || 0
          })
          currentDate.setDate(currentDate.getDate() + 1)
        }

        setActivityData(activityArray)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivityData()
  }, [userId])

  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-muted/30'
    if (count === 1) return 'bg-primary/30'
    if (count === 2) return 'bg-primary/60'
    if (count >= 3) return 'bg-primary'
    return 'bg-muted/30'
  }

  const getMonthLabels = () => {
    const months = []
    const now = new Date()
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push(date.toLocaleDateString('es-ES', { month: 'short' }))
    }
    return months
  }

  const getWeekData = () => {
    // Group data by weeks (7-day chunks)
    const weeks: ActivityData[][] = []
    for (let i = 0; i < activityData.length; i += 7) {
      weeks.push(activityData.slice(i, i + 7))
    }
    return weeks
  }

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle>Actividad</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    )
  }

  const totalSubmissions = activityData.reduce((sum, day) => sum + day.count, 0)
  const activeDays = activityData.filter(day => day.count > 0).length
  const weeks = getWeekData()
  const monthLabels = getMonthLabels()

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Actividad del último año</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stats summary */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>
              <strong className="text-foreground">{totalSubmissions}</strong> envíos
            </span>
            <span>
              <strong className="text-foreground">{activeDays}</strong> días activos
            </span>
            <span>
              <strong className="text-foreground">{Math.round((activeDays / 365) * 100)}%</strong> de los días
            </span>
          </div>

          {/* Heatmap */}
          <div className="overflow-x-auto">
            <div className="space-y-1">
              {/* Month labels */}
              <div className="flex gap-1 mb-2 text-xs text-muted-foreground">
                {monthLabels.map((month, index) => (
                  <div key={index} className="w-3" style={{ marginRight: '2px' }}>
                    {index % 2 === 0 ? month : ''}
                  </div>
                ))}
              </div>

              {/* Week rows */}
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={day.date}
                        className={`
                          w-3 h-3 rounded-sm cursor-pointer transition-all hover:ring-1 hover:ring-primary
                          ${getIntensityClass(day.count)}
                        `}
                        title={`${day.date}: ${day.count} envíos`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Day labels */}
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>L</span>
                <span className="ml-3">M</span>
                <span className="ml-3">S</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Menos</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-muted/30" />
              <div className="w-3 h-3 rounded-sm bg-primary/30" />
              <div className="w-3 h-3 rounded-sm bg-primary/60" />
              <div className="w-3 h-3 rounded-sm bg-primary" />
            </div>
            <span>Más</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}