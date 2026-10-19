---
title: "웹사이트 라우팅 및 다중 사이트"
---

# 웹사이트 라우팅 및 다중 사이트

<div class="article-intro">

하나의 교회가 이제 둘 이상의 개별 웹사이트를 제공할 수 있으며, 각 웹사이트는 `*.b1.church` 서브도메인이나 교회가 소유한 완전한 사용자 지정 도메인에 있을 수 있습니다. 이 페이지에서는 *빌더 아래*에서 동작하는 라우팅 계층을 설명합니다. 즉, 들어오는 요청이 교회와 특정 사이트에 어떻게 매핑되는지, 기존의 모든 사이트가 변경 없이 렌더링되도록 유지하는 `siteId` 센티널이 포함된 다중 사이트 데이터 모델, 그리고 TLS를 종료하고 각 교회 도메인을 해당 `*.b1.church` 업스트림으로 다시 쓰는 EC2의 자체 관리형 Caddy 프록시인 사용자 지정 도메인 엣지를 다룹니다. 요청이 해석된 후 실제로 렌더링되는 내용(페이지/섹션/요소 트리)은 [웹사이트 빌더](./website-builder)를 참조하세요.

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

1. **센티널이 하위 호환성을 유지합니다.** `siteId = ''`는 기본 사이트입니다. 이 기능 이전에 존재했던 모든 페이지, 블록, 링크, 전역 스타일 및 도메인 행은 `''`를 가지며 이전과 똑같이 렌더링됩니다. *두 번째* 웹사이트는 단순히 `siteId`가 비어 있지 않은 행의 집합이며, `?siteId=` 없이 호출된 모든 콘텐츠 엔드포인트는 기본 사이트를 반환합니다. 이는 이전 요청과 바이트 단위로 동일합니다.
2. **해석은 호스트 레이블 기반이며 하나로 수렴합니다.** `*.b1.church` 서브도메인은 호스트 레이블에 따라 직접 라우팅됩니다. 사용자 지정 도메인은 B1App이 보기 전에 Caddy 엣지에서 `{sub}.b1.church` 레이블로 다시 쓰여집니다(원시 사용자 지정 `Host`에 대한 대체 수단으로 `x-site` 헤더를 설정하는 미들웨어 DB 조회도 있습니다). 두 경로 모두 동일한 `[sdSlug]` 라우트와 동일한 `churches/lookup` 호출로 연결되므로 이후 렌더링은 동일합니다.
3. **Caddy 엣지는 단일 진실 공급원 위에서 상태를 갖지 않습니다.** 사용자 지정 도메인은 각 도메인을 `{sub}.b1.church` 업스트림으로 다시 쓰는 자체 관리형 Caddy 프록시에서 종료됩니다. 도메인 저장 시 단일 best-effort `CaddyHelper.updateCaddy()`가 실행되며, Caddy는 `domains` 테이블을 직접 읽기도 합니다(아래의 `authorize` 및 `hostmap` 엔드포인트). 테이블이 권위 있는 원본이므로 연결할 수 없는 Caddy가 저장을 실패시킬 수는 없습니다.

## 사이트 해석

### `*.b1.church` 서브도메인

`B1App/next.config.mjs`는 호스트에 따라 들어오는 요청을 다시 씁니다. `(?<subdomain>.*?)\..*` 패턴의 호스트 규칙은 호스트의 **첫 번째 레이블**을 캡처하고 `/` 및 `/:path*`를 `/{subdomain}`으로 다시 씁니다. 이는 `[sdSlug]` App-Router 세그먼트입니다. 따라서 `grace.b1.church/about`은 `/grace/about`이 됩니다.

`src/app/[sdSlug]/` 내부에서 `ConfigHelper.load(sdSlug)`(`src/helpers/ConfigHelper.ts`)는 `GET /membership/churches/lookup/?subDomain={sdSlug}`를 호출합니다. `ChurchController.getBySubDomain` 응답에는 이제 두 가지 분기가 있습니다.

