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

-- Add constraint to ensure email and user_id consistency
ALTER TABLE public.subscribers 
ADD CONSTRAINT subscribers_user_email_consistency 
CHECK (
  -- Allow service role to bypass this check for automated updates
  current_setting('role') = 'service_role' 
  OR 
  -- For regular users, ensure email matches their auth email
  email IN (
    SELECT email FROM auth.users WHERE id = user_id
  )
);