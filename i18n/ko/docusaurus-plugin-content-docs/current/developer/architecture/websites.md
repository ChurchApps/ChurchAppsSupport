---
title: "웹사이트 라우팅 및 다중 사이트"
---

# 웹사이트 라우팅 및 다중 사이트

<div class="article-intro">

한 교회가 이제 둘 이상의 서로 다른 웹사이트를 제공할 수 있으며, 각각은 `*.b1.church` 서브도메인 또는 완전히 사용자 정의된 교회 소유 도메인에 있을 수 있습니다. 이 페이지는 빌더 아래에 앉아 있는 라우팅 계층을 매핑합니다: 들어오는 요청이 어떻게 교회에 그리고 특정 사이트로 확인되는지, 다중 사이트 데이터 모델(모든 기존 사이트를 변경하지 않은 상태로 렌더링하게 하는 `siteId` 초침), 그리고 사용자 정의 도메인 가장자리 - EC2의 자체 관리 Caddy 프록시로, TLS를 종료하고 각 교회 도메인을 `*.b1.church` 업스트림으로 다시 씁니다. 요청이 교회와 사이트로 확인된 후 실제로 렌더링되는 것 - 페이지/섹션/요소 트리 - 은 [Website Builder](./website-builder)를 참조하세요.

</div>

## 개요

```
   grace.b1.church              www.gracechurch.org  (custom domain)
   (b1.church subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy edge - EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • terminates TLS (per-domain LE cert)    │
          │             │  • rewrites Host → {sub}.b1.church        │
          │             │  • reverse-proxies to B1App               │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • always: delete any client-supplied x-site (anti-spoof)   │
   │  • internal *.b1.church Host ⇒ domains lookup stays inert   │
   │  • raw custom Host (bypassing Caddy) ⇒ lookup → set x-site  │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host first-label → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   threads ?siteId= into every content call:      │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  domain save/delete (B1Admin Settings→Domains → POST /membership/domains)
        └─ best-effort CaddyHelper.updateCaddy()  (wrapped, non-fatal, 10s timeout)
  Caddy reads the domains table itself via two anonymous endpoints:
        GET /membership/domains/authorize  — on-demand-TLS `ask` (200 known / 404 unknown)
        GET /membership/domains/hostmap    — host→{sub}.b1.church map (5-min refresh)
```

세 가지 규칙이 이 계층 전체에서 유지됩니다:

1. **초침이 모든 것을 역호환 유지합니다.** `siteId = ''`은 주 사이트입니다. 이 기능 전에 존재했던 모든 페이지, 블록, 링크, 전역 스타일 및 도메인 행은 `''`을 수행하고 정확히 이전처럼 렌더링됩니다. **두 번째** 웹사이트는 단순히 비어있지 않은 `siteId`를 가진 행 집합이며, `?siteId=` 없이 호출된 모든 콘텐츠 엔드포인트는 주 사이트를 반환합니다 - 바이트 단위로 이전 요청입니다.
2. **해석은 호스트 레이블 기반이고 수렴합니다.** `*.b1.church` 서브도메인은 호스트 레이블로 직접 라우팅됩니다; 사용자 정의 도메인은 B1App에서 보기 전에 Caddy 가장자리에서 `{sub}.b1.church` 레이블로 다시 씀(구성 원시 사용자 정의 `Host`에 대한 폴백으로 미들웨어 DB 조회 포함). 두 다리는 동일한 `[sdSlug]` 경로 및 동일한 `churches/lookup` 호출에 도착하므로 다운스트림 렌더링은 동일합니다.
3. **Caddy 가장자리는 하나의 진실 소스에 대해 상태가 없습니다.** 사용자 정의 도메인은 EC2의 자체 관리 Caddy 프록시에서 종료되며, 각 도메인을 `{sub}.b1.church` 업스트림으로 다시 씁니다. 도메인 저장은 단일 최선 노력 `CaddyHelper.updateCaddy()`를 시작하고, Caddy는 또한 `domains` 테이블을 직접 읽습니다(아래 `authorize` 및 `hostmap` 엔드포인트). 테이블은 권위적입니다 - 도달할 수 없는 Caddy는 저장을 실패할 수 없습니다.

