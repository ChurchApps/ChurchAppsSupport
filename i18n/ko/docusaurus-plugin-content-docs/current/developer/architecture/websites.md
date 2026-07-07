---
title: "웹사이트 라우팅 및 멀티 사이트"
---

# 웹사이트 라우팅 및 멀티 사이트

<div class="article-intro">

한 교회가 이제 하나 이상의 서로 다른 웹사이트를 제공할 수 있으며 각각은 `*.b1.church` 하위 도메인에 살거나 완전히 사용자 정의된 교회 소유 도메인에 살 수 있습니다. 이 페이지는 빌더 *아래*에 있는 라우팅 계층을 매핑합니다. 들어오는 요청이 교회 **그리고** 특정 사이트로 어떻게 해결되는지, 멀티 사이트 데이터 모델 (`siteId` 센티널이 모든 기존 사이트 렌더링을 변경되지 않게 유지함), 그리고 사용자 정의 도메인 엣지 — EC2의 자체 관리 Caddy 프록시가 TLS를 종료하고 각 교회 도메인을 `*.b1.church` 업스트림으로 재작성합니다. 요청이 해결된 후에 실제로 렌더링되는 것 — 페이지/섹션/요소 트리 — 에 대해서는 [웹사이트 빌더](./website-builder)를 참조하세요.

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

이 계층에서 세 가지 규칙이 유지됩니다.

1. **센티널이 모든 것을 역호환으로 유지합니다.** `siteId = ''`은 기본 사이트입니다. 이 기능이 있기 전에 존재했던 모든 페이지, 블록, 링크, 글로벌 스타일, 도메인 행은 `''`을 전달하고 정확히 전에 렌더링되었던 대로 렌더링됩니다. *두 번째* 웹사이트는 단순히 비어 있지 않은 `siteId`를 가진 행의 집합이고 `?siteId=` 없이 호출된 모든 콘텐츠 엔드포인트는 기본 사이트를 반환합니다. 바이트 단위로 이전 요청입니다.
2. **해결은 호스트 레이블 기반이고 수렴됩니다.** `*.b1.church` 하위 도메인은 호스트 레이블로 직접 라우트됩니다. 사용자 정의 도메인은 B1App이 보기 전에 Caddy 엣지에서 `{sub}.b1.church` 레이블로 재작성됩니다. 모든 생 사용자 정의 `Host`에 대한 폴백으로 `x-site` 헤더를 찍는 미들웨어 DB 조회 포함. 두 다리 모두 동일한 `[sdSlug]` 경로와 동일한 `churches/lookup` 호출에 착지하므로 하위 스트림 렌더링은 동일합니다.
3. **Caddy 엣지는 하나의 진실의 원천에 대해 상태 비저장입니다.** 사용자 정의 도메인은 EC2의 자체 관리 Caddy 프록시에서 종료되고 각 도메인을 `{sub}.b1.church` 업스트림으로 재작성합니다. 도메인 저장은 단일 최선의 노력 `CaddyHelper.updateCaddy()`를 실행하고 Caddy는 또한 `domains` 테이블을 직접 읽습니다 (아래 `authorize` 및 `hostmap` 엔드포인트). 테이블이 권한입니다. 도달할 수 없는 Caddy는 절대 저장을 실패시킬 수 없습니다.

## 사이트 해결

### `*.b1.church` 하위 도메인

`B1App/next.config.mjs`는 호스트별로 들어오는 요청을 재작성합니다. 패턴 `(?<subdomain>.*?)\..*`인 호스트 규칙은 호스트의 **첫 번째 레이블**을 캡처하고 `/` 및 `/:path*`를 `/{subdomain}`으로 재작성합니다. `[sdSlug]` App-Router 세그먼트. `grace.b1.church/about`는 `/grace/about`이 됩니다.

`src/app/[sdSlug]/` 내부에서 `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`)는 `GET /membership/churches/lookup/?subDomain={sdSlug}`를 호출합니다. `ChurchController.getBySubDomain` 응답은 이제 두 가지 분기를 가집니다.

