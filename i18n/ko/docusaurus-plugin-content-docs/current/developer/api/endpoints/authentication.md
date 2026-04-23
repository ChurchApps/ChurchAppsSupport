---
title: "인증 및 권한"
---

# 인증 및 권한

<div class="article-intro">

ChurchApps API는 JWT 기반 인증을 사용합니다. 사용자는 로그인하여 신원, 교회 회원 자격, 권한을 인코드하는 토큰을 받습니다. 이 페이지는 인증 흐름, 권한 모델, OAuth 지원을 다룹니다.

</div>

## 로그인 흐름

### 표준 로그인

```
POST /membership/users/login
```

**인증:** Public

다음 3가지 자격증명 유형 중 하나를 허용합니다:

| 필드 | 설명 |
|-------|-------------|
| `email` + `password` | 표준 이메일/비밀번호 로그인 |
| `jwt` | 기존 JWT로 재인증 |
| `authGuid` | 일회용 인증 링크 (환영/재설정 이메일에 사용됨) |

**응답:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

`token` 필드는 후속 요청에서 `Authorization: Bearer <token>`으로 전송되어야 하는 JWT입니다.

### 토큰 내용

JWT는 다음을 인코드합니다:
- `id` — 사용자 ID
- `churchId` — 현재 선택된 교회
- `personId` — 선택된 교회의 사람 기록
- API별 권한 배열

### 교회 선택

사용자는 여러 교회에 속할 수 있습니다. 로그인 응답은 권한과 함께 모든 교회를 포함합니다. 교회를 전환하려면 클라이언트는 로그인 응답 데이터에서 다른 교회로 범위가 지정된 새 JWT를 생성합니다.

## 사용자 등록

### 새 사용자 등록

```
POST /membership/users/register
```

**인증:** Public

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

임시 비밀번호를 사용하여 사용자를 생성하고 인증 링크가 있는 환영 이메일을 보냅니다. 새 인스턴스에 등록된 첫 사용자는 자동으로 서버 관리자 액세스가 부여됩니다.

### 새 교회 등록

```
POST /membership/churches/add
```

**인증:** JWT

사용자를 등록한 후 이 엔드포인트를 호출하여 교회를 생성하고 사용자를 연결하세요.

## 비밀번호 관리

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | 비밀번호 재설정 이메일 전송. 본문: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | 재설정 이메일의 인증 GUID를 사용하여 새 비밀번호 설정. 본문: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | 현재 사용자의 비밀번호 변경. 본문: `{ "newPassword": "..." }` |

## 권한 모델

권한은 모듈별로 구성되고 역할을 통해 사용자에게 할당됩니다. 각 권한은 **컨텐츠 타입**과 **작업**을 가집니다.

### 권한 참고

| 표시 섹션 | 컨텐츠 타입 | 작업 | 설명 |
|----------------|--------------|--------|-------------|
| **참석** | Attendance | Checkin | 서비스에서 회원 체크인 |
| | Attendance | Edit | 참석 기록 편집 |
| | Services | Edit | 서비스 및 서비스 시간 관리 |
| | Attendance | View | 참석 기록 보기 |
| | Attendance | View Summary | 참석 요약 및 보고서 보기 |
| **헌금** | Donations | Edit | 기부금 기록 생성 및 편집 |
| | Settings | Edit | 헌금/결제 설정 편집 |
| | Donations | View Summary | 기부금 요약 보고서 보기 |
| | Donations | View | 개별 기부금 기록 보기 |
| **사람과 그룹** | Forms | Admin | 전체 양식 관리 |
| | Forms | Edit | 양식 정의 편집 |
| | Plans | Edit | 서비스 계획 편집 |
| | Group Members | Edit | 그룹 회원 추가/제거 |
| | Groups | Edit | 그룹 생성 및 편집 |
| | Households | Edit | 가구 할당 편집 |
| | People | Edit | 모든 사람 기록 편집 |
| | People | Edit Self | 자신의 사람 기록만 편집 |
| | Roles | Edit | 역할 및 사용자 할당 관리 |
| | Group Members | View | 그룹 회원 목록 보기 |
| | People | View Members | 회원만 보기 (방문자 아님) |
| | People | View | 모든 사람 보기 |
| | Roles | View | 역할 및 할당 보기 |
| | Settings | Edit | 교회 설정 편집 |
| **컨텐츠** | Content | Edit | 페이지, 섹션, 요소 편집 |
| | Settings | Edit | 컨텐츠 설정 편집 |
| | StreamingServices | Edit | 스트리밍 서비스 구성 관리 |
| | Chat | Host | 채팅 세션 호스트/중재 |
| **메시징** | Texting | Send | SMS 문자 메시지 보내기 |

