---
title: "실시간 아키텍처"
---

# 실시간 아키텍처

<div class="article-intro">

ChurchApps는 그룹 채팅, 개인 메시지, 콘텐츠 노트, 라이브 스트림 채팅, 프레즌스/출석까지 모든 실시간 표면에 대해 단일한 WebSocket 기반 전달 프레임워크를 사용합니다. 이 페이지는 프로토콜, 서버, 그리고 소비자가 사용하는 클라이언트 프리미티브를 문서화합니다.

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

이 프로토콜은 세 가지 요소로 이루어집니다.

1. 브라우저 탭당 하나씩 열리는 **하나의 영구 WebSocket** -- `SocketHelper`가 엽니다.
2. `connections` 테이블에 기록되는 **연결 행**(`POST /messaging/connections`) -- `(socketId, churchId, conversationId)` 튜플을 어떤 방(room)의 구독자로 표시합니다.
3. `DeliveryHelper.sendConversationMessages()`가 수행하는 **서버 측 팬아웃(fan-out)** -- 메시지가 저장되면(`POST /messaging/messages/send`) 서버가 일치하는 연결 행을 읽어 열려 있는 각 소켓으로 타입이 지정된 페이로드를 푸시합니다.

Socket.IO도, 롱폴링 대체 수단도, 별도의 마이크로서비스도 없습니다. WebSocket은 REST API와 동일한 프로세스에서 실행됩니다(AWS에서는 HTTP용 `web` Lambda, WebSocket용 `socket` Lambda로 나뉘며, 로컬 및 Railway에서는 하나로 결합된 프로세스입니다).

## 포트와 전송