| 슬러그 일치 | 응답 | 의미 |
|-----------|------|------|
| `churches.subDomain` | `{ id, name, subDomain }` | 그 교회의 기본 사이트 |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **보조 사이트** — 컨트롤러는 `sites`로 폴백하고 소유 교회를 해결하고 쿼리된 슬러그 더하기 추가 `siteId`를 에코합니다 |

그 추가 `siteId`는 보조 사이트 요청을 기본 요청과 구별하는 유일한 것입니다. 파이프라인의 다른 모든 것은 공유됩니다.

### 사용자 정의 도메인

교회 소유 도메인은 **Caddy 엣지** (아래 자세히 설명)에서 종료되고 프록시하기 전에 `Host` 헤더를 사이트의 `{sub}.b1.church`로 재작성합니다. 따라서 정상 경로에서 B1App은 내부 `*.b1.church` 호스트를 수신하고 호스트 레이블로 정확히 네이티브 하위 도메인처럼 해결합니다. 미들웨어의 DB 조회는 절대 실행되지 않습니다. `src/middleware.ts`는 여전히 모든 요청에서 실행되지만 항상 켜진 작업 하나와 폴백 하나가 있습니다.

1. **항상** — **클라이언트 제공 `x-site` 헤더를 삭제합니다.** 그 헤더는 스푸핑 가능 재작성 입력이고 미들웨어 자신이 설정할 때만 신뢰됩니다. 제거하는 것이 미들웨어의 실제 작업입니다. Caddy 뒤에.
2. **폴백, 비내부 `Host`만** — Caddy의 재작성 없이 B1App에 도달하는 원본 사용자 정의 도메인 `Host`의 경우 `GET /membership/domains/public/lookup/{host}`를 호출하고 `subDomain`을 반환하면 `x-site: {subDomain}.b1.church`를 설정합니다. Caddy 뒤 `Host`는 이미 `*.b1.church`이므로 이 분기는 무활성입니다.

