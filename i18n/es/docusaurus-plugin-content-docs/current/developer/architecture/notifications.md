---
title: "Arquitectura de Notificaciones y Recordatorios"
---

# Arquitectura de Notificaciones y Recordatorios

<div class="article-intro">

Cada mensaje que un miembro de la iglesia ve fuera de la página que está mirando — un recuento de insignias, una notificación push, un correo electrónico de resumen — pasa a través de una de dos puertas en MessagingApi. Esta página documenta el embudo, el motor de recordatorios que lo alimenta en un cronograma, y el modelo de preferencia que decide qué realmente llega a una persona.

</div>

## Descripción General — dos puertas

```
cualquier cosa programada ──▶ ReminderEngine (definiciones → ocurrencias → escanear) ─┐
chat / solicitudes / flujo de trabajo / envíos en masa ──────────────────────────────┼─▶ createNotifications()
                                                                          │    puerta in_app → socket → push → correo (→ ranura sms)
correo legales/legales ──▶ TransactionalEmailHelper.sendTransactional()  [lista blanca, lint-impuesta]
```

1. **Cualquier cosa que le diga a una persona algo** pasa a través de `NotificationHelper.createNotifications()` en el módulo de mensajería. Persiste una fila `notifications` y escala socket → push → correo, evaluando `PreferenceGateHelper` por canal — incluyendo `in_app` en el nivel 0.
2. **Cualquier cosa programada** es una `reminderDefinition` (nivel de entidad o nivel de alcance) expandida en `reminderOccurrences` y despachada por `ReminderEngine.scan()` en un temporizador recurrente. Un expansor, un despachante, un libro mayor de envío (`reminderSentLog`).
3. **El correo directo** existe solo detrás de `TransactionalEmailHelper.sendTransactional()`. Una regla ESLint aplica esto al compilar — ver abajo.

:::tip La puerta de correo es lint-impuesta, no solo convención
`Api/tools/eslint-rules/email-door.cjs` define `no-direct-email-helper`: cualquier llamada a `EmailHelper.sendTemplatedEmail()` o `EmailHelper.sendEmail()` fuera de `NotificationHelper.ts` o `TransactionalEmailHelper.ts` falla lint. Si necesita enviar un correo, enrutarlo a través del embudo (`createNotifications` con `emailImmediate`) o a través de `TransactionalEmailHelper.sendTransactional()` — no hay tercera forma que pase CI.
:::

## El embudo de notificación

