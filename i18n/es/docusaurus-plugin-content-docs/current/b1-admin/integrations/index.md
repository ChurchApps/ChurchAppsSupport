---
title: "Integraciones"
description: "Conecte B1 Admin con Slack, Discord, Zapier, Make, Google Sheets y asistentes de IA como Claude, con los pasos de configuración y los permisos de clave de API que necesita cada uno."
---

# Integraciones

<div class="article-intro">

B1 se conecta con las herramientas que su equipo ya usa. Conecte Slack o Discord para las notificaciones del personal, automatice flujos de trabajo con Zapier o Make, o exporte datos a Google Sheets cuando lo necesite, sin pagar una plataforma de integración aparte y sin que ChurchApps aloje nada adicional. Cada integración se ejecuta en la infraestructura propia del tercero y se comunica con su iglesia a través de los webhooks o la API REST de B1.

</div>

## Lo que está disponible {#whats-available}

| Integración | Qué hace | Dirección | Esfuerzo de configuración |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Publica notificaciones legibles (nuevas personas, donaciones, inscripciones, …) en un canal de Slack | B1 → Slack | 2 minutos |
| **[Discord](./slack-discord.md)** | Lo mismo, en un canal de Discord | B1 → Discord | 2 minutos |
| **[Zapier](./zapier.md)** | Use los eventos de B1 como disparadores y las acciones de B1 en cualquiera de las más de 7,000 aplicaciones de Zapier (en espera de la aprobación de Zapier) | Ambas | 5–10 min por Zap |
| **[Make](./make.md)** | La misma idea que Zapier, en el generador visual de escenarios de Make (aún no publicado) | Ambas | 5–10 min por escenario |
| **[Google Sheets](./google-sheets.md)** | Exporte Personas / Donaciones / Grupos / Asistencia a una hoja de cálculo cuando lo necesite (aún no publicado) | B1 → Hoja | 5 minutos |
| **[Claude](./claude.md)** | Haga preguntas a Claude de Anthropic sobre los datos de su iglesia, limitadas a sus permisos: gratis para probar, recomendado | Ambas | Menos de 3 minutos |
| **[ChatGPT](./chatgpt.md)** | La misma idea con ChatGPT de OpenAI (requiere un plan de pago de ChatGPT) | Ambas | 10 minutos |
| **[Mailchimp](./services/mailchimp.md)** | Mantenga una audiencia de Mailchimp sincronizada con sus personas, grupos y listas guardadas: integrado en B1 | B1 → Mailchimp | 5 minutos |
| **[Servicios conectados](./services/index.md)** | Recetas seleccionadas para Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varía | 5–10 min cada una |

## Cómo elegir {#how-to-pick}

- **¿Solo quiere una notificación en el chat?** Use **Slack** o **Discord**: no necesita una cuenta de terceros ni un Zap que mantener. Se configura por completo dentro de B1Admin.
- **¿Quiere automatizar algo entre aplicaciones** (por ejemplo, "cuando alguien da, agregarlo a mi lista de Mailchimp y al canal #donaciones de Slack")? Use **Zapier** o **Make**. Zapier es más amigable; Make es más económico a gran escala y tiene una lógica más flexible.
- **¿Necesita una extracción de datos puntual o un informe programado?** Use **Google Sheets**: pegue una clave de API en la barra lateral del complemento y haga clic en Exportar.
- **¿Quiere hacer preguntas en lenguaje sencillo** ("¿cuántos visitantes primerizos hubo el domingo pasado?", "resuma las donaciones de este mes")? Empiece con **[Claude](./claude.md)**: es gratis para probar y se configura en menos de 3 minutos. **[ChatGPT](./chatgpt.md)** también funciona con un plan de pago. Claude se conecta iniciando sesión con su cuenta de B1; ChatGPT usa una clave de API de B1.
- **¿Está construyendo su propia integración personalizada?** Ninguna de las anteriores: hable directamente con la [API REST](/docs/developer/api) usando una [clave de API](/docs/developer/api/api-keys), o suscriba un servidor que usted controle a los [webhooks](/docs/developer/api/webhooks).

## Lo que tienen en común {#what-they-have-in-common}

Todo se configura en B1Admin en **Settings → Developer**, que tiene tres pestañas: **API Keys**, **Webhooks** y **Connected Apps**.

- **Slack, Discord y Mailchimp** son webhooks que usted crea en la pestaña **Webhooks** (elija el **Connector Type** correspondiente). No necesitan una clave de API.
- **Claude** (con inicio de sesión con su cuenta de B1) aparece en la pestaña **Connected Apps**, donde puede revocarlo.
- **Zapier, Make, Google Sheets, ChatGPT y Claude con una clave** se autentican con una **clave de API de B1**, creada en la pestaña **API Keys**. La clave:

  - Está vinculada a la persona que la creó y hereda los permisos de esa persona
  - Puede limitarse con **scopes**: por ejemplo, una exportación a Google Sheets solo necesita `people:read`, no `settings:write`
  - Puede eliminarse en cualquier momento, cortando de inmediato el acceso de la integración sin afectar nada más

Algunos conectores (Zapier, Make) también registran un [webhook](/docs/developer/api/webhooks) en su nombre cuando se activa el Zap o el escenario, y lo eliminan cuando desactiva el Zap: usted no administra la URL del webhook directamente.

:::tip
Para que Zapier y Make registren webhooks automáticamente, la clave de API necesita el scope **`settings:write`** (además de los scopes de recursos que use la integración). Una clave de solo lectura sirve para acciones y exportaciones, pero no para disparadores.
:::

## Costo {#cost}

ChurchApps es gratuito y de código abierto. Slack/Discord, el [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), y los conectores oficiales de Zapier / Make / Google Sheets también son gratuitos por nuestra parte. Los terceros pueden cobrar por sus propias plataformas (Zapier y Make tienen planes gratuitos generosos; Slack, Discord y Google Sheets son gratuitos para este fin).

## Cómo crear la suya {#building-your-own}

Si ninguna de las anteriores le sirve, cada superficie de B1 está abierta:

- **[API REST](/docs/developer/api)**: llame a B1 desde cualquier lenguaje con un encabezado `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)**: suscriba un endpoint HTTPS público a uno o más tipos de eventos y reciba cargas JSON firmadas
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)**: si está creando un producto SaaS que usan muchas iglesias

## Siguientes pasos {#next-steps}

- [Slack y Discord](./slack-discord.md): publique notificaciones de chat
- [Zapier](./zapier.md): conéctese con más de 7,000 aplicaciones
- [Make](./make.md): automatización visual de flujos de trabajo
- [Google Sheets](./google-sheets.md): exporte a hojas de cálculo
- [Claude](./claude.md): pregúntele a Claude de Anthropic sobre los datos de su iglesia
- [ChatGPT](./chatgpt.md): pregúntele a ChatGPT de OpenAI sobre los datos de su iglesia
- [Servicios conectados](./services/index.md): recetas por servicio (Mailchimp, Donorbox, Clearstream, …)
