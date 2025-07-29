import { useTranslation } from 'react-i18next';
import { SEOMeta } from '@/components/seo/seo-meta';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageCircle, Trophy, Heart } from 'lucide-react';

const Community = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t('pages.community.title')}
        description={t('pages.community.description')}
        canonical={`${window.location.origin}/${i18n.language}/community`}
      />
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-8">
              {t('pages.community.title')}
            </h1>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              {t('pages.community.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mb-2" />
                <CardTitle>{t('pages.community.discord.title')}</CardTitle>
                <CardDescription>{t('pages.community.discord.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  {t('pages.community.discord.cta')}
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <MessageCircle className="w-8 h-8 text-secondary mb-2" />
                <CardTitle>{t('pages.community.forum.title')}</CardTitle>
                <CardDescription>{t('pages.community.forum.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full">
                  {t('pages.community.forum.cta')}
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <Trophy className="w-8 h-8 text-warning mb-2" />
                <CardTitle>{t('pages.community.events.title')}</CardTitle>
                <CardDescription>{t('pages.community.events.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  {t('pages.community.events.cta')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;