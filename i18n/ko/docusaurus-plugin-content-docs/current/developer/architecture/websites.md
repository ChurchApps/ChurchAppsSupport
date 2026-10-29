---
title: "웹사이트 라우팅 및 다중 사이트"
---

# 웹사이트 라우팅 및 다중 사이트

<div class="article-intro">

교회 하나가 둘 이상의 별개 웹사이트를 제공할 수 있으며, 각 사이트는 `*.b1.church` 서브도메인이나 교회가 소유한 완전한 사용자 지정 도메인에 있을 수 있습니다. 이 페이지에서는 빌더 *아래에* 있는 라우팅 계층을 설명합니다. 들어오는 요청이 교회**와** 특정 사이트로 해석되는 방식, 기존 사이트 모두가 변함없이 렌더링되도록 하는 `siteId` 센티널이 있는 다중 사이트 데이터 모델, 그리고 TLS를 종료하고 각 교회 도메인을 `*.b1.church` 업스트림으로 다시 쓰는 EC2의 자체 관리 Caddy 프록시인 사용자 지정 도메인 에지를 다룹니다. 요청이 해석된 후 실제로 렌더링되는 것(페이지/섹션/요소 트리)은 [웹사이트 빌더](./website-builder)를 참고하세요.

</div>

## 개요

