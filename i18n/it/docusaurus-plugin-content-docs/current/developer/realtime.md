---
title: "Architettura in Tempo Reale"
---

# Architettura in Tempo Reale

<div class="article-intro">

ChurchApps utilizza un unico framework di consegna basato su WebSocket per ogni superficie in tempo reale — chat di gruppo, messaggi privati, note sui contenuti, la chat dello streaming live e la presenza/partecipazione. Questa pagina documenta il protocollo, il server e i primitivi client che i consumatori utilizzano.

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

Il protocollo è composto da tre parti:

1. **Un WebSocket persistente** per scheda del browser, aperto da `SocketHelper`.
2. **Righe di connessione** (`POST /messaging/connections`) registrate nella tabella `connections` — contrassegnano una tupla `(socketId, churchId, conversationId)` come sottoscrittore di una stanza.
3. **Fan-out lato server** ad opera di `DeliveryHelper.sendConversationMessages()` — quando un messaggio viene salvato (`POST /messaging/messages/send`), il server legge le righe di connessione corrispondenti e invia un payload tipizzato a ogni socket aperto.

Non esiste Socket.IO, nessun fallback di long-polling e nessun microservizio separato. Il WebSocket viene eseguito nello stesso processo dell'API REST (Lambda `web` per HTTP, Lambda `socket` per WebSocket in AWS; un unico processo combinato in locale e su Railway).

## Porte e trasporto

