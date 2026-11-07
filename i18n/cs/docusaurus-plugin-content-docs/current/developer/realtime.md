---
title: "Architektura reálného času"
description: "Jak vrstva WebSocket v ChurchApps doručuje živý chat, přítomnost a oznámení: handshake soketu, odběr místností a klientské primitivy pro vývojáře."
---

# Architektura reálného času

<div class="article-intro">

ChurchApps používá jediný doručovací framework založený na WebSocketu pro všechny prvky reálného času: skupinový chat, soukromé zprávy, poznámky k obsahu, chat živého streamu a přítomnost a docházku. Tato stránka popisuje protokol, server a klientské primitivy, které jednotlivé části aplikace používají.

</div>

## Přehled

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

Protokol se skládá ze tří částí:

1. **Jedno trvalé WebSocket spojení** na každou záložku prohlížeče, otevřené pomocí `SocketHelper`.
2. **Řádky připojení** (`POST /messaging/connections`) uložené v tabulce `connections`. Ty označují n-tici `(socketId, churchId, conversationId)` jako odběratele místnosti.
3. **Rozesílání na straně serveru** pomocí `DeliveryHelper.sendConversationMessages()`. Když se zpráva uloží (`POST /messaging/messages/send`), server načte odpovídající řádky připojení a každému otevřenému socketu pošle typovaný payload.

Nepoužívá se Socket.IO, žádný záložní mechanismus long-polling ani samostatná mikroslužba. WebSocket běží ve stejném procesu jako REST API (v AWS jako Lambda `web` pro HTTP a Lambda `socket` pro WebSocket; lokálně a na Railway jako jeden společný proces).

## Porty a přenos

