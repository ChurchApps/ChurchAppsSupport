---
title: "MCP 서버"
---

# MCP 서버 {#mcp-server}

<div class="article-intro">

B1 API는 `/mcp`에서 [MCP(Model Context Protocol)](https://modelcontextprotocol.io) 서버를 제공합니다. claude.ai 사용자 지정 커넥터, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor 등 MCP를 지원하는 모든 AI 클라이언트, 또는 직접 만든 클라이언트가 여기에 연결하여 인증된 교회 사용자를 대신해 기반 REST API를 호출할 수 있습니다. 얇고 범용적인 래퍼이므로, 엔드포인트마다 모델을 직접 만드는 대신 세 개의 범용 도구로 API 전체를 동적으로 노출합니다. 웹사이트 빌더를 위한 도메인 가이드 도구도 하나 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 클라이언트가 가져야 할 범위가 부여된 [B1 API 키](./api-keys)(`cak_…`), 또는 OAuth로 로그인할 수 있는 MCP 클라이언트([OAuth 검색](#oauth-discovery) 참조)
- 접근 가능한 B1 API 호스트 — 호스팅 교회라면 `https://api.churchapps.org`, 또는 직접 배포한 서버
- MCP 클라이언트. 최종 사용자 설정은 [Claude](/docs/b1-admin/integrations/claude)와 [ChatGPT](/docs/b1-admin/integrations/chatgpt)를 참조하세요.

</div>

## 엔드포인트 {#endpoint}

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| 항목 | 값 |
|---|---|
| **경로** | `/mcp`(API 호스트 기준 상대 경로) |
| **메서드** | `POST`만 — 요청/응답과 SSE 스트리밍 모두 같은 엔드포인트에서 이루어짐 |
| **전송** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **세션 모델** | 무상태. 요청마다 새 MCP 서버 인스턴스를 만듦. 세션 ID도, 재개도 없음 |
| **인증** | Bearer 토큰. `cak_…` API 키와 B1 JWT(OAuth 액세스 토큰 포함) 모두 작동하며, 확인 방식은 다른 인증 엔드포인트와 같음 |

`Authorization` 헤더가 없거나 유효하지 않은 요청에는 다음이 반환됩니다.

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

HTTP 401과 함께 `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"` 헤더가 포함되며, OAuth를 지원하는 클라이언트는 이 헤더를 따라 로그인을 시작합니다.

## 도구 {#tools}

범용 도구 세 개와 가이드 하나가 있습니다. 모델은 탐색에 `list_endpoints`를, 페이로드 형태를 알아보는 데 `describe_endpoint`를, 실제 API 호출에 `api_call`을 사용하며, 작업이 웹사이트 콘텐츠와 관련되면 `describe_page_builder`를 사용합니다.

### `list_endpoints`

등록된 모든 REST 라우트 목록을 반환하며, 선택적 부분 문자열이나 HTTP 동사로 걸러낼 수 있습니다. 각 항목에는 컨트롤러 이름과 필요할 가능성이 높은 API 키 범위가 포함됩니다.

**입력:**

| 필드 | 유형 | 설명 |
|---|---|---|
| `filter` | string (선택) | 경로와 대소문자를 구분하지 않고 매칭되는 부분 문자열(예: `"people"`) |
| `method` | enum (선택) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**출력:** 다음 형태의 JSON 문서

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

목록은 API 시작 시 실시간 라우트 테이블에서 한 번 만들어집니다. `curl`로 접근할 수 있는 모든 경로가 여기에 나타납니다.

### `describe_endpoint`

요약을 반환하며, 가능한 경우 한 엔드포인트에 대해 직접 큐레이션한 요청 본문과 응답 샘플도 함께 반환합니다.

**입력:**

| 필드 | 유형 | 설명 |
|---|---|---|
| `method` | string | HTTP 동사 |
| `path` | string | `list_endpoints`가 반환한 전체 경로 |

**출력:** 큐레이션된 엔드포인트의 경우 `summary`, `requestBody`, `responseSample`이 포함된 예시를 반환합니다. 큐레이션되지 않은 엔드포인트의 경우 모델에게 형태를 알아보려면 먼저 `GET`을 호출하라고 안내하는 대체 메시지를 반환합니다. 트래픽이 많은 열두 개 정도의 라우트(사람, 그룹, 헌금, 출석, 재정 항목)가 큐레이션되어 있습니다.

### `api_call`

선택된 REST 엔드포인트를 일반 HTTP 요청과 같은 Express 미들웨어 스택을 통해 프로세스 내부에서 호출합니다. 인증, 본문 파싱, 감사 로깅, 교회별 범위 지정이 모두 적용됩니다.

**입력:**

| 필드 | 유형 | 설명 |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | 모듈 접두사를 포함한 경로. 예: `/membership/people` |
| `query` | object (선택) | 쿼리스트링 매개변수의 평면 객체 |
| `body` | any (선택) | JSON 요청 본문. 보통 `POST`에는 모델 객체의 배열 |

**출력:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

상태 코드가 400 이상인 응답에는 도구 결과에 `isError: true`가 표시됩니다.

### `describe_page_builder`

범용이 아닌 유일한 도구입니다. `/content/*` 엔드포인트를 통해 웹사이트 페이지를 만드는 정적이고 독립적인 가이드입니다. Page → Section → Element 데이터 모델, 생성 작업 흐름, 각 `elementType`과 그 `answersJSON` 형태, `dividerTop`/`dividerBottom` 모양 구분선 같은 섹션 수준 설정, 그리고 끝까지 따라가 볼 수 있는 예시를 담고 있습니다. 입력은 없으며, B1Admin 편집기에서 관리하는 요소 카탈로그를 그대로 반영합니다([웹사이트 빌더 아키텍처](../architecture/website-builder) 참조). 에이전트는 페이지 콘텐츠를 만들거나 편집하기 전에 이 도구를 한 번 호출한 다음, `api_call`로 작업하도록 되어 있습니다.

## 인증 모델 {#auth-model}

MCP 요청 자체는 `CustomAuthProvider.getUser()`를 거칩니다. 인증된 모든 B1 엔드포인트가 사용하는 것과 같은 경로입니다. `cak_…` 베어러는 `Principal`로 확인되며, 그 권한은 키를 발급한 사람의 현재 RBAC와 키에 부여된 범위의 **교집합**입니다. 이 교집합은 요청마다 다시 계산되므로 다음과 같습니다.

- 키에서 범위를 제거하면(삭제 후 다시 만들어서) 다음 호출부터 접근이 끊깁니다.
- B1Admin에서 기반이 되는 사람의 권한을 제거하면, 키가 여전히 존재하더라도 다음 호출부터 접근이 끊깁니다.

중첩된 `api_call` 호출의 경우, 원래의 `Authorization` 헤더가 가상 요청에 복사되므로, `CustomAuthProvider`가 다시 실행되고 범위 교집합이 호출마다 다시 적용됩니다. 토큰 캐싱은 없습니다.

## 경로 차단 목록 {#path-blocklist}

유효한 키가 있더라도 `api_call`로 접근할 수 없는 라우트가 몇 개 있습니다.

| 패턴 | 이유 |
|---|---|
| `/giving/donate/webhook/*` | 제공업체 웹훅 엔드포인트는 Stripe/PayPal에서 서명이 검증된 원본 본문을 기대하며, 일반 호출자용이 아님 |
| `/membership/oauth/clients*` | OAuth 클라이언트 등록은 운영자 전용 |
| `/membership/people/apiEmails` | 사용자 권한이 아니라 운영자의 `jwtSecret`으로 보호됨 |
| `multipart/form-data`를 기대하는 모든 라우트 | 파일 업로드는 JSON-RPC에 잘 맞지 않음 |

차단된 경로는 설명 메시지가 담긴 `isError: true` 도구 결과를 반환하며, 기반 라우트는 절대 호출되지 않습니다.

## 응답 크기 제한 {#response-size-cap}

`api_call` 응답 본문은 캡처된 출력 기준 **64KB**로 제한됩니다. 쿼리가 제한을 넘으면 응답에 `"truncated": true`가 포함되며, 모델은 더 좁은 쿼리 매개변수로 다시 시도해야 합니다. 이렇게 하면 도구 응답 하나가 클라이언트의 컨텍스트 창을 넘치게 하지 않습니다.

## 속도 제한 {#rate-limiting}

`/mcp`에는 애플리케이션 수준의 속도 제한이 없습니다. 운영 환경에서는 API Gateway / Lambda 동시성에서, 자체 호스팅 배포에서는 리버스 프록시가 적용하는 제한에서 조절합니다.

## OAuth 검색 {#oauth-discovery}

MCP 서버는 OAuth 2.1 메타데이터를 알리므로, OAuth 검색으로 발견된 서버에만 연결하는 클라이언트 — 특히 Claude.ai의 "사용자 지정 커넥터 추가" UI — 는 키를 붙여 넣지 않고도 사용자를 로그인시킬 수 있습니다. `/mcp`가 보호된 리소스이고, `/membership/oauth` 아래의 기존 [OAuth 제공자](./connected-apps)가 권한 서버이며, B1Admin의 `/oauth` 페이지가 동의 화면입니다.

| 엔드포인트 | 용도 |
|---|---|
| `GET /.well-known/oauth-protected-resource`(`/.well-known/oauth-protected-resource/mcp`도 가능) | 보호된 리소스 메타데이터(RFC 9728): `resource`는 `<api>/mcp`, `authorization_servers`는 API 루트, `scopes_supported`는 모든 [API 키 범위](./api-keys#scopes)를 나열 |
| `GET /.well-known/oauth-authorization-server` | 권한 서버 메타데이터(RFC 8414): `authorization_endpoint`는 B1Admin `/oauth`, `token_endpoint`는 `/membership/oauth/token`, `registration_endpoint`는 `/membership/oauth/register` |
| `POST /membership/oauth/register` | 동적 클라이언트 등록(RFC 7591) |

claude.ai 같은 클라이언트가 실행하는 흐름은 다음과 같습니다.

1. 토큰 없이 `POST /mcp`를 호출하면 보호된 리소스 메타데이터를 가리키는 `WWW-Authenticate` 헤더와 함께 401이 반환됩니다.
2. 클라이언트는 두 메타데이터 문서를 읽은 다음, `client_name`, `redirect_uris`, 선택적으로 `scope`를 담아 `POST /membership/oauth/register`로 스스로 등록합니다. 스스로 등록한 모든 클라이언트는 **공개** 클라이언트입니다. 비밀 값은 발급되지 않으며, 응답에는 `token_endpoint_auth_method: "none"`이 포함됩니다. 리디렉션 URI는 `https`이거나 루프백 주소(`localhost`, `127.0.0.1`, `[::1]`)의 `http`여야 하며, 클라이언트당 최대 10개입니다. 등록은 IP당 시간당 20회로 속도가 제한됩니다.
3. 사용자는 `code_challenge`와 `code_challenge_method=S256`을 담아 B1Admin `/oauth`로 이동합니다. 동의 페이지는 요청된 각 범위를 쉬운 말로 나열하고(요청된 범위가 없다면 "B1 계정이 접근할 수 있는 모든 것"), 사용자가 돌아갈 호스트를 보여 주며, 앱이 스스로 등록했음을 알립니다. 사용자가 **허용**을 클릭합니다.
4. 클라이언트는 `grant_type=authorization_code`와 자신의 `code_verifier`를 담아 `/membership/oauth/token`에서 코드를 교환하고, 이후 `grant_type=refresh_token`으로 갱신합니다. 폼 인코딩과 JSON 본문을 모두 받습니다.
5. 결과로 얻은 액세스 토큰은 범위가 지정된 B1 JWT이며, `/mcp`에서 베어러로 사용됩니다.

PKCE 규칙: `S256`만 허용됩니다. 비밀이 없는 클라이언트는 인증 단계에서 `code_challenge`를, 토큰 교환 단계에서 일치하는 `code_verifier`를 보내야 합니다. 기밀 클라이언트(비밀이 있는 클라이언트)는 여전히 비밀만 사용할 수 있습니다. 리디렉션 URI는 등록된 URI와 정확히 일치해야 합니다.

구성에서 정적 베어러 토큰을 받아들이는 클라이언트 — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, 사용자 지정 코드 — 는 `cak_…` 키를 계속 사용할 수 있습니다.

## 로컬 개발 {#local-development}

API를 로컬에서 실행하면 MCP 엔드포인트가 다른 모든 것과 함께 마운트됩니다.

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

시작 시 `📡 MCP server ready at /mcp — N routes in inventory` 로그 줄이 나타나면 목록이 만들어진 것입니다.

MCP Inspector로 확인해 보세요.

```bash
npx @modelcontextprotocol/inspector
```

Inspector UI에서 `http://localhost:8084/mcp`를 가리키고 `Authorization` 헤더를 `Bearer cak_<prefix>.<secret>`로 설정합니다. 먼저 `list_endpoints`를 호출하면 전체 라우트 목록이 보여야 합니다. 그다음 `api_call({ method: "GET", path: "/membership/people" })`를 호출하면 로컬 시드 사람 데이터가 반환되어야 합니다.

## 코드 구조 {#code-layout}

MCP 서버는 Api 저장소의 `src/modules/mcp/`에 있습니다. 주요 파일은 다음과 같습니다.

| 파일 | 용도 |
|---|---|
| `McpController.ts` | `@controller("/mcp")`. 요청마다 `StreamableHTTPServerTransport`를 연결하고, 401 시 `WWW-Authenticate` 챌린지를 보냄 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | `/.well-known` OAuth 검색 문서를 제공 |
| `McpServer.ts` | MCP `Server`를 만들고 네 개의 도구를 등록 |
| `RouteInventory.ts` | 시작 시 inversify-express-utils 메타데이터를 순회하여 라우트를 열거 |
| `internalDispatch.ts` | 프로세스 내부에서 Express 앱을 다시 진입하는 가상 `req`/`res` |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | 트래픽이 많은 엔드포인트의 큐레이션된 요청/응답 샘플 |

## 관련 문서 {#related}

- [API 키](./api-keys)
- [웹훅](./webhooks)
- [연결된 앱(OAuth)](./connected-apps)
- [Claude — 최종 사용자 설정](/docs/b1-admin/integrations/claude)
- [ChatGPT — 최종 사용자 설정](/docs/b1-admin/integrations/chatgpt)
