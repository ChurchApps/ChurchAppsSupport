---
title: "Endpoints de mensajería"
---

# Endpoints de mensajería

<div class="article-intro">

El módulo de mensajería gestiona conversaciones en tiempo real, mensajes de chat, notificaciones push, entrega de SMS y correo electrónico, conexiones WebSocket, mensajes privados, registro de dispositivos y proveedores de mensajes de texto. Proporciona la capa de comunicación que usan todas las aplicaciones de ChurchApps, tanto para el chat de transmisiones en vivo como para las notificaciones asíncronas.

</div>

**Ruta base:** `/messaging`

## Conversaciones

Ruta base: `/messaging/conversations`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Carga conversaciones por IDs separados por comas, con los primeros y últimos mensajes |
| GET | `/messages/:contentType/:contentId` | JWT | — | Carga las conversaciones de un contenido con mensajes paginados (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obtiene las conversaciones de tipo publicación de los grupos del usuario actual |
| GET | `/posts/group/:groupId` | JWT | — | Obtiene las conversaciones de tipo publicación de un grupo específico |
| GET | `/current/:churchId/:contentType/:contentId` | Pública | — | Obtiene o crea la conversación actual para un contenido (descifra automáticamente el contentId) |
| GET | `/:churchId/:contentType/:contentId` | Pública | — | Carga conversaciones por tipo de contenido e ID |
| GET | `/:churchId/:id` | Pública | — | Carga una sola conversación por ID |
| POST | `/` | JWT | — | Crea o actualiza conversaciones (por lotes) |
| POST | `/start` | JWT | — | Inicia una nueva conversación con un mensaje de comentario inicial |
| DELETE | `/:churchId/:id` | JWT | — | Elimina una conversación |

### Control de acceso a las notas de personas

Las conversaciones con `contentType: "person"` (la pestaña **Notas** de un registro de persona) o `contentType: "personConfidential"` (la sección **Notas confidenciales**) están restringidas en todas las rutas de lectura y escritura, incluidas las rutas públicas de arriba, que devuelven `401` para estos tipos de contenido. `person` requiere el permiso **Personas / Editar** de MembershipApi; `personConfidential` requiere **Personas / Ver notas confidenciales**. Para las claves de API con alcance, `people:write` incluye ambas acciones (el usuario de la clave aún debe tener el permiso de rol subyacente).

### Control de acceso a las notas de grupos y eventos {#group-and-event-notes-access-control}

Otros dos tipos de contenido de notas están restringidos de la misma forma, en todas las rutas de lectura y escritura (incluidas las rutas públicas de arriba), y nunca están abiertos a publicaciones anónimas:

- **`groupNote`** (`contentId` = ID del grupo): el feed de **Notas de líderes** de un grupo. Solo los líderes de ese grupo (`leaderGroupIds` en el JWT) pueden leer o publicar. Ningún permiso de personal otorga acceso, incluidos `content.edit` y los permisos de membresía de grupos.
- **`eventNote`** (`contentId` = ID del evento): las notas de un evento del calendario. El personal con `content.edit` o **Calendarios / Admin** siempre puede leer y publicar. En los demás casos, el acceso sigue el campo `notesViewRole` (lectura) y `notesPostRole` (publicación) del evento: `staff` (el valor predeterminado, que se usa cuando el campo es `null`) no permite el acceso a nadie más, `leaders` permite a los líderes del grupo del evento, y `members` permite a los miembros y líderes del grupo del evento. Un evento sin `groupId` es solo para el personal.

### Control de acceso a las notas de tarjetas de flujo de trabajo

Las conversaciones con `contentType: "workflowCard"` (las notas de una tarjeta de flujo de trabajo, donde `contentId` es el ID de la tarea de la tarjeta) solo pueden ser leídas y escritas por alguien que pueda abrir esa tarjeta: un usuario con el permiso **Tareas / Ver** de DoingApi, o la persona o el grupo al que está asignada la tarjeta, que la creó o a quien se refiere. Cualquier otra persona recibe `401` en todas las rutas de lectura, incluidas las rutas públicas de arriba. La conversación de una tarjeta se adjunta a través de la propia tarjeta con `POST /doing/tasks/:id/conversation` (cuerpo `{ "conversationId": "..." }`; gana la primera conversación adjuntada), que pueden llamar los editores de la tarjeta y su responsable.

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

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Carga todos los mensajes de una conversación |
| GET | `/catchup/:churchId/:conversationId` | Pública | — | Carga todos los mensajes de una conversación (catch-up público para el chat en vivo) |
| GET | `/:churchId/:id` | Pública | — | Carga un solo mensaje por ID |
| POST | `/` | JWT | — | Guarda mensajes (por lotes). Envía actualizaciones en tiempo real y activa notificaciones. Para actualizar un mensaje existente se requiere ser su autor o tener `content.edit`; el autor almacenado nunca puede reasignarse |
| POST | `/send` | Pública | — | Envía mensajes (por lotes, público). Envía actualizaciones en tiempo real por WebSocket y activa notificaciones |
| POST | `/setCallout` | JWT | — | (heredado) Difunde un mensaje destacado en tiempo real. Ya no hay cliente activo; el chat de transmisión en vivo ya no muestra los destacados |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un mensaje y difunde la eliminación en tiempo real. Consulta [Moderación de mensajes](#message-moderation) |

### Moderación de mensajes {#message-moderation}

Pueden eliminar un mensaje:

- el autor del mensaje;
- el personal con `content.edit` (en toda la iglesia);
- los **líderes de grupo**, en conversaciones con `contentType` de `group` o `groupAnnouncement` cuyo `contentId` sea un grupo que dirigen (`leaderGroupIds` en el JWT).

Las conversaciones de notas de personas (`person` / `personConfidential`) nunca son moderadas por líderes; en su lugar usan los permisos de notas (`people.edit`, `people.viewConfidentialNotes`).

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

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carga todos los mensajes privados del usuario actual (incluye el último mensaje de cada conversación y marca todos como leídos) |
| GET | `/existing/:personId` | JWT | — | Busca una conversación privada existente con una persona específica |
| GET | `/:id` | JWT | — | Carga un mensaje privado por ID (borra la notificación si está dirigido al usuario actual) |
| POST | `/` | JWT | — | Envía mensajes privados (por lotes). Activa una notificación push para el destinatario |

## Notificaciones

Ruta base: `/messaging/notifications`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Obtiene el número de notificaciones no leídas del usuario actual |
| GET | `/my` | JWT | — | Carga todas las notificaciones del usuario actual (marca todas como leídas) |
| GET | `/tmpEmail` | Pública | — | Activa el resumen diario de notificaciones por correo electrónico (endpoint de depuración/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Carga las notificaciones de una persona específica |
| GET | `/:churchId/:id` | JWT | — | Carga una notificación por ID |
| POST | `/` | JWT | — | Crea o actualiza notificaciones (por lotes) |
| POST | `/create` | JWT | — | Crea notificaciones para varias personas. Cuerpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marca todas las notificaciones de una persona como leídas |
| POST | `/sendTest` | JWT | — | Envía una notificación push de prueba. Cuerpo: `{ personId, title }` |
| POST | `/ping` | Pública | — | Crea una notificación desde un disparador externo. Cuerpo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
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

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Lista las categorías de notificación con sus canales predeterminados y permitidos |
| GET | `/my` | JWT | — | Carga las preferencias de notificación del usuario actual (crea los valores predeterminados si no existen) |
| POST | `/` | JWT | — | Guarda las preferencias del usuario actual. Cuerpo: cualquiera de `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, más `overrides: [{ categoryKey, channel, optedIn }]` opcional (el canal puede ser `push`, `email`, `in_app` o `sms`; las categorías bloqueadas se ignoran). `allowSms` es la aceptación del miembro para recibir recordatorios por mensaje de texto. Todavía se acepta un cuerpo heredado en forma de arreglo de filas |

## Conexiones

Ruta base: `/messaging/connections`

Gestiona las conexiones WebSocket y en tiempo real para el chat, las conversaciones de grupos, los mensajes privados y las transmisiones en vivo. Consulta [Arquitectura en tiempo real](../../realtime) para ver el protocolo de extremo a extremo.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Pública | — | Carga todas las conexiones de una conversación |
| POST | `/` | Pública | — | Registra conexiones (por lotes). Activa una difusión de asistencia en la conversación. Elementos del cuerpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Pública | — | Actualiza el nombre para mostrar de una conexión mediante el ID del socket. Cuerpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Pública | — | Elimina una conexión de una conversación. Activa una difusión de asistencia |
| POST | `/tmpSendAlert` | Pública | — | Envía una alerta de notificación a las conexiones de una persona. Cuerpo: `{ churchId, personId }` |

## Dispositivos

Ruta base: `/messaging/devices`

Gestiona el registro de dispositivos para notificaciones push y emparejamiento de contenido (por ejemplo, la aplicación Lessons en pantallas de TV).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Registra o actualiza un dispositivo (registro push móvil). Coincide por token FCM o ID de dispositivo |
| POST | `/enrollAnon` | Pública | — | Registra un dispositivo anónimo y genera un código de emparejamiento de 4 caracteres |
| POST | `/` | Pública | — | Guarda dispositivos (por lotes) |
| GET | `/pair/:pairingCode` | JWT | — | Empareja un dispositivo usando su código de emparejamiento. `?contentType=&contentId=` opcional para asignar contenido |
| GET | `/status/:deviceId` | Pública | — | Verifica el estado de emparejamiento de un dispositivo |
| GET | `/:churchId` | JWT | — | Carga todos los dispositivos de una iglesia |
| GET | `/:churchId/person/:personId` | JWT | — | Carga todos los dispositivos de una persona |
| GET | `/:churchId/:id` | JWT | — | Carga un dispositivo por ID |
| DELETE | `/:churchId/:id` | JWT | — | Elimina un dispositivo |

### Ejemplo: registrar un dispositivo

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Contenidos de dispositivos

Ruta base: `/messaging/devicecontents`

Gestiona las asignaciones de contenido para los dispositivos emparejados (por ejemplo, qué lección se muestra en un televisor).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Carga las asignaciones de contenido de un dispositivo |
| POST | `/` | JWT | — | Guarda las asignaciones de contenido de dispositivos (por lotes) |
| DELETE | `/:id` | JWT | — | Elimina una asignación de contenido de dispositivo |

## Mensajes de texto

Ruta base: `/messaging/texting`

Gestiona los proveedores de SMS, el envío de mensajes de texto a grupos y el seguimiento de entregas.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Carga los proveedores de mensajes de texto de la iglesia (las credenciales aparecen enmascaradas) |
| GET | `/status` | JWT | — | `{ enabled }`: indica si la iglesia tiene un proveedor de mensajes de texto habilitado. Lo puede consultar cualquier usuario de la iglesia que haya iniciado sesión; se usa para mostrar las opciones **Texto** solo cuando se pueden enviar mensajes |
| GET | `/inboundUrl` | JWT | `texting.send` o `settings.edit` | `{ url }`: la URL del webhook de entrada (STOP) de la iglesia, para pegarla en el proveedor |
| POST | `/inbound/:churchId/:token` | Pública | — | Webhook de mensajes entrantes del proveedor. `token` es un HMAC del ID de la iglesia. Una respuesta que sea exactamente una palabra de baja (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) marca como `optedOut` a cada persona coincidente y desactiva su `allowSms`. Devuelve `{ optedOut: <count> }`; otras respuestas devuelven `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Vista previa de los destinatarios de un mensaje de texto grupal (recuentos de elegibles, dados de baja y sin teléfono) |
| GET | `/sent` | JWT | — | Carga todos los registros de mensajes de texto enviados de la iglesia |
| GET | `/sent/:id/details` | JWT | — | Carga un mensaje de texto enviado con los registros de entrega por destinatario |
| POST | `/providers` | JWT | — | Guarda los proveedores de mensajes de texto (por lotes). Cifra las credenciales de API |
| POST | `/send` | JWT | — | Envía un SMS a todos los miembros elegibles de un grupo. Cuerpo: `{ groupId, message }`. Los campos de combinación (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) se resuelven para cada destinatario |
| POST | `/sendPerson` | JWT | — | Envía un SMS a una sola persona. Cuerpo: `{ personId, phoneNumber, message }`. Los campos de combinación se resuelven y el texto resultante es el que se registra |
| DELETE | `/providers/:id` | JWT | — | Elimina un proveedor de mensajes de texto |

### Ejemplo: enviar un mensaje de texto grupal

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

Gestiona las plantillas de correo electrónico reutilizables y el envío de correos con plantilla a grupos.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carga todas las plantillas de correo electrónico de la iglesia |
| GET | `/:id` | JWT | — | Carga una sola plantilla de correo electrónico por ID |
| GET | `/preview/:groupId` | JWT | — | Vista previa de la entrega de correos a un grupo (recuento de destinatarios elegibles, miembros sin correo electrónico) |
| POST | `/` | JWT | — | Crea o actualiza plantillas de correo electrónico (por lotes) |
| POST | `/send` | JWT | — | Envía un correo con plantilla a todos los miembros de un grupo. Cuerpo: `{ groupId, subject, htmlContent }` |
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

(heredado) Bloqueo de IP para el chat de transmisiones en vivo. El cliente B1App ya no llama a `POST /`; el bloqueo de IP se eliminó en la migración a la entrega unificada. La ruta `/clear` todavía la invoca de servidor a servidor `StreamingServiceController` cuando se guardan los servicios de transmisión.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (heredado) Guarda IP bloqueadas (por lotes). Ya no hay cliente activo |
| POST | `/clear` | JWT | — | Elimina todas las IP bloqueadas de servicios específicos. Cuerpo: `[{ serviceId, churchId }]` |

## Registros de entrega

Ruta base: `/messaging/deliverylogs`

Registra el estado de entrega de los mensajes enviados (SMS, notificaciones push y correo electrónico).

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Carga los registros de entrega por tipo y ID de contenido |
| GET | `/person/:personId` | JWT | — | Carga los registros de entrega de una persona. `?startDate=&endDate=` opcional para filtrar |
| GET | `/recent` | JWT | — | Carga los registros de entrega recientes de la iglesia. `?limit=` opcional (predeterminado 100) |
| GET | `/:id` | JWT | — | Carga un registro de entrega por ID |

## Páginas relacionadas

- [Arquitectura en tiempo real](../../realtime) -- Protocolo WebSocket, suscripciones a salas y el marco de entrega unificada
- [Notificaciones push web](../../web-push) -- Registro y entrega de push en el navegador
- [Endpoints de membresía](./membership) -- Personas, grupos, roles e identidad principal
- [Endpoints de asistencia](./attendance) -- Seguimiento de servicios y visitas
- [Autenticación y permisos](./authentication) -- Flujo de inicio de sesión, JWT, OAuth, modelo de permisos
- [Estructura de módulos](../module-structure) -- Patrones de organización del código
