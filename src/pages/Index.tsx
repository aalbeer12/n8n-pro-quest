import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/components/landing/hero-section';
import { FeatureCards } from '@/components/landing/feature-cards';
import { ProblemSection } from '@/components/landing/problem-section';
import { HowItWorks } from '@/components/landing/how-it-works';
import { CTASection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';
import { SEOMeta } from '@/components/seo/seo-meta';

const Index = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t('landing.hero.title')}
        description={t('landing.hero.subtitle')}
        canonical={`${window.location.origin}/${i18n.language}`}
      />
      <HeroSection />
      <FeatureCards />
      <ProblemSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
