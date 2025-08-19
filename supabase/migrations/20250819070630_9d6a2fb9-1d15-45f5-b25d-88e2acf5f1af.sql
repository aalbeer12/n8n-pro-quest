-- Fix security vulnerability in subscribers table RLS policies
-- Issue: Need to validate both user_id and email to prevent email harvesting

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Users can update their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscribers;

-- Create more secure policies that validate both user_id AND email
CREATE POLICY "Users can view own subscription only"
ON public.subscribers
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() 
  AND email = auth.email()
);

CREATE POLICY "Users can insert own subscription only"
ON public.subscribers
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid() 
  AND email = auth.email()
);

CREATE POLICY "Users can update own subscription only"
ON public.subscribers
FOR UPDATE
TO authenticated
USING (
  user_id = auth.uid() 
  AND email = auth.email()
)
WITH CHECK (
  user_id = auth.uid() 
  AND email = auth.email()
);

-- Service role bypass for edge functions (needed for automated subscription updates)
CREATE POLICY "Service role full access"
ON public.subscribers
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create function to validate email-user_id consistency
CREATE OR REPLACE FUNCTION public.validate_subscriber_consistency()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Skip validation for service role (automated updates)
  IF current_setting('role') = 'service_role' THEN
    RETURN NEW;
  END IF;
  
  -- For regular users, ensure email matches authenticated user's email
  IF NEW.email != auth.email() OR NEW.user_id != auth.uid() THEN
    RAISE EXCEPTION 'Email and user_id must match authenticated user';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to enforce consistency
DROP TRIGGER IF EXISTS trigger_validate_subscriber_consistency ON public.subscribers;
CREATE TRIGGER trigger_validate_subscriber_consistency
  BEFORE INSERT OR UPDATE ON public.subscribers
  FOR EACH ROW EXECUTE FUNCTION public.validate_subscriber_consistency();