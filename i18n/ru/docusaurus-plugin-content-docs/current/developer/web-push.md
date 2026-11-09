---
title: "Web Push-уведомления"
description: "Настройка VAPID-ключей, клиентского модуля WebPushHelper и обработки service worker, чтобы B1.church и B1 Admin могли доставлять участникам браузерные push-уведомления."
---

# Web Push-уведомления

<div class="article-intro">

Веб-приложения ChurchApps доставляют push-уведомления через W3C Web Push API -- тот же механизм, что Firebase Cloud Messaging на стороне сервера, но доставляемый через нативный `PushManager` браузера вместо FCM. Одна пара ключей VAPID на MessagingApi обслуживает всех потребителей (B1Admin, B1App и будущие PWA).

</div>

## Когда срабатывает push {#when-push-fires}

Push -- это один уровень в едином проходе доставки внутри `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): сначала шлюз настроек in-app, затем в том же проходе пытаются доставку через сокет и push (каждый за своим шлюзом настроек), затем email. Получатель, который отключил категорию, никогда не доходит до push. Успешная доставка через сокет больше не останавливает push -- все типы уведомлений теперь работают так, как всегда работали личные сообщения, поэтому установленное PWA в фоне всё равно показывает уведомление на уровне ОС, даже если доставка через сокет уже прошла; дублирующие баннеры подавляются на стороне клиента service worker'ом (см. [Требование к service worker](#service-worker-requirement)). Запланированные напоминания и рассылки, инициированные сотрудниками, начинают сразу с уровня push, пропуская шаг с сокетом. Email по-прежнему управляется таймером, эскалируя непрочитанные строки по собственному расписанию, а не как часть этого прохода.

Наиболее распространённые пути, которые приводят к push:

1. **Уведомления о контенте** -- ответ в беседе, на которую подписан человек, упоминание или другое событие, направленное через `NotificationHelper.createNotifications()`.
2. **Личные сообщения** -- прямое сообщение проходит через ту же функцию доставки и всегда пытается отправить push наряду с доставкой через сокет.
3. **Запланированные напоминания** -- напоминания о мероприятиях, задачах и служениях, которые разворачивает и отправляет движок напоминаний; он запускает новые вхождения сразу на уровне push.
4. **Push, инициированные сотрудниками** -- `POST /messaging/notifications/create`, `/ping` и `/group/send` для разовых или групповых рассылок.
5. **Запланированные push сотрудников** -- `POST /messaging/scheduledNotifications` сохраняет push для всех, у кого есть приложение (`audience: "church"`), или для одной группы, а таймер раз в минуту отправляет его, когда наступает срок (см. [Архитектуру уведомлений](./architecture/notifications.md)). Общецерковный push без ссылки открывает `/mobile/notifications`; групповой push без ссылки открывает эту группу.

## Серверный поток

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

Ключи VAPID хранятся в `Environment` и должны быть заданы, чтобы push был включён:

| Переменная окружения | Настройка `Environment` | Описание |
|----------|----------|----------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Открытый ключ VAPID (base64url). Возвращается клиентам через `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Закрытый ключ VAPID. Используется для подписи каждого исходящего push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:`, который передаётся службам push. По умолчанию `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` возвращает `false`, если отсутствует любой из ключей -- модуль сообщений продолжает работать, а отправки push просто ничего не делают. Мобильный сайт B1App тогда сообщает участникам, что push не включён, вместо предложения настройки.

### Генерация пары ключей VAPID

```bash
npx web-push generate-vapid-keys
```

Добавьте результат в `.env` (локально) или в AWS SSM Parameter Store (для развёрнутых сред). Смена ключей делает недействительными все существующие подписки -- клиентам нужно повторно зарегистрироваться при следующей загрузке страницы.

## Модель хранения

Подписки Web Push хранятся в существующей таблице `devices` вместе с записями устройств FCM. Они различаются префиксом `webpush:` в колонке `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Это позволяет одному вызову `loadByPersonId` вернуть все устройства, зарегистрированные пользователем, независимо от платформы. `WebPushHelper.isWebPushToken(token)` и `decodeSubscription(token)` обрабатывают логику префикса.

## Эндпоинты

Базовый путь: `/messaging/webpush`