내부 호스트 — `localhost`, `b1.church`, 그리고 접미사 `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — 호스트 레이블 재작성으로 이미 해결되거나 미리보기/배포 호스트인 경우 조회를 완전히 건너뜁니다.

조회 자신 (`DomainRepo.loadByName`)은 `domains → churches` 및 `domains → sites`를 왼쪽 조인하고 `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`을 반환합니다. 도메인이 도메인에 가리키면 할당된 보조 사이트의 하위 도메인, 그렇지 않으면 교회의. 정확한 호스트를 먼저 일치시킵니다. 호스트가 `www.`로 시작했고 놓쳤으면 **한 번** 베어 지점에 대해 다시 시도합니다.

`next.config.mjs`로 돌아가서 `x-site` 재작성 규칙은 일반 호스트 규칙 **앞에** 배치되므로 이기합니다. `x-site: grace.b1.church` → 첫 번째 레이블 `grace` → `[sdSlug] = grace`. 거기서 해석은 하위 도메인 경로와 동일합니다 (동일한 `churches/lookup`, 동일한 `siteId`).

:::info
`x-site` 헤더는 외부에서 신뢰되지 않습니다. 미들웨어는 조건 없이 선택적으로 자신의 것을 설정하기 전에 모든 인바운드 `x-site`를 제거하고 재작성 규칙은 미들웨어 설정 값만 봅니다. 클라이언트는 다른 교회의 콘텐츠로 자신을 강제할 수 없습니다. 헤더를 보내면서.
:::

미들웨어의 두 가지 운영 세부 사항:

- **캐시.** 각 호스트의 결과 (히트 *또는* 확인된 미스 — 절대 네트워크 오류)는 **10분**에 대해 인메모리 `Map`에 캐시되고 서버리스 격리 단위입니다.
- **매처.** 매처는 의도적으로 `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`를 재포함합니다. 첫 번째 패턴은 점으로 된 경로를 제외하고 그렇지 않으면 파일을 삭제합니다. 사용자 정의 도메인의 교회별 SEO/PWA 파일도 `x-site` 헤더를 받도록 추가합니다.

### `siteId` 스레딩

`ConfigHelper`는 해결된 `siteId`를 요청별 `ConfigurationInterface`에 저장합니다 (React `cache()`로 메모이즈됨). 콘텐츠 호출에 `?siteId=`를 추가합니다. 페이지 컴포넌트는 **조건부**로 합니다: 빈 `siteId` (기본 교회 하위 도메인)는 매개변수를 완전히 생략합니다. 스레드된 엔드포인트는 페이지 트리 (`/content/pages/:id/tree`), 사이트맵에 사용되는 공개 페이지 목록 (`/content/pages/public/:id`), 글로벌 스타일 (`/content/globalStyles/church/:id`), nav 링크 (`/content/links/church/:id`), 독립형 푸터 블록 (`/content/blocks/public/footer/:id`)입니다. 정상 렌더 경로의 바닥글은 페이지 트리 내부 (섹션 태그됨 `zone: "siteFooter"`)에 도착하고 이미 `siteId`로 가져오므로 범위 지정되지 않은 푸터 간격이 없습니다.

회원 포털 (B1App `mobile`)은 의도적으로 이것 외부에 있습니다: `loadChurchAppearance.ts`는 `churches/lookup`을 통해 교회를 해결하지만 교회 레벨 `/settings/public/{id}`를 읽고 절대 `siteId`를 스레드하지 않습니다. 포털은 v1에서 교회 전체입니다 (아래 참조).

## 교회당 여러 웹사이트

### 데이터 모델

새로운 `membership.sites` 테이블은 의도적으로 작습니다.

| 열 | 유형 | 주석 |
|----|------|------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | 소유 교회 |
| `name` | `varchar(255)` | 표시 이름 (예: "Español", "Youth") |
| `subDomain` | `varchar(45)` | **고유 인덱스** — 글로벌 네임스페이스 (아래) |

사이트 범위 지정은 콘텐츠 및 도메인 테이블에 추가된 단일 null 불가능 열입니다.

| 테이블 (모듈) | 열 | `''`은 의미 |
|-------------|------|-----------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | 도메인은 기본 사이트를 제공합니다 |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | 기본 사이트 — 그리고 **`blocks`**에서 `''`은 또한 *모든 사이트에서 공유됨*을 의미합니다 |

두 마이그레이션이 이 모두를 추가합니다 (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). 열이 `''`로 기본값이므로 모든 기존 행은 역채우기 없이 오늘의 동작을 유지합니다.

**글로벌 하위 도메인 네임스페이스.** `sites.subDomain`은 `churches.subDomain`과 *하나의* 네임스페이스를 공유합니다. 사이트 하위 도메인은 절대 교회 하위 도메인 또는 다른 사이트의 하위 도메인과 충돌할 수 없습니다. 이것은 **둘 다** 저장 경로에서 시행됩니다: `SiteController.save`는 `churches` 또는 `sites`를 타격하는 슬러그를 거부하고 `ChurchController.validateSave`는 역으로 동일하게 합니다. `sites.subDomain`의 고유 인덱스는 데이터베이스 레벨에서 이를 지원합니다.

**페이지 고유성**이 `(churchId, url)`에서 `(churchId, siteId, url)`로 확대되어 한 교회의 두 사이트가 각각 자신의 `/about`을 소유할 수 있습니다.

### 폴백이 있는 사이트별 콘텐츠

모든 사이트 범위 지정 콘텐츠 **목록/트리** 엔드포인트는 선택사항 `?siteId=` (부재 ⇒ `''` = 기본)를 가집니다. 페이지 트리 / 목록 / 공개, 블록 목록 / 유형별 / 푸터, 링크 (익명 / 필터됨 / 모두), 글로벌 스타일. 섹션과 요소는 *직접* 범위 지정되지 않습니다. 부모 페이지 또는 블록을 통해 상속됩니다.

두 가지 해결 체인이 흥미로운 작업을 수행합니다.

- **글로벌 스타일 — `site → primary → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)`는 사이트의 자신의 행을 반환합니다. 보조 사이트가 없으면 **기본 (`''`) 행을 그대로** 반환합니다 (기본 `id`/`siteId`를 유지하고 클라이언트는 쓰기 시 복사에 사용). 기본도 없으면 `GlobalStyleController`는 하드코드된 기본 팔레트/글꼴을 반환합니다.
- **바닥글 블록 — 사이트 특정이 이기고 공유가 폴백합니다.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)`는 공유 (`''`) *그리고* 사이트 특정 행을 반환합니다. 해석기는 있으면 사이트의 자신의 바닥글을 선택하거나 공유된 것을 선택합니다. 같은 논리는 `TreeHelper.insertBlocks` (페이지 트리)과 독립형 `/content/blocks/public/footer/:churchId` 엔드포인트 모두에서 실행됩니다.

