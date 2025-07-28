-- Create translations table for dynamic content
CREATE TABLE public.translations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_content TEXT NOT NULL,
  source_language TEXT NOT NULL DEFAULT 'es',
  target_language TEXT NOT NULL,
  translated_content TEXT NOT NULL,
  content_type TEXT NOT NULL, -- 'challenge', 'feedback', 'general'
  content_id UUID, -- reference to challenge_id or other content
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure unique translations per content and language pair
  UNIQUE(source_content, source_language, target_language)
);

-- Enable RLS
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

-- Create policies for translations
CREATE POLICY "Translations are viewable by everyone" 
ON public.translations 
FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage translations" 
ON public.translations 
FOR ALL 
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_translations_content_lookup ON public.translations(source_content, source_language, target_language);
CREATE INDEX idx_translations_content_id ON public.translations(content_id, content_type);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_translations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_translations_updated_at
BEFORE UPDATE ON public.translations
FOR EACH ROW
EXECUTE FUNCTION public.update_translations_updated_at();