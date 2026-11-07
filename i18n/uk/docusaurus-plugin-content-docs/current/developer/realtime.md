---
title: "Архітектура реального часу"
description: "Як WebSocket-рівень ChurchApps передає чат, присутність і сповіщення в реальному часі: рукостискання, підписки на кімнати та клієнтські примітиви."
---

# Архітектура реального часу

<div class="article-intro">

ChurchApps використовує єдиний механізм доставки на основі WebSocket для всіх функцій реального часу: групового чату, приватних повідомлень, нотаток до контенту, чату живої трансляції та присутності/відвідуваності. На цій сторінці описано протокол, сервер і клієнтські примітиви, які використовують споживачі.

</div>

## Огляд

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

Протокол складається з трьох частин:

1. **Одне постійне WebSocket-з'єднання** на кожну вкладку браузера, яке відкриває `SocketHelper`.
2. **Рядки з'єднань** (`POST /messaging/connections`), що зберігаються в таблиці `connections`. Кожен такий рядок позначає кортеж `(socketId, churchId, conversationId)` як передплатника кімнати.
3. **Розсилка на боці сервера** через `DeliveryHelper.sendConversationMessages()`. Коли повідомлення зберігається (`POST /messaging/messages/send`), сервер знаходить відповідні рядки з'єднань і надсилає типізований payload кожному відкритому сокету.

Socket.IO, резервного long-polling і окремого мікросервісу немає. WebSocket працює в тому самому процесі, що й REST API (в AWS: Lambda `web` для HTTP і Lambda `socket` для WebSocket; локально та на Railway — один спільний процес).

## Порти та транспорт