`NotificationHelper.createNotifications()` es el único punto de entrada para cualquier cosa que no sea programada o transaccional:

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
    deliveryStartLevel?: number;      // 0 socket (predeterminado), 1 push, 2 solo correo
    category?: string;                // eje de preferencia; derivado de contentType si se omite
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // enviar correo ahora en lugar de esperar el resumen
  }
)
```

Por cada destinatario guarda una fila en `notifications` y llama a `attemptDeliveryWithEscalation`, que recorre la escalera del canal abajo. Una fila aún no leída para el mismo `(contentType, contentId)` suprime la recreación — esta guardia dedup se omite para envíos `emailImmediate` (desplazamientos de recordatorio, "correo a todos" de personal, pasos de flujo de trabajo son sus propios dedup) y para mensajes directos, que siempre hacen ping en el socket.

`shared/helpers/NotificationService.ts` refleja la misma firma (`NotificationServiceOptions`) para llamadores fuera del módulo de mensajería y se registra con el módulo de mensajería al arrancar.

## Cadena de escalada de canal

La entrega comienza en un nivel (0 de forma predeterminada, o superior para recordatorios/envíos explícitos) y solo procede al siguiente canal si el anterior no tuvo éxito. Cada nivel es cerrado por `PreferenceGateHelper` antes de que se intente cualquier cosa.

| Nivel | Canal | Comportamiento |
|-------|---------|----------|
| 0 | **in_app / socket** | La puerta `in_app` se verifica primero. Si se suprime (silenciado), la fila se persiste con `isNew=false` y la entrega se detiene completamente — sin ping de socket, sin insignia, sin escalada adicional. De lo contrario el servidor busca conexiones de socket abiertas para la sala `alerts` de la persona y empuja un marco `notification` (o `privateMessage`). Para notificaciones ordinarias, una entrega de socket exitosa detiene la cadena aquí — el temporizador de 30 minutos re-verifica elementos no leídos y los escala más tarde. Los mensajes directos nunca se detienen en socket: una PWA instalada puede mantener abierto el socket de alertas en segundo plano, lo que de otro modo suprimiría el empuje del nivel del SO. |
| 1 | **push** | Cerrado en `allowPush` / exclusión de categoría / horas tranquilas. Envía a tokens push de Expo y suscripciones de Web Push encontradas en las filas `devices` de la persona, deduplicando por punto final y podando tokens obsoletos en el camino. |
| 2 | **correo electrónico** | Cerrado en `emailFrequency` y exclusión de categoría. Los envíos inmediatos (`emailImmediate`) se renderizan de inmediato y escriben una fila `deliveryLogs`; de lo contrario la notificación se deja pendiente para el resumen por lotes, descrito abajo. |
| — | **sms** | El cableado de preferencia (`allowSms`, listas de canal por categoría) ya da cuenta de un canal SMS, pero ningún productor envía a través de él hoy — se mantiene reservado para el producto SMS masivo, que se ejecuta como un flujo separado y aislado a través de `TextingController` / `@churchapps/texting`. |

Las notificaciones no leídas dejadas en socket o push se escalan por el temporizador de 30 minutos (`NotificationHelper.escalateDelivery`). El correo por lotes se envía por `NotificationHelper.sendEmailNotifications(frequency)`, impulsado por la preferencia `emailFrequency` de cada persona: `individual` se ejecuta en el temporizador de 30 minutos, `daily` se ejecuta en el temporizador nocturno. (`weekly` es un valor de preferencia válido pero no tiene ejecución por lotes dedicada aún.)

## Motor de Recordatorios

Los recordatorios programados — recordatorios de eventos, fechas de vencimiento de tareas, recordatorios de asignación de servicio/plan — todos pasan a través de un motor generalizado en lugar de lógica cron por característica.

```
definiciones de recordatorio ──expandir──▶ ocurrencias de recordatorio ──escanear (30 min)──▶ createNotifications()
     │                                                  │                                    │
     ▼                                                  ▼                                    ▼
 nivel de entidad o nivel de alcance         una fila por (definición,              deliveryStartLevel: 1
 desplazamientos/canales/mensaje            entidad, ocurrencia, desplazamiento)   + libro mayor reminderSentLog
