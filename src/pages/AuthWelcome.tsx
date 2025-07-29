import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { LevelAssessment } from '@/components/auth/level-assessment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Trophy, Target, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthWelcome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAssessment, setShowAssessment] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', user.id)
          .single();

        if (profile?.onboarding_completed) {
          navigate('/dashboard');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user, navigate]);

  const handleStartAssessment = () => {
    setShowAssessment(true);
  };

  const handleAssessmentComplete = async (level: string, answers: Record<string, string>) => {
    if (!user) return;

    try {
      // Save assessment and update profile
      await Promise.all([
        supabase.from('level_assessments').insert({
          user_id: user.id,
          answers,
          calculated_level: level
        }),
        supabase.from('profiles').update({
          onboarding_completed: true,
          assessment_answers: answers,
          initial_level_assigned: true
        }).eq('id', user.id),
        supabase.from('user_stats').upsert({
          user_id: user.id,
          current_difficulty: level
        })
      ]);

      toast({
        title: "¡Bienvenido!",
        description: `Nivel asignado: ${level}. Ya puedes empezar con los retos.`
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing assessment:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al guardar tu evaluación",
        variant: "destructive"
      });
    }
  };

  const handleSkipAssessment = async () => {
    if (!user) return;

    try {
      await Promise.all([
        supabase.from('profiles').update({
          onboarding_completed: true,
          initial_level_assigned: false
        }).eq('id', user.id),
        supabase.from('user_stats').upsert({
          user_id: user.id,
          current_difficulty: 'beginner'
        })
      ]);

      toast({
        title: "¡Bienvenido!",
        description: "Empezarás en nivel principiante. Puedes cambiar tu nivel más tarde."
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error skipping assessment:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al configurar tu cuenta",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (showAssessment) {
    return (
      <LevelAssessment 
        onComplete={handleAssessmentComplete}
        onSkip={handleSkipAssessment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            ¡Bienvenido a FlowForge!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La plataforma definitiva para dominar la automatización con n8n. 
            Mejora tus habilidades con retos prácticos y casos reales.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-green-900">Retos Prácticos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 text-center">
                Resuelve casos reales de automatización con feedback IA personalizado
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="text-center">
              <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-blue-900">Sistema de Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 text-center">
                Compite con otros y sube de nivel según tu rendimiento
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-purple-900">Comunidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-700 text-center">
                Conecta con otros automatizadores y comparte tu progreso
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">
              Evaluación de Nivel Inicial
            </CardTitle>
            <p className="text-muted-foreground">
              Responde unas preguntas rápidas para que podamos personalizar tu experiencia
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Solo 5 preguntas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Retos adaptados a tu nivel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Puedes cambiar nivel después</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Completamente opcional</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={handleStartAssessment}
                size="lg"
                className="min-w-48"
              >
                Comenzar Evaluación
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSkipAssessment}
                size="lg"
              >
                Saltar (Empezar como Principiante)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthWelcome;