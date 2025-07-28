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
      "nav.signOut": "Sign Out",
      "nav.signIn": "Sign In",
      
      // Landing Page
      "landing.hero.title": "Master n8n Automation with Real Challenges",
      "landing.hero.subtitle": "The definitive platform to learn automation through practical challenges and real business cases. Improve your skills and compete with other developers.",
      "landing.hero.cta": "Start Free",
      "landing.hero.demo": "View Demo",
      
      "landing.problem.title": "The Problem with Current Automation Learning",
      "landing.problem.subtitle": "Most platforms teach theory, but automation requires practice with real scenarios",
      "landing.problem.theoretical": "Theoretical Courses",
      "landing.problem.theoreticalDesc": "Hours of videos without practical application",
      "landing.problem.generic": "Generic Examples", 
      "landing.problem.genericDesc": "Exercises that don't reflect real business problems",
      "landing.problem.feedback": "No Feedback",
      "landing.problem.feedbackDesc": "You don't know if you're doing it right or how to improve",
      
      "landing.features.title": "Learn Automation the Right Way",
      "landing.features.subtitle": "Practice with real cases, get AI feedback, and compete with the community",
      "landing.features.practical": "Practical Challenges",
      "landing.features.practicalDesc": "Real business cases from constructors, marketers, and SaaS",
      "landing.features.ai": "AI Feedback",
      "landing.features.aiDesc": "Instant analysis of your workflow with specific improvement suggestions",
      "landing.features.community": "Active Community",
      "landing.features.communityDesc": "Rankings, competitions, and knowledge sharing with other automatizers",
      
      "landing.howItWorks.title": "How It Works",
      "landing.howItWorks.step1": "Choose Your Challenge",
      "landing.howItWorks.step1Desc": "Pick a challenge according to your level and interests",
      "landing.howItWorks.step2": "Build in n8n",
      "landing.howItWorks.step2Desc": "Create your workflow in n8n following the requirements",
      "landing.howItWorks.step3": "Get Feedback",
      "landing.howItWorks.step3Desc": "Receive AI analysis and earn points for your solution",
      
      "landing.cta.title": "Start Improving Your Automation Skills Today",
      "landing.cta.subtitle": "Join hundreds of developers who are already mastering n8n",
      "landing.cta.button": "Start Free Challenge",
      
      "landing.footer.product": "Product",
      "landing.footer.challenges": "Challenges",
      "landing.footer.pricing": "Pricing", 
      "landing.footer.community": "Community",
      "landing.footer.company": "Company",
      "landing.footer.about": "About",
      "landing.footer.contact": "Contact",
      "landing.footer.support": "Support",
      "landing.footer.legal": "Legal",
      "landing.footer.privacy": "Privacy",
      "landing.footer.terms": "Terms",
      
      // Auth
      "auth.title": "Welcome to AutomationChallenge",
      "auth.subtitle": "Enter your email to get started",
      "auth.email": "Email",
      "auth.emailPlaceholder": "your@email.com",
      "auth.continue": "Continue with Email",
      "auth.checkEmail": "Check your email",
      "auth.checkEmailDesc": "We've sent you a magic link to sign in",
      "auth.resend": "Resend email",
      "auth.backToEmail": "Back to email",
      
      // Welcome
      "welcome.title": "Welcome to AutomationChallenge!",
      "welcome.subtitle": "The definitive platform to master n8n automation. Improve your skills with practical challenges and real cases.",
      "welcome.practicalTitle": "Practical Challenges",
      "welcome.practicalDesc": "Solve real automation cases with personalized AI feedback",
      "welcome.rankingTitle": "Ranking System", 
      "welcome.rankingDesc": "Compete with others and level up based on your performance",
      "welcome.communityTitle": "Community",
      "welcome.communityDesc": "Connect with other automatizers and share your progress",
      "welcome.assessmentTitle": "Initial Level Assessment",
      "welcome.assessmentDesc": "Answer a few quick questions so we can personalize your experience",
      "welcome.assessmentFeature1": "Only 5 questions",
      "welcome.assessmentFeature2": "Challenges adapted to your level",
      "welcome.assessmentFeature3": "You can change level later",
      "welcome.assessmentFeature4": "Completely optional",
      "welcome.startAssessment": "Start Assessment",
      "welcome.skipAssessment": "Skip (Start as Beginner)",
      
      // Dashboard
      "dashboard.welcome": "Welcome back",
      "dashboard.todayChallenge": "Today's Challenge",
      "dashboard.stats": "Your Stats",
      "dashboard.achievements": "Recent Achievements",
      "dashboard.activity": "Recent Activity",
      "dashboard.streak": "Current Streak",
      
      // Challenges
      "challenges.title": "Automation Challenges",
      "challenges.subtitle": "Practical challenges to master n8n",
      "challenges.all": "All",
      "challenges.dataProcessing": "Data Processing",
      "challenges.apiIntegration": "API Integration", 
      "challenges.workflowLogic": "Workflow Logic",
      "challenges.errorHandling": "Error Handling",
      "challenges.optimization": "Optimization",
      "challenges.difficulty.easy": "Easy",
      "challenges.difficulty.medium": "Medium",
      "challenges.difficulty.hard": "Hard",
      "challenges.difficulty.expert": "Expert",
      "challenges.points": "points",
      "challenges.minutes": "min",
      "challenges.startChallenge": "Start Challenge",
      
      // Subscription
      "subscription.planActive": "Active Plan",
      "subscription.planActiveDesc": "Full access to all daily challenges",
      "subscription.weeklyUsed": "Weekly challenge used",
      "subscription.subscribeUnlimited": "Subscribe for unlimited access to daily challenges",
      "subscription.freePlan": "Free Plan",
      "subscription.subscribeDaily": "Subscribe for unlimited daily challenges",
      "subscription.monthly": "€12/month",
      "subscription.annual": "€120/year",
      
      // Leaderboard
      "leaderboard.title": "Global Ranking",
      "leaderboard.subtitle": "Compete with other automation developers",
      "leaderboard.topPerformers": "Top Global Performers",
      "leaderboard.rankingsByLevel": "Rankings by Level",
      "leaderboard.beginner": "Beginner",
      "leaderboard.intermediate": "Intermediate", 
      "leaderboard.advanced": "Advanced",
      "leaderboard.expert": "Expert",
      "leaderboard.points": "Points",
      "leaderboard.challenges": "Challenges",
      "leaderboard.average": "Average",
      "leaderboard.noUsers": "No users at {{level}} level yet.",
      "leaderboard.beFirst": "Be the first to appear here!",
      
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
      "common.backToDashboard": "Back to Dashboard"
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
      
      "landing.problem.title": "El Problema del Aprendizaje Actual de Automatización",
      "landing.problem.subtitle": "La mayoría de plataformas enseñan teoría, pero la automatización requiere práctica con escenarios reales",
      "landing.problem.theoretical": "Cursos Teóricos",
      "landing.problem.theoreticalDesc": "Horas de vídeos sin aplicación práctica",
      "landing.problem.generic": "Ejemplos Genéricos",
      "landing.problem.genericDesc": "Ejercicios que no reflejan problemas reales de negocio",
      "landing.problem.feedback": "Sin Feedback",
      "landing.problem.feedbackDesc": "No sabes si lo estás haciendo bien o cómo mejorar",
      
      "landing.features.title": "Aprende Automatización de la Forma Correcta",
      "landing.features.subtitle": "Practica con casos reales, obtén feedback IA y compite con la comunidad",
      "landing.features.practical": "Retos Prácticos",
      "landing.features.practicalDesc": "Casos reales de negocio de constructoras, marketers y SaaS",
      "landing.features.ai": "Feedback IA",
      "landing.features.aiDesc": "Análisis instantáneo de tu workflow con sugerencias específicas de mejora",
      "landing.features.community": "Comunidad Activa",
      "landing.features.communityDesc": "Rankings, competiciones e intercambio de conocimiento con otros automatizadores",
      
      "landing.howItWorks.title": "Cómo Funciona",
      "landing.howItWorks.step1": "Elige Tu Reto",
      "landing.howItWorks.step1Desc": "Escoge un reto según tu nivel e intereses",
      "landing.howItWorks.step2": "Construye en n8n",
      "landing.howItWorks.step2Desc": "Crea tu workflow en n8n siguiendo los requisitos",
      "landing.howItWorks.step3": "Recibe Feedback",
      "landing.howItWorks.step3Desc": "Obtén análisis IA y gana puntos por tu solución",
      
      "landing.cta.title": "Empieza a Mejorar tus Habilidades de Automatización Hoy",
      "landing.cta.subtitle": "Únete a cientos de desarrolladores que ya están dominando n8n",
      "landing.cta.button": "Empezar Reto Gratis",
      
      "landing.footer.product": "Producto",
      "landing.footer.challenges": "Retos",
      "landing.footer.pricing": "Precios",
      "landing.footer.community": "Comunidad",
      "landing.footer.company": "Empresa",
      "landing.footer.about": "Acerca de",
      "landing.footer.contact": "Contacto",
      "landing.footer.support": "Soporte",
      "landing.footer.legal": "Legal",
      "landing.footer.privacy": "Privacidad",
      "landing.footer.terms": "Términos",
      
      // Auth
      "auth.title": "Bienvenido a AutomationChallenge",
      "auth.subtitle": "Introduce tu email para empezar",
      "auth.email": "Email",
      "auth.emailPlaceholder": "tu@email.com",
      "auth.continue": "Continuar con Email",
      "auth.checkEmail": "Revisa tu email",
      "auth.checkEmailDesc": "Te hemos enviado un enlace mágico para iniciar sesión",
      "auth.resend": "Reenviar email",
      "auth.backToEmail": "Volver al email",
      
      // Welcome
      "welcome.title": "¡Bienvenido a AutomationChallenge!",
      "welcome.subtitle": "La plataforma definitiva para dominar la automatización con n8n. Mejora tus habilidades con retos prácticos y casos reales.",
      "welcome.practicalTitle": "Retos Prácticos",
      "welcome.practicalDesc": "Resuelve casos reales de automatización con feedback IA personalizado",
      "welcome.rankingTitle": "Sistema de Ranking",
      "welcome.rankingDesc": "Compite con otros y sube de nivel según tu rendimiento",
      "welcome.communityTitle": "Comunidad",
      "welcome.communityDesc": "Conecta con otros automatizadores y comparte tu progreso",
      "welcome.assessmentTitle": "Evaluación de Nivel Inicial",
      "welcome.assessmentDesc": "Responde unas preguntas rápidas para que podamos personalizar tu experiencia",
      "welcome.assessmentFeature1": "Solo 5 preguntas",
      "welcome.assessmentFeature2": "Retos adaptados a tu nivel",
      "welcome.assessmentFeature3": "Puedes cambiar nivel después",
      "welcome.assessmentFeature4": "Completamente opcional",
      "welcome.startAssessment": "Comenzar Evaluación",
      "welcome.skipAssessment": "Saltar (Empezar como Principiante)",
      
      // Dashboard
      "dashboard.welcome": "Bienvenido de nuevo",
      "dashboard.todayChallenge": "Reto de Hoy",
      "dashboard.stats": "Tus Estadísticas",
      "dashboard.achievements": "Logros Recientes",
      "dashboard.activity": "Actividad Reciente",
      "dashboard.streak": "Racha Actual",
      
      // Challenges
      "challenges.title": "Retos de Automatización",
      "challenges.subtitle": "Retos prácticos para dominar n8n",
      "challenges.all": "Todos",
      "challenges.dataProcessing": "Procesamiento de Datos",
      "challenges.apiIntegration": "Integración API",
      "challenges.workflowLogic": "Lógica de Workflow",
      "challenges.errorHandling": "Manejo de Errores",
      "challenges.optimization": "Optimización",
      "challenges.difficulty.easy": "Fácil",
      "challenges.difficulty.medium": "Medio",
      "challenges.difficulty.hard": "Difícil",
      "challenges.difficulty.expert": "Experto",
      "challenges.points": "puntos",
      "challenges.minutes": "min",
      "challenges.startChallenge": "Empezar Reto",
      
      // Subscription
      "subscription.planActive": "Plan Activo",
      "subscription.planActiveDesc": "Acceso completo a todos los retos diarios",
      "subscription.weeklyUsed": "Reto semanal usado",
      "subscription.subscribeUnlimited": "Suscríbete para acceso ilimitado a retos diarios",
      "subscription.freePlan": "Plan Gratuito",
      "subscription.subscribeDaily": "Suscríbete para retos diarios ilimitados",
      "subscription.monthly": "€12/mes",
      "subscription.annual": "€120/año",
      
      // Leaderboard
      "leaderboard.title": "Ranking Global",
      "leaderboard.subtitle": "Compite con otros desarrolladores de automatización",
      "leaderboard.topPerformers": "Top Performers Global",
      "leaderboard.rankingsByLevel": "Rankings por Nivel",
      "leaderboard.beginner": "Principiante",
      "leaderboard.intermediate": "Intermedio",
      "leaderboard.advanced": "Avanzado",
      "leaderboard.expert": "Experto",
      "leaderboard.points": "Puntos",
      "leaderboard.challenges": "Retos",
      "leaderboard.average": "Promedio",
      "leaderboard.noUsers": "No hay usuarios en el nivel {{level}} aún.",
      "leaderboard.beFirst": "¡Sé el primero en aparecer aquí!",
      
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
      "common.backToDashboard": "Volver al Panel"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0
    }
  });

export default i18n;