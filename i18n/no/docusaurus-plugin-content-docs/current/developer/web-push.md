---
title: "Push-varsler i nettleseren"
---

# Push-varsler i nettleseren

<div class="article-intro">

ChurchApps-webapper leverer push-varsler gjennom W3C Web Push API — samme mekanisme som Firebase Cloud Messaging bruker på serversiden, men levert gjennom nettleserens innebygde `PushManager` i stedet for FCM. Ett enkelt VAPID-nøkkelpar på MessagingApi dekker alle forbrukere (B1Admin, B1App, fremtidige PWA-er).

</div>

## Når push utløses {#when-push-fires}

Push er ett nivå i en enkelt leveringsrunde inne i `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): først en forhåndsvalgsport i appen, deretter socket-levering og push forsøkt i samme runde (hver bak sin egen forhåndsvalgsport), deretter e-post. En mottaker som har dempet kategorien når aldri push. Vellykket socket-levering stopper ikke lenger push — alle varslingstyper oppfører seg nå slik private meldinger alltid har gjort, så en installert PWA som kjører i bakgrunnen fortsatt viser et varsel på operativsystemnivå selv når en socket-levering allerede har landet; dupliserte bannere undertrykkes i stedet på klientsiden av service-workeren (se [Krav til service worker](#service-worker-requirement)). Planlagte påminnelser og kringkastinger startet av personale begynner direkte på push-nivået og hopper over socket-steget helt. E-post er fortsatt tidsstyrt, og eskalerer uleste rader etter sin egen plan i stedet for som en del av denne runden.

De vanligste veiene som når push:

1. **Innholdsvarsler** — et svar i en samtale personen følger, en omtale, eller en annen hendelse rutet gjennom `NotificationHelper.createNotifications()`.
2. **Private meldinger** — en direktemelding går gjennom samme leveringsfunksjon og forsøker alltid push ved siden av socket-levering.
3. **Planlagte påminnelser** — påminnelser om arrangementer, oppgaver og tjeneste, utvidet og sendt av påminnelsesmotoren, som starter nye forekomster direkte på push-nivået.
4. **Push utløst av personale** — `POST /messaging/notifications/create`, `/ping` og `/group/send` for engangs- eller gruppekringkastinger.

## Serverflyt

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ forhåndsvalgsport i appen               ← dempede mottakere stopper her, ingen push
       ├─ samme runde, begge forsøkt (ingen styrer den andre):
       │    ├─ socket-levering via DeliveryHelper  ← hoppes over for påminnelser/kringkastinger (de starter ved push)
       │    └─ forhåndsvalgsport for push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push-biblioteket → VAPID-signert POST → nettleserens push-tjeneste
       └─ forhåndsvalgsport for e-post → tidsstyrt, eskalerer uleste rader separat
```

### Nødvendige miljøvariabler

VAPID-nøklene lagres i `Environment` og må være til stede for at push skal være aktivert:

| Miljøvariabel | `Environment`-innstilling | Beskrivelse |
|----------|----------|----------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID-offentlig nøkkel (base64url). Returneres til klienter via `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID-privat nøkkel. Brukes til å signere hver utgående push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:`-URI rapportert til push-tjenestene. Standard er `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` returnerer `false` når en av nøklene mangler — messaging-modulen fortsetter å fungere, push-leveringer er ganske enkelt no-op. Den mobile B1App-siden forteller da medlemmene at push ikke er slått på, i stedet for å tilby oppsett.

### Generere et VAPID-nøkkelpar

```bash
npx web-push generate-vapid-keys
```

Legg resultatet til i `.env` (lokalt) eller AWS SSM Parameter Store (i distribuerte miljøer). Å rotere nøkler ugyldiggjør hvert eksisterende abonnement — klienter må registrere seg på nytt ved neste sidelasting.

## Lagringsmodell

Web Push-abonnementer lagres i den eksisterende tabellen `devices`, sammen med FCM-enhetsregistreringene. De skilles fra hverandre med et prefiks `webpush:` på kolonnen `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dette gjør at ett kall til `loadByPersonId` returnerer hver enhet en bruker har registrert, uavhengig av plattform. `WebPushHelper.isWebPushToken(token)` og `decodeSubscription(token)` håndterer prefikslogikken.

## Endepunkter

Basisti: `/messaging/webpush`

| Metode | Sti | Autentisering | Beskrivelse |
|--------|------|------|----------|
| GET | `/publicKey` | Offentlig | Returnerer `{ publicKey, enabled }`. Klienter sender `publicKey` til `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registrerer (eller oppdaterer) et abonnement for den autentiserte brukeren. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Offentlig | Sletter enhver enhetsrad der `fcmToken` inneholder det gitte endepunktet. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Sletter en bestemt enhetsrad etter dens server-ID |

