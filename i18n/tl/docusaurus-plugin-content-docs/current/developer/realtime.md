---
title: "Real-time Architecture"
---

# Real-time Architecture

<div class="article-intro">

Ang ChurchApps ay gumagamit ng isang solong WebSocket-based delivery framework para sa bawat real-time surface -- group chat, private messages, content notes, ang live stream chat, at presence/attendance.

</div>

## Pangkalahatang Impormasyon

Ang protocol ay may tatlong bahagi:

1. **Isang persistent WebSocket** bawat browser tab, binuksan ng `SocketHelper`.
2. **Connection rows** na naka-record sa `connections` table -- ang mga ito ay minarkahan ng `(socketId, churchId, conversationId)` tuple.
3. **Server-side fan-out** ng `DeliveryHelper.sendConversationMessages()`.

Walang Socket.IO, walang long-polling fallback, at walang hiwalay na microservice. Ang WebSocket ay tumatakbo sa parehong proseso bilang ang REST API.

## Mga Port at transport

| Environment | HTTP | WebSocket |
|-------------|------|-----------|
| Local dev   | `8084` | `ws://localhost:8087` |
| Railway | shared | shared HTTP server |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket |

## Wire Protocol

Bawat frame ay JSON ng shape `PayloadInterface`.

### Handshake

1. Kliyente ay binuksan ang socket at ipinapadala ang literal string `"getId"`.
2. Server ay tumutugon na may `{ action: "socketId", data: "<id>" }`.
3. Kliyente ay nag-imbak ng `socketId`.

### Pagsali sa isang kuwarto

Ang isang "kuwarto" ay basta isang `(churchId, conversationId)` tuple. Upang mag-subscribe, ang kliyente ay nag-post ng isang `Connection` row.

### Pagpapadala ng isang mensahe

`POST /messaging/messages/send` (anonymous-allowed) o `POST /messaging/messages/` (auth-required).

### Umalis sa isang kuwarto

`DELETE /messaging/connections/:churchId/:conversationId/:socketId`.

## Server-side components

| File | Papel |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Ang may-ari ng `WebSocketServer` |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | Nag-route ng mga frame sa sockets |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | Handles joins at leaves |
| `Api/src/modules/messaging/controllers/MessageController.ts` | Save messages at fan out |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | Source of truth for subscribers |

## Client-side primitives

### `SocketHelper`

Ang may-ari ng solong WebSocket connection. Re-entrant `init()` ay idempotent.

### `SubscriptionManager`

Ref-counted kuwarto membership.

### `ConversationStore`

In-memory cache keyed by `conversationId`.

### `PresenceStore`

Mirrors `ConversationStore`'s pattern para sa `attendance` action.

### `NotificationService`

Top-level boot para sa authenticated callers.

## Mga pattern at pitfalls

- **Huwag magbukas ng iyong sariling WebSocket.**
- **Huwag liparin ang `SubscriptionManager`.**
- **Ang mga ID ng handler ay dapat na natatangi bawat aksyon.**
- **Ang mga kuwarto ids ay opaque strings.**
- **Ang authentication ay sinusuri sa REST boundary, hindi ang socket.**
