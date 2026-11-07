---
title: "인증 및 권한"
description: "ChurchApps API의 JWT 로그인, 2단계 인증, OAuth 2.0 흐름, 권한 모델을 설명하는 참조 문서로, 연동을 개발하는 개발자를 위한 내용입니다."
---

# 인증 및 권한

<div class="article-intro">

ChurchApps API는 JWT 기반 인증을 사용합니다. 사용자는 로그인하여 자신의 신원, 교회 소속, 권한을 담은 토큰을 받습니다. 이 페이지에서는 인증 흐름, 권한 모델, OAuth 지원을 다룹니다.

</div>

## 로그인 흐름

### 일반 로그인

```
POST /membership/users/login
```

**인증:** 공개

다음 세 가지 자격 증명 유형 중 하나를 받습니다.

| 필드 | 설명 |
|-------|-------------|
| `email` + `password` | 일반 이메일/비밀번호 로그인 |
| `jwt` | 기존 JWT로 다시 인증 |
| `authGuid` | 일회성 인증 링크(환영 이메일과 재설정 이메일에서 사용) |

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

`token` 필드는 JWT이며, 이후 요청에 `Authorization: Bearer <token>`으로 보내야 합니다.

### 2단계 로그인 {#two-factor-sign-in}

사용자는 인증 앱(TOTP) 기반 2단계 로그인을 켤 수 있습니다. 이런 사용자의 경우 `email` + `password`, `authGuid`, 또는 SSO 로그인은 토큰을 반환하지 않습니다. 대신 다음과 같은 질문(challenge)으로 응답합니다.

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

질문 토큰은 5분 동안 유효합니다. 같은 엔드포인트에 코드와 함께 이 토큰을 다시 보내세요.

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode`에는 현재의 6자리 인증 코드 또는 사용자가 가진 10개의 일회용 백업 코드 중 하나를 쓸 수 있습니다. 잘못된 코드는 `Invalid code`를 반환하며, 반복된 실패는 계정별로 요청 빈도가 제한됩니다. `jwt` 재로그인은 질문을 받지 않으므로, 기존 세션은 계속 갱신됩니다. 로그인 응답의 `user` 객체에는 `mfaEnabled`가 포함됩니다.

셀프 서비스 엔드포인트(로그인한 사용자만, `/membership/users/mfa` 아래):

| 엔드포인트 | 설명 |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | 설정을 시작하며, QR 코드용 `{ secret, otpauthUrl }`을 반환 |
| `POST /enable` | 본문 `{ code }`. 켜고 `{ backupCodes }`를 한 번만 반환 |
| `POST /disable` | 본문 `{ code }`(인증 코드 또는 백업 코드). 끔 |
| `POST /reset/:userId` | Server.Admin 전용. 다른 사용자의 설정을 끔 |

비밀 값은 암호화되어 저장되며, 백업 코드는 해시로 저장됩니다. 켜기, 끄기, 초기화는 모두 감사 로그에 기록됩니다.

### 토큰 내용

JWT에는 다음 정보가 담깁니다.
- `id` — 사용자 ID
- `churchId` — 현재 선택된 교회
- `personId` — 선택된 교회에서의 교인 기록
- API별 권한 배열

### 교회 선택

사용자는 여러 교회에 속할 수 있습니다. 로그인 응답에는 각 교회와 권한이 모두 포함됩니다. 교회를 바꾸려면 클라이언트가 로그인 응답 데이터에서 다른 교회 범위의 새 JWT를 만듭니다.

## 사용자 등록

### 새 사용자 등록

```
POST /membership/users/register
```

**인증:** 공개

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

임시 비밀번호로 사용자를 만들고, 인증 링크가 담긴 환영 이메일을 보냅니다. 새 인스턴스에서 처음 등록된 사용자에게는 자동으로 서버 관리자 권한이 부여됩니다.

선택적인 봇 차단 필드 두 개를 받습니다. `website`(실제 사용자는 비워 두는 숨김 허니팟 필드)와 `fillMs`(양식이 열려 있었던 시간, 밀리초 단위)입니다. `website`에 값이 있거나 `fillMs`가 2000 미만이면 계정은 만들어지지 않지만, 엔드포인트는 봇이 거부되었다는 것을 알 수 없도록 평소와 같은 `200`을 반환합니다. 두 필드를 생략한 클라이언트는 평소처럼 등록됩니다.

### 새 교회 등록

```
POST /membership/churches/add
```

**인증:** JWT

사용자를 등록한 뒤 이 엔드포인트를 호출하면 교회를 만들고 사용자를 그 교회와 연결합니다.

## 비밀번호 관리

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | 공개 | 비밀번호 재설정 이메일 발송. 본문: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | 공개 | 재설정 이메일의 인증 GUID로 새 비밀번호 설정. 본문: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | 현재 사용자의 비밀번호 변경. 본문: `{ "newPassword": "..." }` |

## 권한 모델

권한은 모듈별로 구성되며 역할을 통해 사용자에게 할당됩니다. 각 권한에는 **콘텐츠 유형**과 **동작**이 있습니다.

### 권한 참조

| 표시 섹션 | 콘텐츠 유형 | 동작 | 설명 |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | 예배에서 교인을 체크인 |
| | Attendance | Edit | 출석 기록 편집 |
| | Services | Edit | 예배 및 예배 시간 관리 |
| | Attendance | View | 출석 기록 보기 |
| | Attendance | View Summary | 출석 요약 및 보고서 보기 |
| **Donations** | Donations | Edit | 헌금 기록 생성 및 편집 |
| | Settings | Edit | 헌금/결제 설정 편집 |
| | Donations | View Summary | 헌금 요약 보고서 보기 |
| | Donations | View | 개별 헌금 기록 보기 |
| **People and Groups** | Forms | Admin | 양식 전체 관리 |
| | Forms | Edit | 양식 정의 편집 |
| | Plans | Edit | 예배 계획 편집 |
| | Group Members | Edit | 그룹 구성원 추가/제거 |
| | Groups | Edit | 그룹 생성 및 편집 |
| | Households | Edit | 가구 배정 편집 |
| | People | Edit | 모든 교인 기록 편집 |
| | People | Edit Self | 자신의 교인 기록만 편집 |
| | Roles | Edit | 역할 및 사용자 배정 관리 |
| | Group Members | View | 그룹 구성원 명단 보기 |
| | People | View Members | 교인만 보기(방문자 제외) |
| | People | View | 모든 교인 보기 |
| | Roles | View | 역할 및 배정 보기 |
| | Settings | Edit | 교회 설정 편집 |
| **Content** | Content | Edit | 페이지, 섹션, 요소 편집 |
| | Settings | Edit | 콘텐츠 설정 편집 |
| | StreamingServices | Edit | 스트리밍 서비스 구성 관리 |
| | Chat | Host | 채팅 세션 진행/관리 |
| **Messaging** | Texting | Send | 문자 메시지 보내기 |

### 권한 확인 방법

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

### 서버 관리자

`Server.Admin` 권한은 모든 교회에 대한 전체 접근 권한을 부여합니다. 이 권한은 처음 등록된 사용자에게 할당되며, 서버 관리자 역할을 통해 다른 사용자에게도 부여할 수 있습니다.

## OAuth 2.0

API는 제3자 연동을 위해 OAuth 2.0을 지원합니다. 두 가지 승인 유형을 사용할 수 있습니다.

### 인가 코드 흐름

1. **인가:** `POST /membership/oauth/authorize` (JWT 필요)
   - 본문: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method`(PKCE, `S256`만 지원)는 비밀 값이 없는 공개 클라이언트에 필수입니다.
   - 반환: `{ "code": "...", "state": "..." }`

