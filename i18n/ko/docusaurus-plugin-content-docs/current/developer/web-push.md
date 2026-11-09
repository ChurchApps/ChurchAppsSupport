---
title: "웹 푸시 알림"
description: "B1.church와 B1 Admin이 구성원에게 브라우저 푸시 알림을 보낼 수 있도록 VAPID 키, WebPushHelper 클라이언트, 서비스 워커 처리를 설정합니다."
---

# 웹 푸시 알림

<div class="article-intro">

ChurchApps 웹 앱은 W3C Web Push API로 푸시 알림을 전달합니다. 이는 서버 측에서 Firebase Cloud Messaging이 쓰는 것과 같은 방식이지만, FCM 대신 브라우저의 네이티브 `PushManager`를 통해 전달됩니다. MessagingApi의 VAPID 키 한 쌍이 모든 소비자(B1Admin, B1App, 향후 PWA)를 담당합니다.

</div>

## 푸시가 발생하는 시점 {#when-push-fires}

푸시는 `NotificationHelper.attemptDeliveryWithEscalation()`(`Api/src/modules/messaging/helpers/NotificationHelper.ts`)의 단일 전달 단계에서 하나의 계층입니다. 먼저 앱 내 알림 설정 게이트를 거치고, 같은 단계에서 소켓 전달과 푸시를 시도합니다(각각 자신의 설정 게이트를 거칩니다). 그다음 이메일이 옵니다. 분류를 음소거한 수신자는 푸시에 도달하지 않습니다. 소켓 전달이 성공해도 더 이상 푸시를 멈추지 않습니다. 모든 알림 유형이 이제 개인 메시지가 항상 해 온 방식으로 동작하므로, 백그라운드에 있는 설치된 PWA는 소켓 전달이 이미 도착했어도 OS 수준의 알림을 보여 줍니다. 중복 배너는 서비스 워커가 클라이언트 쪽에서 억제합니다([서비스 워커 요구 사항](#service-worker-requirement) 참고). 예약된 리마인더와 직원이 보낸 방송은 소켓 단계를 건너뛰고 푸시 계층에서 바로 시작합니다. 이메일은 여전히 타이머가 구동하며, 이 단계와 별도로 읽지 않은 행을 확대합니다.

푸시에 도달하는 가장 흔한 경로는 다음과 같습니다:

1. **콘텐츠 알림** -- 구성원이 따르는 대화에 대한 답글, 멘션, 또는 `NotificationHelper.createNotifications()`를 통해 라우팅되는 다른 이벤트입니다.
2. **개인 메시지** -- 직접 메시지는 같은 전달 함수를 거치며, 소켓 전달과 함께 항상 푸시를 시도합니다.
3. **예약된 리마인더** -- 리마인더 엔진이 펼치고 발송하는 행사, 할 일, 섬김 리마인더로, 새 발생을 푸시 계층에서 직접 시작합니다.
4. **직원이 보낸 푸시** -- 일회성 또는 그룹 방송을 위한 `POST /messaging/notifications/create`, `/ping`, `/group/send`입니다.
5. **예약된 직원 푸시** -- `POST /messaging/scheduledNotifications`는 앱을 가진 모든 사람(`audience: "church"`) 또는 한 그룹을 대상으로 푸시를 저장하며, 1분 타이머가 기한이 되면 보냅니다([알림 아키텍처](./architecture/notifications.md) 참고). 링크가 없는 교회 전체 푸시는 `/mobile/notifications`를 열고, 링크가 없는 그룹 푸시는 그 그룹을 엽니다.

## 서버 흐름

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

### 필수 환경 변수

VAPID 키는 `Environment`에 저장되며, 푸시를 켜려면 반드시 있어야 합니다:

| 환경 변수 | `Environment` 설정 | 설명 |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID 공개 키(base64url). `GET /messaging/webpush/publicKey`를 통해 클라이언트에 반환됩니다 |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID 비공개 키. 나가는 모든 푸시에 서명하는 데 씁니다 |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | 푸시 서비스에 보고되는 `mailto:` URI입니다. 기본값은 `mailto:support@churchapps.org`입니다 |

두 키 중 하나라도 없으면 `WebPushHelper.isEnabled()`는 `false`를 반환합니다. 메시징 모듈은 계속 작동하지만, 푸시 전달은 그냥 아무 동작도 하지 않습니다. 그러면 B1App 모바일 사이트는 설정을 권하는 대신 구성원에게 푸시가 켜져 있지 않다고 알립니다.

### VAPID 키 쌍 생성하기

```bash
npx web-push generate-vapid-keys
```

출력을 로컬이라면 `.env`에, 배포된 환경이라면 AWS SSM Parameter Store에 추가하세요. 키를 교체하면 기존의 모든 구독이 무효화되며, 클라이언트는 다음 페이지 로드 때 다시 등록해야 합니다.

## 저장 모델

Web Push 구독은 기존 `devices` 테이블에 FCM 기기 기록과 함께 저장됩니다. `fcmToken` 열의 `webpush:` 접두사로 구분합니다:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

이 덕분에 `loadByPersonId` 한 번의 호출로, 플랫폼과 관계없이 사용자가 등록한 모든 기기를 가져올 수 있습니다. `WebPushHelper.isWebPushToken(token)`과 `decodeSubscription(token)`이 접두사 처리를 담당합니다.

## 엔드포인트

기본 경로: `/messaging/webpush`

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|------|
| GET | `/publicKey` | 공개 | `{ publicKey, enabled }`를 반환합니다. 클라이언트는 `publicKey`를 `pushManager.subscribe({ applicationServerKey })`에 넘깁니다 |
| POST | `/subscribe` | JWT | 인증된 사용자의 구독을 등록하거나(upsert) 합니다. 본문: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | 공개 | `fcmToken`에 주어진 엔드포인트가 포함된 기기 행을 삭제합니다. 본문: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | 서버 측 ID로 특정 기기 행을 삭제합니다 |

## 클라이언트 기본 요소: `WebPushHelper`

`@churchapps/apphelper`의 `WebPushHelper`가 클라이언트 쪽의 유일한 진입점입니다. 호스트는 부팅 시 한 번 설정하고, 로그인 후 `subscribe()`를 호출합니다.

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

소비자가 별도 작업 없이 얻는 동작은 다음과 같습니다:

- **기능 확인** -- `serviceWorker` / `PushManager` / `Notification`이 없는 브라우저에서 `isSupported()`는 `false`를 반환합니다.
- **쿨다운** -- `canPromptNow()`는 `localStorage`를 통해 프롬프트 사이에 7일의 쿨다운을 강제하므로, OS 프롬프트를 거부한 사용자가 세션마다 다시 질문받지 않습니다.
- **수신 거부** -- `setOptedOut(true)`와 `unsubscribe()`는 다시 묻는 것을 막고, 서버 측 기기 행을 제거합니다.
- **독립 실행형 PWA 감지** -- `isStandalone()`은 호스트가 iOS 푸시 프롬프트를 "사용자가 홈 화면에 PWA를 설치했는지" 조건 뒤에 두도록 합니다(iOS는 설치된 PWA에서만 푸시를 허용합니다).
- **교회 전환 시 재등록** -- `refreshEnrollment()`은 사용자에게 다시 묻지 않고, 기존 브라우저 구독을 새 `userChurch`에 대해 다시 게시합니다. `userChurch` 변경 핸들러에서 호출하세요.

### 서비스 워커 요구 사항 {#service-worker-requirement}

브라우저의 `PushManager`는 구성된 범위에 서비스 워커가 등록되어 있을 때만 구독을 해결합니다. ChurchApps PWA는 서비스 워커 생성을 위해 [Serwist](https://serwist.dev/)(Next.js 앱) 또는 workbox를 씁니다. 서버는 이제 소켓 전달과 함께 항상 푸시를 시도하므로([푸시가 발생하는 시점](#when-push-fires) 참고), 서비스 워커가 중복 제거 지점이 됩니다. 서비스 워커의 `push` 핸들러는 포커스되었거나 보이는 클라이언트가 이미 알림의 딥링크 대상에 있을 때 `showNotification`을 억제해야 합니다. 그러나 배너가 표시되었는지와 관계없이 앱 배지는 항상 갱신해야 합니다:

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

`deepLinkFor` / `clientMatchesTarget`은 소비자마다 다릅니다. 참조 구현은 `B1App/src/app/sw.ts`를 보세요. B1App은 `privateMessage`를 `/mobile/messages/:personId`로 라우팅하고, B1Admin은 `notification`을 알림 패널로 라우팅합니다.

## 운영 참고 사항

- **`gone: true` 결과** -- `WebPushHelper.sendBulk`은 수신자마다 `{ token, success, gone, errorMessage }`를 반환합니다. `gone: true` 결과(푸시 서비스가 `404` 또는 `410`으로 응답)는 구독이 영구적으로 무효하다는 뜻이며, `NotificationHelper`의 하위 코드가 그 기기 행을 삭제하므로 다시 시도되지 않습니다.
- **TTL** -- 푸시 메시지는 `TTL: 86400`(24시간)으로 보냅니다. 사용자의 브라우저가 24시간 안에 푸시 서비스에 연결하지 않으면 푸시는 버려집니다.
- **재시도 없음** -- 일시적인 실패(시간 초과, 5xx)는 기록만 하고 재시도하지 않습니다. 푸시는 최선 노력 방식이며, 내구성은 페이지 내 소켓과 이메일 알림 계층이 담당합니다.
- **비활성 환경** -- 개발 환경은 VAPID 키를 비워 둘 수 있습니다. 이때 `WebPushHelper.isEnabled()`는 `false`를 반환하고 푸시는 바로 빠져나갑니다. 자체 VAPID 식별자가 없는 환경에서는 이것이 의도된 동작입니다.

## 관련 페이지

- [알림 아키텍처](./architecture/notifications.md) -- 앱 내/푸시/이메일 확대 통로와 리마인더 엔진 전체
- [실시간 아키텍처](./realtime.md) -- WebSocket 전달. 푸시는 이제 같은 통로에서 소켓 전달과 함께 같은 단계에서 발생하며, 소켓 전달이 도착하지 않았을 때의 예비 수단으로만 쓰이지 않습니다
- [메시징 엔드포인트](./api/endpoints/messaging.md) -- 알림, 기기, 나머지 메시징 표면
- [AppHelper](./shared-libraries/app-helper.md) -- `WebPushHelper`를 제공하는 npm 패키지
