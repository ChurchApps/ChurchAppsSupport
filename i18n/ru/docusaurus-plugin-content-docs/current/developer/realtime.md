---
title: "Архитектура реального времени"
---

# Архитектура реального времени

<div class="article-intro">

ChurchApps использует единую платформу доставки на основе WebSocket для каждой поверхности реального времени — групповой чат, личные сообщения, примечания к контенту, чат трансляции и присутствие/посещаемость. На этой странице документируется протокол, сервер и примитивы клиента, которые потребители используют.

</div>

## Обзор

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

Протокол имеет три части:

1. **Один постоянный WebSocket** на вкладке браузера, открытый `SocketHelper`.
2. **Строки соединения** (`POST /messaging/connections`), записанные в таблицу `connections` — эти обозначают кортеж `(socketId, churchId, conversationId)` как подписчика комнаты.
3. **Разброс на стороне сервера** через `DeliveryHelper.sendConversationMessages()` — когда сообщение сохраняется (`POST /messaging/messages/send`), сервер читает соответствующие строки соединения и отправляет типизированную полезную нагрузку на каждый открытый сокет.

Нет Socket.IO, нет fallback дальнего опроса и нет отдельного микросервиса. WebSocket работает в том же процессе, что и REST API (Lambda `web` для HTTP, `socket` Lambda для WebSocket на AWS; один объединённый процесс локально и на Railway).

## Порты и транспорт

| Окружение | HTTP | WebSocket |
|-------------|------|-----------|
| Локальная разработка   | `8084` | `ws://localhost:8087` (отдельный `WebSocketServer`) |
| Railway / single-port хосты | общий | общий HTTP сервер (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default` маршруты) |

Селектор транспорта — это конфигурация `deliveryProvider`:

- `local` → библиотека `ws`; клиенты подключаются к `MessagingApiSocket` из `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; сервер отправляет полезные нагрузки на активные соединения через `@aws-sdk/client-apigatewaymanagementapi`.

Клиент никогда не должен знать, какой используется — он говорит на одном и том же JSON протоколе в любом случае.

## Протокол проводной связи

Каждый кадр — это JSON формы `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // "комната" — обычно UUID, иногда "alerts" или "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // сервер → клиент, после подключения, переносит socketId для использования в присоединениях комнат
  | "message"             // сервер → клиент, новое сообщение
  | "deleteMessage"       // сервер → клиент, сообщение удалено
  | "privateMessage"      // сервер → клиент, уведомление количества значков получателю, когда прямое сообщение переходит; тело сообщения само приходит через обычное действие "message" внутри открытой беседы
  | "reaction"            // сервер → клиент, эмодзи реакция переключена на сообщение; данные { messageId, conversationId, personId, emoji, added } (added=false означает удалено). Трансляция в комнату беседы через POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// сервер → клиент, вторичный "что-то произошло" сигнал для подписчиков контент-комнаты
  | "attendance"          // сервер → клиент, список зрителей / снимок присутствия
  | "notification"        // сервер → клиент, универсальное уведомление (подсчёты и т.д.)
  | "reconnect"           // клиент-внутренний, отправлен локально SocketHelper после завершения нового handshake socketId после падения — либо экспоненциально-отложенное переподключение после неожиданного закрытия, либо немедленное переподключение, вызванное зондом возобновления (фокус вкладки/видимость/онлайн); никогда не отправляется сервером
  | "alert" | "callout";  // наследие, см. справочник конечных точек Соединения
```

### Рукопожатие

1. Клиент открывает сокет и отправляет буквальную строку `"getId"`.
2. Сервер отвечает с `{ action: "socketId", data: "<id>" }`.
3. Клиент сохраняет `socketId` и использует его как третью координату каждого присоединения комнаты.

### Присоединение к комнате

"Комната" — это просто кортеж `(churchId, conversationId)`. Для подписки клиент публикует строку `Connection`:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // опциональный; null для анонимных зрителей трансляции
    "displayName": "Anonymous4823"
  }
]
```

Публикация также запускает трансляцию `attendance` на беседе, поэтому существующие подписчики узнают, что новый зритель присоединился.

### Отправка сообщения

`POST /messaging/messages/send` (разрешено анонимно) или `POST /messaging/messages/` (требуется аутентификация):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Сервер сохраняет сообщение, затем `DeliveryHelper.sendConversationMessages()` ищет каждую строку соединения для этого `conversationId` и отправляет каждому сокету кадр `{ action: "message", data: <message> }`.

Для бесед, привязанных к контенту (например, примечания, прикрепленные к человеку), вторая трансляция с `action: "conversationActivity"` запускается на синтетической комнате `"content-{type}-{id}"` так, чтобы потребители списков знали, что нужно обновить без удержания базовой беседы открытой.

### Выход из комнаты

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Очищает строку соединения и запускает финальное трансляние присутствия.

## Серверные компоненты

| Файл | Роль |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Владеет `WebSocketServer`. Назначает `socketId` при подключении. Запускает 30-секундное ping/pong сердцебиение (`startHeartbeat`), которое `terminate()`ит и очищает любое соединение, которое пропустит pong. Очищает мёртвые сокеты и запускает трансляние присутствия при отключении. Открывает `getLiveSocketIds()` и `reapStaleConnections()`, используемые работой таймера на 30 минут для удаления стаклых строк `connections` — локально путём проверки того, какие socketIds всё ещё живы в процессе, на AWS как 24h-TTL подстраховка для пропущенных `$disconnect` событий |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` читает соединения для комнаты и маршрутизирует каждый кадр на локальный сокет или AWS API Gateway соединение. `sendAttendance(churchId, conversationId)` создаёт и передаёт снимок зрителя |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` присоединяет, `DELETE /:churchId/:conversationId/:socketId` выходит, `POST /setName` обновляет показываемое имя |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (анонимно) и `POST /` (аутентифицировано) сохраняют затем разбрасывают |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` — источник истины для того, кто подписан |