## 사이트 해석

### `*.b1.church` 서브도메인

`B1App/next.config.mjs`는 호스트별로 들어오는 요청을 다시 씁니다. 패턴 `(?<subdomain>.*?)\..*`이 있는 호스트 규칙은 호스트의 **첫 번째 레이블**을 캡처하고 `/` 및 `/:path*`를 `/{subdomain}` - `[sdSlug]` App-Router 세그먼트로 다시 씁니다. 그래서 `grace.b1.church/about`은 `/grace/about`이 됩니다.

`src/app/[sdSlug]/` 내에서 `ConfigHelper.load(sdSlug)`(`src/helpers/ConfigHelper.ts`)는 `GET /membership/churches/lookup/?subDomain={sdSlug}`을 호출합니다. `ChurchController.getBySubDomain` 응답에는 이제 두 가지 분기가 있습니다:

| 슬러그 일치 | 응답 | 의미 |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | 그 교회의 주 사이트 |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **보조 사이트** - 컨트롤러는 `sites`로 폴백하고, 소유 교회를 해석하며, 쿼리된 슬러그와 추가 `siteId`를 에코합니다 |

그 추가 `siteId`는 보조 사이트 요청을 주 요청과 구별하는 유일한 것입니다; 파이프라인의 다른 모든 것은 공유됩니다.

### 사용자 정의 도메인

교회 소유 도메인은 **Caddy 가장자리**(아래에 자세히 설명)에서 종료되며, 이는 B1App으로 프록시하기 전에 `Host` 헤더를 사이트의 `{sub}.b1.church`로 다시 씁니다. 그래서 정상 경로에서 B1App은 *내부* `*.b1.church` 호스트를 받고 호스트 레이블로 정확히 기본 서브도메인처럼 해석합니다 - 미들웨어의 DB 조회는 절대 시작되지 않습니다. `src/middleware.ts`는 여전히 모든 요청에서 실행되지만 항상 켜진 하나의 작업과 하나의 폴백:

1. **항상** - **클라이언트 제공 `x-site` 헤더를 삭제합니다**. 그 헤더는 스푸핑 가능한 재작성 입력이며 미들웨어 자체가 설정할 때만 신뢰됩니다; 제거하는 것은 Caddy 뒤의 미들웨어의 실제 작업입니다.
2. **폴백, 비내부 `Host`만** - Caddy의 재작성 없이 B1App에 도달하는 원시 사용자 정의 도메인 `Host`의 경우, `GET /membership/domains/public/lookup/{host}`을 호출하고, `subDomain`을 반환하면 `x-site: {subDomain}.b1.church`를 설정합니다. Caddy 뒤의 이 분기는 불활성입니다. `Host`는 이미 `*.b1.church`이기 때문입니다.

내부 호스트 - `localhost`, `b1.church`, 그리고 접미사 `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` - 조회를 완전히 건너뜁니다(이미 호스트 레이블 재작성으로 해석되거나 미리보기/배포 호스트입니다).

조회 자체(`DomainRepo.loadByName`)는 `domains → churches` 및 `domains → sites`를 왼쪽으로 조인하고 `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` - 도메인이 지정된 보조 사이트의 서브도메인이면 그렇지 않으면 교회의를 반환합니다. 정확한 호스트를 먼저 일치시킵니다; 그 호스트가 `www.`로 시작했고 놓쳤다면, **한 번** 기본 정점에 대해 재시도합니다.

