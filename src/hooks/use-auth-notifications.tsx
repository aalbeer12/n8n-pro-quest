import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuthNotifications = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const sendWelcomeEmail = async (email: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-auth-email', {
        body: {
          to: email,
          type: 'welcome',
          data: {
            appUrl: window.location.origin
          }
        }
      });

      if (error) {
        console.error('Error sending welcome email:', error);
      }
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  };

  const sendPasswordResetEmail = async (email: string, resetUrl: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-auth-email', {
        body: {
          to: email,
          type: 'password_reset',
          data: {
            resetUrl
          }
        }
      });

      if (error) {
        console.error('Error sending password reset email:', error);
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  const sendEmailConfirmation = async (email: string, confirmUrl: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-auth-email', {
        body: {
          to: email,
          type: 'email_confirmation',
          data: {
            confirmUrl
          }
        }
      });

      if (error) {
        console.error('Error sending email confirmation:', error);
      }
    } catch (error) {
      console.error('Error sending email confirmation:', error);
    }
  };

  return {
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendEmailConfirmation
  };
};