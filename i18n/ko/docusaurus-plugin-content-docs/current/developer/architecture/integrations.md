---
title: "통합 및 확장 영역"
---

# 통합 및 확장 영역

<div class="article-intro">

제3자가 연결할 수 있는 모든 것은 하나의 API와 하나의 인가 모델을 통해 동작합니다. 이 페이지는 그 지도입니다. 모든 통합 영역의 이름을 밝히고, 이들이 어떻게 연결되는지 보여 주며, 각각의 상세 참고 자료로 연결합니다. B1을 기반으로 개발한다면 여기서 시작해 적절한 진입점을 고른 뒤, 그 내용을 자세히 설명하는 페이지로 이동하세요.

</div>

## 한눈에 보는 영역

밖으로 나가거나 안으로 들어오는 방법은 여섯 가지이며, 모두 같은 인증 계층을 공유합니다.

- **[REST API](../api/api-keys)** — 전체 제품 영역. 어떤 언어에서든 bearer 토큰으로 호출할 수 있습니다.
- **[API 키](../api/api-keys)** — 가장 간단한 자격 증명. 한 교회의 한 사람에게 묶이는 `cak_…` 토큰입니다.
- **[OAuth 2.0 및 연결된 앱](../api/connected-apps)** — 다중 테넌트 앱을 위한 교회별 동의. 사용자가 받는 것과 같은 JWT를 발급합니다.
- **[웹훅](../api/webhooks)** — 서명되고 안정적으로 전달되는 아웃바운드 이벤트.
- **[MCP 서버](../api/mcp)** — `/mcp`에서 REST API를 감싸는 AI 대상 래퍼.
- **[콘텐츠 제공업체](../freeplay-content-provider)** — 외부 미디어 라이브러리가 FreePlay와 B1 앱으로 들어오는 인바운드 경로.

