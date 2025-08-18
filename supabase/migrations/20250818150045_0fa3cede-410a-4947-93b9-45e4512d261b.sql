-- Fix the security issue with email addresses exposed in display_name field

-- 1. First, clean up existing profiles that have email addresses in display_name
UPDATE public.profiles 
SET display_name = CASE 
  WHEN display_name LIKE '%@%' THEN NULL 
  ELSE display_name 
END
WHERE display_name LIKE '%@%';

-- 2. Create a function to validate display_name doesn't contain email addresses
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

-- 3. Create trigger to validate display_name on insert and update
DROP TRIGGER IF EXISTS validate_display_name_trigger ON public.profiles;
CREATE TRIGGER validate_display_name_trigger
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_display_name();

-- 4. Fix the handle_new_user function to never use email as display_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  generated_username text;
  safe_display_name text;
BEGIN
  -- Generate a unique username
  generated_username := COALESCE(
    NEW.raw_user_meta_data ->> 'username', 
    'user_' || substring(NEW.id::text, 1, 8)
  );
  
  -- Generate a safe display_name that never includes email
  safe_display_name := COALESCE(
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'display_name'
  );
  
  -- If display_name would be an email, set it to NULL instead
  IF safe_display_name IS NOT NULL AND safe_display_name LIKE '%@%' THEN
    safe_display_name := NULL;
  END IF;
  
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (NEW.id, generated_username, safe_display_name);
  
  RETURN NEW;
END;
$function$;