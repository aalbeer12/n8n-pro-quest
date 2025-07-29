"use client";

import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Play, Zap, Bot, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export const HeroSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <img src="/src/assets/flowforge-logo-new.png" alt="FlowForge" className="w-8 md:w-10 h-8 md:h-10 object-contain" />
            <span className="text-lg md:text-xl font-bold text-white">FlowForge</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <LanguageSwitcher />
            <Button asChild variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 text-sm">
              <Link to={`/auth?lang=${i18n.language}`}>{t('nav.signIn')}</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-primary" />
      
      {/* Animated background nodes */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-primary/20 blur-3xl float"
          style={{ top: "10%", left: "10%" }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-secondary/20 blur-3xl float-delayed"
          style={{ top: "20%", right: "15%" }}
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-warning/20 blur-3xl float-delayed-2"
          style={{ bottom: "20%", left: "20%" }}
          animate={{
            y: [-15, 15, -15],
            x: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating n8n-style nodes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-16 h-16 rounded-lg bg-surface glass flex items-center justify-center float"
          style={{ top: "30%", left: "15%" }}
        >
          <Zap className="w-8 h-8 text-primary" />
        </motion.div>
        <motion.div
          className="absolute w-16 h-16 rounded-lg bg-surface glass flex items-center justify-center float-delayed"
          style={{ top: "60%", right: "20%" }}
        >
          <Bot className="w-8 h-8 text-secondary" />
        </motion.div>
        <motion.div
          className="absolute w-16 h-16 rounded-lg bg-surface glass flex items-center justify-center float-delayed-2"
          style={{ bottom: "30%", left: "70%" }}
        >
          <Trophy className="w-8 h-8 text-warning" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-shadow-lg text-white leading-tight px-2">
            {t('landing.hero.title')}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            {t('landing.hero.subtitle')}
          </p>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            <p className="text-sm text-white/70 mb-3 md:mb-4">
              {t('landing.hero.social_proof')}
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-gradient-primary border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-warning text-sm font-medium ml-2">★★★★★</span>
            </div>
          </motion.div>

          {/* Get Started Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4 md:mb-6"
          >
            <Button asChild className="h-12 md:h-14 px-6 md:px-8 bg-gradient-primary hover:scale-105 transition-transform text-sm md:text-base font-semibold">
              <Link to={`/auth?lang=${i18n.language}`}>
                {t('landing.hero.cta')} <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xs md:text-sm text-white/70 mb-6 md:mb-8"
          >
            {t('landing.hero.trial_info')}
          </motion.p>

          {/* Demo button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button asChild variant="outline" size="sm" className="glass border-white/20 hover:bg-white/10 text-white text-sm">
              <Link to="/challenges">
                <Play className="w-4 h-4 mr-2" />
                {t('landing.hero.demo')}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};