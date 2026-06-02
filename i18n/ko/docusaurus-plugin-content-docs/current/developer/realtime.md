---
title: "실시간 아키텍처"
---

# 실시간 아키텍처

<div class="article-intro">

ChurchApps는 모든 실시간 표면을 위해 단일 WebSocket 기반 전달 프레임워크를 사용합니다 -- 그룹 채팅, 비공개 메시지, 콘텐츠 메모, 라이브 스트림 채팅, 존재/출석. 이 페이지는 프로토콜, 서버, 소비자가 사용하는 클라이언트 기본을 문서화합니다.

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

프로토콜은 3부로 구성됩니다:

1. **브라우저 탭당 하나의 지속적인 WebSocket**, `SocketHelper`로 열림.
2. **연결 행** (`POST /messaging/connections`) `connections` 테이블에 기록됨 -- 이것은 `(socketId, churchId, conversationId)` 튜플을 방의 구독자로 표시합니다.
3. **서버 측 팬아웃** `DeliveryHelper.sendConversationMessages()`로 -- 메시지가 저장될 때(`POST /messaging/messages/send`), 서버가 일치하는 연결 행을 읽고 각 열린 소켓으로 타입화된 페이로드를 푸시합니다.

Socket.IO, 장기 폴링 대체, 또는 별도의 마이크로 서비스는 없습니다. WebSocket은 REST API와 동일한 프로세스에서 실행됩니다(AWS에서 HTTP용 `web` Lambda, WebSocket용 `socket` Lambda; 로컬 및 Railway에서 하나의 결합된 프로세스).

## 포트 및 전송

| 환경 | HTTP | WebSocket |
|-------------|------|-----------|
| 로컬 개발 | `8084` | `ws://localhost:8087` (별도 `WebSocketServer`) |
| Railway / 단일 포트 호스트 | 공유 | 공유 HTTP 서버 (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default` 경로) |

전송 선택자는 `deliveryProvider` 구성입니다:

- `local` → 원본 `ws` 라이브러리; 클라이언트가 `CommonEnvironmentHelper`의 `MessagingApiSocket`으로 연결합니다.
- `aws` → API Gateway WebSocket; 서버가 `@aws-sdk/client-apigatewaymanagementapi`를 통해 활성 연결로 페이로드를 게시합니다.

클라이언트는 어떤 것이 사용 중인지 알 필요가 없습니다 -- 동일한 JSON 프로토콜을 어느 쪽이든 사용합니다.

## 와이어 프로토콜

모든 프레임은 `PayloadInterface` 모양의 JSON입니다:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // "방" -- 일반적으로 UUID, 때로는 "alerts" 또는 "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, 연결 후, 방 참여에 사용할 socketId 운반
  | "message"             // server → client, 새 메시지
  | "deleteMessage"       // server → client, 메시지 제거됨
  | "privateMessage"      // server → client, 비공개 대화의 새 메시지
  | "conversationActivity"// server → client, 콘텐츠 룸 구독자를 위한 보조 "뭔가 발생" 신호
  | "attendance"          // server → client, 시청자 목록 / 존재 스냅숏
  | "notification"        // server → client, 일반 알림 (카운트, 등)
  | "reconnect"           // client-internal, 드롭된 소켓을 새 소켓으로 대체할 때 SocketHelper에 의해 시작됨
  | "alert" | "callout";  // legacy, 연결 끝점 참고 참고
```

### 핸드셰이크

1. 클라이언트가 소켓을 열고 리터럴 문자열 `"getId"`를 보냅니다.
2. 서버가 `{ action: "socketId", data: "<id>" }`로 응답합니다.
3. 클라이언트가 `socketId`를 저장하고 모든 방 구독의 세 번째 좌표로 사용합니다.

### 방에 참여

"방"은 단지 `(churchId, conversationId)` 튜플입니다. 구독하려면 클라이언트가 `Connection` 행을 게시합니다:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; 익명 라이브 스트림 시청자의 경우 null
    "displayName": "Anonymous4823"
  }
]
```

게시하면 대화에 대한 `attendance` 브로드캐스트도 트리거되므로 기존 구독자가 새 시청자가 참여했음을 알 수 있습니다.

### 메시지 전송

`POST /messaging/messages/send` (익명 허용) 또는 `POST /messaging/messages/` (인증 필요):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

서버가 메시지를 저장한 후 `DeliveryHelper.sendConversationMessages()`는 해당 `conversationId`에 대한 모든 연결 행을 조회하고 각 소켓에 `{ action: "message", data: <message> }` 프레임을 보냅니다.

콘텐츠 바운드 대화(예: 사람에 첨부된 메모)의 경우, 합성 `"content-{type}-{id}"` 방에 `action: "conversationActivity"`와 함께 두 번째 브로드캐스트가 실행되므로 목록 뷰 소비자는 기본 대화를 보유하지 않고도 새로 고칠 수 있습니다.

### 방에서 나가기

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

연결 행을 삭제하고 최종 출석 브로드캐스트를 트리거합니다.

## 서버 측 구성 요소

| 파일 | 역할 |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | `WebSocketServer`를 소유합니다. 연결 시 `socketId`를 할당합니다. 죽은 소켓을 정리하고 연결 해제 시 출석 재브로드캐스트를 트리거합니다 |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)`는 방에 대한 연결을 읽고 각 프레임을 로컬 소켓 또는 AWS API Gateway 연결로 라우팅합니다. `sendAttendance(churchId, conversationId)`는 시청자 스냅숏을 구성하고 브로드캐스트합니다 |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` 참여, `DELETE /:churchId/:conversationId/:socketId` 나가기, `POST /setName` 디스플레이 이름 업데이트 |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (익명) 및 `POST /` (인증) 저장 후 팬아웃 |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)`는 구독자인 사람의 소스입니다 |

