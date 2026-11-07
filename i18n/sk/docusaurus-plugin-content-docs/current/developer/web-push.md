---
title: "Webové push notifikácie"
---

# Webové push notifikácie

<div class="article-intro">

Webové aplikácie ChurchApps doručujú push notifikácie cez W3C Web Push API. Je to rovnaký mechanizmus, aký na serverovej strane používa Firebase Cloud Messaging, ale doručovaný cez natívny `PushManager` prehliadača namiesto FCM. Jeden pár kľúčov VAPID na MessagingApi slúži všetkým spotrebiteľom (B1Admin, B1App, budúce PWA).

</div>

## Kedy sa push odošle

Push je jedna úroveň v jedinom doručovacom prechode v rámci `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`). Najprv je brána predvolieb pre aplikáciu, potom sa v rovnakom prechode pokúsi o doručenie cez socket a push (každé s vlastnou bránou predvolieb), nakoniec e-mail. Príjemca, ktorý danú kategóriu stlmil, push nikdy nedostane. Úspešné doručenie cez socket už push nezastaví. Každý typ notifikácie sa teraz správa rovnako ako súkromné správy, takže nainštalovaná PWA bežiaca na pozadí zobrazí systémovú notifikáciu aj vtedy, keď už doručenie cez socket prebehlo. Duplicitné bannery potom potlačí service worker na strane klienta (pozri [Požiadavka na service worker](#service-worker-requirement)). Naplánované pripomienky a broadcasty spúšťané zamestnancami začínajú priamo na úrovni push a krok so socketom úplne preskakujú. E-mail zostáva riadený časovačom a eskaluje neprečítané záznamy podľa vlastného plánu, nie ako súčasť tohto prechodu.

Najčastejšie cesty, ktoré vedú k push:

1. **Obsahové notifikácie** — odpoveď v konverzácii, ktorú osoba sleduje, zmienka alebo iná udalosť smerovaná cez `NotificationHelper.createNotifications()`.
2. **Súkromné správy** — priama správa prechádza tou istou doručovacou funkciou a vždy sa pokúsi o push spolu s doručením cez socket.
3. **Naplánované pripomienky** — pripomienky udalostí, úloh a služieb, ktoré rozvíja a odosiela engine pripomienok. Nové výskyty začínajú priamo na úrovni push.
4. **Push spúšťané zamestnancami** — `POST /messaging/notifications/create`, `/ping` a `/group/send` pre jednorazové alebo skupinové broadcasty.

## Tok na serveri

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

### Požadované premenné prostredia

Kľúče VAPID sa ukladajú v `Environment` a musia byť prítomné, aby bol push povolený:

| Premenná prostredia | Nastavenie `Environment` | Popis |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Verejný kľúč VAPID (base64url). Klientom sa vracia cez `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Súkromný kľúč VAPID. Používa sa na podpisovanie každého odchádzajúceho push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:`, ktoré sa hlási push službám. Predvolená hodnota je `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` vracia `false`, ak chýba ktorýkoľvek z kľúčov. Modul správ ďalej funguje, push doručenia jednoducho nič nerobia. Mobilná stránka B1App potom členom oznámi, že push nie je zapnutý, namiesto ponuky nastavenia.

### Generovanie páru kľúčov VAPID

```bash
npx web-push generate-vapid-keys
```

Výstup pridajte do svojho `.env` (lokálne) alebo do AWS SSM Parameter Store (nasadené). Rotácia kľúčov zneplatní každé existujúce predplatné. Klienti sa musia znova zaregistrovať pri ďalšom načítaní stránky.

## Model ukladania

Predplatné Web Push sa ukladá do existujúcej tabuľky `devices` spolu so záznamami zariadení FCM. Rozlišujú sa prefixom `webpush:` v stĺpci `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Vďaka tomu jedno volanie `loadByPersonId` vráti všetky zariadenia, ktoré si používateľ zaregistroval, bez ohľadu na platformu. `WebPushHelper.isWebPushToken(token)` a `decodeSubscription(token)` spracúvajú logiku prefixu.

## Endpointy

Základná cesta: `/messaging/webpush`

| Metóda | Cesta | Autentifikácia | Popis |
|--------|------|------|-------------|
| GET | `/publicKey` | Verejný | Vracia `{ publicKey, enabled }`. Klienti odovzdajú `publicKey` do `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Zaregistruje (alebo aktualizuje) predplatné pre overeného používateľa. Telo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Verejný | Zmaže každý riadok zariadenia, ktorého `fcmToken` obsahuje zadaný endpoint. Telo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Zmaže konkrétny riadok zariadenia podľa jeho serverového id |

## Klientský primitív: `WebPushHelper`

`WebPushHelper` z `@churchapps/apphelper` je jediný klientský vstupný bod. Hostiteľské aplikácie ho nakonfigurujú raz pri spustení a po prihlásení zavolajú `subscribe()`.

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

Správanie, ktoré spotrebitelia dostanú zadarmo:

- **Kontrola podpory** — `isSupported()` vracia `false` v prehliadačoch bez `serviceWorker` / `PushManager` / `Notification`.
- **Čakacia doba** — `canPromptNow()` vynucuje 7-dňovú čakaciu dobu medzi výzvami cez `localStorage`, aby sa používatelia, ktorí systémovú výzvu odmietli, nepýtali pri každej relácii znova.
- **Odhlásenie** — `setOptedOut(true)` a `unsubscribe()` blokujú opätovné vyzývanie a odstránia riadok zariadenia na strane servera.
- **Detekcia samostatnej PWA** — `isStandalone()` umožňuje hostiteľom obmedziť výzvy na push v iOS na situáciu, keď si používateľ PWA nainštaloval na plochu (iOS povoľuje push len z nainštalovaných PWA).
- **Opätovná registrácia pri zmene kostola** — `refreshEnrollment()` znovu odošle existujúce predplatné prehliadača pre nový `userChurch` bez opätovnej výzvy používateľa. Volajte ho z obslužnej rutiny zmeny `userChurch`.

### Požiadavka na service worker

`PushManager` prehliadača vyrieši predplatné iba vtedy, ak je service worker zaregistrovaný v nakonfigurovanom rozsahu. PWA ChurchApps na generovanie service workera používajú [Serwist](https://serwist.dev/) (aplikácie Next.js) alebo workbox. Keďže server teraz vždy pokúša o push spolu s doručením cez socket (pozri [Kedy sa push odošle](#when-push-fires)), service worker je miestom deduplikácie. Jeho obsluha `push` musí potlačiť `showNotification`, ak je už otvorený a viditeľný klient na cieli hlbokého odkazu notifikácie. Vždy však musí aktualizovať odznak aplikácie bez ohľadu na to, či sa banner zobrazil:

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

`deepLinkFor` a `clientMatchesTarget` sú špecifické pre spotrebiteľa. Referenčnú implementáciu nájdete v `B1App/src/app/sw.ts`. B1App smeruje `privateMessage` na `/mobile/messages/:personId`, B1Admin smeruje `notification` na svoj panel upozornení atď.

## Prevádzkové poznámky

- **Výsledky `gone: true`** — `WebPushHelper.sendBulk` vracia `{ token, success, gone, errorMessage }` pre každého príjemcu. Výsledok `gone: true` (služba push odpovedala `404` alebo `410`) znamená, že predplatné je trvalo neplatné. Nadväzujúci kód v `NotificationHelper` tieto riadky zariadení vymaže, aby sa už neskúšali.
- **TTL** — push správy sa odosielajú s `TTL: 86400` (24 hodín). Ak sa prehliadač používateľa nepripojí k push službe do 24 hodín, push sa zahodí.
- **Žiadne opakovania** — dočasné zlyhanie (časový limit, 5xx) sa zaznamená a neopakuje sa. Push je doručovaný podľa možností. Trvanlivosť zabezpečujú socket na stránke a e-mailová úroveň notifikácií.
- **Vypnuté prostredia** — vývojové prostredia môžu nechať kľúče VAPID prázdne. `WebPushHelper.isEnabled()` vráti `false` a pushe sa okamžite ukončia. Ide o zamýšľané správanie pre prostredia bez vlastnej identity VAPID.

## Súvisiace stránky

- [Architektúra notifikácií](./architecture/notifications) -- Úplný lievik eskalácie v aplikácii, push a e-mail a engine pripomienok
- [Architektúra v reálnom čase](./realtime) -- doručovanie cez WebSocket. Push sa teraz spúšťa z rovnakého lievika v aplikácii spolu s doručením cez socket v tom istom prechode, nielen ako záložné riešenie, keď doručenie cez socket neprebehne
- [Endpointy správ](./api/endpoints/messaging) -- Notifikácie, zariadenia a zvyšok rozhrania správ
- [AppHelper](./shared-libraries/app-helper) -- npm balík, ktorý obsahuje `WebPushHelper`
