---
title: "통합 및 확장 표면"
---

# 통합 및 확장 표면 {#integration--extension-surface}

<div class="article-intro">

제3자가 연결할 수 있는 모든 것은 하나의 API와 하나의 권한 모델을 통해 동작합니다. 이 페이지는 그 지도입니다. 모든 통합 표면을 이름으로 나열하고, 어떻게 연결되는지 보여 주며, 각 표면의 상세 참조 문서로 연결합니다. B1을 기반으로 무언가를 만들 때는 여기서 적절한 입구를 고른 다음, 해당 기능을 자세히 설명하는 페이지로 이동하세요.

</div>

## 한눈에 보는 표면 {#the-surfaces-at-a-glance}

드나드는 방법은 여섯 가지이며, 모두 같은 인증 계층을 공유합니다.

- **[REST API](../api/api-keys)** — 제품 전체 표면. 어떤 언어에서든 베어러 토큰으로 호출할 수 있습니다.
- **[API 키](../api/api-keys)** — 가장 간단한 자격 증명. 한 교회의 한 사람에 연결된 `cak_…` 토큰입니다.
- **[OAuth 2.0 및 연결된 앱](../api/connected-apps)** — 다중 테넌트 앱을 위한 교회별 동의. 사용자가 받는 것과 같은 JWT를 발급합니다.
- **[웹훅](../api/webhooks)** — 서명되고 안정적으로 전달되는 외부 발신 이벤트.
- **[MCP 서버](../api/mcp)** — `/mcp`에서 REST API를 감싼, AI를 위한 래퍼.
- **[콘텐츠 제공자](../freeplay-content-provider)** — 외부 미디어 라이브러리가 FreePlay와 B1 앱으로 들어오는 수신 경로.

