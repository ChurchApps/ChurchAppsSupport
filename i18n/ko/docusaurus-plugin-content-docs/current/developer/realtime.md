---
title: "실시간 아키텍처"
---

# 실시간 아키텍처

<div class="article-intro">

ChurchApps는 모든 실시간 표면 -- 그룹 채팅, 개인 메시지, 콘텐츠 노트, 라이브 스트림 채팅, 프레젌스/참석 -- 을 위해 단일 WebSocket 기반 전달 프레임워크를 사용합니다. 이 페이지는 프로토콜, 서버 및 소비자가 사용하는 클라이언트 기본 요소를 문서화합니다.

</div>

## 개요

```
┌────────────────────┐                ┌────────────────────────────┐
│ Browser / B1Admin  │                │  MessagingApi (Lambda)     │
│ Browser / B1App    │ ─── WS ─────▶  │  ┌───────────────────────┐ │
│  - SocketHelper    │                │  │ SocketHelper (server) │ │
│  - SubscriptionMgr │   POST /msg ──▶│  │ MessageController     │ │
│  - ConversationStore│  POST /conn ─▶│  │ ConnectionController  │ │
│  - PresenceStore   │ ◀── action ──  │  │ DeliveryHelper        │ │
└────────────────────┘                │  └───────────────────────┘ │
                                      └────────────────────────────┘
```

프로토콜에는 세 가지 부분이 있습니다:

1. **하나의 영구 WebSocket** -- 브라우저 탭당, `SocketHelper`에 의해 열립니다.
2. **연결 행** (`POST /messaging/connections`) -- `connections` 테이블에 기록되며 `(socketId, churchId, conversationId)` 튜플이 한 방에 대한 구독자임을 표시합니다.
3. **서버 측 팬아웃** -- `DeliveryHelper.sendConversationMessages()` 사용 -- 메시지가 저장될 때 (`POST /messaging/messages/send`) 서버는 일치하는 연결 행을 읽고 각 열린 소켓으로 입력된 페이로드를 푸시합니다.

Socket.IO가 없고, 장시간 폴링 폴백이 없으며, 별도의 마이크로서비스가 없습니다. WebSocket은 REST API와 동일한 프로세스에서 실행됩니다 (AWS에서는 HTTP용 `web` Lambda, WebSocket용 `socket` Lambda; 로컬 및 Railway의 결합 프로세스).

## 포트 및 전송

| 환경 | HTTP | WebSocket |
|-------------|------|-----------|
| 로컬 개발   | 8084 | ws://localhost:8087 (별도의 WebSocketServer) |
| Railway / 단일 포트 호스트 | 공유됨 | 공유 HTTP 서버 (SocketHelper.attachToServer()) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket ($connect / $disconnect / $default 경로) |

전송 선택기는 `deliveryProvider` 구성입니다:

- `local` → 원본 `ws` 라이브러리; 클라이언트는 `CommonEnvironmentHelper`의 `MessagingApiSocket`으로 연결합니다.
- `aws` → API Gateway WebSocket; 서버는 `@aws-sdk/client-apigatewaymanagementapi`를 통해 활성 연결로 페이로드를 게시합니다.

클라이언트는 어느 것이 사용되고 있는지 알 필요가 없습니다 -- 어느 쪽 방법이든 동일한 JSON 프로토콜을 사용합니다.

## 와이어 프로토콜

모든 프레임은 `PayloadInterface` 형태의 JSON입니다:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"
  | "message"
  | "deleteMessage"
  | "privateMessage"
  | "reaction"
  | "conversationActivity"
  | "attendance"
  | "notification"
  | "reconnect"
  | "alert" | "callout";
```

### 핸드셰이크

1. 클라이언트가 소켓을 열고 리터럴 문자열 `"getId"`를 전송합니다.
2. 서버는 `{ action: "socketId", data: "<id>" }`로 응답합니다.
3. 클라이언트는 `socketId`를 저장하고 모든 방 구독의 세 번째 좌표로 사용합니다.

### 방 가입

"방"은 단순히 `(churchId, conversationId)` 튜플입니다. 구독하려면 클라이언트는 `Connection` 행을 게시합니다:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,
    "displayName": "Anonymous4823"
  }
]
```

게시하면 대화에서 `attendance` 브로드캐스트도 트리거되므로 기존 구독자가 새 뷰어가 참여했음을 알게 됩니다.

### 메시지 전송

`POST /messaging/messages/send` (익명 허용) 또는 `POST /messaging/messages/` (인증 필요):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

서버는 메시지를 저장한 다음 `DeliveryHelper.sendConversationMessages()`는 그 `conversationId`에 대한 모든 연결 행을 조회하고 각 소켓으로 `{ action: "message", data: <message> }` 프레임을 전송합니다.

콘텐츠 바운드 대화 (예: 사람에게 첨부된 메모)의 경우 합성 `"content-{type}-{id}"` 방에서 `action: "conversationActivity"`를 사용하는 두 번째 브로드캐스트가 발생합니다.

### 방 떠나기

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

연결 행을 지우고 최종 참석 브로드캐스트를 트리거합니다.

## 서버 측 컴포넌트

| 파일 | 역할 |
|------|------|
| SocketHelper.ts | WebSocketServer 소유, socketId 할당, 핵심 연결 관리 |
| DeliveryHelper.ts | 메시지 전달, 참석 브로드캐스트 |
| ConnectionController.ts | 방 가입/떠나기 엔드포인트 |
| MessageController.ts | 메시지 저장 및 전달 |
| ConnectionRepo.ts | 연결 쿼리 |

## 클라이언트 측 기본 요소 (`@churchapps/apphelper`)

다섯 개의 기본 요소 모두는 `apphelper/src/helpers/`의 정적 싱글톤입니다.

### `SocketHelper`

단일 WebSocket 연결을 소유합니다. 재진입 `init()`은 멱등입니다 -- 여러 컴포넌트가 중복 소켓을 열지 않고 호출할 수 있습니다. 주요 메서드:

- `init()` -- 소켓을 열거나 재사용하고 `getId` 핸드셰이크를 완료합니다
- `addHandler(action, id, fn)` / `removeHandler(id)` -- 리스너 등록/등록 취소
- `setPersonChurch({ personId, churchId })` -- 인증된 호출자용
- `onSocketIdReady(fn)` -- 모든 새 socketId에서 발생
- `checkConnection()` -- 연결 확인

**재연결 생명 주기**: 예기치 않은 종료는 지수 백오프로 재연결을 예약합니다. 성공적인 재연결에서 로컬 `"reconnect"` 작업을 전달합니다.

### `SubscriptionManager`

참조 계산 방 멤버십. 동일한 대화를 구독하는 여러 컴포넌트는 하나의 서버 측 연결 행만 등록합니다.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

### `ConversationStore`

메모리 내 캐시, 메시지 수신 및 저장.

### `PresenceStore`

뷰어 프레젠스 추적.

### `NotificationService`

인증된 호출자를 위한 부팅 스타터.

## 관련 페이지

- [알림 아키텍처](./architecture/notifications) -- 완전한 에스컬레이션 깔때기
- [메시징 엔드포인트](./api/endpoints/messaging) -- REST 표면
- [웹 푸시 알림](./web-push) -- 브라우저 푸시
- [AppHelper](./shared-libraries/app-helper) -- 클라이언트 기본 요소
- [모듈 구조](./api/module-structure) -- 서버 측 구성