| 환경 | HTTP | WebSocket |
|-------------|------|-----------|
| 로컬 개발   | `8084` | `ws://localhost:8087`(별도의 `WebSocketServer`) |
| Railway / Docker / 단일 포트 호스트(`RAILWAY_ENVIRONMENT` 또는 `SELF_HOSTED` 설정 시) | 공유 | 공유 HTTP 서버(`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket(`$connect` / `$disconnect` / `$default` 라우트) |

전송 방식을 결정하는 것은 `deliveryProvider` 구성입니다.

- `local` → 원시 `ws` 라이브러리; 클라이언트는 `CommonEnvironmentHelper`의 `MessagingApiSocket`으로 연결합니다.
- `aws` → API Gateway WebSocket; 서버는 `@aws-sdk/client-apigatewaymanagementapi`를 통해 활성 연결로 페이로드를 게시합니다.

클라이언트는 어느 쪽이 사용되는지 알 필요가 없습니다 -- 어느 쪽이든 동일한 JSON 프로토콜을 사용합니다.

## 와이어 프로토콜

모든 프레임은 `PayloadInterface` 형태의 JSON입니다.

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // the "room" — usually a UUID, sometimes "alerts" or "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, after connect, carries the socketId to use for room joins
  | "message"             // server → client, new message
  | "deleteMessage"       // server → client, message removed
  | "privateMessage"      // server → client, badge-count ping to the recipient's "alerts" room when a direct message escalates; the message body itself arrives via the ordinary "message" action inside the open conversation
  | "reaction"            // server → client, emoji reaction toggled on a message; data is { messageId, conversationId, personId, emoji, added } (added=false means removed). Broadcast to the conversation room by POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, secondary "something happened" signal for content-room subscribers
  | "attendance"          // server → client, viewer list / presence snapshot
  | "notification"        // server → client, generic notification (counts, etc.)
  | "reconnect"           // client-internal, dispatched locally by SocketHelper after a new socketId handshake completes following a drop — either an exponential-backoff reconnect after an unexpected close, or an immediate reconnect triggered by the resume probe (tab focus/visibility/online); never sent by the server
  | "alert" | "callout";  // legacy, see Connections endpoint reference
```

### 핸드셰이크

1. 클라이언트가 소켓을 열고 리터럴 문자열 `"getId"`를 전송합니다.
2. 서버는 `{ action: "socketId", data: "<id>" }`로 응답합니다.
3. 클라이언트는 그 `socketId`를 저장해 두었다가 모든 방 구독의 세 번째 좌표로 사용합니다.

### 방 참가하기

"방"은 그저 `(churchId, conversationId)` 튜플일 뿐입니다. 구독하려면 클라이언트는 `Connection` 행을 게시합니다.

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null for anonymous live stream viewers
    "displayName": "Anonymous4823"
  }
]
```

게시하면 해당 대화에 `attendance` 브로드캐스트도 함께 트리거되어, 기존 구독자들이 새 뷰어가 참가했음을 알 수 있게 됩니다.

### 메시지 보내기

`POST /messaging/messages/send`(익명 허용) 또는 `POST /messaging/messages/`(인증 필요):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

서버는 메시지를 저장한 다음, `DeliveryHelper.sendConversationMessages()`가 해당 `conversationId`의 모든 연결 행을 조회하여 각 소켓에 `{ action: "message", data: <message> }` 프레임을 전송합니다.

콘텐츠에 결속된 대화(예: 어떤 사람에게 첨부된 노트)의 경우, 합성된 `"content-{type}-{id}"` 방에 `action: "conversationActivity"`인 두 번째 브로드캐스트가 발생합니다. 이를 통해 목록 뷰의 소비자들은 기저 대화를 계속 열어 두지 않고도 새로고침해야 함을 알 수 있습니다.

### 방 나가기

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

연결 행을 지우고 마지막 attendance 브로드캐스트를 트리거합니다.

## 서버 측 구성 요소

| 파일 | 역할 |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | `WebSocketServer`를 소유합니다. 연결 시 `socketId`를 할당합니다. 30초 간격의 ping/pong 하트비트(`startHeartbeat`)를 실행하여 pong을 놓친 연결을 `terminate()`하고 정리합니다. 끊어진 소켓을 정리하고 연결 해제 시 attendance 재브로드캐스트를 트리거합니다. `getLiveSocketIds()`와 `reapStaleConnections()`를 노출하며, 이는 30분 타이머 작업이 오래된 `connections` 행을 삭제할 때 사용됩니다 -- 로컬에서는 프로세스 내에서 어떤 socketId가 아직 살아 있는지 확인하는 방식으로, AWS에서는 놓친 `$disconnect` 이벤트에 대한 24시간 TTL 백스톱으로 동작합니다(API Gateway는 연결을 약 2시간으로 제한하므로, 이 방식으로는 살아 있는 연결을 잘못 정리할 수 없습니다) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)`는 해당 방의 연결을 조회해 각 프레임을 로컬 소켓 또는 AWS API Gateway 연결로 라우팅합니다. `sendAttendance(churchId, conversationId)`는 뷰어 스냅샷을 만들어 브로드캐스트합니다 |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /`는 참가, `DELETE /:churchId/:conversationId/:socketId`는 나가기, `POST /setName`은 표시 이름 업데이트를 처리합니다 |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send`(익명)와 `POST /`(인증)는 저장 후 팬아웃합니다 |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)`가 누가 구독 중인지에 대한 신뢰 가능한 출처입니다 |

## 클라이언트 측 프리미티브(`@churchapps/apphelper`)

다섯 개의 프리미티브 모두 `apphelper/src/helpers/`에 있는 정적 싱글턴입니다. 이들은 서로 협력하여, 페이지에 몇 개의 컴포넌트가 마운트되든 각 탭이 **하나의** WebSocket만 열도록 합니다.

### `SocketHelper`

단일 WebSocket 연결을 소유합니다. 재진입 가능한 `init()`은 멱등적입니다 -- 여러 컴포넌트가 이를 호출해도 중복 소켓이 열리지 않습니다. 다음을 노출합니다.

- `init()` -- 소켓을 열거나(또는 재사용) `getId` 핸드셰이크를 완료합니다. 핸드셰이크가 완료되면 곧바로, 또는 5초 타임아웃 후 백그라운드 재시도 루프가 인계받으면 resolve됩니다. 절대 reject되지 않으므로 호출자는 첫 연결 실패를 별도로 처리할 필요가 없습니다.
- `addHandler(action, id, fn)` / `removeHandler(id)` -- `action`별로 리스너를 등록/해제합니다. 여러 핸들러가 같은 action을 청취할 수 있습니다.
- `setPersonChurch({ personId, churchId })` -- 인증된 호출자를 위한 것으로, `"alerts"` 방 구독을 트리거하여 이 소켓으로 푸시 알림이 도착하도록 합니다.
- `onSocketIdReady(fn)` -- 최초 연결뿐 아니라 이후의 모든 재연결을 포함해 새 socketId가 생길 때마다 발생합니다. `SubscriptionManager`가 대기 중인 참가 요청을 플러시하는 데 사용합니다.
- `checkConnection()` -- 아래의 재개(resume) 리스너들이 호출하며, 소켓이 이미 닫혀 있으면 즉시 재연결하고, 열려 있는 것처럼 보이면 생존 확인(probe)을 전송합니다.

**재연결 생명 주기.** 예기치 않은 연결 종료는 지수 백오프(1초부터 시작해 최대 30초까지 두 배씩 증가)로 재연결을 예약합니다. `SocketHelper`는 또한 `window`/`document`의 `online`, `focus`, `pageshow`, `visibilitychange` 이벤트를 청취하여 탭이 재개되었는지 감지합니다: 소켓이 이미 닫혀 있으면 즉시 재연결하고 백오프를 초기화하며, 열려 있는 것처럼 보이면 `"getId"` 생존 확인 프로브를 전송하고 3초 내에 응답 프레임이 오지 않으면 강제로 재연결합니다 -- 이는 모바일 OS가 앱을 일시 중단시킨 후 남겨진 반쯤 열린 소켓을 잡아내기 위한 것입니다. 재핸드셰이크에 성공하면 `SocketHelper`는 로컬 `"reconnect"` 액션([와이어 프로토콜](#wire-protocol) 참조)을 해당 액션에 등록된 모든 핸들러로 전달합니다.

### `SubscriptionManager`

참조 카운트 기반의 방 멤버십 관리입니다. 동일한 대화를 구독하는 여러 컴포넌트라도 서버 측 연결 행은 하나만 등록됩니다.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

소비자가 별도 작업 없이 얻는 세 가지 동작:

- **디바운스된 나가기(300ms)** -- React StrictMode의 이중 마운트/언마운트나 짧은 재마운트 주기를 겪어도 서버 측 구독을 잃지 않고 버텨냅니다. `reset()`은 대기 중인 디바운스된 나가기도 함께 취소합니다.
- **재연결 시 재참가** -- `SubscriptionManager`는 각 방에 참가할 때 사용한 `personId`/`displayName`을 기억해 두었다가, `SocketHelper`의 `"reconnect"` 이벤트(그리고 모든 `onSocketIdReady` 호출) 시 신원 정보를 그대로 유지한 채 활성 연결 행 전체를 다시 게시합니다. 재참가는 socketId별로 중복 제거되므로 같은 재연결에서 같은 방을 두 번 다시 게시하지 않습니다.
- **지연 바인딩되는 socketId** -- `joinRoom`은 소켓이 핸드셰이크를 마치기 전에 참가 의도를 기록해 두며, 실제 `POST /connections`는 `onSocketIdReady` 시점에 발생합니다.

### `ConversationStore`

`conversationId`를 키로 하는 인메모리 캐시입니다. `message` / `deleteMessage` / `privateMessage` 소켓 핸들러를 정확히 한 번만 등록하고, 현재 열려 있는 대화에 인바운드 프레임을 적용합니다.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ uses /messages/conversation/:id when authenticated, /messages/catchup/:churchId/:id when anonymous

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render with the latest snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optional explicit cleanup
```

