---
title: "웹 푸시 알림"
---

# 웹 푸시 알림

<div class="article-intro">

ChurchApps 웹 앱은 W3C 웹 푸시 API를 통해 푸시 알림을 전달합니다 -- 서버 측에서 Firebase Cloud Messaging이 사용하는 메커니즘과 동일하지만 FCM 대신 브라우저의 기본 `PushManager`를 통해 전달됩니다. 하나의 VAPID 키 쌍은 모든 소비자(B1 Admin, B1 App, 향후 PWA)를 포함합니다.

</div>

## 푸시가 발생하는 경우

MessagingApi는 `Api/src/modules/messaging/helpers/NotificationHelper.ts`를 통해 라우팅되는 3가지 상황에서 웹 푸시 메시지를 전달합니다:

1. **그룹 / 콘텐츠 알림** -- 사용자가 따르거나 언급되는 스레드에 누군가가 회신합니다.
2. **비공개 메시지** -- `POST /messaging/privatemessages`는 수신자의 등록된 기기로 푸시를 트리거합니다.
3. **일반 알림** -- `POST /messaging/notifications/create` 또는 `/ping`에 직접 호출합니다.

푸시는 `NotificationHelper`의 에스컬레이션 래더에서 **최후의 수단 계층**입니다. 수신자가 관련 방에 활성 WebSocket 연결을 가지고 있으면([실시간 아키텍처](./realtime) 참고), 메시지를 앱 내에서 수신하고 푸시가 해당 전달에 대해 억제됩니다. 사용자가 오프라인이거나 최근에 보이지 않은 경우에만 푸시가 발생합니다.

## 필수 환경 변수

VAPID 키는 `Environment`에 저장되며 푸시를 활성화하려면 존재해야 합니다:

| 변수 | 설명 |
|----------|-------------|
| `webPushPublicKey` | VAPID 공개 키 (base64url). 클라이언트가 `GET /messaging/webpush/publicKey`를 통해 반환됩니다 |
| `webPushPrivateKey` | VAPID 개인 키. 모든 아웃바운드 푸시에 서명하는 데 사용됩니다 |
| `webPushSubject` | 푸시 서비스에 보고된 `mailto:` URI. 기본값은 `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()`는 키가 누락된 경우 `false`를 반환합니다 -- 메시징 모듈은 계속 작동합니다. 푸시 전달은 단순히 작업 안함입니다.

## 저장소 모델

웹 푸시 구독은 FCM 기기 기록과 함께 기존 `devices` 테이블에 저장됩니다. `fcmToken` 열의 `webpush:` 접두사로 구별됩니다:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

이를 통해 단일 `loadByPersonId` 호출로 플랫폼에 관계없이 사용자가 등록한 모든 기기를 반환할 수 있습니다.

## 끝점

기본 경로: `/messaging/webpush`

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|-------------|
| GET | `/publicKey` | 공개 | `{ publicKey, enabled }`를 반환합니다 |
| POST | `/subscribe` | JWT | 인증된 사용자를 위해 구독을 등록 또는 업데이트합니다 |
| POST | `/unsubscribe` | 공개 | 주어진 끝점을 포함하는 기기 행을 삭제합니다 |
| DELETE | `/subscription/:id` | JWT | 서버 측 ID로 특정 기기 행을 삭제합니다 |

## 클라이언트 기본: `WebPushHelper`

`@churchapps/apphelper`의 `WebPushHelper`는 단일 클라이언트 측 진입점입니다. 호스트가 부팅 시 한 번 구성하고 로그인 후 `subscribe()`를 호출합니다.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

WebPushHelper.configure({
  scope: "/",                // service worker scope
  appName: "B1AppPwa"        // stored on the device row
});

await WebPushHelper.subscribe();
```

소비자가 무료로 얻는 동작:

- **기능 확인** -- `isSupported()`는 PushManager이 없는 브라우저에서 `false`를 반환합니다.
- **쿨다운** -- `canPromptNow()`는 localStorage를 통해 프롬프트 간에 7일 쿨다운을 적용합니다.
- **옵트아웃** -- `setOptedOut(true)` 및 `unsubscribe()`는 재프롬프트를 차단하고 서버 측 기기 행을 제거합니다.
- **독립 실행형 PWA 감지** -- `isStandalone()`은 호스트가 iOS 푸시 프롬프트를 "사용자가 PWA를 홈 화면에 설치했음" 뒤에 게이트할 수 있게 합니다.
- **교회 전환 시 재등록** -- `refreshEnrollment()`는 사용자를 다시 프롬프트하지 않고 새로운 `userChurch`에 대해 기존 브라우저 구독을 다시 게시합니다.

## 기술 세부 정보

서비스 워커는 등록된 범위에서 필수입니다. 푸시가 도착할 때 OS 수준 알림을 렌더링하기 위해 `push` 이벤트 핸들러를 포함해야 합니다.

## 운영 참고

- **`gone: true` 결과** -- 푸시 서비스가 404 또는 410으로 응답하면 구독이 영구적으로 유효하지 않습니다. 코드는 이러한 기기 행을 삭제하므로 다시 시도되지 않습니다.
- **TTL** -- 푸시 메시지는 `TTL: 86400`(24시간)으로 전송됩니다.
- **재시도 없음** -- 일시적 오류는 로그되고 재시도되지 않습니다. 푸시는 최선의 노력입니다.
- **비활성화된 환경** -- 스테이징 및 개발은 VAPID 키를 비워둘 수 있습니다.

## 관련 페이지

- [실시간 아키텍처](./realtime) -- WebSocket 전달; 푸시는 같은 알림의 오프라인 대체입니다
- [메시징 끝점](./api/endpoints/messaging) -- 알림, 기기 등
- [AppHelper](./shared-libraries/app-helper) -- `WebPushHelper`를 제공하는 npm 패키지
