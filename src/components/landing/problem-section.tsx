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

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto p-8 glass-elevated rounded-xl">
            <blockquote className="text-xl md:text-2xl text-foreground-secondary italic mb-6 leading-relaxed">
              "{t('landing.problem.testimonial')}"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-primary" />
              <div className="text-left">
                <p className="font-semibold text-foreground">{t('landing.problem.testimonialAuthor')}</p>
                <p className="text-sm text-foreground-secondary">{t('landing.problem.testimonialRole')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};