---
title: "Architektúra reálneho času"
description: "Ako vrstva WebSocket v ChurchApps doručuje živý chat, prítomnosť a upozornenia: handshake socketu, odbery miestností a klientské primitíva pre vývojárov."
---

# Architektúra reálneho času

<div class="article-intro">

ChurchApps používa jednotný doručovací framework založený na WebSocket pre všetky prvky reálneho času: skupinový chat, súkromné správy, poznámky k obsahu, chat živého streamu a prítomnosť či dochádzku. Táto stránka popisuje protokol, server a klientske primitíva, ktoré používajú konzumenti.

</div>

## Prehľad

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

Protokol má tri časti:

1. **Jedno trvalé WebSocket spojenie** na každú kartu prehliadača, otvorené cez `SocketHelper`.
2. **Záznamy o pripojení** (`POST /messaging/connections`) uložené v tabuľke `connections`. Tieto záznamy označujú n-ticu `(socketId, churchId, conversationId)` ako odberateľa miestnosti.
3. **Rozosielanie na strane servera** cez `DeliveryHelper.sendConversationMessages()`. Keď sa správa uloží (`POST /messaging/messages/send`), server načíta zodpovedajúce záznamy o pripojení a odošle každému otvorenému socketu typovaný payload.

Nepoužíva sa Socket.IO, nie je tu záložný mechanizmus long-polling ani samostatná mikroslužba. WebSocket beží v rovnakom procese ako REST API (v AWS `web` Lambda pre HTTP a `socket` Lambda pre WebSocket; lokálne a na Railway ako jeden spoločný proces).

## Porty a transport