## Примитивы на стороне клиента (`@churchapps/apphelper`)

Все пять примитивов — это статические синглтоны в `apphelper/src/helpers/`. Они сотрудничают так, что каждая вкладка открывает **один** WebSocket, несмотря на то, сколько компонентов монтируется на странице.

### `SocketHelper`

Владеет единственным WebSocket соединением. Ре-входящее `init()` идемпотентно — несколько компонентов могут вызвать его без открытия дубликатных сокетов. Открывает:

- `init()` — открывает (или переиспользует) сокет и завершает handshake `getId`. Решает, когда handshake завершится или, после 5-секундного timeout, когда фоновой цикл повтора взял на себя; никогда не отклоняет, поэтому вызывающим не нужно специально обрабатывать неудачное первое подключение.
- `addHandler(action, id, fn)` / `removeHandler(id)` — регистрируют/отменяют регистрацию слушателей по `action`. Несколько обработчиков могут слушать одно и то же действие.
- `setPersonChurch({ personId, churchId })` — для аутентифицированных вызывающих; запускает подписку комнаты `"alerts"` так, чтобы push-уведомления прибыли на этот сокет.
- `onSocketIdReady(fn)` — запускается на каждом новом socketId, не только первый — начальном handshake и каждом последующем переподключении. Используется `SubscriptionManager` для выполнения ожидающих присоединений.
- `checkConnection()` — вызвано слушателями возобновления ниже; немедленно переподключается если сокет уже закрыт, или отправляет зонд живучести если он выглядит открытым.

