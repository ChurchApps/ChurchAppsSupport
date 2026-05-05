---
title: "Real-time Architecture"
---

# Real-time Architecture

<div class="article-intro">

Ang ChurchApps ay gumagamit ng isang WebSocket-based delivery framework para sa bawat real-time surface — group chat, private messages, content notes, live stream chat, at presence/attendance.

</div>

## Overview

Ang protocol ay may tatlong bahagi:

1. **Isang persistent WebSocket** bawat browser tab
2. **Connection rows** na naka-record sa `connections` table
3. **Server-side fan-out** ng `DeliveryHelper`

## Wire Protocol

Ang bawat frame ay JSON:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;
  action: PayloadAction;
  data: unknown;
}
```

## Server-side Components

| File | Tungkulin |
|------|------|
| `SocketHelper.ts` | May-ari ng WebSocketServer |
| `DeliveryHelper.ts` | Nagpapadala ng mga mensahe |
| `ConnectionController.ts` | Namamahala ng connection |

## Client-side Primitives

Ang lahat ng primitive ay static singleton sa `@churchapps/apphelper`:

- **SocketHelper** -- May-ari ng WebSocket connection
- **SubscriptionManager** -- Ref-counted room membership
- **ConversationStore** -- In-memory cache ng mga mensahe
- **PresenceStore** -- Nag-mirror ng attendance data
- **NotificationService** -- Top-level boot para sa authenticated caller

## Live Stream Chat

Ang live stream ay gumagamit ng dalawang `contentType` para sa room scoping:

- `streamingLive` -- Pampublikong chat
- `streamingLiveHost` -- Pribadong staff room

## Mga Kaugnay na Pahina

- [Messaging Endpoints](./api/endpoints/messaging)
- [Web Push Notifications](./web-push)
- [AppHelper](./shared-libraries/app-helper)
