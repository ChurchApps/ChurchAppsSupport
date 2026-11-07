---
title: "Arhitectura în timp real"
---

# Arhitectura în timp real

<div class="article-intro">

ChurchApps folosește un singur sistem de livrare bazat pe WebSocket pentru fiecare funcție în timp real — chatul de grup, mesajele private, notele asociate conținutului, chatul transmisiunii live și prezența/prezența la eveniment. Această pagină documentează protocolul, serverul și primitivele de pe partea clientului pe care le folosesc consumatorii.

</div>

## Prezentare generală

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

Protocolul are trei componente:

1. **Un singur WebSocket persistent** pentru fiecare filă de browser, deschis de `SocketHelper`.
2. **Înregistrări de conexiune** (`POST /messaging/connections`) salvate în tabelul `connections` — acestea marchează tuplul `(socketId, churchId, conversationId)` ca abonat la o cameră.
3. **Distribuirea pe server** de către `DeliveryHelper.sendConversationMessages()` — când un mesaj este salvat (`POST /messaging/messages/send`), serverul citește înregistrările de conexiune corespunzătoare și trimite un mesaj tipizat către fiecare socket deschis.

Nu există Socket.IO, nicio alternativă de tip long-polling și niciun microserviciu separat. WebSocket-ul rulează în același proces cu API-ul REST (Lambda `web` pentru HTTP, Lambda `socket` pentru WebSocket în AWS; un singur proces combinat local și pe Railway).

## Porturi și transport

