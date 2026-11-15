---
title: "메시징 엔드포인트"
description: "ChurchApps 메시징 API 엔드포인트 참조: 대화, 메모 접근 규칙, 문자, 이메일 템플릿, 알림, 기기."
---

# 메시징 엔드포인트

<div class="article-intro">

메시징 모듈은 실시간 대화, 채팅 메시지, 푸시 알림, SMS/이메일 전달, WebSocket 연결, 개인 메시지, 기기 등록, 문자 제공업체를 관리합니다. 라이브 스트리밍 채팅과 비동기 알림 모두에 대해 모든 ChurchApps 애플리케이션이 사용하는 통신 계층을 제공합니다.

</div>

**기본 경로:** `/messaging`

## 대화 {#conversations}

기본 경로: `/messaging/conversations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | 쉼표로 구분한 ID로 대화를 조회하며, 첫 메시지와 마지막 메시지를 포함합니다. |
| GET | `/messages/:contentType/:contentId` | JWT | — | 콘텐츠의 대화를 페이지 단위 메시지와 함께 조회합니다(`?page=&limit=`). |
| GET | `/posts` | JWT | — | 현재 사용자의 그룹에 있는 게시물 유형 대화를 조회합니다. |
| GET | `/posts/group/:groupId` | JWT | — | 특정 그룹의 게시물 유형 대화를 조회합니다. |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | B1 Admin 메모 페이지를 위해 모든 레코드의 최신 메모를 조회합니다. `section`은 `people`, `groups`, `events`, `workflows` 중 하나이며(그 외에는 400), `limit` 기본값은 25(최대 100), `before`는 이전 페이지의 커서입니다. 각 메모는 자체 유형의 규칙(사람 편집 / 기밀 메모 권한, 그룹 리더, 행사 조회자, 워크플로 카드 조회자)을 여전히 통과해야 하므로, 호출자는 열 수 있는 메모만 봅니다. 메모 텍스트는 300자로 잘립니다. |
| GET | `/current/:churchId/:contentType/:contentId` | 공개 | — | 콘텐츠의 현재 대화를 가져오거나 만듭니다(contentId를 자동 복호화). |
| GET | `/:churchId/:contentType/:contentId` | 공개 | — | 콘텐츠 유형과 ID로 대화를 조회합니다. |
| GET | `/:churchId/:id` | 공개 | — | ID로 단일 대화를 조회합니다. |
| POST | `/` | JWT | — | 대화를 생성하거나 업데이트합니다(일괄). |
| POST | `/start` | JWT | — | 초기 댓글 메시지와 함께 새 대화를 시작합니다. |
| DELETE | `/:churchId/:id` | JWT | — | 대화를 삭제합니다. |

### 사람 메모 접근 제어 {#person-notes-access-control}

`contentType: "person"`(사람 기록의 메모 탭) 또는 `contentType: "personConfidential"`(기밀 메모 섹션) 대화는 모든 읽기와 쓰기 경로에서 제한됩니다. 위의 공개 경로도 예외가 아니며, 이 콘텐츠 유형에 대해서는 `401`을 반환합니다. `person`은 MembershipApi의 **사람 / 편집** 권한이 필요하고, `personConfidential`은 **사람 / 기밀 메모 보기** 권한이 필요합니다. 범위가 지정된 API 키의 경우 `people:write`가 두 작업을 모두 포함하지만, 키의 사용자는 여전히 기반 역할 권한을 가지고 있어야 합니다.

### 그룹 및 행사 메모 접근 제어 {#group-and-event-notes-access-control}

메모 콘텐츠 유형 두 가지도 같은 방식으로 제한되며, 모든 읽기와 쓰기 경로(위의 공개 경로 포함)에 적용됩니다. 익명 게시는 절대 허용되지 않습니다.

- **`groupNote`**(`contentId` = 그룹 ID) -- 그룹의 **리더 메모** 피드입니다. 그 그룹의 리더(JWT의 `leaderGroupIds`)만 읽거나 게시할 수 있습니다. `content.edit`와 그룹 구성원 권한을 포함한 어떤 직원 권한도 접근을 허용하지 않습니다.
- **`eventNote`**(`contentId` = 행사 ID) -- 달력 행사의 메모입니다. `content.edit` 또는 **달력 / 관리자** 권한이 있는 직원은 항상 읽고 게시할 수 있습니다. 그 밖의 경우 접근은 행사의 `notesViewRole`(읽기)과 `notesPostRole`(게시)을 따릅니다. `staff`(기본값이며 필드가 `null`일 때 사용)는 다른 사람을 허용하지 않고, `leaders`는 행사 그룹의 리더를, `members`는 행사 그룹의 구성원과 리더를 허용합니다. `groupId`가 없는 행사는 직원만 접근할 수 있습니다.

### 워크플로 카드 메모 접근 제어 {#workflow-card-notes-access-control}

`contentType: "workflowCard"`인 대화(카드의 메모이며, `contentId`는 카드의 할 일 ID입니다)는 그 카드를 열 수 있는 사람만 읽고 쓸 수 있습니다. 즉 DoingApi의 **할 일 / 보기** 권한이 있는 사용자, 또는 카드가 배정되었거나 생성했거나 카드가 대상으로 하는 사람이나 그룹입니다. 그 밖의 모든 사람은 위의 공개 경로를 포함한 모든 읽기 경로에서 `401`을 받습니다. 카드의 대화는 `POST /doing/tasks/:id/conversation`(본문 `{ "conversationId": "..." }`, 처음 연결된 대화가 우선)을 통해 카드 자체에 연결되며, 이는 카드 편집자와 담당자가 호출할 수 있습니다.

### 예시: 대화 시작하기 {#example-start-a-conversation}

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

## 메시지 {#messages}

기본 경로: `/messaging/messages`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | 대화의 모든 메시지를 조회합니다. |
| GET | `/catchup/:churchId/:conversationId` | 공개 | — | 대화의 모든 메시지를 조회합니다(라이브 채팅용 공개 catchup). |
| GET | `/:churchId/:id` | 공개 | — | ID로 단일 메시지를 조회합니다. |
| POST | `/` | JWT | — | 메시지를 저장합니다(일괄). 실시간 업데이트를 보내고 알림을 트리거합니다. 기존 메시지를 업데이트하려면 작성자이거나 `content.edit` 권한이 있어야 하며, 저장된 작성자는 다시 지정할 수 없습니다. |
| POST | `/send` | 공개 | — | 메시지를 보냅니다(일괄, 공개). WebSocket으로 실시간 업데이트를 보내고 알림을 트리거합니다. |
| POST | `/setCallout` | JWT | — | (레거시) 실시간으로 강조 메시지를 방송합니다. 활성 클라이언트가 없으며, 라이브 스트림 채팅은 더 이상 강조 메시지를 표시하지 않습니다. |
| DELETE | `/:churchId/:id` | JWT | — | 메시지를 삭제하고 삭제를 실시간으로 방송합니다. [메시지 관리](#message-moderation)를 참고하세요. |

### 메시지 관리 {#message-moderation}

메시지 삭제가 허용되는 대상은 다음과 같습니다.

- 메시지의 작성자
- `content.edit` 권한이 있는 직원(교회 내 어디서든)
- **그룹 리더**: `contentType`이 `group` 또는 `groupAnnouncement`이고 `contentId`가 리더가 이끄는 그룹인 대화에 한정됩니다(JWT의 `leaderGroupIds`).

사람 메모 대화(`person` / `personConfidential`)는 리더가 관리하지 않습니다. 대신 메모 권한(`people.edit`, `people.viewConfidentialNotes`)을 사용합니다.

리더는 삭제만 할 수 있고 편집은 할 수 없습니다. 다른 구성원의 메시지를 다시 쓰는 것은 여전히 작성자와 `content.edit` 직원으로 제한됩니다.

### 예시: 메시지 보내기 {#example-send-a-message}

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

## 개인 메시지 {#private-messages}

기본 경로: `/messaging/privatemessages`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 현재 사용자의 모든 개인 메시지를 조회합니다(대화별 마지막 메시지 포함, 모두 읽음으로 표시). |
| GET | `/existing/:personId` | JWT | — | 특정 사람과의 기존 개인 대화를 찾습니다. |
| GET | `/:id` | JWT | — | ID로 개인 메시지를 조회합니다(현재 사용자에게 보낸 메시지라면 알림을 지웁니다). |
| POST | `/` | JWT | — | 개인 메시지를 보냅니다(일괄). 수신자에게 푸시 알림을 트리거합니다. |

## 알림 {#notifications}

기본 경로: `/messaging/notifications`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | 현재 사용자의 읽지 않은 알림 수를 조회합니다. |
| GET | `/my` | JWT | — | 현재 사용자의 모든 알림을 조회합니다(모두 읽음으로 표시). |
| GET | `/tmpEmail` | 공개 | — | 일일 이메일 알림 요약을 트리거합니다(디버그/크론 엔드포인트). |
| GET | `/:churchId/person/:personId` | JWT | — | 특정 사람의 알림을 조회합니다. |
| GET | `/:churchId/:id` | JWT | — | ID로 알림을 조회합니다. |
| POST | `/` | JWT | — | 알림을 생성하거나 업데이트합니다(일괄). |
| POST | `/create` | JWT | — | 여러 사람에게 알림을 생성합니다. 본문: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | 특정 사람의 모든 알림을 읽음으로 표시합니다. |
| POST | `/sendTest` | JWT | — | 테스트 푸시 알림을 보냅니다. 본문: `{ personId, title }` |
| POST | `/ping` | 공개 | — | 외부 트리거에서 알림을 생성합니다. 본문: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | 알림을 삭제합니다. |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | 푸시가 그룹 구성원 중 몇 명에게 도달할지 셉니다. |
| GET | `/churchPreview` | JWT | `content.edit` | 앱을 가진 모든 사람에게 보내는 푸시가 몇 명에게 도달할지 셉니다. |
| POST | `/group/send` | JWT | `groupMembers.edit` | 지금 그룹 구성원에게 푸시를 보냅니다. |

### 예시: 알림 생성하기 {#example-create-notifications}

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

## 예약된 알림 {#scheduled-notifications}

기본 경로: `/messaging/scheduledNotifications`

미리 예약된 푸시입니다. `audience`는 `church`(앱을 가진 모든 사람, `content.edit` 필요) 또는 `group`(`groupMembers.edit`과 `groupId` 필요)입니다. 제목은 80자, 메시지는 240자로 제한됩니다. 발송 시각이 된 항목은 1분 타이머가 보냅니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` 또는 `content.edit` | 교회의 예약된 알림과 최근 알림을 나열합니다. |
| POST | `/` | JWT | 대상별 | 예약된 알림을 만들거나, `id`가 설정되어 있으면 업데이트합니다. 본문: `{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`. 더 이상 대기 상태가 아닌 알림을 업데이트하면 409를 반환합니다. |
| POST | `/:id/sendNow` | JWT | 대상별 | 대기 중인 알림을 지금 보냅니다. 이미 발송되었거나, 취소되었거나, 발송 중이면 409를 반환합니다. |
| DELETE | `/:id` | JWT | 대상별 | 대기 중인 알림을 취소하거나, 발송, 실패, 취소된 알림을 목록에서 제거합니다. 발송 중이면 409를 반환합니다. |
| DELETE | `/` | JWT | `groupMembers.edit` 또는 `content.edit` | 사용자가 보낼 수 있는 대상에 대해 발송, 실패, 취소된 알림을 모두 제거합니다. `{ deleted }`를 반환합니다. |

