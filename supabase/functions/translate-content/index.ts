import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const deeplApiKey = Deno.env.get('DEEPL_API_KEY');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  contentType?: string;
  contentId?: string;
}

async function translateWithDeepL(text: string, sourceLang: string, targetLang: string) {
  if (!deeplApiKey) {
    throw new Error('DEEPL_API_KEY not configured');
  }

  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${deeplApiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      text: text,
      source_lang: sourceLang.toUpperCase(),
      target_lang: targetLang.toUpperCase(),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('DeepL API error:', error);
    throw new Error(`DeepL translation failed: ${response.status}`);
  }

  const data = await response.json();
  return data.translations[0].text;
}

async function getCachedTranslation(text: string, sourceLang: string, targetLang: string) {
  const { data, error } = await supabase
    .from('translations')
    .select('translated_content')
    .eq('source_content', text)
    .eq('source_language', sourceLang)
    .eq('target_language', targetLang)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching cached translation:', error);
    return null;
  }

  return data?.translated_content || null;
}

async function saveCachedTranslation(
  text: string, 
  sourceLang: string, 
  targetLang: string, 
  translation: string,
  contentType?: string,
  contentId?: string
) {
  const { error } = await supabase
    .from('translations')
    .upsert({
      source_content: text,
      source_language: sourceLang,
      target_language: targetLang,
      translated_content: translation,
      content_type: contentType || 'general',
      content_id: contentId,
    });

  if (error) {
    console.error('Error saving translation cache:', error);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, sourceLanguage, targetLanguage, contentType, contentId }: TranslationRequest = await req.json();

    if (!text || !sourceLanguage || !targetLanguage) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: text, sourceLanguage, targetLanguage' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check cache first
    const cachedTranslation = await getCachedTranslation(text, sourceLanguage, targetLanguage);
    if (cachedTranslation) {
      console.log('Returning cached translation');
      return new Response(
        JSON.stringify({ 
          translatedText: cachedTranslation, 
          cached: true,
          usage: { characters: 0 }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Translate with DeepL
    console.log(`Translating from ${sourceLanguage} to ${targetLanguage}: ${text.substring(0, 50)}...`);
    const translatedText = await translateWithDeepL(text, sourceLanguage, targetLanguage);

    // Save to cache
    await saveCachedTranslation(text, sourceLanguage, targetLanguage, translatedText, contentType, contentId);

    return new Response(
      JSON.stringify({ 
        translatedText, 
        cached: false,
        usage: { characters: text.length }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in translate-content function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});