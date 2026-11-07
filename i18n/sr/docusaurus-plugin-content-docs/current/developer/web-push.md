---
title: "Web push обавештења"
description: "Подешавање VAPID кључева, WebPushHelper клијента и service worker-а да B1.church и B1 Admin шаљу push обавештења чланова у прегледачу."
---

# Web push обавештења

<div class="article-intro">

ChurchApps веб апликације шаљу push обавештења преко W3C Web Push API-ја, истог механизма који на серверској страни користи Firebase Cloud Messaging, али се испоручује преко изворног `PushManager`-а прегледача, а не преко FCM-а. Један VAPID пар кључева на MessagingApi-ју покрива све кориснике (B1Admin, B1App и будуће PWA апликације).

</div>

## Када се push шаље

Push је један ниво у јединственом кораку испоруке унутар `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): прво провера подешавања у апликацији, затим се у истом кораку покушавају испорука преко сокета и push (свака са сопственом провером подешавања), па онда email. Прималац који је искључио категорију никад не стиже до push-а. Успешна испорука преко сокета више не зауставља push. Све врсте обавештења сада се понашају као приватне поруке, па инсталирани PWA који ради у позадини и даље приказује системско обавештење, чак и када је испорука преко сокета већ успела. Дупле банере сада на страни клијента сузбија service worker (видети [Захтев за service worker](#service-worker-requirement)). Заказани подсетници и обавештења која покреће особље почињу директно на нивоу push-а и потпуно прескачу корак сокета. Email је и даље вођен тајмером: непрочитани редови се ескалирају по сопственом распореду, а не као део овог корака.

Најчешћи путеви који воде до push-а:

1. **Обавештења о садржају**: одговор у разговору који особа прати, помен или други догађај који се преусмерава преко `NotificationHelper.createNotifications()`.
2. **Приватне поруке**: директна порука иде истом функцијом за испоруку и увек покушава push уз испоруку преко сокета.
3. **Заказани подсетници**: подсетници за догађаје, задатке и служења које механизам за подсетнике проширује и шаље. Нова појављивања механизам покреће директно на нивоу push-а.
4. **Push-ови које покреће особље**: `POST /messaging/notifications/create`, `/ping` и `/group/send` за једнократна или групна обавештења.

## Ток на серверу

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

### Потребне променљиве окружења

VAPID кључеви се чувају у `Environment`-у и морају постојати да би push био укључен:

| Променљива окружења | Подешавање у `Environment`-у | Опис |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID јавни кључ (base64url). Клијентима се враћа преко `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID приватни кључ. Користи се за потписивање сваког одлазног push-а |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | `mailto:` URI који се пријављује push сервисима. Подразумевана вредност је `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` враћа `false` када недостаје било који од кључева. Модул за поруке и даље ради, а push испоруке једноставно не раде. Мобилни сајт B1App тада обавештава чланове да push није укључен, уместо да понуди подешавање.

### Генерисање VAPID пара кључева

```bash
npx web-push generate-vapid-keys
```

Додајте излаз у `.env` (локално) или у AWS SSM Parameter Store (на деплојованом окружењу). Замена кључева поништава све постојеће претплате, па клијенти морају поново да се региструју при следећем учитавању странице.

## Модел складиштења

Web Push претплате се чувају у постојећој табели `devices`, заједно са FCM записима уређаја. Разликују се по префиксу `webpush:` у колони `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Тако један позив `loadByPersonId` може да врати све уређаје које је корисник регистровао, без обзира на платформу. `WebPushHelper.isWebPushToken(token)` и `decodeSubscription(token)` обрађују логику префикса.

## Крајње тачке

Основна путања: `/messaging/webpush`

| Метода | Путања | Аутентификација | Опис |
|--------|------|------|-------------|
| GET | `/publicKey` | Јавно | Враћа `{ publicKey, enabled }`. Клијенти прослеђују `publicKey` у `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Региструје (или ажурира) претплату за аутентификованог корисника. Тело: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Јавно | Брише сваки ред уређаја чија колона `fcmToken` садржи дати endpoint. Тело: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Брише одређени ред уређаја по његовом серверском ID-у |