`next.config.mjs`에서 `x-site` 재작성 규칙은 일반 호스트 규칙 **앞에** 배치되므로 이기심. `x-site: grace.b1.church` → 첫 번째 레이블 `grace` → `[sdSlug] = grace`, 그리고 거기에서 해석은 서브도메인 경로와 동일합니다(동일한 `churches/lookup`, 동일한 `siteId`).

:::info
`x-site` 헤더는 외부에서 신뢰할 수 없습니다. 미들웨어는 조건부로 선택적 자신을 설정하기 전에 모든 인바운드 `x-site`를 무조건 제거하고, 재작성 규칙은 미들웨어 설정 값만 봅니다 - 클라이언트는 헤더를 보내서 자신을 다른 교회의 콘텐츠로 강제할 수 없습니다.
:::

미들웨어의 두 가지 운영 세부사항:

- **캐시.** 각 호스트의 결과(히트 *또는* 확인된 미스 - 네트워크 오류 없음)는 각 서버리스 격리에서 in-memory `Map`에서 **10분** 동안 캐시됩니다.
- **매처.** 매처는 의도적으로 `/sitemap.xml`, `/robots.txt`, 및 `/manifest.webmanifest`를 다시 포함합니다. 첫 번째 패턴은 점 경로를 제외하며, 그렇지 않으면 이 파일을 삭제할 것입니다; 사용자 정의 도메인의 교회별 SEO/PWA 파일도 `x-site` 헤더를 받도록 다시 추가됩니다.
- **정규 헤더.** 교회 페이지의 경우 미들웨어는 `Link: <{proto}://{host}{path}>; rel="canonical"` 응답 헤더를 추가하여 페이지가 실제로 제공된 호스트(서브도메인 또는 사용자 정의 도메인)를 명명합니다. 비교회 호스트(`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`)와 `/mobile`, `/login`, `/logout`, 그리고 생성된 robots/sitemap/manifest 파일에서는 건너뜁니다.

### 비활성화된 공개 웹사이트

교회는 B1Admin에서 **Disable Public Website**(교회 수준 콘텐츠 설정 `hidePublicSite = "true"`)를 켤 수 있습니다. 사이트는 그 다음 회원 전용 경로만 제공합니다:

