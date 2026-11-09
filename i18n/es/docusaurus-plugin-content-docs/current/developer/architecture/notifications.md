---
title: "Arquitectura de notificaciones y recordatorios"
description: "Cómo la API de B1 Admin enruta las notificaciones, los recordatorios programados, los límites de correo de las iglesias y las bajas de mensajes de texto a través de un único embudo de entrega y una puerta de preferencias."
---

# Arquitectura de notificaciones y recordatorios

<div class="article-intro">

Todo mensaje que un miembro de la iglesia ve fuera de la página en la que está (un contador en una insignia, una notificación push, un correo de resumen) pasa por una de dos puertas de MessagingApi. Esta página documenta el embudo, el motor de recordatorios que lo alimenta según un calendario y el modelo de preferencias que decide qué llega realmente a una persona.

</div>

## Visión general: dos puertas

```
cualquier cosa programada ──▶ ReminderEngine (definiciones → ocurrencias → escaneo) ─┐
envío programado de personal ─▶ scheduledNotifications (temporizador de 1 minuto) ───┤
chat / solicitudes / flujo de trabajo / envíos masivos ─────────────────────────────┼─▶ createNotifications()
                                                                                    │    puerta in_app → socket → push → email
     (los canales de recordatorio incluyen sms) ──▶ ReminderEngine.sendSms() ──▶ puerta sms → sendPersonText() mediante el proveedor de la iglesia
respuesta STOP del proveedor ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
correo de cuenta/legal ──▶ TransactionalEmailHelper.sendTransactional()  [en lista blanca, con lint]
```

1. **Cualquier cosa que le diga algo a una persona** pasa por `NotificationHelper.createNotifications()` en el módulo de mensajería. Guarda una fila en `notifications` y escala de socket a push y luego a email, evaluando `PreferenceGateHelper` por canal, incluido `in_app` en el nivel 0.
2. **Cualquier cosa programada** es una `reminderDefinition` (a nivel de entidad o de ámbito), que se expande en `reminderOccurrences` y la despacha `ReminderEngine.scan()` en un temporizador recurrente. Un solo expansor, un solo despachador y un solo registro de envíos (`reminderSentLog`). La única excepción es un push del personal programado desde la página **Mobile > Push Notifications** de B1Admin o desde el diálogo **Notify** de un grupo: es una fila de `scheduledNotifications` (audiencia `church` o `group`), que envía `ScheduledNotificationHelper.dispatchDue()` en el temporizador de 1 minuto. Una fila que supera en más de 30 minutos su `sendAt` en el primer intento se marca como fallida con `missed send window` en lugar de enviarse tarde, y un envío fallido se reintenta hasta 3 veces. Los destinatarios se resuelven en el momento del envío mediante `PushAudienceHelper`, el mismo helper que usa el envío inmediato a grupos, y se entregan a través de `createNotifications()` como `churchPushNotification` (categoría de preferencias `announcements`) o `groupPushNotification`.
3. **El correo directo** existe solo detrás de `TransactionalEmailHelper.sendTransactional()`. Una regla de ESLint lo aplica en tiempo de compilación; véase más abajo.

:::tip La puerta del correo se aplica con lint, no es solo una convención
`Api/tools/eslint-rules/email-door.cjs` define `no-direct-email-helper`: cualquier llamada a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` fuera de `NotificationHelper.ts` o `TransactionalEmailHelper.ts` falla el lint. Si necesita enviar un correo, enrútelo por el embudo (`createNotifications` con `emailImmediate`) o a través de `TransactionalEmailHelper.sendTransactional()`; no hay una tercera vía que pase la CI.
:::

## El embudo de notificaciones

`NotificationHelper.createNotifications()` es el único punto de entrada para todo lo que no está programado ni es transaccional:

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (predeterminado), 1 push, 2 solo email
    category?: string;                // eje de preferencias; se deriva de contentType si se omite
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // enviar el correo ahora en lugar de esperar al resumen
  }
)
```

