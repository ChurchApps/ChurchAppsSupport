---
title: "Web Push Notifications"
---

# Web Push Notifications

<div class="article-intro">

ChurchApps web apps deliver push notifications via the W3C Web Push API — the same mechanism used by Firebase Cloud Messaging on the server side, but delivered through the browser's native `PushManager` instead of FCM. A single VAPID key pair on the MessagingApi covers every consumer (B1Admin, B1App, future PWAs).

</div>

## When push fires

The MessagingApi delivers a Web Push message in three situations, all routed through `Api/src/modules/messaging/helpers/NotificationHelper.ts`:

1. **Group / content notifications** — someone replies to a thread the user follows or is mentioned in.
2. **Private messages** — `POST /messaging/privatemessages` triggers a push to the recipient's enrolled devices.
3. **Generic notifications** — direct calls to `POST /messaging/notifications/create` or `/ping`.

Push is the **last-resort tier** in `NotificationHelper`'s escalation ladder. If a recipient has an active WebSocket connection in the relevant room (see [Real-time Architecture](./realtime)), they receive the message in-app and push is suppressed for that delivery. Push only fires when the user is offline or hasn't been seen recently.

## Server flow

```
NotificationHelper.checkShouldNotify(...)
  │
  ├─ in-page socket delivery via DeliveryHelper  ← preferred
  │
  └─ NotificationHelper.<sendXxx>(...)
       └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
            └─ web-push library → VAPID-signed POST → browser push service
```

### Required environment variables

VAPID keys are stored in `Environment` and must be present for push to be enabled:

| Variable | Description |
|----------|-------------|
| `webPushPublicKey` | VAPID public key (base64url). Returned to clients via `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | VAPID private key. Used to sign every outbound push |
| `webPushSubject` | `mailto:` URI reported to push services. Defaults to `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` returns `false` when either key is missing — the messaging module continues to operate, push deliveries simply no-op.

### Generating a VAPID key pair

```bash
npx web-push generate-vapid-keys
```

Add the output to your `.env` (local) or AWS SSM Parameter Store (deployed). Rotating keys invalidates every existing subscription — clients must re-enroll on next page load.

## Storage model

Web Push subscriptions are stored in the existing `devices` table alongside FCM device records. They're distinguished by a `webpush:` prefix on the `fcmToken` column:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

This lets a single `loadByPersonId` call return every device a user has enrolled, regardless of platform. `WebPushHelper.isWebPushToken(token)` and `decodeSubscription(token)` handle the prefix logic.

## Endpoints

Base path: `/messaging/webpush`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | Returns `{ publicKey, enabled }`. Clients pass `publicKey` to `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registers (or upserts) a subscription for the authenticated user. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | Deletes any device row whose `fcmToken` contains the given endpoint. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Deletes a specific device row by its server-side id |

## Client primitive: `WebPushHelper`

`@churchapps/apphelper`'s `WebPushHelper` is the single client-side entry point. Hosts configure it once at boot and call `subscribe()` after login.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// In your app's bootstrap (e.g., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; matches sw.js registration
  appName: "B1AppPwa"        // stored on the device row, useful for filtering by surface
});

// After login (and after every userChurch change)
await WebPushHelper.subscribe();
```

Behaviors that consumers get for free:

- **Capability check** — `isSupported()` returns `false` on browsers without `serviceWorker` / `PushManager` / `Notification`.
- **Cooldown** — `canPromptNow()` enforces a 7-day cooldown between prompts via `localStorage` so users who dismiss the OS prompt aren't asked again on every session.
- **Opt-out** — `setOptedOut(true)` and `unsubscribe()` block re-prompting and remove the server-side device row.
- **Standalone-PWA detection** — `isStandalone()` lets hosts gate iOS push prompts behind "user has installed the PWA to their home screen" (iOS only allows push from installed PWAs).
- **Re-enroll on church switch** — `refreshEnrollment()` reposts the existing browser subscription against the new `userChurch` without re-prompting the user. Call it from the `userChurch` change handler.

### Service worker requirement

The browser's `PushManager` only resolves a subscription when a service worker is registered at the configured scope. ChurchApps PWAs use [Serwist](https://serwist.dev/) (Next.js apps) or workbox for service worker generation. The service worker must include a `push` event handler that calls `self.registration.showNotification(title, options)` to render the OS-level notification when the push arrives:

```javascript
// public/sw.js (or whatever Serwist/workbox emits)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  event.waitUntil(self.registration.showNotification(title, {
    body: data.body,
    data: { type: data.type, contentId: data.contentId },
    icon: "/icons/icon-192.png"
  }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { type, contentId } = event.notification.data || {};
  event.waitUntil(self.clients.openWindow(deepLinkFor(type, contentId)));
});
```

`deepLinkFor` is consumer-specific — B1App routes `privateMessage` to `/mobile/messages/:id`, B1Admin routes `notification` to its alerts panel, etc.

## Operational notes

- **`gone: true` results** — `WebPushHelper.sendBulk` returns `{ token, success, gone, errorMessage }` per recipient. A `gone: true` result (push service responded `404` or `410`) means the subscription is permanently invalid; downstream code in `NotificationHelper` deletes those device rows so they aren't tried again.
- **TTL** — push messages are sent with `TTL: 86400` (24 hours). If the user's browser doesn't connect to the push service within 24 hours, the push is dropped.
- **No retries** — a transient failure (timeout, 5xx) is logged and not retried. Push is best-effort; the in-page socket and the email notification tier handle the durability story.
- **Disabled environments** — staging and dev environments can leave the VAPID keys empty; `WebPushHelper.isEnabled()` will return `false` and pushes will short-circuit. This is the intended behavior for environments without their own VAPID identity.

## Related Pages

- [Real-time Architecture](./realtime) -- WebSocket delivery; push is the offline-fallback for the same notifications
- [Messaging Endpoints](./api/endpoints/messaging) -- Notifications, devices, and the rest of the messaging surface
- [AppHelper](./shared-libraries/app-helper) -- The npm package that ships `WebPushHelper`
