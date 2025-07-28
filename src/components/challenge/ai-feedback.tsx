import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react'
import { useState } from 'react'

interface AIFeedbackProps {
  feedback: any
}

export const AIFeedback = ({ feedback }: AIFeedbackProps) => {
  const [openSections, setOpenSections] = useState<string[]>(['strengths'])

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  // Default feedback structure if not provided
  const defaultFeedback = {
    strengths: [
      "Tu solución muestra una comprensión sólida de los conceptos básicos",
      "El flujo de trabajo está bien estructurado"
    ],
    improvements: [
      "Considera optimizar el número de nodos para mejorar el rendimiento",
      "Agrega validaciones adicionales para casos extremos"
    ],
    tips: [
      "Usa nodos de transformación para procesar datos de manera más eficiente",
      "Implementa manejo de errores para hacer tu flujo más robusto"
    ]
  }

  const processedFeedback = feedback || defaultFeedback

  const sections = [
    {
      key: 'strengths',
      title: 'Lo que hiciste bien',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      data: processedFeedback.strengths || []
    },
    {
      key: 'improvements',
      title: 'Áreas de mejora',
      icon: AlertTriangle,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      data: processedFeedback.improvements || []
    },
    {
      key: 'tips',
      title: 'Consejos profesionales',
      icon: Lightbulb,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      data: processedFeedback.tips || []
    }
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lightbulb className="w-5 h-5 text-primary" />
          Feedback de IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.map(({ key, title, icon: Icon, color, bgColor, borderColor, data }) => (
          <Collapsible
            key={key}
            open={openSections.includes(key)}
            onOpenChange={() => toggleSection(key)}
          >
            <Card className={`${bgColor} ${borderColor} border transition-all duration-200`}>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${color}`} />
                      <span className="text-foreground">{title}</span>
                      <span className="text-sm text-muted-foreground">
                        ({data.length})
                      </span>
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                        openSections.includes(key) ? 'rotate-180' : ''
                      }`} 
                    />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {data.length > 0 ? (
                      data.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                          <p className="text-sm text-foreground leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        No hay información disponible para esta sección.
                      </p>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  )
}