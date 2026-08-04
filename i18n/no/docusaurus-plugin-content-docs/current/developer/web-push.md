---
title: "Push-varsler i nettleser"
---

# Push-varsler i nettleser

<div class="article-intro">

ChurchApps' nettapper leverer push-varsler via W3C Web Push API — samme mekanisme som Firebase Cloud Messaging bruker på serversiden, men levert gjennom nettleserens native `PushManager` i stedet for FCM. Ett enkelt VAPID-nøkkelpar på MessagingApi dekker hver konsument (B1Admin, B1App, fremtidige PWA-er).

</div>

## Når push utløses

Push er ett nivå i én enkelt leveringsrunde inne i `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): en preferanseport i appen, deretter forsøkes socket-levering og push i samme runde (hver bak sin egen preferanseport), deretter e-post. En mottaker som har dempet kategorien når aldri push. Vellykket socket-levering stopper ikke lenger push — hver varslingstype oppfører seg nå på samme måte som private meldinger alltid har gjort, så en installert PWA som ligger i bakgrunnen vil fortsatt vise et OS-nivå-varsel selv når en socket-levering allerede har kommet fram; dupliserte bannere undertrykkes på klientsiden av service workeren i stedet (se [Krav til service worker](#krav-til-service-worker)). Planlagte påminnelser og staben-utløste kringkastinger starter direkte på push-nivået, og hopper helt over socket-steget. E-post forblir timer-drevet, og eskalerer uleste rader etter sin egen tidsplan i stedet for som del av denne runden.

De vanligste veiene som når push:

1. **Innholdsvarsler** — et svar på en samtale personen følger, en omtale, eller en annen hendelse rutet gjennom `NotificationHelper.createNotifications()`.
2. **Private meldinger** — en direktemelding går gjennom samme leveringsfunksjon og forsøker alltid push ved siden av socket-levering.
3. **Planlagte påminnelser** — påminnelser for hendelser, oppgaver og tjenesteoppdrag utvidet og sendt av påminnelsesmotoren, som starter nye forekomster direkte på push-nivået.
4. **Stab-utløste push-varsler** — `POST /messaging/notifications/create`, `/ping`, og `/group/send` for engangs- eller gruppekringkastinger.

## Serverflyt

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

### Påkrevde miljøvariabler

VAPID-nøkler lagres i `Environment` og må være til stede for at push skal være aktivert:

| Variabel | Beskrivelse |
|----------|-------------|
| `webPushPublicKey` | VAPID offentlig nøkkel (base64url). Returneres til klienter via `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | VAPID privat nøkkel. Brukes til å signere hver utgående push |
| `webPushSubject` | `mailto:`-URI rapportert til push-tjenester. Standard er `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` returnerer `false` når én av nøklene mangler — meldingsmodulen fortsetter å fungere, push-leveringer gjør bare ingenting.

### Generere et VAPID-nøkkelpar

```bash
npx web-push generate-vapid-keys
```

Legg utdataene til `.env`-filen din (lokalt) eller AWS SSM Parameter Store (distribuert). Rotering av nøkler gjør alle eksisterende abonnementer ugyldige — klienter må melde seg på igjen ved neste sideinnlasting.

## Lagringsmodell

Web Push-abonnementer lagres i den eksisterende `devices`-tabellen sammen med FCM-enhetsposter. De skilles med et `webpush:`-prefiks på `fcmToken`-kolonnen:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dette lar ett enkelt `loadByPersonId`-kall returnere hver enhet en bruker har meldt seg på, uansett plattform. `WebPushHelper.isWebPushToken(token)` og `decodeSubscription(token)` håndterer prefikslogikken.

## Endepunkter

Grunnsti: `/messaging/webpush`

