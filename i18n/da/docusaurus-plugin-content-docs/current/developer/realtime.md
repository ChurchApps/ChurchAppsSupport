---
title: "Realtidsarkitektur"
description: "Sådan leverer ChurchApps' WebSocket-lag live chat, tilstedeværelse og notifikationer: socket-håndtryk, rumabonnementer og klientprimitiver til udviklere."
---

# Realtidsarkitektur

<div class="article-intro">

ChurchApps bruger ét WebSocket-baseret leveringsframework til alle realtidsflader: gruppechat, private beskeder, indholdsnoter, chatten i live-streamen og tilstedeværelse/deltagelse. Denne side dokumenterer protokollen, serveren og de klientprimitiver, som forbrugerne bruger.

</div>

## Oversigt

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

Protokollen består af tre dele:

1. **Én vedvarende WebSocket** pr. browserfane, åbnet af `SocketHelper`.
2. **Forbindelsesrækker** (`POST /messaging/connections`) gemt i tabellen `connections`. De markerer et `(socketId, churchId, conversationId)`-par som abonnent på et rum.
3. **Fan-out på serversiden** via `DeliveryHelper.sendConversationMessages()`. Når en besked gemmes (`POST /messaging/messages/send`), læser serveren de matchende forbindelsesrækker og sender en typet payload til hver åben socket.

Der findes hverken Socket.IO, long-polling-fallback eller en separat mikrotjeneste. WebSocket'en kører i samme proces som REST-API'et (`web`-Lambda til HTTP og `socket`-Lambda til WebSocket på AWS; én kombineret proces lokalt og på Railway).

## Porte og transport

