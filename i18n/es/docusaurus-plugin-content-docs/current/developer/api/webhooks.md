---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Los webhooks permiten a una iglesia enviar notificaciones en tiempo real a herramientas de terceros -- plataformas de automatización (Zapier, Make, n8n), CRMs, sistemas contables, o cualquier cosa que acepte un `POST` HTTP. Cuando una persona, grupo, u hogar cambia en B1, B1 envía un payload JSON firmado a cada URL suscrita a ese evento.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Un administrador de la iglesia con el permiso **Edit Church Settings** registra y gestiona webhooks
- Tu punto final receptor debe ser accesible sobre **HTTPS** en una dirección pública
- Ten una forma de almacenar el secreto de firma de manera segura -- se muestra solo una vez

</div>

## Descripción General

Los webhooks son **solo salientes**: B1 llama a tu punto final, tú no llamas a B1. Cada webhook es una suscripción por iglesia que consiste en una URL de destino, un secreto de firma, y una lista de eventos suscritos.

La entrega usa un **buzón duradero**: cuando ocurre un evento suscrito, B1 registra una fila de entrega y un trabajador de fondo hace `POST` dentro de aproximadamente un minuto. Las entregas fallidas se reintentan con retroceso exponencial. Nada se pierde si una entrega es lenta o tu punto final está brevemente inactivo.

## Registrando un Webhook

### En B1Admin

Ve a **Settings → Developer → Webhooks → New Webhook**. Ingresa un nombre, la URL de payload, y selecciona los eventos a los que suscribirse. Al guardar, el **secreto de firma se muestra una sola vez** -- cópialo inmediatamente y almacénalo con tu integración. Nunca se muestra de nuevo (puedes rotarlo más tarde, pero no puedes recuperar el original).

### Vía la API

Todos los puntos finales están bajo la ruta base del módulo Membership `/membership/webhooks` y requieren ya sea un JWT de un administrador de iglesia con el permiso `Settings / Edit`, **o una [clave API](./api-keys) acuñada con el alcance `settings:write`**. Las mismas rutas aceptan ambas. Esto es lo que permite que Zapier y Make registren webhooks en nombre de la iglesia cuando se activa un Zap o escenario.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

La respuesta de creación -- y **solo** la respuesta de creación -- incluye el `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Método y Ruta | Propósito |
|---|---|
| `GET /membership/webhooks` | Enumera los webhooks de la iglesia (secreto omitido) |
| `GET /membership/webhooks/events` | El catálogo de nombres de evento válidos |
| `GET /membership/webhooks/:id` | Cargar un webhook |
| `POST /membership/webhooks` | Crear (sin `id`) o actualizar (con `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Rotar el secreto de firma; devuelve el nuevo valor una vez |
| `DELETE /membership/webhooks/:id` | Eliminar un webhook |
| `GET /membership/webhooks/:id/deliveries` | Intentos de entrega recientes para un webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Payload completo y respuesta para una entrega |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Volver a poner en cola una entrega |

## Catálogo de Eventos

Los nombres de eventos siguen el patrón `{entity}.{action}`. Obtén la lista en vivo desde `GET /membership/webhooks/events`.

| Evento | Se dispara cuando |
|---|---|
| `person.created` | Se agrega una persona |
| `person.updated` | Se cambia un registro de persona |
| `person.destroyed` | Se elimina una persona |
| `household.created` | Se agrega un hogar |
| `household.updated` | Se cambia un hogar |
| `household.destroyed` | Se elimina un hogar |
| `group.created` | Se agrega un grupo |
| `group.updated` | Se cambia un grupo |
| `group.destroyed` | Se elimina un grupo |
| `group.member.added` | Se agrega una persona a un grupo |
| `group.member.removed` | Se quita una persona de un grupo |
| `donation.created` | Se registra una donación -- entrada manual, en línea, o la transición pendiente → completa |
| `donation.updated` | Se edita un registro de donación |
| `attendance.recorded` | Se registra una visita (entrada manual o check-in) |
| `session.created` | Se crea una nueva sesión de asistencia (manualmente o automáticamente en el primer check-in) |
| `form.submission.created` | Se envía un formulario |
| `event.created` | Se agrega un evento de calendario |
| `event.updated` | Se edita un evento de calendario |
| `event.destroyed` | Se elimina un evento de calendario |

## Formato de Payload

Cada entrega es un `POST` HTTP con un cuerpo JSON y estos encabezados:

| Encabezado | Descripción |
|---|---|
| `Content-Type` | Siempre `application/json` |
| `X-B1-Event` | El nombre del evento, p. ej. `person.created` |
| `X-B1-Delivery-Id` | ID único para este intento de entrega -- úsalo para deduplicar |
| `X-B1-Signature` | Firma HMAC-SHA256 del cuerpo crudo (ver abajo) |
| `X-B1-Timestamp` | Segundos de época Unix cuando se envió la solicitud |
| `User-Agent` | `B1-Webhooks/1.0` |

El cuerpo envuelve el recurso modificado en un pequeño sobre:

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

