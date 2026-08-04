---
title: "Sanntidsarkitektur"
---

# Sanntidsarkitektur

<div class="article-intro">

ChurchApps bruker ett enkelt WebSocket-basert leveringsrammeverk for hver sanntidsflate — gruppechat, private meldinger, innholdsnotater, live stream-chatten og oppmøte/tilstedeværelse. Denne siden dokumenterer protokollen, serveren og klientprimitivene som konsumentene bruker.

</div>

## Oversikt

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

Protokollen har tre deler:

1. **Én vedvarende WebSocket** per nettleserfane, åpnet av `SocketHelper`.
2. **Tilkoblingsrader** (`POST /messaging/connections`) registrert i `connections`-tabellen — disse markerer en `(socketId, churchId, conversationId)`-tuppel som abonnent på et rom.
3. **Server-side fan-out** av `DeliveryHelper.sendConversationMessages()` — når en melding lagres (`POST /messaging/messages/send`), leser serveren de tilhørende tilkoblingsradene og sender en typet nyttelast til hver åpne socket.

Det finnes ingen Socket.IO, ingen long-polling-fallback, og ingen egen mikrotjeneste. WebSocket-en kjører i samme prosess som REST-API-et (`web`-Lambda for HTTP, `socket`-Lambda for WebSocket i AWS; én kombinert prosess lokalt og på Railway).

## Porter og transport

