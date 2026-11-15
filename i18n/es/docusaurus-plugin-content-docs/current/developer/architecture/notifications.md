---
title: "Arquitectura de notificaciones y recordatorios"
description: "Cómo la API de B1 Admin enruta las notificaciones, los recordatorios programados, los límites de correo de la iglesia y las bajas de mensajes de texto a través de un único embudo de entrega y una sola compuerta de preferencias."
---

# Arquitectura de notificaciones y recordatorios

<div class="article-intro">

Todo mensaje que un miembro de la iglesia ve fuera de la página que está mirando (un contador en la campana, una notificación push, un resumen por correo) pasa por una de dos puertas en MessagingApi. Esta página documenta el embudo, el motor de recordatorios que lo alimenta según un calendario, y el modelo de preferencias que decide qué llega realmente a una persona.

</div>

## Descripción general: dos puertas {#overview--two-doors}

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Cualquier cosa que le diga algo a una persona** pasa por `NotificationHelper.createNotifications()` en el módulo de mensajería. Guarda una fila en `notifications` y escala de socket a push a correo, evaluando `PreferenceGateHelper` por canal, incluido `in_app` en el nivel 0.
2. **Cualquier cosa programada** es una `reminderDefinition` (a nivel de entidad o de alcance) que se expande en `reminderOccurrences` y la despacha `ReminderEngine.scan()` en un temporizador recurrente. Un expansor, un despachador, un solo registro de envíos (`reminderSentLog`). La única excepción es un push del personal programado desde la página **Móvil > Notificaciones push** de B1Admin o desde el diálogo **Notificar** de un grupo: es una fila de `scheduledNotifications` (audiencia `church` o `group`), enviada por `ScheduledNotificationHelper.dispatchDue()` en el temporizador de 1 minuto. Una fila que supera en más de 30 minutos su `sendAt` en el primer intento se marca como fallida con `missed send window` en lugar de enviarse tarde, y un envío fallido se reintenta hasta 3 veces. Los destinatarios se resuelven en el momento del envío mediante `PushAudienceHelper`, el mismo helper que usa el envío inmediato a grupos, y se entregan a través de `createNotifications()` como `churchPushNotification` (categoría de preferencia `announcements`) o `groupPushNotification`.
3. **El correo directo** solo existe detrás de `TransactionalEmailHelper.sendTransactional()`. Una regla de ESLint lo aplica en tiempo de compilación; consulta más abajo.