Los eventos cuyos payloads hacen referencia a otros registros por id también llevan nombres legibles por humanos, resueltos en el momento de la entrega: `personName` y `groupName` en los eventos de membresía de grupo, `personName` en eventos de asistencia, donación, y membresía de lista, `groupName` en `session.created`, y `formName` (más `personName` cuando el envío está vinculado a una persona) en `form.submission.created`.

## Tipos de Conector

El formato de entrega predeterminado es el sobre JSON de arriba -- `connectorType: "standard"`. Para [Slack y Discord](/docs/b1-admin/integrations/slack-discord) el mismo motor de webhook en su lugar publica un mensaje con forma de chat que esos servicios aceptan directamente:

| `connectorType` | Cuerpo enviado | Usar cuando |
|---|---|---|
| `"standard"` (predeterminado) | Sobre `{event, churchId, occurredAt, data}`, firmado | Estás escribiendo tu propia integración, o apuntando a Zapier / Make / un servidor personalizado |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Estás publicando directamente a una URL de Slack Incoming Webhook |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Estás publicando directamente a una URL de webhook de canal de Discord |

El tipo de conector se establece en el menú desplegable **Connector Type** en el editor de webhook, o vía `connectorType` en el cuerpo de `POST /membership/webhooks`. El encabezado firmado `X-B1-Signature` todavía se envía para entregas de Slack/Discord (lo ignoran inofensivamente), así que cambiar un webhook de vuelta a `standard` más tarde no requiere volver a firmar.

## Entregas de Prueba

Cada editor de webhook tiene un botón **Send Test Event** -- la llamada de API correspondiente es `POST /membership/webhooks/:id/test`. La ruta de prueba construye un payload sintético para el primer evento suscrito, lo despacha sincrónicamente a través de la ruta de entrega firmada real (y a través de `formatForConnector` para Slack/Discord), y devuelve la fila de entrega resultante incluyendo `responseStatus` y `responseBody`. Úsala para confirmar conectividad y manejo de firma antes de activar la integración de verdad.

## Verificando Firmas

Siempre verifica `X-B1-Signature` antes de confiar en un payload. La firma es `sha256=` seguido del HMAC-SHA256 hexadecimal del **cuerpo de solicitud crudo** con tu secreto de firma como clave. Calcúlalo sobre los bytes que recibiste -- no vuelvas a serializar el JSON analizado.

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

Rechaza cualquier solicitud cuya firma no coincida. Opcionalmente también rechaza solicitudes cuyo `X-B1-Timestamp` tenga más de unos minutos de antigüedad para limitar las ventanas de reproducción.

## Soporte de SDK

Para Node.js, `@churchapps/integration-sdk` incluye un verificador tipado y un middleware de Express que maneja la captura de cuerpo crudo, verificación de firma, y análisis de sobre por ti:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Captura el cuerpo crudo antes del análisis JSON — requerido para que la firma aún se verifique.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

El SDK también expone `WebhookVerifier.verify(secret, rawBody, signatureHeader)` para entornos de ejecución que no son Express (funciones serverless, Fastify, etc.). Consulta el paquete en npm.

## Entrega y Reintentos

Tu punto final debe responder con un estado `2xx` lo más rápido posible -- idealmente después de solo poner el trabajo en cola, no después de procesarlo. Cualquier respuesta que no sea `2xx`, un fallo de conexión, o una respuesta más lenta que **10 segundos** cuenta como una entrega fallida.

Las entregas fallidas se reintentan con retroceso exponencial -- **16 intentos a lo largo de aproximadamente 5 días**. El intervalo crece desde 1 minuto, a través de horas, hasta huecos de 3 días para los intentos finales. Después del intento fallido número 16, la entrega se marca `exhausted` y se abandona.

La entrega es **al menos una vez**: una entrega puede llegar más de una vez (por ejemplo, si tu punto final tiene éxito pero la respuesta se pierde). Usa el encabezado `X-B1-Delivery-Id` para deduplicar -- procesa cada id solo una vez y trata las repeticiones como no-ops.

### Auto-Deshabilitación

Si un webhook produce **tres entregas agotadas consecutivas**, B1 lo deshabilita automáticamente. Arregla tu punto final, luego vuelve a habilitar el webhook en B1Admin (o vía `POST /membership/webhooks` con `"active": true`).

## Inspeccionar y Reentregar

El editor de webhook en B1Admin muestra una tabla de **Recent Deliveries** -- evento, estado, recuento de intentos, código de respuesta, y marca de tiempo. Seleccionar una fila revela el payload completo que se envió y la respuesta que regresó.

Usa **Redeliver** para volver a poner en cola cualquier entrega pasada con su payload original -- útil después de arreglar un error en tu punto final, o para rellenar eventos que tu punto final se perdió mientras estaba inactivo.

## Requisitos de URL

Debido a que las URLs de webhook son suministradas por la iglesia, B1 refuerza protecciones contra falsificación de solicitudes del lado del servidor. Una URL de webhook es rechazada -- al registrarse y re-verificarse antes de cada entrega -- si:

- no usa **`https`**
- apunta a `localhost`, un nombre de host `.local` / `.internal`, o
- se resuelve a una dirección IP **privada, loopback, link-local, o de metadatos en la nube**

Tu punto final debe ser un servicio HTTPS públicamente accesible.