```
   grace.b1.church              www.gracechurch.org  (custom domain)
   (b1.church subdomain)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy edge — EC2 3.23.251.61              │
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

이 계층 전체에 적용되는 세 가지 규칙이 있습니다.

1. **센티널이 모든 것을 하위 호환으로 유지합니다.** `siteId = ''`는 기본 사이트입니다. 이 기능 이전에 존재했던 모든 페이지, 블록, 링크, 전역 스타일, 도메인 행은 `''`를 가지며 이전과 정확히 같이 렌더링됩니다. *두 번째* 웹사이트는 단순히 비어 있지 않은 `siteId`를 가진 행들의 집합이며, `?siteId=` 없이 호출된 콘텐츠 엔드포인트는 기본 사이트를 반환합니다. 바이트 단위로 예전 요청과 같습니다.
2. **해석은 호스트 레이블 기반이며 한 곳으로 수렴합니다.** `*.b1.church` 서브도메인은 호스트 레이블로 직접 라우팅되며, 사용자 지정 도메인은 B1App이 보기 전에 Caddy 에지에서 `{sub}.b1.church` 레이블로 다시 쓰입니다(원시 사용자 지정 `Host`에 대한 대체 수단으로, DB 조회가 `x-site` 헤더를 찍는 미들웨어도 있습니다). 두 경로 모두 같은 `[sdSlug]` 라우트와 같은 `churches/lookup` 호출에 도달하므로, 이후 렌더링은 동일합니다.
3. **Caddy 에지는 하나의 진실 원천을 바라보는 무상태입니다.** 사용자 지정 도메인은 각 도메인을 `{sub}.b1.church` 업스트림으로 다시 쓰는 자체 관리 Caddy 프록시에서 종료됩니다(EC2). 도메인 저장은 단일 best-effort `CaddyHelper.updateCaddy()`를 발생시키며, Caddy도 `domains` 테이블을 직접 읽습니다(아래의 `authorize`와 `hostmap` 엔드포인트). 테이블이 권위 있는 원천입니다. 도달할 수 없는 Caddy가 저장을 절대 실패시킬 수 없습니다.

## 사이트 해석

### `*.b1.church` 서브도메인

`B1App/next.config.mjs`는 호스트별로 들어오는 요청을 다시 씁니다. `(?<subdomain>.*?)\..*` 패턴의 호스트 규칙은 호스트의 **첫 번째 레이블**을 캡처하고, `/`와 `/:path*`를 `/{subdomain}`(`[sdSlug]` App Router 세그먼트)으로 다시 씁니다. 따라서 `grace.b1.church/about`은 `/grace/about`이 됩니다.

`src/app/[sdSlug]/` 안에서 `ConfigHelper.load(sdSlug)`(`src/helpers/ConfigHelper.ts`)는 `GET /membership/churches/lookup/?subDomain={sdSlug}`를 호출합니다. `ChurchController.getBySubDomain` 응답에는 이제 두 가지 분기가 있습니다.

| 슬러그가 일치하는 곳 | 응답 | 의미 |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | 그 교회의 기본 사이트 |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **보조 사이트**. 컨트롤러가 `sites`로 대체하여 소유 교회를 해석하고, 조회한 슬러그와 추가된 `siteId`를 돌려줍니다 |

이 추가 `siteId`가 보조 사이트 요청을 기본 요청과 구별하는 유일한 요소입니다. 그 밖의 파이프라인은 모두 공유됩니다.

두 테이블 어디와도 일치하지 않는 슬러그는 `200`과 함께 `{}`로 반환됩니다. `ConfigHelper.load`는 `id`가 없는 응답을 알 수 없는 사이트로 취급하고 Next의 `notFound()`를 호출하므로, 알 수 없는 서브도메인은 이후의 모든 호출이 `/…/undefined`를 요청하는 대신 실제 404를 받습니다. 빌더 페이지 라우트도 `pageTreePath()`(`src/helpers/pageTreePath.ts`)로 트리 경로를 만들며, 이 함수는 슬러그를 URL 인코딩합니다. 그래서 잘못된 슬러그(백슬래시, 공백)는 API의 `400`을 500으로 드러내는 대신 404가 됩니다.

### 사용자 지정 도메인

교회가 소유한 도메인은 **Caddy 에지**(아래에서 자세히 설명)에서 종료되며, 이 에지는 B1App으로 프록시하기 전에 `Host` 헤더를 사이트의 `{sub}.b1.church`로 다시 씁니다. 따라서 일반 경로에서 B1App은 *내부* `*.b1.church` 호스트를 받으며, 네이티브 서브도메인과 똑같이 호스트 레이블로 해석합니다. 미들웨어의 DB 조회는 절대 실행되지 않습니다. `src/middleware.ts`는 여전히 모든 요청에서 실행되지만, 항상 수행하는 작업 하나와 대체 작업 하나가 있습니다.

1. **항상** — 클라이언트가 보낸 **`x-site` 헤더를 삭제**합니다. 이 헤더는 위조 가능한 리라이트 입력이며, 미들웨어 자신이 설정할 때만 신뢰됩니다. Caddy 뒤에서 미들웨어의 실제 역할은 이것을 벗겨 내는 것입니다.
2. **대체 수단, 내부가 아닌 `Host`에만** — Caddy의 리라이트 없이 B1App에 도달한 원시 사용자 지정 도메인 `Host`에 대해서는 `GET /membership/domains/public/lookup/{host}`를 호출하고, `subDomain`이 반환되면 `x-site: {subDomain}.b1.church`를 설정합니다. Caddy 뒤에서는 `Host`가 이미 `*.b1.church`이므로 이 분기는 작동하지 않습니다.

내부 호스트 — `localhost`, `b1.church`, 그리고 `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` 접미사 — 는 조회를 완전히 건너뜁니다. 이들은 이미 호스트 레이블 리라이트로 해석되었거나, 미리 보기/배포 호스트이기 때문입니다.

조회 자체(`DomainRepo.loadByName`)는 `domains → churches`와 `domains → sites`를 LEFT JOIN하고 `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`을 반환합니다. 도메인이 보조 사이트를 가리키면 그 사이트의 서브도메인이, 아니면 교회의 서브도메인이 반환됩니다. 정확한 호스트를 먼저 찾고, 그 호스트가 `www.`로 시작했는데 실패하면 베어 apex에 대해 **한 번** 재시도합니다.

`next.config.mjs`에서 `x-site` 리라이트 규칙은 일반 호스트 규칙 **앞에** 배치되므로 우선합니다. `x-site: grace.b1.church` → 첫 레이블 `grace` → `[sdSlug] = grace`이며, 여기서부터의 해석은 서브도메인 경로와 똑같습니다(같은 `churches/lookup`, 같은 `siteId`).

:::info
`x-site` 헤더는 외부에서 보낸 것을 신뢰하지 않습니다. 미들웨어는 자신이 설정하기 전에 들어오는 `x-site`를 무조건 벗겨 내며, 리라이트 규칙은 미들웨어가 설정한 값만 봅니다. 따라서 클라이언트는 헤더를 보내는 것만으로 다른 교회의 콘텐츠에 강제로 접근할 수 없습니다.
:::

미들웨어에 관한 두 가지 운영 세부 사항이 있습니다.

- **캐시.** 각 호스트의 결과(적중 또는 확정된 미스. 네트워크 오류는 절대 아님)는 서버리스 아이솔레이트마다 있는 메모리 내 `Map`에 **10분** 동안 캐시됩니다.
- **매처.** 매처는 `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`를 의도적으로 다시 포함합니다. 첫 번째 패턴은 점이 있는 경로를 제외하는데, 그러면 이 파일들이 빠지기 때문입니다. 이 파일들을 다시 추가하여 사용자 지정 도메인의 교회별 SEO/PWA 파일도 `x-site` 헤더를 받게 합니다.
- **정식 헤더.** 교회 페이지에 대해 미들웨어는 `Link: <{proto}://{host}{path}>; rel="canonical"` 응답 헤더를 추가하며, 페이지가 실제로 제공된 호스트(서브도메인 또는 사용자 지정 도메인)를 이름으로 지정합니다(`helpers/canonicalLink.ts`). 사용자 지정 도메인이 [Caddy 프록시](../deployment/caddy-proxy)를 통해 B1App에 도달하면, 요청 호스트는 `{sub}.b1.church` 서브도메인이므로, 미들웨어는 대신 `X-Church-Host`에서 방문자의 도메인을 사용합니다. 다만 `/domains/public/lookup/{host}`가 그 도메인이 같은 서브도메인에 매핑된다고 확인한 뒤에만 사용합니다(`ownsSubdomain()`). 그러면 정식 링크, `robots.txt`, `sitemap.xml`이 `b1.church` 서브도메인이 아니라 사용자 지정 도메인을 이름으로 지정합니다. 교회가 아닌 호스트(`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`)와 `/mobile`, `/login`, `/logout`, 생성된 robots/sitemap/manifest 파일에서는 건너뜁니다.

