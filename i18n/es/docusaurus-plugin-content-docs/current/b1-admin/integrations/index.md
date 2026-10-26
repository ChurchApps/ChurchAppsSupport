---
title: "Integraciones"
---

# Integraciones

<div class="article-intro">

B1 se conecta con las herramientas que tu equipo ya usa. Conecta Slack o Discord para las notificaciones del personal, automatiza flujos de trabajo con Zapier o Make, o exporta datos cuando los necesites a Google Sheets, sin pagar una plataforma de integración aparte y sin que ChurchApps aloje nada adicional. Cada integración funciona en la infraestructura del tercero y se comunica con tu iglesia a través de los webhooks o la API REST de B1.

</div>

## Qué está disponible

| Integración | Qué hace | Dirección | Esfuerzo de configuración |
|---|---|---|---|
| **[Slack](./slack-discord)** | Publica notificaciones legibles (nuevas personas, donaciones, registros, …) en un canal de Slack | B1 → Slack | 2 minutos |
| **[Discord](./slack-discord)** | Lo mismo, en un canal de Discord | B1 → Discord | 2 minutos |
| **[Zapier](./zapier)** | Usa los eventos de B1 como disparadores y las acciones de B1 en cualquiera de las más de 7,000 aplicaciones de Zapier | Ambas | 5–10 min por Zap |
| **[Make](./make)** | La misma idea que Zapier, en el constructor visual de escenarios de Make | Ambas | 5–10 min por escenario |
| **[Google Sheets](./google-sheets)** | Exporta Personas / Donaciones / Grupos / Asistencia a una hoja de cálculo cuando lo necesites | B1 → Hoja | 5 minutos |
| **[Claude](./claude)** | Haz preguntas a Claude de Anthropic sobre los datos de tu iglesia, limitadas a tus permisos: gratis para probar y recomendada | Ambas | Menos de 3 minutos |
| **[ChatGPT](./chatgpt)** | La misma idea con ChatGPT de OpenAI (requiere un plan de pago de ChatGPT) | Ambas | 10 minutos |
| **[Servicios conectados](./services/)** | Recetas seleccionadas para Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varía | 5–10 min cada uno |

## Cómo elegir

- **¿Solo quieres una notificación en el chat?** Usa **Slack** o **Discord**: no necesitas una cuenta de terceros ni mantener un Zap. Se configura completamente dentro de B1Admin.
- **¿Quieres automatizar algo entre aplicaciones** (por ejemplo, "cuando alguien dona, agrégalo a mi lista de Mailchimp y al canal #donaciones de Slack")? Usa **Zapier** o **Make**. Zapier es más amigable; Make es más económico a gran escala y tiene una lógica más flexible.
- **¿Necesitas una extracción de datos puntual o un informe programado?** Usa **Google Sheets**: pega una clave de API en el panel lateral del complemento y haz clic en Exportar.
- **¿Quieres hacer preguntas en lenguaje sencillo** ("¿cuántas visitas primerizas hubo el domingo pasado?", "resume las donaciones de este mes")? Empieza con **[Claude](./claude)**: es gratis para probar y se configura en menos de 3 minutos. **[ChatGPT](./chatgpt)** también funciona con un plan de pago. Claude se conecta iniciando sesión con tu cuenta de B1; ChatGPT usa una clave de API de B1.
- **¿Creas tu propia integración personalizada?** Ninguna de las anteriores: habla directamente con la [API REST](/docs/developer/api) con una [clave de API](/docs/developer/api/api-keys), o suscribe un servidor que controles a [webhooks](/docs/developer/api/webhooks).

## Lo que tienen en común

Todas las integraciones se autentican con una **clave de API de B1**, creada en B1Admin en **Configuración → Desarrollador → Claves de API**. La clave:

- Está vinculada a una persona específica de tu iglesia y hereda sus permisos
- Puede restringirse con **permisos (scopes)**; por ejemplo, una exportación a Google Sheets solo necesita `people:read`, no `settings:write`
- Puede revocarse en cualquier momento, cortando de inmediato el acceso de la integración sin afectar nada más

Algunos conectores (Zapier, Make) también registran un [webhook](/docs/developer/api/webhooks) en tu nombre cuando se activa el Zap o el escenario, y lo eliminan cuando desactivas el Zap; no tienes que administrar tú la URL del webhook.

:::tip
Para que Zapier y Make registren webhooks automáticamente, la clave de API necesita el permiso **`settings:write`** (además de los permisos de recursos para lo que la integración use). Una clave de solo lectura funciona para acciones y exportaciones, pero no para disparadores.
:::

## Costo

ChurchApps es gratuito y de código abierto. Slack/Discord, el [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), y los conectores oficiales de Zapier / Make / Google Sheets también son gratuitos por nuestra parte. Los terceros pueden cobrar por sus propias plataformas (Zapier y Make tienen planes gratuitos generosos; Slack, Discord y Google Sheets son gratuitos para este fin).

## Crea la tuya

Si ninguna de las anteriores te sirve, todas las superficies de B1 están abiertas:

- **[API REST](/docs/developer/api)**: llama a B1 desde cualquier lenguaje con un encabezado `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)**: suscribe un endpoint HTTPS público a uno o más tipos de eventos y recibe cargas JSON firmadas
- **[OAuth + Aplicaciones conectadas](/docs/developer/api/connected-apps)**: si estás creando un producto SaaS que usan muchas iglesias

## Próximos pasos

- [Slack y Discord](./slack-discord): publica notificaciones en el chat
- [Zapier](./zapier): conéctate con más de 7,000 aplicaciones
- [Make](./make): automatización visual de flujos de trabajo
- [Google Sheets](./google-sheets): exporta a hojas de cálculo
- [Claude](./claude): pregunta a Claude de Anthropic sobre los datos de tu iglesia
- [ChatGPT](./chatgpt): pregunta a ChatGPT de OpenAI sobre los datos de tu iglesia
- [Servicios conectados](./services/): recetas por servicio (Mailchimp, Donorbox, Clearstream, …)
