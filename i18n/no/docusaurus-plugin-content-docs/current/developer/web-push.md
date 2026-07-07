---
title: "Nettleser-push-varslinger"
---

# Nettleser-push-varslinger

<div class="article-intro">

ChurchApps nettapper leverer push-varslinger via W3C Web Push API — samme mekanisme som Firebase Cloud Messaging på serversiden, men levert gjennom nettleserens native `PushManager` i stedet for FCM. Et enkelt VAPID-nøkkelpari på MessagingApi dekker alle konsumenter (B1Admin, B1App, fremtidige PWAer).

</div>

## Når push utløses

Push er ett nivå i ett enkelt leveringspass inne i `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): en app-intern preferanseport, deretter socket-levering og push forsøkt i samme pass (hver bak sin egen preferanseport), deretter e-post. En mottaker som har slått av kategorien når aldri push. Socket-levering som lykkes stopper ikke lenger push — hver varslingstype oppfører seg nå på samme måte som private meldinger alltid har gjort, så en installert PWA som sitter i bakgrunnen vil fortsatt vise en OS-varsling selv når en socket-levering allerede har kommet fram; dupliserte bannere undertrykkes på klientsiden av tjenesteworkeren i stedet (se [Krav til tjenesteworker](#service-worker-requirement)). Planlagte påminnelser og stab-utløste sendinger starter direkte ved push-nivået, og hopper over socket-trinnet helt. E-post forblir timer-drevet, eskalerer ulesne rader etter sitt eget skjema i stedet for som del av dette passet.

De vanligste stiene som når push:

1. **Innholdsvarslinger** — et svar på en samtale personen følger, en omtale, eller en annen hendelse rouet gjennom `NotificationHelper.createNotifications()`.
2. **Private meldinger** — en direktemelding går gjennom samme leveringsfunksjon og forsøker alltid push ved siden av socket-levering.
3. **Planlagte påminnelser** — hendelse, oppgave og serveringsvarslinger utvidet og sendt av påminningsenginen, som starter nye forekomster direkte ved push-nivået.
4. **Stab-utløste push** — `POST /messaging/notifications/create`, `/ping`, og `/group/send` for engangs- eller gruppesendinger.

## Serverflyt

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ app-intern preferanseport                  ← stille mottakere stopper her, ingen push
       ├─ samme pass, begge forsøkt (ingen portene gir hver andre):
       │    ├─ socket-levering via DeliveryHelper  ← hoppet over for påminnelser/sendinger (de starter ved push)
       │    └─ push-preferanseport
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push-bibliotek → VAPID-signert POST → nettleser-pushtjeneste
       └─ e-post-preferanseport → timer-drevet, eskalerer ulesne rader separat
```

### Påkrevde miljøvariabler

VAPID-nøkler lagres i `Environment` og må være tilstede for at push skal være aktivert:

| Variabel | Beskrivelse |
|----------|-------------|
| `webPushPublicKey` | VAPID offentlig nøkkel (base64url). Returnert til klienter via `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | VAPID privat nøkkel. Brukt til å signere hver utgående push |
| `webPushSubject` | `mailto:` URI rapportert til pushtjenester. Standarverdi til `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` returnerer `false` når begge nøkler mangler — meldingsmodulen fortsetter å operere, push-leveringer gjør rett og slett ingenting.

### Generering av VAPID-nøkkelpari

```bash
npx web-push generate-vapid-keys
```

Legg utdataene til `.env`-filen din (lokal) eller AWS SSM Parameter Store (distribuert). Rotasjon av nøkler gjør alle eksisterende abonnementer ugyldige — klienter må re-påmelding ved neste sidelasting.

## Lagringsmodell

Web Push-abonnementer lagres i den eksisterende `devices`-tabellen ved siden av FCM-enhetsposter. De skilles med et `webpush:`-prefiks på `fcmToken`-kolonnen:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dette lar ett enkelt `loadByPersonId`-kall returnere hver enhet en bruker har påmeldt seg, uavhengig av plattform. `WebPushHelper.isWebPushToken(token)` og `decodeSubscription(token)` håndterer prefikslogikken.

## Endepunkter

Basisbane: `/messaging/webpush`

| Metode | Bane | Auth | Beskrivelse |
|--------|------|------|-------------|
| GET | `/publicKey` | Offentlig | Returnerer `{ publicKey, enabled }`. Klienter sender `publicKey` til `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registrerer (eller oppdaterer) et abonnement for den godkjente brukeren. Kropp: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Offentlig | Sletter enhetsrader hvis `fcmToken` inneholder det gitte endepunktet. Kropp: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Sletter en spesifikk enhetsrad etter serverens id |

