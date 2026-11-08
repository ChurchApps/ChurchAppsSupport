---
title: "메시징 엔드포인트"
description: "ChurchApps 메시징 API 엔드포인트 참조: 대화, 노트 접근 규칙, 문자 메시지, 이메일 템플릿, 알림, 기기."
---

# 메시징 엔드포인트

<div class="article-intro">

메시징 모듈은 실시간 대화, 채팅 메시지, 푸시 알림, SMS/이메일 전송, WebSocket 연결, 비공개 메시지, 기기 등록, 문자 메시지 제공업체를 관리합니다. 라이브 스트리밍 채팅과 비동기 알림 모두에 사용되며, 모든 ChurchApps 애플리케이션에서 공통 소통 계층으로 활용됩니다.

</div>

**기본 경로:** `/messaging`

## 대화

기본 경로: `/messaging/conversations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/timeline/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 대화를 불러오며, 첫 메시지와 마지막 메시지를 포함 |
| GET | `/messages/:contentType/:contentId` | JWT | — | 콘텐츠에 대한 대화를 페이지 단위 메시지와 함께 불러오기 (`?page=&limit=`) |
| GET | `/posts` | JWT | — | 현재 사용자의 그룹에 속한 게시물 유형 대화 가져오기 |
| GET | `/posts/group/:groupId` | JWT | — | 특정 그룹의 게시물 유형 대화 가져오기 |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | B1 Admin 노트 페이지에서 모든 레코드의 최신 노트 가져오기. `section`은 `people`, `groups`, `events`, `workflows` 중 하나여야 하며(그 외에는 400), `limit` 기본값은 25(최대 100), `before`는 이전 페이지의 커서입니다. 각 노트는 해당 유형의 규칙(People 편집 / 비공개 노트 권한, 그룹 리더, 이벤트 열람자, 워크플로 카드 열람자)을 그대로 통과해야 하므로, 호출자는 열 수 있는 노트만 볼 수 있습니다. 노트 본문은 300자로 잘립니다 |
| GET | `/current/:churchId/:contentType/:contentId` | 공개 | — | 콘텐츠의 현재 대화를 가져오거나 생성 (contentId 자동 복호화) |
| GET | `/:churchId/:contentType/:contentId` | 공개 | — | 콘텐츠 유형과 ID로 대화 불러오기 |
| GET | `/:churchId/:id` | 공개 | — | ID로 단일 대화 불러오기 |
| POST | `/` | JWT | — | 대화 생성 또는 업데이트 (일괄) |
| POST | `/start` | JWT | — | 초기 댓글 메시지와 함께 새 대화 시작 |
| DELETE | `/:churchId/:id` | JWT | — | 대화 삭제 |

### 개인 노트 접근 제어

`contentType: "person"`(개인 기록의 노트 탭) 또는 `contentType: "personConfidential"`(비공개 노트 섹션)인 대화는 모든 읽기 및 쓰기 경로에서 접근이 제한되며, 여기에는 위의 공개 경로도 포함됩니다. 이러한 콘텐츠 유형에 대해 공개 경로는 `401`을 반환합니다. `person`에는 MembershipApi의 **People / Edit** 권한이 필요하고, `personConfidential`에는 **People / View Confidential Notes** 권한이 필요합니다. 범위가 지정된 API 키의 경우 `people:write`가 두 작업을 모두 포함하지만, 키의 사용자는 여전히 해당 역할 권한을 보유하고 있어야 합니다.

### 그룹 및 이벤트 노트 접근 제어 {#group-and-event-notes-access-control}

다음 두 가지 노트 콘텐츠 유형도 동일한 방식으로 모든 읽기 및 쓰기 경로(위의 공개 경로 포함)에서 접근이 제한되며, 익명 게시는 절대 허용되지 않습니다.

- **`groupNote`** (`contentId` = 그룹 ID) -- 그룹의 **리더 노트** 피드. 해당 그룹의 리더(JWT의 `leaderGroupIds`)만 읽거나 게시할 수 있습니다. `content.edit`과 그룹 멤버십 권한을 포함하여 어떤 스태프 권한도 접근을 허용하지 않습니다.
- **`eventNote`** (`contentId` = 이벤트 ID) -- 캘린더 이벤트의 노트. `content.edit` 또는 **Calendars / Admin** 권한을 가진 스태프는 언제나 읽고 게시할 수 있습니다. 그 외의 경우 접근은 이벤트의 `notesViewRole`(읽기)과 `notesPostRole`(게시) 설정을 따릅니다. `staff`(기본값, 필드가 `null`일 때 사용)는 다른 누구에게도 허용하지 않으며, `leaders`는 이벤트 그룹의 리더에게 허용하고, `members`는 이벤트 그룹의 멤버와 리더에게 허용합니다. `groupId`가 없는 이벤트는 스태프만 접근할 수 있습니다.

### 워크플로 카드 노트 접근 제어

`contentType: "workflowCard"`인 대화(`contentId`가 카드의 작업 ID인 워크플로 카드 노트)는 해당 카드를 열 수 있는 사용자만 읽고 쓸 수 있습니다. 즉, DoingApi의 **Tasks / View** 권한을 가진 사용자, 또는 카드가 할당되었거나, 카드를 만들었거나, 카드의 대상이 되는 사람이나 그룹이어야 합니다. 그 외의 사용자는 위의 공개 경로를 포함한 모든 읽기 경로에서 `401`을 받습니다. 카드의 대화는 카드 자체를 통해 `POST /doing/tasks/:id/conversation`(본문 `{ "conversationId": "..." }`, 처음 연결된 대화가 우선)으로 연결되며, 이는 카드 편집자와 담당자가 호출할 수 있습니다.

### 예시: 대화 시작

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
| GET | `/conversation/:conversationId` | JWT | — | 대화의 모든 메시지 불러오기 |
| GET | `/catchup/:churchId/:conversationId` | 공개 | — | 대화의 모든 메시지 불러오기 (라이브 채팅용 공개 catchup) |
| GET | `/:churchId/:id` | 공개 | — | ID로 단일 메시지 불러오기 |
| POST | `/` | JWT | — | 메시지 저장 (일괄). 실시간 업데이트를 보내고 알림을 발생시킴. 기존 메시지를 업데이트하려면 작성자이거나 `content.edit` 권한을 보유해야 하며, 저장된 작성자는 변경할 수 없음 |
| POST | `/send` | 공개 | — | 메시지 전송 (일괄, 공개). WebSocket을 통해 실시간 업데이트를 보내고 알림을 발생시킴 |
| POST | `/setCallout` | JWT | — | (레거시) 콜아웃 메시지를 실시간으로 방송. 활성 클라이언트 없음. 라이브 스트림 채팅은 더 이상 콜아웃을 렌더링하지 않음 |
| DELETE | `/:churchId/:id` | JWT | — | 메시지를 삭제하고 삭제 사실을 실시간으로 방송. [메시지 관리](#message-moderation) 참조 |

### 메시지 관리

다음 대상은 메시지를 삭제할 수 있습니다.

- 메시지 작성자;
- (교회 전체에서) `content.edit` 권한을 가진 스태프;
- **그룹 리더**: `contentType`이 `group` 또는 `groupAnnouncement`인 대화 중 `contentId`가 본인이 이끄는 그룹인 경우(JWT의 `leaderGroupIds`).

개인 노트 대화(`person` / `personConfidential`)는 리더가 관리하지 않으며, 대신 노트 권한(`people.edit`, `people.viewConfidentialNotes`)을 사용합니다.

리더는 편집이 아니라 삭제만 할 수 있습니다. 다른 구성원의 메시지를 고쳐 쓰는 것은 여전히 작성자와 `content.edit` 스태프에게만 허용됩니다.

### 예시: 메시지 전송

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
| GET | `/` | JWT | — | 현재 사용자의 모든 비공개 메시지 불러오기 (대화별 마지막 메시지 포함, 모두 읽음으로 표시) |
| GET | `/existing/:personId` | JWT | — | 특정 사람과의 기존 비공개 대화 찾기 |
| GET | `/:id` | JWT | — | ID로 비공개 메시지 불러오기 (현재 사용자에게 온 메시지라면 알림 삭제) |
| POST | `/` | JWT | — | 비공개 메시지 전송 (일괄). 수신자에게 푸시 알림 발생 |

## 알림

기본 경로: `/messaging/notifications`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/unreadCount` | JWT | — | 현재 사용자의 읽지 않은 알림 수 가져오기 |
| GET | `/my` | JWT | — | 현재 사용자의 모든 알림 불러오기 (모두 읽음으로 표시) |
| GET | `/tmpEmail` | 공개 | — | 일일 이메일 알림 요약 발송 트리거 (디버그/크론 엔드포인트) |
| GET | `/:churchId/person/:personId` | JWT | — | 특정 사람의 알림 불러오기 |
| GET | `/:churchId/:id` | JWT | — | ID로 알림 불러오기 |
| POST | `/` | JWT | — | 알림 생성 또는 업데이트 (일괄) |
| POST | `/create` | JWT | — | 여러 사람에게 알림 생성. 본문: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | 특정 사람의 모든 알림을 읽음으로 표시 |
| POST | `/sendTest` | JWT | — | 테스트 푸시 알림 전송. 본문: `{ personId, title }` |
| POST | `/ping` | 공개 | — | 외부 트리거로 알림 생성. 본문: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | 알림 삭제 |

