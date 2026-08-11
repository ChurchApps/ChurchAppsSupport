---
title: "메시징 엔드포인트"
---

# 메시징 엔드포인트

<div class="article-intro">

메시징 모듈은 실시간 대화, 채팅 메시지, 푸시 알림, SMS/이메일 전달, WebSocket 연결, 개인 메시징, 기기 등록 및 문자 공급자를 관리합니다. 라이브 스트리밍 채팅 및 비동기 알림 모두에 대해 모든 ChurchApps 애플리케이션에서 사용하는 통신 계층을 제공합니다.

</div>

**기본 경로:** `/messaging`

## 대화

기본 경로: `/messaging/conversations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | 첫/마지막 메시지와 함께 쉼표로 구분된 ID별 대화 로드 |
| GET | `/messages/:contentType/:contentId` | JWT | — | 페이지 매김 메시지를 사용하여 콘텐츠에 대한 대화 로드(`?page=&limit=`) |
| GET | `/posts` | JWT | — | 현재 사용자의 그룹에 대한 게시물 유형 대화 가져오기 |
| GET | `/posts/group/:groupId` | JWT | — | 특정 그룹에 대한 게시물 유형 대화 가져오기 |
| GET | `/current/:churchId/:contentType/:contentId` | 공개 | — | 콘텐츠의 현재 대화 가져오기 또는 만들기(자동 암호 해제 contentId) |
| GET | `/:churchId/:contentType/:contentId` | 공개 | — | 콘텐츠 유형 및 ID별 대화 로드 |
| GET | `/:churchId/:id` | 공개 | — | ID별 단일 대화 로드 |
| POST | `/` | JWT | — | 대화 만들기 또는 업데이트(배치) |
| POST | `/start` | JWT | — | 초기 댓글 메시지로 새 대화 시작 |
| DELETE | `/:churchId/:id` | JWT | — | 대화 삭제 |

### 사람 메모 접근 제어

`contentType: "person"`(사람 기록의 메모 탭) 또는 `contentType: "personConfidential"`(기밀 메모 섹션)인 대화는 모든 읽기 및 쓰기 경로에서 게이트되며, 위의 공개 경로를 포함하여 이러한 콘텐츠 유형에 대해 `401`을 반환합니다. `person`은 MembershipApi **사람 / 편집** 권한이 필요합니다. `personConfidential`은 **사람 / 기밀 메모 보기**가 필요합니다. 범위 API 키의 경우 `people:write`는 두 작업을 모두 수행합니다(키의 사용자는 여전히 기본 역할 권한을 가져야 함).

### 예: 대화 시작

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
| GET | `/conversation/:conversationId` | JWT | — | 대화의 모든 메시지 로드 |
| GET | `/catchup/:churchId/:conversationId` | 공개 | — | 대화의 모든 메시지 로드(라이브 채팅용 공개 캐치업) |
| GET | `/:churchId/:id` | 공개 | — | ID별 단일 메시지 로드 |
| POST | `/` | JWT | — | 메시지 저장(배치). 실시간 업데이트 및 알림 트리거 전송 |
| POST | `/send` | 공개 | — | 메시지 전송(배치, 공개). WebSocket를 통해 실시간 업데이트 및 알림 트리거 전송 |
| POST | `/setCallout` | JWT | — | (레거시) 실시간 호출 메시지 브로드캐스트. 활성 클라이언트 없음; 라이브 스트림 채팅은 더 이상 호출을 렌더링하지 않음 |
| DELETE | `/:churchId/:id` | JWT | — | 메시지 삭제 및 실시간으로 삭제 브로드캐스트 |

### 예: 메시지 전송

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
| GET | `/` | JWT | — | 현재 사용자의 모든 개인 메시지 로드(대화당 마지막 메시지 포함, 모두 읽음으로 표시) |
| GET | `/existing/:personId` | JWT | — | 특정 사람과의 기존 개인 대화 찾기 |
| GET | `/:id` | JWT | — | ID별 개인 메시지 로드(현재 사용자에게 주소 지정된 경우 알림 지우기) |
| POST | `/` | JWT | — | 개인 메시지 전송(배치). 수신자에게 푸시 알림 트리거 |

## 알림

기본 경로: `/messaging/notifications`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | 현재 사용자의 미읽 알림 수 가져오기 |
| GET | `/my` | JWT | — | 현재 사용자의 모든 알림 로드(모두 읽음으로 표시) |
| GET | `/tmpEmail` | 공개 | — | 일일 이메일 알림 다이제스트 트리거(디버그/cron 엔드포인트) |
| GET | `/:churchId/person/:personId` | JWT | — | 특정 사람의 알림 로드 |
| GET | `/:churchId/:id` | JWT | — | ID별 알림 로드 |
| POST | `/` | JWT | — | 알림 만들기 또는 업데이트(배치) |
| POST | `/create` | JWT | — | 여러 사람을 위한 알림 만들기. 본문: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | 사람의 모든 알림을 읽음으로 표시 |
| POST | `/sendTest` | JWT | — | 테스트 푸시 알림 전송. 본문: `{ personId, title }` |
| POST | `/ping` | 공개 | — | 외부 트리거에서 알림 만들기. 본문: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | 알림 삭제 |

### 예: 알림 만들기

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

표준 CRUD를 확장합니다. 기본 클래스는 POST `/`(만들기 또는 업데이트, 권한 없음)를 제공합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | 알림 설정 만들기 또는 업데이트(CRUD 기본 클래스) |
| GET | `/my` | JWT | — | 현재 사용자의 알림 설정 로드(없으면 자동으로 기본값 생성) |

## 연결

기본 경로: `/messaging/connections`

채팅, 그룹 대화, 개인 메시지 및 라이브 스트리밍용 WebSocket/실시간 연결을 관리합니다. 엔드 투 엔드 프로토콜은 [실시간 아키텍처](../../realtime)를 참조하세요.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | 공개 | — | 대화의 모든 연결 로드 |
| POST | `/` | 공개 | — | 연결 등록(배치). 대화에서 참석 브로드캐스트 트리거. 본문 항목: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | 공개 | — | 소켓 ID별 연결의 표시 이름 업데이트. 본문: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | 공개 | — | 대화에서 연결 제거. 참석 브로드캐스트 트리거 |
| POST | `/tmpSendAlert` | 공개 | — | 사람의 연결로 알림 경고 전송. 본문: `{ churchId, personId }` |

## 기기

기본 경로: `/messaging/devices`

푸시 알림 및 콘텐츠 페어링(예: TV 디스플레이의 Lessons 앱)을 위한 기기 등록을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | 기기 등록 또는 업데이트(모바일 푸시 등록). FCM 토큰 또는 기기 ID별 일치 |
| POST | `/enrollAnon` | 공개 | — | 익명 기기 등록 및 4문자 페어링 코드 생성 |
| POST | `/` | 공개 | — | 기기 저장(배치) |
| GET | `/pair/:pairingCode` | JWT | — | 페어링 코드를 사용하여 기기 페어링. 선택적 `?contentType=&contentId=` 콘텐츠 할당 |
| GET | `/status/:deviceId` | 공개 | — | 기기의 페어링 상태 확인 |
| GET | `/:churchId` | JWT | — | 교회의 모든 기기 로드 |
| GET | `/:churchId/person/:personId` | JWT | — | 사람의 모든 기기 로드 |
| GET | `/:churchId/:id` | JWT | — | ID별 기기 로드 |
| DELETE | `/:churchId/:id` | JWT | — | 기기 삭제 |

### 예: 기기 등록

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

페어링 기기에 대한 콘텐츠 할당 관리(예: TV에 표시되는 수업).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | 기기의 콘텐츠 할당 로드 |
| POST | `/` | JWT | — | 기기 콘텐츠 할당 저장(배치) |
| DELETE | `/:id` | JWT | — | 기기 콘텐츠 할당 삭제 |

## 문자

기본 경로: `/messaging/texting`

SMS 문자 공급자, 그룹 문자 메시징 및 전달 추적을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | 교회의 문자 공급자 로드(자격증 마스킹됨) |
| GET | `/preview/:groupId` | JWT | — | 그룹 문자의 수신자 미리보기(적격, 거부됨, 전화번호 없음 수) |
| GET | `/sent` | JWT | — | 교회의 모든 전송된 문자 메시지 기록 로드 |
| GET | `/sent/:id/details` | JWT | — | 수신자별 전달 로그를 사용하여 전송된 문자 로드 |
| POST | `/providers` | JWT | — | 문자 공급자 저장(배치). API 자격증 암호화 |
| POST | `/send` | JWT | — | 그룹의 모든 적격 회원에게 SMS 전송. 본문: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | 단일 사람에게 SMS 전송. 본문: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | 문자 공급자 삭제 |

### 예: 그룹 문자 전송

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

재사용 가능한 이메일 템플릿 및 그룹으로 템플릿 이메일 전송을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 이메일 템플릿 로드 |
| GET | `/:id` | JWT | — | ID별 단일 이메일 템플릿 로드 |
| GET | `/preview/:groupId` | JWT | — | 그룹의 이메일 전달 미리보기(적격 수신자 수, 이메일 없는 회원) |
| POST | `/` | JWT | — | 이메일 템플릿 만들기 또는 업데이트(배치) |
| POST | `/send` | JWT | — | 그룹의 모든 회원에게 템플릿 이메일 전송. 본문: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | 이메일 템플릿 삭제 |

### 예: 그룹으로 이메일 전송

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

(레거시) 라이브 스트리밍 채팅을 위한 IP 차단. B1App 클라이언트는 더 이상 `POST /`를 호출하지 않습니다 -- IP 차단은 통합 배송 마이그레이션에서 제거되었습니다. `/clear` 경로는 여전히 스트리밍 서비스가 저장될 때 `StreamingServiceController`에서 서버 간 호출됩니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (레거시) 차단된 IP 저장(배치). 활성 클라이언트 없음 |
| POST | `/clear` | JWT | — | 특정 서비스의 모든 차단된 IP 지우기. 본문: `[{ serviceId, churchId }]` |

## 전달 로그

기본 경로: `/messaging/deliverylogs`

전송된 메시지(SMS, 푸시 알림, 이메일)의 전달 상태를 추적합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | 콘텐츠 유형 및 ID별 전달 로그 로드 |
| GET | `/person/:personId` | JWT | — | 사람의 전달 로그 로드. 선택적 `?startDate=&endDate=` 필터 |
| GET | `/recent` | JWT | — | 교회의 최근 전달 로그 로드. 선택적 `?limit=`(기본 100) |
| GET | `/:id` | JWT | — | ID별 전달 로그 로드 |

## 관련 페이지

- [실시간 아키텍처](../../realtime) -- WebSocket 프로토콜, 룸 구독 및 통합 배송 프레임워크
- [웹 푸시 알림](../../web-push) -- 브라우저 푸시 등록 및 전달
- [멤버십 엔드포인트](./membership) -- 사람, 그룹, 역할 및 핵심 신원
- [참석 엔드포인트](./attendance) -- 서비스 및 방문 추적
- [인증 및 권한](./authentication) -- 로그인 흐름, JWT, OAuth, 권한 모델
- [모듈 구조](../module-structure) -- 코드 구성 패턴
