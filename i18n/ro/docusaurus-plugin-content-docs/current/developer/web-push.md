---
title: "Notificări push web"
---

# Notificări push web

<div class="article-intro">

Aplicațiile web ChurchApps trimit notificări push prin API-ul Web Push al W3C, același mecanism pe care îl folosește Firebase Cloud Messaging pe partea de server, dar livrat prin `PushManager` nativ al browserului în loc de FCM. O singură pereche de chei VAPID de pe MessagingApi acoperă toți consumatorii (B1Admin, B1App, PWA-urile viitoare).

</div>

## Când se trimit notificările push

Push este un nivel într-o singură etapă de livrare din `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): mai întâi o verificare a preferințelor pentru aplicație, apoi livrarea prin socket și push, încercate în aceeași etapă (fiecare cu propria verificare a preferințelor), apoi e-mail. Un destinatar care a dezactivat categoria nu ajunge niciodată la push. Livrarea prin socket reușită nu mai oprește trimiterea push. Fiecare tip de notificare se comportă acum ca mesajele private, astfel încât o PWA instalată, aflată în fundal, afișează în continuare o notificare la nivelul sistemului de operare, chiar dacă livrarea prin socket a reușit deja. Bannerele duplicate sunt eliminate pe client de service worker (vezi [Cerința pentru service worker](#service-worker-requirement)). Reamintirile programate și transmiterile inițiate de personal pornesc direct de la nivelul push, fără pasul prin socket. E-mailul rămâne controlat de un temporizator, care escaladează rândurile necitite după propriul program, nu ca parte a acestei etape.

Cele mai comune căi care ajung la push:

1. **Notificări de conținut**: un răspuns la o conversație urmărită de persoană, o mențiune sau alt eveniment direcționat prin `NotificationHelper.createNotifications()`.
2. **Mesaje private**: un mesaj direct trece prin aceeași funcție de livrare și încearcă întotdeauna push alături de livrarea prin socket.
3. **Reamintiri programate**: reamintiri pentru evenimente, sarcini și servicii, extinse și trimise de motorul de reamintiri, care pornesc noile apariții direct de la nivelul push.
4. **Push-uri inițiate de personal**: `POST /messaging/notifications/create`, `/ping` și `/group/send`, pentru transmiteri unice sau de grup.

## Fluxul pe server

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ verificarea preferințelor pentru aplicație    ← destinatarii care au dezactivat se opresc aici, fără push
       ├─ în aceeași etapă, ambele sunt încercate (niciuna nu le condiționează pe cealaltă):
       │    ├─ livrare prin socket prin DeliveryHelper  ← omisă pentru reamintiri/transmiteri (pornesc de la push)
       │    └─ verificarea preferințelor pentru push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ biblioteca web-push → POST semnat VAPID → serviciul push al browserului
       └─ verificarea preferințelor pentru e-mail → controlat de temporizator, escaladează separat rândurile necitite
```

### Variabile de mediu necesare

Cheile VAPID sunt stocate în `Environment` și trebuie să fie prezente pentru ca push să fie activat:

| Variabilă de mediu | Setare în `Environment` | Descriere |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Cheia publică VAPID (base64url). Este returnată clienților prin `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Cheia privată VAPID. Este folosită pentru a semna fiecare push trimis |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` raportat serviciilor push. Implicit este `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` returnează `false` dacă lipsește oricare dintre chei. Modulul de mesagerie continuă să funcționeze, iar livrările push nu fac nimic. Site-ul mobil B1App le spune membrilor că notificările push nu sunt activate, în loc să le ofere configurarea.

### Generarea unei perechi de chei VAPID

```bash
npx web-push generate-vapid-keys
```

Adăugați rezultatul în fișierul `.env` (local) sau în AWS SSM Parameter Store (în mediul implementat). Rotirea cheilor invalidează fiecare abonament existent. Clienții trebuie să se înscrie din nou la următoarea încărcare a paginii.

## Modelul de stocare

Abonamentele Web Push sunt stocate în tabela existentă `devices`, alături de înregistrările de dispozitiv FCM. Sunt deosebite printr-un prefix `webpush:` din coloana `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Astfel, un singur apel `loadByPersonId` returnează fiecare dispozitiv înscris de un utilizator, indiferent de platformă. `WebPushHelper.isWebPushToken(token)` și `decodeSubscription(token)` se ocupă de logica prefixului.

## Endpoint-uri

Calea de bază: `/messaging/webpush`

| Metodă | Cale | Autentificare | Descriere |
|--------|------|------|-------------|
| GET | `/publicKey` | Publică | Returnează `{ publicKey, enabled }`. Clienții transmit `publicKey` către `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Înregistrează (sau actualizează) un abonament pentru utilizatorul autentificat. Corpul: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Publică | Șterge orice rând de dispozitiv al cărui `fcmToken` conține endpoint-ul dat. Corpul: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Șterge un rând de dispozitiv specific, după id-ul său de pe server |

