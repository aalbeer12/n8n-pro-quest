import { useTranslation } from 'react-i18next';
import { SEOMeta } from '@/components/seo/seo-meta';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, Mail, Book } from 'lucide-react';

const Help = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t('pages.help.title')}
        description={t('pages.help.description')}
        canonical={`${window.location.origin}/${i18n.language}/help`}
      />
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-8">
              {t('pages.help.title')}
            </h1>
            <p className="text-xl text-foreground-secondary">
              {t('pages.help.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="glass">
              <CardHeader>
                <HelpCircle className="w-8 h-8 text-primary mb-2" />
                <CardTitle>{t('pages.help.getting_started.title')}</CardTitle>
                <CardDescription>{t('pages.help.getting_started.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  {t('pages.help.getting_started.cta')}
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <MessageCircle className="w-8 h-8 text-secondary mb-2" />
                <CardTitle>{t('pages.help.contact.title')}</CardTitle>
                <CardDescription>{t('pages.help.contact.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  {t('pages.help.contact.cta')}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">{t('pages.help.faq.title')}</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t('pages.help.faq.q1.question')}</AccordionTrigger>
                <AccordionContent>{t('pages.help.faq.q1.answer')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t('pages.help.faq.q2.question')}</AccordionTrigger>
                <AccordionContent>{t('pages.help.faq.q2.answer')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t('pages.help.faq.q3.question')}</AccordionTrigger>
                <AccordionContent>{t('pages.help.faq.q3.answer')}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>{t('pages.help.faq.q4.question')}</AccordionTrigger>
                <AccordionContent>{t('pages.help.faq.q4.answer')}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;