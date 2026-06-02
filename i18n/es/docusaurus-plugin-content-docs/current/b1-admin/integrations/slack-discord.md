---
title: "Slack y Discord"
---

# Slack y Discord

<div class="article-intro">

Publica notificaciones legibles de B1 directamente a un canal de Slack o Discord — personas nuevas, donaciones, registros de grupo, envíos de formulario, eventos de calendario, y más. Sin cuenta de terceros, sin Zap que mantener: B1 reformatea eventos en mensajes de chat y los POST a la URL del webhook del canal en sí.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas el permiso **Editar Configuración** en B1Admin
- Un administrador en tu espacio de trabajo de Slack o servidor de Discord para crear el webhook entrante del canal
- Decide qué canal deseas notificaciones (puedes usar el mismo canal para varios tipos de eventos, o dividirlos entre canales)

</div>

## Cómo Funciona

B1 tiene un **tipo de conector** integrado para plataformas de chat. Cuando creas un webhook con tipo **Slack** o **Discord**, el motor de webhook aún hace su entrega habitual + reintentos + baile de encabezado firmado, pero el cuerpo que envía se reformatea desde la envolvente normal de B1 `{event,churchId,data}` en el pequeño `{text}` (Slack) o `{content}` (Discord) que esos servicios esperan.

Ningún servidor de B1 se comunica con Slack en base por iglesia además del flujo de webhook saliente existente — no hay nada nuevo que alojar, nada extra que pagar.

## Slack — Paso a Paso

### 1. Obtener una URL de Slack Incoming Webhook

