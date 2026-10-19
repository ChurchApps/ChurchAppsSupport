---
title: "Web Push-varsler"
---

# Web Push-varsler

<div class="article-intro">

ChurchApps-webapper leverer push-varsler via W3C Web Push API -- den samme mekanismen som Firebase Cloud Messaging bruker på serversiden, men levert gjennom nettleserens innebygde `PushManager` i stedet for FCM. Ett enkelt VAPID-nøkkelpar på MessagingApi dekker alle forbrukere (B1Admin, B1App, fremtidige PWA-er).

</div>

## Når push utløses {#when-push-fires}

Push er ett nivå i en enkelt leveringsrunde inne i `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): først en portvakt for appens innstillinger, deretter socket-levering og push forsøkt i samme runde (hver bak sin egen innstillingsportvakt), og til slutt e-post. En mottaker som har slått av kategorien når aldri push. Vellykket socket-levering stopper ikke lenger push -- alle varseltyper oppfører seg nå slik private meldinger alltid har gjort, slik at en installert PWA som kjører i bakgrunnen fortsatt viser et varsel på operativsystemnivå selv om en socket-levering allerede har nådd fram. Dupliserte bannere undertrykkes i stedet på klientsiden av service workeren (se [Krav til service worker](#service-worker-requirement)). Planlagte påminnelser og kringkastinger initiert av ansatte starter direkte på push-nivået og hopper over socket-steget helt. E-post styres fortsatt av tidtakere, som eskalerer uleste rader etter sin egen plan og ikke som en del av denne runden.

De vanligste veiene som fører til push:

1. **Innholdsvarsler** -- et svar i en samtale personen følger, en omtale, eller en annen hendelse som rutes gjennom `NotificationHelper.createNotifications()`.
2. **Private meldinger** -- en direktemelding går gjennom den samme leveringsfunksjonen og forsøker alltid push sammen med socket-levering.
3. **Planlagte påminnelser** -- påminnelser for arrangementer, oppgaver og tjeneste, utvidet og sendt av påminnelsesmotoren, som starter nye forekomster direkte på push-nivået.
4. **Push initiert av ansatte** -- `POST /messaging/notifications/create`, `/ping` og `/group/send` for engangs- eller gruppekringkastinger.

## Tjenerflyt

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

VAPID-nøklene lagres i `Environment` og må finnes for at push skal være aktivert:

| Variabel | Beskrivelse |
|----------|-------------|
| `webPushPublicKey` | VAPID-offentlig nøkkel (base64url). Sendes til klienter via `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | VAPID-privat nøkkel. Brukes til å signere hver utgående push |
| `webPushSubject` | `mailto:`-URI som rapporteres til push-tjenester. Standard er `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` returnerer `false` når en av nøklene mangler -- messaging-modulen fortsetter å fungere, men push-leveringer gjør ingenting.

### Generere et VAPID-nøkkelpar

```bash
npx web-push generate-vapid-keys
```

Legg resultatet til i `.env` (lokalt) eller AWS SSM Parameter Store (i drift). Å rotere nøklene ugyldiggjør alle eksisterende abonnementer -- klientene må registrere seg på nytt ved neste sidelasting.

## Lagringsmodell

Web Push-abonnementer lagres i den eksisterende tabellen `devices` sammen med FCM-enhetspostene. De skilles med et `webpush:`-prefiks i kolonnen `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dette gjør at ett enkelt kall til `loadByPersonId` returnerer alle enheter en bruker har registrert, uavhengig av plattform. `WebPushHelper.isWebPushToken(token)` og `decodeSubscription(token)` håndterer prefiks-logikken.

## Endepunkter

Basissti: `/messaging/webpush`

| Metode | Sti | Autentisering | Beskrivelse |
|--------|-----|---------------|-------------|
| GET | `/publicKey` | Offentlig | Returnerer `{ publicKey, enabled }`. Klienter sender `publicKey` til `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registrerer (eller oppdaterer) et abonnement for den autentiserte brukeren. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Offentlig | Sletter enhetsposter der `fcmToken` inneholder den oppgitte endepunkten. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Sletter en bestemt enhetspost etter server-side-id |

