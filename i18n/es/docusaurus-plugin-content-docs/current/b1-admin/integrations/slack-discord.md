---
title: "Slack y Discord"
description: "Publique en un canal de Slack o Discord los eventos de B1 Admin, como nuevas personas, donaciones y envíos de formularios, con un webhook entrante, sin necesidad de Zapier."
---

# Slack y Discord

<div class="article-intro">

Publique notificaciones legibles desde B1 directamente en un canal de Slack o Discord: nuevas personas, donaciones, inscripciones a grupos, envíos de formularios, eventos de calendario y más. No necesita una cuenta de terceros ni un Zap que mantener: B1 da formato a los eventos como mensajes de chat y los envía por POST a la URL de webhook del canal.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita el permiso **Edit Settings** en B1Admin
- Un administrador en su espacio de trabajo de Slack o servidor de Discord que cree el Incoming Webhook del canal
- Decida en qué canal quiere recibir las notificaciones (puede usar el mismo canal para varios tipos de eventos, o dividirlos en varios canales)

</div>

## Cómo funciona {#how-it-works}

B1 tiene un **Connector Type** integrado para plataformas de chat. Cuando crea un webhook de tipo **Slack** o **Discord**, el motor de webhooks sigue haciendo su proceso habitual de entrega, reintento y encabezados firmados, pero el cuerpo que envía se transforma del sobre normal de B1 `{event,churchId,data}` en el pequeño mensaje `{text}` (Slack) o `{content}` (Discord) que esos servicios esperan.

Ningún servidor de B1 se conecta con Slack por iglesia, aparte del flujo de webhooks salientes que ya existe: no hay nada nuevo que alojar ni nada extra que pagar.

## Slack: paso a paso {#slack--step-by-step}

### 1. Obtenga una URL de Incoming Webhook de Slack {#1-get-a-slack-incoming-webhook-url}

