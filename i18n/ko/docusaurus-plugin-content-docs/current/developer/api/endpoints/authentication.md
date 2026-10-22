---
title: "인증 및 권한"
---

# 인증 및 권한 {#authentication--permissions}

<div class="article-intro">

ChurchApps API는 JWT 기반 인증을 사용합니다. 사용자는 로그인하여 자신의 신원, 교회 소속, 권한을 담은 토큰을 받습니다. 이 페이지에서는 인증 흐름, 권한 모델, OAuth 지원을 다룹니다.

</div>

## 로그인 흐름 {#login-flow}

### 표준 로그인 {#standard-login}

```
POST /membership/users/login
```

**인증:** Public

세 가지 자격 증명 유형 중 하나를 받습니다.

| 필드 | 설명 |
|-------|-------------|
| `email` + `password` | 표준 이메일/비밀번호 로그인 |
| `jwt` | 기존 JWT로 다시 인증 |
| `authGuid` | 일회용 인증 링크(환영 및 재설정 이메일에서 사용) |

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

`token` 필드는 JWT이며, 이후 요청에서 `Authorization: Bearer <token>`으로 보내야 합니다.

### 토큰 내용 {#token-contents}

JWT에는 다음 정보가 담깁니다.
- `id` — 사용자 ID
- `churchId` — 현재 선택된 교회
- `personId` — 선택된 교회의 사람 기록
- API별 권한 배열

### 교회 선택 {#church-selection}

사용자는 여러 교회에 속할 수 있습니다. 로그인 응답에는 각 교회와 그 권한이 모두 포함됩니다. 교회를 전환하려면, 클라이언트가 로그인 응답 데이터를 바탕으로 다른 교회에 범위가 지정된 새 JWT를 생성합니다.

## 사용자 등록 {#user-registration}

### 새 사용자 등록 {#register-a-new-user}

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

임시 비밀번호로 사용자를 만들고, 인증 링크가 포함된 환영 이메일을 보냅니다. 새 인스턴스에서 처음 등록된 사용자는 자동으로 서버 관리자 권한을 부여받습니다.

선택적인 봇 차단 필드 두 개를 받습니다. `website`(실제 사용자는 비워 두는 숨김 허니팟 필드)와 `fillMs`(양식이 열려 있었던 시간, 밀리초)입니다. `website`가 채워져 있거나 `fillMs`가 2000 미만이면 계정은 만들어지지 않지만, 봇이 거부되었는지 알 수 없도록 엔드포인트는 여전히 정상처럼 보이는 `200`을 반환합니다. 두 필드를 생략하는 클라이언트는 평소처럼 등록됩니다.

### 새 교회 등록 {#register-a-new-church}

```
POST /membership/churches/add
```

**인증:** JWT

사용자를 등록한 뒤, 이 엔드포인트를 호출하여 교회를 만들고 사용자를 그 교회와 연결합니다.

## 비밀번호 관리 {#password-management}

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | 비밀번호 재설정 이메일 발송. 본문: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | 재설정 이메일의 인증 GUID로 새 비밀번호 설정. 본문: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | 현재 사용자의 비밀번호 변경. 본문: `{ "newPassword": "..." }` |

## 권한 모델 {#permission-model}

권한은 모듈별로 구성되며, 역할을 통해 사용자에게 할당됩니다. 각 권한에는 **콘텐츠 유형**과 **작업**이 있습니다.

### 권한 참조 {#permission-reference}

| 표시 섹션 | 콘텐츠 유형 | 작업 | 설명 |
|----------------|--------------|--------|-------------|
| **출석** | Attendance | Checkin | 예배에서 구성원 체크인 |
| | Attendance | Edit | 출석 기록 편집 |
| | Services | Edit | 예배와 예배 시간 관리 |
| | Attendance | View | 출석 기록 보기 |
| | Attendance | View Summary | 출석 요약과 보고서 보기 |
| **헌금** | Donations | Edit | 헌금 기록 생성 및 편집 |
| | Settings | Edit | 헌금/결제 설정 편집 |
| | Donations | View Summary | 헌금 요약 보고서 보기 |
| | Donations | View | 개별 헌금 기록 보기 |
| **사람 및 그룹** | Forms | Admin | 양식 전체 관리 |
| | Forms | Edit | 양식 정의 편집 |
| | Plans | Edit | 예배 일정 편집 |
| | Group Members | Edit | 그룹 구성원 추가/제거 |
| | Groups | Edit | 그룹 생성 및 편집 |
| | Households | Edit | 가구 배정 편집 |
| | People | Edit | 모든 사람 기록 편집 |
| | People | Edit Self | 본인의 사람 기록만 편집 |
| | Roles | Edit | 역할과 사용자 배정 관리 |
| | Group Members | View | 그룹 구성원 목록 보기 |
| | People | View Members | 구성원만 보기(방문자 제외) |
| | People | View | 모든 사람 보기 |
| | Roles | View | 역할과 배정 보기 |
| | Settings | Edit | 교회 설정 편집 |
| **콘텐츠** | Content | Edit | 페이지, 섹션, 요소 편집 |
| | Settings | Edit | 콘텐츠 설정 편집 |
| | StreamingServices | Edit | 스트리밍 서비스 구성 관리 |
| | Chat | Host | 채팅 세션 진행/중재 |
| **메시징** | Texting | Send | SMS 문자 메시지 발송 |

