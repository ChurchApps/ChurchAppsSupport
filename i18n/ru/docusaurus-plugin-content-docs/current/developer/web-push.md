---
title: "Web Push уведомления"
---

# Web Push уведомления

<div class="article-intro">

Веб-приложения ChurchApps доставляют push-уведомления через W3C Web Push API — тот же механизм, используемый Firebase Cloud Messaging на стороне сервера, но доставляемый через встроенный в браузер `PushManager` вместо FCM. Одна пара VAPID ключей на MessagingApi охватывает каждого потребителя (B1Admin, B1App, будущие PWAs).

</div>

## Когда работает push

Push — это один уровень в едином проходе доставки внутри `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): ворота предпочтения in-app, затем доставка сокета и push попытаны в том же проходе (каждая позади своих собственных ворот предпочтения), затем электронная почта. Получатель, который заглушил категорию, никогда не достигает push. Успешная доставка сокета больше не останавливает push — каждый тип уведомления теперь ведёт себя так, как приватные сообщения всегда делали, так что установленное PWA, сидящее в фоне, всё ещё поверхностно OS-уровневое уведомление даже когда доставка сокета уже приземлилась; дублирующиеся баннеры подавляются на стороне клиента service worker вместо этого (см. [Требование Service worker](#требование-service-worker)). Запланированные напоминания и трансляции, вызванные сотрудниками, начинаются непосредственно на уровне push, полностью пропуская шаг сокета. Электронная почта остаётся таймер-управляемой, эскалируя несчитанные строки по своему собственному расписанию, а не как часть этого прохода.

Наиболее распространённые пути, достигающие push:

1. **Уведомления контента** — ответ на беседу, которую человек следит, упоминание или другое событие, маршрутизируемое через `NotificationHelper.createNotifications()`.
2. **Приватные сообщения** — прямое сообщение проходит через ту же функцию доставки и всегда пытается push наряду с доставкой сокета.
3. **Запланированные напоминания** — события, задачи и служебные напоминания, развёрнутые и отправленные механизмом напоминания, который начинает новые вхождения непосредственно на уровне push.
4. **Трансляции, вызванные сотрудниками** — `POST /messaging/notifications/create`, `/ping` и `/group/send` для разовых или групповых трансляций.

## Поток на стороне сервера

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ ворота предпочтения in-app                  ← заглушенные получатели останавливаются здесь, без push
       ├─ в том же проходе, обе попытаны (ни одна не ограничивает другую):
       │    ├─ доставка сокета через DeliveryHelper  ← пропущена для напоминаний/трансляций (они начинаются с push)
       │    └─ ворота предпочтения push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push библиотека → VAPID-подписанный POST → браузер push сервис
       └─ ворота предпочтения электронной почты → таймер-управляемо, эскалирует несчитанные строки отдельно
```

### Требуемые переменные окружения

VAPID ключи хранятся в `Environment` и должны быть присутствуют для включения push:

| Переменная | Описание |
|----------|-------------|
| `webPushPublicKey` | VAPID открытый ключ (base64url). Возвращаемый клиентам через `GET /messaging/webpush/publicKey` |
| `webPushPrivateKey` | VAPID приватный ключ. Используется для подписания каждого исходящего push |
| `webPushSubject` | `mailto:` URI сообщаемый push сервисам. По умолчанию `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` возвращает `false`, когда любой из ключей отсутствует — модуль сообщений продолжает работать, push доставки просто делают no-op.

### Генерирование пары VAPID ключей

```bash
npx web-push generate-vapid-keys
```

Добавьте выведённый в ваш `.env` (локально) или AWS SSM Parameter Store (развёрнуто). Ротация ключей инвалидирует каждую существующую подписку — клиенты должны переэнролиться при следующей загрузке страницы.

## Модель хранения

Web Push подписки хранятся в существующей таблице `devices` наряду с FCM записями устройств. Они отличаются префиксом `webpush:` в столбце `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Это позволяет единственному вызову `loadByPersonId` возвращать каждое устройство, на которое пользователь зарегистрировался, независимо от платформы. `WebPushHelper.isWebPushToken(token)` и `decodeSubscription(token)` обрабатывают логику префикса.

## Конечные точки

Базовый путь: `/messaging/webpush`

| Метод | Путь | Аутентификация | Описание |
|--------|------|------|-------------|
| GET | `/publicKey` | Публичный | Возвращает `{ publicKey, enabled }`. Клиенты передают `publicKey` в `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Регистрирует (или изменяет) подписку аутентифицированного пользователя. Тело: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Публичный | Удаляет любую строку устройства, чей `fcmToken` содержит данную конечную точку. Тело: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Удаляет специфичную строку устройства по его id на стороне сервера |

