---
title: "Web Push-notifikationer"
description: "Opsæt VAPID-nøgler, WebPushHelper-klienten og service worker-håndtering, så B1.church og B1 Admin kan sende browser-pushnotifikationer til medlemmer."
---

# Web Push-notifikationer

<div class="article-intro">

ChurchApps-webapps leverer push-notifikationer via W3C Web Push API, den samme mekanisme som Firebase Cloud Messaging bruger på serversiden, men leveret gennem browserens indbyggede `PushManager` i stedet for FCM. Et enkelt VAPID-nøglepar på MessagingApi dækker alle forbrugere (B1Admin, B1App og kommende PWA'er).

</div>

## Hvornår push udløses

Push er ét trin i en enkelt leveringsproces inde i `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): først en præferencekontrol for notifikationer i appen, derefter socket-levering og push, som begge forsøges i samme proces (hver bag sin egen præferencekontrol), og til sidst e-mail. En modtager, der har slået kategorien fra, når aldrig frem til push. Hvis socket-leveringen lykkes, stopper push ikke længere. Alle notifikationstyper opfører sig nu, som private beskeder altid har gjort, så en installeret PWA, der kører i baggrunden, stadig viser en notifikation på operativsystemniveau, selv når en socket-levering allerede er landet. Dubletter af banner undertrykkes i stedet på klientsiden af service workeren (se [Krav til service worker](#service-worker-requirement)). Planlagte påmindelser og udsendelser startet af medarbejdere begynder direkte på push-trinnet og springer socket-trinnet over. E-mail er fortsat timerstyret og eskalerer ulæste rækker efter sin egen tidsplan og ikke som en del af denne proces.

De hyppigste veje, der når frem til push:

1. **Indholdsnotifikationer**: et svar i en samtale, som personen følger, en omtale eller en anden hændelse, der sendes via `NotificationHelper.createNotifications()`.
2. **Private beskeder**: en direkte besked går gennem den samme leveringsfunktion og forsøger altid push sammen med socket-levering.
3. **Planlagte påmindelser**: påmindelser om begivenheder, opgaver og tjenester, som udvides og sendes af påmindelsesmotoren, der starter nye forekomster direkte på push-trinnet.
4. **Push startet af medarbejdere**: `POST /messaging/notifications/create`, `/ping` og `/group/send` til engangs- eller gruppeudsendelser.

## Serverflow

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

### Påkrævede miljøvariabler

VAPID-nøgler gemmes i `Environment` og skal være til stede, før push kan aktiveres:

| Miljøvariabel | `Environment`-indstilling | Beskrivelse |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID-offentlig nøgle (base64url). Returneres til klienter via `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID-privat nøgle. Bruges til at signere hver udgående push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:`-URI, der rapporteres til push-tjenester. Standard er `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` returnerer `false`, når en af nøglerne mangler. Messaging-modulet fortsætter med at fungere, men push-leveringer gør ingenting. B1App-mobilsiden fortæller så medlemmerne, at push ikke er slået til, i stedet for at tilbyde opsætning.

### Generering af et VAPID-nøglepar

```bash
npx web-push generate-vapid-keys
```

Tilføj outputtet til din `.env` (lokalt) eller AWS SSM Parameter Store (i drift). Hvis nøglerne roteres, ugyldiggøres alle eksisterende abonnementer, og klienterne skal tilmelde sig igen ved næste sideindlæsning.

## Lagringsmodel

Web Push-abonnementer gemmes i den eksisterende tabel `devices` sammen med FCM-enhedsposter. De skelnes ved et præfiks `webpush:` i kolonnen `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dette gør det muligt, at et enkelt kald til `loadByPersonId` returnerer alle enheder, en bruger har tilmeldt, uanset platform. `WebPushHelper.isWebPushToken(token)` og `decodeSubscription(token)` håndterer præfikslogikken.

## Endpoints

Basissti: `/messaging/webpush`

| Metode | Sti | Autorisation | Beskrivelse |
|--------|------|------|-------------|
| GET | `/publicKey` | Offentlig | Returnerer `{ publicKey, enabled }`. Klienter sender `publicKey` til `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registrerer (eller opdaterer) et abonnement for den godkendte bruger. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Offentlig | Sletter enhedsposter, hvis `fcmToken` indeholder det angivne endpoint. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Sletter en bestemt enhedspost ud fra dens server-side id |

## Klientprimitiv: `WebPushHelper`

`WebPushHelper` i `@churchapps/apphelper` er det eneste klientside-indgangspunkt. Værter konfigurerer den én gang ved opstart og kalder `subscribe()` efter login.

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

Disse funktioner får forbrugerne gratis:

- **Funktionalitetstjek**: `isSupported()` returnerer `false` i browsere uden `serviceWorker`, `PushManager` eller `Notification`.
- **Nedkølingsperiode**: `canPromptNow()` håndhæver en nedkølingsperiode på 7 dage mellem forespørgsler via `localStorage`, så brugere, der afviser operativsystemets forespørgsel, ikke bliver spurgt igen ved hver session.
- **Fravalg**: `setOptedOut(true)` og `unsubscribe()` blokerer nye forespørgsler og fjerner enhedsposten på serveren.
- **Registrering af standalone-PWA**: `isStandalone()` lader værter styre iOS-push-forespørgsler, så de kun vises, når brugeren har installeret PWA'en på startskærmen (iOS tillader kun push fra installerede PWA'er).
- **Genregistrering ved skift af kirke**: `refreshEnrollment()` sender det eksisterende browserabonnement igen for den nye `userChurch` uden at spørge brugeren igen. Kald den fra handleren for ændring af `userChurch`.

### Krav til service worker

Browserens `PushManager` løser kun et abonnement, når der er registreret en service worker på den konfigurerede scope. ChurchApps-PWA'er bruger [Serwist](https://serwist.dev/) (Next.js-apps) eller workbox til at generere service workeren. Fordi serveren nu altid forsøger push sammen med socket-levering (se [Hvornår push udløses](#when-push-fires)), er service workeren dedup-punktet. Dens `push`-handler skal undertrykke `showNotification`, når en fokuseret eller synlig klient allerede står på notifikationens deep link-mål. Den skal dog altid opdatere app-badgen, uanset om banneret blev vist:

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

`deepLinkFor` og `clientMatchesTarget` er specifikke for den enkelte forbruger. Se `B1App/src/app/sw.ts` for referenceimplementeringen. B1App sender `privateMessage` til `/mobile/messages/:personId`, og B1Admin sender `notification` til sit advarselspanel osv.

## Driftsnoter

- **Resultater med `gone: true`**: `WebPushHelper.sendBulk` returnerer `{ token, success, gone, errorMessage }` for hver modtager. Et resultat med `gone: true` (push-tjenesten svarede `404` eller `410`) betyder, at abonnementet er permanent ugyldigt. Efterfølgende kode i `NotificationHelper` sletter disse enhedsposter, så de ikke forsøges igen.
- **TTL**: push-beskeder sendes med `TTL: 86400` (24 timer). Hvis brugerens browser ikke forbinder til push-tjenesten inden for 24 timer, kasseres push-beskeden.
- **Ingen genforsøg**: en midlertidig fejl (timeout, 5xx) logges og forsøges ikke igen. Push er et bedste forsøg. Socket-forbindelsen i siden og e-mail-trinnet står for holdbarheden.
- **Deaktiverede miljøer**: udviklingsmiljøer kan lade VAPID-nøglerne stå tomme. Så returnerer `WebPushHelper.isEnabled()` `false`, og push-beskeder springes over. Det er den tilsigtede adfærd for miljøer uden deres egen VAPID-identitet.

## Relaterede sider

- [Notifikationsarkitektur](./architecture/notifications.md): den fulde eskaleringstragt for notifikationer i appen, push og e-mail samt påmindelsesmotoren
- [Realtidsarkitektur](./realtime.md): WebSocket-levering. Push udløses nu fra samme tragt i appen sammen med socket-levering i samme proces, ikke kun som en reserve, når en socket-levering ikke lykkes
- [Messaging-endpoints](./api/endpoints/messaging.md): notifikationer, enheder og resten af messaging-fladen
- [AppHelper](./shared-libraries/app-helper.md): npm-pakken, der leveres med `WebPushHelper`
