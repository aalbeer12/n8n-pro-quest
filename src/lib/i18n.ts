import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones
const resources = {
  en: {
    translation: {
      // Navigation
      "nav.dashboard": "Dashboard",
      "nav.challenges": "Challenges", 
      "nav.leaderboard": "Leaderboard",
      "nav.profile": "Profile",
      "nav.settings": "Settings",
      "nav.signOut": "Sign Out",
      "nav.signIn": "Sign In",
      
      // Landing Page
      "landing.hero.title": "Master n8n Automation with Real Challenges",
      "landing.hero.subtitle": "The definitive platform to learn automation through practical challenges and real business cases. Improve your skills and compete with other developers.",
      "landing.hero.cta": "Start Free",
      "landing.hero.demo": "View Demo",
      "landing.hero.social_proof": "Join 500+ automation engineers improving their skills",
      "landing.hero.trial_info": "7-day free trial, no credit card required",
      
      "landing.problem.title": "Tired of Learning Without Doing?",
      "landing.problem.subtitle": "Most automation education is broken. You watch tutorials, read docs, but when it's time to build something real, you're lost.",
      "landing.problem.tutorialHell": "Tutorial Hell",
      "landing.problem.tutorialHellDesc": "Endless videos that teach theory but leave you stuck when it's time to build real automations.",
      "landing.problem.noPractice": "No Practice",
      "landing.problem.noPracticeDesc": "Learning platforms that focus on concepts but don't give you hands-on experience with real scenarios.",
      "landing.problem.noFeedback": "No Feedback",
      "landing.problem.noFeedbackDesc": "Building automations in isolation without knowing if you're following best practices or making mistakes.",
      "landing.problem.skillGaps": "Skill Gaps",
      "landing.problem.skillGapsDesc": "Knowing the basics but struggling with complex real-world automation challenges in your job.",
      "landing.problem.testimonial": "I watched 47 YouTube videos about n8n, read the entire documentation twice, but when my manager asked me to automate our customer onboarding process, I had no idea where to start.",
      "landing.problem.testimonialAuthor": "Sarah Chen",
      "landing.problem.testimonialRole": "Operations Manager",
      
      "landing.features.title": "Learn Automation the Right Way",
      "landing.features.subtitle": "Practice with real cases, get AI feedback, and compete with the community",
      "landing.features.whyTitle": "Why FlowForge?",
      "landing.features.whySubtitle": "Traditional tutorials leave you with theory. We give you practical skills through hands-on challenges that mirror real automation work.",
      "landing.features.learnByDoing": "Learn by Doing",
      "landing.features.learnByDoingDesc": "Real-world automation scenarios that mirror what you'll face in production environments.",
      "landing.features.aiFeedback": "AI-Powered Feedback", 
      "landing.features.aiFeedbackDesc": "Get instant, detailed feedback on your solutions with actionable improvement suggestions.",
      "landing.features.trackProgress": "Track Progress",
      "landing.features.trackProgressDesc": "Gamified learning with XP, streaks, and achievements to keep you motivated.",
      "landing.features.buildPortfolio": "Build Portfolio",
      "landing.features.buildPortfolioDesc": "Showcase your automation skills with a public profile that stands out to employers.",
      
      "landing.howItWorks.title": "How It Works",
      "landing.howItWorks.subtitle": "From complete beginner to automation expert in just a few minutes per day.",
      "landing.howItWorks.step1": "Daily Challenge Delivered",
      "landing.howItWorks.step1Desc": "Every day, get a new real-world automation scenario with clear requirements and context.",
      "landing.howItWorks.step1Features1": "Story-driven challenges",
      "landing.howItWorks.step1Features2": "Multiple difficulty levels", 
      "landing.howItWorks.step1Features3": "Real business scenarios",
      "landing.howItWorks.step2": "Build Your Solution",
      "landing.howItWorks.step2Desc": "Create n8n workflows using our browser-based editor with live validation and hints.",
      "landing.howItWorks.step2Features1": "Monaco code editor",
      "landing.howItWorks.step2Features2": "Real-time JSON validation",
      "landing.howItWorks.step2Features3": "Smart hint system",
      "landing.howItWorks.step3": "Get Instant Feedback",
      "landing.howItWorks.step3Desc": "Our AI evaluates your solution and provides detailed feedback on functionality and best practices.",
      "landing.howItWorks.step3Features1": "Detailed score breakdown",
      "landing.howItWorks.step3Features2": "Improvement suggestions",
      "landing.howItWorks.step3Features3": "Code quality analysis",
      "landing.howItWorks.step4": "Climb the Leaderboard",
      "landing.howItWorks.step4Desc": "Earn XP, maintain streaks, unlock achievements, and compete with other automation engineers.",
      "landing.howItWorks.step4Features1": "Global rankings",
      "landing.howItWorks.step4Features2": "Achievement system",
      "landing.howItWorks.step4Features3": "Portfolio building",
      
      "landing.cta.title": "Start Improving Your Automation Skills Today",
      "landing.cta.subtitle": "Join hundreds of developers who are already mastering n8n",
      "landing.cta.button": "Start Free Challenge",
      "landing.cta.startAutomation": "Start Your Automation Journey Today",
      "landing.cta.journeyToday": "Start Learning Now",
      "landing.cta.ctaSubtitle": "Join hundreds of automation engineers who are already mastering n8n through daily practice and AI-powered feedback.",
      "landing.cta.benefit1": "7-day free trial",
      "landing.cta.benefit2": "No credit card required",
      "landing.cta.benefit3": "Cancel anytime",
      "landing.cta.benefit4": "Access to all challenges",
      "landing.cta.benefit5": "AI feedback included",
      "landing.cta.emailPlaceholder": "Enter your email to get started",
      "landing.cta.startLearning": "Start Learning",
      "landing.cta.trustedBy": "Trusted by automation engineers at top companies worldwide",

      // Footer
      footer: {
        description: "Master n8n automation through daily challenges, AI feedback, and a community of automation experts.",
        sections: {
          product: "Product",
          resources: "Resources", 
          company: "Company"
        },
        product: {
          challenges: "Challenges",
          leaderboard: "Leaderboard",
          pricing: "Pricing"
        },
        resources: {
          community: "Community",
          blog: "Blog"
        },
        company: {
          about: "About Us",
          privacy: "Privacy Policy",
          terms: "Terms of Service"
        },
        legal: {
          privacy: "Privacy Policy",
          terms: "Terms of Service"
        },
        copyright: "© 2025 FlowForge. All rights reserved."
      },

      // Pages
      pages: {
        about: {
          title: "About Us",
          description: "Learn more about FlowForge and our mission",
          intro: "We believe in the power of automation to transform how we work.",
          mission: "Our mission is to make n8n automation accessible to everyone through practical challenges and AI-powered feedback.",
          team: "We're a team of automation enthusiasts dedicated to helping you master workflow automation skills."
        },
        community: {
          title: "Join Our Community",
          description: "Connect with automation experts and learners worldwide",
          subtitle: "Connect with thousands of automation experts, share knowledge, and grow together.",
          discord: {
            title: "Discord Community",
            description: "Join real-time discussions, get help, and share your automation wins.",
            cta: "Join Discord"
          },
          forum: {
            title: "Community Forum",
            description: "Browse discussions, ask questions, and share your knowledge.",
            cta: "Visit Forum"
          },
          events: {
            title: "Community Events",
            description: "Participate in workshops, webinars, and automation challenges.",
            cta: "View Events"
          }
        },
        help: {
          title: "Help Center",
          description: "Find answers to common questions and get support",
          subtitle: "Find answers to your questions and get the help you need.",
          getting_started: {
            title: "Getting Started",
            description: "Learn the basics and start your automation journey.",
            cta: "Start Learning"
          },
          contact: {
            title: "Contact Support",
            description: "Get personalized help from our support team.",
            cta: "Contact Us"
          },
          faq: {
            title: "Frequently Asked Questions",
            q1: {
              question: "How do I get started with FlowForge?",
              answer: "Simply sign up for a free account and start with our beginner challenges. We'll guide you through the basics of n8n automation."
            },
            q2: {
              question: "What is included in the subscription?",
              answer: "Our subscription includes unlimited access to all challenges, AI feedback, progress tracking, and community features."
            },
            q3: {
              question: "Can I cancel my subscription anytime?",
              answer: "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period."
            },
            q4: {
              question: "Do you offer refunds?",
              answer: "We offer a 7-day free trial. If you're not satisfied within the first 7 days of your paid subscription, contact us for a full refund."
            }
          }
        }
      },
      
      // Auth
      "auth.title": "Welcome to FlowForge",
      "auth.subtitle": "Enter your email to get started",
      "auth.firstName": "What's your name?",
      "auth.firstNamePlaceholder": "Your first name",
      "auth.email": "Email",
      "auth.emailPlaceholder": "your@email.com",
      "auth.continue": "Continue with Email",
      "auth.sendingLink": "Sending magic link...",
      "auth.noPasswordsRequired": "No passwords required. We'll send you a secure link to sign in.",
      "auth.checkEmail": "Check your email",
      "auth.checkEmailDesc": "We've sent you a magic link to sign in",
      "auth.emailExpires": "Click the link in your email to sign in. The link expires in 60 minutes.",
      "auth.resend": "Resend email",
      "auth.backToEmail": "Back to email",
      "auth.backToHome": "← Back to home",
      
      // How It Works
      "howItWorks.title": "How FlowForge Works",
      "howItWorks.subtitle": "Master n8n automation with hands-on challenges designed by experts",
      "howItWorks.badge": "Learn by Doing",
      "howItWorks.description": "Learn n8n automation through practical challenges and expert feedback",
      "howItWorks.getStarted": "Start Learning",
      "howItWorks.viewChallenges": "View Challenges",
      "howItWorks.stepsTitle": "Your Learning Journey",
      "howItWorks.stepsSubtitle": "From beginner to automation expert in 4 simple steps",
      "howItWorks.steps.choose.title": "Choose Your Challenge",
      "howItWorks.steps.choose.description": "Pick from daily challenges tailored to your skill level",
      "howItWorks.steps.choose.detail1": "Beginner to expert difficulty levels",
      "howItWorks.steps.choose.detail2": "Real-world automation scenarios",
      "howItWorks.steps.choose.detail3": "Estimated completion times",
      "howItWorks.steps.build.title": "Build Your Solution",
      "howItWorks.steps.build.description": "Create n8n workflows using our integrated editor",
      "howItWorks.steps.build.detail1": "JSON workflow editor with syntax highlighting",
      "howItWorks.steps.build.detail2": "Auto-save and version control",
      "howItWorks.steps.build.detail3": "Hint system when you're stuck",
      "howItWorks.steps.feedback.title": "Get AI Feedback",
      "howItWorks.steps.feedback.description": "Receive detailed analysis and optimization suggestions",
      "howItWorks.steps.feedback.detail1": "Code quality assessment",
      "howItWorks.steps.feedback.detail2": "Performance optimization tips",
      "howItWorks.steps.feedback.detail3": "Best practices recommendations",
      "howItWorks.steps.improve.title": "Level Up",
      "howItWorks.steps.improve.description": "Track progress and unlock advanced challenges",
      "howItWorks.steps.improve.detail1": "XP and achievement system",
      "howItWorks.steps.improve.detail2": "Skill progression tracking",
      "howItWorks.steps.improve.detail3": "Community leaderboards",
      "howItWorks.featuresTitle": "Why Choose FlowForge?",
      "howItWorks.featuresSubtitle": "Designed specifically for n8n automation learning",
      "howItWorks.features.realWorld.title": "Real-World Scenarios",
      "howItWorks.features.realWorld.description": "Practice with actual automation challenges you'll face in production environments",
      "howItWorks.features.timeEfficient.title": "Time-Efficient Learning",
      "howItWorks.features.timeEfficient.description": "15-30 minute focused challenges that fit into your busy schedule",
      "howItWorks.features.community.title": "Expert Community",
      "howItWorks.features.community.description": "Learn from n8n experts and connect with fellow automation enthusiasts",
      "howItWorks.features.instant.title": "Instant Feedback",
      "howItWorks.features.instant.description": "Get immediate AI-powered feedback on your solutions and improvement suggestions",
      "howItWorks.exampleTitle": "Example Challenge Preview",
      "howItWorks.exampleSubtitle": "See what you'll be working on",
      "howItWorks.example.difficulty": "Intermediate",
      "howItWorks.example.category": "API Integration",
      "howItWorks.example.time": "20-25 min",
      "howItWorks.example.title": "Customer Data Synchronization",
      "howItWorks.example.description": "Build a workflow that synchronizes customer data between a CRM system and an email marketing platform, handling data transformation and error scenarios.",
      "howItWorks.example.requirementsTitle": "Requirements",
      "howItWorks.example.requirement1": "HTTP Request nodes for API calls",
      "howItWorks.example.requirement2": "Data transformation using Set nodes",
      "howItWorks.example.requirement3": "Error handling with IF conditions",
      "howItWorks.example.points": "125 XP • Unlocks Advanced API Challenges",
      "howItWorks.cta.title": "Ready to Master n8n Automation?",
      "howItWorks.cta.subtitle": "Join thousands of developers improving their automation skills",
      "howItWorks.cta.primary": "Start Your Journey",
      "howItWorks.cta.secondary": "Learn More",

      // Common
      "common.loading": "Loading...",
      "common.back": "Back",
      "common.next": "Next",
      "common.previous": "Previous",
      "common.finish": "Finish",
      "common.cancel": "Cancel",
      "common.save": "Save",
      "common.error": "Error",
      "common.success": "Success",
      "common.translate": "Translate",
      "common.translated": "Translated",
      "common.autoTranslated": "Auto-translated",
      "common.translateTo": "Translate to {{language}}",
      "common.backToDashboard": "Back to Dashboard",
      "common.backToHome": "Back to home",

      // Settings
      settings: {
        title: "Settings",
        description: "Manage your profile and preferences",
        success: "Success",
        error: "Error",
        profileUpdated: "Profile updated successfully",
        updateError: "Error updating profile",
        subscriptionError: "Error managing subscription",
        profile: {
          title: "Profile",
          description: "Update your personal information",
          username: "Username",
          usernameHelp: "Only letters, numbers and underscores",
          displayName: "Display name",
          displayNamePlaceholder: "Your display name",
          bio: "Bio",
          bioPlaceholder: "Tell us about yourself (max 160 characters)",
          github: "GitHub",
          linkedin: "LinkedIn",
          website: "Website",
          publicProfile: "Public profile",
          publicProfileHelp: "Allow other users to view your profile",
          avatar: "Avatar",
          uploadAvatar: "Upload avatar",
          changeAvatar: "Change avatar"
        },
        subscription: {
          title: "Subscription",
          description: "Manage your subscription plan",
          currentPlan: "Current plan",
          active: "Active",
          inactive: "Free",
          renewsOn: "Renews on",
          manage: "Manage subscription",
          upgrade: "Upgrade to Premium"
        },
        language: {
          title: "Language & Region",
          description: "Choose your preferred language",
          current: "Current language"
        },
        notifications: {
          title: "Notifications",
          description: "Configure your notification preferences",
          dailyChallenge: "Daily challenge",
          dailyChallengeHelp: "Receive notifications for new challenges",
          achievements: "Achievements",
          achievementsHelp: "Notifications when you unlock achievements",
          streakReminders: "Streak reminders",
          streakRemindersHelp: "Remind to complete your daily challenge"
        },
        privacy: {
          title: "Privacy & Security",
          description: "Manage your data and security settings",
          exportData: "Export data",
          downloadData: "Download my data",
          dangerZone: "Danger zone",
          deleteAccount: "Delete account"
        }
      },

      // Toast notifications
      notifications: {
        challengeSubmitted: "Challenge submitted successfully!",
        levelUp: "Level up! You're now {{level}}",
        achievementUnlocked: "New achievement unlocked!",
        streakSaved: "Streak saved!",
        newDailyChallenge: "New daily challenge available!",
        streakReminder: "Don't lose your streak - complete today's challenge",
        invalidWorkflow: "Invalid workflow JSON",
        networkError: "Network error - please retry",
        subscriptionSuccess: "Subscription updated successfully!",
        profileSaved: "Profile saved successfully",
        avatarUploaded: "Avatar uploaded successfully",
        dataExported: "Data exported successfully"
      }
    }
  },
  es: {
    translation: {
      // Navigation
      "nav.dashboard": "Panel",
      "nav.challenges": "Retos",
      "nav.leaderboard": "Ranking",
      "nav.profile": "Perfil",
      "nav.signOut": "Cerrar Sesión",
      "nav.signIn": "Iniciar Sesión",
      
      // Landing Page
      "landing.hero.title": "Domina la Automatización n8n con Retos Reales",
      "landing.hero.subtitle": "La plataforma definitiva para aprender automatización mediante retos prácticos y casos de negocio reales. Mejora tus habilidades y compite con otros desarrolladores.",
      "landing.hero.cta": "Empezar Gratis",
      "landing.hero.demo": "Ver Demo",
      "landing.hero.social_proof": "Únete a más de 500 ingenieros de automatización mejorando sus habilidades",
      "landing.hero.trial_info": "Prueba gratuita de 7 días, sin tarjeta de crédito requerida",

      "landing.problem.title": "¿Cansado de Aprender Sin Hacer?",
      "landing.problem.subtitle": "La mayoría de la educación en automatización está rota. Ves tutoriales, lees documentación, pero cuando llega el momento de construir algo real, estás perdido.",
      "landing.problem.tutorialHell": "Infierno de Tutoriales",
      "landing.problem.tutorialHellDesc": "Videos interminables que enseñan teoría pero te dejan atascado cuando es hora de construir automatizaciones reales.",
      "landing.problem.noPractice": "Sin Práctica",
      "landing.problem.noPracticeDesc": "Plataformas de aprendizaje que se enfocan en conceptos pero no te dan experiencia práctica con escenarios reales.",
      "landing.problem.noFeedback": "Sin Retroalimentación",
      "landing.problem.noFeedbackDesc": "Construir automatizaciones en aislamiento sin saber si estás siguiendo mejores prácticas o cometiendo errores.",
      "landing.problem.skillGaps": "Brechas de Habilidades",
      "landing.problem.skillGapsDesc": "Conocer lo básico pero luchar con desafíos complejos de automatización del mundo real en tu trabajo.",
      "landing.problem.testimonial": "Vi 47 videos de YouTube sobre n8n, leí toda la documentación dos veces, pero cuando mi jefe me pidió automatizar nuestro proceso de incorporación de clientes, no tenía idea de por dónde empezar.",
      "landing.problem.testimonialAuthor": "Sarah Chen",
      "landing.problem.testimonialRole": "Gerente de Operaciones",

      "landing.features.title": "Aprende Automatización de la Manera Correcta",
      "landing.features.subtitle": "Practica con casos reales, obtén retroalimentación de IA y compite con la comunidad",
      "landing.features.whyTitle": "¿Por Qué",
      "landing.features.whySubtitle": "Los tutoriales tradicionales te dejan con teoría. Nosotros te damos habilidades prácticas a través de desafíos prácticos que reflejan el trabajo real de automatización.",
      "landing.features.learnByDoing": "Aprende Haciendo",
      "landing.features.learnByDoingDesc": "Escenarios de automatización del mundo real que reflejan lo que enfrentarás en entornos de producción.",
      "landing.features.aiFeedback": "Retroalimentación Impulsada por IA",
      "landing.features.aiFeedbackDesc": "Obtén retroalimentación instantánea y detallada sobre tus soluciones con sugerencias de mejora accionables.",
      "landing.features.trackProgress": "Seguimiento de Progreso",
      "landing.features.trackProgressDesc": "Aprendizaje gamificado con XP, rachas y logros para mantenerte motivado.",
      "landing.features.buildPortfolio": "Construye Tu Portafolio",
      "landing.features.buildPortfolioDesc": "Muestra tus habilidades de automatización con un perfil público que destaque para los empleadores.",

      "landing.howItWorks.title": "Cómo Funciona",
      "landing.howItWorks.subtitle": "De principiante completo a experto en automatización en solo unos minutos al día.",
      "landing.howItWorks.step1": "Desafío Diario Entregado",
      "landing.howItWorks.step1Desc": "Cada día, obtén un nuevo escenario de automatización del mundo real con requisitos y contexto claros.",
      "landing.howItWorks.step1Features1": "Desafíos impulsados por historias",
      "landing.howItWorks.step1Features2": "Múltiples niveles de dificultad",
      "landing.howItWorks.step1Features3": "Escenarios de negocio reales",
      "landing.howItWorks.step2": "Construye Tu Solución",
      "landing.howItWorks.step2Desc": "Crea flujos de trabajo n8n usando nuestro editor basado en navegador con validación en vivo y pistas.",
      "landing.howItWorks.step2Features1": "Editor de código Monaco",
      "landing.howItWorks.step2Features2": "Validación JSON en tiempo real",
      "landing.howItWorks.step2Features3": "Sistema de pistas inteligente",
      "landing.howItWorks.step3": "Obtén Retroalimentación Instantánea",
      "landing.howItWorks.step3Desc": "Nuestra IA evalúa tu solución y proporciona retroalimentación detallada sobre funcionalidad y mejores prácticas.",
      "landing.howItWorks.step3Features1": "Desglose detallado de puntuación",
      "landing.howItWorks.step3Features2": "Sugerencias de mejora",
      "landing.howItWorks.step3Features3": "Análisis de calidad de código",
      "landing.howItWorks.step4": "Escala en la Clasificación",
      "landing.howItWorks.step4Desc": "Gana XP, mantén rachas, desbloquea logros y compite con otros ingenieros de automatización.",
      "landing.howItWorks.step4Features1": "Rankings globales",
      "landing.howItWorks.step4Features2": "Sistema de logros",
      "landing.howItWorks.step4Features3": "Construcción de portafolio",

      "landing.cta.title": "Comienza a Mejorar Tus Habilidades de Automatización Hoy",
      "landing.cta.subtitle": "Únete a cientos de desarrolladores que ya están dominando n8n",
      "landing.cta.button": "Comenzar Desafío Gratis",
      "landing.cta.startAutomation": "Comienza Tu Viaje de Automatización Hoy",
      "landing.cta.journeyToday": "Comienza a Aprender Ahora",
      "landing.cta.ctaSubtitle": "Únete a cientos de ingenieros de automatización que ya están dominando n8n a través de práctica diaria y retroalimentación impulsada por IA.",
      "landing.cta.benefit1": "Prueba gratuita de 7 días",
      "landing.cta.benefit2": "No se requiere tarjeta de crédito",
      "landing.cta.benefit3": "Cancela en cualquier momento",
      "landing.cta.benefit4": "Acceso a todos los desafíos",
      "landing.cta.benefit5": "Retroalimentación de IA incluida",
      "landing.cta.emailPlaceholder": "Ingresa tu email para comenzar",
      "landing.cta.startLearning": "Comenzar a Aprender",
      "landing.cta.trustedBy": "Confiado por ingenieros de automatización en las mejores empresas del mundo",


      // Footer
      footer: {
        description: "Domina la automatización n8n a través de desafíos diarios, retroalimentación de IA y una comunidad de expertos en automatización.",
        sections: {
          product: "Producto",
          resources: "Recursos",
          company: "Empresa"
        },
        product: {
          challenges: "Desafíos",
          leaderboard: "Clasificación",
          pricing: "Precios"
        },
        resources: {
          community: "Comunidad",
          blog: "Blog"
        },
        company: {
          about: "Sobre nosotros",
          privacy: "Política de Privacidad",
          terms: "Términos de Servicio"
        },
        legal: {
          privacy: "Política de Privacidad",
          terms: "Términos de Servicio"
        },
        copyright: "© 2025 FlowForge. Todos los derechos reservados."
      },

      // Pages
      pages: {
        about: {
          title: "Sobre Nosotros",
          description: "Conoce más sobre FlowForge y nuestra misión",
          intro: "Creemos en el poder de la automatización para transformar cómo trabajamos.",
          mission: "Nuestra misión es hacer la automatización n8n accesible para todos a través de desafíos prácticos y retroalimentación impulsada por IA.",
          team: "Somos un equipo de entusiastas de la automatización dedicados a ayudarte a dominar las habilidades de automatización de flujos de trabajo."
        },
        community: {
          title: "Únete a Nuestra Comunidad",
          description: "Conéctate con expertos en automatización y estudiantes de todo el mundo",
          subtitle: "Conéctate con miles de expertos en automatización, comparte conocimiento y crece juntos.",
          discord: {
            title: "Comunidad Discord",
            description: "Únete a discusiones en tiempo real, obtén ayuda y comparte tus logros de automatización.",
            cta: "Unirse a Discord"
          },
          forum: {
            title: "Foro de la Comunidad",
            description: "Explora discusiones, haz preguntas y comparte tu conocimiento.",
            cta: "Visitar Foro"
          },
          events: {
            title: "Eventos de la Comunidad",
            description: "Participa en talleres, webinarios y desafíos de automatización.",
            cta: "Ver Eventos"
          }
        },
        help: {
          title: "Centro de Ayuda",
          description: "Encuentra respuestas a preguntas comunes y obtén soporte",
          subtitle: "Encuentra respuestas a tus preguntas y obtén la ayuda que necesitas.",
          getting_started: {
            title: "Comenzando",
            description: "Aprende lo básico y comienza tu viaje de automatización.",
            cta: "Comenzar a Aprender"
          },
          contact: {
            title: "Contactar Soporte",
            description: "Obtén ayuda personalizada de nuestro equipo de soporte.",
            cta: "Contáctanos"
          },
          faq: {
            title: "Preguntas Frecuentes",
            q1: {
              question: "¿Cómo empiezo con FlowForge?",
              answer: "Simplemente regístrate para una cuenta gratuita y comienza con nuestros desafíos para principiantes. Te guiaremos a través de los conceptos básicos de automatización n8n."
            },
            q2: {
              question: "¿Qué incluye la suscripción?",
              answer: "Nuestra suscripción incluye acceso ilimitado a todos los desafíos, retroalimentación de IA, seguimiento de progreso y características de la comunidad."
            },
            q3: {
              question: "¿Puedo cancelar mi suscripción en cualquier momento?",
              answer: "Sí, puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. Tu acceso continuará hasta el final de tu período de facturación."
            },
            q4: {
              question: "¿Ofrecen reembolsos?",
              answer: "Ofrecemos una prueba gratuita de 7 días. Si no estás satisfecho dentro de los primeros 7 días de tu suscripción paga, contáctanos para un reembolso completo."
            }
          }
        }
      },
      
      // Auth
      "auth.title": "Bienvenido a FlowForge",
      "auth.subtitle": "Ingresa tu email para comenzar",
      "auth.firstName": "¿Cómo te llamas?",
      "auth.firstNamePlaceholder": "Tu nombre de pila",
      "auth.email": "Email",
      "auth.emailPlaceholder": "tu@email.com",
      "auth.continue": "Continuar con Email",
      "auth.sendingLink": "Enviando enlace mágico...",
      "auth.noPasswordsRequired": "No se requieren contraseñas. Te enviaremos un enlace seguro para iniciar sesión.",
      "auth.checkEmail": "Revisa tu email",
      "auth.checkEmailDesc": "Te hemos enviado un enlace mágico para iniciar sesión",
      "auth.emailExpires": "Haz clic en el enlace de tu email para iniciar sesión. El enlace expira en 60 minutos.",
      "auth.resend": "Reenviar email",
      "auth.backToEmail": "Volver al email",
      "auth.backToHome": "← Volver al inicio",
      
      // How It Works
      "howItWorks.title": "Cómo Funciona FlowForge",
      "howItWorks.subtitle": "Domina la automatización n8n con desafíos prácticos diseñados por expertos",
      "howItWorks.badge": "Aprende Haciendo",
      "howItWorks.description": "Aprende automatización n8n a través de desafíos prácticos y retroalimentación experta",
      "howItWorks.getStarted": "Comenzar a Aprender",
      "howItWorks.viewChallenges": "Ver Desafíos",
      "howItWorks.stepsTitle": "Tu Viaje de Aprendizaje",
      "howItWorks.stepsSubtitle": "De principiante a experto en automatización en 4 pasos simples",
      "howItWorks.steps.choose.title": "Elige Tu Desafío",
      "howItWorks.steps.choose.description": "Selecciona entre desafíos diarios adaptados a tu nivel de habilidad",
      "howItWorks.steps.choose.detail1": "Niveles de dificultad de principiante a experto",
      "howItWorks.steps.choose.detail2": "Escenarios de automatización del mundo real",
      "howItWorks.steps.choose.detail3": "Tiempos estimados de finalización",
      "howItWorks.steps.build.title": "Construye Tu Solución",
      "howItWorks.steps.build.description": "Crea flujos de trabajo n8n usando nuestro editor integrado",
      "howItWorks.steps.build.detail1": "Editor de flujo JSON con resaltado de sintaxis",
      "howItWorks.steps.build.detail2": "Autoguardado y control de versiones",
      "howItWorks.steps.build.detail3": "Sistema de pistas cuando te atasques",
      "howItWorks.steps.feedback.title": "Obtén Retroalimentación de IA",
      "howItWorks.steps.feedback.description": "Recibe análisis detallado y sugerencias de optimización",
      "howItWorks.steps.feedback.detail1": "Evaluación de calidad de código",
      "howItWorks.steps.feedback.detail2": "Tips de optimización de rendimiento",
      "howItWorks.steps.feedback.detail3": "Recomendaciones de mejores prácticas",
      "howItWorks.steps.improve.title": "Sube de Nivel",
      "howItWorks.steps.improve.description": "Rastrea el progreso y desbloquea desafíos avanzados",
      "howItWorks.steps.improve.detail1": "Sistema de XP y logros",
      "howItWorks.steps.improve.detail2": "Seguimiento de progresión de habilidades",
      "howItWorks.steps.improve.detail3": "Tablas de clasificación comunitarias",
      "howItWorks.featuresTitle": "¿Por Qué Elegir FlowForge?",
      "howItWorks.featuresSubtitle": "Diseñado específicamente para el aprendizaje de automatización n8n",
      "howItWorks.features.realWorld.title": "Escenarios del Mundo Real",
      "howItWorks.features.realWorld.description": "Practica con desafíos de automatización reales que enfrentarás en entornos de producción",
      "howItWorks.features.timeEfficient.title": "Aprendizaje Eficiente en Tiempo",
      "howItWorks.features.timeEfficient.description": "Desafíos enfocados de 15-30 minutos que se adaptan a tu horario ocupado",
      "howItWorks.features.community.title": "Comunidad Experta",
      "howItWorks.features.community.description": "Aprende de expertos en n8n y conecta con otros entusiastas de la automatización",
      "howItWorks.features.instant.title": "Retroalimentación Instantánea",
      "howItWorks.features.instant.description": "Obtén retroalimentación inmediata impulsada por IA sobre tus soluciones y sugerencias de mejora",
      "howItWorks.exampleTitle": "Vista Previa de Desafío de Ejemplo",
      "howItWorks.exampleSubtitle": "Ve en qué estarás trabajando",
      "howItWorks.example.difficulty": "Intermedio",
      "howItWorks.example.category": "Integración de API",
      "howItWorks.example.time": "20-25 min",
      "howItWorks.example.title": "Sincronización de Datos de Clientes",
      "howItWorks.example.description": "Construye un flujo de trabajo que sincronice datos de clientes entre un sistema CRM y una plataforma de marketing por email, manejando transformación de datos y escenarios de error.",
      "howItWorks.example.requirementsTitle": "Requisitos",
      "howItWorks.example.requirement1": "Nodos de Solicitud HTTP para llamadas API",
      "howItWorks.example.requirement2": "Transformación de datos usando nodos Set",
      "howItWorks.example.requirement3": "Manejo de errores con condiciones IF",
      "howItWorks.example.points": "125 XP • Desbloquea Desafíos Avanzados de API",
      "howItWorks.cta.title": "¿Listo para Dominar la Automatización n8n?",
      "howItWorks.cta.subtitle": "Únete a miles de desarrolladores mejorando sus habilidades de automatización",
      "howItWorks.cta.primary": "Comenzar Tu Viaje",
      "howItWorks.cta.secondary": "Saber Más",

      // Terms & Privacy
      "terms.title": "Términos y Condiciones",
      "terms.description": "Términos de uso para FlowForge",
      "terms.lastUpdated": "Última actualización",
      "terms.effectiveDate": "Fecha efectiva",
      "terms.intro": "Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de FlowForge.",
      "terms.tableOfContents": "Tabla de Contenidos",
      "terms.acceptance.title": "Aceptación de Términos",
      "terms.acceptance.content": "Los presentes términos y condiciones regulan el uso de la plataforma FlowForge, propiedad de FlowForge SL, sociedad constituida conforme a la legislación española, con domicilio social en Calle Ejemplo 12, 48000 Bilbao, España.\n\nAl acceder y usar este sitio web, aceptas estar sujeto a estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro sitio web.",
      "terms.description.title": "Descripción del Servicio",
      "terms.description.content": "FlowForge SL es una plataforma educativa que proporciona desafíos de automatización n8n, retroalimentación impulsada por IA y funciones de comunidad para ayudar a los usuarios a mejorar sus habilidades de automatización de flujos de trabajo.\n\nNos reservamos el derecho de retirar o modificar nuestro servicio, y cualquier servicio o material que proporcionamos en el servicio, a nuestro único criterio, cumpliendo con la legislación española aplicable.",
      "terms.registration.title": "Registro de Cuenta",
      "terms.registration.content": "Cuando creas una cuenta con nosotros, debes proporcionar información que sea precisa, completa y actual en todo momento. Eres responsable de salvaguardar la contraseña y de todas las actividades que ocurran bajo tu cuenta.\n\nNo puedes usar como nombre de usuario el nombre de otra persona o entidad o que no esté legalmente disponible para usar, un nombre o marca comercial que esté sujeto a derechos de otra persona sin autorización apropiada.",
      "terms.userContent.title": "Contenido del Usuario",
      "terms.userContent.content": "Nuestro servicio puede permitirte publicar, vincular, almacenar, compartir y poner a disposición cierta información, texto, gráficos, videos u otro material. Eres responsable del contenido que publicas en el servicio.\n\nAl publicar contenido en nuestro servicio, nos otorgas el derecho y la licencia para usar, modificar, ejecutar públicamente, mostrar públicamente, reproducir y distribuir dicho contenido en y a través del servicio.",
      "terms.subscription.title": "Suscripción y Pagos",
      "terms.subscription.content": "Algunos aspectos del servicio se proporcionan como un servicio de suscripción paga. Se te facturará por adelantado de forma recurrente y periódica.\n\nLas tarifas de suscripción se cobran por adelantado mensual o anualmente, dependiendo del tipo de plan de suscripción que selecciones al comprar una suscripción.",
      "terms.intellectualProperty.title": "Propiedad Intelectual",
      "terms.intellectualProperty.content": "El servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de FlowForge y sus licenciantes. El servicio está protegido por derechos de autor, marcas comerciales y otras leyes.",
      "terms.prohibited.title": "Usos Prohibidos",
      "terms.prohibited.content": "No puedes usar nuestro servicio para ningún propósito ilegal o no autorizado. No puedes, en el uso del servicio, violar ninguna ley en tu jurisdicción.\n\nEspecíficamente está prohibido: usar el servicio para transmitir virus o código malicioso, intentar obtener acceso no autorizado al servicio, o usar el servicio de cualquier manera que pueda dañar, deshabilitar o deteriorar el servicio.",
      "terms.termination.title": "Terminación",
      "terms.termination.content": "Podemos terminar o suspender tu cuenta inmediatamente, sin previo aviso o responsabilidad, por cualquier motivo, incluyendo sin limitación si incumples los términos.\n\nAl terminar, tu derecho a usar el servicio cesará inmediatamente. Si deseas terminar tu cuenta, simplemente puedes discontinuar el uso del servicio.",
      "terms.disclaimer.title": "Descargo de Responsabilidad",
      "terms.disclaimer.content": "La información en este sitio web se proporciona sobre una base 'tal como está'. En la medida máxima permitida por la ley, esta empresa excluye todas las representaciones y garantías relacionadas con este sitio web y su contenido.",
      "terms.limitation.title": "Limitación de Responsabilidad",
      "terms.limitation.content": "En el marco de la legislación española aplicable, FlowForge SL, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, salvo en los casos expresamente previstos por la ley.",
      "terms.governing.title": "Ley Aplicable y Jurisdicción",
      "terms.governing.content": "Estos términos se regirán e interpretarán de acuerdo con la legislación española. Para la resolución de cualquier controversia derivada de estos términos, las partes se someten expresamente a la jurisdicción de los Juzgados y Tribunales de Bilbao, España.",
      "terms.changes.title": "Cambios a los Términos",
      "terms.changes.content": "Nos reservamos el derecho, a nuestro único criterio, de modificar o reemplazar estos términos en cualquier momento. Si una revisión es material, intentaremos proporcionar al menos 30 días de aviso antes de que los nuevos términos entren en vigor.",
      "terms.contact.title": "Información de Contacto",
      "terms.contact.content": "Si tienes alguna pregunta sobre estos términos y condiciones, por favor contáctanos en legal@flowforge.com",
      "terms.questions.title": "¿Preguntas sobre estos términos?",
      "terms.questions.content": "Si tienes alguna pregunta sobre estos términos y condiciones, no dudes en contactarnos.",
      "terms.questions.email": "Email",
      "terms.questions.address": "Dirección",

      "privacy.title": "Política de Privacidad",
      "privacy.description": "Política de privacidad para FlowForge",
      "privacy.lastUpdated": "Última actualización",
      "privacy.gdprCompliant": "Cumple con GDPR",
      "privacy.intro": "Esta política de privacidad describe cómo recopilamos, usamos y protegemos tu información cuando usas nuestro servicio.",
      "privacy.tableOfContents": "Tabla de Contenidos",
      "privacy.summary.title": "Resumen Rápido",
      "privacy.summary.weDoTitle": "Lo que SÍ hacemos",
      "privacy.summary.weDo1": "Recopilar solo los datos necesarios para el servicio",
      "privacy.summary.weDo2": "Proteger tu información con medidas de seguridad fuertes",
      "privacy.summary.weDo3": "Darte control total sobre tus datos",
      "privacy.summary.weDo4": "Cumplir con GDPR y otras regulaciones de privacidad",
      "privacy.summary.weDontTitle": "Lo que NO hacemos",
      "privacy.summary.weDont1": "Vender tu información personal a terceros",
      "privacy.summary.weDont2": "Rastrear tu actividad fuera de nuestra plataforma",
      "privacy.summary.weDont3": "Enviar spam o emails no solicitados",
      "privacy.summary.weDont4": "Almacenar información de tarjetas de crédito",
      "privacy.information.title": "Información que Recopilamos",
      "privacy.information.content": "Recopilamos información que nos proporcionas directamente, como cuando creas una cuenta, participas en desafíos, o contactas con nosotros.\n\nEsto incluye tu dirección de email, nombre, información de perfil, y contenido que envías como soluciones a desafíos.",
      "privacy.usage.title": "Cómo Usamos tu Información",
      "privacy.usage.content": "Usamos la información que recopilamos para proporcionar, mantener y mejorar nuestros servicios, procesar transacciones, enviar comunicaciones técnicas y de servicio.\n\nTambién podemos usar tu información para personalizar tu experiencia y proporcionar contenido y funciones que coincidan con tus intereses.",
      "privacy.sharing.title": "Compartir Información",
      "privacy.sharing.content": "No vendemos, intercambiamos o alquilamos tu información personal a terceros. Podemos compartir tu información en ciertas situaciones limitadas, como con proveedores de servicios que nos ayudan a operar nuestro servicio.\n\nTambién podemos divulgar tu información si es requerido por ley o para proteger los derechos, propiedad o seguridad de FlowForge, nuestros usuarios u otros.",
      "privacy.security.title": "Seguridad de Datos",
      "privacy.security.content": "Implementamos medidas de seguridad apropiadas para proteger contra acceso no autorizado, alteración, divulgación o destrucción de tu información personal.\n\nSin embargo, ningún método de transmisión por internet o almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar seguridad absoluta.",
      "privacy.cookies.title": "Cookies y Tecnologías de Seguimiento",
      "privacy.cookies.content": "Usamos cookies y tecnologías similares para recopilar y almacenar información cuando visitas nuestro servicio. Esto nos ayuda a recordar tus preferencias y entender cómo usas nuestro servicio.\n\nPuedes configurar tu navegador para rechazar cookies, pero esto puede afectar tu capacidad de usar ciertas funciones de nuestro servicio.",
      "privacy.rights.title": "Tus Derechos de Privacidad",
      "privacy.rights.content": "Tienes ciertos derechos sobre tu información personal, incluyendo el derecho a acceder, actualizar, o eliminar tu información. También puedes optar por no recibir ciertas comunicaciones de nosotros.\n\nSi tienes preguntas sobre tus derechos de privacidad o deseas ejercer alguno de estos derechos, contáctanos.",
      "privacy.retention.title": "Retención de Datos",
      "privacy.retention.content": "Retenemos tu información personal solo durante el tiempo necesario para los propósitos descritos en esta política de privacidad, a menos que se requiera un período de retención más largo por ley.\n\nCuando elimines tu cuenta, eliminaremos o anonimizaremos tu información personal, excepto cuando sea necesario retenerla por razones legales.",
      "privacy.international.title": "Transferencias Internacionales",
      "privacy.international.content": "Como empresa española, FlowForge SL procesa y almacena datos principalmente dentro de la Unión Europea, cumpliendo con el Reglamento General de Protección de Datos (RGPD).\n\nCualquier transferencia internacional de datos se realizará únicamente con las garantías adecuadas y conforme a la legislación europea de protección de datos.",
      "privacy.children.title": "Privacidad de Menores",
      "privacy.children.content": "Nuestro servicio no está dirigido a personas menores de 13 años. No recopilamos conscientemente información personal identificable de menores de 13 años.\n\nSi te das cuenta de que un menor de 13 años nos ha proporcionado información personal, contáctanos inmediatamente.",
      "privacy.thirdParty.title": "Enlaces de Terceros",
      "privacy.thirdParty.content": "Nuestro servicio puede contener enlaces a otros sitios web que no son operados por nosotros. Si haces clic en un enlace de terceros, serás dirigido al sitio de ese tercero.\n\nTe aconsejamos encarecidamente que revises la política de privacidad de cada sitio que visites.",
      "privacy.changes.title": "Cambios a Esta Política",
      "privacy.changes.content": "Podemos actualizar nuestra política de privacidad de vez en cuando. Te notificaremos de cualquier cambio publicando la nueva política de privacidad en esta página.\n\nTe aconsejamos que revises esta política de privacidad periódicamente para cualquier cambio.",
      "privacy.contact.title": "Contáctanos",
      "privacy.contact.content": "Si tienes alguna pregunta sobre esta política de privacidad, contáctanos en privacy@flowforge.com",
      "privacy.contact.intro": "Si tienes alguna pregunta sobre esta política de privacidad, no dudes en contactarnos.",
      "privacy.contact.dpo": "Oficial de Protección de Datos",
      "privacy.contact.email": "Email",
      "privacy.contact.address": "Dirección",
      "privacy.gdprRights.title": "Tus Derechos bajo GDPR",
      "privacy.gdprRights.intro": "Si eres residente de la Unión Europea, tienes ciertos derechos de protección de datos:",
      "privacy.gdprRights.access": "Derecho a acceder a tus datos personales",
      "privacy.gdprRights.rectification": "Derecho a corregir datos inexactos",
      "privacy.gdprRights.erasure": "Derecho a eliminar tus datos",
      "privacy.gdprRights.restrict": "Derecho a restringir el procesamiento",
      "privacy.gdprRights.portability": "Derecho a la portabilidad de datos",
      "privacy.gdprRights.object": "Derecho a objetar el procesamiento",
      "privacy.gdprRights.exercise": "Para ejercer estos derechos, contáctanos en",

      // Common
      "common.loading": "Cargando...",
      "common.back": "Atrás",
      "common.next": "Siguiente",
      "common.previous": "Anterior",
      "common.finish": "Finalizar",
      "common.cancel": "Cancelar",
      "common.save": "Guardar",
      "common.error": "Error",
      "common.success": "Éxito",
      "common.translate": "Traducir",
      "common.translated": "Traducido",
      "common.autoTranslated": "Auto-traducido",
      "common.translateTo": "Traducir a {{language}}",
      "common.backToDashboard": "Volver al Panel",
      "common.backToHome": "Volver al inicio",

      // Settings
      settings: {
        title: "Configuración",
        description: "Gestiona tu perfil y preferencias",
        success: "Éxito",
        error: "Error",
        profileUpdated: "Perfil actualizado correctamente",
        updateError: "Error al actualizar el perfil",
        subscriptionError: "Error al gestionar la suscripción",
        profile: {
          title: "Perfil",
          description: "Actualiza tu información personal",
          username: "Nombre de usuario",
          usernameHelp: "Solo letras, números y guiones bajos",
          displayName: "Nombre a mostrar",
          displayNamePlaceholder: "Tu nombre para mostrar",
          bio: "Bio",
          bioPlaceholder: "Cuéntanos sobre ti (máximo 160 caracteres)",
          github: "GitHub",
          linkedin: "LinkedIn",
          website: "Sitio web",
          publicProfile: "Perfil público",
          publicProfileHelp: "Permite que otros usuarios vean tu perfil",
          avatar: "Avatar",
          uploadAvatar: "Subir avatar",
          changeAvatar: "Cambiar avatar"
        },
        subscription: {
          title: "Suscripción",
          description: "Gestiona tu plan de suscripción",
          currentPlan: "Plan actual",
          active: "Activo",
          inactive: "Free",
          renewsOn: "Se renueva el",
          manage: "Gestionar suscripción",
          upgrade: "Actualizar a Premium"
        },
        language: {
          title: "Idioma y Región",
          description: "Elige tu idioma preferido",
          current: "Idioma actual"
        },
        notifications: {
          title: "Notificaciones",
          description: "Configura tus preferencias de notificación",
          dailyChallenge: "Desafío diario",
          dailyChallengeHelp: "Recibe notificaciones de nuevos desafíos",
          achievements: "Logros",
          achievementsHelp: "Notificaciones cuando desbloquees logros",
          streakReminders: "Recordatorios de racha",
          streakRemindersHelp: "Recuerda completar tu desafío diario"
        },
        privacy: {
          title: "Privacidad y Seguridad",
          description: "Gestiona tus datos y configuración de seguridad",
          exportData: "Exportar datos",
          downloadData: "Descargar mis datos",
          dangerZone: "Zona de peligro",
          deleteAccount: "Eliminar cuenta"
        }
      },

      // Toast notifications
      notifications: {
        challengeSubmitted: "¡Desafío enviado exitosamente!",
        levelUp: "¡Subiste de nivel! Ahora eres {{level}}",
        achievementUnlocked: "¡Nuevo logro desbloqueado!",
        streakSaved: "¡Racha guardada!",
        newDailyChallenge: "¡Nuevo desafío diario disponible!",
        streakReminder: "No pierdas tu racha - completa el desafío de hoy",
        invalidWorkflow: "JSON de workflow inválido",
        networkError: "Error de red - por favor reintenta",
        subscriptionSuccess: "¡Suscripción actualizada exitosamente!",
        profileSaved: "Perfil guardado correctamente",
        avatarUploaded: "Avatar subido correctamente",
        dataExported: "Datos exportados correctamente"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
    }
  });

export default i18n;