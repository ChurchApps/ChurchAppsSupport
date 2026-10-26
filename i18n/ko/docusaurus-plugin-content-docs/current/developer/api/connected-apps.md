---
title: "연결된 앱 및 OAuth"
---

# 연결된 앱 및 OAuth

<div class="article-intro">

B1 API는 OAuth 2.0을 지원하므로, 타사 애플리케이션은 교회가 비밀번호나 API 키를 공유하지 않고도 각 교회 관리자에게 데이터 접근 권한을 요청할 수 있습니다. **연결된 앱**은 교회 관리자가 승인한 OAuth 토큰이며, 이를 해지하면 클릭 한 번으로 타사 앱의 접근이 끊깁니다. 여러 교회를 대상으로 하는 SaaS 커넥터에 이 방식을 사용하세요. 단일 교회 연동에는 [API 키](./api-keys)를 권장합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 교회가 접근을 승인하기 전에 OAuth **클라이언트**가 등록되어 있어야 합니다. B1 서버 관리자가 등록하거나, 클라이언트가 [동적 등록](#dynamic-client-registration)으로 직접 등록할 수 있습니다.
- 모든 OAuth 엔드포인트는 Membership 모듈 아래의 `/membership/oauth/...`에 있습니다.
- 액세스 토큰은 JWT입니다. 사용자의 권한을 담고 있으며, 부여된 범위로 필터링됩니다.

</div>

## 개념

| 용어 | 의미 |
|---|---|
| **OAuth 클라이언트** | 타사 앱 자체입니다. `client_id`로 식별되고 `client_secret`으로 보호됩니다. B1에 한 번 등록되며, 이를 설치하는 모든 교회가 공유합니다. |
| **연결된 앱** | 특정 `(클라이언트, 교회 관리자)` 쌍으로, 관리자가 클라이언트에 접근을 허용한 상태입니다. 각 연결된 앱은 OAuth 갱신 토큰으로 뒷받침됩니다. |
| **액세스 토큰** | 클라이언트가 API 호출에 사용하는 짧은 수명의 JWT(약 7일)입니다. 사용자 JWT와 같은 형태이며 `Authorization: Bearer <jwt>`로 전달합니다. |
| **갱신 토큰** | 클라이언트가 새 액세스 토큰을 발급받는 데 사용하는 긴 수명의 불투명 문자열(약 90일)입니다. |
| **범위(스코프)** | 액세스 토큰이 할 수 있는 일을 좁힙니다. [범위 목록](./api-keys#scopes)을 참고하세요. |

## 권한 부여 흐름

B1은 세 가지 OAuth 흐름을 지원하며, 모두 RFC 6749와 RFC 8628에 정의되어 있습니다.

### 인증 코드 (웹 앱)

앱에 서버 측 구성 요소가 있고 `client_secret`을 비공개로 유지할 수 있을 때 사용합니다.

1. **승인**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   공개 클라이언트(`client_secret`이 없는 경우)는 `"code_challenge": "..."`와 `"code_challenge_method": "S256"`(PKCE, RFC 7636)도 보내야 합니다. `S256`만 허용됩니다.

   응답은 `{ "code": "...", "state": "xyz" }`입니다. 인증 코드 엔드포인트는 의도적으로 인증된 POST입니다. 앱은 사용자의 B1 JWT를 수집하고(보통 B1 세션 안에 버튼을 호스팅하는 방식), 동의 단계의 일부로 이를 전달합니다.

2. **코드를 토큰으로 교환**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   승인 단계에서 `code_challenge`를 보냈다면, 일치하는 `"code_verifier": "..."`를 포함하세요. 공개 클라이언트는 verifier를 보내고 `client_secret`은 생략합니다. 토큰 엔드포인트는 JSON 또는 폼 인코딩(`application/x-www-form-urlencoded`) 본문을 받습니다.

   토큰 응답은 다음과 같습니다.

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

3. **갱신** -- 액세스 토큰이 곧 만료될 때:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   갱신 토큰은 90일 동안 사용하지 않으면 만료되며, 만료된 경우 교회 관리자가 다시 승인해야 합니다.

### 디바이스 코드 (TV, 키오스크, CLI)

장치에 브라우저가 없을 때 사용합니다. RFC 8628에 정의되어 있습니다.

1. **디바이스 코드 요청**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   사용자에게 보여줄 코드와 폴링 간격을 반환합니다.

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. `user_code`와 `verification_uri`를 사용자에게 표시합니다.

3. `grant_type=urn:ietf:params:oauth:grant-type:device_code`와 `device_code`로 `/membership/oauth/token`을 **폴링**합니다. 표준 응답은 다음과 같습니다.

   | 오류 | 의미 |
   |---|---|
   | `authorization_pending` | 사용자가 아직 승인하지 않았습니다. 권장 간격으로 계속 폴링하세요 |
   | `expired_token` | 디바이스 코드가 `expires_in`을 지났습니다. 처음부터 다시 시작하세요 |
   | `access_denied` | 사용자가 요청을 거부했습니다 |
   | _(없음 — 200 OK)_ | 승인됨. 본문은 `B1TokenResponse`입니다 |

4. 승인되면 `refresh_token`을 저장하고, 만료될 때까지 `access_token`을 사용합니다.

B1 SDK의 `B1OAuthClient.awaitDeviceToken(...)`은 RFC를 준수하는 적절한 백오프로 폴링 루프를 대신 실행해 줍니다.

### 갱신 토큰

`refresh_token`을 가지고 있다면 언제든 독립된 요청으로 사용할 수 있습니다.

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

새 `access_token`과 `refresh_token`이 반환됩니다. **공개 클라이언트**(`client_secret`이 없는 경우)는 갱신할 때 `client_secret`을 생략할 수 있습니다. 비밀을 유지할 수 없는 모바일이나 데스크톱 OAuth 앱에 유용합니다.

갱신 토큰은 회전하지만, 이전 토큰은 즉시 폐기되지 않습니다. 클라이언트가 갱신 응답을 받지 못했다면(예: 요청 도중 전원이나 Wi-Fi가 끊긴 TV), 이전 `refresh_token`으로 최대 **7일** 동안 재시도할 수 있습니다. 재시도는 교체된 토큰이 아직 사용되지 않은 동안에만 성공하며, 사용되지 않은 교체 토큰은 폐기되고 새 토큰 쌍이 발급됩니다. 교체된 토큰이 이미 갱신되었다면 이전 토큰은 `invalid_grant`를 반환합니다. 연결을 해지하면 해당 유예 기간에 남아 있는 회전된 토큰도 함께 해지되며, 연결된 앱 목록에는 각 연결이 한 번만 표시됩니다.

## 토큰 형태

액세스 토큰은 사용자가 `POST /membership/users/login`에서 받는 것과 동일한 B1 발급 JWT입니다. 같은 모듈형 권한 클레임을 가지며, 모든 컨트롤러에서 `checkAccess` 동작도 같습니다. **다만** 권한 배열은 발급 시점에 부여된 범위로 필터링되어 있습니다. 범위가 제한된 액세스 토큰은 비슷한 범위의 API 키가 할 수 없는 일을 할 수 없으며, 컨트롤러에 별도의 "OAuth 경로"는 없습니다. `actionWrapper`는 Bearer 토큰 소유자가 사람인지, API 키인지, OAuth 클라이언트인지 알지 못합니다.

## 연결된 앱 (사용자 관점)

교회 관리자 입장에서 "연결된 앱"은 교회에 접근 권한이 부여된 앱의 목록입니다. 각 행은 살아 있는 `(OAuthClient, OAuthToken)` 쌍입니다.

B1Admin에서 **설정 → 개발자 → 연결된 앱**에는 다음이 표시됩니다.

- 클라이언트 이름
- 관리자가 승인한 범위
- 접근 권한이 부여된 날짜
- **해지** 버튼

| 메서드와 경로 | 인증 | 용도 |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | 호출자 본인의 활성 연결 목록 조회(클라이언트 이름 및 범위와 결합) |
| `DELETE /membership/oauth/connections/:id` | JWT | OAuth 토큰 ID로 연결 해지. 토큰은 다음 요청부터 작동하지 않습니다 |

목록에서는 만료된 토큰이 자동으로 제외됩니다.

## 범위와 동의

범위 문자열은 [API 키](./api-keys#scopes)와 같은 목록을 사용합니다. 클라이언트를 위한 권장 사항은 다음과 같습니다.

- **작동하는 범위 중 가장 좁은 범위를 요청하세요.** 사람 정보만 읽으면 되는데 `donations:write`를 요청하면 교회가 알아챕니다.
- **갱신 토큰과 짧은 수명의 액세스 토큰을 함께 사용하세요.** 장기 액세스 토큰은 빠르게 해지하기 어렵습니다.
- **부여된 범위를 항상 사용자에게 다시 보여주세요.** 사용자가 동의한 내용을 자신의 UI에서 확인할 수 있어야 합니다.

## OAuth 클라이언트 관리

OAuth 클라이언트(타사 앱 자체)는 전역으로 등록됩니다. `client_secret`이 있는 기밀 클라이언트는 B1 서버 관리자가 발급합니다. 이를 배포하려면 ChurchApps 팀에 연락해 `client_id` / `client_secret` 쌍을 받고 리다이렉트 URI를 등록하세요. MCP 커넥터 같은 공개 클라이언트는 아래와 같이 직접 등록할 수 있습니다.

등록된 리다이렉트 URI는 요청의 `redirect_uri`와 정확히 일치해야 합니다. 접두사 일치나 부분 일치는 거부됩니다.

| 메서드와 경로 | 권한 | 설명 |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | 모든 OAuth 클라이언트 목록 조회 |
| `GET /membership/oauth/clients/clientId/:clientId` | — | 공개 ID로 클라이언트 조회(비밀 값은 가려짐) |
| `POST /membership/oauth/clients` | Server.Admin | 클라이언트 생성 또는 업데이트 |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | 클라이언트 삭제 |

### 동적 클라이언트 등록

`POST /membership/oauth/register`(공개, RFC 7591)는 claude.ai의 MCP 커넥터 같은 클라이언트가 스스로 등록할 수 있게 합니다. API의 `/.well-known/oauth-authorization-server` 문서에 광고되어 있습니다. [MCP 서버 → OAuth 디스커버리](./mcp#oauth-discovery)를 참고하세요.

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

201 응답과 함께 `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types`(`authorization_code`, `refresh_token`), `response_types`(`code`), `token_endpoint_auth_method: "none"`을 반환합니다.

- 비밀 값은 발급되지 않으므로, 클라이언트는 모든 승인에 PKCE를 사용해야 합니다.
- `redirect_uris`는 1~10개의 `https` URL이어야 하며, `localhost`, `127.0.0.1`, `[::1]`에 대해서만 `http`가 허용됩니다.
- `client_name`은 45자로 잘리며(기본값 "AI assistant"), 기본값이 사용됩니다.
- IP당 시간당 20회 등록으로 제한됩니다.

B1Admin 동의 페이지에서 자체 등록된 클라이언트에는 스스로 등록했다는 안내가 표시됩니다. 이 클라이언트는 사용자의 B1 계정이 할 수 있는 것 이상은 할 수 없으며, **설정 → 개발자 → 연결된 앱**에서 연결을 끊을 수 있습니다.

## SDK 지원

`@churchapps/integration-sdk` 패키지는 모든 OAuth 흐름을 타입이 지정된 헬퍼로 감쌉니다. `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`이 있습니다. 패키지 README와 [웹훅](./webhooks#sdk-support)의 종단 간 예제를 참고하세요.
