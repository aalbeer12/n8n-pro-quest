import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    
    // Update URL path for SEO - Spanish is default (no prefix)
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(en|es)/, '');
    
    let newPath;
    if (newLang === 'es') {
      // Spanish is default, no prefix needed
      newPath = pathWithoutLang || '/';
    } else {
      // English gets /en prefix
      newPath = `/en${pathWithoutLang}`;
    }
    
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