```

**Definiciones** (`reminderDefinitions`) son nivel de entidad (`entityId` establecido — un evento, tarea, o plan específico) o nivel de alcance (`entityId` nulo, `scopeId` establecido — p. ej. cada plan bajo un tipo de plan de servicio). Una definición lleva un CSV de desplazamientos de minutos (`offsets`, p. ej. `"1440,60"` para un día y una hora antes), una hora de envío local (`sendLocalTime`), un CSV de canales (`channels` — incluyendo `email` desencadena un correo enriquecido inmediato en la hora de envío), un `recipientMode`, y un `message` personalizado opcional.

**Expansión** materializa filas de fuego para el horizonte adelante (una ventana de múltiples días rodante). Se ejecuta en el temporizador nocturno, e inmediatamente siempre que se guarda una definición para que un recordatorio de un evento de último minuto aún se dispare. Las definiciones de alcance se ramifican a través del adaptador `loadScopeEntities` de la entidad, produciendo un conjunto de ocurrencia por entidad concreta; las ocurrencias de nivel de entidad usan la clave `definitionId:occurrenceISO:offset`, mientras que las ocurrencias con alcance se espacian por id de entidad para que nunca choquen. Insertar una ocurrencia **resucita** una fila previamente cancelada — cancelar-luego-re-expandir es la forma estándar de re-sincronizar un recordatorio después de que la entidad subyacente cambia; las filas ya `sent`, `failed`, o `processing` se dejan sin tocar.

**Despacho** (`ReminderEngine.scan()`) se ejecuta en el temporizador de 30 minutos. Reclama ocurrencias vencidas (un arrendamiento previene el doble procesamiento), carga destinatarios a través del adaptador de la entidad, filtra a cualquiera ya registrado en `reminderSentLog` para esa ocurrencia, y llama a `createNotifications` con `deliveryStartLevel: 1` (omitir directamente a push) más `emailImmediate`/`emailByPerson` cuando los canales de la definición incluyen correo.

Un bus de evento interno reacciona a mutaciones de entidad sin esperar la expansión nocturna: eventos de contenido (a través del despachante de webhook) y eventos de plan/tarea de actualización desencadenan re-expansión inmediata o cancelación para la entidad afectada, y una actualización de plan también re-expande cualquier definición de alcance vinculada a su tipo de plan.

### Adaptadores

El motor es agnóstico de la entidad; cada tipo de entidad soportado se conecta a través de un adaptador (`helpers/adapters/`):

| Tipo de entidad | Adaptador | Notas |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Destinatarios con alcance de registrantes o miembros del grupo dependiendo del evento y `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Los destinatarios son asignaciones de plan Aceptadas + No Confirmadas. `buildEmails` llama a `DoingModuleGateway.buildPlanReminderEmails`, que renderiza posiciones, notas, y un mensaje personalizado a través de `doing/helpers/PlanReminderEmailHelper`, incluyendo botones Aceptar/Declinar firmados por `ReminderTokenHelper` que publican a un extremo de respuesta de asignación pública. |
| `task` | `TaskReminderAdapter` | Los destinatarios son el/los asignado(s) de la tarea. |

### Extremos

| Método | Ruta | Propósito |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Cargar o guardar la definición de recordatorio para una entidad. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Cargar o guardar una definición de recordatorio a nivel de alcance (heredada). |
| `DELETE` | `/messaging/reminders/:defId` | Eliminar una definición y cancelar sus ocurrencias pendientes. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Vista previa del recuento de destinatarios y próximos tiempos de disparo para un recordatorio de evento antes de guardar. |
| `GET` | `/messaging/reminders/log` | Historial de ocurrencia de recordatorio reciente para una iglesia. |
| `POST` | `/messaging/reminders/mute` | Silenciar recordatorios para una entidad específica. |

Guardar una definición desencadena una re-expansión síncrona para esa entidad o alcance, para que los editores vean "próximos disparos" actualizados sin esperar el trabajo nocturno.

## Mensajes Directos

Los mensajes directos van en el mismo embudo que todo lo demás en lugar de una ruta de escalada separada. Cada conversación no leída obtiene una **fila de sombra** en `notifications` (`contentType='privateMessage'`, `contentId` = id de mensaje privado, `category='direct_messages'`) que posee todo el estado de entrega — escalada socket/push/correo, rastreo de lectura, todo. La tabla `privateMessages` misma mantiene la carga útil del mensaje y una columna `notifyPersonId`, que es la fuente de la insignia no leída y se borra cuando el destinatario lee la conversación.

Las filas de sombra son invisibles para la campana de notificaciones: se excluyen de la consulta de recuento no leído, la consulta de lista de notificaciones, y las consultas de marca-leído/eliminar, todas las cuales filtran `contentType <> 'privateMessage'`. Cada ping de DM golpea el socket sin importar el estado no leído (semántica de chat en vivo — sin dedup), y los DMs nunca se detienen en la entrega de socket de la forma que lo hacen las notificaciones ordinarias, ya que una PWA de fondo puede mantener un socket abierto mientras aún necesita un empuje de nivel del SO. Si una persona silencia notificaciones de DM, la fila de sombra se estaciona (`isNew=false`, `notifyPersonId` borrado) — aún visible dentro de la conversación misma, solo sin insignias o alertas.