| 슬러그 일치 대상 | 응답 | 의미 |
|--------------|----------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | 해당 교회의 기본 사이트 |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **보조 사이트**. 컨트롤러가 `sites`로 대체하여 소유 교회를 확인하고, 조회한 슬러그와 추가 `siteId`를 반환합니다. |

이 추가 `siteId`는 보조 사이트 요청을 기본 요청과 구별하는 유일한 요소이며, 그 밖의 모든 파이프라인은 공유됩니다.

두 테이블 중 어디에도 일치하지 않는 슬러그는 `200`과 함께 `{}`를 반환합니다. `ConfigHelper.load`는 `id`가 없는 응답을 알 수 없는 사이트로 처리하고 Next의 `notFound()`를 호출하므로, 알 수 없는 서브도메인은 이후의 모든 호출이 `/…/undefined`를 요청하는 대신 실제 404를 받습니다. 빌더 페이지 라우트도 `pageTreePath()`(`src/helpers/pageTreePath.ts`)로 트리 경로를 구성하며, 이는 슬러그를 URL 인코딩하므로 잘못된 형식의 슬러그(백슬래시, 공백)는 API의 `400`이 500으로 노출되는 대신 404가 됩니다.

### 사용자 지정 도메인 {#custom-domains}

교회가 소유한 도메인은 **Caddy 엣지**(아래에 자세히 설명)에서 종료되며, Caddy는 B1App으로 프록시하기 전에 `Host` 헤더를 사이트의 `{sub}.b1.church`로 다시 씁니다. 따라서 일반 경로에서 B1App은 *내부* `*.b1.church` 호스트를 받아 기본 서브도메인과 똑같이 호스트 레이블로 해석하며, 미들웨어의 DB 조회는 실행되지 않습니다. `src/middleware.ts`는 여전히 모든 요청에서 실행되지만, 항상 수행하는 작업 하나와 대체 작업 하나만 있습니다.

1. **항상** — 클라이언트가 보낸 `x-site` 헤더를 **삭제합니다**. 이 헤더는 조작 가능한 리라이트 입력이며, 미들웨어 자체가 설정한 경우에만 신뢰됩니다. 이를 제거하는 것이 Caddy 뒤에서 미들웨어의 실질적인 역할입니다.
2. **대체 수단, 내부가 아닌 `Host`에만 해당** — Caddy의 리라이트 없이 B1App에 도달한 원시 사용자 지정 도메인 `Host`의 경우, `GET /membership/domains/public/lookup/{host}`를 호출하고 `subDomain`이 반환되면 `x-site: {subDomain}.b1.church`를 설정합니다. Caddy 뒤에서는 `Host`가 이미 `*.b1.church`이므로 이 분기는 작동하지 않습니다.

내부 호스트 — `localhost`, `b1.church`, 그리고 `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` 접미사 — 는 조회를 완전히 건너뜁니다(호스트 레이블 리라이트로 이미 해석되었거나 미리 보기/배포 호스트이므로).

조회 자체(`DomainRepo.loadByName`)는 `domains → churches`와 `domains → sites`를 LEFT JOIN하며 `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`을 반환합니다. 즉, 도메인이 보조 사이트를 가리키면 할당된 보조 사이트의 서브도메인을, 그렇지 않으면 교회의 서브도메인을 반환합니다. 먼저 정확한 호스트와 일치시키며, 해당 호스트가 `www.`로 시작했고 일치하지 않으면 베어 apex에 대해 **한 번** 재시도합니다.

`next.config.mjs`에서는 `x-site` 리라이트 규칙이 일반 호스트 규칙 **앞에** 배치되므로 우선 적용됩니다. `x-site: grace.b1.church` → 첫 번째 레이블 `grace` → `[sdSlug] = grace`이며, 이후 해석은 서브도메인 경로와 동일합니다(같은 `churches/lookup`, 같은 `siteId`).

