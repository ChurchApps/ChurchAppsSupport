---
title: "Arquitectura de notificaciones y recordatorios"
---

# Arquitectura de notificaciones y recordatorios

<div class="article-intro">

Todo mensaje que un miembro de la iglesia ve fuera de la página que está mirando (un contador de insignias, una notificación push, un correo de resumen) pasa por una de las dos puertas de MessagingApi. Esta página documenta ese embudo, el motor de recordatorios que lo alimenta según un calendario y el modelo de preferencias que decide qué llega realmente a una persona.

</div>

## Descripción general: dos puertas

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Cualquier cosa que le diga algo a una persona** pasa por `NotificationHelper.createNotifications()` en el módulo de mensajería. Guarda una fila en `notifications` y escala por socket → push → correo, evaluando `PreferenceGateHelper` por canal, incluido `in_app` en el nivel 0.
2. **Cualquier cosa programada** es una `reminderDefinition` (a nivel de entidad o de ámbito) que se expande en `reminderOccurrences` y se despacha con `ReminderEngine.scan()` mediante un temporizador recurrente. Un expansor, un despachador y un solo registro de envíos (`reminderSentLog`).
3. **El correo directo** existe solo detrás de `TransactionalEmailHelper.sendTransactional()`. Una regla de ESLint lo impone en tiempo de compilación; véase más abajo.

