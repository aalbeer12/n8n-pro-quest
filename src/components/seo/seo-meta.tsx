import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOMetaProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export const SEOMeta = ({ title, description, canonical }: SEOMetaProps) => {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = i18n.language;
    
    // Update title if provided
    if (title) {
      document.title = title;
    }
    
    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
    
    // Add/update hreflang tags
    const baseUrl = window.location.origin;
    const currentPath = window.location.pathname.replace(/^\/(en|es)/, '');
    
    // Remove existing hreflang tags
    document.querySelectorAll('link[hreflang]').forEach(link => link.remove());
    
    // Add hreflang for both languages
    const languages = ['en', 'es'];
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = `${baseUrl}/${lang}${currentPath}`;
      document.head.appendChild(link);
    });
    
    // Add x-default hreflang
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `${baseUrl}/en${currentPath}`;
    document.head.appendChild(defaultLink);
    
    // Add canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }
    
    // Add Open Graph tags
    const ogTags = [
      { property: 'og:locale', content: i18n.language === 'es' ? 'es_ES' : 'en_US' },
      { property: 'og:site_name', content: 'FlowForge' },
      { property: 'og:type', content: 'website' }
    ];
    
    if (title) {
      ogTags.push({ property: 'og:title', content: title });
    }
    
    if (description) {
      ogTags.push({ property: 'og:description', content: description });
    }
    
    ogTags.forEach(({ property, content }) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });
    
  }, [i18n.language, title, description, canonical]);
  
  return null;
};