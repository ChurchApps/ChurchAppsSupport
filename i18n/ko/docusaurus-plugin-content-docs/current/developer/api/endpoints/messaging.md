---
title: "메시징 엔드포인트"
---

# 메시징 엔드포인트

<div class="article-intro">

메시징 모듈은 실시간 대화, 채팅 메시지, 푸시 알림, SMS/이메일 전달, WebSocket 연결, 개인 메시징, 디바이스 등록, 문자 제공자를 관리합니다. 이는 라이브 스트리밍 채팅과 비동기 알림 모두에 사용되는 모든 ChurchApps 애플리케이션의 통신 계층을 제공합니다.

</div>

**기본 경로:** `/messaging`

## 대화

기본 경로: `/messaging/conversations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 첫/마지막 메시지가 포함된 대화를 로드합니다 |
| GET | `/messages/:contentType/:contentId` | JWT | — | 콘텐츠를 페이지 매김된 메시지로 로드합니다(`?page=&limit=`) |
| GET | `/posts` | JWT | — | 현재 사용자의 그룹을 위한 게시물 유형의 대화를 가져옵니다 |
| GET | `/posts/group/:groupId` | JWT | — | 특정 그룹을 위한 게시물 유형의 대화를 가져옵니다 |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | 콘텐츠의 현재 대화를 가져오거나 만듭니다(contentId 자동 해독) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | 콘텐츠 유형과 ID로 대화를 로드합니다 |
| GET | `/:churchId/:id` | Public | — | ID로 단일 대화를 로드합니다 |
| POST | `/` | JWT | — | 대화를 생성하거나 업데이트합니다(일괄) |
| POST | `/start` | JWT | — | 초기 댓글 메시지로 새 대화를 시작합니다 |
| DELETE | `/:churchId/:id` | JWT | — | 대화를 삭제합니다 |

### 개인 노트 액세스 제어

`contentType: "person"`(개인 기록의 노트 탭) 또는 `contentType: "personConfidential"`(기밀 노트 섹션)의 대화는 모든 읽기 및 쓰기 경로에서 제어됩니다. 이러한 콘텐츠 유형에 대해 그 외의 공개 경로는 `401`을 반환합니다. `person`은 MembershipApi **사람 / 편집** 권한이 필요하고, `personConfidential`은 **사람 / 기밀 노트 보기**가 필요합니다. 범위가 지정된 API 키의 경우 `people:write`는 두 작업을 모두 수행합니다(키의 사용자는 여전히 기본 역할 권한을 보유해야 함).

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
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | 대화의 모든 메시지를 로드합니다 |
| GET | `/catchup/:churchId/:conversationId` | Public | — | 대화의 모든 메시지를 로드합니다(라이브 채팅을 위한 공개 따라잡기) |
| GET | `/:churchId/:id` | Public | — | ID로 단일 메시지를 로드합니다 |
| POST | `/` | JWT | — | 메시지를 저장합니다(일괄). 실시간 업데이트를 보내고 알림을 트리거합니다. 기존 메시지 업데이트는 작성자이거나 `content.edit`을 보유해야 합니다. 저장된 작성자는 재할당할 수 없습니다 |
| POST | `/send` | Public | — | 메시지를 보냅니다(일괄, 공개). WebSocket을 통해 실시간 업데이트를 보내고 알림을 트리거합니다 |
| POST | `/setCallout` | JWT | — | (레거시) 실시간으로 콜아웃 메시지를 브로드캐스트합니다. 활성 클라이언트 없음; 라이브 스트림 채팅은 더 이상 콜아웃을 렌더링하지 않습니다 |
| DELETE | `/:churchId/:id` | JWT | — | 메시지를 삭제하고 실시간으로 삭제를 브로드캐스트합니다. [메시지 중재](#메시지-중재)를 참조하세요 |

### 메시지 중재

메시지 삭제는 다음의 경우에 허용됩니다:

- 메시지의 작성자
- `content.edit`을 가진 직원(교회 어디든)
- **그룹 리더**, `contentType`이 `group` 또는 `groupAnnouncement`이고 `contentId`가 그들이 리드하는 그룹(`leaderGroupIds`는 JWT)인 대화의 경우

개인 노트 대화(`person` / `personConfidential`)는 리더에 의한 중재를 받지 않습니다. 대신 노트 권한(`people.edit`, `people.viewConfidentialNotes`)을 사용합니다.

리더는 삭제만 받고 편집은 받지 않습니다. 다른 회원의 메시지를 다시 작성하는 것은 작성자와 `content.edit` 직원으로만 제한됩니다.

### 예시: 메시지 보내기

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

## 개인 메시지

기본 경로: `/messaging/privatemessages`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 현재 사용자의 모든 개인 메시지를 로드합니다(대화당 마지막 메시지 포함, 모두 읽음으로 표시) |
| GET | `/existing/:personId` | JWT | — | 특정 사람과의 기존 개인 대화를 찾습니다 |
| GET | `/:id` | JWT | — | ID로 개인 메시지를 로드합니다(현재 사용자에게 주소가 지정된 경우 알림을 지웁니다) |
| POST | `/` | JWT | — | 개인 메시지를 보냅니다(일괄). 수신자에게 푸시 알림을 트리거합니다 |

## 알림

기본 경로: `/messaging/notifications`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | 현재 사용자의 읽지 않은 알림 수를 가져옵니다 |
| GET | `/my` | JWT | — | 현재 사용자의 모든 알림을 로드합니다(모두 읽음으로 표시) |
| GET | `/tmpEmail` | Public | — | 일일 이메일 알림 다이제스트 트리거(디버그/크론 엔드포인트) |
| GET | `/:churchId/person/:personId` | JWT | — | 특정 사람의 알림을 로드합니다 |
| GET | `/:churchId/:id` | JWT | — | ID로 알림을 로드합니다 |
| POST | `/` | JWT | — | 알림을 생성하거나 업데이트합니다(일괄) |
| POST | `/create` | JWT | — | 여러 사람을 위한 알림을 만듭니다. 본문: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | 사람에 대한 모든 알림을 읽음으로 표시합니다 |
| POST | `/sendTest` | JWT | — | 테스트 푸시 알림을 보냅니다. 본문: `{ personId, title }` |
| POST | `/ping` | Public | — | 외부 트리거에서 알림을 만듭니다. 본문: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | 알림을 삭제합니다 |

### 예시: 알림 만들기

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

표준 CRUD를 확장합니다. 기본 클래스는 POST `/`(생성 또는 업데이트, 권한 필요 없음)을 제공합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | 알림 설정을 생성하거나 업데이트합니다(CRUD 기본 클래스에서) |
| GET | `/my` | JWT | — | 현재 사용자의 알림 설정을 로드합니다(없으면 자동으로 기본값을 만듭니다) |

## 연결

기본 경로: `/messaging/connections`

채팅, 그룹 대화, 개인 메시지, 라이브 스트리밍을 위한 WebSocket/실시간 연결을 관리합니다. [실시간 아키텍처](../../realtime)를 참조하세요.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | 대화의 모든 연결을 로드합니다 |
| POST | `/` | Public | — | 연결을 등록합니다(일괄). 대화에서 출석 브로드캐스트를 트리거합니다. 본문 항목: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | 소켓 ID로 연결의 표시 이름을 업데이트합니다. 본문: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | 대화에서 연결을 삭제합니다. 출석 브로드캐스트를 트리거합니다 |
| POST | `/tmpSendAlert` | Public | — | 사람의 연결로 알림 경고를 보냅니다. 본문: `{ churchId, personId }` |

## 디바이스

기본 경로: `/messaging/devices`

푸시 알림 및 콘텐츠 페어링(예: TV 디스플레이의 Lessons 앱)을 위한 디바이스 등록을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | 디바이스를 등록하거나 업데이트합니다(모바일 푸시 등록). FCM 토큰 또는 디바이스 ID로 일치시킵니다 |
| POST | `/enrollAnon` | Public | — | 익명 디바이스를 등록하고 4자 페어링 코드를 생성합니다 |
| POST | `/` | Public | — | 디바이스를 저장합니다(일괄) |
| GET | `/pair/:pairingCode` | JWT | — | 페어링 코드를 사용하여 디바이스를 페어링합니다. 콘텐츠를 할당하기 위해 선택적 `?contentType=&contentId=` |
| GET | `/status/:deviceId` | Public | — | 디바이스의 페어링 상태를 확인합니다 |
| GET | `/:churchId` | JWT | — | 교회의 모든 디바이스를 로드합니다 |
| GET | `/:churchId/person/:personId` | JWT | — | 사람의 모든 디바이스를 로드합니다 |
| GET | `/:churchId/:id` | JWT | — | ID로 디바이스를 로드합니다 |
| DELETE | `/:churchId/:id` | JWT | — | 디바이스를 삭제합니다 |

### 예시: 디바이스 등록

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

## 디바이스 콘텐츠

기본 경로: `/messaging/devicecontents`

페어링된 디바이스에 대한 콘텐츠 할당을 관리합니다(예: TV에 표시되는 레슨).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | 디바이스의 콘텐츠 할당을 로드합니다 |
| POST | `/` | JWT | — | 디바이스 콘텐츠 할당을 저장합니다(일괄) |
| DELETE | `/:id` | JWT | — | 디바이스 콘텐츠 할당을 삭제합니다 |

## 문자

기본 경로: `/messaging/texting`

SMS 문자 제공자, 그룹 문자 메시징, 배달 추적을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | 교회의 문자 제공자를 로드합니다(자격 증명은 마스킹됨) |
| GET | `/preview/:groupId` | JWT | — | 그룹 문자의 수신자를 미리 봅니다(적격, 옵트아웃, 전화번호 없음 수) |
| GET | `/sent` | JWT | — | 교회의 모든 전송된 문자 메시지 기록을 로드합니다 |
| GET | `/sent/:id/details` | JWT | — | 수신자별 배달 로그와 함께 전송된 문자를 로드합니다 |
| POST | `/providers` | JWT | — | 문자 제공자를 저장합니다(일괄). API 자격 증명을 암호화합니다 |
| POST | `/send` | JWT | — | 그룹의 모든 적격 회원에게 SMS를 보냅니다. 본문: `{ groupId, message }`. 병합 필드(`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`)는 수신자당 해결됩니다 |
| POST | `/sendPerson` | JWT | — | 단일 사람에게 SMS를 보냅니다. 본문: `{ personId, phoneNumber, message }`. 병합 필드는 해결되고 해결된 텍스트가 기록됩니다 |
| DELETE | `/providers/:id` | JWT | — | 문자 제공자를 삭제합니다 |

### 예시: 그룹 문자 보내기

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

재사용 가능한 이메일 템플릿과 그룹으로 템플릿이 있는 이메일 전송을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 이메일 템플릿을 로드합니다 |
| GET | `/:id` | JWT | — | ID로 단일 이메일 템플릿을 로드합니다 |
| GET | `/preview/:groupId` | JWT | — | 그룹의 이메일 배달을 미리 봅니다(적격 수신자 수, 이메일이 없는 회원) |
| POST | `/` | JWT | — | 이메일 템플릿을 생성하거나 업데이트합니다(일괄) |
| POST | `/send` | JWT | — | 그룹의 모든 회원에게 템플릿이 있는 이메일을 보냅니다. 본문: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | 이메일 템플릿을 삭제합니다 |

### 예시: 그룹으로 이메일 보내기

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

(레거시) 라이브 스트리밍 채팅을 위한 IP 차단. B1App 클라이언트는 더 이상 `POST /`를 호출하지 않습니다. IP 차단은 통합 배달 마이그레이션에서 제거되었습니다. `/clear` 경로는 여전히 스트리밍 서비스가 저장될 때 `StreamingServiceController`에 의해 서버 간에 호출됩니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (레거시) 차단된 IP를 저장합니다(일괄). 활성 클라이언트 없음 |
| POST | `/clear` | JWT | — | 특정 서비스의 모든 차단된 IP를 지웁니다. 본문: `[{ serviceId, churchId }]` |

## 배달 로그

기본 경로: `/messaging/deliverylogs`

전송된 메시지(SMS, 푸시 알림, 이메일)의 배달 상태를 추적합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | 콘텐츠 유형과 ID로 배달 로그를 로드합니다 |
| GET | `/person/:personId` | JWT | — | 사람의 배달 로그를 로드합니다. 선택적 `?startDate=&endDate=` 필터 |
| GET | `/recent` | JWT | — | 교회의 최근 배달 로그를 로드합니다. 선택적 `?limit=`(기본 100) |
| GET | `/:id` | JWT | — | ID로 배달 로그를 로드합니다 |

## 관련 페이지

- [실시간 아키텍처](../../realtime) -- WebSocket 프로토콜, 방 구독, 통합 배달 프레임워크
- [웹 푸시 알림](../../web-push) -- 브라우저 푸시 등록 및 배달
- [Membership 엔드포인트](./membership) -- 사람, 그룹, 역할, 핵심 ID
- [출석 엔드포인트](./attendance) -- 서비스 및 방문 추적
- [인증 및 권한](./authentication) -- 로그인 흐름, JWT, OAuth, 권한 모델
- [모듈 구조](../module-structure) -- 코드 구성 패턴
