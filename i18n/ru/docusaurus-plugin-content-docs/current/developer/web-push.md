---
title: "Push-уведомления в браузере"
description: "Настройка ключей VAPID, клиента WebPushHelper и service worker, чтобы B1.church и B1 Admin могли отправлять участникам push-уведомления в браузер."
---

# Push-уведомления в браузере

<div class="article-intro">

Веб-приложения ChurchApps доставляют push-уведомления через W3C Web Push API — тот же механизм, что Firebase Cloud Messaging использует на стороне сервера, но доставляемый через нативный `PushManager` браузера, а не FCM. Одна пара ключей VAPID на MessagingApi обслуживает всех потребителей (B1Admin, B1App и будущие PWA).

</div>

## Когда отправляется push {#when-push-fires}

Push — это один уровень в едином проходе доставки внутри `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): сначала шлюз настроек внутри приложения, затем доставка через сокет и push, которые пробуются в одном проходе (каждая за своим шлюзом настроек), затем email. Получатель, который отключил категорию, до push никогда не доходит. Успешная доставка через сокет больше не останавливает push — все типы уведомлений теперь ведут себя так же, как личные сообщения: установленное PWA, которое работает в фоне, всё равно показывает уведомление уровня ОС, даже если доставка через сокет уже сработала; дубликаты баннеров подавляет service worker на стороне клиента (см. [Требование к service worker](#service-worker-requirement)). Запланированные напоминания и массовые рассылки от сотрудников сразу начинаются на уровне push, полностью пропуская шаг с сокетом. Email по-прежнему управляется таймером: он эскалирует непрочитанные строки по собственному расписанию, а не в составе этого прохода.

Наиболее частые пути, которые ведут к push:

1. **Уведомления о содержимом** — ответ в беседе, на которую подписан человек, упоминание или другое событие, направленное через `NotificationHelper.createNotifications()`.
2. **Личные сообщения** — личное сообщение проходит через ту же функцию доставки и всегда пробует push наряду с доставкой через сокет.
3. **Запланированные напоминания** — напоминания о событиях, задачах и служении, которые разворачивает и отправляет механизм напоминаний; он запускает новые вхождения сразу на уровне push.
4. **Push от сотрудников** — `POST /messaging/notifications/create`, `/ping` и `/group/send` для разовых или групповых рассылок.

## Серверный поток

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ шлюз настроек внутри приложения        ← получатели с отключёнными уведомлениями останавливаются здесь, без push
       ├─ в одном проходе, пробуются оба (ни один не блокирует другой):
       │    ├─ доставка через сокет через DeliveryHelper  ← пропускается для напоминаний/рассылок (они начинаются с push)
       │    └─ шлюз настроек push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ библиотека web-push → POST с подписью VAPID → push-сервис браузера
       └─ шлюз настроек email → управляется таймером, эскалирует непрочитанные строки отдельно
```

### Обязательные переменные окружения

Ключи VAPID хранятся в `Environment` и должны быть заданы, чтобы push был включён:

| Переменная окружения | Настройка `Environment` | Описание |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Публичный ключ VAPID (base64url). Возвращается клиентам через `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Приватный ключ VAPID. Используется для подписи каждого исходящего push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:`, который передаётся push-сервисам. По умолчанию `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` возвращает `false`, если отсутствует любой из ключей: модуль messaging продолжает работать, а push-доставки просто не выполняются. Мобильный сайт B1App тогда сообщает участникам, что push не включён, вместо предложения настройки.

### Создание пары ключей VAPID

```bash
npx web-push generate-vapid-keys
```

Добавьте результат в `.env` (локально) или в AWS SSM Parameter Store (в развёрнутых окружениях). Смена ключей делает недействительными все существующие подписки — клиентам нужно зарегистрироваться заново при следующей загрузке страницы.

## Модель хранения

Подписки Web Push хранятся в существующей таблице `devices` вместе с записями устройств FCM. Различаются они префиксом `webpush:` в столбце `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Благодаря этому один вызов `loadByPersonId` возвращает все устройства, которые зарегистрировал пользователь, независимо от платформы. `WebPushHelper.isWebPushToken(token)` и `decodeSubscription(token)` отвечают за логику префикса.

## Эндпоинты

Базовый путь: `/messaging/webpush`

| Метод | Путь | Auth | Описание |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | Возвращает `{ publicKey, enabled }`. Клиенты передают `publicKey` в `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Регистрирует (или создаёт/обновляет) подписку для аутентифицированного пользователя. Тело: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | Удаляет любую строку устройства, у которой `fcmToken` содержит переданный endpoint. Тело: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Удаляет конкретную строку устройства по её серверному id |

