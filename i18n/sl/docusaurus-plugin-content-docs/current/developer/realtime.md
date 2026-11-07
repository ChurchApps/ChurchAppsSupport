---
title: "Arhitektura v realnem času"
description: "Kako WebSocket v ChurchApps dostavlja klepet, prisotnost in obvestila v živo: rokovanje, naročnine na sobe in gradniki odjemalca za razvijalce."
---

# Arhitektura v realnem času

<div class="article-intro">

ChurchApps uporablja en sam dostavni sistem na osnovi WebSocket za vse površine v realnem času: skupinski klepet, zasebna sporočila, opombe k vsebini, klepet v živem prenosu ter prisotnost in evidenco udeležbe. Ta stran dokumentira protokol, strežnik in odjemalske gradnike, ki jih uporabljajo odjemalci.

</div>

## Pregled

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

Protokol ima tri dele:

1. **En trajna WebSocket povezava** na brskalniški zavihek, ki jo odpre `SocketHelper`.
2. **Vrstice povezav** (`POST /messaging/connections`), zabeležene v tabeli `connections` – te označujejo nabor `(socketId, churchId, conversationId)` kot naročnika sobe.
3. **Razpošiljanje na strani strežnika** prek `DeliveryHelper.sendConversationMessages()` – ko je sporočilo shranjeno (`POST /messaging/messages/send`), strežnik prebere ustrezne vrstice povezav in vsaki odprti vtičnici pošlje tipiziran paket.

Socket.IO, rezervni način z dolgim anketiranjem (long-polling) in ločen mikrostoritev ni. WebSocket deluje v istem procesu kot REST API (`web` Lambda za HTTP, `socket` Lambda za WebSocket v AWS; en skupni proces lokalno in na Railway).

## Vrata in prenos