| Prostředí | HTTP | WebSocket |
|-----------|------|-----------|
| Lokální vývoj | `8084` | `ws://localhost:8087` (samostatný `WebSocketServer`) |
| Railway / Docker / hostitelé s jedním portem (nastavené `RAILWAY_ENVIRONMENT` nebo `SELF_HOSTED`) | sdílený | sdílený HTTP server (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (trasy `$connect` / `$disconnect` / `$default`) |

Výběr přenosu řídí konfigurace `deliveryProvider`:

- `local` → čistá knihovna `ws`; klienti se připojují k `MessagingApiSocket` z `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; server posílá payloady aktivním spojením pomocí `@aws-sdk/client-apigatewaymanagementapi`.

Klient nemusí vědět, který přenos se používá, protože v obou případech mluví stejným JSON protokolem.

## Síťový protokol

Každý rámec je JSON tvaru `PayloadInterface`:

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

### Handshake (navázání spojení)

1. Klient otevře socket a odešle doslovný řetězec `"getId"`.
2. Server odpoví `{ action: "socketId", data: "<id>" }`.
3. Klient si uloží `socketId` a použije ho jako třetí souřadnici každého odběru místnosti.

### Připojení k místnosti

„Místnost“ je jen n-tice `(churchId, conversationId)`. Pro odběr klient odešle řádek `Connection`:

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

Odeslání také spustí broadcast `attendance` do konverzace, aby stávající odběratelé věděli, že se připojil nový divák.

### Odeslání zprávy

`POST /messaging/messages/send` (povoleno i anonymně) nebo `POST /messaging/messages/` (vyžaduje přihlášení):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Server zprávu uloží. Poté `DeliveryHelper.sendConversationMessages()` najde všechny řádky připojení pro dané `conversationId` a každému socketu pošle rámec `{ action: "message", data: <message> }`.

U konverzací navázaných na obsah (například poznámky připojené k osobě) se na syntetické místnosti `"content-{type}-{id}"` odešle druhý broadcast s `action: "conversationActivity"`. Díky němu se seznamy mohou obnovit, aniž by musely mít otevřenou podkladovou konverzaci.

### Opuštění místnosti

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Smaže řádek připojení a spustí závěrečný broadcast `attendance`.

## Komponenty na straně serveru

| Soubor | Role |
|--------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Vlastní `WebSocketServer`. Při připojení přiřadí `socketId`. Spouští 30sekundový heartbeat ping/pong (`startHeartbeat`), který každé spojení, jež nepošle pong, ukončí (`terminate()`) a uklidí. Při odpojení uklízí mrtvé sockety a spouští znovu broadcast docházky. Zpřístupňuje `getLiveSocketIds()` a `reapStaleConnections()`, které používá 30minutová úloha k mazání zastaralých řádků `connections`. Lokálně kontroluje, které `socketId` jsou ještě živé v rámci procesu. Na AWS slouží jako záložní mechanismus s TTL 24 hodin pro zmeškané události `$disconnect`. API Gateway omezuje spojení přibližně na 2 hodiny, takže živé spojení tímto způsobem smazat nelze. |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` načte připojení pro místnost a směruje každý rámec na lokální socket nebo na spojení AWS API Gateway. `sendAttendance(churchId, conversationId)` sestaví a rozešle snímek diváků. |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` připojuje, `DELETE /:churchId/:conversationId/:socketId` odpojuje, `POST /setName` aktualizuje zobrazované jméno. |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonymní) a `POST /` (přihlášený uživatel) nejprve zprávu uloží a poté ji rozešlou. |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` je zdrojem pravdy o tom, kdo je přihlášen k odběru. |

## Klientské primitivy (`@churchapps/apphelper`)

Všech pět primitiv jsou statické singletony v `apphelper/src/helpers/`. Spolupracují tak, že každá záložka otevře **jedno** WebSocket spojení bez ohledu na to, kolik komponent se na stránce připojí.

### `SocketHelper`

Vlastní jediné WebSocket spojení. Opakované volání `init()` je idempotentní, takže více komponent ho může volat bez otevírání duplicitních socketů. Poskytuje:

- `init()` otevře (nebo znovu použije) socket a dokončí handshake `getId`. Vrací výsledek, až když je handshake dokončen, nebo po 5sekundovém timeoutu, kdy převezme smyčka opakovaných pokusů na pozadí. Nikdy nevrací chybu, takže volající nemusí ošetřovat neúspěšné první připojení.
- `addHandler(action, id, fn)` / `removeHandler(id)` registrují a odregistrovávají posluchače podle `action`. Na stejnou akci může naslouchat více handlerů.
- `setPersonChurch({ personId, churchId })` pro přihlášené volající; spustí odběr místnosti `"alerts"`, aby push notifikace přicházely na tento socket.
- `onSocketIdReady(fn)` se spustí pro každé nové `socketId`, nejen pro první. Týká se to počátečního handshake i každého dalšího opětovného připojení. Používá ho `SubscriptionManager` k odeslání čekajících připojení.
- `checkConnection()` je volán z níže popsaných posluchačů obnovení. Pokud je socket již zavřený, okamžitě se znovu připojí. Pokud vypadá jako otevřený, odešle kontrolní dotaz na živost.

**Životní cyklus opětovného připojení.** Neočekávané zavření naplánuje opětovné připojení s exponenciálním čekáním (1 s, zdvojnásobováno až do maxima 30 s). `SocketHelper` také naslouchá událostem `online`, `focus`, `pageshow` a `visibilitychange` na `window` a `document`, aby zjistil obnovení karty. Pokud je socket už zavřený, okamžitě se znovu připojí a resetuje čekání. Pokud vypadá jako otevřený, odešle dotaz `"getId"` na živost. Pokud do 3 sekund nepřijde žádný rámec, vynutí opětovné připojení. Tím se odhalí napůl otevřená spojení, která zůstanou po pozastavení aplikace mobilním operačním systémem. Po úspěšném novém handshake odešle `SocketHelper` lokální akci `"reconnect"` (viz [Síťový protokol](#wire-protocol)) všem registrovaným handlerům pro tuto akci.

### `SubscriptionManager`

Členství v místnostech s počítáním odkazů. Více komponent přihlášených k odběru stejné konverzace vytvoří na serveru jen jeden řádek připojení.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Spotřebitelé dostávají tři chování zdarma:

- **Odložené opuštění (300 ms).** Přežije dvojité připojení a odpojení v React StrictMode a krátké cykly opětovného připojení, aniž by ztratilo odběr na serveru. `reset()` také zruší čekající odložená opuštění.
- **Opětovné připojení do místnosti.** `SubscriptionManager` si pamatuje `personId` a `displayName` použité při připojení do každé místnosti. Při události `"reconnect"` od `SocketHelper` (a při každém volání `onSocketIdReady`) znovu odešle všechny aktivní řádky připojení se zachovanou identitou. Opětovná připojení se deduplikují podle `socketId`, takže stejné opětovné připojení nepošle tutéž místnost dvakrát.
- **Pozdní navázání socketId.** `joinRoom` zaznamená úmysl připojit se ještě předtím, než socket dokončí handshake. Samotné `POST /connections` se odešle při `onSocketIdReady`.

### `ConversationStore`

Cache v paměti indexovaná podle `conversationId`. Registruje handlery socketů `message`, `deleteMessage` a `privateMessage` přesně jednou a příchozí rámce aplikuje na všechny konverzace, které jsou právě otevřené.

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

Přihlášení volající mají také **doplnění údajů o osobách**. Hodnoty `personId` u příchozích zpráv se převedou na objekty `PersonInterface` pomocí cachovaného dotazu `GET /people/ids`. Anonymní volající tento krok přeskakují.

Při události `"reconnect"` od `SocketHelper` znovu načte `ConversationStore` každou konverzaci, která má aktivní posluchače `subscribe`, a obnoví zprávy zmeškané během výpadku socketu. Anonymní konverzace tento dohled přeskočí, pokud se jejich `churchId` nikdy nezaznamenalo, protože koncový bod dohledu ho vyžaduje.

### `PresenceStore`

Kopíruje vzor `ConversationStore` pro akci `attendance`. Odběratelé dostávají `PresenceSnapshot { conversationId, totalViewers, viewers }` při každém novém broadcastu přítomnosti ze serveru. Shodné snímky se před oznámením odfiltrují, takže vlny opětovných připojení nevyvolají zbytečná překreslení.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Hlavní spouštěcí bod pro **přihlášené** volající. Obaluje `SocketHelper.init()`, nastavuje kontext osoby a sboru (což automaticky připojí místnost `"alerts"`) a přesně jednou volá `ConversationStore.ensureHandlers()`, `PresenceStore.ensureHandlers()` a `SubscriptionManager.setupRejoin()`. Registruje také vlastní handler `"reconnect"`, který znovu načte počty notifikací a soukromých zpráv, takže se odznaky po přerušeném spojení obnoví.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonymní scénáře (typickým příkladem je chat živého streamu) přeskakují `NotificationService` a volají primitiva přímo. Referenční implementaci najdete v `B1App/src/helpers/StreamChatManager.ts`.

## Chat živého streamu

Živý stream je největším anonymním spotřebitelem tohoto frameworku. Pro určení rozsahu místností používá dva `contentType`:

- `streamingLive`: veřejná chatovací záložka na `/stream` (jedna místnost na `streamingService`).
- `streamingLiveHost`: soukromá místnost viditelná jen pro zaměstnance s oprávněním `contentApi.chat.host`. ID místnosti je na serveru zašifrované (`GET /streamingServices/:id/hostChat`), aby ho běžné stahování dat z webu neodhalilo.

`B1App/src/helpers/StreamChatManager.ts` spouští obě místnosti pomocí jednotných primitiv. Kód socketů specifický pro živý stream už neexistuje.

## Vzory a úskalí

- **Neotevírejte vlastní WebSocket.** `SocketHelper` je singleton záměrně. Pokud potřebujete naslouchat vlastní akci, zaregistrujte handler na existujícím socketu přes `SocketHelper.addHandler`.
- **Neobcházejte `SubscriptionManager`.** Přímá volání `POST /connections` fungují, ale přijdete o počítání odkazů, odložené opuštění a opětovné připojení do místnosti. Skupinový chat i konzumenti soukromých zpráv všichni procházejí přes `SubscriptionManager`.
- **ID handlerů musí být jedinečná pro každou akci.** `SocketHelper.addHandler(action, id, fn)` ukládá handlery podle dvojice `(action, id)`. Pokud použijete stejné ID pro dva posluchače, první se nahradí. Jednotné stores používají ID jako `"ConversationStore-Message"` a `"PresenceStore-Attendance"`, aby se nepletla s ID spotřebitelů.
- **ID místností jsou neprůhledné řetězce.** Většina jsou UUID konverzací, ale systém podporuje také `"alerts"` (notifikace pro jednotlivé osoby), `"content-{type}-{id}"` (syntetické místnosti aktivit) a zašifrovaná ID `streamingLiveHost`.
- **Ověřování se kontroluje na hranici REST, ne na socketu.** Připojení do místnosti pomocí `POST /connections` je povoleno i anonymně. Řízení přístupu probíhá při odeslání zprávy, kde kontroler zpráv rozhoduje, jaké `messageType` smí anonymní volající odeslat.

## Související stránky

- [Architektura notifikací](./architecture/notifications.md) -- Eskalační cesta v aplikaci, push a e-mailu, do které tento přenos přivádí data
- [Koncové body zpráv](./api/endpoints/messaging.md) -- Kompletní REST rozhraní pro zprávy, konverzace, připojení a zařízení
- [Web Push notifikace](./web-push.md) -- Push notifikace prohlížeče, oddělené od doručování socketů na stránce
- [AppHelper](./shared-libraries/app-helper.md) -- Balíček npm, který obsahuje klientské primitivy
- [Struktura modulů](./api/module-structure.md) -- Jak je modul zpráv organizován na straně serveru