| Ambiente | HTTP | WebSocket |
|-------------|------|-----------|
| Sviluppo locale   | `8084` | `ws://localhost:8087` (`WebSocketServer` separato) |
| Railway / Docker / host a porta singola (`RAILWAY_ENVIRONMENT` o `SELF_HOSTED` impostati) | condiviso | server HTTP condiviso (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (rotte `$connect` / `$disconnect` / `$default`) |

Il selettore di trasporto è la configurazione `deliveryProvider`:

- `local` → libreria `ws` grezza; i client si connettono a `MessagingApiSocket` da `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; il server invia i payload alle connessioni attive tramite `@aws-sdk/client-apigatewaymanagementapi`.

Il client non ha mai bisogno di sapere quale sia in uso — parla lo stesso protocollo JSON in entrambi i casi.

## Protocollo wire

Ogni frame è JSON nella forma `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // la "stanza" — di solito un UUID, a volte "alerts" oppure "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, dopo la connessione, porta il socketId da usare per gli ingressi nelle stanze
  | "message"             // server → client, nuovo messaggio
  | "deleteMessage"       // server → client, messaggio rimosso
  | "privateMessage"      // server → client, ping del conteggio badge alla stanza "alerts" del destinatario quando un messaggio diretto viene escalato; il corpo del messaggio stesso arriva tramite l'ordinaria azione "message" all'interno della conversazione aperta
  | "reaction"            // server → client, reazione emoji attivata/disattivata su un messaggio; data è { messageId, conversationId, personId, emoji, added } (added=false significa rimossa). Trasmesso alla stanza della conversazione da POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, segnale secondario "è successo qualcosa" per i sottoscrittori della stanza di contenuto
  | "attendance"          // server → client, elenco spettatori / snapshot della presenza
  | "notification"        // server → client, notifica generica (conteggi, ecc.)
  | "reconnect"           // interno al client, inviato localmente da SocketHelper dopo che un nuovo handshake di socketId si completa a seguito di una caduta — sia una riconnessione con backoff esponenziale dopo una chiusura inattesa, sia una riconnessione immediata attivata dalla sonda di ripresa (focus/visibilità/online della scheda); mai inviato dal server
  | "alert" | "callout";  // legacy, vedi il riferimento all'endpoint Connections
```

### Handshake

1. Il client apre il socket e invia la stringa letterale `"getId"`.
2. Il server risponde con `{ action: "socketId", data: "<id>" }`.
3. Il client memorizza il `socketId` e lo utilizza come terza coordinata di ogni sottoscrizione di stanza.

### Ingresso in una stanza

Una "stanza" è semplicemente una tupla `(churchId, conversationId)`. Per sottoscriversi, il client pubblica una riga `Connection`:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // facoltativo; null per spettatori anonimi dello streaming live
    "displayName": "Anonymous4823"
  }
]
```

La pubblicazione attiva anche una trasmissione `attendance` sulla conversazione, così i sottoscrittori esistenti apprendono che un nuovo spettatore si è unito.

### Invio di un messaggio

`POST /messaging/messages/send` (anonimo consentito) oppure `POST /messaging/messages/` (autenticazione richiesta):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Il server salva il messaggio, poi `DeliveryHelper.sendConversationMessages()` cerca ogni riga di connessione per quel `conversationId` e invia a ogni socket un frame `{ action: "message", data: <message> }`.

Per le conversazioni legate ai contenuti (ad es. note allegate a una persona), una seconda trasmissione con `action: "conversationActivity"` viene attivata sulla stanza sintetica `"content-{type}-{id}"` in modo che i consumatori della vista elenco sappiano di aggiornarsi senza dover tenere aperta la conversazione sottostante.

### Uscita da una stanza

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Cancella la riga di connessione e attiva una trasmissione finale della presenza.

## Componenti lato server

| File | Ruolo |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Possiede il `WebSocketServer`. Assegna il `socketId` alla connessione. Esegue un heartbeat ping/pong di 30s (`startHeartbeat`) che `terminate()`-a e ripulisce qualsiasi connessione che manca un pong. Ripulisce i socket morti e attiva una ritrasmissione della presenza alla disconnessione. Espone `getLiveSocketIds()` e `reapStaleConnections()`, usati dal job timer di 30 minuti per eliminare le righe `connections` obsolete — in locale controllando quali socketId sono ancora attivi in-process, su AWS come backstop TTL di 24h per eventi `$disconnect` mancati (API Gateway limita le connessioni a ~2h, quindi questo non può ripulirne una attiva) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` legge le connessioni per la stanza e instrada ogni frame al socket locale o alla connessione API Gateway di AWS. `sendAttendance(churchId, conversationId)` costruisce e trasmette lo snapshot degli spettatori |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` per entrare, `DELETE /:churchId/:conversationId/:socketId` per uscire, `POST /setName` aggiorna il nome visualizzato |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonimo) e `POST /` (autenticato) salvano e poi distribuiscono |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` è la fonte di verità su chi è sottoscritto |

## Primitivi lato client (`@churchapps/apphelper`)

Tutti e cinque i primitivi sono singleton statici in `apphelper/src/helpers/`. Cooperano in modo che ogni scheda apra **un solo** WebSocket indipendentemente da quanti componenti si montano sulla pagina.

### `SocketHelper`

Possiede l'unica connessione WebSocket. `init()` rientrante è idempotente — più componenti possono chiamarlo senza aprire socket duplicati. Espone:

- `init()` — apre (o riusa) il socket e completa l'handshake `getId`. Si risolve una volta completato l'handshake oppure, dopo un timeout di 5s, una volta che il ciclo di retry in background ha preso il controllo; non rifiuta mai, quindi i chiamanti non devono gestire un caso speciale per un primo tentativo di connessione fallito.
- `addHandler(action, id, fn)` / `removeHandler(id)` — registra/annulla la registrazione dei listener per `action`. Più handler possono ascoltare la stessa azione.
- `setPersonChurch({ personId, churchId })` — per i chiamanti autenticati; attiva una sottoscrizione alla stanza `"alerts"` in modo che le notifiche push arrivino su questo socket.
- `onSocketIdReady(fn)` — si attiva a ogni nuovo socketId, non solo al primo — l'handshake iniziale e ogni successiva riconnessione. Usato da `SubscriptionManager` per svuotare gli ingressi in sospeso.
- `checkConnection()` — invocato dai listener di ripresa qui sotto; si riconnette immediatamente se il socket è già chiuso, oppure invia una sonda di attività se sembra aperto.

**Ciclo di vita della riconnessione.** Una chiusura inattesa pianifica una riconnessione con backoff esponenziale (1s, raddoppiando fino a un limite di 30s). `SocketHelper` ascolta anche `online`, `focus`, `pageshow` e `visibilitychange` su `window`/`document` per rilevare una scheda ripresa: se il socket è già chiuso si riconnette immediatamente e azzera il backoff; se sembra aperto, invia una sonda di attività `"getId"` e forza una riconnessione se nessun frame arriva entro 3s — questo intercetta i socket semi-aperti lasciati indietro dopo che un sistema operativo mobile sospende l'app. Al successo di un nuovo handshake, `SocketHelper` invia l'azione locale `"reconnect"` (vedi [Protocollo wire](#protocollo-wire)) a ogni handler registrato per quell'azione.

### `SubscriptionManager`

Appartenenza alla stanza conteggiata per riferimento. Più componenti che si sottoscrivono alla stessa conversazione registrano una sola riga di connessione lato server.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... il componente esegue il rendering, riceve i frame socket tramite ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Tre comportamenti che i consumatori ottengono gratuitamente:

- **Uscita ritardata (300 ms)** — sopravvive al doppio mount/unmount di React StrictMode e ai brevi cicli di rimontaggio senza eliminare la sottoscrizione lato server; `reset()` annulla anche eventuali uscite ritardate in sospeso.
- **Riadesione alla riconnessione** — `SubscriptionManager` ricorda il `personId`/`displayName` usati per entrare in ogni stanza, quindi all'evento `"reconnect"` di `SocketHelper` (e a ogni chiamata `onSocketIdReady`) ripubblica ogni riga di connessione attiva con l'identità intatta. Le riadesioni sono deduplicate per socketId in modo che la stessa riconnessione non ripubblichi due volte una stanza.
- **Late-binding del socketId** — `joinRoom` registra l'intento prima che il socket completi il suo handshake; il vero `POST /connections` si attiva su `onSocketIdReady`.

### `ConversationStore`

Cache in memoria con chiave `conversationId`. Registra i gestori socket `message` / `deleteMessage` / `privateMessage` esattamente una volta e applica i frame in arrivo a qualsiasi conversazione attualmente aperta.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ usa /messages/conversation/:id quando autenticato, /messages/catchup/:churchId/:id quando anonimo

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // ri-renderizza con lo snapshot più recente
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // pulizia esplicita facoltativa
```