| Mediu | HTTP | WebSocket |
|-------|------|-----------|
| Dezvoltare locală | `8084` | `ws://localhost:8087` (`WebSocketServer` separat) |
| Railway / Docker / găzduiri cu un singur port (`RAILWAY_ENVIRONMENT` sau `SELF_HOSTED` setat) | comun | server HTTP comun (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (rutele `$connect` / `$disconnect` / `$default`) |

Selectorul de transport este configurația `deliveryProvider`:

- `local` → biblioteca `ws` simplă; clienții se conectează la `MessagingApiSocket` din `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; serverul trimite mesajele către conexiunile active prin `@aws-sdk/client-apigatewaymanagementapi`.

Clientul nu trebuie să știe ce variantă este folosită — vorbește același protocol JSON în ambele cazuri.

## Protocolul de transmitere

Fiecare cadru este JSON cu forma `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // "camera" — de obicei un UUID, uneori "alerts" sau "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, după conectare, transmite socketId-ul folosit pentru alăturarea la camere
  | "message"             // server → client, mesaj nou
  | "deleteMessage"       // server → client, mesaj șters
  | "privateMessage"      // server → client, semnal pentru numărul de notificări către camera "alerts" a destinatarului, când un mesaj direct este escaladat; corpul mesajului sosește prin acțiunea obișnuită "message" în conversația deschisă
  | "reaction"            // server → client, reacție cu emoji comutată pe un mesaj; data este { messageId, conversationId, personId, emoji, added } (added=false înseamnă eliminată). Difuzată în camera conversației prin POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, semnal secundar „s-a întâmplat ceva” pentru abonații camerelor de conținut
  | "attendance"          // server → client, lista spectatorilor / instantaneul prezenței
  | "notification"        // server → client, notificare generică (numărători etc.)
  | "reconnect"           // intern clientului, trimis local de SocketHelper după finalizarea unui nou schimb de socketId după o întrerupere — fie o reconectare cu backoff exponențial după o închidere neașteptată, fie o reconectare imediată declanșată de sonda de reluare (focalizarea filei/vizibilitate/online); niciodată trimisă de server
  | "alert" | "callout";  // vechi, vezi documentația endpoint-ului Connections

```

### Strângerea de mână (handshake)

1. Clientul deschide socket-ul și trimite șirul literal `"getId"`.
2. Serverul răspunde cu `{ action: "socketId", data: "<id>" }`.
3. Clientul stochează `socketId` și îl folosește ca a treia coordonată a fiecărui abonament la cameră.

### Alăturarea la o cameră

O „cameră” este doar un tuplu `(churchId, conversationId)`. Pentru a se abona, clientul trimite un rând `Connection`:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // opțional; null pentru spectatorii anonimi ai transmisiunii live
    "displayName": "Anonymous4823"
  }
]
```

Trimiterea declanșează și o difuzare `attendance` pe conversație, pentru ca abonații existenți să afle că a intrat un nou spectator.

### Trimiterea unui mesaj

`POST /messaging/messages/send` (permis anonim) sau `POST /messaging/messages/` (necesită autentificare):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Serverul salvează mesajul, apoi `DeliveryHelper.sendConversationMessages()` caută toate rândurile de conexiune pentru acel `conversationId` și trimite fiecărui socket un cadru `{ action: "message", data: <message> }`.

Pentru conversațiile legate de conținut (de exemplu, note atașate unei persoane), o a doua difuzare cu `action: "conversationActivity"` se declanșează în camera sintetică `"content-{type}-{id}"`, pentru ca mediile de tip listă să știe când să se reîmprospăteze fără a menține deschisă conversația de bază.

### Părăsirea unei camere

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Șterge rândul de conexiune și declanșează o difuzare finală `attendance`.

## Componente pe server

| Fișier | Rol |
|--------|-----|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Deține `WebSocketServer`. Atribuie `socketId` la conectare. Rulează un heartbeat ping/pong la fiecare 30s (`startHeartbeat`), care apelează `terminate()` și curăță orice conexiune care nu răspunde cu pong. Curăță socket-urile moarte și declanșează o redifuzare a prezenței la deconectare. Expune `getLiveSocketIds()` și `reapStaleConnections()`, folosite de jobul cu temporizator de 30 de minute pentru a șterge rândurile `connections` vechi — local, verificând ce socketId-uri sunt încă active în proces; pe AWS, ca plasă de siguranță cu TTL de 24h pentru evenimentele `$disconnect` ratate (API Gateway limitează conexiunile la ~2h, deci nu poate șterge una activă) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` citește conexiunile camerei și trimite fiecare cadru fie către socket-ul local, fie către conexiunea AWS API Gateway. `sendAttendance(churchId, conversationId)` construiește și difuzează instantaneul spectatorilor |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` pentru alăturare, `DELETE /:churchId/:conversationId/:socketId` pentru părăsire, `POST /setName` pentru actualizarea numelui afișat |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonim) și `POST /` (autentificat) salvează apoi distribuie mai departe |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` este sursa de adevăr pentru cine este abonat |

## Primitive pe partea clientului (`@churchapps/apphelper`)

Toate cele cinci primitive sunt singletonuri statice din `apphelper/src/helpers/`. Ele colaborează astfel încât fiecare filă să deschidă **un singur** WebSocket, indiferent de câte componente se montează pe pagină.

### `SocketHelper`

Deține conexiunea WebSocket unică. Apelul repetat al `init()` este idempotent — mai multe componente pot apela metoda fără a deschide socket-uri duplicate. Expune:

- `init()` — deschide (sau refolosește) socket-ul și finalizează strângerea de mână `getId`. Se rezolvă odată ce strângerea de mână se finalizează sau, după un timeout de 5s, odată ce bucla de reîncercare în fundal a preluat controlul; nu eșuează niciodată, deci apelanții nu trebuie să trateze separat o primă conectare eșuată.
- `addHandler(action, id, fn)` / `removeHandler(id)` — înregistrează/anulează înregistrarea ascultătorilor după `action`. Mai mulți handleri pot asculta aceeași acțiune.
- `setPersonChurch({ personId, churchId })` — pentru apelanții autentificați; declanșează un abonament la camera `"alerts"`, astfel încât notificările push să ajungă pe acest socket.
- `onSocketIdReady(fn)` — se declanșează la fiecare socketId nou, nu doar la primul — strângerea de mână inițială și fiecare reconectare ulterioară. Folosit de `SubscriptionManager` pentru a trimite alăturările în așteptare.
- `checkConnection()` — invocat de ascultătorii de reluare de mai jos; reconectează imediat dacă socket-ul este deja închis sau trimite o sondă de activitate dacă pare deschis.

**Ciclul de viață al reconectării.** O închidere neașteptată programează o reconectare cu backoff exponențial (1s, dublându-se până la un plafon de 30s). `SocketHelper` ascultă și evenimentele `online`, `focus`, `pageshow` și `visibilitychange` de pe `window`/`document`, pentru a detecta reluarea unei file: dacă socket-ul este deja închis, se reconectează imediat și resetează backoff-ul; dacă pare deschis, trimite o sondă de activitate `"getId"` și forțează o reconectare dacă nu sosește niciun cadru în 3s — aceasta prinde socket-urile pe jumătate deschise rămase după ce un sistem de operare mobil suspendă aplicația. La o nouă strângere de mână reușită, `SocketHelper` trimite acțiunea locală `"reconnect"` (vezi [Protocolul de transmitere](#wire-protocol)) către fiecare handler înregistrat pentru acea acțiune.

### `SubscriptionManager`

Apartenența la camere cu numărare de referințe. Mai multe componente care se abonează la aceeași conversație înregistrează doar un singur rând de conexiune pe server.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... componenta se randează, primește cadre de socket prin ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Trei comportamente pe care consumatorii le primesc gratuit:

- **Părăsire amânată (300 ms)** — rezistă la dubla montare/demontare din React StrictMode și la cicluri scurte de remontare, fără a elimina abonamentul de pe server; `reset()` anulează și părăsirile amânate în așteptare.
- **Realăturare după reconectare** — `SubscriptionManager` reține `personId`/`displayName` folosite pentru a intra în fiecare cameră, astfel încât, la evenimentul `"reconnect"` al `SocketHelper` (și la fiecare apel `onSocketIdReady`), retrimite fiecare rând de conexiune activ cu identitatea intactă. Realăturările sunt deduplicate pe socketId, astfel încât aceeași reconectare să nu retrimită o cameră de două ori.
- **socketId cu legare întârziată** — `joinRoom` înregistrează intenția înainte ca socket-ul să termine strângerea de mână; cererea efectivă `POST /connections` se declanșează la `onSocketIdReady`.

### `ConversationStore`

Cache în memorie, indexat după `conversationId`. Înregistrează handlerii de socket `message` / `deleteMessage` / `privateMessage` o singură dată și aplică cadrele primite la conversațiile deschise în acel moment.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ folosește /messages/conversation/:id când utilizatorul este autentificat, /messages/catchup/:churchId/:id când este anonim

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-randează cu ultimul instantaneu
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // curățare explicită opțională
```

