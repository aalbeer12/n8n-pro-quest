import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './use-auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface SubscriptionContextType {
  subscribed: boolean;
  subscriptionTier: 'free' | 'monthly' | 'annual';
  subscriptionEnd: string | null;
  loading: boolean;
  canAccessChallenge: () => boolean;
  weeklyFreeUsed: number;
  checkSubscription: () => Promise<void>;
  createCheckout: (planType: 'monthly' | 'annual') => Promise<void>;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'monthly' | 'annual'>('free');
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [weeklyFreeUsed, setWeeklyFreeUsed] = useState(0);
  const [loading, setLoading] = useState(true);

  const checkSubscription = async () => {
    if (!user || !session?.access_token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      setSubscribed(data.subscribed || false);
      setSubscriptionTier(data.subscription_tier || 'free');
      setSubscriptionEnd(data.subscription_end || null);

      // Get weekly free usage from profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('weekly_free_challenges_used, last_weekly_reset')
        .eq('id', user.id)
        .single();

      if (profile) {
        // Check if week needs to be reset
        const lastReset = new Date(profile.last_weekly_reset);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        if (lastReset < weekAgo) {
          // Reset weekly counter
          await supabase
            .from('profiles')
            .update({
              weekly_free_challenges_used: 0,
              last_weekly_reset: new Date().toISOString().split('T')[0]
            })
            .eq('id', user.id);
          setWeeklyFreeUsed(0);
        } else {
          setWeeklyFreeUsed(profile.weekly_free_challenges_used || 0);
        }
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast({
        title: "Error",
        description: "No se pudo verificar la suscripción",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const canAccessChallenge = () => {
    if (subscribed) return true;
    return weeklyFreeUsed < 1; // 1 free challenge per week
  };

  const createCheckout = async (planType: 'monthly' | 'annual') => {
    if (!session?.access_token) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para suscribirte",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Open Stripe checkout in new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "No se pudo iniciar el proceso de pago",
        variant: "destructive"
      });
    }
  };

  const refreshSubscription = async () => {
    await checkSubscription();
  };

  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setLoading(false);
      setSubscribed(false);
      setSubscriptionTier('free');
      setSubscriptionEnd(null);
      setWeeklyFreeUsed(0);
    }
  }, [user]);

  return (
    <SubscriptionContext.Provider value={{
      subscribed,
      subscriptionTier,
      subscriptionEnd,
      loading,
      canAccessChallenge,
      weeklyFreeUsed,
      checkSubscription,
      createCheckout,
      refreshSubscription
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};