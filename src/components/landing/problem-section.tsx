"use client";

import { motion } from "framer-motion";
import { AlertCircle, Clock, BookOpen, Zap } from "lucide-react";
import { useTranslation } from 'react-i18next';

export const ProblemSection = () => {
  const { t } = useTranslation();

  const problems = [
    {
      icon: BookOpen,
      title: t('landing.problem.tutorialHell'),
      description: t('landing.problem.tutorialHellDesc')
    },
    {
      icon: Clock,
      title: t('landing.problem.noPractice'),
      description: t('landing.problem.noPracticeDesc')
    },
    {
      icon: AlertCircle,
      title: t('landing.problem.noFeedback'),
      description: t('landing.problem.noFeedbackDesc')
    },
    {
      icon: Zap,
      title: t('landing.problem.skillGaps'),
      description: t('landing.problem.skillGapsDesc')
    }
  ];

  return (
    <section className="py-24 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('landing.problem.title')}
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            {t('landing.problem.subtitle')}
          </p>
        </motion.div>

        {/* Problem grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-lg border border-destructive/20 bg-destructive/5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {problem.title}
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Lo que dicen nuestros usuarios</h3>
          
          {/* Modern testimonials grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Main testimonial */}
            <div className="md:col-span-2 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-2xl border border-primary/20">
              <div className="flex items-center gap-1 mb-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-warning text-xl">★</span>
                ))}
              </div>
              <blockquote className="text-lg md:text-xl text-foreground-secondary italic mb-6 leading-relaxed">
                "{t('landing.problem.testimonial')}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                  SC
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{t('landing.problem.testimonialAuthor')}</p>
                  <p className="text-sm text-foreground-secondary">{t('landing.problem.testimonialRole')}</p>
                </div>
              </div>
            </div>
            
            {/* Side testimonials */}
            <div className="space-y-6">
              <div className="bg-surface/50 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-warning text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm italic text-foreground-secondary mb-4">
                  "Como estudiante, los retos semanales gratuitos me ayudaron a aprender automatización. La actualización a premium valió la pena."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    AG
                  </div>
                  <div>
                    <p className="font-medium text-sm">Alex García</p>
                    <p className="text-xs text-foreground-secondary">Estudiante</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface/50 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-warning text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm italic text-foreground-secondary mb-4">
                  "FlowForge me enseñó a optimizar mis procesos. Ahorro 10 horas semanales en tareas manuales."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
                    RS
                  </div>
                  <div>
                    <p className="font-medium text-sm">Roberto Silva</p>
                    <p className="text-xs text-foreground-secondary">Empresario</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats below testimonials */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-foreground-secondary">Usuarios activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">4.9</div>
              <div className="text-sm text-foreground-secondary">Puntuación media</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">1000+</div>
              <div className="text-sm text-foreground-secondary">Retos completados</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};