## 알림 설정 {#notification-preferences}

기본 경로: `/messaging/notificationpreferences`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | 알림 카테고리를 기본 채널 및 허용 채널과 함께 나열합니다. |
| GET | `/my` | JWT | — | 현재 사용자의 알림 설정을 조회합니다(없으면 기본값을 자동 생성). |
| POST | `/` | JWT | — | 현재 사용자의 설정을 저장합니다. 본문: `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay` 중 아무거나, 그리고 선택 사항인 `overrides: [{ categoryKey, channel, optedIn }]`(channel은 `push`, `email`, `in_app`, `sms` 중 하나일 수 있으며, 잠긴 카테고리는 무시됩니다). `allowSms`는 구성원이 문자 알림에 동의했는지를 나타냅니다. 이전 방식의 행 배열 본문도 여전히 허용됩니다. |

## 연결 {#connections}

기본 경로: `/messaging/connections`

채팅, 그룹 대화, 개인 메시지, 라이브 스트리밍을 위한 WebSocket/실시간 연결을 관리합니다. 엔드투엔드 프로토콜은 [실시간 아키텍처](../../realtime.md)를 참고하세요.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | 공개 | — | 대화의 모든 연결을 조회합니다. |
| POST | `/` | 공개 | — | 연결을 등록합니다(일괄). 대화에 참석 방송을 트리거합니다. 본문 항목: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | 공개 | — | 소켓 ID로 연결의 표시 이름을 업데이트합니다. 본문: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | 공개 | — | 대화에서 연결을 제거합니다. 참석 방송을 트리거합니다. |
| POST | `/tmpSendAlert` | 공개 | — | 사람의 연결들에 알림 경고를 보냅니다. 본문: `{ churchId, personId }` |

