---
title: "Integraciones"
---

# Integraciones

<div class="article-intro">

B1 se conecta a las herramientas que tu equipo ya usa. Conecta Slack o Discord para notificaciones de personal, automatiza flujos de trabajo en Zapier o Make, o exporta datos bajo demanda a Google Sheets — sin pagar por una plataforma de integración separada y sin que ChurchApps hospede nada extra. Cada integración se ejecuta en la infraestructura propia del tercero y se comunica con tu iglesia a través de webhooks o API REST de B1.

</div>

## Qué Está Disponible

| Integración | Qué hace | Dirección | Esfuerzo para configurar |
|---|---|---|---|
| **[Slack](./slack-discord)** | Publica notificaciones legibles (personas nuevas, donaciones, registros, …) en un canal de Slack | B1 → Slack | 2 minutos |
| **[Discord](./slack-discord)** | Lo mismo, en un canal de Discord | B1 → Discord | 2 minutos |
| **[Zapier](./zapier)** | Usa eventos de B1 como disparadores y acciones de B1 en cualquiera de los 7,000+ aplicaciones de Zapier | Ambos | 5–10 min por Zap |
| **[Make](./make)** | La misma idea que Zapier, en el constructor de escenarios visuales de Make | Ambos | 5–10 min por escenario |
| **[Google Sheets](./google-sheets)** | Exporta Personas / Donaciones / Grupos / Asistencia a una hoja de cálculo bajo demanda | B1 → Hoja | 5 minutos |
| **[Claude](./claude)** | Haz preguntas a Claude de Anthropic sobre los datos de tu iglesia, limitado a tus permisos | Ambos | 5 minutos |
| **[ChatGPT](./chatgpt)** | La misma idea con ChatGPT de OpenAI, a través de un GPT personalizado o herramientas conscientes de MCP de OpenAI | Ambos | 10 minutos |
| **[Servicios conectados](./services/)** | Recetas seleccionadas para Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varía | 5–10 min cada una |

## Cómo Elegir

- **¿Solo quieres una notificación en el chat?** Usa **Slack** o **Discord** — sin cuenta de terceros, sin Zap que mantener. Configurado completamente dentro de B1Admin.
- **¿Quieres automatizar algo en todas las aplicaciones** (p. ej. "cuando alguien da, añádelo a mi lista de Mailchimp y Slack #donations")? Usa **Zapier** o **Make**. Zapier es más amigable; Make es más barato a escala y tiene lógica más flexible.
- **¿Necesitas una extracción de datos única o un informe programado?** Usa **Google Sheets** — pega una clave de API en la barra lateral del complemento y haz clic en Exportar.
- **¿Quieres hacer preguntas en inglés simple** ("¿cuántos visitantes por primera vez el domingo pasado?", "resume las donaciones este mes")? Usa **[Claude](./claude)** o **[ChatGPT](./chatgpt)** — ambos se conectan a B1 con una única clave de API.
- **¿Estás construyendo tu propia integración personalizada?** Ninguna de las anteriores — habla directamente con la [API REST](/docs/developer/api) usando una [clave de API](/docs/developer/api/api-keys), o suscribe un servidor que controlas a [webhooks](/docs/developer/api/webhooks).

## Qué Tienen en Común

Cada integración se autentica con una **clave de API B1**, creada en B1Admin bajo **Configuración → Desarrollador → Claves de API**. La clave:

- Se vincula a una persona específica en tu iglesia y hereda los permisos de esa persona
- Se puede estrechar con **alcances** — por ejemplo, una exportación de Google Sheets solo necesita `people:read`, no `settings:write`
- Se puede revocar en cualquier momento, cortando instantáneamente el acceso de la integración sin afectar nada más

Algunos conectores (Zapier, Make) también registran un [webhook](/docs/developer/api/webhooks) en tu nombre cuando el Zap o escenario está activado, y lo eliminan cuando lo apagas — no administras la URL del webhook tú mismo.

:::tip
Para que Zapier y Make registren webhooks automáticamente, la clave de API necesita el alcance **`settings:write`** (más los alcances de recursos para lo que toque la integración). Una clave de solo lectura funciona para acciones y exportaciones pero no para disparadores.
:::

## Costo

ChurchApps es gratis y de código abierto. Slack/Discord, el [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), y los conectores oficiales de Zapier / Make / Google Sheets también son gratis de nuestro lado. Los terceros pueden cobrar por sus propias plataformas (Zapier y Make tienen niveles gratis generosos; Slack, Discord y Google Sheets son gratis para este propósito).

## Construir el Tuyo Propio

Si nada de lo anterior encaja, cada superficie de B1 está abierta:

- **[API REST](/docs/developer/api)** — llama a B1 desde cualquier lenguaje con un encabezado `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)** — suscribe un punto final HTTPS público a uno o más tipos de eventos y recibe cargas útiles JSON firmadas
- **[OAuth + Aplicaciones Conectadas](/docs/developer/api/connected-apps)** — si estás construyendo un producto SaaS usado por muchas iglesias

## Próximos Pasos

- [Slack y Discord](./slack-discord) — publica notificaciones de chat
- [Zapier](./zapier) — conecta a 7,000+ aplicaciones
- [Make](./make) — automatización de flujos de trabajo visuales
- [Google Sheets](./google-sheets) — exporta a hojas de cálculo
- [Claude](./claude) — pregunta a Claude de Anthropic sobre los datos de tu iglesia
- [ChatGPT](./chatgpt) — pregunta a ChatGPT de OpenAI sobre los datos de tu iglesia
- [Servicios conectados](./services/) — recetas por servicio (Mailchimp, Donorbox, Clearstream, …)
