---
title: "Arquitectura de Notificaciones y Recordatorios"
---

# Arquitectura de Notificaciones y Recordatorios

<div class="article-intro">

Cada mensaje que un miembro de la iglesia ve fuera de la página que está mirando — un conteo de insignias, una notificación push, un correo electrónico de resumen — pasa a través de una de dos puertas en el MessagingApi. Esta página documenta el embudo, el motor de recordatorios que lo alimenta en un horario, y el modelo de preferencia que decide qué llega realmente a una persona.

</div>

## Descripción General — dos puertas

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Cualquier cosa que le diga algo a una persona** pasa a través de `NotificationHelper.createNotifications()` en el módulo de mensajería. Persiste una fila `notifications` y escala socket → push → email, evaluando `PreferenceGateHelper` por canal — incluyendo `in_app` en el nivel 0.
2. **Cualquier cosa programada** es una `reminderDefinition` (a nivel de entidad o nivel de alcance) expandida en `reminderOccurrences` y despachada por `ReminderEngine.scan()` en un temporizador recurrente. Un expansor, un despachador, un libro de envíos (`reminderSentLog`).
3. **Correo electrónico directo** existe solo detrás de `TransactionalEmailHelper.sendTransactional()`. Una regla de ESLint lo hace cumplir en tiempo de compilación — ver abajo.

