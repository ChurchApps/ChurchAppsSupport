---
title: "Mga Web Push Notification"
---

# Mga Web Push Notification

<div class="article-intro">

Ang mga web app ng ChurchApps ay naghahatid ng push notification gamit ang W3C Web Push API -- ang parehong mekanismong ginagamit ng Firebase Cloud Messaging sa server side, pero inihahatid sa pamamagitan ng native na `PushManager` ng browser sa halip na FCM. Iisang VAPID key pair sa MessagingApi ang sumasaklaw sa bawat consumer (B1Admin, B1App, at mga susunod pang PWA).

</div>

## Kailan nagpapadala ng push {#when-push-fires}

Ang push ay isang tier sa iisang delivery pass sa loob ng `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): una ang in-app preference gate, pagkatapos ay sabay na sinusubukan ang socket delivery at push sa iisang pass (bawat isa ay may sariling preference gate), at saka ang email. Hindi kailanman umaabot sa push ang tatanggap na nag-mute ng kategorya. Hindi na humihinto ang push kapag matagumpay ang socket delivery -- ang bawat uri ng notification ngayon ay kumikilos na gaya ng dati pa sa private message, kaya ang naka-install na PWA na nasa background ay nagpapakita pa rin ng OS-level na notification kahit may socket delivery nang naihatid; ang mga duplicate na banner ay pinipigilan na lang sa client-side ng service worker (tingnan ang [Kinakailangan ang service worker](#service-worker-requirement)). Ang mga naka-iskedyul na reminder at broadcast na sinimulan ng staff ay direktang nagsisimula sa push tier, at nilalampasan ang socket step. Ang email ay timer-driven pa rin, at nag-e-escalate ng mga unread row sa sarili nitong iskedyul sa halip na bahagi ng pass na ito.

Ang mga pinakakaraniwang daan na umaabot sa push:

1. **Content notification** -- isang reply sa conversation na sinusundan ng tao, isang mention, o ibang event na dumaraan sa `NotificationHelper.createNotifications()`.
2. **Private message** -- ang direct message ay dumaraan sa parehong delivery function at palaging sinusubukan ang push kasabay ng socket delivery.
3. **Naka-iskedyul na reminder** -- mga event, task, at serving reminder na pinalawak at ipinadala ng reminder engine, na direktang nagsisimula ng bagong occurrence sa push tier.
4. **Push na sinimulan ng staff** -- `POST /messaging/notifications/create`, `/ping`, at `/group/send` para sa one-off o group broadcast.

## Daloy ng server

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

### Kinakailangang environment variable

Nakaimbak ang mga VAPID key sa `Environment` at dapat naroon para ma-enable ang push:

| Variable | Paglalarawan |
|----------|----------|
| `webPushPublicKey` | VAPID public key (base64url). Ibinabalik sa mga client sa pamamagitan ng `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | VAPID private key. Ginagamit para pirmahan ang bawat outbound na push |
| `webPushSubject` | `mailto:` URI na iniuulat sa mga push service. Default ay `mailto:support@churchapps.org` |

Nagbabalik ng `false` ang `WebPushHelper.isEnabled()` kapag nawawala ang alinman sa dalawang key -- patuloy na gumagana ang messaging module, pero walang ginagawa ang mga push delivery.

### Pagbuo ng VAPID key pair

```bash
npx web-push generate-vapid-keys
```

Idagdag ang output sa iyong `.env` (lokal) o sa AWS SSM Parameter Store (naka-deploy). Ang pag-rotate ng mga key ay nagpapawalang-bisa sa lahat ng umiiral na subscription -- kailangang mag-enroll muli ang mga client sa susunod na pag-load ng page.

## Modelo ng storage

Ang mga Web Push subscription ay nakaimbak sa umiiral na `devices` table kasama ng mga FCM device record. Nakikilala sila sa pamamagitan ng prefix na `webpush:` sa column na `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dahil dito, isang tawag lang ng `loadByPersonId` ang makakakuha ng lahat ng device na na-enroll ng isang user, anuman ang platform. Hinahawakan ng `WebPushHelper.isWebPushToken(token)` at `decodeSubscription(token)` ang lohika ng prefix.

## Mga endpoint

Base path: `/messaging/webpush`

| Method | Path | Auth | Paglalarawan |
|--------|------|------|----------|
| GET | `/publicKey` | Public | Nagbabalik ng `{ publicKey, enabled }`. Ipinapasa ng mga client ang `publicKey` sa `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Nagrerehistro (o nag-a-upsert) ng subscription para sa naka-authenticate na user. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | Binubura ang anumang device row na ang `fcmToken` ay naglalaman ng ibinigay na endpoint. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Binubura ang isang partikular na device row ayon sa server-side na id nito |