:::info
`x-site` 헤더는 외부에서 보낸 값을 신뢰하지 않습니다. 미들웨어는 자체 값을 설정하기 전에 들어오는 `x-site`를 무조건 제거하며, 리라이트 규칙은 미들웨어가 설정한 값만 확인합니다. 따라서 클라이언트는 헤더를 보내는 것만으로 다른 교회의 콘텐츠에 강제로 접근할 수 없습니다.
:::

미들웨어와 관련된 두 가지 운영 세부 사항은 다음과 같습니다.

- **캐시.** 각 호스트의 결과(적중 또는 확인된 누락이며, 네트워크 오류는 제외)는 서버리스 아이솔레이트별로 인메모리 `Map`에 **10분** 동안 캐시됩니다.
- **매처.** 매처는 `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`를 의도적으로 다시 포함합니다. 첫 번째 패턴은 점이 포함된 경로를 제외하는데, 이는 그렇지 않으면 이 파일들이 누락되기 때문입니다. 다시 포함되므로 사용자 지정 도메인의 교회별 SEO/PWA 파일도 `x-site` 헤더를 받습니다.
- **표준 헤더.** 교회 페이지의 경우 미들웨어는 페이지가 실제로 제공된 호스트(서브도메인 또는 사용자 지정 도메인)를 지정하는 `Link: <{proto}://{host}{path}>; rel="canonical"` 응답 헤더를 추가합니다(`helpers/canonicalLink.ts`). 교회가 아닌 호스트(`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`)와 `/mobile`, `/login`, `/logout`, 그리고 생성된 robots/sitemap/manifest 파일에서는 건너뜁니다.

### 공개 웹사이트 비활성화

교회는 B1Admin에서 **공개 웹사이트 비활성화**(교회 수준 콘텐츠 설정 `hidePublicSite = "true"`)를 켤 수 있습니다. 그러면 사이트는 회원 전용 라우트만 제공합니다.

