---
title: "MCP 서버"
---

# MCP 서버

<div class="article-intro">

B1 API는 `/mcp`에서 [MCP (Model Context Protocol)](https://modelcontextprotocol.io) 서버를 제공합니다. MCP를 인식하는 모든 AI 클라이언트 -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor 또는 자신의 것 -- 인증된 교회 사용자를 대신하여 기본 REST API를 호출할 수 있습니다. 얇은, 일반적인 래퍼입니다: 3개의 도구가 있고, 각 끝점을 손으로 모델링하지 않고 전체 API 표면을 동적으로 노출합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 클라이언트가 가져야 할 범위가 있는 [B1 API 키](./api-keys) (`cak_…`)
- 도달 가능한 B1 API 호스트 -- 호스팅된 교회의 경우 `https://api.churchapps.org`, 또는 자신의 배포
- MCP 클라이언트. 최종 사용자 설정을 위해 [Claude](/docs/b1-admin/integrations/claude) 및 [ChatGPT](/docs/b1-admin/integrations/chatgpt)를 참고합니다

</div>

## 끝점

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| 측면 | 값 |
|---|---|
| **경로** | `/mcp` (API 호스트에 상대적) |
| **메서드** | `POST`만 -- 요청/응답 및 SSE 스트리밍 모두 동일 끝점에서 발생 |
| **전송** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **세션 모델** | Stateless. 요청당 신선한 MCP 서버 인스턴스가 구성됩니다 -- 세션 ID 없음, 재개 없음 |
| **인증** | Bearer 토큰. `cak_…` API 키 및 B1 JWT 모두 작동합니다; 해결은 다른 모든 인증 끝점과 동일합니다 |

`Authorization` 헤더가 없거나 유효하지 않은 요청은 다음을 반환합니다:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

HTTP 401 포함.

## 도구

3개 도구, 모두 일반적입니다. 모델은 `list_endpoints`를 검색에 사용하고, `describe_endpoint`를 사용하여 페이로드 모양을 배우고, `api_call`을 사용하여 API를 실제로 호출합니다.

### `list_endpoints`

등록된 REST 경로의 전체 인벤토리를 반환합니다. 선택적 부분 문자열 및/또는 HTTP 동사로 필터링됩니다. 각 항목은 컨트롤러 이름 및 가장 가능성이 높은 API 키 범위를 포함합니다.

**입력:**

| 필드 | 유형 | 설명 |
|---|---|---|
| `filter` | string (선택) | 경로에 대해 일치하는 대소문자를 구분하지 않는 부분 문자열, 예: `"people"` |
| `method` | enum (선택) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**출력:** 형식의 JSON 문서

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

인벤토리는 API 시작 시 라이브 경로 테이블에서 한 번 구성됩니다 -- `curl`로 할 수 있는 모든 것이 여기에 나타납니다.

### `describe_endpoint`

한 끝점에 대해 짧은 요약 및, 사용 가능한 경우, 손으로 만든 요청 본문 및 응답 샘플을 반환합니다.

**입력:**

| 필드 | 유형 | 설명 |
|---|---|---|
| `method` | string | HTTP 동사 |
| `path` | string | `list_endpoints`로 반환된 전체 경로 |

**출력:** 확인된 끝점의 경우, `summary`, `requestBody`, `responseSample`이 있는 예제. 확인되지 않은 끝점의 경우, 모델이 먼저 `GET`을 호출하여 모양을 확인하도록 지시하는 대체 메시지. 약 12개의 높은 트래픽 경로(사람, 그룹, 기부금, 출석, 기금)가 확인됩니다.

### `api_call`

선택한 REST 끝점을 호출하고, 동일한 Express 미들웨어 스택을 통해 인프로세스로 일반 HTTP 요청으로 -- 인증, 본문 구문 분석, 감사 로깅, 교회별 범위 모두 적용됩니다.

**입력:**

| 필드 | 유형 | 설명 |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | 모듈 접두사를 포함한 경로, 예: `/membership/people` |
| `query` | object (선택) | 쿼리 문자열 매개변수의 Flat 객체 |
| `body` | any (선택) | JSON 요청 본문 -- 일반적으로 `POST`에 대한 모델 객체 배열 |

**출력:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

도구 결과는 상태 ≥ 400인 모든 응답에 대해 `isError: true`로 표시됩니다.

## 인증 모델

MCP 요청 자체는 `CustomAuthProvider.getUser()`를 통해 실행됩니다 -- 모든 인증 B1 끝점이 사용하는 동일한 경로입니다. `cak_…` bearer는 권한이 발급 사람의 현재 RBAC인 `Principal`로 해결됩니다. **교차로** 키의 부여된 범위가 있습니다. 이 교차로는 모든 요청에서 재계산되므로:

- 키에서 범위를 제거하면(삭제하고 다시 생성) 다음 호출에서 액세스가 끝납니다.
- B1 Admin에서 기본 사람의 권한을 제거하면 키가 여전히 존재하더라도 다음 호출에서 액세스가 끝납니다.

중첩된 `api_call` 호출의 경우, 원본 `Authorization` 헤더가 합성 요청에 복사되므로 `CustomAuthProvider`가 다시 실행되고 범위 교차로가 호출당 다시 적용됩니다. 토큰 캐싱이 없습니다.

## 경로 차단 목록

많은 수의 경로가 `api_call`을 통해 도달 불가능합니다. 유효한 키도:

| 패턴 | 이유 |
|---|---|
| `/giving/donate/webhook/*` | 제공자 웹훅 끝점은 Stripe/PayPal -- 일반 호출자가 아닌 원본 서명 확인 본문을 예상합니다 |
| `/membership/oauth/clients*` | OAuth 클라이언트 등록은 운영자만 가능합니다 |
| `/membership/people/apiEmails` | 운영자 `jwtSecret`, 사용자 권한이 아닌 것으로 게이트됩니다 |
| `multipart/form-data`를 예상하는 모든 경로 | 파일 업로드는 JSON-RPC 친화적이 아닙니다 |

차단된 경로는 설명 메시지와 함께 `isError: true` 도구 결과를 반환합니다; 기본 경로는 절대 호출되지 않습니다.

## 응답 크기 상한

각 `api_call` 응답 본문은 캡처된 출력의 **64 KB**로 상한선이 정해집니다. 쿼리가 상한선을 초과하면 응답은 `"truncated": true`를 전달하고 모델은 더 좁은 쿼리 매개변수로 재시도할 것으로 예상됩니다. 이는 단일 도구 응답이 클라이언트의 컨텍스트 윈도우를 날려 버리지 않게 유지합니다.

## 속도 제한

`/mcp`에는 애플리케이션 수준 속도 제한이 없습니다. 제한은 프로덕션의 API Gateway / Lambda 동시성으로 지연되고, 자체 호스팅 배포에서 역방향 프록시가 적용하는 것으로 지연됩니다.

## OAuth 검색

MCP 서버는 OAuth 2.1 메타데이터(`/.well-known/oauth-authorization-server`, 동적 클라이언트 등록, PKCE 흐름)를 **광고하지 않습니다**. OAuth 검색 MCP 서버를 요구하는 클라이언트 -- 특히 Claude.ai의 "사용자 정의 커넥터 추가" UI 및 ChatGPT의 "커넥터" 기능 -- 해당 표면이 없으면 연결할 수 없습니다.

구성에서 정적 bearer 토큰을 허용하는 클라이언트 -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, 사용자 정의 코드 -- 오늘 작동합니다. 기존 [OAuthController](/docs/developer/api/connected-apps)는 이미 타사 앱에 대해 인증 코드 + PKCE를 통해 토큰을 발급합니다. 그 위에 MCP 스펙 준수 검색 계층이 격차를 닫을 것입니다.

## 로컬 개발

MCP 끝점은 API가 로컬로 실행될 때 다른 모든 것과 함께 마운트됩니다:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

시작 시 로그 라인 `📡 MCP server ready at /mcp — N routes in inventory`는 인벤토리가 구성되었음을 확인합니다.

MCP Inspector로 탐사합니다:

```bash
npx @modelcontextprotocol/inspector
```

Inspector UI에서 `http://localhost:8084/mcp`을 지점하고 `Authorization` 헤더를 `Bearer cak_<prefix>.<secret>`으로 설정합니다. 먼저 `list_endpoints`을 호출합니다; 전체 경로 목록이 표시되어야 합니다. 그런 다음 `api_call({ method: "GET", path: "/membership/people" })`은 로컬 시드 사람을 반환해야 합니다.

## 코드 레이아웃

MCP 서버는 Api 저장소의 `src/modules/mcp/`에 있습니다. 주목할 파일:

| 파일 | 목적 |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; 요청당 `StreamableHTTPServerTransport` 와이어 |
| `McpServer.ts` | MCP `Server`를 구성하고 3개 도구를 등록합니다 |
| `RouteInventory.ts` | 시작 시 inversify-express-utils 메타데이터를 도보하여 경로를 열거합니다 |
| `internalDispatch.ts` | 합성 `req`/`res`로 인프로세스에서 Express 앱에 다시 들어갑니다 |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts` |
| `examples.ts` | 높은 트래픽 끝점에 대한 확인된 요청/응답 샘플 |

## 관련

- [API 키](./api-keys)
- [웹훅](./webhooks)
- [연결된 앱 (OAuth)](./connected-apps)
- [Claude -- 최종 사용자 설정](/docs/b1-admin/integrations/claude)
- [ChatGPT -- 최종 사용자 설정](/docs/b1-admin/integrations/chatgpt)