### 공개 웹사이트 비활성화

교회는 B1Admin에서 **Disable Public Website**(교회 수준 콘텐츠 설정 `hidePublicSite = "true"`)를 켤 수 있습니다. 그러면 사이트는 교인을 대상으로 한 라우트만 제공합니다.

- **B1App 미들웨어**는 서브도메인을 조회하고(`/membership/churches/lookup`, 그다음 `/content/settings/public/:churchId`), 허용 목록 밖의 경로에 대한 익명 요청을 `/login?returnUrl={path}{query}`로 리디렉션합니다. 허용 목록(`helpers/publicSite.ts`)은 `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, 그리고 manifest/robots/sitemap 파일입니다. 확정된 응답만 캐시되며(운영에서 60초. 관리자의 revalidate 호출이 인스턴스별 맵을 지울 수 없기 때문입니다. 개발/테스트에서는 캐시하지 않습니다), API 오류는 모두를 잠그는 대신 사이트를 제공합니다.
- **로그인한 교인은 전체 사이트를 봅니다.** 만료되지 않은 `jwt` 쿠키를 가진 요청(미들웨어의 `hasSession()`은 서명을 검증하지 않고 페이로드의 `exp`만 디코드합니다. 이것은 접근 제어가 아니라 소프트 게이트입니다)은 리디렉션을 건너뛰므로, 로그인한 교인은 요청했던 페이지로 돌아가고 일반 페이지, 내장 페이지(Groups, Sermons 등), 헤더 내비게이션을 봅니다. 페이지 컴포넌트와 `Header`는 더 이상 `hidePublicSite`를 스스로 확인하지 않습니다.
- **`robots.txt`**는 noindex 호스트처럼 모든 것을 허용하지 않습니다.
- **API.** `GET /content/pages/public/:churchId`(사이트맵의 페이지 목록)는 `[]`를 반환하므로, 익명 호출자는 페이지를 나열할 수 없습니다.

### `siteId` 전달

`ConfigHelper`는 해석된 `siteId`를 요청별 `ConfigurationInterface`에 저장하고(React `cache()`로 메모이즈), 자신과 페이지 컴포넌트가 하는 콘텐츠 호출에 `?siteId=`를 덧붙입니다. 이것은 **조건부**입니다. 빈 `siteId`(기본 교회 서브도메인)는 파라미터를 완전히 생략합니다. 전달되는 엔드포인트는 페이지 트리(`/content/pages/:id/tree`), 사이트맵이 쓰는 공개 페이지 목록(`/content/pages/public/:id`), 전역 스타일(`/content/globalStyles/church/:id`), 내비게이션 링크(`/content/links/church/:id`), 독립형 푸터 블록(`/content/blocks/public/footer/:id`)입니다. 일반 렌더링 경로에서는 푸터가 페이지 트리 안에 도착하므로(`zone: "siteFooter"`로 태그된 섹션), 이미 `siteId`와 함께 가져와지며, 범위가 없는 푸터 공백은 없습니다.

멤버 포털(B1App `mobile`)은 의도적으로 이 밖에 있습니다. `loadChurchAppearance.ts`는 `churches/lookup`으로 교회를 해석하지만 교회 수준의 `/settings/public/{id}`를 읽으며 `siteId`를 전달하지 않습니다. 포털은 v1에서 교회 전체를 대상으로 합니다(아래 참고).

## 교회 하나의 여러 웹사이트

### 데이터 모델

새 `membership.sites` 테이블은 의도적으로 작습니다.

| 열 | 유형 | 참고 |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | 소유 교회 |
| `name` | `varchar(255)` | 표시 이름(예: "Español", "Youth") |
| `subDomain` | `varchar(45)` | **고유 인덱스**. 전역 네임스페이스(아래 참고) |

사이트 범위 지정은 콘텐츠 및 도메인 테이블에 추가된 null이 없는 열 하나로 이루어집니다.

| 테이블(모듈) | 열 | `''`의 의미 |
|----------------|--------|-----------|
| `domains`(membership) | `siteId char(11) NOT NULL DEFAULT ''` | 도메인이 기본 사이트를 제공 |
| `pages`, `links`, `globalStyles`, `blocks`(content) | `siteId char(11) NOT NULL DEFAULT ''` | 기본 사이트 — 그리고 **`blocks`**에서는 `''`가 추가로 *모든 사이트에 공유*를 뜻함 |

두 마이그레이션이 이 모든 것을 추가합니다(`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). 열 기본값이 `''`이므로, 기존의 모든 행은 백필 없이 오늘의 동작을 유지합니다.

