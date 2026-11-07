---
title: "Realaus laiko architektūra"
---

# Realaus laiko architektūra

<div class="article-intro">

ChurchApps visoms realaus laiko funkcijoms naudoja vieną WebSocket pagrindu veikiančią perdavimo sistemą: grupiniam pokalbiui, privačioms žinutėms, turinio pastaboms, tiesioginio transliacijos pokalbiui ir buvimo / lankomumo rodymui. Šiame puslapyje aprašomas protokolas, serveris ir kliento pagrindiniai elementai, kuriuos naudoja programos.

</div>

## Apžvalga

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

Protokolą sudaro trys dalys:

1. **Vienas nuolatinis WebSocket ryšys** kiekvienam naršyklės skirtukui; jį atidaro `SocketHelper`.
2. **Ryšių įrašai** (`POST /messaging/connections`), saugomi lentelėje `connections`. Jie pažymi `(socketId, churchId, conversationId)` seką kaip kambario prenumeratorių.
3. **Serverio pusės paskirstymas** per `DeliveryHelper.sendConversationMessages()`. Išsaugojus žinutę (`POST /messaging/messages/send`), serveris nuskaito atitinkamus ryšių įrašus ir kiekvienam atviram ryšiui išsiunčia tipizuotą duomenų paketą.

Nenaudojamas nei Socket.IO, nei ilgojo sujungimo (long-polling) atsarginis variantas, nei atskiras mikroservisas. WebSocket veikia tame pačiame procese kaip ir REST API (debesyje AWS – `web` Lambda HTTP užklausoms ir `socket` Lambda WebSocket ryšiams; lokaliai ir Railway platformoje – vienas bendras procesas).

## Prievadai ir transportas

