import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { HeroSection } from '@/components/landing/hero-section';
import { FeatureCards } from '@/components/landing/feature-cards';
import { ProblemSection } from '@/components/landing/problem-section';
import { HowItWorks } from '@/components/landing/how-it-works';
import { PricingSection } from '@/components/pricing/pricing-section';
import { CTASection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';
import { SEOMeta } from '@/components/seo/seo-meta';

const Index = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a hash with auth tokens (magic link redirect)
    if (window.location.hash && window.location.hash.includes('access_token')) {
      console.log('🔗 Magic link detected on homepage, processing...');
      
      // Check localStorage for redirect intent
      const redirectIntent = localStorage.getItem('auth_redirect_intent');
      
      if (redirectIntent) {
        console.log('💾 Found redirect intent in localStorage:', redirectIntent);
        localStorage.removeItem('auth_redirect_intent'); // Clean up
        
        // Let Supabase process the hash, then navigate to intended destination
        setTimeout(() => {
          console.log('📍 Navigating to intended destination:', redirectIntent);
          navigate(redirectIntent);
        }, 500);
      } else {
        // No redirect intent, go to regular auth callback
        console.log('📍 No redirect intent, going to auth callback');
        setTimeout(() => {
          navigate('/auth/callback');
        }, 500);
      }
    }
  }, [navigate]);
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
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
