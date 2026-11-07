---
title: "Potisna obvestila na spletu"
description: "Nastavitev ključev VAPID, odjemalca WebPushHelper in service workerja, da B1.church in B1 Admin članom dostavljata potisna obvestila v brskalniku."
---

# Potisna obvestila na spletu

<div class="article-intro">

ChurchApps spletne aplikacije pošiljajo potisna obvestila prek W3C Web Push API, ki je isti mehanizem, ki ga na strežniški strani uporablja Firebase Cloud Messaging, vendar se obvestila dostavljajo prek brskalnikovega domačega `PushManager`a namesto FCM-a. En sam par ključev VAPID na MessagingApi pokriva vse odjemalce (B1Admin, B1App, prihodnje PWA).

</div>

## Kdaj se sproži potisno obvestilo

Potisno obvestilo je ena stopnja v enem prehodu dostave znotraj `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): najprej vrata nastavitev v aplikaciji, nato se v istem prehodu poskusita dostava prek socketa in potisno obvestilo (vsaka za svojimi vrati nastavitev), nazadnje e-pošta. Prejemnik, ki je kategorijo utišal, potisnega obvestila nikoli ne prejme. Uspešna dostava prek socketa potisnih obvestil ne ustavi več. Vsaka vrsta obvestila se zdaj obnaša tako kot zasebna sporočila vedno, zato nameščena PWA v ozadju še vedno prikaže obvestilo na ravni OS, tudi če je dostava prek socketa že uspela. Podvojene pasice na strani odjemalca odpravi service worker (glej [Zahteva za service worker](#service-worker-requirement)). Planirani opomniki in množična obvestila, ki jih sproži osebje, začnejo neposredno na stopnji potisnih obvestil in preskočijo korak socketa. E-pošta ostaja vezana na časovnik in eskalira neprebrane vrstice po lastnem urniku, ne kot del tega prehoda.

Najpogostejše poti, ki vodijo do potisnega obvestila:

1. **Vsebinska obvestila**: odgovor v pogovoru, ki ga oseba spremlja, omemba ali drug dogodek, usmerjen prek `NotificationHelper.createNotifications()`.
2. **Zasebna sporočila**: neposredno sporočilo gre prek iste dostavne funkcije in vedno poskusi poslati potisno obvestilo poleg dostave prek socketa.
3. **Planirani opomniki**: opomniki za dogodke, naloge in služenje, ki jih razširi in pošlje motor opomnikov. Ta nova pojavljanja začne neposredno na stopnji potisnih obvestil.
4. **Potisna obvestila, ki jih sproži osebje**: `POST /messaging/notifications/create`, `/ping` in `/group/send` za enkratna ali skupinska sporočila.

## Potek na strežniku

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

### Zahtevane okoljske spremenljivke

Ključi VAPID so shranjeni v `Environment` in morajo biti prisotni, da je potisno obvestilo omogočeno:

| Okoljska spremenljivka | Nastavitev `Environment` | Opis |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Javni ključ VAPID (base64url). Odjemalcem se vrne prek `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Zasebni ključ VAPID. Uporablja se za podpis vsakega odhodnega potisnega obvestila |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:`, ki se sporoča potisnim storitvam. Privzeto `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` vrne `false`, če manjka kateri koli od ključev. Modul za sporočila še vedno deluje, potisne dostave pa preprosto ne naredijo ničesar. Spletno mesto B1App za mobilne naprave nato članom sporoči, da potisna obvestila niso vklopljena, namesto da bi ponudilo nastavitev.

### Ustvarjanje para ključev VAPID

```bash
npx web-push generate-vapid-keys
```

Izpis dodajte v `.env` (lokalno) ali v AWS SSM Parameter Store (v produkciji). Zamenjava ključev razveljavi vse obstoječe naročnine, zato se morajo odjemalci ob naslednjem nalaganju strani ponovno prijaviti.

## Model shranjevanja

Naročnine na Web Push se shranjujejo v obstoječo tabelo `devices` poleg naprav FCM. Ločijo se po predponi `webpush:` v stolpcu `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

To omogoča, da en sam klic `loadByPersonId` vrne vse naprave, ki jih je uporabnik prijavil, ne glede na platformo. `WebPushHelper.isWebPushToken(token)` in `decodeSubscription(token)` obravnavata logiko predpone.

## Končne točke

Osnovna pot: `/messaging/webpush`