| Середовище | HTTP | WebSocket |
|-------------|------|-----------|
| Локальна розробка | `8084` | `ws://localhost:8087` (окремий `WebSocketServer`) |
| Railway / Docker / хости з одним портом (встановлено `RAILWAY_ENVIRONMENT` або `SELF_HOSTED`) | спільний | спільний HTTP-сервер (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (маршрути `$connect` / `$disconnect` / `$default`) |

Вибір транспорту визначається конфігурацією `deliveryProvider`:

- `local` → нативна бібліотека `ws`; клієнти підключаються до `MessagingApiSocket` з `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; сервер надсилає payload активним з'єднанням через `@aws-sdk/client-apigatewaymanagementapi`.

Клієнту не потрібно знати, який транспорт використовується: в обох випадках він працює з одним і тим самим JSON-протоколом.

## Формат повідомлень протоколу

Кожен кадр є JSON зі структурою `PayloadInterface`:

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

### Рукостискання

1. Клієнт відкриває сокет і надсилає рядок `"getId"`.
2. Сервер відповідає `{ action: "socketId", data: "<id>" }`.
3. Клієнт зберігає `socketId` і використовує його як третю координату кожної підписки на кімнату.

### Приєднання до кімнати

«Кімната» — це просто кортеж `(churchId, conversationId)`. Щоб підписатися, клієнт надсилає рядок `Connection`:

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

Після цього сервер також надсилає розсилку `attendance` для розмови, щоб наявні передплатники дізналися про нового глядача.

### Надсилання повідомлення

`POST /messaging/messages/send` (доступно анонімним користувачам) або `POST /messaging/messages/` (потрібна автентифікація):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Сервер зберігає повідомлення, після чого `DeliveryHelper.sendConversationMessages()` знаходить усі рядки з'єднань для цього `conversationId` і надсилає кожному сокету кадр `{ action: "message", data: <message> }`.

Для розмов, прив'язаних до контенту (наприклад, нотаток до особи), на синтетичну кімнату `"content-{type}-{id}"` додатково надсилається розсилка з `action: "conversationActivity"`. Це дозволяє споживачам у режимі списку оновлювати дані, не тримаючи відкритою основну розмову.

### Вихід із кімнати

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Видаляє рядок з'єднання і надсилає фінальну розсилку `attendance`.

## Серверні компоненти

| Файл | Призначення |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Керує `WebSocketServer`. Призначає `socketId` під час підключення. Виконує ping/pong-хартбіт кожні 30 с (`startHeartbeat`), який викликає `terminate()` і очищає з'єднання, що не відповіло на pong. Очищає мертві сокети і при відключенні запускає повторну розсилку присутності. Надає `getLiveSocketIds()` і `reapStaleConnections()`, які використовує таймерна задача кожні 30 хвилин для видалення застарілих рядків `connections`: локально — перевіркою, які socketId ще живі в процесі; в AWS — як резервне видалення з TTL 24 години для пропущених подій `$disconnect` (API Gateway обмежує з'єднання приблизно 2 годинами, тому живе з'єднання цим не видаляється) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` читає з'єднання для кімнати і спрямовує кожен кадр до локального сокета або до з'єднання AWS API Gateway. `sendAttendance(churchId, conversationId)` формує та розсилає знімок глядачів |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` — приєднання, `DELETE /:churchId/:conversationId/:socketId` — вихід, `POST /setName` — оновлення відображуваного імені |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (анонімно) і `POST /` (з автентифікацією) зберігають повідомлення, а потім розсилають їх |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` — джерело істини щодо того, хто підписаний |

## Клієнтські примітиви (`@churchapps/apphelper`)

Усі п'ять примітивів є статичними singleton-об'єктами в `apphelper/src/helpers/`. Вони працюють разом, тож кожна вкладка відкриває **одне** WebSocket-з'єднання, незалежно від того, скільки компонентів змонтовано на сторінці.

### `SocketHelper`

Керує єдиним WebSocket-з'єднанням. Повторний виклик `init()` ідемпотентний: кілька компонентів можуть викликати його без відкриття дублікатів сокета. Надає:

- `init()` — відкриває (або повторно використовує) сокет і завершує рукостискання `getId`. Завершується після успішного рукостискання або, після 5-секундного тайм-ауту, після того як фоновий цикл повторних спроб бере управління на себе. Метод ніколи не відхиляє проміс, тому викликачам не потрібно обробляти помилку першого підключення окремо.
- `addHandler(action, id, fn)` / `removeHandler(id)` — реєструють і знімають обробники за `action`. Кілька обробників можуть слухати одну й ту саму дію.
- `setPersonChurch({ personId, churchId })` — для автентифікованих викликачів; запускає підписку на кімнату `"alerts"`, щоб push-сповіщення надходили на цей сокет.
- `onSocketIdReady(fn)` — спрацьовує для кожного нового socketId, а не лише для першого: і під час початкового рукостискання, і при кожному наступному перепідключенні. Використовується `SubscriptionManager` для відправки відкладених приєднань.
- `checkConnection()` — викликається слухачами відновлення, наведеними нижче; перепідключає одразу, якщо сокет уже закритий, або надсилає перевірку активності, якщо він виглядає відкритим.

**Життєвий цикл перепідключення.** Неочікуване закриття планує перепідключення з експоненційною затримкою (1 с, подвоюючи до межі 30 с). `SocketHelper` також слухає події `online`, `focus`, `pageshow` і `visibilitychange` на `window`/`document`, щоб виявити відновлення вкладки. Якщо сокет уже закритий, він перепідключається одразу і скидає затримку. Якщо сокет виглядає відкритим, він надсилає перевірку активності `"getId"` і примусово перепідключається, якщо жоден кадр не надійшов протягом 3 с. Так виявляються «напіввідкриті» сокети, що залишаються після того, як мобільна ОС призупинить застосунок. Після успішного повторного рукостискання `SocketHelper` надсилає локальну дію `"reconnect"` (див. [Формат повідомлень протоколу](#wire-protocol)) кожному зареєстрованому обробнику цієї дії.

### `SubscriptionManager`

Членство в кімнатах з підрахунком посилань. Кілька компонентів, підписаних на одну розмову, реєструють лише один рядок з'єднання на сервері.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Три поведінки, які споживачі отримують автоматично:

- **Відкладене виходження (300 мс)** — переживає подвійне монтування/демонтування React StrictMode і короткі цикли повторного монтування, не скидаючи підписку на сервері. `reset()` також скасовує всі відкладені виходи.
- **Повторне приєднання після перепідключення** — `SubscriptionManager` пам'ятає `personId`/`displayName`, які використовувалися для приєднання до кожної кімнати, тож при події `"reconnect"` від `SocketHelper` (і при кожному виклику `onSocketIdReady`) він повторно надсилає кожен активний рядок з'єднання з незмінною ідентичністю. Повторні приєднання дедуплікуються за socketId, тому одне й те саме перепідключення не надсилає кімнату двічі.
- **Пізнє прив'язування socketId** — `joinRoom` фіксує намір до завершення рукостискання сокета, а фактичний `POST /connections` виконується при `onSocketIdReady`.

### `ConversationStore`

Кеш у пам'яті, ключем якого є `conversationId`. Реєструє обробники сокета `message` / `deleteMessage` / `privateMessage` рівно один раз і застосовує вхідні кадри до всіх розмов, які наразі відкриті.

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

Автентифіковані викликачі також отримують **заповнення даних про людей**: `personId` у вхідних повідомленнях перетворюються на об'єкти `PersonInterface` через кешований запит `GET /people/ids`. Анонімні викликачі цей крок пропускають.

Після події `"reconnect"` від `SocketHelper` `ConversationStore` повторно завантажує всі розмови, що наразі мають активних слухачів `subscribe`, і відновлює повідомлення, пропущені під час відсутності з'єднання. Анонімні розмови пропускають це наздоганяння, якщо їхній `churchId` ніколи не був збережений (кінцева точка наздоганяння його вимагає).

### `PresenceStore`

Повторює шаблон `ConversationStore` для дії `attendance`. Передплатники отримують `PresenceSnapshot { conversationId, totalViewers, viewers }` щоразу, коли сервер повторно розсилає присутність. Ідентичні знімки дедуплікуються перед сповіщенням, тож хвилі перепідключень не спричиняють зайвих перерендерів.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Загальний запуск для **автентифікованих** викликачів. Обгортає `SocketHelper.init()`, встановлює контекст особи та церкви (що автоматично приєднує до кімнати `"alerts"`) і рівно один раз викликає `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()`. Також реєструє власний обробник `"reconnect"`, який перезавантажує лічильники сповіщень і приватних повідомлень, щоб значки відновлювалися після розриву з'єднання.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Анонімні сценарії (прикладом є чат живої трансляції) пропускають `NotificationService` і викликають примітиви безпосередньо. Референсну реалізацію див. у `B1App/src/helpers/StreamChatManager.ts`.

## Чат живої трансляції

Жива трансляція є найбільшим анонімним споживачем цього механізму. Для визначення області кімнат вона використовує два `contentType`:

- `streamingLive` — публічна вкладка чату на `/stream` (одна кімната на кожен `streamingService`).
- `streamingLiveHost` — приватна кімната, видима лише співробітникам із дозволом `contentApi.chat.host`. Ідентифікатор кімнати шифрується на сервері (`GET /streamingServices/:id/hostChat`), щоб випадкове скрапінг не розкривав його.

`B1App/src/helpers/StreamChatManager.ts` запускає обидві кімнати через уніфіковані примітиви. Окремого коду сокета для живої трансляції більше немає.

## Шаблони та типові помилки

- **Не відкривайте власне WebSocket-з'єднання.** `SocketHelper` є singleton не без причини. Якщо потрібно слухати власну дію, зареєструйте обробник на наявному сокеті через `SocketHelper.addHandler`.
- **Не обходьте `SubscriptionManager`.** Прямі виклики `POST /connections` працюють, але втрачають підрахунок посилань, відкладене виходження та повторне приєднання після перепідключення. Усі споживачі групового чату та приватних повідомлень працюють через `SubscriptionManager`.
- **Ідентифікатори обробників мають бути унікальними для кожної дії.** `SocketHelper.addHandler(action, id, fn)` індексує за парою `(action, id)`. Повторне використання того самого ідентифікатора для двох слухачів замінює перший. Уніфіковані сховища використовують ідентифікатори на кшталт `"ConversationStore-Message"` і `"PresenceStore-Attendance"`, щоб не конфліктувати з ідентифікаторами споживачів.
- **Ідентифікатори кімнат — непрозорі рядки.** Більшість із них є UUID розмов, але система також підтримує `"alerts"` (сповіщення для окремої особи), `"content-{type}-{id}"` (синтетичні кімнати активності) і зашифровані ідентифікатори `streamingLiveHost`.
- **Автентифікація перевіряється на межі REST, а не сокета.** Приєднання до кімнати через `POST /connections` доступне анонімно. Контроль доступу відбувається під час надсилання повідомлення: контролер повідомлень визначає, які `messageType` може надсилати анонімний викликач.

## Пов'язані сторінки

- [Архітектура сповіщень](./architecture/notifications.md) -- Воронка сповіщень у застосунку, push-повідомленнях і електронній пошті, яку живить цей транспорт
- [Кінцеві точки повідомлень](./api/endpoints/messaging.md) -- Повний REST-інтерфейс для повідомлень, розмов, з'єднань і пристроїв
- [Web Push-сповіщення](./web-push.md) -- Push-сповіщення браузера, окремо від доставки в межах сторінки через сокет
- [AppHelper](./shared-libraries/app-helper.md) -- Пакет npm, що постачає клієнтські примітиви
- [Структура модулів](./api/module-structure.md) -- Як організовано модуль повідомлень на сервері
