import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface TranslationResult {
  translatedText: string;
  cached: boolean;
  usage: { characters: number };
}

interface UseAutoTranslateReturn {
  translateText: (text: string, options?: TranslationOptions) => Promise<string>;
  translateChallenge: (challenge: any) => Promise<any>;
  isTranslating: boolean;
  error: string | null;
}

interface TranslationOptions {
  sourceLanguage?: string;
  targetLanguage?: string;
  contentType?: string;
  contentId?: string;
}

export const useAutoTranslate = (): UseAutoTranslateReturn => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  const translateText = useCallback(async (
    text: string, 
    options: TranslationOptions = {}
  ): Promise<string> => {
    if (!text.trim()) return text;

    setIsTranslating(true);
    setError(null);

    try {
      const sourceLanguage = options.sourceLanguage || (i18n.language === 'en' ? 'es' : 'en');
      const targetLanguage = options.targetLanguage || i18n.language;

      // If source and target are the same, return original text
      if (sourceLanguage === targetLanguage) {
        return text;
      }

      const { data, error: functionError } = await supabase.functions.invoke('translate-content', {
        body: {
          text,
          sourceLanguage,
          targetLanguage,
          contentType: options.contentType,
          contentId: options.contentId,
        },
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      const result: TranslationResult = data;
      return result.translatedText;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Translation failed';
      setError(errorMessage);
      console.error('Translation error:', err);
      
      // Return original text as fallback
      return text;
    } finally {
      setIsTranslating(false);
    }
  }, [i18n.language]);

  const translateChallenge = useCallback(async (challenge: any): Promise<any> => {
    if (!challenge) return challenge;

    setIsTranslating(true);
    setError(null);

    try {
      const currentLang = i18n.language;
      const sourceLang = currentLang === 'en' ? 'es' : 'en';

      // Fields to translate in a challenge
      const fieldsToTranslate = ['title', 'description', 'story_context'];
      const translatedChallenge = { ...challenge };

      // Translate each field
      for (const field of fieldsToTranslate) {
        if (challenge[field]) {
          translatedChallenge[field] = await translateText(challenge[field], {
            sourceLanguage: sourceLang,
            targetLanguage: currentLang,
            contentType: 'challenge',
            contentId: challenge.id,
          });
        }
      }

      // Translate requirements if they exist
      if (challenge.requirements && Array.isArray(challenge.requirements)) {
        translatedChallenge.requirements = await Promise.all(
          challenge.requirements.map(async (req: any) => {
            if (typeof req === 'string') {
              return await translateText(req, {
                sourceLanguage: sourceLang,
                targetLanguage: currentLang,
                contentType: 'challenge',
                contentId: challenge.id,
              });
            }
            if (req.text) {
              return {
                ...req,
                text: await translateText(req.text, {
                  sourceLanguage: sourceLang,
                  targetLanguage: currentLang,
                  contentType: 'challenge',
                  contentId: challenge.id,
                }),
              };
            }
            return req;
          })
        );
      }

      // Translate hints if they exist
      if (challenge.hints && Array.isArray(challenge.hints)) {
        translatedChallenge.hints = await Promise.all(
          challenge.hints.map(async (hint: any) => {
            if (typeof hint === 'string') {
              return await translateText(hint, {
                sourceLanguage: sourceLang,
                targetLanguage: currentLang,
                contentType: 'challenge',
                contentId: challenge.id,
              });
            }
            if (hint.text) {
              return {
                ...hint,
                text: await translateText(hint.text, {
                  sourceLanguage: sourceLang,
                  targetLanguage: currentLang,
                  contentType: 'challenge',
                  contentId: challenge.id,
                }),
              };
            }
            return hint;
          })
        );
      }

      return translatedChallenge;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Challenge translation failed';
      setError(errorMessage);
      console.error('Challenge translation error:', err);
      return challenge; // Return original as fallback
    } finally {
      setIsTranslating(false);
    }
  }, [i18n.language, translateText]);

  return {
    translateText,
    translateChallenge,
    isTranslating,
    error,
  };
};