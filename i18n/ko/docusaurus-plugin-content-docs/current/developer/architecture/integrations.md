---
title: "통합 및 확장 표면"
---

# 통합 및 확장 표면

<div class="article-intro">

타사가 플러그인할 수 있는 모든 것은 하나의 API와 하나의 인증 모델을 통해 실행됩니다. 이 페이지는 지도입니다: 모든 통합 표면의 이름을 지정하고, 연결 방법을 보여주며, 각각에 대한 자세한 참고 자료에 링크합니다. B1에 대해 구축하는 경우, 올바른 문을 선택하기 위해 여기서 시작한 후 자세히 문서화한 페이지로 이동합니다.

</div>

## 한눈에 본 표면

진입 또는 퇴출의 6가지 방법이 있으며, 모두 동일한 인증 계층을 공유합니다:

- **[REST API](../api/api-keys)** - 모든 제품 표면, 모든 언어에서 bearer 토큰으로 호출 가능합니다.
- **[API 키](../api/api-keys)** - 가장 단순한 자격 증명: 한 교회에서 한 사람에게 바인딩된 `cak_…` 토큰입니다.
- **[OAuth 2.0 및 연결된 앱](../api/connected-apps)** - 멀티 테넌트 앱을 위한 교회별 동의; 사용자가 받는 것과 동일한 JWT를 발행합니다.
- **[Webhooks](../api/webhooks)** - 서명되고 내구성 있는 아웃바운드 이벤트입니다.
- **[MCP 서버](../api/mcp)** - `/mcp`에서 REST API 위의 AI 지향 래퍼입니다.
- **[콘텐츠 제공업체](../freeplay-content-provider)** - FreePlay 및 B1 앱으로 외부 미디어 라이브러리의 인바운드 경로입니다.

