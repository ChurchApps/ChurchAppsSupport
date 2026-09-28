---
title: "Arquitectura de Notificaciones y Recordatorios"
---

# Arquitectura de Notificaciones y Recordatorios

<div class="article-intro">

Cada mensaje que un miembro de la iglesia ve fuera de la página que está mirando — un recuento de insignias, una notificación push, un correo electrónico de resumen — pasa a través de una de dos puertas en MessagingApi. Esta página documenta el embudo, el motor de recordatorios que lo alimenta en un cronograma, y el modelo de preferencia que decide qué realmente llega a una persona.

</div>

## Descripción general — dos puertas

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Cualquier cosa que le dice algo a una persona** va a través de `NotificationHelper.createNotifications()` en el módulo de mensajería. Persiste una fila `notifications` y escala socket → push → email, evaluando `PreferenceGateHelper` por canal — incluyendo `in_app` en nivel 0.
2. **Cualquier cosa programada** es una `reminderDefinition` (a nivel de entidad o de alcance) expandida en `reminderOccurrences` y distribuida por `ReminderEngine.scan()` en un temporizador recurrente. Un expansor, un distribuidor, un libro mayor de envío (`reminderSentLog`).
3. **Correo directo** existe solo detrás de `TransactionalEmailHelper.sendTransactional()`. Una regla ESLint lo aplica en tiempo de compilación — ver abajo.