| Miljø | HTTP | WebSocket |
|-------|------|-----------|
| Lokal udvikling | `8084` | `ws://localhost:8087` (separat `WebSocketServer`) |
| Railway / Docker / værter med én port (`RAILWAY_ENVIRONMENT` eller `SELF_HOSTED` er sat) | delt | delt HTTP-server (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default`-routes) |

Transportvælgeren er konfigurationen `deliveryProvider`:

- `local` → rå `ws`-bibliotek; klienter forbinder til `MessagingApiSocket` fra `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; serveren sender payloads til aktive forbindelser via `@aws-sdk/client-apigatewaymanagementapi`.

Klienten behøver aldrig at vide, hvilken der bruges. Den taler den samme JSON-protokol under begge.

## Wire-protokol

Hver frame er JSON af formen `PayloadInterface`:

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

### Håndtryk

1. Klienten åbner socket'en og sender den bogstavelige streng `"getId"`.
2. Serveren svarer med `{ action: "socketId", data: "<id>" }`.
3. Klienten gemmer `socketId` og bruger det som tredje koordinat i hvert rumabonnement.

### At deltage i et rum

Et "rum" er blot et `(churchId, conversationId)`-par. For at abonnere sender klienten en `Connection`-række:

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

Afsendelsen udløser også en `attendance`-udsendelse i samtalen, så eksisterende abonnenter får at vide, at en ny seer er tilsluttet.

### At sende en besked

`POST /messaging/messages/send` (tilladt for anonyme) eller `POST /messaging/messages/` (kræver login):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Serveren gemmer beskeden. Derefter slår `DeliveryHelper.sendConversationMessages()` alle forbindelsesrækker op for den `conversationId` og sender hver socket en `{ action: "message", data: <message> }`-frame.

For indholdsbundne samtaler (f.eks. noter knyttet til en person) udsendes en anden besked med `action: "conversationActivity"` på det syntetiske rum `"content-{type}-{id}"`. Så ved listevisningens forbrugere, at de skal opdatere, uden at den underliggende samtale holdes åben.

### At forlade et rum

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Sletter forbindelsesrækken og udløser en afsluttende `attendance`-udsendelse.

## Komponenter på serversiden

| Fil | Rolle |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Ejer `WebSocketServer`. Tildeler `socketId` ved forbindelse. Kører et heartbeat med ping/pong hvert 30. sekund (`startHeartbeat`), der lukker (`terminate()`) og rydder op i enhver forbindelse, der misser et pong. Rydder døde sockets op og udsender deltagerlisten igen ved afbrydelse. Eksponerer `getLiveSocketIds()` og `reapStaleConnections()`, som bruges af timerjobbet på 30 minutter til at slette forældede `connections`-rækker. Lokalt sker det ved at tjekke, hvilke socketIds der stadig er aktive i processen. På AWS bruges en TTL-sikkerhedsforanstaltning på 24 timer til manglende `$disconnect`-hændelser. API Gateway begrænser forbindelser til ca. 2 timer, så dette kan ikke fjerne en aktiv forbindelse. |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` læser forbindelserne for rummet og sender hver frame til den lokale socket eller AWS API Gateway-forbindelsen. `sendAttendance(churchId, conversationId)` bygger og udsender øjebliksbilledet af seerne. |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` tilslutter, `DELETE /:churchId/:conversationId/:socketId` forlader, `POST /setName` opdaterer visningsnavnet. |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonym) og `POST /` (godkendt) gemmer og sender derefter ud. |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` er sandhedskilden for, hvem der er abonnent. |

## Primitiver på klientsiden (`@churchapps/apphelper`)

Alle fem primitiver er statiske singletons i `apphelper/src/helpers/`. De samarbejder, så hver fane åbner **én** WebSocket, uanset hvor mange komponenter der monteres på siden.

### `SocketHelper`

Ejer den enkelte WebSocket-forbindelse. Gentagne kald af `init()` er idempotente, så flere komponenter kan kalde den uden at åbne dubletsockets. Eksponerer:

- `init()` — åbner (eller genbruger) socket'en og gennemfører `getId`-håndtrykket. Løses, når håndtrykket er gennemført, eller efter en timeout på 5 sekunder, når baggrundsgenforsøgsløkken har overtaget. Den afviser aldrig, så kaldere behøver ikke at håndtere et mislykket første forsøg særskilt.
- `addHandler(action, id, fn)` / `removeHandler(id)` — registrerer og afregistrerer lyttere efter `action`. Flere handlers kan lytte på samme action.
- `setPersonChurch({ personId, churchId })` — for godkendte kaldere; udløser et abonnement på `"alerts"`-rummet, så pushnotifikationer ankommer på denne socket.
- `onSocketIdReady(fn)` — udløses ved hvert nyt socketId, ikke kun det første. Det gælder både det indledende håndtryk og alle efterfølgende genforbindelser. Bruges af `SubscriptionManager` til at tømme ventende tilmeldinger.
- `checkConnection()` — kaldes af de genoptagelseslyttere, der er beskrevet nedenfor. Genopretter forbindelsen straks, hvis socket'en allerede er lukket, eller sender en livstegnsprøve, hvis den ser åben ud.

**Livscyklus for genforbindelse.** En uventet lukning planlægger en genforbindelse med eksponentiel backoff (1 s, fordoblet op til et loft på 30 s). `SocketHelper` lytter også efter `online`, `focus`, `pageshow` og `visibilitychange` på `window`/`document` for at opdage en genoptaget fane. Hvis socket'en allerede er lukket, genopretter den straks og nulstiller backoff. Hvis den ser åben ud, sender den en `"getId"`-livstegnsprøve og tvinger en genforbindelse, hvis ingen frame ankommer inden for 3 sekunder. Det fanger halvåbne sockets, der efterlades, når et mobilt OS suspenderer appen. Ved et vellykket nyt håndtryk sender `SocketHelper` den lokale `"reconnect"`-handling (se [Wire-protokol](#wire-protocol)) til alle registrerede handlers for denne handling.

### `SubscriptionManager`

Rumsmedlemskab med referencetælling. Flere komponenter, der abonnerer på samme samtale, registrerer kun én forbindelsesrække på serversiden.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Tre adfærdsmønstre får forbrugerne gratis:

- **Forsinket afmelding (300 ms)**: Overlever Reacts StrictMode-dobbeltmontering/afmontering og korte genmonteringscyklusser uden at droppe abonnementet på serversiden. `reset()` annullerer også ventende forsinkede afmeldinger.
- **Genindtræden efter genforbindelse**: `SubscriptionManager` husker `personId`/`displayName`, der blev brugt til at deltage i hvert rum. Ved `SocketHelper`s `"reconnect"`-hændelse (og ved hvert kald af `onSocketIdReady`) gensender den alle aktive forbindelsesrækker med identiteten intakt. Genindtrædener deduplikeres pr. socketId, så den samme genforbindelse ikke sender et rum to gange.
- **Sen binding af socketId**: `joinRoom` registrerer hensigten, før socket'en er færdig med håndtrykket. Det faktiske `POST /connections` udløses ved `onSocketIdReady`.

### `ConversationStore`

In-memory-cache nøglet på `conversationId`. Registrerer `message`-, `deleteMessage`- og `privateMessage`-socket-handlers præcis én gang og anvender indgående frames på de samtaler, der er åbne i øjeblikket.

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

Godkendte kaldere får også **hydrering af personer**: `personId`'er på indkommende beskeder slås op til `PersonInterface`-objekter via et cachet `GET /people/ids`-opslag. Anonyme kaldere springer dette over.

Ved `SocketHelper`s `"reconnect"`-hændelse henter `ConversationStore` igen hver samtale, der har aktive `subscribe`-lyttere. Det genskaber beskeder, der blev misset, mens socket'en var nede. Anonyme samtaler springer denne indhentning over, hvis deres `churchId` aldrig blev registreret, fordi indhentningsendpointet kræver et.

### `PresenceStore`

Spejler `ConversationStore`s mønster for `attendance`-handlingen. Abonnenter modtager et `PresenceSnapshot { conversationId, totalViewers, viewers }`, hver gang serveren udsender tilstedeværelsen igen. Identiske øjebliksbilleder deduplikeres, før abonnenterne underrettes, så genforbindelsesstorme ikke udløser unødvendige genrenderinger.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Opstart på topniveau for **godkendte** kaldere. Pakker `SocketHelper.init()` ind, sætter person- og kirkekonteksten (hvilket automatisk tilslutter `"alerts"`-rummet) og kalder `ConversationStore.ensureHandlers()`, `PresenceStore.ensureHandlers()` og `SubscriptionManager.setupRejoin()` præcis én gang. Den registrerer også sin egen `"reconnect"`-handler, der genindlæser tællere for notifikationer og PM, så badges gendannes efter en afbrudt forbindelse.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonyme flows (chatten i live-streamen er det typiske eksempel) springer `NotificationService` over og kalder primitiverne direkte. Se `B1App/src/helpers/StreamChatManager.ts` for en referenceimplementering.

## Live-stream-chat

Live-streamen er det største anonyme forbrugerled i rammeværket. Den bruger to `contentType`s til at afgrænse rum:

- `streamingLive`: den offentlige chatfane på `/stream` (ét rum pr. `streamingService`).
- `streamingLiveHost`: et privat rum, der kun er synligt for medarbejdere med tilladelsen `contentApi.chat.host`. Rum-id'et krypteres på serveren (`GET /streamingServices/:id/hostChat`), så tilfældig scraping ikke afslører det.

`B1App/src/helpers/StreamChatManager.ts` starter begge rum via de samlede primitiver. Der findes ikke længere socket-kode, der er specifik for live-streamen.

## Mønstre og faldgruber

- **Åbn ikke din egen WebSocket.** `SocketHelper` er en singleton af en grund. Hvis du skal lytte efter en tilpasset handling, registrér en handler på den eksisterende socket via `SocketHelper.addHandler`.
- **Omgå ikke `SubscriptionManager`.** Direkte `POST /connections`-kald virker, men de mister referencetælling, forsinket afmelding og genindtræden efter genforbindelse. Forbrugere af gruppechat og PM går alle gennem `SubscriptionManager`.
- **Handler-id'er skal være unikke pr. handling.** `SocketHelper.addHandler(action, id, fn)` nøgler efter `(action, id)`, så hvis samme id genbruges til to lyttere, erstattes den første. De samlede stores bruger id'er som `"ConversationStore-Message"` og `"PresenceStore-Attendance"` for at holde sig væk fra forbrugernes id'er.
- **Rum-id'er er uigennemsigtige strenge.** De fleste er samtale-UUID'er, men systemet understøtter også `"alerts"` (notifikationer pr. person), `"content-{type}-{id}"` (syntetiske aktivitetsrum) og de krypterede `streamingLiveHost`-id'er.
- **Godkendelse kontrolleres ved REST-grænsen, ikke ved socket'en.** Deltagelse i et rum via `POST /connections` er tilladt for anonyme. Adgangskontrollen sker, når en besked sendes. Beskedcontrolleren afgør, hvilke `messageType`s en anonym kalder må sende.

## Relaterede sider

- [Notifikationsarkitektur](./architecture/notifications.md) -- Eskaleringstragten for notifikationer i appen, push og e-mail, som dette transportlag leverer til
- [Beskeds-endpoints](./api/endpoints/messaging.md) -- Den fulde REST-overflade for beskeder, samtaler, forbindelser og enheder
- [Web-push-notifikationer](./web-push.md) -- Browserpush, adskilt fra levering via socket på siden
- [AppHelper](./shared-libraries/app-helper.md) -- npm-pakken, der leverer klientprimitiverne
- [Modulstruktur](./api/module-structure.md) -- Hvordan beskedmodulet er organiseret på serversiden
