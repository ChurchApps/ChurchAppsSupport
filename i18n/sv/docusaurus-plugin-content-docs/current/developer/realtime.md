---
title: "Realtidsarkitektur"
description: "Så levererar ChurchApps WebSocket-lager livechatt, närvaro och notiser: socket-handskakning, rumsprenumerationer och klientprimitiver för utvecklare."
---

# Realtidsarkitektur

<div class="article-intro">

ChurchApps använder ett enda WebSocket-baserat leveransramverk för alla realtidsfunktioner: gruppchatt, privata meddelanden, innehållsanteckningar, livesändningens chatt och närvaro/närvarohistorik. Den här sidan beskriver protokollet, servern och de klientprimitiver som användarna av ramverket använder.

</div>

## Översikt

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

Protokollet består av tre delar:

1. **En beständig WebSocket-anslutning** per webbläsarflik, öppnad av `SocketHelper`.
2. **Anslutningsrader** (`POST /messaging/connections`) som sparas i tabellen `connections`. Dessa markerar en tupel `(socketId, churchId, conversationId)` som en prenumerant på ett rum.
3. **Serverbaserad distribution** via `DeliveryHelper.sendConversationMessages()`. När ett meddelande sparas (`POST /messaging/messages/send`) läser servern de matchande anslutningsraderna och skickar en typad payload till varje öppen socket.

Det finns ingen Socket.IO, ingen reserv med long-polling och ingen separat mikrotjänst. WebSocket-anslutningen körs i samma process som REST-API:et (Lambda `web` för HTTP och Lambda `socket` för WebSocket i AWS, och en gemensam process lokalt och på Railway).

## Portar och transport

