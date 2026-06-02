---
title: "Web Push уведомления"
---

# Web Push уведомления

<div class="article-intro">

Веб-приложения ChurchApps доставляют push-уведомления через W3C Web Push API — тот же механизм, который используется Firebase Cloud Messaging на стороне сервера, но доставляемый через встроенный в браузер `PushManager` вместо FCM. Одна пара VAPID ключей на MessagingApi охватывает каждого потребителя (B1Admin, B1App, будущие PWAs).

</div>

## Когда работает push

MessagingApi доставляет Web Push сообщение в трех ситуациях, все маршрутизируется через `Api/src/modules/messaging/helpers/NotificationHelper.ts`:

1. **Уведомления группы / контента** — кто-то отвечает на тему, которую пользователь следит, или упоминает пользователя.
2. **Личные сообщения** — `POST /messaging/privatemessages` запускает push получателю на его зарегистрированные устройства.
3. **Универсальные уведомления** — прямые вызовы `POST /messaging/notifications/create` или `/ping`.

Push — это **последняя очередность** в лестнице эскалации `NotificationHelper`. Если получатель имеет активное WebSocket соединение в релевантной комнате (смотри [Архитектура реального времени](./realtime)), он получает сообщение в приложение и push подавляется для этой доставки. Push срабатывает только, когда пользователь в сети или его давно не видели.

## Поток на стороне сервера

```
NotificationHelper.checkShouldNotify(...)
  │
  ├─ доставка сокета в странице через DeliveryHelper  ← предпочтительно
  │
  └─ NotificationHelper.<sendXxx>(...)
       └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
            └─ web-push библиотека → VAPID-подписанный POST → browser push сервис
```

### Требуемые переменные окружения

VAPID ключи хранятся в `Environment` и должны быть присутствуют для включения push:

| Переменная | Описание |
|----------|-------------|
| `webPushPublicKey` | VAPID открытый ключ (base64url). Возвращаемый клиентам через `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | VAPID приватный ключ. Используется для подписания каждого исходящего push |
| `webPushSubject` | `mailto:` URI сообщаемый push сервисам. По умолчанию `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` возвращает `false`, когда любой из ключей отсутствует — модуль сообщений продолжает работать, push доставки просто делают нет-оп.

### Генерирование пары VAPID ключей

```bash
npx web-push generate-vapid-keys
```

Добавьте вывод в ваш `.env` (локально) или AWS SSM Parameter Store (развернуто). Ротация ключей инвалидирует каждую существующую подписку — клиенты должны переподписаться при следующей загрузке страницы.

## Модель хранилища

Web Push подписи хранятся в существующей таблице `devices` наряду с FCM записями устройств. Они отличаются префиксом `webpush:` на колонке `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Это позволяет одному вызову `loadByPersonId` возвращать каждое устройство, на которое пользователь зарегистрировался, независимо от платформы. `WebPushHelper.isWebPushToken(token)` и `decodeSubscription(token)` обрабатывают логику префикса.

## Конечные точки

Базовый путь: `/messaging/webpush`

| Метод | Путь | Auth | Описание |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | Возвращает `{ publicKey, enabled }`. Клиенты передают `publicKey` в `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Регистрирует (или переопределяет) подписку для аутентифицированного пользователя. Тело: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | Удаляет любую строку устройства, чья `fcmToken` содержит данную конечную точку. Тело: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Удаляет конкретную строку устройства по её серверному id |

## Примитив клиента: `WebPushHelper`

`WebPushHelper` в `@churchapps/apphelper` — единственная входная точка на стороне клиента. Хосты настраивают его один раз при загрузке и вызывают `subscribe()` после входа.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// В загрузке вашего приложения (например, _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // область service worker; соответствует регистрации sw.js
  appName: "B1AppPwa"        // хранится на строке устройства, полезно для фильтрации по поверхности
});

// После входа (и после каждого изменения userChurch)
await WebPushHelper.subscribe();
```

Поведения, которые потребители получают бесплатно:

- **Проверка возможностей** — `isSupported()` возвращает `false` на браузерах без `serviceWorker` / `PushManager` / `Notification`.
- **Cooldown** — `canPromptNow()` обеспечивает 7-дневный cooldown между подсказками через `localStorage` поэтому пользователи, которые отклонили подсказку OS, не спрашиваются снова на каждой сессии.
- **Opt-out** — `setOptedOut(true)` и `unsubscribe()` блокируют повторные подсказки и удаляют серверную строку устройства.
- **Обнаружение Standalone-PWA** — `isStandalone()` позволяет хостам ограничить iOS push подсказки позади "пользователь установил PWA на их домашний экран" (iOS позволяет push только из установленных PWAs).
- **Переподписание при переключении церкви** — `refreshEnrollment()` переотправляет существующую подписку браузера против новой `userChurch` без повторного промпт пользователя. Вызовите из обработчика изменения `userChurch`.

### Требование Service worker

`PushManager` браузера только разрешает подписку, когда service worker зарегистрирован в настроенной области. PWAs ChurchApps используют [Serwist](https://serwist.dev/) (приложения Next.js) или workbox для генерации service worker. Service worker должен включать обработчик события `push`, который вызывает `self.registration.showNotification(title, options)` для отображения уведомления на уровне OS, когда push прибывает:

```javascript
// public/sw.js (или все, что генерирует Serwist/workbox)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  event.waitUntil(self.registration.showNotification(title, {
    body: data.body,
    data: { type: data.type, contentId: data.contentId },
    icon: "/icons/icon-192.png"
  }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { type, contentId } = event.notification.data || {};
  event.waitUntil(self.clients.openWindow(deepLinkFor(type, contentId)));
});
```

`deepLinkFor` — специфичен потребителю — B1App маршрутизирует `privateMessage` на `/mobile/messages/:id`, B1Admin маршрутизирует `notification` на его панель оповещений и т.д.

## Операционные примечания

- **`gone: true` результаты** — `WebPushHelper.sendBulk` возвращает `{ token, success, gone, errorMessage }` на получателя. Результат `gone: true` (push сервис отвечает `404` или `410`) означает, что подписка навсегда недействительна; нижестоящий код в `NotificationHelper` удаляет те строки устройства, поэтому они снова не пытаются.
- **TTL** — push сообщения отправляются с `TTL: 86400` (24 часа). Если браузер пользователя не подключается к push сервису в течение 24 часов, push выполняется.
- **Нет повторов** — переходный отказ (timeout, 5xx) логируется и не повторяется. Push — best-effort; сокет в странице и уровень push уведомления по электронной почте обрабатывают историю долговечности.
- **Отключенные окружения** — staging и dev окружения могут оставить VAPID ключи пустыми; `WebPushHelper.isEnabled()` вернет `false` и pushes будут short-circuit. Это предусмотренное поведение для окружений без их собственного VAPID идентификатора.

## Связанные страницы

- [Архитектура реального времени](./realtime) -- WebSocket доставка; push — офлайн-fallback для тех же уведомлений
- [Конечные точки сообщений](./api/endpoints/messaging) -- Уведомления, устройства и остальная поверхность сообщений
- [AppHelper](./shared-libraries/app-helper) -- npm пакет, который доставляет `WebPushHelper`
