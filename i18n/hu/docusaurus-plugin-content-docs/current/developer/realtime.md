---
title: "Valós idejű architektúra"
---

# Valós idejű architektúra

<div class="article-intro">

A ChurchApps minden valós idejű felületéhez egyetlen WebSocket-alapú átviteli keretrendszert használ: a csoportos csevegést, a privát üzeneteket, a tartalomhoz fűzött jegyzeteket, az élő közvetítés csevegését és a jelenlétet/részvételt. Ez az oldal dokumentálja a protokollt, a kiszolgálót és azokat a kliensoldali alapelemeket, amelyeket a felhasználók használnak.

</div>

## Áttekintés

```
┌────────────────────┐                ┌────────────────────────────┐
│ Browser / B1Admin  │                │  MessagingApi (Lambda)     │
│ Browser / B1App    │ ─── WS ─────▶  │  ┌───────────────────────┐ │
│  - SocketHelper    │                │  │ SocketHelper (server) │ │
│  - SubscriptionMgr │   POST /msg ──▶│  │ MessageController     │ │
│  - ConversationStore│  POST /conn ─▶│  │ ConnectionController  │ │
│  - PresenceStore   │ ◀── action ──  │  │ DeliveryHelper        │ │
└────────────────────┘                │  └───────────────────────┘ │
                                      └────────────────────────────┘
```

A protokollnak három része van:

1. **Egyetlen tartós WebSocket** böngészőlaponként, amelyet a `SocketHelper` nyit meg.
2. **Kapcsolati sorok** (`POST /messaging/connections`), amelyek a `connections` táblában tárolódnak. Ezek jelölik meg a `(socketId, churchId, conversationId)` hármast egy szoba feliratkozójaként.
3. **Szerveroldali szétosztás** a `DeliveryHelper.sendConversationMessages()` által. Amikor egy üzenet mentésre kerül (`POST /messaging/messages/send`), a szerver beolvassa a megfelelő kapcsolati sorokat, és típusos adatcsomagot küld minden nyitott socketnek.

Nincs Socket.IO, nincs long-polling tartalék megoldás, és nincs külön mikroszolgáltatás. A WebSocket ugyanabban a folyamatban fut, mint a REST API (AWS-ben a HTTP-hez a `web` Lambda, a WebSockethez a `socket` Lambda tartozik; helyben és Railway-en egyetlen, közös folyamat fut).

## Portok és átvitel