OAuth 2.0 및 연결된 앱을 제외한 모든 것은 단일 모놀리식 API ([Api](https://github.com/ChurchApps/Api) 저장소)에 의해 제공되며, 안정적인 기본 경로 아래에 모듈이 탑재됩니다. `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, 및 `/mcp`.

## 적합하는 방법

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

세 개의 화살표가 전체 이야기를 말합니다: 타사가 bearer 토큰 (API 키 또는 OAuth JWT, `/mcp` 포함)으로 **호출**합니다; API는 서명된 webhooks를 통해 **콜백**합니다; 콘텐츠 제공업체는 B1이 외부 소스에서 미디어를 가져오는 OAuth *클라이언트*인 하나의 **인바운드 콘텐츠** 경로입니다.

## 공유 인증 모델

모든 자격 증명 (사용자의 로그인 JWT, OAuth 액세스 토큰 또는 API 키)은 동일한 **`Principal`**로 해석되고 동일한 방식으로 확인됩니다. 별도의 "통합 인증" 경로가 없습니다. 범위가 지정된 자격 증명은 단순히 권한이 낮은 사용자와 구별할 수 없습니다.

### JWT 구조

B1 액세스 토큰은 `Api/src/modules/membership/auth/AuthenticatedUser.ts`에서 민팅된 HS256 JWTs입니다. 청구 집합:

| 청구 | 의미 |
|---|---|
| `id`, `email`, `firstName`, `lastName` | 토큰 뒤의 사람 |
| `churchId` | 이 토큰이 작동하는 단일 교회. 모든 데이터 범위의 앵커입니다 |
| `personId` | 해당 교회 내의 사람 기록 |
| `permissions` | RBAC perm-strings의 플랫 배열 (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | 그룹 구성원 / 리더십, 그룹 범위 확인용 |
| `membershipStatus` | 게스트 vs. 회원, 자가 서비스 게이팅용 |

OAuth 액세스 토큰은 바이트 대 바이트로 로그인 JWT와 동일한 형태입니다. 유일한 차이는 `permissions` 배열이 **서명 전에 허용된 범위를 통해 필터링됨** (`getCombinedApiJwt(...)`).

### 교회별 범위

`churchId`는 요청 매개변수가 아닌 토큰 청구이므로 자격 증명은 교회 간에 도달할 수 없습니다. 모든 저장소 쿼리는 호출자의 `churchId`에서 필터링됩니다. API 키 또는 OAuth 토큰은 민팅 시 정확히 하나의 교회에 바인딩됩니다.

### 경계에서의 역할 기반 권한

컨트롤러는 토큰의 `permissions` 배열에 대해 `au.checkAccess(contentType, action)`을 가진 작업을 게이팅합니다. 범위는 **필터이며 부여가 아님** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG`는 각 범위 (예: `people:read`, `donations:write`)를 허용하는 RBAC 쌍에 매핑하고, `filterPermissionsByScopes()`는 모든 해석에서 현재 권한과 교집합됩니다. 결과:

- B1Admin에서 권한을 취소하면 자격 증명의 액세스가 다음 요청에서 중단됩니다. 토큰은 역할에서 드리프트되지 않습니다.
- 범위는 권한을 제거만 할 수 있으므로 범위가 지정된 자격 증명은 서버 / 도메인 관리로 상향식할 수 없습니다 (이 권한은 의도적으로 범위에 매핑되지 않음).
- API 키는 `cak_` 접두사를 지닙니다. `CustomAuthProvider.getUser()`는 이를 분기하고, 암호를 해싱하고, 각 호출에서 소유 사람의 라이브 RBAC를 다시 해석합니다.

[API 키 → 범위](../api/api-keys#scopes)를 참조하여 전체 카탈로그를 확인합니다.

## 표면 참고 자료

### REST API

완전한 제품 표면입니다. 모든 인증된 엔드포인트는 `Authorization: Bearer` 헤더의 JWT 또는 `cak_…` API 키를 수락합니다. 키 전용 또는 OAuth 전용 라우트 테이블이 없습니다. 모듈 및 기본 경로는 `Api/src/modules/*` 아래에 있습니다.

### API 키

개인 액세스 토큰 `cak_<prefix>.<secret>`으로, **B1Admin → 설정 → 개발자 → API 키**에서 생성됩니다. SHA-256 해시만 저장됩니다. 원본 키는 한 번 표시됩니다. `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`)에서 관리됩니다. 단일 교회의 자신의 스크립트와 Zapier, Make, Google Sheets 같은 커넥터에 최상입니다. → **[API 키](../api/api-keys)**

### OAuth 2.0 및 연결된 앱

각 교회가 동의해야 하는 멀티 테넌트 앱의 경우입니다. `Api/src/modules/membership/controllers/OAuthController.ts`의 `/membership/oauth` 아래에서 구현됩니다. 서버는 세 가지 부여를 지원합니다:

- **권한 부호** - `POST /oauth/authorize` (인증됨)는 단기 코드를 반환합니다. `POST /oauth/token`이 `grant_type=authorization_code`로 액세스 JWT (≈ 7일) + 새로 고침 토큰 (≈ 90일)과 교환합니다.
- **장치 코드** (RFC 8628) - `POST /oauth/device/authorize`는 `user_code`를 발급합니다. 사용자가 B1Admin (`/oauth/device/approve`)에서 승인합니다. 장치는 장치 코드 부여를 사용하여 `/oauth/token`을 폴링합니다. TV, 키오스크, 브라우저가 없는 CLI용입니다.
- **새로 고침 토큰** - `grant_type=refresh_token`은 새로운 액세스 토큰을 민팅합니다. 공개 (비밀 없음) 클라이언트는 비밀을 생략할 수 있습니다.

**연결된 앱**은 허용된 토큰의 교회 관리자 지향 보기이며, `/membership/oauth/connections`에서 나열하고 취소할 수 있습니다. 컨트롤러는 또한 OAuth **릴레이 세션** 브리지 (`/oauth/relay/*`)를 호스팅하여 브라우저가 없는 장치가 *외부* 공급자에 대한 로그인을 완료할 수 있습니다. → **[연결된 앱 및 OAuth](../api/connected-apps)**

### Webhooks

유일한 아웃바운드 표면입니다. 교회는 공개 HTTPS 엔드포인트를 이벤트에 구독합니다. 일치하는 변경이 발생하면 `WebhookDispatcher.emit(churchId, event, payload)`는 id 전용 페이로드를 디스플레이 이름 (`personName`, `groupName`, `formName`으로 강화합니다. 조회는 구독이 일치할 때만 실행됨), 배달을 기록하고, 백그라운드 워커가 서명된 JSON 봉투를 재시도/백오프 및 재배달을 사용하여 POST합니다. 엔진은 `Api/src/shared/webhooks/`에 있으며, 교회별 CRUD는 `/membership/webhooks` (`WebhookController.ts`) 아래에 있습니다. `connectorType` 필드는 Slack / Discord용 본문을 개형합니다. `mailchimp` 커넥터는 더 나아가 전체 HTTP 교환을 소유합니다 (이벤트당 메서드/URL/Mailchimp API에 대한 인증, `webhooks.connectorConfig`에서 암호화된 자격 증명). → **[Webhooks](../api/webhooks)**

### MCP 서버

`/mcp` (`Api/src/modules/mcp/`)의 AI 지향 래퍼입니다. 세 가지 일반 도구 - `list_endpoints`, `describe_endpoint`, `api_call` - 모든 REST 표면을 동적으로 모든 MCP 클라이언트에 노출합니다. 인증은 다른 모든 것과 동일한 bearer 토큰이며, `api_call`은 Express 스택 과정에 다시 들어가므로 모든 권한 및 교회 범위 규칙이 여전히 적용됩니다. → **[MCP 서버](../api/mcp)**

### 콘텐츠 제공업체

API가 아닌 별도의 패키지 `Packages/content-providers` (`@churchapps/content-providers`)의 인바운드 콘텐츠 경로입니다. 각 제공업체는 `IProvider` 인터페이스 (`src/interfaces.ts`)를 구현합니다. `browse`, `getPlaylist`, `getInstructions`, auth 훅이 있으며, `Map` 레지스트리 (`src/providers/registry.ts`)에 자가 등록합니다. 여기 **B1은 OAuth 클라이언트**입니다: 제공업체는 `AuthType` (`none`, `oauth_pkce`, `device_flow` 또는 `form_login`)을 선언하고 공유 헬퍼 (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`)는 외부 소스에 대해 클라이언트 측 PKCE / 장치 흐름을 실행합니다. 11개 제공업체는 오늘 배송합니다. Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, 및 B1.church를 포함하여 FreePlay 및 B1 앱에 공급합니다. → **[FreePlay 콘텐츠 제공업체](../freeplay-content-provider)**

## 요약

| 표면 | 인증 메커니즘 | 방향 | 구현 위치 | 참고 자료 |
|---|---|---|---|---|
| REST API | `Bearer` JWT 또는 `cak_…` 키 | 인바운드 | `Api/src/modules/*` | [API 키](../api/api-keys) |
| API 키 | SHA-256 해시된 `cak_` 토큰 | 자격 증명 | `Api/.../membership/controllers/ApiKeyController.ts` | [API 키](../api/api-keys) |
| OAuth 2.0 / 연결된 앱 | 권한 부호 · 장치 · 새로 고침 → JWT | 인바운드 | `Api/.../membership/controllers/OAuthController.ts` | [연결된 앱](../api/connected-apps) |
| Webhooks | 훅별 암호, HMAC-SHA256 서명 | 아웃바운드 | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP 서버 | `Bearer` JWT 또는 `cak_…` 키 | 인바운드 (AI) | `Api/src/modules/mcp/` | [MCP 서버](../api/mcp) |
| 콘텐츠 제공업체 | 제공업체별: 없음 / OAuth PKCE / 장치 / 양식 | 인바운드 콘텐츠 | `Packages/content-providers/` | [콘텐츠 제공업체](../freeplay-content-provider) |

## 사전 구성된 커넥터

모든 사람이 처음부터 구축하는 대신 ChurchApps는 위의 표면 위에 커넥터를 제공합니다:

- **[Slack 및 Discord](/docs/b1-admin/integrations/slack-discord)** - webhook `connectorType`은 표준 봉투를 채팅 메시지로 개형합니다. B1Admin에서 완전히 구성되며, 타사 계정이 없습니다.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** - `mailchimp` connectorType은 사람을 Mailchimp 청중으로 동기화하고 그룹/리스트 구성원 자격을 태그에 매핑합니다 (`Api/src/shared/webhooks/MailchimpConnector.ts`). 채팅 커넥터와 달리 교회 제공 URL로 POST하는 대신 이벤트당 자신의 인증된 요청 (upsert/archive/tag)을 발급합니다. API 키와 청중 id는 `webhooks.connectorConfig`에서 암호화된 상태로 유지됩니다. 단방향, 표준 병합 필드만 해당됩니다.
- **[Zapier](/docs/b1-admin/integrations/zapier)** 및 **[Make](/docs/b1-admin/integrations/make)** - webhook 이벤트를 트리거하고 REST API를 통해 작동합니다. Zap/시나리오가 켜질 때 자신의 webhook을 등록합니다 (`settings:write` 범위를 가진 키 필요). Zapier 앱의 소스는 `Integrations` 저장소의 `zapier/` (`Zapier CLI, `zapier push`로 배포됨).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** - API 키 인증 추가 기능은 사람 / 기부 / 그룹 / 참석을 필요에 따라 내보냅니다.
- **[Claude](/docs/b1-admin/integrations/claude)** 및 **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** - `/mcp`를 지향하는 MCP 클라이언트입니다.

자신의 코드의 경우, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`)가 모두 래핑합니다: 형식화된 REST 클라이언트, OAuth 클라이언트 (인증 코드 / 새로 고침 / 장치 흐름), Express 미들웨어가 있는 HMAC webhook 검증자.

## 관련 페이지

- [API 키](../api/api-keys) - 가장 단순한 자격 증명과 범위 카탈로그
- [연결된 앱 및 OAuth](../api/connected-apps) - 멀티 테넌트 동의 흐름
- [Webhooks](../api/webhooks) - 아웃바운드 이벤트 시스템
- [MCP 서버](../api/mcp) - AI 통합 래퍼
- [FreePlay 콘텐츠 제공업체](../freeplay-content-provider) - 인바운드 콘텐츠 소스 되기
- [통합 (최종 사용자)](/docs/b1-admin/integrations/) - 사전 구성된 커넥터 설정 가이드
