---
title: "Web Push-уведомления"
---

# Web Push-уведомления

<div class="article-intro">

Веб-приложения ChurchApps доставляют push-уведомления через W3C Web Push API — тот же механизм, что используется Firebase Cloud Messaging на стороне сервера, но доставляемый через нативный `PushManager` браузера, а не через FCM. Единая пара ключей VAPID на MessagingApi обслуживает всех потребителей (B1Admin, B1App и будущие PWA).

</div>

## Когда отправляется push {#when-push-fires}

Push — это один из уровней единого прохода доставки внутри `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): сначала проверка настроек внутри приложения, затем в одном проходе пытаются доставить сокетом и push (каждое за собственной проверкой настроек), после чего идет email. Получатель, который отключил категорию, до push не доходит. Успешная доставка через сокет больше не останавливает push — теперь каждый тип уведомлений работает так же, как всегда работали личные сообщения, поэтому установленное PWA, работающее в фоне, по-прежнему показывает системное уведомление, даже если доставка через сокет уже прошла; дублирующие баннеры подавляются на стороне клиента service worker'ом (см. [Требование к service worker](#service-worker-requirement)). Плановые напоминания и массовые рассылки от сотрудников начинаются сразу с уровня push и полностью пропускают шаг сокета. Email остается управляемым таймером: он повышает приоритет непрочитанных записей по собственному расписанию, а не в рамках этого прохода.

Наиболее распространенные пути, которые приводят к push:

1. **Уведомления о контенте** — ответ в беседе, на которую подписан человек, упоминание или другое событие, направленное через `NotificationHelper.createNotifications()`.
2. **Личные сообщения** — прямое сообщение проходит через ту же функцию доставки и всегда пытается отправить push наряду с доставкой через сокет.
3. **Плановые напоминания** — напоминания о событиях, задачах и служениях, которые раскрывает и отправляет движок напоминаний; он запускает новые вхождения сразу с уровня push.
4. **Push, инициированные сотрудниками** — `POST /messaging/notifications/create`, `/ping` и `/group/send` для разовых или групповых рассылок.

## Серверный процесс

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app preference gate                  ← muted recipients stop here, no push
       ├─ same pass, both attempted (neither gates the other):
       │    ├─ socket delivery via DeliveryHelper  ← skipped for reminders/broadcasts (they start at push)
       │    └─ push preference gate
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signed POST → browser push service
       └─ email preference gate → timer-driven, escalates unread rows separately
```

### Обязательные переменные окружения

Ключи VAPID хранятся в `Environment` и должны присутствовать, чтобы push был включен:

| Переменная | Описание |
|----------|-------------|
| `webPushPublicKey` | Открытый ключ VAPID (base64url). Возвращается клиентам через `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | Закрытый ключ VAPID. Используется для подписи каждого исходящего push |
| `webPushSubject` | URI `mailto:`, передаваемый службам push. По умолчанию `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` возвращает `false`, если отсутствует любой из ключей: модуль messaging продолжает работать, а доставка push просто ничего не делает.

### Генерация пары ключей VAPID

```bash
npx web-push generate-vapid-keys
```

Добавьте результат в `.env` (локально) или в AWS SSM Parameter Store (на развернутых средах). Смена ключей делает недействительными все существующие подписки — клиенты должны зарегистрироваться заново при следующей загрузке страницы.

## Модель хранения

Подписки Web Push хранятся в существующей таблице `devices` рядом с записями устройств FCM. Они различаются по префиксу `webpush:` в колонке `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Благодаря этому один вызов `loadByPersonId` возвращает все устройства, зарегистрированные пользователем, независимо от платформы. `WebPushHelper.isWebPushToken(token)` и `decodeSubscription(token)` обрабатывают логику префикса.

## Эндпоинты

Базовый путь: `/messaging/webpush`

| Метод | Путь | Авторизация | Описание |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | Возвращает `{ publicKey, enabled }`. Клиенты передают `publicKey` в `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Регистрирует (или обновляет) подписку для авторизованного пользователя. Тело: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | Удаляет любую запись устройства, у которой `fcmToken` содержит указанный endpoint. Тело: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Удаляет конкретную запись устройства по ее серверному идентификатору |

## Клиентский примитив: `WebPushHelper`

`WebPushHelper` из `@churchapps/apphelper` — единственная точка входа на стороне клиента. Приложения-хосты настраивают его один раз при запуске и вызывают `subscribe()` после входа.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// In your app's bootstrap (e.g., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; matches sw.js registration
  appName: "B1AppPwa"        // stored on the device row, useful for filtering by surface
});

// After login (and after every userChurch change)
await WebPushHelper.subscribe();
```

