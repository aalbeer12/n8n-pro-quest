import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '@/hooks/use-subscription';
import { useAuth } from '@/hooks/use-auth';
import { SEOMeta } from '@/components/seo/seo-meta';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle, Calendar, Crown } from 'lucide-react';
import { useNotificationToast } from '@/components/ui/notification-toast';
import { Link } from 'react-router-dom';

const StripeTest = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { subscribed, subscriptionTier, subscriptionEnd, loading, createCheckout, refreshSubscription } = useSubscription();
  const { showNotification } = useNotificationToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (planType: 'monthly' | 'annual') => {
    if (!user) {
      showNotification('networkError');
      return;
    }

    setIsLoading(true);
    try {
      await createCheckout(planType);
      showNotification('subscriptionSuccess');
    } catch (error) {
      console.error('Error creating checkout:', error);
      showNotification('networkError');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await refreshSubscription();
      showNotification('subscriptionSuccess');
    } catch (error) {
      console.error('Error refreshing subscription:', error);
      showNotification('networkError');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="glass max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              Autenticación Requerida
            </CardTitle>
            <CardDescription>
              Necesitas iniciar sesión para probar la integración de Stripe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/auth">Iniciar Sesión</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title="Stripe Integration Test"
        description="Test Stripe payment integration"
        canonical={`${window.location.origin}/${i18n.language}/stripe-test`}
      />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Stripe Integration Test
            </h1>
            <p className="text-xl text-foreground-secondary">
              Test subscription functionality and verify Stripe configuration
            </p>
          </div>

          {/* Current Status */}
          <Card className="glass mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Current Subscription Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Subscription Status:</span>
                <Badge variant={subscribed ? "default" : "secondary"}>
                  {subscribed ? "Active" : "Free"}
                </Badge>
              </div>
              
              {subscriptionTier && (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Subscription Tier:</span>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    {subscriptionTier}
                  </Badge>
                </div>
              )}
              
              {subscriptionEnd && (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Subscription End:</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-3 h-3" />
                    {new Date(subscriptionEnd).toLocaleDateString()}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="font-medium">User Email:</span>
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>

              <Separator />

              <Button 
                onClick={handleRefresh} 
                disabled={loading || isLoading}
                variant="outline"
                className="w-full"
              >
                {loading || isLoading ? "Refreshing..." : "Refresh Subscription Status"}
              </Button>
            </CardContent>
          </Card>

          {/* Test Subscription Plans */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Monthly Plan Test
                </CardTitle>
                <CardDescription>
                  Test monthly subscription checkout flow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">€19/month</div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Unlimited daily challenges
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    AI-powered feedback
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Advanced analytics
                  </li>
                </ul>
                <Button 
                  onClick={() => handleCheckout('monthly')} 
                  disabled={loading || isLoading}
                  className="w-full"
                >
                  {loading || isLoading ? "Processing..." : "Test Monthly Checkout"}
                </Button>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-secondary" />
                  Annual Plan Test
                </CardTitle>
                <CardDescription>
                  Test annual subscription checkout flow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  €190/year
                  <span className="text-sm text-green-500 ml-2">Save 17%</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    All monthly features
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    2 months free
                  </li>
                </ul>
                <Button 
                  onClick={() => handleCheckout('annual')} 
                  disabled={loading || isLoading}
                  variant="secondary"
                  className="w-full"
                >
                  {loading || isLoading ? "Processing..." : "Test Annual Checkout"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Test Instructions */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Testing Instructions</CardTitle>
              <CardDescription>
                How to properly test the Stripe integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">1. Configure STRIPE_SECRET_KEY</h4>
                <p className="text-sm text-muted-foreground">
                  Make sure you've added your Stripe secret key to Supabase Edge Function secrets.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">2. Test Checkout Flow</h4>
                <p className="text-sm text-muted-foreground">
                  Click on either "Test Monthly Checkout" or "Test Annual Checkout" buttons above.
                  This should open Stripe checkout in a new tab.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">3. Use Test Card</h4>
                <p className="text-sm text-muted-foreground">
                  In Stripe test mode, use card number: 4242 4242 4242 4242
                  with any future expiry date and any CVC.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">4. Verify Subscription</h4>
                <p className="text-sm text-muted-foreground">
                  After successful payment, come back and click "Refresh Subscription Status"
                  to verify the subscription was created properly.
                </p>
              </div>

              <Separator />

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 mb-2">Important Notes</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• This page is for testing purposes only</li>
                  <li>• Make sure you're using Stripe test mode</li>
                  <li>• Real payments will not be processed in test mode</li>
                  <li>• Remove this page before going to production</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StripeTest;