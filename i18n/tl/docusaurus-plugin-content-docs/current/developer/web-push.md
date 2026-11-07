---
title: "Web Push Notifications"
description: "I-set up ang VAPID keys, WebPushHelper client, at service worker para makapagpadala ng browser push notification sa mga miyembro ang B1.church at B1 Admin."
---

# Web Push Notifications

<div class="article-intro">

Naghahatid ang mga web app ng ChurchApps ng push notification sa pamamagitan ng W3C Web Push API -- ang parehong mekanismong ginagamit ng Firebase Cloud Messaging sa panig ng server, pero inihahatid sa pamamagitan ng katutubong `PushManager` ng browser sa halip na FCM. Iisang pares ng VAPID key sa MessagingApi ang sumasaklaw sa bawat consumer (B1Admin, B1App, at mga susunod pang PWA).

</div>

## Kailan nagpapaputok ang push {#when-push-fires}

Isang tier ang push sa iisang delivery pass sa loob ng `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): isang in-app preference gate, pagkatapos ang socket delivery at push na sinusubukan sa parehong pass (bawat isa ay nasa sariling preference gate), pagkatapos ang email. Ang tatanggap na nag-mute ng kategorya ay hindi kailanman umaabot sa push. Hindi na itinitigil ng matagumpay na socket delivery ang push -- ang bawat uri ng notification ngayon ay kumikilos gaya ng palaging ginagawa ng mga private message, kaya ang naka-install na PWA na nasa background ay nagpapakita pa rin ng notification sa antas ng OS kahit na may socket delivery nang dumating; ang mga duplicate na banner ay pinipigilan sa panig ng client ng service worker (tingnan ang [Service worker requirement](#service-worker-requirement)). Ang mga naka-iskedyul na paalala at broadcast na pinasimulan ng staff ay direktang nagsisimula sa tier ng push, nilalaktawan ang socket step nang buo. Nananatiling timer-driven ang email, na nag-e-escalate ng mga hindi pa nababasang row sa sarili nitong iskedyul at hindi bilang bahagi ng pass na ito.

Ang mga pinakakaraniwang daan na umaabot sa push:

1. **Mga content notification** -- isang reply sa usapang sinusundan ng tao, isang mention, o ibang event na idinaan sa `NotificationHelper.createNotifications()`.
2. **Mga private message** -- ang direktang mensahe ay dumadaan sa parehong delivery function at palaging sinusubukan ang push kasabay ng socket delivery.
3. **Mga naka-iskedyul na paalala** -- mga paalala sa event, task, at serving na pinalalawak at ipinapadala ng reminder engine, na nagsisimula ng bagong occurrence direkta sa tier ng push.
4. **Mga push na pinasimulan ng staff** -- `POST /messaging/notifications/create`, `/ping`, at `/group/send` para sa one-off o group na broadcast.

## Daloy sa server

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app preference gate                  ← naka-mute na tatanggap ay huminto dito, walang push
       ├─ same pass, both attempted (neither gates the other):
       │    ├─ socket delivery via DeliveryHelper  ← nilalaktawan para sa mga paalala/broadcast (nagsisimula sila sa push)
       │    └─ push preference gate
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signed POST → browser push service
       └─ email preference gate → timer-driven, escalates unread rows separately
```

### Kinakailangang environment variable

Naka-store ang mga VAPID key sa `Environment` at dapat naroon para ma-enable ang push:

| Environment variable | Setting ng `Environment` | Paglalarawan |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID public key (base64url). Ibinabalik sa mga client sa pamamagitan ng `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID private key. Ginagamit para pirmahan ang bawat outbound na push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI na `mailto:` na iniuulat sa mga push service. Ang default ay `mailto:support@churchapps.org` |

Nagbabalik ng `false` ang `WebPushHelper.isEnabled()` kapag kulang ang alinman sa dalawang key -- patuloy na gumagana ang messaging module; ang mga push delivery ay basta walang ginagawa. Sinasabi ng mobile site ng B1App sa mga miyembro na hindi naka-on ang push sa halip na mag-alok ng setup.

### Pagbuo ng VAPID key pair

```bash
npx web-push generate-vapid-keys
```

Idagdag ang output sa iyong `.env` (lokal) o sa AWS SSM Parameter Store (naka-deploy). Ang pagpapalit ng key ay nagpapawalang-bisa sa bawat umiiral na subscription -- kailangang mag-enroll muli ang mga client sa susunod na pag-load ng pahina.

## Modelo ng imbakan

Naka-store ang mga subscription ng Web Push sa umiiral na table na `devices`, kasama ng mga record ng device ng FCM. Nakikilala ang mga ito sa pamamagitan ng prefix na `webpush:` sa column na `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Pinapayagan nito ang iisang tawag ng `loadByPersonId` na ibalik ang bawat device na na-enroll ng user, anuman ang platform. Hinahawakan ng `WebPushHelper.isWebPushToken(token)` at `decodeSubscription(token)` ang lohika ng prefix.

## Mga endpoint

Base path: `/messaging/webpush`

