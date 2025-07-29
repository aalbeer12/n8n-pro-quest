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
      "landing.cta.startAutomation": "Start Your Automation",
      "landing.cta.journeyToday": "Journey Today",
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
          help: "Help Center",
          blog: "Blog"
        },
        company: {
          about: "About",
          privacy: "Privacy Policy",
          terms: "Terms of Service"
        },
        legal: {
          privacy: "Privacy Policy",
          terms: "Terms of Service"
        },
        copyright: "© 2024 FlowForge. All rights reserved."
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
      "auth.email": "Email",
      "auth.emailPlaceholder": "your@email.com",
      "auth.continue": "Continue with Email",
      "auth.checkEmail": "Check your email",
      "auth.checkEmailDesc": "We've sent you a magic link to sign in",
      "auth.resend": "Resend email",
      "auth.backToEmail": "Back to email",
      
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

      "landing.cta.startAutomation": "Comienza Tu Automatización",
      "landing.cta.journeyToday": "Viaje Hoy",
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
          help: "Centro de Ayuda",
          blog: "Blog"
        },
        company: {
          about: "Acerca de",
          privacy: "Política de Privacidad",
          terms: "Términos de Servicio"
        },
        legal: {
          privacy: "Política de Privacidad",
          terms: "Términos de Servicio"
        },
        copyright: "© 2024 FlowForge. Todos los derechos reservados."
      },

      // Pages
      pages: {
        about: {
          title: "Acerca de Nosotros",
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
      "auth.email": "Email",
      "auth.emailPlaceholder": "tu@email.com",
      "auth.continue": "Continuar con Email",
      "auth.checkEmail": "Revisa tu email",
      "auth.checkEmailDesc": "Te hemos enviado un enlace mágico para iniciar sesión",
      "auth.resend": "Reenviar email",
      "auth.backToEmail": "Volver al email",
      
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