### 예시: 알림 생성

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
| GET | `/categories` | JWT | — | 알림 카테고리와 각 카테고리의 기본 채널 및 허용 채널 목록 |
| GET | `/my` | JWT | — | 현재 사용자의 알림 설정 불러오기 (설정이 없으면 기본값을 자동 생성) |
| POST | `/` | JWT | — | 현재 사용자의 설정 저장. 본문: `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay` 중 원하는 항목, 그리고 선택 사항인 `overrides: [{ categoryKey, channel, optedIn }]`(channel은 `push`, `email`, `in_app`, `sms` 중 하나; 잠긴 카테고리는 무시됨). `allowSms`는 구성원이 문자 알림에 동의했는지를 나타냄. 행 배열 형식의 레거시 본문도 여전히 허용됨 |

## 연결

기본 경로: `/messaging/connections`

채팅, 그룹 대화, 비공개 메시지, 라이브 스트리밍을 위한 WebSocket/실시간 연결을 관리합니다. 전체 프로토콜은 [실시간 아키텍처](../../realtime.md)를 참조하세요.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:churchId/:conversationId` | 공개 | — | 대화의 모든 연결 불러오기 |
| POST | `/` | 공개 | — | 연결 등록 (일괄). 해당 대화에 참석 방송을 발생시킴. 본문 항목: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | 공개 | — | 소켓 ID로 연결의 표시 이름 업데이트. 본문: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | 공개 | — | 대화에서 연결 제거. 참석 방송을 발생시킴 |
| POST | `/tmpSendAlert` | 공개 | — | 특정 사람의 연결에 알림 경고 보내기. 본문: `{ churchId, personId }` |

## 기기

기본 경로: `/messaging/devices`

푸시 알림과 콘텐츠 페어링(예: TV 디스플레이의 Lessons 앱)을 위한 기기 등록을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/enroll` | JWT | — | 기기 등록 또는 업데이트(모바일 푸시 등록). FCM 토큰 또는 기기 ID로 일치 여부 확인 |
| POST | `/enrollAnon` | 공개 | — | 익명 기기를 등록하고 4자리 페어링 코드 생성 |
| POST | `/` | 공개 | — | 기기 저장 (일괄) |
| GET | `/pair/:pairingCode` | JWT | — | 페어링 코드로 기기 페어링. 콘텐츠를 할당하려면 선택 사항인 `?contentType=&contentId=` 사용 |
| GET | `/status/:deviceId` | 공개 | — | 기기의 페어링 상태 확인 |
| GET | `/:churchId` | JWT | — | 교회의 모든 기기 불러오기 |
| GET | `/:churchId/person/:personId` | JWT | — | 특정 사람의 모든 기기 불러오기 |
| GET | `/:churchId/:id` | JWT | — | ID로 기기 불러오기 |
| DELETE | `/:churchId/:id` | JWT | — | 기기 삭제 |

