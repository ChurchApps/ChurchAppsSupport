---
title: "Mga Web Push Notification"
description: "I-set up ang mga VAPID key, ang WebPushHelper client, at ang paghawak ng service worker para maihatid ng B1.church at B1 Admin ang browser push notification sa mga miyembro."
---

# Mga Web Push Notification {#web-push-notifications}

<div class="article-intro">

Naghahatid ang mga ChurchApps web app ng push notification sa pamamagitan ng W3C Web Push API -- ang parehong mekanismong ginagamit ng Firebase Cloud Messaging sa server side, ngunit inihahatid sa pamamagitan ng native na `PushManager` ng browser sa halip na FCM. Isang VAPID key pair sa MessagingApi ang sumasakop sa bawat consumer (B1Admin, B1App, at mga PWA sa hinaharap).

</div>

## Kailan nagfa-fire ang push {#when-push-fires}

Isang antas ang push sa iisang delivery pass sa loob ng `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): unang sinusuri ang in-app preference gate, pagkatapos ay sinusubukan ang socket delivery at push sa parehong pass (bawat isa ay may sariling preference gate), at saka ang email. Hindi kailanman umaabot sa push ang tatanggap na nag-mute ng kategorya. Hindi na humihinto ang push kapag nagtagumpay ang socket delivery -- ang bawat uri ng notification ay kumikilos na gaya ng dati nang ginagawa ng mga pribadong mensahe, kaya ang naka-install na PWA na nasa background ay nagpapakita pa rin ng OS-level na notification kahit nakarating na ang socket delivery; ang mga duplicate na banner ay pinipigilan sa client side ng service worker (tingnan ang [Kinakailangan ang service worker](#service-worker-requirement)). Ang mga naka-iskedyul na paalala at mga broadcast na pinasimulan ng staff ay direktang nagsisimula sa antas ng push, nilalaktawan ang hakbang ng socket. Nananatiling timer-driven ang email, at nire-escalate nito ang mga hindi pa nababasang row sa sarili nitong iskedyul sa halip na bilang bahagi ng pass na ito.

Ang mga pinakakaraniwang landas na umaabot sa push:

1. **Content notification** -- sagot sa usapang sinusundan ng tao, mention, o ibang event na idinaraan sa `NotificationHelper.createNotifications()`.
2. **Mga pribadong mensahe** -- ang direct message ay dumaraan sa parehong delivery function at palaging sinusubukan ang push kasabay ng socket delivery.
3. **Mga naka-iskedyul na paalala** -- mga paalala sa event, task, at serving na pinalalawak at ipinapadala ng reminder engine, na direktang nagsisimula ng mga bagong occurrence sa antas ng push.
4. **Mga push na pinasimulan ng staff** -- `POST /messaging/notifications/create`, `/ping`, at `/group/send` para sa isahan o group na broadcast.
5. **Mga naka-iskedyul na push ng staff** -- ang `POST /messaging/scheduledNotifications` ay nagsa-save ng push para sa lahat ng may app (`audience: "church"`) o isang grupo, at ipinapadala ito ng 1-minutong timer kapag dumating na ang oras (tingnan ang [Arkitektura ng notification](./architecture/notifications.md)). Ang push para sa buong simbahan na walang link ay nagbubukas ng `/mobile/notifications`; ang push ng grupo na walang link ay nagbubukas sa grupong iyon.

## Server flow {#server-flow}

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

### Mga kinakailangang environment variable {#required-environment-variables}

Nakaimbak sa `Environment` ang mga VAPID key at dapat naroroon para ma-enable ang push:

| Environment variable | `Environment` setting | Paglalarawan |
|----------|----------|----------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID public key (base64url). Ibinabalik sa mga client sa pamamagitan ng `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID private key. Ginagamit para pirmahan ang bawat papalabas na push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:` URI na iniuulat sa mga push service. Default ay `mailto:support@churchapps.org` |

Nagbabalik ng `false` ang `WebPushHelper.isEnabled()` kapag nawawala ang alinman sa dalawang key -- patuloy na gumagana ang messaging module, at ang mga push delivery ay walang ginagawa lang. Ang mobile site ng B1App ay nagsasabi sa mga miyembro na hindi naka-on ang push sa halip na mag-alok ng setup.

### Pagbuo ng VAPID key pair {#generating-a-vapid-key-pair}

```bash
npx web-push generate-vapid-keys
```

Idagdag ang output sa iyong `.env` (lokal) o sa AWS SSM Parameter Store (naka-deploy). Ang pag-rotate ng mga key ay nagpapawalang-bisa sa bawat umiiral na subscription -- kailangang mag-enroll muli ang mga client sa susunod na pag-load ng pahina.

## Modelo ng storage {#storage-model}

Itinatabi ang mga Web Push subscription sa umiiral na `devices` table kasama ng mga FCM device record. Nakikilala ang mga ito sa pamamagitan ng prefix na `webpush:` sa `fcmToken` column:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dahil dito, iisang `loadByPersonId` call lamang ang kailangan para makuha ang bawat device na na-enroll ng user, anuman ang platform. Ang `WebPushHelper.isWebPushToken(token)` at `decodeSubscription(token)` ang humahawak sa lohika ng prefix.

## Mga endpoint {#endpoints}

Base path: `/messaging/webpush`

| Method | Path | Auth | Paglalarawan |
|--------|------|------|----------|
| GET | `/publicKey` | Public | Nagbabalik ng `{ publicKey, enabled }`. Ipinapasa ng mga client ang `publicKey` sa `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Nagrerehistro (o nag-a-upsert) ng subscription para sa naka-authenticate na user. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | Binubura ang anumang device row na ang `fcmToken` ay naglalaman ng ibinigay na endpoint. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Binubura ang isang partikular na device row ayon sa server-side id nito |

