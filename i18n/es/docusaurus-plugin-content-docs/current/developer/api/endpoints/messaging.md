---
title: "Puntos Finales de Mensajería"
---

# Puntos Finales de Mensajería

<div class="article-intro">

El módulo de Mensajería gestiona conversaciones en tiempo real, mensajes de chat, notificaciones push, entrega de SMS/correo electrónico, conexiones WebSocket, mensajería privada, registro de dispositivos y proveedores de mensajería de texto. Proporciona la capa de comunicación utilizada en todas las aplicaciones ChurchApps para chat de transmisión en vivo y notificaciones asincrónicas.

</div>

**Ruta base:** `/messaging`

## Conversaciones

Ruta base: `/messaging/conversations`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Cargar conversaciones por IDs separados por comas |
| GET | `/messages/:contentType/:contentId` | JWT | — | Cargar conversaciones para contenido con mensajes paginados |
| GET | `/posts` | JWT | — | Obtener conversaciones de tipo publicación para los grupos del usuario actual |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Cargar conversaciones por tipo de contenido e ID |
| GET | `/:churchId/:id` | Public | — | Cargar una sola conversación por ID |
| POST | `/` | JWT | — | Crear o actualizar conversaciones (lote) |
| POST | `/start` | JWT | — | Comenzar una nueva conversación con un mensaje de comentario inicial |
| DELETE | `/:churchId/:id` | JWT | — | Eliminar una conversación |

## Mensajes

Ruta base: `/messaging/messages`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Cargar todos los mensajes para una conversación |
| GET | `/:churchId/:id` | Public | — | Cargar un solo mensaje por ID |
| POST | `/` | JWT | — | Guardar mensajes (lote). Envía actualizaciones en tiempo real |
| POST | `/send` | Public | — | Enviar mensajes (lote, público). Envía actualizaciones en tiempo real |
| DELETE | `/:churchId/:id` | JWT | — | Eliminar un mensaje |

## Mensajes Privados

Ruta base: `/messaging/privatemessages`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Cargar todos los mensajes privados para el usuario actual |
| GET | `/existing/:personId` | JWT | — | Encontrar una conversación privada existente con una persona específica |
| GET | `/:id` | JWT | — | Cargar un mensaje privado por ID |
| POST | `/` | JWT | — | Enviar mensajes privados (lote). Dispara notificación push al destinatario |

## Notificaciones

Ruta base: `/messaging/notifications`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/unreadCount` | JWT | — | Obtener conteo de notificaciones no leídas para el usuario actual |
| GET | `/my` | JWT | — | Cargar todas las notificaciones para el usuario actual |
| GET | `/:churchId/person/:personId` | JWT | — | Cargar notificaciones para una persona específica |
| GET | `/:churchId/:id` | JWT | — | Cargar una notificación por ID |
| POST | `/` | JWT | — | Crear o actualizar notificaciones (lote) |
| POST | `/create` | JWT | — | Crear notificaciones para múltiples personas |
| POST | `/sendTest` | JWT | — | Enviar una notificación push de prueba |
| POST | `/ping` | Public | — | Crear una notificación desde un activador externo |
| DELETE | `/:churchId/:id` | JWT | — | Eliminar una notificación |

## Dispositivos

Ruta base: `/messaging/devices`

Gestiona el registro de dispositivos para notificaciones push y emparejamiento de contenido.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| POST | `/enroll` | JWT | — | Inscribir o actualizar un dispositivo (registro de push móvil) |
| POST | `/enrollAnon` | Public | — | Inscribir un dispositivo anónimo y generar código de emparejamiento de 4 caracteres |
| POST | `/` | Public | — | Guardar dispositivos (lote) |
| GET | `/pair/:pairingCode` | JWT | — | Emparejar un dispositivo usando su código de emparejamiento |
| GET | `/status/:deviceId` | Public | — | Verificar estado de emparejamiento de un dispositivo |
| GET | `/:churchId` | JWT | — | Cargar todos los dispositivos para una iglesia |
| GET | `/:churchId/person/:personId` | JWT | — | Cargar todos los dispositivos para una persona |
| GET | `/:churchId/:id` | JWT | — | Cargar un dispositivo por ID |
| DELETE | `/:churchId/:id` | JWT | — | Eliminar un dispositivo |

## Plantillas de Correo Electrónico

Ruta base: `/messaging/emailTemplates`

Gestiona plantillas de correo electrónico reutilizables y envío de correos electrónicos basados en plantillas a grupos.

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/` | JWT | — | Cargar todas las plantillas de correo electrónico para la iglesia |
| GET | `/:id` | JWT | — | Cargar una plantilla de correo electrónico única por ID |
| GET | `/preview/:groupId` | JWT | — | Vista previa de entrega de correo electrónico para un grupo |
| POST | `/` | JWT | — | Crear o actualizar plantillas de correo electrónico (lote) |
| POST | `/send` | JWT | — | Enviar correo electrónico basado en plantilla a todos los miembros de un grupo |
| DELETE | `/:id` | JWT | — | Eliminar una plantilla de correo electrónico |

## Páginas Relacionadas

- [Puntos Finales de Membresía](./membership) -- Personas, grupos, roles e identidad principal
- [Puntos Finales de Asistencia](./attendance) -- Seguimiento de servicio y visita
- [Autenticación y Permisos](./authentication) -- Flujo de inicio de sesión, JWT, OAuth, modelo de permisos
- [Estructura de Módulo](../module-structure) -- Patrones de organización de código
