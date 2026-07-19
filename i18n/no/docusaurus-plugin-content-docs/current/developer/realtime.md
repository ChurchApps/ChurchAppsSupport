---
title: "Sanntidsarkitektur"
---

# Sanntidsarkitektur

<div class="article-intro">

ChurchApps bruker et enkelt WebSocket-basert leveringsrammeverk for hver sanntidsflate -- gruppesamtale, private meldinger, innholdsnotater, live stream-chatten og fremmøte/oppmøte. Denne siden dokumenterer protokollen, serveren og klientprimitivene som forbrukere bruker.

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

1. **En vedvarende WebSocket** per nettleserkategori, åpnet av `SocketHelper`.
2. **Tilkoblinggrader** (`POST /messaging/connections`) registrert i `connections`-tabellen -- disse markerer en `(socketId, churchId, conversationId)`-tuppel som abonnent på et rom.
3. **Server-side fan-out** av `DeliveryHelper.sendConversationMessages()` -- når en melding blir lagret (`POST /messaging/messages/send`), leser serveren passende tilkoblinggrader og skyver en typifisert nyttelast til hver åpen socket.

Det er ingen Socket.IO, ingen long-polling fallback, og ingen egen mikrotjeneste. WebSocket kjøres i samme prosess som REST API-en (`web` Lambda for HTTP, `socket` Lambda for WebSocket i AWS; en kombinert prosess lokalt og på Railway).

## Porter og transport

| Miljø | HTTP | WebSocket |
|-------------|------|-----------|
| Lokal dev   | `8084` | `ws://localhost:8087` (separat `WebSocketServer`) |
| Railway / enkeltport-verter | delt | delt HTTP-server (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default` ruter) |

Transportvelgeren er `deliveryProvider`-konfigurasjonen:

- `local` → rå `ws`-bibliotek; klienter kobler til `MessagingApiSocket` fra `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; serveren sender nyttelast til aktive forbindelser via `@aws-sdk/client-apigatewaymanagementapi`.

Klienten trenger aldri å vite hvilken som brukes -- den snakker samme JSON-protokoll uansett.

## Ledningsprotokoll

Hver ramme er JSON av form `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // rommet -- vanligvis en UUID, noen ganger "alerts" eller "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → klient, etter tilkobling, bærer socketId for bruk ved romjoining
  | "message"             // server → klient, ny melding
  | "deleteMessage"       // server → klient, melding fjernet
  | "privateMessage"      // server → klient, badge-count-ping til mottakerens "alerts"-rom når en direktemelding eskaleres; selv meldingskroppen ankommer via ordinær "message"-handling inne i åpen samtale
  | "reaction"            // server → klient, emoji-reaksjon aktivert/deaktivert på en melding; data er { messageId, conversationId, personId, emoji, added } (added=false betyr fjernet). Broadcast til samtalerommet av POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → klient, sekundær "noe skjedde"-signal for content-room-abonnenter
  | "attendance"          // server → klient, viserliste / fremmøte-øyeblikksbilde
  | "notification"        // server → klient, generisk varsling (tellinger, osv.)
  | "reconnect"           // klient-intern, sendt lokalt av SocketHelper etter at ny socketId-handshake fullføres etter et fall -- enten eksponentiell-backoff-tilkoblelse etter uventet lukking, eller umiddelbar tilkoblelse utløst av resume-sonde (tab-fokus/visibility/online); aldri sendt av serveren
  | "alert" | "callout";  // arv, se Connections-endepunkt-referanse
```

### Handshake

1. Klient åpner socketen og sender den bokstavelige strengen `"getId"`.
2. Server svarer med `{ action: "socketId", data: "<id>" }`.
3. Klient lagrer `socketId` og bruker den som tredje koordinat for hver romabonnement.

### Å jobbe i et rom

Et "rom" er bare en `(churchId, conversationId)`-tuppel. For å abonnere, sender klienten en `Connection`-rad:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // valgfritt; null for anonyme live stream-seere
    "displayName": "Anonymous4823"
  }
]
```

Posting utløser også en `attendance`-broadcast på samtalen så eksisterende abonnenter lærer at en ny ser har blitt med.

### Å sende en melding

`POST /messaging/messages/send` (anonym-tillatt) eller `POST /messaging/messages/` (auth-krevd):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Serveren lagrer meldingen, deretter `DeliveryHelper.sendConversationMessages()` slår opp hver tilkoblinggrad for den `conversationId` og sender hver socket en `{ action: "message", data: <message> }`-ramme.

For innholdsbundne samtaler (f.eks. notater vedlagt en person), en andre broadcast med `action: "conversationActivity"` brann på det syntetiske `"content-{type}-{id}"`-rommet slik at listevisningsforbrukere veter å oppfriske uten å holde den underliggende samtalen åpen.

### Å forlate et rom

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Sletter tilkoblinggraden og utløser en siste attendance-broadcast.

## Server-side-komponenter

| Fil | Rolle |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Eier `WebSocketServer`. Tilordner `socketId` ved tilkobling. Kjører en 30-sekunders ping/pong-hjerteslåg (`startHeartbeat`) som `terminate()`-er og rydder opp enhver tilkobling som mister en pong. Rydder opp døde socketer og utløser et attendance-rebroadcast ved frakobling. Eksponerer `getLiveSocketIds()` og `reapStaleConnections()`, brukt av 30-minutters timer-jobben for å slette stale `connections`-grader -- lokalt ved å sjekke hvilke socketId-er fortsatt lever in-process, på AWS som 24h-TTL-backstop for mistet `$disconnect`-hendelser (API Gateway begrenser forbindelser på ~2h, så dette kan ikke høste en aktiv) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` leser tilkoblinger for rommet og ruter hver ramme til den lokale socketen eller AWS API Gateway-forbindelsen. `sendAttendance(churchId, conversationId)` bygger og sender seerbildet |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` joiner, `DELETE /:churchId/:conversationId/:socketId` forlater, `POST /setName` oppdaterer visningsnavn |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonym) og `POST /` (autentisert) lagrer deretter sprer |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` er kilden til sannhet for hvem som abonnerer |