| Környezet | HTTP | WebSocket |
|-------------|------|-----------|
| Helyi fejlesztés | `8084` | `ws://localhost:8087` (külön `WebSocketServer`) |
| Railway / Docker / egyportos gazdagépek (`RAILWAY_ENVIRONMENT` vagy `SELF_HOSTED` beállítva) | megosztott | megosztott HTTP-kiszolgáló (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default` útvonalak) |

Az átviteli módot a `deliveryProvider` konfiguráció választja ki:

- `local` → nyers `ws` könyvtár; a kliensek a `CommonEnvironmentHelper` által megadott `MessagingApiSocket` címhez kapcsolódnak.
- `aws` → API Gateway WebSocket; a szerver az `@aws-sdk/client-apigatewaymanagementapi` segítségével küldi az adatcsomagokat az aktív kapcsolatokra.

A kliensnek nem kell tudnia, melyik módot használja; mindkét esetben ugyanazt a JSON-protokollt beszéli.

## Vezetékes protokoll

Minden keret `PayloadInterface` alakú JSON:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // the "room" — usually a UUID, sometimes "alerts" or "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, after connect, carries the socketId to use for room joins
  | "message"             // server → client, new message
  | "deleteMessage"       // server → client, message removed
  | "privateMessage"      // server → client, badge-count ping to the recipient's "alerts" room when a direct message escalates; the message body itself arrives via the ordinary "message" action inside the open conversation
  | "reaction"            // server → client, emoji reaction toggled on a message; data is { messageId, conversationId, personId, emoji, added } (added=false means removed). Broadcast to the conversation room by POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, secondary "something happened" signal for content-room subscribers
  | "attendance"          // server → client, viewer list / presence snapshot
  | "notification"        // server → client, generic notification (counts, etc.)
  | "reconnect"           // client-internal, dispatched locally by SocketHelper after a new socketId handshake completes following a drop — either an exponential-backoff reconnect after an unexpected close, or an immediate reconnect triggered by the resume probe (tab focus/visibility/online); never sent by the server
  | "alert" | "callout";  // legacy, see Connections endpoint reference
```

### Kézfogás

1. A kliens megnyitja a socketet, és elküldi a szó szerinti `"getId"` karakterláncot.
2. A szerver `{ action: "socketId", data: "<id>" }` válasszal felel.
3. A kliens eltárolja a `socketId`-t, és minden szobafeliratkozáshoz harmadik koordinátaként használja.

### Csatlakozás szobához

A „szoba” egyszerűen egy `(churchId, conversationId)` pár. A feliratkozáshoz a kliens egy `Connection` sort küld:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null for anonymous live stream viewers
    "displayName": "Anonymous4823"
  }
]
```

A csatlakozás egy `attendance` üzenetet is szétküld a beszélgetésben, így a meglévő feliratkozók értesülnek arról, hogy új néző csatlakozott.

### Üzenet küldése

`POST /messaging/messages/send` (névtelen hozzáférés engedélyezett) vagy `POST /messaging/messages/` (bejelentkezés szükséges):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

A szerver elmenti az üzenetet, majd a `DeliveryHelper.sendConversationMessages()` megkeresi az adott `conversationId`-hez tartozó összes kapcsolati sort, és minden socketnek elküldi a `{ action: "message", data: <message> }` keretet.

Tartalomhoz kötött beszélgetések esetén (például egy személyhez fűzött jegyzetek) egy második szétküldés is történik `action: "conversationActivity"` típussal a szintetikus `"content-{type}-{id}"` szobán, hogy a listanézetek fogyasztói tudják, mikor kell frissíteni, anélkül hogy a mögöttes beszélgetést nyitva kellene tartaniuk.

### Szobából való kilépés

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Törli a kapcsolati sort, és egy utolsó `attendance` szétküldést indít el.

## Szerveroldali összetevők

| Fájl | Szerep |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Kezeli a `WebSocketServer` példányt. Csatlakozáskor kiosztja a `socketId`-t. 30 másodpercenként ping/pong szívverést futtat (`startHeartbeat`), amely a `terminate()` hívással lezárja és megtisztítja azokat a kapcsolatokat, amelyek nem válaszolnak pongal. Lecsatlakozáskor megtisztítja a halott socketeket, és újra szétküldi a jelenléti adatokat. Biztosítja a `getLiveSocketIds()` és a `reapStaleConnections()` függvényeket, amelyeket a 30 perces időzített feladat használ a elavult `connections` sorok törléséhez — helyben azzal, hogy ellenőrzi, mely socketId-k élnek még a folyamaton belül; AWS-en pedig 24 órás TTL-tartalékként a kihagyott `$disconnect` események miatt (az API Gateway a kapcsolatokat kb. 2 órára korlátozza, így ez nem törölhet élő kapcsolatot) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | A `sendConversationMessages(payload)` beolvassa a szoba kapcsolatait, és minden keretet a helyi socketre vagy az AWS API Gateway kapcsolatára irányít. A `sendAttendance(churchId, conversationId)` összeállítja és szétküldi a nézők pillanatfelvételét |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | A `POST /` csatlakozik, a `DELETE /:churchId/:conversationId/:socketId` kilép, a `POST /setName` pedig frissíti a megjelenítendő nevet |
| `Api/src/modules/messaging/controllers/MessageController.ts` | A `POST /send` (névtelen) és a `POST /` (hitelesített) elmenti, majd szétosztja az üzenetet |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | A `loadForConversation(churchId, conversationId)` az igazság forrása arra, hogy ki van feliratkozva |

## Kliensoldali alapelemek (`@churchapps/apphelper`)

Mind az öt alapelem statikus egyke az `apphelper/src/helpers/` mappában. Úgy működnek együtt, hogy minden lap **egyetlen** WebSocketet nyisson meg, függetlenül attól, hány komponens csatolódik az oldalhoz.

### `SocketHelper`

Kezeli az egyetlen WebSocket-kapcsolatot. Az újrahívható `init()` idempotens — több komponens is meghívhatja anélkül, hogy duplikált socketek nyílnának. Ezeket teszi elérhetővé:

- `init()` — megnyitja (vagy újrahasználja) a socketet, és lefuttatja a `getId` kézfogást. Akkor oldódik fel, amikor a kézfogás befejeződik, vagy 5 másodperces időtúllépés után, amikor a háttérben futó újrapróbálkozási ciklus átveszi az irányítást; soha nem utasít el, így a hívóknak nem kell külön kezelniük az első sikertelen csatlakozást.
- `addHandler(action, id, fn)` / `removeHandler(id)` — figyelők regisztrálása/törlése `action` szerint. Több kezelő is figyelhet ugyanazt az akciót.
- `setPersonChurch({ personId, churchId })` — hitelesített hívóknak; `"alerts"` szobára történő feliratkozást indít, hogy a push-értesítések megérkezzenek ezen a socketen.
- `onSocketIdReady(fn)` — minden új socketId-nál meghívódik, nem csak az elsőnél: a kezdeti kézfogásnál és minden későbbi újracsatlakozásnál. A `SubscriptionManager` ezzel üríti a függőben lévő csatlakozásokat.
- `checkConnection()` — a lenti folytatás-figyelők hívják meg; azonnal újracsatlakozik, ha a socket már zárva van, vagy életjel-próbát küld, ha nyitottnak látszik.

**Újracsatlakozási ciklus.** Egy váratlan lezárás exponenciális visszalépéssel (1 másodperc, duplázódva legfeljebb 30 másodpercig) ütemez újracsatlakozást. A `SocketHelper` figyeli a `window`/`document` objektumok `online`, `focus`, `pageshow` és `visibilitychange` eseményeit is, hogy felismerje a visszatérő lapot: ha a socket már zárva van, azonnal újracsatlakozik és visszaállítja a visszalépést; ha nyitottnak látszik, `"getId"` életjel-próbát küld, és kényszerített újracsatlakozást végez, ha 3 másodpercen belül nem érkezik keret. Ez elkapja azokat a félig nyitott socketeket, amelyeket a mobil operációs rendszer felfüggesztése után hagy maga után az alkalmazás. Sikeres újrakézfogás után a `SocketHelper` helyben elindítja a `"reconnect"` akciót (lásd: [Vezetékes protokoll](#wire-protocol)) az adott akcióhoz regisztrált összes kezelőnek.

### `SubscriptionManager`

Referenciaszámlált szobatagság. Ha több komponens iratkozik fel ugyanarra a beszélgetésre, csak egyetlen szerveroldali kapcsolati sor jön létre.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

A fogyasztók három viselkedést kapnak ingyen:

- **Késleltetett kilépés (300 ms)** — átvészeli a React StrictMode dupla csatolás/leválasztás ciklusát és a rövid újracsatolásokat anélkül, hogy a szerveroldali feliratkozás megszűnne; a `reset()` a függőben lévő késleltetett kilépéseket is törli.
- **Újracsatlakozáskor történő újracsatlakozás** — a `SocketHelper` `"reconnect"` eseményekor (és minden `onSocketIdReady` hívásnál) a `SubscriptionManager` újraküldi az összes aktív kapcsolati sort, a csatlakozáskor használt `personId`/`displayName` értékekkel. Az újracsatlakozások socketId-nként duplikálásmentesek, így ugyanaz az újracsatlakozás nem küldi el kétszer ugyanazt a szobát.
- **Késleltetett socketId-kötés** — a `joinRoom` a szándékot akkor is rögzíti, ha a socket még nem fejezte be a kézfogást; a tényleges `POST /connections` az `onSocketIdReady` eseménynél indul.

### `ConversationStore`

Memóriabeli gyorsítótár, amelynek kulcsa a `conversationId`. A `message` / `deleteMessage` / `privateMessage` socketkezelőket pontosan egyszer regisztrálja, és a beérkező kereteket alkalmazza az éppen nyitott beszélgetésekre.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ uses /messages/conversation/:id when authenticated, /messages/catchup/:churchId/:id when anonymous

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render with the latest snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optional explicit cleanup
```

