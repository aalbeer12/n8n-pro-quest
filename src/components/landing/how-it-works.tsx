"use client";

import { motion } from "framer-motion";
import { Calendar, Code2, Lightbulb, Trophy } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    number: "01",
    title: "Daily Challenge Delivered",
    description: "Every day, get a new real-world automation scenario with clear requirements and context.",
    features: ["Story-driven challenges", "Multiple difficulty levels", "Real business scenarios"]
  },
  {
    icon: Code2,
    number: "02",
    title: "Build Your Solution",
    description: "Create n8n workflows using our browser-based editor with live validation and hints.",
    features: ["Monaco code editor", "Real-time JSON validation", "Smart hint system"]
  },
  {
    icon: Lightbulb,
    number: "03",
    title: "Get Instant Feedback",
    description: "Our AI evaluates your solution and provides detailed feedback on functionality and best practices.",
    features: ["Detailed score breakdown", "Improvement suggestions", "Code quality analysis"]
  },
  {
    icon: Trophy,
    number: "04",
    title: "Climb the Leaderboard",
    description: "Earn XP, maintain streaks, unlock achievements, and compete with other automation engineers.",
    features: ["Global rankings", "Achievement system", "Portfolio building"]
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            From complete beginner to automation expert in just a few minutes per day.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-primary/30">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-foreground">
                  {step.title}
                </h3>
                
                <p className="text-lg text-foreground-secondary leading-relaxed">
                  {step.description}
                </p>
                
                <ul className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-foreground-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full max-w-md mx-auto"
                >
                  <div className="aspect-square rounded-2xl glass-elevated p-8 flex items-center justify-center">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-32 h-32 rounded-full bg-gradient-primary opacity-20"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <step.icon className="w-16 h-16 text-primary" />
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-secondary"
                  />
                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-warning"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};