콘텐츠 제공자를 제외한 모든 것은 하나의 모놀리식 API([Api](https://github.com/ChurchApps/Api) 저장소)가 제공하며, 이 API의 모듈은 `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, `/mcp` 같은 고정된 기본 경로 아래에 마운트됩니다.

## 전체 구조 {#how-it-fits-together}

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

이 그림은 전체 이야기를 세 개의 화살표로 보여 줍니다. 제3자는 베어러 토큰(API 키 또는 OAuth JWT, `/mcp`를 통한 경우 포함)으로 **호출해 들어오고**, API는 서명된 웹훅으로 **다시 호출해 나갑니다**. 그리고 콘텐츠 제공자는 B1 자신이 OAuth *클라이언트*가 되어 외부 소스에서 미디어를 가져오는, 유일한 **콘텐츠 수신** 경로입니다.

## 공유 인증 모델 {#the-shared-auth-model}

모든 자격 증명, 즉 사용자의 로그인 JWT, OAuth 액세스 토큰, API 키는 **같은 `Principal`**로 확인되며 같은 방식으로 검사됩니다. 별도의 "통합 인증" 경로는 없습니다. 범위가 지정된 자격 증명은 권한이 낮은 사용자와 구분되지 않습니다.

### JWT 구조 {#jwt-structure}

B1 액세스 토큰은 `Api/src/modules/membership/auth/AuthenticatedUser.ts`에서 발급되는 HS256 JWT입니다. 클레임 집합은 다음과 같습니다.

| 클레임 | 의미 |
|---|---|
| `id`, `email`, `firstName`, `lastName` | 토큰 뒤의 사람 |
| `churchId` | 이 토큰이 작동하는 단 하나의 교회. 모든 데이터 범위 지정의 기준점 |
| `personId` | 그 교회 안의 사람 기록 |
| `permissions` | RBAC 권한 문자열의 평평한 배열(`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | 그룹 단위 검사를 위한 그룹 구성원 자격 / 리더 자격 |
| `membershipStatus` | 셀프 서비스 접근 제어를 위한 손님 대 회원 구분 |

OAuth 액세스 토큰은 로그인 JWT와 바이트 단위로 같은 형태입니다. 차이는 서명 전에 `permissions` 배열이 **부여된 범위로 걸러졌다**(`getCombinedApiJwt(...)`)는 것뿐입니다.

### 교회별 범위 지정 {#per-church-scoping}

`churchId`는 요청 매개변수가 아니라 토큰 클레임이므로, 자격 증명이 교회 경계를 넘을 수는 없습니다. 모든 리포지토리 쿼리는 호출자의 `churchId`로 필터링되며, API 키나 OAuth 토큰은 발급 시점에 정확히 한 교회에 묶입니다.

### 경계에서의 역할 기반 권한 {#role-based-permissions-at-the-boundary}

컨트롤러는 토큰의 `permissions` 배열을 기준으로 `au.checkAccess(contentType, action)`를 호출해 작업을 제어합니다. 범위는 **걸러내기이며, 부여가 아닙니다**(`Api/src/shared/auth/Scopes.ts`). `SCOPE_CATALOG`는 각 범위(예: `people:read`, `donations:write`)를 허용하는 RBAC 쌍에 매핑하며, `filterPermissionsByScopes()`는 이를 매 확인 시마다 사람의 *현재* 권한과 교집합으로 계산합니다. 결과는 다음과 같습니다.

- B1Admin에서 권한을 취소하면 다음 요청부터 자격 증명의 접근이 끊깁니다. 토큰이 역할과 어긋나는 일은 없습니다.
- 범위는 권한을 *제거*할 수만 있으므로, 범위가 제한된 자격 증명이 서버/도메인 관리로 권한이 올라갈 수 없습니다(그 권한들은 어떤 범위에도 의도적으로 매핑되지 않음).
- API 키는 `cak_` 접두사를 가집니다. `CustomAuthProvider.getUser()`는 이를 확인하여 비밀 값을 해시하고, 호출할 때마다 소유자 사람의 실시간 RBAC를 다시 확인합니다.

전체 목록은 [API 키 → 범위](../api/api-keys#scopes)를 참조하세요.

## 표면 참조 {#surface-reference}

### REST API {#rest-api}

제품의 전체 표면입니다. 인증이 필요한 모든 엔드포인트는 `Authorization: Bearer` 헤더에서 JWT 또는 `cak_…` API 키를 받습니다. 키 전용이나 OAuth 전용 라우트 테이블은 따로 없습니다. 모듈과 기본 경로는 `Api/src/modules/*` 아래에 있습니다.

### API 키 {#api-keys}

`cak_<prefix>.<secret>` 형태의 개인 액세스 토큰이며, **B1Admin → 설정 → 개발자 → API 키**에서 만듭니다. SHA-256 해시만 저장되며, 원본 키는 한 번만 표시됩니다. `/membership/apiKeys`(`Api/src/modules/membership/controllers/ApiKeyController.ts`)에서 관리합니다. 한 교회의 자체 스크립트와 Zapier, Make, Google 스프레드시트 같은 커넥터에 가장 적합합니다. → **[API 키](../api/api-keys)**

### OAuth 2.0 및 연결된 앱 {#oauth-20--connected-apps}

교회마다 동의가 필요한 다중 테넌트 앱을 위한 기능입니다. `Api/src/modules/membership/controllers/OAuthController.ts`에서 `/membership/oauth` 아래에 구현되어 있습니다. 서버는 세 가지 권한 부여 방식을 지원합니다.

- **인증 코드** — `POST /oauth/authorize`(인증됨)가 단기 코드를 반환하고, `grant_type=authorization_code`의 `POST /oauth/token`이 이를 액세스 JWT(약 7일)와 갱신 토큰(약 90일)으로 교환합니다. 공개(비밀 없는) 클라이언트는 PKCE(`S256`만 가능)를 써야 합니다. 인증 단계에 `code_challenge`를, 토큰 교환 단계에 일치하는 `code_verifier`를 보내야 합니다.
- **장치 코드**(RFC 8628) — `POST /oauth/device/authorize`가 `user_code`를 발급하고, 사용자가 B1Admin(`/oauth/device/approve`)에서 승인하면, 장치는 장치 코드 방식의 `/oauth/token`을 폴링합니다. 브라우저가 없는 TV, 키오스크, CLI를 위한 방식입니다.
- **갱신 토큰** — `grant_type=refresh_token`은 새 액세스 토큰을 발급합니다. 공개(비밀 없는) 클라이언트는 비밀을 생략할 수 있습니다.

공개 클라이언트는 `POST /oauth/register`(RFC 7591 동적 클라이언트 등록)로 스스로 등록할 수도 있습니다. 이들은 `client_id`를 받으며 비밀은 없고, 리디렉션 URI는 `https`이거나 루프백이어야 합니다.

**연결된 앱**은 부여된 토큰을 교회 관리자에게 보여 주는 화면이며, `/membership/oauth/connections`에서 목록을 보고 취소할 수 있습니다. 이 컨트롤러는 OAuth **릴레이 세션** 브리지(`/oauth/relay/*`)도 호스팅합니다. 이는 브라우저가 없는 장치가 *외부* 제공자에 대한 로그인을 완료할 수 있게 합니다. → **[연결된 앱 및 OAuth](../api/connected-apps)**

### 웹훅 {#webhooks}

유일한 발신 표면입니다. 교회는 공개 HTTPS 엔드포인트를 이벤트에 구독시키며, 일치하는 변경이 일어나면 `WebhookDispatcher.emit(churchId, event, payload)`가 ID만 있는 페이로드에 표시 이름(`personName`, `groupName`, `formName`)을 더합니다(조회는 구독이 일치할 때만 실행됨). 그다음 전달을 기록하고, 백그라운드 워커가 재시도/백오프와 재전달을 포함하여 서명된 JSON 봉투를 POST합니다. 엔진은 `Api/src/shared/webhooks/`에 있고, 교회별 CRUD는 `/membership/webhooks`(`WebhookController.ts`) 아래에 있습니다. `connectorType` 필드는 Slack / Discord용으로 본문 형태를 바꾸며, `mailchimp` 커넥터는 한 걸음 더 나아가 HTTP 교환 전체를 담당합니다(이벤트별 메서드/URL/인증을 Mailchimp API에 맞추며, 자격 증명은 `webhooks.connectorConfig`에 암호화되어 저장). → **[웹훅](../api/webhooks)**

### MCP 서버 {#mcp-server}

`/mcp`(`Api/src/modules/mcp/`)에 있는 AI용 래퍼입니다. 범용 도구 세 개인 `list_endpoints`, `describe_endpoint`, `api_call`이 REST 표면 전체를 어떤 MCP 클라이언트에든 동적으로 노출합니다. 인증은 다른 것과 같은 베어러 토큰입니다. OAuth로 로그인하는 클라이언트(claude.ai 사용자 지정 커넥터)의 경우, `/mcp`의 401 응답에는 `/.well-known/oauth-protected-resource`를 가리키는 `WWW-Authenticate` 헤더가 붙습니다. `/.well-known/oauth-authorization-server`는 `/membership/oauth` 엔드포인트, 동적 등록, PKCE, B1Admin `/oauth` 동의 페이지를 알립니다(`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call`은 Express 스택을 프로세스 안에서 다시 진입하므로, 모든 권한과 교회 범위 지정 규칙이 그대로 적용됩니다. → **[MCP 서버](../api/mcp)**

### 콘텐츠 제공자 {#content-providers}

수신 콘텐츠 경로이며, API가 아니라 별도 패키지인 `Packages/content-providers`(`@churchapps/content-providers`)에 있습니다. 각 제공자는 `IProvider` 인터페이스(`src/interfaces.ts`)를 구현합니다. 즉 `browse`, `getPlaylist`, `getInstructions`와 인증 훅을 제공하며, `Map` 레지스트리(`src/providers/registry.ts`)에 스스로 등록합니다. 여기서 **B1은 OAuth 클라이언트**입니다. 제공자는 `none`, `oauth_pkce`, `device_flow`, `form_login` 중 하나의 `AuthType`을 선언하며, 공유 헬퍼(`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`)가 외부 소스에 대한 클라이언트 측 PKCE/장치 흐름을 실행합니다. 현재 열한 개의 제공자가 있으며, Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, B1.church를 포함하고, FreePlay와 B1 앱에 콘텐츠를 공급합니다. → **[FreePlay 콘텐츠 제공자](../freeplay-content-provider)**

**연도 계획**도 이 경로를 사용합니다. 교육과정 발행자(`lessons.edit` 권한 보유)는 Lessons.church 관리자에서 순서가 있는 1/2/3주 순서를 관리합니다(`LessonsApi` 테이블 `yearPlans` / `yearPlanWeeks`. 선택적인 `startMonth`와 주별 `anchor`(`easter` / `christmas`)가 있음). LessonsApi의 `GET /yearPlans/public`은 게시된 계획을 익명으로 제공하며, 각 주의 프로그램/공부/장소를 공과 트리에서 채웁니다. B1Admin의 **섬김 → 일정 → 공과 예약 → 연도 계획 적용**이 이 엔드포인트를 사용하여, 포함된 주마다 DoingApi 일정 하나를 씁니다(`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). `startMonth`가 있는 계획은 고정된 주를 선택한 연도에 맞춰 해석하고(부활절은 그레고리력 계산, 성탄절은 12월 25일 이전 또는 당일의 주일), 그 사이의 주들을 채웁니다. `startMonth`가 없는 계획은 여전히 N주를 `startDate + (N−1)×7`일에 매핑합니다. 외부 OLF 제공자의 주나 경로가 불완전한 주는 적용 시 건너뜁니다. 교회는 결과 일정을 다른 일정처럼 편집하며, FreePlay는 일정에 있는 내용을 그대로 재생합니다.

## 요약 {#summary}

| 표면 | 인증 방식 | 방향 | 구현 위치 | 참조 |
|---|---|---|---|---|
| REST API | `Bearer` JWT 또는 `cak_…` 키 | 수신 | `Api/src/modules/*` | [API 키](../api/api-keys) |
| API 키 | SHA-256 해시된 `cak_` 토큰 | 자격 증명 | `Api/.../membership/controllers/ApiKeyController.ts` | [API 키](../api/api-keys) |
| OAuth 2.0 / 연결된 앱 | 인증 코드(PKCE) · 장치 · 갱신 → JWT. 동적 클라이언트 등록 | 수신 | `Api/.../membership/controllers/OAuthController.ts` | [연결된 앱](../api/connected-apps) |
| 웹훅 | 후크별 비밀, HMAC-SHA256 서명 | 발신 | `Api/src/shared/webhooks/` + `WebhookController.ts` | [웹훅](../api/webhooks) |
| MCP 서버 | `Bearer` JWT, OAuth JWT(`/.well-known`으로 발견), 또는 `cak_…` 키 | 수신(AI) | `Api/src/modules/mcp/` | [MCP 서버](../api/mcp) |
| 콘텐츠 제공자 | 제공자별: 없음 / OAuth PKCE / 장치 / 폼 | 수신 콘텐츠 | `Packages/content-providers/` | [콘텐츠 제공자](../freeplay-content-provider) |

## 기본 제공 커넥터 {#prebuilt-connectors}

모두가 처음부터 만들 필요가 없도록, ChurchApps는 위의 표면을 기반으로 한 커넥터를 제공합니다.

- **[Slack 및 Discord](/docs/b1-admin/integrations/slack-discord)** — 웹훅 `connectorType`이 표준 봉투를 채팅 메시지 형태로 바꿉니다. 모두 B1Admin에서 설정하며, 제3자 계정이 필요 없습니다.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — `mailchimp` connectorType은 사람을 Mailchimp 대상자와 동기화하고, 그룹/목록 구성원 자격을 태그에 매핑합니다(`Api/src/shared/webhooks/MailchimpConnector.ts`). 교회가 제공한 URL로 POST하는 채팅 커넥터와 달리, 이벤트마다 자체 인증된 요청(upsert/archive/tag)을 보냅니다. API 키와 대상자 ID는 `webhooks.connectorConfig`에 암호화되어 저장됩니다. 단방향이며, 표준 병합 필드만 사용합니다.
- **[Zapier](/docs/b1-admin/integrations/zapier)** 및 **[Make](/docs/b1-admin/integrations/make)** — 웹훅 이벤트를 트리거로 삼고, REST API를 통해 작업합니다. Zap이나 시나리오를 켤 때 자체 웹훅을 등록합니다(`settings:write` 키 필요). Zapier 앱의 소스는 `Integrations` 저장소의 `zapier/` 아래에 있습니다(Zapier CLI, `zapier push`로 배포).
- **[Google 스프레드시트](/docs/b1-admin/integrations/google-sheets)** — API 키로 인증하는 부가 기능이며, 사람 / 헌금 / 그룹 / 출석을 필요할 때 내보냅니다.
- **[Claude](/docs/b1-admin/integrations/claude)** 및 **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — `/mcp`를 가리키는 MCP 클라이언트입니다.

직접 만든 코드에서는 **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)**(`Packages/integration-sdk`)가 이 모든 것을 감쌉니다. 타입이 지정된 REST 클라이언트, OAuth 클라이언트(인증 코드 / 갱신 / 장치 흐름), Express 미들웨어가 있는 HMAC 웹훅 검증기가 포함됩니다.

## 관련 문서 {#related-pages}

- [API 키](../api/api-keys) — 가장 간단한 자격 증명과 범위 목록
- [연결된 앱 및 OAuth](../api/connected-apps) — 다중 테넌트 동의 흐름
- [웹훅](../api/webhooks) — 발신 이벤트 시스템
- [MCP 서버](../api/mcp) — AI 통합 래퍼
- [FreePlay 콘텐츠 제공자](../freeplay-content-provider) — 수신 콘텐츠 소스가 되는 방법
- [통합(최종 사용자용)](/docs/b1-admin/integrations/) — 기본 제공 커넥터 설정 가이드