1. Abre [api.slack.com/apps](https://api.slack.com/apps) en el espacio de trabajo de Slack donde deseas notificaciones.
2. Haz clic en **Crear nueva aplicación → Desde cero**, nómbrala algo como "Notificaciones de B1", y elige el espacio de trabajo.
3. En la navegación izquierda elige **Webhooks entrantes** y alterna **Activar webhooks entrantes** a *Activado*.
4. Haz clic en **Agregar nuevo webhook al espacio de trabajo**, elige el canal (p. ej. `#donations`), luego **Permitir**.
5. Slack te devuelve a la página con una nueva **URL de webhook** que se ve como `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Cópiala — esa es la única pieza de información que B1 necesita.

:::caution
Trata la URL de webhook de Slack como un secreto. Cualquiera con ella puede publicar mensajes arbitrarios al canal. Si accidentalmente la expones, regenera desde la página de la aplicación de Slack (regenerar solo rota la URL; actualiza B1 para coincidir).
:::

### 2. Conectar en B1Admin

1. En B1Admin ve a **Configuración → Desarrollador → Webhooks**.
2. Haz clic en **Nuevo webhook**.
3. Rellena:
   - **Nombre** — algo legible como "Donaciones → #donations". Solo tu equipo lo ve.
   - **Tipo de conector** — elige **Slack**.
   - **URL de carga** — pega la URL de Slack del paso 1.
   - **Eventos** — marca los eventos que deseas como mensajes. Para un canal de donaciones, solo `donation.created`. Para un canal #people, prueba `person.created` y `group.member.added`.
4. Haz clic en **Guardar**. Un diálogo "Secreto de firma" aparece — puedes ignorarlo para Slack (Slack no verifica firmas de B1) y cerrarlo.

### 3. Probarlo

Reabre el webhook de la lista y haz clic en **Enviar evento de prueba**. Dentro de uno o dos segundos un mensaje como

> 💝 Nueva donación: $50.00

aparece en tu canal de Slack, y una nueva fila muestra en la tabla **Entregas recientes** en la misma pantalla con estado `succeeded`. Listo.

## Discord — Paso a Paso

### 1. Obtener una URL de Webhook de Discord

1. En tu servidor de Discord, pasa el ratón sobre el canal en el que deseas notificaciones y haz clic en el **⚙ engranaje** (Editar canal).
2. Abre **Integraciones → Webhooks → Nuevo webhook**.
3. Dale un nombre y (opcionalmente) un avatar, luego haz clic en **Copiar URL de webhook** — se ve como `https://discord.com/api/webhooks/123…/abc…`.

### 2. Conectar en B1Admin

Idéntico al flujo de Slack anterior, excepto establece **Tipo de conector** a **Discord**. Pega la URL de Discord en **URL de carga** y guarda.

:::tip
**No necesitas** agregar `/slack` al final de la URL de Discord — B1 envía cargas `{content}` nativas de Discord, no compatibles con Slack. Solo pega la URL que Discord te dio.
:::

### 3. Probarlo

El mismo botón **Enviar evento de prueba** — Discord muestra el mensaje en el canal elegido y el registro de entrega cambia a `succeeded`.

## Qué Se Ven Los Mensajes

| Evento | Ejemplo de mensaje |
|---|---|
| `person.created` | 👤 Nueva persona agregada: Jordan Rivera |
| `person.updated` | 👤 Persona actualizada: Jordan Rivera |
| `group.created` | 👥 Nuevo grupo creado: Estudio bíblico del martes |
| `group.member.added` | ➕ Alguien fue agregado a un grupo |
| `donation.created` | 💝 Nueva donación: $50.00 |
| `donation.updated` | 💝 Donación actualizada: $75.00 |
| `attendance.recorded` | ✅ Asistencia registrada |
| `form.submission.created` | 📝 Nuevo envío de formulario recibido |
| `event.created` | 📅 Nuevo evento: Servicio de Pascua |

La lista completa vive en el [catálogo de eventos de webhook](/docs/developer/api/webhooks#event-catalog) — cualquier evento allí puede ser enrutado a Slack/Discord.

## Un Canal Por Tema

No tienes que poner cada evento en un lugar. La mayoría de iglesias configuran un puñado de webhooks:

- Un canal **#donations** que solo escucha `donation.created`
- Un canal **#new-people** para `person.created` y `group.member.added`
- Un canal **#admin-alerts** para cosas de bajo volumen como `form.submission.created`

No hay límite en la cantidad de webhooks por iglesia. Cada uno es independiente — eliminar o desactivar uno no afecta los otros.

## Inspeccionar entregas

La tabla **Entregas recientes** del editor de webhook muestra los últimos 50 intentos. Haz clic en una fila para ver la carga exacta que fue enviada y la respuesta que vino. Para un conector de Slack la carga es `{"text":"💝 Nueva donación: $50.00"}` — no la envolvente cruda `{event,churchId,...}` — porque B1 la reformatea antes de la entrega.

Si algo falló (insignia roja `failed` o `exhausted`), el diálogo muestra el estado HTTP y cuerpo de respuesta para que veas exactamente qué no les gustó a Slack o Discord — generalmente un error de copiar-pegar en la URL.

## Solución de Problemas

- **Ningún mensaje aparece + estado de entrega `400`** — generalmente el tipo de conector está establecido en **Estándar** pero la URL es una de Slack/Discord. Slack/Discord rechazan la envolvente cruda. Cambia la lista desplegable a **Slack** o **Discord** y reenvía la prueba.
- **Webhook desactivado automáticamente** — después de 3 entregas fallidas consecutivas B1 apaga el webhook. Arregla la URL (o rótala en Slack/Discord) y alterna **Activo** de vuelta.
- **El mensaje llegó pero falta detalle** — cada plataforma de chat limita el tamaño del mensaje. Los mensajes de B1 son de una línea por diseño; para notificaciones más ricas usa [Zapier](./zapier) o [Make](./make) para componer un mensaje de Slack más completo a través de sus acciones de Slack.

## Cambiar tipos de conector más tarde

Puedes cambiar el tipo de conector en un webhook existente — entra en vigor en la siguiente entrega. Si cambias de Slack a Estándar, apunta la URL a tu propio punto final HTTPS y el mismo secreto de firma (fue emitido cuando se creó el webhook) comienza a ser verificable como la envolvente cruda.

## Ver También

- [Zapier](./zapier) — para flujos de trabajo de múltiples pasos disparados por eventos de B1
- [Make](./make) — constructor de escenarios visuales
- [Webhooks (referencia de desarrollador)](/docs/developer/api/webhooks) — el formato completo de carga + firma si alguna vez apuntas un webhook a tu propio servidor