- **B1App 미들웨어**는 서브도메인을 조회(`/membership/churches/lookup` 다음 `/content/settings/public/:churchId`)하고, 허용 목록 밖의 경로에 대한 익명 요청을 `/login?returnUrl={path}{query}`로 리디렉션합니다. 허용 목록(`helpers/publicSite.ts`)은 `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, 그리고 manifest/robots/sitemap 파일입니다. 확인된 응답만 캐시되며(프로덕션에서는 60초, 관리자의 재검증 호출이 인스턴스별 맵을 지울 수 없기 때문이며, 개발/테스트에서는 캐시하지 않음), API 오류가 발생하면 모든 사용자를 잠그지 않고 사이트를 제공합니다.
- **로그인한 회원은 전체 사이트를 봅니다.** 만료되지 않은 `jwt` 쿠키가 포함된 요청(미들웨어의 `hasSession()`은 서명을 검증하지 않고 페이로드의 `exp`만 디코딩합니다. 이는 액세스 제어가 아닌 약한 게이트입니다)은 리디렉션을 건너뛰므로, 로그인 후 회원은 요청했던 페이지로 돌아가 일반 페이지, 내장 페이지(그룹, 설교 등), 헤더 탐색을 볼 수 있습니다. 페이지 구성 요소와 `Header`는 더 이상 `hidePublicSite`를 직접 확인하지 않습니다.
- **`robots.txt`**는 noindex 호스트와 마찬가지로 모든 것을 허용하지 않습니다.
- **API.** `GET /content/pages/public/:churchId`(사이트맵의 페이지 목록)는 `[]`를 반환하므로 익명 호출자는 페이지 목록을 볼 수 없습니다.

### `siteId` 전달

`ConfigHelper`는 확인된 `siteId`를 요청별 `ConfigurationInterface`에 저장하고(React `cache()`로 메모이제이션됨), 자신과 페이지 구성 요소가 수행하는 콘텐츠 호출에 `?siteId=`를 **조건부로** 추가합니다. 빈 `siteId`(기본 교회 서브도메인)인 경우 매개변수를 완전히 생략합니다. 전달되는 엔드포인트는 페이지 트리(`/content/pages/:id/tree`), 사이트맵에서 사용하는 공개 페이지 목록(`/content/pages/public/:id`), 전역 스타일(`/content/globalStyles/church/:id`), 탐색 링크(`/content/links/church/:id`), 그리고 독립형 푸터 블록(`/content/blocks/public/footer/:id`)입니다. 일반 렌더링 경로에서 푸터는 페이지 트리 내부(`zone: "siteFooter"`로 태그된 섹션)에 포함되어 이미 `siteId`와 함께 가져오므로, 범위가 지정되지 않은 푸터 공백은 없습니다.

회원 포털(B1App `mobile`)은 의도적으로 이 범위 밖에 있습니다. `loadChurchAppearance.ts`는 `churches/lookup`으로 교회를 확인하지만 교회 수준의 `/settings/public/{id}`를 읽고 `siteId`를 전달하지 않습니다. 포털은 v1에서 교회 전체를 대상으로 합니다(아래 참조).

## 교회당 다중 웹사이트

### 데이터 모델

새로운 `membership.sites` 테이블은 의도적으로 매우 작습니다.

| 열 | 유형 | 비고 |
|--------|------|-------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | 소유 교회 |
| `name` | `varchar(255)` | 표시 이름(예: "Español", "Youth") |
| `subDomain` | `varchar(45)` | **고유 인덱스** — 전역 네임스페이스(아래 참조) |

사이트 범위 지정은 콘텐츠 및 도메인 테이블에 추가된 단일 nullable이 아닌 열로 이루어집니다.

| 테이블(모듈) | 열 | `''`의 의미 |
|----------------|--------|-----------|
| `domains`(membership) | `siteId char(11) NOT NULL DEFAULT ''` | 도메인이 기본 사이트를 제공 |
| `pages`, `links`, `globalStyles`, `blocks`(content) | `siteId char(11) NOT NULL DEFAULT ''` | 기본 사이트 — 그리고 **`blocks`**에서 `''`는 추가로 *모든 사이트에서 공유*를 의미 |

두 개의 마이그레이션이 이 모든 것을 추가합니다(`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). 열의 기본값이 `''`이므로 기존의 모든 행은 백필 없이 오늘의 동작을 유지합니다.

**전역 서브도메인 네임스페이스.** `sites.subDomain`은 `churches.subDomain`과 *하나의* 네임스페이스를 공유합니다. 따라서 사이트 서브도메인이 교회 서브도메인이나 다른 사이트의 서브도메인과 충돌할 수 없습니다. 이는 **두** 저장 경로 모두에서 적용됩니다. `SiteController.save`는 `churches` 또는 `sites`에 이미 존재하는 슬러그를 거부하며, `ChurchController.validateSave`는 반대 방향에서 같은 작업을 수행합니다. `sites.subDomain`의 고유 인덱스가 데이터베이스 수준에서 이를 보장합니다.

**페이지 고유성**은 `(churchId, url)`에서 `(churchId, siteId, url)`로 확장되었으므로, 한 교회의 두 사이트가 각각 자체 `/about`을 소유할 수 있습니다.

### 대체 수단이 있는 사이트별 콘텐츠

사이트 범위가 지정된 모든 콘텐츠 **목록/트리** 엔드포인트는 선택적 `?siteId=`를 받습니다(없으면 `''` = 기본). 페이지 트리/목록/공개, 블록 목록/유형별/푸터, 링크(익명/필터링/전체), 전역 스타일이 여기에 해당합니다. 섹션과 요소는 직접 범위가 지정되지 않으며, 상위 페이지나 블록을 통해 상속됩니다.

두 가지 해석 체인이 흥미로운 작업을 수행합니다.