| Метод | Путь | Аутентификация | Описание |
|--------|------|------|-------------|
| GET | `/publicKey` | Публичный | Возвращает `{ publicKey, enabled }`. Клиенты передают `publicKey` в `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Регистрирует (или обновляет) подписку для аутентифицированного пользователя. Тело: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Публичный | Удаляет любую строку устройства, у которой `fcmToken` содержит данный endpoint. Тело: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Удаляет конкретную строку устройства по её серверному ID |

## Клиентский примитив: `WebPushHelper`

`WebPushHelper` из `@churchapps/apphelper` -- единственная точка входа на стороне клиента. Приложения-хосты настраивают его один раз при запуске и вызывают `subscribe()` после входа.

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

Поведение, которое потребители получают бесплатно:

- **Проверка поддержки** -- `isSupported()` возвращает `false` в браузерах без `serviceWorker` / `PushManager` / `Notification`.
- **Пауза** -- `canPromptNow()` задаёт паузу 7 дней между запросами через `localStorage`, чтобы пользователи, которые отклонили системный запрос, не видели его при каждом сеансе.
- **Отказ** -- `setOptedOut(true)` и `unsubscribe()` блокируют повторные запросы и удаляют строку устройства на сервере.
- **Определение установленного PWA** -- `isStandalone()` позволяет приложениям-хостам ограничивать запросы push на iOS тем, что пользователь установил PWA на домашний экран (на iOS push разрешён только из установленных PWA).
- **Повторная регистрация при смене церкви** -- `refreshEnrollment()` повторно отправляет существующую подписку браузера для нового `userChurch` без повторного запроса у пользователя. Вызывайте его из обработчика смены `userChurch`.

### Требование к service worker {#service-worker-requirement}

`PushManager` браузера разрешает подписку только тогда, когда service worker зарегистрирован в настроенной области. PWA ChurchApps используют [Serwist](https://serwist.dev/) (приложения Next.js) или workbox для генерации service worker. Поскольку сервер теперь всегда пытается отправить push наряду с доставкой через сокет (см. [Когда срабатывает push](#when-push-fires)), service worker становится точкой дедупликации: его обработчик `push` должен подавлять `showNotification`, когда уже открыто и видимо окно на целевой странице уведомления, но всегда обновлять значок приложения независимо от того, был ли показан баннер:

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

`deepLinkFor` и `clientMatchesTarget` зависят от конкретного потребителя -- см. эталонную реализацию в `B1App/src/app/sw.ts`. B1App направляет `privateMessage` на `/mobile/messages/:personId`, B1Admin направляет `notification` на свою панель оповещений и т. д.

## Эксплуатационные заметки

- **Результаты с `gone: true`** -- `WebPushHelper.sendBulk` возвращает `{ token, success, gone, errorMessage }` для каждого получателя. Результат `gone: true` (служба push ответила `404` или `410`) означает, что подписка окончательно недействительна; код в `NotificationHelper` удаляет такие строки устройств, чтобы больше не пытаться их использовать.
- **TTL** -- push-сообщения отправляются с `TTL: 86400` (24 часа). Если браузер пользователя не подключится к службе push в течение 24 часов, push отбрасывается.
- **Без повторов** -- временный сбой (таймаут, 5xx) записывается в журнал и не повторяется. Push работает по принципу «максимальных усилий»; надёжность обеспечивают сокет в странице и уровень уведомлений по email.
- **Отключённые среды** -- в средах разработки ключи VAPID могут быть пустыми; `WebPushHelper.isEnabled()` вернёт `false`, и push будут сразу завершаться. Это ожидаемое поведение для сред без собственной идентичности VAPID.

## Связанные страницы

- [Архитектура уведомлений](./architecture/notifications.md) -- полная воронка эскалации in-app/push/email и движок напоминаний
- [Архитектура реального времени](./realtime.md) -- доставка через WebSocket; push теперь срабатывает из той же воронки in-app наряду с доставкой через сокет в том же проходе, а не только как запасной вариант, когда доставка через сокет не прошла
- [Эндпоинты сообщений](./api/endpoints/messaging.md) -- уведомления, устройства и остальной интерфейс сообщений
- [AppHelper](./shared-libraries/app-helper.md) -- npm-пакет, в котором поставляется `WebPushHelper`
