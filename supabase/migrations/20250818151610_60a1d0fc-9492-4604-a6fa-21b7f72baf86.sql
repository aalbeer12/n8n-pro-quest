-- Fix function search path security warning
CREATE OR REPLACE FUNCTION public.validate_display_name() 
RETURNS trigger 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = 'public'
AS $$
BEGIN
  -- Check if display_name contains @ symbol (likely an email)
  IF NEW.display_name IS NOT NULL AND NEW.display_name LIKE '%@%' THEN
    RAISE EXCEPTION 'Display name cannot contain email addresses for privacy and security reasons';
  END IF;
  
  -- Check if display_name looks like a full email pattern
  IF NEW.display_name IS NOT NULL AND NEW.display_name ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Display name cannot be an email address for privacy and security reasons';
  END IF;
  
  RETURN NEW;
END;
$$;