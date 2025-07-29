-- Update the handle_new_user function to save first name from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'username', 'user_' || substring(NEW.id::text, 1, 8)),
    COALESCE(
      NEW.raw_user_meta_data ->> 'first_name',
      NEW.raw_user_meta_data ->> 'display_name', 
      NEW.email
    )
  );
  RETURN NEW;
END;
$function$;