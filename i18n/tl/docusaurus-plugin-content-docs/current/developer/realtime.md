---
title: "Real-time Architecture"
---

# Real-time Architecture

<div class="article-intro">

Ang ChurchApps ay gumagamit ng isang single WebSocket-based delivery framework para sa bawat real-time surface — group chat, private messages, content notes, ang live stream chat, at presence/attendance. Ang page na ito ay nag-document sa protocol, sa server, at sa client primitives na ginagamit ng consumers.

</div>

## Overview

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

Ang protocol ay may tatlong piraso:

1. **Isang persistent WebSocket** bawat browser tab, binuksan ng `SocketHelper`.
2. **Connection rows** (`POST /messaging/connections`) na naka-record sa `connections` table — ang mga ito ay nagtutukoy ng `(socketId, churchId, conversationId)` tuple bilang isang subscriber sa isang room.
3. **Server-side fan-out** ng `DeliveryHelper.sendConversationMessages()` — kapag ang isang message ay saved (`POST /messaging/messages/send`), ang server ay nagsasaad ng matching connection rows at nag-push ng isang typed payload sa bawat open socket.

Walang Socket.IO, walang long-polling fallback, at walang separate microservice. Ang WebSocket ay tumatakbo sa parehong process tulad ng REST API (`web` Lambda para sa HTTP, `socket` Lambda para sa WebSocket sa AWS; isang combined process nang lokal at sa Railway).

## Ports at transport

| Environment | HTTP | WebSocket |
|-------------|------|-----------|
| Local dev   | `8084` | `ws://localhost:8087` (separate `WebSocketServer`) |
| Railway / single-port hosts | shared | shared HTTP server (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default` routes) |

Ang transport selector ay ang `deliveryProvider` config:

- `local` → raw `ws` library; ang mga clients ay kumokonekta sa `MessagingApiSocket` mula sa `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; ang server ay nag-post ng payloads sa active connections sa pamamagitan ng `@aws-sdk/client-apigatewaymanagementapi`.

Ang client ay hindi kailanman kailangang malaman kung alin ang ginagamit — ito ay nagsasalita ng parehong JSON protocol sa alinmang paraan.

## Wire protocol

Bawat frame ay JSON ng shape `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // ang "room" — kadalasan isang UUID, minsan "alerts" o "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, pagkatapos ng connect, nagdadala ng socketId upang gamitin para sa room joins
  | "message"             // server → client, bagong message
  | "deleteMessage"       // server → client, message na tinanggal
  | "privateMessage"      // server → client, badge-count ping sa "alerts" room ng recipient kapag ang isang direct message ay umakyat; ang message body mismo ay dumating sa pamamagitan ng ordinary "message" action sa loob ng open conversation
  | "reaction"            // server → client, emoji reaction na toggle sa isang message; data ay { messageId, conversationId, personId, emoji, added } (added=false ay nangangahulugan na tinanggal). Broadcast sa conversation room ng POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, secondary "something happened" signal para sa content-room subscribers
  | "attendance"          // server → client, viewer list / presence snapshot
  | "notification"        // server → client, generic notification (counts, atbp.)
  | "reconnect"           // client-internal, dispatched nang lokal ng SocketHelper pagkatapos ng isang bagong socketId handshake na kumpleto pagkatapos ng isang drop — alinman isang exponential-backoff reconnect pagkatapos ng isang unexpected close, o isang immediate reconnect na triggered ng resume probe (tab focus/visibility/online); hindi kailanman ipinapadala ng server
  | "alert" | "callout";  // legacy, tingnan ang Connections endpoint reference
```

### Handshake

1. Client ay nag-open ng socket at nagpadala ng literal string `"getId"`.
2. Server ay sumagot ng `{ action: "socketId", data: "<id>" }`.
3. Client ay nag-store ng `socketId` at ginagamit ito bilang pangatlong coordinate ng bawat room subscription.

### Sumali sa isang room

Isang "room" ay simpleng isang `(churchId, conversationId)` tuple. Upang mag-subscribe, ang client ay nag-post ng `Connection` row:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null para sa anonymous live stream viewers
    "displayName": "Anonymous4823"
  }
]
```

Ang pag-post ay nag-trigger din ng `attendance` broadcast sa conversation upang malaman ng existing subscribers na ang isang bagong viewer ay sumali.

### Magpadala ng isang message

`POST /messaging/messages/send` (anonymous-allowed) o `POST /messaging/messages/` (auth-required):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Ang server ay nag-save ng message, pagkatapos ang `DeliveryHelper.sendConversationMessages()` ay tumitingin ng bawat connection row para sa `conversationId` na iyon at nagpadala sa bawat socket ng `{ action: "message", data: <message> }` frame.

Para sa content-bound conversations (hal., notes na nakakabit sa isang tao), isang pangalawang broadcast na may `action: "conversationActivity"` ay nag-fire sa synthetic `"content-{type}-{id}"` room upang malaman ng list-view consumers na mag-refresh nang hindi pinapanatili ang underlying conversation na bukas.

### Umalis sa isang room

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Ay nag-clear ng connection row at nag-trigger ng isang final attendance broadcast.

## Server-side components

| File | Role |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | May-ari ng `WebSocketServer`. Nag-assign ng `socketId` sa connect. Tumatakbo ng isang 30s ping/pong heartbeat (`startHeartbeat`) na `terminate()`s at nag-clean up ng anumang connection na nakaligtaan ng pong. Nag-clean up ng dead sockets at nag-trigger ng attendance rebroadcast sa disconnect. Nag-expose ng `getLiveSocketIds()` at `reapStaleConnections()`, ginagamit ng 30-minuto timer job upang i-delete ang stale `connections` rows — nang lokal sa pamamagitan ng pag-check kung aling socketIds ay umiiral pa rin sa loob, sa AWS bilang 24h-TTL backstop para sa missed `$disconnect` events (API Gateway ay nag-cap ng connections sa ~2h, kaya ito ay hindi maaaring mag-reap ng isang buhay na isa) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` ay nagsasaad ng connections para sa room at nag-route ng bawat frame sa local socket o sa AWS API Gateway connection. `sendAttendance(churchId, conversationId)` ay bumubuo at naghahatid ng viewer snapshot |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` joins, `DELETE /:churchId/:conversationId/:socketId` leaves, `POST /setName` updates display name |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonymous) at `POST /` (authed) save pagkatapos fan out |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` ay ang source of truth para sa sino ang naka-subscribe |