| Okolje | HTTP | WebSocket |
|-------------|------|-----------|
| Lokalni razvoj | `8084` | `ws://localhost:8087` (ločen `WebSocketServer`) |
| Railway / Docker / gostitelji z enim vrati (`RAILWAY_ENVIRONMENT` ali `SELF_HOSTED` nastavljena) | skupna | skupni HTTP strežnik (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (poti `$connect` / `$disconnect` / `$default`) |

Izbirnik prenosa je nastavitev `deliveryProvider`:

- `local` → surova knjižnica `ws`; odjemalci se povežejo na `MessagingApiSocket` iz `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; strežnik pošilja pakete aktivnim povezavam prek `@aws-sdk/client-apigatewaymanagementapi`.

Odjemalcu ni treba vedeti, katera možnost je v uporabi – v obeh primerih govori isti JSON protokol.

## Žični protokol

Vsak okvir je JSON oblike `PayloadInterface`:

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

### Rokovanje

1. Odjemalec odpre vtičnico in pošlje dobesedni niz `"getId"`.
2. Strežnik odgovori z `{ action: "socketId", data: "<id>" }`.
3. Odjemalec shrani `socketId` in ga uporabi kot tretjo koordinato pri vsaki naročnini na sobo.

### Pridruževanje sobi

„Soba“ je preprosto nabor `(churchId, conversationId)`. Za naročnino odjemalec pošlje vrstico `Connection`:

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

Objava sproži tudi oddajo `attendance` v pogovoru, da obstoječi naročniki izvejo, da se je pridružil nov gledalec.

### Pošiljanje sporočila

`POST /messaging/messages/send` (dovoljeno tudi anonimno) ali `POST /messaging/messages/` (zahteva prijavo):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Strežnik shrani sporočilo, nato `DeliveryHelper.sendConversationMessages()` poišče vse vrstice povezav za ta `conversationId` in vsaki vtičnici pošlje okvir `{ action: "message", data: <message> }`.

Pri pogovorih, vezanih na vsebino (npr. opombe, pripete osebi), se na sintetični sobi `"content-{type}-{id}"` sproži še ena oddaja z `action: "conversationActivity"`, da pogledi seznamov vedo, kdaj osvežiti podatke, ne da bi morali imeti odprt osnovni pogovor.

### Zapuščanje sobe

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Izbriše vrstico povezave in sproži končno oddajo podatkov o udeležbi.

## Komponente na strežniku

| Datoteka | Vloga |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Upravlja `WebSocketServer`. Ob povezavi dodeli `socketId`. Izvaja 30-sekundni srčni utrip ping/pong (`startHeartbeat`), ki prekine (`terminate()`) in počisti vsako povezavo, ki ne odgovori s pong. Počisti mrtve vtičnice in ob odklopu ponovno oddaja udeležbo. Izpostavlja `getLiveSocketIds()` in `reapStaleConnections()`, ki ju uporablja časovnik na 30 minut za brisanje zastarelih vrstic v `connections` – lokalno tako, da preveri, kateri socketId so še živi v procesu, v AWS pa kot varnostno omrežje s 24-urnim TTL za zamujene dogodke `$disconnect` (API Gateway omejuje povezave na približno 2 uri, zato ne more pobrisati žive povezave) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` prebere povezave za sobo in vsak okvir usmeri na lokalno vtičnico ali na povezavo AWS API Gateway. `sendAttendance(churchId, conversationId)` pripravi in oddaja pregled gledalcev |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` pridruži, `DELETE /:churchId/:conversationId/:socketId` odjavi, `POST /setName` posodobi prikazno ime |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonimno) in `POST /` (za prijavljene) shranita in nato razpošljeta sporočilo |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` je vir resnice o tem, kdo je naročen |

## Osnovni elementi na odjemalcu (`@churchapps/apphelper`)

Vseh pet osnovnih elementov so statični singletoni v `apphelper/src/helpers/`. Sodelujejo tako, da vsak zavihek odpre **eno** WebSocket povezavo, ne glede na to, koliko komponent se naloži na stran.

### `SocketHelper`

Upravlja eno samo WebSocket povezavo. Ponovno vstopna `init()` je idempotentna – več komponent jo lahko kliče, ne da bi odprle podvojene vtičnice. Izpostavlja:

- `init()` – odpre (ali ponovno uporabi) vtičnico in dokonča rokovanje `getId`. Razreši se, ko je rokovanje končano, ali pa po 5-sekundni časovni omejitvi, ko prevzame zanko ponovnih poskusov v ozadju; nikoli ne zavrne klica, zato klicatelji ne potrebujejo posebne obravnave neuspešne prve povezave.
- `addHandler(action, id, fn)` / `removeHandler(id)` – registrira oziroma odjavi poslušalce po `action`. Več obdelovalcev lahko posluša isto akcijo.
- `setPersonChurch({ personId, churchId })` – za prijavljene klicatelje; sproži naročnino na sobo `"alerts"`, da potisna obvestila prispejo na to vtičnico.
- `onSocketIdReady(fn)` – sproži se ob vsakem novem socketId, ne le prvič – ob začetnem rokovanju in ob vsaki naslednji ponovni povezavi. Uporablja jo `SubscriptionManager`, da izprazni čakajoče pridružitve.
- `checkConnection()` – kliče jo spodnji poslušalci nadaljevanja; če je vtičnica že zaprta, se takoj znova poveže, sicer pošlje preverjanje delovanja (liveness probe).

**Življenjski cikel ponovne povezave.** Nepričakovano zaprtje sproži ponovno povezavo z eksponentnim zakasnjevanjem (1 s, podvojevanje do največ 30 s). `SocketHelper` prav tako posluša `online`, `focus`, `pageshow` in `visibilitychange` na `window`/`document`, da zazna nadaljevanje zavihka: če je vtičnica že zaprta, se takoj znova poveže in ponastavi zakasnjevanje; če je videti odprta, pošlje preverjanje `"getId"` in ponovno vzpostavi povezavo, če v 3 sekundah ne prispe noben okvir – tako zazna napol odprte vtičnice, ki ostanejo, ko mobilni operacijski sistem suspendira aplikacijo. Ob uspešnem ponovnem rokovanju `SocketHelper` pošlje lokalno akcijo `"reconnect"` (glej [Žični protokol](#wire-protocol)) vsakemu registriranemu obdelovalcu te akcije.

### `SubscriptionManager`

Članstvo v sobi s štetjem referenc. Več komponent, ki se naročijo na isti pogovor, registrira samo eno vrstico povezave na strežniku.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Tri vedenja, ki jih uporabniki dobijo brezplačno:

- **Zakasnjen odhod (300 ms)** – preživi dvojno nalaganje in razkladanje v React StrictMode ter kratke cikle ponovnega nalaganja, ne da bi izgubil naročnino na strežniku; `reset()` prekliče tudi vse čakajoče zakasnjene odhode.
- **Ponovna pridružitev po povezavi** – `SubscriptionManager` si zapomni `personId`/`displayName`, uporabljen za pridružitev vsaki sobi, zato ob dogodku `"reconnect"` na `SocketHelper` (in ob vsakem klicu `onSocketIdReady`) ponovno objavi vsako aktivno vrstico povezave z ohranjeno identiteto. Ponovne pridružitve se podvajanja izognejo po socketId, tako da ista ponovna povezava ne objavi sobe dvakrat.
- **Poznavanje socketId kasneje** – `joinRoom` zabeleži namen, preden vtičnica konča rokovanje; dejanski `POST /connections` se sproži ob `onSocketIdReady`.

### `ConversationStore`

Predpomnilnik v pomnilniku, ključen po `conversationId`. Enkrat registrira obdelovalce vtičnic `message` / `deleteMessage` / `privateMessage` in dohodne okvire uporablja za pogovore, ki so trenutno odprti.

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

Prijavljeni klicatelji dobijo tudi **dopolnjevanje oseb** – `personId` na dohodnih sporočilih se prek predpomnjenega klica `GET /people/ids` razreši v objekte `PersonInterface`. Anonimni klicatelji tega koraka preskočijo.

Ob dogodku `"reconnect"` na `SocketHelper` `ConversationStore` ponovno pridobi vsak pogovor, ki ima trenutno aktivne poslušalce `subscribe`, in tako obnovi sporočila, zamujena med prekinitvijo. Anonimni pogovori tega dopolnjevanja preskočijo, če njihov `churchId` ni bil zabeležen (končna točka za dopolnjevanje ga zahteva).

### `PresenceStore`

Zrcali vzorec `ConversationStore` za akcijo `attendance`. Naročniki prejmejo `PresenceSnapshot { conversationId, totalViewers, viewers }`, kadar strežnik ponovno odda podatke o prisotnosti. Enaki posnetki se pred obveščanjem odstranijo kot podvojeni, zato valovi ponovnih povezav ne sprožijo nepotrebnih ponovnih izrisov.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Zagon na najvišji ravni za **prijavljene** klicatelje. Ovije `SocketHelper.init()`, nastavi kontekst osebe/cerkve (kar samodejno pridruži sobo `"alerts"`) in natanko enkrat pokliče `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()`. Registrira tudi lasten obdelovalec `"reconnect"`, ki znova naloži števce obvestil in zasebnih sporočil, tako da se značke obnovijo po prekinjeni povezavi.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonimni tokovi (klepet v živem prenosu je glavni primer) preskočijo `NotificationService` in neposredno kličejo osnovne elemente – za referenčno izvedbo glejte `B1App/src/helpers/StreamChatManager.ts`.

## Klepet v živem prenosu

Živi prenos je največji anonimni porabnik tega sistema. Za omejitev sob uporablja dva `contentType`:

- `streamingLive` – javni klepetalni zavihek na `/stream` (ena soba na `streamingService`).
- `streamingLiveHost` – zasebna soba, vidna samo osebju z dovoljenjem `contentApi.chat.host`. ID sobe strežnik šifrira (`GET /streamingServices/:id/hostChat`), da površno strganje podatkov ne razkrije sobe.

`B1App/src/helpers/StreamChatManager.ts` zažene obe sobi prek poenotenih osnovnih elementov – posebne kode vtičnic za živi prenos ni več.

## Vzorci in pogoste napake

- **Ne odpirajte lastne WebSocket povezave.** `SocketHelper` je singleton z namenom. Če morate poslušati lastno akcijo, registrirajte obdelovalec na obstoječi vtičnici prek `SocketHelper.addHandler`.
- **Ne zaobidite `SubscriptionManager`.** Neposredni klici `POST /connections` delujejo, vendar izgubijo štetje referenc, zakasnjen odhod in ponovno pridružitev po povezavi. Vsi porabniki skupinskega klepeta in zasebnih sporočil uporabljajo `SubscriptionManager`.
- **ID-ji obdelovalcev morajo biti edinstveni za vsako akcijo.** `SocketHelper.addHandler(action, id, fn)` ključ določa po `(action, id)`; če isti ID uporabite za dva poslušalca, prvi nadomesti drugi. Poenoteni shranjevalniki uporabljajo ID-je, kot sta `"ConversationStore-Message"` in `"PresenceStore-Attendance"`, da se izognejo trkom z ID-ji porabnikov.
- **ID-ji sob so neprozorni nizi.** Večina so UUID-ji pogovorov, sistem pa podpira tudi `"alerts"` (obvestila posameznih oseb), `"content-{type}-{id}"` (sintetične sobe aktivnosti) in šifrirane ID-je `streamingLiveHost`.
- **Preverjanje prijave poteka na meji REST, ne na vtičnici.** Pridružitev sobi prek `POST /connections` je dovoljena anonimno; nadzor dostopa poteka ob pošiljanju sporočila (krmilnik sporočil odloči, katere `messageType` lahko pošlje anonimni klicatelj).

## Sorodne strani

- [Arhitektura obvestil](./architecture/notifications.md) -- Lij za obvestila v aplikaciji/potisna/e-poštna obvestila, v katerega se stekajo ti podatki
- [Končne točke sporočanja](./api/endpoints/messaging.md) -- Celotna REST površina za sporočila, pogovore, povezave, naprave
- [Potisna obvestila v brskalniku](./web-push.md) -- Potisna obvestila v brskalniku, ločena od dostave prek vtičnice na strani
- [AppHelper](./shared-libraries/app-helper.md) -- Paket npm, ki vsebuje odjemalske osnovne elemente
- [Struktura modulov](./api/module-structure.md) -- Kako je modul sporočanja organiziran na strežniku
