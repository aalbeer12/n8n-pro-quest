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
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-8">
            {t('pages.about.title')}
          </h1>
          <div className="prose prose-lg max-w-none text-foreground-secondary">
            <p className="text-xl mb-6">
              {t('pages.about.intro')}
            </p>
            <p className="mb-6">
              {t('pages.about.mission')}
            </p>
            <p>
              {t('pages.about.team')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;