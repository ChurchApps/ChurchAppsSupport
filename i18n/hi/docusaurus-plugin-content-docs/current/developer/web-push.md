---
title: "Web Push सूचनाएं"
---

# Web Push सूचनाएं

<div class="article-intro">

ChurchApps web apps W3C Web Push API के माध्यम से push notifications deliver करते हैं -- Firebase Cloud Messaging द्वारा server side पर उपयोग किया जाने वाला same mechanism, लेकिन FCM के बजाय browser के native `PushManager` के माध्यम से delivered किया जाता है। MessagingApi पर एक एकल VAPID key pair हर consumer (B1Admin, B1App, future PWAs) को कवर करता है।

</div>

## जब push fires

Push `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`) के अंदर एक single delivery pass में एक tier है: एक in-app preference gate, फिर socket delivery और push एक ही pass में attempted (प्रत्येक अपने स्वयं के preference gate के पीछे), फिर email। एक recipient जिसने category को mute किया है कभी push तक नहीं पहुंचता। Socket delivery succeeding push को अब नहीं रोकता -- हर notification type अब ऐसी तरह behave करता है जैसे private messages हमेशा करते थे, तो एक installed PWA sitting in background अभी भी एक OS-level notification surface करता है यहां तक कि जब socket delivery पहले से ही landed हो; duplicate banners को client-side से service worker द्वारा suppress किया जाता है ([Service worker requirement](#service-worker-requirement) देखें)। Scheduled reminders और staff-triggered broadcasts सीधे push tier पर शुरू होते हैं, socket step को पूरी तरह skip करते हुए। Email timer-driven रहता है, unread rows को escalate करते हुए अपने स्वयं के schedule पर rather than इस pass के हिस्से के रूप में।

Push तक पहुंचने वाले सबसे common paths:

1. **Content notifications** -- एक बातचीत का एक reply जिसे व्यक्ति follow करता है, एक mention, या कोई अन्य event `NotificationHelper.createNotifications()` के माध्यम से routed।
2. **Private messages** -- एक direct message same delivery function के माध्यम से जाता है और हमेशा socket delivery के साथ push attempt करता है।
3. **Scheduled reminders** -- event, task, और serving reminders expanded और dispatch किए गए reminder engine द्वारा, जो नई occurrences को सीधे push tier पर शुरू करता है।
4. **Staff-triggered pushes** -- `POST /messaging/notifications/create`, `/ping`, और `/group/send` one-off या group broadcasts के लिए।

## Server flow

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app preference gate                  ← muted recipients यहां रुक जाते हैं, कोई push नहीं
       ├─ same pass, दोनों attempted (neither gates the other):
       │    ├─ socket delivery via DeliveryHelper  ← reminders/broadcasts के लिए skipped (वे push पर शुरू होते हैं)
       │    └─ push preference gate
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signed POST → browser push service
       └─ email preference gate → timer-driven, unread rows को अलग से escalate करता है
```

### आवश्यक environment variables

VAPID keys `Environment` में stored हैं और push को enable करने के लिए present होने चाहिए:

| Variable | Description |
|----------|-------------|
| `webPushPublicKey` | VAPID public key (base64url)। Clients को `GET /messaging/webpush/publicKey` के माध्यम से returned |
| `webPushPrivateKey` | VAPID private key। हर outbound push को sign करने के लिए उपयोग किया जाता है |
| `webPushSubject` | `mailto:` URI push services को reported। Defaults to `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` `false` return करता है जब या तो key missing है -- messaging module operate करना जारी रखता है, push deliveries सिर्फ no-op हैं।

### एक VAPID key pair generate करना

```bash
npx web-push generate-vapid-keys
```

Output को अपने `.env` (local) या AWS SSM Parameter Store (deployed) में जोड़ें। Keys rotate करना हर existing subscription को invalidate करता है -- clients को अगले page load पर re-enroll करना चाहिए।

## Storage model

Web Push subscriptions existing `devices` table में FCM device records के साथ रहती हैं। उन्हें `fcmToken` column पर एक `webpush:` prefix से distinguish किया जाता है:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

यह एक एकल `loadByPersonId` call को हर device return करने देता है जिसे user ने enroll किया है, platform की परवाह किए बिना। `WebPushHelper.isWebPushToken(token)` और `decodeSubscription(token)` prefix logic को handle करते हैं।

## Endpoints

Base path: `/messaging/webpush`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | `{ publicKey, enabled }` return करता है। Clients `publicKey` को `pushManager.subscribe({ applicationServerKey })` पर pass करते हैं |
| POST | `/subscribe` | JWT | Authenticated user के लिए एक subscription को register (या upsert) करता है। Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | कोई भी device row delete करता है जिसका `fcmToken` दिए गए endpoint को contain करता है। Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | एक specific device row को अपने server-side id से delete करता है |

## Client primitive: `WebPushHelper`

`@churchapps/apphelper` का `WebPushHelper` single client-side entry point है। Hosts इसे boot पर एक बार configure करते हैं और login के बाद `subscribe()` को call करते हैं।

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// आपके app के bootstrap में (उदाहरण के लिए, _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; sw.js registration से match करता है
  appName: "B1AppPwa"        // device row पर stored, surface द्वारा filter करने के लिए उपयोगी
});

// Login के बाद (और हर userChurch change के बाद)
await WebPushHelper.subscribe();
```

Behaviors जो consumers को मुफ्त में मिलते हैं:

- **Capability check** -- `isSupported()` browsers पर `false` return करता है जिनमें `serviceWorker` / `PushManager` / `Notification` नहीं है।
- **Cooldown** -- `canPromptNow()` `localStorage` के माध्यम से prompts के बीच एक 7-day cooldown enforce करता है ताकि users जिन्होंने OS prompt को dismiss किया है उन्हें हर session पर फिर से न पूछा जाए।
- **Opt-out** -- `setOptedOut(true)` और `unsubscribe()` re-prompting को block करते हैं और server-side device row को remove करते हैं।
- **Standalone-PWA detection** -- `isStandalone()` hosts को iOS push prompts को "user ने PWA को अपने home screen पर install किया है" के पीछे gate करने देता है (iOS केवल installed PWAs से push allow करता है)।
- **Church switch पर re-enroll** -- `refreshEnrollment()` existing browser subscription को नए `userChurch` के विरुद्ध reposts करता है बिना user को re-prompt किए। `userChurch` change handler से इसे call करें।

### Service worker requirement

Browser का `PushManager` केवल एक subscription को resolve करता है जब एक service worker configured scope पर registered है। ChurchApps PWAs [Serwist](https://serwist.dev/) (Next.js apps) या service worker generation के लिए workbox का उपयोग करते हैं। क्योंकि server अब हमेशा socket delivery के साथ push attempt करता है ([When push fires](#when-push-fires) देखें), service worker dedup point है: इसके `push` handler को `showNotification` को suppress करना चाहिए जब एक focused/visible client पहले से ही notification के deep-link target पर है, लेकिन हमेशा app badge को update करना चाहिए regardless of whether banner को show किया गया था:

```javascript
// public/sw.js (या जो भी Serwist/workbox emits)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // हमेशा runs, यहां तक कि अगर banner suppress है

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Same pathname; private messages के लिए, भी same conversationId।
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
    if (exact) return exact.focus(); // पहले से ही target पर: focus, navigate न करें

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` consumer-specific हैं -- reference implementation के लिए `B1App/src/app/sw.ts` देखें। B1App `privateMessage` को `/mobile/messages/:personId` पर route करता है, B1Admin `notification` को अपने alerts panel पर route करता है, आदि।

## Operational notes

- **`gone: true` results** -- `WebPushHelper.sendBulk` `{ token, success, gone, errorMessage }` per recipient return करता है। एक `gone: true` result (push service responded `404` या `410`) का मतलब subscription permanently invalid है; `NotificationHelper` में downstream code उन device rows को delete करता है ताकि उन्हें फिर से try न किया जाए।
- **TTL** -- push messages `TTL: 86400` (24 घंटे) के साथ sent हैं। यदि user का browser 24 घंटों में push service से connect नहीं होता है, push को drop किया जाता है।
- **No retries** -- एक transient failure (timeout, 5xx) को log किया जाता है और retry नहीं किया जाता है। Push best-effort है; in-page socket और email notification tier durability story को handle करते हैं।
- **Disabled environments** -- staging और dev environments VAPID keys को empty छोड़ सकते हैं; `WebPushHelper.isEnabled()` `false` return करेगा और pushes short-circuit करेंगे। यह intended behavior है environments के लिए बिना अपने स्वयं के VAPID identity के।

## संबंधित पृष्ठ

- [सूचना आर्किटेक्चर](./architecture/notifications) -- पूर्ण in-app/push/email escalation funnel और reminder engine
- [रीयल-टाइम आर्किटेक्चर](./realtime) -- WebSocket delivery; push अब same in-app funnel से socket delivery के साथ same pass में fires, केवल fallback के रूप में नहीं जब socket delivery land न करे
- [Messaging Endpoints](./api/endpoints/messaging) -- Notifications, devices, और messaging surface का rest
- [AppHelper](./shared-libraries/app-helper) -- npm package जो `WebPushHelper` को ships करता है