### 사이트 삭제 계단식

`SiteController.delete` (멤버십 설정 → 편집 권한에서 게이트됨)는 보조 사이트를 세 단계로 분해합니다.

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)`는 사이트가 소유한 모든 콘텐츠를 계단식합니다: 그 **페이지** → 그 섹션, 요소, `pageHistory`, `posts`; 그 자신의 **블록** → 그 섹션, 요소, `pageHistory`; 그 **링크** 및 **globalStyles**. 가드는 `''` — 기본/공유 센티널에 대해 실행을 거부합니다. 절대 계단식되지 않습니다.
2. `DomainRepo.clearSiteId`는 사이트의 도메인을 **삭제하는 대신** 기본 (`siteId → ''`)으로 **재할당**하므로 사용자 정의 도메인은 사이트 삭제를 살아남습니다.
3. `sites` 행이 삭제되고 Caddy 경로가 재동기화됩니다 (최선의 노력).

### B1Admin 표면

| 기능 | 위치 | 메커니즘 |
|------|------|---------|
| 사이트 전환기 | `useSiteSelection` + `SiteSwitcher` (empty = "Main Website") | `?site=` URL 매개변수를 읽고 ContentApi 호출에 `?siteId=`로 스레드합니다. 세 사이트 **목록** 영역 — **페이지**, **블록**, **모양** — 에서 나타나지만 *not* 페이지/블록 편집기이고 레코드에 `siteId`를 전달합니다 |
| 사이트 만들기/삭제 | `SitesDialog`, 전환기의 "웹사이트 관리…" 항목에서 열림 | `POST /membership/sites` / `DELETE /membership/sites/:id` (name + subDomain). 멤버십 설정 → 편집 권한에서 게이트됨 (`Permissions.settings.edit` 서버 측; `Permissions.membershipApi.settings.edit` in B1Admin). **생성/삭제만 — v1에서 이름 바꾸기 UI가 없습니다** |
| 도메인당 사이트 할당 | `DomainSettingsEdit` under 설정 → 도메인 | 행당 사이트 드롭다운이 `/membership/domains`에 도메인당 `siteId`를 게시합니다. API가 사이트를 반환하지 않으면 (더 오래된 백엔드) 열이 숨어집니다 |
| 쓰기 시 복사 스타일 | `StylesManager.prepareForSave` | 로드된 글로벌 스타일 행의 `siteId`가 선택된 사이트와 일치하지 않으면 (즉, API가 폴백으로 상속된 기본을 반환한) 기본의 `id`를 삭제하고 현재 `siteId`를 찍습니다. 기본을 덮어쓰는 대신 새 사이트 특정 행의 **삽입**을 강제합니다. 같은 포크 온 미스매치가 사이트 바닥글 블록에 적용됩니다 |

:::info
**v1에서 교회 전체인 것 (의도적 범위 지정 선택이고 데이터 모델 제한이 아님):** **블로그** (`BlogPage`에 전환기가 없고 `siteId`없이 `/posts`를 로드함), **사이트 위젯** (공지 배너 + 런처), **리디렉트**, **로고 / GA4 / 교회 설정**, 그리고 **회원 포털** (B1App 모바일). 이것은 *not* "모든 모양"을 의미함에 주의하세요. 보조 사이트의 글로벌 스타일 (팔레트, 글꼴, 타이포그래피, 간격, nav, 사용자 정의 CSS) **는** 위의 쓰기 시 복사 경로를 통해 사이트 단위입니다. 모양 페이지의 배너/런처/리디렉트/로고 하위 패널만 교회 전체입니다.
:::

## 사용자 정의 도메인: Caddy 엣지 (정적 구성 계획)

:::info
**방향 개정 2026-07-02.** 맞춤형 도메인 호스팅을 Vercel 관리 도메인으로 이동하려는 이전 계획이 **취소**되었고 모든 Vercel 도메인 등록 코드 (`VercelHelper`, 그 `vercelToken`/`vercelProjectId`/`vercelTeamId` env 변수, SSM 매개변수, 상태 항목)는 Api에서 제거되었습니다. 자체 관리 **EC2의 Caddy 프록시는 영구적 맞춤형 도메인 엣지로 유지**됩니다. 유일한 남은 작업은 내부입니다. Caddy의 *런타임* 관리자 API 구성을 *정적* 구성으로 스왑하여 재시작을 살아남습니다.
:::

### 엣지

모든 사용자 정의 교회 도메인은 한 EC2 박스로 DNS를 가리킵니다. `3.23.251.61`, 또한 `proxy.b1.church`로 도달 가능. B1Admin의 설정 → 도메인 화면은 교회에 지점 `A → 3.23.251.61` 또는 `CNAME → proxy.b1.church`를 추가하도록 지시합니다. Caddy는 교회별 Let's Encrypt 인증서로 TLS를 종료하고 `Host` 헤더를 도메인의 `{sub}.b1.church` 업스트림으로 재작성하고 B1App으로 역프록시합니다. 이는 그 후 호스트 레이블처럼 라우트합니다 (위의 [사용자 정의 도메인](#custom-domains) 참조).

업스트림 매핑은 **할당된 사이트의 하위 도메인을 COALESCE**하는 `DomainRepo.loadPairs`에서 나옵니다. 그래서 도메인은 올바른 *보조* 사이트로 프록시되고 교회의 기본으로 폴백됩니다.

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` 행은 맵에서 제외됩니다. Caddy는 `www.{host}`를 지점으로 `302` 리디렉트를 통해 제공합니다.