:::tip La puerta de correo electrónico se aplica por lint, no solo por convención
`Api/tools/eslint-rules/email-door.cjs` define `no-direct-email-helper`: cualquier llamada a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` fuera de `NotificationHelper.ts` o `TransactionalEmailHelper.ts` falla lint. Si necesitas enviar un correo electrónico, enrutalo a través del embudo (`createNotifications` con `emailImmediate`) o a través de `TransactionalEmailHelper.sendTransactional()` — no hay una tercera forma que pase CI.
:::

## El embudo de notificación

`NotificationHelper.createNotifications()` es el punto de entrada único para cualquier cosa que no sea programada o transaccional:

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

Por cada destinatario guarda una fila en `notifications` y llama a `attemptDeliveryWithEscalation`, que recorre la escalera de canales abajo. Una fila aún no leída para el mismo `(contentType, contentId)` suprime la re-creación — esta guardia de dedup se omite para envíos `emailImmediate` (desplazamientos de recordatorio, personal "email a todos", pasos de flujo de trabajo tienen su propia dedup) y para mensajes directos, que siempre hacen ping al socket.

`shared/helpers/NotificationService.ts` refleja la misma firma (`NotificationServiceOptions`) para llamadores fuera del módulo de mensajería y se registra con el módulo de mensajería al arrancar.

## Cadena de escalación de canal

La entrega comienza en un nivel (0 por defecto, o superior para recordatorios/envíos explícitos) y solo procede al siguiente canal si el anterior no tuvo éxito. Cada nivel se bloquea por `PreferenceGateHelper` antes de que se intente nada.

| Nivel | Canal | Comportamiento |
|-------|---------|----------|
| 0 | **in_app / socket** | La puerta `in_app` se comprueba primero. Si se suprime (silencia), la fila se persiste con `isNew=false` y la entrega se detiene completamente — sin ping de socket, sin insignia, sin escalación adicional. De lo contrario, el servidor busca conexiones de socket abiertas para la sala `alerts` de la persona y presiona un marco `notification` (o `privateMessage`). Para notificaciones ordinarias, una entrega de socket exitosa detiene la cadena aquí — el temporizador de 30 minutos vuelve a verificar elementos no leídos y los escala más tarde. Los mensajes directos nunca se detienen en socket: una PWA instalada puede mantener abierto el socket de alertas en segundo plano, lo que de otro modo suprimiría el push a nivel del SO. |
| 1 | **push** | Bloqueado en `allowPush` / opción de categoría fuera / horas de silencio. Envía tanto a tokens de push de Expo como a suscripciones de Web Push encontradas en las filas `devices` de la persona, deduplicando por punto final y eliminando tokens obsoletos en el camino. |
| 2 | **email** | Bloqueado en `emailFrequency` y opción de categoría fuera. Los envíos inmediatos (`emailImmediate`) se renderizan de inmediato y escriben una fila `deliveryLogs`; de lo contrario, la notificación se deja pendiente para el resumen del lote, descrito a continuación. |
| — | **sms** | El cableado de preferencia (`allowSms`, listas de canales por categoría) ya cuenta con un canal SMS, pero ningún productor envía a través de él hoy — se mantiene reservado para el producto SMS masivo, que se ejecuta como un flujo separado y aislado a través de `TextingController` / `@churchapps/texting`. El paso de acción de flujo de trabajo **Enviar texto** (`StepActionHelper.sendText` → `MessagingModuleGateway.sendPersonText`) también omite este embudo: envía un texto a la persona de la tarjeta directamente a través del proveedor de la iglesia, así que las preferencias de notificación y horas de silencio no se aplican — solo se honra la bandera `optedOut` de la persona. |

Las notificaciones no leídas dejadas en socket o push se escalan por el temporizador de 30 minutos (`NotificationHelper.escalateDelivery`). El correo electrónico del lote se envía por `NotificationHelper.sendEmailNotifications(frequency)`, impulsado por la preferencia `emailFrequency` de cada persona: `individual` se ejecuta en el temporizador de 30 minutos, `daily` se ejecuta en el temporizador nocturno. (`weekly` es un valor de preferencia válido pero aún no tiene una ejecución dedicada.)

## Motor de Recordatorios

Los recordatorios programados — recordatorios de eventos, fechas de vencimiento de tareas, recordatorios de asignación de servicio/plan — pasan a través de un motor generalizado en lugar de lógica de cron específica por característica.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definiciones** (`reminderDefinitions`) son a nivel de entidad (`entityId` establecido — un evento, tarea o plan específico) o a nivel de alcance (`entityId` nulo, `scopeId` establecido — p. ej. cada plan bajo un tipo de plan de servicio). Una definición lleva un CSV de desplazamientos de minuto (`offsets`, p. ej. `"1440,60"` para un día y una hora antes), una hora de envío local (`sendLocalTime`), un CSV de canales (`channels` — incluyendo `email` desencadena un correo electrónico rico inmediato en el momento del envío), un `recipientMode`, y un `message` personalizado opcional.

**Expansión** materializa filas de fuego para el horizonte adelante (una ventana de múltiples días rodante). Se ejecuta en el temporizador nocturno, y sincrónicamente cada vez que se guarda una definición para que un recordatorio para un evento de último minuto aún dispare. Las definiciones de alcance se expanden a través del `loadScopeEntities` del adaptador, produciendo un conjunto de ocurrencias por entidad concreta; las ocurrencias a nivel de entidad usan la clave `definitionId:occurrenceISO:offset`, mientras que las ocurrencias de ámbito se espacian por id de entidad para que nunca choquen. Hacer una ocurrencia de upsert **resucita** una fila previamente cancelada — cancelar-luego-re-expandir es la forma estándar de re-sincronizar un recordatorio después de que la entidad subyacente cambia; las filas ya `sent`, `failed`, o `processing` se dejan sin tocar.

**Despacho** (`ReminderEngine.scan()`) se ejecuta en el temporizador de 30 minutos. Reclama ocurrencias debidas (un arrendamiento evita el doble procesamiento), carga destinatarios a través del adaptador de la entidad, filtra a cualquiera que ya se haya registrado en `reminderSentLog` para esa ocurrencia, y llama a `createNotifications` con `deliveryStartLevel: 1` (saltar directamente a push) más `emailImmediate`/`emailByPerson` cuando los canales de la definición incluyen correo electrónico.

Un bus de eventos interno reacciona a mutaciones de entidades sin esperar a la expansión nocturna: eventos de contenido (a través del despachador de webhook) y eventos de actualización de plan/tarea desencadenan re-expansión o cancelación inmediata para la entidad afectada, y una actualización de plan también re-expande cualquier definición de alcance vinculada a su tipo de plan.

### Adaptadores

El motor es agnóstico de entidades; cada tipo de entidad admitida se conecta a través de un adaptador (`helpers/adapters/`):

| Tipo de entidad | Adaptador | Notas |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Los destinatarios se limitan a los inscritos o miembros del grupo dependiendo del evento y `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Los destinatarios son asignaciones de plan Aceptadas + No confirmadas. `buildEmails` llama a `DoingModuleGateway.buildPlanReminderEmails`, que renderiza posiciones, notas, y un mensaje personalizado a través de `doing/helpers/PlanReminderEmailHelper`, incluyendo botones Aceptar/Rechazar firmados por `ReminderTokenHelper` que se publican en un punto final de respuesta de asignación pública. |
| `task` | `TaskReminderAdapter` | Los destinatarios son los asignados de la tarea. |

