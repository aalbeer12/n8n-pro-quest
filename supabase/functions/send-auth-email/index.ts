import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  type: 'welcome' | 'password_reset' | 'email_confirmation';
  data?: Record<string, any>;
}

const emailTemplates = {
  welcome: {
    subject: "¡Bienvenido a AutomationChallenge!",
    html: (data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">¡Bienvenido a AutomationChallenge!</h1>
        </div>
        <div style="padding: 40px; background: #f8f9fa;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            ¡Hola! Nos alegra mucho tenerte en nuestra comunidad de automatizadores.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            AutomationChallenge es la plataforma definitiva para dominar n8n con:
          </p>
          <ul style="font-size: 16px; line-height: 1.8; color: #333;">
            <li>🎯 Retos prácticos diarios</li>
            <li>🤖 Feedback IA personalizado</li>
            <li>🏆 Sistema de ranking y niveles</li>
            <li>👥 Comunidad activa de automatizadores</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data?.appUrl || 'https://automationchallenge.com'}/dashboard" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Comenzar Ahora
            </a>
          </div>
          <p style="font-size: 14px; color: #666; text-align: center;">
            ¡Que disfrutes automatizando! 🚀
          </p>
        </div>
      </div>
    `
  },
  password_reset: {
    subject: "Restablecer contraseña - AutomationChallenge",
    html: (data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Restablecer Contraseña</h1>
        </div>
        <div style="padding: 40px; background: #f8f9fa;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Hemos recibido una solicitud para restablecer tu contraseña en AutomationChallenge.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data?.resetUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Restablecer Contraseña
            </a>
          </div>
          <p style="font-size: 14px; color: #666;">
            Si no solicitaste este cambio, puedes ignorar este email. Tu contraseña permanecerá sin cambios.
          </p>
          <p style="font-size: 14px; color: #666;">
            Este enlace expirará en 1 hora por seguridad.
          </p>
        </div>
      </div>
    `
  },
  email_confirmation: {
    subject: "Confirma tu email - AutomationChallenge", 
    html: (data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Confirma tu Email</h1>
        </div>
        <div style="padding: 40px; background: #f8f9fa;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            ¡Casi terminamos! Solo falta confirmar tu dirección de email para activar tu cuenta.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data?.confirmUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Confirmar Email
            </a>
          </div>
          <p style="font-size: 14px; color: #666;">
            Si no creaste una cuenta en AutomationChallenge, puedes ignorar este email.
          </p>
        </div>
      </div>
    `
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, type, data }: EmailRequest = await req.json();

    if (!to || !type) {
      throw new Error("Missing required fields: to, type");
    }

    const template = emailTemplates[type];
    if (!template) {
      throw new Error(`Unknown email type: ${type}`);
    }

    const emailResponse = await resend.emails.send({
      from: "AutomationChallenge <noreply@automationchallenge.com>",
      to: [to],
      subject: template.subject,
      html: template.html(data || {}),
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, id: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-auth-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);