---
title: "Web Push Notifications"
---

# Web Push Notifications

<div class="article-intro">

Ang mga web apps ng ChurchApps ay naghahatid ng push notifications sa pamamagitan ng W3C Web Push API. Ang isang solong VAPID key pair sa MessagingApi ay sumasaklaw sa bawat consumer (B1Admin, B1App, future PWAs).

</div>

## Kailan ang push ay sumusunod

Ang MessagingApi ay naghahatid ng isang Web Push message sa tatlong sitwasyon:

1. **Mga notification ng grupo / content** -- may sumasagot sa isang thread na sinusubaybayan mo
2. **Mga pribadong mensahe** -- `POST /messaging/privatemessages` ay nag-trigger ng isang push
3. **Mga generic na notification** -- direktang mga tawag sa `POST /messaging/notifications/create`

Ang push ay ang **last-resort tier**. Kung ang isang recipient ay may isang aktibong WebSocket connection, sila ay tumatanggap ng mensahe sa-app at ang push ay napiwalan.

## Server flow

```
NotificationHelper.checkShouldNotify(...)
  ├─ in-page socket delivery via DeliveryHelper (preferred)
  └─ WebPushHelper.sendBulkTypedMessages(...)
       └─ web-push library → VAPID-signed POST → browser push service
```

### Kinakailangang environment variables

| Variable | Paglalarawan |
|----------|-------------|
| `webPushPublicKey` | VAPID public key (base64url) |
| `webPushPrivateKey` | VAPID private key |
| `webPushSubject` | `mailto:` URI reported to push services |

### Lumilikha ng isang VAPID key pair

```bash
npx web-push generate-vapid-keys
```

## Storage model

Ang mga Web Push subscriptions ay nakaimbak sa `devices` table kasama ang FCM device records.

## Mga Endpoint

Base path: `/messaging/webpush`

| Method | Path | Auth | Paglalarawan |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | Ibabalik ang `{ publicKey, enabled }` |
| POST | `/subscribe` | JWT | Nagrehistro ng subscription |
| POST | `/unsubscribe` | Public | Binabura ang subscription |
| DELETE | `/subscription/:id` | JWT | Binabura ang device row |

## Client primitive: `WebPushHelper`

Ang `@churchapps/apphelper`'s `WebPushHelper` ay ang solong client-side entry point.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

WebPushHelper.configure({
  scope: "/",
  appName: "B1AppPwa"
});

await WebPushHelper.subscribe();
```

## Service worker requirement

Ang service worker ay dapat na may kasamang `push` event handler na tumatawag ng `self.registration.showNotification()`.

## Mga operational notes

- **`gone: true` results** -- push service responded `404` o `410` (permanently invalid)
- **TTL** -- push messages ay ipinapadala na may `TTL: 86400` (24 oras)
- **Walang retries** -- ang transient failure ay naka-log at hindi sinubukan muli
- **Disabled environments** -- staging at dev ay maaaring iwanan ang VAPID keys na blangko
