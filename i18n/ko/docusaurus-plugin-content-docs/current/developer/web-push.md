---
title: "웹 푸시 알림"
---

# 웹 푸시 알림

<div class="article-intro">

ChurchApps 웹 앱은 W3C Web Push API를 통해 푸시 알림을 전달합니다. 서버 측에서는 Firebase Cloud Messaging과 같은 방식이지만, FCM 대신 브라우저의 기본 `PushManager`를 통해 전달됩니다. 하나의 VAPID 키 쌍이 MessagingApi의 모든 소비자(B1Admin, B1App, 향후 PWA)를 함께 지원합니다.

</div>

## 푸시가 발생하는 시점 {#when-push-fires}

푸시는 `NotificationHelper.attemptDeliveryWithEscalation()`(`Api/src/modules/messaging/helpers/NotificationHelper.ts`) 안의 단일 전달 과정에서 한 단계입니다. 먼저 앱 내 알림 설정 확인을 거치고, 이어서 소켓 전달과 푸시가 같은 과정에서 시도되며(각각 자체 설정 확인을 거침), 마지막으로 이메일이 전송됩니다. 카테고리를 음소거한 수신자는 푸시에 도달하지 않습니다. 소켓 전달이 성공해도 더 이상 푸시를 막지 않습니다. 모든 알림 유형이 이제 비공개 메시지와 같은 방식으로 동작하므로, 백그라운드에 있는 설치된 PWA는 소켓 전달이 이미 완료된 경우에도 OS 수준의 알림을 표시합니다. 중복 배너는 서비스 워커가 클라이언트 쪽에서 억제합니다([서비스 워커 요구 사항](#service-worker-requirement) 참조). 예약된 알림과 직원이 발송한 방송은 소켓 단계를 건너뛰고 바로 푸시 단계에서 시작합니다. 이메일은 여전히 타이머 기반이며, 이 과정의 일부가 아니라 자체 일정에 따라 읽지 않은 항목을 단계적으로 발송합니다.

푸시에 도달하는 가장 일반적인 경로는 다음과 같습니다.

1. **콘텐츠 알림** -- 사용자가 팔로우하는 대화에 대한 답글, 멘션, 또는 `NotificationHelper.createNotifications()`를 통해 라우팅되는 다른 이벤트
2. **비공개 메시지** -- 1:1 메시지는 같은 전달 함수를 거치며, 소켓 전달과 함께 항상 푸시를 시도합니다.
3. **예약 알림** -- 알림 엔진이 확장하고 전달하는 이벤트, 작업, 봉사 알림으로, 새 발생 건을 푸시 단계에서 바로 시작합니다.
4. **직원이 보내는 푸시** -- `POST /messaging/notifications/create`, `/ping`, `/group/send`를 사용하는 일회성 또는 그룹 방송

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

VAPID 키는 `Environment`에 저장되며, 푸시를 활성화하려면 반드시 있어야 합니다.

| 변수 | 설명 |
|------|------|
| `webPushPublicKey` | VAPID 공개 키(base64url). `GET /messaging/webpush/publicKey`를 통해 클라이언트에 반환됩니다 |
| `webPushPrivateKey` | VAPID 비공개 키. 발송하는 모든 푸시에 서명하는 데 사용됩니다 |
| `webPushSubject` | 푸시 서비스에 보고되는 `mailto:` URI. 기본값은 `mailto:support@churchapps.org`입니다 |

두 키 중 하나라도 없으면 `WebPushHelper.isEnabled()`는 `false`를 반환합니다. 메시징 모듈은 계속 작동하며, 푸시 전달만 아무 작업도 하지 않습니다.

### VAPID 키 쌍 생성하기

```bash
npx web-push generate-vapid-keys
```

출력 결과를 `.env`(로컬)에 추가하거나 AWS SSM Parameter Store(배포 환경)에 저장하세요. 키를 교체하면 기존의 모든 구독이 무효화되며, 클라이언트는 다음 페이지 로드 시 다시 등록해야 합니다.

## 저장 모델

웹 푸시 구독은 기존 `devices` 테이블에 FCM 기기 기록과 함께 저장됩니다. `fcmToken` 열의 `webpush:` 접두사로 구분합니다.

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

이 방식 덕분에 하나의 `loadByPersonId` 호출로 플랫폼과 관계없이 사용자가 등록한 모든 기기를 가져올 수 있습니다. `WebPushHelper.isWebPushToken(token)`과 `decodeSubscription(token)`이 접두사 처리를 담당합니다.

## 엔드포인트

기본 경로: `/messaging/webpush`

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|------|
| GET | `/publicKey` | 공개 | `{ publicKey, enabled }`를 반환합니다. 클라이언트는 `publicKey`를 `pushManager.subscribe({ applicationServerKey })`에 전달합니다 |
| POST | `/subscribe` | JWT | 인증된 사용자의 구독을 등록하거나(없으면 생성하고 있으면 업데이트) 합니다. 본문: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | 공개 | 주어진 endpoint를 `fcmToken`에 포함한 기기 행을 모두 삭제합니다. 본문: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | 서버 측 ID로 특정 기기 행을 삭제합니다 |

## 클라이언트 기본 요소: `WebPushHelper`

`@churchapps/apphelper`의 `WebPushHelper`는 클라이언트 쪽의 단일 진입점입니다. 호스트 앱은 부팅 시 한 번 설정하고, 로그인 후 `subscribe()`를 호출합니다.

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

소비자가 별도 작업 없이 자동으로 얻는 동작은 다음과 같습니다.

- **기능 확인** -- `serviceWorker` / `PushManager` / `Notification`을 지원하지 않는 브라우저에서는 `isSupported()`가 `false`를 반환합니다.
- **재요청 대기 시간** -- `canPromptNow()`는 `localStorage`를 통해 요청 사이에 7일의 대기 시간을 강제하므로, OS 요청을 닫은 사용자가 세션마다 다시 질문을 받지 않습니다.
- **수신 거부** -- `setOptedOut(true)`와 `unsubscribe()`는 다시 요청하는 것을 막고 서버 측 기기 행을 삭제합니다.
- **독립 실행형 PWA 감지** -- `isStandalone()`을 사용하면 호스트가 iOS 푸시 요청을 "사용자가 PWA를 홈 화면에 설치했을 때"로 제한할 수 있습니다(iOS는 설치된 PWA에서만 푸시를 허용합니다).
- **교회 전환 시 재등록** -- `refreshEnrollment()`는 사용자에게 다시 묻지 않고 기존 브라우저 구독을 새 `userChurch`에 대해 다시 등록합니다. `userChurch` 변경 핸들러에서 호출하세요.

### 서비스 워커 요구 사항 {#service-worker-requirement}

브라우저의 `PushManager`는 설정된 범위에 서비스 워커가 등록되어 있을 때만 구독을 확인합니다. ChurchApps PWA는 서비스 워커 생성에 [Serwist](https://serwist.dev/)(Next.js 앱) 또는 workbox를 사용합니다. 서버는 이제 소켓 전달과 함께 항상 푸시를 시도하므로([푸시가 발생하는 시점](#when-push-fires) 참조), 서비스 워커가 중복 제거 지점이 됩니다. 서비스 워커의 `push` 핸들러는 포커스되었거나 보이는 클라이언트가 이미 알림의 딥링크 대상에 있으면 `showNotification`을 억제해야 합니다. 배너 표시 여부와 관계없이 앱 배지는 항상 업데이트해야 합니다.

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

`deepLinkFor` / `clientMatchesTarget`은 소비자마다 다릅니다. 참조 구현은 `B1App/src/app/sw.ts`를 보세요. B1App은 `privateMessage`를 `/mobile/messages/:personId`로, B1Admin은 `notification`을 알림 패널로 라우팅합니다.

## 운영 참고 사항

- **`gone: true` 결과** -- `WebPushHelper.sendBulk`는 수신자마다 `{ token, success, gone, errorMessage }`를 반환합니다. `gone: true` 결과(푸시 서비스가 `404` 또는 `410`으로 응답)는 구독이 영구적으로 유효하지 않다는 뜻이며, `NotificationHelper`의 하위 코드가 해당 기기 행을 삭제하여 다시 시도하지 않도록 합니다.
- **TTL** -- 푸시 메시지는 `TTL: 86400`(24시간)으로 발송됩니다. 사용자의 브라우저가 24시간 안에 푸시 서비스에 연결하지 않으면 푸시는 폐기됩니다.
- **재시도 없음** -- 일시적인 실패(시간 초과, 5xx)는 기록되지만 다시 시도하지 않습니다. 푸시는 최선을 다하는 방식이며, 내구성은 페이지 내 소켓과 이메일 알림 단계가 담당합니다.
- **비활성 환경** -- 개발 환경은 VAPID 키를 비워 둘 수 있습니다. 이 경우 `WebPushHelper.isEnabled()`는 `false`를 반환하고 푸시는 즉시 중단됩니다. 자체 VAPID 식별 정보가 없는 환경에서 의도된 동작입니다.

## 관련 페이지

- [알림 아키텍처](./architecture/notifications) -- 앱 내, 푸시, 이메일 단계적 전달 흐름과 알림 엔진의 전체 구조
- [실시간 아키텍처](./realtime) -- WebSocket 전달. 이제 푸시는 소켓 전달과 같은 과정의 앱 내 흐름에서 함께 발생하며, 소켓 전달이 실패했을 때만 대체 수단으로 발생하지 않습니다
- [메시징 엔드포인트](./api/endpoints/messaging) -- 알림, 기기, 나머지 메시징 API
- [AppHelper](./shared-libraries/app-helper) -- `WebPushHelper`를 제공하는 npm 패키지
