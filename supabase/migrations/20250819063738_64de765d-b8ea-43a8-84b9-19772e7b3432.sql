-- Arreglar warning de seguridad: agregar search_path a la función
CREATE OR REPLACE FUNCTION public.notify_submission_webhook()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;