- **전역 스타일 — `사이트 → 기본 → 기본값`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)`는 사이트 자체의 행을 반환합니다. 보조 사이트에 행이 없으면 **기본(`''`) 행을 그대로** 반환하며(클라이언트가 쓰기 시 복사하는 데 사용하는 기본의 `id`/`siteId`를 유지), 기본 행도 없으면 `GlobalStyleController`가 하드코딩된 기본 팔레트/글꼴을 반환합니다.
- **푸터 블록 — 사이트별 항목이 우선하고, 공유 항목이 대체합니다.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)`는 공유(`''`) 행과 사이트별 행을 *모두* 반환하며, 해석기는 사이트 자체의 푸터가 있으면 그것을, 없으면 공유 푸터를 선택합니다. 같은 로직이 `TreeHelper.insertBlocks`(페이지 트리)와 독립형 `/content/blocks/public/footer/:churchId` 엔드포인트 모두에서 실행됩니다.

### 사이트 삭제 연쇄

`SiteController.delete`(멤버십 설정→편집 권한에 따라 제한됨)는 보조 사이트를 세 단계로 제거합니다.

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)`는 사이트가 소유한 모든 콘텐츠를 연쇄 삭제합니다. 즉, 해당 **페이지** → 섹션, 요소, `pageHistory`, `posts`; 자체 **블록** → 섹션, 요소, `pageHistory`; 해당 **링크**와 **globalStyles**. `''`에 대해 실행을 거부하는 가드가 있으므로 기본/공유 센티널은 절대 연쇄 삭제되지 않습니다.
2. `DomainRepo.clearSiteId`는 사이트의 도메인을 삭제하지 않고 기본(`siteId → ''`)으로 **재할당**하므로, 사이트 삭제 후에도 사용자 지정 도메인이 유지됩니다.
3. `sites` 행이 삭제되고 Caddy 라우트가 다시 동기화됩니다(best-effort).

### B1Admin 화면

| 기능 | 위치 | 메커니즘 |
|-----------|-------|-----------|
| 사이트 전환기 | `useSiteSelection` + `SiteSwitcher`(비어 있음 = "Main Website") | `?site=` URL 매개변수를 읽고 ContentApi 호출에 `?siteId=`로 전달합니다. **페이지**, **블록**, **모양**의 세 가지 사이트 **목록** 영역에 표시되지만, 레코드에 `siteId`를 보관하는 페이지/블록 편집기에는 표시되지 않습니다. |
| 사이트 생성/삭제 | 전환기의 "Manage websites…" 항목에서 열리는 `SitesDialog` | `POST /membership/sites` / `DELETE /membership/sites/:id`(이름 + subDomain). 멤버십 설정→편집 권한에 따라 제한됩니다(서버 측 `Permissions.settings.edit`, B1Admin에서는 `Permissions.membershipApi.settings.edit`). **v1에는 생성/삭제만 있으며 이름 변경 UI는 없습니다.** |
| 도메인별 사이트 할당 | 설정→도메인 아래의 `DomainSettingsEdit` | 행별 사이트 드롭다운이 도메인별 `siteId`를 `/membership/domains`에 게시합니다. API가 사이트를 반환하지 않으면(이전 백엔드) 열이 숨겨집니다. |
| 쓰기 시 복사 스타일 | `StylesManager.prepareForSave` | 로드된 전역 스타일 행의 `siteId`가 선택한 사이트와 일치하지 않으면(즉, API가 대체로 상속된 기본을 반환한 경우), 기본의 `id`를 삭제하고 현재 `siteId`를 찍어 기본을 덮어쓰는 대신 새 사이트별 행을 **삽입**하도록 강제합니다. 같은 분기 규칙이 사이트 푸터 블록에도 적용됩니다. |

:::info
**v1에서 교회 전체 범위로 유지되는 항목(데이터 모델 한계가 아닌 의도적인 범위 선택):** **블로그**(`BlogPage`에는 전환기가 없고 `siteId` 없이 `/posts`를 로드함), **사이트 위젯**(공지 배너 + 런처), **리디렉션**, **로고 / GA4 / 교회 설정**, 그리고 **회원 포털**(B1App 모바일). 이는 "모든 모양"이 아님에 유의하세요. 보조 사이트의 전역 스타일(팔레트, 글꼴, 타이포그래피, 간격, 탐색, 사용자 지정 CSS)은 위의 쓰기 시 복사 경로를 통해 **사이트별**입니다. 모양 페이지에서 배너/런처/리디렉션/로고 하위 패널만 교회 전체로 남습니다.
:::

## 사용자 지정 도메인: Caddy 엣지(정적 구성 계획)

:::info
**방향 수정 2026-07-02.** Vercel 관리 도메인으로 사용자 지정 도메인 호스팅을 옮기려던 이전 계획은 **취소**되었으며, 모든 Vercel 도메인 등록 코드(`VercelHelper`, `vercelToken`/`vercelProjectId`/`vercelTeamId` 환경 변수, SSM 매개변수 및 상태 항목)가 Api에서 제거되었습니다. 자체 관리형 **EC2의 Caddy 프록시는 영구적인 사용자 지정 도메인 엣지로 유지됩니다**. 남은 작업은 내부적인 것뿐입니다. 즉, Caddy의 *런타임* 관리 API 구성을 재시작 후에도 유지되는 *정적* 구성으로 교체하는 것입니다.
:::

### 엣지

모든 교회 사용자 지정 도메인은 DNS를 EC2 상자 하나 — `3.23.251.61`, `proxy.b1.church`로도 접근 가능 — 로 가리킵니다. B1Admin의 설정→도메인 화면은 교회에 apex `A → 3.23.251.61` 또는 `CNAME → proxy.b1.church`를 추가하도록 안내합니다. Caddy는 도메인별 Let's Encrypt 인증서로 TLS를 종료하고, `Host` 헤더를 도메인의 `{sub}.b1.church` 업스트림으로 다시 쓴 다음 B1App으로 역방향 프록시합니다. B1App은 이를 기본 서브도메인과 똑같이 호스트 레이블로 라우팅합니다([위의 사용자 지정 도메인](#custom-domains) 참조).

업스트림 매핑은 `DomainRepo.loadPairs`에서 나옵니다. 이 쿼리의 dial은 할당된 사이트의 서브도메인을 COALESCE하므로, 도메인은 교회의 기본 사이트 대신 올바른 *보조* 사이트로 프록시됩니다.

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` 행은 맵에서 제외되며, Caddy는 `www.{host}`를 apex로의 `302` 리디렉션을 통해 제공합니다.

