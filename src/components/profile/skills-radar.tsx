import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

interface SkillsRadarProps {
  userId: string
}

interface SkillData {
  skill: string
  score: number
  fullMark: 100
}

export const SkillsRadar = ({ userId }: SkillsRadarProps) => {
  const [skillsData, setSkillsData] = useState<SkillData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        // Get user's submissions with scores
        const { data: submissions, error } = await supabase
          .from('submissions')
          .select(`
            score_breakdown,
            challenges!inner(category)
          `)
          .eq('user_id', userId)
          .not('score_breakdown', 'is', null)

        if (error) {
          console.error('Error fetching skills data:', error)
          return
        }

        // Calculate average scores by category
        const categoryScores: { [key: string]: number[] } = {}
        
        submissions?.forEach((submission) => {
          const category = Array.isArray(submission.challenges) 
            ? submission.challenges[0]?.category 
            : submission.challenges?.category

          if (!category || !submission.score_breakdown) return

          if (!categoryScores[category]) {
            categoryScores[category] = []
          }

          // Extract scores from breakdown
          const breakdown = submission.score_breakdown as any
          const totalScore = (breakdown?.functionality?.score || 0) + 
                           (breakdown?.efficiency?.score || 0) + 
                           (breakdown?.error_handling?.score || 0) + 
                           (breakdown?.best_practices?.score || 0)
          
          categoryScores[category].push(totalScore)
        })

        // Calculate averages and map to radar data
        const radarData: SkillData[] = [
          'Data Processing',
          'API Integration', 
          'Logic Flow',
          'Error Handling',
          'Optimization'
        ].map(skill => {
          const scores = categoryScores[skill] || []
          const avgScore = scores.length > 0 
            ? scores.reduce((a, b) => a + b, 0) / scores.length 
            : 0

          return {
            skill,
            score: Math.round(avgScore),
            fullMark: 100
          }
        })

        setSkillsData(radarData)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkillsData()
  }, [userId])

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle>Habilidades</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Radar de Habilidades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillsData}>
              <PolarGrid gridType="polygon" className="opacity-30" />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <PolarRadiusAxis 
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                tickCount={6}
                domain={[0, 100]}
              />
              <Radar
                name="Puntuación"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Skills breakdown */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          {skillsData.map((skill) => (
            <div key={skill.skill} className="flex justify-between">
              <span className="text-muted-foreground">{skill.skill}</span>
              <span className="font-medium text-foreground">{skill.score}/100</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}