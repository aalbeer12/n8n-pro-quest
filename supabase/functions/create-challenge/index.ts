import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const challengeData = await req.json();

    // Validate required fields
    const requiredFields = ['title', 'description', 'difficulty', 'category', 'requirements'];
    for (const field of requiredFields) {
      if (!challengeData[field]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Generate slug from title
    const slug = challengeData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .substring(0, 100);

    // Prepare challenge object
    const challenge = {
      slug: `${slug}-${Date.now()}`, // Add timestamp to ensure uniqueness
      title: challengeData.title,
      description: challengeData.description,
      story_context: challengeData.story_context || challengeData.description,
      difficulty: challengeData.difficulty,
      category: challengeData.category,
      points: challengeData.points || 100, // Default points
      time_estimate_minutes: challengeData.time_estimate_minutes || 30,
      requirements: challengeData.requirements,
      evaluation_criteria: challengeData.evaluation_criteria || {},
      hints: challengeData.hints || [],
      challenge_type: challengeData.challenge_type || 'workflow',
      is_active: challengeData.is_active !== false, // Default to true
      is_daily_challenge: challengeData.is_daily_challenge || false,
      published_at: challengeData.published_at || new Date().toISOString()
    };

    console.log('Creating challenge:', challenge);

    // Insert challenge into database
    const { data, error } = await supabase
      .from('challenges')
      .insert(challenge)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Challenge created successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        challenge: data,
        message: 'Challenge created successfully' 
      }),
      { 
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in create-challenge function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});