## Klientprimitiv: `WebPushHelper`

`WebPushHelper` i `@churchapps/apphelper` er det eneste klientsidige inngangspunktet. Vertsapplikasjoner konfigurerer det én gang ved oppstart og kaller `subscribe()` etter innlogging.

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
- **Nedkjøling** -- `canPromptNow()` håndhever 7 dagers nedkjøling mellom forespørsler via `localStorage`, slik at brukere som avviser forespørselen fra operativsystemet ikke spørres på nytt i hver økt.
- **Avmelding** -- `setOptedOut(true)` og `unsubscribe()` blokkerer ny forespørsel og fjerner enhetsposten på serversiden.
- **Gjenkjenning av frittstående PWA** -- `isStandalone()` lar vertene begrense push-forespørsler på iOS til brukere som har installert PWA-en på hjemskjermen (iOS tillater bare push fra installerte PWA-er).
- **Ny registrering ved kirkebytte** -- `refreshEnrollment()` sender det eksisterende nettleserabonnementet på nytt mot den nye `userChurch` uten å spørre brukeren på nytt. Kall den fra behandleren for endring av `userChurch`.

### Krav til service worker {#service-worker-requirement}

`PushManager` i nettleseren løser bare et abonnement når en service worker er registrert i det konfigurerte omfanget. ChurchApps-PWA-er bruker [Serwist](https://serwist.dev/) (Next.js-apper) eller workbox for å generere service workeren. Fordi tjeneren nå alltid forsøker push sammen med socket-levering (se [Når push utløses](#when-push-fires)), er service workeren deduplikeringspunktet: dens `push`-behandler må undertrykke `showNotification` når en fokusert/synlig klient allerede er på varselets dypkoblingsmål, men må alltid oppdatere app-merket uavhengig av om banneret ble vist:

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

`deepLinkFor` / `clientMatchesTarget` er spesifikke for hver forbruker -- se `B1App/src/app/sw.ts` for referanseimplementasjonen. B1App ruter `privateMessage` til `/mobile/messages/:personId`, B1Admin ruter `notification` til varselpanelet sitt, osv.

## Driftsnotater

- **`gone: true`-resultater** -- `WebPushHelper.sendBulk` returnerer `{ token, success, gone, errorMessage }` per mottaker. Et resultat med `gone: true` (push-tjenesten svarte `404` eller `410`) betyr at abonnementet er permanent ugyldig; kode lenger ned i `NotificationHelper` sletter disse enhetspostene slik at de ikke forsøkes igjen.
- **TTL** -- push-meldinger sendes med `TTL: 86400` (24 timer). Hvis brukerens nettleser ikke kobler seg til push-tjenesten innen 24 timer, forkastes push-meldingen.
- **Ingen nytt forsøk** -- en midlertidig feil (tidsavbrudd, 5xx) logges og forsøkes ikke på nytt. Push er etter beste evne; socket-forbindelsen på siden og e-postvarslingsnivået står for holdbarheten.
- **Deaktiverte miljøer** -- utviklingsmiljøer kan la VAPID-nøklene stå tomme; `WebPushHelper.isEnabled()` returnerer da `false`, og push-forsøk avsluttes umiddelbart. Dette er tilsiktet atferd for miljøer uten egen VAPID-identitet.

## Relaterte sider

- [Arkitektur for varsler](./architecture/notifications) -- hele trakten for eskalering i app/push/e-post og påminnelsesmotoren
- [Sanntidsarkitektur](./realtime) -- WebSocket-levering; push utløses nå fra samme varseltrakt sammen med socket-levering i samme runde, ikke bare som reserve når en socket-levering ikke når fram
- [Meldingsendepunkter](./api/endpoints/messaging) -- Varsler, enheter og resten av meldingsflaten
- [AppHelper](./shared-libraries/app-helper) -- npm-pakken som leverer `WebPushHelper`
