import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Trophy, Target, Zap, Rocket } from 'lucide-react';
// @ts-ignore
import confetti from 'canvas-confetti';

interface LevelRevealProps {
  userName: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  onContinue: () => void;
}

const levelConfig = {
  beginner: {
    title: 'Automation Explorer',
    emoji: '🌱',
    color: 'bg-green-500',
    icon: Target,
    message: 'Perfect! Empezarás con retos guiados y aprenderás paso a paso.',
    badge: 'Principiante',
    gradient: 'from-green-500 to-emerald-600'
  },
  intermediate: {
    title: 'Automation Enthusiast',
    emoji: '⚡',
    color: 'bg-blue-500',
    icon: Zap,
    message: 'Excelente! Tienes una base sólida. Te ofreceremos retos que amplíen tus habilidades.',
    badge: 'Intermedio',
    gradient: 'from-blue-500 to-cyan-600'
  },
  advanced: {
    title: 'Automation Pro',
    emoji: '🚀',
    color: 'bg-purple-500',
    icon: Rocket,
    message: '¡Impresionante! Dominas la automatización. Te retaremos con casos complejos.',
    badge: 'Avanzado',
    gradient: 'from-purple-500 to-indigo-600'
  },
  expert: {
    title: 'Automation Master',
    emoji: '👑',
    color: 'bg-yellow-500',
    icon: Trophy,
    message: '¡Eres un experto! Accederás a los retos más desafiantes y el modo competitivo.',
    badge: 'Experto',
    gradient: 'from-yellow-500 to-orange-600'
  }
};

export const LevelReveal = ({ userName, level, onContinue }: LevelRevealProps) => {
  const [showContent, setShowContent] = useState(false);
  const config = levelConfig[level];

  useEffect(() => {
    // Mostrar confetti
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="p-8 bg-surface/50 backdrop-blur-sm border-border text-center">
          <CardContent className="space-y-6">
            {/* Emoji animado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl"
            >
              {config.emoji}
            </motion.div>

            {/* Título y mensaje */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">
                  ¡Perfecto, {userName}! 🎉
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="secondary" className={`${config.color} text-white`}>
                    Nivel {config.badge}
                  </Badge>
                </div>
              </div>

              <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${config.gradient} rounded-full flex items-center justify-center`}>
                <config.icon className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-primary">
                  {config.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {config.message}
                </p>
              </div>
            </motion.div>

            {/* Beneficios por nivel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ delay: 1.2 }}
              className="space-y-3"
            >
              <h3 className="font-medium text-sm text-muted-foreground">
                Tu experiencia incluye:
              </h3>
              <div className="space-y-2 text-sm">
                {level === 'beginner' && (
                  <>
                    <div className="flex items-center gap-2 text-left">
                      <Sparkles className="w-4 h-4 text-green-500" />
                      <span>Tutorial interactivo de n8n</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <Sparkles className="w-4 h-4 text-green-500" />
                      <span>Retos super guiados</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <Sparkles className="w-4 h-4 text-green-500" />
                      <span>Recursos introductorios</span>
                    </div>
                  </>
                )}
                {level === 'intermediate' && (
                  <>
                    <div className="flex items-center gap-2 text-left">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <span>Retos con hints desbloqueados</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <span>Casos de negocio reales</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <span>Tracking de progreso avanzado</span>
                    </div>
                  </>
                )}
                {level === 'advanced' && (
                  <>
                    <div className="flex items-center gap-2 text-left">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span>Retos complejos desbloqueados</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span>Modo competitivo disponible</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span>Analytics detallados</span>
                    </div>
                  </>
                )}
                {level === 'expert' && (
                  <>
                    <div className="flex items-center gap-2 text-left">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <span>Acceso a todos los retos</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <span>Modo competitivo premium</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <span>Certificaciones exclusivas</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Botón continuar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ delay: 1.5 }}
            >
              <Button 
                onClick={onContinue}
                size="lg"
                className="w-full"
              >
                ¡Empezar mi journey! 🚀
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};