:::tip La puerta del correo se aplica con lint, no solo por convención
`Api/tools/eslint-rules/email-door.cjs` define `no-direct-email-helper`: cualquier llamada a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` fuera de `NotificationHelper.ts` o `TransactionalEmailHelper.ts` falla el lint. Si necesitas enviar un correo, enrútalo por el embudo (`createNotifications` con `emailImmediate`) o a través de `TransactionalEmailHelper.sendTransactional()`; no hay una tercera forma que pase el CI.
:::

## El embudo de notificaciones {#the-notification-funnel}

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
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

Para cada destinatario guarda una fila en `notifications` y llama a `attemptDeliveryWithEscalation`, que recorre la escalera de canales descrita abajo. Una fila todavía no leída para el mismo `(contentType, contentId)` impide que se vuelva a crear; esta protección de deduplicación se omite en los envíos con `emailImmediate` (desfases de recordatorios, "enviar correo a todos" del personal, los pasos de flujo de trabajo gestionan su propia deduplicación) y en los mensajes directos, que siempre notifican al socket.

`shared/helpers/NotificationService.ts` replica la misma firma (`NotificationServiceOptions`) para quienes llaman desde fuera del módulo de mensajería, y se registra en el módulo de mensajería al arrancar.

## Escalera de canales de entrega {#channel-escalation-chain}

La entrega comienza en un nivel (0 por defecto, o más alto para recordatorios y envíos explícitos) y solo pasa al siguiente canal si el anterior no tuvo éxito. Cada nivel está protegido por `PreferenceGateHelper` antes de intentar nada.

| Nivel | Canal | Comportamiento |
|-------|---------|----------|
| 0 | **in_app / socket** | Primero se revisa la compuerta `in_app`. Si se suprime (silenciado), la fila se guarda con `isNew=false` y la entrega se detiene por completo: sin notificación al socket, sin insignia, sin más escalamiento. En caso contrario, el servidor busca conexiones de socket abiertas en la sala `alerts` de la persona y envía un marco `notification` (o `privateMessage`). Para las notificaciones ordinarias, una entrega exitosa por socket detiene la cadena aquí: el temporizador de 30 minutos vuelve a revisar los elementos no leídos y los escala después. Los mensajes directos nunca se detienen en el socket: una PWA instalada puede mantener abierto el socket de alertas en segundo plano, lo que de otro modo suprimiría la notificación push a nivel del sistema operativo. |
| 1 | **push** | Protegido por `allowPush` / exclusión por categoría / horas de silencio. Envía tanto a los tokens de push de Expo como a las suscripciones de Web Push encontradas en las filas `devices` de la persona, deduplicando por endpoint y eliminando los tokens obsoletos en el proceso. |
| 2 | **correo** | Protegido por `emailFrequency` y por la exclusión por categoría. Los envíos inmediatos (`emailImmediate`) se renderizan de inmediato y escriben una fila en `deliveryLogs`; de lo contrario, la notificación queda pendiente para el resumen por lotes, descrito más abajo. |
| — | **sms** | No es un nivel de la escalera de escalamiento. El único productor de SMS protegido es el motor de recordatorios: cuando los `channels` de una definición incluyen `sms`, `ReminderEngine.sendSms()` envía un texto a cada destinatario **además** de la notificación push/correo (consulta [Recordatorios por texto](#text-reminders)). El envío masivo de textos (`TextingController` / `@churchapps/texting`), el envío **Enviar texto a voluntarios** del resumen de servicio (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`), y la acción de flujo de trabajo **Enviar texto** (`StepActionHelper.sendText` → `sendPersonText`) envían textos directamente a través del proveedor de la iglesia, así que las preferencias de notificación y las horas de silencio no aplican; solo se respeta la marca `optedOut` de la persona. |

Las notificaciones no leídas que quedan en socket o push son escaladas por el temporizador de 30 minutos (`NotificationHelper.escalateDelivery`). El correo por lotes lo envía `NotificationHelper.sendEmailNotifications(frequency)`, impulsado por la preferencia `emailFrequency` de cada persona: `individual` se ejecuta con el temporizador de 30 minutos, `daily` se ejecuta con el temporizador nocturno. (`weekly` es un valor válido de preferencia, pero todavía no tiene una ejecución por lotes propia).

## Motor de recordatorios {#reminder-engine}

Los recordatorios programados (recordatorios de eventos, fechas límite de tareas, recordatorios de asignaciones de servicio o planes) pasan todos por un motor generalizado en lugar de lógica de cron específica para cada función.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definiciones** (`reminderDefinitions`) son a nivel de entidad (`entityId` establecido: un evento, tarea o plan específico) o a nivel de alcance (`entityId` nulo, `scopeId` establecido, por ejemplo, cada plan dentro de un tipo de plan de servicio). Una definición contiene una lista separada por comas de desfases en minutos (`offsets`, por ejemplo, `"1440,60"` para uno y una hora antes), una hora local de envío (`sendLocalTime`), una lista separada por comas de canales (`channels`; incluir `email` dispara un correo enriquecido inmediato en el momento del envío), un `recipientMode` y un `message` personalizado opcional.

