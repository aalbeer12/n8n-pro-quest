import { Globe, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAutoTranslate } from '@/hooks/use-auto-translate';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface TranslationBadgeProps {
  onTranslate?: () => void;
  isTranslated?: boolean;
  compact?: boolean;
}

export const TranslationBadge = ({ 
  onTranslate, 
  isTranslated = false, 
  compact = false 
}: TranslationBadgeProps) => {
  const { isTranslating } = useAutoTranslate();
  const { t, i18n } = useTranslation();
  const [hasTranslated, setHasTranslated] = useState(isTranslated);

  const handleTranslate = () => {
    if (onTranslate) {
      onTranslate();
      setHasTranslated(true);
    }
  };

  if (compact) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleTranslate}
        disabled={isTranslating || hasTranslated}
        className="h-7 px-2 text-xs"
      >
        {isTranslating ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <Globe className="w-3 h-3" />
        )}
        {!compact && (
          <span className="ml-1">
            {hasTranslated ? t('common.translated') : t('common.translate')}
          </span>
        )}
      </Button>
    );
  }

  if (hasTranslated) {
    return (
      <Badge variant="secondary" className="gap-1">
        <Globe className="w-3 h-3" />
        {t('common.autoTranslated')}
      </Badge>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleTranslate}
      disabled={isTranslating}
      className="gap-2"
    >
      {isTranslating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Globe className="w-4 h-4" />
      )}
      {t('common.translateTo', { 
        language: i18n.language === 'en' ? 'English' : 'Español' 
      })}
    </Button>
  );
};