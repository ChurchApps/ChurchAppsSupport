---
title: "통합 및 확장 표면"
---

# 통합 및 확장 표면

<div class="article-intro">

제3자가 플러그인할 수 있는 모든 것은 하나의 API와 하나의 인증 모델을 통해 실행됩니다. 이 페이지는 맵입니다. 모든 통합 표면의 이름을 지정하고, 이들이 어떻게 연결되는지 보여주고, 각각에 대한 상세 참조로 연결합니다. B1에 대해 구축하고 있다면 여기서 시작하여 올바른 문을 선택한 후 깊이 있게 문서화한 페이지로 따라가세요.

</div>

## 한눈에 표면

들어오고 나가는 여섯 가지 방법이 있으며 모두 동일한 인증 계층을 공유합니다.

- **[REST API](../api/api-keys)** — 전체 제품 표면, 모든 언어에서 베어러 토큰으로 호출 가능.
- **[API 키](../api/api-keys)** — 가장 간단한 자격증: 한 교회의 한 사람에게 바인드된 `cak_…` 토큰.
- **[OAuth 2.0 및 연결된 앱](../api/connected-apps)** — 다중 테넌트 앱에 대한 교회별 동의; 사용자가 얻는 것과 동일한 JWT를 발급합니다.
- **[웹훅](../api/webhooks)** — 서명되고 내구성 있게 전달되는 아웃바운드 이벤트.
- **[MCP 서버](../api/mcp)** — `/mcp`에서 REST API에 대한 AI 대면 래퍼.
- **[콘텐츠 제공자](../freeplay-content-provider)** — FreePlay 및 B1 앱으로의 외부 미디어 라이브러리를 위한 인바운드 경로.