:::tip La puerta de correo se aplica con lint, no solo por convención
`Api/tools/eslint-rules/email-door.cjs` define `no-direct-email-helper`: cualquier llamada a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` fuera de `NotificationHelper.ts` o `TransactionalEmailHelper.ts` falla lint. Si necesitas enviar un correo, enrutalo a través del embudo (`createNotifications` con `emailImmediate`) o a través de `TransactionalEmailHelper.sendTransactional()` — no hay tercera forma que pase CI.
:::

## El embudo de notificaciones

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

Para cada destinatario guarda una fila en `notifications` y llama a `attemptDeliveryWithEscalation`, que recorre la escalera de canales a continuación. Una fila aún no leída para el mismo `(contentType, contentId)` suprime la recreación — esta protección de deduplicación se salta para envíos `emailImmediate` (desplazamientos de recordatorio, staff "enviar a todos", los pasos del flujo de trabajo tienen su propia deduplicación) y para mensajes directos, que siempre hacen ping en el socket.

`shared/helpers/NotificationService.ts` refleja la misma firma (`NotificationServiceOptions`) para llamadas fuera del módulo de mensajería y se registra con el módulo de mensajería al arrancar.

## Cadena de escalada de canales

La entrega comienza en un nivel (0 por defecto, o superior para recordatorios/envíos explícitos) y solo procede al siguiente canal si el anterior no tuvo éxito. Cada nivel se bloquea por `PreferenceGateHelper` antes de que se intente cualquier cosa.

| Nivel | Canal | Comportamiento |
|-------|---------|----------|
| 0 | **in_app / socket** | La puerta `in_app` se verifica primero. Si se suprime (silenciada), la fila se persiste con `isNew=false` y la entrega se detiene completamente — sin ping de socket, sin insignia, sin escalada adicional. De lo contrario el servidor busca conexiones de socket abiertas para la sala `alerts` de la persona e impulsa un marco `notification` (o `privateMessage`). Para notificaciones ordinarias, una entrega de socket exitosa detiene la cadena aquí — el temporizador de 30 minutos vuelve a verificar elementos no leídos y los escala después. Los mensajes directos nunca se detienen en socket: una PWA instalada puede mantener el socket de alerta abierto en segundo plano, lo que de lo contrario suprimiría el push a nivel de SO. |
| 1 | **push** | Bloqueado en `allowPush` / exclusión de categoría / horas tranquilas. Envía a tokens de push de Expo y suscripciones de Web Push encontradas en las filas `devices` de la persona, deduplicando por punto final y eliminando tokens obsoletos en el camino. |
| 2 | **email** | Bloqueado en `emailFrequency` y exclusión de categoría. Los envíos inmediatos (`emailImmediate`) se representan de inmediato y escriben una fila `deliveryLogs`; de lo contrario la notificación se deja pendiente para el resumen de lote, descrito a continuación. |
| — | **sms** | La tubería de preferencia (`allowSms`, listas de canales por categoría) ya cuenta un canal SMS, pero ningún productor envía a través de hoy — permanece reservado para el producto de SMS masivo, que se ejecuta como un flujo separado y aislado vía `TextingController` / `@churchapps/texting`. |

Las notificaciones no leídas dejadas en socket o push se escalan por el temporizador de 30 minutos (`NotificationHelper.escalateDelivery`). El correo de lote se envía por `NotificationHelper.sendEmailNotifications(frequency)`, impulsado por la preferencia `emailFrequency` de cada persona: `individual` se ejecuta en el temporizador de 30 minutos, `daily` se ejecuta en el temporizador nocturno. (`weekly` es un valor de preferencia válido pero aún no tiene una ejecución de lote dedicada.)

## Motor de Recordatorios

Los recordatorios programados — recordatorios de eventos, fechas de vencimiento de tareas, recordatorios de asignación de servicio/plan — todos van a través de un motor generalizado en lugar de lógica de cron por característica.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definiciones** (`reminderDefinitions`) son a nivel de entidad (`entityId` configurado — un evento, tarea, o plan específico) o a nivel de alcance (`entityId` nulo, `scopeId` configurado — p. ej., cada plan bajo un tipo de plan de servicio). Una definición lleva un CSV de desplazamientos de minutos (`offsets`, p. ej., `"1440,60"` para un día y una hora antes), una hora de envío local (`sendLocalTime`), un CSV de canales (`channels` — incluyendo `email` activa un correo enriquecido inmediato en el momento del envío), una `recipientMode`, y un `message` personalizado opcional.

**Expansión** materializa filas de incendio para el horizonte adelante (una ventana rodante de varios días). Se ejecuta en el temporizador nocturno, y sincronizadamente siempre que se guarde una definición para que un recordatorio para un evento de último minuto aún se dispare. Las definiciones de alcance se expanden a través de `loadScopeEntities` del adaptador, produciendo un conjunto de ocurrencia por entidad concreta; las ocurrencias a nivel de entidad usan la clave `definitionId:occurrenceISO:offset`, mientras que las ocurrencias de alcance se espacian por id de entidad para que nunca choquen. La adición de una ocurrencia **resucita** una fila previamente cancelada — cancelar-luego-re-expandir es la forma estándar de re-sincronizar un recordatorio después de que la entidad subyacente cambia; las filas ya `sent`, `failed`, o `processing` se dejan sin tocar.

**Distribución** (`ReminderEngine.scan()`) se ejecuta en el temporizador de 30 minutos. Reclama ocurrencias vencidas (un arrendamiento previene el doble procesamiento), carga destinatarios a través del adaptador de la entidad, filtra a cualquiera ya registrado en `reminderSentLog` para esa ocurrencia, y llama a `createNotifications` con `deliveryStartLevel: 1` (saltar directo a push) más `emailImmediate`/`emailByPerson` cuando los canales de la definición incluyen correo.

Un bus de eventos interno reacciona a mutaciones de entidad sin esperar a la expansión nocturna: los eventos de contenido (vía el distribuidor de webhook) y los eventos de actualización de plan/tarea activan re-expansión o cancelación inmediata para la entidad afectada, y una actualización de plan también re-expande cualquier definición de alcance vinculada a su tipo de plan.

### Adaptadores

El motor es agnóstico de entidad; cada tipo de entidad soportado se conecta a través de un adaptador (`helpers/adapters/`):

| Tipo de entidad | Adaptador | Notas |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinatarios con alcance a asistentes o miembros del grupo dependiendo del evento y `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Los destinatarios son asignaciones de plan Aceptadas + No confirmadas. `buildEmails` llama a `DoingModuleGateway.buildPlanReminderEmails`, que representa posiciones, notas, y un mensaje personalizado vía `doing/helpers/PlanReminderEmailHelper`, incluyendo botones Aceptar/Rechazar firmados por `ReminderTokenHelper` que publican en un punto final de respuesta de asignación pública. |
| `task` | `TaskReminderAdapter` | Los destinatarios son los asignados de la tarea. |

