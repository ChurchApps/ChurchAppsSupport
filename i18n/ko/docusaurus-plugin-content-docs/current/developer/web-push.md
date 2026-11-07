---
title: "웹 푸시 알림"
description: "VAPID 키, WebPushHelper 클라이언트, 서비스 워커 처리를 설정하여 B1.church와 B1 Admin이 회원에게 브라우저 푸시 알림을 보낼 수 있도록 합니다."
---

# 웹 푸시 알림

<div class="article-intro">

ChurchApps 웹 앱은 W3C Web Push API로 푸시 알림을 전달합니다. 서버 측에서 Firebase Cloud Messaging이 사용하는 것과 같은 방식이지만, FCM 대신 브라우저의 기본 `PushManager`를 통해 전달됩니다. MessagingApi의 VAPID 키 쌍 하나가 모든 소비자(B1Admin, B1App, 향후 PWA)를 지원합니다.

</div>

## 푸시가 발송되는 경우 {#when-push-fires}

푸시는 `NotificationHelper.attemptDeliveryWithEscalation()`(`Api/src/modules/messaging/helpers/NotificationHelper.ts`)의 단일 전달 과정 안에 있는 한 단계입니다. 이 과정은 앱 내 설정 게이트를 거친 뒤, 같은 과정에서 소켓 전달과 푸시를 시도하고(각각 자체 설정 게이트가 있음), 마지막으로 이메일을 보냅니다. 특정 카테고리를 음소거한 수신자는 푸시에 도달하지 않습니다. 이제 소켓 전달이 성공해도 푸시를 막지 않습니다. 모든 알림 유형이 개인 메시지와 같은 방식으로 동작하므로, 백그라운드에 있는 설치된 PWA는 소켓 전달이 이미 도착했더라도 OS 수준 알림을 계속 표시합니다. 중복 배너는 대신 서비스 워커가 클라이언트 측에서 막습니다([서비스 워커 요구 사항](#service-worker-requirement) 참고). 예약 알림과 직원이 시작한 일괄 발송은 소켓 단계를 건너뛰고 바로 푸시 단계에서 시작합니다. 이메일은 여전히 타이머로 동작하며, 이 과정의 일부가 아니라 자체 일정에 따라 읽지 않은 행을 상향 처리합니다.

푸시에 도달하는 가장 흔한 경로는 다음과 같습니다.

1. **콘텐츠 알림** -- 사용자가 팔로우하는 대화에 대한 답글, 멘션, 또는 `NotificationHelper.createNotifications()`를 통해 전달되는 다른 이벤트.
2. **개인 메시지** -- 직접 메시지는 같은 전달 함수를 거치며, 소켓 전달과 함께 항상 푸시를 시도합니다.
3. **예약 알림** -- 알림 엔진이 펼쳐서 발송하는 행사, 할 일, 봉사 알림. 새 발생 건은 푸시 단계에서 바로 시작합니다.
4. **직원이 보내는 푸시** -- 일회성 또는 그룹 일괄 발송을 위한 `POST /messaging/notifications/create`, `/ping`, `/group/send`.

## 서버 흐름

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ 앱 내 설정 게이트                        ← 음소거한 수신자는 여기서 멈추고 푸시를 받지 않음
       ├─ 같은 단계에서 둘 다 시도(서로를 막지 않음):
       │    ├─ DeliveryHelper를 통한 소켓 전달     ← 알림/일괄 발송은 건너뜀(푸시 단계에서 시작)
       │    └─ 푸시 설정 게이트
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push 라이브러리 → VAPID 서명 POST → 브라우저 푸시 서비스
       └─ 이메일 설정 게이트 → 타이머 기반, 읽지 않은 행을 별도로 상향 처리
```

### 필수 환경 변수

VAPID 키는 `Environment`에 저장되며, 푸시를 사용하려면 반드시 있어야 합니다.

| 환경 변수 | `Environment` 설정 | 설명 |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID 공개 키(base64url). `GET /messaging/webpush/publicKey`로 클라이언트에 반환됨 |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID 비공개 키. 발송되는 모든 푸시에 서명하는 데 사용됨 |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | 푸시 서비스에 보고되는 `mailto:` URI. 기본값은 `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()`는 두 키 중 하나라도 없으면 `false`를 반환합니다. 이 경우 메시징 모듈은 계속 동작하지만, 푸시 전달은 아무 동작도 하지 않습니다(no-op). 그러면 B1App 모바일 사이트는 설정을 안내하는 대신 교인에게 푸시가 켜져 있지 않다고 알립니다.

### VAPID 키 쌍 만들기

```bash
npx web-push generate-vapid-keys
```

출력 결과를 `.env`(로컬) 또는 AWS SSM Parameter Store(배포 환경)에 추가하세요. 키를 교체하면 기존의 모든 구독이 무효화되므로, 클라이언트는 다음 페이지 로드 때 다시 등록해야 합니다.

## 저장 모델

웹 푸시 구독은 기존 `devices` 테이블에 FCM 기기 레코드와 함께 저장됩니다. `fcmToken` 열의 `webpush:` 접두사로 구분합니다.

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

이 방식 덕분에 `loadByPersonId` 호출 한 번으로 플랫폼과 관계없이 사용자가 등록한 모든 기기를 가져올 수 있습니다. `WebPushHelper.isWebPushToken(token)`과 `decodeSubscription(token)`이 접두사 처리를 담당합니다.

## 엔드포인트

기본 경로: `/messaging/webpush`

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|-------------|
| GET | `/publicKey` | 공개 | `{ publicKey, enabled }`를 반환합니다. 클라이언트는 `publicKey`를 `pushManager.subscribe({ applicationServerKey })`에 전달합니다 |
| POST | `/subscribe` | JWT | 인증된 사용자의 구독을 등록(또는 업서트)합니다. 본문: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | 공개 | `fcmToken`에 주어진 endpoint가 포함된 기기 행을 모두 삭제합니다. 본문: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | 서버 측 ID로 특정 기기 행을 삭제합니다 |

## 클라이언트 기본 요소: `WebPushHelper`

`@churchapps/apphelper`의 `WebPushHelper`가 클라이언트 측의 단일 진입점입니다. 호스트 앱은 부팅 시 한 번 구성하고, 로그인 후 `subscribe()`를 호출합니다.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// 앱의 부트스트랩(예: _app.tsx, layout.tsx)에서
WebPushHelper.configure({
  scope: "/",                // 서비스 워커 범위. sw.js 등록과 일치해야 함
  appName: "B1AppPwa"        // 기기 행에 저장되며, 화면 종류별 필터링에 유용함
});

// 로그인 후(그리고 userChurch가 바뀔 때마다)
await WebPushHelper.subscribe();
```

소비자가 별도 작업 없이 얻는 동작은 다음과 같습니다.

- **기능 확인** -- `serviceWorker` / `PushManager` / `Notification`을 지원하지 않는 브라우저에서는 `isSupported()`가 `false`를 반환합니다.
- **재요청 간격** -- `canPromptNow()`는 `localStorage`를 통해 프롬프트 사이에 7일의 간격을 강제합니다. 그래서 OS 프롬프트를 닫은 사용자에게 매 세션마다 다시 묻지 않습니다.
- **수신 거부** -- `setOptedOut(true)`와 `unsubscribe()`는 다시 묻는 것을 막고, 서버 측 기기 행을 삭제합니다.
- **독립 실행형 PWA 감지** -- `isStandalone()`으로 호스트는 iOS 푸시 프롬프트를 "사용자가 PWA를 홈 화면에 설치함" 조건 뒤에 둘 수 있습니다(iOS는 설치된 PWA에서만 푸시를 허용합니다).
- **교회 전환 시 재등록** -- `refreshEnrollment()`는 사용자에게 다시 묻지 않고, 기존 브라우저 구독을 새 `userChurch`에 대해 다시 보냅니다. `userChurch` 변경 핸들러에서 호출하세요.

### 서비스 워커 요구 사항 {#service-worker-requirement}

브라우저의 `PushManager`는 구성된 범위에 서비스 워커가 등록되어 있을 때만 구독을 확인합니다. ChurchApps PWA는 서비스 워커 생성을 위해 [Serwist](https://serwist.dev/)(Next.js 앱) 또는 workbox를 사용합니다. 서버는 이제 항상 소켓 전달과 함께 푸시를 시도하므로([서버 흐름](#when-push-fires) 참고), 서비스 워커가 중복 제거 지점이 됩니다. 서비스 워커의 `push` 핸들러는 포커스되었거나 보이는 클라이언트가 이미 알림의 딥 링크 대상에 있을 때 `showNotification`을 막아야 합니다. 하지만 배너가 표시되었는지와 관계없이 앱 배지는 항상 업데이트해야 합니다.

```javascript
// public/sw.js (또는 Serwist/workbox가 생성하는 파일)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // 배너가 막혀도 항상 실행

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // 같은 pathname이어야 하며, 개인 메시지는 같은 conversationId도 필요함.
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
    if (exact) return exact.focus(); // 이미 대상에 있으면 포커스만 하고, 이동하지 않음

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor`와 `clientMatchesTarget`은 소비자마다 다릅니다. 참조 구현은 `B1App/src/app/sw.ts`를 보세요. B1App은 `privateMessage`를 `/mobile/messages/:personId`로, B1Admin은 `notification`을 알림 패널로 연결합니다.

## 운영 참고 사항

- **`gone: true` 결과** -- `WebPushHelper.sendBulk`는 수신자마다 `{ token, success, gone, errorMessage }`를 반환합니다. `gone: true`(푸시 서비스가 `404` 또는 `410`으로 응답함)는 구독이 영구적으로 무효하다는 뜻입니다. `NotificationHelper`의 하위 코드는 이러한 기기 행을 삭제하여 다시 시도하지 않도록 합니다.
- **TTL** -- 푸시 메시지는 `TTL: 86400`(24시간)으로 발송됩니다. 사용자의 브라우저가 24시간 안에 푸시 서비스에 연결하지 않으면 푸시는 버려집니다.
- **재시도 없음** -- 일시적인 실패(시간 초과, 5xx)는 기록만 되고 재시도하지 않습니다. 푸시는 최선을 다하는(best-effort) 방식이며, 내구성은 페이지 내 소켓과 이메일 알림 단계가 담당합니다.
- **비활성화된 환경** -- 개발 환경은 VAPID 키를 비워 둘 수 있습니다. 이 경우 `WebPushHelper.isEnabled()`는 `false`를 반환하고 푸시는 바로 건너뜁니다. 자체 VAPID 식별자가 없는 환경에서 의도된 동작입니다.

## 관련 문서

- [알림 아키텍처](./architecture/notifications.md) -- 앱 내, 푸시, 이메일로 이어지는 전체 에스컬레이션 흐름과 알림 엔진
- [실시간 아키텍처](./realtime.md) -- WebSocket 전달. 이제 푸시는 소켓 전달이 실패했을 때만 쓰는 대체 수단이 아니라, 같은 과정에서 소켓 전달과 함께 앱 내 흐름에서 발송됨
- [메시징 엔드포인트](./api/endpoints/messaging.md) -- 알림, 기기, 나머지 메시징 기능
- [AppHelper](./shared-libraries/app-helper.md) -- `WebPushHelper`를 제공하는 npm 패키지
