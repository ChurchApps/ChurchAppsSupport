---
title: "Realtime-architectuur"
---

# Realtime-architectuur

<div class="article-intro">

ChurchApps gebruikt één op WebSocket gebaseerd leveringsframework voor elk realtime-onderdeel: groepschat, privéberichten, notities bij inhoud, de chat van de livestream en aanwezigheid. Deze pagina beschrijft het protocol, de server en de clientprimitieven die gebruikers toepassen.

</div>

## Overzicht

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

Het protocol bestaat uit drie onderdelen:

1. **Eén persistente WebSocket** per browsertabblad, geopend door `SocketHelper`.
2. **Verbindingsrijen** (`POST /messaging/connections`) die worden opgeslagen in de tabel `connections`. Deze markeren een `(socketId, churchId, conversationId)`-tupel als abonnee van een room.
3. **Fan-out aan de serverkant** door `DeliveryHelper.sendConversationMessages()`. Wanneer een bericht wordt opgeslagen (`POST /messaging/messages/send`), leest de server de bijbehorende verbindingsrijen en stuurt een getypeerde payload naar elke open socket.

Er is geen Socket.IO, geen long-polling als terugvaloptie en geen afzonderlijke microservice. De WebSocket draait in hetzelfde proces als de REST-API (de `web`-Lambda voor HTTP en de `socket`-Lambda voor WebSocket in AWS; één gecombineerd proces lokaal en op Railway).

## Poorten en transport