I chiamanti autenticati ottengono anche l'**idratazione delle persone** — i `personId` sui messaggi in arrivo vengono risolti in oggetti `PersonInterface` tramite una lookup memorizzata nella cache `GET /people/ids`. I chiamanti anonimi saltano questo passaggio.

Sull'evento `"reconnect"` di `SocketHelper`, `ConversationStore` ricarica ogni conversazione che attualmente ha listener `subscribe` attivi, recuperando i messaggi persi mentre il socket era inattivo. Le conversazioni anonime saltano questo recupero se il loro `churchId` non è mai stato registrato (l'endpoint di recupero ne richiede uno).

### `PresenceStore`

Rispecchia il pattern di `ConversationStore` per l'azione `attendance`. I sottoscrittori ricevono uno `PresenceSnapshot { conversationId, totalViewers, viewers }` ogni volta che il server ritrasmette la presenza. Gli snapshot identici vengono deduplicati prima della notifica, così le tempeste di riconnessione non attivano ri-render non necessari.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Avvio di livello superiore per i chiamanti **autenticati**. Avvolge `SocketHelper.init()`, imposta il contesto persona/chiesa (che entra automaticamente nella stanza `"alerts"`), e chiama `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` esattamente una volta. Registra anche un proprio handler `"reconnect"` che ricarica i conteggi di notifiche/messaggi privati, così i badge si ripristinano dopo una connessione caduta.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

I flussi anonimi (la chat dello streaming live è l'esempio canonico) saltano `NotificationService` e chiamano direttamente i primitivi — vedi `B1App/src/helpers/StreamChatManager.ts` per un'implementazione di riferimento.

## Chat dello streaming live

Lo streaming live è il maggior consumatore anonimo del framework. Utilizza due `contentType` per l'ambito della stanza:

- `streamingLive` — la scheda di chat pubblica su `/stream` (una stanza per `streamingService`).
- `streamingLiveHost` — una stanza privata visibile solo allo staff con il permesso `contentApi.chat.host`. L'id della stanza è crittografato sul server (`GET /streamingServices/:id/hostChat`) in modo che lo scraping casuale non lo riveli.

`B1App/src/helpers/StreamChatManager.ts` avvia entrambe le stanze tramite i primitivi unificati — non esiste più codice socket specifico per lo streaming live.

## Pattern e insidie

- **Non aprire un tuo WebSocket.** `SocketHelper` è un singleton per una ragione. Se hai bisogno di ascoltare un'azione personalizzata, registra un handler sul socket esistente tramite `SocketHelper.addHandler`.
- **Non aggirare `SubscriptionManager`.** Le chiamate dirette `POST /connections` funzionano ma perdono il conteggio dei riferimenti, l'uscita ritardata e la riadesione alla riconnessione. I consumatori di chat di gruppo e messaggi privati passano tutti attraverso `SubscriptionManager`.
- **Gli id degli handler devono essere univoci per azione.** `SocketHelper.addHandler(action, id, fn)` usa come chiave `(action, id)`; riutilizzare lo stesso id per due listener sostituisce il primo. Gli store unificati usano id come `"ConversationStore-Message"` e `"PresenceStore-Attendance"` per non entrare in conflitto con gli id dei consumatori.
- **Gli id delle stanze sono stringhe opache.** La maggior parte sono UUID di conversazione, ma il sistema supporta anche `"alerts"` (notifiche per persona), `"content-{type}-{id}"` (stanze di attività sintetiche) e gli id crittografati `streamingLiveHost`.
- **L'autenticazione viene verificata al confine REST, non sul socket.** Entrare in una stanza tramite `POST /connections` è consentito in forma anonima; il controllo degli accessi avviene al momento dell'invio del messaggio (il controller dei messaggi decide quali `messageType` un chiamante anonimo può inviare).

## Pagine Correlate

- [Architettura delle Notifiche](./architecture/notifications) -- L'imbuto di escalation in-app/push/email a cui alimenta questo trasporto
- [Endpoint di Messaggistica](./api/endpoints/messaging) -- Superficie REST completa per messaggi, conversazioni, connessioni, dispositivi
- [Notifiche Web Push](./web-push) -- Push del browser, separato dalla consegna via socket in pagina
- [AppHelper](./shared-libraries/app-helper) -- Il pacchetto npm che fornisce i primitivi client
- [Struttura dei Moduli](./api/module-structure) -- Come è organizzato lato server il modulo di messaggistica
