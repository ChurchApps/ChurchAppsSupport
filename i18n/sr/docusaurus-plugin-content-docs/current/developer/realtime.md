---
title: "Архитектура у реалном времену"
---

# Архитектура у реалном времену

<div class="article-intro">

ChurchApps користи јединствен систем испоруке заснован на WebSocket-у за све површине у реалном времену: групно ћаскање, приватне поруке, белешке уз садржај, ћаскање током директног преноса и присуство/евиденцију присутних. Ова страница документује протокол, сервер и клијентске примитиве које корисници користе.

</div>

## Преглед

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

Протокол има три дела:

1. **Једна трајна WebSocket веза** по картици прегледача, коју отвара `SocketHelper`.
2. **Редови веза** (`POST /messaging/connections`) забележени у табели `connections`. Они означавају торку `(socketId, churchId, conversationId)` као претплатника на собу.
3. **Прослеђивање са серверске стране** помоћу `DeliveryHelper.sendConversationMessages()`. Када се порука сачува (`POST /messaging/messages/send`), сервер чита одговарајуће редове веза и шаље типизовани садржај свакој отвореној вези.

Нема Socket.IO-а, нема резервног long-polling механизма и нема посебног микросервиса. WebSocket ради у истом процесу као REST API (`web` Lambda за HTTP, `socket` Lambda за WebSocket на AWS-у; један заједнички процес локално и на Railway-у).

## Портови и транспорт

