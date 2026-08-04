---
title: "MCP 서버"
---

# MCP 서버

<div class="article-intro">

B1 API는 `/mcp`에 [MCP(Model Context Protocol)](https://modelcontextprotocol.io) 서버를 제공합니다. Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, 또는 자체 구축한 것이든 MCP를 인식하는 모든 AI 클라이언트가 여기에 연결하여 인증된 교회 사용자를 대신해 기본 REST API를 호출할 수 있습니다. 이것은 가볍고 범용적인 래퍼입니다: 세 개의 범용 도구가 각 엔드포인트를 개별적으로 모델링하는 대신 전체 API 표면을 동적으로 노출하며, 여기에 웹사이트 빌더를 위한 도메인 가이드 도구가 하나 더해집니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 클라이언트가 가져야 할 범위를 가진 [B1 API 키](./api-keys)(`cak_…`)
- 도달 가능한 B1 API 호스트 -- 호스팅된 교회의 경우 `https://api.churchapps.org`, 또는 자체 배포본
- MCP 클라이언트. 최종 사용자 설정은 [Claude](/docs/b1-admin/integrations/claude) 및 [ChatGPT](/docs/b1-admin/integrations/chatgpt) 참조

</div>

## 엔드포인트

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| 항목 | 값 |
|---|---|
| **경로** | `/mcp`(API 호스트 기준 상대 경로) |
| **메서드** | `POST`만 -- 요청/응답과 SSE 스트리밍 모두 동일한 엔드포인트에서 발생 |
| **전송** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **세션 모델** | 상태 비저장(Stateless). 요청마다 새로운 MCP 서버 인스턴스가 만들어짐 -- 세션 ID 없음, 재개(resumption) 없음 |
| **인증** | Bearer 토큰. `cak_…` API 키와 B1 JWT 모두 작동하며, 처리 방식은 다른 인증된 엔드포인트와 동일 |

`Authorization` 헤더가 누락되었거나 유효하지 않은 요청은 다음을 반환합니다.

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

HTTP 401과 함께 반환됩니다.

## 도구

세 개의 범용 도구와 하나의 가이드가 있습니다. 모델은 검색을 위해 `list_endpoints`를, 페이로드 형태를 파악하기 위해 `describe_endpoint`를, 실제로 API를 호출하기 위해 `api_call`을, 작업이 웹사이트 콘텐츠와 관련될 때 `describe_page_builder`를 사용합니다.

### `list_endpoints`

등록된 REST 경로의 전체 목록을 반환하며, 선택적으로 부분 문자열 및/또는 HTTP 동사로 필터링할 수 있습니다. 각 항목에는 컨트롤러 이름과 가장 필요할 가능성이 높은 API 키 범위가 포함됩니다.

**입력:**

| 필드 | 타입 | 설명 |
|---|---|---|
| `filter` | string(선택) | 경로와 대소문자 구분 없이 일치시키는 부분 문자열, 예: `"people"` |
| `method` | enum(선택) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

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

이 목록은 API 시작 시 실제 라우트 테이블로부터 한 번 생성됩니다 -- `curl`로 도달할 수 있는 모든 것이 여기에 나타납니다.

### `describe_endpoint`

하나의 엔드포인트에 대해 간단한 요약과, 가능한 경우 사람이 직접 큐레이션한 요청 본문 및 응답 샘플을 반환합니다.

**입력:**

| 필드 | 타입 | 설명 |
|---|---|---|
| `method` | string | HTTP 동사 |
| `path` | string | `list_endpoints`가 반환한 전체 경로 |

**출력:** 큐레이션된 엔드포인트의 경우 `summary`, `requestBody`, `responseSample`이 포함된 예시. 큐레이션되지 않은 엔드포인트의 경우, 모델에게 형태를 확인하기 위해 먼저 `GET`을 호출하도록 지시하는 대체 메시지가 반환됩니다. 트래픽이 많은 약 12개의 경로(사람, 그룹, 헌금, 출석, 펀드)가 큐레이션되어 있습니다.

### `api_call`

선택한 REST 엔드포인트를, 일반 HTTP 요청과 동일한 Express 미들웨어 스택을 통해 프로세스 내에서 호출합니다 -- 인증, 본문 파싱, 감사 로깅, 교회별 스코핑이 모두 그대로 적용됩니다.

**입력:**

| 필드 | 타입 | 설명 |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | 모듈 접두어를 포함한 경로, 예: `/membership/people` |
| `query` | object(선택) | 쿼리 문자열 파라미터의 평면 객체 |
| `body` | any(선택) | JSON 요청 본문 -- 일반적으로 `POST`용 모델 객체 배열 |

**출력:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

상태 코드가 400 이상인 모든 응답에 대해 도구 결과는 `isError: true`로 표시됩니다.

### `describe_page_builder`

유일한 비범용 도구입니다: `/content/*` 엔드포인트를 통해 웹사이트 페이지를 구축하는 방법에 대한 정적이고 자체 완결적인 가이드입니다 -- Page → Section → Element 데이터 모델, 생성 워크플로, `answersJSON` 형태를 가진 각 `elementType`, `dividerTop`/`dividerBottom` 모양 구분선 같은 섹션 수준 설정, 그리고 완결된 엔드투엔드 예제까지 다룹니다. 입력을 받지 않으며 B1Admin 에디터에서 유지 관리되는 요소 카탈로그를 그대로 반영합니다([웹사이트 빌더 아키텍처](../architecture/website-builder) 참조). 에이전트는 페이지 콘텐츠를 생성하거나 편집하기 전에 이 도구를 한 번 호출한 다음 `api_call`을 통해 작업을 수행해야 합니다.

## 인증 모델

MCP 요청 자체는 `CustomAuthProvider.getUser()`를 통해 실행됩니다 -- 인증이 필요한 다른 모든 B1 엔드포인트와 동일한 경로입니다. `cak_…` Bearer 토큰은 발급자의 현재 RBAC 권한과 키에 부여된 범위를 **교집합**한 `Principal`로 해석됩니다. 이 교집합은 매 요청마다 다시 계산되므로:

- 키에서 범위를 제거하면(삭제 후 재생성) 다음 호출부터 접근이 차단됩니다.
- B1Admin에서 해당 사람의 권한을 제거하면 키가 여전히 존재하더라도 다음 호출부터 접근이 차단됩니다.

중첩된 `api_call` 호출의 경우, 원본 `Authorization` 헤더가 합성 요청에 그대로 복사되므로 `CustomAuthProvider`가 다시 실행되고 범위 교집합도 호출마다 다시 적용됩니다. 토큰 캐싱은 없습니다.

## 경로 차단 목록

유효한 키가 있어도 `api_call`을 통해 도달할 수 없는 소수의 경로가 있습니다.

| 패턴 | 이유 |
|---|---|
| `/giving/donate/webhook/*` | 결제 제공사 웹훅 엔드포인트는 Stripe/PayPal로부터 원시(raw)의, 서명 검증된 본문을 기대함 -- 일반 호출자용이 아님 |
| `/membership/oauth/clients*` | OAuth 클라이언트 등록은 운영자 전용 |
| `/membership/people/apiEmails` | 사용자 권한이 아니라 운영자용 `jwtSecret`으로 게이트됨 |
| `multipart/form-data`를 기대하는 모든 경로 | 파일 업로드는 JSON-RPC 방식에 적합하지 않음 |

차단된 경로는 설명 메시지와 함께 `isError: true` 도구 결과를 반환합니다. 실제 경로는 절대 호출되지 않습니다.

## 응답 크기 제한

각 `api_call` 응답 본문은 캡처된 출력 기준 **64 KB**로 제한됩니다. 쿼리가 이 한도를 초과하면 응답에 `"truncated": true`가 포함되며 모델은 더 좁은 쿼리 파라미터로 재시도해야 합니다. 이는 단일 도구 응답이 클라이언트의 컨텍스트 윈도우를 소진시키지 않도록 방지합니다.

## 속도 제한

`/mcp`에는 애플리케이션 수준의 속도 제한이 없습니다. 스로틀링은 프로덕션에서는 API Gateway / Lambda 동시성에, 자체 호스팅 배포에서는 리버스 프록시가 강제하는 정책에 위임됩니다.

## OAuth 검색(Discovery)

MCP 서버는 OAuth 2.1 메타데이터(`/.well-known/oauth-authorization-server`, 동적 클라이언트 등록, PKCE 흐름)를 **광고하지 않습니다**. OAuth로 검색되는 MCP 서버가 필요한 클라이언트 -- 특히 Claude.ai의 "사용자 지정 커넥터 추가" UI와 ChatGPT의 "커넥터" 기능 -- 는 해당 표면 없이는 연결할 수 없습니다.

설정에서 정적 Bearer 토큰을 받아들이는 클라이언트 -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, 커스텀 코드 -- 는 현재도 잘 작동합니다. 기존의 [OAuthController](/docs/developer/api/connected-apps)는 이미 서드파티 앱을 위해 authorization-code + PKCE 방식으로 토큰을 발급하고 있으므로, 그 위에 MCP 사양을 준수하는 검색 계층을 추가하면 이 간극을 메울 수 있습니다.

## 로컬 개발

API가 로컬에서 실행될 때 MCP 엔드포인트도 다른 모든 것과 함께 마운트됩니다.

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

시작 시 `📡 MCP server ready at /mcp — N routes in inventory` 로그 라인이 목록이 정상적으로 구축되었음을 확인해 줍니다.

MCP Inspector로 점검해 보세요.

```bash
npx @modelcontextprotocol/inspector
```

Inspector UI에서 `http://localhost:8084/mcp`를 가리키고 `Authorization` 헤더를 `Bearer cak_<prefix>.<secret>`으로 설정합니다. 먼저 `list_endpoints`를 호출하면 전체 경로 목록이 보여야 합니다. 그런 다음 `api_call({ method: "GET", path: "/membership/people" })`을 호출하면 로컬 시드 데이터의 사람 목록이 반환되어야 합니다.

## 코드 레이아웃

MCP 서버는 Api 저장소의 `src/modules/mcp/`에 있습니다. 주목할 만한 파일들:

| 파일 | 목적 |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; 요청마다 `StreamableHTTPServerTransport`를 연결 |
| `McpServer.ts` | MCP `Server`를 구축하고 네 개의 도구를 등록 |
| `RouteInventory.ts` | 시작 시 inversify-express-utils 메타데이터를 순회해 경로를 열거 |
| `internalDispatch.ts` | 합성 `req`/`res`로 Express 앱을 프로세스 내에서 재진입시킴 |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | 트래픽이 많은 엔드포인트의 큐레이션된 요청/응답 샘플 |

## 관련 문서

- [API 키](./api-keys)
- [웹훅](./webhooks)
- [연결된 앱(OAuth)](./connected-apps)
- [Claude -- 최종 사용자 설정](/docs/b1-admin/integrations/claude)
- [ChatGPT -- 최종 사용자 설정](/docs/b1-admin/integrations/chatgpt)
