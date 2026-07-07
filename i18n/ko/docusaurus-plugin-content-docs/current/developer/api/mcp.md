---
title: "MCP 서버"
---

# MCP 서버

<div class="article-intro">

B1 API는 `/mcp`에 [MCP (Model Context Protocol)](https://modelcontextprotocol.io) 서버를 제공합니다. MCP를 인식하는 모든 AI 클라이언트 -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, 또는 독립 실행형 -- 이 서버에 연결하고 인증된 교회 사용자를 대신하여 기본 REST API를 호출할 수 있습니다. 이는 가벼운 일반 래퍼입니다: 세 개의 일반 도구가 각 엔드포인트를 수동으로 모델링하는 대신 전체 API 표면을 동적으로 노출하며, 웹사이트 빌더를 위한 하나의 도메인 가이드 도구가 추가됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 클라이언트가 가져야 할 범위를 가진 [B1 API 키](./api-keys) (`cak_…`)
- 도달 가능한 B1 API 호스트 -- 호스팅된 교회의 경우 `https://api.churchapps.org`, 또는 독자적인 배포
- MCP 클라이언트. [Claude](/docs/b1-admin/integrations/claude) 및 [ChatGPT](/docs/b1-admin/integrations/chatgpt)에서 최종 사용자 설정 참조

</div>

## 엔드포인트

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| 측면 | 값 |
|---|---|
| **경로** | `/mcp` (API 호스트 상대) |
| **방법** | `POST` 만 -- 요청/응답 및 SSE 스트리밍 모두 동일한 엔드포인트에서 발생 |
| **전송** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **세션 모델** | 상태 비저장. 요청마다 새로운 MCP 서버 인스턴스가 구축됩니다 -- 세션 ID 없음, 재개 없음 |
| **인증** | Bearer 토큰. `cak_…` API 키 및 B1 JWT 모두 작동합니다. 해결은 다른 인증된 엔드포인트와 동일합니다 |

`Authorization` 헤더가 누락되었거나 유효하지 않은 요청은 다음을 반환합니다:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

HTTP 401과 함께.

## 도구

세 개의 일반 도구와 하나의 가이드. 모델은 `list_endpoints`를 사용하여 검색하고, `describe_endpoint`를 사용하여 페이로드 형태를 배우고, `api_call`을 사용하여 실제로 API를 호출하며, 작업이 웹사이트 콘텐츠를 포함할 때 `describe_page_builder`를 사용합니다.

### `list_endpoints`

등록된 REST 경로의 전체 인벤토리를 반환하며, 선택적 부분 문자열 및/또는 HTTP 동사로 필터링됩니다. 각 항목은 컨트롤러 이름과 가장 필요할 가능성이 높은 API 키 범위를 포함합니다.

**입력:**

| 필드 | 타입 | 설명 |
|---|---|---|
| `filter` | 문자열 (선택사항) | 경로에 대해 일치하는 대소문자 구분 안 함 부분 문자열 (예: `"people"`) |
| `method` | 열거형 (선택사항) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**출력:** 다음 형식의 JSON 문서

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

인벤토리는 API 시작 시 라이브 경로 테이블에서 한 번 구축됩니다 -- `curl`로 히트할 수 있는 모든 것이 여기에 나타납니다.

### `describe_endpoint`

한 엔드포인트에 대해 짧은 요약 및 가능한 경우 수동으로 큐레이션한 요청 본문 및 응답 샘플을 반환합니다.

**입력:**

| 필드 | 타입 | 설명 |
|---|---|---|
| `method` | 문자열 | HTTP 동사 |
| `path` | 문자열 | `list_endpoints`에서 반환한 전체 경로 |

**출력:** 큐레이션한 엔드포인트의 경우 `summary`, `requestBody` 및 `responseSample`이 있는 예제. 큐레이션하지 않은 엔드포인트의 경우, 모델에 형태를 보기 위해 `GET`을 먼저 호출하도록 지시하는 폴백 메시지. 약 12개의 트래픽이 많은 경로 (사람, 그룹, 기부금, 참석, 기금)가 큐레이션됩니다.

### `api_call`

선택한 REST 엔드포인트를 프로세스 내에서 호출하며, 일반 HTTP 요청과 동일한 Express 미들웨어 스택을 통합니다 -- 인증, 본문 구문 분석, 감사 로깅 및 교회별 범위 지정이 모두 적용됩니다.

**입력:**

| 필드 | 타입 | 설명 |
|---|---|---|
| `method` | 열거형 | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | 문자열 | 모듈 접두사를 포함한 경로 (예: `/membership/people`) |
| `query` | 객체 (선택사항) | 쿼리 문자열 매개변수의 평면 객체 |
| `body` | 임의 (선택사항) | JSON 요청 본문 -- 일반적으로 `POST`에 대한 모델 객체 배열 |

**출력:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

상태가 ≥ 400인 모든 응답에 대해 도구 결과는 `isError: true`로 표시됩니다.

### `describe_page_builder`

유일한 비일반 도구: 웹사이트 페이지를 `/content/*` 엔드포인트를 통해 구축하는 방법에 대한 정적인 자체 포함 가이드 -- 페이지 → 섹션 → 요소 데이터 모델, 생성 워크플로, 각 `elementType`과 그 `answersJSON` 형태, `dividerTop`/`dividerBottom` 형태 구분선과 같은 섹션 수준 설정, 그리고 작동하는 엔드투엔드 예제. 입력을 받지 않으며 B1Admin 에디터에서 유지 관리하는 요소 카탈로그를 반영합니다 ([웹사이트 빌더 아키텍처](../architecture/website-builder) 참조). 에이전트는 페이지 콘텐츠를 생성하거나 편집하기 전에 한 번 호출한 다음 `api_call`을 통해 작동해야 합니다.

## 인증 모델

MCP 요청 자체는 `CustomAuthProvider.getUser()`를 통해 실행됩니다 -- 모든 인증된 B1 엔드포인트가 사용하는 동일한 경로입니다. `cak_…` 베어러는 발급자의 현재 RBAC가 **교차**하는 `Principal`로 확인됩니다 키의 부여된 범위. 이 교차는 모든 요청에서 재계산되므로:

- 키에서 범위를 제거하면 (삭제 및 다시 생성하여) 다음 호출에서 액세스가 차단됩니다.
- B1Admin의 기본 사람에서 권한을 제거하면 키가 여전히 존재하더라도 다음 호출에서 액세스가 차단됩니다.

중첩된 `api_call` 호출의 경우, 원본 `Authorization` 헤더가 합성 요청에 복사되므로 `CustomAuthProvider`가 다시 실행되고 범위 교차가 호출당 다시 적용됩니다. 토큰 캐싱이 없습니다.

## 경로 차단 목록

작은 경로 세트는 유효한 키가 있어도 `api_call`을 통해 도달할 수 없습니다:

| 패턴 | 이유 |
|---|---|
| `/giving/donate/webhook/*` | 공급자 웹훅 엔드포인트는 Stripe/PayPal에서 원본, 서명 확인된 본문을 기대합니다 -- 일반 호출자가 아닙니다 |
| `/membership/oauth/clients*` | OAuth 클라이언트 등록은 운영자 전용 |
| `/membership/people/apiEmails` | 사용자 권한이 아닌 운영자 `jwtSecret`에 의해 게이트됨 |
| `multipart/form-data`를 기대하는 모든 경로 | 파일 업로드는 JSON-RPC 친화적이지 않습니다 |

차단된 경로는 설명적 메시지와 함께 `isError: true` 도구 결과를 반환합니다. 기본 경로는 호출되지 않습니다.

## 응답 크기 제한

각 `api_call` 응답 본문은 캡처된 출력의 **64 KB**로 제한됩니다. 쿼리가 제한을 초과하면 응답은 `"truncated": true`를 전달하고 모델은 더 좁은 쿼리 매개변수로 다시 시도해야 합니다. 이는 단일 도구 응답이 클라이언트의 컨텍스트 창을 날리지 않도록 합니다.

## 속도 제한

`/mcp`에 대한 애플리케이션 수준 속도 제한이 없습니다. 스로틀링은 프로덕션의 API Gateway / Lambda 동시성으로, 자체 호스팅 배포의 리버스 프록시가 강제하는 것으로 미루어집니다.

## OAuth 검색

MCP 서버는 OAuth 2.1 메타데이터 (`/.well-known/oauth-authorization-server`, 동적 클라이언트 등록, PKCE 흐름)를 **광고하지 않습니다**. OAuth 검색된 MCP 서버가 필요한 클라이언트 -- 특히 Claude.ai의 "사용자 정의 커넥터 추가" UI 및 ChatGPT의 "커넥터" 기능 -- 이 표면 없이 연결할 수 없습니다.

해당 구성에서 정적 베어러 토큰을 수락하는 클라이언트 -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, 사용자 정의 코드 -- 오늘 작동합니다. 기존 [OAuthController](/docs/developer/api/connected-apps)는 이미 제3자 앱을 위해 인증 코드 + PKCE를 통해 토큰을 발행합니다. MCP 사양 준수 검색 계층이 위에 있으면 간격을 닫을 것입니다.

## 로컬 개발

MCP 엔드포인트는 API가 로컬로 실행될 때 다른 모든 것과 함께 마운트됩니다:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

시작 시 로그 라인 `📡 MCP server ready at /mcp — N routes in inventory`는 인벤토리가 구축되었음을 확인합니다.

MCP Inspector로 프로브하세요:

```bash
npx @modelcontextprotocol/inspector
```

Inspector UI에서 `http://localhost:8084/mcp`를 가리키고 `Authorization` 헤더를 `Bearer cak_<prefix>.<secret>`으로 설정합니다. `list_endpoints`을 먼저 호출하세요. 전체 경로 목록이 보이면 `api_call({ method: "GET", path: "/membership/people" })`은 로컬 시드 사람을 반환해야 합니다.

## 코드 레이아웃

MCP 서버는 Api 저장소의 `src/modules/mcp/`에 있습니다. 주목할 만한 파일:

| 파일 | 용도 |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; 요청당 `StreamableHTTPServerTransport` 배선 |
| `McpServer.ts` | MCP `Server`를 구축하고 네 개의 도구를 등록합니다 |
| `RouteInventory.ts` | 시작 시 inversify-express-utils 메타데이터를 걸어서 경로를 나열합니다 |
| `internalDispatch.ts` | 합성 `req`/`res`가 Express 앱을 프로세스 내에서 다시 입력합니다 |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | 트래픽이 많은 엔드포인트에 대한 큐레이션한 요청/응답 샘플 |

## 관련

- [API 키](./api-keys)
- [웹훅](./webhooks)
- [연결된 앱 (OAuth)](./connected-apps)
- [Claude -- 최종 사용자 설정](/docs/b1-admin/integrations/claude)
- [ChatGPT -- 최종 사용자 설정](/docs/b1-admin/integrations/chatgpt)