A hitelesített hívók **személyek feloldását** is kapják: a bejövő üzenetek `personId` értékeit egy gyorsítótárazott `GET /people/ids` lekérdezés `PersonInterface` objektumokká alakítja. A névtelen hívók ezt kihagyják.

A `SocketHelper` `"reconnect"` eseménye után a `ConversationStore` újra lekéri az összes olyan beszélgetést, amelynek jelenleg aktív `subscribe` figyelői vannak, így visszaállítja a kapcsolat kimaradása alatt elmaradt üzeneteket. A névtelen beszélgetések ezt a pótlást kihagyják, ha a `churchId` soha nem került rögzítésre (a pótló végpont ezt megköveteli).

### `PresenceStore`

Az `attendance` akcióhoz a `ConversationStore` mintáját követi. A feliratkozók `PresenceSnapshot { conversationId, totalViewers, viewers }` értéket kapnak, valahányszor a szerver újra szétosztja a jelenlétet. Az azonos pillanatfelvételeket értesítés előtt kiszűri, így a újracsatlakozási hullámok nem váltanak ki felesleges újrarenderelést.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

A **hitelesített** hívók felső szintű indítási pontja. Becsomagolja a `SocketHelper.init()` hívást, beállítja a személy/gyülekezet kontextust (ez automatikusan csatlakoztatja az `"alerts"` szobához), és pontosan egyszer meghívja a `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` függvényeket. Saját `"reconnect"` kezelőt is regisztrál, amely újratölti az értesítési és privát üzenet számlálókat, így a jelvények megszakadt kapcsolat után is helyreállnak.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