## Клијентски примитив: `WebPushHelper`

`WebPushHelper` из пакета `@churchapps/apphelper` је јединствена тачка приступа на клијентској страни. Домаћини га конфигуришу једном при покретању и позивају `subscribe()` после пријаве.

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

Понашања која корисници добијају без додатног подешавања:

- **Провера подршке**: `isSupported()` враћа `false` у прегледачима без `serviceWorker`, `PushManager` или `Notification`.
- **Период чекања**: `canPromptNow()` наже период од 7 дана између упита преко `localStorage`-а, тако да корисници који одбију системски упит не буду питани при свакој сесији.
- **Искључивање**: `setOptedOut(true)` и `unsubscribe()` блокирају поновно питање и уклањају серверски запис уређаја.
- **Препознавање самосталног PWA-а**: `isStandalone()` омогућава домаћинима да iOS упите за push ставе иза провере да је корисник инсталирао PWA на почетни екран (iOS дозвољава push само из инсталираних PWA-ова).
- **Поновно региструј при промени цркве**: `refreshEnrollment()` поново шаље постојећу претплату прегледача за нови `userChurch` без поновног питања корисника. Позовите га из обрађивача промене `userChurch`.

### Захтев за service worker

`PushManager` прегледача решава претплату само када је service worker регистрован на конфигурисаном опсегу. ChurchApps PWA апликације користе [Serwist](https://serwist.dev/) (Next.js апликације) или workbox за генерисање service worker-а. Пошто сервер сада увек покушава push уз испоруку преко сокета (видети [Када се push шаље](#when-push-fires)), service worker је место где се дупликати уклањају. Његов `push` обрађивач мора да сузбије `showNotification` када је фокусирани или видљиви клијент већ на циљу дубоке везе обавештења, али увек мора да ажурира значку апликације, без обзира на то да ли је банер приказан:

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

`deepLinkFor` и `clientMatchesTarget` зависе од конкретне апликације. Референтна имплементација је у `B1App/src/app/sw.ts`. B1App преусмерава `privateMessage` на `/mobile/messages/:personId`, а B1Admin преусмерава `notification` на свој панел за упозорења.

## Оперативне напомене

- **Резултати `gone: true`**: `WebPushHelper.sendBulk` враћа `{ token, success, gone, errorMessage }` за сваког примаоца. Резултат `gone: true` (push сервис је одговорио статусом `404` или `410`) значи да је претплата трајно неважећа. Код у `NotificationHelper`-у брише такве редове уређаја да се више не покушавају.
- **TTL**: push поруке се шаљу са `TTL: 86400` (24 сата). Ако се прегледач корисника не повеже са push сервисом у року од 24 сата, push се одбацује.
- **Без поновних покушаја**: привремена грешка (истек времена, 5xx) се бележи и не понавља се. Push је најбољи напор. Трајност испоруке обезбеђују сокет у страници и ниво email обавештења.
- **Искључена окружења**: развојна окружења могу оставити VAPID кључеве празним. `WebPushHelper.isEnabled()` тада враћа `false` и push се прескаче. Ово је намеравано понашање за окружења без сопственог VAPID идентитета.

## Повезане странице

- [Архитектура обавештења](./architecture/notifications.md): потпуни ток ескалације кроз апликацију, push и email, и механизам за подсетнике
- [Архитектура у реалном времену](./realtime.md): WebSocket испорука. Push се сада покреће из истог тока у апликацији заједно са испоруком преко сокета, у истом кораку, а не само као резерва када испорука преко сокета не успе
- [Крајње тачке поруке](./api/endpoints/messaging.md): обавештења, уређаји и остатак површине за поруке
- [AppHelper](./shared-libraries/app-helper.md): npm пакет који испоручује `WebPushHelper`