### 엣지에 데이터를 제공하는 두 익명 엔드포인트

`DomainController`는 상자가 직접 사용하는 인증되지 않은 읽기 전용 엔드포인트 두 개를 노출합니다. 엣지는 교회 컨텍스트가 존재하기 전에 이를 조회하므로 익명이어야 합니다.

| 엔드포인트 | 반환 값 | 역할 |
|----------|---------|------|
| `GET /membership/domains/authorize?domain=` | 도메인(또는 `www.` 누락의 경우 베어 apex)이 `domains`에 있으면 `200`, 그렇지 않으면 `404`(빈 `domain` 포함) | Caddy의 **온디맨드 TLS `ask`**: 들어오는 SNI에 대해 인증서를 발급할지 결정하는 남용 제어 |
| `GET /membership/domains/hostmap` | `text/plain`, 라우팅 가능한 도메인당 정렬된 `{domain} {sub}.b1.church` 줄 하나 | 상자가 타이머로 새로 고치는 host→업스트림 맵 파일 |

`authorize`는 `DomainRepo.loadByName`(정확한 호스트, 그다음 `www.`→apex 재시도)을 재사용하고, `hostmap`은 `loadPairs`를 재사용하므로 — 프록시 라우트와 동일하게 사이트를 인식하며 `www.*`를 제외합니다 — `:443` 접미사만 제거합니다.

