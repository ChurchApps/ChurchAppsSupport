---
title: "Arquitectura en Tiempo Real"
---

# Arquitectura en Tiempo Real

<div class="article-intro">

ChurchApps utiliza un único marco de entrega basado en WebSocket para cada superficie en tiempo real -- chat de grupo, mensajes privados, notas de contenido, el chat de transmisión en vivo, y presencia/asistencia. Esta página documenta el protocolo, el servidor, y las primitivas de cliente que usan los consumidores.

</div>

## Descripción General

```
┌────────────────────┐                ┌────────────────────────────┐
│ Browser / B1Admin  │                │  MessagingApi (Lambda)     │
│ Browser / B1App    │ ─── WS ─────▶  │  ┌───────────────────────┐ │
│  - SocketHelper    │                │  │ SocketHelper (server) │ │
│  - SubscriptionMgr │   POST /msg ──▶│  │ MessageController     │ │
│  - ConversationStore│  POST /conn ─▶│  │ ConnectionController  │ │
│  - PresenceStore   │ ◀── action ──  │  │ DeliveryHelper        │ │
└────────────────────┘                │  └───────────────────────┘ │
                                      └────────────────────────────┘
```

El protocolo tiene tres partes:

1. **Un WebSocket persistente** por pestaña del navegador, abierto por `SocketHelper`.
2. **Filas de conexión** (`POST /messaging/connections`) registradas en la tabla `connections` -- estas marcan una tupla `(socketId, churchId, conversationId)` como suscriptora de una sala.
3. **Distribución del lado del servidor** por `DeliveryHelper.sendConversationMessages()` -- cuando se guarda un mensaje (`POST /messaging/messages/send`), el servidor lee las filas de conexión coincidentes y envía un payload tipado a cada socket abierto.

No hay Socket.IO, ni respaldo de long-polling, ni un microservicio separado. El WebSocket se ejecuta en el mismo proceso que la API REST (Lambda `web` para HTTP, Lambda `socket` para WebSocket en AWS; un proceso combinado localmente y en Railway).

## Puertos y Transporte

