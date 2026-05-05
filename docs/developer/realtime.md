---
title: "Real-time Architecture"
---

# Real-time Architecture

<div class="article-intro">

ChurchApps uses a single WebSocket-based delivery framework for every real-time surface — group chat, private messages, content notes, the live stream chat, and presence/attendance. This page documents the protocol, the server, and the client primitives that consumers use.

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

The protocol has three pieces:

1. **One persistent WebSocket** per browser tab, opened by `SocketHelper`.
2. **Connection rows** (`POST /messaging/connections`) recorded in the `connections` table — these mark a `(socketId, churchId, conversationId)` tuple as a subscriber to a room.
3. **Server-side fan-out** by `DeliveryHelper.sendConversationMessages()` — when a message is saved (`POST /messaging/messages/send`), the server reads the matching connection rows and pushes a typed payload to each open socket.

There is no Socket.IO, no long-polling fallback, and no separate microservice. The WebSocket runs in the same process as the REST API (`web` Lambda for HTTP, `socket` Lambda for WebSocket in AWS; one combined process locally and on Railway).

## Ports and transport

| Environment | HTTP | WebSocket |
|-------------|------|-----------|
| Local dev   | `8084` | `ws://localhost:8087` (separate `WebSocketServer`) |
| Railway / single-port hosts | shared | shared HTTP server (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default` routes) |

The transport selector is the `deliveryProvider` config:

- `local` → raw `ws` library; clients connect to `MessagingApiSocket` from `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; the server posts payloads to active connections via `@aws-sdk/client-apigatewaymanagementapi`.

The client never has to know which is in use — it speaks the same JSON protocol either way.

## Wire protocol

Every frame is JSON of shape `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // the "room" — usually a UUID, sometimes "alerts" or "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, after connect, carries the socketId to use for room joins
  | "message"             // server → client, new message
  | "deleteMessage"       // server → client, message removed
  | "privateMessage"      // server → client, new message in a private conversation
  | "conversationActivity"// server → client, secondary "something happened" signal for content-room subscribers
  | "attendance"          // server → client, viewer list / presence snapshot
  | "notification"        // server → client, generic notification (counts, etc.)
  | "reconnect"           // client-internal, fired by SocketHelper when a fresh socket replaces a dropped one
  | "alert" | "callout";  // legacy, see Connections endpoint reference
```

### Handshake

1. Client opens the socket and sends the literal string `"getId"`.
2. Server replies with `{ action: "socketId", data: "<id>" }`.
3. Client stores the `socketId` and uses it as the third coordinate of every room subscription.

### Joining a room

A "room" is just a `(churchId, conversationId)` tuple. To subscribe, the client posts a `Connection` row:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null for anonymous live stream viewers
    "displayName": "Anonymous4823"
  }
]
```

Posting also triggers an `attendance` broadcast on the conversation so existing subscribers learn a new viewer joined.

### Sending a message

`POST /messaging/messages/send` (anonymous-allowed) or `POST /messaging/messages/` (auth-required):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

The server saves the message, then `DeliveryHelper.sendConversationMessages()` looks up every connection row for that `conversationId` and sends each socket a `{ action: "message", data: <message> }` frame.

For content-bound conversations (e.g., notes attached to a person), a second broadcast with `action: "conversationActivity"` fires on the synthetic `"content-{type}-{id}"` room so list-view consumers know to refresh without holding the underlying conversation open.

### Leaving a room

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Clears the connection row and triggers a final attendance broadcast.

## Server-side components

| File | Role |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Owns the `WebSocketServer`. Assigns `socketId` on connect. Cleans up dead sockets and triggers an attendance rebroadcast on disconnect |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` reads connections for the room and routes each frame to the local socket or the AWS API Gateway connection. `sendAttendance(churchId, conversationId)` builds and broadcasts the viewer snapshot |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` joins, `DELETE /:churchId/:conversationId/:socketId` leaves, `POST /setName` updates display name |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonymous) and `POST /` (authed) save then fan out |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` is the source of truth for who's subscribed |

## Client-side primitives (`@churchapps/apphelper`)

All five primitives are static singletons in `apphelper/src/helpers/`. They cooperate so that each tab opens **one** WebSocket no matter how many components mount on the page.

### `SocketHelper`

Owns the single WebSocket connection. Re-entrant `init()` is idempotent — multiple components can call it without opening duplicate sockets. Exposes:

- `init()` — open (or re-use) the socket and complete the `getId` handshake.
- `addHandler(action, id, fn)` / `removeHandler(id)` — register/unregister listeners by `action`. Multiple handlers can listen to the same action.
- `setPersonChurch({ personId, churchId })` — for authenticated callers; triggers an `"alerts"` room subscription so push notifications arrive on this socket.
- `onSocketIdReady(fn)` — fires once when the handshake completes; used by `SubscriptionManager` to flush pending joins.

### `SubscriptionManager`

Ref-counted room membership. Multiple components subscribing to the same conversation only register one server-side connection row.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Three behaviors that consumers get for free:

- **Debounced leave (300 ms)** — survives React StrictMode's double mount/unmount and short remount cycles without dropping the server-side subscription.
- **Reconnect rejoin** — listens for `SocketHelper`'s `"reconnect"` event and re-issues every active connection row.
- **Late-binding socketId** — `joinRoom` records intent before the socket finishes its handshake; the actual `POST /connections` fires on `onSocketIdReady`.

### `ConversationStore`

In-memory cache keyed by `conversationId`. Registers `message` / `deleteMessage` / `privateMessage` socket handlers exactly once and applies inbound frames to whichever conversations are currently open.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ uses /messages/conversation/:id when authenticated, /messages/catchup/:churchId/:id when anonymous

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render with the latest snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optional explicit cleanup
```

Authenticated callers also get **people hydration** — `personId`s on incoming messages are resolved to `PersonInterface` objects via a cached `GET /people/ids` lookup. Anonymous callers skip this.

### `PresenceStore`

Mirrors `ConversationStore`'s pattern for the `attendance` action. Subscribers receive a `PresenceSnapshot { conversationId, totalViewers, viewers }` whenever the server rebroadcasts presence. Identical snapshots are deduped before notify, so reconnect storms don't trigger unnecessary re-renders.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Top-level boot for **authenticated** callers. Wraps `SocketHelper.init()`, sets the person/church context (which auto-joins the `"alerts"` room), and calls `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` exactly once.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonymous flows (the live stream chat is the canonical example) skip `NotificationService` and call the primitives directly — see `B1App/src/helpers/StreamChatManager.ts` for a reference implementation.

## Live stream chat

The live stream is the largest anonymous consumer of the framework. It uses two `contentType`s for room scoping:

- `streamingLive` — the public chat tab on `/stream` (one room per `streamingService`).
- `streamingLiveHost` — a private room visible only to staff with the `contentApi.chat.host` permission. The room id is encrypted on the server (`GET /streamingServices/:id/hostChat`) so casual scraping doesn't reveal it.

`B1App/src/helpers/StreamChatManager.ts` boots both rooms via the unified primitives — there is no live-stream-specific socket code anymore.

## Patterns and pitfalls

- **Don't open your own WebSocket.** `SocketHelper` is a singleton for a reason. If you need to listen for a custom action, register a handler on the existing socket via `SocketHelper.addHandler`.
- **Don't bypass `SubscriptionManager`.** Direct `POST /connections` calls work but lose ref counting, debounced leave, and reconnect rejoin. Group chat and PM consumers all go through `SubscriptionManager`.
- **Handler ids must be unique per action.** `SocketHelper.addHandler(action, id, fn)` keys by `(action, id)`; reusing the same id for two listeners replaces the first. The unified stores use ids like `"ConversationStore-Message"` and `"PresenceStore-Attendance"` to stay clear of consumer ids.
- **Room ids are opaque strings.** Most are conversation UUIDs but the system also supports `"alerts"` (per-person notifications), `"content-{type}-{id}"` (synthetic activity rooms), and the encrypted `streamingLiveHost` ids.
- **Authentication is checked at the REST boundary, not the socket.** Joining a room by `POST /connections` is anonymous-allowed; access control happens at message-send time (the message controller decides what `messageType`s an anonymous caller may send).

## Related Pages

- [Messaging Endpoints](./api/endpoints/messaging) -- Full REST surface for messages, conversations, connections, devices
- [Web Push Notifications](./web-push) -- Browser push, separate from in-page socket delivery
- [AppHelper](./shared-libraries/app-helper) -- The npm package that ships the client primitives
- [Module Structure](./api/module-structure) -- How the messaging module is organized server-side
