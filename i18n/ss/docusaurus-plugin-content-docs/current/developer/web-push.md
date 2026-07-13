---
title: "Tatiso Te-Push Te-Web"
---

# Tatiso Te-Push Te-Web

<div class="article-intro">

Ti-app te-web te-ChurchApps tiletsa tatiso te-push ngekusebentisa i-W3C Web Push API — lona lona ndlela lesetjentiswa yi-Firebase Cloud Messaging ehlangotsini lwe-server, kodvwa kuletfwa ngekusebentisa i-`PushManager` yendzabuko yebrawuza kunaloko kube yi-FCM. Libhandla linye le-VAPID key ku-MessagingApi lifaka bonkhe labasebentisako (B1Admin, B1App, ne-PWA letitako).

</div>

## Nini Lapho I-Push Idubula Khona

I-Push sigaba sinye kuludzingo lunye lwekuletsa ngekhatsi kwe-`NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): sango sekukhetsa ngekhatsi kwe-app, bese kuletsiwa nge-socket kanye ne-push kuzanywa kuludzingo lolufanako (ngamunye ngemuva kwesango sakhe sekukhetsa), bese ku-imeyili. Umemukeli losacishe sigaba akaze afinyelele ku-push. Kuphumelela kwekuletsiwa nge-socket akusayimisi i-push — luhlobo ngalunye lwesatiso nyalo lutiphatsa njengobe imilayeto yangasese beyihlala ihamba ngayo, ngako i-PWA lefakiwe lehleti emuva isavela satiso ku-OS ngisho nome kuletsiwa nge-socket sekufike; ema-banner laphindzaphindzako acindzetelwa hlangotsini lwe-client yi-service worker kunaloko (bona [Sidzingo Se-Service Worker](#service-worker-requirement)). Tikhumbuto letihleliwe kanye nekusakata lokucaliswa ngumsebenti kucala ngalokucondzile esigabeni se-push, kweca inyatselo ye-socket ngalokuphelele. I-imeyili ihlala icaliswa yisikhatsi, ikhulisa emalayini langakafundvwa ngeschedule yayo kunekuba yincenye yalolu ludzingo.

Tindlela letijwayelekile letifinyelela ku-push:

1. **Tatiso Tekucuketfwe** — imphendvulo yengcoco lomuntfu ayilandzelako, kubitwa (mention), nobe lesinye sehlakalo lesicondziswa ngekhatsi kwe-`NotificationHelper.createNotifications()`.
2. **Imilayeto Yangasese** — umlayeto locondzile udlula ngekhatsi kwemsebenti wekuletsa lofanako futsi uhlala uzama i-push kanye nekuletsiwa nge-socket.
3. **Tikhumbuto Letihleliwe** — tikhumbuto temicimbi, imisebenti, kanye nekukhonta letandziswe futsi tetfunyelwe yi-injini yetikhumbuto, lecala tehlakalo letisha ngalokucondzile esigabeni se-push.
4. **Ema-Push Lacaliswa Ngumsebenti** — `POST /messaging/notifications/create`, `/ping`, kanye ne-`/group/send` ekusakateni kwesikhatsi sinye nobe kweliciembu.

## Kuhamba Kwe-Server

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

### Tintfo Letidzingekako Letishintjashintjako Tesimo

Tikhiya te-VAPID tigcinwe ku-`Environment` futsi kufanele tibekhona kute i-push ivunyelwe:

| Intfo Leshintjashintjako | Sichasiso |
|----------|-------------|
| `webPushPublicKey` | Sikhiya se-VAPID lesivulekile (base64url). Sibuyiselwa kuma-client nge-`GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | Sikhiya se-VAPID lesiyimfihlo. Sisetjentiswa kusayina i-push yonkhe lephumako |
| `webPushSubject` | I-URI ye-`mailto:` lebikwa etinsiteni te-push. Ijwayelekile i-`mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` ibuyisela `false` nangabe lesinye setikhiya asikho — i-module yemilayeto iyachubeka kusebenta, kuletsiwa kwe-push kuphela kungenti lutfo.

### Kwakha Libhandla Lesikhiya Se-VAPID

```bash
npx web-push generate-vapid-keys
```

Faka umphumela ku-`.env` yakho (yasekhaya) nobe ku-AWS SSM Parameter Store (lefakiwe). Kujikijela tikhiya kwenta kutsi konkhe kubhaliswa lokukhona kungabi nemsebenti — ema-client kufanele aphindze abhalise nangabe likhasi lifakwa futsi.

## Imodeli Yekugcina

Kubhaliswa kwe-Web Push kugcinwe kuthebula lelikhona le-`devices` kanye nemarekhodi emadivayisi e-FCM. Kuhlukaniswa nge-`webpush:` prefix kukholomu ye-`fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Loku kuvumela kubitwa kunye kwe-`loadByPersonId` kubuyisela lidivayisi ngalinye umsebentisi lakabhalisela kulo, kungakhatsaliseki i-platform. `WebPushHelper.isWebPushToken(token)` kanye ne-`decodeSubscription(token)` baphatsa logic ye-prefix.

## Ema-Endpoint

Indlela lesisekelo: `/messaging/webpush`

| Indlela (Method) | Indlela (Path) | Kucinisekiswa | Sichasiso |
|--------|------|------|-------------|
| GET | `/publicKey` | Kuvulekile | Ibuyisela `{ publicKey, enabled }`. Ema-client adlulisa `publicKey` ku-`pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Ibhalisa (nobe i-upsert) kubhaliswa kwemsebentisi locinisekisiwe. Umtimba: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Kuvulekile | Icitsa lini lonkhe lilayini ledivayisi lelifcmToken yalo iciniseke ne-endpoint lenikeziwe. Umtimba: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Icitsa lilayini ledivayisi lelikhetsekile nge-id yalo yeceleni lwe-server |