| Entorno | HTTP | WebSocket |
|-------------|------|-----------|
| Dev local   | `8084` | `ws://localhost:8087` (`WebSocketServer` separado) |
| Railway / Docker / hosts de puerto único (`RAILWAY_ENVIRONMENT` o `SELF_HOSTED` establecido) | compartido | servidor HTTP compartido (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (rutas `$connect` / `$disconnect` / `$default`) |

El selector de transporte es la configuración `deliveryProvider`:

- `local` → biblioteca `ws` cruda; los clientes se conectan a `MessagingApiSocket` desde `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; el servidor publica payloads a conexiones activas vía `@aws-sdk/client-apigatewaymanagementapi`.

El cliente nunca tiene que saber cuál está en uso -- habla el mismo protocolo JSON de cualquier manera.

## Protocolo de Cable

Cada frame es JSON con la forma `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // la "sala" — usualmente un UUID, a veces "alerts" o "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // servidor → cliente, después de conectar, lleva el socketId a usar para uniones de sala
  | "message"             // servidor → cliente, nuevo mensaje
  | "deleteMessage"       // servidor → cliente, mensaje eliminado
  | "privateMessage"      // servidor → cliente, ping de contador de insignia a la sala "alerts" del destinatario cuando un mensaje directo escala; el cuerpo del mensaje en sí llega vía la acción ordinaria "message" dentro de la conversación abierta
  | "reaction"            // servidor → cliente, reacción de emoji activada en un mensaje; data es { messageId, conversationId, personId, emoji, added } (added=false significa eliminado). Transmitido a la sala de conversación por POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// servidor → cliente, señal secundaria de "algo pasó" para suscriptores de sala de contenido
  | "attendance"          // servidor → cliente, lista de espectadores / instantánea de presencia
  | "notification"        // servidor → cliente, notificación genérica (conteos, etc.)
  | "reconnect"           // interno del cliente, despachado localmente por SocketHelper después de que un nuevo handshake de socketId se completa tras una caída — ya sea una reconexión con retroceso exponencial después de un cierre inesperado, o una reconexión inmediata activada por el sondeo de reanudación (foco de pestaña/visibilidad/en línea); nunca enviado por el servidor
  | "alert" | "callout";  // heredado, consulta la referencia del punto final Connections
```

### Handshake

1. El cliente abre el socket y envía la cadena literal `"getId"`.
2. El servidor responde con `{ action: "socketId", data: "<id>" }`.
3. El cliente almacena el `socketId` y lo usa como la tercera coordenada de cada suscripción de sala.

### Unirse a una Sala

Una "sala" es simplemente una tupla `(churchId, conversationId)`. Para suscribirse, el cliente publica una fila `Connection`:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // opcional; null para espectadores anónimos de transmisión en vivo
    "displayName": "Anonymous4823"
  }
]
```

Publicar también dispara una transmisión `attendance` en la conversación para que los suscriptores existentes sepan que se unió un nuevo espectador.

### Enviar un Mensaje

`POST /messaging/messages/send` (anónimo permitido) o `POST /messaging/messages/` (requiere auth):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

El servidor guarda el mensaje, luego `DeliveryHelper.sendConversationMessages()` busca cada fila de conexión para ese `conversationId` y envía a cada socket un frame `{ action: "message", data: <message> }`.

Para conversaciones vinculadas a contenido (p. ej., notas adjuntas a una persona), una segunda transmisión con `action: "conversationActivity"` se dispara en la sala sintética `"content-{type}-{id}"` para que los consumidores de vista de lista sepan que deben refrescar sin mantener abierta la conversación subyacente.

### Salir de una Sala

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Limpia la fila de conexión y dispara una transmisión final de asistencia.

## Componentes del Lado del Servidor

| Archivo | Rol |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Posee el `WebSocketServer`. Asigna `socketId` al conectar. Ejecuta un heartbeat ping/pong de 30s (`startHeartbeat`) que hace `terminate()` y limpia cualquier conexión que se pierda un pong. Limpia sockets muertos y dispara una retransmisión de asistencia al desconectarse. Expone `getLiveSocketIds()` y `reapStaleConnections()`, usados por el trabajo de temporizador de 30 minutos para eliminar filas obsoletas de `connections` -- localmente verificando qué socketIds siguen vivos en proceso, en AWS como un respaldo TTL de 24h para eventos `$disconnect` perdidos (API Gateway limita las conexiones a ~2h, así que esto no puede cosechar una viva) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` lee conexiones para la sala y enruta cada frame al socket local o a la conexión de AWS API Gateway. `sendAttendance(churchId, conversationId)` construye y transmite la instantánea de espectadores |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` une, `DELETE /:churchId/:conversationId/:socketId` sale, `POST /setName` actualiza el nombre de visualización |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anónimo) y `POST /` (con auth) guardan y luego distribuyen |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` es la fuente de verdad de quién está suscrito |

## Primitivas del Lado del Cliente (`@churchapps/apphelper`)

Las cinco primitivas son singletons estáticos en `apphelper/src/helpers/`. Cooperan de manera que cada pestaña abre **un** WebSocket sin importar cuántos componentes se monten en la página.

### `SocketHelper`

Posee la única conexión WebSocket. El `init()` reentrante es idempotente -- múltiples componentes pueden llamarlo sin abrir sockets duplicados. Expone:

- `init()` — abre (o reutiliza) el socket y completa el handshake `getId`. Se resuelve una vez que el handshake se completa o, después de un tiempo de espera de 5s, una vez que el bucle de reintento en segundo plano se ha hecho cargo; nunca rechaza, así que los llamadores no necesitan manejar especialmente un primer intento de conexión fallido.
- `addHandler(action, id, fn)` / `removeHandler(id)` — registra/desregistra oyentes por `action`. Múltiples manejadores pueden escuchar la misma acción.
- `setPersonChurch({ personId, churchId })` — para llamadores autenticados; dispara una suscripción a la sala `"alerts"` para que las notificaciones push lleguen a este socket.
- `onSocketIdReady(fn)` — se dispara en cada nuevo socketId, no solo el primero -- el handshake inicial y cada reconexión posterior. Usado por `SubscriptionManager` para vaciar uniones pendientes.
- `checkConnection()` — invocado por los oyentes de reanudación abajo; reconecta inmediatamente si el socket ya está cerrado, o envía un sondeo de vitalidad si parece abierto.

**Ciclo de vida de reconexión.** Un cierre inesperado programa una reconexión con retroceso exponencial (1s, duplicando hasta un límite de 30s). `SocketHelper` también escucha `online`, `focus`, `pageshow`, y `visibilitychange` en `window`/`document` para detectar una pestaña reanudada: si el socket ya está cerrado, reconecta inmediatamente y reinicia el retroceso; si parece abierto, envía un sondeo de vitalidad `"getId"` y fuerza una reconexión si no llega ningún frame dentro de 3s -- esto captura sockets medio abiertos dejados atrás después de que un SO móvil suspende la aplicación. En un re-handshake exitoso, `SocketHelper` despacha la acción local `"reconnect"` (consulta [Protocolo de Cable](#protocolo-de-cable)) a cada manejador registrado para esa acción.

### `SubscriptionManager`

Membresía de sala con conteo de referencias. Múltiples componentes suscribiéndose a la misma conversación solo registran una fila de conexión del lado del servidor.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... el componente renderiza, recibe frames de socket vía ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Tres comportamientos que los consumidores obtienen gratis:

- **Salida con debounce (300 ms)** — sobrevive al doble montaje/desmontaje del React StrictMode y ciclos cortos de remontaje sin descartar la suscripción del lado del servidor; `reset()` también cancela cualquier salida con debounce pendiente.
- **Reunión en reconexión** — `SubscriptionManager` recuerda el `personId`/`displayName` usado para unirse a cada sala, así que en el evento `"reconnect"` de `SocketHelper` (y en cada llamada `onSocketIdReady`) vuelve a publicar cada fila de conexión activa con la identidad intacta. Las reuniones se deduplican por socketId para que la misma reconexión no vuelva a publicar una sala dos veces.
- **Vinculación tardía de socketId** — `joinRoom` registra la intención antes de que el socket termine su handshake; el `POST /connections` real se dispara en `onSocketIdReady`.

### `ConversationStore`

Caché en memoria con clave `conversationId`. Registra manejadores de socket `message` / `deleteMessage` / `privateMessage` exactamente una vez y aplica frames entrantes a cualquier conversación actualmente abierta.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ usa /messages/conversation/:id cuando está autenticado, /messages/catchup/:churchId/:id cuando es anónimo

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // vuelve a renderizar con la instantánea más reciente
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // limpieza explícita opcional
```

