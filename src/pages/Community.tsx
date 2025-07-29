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
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Join the FlowForge Community
            </h1>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Connect with thousands of automation experts, share knowledge, and grow your skills together in our vibrant Discord community.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="glass text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Get Help from Experts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-secondary">
                  Ask questions and get answers from experienced n8n automation professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="glass text-center">
              <CardHeader>
                <MessageCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-lg">Share Your Automations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-secondary">
                  Showcase your workflows and learn from others' creative solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="glass text-center">
              <CardHeader>
                <Trophy className="w-12 h-12 text-warning mx-auto mb-4" />
                <CardTitle className="text-lg">Participate in Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-secondary">
                  Join workshops, competitions, and live automation sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="glass text-center">
              <CardHeader>
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <CardTitle className="text-lg">Network with Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-secondary">
                  Build connections with automation experts from around the world.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Community Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-foreground-secondary">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-foreground-secondary">Daily Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">1000+</div>
              <div className="text-foreground-secondary">Flows Shared</div>
            </div>
          </div>

          {/* Join Discord CTA */}
          <Card className="glass text-center p-12 mb-16">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Ready to Join?</CardTitle>
              <CardDescription className="text-lg">
                Connect with the FlowForge community on Discord and start your automation journey today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => window.open('https://discord.gg/flowforge', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Discord Community
              </Button>
            </CardContent>
          </Card>

          {/* Community Rules */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Be respectful and helpful to fellow members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Share knowledge and learn from others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Use appropriate channels for different topics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>No spam or self-promotion without permission</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Available Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">#</span>
                    <span><strong>general:</strong> General discussion and introductions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">#</span>
                    <span><strong>challenges:</strong> Discuss daily challenges and solutions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">#</span>
                    <span><strong>help:</strong> Get help with automation questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">#</span>
                    <span><strong>showcase:</strong> Show off your automation projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">#</span>
                    <span><strong>events:</strong> Community events and workshops</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;