### 예시: 기기 등록

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
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
| GET | `/deviceId/:deviceId` | JWT | — | 기기의 콘텐츠 할당 불러오기 |
| POST | `/` | JWT | — | 기기 콘텐츠 할당 저장 (일괄) |
| DELETE | `/:id` | JWT | — | 기기 콘텐츠 할당 삭제 |

## 문자 메시지

기본 경로: `/messaging/texting`

SMS 문자 메시지 제공업체, 그룹 문자 메시지 발송, 전달 추적을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/providers` | JWT | — | 교회의 문자 메시지 제공업체 불러오기 (자격 증명은 마스킹됨) |
| GET | `/status` | JWT | — | `{ enabled }` -- 교회에 활성화된 문자 메시지 제공업체가 있는지 여부. 로그인한 교회 사용자 누구나 사용 가능하며, 문자를 보낼 수 있을 때만 **Text** 옵션을 표시하는 데 사용 |
| GET | `/inboundUrl` | JWT | `texting.send` 또는 `settings.edit` | `{ url }` -- 제공업체에 붙여넣을 교회의 수신(STOP) 웹훅 URL |
| POST | `/inbound/:churchId/:token` | 공개 | — | 제공업체의 수신 메시지 웹훅. `token`은 교회 ID의 HMAC입니다. 정확히 중지 단어(`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`)와 일치하는 답장은 일치하는 모든 사람을 `optedOut` 처리하고 `allowSms`를 끕니다. `{ optedOut: <count> }`를 반환하며, 다른 답장은 `{ optedOut: 0 }`을 반환합니다 |
| GET | `/preview/:groupId` | JWT | — | 그룹 문자 발송 대상 미리보기(수신 가능, 수신 거부, 전화번호 없음 수) |
| GET | `/sent` | JWT | — | 교회의 모든 발송 문자 기록 불러오기 |
| GET | `/sent/:id/details` | JWT | — | 수신자별 전달 로그가 포함된 발송 문자 불러오기 |
| POST | `/providers` | JWT | — | 문자 메시지 제공업체 저장 (일괄). API 자격 증명을 암호화 |
| POST | `/send` | JWT | — | 그룹의 수신 가능한 모든 구성원에게 SMS 전송. 본문: `{ groupId, message }`. 병합 필드(`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`)는 수신자별로 해석됨 |
| POST | `/sendPerson` | JWT | — | 한 사람에게 SMS 전송. 본문: `{ personId, phoneNumber, message }`. 병합 필드가 해석되며, 해석된 텍스트가 기록됨 |
| DELETE | `/providers/:id` | JWT | — | 문자 메시지 제공업체 삭제 |

### 예시: 그룹 문자 발송

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
| GET | `/` | JWT | — | 교회의 모든 이메일 템플릿 불러오기 |
| GET | `/:id` | JWT | — | ID로 단일 이메일 템플릿 불러오기 |
| GET | `/sendStatus` | JWT | `groupMembers.edit` 또는 `tasks.admin` | 교회의 그룹 이메일 상태: `{ approved, paused, remaining, requested }`. B1Admin의 Send Email 대화 상자와 워크플로의 **Send email** 동작이 이를 사용하여 이메일이 발송되지 않을 때 경고를 표시함 |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | 교회가 그룹 이메일을 사용할 수 있도록 지원팀에 승인 요청(교회당 주 1회 이하) |
| GET | `/preview/:groupId` | JWT | — | 그룹의 이메일 발송 미리보기(수신 가능한 수신자 수, 이메일이 없는 구성원) |
| POST | `/` | JWT | — | 이메일 템플릿 생성 또는 업데이트 (일괄) |
| POST | `/send` | JWT | — | 그룹의 모든 구성원에게 템플릿 이메일 전송. 본문: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | 이메일 템플릿 삭제 |

### 예시: 그룹에 이메일 보내기

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

(레거시) 라이브 스트리밍 채팅용 IP 차단. B1App 클라이언트는 더 이상 `POST /`를 호출하지 않습니다. IP 차단은 통합 전달 마이그레이션에서 제거되었습니다. `/clear` 경로는 스트리밍 서비스가 저장될 때 `StreamingServiceController`가 서버 간 통신으로 여전히 호출합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/` | JWT | — | (레거시) 차단된 IP 저장 (일괄). 활성 클라이언트 없음 |
| POST | `/clear` | JWT | — | 특정 서비스의 차단된 IP 모두 지우기. 본문: `[{ serviceId, churchId }]` |

