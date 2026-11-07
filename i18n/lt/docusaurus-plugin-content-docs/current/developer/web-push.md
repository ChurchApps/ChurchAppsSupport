---
title: "Web Push pranešimai"
description: "VAPID raktų, WebPushHelper kliento ir paslaugų darbuotojo tvarkymo sąranka, kad B1.church ir B1 Admin galėtų siųsti naršyklės pranešimus nariams."
---

# Web Push pranešimai

<div class="article-intro">

ChurchApps žiniatinklio programėlės siunčia pranešimus per W3C Web Push API. Tai tas pats mechanizmas, kurį serverio pusėje naudoja Firebase Cloud Messaging, tik pristatomas per naršyklės vietinį `PushManager`, o ne per FCM. Viena VAPID raktų pora MessagingApi lygmenyje aptarnauja visus vartotojus (B1Admin, B1App, būsimas PWA).

</div>

## Kada siunčiami push pranešimai

Push yra viena pristatymo pakopa vienoje pristatymo eigoje `NotificationHelper.attemptDeliveryWithEscalation()` funkcijoje (`Api/src/modules/messaging/helpers/NotificationHelper.ts`). Pirmiausia tikrinamas programos viduje nustatytas pranešimų nustatymas, tada tuo pačiu etapu bandoma pristatyti per socket ir push (kiekvienas turi savo nustatymų patikrinimą), o galiausiai siunčiamas el. laiškas. Gavėjas, kuris išjungė kategoriją, į push nepatenka. Sėkmingas socket pristatymas nebesustabdo push: visi pranešimų tipai dabar elgiasi taip, kaip privačios žinutės visada elgėsi. Todėl įdiegta PWA, veikianti fone, vis tiek parodo operacinės sistemos pranešimą, net jei socket pristatymas jau įvyko. Dublikatus pranešimus slopina paslaugų darbuotojas (service worker) naršyklės pusėje (žr. [Paslaugų darbuotojo reikalavimas](#service-worker-requirement)). Planuojami priminimai ir personalo inicijuojami masiniai pranešimai pradedami tiesiai nuo push pakopos, todėl socket žingsnis praleidžiamas. El. laiškai ir toliau siunčiami pagal laikmatį: neperskaitytos eilutės eskaluojamos pagal savo tvarkaraštį, o ne šios eigos dalimi.

Dažniausi keliai, vedantys į push:

1. **Turinio pranešimai** — atsakymas į pokalbį, kurį asmuo seka, paminėjimas ar kitas įvykis, nukreiptas per `NotificationHelper.createNotifications()`.
2. **Privačios žinutės** — tiesioginė žinutė eina per tą pačią pristatymo funkciją ir visada bando siųsti push kartu su socket pristatymu.
3. **Planuojami priminimai** — įvykių, užduočių ir tarnystės priminimai, kuriuos išskleidžia priminimų variklis ir kurie nauji pasikartojimai pradedami tiesiai nuo push pakopos.
4. **Personalo inicijuojami push pranešimai** — `POST /messaging/notifications/create`, `/ping` ir `/group/send` vienkartiniams arba grupiniams pranešimams.

## Serverio eiga

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

### Reikalingi aplinkos kintamieji

VAPID raktai saugomi `Environment` objekte ir turi būti nustatyti, kad push būtų įjungtas:

| Aplinkos kintamasis | `Environment` nustatymas | Aprašymas |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID viešasis raktas (base64url). Klientams grąžinamas per `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID privatusis raktas. Naudojamas pasirašyti kiekvieną siunčiamą push pranešimą |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:` URI, pateikiamas push paslaugoms. Numatytoji reikšmė: `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` grąžina `false`, jei trūksta bet kurio iš raktų. Messaging modulis vis tiek veikia, o push pristatymai tiesiog nieko nedaro. B1App mobiliojoje svetainėje tuomet nariams pranešama, kad push pranešimai neįjungti, o ne siūloma juos nustatyti.

### VAPID raktų poros generavimas

```bash
npx web-push generate-vapid-keys
```

Išvestį įrašykite į `.env` failą (lokaliai) arba į AWS SSM Parameter Store (diegiant). Pakeitus raktus, visos esamos prenumeratos nebegalioja: klientai turi vėl prisijungti kitą kartą atidarę puslapį.

## Saugojimo modelis

Web Push prenumeratos saugomos esamoje `devices` lentelėje kartu su FCM įrenginių įrašais. Jos atskiriamos pagal `webpush:` priešdėlį `fcmToken` stulpelyje:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Tai leidžia vienu `loadByPersonId` kvietimu gauti visus vartotojo įregistruotus įrenginius, nepriklausomai nuo platformos. `WebPushHelper.isWebPushToken(token)` ir `decodeSubscription(token)` tvarko priešdėlio logiką.

## Galutiniai taškai

Pagrindinis kelias: `/messaging/webpush`

| Metodas | Kelias | Autentifikacija | Aprašymas |
|--------|------|------|-------------|
| GET | `/publicKey` | Viešas | Grąžina `{ publicKey, enabled }`. Klientai perduoda `publicKey` į `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Užregistruoja (arba atnaujina) prenumeratą prisijungusiam vartotojui. Turinys: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Viešas | Ištrina bet kurį įrenginio įrašą, kurio `fcmToken` yra nurodytas galinis taškas (endpoint). Turinys: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Ištrina konkretų įrenginio įrašą pagal serverio pusės id |

## Kliento komponentas: `WebPushHelper`

`@churchapps/apphelper` paketo `WebPushHelper` yra vienintelis kliento pusės įėjimo taškas. Programos vieną kartą sukonfigūruoja jį paleidimo metu ir po prisijungimo kviečia `subscribe()`.

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

Vartotojai gauna šias funkcijas be papildomų pastangų:

- **Galimybių patikra** — `isSupported()` grąžina `false` naršyklėse, kuriose nėra `serviceWorker` / `PushManager` / `Notification`.
- **Pakartotinių užklausų pauzė** — `canPromptNow()` užtikrina 7 dienų pauzę tarp užklausų per `localStorage`, kad vartotojams, kurie atmetė operacinės sistemos užklausą, ji nebūtų rodoma kiekvieną sesiją.
- **Atsisakymas** — `setOptedOut(true)` ir `unsubscribe()` blokuoja pakartotines užklausas ir pašalina serverio pusės įrenginio įrašą.
- **Įdiegtos PWA aptikimas** — `isStandalone()` leidžia programoms riboti iOS push užklausas vartotojams, kurie įdiegė PWA į pagrindinį ekraną (iOS leidžia push tik iš įdiegtų PWA).
- **Pakartotinis įregistravimas keičiant bažnyčią** — `refreshEnrollment()` iš naujo siunčia esamą naršyklės prenumeratą su nauju `userChurch`, neprašydamas vartotojo dar kartą patvirtinti. Kviečiama iš `userChurch` pakeitimo apdorojimo funkcijos.

### Paslaugų darbuotojo reikalavimas

Naršyklės `PushManager` išsprendžia prenumeratą tik tada, kai sukonfigūruotame diapazone (scope) užregistruotas paslaugų darbuotojas. ChurchApps PWA paslaugų darbuotojus generuoja [Serwist](https://serwist.dev/) (Next.js programoms) arba workbox. Kadangi serveris dabar visada bando siųsti push kartu su socket pristatymu (žr. [Kada siunčiami push pranešimai](#when-push-fires)), dublikatus šalina paslaugų darbuotojas. Jo `push` apdorojimo funkcija turi nerodyti `showNotification`, kai fokusuotas arba matomas langas jau atidarytas ties pranešimo nuorodos tikslu. Programos ženklelis (badge) vis tiek visada atnaujinamas, nepriklausomai nuo to, ar pranešimas buvo parodytas:

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

`deepLinkFor` ir `clientMatchesTarget` yra konkrečiai kiekvienai programai. Pavyzdinį įgyvendinimą žr. `B1App/src/app/sw.ts`. B1App nukreipia `privateMessage` į `/mobile/messages/:personId`, o B1Admin nukreipia `notification` į savo įspėjimų skydelį ir pan.

## Operaciniai pastebėjimai

- **`gone: true` rezultatai** — `WebPushHelper.sendBulk` kiekvienam gavėjui grąžina `{ token, success, gone, errorMessage }`. Rezultatas su `gone: true` (push paslauga atsakė `404` arba `410`) reiškia, kad prenumerata nuolat negalioja. `NotificationHelper` vėliau ištrina tokius įrenginių įrašus, kad jiems daugiau nebūtų bandoma siųsti.
- **TTL** — push pranešimai siunčiami su `TTL: 86400` (24 valandos). Jei vartotojo naršyklė per 24 valandas neprisijungia prie push paslaugos, pranešimas prarandamas.
- **Nėra pakartotinių bandymų** — laikina klaida (skirtasis laikas, 5xx) įrašoma į žurnalą ir nekartojama. Push veikia geriausių pastangų principu: patikimumą užtikrina puslapio socket ir el. laiškų pranešimų pakopa.
- **Išjungtos aplinkos** — kūrimo aplinkose VAPID raktai gali likti tušti. Tuomet `WebPushHelper.isEnabled()` grąžina `false` ir push siuntimas nutraukiamas anksti. Tai numatytas elgesys aplinkoms, neturinčioms savo VAPID tapatybės.

## Susiję puslapiai

- [Pranešimų architektūra](./architecture/notifications.md) -- Visa programos viduje, push ir el. pašto eskalavimo grandinė bei priminimų variklis
- [Realaus laiko architektūra](./realtime.md) -- WebSocket pristatymas; push dabar siunčiamas iš tos pačios programos pranešimų grandinės kartu su socket pristatymu toje pačioje eigoje, o ne tik kaip atsarginis variantas, kai socket pristatymas nepavyksta
- [Messaging galiniai taškai](./api/endpoints/messaging.md) -- Pranešimai, įrenginiai ir likęs messaging paviršius
- [AppHelper](./shared-libraries/app-helper.md) -- npm paketas, kuriame pateikiamas `WebPushHelper`
