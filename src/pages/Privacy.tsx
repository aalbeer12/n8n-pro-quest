import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOMeta } from '@/components/seo/seo-meta';
import { ArrowLeft, Shield, Calendar, Mail, Eye, Lock, Database, Globe } from 'lucide-react';

const Privacy = () => {
  const { t, i18n } = useTranslation();
  const currentDate = new Date().toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const sections = [
    {
      icon: Database,
      title: "privacy.information.title",
      content: "privacy.information.content"
    },
    {
      icon: Eye,
      title: "privacy.usage.title", 
      content: "privacy.usage.content"
    },
    {
      icon: Lock,
      title: "privacy.sharing.title",
      content: "privacy.sharing.content"
    },
    {
      icon: Shield,
      title: "privacy.security.title",
      content: "privacy.security.content"
    },
    {
      icon: Globe,
      title: "privacy.cookies.title",
      content: "privacy.cookies.content"
    },
    {
      title: "privacy.rights.title",
      content: "privacy.rights.content"
    },
    {
      title: "privacy.retention.title",
      content: "privacy.retention.content"
    },
    {
      title: "privacy.international.title",
      content: "privacy.international.content"
    },
    {
      title: "privacy.children.title",
      content: "privacy.children.content"
    },
    {
      title: "privacy.thirdParty.title",
      content: "privacy.thirdParty.content"
    },
    {
      title: "privacy.changes.title",
      content: "privacy.changes.content"
    },
    {
      title: "privacy.contact.title",
      content: "privacy.contact.content"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t('privacy.title')}
        description={t('privacy.description')}
        canonical={`${window.location.origin}/${i18n.language}/privacy`}
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
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">
                {t('privacy.title')}
              </h1>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-foreground-secondary mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{t('privacy.lastUpdated')}: {currentDate}</span>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {t('privacy.gdprCompliant')}
              </Badge>
            </div>
            
            <p className="text-lg text-foreground-secondary">
              {t('privacy.intro')}
            </p>
          </motion.div>
        </div>

        {/* Quick Summary */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {t('privacy.summary.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-600">{t('privacy.summary.weDoTitle')}</h4>
                <ul className="space-y-2 text-sm text-foreground-secondary">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    {t('privacy.summary.weDo1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    {t('privacy.summary.weDo2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    {t('privacy.summary.weDo3')}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    {t('privacy.summary.weDo4')}
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-red-600">{t('privacy.summary.weDontTitle')}</h4>
                <ul className="space-y-2 text-sm text-foreground-secondary">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    {t('privacy.summary.weDont1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    {t('privacy.summary.weDont2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    {t('privacy.summary.weDont3')}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    {t('privacy.summary.weDont4')}
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('privacy.tableOfContents')}</CardTitle>
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

        {/* Privacy Sections */}
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
                      {section.icon ? (
                        <section.icon className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
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

        {/* GDPR Rights */}
        <Card className="mt-12 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {t('privacy.gdprRights.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground-secondary mb-4">
              {t('privacy.gdprRights.intro')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'privacy.gdprRights.access',
                'privacy.gdprRights.rectification', 
                'privacy.gdprRights.erasure',
                'privacy.gdprRights.restrict',
                'privacy.gdprRights.portability',
                'privacy.gdprRights.object'
              ].map((right, index) => (
                <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-surface/50">
                  <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t(right)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-primary/10">
              <p className="text-sm">
                <strong>{t('privacy.gdprRights.exercise')}:</strong> privacy@hackyourflows.com
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              {t('privacy.contact.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground-secondary mb-4">
              {t('privacy.contact.intro')}
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>{t('privacy.contact.dpo')}:</strong> Data Protection Officer
              </p>
              <p className="text-sm">
                <strong>{t('privacy.contact.email')}:</strong> privacy@hackyourflows.com
              </p>
              <p className="text-sm">
                <strong>{t('privacy.contact.address')}:</strong> FlowForge, LLC<br />
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

export default Privacy;