### Puntos finales

| Método | Ruta | Propósito |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Cargar o guardar la definición de recordatorio para una entidad. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Cargar o guardar una definición de recordatorio a nivel de alcance (heredada). |
| `DELETE` | `/messaging/reminders/:defId` | Eliminar una definición y cancelar sus ocurrencias pendientes. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Vista previa del conteo de destinatarios y próximas veces de disparo para un recordatorio de evento antes de guardar. |
| `GET` | `/messaging/reminders/log` | Historial de ocurrencia de recordatorio reciente para una iglesia. |
| `POST` | `/messaging/reminders/mute` | Silenciar recordatorios para una entidad específica. |

Guardar una definición dispara una re-expansión sincronizada para esa entidad o alcance, por lo que los editores ven "próximos disparos" actualizados sin esperar al trabajo nocturno.

## Mensajes Directos

Los mensajes directos ruedan el mismo embudo que todo lo demás en lugar de una ruta de escalada separada. Cada conversación no leída obtiene una **fila sombra** en `notifications` (`contentType='privateMessage'`, `contentId` = el id del mensaje privado, `category='direct_messages'`) que posee todo el estado de entrega — escalada de socket/push/email, rastreo de lectura, todo. La tabla `privateMessages` en sí mantiene la carga del mensaje y una columna `notifyPersonId`, que es la fuente de la insignia no leída y se borra cuando el destinatario lee la conversación.

Las filas sombra son invisibles para la campana de notificaciones: se excluyen de la consulta de conteo no leído, la consulta de lista de notificaciones, y las consultas de marca de lectura/eliminación, todas las cuales filtran `contentType <> 'privateMessage'`. Cada ping de MD golpea el socket sin importar el estado no leído (semántica de chat en vivo — sin deduplicación), y los MD nunca se detienen en la entrega de socket de la forma que las notificaciones ordinarias hacen, ya que una PWA en segundo plano puede mantener un socket abierto mientras aún necesita un push a nivel de SO. Si una persona silencia las notificaciones de MD, la fila sombra se estaciona (`isNew=false`, `notifyPersonId` borrado) — aún visible dentro de la conversación en sí, solo sin insignias o alertas.

## Preferencias y bloqueo

Cada envío pasa a través de `PreferenceGateHelper.evaluate()`, una función pura (todo el estado pasado en, ninguna llamada de BD en la ruta caliente) que devuelve `allow`, `suppress`, o `defer`. Las capas se ejecutan en orden, y la primera que decide gana:

1. **Categoría bloqueada** — algunas categorías son obligatorias (nivel 0) y eludir toda otra capa.
2. **Silencio maestro / apagón de canal** — `masterMute`, `allowPush`, `allowSms`, o `emailFrequency='never'` suprimen directamente.
3. **Horas tranquilas** — solo push y SMS (el correo se considera no intrusivo). Si la hora de pared actual en la zona horaria de la persona cae en su ventana tranquila, una categoría transaccional aún pasa; una no transaccional se difiere hasta el final de la ventana tranquila, calculada como un instante UTC correcto de DST vía `TimezoneHelper.wallClockToUtc`.
4. **Anulación de preferencia por categoría** — una exclusión explícita para un par categoría × canal; la ausencia significa el predeterminado de la categoría.
5. **Silencio por entidad** — un silencio registrado contra una entidad específica (p. ej., un evento, un plan) restringe más que la configuración a nivel de categoría, pero solo se aplica cuando la llamada proporciona un id/tipo de entidad junto con la notificación.

Tablas involucradas: `notificationPreferences` (global — `masterMute`, `emailFrequency` de `individual|daily|weekly|never`, `allowPush`, ventana de horas tranquilas + zona horaria, `allowSms`), `notificationPreferenceOverrides` (por categoría × canal), y `notificationEntityMutes` (por entidad).

Esta puerta se aplica para in-app (nivel 0), push (nivel 1), y email (nivel 2) dentro del embudo — incluyendo recordatorio inmediato/correos de resumen. El correo transaccional (códigos de auth, restablecimientos de contraseñas, invitaciones, recibos de donación) lo elude por diseño; ese es el punto entero de la segunda puerta.

