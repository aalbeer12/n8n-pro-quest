"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export const CTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, i18n } = useTranslation();

  const benefits = [
    t('landing.cta.benefit1'),
    t('landing.cta.benefit2'),
    t('landing.cta.benefit3'),
    t('landing.cta.benefit4'),
    t('landing.cta.benefit5')
  ];

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement email capture with Supabase
    await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
    setIsSubmitting(false);
    setEmail("");
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-secondary/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-shadow-lg px-4">
            {t('landing.cta.startAutomation')}
            <span className="gradient-text block">{t('landing.cta.journeyToday')}</span>
          </h2>
          
          <p className="text-xl text-foreground-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('landing.cta.ctaSubtitle')}
          </p>
        </motion.div>

        {/* Benefits list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {benefits.map((benefit, index) => (
            <div
              key={benefit}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20"
            >
              <CheckCircle className="w-4 h-4 text-secondary" />
              <span className="text-sm text-foreground-secondary">{benefit}</span>
            </div>
          ))}
        </motion.div>

        {/* Email form */}
        <motion.form
          onSubmit={handleEmailSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8"
        >
          <Input
            type="email"
            placeholder={t('landing.cta.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 h-14 text-lg bg-surface/50 border-white/20 text-foreground placeholder:text-foreground-secondary"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="h-14 px-8 text-lg bg-gradient-primary hover:scale-105 transition-transform font-semibold"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                {t('landing.cta.startLearning')} <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm text-foreground-secondary"
        >
          {t('landing.cta.trustedBy')}
        </motion.p>

        {/* Company logos placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center items-center gap-8 mt-12 opacity-50"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-24 h-8 bg-foreground-secondary/20 rounded"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};