## 기기 {#devices}

기본 경로: `/messaging/devices`

푸시 알림과 콘텐츠 연결(예: TV에 표시되는 Lessons 앱)을 위한 기기 등록을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | 기기를 등록하거나 업데이트합니다(모바일 푸시 등록). FCM 토큰이나 기기 ID로 일치시킵니다. |
| POST | `/enrollAnon` | 공개 | — | 익명 기기를 등록하고 4자리 연결 코드를 생성합니다. |
| POST | `/` | 공개 | — | 기기를 저장합니다(일괄). |
| GET | `/pair/:pairingCode` | JWT | — | 연결 코드로 기기를 연결합니다. 콘텐츠를 할당하려면 선택적으로 `?contentType=&contentId=`를 사용합니다. |
| GET | `/status/:deviceId` | 공개 | — | 기기의 연결 상태를 확인합니다. |
| GET | `/:churchId` | JWT | — | 교회의 모든 기기를 조회합니다. |
| GET | `/:churchId/person/:personId` | JWT | — | 사람의 모든 기기를 조회합니다. |
| GET | `/:churchId/:id` | JWT | — | ID로 기기를 조회합니다. |
| DELETE | `/:churchId/:id` | JWT | — | 기기를 삭제합니다. |

### 예시: 기기 등록하기 {#example-enroll-a-device}

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

