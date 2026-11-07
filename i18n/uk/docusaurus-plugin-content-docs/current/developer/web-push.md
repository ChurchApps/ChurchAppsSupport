---
title: "Веб-push сповіщення"
---

# Веб-push сповіщення

<div class="article-intro">

Веб-застосунки ChurchApps надсилають push-сповіщення через W3C Web Push API. Це той самий механізм, який на стороні сервера використовує Firebase Cloud Messaging, але доставляється через вбудований у браузер `PushManager`, а не через FCM. Одна пара ключів VAPID на MessagingApi обслуговує всіх споживачів (B1Admin, B1App та майбутні PWA).

</div>

## Коли надсилається push

Push є одним із рівнів в єдиному проході доставки всередині `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): спочатку перевірка налаштувань внутрішньододаткових сповіщень, потім socket-доставка і push, які виконуються в одному проході (кожен за власним налаштуванням), і нарешті email. Одержувач, який вимкнув категорію, до push не доходить. Успішна socket-доставка більше не зупиняє push. Тепер кожен тип сповіщення поводиться так, як завжди поводились приватні повідомлення, тому встановлений PWA, що працює у фоновому режимі, усе одно показує системне сповіщення, навіть якщо socket-доставка вже відбулася. Дубльовані банери придушує service worker на боці клієнта (див. [Вимога до service worker](#service-worker-requirement)). Заплановані нагадування та масові розсилки від персоналу починаються безпосередньо з рівня push і повністю пропускають крок socket. Email і далі працює за таймером: він ескалує непрочитані записи за власним графіком, а не як частину цього проходу.

Найчастіші шляхи, які доходять до push:

1. **Сповіщення про вміст**: відповідь у розмові, на яку підписана людина, згадка або інша подія, що маршрутизується через `NotificationHelper.createNotifications()`.
2. **Приватні повідомлення**: пряме повідомлення проходить через ту саму функцію доставки і завжди намагається надіслати push разом із socket-доставкою.
3. **Заплановані нагадування**: нагадування про події, завдання та служіння, які розгортає й надсилає рушій нагадувань. Нові випадки він запускає безпосередньо на рівні push.
4. **Push від персоналу**: `POST /messaging/notifications/create`, `/ping` і `/group/send` для разових або групових розсилок.

## Серверний потік

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ перевірка внутрішньододаткових сповіщень  ← вимкнені одержувачі зупиняються тут, push не надсилається
       ├─ в одному проході, обидва виконуються (жоден не блокує інший):
       │    ├─ socket-доставка через DeliveryHelper  ← пропускається для нагадувань і розсилок (вони починаються з push)
       │    └─ перевірка налаштувань push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ бібліотека web-push → POST з підписом VAPID → push-сервіс браузера
       └─ перевірка налаштувань email → за таймером, ескалює непрочитані записи окремо
```

### Необхідні змінні середовища

Ключі VAPID зберігаються в `Environment` і мають бути присутні, щоб push був увімкнений:

| Змінна середовища | Параметр `Environment` | Опис |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Публічний ключ VAPID (base64url). Передається клієнтам через `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Приватний ключ VAPID. Використовується для підпису кожного вихідного push |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:`, який передається push-сервісам. За замовчуванням `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` повертає `false`, якщо бракує будь-якого з ключів. Модуль повідомлень продовжує працювати, але push-доставки просто не виконуються. Мобільний сайт B1App тоді повідомляє користувачам, що push не увімкнено, замість того щоб пропонувати налаштування.

### Створення пари ключів VAPID

```bash
npx web-push generate-vapid-keys
```

Додайте результат до `.env` (локально) або до AWS SSM Parameter Store (для розгорнутих середовищ). Заміна ключів анулює всі наявні підписки, і клієнти мають повторно підписатися під час наступного завантаження сторінки.

## Модель зберігання

Підписки Web Push зберігаються в наявній таблиці `devices` разом із записами пристроїв FCM. Їх відрізняє префікс `webpush:` у стовпці `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Завдяки цьому один виклик `loadByPersonId` повертає всі пристрої, підписані користувачем, незалежно від платформи. Логіку префікса обробляють `WebPushHelper.isWebPushToken(token)` і `decodeSubscription(token)`.

## Ендпоінти

Базовий шлях: `/messaging/webpush`

| Метод | Шлях | Авторизація | Опис |
|--------|------|------|-------------|
| GET | `/publicKey` | Публічний | Повертає `{ publicKey, enabled }`. Клієнти передають `publicKey` у `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Реєструє (або оновлює) підписку для автентифікованого користувача. Тіло: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Публічний | Видаляє рядки пристроїв, у яких `fcmToken` містить вказаний endpoint. Тіло: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Видаляє конкретний рядок пристрою за його серверним id |

