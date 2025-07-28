"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Play, Zap, Bot, Trophy } from "lucide-react";
import { useState } from "react";

export const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement email capture with Supabase
    await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
    setIsSubmitting(false);
    setEmail("");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg">
            Master{" "}
            <span className="gradient-text">n8n Automation</span>{" "}
            Through Practice
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            Daily challenges, AI-powered feedback, and a community of automation experts.
            Level up your skills with gamified learning.
          </p>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-sm text-foreground-secondary mb-4">
              Join 500+ automation engineers improving their skills
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-warning text-sm font-medium ml-2">★★★★★</span>
            </div>
          </motion.div>

          {/* Email capture form */}
          <motion.form
            onSubmit={handleEmailSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 bg-surface/50 border-white/20 text-foreground placeholder:text-foreground-secondary"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 px-8 bg-gradient-primary hover:scale-105 transition-transform"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Start Learning <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm text-foreground-secondary mb-8"
          >
            7-day free trial, no credit card required
          </motion.p>

          {/* Demo button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button variant="outline" className="glass border-white/20 hover:bg-white/10">
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
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