인증된 호출자는 **사람 정보 하이드레이션**도 함께 얻습니다 -- 수신 메시지의 `personId`가 캐시된 `GET /people/ids` 조회를 통해 `PersonInterface` 객체로 해석됩니다. 익명 호출자는 이 과정을 건너뜁니다.

`SocketHelper`의 `"reconnect"` 이벤트가 발생하면, `ConversationStore`는 현재 활성 `subscribe` 리스너가 있는 모든 대화를 다시 조회하여 소켓이 끊긴 동안 놓친 메시지를 복구합니다. 익명 대화는 `churchId`가 기록되지 않았다면(캐치업 엔드포인트에는 `churchId`가 필요함) 이 캐치업을 건너뜁니다.

### `PresenceStore`

`attendance` 액션에 대해 `ConversationStore`와 동일한 패턴을 따릅니다. 구독자는 서버가 프레즌스를 재브로드캐스트할 때마다 `PresenceSnapshot { conversationId, totalViewers, viewers }`를 받습니다. 동일한 스냅샷은 알림 전에 중복 제거되므로, 재연결이 몰릴 때 불필요한 재렌더링이 발생하지 않습니다.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

**인증된** 호출자를 위한 최상위 부트스트랩입니다. `SocketHelper.init()`을 감싸고, 사람/교회 컨텍스트를 설정하며(자동으로 `"alerts"` 방에 참가), `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()`을 정확히 한 번씩 호출합니다. 또한 자체 `"reconnect"` 핸들러를 등록해 알림/PM 카운트를 다시 로드하므로, 연결이 끊긴 뒤에도 배지가 정상적으로 복구됩니다.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