### Puntos finales

| Método | Ruta | Propósito |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Cargar o guardar la definición de recordatorio para una entidad. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Cargar o guardar una definición de recordatorio a nivel de alcance (heredado). |
| `DELETE` | `/messaging/reminders/:defId` | Eliminar una definición y cancelar sus ocurrencias pendientes. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Vista previa del número de destinatarios y próximas veces de disparo para un recordatorio de evento antes de guardar. |
| `GET` | `/messaging/reminders/log` | Historial reciente de ocurrencias de recordatorio para una iglesia. |
| `POST` | `/messaging/reminders/mute` | Silenciar recordatorios para una entidad específica. |

Guardar una definición desencadena una re-expansión sincrónica para esa entidad o alcance, por lo que los editores ven "próximos disparos" hasta la fecha sin esperar al trabajo nocturno.

## Mensajes directos

Los mensajes directos caben en el mismo embudo que todo lo demás en lugar de una ruta de escalación separada. Cada conversación no leída obtiene una **fila de sombra** en `notifications` (`contentType='privateMessage'`, `contentId` = el id del mensaje privado, `category='direct_messages'`) que posee todo el estado de entrega — escalación socket/push/email, seguimiento de lectura, todo. La tabla `privateMessages` en sí mantiene la carga del mensaje y una columna `notifyPersonId`, que es la fuente de la insignia no leída y se borra cuando el destinatario lee la conversación.

Las filas de sombra son invisibles para la campana de notificaciones: se excluyen de la consulta de conteo no leído, la consulta de lista de notificación, y las consultas de marcar-como-leído/eliminar, todas las cuales filtran `contentType <> 'privateMessage'`. Cada ping de DM cae en el socket independientemente del estado no leído (semántica de chat en vivo — sin dedup), y los DM nunca se detienen en la entrega de socket de la forma en que lo hacen las notificaciones ordinarias, ya que una PWA en segundo plano puede mantener un socket abierto mientras aún necesita un push a nivel del SO. Si una persona silencia las notificaciones de DM, la fila de sombra se estaciona (`isNew=false`, `notifyPersonId` despejado) — todavía visible dentro de la conversación en sí, solo sin insignias ni alertas.

## Preferencias y bloqueo

Cada envío pasa a través de `PreferenceGateHelper.evaluate()`, una función pura (todo el estado se pasa adentro, sin llamadas a BD en la ruta caliente) que devuelve `allow`, `suppress`, o `defer`. Las capas se ejecutan en orden, y la primera que decide gana:

1. **Categoría bloqueada** — algunas categorías son obligatorias (nivel 0) y eluden todas las otras capas.
2. **Silencio maestro / apagón de canal** — `masterMute`, `allowPush`, `allowSms`, o `emailFrequency='never'` suprimen rotundamente.
3. **Horas de silencio** — solo push y SMS (el correo electrónico se considera no intrusivo). Si la hora actual del reloj de pared en la zona horaria de la persona cae en su ventana de silencio, una categoría transaccional aún pasa; una no transaccional se aplaza hasta el final de la ventana de silencio, computada como un instante UTC correcto de DST a través de `TimezoneHelper.wallClockToUtc`.
4. **Anulación de preferencia por categoría** — una exclusión explícita para un par de categoría × canal; la ausencia significa el predeterminado de la categoría.
5. **Silencio por entidad** — un silencio registrado contra una entidad específica (p. ej. un evento, un plan) restringe más allá de la configuración a nivel de categoría, pero solo se aplica cuando el llamador suministra un id/tipo de entidad junto con la notificación.

Tablas involucradas: `notificationPreferences` (global — `masterMute`, `emailFrequency` de `individual|daily|weekly|never`, `allowPush`, ventana de horas de silencio + zona horaria, `allowSms`), `notificationPreferenceOverrides` (por categoría × canal), y `notificationEntityMutes` (por entidad).

Este bloqueo se aplica para in-app (nivel 0), push (nivel 1), y correo electrónico (nivel 2) dentro del embudo — incluyendo correos electrónicos de recordatorio/resumen inmediatos. El correo electrónico transaccional (códigos de autenticación, restablecimiento de contraseña, invitaciones, recibos de donación) lo omite por diseño; ese es el punto entero de la segunda puerta.

