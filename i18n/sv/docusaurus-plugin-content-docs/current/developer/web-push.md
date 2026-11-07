---
title: "Webbpush-notiser"
---

# Webbpush-notiser

<div class="article-intro">

ChurchApps webbappar skickar push-notiser via W3C:s Web Push API. Det är samma mekanism som Firebase Cloud Messaging använder på serversidan, men levereras via webbläsarens inbyggda `PushManager` i stället för FCM. Ett enda VAPID-nyckelpar på MessagingApi täcker alla konsumenter (B1Admin, B1App och framtida PWA:er).

</div>

## När push skickas

Push är en nivå i en enda leveranskedja inne i `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`). Först kontrolleras inställningen för aviseringar i appen. Därefter görs socketleverans och push i samma omgång, där var och en har sin egen inställningskontroll, och sist skickas e-post. En mottagare som har tystat kategorin når aldrig push. Att socketleveransen lyckas stoppar inte längre push. Alla aviseringstyper beter sig nu som privata meddelanden alltid har gjort, så en installerad PWA i bakgrunden visar fortfarande en systemavisering även när socketleveransen redan har nått fram. Dubbla bannrar undertrycks i stället på klientsidan av service workern (se [Krav på service worker](#service-worker-requirement)). Schemalagda påminnelser och utskick från personal startar direkt på push-nivån och hoppar helt över socketsteget. E-post styrs fortfarande av en timer som eskalerar olästa rader enligt sitt eget schema, och ingår inte i denna omgång.

De vanligaste vägarna som når push:

1. **Innehållsaviseringar**: ett svar i en konversation som personen följer, en omnämning eller någon annan händelse som skickas via `NotificationHelper.createNotifications()`.
2. **Privata meddelanden**: ett direktmeddelande går genom samma leveransfunktion och försöker alltid push tillsammans med socketleverans.
3. **Schemalagda påminnelser**: påminnelser om händelser, uppgifter och tjänstgöring som expanderas och skickas av påminnelsemotorn, som startar nya förekomster direkt på push-nivån.
4. **Push från personal**: `POST /messaging/notifications/create`, `/ping` och `/group/send` för engångsutskick eller grupputskick.

## Serverflöde

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

### Obligatoriska miljövariabler

VAPID-nycklarna lagras i `Environment` och måste finnas för att push ska vara aktiverat:

| Miljövariabel | `Environment`-inställning | Beskrivning |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID-publik nyckel (base64url). Returneras till klienter via `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID-privat nyckel. Används för att signera varje utgående push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:`-URI som rapporteras till push-tjänsterna. Standardvärdet är `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` returnerar `false` när någon av nycklarna saknas. Meddelandemodulen fortsätter att fungera, men push-leveranser görs helt enkelt inte. Mobilsidan B1App informerar då medlemmarna om att push inte är aktiverat i stället för att erbjuda installation.

### Generera ett VAPID-nyckelpar

```bash
npx web-push generate-vapid-keys
```

Lägg till utdata i din `.env` (lokalt) eller i AWS SSM Parameter Store (driftsatt). Om nycklarna byts ut blir alla befintliga prenumerationer ogiltiga, och klienterna måste registrera sig på nytt vid nästa sidinläsning.

## Lagringsmodell

Web Push-prenumerationer lagras i den befintliga tabellen `devices` tillsammans med FCM-enhetsposter. De särskiljs med prefixet `webpush:` i kolumnen `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Detta gör att ett enda anrop till `loadByPersonId` returnerar alla enheter en användare har registrerat, oavsett plattform. `WebPushHelper.isWebPushToken(token)` och `decodeSubscription(token)` hanterar prefixlogiken.

## Slutpunkter

Basväg: `/messaging/webpush`

| Metod | Sökväg | Autentisering | Beskrivning |
|--------|------|------|-------------|
| GET | `/publicKey` | Offentlig | Returnerar `{ publicKey, enabled }`. Klienter skickar `publicKey` till `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Registrerar (eller uppdaterar) en prenumeration för den autentiserade användaren. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Offentlig | Tar bort alla enhetsposter vars `fcmToken` innehåller den angivna endpointen. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Tar bort en specifik enhetspost via dess id på servern |

## Klientprimitiv: `WebPushHelper`

`WebPushHelper` i `@churchapps/apphelper` är den enda ingångspunkten på klientsidan. Värdappar konfigurerar den en gång vid start och anropar `subscribe()` efter inloggning.

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

Dessa beteenden får konsumenterna utan extra arbete:

- **Funktionsstöd**: `isSupported()` returnerar `false` i webbläsare utan `serviceWorker`, `PushManager` eller `Notification`.
- **Viloperiod**: `canPromptNow()` upprätthåller en viloperiod på 7 dagar mellan förfrågningar via `localStorage`, så att användare som avvisar systemets dialogruta inte tillfrågas igen vid varje session.
- **Avregistrering**: `setOptedOut(true)` och `unsubscribe()` blockerar nya förfrågningar och tar bort enhetsposten på servern.
- **Identifiering av installerad PWA**: `isStandalone()` låter värdappar villkora iOS-push-förfrågningar till att användaren har installerat PWA:n på hemskärmen. iOS tillåter bara push från installerade PWA:er.
- **Ny registrering vid kyrkbyte**: `refreshEnrollment()` skickar om den befintliga webbläsarprenumerationen mot den nya `userChurch` utan att fråga användaren igen. Anropa den från hanteraren för ändring av `userChurch`.

### Krav på service worker

`PushManager` i webbläsaren löser bara upp en prenumeration när en service worker är registrerad på den konfigurerade scopen. ChurchApps PWA:er använder [Serwist](https://serwist.dev/) (Next.js-appar) eller workbox för att generera service workern. Eftersom servern nu alltid försöker push tillsammans med socketleverans (se [När push skickas](#when-push-fires)) är service workern den punkt där dubbletter undviks. Dess `push`-hanterare måste undertrycka `showNotification` när en fokuserad eller synlig klient redan visar aviseringens djuplänksmål, men den ska alltid uppdatera appens märke oavsett om bannern visades:

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

`deepLinkFor` och `clientMatchesTarget` är konsumentspecifika. Se `B1App/src/app/sw.ts` för referensimplementationen. B1App dirigerar `privateMessage` till `/mobile/messages/:personId`, och B1Admin dirigerar `notification` till sitt aviseringspanel, med mera.

## Driftsanteckningar

- **Resultat med `gone: true`**: `WebPushHelper.sendBulk` returnerar `{ token, success, gone, errorMessage }` per mottagare. Ett resultat med `gone: true` (push-tjänsten svarade `404` eller `410`) betyder att prenumerationen är permanent ogiltig. Kod i `NotificationHelper` tar bort dessa enhetsposter så att de inte provas igen.
- **TTL**: push-meddelanden skickas med `TTL: 86400` (24 timmar). Om användarens webbläsare inte ansluter till push-tjänsten inom 24 timmar kasseras pushen.
- **Inga återförsök**: ett tillfälligt fel (timeout, 5xx) loggas men görs inte om. Push är bästa möjliga leverans. Socketen i sidan och e-postnivån står för hållbarheten.
- **Inaktiverade miljöer**: utvecklingsmiljöer kan lämna VAPID-nycklarna tomma. `WebPushHelper.isEnabled()` returnerar då `false` och pushar kortsluts. Detta är avsett beteende för miljöer utan egen VAPID-identitet.

## Relaterade sidor

- [Arkitektur för aviseringar](./architecture/notifications): hela tratten för eskalering via appen, push och e-post, samt påminnelsemotorn
- [Realtidsarkitektur](./realtime): WebSocket-leverans. Push startar nu från samma tratt i appen tillsammans med socketleverans i samma omgång, inte bara som reserv när en socketleverans inte når fram
- [Meddelandeslutpunkter](./api/endpoints/messaging): aviseringar, enheter och resten av meddelandeytan
- [AppHelper](./shared-libraries/app-helper): npm-paketet som levererar `WebPushHelper`