## 기기 콘텐츠 {#device-contents}

기본 경로: `/messaging/devicecontents`

연결된 기기의 콘텐츠 할당을 관리합니다(예: TV에 어떤 수업이 표시되는지).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | 기기의 콘텐츠 할당을 조회합니다. |
| POST | `/` | JWT | — | 기기 콘텐츠 할당을 저장합니다(일괄). |
| DELETE | `/:id` | JWT | — | 기기 콘텐츠 할당을 삭제합니다. |

## 문자 {#texting}

기본 경로: `/messaging/texting`

SMS 문자 제공업체, 그룹 문자 메시지, 전달 추적을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | 교회의 문자 제공업체를 조회합니다(자격 증명은 가려집니다). |
| GET | `/status` | JWT | — | `{ enabled }` — 교회에 활성화된 문자 제공업체가 있는지 여부입니다. 로그인한 교회 사용자라면 누구나 호출할 수 있으며, 문자를 보낼 수 있을 때만 **문자** 옵션을 표시하는 데 사용합니다. |
| GET | `/inboundUrl` | JWT | `texting.send` 또는 `settings.edit` | `{ url }` — 제공업체에 붙여넣을 교회의 수신(STOP) 웹훅 URL입니다. |
| POST | `/inbound/:churchId/:token` | 공개 | — | 제공업체의 수신 메시지 웹훅입니다. `token`은 교회 ID의 HMAC입니다. 정확히 중지 단어(`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`)인 답장은 일치하는 모든 사람을 `optedOut`으로 표시하고 `allowSms`를 끕니다. `{ optedOut: <count> }`를 반환하며, 다른 답장은 `{ optedOut: 0 }`을 반환합니다. |
| GET | `/preview/:groupId` | JWT | — | 그룹 문자의 수신자를 미리 봅니다(대상, 수신 거부, 전화번호 없음 수). |
| GET | `/sent` | JWT | — | 교회의 발송된 모든 문자 기록을 조회합니다. |
| GET | `/sent/:id/details` | JWT | — | 수신자별 전달 로그와 함께 발송된 문자를 조회합니다. |
| POST | `/providers` | JWT | — | 문자 제공업체를 저장합니다(일괄). API 자격 증명을 암호화합니다. |
| POST | `/send` | JWT | — | 그룹의 모든 대상 구성원에게 SMS를 보냅니다. 본문: `{ groupId, message }`. 병합 필드(`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`)는 수신자마다 해석됩니다. |
| POST | `/sendPerson` | JWT | — | 한 사람에게 SMS를 보냅니다. 본문: `{ personId, phoneNumber, message }`. 병합 필드가 해석되며, 해석된 텍스트가 기록됩니다. |
| DELETE | `/providers/:id` | JWT | — | 문자 제공업체를 삭제합니다. |