## Client primitive: `WebPushHelper` {#client-primitive-webpushhelper}

Ang `WebPushHelper` ng `@churchapps/apphelper` ang iisang client-side entry point. Iko-configure ito ng mga host nang minsan sa boot at tatawagin ang `subscribe()` pagkatapos mag-login.

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

Mga behavior na libreng nakukuha ng mga consumer:

- **Capability check** -- nagbabalik ng `false` ang `isSupported()` sa mga browser na walang `serviceWorker` / `PushManager` / `Notification`.
- **Cooldown** -- ipinatutupad ng `canPromptNow()` ang 7-araw na cooldown sa pagitan ng mga prompt sa pamamagitan ng `localStorage`, para hindi na muling tanungin ang mga user na tumanggi sa OS prompt sa bawat session.
- **Opt-out** -- hinaharangan ng `setOptedOut(true)` at `unsubscribe()` ang muling pag-prompt at inaalis ang server-side device row.
- **Standalone-PWA detection** -- hinahayaan ng `isStandalone()` ang mga host na gawing kondisyon ng iOS push prompt ang "naka-install na sa home screen ang PWA ng user" (sa iOS, pinapayagan lamang ang push mula sa naka-install na PWA).
- **Muling pag-enroll sa pagpapalit ng simbahan** -- muling ipinapadala ng `refreshEnrollment()` ang umiiral na browser subscription laban sa bagong `userChurch` nang hindi muling tinatanong ang user. Tawagin ito mula sa handler ng pagbabago ng `userChurch`.

### Kinakailangan ang service worker {#service-worker-requirement}

Nire-resolve lamang ng `PushManager` ng browser ang isang subscription kapag may nakarehistrong service worker sa naka-configure na scope. Gumagamit ang mga ChurchApps PWA ng [Serwist](https://serwist.dev/) (mga Next.js app) o workbox para sa paggawa ng service worker. Dahil palaging sinusubukan ng server na ipadala ang push kasabay ng socket delivery (tingnan ang [Kailan nagfa-fire ang push](#when-push-fires)), ang service worker ang punto ng dedup: ang `push` handler nito ay dapat pumigil sa `showNotification` kapag may naka-focus/nakikitang client na nasa deep-link target na ng notification, pero dapat palaging i-update ang app badge anuman kung naipakita ang banner:

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

Ang `deepLinkFor` / `clientMatchesTarget` ay partikular sa bawat consumer -- tingnan ang `B1App/src/app/sw.ts` para sa reference implementation. Dinidirekta ng B1App ang `privateMessage` sa `/mobile/messages/:personId`, dinidirekta ng B1Admin ang `notification` sa alerts panel nito, atbp.

## Mga tala sa operasyon {#operational-notes}

- **Mga resultang `gone: true`** -- nagbabalik ang `WebPushHelper.sendBulk` ng `{ token, success, gone, errorMessage }` bawat tatanggap. Ang resultang `gone: true` (tumugon ang push service ng `404` o `410`) ay nangangahulugang permanenteng hindi na valid ang subscription; binubura ng downstream code sa `NotificationHelper` ang mga device row na iyon para hindi na subukan muli.
- **TTL** -- ipinapadala ang mga push message na may `TTL: 86400` (24 na oras). Kung hindi kumonekta ang browser ng user sa push service sa loob ng 24 na oras, na-di-drop ang push.
- **Walang retry** -- ang pansamantalang pagkabigo (timeout, 5xx) ay nilo-log at hindi sinusubukan muli. Best-effort ang push; ang socket sa pahina at ang email notification tier ang humahawak sa katatagan.
- **Mga disabled na environment** -- maaaring iwanang walang laman ng mga dev environment ang mga VAPID key; magbabalik ng `false` ang `WebPushHelper.isEnabled()` at magsisara nang maaga ang mga push. Ito ang inaasahang gawi para sa mga environment na walang sariling VAPID identity.

## Mga Kaugnay na Pahina {#related-pages}

- [Arkitektura ng Notification](./architecture/notifications.md) -- Ang buong in-app/push/email escalation funnel at ang reminder engine
- [Real-time Architecture](./realtime.md) -- WebSocket delivery; ang push ay fini-fire na ngayon mula sa parehong in-app funnel kasabay ng socket delivery sa parehong pass, hindi lamang bilang fallback kapag hindi nagtagumpay ang socket delivery
- [Mga Endpoint ng Messaging](./api/endpoints/messaging.md) -- Mga notification, device, at ang natitirang bahagi ng messaging surface
- [AppHelper](./shared-libraries/app-helper.md) -- Ang npm package na naglalaman ng `WebPushHelper`