- **B1App 미들웨어**는 서브도메인을 조회하고(`/membership/churches/lookup` 그 다음 `/content/settings/public/:churchId`) 허용 목록 외의 모든 경로에 대한 익명 요청을 `/login?returnUrl={path}{query}`로 리디렉션합니다. 허용 목록(`helpers/publicSite.ts`)은 `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, 그리고 매니페스트/robots/sitemap 파일입니다. 확인된 답변만 캐시됩니다(본 프로덕션에서 60초, 관리자의 재검증 호출이 이 인-인스턴스 맵을 지울 수 없기 때문; dev/test에서는 캐시되지 않음). API 오류는 사이트를 제공하기보다는 모든 사람을 잠그지 않습니다.
- **서명된 회원은 전체 사이트를 봅니다.** 만료되지 않은 `jwt` 쿠키를 소유한 요청(미들웨어의 `hasSession()`은 서명을 검증하지 않고 페이로드의 `exp`를 디코드합니다 - 이는 소프트 게이트이지, 액세스 제어가 아닙니다)은 리디렉션을 건너뛰므로 로그인 후 회원은 요청한 페이지로 돌아가고 정상 페이지, 내장 페이지(그룹, 설교, 등), 그리고 헤더 네비게이션을 봅니다. 페이지 컴포넌트와 `Header`는 더 이상 `hidePublicSite`을 스스로 확인하지 않습니다.
- **`robots.txt`**는 noindex 호스트처럼 모든 것을 거부합니다.
- **API.** `GET /content/pages/public/:churchId`(사이트맵의 페이지 목록)은 `[]`을 반환하므로 익명 발신자는 페이지를 나열할 수 없습니다.

### `siteId` 스레딩

`ConfigHelper`는 해결된 `siteId`를 요청별 `ConfigurationInterface`(React `cache()`로 메모이즈됨)에 저장하고 콘텐츠 호출에 `?siteId=`를 추가합니다 및 페이지 컴포넌트가 만듭니다 - **조건부로**: 빈 `siteId`(주 교회 서브도메인)는 매개변수를 완전히 생략합니다. 스레드된 엔드포인트는 페이지 트리(`/content/pages/:id/tree`), 사이트맵이 사용하는 공개 페이지 목록(`/content/pages/public/:id`), 전역 스타일(`/content/globalStyles/church/:id`), nav 링크(`/content/links/church/:id`), 그리고 스탠드얼론 바닥글 블록(`/content/blocks/public/footer/:id`)입니다. 정상 렌더 경로에서 바닥글은 페이지 트리 내에 도착합니다(섹션 태그 `zone: "siteFooter"`), 이미 `siteId`로 가져온, 따라서 범위가 지정되지 않은 바닥글 간격은 없습니다.

회원 포털(B1App `mobile`)은 의도적으로 이 외부에 앉습니다: `loadChurchAppearance.ts`는 `churches/lookup`을 통해 교회를 해석하지만 교회 수준 `/settings/public/{id}`을 읽고 `siteId`를 절대로 스레드하지 않습니다 - 포털은 v1에서 교회 차원입니다(아래 참조).

## 교회당 여러 웹사이트

### 데이터 모델

새 `membership.sites` 테이블은 의도적으로 작습니다:

| 열 | 유형 | 참고 |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | 소유 교회 |
| `name` | `varchar(255)` | 표시 이름(예: "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Unique index** - 전역 네임스페이스(아래) |

사이트 범위는 그 다음 콘텐츠 및 도메인 테이블에 추가된 단일 nullable-free 열입니다:

| 테이블(모듈) | 열 | `''` 의미 |
|----------------|--------|-----------|
| `domains`(멤버십) | `siteId char(11) NOT NULL DEFAULT ''` | 도메인은 주 사이트를 제공합니다 |
| `pages`, `links`, `globalStyles`, `blocks`(콘텐츠) | `siteId char(11) NOT NULL DEFAULT ''` | 주 사이트 - 그리고 **`blocks`**에서 `''`는 또한 *모든 사이트에 걸쳐 공유됨*을 의미합니다 |

두 마이그레이션은 이 모두를 추가합니다(`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). 열이 `''`로 기본값이므로, 모든 기존 행은 백필 없이 오늘날의 동작을 유지합니다.

**전역 서브도메인 네임스페이스.** `sites.subDomain`은 *하나의* `churches.subDomain` 네임스페이스를 공유합니다 - 사이트 서브도메인은 교회 서브도메인 또는 다른 사이트와 충돌할 수 없습니다. 이는 **두 저장 경로**에서 강제됩니다: `SiteController.save`는 `churches` 또는 `sites` 중 하나를 치는 슬러그를 거부하고, `ChurchController.validateSave`는 역으로 동일합니다. `sites.subDomain`의 unique 인덱스는 데이터베이스 수준에서 이를 백업합니다.

**페이지 고유성**은 `(churchId, url)`에서 `(churchId, siteId, url)`로 확대되었으므로, 한 교회의 두 사이트는 각각 자신의 `/about`을 소유할 수 있습니다.

### 사이트별 콘텐츠, 폴백 포함

모든 사이트 범위 콘텐츠 **list/tree** 엔드포인트는 선택적 `?siteId=`를 취합니다(부재 ⇒ `''` = 주): 페이지 트리 / 목록 / 공개, 블록 목록 / 유형별 / 바닥글, 링크(익명 / 필터링 / 모두), 그리고 전역 스타일. 섹션과 요소는 *직접* 범위가 지정되지 않습니다 - 그들은 부모 페이지 또는 블록을 통해 상속됩니다.

두 해석 체인은 흥미로운 작업을 합니다:

- **전역 스타일 - `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)`은 사이트 자신의 행을 반환합니다; 보조 사이트가 없다면, **주(`''`) 행을 그대로** 반환합니다(주의 `id`/`siteId`를 유지하며, 클라이언트는 copy-on-write를 사용함); 주도 없다면, `GlobalStyleController`는 하드코드된 기본 팔레트/폰트를 반환합니다.
- **바닥글 블록 - 사이트 특정이 이기면, 공유 폴백.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)`은 공유(`''`) *그리고* 사이트 특정 행을 반환합니다; 리졸버는 사이트 자신의 바닥글이 있으면 선택하고, 그렇지 않으면 공유된 것을 선택합니다. 동일한 로직은 `TreeHelper.insertBlocks`(페이지 트리)와 스탠드얼론 `/content/blocks/public/footer/:churchId` 엔드포인트 모두에서 실행됩니다.

### 사이트 삭제 캐스케이드

`SiteController.delete`(멤버십 Settings→Edit 권한에서 게이팅됨)은 보조 사이트를 세 단계로 해체합니다:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)`은 사이트가 소유한 모든 콘텐츠를 캐스케이드합니다: **pages** → 그들의 섹션, 요소, `pageHistory`, 그리고 `posts`; 자신의 **blocks** → 그들의 섹션, 요소, 그리고 `pageHistory`; **links** 그리고 **globalStyles**. 가드는 `''`에 대해 실행하기를 거부합니다 - 주/공유 초침은 절대 캐스케이드되지 않습니다.
2. `DomainRepo.clearSiteId` **재지정** 사이트의 도메인을 주(`siteId → ''`)로 되돌리지 않고 삭제하므로, 사용자 정의 도메인은 사이트 삭제를 살아남습니다.
3. `sites` 행은 삭제되고 Caddy 경로는 재동기화됩니다(최선 노력).

### B1Admin 표면

| 능력 | 어디 | 메커니즘 |
|-----------|-------|-----------|
| 사이트 전환기 | `useSiteSelection` + `SiteSwitcher`(empty = "Main Website") | `?site=` URL 매개변수를 읽고 `?siteId=`로 ContentApi 호출에 스레드합니다. 세 가지 Site **list** 영역 - **Pages**, **Blocks**, **Appearance** - 에 있지만 *not* 페이지/블록 편집자, 기록에 `siteId`를 수행하는 |
| 사이트 만들기/삭제 | `SitesDialog`, 전환기의 "Manage websites…" 항목에서 열림 | `POST /membership/sites` / `DELETE /membership/sites/:id`(이름 + subDomain). 멤버십 Settings→Edit 권한에서 게이팅(`Permissions.settings.edit` 서버 측; B1Admin에서 `Permissions.membershipApi.settings.edit`). **만들기/삭제만 - v1에서 이름 변경 UI는 없습니다** |
| 도메인당 사이트 할당 | Settings→Domains 아래 `DomainSettingsEdit` | 행당 사이트 드롭다운은 도메인당 `/membership/domains`에 `siteId`를 POST합니다. 열은 API가 사이트를 반환하지 않으면 숨깁니다(더 오래된 백엔드) |
| Copy-on-write 스타일 | `StylesManager.prepareForSave` | 로드된 전역 스타일 행의 `siteId`가 선택된 사이트와 일치하지 않을 때(즉, API가 폴백으로 상속 주를 반환했음), 주의 `id`를 삭제하고 현재 `siteId`를 스탬프하면 주를 덮어쓰기 대신 새 사이트 특정 행의 **insert**를 강제합니다. 동일한 fork-on-mismatch는 사이트 바닥글 블록에 적용됩니다 |

