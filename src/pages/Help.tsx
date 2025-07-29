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

          {/* Contact Form */}
          <Card className="glass mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Support
              </CardTitle>
              <CardDescription>
                Send us a message and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                // Show toast notification
                alert('Message sent! We\'ll get back to you within 24 hours.');
              }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <select className="w-full p-3 border rounded-lg bg-background">
                      <option>Technical Issue</option>
                      <option>Billing Question</option>
                      <option>Feature Request</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select className="w-full p-3 border rounded-lg bg-background">
                      <option>Normal</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    className="w-full p-3 border rounded-lg bg-background h-32"
                    placeholder="Describe your issue or question in detail..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="glass text-center">
              <CardHeader>
                <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-secondary mb-2">support@flowforge.io</p>
                <p className="text-sm text-muted-foreground">Usually responds within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="glass text-center">
              <CardHeader>
                <MessageCircle className="w-8 h-8 text-secondary mx-auto mb-2" />
                <CardTitle>Discord Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-secondary mb-2">Get instant help</p>
                <Button variant="outline" size="sm" onClick={() => window.open('https://discord.gg/flowforge', '_blank')}>
                  Join Discord
                </Button>
              </CardContent>
            </Card>

            <Card className="glass text-center">
              <CardHeader>
                <Book className="w-8 h-8 text-accent mx-auto mb-2" />
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-secondary mb-2">Coming soon</p>
                <p className="text-sm text-muted-foreground">Comprehensive guides and tutorials</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">{t('pages.help.faq.title')}</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I submit a challenge?</AccordionTrigger>
                <AccordionContent>
                  To submit a challenge, navigate to the challenge page, build your workflow in the editor or provide your text response, then click the "Submit" button. You'll receive instant AI-powered feedback on your solution.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How is my score calculated?</AccordionTrigger>
                <AccordionContent>
                  Your score is based on multiple factors including solution completeness, efficiency, best practices, and creativity. Our AI evaluates your workflow against industry standards and provides detailed feedback for improvement.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What are streak freezes?</AccordionTrigger>
                <AccordionContent>
                  Streak freezes allow you to maintain your daily challenge streak even if you miss a day. Premium users get 2 streak freezes per month, while free users get 1 per month. Use them wisely to keep your momentum!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do achievements work?</AccordionTrigger>
                <AccordionContent>
                  Achievements are unlocked by completing specific milestones like completing your first challenge, maintaining a 7-day streak, or achieving high scores. Each achievement gives you XP and shows your progress in mastering n8n automation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I retry challenges?</AccordionTrigger>
                <AccordionContent>
                  Yes! You can retry any challenge multiple times. However, only your best score counts toward your overall rating. Use retries to learn from feedback and improve your automation skills.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;