| Окружење | HTTP | WebSocket |
|----------|------|-----------|
| Локални развој | `8084` | `ws://localhost:8087` (посебан `WebSocketServer`) |
| Railway / Docker / хостови са једним портом (постављено `RAILWAY_ENVIRONMENT` или `SELF_HOSTED`) | заједнички | заједнички HTTP сервер (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (руте `$connect` / `$disconnect` / `$default`) |

Избор транспорта одређује конфигурација `deliveryProvider`:

- `local` → сирова `ws` библиотека; клијенти се повезују на `MessagingApiSocket` из `CommonEnvironmentHelper`-а.
- `aws` → API Gateway WebSocket; сервер шаље садржај активним везама преко `@aws-sdk/client-apigatewaymanagementapi`.

Клијент никада не мора да зна који се користи. У оба случаја говори исти JSON протокол.

## Протокол преноса

Сваки оквир је JSON облика `PayloadInterface`:

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

### Рукопожимање

1. Клијент отвара везу и шаље дословни стринг `"getId"`.
2. Сервер одговара са `{ action: "socketId", data: "<id>" }`.
3. Клијент чува `socketId` и користи га као трећу координату сваке претплате на собу.

### Придруживање соби

„Соба“ је само торка `(churchId, conversationId)`. Да би се претплатио, клијент шаље ред `Connection`:

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

Слање такође покреће емитовање `attendance` у разговору, како би постојећи претплатници сазнали да се придружио нови гледалац.

### Слање поруке

`POST /messaging/messages/send` (дозвољено анонимно) или `POST /messaging/messages/` (захтева пријаву):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Сервер чува поруку, затим `DeliveryHelper.sendConversationMessages()` проналази све редове веза за тај `conversationId` и шаље свакој вези оквир `{ action: "message", data: <message> }`.

За разговоре везане за садржај (нпр. белешке прикачене уз особу), друго емитовање са `action: "conversationActivity"` покреће се у синтетичкој соби `"content-{type}-{id}"`. Тако корисници приказа листе знају да треба да освежe садржај, а да не морају да држе отворен основни разговор.

### Напуштање собе

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Брише ред везе и покреће коначно емитовање `attendance`.

## Компоненте на серверској страни

| Датотека | Улога |
|----------|-------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Поседује `WebSocketServer`. Додељује `socketId` при повезивању. Покреће ping/pong проверу активности (`startHeartbeat`) на сваких 30 секунди; прекида (`terminate()`) и чисти сваку везу која не одговори на pong. Чисти мртве сокете и покреће поновно емитовање присуства при прекиду везе. Излаже `getLiveSocketIds()` и `reapStaleConnections()`, које користи тајмер од 30 минута за брисање застарелих редова у `connections`. Локално проверава који socketId-јеви су још активни у процесу. На AWS-у служи као резервни механизам са TTL од 24 сата за пропуштене догађаје `$disconnect` (API Gateway ограничава везе на око 2 сата, тако да не може да обрише активну везу) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` чита везе за собу и шаље сваки оквир локалном сокету или вези AWS API Gateway-а. `sendAttendance(churchId, conversationId)` прави и емитује снимак гледалаца |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` придружује, `DELETE /:churchId/:conversationId/:socketId` напушта, `POST /setName` ажурира приказано име |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (анонимно) и `POST /` (за пријављене) чувају, а затим прослеђују |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` је извор истине о томе ко је претплаћен |

## Основни елементи на клијентској страни (`@churchapps/apphelper`)

Свих пет примитива су статички singleton-и у `apphelper/src/helpers/`. Они сарађују тако да сваки картица отвара **једну** WebSocket везу, без обзира на број компоненти које се учитају на страници.

### `SocketHelper`

Поседује јединствену WebSocket везу. Поновни позив `init()` је идемпотентан, па више компоненти може да га позове без отварања дуплих веза. Излаже:

- `init()`: отвара (или поново користи) везу и завршава `getId` рукопожимање. Завршава се када се рукопожимање заврши или, после истека времена од 5 секунди, када позадински циклус поновних покушаја преузме. Никада не одбија позив, тако да позиваоци не морају посебно да обрађују неуспешно прво повезивање.
- `addHandler(action, id, fn)` / `removeHandler(id)`: региструју и одјављују слушаче по `action`. Више обрађивача може да слуша исту акцију.
- `setPersonChurch({ personId, churchId })`: за пријављене позиваоце. Покреће претплату на собу `"alerts"` да би push обавештења стизала на ову везу.
- `onSocketIdReady(fn)`: окида се при сваком новом socketId-у, а не само при првом. То укључује почетно рукопожимање и свако наредно поновно повезивање. `SubscriptionManager` га користи за слање чекајућих придруживања.
- `checkConnection()`: позива га слушаоци наставка рада испод. Одмах се поново повезује ако је веза већ затворена, или шаље проверу живости ако изгледа отворено.

**Животни циклус поновног повезивања.** Неочекивано затварање заказује поновно повезивање са експоненцијалним успоравањем (1 с, удвостручавајући се до ограничења од 30 с). `SocketHelper` такође слуша `online`, `focus`, `pageshow` и `visibilitychange` на `window`/`document` да би детектовао да се картица поново активирала. Ако је веза већ затворена, одмах се поново повезује и поништава успоравање. Ако изгледа отворено, шаље `"getId"` проверу живости и приморава поновно повезивање ако ниједан оквир не стигне за 3 секунде. Тако се хватају полуотворени сокети које остави мобилни ОС кад суспендује апликацију. Након успешног поновног рукопожимања, `SocketHelper` шаље локалну акцију `"reconnect"` (погледајте [Протокол преноса](#wire-protocol)) сваком регистрованом обрађивачу за ту акцију.

### `SubscriptionManager`

Чланство у собама се броји референцама. Више компоненти које се претплаћују на исти разговор региструје само један ред везе на серверу.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Три понашања која корисници добијају без додатног рада:

- **Одложено напуштање (300 ms)**: преживљава двоструко монтирање и демонтирање React StrictMode-а и кратке циклусе поновног монтирања без прекида претплате на серверу. `reset()` такође поништава сва чекајућа одложена напуштања.
- **Поновно придруживање при повезивању**: `SubscriptionManager` памти `personId`/`displayName` коришћене за придруживање свакој соби. Зато при догађају `"reconnect"` на `SocketHelper`-у (и при сваком позиву `onSocketIdReady`) поново шаље сваки активан ред везе са очуваним идентитетом. Поновна придруживања се дедуплицирају по socketId-у, тако да исто поновно повезивање не шаље исту собу два пута.
- **Касно везивање socketId-а**: `joinRoom` бележи намеру пре него што веза заврши рукопожимање. Стварни `POST /connections` се покреће при `onSocketIdReady`.

### `ConversationStore`

Кеш у меморији са кључем `conversationId`. Региструје обрађиваче веза за `message` / `deleteMessage` / `privateMessage` тачно једном и примењује долазне оквире на сваки разговор који је тренутно отворен.

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

Пријављени позиваоци такође добијају **попуњавање података о особама**. `personId`-јеви у долазним порукама се претварају у објекте `PersonInterface` преко кешираног упита `GET /people/ids`. Анонимни позиваоци ово прескачу.

При догађају `"reconnect"` на `SocketHelper`-у, `ConversationStore` поново преузима сваки разговор који тренутно има активне слушаоце `subscribe`. Тако враћа поруке пропуштене док је веза била прекинута. Анонимни разговори прескачу ово надопуњавање ако њихов `churchId` никада није забележен, јер крајња тачка за надопуњавање га захтева.

### `PresenceStore`

Прати образац `ConversationStore`-а за акцију `attendance`. Претплатници примају `PresenceSnapshot { conversationId, totalViewers, viewers }` сваки пут када сервер поново емитује присуство. Идентични снимци се дедуплицирају пре обавештавања, тако да бујица поновних повезивања не покреће непотребна поновна исцртавања.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Покретање највишег нивоа за **пријављене** позиваоце. Омотава `SocketHelper.init()`, поставља контекст особе и цркве (што аутоматски придружује собу `"alerts"`) и позива `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` тачно једном. Такође региструје сопствени обрађивач `"reconnect"` који поново учитава бројаче обавештења и приватних порука, тако да се значке опораве после прекинуте везе.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Анонимни токови (ћаскање током директног преноса је најбољи пример) прескачу `NotificationService` и директно позивају примитиве. За референтну имплементацију погледајте `B1App/src/helpers/StreamChatManager.ts`.

## Ћаскање уживо током директног преноса

Директан пренос је највећи анонимни корисник овог система. За ограничавање соба користи два `contentType`-а:

- `streamingLive`: јавна картица за ћаскање на `/stream` (по једна соба за сваки `streamingService`).
- `streamingLiveHost`: приватна соба видљива само особљу са дозволом `contentApi.chat.host`. Идентификатор собе се шифрује на серверу (`GET /streamingServices/:id/hostChat`), како случајно прикупљање података не би открило тај идентификатор.

`B1App/src/helpers/StreamChatManager.ts` покреће обе собе преко јединствених примитива. Више не постоји код за везу специфичан за директан пренос.

## Обрасци и уобичајене грешке

- **Не отварајте сопствени WebSocket.** `SocketHelper` је singleton из разлога. Ако треба да слушате прилагођену акцију, региструјте обрађивач на постојећој вези помоћу `SocketHelper.addHandler`.
- **Не заобилазите `SubscriptionManager`.** Директни позиви `POST /connections` раде, али губе бројање референци, одложено напуштање и поновно придруживање при повезивању. Корисници групног ћаскања и приватних порука све иду кроз `SubscriptionManager`.
- **Идентификатори обрађивача морају бити јединствени по акцији.** `SocketHelper.addHandler(action, id, fn)` кључа по `(action, id)`, па поновна употреба истог идентификатора за два слушаоца замењује први. Јединствени продавнице користе идентификаторе попут `"ConversationStore-Message"` и `"PresenceStore-Attendance"`, да се држе подаљ од идентификатора корисника.
- **Идентификатори соба су непрозирни стрингови.** Већина су UUID-ови разговора, али систем подржава и `"alerts"` (обавештења по особи), `"content-{type}-{id}"` (синтетичке собе за активности) и шифроване `streamingLiveHost` идентификаторе.
- **Аутентикација се проверава на REST граници, а не на вези.** Придруживање соби преко `POST /connections` је дозвољено анонимно. Контрола приступа се дешава у време слања поруке (контролер порука одлучује које `messageType`-ове анонимни позивалац може да шаље).

## Повезане странице

- [Архитектура обавештења](./architecture/notifications) -- Лествица ескалације обавештења у апликацији, push-а и е-поште у коју овај транспорт доставља податке
- [Крајње тачке за поруке](./api/endpoints/messaging) -- Потпуна REST површина за поруке, разговоре, везе и уређаје
- [Web push обавештења](./web-push) -- Push у прегледачу, одвојено од испоруке преко сокета на страници
- [AppHelper](./shared-libraries/app-helper) -- npm пакет који испоручује клијентске примитиве
- [Структура модула](./api/module-structure) -- Како је модул за поруке организован на серверској страни