**La expansión** materializa las filas de disparo para el horizonte próximo (una ventana móvil de varios días). Se ejecuta con el temporizador nocturno y de forma síncrona cada vez que se guarda una definición, para que un recordatorio de un evento de última hora también se dispare. Las definiciones de alcance se distribuyen mediante el `loadScopeEntities` del adaptador, generando un conjunto de ocurrencias por cada entidad concreta; las ocurrencias a nivel de entidad usan la clave `definitionId:occurrenceISO:offset`, mientras que las ocurrencias de alcance se separan por el ID de la entidad para que nunca colisionen. Al insertar una ocurrencia se **reactiva** una fila cancelada previamente: cancelar y volver a expandir es la forma estándar de resincronizar un recordatorio después de que cambia la entidad subyacente; las filas ya `sent`, `failed` o `processing` no se modifican.

**Despacho** (`ReminderEngine.scan()`) se ejecuta con el temporizador de 30 minutos. Reclama las ocurrencias vencidas (un arrendamiento evita el procesamiento doble), carga los destinatarios a través del adaptador de la entidad, filtra a quienes ya están registrados en `reminderSentLog` para esa ocurrencia, y llama a `createNotifications` con `deliveryStartLevel: 1` (pasa directamente a push) más `emailImmediate`/`emailByPerson` cuando los canales de la definición incluyen correo.

### Recordatorios por texto {#text-reminders}

Cuando los `channels` de una definición incluyen `sms`, `scan()` llama a `ReminderEngine.sendSms()` después de crear las notificaciones push/correo, para los mismos destinatarios nuevos. El envío de textos requiere aceptación explícita de cada miembro:

- Cada destinatario pasa por `PreferenceGateHelper.evaluate(..., "sms", ...)`, así que `allowSms` debe estar activado (por defecto está desactivado y se establece desde el interruptor **Mensajes de texto** de B1App), y el canal `sms` de la categoría no debe estar desactivado por una anulación. `event_reminders`, `serving_schedule` y `tasks` incluyen `sms` tanto en `defaultChannels` como en `allowedChannels`.
- Se suprime a las personas sin `mobilePhone` o con `optedOut` activado. Si la iglesia no tiene un proveedor de mensajes de texto, el resto del lote se suprime con el motivo `no_provider`.
- El cuerpo lo construye `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, recortado a un segmento de 160 caracteres.
- Cada destinatario tiene su propia fila en `reminderSentLog` con `channel: "sms"` y estado `sent` / `suppressed` / `failed`, registrada por separado de la fila de push/correo, de modo que un texto fallido nunca vuelve a enviar el push ni el correo.

Los editores solo ofrecen **Texto** cuando `GET /messaging/texting/status` devuelve `{ enabled: true }` (el primer proveedor de mensajes de texto de la iglesia está habilitado).

**Baja con STOP.** `POST /messaging/texting/inbound/:churchId/:token` es un webhook anónimo que la iglesia pega en su proveedor (B1Admin muestra la URL obtenida de `GET /messaging/texting/inboundUrl` en la configuración de mensajes de texto). El token es un HMAC del ID de la iglesia (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` acepta campos de formulario al estilo Twilio y JSON al estilo Clearstream/TextInChurch; si la respuesta es exactamente una palabra de baja del operador (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), a cada persona no eliminada de la iglesia cuyo número móvil coincida se le asigna `people.optedOut = true` y `allowSms = false`. Otras respuestas se confirman y se ignoran.

Un bus de eventos interno reacciona a las mutaciones de entidades sin esperar a la expansión nocturna: los eventos de contenido (mediante el despachador de webhooks) y los eventos de actualización de planes y tareas disparan una re-expansión o cancelación inmediata de la entidad afectada, y una actualización de plan también vuelve a expandir las definiciones de alcance vinculadas a su tipo de plan.

### Adaptadores {#adapters}

El motor no depende de la entidad; cada tipo de entidad admitido se conecta mediante un adaptador (`helpers/adapters/`):