## Klientprimitiv: `WebPushHelper`

`@churchapps/apphelper`'s `WebPushHelper` er det enkelte oppstartssted på klientsiden. Verter konfigurerer det en gang ved oppstart og kaller `subscribe()` etter innlogging.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// I appens bootstrap (f.eks. _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // tjenesteworker-omfang; samsvarer med sw.js-registrering
  appName: "B1AppPwa"        // lagret på enhetsraden, nyttig for filtrering etter flate
});

// Etter innlogging (og etter hver userChurch-endring)
await WebPushHelper.subscribe();
```

Atferd som konsumenter får gratis:

- **Evnesjekk** — `isSupported()` returnerer `false` på nettlesere uten `serviceWorker` / `PushManager` / `Notification`.
- **Avkjølingstid** — `canPromptNow()` håndhever en 7-dagers avkjølingstid mellom meldinger via `localStorage` slik at brukere som avviser OS-meldingen ikke blir spurt igjen i hver økt.
- **Fravelg** — `setOptedOut(true)` og `unsubscribe()` blokkerer re-meldinger og fjerner serverens enhetsrad.
- **Frittstående-PWA-deteksjon** — `isStandalone()` lar verter portere iOS push-meldinger bak "bruker har installert PWAen på hjemmeskjermen" (iOS tillater kun push fra installerte PWAer).
- **Re-påmelding ved kirkebytte** — `refreshEnrollment()` omposterer det eksisterende nettleserabonnementet mot den nye `userChurch` uten å be brukeren om igjen. Kall det fra `userChurch`-endringsbehandleren.

### Krav til tjenesteworker

Nettleserens `PushManager` oppløser kun et abonnement når en tjenesteworker er registrert ved det konfigurerte omfanget. ChurchApps PWAer bruker [Serwist](https://serwist.dev/) (Next.js-apper) eller workbox for tjenesteworker-generering. Fordi serveren nå alltid forsøker push sammen med socket-levering (se [Når push utløses](#when-push-fires)), er tjenesteworkeren deduplikasjspunktet: dens `push`-behandler må undertrykke `showNotification` når en fokusert/synlig klient allerede er på varsingens dyplinknål, men bør alltid oppdatere appens merke uavhengig av om banneret ble vist:

```javascript
// public/sw.js (eller hva Serwist/workbox sender)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // kjøres alltid, selv om banneret undertrykkes

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Samme bane; for private meldinger, også samme conversationId.
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

`deepLinkFor` / `clientMatchesTarget` er konsumentspesifikke — se `B1App/src/app/sw.ts` for referanseimplementeringen. B1App ruter `privateMessage` til `/mobile/messages/:personId`, B1Admin ruter `notification` til dens varslerpanel, osv.

## Driftsmerknad

- **`gone: true`-resultater** — `WebPushHelper.sendBulk` returnerer `{ token, success, gone, errorMessage }` per mottaker. Et `gone: true`-resultat (pushtjeneste svarte `404` eller `410`) betyr at abonnementet er permanent ugyldig; nedstrøms-kode i `NotificationHelper` sletter disse enhetradene slik at de ikke prøves igjen.
- **TTL** — push-meldinger sendes med `TTL: 86400` (24 timer). Hvis brukerens nettleser ikke kobler til pushtjenesten innen 24 timer, blir pushen droppet.
- **Ingen omdeling** — et forbigående feil (timeout, 5xx) blir loggert og prøvd ikke igjen. Push er best-effort; appen på siden og varslingstrinnet for e-post håndterer holdbarhetshistorikken.
- **Deaktiverte miljøer** — oppstillings- og dev-miljøer kan la VAPID-nøklene være tomme; `WebPushHelper.isEnabled()` returnerer `false` og pushes vil ta kortslutning. Dette er den tiltenkte atferden for miljøer uten egen VAPID-identitet.

## Relaterte sider

- [Varslingsarkitektur](./architecture/notifications) -- Den fulle app-intern/push/e-post-eskalerings-trakt og påminningsenginen
- [Sanntidsarkitektur](./realtime) -- WebSocket-levering; push utløses nå fra samme app-intern trakt sammen med socket-levering i samme pass, ikke bare som en fallback når en socket-levering ikke kommer fram
- [Meldingsendepunkter](./api/endpoints/messaging) -- Varslinger, enheter og resten av meldingsflaten
- [AppHelper](./shared-libraries/app-helper) -- npm-pakken som leverer `WebPushHelper`
