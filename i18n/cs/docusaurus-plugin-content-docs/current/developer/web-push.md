---
title: "Web Push oznámení"
description: "Nastavení klíčů VAPID, klienta WebPushHelper a obsluhy service workeru, aby B1.church a B1 Admin mohly členům doručovat push oznámení v prohlížeči."
---

# Web Push oznámení

<div class="article-intro">

Webové aplikace ChurchApps doručují push oznámení prostřednictvím W3C Web Push API. Je to stejný mechanismus, jaký na straně serveru používá Firebase Cloud Messaging, ale doručuje se nativním rozhraním prohlížeče `PushManager` místo FCM. Jediný pár klíčů VAPID na MessagingApi slouží všem klientům (B1Admin, B1App a budoucím PWA).

</div>

## Kdy se push odesílá

Push je jednou úrovní v jediném průchodu doručování uvnitř `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`). Nejprve se uplatní brána předvoleb v aplikaci. Poté se ve stejném průchodu pokusí o doručení přes socket a push, každé s vlastní bránou předvoleb. Nakonec přijde e-mail. Příjemce, který kategorii ztlumil, push nikdy nedostane. Úspěšné doručení přes socket už push nezastaví. Každý typ oznámení se nyní chová stejně jako soukromé zprávy, takže nainstalovaná PWA běžící na pozadí zobrazí systémové oznámení i tehdy, když doručení přes socket již proběhlo. Duplicitní bannery potlačí na straně klienta service worker (viz [Požadavek na service worker](#service-worker-requirement)). Naplánovaná připomenutí a hromadná oznámení odeslaná personálem začínají přímo na úrovni push a krok se socketem přeskakují. E-mail je řízen časovačem: nepřečtené záznamy eskaluje podle vlastního plánu, nejsou součástí tohoto průchodu.

Nejčastější cesty, které vedou k push:

1. **Obsahová oznámení**: odpověď v konverzaci, kterou osoba sleduje, zmínka nebo jiná událost směrovaná přes `NotificationHelper.createNotifications()`.
2. **Soukromé zprávy**: přímá zpráva prochází stejnou doručovací funkcí a vždy se pokusí o push spolu s doručením přes socket.
3. **Naplánovaná připomenutí**: připomenutí k událostem, úkolům a službám, která rozbaluje a odesílá engine připomenutí. Nové výskyty spouští přímo na úrovni push.
4. **Push odeslané personálem**: `POST /messaging/notifications/create`, `/ping` a `/group/send` pro jednorázové nebo skupinové hromadné zprávy.

## Tok na serveru

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

### Požadované proměnné prostředí

Klíče VAPID jsou uloženy v `Environment` a musí být přítomny, aby byl push povolen:

| Proměnná prostředí | Nastavení `Environment` | Popis |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Veřejný klíč VAPID (base64url). Klientům se vrací přes `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Privátní klíč VAPID. Používá se k podepisování každého odchozího push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:`, které se hlásí push službám. Výchozí hodnota je `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` vrací `false`, pokud chybí kterýkoli z klíčů. Modul messaging dál funguje, push doručení se jen neprovedou. Mobilní web B1App pak členům sdělí, že push není zapnutý, místo nabídky nastavení.

### Vygenerování páru klíčů VAPID

```bash
npx web-push generate-vapid-keys
```

Výstup přidejte do `.env` (lokálně) nebo do AWS SSM Parameter Store (nasazené prostředí). Rotace klíčů zneplatní všechna stávající předplatná a klienti se musí znovu zaregistrovat při dalším načtení stránky.

## Model ukládání

Předplatná Web Push se ukládají do existující tabulky `devices` spolu se záznamy zařízení FCM. Rozlišují se podle prefixu `webpush:` ve sloupci `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Díky tomu jediné volání `loadByPersonId` vrátí všechna zařízení, která uživatel zaregistroval, bez ohledu na platformu. Logiku prefixu řeší `WebPushHelper.isWebPushToken(token)` a `decodeSubscription(token)`.

## Koncové body

Základní cesta: `/messaging/webpush`

| Metoda | Cesta | Autentizace | Popis |
|--------|------|------|-------------|
| GET | `/publicKey` | Veřejné | Vrací `{ publicKey, enabled }`. Klienti předávají `publicKey` do `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Zaregistruje (nebo upsertuje) předplatné pro přihlášeného uživatele. Tělo: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Veřejné | Smaže všechny řádky zařízení, jejichž `fcmToken` obsahuje zadaný endpoint. Tělo: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Smaže konkrétní řádek zařízení podle jeho serverového id |

## Klientský primitiv: `WebPushHelper`

`WebPushHelper` z balíčku `@churchapps/apphelper` je jediný vstupní bod na straně klienta. Hostitelské aplikace ho nastaví jednou při startu a po přihlášení volají `subscribe()`.

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

Tyto vlastnosti dostanou spotřebitelé automaticky:

- **Kontrola podpory**: `isSupported()` vrací `false` v prohlížečích bez `serviceWorker`, `PushManager` nebo `Notification`.
- **Cooldown**: `canPromptNow()` vynucuje 7denní prodlevu mezi výzvami přes `localStorage`, aby se uživatelé, kteří systémovou výzvu odmítli, neptali při každém sezení znovu.
- **Odhlášení**: `setOptedOut(true)` a `unsubscribe()` blokují opětovné vyžadování souhlasu a odstraní serverový řádek zařízení.
- **Detekce samostatné PWA**: `isStandalone()` umožňuje hostitelům podmínit výzvy k push na iOS tím, že uživatel nainstaloval PWA na plochu (iOS povoluje push jen z nainstalovaných PWA).
- **Opětovná registrace při přepnutí sboru**: `refreshEnrollment()` znovu odešle existující předplatné prohlížeče pro nový `userChurch` bez opětovné výzvy uživateli. Volejte ji z obsluhy změny `userChurch`.

### Požadavek na service worker

Prohlížečový `PushManager` vrátí předplatné jen tehdy, je-li service worker zaregistrovaný na nastaveném rozsahu. PWA ChurchApps k vygenerování service workeru používají [Serwist](https://serwist.dev/) (aplikace Next.js) nebo workbox. Protože server nyní vždy zkouší push spolu s doručením přes socket (viz [Kdy se push odesílá](#when-push-fires)), je právě service worker místem deduplikace. Jeho handler `push` musí potlačit `showNotification`, pokud už je fokusovaný nebo viditelný klient na cíli hlubokého odkazu daného oznámení. Odznak aplikace však má vždy aktualizovat, ať je banner zobrazen, nebo ne:

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

`deepLinkFor` a `clientMatchesTarget` jsou specifické pro jednotlivé aplikace. Referenční implementaci najdete v `B1App/src/app/sw.ts`. B1App směruje `privateMessage` na `/mobile/messages/:personId`, B1Admin směruje `notification` do svého panelu upozornění atd.

## Provozní poznámky

- **Výsledky `gone: true`**: `WebPushHelper.sendBulk` vrací pro každého příjemce `{ token, success, gone, errorMessage }`. Výsledek `gone: true` (push služba odpověděla `404` nebo `410`) znamená, že předplatné je trvale neplatné. Navazující kód v `NotificationHelper` tyto řádky zařízení smaže, aby se na ně už nezkoušelo.
- **TTL**: push zprávy se odesílají s `TTL: 86400` (24 hodin). Pokud se prohlížeč uživatele nepřipojí k push službě do 24 hodin, push se zahodí.
- **Žádné opakování**: přechodná chyba (timeout, 5xx) se zaloguje a neopakuje. Push je doručení typu best-effort. Trvanlivost zajišťují socket na stránce a úroveň e-mailových oznámení.
- **Vypnutá prostředí**: vývojová prostředí mohou nechat klíče VAPID prázdné. `WebPushHelper.isEnabled()` pak vrátí `false` a push se přeskočí. Pro prostředí bez vlastní identity VAPID je to zamýšlené chování.

## Související stránky

- [Architektura oznámení](./architecture/notifications.md): úplný model eskalace v aplikaci, push a e-mail a engine připomenutí
- [Architektura v reálném čase](./realtime.md): doručení přes WebSocket. Push se nyní spouští ze stejného funnelu v aplikaci spolu s doručením přes socket ve stejném průchodu, ne jen jako záloha pro případ, že se doručení přes socket nepovede
- [Koncové body zpráv](./api/endpoints/messaging.md): oznámení, zařízení a zbytek rozhraní zpráv
- [AppHelper](./shared-libraries/app-helper.md): balíček npm, který obsahuje `WebPushHelper`