:::info
**v1에서 교회 차원으로 머물러야 할 것(설계 선택, 데이터 모델 제한이 아닙니다):** **blog**(`BlogPage`는 전환기가 없고 `siteId`이 없는 `/posts`를 로드합니다), **site widgets**(공지 배너 + 런처), **redirects**, **logo / GA4 / church settings**, 그리고 **member portal**(B1App 모바일). 이것은 *"Appearance의 모두"* - 보조 사이트의 전역 스타일(팔레트, 폰트, 타이포그래피, 간격, nav, 사용자 정의 CSS) **은** copy-on-write 경로를 통해 사이트별이 아닙니다; Appearance 페이지의 배너/런처/리디렉션/로고 하위 패널만 교회 차원으로 남습니다.
:::

## 사용자 정의 도메인: Caddy Edge (정적 구성 계획)

:::info
**방향 2026-07-02에서 수정.** Vercel 관리 도메인으로 사용자 정의 도메인 호스팅을 이동하려는 이전 계획이 **취소**되었고, 모든 Vercel 도메인 등록 코드(`VercelHelper`, 그들의 `vercelToken`/`vercelProjectId`/`vercelTeamId` env 변수, SSM 매개변수, 그리고 건강 항목)는 Api에서 제거되었습니다. 자체 관리 **Caddy 프록시 EC2는 유지**됩니다 영구적 사용자 정의 도메인 가장자리로. 유일한 남은 작업은 내부입니다: Caddy의 *runtime* 관리자-API 구성을 재시작을 살아남는 *static* 구성으로 바꾸기.
:::

### 가장자리

모든 사용자 정의 교회 도메인은 하나의 EC2 상자에서 DNS 포인트합니다 - `3.23.251.61`, 또한 `proxy.b1.church`로 도달 가능합니다. B1Admin의 Settings→Domains 화면은 교회에 정점 `A → 3.23.251.61` 또는 `CNAME → proxy.b1.church`를 추가하라고 지시합니다. Caddy는 도메인 당 Let's Encrypt 인증서로 TLS를 종료하고, `Host` 헤더를 도메인의 `{sub}.b1.church` 업스트림으로 다시 씁니다, 그리고 B1App으로 역 프록시합니다 - 이는 그 다음 일반 서브도메인처럼 호스트 레이블로 라우팅합니다([사용자 정의 도메인](#custom-domains) 위 참조).