| Omgeving | HTTP | WebSocket |
|-------------|------|-----------|
| Lokale ontwikkeling   | `8084` | `ws://localhost:8087` (aparte `WebSocketServer`) |
| Railway / Docker / hosts met één poort (`RAILWAY_ENVIRONMENT` of `SELF_HOSTED` ingesteld) | gedeeld | gedeelde HTTP-server (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (routes `$connect` / `$disconnect` / `$default`) |

De transportkeuze wordt bepaald door de configuratie `deliveryProvider`:

- `local` → ruwe `ws`-bibliotheek; clients verbinden met `MessagingApiSocket` uit `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; de server stuurt payloads naar actieve verbindingen via `@aws-sdk/client-apigatewaymanagementapi`.

De client hoeft niet te weten welke variant wordt gebruikt. Hij spreekt in beide gevallen hetzelfde JSON-protocol.

## Wire-protocol

Elk frame is JSON met de vorm `PayloadInterface`:

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

### Handshake

1. De client opent de socket en stuurt de letterlijke string `"getId"`.
2. De server antwoordt met `{ action: "socketId", data: "<id>" }`.
3. De client slaat de `socketId` op en gebruikt die als derde coördinaat bij elk roomabonnement.

### Deelnemen aan een room

Een "room" is simpelweg een tupel `(churchId, conversationId)`. Om zich te abonneren, plaatst de client een `Connection`-rij:

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

Dit plaatsen activeert ook een `attendance`-broadcast in het gesprek, zodat bestaande abonnees weten dat er een nieuwe kijker is bijgekomen.

### Een bericht versturen

`POST /messaging/messages/send` (anoniem toegestaan) of `POST /messaging/messages/` (authenticatie vereist):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

De server slaat het bericht op. Daarna zoekt `DeliveryHelper.sendConversationMessages()` alle verbindingsrijen voor die `conversationId` op en stuurt elke socket een frame `{ action: "message", data: <message> }`.

Voor gesprekken die aan inhoud zijn gekoppeld (bijvoorbeeld notities bij een persoon) wordt een tweede broadcast met `action: "conversationActivity"` verstuurd naar de synthetische room `"content-{type}-{id}"`. Zo weten lijstweergaven dat ze moeten verversen, zonder het onderliggende gesprek open te hoeven houden.

### Een room verlaten

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Dit verwijdert de verbindingsrij en activeert een laatste attendance-broadcast.

## Componenten aan de serverkant

| Bestand | Rol |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Beheert de `WebSocketServer`. Kent een `socketId` toe bij verbinding. Voert elke 30 seconden een ping/pong-heartbeat uit (`startHeartbeat`) die elke verbinding die geen pong terugstuurt, beëindigt en opruimt. Ruimt dode sockets op en activeert bij verbreking een herberekening van de aanwezigheid. Biedt `getLiveSocketIds()` en `reapStaleConnections()`, die worden gebruikt door de timerjob van 30 minuten om verouderde rijen in `connections` te verwijderen. Lokaal gebeurt dit door te controleren welke socketIds nog actief zijn in het proces. Op AWS dient het als vangnet met een TTL van 24 uur voor gemiste `$disconnect`-events. API Gateway beëindigt verbindingen na ongeveer 2 uur, dus hiermee wordt nooit een actieve verbinding opgeruimd. |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` leest de verbindingen voor de room en stuurt elk frame naar de lokale socket of naar de AWS API Gateway-verbinding. `sendAttendance(churchId, conversationId)` bouwt de snapshot van kijkers op en verstuurt die. |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` treedt toe, `DELETE /:churchId/:conversationId/:socketId` verlaat, `POST /setName` werkt de weergavenaam bij. |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anoniem) en `POST /` (geauthenticeerd) slaan op en verspreiden daarna. |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` is de bron van waarheid voor wie er geabonneerd is. |

## Client-primitieven (`@churchapps/apphelper`)

Alle vijf primitieven zijn statische singletons in `apphelper/src/helpers/`. Ze werken samen, zodat elk tabblad **één** WebSocket opent, ongeacht hoeveel componenten op de pagina worden geladen.

### `SocketHelper`

Beheert de enkele WebSocket-verbinding. Herhaalde aanroepen van `init()` hebben geen extra effect: meerdere componenten kunnen het aanroepen zonder dubbele sockets te openen. Biedt:

- `init()`: opent (of hergebruikt) de socket en voltooit de `getId`-handshake. Wordt opgelost zodra de handshake klaar is of, na een time-out van 5 seconden, zodra de achtergrondlus voor opnieuw proberen het overneemt. Er wordt nooit een fout teruggegeven, zodat aanroepers geen aparte afhandeling nodig hebben voor een mislukte eerste verbinding.
- `addHandler(action, id, fn)` / `removeHandler(id)`: registreert en verwijdert listeners op basis van `action`. Meerdere handlers kunnen naar dezelfde actie luisteren.
- `setPersonChurch({ personId, churchId })`: voor geauthenticeerde aanroepers. Activeert een abonnement op de room `"alerts"`, zodat pushmeldingen via deze socket binnenkomen.
- `onSocketIdReady(fn)`: wordt bij elke nieuwe socketId aangeroepen, niet alleen bij de eerste. Dit omvat de eerste handshake en elke latere herverbinding. `SubscriptionManager` gebruikt dit om openstaande deelnames te verwerken.
- `checkConnection()`: wordt aangeroepen door de hervatlisteners hieronder. Maakt meteen opnieuw verbinding als de socket al gesloten is, of stuurt een levenscontrole als de socket open lijkt.

**Levenscyclus van herverbinding.** Een onverwachte sluiting plant een nieuwe verbinding met exponentiële vertraging (1 seconde, verdubbelend tot een maximum van 30 seconden). `SocketHelper` luistert ook naar `online`, `focus`, `pageshow` en `visibilitychange` op `window` en `document`, om een hervatte tab te herkennen. Als de socket al gesloten is, maakt het meteen opnieuw verbinding en zet de vertraging terug. Als de socket open lijkt, stuurt het een levenscontrole `"getId"` en dwingt het een nieuwe verbinding af als er binnen 3 seconden geen frame komt. Zo worden halfopen sockets opgevangen die achterblijven nadat een mobiel besturingssysteem de app heeft onderbroken. Bij een geslaagde nieuwe handshake verstuurt `SocketHelper` de lokale actie `"reconnect"` (zie [Wire-protocol](#wire-protocol)) naar elke geregistreerde handler voor die actie.

### `SubscriptionManager`

Beheert roomlidmaatschap met referentietelling. Meerdere componenten die zich op hetzelfde gesprek abonneren, registreren maar één verbindingsrij aan de serverkant.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Drie gedragingen die gebruikers gratis krijgen:

- **Uitgestelde verlaging (300 ms)**: overleeft het dubbele mount/unmount-gedrag van React StrictMode en korte hermount-cycli zonder het abonnement aan de serverkant te verliezen. `reset()` annuleert ook alle openstaande uitgestelde verlagingen.
- **Opnieuw deelnemen na herverbinding**: `SubscriptionManager` onthoudt de `personId` en `displayName` waarmee elke room is betreden. Bij het `"reconnect"`-event van `SocketHelper` (en bij elke aanroep van `onSocketIdReady`) plaatst het opnieuw elke actieve verbindingsrij, met de identiteit intact. Deelnames worden per socketId ontdubbeld, zodat dezelfde herverbinding een room niet twee keer opnieuw plaatst.
- **Late koppeling van socketId**: `joinRoom` registreert de intentie voordat de socket de handshake heeft voltooid. De daadwerkelijke `POST /connections` wordt uitgevoerd bij `onSocketIdReady`.

### `ConversationStore`

Cache in het geheugen, gesleuteld op `conversationId`. Registreert de socket-handlers voor `message`, `deleteMessage` en `privateMessage` precies één keer en past inkomende frames toe op de gesprekken die op dat moment open zijn.

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

Geauthenticeerde aanroepers krijgen ook **het ophalen van personen**: `personId`-waarden in binnenkomende berichten worden via een gecachete `GET /people/ids`-opvraging omgezet naar `PersonInterface`-objecten. Anonieme aanroepers slaan deze stap over.

Bij het `"reconnect"`-event van `SocketHelper` haalt `ConversationStore` opnieuw elk gesprek op dat op dat moment actieve `subscribe`-listeners heeft. Zo worden berichten hersteld die gemist zijn terwijl de socket niet verbonden was. Anonieme gesprekken slaan deze inhaalslag over als hun `churchId` nooit is vastgelegd, omdat het inhaal-endpoint die vereist.

### `PresenceStore`

Volgt hetzelfde patroon als `ConversationStore`, maar voor de actie `attendance`. Abonnees ontvangen een `PresenceSnapshot { conversationId, totalViewers, viewers }` telkens wanneer de server de aanwezigheid opnieuw uitzendt. Identieke snapshots worden ontdubbeld voordat er een melding wordt gestuurd, zodat herverbindingsstormen geen onnodige hertekeningen veroorzaken.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Het opstartpunt op het hoogste niveau voor **geauthenticeerde** aanroepers. Het omhult `SocketHelper.init()`, stelt de context van persoon en kerk in (waardoor de room `"alerts"` automatisch wordt betreden) en roept `ConversationStore.ensureHandlers()`, `PresenceStore.ensureHandlers()` en `SubscriptionManager.setupRejoin()` precies één keer aan. Daarnaast registreert het een eigen handler voor `"reconnect"`, die de telling van meldingen en privéberichten opnieuw laadt, zodat de badges herstellen na een verbroken verbinding.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonieme stromen (de chat van de livestream is het bekendste voorbeeld) slaan `NotificationService` over en roepen de primitieven rechtstreeks aan. Zie `B1App/src/helpers/StreamChatManager.ts` voor een referentie-implementatie.

## Chat van de livestream

De livestream is de grootste anonieme gebruiker van het framework. Het gebruikt twee `contentType`-waarden voor het bepalen van de scope van rooms:

- `streamingLive`: de openbare chattab op `/stream` (één room per `streamingService`).
- `streamingLiveHost`: een privéroom die alleen zichtbaar is voor medewerkers met de permissie `contentApi.chat.host`. Het room-id wordt aan de serverkant versleuteld (`GET /streamingServices/:id/hostChat`), zodat casual scraping het niet onthult.

`B1App/src/helpers/StreamChatManager.ts` start beide rooms via de unified primitieven. Er is niet langer socketcode die specifiek voor de livestream is geschreven.

## Patronen en valkuilen

- **Open geen eigen WebSocket.** `SocketHelper` is om een reden een singleton. Als je naar een eigen actie wilt luisteren, registreer dan een handler op de bestaande socket via `SocketHelper.addHandler`.
- **Omzeil `SubscriptionManager` niet.** Directe `POST /connections`-aanroepen werken, maar verliezen de referentietelling, de uitgestelde verlaging en het opnieuw deelnemen na herverbinding. Groepschat- en pm-gebruikers gaan allemaal via `SubscriptionManager`.
- **Handler-id's moeten uniek zijn per actie.** `SocketHelper.addHandler(action, id, fn)` sleutelt op `(action, id)`. Als je hetzelfde id voor twee listeners gebruikt, vervangt de tweede de eerste. De unified stores gebruiken id's zoals `"ConversationStore-Message"` en `"PresenceStore-Attendance"` om niet met id's van andere gebruikers te botsen.
- **Room-id's zijn ondoorzichtige strings.** De meeste zijn gespreks-UUID's, maar het systeem ondersteunt ook `"alerts"` (meldingen per persoon), `"content-{type}-{id}"` (synthetische activiteitsrooms) en de versleutelde `streamingLiveHost`-id's.
- **Authenticatie wordt gecontroleerd op de REST-grens, niet op de socket.** Deelnemen aan een room via `POST /connections` is anoniem toegestaan. Toegangscontrole gebeurt bij het versturen van een bericht. De berichtcontroller bepaalt welke `messageType`-waarden een anonieme aanroeper mag versturen.

## Gerelateerde pagina's

- [Notifications Architecture](./architecture/notifications) -- De funnel van in-app-, push- en e-mailmeldingen waarop dit transport aansluit
- [Messaging Endpoints](./api/endpoints/messaging) -- Volledig REST-oppervlak voor berichten, gesprekken, verbindingen en apparaten
- [Web Push Notifications](./web-push) -- Browserpushmeldingen, los van de levering via de socket binnen de pagina
- [AppHelper](./shared-libraries/app-helper) -- Het npm-pakket dat de clientprimitieven bevat
- [Module Structure](./api/module-structure) -- Hoe de messaging-module aan de serverkant is ingedeeld
