---
title: "Web Push-meldingen"
---

# Web Push-meldingen

<div class="article-intro">

ChurchApps-webapps leveren pushmeldingen via de W3C Web Push API. Dit is hetzelfde mechanisme als Firebase Cloud Messaging aan de serverkant gebruikt, maar de meldingen worden afgeleverd via de native `PushManager` van de browser in plaats van via FCM. Eén VAPID-sleutelpaar op de MessagingApi dekt alle consumenten (B1Admin, B1App en toekomstige PWA's).

</div>

## Wanneer een push wordt verstuurd

Push is één laag in één afleverronde binnen `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`). Eerst is er een voorkeurscontrole voor in-app meldingen, daarna worden socketaflevering en push in dezelfde ronde geprobeerd (elk met een eigen voorkeurscontrole), en tot slot volgt e-mail. Een ontvanger die de categorie heeft gedempt, krijgt nooit een push. Het succesvol afleveren via de socket stopt push niet langer. Elk meldingstype werkt nu zoals privéberichten altijd al deden, zodat een geïnstalleerde PWA die op de achtergrond draait toch een melding op systeemniveau toont, ook als de socketaflevering al is gelukt. Dubbele banners worden in plaats daarvan aan de clientkant onderdrukt door de service worker (zie [Vereiste service worker](#service-worker-requirement)). Geplande herinneringen en uitzendingen die door medewerkers worden gestart, beginnen direct bij de pushlaag en slaan de socketstap volledig over. E-mail blijft tijdgestuurd: ongelezen rijen worden volgens een eigen schema opgeschaald, los van deze ronde.

De meest voorkomende paden die bij push uitkomen:

1. **Inhoudsmeldingen**: een reactie op een gesprek dat de persoon volgt, een vermelding of een andere gebeurtenis die via `NotificationHelper.createNotifications()` wordt gerouteerd.
2. **Privéberichten**: een direct bericht gaat via dezelfde afleverfunctie en probeert altijd push naast socketaflevering.
3. **Geplande herinneringen**: herinneringen voor gebeurtenissen, taken en diensten, die door de herinneringsengine worden uitgevouwen en verstuurd. Nieuwe voorvallen beginnen direct bij de pushlaag.
4. **Door medewerkers gestarte pushes**: `POST /messaging/notifications/create`, `/ping` en `/group/send` voor eenmalige of groepsuitzendingen.

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

### Vereiste omgevingsvariabelen

VAPID-sleutels worden opgeslagen in `Environment` en moeten aanwezig zijn om push in te schakelen:

| Omgevingsvariabele | `Environment`-instelling | Beschrijving |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID-publieke sleutel (base64url). Wordt via `GET /messaging/webpush/publicKey` aan clients teruggegeven |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID-privésleutel. Wordt gebruikt om elke uitgaande push te ondertekenen |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:`-URI die aan de pushdiensten wordt gemeld. Standaard `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` geeft `false` terug zodra een van beide sleutels ontbreekt. De messagingmodule blijft dan werken, maar pushaflevering doet niets. De B1App-mobiele site meldt leden dan dat pushmeldingen niet zijn ingeschakeld, in plaats van een installatie aan te bieden.

### Een VAPID-sleutelpaar genereren

```bash
npx web-push generate-vapid-keys
```

Voeg de uitvoer toe aan je `.env` (lokaal) of aan AWS SSM Parameter Store (in productie). Het roteren van sleutels maakt elk bestaand abonnement ongeldig. Clients moeten zich bij het volgende paginabezoek opnieuw aanmelden.

## Opslagmodel

Web Push-abonnementen worden opgeslagen in de bestaande tabel `devices`, naast FCM-apparaatrecords. Ze worden onderscheiden door een `webpush:`-voorvoegsel in de kolom `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Hierdoor geeft één aanroep van `loadByPersonId` elk apparaat terug dat een gebruiker heeft aangemeld, ongeacht het platform. `WebPushHelper.isWebPushToken(token)` en `decodeSubscription(token)` verwerken het voorvoegsel.

## Eindpunten

Basispad: `/messaging/webpush`

| Methode | Pad | Authenticatie | Beschrijving |
|--------|------|------|-------------|
| GET | `/publicKey` | Openbaar | Geeft `{ publicKey, enabled }` terug. Clients geven `publicKey` door aan `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registreert (of werkt bij) een abonnement voor de geauthenticeerde gebruiker. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Openbaar | Verwijdert elke apparaatrij waarvan `fcmToken` het opgegeven endpoint bevat. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Verwijdert een specifieke apparaatrij op basis van het server-side id |

## Client-primitief: `WebPushHelper`

De `WebPushHelper` van `@churchapps/apphelper` is het enige toegangspunt aan de clientkant. Hosts configureren hem één keer bij het opstarten en roepen `subscribe()` aan na het inloggen.

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

Gedrag dat consumenten gratis krijgen:

- **Ondersteuningscontrole**: `isSupported()` geeft `false` terug in browsers zonder `serviceWorker`, `PushManager` of `Notification`.
- **Wachttijd**: `canPromptNow()` houdt via `localStorage` een wachttijd van 7 dagen aan tussen vragen, zodat gebruikers die de systeemvraag wegklikken niet bij elke sessie opnieuw worden gevraagd.
- **Afmelden**: `setOptedOut(true)` en `unsubscribe()` blokkeren opnieuw vragen en verwijderen de apparaatrij op de server.
- **Detectie van zelfstandige PWA**: `isStandalone()` laat hosts iOS-pushvragen afschermen totdat de gebruiker de PWA op het startscherm heeft geïnstalleerd (iOS staat alleen push toe vanuit geïnstalleerde PWA's).
- **Opnieuw aanmelden bij kerkwissel**: `refreshEnrollment()` stuurt het bestaande browserabonnement opnieuw naar de nieuwe `userChurch`, zonder de gebruiker opnieuw te vragen. Roep dit aan vanuit de handler voor wijzigingen van `userChurch`.

### Vereiste service worker

De `PushManager` van de browser levert alleen een abonnement op als er op het geconfigureerde bereik een service worker is geregistreerd. ChurchApps-PWA's gebruiken [Serwist](https://serwist.dev/) (Next.js-apps) of workbox om de service worker te genereren. Omdat de server nu altijd push probeert naast socketaflevering (zie [Wanneer een push wordt verstuurd](#when-push-fires)), is de service worker het punt waar dubbele meldingen worden voorkomen. De `push`-handler moet `showNotification` onderdrukken wanneer een actief of zichtbaar venster al op het deep-linkdoel van de melding staat. De app-badge moet echter altijd worden bijgewerkt, ongeacht of de banner is getoond:

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

`deepLinkFor` en `clientMatchesTarget` zijn consumentspecifiek. Zie `B1App/src/app/sw.ts` voor de referentie-implementatie. B1App routeert `privateMessage` naar `/mobile/messages/:personId`, B1Admin routeert `notification` naar het meldingenpaneel, enzovoort.

## Operationele aantekeningen

- **Resultaten met `gone: true`**: `WebPushHelper.sendBulk` geeft per ontvanger `{ token, success, gone, errorMessage }` terug. Een resultaat met `gone: true` (de pushdienst antwoordde met `404` of `410`) betekent dat het abonnement permanent ongeldig is. Code downstream in `NotificationHelper` verwijdert die apparaatrijen, zodat ze niet opnieuw worden geprobeerd.
- **TTL**: pushberichten worden verstuurd met `TTL: 86400` (24 uur). Als de browser van de gebruiker binnen 24 uur geen verbinding maakt met de pushdienst, vervalt de push.
- **Geen nieuwe pogingen**: een tijdelijke fout (time-out, 5xx) wordt gelogd en niet opnieuw geprobeerd. Push werkt op basis van beste inspanning. Voor de duurzaamheid zorgen de socket in de pagina en de e-mailmelding.
- **Uitgeschakelde omgevingen**: ontwikkelomgevingen mogen de VAPID-sleutels leeg laten. `WebPushHelper.isEnabled()` geeft dan `false` terug en pushes worden direct overgeslagen. Dit is het beoogde gedrag voor omgevingen zonder eigen VAPID-identiteit.

## Gerelateerde pagina's

- [Architectuur van meldingen](./architecture/notifications): de volledige trechter voor in-app-, push- en e-mailescalatie, en de herinneringsengine
- [Realtime-architectuur](./realtime): WebSocket-aflevering. Push wordt nu vanuit dezelfde in-app-trechter afgevuurd, naast socketaflevering in dezelfde ronde, en niet alleen als reserve wanneer een socketaflevering niet slaagt
- [Messaging-eindpunten](./api/endpoints/messaging): meldingen, apparaten en de rest van het messaging-oppervlak
- [AppHelper](./shared-libraries/app-helper): het npm-pakket dat `WebPushHelper` bevat
