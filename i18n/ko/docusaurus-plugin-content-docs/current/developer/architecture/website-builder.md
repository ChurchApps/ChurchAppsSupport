---
title: "웹사이트 빌더 아키텍처"
---

# 웹사이트 빌더 아키텍처

<div class="article-intro">

B1App으로 제공되는 모든 교회 웹사이트는 ContentApi에 저장되고 B1Admin에서 시각적으로 편집되는 콘텐츠 트리(페이지, 섹션, 요소)로부터 렌더링됩니다. 하나의 공유 컴포넌트 라이브러리가 편집기 미리보기와 라이브 사이트를 모두 렌더링하고, 하나의 요소 유형 카탈로그가 페이지에 나타날 수 있는 항목을 정의하며, 별도의 AI 서비스가 해당 트리를 생성하거나 다시 작성할 수 있습니다. 이 페이지는 전체 스택을 매핑합니다: `@churchapps/helpers`의 요소 계약, 렌더 파이프라인, 교회 데이터 요소, 사이트 전체 위젯, 블로그 계층, 액세스 제어 페이지, SEO, AI 생성 및 대화형 양식.

</div>

## 개요

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

스택 전체에 세 가지 규칙이 적용됩니다:

1. **한 개의 트리, 두 개의 렌더러.** 페이지는 `pages → sections → elements` 트리이며, 모든 노드는 `answers` JSON blob으로 설정을 전달합니다. 동일한 apphelper 컴포넌트가 B1Admin의 드래그 앤 드롭 편집기와 B1App의 서버 렌더링 공개 사이트를 모두 렌더링합니다. 별도의 "게시 형식"은 없습니다.
2. **계약은 `@churchapps/helpers`에 있습니다.** `ElementTypes.ts`는 요소 유형의 유일한 카탈로그이고, 렌더러는 apphelper의 레지스트리를 통해 해석하며, 편집기 양식은 B1Admin에 있습니다. 요소 유형을 추가한다는 것은 이 순서대로 세 가지 모두 건드린다는 뜻입니다.
3. **공개 사이트는 익명 엔드포인트를 읽습니다.** B1App이 필요한 모든 것(페이지 트리, 설정, 블로그 게시물, 리디렉션 및 다른 모듈의 교회 데이터 엔드포인트)은 공개입니다. 인증은 선택사항입니다: 익명 트리 엔드포인트의 JWT가 회원 전용 페이지를 잠금 해제하고, 다른 것은 변경되지 않습니다.

## 콘텐츠 트리

콘텐츠 모듈(`Api/src/modules/content`)은 빌더의 데이터를 소유합니다:

| Table | 역할 |
|-------|------|
| `pages` | URL당 하나의 페이지: `url`, `title`, `layout`, 그리고 `visibility`/`groupIds`(액세스 제어) 및 `metaDescription`(SEO) |
| `sections` | 페이지의 가로 띠(또는 블록 내): 배경, 텍스트 색 및 스타일 지정뿐만 아니라 `dividerTop`/`dividerBottom` 모양 분배기 구성을 전달하는 `answersJSON` |
| `elements` | 섹션 내 콘텐츠 조각: `elementType` + `answersJSON`, 레이아웃 유형(행/열, 캐러셀)에 중첩 가능 |
| `blocks` | 페이지 전체에서 공유되는 재사용 가능한 섹션/요소 그룹(바닥글 블록, 요소 블록) |
| `posts` | 독립형 블로그 게시물([블로그](#blog) 참고) |
| `redirects` | 교회별 `fromPath → toPath` 쌍, 200으로 제한([SEO](#seo-and-discoverability) 참고) |
| `settings` | 키-값 교회 설정, `public`로 표시된 행은 익명으로 제공되며 위젯/분석 구성을 전달 |

한 URL에 대한 전체 트리는 단일 익명 호출 `GET /content/pages/:churchId/tree?url=/about`에서 반환됩니다. 이것이 B1App이 서버에서 렌더링하는 내용입니다. 편집기 요청은 대신 ID로 가져오고 내부 ID를 유지합니다.

## 요소 계약

### 카탈로그 (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts`는 모든 요소 유형을 `ElementTypeDefinition`으로 정의합니다: `elementType`, `label`, `category`, `schemaVersion`, `defaults` 및 해당 답변에 대한 JSON 스키마 스타일 `answersSchema`. `validateElementAnswers()`는 의도적으로 관대합니다. 알 수 없는 유형과 추가 키는 통과하므로 오래된 콘텐츠는 카탈로그 업그레이드 시 절대 손상되지 않습니다. **현재 35가지 유형이 제공됩니다:**

| 카테고리 | 요소 유형 |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

`sermons` 요소는 교회 유형 중 가장 구성 가능합니다: `layout` 답변이 `browse`(레거시 전체 브라우저), `grid`, `list` 또는 `featuredLatest`를 선택하며, `playlistId`, `itemCount`, `showTitles` 및 `showDates`가 비-브라우저 레이아웃을 정제합니다.

### 렌더러 (`@churchapps/apphelper`)

렌더러는 `Packages/apphelper/src/website/components/elementTypes/`에 있으며, 유형당 하나의 컴포넌트, `ElementRegistry.ts`를 통해 해석됩니다. 이는 2계층 맵입니다. `Element.tsx`는 모든 35가지 유형에 대한 기본 렌더러를 등록하고(`registerDefaultElementRenderer`), 호스트 앱은 패키지를 포킹하지 않고 런타임에 그 중 하나를 오버라이드할 수 있습니다(`registerElementRenderer`).

### 편집기 양식 (B1Admin)

편집기의 유형별 설정 양식은 `B1Admin/src/site/admin/elements/`에 있습니다. `ElementEdit.tsx`는 전용 컴포넌트(`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) 또는 유형별 인라인 필드 빌더로 디스패치합니다. 이 카탈로그의 AI 대면 미러는 API의 MCP `describe_page_builder` 도구입니다([MCP 서버](../api/mcp) 참고).

### 섹션 모양 분배기

섹션은 어느 쪽 모서리에나 장식 모양 분배기를 전달할 수 있습니다. 구성은 섹션의 `answersJSON`에 `dividerTop` / `dividerBottom` 객체 `{ shape, color, height, flip }`으로 있으며, `shape`는 `wave, waves, slant, curve, triangle, peaks` 중 하나입니다. Apphelper는 `SectionDivider` 컴포넌트와 `parseDividerConfig()` 도우미를 제공합니다. 두 앱의 Section 렌더러(`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`)는 답변을 구문 분석하고 분배기를 마운트하며, `SectionEdit.tsx`는 B1Admin에서 선택기 UI를 제공합니다. 패키지는 빌딩 블록만 제공합니다. 섹션 수준의 와이어링은 소비 앱의 작업입니다.

## 교회 데이터 요소

세 가지 요소 유형은 작성된 콘텐츠 대신 라이브 교회 데이터를 렌더링합니다. 모듈 격리는 계속 적용됩니다. 각 유형은 브라우저에서 소유 모듈의 자체 공개 엔드포인트를 호출합니다:

| 요소 | 엔드포인트 | 참고 |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | `{ fundId, totalAmount, donationCount }` 반환, 선택 사항 `?startDate=&endDate=` 윈도우; 요소는 이를 `goalAmount` 답변과 비교합니다 |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **선택 사항**: 그룹에 `publicRoster` 설정(기본값 꺼짐)이 있어야 합니다. 프로젝션은 의도적으로 최소화되어 있습니다. `personId`, `displayName`, `leader`, 사진 없음 - 연락처 또는 인구통계 필드 없음 |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | 캠퍼스 → 서비스 → 시간 트리 반환; apphelper 렌더러는 이로부터 최선의 노력 schema.org `Event` JSON-LD를 방출합니다(API는 일반 데이터 반환) |

:::warning
`publicRoster`는 `staffGrid`의 개인정보보호 게이트입니다. 공개 그룹 멤버 프로젝션을 확대하거나 플래그를 우회하지 마세요. 명단 엔드포인트는 설계상 익명이며 최소 필드 목록이 안전 속성입니다.
:::

## 사이트 전체 위젯

두 개의 위젯이 트리 내부가 아닌 모든 공개 페이지에 렌더링됩니다: **AnnouncementBanner**(해제 가능한 페이지 상단 표시줄) 및 **Launcher**(기부/방문/시청 스타일 링크를 위한 부유 작업 허브). 두 컴포넌트와 해당 `parse*Config()` 도우미는 apphelper에서 제공됩니다. 구성은 두 개의 공개 설정 행입니다. 키 `announcementBanner` 및 `launcher`는 B1Admin의 `SiteWidgetsEdit`(외형 페이지에서)으로 작성되고 B1App의 공개 레이아웃에서 `GET /content/settings/public/:churchId`로 읽혀집니다. API는 이들을 불투명한 키-값 쌍으로 취급합니다. 키 이름은 두 앱 간의 규칙입니다.

## 블로그

블로그는 빌더 페이지의 계층이 아닌 독립형 콘텐츠 유형입니다. `posts` 행은 전체 게시물을 보유합니다: `title`, `slug`, `excerpt`, `content`(마크다운 본문), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. 공개 표면(모두 익명, `PostController`):

| 경로 | 목적 |
|-------|---------|
| `GET /content/posts/public/:churchId` | 게시된 게시물, `?category=&tag=`로 필터링 가능, 페이지 매김됨 |
| `GET /content/posts/public/:churchId/categories` | 게시된 게시물 전체의 고유 카테고리 |
| `GET /content/posts/public/:churchId/slug/:slug` | 하나의 게시된 게시물 |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 피드, 교회 이름으로 제목이 지정되고 항목별 카테고리 및 발췌-또는-콘텐츠 설명 |

게시물은 `publishDate`가 설정되고 지나간 후 "게시"됩니다. 향후 `publishDate`는 예약된 게시물입니다(공개적으로 숨겨지고 관리자에서 예약됨 칩으로 표시됨). 읽기 엔드포인트는 각 게시물을 `authorName`으로 보강하고 멤버십 모듈 게이트웨이를 통해 `authorId`에서 해석합니다. 누락된 발췌는 나열된 카드, 메타 설명 및 RSS에서 스트립된 마크다운 콘텐츠(약 160자)로 대체됩니다. B1App은 `/{sdSlug}/blog`를 제공합니다. 편집 나열(필터링할 때 활성 카테고리/태그 이름이 되는 중앙 헤더, 카테고리 칩 필터 행, 바이라인 및 발췌가 있는 왼쪽 썸네일 게시물 행)과 `/{sdSlug}/blog/[postSlug]`, 전용 경로(Zone/Section 파이프라인이 아님) - 중앙 헤더(카테고리 킥, 제목, 바이라인, 기본 색상 악센트 규칙), 컨테이너 너비의 16:9 히어로, 약 720px 읽기 열의 마크다운 본문, 기사 바닥글의 태그 칩, `"More in {category}"` 관련 게시물 스트립 및 저자를 포함한 `BlogPosting` JSON-LD. 두 페이지는 테마 토큰에서만 스타일 지정되어 각 교회의 팔레트를 상속합니다. 블로그 URL이 교회별 사이트맵에 포함됩니다. B1Admin의 제작 UI(**사이트 → 블로그**)는 게시물을 대화 상자에서 편집합니다: 미리보기 토글을 포함한 마크다운 편집기, 16:9로 자른 갤러리 이미지 선택기, 작성자 인물 선택기(편집 사용자로 기본값), 기존 카테고리에서 시드된 카테고리 자동완성, 중복 슬러그 검증 및 게시 토글; 게시된 행은 라이브 게시물로 연결되며 페이지는 관리자에게 `/blog` 네비게이션 링크를 추가하도록 권장합니다.

## 회원 전용 페이지

`pages.visibility`는 네비게이션 링크 열거를 재사용합니다. `everyone`(기본값), `visitors`, `members`, `staff`, `team`, `groups`(`groupIds` 포함), 그러나 네비게이션 필터가 아닌 **하드 액세스 게이트**입니다(`PageVisibilityHelper.canViewPage`). 흐름:

1. 익명 트리 엔드포인트는 URL 기반 가져오기에 대한 가시성을 확인합니다. 제어된 페이지의 익명 발신자는 콘텐츠 대신 `{ restricted: true, visibility }`를 받습니다. 트리는 절대 누출되지 않습니다.
2. 엔드포인트는 여전히 JWT를 인정합니다: `CustomAuthProvider`는 익명 경로를 포함한 *모든* 요청에서 `Authorization` 헤더를 확인하므로 인증된 회원이 동일한 URL을 가져오면 정상적으로 해결됩니다.
3. B1App은 `restricted` 응답에서 `RestrictedPage`를 렌더링합니다: 저장된 자격증에서 세션을 수화하고 JWT를 사용하여 트리를 다시 가져오고 렌더링합니다. 또는 세션이 없을 때 `returnUrl`을 포함한 로그인 게이트를 표시합니다.

:::info
게이트의 세분화는 수준에 따라 다릅니다: `groups`는 토큰의 `groupIds`를 페이지의 목록에 대해 확인하고 `staff`는 `membershipStatus`를 확인하지만, `members`와 `team`은 현재 교회의 인증된 사용자를 전달합니다. `groups`를 엄격한 옵션으로 취급하십시오.
:::

## SEO 및 검색 가능성

이 모든 것은 B1App 측 렌더링 및 ContentApi 데이터입니다. API는 저장하고 앱은 방출합니다:

| 관심 | 작동 방식 |
|---------|--------------|
| 메타 설명 | `pages.metaDescription`(≤300자)은 `MetaHelper.getMetaData()`를 통해 Next.js `Metadata`(설명 + Open Graph)로 모든 빌더 렌더링 경로로 흐릅니다. B1Admin의 페이지 설정에는 AI "생성" 버튼이 포함됩니다(아래 참고) |
| 리디렉션 | `/content/redirects`에서 관리되는 교회별 `redirects` 행(`content.edit`, 200행 상한, 정규화된 경로). 404가 될 경우 B1App의 페이지 경로는 `GET /content/redirects/public/:churchId`에 대해 경로를 해석하고 Next의 `permanentRedirect`를 통해 HTTP 308을 발행합니다. 일치하지 않는 경로는 `notFound()`로 넘어갑니다 |
| 브랜드 404 | `not-found.tsx`는 일반적인 오류 대신 교회의 로고, 이름 및 테마를 사용하여 `BrandedNotFound`를 렌더링합니다 |
| 구조화된 데이터 | 블로그 게시물의 `BlogPosting` JSON-LD; 설교 페이지(`/{sdSlug}/sermons/[sermonId]`) 및 `sermons` 요소를 포함하는 페이지의 `VideoObject`; 빌더 페이지의 달력/이벤트 요소에서 `Event`; `serviceTimes` 요소의 schema.org `Event` |
| 설교 페이지 | 모든 공개 설교는 `/sermons/[sermonId]`에서 완전한 메타데이터가 있는 크롤 가능한 페이지를 가져옵니다. 설교는 더 이상 클라이언트 측 브라우저 요소 내에 잠기지 않습니다 |
| 분석 | 공개 설정 키 `ga4MeasurementId`(B1Admin의 리디렉션 다음에 관리됨)은 `next/script`를 통해 교회별 GA4 gtag를 주입합니다 |
| 사이트맵 및 피드 | 교회별 `sitemap.xml` 경로에는 빌더 페이지 및 블로그 URL이 포함됩니다. 블로그 나열은 RSS 피드를 광고합니다 |
| 접근성 | 공개 크롬은 모든 레이아웃 래퍼의 `<main id="main-content">` 랜드마크를 대상으로 하는 건너뛰기 링크를 렌더링합니다 |

## AI 생성 (AskApi)

페이지 및 사이트 생성은 **AskApi**, 별도의 서비스, `/website` 컨트롤러 아래에서 실행됩니다. 다른 모든 것과 동일한 `CustomAuthProvider` JWT로 인증하며 콘텐츠와 관련하여 **상태 비저장**입니다: 모든 엔드포인트는 JSON을 반환하고 발신자(B1Admin)는 ContentApi를 통해 결과를 유지합니다(`POST /content/pages/importTree`는 하나의 호출에서 전체 중첩된 섹션/요소 트리가 있는 페이지를 생성합니다; 항상 발신자의 교회 아래에 삽입하고 본문의 id를 무시합니다).

### 페이지 생성 (`planPage` → `writePage`)

B1Admin의 `AddPageModal`의 "AI" 페이지 템플릿은 한 가지 규칙에 구축된 저비용 파이프라인(`AskApi/src/helpers/SiteGenHelper.ts`)을 사용합니다: **아무 모델도 빌더 JSON을 방출하지 않습니다**. 두 모델은 Vercel AI Gateway(순수 HTTP, SSM 키 `/{env}/aiGatewayApiKey` 또는 `AI_GATEWAY_API_KEY`)를 통해 작업을 분할합니다:

- **JEV** (`typesafe-ai/jev`) — 선택, 점수 및 확률이 있는 부울을 반환할 수 있지만 텍스트는 작성할 수 없는 형식 결정 모델입니다. 고정 템플릿 라이브러리에서 각 섹션을 차례로 선택하고, 레이아웃을 점수화하고, 사본을 사실 확인하며, 스톡 사진과 아이콘을 선택합니다. 입력 비용은 약 백만 토큰당 $0.04이고 출력은 무료이므로 페이지당 약 90호출은 1센트 미만의 비용이 듭니다.
- **작은 채팅 모델(기본값은 GPT-4.1 mini)** — 선택된 템플릿의 명명되고 길이가 제한된 텍스트 슬롯을 채웁니다. 작성자는 하나의 상수이며 `SITEGEN_COPY_MODEL` 환경 변수로 재정의할 수 있습니다(게이트웨이의 모든 채팅 모델 ID, 예: `anthropic/claude-haiku-4.5`). 세 교회에 대한 맹검 나란히 비교에서 Claude Haiku 4.5는 약간 더 따뜻하게 읽혔지만 GPT-4.1 mini는 가깝고 약 4배 더 저렴하고 빨랐으므로 기본값입니다. 모든 세 가지 레이아웃이 있는 전체 페이지의 비용은 약 1.3센트이며, 약 80%는 작성자입니다.

| 단계 | 엔드포인트 | 무엇이 일어나는가 |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | 페이지 유형(홈, 방문, 정보…)을 분류한 다음 JEV의 라운드별 확률에서 10개의 후보 레이아웃을 샘플링합니다(히어로 + 섹션 수 → 각 섹션 → 더 가까워짐), 중복을 제거하고 JEV에 적합성/흐름/격차에 대해 각각을 점수화하도록 하며 상위 3개와 작성 음성 및 `suggestedStyle`(팔레트 + 글꼴)을 반환합니다. 지금까지 동일한 섹션을 공유하는 후보는 JEV에 동일한 질문을 묻습니다. 따라서 라운드는 접두사로 메모됩니다. 최고 점수 6 미만은 `lowLayoutScore`로 기록됩니다. 해당 로그는 추가할 가치가 있는 템플릿의 백로그입니다. 약 2s |
| 2 | `POST /website/writePage`(후보당 하나의 호출) | 작성자는 슬롯 사본 두 섹션을 호출당 병렬로 채우고 JEV가 선택할 5개의 히어로 헤드라인을 반환합니다. JEV는 모든 섹션을 사실 확인합니다. 실패하거나, 스톡 구문을 사용하거나, 이전 섹션을 다시 말하는(공유된 4단어 실행, 코드에서 확인됨) 섹션은 특정 이유로 병렬로 다시 작성됩니다. 코드 스크럽은 스톡 교회 사이트 구문이 있는 문장을 제거합니다(교회 자신의 설명이 사용하지 않는 한). JEV는 사진 주제, 아이콘 및 히어로의 모양 분배기를 선택하고 결과를 점수화합니다. 저장 준비 섹션 트리 및 점수를 반환합니다. 약 6-9s |
| 3 | `POST /content/pages/importTree` | B1Admin은 최고 순위의 레이아웃만 작성합니다(차순위는 해당 쓰기가 실패할 경우 대체), 저장하고 미리보기를 엽니다(저장 후 약 10s) |

각 단계는 자체 요청이므로 모든 호출은 API Gateway 29초 한도 내에 머물러 있습니다. `SiteGenHelper.buildTree`의 템플릿은 카탈로그(`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`)의 고정 섹션 + 요소 트리이고 테마 토큰을 참조합니다(`var(--accent)`, `var(--lightAccent)`…). 따라서 생성된 페이지는 교회의 기존 외형 설정을 상속합니다. 섹션 템플릿을 추가한다는 것은 슬롯 목록을 `SECTIONS`에 추가하고 트리를 `buildTree`에 추가하는 것을 의미합니다. 단위 테스트는 모든 템플릿을 안내하고 트리를 검증합니다.

**입력.** 사본은 두 소스의 사실만 기술할 수 있습니다: 사용자가 입력한 것 및 `churchContext.facts`. 동일한 플래그가 데이터 지원 템플릿을 제어합니다: `times`는 교회가 B1에서 서비스 시간을 유지할 때 라이브 `serviceTimes` 요소를 렌더링합니다(그렇지 않으면 형식이 지정된 테이블), `groups`와 `countdown`은 데이터가 뒤에 있을 때만 제공됩니다. JEV 호출은 헤지됩니다. 중복은 1.5초 후에 발생하고 첫 번째 답변이 우승합니다. 게이트웨이가 가끔 지연되고 호출은 거의 무료이기 때문입니다.

**주제에 집중.** 사용자의 프롬프트는 교회에 대한 배경이 아니라 페이지의 *주제*입니다. `planPage`는 요청(`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`)을 분류하고, `event` 및 `topic` 페이지의 경우 일반 교회 템플릿(목사 메모, 설교, 사역, 그룹, 커뮤니티 영향, 주간 시간 및 카운트다운, 비디오 히어로)은 제공되지 않으며, `details`(언제/어디/무엇을 가져오세요) 및 날짜 `eventCountdown`이 있습니다. 두 판사 모두 주제의 관련성을 점수화합니다. B1Admin은 각 `writePage` 호출에 `planPage`에서 `pageType`을 전달합니다.

**짧은 요청에서 전체 페이지.** 페이지에는 3~6개의 중간 섹션, 넉넉한 슬롯 길이, 카드 섹션에 대한 소개 줄 및 5질문 FAQ가 있으며 복구 통과는 씬 상태로 돌아오는 섹션을 확장합니다. 생성은 한 번의 클릭입니다. 후속 질문은 없습니다. 요청이 완전한 페이지에 필요한 일반 세부 정보를 생략하는 경우(시작 시간, 방, 가져올 항목, 가입 방법) 작성자가 편집할 교회에 대한 그럴듯하고 겸손한 선택으로 채웁니다. 섹션이 병렬로 작성되기 때문에 이러한 격차는 **한 번** `planPage`(`assumedDetails`, `planPage`와 함께 실행되는 작은 작성자 호출)에서 결정되고 모든 `writePage` 호출에 `churchContext.assumedDetails`를 통해 다시 전달되므로 한 섹션은 5:00을 말할 수 없고 다른 하나는 5:30을 말할 수 없습니다. JEV는 요청, 교회의 기록 또는 결정된 세부 정보와 모순되는 섹션을 복구합니다. 결정된 세부 정보는 UI에 표시되지 않습니다. 교회는 다른 페이지처럼 페이지를 검토하고 편집합니다. 일부는 절대 만들어지지 않습니다: 사람 이름, 전화번호, 이메일 및 웹 주소, 가격, 통계, 교회 역사, 사람에게 귀속된 인용문 및 요청이 날짜를 제공하지 않은 날짜의 요일.

**시각적.** 템플릿은 사진이나 아이콘의 이름을 결코 지정하지 않습니다. 슬롯을 열어두고 하나의 일반 통과(`visualSlots` → `pickVisuals` → `applyVisuals`에서 `SiteGenHelper`)는 완성된 트리를 안내하고 모든 슬롯을 채웁니다: 섹션 배경 또는 `auto:photo`로 표시된 갤러리 항목, `auto:icon`, 히어로의 `auto:divider` 및 마커 없이 `textWithPhoto`, `card` 또는 `photo`가 비어 있는 `image` 요소. JEV는 옆의 텍스트에서 각각을 선택합니다(카드 사진은 해당 카드의 제목과 텍스트에서; 배경은 섹션 사본에서). 페이지에서 주제는 반복되지 않습니다. 새로운 템플릿은 따라서 사진을 무료로 얻습니다. 사진은 Pexels 검색 주제이며 `pexels:<term>` 자리 표시자로 방출되며 B1Admin은 `POST /content/stock/search`를 통해 해석합니다. `resolvesPhotos`를 보내지 않는 클라이언트는 기본 제공 히어로 이미지, 평평한 색상 밴드 및 사진 없는 카드 대신 가져옵니다. 의도적으로 초상화 주제는 없으며 목사 템플릿은 사진을 전달하지 않습니다: 스톡 낯선 사람은 절대 실제 사람을 대신하지 않습니다. 아직 페이지가 없는 교회의 경우 B1Admin은 `suggestedStyle`을 글로벌 스타일에 적용합니다. 기존 사이트는 모양을 유지합니다.

### 기타 엔드포인트

:::info
B1Admin의 `SectionToolbar` 다시 쓰기 버튼 및 페이지 목록 "사이트 생성" 버튼은 클라이언트 측에서 주석 처리된 상태로 남습니다. 아래의 AskApi 엔드포인트는 여전히 응답합니다. 해당 UI만 숨겨져 있습니다.
:::

| 엔드포인트 | 목적 |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | 원래 2단계 페이지 흐름(개요, 요소 JSON을 방출하는 섹션당 하나의 LLM 호출). 비용 때문에 B1Admin의 `planPage`/`writePage`로 대체됨; API 소비자용으로 유지 |
| `POST /website/generateSite` | 전체 사이트 생성. **설계상 2단계**: `planOnly: true` 호출은 다중 페이지 계획만 반환합니다(하나의 빠른 모델 호출), 그러면 클라이언트는 전체 콘텐츠를 요청합니다. 모든 요청을 Lambda/API-Gateway 타임아웃 내에 유지합니다 |
| `POST /website/rewriteSection` | 구조 보존 다시 쓰기: 모델은 텍스트 보유 답변만 변경할 수 있습니다. 재귀 구조 서명(id + 유형 + 순서)은 전과 후에 비교됩니다. 모든 불일치는 손상된 구조 대신 `fallback: true`가 있는 원본 섹션을 반환합니다 |
| `POST /website/generateAltText` | 최대 20개 이미지 URL에 대한 비전 호출; 간결한 대체 텍스트(≤125자, "사진" 접두사 제거됨)를 반환합니다 |
| `POST /website/generateMetaDescription` | 페이지의 텍스트 콘텐츠에서 하나의 SEO 메타 설명(≤155자) — B1Admin의 페이지 설정의 생성 버튼에 연결됨 |

이러한 엔드포인트의 프롬프트는 `AskApi/config/instructions/` 아래의 마크다운 파일이며, 모델이 생성하는 요소 카탈로그를 포함합니다. 두 가지 설계 포인트가 카탈로그를 정직하게 유지합니다: 클라이언트는 모든 요청에 `availableElementTypes`를 전달합니다(프롬프트는 해당 목록의 유형만 사용할 수 있습니다. 서버는 절대 전체 집합을 하드코드하지 않음), 그리고 API의 MCP `describe_page_builder` 도구는 [MCP](../api/mcp)를 통해 작업하는 AI 에이전트를 위해 동일한 가이드를 전달합니다. 모델은 OpenRouter를 통한 Anthropic Claude입니다. 섹션 콘텐츠의 경우 3.5 Haiku(레이턴시), 개요, 사이트 계획 및 비전의 경우 3.5 Sonnet. OpenRouter 키가 구성되지 않은 경우 OpenAI 대체입니다.

## 대화형 양식

양식(멤버십 모듈)은 연결 카드 스타일 페이지를 목표로 하는 대화형 모드를 얻었습니다. `forms`의 4개 열이 이를 작동시킵니다: `displayMode`(`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **렌더링** — apphelper의 `FormSubmissionEdit`는 `displayMode`가 `conversational`일 때 `ConversationalForm` 컴포넌트(한 번에 한 질문)로 전환합니다. B1App의 양식 페이지는 모드를 통과합니다. 어느 쪽 제출 페이로드도 동일합니다.
- **자동 생성 인물** — `autoCreatePerson` 설정된 제출에서 `ConversationalFormHelper.findOrCreatePerson`은 이메일로 중복 제거합니다(대소문자 구분 안 함). 그 외에는 `membershipStatus: "Guest"`를 사용하여 가정 + 인물을 생성한 다음 제출을 해당 인물에 연결합니다.
- **후속 이메일** — 제목과 본문이 설정되면 발신자는 기존 거래 경로(`TransactionalEmailHelper`)를 통해 템플릿이 지정된 이메일(`{firstName}` / `{churchName}` 토큰 포함)을 받습니다. 알림 다이제스트 도어를 절대 사용합니다. 두 가지 부작용 모두 비자동: 실패는 절대 제출을 잃지 않습니다.

4개 필드는 오늘 API를 통해 설정됩니다. B1Admin 양식 편집기는 아직 노출하지 않습니다.

## 공개 사이트 캐시

B1App의 공개 렌더 경로는 교회 태그 가져오기를 캐시합니다(`next: { revalidate: 300, tags: [sdSlug] }`프로덕션에서; 개발에서 `0`) 따라서 라이브 페이지는 ContentApi 쓰기 후 최대 5분 동안 오래된 상태로 유지될 수 있습니다. `POST /api/revalidate/{sdSlug}`은 B1App에서 `revalidateTag(sdSlug)`를 호출하고 해당 캐시를 조기에 제거하는 유일한 방법입니다.

두 명의 작성자가 이를 사용합니다:

1. **B1Admin** — `B1Admin/src/site/siteCache.ts`의 `clearSiteCache()`는 편집기 저장 후 게시합니다. 활성 사이트의 하위 도메인을 선호합니다(보조 사이트는 교회의 기본값이 아닌 *그* 태그를 무효화해야 함).
2. **Api** — B1Admin을 통과하지 않는 콘텐츠 뮤테이션(API 키, MCP, AI)은 콘텐츠 컨트롤러에서 `SiteCacheHelper.bump(churchId)`를 발생시킵니다. 도우미는 `SubDomainHelper`를 통해 교회 하위 도메인을 해석하고 `{b1AppRoot}/api/revalidate/{sd}`에 게시합니다. 도달 불가능한 B1App이 저장을 실패하지 않으므로 실패가 무시됩니다.

범프하는 컨트롤러: 페이지(저장, 삭제, 중복, 게시, 삭제, 게시 취소, AI 임시), 섹션, 요소, 블록, 링크, 글로벌 스타일, 게시물 및 리디렉션. 개발 `b1AppRoot`는 `http://{subdomain}.localtest.me:3301`입니다. 데모/스테이징/프로덕션은 `https://{subdomain}.b1.church`를 사용합니다.

## 관련 페이지

- [웹사이트 라우팅 및 다중 사이트](./websites) — 요청이 교회/사이트로 해석되는 방법 및 사용자 정의 도메인이 라우트되는 방식
- [콘텐츠 엔드포인트](../api/endpoints/content) — 페이지, 섹션, 요소, 블록, 게시물, 리디렉션 및 설정에 대한 전체 REST 표면
- [AppHelper](../shared-libraries/app-helper) — 렌더러, 레지스트리, 분배기 및 위젯을 제공하는 npm 패키지
- [MCP 서버](../api/mcp) — `describe_page_builder` 가이드 도구 포함
- [페이지 편집기(최종 사용자)](/docs/b1-admin/website/page-editor) — 직원용 편집기 설명서