**전역 서브도메인 네임스페이스.** `sites.subDomain`은 `churches.subDomain`과 *하나의* 네임스페이스를 공유합니다. 사이트 서브도메인은 교회 서브도메인이나 다른 사이트와 충돌할 수 없습니다. 이는 **두** 저장 경로 모두에서 강제됩니다. `SiteController.save`는 `churches` 또는 `sites`에 해당하는 슬러그를 거부하고, `ChurchController.validateSave`는 반대 방향으로 같은 일을 합니다. `sites.subDomain`의 고유 인덱스가 데이터베이스 수준에서 이를 보장합니다.

**페이지 고유성**은 `(churchId, url)`에서 `(churchId, siteId, url)`로 넓어졌으므로, 한 교회의 두 사이트가 각각 자기 `/about`을 가질 수 있습니다.

### 사이트별 콘텐츠와 대체 수단

사이트 범위가 있는 모든 콘텐츠 **목록/트리** 엔드포인트는 선택적 `?siteId=`를 받습니다(없으면 `''` = 기본). 페이지 트리/목록/공개, 블록 목록/유형별/푸터, 링크(익명/필터/전체), 전역 스타일이 해당합니다. 섹션과 요소는 직접 범위가 지정되지 않으며, 부모 페이지나 블록을 통해 상속됩니다.