## Client primitive: `WebPushHelper`

Ang `WebPushHelper` ng `@churchapps/apphelper` ang iisang client-side na entry point. Iko-configure ito ng mga host nang isang beses sa boot at tatawagin ang `subscribe()` pagkatapos mag-login.

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

Mga behavior na libre nang nakukuha ng mga consumer:

- **Capability check** -- Nagbabalik ng `false` ang `isSupported()` sa mga browser na walang `serviceWorker` / `PushManager` / `Notification`.
- **Cooldown** -- Ipinapatupad ng `canPromptNow()` ang 7-araw na cooldown sa pagitan ng mga prompt sa pamamagitan ng `localStorage`, para hindi na tanungin muli sa bawat session ang mga user na tumanggi sa OS prompt.
- **Opt-out** -- Hinaharangan ng `setOptedOut(true)` at `unsubscribe()` ang muling pag-prompt at inaalis ang server-side na device row.
- **Standalone-PWA detection** -- Pinapayagan ng `isStandalone()` ang mga host na i-gate ang iOS push prompt sa likod ng "naka-install na ng user ang PWA sa home screen" (sa iOS, mula sa naka-install na PWA lang pinapayagan ang push).
- **Re-enroll kapag nagpalit ng simbahan** -- Muling ipinapadala ng `refreshEnrollment()` ang umiiral na browser subscription laban sa bagong `userChurch` nang hindi muling nagpapa-prompt sa user. Tawagin ito mula sa handler ng pagbabago ng `userChurch`.

### Kinakailangan ang service worker {#service-worker-requirement}

Lulutas lang ang `PushManager` ng browser ng subscription kapag may nakarehistrong service worker sa naka-configure na scope. Gumagamit ang mga PWA ng ChurchApps ng [Serwist](https://serwist.dev/) (mga Next.js app) o workbox para sa paggawa ng service worker. Dahil palaging sinusubukan na ngayon ng server ang push kasabay ng socket delivery (tingnan ang [Kailan nagpapadala ng push](#when-push-fires)), ang service worker ang punto ng dedup: ang `push` handler nito ay dapat pumigil sa `showNotification` kapag may naka-focus/nakikitang client na nasa deep-link target na ng notification, pero dapat palaging i-update ang app badge anuman ang kung naipakita ang banner:

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

Ang `deepLinkFor` at `clientMatchesTarget` ay partikular sa bawat consumer -- tingnan ang `B1App/src/app/sw.ts` para sa reference implementation. Dinadala ng B1App ang `privateMessage` sa `/mobile/messages/:personId`, dinadala ng B1Admin ang `notification` sa alerts panel nito, atbp.

## Operational na tala

- **`gone: true` na resulta** -- Nagbabalik ang `WebPushHelper.sendBulk` ng `{ token, success, gone, errorMessage }` bawat tatanggap. Ang resultang `gone: true` (tumugon ang push service ng `404` o `410`) ay nangangahulugang permanenteng hindi na valid ang subscription; binubura ng downstream code sa `NotificationHelper` ang mga device row na iyon para hindi na sila subukan muli.
- **TTL** -- Ipinapadala ang mga push message na may `TTL: 86400` (24 oras). Kung hindi kumonekta ang browser ng user sa push service sa loob ng 24 oras, ita-tapon ang push.
- **Walang retry** -- Ang pansamantalang failure (timeout, 5xx) ay ila-log at hindi na uulitin. Best-effort ang push; ang in-page socket at ang email notification tier ang humahawak sa pagiging maaasahan.
- **Mga disabled na environment** -- Maaaring iwanang walang laman ng mga dev environment ang VAPID key; magiging `false` ang `WebPushHelper.isEnabled()` at magsa-short-circuit ang mga push. Ito ang sadyang behavior para sa mga environment na walang sariling VAPID identity.

## Kaugnay na Mga Pahina

- [Notifications Architecture](./architecture/notifications) -- Ang buong in-app/push/email escalation funnel at ang reminder engine
- [Real-time Architecture](./realtime) -- WebSocket delivery; ang push ngayon ay nagmumula sa parehong in-app funnel kasabay ng socket delivery sa iisang pass, hindi lang bilang fallback kapag hindi naihatid ang socket
- [Messaging Endpoints](./api/endpoints/messaging) -- Mga notification, device, at ang natitirang bahagi ng messaging surface
- [AppHelper](./shared-libraries/app-helper) -- Ang npm package na naglalaman ng `WebPushHelper`
