import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Sparkles, Bot, Wrench, Target, Trophy } from 'lucide-react';

interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  options: {
    value: string;
    label: string;
    description: string;
    emoji: string;
    points: number;
    skipToEnd?: boolean;
    skipToStep?: number;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'experience',
    title: '¿Cuál describe mejor tu experiencia?',
    subtitle: '👋 ¡Hola! Vamos a personalizar tu experiencia',
    icon: Bot,
    options: [
      { 
        value: 'never', 
        label: 'Nunca he creado una automatización', 
        description: 'Empezar desde cero',
        emoji: '🌱', 
        points: 0,
        skipToEnd: true 
      },
      { 
        value: 'zapier', 
        label: 'He usado Zapier, IFTTT o herramientas similares', 
        description: 'Conceptos básicos',
        emoji: '🔧', 
        points: 1 
      },
      { 
        value: 'regular', 
        label: 'Trabajo regularmente con n8n, Make o Zapier', 
        description: 'Uso frecuente',
        emoji: '⚡', 
        points: 2 
      },
      { 
        value: 'developer', 
        label: 'Soy desarrollador/a o automation expert', 
        description: 'Nivel experto',
        emoji: '🚀', 
        points: 3,
        skipToStep: 2
      },
    ]
  },
  {
    id: 'n8n_knowledge',
    title: '¿Qué tal tu experiencia con n8n específicamente?',
    subtitle: '🎯 Casi listo...',
    icon: Wrench,
    options: [
      { 
        value: 'what', 
        label: '¿Qué es n8n? Primera vez que lo escucho', 
        description: 'Recursos introductorios',
        emoji: '❓', 
        points: 0 
      },
      { 
        value: 'tried', 
        label: 'Lo he probado pero me perdí un poco', 
        description: 'Retos guiados',
        emoji: '🤔', 
        points: 0.5 
      },
      { 
        value: 'basic', 
        label: 'He creado algunos workflows básicos', 
        description: 'Nivel intermedio',
        emoji: '🛠️', 
        points: 2 
      },
      { 
        value: 'production', 
        label: 'Tengo workflows en producción', 
        description: 'Nivel avanzado',
        emoji: '🏭', 
        points: 3 
      },
    ]
  },
  {
    id: 'practical',
    title: '¿Cuál de estos workflows podrías crear HOY sin ayuda?',
    subtitle: '🚀 ¡Una más!',
    icon: Target,
    options: [
      { 
        value: 'email', 
        label: 'Enviar un email cuando llega un formulario', 
        description: 'Automatización básica',
        emoji: '📧', 
        points: 0 
      },
      { 
        value: 'sync', 
        label: 'Sincronizar contactos entre Google Sheets y CRM', 
        description: 'Integración intermedia',
        emoji: '🔄', 
        points: 1 
      },
      { 
        value: 'conditions', 
        label: 'Workflow con condiciones, loops y manejo de errores', 
        description: 'Lógica avanzada',
        emoji: '🔀', 
        points: 2 
      },
      { 
        value: 'complex', 
        label: 'Integración multi-API con transformación de datos compleja', 
        description: 'Nivel experto',
        emoji: '🚀', 
        points: 3 
      },
    ]
  }
];

interface OnboardingQuizProps {
  userName: string;
  onComplete: (level: string, answers: Record<string, string>) => void;
  onSkip: () => void;
}

export const OnboardingQuiz = ({ userName, onComplete, onSkip }: OnboardingQuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>('');

  const calculateLevel = (finalAnswers: Record<string, string>) => {
    let totalPoints = 0;
    
    // Experiencia base
    const expAnswer = finalAnswers.experience;
    if (expAnswer === 'never') return 'beginner';
    if (expAnswer === 'zapier') totalPoints += 1;
    if (expAnswer === 'regular') totalPoints += 2;
    if (expAnswer === 'developer') totalPoints += 3;
    
    // Conocimiento n8n
    const n8nAnswer = finalAnswers.n8n_knowledge;
    if (n8nAnswer === 'what') return 'beginner';
    if (n8nAnswer === 'tried') totalPoints += 0.5;
    if (n8nAnswer === 'basic') totalPoints += 2;
    if (n8nAnswer === 'production') totalPoints += 3;
    
    // Caso práctico
    const practicalAnswer = finalAnswers.practical;
    if (practicalAnswer === 'email') totalPoints += 0;
    if (practicalAnswer === 'sync') totalPoints += 1;
    if (practicalAnswer === 'conditions') totalPoints += 2;
    if (practicalAnswer === 'complex') totalPoints += 3;
    
    // Clasificación final
    if (totalPoints <= 2) return 'beginner';
    if (totalPoints <= 5) return 'intermediate';
    if (totalPoints <= 8) return 'advanced';
    return 'expert';
  };

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    const newAnswers = { ...answers, [quizQuestions[currentStep].id]: value };
    setAnswers(newAnswers);
    
    const selectedOptionData = quizQuestions[currentStep].options.find(opt => opt.value === value);
    
    // Lógica de saltos
    if (selectedOptionData?.skipToEnd) {
      // Si nunca ha usado automatización, ir directo a beginner
      onComplete('beginner', newAnswers);
      return;
    }
    
    if (selectedOptionData?.skipToStep !== undefined) {
      // Si es developer, saltar a la pregunta práctica
      setTimeout(() => {
        setCurrentStep(selectedOptionData.skipToStep!);
        setSelectedOption('');
      }, 600);
      return;
    }
    
    // Continuar al siguiente paso normalmente
    setTimeout(() => {
      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep(prev => prev + 1);
        setSelectedOption('');
      } else {
        // Última pregunta, calcular nivel
        const finalLevel = calculateLevel(newAnswers);
        onComplete(finalLevel, newAnswers);
      }
    }, 600);
  };

  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-primary">FlowForge</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">¡Hola {userName}! 👋</h1>
            <p className="text-muted-foreground">{currentQuestion.subtitle}</p>
          </div>
          
          {/* Progress */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Paso {currentStep + 1} de {quizQuestions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full h-2" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 bg-surface/50 backdrop-blur-sm border-border">
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <currentQuestion.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{currentQuestion.title}</h2>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleOptionSelect(option.value)}
                      className={`w-full p-4 rounded-lg border text-left transition-all ${
                        selectedOption === option.value
                          ? 'border-primary bg-primary/10 scale-[1.02]'
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                      }`}
                      whileHover={{ scale: selectedOption === option.value ? 1.02 : 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0 mt-1">{option.emoji}</span>
                        <div className="flex-1 space-y-1">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="ghost"
                    onClick={onSkip}
                    className="text-muted-foreground"
                  >
                    Saltar quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};