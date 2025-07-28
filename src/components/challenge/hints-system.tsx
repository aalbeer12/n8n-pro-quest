import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Lightbulb, ChevronDown, Coins, Eye, EyeOff } from 'lucide-react'
import { Challenge } from '@/types/database'
import { useToast } from '@/hooks/use-toast'

interface HintsSystemProps {
  challenge: Challenge
  usedHints: number[]
  onHintUsed: (hintIndex: number) => void
}

export const HintsSystem = ({ challenge, usedHints, onHintUsed }: HintsSystemProps) => {
  const [openHints, setOpenHints] = useState<number[]>([])
  const { toast } = useToast()

  const hints = (challenge.hints as string[]) || []
  
  if (hints.length === 0) {
    return null
  }

  const toggleHint = (index: number) => {
    if (openHints.includes(index)) {
      setOpenHints(openHints.filter(i => i !== index))
    } else {
      setOpenHints([...openHints, index])
    }
  }

  const revealHint = (index: number) => {
    const cost = (index + 1) * 5 // 5, 10, 15, 20 XP
    
    // In a real app, we would deduct XP from user's account
    onHintUsed(index)
    
    toast({
      title: "Pista revelada",
      description: `Has usado ${cost} XP para ver esta pista`,
      variant: "destructive"
    })
  }

  const isHintUsed = (index: number) => usedHints.includes(index)
  const getHintCost = (index: number) => (index + 1) * 5

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6 bg-surface/50 backdrop-blur-sm border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-primary">Pistas</h2>
            </div>
            <Badge variant="outline" className="text-xs">
              {usedHints.length}/{hints.length} usadas
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Las pistas te ayudan a avanzar, pero cuestan XP. Úsalas sabiamente.
          </p>

          <div className="space-y-3">
            {hints.map((hint, index) => (
              <Collapsible
                key={index}
                open={openHints.includes(index)}
                onOpenChange={() => toggleHint(index)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between p-4 h-auto"
                    disabled={!isHintUsed(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isHintUsed(index) 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      
                      <div className="text-left">
                        <div className="font-medium">
                          Pista {index + 1}
                          {!isHintUsed(index) && (
                            <Badge variant="secondary" className="ml-2">
                              <Coins className="w-3 h-3 mr-1" />
                              {getHintCost(index)} XP
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {isHintUsed(index) 
                            ? 'Clic para ver/ocultar' 
                            : 'Clic para revelar'
                          }
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isHintUsed(index) ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform ${
                          openHints.includes(index) ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <AnimatePresence>
                    {openHints.includes(index) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3"
                      >
                        {isHintUsed(index) ? (
                          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                            <p className="text-sm text-primary">{hint}</p>
                          </div>
                        ) : (
                          <div className="p-4 bg-muted/50 border border-border rounded-lg">
                            <div className="text-center space-y-3">
                              <p className="text-sm text-muted-foreground">
                                ¿Estás seguro de que quieres usar {getHintCost(index)} XP para ver esta pista?
                              </p>
                              <Button 
                                onClick={() => revealHint(index)}
                                variant="destructive"
                                size="sm"
                              >
                                <Coins className="w-4 h-4 mr-2" />
                                Usar {getHintCost(index)} XP
                              </Button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {usedHints.length === 0 && (
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 Intenta resolver el reto por ti mismo primero. ¡Las pistas siempre estarán aquí si las necesitas!
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}