### 예시: 그룹 문자 보내기 {#example-send-group-text}

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

## 이메일 템플릿 {#email-templates}

기본 경로: `/messaging/emailTemplates`

재사용 가능한 이메일 템플릿을 관리하고, 그룹에 템플릿 이메일을 보냅니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 이메일 템플릿을 조회합니다. |
| GET | `/:id` | JWT | — | ID로 단일 이메일 템플릿을 조회합니다. |
| GET | `/sendStatus` | JWT | `groupMembers.edit` 또는 `tasks.admin` | 교회의 그룹 이메일 상태입니다: `{ approved, paused, remaining, requested }`. B1Admin의 이메일 보내기 대화상자와 워크플로의 **이메일 보내기** 동작이 이메일이 발송되지 않을 때 경고하는 데 사용합니다. |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | 지원팀에 교회의 그룹 이메일 승인을 요청합니다(교회당 주 1회 이하). |
| GET | `/preview/:groupId` | JWT | — | 그룹의 이메일 전달을 미리 봅니다(대상 수신자 수, 이메일이 없는 구성원). |
| POST | `/` | JWT | — | 이메일 템플릿을 만들거나 업데이트합니다(일괄). |
| POST | `/send` | JWT | — | 그룹의 모든 구성원에게 템플릿 이메일을 보냅니다. 본문: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | 이메일 템플릿을 삭제합니다. |

### 예시: 그룹에 이메일 보내기 {#example-send-email-to-group}

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

## 차단된 IP {#blocked-ips}

기본 경로: `/messaging/blockedips`

(레거시) 라이브 스트리밍 채팅을 위한 IP 차단입니다. B1App 클라이언트는 더 이상 `POST /`를 호출하지 않습니다. IP 차단은 통합 전달 마이그레이션에서 제거되었습니다. `/clear` 경로는 스트리밍 서비스가 저장될 때 `StreamingServiceController`가 서버 간으로 여전히 호출합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (레거시) 차단된 IP를 저장합니다(일괄). 활성 클라이언트가 없습니다. |
| POST | `/clear` | JWT | — | 특정 서비스의 모든 차단된 IP를 지웁니다. 본문: `[{ serviceId, churchId }]` |

## 전달 로그 {#delivery-logs}

기본 경로: `/messaging/deliverylogs`

발송된 메시지(SMS, 푸시 알림, 이메일)의 전달 상태를 추적합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | 콘텐츠 유형과 ID로 전달 로그를 조회합니다. |
| GET | `/person/:personId` | JWT | — | 사람의 전달 로그를 조회합니다. 선택적으로 `?startDate=&endDate=`로 필터링합니다. |
| GET | `/recent` | JWT | — | 교회의 최근 전달 로그를 조회합니다. 선택적으로 `?limit=`(기본값 100)을 사용합니다. |
| GET | `/:id` | JWT | — | ID로 전달 로그를 조회합니다. |

## 관련 문서 {#related-pages}

- [실시간 아키텍처](../../realtime.md) -- WebSocket 프로토콜, 룸 구독, 통합 전달 프레임워크
- [웹 푸시 알림](../../web-push.md) -- 브라우저 푸시 등록과 전달
- [멤버십 엔드포인트](./membership.md) -- 사람, 그룹, 역할, 핵심 신원
- [출석 엔드포인트](./attendance.md) -- 예배와 방문 추적
- [인증 및 권한](./authentication.md) -- 로그인 흐름, JWT, OAuth, 권한 모델
- [모듈 구조](../module-structure.md) -- 코드 구성 패턴