Apelanții autentificați beneficiază și de **popularea datelor despre persoane** — `personId`-urile din mesajele primite sunt rezolvate în obiecte `PersonInterface` printr-o interogare `GET /people/ids` cu cache. Apelanții anonimi sar peste acest pas.

La evenimentul `"reconnect"` al `SocketHelper`, `ConversationStore` reîncarcă fiecare conversație care are în acel moment ascultători `subscribe` activi, recuperând mesajele pierdute cât timp socket-ul a fost jos. Conversațiile anonime sar peste această recuperare dacă `churchId`-ul lor nu a fost înregistrat niciodată (endpoint-ul de recuperare îl cere).

### `PresenceStore`

Urmează același model ca `ConversationStore`, pentru acțiunea `attendance`. Abonații primesc un `PresenceSnapshot { conversationId, totalViewers, viewers }` ori de câte ori serverul redifuzează prezența. Instantaneele identice sunt deduplicate înainte de notificare, astfel încât valurile de reconectare să nu declanșeze re-randări inutile.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Pornirea de nivel superior pentru apelanții **autentificați**. Învelește `SocketHelper.init()`, setează contextul persoanei/bisericii (ceea ce alătură automat camera `"alerts"`) și apelează `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` exact o dată. Înregistrează și propriul handler `"reconnect"`, care reîncarcă numărătorii de notificări/mesaje private, astfel încât insignele să se refacă după o conexiune întreruptă.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Fluxurile anonime (chatul transmisiunii live este exemplul canonic) sar peste `NotificationService` și apelează direct primitivele — vezi `B1App/src/helpers/StreamChatManager.ts` pentru o implementare de referință.

## Chatul transmisiunii live

Transmisiunea live este cel mai mare consumator anonim al sistemului. Folosește două `contentType` pentru delimitarea camerelor:

- `streamingLive` — fila publică de chat de la `/stream` (o cameră pentru fiecare `streamingService`).
- `streamingLiveHost` — o cameră privată, vizibilă doar personalului cu permisiunea `contentApi.chat.host`. ID-ul camerei este criptat pe server (`GET /streamingServices/:id/hostChat`), astfel încât raspunsurile ocazionale să nu dezvăluie camera.

`B1App/src/helpers/StreamChatManager.ts` pornește ambele camere prin primitivele unificate — nu mai există cod de socket specific transmisiunii live.

## Modele și capcane

- **Nu deschideți propriul WebSocket.** `SocketHelper` este un singleton dintr-un motiv. Dacă aveți nevoie să ascultați o acțiune personalizată, înregistrați un handler pe socket-ul existent prin `SocketHelper.addHandler`.
- **Nu ocoliți `SubscriptionManager`.** Apelurile directe `POST /connections` funcționează, dar pierd numărarea de referințe, părăsirea amânată și realăturarea după reconectare. Consumatorii chatului de grup și ai mesajelor private trec toți prin `SubscriptionManager`.
- **ID-urile handlerilor trebuie să fie unice pentru fiecare acțiune.** `SocketHelper.addHandler(action, id, fn)` indexează după `(action, id)`; reutilizarea aceluiași ID pentru doi ascultători îl înlocuiește pe primul. Depozitele unificate folosesc ID-uri precum `"ConversationStore-Message"` și `"PresenceStore-Attendance"` pentru a evita conflictele cu ID-urile consumatorilor.
- **ID-urile camerelor sunt șiruri opace.** Majoritatea sunt UUID-uri de conversație, dar sistemul mai acceptă `"alerts"` (notificări per persoană), `"content-{type}-{id}"` (camere sintetice de activitate) și ID-urile criptate `streamingLiveHost`.
- **Autentificarea se verifică la granița REST, nu la socket.** Alăturarea la o cameră prin `POST /connections` este permisă anonim; controlul accesului are loc la trimiterea mesajului (controlerul de mesaje decide ce `messageType` poate trimite un apelant anonim).

## Pagini conexe

- [Arhitectura notificărilor](./architecture/notifications) -- Pâlnia de escaladare in-app/push/e-mail alimentată de acest transport
- [Endpoint-urile de mesagerie](./api/endpoints/messaging) -- Suprafața REST completă pentru mesaje, conversații, conexiuni, dispozitive
- [Notificări push web](./web-push) -- Push în browser, separat de livrarea prin socket în pagină
- [AppHelper](./shared-libraries/app-helper) -- Pachetul npm care livrează primitivele clientului
- [Structura modulelor](./api/module-structure) -- Cum este organizat modulul de mesagerie pe server
