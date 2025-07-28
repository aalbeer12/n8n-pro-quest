"use client";

import { motion } from "framer-motion";
import { Code, Bot, TrendingUp, Users } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Learn by Doing",
    description: "Real-world automation scenarios that mirror what you'll face in production environments.",
    gradient: "from-primary to-blue-600",
  },
  {
    icon: Bot,
    title: "AI-Powered Feedback",
    description: "Get instant, detailed feedback on your solutions with actionable improvement suggestions.",
    gradient: "from-secondary to-green-600",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Gamified learning with XP, streaks, and achievements to keep you motivated.",
    gradient: "from-warning to-orange-600",
  },
  {
    icon: Users,
    title: "Build Portfolio",
    description: "Showcase your automation skills with a public profile that stands out to employers.",
    gradient: "from-purple-500 to-pink-600",
  },
];

export const FeatureCards = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why <span className="gradient-text">Hack-Your-Flows</span>?
          </h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            Traditional tutorials leave you with theory. We give you practical skills through 
            hands-on challenges that mirror real automation work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative p-8 glass-elevated rounded-xl interactive"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};