## Límites de correo electrónico redactados por iglesia

El correo electrónico cuyo contenido escribió una iglesia sale de la identidad SES compartida de ChurchApps, por lo que se mide por iglesia por `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Cuatro rutas lo llaman: envíos de grupo/plantilla (`EmailTemplateController`, tipo de contenido `email`), correos electrónicos de seguimiento de formulario (`FormSubmissionController`, `formFollowUp`), acciones de flujo de trabajo **Enviar correo electrónico** (`NotificationHelper` con `churchAuthored`, `workflowEmail`), e invitaciones de cuenta B1 (`UserController.sendInviteEmail`, `invite`). El correo del sistema (códigos de autenticación, recibos, recordatorios) no se mide.

- **Puerta de aprobación.** Una iglesia no envía nada hasta que un administrador del servidor establece `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chip **Correo electrónico de grupo**). Las iglesias archivadas siempre se bloquean. El diálogo Enviar correo electrónico de B1Admin lee `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) y, cuando no se aprueba, muestra una tarjeta **Solicitar revisión** en lugar del editor. `POST /messaging/emailTemplates/requestApproval` envía apoyo, a lo máximo una vez por iglesia por semana.
- **Asignación obtenida.** Una iglesia aprobada obtiene `max(150, 2 × its best church-authored day in the prior 30 days)`, limitado a 2,000 por 24 horas rodante. Las actuales 24 horas se excluyen de "mejor día" para que una ráfaga no pueda elevar su propio límite.
- **Reserva, luego liquida.** `reserve()` escribe una fila `deliveryLogs` por destinatario antes de enviar, vuelve a verificar la asignación con esas filas contadas, y se retira si dos solicitudes pasaron el límite (el envío devuelve 429). `settle()` marca cada fila enviada o fallida.
- **Pausa de queja.** El Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentado por SES → SNS) fija cada rebote permanente o queja a la iglesia cuyo correo electrónico redactado por iglesia llegó a esa dirección alrededor de ese momento, almacenado como `deliveryMethod` `sesBounce` / `sesComplaint`. Una iglesia se pausa en 2+ quejas (≥ 0.3% de envíos) o 10+ rebotes duros (≥ 5%) en 7 días.

## Programación

Tanto el motor de recordatorios como el resumen de notificación se montan en temporizadores programados existentes en lugar de introducir nueva infraestructura:

| Temporizador | Cronograma | Se ejecuta |
|-------|----------|------|
| Temporizador de 30 minutos | cada 30 minutos | Escalar notificaciones no leídas; enviar correos electrónicos de resumen de frecuencia `individual`; despachar ocurrencias de recordatorio vencidas (`ReminderEngine.scan`); resúmenes de aprobación; ejecuciones de automatización vencidas |
| Temporizador nocturno | 05:00 UTC | Recordatorios de asistencia de grupo; avanzar servicios de transmisión recurrente; actualizar listas de actualización automática; expandir ocurrencias de recordatorio para el próximo horizonte (`ReminderEngine.expandAll`); enviar correos electrónicos de resumen de frecuencia `daily` |

Localmente, la misma lógica se puede desencadenar bajo demanda con `npm run timer:30min` y `npm run timer:midnight` desde el proyecto `Api`.

## Inventario de archivo

| Área | Archivos |
|------|-------|
| Embudo | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrada compartida | `Api/src/shared/helpers/NotificationService.ts` |
| Puerta transaccional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regla lint `Api/tools/eslint-rules/email-door.cjs` |
| Límites de correo electrónico de iglesia | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Motor de recordatorios | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Repositorios de recordatorios | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Correo electrónico de servicio/plan | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editores de recordatorios (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Editor de recordatorios / preferencias (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Páginas Relacionadas

- [Real-time Architecture](../realtime) — el protocolo WebSocket y los primitivos de cliente (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) que la ruta de entrega in_app monta en
- [Web Push Notifications](../web-push) — configuración de VAPID y la ruta de API Push del navegador utilizada por el nivel de escalación de push
- [Messaging Endpoints](../api/endpoints/messaging) — superficie REST completa para mensajes, conversaciones, conexiones, y rutas de notificación/recordatorio