Los llamadores autenticados también obtienen **hidratación de personas** -- los `personId`s en mensajes entrantes se resuelven a objetos `PersonInterface` vía una búsqueda en caché `GET /people/ids`. Los llamadores anónimos omiten esto.

En el evento `"reconnect"` de `SocketHelper`, `ConversationStore` vuelve a obtener cada conversación que actualmente tiene oyentes `subscribe` activos, recuperando mensajes perdidos mientras el socket estaba caído. Las conversaciones anónimas omiten esta puesta al día si su `churchId` nunca fue registrado (el punto final de puesta al día requiere uno).

### `PresenceStore`

Refleja el patrón de `ConversationStore` para la acción `attendance`. Los suscriptores reciben un `PresenceSnapshot { conversationId, totalViewers, viewers }` cada vez que el servidor retransmite presencia. Las instantáneas idénticas se deduplican antes de notificar, así que las tormentas de reconexión no disparan re-renderizados innecesarios.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Arranque de nivel superior para llamadores **autenticados**. Envuelve `SocketHelper.init()`, establece el contexto persona/iglesia (que auto-une la sala `"alerts"`), y llama a `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` exactamente una vez. También registra su propio manejador `"reconnect"` que recarga los conteos de notificación/PM, así que las insignias se recuperan después de una conexión caída.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Los flujos anónimos (el chat de transmisión en vivo es el ejemplo canónico) omiten `NotificationService` y llaman a las primitivas directamente -- consulta `B1App/src/helpers/StreamChatManager.ts` para una implementación de referencia.

## Chat de Transmisión en Vivo

La transmisión en vivo es el mayor consumidor anónimo del marco. Usa dos `contentType`s para el alcance de sala:

- `streamingLive` — la pestaña de chat pública en `/stream` (una sala por `streamingService`).
- `streamingLiveHost` — una sala privada visible solo para el personal con el permiso `contentApi.chat.host`. El id de la sala se encripta en el servidor (`GET /streamingServices/:id/hostChat`) para que el scraping casual no lo revele.

`B1App/src/helpers/StreamChatManager.ts` arranca ambas salas vía las primitivas unificadas -- ya no hay código de socket específico de transmisión en vivo.

## Patrones y Trampas

- **No abras tu propio WebSocket.** `SocketHelper` es un singleton por una razón. Si necesitas escuchar una acción personalizada, registra un manejador en el socket existente vía `SocketHelper.addHandler`.
- **No omitas `SubscriptionManager`.** Las llamadas directas `POST /connections` funcionan pero pierden el conteo de referencias, la salida con debounce, y la reunión en reconexión. Los consumidores de chat de grupo y PM pasan todos por `SubscriptionManager`.
- **Los ids de manejador deben ser únicos por acción.** `SocketHelper.addHandler(action, id, fn)` usa clave `(action, id)`; reutilizar el mismo id para dos oyentes reemplaza al primero. Los almacenes unificados usan ids como `"ConversationStore-Message"` y `"PresenceStore-Attendance"` para mantenerse distintos de los ids de consumidor.
- **Los ids de sala son cadenas opacas.** La mayoría son UUIDs de conversación pero el sistema también admite `"alerts"` (notificaciones por persona), `"content-{type}-{id}"` (salas de actividad sintéticas), y los ids encriptados `streamingLiveHost`.
- **La autenticación se verifica en el límite REST, no en el socket.** Unirse a una sala por `POST /connections` es anónimo-permitido; el control de acceso ocurre en el momento de enviar el mensaje (el controlador de mensajes decide qué `messageType`s puede enviar un llamador anónimo).

## Páginas Relacionadas

- [Arquitectura de Notificaciones](./architecture/notifications) -- El embudo de escalación en-app/push/correo al que este transporte alimenta
- [Puntos Finales de Mensajería](./api/endpoints/messaging) -- Superficie REST completa para mensajes, conversaciones, conexiones, dispositivos
- [Notificaciones Push Web](./web-push) -- Push del navegador, separado de la entrega de socket en página
- [AppHelper](./shared-libraries/app-helper) -- El paquete npm que envía las primitivas de cliente
- [Estructura del Módulo](./api/module-structure) -- Cómo se organiza el módulo de mensajería del lado del servidor