### 두 개의 익명 엔드포인트가 엣지를 공급합니다

`DomainController`는 두 개의 인증되지 않은 읽기 전용 엔드포인트를 노출하고 박스는 직접 소비합니다. 엣지가 모든 교회 컨텍스트가 존재하기 전에 쿼리하므로 익명일 필요가 있습니다.

| 엔드포인트 | 반환 | 역할 |
|----------|------|------|
| `GET /membership/domains/authorize?domain=` | 도메인 — 또는 `www.` 미스의 경우 그 베어 지점 — 이 `domains`에 존재하면 `200`; 그렇지 않으면 `404` (빈 `domain` 포함) | Caddy의 **온디맨드 TLS `ask`**: 들어오는 SNI에 대해 인증서를 발급할지 결정하는 악용 컨트롤 |
| `GET /membership/domains/hostmap` | `text/plain`, 라우팅 가능한 도메인당 정렬된 하나 `{domain} {sub}.b1.church` 행 | 박스가 타이머에서 새로고치는 호스트 → 업스트림 맵 파일 |

`authorize`는 `DomainRepo.loadByName` (정확한 호스트, 그 후 `www.` → 지점 재시도 하나)를 재사용합니다. `hostmap`은 `loadPairs`를 재사용합니다. 따라서 사이트 인식이고 `www.*` 제외되고 프록시 경로와 동일하고 단순히 `:443` 접미사를 제거합니다.