## Primitiva de client: `WebPushHelper`

`WebPushHelper` din `@churchapps/apphelper` este unicul punct de intrare pe partea de client. Aplicațiile gazdă îl configurează o singură dată la pornire și apelează `subscribe()` după autentificare.

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

Comportamentele pe care consumatorii le primesc gratuit:

- **Verificarea capabilităților**: `isSupported()` returnează `false` în browserele fără `serviceWorker`, `PushManager` sau `Notification`.
- **Perioada de așteptare**: `canPromptNow()` impune o perioadă de așteptare de 7 zile între solicitări, prin `localStorage`, pentru ca utilizatorii care au închis solicitarea sistemului de operare să nu fie întrebați la fiecare sesiune.
- **Renunțarea**: `setOptedOut(true)` și `unsubscribe()` blochează solicitările repetate și șterg rândul de dispozitiv de pe server.
- **Detectarea PWA în mod standalone**: `isStandalone()` permite aplicațiilor gazdă să condiționeze solicitările push de pe iOS de faptul că utilizatorul a instalat PWA-ul pe ecranul principal (pe iOS, push este permis doar din PWA-urile instalate).
- **Reînscriere la schimbarea bisericii**: `refreshEnrollment()` retrimite abonamentul existent din browser către noul `userChurch`, fără a solicita din nou utilizatorul. Apelați-o din handlerul de schimbare a `userChurch`.

### Cerința pentru service worker

`PushManager` din browser rezolvă un abonament doar dacă există un service worker înregistrat la scope-ul configurat. PWA-urile ChurchApps folosesc [Serwist](https://serwist.dev/) (aplicații Next.js) sau workbox pentru generarea service worker-ului. Deoarece serverul încearcă acum întotdeauna push alături de livrarea prin socket (vezi [Când se trimit notificările push](#when-push-fires)), service worker-ul este punctul de deduplicare. Handlerul său `push` trebuie să suprime `showNotification` atunci când un client focalizat sau vizibil se află deja la ținta de deep link a notificării, dar trebuie să actualizeze întotdeauna insigna aplicației, indiferent dacă bannerul a fost afișat:

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

`deepLinkFor` și `clientMatchesTarget` depind de consumator. Pentru implementarea de referință, vezi `B1App/src/app/sw.ts`. B1App direcționează `privateMessage` către `/mobile/messages/:personId`, iar B1Admin direcționează `notification` către panoul său de alerte etc.

## Note operaționale

- **Rezultate `gone: true`**: `WebPushHelper.sendBulk` returnează `{ token, success, gone, errorMessage }` pentru fiecare destinatar. Un rezultat `gone: true` (serviciul push a răspuns cu `404` sau `410`) înseamnă că abonamentul este invalid permanent. Codul din aval din `NotificationHelper` șterge aceste rânduri de dispozitiv, pentru a nu fi încercate din nou.
- **TTL**: mesajele push sunt trimise cu `TTL: 86400` (24 de ore). Dacă browserul utilizatorului nu se conectează la serviciul push în 24 de ore, push-ul este eliminat.
- **Fără reîncercări**: o eroare temporară (expirare, 5xx) este înregistrată în jurnal și nu este reîncercată. Push funcționează pe principiul celui mai bun efort. Durabilitatea este asigurată de socket-ul din pagină și de nivelul de notificare prin e-mail.
- **Medii dezactivate**: mediile de dezvoltare pot lăsa cheile VAPID goale. `WebPushHelper.isEnabled()` va returna `false`, iar push-urile vor fi scurtcircuitate. Acesta este comportamentul intenționat pentru mediile fără propria identitate VAPID.

## Pagini conexe

- [Arhitectura notificărilor](./architecture/notifications): pâlnia completă de escaladare în aplicație, push și e-mail, și motorul de reamintiri
- [Arhitectura în timp real](./realtime): livrarea prin WebSocket. Push se declanșează acum din aceeași pâlnie din aplicație, alături de livrarea prin socket, în aceeași etapă, nu doar ca rezervă atunci când o livrare prin socket nu reușește
- [Endpoint-uri de mesagerie](./api/endpoints/messaging): notificări, dispozitive și restul suprafeței de mesagerie
- [AppHelper](./shared-libraries/app-helper): pachetul npm care livrează `WebPushHelper`