Para cada destinatario guarda una fila en `notifications` y llama a `attemptDeliveryWithEscalation`, que recorre la escalera de canales de abajo. Una fila todavía no leída para el mismo `(contentType, contentId)` impide volver a crearla; esta comprobación de duplicados se omite en los envíos con `emailImmediate` (desfases de recordatorios, "enviar correo a todos" del personal, los pasos de flujo de trabajo gestionan su propia deduplicación) y en los mensajes directos, que siempre notifican al socket.

`shared/helpers/NotificationService.ts` replica la misma firma (`NotificationServiceOptions`) para los llamadores fuera del módulo de mensajería, y se registra en el módulo de mensajería al arrancar.

## Escalera de escalado de canales

La entrega empieza en un nivel (0 por defecto, o uno superior para recordatorios o envíos explícitos) y solo pasa al siguiente canal si el anterior no tuvo éxito. Cada nivel pasa primero por `PreferenceGateHelper` antes de intentar nada.

| Nivel | Canal | Comportamiento |
|-------|-------|----------------|
| 0 | **in_app / socket** | Primero se comprueba la puerta `in_app`. Si está suprimida (silenciada), la fila se guarda con `isNew=false` y la entrega se detiene por completo: sin aviso por socket, sin insignia y sin más escalado. En caso contrario, el servidor busca las conexiones de socket abiertas en la sala `alerts` de la persona y envía un frame `notification` (o `privateMessage`). Para las notificaciones ordinarias, una entrega exitosa por socket detiene la cadena aquí: el temporizador de 30 minutos vuelve a comprobar los elementos no leídos y los escala más tarde. Los mensajes directos nunca se detienen en el socket: una PWA instalada puede mantener abierto el socket de alertas en segundo plano, lo que de otro modo suprimiría el push a nivel del sistema operativo. |
| 1 | **push** | Controlado por `allowPush`, por la exclusión de la categoría y por las horas de silencio. Envía tanto a los tokens de push de Expo como a las suscripciones de Web Push que aparecen en las filas `devices` de la persona, eliminando duplicados por endpoint y depurando en el proceso los tokens obsoletos. |
| 2 | **email** | Controlado por `emailFrequency` y por la exclusión de la categoría. Los envíos inmediatos (`emailImmediate`) se generan en el acto y escriben una fila en `deliveryLogs`; en caso contrario, la notificación queda pendiente para el resumen por lotes que se describe más abajo. |
| — | **sms** | No es un nivel de la escalera. El único productor de SMS controlado es el motor de recordatorios: cuando los `channels` de una definición incluyen `sms`, `ReminderEngine.sendSms()` envía un texto a cada destinatario **además de** la notificación push o de correo (véase [Recordatorios por texto](#text-reminders)). El envío masivo de textos (`TextingController` / `@churchapps/texting`), la acción **Text Volunteers** del resumen de servicio (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) y la acción de paso de flujo de trabajo **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) envían textos directamente a través del proveedor de la iglesia, así que las preferencias de notificación y las horas de silencio no se aplican a ellos. Solo se respeta la marca `optedOut` de la persona. |

Las notificaciones no leídas que quedan en socket o push las escala el temporizador de 30 minutos (`NotificationHelper.escalateDelivery`). El correo por lotes lo envía `NotificationHelper.sendEmailNotifications(frequency)`, impulsado por la preferencia `emailFrequency` de cada persona: `individual` se ejecuta con el temporizador de 30 minutos, y `daily` con el temporizador nocturno. (`weekly` es un valor de preferencia válido, pero todavía no tiene una ejecución por lotes propia.)

## Motor de recordatorios

Los recordatorios programados (recordatorios de eventos, fechas límite de tareas, recordatorios de asignaciones de servicio y de planes) pasan todos por un único motor generalizado, en lugar de una lógica de cron específica para cada función.

```
reminderDefinitions ──expandir──▶ reminderOccurrences ──escanear (30 min)──▶ createNotifications()
     │                                  │                                       │
     ▼                                  ▼                                       ▼
 a nivel de entidad o ámbito      una fila por (definición,              deliveryStartLevel: 1
 desfases/canales/mensaje         entidad, ocurrencia, desfase)          + registro reminderSentLog
```

**Las definiciones** (`reminderDefinitions`) son de nivel de entidad (`entityId` establecido: un evento, tarea o plan concreto) o de nivel de ámbito (`entityId` nulo, `scopeId` establecido; por ejemplo, todos los planes de un tipo de plan de servicio). Una definición contiene una lista CSV de desfases en minutos (`offsets`, por ejemplo `"1440,60"` para un día y una hora antes), una hora local de envío (`sendLocalTime`), una lista CSV de canales (`channels`; incluir `email` genera un correo enriquecido inmediato en el momento del envío), un `recipientMode` y un `message` personalizado opcional.

**La expansión** materializa las filas de disparo para el horizonte siguiente (una ventana móvil de varios días). Se ejecuta con el temporizador nocturno y de forma síncrona cada vez que se guarda una definición, para que un recordatorio de un evento de última hora también se dispare. Las definiciones de ámbito se distribuyen mediante `loadScopeEntities` del adaptador, generando un conjunto de ocurrencias por cada entidad concreta; las ocurrencias de nivel de entidad usan la clave `definitionId:occurrenceISO:offset`, mientras que las ocurrencias de ámbito se separan por el id de la entidad para que nunca colisionen. Hacer upsert de una ocurrencia **reactiva** una fila cancelada previamente: cancelar y volver a expandir es la forma estándar de resincronizar un recordatorio cuando cambia la entidad subyacente; las filas ya `sent`, `failed` o `processing` no se tocan.

**El despacho** (`ReminderEngine.scan()`) se ejecuta con el temporizador de 30 minutos. Reclama las ocurrencias vencidas (un arrendamiento impide el doble procesamiento), carga los destinatarios a través del adaptador de la entidad, descarta a quien ya esté registrado en `reminderSentLog` para esa ocurrencia y llama a `createNotifications` con `deliveryStartLevel: 1` (ir directamente a push), además de `emailImmediate`/`emailByPerson` cuando los canales de la definición incluyen correo.

### Recordatorios por texto {#text-reminders}

Cuando los `channels` de una definición incluyen `sms`, `scan()` llama a `ReminderEngine.sendSms()` después de crear las notificaciones push o de correo, para los mismos destinatarios nuevos. El envío de textos es opcional para cada miembro:

- Cada destinatario pasa por `PreferenceGateHelper.evaluate(..., "sms", ...)`, así que `allowSms` debe estar activado (está desactivado por defecto y se activa con el interruptor **Text messages** de B1App) y el canal `sms` de la categoría no debe estar desactivado por una anulación. `event_reminders`, `serving_schedule` y `tasks` incluyen `sms` tanto en `defaultChannels` como en `allowedChannels`.
- Se suprime a las personas sin `mobilePhone` o con `optedOut` activado. Si la iglesia no tiene un proveedor de texto, el resto del lote se suprime con el motivo `no_provider`.
- El cuerpo lo construye `ReminderEngine.smsBody()`: `"<Nombre de la iglesia>: <mensaje> Reply STOP to opt out."`, recortado a un único segmento de 160 caracteres.
- Cada destinatario tiene su propia fila en `reminderSentLog` con `channel: "sms"` y estado `sent` / `suppressed` / `failed`, registrada por separado de la fila de push/correo, de modo que un texto fallido nunca vuelve a enviar el push ni el correo.

Los editores solo ofrecen **Text** cuando `GET /messaging/texting/status` devuelve `{ enabled: true }` (el primer proveedor de texto de la iglesia está habilitado).

**Baja mediante STOP.** `POST /messaging/texting/inbound/:churchId/:token` es un webhook anónimo que la iglesia pega en su proveedor (B1Admin muestra la URL obtenida de `GET /messaging/texting/inboundUrl` en la configuración de texto). El token es un HMAC del id de la iglesia (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` acepta campos de formulario al estilo Twilio y JSON al estilo Clearstream/TextInChurch; si la respuesta es exactamente una palabra de parada (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), a cada persona de la iglesia no eliminada cuyo número móvil coincida se le asigna `people.optedOut = true` y `allowSms = false`. Las demás respuestas se reconocen y se ignoran.

Un bus de eventos interno reacciona a las mutaciones de entidades sin esperar a la expansión nocturna: los eventos de contenido (mediante el despachador de webhooks) y los eventos de actualización de planes y tareas desencadenan una re-expansión o cancelación inmediata para la entidad afectada, y una actualización de plan también vuelve a expandir las definiciones de ámbito ligadas a su tipo de plan.

### Adaptadores

El motor no conoce el tipo de entidad; cada tipo de entidad compatible se conecta mediante un adaptador (`helpers/adapters/`):

| Tipo de entidad | Adaptador | Notas |
|-----------------|-----------|-------|
| `event` | `EventReminderAdapter` | Los destinatarios se limitan a los inscritos o a los miembros del grupo, según el evento y el `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Los destinatarios son las asignaciones Accepted + Unconfirmed de planes publicados (no borradores). Las asignaciones Unconfirmed emitidas mediante un flujo de confirmación de servicio se excluyen hasta que se aceptan (véase más abajo). `buildEmails` llama a `DoingModuleGateway.buildPlanReminderEmails`, que renderiza posiciones, notas y un mensaje personalizado a través de `doing/helpers/PlanReminderEmailHelper`, incluidos los botones Accept/Decline firmados por `ReminderTokenHelper` que envían a un endpoint público de respuesta a la asignación. |
| `task` | `TaskReminderAdapter` | Los destinatarios son los responsables de la tarea. |

### Endpoints

| Método | Ruta | Propósito |
|--------|------|-----------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carga o guarda la definición de recordatorio de una entidad. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carga o guarda una definición de recordatorio de ámbito (heredada). |
| `DELETE` | `/messaging/reminders/:defId` | Elimina una definición y cancela sus ocurrencias pendientes. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Previsualiza el número de destinatarios y los próximos disparos de un recordatorio de evento antes de guardarlo. |
| `GET` | `/messaging/reminders/log` | Historial reciente de ocurrencias de recordatorios de una iglesia. |
| `POST` | `/messaging/reminders/mute` | Silencia los recordatorios de una entidad concreta. |

Guardar una definición dispara una re-expansión síncrona para esa entidad o ámbito, de modo que los editores ven los "próximos disparos" actualizados sin esperar al trabajo nocturno.

## Mensajes directos

Los mensajes directos usan el mismo embudo que todo lo demás, en lugar de una ruta de escalado aparte. Cada conversación no leída obtiene una **fila sombra** en `notifications` (`contentType='privateMessage'`, `contentId` = el id del mensaje privado, `category='direct_messages'`) que contiene todo el estado de entrega: escalado a socket/push/email, seguimiento de lectura, todo. La tabla `privateMessages` conserva la carga del mensaje y una columna `notifyPersonId`, que es la fuente de la insignia de no leídos y se limpia cuando el destinatario lee la conversación.

Las filas sombra no aparecen en la campana de notificaciones: se excluyen de la consulta de recuento de no leídos, de la consulta de la lista de notificaciones y de las consultas de marcar como leído o eliminar, que filtran por `contentType <> 'privateMessage'`. Cada aviso de DM llega al socket sin importar el estado de lectura (semántica de chat en vivo, sin deduplicación), y los DM nunca se detienen en la entrega por socket como las notificaciones ordinarias, porque una PWA en segundo plano puede tener un socket abierto y aun así necesitar una notificación push a nivel del sistema operativo. Si una persona silencia las notificaciones de DM, la fila sombra queda en espera (`isNew=false`, `notifyPersonId` se limpia): sigue visible dentro de la propia conversación, pero sin insignias ni alertas.

## Preferencias y control

Cada envío pasa por `PreferenceGateHelper.evaluate()`, una función pura (todo el estado se pasa como parámetro, sin llamadas a la base de datos en la ruta crítica) que devuelve `allow`, `suppress` o `defer`. Las capas se ejecutan en orden, y gana la primera que decide:

1. **Categoría bloqueada**: algunas categorías son obligatorias (nivel 0) y omiten todas las demás capas.
2. **Silencio general / desactivación de canal**: `masterMute`, `allowPush`, `allowSms` (desactivado por defecto; los miembros lo activan) o `emailFrequency='never'` suprimen directamente.
3. **Horas de silencio**: solo para push y SMS (el correo se considera no intrusivo). Si la hora local actual en la zona horaria de la persona cae dentro de su ventana de silencio, una categoría transaccional sigue llegando; una no transaccional se aplaza hasta el final de la ventana, calculado como un instante UTC correcto según el horario de verano mediante `TimezoneHelper.wallClockToUtc`.
4. **Anulación de preferencia por categoría**: una exclusión explícita para un par categoría × canal; la ausencia significa el valor predeterminado de la categoría.
5. **Silencio por entidad**: un silencio registrado para una entidad concreta (por ejemplo, un evento o un plan) restringe más que la configuración de categoría, pero solo se aplica cuando el llamador facilita un id/tipo de entidad junto con la notificación.

Tablas implicadas: `notificationPreferences` (global: `masterMute`, `emailFrequency` de `individual|daily|weekly|never`, `allowPush`, la ventana de horas de silencio y la zona horaria, `allowSms`), `notificationPreferenceOverrides` (por categoría × canal) y `notificationEntityMutes` (por entidad).

Esta puerta se aplica a la notificación en la aplicación (nivel 0), a push (nivel 1) y a correo (nivel 2) dentro del embudo, incluidos los correos inmediatos de recordatorios y de resúmenes, y a los textos de recordatorio en `ReminderEngine.sendSms()`. El correo transaccional (códigos de acceso, restablecimientos de contraseña, invitaciones, recibos de donación) la omite por diseño; esa es precisamente la razón de ser de la segunda puerta.

### Flujos de confirmación de servicio

Un plan puede optar por un flujo de trabajo `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publicar/Notificar llama entonces a `POST /doing/plans/:id/issueRequests` en lugar de la notificación por asignación: cada nueva asignación Unconfirmed recibe `notified` + `confirmationWorkflowId` y una tarjeta de flujo de trabajo (`tasks.assignmentId`, `followupKey` único). La tarjeta envía una alerta solo para la app (`appOnly: true`, sin escalado a push ni a correo) y luego ejecuta las acciones `sendAssignmentRequest` del flujo de trabajo, que pasan por `MessagingModuleGateway.sendServingWorkflowMessage`: el correo mediante `NotificationHelper.sendWorkflowEmail` (puerta de preferencias + `ChurchEmailLimiter`, medido como `workflowEmail`), y el SMS mediante `sendPersonText` solo con `allowSms` y la puerta de la categoría `serving_schedule`. Aceptar/Rechazar (`assignment.updated` en el bus de eventos) cierra la tarjeta; el temporizador de 30 minutos (`AssignmentWorkflowHelper.processPending`) repara los inicios y eventos perdidos y convierte una solicitud sin respuesta al vencer el plazo de seguimiento en una tarea de revisión para el líder. Ciclo de vida completo: `Api/docs/assignment-confirmation-workflows.md`.

## Límites de correo redactado por la iglesia

El correo cuyo contenido escribió una iglesia sale desde la identidad compartida de SES de ChurchApps, así que se mide por iglesia mediante `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Cuatro rutas lo llaman: los envíos a grupos o con plantilla (`EmailTemplateController`, tipo de contenido `email`), los correos de seguimiento de formularios (`FormSubmissionController`, `formFollowUp`), las acciones de flujo de trabajo **Send email** (`NotificationHelper` con `churchAuthored`, `workflowEmail`) y los correos de solicitud de confirmación de servicio (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). El correo del sistema (códigos de acceso, recibos, recordatorios) y las invitaciones a roles y grupos (`UserController.sendInviteEmail`, una plantilla fija) no se miden.

- **Puerta de aprobación.** Una iglesia no envía nada hasta que un administrador del servidor establece `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chip **Group Email**). Las iglesias archivadas siempre están bloqueadas. El diálogo Send Email de B1Admin lee `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) y, si la iglesia no está aprobada, muestra una tarjeta **Request review** en lugar del editor. El editor de pasos del flujo de trabajo lee el mismo endpoint (abierto también a `tasks.admin`, además de `groupMembers.edit`) para advertir sobre las acciones **Send email** cuando la iglesia no está aprobada o está en pausa. En el momento del envío, `MessagingModuleGateway.sendTemplatedEmail` devuelve `false` sin crear una notificación cuando `ChurchEmailLimiter.remaining()` es menor que 1, de modo que el historial de la tarjeta nunca afirma **Email sent** para un correo que se descartó. `POST /messaging/emailTemplates/requestApproval` envía un correo a soporte, como máximo una vez por iglesia y por semana.
- **Cuota ganada.** Una iglesia aprobada obtiene `max(150, 2 × su mejor día de correo redactado por la iglesia en los 30 días anteriores)`, con un tope de 2,000 en cualquier periodo móvil de 24 horas. Las 24 horas actuales se excluyen del "mejor día" para que una ráfaga no pueda elevar su propio límite.
- **Reservar y luego liquidar.** `reserve()` escribe una fila en `deliveryLogs` por destinatario antes de enviar, vuelve a comprobar la cuota contando esas filas y retrocede si dos solicitudes superaron el límite a la vez (el envío devuelve 429). `settle()` marca cada fila como enviada o fallida.
- **Pausa por quejas.** La Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentada por SES → SNS) asocia cada rebote permanente o queja con la iglesia cuyo correo redactado llegó a esa dirección en ese momento, y lo guarda como `deliveryMethod` `sesBounce` / `sesComplaint`. Una iglesia queda en pausa con 2 o más quejas (≥ 0.3 % de los envíos) o 10 o más rebotes duros (≥ 5 %) en 7 días.

## Programación

Tanto el motor de recordatorios como el resumen de notificaciones se ejecutan sobre temporizadores programados que ya existen, en lugar de introducir una infraestructura nueva:

| Temporizador | Programación | Ejecuta |
|--------------|--------------|---------|
| Temporizador de 30 minutos | cada 30 minutos | Escala las notificaciones no leídas; envía los correos de resumen con frecuencia `individual`; despacha las ocurrencias de recordatorios vencidas (`ReminderEngine.scan`); resúmenes de aprobación; ejecuciones de automatización pendientes |
| Temporizador de 1 minuto (`timerWebhooks`) | cada minuto | Envía los pushes programados vencidos (`ScheduledNotificationHelper.dispatchDue`, trabajo `scheduledNotifications`) |
| Temporizador nocturno | 05:00 UTC | Recordatorios de asistencia de grupos; avanza los servicios de transmisión recurrentes; actualiza las listas de actualización automática; expande las ocurrencias de recordatorios para el siguiente horizonte (`ReminderEngine.expandAll`); envía los correos de resumen con frecuencia `daily` |

En local, la misma lógica puede ejecutarse bajo demanda con `npm run timer:30min` y `npm run timer:midnight` desde el proyecto `Api`.

## Inventario de archivos

| Área | Archivos |
|------|----------|
| Embudo | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrada compartida | `Api/src/shared/helpers/NotificationService.ts` |
| Puerta transaccional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regla de lint `Api/tools/eslint-rules/email-door.cjs` |
| Límites de correo de la iglesia | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Motor de recordatorios | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Textos / baja mediante STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (**Text Volunteers** del resumen de servicio) |
| Repositorios de recordatorios | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Correo de servicio/planes | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editores de recordatorios (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor de recordatorios / preferencias (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Páginas relacionadas

- [Real-time Architecture](../realtime.md) — el protocolo WebSocket y las primitivas del cliente (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) sobre las que se apoya el nivel de entrega en la app
- [Web Push Notifications](../web-push.md) — configuración de VAPID y la vía de la API Push del navegador que usa el nivel de push
- [Messaging Endpoints](../api/endpoints/messaging.md) — la superficie REST completa de mensajes, conversaciones, conexiones y rutas de notificaciones y recordatorios