## Client-side primitives (`@churchapps/apphelper`)

Ang lahat ng limang primitives ay static singletons sa `apphelper/src/helpers/`. Ang mga ito ay nakikipagtulungan upang bawat tab ay nag-open ng **isa** lamang na WebSocket hindi alintana kung gaano karaming components ang nag-mount sa page.

### `SocketHelper`

May-ari ng single WebSocket connection. Re-entrant `init()` ay idempotent — maraming components ang maaaring tawakin nito nang walang pagbubukas ng duplicate sockets. Nag-expose ng:

- `init()` — buksan (o i-reuse) ang socket at kumpletuhin ang `getId` handshake. Nagsasakatuparan sa sandaling nagtapos ang handshake o, pagkatapos ng 5s timeout, sa sandaling nagsimula na ng background retry loop ang; ito ay hindi kailanman nag-reject, kaya ang mga callers ay hindi kailangang espesyal-case ang isang napakuhang first connect.
- `addHandler(action, id, fn)` / `removeHandler(id)` — mag-register/unregister ng mga listener sa `action`. Maraming handlers ang maaaring makikinig sa parehong action.
- `setPersonChurch({ personId, churchId })` — para sa authenticated callers; nag-trigger ng `"alerts"` room subscription upang ang push notifications ay dumating sa socket na ito.
- `onSocketIdReady(fn)` — nag-fire sa bawat bagong socketId, hindi lamang ang unang — ang initial handshake at bawat susunod na reconnect. Ginagamit ng `SubscriptionManager` upang mag-flush ng pending joins.
- `checkConnection()` — na-invoke ng resume listeners sa ibaba; muling kumokonekta kaagad kung ang socket ay na-close na, o nagpadala ng liveness probe kung tila bukas ito.