| Tipo de entidad | Adaptador | Notas |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinatarios limitados a los inscritos o a los miembros del grupo, según el evento y el `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Los destinatarios son las asignaciones Aceptadas + Sin confirmar de planes publicados (no borradores). Las asignaciones sin confirmar emitidas a través de un flujo de trabajo de confirmación de servicio se excluyen hasta que se aceptan (consulta más abajo). `buildEmails` llama a `DoingModuleGateway.buildPlanReminderEmails`, que genera posiciones, notas y un mensaje personalizado mediante `doing/helpers/PlanReminderEmailHelper`, incluidos los botones Aceptar/Rechazar firmados por `ReminderTokenHelper` que publican en un endpoint público de respuesta a la asignación. |
| `task` | `TaskReminderAdapter` | Los destinatarios son los responsables de la tarea. |

### Endpoints {#endpoints}

| Método | Ruta | Propósito |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Carga o guarda la definición de recordatorio de una entidad. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Carga o guarda una definición de recordatorio de alcance (heredado). |
| `DELETE` | `/messaging/reminders/:defId` | Elimina una definición y cancela sus ocurrencias pendientes. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Vista previa del número de destinatarios y de las próximas fechas de disparo de un recordatorio de evento antes de guardarlo. |
| `GET` | `/messaging/reminders/log` | Historial reciente de ocurrencias de recordatorios de una iglesia. |
| `POST` | `/messaging/reminders/mute` | Silencia los recordatorios de una entidad específica. |

Guardar una definición dispara una re-expansión síncrona para esa entidad o alcance, así los editores ven las "próximas fechas" actualizadas sin esperar al trabajo nocturno.

## Mensajes directos {#direct-messages}

Los mensajes directos usan el mismo embudo que todo lo demás, en lugar de una ruta de escalamiento separada. Cada conversación no leída obtiene una **fila sombra** en `notifications` (`contentType='privateMessage'`, `contentId` = el ID del mensaje privado, `category='direct_messages'`) que contiene todo el estado de entrega: escalamiento a socket/push/correo, seguimiento de lectura, todo. La tabla `privateMessages` conserva el contenido del mensaje y una columna `notifyPersonId`, que es la fuente de la insignia de no leídos y se limpia cuando el destinatario lee la conversación.

Las filas sombra son invisibles para la campana de notificaciones: se excluyen de la consulta del conteo de no leídos, de la consulta de la lista de notificaciones y de las consultas de marcar como leído y eliminar, que filtran por `contentType <> 'privateMessage'`. Cada aviso de DM llega al socket sin importar el estado de lectura (semántica de chat en vivo: sin deduplicación), y los DM nunca se detienen en la entrega por socket como las notificaciones ordinarias, ya que una PWA en segundo plano puede mantener un socket abierto y aun así necesitar una notificación push a nivel del sistema operativo. Si una persona silencia las notificaciones de DM, la fila sombra se aparca (`isNew=false`, `notifyPersonId` se limpia): sigue visible dentro de la propia conversación, pero sin insignias ni alertas.

## Preferencias y control de acceso {#preferences--gating}

Cada envío pasa por `PreferenceGateHelper.evaluate()`, una función pura (todo el estado se pasa como argumento, sin llamadas a la base de datos en la ruta crítica) que devuelve `allow`, `suppress` o `defer`. Las capas se evalúan en orden, y la primera que decide gana:

1. **Categoría bloqueada**: algunas categorías son obligatorias (nivel 0) y omiten todas las demás capas.
2. **Silencio general / desconexión de canal**: `masterMute`, `allowPush`, `allowSms` (desactivado por defecto: los miembros aceptan explícitamente) o `emailFrequency='never'` suprimen de inmediato.
3. **Horas de silencio**: solo para push y SMS (el correo se considera no intrusivo). Si la hora actual del reloj en la zona horaria de la persona cae dentro de su ventana de silencio, una categoría transaccional sí llega; una no transaccional se aplaza hasta el final de la ventana de silencio, calculado como un instante UTC consciente del horario de verano mediante `TimezoneHelper.wallClockToUtc`.
4. **Anulación de preferencia por categoría**: una exclusión explícita para un par categoría × canal; la ausencia significa el valor predeterminado de la categoría.
5. **Silencio por entidad**: un silencio registrado para una entidad específica (por ejemplo, un evento o un plan) restringe más que la configuración a nivel de categoría, pero solo aplica cuando quien llama proporciona un ID/tipo de entidad junto con la notificación.

Tablas involucradas: `notificationPreferences` (global: `masterMute`, `emailFrequency` con valores `individual|daily|weekly|never`, `allowPush`, ventana de horas de silencio y zona horaria, `allowSms`), `notificationPreferenceOverrides` (por categoría × canal) y `notificationEntityMutes` (por entidad).

Esta compuerta se aplica a in-app (nivel 0), push (nivel 1) y correo (nivel 2) dentro del embudo, incluidos los correos inmediatos de recordatorios y resúmenes, y a los textos de recordatorio en `ReminderEngine.sendSms()`. El correo transaccional (códigos de autenticación, restablecimiento de contraseña, invitaciones, recibos de donación) omite la compuerta por diseño; ese es el sentido de la segunda puerta.

### Flujos de confirmación de servicio {#serving-confirmation-workflows}

Un plan puede optar por un flujo de trabajo `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publicar/Notificar entonces llama a `POST /doing/plans/:id/issueRequests` en lugar de la notificación por asignación: cada nueva asignación Sin confirmar recibe `notified` + `confirmationWorkflowId` y una tarjeta de flujo de trabajo (`tasks.assignmentId`, `followupKey` único). La tarjeta envía una alerta solo para la app (`appOnly: true`, sin escalamiento a push/correo) y luego ejecuta las acciones `sendAssignmentRequest` del flujo de trabajo, que pasan por `MessagingModuleGateway.sendServingWorkflowMessage`: correo mediante `NotificationHelper.sendWorkflowEmail` (compuerta de preferencias + `ChurchEmailLimiter`, medido como `workflowEmail`), SMS mediante `sendPersonText` solo con `allowSms` y la compuerta de categoría `serving_schedule`. Aceptar/Rechazar (`assignment.updated` en el bus de eventos) cierra la tarjeta; el temporizador de 30 minutos (`AssignmentWorkflowHelper.processPending`) corrige los inicios y eventos perdidos, y convierte una solicitud sin respuesta al vencer el plazo de seguimiento en una tarea de revisión para el líder. Ciclo de vida completo: `Api/docs/assignment-confirmation-workflows.md`.

