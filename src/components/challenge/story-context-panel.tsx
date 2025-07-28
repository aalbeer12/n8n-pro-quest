import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { User, Sparkles } from 'lucide-react'
import { Challenge } from '@/types/database'

interface StoryContextPanelProps {
  challenge: Challenge
}

export const StoryContextPanel = ({ challenge }: StoryContextPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-surface/50 to-surface/30 backdrop-blur-sm border-border relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
        
        <div className="relative space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-primary">Historia del Reto</h2>
              <p className="text-sm text-muted-foreground">Contexto y situación</p>
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-4">
            <div className="prose prose-sm prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {challenge.story_context}
              </p>
            </div>

            {/* Mission Section */}
            <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="font-medium text-primary">Tu Misión</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {challenge.description}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}