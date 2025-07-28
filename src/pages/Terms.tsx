import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SEOMeta } from '@/components/seo/seo-meta';
import { ArrowLeft, FileText, Calendar, Mail } from 'lucide-react';

const Terms = () => {
  const { t, i18n } = useTranslation();
  const currentDate = new Date().toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const sections = [
    {
      title: "terms.acceptance.title",
      content: "terms.acceptance.content"
    },
    {
      title: "terms.description.title", 
      content: "terms.description.content"
    },
    {
      title: "terms.registration.title",
      content: "terms.registration.content"
    },
    {
      title: "terms.userContent.title",
      content: "terms.userContent.content"
    },
    {
      title: "terms.subscription.title",
      content: "terms.subscription.content"
    },
    {
      title: "terms.intellectualProperty.title",
      content: "terms.intellectualProperty.content"
    },
    {
      title: "terms.prohibited.title",
      content: "terms.prohibited.content"
    },
    {
      title: "terms.termination.title",
      content: "terms.termination.content"
    },
    {
      title: "terms.disclaimer.title",
      content: "terms.disclaimer.content"
    },
    {
      title: "terms.limitation.title",
      content: "terms.limitation.content"
    },
    {
      title: "terms.governing.title",
      content: "terms.governing.content"
    },
    {
      title: "terms.changes.title",
      content: "terms.changes.content"
    },
    {
      title: "terms.contact.title",
      content: "terms.contact.content"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t('terms.title')}
        description={t('terms.description')}
        canonical={`${window.location.origin}/${i18n.language}/terms`}
      />
      
      <div className="container max-w-4xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t('common.backToHome')}
            </Link>
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">
                {t('terms.title')}
              </h1>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-foreground-secondary mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{t('terms.lastUpdated')}: {currentDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{t('terms.effectiveDate')}: {currentDate}</span>
              </div>
            </div>
            
            <p className="text-lg text-foreground-secondary">
              {t('terms.intro')}
            </p>
          </motion.div>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('terms.tableOfContents')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index + 1}`}
                  className="text-sm text-primary hover:underline py-1"
                >
                  {index + 1}. {t(section.title)}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              id={`section-${index + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    {t(section.title)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    {t(section.content).split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4 text-foreground-secondary leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              {t('terms.questions.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground-secondary mb-4">
              {t('terms.questions.content')}
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>{t('terms.questions.email')}:</strong> legal@hackyourflows.com
              </p>
              <p className="text-sm">
                <strong>{t('terms.questions.address')}:</strong> Hack-Your-Flows, LLC<br />
                123 Automation Street<br />
                Tech City, TC 12345<br />
                United States
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Top */}
        <div className="mt-12 text-center">
          <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {t('common.backToTop')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Terms;