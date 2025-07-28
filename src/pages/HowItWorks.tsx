import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOMeta } from '@/components/seo/seo-meta';
import { 
  Search, 
  Code, 
  Brain, 
  Trophy, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Target,
  Users,
  Zap,
  Star
} from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "howItWorks.steps.choose.title",
    description: "howItWorks.steps.choose.description",
    details: [
      "howItWorks.steps.choose.detail1",
      "howItWorks.steps.choose.detail2",
      "howItWorks.steps.choose.detail3"
    ]
  },
  {
    icon: Code,
    title: "howItWorks.steps.build.title", 
    description: "howItWorks.steps.build.description",
    details: [
      "howItWorks.steps.build.detail1",
      "howItWorks.steps.build.detail2",
      "howItWorks.steps.build.detail3"
    ]
  },
  {
    icon: Brain,
    title: "howItWorks.steps.feedback.title",
    description: "howItWorks.steps.feedback.description", 
    details: [
      "howItWorks.steps.feedback.detail1",
      "howItWorks.steps.feedback.detail2",
      "howItWorks.steps.feedback.detail3"
    ]
  },
  {
    icon: Trophy,
    title: "howItWorks.steps.improve.title",
    description: "howItWorks.steps.improve.description",
    details: [
      "howItWorks.steps.improve.detail1",
      "howItWorks.steps.improve.detail2", 
      "howItWorks.steps.improve.detail3"
    ]
  }
];

const features = [
  {
    icon: Target,
    title: "howItWorks.features.realWorld.title",
    description: "howItWorks.features.realWorld.description"
  },
  {
    icon: Clock,
    title: "howItWorks.features.timeEfficient.title", 
    description: "howItWorks.features.timeEfficient.description"
  },
  {
    icon: Users,
    title: "howItWorks.features.community.title",
    description: "howItWorks.features.community.description"
  },
  {
    icon: Zap,
    title: "howItWorks.features.instant.title",
    description: "howItWorks.features.instant.description"
  }
];

const HowItWorks = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t('howItWorks.title')}
        description={t('howItWorks.description')}
        canonical={`${window.location.origin}/${i18n.language}/how-it-works`}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6">
              {t('howItWorks.badge')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              {t('howItWorks.title')}
            </h1>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/auth">
                  {t('howItWorks.getStarted')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/challenges">
                  {t('howItWorks.viewChallenges')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('howItWorks.stepsTitle')}
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              {t('howItWorks.stepsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="absolute top-4 right-4 text-2xl font-bold text-primary/20">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                    
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">
                      {t(step.title)}
                    </h3>
                    
                    <p className="text-foreground-secondary mb-4">
                      {t(step.description)}
                    </p>
                    
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-2 text-sm text-foreground-secondary">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {t(detail)}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('howItWorks.featuresTitle')}
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              {t('howItWorks.featuresSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {t(feature.title)}
                      </h3>
                      <p className="text-foreground-secondary">
                        {t(feature.description)}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Challenge Preview */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('howItWorks.exampleTitle')}
            </h2>
            <p className="text-lg text-foreground-secondary">
              {t('howItWorks.exampleSubtitle')}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-surface to-surface/50">
              <div className="flex items-start gap-4 mb-6">
                <Badge variant="default">{t('howItWorks.example.difficulty')}</Badge>
                <Badge variant="secondary">{t('howItWorks.example.category')}</Badge>
                <div className="ml-auto flex items-center gap-1 text-sm text-foreground-secondary">
                  <Clock className="w-4 h-4" />
                  {t('howItWorks.example.time')}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">
                {t('howItWorks.example.title')}
              </h3>
              
              <p className="text-foreground-secondary mb-6">
                {t('howItWorks.example.description')}
              </p>
              
              <div className="bg-background rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  {t('howItWorks.example.requirementsTitle')}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {t('howItWorks.example.requirement1')}
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {t('howItWorks.example.requirement2')}
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {t('howItWorks.example.requirement3')}
                  </li>
                </ul>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                <Star className="w-4 h-4 text-yellow-500" />
                {t('howItWorks.example.points')}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('howItWorks.cta.title')}
            </h2>
            <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto">
              {t('howItWorks.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/auth">
                  {t('howItWorks.cta.primary')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/">
                  {t('howItWorks.cta.secondary')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;