| Method | Path | Auth | Paglalarawan |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | Nagbabalik ng `{ publicKey, enabled }`. Ipinapasa ng mga client ang `publicKey` sa `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Nagrerehistro (o nag-u-upsert) ng subscription para sa naka-authenticate na user. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | Binubura ang alinmang device row na naglalaman ng ibinigay na endpoint sa `fcmToken`. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Binubura ang partikular na device row ayon sa server-side id nito |

## Client primitive: `WebPushHelper`

Ang `WebPushHelper` ng `@churchapps/apphelper` ang iisang entry point sa panig ng client. Isang beses itong ino-configure ng mga host sa boot at tinatawag ang `subscribe()` pagkatapos mag-log in.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Sa bootstrap ng iyong app (hal., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; tumutugma sa registration ng sw.js
  appName: "B1AppPwa"        // nakaimbak sa device row, kapaki-pakinabang para sa pag-filter ayon sa surface
});

// Pagkatapos mag-log in (at pagkatapos ng bawat pagbabago ng userChurch)
await WebPushHelper.subscribe();
```

Mga kilos na libreng nakukuha ng mga consumer:

- **Pagsusuri ng kakayahan** -- nagbabalik ng `false` ang `isSupported()` sa mga browser na walang `serviceWorker` / `PushManager` / `Notification`.
- **Cooldown** -- ipinapatupad ng `canPromptNow()` ang 7-araw na cooldown sa pagitan ng mga prompt sa pamamagitan ng `localStorage`, para hindi na muling tanungin sa bawat session ang mga user na nag-dismiss ng OS prompt.
- **Opt-out** -- hinaharangan ng `setOptedOut(true)` at `unsubscribe()` ang muling pag-prompt at tinatanggal ang server-side na device row.
- **Pagtukoy ng standalone PWA** -- hinahayaan ng `isStandalone()` ang mga host na gawing kondisyon ang iOS push prompt sa "na-install na ng user ang PWA sa home screen" (pinapayagan lang ng iOS ang push mula sa mga na-install na PWA).
- **Muling pag-enroll sa pagpapalit ng simbahan** -- muling ipinopost ng `refreshEnrollment()` ang umiiral na browser subscription laban sa bagong `userChurch` nang hindi muling tinatanong ang user. Tawagan ito mula sa handler ng pagbabago ng `userChurch`.

### Kinakailangan ng service worker {#service-worker-requirement}

Lulutas lang ang subscription ng `PushManager` ng browser kapag may nakarehistrong service worker sa naka-configure na scope. Gumagamit ang mga PWA ng ChurchApps ng [Serwist](https://serwist.dev/) (mga Next.js app) o workbox para sa paggawa ng service worker. Dahil palaging sinusubukan na ngayon ng server ang push kasabay ng socket delivery (tingnan ang [When push fires](#when-push-fires)), ang service worker ang punto ng dedup: dapat pigilan ng handler nitong `push` ang `showNotification` kapag may naka-focus/nakikitang client na nasa deep-link target na ng notification, pero dapat laging i-update ang app badge anuman kung ipinakita ang banner:

```javascript
// public/sw.js (o anumang ina-emit ng Serwist/workbox)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // laging tumatakbo, kahit pigilan ang banner

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Parehong pathname; para sa mga private message, parehong conversationId rin.
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
    if (exact) return exact.focus(); // nasa target na: i-focus, huwag mag-navigate

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

Partikular sa consumer ang `deepLinkFor` / `clientMatchesTarget` -- tingnan ang `B1App/src/app/sw.ts` para sa reference implementation. Dinadala ng B1App ang `privateMessage` sa `/mobile/messages/:personId`, dinadala ng B1Admin ang `notification` sa alerts panel nito, atbp.

## Mga tala sa operasyon

- **Mga resultang `gone: true`** -- nagbabalik ang `WebPushHelper.sendBulk` ng `{ token, success, gone, errorMessage }` kada tatanggap. Ang resultang `gone: true` (tumugon ang push service ng `404` o `410`) ay nangangahulugang permanenteng wala nang bisa ang subscription; binubura ng downstream na code sa `NotificationHelper` ang mga device row na iyon para hindi na subukan muli.
- **TTL** -- ipinapadala ang mga push message na may `TTL: 86400` (24 oras). Kung hindi kumonekta ang browser ng user sa push service sa loob ng 24 oras, malalaglag ang push.
- **Walang retry** -- ang pansamantalang pagkabigo (timeout, 5xx) ay ini-log at hindi na sinusubukan muli. Best-effort ang push; ang socket sa pahina at ang email notification tier ang humahawak sa durability.
- **Mga disabled na environment** -- maaaring iwanang walang laman ang VAPID key ng mga dev environment; magbabalik ng `false` ang `WebPushHelper.isEnabled()` at magsi-short-circuit ang mga push. Ito ang inaasahang kilos para sa mga environment na walang sarili nilang VAPID identity.

## Mga Kaugnay na Pahina

- [Notifications Architecture](./architecture/notifications.md) -- Ang buong funnel ng escalation sa in-app/push/email at ang reminder engine
- [Real-time Architecture](./realtime.md) -- WebSocket delivery; ang push ay nagpapaputok na ngayon mula sa parehong in-app funnel kasabay ng socket delivery sa parehong pass, hindi lang bilang fallback kapag hindi nakarating ang socket delivery
- [Messaging Endpoints](./api/endpoints/messaging.md) -- Mga notification, device, at ang natitirang surface ng messaging
- [AppHelper](./shared-libraries/app-helper.md) -- Ang npm package na naglalaman ng `WebPushHelper`
