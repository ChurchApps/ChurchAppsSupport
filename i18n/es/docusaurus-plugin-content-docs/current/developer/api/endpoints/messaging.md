---
title: "Endpoints de Mensajería"
---

# Endpoints de Mensajería

<div class="article-intro">

El módulo Mensajería administra conversaciones en tiempo real, mensajes de chat, notificaciones push, entrega de SMS/correo electrónico, conexiones WebSocket, mensajería privada, registro de dispositivos y proveedores de mensajería de texto. Proporciona la capa de comunicación utilizada en todas las aplicaciones de ChurchApps para chat en transmisión en vivo y notificaciones asincrónicas.

</div>

**Ruta base:** `/messaging`

## Conversaciones

Ruta base: `/messaging/conversations`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Cargar conversaciones por IDs separados por comas con primeros/últimos mensajes |
| GET | `/messages/:contentType/:contentId` | JWT | — | Cargar conversaciones para contenido con mensajes paginados (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obtener conversaciones de tipo publicación para los grupos del usuario actual |
| GET | `/posts/group/:groupId` | JWT | — | Obtener conversaciones de tipo publicación para un grupo específico |
| GET | `/current/:churchId/:contentType/:contentId` | Público | — | Obtener o crear la conversación actual para contenido (auto-desencripta contentId) |
| GET | `/:churchId/:contentType/:contentId` | Público | — | Cargar conversaciones por tipo de contenido e ID |
| GET | `/:churchId/:id` | Público | — | Cargar una conversación única por ID |
| POST | `/` | JWT | — | Crear o actualizar conversaciones (lote) |
| POST | `/start` | JWT | — | Iniciar una nueva conversación con un mensaje de comentario inicial |
| DELETE | `/:churchId/:id` | JWT | — | Eliminar una conversación |

### Control de acceso de notas personales

Las conversaciones con `contentType: "person"` (la pestaña Notas en un registro de persona) o `contentType: "personConfidential"` (la sección Notas Confidenciales) se cierran en cada ruta de lectura y escritura, incluidas las rutas públicas anteriores, que devuelven `401` para estos tipos de contenido. `person` requiere el permiso **Personas / Editar** de MembershipApi; `personConfidential` requiere **Personas / Ver Notas Confidenciales**. Para claves API con alcance, `people:write` lleva ambas acciones (el usuario de la clave aún debe tener el permiso de rol subyacente).

### Ejemplo: Iniciar una Conversación

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
|--------|------|-------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Cargar todos los mensajes para una conversación |
| GET | `/catchup/:churchId/:conversationId` | Público | — | Cargar todos los mensajes para una conversación (recuperación pública para chat en vivo) |
| GET | `/:churchId/:id` | Público | — | Cargar un mensaje único por ID |
| POST | `/` | JWT | — | Guardar mensajes (lote). Envía actualizaciones en tiempo real y activa notificaciones. Actualizar un mensaje existente requiere ser su autor u tener `content.edit`; el autor almacenado nunca es reasignable |
| POST | `/send` | Público | — | Enviar mensajes (lote, público). Envía actualizaciones en tiempo real a través de WebSocket y activa notificaciones |
| POST | `/setCallout` | JWT | — | (heredado) Difundir un mensaje de llamada en tiempo real. Sin cliente activo; el chat en transmisión en vivo ya no renderiza llamadas |
| DELETE | `/:churchId/:id` | JWT | — | Eliminar un mensaje y difundir la eliminación en tiempo real. Ver [Moderación de mensajes](#moderación-de-mensajes) |

### Moderación de mensajes

Eliminar un mensaje está permitido para:

- el autor del mensaje;
- personal con `content.edit` (en cualquier lugar de la iglesia);
- **líderes de grupo**, para conversaciones con un `contentType` de `group` o `groupAnnouncement` cuyo `contentId` es un grupo que lideran (`leaderGroupIds` en el JWT).

Las conversaciones de notas personales (`person` / `personConfidential`) nunca son moderadas por líderes — utilizan los permisos de notas (`people.edit`, `people.viewConfidentialNotes`) en su lugar.

Los líderes obtienen solo eliminar, no editar: reescribir el mensaje de otro miembro permanece restringido al autor y personal `content.edit`.

### Ejemplo: Enviar un Mensaje

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

## Mensajes Privados

Ruta base: `/messaging/privatemessages`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/` | JWT | — | Cargar todos los mensajes privados para el usuario actual (incluye último mensaje por conversación, marca todos como leídos) |
| GET | `/existing/:personId` | JWT | — | Encontrar una conversación privada existente con una persona específica |
| GET | `/:id` | JWT | — | Cargar un mensaje privado por ID (borra la notificación si se dirige al usuario actual) |
| POST | `/` | JWT | — | Enviar mensajes privados (lote). Activa notificación push al destinatario |

## Notificaciones

Ruta base: `/messaging/notifications`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Obtener recuento de notificaciones no leídas para el usuario actual |
| GET | `/my` | JWT | — | Cargar todas las notificaciones para el usuario actual (marca todas como leídas) |
| GET | `/tmpEmail` | Público | — | Activar resumen diario de notificaciones por correo electrónico (extremo de depuración/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Cargar notificaciones para una persona específica |
| GET | `/:churchId/:id` | JWT | — | Cargar una notificación por ID |
| POST | `/` | JWT | — | Crear o actualizar notificaciones (lote) |
| POST | `/create` | JWT | — | Crear notificaciones para múltiples personas. Cuerpo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marcar todas las notificaciones como leídas para una persona |
| POST | `/sendTest` | JWT | — | Enviar una notificación push de prueba. Cuerpo: `{ personId, title }` |
| POST | `/ping` | Público | — | Crear una notificación desde un activador externo. Cuerpo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Eliminar una notificación |

### Ejemplo: Crear Notificaciones

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

## Preferencias de Notificación

Ruta base: `/messaging/notificationpreferences`

Extiende CRUD estándar. La clase base proporciona POST `/` (crear o actualizar, sin permiso requerido).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| POST | `/` | JWT | — | Crear o actualizar preferencias de notificación (de la clase base CRUD) |
| GET | `/my` | JWT | — | Cargar preferencias de notificación para el usuario actual (crea automáticamente predeterminados si no existen) |

## Conexiones

Ruta base: `/messaging/connections`

Administra conexiones WebSocket/tiempo real para chat, conversaciones de grupo, mensajes privados y transmisión en vivo. Ver [Arquitectura de Tiempo Real](../../realtime) para el protocolo de extremo a extremo.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/:churchId/:conversationId` | Público | — | Cargar todas las conexiones para una conversación |
| POST | `/` | Público | — | Registrar conexiones (lote). Activa una difusión de asistencia en la conversación. Elementos del cuerpo: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Público | — | Actualizar el nombre mostrado para una conexión por socket ID. Cuerpo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Público | — | Soltar una conexión de una conversación. Activa una difusión de asistencia |
| POST | `/tmpSendAlert` | Público | — | Enviar una alerta de notificación a las conexiones de una persona. Cuerpo: `{ churchId, personId }` |

## Dispositivos

Ruta base: `/messaging/devices`

Administra el registro de dispositivos para notificaciones push y emparejamiento de contenido (por ejemplo, aplicación de Lecciones en pantallas de TV).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| POST | `/enroll` | JWT | — | Inscribir o actualizar un dispositivo (registro de push móvil). Coincide por token de FCM o ID de dispositivo |
| POST | `/enrollAnon` | Público | — | Inscribir un dispositivo anónimo y generar un código de emparejamiento de 4 caracteres |
| POST | `/` | Público | — | Guardar dispositivos (lote) |
| GET | `/pair/:pairingCode` | JWT | — | Emparejar un dispositivo usando su código de emparejamiento. Opcional `?contentType=&contentId=` para asignar contenido |
| GET | `/status/:deviceId` | Público | — | Verificar estado de emparejamiento de un dispositivo |
| GET | `/:churchId` | JWT | — | Cargar todos los dispositivos para una iglesia |
| GET | `/:churchId/person/:personId` | JWT | — | Cargar todos los dispositivos para una persona |
| GET | `/:churchId/:id` | JWT | — | Cargar un dispositivo por ID |
| DELETE | `/:churchId/:id` | JWT | — | Eliminar un dispositivo |

### Ejemplo: Inscribir un Dispositivo

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

## Contenidos de Dispositivo

Ruta base: `/messaging/devicecontents`

Administra asignaciones de contenido para dispositivos emparejados (por ejemplo, qué lección se muestra en un televisor).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Cargar asignaciones de contenido para un dispositivo |
| POST | `/` | JWT | — | Guardar asignaciones de contenido del dispositivo (lote) |
| DELETE | `/:id` | JWT | — | Eliminar una asignación de contenido de dispositivo |

## Mensajería de Texto

Ruta base: `/messaging/texting`

Administra proveedores de SMS, mensajería de texto de grupo y seguimiento de entrega.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/providers` | JWT | — | Cargar proveedores de mensajería de texto para la iglesia (las credenciales están enmascaradas) |
| GET | `/preview/:groupId` | JWT | — | Previsualizar destinatarios para un mensaje de texto de grupo (recuentos elegibles, excluidos, sin teléfono) |
| GET | `/sent` | JWT | — | Cargar todos los registros de mensajes de texto enviados para la iglesia |
| GET | `/sent/:id/details` | JWT | — | Cargar un mensaje de texto enviado con registros de entrega por destinatario |
| POST | `/providers` | JWT | — | Guardar proveedores de mensajería de texto (lote). Encripta credenciales de API |
| POST | `/send` | JWT | — | Enviar un SMS a todos los miembros elegibles de un grupo. Cuerpo: `{ groupId, message }`. Los campos de fusión (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) se resuelven por destinatario |
| POST | `/sendPerson` | JWT | — | Enviar un SMS a una persona única. Cuerpo: `{ personId, phoneNumber, message }`. Los campos de fusión se resuelven y el texto resuelto es lo que se registra |
| DELETE | `/providers/:id` | JWT | — | Eliminar un proveedor de mensajería de texto |

### Ejemplo: Enviar Mensaje de Texto de Grupo

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

## Plantillas de Correo Electrónico

Ruta base: `/messaging/emailTemplates`

Administra plantillas de correo electrónico reutilizables y envío de correos electrónicos basados en plantillas a grupos.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/` | JWT | — | Cargar todas las plantillas de correo electrónico para la iglesia |
| GET | `/:id` | JWT | — | Cargar una plantilla de correo electrónico única por ID |
| GET | `/preview/:groupId` | JWT | — | Previsualizar entrega de correo electrónico para un grupo (recuento de destinatarios elegibles, miembros sin correo electrónico) |
| POST | `/` | JWT | — | Crear o actualizar plantillas de correo electrónico (lote) |
| POST | `/send` | JWT | — | Enviar un correo electrónico de plantilla a todos los miembros de un grupo. Cuerpo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Eliminar una plantilla de correo electrónico |

### Ejemplo: Enviar Correo Electrónico a Grupo

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

**Campos de fusión admitidos:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IPs Bloqueadas

Ruta base: `/messaging/blockedips`

(heredado) Bloqueo de IP para chat de transmisión en vivo. El cliente de B1App ya no llama a `POST /` — el bloqueo de IP se eliminó en la migración de entrega unificada. La ruta `/clear` aún es invocada servidor a servidor por `StreamingServiceController` cuando se guardan servicios de transmisión en vivo.

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| POST | `/` | JWT | — | (heredado) Guardar IPs bloqueadas (lote). Sin cliente activo |
| POST | `/clear` | JWT | — | Borrar todas las IPs bloqueadas para servicios específicos. Cuerpo: `[{ serviceId, churchId }]` |

## Registros de Entrega

Ruta base: `/messaging/deliverylogs`

Rastrea el estado de entrega de mensajes enviados (SMS, notificaciones push, correo electrónico).

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Cargar registros de entrega por tipo de contenido e ID |
| GET | `/person/:personId` | JWT | — | Cargar registros de entrega para una persona. Filtros opcionales `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Cargar registros de entrega recientes para la iglesia. Opcional `?limit=` (predeterminado 100) |
| GET | `/:id` | JWT | — | Cargar un registro de entrega por ID |

## Páginas Relacionadas

- [Arquitectura de Tiempo Real](../../realtime) -- Protocolo WebSocket, suscripciones a salas y marco de entrega unificado
- [Notificaciones Push Web](../../web-push) -- Inscripción de push del navegador y entrega
- [Endpoints de Pertenencia](./membership) -- Personas, grupos, roles e identidad central
- [Endpoints de Asistencia](./attendance) -- Seguimiento de servicio y visita
- [Autenticación y Permisos](./authentication) -- Flujo de inicio de sesión, JWT, OAuth, modelo de permisos
- [Estructura del Módulo](../module-structure) -- Patrones de organización de código