## Клієнтський примітив: `WebPushHelper`

`WebPushHelper` з `@churchapps/apphelper` є єдиною клієнтською точкою входу. Застосунки-хости налаштовують його один раз під час запуску та викликають `subscribe()` після входу.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// У початковому коді застосунку (наприклад, _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // область service worker; збігається з реєстрацією sw.js
  appName: "B1AppPwa"        // зберігається в рядку пристрою, корисно для фільтрації за поверхнею
});

// Після входу (і після кожної зміни userChurch)
await WebPushHelper.subscribe();
```

Поведінка, яку споживачі отримують без додаткових зусиль:

- **Перевірка підтримки**: `isSupported()` повертає `false` у браузерах без `serviceWorker`, `PushManager` або `Notification`.
- **Перерва між запитами**: `canPromptNow()` дотримується 7-денної перерви між запитами через `localStorage`, щоб користувачі, які відхилили системний запит, не бачили його щоразу під час сесії.
- **Відмова**: `setOptedOut(true)` і `unsubscribe()` блокують повторні запити та видаляють рядок пристрою на сервері.
- **Визначення встановленого PWA**: `isStandalone()` дозволяє застосункам-хостам показувати запит на push в iOS лише тоді, коли користувач встановив PWA на головний екран (iOS дозволяє push лише для встановлених PWA).
- **Повторна підписка під час зміни церкви**: `refreshEnrollment()` повторно надсилає існуючу підписку браузера для нового `userChurch` без нового запиту до користувача. Викликайте його в обробнику зміни `userChurch`.

### Вимога до service worker

`PushManager` у браузері розв'язує підписку лише тоді, коли service worker зареєстровано в налаштованій області. PWA ChurchApps використовують [Serwist](https://serwist.dev/) (застосунки Next.js) або workbox для генерації service worker. Оскільки сервер тепер завжди намагається надіслати push разом із socket-доставкою (див. [Коли надсилається push](#when-push-fires)), точкою дедуплікації є service worker. Його обробник `push` має пригнічувати `showNotification`, якщо вже відкритий або видимий клієнт перебуває за цільовим посиланням сповіщення. Значок застосунку все одно має оновлюватися незалежно від того, чи показано банер:

```javascript
// public/sw.js (або що б не згенерував Serwist/workbox)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // завжди виконується, навіть якщо банер придушено

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Той самий pathname; для приватних повідомлень також той самий conversationId.
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
    if (exact) return exact.focus(); // користувач уже на цільовій сторінці: лише фокус, без переходу

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` і `clientMatchesTarget` залежать від конкретного споживача. Еталонну реалізацію дивіться у `B1App/src/app/sw.ts`. B1App маршрутизує `privateMessage` на `/mobile/messages/:personId`, B1Admin маршрутизує `notification` на свою панель сповіщень тощо.

## Операційні примітки

- **Результати з `gone: true`**: `WebPushHelper.sendBulk` повертає `{ token, success, gone, errorMessage }` для кожного одержувача. Результат `gone: true` (push-сервіс відповів `404` або `410`) означає, що підписка назавжди недійсна. Код у `NotificationHelper` видаляє такі рядки пристроїв, щоб більше не намагатися їх використати.
- **TTL**: push-повідомлення надсилаються з `TTL: 86400` (24 години). Якщо браузер користувача не підключиться до push-сервісу протягом 24 годин, push відкидається.
- **Без повторних спроб**: тимчасова помилка (тайм-аут, 5xx) записується в журнал і не повторюється. Push працює за принципом найкращих зусиль. Надійність забезпечують сокет на сторінці та рівень email.
- **Середовища без push**: у середовищах розробки ключі VAPID можна залишити порожніми. `WebPushHelper.isEnabled()` поверне `false`, і push буде пропущено. Це очікувана поведінка для середовищ без власної ідентичності VAPID.

## Пов'язані сторінки

- [Архітектура сповіщень](./architecture/notifications) -- повний ланцюг ескалації внутрішньододаткових сповіщень, push і email, а також рушій нагадувань
- [Архітектура реального часу](./realtime) -- доставка через WebSocket. Push тепер надсилається з того самого внутрішньододаткового ланцюга разом із socket-доставкою в одному проході, а не лише як запасний варіант, коли socket-доставка не відбулася
- [Ендпоінти повідомлень](./api/endpoints/messaging) -- сповіщення, пристрої та решта поверхні повідомлень
- [AppHelper](./shared-libraries/app-helper) -- npm-пакет, що постачає `WebPushHelper`
