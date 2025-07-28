import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[EVALUATE-WORKFLOW] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const openAIKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAIKey) throw new Error("OPENAI_API_KEY is not set");
    logStep("OpenAI key verified");

    // Use service role key for database operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id });

    const { submissionId, workflow, challengeId } = await req.json();
    logStep("Request body parsed", { submissionId, challengeId });

    // Get challenge details
    const { data: challenge, error: challengeError } = await supabaseClient
      .from('challenges')
      .select('*')
      .eq('id', challengeId)
      .single();
    
    if (challengeError || !challenge) {
      throw new Error(`Challenge not found: ${challengeError?.message}`);
    }
    logStep("Challenge loaded", { challengeTitle: challenge.title });

    // Evaluate workflow with OpenAI
    const prompt = `
Analiza este workflow de n8n para el reto "${challenge.title}":

DESCRIPCIÓN DEL RETO:
${challenge.description}

CONTEXTO:
${challenge.story_context}

REQUISITOS OBLIGATORIOS:
${JSON.stringify(challenge.requirements, null, 2)}

CRITERIOS DE EVALUACIÓN:
${JSON.stringify(challenge.evaluation_criteria, null, 2)}

WORKFLOW ENVIADO:
${JSON.stringify(workflow, null, 2)}

INSTRUCCIONES:
1. Evalúa el workflow con una puntuación de 1-100
2. Analiza cada criterio: funcionalidad (50%), lógica (20%), eficiencia (20%), escalabilidad (10%)
3. Identifica aciertos y errores específicos
4. Proporciona feedback constructivo para mejorar
5. Sugiere optimizaciones concretas

Responde en JSON con esta estructura:
{
  "score": <número entre 1-100>,
  "scoreBreakdown": {
    "functionality": <número 1-100>,
    "logic": <número 1-100>, 
    "efficiency": <número 1-100>,
    "scalability": <número 1-100>
  },
  "feedback": {
    "strengths": ["fortaleza 1", "fortaleza 2"],
    "weaknesses": ["debilidad 1", "debilidad 2"],
    "suggestions": ["sugerencia 1", "sugerencia 2"],
    "detailedAnalysis": "Análisis detallado en español explicando la evaluación"
  },
  "points": <puntos ganados según dificultad>
}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Eres un experto evaluador de workflows de automatización n8n. Proporciona feedback técnico específico y constructivo en español.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const evaluationResult = JSON.parse(aiResponse.choices[0].message.content);
    logStep("AI evaluation completed", { score: evaluationResult.score });

    // Calculate points based on difficulty and score
    const difficultyMultiplier = {
      'easy': 1,
      'medium': 1.5,
      'hard': 2,
      'expert': 3
    };
    
    const basePoints = Math.round((evaluationResult.score / 100) * challenge.points);
    const finalPoints = Math.round(basePoints * (difficultyMultiplier[challenge.difficulty] || 1));

    // Update submission with results
    const { error: updateError } = await supabaseClient
      .from('submissions')
      .update({
        score: evaluationResult.score,
        score_breakdown: evaluationResult.scoreBreakdown,
        ai_feedback: evaluationResult.feedback,
        points_earned: finalPoints,
        difficulty_level: challenge.difficulty,
        status: 'completed',
        evaluated_at: new Date().toISOString()
      })
      .eq('id', submissionId);

    if (updateError) {
      throw new Error(`Failed to update submission: ${updateError.message}`);
    }

    logStep("Submission updated successfully", { submissionId, finalPoints });

    return new Response(JSON.stringify({
      success: true,
      score: evaluationResult.score,
      points: finalPoints,
      feedback: evaluationResult.feedback
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in evaluate-workflow", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});