## Preferencias y Cierre

Cada envío pasa a través de `PreferenceGateHelper.evaluate()`, una función pura (todo el estado pasado, sin llamadas de BD en la ruta activa) que devuelve `allow`, `suppress`, o `defer`. Las capas se ejecutan en orden, y la primera que decide gana:

1. **Categoría bloqueada** — algunas categorías son obligatorias (nivel 0) y se saltan todas las otras capas.
2. **Silencio maestro / matar canal** — `masterMute`, `allowPush`, `allowSms`, o `emailFrequency='never'` suprimen completamente.
3. **Horas tranquilas** — solo push y SMS (el correo se considera no intrusivo). Si la hora actual del reloj de pared en la zona horaria de la persona cae en su ventana tranquila, una categoría transaccional aún se abre paso; una no transaccional se difiere hasta el final de la ventana tranquila, calculada como un instante UTC correcto de DST a través de `TimezoneHelper.wallClockToUtc`.
4. **Anulación de preferencia por categoría** — una exclusión explícita para un par categoría × canal; la ausencia significa el predeterminado de la categoría.
5. **Silencio por entidad** — un silencio registrado contra una entidad específica (p. ej. un evento, un plan) restringe además que la configuración a nivel de categoría, pero solo se aplica cuando el llamador suministra un id de entidad/tipo junto con la notificación.

Tablas involucradas: `notificationPreferences` (global — `masterMute`, `emailFrequency` de `individual|daily|weekly|never`, `allowPush`, ventana de horas tranquilas + zona horaria, `allowSms`), `notificationPreferenceOverrides` (por categoría × canal), y `notificationEntityMutes` (por entidad).

Esta puerta se aplica para in_app (nivel 0), push (nivel 1), y correo (nivel 2) dentro del embudo — incluyendo correos de recordatorio/resumen inmediato. El correo transaccional (códigos de autenticación, reinicio de contraseña, invitaciones, recibos de donación) lo omite por diseño; ese es todo el punto de la segunda puerta.

## Cronograma

Tanto el motor de recordatorios como el resumen de notificaciones conducen temporizadores programados existentes en lugar de introducir nueva infraestructura:

| Temporizador | Cronograma | Ejecuta |
|-------|----------|------|
| Temporizador de 30 minutos | cada 30 minutos | Escalar notificaciones no leídas; enviar correos de resumen de frecuencia `individual`; despachar ocurrencias de recordatorio vencidas (`ReminderEngine.scan`); resúmenes de aprobación; ejecuciones de automatización vencida |
| Temporizador nocturno | 05:00 UTC | Recordatorios de asistencia de grupo; servicios de transmisión de recurrencia por adelantado; refrescar listas de auto-actualización; expandir ocurrencias de recordatorio para el próximo horizonte (`ReminderEngine.expandAll`); enviar correos de resumen de frecuencia `daily` |

Localmente, la misma lógica se puede desencadenar bajo demanda con `npm run timer:30min` y `npm run timer:midnight` desde el proyecto `Api`.

## Inventario de archivos

| Área | Archivos |
|------|-------|
| Embudo | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Entrada compartida | `Api/src/shared/helpers/NotificationService.ts` |
| Puerta transaccional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, regla lint `Api/tools/eslint-rules/email-door.cjs` |
| Motor de recordatorios | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Repositorios de recordatorios | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Correo de servicio/plan | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editores de recordatorio (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Editor de recordatorio / preferencias (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Páginas Relacionadas

- [Arquitectura en Tiempo Real](../realtime) — el protocolo WebSocket y los primitivos del cliente (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) en los que se monta el nivel de entrega en la aplicación
- [Notificaciones Push Web](../web-push) — configuración VAPID y la ruta de API Push del navegador utilizada por el nivel de escalada de push
- [Extremos de Mensajería](../api/endpoints/messaging) — superficie REST completa para mensajes, conversaciones, conexiones, y rutas de notificación/recordatorio
