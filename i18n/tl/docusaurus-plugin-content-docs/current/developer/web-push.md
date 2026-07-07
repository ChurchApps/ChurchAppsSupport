---
title: "Web Push Notifications"
---

# Web Push Notifications

<div class="article-intro">

Ang ChurchApps web apps ay nag-deliver ng push notifications sa pamamagitan ng W3C Web Push API — ang parehong mekanismo na ginagamit ng Firebase Cloud Messaging sa server side, ngunit na-deliver sa pamamagitan ng browser's native `PushManager` sa halip ng FCM. Isang single VAPID key pair sa MessagingApi ay sumasaklaw sa bawat consumer (B1Admin, B1App, future PWAs).

</div>

## Kailan ang push ay nag-fire

Ang push ay isang tier sa isang single delivery pass sa loob ng `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): isang in-app preference gate, pagkatapos ang socket delivery at push na sinusubukan sa parehong pass (bawat isa sa likod ng sarili nitong preference gate), pagkatapos ang email. Ang isang recipient na nag-mute ng category ay hindi kailanman umaabot sa push. Ang socket delivery na matagumpay ay hindi na humihigil sa push — bawat notification type ay kumikilos na parang laging ginawa ng private messages, kaya ang isang installed PWA na umuupo sa background ay patuloy na may OS-level notification kahit na ang socket delivery ay umabot na; ang duplicate banners ay ma-suppress ng client-side ng service worker sa halip (tingnan ang [Service worker requirement](#service-worker-requirement)). Ang scheduled reminders at staff-triggered broadcasts ay nagsisimula direkta sa push tier, nag-skip ng socket step nang lubusan. Ang email ay nananatiling timer-driven, na nag-escalate ng unread rows sa sarili nitong schedule sa halip na bilang bahagi ng pass na ito.

Ang pinakakaraniwang paths na umabot sa push:

1. **Content notifications** — isang reply sa isang conversation na sinusundan ng tao, isang mention, o iba pang event na nag-route sa pamamagitan ng `NotificationHelper.createNotifications()`.
2. **Private messages** — isang direct message ay napupunta sa parehong delivery function at palaging sinusubukan ang push kasama ng socket delivery.
3. **Scheduled reminders** — event, task, at serving reminders na pinalawak at dispatched ng reminder engine, na nagsisimula ng bagong occurrences direkta sa push tier.
4. **Staff-triggered pushes** — `POST /messaging/notifications/create`, `/ping`, at `/group/send` para sa one-off o group broadcasts.

## Server flow

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app preference gate                  ← muted recipients ay humihigil dito, walang push
       ├─ same pass, pareho sinusubukan (hindi isa ang humahadlang sa isa):
       │    ├─ socket delivery via DeliveryHelper  ← skipped para sa reminders/broadcasts (sila ay nagsisimula sa push)
       │    └─ push preference gate
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signed POST → browser push service
       └─ email preference gate → timer-driven, nag-escalate ng unread rows nang hiwalay
```

### Required environment variables

Ang VAPID keys ay naka-store sa `Environment` at dapat na present para ang push ay maging enabled:

| Variable | Description |
|----------|-------------|
| `webPushPublicKey` | VAPID public key (base64url). Na-return sa clients sa pamamagitan ng `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | VAPID private key. Ginagamit upang i-sign ang bawat outbound push |
| `webPushSubject` | `mailto:` URI na ine-report sa push services. Nakadefault sa `mailto:support@churchapps.org` |

Ang `WebPushHelper.isEnabled()` ay nagbabalik ng `false` kapag ang alinman sa key ay missing — ang messaging module ay patuloy na gumagana, ang push deliveries ay simpleng no-op.

### Paglikha ng VAPID key pair

```bash
npx web-push generate-vapid-keys
```

Idagdag ang output sa iyong `.env` (local) o AWS SSM Parameter Store (deployed). Ang pag-rotate ng keys ay nag-invalidate ng bawat existing subscription — ang mga clients ay dapat na mag-re-enroll sa susunod na page load.

## Storage model

Ang Web Push subscriptions ay na-store sa existing `devices` table kasama ang FCM device records. Ang mga ito ay na-distinguish ng isang `webpush:` prefix sa `fcmToken` column:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Ito ay nagpapahintulot sa isang single `loadByPersonId` call na ibalik ang bawat device na na-enroll ng isang user, anuman ang platform. Ang `WebPushHelper.isWebPushToken(token)` at `decodeSubscription(token)` ay humawak ng prefix logic.

## Endpoints

Base path: `/messaging/webpush`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | Nagbabalik ng `{ publicKey, enabled }`. Ang mga clients ay nagpapasa ng `publicKey` sa `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Nag-register (o nag-upsert) ng isang subscription para sa authenticated user. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | Nag-delete ng anumang device row na ang `fcmToken` ay naglalaman ng ibinigay na endpoint. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Nag-delete ng isang specific device row sa server-side id nito |