## Klient-side-primitiver (`@churchapps/apphelper`)

Alle fem primitivene er statiske singletons i `apphelper/src/helpers/`. De samarbeider slik at hver fane åpner **en** WebSocket uansett hvor mange komponenter som monteres på siden.

### `SocketHelper`

Eier den enkelte WebSocket-forbindelsen. Re-entrant `init()` er idempotent -- flere komponenter kan kalle den uten å åpne dupliserte socketer. Eksponerer:

- `init()` -- åpne (eller gjenbruke) socketen og fullføre `getId`-handshaken. Løser når handshaken fullføres eller, etter en 5-sekunders timeout, når bakgrunnsgjentakelsesløkken har overtatt; det avvises aldri, så oppringere trenger ikke å særbehandle en mislykket første tilkobling.
- `addHandler(action, id, fn)` / `removeHandler(id)` -- registrer/avregistrer lyttere etter `action`. Flere håndtere kan lytte til samme handling.
- `setPersonChurch({ personId, churchId })` -- for autentiserte oppringere; utløser et `"alerts"`-romabonnement slik at push-varsler ankommer på denne socketen.
- `onSocketIdReady(fn)` -- brann på hver ny socketId, ikke bare den første -- innledende handshake og enhver påfølgende tilkoblelse. Brukt av `SubscriptionManager` for å tømme ventende joiner.
- `checkConnection()` -- påkalt av resume-lytterne nedenfor; gjenkobler umiddelbart hvis socketen allerede er lukket, eller sender en levehetstest hvis den ser åpen ut.

