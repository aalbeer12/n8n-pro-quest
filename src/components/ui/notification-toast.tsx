import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from './button';

interface NotificationToastProps {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose: (id: string) => void;
  actionUrl?: string;
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const colorMap = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
};

export const NotificationToast = ({
  id,
  title,
  message,
  type,
  duration = 5000,
  onClose,
  actionUrl,
}: NotificationToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = iconMap[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(id), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  const handleAction = () => {
    if (actionUrl) {
      window.open(actionUrl, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="bg-surface border border-border rounded-lg shadow-lg p-4 max-w-sm w-full glass"
        >
          <div className="flex items-start gap-3">
            <Icon className={`w-5 h-5 mt-0.5 ${colorMap[type]}`} />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground">{title}</h4>
              <p className="text-sm text-foreground-secondary mt-1">{message}</p>
              {actionUrl && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2" 
                  onClick={handleAction}
                >
                  View Details
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="p-1 h-auto hover:bg-transparent"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};