---
title: "Architettura in tempo reale"
---

# Architettura in tempo reale

<div class="article-intro">

ChurchApps utilizza un singolo framework di consegna basato su WebSocket per ogni superficie in tempo reale — chat di gruppo, messaggi privati, note di contenuto, chat di streaming live e presenza/presenza. Questa pagina documenta il protocollo, il server e i primitivi client che i consumatori utilizzano.

</div>

## Panoramica

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

Il protocollo ha tre parti:

1. **Un singolo WebSocket persistente** per scheda del browser, aperto da `SocketHelper`.
2. **Righe di connessione** (`POST /messaging/connections`) registrate nella tabella `connections` — queste contrassegnano una tupla `(socketId, churchId, conversationId)` come sottoscrittore di una stanza.
3. **Fan-out lato server** da `DeliveryHelper.sendConversationMessages()` — quando un messaggio viene salvato (`POST /messaging/messages/send`), il server legge le righe di connessione corrispondenti e invia un payload tipizzato a ogni socket aperto.

Non c'è Socket.IO, nessun fallback di long-polling e nessun microservizio separato. Il WebSocket viene eseguito nello stesso processo dell'API REST (`web` Lambda per HTTP, `socket` Lambda per WebSocket in AWS; un processo combinato localmente e su Railway).

## Porte e trasporto

| Ambiente | HTTP | WebSocket |
|-------------|------|-----------|
| Dev locale   | `8084` | `ws://localhost:8087` (separate `WebSocketServer`) |
| Railway / host a porta singola | condiviso | server HTTP condiviso (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default` route) |

Il selettore di trasporto è la configurazione `deliveryProvider`:

- `local` → libreria `ws` grezza; i client si connettono a `MessagingApiSocket` da `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; il server pubblica payload alle connessioni attive tramite `@aws-sdk/client-apigatewaymanagementapi`.

Il client non ha mai bisogno di sapere quale sia in uso — parla lo stesso protocollo JSON in entrambi i casi.

## Protocollo wire

Ogni frame è JSON della forma `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // la "stanza" — solitamente un UUID, a volte "alerts" o "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, dopo la connessione, porta il socketId da utilizzare per gli ingressi nella stanza
  | "message"             // server → client, nuovo messaggio
  | "deleteMessage"       // server → client, messaggio rimosso
  | "privateMessage"      // server → client, nuovo messaggio in una conversazione privata
  | "conversationActivity"// server → client, segnale secondario "qualcosa è successo" per i sottoscrittori della stanza di contenuto
  | "attendance"          // server → client, elenco spettatori / snapshot della presenza
  | "notification"        // server → client, notifica generica (conteggi, ecc.)
  | "reconnect"           // client-internal, sparato da SocketHelper quando un socket fresco sostituisce uno caduto
  | "alert" | "callout";  // legacy, vedi riferimento endpoint Connections
```

### Handshake

1. Il client apre il socket e invia la stringa letterale `"getId"`.
2. Il server risponde con `{ action: "socketId", data: "<id>" }`.
3. Il client memorizza il `socketId` e lo utilizza come terza coordinata di ogni sottoscrizione di stanza.

### Ingresso in una stanza

Una "stanza" è solo una tupla `(churchId, conversationId)`. Per sottoscriversi, il client pubblica una riga `Connection`:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // facoltativo; null per spettatori di streaming live anonimi
    "displayName": "Anonymous4823"
  }
]
```

La pubblicazione attiva anche un broadcast `attendance` sulla conversazione così che gli sottoscrittori esistenti imparino che un nuovo spettatore si è unito.

### Invio di un messaggio

`POST /messaging/messages/send` (anonimo consentito) o `POST /messaging/messages/` (richiede autenticazione):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Il server salva il messaggio, quindi `DeliveryHelper.sendConversationMessages()` cerca ogni riga di connessione per quel `conversationId` e invia a ogni socket un frame `{ action: "message", data: <message> }`.

Per conversazioni vincolate ai contenuti (ad es. note allegate a una persona), un secondo broadcast con `action: "conversationActivity"` si attiva sulla stanza sintetica `"content-{type}-{id}"` in modo che i consumatori della vista di elenco sappiano di aggiornare senza tenere aperta la conversazione sottostante.

### Uscita da una stanza

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Cancella la riga di connessione e attiva un broadcast di presenza finale.

## Componenti lato server

| File | Ruolo |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Possiede il `WebSocketServer`. Assegna `socketId` al collegamento. Pulisce i socket morti e attiva un rebroadcast di presenza alla disconnessione |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` legge le connessioni per la stanza e instrada ogni frame al socket locale o alla connessione API Gateway AWS. `sendAttendance(churchId, conversationId)` costruisce e trasmette lo snapshot dei spettatori |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` unisce, `DELETE /:churchId/:conversationId/:socketId` esce, `POST /setName` aggiorna il nome visualizzato |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonimo) e `POST /` (autenticato) salvano e quindi distribuiscono |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` è la fonte di verità per chi è sottoscritto |

## Primitivi lato client (`@churchapps/apphelper`)

Tutti e cinque i primitivi sono singleton statici in `apphelper/src/helpers/`. Cooperano in modo che ogni scheda apra **un** WebSocket indipendentemente da quanti componenti si montano sulla pagina.

### `SocketHelper`

Possiede la singola connessione WebSocket. `init()` rientrante è idempotente — più componenti possono chiamarlo senza aprire socket duplicati. Espone:

- `init()` — apri (o riusa) il socket e completa l'handshake `getId`.
- `addHandler(action, id, fn)` / `removeHandler(id)` — registra/annulla la registrazione dei listener per `action`. Più handler possono ascoltare la stessa azione.
- `setPersonChurch({ personId, churchId })` — per i chiamanti autenticati; attiva una sottoscrizione alla stanza `"alerts"` in modo che le notifiche push arrivino su questo socket.
- `onSocketIdReady(fn)` — si attiva una volta quando l'handshake è completo; utilizzato da `SubscriptionManager` per scaricare i join in sospeso.

### `SubscriptionManager`

Appartenenza alla stanza conteggiata per riferimento. Più componenti che si iscrivono alla stessa conversazione registrano solo una riga di connessione lato server.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... il componente viene reso, riceve i frame socket tramite ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Tre comportamenti che i consumatori ottengono gratuitamente:

- **Leave ritardato (300 ms)** — sopravvive al doppio mount/unmount di React StrictMode e ai cicli di rimonta brevi senza eliminare la sottoscrizione lato server.
- **Riconnessione rejoin** — ascolta l'evento `"reconnect"` di `SocketHelper` e riemette ogni riga di connessione attiva.
- **Late-binding socketId** — `joinRoom` registra l'intento prima che il socket completi il suo handshake; il vero `POST /connections` si attiva su `onSocketIdReady`.

### `ConversationStore`

Cache in memoria chiave per `conversationId`. Registra i gestori socket `message` / `deleteMessage` / `privateMessage` esattamente una volta e applica i frame in arrivo a tutte le conversazioni attualmente aperte.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ utilizza /messages/conversation/:id quando autenticato, /messages/catchup/:churchId/:id quando anonimo

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render con lo snapshot più recente
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // pulizia esplicita facoltativa
```

I chiamanti autenticati ottengono anche **idratazione delle persone** — i `personId` sui messaggi in arrivo vengono risolti in oggetti `PersonInterface` tramite una ricerca `GET /people/ids` memorizzata nella cache. I chiamanti anonimi saltano questo.

### `PresenceStore`

Specchia il pattern `ConversationStore` per l'azione `attendance`. I sottoscrittori ricevono un `PresenceSnapshot { conversationId, totalViewers, viewers }` ogni volta che il server retrasmette la presenza. Gli snapshot identici vengono deduplicati prima della notifica, quindi le tempeste di riconnessione non attivano ri-render non necessari.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Boot di livello superiore per i chiamanti **autenticati**. Avvolge `SocketHelper.init()`, imposta il contesto della persona/chiesa (che auto-unisce la stanza `"alerts"`), e chiama `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` esattamente una volta.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

I flussi anonimi (la chat dello streaming live è l'esempio canonico) saltano `NotificationService` e chiamano i primitivi direttamente — vedi `B1App/src/helpers/StreamChatManager.ts` per un'implementazione di riferimento.

## Chat dello streaming live

Lo streaming live è il più grande consumatore anonimo del framework. Utilizza due `contentType` per l'ambito della stanza:

- `streamingLive` — la scheda di chat pubblica su `/stream` (una stanza per `streamingService`).
- `streamingLiveHost` — una stanza privata visibile solo ai staff con il permesso `contentApi.chat.host`. L'id della stanza è crittografato sul server (`GET /streamingServices/:id/hostChat`) in modo che il scraping casuale non lo riveli.

`B1App/src/helpers/StreamChatManager.ts` avvia entrambe le stanze tramite i primitivi unificati — non c'è più codice socket specifico per lo streaming live.

## Pattern e trabocchetti

- **Non aprire il tuo WebSocket.** `SocketHelper` è un singleton per una ragione. Se hai bisogno di ascoltare un'azione personalizzata, registra un gestore sul socket esistente tramite `SocketHelper.addHandler`.
- **Non aggirare `SubscriptionManager`.** Le chiamate dirette `POST /connections` funzionano ma perdono conteggi di riferimento, uscita ritardata e riconnessione rejoin. I consumatori di chat di gruppo e PM tutti passano attraverso `SubscriptionManager`.
- **Gli ID dei gestori devono essere univoci per azione.** `SocketHelper.addHandler(action, id, fn)` chiave per `(action, id)`; il riutilizzo dello stesso id per due listener sostituisce il primo. I negozi unificati utilizzano id come `"ConversationStore-Message"` e `"PresenceStore-Attendance"` per stare lontani dagli id dei consumatori.
- **Gli ID della stanza sono stringhe opache.** La maggior parte sono UUID di conversazione ma il sistema supporta anche `"alerts"` (notifiche per persona), `"content-{type}-{id}"` (stanze di attività sintetiche) e gli ID `streamingLiveHost` crittografati.
- **L'autenticazione viene controllata al confine REST, non al socket.** Unirsi a una stanza per `POST /connections` è anonimo consentito; il controllo di accesso avviene al momento dell'invio del messaggio (il controller del messaggio decide quali `messageType` un chiamante anonimo può inviare).

## Pagine correlate

- [Messaging Endpoints](./api/endpoints/messaging) -- Superficie REST completa per messaggi, conversazioni, connessioni, dispositivi
- [Web Push Notifications](./web-push) -- Push del browser, separato dalla consegna del socket in-page
- [AppHelper](./shared-libraries/app-helper) -- Il pacchetto npm che fornisce i primitivi client
- [Module Structure](./api/module-structure) -- Come il modulo di messaggistica è organizzato lato server
