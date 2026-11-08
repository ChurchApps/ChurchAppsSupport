---
title: "Endpoints de mensajería"
description: "Referencia de los endpoints de la API de mensajería de ChurchApps: conversaciones, reglas de acceso a notas, mensajes de texto, plantillas de correo electrónico, notificaciones y dispositivos."
---

# Endpoints de mensajería

<div class="article-intro">

El módulo de Mensajería gestiona las conversaciones en tiempo real, los mensajes de chat, las notificaciones push, la entrega de SMS y correos electrónicos, las conexiones WebSocket, los mensajes privados, el registro de dispositivos y los proveedores de mensajes de texto. Proporciona la capa de comunicación que utilizan todas las aplicaciones de ChurchApps, tanto para el chat de transmisiones en vivo como para las notificaciones asíncronas.

</div>

**Ruta base:** `/messaging`

## Conversaciones

Ruta base: `/messaging/conversations`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carga conversaciones por IDs separados por comas, con los primeros y últimos mensajes |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carga las conversaciones de un contenido con mensajes paginados (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obtiene las conversaciones de tipo publicación de los grupos del usuario actual |
| GET | `/posts/group/:groupId` | JWT | — | Obtiene las conversaciones de tipo publicación de un grupo específico |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Las notas más recientes de todos los registros, para la página de Notas de B1 Admin. `section` puede ser `people`, `groups`, `events` o `workflows` (de lo contrario, 400); `limit` tiene como valor predeterminado 25 (máximo 100); `before` es el cursor de la página anterior. Cada nota sigue cumpliendo la regla de su propio tipo (permiso de Personas / Editar o de notas confidenciales, líderes del grupo, visores del evento, visores de la tarjeta de flujo de trabajo), de modo que quienes llaman solo ven las notas que podrían abrir. El texto de la nota se corta a 300 caracteres |
| GET | `/current/:churchId/:contentType/:contentId` | Público | — | Obtiene o crea la conversación actual del contenido (descifra automáticamente contentId) |
| GET | `/:churchId/:contentType/:contentId` | Público | — | Carga conversaciones por tipo de contenido e ID |
| GET | `/:churchId/:id` | Público | — | Carga una conversación por su ID |
| POST | `/` | JWT | — | Crea o actualiza conversaciones (por lotes) |
| POST | `/start` | JWT | — | Inicia una nueva conversación con un comentario inicial |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una conversación |

### Control de acceso a notas de personas

Las conversaciones con `contentType: "person"` (la pestaña Notas de un registro de persona) o `contentType: "personConfidential"` (la sección Notas confidenciales) están restringidas en todas las rutas de lectura y escritura, incluidas las rutas públicas anteriores, que devuelven `401` para estos tipos de contenido. `person` requiere el permiso **Personas / Editar** de MembershipApi; `personConfidential` requiere **Personas / Ver notas confidenciales**. Para las claves de API con alcance limitado, `people:write` incluye ambas acciones (el usuario de la clave debe seguir teniendo el permiso del rol subyacente).

### Control de acceso a notas de grupos y eventos {#group-and-event-notes-access-control}

Otros dos tipos de contenido de notas están restringidos de la misma forma, en todas las rutas de lectura y escritura (incluidas las rutas públicas anteriores), y nunca se permite la publicación anónima:

- **`groupNote`** (`contentId` = ID del grupo): el feed de **Notas de líderes** de un grupo. Solo los líderes de ese grupo (`leaderGroupIds` en el JWT) pueden leer o publicar. Ningún permiso de personal otorga acceso, incluidos `content.edit` y los permisos de pertenencia a grupos.
- **`eventNote`** (`contentId` = ID del evento): las notas de un evento del calendario. El personal con `content.edit` o **Calendarios / Administrador** siempre puede leer y publicar. En los demás casos, el acceso depende de `notesViewRole` (lectura) y `notesPostRole` (publicación) del evento: `staff` (el valor predeterminado, que se usa cuando el campo es `null`) no permite el acceso a nadie más; `leaders` permite el acceso a los líderes del grupo del evento; y `members` permite el acceso a los miembros y líderes del grupo del evento. Un evento sin `groupId` es exclusivo del personal.

### Control de acceso a notas de tarjetas de flujo de trabajo

Las conversaciones con `contentType: "workflowCard"` (las notas de una tarjeta de flujo de trabajo, donde `contentId` es el ID de la tarea de la tarjeta) solo pueden ser leídas y escritas por quien pueda abrir esa tarjeta: un usuario con el permiso de DoingApi **Tareas / Ver**, o la persona o el grupo al que la tarjeta esté asignada, que la haya creado o a la que se refiera. Cualquier otra persona recibe `401` en todas las rutas de lectura, incluidas las rutas públicas anteriores. La conversación de una tarjeta se asocia a través de la propia tarjeta con `POST /doing/tasks/:id/conversation` (cuerpo `{ "conversationId": "..." }`; gana la primera conversación asociada), que pueden llamar los editores de la tarjeta y su responsable.

### Ejemplo: iniciar una conversación

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Mensajes

Ruta base: `/messaging/messages`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Carga todos los mensajes de una conversación |
| GET | `/catchup/:churchId/:conversationId` | Público | — | Carga todos los mensajes de una conversación (recuperación pública para el chat en vivo) |
| GET | `/:churchId/:id` | Público | — | Carga un mensaje por su ID |
| POST | `/` | JWT | — | Guarda mensajes (por lotes). Envía actualizaciones en tiempo real y activa notificaciones. Para actualizar un mensaje existente, hay que ser su autor o tener `content.edit`; el autor guardado nunca puede reasignarse |
| POST | `/send` | Público | — | Envía mensajes (por lotes, público). Envía actualizaciones en tiempo real por WebSocket y activa notificaciones |
| POST | `/setCallout` | JWT | — | (heredado) Difunde un mensaje destacado en tiempo real. No hay ningún cliente activo; el chat de transmisiones en vivo ya no muestra los mensajes destacados |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un mensaje y difunde la eliminación en tiempo real. Consulte [Moderación de mensajes](#message-moderation) |

### Moderación de mensajes

Se puede eliminar un mensaje en los siguientes casos:

- quien es el autor del mensaje;
- el personal con `content.edit` (en cualquier parte de la iglesia);
- **líderes de grupo**, en conversaciones con `contentType` de `group` o `groupAnnouncement` cuyo `contentId` sea un grupo que dirigen (`leaderGroupIds` en el JWT).

Las conversaciones de notas de personas (`person` / `personConfidential`) nunca son moderadas por líderes; en su lugar, usan los permisos de notas (`people.edit`, `people.viewConfidentialNotes`).

Los líderes solo pueden eliminar, no editar: reescribir el mensaje de otro miembro sigue restringido al autor y al personal con `content.edit`.

### Ejemplo: enviar un mensaje

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Mensajes privados

Ruta base: `/messaging/privatemessages`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carga todos los mensajes privados del usuario actual (incluye el último mensaje de cada conversación y marca todos como leídos) |
| GET | `/existing/:personId` | JWT | — | Busca una conversación privada existente con una persona específica |
| GET | `/:id` | JWT | — | Carga un mensaje privado por su ID (borra la notificación si está dirigido al usuario actual) |
| POST | `/` | JWT | — | Envía mensajes privados (por lotes). Activa una notificación push para el destinatario |

## Notificaciones

Ruta base: `/messaging/notifications`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Obtiene el número de notificaciones no leídas del usuario actual |
| GET | `/my` | JWT | — | Carga todas las notificaciones del usuario actual (marca todas como leídas) |
| GET | `/tmpEmail` | Público | — | Activa el resumen diario de notificaciones por correo electrónico (endpoint de depuración o de cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carga las notificaciones de una persona específica |
| GET | `/:churchId/:id` | JWT | — | Carga una notificación por su ID |
| POST | `/` | JWT | — | Crea o actualiza notificaciones (por lotes) |
| POST | `/create` | JWT | — | Crea notificaciones para varias personas. Cuerpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marca todas las notificaciones de una persona como leídas |
| POST | `/sendTest` | JWT | — | Envía una notificación push de prueba. Cuerpo: `{ personId, title }` |
| POST | `/ping` | Público | — | Crea una notificación a partir de un disparador externo. Cuerpo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una notificación |

### Ejemplo: crear notificaciones

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Preferencias de notificación

Ruta base: `/messaging/notificationpreferences`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Lista las categorías de notificación con sus canales predeterminados y permitidos |
| GET | `/my` | JWT | — | Carga las preferencias de notificación del usuario actual (crea los valores predeterminados automáticamente si no existen) |
| POST | `/` | JWT | — | Guarda las preferencias del usuario actual. Cuerpo: cualquiera de `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, más `overrides: [{ categoryKey, channel, optedIn }]` opcional (channel puede ser `push`, `email`, `in_app` o `sms`; las categorías bloqueadas se ignoran). `allowSms` es la aceptación del miembro para recibir recordatorios por mensaje de texto. Todavía se acepta el cuerpo heredado en forma de array de filas |

## Conexiones

Ruta base: `/messaging/connections`

Gestiona las conexiones WebSocket y en tiempo real para el chat, las conversaciones de grupos, los mensajes privados y las transmisiones en vivo. Consulte [Arquitectura en tiempo real](../../realtime.md) para ver el protocolo completo.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Público | — | Carga todas las conexiones de una conversación |
| POST | `/` | Público | — | Registra conexiones (por lotes). Activa una difusión de asistencia en la conversación. Elementos del cuerpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Público | — | Actualiza el nombre visible de una conexión mediante su ID de socket. Cuerpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Público | — | Elimina una conexión de una conversación. Activa una difusión de asistencia |
| POST | `/tmpSendAlert` | Público | — | Envía una alerta de notificación a las conexiones de una persona. Cuerpo: `{ churchId, personId }` |

## Dispositivos

Ruta base: `/messaging/devices`

Gestiona el registro de dispositivos para las notificaciones push y la vinculación de contenido (por ejemplo, la aplicación Lessons en pantallas de TV).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Registra o actualiza un dispositivo (registro push móvil). Coincide por token FCM o por ID de dispositivo |
| POST | `/enrollAnon` | Público | — | Registra un dispositivo anónimo y genera un código de vinculación de 4 caracteres |
| POST | `/` | Público | — | Guarda dispositivos (por lotes) |
| GET | `/pair/:pairingCode` | JWT | — | Vincula un dispositivo con su código de vinculación. `?contentType=&contentId=` es opcional para asignar contenido |
| GET | `/status/:deviceId` | Público | — | Comprueba el estado de vinculación de un dispositivo |
| GET | `/:churchId` | JWT | — | Carga todos los dispositivos de una iglesia |
| GET | `/:churchId/person/:personId` | JWT | — | Carga todos los dispositivos de una persona |
| GET | `/:churchId/:id` | JWT | — | Carga un dispositivo por su ID |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un dispositivo |

### Ejemplo: registrar un dispositivo

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Contenido de dispositivos

Ruta base: `/messaging/devicecontents`

Gestiona las asignaciones de contenido de los dispositivos vinculados (por ejemplo, qué lección se muestra en un televisor).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Carga las asignaciones de contenido de un dispositivo |
| POST | `/` | JWT | — | Guarda las asignaciones de contenido de dispositivos (por lotes) |
| DELETE | `/:id` | JWT | — | Elimina una asignación de contenido de dispositivo |

## Mensajes de texto (SMS)

Ruta base: `/messaging/texting`

Gestiona los proveedores de SMS, el envío de mensajes de texto a grupos y el seguimiento de la entrega.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Carga los proveedores de mensajes de texto de la iglesia (las credenciales aparecen enmascaradas) |
| GET | `/status` | JWT | — | `{ enabled }`: indica si la iglesia tiene un proveedor de mensajes de texto habilitado. Lo puede consultar cualquier usuario que haya iniciado sesión en la iglesia; se usa para mostrar las opciones **Texto** solo cuando se pueden enviar mensajes |
| GET | `/inboundUrl` | JWT | `texting.send` o `settings.edit` | `{ url }`: la URL del webhook de entrada (STOP) de la iglesia, para pegarla en el proveedor |
| POST | `/inbound/:churchId/:token` | Público | — | Webhook de mensajes entrantes del proveedor. `token` es un HMAC del ID de la iglesia. Una respuesta que sea exactamente una palabra de baja (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) marca como `optedOut` a todas las personas coincidentes y desactiva su `allowSms`. Devuelve `{ optedOut: <count> }`; otras respuestas devuelven `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Vista previa de los destinatarios de un mensaje de texto grupal (recuentos de elegibles, dados de baja y sin teléfono) |
| GET | `/sent` | JWT | — | Carga todos los registros de mensajes de texto enviados por la iglesia |
| GET | `/sent/:id/details` | JWT | — | Carga un mensaje de texto enviado con los registros de entrega por destinatario |
| POST | `/providers` | JWT | — | Guarda los proveedores de mensajes de texto (por lotes). Cifra las credenciales de la API |
| POST | `/send` | JWT | — | Envía un SMS a todos los miembros elegibles de un grupo. Cuerpo: `{ groupId, message }`. Los campos de combinación (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) se resuelven para cada destinatario |
| POST | `/sendPerson` | JWT | — | Envía un SMS a una sola persona. Cuerpo: `{ personId, phoneNumber, message }`. Los campos de combinación se resuelven, y el texto resuelto es el que se registra |
| DELETE | `/providers/:id` | JWT | — | Elimina un proveedor de mensajes de texto |

### Ejemplo: enviar un mensaje de texto a un grupo

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## Plantillas de correo electrónico

Ruta base: `/messaging/emailTemplates`

Gestiona las plantillas de correo electrónico reutilizables y el envío de correos basados en plantillas a grupos.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carga todas las plantillas de correo electrónico de la iglesia |
| GET | `/:id` | JWT | — | Carga una plantilla de correo electrónico por su ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` o `tasks.admin` | El estado del correo electrónico de grupos de la iglesia: `{ approved, paused, remaining, requested }`. El diálogo Enviar correo electrónico de B1Admin y la acción **Enviar correo electrónico** del flujo de trabajo lo usan para advertir cuando el correo no se enviará |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Solicita a soporte la aprobación de la iglesia para el correo de grupos (como máximo una vez por iglesia a la semana) |
| GET | `/preview/:groupId` | JWT | — | Vista previa de la entrega de correo electrónico a un grupo (recuento de destinatarios elegibles, miembros sin correo electrónico) |
| POST | `/` | JWT | — | Crea o actualiza plantillas de correo electrónico (por lotes) |
| POST | `/send` | JWT | — | Envía un correo basado en plantilla a todos los miembros de un grupo. Cuerpo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Elimina una plantilla de correo electrónico |

### Ejemplo: enviar un correo electrónico a un grupo

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**Campos de combinación compatibles:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IP bloqueadas

Ruta base: `/messaging/blockedips`

(heredado) Bloqueo de IP para el chat de transmisiones en vivo. El cliente de B1App ya no llama a `POST /`; el bloqueo de IP se eliminó con la migración a la entrega unificada. La ruta `/clear` todavía la invoca de servidor a servidor `StreamingServiceController` cuando se guardan los servicios de transmisión.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (heredado) Guarda las IP bloqueadas (por lotes). No hay ningún cliente activo |
| POST | `/clear` | JWT | — | Elimina todas las IP bloqueadas de servicios específicos. Cuerpo: `[{ serviceId, churchId }]` |

## Registros de entrega

Ruta base: `/messaging/deliverylogs`

Registra el estado de entrega de los mensajes enviados (SMS, notificaciones push y correo electrónico).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carga los registros de entrega por tipo de contenido e ID |
| GET | `/person/:personId` | JWT | — | Carga los registros de entrega de una persona. `?startDate=&endDate=` es opcional para filtrar |
| GET | `/recent` | JWT | — | Carga los registros de entrega recientes de la iglesia. `?limit=` es opcional (predeterminado 100) |
| GET | `/:id` | JWT | — | Carga un registro de entrega por su ID |

## Páginas relacionadas

- [Arquitectura en tiempo real](../../realtime.md): protocolo WebSocket, suscripciones a salas y el marco de entrega unificada
- [Notificaciones push web](../../web-push.md): registro y entrega de notificaciones push en el navegador
- [Endpoints de membresía](./membership.md): personas, grupos, roles e identidad básica
- [Endpoints de asistencia](./attendance.md): seguimiento de servicios y visitas
- [Autenticación y permisos](./authentication.md): flujo de inicio de sesión, JWT, OAuth y modelo de permisos
- [Estructura del módulo](../module-structure.md): patrones de organización del código