A névtelen folyamatok (az élő közvetítés csevegése a legjobb példa) kihagyják a `NotificationService` szolgáltatást, és közvetlenül hívják az alapelemeket — referenciaként lásd a `B1App/src/helpers/StreamChatManager.ts` fájlt.

## Élő közvetítési csevegés

Az élő közvetítés a keretrendszer legnagyobb névtelen felhasználója. Két `contentType` értéket használ a szobák hatókörének meghatározására:

- `streamingLive` — a nyilvános csevegőlap a `/stream` oldalon (egy szoba `streamingService`-enként).
- `streamingLiveHost` — privát szoba, amelyet csak a `contentApi.chat.host` jogosultsággal rendelkező munkatársak láthatnak. A szoba azonosítóját a szerver titkosítja (`GET /streamingServices/:id/hostChat`), hogy az alkalmi adatgyűjtés ne fedje fel.

A `B1App/src/helpers/StreamChatManager.ts` mindkét szobát az egységes alapelemeken keresztül indítja el — az élő közvetítéshez már nincs külön socketkód.

## Minták és buktatók

- **Ne nyiss saját WebSocketet.** A `SocketHelper` azért egyke, mert így kell lennie. Ha egyedi akciót kell figyelned, regisztrálj kezelőt a meglévő socketen a `SocketHelper.addHandler` segítségével.
- **Ne kerüld meg a `SubscriptionManager` szolgáltatást.** A közvetlen `POST /connections` hívások működnek, de elveszítik a referenciaszámlálást, a késleltetett kilépést és az újracsatlakozáskor történő újracsatlakozást. A csoportos csevegés és a privát üzenetek fogyasztói mind a `SubscriptionManager` szolgáltatáson keresztül működnek.
- **A kezelőazonosítóknak akciónként egyedinek kell lenniük.** A `SocketHelper.addHandler(action, id, fn)` a `(action, id)` párral azonosít; ha két figyelő ugyanazt az azonosítót használja, az első felülíródik. Az egységes tárolók olyan azonosítókat használnak, mint a `"ConversationStore-Message"` és a `"PresenceStore-Attendance"`, hogy elkerüljék az ütközést a fogyasztói azonosítókkal.
- **A szobaazonosítók átlátszatlan karakterláncok.** A legtöbb beszélgetési UUID, de a rendszer támogatja a `"alerts"` (személyenkénti értesítések), a `"content-{type}-{id}"` (szintetikus tevékenységi szobák) és a titkosított `streamingLiveHost` azonosítókat is.
- **A hitelesítést a REST-határnál ellenőrzik, nem a socketnél.** A szobához csatlakozás `POST /connections` hívással névtelenül is engedélyezett; a hozzáférés-vezérlés az üzenetküldéskor történik (az üzenetvezérlő dönti el, milyen `messageType` típusú üzeneteket küldhet egy névtelen hívó).

## Kapcsolódó oldalak

- [Értesítési architektúra](./architecture/notifications) -- Az in-app/push/e-mail értesítési csatorna, amelybe ez az átvitel betáplál
- [Üzenetküldési végpontok](./api/endpoints/messaging) -- Az üzenetek, beszélgetések, kapcsolatok és eszközök teljes REST-felülete
- [Web Push értesítések](./web-push) -- Böngészős push-értesítések, a lapon belüli socketes kézbesítéstől elkülönítve
- [AppHelper](./shared-libraries/app-helper) -- Az npm-csomag, amely a kliensoldali alapelemeket tartalmazza
- [Modulszerkezet](./api/module-structure) -- Az üzenetküldési modul szerveroldali felépítése
