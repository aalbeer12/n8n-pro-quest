import { useTranslation } from 'react-i18next';
import { SEOMeta } from '@/components/seo/seo-meta';

const About = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t('pages.about.title')}
        description={t('pages.about.description')}
        canonical={`${window.location.origin}/${i18n.language}/about`}
      />
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Master n8n Automation Through Daily Practice
            </h1>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Build real-world automation skills with AI-powered feedback and join a community of automation experts.
            </p>
          </div>

          {/* Why FlowForge? */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why FlowForge?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Real Business Scenarios</h3>
                <p className="text-foreground-secondary">Practice with actual use cases from real automation projects in business environments.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Feedback</h3>
                <p className="text-foreground-secondary">Get instant, detailed evaluations and suggestions to improve your automation skills.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Build Your Portfolio</h3>
                <p className="text-foreground-secondary">Showcase your skills to employers with a public portfolio of completed challenges.</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                { step: 1, title: "Daily challenges delivered", icon: "📅" },
                { step: 2, title: "Build your solution", icon: "⚙️" },
                { step: 3, title: "Get instant AI feedback", icon: "💡" },
                { step: 4, title: "Track your progress", icon: "📈" },
                { step: 5, title: "Climb the leaderboard", icon: "🏆" }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-primary-foreground font-bold">
                    {item.step}
                  </div>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-sm text-foreground-secondary">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Free</h3>
                <div className="text-3xl font-bold mb-6">€0<span className="text-lg text-muted-foreground">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    7 challenges per week
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Basic feedback
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Community access
                  </li>
                </ul>
              </div>
              <div className="glass p-8 rounded-lg border-primary relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Premium</h3>
                <div className="text-3xl font-bold mb-6">€19<span className="text-lg text-muted-foreground">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Unlimited daily challenges
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Detailed AI analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Completion certificate
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Priority support
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "Automation Engineer",
                  content: "FlowForge helped me master n8n in just 3 months. The daily challenges are perfectly structured and the AI feedback is incredibly detailed."
                },
                {
                  name: "Miguel Rodriguez",
                  role: "Digital Transformation Lead",
                  content: "The real-world scenarios in FlowForge challenges directly translated to my work projects. I've become the go-to automation expert in my company."
                },
                {
                  name: "Emma Thompson",
                  role: "Freelance Consultant",
                  content: "Building my portfolio on FlowForge helped me land 3 new automation consulting clients. The certificates are recognized by employers."
                }
              ].map((testimonial, index) => (
                <div key={index} className="glass p-6 rounded-lg">
                  <p className="text-foreground-secondary mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Start Your Automation Journey</h2>
            <p className="text-xl text-foreground-secondary mb-8">
              Join thousands of professionals building automation skills with FlowForge
            </p>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;