흥미로운 작업을 하는 해석 체인은 두 개입니다.

- **전역 스타일 — `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)`는 사이트 자신의 행을 반환합니다. 보조 사이트에 행이 없으면 **기본(`''`) 행을 그대로** 반환합니다(클라이언트가 쓰기 시 복사에 사용하는 기본의 `id`/`siteId`를 유지합니다). 기본도 없으면 `GlobalStyleController`가 하드코딩된 기본 팔레트/글꼴을 반환합니다.
- **푸터 블록 — 사이트 전용이 우선하고, 공유는 대체.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)`는 공유(`''`) 행과 사이트 전용 행을 *모두* 반환합니다. 해석기는 사이트 자신의 푸터가 있으면 그것을, 없으면 공유된 것을 선택합니다. 같은 로직이 `TreeHelper.insertBlocks`(페이지 트리)와 독립형 `/content/blocks/public/footer/:churchId` 엔드포인트 양쪽에서 실행됩니다.

### 사이트 삭제 연쇄

`SiteController.delete`(membership Settings→Edit 권한으로 제한됨)는 보조 사이트를 세 단계로 해체합니다.

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)`가 사이트가 소유한 모든 콘텐츠를 연쇄 삭제합니다. 그 사이트의 **페이지** → 섹션, 요소, `pageHistory`, `posts`. 그 사이트 자신의 **블록** → 섹션, 요소, `pageHistory`. 그리고 **링크**와 **globalStyles**. `''`에 대해 실행되지 않도록 가드가 있습니다. 기본/공유 센티널은 절대 연쇄 삭제되지 않습니다.
2. `DomainRepo.clearSiteId`가 사이트의 도메인을 삭제하지 않고 기본(`siteId → ''`)으로 **재할당**합니다. 그래서 사이트를 삭제해도 사용자 지정 도메인은 살아남습니다.
3. `sites` 행이 삭제되고 Caddy 라우트가 다시 동기화됩니다(best-effort).

### B1Admin 표면

| 기능 | 위치 | 메커니즘 |
|-----------|-------|-----------|
| 사이트 전환기 | `useSiteSelection` + `SiteSwitcher`(비어 있으면 "Main Website") | `?site=` URL 파라미터를 읽고, ContentApi 호출에 `?siteId=`로 전달합니다. Site의 세 **목록** 영역인 **Pages**, **Blocks**, **Appearance**에 있으며, 페이지/블록 편집기에는 없습니다(편집기는 레코드에 `siteId`를 담고 있습니다) |
| 사이트 생성/삭제 | 전환기의 "Manage websites…" 항목에서 여는 `SitesDialog` | `POST /membership/sites` / `DELETE /membership/sites/:id`(이름 + subDomain). membership Settings→Edit 권한으로 제한됩니다(서버 측 `Permissions.settings.edit`, B1Admin에서는 `Permissions.membershipApi.settings.edit`). **생성/삭제만 가능하며, v1에는 이름 변경 UI가 없습니다** |
| 도메인별 사이트 배정 | Settings→Domains 아래의 `DomainSettingsEdit` | 도메인 행마다 사이트 드롭다운이 `siteId`를 `/membership/domains`에 게시합니다. API가 사이트를 반환하지 않으면(이전 백엔드) 열이 숨겨집니다 |
| 쓰기 시 복사 스타일 | `StylesManager.prepareForSave` | 로드된 전역 스타일 행의 `siteId`가 선택된 사이트와 다르면(즉 API가 대체로 상속된 기본을 반환한 경우), 기본의 `id`를 버리고 현재 `siteId`를 찍어서, 기본을 덮어쓰는 대신 사이트 전용 행을 **삽입**하도록 강제합니다. 같은 분기 규칙이 사이트 푸터 블록에도 적용됩니다 |