**Tilkoblings-livssyklus.** En uventet lukking planlegger en tilkoblelse med eksponentiell backoff (1s, dobler opp til et 30-sekunds tak). `SocketHelper` lytter også på `online`, `focus`, `pageshow` og `visibilitychange` på `window`/`document` for å oppdage en gjenopptatt fane: hvis sockelen allerede er lukket gjenkobler den umiddelbart og nullstiller backoff; hvis den ser åpen ut, sender den en `"getId"`-levehetstest og tvinger en tilkoblelse hvis ingen ramme ankommer innen 3 sekunder -- dette fanger halv-åpne socketer etterlatt etter at en mobil-OS suspenderer appen. Ved en vellykket re-handshake sender `SocketHelper` den lokale `"reconnect"`-handlingen (se [Ledningsprotokoll](#ledningsprotokoll)) til hver registrert håndterer for den handlingen.

### `SubscriptionManager`

Ref-talt romedlemskap. Flere komponenter som abonnerer på samme samtale registrerer bare én server-side tilkoblinggrad.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... komponenten rendres, mottar socket-rammer via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Tre atferder som forbrukere får gratis:

- **Debounced leave (300 ms)** -- overlever React StrictMode's dobbel mount/unmount og korte remount-sykler uten å slippe server-side abonnementet; `reset()` avbestiller også eventuell ventende debounced leaves.
- **Reconnect rejoin** -- `SubscriptionManager` husker `personId`/`displayName` brukt til å jobbe hvert rom, så ved `SocketHelper`'s `"reconnect"`-hendelse (og på hver `onSocketIdReady`-anrop) re-sender den hver aktiv tilkoblinggrad med identitet intakt. Rejeiner er deduped per socketId så samme tilkobling kaller ikke et rom to ganger.
- **Late-binding socketId** -- `joinRoom` registrerer intensjon før sockelen fullfører sin handshake; den faktiske `POST /connections` brann på `onSocketIdReady`.

### `ConversationStore`

In-memory-hurtiglager nøkkelet etter `conversationId`. Registrerer `message` / `deleteMessage` / `privateMessage` socket-håndtere nøyaktig en gang og bruker innbundne rammer på hvilke som helst samtaler som er åpne for øyeblikket.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ bruker /messages/conversation/:id når autentisert, /messages/catchup/:churchId/:id når anonym

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render med den siste øyeblikksbildet
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // valgfritt eksplisitt opprydding
```

Autentiserte oppringere får også **people hydration** -- `personId`-er på innkommende meldinger løses til `PersonInterface`-objekter via et hurtiglagret `GET /people/ids`-slokk. Anonyme oppringere hopper over dette.

På `SocketHelper`'s `"reconnect"`-hendelse, refetcher `ConversationStore` hver samtale som for øyeblikket har aktive `subscribe`-lyttere og gjenoppretter meldinger mistet mens sockelen var nede. Anonyme samtaler hopper over denne oppholdet hvis deres `churchId` aldri ble registrert (catch-up-endepunktet krever en).

### `PresenceStore`

Speil `ConversationStore`'s mønster for `attendance`-handlingen. Abonnenter mottar en `PresenceSnapshot { conversationId, totalViewers, viewers }` når som helst serveren rebroadcaster tilstedeværelse. Identiske øyeblikksbilder dedupes før melding, så tilkobling-stormer utløser ikke unødvendige re-renders.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Øverste nivå-oppstart for **autentisert** oppringere. Pakker `SocketHelper.init()`, setter person/kirke-sammenhengen (som auto-joiner `"alerts"`-rommet) og kaller `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` nøyaktig en gang. Det registrerer også sin egen `"reconnect"`-håndterer som relaster varslings-/PM-tellinger, slik at badges gjenopprettes etter en dropt forbindelse.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonyme flyter (live stream-chatten er det kanoniske eksemplet) hopper over `NotificationService` og kaller primitivene direkte -- se `B1App/src/helpers/StreamChatManager.ts` for en referanseimplementering.

## Live stream-chat

Live stream-en er den største anonyme forbrukeren av rammeverket. Den bruker to `contentType`-er for romscopering:

- `streamingLive` -- den offentlige chatt-fanen på `/stream` (ett rom per `streamingService`).
- `streamingLiveHost` -- et privat rom synlig bare for personal med `contentApi.chat.host`-tillatelse. Rom-id-en er kryptert på serveren (`GET /streamingServices/:id/hostChat`) slik at casual skraping ikke avslører det.

`B1App/src/helpers/StreamChatManager.ts` oppstarter begge rom via de enhetlige primitivene -- det finnes ingen live-stream-spesifikk socket-kode lengre.

## Mønstre og fallgruver

- **Ikke åpne din egen WebSocket.** `SocketHelper` er en singleton av en grunn. Hvis du trenger å lytte på en egendefinert handling, registrer en håndterer på den eksisterende sockelen via `SocketHelper.addHandler`.
- **Ikke gå rundt `SubscriptionManager`.** Direkte `POST /connections`-anrop fungerer men mister ref-telling, debounced leave og reconnect rejoin. Gruppe-chat og PM-forbrukere går alle gjennom `SubscriptionManager`.
- **Håndterer-id-er må være unike per handling.** `SocketHelper.addHandler(action, id, fn)` nøkler etter `(action, id)`; gjenbruk samme id for to lyttere erstatter den første. De enhetlige butikkene bruker id-er som `"ConversationStore-Message"` og `"PresenceStore-Attendance"` for å holde seg bort fra forbruker-id-er.
- **Rom-id-er er ugjennomtrengelige strenger.** De fleste er samtale-UUID-er men systemet støtter også `"alerts"` (per-person-varsler), `"content-{type}-{id}"` (syntetiske aktivitetsrom) og de krypterte `streamingLiveHost`-id-ene.
- **Autentisering kontrolleres ved REST-grensen, ikke sockelen.** Å jobbe i ett rom av `POST /connections` er anonym-tillatt; tilgangskontroll skjer ved melding-sendingstid (meldingskontrolleren avgjør hvilke `messageType`-er en anonym oppringer kan sende).

## Relaterte sider

- [Varslerarkitektur](./architecture/notifications) -- In-app/push/e-post-eskalereingstraten denne transporten gir
- [Meldingsendepunkter](./api/endpoints/messaging) -- Komplett REST-overflate for meldinger, samtaler, tilkoblinger, enheter
- [Web Push-varsler](./web-push) -- Nettleser push, atskilt fra in-page socket-levering
- [AppHelper](./shared-libraries/app-helper) -- npm-pakken som sender klient-primitivene
- [Modulstruktur](./api/module-structure) -- Hvordan meldingsmodulen er organisert server-side
