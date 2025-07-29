import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Trophy, Zap, Gift, Target, Bell, Wifi, WifiOff } from 'lucide-react';

export type NotificationType = 
  | 'challengeSubmitted'
  | 'levelUp'
  | 'achievementUnlocked'
  | 'streakSaved'
  | 'newDailyChallenge'
  | 'streakReminder'
  | 'invalidWorkflow'
  | 'networkError'
  | 'subscriptionSuccess'
  | 'profileSaved'
  | 'avatarUploaded'
  | 'dataExported';

interface NotificationToastProps {
  type: NotificationType;
  data?: Record<string, any>;
}

export const useNotificationToast = () => {
  const { t } = useTranslation();

  const showNotification = (type: NotificationType, data?: Record<string, any>) => {
    const config = getNotificationConfig(type, t, data);
    
    toast(config.message, {
      description: config.description,
      icon: config.icon,
      className: config.className,
      duration: config.duration,
    });
  };

  return { showNotification };
};

const getNotificationConfig = (type: NotificationType, t: any, data?: Record<string, any>) => {
  const configs = {
    challengeSubmitted: {
      message: t('notifications.challengeSubmitted'),
      description: undefined,
      icon: <Target className="w-4 h-4" />,
      className: 'border-green-500 bg-green-50 text-green-900',
      duration: 3000,
    },
    levelUp: {
      message: t('notifications.levelUp', { level: data?.level || 'Expert' }),
      description: undefined,
      icon: <Trophy className="w-4 h-4" />,
      className: 'border-yellow-500 bg-yellow-50 text-yellow-900',
      duration: 5000,
    },
    achievementUnlocked: {
      message: t('notifications.achievementUnlocked'),
      description: data?.achievement || undefined,
      icon: <Gift className="w-4 h-4" />,
      className: 'border-purple-500 bg-purple-50 text-purple-900',
      duration: 4000,
    },
    streakSaved: {
      message: t('notifications.streakSaved'),
      description: `${data?.streak || 7} days streak!`,
      icon: <Zap className="w-4 h-4" />,
      className: 'border-orange-500 bg-orange-50 text-orange-900',
      duration: 3000,
    },
    newDailyChallenge: {
      message: t('notifications.newDailyChallenge'),
      description: undefined,
      icon: <Bell className="w-4 h-4" />,
      className: 'border-blue-500 bg-blue-50 text-blue-900',
      duration: 4000,
    },
    streakReminder: {
      message: t('notifications.streakReminder'),
      description: undefined,
      icon: <Zap className="w-4 h-4" />,
      className: 'border-amber-500 bg-amber-50 text-amber-900',
      duration: 6000,
    },
    invalidWorkflow: {
      message: t('notifications.invalidWorkflow'),
      description: undefined,
      icon: <WifiOff className="w-4 h-4" />,
      className: 'border-red-500 bg-red-50 text-red-900',
      duration: 4000,
    },
    networkError: {
      message: t('notifications.networkError'),
      description: undefined,
      icon: <WifiOff className="w-4 h-4" />,
      className: 'border-red-500 bg-red-50 text-red-900',
      duration: 5000,
    },
    subscriptionSuccess: {
      message: t('notifications.subscriptionSuccess'),
      description: undefined,
      icon: <Gift className="w-4 h-4" />,
      className: 'border-green-500 bg-green-50 text-green-900',
      duration: 3000,
    },
    profileSaved: {
      message: t('notifications.profileSaved'),
      description: undefined,
      icon: <Target className="w-4 h-4" />,
      className: 'border-green-500 bg-green-50 text-green-900',
      duration: 2000,
    },
    avatarUploaded: {
      message: t('notifications.avatarUploaded'),
      description: undefined,
      icon: <Target className="w-4 h-4" />,
      className: 'border-green-500 bg-green-50 text-green-900',
      duration: 2000,
    },
    dataExported: {
      message: t('notifications.dataExported'),
      description: undefined,
      icon: <Target className="w-4 h-4" />,
      className: 'border-green-500 bg-green-50 text-green-900',
      duration: 3000,
    },
  };

  return configs[type] || configs.profileSaved;
};