| Metoda | Pot | Avtentikacija | Opis |
|--------|------|------|-------------|
| GET | `/publicKey` | Javno | Vrne `{ publicKey, enabled }`. Odjemalci posredujejo `publicKey` v `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registrira (ali posodobi) naročnino za prijavljenega uporabnika. Telo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Javno | Izbriše vse vrstice naprav, katerih `fcmToken` vsebuje dani naslov. Telo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Izbriše določeno vrstico naprave po njenem id-ju na strežniku |

## Odjemalski primitiv: `WebPushHelper`

`WebPushHelper` iz paketa `@churchapps/apphelper` je edina odjemalska vstopna točka. Gostitelji ga enkrat nastavijo ob zagonu, po prijavi pa pokličejo `subscribe()`.

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

Vedenja, ki jih odjemalci dobijo brezplačno:

- **Preverjanje podpore**: `isSupported()` vrne `false` v brskalnikih brez `serviceWorker`, `PushManager` ali `Notification`.
- **Premor**: `canPromptNow()` uveljavi 7-dnevni premor med pozivi prek `localStorage`, da uporabnikov, ki zavrnejo poziv OS, ne sprašuje ob vsaki seji.
- **Odjava**: `setOptedOut(true)` in `unsubscribe()` preprečita ponovno spraševanje in odstranita vrstico naprave na strežniku.
- **Zaznavanje samostojne PWA**: `isStandalone()` gostiteljem omogoča, da pozive za potisna obvestila na iOS-u omejijo na primer »uporabnik je PWA namestil na začetni zaslon« (iOS dovoljuje potisna obvestila samo iz nameščenih PWA).
- **Ponovna prijava ob zamenjavi cerkve**: `refreshEnrollment()` ponovno pošlje obstoječo brskalniško naročnino za novi `userChurch`, ne da bi uporabnika ponovno vprašal. Pokličite ga iz obdelovalnika spremembe `userChurch`.

### Zahteva za service worker

`PushManager` brskalnika razreši naročnino samo, če je service worker registriran na konfiguriranem obsegu. ChurchApps PWA za generiranje service workerja uporabljajo [Serwist](https://serwist.dev/) (aplikacije Next.js) ali workbox. Ker strežnik zdaj vedno poskuša poslati potisno obvestilo poleg dostave prek socketa (glej [Kdaj se sproži potisno obvestilo](#when-push-fires)), je service worker točka za odpravo podvajanja. Njegov obdelovalnik `push` mora zatreti `showNotification`, kadar je odprt in viden odjemalec že na globinski povezavi obvestila. Značko aplikacije pa mora vedno posodobiti, ne glede na to, ali je pasica prikazana:

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

`deepLinkFor` in `clientMatchesTarget` sta odvisna od posameznega odjemalca. Za referenčno implementacijo glejte `B1App/src/app/sw.ts`. B1App usmerja `privateMessage` na `/mobile/messages/:personId`, B1Admin pa usmerja `notification` na svojo ploščo opozoril itd.

## Operativne opombe

- **Rezultati `gone: true`**: `WebPushHelper.sendBulk` vrne `{ token, success, gone, errorMessage }` za vsakega prejemnika. Rezultat `gone: true` (potisna storitev je odgovorila s `404` ali `410`) pomeni, da je naročnina trajno neveljavna. Koda v `NotificationHelper` nato izbriše te vrstice naprav, da se ne poskušajo več.
- **TTL**: potisna sporočila se pošiljajo s `TTL: 86400` (24 ur). Če se brskalnik uporabnika v 24 urah ne poveže s potisno storitvijo, se potisno obvestilo zavrže.
- **Brez ponovnih poskusov**: prehodna napaka (časovna omejitev, 5xx) se zabeleži in ne ponovi. Potisna obvestila so najboljši možen trud. Trajnost zagotavljata socket v strani in stopnja e-poštnih obvestil.
- **Onemogočena okolja**: razvojna okolja lahko pustijo ključe VAPID prazne. `WebPushHelper.isEnabled()` bo vrnil `false`, potisne pošiljke pa se bodo prekinile. To je predvideno obnašanje za okolja brez lastne identitete VAPID.

## Povezane strani

- [Arhitektura obvestil](./architecture/notifications.md) -- Celotni lijak eskalacije (v aplikaciji, potisno, e-pošta) in motor opomnikov
- [Arhitektura v realnem času](./realtime.md) -- Dostava prek WebSocketa. Potisna obvestila se zdaj sprožijo iz istega lijaka v aplikaciji poleg dostave prek socketa v istem prehodu, ne le kot rezerva, ko dostava prek socketa ne uspe
- [Končne točke za sporočila](./api/endpoints/messaging.md) -- Obvestila, naprave in preostala površina sporočil
- [AppHelper](./shared-libraries/app-helper.md) -- Paket npm, ki vsebuje `WebPushHelper`