## Sisekelo Se-Client: `WebPushHelper`

I-`WebPushHelper` ye-`@churchapps/apphelper` ngiyo indlela yekungena inye yaceleni lwe-client. Ema-host ayihlela kanye ekucaleni bese abita `subscribe()` ngemuva kwekungena.

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

Kutiphatsa lokutfolwa ngalabasebentisako simahla:

- **Kuhlolwa Kwemandla** — `isSupported()` ibuyisela `false` kubrawuza letingenayo i-`serviceWorker` / `PushManager` / `Notification`.
- **Sikhatsi Sekuphola** — `canPromptNow()` iphocelela sikhatsi sekuphola semalanga lasikhombisa emkhatsini wetiphakamiso ngekusebentisa i-`localStorage` kuze basebentisi labacedza siphakamiso se-OS bangabuyi babutiswe kuso sonkhe sikhatsi bengena.
- **Kutikhipha** — `setOptedOut(true)` kanye ne-`unsubscribe()` kuvimbela kuphindze kuphakanyiswe futsi kususa lilayini ledivayisi laceleni lwe-server.
- **Kutfolwa Kwe-Standalone-PWA** — `isStandalone()` ivumela ema-host kuvala tiphakamiso te-push te-iOS ngemuva kwe-"umsebentisi ufakele i-PWA kusikrini sakhe sasekhaya" (i-iOS ivumela kuphela i-push letivela kuma-PWA lafakiwe).
- **Kuphindze Kubhalise Nangabe Kushintjwa Libandla** — `refreshEnrollment()` iphindze itfumele kubhaliswa lokukhona kwebrawuza kubhekiswa ku-`userChurch` lomusha ngaphandle kwekuphindze kuphakamise umsebentisi. Yibite kusuka ku-handler yeshintjo ye-`userChurch`.

### Sidzingo Se-Service Worker

I-`PushManager` yebrawuza icala kuxatjiswa kubhaliswa kuphela nangabe i-service worker ibhalisiwe ku-scope lehleliwe. Ema-PWA e-ChurchApps asebentisa i-[Serwist](https://serwist.dev/) (ti-app te-Next.js) nobe i-workbox ekwakheni i-service worker. Njengobe i-server nyalo ihlala izama i-push kanye nekuletsiwa nge-socket (bona [Nini Lapho I-Push Idubula Khona](#when-push-fires)), i-service worker iyipoyinti yekususa kuphindzaphindza (dedup point): i-handler yayo ye-`push` kufanele icindzetele `showNotification` nangabe i-client lecondzile/lebonakalako sekuvele ikumgomo we-deep-link wesatiso, kodvwa kufanele njalo ibuyekete i-badge ye-app kungakhatsaliseki kutsi i-banner iboniswe yini:

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

`deepLinkFor` / `clientMatchesTarget` kukhetsekile ngalabasebentisako — bona `B1App/src/app/sw.ts` ekusetjentisweni lokusibuyeketi. I-B1App icondzisa i-`privateMessage` ku-`/mobile/messages/:personId`, i-B1Admin icondzisa i-`notification` kupheneli yayo yetatiso, njalonjalo.

## Emanotsi Ekusebenta

- **Timphumela te-`gone: true`** — `WebPushHelper.sendBulk` ibuyisela `{ token, success, gone, errorMessage }` ngemunye ngamunye. Umphumela we-`gone: true` (insita ye-push iphendvule nge-`404` nobe `410`) usho kutsi kubhaliswa akusenamsebenti unomphela; ikhodi lelandzelako ku-`NotificationHelper` icitsa lawo malayini emadivayisi kuze angabuye azanywe futsi.
- **TTL** — imilayeto ye-push itfunyelwa nge-`TTL: 86400` (emahora langu-24). Nangabe ibrawuza yemsebentisi ingakhoni kuciniseka nensita ye-push ngekhatsi kwemahora langu-24, i-push iyalahlwa.
- **Akukho Kuphindza Kuzama** — kwehluleka lokungakahlali (i-timeout, i-5xx) kuyabhalwa futsi akuphindzwa kuzanywa. I-push ngumtamo lomkhulu (best-effort); i-socket yasekhasini kanye nesigaba se-imeyili yesatiso baphatsa indzaba yekuhlala kwesikhatsi lesidze.
- **Tindzawo Letingasebenti** — tindzawo te-staging ne-dev tingashiya tikhiya te-VAPID tingenalutfo; `WebPushHelper.isEnabled()` itawubuyisela `false` bese ema-push ayamiswa masinyane. Loku kutiphatsa lokuhlosiwe etindzaweni letingenayo i-identity yato ye-VAPID.

## Emakhasi Lahambelanako

- [Sakhiwo Setatiso](./architecture/notifications) -- Lifonile lephelele yekukhulisa kwe-in-app/push/imeyili kanye nenjini yetikhumbuto
- [Sakhiwo Sesikhatsi Lesiphetsimile](./realtime) -- Kuletsiwa nge-WebSocket; i-push nyalo idubula kusuka kulifonile lelifanako le-in-app kanye nekuletsiwa nge-socket kuludzingo lolufanako, hhayi kuphela njenge-fallback nangabe kuletsiwa nge-socket kungafiki
- [Messaging Endpoints](./api/endpoints/messaging) -- Tatiso, emadivayisi, kanye nalokunye lokusele kwesibonelo semilayeto
- [AppHelper](./shared-libraries/app-helper) -- Liphakheji le-npm lelitfumela i-WebPushHelper
