---
title: "웹 푸시 알림"
---

# 웹 푸시 알림

<div class="article-intro">

ChurchApps 웹 앱은 W3C 웹 푸시 API를 통해 푸시 알림을 전달합니다 -- 서버 측에서 Firebase Cloud Messaging에서 사용하는 동일한 메커니즘이지만 FCM 대신 브라우저의 native `PushManager`를 통해 전달됩니다. 단일 VAPID 키 쌍은 MessagingApi의 모든 소비자 (B1Admin, B1App, 향후 PWA)를 다룹니다.

</div>

## 푸시가 발생할 때

푸시는 `NotificationHelper.attemptDeliveryWithEscalation()` 내부의 단일 전달 통과의 한 계층입니다 (`Api/src/modules/messaging/helpers/NotificationHelper.ts`): 인앱 환경 설정 게이트, 그 다음 소켓 전달 및 동일한 통과 내에서 시도되는 푸시 (각각 자신의 환경 설정 게이트 뒤)를 시도하고, 그 다음 이메일. 카테고리를 음소거한 수신자는 푸시에 절대 도달하지 않습니다. 소켓 전달 성공은 더 이상 푸시를 중지하지 않습니다 -- 모든 알림 타입은 이제 개인 메시지가 항상 했던 방식으로 동작하므로 백그라운드에 앉아 있는 설치된 PWA는 여전히 소켓 전달이 이미 도착했을 때도 OS 수준 알림을 나타냅니다. 중복 배너는 대신 서비스 워커에 의해 클라이언트 측에서 억제됩니다. 예약된 알림 및 직원 트리거 브로드캐스트는 소켓 단계를 건너뛰고 푸시 계층에서 직접 시작합니다. 이메일은 타이머 구동으로 유지되며 이 통과의 일부로가 아니라 자신의 일정에 따라 읽지 않은 행을 에스컬레이션합니다.

푸시에 도달하는 가장 일반적인 경로:

1. **콘텐츠 알림** -- 사람이 따르는 대화에 대한 회신, 언급 또는 기타 이벤트 -- `NotificationHelper.createNotifications()`을 통해 라우팅됩니다.
2. **개인 메시지** -- 직접 메시지는 동일한 전달 함수를 통과하고 항상 소켓 전달과 함께 푸시를 시도합니다.
3. **예약된 알림** -- 알림 엔진이 확장하고 전달하는 이벤트, 작업 및 서빙 알림 -- 푸시 계층에서 직접 새 발생을 시작합니다.
4. **직원 트리거 푸시** -- `POST /messaging/notifications/create`, `/ping` 및 `/group/send` -- 일회성 또는 그룹 브로드캐스트의 경우.

## 서버 흐름

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app preference gate
       ├─ same pass, both attempted
       │    ├─ socket delivery via DeliveryHelper
       │    └─ push preference gate
       │         └─ WebPushHelper.sendBulkTypedMessages(...)
       └─ email preference gate