1. Abra [api.slack.com/apps](https://api.slack.com/apps) en el espacio de trabajo de Slack donde quiere recibir las notificaciones.
2. Haga clic en **Create New App → From scratch**, póngale un nombre como "B1 Notifications" y elija el espacio de trabajo.
3. En el menú de la izquierda, elija **Incoming Webhooks** y active **Activate Incoming Webhooks** (*On*).
4. Haga clic en **Add New Webhook to Workspace**, elija el canal (por ejemplo, `#donations`) y luego **Allow**.
5. Slack lo devolverá a la página con una **Webhook URL** nueva, similar a `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Cópiela: es el único dato que B1 necesita.

:::caution
Trate la URL del webhook de Slack como un secreto. Cualquiera que la tenga puede publicar mensajes arbitrarios en el canal. Si la expone por accidente, regenérela desde la página de la app de Slack (regenerarla solo rota la URL; actualice B1 para que coincida).
:::

### 2. Conéctelo en B1Admin {#2-connect-it-in-b1admin}

1. En B1Admin vaya a **Settings → Developer → Webhooks**.
2. Haga clic en **New Webhook**.
3. Complete:
   - **Name**: un nombre legible como "Donaciones → #donations". Solo lo verá su equipo.
   - **Connector Type**: elija **Slack**.
   - **Payload URL**: pegue la URL de Slack del paso 1.
   - **Events**: marque los eventos que quiere recibir como mensajes. Para un canal de donaciones, solo `donation.created`. Para un canal de #people, pruebe con `person.created` y `group.member.added`.
4. Haga clic en **Save**. Aparecerá un cuadro de diálogo "Signing Secret": para Slack puede ignorarlo (Slack no verifica las firmas de B1) y cerrarlo.

### 3. Pruébelo {#3-test-it}

Vuelva a abrir el webhook desde la lista y haga clic en **Send Test Event**. B1 envía una muestra del primer evento que marcó; en uno o dos segundos aparecerá un mensaje como

> 💝 New donation: $50.00

en su canal de Slack, y en la tabla **Recent Deliveries** de la misma pantalla aparecerá una fila nueva con el estado `succeeded`. Listo.

## Discord: paso a paso {#discord--step-by-step}

### 1. Obtenga una URL de webhook de Discord {#1-get-a-discord-webhook-url}

1. En su servidor de Discord, pase el cursor sobre el canal donde quiere recibir las notificaciones y haga clic en el **⚙ engranaje** (Edit Channel).
2. Abra **Integrations → Webhooks → New Webhook**.
3. Póngale un nombre y, opcionalmente, un avatar, y luego haga clic en **Copy Webhook URL**: tendrá una forma similar a `https://discord.com/api/webhooks/123…/abc…`.

### 2. Conéctelo en B1Admin {#2-connect-it-in-b1admin-1}

Es igual que el flujo de Slack de arriba, solo que en **Connector Type** elija **Discord**. Pegue la URL de Discord en **Payload URL** y guarde.

:::tip
**No** necesita agregar `/slack` al final de la URL de Discord: B1 envía cargas `{content}` nativas de Discord, no compatibles con Slack. Simplemente pegue la URL que le dio Discord.
:::

### 3. Pruébelo {#3-test-it-1}

Use el mismo botón **Send Test Event**: Discord muestra el mensaje en el canal elegido y el registro de entregas cambia a `succeeded`.

## Cómo se ven los mensajes {#what-the-messages-look-like}

| Evento | Ejemplo de mensaje |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

La lista completa está en el [catálogo de eventos de webhooks](/docs/developer/api/webhooks#event-catalog): cualquier evento de ahí se puede enviar a Slack/Discord.

## Un canal por tema {#one-channel-per-topic}

No tiene que poner todos los eventos en un solo lugar. La mayoría de las iglesias configuran unos cuantos webhooks:

- Un canal **#donations** que solo escucha `donation.created`
- Un canal **#new-people** para `person.created` y `group.member.added`
- Un canal **#admin-alerts** para eventos de bajo volumen como `form.submission.created`

No hay límite de webhooks por iglesia. Cada uno es independiente: eliminar o desactivar uno no afecta a los demás.

## Revisión de entregas {#inspecting-deliveries}

La tabla **Recent Deliveries** del editor de webhooks muestra los últimos 50 intentos. Haga clic en una fila para ver la carga exacta que se envió y la respuesta que llegó. En un conector de Slack, la carga es `{"text":"💝 New donation: $50.00"}`, no el sobre `{event,churchId,...}` sin procesar, porque B1 la transforma antes de enviarla.

Si algo falló (una insignia ámbar `failed` mientras B1 sigue reintentando, o una insignia roja `exhausted` cuando ya se rindió), la columna **Response** muestra el estado HTTP, y el cuadro de diálogo de la fila muestra el cuerpo de la respuesta, para que vea exactamente qué no le gustó a Slack o Discord; por lo general, es un error de copia y pegado en la URL. Haga clic en **Redeliver** para enviar de nuevo esa entrega.

## Solución de problemas {#troubleshooting}

- **No aparece ningún mensaje y el estado de entrega es `400`**: normalmente el Connector Type está en **Standard** pero la URL es de Slack/Discord. Slack/Discord rechazan el sobre sin procesar. Cambie el menú a **Slack** o **Discord** y vuelva a enviar la prueba.
- **Webhook desactivado automáticamente**: B1 reintenta cada entrega fallida durante unos cinco días. Si tres entregas seguidas agotan sus reintentos, B1 apaga el webhook (su estado aparece como **Disabled**). Corrija la URL (o rótela en Slack/Discord), vuelva a activar **Active** y guarde.
- **El mensaje llegó pero le falta detalle**: cada plataforma de chat limita el tamaño de los mensajes. Los mensajes de B1 son de una sola línea por diseño; para notificaciones más completas, use [Zapier](./zapier.md) o [Make](./make.md) para redactar un mensaje de Slack más completo con sus acciones de Slack.

## Cambiar el Connector Type más adelante {#switching-connector-types-later}

Puede cambiar el Connector Type de un webhook existente; el cambio surte efecto en la siguiente entrega. Si pasa de Slack a Standard, apunte la URL a su propio endpoint HTTPS, y el mismo secreto de firma (que se generó al crear el webhook) empezará a poder verificarse como sobre sin procesar.

## Vea también {#see-also}

- [Zapier](./zapier.md): para flujos de trabajo de varios pasos activados por eventos de B1
- [Make](./make.md): generador visual de escenarios
- [Webhooks (referencia para desarrolladores)](/docs/developer/api/webhooks): el formato completo de carga y firma si alguna vez apunta un webhook a su propio servidor