## Klientprimitiv: `WebPushHelper`

`WebPushHelper` i `@churchapps/apphelper` er det ene klientsiden inngangspunktet. Verter konfigurerer den én gang ved oppstart og kaller `subscribe()` etter innlogging.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// I appens oppstart (f.eks. _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker-omfang; samsvarer med sw.js-registreringen
  appName: "B1AppPwa"        // lagres på enhetsraden, nyttig for filtrering etter flate
});

// Etter innlogging (og etter hver endring av userChurch)
await WebPushHelper.subscribe();
```

Oppførsler forbrukerne får gratis:

- **Funksjonssjekk** — `isSupported()` returnerer `false` i nettlesere uten `serviceWorker` / `PushManager` / `Notification`.
- **Nedkjøling** — `canPromptNow()` håndhever en nedkjølingsperiode på 7 dager mellom forespørsler via `localStorage`, slik at brukere som avviser operativsystemets forespørsel ikke spørres på nytt i hver økt.
- **Avmelding** — `setOptedOut(true)` og `unsubscribe()` blokkerer ny forespørsel og fjerner enhetsraden på serversiden.
- **Deteksjon av frittstående PWA** — `isStandalone()` lar verter sette iOS-push-forespørsler bak «brukeren har installert PWA-en på hjemskjermen» (iOS tillater push bare fra installerte PWA-er).
- **Ny registrering ved kirkebytte** — `refreshEnrollment()` sender den eksisterende nettleserabonnementet på nytt mot den nye `userChurch` uten å spørre brukeren igjen. Kall den fra behandleren for endring av `userChurch`.

### Krav til service worker {#service-worker-requirement}

`PushManager` i nettleseren løser bare et abonnement når en service worker er registrert på det konfigurerte omfanget. ChurchApps-PWA-er bruker [Serwist](https://serwist.dev/) (Next.js-apper) eller workbox for generering av service worker. Fordi serveren nå alltid forsøker push ved siden av socket-levering (se [Når push utløses](#when-push-fires)), er service workeren deduplikeringspunktet: dens `push`-behandler må undertrykke `showNotification` når en fokusert/synlig klient allerede er på varslets dyplenkemål, men skal alltid oppdatere app-merket uavhengig av om banneret ble vist:

```javascript
// public/sw.js (eller det Serwist/workbox sender ut)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // kjører alltid, selv om banneret undertrykkes

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Samme pathname; for private meldinger, også samme conversationId.
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
    if (exact) return exact.focus(); // allerede på målet: fokuser, ikke naviger

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` er spesifikke for hver forbruker — se `B1App/src/app/sw.ts` for referanseimplementasjonen. B1App ruter `privateMessage` til `/mobile/messages/:personId`, B1Admin ruter `notification` til sitt varselpanel, osv.

## Driftsmerknader

- **Resultater med `gone: true`** — `WebPushHelper.sendBulk` returnerer `{ token, success, gone, errorMessage }` per mottaker. Et resultat med `gone: true` (push-tjenesten svarte `404` eller `410`) betyr at abonnementet er permanent ugyldig; nedstrøms kode i `NotificationHelper` sletter disse enhetsradene slik at de ikke forsøkes igjen.
- **TTL** — push-meldinger sendes med `TTL: 86400` (24 timer). Hvis brukerens nettleser ikke kobler til push-tjenesten innen 24 timer, forkastes pushen.
- **Ingen nye forsøk** — en forbigående feil (timeout, 5xx) logges og prøves ikke på nytt. Push er best-effort; socket i siden og e-postnivået tar seg av holdbarheten.
- **Deaktiverte miljøer** — utviklingsmiljøer kan la VAPID-nøklene stå tomme; `WebPushHelper.isEnabled()` returnerer da `false`, og push kortsluttes. Dette er den tiltenkte oppførselen for miljøer uten sin egen VAPID-identitet.

## Relaterte sider

- [Arkitektur for varsler](./architecture/notifications) — hele trakten for varsling i appen/push/e-post og påminnelsesmotoren
- [Sanntidsarkitektur](./realtime) — WebSocket-levering; push utløses nå fra den samme varseltrakten i appen ved siden av socket-levering i samme runde, ikke bare som en reserve når en socket-levering ikke landet
- [Messaging-endepunkter](./api/endpoints/messaging) — varsler, enheter og resten av messaging-flaten
- [AppHelper](./shared-libraries/app-helper) — npm-pakken som leverer `WebPushHelper`
