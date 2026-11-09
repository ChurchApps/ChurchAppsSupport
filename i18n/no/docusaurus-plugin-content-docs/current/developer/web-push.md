---
title: "Web-pushvarsler"
description: "Sett opp VAPID-nøkler, WebPushHelper-klienten og håndtering av service worker slik at B1.church og B1 Admin kan levere nettleserpushvarsler til medlemmene."
---

# Web-pushvarsler

<div class="article-intro">

ChurchApps-webapper leverer pushvarsler via W3C Web Push API -- samme mekanisme som Firebase Cloud Messaging bruker på serversiden, men levert gjennom nettleserens innebygde `PushManager` i stedet for FCM. Ett VAPID-nøkkelpar på MessagingApi dekker alle klienter (B1Admin, B1App, fremtidige PWA-er).

</div>

## Når push utløses {#when-push-fires}

Push er ett nivå i en enkelt leveringsrunde inne i `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): først en preferansesjekk for appen, deretter socket-levering og push forsøkt i samme runde (hver bak sin egen preferansesjekk), og til slutt e-post. En mottaker som har dempet kategorien, når aldri push. Vellykket socket-levering stopper ikke lenger push -- alle varseltyper oppfører seg nå slik private meldinger alltid har gjort, slik at en installert PWA som kjører i bakgrunnen fortsatt viser et varsel på operativsystemnivå selv når en socket-levering allerede er gjennomført; dupliserte bannere undertrykkes i stedet av service worker på klientsiden (se [Krav til service worker](#service-worker-requirement)). Planlagte påminnelser og kringkastinger fra staben starter direkte på push-nivået og hopper over socket-steget. E-post styres fortsatt av en timer, og eskalerer uleste rader på sin egen plan i stedet for som en del av denne runden.

De vanligste veiene som ender i push:

1. **Innholdsvarsler** -- et svar i en samtale personen følger, en omtale, eller en annen hendelse som sendes via `NotificationHelper.createNotifications()`.
2. **Private meldinger** -- en direktemelding går gjennom samme leveringsfunksjon og forsøker alltid push i tillegg til socket-levering.
3. **Planlagte påminnelser** -- påminnelser for arrangementer, oppgaver og tjeneste, som utvides og sendes av påminnelsesmotoren, som starter nye forekomster direkte på push-nivået.
4. **Pushvarsler fra staben** -- `POST /messaging/notifications/create`, `/ping` og `/group/send` for engangs- eller gruppekringkastinger.
5. **Planlagte pushvarsler fra staben** -- `POST /messaging/scheduledNotifications` lagrer et push for alle med appen (`audience: "church"`) eller én gruppe, og 1-minutters-timeren sender det når det forfaller (se [Arkitektur for varsler](./architecture/notifications.md)). Et kirkedekkende push uten lenke åpner `/mobile/notifications`; et gruppepush uten lenke åpner den gruppen.

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

VAPID-nøklene lagres i `Environment` og må være til stede for at push skal være aktivert:

| Miljøvariabel | `Environment`-innstilling | Beskrivelse |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID-offentlig nøkkel (base64url). Returneres til klienter via `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID-privat nøkkel. Brukes til å signere hvert utgående push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:`-URI som rapporteres til pushtjenestene. Standard er `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` returnerer `false` når en av nøklene mangler -- meldingsmodulen fortsetter å fungere, men push-leveringer gjør ingenting. B1App-nettstedet for mobil forteller da medlemmene at push ikke er slått på, i stedet for å tilby oppsett.

### Generere et VAPID-nøkkelpar

```bash
npx web-push generate-vapid-keys
```

Legg resultatet i `.env` (lokalt) eller AWS SSM Parameter Store (i drift). Ved rotasjon av nøkler blir alle eksisterende abonnementer ugyldige -- klientene må registrere seg på nytt ved neste sidelasting.

## Lagringsmodell

Web Push-abonnementer lagres i den eksisterende `devices`-tabellen sammen med FCM-enhetsposter. De skilles ved et `webpush:`-prefiks på `fcmToken`-kolonnen:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dette gjør at ett `loadByPersonId`-kall returnerer alle enheter en bruker har registrert, uavhengig av plattform. `WebPushHelper.isWebPushToken(token)` og `decodeSubscription(token)` håndterer prefiks-logikken.

## Endepunkter

Basisbane: `/messaging/webpush`

| Metode | Bane | Autentisering | Beskrivelse |
|--------|------|------|-------------|
| GET | `/publicKey` | Offentlig | Returnerer `{ publicKey, enabled }`. Klienter sender `publicKey` til `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registrerer (eller oppdaterer) et abonnement for den innloggede brukeren. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Offentlig | Sletter enhetsposter der `fcmToken` inneholder det oppgitte endepunktet. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Sletter en bestemt enhetspost etter dens server-ID |

