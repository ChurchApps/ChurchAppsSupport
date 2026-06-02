---
title: "Servicios Conectados"
---

# Servicios Conectados

<div class="article-intro">

La forma más rápida de conectar B1 a otra herramienta de tecnología eclesiástica es generalmente una receta de Zapier o Make — no necesitas nueva infraestructura de B1, y el tercero hospeda el flujo de trabajo. Esta página es una lista seleccionada de servicios que hemos confirmado que son conectables hoy, con una guía de configuración corta y de copiar-pegar para cada uno.

</div>

## De un vistazo

| Servicio | Categoría | Puente | Qué puedes conectar |
|---|---|---|---|
| [Mailchimp](./mailchimp) | Correo | Zapier o Make | Sincronizar nuevas personas de B1 / donantes en una audiencia de Mailchimp |
| [Donorbox](./donorbox) | Donaciones | Zapier | Empujar donaciones y donantes de Donorbox de vuelta a B1 |
| [Subsplash](./subsplash) | Aplicación / Donaciones | Zapier | Tirar donaciones y personas de Subsplash a B1 |
| [VOMO](./vomo) | Voluntariado | Zapier | Sincronizar registros de voluntarios entre grupos de B1 y proyectos de VOMO |
| [Clearstream](./clearstream) | SMS | Zapier | Disparar un texto de Clearstream desde eventos de B1; ingerir respuestas como registros de B1 |
| [Text In Church](./text-in-church) | SMS / Flujos de trabajo | Zapier | Disparar flujos de trabajo de Text In Church desde B1; recibir datos de tarjeta de conexión |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks por Zapier o Make | Enviar SMS desde cualquier evento de B1 |
| [Checkr](./checkr) | Verificaciones de antecedentes | Make | Iniciar una verificación de antecedentes cuando alguien se une a un equipo de servicio |

## Qué Todos Estos Tienen en Común

1. **El lado de B1 del cableado es idéntico** — crea una clave de API con los alcances correctos en **B1Admin → Configuración → Desarrollador → Claves de API**, luego permite que el puente registre un webhook para el disparador (Zapier / Make hacen esto automáticamente, requiere `settings:write`) o llama puntos finales REST de B1 desde una acción descendente.
2. **El puente te factura, no a nosotros.** ChurchApps es gratis; Zapier y Make ambos tienen niveles gratis que cubren un puñado de recetas.
3. **Puedes probar el cableado sin ir en directo.** Ambos puentes tienen un botón "Paso de prueba" que dispara el disparador una vez en B1 y te muestra la forma de datos antes de que actives la receta.

## Elegir un Puente

- **Zapier** es más amigable y tiene el catálogo de aplicaciones más grande — úsalo como tu predeterminado a menos que el costo sea un problema.
- **Make** es más barato a escala y tiene lógica de enrutamiento/filtro más flexible — úsalo cuando un único flujo de trabajo tenga fan-out, condicionales o muchos pasos.
- **Webhooks por Zapier** (usado para el documento de Mobile Message) es un adaptador genérico que te permite POSTEAR a cualquier punto final HTTP desde un Zap cuando el destino no es una aplicación de Zapier de primera clase.

Si deseas algo que no esté en esta lista, la [API REST](/docs/developer/api) y [webhooks](/docs/developer/api/webhooks) de B1 están abiertos — puedes construir un puente único con el [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) en pocas horas.

## Qué No Está Aquí (y Por Qué)

Varias herramientas populares de tecnología eclesiástica — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — no tienen una aplicación de Zapier publicada o módulo de Make hoy. Tienen sus propias APIs pero conectarlos a B1 es un trabajo de código personalizado, no una receta, así que no encajan en esta lista. Si un proveedor agrega una aplicación de Zapier o módulo de Make, agregaremos el documento.

También hemos omitido deliberadamente herramientas específicas de servicios de planificación (música, presentación), productos competidores de ChMS, consultores de migración y herramientas que solo limpian datos específicos de PCO — ninguno de ellos tiene una ruta de cableado útil a B1.

## Ver También

- [Zapier (descripción general)](../zapier) — el lado de B1 de cada receta de Zapier es idéntico; este documento lo cubre una vez
- [Make (descripción general)](../make) — lo mismo para escenarios de Make
- [Slack y Discord](../slack-discord) — notificaciones de chat sin ningún puente
- [Google Sheets](../google-sheets) — exportaciones bajo demanda
- [Webhooks (referencia de desarrollador)](/docs/developer/api/webhooks) — el catálogo de eventos en el que cada receta se basa