## Client primitive: `WebPushHelper`

Ang `@churchapps/apphelper`'s `WebPushHelper` ay ang single client-side entry point. Ang hosts ay nag-configure nito minsan sa boot at tumatawag ng `subscribe()` pagkatapos ng login.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Sa app's bootstrap (hal., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; tumutugma sa sw.js registration
  appName: "B1AppPwa"        // naka-store sa device row, kapaki-pakinabang para sa pag-filter ng surface
});

// Pagkatapos ng login (at pagkatapos ng bawat userChurch change)
await WebPushHelper.subscribe();
```

Ang behaviors na libre ang nakukuha ng consumers:

- **Capability check** — ang `isSupported()` ay nagbabalik ng `false` sa browsers nang walang `serviceWorker` / `PushManager` / `Notification`.
- **Cooldown** — ang `canPromptNow()` ay nag-enforce ng 7-day cooldown sa pagitan ng prompts sa pamamagitan ng `localStorage` kaya ang users na nag-dismiss ng OS prompt ay hindi hihingin ulit sa bawat session.
- **Opt-out** — ang `setOptedOut(true)` at `unsubscribe()` ay humihigil sa re-prompting at nag-aalis ng server-side device row.
- **Standalone-PWA detection** — ang `isStandalone()` ay nagpapahintulot sa hosts na gate ang iOS push prompts sa likod ng "user ay nag-install ng PWA sa home screen" (iOS lamang ang nagpapahintulot ng push mula sa installed PWAs).
- **Re-enroll sa church switch** — ang `refreshEnrollment()` ay muling nagpo-post ng existing browser subscription laban sa bagong `userChurch` nang walang pag-re-prompt ng user. Tawakin ito mula sa `userChurch` change handler.

### Service worker requirement

Ang browser's `PushManager` ay tanging nag-resolve ng isang subscription kapag ang isang service worker ay naka-register sa configured scope. Ang ChurchApps PWAs ay gumagamit ng [Serwist](https://serwist.dev/) (Next.js apps) o workbox para sa service worker generation. Dahil ang server ay ngayon palaging sinusubukan ang push kasama ng socket delivery (tingnan ang [When push fires](#when-push-fires)), ang service worker ay ang dedup point: ang `push` handler nito ay dapat mag-suppress ng `showNotification` kapag ang isang focused/visible client ay naka-target na sa deep-link target ng notification, ngunit dapat palaging mag-update ng app badge anuman ang kung ipakita man ang banner:

```javascript
// public/sw.js (o kahit ano ang Serwist/workbox ay nag-emit)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // palaging tumatakbo, kahit na ang banner ay ma-suppress

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Parehong pathname; para sa private messages, pati na rin pareho conversationId.
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
    if (exact) return exact.focus(); // na sa target na: focus, huwag mag-navigate

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

Ang `deepLinkFor` / `clientMatchesTarget` ay consumer-specific — tingnan ang `B1App/src/app/sw.ts` para sa reference implementation. Ang B1App ay nag-route ng `privateMessage` sa `/mobile/messages/:personId`, ang B1Admin ay nag-route ng `notification` sa alerts panel, atbp.

## Operational notes

- **`gone: true` results** — ang `WebPushHelper.sendBulk` ay nagbabalik ng `{ token, success, gone, errorMessage }` bawat recipient. Isang `gone: true` result (push service ay sumagot ng `404` o `410`) ay nangangahulugan na ang subscription ay permanently invalid; ang downstream code sa `NotificationHelper` ay nag-delete ng mga device rows upang hindi na sila subukan.
- **TTL** — ang push messages ay ipinapadala na may `TTL: 86400` (24 na oras). Kung ang browser ng user ay hindi kumokonekta sa push service sa loob ng 24 na oras, ang push ay itinatapon.
- **Walang retries** — isang transient failure (timeout, 5xx) ay na-log at hindi retried. Ang push ay best-effort; ang in-page socket at ang email notification tier ay humawak ng durability story.
- **Disabled environments** — ang staging at dev environments ay maaaring iwanan ang VAPID keys na walang laman; ang `WebPushHelper.isEnabled()` ay magbabalik ng `false` at ang mga pushes ay mag-short-circuit. Ito ay ang intended behavior para sa environments nang walang sarili nitong VAPID identity.

## Related Pages

- [Notifications Architecture](./architecture/notifications) -- Ang buong in-app/push/email escalation funnel at ang reminder engine
- [Real-time Architecture](./realtime) -- WebSocket delivery; ang push ay ngayon nag-fire mula sa parehong in-app funnel kasama ng socket delivery sa parehong pass, hindi lamang bilang fallback kapag ang socket delivery ay hindi umabot
- [Messaging Endpoints](./api/endpoints/messaging) -- Notifications, devices, at ang natitirang messaging surface
- [AppHelper](./shared-libraries/app-helper) -- Ang npm package na nag-ship ng `WebPushHelper`
