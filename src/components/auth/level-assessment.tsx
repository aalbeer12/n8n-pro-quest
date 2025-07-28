import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    points: number;
  }[];
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'experience',
    question: '¿Cuál es tu experiencia con herramientas de automatización?',
    options: [
      { value: 'none', label: 'Nunca he usado herramientas de automatización', level: 'beginner', points: 0 },
      { value: 'basic', label: 'He usado Zapier o herramientas similares básicas', level: 'beginner', points: 1 },
      { value: 'intermediate', label: 'Tengo experiencia con n8n o herramientas similares', level: 'intermediate', points: 2 },
      { value: 'advanced', label: 'Soy experto en múltiples plataformas de automatización', level: 'expert', points: 3 },
    ]
  },
  {
    id: 'coding',
    question: '¿Cuál es tu nivel de programación?',
    options: [
      { value: 'none', label: 'No sé programar', level: 'beginner', points: 0 },
      { value: 'basic', label: 'Conceptos básicos (HTML, CSS)', level: 'beginner', points: 1 },
      { value: 'intermediate', label: 'JavaScript, Python básico', level: 'intermediate', points: 2 },
      { value: 'advanced', label: 'Múltiples lenguajes, APIs, bases de datos', level: 'expert', points: 3 },
    ]
  },
  {
    id: 'apis',
    question: '¿Has trabajado con APIs antes?',
    options: [
      { value: 'never', label: 'No sé qué es una API', level: 'beginner', points: 0 },
      { value: 'heard', label: 'He oído hablar pero nunca las he usado', level: 'beginner', points: 1 },
      { value: 'basic', label: 'He usado APIs simples (REST básico)', level: 'intermediate', points: 2 },
      { value: 'advanced', label: 'Manejo APIs complejas, webhooks, autenticación', level: 'expert', points: 3 },
    ]
  },
  {
    id: 'workflows',
    question: '¿Qué tipo de flujos de trabajo te interesa automatizar?',
    options: [
      { value: 'simple', label: 'Tareas simples (enviar emails, notificaciones)', level: 'beginner', points: 0 },
      { value: 'business', label: 'Procesos de negocio (CRM, ventas)', level: 'intermediate', points: 1 },
      { value: 'complex', label: 'Integraciones complejas entre sistemas', level: 'advanced', points: 2 },
      { value: 'enterprise', label: 'Arquitecturas empresariales avanzadas', level: 'expert', points: 3 },
    ]
  },
  {
    id: 'goal',
    question: '¿Cuál es tu objetivo principal?',
    options: [
      { value: 'learn', label: 'Aprender automatización desde cero', level: 'beginner', points: 0 },
      { value: 'improve', label: 'Mejorar mis habilidades actuales', level: 'intermediate', points: 1 },
      { value: 'freelance', label: 'Ofrecer servicios de automatización', level: 'advanced', points: 2 },
      { value: 'scale', label: 'Escalar mi negocio con automatización avanzada', level: 'expert', points: 3 },
    ]
  }
];

interface LevelAssessmentProps {
  onComplete: (level: string, answers: Record<string, string>) => void;
  onSkip: () => void;
}

export const LevelAssessment = ({ onComplete, onSkip }: LevelAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateLevel();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateLevel = () => {
    let totalPoints = 0;
    
    assessmentQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          totalPoints += option.points;
        }
      }
    });

    // Calculate level based on total points
    const maxPoints = assessmentQuestions.length * 3;
    const percentage = (totalPoints / maxPoints) * 100;

    let level: string;
    if (percentage >= 75) level = 'expert';
    else if (percentage >= 50) level = 'advanced';
    else if (percentage >= 25) level = 'intermediate';
    else level = 'beginner';

    onComplete(level, answers);
  };

  const currentQuestionData = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const canProceed = answers[currentQuestionData.id];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Evaluación de Nivel</CardTitle>
            <Button variant="ghost" onClick={onSkip}>
              Saltar evaluación
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Pregunta {currentQuestion + 1} de {assessmentQuestions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {currentQuestionData.question}
            </h3>
            
            <RadioGroup
              value={answers[currentQuestionData.id] || ''}
              onValueChange={(value) => handleAnswer(currentQuestionData.id, value)}
              className="space-y-3"
            >
              {currentQuestionData.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-2"
            >
              {currentQuestion === assessmentQuestions.length - 1 ? 'Finalizar' : 'Siguiente'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};