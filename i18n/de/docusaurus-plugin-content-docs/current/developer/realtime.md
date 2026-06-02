---
title: "Echtzeit-Architektur"
---

# Echtzeit-Architektur

<div class="article-intro">

ChurchApps verwendet ein einzelnes WebSocket-basiertes Zustellungs-Framework für jede Echtzeit-Oberfläche -- Gruppen-Chat, private Nachrichten, Inhaltsnotizen, Live-Stream-Chat und Präsenz/Teilnahme.

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

Das Protokoll hat drei Teile:

1. **Ein persistenter WebSocket** pro Browser-Tab
2. **Verbindungszeilen** (`POST /messaging/connections`)
3. **Server-seitige Fan-Out** durch `DeliveryHelper.sendConversationMessages()`

## Ports and transport

| Environment | HTTP | WebSocket |
|-------------|------|-----------|
| Local dev   | `8084` | `ws://localhost:8087` |
| Railway | shared | shared |
| AWS Lambda | API Gateway | API Gateway |

## Wire protocol

Jeder Frame ist JSON der Form `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;
  action: PayloadAction;
  data: unknown;
}
```

## Server-side components

| File | Role |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Besitzt den `WebSocketServer` |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | Leitet Frames an Sockets |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | Joins/Leaves |
| `Api/src/modules/messaging/controllers/MessageController.ts` | Speichert und Fan-Out |

## Client-side primitives

Alle fünf Primitiven sind statische Singletons.

### `SocketHelper`

Besitzt die einzelne WebSocket-Verbindung.

### `SubscriptionManager`

Ref-gezählte Raum-Mitgliedschaft.

### `ConversationStore`

In-Memory-Cache nach `conversationId`.

### `PresenceStore`

Spiegelt `ConversationStore`'s Muster für die `attendance`-Aktion.

### `NotificationService`

Top-Level-Boot für **authentifizierte** Aufrufer.

## Live stream chat

Der Live-Stream ist der größte anonyme Consumer des Frameworks.

## Related Pages

- [Messaging Endpoints](./api/endpoints/messaging)
- [Web Push Notifications](./web-push)
- [AppHelper](./shared-libraries/app-helper)
