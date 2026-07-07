---
title: "웹사이트 빌더 아키텍처"
---

# 웹사이트 빌더 아키텍처

<div class="article-intro">

B1App에서 제공되는 모든 교회 웹사이트는 ContentApi에 저장되고 B1Admin에서 시각적으로 편집된 콘텐츠 트리(페이지, 섹션, 요소)에서 렌더링됩니다. 하나의 공유 컴포넌트 라이브러리는 편집기 미리보기와 라이브 사이트를 모두 렌더링하고, 하나의 요소 유형 카탈로그는 페이지에 나타날 수 있는 것을 정의하고, 별도의 AI 서비스는 그 트리를 생성하거나 다시 쓸 수 있습니다. 이 페이지는 전체 스택을 매핑합니다: `@churchapps/helpers`의 요소 계약, 렌더 파이프라인, 교회 데이터 요소, 사이트 전체 위젯, 블로그 계층, 액세스 게이트 페이지, SEO, AI 생성, 대화형 양식.

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

스택 전체에서 세 가지 규칙이 유지됩니다.

1. **하나의 트리, 두 개의 렌더러.** 페이지는 `pages → sections → elements` 트리이고 모든 노드는 `answers` JSON blob으로 설정을 전달합니다. 동일한 apphelper 컴포넌트는 B1Admin의 드래그 앤 드롭 편집기와 B1App의 서버 렌더링 공개 사이트를 렌더링합니다. 별도의 "게시 형식"이 없습니다.
2. **계약은 `@churchapps/helpers`에 있습니다.** `ElementTypes.ts`는 요소 유형의 단일 카탈로그입니다. 렌더러는 apphelper의 레지스트리를 통해 해결됩니다. 편집기 양식은 B1Admin에 있습니다. 요소 유형을 추가하면 그 순서로 세 가지를 모두 건드려야 합니다.
3. **공개 사이트는 익명 엔드포인트를 읽습니다.** B1App이 필요로 하는 모든 것(페이지 트리, 설정, 블로그 게시물, 리디렉트, 다른 모듈의 교회 데이터 엔드포인트)은 공개입니다. 인증은 선택사항입니다: 익명 트리 엔드포인트의 JWT는 회원 전용 페이지를 잠금 해제하고 다른 것은 변경되지 않습니다.

## 콘텐츠 트리

콘텐츠 모듈 (`Api/src/modules/content`)은 빌더의 데이터를 소유합니다.