업스트림 매핑은 `DomainRepo.loadPairs`에서 옵니다, 그 목록은 **할당된 사이트의 서브도메인을 COALESCE**하므로 도메인은 올바른 *보조* 사이트로 프록시합니다, 교회의 주로 폴백:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` 행은 맵에서 제외됩니다; Caddy는 대신 정점으로 `302` 리디렉션을 통해 `www.{host}`를 제공합니다.

### 두 익명 엔드포인트가 가장자리를 공급합니다

`DomainController`는 박스가 직접 소비하는 두 가지 미인증, 읽기 전용 엔드포인트를 노출합니다 - 필요에 의해 익명이므로, 가장자리는 모든 교회 컨텍스트 전에 그들을 쿼리합니다:

| 엔드포인트 | 반환 | 역할 |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | `200`이면 도메인 - 또는, `www.` 미스의 경우, 기본 정점 - `domains`에 존재; `404` 그렇지 않으면(빈 `domain` 포함) | Caddy의 **on-demand-TLS `ask`**: 들어오는 SNI에 대한 인증서를 발급할지 결정하는 학대 제어 |
| `GET /membership/domains/hostmap` | `text/plain`, 라우트 가능한 도메인당 하나의 정렬된 `{domain} {sub}.b1.church` 행 | 박스가 타이머에 새로 고침하는 호스트→업스트림 맵 파일 |

`authorize`는 `DomainRepo.loadByName`를 재사용합니다(정확한 호스트, 그 다음 단일 `www.`→apex 재시도); `hostmap`은 `loadPairs`를 재사용합니다 - 그래서 사이트 인식 및 `www.*` 제외입니다, 프록시 경로와 동일합니다 - 그리고 단지 `:443` 접미사를 제거합니다.

### 도메인 저장/삭제 - 하나의 최선 노력 푸시

`DomainController.save`는 `domains` 행을 작성한 다음 단일 최선 노력 `CaddyHelper.updateCaddy()` 호출을 만들고, `try/catch`에 래핑되어 로그(`console.error`) 그리고 삼킵니다; `delete`는 동일하게 하고(또한 사전 stale-route-on-delete 버그를 고정), 보조 사이트 삭제(`SiteController.delete`)도 합니다. `updateCaddy`는 자체가 **10s** Axios 타임아웃으로 제한되므로, 도달할 수 없거나 중지된 Caddy는 결코 도메인 저장을 `500`할 수 없습니다 - `domains` 테이블이 진실의 원본입니다.

### 현재 상태 - 정적 구성, 런타임 상태 없음

박스(영구 Elastic IP 뒤 Windows EC2)는 **static Caddyfile**에서 Caddy를 실행합니다: on-demand TLS 그 `ask`는 `/membership/domains/authorize`를 지정하고, 호스트→업스트림 맵 파일은 `/membership/domains/hostmap`에서 5분마다 새로 고쳐지며 우아한 `caddy reload`로 끝나는 예약 작업. 구성은 재시작으로 0 런타임 상태를 생존하고 - 재작동 춤 없음 - 그리고 미지의 SNI는 **TLS 거부됩니다**(no 인증서는 `authorize`가 거부하는 호스트에 대해 조각됩니다), 인증되지만 아직 매핑되지 않은 호스트(동기 창 내 새 도메인)는 깨끗한 404를 가져옵니다. 새 도메인은 저장 후 ~5분 이내에 라우트 가능하게 됩니다; 그들의 인증서는 첫 히트에 조각됩니다. 빌드/설정, 운영, 그리고 필드 테스트 gotchas: [Caddy 사용자 정의 도메인 프록시](../deployment/caddy-proxy).

### 레거시 런타임 푸시 - 롤백 경로, 삭제 대기 중

`CaddyHelper`(멤버십 모듈)는 여전히 **관리자 API**를 통해 `caddyHost:caddyPort`에서 Caddy를 구동할 수 있습니다(SSM `caddyHost`/`caddyPort`; 설정되지 않으면 no-op; `ServerHealthController`의 Integrations 그룹 아래에 표면화됨): `updateCaddy()`는 전체 경로 배열을 PATCH하고, `initializeCaddy()` + `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` 엔드포인트는 처음부터 런타임 구성된 서버를 재구축합니다. 그 모드의 구성은 Caddy의 메모리에만 살았습니다 - 재시작 건망증이 이 아키텍처를 교체했습니다. 기계는 단지 롤백 경로로 유지되고 정적 박스가 안정적이 되면 삭제 일정이 잡혀 있습니다; 도메인 저장/삭제에 최선 노력 `updateCaddy()` 푸시는 정적 박스에 대해 해로운 no-op입니다(그들의 관리자 API는 localhost만).

## 관련 페이지

- [Caddy 사용자 정의 도메인 프록시](../deployment/caddy-proxy) - 가장자리 박스 자체: 신선한 박스 설정, WinSW 서비스, 맵 동기 작업, 그리고 운영 gotchas
- [Website Builder](./website-builder) - 페이지/섹션/요소 트리, 렌더러, 블로그, SEO, 그리고 AI 생성(요청이 교회/사이트로 확인된 후 렌더링되는 것)
- [콘텐츠 엔드포인트](../api/endpoints/content) - 페이지, 블록, 링크, 그리고 전역 스타일의 REST 표면, 모두 `?siteId=` 인식
- [B1App](../web-apps/b1-app) - 미들웨어 및 `[sdSlug]` 라우팅을 호스팅하는 Next.js 앱
- [웹 앱 배포](../deployment/web-apps) - B1App을 Vercel에 배포하는 방법
