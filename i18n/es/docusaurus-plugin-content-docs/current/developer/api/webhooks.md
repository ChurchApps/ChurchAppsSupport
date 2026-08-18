---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Los webhooks permiten que una iglesia envíe notificaciones en tiempo real a herramientas de terceros — plataformas de automatización (Zapier, Make, n8n), CRMs, sistemas de contabilidad, o cualquier cosa que acepte un POST HTTP. Cuando una persona, grupo o hogar cambia en B1, B1 envía un payload JSON firmado a cada URL suscrita a ese evento.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Un administrador de iglesia con permiso de **Editar Configuración de Iglesia** registra y gestiona webhooks
- Tu endpoint receptor debe ser accesible sobre **HTTPS** en una dirección pública
- Ten una forma de almacenar la clave de firma de forma segura — se muestra solo una vez

</div>

## Descripción General

Los webhooks son **solo salida**: B1 llama a tu endpoint, no llamas a B1. Cada webhook es una suscripción por iglesia que consiste en una URL de destino, una clave de firma y una lista de eventos suscritos.

La entrega usa una **bandeja de salida duradera**: cuando ocurre un evento suscrito, B1 registra una fila de entrega y un trabajador de fondo la POSTs dentro de aproximadamente un minuto. Los envíos fallidos se reintentarán con retroceso exponencial. Nada se pierde si un envío es lento o tu endpoint está brevemente caído.

## Registrando un Webhook

### En B1Admin

Ve a **Configuración → Desarrollador → Webhooks → Nuevo Webhook**. Ingresa un nombre, la URL de carga de datos y selecciona los eventos a suscribirse. Al guardar, la **clave de firma se muestra una vez** — cópiala inmediatamente y almacénala con tu integración. Nunca se vuelve a mostrar (puedes rotar posteriormente, pero no puedes recuperar el original).

### Vía la API

Todos los endpoints están bajo la ruta base del módulo de Membresía `/membership/webhooks` y requieren un JWT de un administrador de iglesia con el permiso `Settings / Edit`, **o una [clave API](./api-keys) acuñada con el alcance `settings:write`**. Las mismas rutas aceptan ambas. Esto es lo que permite que Zapier y Make registren webhooks en nombre de la iglesia cuando un Zap o escenario se activa.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — nuevos miembros",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

La respuesta de creación — y **solo** la respuesta de creación — incluye el `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — nuevos miembros",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Método y Ruta | Propósito |
|---|---|
| `GET /membership/webhooks` | Lista los webhooks de la iglesia (clave omitida) |
| `GET /membership/webhooks/events` | El catálogo de nombres de eventos válidos |
| `GET /membership/webhooks/:id` | Carga un webhook |
| `POST /membership/webhooks` | Crear (sin `id`) o actualizar (con `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Rota la clave de firma; devuelve el nuevo valor una vez |
| `DELETE /membership/webhooks/:id` | Elimina un webhook |
| `GET /membership/webhooks/:id/deliveries` | Intentos de entrega recientes para un webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Payload completo y respuesta para una entrega |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Re-cola una entrega |

## Catálogo de Eventos

Los nombres de eventos siguen el patrón `{entity}.{action}`. Obtén la lista en vivo de `GET /membership/webhooks/events`.

| Evento | Se activa cuando |
|---|---|
| `person.created` | Se añade una persona |
| `person.updated` | Se cambia un registro de persona |
| `person.destroyed` | Se elimina una persona |
| `household.created` | Se añade un hogar |
| `household.updated` | Se cambia un hogar |
| `household.destroyed` | Se elimina un hogar |
| `group.created` | Se añade un grupo |
| `group.updated` | Se cambia un grupo |
| `group.destroyed` | Se elimina un grupo |
| `group.member.added` | Se añade una persona a un grupo |
| `group.member.removed` | Se quita una persona de un grupo |
| `donation.created` | Se registra un regalo — entrada manual, en línea, o la transición pendiente → completo |
| `donation.updated` | Se edita un registro de donación |
| `attendance.recorded` | Se registra una visita (entrada manual o check-in) |
| `session.created` | Se crea una nueva sesión de asistencia (manualmente o auto en el primer check-in) |
| `form.submission.created` | Se envía un formulario |
| `event.created` | Se añade un evento de calendario |
| `event.updated` | Se edita un evento de calendario |
| `event.destroyed` | Se elimina un evento de calendario |