## 클라이언트 측 기본 (`@churchapps/apphelper`)

5개 기본 모두는 `apphelper/src/helpers/`의 정적 싱글톤입니다. 각 탭이 몇 개의 구성 요소가 페이지에 탑재되는지 관계없이 **하나**의 WebSocket을 열도록 협력합니다.

### `SocketHelper`

단일 WebSocket 연결을 소유합니다. 재입장 `init()`은 멱등성입니다 -- 여러 구성 요소가 중복 소켓을 열지 않고 호출할 수 있습니다. 다음을 노출합니다:

- `init()` -- 소켓을 열거나(다시 사용하거나) `getId` 핸드셰이크를 완료합니다.
- `addHandler(action, id, fn)` / `removeHandler(id)` -- `action`으로 리스너를 등록/등록 해제합니다. 여러 핸들러가 동일한 작업을 청취할 수 있습니다.
- `setPersonChurch({ personId, churchId })` -- 인증된 호출자의 경우; `"alerts"` 방 구독을 트리거하므로 푸시 알림이 이 소켓에 도착합니다.
- `onSocketIdReady(fn)` -- 핸드셰이크가 완료되면 한 번 발생합니다; `SubscriptionManager`가 보류 중인 참여를 플러시하는 데 사용됩니다.

### `SubscriptionManager`

기준 계산된 방 멤버십. 동일한 대화를 구독하는 여러 구성 요소는 서버 측 연결 행을 한 번만 등록합니다.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

소비자가 무료로 얻는 3가지 동작:

- **디바운스된 나가기 (300ms)** -- React StrictMode의 이중 마운트/언마운트 및 짧은 재마운트 주기를 서버 측 구독을 드롭하지 않고 생존합니다.
- **재연결 재참여** -- `SocketHelper`의 `"reconnect"` 이벤트를 청취하고 모든 활성 연결 행을 다시 발급합니다.
- **늦은 바인딩 socketId** -- `joinRoom`은 소켓이 핸드셰이크를 마치기 전에 의도를 기록합니다; 실제 `POST /connections`는 `onSocketIdReady`에서 발생합니다.

### `ConversationStore`