:::tip La puerta del correo se impone con lint, no es solo una convención
`Api/tools/eslint-rules/email-door.cjs` define `no-direct-email-helper`: cualquier llamada a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` fuera de `NotificationHelper.ts` o `TransactionalEmailHelper.ts` falla el lint. Si necesitas enviar un correo, hazlo a través del embudo (`createNotifications` con `emailImmediate`) o mediante `TransactionalEmailHelper.sendTransactional()`; no hay una tercera vía que pase la CI.
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
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

Para cada destinatario guarda una fila en `notifications` y llama a `attemptDeliveryWithEscalation`, que recorre la escalera de canales descrita más abajo. Una fila todavía no leída para el mismo `(contentType, contentId)` impide volver a crearla; esta protección contra duplicados se omite en los envíos con `emailImmediate` (desfases de recordatorios, «enviar correo a todos» del personal, los pasos de flujo de trabajo gestionan su propia deduplicación) y en los mensajes directos, que siempre notifican por el socket.

`shared/helpers/NotificationService.ts` replica la misma firma (`NotificationServiceOptions`) para los llamadores fuera del módulo de mensajería y se registra en el módulo de mensajería durante el arranque.

## Escalera de canales de entrega

La entrega empieza en un nivel (0 por defecto, o más alto en recordatorios o envíos explícitos) y solo pasa al siguiente canal si el anterior no tuvo éxito. Cada nivel pasa primero por `PreferenceGateHelper` antes de intentar nada.

| Nivel | Canal | Comportamiento |
|-------|---------|----------|
| 0 | **in_app / socket** | Primero se comprueba la puerta `in_app`. Si está suprimida (silenciada), la fila se guarda con `isNew=false` y la entrega se detiene por completo: sin aviso por socket, sin insignia, sin más escalado. En caso contrario, el servidor busca las conexiones de socket abiertas de la sala `alerts` de la persona y envía un marco `notification` (o `privateMessage`). Para las notificaciones ordinarias, una entrega correcta por socket detiene la cadena aquí: el temporizador de 30 minutos vuelve a revisar los elementos no leídos y los escala más tarde. Los mensajes directos nunca se detienen en el socket: una PWA instalada puede mantener abierto el socket de alertas en segundo plano, lo que de otro modo suprimiría la notificación push a nivel del sistema operativo. |
| 1 | **push** | Condicionado por `allowPush`, la exclusión por categoría y las horas de silencio. Envía tanto a los tokens push de Expo como a las suscripciones Web Push encontradas en las filas `devices` de la persona, eliminando duplicados por endpoint y depurando los tokens obsoletos por el camino. |
| 2 | **correo** | Condicionado por `emailFrequency` y por la exclusión por categoría. Los envíos inmediatos (`emailImmediate`) se generan en el momento y escriben una fila en `deliveryLogs`; en los demás casos la notificación queda pendiente para el resumen por lotes que se describe a continuación. |
| — | **sms** | No es un nivel de la escalera. El único productor de SMS condicionado es el motor de recordatorios: cuando los `channels` de una definición incluyen `sms`, `ReminderEngine.sendSms()` envía un mensaje de texto a cada destinatario **además de** la notificación push o de correo (véase [Recordatorios por SMS](#text-reminders)). La mensajería masiva (`TextingController` / `@churchapps/texting`), el envío **Text Volunteers** de la vista general de servicios (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) y la acción de flujo de trabajo **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) envían texto directamente a través del proveedor de la iglesia; por tanto, las preferencias de notificación y las horas de silencio no se aplican a ellos, y solo se respeta el indicador `optedOut` de la persona. |

Las notificaciones no leídas que quedan en el socket o en push las escala el temporizador de 30 minutos (`NotificationHelper.escalateDelivery`). El correo por lotes lo envía `NotificationHelper.sendEmailNotifications(frequency)`, impulsado por la preferencia `emailFrequency` de cada persona: `individual` se ejecuta en el temporizador de 30 minutos y `daily` en el temporizador nocturno. (`weekly` es un valor válido de preferencia, pero todavía no tiene una ejecución por lotes propia).

## Motor de recordatorios

Los recordatorios programados (de eventos, fechas límite de tareas, recordatorios de asignaciones de servicio o de planes) pasan todos por un único motor generalizado, en lugar de por una lógica cron específica para cada funcionalidad.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definiciones** (`reminderDefinitions`) son a nivel de entidad (`entityId` establecido: un evento, tarea o plan concreto) o a nivel de ámbito (`entityId` nulo, `scopeId` establecido; por ejemplo, todos los planes de un tipo de plan de servicio). Una definición contiene una lista separada por comas de desfases en minutos (`offsets`, por ejemplo `"1440,60"` para un día y una hora antes), una hora local de envío (`sendLocalTime`), una lista separada por comas de canales (`channels`; incluir `email` activa un correo enriquecido inmediato en el momento del envío), un `recipientMode` y un `message` personalizado opcional.

**La expansión** materializa las filas de disparo para el horizonte siguiente (una ventana móvil de varios días). Se ejecuta en el temporizador nocturno y de forma síncrona cada vez que se guarda una definición, para que un recordatorio de un evento de última hora también se dispare. Las definiciones de ámbito se distribuyen mediante `loadScopeEntities` del adaptador, generando un conjunto de ocurrencias por cada entidad concreta; las ocurrencias de entidad usan la clave `definitionId:occurrenceISO:offset`, mientras que las ocurrencias de ámbito se separan por id de entidad para que nunca colisionen. Al insertar una ocurrencia se **resucita** una fila cancelada previamente: cancelar y volver a expandir es la forma estándar de resincronizar un recordatorio cuando cambia la entidad subyacente; las filas ya `sent`, `failed` o `processing` no se tocan.

**El despacho** (`ReminderEngine.scan()`) se ejecuta en el temporizador de 30 minutos. Reclama las ocurrencias vencidas (un arrendamiento evita el doble procesamiento), carga los destinatarios a través del adaptador de la entidad, descarta a quienes ya aparecen en `reminderSentLog` para esa ocurrencia y llama a `createNotifications` con `deliveryStartLevel: 1` (pasa directamente a push) más `emailImmediate`/`emailByPerson` cuando los canales de la definición incluyen correo.

### Recordatorios por SMS

Cuando los `channels` de una definición incluyen `sms`, `scan()` llama a `ReminderEngine.sendSms()` después de crear las notificaciones push o de correo, para los mismos destinatarios nuevos. El envío de mensajes de texto es voluntario para cada miembro:

- Cada destinatario pasa por `PreferenceGateHelper.evaluate(..., "sms", ...)`, así que `allowSms` debe estar activado (está desactivado por defecto y se activa con el interruptor **Text messages** de B1App) y el canal `sms` de la categoría no debe estar desactivado por una anulación. `event_reminders`, `serving_schedule` y `tasks` incluyen `sms` tanto en `defaultChannels` como en `allowedChannels`.
- Se suprime a las personas sin `mobilePhone` o con `optedOut` activado. Si la iglesia no tiene un proveedor de mensajes de texto, el resto del lote se suprime con el motivo `no_provider`.
- El cuerpo lo genera `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, recortado a un solo segmento de 160 caracteres.
- Cada destinatario recibe su propia fila de `reminderSentLog` con `channel: "sms"` y estado `sent` / `suppressed` / `failed`, separada de la fila de push o de correo; así, un texto fallido nunca vuelve a enviar el push ni el correo.