:::info
**v1에서 교회 전체로 남는 것(데이터 모델의 한계가 아니라 의도적인 범위 선택):** **블로그**(`BlogPage`에는 전환기가 없으며 `siteId` 없이 `/posts`를 불러옵니다), **사이트 위젯**(공지 배너 + 런처), **리디렉션**, **로고 / GA4 / 교회 설정**, 그리고 **멤버 포털**(B1App mobile)입니다. 이것은 "Appearance 전체"가 아니라는 점에 주의하세요. 보조 사이트의 전역 스타일(팔레트, 글꼴, 타이포그래피, 간격, 내비게이션, 사용자 지정 CSS)은 위의 쓰기 시 복사 경로를 통해 사이트별로 **저장됩니다**. Appearance 페이지에서 교회 전체로 남는 것은 배너/런처/리디렉션/로고 하위 패널뿐입니다.
:::

## 사용자 지정 도메인: Caddy 에지(정적 구성 계획)

:::info
**방향이 2026-07-02에 수정되었습니다.** Vercel 관리 도메인으로 사용자 지정 도메인 호스팅을 옮기려던 이전 계획은 **취소되었으며**, 모든 Vercel 도메인 등록 코드(`VercelHelper`, 그 `vercelToken`/`vercelProjectId`/`vercelTeamId` 환경 변수, SSM 매개 변수, 상태 점검 항목)는 API에서 제거되었습니다. 자체 관리 **EC2의 Caddy 프록시는 남으며**, 영구적인 사용자 지정 도메인 에지입니다. 남은 작업은 내부적인 것뿐입니다. Caddy의 *런타임* 관리 API 구성을 재시작에도 살아남는 *정적* 구성으로 바꾸는 것입니다.
:::

### 에지

모든 교회 사용자 지정 도메인은 DNS를 EC2 상자 하나, `3.23.251.61`(`proxy.b1.church`로도 접근 가능)에 가리킵니다. B1Admin의 Settings→Domains 화면은 교회에 apex `A → 3.23.251.61` 또는 `CNAME → proxy.b1.church`를 추가하라고 안내합니다. Caddy는 도메인별 Let's Encrypt 인증서로 TLS를 종료하고, `Host` 헤더를 도메인의 `{sub}.b1.church` 업스트림으로 다시 쓰며, B1App으로 역방향 프록시합니다. B1App은 그 뒤 일반 서브도메인과 마찬가지로 호스트 레이블로 라우팅합니다([위의 사용자 지정 도메인](#custom-domains) 참고).