`conversationId`로 키 지정된 메모리 캐시. 정확히 한 번 `message` / `deleteMessage` / `privateMessage` 소켓 핸들러를 등록하고 현재 열려 있는 대화 중 인바운드 프레임을 적용합니다.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ 인증할 때 /messages/conversation/:id를 사용하고, 익명할 때 /messages/catchup/:churchId/:id를 사용합니다

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // 최신 스냅숏으로 다시 렌더링
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optional explicit cleanup
```

인증된 호출자는 또한 **사람 수화**를 얻습니다 -- 인바운드 메시지의 `personId`는 캐시된 `GET /people/ids` 조회를 통해 `PersonInterface` 객체로 해결됩니다. 익명 호출자는 이것을 건너뜁니다.

### `PresenceStore`

`ConversationStore`의 패턴을 `attendance` 작업에 대해 미러링합니다. 구독자는 서버가 존재를 다시 브로드캐스트할 때마다 `PresenceSnapshot { conversationId, totalViewers, viewers }`를 수신합니다. 동일한 스냅숏은 필요 없는 재렌더링을 피하기 위해 다시 렌더링 전에 중복 제거됩니다.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

**인증된** 호출자를 위한 최상위 부팅. `SocketHelper.init()`을 래핑하고, 사람/교회 컨텍스트를 설정합니다(자동으로 `"alerts"` 방에 참여하고), `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()`을 정확히 한 번 호출합니다.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

익명 흐름(라이브 스트림 채팅은 정식 예제)은 `NotificationService`를 건너뛰고 기본을 직접 호출합니다 -- `B1App/src/helpers/StreamChatManager.ts`의 참조 구현을 참고합니다.

## 라이브 스트림 채팅

라이브 스트림은 프레임워크의 가장 큰 익명 소비자입니다. 방 범위 지정을 위해 2개의 `contentType`을 사용합니다:

- `streamingLive` -- `/stream`의 공개 채팅 탭 (각 `streamingService`당 하나의 방).
- `streamingLiveHost` -- 호스트 권한이 있는 직원에게만 보이는 비공개 방. 방 ID는 서버에서 암호화됩니다(`GET /streamingServices/:id/hostChat`) 캐주얼 스크래핑이 이를 드러내지 않도록.

`B1App/src/helpers/StreamChatManager.ts`는 통합 기본을 통해 두 방을 모두 부팅합니다 -- 더 이상 라이브 스트림 관련 소켓 코드가 없습니다.

## 패턴 및 함정

- **자신의 WebSocket을 열지 마세요.** `SocketHelper`는 이유가 있어 싱글톤입니다. 사용자 정의 작업을 청취해야 하는 경우 `SocketHelper.addHandler`를 통해 기존 소켓에서 핸들러를 등록합니다.
- **`SubscriptionManager`를 우회하지 마세요.** 직접 `POST /connections` 호출은 작동하지만 기준 계산, 디바운스된 나가기, 재연결 재참여를 잃습니다. 그룹 채팅 및 PM 소비자는 모두 `SubscriptionManager`를 통해 이동합니다.
- **핸들러 ID는 작업당 고유해야 합니다.** `SocketHelper.addHandler(action, id, fn)`은 `(action, id)`로 키 지정됩니다; 동일한 ID를 두 리스너로 다시 사용하면 첫 번째를 대체합니다. 통합 저장소는 `"ConversationStore-Message"` 및 `"PresenceStore-Attendance"`와 같은 ID를 사용하여 소비자 ID에서 명확하게 유지합니다.
- **방 ID는 불투명한 문자열입니다.** 대부분은 대화 UUID이지만 시스템은 또한 `"alerts"` (사람 알림), `"content-{type}-{id}"` (합성 활동 방), 암호화된 `streamingLiveHost` ID도 지원합니다.
- **인증은 소켓이 아닌 REST 경계에서 확인됩니다.** `POST /connections`로 방에 참여하는 것은 익명 허용입니다; 접근 제어는 메시지 전송 시점에서 발생합니다(메시지 컨트롤러가 익명 호출자가 전송할 수 있는 `messageType`을 결정합니다).

## 관련 페이지

- [메시징 끝점](./api/endpoints/messaging) -- 메시지, 대화, 연결, 장치의 전체 REST 표면
- [웹 푸시 알림](./web-push) -- 브라우저 푸시, 같은 알림의 오프라인 대체로 소켓 전달과 구분
- [AppHelper](./shared-libraries/app-helper) -- 클라이언트 기본을 제공하는 npm 패키지
- [모듈 구조](./api/module-structure) -- 메시지 모듈이 서버 측에서 조직되는 방법