| Aplinka | HTTP | WebSocket |
|-------------|------|-----------|
| Vietinė kūrimo aplinka | `8084` | `ws://localhost:8087` (atskiras `WebSocketServer`) |
| Railway / Docker / vieno prievado serveriai (nustatytas `RAILWAY_ENVIRONMENT` arba `SELF_HOSTED`) | bendras | bendras HTTP serveris (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (maršrutai `$connect` / `$disconnect` / `$default`) |

Perdavimo pasirinkimą lemia `deliveryProvider` konfigūracija:

- `local` → naudojama `ws` biblioteka; klientai jungiasi prie `MessagingApiSocket` iš `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; serveris duomenis aktyviems ryšiams siunčia per `@aws-sdk/client-apigatewaymanagementapi`.

Klientui nereikia žinoti, kuris variantas naudojamas: abiem atvejais kalbama tuo pačiu JSON protokolu.

## Ryšio protokolas

Kiekvienas kadras yra JSON, atitinkantis `PayloadInterface` struktūrą:

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

### Ryšio užmezgimas

1. Klientas atidaro ryšį ir išsiunčia žodinę eilutę `"getId"`.
2. Serveris atsako `{ action: "socketId", data: "<id>" }`.
3. Klientas išsaugo `socketId` ir naudoja jį kaip trečiąją koordinatę kiekvienos kambario prenumeratos metu.

### Prisijungimas prie kambario

„Kambarys“ – tai tiesiog `(churchId, conversationId)` seka. Norėdamas prenumeruoti, klientas siunčia `Connection` įrašą:

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

Prisijungus taip pat išsiunčiamas `attendance` pranešimas apie pokalbį, kad esami prenumeratoriai sužinotų apie naują žiūrovą.

### Žinutės siuntimas

`POST /messaging/messages/send` (leidžiama anonimams) arba `POST /messaging/messages/` (reikia prisijungti):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Serveris išsaugo žinutę, tada `DeliveryHelper.sendConversationMessages()` suranda visus tam `conversationId` priklausančius ryšių įrašus ir kiekvienam ryšiui išsiunčia kadrą `{ action: "message", data: <message> }`.

Pokalbiams, susietiems su turiniu (pavyzdžiui, pastabomis, pridėtomis prie asmens), po to dar siunčiamas transliavimas su `action: "conversationActivity"` sintetiniame kambaryje `"content-{type}-{id}"`. Taip sąrašų rodinių naudotojai žino, kad reikia atnaujinti duomenis, nebūdami prisijungę prie pagrindinio pokalbio.

### Išėjimas iš kambario

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Ši užklausa pašalina ryšio įrašą ir išsiunčia paskutinį `attendance` pranešimą.

## Serverio komponentai

| Failas | Paskirtis |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Valdo `WebSocketServer`. Prisijungus priskiria `socketId`. Kas 30 sekundžių vykdo ping/pong širdies plakimo patikrą (`startHeartbeat`): ryšį, kuris nepateikia pong atsakymo, nutraukia (`terminate()`) ir išvalo. Pašalina neveikiančius ryšius ir atsijungus iš naujo išsiunčia `attendance` pranešimą. Pateikia `getLiveSocketIds()` ir `reapStaleConnections()`, kuriuos naudoja 30 minučių laikmatis, ištrinantis pasenusius `connections` įrašus: lokaliai tikrinama, kurie socketId vis dar aktyvūs procese; AWS aplinkoje tai 24 valandų TTL atsarginis mechanizmas, skirtas praleistiems `$disconnect` įvykiams (API Gateway riboja ryšius iki maždaug 2 valandų, todėl gyvo ryšio jis negali pašalinti) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` nuskaito kambario ryšius ir kiekvieną kadrą nukreipia į vietinį ryšį arba į AWS API Gateway ryšį. `sendAttendance(churchId, conversationId)` sudaro ir transliuoja žiūrovų suvestinę |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` – prisijungimas, `DELETE /:churchId/:conversationId/:socketId` – išėjimas, `POST /setName` – rodomo vardo atnaujinimas |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonimams) ir `POST /` (prisijungusiems) išsaugo žinutę, tada ją paskirsto |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` yra patikimas šaltinis, kas yra prenumeratoje |

## Kliento pagrindiniai elementai (`@churchapps/apphelper`)

Visi penki pagrindiniai elementai yra statiniai singletonai, esantys `apphelper/src/helpers/`. Jie veikia kartu, todėl kiekviename skirtuke atidaromas **vienas** WebSocket ryšys, nepaisant to, kiek komponentų puslapyje įkeliama.

### `SocketHelper`

Valdo vieną WebSocket ryšį. Pakartotinis `init()` kvietimas yra idempotentiškas – kelių komponentų kvietimai neatidaro dublikuotų ryšių. Pateikia:

- `init()` – atidaro (arba naudoja esamą) ryšį ir užbaigia `getId` rankos paspaudimą. Įvykdomas, kai rankos paspaudimas baigtas, arba, pasibaigus 5 sekundžių laikui, kai fone veikiantis bandymų ciklas perima valdymą; ši funkcija niekada nebaigiasi klaida, todėl kviečiantiesiems nereikia atskirai tvarkyti nesėkmingo pirmojo prisijungimo.
- `addHandler(action, id, fn)` / `removeHandler(id)` – registruoja ir išregistruoja klausytojus pagal `action`. Tą patį veiksmą gali klausyti keli apdorotojai.
- `setPersonChurch({ personId, churchId })` – skirta prisijungusiems naudotojams; užsako `"alerts"` kambario prenumeratą, kad pranešimai būtų gaunami per šį ryšį.
- `onSocketIdReady(fn)` – suveikia su kiekvienu nauju socketId, o ne tik pirmą kartą – tiek pradinio rankos paspaudimo metu, tiek kiekvieno vėlesnio atsijungimo ir prisijungimo iš naujo metu. Naudoja `SubscriptionManager`, kad išsiųstų laukiančius prisijungimus.
- `checkConnection()` – kviečiamas žemiau aprašytų atnaujinimo klausytojų; jei ryšys jau uždarytas, prisijungia iš naujo nedelsiant, o jei atrodo atviras, išsiunčia gyvybingumo patikrą.

**Prisijungimo iš naujo ciklas.** Netikėtai nutrūkus ryšiui, prisijungimas iš naujo planuojamas su eksponentiniu laukimu (1 s, dvigubinant iki 30 s ribos). `SocketHelper` taip pat klausosi įvykių `online`, `focus`, `pageshow` ir `visibilitychange` ant `window` / `document`, kad aptiktų, jog skirtukas vėl aktyvus: jei ryšys jau uždarytas, prisijungiama iš karto ir laukimas atstatomas; jei ryšys atrodo atviras, siunčiama `"getId"` gyvybingumo patikra, o jei per 3 sekundes negaunamas joks kadras, ryšys priverstinai atkuriamas. Tai aptinka „pusiau atviras“ ryšius, likusius po to, kai mobilioji operacinė sistema sustabdo programėlę. Sėkmingai iš naujo atlikus rankos paspaudimą, `SocketHelper` išsiunčia vietinį `"reconnect"` veiksmą (žr. [Ryšio protokolas](#wire-protocol)) visiems tam veiksmui užregistruotiems apdorotojams.

### `SubscriptionManager`

Kambario narystė skaičiuojama pagal nuorodas. Keli komponentai, prenumeruojantys tą patį pokalbį, serveryje sukuria tik vieną ryšio įrašą.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Trys elgsenos, kurias naudotojai gauna nemokamai:

- **Atidėtas išėjimas (300 ms)** – išgyvena React StrictMode dvigubą montavimą / demontavimą ir trumpus perkrovimo ciklus, nenutraukdamas serverio prenumeratos; `reset()` taip pat atšaukia visus laukiančius atidėtus išėjimus.
- **Prisijungimas iš naujo** – `SubscriptionManager` prisimena `personId` / `displayName`, naudotus prisijungiant prie kiekvieno kambario, todėl `SocketHelper` `"reconnect"` įvykio metu (ir kiekvieno `onSocketIdReady` iškvietimo metu) iš naujo siunčia visus aktyvius ryšių įrašus su išsaugota tapatybe. Pakartotiniai prisijungimai nustatomi pagal socketId, todėl tas pats atsijungimas kambario nesiunčia dvigubai.
- **Vėliau susietas socketId** – `joinRoom` įrašo ketinimą dar prieš ryšiui užbaigiant rankos paspaudimą; tikrasis `POST /connections` siunčiamas, kai įvyksta `onSocketIdReady`.

### `ConversationStore`

Atmintyje laikoma podėlio talpykla, indeksuojama pagal `conversationId`. Vieną kartą registruoja `message` / `deleteMessage` / `privateMessage` ryšio apdorotojus ir gaunamus kadrus pritaiko šiuo metu atidarytiems pokalbiams.

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

Prisijungę naudotojai taip pat gauna **asmenų papildymą** – gaunamų žinučių `personId` išsprendžiami į `PersonInterface` objektus per talpykloje saugomą `GET /people/ids` užklausą. Anonimai šio žingsnio praleidžia.

Gavus `"reconnect"` įvykį iš `SocketHelper`, `ConversationStore` iš naujo gauna kiekvieno pokalbio, turinčio aktyvių `subscribe` klausytojų, duomenis ir atkuria žinutes, praleistas ryšiui nutrūkus. Anoniminiai pokalbiai šio atkūrimo nevykdo, jei jų `churchId` niekada nebuvo įrašytas, nes atkūrimo galutiniam taškui jis būtinas.

### `PresenceStore`

Veikia kaip `ConversationStore` analogas `attendance` veiksmui. Prenumeratoriai gauna `PresenceSnapshot { conversationId, totalViewers, viewers }`, kai serveris iš naujo transliuoja buvimo informaciją. Identiški momentiniai vaizdai prieš pranešimą atmetami, todėl ryšio atkūrimo bangos nesukelia nereikalingo perpiešimo.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Pagrindinis **prisijungusių** naudotojų paleidimo taškas. Apvynioja `SocketHelper.init()`, nustato asmens ir bažnyčios kontekstą (tai automatiškai prijungia prie `"alerts"` kambario) ir tiksliai vieną kartą iškviečia `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()`. Taip pat registruoja savo `"reconnect"` apdorotoją, kuris iš naujo įkelia pranešimų ir privačių žinučių skaitiklius, kad žymekliai atsistatytų po nutrūkusio ryšio.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anoniminiai srautai (pavyzdys – tiesioginės transliacijos pokalbis) praleidžia `NotificationService` ir tiesiogiai kviečia pagrindinius elementus. Nuorodinį įgyvendinimą rasite `B1App/src/helpers/StreamChatManager.ts`.

## Tiesioginės transliacijos pokalbis

Tiesioginė transliacija yra didžiausias anoniminis sistemos vartotojas. Kambariams apibrėžti naudojami du `contentType`:

- `streamingLive` – viešas pokalbio skirtukas `/stream` puslapyje (vienas kambarys kiekvienai `streamingService`).
- `streamingLiveHost` – privatus kambarys, matomas tik darbuotojams, turintiems `contentApi.chat.host` leidimą. Kambario ID serveryje užšifruojamas (`GET /streamingServices/:id/hostChat`), kad atsitiktinis duomenų rinkimas jo neatskleistų.

`B1App/src/helpers/StreamChatManager.ts` paleidžia abu kambarius per bendrus pagrindinius elementus – atskiro, tik tiesioginei transliacijai skirto ryšio kodo nebėra.

## Modeliai ir dažnos klaidos

- **Neatidarykite savo WebSocket ryšio.** `SocketHelper` yra singletonas, ir tai yra tyčia. Jei reikia klausytis pasirinktinio veiksmo, užregistruokite apdorotoją esamame ryšyje per `SocketHelper.addHandler`.
- **Neapeikite `SubscriptionManager`.** Tiesioginiai `POST /connections` kvietimai veikia, bet praranda nuorodų skaičiavimą, atidėtą išėjimą ir prisijungimą iš naujo. Grupinis pokalbis ir privačių žinučių naudotojai visi naudoja `SubscriptionManager`.
- **Apdorotojų ID turi būti unikalūs kiekvienam veiksmui.** `SocketHelper.addHandler(action, id, fn)` indeksuoja pagal `(action, id)`; jei dviems klausytojams naudojamas tas pats ID, pirmasis pakeičiamas. Bendros talpyklos naudoja ID, pvz., `"ConversationStore-Message"` ir `"PresenceStore-Attendance"`, kad nesutaptų su naudotojų ID.
- **Kambarių ID yra neinterpretuojamos eilutės.** Dauguma jų – pokalbių UUID, bet sistema taip pat palaiko `"alerts"` (pranešimai kiekvienam asmeniui), `"content-{type}-{id}"` (sintetiniai veiklos kambariai) ir užšifruotus `streamingLiveHost` ID.
- **Autentifikacija tikrinama REST sąsajos riboje, o ne ryšyje.** Prisijungimas prie kambario per `POST /connections` leidžiamas anonimams; prieigos kontrolė vykdoma siunčiant žinutę (žinučių valdiklis nusprendžia, kokio `messageType` žinutes gali siųsti anonimas).

## Susiję puslapiai

- [Pranešimų architektūra](./architecture/notifications) -- Programos, push ir el. pašto pranešimų eskalavimo grandinė, į kurią patenka šis perdavimo kanalas
- [Pranešimų pagalbinės funkcijos](./api/endpoints/messaging) -- Visa REST sąsaja žinutėms, pokalbiams, ryšiams ir įrenginiams
- [Naršyklės push pranešimai](./web-push) -- Naršyklės push pranešimai, atskiri nuo puslapio ryšio perdavimo
- [AppHelper](./shared-libraries/app-helper) -- npm paketas, kuriame pateikiami kliento pagrindiniai elementai
- [Modulio struktūra](./api/module-structure) -- Kaip serverio pusėje organizuotas pranešimų modulis