| Miljö | HTTP | WebSocket |
|-------|------|-----------|
| Lokal utveckling | `8084` | `ws://localhost:8087` (separat `WebSocketServer`) |
| Railway / Docker / värdar med en enda port (`RAILWAY_ENVIRONMENT` eller `SELF_HOSTED` är satt) | delad | delad HTTP-server (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (rutterna `$connect` / `$disconnect` / `$default`) |

Transportväljaren är konfigurationen `deliveryProvider`:

- `local` → rak `ws`-biblioteket. Klienterna ansluter till `MessagingApiSocket` från `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket. Servern skickar payloads till aktiva anslutningar via `@aws-sdk/client-apigatewaymanagementapi`.

Klienten behöver aldrig veta vilken variant som används. Den använder samma JSON-protokoll i båda fallen.

## Wire-protokoll

Varje ram är JSON med formen `PayloadInterface`:

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

### Handskakning

1. Klienten öppnar socketen och skickar strängen `"getId"`.
2. Servern svarar med `{ action: "socketId", data: "<id>" }`.
3. Klienten sparar `socketId` och använder det som tredje koordinat i varje rumsprenumeration.

### Att gå med i ett rum

Ett "rum" är bara en tupel `(churchId, conversationId)`. För att prenumerera skickar klienten en rad av typen `Connection`:

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

Anropet utlöser också en sändning av `attendance` i konversationen, så att befintliga prenumeranter får veta att en ny tittare har anslutit.

### Att skicka ett meddelande

`POST /messaging/messages/send` (anonymt tillåtet) eller `POST /messaging/messages/` (kräver inloggning):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Servern sparar meddelandet. Därefter letar `DeliveryHelper.sendConversationMessages()` upp alla anslutningsrader för `conversationId` och skickar en ram `{ action: "message", data: <message> }` till varje socket.

För innehållskopplade konversationer (till exempel anteckningar kopplade till en person) skickas en andra sändning med `action: "conversationActivity"` till det syntetiska rummet `"content-{type}-{id}"`. Det gör att listvyer vet att de ska uppdateras utan att behöva hålla den underliggande konversationen öppen.

### Att lämna ett rum

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Anropet tar bort anslutningsraden och utlöser en sista sändning av närvaro.

## Komponenter på servern

| Fil | Roll |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Äger `WebSocketServer`. Tilldelar `socketId` vid anslutning. Kör en ping/pong-heartbeat var 30:e sekund (`startHeartbeat`) som anropar `terminate()` och rensar upp varje anslutning som missar ett pong-svar. Rensar döda sockets och skickar om närvaro vid frånkoppling. Exponerar `getLiveSocketIds()` och `reapStaleConnections()`, som används av timerjobbet var 30:e minut för att ta bort inaktuella rader i `connections`. Lokalt görs det genom att kontrollera vilka socketId:n som fortfarande är aktiva i processen. På AWS fungerar det som ett skyddsnät med 24 timmars TTL för missade händelser `$disconnect`. API Gateway stänger anslutningar efter cirka två timmar, så det här kan inte ta bort en aktiv anslutning |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` läser anslutningarna för rummet och skickar varje ram till antingen den lokala socketen eller AWS API Gateway-anslutningen. `sendAttendance(churchId, conversationId)` bygger och sänder ut ögonblicksbilden av tittarna |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` går med, `DELETE /:churchId/:conversationId/:socketId` lämnar, `POST /setName` uppdaterar visningsnamnet |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonymt) och `POST /` (inloggad) sparar först och distribuerar sedan |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` är den auktoritativa källan för vem som prenumererar |

## Klientprimitiver (`@churchapps/apphelper`)

Alla fem primitiver är statiska singletons i `apphelper/src/helpers/`. De samverkar så att varje flik öppnar **en** WebSocket oavsett hur många komponenter som monteras på sidan.

### `SocketHelper`

Äger den enda WebSocket-anslutningen. Omkommande anrop av `init()` är idempotenta, så flera komponenter kan anropa den utan att öppna dubbla sockets. Exponerar:

- `init()`: öppnar (eller återanvänder) socketen och genomför handskakningen `getId`. Löser sig när handskakningen är klar, eller efter en timeout på 5 sekunder när återförsöksloopen i bakgrunden har tagit över. Den kastar aldrig ett fel, så anropare behöver inte hantera ett misslyckat första anslutningsförsök särskilt.
- `addHandler(action, id, fn)` / `removeHandler(id)`: registrerar respektive avregistrerar lyssnare per `action`. Flera hanterare kan lyssna på samma action.
- `setPersonChurch({ personId, churchId })`: för inloggade anropare. Utlöser en prenumeration på rummet `"alerts"` så att pushnotiser kommer till den här socketen.
- `onSocketIdReady(fn)`: körs vid varje nytt socketId, inte bara det första. Det gäller både den första handskakningen och alla efterföljande återanslutningar. Används av `SubscriptionManager` för att skicka köade anslutningar.
- `checkConnection()`: anropas av lyssnarna för återupptagning nedan. Återansluter direkt om socketen redan är stängd, eller skickar en livskontroll om den ser öppen ut.

**Livscykel för återanslutning.** En oväntad frånkoppling schemalägger en återanslutning med exponentiell backoff (1 sekund, dubblas upp till maximalt 30 sekunder). `SocketHelper` lyssnar också på `online`, `focus`, `pageshow` och `visibilitychange` på `window` och `document` för att upptäcka att en flik har återupptagits. Om socketen redan är stängd återansluter den direkt och nollställer backoffen. Om den ser öppen ut skickar den en livskontroll med `"getId"` och tvingar en återanslutning om ingen ram kommer inom 3 sekunder. Det här fångar halvöppna sockets som finns kvar efter att ett mobilt operativsystem har pausat appen. Vid en lyckad ny handskakning skickar `SocketHelper` den lokala åtgärden `"reconnect"` (se [Wire-protokoll](#wire-protocol)) till alla registrerade hanterare för den åtgärden.

### `SubscriptionManager`

Rumsmedlemskap med referensräkning. Flera komponenter som prenumererar på samma konversation registrerar bara en anslutningsrad på servern.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Tre beteenden som användarna får gratis:

- **Fördröjd avregistrering (300 ms)**: klarar React StrictMode:s dubbla montering och avmontering, och korta cykler där komponenten monteras om, utan att prenumerationen på servern tas bort. `reset()` avbryter också väntande fördröjda avregistreringar.
- **Återanslutning med ny anslutning**: `SubscriptionManager` kommer ihåg `personId` och `displayName` som användes för att gå med i varje rum. Vid händelsen `"reconnect"` i `SocketHelper` (och vid varje anrop av `onSocketIdReady`) skickar den därför om varje aktiv anslutningsrad med identiteten intakt. Nya anslutningar deduplicieras per socketId, så att samma återanslutning inte skickar om ett rum två gånger.
- **Sen bindning av socketId**: `joinRoom` registrerar avsikten innan socketen har slutfört handskakningen. Det faktiska anropet `POST /connections` sker vid `onSocketIdReady`.

### `ConversationStore`

En cache i minnet med `conversationId` som nyckel. Registrerar hanterarna `message`, `deleteMessage` och `privateMessage` för socketen exakt en gång och tillämpar inkommande ramar på de konversationer som för närvarande är öppna.

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

Inloggade anropare får också **hydrering av personer**. `personId` på inkommande meddelanden matchas mot objekt av typen `PersonInterface` via ett cachat anrop till `GET /people/ids`. Anonyma anropare hoppar över det här steget.

Vid händelsen `"reconnect"` i `SocketHelper` hämtar `ConversationStore` på nytt varje konversation som för närvarande har aktiva lyssnare för `subscribe`. Då återfås meddelanden som missades medan socketen var nedkopplad. Anonyma konversationer hoppar över den här ikapp-hämtningen om deras `churchId` aldrig har sparats, eftersom ikapp-slutpunkten kräver ett `churchId`.

### `PresenceStore`

Följer samma mönster som `ConversationStore` för åtgärden `attendance`. Prenumeranter får en `PresenceSnapshot { conversationId, totalViewers, viewers }` varje gång servern skickar om närvaron. Identiska ögonblicksbilder deduplicieras innan prenumeranterna meddelas, så att återanslutningsstormar inte orsakar onödiga omritningar.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Övergripande uppstart för **inloggade** anropare. Omsluter `SocketHelper.init()`, sätter person- och kyrkkontexten (vilket automatiskt går med i rummet `"alerts"`) och anropar `ConversationStore.ensureHandlers()`, `PresenceStore.ensureHandlers()` och `SubscriptionManager.setupRejoin()` exakt en gång. Den registrerar också en egen hanterare för `"reconnect"` som laddar om antalet aviseringar och privata meddelanden, så att märkena återhämtar sig efter en bruten anslutning.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonyma flöden (livesändningens chatt är det typiska exemplet) hoppar över `NotificationService` och anropar primitiverna direkt. Se `B1App/src/helpers/StreamChatManager.ts` för en referensimplementation.

## Livesändningens chatt

Livesändningen är den största anonyma användaren av ramverket. Den använder två `contentType` för att avgränsa rummen:

- `streamingLive`: den offentliga chattfliken på `/stream` (ett rum per `streamingService`).
- `streamingLiveHost`: ett privat rum som bara är synligt för personal med behörigheten `contentApi.chat.host`. Rums-id:t krypteras på servern (`GET /streamingServices/:id/hostChat`) så att enkel skrapning inte avslöjar det.

`B1App/src/helpers/StreamChatManager.ts` startar båda rummen via de enhetliga primitiverna. Det finns inte längre någon socketkod som är specifik för livesändningen.

## Mönster och fallgropar

- **Öppna inte din egen WebSocket.** `SocketHelper` är en singleton av en anledning. Om du behöver lyssna på en egen åtgärd, registrera en hanterare på den befintliga socketen via `SocketHelper.addHandler`.
- **Kringgå inte `SubscriptionManager`.** Direkta anrop av `POST /connections` fungerar, men då förloras referensräkningen, den fördröjda avregistreringen och återanslutningen med ny anslutning. Konsumenter av gruppchatt och privata meddelanden går alla via `SubscriptionManager`.
- **Hanterar-id:n måste vara unika per åtgärd.** `SocketHelper.addHandler(action, id, fn)` indexerar på `(action, id)`. Om samma id används för två lyssnare ersätts den första. De enhetliga butikerna använder id:n som `"ConversationStore-Message"` och `"PresenceStore-Attendance"` för att hålla sig borta från användarnas egna id:n.
- **Rums-id:n är ogenomskinliga strängar.** De flesta är konversations-UUID:n, men systemet stöder även `"alerts"` (aviseringar per person), `"content-{type}-{id}"` (syntetiska aktivitetsrum) och de krypterade id:na för `streamingLiveHost`.
- **Autentisering kontrolleras vid REST-gränssnittet, inte på socketen.** Att gå med i ett rum via `POST /connections` är anonymt tillåtet. Åtkomstkontrollen sker när ett meddelande skickas. Meddelandekontrollern avgör vilka `messageType` en anonym anropare får skicka.

## Relaterade sidor

- [Arkitektur för aviseringar](./architecture/notifications.md) -- Tratten för meddelanden i appen, push och e-post som detta transportlager matar
- [Slutpunkter för meddelanden](./api/endpoints/messaging.md) -- Det fullständiga REST-gränssnittet för meddelanden, konversationer, anslutningar och enheter
- [Webbpush-aviseringar](./web-push.md) -- Push i webbläsaren, separat från leverans via socket i sidan
- [AppHelper](./shared-libraries/app-helper.md) -- npm-paketet som levererar klientprimitiverna
- [Modulstruktur](./api/module-structure.md) -- Hur meddelandemodulen är organiserad på servern