| 테이블 | 역할 |
|--------|------|
| `pages` | URL당 한 페이지: `url`, `title`, `layout`, 더하기 `visibility`/`groupIds` (액세스 게이팅) 및 `metaDescription` (SEO) |
| `sections` | 페이지의 가로 밴드 (또는 블록): 배경, 텍스트 색상, 스타일링을 전달하는 `answersJSON` 더하기 `dividerTop`/`dividerBottom` 모양 분할기 구성 |
| `elements` | 섹션 내 콘텐츠 조각: `elementType` + `answersJSON`, 레이아웃 유형 (행/열, 캐러셀)에 대해 중첩 가능 |
| `blocks` | 페이지에 걸쳐 공유되는 재사용 가능한 섹션/요소 그룹 (바닥글 블록, 요소 블록) |
| `posts` | 일반 페이지에 대한 블로그 메타데이터 ([블로그](#blog-posts-over-pages) 참조) |
| `redirects` | 교회별 `fromPath → toPath` 쌍, 200으로 제한됨 ([SEO](#seo-and-discoverability) 참조) |
| `settings` | 키-값 교회 설정; `public`으로 플래그된 행은 익명으로 제공되고 위젯/분석 구성을 전달합니다 |

한 URL에 대한 전체 트리는 단일 익명 호출에서 반환됩니다. `GET /content/pages/:churchId/tree?url=/about` — 이것이 B1App이 서버 렌더링하는 것입니다. 편집기 요청은 id로 가져오고 내부 id를 유지합니다.

## 요소 계약

### 카탈로그 (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts`는 모든 요소 유형을 `ElementTypeDefinition`으로 정의합니다: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, 답변에 대한 JSON 스키마 스타일 `answersSchema`. `validateElementAnswers()`는 의도적으로 관대합니다. 알려지지 않은 유형 및 추가 키가 통과하므로 이전 콘텐츠는 카탈로그 업그레이드에서 절대 깨지지 않습니다. **오늘 35개 유형이 제공됩니다:**

| 카테고리 | 요소 유형 |
|---------|----------|
| 레이아웃 (6) | row, column, box, carousel, whiteSpace, block |
| 콘텐츠 (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| 미디어 (4) | image, gallery, video, map |
| 교회 (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| 고급 (2) | rawHTML, iframe |

`sermons` 요소는 교회 유형 중 가장 설정할 수 있는 것입니다: `layout` 답변은 `browse` (레거시 완전 브라우저), `grid`, `list`, 또는 `featuredLatest`를 선택합니다. `playlistId`, `itemCount`, `showTitles`, `showDates`가 비찾아보기 레이아웃을 세밀하게 조정합니다.

### 렌더러 (`@churchapps/apphelper`)

렌더러는 `Packages/apphelper/src/website/components/elementTypes/`에 있고 유형당 하나의 컴포넌트입니다. `ElementRegistry.ts`를 통해 해결됩니다. 두 계층 맵이 `Element.tsx`가 모든 35개 유형에 대한 기본 렌더러를 등록하는 (`registerDefaultElementRenderer`) 곳입니다. 호스트 앱은 패키지를 포크하지 않고 런타임에 이들 중 아무것이나 재정의할 수 있습니다 (`registerElementRenderer`).

### 편집기 양식 (B1Admin)

편집기의 유형별 설정 양식은 `B1Admin/src/site/admin/elements/`에 있습니다. `ElementEdit.tsx`는 전용 컴포넌트 (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) 또는 유형별 인라인 필드 빌더로 디스패치됩니다. 이 카탈로그의 AI 대면 미러는 API의 MCP `describe_page_builder` 도구입니다 ([MCP 서버](../api/mcp) 참조).

### 섹션 모양 분할기

섹션은 어느 쪽 가장자리에나 장식 모양 분할기를 전달할 수 있습니다. 구성은 섹션의 `answersJSON`에 `dividerTop` / `dividerBottom` 객체로 있습니다. `{ shape, color, height, flip }` with `shape` 중 하나인 `wave, waves, slant, curve, triangle, peaks`. Apphelper는 `SectionDivider` 컴포넌트 및 `parseDividerConfig()` 도우미를 제공합니다. 두 앱의 섹션 렌더러 (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`)는 답변을 파싱하고 분할기를 마운트하고 `SectionEdit.tsx`는 B1Admin에서 선택기 UI를 제공합니다. 패키지는 빌딩 블록만 제공합니다. 섹션 레벨 배선은 소비 앱의 작업입니다.

## 교회 데이터 요소

세 가지 요소 유형은 작성된 콘텐츠가 아니라 라이브 교회 데이터를 렌더링합니다. 모듈 격리가 여전히 적용됩니다. 각각은 브라우저에서 소유 모듈의 자신의 공개 엔드포인트를 호출합니다.

| 요소 | 엔드포인트 | 주석 |
|------|-----------|------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | `{ fundId, totalAmount, donationCount }`를 반환합니다. 선택사항 `?startDate=&endDate=` 윈도우; 요소는 `goalAmount` 답변과 비교합니다 |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **옵트인만**: 그룹은 `publicRoster` 설정되어야 합니다 (기본값 꺼짐). 프로젝션은 의도적으로 최소입니다. `personId`, `displayName`, `leader`, photo. 연락처 또는 인구통계 필드가 없습니다 |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | 캠퍼스 → 서비스 → 시간 트리를 반환합니다. apphelper 렌더러는 이에서 최선의 노력 schema.org `Event` JSON-LD를 방출합니다 (API는 일반 데이터를 반환합니다) |

:::warning
`publicRoster`는 `staffGrid`의 개인 정보 보호 게이트입니다. 공개 그룹 회원 프로젝션을 절대 확대하거나 플래그를 우회하지 마세요. 명부 엔드포인트는 설계상 익명이고 최소 필드 목록이 안전 속성입니다.
:::

## 사이트 전체 위젯

두 위젯은 트리 내부가 아니라 모든 공개 페이지에 렌더링됩니다: **AnnouncementBanner** (해제 가능한 페이지 상단 막대) 및 **Launcher** (기부/방문/시청 스타일 링크를 위한 부동 작업 허브). 두 컴포넌트와 그 `parse*Config()` 도우미는 apphelper에서 제공됩니다. 구성은 두 공개 설정 행입니다. 키 `announcementBanner` 및 `launcher`. B1Admin의 `SiteWidgetsEdit` (모양 페이지)에서 기록되고 `GET /content/settings/public/:churchId`를 통해 B1App의 공개 레이아웃에서 읽습니다. API는 이를 불투명 키-값 쌍으로 취급합니다. 키 이름은 두 앱 간의 규칙입니다.

## 블로그: 페이지 위의 게시물

블로그는 두 번째 콘텐츠 시스템이 아니라 얇은 메타데이터 계층입니다. `posts` 행 (`title`, `slug`, `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, `tags`)은 `pageId`를 통해 정규 빌더 페이지를 가리킵니다. 페이지는 본문을 보유하고 정규 페이지 편집기에서 편집됩니다. 공개 표면 (모두 익명, `PostController`):

| 경로 | 목적 |
|------|------|
| `GET /content/posts/public/:churchId` | 게시된 게시물, `?category=&tag=`로 필터링 가능, 페이지 매김됨 |
| `GET /content/posts/public/:churchId/slug/:slug` | 한 게시물의 메타데이터 |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 피드 |

게시물은 `publishDate`가 설정되고 지난 후 "게시됨"입니다. B1App은 `/{sdSlug}/blog` (목록, RSS 피드는 대체 링크로 광고됨)과 `/{sdSlug}/blog/[postSlug]`을 제공하고 이는 `/blog/{slug}`에서 지원 페이지 트리를 가져오고 BlogPosting JSON-LD를 추가하며 다른 모든 페이지와 같은 Zone/Section 파이프라인을 통해 렌더링합니다. 블로그 URL은 교회별 사이트맵에 포함됩니다. B1Admin의 작성 UI (**사이트 → 블로그**)는 `/blog/{slug}`에서 지원 페이지와 `posts` 행을 함께 생성합니다.

## 회원 전용 페이지

`pages.visibility`는 네비게이션 링크 열거를 재사용합니다. `everyone` (기본값), `visitors`, `members`, `staff`, `team`, `groups` (with `groupIds`). 하지만 nav 필터가 아니라 **하드 액세스 게이트**로서 (`PageVisibilityHelper.canViewPage`). 흐름:

1. 익명 트리 엔드포인트는 URL 기반 가져오기에서 가시성을 확인합니다. 게이트된 페이지의 익명 호출자는 콘텐츠 대신 `{ restricted: true, visibility }`를 가져옵니다. 트리는 절대 새지 않습니다.
2. 엔드포인트는 여전히 JWT를 인정합니다: `CustomAuthProvider`는 익명 경로를 포함한 *모든* 요청에서 `Authorization` 헤더를 검증하므로 인증된 회원의 동일한 URL 가져오기는 정상적으로 해결됩니다.
3. B1App은 `restricted` 응답에서 `RestrictedPage`를 렌더링합니다. 저장된 자격증에서 세션을 수화하고 JWT로 트리를 다시 가져오고 렌더링합니다. 또는 세션이 없을 때 `returnUrl`이 있는 로그인 게이트를 보여줍니다.

:::info
게이트의 세분성은 레벨에 따라 다릅니다: `groups`는 토큰의 `groupIds`를 페이지의 목록에 대해 확인하고 `staff`는 `membershipStatus`를 확인합니다. 하지만 `members`와 `team`은 현재 교회의 모든 인증된 사용자를 통과합니다. `groups`를 엄격한 옵션으로 취급합니다.
:::

## SEO 및 발견성

이 모든 것이 B1App 측 ContentApi 데이터 위 렌더링입니다. API는 저장하고 앱은 방출합니다.

| 관심사 | 작동 방식 |
|--------|---------|
| 메타 설명 | `pages.metaDescription` (≤300자)는 `MetaHelper.getMetaData()`를 통해 모든 빌더 렌더링 경로에서 Next.js `Metadata` (설명 + Open Graph)로 흐릅니다. B1Admin의 페이지 설정에는 AI "생성" 버튼이 포함됩니다 (아래 참조) |
| 리디렉트 | 교회별 `redirects` 행이 `/content/redirects` (`content.edit`, 200행 제한, 정규화된 경로)에서 관리됩니다. 404가 될 위치에서 B1App의 페이지 경로는 경로를 `GET /content/redirects/public/:churchId`에 대해 해결하고 HTTP 308을 Next의 `permanentRedirect`를 통해 발급합니다. 일치하지 않은 경로는 `notFound()`로 통과합니다 |
| 브랜드 404 | `not-found.tsx`는 일반 오류 대신 교회의 로고, 이름, 테마를 사용하여 `BrandedNotFound`를 렌더링합니다 |
| 구조화된 데이터 | 블로그 게시물의 `BlogPosting` JSON-LD; 설교 페이지 (`/{sdSlug}/sermons/[sermonId]`)와 `sermons` 요소를 포함하는 페이지의 `VideoObject`; 빌더 페이지의 달력/이벤트 요소에서 `Event`; `serviceTimes` 요소의 schema.org `Event` |
| 설교 페이지 | 모든 공개 설교는 `/sermons/[sermonId]`에서 크롤 가능한 페이지를 가져옵니다. 전체 메타데이터를 포함합니다. 설교는 더 이상 클라이언트 측 브라우저 요소 내부에 잠기지 않습니다 |
| 분석 | 공개 설정 키 `ga4MeasurementId` (B1Admin에서 리디렉트 옆에서 관리됨)은 `next/script`를 통해 교회별 GA4 gtag를 주입합니다 |
| 사이트맵 및 피드 | 교회별 `sitemap.xml` 경로는 빌더 페이지 및 블로그 URL을 포함합니다. 블로그 목록은 RSS 피드를 광고합니다 |
| 접근성 | 공개 크롬은 모든 레이아웃 래퍼에서 `<main id="main-content">` 랜드마크를 대상으로 하는 건너뛰기 링크를 렌더링합니다 |

## AI 생성 (AskApi)

페이지 및 사이트 생성은 **AskApi** (별도 서비스)에서 `/website` 컨트롤러 아래에서 실행됩니다. 나머지 모든 것과 동일한 `CustomAuthProvider` JWT로 인증하고 콘텐츠와 관련하여 **상태 비저장**입니다. 모든 엔드포인트는 JSON을 반환하고 호출자 (B1Admin)는 ContentApi (`POST /content/pages/temp/ai`가 생성된 페이지-섹션-요소 번들을 한 번에 저장)를 통해 결과를 지속합니다.

:::info
2026-07-03부터 B1Admin의 이 파이프라인 진입점 — 사이트 "AI" 템플릿이 `AddPageModal`에서 `SectionToolbar` 다시 쓰기 버튼과 페이지 목록 "사이트 생성" 버튼 — 은 기능이 재작업되는 동안 클라이언트 측에서 주석 처리됩니다. 아래 AskApi 엔드포인트는 영향을 받지 않고 여전히 응답합니다. B1Admin UI만 숨겨집니다.
:::

| 엔드포인트 | 목적 |
|-----------|------|
| `POST /website/generatePageOutline` → `generateSection` | 원래 두 단계 페이지 흐름: 먼저 개요, 그 후 섹션당 하나의 호출. B1Admin의 `AddPageModal`의 "AI" 페이지 템플릿이 이를 구동합니다. 개요, 병렬 섹션 생성, 미리보기 |
| `POST /website/generateSite` | 사이트 전체 생성. **설계상 두 단계**: `planOnly: true` 호출은 다중 페이지 계획만 반환합니다 (하나의 빠른 모델 호출). 그 후 클라이언트는 전체 콘텐츠를 요청합니다. 모든 요청을 Lambda/API-Gateway 타임아웃 내에 유지합니다 |
| `POST /website/rewriteSection` | 구조 보존 다시 쓰기: 모델은 텍스트-부하 답변만 변경할 수 있습니다. 재귀 구조 서명 (id + 유형 + 순서)은 전후 비교됩니다. 불일치는 손상된 구조 대신 `fallback: true`로 원래 섹션을 반환합니다 |
| `POST /website/generateAltText` | 최대 20개 이미지 URL에 대한 비전 호출; 간결한 alt 텍스트를 반환합니다 (≤125자, "사진" 접두사 제거됨) |
| `POST /website/generateMetaDescription` | 페이지의 텍스트 콘텐츠에서 하나의 SEO 메타 설명 (≤155자). B1Admin의 페이지 설정의 생성 버튼에 배선됨 |

프롬프트는 `AskApi/config/instructions/` 아래의 마크다운 파일이고 모델이 생성하는 요소 카탈로그를 포함합니다. 두 가지 설계 포인트가 카탈로그를 정직하게 유지합니다: 클라이언트는 모든 요청에서 `availableElementTypes`를 전달합니다 (프롬프트는 그 목록의 유형만 사용할 수 있습니다. 서버는 절대 전체 세트를 하드코드하지 않습니다). API의 MCP `describe_page_builder` 도구는 [MCP](../api/mcp)를 통해 작동하는 AI 에이전트를 위한 동일한 가이드를 전달합니다. 모델은 OpenRouter를 통한 Anthropic Claude입니다. 섹션 콘텐츠용 3.5 Haiku (레이턴시), 개요, 사이트 계획, 비전용 3.5 Sonnet. OpenRouter 키가 구성되지 않은 경우 OpenAI 대체가 있습니다.

## 대화형 양식

양식 (멤버십 모듈)은 연결 카드 스타일 페이지를 목표로 하는 대화형 모드를 얻었습니다. `forms`의 네 열이 이를 구동합니다: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **렌더링** — apphelper의 `FormSubmissionEdit`는 `displayMode`가 `conversational`일 때 `ConversationalForm` 컴포넌트 (한 번에 한 질문)로 전환됩니다. B1App의 양식 페이지는 모드를 통과합니다. 어느 쪽이든 동일한 제출 페이로드.
- **자동 생성 사람** — `autoCreatePerson` 설정으로 제출 시 `ConversationalFormHelper.findOrCreatePerson`은 이메일 (대소문자 구분 없음)로 중복 제거하고 그렇지 않으면 가구 + 사람을 `membershipStatus: "Guest"`로 생성한 후 제출을 그 사람에게 연결합니다.
- **팔로우업 이메일** — 주제 및 본문이 설정되면 제출자는 기존 트랜잭션 경로 (`TransactionalEmailHelper`)를 통해 템플릿 이메일 (`{firstName}` / `{churchName}` 토큰 포함)을 받습니다. 절대 알림 다이제스트 문을 통해. 둘 다 부작용은 치명적이지 않습니다. 실패는 절대 제출을 손실하지 않습니다.

네 필드는 오늘 API를 통해 설정됩니다. B1Admin 양식 편집기는 아직 이를 노출하지 않습니다.

## 관련 페이지

- [웹사이트 라우팅 및 멀티 사이트](./websites) — 요청이 교회/사이트로 어떻게 해결되는지, 사용자 정의 도메인이 어떻게 라우트되는지
- [콘텐츠 엔드포인트](../api/endpoints/content) — 페이지, 섹션, 요소, 블록, 게시물, 리디렉트, 설정에 대한 전체 REST 표면
- [AppHelper](../shared-libraries/app-helper) — 렌더러, 레지스트리, 분할기, 위젯을 제공하는 npm 패키지
- [MCP 서버](../api/mcp) — `describe_page_builder` 가이드 도구 포함
- [페이지 편집기 (최종 사용자)](/docs/b1-admin/website/page-editor) — 직원 대면 편집기 문서
