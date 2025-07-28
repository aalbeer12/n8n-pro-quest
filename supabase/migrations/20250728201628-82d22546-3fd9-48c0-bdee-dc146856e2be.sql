-- Insert sample challenges for testing
INSERT INTO public.challenges (
  slug,
  title,
  description,
  story_context,
  difficulty,
  category,
  points,
  time_estimate_minutes,
  requirements,
  evaluation_criteria,
  is_active,
  is_daily_challenge,
  published_at
) VALUES 
(
  'data-transformation-basics',
  'Transformación de Datos para E-commerce',
  'Aprende a limpiar y estructurar datos de productos para un catálogo online',
  'Tu startup de e-commerce necesita procesar miles de productos mal estructurados de diferentes proveedores. Cada proveedor usa formato diferente y necesitas normalizar todo para tu plataforma.',
  'easy',
  'data-processing',
  100,
  30,
  '{"must_include": ["Set node", "Transform node"], "constraints": ["No usar código personalizado", "Máximo 5 nodos"]}',
  '{"functionality": 50, "efficiency": 20, "clean_code": 20, "best_practices": 10}',
  true,
  true,
  NOW()
),
(
  'api-webhook-integration',
  'Integración de Webhooks Shopify',
  'Configura un flujo para procesar webhooks de nuevos pedidos en Shopify',
  'Eres el desarrollador de una agencia que maneja múltiples tiendas Shopify. Necesitas crear un sistema que automáticamente procese los pedidos entrantes y los sincronice con el ERP del cliente.',
  'medium',
  'api-integration',
  250,
  45,
  '{"must_include": ["HTTP Request node", "Webhook node", "Switch node"], "constraints": ["Manejar errores de API", "Incluir validación de datos"]}',
  '{"functionality": 40, "error_handling": 30, "efficiency": 20, "documentation": 10}',
  true,
  false,
  NOW()
);

-- Insert sample achievements
INSERT INTO public.achievements (
  slug,
  name,
  description,
  icon_name,
  category,
  xp_reward,
  criteria,
  rarity
) VALUES 
(
  'first-steps',
  'Primeros Pasos',
  'Completa tu primer reto exitosamente',
  'Star',
  'milestone',
  50,
  '{"type": "challenges_completed", "value": 1}',
  'common'
),
(
  'data-master',
  'Maestro de Datos',
  'Completa 5 retos de procesamiento de datos',
  'Database',
  'category',
  200,
  '{"type": "category_completed", "category": "data-processing", "value": 5}',
  'rare'
),
(
  'streak-warrior',
  'Guerrero de Rachas',
  'Mantén una racha de 7 días consecutivos',
  'Flame',
  'streak',
  300,
  '{"type": "streak", "value": 7}',
  'epic'
);