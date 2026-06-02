---
title: "연결된 앱 & OAuth"
---

# 연결된 앱 & OAuth

<div class="article-intro">

B1 API는 OAuth 2.0을 지원하므로 타사 애플리케이션이 각 교회 관리자에게 권한을 요청할 수 있습니다. 교회는 절대 암호나 API 키를 공유하지 않습니다. **연결된 앱**은 교회 관리자가 승인한 OAuth 토큰입니다. 한 번의 클릭으로 철회하면 타사 앱의 액세스가 끝납니다. 멀티테넌트 SaaS 커넥터에 이 경로를 사용합니다. 단일 교회 통합의 경우 [API 키](./api-keys)를 선호합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- OAuth **클라이언트**를 등록해야 합니다(현재 B1 서버 관리자로) 교회가 액세스 권한을 부여할 수 있도록
- 모든 OAuth 끝점은 Membership 모듈에 있습니다: `/membership/oauth/...`
- 액세스 토큰은 JWT입니다 -- 사용자의 권한을 승인된 범위로 필터링하여 전달합니다

</div>

## 개념

| 용어 | 의미 |
|---|---|
| **OAuth 클라이언트** | 타사 앱 자체 -- `client_id`, `client_secret`으로 식별되고 보호됩니다. B1과 함께 한 번 등록되고 설치하는 모든 교회 간에 공유됩니다. |
| **연결된 앱** | 관리자가 액세스 권한을 부여한 특정 `(client, church-admin)` 쌍입니다. 각 연결된 앱은 OAuth 새로고침 토큰으로 지원됩니다. |
| **액세스 토큰** | 클라이언트가 API 호출에 사용하는 수명이 짧은 JWT(≈ 7일)입니다. 사용자 JWT와 동일한 모양 -- `Authorization: Bearer <jwt>`. |
| **새로고침 토큰** | 클라이언트가 새로운 액세스 토큰을 발급하는 데 사용하는 수명이 긴 불투명 문자열(≈ 90일)입니다. |
| **범위** | 액세스 토큰이 수행할 수 있는 작업을 좁힙니다 -- [범위 카탈로그](./api-keys#scopes)를 참고합니다. |

## 부여 흐름

B1은 RFC 6749 + RFC 8628로 정의된 3개의 OAuth 흐름을 지원합니다.

### 인증 코드 (웹 앱)

앱이 서버 측 구성 요소를 가지고 `client_secret`을 비공개로 유지할 수 있는 경우 사용합니다.

1. **권한 부여**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   `{ "code": "...", "state": "xyz" }`를 반환합니다. 권한 부여 코드 끝점은 의도적으로 인증된 POST입니다 -- 앱이 사용자의 B1 JWT를 수집(일반적으로 사용자의 B1 세션에서 버튼을 호스팅하여)하고 동의 단계의 일부로 전달합니다.

2. **코드를 토큰과 교환**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   토큰 응답을 반환합니다:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. 액세스 토큰이 만료될 때까지 **새로고침**:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   새로고침 토큰은 90일의 미사용 후 만료됩니다. 만료되면 교회 관리자가 다시 권한을 부여합니다.

### 기기 코드 (TV, 키오스크, CLI)

기기에 브라우저가 없는 경우 사용합니다. RFC 8628로 정의됩니다.

1. **기기 코드 요청**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   사용자 면향 코드 및 폴링 간격을 반환합니다:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. 사용자에게 `user_code` + `verification_uri`를 표시합니다.

3. **폴링** `/membership/oauth/token`을 `grant_type=urn:ietf:params:oauth:grant-type:device_code`와 `device_code`로 폴링합니다. 표준 응답:

   | 오류 | 의미 |
   |---|---|
   | `authorization_pending` | 사용자가 아직 승인하지 않았습니다 -- 제안된 간격으로 계속 폴링합니다 |
   | `expired_token` | 기기 코드가 `expires_in`을 지났습니다 -- 처음부터 시작합니다 |
   | `access_denied` | 사용자가 요청을 거부했습니다 |
   | _(없음 -- 200 OK)_ | 승인됨 -- 본문은 `B1TokenResponse`입니다 |

4. 승인되면 `refresh_token`을 저장하고 `access_token`이 만료될 때까지 사용합니다.

B1 SDK는 `B1OAuthClient.awaitDeviceToken(...)`를 포함하여 합리적인 RFC 준수 백오프를 사용하여 폴링 루프를 실행합니다.

### 새로고침 토큰

`refresh_token`을 보유하면 언제든지 독립 실행형 요청으로 사용할 수 있습니다:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

새 `access_token`과 `refresh_token`이 돌아옵니다. **공개 클라이언트**(위험 없음) 새로고침 시 `client_secret`을 생략할 수 있습니다 -- 비밀을 유지할 수 없는 모바일/데스크톱 OAuth 앱에 유용합니다.

## 토큰 모양

액세스 토큰은 B1이 발급한 JWT이며 사용자가 `POST /membership/users/login`에서 얻을 것과 동일합니다 -- 동일한 모듈식 권한 청구, 모든 컨트롤러에서 동일한 `checkAccess` 동작 -- **제외**하고 권한 배열이 발급 시점에 승인된 범위를 통해 필터링되었습니다. 범위가 지정된 액세스 토큰은 범위가 비슷한 API 키가 수행할 수 없는 작업을 수행할 수 없으며, 모든 컨트롤러에 별도의 "OAuth 경로"가 없습니다. `actionWrapper`는 bearer가 사람, API 키 또는 OAuth 클라이언트인지 인식하지 못합니다.

## 연결된 앱 (사용자 면향)

교회 관리자의 관점에서 "연결된 앱"은 액세스 권한을 부여받은 앱의 목록입니다. 각 행은 라이브 `(OAuthClient, OAuthToken)` 쌍입니다.

B1 Admin에서: **설정 → 개발자 → 연결된 앱**은 다음을 표시합니다:

- 클라이언트 이름
- 관리자가 승인한 범위
- 액세스 권한이 부여된 날짜
- **철회** 버튼

| 방법 및 경로 | 인증 | 목적 |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | 호출자 자신의 활성 연결 나열 (클라이언트 이름 + 범위와 결합) |
| `DELETE /membership/oauth/connections/:id` | JWT | OAuth 토큰 ID로 연결 철회 -- 다음 요청에서 토큰이 작동 중지 |

목록은 만료된 토큰을 자동으로 제외합니다.

## 범위 & 동의

범위 문자열은 [API 키](./api-keys#scopes)의 동일한 카탈로그입니다. 클라이언트의 모범 사례:

- **작동하는 가장 좁은 범위를 요청합니다.** 교회는 `people`을 읽기만 필요할 때 `donations:write`를 요청하는 것에 주목합니다.
- **새로고침 토큰 및 수명이 짧은 액세스 토큰을 사용합니다.** 수명이 긴 액세스 토큰은 빠르게 철회하기가 더 어렵습니다.
- **항상 자신의 UI에서 부여된 범위를 사용자에게 다시 제시합니다** 동의한 내용을 확인할 수 있도록.

## OAuth 클라이언트 관리

OAuth 클라이언트(타사 앱 자체)는 현재 B1 서버 관리자로 전역적으로 등록됩니다. 교회당 자동 등록은 로드맵에 있습니다 -- 그때까지 공개 커넥터를 배포하려면 `client_id` / `client_secret` 쌍을 발급받고 리디렉션 URI를 등록하기 위해 ChurchApps 팀에 문의합니다.

| 방법 및 경로 | 권한 | 설명 |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | 모든 OAuth 클라이언트 나열 |
| `GET /membership/oauth/clients/clientId/:clientId` | — | 공개 ID로 클라이언트 가져오기 (비밀 숨김) |
| `POST /membership/oauth/clients` | Server.Admin | 클라이언트 생성 또는 업데이트 |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | 클라이언트 삭제 |

## SDK 지원

`@churchapps/integration-sdk` 패키지는 모든 OAuth 흐름을 타입화된 헬퍼로 래핑합니다 -- `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. 패키지 README 및 [웹훅](./webhooks#sdk-support)에서 전체 예제를 참고합니다.
