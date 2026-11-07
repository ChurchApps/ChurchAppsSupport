---
title: "Web Push-értesítések"
---

# Web Push-értesítések

<div class="article-intro">

A ChurchApps webalkalmazások push-értesítéseket a W3C Web Push API-n keresztül küldenek. Ugyanez a mechanizmus működik a Firebase Cloud Messaging szerveroldali változatánál is, de itt a böngésző natív `PushManager` felülete továbbítja az üzeneteket, nem az FCM. Egyetlen VAPID-kulcspár a MessagingApi-n minden kliensalkalmazást kiszolgál (B1Admin, B1App, a jövőbeli PWA-k).

</div>

## Mikor küldünk push-értesítést

A push a `NotificationHelper.attemptDeliveryWithEscalation()` egyetlen kézbesítési körének egyik szintje (`Api/src/modules/messaging/helpers/NotificationHelper.ts`). A kör sorrendje: először az alkalmazáson belüli beállítások ellenőrzése, majd ugyanabban a körben a socket-kézbesítés és a push-kísérlet (mindkettő saját beállítási kapuval), végül az e-mail. Aki némította a kategóriát, soha nem jut el a push-szintig. A socket-kézbesítés sikere már nem állítja meg a push-ot: minden értesítéstípus ugyanúgy viselkedik, mint a privát üzenetek mindig is. A háttérben futó, telepített PWA így akkor is megjelenít operációs rendszerszintű értesítést, ha a socket-kézbesítés már megtörtént. A duplikált bannereket ehelyett a kliensoldali service worker szűri ki (lásd [Service worker követelmény](#service-worker-requirement)). Az ütemezett emlékeztetők és a munkatársak által indított körüzenetek közvetlenül a push szinten indulnak, a socket-lépést kihagyva. Az e-mail továbbra is időzítésvezérelt: az olvasatlan sorokat a saját ütemezése szerint kezeli, nem ennek a körnek a részeként.

A leggyakoribb utak, amelyek a push szintig jutnak:

1. **Tartalomértesítések** — válasz olyan beszélgetésre, amelyet a személy követ, megemlítés, vagy más esemény, amelyet a `NotificationHelper.createNotifications()` továbbít.
2. **Privát üzenetek** — a közvetlen üzenet ugyanazon a kézbesítési függvényen megy át, és mindig megkísérli a push-ot a socket-kézbesítés mellett.
3. **Ütemezett emlékeztetők** — esemény-, feladat- és szolgálati emlékeztetők, amelyeket az emlékeztető-motor bont ki és küld el. Az új előfordulásokat közvetlenül a push szinten indítja.
4. **Munkatárs által indított push-ok** — `POST /messaging/notifications/create`, `/ping` és `/group/send` egyedi vagy csoportos körüzenetekhez.

## Szerveroldali folyamat

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

### Szükséges környezeti változók

A VAPID-kulcsok az `Environment`-ben tárolódnak, és a push engedélyezéséhez mindkettőnek jelen kell lennie:

| Környezeti változó | `Environment` beállítás | Leírás |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID nyilvános kulcs (base64url). A `GET /messaging/webpush/publicKey` végponton keresztül jut el a kliensekhez |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID privát kulcs. Minden kimenő push aláírására szolgál |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:` URI, amelyet a push-szolgáltatóknak jelentünk. Alapértelmezett: `mailto:support@churchapps.org` |

Ha bármelyik kulcs hiányzik, a `WebPushHelper.isEnabled()` `false` értéket ad vissza. A messaging modul ilyenkor is működik, a push-kézbesítések egyszerűen nem történnek meg. A B1App mobil oldal ilyenkor azt közli a tagokkal, hogy a push nincs bekapcsolva, beállítást nem ajánl fel.

### VAPID-kulcspár generálása

```bash
npx web-push generate-vapid-keys
```

A kimenetet add a `.env` fájlodhoz (helyi környezet), vagy az AWS SSM Parameter Store-hoz (éles környezet). A kulcsok cseréje minden meglévő feliratkozást érvénytelenít: a klienseknek a következő oldalbetöltéskor újra regisztrálniuk kell.

## Tárolási modell

A Web Push-feliratkozások a meglévő `devices` táblában tárolódnak, az FCM-eszközrekordok mellett. Az `fcmToken` oszlop `webpush:` előtagja különbözteti meg őket:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Így egyetlen `loadByPersonId` hívás visszaadja a felhasználó összes regisztrált eszközét, platformtól függetlenül. Az előtaggal kapcsolatos logikát a `WebPushHelper.isWebPushToken(token)` és a `decodeSubscription(token)` kezeli.

## Végpontok

Alapútvonal: `/messaging/webpush`

| Metódus | Útvonal | Hitelesítés | Leírás |
|--------|------|------|-------------|
| GET | `/publicKey` | Nyilvános | `{ publicKey, enabled }` értéket ad vissza. A kliensek a `publicKey`-t adják át a `pushManager.subscribe({ applicationServerKey })` hívásnak |
| POST | `/subscribe` | JWT | Regisztrál (vagy frissít) egy feliratkozást a hitelesített felhasználónak. Törzs: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Nyilvános | Törli azt az eszközsort, amelynek `fcmToken` mezője tartalmazza a megadott végpontot. Törzs: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Törli a megadott eszközsort a szerveroldali azonosítója alapján |

## Kliensoldali alapelem: `WebPushHelper`

A `@churchapps/apphelper` csomag `WebPushHelper` osztálya az egyetlen kliensoldali belépési pont. A hosztalkalmazás egyszer konfigurálja indításkor, bejelentkezés után pedig meghívja a `subscribe()` metódust.

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

A fogyasztók ingyen kapják a következő viselkedéseket:

- **Képességellenőrzés** — az `isSupported()` `false` értéket ad vissza azokban a böngészőkben, ahol nincs `serviceWorker`, `PushManager` vagy `Notification`.
- **Várakozási idő** — a `canPromptNow()` 7 napos várakozási időt érvényesít a kérések között a `localStorage` segítségével, így aki elutasította az operációs rendszer kérését, azt nem kérdezik meg minden munkamenetben újra.
- **Leiratkozás** — a `setOptedOut(true)` és az `unsubscribe()` megakadályozza az újrakérdezést, és eltávolítja a szerveroldali eszközsort.
- **Telepített PWA felismerése** — az `isStandalone()` lehetővé teszi, hogy a hosztok az iOS push-kéréseket ahhoz kössék, hogy a felhasználó telepítette-e a PWA-t a kezdőképernyőre (az iOS csak telepített PWA-tól enged push-ot).
- **Újraregisztráció gyülekezetváltáskor** — a `refreshEnrollment()` a meglévő böngészőfeliratkozást az új `userChurch`-höz küldi újra, anélkül hogy újra kérdezné a felhasználót. Hívd a `userChurch` változáskezelőjéből.

### Service worker követelmény

A böngésző `PushManager`-e csak akkor old fel egy feliratkozást, ha a konfigurált hatókörben be van regisztrálva egy service worker. A ChurchApps PWA-k a [Serwist](https://serwist.dev/) (Next.js alkalmazások) vagy a workbox eszközt használják a service worker generálásához. Mivel a szerver most mindig megkísérli a push-ot a socket-kézbesítéssel együtt (lásd [Mikor küldünk push-értesítést](#when-push-fires)), a service worker a duplikáció szűrésének helye. A `push` kezelőjének el kell nyomnia a `showNotification` hívást, ha egy fókuszált vagy látható kliens már az értesítés mélylinkjén van. Az alkalmazásjelvényt viszont mindig frissítenie kell, függetlenül attól, hogy a banner megjelent-e:

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

A `deepLinkFor` és a `clientMatchesTarget` fogyasztófüggő. A referenciaimplementációt a `B1App/src/app/sw.ts` fájlban találod. A B1App a `privateMessage` típust a `/mobile/messages/:personId` útvonalra irányítja, a B1Admin a `notification` típust pedig a riasztási paneljére, és így tovább.

## Működési megjegyzések

- **`gone: true` eredmények** — a `WebPushHelper.sendBulk` címzettenként `{ token, success, gone, errorMessage }` értéket ad vissza. A `gone: true` eredmény (a push-szolgáltató `404` vagy `410` választ adott) azt jelenti, hogy a feliratkozás véglegesen érvénytelen. A `NotificationHelper` alatti kód ezeket az eszközsorokat törli, hogy ne próbálkozzon velük újra.
- **TTL** — a push-üzenetek `TTL: 86400` (24 óra) értékkel mennek ki. Ha a felhasználó böngészője 24 órán belül nem csatlakozik a push-szolgáltatóhoz, a push elvész.
- **Nincs újrapróbálkozás** — az átmeneti hibákat (időtúllépés, 5xx) naplózzuk, de nem próbáljuk újra. A push legjobb igyekezet alapon működik. A tartósságot az oldalon belüli socket és az e-mail értesítési szint biztosítja.
- **Letiltott környezetek** — a fejlesztői környezetekben üresen hagyhatók a VAPID-kulcsok. Ilyenkor a `WebPushHelper.isEnabled()` `false` értéket ad, a push-ok pedig azonnal kilépnek. Ez a szándékos viselkedés azokban a környezetekben, amelyeknek nincs saját VAPID-identitásuk.

## Kapcsolódó oldalak

- [Értesítési architektúra](./architecture/notifications) -- A teljes alkalmazáson belüli, push- és e-mail-eszkalációs csatorna, valamint az emlékeztető-motor
- [Valós idejű architektúra](./realtime) -- WebSocket-kézbesítés. A push most ugyanabból az alkalmazáson belüli csatornából indul, mint a socket-kézbesítés, ugyanabban a körben. Nem csak akkor lép életbe, ha a socket-kézbesítés nem ért célba.
- [Messaging végpontok](./api/endpoints/messaging) -- Értesítések, eszközök és az üzenetküldési felület többi része
- [AppHelper](./shared-libraries/app-helper) -- Az npm csomag, amely a `WebPushHelper`-t tartalmazza