## Formato de Carga de Datos

Cada entrega es un HTTP `POST` con un cuerpo JSON y estos encabezados:

| Encabezado | Descripción |
|---|---|
| `Content-Type` | Siempre `application/json` |
| `X-B1-Event` | El nombre del evento, por ejemplo `person.created` |
| `X-B1-Delivery-Id` | Id única para este intento de entrega — úsalo para deduplicar |
| `X-B1-Signature` | Firma HMAC-SHA256 del cuerpo bruto (ver abajo) |
| `X-B1-Timestamp` | Segundos de época Unix cuando se envió la solicitud |
| `User-Agent` | `B1-Webhooks/1.0` |

El cuerpo envuelve el recurso cambiado en una pequeña envoltura:

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

Para eventos `*.destroyed`, `data` contiene solo el `id` y `churchId` del registro eliminado.

Los eventos cuyos payloads referencian otros registros por id también llevan nombres legibles por humanos, resueltos en tiempo de entrega: `personName` y `groupName` en los eventos de membresía de grupo, `personName` en asistencia, donación y eventos de membresía de lista, `groupName` en `session.created`, y `formName` (más `personName` cuando el envío está vinculado a una persona) en `form.submission.created`.

## Tipos de Conector

El formato de entrega por defecto es la envoltura JSON anterior — `connectorType: "standard"`. Para [Slack y Discord](/docs/b1-admin/integrations/slack-discord) el mismo motor de webhook en su lugar publica un mensaje en forma de chat que esos servicios aceptan directamente:

| `connectorType` | Cuerpo enviado | Úsalo cuando |
|---|---|---|
| `"standard"` (por defecto) | Envoltura `{event, churchId, occurredAt, data}`, firmada | Estás escribiendo tu propia integración, o apuntando a Zapier / Make / un servidor personalizado |
| `"slack"` | `{ "text": "💝 Nueva donación: $50.00" }` | Estás publicando directamente a una URL de Webhook Entrante de Slack |
| `"discord"` | `{ "content": "💝 Nueva donación: $50.00" }` | Estás publicando directamente a un webhook de canal de Discord |
| `"mailchimp"` | n/a — el conector llama a la API de Mailchimp en sí | Quieres [sincronización de audiencia](/docs/b1-admin/integrations/services/mailchimp) sin URL para hospedar |

El tipo de conector se establece en el desplegable **Tipo de Conector** en el editor de webhook, o vía `connectorType` en el cuerpo `POST /membership/webhooks`. El encabezado `X-B1-Signature` firmado aún se envía para entregas de Slack/Discord (lo ignoran sin problemas), así que cambiar un webhook nuevamente a `standard` posteriormente no requiere re-firmar.

Slack y Discord son solo cambios de cuerpo — el motor aún POSTs a la URL suministrada por la iglesia. `mailchimp` es el primer conector que en su lugar posee su intercambio HTTP: por evento emite solicitudes autenticadas de upsert/archive/tag contra la API de Mailchimp (`MailchimpConnector.deliver`), y sus credenciales (`{apiKey, audienceId}`) se almacenan AES-encriptadas en `webhooks.connectorConfig`, solo escritura a través de la API. Los webhooks de Mailchimp aceptan solo personas, miembros de grupo y eventos de miembros de lista; la ruta de guardia verifica la clave y audiencia contra Mailchimp antes de aceptar. Las filas de entrega almacenan la envoltura estándar, así que el registro de entrega muestra lo que B1 vio junto a la respuesta de Mailchimp. Las situaciones no asignadas (persona sin correo electrónico, evento sin asignación) se completan como exitosas con un cuerpo de respuesta `Skipped:` en lugar de quemar reintentos.

## Entregas de Prueba