Los editores solo ofrecen **Text** cuando `GET /messaging/texting/status` devuelve `{ enabled: true }` (el primer proveedor de mensajes de texto de la iglesia está activo).

**Baja por STOP.** `POST /messaging/texting/inbound/:churchId/:token` es un webhook anónimo que la iglesia pega en su proveedor (B1Admin muestra la URL que devuelve `GET /messaging/texting/inboundUrl` en los ajustes de mensajes de texto). El token es un HMAC del id de la iglesia (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` acepta campos de formulario al estilo de Twilio y JSON al estilo de Clearstream/TextInChurch; si la respuesta es exactamente una palabra de baja estándar del operador (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), cada persona no eliminada de la iglesia cuyo número de móvil coincida recibe `people.optedOut = true` y `allowSms = false`. Las demás respuestas se confirman y se ignoran.

Un bus de eventos interno reacciona a las modificaciones de entidades sin esperar a la expansión nocturna: los eventos de contenido (a través del despachador de webhooks) y los eventos de actualización de planes y tareas activan una nueva expansión o cancelación inmediata de la entidad afectada, y una actualización de plan también vuelve a expandir las definiciones de ámbito vinculadas a su tipo de plan.

### Adaptadores

El motor es independiente de la entidad; cada tipo de entidad compatible se conecta mediante un adaptador (`helpers/adapters/`):

| Tipo de entidad | Adaptador | Notas |
|-------------|-----------|-------|
| `event` | `EventReminderAdapter` | Destinatarios limitados a los inscritos o a los miembros del grupo, según el evento y el `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Los destinatarios son las asignaciones de plan Accepted + Unconfirmed. `buildEmails` llama a `DoingModuleGateway.buildPlanReminderEmails`, que genera las posiciones, las notas y un mensaje personalizado mediante `doing/helpers/PlanReminderEmailHelper`, incluidos los botones Accept/Decline firmados por `ReminderTokenHelper` que envían datos a un endpoint público de respuesta a la asignación. |
| `task` | `TaskReminderAdapter` | Los destinatarios son el/los asignado(s) de la tarea. |

### Endpoints

| Método | Ruta | Finalidad |
|--------|------|-----------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Cargar o guardar la definición de recordatorio de una entidad. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Cargar o guardar una definición de recordatorio de ámbito (heredada). |
| `DELETE` | `/messaging/reminders/:defId` | Eliminar una definición y cancelar sus ocurrencias pendientes. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Previsualizar el número de destinatarios y los próximos disparos de un recordatorio de evento antes de guardarlo. |
| `GET` | `/messaging/reminders/log` | Historial reciente de ocurrencias de recordatorios de una iglesia. |
| `POST` | `/messaging/reminders/mute` | Silenciar los recordatorios de una entidad concreta. |

Guardar una definición desencadena una nueva expansión síncrona para esa entidad o ámbito, de modo que los editores vean los «próximos disparos» actualizados sin esperar al trabajo nocturno.

## Mensajes directos

Los mensajes directos utilizan el mismo embudo que el resto, en lugar de una ruta de escalado aparte. Cada conversación no leída tiene una **fila sombra** en `notifications` (`contentType='privateMessage'`, `contentId` = el id del mensaje privado, `category='direct_messages'`) que es la dueña de todo el estado de entrega: escalado por socket, push y correo, seguimiento de lectura, todo. La tabla `privateMessages` conserva el contenido del mensaje y una columna `notifyPersonId`, que es el origen de la insignia de no leídos y se borra cuando el destinatario lee la conversación.

Las filas sombra son invisibles para la campanita de notificaciones: se excluyen de la consulta de recuento de no leídos, de la consulta de la lista de notificaciones y de las consultas de marcar como leído y de eliminación, que filtran todas por `contentType <> 'privateMessage'`. Cada aviso de DM llega al socket independientemente del estado de lectura (semántica de chat en vivo, sin deduplicación), y los DM nunca se detienen en la entrega por socket como hacen las notificaciones ordinarias, porque una PWA en segundo plano puede mantener abierto un socket y aun así necesitar una push a nivel del sistema operativo. Si una persona silencia las notificaciones de DM, la fila sombra se aparca (`isNew=false`, `notifyPersonId` borrado): sigue siendo visible dentro de la propia conversación, pero sin insignias ni alertas.

## Preferencias y control

Cada envío pasa por `PreferenceGateHelper.evaluate()`, una función pura (todo el estado se pasa como argumento, sin llamadas a la base de datos en la ruta crítica) que devuelve `allow`, `suppress` o `defer`. Las capas se ejecutan en orden, y la primera que decide prevalece:

1. **Categoría bloqueada**: algunas categorías son obligatorias (nivel 0) y evitan todas las demás capas.
2. **Silencio general / corte de canal**: `masterMute`, `allowPush`, `allowSms` (desactivado por defecto; los miembros lo activan) o `emailFrequency='never'` suprimen directamente.
3. **Horas de silencio**: solo para push y SMS (el correo se considera no intrusivo). Si la hora de pared actual en la zona horaria de la persona cae dentro de su ventana de silencio, una categoría transaccional sigue llegando; una no transaccional se aplaza hasta el final de la ventana de silencio, calculado como un instante UTC correcto respecto al horario de verano mediante `TimezoneHelper.wallClockToUtc`.
4. **Anulación de preferencia por categoría**: una baja explícita para un par categoría × canal; la ausencia significa el valor por defecto de la categoría.
5. **Silencio por entidad**: un silencio registrado para una entidad concreta (por ejemplo, un evento o un plan) restringe más que el ajuste de categoría, pero solo se aplica cuando el llamador proporciona un id y tipo de entidad junto con la notificación.

Tablas implicadas: `notificationPreferences` (globales: `masterMute`, `emailFrequency` con valores `individual|daily|weekly|never`, `allowPush`, ventana de horas de silencio y zona horaria, `allowSms`), `notificationPreferenceOverrides` (por categoría × canal) y `notificationEntityMutes` (por entidad).

Esta puerta se aplica a las notificaciones en la aplicación (nivel 0), push (nivel 1) y correo (nivel 2) dentro del embudo, incluidos los correos inmediatos de recordatorios y de resúmenes, y a los mensajes de texto de recordatorio en `ReminderEngine.sendSms()`. El correo transaccional (códigos de autenticación, restablecimientos de contraseña, invitaciones, recibos de donación) la omite por diseño; ese es todo el sentido de la segunda puerta.

## Límites del correo redactado por la iglesia

El correo cuyo contenido redacta una iglesia se envía desde la identidad SES compartida de ChurchApps, por lo que se mide por iglesia mediante `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Tres rutas lo utilizan: envíos a grupos y plantillas (`EmailTemplateController`, tipo de contenido `email`), correos de seguimiento de formularios (`FormSubmissionController`, `formFollowUp`) y las acciones **Send email** de flujos de trabajo (`NotificationHelper` con `churchAuthored`, `workflowEmail`). El correo del sistema (códigos de autenticación, recibos, recordatorios) y las invitaciones a roles y grupos (`UserController.sendInviteEmail`, una plantilla fija) no se miden.

- **Puerta de aprobación.** Una iglesia no envía nada hasta que un administrador del servidor establece `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chip **Group Email**). Las iglesias archivadas siempre están bloqueadas. El cuadro de diálogo Send Email de B1Admin lee `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) y, si la iglesia no está aprobada, muestra una tarjeta **Request review** en lugar del editor. `POST /messaging/emailTemplates/requestApproval` envía un correo a soporte, como máximo una vez por iglesia y semana.
- **Cuota ganada.** Una iglesia aprobada obtiene `max(150, 2 × su mejor día de correo redactado por la iglesia en los 30 días anteriores)`, con un límite de 2.000 en cualquier periodo móvil de 24 horas. Las últimas 24 horas se excluyen del cálculo de «mejor día», para que una ráfaga no pueda elevar su propio límite.
- **Reservar y luego liquidar.** `reserve()` escribe una fila de `deliveryLogs` por destinatario antes de enviar, vuelve a comprobar la cuota contando esas filas y se retira si dos solicitudes compitieron y superaron el límite (el envío devuelve 429). `settle()` marca cada fila como enviada o fallida.
- **Pausa por quejas.** La Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentada por SES → SNS) asigna cada rebote permanente o queja a la iglesia cuyo correo redactado por la iglesia llegó a esa dirección en ese momento aproximado, almacenado como `deliveryMethod` `sesBounce` / `sesComplaint`. Una iglesia se pausa al alcanzar 2 o más quejas (≥ 0,3 % de los envíos) o 10 o más rebotes definitivos (≥ 5 %) en 7 días.

## Programación

Tanto el motor de recordatorios como el resumen de notificaciones se apoyan en temporizadores programados existentes, en lugar de introducir infraestructura nueva:

| Temporizador | Programación | Ejecuta |
|-------|----------|------|
| Temporizador de 30 minutos | cada 30 minutos | Escalar notificaciones no leídas; enviar los correos de resumen de frecuencia `individual`; despachar las ocurrencias de recordatorio vencidas (`ReminderEngine.scan`); resúmenes de aprobación; ejecuciones de automatización pendientes |
| Temporizador nocturno | 05:00 UTC | Recordatorios de asistencia de grupos; avanzar los servicios de transmisión recurrentes; actualizar las listas de actualización automática; expandir las ocurrencias de recordatorio hasta el siguiente horizonte (`ReminderEngine.expandAll`); enviar los correos de resumen de frecuencia `daily` |

En local, la misma lógica puede ejecutarse bajo demanda con `npm run timer:30min` y `npm run timer:midnight` desde el proyecto `Api`.

## Inventario de archivos

| Área | Archivos |
|------|------|
| Embudo | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrada compartida | `Api/src/shared/helpers/NotificationService.ts` |
| Puerta transaccional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regla de lint `Api/tools/eslint-rules/email-door.cjs` |
| Límites de correo de la iglesia | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Motor de recordatorios | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Mensajes de texto / baja por STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (**Text Volunteers** de la vista general de servicios) |
| Repositorios de recordatorios | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Correo de servicios/planes | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editores de recordatorios (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor de recordatorios / preferencias (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Páginas relacionadas

- [Arquitectura en tiempo real](../realtime): el protocolo WebSocket y las primitivas del cliente (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) sobre las que se apoya el nivel de entrega en la aplicación
- [Notificaciones push web](../web-push): configuración de VAPID y la ruta de la API Push del navegador que usa el nivel de escalado push
- [Endpoints de mensajería](../api/endpoints/messaging): superficie REST completa para mensajes, conversaciones, conexiones y las rutas de notificaciones y recordatorios