### 권한 확인 방법

컨트롤러에서 `au.checkAccess()` 메서드를 사용하여 권한을 확인하세요:

```typescript
// 특정 권한 필요
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// 또는 actionWrapper 내 -- CRUD 시스템이 자동 확인
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### 서버 관리자

`Server.Admin` 권한은 모든 교회에 대한 완전한 액세스를 부여합니다. 이는 첫 등록 사용자에게 할당되며 서버 관리자 역할을 통해 다른 사용자에게 부여될 수 있습니다.

## OAuth 2.0

API는 제3자 통합을 위한 OAuth 2.0을 지원합니다. 두 가지 허가 유형을 사용할 수 있습니다.

### 권한 부여 코드 흐름

1. **권한 부여:** `POST /membership/oauth/authorize` (JWT 필요)
   - 본문: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - 반환: `{ "code": "...", "state": "..." }`

2. **토큰 코드 교환:** `POST /membership/oauth/token` (Public)
   - 본문: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - 반환: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **토큰 새로고침:** `POST /membership/oauth/token` (Public)
   - 본문: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

액세스 토큰은 **12시간**후 만료됩니다.

### 장치 코드 흐름 (RFC 8628)

브라우저 없는 장치 (TV 앱, 키오스크)의 경우:

1. **장치 코드 요청:** `POST /membership/oauth/device/authorize` (Public)
   - 본문: `{ "client_id": "...", "scope": "..." }`
   - 반환: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **사용자가 확인 URI에서 코드 입력** 및 승인 또는 거부

3. **토큰 폴링:** `POST /membership/oauth/token` (Public)
   - 본문: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - 승인될 때까지 `authorization_pending` 반환, 그 다음 액세스 토큰 반환

### OAuth 클라이언트 관리

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | 모든 OAuth 클라이언트 나열 |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | ID별 클라이언트 가져오기 |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | 클라이언트 ID별 클라이언트 가져오기 (시크릿 숨김) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | 클라이언트 생성 또는 업데이트 |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | 클라이언트 삭제 |

### 장치 승인 엔드포인트

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | 승인 UI를 위한 대기 중인 장치 코드 정보 가져오기 |
| POST | `/membership/oauth/device/approve` | JWT | 장치 권한 부여 승인. 본문: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | 장치 권한 부여 거부. 본문: `{ "user_code": "..." }` |

## Public vs 인증된 엔드포인트

API는 인증 요구사항을 결정하는 2개의 래퍼 함수를 사용합니다:

- **`actionWrapper`** -- 유효한 JWT 필요. 인증된 사용자 객체(`au`)는 `churchId`, `userId`, 권한 확인과 함께 사용 가능합니다.
- **`actionWrapperAnon`** -- 인증 필요 없음. 로그인, 등록, public 컨텐츠 조회, 웹훅 수신기에 사용됩니다.

이 문서 전체의 엔드포인트 테이블에서 이들은 인증 열에 **JWT** 및 **Public**으로 표시됩니다.

## 관련 페이지

- [모듈 구조](../module-structure) — 컨트롤러, 저장소, 모델이 어떻게 구성되는지
- [로컬 설정](../local-setup) — 개발용 API를 로컬에서 실행
