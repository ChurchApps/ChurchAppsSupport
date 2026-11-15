---
title: "Web Push-varsler"
description: "Sett opp VAPID-nøkler, WebPushHelper-klienten og håndtering av service worker, slik at B1.church og B1 Admin kan levere nettleserbaserte push-varsler til medlemmer."
---

# Web Push-varsler

<div class="article-intro">

ChurchApps-webappene leverer push-varsler via W3C Web Push API -- den samme mekanismen som Firebase Cloud Messaging bruker på serversiden, men levert gjennom nettleserens innebygde `PushManager` i stedet for FCM. Ett enkelt VAPID-nøkkelpar på MessagingApi dekker alle forbrukere (B1Admin, B1App, fremtidige PWA-er).

</div>

## Når push utløses {#when-push-fires}

Push er ett nivå i en enkelt leveringsrunde inne i `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): først en preferansesjekk for innen-appen, deretter socket-levering og push forsøkt i samme runde (hver bak sin egen preferansesjekk), og til slutt e-post. En mottaker som har dempet kategorien når aldri push. At socket-levering lykkes, stopper ikke lenger push. Hver varseltype oppfører seg nå slik private meldinger alltid har gjort, slik at en installert PWA som kjører i bakgrunnen fortsatt viser et varsel på OS-nivå, selv om en socket-levering allerede har nådd fram. Dupliserte bannere undertrykkes i stedet på klientsiden av service worker (se [Krav til service worker](#service-worker-requirement)). Planlagte påminnelser og sendinger startet av ansatte begynner direkte på push-nivået og hopper over socket-steget. E-post styres fortsatt av timer, og eskalerer uleste rader etter sin egen plan i stedet for som en del av denne runden.

De vanligste veiene som fører til push:

1. **Innholdsvarsler** -- et svar i en samtale personen følger, en omtale, eller en annen hendelse som rutes via `NotificationHelper.createNotifications()`.
2. **Private meldinger** -- en direktemelding går gjennom samme leveringsfunksjon og forsøker alltid push i tillegg til socket-levering.
3. **Planlagte påminnelser** -- arrangements-, oppgave- og tjenestepåminnelser som ekspanderes og sendes av påminnelsesmotoren, som starter nye forekomster direkte på push-nivået.
4. **Push startet av ansatte** -- `POST /messaging/notifications/create`, `/ping` og `/group/send` for engangs- eller gruppesendinger.
5. **Planlagte push-varsler fra ansatte** -- `POST /messaging/scheduledNotifications` lagrer et push-varsel for alle med appen (`audience: "church"`) eller for én gruppe, og 1-minuttstimeren sender det når tiden er inne (se [Arkitektur for varsler](./architecture/notifications.md)). Et menighetsomfattende push uten lenke åpner `/mobile/notifications`. Et gruppepush uten lenke åpner den gruppen.

## Tjenerflyt {#server-flow}

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

### Nødvendige miljøvariabler {#required-environment-variables}

VAPID-nøklene lagres i `Environment` og må finnes for at push skal være aktivert:

| Miljøvariabel | Innstilling i `Environment` | Beskrivelse |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID-offentlig nøkkel (base64url). Sendes til klientene via `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID-privat nøkkel. Brukes til å signere hver utgående push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:`-URI som rapporteres til push-tjenestene. Standard er `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` returnerer `false` når en av nøklene mangler. Meldingsmodulen fungerer fortsatt, men push-leveranser gjør ingenting. Nettstedet for B1App forteller da medlemmene at push ikke er slått på, i stedet for å tilby oppsett.

### Generere et VAPID-nøkkelpar {#generating-a-vapid-key-pair}

```bash
npx web-push generate-vapid-keys
```

Legg utdataene i `.env` (lokalt) eller i AWS SSM Parameter Store (i drift). Å rotere nøklene ugyldiggjør alle eksisterende abonnementer, og klientene må registrere seg på nytt ved neste sidelasting.

## Lagringsmodell {#storage-model}

Web Push-abonnementer lagres i den eksisterende tabellen `devices` sammen med FCM-enhetsposter. De skilles fra hverandre med et prefiks `webpush:` på kolonnen `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dette gjør at ett kall til `loadByPersonId` returnerer alle enheter en bruker har registrert, uavhengig av plattform. `WebPushHelper.isWebPushToken(token)` og `decodeSubscription(token)` håndterer prefikslogikken.

## Endepunkter {#endpoints}

Basisbane: `/messaging/webpush`