2. **코드를 토큰으로 교환:** `POST /membership/oauth/token` (공개)
   - 본문: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - 인가 단계에서 `code_challenge`를 사용했다면 `code_verifier`를 보내세요. 공개 클라이언트는 `client_secret`을 생략합니다. JSON 또는 폼 인코딩 본문을 모두 받습니다.
   - 반환: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **토큰 갱신:** `POST /membership/oauth/token` (공개)
   - 본문: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

액세스 토큰은 **12시간** 후에 만료됩니다.

### 기기 코드 흐름 (RFC 8628)

브라우저가 없는 기기(TV 앱, 키오스크)용입니다.

1. **기기 코드 요청:** `POST /membership/oauth/device/authorize` (공개)
   - 본문: `{ "client_id": "...", "scope": "..." }`
   - 반환: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **사용자가 확인 주소에서 코드를 입력**하고 승인하거나 거부합니다.

3. **토큰 폴링:** `POST /membership/oauth/token` (공개)
   - 본문: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - 승인되기 전까지 `authorization_pending`을 반환하고, 승인되면 액세스 토큰을 반환합니다.

### OAuth 클라이언트 관리

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | 모든 OAuth 클라이언트 목록 |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | ID로 클라이언트 가져오기 |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | 클라이언트 ID로 클라이언트 가져오기(비밀 값은 가려짐) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | 클라이언트 생성 또는 업데이트 |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | 클라이언트 삭제 |
| POST | `/membership/oauth/register` | 공개 | — | MCP 커넥터 같은 공개 클라이언트를 위한 동적 클라이언트 등록(RFC 7591). [연결된 앱](../connected-apps.md#dynamic-client-registration) 참고 |

### 기기 승인 엔드포인트

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | 승인 화면용 대기 중인 기기 코드 정보 가져오기 |
| POST | `/membership/oauth/device/approve` | JWT | 기기 인가 승인. 본문: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | 기기 인가 거부. 본문: `{ "user_code": "..." }` |

## 공개 엔드포인트와 인증된 엔드포인트

API는 인증 요건을 결정하는 두 개의 래퍼 함수를 사용합니다.

- **`actionWrapper`** — 유효한 JWT가 필요합니다. 인증된 사용자 객체(`au`)를 사용할 수 있으며, `churchId`, `userId`, 권한 확인이 포함됩니다.
- **`actionWrapperAnon`** — 인증이 필요 없습니다. 로그인, 등록, 공개 콘텐츠 조회, 웹훅 수신에 사용합니다.

이 문서 전체의 엔드포인트 표에서는 인증 열에 각각 **JWT**와 **공개**로 표시합니다.

## 관련 문서

- [모듈 구조](../module-structure.md) — 컨트롤러, 리포지토리, 모델의 구성 방식
- [로컬 설정](../local-setup.md) — 개발을 위해 로컬에서 API 실행하기