## Клиентский примитив: `WebPushHelper`

`WebPushHelper` из `@churchapps/apphelper` — единая точка входа на стороне клиента. Приложения настраивают его один раз при запуске и вызывают `subscribe()` после входа в систему.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// В загрузке вашего приложения (например, _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // область service worker; совпадает с регистрацией sw.js
  appName: "B1AppPwa"        // сохраняется в строке устройства, полезно для фильтрации по поверхности
});

// После входа (и после каждого изменения userChurch)
await WebPushHelper.subscribe();
```

Поведение, которое потребители получают бесплатно:

- **Проверка возможностей** — `isSupported()` возвращает `false` в браузерах без `serviceWorker` / `PushManager` / `Notification`.
- **Кулдаун** — `canPromptNow()` задаёт 7-дневный интервал между запросами через `localStorage`, чтобы пользователи, которые отклонили системный запрос ОС, не получали его при каждом сеансе.
- **Отказ** — `setOptedOut(true)` и `unsubscribe()` блокируют повторные запросы и удаляют строку устройства на сервере.
- **Определение автономного PWA** — `isStandalone()` позволяет приложениям показывать запросы push на iOS только после того, как «пользователь установил PWA на главный экран» (iOS разрешает push только установленным PWA).
- **Повторная регистрация при смене церкви** — `refreshEnrollment()` повторно отправляет существующую подписку браузера для нового `userChurch` без повторного запроса у пользователя. Вызывайте его из обработчика смены `userChurch`.

### Требование к service worker {#service-worker-requirement}

`PushManager` браузера выдаёт подписку только тогда, когда service worker зарегистрирован в настроенной области. PWA ChurchApps используют [Serwist](https://serwist.dev/) (приложения Next.js) или workbox для генерации service worker. Поскольку сервер теперь всегда пробует push наряду с доставкой через сокет (см. [Когда отправляется push](#when-push-fires)), service worker — это точка дедупликации: его обработчик `push` должен подавлять `showNotification`, если уже открытый и видимый клиент находится на целевой ссылке уведомления, но всегда обновлять значок приложения независимо от того, был ли показан баннер:

```javascript
// public/sw.js (или то, что выдаёт Serwist/workbox)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // всегда выполняется, даже если баннер подавлен

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Тот же pathname; для личных сообщений — также тот же conversationId.
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
    if (exact) return exact.focus(); // уже на цели: фокус, без навигации

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` зависят от конкретного потребителя — эталонная реализация находится в `B1App/src/app/sw.ts`. B1App направляет `privateMessage` на `/mobile/messages/:personId`, B1Admin направляет `notification` на панель оповещений и т. д.

## Эксплуатационные заметки

- **Результаты с `gone: true`** — `WebPushHelper.sendBulk` возвращает `{ token, success, gone, errorMessage }` для каждого получателя. Результат `gone: true` (push-сервис ответил `404` или `410`) означает, что подписка навсегда недействительна; дальнейший код в `NotificationHelper` удаляет такие строки устройств, чтобы больше к ним не обращаться.
- **TTL** — push-сообщения отправляются с `TTL: 86400` (24 часа). Если браузер пользователя не подключится к push-сервису в течение 24 часов, push отбрасывается.
- **Без повторных попыток** — временный сбой (таймаут, 5xx) записывается в журнал и не повторяется. Push работает по принципу «по возможности»; надёжность обеспечивают сокет на странице и уровень email-уведомлений.
- **Отключённые окружения** — в dev-окружениях ключи VAPID могут быть пустыми; `WebPushHelper.isEnabled()` тогда вернёт `false`, и push будут закорачиваться. Это ожидаемое поведение для окружений без собственной идентичности VAPID.

## Связанные страницы

- [Архитектура уведомлений](./architecture/notifications.md) — полная воронка эскалации in-app / push / email и механизм напоминаний
- [Архитектура реального времени](./realtime.md) — доставка через WebSocket; push теперь срабатывает из той же воронки внутри приложения наряду с доставкой через сокет в том же проходе, а не только как запасной вариант, когда доставка через сокет не прошла
- [Эндпоинты Messaging](./api/endpoints/messaging.md) — уведомления, устройства и остальная поверхность messaging
- [AppHelper](./shared-libraries/app-helper.md) — npm-пакет, который поставляет `WebPushHelper`