| Metode | Sti | Autentisering | Beskrivelse |
|--------|------|---------|-------------|
| GET | `/publicKey` | Offentlig | Returnerer `{ publicKey, enabled }`. Klientene sender `publicKey` til `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registrerer (eller oppdaterer) et abonnement for den innloggede brukeren. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Offentlig | Sletter enhetsposter der `fcmToken` inneholder det gitte endepunktet. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Sletter én bestemt enhetspost etter dens id på serveren |

## Klientprimitiv: `WebPushHelper` {#client-primitive-webpushhelper}

`WebPushHelper` i `@churchapps/apphelper` er det ene inngangspunktet på klientsiden. Vertsappene konfigurerer den én gang ved oppstart, og kaller `subscribe()` etter innlogging.

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

Dette får forbrukerne gratis:

- **Funksjonssjekk** -- `isSupported()` returnerer `false` i nettlesere uten `serviceWorker` / `PushManager` / `Notification`.
- **Nedkjølingsperiode** -- `canPromptNow()` håndhever 7 dager mellom forespørsler, via `localStorage`, slik at brukere som avviser OS-forespørselen ikke spørres igjen ved hver økt.
- **Avmelding** -- `setOptedOut(true)` og `unsubscribe()` blokkerer ny forespørsel og fjerner enhetsposten på serveren.
- **Oppdagelse av frittstående PWA** -- `isStandalone()` lar vertene skjule iOS-forespørsler om push bak «brukeren har installert PWA-en på startskjermen» (iOS tillater bare push fra installerte PWA-er).
- **Ny registrering ved bytte av menighet** -- `refreshEnrollment()` sender det eksisterende nettleserabonnementet på nytt mot den nye `userChurch` uten å spørre brukeren igjen. Kall den fra behandleren for endring av `userChurch`.

### Krav til service worker {#service-worker-requirement}

`PushManager` i nettleseren løser bare et abonnement når en service worker er registrert på den konfigurerte scopen. ChurchApps-PWA-ene bruker [Serwist](https://serwist.dev/) (Next.js-apper) eller workbox til å generere service worker. Siden serveren nå alltid forsøker push i tillegg til socket-levering (se [Når push utløses](#when-push-fires)), er service worker punktet for deduplisering. Dens `push`-behandler må undertrykke `showNotification` når en fokusert eller synlig klient allerede står på varslets dyplenkemål, men må alltid oppdatere app-merket, uansett om banneret vises:

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

`deepLinkFor` og `clientMatchesTarget` er spesifikke for den enkelte forbrukeren. Se `B1App/src/app/sw.ts` for referanseimplementasjonen. B1App sender `privateMessage` til `/mobile/messages/:personId`, B1Admin sender `notification` til varselpanelet sitt, osv.

## Driftsnotater {#operational-notes}

- **Resultater med `gone: true`** -- `WebPushHelper.sendBulk` returnerer `{ token, success, gone, errorMessage }` for hver mottaker. Et resultat med `gone: true` (push-tjenesten svarte `404` eller `410`) betyr at abonnementet er permanent ugyldig. Kode nedstrøms i `NotificationHelper` sletter disse enhetspostene, slik at de ikke forsøkes igjen.
- **TTL** -- push-meldinger sendes med `TTL: 86400` (24 timer). Hvis brukerens nettleser ikke kobler seg til push-tjenesten innen 24 timer, droppes pushen.
- **Ingen nye forsøk** -- en midlertidig feil (timeout, 5xx) logges og forsøkes ikke på nytt. Push er etter beste innsats. Socket-laget i siden og e-postnivået står for holdbarheten.
- **Deaktiverte miljøer** -- utviklingsmiljøer kan la VAPID-nøklene stå tomme. `WebPushHelper.isEnabled()` returnerer da `false`, og push-forsøk avsluttes med en gang. Dette er tilsiktet oppførsel for miljøer uten egen VAPID-identitet.

## Relaterte sider {#related-pages}

- [Arkitektur for varsler](./architecture/notifications.md) -- hele eskaleringstrakten for innen-appen, push og e-post, og påminnelsesmotoren
- [Sanntidsarkitektur](./realtime.md) -- WebSocket-levering. Push utløses nå fra samme trakt innen-appen, sammen med socket-levering i samme runde, og ikke bare som reserve når en socket-levering ikke når fram
- [Endepunkter for meldinger](./api/endpoints/messaging.md) -- varsler, enheter og resten av meldingsflaten
- [AppHelper](./shared-libraries/app-helper.md) -- npm-pakken som leveres med `WebPushHelper`
