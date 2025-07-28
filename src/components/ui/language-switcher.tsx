import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    
    // Update URL path for SEO
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(en|es)/, '');
    const newPath = `/${newLang}${pathWithoutLang}`;
    window.history.pushState({}, '', newPath);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Globe className="w-4 h-4" />
      {i18n.language === 'en' ? 'ES' : 'EN'}
    </Button>
  );
};