### 도메인 저장/삭제 — 하나의 최선의 노력 푸시

`DomainController.save`는 `domains` 행을 쓰고 그 후 **단일 최선의 노력** `CaddyHelper.updateCaddy()` 호출을 만들고 오류를 로그하고 삼키는 `try/catch`에 래핑됩니다 (`console.error`). `delete`는 동일하게 수행합니다 (이는 또한 이전 stale-route-on-delete 버그를 수정했음). 보조 사이트 삭제도 (`SiteController.delete`). `updateCaddy`는 자신이 **10초** Axios 타임아웃으로 경계됩니다. 따라서 도달할 수 없거나 중지된 Caddy는 도메인 저장을 절대 `500`할 수 없습니다. `domains` 테이블이 진실의 원천입니다.

### 현재 상태 — 정적 구성, 런타임 상태 없음

박스 (영구 Elastic IP 뒤의 Windows EC2)는 **정적 Caddyfile**에서 Caddy를 실행합니다. `authorize`를 가리키는 온디맨드 TLS `/membership/domains/authorize`, 더하기 호스트 → 업스트림 맵 파일이 `/membership/domains/hostmap`에서 5분마다 새로고쳐집니다. graceful `caddy reload`로 끝나는 예약된 작업. 구성은 제로 런타임 상태로 재시작을 살아남습니다. 재시작 준비 무용지물이 없고 알려지지 않은 SNI는 **TLS 거부됩니다** (인증서는 `authorize`이 거부하는 호스트에 대해 발급되지 않음). 권한이 있지만 아직 매핑되지 않은 호스트 (브랜드 새 도메인이 동기 윈도우 내)는 깨끗한 404를 가져옵니다. 새 도메인은 저장 후 ~5분 내에 라우팅 가능하게 됩니다. 인증서는 첫 히트 시 발급됩니다. 빌드/설정, 운영, 필드 테스트 함정: [Caddy Custom-Domain Proxy](../deployment/caddy-proxy).

### 레거시 런타임 푸시 — 롤백 경로, 삭제 대기 중

`CaddyHelper` (멤버십 모듈)는 여전히 **관리자 API**를 통해 Caddy를 운영할 수 있습니다. `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; 설정되지 않으면 no-op; `ServerHealthController`의 통합 그룹에서 표면화됨): `updateCaddy()`는 전체 경로 배열을 PATCH하고 `initializeCaddy()` + `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` 엔드포인트는 처음부터 런타임 구성 서버를 다시 빌드합니다. 그 모드의 구성은 Caddy의 메모리에만 있었습니다. 이 아키텍처가 교체한 재시작 기억 손실입니다. 기계류는 롤백 경로로만 남아 있고 정적 박스가 안정적이 된 후 삭제 예정입니다. 도메인 저장/삭제 시 최선의 노력 `updateCaddy()` 푸시는 정적 박스에 대해 해로운 no-op입니다 (관리자 API는 로컬호스트만 입니다).

## 관련 페이지

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — 엣지 박스 자신: fresh-box 설정, WinSW 서비스, 맵 동기 작업, 운영 함정
- [웹사이트 빌더](./website-builder) — 페이지/섹션/요소 트리, 렌더러, 블로그, SEO, AI 생성 (요청이 교회/사이트로 해결된 후 렌더링되는 것)
- [콘텐츠 엔드포인트](../api/endpoints/content) — 페이지, 블록, 링크, 글로벌 스타일을 위한 REST 표면, 모두 이제 `?siteId=` 인식
- [B1App](../web-apps/b1-app) — 미들웨어 및 `[sdSlug]` 라우팅을 호스트하는 Next.js 앱
- [웹 앱 배포](../deployment/web-apps) — B1App이 Vercel에 배포되는 방법
