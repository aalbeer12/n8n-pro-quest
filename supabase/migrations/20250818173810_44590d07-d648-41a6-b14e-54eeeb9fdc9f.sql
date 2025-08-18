-- Fix critical security issue with subscribers table policies
-- Drop the insecure policies that allow public access
DROP POLICY IF EXISTS "Insert subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Update subscription" ON public.subscribers;

-- Create secure policies that only allow authenticated users to manage their own data
CREATE POLICY "Users can insert their own subscription" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" 
ON public.subscribers 
FOR UPDATE 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);