콘텐츠 제공업체를 제외한 모든 것은 단일 모놀리식 API([Api](https://github.com/ChurchApps/Api) 저장소)가 제공하며, 이 API의 모듈은 `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, `/mcp` 같은 고정된 기본 경로에 마운트됩니다.

## 전체 연결 구조

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

세 개의 화살표가 전체 구조를 말해 줍니다. 제3자는 bearer 토큰(API 키 또는 OAuth JWT, `/mcp`를 통한 경우 포함)으로 **호출해 들어오고**, API는 서명된 웹훅을 통해 **다시 호출해 나갑니다**. 그리고 콘텐츠 제공업체는 B1이 OAuth *클라이언트*가 되어 외부 소스에서 미디어를 가져오는, 유일한 **인바운드 콘텐츠** 경로입니다.

## 공유 인증 모델

모든 자격 증명(사용자의 로그인 JWT, OAuth 액세스 토큰, API 키)은 **같은 `Principal`**로 해석되며 같은 방식으로 검사됩니다. 별도의 "통합 인증" 경로는 없습니다. 범위가 제한된 자격 증명은 권한이 낮은 사용자와 구별되지 않습니다.

### JWT 구조

B1 액세스 토큰은 `Api/src/modules/membership/auth/AuthenticatedUser.ts`에서 발급되는 HS256 JWT입니다. 클레임 집합은 다음과 같습니다.

| 클레임 | 의미 |
|---|---|
| `id`, `email`, `firstName`, `lastName` | 토큰 뒤의 사람 |
| `churchId` | 이 토큰이 작동하는 단일 교회. 모든 데이터 범위의 기준점 |
| `personId` | 해당 교회 안의 사람 레코드 |
| `permissions` | RBAC 권한 문자열의 평면 배열(`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | 그룹 기반 검사를 위한 그룹 소속 / 리더십 |
| `membershipStatus` | 셀프 서비스 제한을 위한 방문자 대 멤버 구분 |

OAuth 액세스 토큰은 로그인 JWT와 바이트 단위로 같은 형태입니다. 유일한 차이는 서명 전에 `permissions` 배열이 승인된 범위를 통해 **걸러졌다는 점**입니다(`getCombinedApiJwt(...)`).

### 교회별 범위 지정

`churchId`는 요청 매개변수가 아니라 토큰의 클레임이므로, 자격 증명이 교회 경계를 넘을 수 없습니다. 모든 리포지토리 쿼리는 호출자의 `churchId`로 필터링되며, API 키나 OAuth 토큰은 발급 시점에 정확히 한 교회에 묶입니다.

### 경계에서의 역할 기반 권한

컨트롤러는 `au.checkAccess(contentType, action)`로 토큰의 `permissions` 배열을 기준으로 동작을 제한합니다. 범위(scope)는 **필터이지 부여가 아닙니다**(`Api/src/shared/auth/Scopes.ts`). `SCOPE_CATALOG`는 각 범위(예: `people:read`, `donations:write`)를 허용하는 RBAC 쌍에 매핑하며, `filterPermissionsByScopes()`는 이를 매번 해석할 때 그 사람의 *현재* 권한과 교차시킵니다. 그 결과는 다음과 같습니다.

- B1Admin에서 권한을 취소하면 다음 요청부터 해당 자격 증명의 접근이 끊깁니다. 토큰이 역할과 어긋나는 일은 없습니다.
- 범위는 권한을 *제거*만 할 수 있으므로, 범위가 제한된 자격 증명이 서버/도메인 관리자 권한으로 상승할 수는 없습니다(해당 권한은 어떤 범위에도 의도적으로 매핑되지 않습니다).
- API 키에는 `cak_` 접두사가 붙습니다. `CustomAuthProvider.getUser()`는 이 접두사를 보고 비밀 값을 해시한 뒤, 호출할 때마다 소유자의 실시간 RBAC를 다시 해석합니다.

전체 카탈로그는 [API 키 → 범위](../api/api-keys#scopes)를 참고하세요.

## 영역 참고

### REST API

완전한 제품 영역입니다. 인증된 모든 엔드포인트는 `Authorization: Bearer` 헤더에 JWT 또는 `cak_…` API 키를 받으며, 키 전용이나 OAuth 전용 라우트 표는 따로 없습니다. 모듈과 기본 경로는 `Api/src/modules/*` 아래에 있습니다.

### API 키

`cak_<prefix>.<secret>` 형식의 개인 액세스 토큰으로, **B1Admin → Settings → Developer → API Keys**에서 만듭니다. SHA-256 해시만 저장되며, 원본 키는 한 번만 표시됩니다. `/membership/apiKeys`(`Api/src/modules/membership/controllers/ApiKeyController.ts`)에서 관리합니다. 한 교회의 자체 스크립트나 Zapier, Make, Google Sheets 같은 커넥터에 가장 적합합니다. → **[API 키](../api/api-keys)**

### OAuth 2.0 및 연결된 앱

교회별 동의가 필요한 다중 테넌트 앱을 위한 기능입니다. `/membership/oauth` 아래 `Api/src/modules/membership/controllers/OAuthController.ts`에 구현되어 있습니다. 서버는 세 가지 그랜트를 지원합니다.

- **Authorization Code** — `POST /oauth/authorize`(인증 필요)는 수명이 짧은 코드를 반환하고, `grant_type=authorization_code`인 `POST /oauth/token`은 이를 액세스 JWT(약 7일)와 리프레시 토큰(약 90일)으로 교환합니다. 공개(비밀 없는) 클라이언트는 PKCE(`S256`만 허용)를 사용해야 합니다. authorize에는 `code_challenge`를, 토큰 교환에는 일치하는 `code_verifier`를 보냅니다.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize`가 `user_code`를 발급하고, 사용자는 B1Admin(`/oauth/device/approve`)에서 이를 승인합니다. 기기는 device-code 그랜트로 `/oauth/token`을 폴링합니다. 브라우저가 없는 TV, 키오스크, CLI를 위한 방식입니다.
- **Refresh Token** — `grant_type=refresh_token`은 새 액세스 토큰을 발급합니다. 공개(비밀 없는) 클라이언트는 비밀을 생략할 수 있습니다.

공개 클라이언트는 `POST /oauth/register`(RFC 7591 동적 클라이언트 등록)로 스스로 등록할 수도 있습니다. 이들은 `client_id`를 받고 비밀은 없으며, 리디렉션 URI는 `https` 또는 루프백이어야 합니다.

**연결된 앱**은 부여된 토큰을 교회 관리자 관점에서 보여 주는 화면으로, `/membership/oauth/connections`에서 목록을 보고 취소할 수 있습니다. 이 컨트롤러는 또한 OAuth **릴레이 세션** 브리지(`/oauth/relay/*`)를 제공하며, 브라우저가 없는 기기가 *외부* 제공업체에 대한 로그인을 완료할 수 있게 합니다. → **[연결된 앱 및 OAuth](../api/connected-apps)**

### 웹훅

유일한 아웃바운드 영역입니다. 교회는 공개 HTTPS 엔드포인트를 이벤트에 구독시키며, 일치하는 변경이 발생하면 `WebhookDispatcher.emit(churchId, event, payload)`가 ID만 있는 페이로드에 표시 이름(`personName`, `groupName`, `formName`)을 추가하고(조회는 구독이 일치한 경우에만 실행됩니다), 전달 기록을 남깁니다. 그러면 백그라운드 워커가 재시도/백오프와 재전달을 포함하여 서명된 JSON 봉투를 POST합니다. 엔진은 `Api/src/shared/webhooks/`에 있고, 교회별 CRUD는 `/membership/webhooks`(`WebhookController.ts`) 아래에 있습니다. `connectorType` 필드는 Slack / Discord용으로 본문 형태를 바꾸며, `mailchimp` 커넥터는 한 걸음 더 나아가 HTTP 교환 전체를 담당합니다(Mailchimp API에 대한 이벤트별 메서드/URL/인증, `webhooks.connectorConfig`에 암호화되어 저장되는 자격 증명). → **[웹훅](../api/webhooks)**

### MCP 서버

`/mcp`(`Api/src/modules/mcp/`)에 있는 AI 대상 래퍼입니다. `list_endpoints`, `describe_endpoint`, `api_call`이라는 세 가지 범용 도구가 전체 REST 영역을 어떤 MCP 클라이언트에든 동적으로 노출합니다. 인증은 다른 모든 것과 같은 bearer 토큰입니다. OAuth로 로그인하는 클라이언트(claude.ai 커스텀 커넥터)의 경우, `/mcp`의 401 응답에는 `/.well-known/oauth-protected-resource`를 가리키는 `WWW-Authenticate` 헤더가 포함되며, `/.well-known/oauth-authorization-server`는 `/membership/oauth` 엔드포인트, 동적 등록, PKCE, B1Admin `/oauth` 동의 페이지를 알려 줍니다(`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call`은 Express 스택을 프로세스 내에서 다시 거치므로, 모든 권한 및 교회 범위 규칙이 그대로 적용됩니다. → **[MCP 서버](../api/mcp)**

### 콘텐츠 제공업체

인바운드 콘텐츠 경로이며, API가 아니라 별도 패키지 `Packages/content-providers`(`@churchapps/content-providers`)에 있습니다. 각 제공업체는 `IProvider` 인터페이스(`src/interfaces.ts`)를 구현합니다. 이 인터페이스는 `browse`, `getPlaylist`, `getInstructions`와 인증 훅을 포함하며, `Map` 레지스트리(`src/providers/registry.ts`)에 스스로 등록합니다. 여기서 **B1은 OAuth 클라이언트**입니다. 제공업체는 `none`, `oauth_pkce`, `device_flow`, `form_login` 중 하나의 `AuthType`을 선언하며, 공유 헬퍼(`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`)가 외부 소스에 대한 클라이언트 측 PKCE 또는 디바이스 플로우를 실행합니다. 현재 열한 개의 제공업체가 제공되며, Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, B1.church 등이 포함되어 FreePlay와 B1 앱에 콘텐츠를 공급합니다. → **[FreePlay 콘텐츠 제공업체](../freeplay-content-provider)**

**연간 계획**도 이 경로를 사용합니다. 커리큘럼 발행자(`lessons.edit` 권한 보유)는 Lessons.church 관리자에서 순서가 있는 1/2/3주차 시퀀스를 유지합니다(`LessonsApi` 테이블 `yearPlans` / `yearPlanWeeks`이며, 선택적인 `startMonth`와 주차별 `anchor`인 `easter` / `christmas`를 가집니다). LessonsApi의 `GET /yearPlans/public`은 공개 계획을 익명으로 제공하며, 각 주차의 프로그램/학습/장소를 레슨 트리에서 채웁니다. B1Admin의 **Serving → Plans → Schedule Lesson → Apply Year Plan**이 이 엔드포인트를 사용하여, 포함된 주차마다 DoingApi 계획 하나를 씁니다(`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). `startMonth`가 있는 계획은 고정된 주차를 선택한 연도에 맞춰 해석하고(부활절은 그레고리력 계산법, 성탄절은 12월 25일 이전이나 당일의 일요일), 그 사이의 기간을 채웁니다. `startMonth`가 없는 계획은 여전히 N주차를 `startDate + (N−1)×7`일에 매핑합니다. 외부 OLF 제공업체의 주차나 경로가 불완전한 주차는 적용 시점에 건너뜁니다. 교회는 생성된 계획을 다른 계획처럼 편집하며, FreePlay는 계획에 있는 것을 재생합니다.

## 요약

| 영역 | 인증 방식 | 방향 | 구현 위치 | 참고 |
|---|---|---|---|---|
| REST API | `Bearer` JWT 또는 `cak_…` 키 | 인바운드 | `Api/src/modules/*` | [API 키](../api/api-keys) |
| API 키 | SHA-256 해시된 `cak_` 토큰 | 자격 증명 | `Api/.../membership/controllers/ApiKeyController.ts` | [API 키](../api/api-keys) |
| OAuth 2.0 / 연결된 앱 | 인증 코드(PKCE) · 디바이스 · 리프레시 → JWT. 동적 클라이언트 등록 | 인바운드 | `Api/.../membership/controllers/OAuthController.ts` | [연결된 앱](../api/connected-apps) |
| 웹훅 | 웹훅별 비밀, HMAC-SHA256 서명 | 아웃바운드 | `Api/src/shared/webhooks/` + `WebhookController.ts` | [웹훅](../api/webhooks) |
| MCP 서버 | `Bearer` JWT, OAuth JWT(`/.well-known`으로 발견), 또는 `cak_…` 키 | 인바운드(AI) | `Api/src/modules/mcp/` | [MCP 서버](../api/mcp) |
| 콘텐츠 제공업체 | 제공업체별: 없음 / OAuth PKCE / 디바이스 / 폼 | 인바운드 콘텐츠 | `Packages/content-providers/` | [콘텐츠 제공업체](../freeplay-content-provider) |

## 기본 제공 커넥터

모든 사람이 처음부터 만들지 않아도 되도록, ChurchApps는 위의 영역 위에 커넥터를 제공합니다.

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — 웹훅 `connectorType`이 표준 봉투를 채팅 메시지 형태로 바꿉니다. 제3자 계정 없이 B1Admin에서 전부 설정합니다.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — 사람을 Mailchimp 대상자에 동기화하고, 그룹/목록 멤버십을 태그에 매핑하는 `mailchimp` connectorType(`Api/src/shared/webhooks/MailchimpConnector.ts`). 채팅 커넥터와 달리, 교회가 제공한 URL로 POST하는 대신 이벤트마다 자체 인증 요청(upsert/archive/tag)을 보냅니다. API 키와 대상자 ID는 `webhooks.connectorConfig`에 암호화되어 저장됩니다. 단방향이며, 표준 병합 필드만 사용합니다.
- **[Zapier](/docs/b1-admin/integrations/zapier)** 및 **[Make](/docs/b1-admin/integrations/make)** — 웹훅 이벤트에서 트리거되고 REST API로 동작합니다. Zap/시나리오가 켜질 때 자체 웹훅을 등록합니다(`settings:write` 권한이 있는 키 필요). Zapier 앱의 소스는 `Integrations` 저장소의 `zapier/` 아래에 있습니다(Zapier CLI, `zapier push`로 배포).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — API 키로 인증되는 애드온으로, 사람/헌금/그룹/출석을 요청 시 내보냅니다.
- **[Claude](/docs/b1-admin/integrations/claude)** 및 **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — `/mcp`를 가리키는 MCP 클라이언트입니다.

자체 코드를 위해서는 **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)**(`Packages/integration-sdk`)가 이 모든 것을 감쌉니다. 타입이 지정된 REST 클라이언트, OAuth 클라이언트(인증 코드 / 리프레시 / 디바이스 플로우), Express 미들웨어를 갖춘 HMAC 웹훅 검증기를 제공합니다.

## 관련 페이지

- [API 키](../api/api-keys) — 가장 간단한 자격 증명과 범위 카탈로그
- [연결된 앱 및 OAuth](../api/connected-apps) — 다중 테넌트 동의 흐름
- [웹훅](../api/webhooks) — 아웃바운드 이벤트 시스템
- [MCP 서버](../api/mcp) — AI 통합 래퍼
- [FreePlay 콘텐츠 제공업체](../freeplay-content-provider) — 인바운드 콘텐츠 소스가 되기
- [통합(최종 사용자용)](/docs/b1-admin/integrations/) — 기본 제공 커넥터 설정 가이드