콘텐츠 제공자를 제외한 모든 것은 안정적인 기본 경로 아래 모듈을 마운트하는 단일 모놀리식 API ([Api](https://github.com/ChurchApps/Api) 저장소)에서 제공됩니다. `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, 및 `/mcp`.

## 어떻게 맞춰지는지

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

세 개의 화살표는 전체 이야기를 말합니다: 제3자는 베어러 토큰 (API 키 또는 OAuth JWT, `/mcp`를 포함한)으로 **호출합니다**; API는 서명된 웹훅을 통해 **콜백 아웃**합니다; 콘텐츠 제공자는 B1 자신이 외부 소스에서 미디어를 끌어당기는 OAuth *클라이언트*인 유일한 **인바운드 콘텐츠** 경로입니다.

## 공유 인증 모델

모든 자격증 — 사용자의 로그인 JWT, OAuth 액세스 토큰, 또는 API 키 — 동일한 **`Principal`**로 해결되고 같은 방식으로 확인됩니다. 별도의 "통합 인증" 경로가 없습니다. 범위 지정 자격증은 단순히 낮은 권한 사용자와 구분할 수 없습니다.

### JWT 구조

B1 액세스 토큰은 `Api/src/modules/membership/auth/AuthenticatedUser.ts`에서 발급된 HS256 JWT입니다. 클레임 집합:

| 클레임 | 의미 |
|--------|------|
| `id`, `email`, `firstName`, `lastName` | 토큰 뒤의 사람 |
| `churchId` | 이 토큰이 작동하는 단일 교회. 모든 데이터 범위 지정의 앵커 |
| `personId` | 그 교회 내 사람 레코드 |
| `permissions` | RBAC perm-문자열의 평면 배열 (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | 그룹 회원 / 리더십, 그룹 범위 확인의 경우 |
| `membershipStatus` | 게스트 vs. 회원, 셀프서빙 게이팅용 |

OAuth 액세스 토큰은 로그인 JWT와 바이트 단위로 정확히 같은 모양입니다. 유일한 차이점은 그 `permissions` 배열이 **서명하기 전에 부여된 범위를 통해 필터링되었다**는 것입니다 (`getCombinedApiJwt(...)`).

### 교회별 범위 지정

`churchId`는 요청 매개변수가 아니라 토큰 클레임이므로 자격증은 교회를 넘을 수 없습니다. 모든 저장소 쿼리는 호출자의 `churchId`에서 필터링됩니다. API 키 또는 OAuth 토큰은 발급 시 정확히 한 교회에 바인드됩니다.

### 경계에서의 역할 기반 권한

컨트롤러는 토큰의 `permissions` 배열에 대해 `au.checkAccess(contentType, action)`으로 작업을 게이트합니다. 범위는 **필터이지 그랜트가 아닙니다** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG`는 각 범위 (예: `people:read`, `donations:write`)를 허용하는 RBAC 쌍으로 매핑하고 `filterPermissionsByScopes()`는 모든 해결에서 그 사람의 *현재* 권한과 교차합니다. 결과:

- B1Admin에서 권한을 취소하면 다음 요청에서 자격증의 액세스를 차단합니다. 토큰은 절대 역할에서 변합니다.
- 범위는 권한만 *제거*할 수 있으므로 범위 지정 자격증은 절대 서버 / 도메인 관리로 상승할 수 없습니다 (이러한 권한은 의도적으로 어떤 범위로도 매핑되지 않습니다).
- API 키는 `cak_` 접두사를 전달합니다. `CustomAuthProvider.getUser()`는 이를 분기하고, 비밀을 해싱하고, 각 호출에서 소유 사람의 라이브 RBAC를 다시 해결합니다.

전체 카탈로그를 위해 [API 키 → 범위](../api/api-keys#scopes)를 참조하세요.

## 표면 참조

### REST API

전체 제품 표면. 모든 인증된 엔드포인트는 `Authorization: Bearer` 헤더에서 JWT 또는 `cak_…` API 키를 받습니다. 별도의 키만 또는 OAuth만 경로 테이블이 없습니다. 모듈과 기본 경로는 `Api/src/modules/*` 아래에 있습니다.

### API 키

**B1Admin → 설정 → 개발자 → API 키**에서 생성된 `cak_<prefix>.<secret>` 개인 액세스 토큰. SHA-256 해시만 저장됩니다. 원본 키는 한 번 표시됩니다. `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`)에서 관리됨. 한 교회의 자신의 스크립트 및 Zapier, Make, Google Sheets 같은 커넥터에 가장 좋습니다. → **[API 키](../api/api-keys)**

### OAuth 2.0 및 연결된 앱

각 교회가 동의해야 하는 다중 테넌트 앱용입니다. `Api/src/modules/membership/controllers/OAuthController.ts`에서 `/membership/oauth` 아래 구현됨. 서버는 세 가지 그랜트를 지원합니다.

- **인증 코드** — `POST /oauth/authorize` (인증됨)는 단기 코드를 반환합니다. `POST /oauth/token` with `grant_type=authorization_code`는 이를 액세스 JWT (≈ 7일) 더하기 새로고침 토큰 (≈ 90일)과 교환합니다.
- **디바이스 코드** (RFC 8628) — `POST /oauth/device/authorize`는 `user_code`를 발급합니다. 사용자는 B1Admin (`/oauth/device/approve`)에서 승인합니다. 디바이스는 디바이스 코드 그랜트로 `/oauth/token`을 폴링합니다. TV, 키오스크, 브라우저가 없는 CLI용입니다.
- **새로고침 토큰** — `grant_type=refresh_token`은 새 액세스 토큰을 발급합니다. 공개 (비밀 없음) 클라이언트는 비밀을 생략할 수 있습니다.

**연결된 앱**은 부여된 토큰의 교회 관리자 대면 보기이고 `/membership/oauth/connections`에서 나열되고 취소할 수 있습니다. 컨트롤러는 또한 OAuth **중계 세션** 브리지 (`/oauth/relay/*`)를 호스트하고 브라우저 없는 디바이스가 *외부* 제공자에 대해 로그인을 완료할 수 있게 합니다. → **[연결된 앱 및 OAuth](../api/connected-apps)**

### 웹훅

유일한 아웃바운드 표면입니다. 교회는 공개 HTTPS 엔드포인트를 이벤트에 구독합니다. 일치하는 변경이 발생하면 `WebhookDispatcher.emit(churchId, event, payload)`는 배달을 기록하고 백그라운드 워커는 재시도/백오프 및 재배달로 서명된 JSON 봉투를 POST합니다. 엔진은 `Api/src/shared/webhooks/`에, 교회별 CRUD는 `/membership/webhooks` (`WebhookController.ts`)에 있습니다. `connectorType` 필드는 Slack / Discord용 본문을 재형성합니다. → **[웹훅](../api/webhooks)**

### MCP 서버

`/mcp` (`Api/src/modules/mcp/`)의 AI 대면 래퍼입니다. 세 가지 일반 도구 — `list_endpoints`, `describe_endpoint`, `api_call` — 모든 MCP 클라이언트에 전체 REST 표면을 동적으로 노출합니다. 인증은 모든 것과 동일한 베어러 토큰이고 `api_call`은 프로세스 내에서 Express 스택으로 다시 들어가므로 모든 권한 및 교회 범위 지정 규칙이 여전히 적용됩니다. → **[MCP 서버](../api/mcp)**

### 콘텐츠 제공자

인바운드 콘텐츠 경로는 API가 아니라 별도의 패키지 `Packages/content-providers` (`@churchapps/content-providers`)입니다. 각 제공자는 `IProvider` 인터페이스 (`src/interfaces.ts`)를 구현합니다. `browse`, `getPlaylist`, `getInstructions`, 플러스 인증 훅. 그리고 `Map` 레지스트리 (`src/providers/registry.ts`)로 자동 등록됩니다. 여기서 **B1은 OAuth 클라이언트**입니다: 제공자는 `AuthType` of `none`, `oauth_pkce`, `device_flow`, 또는 `form_login`을 선언하고 공유 도우미 (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`)는 외부 소스에 대해 클라이언트 측 PKCE / 디바이스 흐름을 실행합니다. 11개의 제공자가 오늘 제공됩니다. Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, 및 B1.church 포함. FreePlay 및 B1 앱을 공급합니다. → **[FreePlay 콘텐츠 제공자](../freeplay-content-provider)**

## 요약

| 표면 | 인증 메커니즘 | 방향 | 구현된 위치 | 참조 |
|------|-------------|------|-----------|------|
| REST API | `Bearer` JWT 또는 `cak_…` 키 | 인바운드 | `Api/src/modules/*` | [API 키](../api/api-keys) |
| API 키 | SHA-256-해시된 `cak_` 토큰 | 자격증 | `Api/.../membership/controllers/ApiKeyController.ts` | [API 키](../api/api-keys) |
| OAuth 2.0 / 연결된 앱 | 인증 코드 · 디바이스 · 새로고침 → JWT | 인바운드 | `Api/.../membership/controllers/OAuthController.ts` | [연결된 앱](../api/connected-apps) |
| 웹훅 | 훅당 비밀, HMAC-SHA256 서명 | 아웃바운드 | `Api/src/shared/webhooks/` + `WebhookController.ts` | [웹훅](../api/webhooks) |
| MCP 서버 | `Bearer` JWT 또는 `cak_…` 키 | 인바운드 (AI) | `Api/src/modules/mcp/` | [MCP 서버](../api/mcp) |
| 콘텐츠 제공자 | 제공자별: 없음 / OAuth PKCE / 디바이스 / 양식 | 인바운드 콘텐츠 | `Packages/content-providers/` | [콘텐츠 제공자](../freeplay-content-provider) |

## 미리 구축된 커넥터

모든 사람이 처음부터 구축하는 대신 ChurchApps는 위 표면 위에 커넥터를 제공합니다.

- **[Slack 및 Discord](/docs/b1-admin/integrations/slack-discord)** — 웹훅 `connectorType`은 표준 봉투를 채팅 메시지로 재형성합니다. B1Admin에서 완전히 구성됨, 제3자 계정 없음.
- **[Zapier](/docs/b1-admin/integrations/zapier)** 및 **[Make](/docs/b1-admin/integrations/make)** — 웹훅 이벤트에서 트리거하고 REST API를 통해 작동합니다. Zap/시나리오가 켜질 때 자신의 웹훅을 등록합니다 (`settings:write`이 있는 키 필요).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — API 키 인증 추가 기능이 요청 시 사람 / 기부 / 그룹 / 참석을 내보냅니다.
- **[Claude](/docs/b1-admin/integrations/claude)** 및 **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — `/mcp`를 가리키는 MCP 클라이언트.

자신의 코드의 경우 **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`)가 모두 감싼다: 타입 REST 클라이언트, OAuth 클라이언트 (인증 코드 / 새로고침 / 디바이스 흐름), Express 미들웨어가 있는 HMAC 웹훅 검증기.

## 관련 페이지

- [API 키](../api/api-keys) — 가장 간단한 자격증 및 범위 카탈로그
- [연결된 앱 및 OAuth](../api/connected-apps) — 다중 테넌트 동의 흐름
- [웹훅](../api/webhooks) — 아웃바운드 이벤트 시스템
- [MCP 서버](../api/mcp) — AI 통합 래퍼
- [FreePlay 콘텐츠 제공자](../freeplay-content-provider) — 인바운드 콘텐츠 소스 되기
- [통합 (최종 사용자)](/docs/b1-admin/integrations/) — 미리 구축된 커넥터 설정 가이드
