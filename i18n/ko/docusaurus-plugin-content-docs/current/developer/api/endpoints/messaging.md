---
title: "메시징 엔드포인트"
---

# 메시징 엔드포인트

<div class="article-intro">

메시징 모듈은 실시간 대화, 채팅 메시지, 푸시 알림, SMS/이메일 전송, WebSocket 연결, 비공개 메시지, 기기 등록, 문자 메시지 제공업체를 관리합니다. 라이브 스트리밍 채팅과 비동기 알림을 모두 지원하며, 모든 ChurchApps 애플리케이션이 사용하는 통신 계층을 제공합니다.

</div>

**기본 경로:** `/messaging`

## 대화

기본 경로: `/messaging/conversations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/timeline/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 대화를 불러오며, 첫 메시지와 마지막 메시지를 포함합니다 |
| GET | `/messages/:contentType/:contentId` | JWT | — | 콘텐츠에 연결된 대화를 페이지 단위 메시지와 함께 불러옵니다 (`?page=&limit=`) |
| GET | `/posts` | JWT | — | 현재 사용자의 그룹에 속한 게시글 유형 대화를 가져옵니다 |
| GET | `/posts/group/:groupId` | JWT | — | 특정 그룹의 게시글 유형 대화를 가져옵니다 |
| GET | `/current/:churchId/:contentType/:contentId` | 공개 | — | 콘텐츠의 현재 대화를 가져오거나 생성합니다 (contentId를 자동으로 복호화합니다) |
| GET | `/:churchId/:contentType/:contentId` | 공개 | — | 콘텐츠 유형과 ID로 대화를 불러옵니다 |
| GET | `/:churchId/:id` | 공개 | — | ID로 단일 대화를 불러옵니다 |
| POST | `/` | JWT | — | 대화를 생성하거나 업데이트합니다 (일괄 처리) |
| POST | `/start` | JWT | — | 첫 댓글 메시지와 함께 새 대화를 시작합니다 |
| DELETE | `/:churchId/:id` | JWT | — | 대화를 삭제합니다 |

### 개인 메모 접근 제어

`contentType: "person"`(사람 기록의 메모 탭) 또는 `contentType: "personConfidential"`(기밀 메모 섹션)인 대화는 모든 읽기 및 쓰기 경로에서 접근이 제한됩니다. 위의 공개 경로도 예외가 아니며, 이 콘텐츠 유형에 대해 `401`을 반환합니다. `person`에는 MembershipApi의 **사람 / 편집** 권한이 필요하고, `personConfidential`에는 **사람 / 기밀 메모 보기** 권한이 필요합니다. 범위가 지정된 API 키의 경우 `people:write`가 두 작업을 모두 포함하지만, 키의 사용자는 여전히 해당 역할 권한을 보유하고 있어야 합니다.

### 그룹 및 이벤트 메모 접근 제어 {#group-and-event-notes-access-control}

같은 방식으로 제한되는 메모 콘텐츠 유형이 두 가지 더 있습니다. 위의 공개 경로를 포함한 모든 읽기 및 쓰기 경로에서 적용되며, 익명 게시에는 절대 열려 있지 않습니다.

- **`groupNote`** (`contentId` = 그룹 ID) -- 그룹의 **리더 메모** 피드입니다. 해당 그룹의 리더(JWT의 `leaderGroupIds`)만 읽거나 게시할 수 있습니다. `content.edit`와 그룹 구성원 권한을 포함하여 어떤 직원 권한도 접근을 허용하지 않습니다.
- **`eventNote`** (`contentId` = 이벤트 ID) -- 캘린더 이벤트의 메모입니다. `content.edit` 권한이 있는 직원이나 **캘린더 / 관리자** 권한이 있는 사용자는 항상 읽고 게시할 수 있습니다. 그 외에는 이벤트의 `notesViewRole`(읽기)과 `notesPostRole`(게시) 설정을 따릅니다. `staff`(기본값이며, 필드가 `null`일 때 사용됨)는 다른 누구에게도 허용하지 않고, `leaders`는 이벤트 그룹의 리더에게, `members`는 이벤트 그룹의 구성원과 리더에게 허용합니다. `groupId`가 없는 이벤트는 직원만 접근할 수 있습니다.

### 워크플로 카드 메모 접근 제어

`contentType: "workflowCard"`인 대화(워크플로 카드의 메모이며, `contentId`는 카드의 작업 ID입니다)는 해당 카드를 열 수 있는 사용자만 읽고 쓸 수 있습니다. 즉 DoingApi의 **작업 / 보기** 권한이 있는 사용자, 또는 카드가 할당되었거나 카드를 만들었거나 카드의 대상이 되는 사람이나 그룹입니다. 그 외의 모든 사용자는 위의 공개 경로를 포함한 모든 읽기 경로에서 `401`을 받습니다. 카드의 대화는 `POST /doing/tasks/:id/conversation`(본문 `{ "conversationId": "..." }`, 처음 연결된 대화가 우선)을 통해 카드 자체에 연결되며, 카드의 편집자와 담당자가 이 경로를 호출할 수 있습니다.

### 예제: 대화 시작하기

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## 메시지

기본 경로: `/messaging/messages`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/conversation/:conversationId` | JWT | — | 대화의 모든 메시지를 불러옵니다 |
| GET | `/catchup/:churchId/:conversationId` | 공개 | — | 대화의 모든 메시지를 불러옵니다 (라이브 채팅용 공개 catchup) |
| GET | `/:churchId/:id` | 공개 | — | ID로 단일 메시지를 불러옵니다 |
| POST | `/` | JWT | — | 메시지를 저장합니다 (일괄 처리). 실시간 업데이트를 보내고 알림을 트리거합니다. 기존 메시지를 수정하려면 작성자이거나 `content.edit` 권한이 있어야 하며, 저장된 작성자는 변경할 수 없습니다 |
| POST | `/send` | 공개 | — | 메시지를 전송합니다 (일괄, 공개). WebSocket으로 실시간 업데이트를 보내고 알림을 트리거합니다 |
| POST | `/setCallout` | JWT | — | (레거시) 콜아웃 메시지를 실시간으로 방송합니다. 활성 클라이언트가 없으며, 라이브 스트림 채팅에서는 더 이상 콜아웃을 표시하지 않습니다 |
| DELETE | `/:churchId/:id` | JWT | — | 메시지를 삭제하고 삭제 사실을 실시간으로 방송합니다. [메시지 관리](#message-moderation)를 참조하세요 |

### 메시지 관리 {#message-moderation}

다음 사용자는 메시지를 삭제할 수 있습니다.

- 메시지의 작성자
- 교회 전체에서 `content.edit` 권한이 있는 직원
- **그룹 리더**: `contentType`이 `group` 또는 `groupAnnouncement`이고 `contentId`가 리더를 맡고 있는 그룹인 대화에 한해 (JWT의 `leaderGroupIds`)

사람 메모 대화(`person` / `personConfidential`)는 리더가 관리하지 않으며, 대신 메모 권한(`people.edit`, `people.viewConfidentialNotes`)을 사용합니다.

리더에게는 삭제 권한만 있고 수정 권한은 없습니다. 다른 구성원의 메시지를 다시 작성하는 것은 여전히 작성자와 `content.edit` 직원에게만 제한됩니다.

### 예제: 메시지 보내기

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## 비공개 메시지

기본 경로: `/messaging/privatemessages`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 현재 사용자의 모든 비공개 메시지를 불러옵니다 (대화별 마지막 메시지를 포함하며, 모두 읽음으로 표시합니다) |
| GET | `/existing/:personId` | JWT | — | 특정 사람과의 기존 비공개 대화를 찾습니다 |
| GET | `/:id` | JWT | — | ID로 비공개 메시지를 불러옵니다 (현재 사용자에게 보낸 메시지라면 알림을 지웁니다) |
| POST | `/` | JWT | — | 비공개 메시지를 보냅니다 (일괄 처리). 수신자에게 푸시 알림을 보냅니다 |

## 알림

기본 경로: `/messaging/notifications`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/unreadCount` | JWT | — | 현재 사용자의 읽지 않은 알림 수를 가져옵니다 |
| GET | `/my` | JWT | — | 현재 사용자의 모든 알림을 불러옵니다 (모두 읽음으로 표시합니다) |
| GET | `/tmpEmail` | 공개 | — | 일일 이메일 알림 요약을 실행합니다 (디버그/cron 엔드포인트) |
| GET | `/:churchId/person/:personId` | JWT | — | 특정 사람의 알림을 불러옵니다 |
| GET | `/:churchId/:id` | JWT | — | ID로 알림을 불러옵니다 |
| POST | `/` | JWT | — | 알림을 생성하거나 업데이트합니다 (일괄 처리) |
| POST | `/create` | JWT | — | 여러 사람에게 알림을 생성합니다. 본문: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | 특정 사람의 모든 알림을 읽음으로 표시합니다 |
| POST | `/sendTest` | JWT | — | 테스트 푸시 알림을 보냅니다. 본문: `{ personId, title }` |
| POST | `/ping` | 공개 | — | 외부 트리거에서 알림을 생성합니다. 본문: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | 알림을 삭제합니다 |

### 예제: 알림 생성하기

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## 알림 설정

기본 경로: `/messaging/notificationpreferences`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/categories` | JWT | — | 알림 카테고리와 기본 채널 및 허용 채널을 나열합니다 |
| GET | `/my` | JWT | — | 현재 사용자의 알림 설정을 불러옵니다 (없으면 기본값을 자동으로 생성합니다) |
| POST | `/` | JWT | — | 현재 사용자의 설정을 저장합니다. 본문: `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay` 중 원하는 항목과 선택적 `overrides: [{ categoryKey, channel, optedIn }]`(channel은 `push`, `email`, `in_app`, `sms` 중 하나이며, 잠긴 카테고리는 무시됩니다). `allowSms`는 구성원이 문자 알림에 동의하는 설정입니다. 이전 방식의 행 배열 본문도 여전히 허용됩니다 |

## 연결

기본 경로: `/messaging/connections`

채팅, 그룹 대화, 비공개 메시지, 라이브 스트리밍을 위한 WebSocket/실시간 연결을 관리합니다. 전체 프로토콜은 [실시간 아키텍처](../../realtime)를 참조하세요.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:churchId/:conversationId` | 공개 | — | 대화의 모든 연결을 불러옵니다 |
| POST | `/` | 공개 | — | 연결을 등록합니다 (일괄 처리). 대화에 참석자 브로드캐스트를 트리거합니다. 본문 항목: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | 공개 | — | 소켓 ID로 연결의 표시 이름을 업데이트합니다. 본문: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | 공개 | — | 대화에서 연결을 끊습니다. 참석자 브로드캐스트를 트리거합니다 |
| POST | `/tmpSendAlert` | 공개 | — | 사람의 연결에 알림 경고를 보냅니다. 본문: `{ churchId, personId }` |

## 기기

기본 경로: `/messaging/devices`

푸시 알림과 콘텐츠 페어링을 위한 기기 등록을 관리합니다(예: TV 디스플레이의 Lessons 앱).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/enroll` | JWT | — | 기기를 등록하거나 업데이트합니다 (모바일 푸시 등록). FCM 토큰 또는 기기 ID로 일치시킵니다 |
| POST | `/enrollAnon` | 공개 | — | 익명 기기를 등록하고 4자리 페어링 코드를 생성합니다 |
| POST | `/` | 공개 | — | 기기를 저장합니다 (일괄 처리) |
| GET | `/pair/:pairingCode` | JWT | — | 페어링 코드로 기기를 페어링합니다. 콘텐츠를 할당하려면 선택적으로 `?contentType=&contentId=`를 사용합니다 |
| GET | `/status/:deviceId` | 공개 | — | 기기의 페어링 상태를 확인합니다 |
| GET | `/:churchId` | JWT | — | 교회의 모든 기기를 불러옵니다 |
| GET | `/:churchId/person/:personId` | JWT | — | 특정 사람의 모든 기기를 불러옵니다 |
| GET | `/:churchId/:id` | JWT | — | ID로 기기를 불러옵니다 |
| DELETE | `/:churchId/:id` | JWT | — | 기기를 삭제합니다 |

### 예제: 기기 등록하기

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## 기기 콘텐츠

기본 경로: `/messaging/devicecontents`

페어링된 기기의 콘텐츠 할당을 관리합니다(예: TV에 표시되는 레슨).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/deviceId/:deviceId` | JWT | — | 기기의 콘텐츠 할당을 불러옵니다 |
| POST | `/` | JWT | — | 기기 콘텐츠 할당을 저장합니다 (일괄 처리) |
| DELETE | `/:id` | JWT | — | 기기 콘텐츠 할당을 삭제합니다 |

## 문자 메시지

기본 경로: `/messaging/texting`

SMS 문자 제공업체, 그룹 문자 메시지 발송, 전달 추적을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/providers` | JWT | — | 교회의 문자 제공업체를 불러옵니다 (자격 증명은 마스킹됩니다) |
| GET | `/status` | JWT | — | `{ enabled }`: 교회에 활성화된 문자 제공업체가 있는지 여부입니다. 로그인한 모든 교회 사용자가 호출할 수 있으며, 문자를 보낼 수 있을 때만 **문자** 옵션을 표시하는 데 사용됩니다 |
| GET | `/inboundUrl` | JWT | `texting.send` 또는 `settings.edit` | `{ url }`: 제공업체에 붙여넣을 교회의 수신(STOP) 웹훅 URL입니다 |
| POST | `/inbound/:churchId/:token` | 공개 | — | 제공업체의 수신 메시지 웹훅입니다. `token`은 교회 ID의 HMAC입니다. 답장이 정확히 중지 단어(`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`)이면 일치하는 모든 사람을 `optedOut`으로 표시하고 `allowSms`를 끕니다. `{ optedOut: <count> }`를 반환하며, 그 외 답장은 `{ optedOut: 0 }`을 반환합니다 |
| GET | `/preview/:groupId` | JWT | — | 그룹 문자의 수신자를 미리 봅니다 (대상, 수신 거부, 전화번호 없음 수) |
| GET | `/sent` | JWT | — | 교회에서 보낸 모든 문자 기록을 불러옵니다 |
| GET | `/sent/:id/details` | JWT | — | 수신자별 전달 로그와 함께 보낸 문자를 불러옵니다 |
| POST | `/providers` | JWT | — | 문자 제공업체를 저장합니다 (일괄 처리). API 자격 증명을 암호화합니다 |
| POST | `/send` | JWT | — | 그룹의 모든 대상 구성원에게 SMS를 보냅니다. 본문: `{ groupId, message }`. 병합 필드(`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`)는 수신자별로 해석됩니다 |
| POST | `/sendPerson` | JWT | — | 한 사람에게 SMS를 보냅니다. 본문: `{ personId, phoneNumber, message }`. 병합 필드가 해석되며, 해석된 텍스트가 기록됩니다 |
| DELETE | `/providers/:id` | JWT | — | 문자 제공업체를 삭제합니다 |

### 예제: 그룹에 문자 보내기

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## 이메일 템플릿

기본 경로: `/messaging/emailTemplates`

재사용 가능한 이메일 템플릿을 관리하고, 그룹에 템플릿 이메일을 보냅니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 교회의 모든 이메일 템플릿을 불러옵니다 |
| GET | `/:id` | JWT | — | ID로 이메일 템플릿 하나를 불러옵니다 |
| GET | `/preview/:groupId` | JWT | — | 그룹의 이메일 전달을 미리 봅니다 (수신 대상 수, 이메일이 없는 구성원) |
| POST | `/` | JWT | — | 이메일 템플릿을 생성하거나 업데이트합니다 (일괄 처리) |
| POST | `/send` | JWT | — | 그룹의 모든 구성원에게 템플릿 이메일을 보냅니다. 본문: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | 이메일 템플릿을 삭제합니다 |

### 예제: 그룹에 이메일 보내기

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**지원되는 병합 필드:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## 차단된 IP

기본 경로: `/messaging/blockedips`

(레거시) 라이브 스트리밍 채팅용 IP 차단입니다. B1App 클라이언트는 더 이상 `POST /`를 호출하지 않습니다. IP 차단은 통합 전달 마이그레이션에서 제거되었습니다. `/clear` 경로는 스트리밍 서비스를 저장할 때 `StreamingServiceController`가 서버 간 호출로 여전히 사용합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/` | JWT | — | (레거시) 차단된 IP를 저장합니다 (일괄 처리). 활성 클라이언트가 없습니다 |
| POST | `/clear` | JWT | — | 특정 서비스의 모든 차단된 IP를 지웁니다. 본문: `[{ serviceId, churchId }]` |

## 전달 로그

기본 경로: `/messaging/deliverylogs`

보낸 메시지(SMS, 푸시 알림, 이메일)의 전달 상태를 추적합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/content/:contentType/:contentId` | JWT | — | 콘텐츠 유형과 ID로 전달 로그를 불러옵니다 |
| GET | `/person/:personId` | JWT | — | 특정 사람의 전달 로그를 불러옵니다. 선택적으로 `?startDate=&endDate=`로 필터링합니다 |
| GET | `/recent` | JWT | — | 교회의 최근 전달 로그를 불러옵니다. 선택적으로 `?limit=`(기본값 100)를 사용합니다 |
| GET | `/:id` | JWT | — | ID로 전달 로그를 불러옵니다 |

## 관련 페이지

- [실시간 아키텍처](../../realtime) -- WebSocket 프로토콜, 룸 구독, 통합 전달 프레임워크
- [웹 푸시 알림](../../web-push) -- 브라우저 푸시 등록 및 전달
- [멤버십 엔드포인트](./membership) -- 사람, 그룹, 역할 및 핵심 정체성
- [출석 엔드포인트](./attendance) -- 서비스 및 방문 추적
- [인증 및 권한](./authentication) -- 로그인 흐름, JWT, OAuth, 권한 모델
- [모듈 구조](../module-structure) -- 코드 구성 패턴