**Reconnect lifecycle.** Isang unexpected close ay nag-schedule ng reconnect na may exponential backoff (1s, doubling hanggang sa 30s cap). `SocketHelper` ay nakikinig din para sa `online`, `focus`, `pageshow`, at `visibilitychange` sa `window`/`document` upang makita ang isang resumed tab: kung ang socket ay na-close na ito ay muling kumokonekta kaagad at nire-reset ang backoff; kung tila bukas ito, ito ay nagpadala ng `"getId"` liveness probe at pinipilitan ang reconnect kung walang frame na dumating sa loob ng 3s — ito ay nakakakuha ng half-open sockets na naiwan pagkatapos ng isang mobile OS ay suspende ang app. Sa isang matagumpay na re-handshake, `SocketHelper` ay nag-dispatch ng local `"reconnect"` action (tingnan ang [Wire protocol](#wire-protocol)) sa bawat registered handler para sa action na iyon.

### `SubscriptionManager`

Ref-counted room membership. Maraming components na nag-subscribe sa parehong conversation ay nag-register lamang ng isang server-side connection row.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Tatlong behaviors na libre ang nakukuha ng consumers:

- **Debounced leave (300 ms)** — nag-survive ng React StrictMode's double mount/unmount at short remount cycles nang walang pagdrop ng server-side subscription; `reset()` ay nag-cancel din ng anumang pending debounced leaves.
- **Reconnect rejoin** — `SubscriptionManager` ay naaalala ang `personId`/`displayName` na ginamit upang sumali sa bawat room, kaya sa `SocketHelper`'s `"reconnect"` event (at sa bawat `onSocketIdReady` call) ito ay muling nag-post ng bawat active connection row na may intact na identity. Ang mga rejoin ay deduped bawat socketId upang ang parehong reconnect ay hindi muling nag-post ng isang room ng dalawang beses.
- **Late-binding socketId** — `joinRoom` ay nag-record ng intent bago ang socket ay magtapos ng handshake; ang actual `POST /connections` ay nag-fire sa `onSocketIdReady`.

### `ConversationStore`

In-memory cache na may key ng `conversationId`. Nag-register ng `message` / `deleteMessage` / `privateMessage` socket handlers nang eksakto minsan at nag-apply ng inbound frames sa anumang conversations na kasalukuyang bukas.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ gumagamit ng /messages/conversation/:id kapag authenticated, /messages/catchup/:churchId/:id kapag anonymous

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render na may latest snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optional explicit cleanup
```

Ang authenticated callers ay nakakakuha rin ng **people hydration** — ang `personId`s sa incoming messages ay nire-resolve sa `PersonInterface` objects sa pamamagitan ng cached `GET /people/ids` lookup. Ang anonymous callers ay nag-skip nito.

Sa `SocketHelper`'s `"reconnect"` event, `ConversationStore` ay muling nag-fetch ng bawat conversation na kasalukuyang may active `subscribe` listeners, nirecover ang messages na napakaligtaan habang ang socket ay pababa. Ang anonymous conversations ay nag-skip sa catch-up na ito kung ang kanilang `churchId` ay hindi kailanman na-record (ang catch-up endpoint ay nangangailangan ng isa).

### `PresenceStore`

Mirrors ang `ConversationStore`'s pattern para sa `attendance` action. Ang mga subscribers ay tumatanggap ng `PresenceSnapshot { conversationId, totalViewers, viewers }` kapag ang server ay muling naghahatid ng presence. Ang mga identical snapshots ay deduped bago mag-notify, kaya ang reconnect storms ay hindi nag-trigger ng unnecessary re-renders.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Top-level boot para sa **authenticated** callers. Nag-wrap ng `SocketHelper.init()`, nag-set ng person/church context (na automatic na sumali sa `"alerts"` room), at tumatawag ng `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` nang eksakto minsan. Nag-register din ito ng sarili nitong `"reconnect"` handler na nag-reload ng notification/PM counts, kaya ang badges ay nakakabawi pagkatapos ng isang dropped connection.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Ang anonymous flows (ang live stream chat ay ang canonical example) ay nag-skip ng `NotificationService` at tumatawag ng primitives nang direkta — tingnan ang `B1App/src/helpers/StreamChatManager.ts` para sa isang reference implementation.

## Live stream chat

Ang live stream ay ang pinakamalaking anonymous consumer ng framework. Ginagamit nito ang dalawang `contentType`s para sa room scoping:

- `streamingLive` — ang public chat tab sa `/stream` (isang room bawat `streamingService`).
- `streamingLiveHost` — isang private room na nakikita lamang ng staff na may `contentApi.chat.host` permission. Ang room id ay naka-encrypt sa server (`GET /streamingServices/:id/hostChat`) kaya ang casual scraping ay hindi nagha-reveal nito.

`B1App/src/helpers/StreamChatManager.ts` ay nag-boot ng parehong rooms sa pamamagitan ng unified primitives — walang live-stream-specific socket code na nananatili na.

## Patterns at pitfalls

- **Huwag magbukas ng iyong sariling WebSocket.** `SocketHelper` ay isang singleton para sa isang dahilan. Kung kailangan mong makinig sa isang custom action, mag-register ng handler sa existing socket sa pamamagitan ng `SocketHelper.addHandler`.
- **Huwag pagwalain ang `SubscriptionManager`.** Direct `POST /connections` calls ay gumagana ngunit mawawalan ng ref counting, debounced leave, at reconnect rejoin. Ang group chat at PM consumers ay lahat ay dumadaan sa `SubscriptionManager`.
- **Ang handler ids ay dapat natatangi bawat action.** `SocketHelper.addHandler(action, id, fn)` ay key ng `(action, id)`; ang muling paggamit ng parehong id para sa dalawang listeners ay pinalitan ang unang. Ang unified stores ay gumagamit ng ids tulad ng `"ConversationStore-Message"` at `"PresenceStore-Attendance"` upang manatiling malinaw ng consumer ids.
- **Ang room ids ay opaque strings.** Karamihan ay conversation UUIDs ngunit ang system ay sumusuporta rin sa `"alerts"` (per-person notifications), `"content-{type}-{id}"` (synthetic activity rooms), at ang encrypted `streamingLiveHost` ids.
- **Ang authentication ay checked sa REST boundary, hindi ang socket.** Ang sumali sa isang room sa pamamagitan ng `POST /connections` ay anonymous-allowed; ang access control ay nangyayari sa message-send time (ang message controller ay nagpapasya kung anong `messageType`s ang maaaring ipadala ng isang anonymous caller).

## Related Pages

- [Notifications Architecture](./architecture/notifications) -- Ang in-app/push/email escalation funnel na ito transport ay sumusuporta
- [Messaging Endpoints](./api/endpoints/messaging) -- Full REST surface para sa messages, conversations, connections, devices
- [Web Push Notifications](./web-push) -- Browser push, hiwalay mula sa in-page socket delivery
- [AppHelper](./shared-libraries/app-helper) -- Ang npm package na naghahatid ng client primitives
- [Module Structure](./api/module-structure) -- Paano ino-organize ang messaging module sa server-side
