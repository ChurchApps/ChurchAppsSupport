---
title: "Web Push Notifications"
---

# Web Push Notifications

<div class="article-intro">

ChurchApps web apps deliver push notifications via the W3C Web Push API — the same mechanism used by Firebase Cloud Messaging on the server side, but delivered through the browser's native `PushManager` instead of FCM. A single VAPID key pair on the MessagingApi covers every consumer (B1Admin, B1App, future PWAs).

</div>

## When push fires

Push is one tier in a single delivery pass inside `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): an in-app preference gate, then socket delivery and push attempted in the same pass (each behind its own preference gate), then email. A recipient who has muted the category never reaches push. Socket delivery succeeding no longer stops push — every notification type now behaves the way private messages always did, so an installed PWA sitting in the background still surfaces an OS-level notification even when a socket delivery already landed; duplicate banners are suppressed client-side by the service worker instead (see [Service worker requirement](#service-worker-requirement)). Scheduled reminders and staff-triggered broadcasts start directly at the push tier, skipping the socket step altogether. Email remains timer-driven, escalating unread rows on its own schedule rather than as part of this pass.

The most common paths that reach push:

1. **Content notifications** — a reply to a conversation the person follows, a mention, or another event routed through `NotificationHelper.createNotifications()`.
2. **Private messages** — a direct message goes through the same delivery function and always attempts push alongside socket delivery.
3. **Scheduled reminders** — event, task, and serving reminders expanded and dispatched by the reminder engine, which starts new occurrences directly at the push tier.
4. **Staff-triggered pushes** — `POST /messaging/notifications/create`, `/ping`, and `/group/send` for one-off or group broadcasts.

## Server flow

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app preference gate                  ← muted recipients stop here, no push
       ├─ same pass, both attempted (neither gates the other):
       │    ├─ socket delivery via DeliveryHelper  ← skipped for reminders/broadcasts (they start at push)
       │    └─ push preference gate
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signed POST → browser push service
       └─ email preference gate → timer-driven, escalates unread rows separately
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

The browser's `PushManager` only resolves a subscription when a service worker is registered at the configured scope. ChurchApps PWAs use [Serwist](https://serwist.dev/) (Next.js apps) or workbox for service worker generation. Because the server now always attempts push alongside socket delivery (see [When push fires](#when-push-fires)), the service worker is the dedup point: its `push` handler must suppress `showNotification` when a focused/visible client is already on the notification's deep-link target, but should always update the app badge regardless of whether the banner was shown:

```javascript
// public/sw.js (or whatever Serwist/workbox emits)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // always runs, even if the banner is suppressed

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Same pathname; for private messages, also same conversationId.
    const alreadyViewing = clients.some((client) => (client.focused || client.visibilityState === "visible") && clientMatchesTarget(client.url, target));
    if (alreadyViewing) return;

    await self.registration.showNotification(title, {
      body: data.body,
      data: { type: data.type, contentId: data.contentId, url: target },
      icon: "/icons/icon-192.png"
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { url: target } = event.notification.data || {};
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });

    const exact = clients.find((client) => clientMatchesTarget(client.url, target));
    if (exact) return exact.focus(); // already on the target: focus, don't navigate

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` are consumer-specific — see `B1App/src/app/sw.ts` for the reference implementation. B1App routes `privateMessage` to `/mobile/messages/:personId`, B1Admin routes `notification` to its alerts panel, etc.

## Operational notes

- **`gone: true` results** — `WebPushHelper.sendBulk` returns `{ token, success, gone, errorMessage }` per recipient. A `gone: true` result (push service responded `404` or `410`) means the subscription is permanently invalid; downstream code in `NotificationHelper` deletes those device rows so they aren't tried again.
- **TTL** — push messages are sent with `TTL: 86400` (24 hours). If the user's browser doesn't connect to the push service within 24 hours, the push is dropped.
- **No retries** — a transient failure (timeout, 5xx) is logged and not retried. Push is best-effort; the in-page socket and the email notification tier handle the durability story.
- **Disabled environments** — staging and dev environments can leave the VAPID keys empty; `WebPushHelper.isEnabled()` will return `false` and pushes will short-circuit. This is the intended behavior for environments without their own VAPID identity.

## Related Pages

- [Notifications Architecture](./architecture/notifications) -- The full in-app/push/email escalation funnel and the reminder engine
- [Real-time Architecture](./realtime) -- WebSocket delivery; push now fires from the same in-app funnel alongside socket delivery in the same pass, not only as a fallback when a socket delivery doesn't land
- [Messaging Endpoints](./api/endpoints/messaging) -- Notifications, devices, and the rest of the messaging surface
- [AppHelper](./shared-libraries/app-helper) -- The npm package that ships `WebPushHelper`
