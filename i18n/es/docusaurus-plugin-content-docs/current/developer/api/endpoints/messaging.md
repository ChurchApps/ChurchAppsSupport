---
title: "Endpoints de mensajería"
description: "Referencia de los endpoints de la API de mensajería de ChurchApps: conversaciones, reglas de acceso a notas, mensajes de texto, plantillas de correo, notificaciones y dispositivos."
---

# Endpoints de mensajería

<div class="article-intro">

El módulo de Mensajería administra las conversaciones en tiempo real, los mensajes de chat, las notificaciones push, la entrega de SMS y correo, las conexiones WebSocket, los mensajes privados, el registro de dispositivos y los proveedores de mensajes de texto. Proporciona la capa de comunicación que usan todas las aplicaciones de ChurchApps, tanto para el chat de transmisiones en vivo como para las notificaciones asíncronas.

</div>

**Ruta base:** `/messaging`

## Conversaciones {#conversations}

Ruta base: `/messaging/conversations`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carga conversaciones por IDs separados por comas, con el primer y último mensaje |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carga las conversaciones de un contenido con mensajes paginados (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obtiene las conversaciones de tipo publicación de los grupos del usuario actual |
| GET | `/posts/group/:groupId` | JWT | — | Obtiene las conversaciones de tipo publicación de un grupo específico |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Notas más recientes de todos los registros para la página de Notas de B1 Admin. `section` es `people`, `groups`, `events` o `workflows` (400 en otro caso); `limit` tiene como valor predeterminado 25 (máximo 100); `before` es el cursor de la página anterior. Cada nota sigue pasando por la regla de su propio tipo (permiso de Personas / Editar o notas confidenciales, líderes del grupo, visores del evento, visores de la tarjeta de flujo de trabajo), así que quien llama solo ve las notas que podría abrir. El texto de la nota se corta a 300 caracteres |
| GET | `/current/:churchId/:contentType/:contentId` | Pública | — | Obtiene o crea la conversación actual del contenido (descifra automáticamente contentId) |
| GET | `/:churchId/:contentType/:contentId` | Pública | — | Carga conversaciones por tipo de contenido e ID |
| GET | `/:churchId/:id` | Pública | — | Carga una sola conversación por ID |
| POST | `/` | JWT | — | Crea o actualiza conversaciones (por lotes) |
| POST | `/start` | JWT | — | Inicia una nueva conversación con un mensaje de comentario inicial |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una conversación |

### Control de acceso a las notas de personas {#person-notes-access-control}

Las conversaciones con `contentType: "person"` (la pestaña Notas de un registro de persona) o `contentType: "personConfidential"` (la sección de Notas confidenciales) están protegidas en cada ruta de lectura y escritura, incluidas las rutas públicas mencionadas arriba, que devuelven `401` para estos tipos de contenido. `person` requiere el permiso **Personas / Editar** de MembershipApi; `personConfidential` requiere **Personas / Ver notas confidenciales**. Para las claves de API con alcance, `people:write` incluye ambas acciones (el usuario de la clave aún debe tener el permiso de rol subyacente).

### Control de acceso a las notas de grupos y eventos {#group-and-event-notes-access-control}

Otros dos tipos de contenido de notas están protegidos de la misma manera, en cada ruta de lectura y escritura (incluidas las rutas públicas de arriba), y nunca están abiertos a publicaciones anónimas:

- **`groupNote`** (`contentId` = ID del grupo) -- el feed de **Notas del líder** de un grupo. Solo los líderes de ese grupo (`leaderGroupIds` en el JWT) pueden leer o publicar. Ningún permiso del personal otorga acceso, incluidos `content.edit` y los permisos de membresía de grupos.
- **`eventNote`** (`contentId` = ID del evento) -- las notas de un evento del calendario. El personal con `content.edit` o **Calendarios / Admin** siempre puede leer y publicar. En los demás casos, el acceso depende de `notesViewRole` (lectura) y `notesPostRole` (publicación) del evento: `staff` (el valor predeterminado, que se usa cuando el campo es `null`) no permite a nadie más, `leaders` permite a los líderes del grupo del evento, y `members` permite a los miembros y líderes del grupo del evento. Un evento sin `groupId` es solo para el personal.

### Control de acceso a las notas de tarjetas de flujo de trabajo {#workflow-card-notes-access-control}

Las conversaciones con `contentType: "workflowCard"` (las notas de una tarjeta de flujo de trabajo, donde `contentId` es el ID de la tarea de la tarjeta) solo pueden leerlas y escribirlas quienes puedan abrir esa tarjeta: un usuario con el permiso **Tareas / Ver** de DoingApi, o la persona o el grupo al que está asignada, que la creó o a quien se refiere la tarjeta. Los demás reciben `401` en cada ruta de lectura, incluidas las rutas públicas de arriba. La conversación de una tarjeta se adjunta a través de la propia tarjeta con `POST /doing/tasks/:id/conversation` (cuerpo `{ "conversationId": "..." }`; gana la primera conversación adjuntada), que pueden llamar los editores de la tarjeta y su responsable.

### Ejemplo: iniciar una conversación {#example-start-a-conversation}

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

## Mensajes {#messages}

Ruta base: `/messaging/messages`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Carga todos los mensajes de una conversación |
| GET | `/catchup/:churchId/:conversationId` | Pública | — | Carga todos los mensajes de una conversación (catch-up público para el chat en vivo) |
| GET | `/:churchId/:id` | Pública | — | Carga un solo mensaje por ID |
| POST | `/` | JWT | — | Guarda mensajes (por lotes). Envía actualizaciones en tiempo real y dispara notificaciones. Actualizar un mensaje existente requiere ser su autor o tener `content.edit`; el autor almacenado nunca puede reasignarse |
| POST | `/send` | Pública | — | Envía mensajes (por lotes, público). Envía actualizaciones en tiempo real por WebSocket y dispara notificaciones |
| POST | `/setCallout` | JWT | — | (heredado) Difunde un mensaje destacado en tiempo real. Sin cliente activo; el chat de transmisiones en vivo ya no muestra destacados |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un mensaje y difunde la eliminación en tiempo real. Consulta [Moderación de mensajes](#message-moderation) |

### Moderación de mensajes {#message-moderation}

Se puede eliminar un mensaje si quien lo solicita es:

- el autor del mensaje;
- personal con `content.edit` (en cualquier parte de la iglesia);
- **líderes de grupo**, para conversaciones con `contentType` de `group` o `groupAnnouncement` cuyo `contentId` sea un grupo que dirigen (`leaderGroupIds` en el JWT).

Las conversaciones de notas de personas (`person` / `personConfidential`) nunca se moderan por líderes; usan en su lugar los permisos de notas (`people.edit`, `people.viewConfidentialNotes`).

Los líderes solo pueden eliminar, no editar: reescribir el mensaje de otro miembro sigue restringido al autor y al personal con `content.edit`.

### Ejemplo: enviar un mensaje {#example-send-a-message}

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

## Mensajes privados {#private-messages}

Ruta base: `/messaging/privatemessages`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carga todos los mensajes privados del usuario actual (incluye el último mensaje por conversación y marca todo como leído) |
| GET | `/existing/:personId` | JWT | — | Busca una conversación privada existente con una persona específica |
| GET | `/:id` | JWT | — | Carga un mensaje privado por ID (borra la notificación si está dirigido al usuario actual) |
| POST | `/` | JWT | — | Envía mensajes privados (por lotes). Dispara una notificación push al destinatario |

## Notificaciones {#notifications}

Ruta base: `/messaging/notifications`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Obtiene el número de notificaciones no leídas del usuario actual |
| GET | `/my` | JWT | — | Carga todas las notificaciones del usuario actual (marca todas como leídas) |
| GET | `/tmpEmail` | Pública | — | Dispara el resumen diario de notificaciones por correo (endpoint de depuración/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carga las notificaciones de una persona específica |
| GET | `/:churchId/:id` | JWT | — | Carga una notificación por ID |
| POST | `/` | JWT | — | Crea o actualiza notificaciones (por lotes) |
| POST | `/create` | JWT | — | Crea notificaciones para varias personas. Cuerpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marca todas las notificaciones de una persona como leídas |
| POST | `/sendTest` | JWT | — | Envía una notificación push de prueba. Cuerpo: `{ personId, title }` |
| POST | `/ping` | Pública | — | Crea una notificación desde un disparador externo. Cuerpo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una notificación |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | Cuenta cuántos miembros de un grupo alcanzaría un push |
| GET | `/churchPreview` | JWT | `content.edit` | Cuenta cuántas personas alcanzaría un push a todos los que tienen la app |
| POST | `/group/send` | JWT | `groupMembers.edit` | Envía un push a los miembros de un grupo ahora mismo |

### Ejemplo: crear notificaciones {#example-create-notifications}

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

## Notificaciones programadas {#scheduled-notifications}

Ruta base: `/messaging/scheduledNotifications`

Pushes programados con anticipación. `audience` es `church` (todos los que tienen la app; requiere `content.edit`) o `group` (requiere `groupMembers.edit` y un `groupId`). El título está limitado a 80 caracteres y el mensaje a 240. Una fila vencida se envía con el temporizador de 1 minuto.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` o `content.edit` | Lista las notificaciones programadas y recientes de la iglesia |
| POST | `/` | JWT | según la audiencia | Crea una notificación programada, o la actualiza cuando se envía `id`. Cuerpo: `{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`. Actualizar una que ya no está pendiente devuelve 409 |
| POST | `/:id/sendNow` | JWT | según la audiencia | Envía ahora una notificación pendiente. Devuelve 409 si ya se envió, se canceló o se está enviando |
| DELETE | `/:id` | JWT | según la audiencia | Cancela una notificación pendiente, o quita de la lista una enviada, fallida o cancelada. Devuelve 409 mientras se está enviando |
| DELETE | `/` | JWT | `groupMembers.edit` o `content.edit` | Elimina todas las notificaciones enviadas, fallidas y canceladas de las audiencias a las que el usuario puede enviar. Devuelve `{ deleted }` |

## Preferencias de notificación {#notification-preferences}

Ruta base: `/messaging/notificationpreferences`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Lista las categorías de notificación con sus canales predeterminados y permitidos |
| GET | `/my` | JWT | — | Carga las preferencias de notificación del usuario actual (crea los valores predeterminados si no existen) |
| POST | `/` | JWT | — | Guarda las preferencias del usuario actual. Cuerpo: cualquiera de `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, más `overrides: [{ categoryKey, channel, optedIn }]` opcional (el canal puede ser `push`, `email`, `in_app` o `sms`; las categorías bloqueadas se ignoran). `allowSms` es la aceptación del miembro para los recordatorios por texto. Todavía se acepta el cuerpo heredado en forma de arreglo de filas |

## Conexiones {#connections}

Ruta base: `/messaging/connections`

Administra las conexiones WebSocket/en tiempo real para el chat, las conversaciones de grupo, los mensajes privados y las transmisiones en vivo. Consulta [Arquitectura en tiempo real](../../realtime.md) para ver el protocolo completo de principio a fin.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Pública | — | Carga todas las conexiones de una conversación |
| POST | `/` | Pública | — | Registra conexiones (por lotes). Dispara una difusión de asistencia en la conversación. Elementos del cuerpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Pública | — | Actualiza el nombre para mostrar de una conexión por ID de socket. Cuerpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Pública | — | Quita una conexión de una conversación. Dispara una difusión de asistencia |
| POST | `/tmpSendAlert` | Pública | — | Envía una alerta de notificación a las conexiones de una persona. Cuerpo: `{ churchId, personId }` |

## Dispositivos {#devices}

Ruta base: `/messaging/devices`

Administra el registro de dispositivos para notificaciones push y para vincular contenido (por ejemplo, la app de Lessons en pantallas de TV).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Registra o actualiza un dispositivo (registro push móvil). Coincide por token FCM o ID de dispositivo |
| POST | `/enrollAnon` | Pública | — | Registra un dispositivo anónimo y genera un código de emparejamiento de 4 caracteres |
| POST | `/` | Pública | — | Guarda dispositivos (por lotes) |
| GET | `/pair/:pairingCode` | JWT | — | Empareja un dispositivo con su código de emparejamiento. `?contentType=&contentId=` opcional para asignar contenido |
| GET | `/status/:deviceId` | Pública | — | Consulta el estado de emparejamiento de un dispositivo |
| GET | `/:churchId` | JWT | — | Carga todos los dispositivos de una iglesia |
| GET | `/:churchId/person/:personId` | JWT | — | Carga todos los dispositivos de una persona |
| GET | `/:churchId/:id` | JWT | — | Carga un dispositivo por ID |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un dispositivo |

### Ejemplo: registrar un dispositivo {#example-enroll-a-device}

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

## Contenido de dispositivos {#device-contents}

Ruta base: `/messaging/devicecontents`

Administra las asignaciones de contenido para los dispositivos emparejados (por ejemplo, qué lección se muestra en una TV).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Carga las asignaciones de contenido de un dispositivo |
| POST | `/` | JWT | — | Guarda las asignaciones de contenido de dispositivos (por lotes) |
| DELETE | `/:id` | JWT | — | Elimina una asignación de contenido de dispositivo |

## Mensajes de texto {#texting}

Ruta base: `/messaging/texting`

Administra los proveedores de SMS, el envío de mensajes de texto a grupos y el seguimiento de entregas.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Carga los proveedores de mensajes de texto de la iglesia (las credenciales están enmascaradas) |
| GET | `/status` | JWT | — | `{ enabled }` — indica si la iglesia tiene un proveedor de texto habilitado. Lo puede consultar cualquier usuario con sesión iniciada; se usa para mostrar las opciones **Texto** solo cuando se pueden enviar mensajes |
| GET | `/inboundUrl` | JWT | `texting.send` o `settings.edit` | `{ url }` — la URL del webhook entrante (STOP) de la iglesia, para pegarla en el proveedor |
| POST | `/inbound/:churchId/:token` | Pública | — | Webhook de mensajes entrantes del proveedor. `token` es un HMAC del ID de la iglesia. Una respuesta que sea exactamente una palabra de baja (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) marca como `optedOut` a cada persona coincidente y desactiva su `allowSms`. Devuelve `{ optedOut: <count> }`; otras respuestas devuelven `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Vista previa de los destinatarios de un mensaje de texto a un grupo (conteos de elegibles, dados de baja y sin teléfono) |
| GET | `/sent` | JWT | — | Carga todos los registros de mensajes de texto enviados de la iglesia |
| GET | `/sent/:id/details` | JWT | — | Carga un mensaje de texto enviado con los registros de entrega por destinatario |
| POST | `/providers` | JWT | — | Guarda los proveedores de mensajes de texto (por lotes). Cifra las credenciales de API |
| POST | `/send` | JWT | — | Envía un SMS a todos los miembros elegibles de un grupo. Cuerpo: `{ groupId, message }`. Los campos de combinación (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) se resuelven por destinatario |
| POST | `/sendPerson` | JWT | — | Envía un SMS a una sola persona. Cuerpo: `{ personId, phoneNumber, message }`. Los campos de combinación se resuelven, y el texto resuelto es el que se registra |
| DELETE | `/providers/:id` | JWT | — | Elimina un proveedor de mensajes de texto |

### Ejemplo: enviar un mensaje de texto a un grupo {#example-send-group-text}

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

## Plantillas de correo {#email-templates}

Ruta base: `/messaging/emailTemplates`

Administra plantillas de correo reutilizables y el envío de correos con plantilla a grupos.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carga todas las plantillas de correo de la iglesia |
| GET | `/:id` | JWT | — | Carga una sola plantilla de correo por ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` o `tasks.admin` | El estado de correo de grupos de la iglesia: `{ approved, paused, remaining, requested }`. El diálogo Enviar correo de B1Admin y la acción **Enviar correo** del flujo de trabajo lo usan para advertir cuando el correo no se enviará |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Pide a soporte que apruebe a la iglesia para el correo de grupos (como máximo una vez por iglesia por semana) |
| GET | `/preview/:groupId` | JWT | — | Vista previa de la entrega de correo a un grupo (conteo de destinatarios elegibles, miembros sin correo) |
| POST | `/` | JWT | — | Crea o actualiza plantillas de correo (por lotes) |
| POST | `/send` | JWT | — | Envía un correo con plantilla a todos los miembros de un grupo. Cuerpo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Elimina una plantilla de correo |

### Ejemplo: enviar un correo a un grupo {#example-send-email-to-group}

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

**Campos de combinación admitidos:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IPs bloqueadas {#blocked-ips}

Ruta base: `/messaging/blockedips`

(heredado) Bloqueo de IP para el chat de transmisiones en vivo. El cliente de B1App ya no llama a `POST /`; el bloqueo de IP se eliminó en la migración a la entrega unificada. La ruta `/clear` todavía la invoca de servidor a servidor `StreamingServiceController` cuando se guardan servicios de transmisión.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (heredado) Guarda IPs bloqueadas (por lotes). Sin cliente activo |
| POST | `/clear` | JWT | — | Borra todas las IPs bloqueadas de servicios específicos. Cuerpo: `[{ serviceId, churchId }]` |

## Registros de entrega {#delivery-logs}

Ruta base: `/messaging/deliverylogs`

Registra el estado de entrega de los mensajes enviados (SMS, notificaciones push y correo).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carga los registros de entrega por tipo de contenido e ID |
| GET | `/person/:personId` | JWT | — | Carga los registros de entrega de una persona. `?startDate=&endDate=` opcionales para filtrar |
| GET | `/recent` | JWT | — | Carga los registros de entrega recientes de la iglesia. `?limit=` opcional (predeterminado 100) |
| GET | `/:id` | JWT | — | Carga un registro de entrega por ID |

## Páginas relacionadas {#related-pages}

- [Arquitectura en tiempo real](../../realtime.md) -- protocolo WebSocket, suscripciones a salas y el marco de entrega unificada
- [Notificaciones web push](../../web-push.md) -- registro y entrega de push en el navegador
- [Endpoints de membresía](./membership.md) -- personas, grupos, roles e identidad central
- [Endpoints de asistencia](./attendance.md) -- seguimiento de servicios y visitas
- [Autenticación y permisos](./authentication.md) -- flujo de inicio de sesión, JWT, OAuth, modelo de permisos
- [Estructura de módulos](../module-structure.md) -- patrones de organización del código