| Prostredie | HTTP | WebSocket |
|-------------|------|-----------|
| Lokálny vývoj | `8084` | `ws://localhost:8087` (samostatný `WebSocketServer`) |
| Railway / Docker / hostitelia s jedným portom (nastavené `RAILWAY_ENVIRONMENT` alebo `SELF_HOSTED`) | spoločné | spoločný HTTP server (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (trasy `$connect` / `$disconnect` / `$default`) |

Výber transportu určuje konfigurácia `deliveryProvider`:

- `local` → knižnica `ws`; klienti sa pripájajú k `MessagingApiSocket` z `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; server posiela payloady aktívnym spojeniam cez `@aws-sdk/client-apigatewaymanagementapi`.

Klient nemusí vedieť, ktorý sa používa. V oboch prípadoch hovorí rovnakým JSON protokolom.

## Protokol správ

Každý rámec je JSON v tvare `PayloadInterface`:

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

### Rukopodanie (handshake)

1. Klient otvorí socket a odošle doslovný reťazec `"getId"`.
2. Server odpovie `{ action: "socketId", data: "<id>" }`.
3. Klient uloží `socketId` a použije ho ako tretiu súradnicu pri každom odbere miestnosti.

### Pripojenie k miestnosti

„Miestnosť" je len n-tica `(churchId, conversationId)`. Na odber klient odošle záznam `Connection`:

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

Odoslanie tiež spustí broadcast `attendance` v konverzácii, aby existujúci odberatelia vedeli, že sa pripojil nový divák.

### Odoslanie správy

`POST /messaging/messages/send` (povolené aj pre anonymných používateľov) alebo `POST /messaging/messages/` (vyžaduje prihlásenie):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Server správu uloží a potom `DeliveryHelper.sendConversationMessages()` vyhľadá všetky záznamy o pripojení pre dané `conversationId` a každému socketu pošle rámec `{ action: "message", data: <message> }`.

Pri konverzáciách naviazaných na obsah (napríklad poznámky priradené k osobe) sa na syntetickej miestnosti `"content-{type}-{id}"` odošle druhý broadcast s `action: "conversationActivity"`. Zobrazenia so zoznamami tak vedia, že majú obnoviť údaje, bez toho, aby museli mať otvorenú samotnú konverzáciu.

### Opustenie miestnosti

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Vymaže záznam o pripojení a spustí záverečný broadcast dochádzky.

## Komponenty na strane servera

| Súbor | Úloha |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Spravuje `WebSocketServer`. Pri pripojení priraďuje `socketId`. Každých 30 s spúšťa ping/pong heartbeat (`startHeartbeat`), ktorý ukončí a vyčistí každé spojenie, ktoré nevráti pong. Pri odpojení čistí mŕtve sockety a spúšťa znovu broadcast dochádzky. Poskytuje `getLiveSocketIds()` a `reapStaleConnections()`, ktoré používa 30-minútový časovač na mazanie zastaraných riadkov `connections`. Lokálne sa kontroluje, ktoré socketId sú stále živé v rámci procesu. Na AWS slúži ako záložné mazanie s TTL 24 h pre prípady, keď sa `$disconnect` nezachytí. API Gateway obmedzuje spojenia na približne 2 hodiny, takže týmto spôsobom nemožno vymazať živé spojenie |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` načíta spojenia pre miestnosť a smeruje každý rámec buď na lokálny socket, alebo na spojenie cez AWS API Gateway. `sendAttendance(churchId, conversationId)` zostaví a rozošle snímku divákov |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` pripája, `DELETE /:churchId/:conversationId/:socketId` odpája, `POST /setName` mení zobrazované meno |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonymné) a `POST /` (po prihlásení) správu uložia a potom rozošlú |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` je zdroj pravdy o tom, kto je prihlásený na odber |

## Klientske primitíva (`@churchapps/apphelper`)

Všetkých päť primitív sú statické singletony v `apphelper/src/helpers/`. Spolupracujú tak, aby každá karta otvorila **jedno** WebSocket spojenie bez ohľadu na to, koľko komponentov sa na stránke pripojí.

### `SocketHelper`

Spravuje jediné WebSocket spojenie. Opakované volanie `init()` je idempotentné, takže viacero komponentov ho môže volať bez otvárania duplicitných socketov. Poskytuje:

- `init()` — otvorí (alebo znovu použije) socket a dokončí handshake `getId`. Vráti výsledok po dokončení handshaku alebo, po 5 s časovom limite, keď preberie slučku opakovaných pokusov na pozadí. Nikdy nevyhodí chybu, takže volajúci nemusia špeciálne ošetrovať neúspešné prvé pripojenie.
- `addHandler(action, id, fn)` / `removeHandler(id)` — registrujú a odregistrujú poslucháčov podľa `action`. Na tú istú akciu môže počúvať viacero handlerov.
- `setPersonChurch({ personId, churchId })` — pre prihlásených volajúcich; spustí odber miestnosti `"alerts"`, aby push notifikácie prichádzali cez tento socket.
- `onSocketIdReady(fn)` — spustí sa pri každom novom socketId, nielen pri prvom. Zahŕňa počiatočný handshake aj každé nasledujúce opätovné pripojenie. `SubscriptionManager` ju používa na odoslanie čakajúcich pripojení.
- `checkConnection()` — volajú ho nižšie uvedené listenery obnovenia. Ak je socket už zatvorený, okamžite sa znovu pripojí. Ak vyzerá otvorený, pošle kontrolu živosti.

**Životný cyklus opätovného pripojenia.** Neočakávané zatvorenie naplánuje opätovné pripojenie s exponenciálnym odstupom (1 s, zdvojnásobované až do limitu 30 s). `SocketHelper` tiež počúva udalosti `online`, `focus`, `pageshow` a `visibilitychange` na `window` a `document`, aby zistil obnovenie karty. Ak je socket už zatvorený, okamžite sa znovu pripojí a resetuje odstup. Ak vyzerá otvorený, pošle kontrolnú správu `"getId"`. Ak do 3 s nepríde žiadny rámec, vynúti opätovné pripojenie. Týmto sa zachytia polootvorené sockety, ktoré zostanú po tom, ako mobilný operačný systém aplikáciu pozastaví. Po úspešnom opätovnom handshaku `SocketHelper` odošle lokálnu akciu `"reconnect"` (pozri [Protokol správ](#wire-protocol)) každému registrovanému handleru tejto akcie.

### `SubscriptionManager`

Členstvo v miestnostiach s počítaním referencií. Viacero komponentov, ktoré odoberajú tú istú konverzáciu, zaregistruje na serveri len jeden záznam o pripojení.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Konzumenti dostanú zadarmo tri správania:

- **Odložené opustenie (300 ms)** — prežije dvojité pripojenie a odpojenie v React StrictMode a krátke cykly opätovného pripojenia bez zrušenia odberu na serveri. `reset()` tiež zruší všetky čakajúce odložené opustenia.
- **Opätovné pripojenie do miestnosti** — `SubscriptionManager` si pamätá `personId` a `displayName` použité na pripojenie ku každej miestnosti. Pri udalosti `"reconnect"` (a pri každom volaní `onSocketIdReady`) znovu odošle každý aktívny záznam o pripojení s pôvodnou identitou. Opätovné pripojenia sa deduplikujú podľa socketId, takže rovnaké opätovné pripojenie nepošle miestnosť dvakrát.
- **Neskoré viazanie socketId** — `joinRoom` zaznamená úmysel pred dokončením handshaku socketu. Skutočný `POST /connections` sa odošle pri `onSocketIdReady`.

### `ConversationStore`

Pamäťová vyrovnávacia pamäť, kľúčom je `conversationId`. Registruje handlery socketov `message` / `deleteMessage` / `privateMessage` presne raz a prichádzajúce rámce aplikuje na konverzácie, ktoré sú práve otvorené.

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

Prihlásení volajúci majú aj **doplnenie osôb**. `personId` v prichádzajúcich správach sa cez cachované vyhľadanie `GET /people/ids` premenia na objekty `PersonInterface`. Anonymní volajúci tento krok preskakujú.

Pri udalosti `"reconnect"` z `SocketHelper` `ConversationStore` znovu načíta každú konverzáciu, ktorá má aktuálne aktívnych poslucháčov `subscribe`, a obnoví správy, ktoré sa počas výpadku socketu nedoručili. Anonymné konverzácie toto dobehnutie preskočia, ak sa ich `churchId` nikdy nezaznamenalo, pretože koncový bod dobehnutia ho vyžaduje.

### `PresenceStore`

Zrkadlí vzor `ConversationStore` pre akciu `attendance`. Odberatelia dostávajú `PresenceSnapshot { conversationId, totalViewers, viewers }` vždy, keď server znovu odošle údaje o prítomnosti. Identické snímky sa pred oznámením deduplikujú, takže vlny opätovných pripojení nespôsobujú zbytočné prekreslenia.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Hlavný spúšťací bod pre **prihlásených** volajúcich. Obaluje `SocketHelper.init()`, nastavuje kontext osoby a cirkvi (čo automaticky pridá do miestnosti `"alerts"`) a presne raz volá `ConversationStore.ensureHandlers()`, `PresenceStore.ensureHandlers()` a `SubscriptionManager.setupRejoin()`. Registruje tiež vlastný handler pre `"reconnect"`, ktorý znovu načíta počty upozornení a súkromných správ, aby sa odznaky po prerušenom spojení obnovili.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonymné scenáre (typickým príkladom je chat živého streamu) preskakujú `NotificationService` a volajú primitíva priamo. Referenčnú implementáciu nájdete v `B1App/src/helpers/StreamChatManager.ts`.

## Chat živého streamu

Živý stream je najväčší anonymný konzument tohto frameworku. Na určenie miestností používa dva `contentType`:

- `streamingLive` — verejná záložka chatu na `/stream` (jedna miestnosť pre každú `streamingService`).
- `streamingLiveHost` — súkromná miestnosť viditeľná len zamestnancom s oprávnením `contentApi.chat.host`. ID miestnosti je na serveri zašifrované (`GET /streamingServices/:id/hostChat`), aby ho bežné hľadanie cez scraping neodhalilo.

`B1App/src/helpers/StreamChatManager.ts` spúšťa obe miestnosti cez jednotné primitíva. Kód WebSocket špecifický pre živý stream už neexistuje.

## Vzory a úskalia

- **Neotvárajte vlastné WebSocket spojenie.** `SocketHelper` je singleton zámerne. Ak potrebujete počúvať vlastnú akciu, zaregistrujte handler na existujúci socket cez `SocketHelper.addHandler`.
- **Neobchádzajte `SubscriptionManager`.** Priame volania `POST /connections` fungujú, ale strácajú počítanie referencií, odložené opustenie a opätovné pripojenie do miestnosti. Skupinový chat a konzumenti súkromných správ všetci prechádzajú cez `SubscriptionManager`.
- **ID handlerov musia byť jedinečné pre každú akciu.** `SocketHelper.addHandler(action, id, fn)` ukladá podľa dvojice `(action, id)`. Ak použijete rovnaké ID pre dvoch poslucháčov, prvý sa nahradí. Jednotné úložiská používajú ID ako `"ConversationStore-Message"` a `"PresenceStore-Attendance"`, aby sa nekrížili s ID konzumentov.
- **ID miestností sú nepriehľadné reťazce.** Väčšina sú UUID konverzácií, systém však podporuje aj `"alerts"` (upozornenia pre jednotlivé osoby), `"content-{type}-{id}"` (syntetické miestnosti aktivity) a zašifrované ID `streamingLiveHost`.
- **Autentifikácia sa kontroluje na hranici REST, nie na sockete.** Pripojenie k miestnosti cez `POST /connections` je povolené aj pre anonymných používateľov. Riadenie prístupu prebieha pri odosielaní správy. Kontrolér správ rozhoduje, aké `messageType` môže anonymný volajúci odoslať.

## Súvisiace stránky

- [Architektúra oznámení](./architecture/notifications.md) -- Lievik eskalácie pre aplikáciu, push a e-mail, do ktorého toto spojenie prenáša správy
- [Koncové body správ](./api/endpoints/messaging.md) -- Úplné REST rozhranie pre správy, konverzácie, pripojenia a zariadenia
- [Webové push notifikácie](./web-push.md) -- Push v prehliadači, oddelený od doručovania cez socket v stránke
- [AppHelper](./shared-libraries/app-helper.md) -- Balík npm, ktorý obsahuje klientské primitíva
- [Štruktúra modulov](./api/module-structure.md) -- Ako je modul správ organizovaný na strane servera