| Miljø | HTTP | WebSocket |
|-------------|------|-----------|
| Lokal utvikling   | `8084` | `ws://localhost:8087` (separat `WebSocketServer`) |
| Railway / Docker / verter med én port (`RAILWAY_ENVIRONMENT` eller `SELF_HOSTED` satt) | delt | delt HTTP-server (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (ruter `$connect` / `$disconnect` / `$default`) |

Transportvelgeren er `deliveryProvider`-konfigurasjonen:

- `local` → rått `ws`-bibliotek; klienter kobler til `MessagingApiSocket` fra `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; serveren sender nyttelaster til aktive tilkoblinger via `@aws-sdk/client-apigatewaymanagementapi`.

Klienten trenger aldri å vite hvilken som er i bruk — den snakker samme JSON-protokoll uansett.

## Ledningsprotokoll

Hver ramme er JSON av formen `PayloadInterface`:

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

### Håndtrykk

1. Klienten åpner socket-en og sender den bokstavelige strengen `"getId"`.
2. Serveren svarer med `{ action: "socketId", data: "<id>" }`.
3. Klienten lagrer `socketId`-en og bruker den som tredje koordinat for hvert romabonnement.

### Å bli med i et rom

Et «rom» er bare en `(churchId, conversationId)`-tuppel. For å abonnere sender klienten en `Connection`-rad:

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

Å poste utløser også en `attendance`-kringkasting på samtalen, slik at eksisterende abonnenter får vite at en ny seer har blitt med.

### Å sende en melding

`POST /messaging/messages/send` (anonymt tillatt) eller `POST /messaging/messages/` (autentisering påkrevd):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Serveren lagrer meldingen, deretter slår `DeliveryHelper.sendConversationMessages()` opp hver tilkoblingsrad for den `conversationId`-en og sender hver socket en `{ action: "message", data: <message> }`-ramme.

For innholdsbundne samtaler (f.eks. notater knyttet til en person) utløses en andre kringkasting med `action: "conversationActivity"` på det syntetiske `"content-{type}-{id}"`-rommet, slik at listevisningskonsumenter vet at de skal oppdatere uten å måtte holde den underliggende samtalen åpen.

### Å forlate et rom

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Fjerner tilkoblingsraden og utløser en siste oppmøtekringkasting.

## Komponenter på serversiden

| Fil | Rolle |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Eier `WebSocketServer`. Tildeler `socketId` ved tilkobling. Kjører en 30-sekunders ping/pong-hjerteslag (`startHeartbeat`) som `terminate()`-er og rydder opp enhver tilkobling som mister et pong. Rydder opp døde socketer og utløser en ny oppmøtekringkasting ved frakobling. Eksponerer `getLiveSocketIds()` og `reapStaleConnections()`, brukt av 30-minutters-timerjobben for å slette utdaterte `connections`-rader — lokalt ved å sjekke hvilke socketId-er som fortsatt lever in-process, på AWS som en 24-timers TTL-sikkerhetsmekanisme for uteblitte `$disconnect`-hendelser (API Gateway begrenser tilkoblinger til ~2 timer, så dette kan ikke høste en aktiv tilkobling) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` leser tilkoblinger for rommet og ruter hver ramme til den lokale socket-en eller AWS API Gateway-tilkoblingen. `sendAttendance(churchId, conversationId)` bygger og kringkaster øyeblikksbildet av seere |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` blir med, `DELETE /:churchId/:conversationId/:socketId` forlater, `POST /setName` oppdaterer visningsnavn |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonymt) og `POST /` (autentisert) lagrer, deretter distribuerer |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` er kilden til sannhet for hvem som er abonnert |

## Klientsideprimitiver (`@churchapps/apphelper`)

Alle fem primitivene er statiske singletoner i `apphelper/src/helpers/`. De samarbeider slik at hver fane åpner **én** WebSocket, uansett hvor mange komponenter som monteres på siden.

### `SocketHelper`

Eier den enkelte WebSocket-tilkoblingen. Re-entrant `init()` er idempotent — flere komponenter kan kalle den uten å åpne dupliserte socketer. Eksponerer:

- `init()` — åpne (eller gjenbruke) socket-en og fullføre `getId`-håndtrykket. Løses når håndtrykket fullføres, eller etter en 5-sekunders timeout, når bakgrunns-forsøksløkken har tatt over; den avvises aldri, så kallere trenger ikke spesialbehandle en mislykket første tilkobling.
- `addHandler(action, id, fn)` / `removeHandler(id)` — registrer/avregistrer lyttere etter `action`. Flere behandlere kan lytte til samme handling.
- `setPersonChurch({ personId, churchId })` — for autentiserte kallere; utløser et `"alerts"`-romabonnement slik at push-varsler ankommer på denne socket-en.
- `onSocketIdReady(fn)` — utløses ved hver nye socketId, ikke bare den første — det innledende håndtrykket og hver påfølgende gjentilkobling. Brukt av `SubscriptionManager` for å tømme ventende innmeldinger.
- `checkConnection()` — kalt av resume-lytterne nedenfor; kobler til på nytt umiddelbart hvis socket-en allerede er lukket, eller sender en levendehetssjekk hvis den ser åpen ut.

**Livssyklus for gjentilkobling.** En uventet lukking planlegger en gjentilkobling med eksponentiell tilbaketrekking (1 sekund, doblende opp til et tak på 30 sekunder). `SocketHelper` lytter også etter `online`, `focus`, `pageshow` og `visibilitychange` på `window`/`document` for å oppdage en gjenopptatt fane: hvis socket-en allerede er lukket, kobler den til på nytt umiddelbart og tilbakestiller tilbaketrekkingen; hvis den ser åpen ut, sender den en `"getId"`-levendehetssjekk og tvinger frem en gjentilkobling hvis ingen ramme ankommer innen 3 sekunder — dette fanger opp halvåpne socketer som er etterlatt etter at et mobil-OS suspenderer appen. Ved et vellykket nytt håndtrykk sender `SocketHelper` den lokale `"reconnect"`-handlingen (se [Ledningsprotokoll](#ledningsprotokoll)) til hver registrerte behandler for den handlingen.

### `SubscriptionManager`

Referansetalt rommedlemskap. Flere komponenter som abonnerer på samme samtale registrerer bare én tilkoblingsrad på serversiden.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Tre atferder konsumenter får gratis:

- **Utsatt forlating (300 ms)** — overlever React StrictModes dobbeltmontering/avmontering og korte gjenmonteringssykluser uten å miste abonnementet på serversiden; `reset()` avbryter også eventuelle ventende utsatte forlatinger.
- **Gjentilkobling med gjeninnmelding** — `SubscriptionManager` husker `personId`/`displayName` som ble brukt til å bli med i hvert rom, så ved `SocketHelper`s `"reconnect"`-hendelse (og ved hvert `onSocketIdReady`-kall) sender den på nytt hver aktive tilkoblingsrad med identiteten intakt. Gjeninnmeldinger dedupliseres per socketId, slik at samme gjentilkobling ikke sender et rom på nytt to ganger.
- **Sen binding av socketId** — `joinRoom` registrerer intensjonen før socket-en fullfører håndtrykket sitt; den faktiske `POST /connections` utløses ved `onSocketIdReady`.

### `ConversationStore`

In-memory-cache nøkkelt på `conversationId`. Registrerer `message` / `deleteMessage` / `privateMessage`-socket-behandlere nøyaktig én gang og anvender innkommende rammer på hvilke samtaler som for øyeblikket er åpne.

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

Autentiserte kallere får også **personhydrering** — `personId`-er på innkommende meldinger løses opp til `PersonInterface`-objekter via et cachet `GET /people/ids`-oppslag. Anonyme kallere hopper over dette.

Ved `SocketHelper`s `"reconnect"`-hendelse henter `ConversationStore` på nytt hver samtale som for øyeblikket har aktive `subscribe`-lyttere, og gjenoppretter meldinger som gikk tapt mens socket-en var nede. Anonyme samtaler hopper over denne oppdateringen hvis `churchId`-en deres aldri ble registrert (oppdateringsendepunktet krever en).

### `PresenceStore`

Speiler `ConversationStore`s mønster for `attendance`-handlingen. Abonnenter mottar et `PresenceSnapshot { conversationId, totalViewers, viewers }` hver gang serveren kringkaster tilstedeværelse på nytt. Identiske øyeblikksbilder dedupliseres før varsling, slik at gjentilkoblingsstormer ikke utløser unødvendige re-renderinger.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Oppstart på toppnivå for **autentiserte** kallere. Pakker inn `SocketHelper.init()`, setter person-/kirkekonteksten (som automatisk melder inn i `"alerts"`-rommet), og kaller `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` nøyaktig én gang. Den registrerer også sin egen `"reconnect"`-behandler som laster inn varslings-/PM-tellinger på nytt, slik at merker gjenopprettes etter en droppet tilkobling.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonyme flyter (live stream-chatten er det kanoniske eksempelet) hopper over `NotificationService` og kaller primitivene direkte — se `B1App/src/helpers/StreamChatManager.ts` for en referanseimplementasjon.

## Live stream-chat

Live streamen er den største anonyme konsumenten av rammeverket. Den bruker to `contentType`-er for romavgrensning:

- `streamingLive` — den offentlige chattefanen på `/stream` (ett rom per `streamingService`).
- `streamingLiveHost` — et privat rom synlig bare for stab med tillatelsen `contentApi.chat.host`. Rom-ID-en er kryptert på serveren (`GET /streamingServices/:id/hostChat`) slik at tilfeldig skraping ikke avslører den.

`B1App/src/helpers/StreamChatManager.ts` starter begge rommene via de enhetlige primitivene — det finnes ikke lenger noen live-stream-spesifikk socket-kode.

## Mønstre og fallgruver

- **Ikke åpne din egen WebSocket.** `SocketHelper` er en singleton av en grunn. Hvis du trenger å lytte etter en egendefinert handling, registrer en behandler på den eksisterende socket-en via `SocketHelper.addHandler`.
- **Ikke omgå `SubscriptionManager`.** Direkte `POST /connections`-kall fungerer, men mister referansetelling, utsatt forlating og gjentilkobling med gjeninnmelding. Gruppechat- og PM-konsumenter går alle gjennom `SubscriptionManager`.
- **Behandler-ID-er må være unike per handling.** `SocketHelper.addHandler(action, id, fn)` nøkler etter `(action, id)`; gjenbruk av samme ID for to lyttere erstatter den første. De enhetlige lagrene bruker ID-er som `"ConversationStore-Message"` og `"PresenceStore-Attendance"` for å holde seg unna konsument-ID-er.
- **Rom-ID-er er ugjennomsiktige strenger.** De fleste er samtale-UUID-er, men systemet støtter også `"alerts"` (varsler per person), `"content-{type}-{id}"` (syntetiske aktivitetsrom), og de krypterte `streamingLiveHost`-ID-ene.
- **Autentisering sjekkes ved REST-grensen, ikke ved socket-en.** Å bli med i et rom via `POST /connections` er anonymt tillatt; tilgangskontroll skjer ved meldingssending (meldingskontrolleren avgjør hvilke `messageType`-er en anonym kaller kan sende).

## Relaterte sider

- [Varslingsarkitektur](./architecture/notifications) -- Eskaleringstrakten for i-app/push/e-post som denne transporten mater inn i
- [Meldingsendepunkter](./api/endpoints/messaging) -- Fullstendig REST-overflate for meldinger, samtaler, tilkoblinger, enheter
- [Web push-varsler](./web-push) -- Nettleser-push, atskilt fra sanntidslevering på siden
- [AppHelper](./shared-libraries/app-helper) -- npm-pakken som leverer klientprimitivene
- [Modulstruktur](./api/module-structure) -- Hvordan meldingsmodulen er organisert på serversiden