Поведение, которое потребители получают без дополнительной работы:

- **Проверка возможностей** — `isSupported()` возвращает `false` в браузерах без `serviceWorker` / `PushManager` / `Notification`.
- **Пауза** — `canPromptNow()` обеспечивает 7-дневную паузу между запросами через `localStorage`, чтобы пользователи, которые отклонили системный запрос, не видели его при каждом сеансе.
- **Отказ** — `setOptedOut(true)` и `unsubscribe()` блокируют повторные запросы и удаляют запись устройства на сервере.
- **Определение установленного PWA** — `isStandalone()` позволяет приложениям-хостам показывать запрос push на iOS только после того, как пользователь установил PWA на главный экран (iOS разрешает push только из установленных PWA).
- **Повторная регистрация при смене церкви** — `refreshEnrollment()` повторно отправляет существующую подписку браузера для нового `userChurch` без повторного запроса у пользователя. Вызывайте его из обработчика смены `userChurch`.

### Требование к service worker {#service-worker-requirement}

`PushManager` браузера возвращает подписку только тогда, когда service worker зарегистрирован в настроенной области (scope). PWA ChurchApps используют [Serwist](https://serwist.dev/) (приложения Next.js) или workbox для генерации service worker. Поскольку сервер теперь всегда пытается отправить push наряду с доставкой через сокет (см. [Когда отправляется push](#when-push-fires)), service worker становится точкой дедупликации: его обработчик `push` должен подавлять `showNotification`, если открытое и видимое окно уже находится на целевой ссылке уведомления, но всегда должен обновлять значок приложения, независимо от того, был ли показан баннер:

```javascript
// public/sw.js (or whatever Serwist/workbox emits)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // always runs, even if the banner is suppressed

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Same pathname; for private messages, also same conversationId.
    const alreadyViewing = clients.some((client) => (client.focused || client.visibilityState === "visible") && clientMatchesTarget(client.url, target));
    if (alreadyViewing) return;

    await self.registration.showNotification(title, {
      body: data.body,
      data: { type: data.type, contentId: data.contentId, url: target },
      icon: "/icons/icon-192.png"
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { url: target } = event.notification.data || {};
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });

    const exact = clients.find((client) => clientMatchesTarget(client.url, target));
    if (exact) return exact.focus(); // already on the target: focus, don't navigate

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` и `clientMatchesTarget` зависят от конкретного потребителя — эталонная реализация находится в `B1App/src/app/sw.ts`. B1App направляет `privateMessage` на `/mobile/messages/:personId`, B1Admin направляет `notification` на свою панель оповещений и т. д.

## Эксплуатационные заметки

- **Результаты `gone: true`** — `WebPushHelper.sendBulk` возвращает `{ token, success, gone, errorMessage }` для каждого получателя. Результат `gone: true` (служба push ответила `404` или `410`) означает, что подписка окончательно недействительна; код в `NotificationHelper` удаляет такие записи устройств, чтобы больше не пытаться их использовать.
- **TTL** — push-сообщения отправляются с `TTL: 86400` (24 часа). Если браузер пользователя не подключится к службе push в течение 24 часов, push отбрасывается.
- **Без повторов** — временный сбой (тайм-аут, ошибка 5xx) записывается в журнал и не повторяется. Push — это доставка по возможности: надежность обеспечивают сокет на странице и уровень email-уведомлений.
- **Отключенные окружения** — в средах разработки ключи VAPID могут оставаться пустыми; `WebPushHelper.isEnabled()` вернет `false`, и push будут пропускаться. Это ожидаемое поведение для окружений без собственной идентичности VAPID.

## Связанные страницы

- [Архитектура уведомлений](./architecture/notifications) -- полная воронка эскалации уведомлений внутри приложения, push и email, а также движок напоминаний
- [Архитектура реального времени](./realtime) -- доставка через WebSocket; push теперь запускается из той же воронки внутри приложения параллельно с доставкой через сокет в одном проходе, а не только как запасной вариант, когда доставка через сокет не прошла
- [Эндпоинты Messaging](./api/endpoints/messaging) -- уведомления, устройства и остальная часть API messaging
- [AppHelper](./shared-libraries/app-helper) -- npm-пакет, в котором поставляется `WebPushHelper`
