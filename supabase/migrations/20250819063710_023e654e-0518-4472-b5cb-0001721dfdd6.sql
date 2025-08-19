-- Crear tabla de configuración para webhooks
CREATE TABLE IF NOT EXISTS public.webhook_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_name TEXT NOT NULL UNIQUE,
  webhook_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.webhook_config ENABLE ROW LEVEL SECURITY;

-- Solo administradores pueden ver/editar webhooks (por seguridad)
CREATE POLICY "Admin only webhook config" ON public.webhook_config FOR ALL USING (false);

-- Insertar configuración inicial para el webhook de submissions
INSERT INTO public.webhook_config (webhook_name, webhook_url) 
VALUES ('submission_notification', 'https://your-n8n-instance.com/webhook/submission-notification')
ON CONFLICT (webhook_name) DO NOTHING;

-- Actualizar la función para usar la tabla de configuración
CREATE OR REPLACE FUNCTION public.notify_submission_webhook()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url_var TEXT;
  payload_data JSONB;
BEGIN
  -- Obtener la URL del webhook desde configuración
  SELECT webhook_url INTO webhook_url_var 
  FROM public.webhook_config 
  WHERE webhook_name = 'submission_notification' 
  AND is_active = true
  LIMIT 1;
  
  -- Si no hay webhook configurado, no hacer nada
  IF webhook_url_var IS NULL THEN
    RETURN NEW;
  END IF;
  
  -- Construir payload
  payload_data := jsonb_build_object(
    'submission_id', NEW.id,
    'user_id', NEW.user_id,
    'challenge_id', NEW.challenge_id,
    'workflow_json', NEW.workflow_json,
    'workflow_description', NEW.workflow_description,
    'response_text', NEW.response_text,
    'attempt_number', NEW.attempt_number,
    'status', NEW.status,
    'created_at', NEW.created_at
  );
  
  -- Realizar llamada HTTP asíncrona
  PERFORM net.http_post(
    url := webhook_url_var,
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := payload_data
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear trigger para notificar webhook en nuevas submissions
DROP TRIGGER IF EXISTS trigger_notify_submission_webhook ON public.submissions;
CREATE TRIGGER trigger_notify_submission_webhook
  AFTER INSERT ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.notify_submission_webhook();