프록시 업스트림 매핑은 `DomainRepo.loadPairs`에서 옵니다. 이 함수의 다이얼 값은 할당된 사이트의 서브도메인을 COALESCE하므로, 도메인은 올바른 *보조* 사이트로 프록시되며, 기본 교회로 대체됩니다.

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` 행은 맵에서 제외되며, Caddy는 `www.{host}`를 apex로 가는 `302` 리디렉션으로 제공합니다.

### 에지에 데이터를 공급하는 두 익명 엔드포인트

`DomainController`는 상자가 직접 사용하는 인증되지 않은 읽기 전용 엔드포인트 두 개를 노출합니다. 에지가 어떤 교회 맥락이 존재하기 전에 이것들을 조회하므로, 익명이 필요합니다.

| 엔드포인트 | 반환 | 역할 |
|----------|----------|------|
| `GET /membership/domains/authorize?domain=` | 도메인(또는 `www.` 미스의 경우 베어 apex)이 `domains`에 있으면 `200`, 그 밖에는 `404`(빈 `domain` 포함) | Caddy의 **온디맨드 TLS `ask`**. 들어오는 SNI에 대해 인증서를 발급할지 결정하는 남용 방지 수단 |
| `GET /membership/domains/hostmap` | `text/plain`, 라우팅 가능한 도메인마다 정렬된 `{domain} {sub}.b1.church` 줄 하나 | 상자가 타이머로 새로 고치는 호스트→업스트림 맵 파일 |

`authorize`는 `DomainRepo.loadByName`을 재사용하며(정확한 호스트, 그다음 `www.`→apex 재시도), `hostmap`은 `loadPairs`를 재사용합니다. 그래서 사이트를 인식하고 `www.*`를 제외하며, 프록시 라우트와 동일합니다. 그리고 `:443` 접미사만 제거합니다.

### 도메인 저장/삭제 — best-effort 푸시 하나

`DomainController.save`는 `domains` 행을 쓴 다음, 기록하고(`console.error`) 삼키는 `try/catch`로 감싼 **단일 best-effort** `CaddyHelper.updateCaddy()` 호출을 합니다. `delete`도 같은 일을 합니다(이전의 오래된 라우트 삭제 버그도 이것으로 고쳐졌습니다). 보조 사이트 삭제(`SiteController.delete`)도 마찬가지입니다. `updateCaddy`는 그 자체로 **10초** Axios 타임아웃으로 제한되므로, 도달할 수 없거나 멈춘 Caddy가 도메인 저장을 `500`으로 만들 수 없습니다. `domains` 테이블이 원천입니다.

### 현재 상태 — 정적 구성, 런타임 상태 없음

상자(고정 Elastic IP 뒤의 Windows EC2)는 **정적 Caddyfile**로 Caddy를 실행합니다. `ask`가 `/membership/domains/authorize`를 가리키는 온디맨드 TLS, 그리고 예약된 작업이 `/membership/domains/hostmap`에서 5분마다 새로 고치고 우아한 `caddy reload`로 끝나는 호스트→업스트림 맵 파일입니다. 구성은 런타임 상태 없이 재시작에도 살아남으며, 재시작 후 다시 준비하는 과정이 필요 없습니다. 알 수 없는 SNI는 **TLS 거부**됩니다(`authorize`가 거부한 호스트에는 인증서가 발급되지 않습니다). 인가되었지만 아직 매핑되지 않은 호스트(동기화 기간 안의 새 도메인)는 깔끔한 404를 받습니다. 새 도메인은 저장 후 약 5분 안에 라우팅 가능해지며, 인증서는 첫 접근 시 발급됩니다. 빌드/설정, 운영, 현장에서 검증된 함정: [Caddy 사용자 지정 도메인 프록시](../deployment/caddy-proxy).

### 레거시 런타임 푸시 — 롤백 경로, 삭제 예정

`CaddyHelper`(membership 모듈)는 여전히 `caddyHost:caddyPort`의 **관리 API**를 통해 Caddy를 구동할 수 있습니다(SSM `caddyHost`/`caddyPort`. 설정되지 않으면 아무 동작도 하지 않으며, `ServerHealthController`의 Integrations 그룹에 표시됩니다). `updateCaddy()`는 전체 라우트 배열을 PATCH하며, `initializeCaddy()`와 `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` 엔드포인트는 런타임으로 구성된 서버를 처음부터 다시 만듭니다. 이 모드의 구성은 Caddy 메모리에만 있었습니다. 이것이 이 아키텍처가 대체한 재시작 시 기억상실입니다. 이 장치는 롤백 경로로만 남아 있으며, 정적 상자가 안정화된 뒤 삭제될 예정입니다. 도메인 저장/삭제 시의 best-effort `updateCaddy()` 푸시는 정적 상자에 대해 해가 없는 no-op입니다(관리 API는 localhost 전용이므로).

## 관련 페이지

- [Caddy 사용자 지정 도메인 프록시](../deployment/caddy-proxy) — 에지 상자 자체. 새 상자 설정, WinSW 서비스, 맵 동기화 작업, 운영상의 함정
- [웹사이트 빌더](./website-builder) — 페이지/섹션/요소 트리, 렌더러, 블로그, SEO, AI 생성(요청이 교회/사이트로 해석된 뒤 렌더링되는 것)
- [Content 엔드포인트](../api/endpoints/content) — 페이지, 블록, 링크, 전역 스타일의 REST 표면. 모두 이제 `?siteId=`를 인식합니다
- [B1App](../web-apps/b1-app) — 미들웨어와 `[sdSlug]` 라우팅을 호스팅하는 Next.js 앱
- [웹 앱 배포](../deployment/web-apps) — B1App이 Vercel에 배포되는 방식
