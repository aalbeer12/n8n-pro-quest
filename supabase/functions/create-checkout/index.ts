import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create a Supabase client using the anon key for user authentication
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const requestBody = await req.json();
    const { plan, userId, email, planType } = requestBody;

    // Support both new format (plan, userId, email) and legacy format (planType with auth header)
    let userEmail = email;
    let finalPlan = plan;
    
    if (!userEmail && !userId) {
      // Legacy format - use auth header
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) {
        throw new Error("Missing authentication or user data");
      }
      
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      const user = data.user;
      if (!user?.email) {
        throw new Error("User not authenticated or email not available");
      }
      
      userEmail = user.email;
      finalPlan = planType === 'monthly' ? 'premium_monthly' : 'premium_yearly';
    }

    if (!finalPlan || !userEmail) {
      throw new Error("Missing required fields: plan and email");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2023-10-16" 
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ 
      email: userEmail, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Define pricing based on plan type
    let priceData;
    let planName;
    
    if (finalPlan === "premium_monthly" || finalPlan === "monthly") {
      priceData = {
        currency: "eur",
        product_data: { 
          name: "FlowForge Premium - Mensual",
          description: "Plan mensual de FlowForge con acceso completo"
        },
        unit_amount: 1900, // €19.00
        recurring: { interval: "month" as const }
      };
      planName = "Premium Monthly";
    } else if (finalPlan === "premium_yearly" || finalPlan === "annual") {
      priceData = {
        currency: "eur",
        product_data: { 
          name: "FlowForge Premium - Anual",
          description: "Plan anual de FlowForge con acceso completo y descuento"
        },
        unit_amount: 19000, // €190.00
        recurring: { interval: "year" as const }
      };
      planName = "Premium Annual";
    } else {
      throw new Error(`Invalid plan type: ${finalPlan}`);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : userEmail,
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/dashboard?subscription=success`,
      cancel_url: `${req.headers.get("origin")}/dashboard?subscription=canceled`,
      metadata: {
        userId: userId || "unknown",
        plan: finalPlan,
        planName: planName
      }
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Error creating checkout:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});