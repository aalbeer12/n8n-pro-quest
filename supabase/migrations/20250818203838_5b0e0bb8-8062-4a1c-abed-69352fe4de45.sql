-- Add tracking fields to profiles table for registration and conversion tracking
ALTER TABLE public.profiles 
ADD COLUMN registration_source TEXT DEFAULT 'organic',
ADD COLUMN initial_plan_intent TEXT DEFAULT 'free',
ADD COLUMN converted_to_premium_at TIMESTAMPTZ;

-- Add comment for clarity
COMMENT ON COLUMN public.profiles.registration_source IS 'Tracks where user came from: organic, free_cta, premium_monthly_cta, premium_yearly_cta';
COMMENT ON COLUMN public.profiles.initial_plan_intent IS 'Tracks the plan user initially wanted: free, premium_monthly, premium_yearly';
COMMENT ON COLUMN public.profiles.converted_to_premium_at IS 'Timestamp when user converted to premium';