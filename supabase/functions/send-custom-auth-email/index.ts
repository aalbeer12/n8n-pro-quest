
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuthEmailRequest {
  to: string;
  type: 'welcome' | 'login' | 'magic_link';
  data: {
    appUrl?: string;
    magicLink?: string;
    planType?: string;
    redirectPath?: string;
  };
}

const getEmailContent = (type: string, data: any) => {
  const baseStyles = `
    <style>
      .email-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
      }
      .header {
        text-align: center;
        padding: 40px 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        margin-bottom: 30px;
      }
      .logo {
        color: white;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .tagline {
        color: rgba(255, 255, 255, 0.9);
        font-size: 16px;
      }
      .content {
        padding: 0 20px;
        line-height: 1.6;
        color: #333333;
      }
      .button {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 14px 28px;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        margin: 20px 0;
      }
      .features {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        padding: 20px 0;
        color: #666666;
        font-size: 14px;
        border-top: 1px solid #eeeeee;
        margin-top: 40px;
      }
    </style>
  `;

  switch (type) {
    case 'magic_link':
      return `
        ${baseStyles}
        <div class="email-container">
          <div class="header">
            <div class="logo">🚀 FlowForge</div>
            <div class="tagline">Tu plataforma de automatización</div>
          </div>
          
          <div class="content">
            <h2>¡Tu acceso premium te está esperando! 🎉</h2>
            
            <p>Hola,</p>
            
            <p>Haz clic en el botón de abajo para acceder a tu cuenta y completar tu suscripción al <strong>plan ${data.planType === 'monthly' ? 'mensual (€19/mes)' : 'anual (€190/año)'}</strong>:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.appUrl}${data.redirectPath}" class="button">
                🔑 Acceder y Continuar al Pago
              </a>
            </div>
            
            <div class="features">
              <h3>🎯 Lo que obtienes con tu plan premium:</h3>
              <ul>
                <li>✅ Retos diarios ilimitados</li>
                <li>🤖 Retroalimentación avanzada de IA</li>
                <li>📊 Análisis detallado de código</li>
                <li>🏆 Sistema de logros completo</li>
                <li>⚡ Soporte prioritario</li>
                ${data.planType === 'annual' ? '<li>🎁 2 meses GRATIS (ahorra 17%)</li>' : ''}
              </ul>
            </div>
            
            <p><strong>¿Por qué más de 500 desarrolladores eligen FlowForge?</strong></p>
            <p>• 92% mejora en habilidades de automatización<br>
               • Comunidad activa de desarrolladores<br>
               • Contenido actualizado constantemente</p>
            
            <p style="margin-top: 30px;">Si no solicitaste este acceso, puedes ignorar este email.</p>
            
            <p>¡Esperamos verte pronto automatizando como un profesional!</p>
            
            <p>Saludos,<br><strong>El equipo de FlowForge</strong></p>
          </div>
          
          <div class="footer">
            <p>FlowForge - La plataforma definitiva para aprender automatización</p>
            <p>¿Preguntas? Responde a este email y te ayudaremos.</p>
          </div>
        </div>
      `;

    case 'welcome':
      return `
        ${baseStyles}
        <div class="email-container">
          <div class="header">
            <div class="logo">🚀 FlowForge</div>
            <div class="tagline">Bienvenido a tu nueva aventura</div>
          </div>
          
          <div class="content">
            <h2>¡Bienvenido a FlowForge! 🎉</h2>
            
            <p>¡Hola y bienvenido a la comunidad FlowForge!</p>
            
            <p>Estamos emocionados de tenerte a bordo. FlowForge es la plataforma definitiva para dominar la automatización de procesos y llevar tus habilidades al siguiente nivel.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.appUrl}/dashboard" class="button">
                🚀 Empezar mi Aventura
              </a>
            </div>
            
            <div class="features">
              <h3>🎯 ¿Qué puedes hacer ahora?</h3>
              <ul>
                <li>💡 Completa tu primer reto gratuito</li>
                <li>📊 Explora el dashboard personalizado</li>
                <li>🤝 Únete a nuestra comunidad</li>
                <li>⚡ Considera el plan premium para acceso ilimitado</li>
              </ul>
            </div>
            
            <p>¡Estamos aquí para apoyarte en cada paso del camino!</p>
            
            <p>Saludos,<br><strong>El equipo de FlowForge</strong></p>
          </div>
          
          <div class="footer">
            <p>FlowForge - Automatiza. Aprende. Evoluciona.</p>
          </div>
        </div>
      `;

    default:
      return `
        ${baseStyles}
        <div class="email-container">
          <div class="header">
            <div class="logo">🚀 FlowForge</div>
          </div>
          <div class="content">
            <p>Email de FlowForge</p>
          </div>
        </div>
      `;
  }
};

const getSubject = (type: string, data: any) => {
  switch (type) {
    case 'magic_link':
      return `🚀 Tu acceso premium a FlowForge está listo (Plan ${data.planType === 'monthly' ? 'Mensual' : 'Anual'})`;
    case 'welcome':
      return '🎉 ¡Bienvenido a FlowForge! Tu aventura comienza ahora';
    default:
      return '🚀 FlowForge - Notificación';
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, type, data }: AuthEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "FlowForge <noreply@resend.dev>", // Cambia esto por tu dominio verificado
      to: [to],
      subject: getSubject(type, data),
      html: getEmailContent(type, data),
    });

    console.log("Email enviado correctamente:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error enviando email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