## Límites de correo redactados por iglesia

El correo cuyo contenido una iglesia escribió sale de la identidad SES compartida de ChurchApps, por lo que se mide por iglesia por `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Cuatro rutas lo llaman: envíos de grupo/plantilla (`EmailTemplateController`, tipo de contenido `email`), correos de seguimiento de formulario (`FormSubmissionController`, `formFollowUp`), acciones de flujo de trabajo **Enviar correo** (`NotificationHelper` con `churchAuthored`, `workflowEmail`), e invitaciones de cuenta B1 (`UserController.sendInviteEmail`, `invite`). El correo del sistema (códigos de auth, recibos, recordatorios) no se mide.

- **Puerta de aprobación.** Una iglesia no envía nada hasta que un administrador del servidor establezca `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Admin del Servidor → Iglesias → chip **Correo de grupo**). Las iglesias archivadas siempre se bloquean. El diálogo Enviar Correo de B1Admin lee `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) y, cuando no es aprobado, muestra una tarjeta **Solicitar revisión** en lugar del editor. `POST /messaging/emailTemplates/requestApproval` envía correo de soporte, como máximo una vez por iglesia por semana.
- **Asignación ganada.** Una iglesia aprobada obtiene `max(150, 2 × su mejor día de iglesia redactado en los últimos 30 días)`, limitado a 2,000 por cada 24 horas rodantes. Las 24 horas actuales se excluyen de "mejor día" para que una ráfaga no pueda elevar su propio límite.
- **Reserva, luego liquida.** `reserve()` escribe una fila `deliveryLogs` por destinatario antes de enviar, vuelve a verificar la asignación con esas filas contadas, y retrocede si dos solicitudes corrieron pasadas el límite (el envío devuelve 429). `settle()` marca cada fila enviada o fallida.
- **Pausa de queja.** El Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, alimentado por SES → SNS) fija cada rechazo permanente o queja a la iglesia cuyo correo redactado de iglesia alcanzó esa dirección alrededor de ese tiempo, almacenado como `deliveryMethod` `sesBounce` / `sesComplaint`. Una iglesia se pausa en 2+ quejas (≥ 0.3% de envíos) o 10+ rebotes duros (≥ 5%) durante 7 días.

## Cronograma

Tanto el motor de recordatorios como el resumen de notificaciones montan temporizadores programados existentes en lugar de introducir nueva infraestructura:

| Temporizador | Cronograma | Ejecuta |
|-------|----------|------|
| Temporizador de 30 minutos | cada 30 minutos | Escalar notificaciones no leídas; enviar correos de resumen de frecuencia `individual`; distribuir ocurrencias de recordatorio vencidas (`ReminderEngine.scan`); resúmenes de aprobación; ejecuciones de automatización vencidas |
| Temporizador nocturno | 05:00 UTC | Recordatorios de asistencia de grupo; avanzar servicios de transmisión recurrentes; refrescar listas de auto-refresco; expandir ocurrencias de recordatorio para el próximo horizonte (`ReminderEngine.expandAll`); enviar correos de resumen de frecuencia `daily` |

Localmente, la misma lógica se puede disparar bajo demanda con `npm run timer:30min` y `npm run timer:midnight` desde el proyecto `Api`.

## Inventario de archivos

| Área | Archivos |
|------|-------|
| Embudo | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrada compartida | `Api/src/shared/helpers/NotificationService.ts` |
| Puerta transaccional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regla de lint `Api/tools/eslint-rules/email-door.cjs` |
| Límites de correo de iglesia | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Motor de recordatorios | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Repositorios de recordatorio | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Correo de servicio/plan | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editores de recordatorio (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Editor de recordatorio / preferencias (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Páginas Relacionadas

- [Arquitectura en Tiempo Real](../realtime) — el protocolo WebSocket y primitivas del cliente (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) en los que se monta el nivel de entrega en la aplicación
- [Notificaciones Web Push](../web-push) — configuración de VAPID y la ruta de API de push del navegador utilizada por el nivel de escalada de push
- [Puntos finales de mensajería](../api/endpoints/messaging) — superficie REST completa para mensajes, conversaciones, conexiones, y rutas de notificación/recordatorio
