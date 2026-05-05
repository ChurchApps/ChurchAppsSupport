---
title: "Web Push Notifications"
---

# Web Push Notifications

<div class="article-intro">

Ang ChurchApps web apps ay naghahatid ng push notification sa pamamagitan ng W3C Web Push API — ang parehong mekanismo na ginagamit ng Firebase Cloud Messaging sa server side, ngunit ihinahatid sa pamamagitan ng native `PushManager` ng browser sa halip na FCM.

</div>

## Kailan Nag-fire ang Push

Ang MessagingApi ay naghahatid ng Web Push message sa tatlong sitwasyon:

1. **Group / content notifications** — may sumagot sa thread
2. **Private messages** — direktang mensahe sa recipient
3. **Generic notifications** — direktang tawag sa notification endpoint

## Server Flow

```
NotificationHelper
  ├─ in-page socket delivery
  └─ WebPushHelper.sendBulkTypedMessages()
       └─ web-push library → browser push service
```

### Kinakailangang Environment Variables

| Variable | Paglalarawan |
|----------|-------------|
| `webPushPublicKey` | VAPID public key |
| `webPushPrivateKey` | VAPID private key |
| `webPushSubject` | `mailto:` URI |

### Paggawa ng VAPID Key Pair

```bash
npx web-push generate-vapid-keys
```

## Storage Model

Ang Web Push subscription ay naka-store sa `devices` table na may `webpush:` prefix.

## Endpoints

Base path: `/messaging/webpush`

| Method | Path | Auth | Paglalarawan |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | Nagbabalik ng public key |
| POST | `/subscribe` | JWT | Nagrerehistro ng subscription |
| POST | `/unsubscribe` | Public | Nag-delete ng subscription |

## Client Primitive: WebPushHelper

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

WebPushHelper.configure({
  scope: "/",
  appName: "B1AppPwa"
});

await WebPushHelper.subscribe();
```

## Service Worker Requirement

Ang browser's `PushManager` ay nangangailangan ng registered service worker.

## Mga Kaugnay na Pahina

- [Real-time Architecture](./realtime)
- [Messaging Endpoints](./api/endpoints/messaging)
- [AppHelper](./shared-libraries/app-helper)