**Жизненный цикл переподключения.** Неожиданное закрытие планирует переподключение с экспоненциальным отступом (1s, удваивая до 30s крышки). `SocketHelper` также слушает `online`, `focus`, `pageshow` и `visibilitychange` на `window`/`document` для обнаружения возобновлённой вкладки: если сокет уже закрыт, он немедленно переподключается и сбрасывает отступ; если выглядит открытым, отправляет `"getId"` зонд живучести и принуждает переподключение если кадр не прибывает в течение 3s — это ловит полуоткрытые сокеты оставленные после того как мобильная ОС приостанавливает приложение. При успешном re-handshake, `SocketHelper` отправляет локальное действие `"reconnect"` (см. [Протокол проводной связи](#протокол-проводной-связи)) каждому зарегистрированному обработчику для этого действия.

### `SubscriptionManager`

Членство комнаты со счётом ссылок. Несколько компонентов, подписанных на ту же беседу, только регистрируют одну строку соединения на стороне сервера.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... компонент отображает, получает кадры сокета через ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Три поведения, которые потребители получают бесплатно:

- **Отложенный выход (300 мс)** — выживает в React StrictMode двойной монтаж/демонтаж и короткие циклы переустановки без отказа подписки на стороне сервера; `reset()` также отменяет любые ожидающие отложенные выходы.
- **Переподключение присоединение** — `SubscriptionManager` запоминает `personId`/`displayName` использованные для присоединения каждой комнаты, поэтому на событии `SocketHelper`'s `"reconnect"` (и на каждом вызове `onSocketIdReady`) она переотправляет каждую активную строку соединения с целостной идентичностью. Присоединения дедуплируются за socketId так что же переподключение не переотправляет комнату дважды.
- **Позднее связывание socketId** — `joinRoom` записывает намерение перед окончанием sockets handshake; фактический `POST /connections` запускается на `onSocketIdReady`.

### `ConversationStore`

Кэш в памяти ключ `conversationId`. Регистрирует обработчики сокетов `message` / `deleteMessage` / `privateMessage` ровно один раз и применяет входящие кадры к любым открытым беседам.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ использует /messages/conversation/:id при аутентификации, /messages/catchup/:churchId/:id при анонимности

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // переотобразить с последним снимком
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // опциональная явная очистка
```

Аутентифицированные вызывающие также получают **гидрирование людей** — `personId`s входящих сообщений разрешаются в объекты `PersonInterface` через кэшированный поиск `GET /people/ids`. Анонимные вызывающие пропускают это.

На событии `SocketHelper`'s `"reconnect"`, `ConversationStore` переполучает каждую беседу, которая в настоящее время имеет активные слушатели `subscribe`, восстанавливая сообщения пропущенные, пока сокет был вниз. Анонимные беседы пропускают эту ловушку если их `churchId` никогда не было записано (конечная точка ловушки требует одну).

### `PresenceStore`

Зеркала паттерна `ConversationStore`'s для действия `attendance`. Подписчики получают `PresenceSnapshot { conversationId, totalViewers, viewers }` всякий раз, когда сервер переплан присутствие. Идентичные снимки дедуплируются перед уведомлением, поэтому штормы переподключения не запускают ненужные переотображения.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Загрузка верхнего уровня для **аутентифицированных** вызывающих. Оборачивает `SocketHelper.init()`, устанавливает контекст человека/церкви (который автоматически присоединяется комнате `"alerts"`), и вызывает `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` ровно один раз. Это также регистрирует собственный обработчик `"reconnect"`, который перезагружает подсчёты уведомлений/PM, поэтому значки восстанавливаются после упавшего соединения.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Анонимные потоки (чат трансляции — канонический пример) пропускают `NotificationService` и вызывают примитивы напрямую — смотри `B1App/src/helpers/StreamChatManager.ts` для справочной реализации.

## Чат трансляции

Трансляция — это крупнейший анонимный потребитель платформы. Она использует два `contentType`'s для области комнаты:

- `streamingLive` — открытая вкладка чата на `/stream` (одна комната на `streamingService`).
- `streamingLiveHost` — приватная комната видна только для сотрудников с разрешением `contentApi.chat.host`. ID комнаты зашифрован на сервере (`GET /streamingServices/:id/hostChat`) так, чтобы невежественный скрейпинг не раскрыл это.

`B1App/src/helpers/StreamChatManager.ts` загружает обе комнаты через объединённые примитивы — больше нет трансляции-специфического кода сокетов.

## Паттерны и подводные камни

- **Не открывайте собственный WebSocket.** `SocketHelper` — синглтон по причине. Если вам нужно слушать пользовательское действие, регистрируйте обработчик на существующем сокете через `SocketHelper.addHandler`.
- **Не обходите `SubscriptionManager`.** Прямые вызовы `POST /connections` работают, но теряют подсчёт ссылок, отложенный выход и переподключение присоединение. Потребители группового чата и PM все проходят через `SubscriptionManager`.
- **ID обработчиков должны быть уникальны на действие.** `SocketHelper.addHandler(action, id, fn)` ключит по `(action, id)`; переиспользование одного и того же id для двух слушателей заменяет первого. Объединённые хранилища используют id'а как `"ConversationStore-Message"` и `"PresenceStore-Attendance"` для ясности от потребительских id'ов.
- **ID комнат — непрозрачные строки.** Большинство — это UUID'ы беседы, но система также поддерживает `"alerts"` (уведомления для каждого человека), `"content-{type}-{id}"` (синтетические комнаты деятельности) и зашифрованные `streamingLiveHost` id'ы.
- **Аутентификация проверяется на REST границе, не сокете.** Присоединение комнаты через `POST /connections` разрешено анонимно; контроль доступа происходит во время отправки сообщения (контроллер сообщения решает, какие `messageType`'s анонимный вызывающий может отправить).

## Связанные страницы

- [Архитектура уведомлений](./architecture/notifications) — funnel эскалации in-app/push/email, который питает этот транспорт
- [Конечные точки сообщений](./api/endpoints/messaging) — полная REST поверхность для сообщений, бесед, соединений, устройств
- [Web Push уведомления](./web-push) — браузер push, отдельный от доставки сокетов в странице
- [AppHelper](./shared-libraries/app-helper) — npm пакет, который поставляет примитивы клиента
- [Структура модуля](./api/module-structure) — как модуль сообщений организован на стороне сервера