익명 흐름(라이브 스트림 채팅이 대표적인 예)은 `NotificationService`를 건너뛰고 프리미티브를 직접 호출합니다 -- 참고 구현은 `B1App/src/helpers/StreamChatManager.ts`를 확인하세요.

## 라이브 스트림 채팅

라이브 스트림은 이 프레임워크의 가장 큰 익명 소비자입니다. 방 범위 지정을 위해 두 가지 `contentType`을 사용합니다.

- `streamingLive` -- `/stream`의 공개 채팅 탭(`streamingService`당 하나의 방).
- `streamingLiveHost` -- `contentApi.chat.host` 권한을 가진 직원에게만 보이는 비공개 방. 방 id는 서버에서 암호화되어(`GET /streamingServices/:id/hostChat`) 무심코 스크래핑해도 노출되지 않습니다.

`B1App/src/helpers/StreamChatManager.ts`는 통합된 프리미티브를 통해 두 방을 모두 부트스트랩합니다 -- 더 이상 라이브 스트림 전용 소켓 코드는 존재하지 않습니다.

## 패턴과 주의할 점

- **직접 WebSocket을 열지 마세요.** `SocketHelper`가 싱글턴인 데는 이유가 있습니다. 커스텀 액션을 청취해야 한다면 `SocketHelper.addHandler`로 기존 소켓에 핸들러를 등록하세요.
- **`SubscriptionManager`를 우회하지 마세요.** `POST /connections`를 직접 호출해도 동작은 하지만, 참조 카운팅, 디바운스된 나가기, 재연결 시 재참가 기능을 잃게 됩니다. 그룹 채팅과 PM 소비자는 모두 `SubscriptionManager`를 거칩니다.
- **핸들러 id는 action별로 고유해야 합니다.** `SocketHelper.addHandler(action, id, fn)`은 `(action, id)`를 키로 사용합니다. 같은 id를 두 리스너에 재사용하면 앞의 것을 대체해 버립니다. 통합 스토어들은 소비자 id와 충돌하지 않도록 `"ConversationStore-Message"`, `"PresenceStore-Attendance"` 같은 id를 사용합니다.
- **방 id는 불투명한 문자열입니다.** 대부분은 대화 UUID이지만, 시스템은 `"alerts"`(사람별 알림), `"content-{type}-{id}"`(합성 활동 방), 그리고 암호화된 `streamingLiveHost` id도 지원합니다.
- **인증은 소켓이 아니라 REST 경계에서 확인됩니다.** `POST /connections`로 방에 참가하는 것은 익명으로 허용되며, 접근 제어는 메시지 전송 시점에 이루어집니다(메시지 컨트롤러가 익명 호출자가 어떤 `messageType`을 보낼 수 있는지 결정합니다).

## 관련 페이지

- [알림 아키텍처](./architecture/notifications) -- 이 전송 계층이 공급하는 인앱/푸시/이메일 에스컬레이션 깔때기
- [메시징 엔드포인트](./api/endpoints/messaging) -- 메시지, 대화, 연결, 디바이스에 대한 전체 REST 표면
- [웹 푸시 알림](./web-push) -- 브라우저 푸시, 페이지 내 소켓 전달과는 별개
- [AppHelper](./shared-libraries/app-helper) -- 클라이언트 프리미티브를 제공하는 npm 패키지
- [모듈 구조](./api/module-structure) -- 서버 측에서 메시징 모듈이 어떻게 구성되어 있는지