## Klientprimitiv: `WebPushHelper`

`@churchapps/apphelper`s `WebPushHelper` er det eneste inngangspunktet på klientsiden. Verter konfigurerer den én gang ved oppstart og kaller `subscribe()` etter innlogging.

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

Atferd forbrukerne får gratis:

- **Funksjonssjekk** -- `isSupported()` returnerer `false` i nettlesere uten `serviceWorker` / `PushManager` / `Notification`.
- **Nedkjøling** -- `canPromptNow()` håndhever en nedkjøling på 7 dager mellom forespørsler via `localStorage`, slik at brukere som avviser systemforespørselen ikke spørres igjen ved hver økt.
- **Avmelding** -- `setOptedOut(true)` og `unsubscribe()` hindrer ny forespørsel og fjerner enhetsposten på serveren.
- **Deteksjon av frittstående PWA** -- `isStandalone()` lar verter låse iOS-pushforespørsler bak "brukeren har installert PWA-en på startskjermen" (iOS tillater bare push fra installerte PWA-er).
- **Ny registrering ved bytte av menighet** -- `refreshEnrollment()` sender det eksisterende nettleserabonnementet på nytt mot den nye `userChurch` uten å spørre brukeren igjen. Kall det fra behandleren for endring av `userChurch`.

### Krav til service worker {#service-worker-requirement}

`PushManager` i nettleseren løser bare et abonnement når en service worker er registrert på den konfigurerte scopen. ChurchApps-PWA-er bruker [Serwist](https://serwist.dev/) (Next.js-apper) eller workbox for å generere service worker. Fordi serveren nå alltid forsøker push ved siden av socket-levering (se [Når push utløses](#when-push-fires)), er service worker det stedet duplikater fjernes: `push`-behandleren må undertrykke `showNotification` når et fokusert/synlig klientvindu allerede står på varselets dyplenkemål, men skal alltid oppdatere app-merket uansett om banneret vises:

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

`deepLinkFor` / `clientMatchesTarget` er spesifikke for hver forbruker -- se `B1App/src/app/sw.ts` for referanseimplementasjonen. B1App sender `privateMessage` til `/mobile/messages/:personId`, B1Admin sender `notification` til varselpanelet sitt, osv.

## Driftsnotater

- **`gone: true`-resultater** -- `WebPushHelper.sendBulk` returnerer `{ token, success, gone, errorMessage }` per mottaker. Et resultat med `gone: true` (pushtjenesten svarte `404` eller `410`) betyr at abonnementet er varig ugyldig; kode lenger ned i `NotificationHelper` sletter disse enhetsradene slik at de ikke forsøkes igjen.
- **TTL** -- pushmeldinger sendes med `TTL: 86400` (24 timer). Hvis nettleserens bruker ikke kobler seg til pushtjenesten innen 24 timer, kastes pushet.
- **Ingen forsøk på nytt** -- en forbigående feil (tidsavbrudd, 5xx) logges og forsøkes ikke igjen. Push er etter beste evne; sanntids-socket og e-postnivået står for holdbarheten.
- **Deaktiverte miljøer** -- utviklingsmiljøer kan la VAPID-nøklene stå tomme; `WebPushHelper.isEnabled()` returnerer da `false`, og pushes avsluttes med en gang. Dette er den tiltenkte oppførselen for miljøer uten egen VAPID-identitet.

## Relaterte sider

- [Arkitektur for varsler](./architecture/notifications.md) -- hele eskaleringen i appen/push/e-post og påminnelsesmotoren
- [Sanntidsarkitektur](./realtime.md) -- WebSocket-levering; push utløses nå fra samme varselrunde i appen, ved siden av socket-levering i samme runde, ikke bare som reserve når en socket-levering ikke går gjennom
- [Meldings-endepunkter](./api/endpoints/messaging.md) -- varsler, enheter og resten av meldingsflaten
- [AppHelper](./shared-libraries/app-helper.md) -- npm-pakken som leverer `WebPushHelper`