## Примитив на стороне клиента: `WebPushHelper`

`WebPushHelper` `@churchapps/apphelper` — единственная точка входа на стороне клиента. Хосты конфигурируют его один раз при загрузке и вызывают `subscribe()` после входа.

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

- **Проверка возможности** — `isSupported()` возвращает `false` в браузерах без `serviceWorker` / `PushManager` / `Notification`.
- **Cooldown** — `canPromptNow()` принуждает 7-дневный cooldown между запросами через `localStorage`, так что пользователи, которые отклонили OS запрос, не спрашиваются снова на каждой сессии.
- **Opt-out** — `setOptedOut(true)` и `unsubscribe()` блокируют re-prompting и удаляют строку устройства на стороне сервера.
- **Обнаружение Standalone-PWA** — `isStandalone()` позволяет хостам ограничить iOS push запросы позади "пользователь установил PWA на их домашний экран" (iOS только позволяет push из установленных PWAs).
- **Re-enroll при смене церкви** — `refreshEnrollment()` переотправляет существующую подписку браузера против нового `userChurch` без re-prompting пользователя. Вызовите это из обработчика изменения `userChurch`.

### Требование Service worker

`PushManager` браузера только разрешает подписку когда service worker регистрирован в конфигурированной области. ChurchApps PWAs используют [Serwist](https://serwist.dev/) (Next.js приложения) или workbox для генерирования service worker. Поскольку сервер теперь всегда пытается push наряду с доставкой сокета (см. [Когда работает push](#когда-работает-push)), service worker — это точка дедупа: его обработчик `push` должен подавить `showNotification` когда сфокусированный/видимый клиент уже находится на целевом глубоком ссылке уведомления, но должен всегда обновлять значок приложения независимо от того, был ли баннер показан:

```javascript
// public/sw.js (или что-то что Serwist/workbox выводит)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // всегда работает, даже если баннер подавлен

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Тот же pathname; для приватных сообщений, также тот же conversationId.
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
    if (exact) return exact.focus(); // уже на целевом: фокус, не навигируй

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` — потребители-специфичные — см. `B1App/src/app/sw.ts` для справочной реализации. B1App маршрутизирует `privateMessage` в `/mobile/messages/:personId`, B1Admin маршрутизирует `notification` в его панель alerts и т.д.

## Операционные заметки

- **`gone: true` результаты** — `WebPushHelper.sendBulk` возвращает `{ token, success, gone, errorMessage }` для каждого получателя. `gone: true` результат (push сервис ответил `404` или `410`) означает, что подписка является постоянно невалидной; нижестоящий код в `NotificationHelper` удаляет те строки устройства, так что они не пробуются снова.
- **TTL** — push сообщения отправляются с `TTL: 86400` (24 часа). Если браузер пользователя не подключается к push сервису в течение 24 часов, push отбрасывается.
- **Без повторов** — преходящий отказ (timeout, 5xx) логируется и не повторяется. Push — best-effort; in-page сокет и уровень уведомления электронной почты обрабатывают историю долговечности.
- **Отключённые окружения** — staging и dev окружения могут оставить VAPID ключи пустыми; `WebPushHelper.isEnabled()` вернёт `false` и pushes будут short-circuit. Это — предполагаемое поведение для окружений без их собственной VAPID идентичности.

## Связанные страницы

- [Архитектура уведомлений](./architecture/notifications) — полный in-app/push/email funnel эскалации и механизм напоминания
- [Архитектура реального времени](./realtime) — доставка WebSocket; push теперь работает из того же in-app funnel наряду с доставкой сокета в том же проходе, не только как fallback когда доставка сокета не приземляется
- [Конечные точки сообщений](./api/endpoints/messaging) — уведомления, устройства и остаток поверхности сообщений
- [AppHelper](./shared-libraries/app-helper) — npm пакет, который поставляет `WebPushHelper`
