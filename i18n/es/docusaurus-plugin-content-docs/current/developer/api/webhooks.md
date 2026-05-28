---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Los webhooks permiten a una iglesia enviar notificaciones en tiempo real a herramientas de terceros: plataformas de automatización (Zapier, Make, n8n), CRM, sistemas de contabilidad o cualquier cosa que acepte un HTTP POST. Cuando una persona, grupo u hogar cambia en B1, B1 envía una carga útil JSON firmada a cada URL suscrita a ese evento.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Un administrador de iglesia con el permiso **Editar configuración de iglesia** registra y administra webhooks
- Su punto final receptor debe ser accesible a través de **HTTPS** en una dirección pública
- Tenga una forma de almacenar el secreto de firma de forma segura; se muestra solo una vez

</div>

## Descripción general

Los webhooks son **solo de salida**: B1 llama a su punto final, usted no llama a B1. Cada webhook es una suscripción por iglesia que consta de una URL de destino, un secreto de firma y una lista de eventos suscritos.

La entrega utiliza una **bandeja de salida duradera**: cuando ocurre un evento suscrito, B1 registra una fila de entrega y un trabajador en segundo plano le hace POST en aproximadamente un minuto. Las entregas fallidas se reintentan con retroceso exponencial. Nada se pierde si una entrega es lenta o su punto final está temporalmente caído.

## Registrar un webhook

### En B1Admin

Vaya a **Configuración → Webhooks → Nuevo webhook**. Ingrese un nombre, la URL de la carga útil y seleccione los eventos a los que desea suscribirse. Al guardar, **el secreto de firma se muestra una vez**; cópielo inmediatamente y guárdelo con su integración. Nunca se vuelve a mostrar (puede rotarlo más tarde, pero no puede recuperar el original).

### A través de la API

Todos los puntos finales están bajo la ruta base del módulo de membresía `/membership/webhooks` y requieren un JWT de un administrador de iglesia con el permiso `Settings / Edit`.

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

La respuesta de creación, y **solo** la respuesta de creación, incluye el `secret`:

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

| Método y ruta | Propósito |
|---|---|
| `GET /membership/webhooks` | Listar los webhooks de la iglesia (secreto omitido) |
| `GET /membership/webhooks/events` | El catálogo de nombres de eventos válidos |
| `GET /membership/webhooks/:id` | Cargar un webhook |
| `POST /membership/webhooks` | Crear (sin `id`) o actualizar (con `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Rotar el secreto de firma; devuelve el nuevo valor una vez |
| `DELETE /membership/webhooks/:id` | Eliminar un webhook |
| `GET /membership/webhooks/:id/deliveries` | Intentos de entrega recientes para un webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Carga útil completa y respuesta para una entrega |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Volver a encolar una entrega |

## Catálogo de eventos

Los nombres de eventos siguen el patrón `{entidad}.{acción}`. Obtenga la lista en vivo desde `GET /membership/webhooks/events`.

| Evento | Se activa cuando |
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
| `group.member.removed` | Se elimina una persona de un grupo |

## Formato de carga útil

Cada entrega es un `POST` HTTP con un cuerpo JSON y estos encabezados:

| Encabezado | Descripción |
|---|---|
| `Content-Type` | Siempre `application/json` |
| `X-B1-Event` | El nombre del evento, por ejemplo, `person.created` |
| `X-B1-Delivery-Id` | ID único para este intento de entrega; úselo para deduplicar |
| `X-B1-Signature` | Firma HMAC-SHA256 del cuerpo sin procesar (ver abajo) |
| `X-B1-Timestamp` | Segundos de época Unix cuando se envió la solicitud |
| `User-Agent` | `B1-Webhooks/1.0` |

El cuerpo envuelve el recurso cambiado en un pequeño sobre:

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

## Verificar firmas

Siempre verifique `X-B1-Signature` antes de confiar en una carga útil. La firma es `sha256=` seguida del HMAC-SHA256 hexadecimal del **cuerpo de solicitud sin procesar** con clave de su secreto de firma. Calcúlela sobre los bytes que recibió; no vuelva a serializar el JSON analizado.

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

Rechace cualquier solicitud cuya firma no coincida. Opcionalmente, también rechace solicitudes cuyo `X-B1-Timestamp` tenga más de unos minutos de antigüedad para limitar las ventanas de repetición.

## Entrega y reintentos

Su punto final debe responder con un estado `2xx` lo más rápido posible, idealmente después de solo poner en cola el trabajo, no después de procesarlo. Cualquier respuesta que no sea `2xx`, una falla de conexión o una respuesta más lenta de **10 segundos** cuenta como una entrega fallida.

Las entregas fallidas se reintentan con retroceso exponencial: **16 intentos durante aproximadamente 5 días**. El intervalo crece de 1 minuto, pasando por horas, hasta intervalos de 3 días para los intentos finales. Después del 16.º intento fallido, la entrega se marca como `exhausted` y se abandona.

La entrega es **al menos una vez**: una entrega puede llegar más de una vez (por ejemplo, si su punto final tiene éxito pero se pierde la respuesta). Use el encabezado `X-B1-Delivery-Id` para deduplicar; procese cada ID solo una vez y trate las repeticiones como operaciones sin efecto.

### Desactivación automática

Si un webhook produce **tres entregas agotadas consecutivas**, B1 lo desactiva automáticamente. Corrija su punto final, luego vuelva a habilitar el webhook en B1Admin (o a través de `POST /membership/webhooks` con `"active": true`).

## Inspeccionar y reenviar

El editor de webhooks en B1Admin muestra una tabla de **Entregas recientes**: evento, estado, recuento de intentos, código de respuesta y marca de tiempo. Al seleccionar una fila se revela la carga útil completa que se envió y la respuesta que regresó.

Use **Reenviar** para volver a encolar cualquier entrega pasada con su carga útil original; útil después de corregir un error en su punto final o para rellenar eventos que su punto final perdió mientras estuvo caído.

## Requisitos de URL

Debido a que las URL de webhook las proporciona la iglesia, B1 aplica protecciones contra la falsificación de solicitudes del lado del servidor. Una URL de webhook se rechaza, tanto en el registro como antes de cada entrega, si:

- no usa **`https`**
- apunta a `localhost`, un nombre de host `.local` / `.internal`, o
- se resuelve a una dirección IP **privada, de bucle invertido, local de enlace o de metadatos de nube**

Su punto final debe ser un servicio HTTPS accesible públicamente.
