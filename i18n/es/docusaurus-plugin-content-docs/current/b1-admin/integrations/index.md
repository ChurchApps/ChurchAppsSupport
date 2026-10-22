---
title: "Integraciones"
---

# Integraciones

<div class="article-intro">

B1 se conecta con las herramientas que tu equipo ya utiliza. Conecta Slack o Discord para notificaciones del personal, automatiza flujos de trabajo con Zapier o Make, o exporta datos a Google Sheets cuando lo necesites, sin pagar una plataforma de integración aparte y sin que ChurchApps aloje nada adicional. Cada integración funciona en la infraestructura del tercero y se comunica con tu iglesia a través de los webhooks o la API REST de B1.

</div>

## Lo que está disponible

| Integración | Qué hace | Dirección | Esfuerzo de configuración |
|---|---|---|---|
| **[Slack](./slack-discord)** | Publica notificaciones legibles (nuevas personas, donaciones, registros, …) en un canal de Slack | B1 → Slack | 2 minutos |
| **[Discord](./slack-discord)** | Lo mismo, en un canal de Discord | B1 → Discord | 2 minutos |
| **[Zapier](./zapier)** | Usa los eventos de B1 como disparadores y las acciones de B1 en cualquiera de las más de 7,000 aplicaciones de Zapier | Ambas | 5–10 min por Zap |
| **[Make](./make)** | La misma idea que Zapier, en el constructor visual de escenarios de Make | Ambas | 5–10 min por escenario |
| **[Google Sheets](./google-sheets)** | Exporta Personas / Donaciones / Grupos / Asistencia a una hoja de cálculo cuando lo necesites | B1 → Hoja | 5 minutos |
| **[Claude](./claude)** | Hazle preguntas a Claude de Anthropic sobre los datos de tu iglesia, limitadas a tus permisos | Ambas | 5 minutos |
| **[ChatGPT](./chatgpt)** | La misma idea con ChatGPT de OpenAI, mediante un GPT personalizado o herramientas de OpenAI compatibles con MCP | Ambas | 10 minutos |
| **[Servicios conectados](./services/)** | Recetas seleccionadas para Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varía | 5–10 min cada uno |

## Cómo elegir

- **¿Solo quieres una notificación en un chat?** Usa **Slack** o **Discord**: no necesitas una cuenta de terceros ni mantener un Zap. Se configura completamente dentro de B1Admin.
- **¿Quieres automatizar algo entre aplicaciones** (por ejemplo, "cuando alguien da, agrégalo a mi lista de Mailchimp y al canal #donaciones de Slack")? Usa **Zapier** o **Make**. Zapier es más amigable; Make es más económico a gran escala y tiene una lógica más flexible.
- **¿Necesitas extraer datos una sola vez o un informe programado?** Usa **Google Sheets**: pega una clave de API en el panel lateral del complemento y haz clic en Exportar.
- **¿Quieres hacer preguntas en lenguaje natural** ("¿cuántos visitantes primerizos hubo el domingo pasado?", "resume las ofrendas de este mes")? Usa **[Claude](./claude)** o **[ChatGPT](./chatgpt)**. Ambos se conectan a B1 con una sola clave de API, y Claude también puede conectarse desde claude.ai iniciando sesión en B1.
- **¿Estás creando tu propia integración personalizada?** Ninguna de las anteriores: usa directamente la [REST API](/docs/developer/api) con una [clave de API](/docs/developer/api/api-keys), o suscribe un servidor que controles a los [webhooks](/docs/developer/api/webhooks).

## Lo que tienen en común

Cada integración se autentica con una **clave de API de B1**, creada en B1Admin en **Settings → Developer → API Keys**. La clave:

- Está vinculada a una persona específica de tu iglesia y hereda los permisos de esa persona
- Puede limitarse con **scopes**; por ejemplo, una exportación a Google Sheets solo necesita `people:read`, no `settings:write`
- Puede revocarse en cualquier momento, cortando de inmediato el acceso de la integración sin afectar nada más

Algunos conectores (Zapier, Make) también registran un [webhook](/docs/developer/api/webhooks) en tu nombre cuando se activa el Zap o el escenario, y lo eliminan cuando desactivas el Zap; no necesitas administrar tú mismo la URL del webhook.

:::tip
Para que Zapier y Make registren webhooks automáticamente, la clave de API necesita el scope **`settings:write`** (además de los scopes de recursos que use la integración). Una clave de solo lectura funciona para acciones y exportaciones, pero no para disparadores.
:::

## Costo

ChurchApps es gratuito y de código abierto. Slack/Discord, el [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), y los conectores oficiales de Zapier / Make / Google Sheets también son gratuitos desde nuestro lado. Los terceros pueden cobrar por sus propias plataformas (Zapier y Make tienen planes gratuitos generosos; Slack, Discord y Google Sheets son gratuitos para este propósito).

## Crea la tuya

Si ninguna de las opciones anteriores encaja, cada superficie de B1 está abierta:

- **[REST API](/docs/developer/api)**: llama a B1 desde cualquier lenguaje con un encabezado `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)**: suscribe un endpoint HTTPS público a uno o más tipos de eventos y recibe cargas JSON firmadas
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)**: si estás creando un producto SaaS que usan muchas iglesias

## Próximos pasos

- [Slack y Discord](./slack-discord): publica notificaciones de chat
- [Zapier](./zapier): conéctate con más de 7,000 aplicaciones
- [Make](./make): automatización visual de flujos de trabajo
- [Google Sheets](./google-sheets): exporta a hojas de cálculo
- [Claude](./claude): pregúntale a Claude de Anthropic sobre los datos de tu iglesia
- [ChatGPT](./chatgpt): pregúntale a ChatGPT de OpenAI sobre los datos de tu iglesia
- [Servicios conectados](./services/): recetas por servicio (Mailchimp, Donorbox, Clearstream, …)