Cada editor de webhook tiene un botón **Enviar Evento de Prueba** — la llamada de API correspondiente es `POST /membership/webhooks/:id/test`. La ruta de prueba construye un payload sintético para el primer evento suscrito, lo despacha sincronously a través de la ruta de entrega firmada real (y a través de `formatForConnector` para Slack/Discord), y devuelve la fila de entrega resultante incluyendo `responseStatus` y `responseBody`. Úsalo para confirmar conectividad y manejo de firma antes de encender la integración para real. Para webhooks `mailchimp` la prueba en su lugar verifica las credenciales almacenadas contra la API de Mailchimp (un evento sintético escribiría un suscriptor falso en la audiencia real de la iglesia) y devuelve un resultado en forma de entrega sin crear una fila.

## Verificando Firmas

Siempre verifica `X-B1-Signature` antes de confiar en un payload. La firma es `sha256=` seguida por el HMAC-SHA256 hexadecimal del **cuerpo bruto de la solicitud** clavado con tu clave de firma. Compútalo sobre los bytes que recibiste — no re-serialices el JSON analizado.

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

Rechaza cualquier solicitud cuya firma no coincida. Opcionalmente también rechaza solicitudes cuyo `X-B1-Timestamp` tenga más de unos pocos minutos de antigüedad para limitar ventanas de reproducción.

## Soporte de SDK

Para Node.js, `@churchapps/integration-sdk` proporciona un verificador tipado y middleware de Express que maneja la captura de cuerpo bruto, verificación de firma y análisis de envoltura para ti:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Captura el cuerpo bruto antes de análisis JSON — requerido para que la firma aún verifique.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("nuevo regalo", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

El SDK también expone `WebhookVerifier.verify(secret, rawBody, signatureHeader)` para tiempos de ejecución no-Express (funciones sin servidor, Fastify, etc.). Ver el paquete en npm.

## Entrega y Reintentos

Tu endpoint debe responder con un estado `2xx` tan rápido como sea posible — idealmente después de solo poner el trabajo en cola, no después de procesarlo. Cualquier respuesta non-`2xx`, una falla de conexión, o una respuesta más lenta que **10 segundos** cuenta como una entrega fallida.

Los envíos fallidos se reintentarán con retroceso exponencial — **16 intentos en aproximadamente 5 días**. El intervalo crece de 1 minuto, a través de horas, hasta espacios de 3 días para los intentos finales. Después del intento fallido número 16 la entrega se marca `exhausted` y se abandona.

La entrega es **al menos una vez**: una entrega puede llegar más de una vez (por ejemplo, si tu endpoint tiene éxito pero la respuesta se pierde). Usa el encabezado `X-B1-Delivery-Id` para deduplicar — procesa cada id solo una vez y trata repeats como no-ops.

### Auto-deshabilitar

Si un webhook produce **tres entregas exhaustas consecutivas**, B1 lo desactiva automáticamente. Arregla tu endpoint, luego reactiva el webhook en B1Admin (o vía `POST /membership/webhooks` con `"active": true`).

## Inspeccionando y Re-entregando

El editor de webhook en B1Admin muestra una tabla **Entregas Recientes** — evento, estado, conteo de intentos, código de respuesta y marca de tiempo. Seleccionar una fila revela el payload completo que fue enviado y la respuesta que regresó.

Usa **Re-entregar** para re-cola cualquier entrega pasada con su payload original — útil después de arreglar un bug en tu endpoint, o para rellenar eventos que tu endpoint perdió mientras estaba caído.

## Requisitos de URL

Porque las URLs de webhook son suministradas por la iglesia, B1 refuerza guardias contra falsificación de solicitudes del lado del servidor. Una URL de webhook es rechazada — en registro y re-verificada antes de cada entrega — si:

- no usa **`https`**
- apunta a `localhost`, un nombre de host `.local` / `.internal`, o
- se resuelve a una dirección IP **privada, loopback, link-local, o de metadatos de nube**

Tu endpoint debe ser un servicio HTTPS públicamente alcanzable.