| Metode | Sti | Autentisering | Beskrivelse |
|--------|------|------|-------------|
| GET | `/publicKey` | Offentlig | Returnerer `{ publicKey, enabled }`. Klienter sender `publicKey` til `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registrerer (eller oppdaterer) et abonnement for den autentiserte brukeren. Kropp: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Offentlig | Sletter enhver enhetsrad hvis `fcmToken` inneholder det gitte endepunktet. Kropp: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Sletter en spesifikk enhetsrad etter dens server-side id |

## Klientprimitiv: `WebPushHelper`

`WebPushHelper` fra `@churchapps/apphelper` er det eneste inngangspunktet på klientsiden. Verter konfigurerer den én gang ved oppstart og kaller `subscribe()` etter innlogging.

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

Atferd konsumenter får gratis:

- **Kapabilitetssjekk** — `isSupported()` returnerer `false` på nettlesere uten `serviceWorker` / `PushManager` / `Notification`.
- **Nedkjølingsperiode** — `canPromptNow()` håndhever en 7-dagers nedkjølingsperiode mellom forespørsler via `localStorage`, slik at brukere som avviser OS-forespørselen ikke blir spurt igjen hver økt.
- **Reservasjon** — `setOptedOut(true)` og `unsubscribe()` blokkerer nye forespørsler og fjerner enhetsraden på serversiden.
- **Deteksjon av frittstående PWA** — `isStandalone()` lar verter porte iOS-push-forespørsler bak «bruker har installert PWA-en på hjemskjermen» (iOS tillater bare push fra installerte PWA-er).
- **Ny påmelding ved kirkebytte** — `refreshEnrollment()` sender det eksisterende nettleserabonnementet på nytt mot den nye `userChurch` uten å be brukeren om noe. Kall den fra `userChurch`-endringsbehandleren.

### Krav til service worker

Nettleserens `PushManager` løser bare opp et abonnement når en service worker er registrert på det konfigurerte omfanget. ChurchApps' PWA-er bruker [Serwist](https://serwist.dev/) (Next.js-apper) eller workbox for generering av service worker. Fordi serveren nå alltid forsøker push sammen med socket-levering (se [Når push utløses](#når-push-utløses)), er service workeren dedupliseringspunktet: `push`-behandleren dens må undertrykke `showNotification` når en fokusert/synlig klient allerede er på varselets dyplenkemål, men bør alltid oppdatere appmerket uansett om banneret ble vist:

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

`deepLinkFor` / `clientMatchesTarget` er konsumentspesifikke — se `B1App/src/app/sw.ts` for referanseimplementasjonen. B1App ruter `privateMessage` til `/mobile/messages/:personId`, B1Admin ruter `notification` til varselpanelet sitt, osv.

## Driftsmerknader

- **`gone: true`-resultater** — `WebPushHelper.sendBulk` returnerer `{ token, success, gone, errorMessage }` per mottaker. Et `gone: true`-resultat (push-tjenesten svarte `404` eller `410`) betyr at abonnementet er permanent ugyldig; nedstrøms kode i `NotificationHelper` sletter disse enhetsradene slik at de ikke forsøkes igjen.
- **TTL** — push-meldinger sendes med `TTL: 86400` (24 timer). Hvis brukerens nettleser ikke kobler til push-tjenesten innen 24 timer, forkastes push-varselet.
- **Ingen nye forsøk** — en forbigående feil (timeout, 5xx) blir logget og forsøkes ikke på nytt. Push er beste innsats; sanntidssocket-en på siden og e-postvarselsnivået håndterer holdbarhetshistorien.
- **Deaktiverte miljøer** — staging- og utviklingsmiljøer kan la VAPID-nøklene være tomme; `WebPushHelper.isEnabled()` vil returnere `false`, og push-varsler vil kortslutte. Dette er den tiltenkte atferden for miljøer uten sin egen VAPID-identitet.

## Relaterte sider

- [Varslingsarkitektur](./architecture/notifications) -- Hele eskaleringstrakten for i-app/push/e-post og påminnelsesmotoren
- [Sanntidsarkitektur](./realtime) -- WebSocket-levering; push utløses nå fra samme i-app-trakt sammen med socket-levering i samme runde, ikke bare som en fallback når en socket-levering ikke kommer fram
- [Meldingsendepunkter](./api/endpoints/messaging) -- Varsler, enheter og resten av meldingsflaten
- [AppHelper](./shared-libraries/app-helper) -- npm-pakken som leverer `WebPushHelper`
