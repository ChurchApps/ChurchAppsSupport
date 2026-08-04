---
title: "웹 푸시 알림"
---

# 웹 푸시 알림

<div class="article-intro">

ChurchApps 웹 앱은 W3C Web Push API를 통해 푸시 알림을 전달합니다 -- 서버 측에서는 Firebase Cloud Messaging과 동일한 메커니즘을 사용하지만, FCM 대신 브라우저의 네이티브 `PushManager`를 통해 전달됩니다. MessagingApi의 단일 VAPID 키 쌍이 모든 소비자(B1Admin, B1App, 향후의 PWA들)를 커버합니다.

</div>

## 푸시가 발생하는 시점

푸시는 `NotificationHelper.attemptDeliveryWithEscalation()`(`Api/src/modules/messaging/helpers/NotificationHelper.ts`) 내부의 단일 전달 패스에 속한 한 단계입니다: 인앱 환경설정 게이트를 거친 뒤, 같은 패스 안에서 소켓 전달과 푸시가(각각 자체 환경설정 게이트 뒤에서) 함께 시도되고, 그다음 이메일이 이어집니다. 해당 카테고리를 음소거한 수신자는 푸시 단계에 절대 도달하지 않습니다. 소켓 전달이 성공했다고 해서 더 이상 푸시가 중단되지 않습니다 -- 이제 모든 알림 유형이 개인 메시지가 항상 그래왔던 방식대로 동작하므로, 백그라운드에 있는 설치된 PWA는 소켓 전달이 이미 도착했더라도 여전히 OS 수준 알림을 표시합니다. 중복 배너는 대신 서비스 워커가 클라이언트 측에서 억제합니다([서비스 워커 요구 사항](#service-worker-requirement) 참조). 예약된 리마인더와 직원이 트리거하는 브로드캐스트는 소켓 단계를 완전히 건너뛰고 곧바로 푸시 단계에서 시작됩니다. 이메일은 여전히 타이머 기반으로, 이 패스의 일부가 아니라 자체 일정에 따라 읽지 않은 항목을 에스컬레이션합니다.

푸시 단계에 도달하는 가장 흔한 경로는 다음과 같습니다.

1. **콘텐츠 알림** -- 사람이 팔로우하는 대화에 대한 답글, 멘션, 또는 `NotificationHelper.createNotifications()`를 통해 라우팅되는 그 밖의 이벤트.
2. **개인 메시지** -- 다이렉트 메시지는 동일한 전달 함수를 거치며 항상 소켓 전달과 함께 푸시를 시도합니다.
3. **예약된 리마인더** -- 리마인더 엔진이 확장하고 발송하는 이벤트, 작업, 서빙(serving) 리마인더로, 새 발생 건은 곧바로 푸시 단계에서 시작됩니다.
4. **직원이 트리거하는 푸시** -- 일회성 또는 그룹 브로드캐스트를 위한 `POST /messaging/notifications/create`, `/ping`, `/group/send`.

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

VAPID 키는 `Environment`에 저장되며, 푸시가 활성화되려면 반드시 존재해야 합니다.

| 변수 | 설명 |
|----------|-------------|
| `webPushPublicKey` | VAPID 공개 키(base64url). `GET /messaging/webpush/publicKey`를 통해 클라이언트에 반환됨 |
| `webPushPrivateKey` | VAPID 비공개 키. 발신되는 모든 푸시에 서명하는 데 사용됨 |
| `webPushSubject` | 푸시 서비스에 보고되는 `mailto:` URI. 기본값은 `mailto:support@churchapps.org` |

키 중 하나라도 누락되면 `WebPushHelper.isEnabled()`는 `false`를 반환합니다 -- 메시징 모듈은 계속 동작하지만 푸시 전달은 그냥 아무 일도 하지 않습니다.

### VAPID 키 쌍 생성하기

```bash
npx web-push generate-vapid-keys
```

출력값을 `.env`(로컬) 또는 AWS SSM Parameter Store(배포 환경)에 추가하세요. 키를 회전시키면 기존의 모든 구독이 무효화됩니다 -- 클라이언트는 다음 페이지 로드 시 다시 등록해야 합니다.

## 저장 모델

웹 푸시 구독은 FCM 디바이스 레코드와 함께 기존 `devices` 테이블에 저장됩니다. 이들은 `fcmToken` 컬럼의 `webpush:` 접두어로 구분됩니다.

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

이 덕분에 단일 `loadByPersonId` 호출로 플랫폼과 무관하게 사용자가 등록한 모든 디바이스를 반환할 수 있습니다. `WebPushHelper.isWebPushToken(token)`과 `decodeSubscription(token)`이 접두어 처리 로직을 담당합니다.

## 엔드포인트

기본 경로: `/messaging/webpush`

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|-------------|
| GET | `/publicKey` | 공개 | `{ publicKey, enabled }`을 반환합니다. 클라이언트는 `pushManager.subscribe({ applicationServerKey })`에 `publicKey`를 전달합니다 |
| POST | `/subscribe` | JWT | 인증된 사용자의 구독을 등록(또는 업서트)합니다. 본문: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | 공개 | 주어진 엔드포인트를 포함하는 모든 디바이스 행을 삭제합니다. 본문: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | 서버 측 id로 특정 디바이스 행을 삭제합니다 |

## 클라이언트 프리미티브: `WebPushHelper`

`@churchapps/apphelper`의 `WebPushHelper`가 유일한 클라이언트 측 진입점입니다. 호스트는 부팅 시 한 번 구성하고 로그인 후 `subscribe()`를 호출합니다.

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

소비자가 별도 작업 없이 얻게 되는 동작들:

- **지원 여부 확인** -- `isSupported()`는 `serviceWorker` / `PushManager` / `Notification`이 없는 브라우저에서 `false`를 반환합니다.
- **쿨다운** -- `canPromptNow()`는 `localStorage`를 이용해 프롬프트 간 7일 쿨다운을 강제하므로, OS 프롬프트를 닫은 사용자에게 세션마다 다시 묻지 않습니다.
- **옵트아웃** -- `setOptedOut(true)`와 `unsubscribe()`는 재프롬프트를 차단하고 서버 측 디바이스 행을 제거합니다.
- **독립형 PWA 감지** -- `isStandalone()`을 이용해 호스트는 iOS 푸시 프롬프트를 "사용자가 PWA를 홈 화면에 설치했음" 조건 뒤에 게이트할 수 있습니다(iOS는 설치된 PWA에서만 푸시를 허용).
- **교회 전환 시 재등록** -- `refreshEnrollment()`는 사용자에게 다시 묻지 않고 기존 브라우저 구독을 새 `userChurch`에 대해 다시 게시합니다. `userChurch` 변경 핸들러에서 호출하세요.

### 서비스 워커 요구 사항

브라우저의 `PushManager`는 구성된 스코프에 서비스 워커가 등록되어 있을 때만 구독을 해석(resolve)합니다. ChurchApps PWA는 서비스 워커 생성을 위해 [Serwist](https://serwist.dev/)(Next.js 앱) 또는 workbox를 사용합니다. 이제 서버가 항상 소켓 전달과 함께 푸시를 시도하므로([푸시가 발생하는 시점](#when-push-fires) 참조), 서비스 워커가 중복 제거 지점이 됩니다: `push` 핸들러는 포커스/보이는 상태의 클라이언트가 이미 해당 알림의 딥링크 대상에 있을 때 `showNotification`을 억제해야 하지만, 배너 표시 여부와 무관하게 항상 앱 배지는 업데이트해야 합니다.

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

`deepLinkFor` / `clientMatchesTarget`은 소비자마다 다릅니다 -- 참고 구현은 `B1App/src/app/sw.ts`를 확인하세요. B1App은 `privateMessage`를 `/mobile/messages/:personId`로 라우팅하고, B1Admin은 `notification`을 자체 알림 패널로 라우팅하는 식입니다.

## 운영 참고 사항

- **`gone: true` 결과** -- `WebPushHelper.sendBulk`는 수신자별로 `{ token, success, gone, errorMessage }`를 반환합니다. `gone: true` 결과(푸시 서비스가 `404` 또는 `410`으로 응답)는 해당 구독이 영구적으로 유효하지 않다는 의미이며, `NotificationHelper`의 후속 코드가 다시 시도되지 않도록 해당 디바이스 행을 삭제합니다.
- **TTL** -- 푸시 메시지는 `TTL: 86400`(24시간)으로 전송됩니다. 사용자의 브라우저가 24시간 이내에 푸시 서비스에 연결하지 않으면 해당 푸시는 폐기됩니다.
- **재시도 없음** -- 일시적 실패(타임아웃, 5xx)는 로그로 남지만 재시도되지 않습니다. 푸시는 최선형(best-effort) 방식이며, 내구성 보장은 인페이지 소켓과 이메일 알림 단계가 담당합니다.
- **비활성화된 환경** -- 스테이징과 개발 환경은 VAPID 키를 비워 둘 수 있습니다. 이 경우 `WebPushHelper.isEnabled()`가 `false`를 반환하고 푸시는 조기 종료됩니다. 자체 VAPID ID가 없는 환경에서는 이것이 의도된 동작입니다.

## 관련 페이지

- [알림 아키텍처](./architecture/notifications) -- 전체 인앱/푸시/이메일 에스컬레이션 깔때기 및 리마인더 엔진
- [실시간 아키텍처](./realtime) -- WebSocket 전달; 이제 푸시는 소켓 전달이 도달하지 못했을 때의 대체 수단으로만이 아니라, 같은 인앱 깔때기 안에서 같은 패스로 소켓 전달과 함께 발생합니다
- [메시징 엔드포인트](./api/endpoints/messaging) -- 알림, 디바이스, 그 밖의 메시징 표면 전체
- [AppHelper](./shared-libraries/app-helper) -- `WebPushHelper`를 제공하는 npm 패키지