### 권한 확인 방식 {#how-permissions-are-checked}

컨트롤러에서는 `au.checkAccess()` 메서드로 권한을 확인합니다.

```typescript
// 특정 권한 요구
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// 또는 actionWrapper 안에서 — CRUD 시스템이 자동으로 확인
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### 서버 관리자 {#server-admin}

`Server.Admin` 권한은 모든 교회에 걸친 전체 접근 권한을 부여합니다. 이 권한은 처음 등록된 사용자에게 부여되며, 서버 관리자 역할을 통해 다른 사용자에게도 부여할 수 있습니다.

## OAuth 2.0 {#oauth-20}

API는 타사 연동을 위해 OAuth 2.0을 지원합니다. 두 가지 권한 부여 유형을 사용할 수 있습니다.

### 인증 코드 흐름 {#authorization-code-flow}

1. **인증:** `POST /membership/oauth/authorize` (JWT 필요)
   - 본문: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method`(PKCE, `S256`만 가능)는 비밀이 없는 공개 클라이언트에 필수
   - 반환: `{ "code": "...", "state": "..." }`

2. **코드를 토큰으로 교환:** `POST /membership/oauth/token` (Public)
   - 본문: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - 인증 단계에서 `code_challenge`를 사용했다면 `code_verifier`를 보내야 하며, 공개 클라이언트는 `client_secret`을 생략합니다. JSON과 폼 인코딩 본문을 모두 받습니다.
   - 반환: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **갱신 토큰:** `POST /membership/oauth/token` (Public)
   - 본문: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

액세스 토큰은 **12시간** 후에 만료됩니다.

### 장치 코드 흐름(RFC 8628) {#device-code-flow-rfc-8628}

브라우저가 없는 장치(TV 앱, 키오스크)용입니다.

1. **장치 코드 요청:** `POST /membership/oauth/device/authorize` (Public)
   - 본문: `{ "client_id": "...", "scope": "..." }`
   - 반환: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **사용자가 검증 URI에서 코드를 입력**하고 승인하거나 거부합니다.

3. **토큰 폴링:** `POST /membership/oauth/token` (Public)
   - 본문: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - 승인될 때까지 `authorization_pending`을 반환하며, 승인되면 액세스 토큰을 반환합니다.

### OAuth 클라이언트 관리 {#oauth-client-management}

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | 모든 OAuth 클라이언트 목록 조회 |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | ID로 클라이언트 조회 |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | 클라이언트 ID로 클라이언트 조회(비밀 값은 가려짐) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | 클라이언트 생성 또는 업데이트 |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | 클라이언트 삭제 |
| POST | `/membership/oauth/register` | Public | — | MCP 커넥터 같은 공개 클라이언트를 위한 동적 클라이언트 등록(RFC 7591). [연결된 앱](../connected-apps#dynamic-client-registration)을 참조하세요. |

### 장치 승인 엔드포인트 {#device-approval-endpoints}

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | 승인 UI를 위해 대기 중인 장치 코드 정보 조회 |
| POST | `/membership/oauth/device/approve` | JWT | 장치 인증 승인. 본문: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | 장치 인증 거부. 본문: `{ "user_code": "..." }` |

## 공개 엔드포인트와 인증 엔드포인트 {#public-vs-authenticated-endpoints}

API는 인증 요구 사항을 정하는 두 개의 래퍼 함수를 사용합니다.

- **`actionWrapper`** — 유효한 JWT가 필요합니다. 인증된 사용자 객체(`au`)를 사용할 수 있으며, `churchId`, `userId`, 권한 검사가 포함됩니다.
- **`actionWrapperAnon`** — 인증이 필요하지 않습니다. 로그인, 등록, 공개 콘텐츠 조회, 웹훅 수신기에 사용됩니다.

이 문서 전체의 엔드포인트 표에서 이들은 인증 열에 각각 **JWT**와 **Public**으로 표시됩니다.

## 관련 문서 {#related-pages}

- [모듈 구조](../module-structure) — 컨트롤러, 리포지토리, 모델의 구성 방식
- [로컬 설정](../local-setup) — 개발을 위해 API를 로컬에서 실행하기