## Límites de correo escritos por la iglesia {#church-authored-email-limits}

El correo cuyo contenido escribió una iglesia sale desde la identidad compartida de SES de ChurchApps, por lo que se mide por iglesia mediante `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Cuatro rutas lo llaman: envíos a grupos/plantillas (`EmailTemplateController`, tipo de contenido `email`), correos de seguimiento de formularios (`FormSubmissionController`, `formFollowUp`), acciones de flujo de trabajo **Enviar correo** (`NotificationHelper` con `churchAuthored`, `workflowEmail`) y correos de solicitud de confirmación de servicio (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). El correo del sistema (códigos de autenticación, recibos, recordatorios) y las invitaciones a roles y grupos (`UserController.sendInviteEmail`, una plantilla fija) no se miden.

- **Compuerta de aprobación.** Una iglesia no envía nada hasta que un administrador del servidor establece `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Administrador del servidor → Iglesias → chip **Correo de grupos**). Las iglesias archivadas siempre están bloqueadas. El diálogo Enviar correo de B1Admin lee `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) y, si no está aprobada, muestra una tarjeta **Solicitar revisión** en lugar del editor. El editor de pasos del flujo de trabajo lee el mismo endpoint (abierto también a `tasks.admin` además de `groupMembers.edit`) para advertir en las acciones **Enviar correo** cuando la iglesia no está aprobada o está pausada. En el momento del envío, `MessagingModuleGateway.sendTemplatedEmail` devuelve `false` sin crear una notificación cuando `ChurchEmailLimiter.remaining()` es menor que 1, de modo que el historial de la tarjeta nunca afirma **Correo enviado** para un correo que se descartó. `POST /messaging/emailTemplates/requestApproval` envía un correo a soporte, como máximo una vez por iglesia por semana.
- **Cupo ganado.** Una iglesia aprobada obtiene `max(150, 2 × its best church-authored day in the prior 30 days)`, con un tope de 2,000 en un período móvil de 24 horas. Las 24 horas actuales se excluyen del "mejor día" para que una ráfaga no pueda elevar su propio límite.
- **Reservar, luego liquidar.** `reserve()` escribe una fila de `deliveryLogs` por destinatario antes de enviar, vuelve a comprobar el cupo contando esas filas, y se retracta si dos solicitudes superaron el límite a la vez (el envío devuelve 429). `settle()` marca cada fila como enviada o fallida.
- **Pausa por quejas.** La Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentada por SES → SNS) asocia cada rebote permanente o queja con la iglesia cuyo correo escrito por la iglesia llegó a esa dirección en ese momento, y lo guarda como `deliveryMethod` `sesBounce` / `sesComplaint`. Una iglesia se pausa con 2 o más quejas (≥ 0.3 % de los envíos) o 10 o más rebotes duros (≥ 5 %) en 7 días.

## Programación {#scheduling}

Tanto el motor de recordatorios como el resumen de notificaciones se ejecutan sobre temporizadores programados existentes, en lugar de introducir nueva infraestructura:

| Temporizador | Programación | Ejecuta |
|-------|----------|------|
| Temporizador de 30 minutos | cada 30 minutos | Escala las notificaciones no leídas; envía los resúmenes por correo de frecuencia `individual`; despacha las ocurrencias de recordatorios vencidas (`ReminderEngine.scan`); resúmenes de aprobaciones; ejecuciones de automatización pendientes |
| Temporizador de 1 minuto (`timerWebhooks`) | cada minuto | Envía las notificaciones push programadas vencidas (`ScheduledNotificationHelper.dispatchDue`, trabajo `scheduledNotifications`) |
| Temporizador nocturno | 05:00 UTC | Recordatorios de asistencia de grupos; avanza los servicios de transmisión recurrentes; actualiza las listas de actualización automática; expande las ocurrencias de recordatorios para el siguiente horizonte (`ReminderEngine.expandAll`); envía los resúmenes por correo de frecuencia `daily` |

Localmente, la misma lógica se puede disparar bajo demanda con `npm run timer:30min` y `npm run timer:midnight` desde el proyecto `Api`.

## Inventario de archivos {#file-inventory}

| Área | Archivos |
|------|------|
| Embudo | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrada compartida | `Api/src/shared/helpers/NotificationService.ts` |
| Puerta transaccional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regla de lint `Api/tools/eslint-rules/email-door.cjs` |
| Límites de correo de la iglesia | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Motor de recordatorios | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Mensajes de texto / baja con STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (**Enviar texto a voluntarios** del resumen de servicio) |
| Repositorios de recordatorios | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Correo de servicio/planes | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editores de recordatorios (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor de recordatorios / preferencias (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Páginas relacionadas {#related-pages}

- [Arquitectura en tiempo real](../realtime.md): el protocolo WebSocket y las primitivas del cliente (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) sobre las que se apoya el nivel de entrega in-app
- [Notificaciones web push](../web-push.md): la configuración de VAPID y la ruta de la API Push del navegador que usa el nivel de escalamiento push
- [Endpoints de mensajería](../api/endpoints/messaging.md): la superficie REST completa de mensajes, conversaciones, conexiones y rutas de notificaciones y recordatorios