## 전달 로그

기본 경로: `/messaging/deliverylogs`

발송된 메시지(SMS, 푸시 알림, 이메일)의 전달 상태를 추적합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/content/:contentType/:contentId` | JWT | — | 콘텐츠 유형과 ID로 전달 로그 불러오기 |
| GET | `/person/:personId` | JWT | — | 특정 사람의 전달 로그 불러오기. 선택 사항인 `?startDate=&endDate=`로 필터링 |
| GET | `/recent` | JWT | — | 교회의 최근 전달 로그 불러오기. 선택 사항인 `?limit=`(기본값 100) |
| GET | `/:id` | JWT | — | ID로 전달 로그 불러오기 |

## 관련 페이지

- [실시간 아키텍처](../../realtime.md) -- WebSocket 프로토콜, 룸 구독, 통합 전달 프레임워크
- [웹 푸시 알림](../../web-push.md) -- 브라우저 푸시 등록 및 전달
- [멤버십 엔드포인트](./membership.md) -- 사람, 그룹, 역할, 핵심 정체성
- [출석 엔드포인트](./attendance.md) -- 서비스 및 방문 추적
- [인증 및 권한](./authentication.md) -- 로그인 흐름, JWT, OAuth, 권한 모델
- [모듈 구조](../module-structure.md) -- 코드 구성 패턴