```

### 필수 환경 변수

VAPID 키는 `Environment`에 저장되며 푸시가 활성화되려면 존재해야 합니다:

| 변수 | 설명 |
|----------|-------------|
| `webPushPublicKey` | VAPID 공개 키 (base64url). `GET /messaging/webpush/publicKey`를 통해 클라이언트에 반환됨 |
| `webPushPrivateKey` | VAPID 비공개 키. 모든 아웃바운드 푸시에 서명하는 데 사용됨 |
| `webPushSubject` | 푸시 서비스에 보고된 `mailto:` URI. 기본값은 `mailto:support@churchapps.org` |

키가 누락될 때 `WebPushHelper.isEnabled()`가 `false`를 반환합니다 -- 메시징 모듈은 계속 작동하며 푸시 전달은 단순히 작동하지 않습니다.

### VAPID 키 쌍 생성

```bash
npx web-push generate-vapid-keys
```

로컬 (`.env`) 또는 AWS SSM 매개변수 저장소 (배포)에 출력을 추가합니다. 키를 회전시키면 모든 기존 구독이 무효화됩니다 -- 클라이언트는 다음 페이지 로드에서 다시 등록해야 합니다.

## 저장소 모델

웹 푸시 구독은 FCM 기기 기록과 함께 기존 `devices` 테이블에 저장됩니다. 이들은 `fcmToken` 열의 `webpush:` 접두사로 구별됩니다:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

이를 통해 단일 `loadByPersonId` 호출은 플랫폼과 관계없이 사용자가 등록한 모든 기기를 반환할 수 있습니다. `WebPushHelper.isWebPushToken(token)` 및 `decodeSubscription(token)`은 접두사 로직을 처리합니다.

## 엔드포인트

기본 경로: `/messaging/webpush`

| 방법 | 경로 | 인증 | 설명 |
|--------|------|------|-------------|
| GET | `/publicKey` | 공개 | `{ publicKey, enabled }`를 반환합니다 |
| POST | `/subscribe` | JWT | 인증된 사용자에 대한 구독을 등록합니다 |
| POST | `/unsubscribe` | 공개 | 주어진 끝점을 포함하는 기기 행을 삭제합니다 |
| DELETE | `/subscription/:id` | JWT | 특정 기기 행을 ID로 삭제합니다 |

## 클라이언트 기본 요소: `WebPushHelper`

`@churchapps/apphelper`의 `WebPushHelper`는 단일 클라이언트 측 진입점입니다. 호스트는 부팅 시 이를 한 번 구성하고 로그인 후 `subscribe()`를 호출합니다.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

WebPushHelper.configure({
  scope: "/",
  appName: "B1AppPwa"
});

await WebPushHelper.subscribe();
```

소비자가 무료로 받는 동작:

- **능력 확인** -- `isSupported()`는 `serviceWorker` / `PushManager` / `Notification` 없는 브라우저에서 `false`를 반환합니다.
- **쿨다운** -- `canPromptNow()`는 `localStorage`를 통해 프롬프트 간 7일 쿨다운을 강제합니다.
- **옵트아웃** -- `setOptedOut(true)` 및 `unsubscribe()`는 재프롬프팅을 차단합니다.
- **재등록** -- `refreshEnrollment()`는 기존 브라우저 구독을 새 `userChurch`에 대해 다시 게시합니다.

### 서비스 워커 요구 사항

브라우저의 `PushManager`는 구성된 범위에 등록된 서비스 워커가 있을 때만 구독을 해결합니다. ChurchApps PWA는 서비스 워커 생성을 위해 [Serwist](https://serwist.dev/) (Next.js 앱) 또는 workbox를 사용합니다. 서버가 이제 항상 소켓 전달과 함께 푸시를 시도하므로 (위의 [푸시가 발생할 때](#when-push-fires) 참조) 서비스 워커는 중복 제거 지점입니다:

```javascript
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount);

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
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
    if (exact) return exact.focus();

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget`는 소비자 특정입니다 -- 참고 구현을 위해 `B1App/src/app/sw.ts`를 참조합니다.

## 운영 노트

- **`gone: true` 결과** -- `WebPushHelper.sendBulk`는 수신자당 `{ token, success, gone, errorMessage }`를 반환합니다. `gone: true` 결과는 구독이 영구적으로 유효하지 않음을 의미합니다.
- **TTL** -- 푸시 메시지는 `TTL: 86400` (24시간)으로 전송됩니다.
- **재시도 없음** -- 일시적 실패는 기록되고 다시 시도되지 않습니다. 푸시는 최선의 노력입니다.
- **비활성화 환경** -- 스테이징 및 개발 환경은 VAPID 키를 비워 둘 수 있습니다.

## 관련 페이지

- [알림 아키텍처](./architecture/notifications)
- [실시간 아키텍처](./realtime)
- [메시징 엔드포인트](./api/endpoints/messaging)
- [AppHelper](./shared-libraries/app-helper)