### 도메인 저장/삭제 — 한 번의 best-effort 푸시

`DomainController.save`는 `domains` 행을 기록한 다음, 오류를 기록(`console.error`)하고 삼키는 `try/catch`로 감싸진 **단일 best-effort** `CaddyHelper.updateCaddy()` 호출을 수행합니다. `delete`도 같은 방식으로 동작하며(이전의 오래된 삭제 라우트 버그도 수정함), 보조 사이트 삭제(`SiteController.delete`)도 마찬가지입니다. `updateCaddy`는 그 자체로 **10초** Axios 타임아웃으로 제한되므로, 연결할 수 없거나 중지된 Caddy가 도메인 저장을 `500`으로 실패시킬 수 없습니다. `domains` 테이블이 진실 공급원입니다.

### 현재 상태 — 정적 구성, 런타임 상태 없음

상자(영구 고정 IP 뒤의 Windows EC2)는 **정적 Caddyfile**에서 Caddy를 실행합니다. 온디맨드 TLS의 `ask`는 `/membership/domains/authorize`를 가리키며, 예약된 작업이 5분마다 `/membership/domains/hostmap`에서 host→업스트림 맵 파일을 새로 고치고, 이 작업은 정상적인 `caddy reload`로 끝납니다. 구성은 런타임 상태 없이 재시작 후에도 유지되며(다시 준비하는 과정이 필요 없음), 알 수 없는 SNI는 **TLS 거부**되고(`authorize`가 거부한 호스트에 대해서는 인증서가 발급되지 않음), 승인되었지만 아직 매핑되지 않은 호스트(동기화 기간 내의 새 도메인)는 깔끔한 404를 받습니다. 새 도메인은 저장 후 약 5분 이내에 라우팅 가능해지며, 인증서는 첫 접속 시 발급됩니다. 빌드/설정, 운영 및 현장에서 검증된 함정: [Caddy 사용자 지정 도메인 프록시](../deployment/caddy-proxy).

### 레거시 런타임 푸시 — 롤백 경로, 삭제 예정

`CaddyHelper`(membership 모듈)는 여전히 **관리 API**(`caddyHost:caddyPort`, SSM `caddyHost`/`caddyPort`; 설정되지 않으면 아무 작업도 하지 않음, `ServerHealthController`의 Integrations 그룹에 표시됨)를 통해 Caddy를 구동할 수 있습니다. `updateCaddy()`는 전체 라우트 배열을 PATCH하고, `initializeCaddy()`와 `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` 엔드포인트는 런타임 구성 서버를 처음부터 다시 구축합니다. 이 모드의 구성은 Caddy 메모리에만 존재했으며, 이는 이 아키텍처가 대체한 재시작 시 기억 상실 문제입니다. 이 기계 장치는 롤백 경로로만 남아 있으며, 정적 상자가 안정화된 후 삭제될 예정입니다. 도메인 저장/삭제 시의 best-effort `updateCaddy()` 푸시는 정적 상자에 대해 무해한 no-op입니다(관리 API는 localhost 전용이기 때문입니다).

## 관련 페이지

- [Caddy 사용자 지정 도메인 프록시](../deployment/caddy-proxy) — 엣지 상자 자체: 새 상자 설정, WinSW 서비스, 맵 동기화 작업 및 운영상의 함정
- [웹사이트 빌더](./website-builder) — 페이지/섹션/요소 트리, 렌더러, 블로그, SEO 및 AI 생성(요청이 교회/사이트로 해석된 후 렌더링되는 내용)
- [콘텐츠 엔드포인트](../api/endpoints/content) — 페이지, 블록, 링크 및 전역 스타일을 위한 REST 화면(모두 이제 `?siteId=`를 인식함)
- [B1App](../web-apps/b1-app) — 미들웨어와 `[sdSlug]` 라우팅을 호스팅하는 Next.js 앱
- [웹 앱 배포](../deployment/web-apps) — B1App이 Vercel에 배포되는 방법
