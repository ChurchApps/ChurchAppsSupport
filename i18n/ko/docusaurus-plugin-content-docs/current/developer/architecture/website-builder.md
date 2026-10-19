---
title: "웹사이트 빌더 아키텍처"
---

# 웹사이트 빌더 아키텍처

<div class="article-intro">

B1App이 제공하는 모든 교회 웹사이트는 콘텐츠 트리(페이지, 섹션, 요소)에서 렌더링됩니다. 이 트리는 ContentApi에 저장되고 B1Admin에서 시각적으로 편집됩니다. 하나의 공유 컴포넌트 라이브러리가 편집기 미리보기와 실제 사이트를 모두 렌더링하고, 하나의 요소 유형 카탈로그가 페이지에 나타날 수 있는 항목을 정의하며, 별도의 AI 서비스가 이 트리를 생성하거나 다시 작성할 수 있습니다. 이 페이지는 전체 구조를 설명합니다: `@churchapps/helpers`의 요소 계약, 렌더링 파이프라인, 교회 데이터 요소, 사이트 전체 위젯, 블로그 계층, 접근 제한 페이지, SEO, AI 생성, 대화형 양식.

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

이 스택 전체에 적용되는 세 가지 규칙은 다음과 같습니다:

1. **트리 하나, 렌더러 둘.** 페이지는 `pages → sections → elements` 트리이며, 각 노드는 설정을 `answers` JSON 블롭으로 담고 있습니다. 같은 apphelper 컴포넌트가 B1Admin의 드래그 앤 드롭 편집기와 B1App의 서버 렌더링 공개 사이트를 모두 렌더링합니다 -- 별도의 "게시 형식"은 없습니다.
2. **계약은 `@churchapps/helpers`에 있습니다.** `ElementTypes.ts`는 요소 유형의 단일 카탈로그입니다. 렌더러는 apphelper의 레지스트리를 통해 해석되며, 편집기 양식은 B1Admin에 있습니다. 요소 유형을 추가하려면 이 세 곳을 모두 이 순서대로 수정해야 합니다.
3. **공개 사이트는 익명 엔드포인트를 읽습니다.** B1App에 필요한 모든 것 -- 페이지 트리, 설정, 블로그 게시물, 리디렉션, 그리고 다른 모듈의 교회 데이터 엔드포인트 -- 은 공개되어 있습니다. 인증은 선택 사항입니다. 익명 트리 엔드포인트에 JWT가 있으면 회원 전용 페이지가 열리고, 그 밖의 것은 달라지지 않습니다.

## 콘텐츠 트리

콘텐츠 모듈(`Api/src/modules/content`)이 빌더의 데이터를 소유합니다:

| 테이블 | 역할 |
|-------|------|
| `pages` | URL마다 페이지 하나: `url`, `title`, `layout`, 그리고 접근 제한용 `visibility`/`groupIds`와 SEO용 `metaDescription` |
| `sections` | 페이지(또는 블록) 위의 가로 띠: 배경, 글자 색, 그리고 스타일 정보와 `dividerTop`/`dividerBottom` 모양 구분선 설정을 담는 `answersJSON` |
| `elements` | 섹션 안의 콘텐츠 조각: `elementType` + `answersJSON`. 레이아웃 유형(row/column, carousel)은 중첩할 수 있습니다 |
| `blocks` | 여러 페이지에서 공유되는 재사용 가능한 섹션/요소 묶음(바닥글 블록, 요소 블록) |
| `posts` | 독립형 블로그 게시물([블로그](#blog) 참조) |
| `redirects` | 교회별 `fromPath → toPath` 쌍, 최대 200개([SEO](#seo-and-discoverability) 참조) |
| `settings` | 키-값 교회 설정. `public`으로 표시된 행은 익명으로 제공되며 위젯과 분석 설정을 담습니다 |

URL 하나에 대한 전체 트리는 익명 호출 한 번으로 반환됩니다 -- `GET /content/pages/:churchId/tree?url=/about` -- 이것이 B1App이 서버 렌더링하는 데이터입니다. 편집기 요청은 대신 id로 가져오며, 내부 id를 유지합니다.

## 요소 계약

### 카탈로그 (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts`는 모든 요소 유형을 `ElementTypeDefinition`으로 정의합니다: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, 그리고 답변을 위한 JSON 스키마 형식의 `answersSchema`. `validateElementAnswers()`는 의도적으로 관대합니다 -- 알 수 없는 유형과 추가 키는 통과하므로, 카탈로그를 업그레이드해도 기존 콘텐츠가 깨지지 않습니다. **현재 35개 유형이 제공됩니다:**

| 범주 | 요소 유형 |
|----------|---------------|
| 레이아웃 (6) | row, column, box, carousel, whiteSpace, block |
| 콘텐츠 (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| 미디어 (4) | image, gallery, video, map |
| 교회 (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| 고급 (2) | rawHTML, iframe |

`sermons` 요소는 교회 유형 중 가장 많이 설정할 수 있습니다. `layout` 답변으로 `browse`(기존 전체 브라우저), `grid`, `list`, `featuredLatest` 중 하나를 고르며, `playlistId`, `itemCount`, `showTitles`, `showDates`는 browse가 아닌 레이아웃을 세부적으로 조정합니다.

`rawHTML` 요소에는 두 가지 답변이 있습니다: `rawHTML`(마크업)과 `javascript`. `innerHTML`로 삽입된 스크립트는 실행되지 않으므로, `RawHTMLElement`는 마크업의 모든 `<script>` 노드를 새 요소로 다시 생성합니다. 이렇게 파서가 삽입하지 않은 노드는 CSP의 `strict-dynamic` 하에서 신뢰됩니다. `<`로 시작하는 `javascript` 답변(`<script>` 태그와 함께 붙여넣은 벤더 스니펫)은 마크업으로 파싱되어 같은 방식으로 처리됩니다. 그 밖의 경우에는 일반 인라인 스크립트로 실행됩니다. B1Admin은 JavaScript 상자에 있는 단독 URL을 표시합니다. 단독 URL은 아무 동작도 하지 않는 스크립트로 실행되기 때문입니다. `map` 요소는 아무것도 렌더링하지 않으며, Google Maps API 키가 설정되지 않은 경우 Google Maps 스크립트도 로드하지 않습니다.

### 렌더러 (`@churchapps/apphelper`)

렌더러는 `Packages/apphelper/src/website/components/elementTypes/`에 있으며, 유형마다 컴포넌트 하나씩 있습니다. `ElementRegistry.ts`를 통해 해석되는 2계층 맵입니다. `Element.tsx`가 35개 유형 모두의 기본 렌더러를 등록하고(`registerDefaultElementRenderer`), 호스트 앱은 패키지를 포크하지 않고도 런타임에 어떤 렌더러든 재정의할 수 있습니다(`registerElementRenderer`).

### 편집기 양식 (B1Admin)

편집기의 유형별 설정 양식은 `B1Admin/src/site/admin/elements/`에 있습니다. `ElementEdit.tsx`가 전용 컴포넌트(`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …)나 유형별 인라인 필드 빌더로 분기합니다. 이 카탈로그의 AI용 거울은 API의 MCP `describe_page_builder` 도구입니다([MCP 서버](../api/mcp) 참조).

편집기 미리보기는 실제 사이트와 같은 `Theme`을 마운트하며, 이 테마는 교회의 전역 스타일에서 `--headingFont` / `--bodyFont` CSS 변수를 설정합니다. B1App은 이 변수를 `pages.css`를 통해 적용하는데, B1Admin은 이 파일을 가져올 수 없습니다. 그래서 `ContentEditor.tsx`는 `EDITOR_PAGE_FONT_CSS`(`src/site/admin/editorCss.ts`)를 주입하여 `.page` 본문 텍스트와 `h1`–`h6`에 적용합니다. 이것이 없으면 미리보기의 제목이 관리자 글꼴로 표시되었습니다.

### 섹션 모양 구분선

섹션은 양쪽 가장자리에 장식용 모양 구분선을 둘 수 있습니다. 설정은 섹션의 `answersJSON`에 `dividerTop` / `dividerBottom` 객체로 저장됩니다 -- `{ shape, color, height, flip }`이며, `shape`는 `wave, waves, slant, curve, triangle, peaks` 중 하나입니다. apphelper는 `SectionDivider` 컴포넌트와 `parseDividerConfig()` 헬퍼를 제공합니다. 두 앱의 Section 렌더러(`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`)가 답변을 파싱하고 구분선을 마운트하며, B1Admin의 `SectionEdit.tsx`가 선택 UI를 제공합니다. 패키지는 구성 요소만 제공하며, 섹션 수준의 연결은 이를 사용하는 앱의 몫입니다.

## 교회 데이터 요소

세 가지 요소 유형은 작성된 콘텐츠가 아니라 실시간 교회 데이터를 렌더링합니다. 모듈 격리는 여전히 적용됩니다 -- 각 요소는 소유 모듈의 공개 엔드포인트를 브라우저에서 직접 호출합니다:

| 요소 | 엔드포인트 | 비고 |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | `{ fundId, totalAmount, donationCount }`를 반환하며, 선택적으로 `?startDate=&endDate=` 기간을 지정합니다. 요소는 이 값을 `goalAmount` 답변과 비교합니다 |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **옵트인 전용**: 그룹에 `publicRoster`가 설정되어 있어야 합니다(기본값은 꺼짐). 결과 projection은 의도적으로 최소화되어 있습니다 -- `personId`, `displayName`, `leader`, 사진만 포함되며 연락처나 인구통계 필드는 없습니다 |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | 캠퍼스 → 예배 → 시간 트리를 반환합니다. apphelper 렌더러는 이를 바탕으로 best-effort schema.org `Event` JSON-LD를 내보냅니다(API는 순수 데이터를 반환합니다) |

:::warning
`publicRoster`는 `staffGrid`의 개인정보 보호 게이트입니다. 공개 그룹 구성원 projection을 넓히거나 이 플래그를 우회하지 마십시오. 명단 엔드포인트는 설계상 익명이며, 최소 필드 목록이 바로 안전을 보장하는 속성입니다.
:::

### 캘린더 요소와 행사 페이지

`calendar` 요소의 답변은 `calendarType`(`group` | `curated`), `calendarId`, `display`(기본값 `month` 또는 `upcoming`), `tag`입니다. B1App은 `src/components/Element.tsx`에서 `registerElementRenderer("calendar", …)`로 apphelper 렌더러를 재정의합니다:

- **`display: "upcoming"`**은 B1App의 `UpcomingEventsElement`를 렌더링합니다. 이 요소는 `GET /content/events/public/group/:churchId/:groupId` 또는 `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`를 불러오고, `buildOccurrences()`(`src/helpers/EventOccurrences.ts`, 1년 안에 행사당 한 번의 발생)로 반복 일정을 펼친 뒤, 처음 12개를 사진 타일(`events.photoUrl`, 없으면 테마의 어두운 색 위에 제목)로 보여줍니다. 각 타일은 `/events/{id}`로 연결되며, 캘린더의 ICS 피드를 구독하는 메뉴가 있습니다.
- **`display: "month"`**는 `eventUrl` 콜백과 함께 apphelper의 `CalendarElement`를 렌더링합니다. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar`는 클릭하면 세부 정보 대화상자를 여는 대신 그 URL로 이동합니다(B1Admin은 `eventUrl`을 전달하지 않으므로 관리자 캘린더는 대화상자를 유지합니다).
- **`tag`**는 두 표시 방식 모두를 `EventHelper.hasTag()`(`@churchapps/helpers`)로 필터링합니다. 쉼표로 구분된 `events.tags`와 대소문자를 구분하지 않고 비교하며, 비어 있으면 모두 표시합니다. 큐레이션 캘린더 조인은 `e.tags`를 선택하므로 큐레이션 행사도 태그를 가집니다.

큐레이션 행사는 `realEventId`(`eventPageId()`)로 연결되므로, URL은 항상 실제 기본 행사를 가리킵니다. `/{sdSlug}/events/[eventId]`는 빌더 파이프라인이 아닌 전용 라우트입니다. 이 라우트는 `GET /content/events/public/:churchId/:id`를 불러옵니다. 이 엔드포인트는 보류 중이거나 거부된 행사, 그리고 등록 없이 비공개인 행사에 대해 `null`을 반환하며, 거부되지 않은 룸 예약에서 `roomNames`를 추가합니다. 라우트는 `EventPageContent`(사진 히어로, 마크다운 설명, 일시/장소 사이드바, `registrationEnabled`일 때 **이 행사에 등록**, `GET /content/events/public/:churchId/:id/ical`로 연결되는 **내 캘린더에 추가** 링크)를 렌더링하고, 사진을 Open Graph 이미지로 사용하며, `EventPageJsonLd`를 통해 다음 발생 건에 대한 `Event` JSON-LD를 내보냅니다. 알 수 없거나 숨겨진 행사는 실제 404를 반환합니다.

## 사이트 전체 위젯

두 위젯은 트리 안이 아니라 모든 공개 페이지에 렌더링됩니다: **AnnouncementBanner**(닫을 수 있는 페이지 상단 막대)와 **Launcher**(give/visit/watch 스타일 링크를 위한 플로팅 액션 허브). 두 컴포넌트와 `parse*Config()` 헬퍼는 모두 apphelper에 있습니다. 설정은 두 개의 공개 설정 행으로 이루어집니다 -- 키 `announcementBanner`와 `launcher`입니다. B1Admin의 `SiteWidgetsEdit`(Appearance 페이지)가 이를 작성하고, B1App의 공개 레이아웃이 `GET /content/settings/public/:churchId`를 통해 읽습니다. API는 이를 불투명한 키-값 쌍으로 취급하며, 키 이름은 두 앱 사이의 약속입니다.

## 블로그 {#blog}

블로그는 빌더 페이지 위의 계층이 아니라 독립된 콘텐츠 유형입니다. `posts` 행 하나가 게시물 전체를 담습니다: `title`, `slug`, `excerpt`, `content`(마크다운 본문), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. 공개 표면은 모두 익명이며 `PostController`가 제공합니다:

| 라우트 | 용도 |
|-------|---------|
| `GET /content/posts/public/:churchId` | 게시된 게시물. `?category=&tag=`로 필터링할 수 있으며 페이지로 나뉩니다 |
| `GET /content/posts/public/:churchId/categories` | 게시된 게시물 전체에서 나온 고유한 카테고리 |
| `GET /content/posts/public/:churchId/slug/:slug` | 게시된 게시물 하나 |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 피드. 제목은 교회 이름이며, 각 항목에 카테고리와 요약(또는 내용) 설명이 포함됩니다 |

`publishDate`가 설정되어 있고 그 날짜가 지났으면 게시물은 "게시됨" 상태입니다. 미래의 `publishDate`는 예약 게시물입니다(공개적으로는 숨겨지고, 관리자 화면에는 Scheduled 칩과 함께 표시됩니다). 읽기 엔드포인트는 각 게시물에 `authorName`을 추가합니다. 이 이름은 membership 모듈 게이트웨이를 통해 `authorId`에서 확인합니다. 요약이 없으면 목록 카드, 메타 설명, RSS에서 마크다운 기호를 제거한 본문(약 160자)으로 대신합니다. B1App은 `/{sdSlug}/blog`에 편집형 목록을 제공합니다. 이 목록은 가운데 정렬된 헤더(필터링되면 활성 카테고리나 태그 이름이 됨), 카테고리 칩 필터 행, 작성자 정보와 요약이 있는 왼쪽 썸네일 게시물 행으로 구성되며, RSS 피드는 대체 링크로 안내됩니다. 또한 `/{sdSlug}/blog/[postSlug]`는 전용 라우트(Zone/Section 파이프라인이 아님)이며, 가운데 정렬 헤더(카테고리 키커, 제목, 작성자 정보, 기본 색상 강조선), 컨테이너 너비의 16:9 히어로, 약 720px 읽기 열의 마크다운 본문, 글 하단의 태그 칩, `"More in {category}"` 관련 게시물 띠, 작성자를 포함한 `BlogPosting` JSON-LD를 갖습니다. 두 페이지 모두 테마 토큰으로만 스타일이 지정되므로 각 교회의 색상 팔레트를 그대로 물려받습니다. 블로그 URL은 교회별 사이트맵에 포함됩니다. B1Admin의 작성 UI(**사이트 → 블로그**)는 대화상자에서 게시물을 편집합니다. 미리보기 전환이 있는 마크다운 편집기, 16:9로 잘린 갤러리 이미지 선택기, 작성자 사람 선택기(기본값은 편집 중인 사용자), 기존 카테고리에서 가져온 카테고리 자동완성, 중복 slug 검증, 게시 토글을 제공합니다. 게시된 행은 실제 게시물로 연결되며, 페이지는 관리자에게 `/blog` 탐색 링크를 추가하라고 안내합니다.

## 회원 전용 페이지

`pages.visibility`는 내비게이션 링크 열거형을 재사용합니다 -- `everyone`(기본값), `visitors`, `members`, `staff`, `team`, `groups`(`groupIds`와 함께). 다만 내비게이션 필터가 아니라 **엄격한 접근 게이트**로 작동합니다(`PageVisibilityHelper.canViewPage`). 흐름은 다음과 같습니다:

1. 익명 트리 엔드포인트는 URL 기반 조회에서 가시성을 확인합니다. 제한된 페이지를 요청한 익명 호출자는 콘텐츠 대신 `{ restricted: true, visibility }`를 받습니다. 트리는 내용을 노출하지 않습니다.
2. 엔드포인트는 여전히 JWT를 존중합니다. `CustomAuthProvider`는 익명 라우트를 포함한 *모든* 요청에서 `Authorization` 헤더를 검증하므로, 인증된 구성원이 같은 URL을 가져오면 정상적으로 처리됩니다.
3. B1App은 `restricted` 응답에 `RestrictedPage`를 렌더링합니다. 저장된 자격 증명에서 세션을 복원하고, JWT로 트리를 다시 가져와 렌더링합니다. 세션이 없으면 `returnUrl`이 있는 로그인 게이트를 보여줍니다.

:::info
게이트의 세분성은 수준마다 다릅니다. `groups`는 토큰의 `groupIds`를 페이지의 목록과 대조하고, `staff`는 `membershipStatus`를 확인합니다. 하지만 `members`와 `team`은 현재 교회의 인증된 모든 사용자를 통과시킵니다. `groups`를 엄격한 옵션으로 취급하십시오.
:::

## SEO 및 검색 노출 {#seo-and-discoverability}

이 모든 것은 ContentApi 데이터를 기반으로 B1App 쪽에서 렌더링합니다. API는 저장하고, 앱은 출력합니다:

| 항목 | 작동 방식 |
|---------|--------------|
| 메타 설명 | `pages.metaDescription`(300자 이하)은 `MetaHelper.getMetaData()`를 거쳐 빌더로 렌더링되는 모든 라우트의 Next.js `Metadata`(description + Open Graph)에 전달됩니다. B1Admin의 페이지 설정에는 AI **Generate** 버튼이 있습니다(아래 참조) |
| 리디렉션 | `/content/redirects`에서 관리되는 교회별 `redirects` 행(`content.edit` 권한, 200행 상한, 정규화된 경로). 404가 될 경로에서 B1App의 페이지 라우트는 `GET /content/redirects/public/:churchId`로 경로를 찾고, Next의 `permanentRedirect`로 HTTP 308을 보냅니다. 일치하지 않는 경로는 `notFound()`로 넘어갑니다 |
| 브랜드 404 | `not-found.tsx`는 일반 오류 대신 교회의 로고, 이름, 테마가 있는 `BrandedNotFound`를 렌더링합니다. 알 수 없는 `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]`, `/volunteer/[planId]` 경로는 실제 404를 반환합니다. 알 수 없는 서브도메인과 잘못된 페이지 slug도 마찬가지입니다([웹사이트 라우팅 및 멀티 사이트](./websites) 참조) |
| 구조화된 데이터 | 블로그 게시물의 `BlogPosting` JSON-LD. 공개 설교별 페이지(`/{sdSlug}/sermons/[sermonId]`)와 `sermons` 요소가 있는 페이지의 `VideoObject`. 빌더 페이지의 캘린더/행사 요소와 각 `/{sdSlug}/events/[eventId]` 페이지에서 나오는 `Event`(다음 발생 건, 행사 사진을 `image`로 사용). `serviceTimes` 요소에서 나오는 schema.org `Event` |
| 설교 페이지 | 모든 공개 설교는 전체 메타데이터가 있는 크롤링 가능한 `/sermons/[sermonId]` 페이지를 가집니다. 설교는 더 이상 클라이언트 측 브라우저 요소 안에 갇혀 있지 않습니다 |
| 분석 | 공개 설정 키 `ga4MeasurementId`(B1Admin에서 리디렉션과 함께 관리)는 `next/script`를 통해 교회별 GA4 gtag를 주입합니다. B1 앱(`/{sdSlug}/mobile`)은 유효한 `G-` ID일 때 ChurchApps 자체 태그와 함께 페이지 조회도 이 ID로 보냅니다(GTM 컨테이너 ID는 웹사이트 전용입니다). 각 `gtag('config')`에는 `navigator.standalone` 또는 `(display-mode: standalone)` 미디어 쿼리를 기준으로 한 `display_mode`(`installed` 또는 `browser`)가 포함됩니다(`B1App/src/helpers/mobileAnalytics.ts`) |
| 사이트맵 및 피드 | 교회별 `sitemap.xml` 라우트에는 빌더 페이지, 블로그 URL, 최근 설교 페이지 50개(각 설교의 게시일로 `<lastmod>` 포함)가 들어갑니다. 내용이 있을 때(공개 그룹, 섬김 신청 계획)는 내장 `/sermons`, `/groups`, `/volunteer` 페이지도 나열하며, 저장된 리디렉션이 해당 경로를 대체하는 경우는 제외합니다. 교회에 홈 페이지가 없으면 `/`는 제외됩니다. 이 경우 `/`는 허용되지 않은 `/mobile`로 리디렉션되기 때문입니다. 블로그 목록은 RSS 피드를 안내합니다 |
| 접근성 | 공개 레이아웃은 모든 레이아웃 래퍼에서 `<main id="main-content">` 랜드마크를 대상으로 하는 건너뛰기 링크를 렌더링합니다 |

## AI 생성 (AskApi)

페이지와 사이트 생성은 `/website` 컨트롤러 아래의 별도 서비스인 **AskApi**에서 실행됩니다. 다른 모든 것과 같은 `CustomAuthProvider` JWT로 인증하며, 콘텐츠에 대해서는 **무상태**입니다. 모든 엔드포인트는 JSON을 반환하고, 호출자(B1Admin)가 결과를 ContentApi를 통해 저장합니다. `POST /content/pages/importTree`는 중첩된 섹션/요소 트리 전체를 가진 페이지를 한 번의 호출로 생성합니다. 이 호출은 항상 호출자의 교회 아래에 삽입하며 본문의 id는 무시합니다.

### 페이지 생성 (`planPage` → `writePage`)

B1Admin의 `AddPageModal`에 있는 "AI" 페이지 템플릿은 하나의 규칙에 기반한 저비용 파이프라인(`AskApi/src/helpers/SiteGenHelper.ts`)을 사용합니다: **어떤 모델도 빌더 JSON을 출력하지 않습니다.** 두 모델이 Vercel AI Gateway를 통해 작업을 나눕니다(일반 HTTP, SSM 키 `/{env}/aiGatewayApiKey` 또는 `AI_GATEWAY_API_KEY`):

- **JEV**(`typesafe-ai/jev`) -- 선택지, 점수, 확률이 있는 불리언을 반환하는 타입 안전 결정 모델입니다. 하지만 텍스트는 쓸 수 없습니다. 고정된 템플릿 라이브러리에서 섹션을 하나씩 고르고, 레이아웃에 점수를 매기고, 문구의 사실 여부를 확인하며, 스톡 사진과 아이콘을 고릅니다. 입력은 백만 토큰당 약 $0.04이고 출력은 무료이므로, 페이지당 약 90번의 호출은 1센트의 일부에 불과합니다.
- **작은 채팅 모델(기본값 GPT-4.1 mini)** -- 선택된 템플릿의 이름이 붙은, 길이가 제한된 텍스트 슬롯을 채웁니다. 작성 모델은 상수 하나이며, `SITEGEN_COPY_MODEL` 환경 변수로 재정의할 수 있습니다(게이트웨이의 어떤 채팅 모델 ID든 가능하며, 예: `anthropic/claude-haiku-4.5`). 세 교회를 대상으로 한 블라인드 비교에서 Claude Haiku 4.5가 약간 더 따뜻하게 읽혔지만, GPT-4.1 mini도 근접했고 약 4배 저렴하고 빨랐기 때문에 기본값으로 선택했습니다. 세 가지 레이아웃을 모두 가진 전체 페이지는 약 1.3센트이며, 그중 약 80%가 작성 모델 비용입니다.

| 단계 | 엔드포인트 | 수행 내용 |
|-------|----------|-------------|
| 1 | `POST /website/planPage` | 페이지 유형(home, visit, about…)을 분류한 뒤, JEV의 라운드별 확률에서 후보 레이아웃 10개를 샘플링합니다(히어로 + 섹션 수 → 각 섹션 → 마무리). 중복을 제거하고, JEV가 각각에 적합성/흐름/공백 점수를 매기며, 상위 3개와 작성 어조, `suggestedStyle`(팔레트 + 글꼴)을 반환합니다. 지금까지 같은 섹션을 공유하는 후보들은 JEV에 동일한 질문을 하므로, 라운드는 접두사 기준으로 메모이즈됩니다. 최고 점수가 6 미만이면 `lowLayoutScore`로 기록되며, 이 로그가 추가할 가치가 있는 템플릿 백로그입니다. 약 2초 |
| 2 | `POST /website/writePage`(후보당 한 번 호출) | 작성 모델이 호출당 두 섹션씩 병렬로 슬롯 문구를 채우고, JEV가 고를 히어로 제목 다섯 개를 반환합니다. JEV가 모든 섹션의 사실 여부를 확인합니다. 실패하거나, 상투적인 표현을 쓰거나, 앞선 섹션을 되풀이하는(공유된 4단어 연속, 코드로 확인) 섹션은 구체적인 이유와 함께 병렬로 다시 작성됩니다. 코드 정리 단계는 교회 사이트의 상투적 문구가 들어간 문장을 제거하며, 교회 자신의 설명이 그 표현을 쓴 경우는 예외입니다. JEV가 사진 주제, 아이콘, 히어로의 모양 구분선을 고르고 결과에 점수를 매깁니다. 저장 가능한 완성된 섹션 트리와 점수를 반환합니다. 약 6–9초 |
| 3 | `POST /content/pages/importTree` | B1Admin은 순위가 가장 높은 레이아웃 하나만 저장합니다(차순위는 저장이 실패할 경우의 대체안입니다). 저장한 뒤 미리보기를 엽니다(저장 후 약 10초) |

각 단계는 별도의 요청이므로, 모든 호출이 API Gateway의 29초 제한 안에 머무릅니다. `SiteGenHelper.buildTree`의 템플릿은 카탈로그의 고정된 섹션 + 요소 트리(`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`)이며, 테마 토큰(`var(--accent)`, `var(--lightAccent)`…)을 참조합니다. 그래서 생성된 페이지는 교회의 기존 외관 설정을 물려받습니다. 섹션 템플릿을 추가하려면 `SECTIONS`에 슬롯 목록을, `buildTree`에 트리를 추가합니다. 단위 테스트는 모든 템플릿을 순회하며 트리를 검증합니다.

**입력.** 문구는 두 가지 출처의 사실만 말할 수 있습니다. 사용자가 입력한 내용과, 계획 전에 B1Admin이 수집하는 기록인 `churchContext.facts`입니다(공개 예배 시간, 공개 그룹 이름, 교회 이름과 주소). 같은 플래그가 데이터 기반 템플릿을 제한합니다. `times`는 교회가 예배 시간을 B1에서 관리하면 실시간 `serviceTimes` 요소를 렌더링하고(그렇지 않으면 입력된 표를 씁니다), `groups`와 `countdown`은 뒷받침할 데이터가 있을 때만 제공됩니다. JEV 호출은 헤지됩니다. 1.5초 후 중복 호출이 발사되고 먼저 도착한 응답을 채택합니다. 게이트웨이가 가끔 멈추지만, 호출 비용은 거의 없기 때문입니다.

**주제 유지.** 사용자의 프롬프트는 교회에 대한 배경이 아니라 *페이지의 주제*입니다. `planPage`는 요청을 `home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`으로 분류합니다. `event`와 `topic` 페이지에는 일반 교회 템플릿(목사 메모, 설교, 사역, 그룹, 지역사회 영향, 주간 시간과 카운트다운, 영상 히어로)이 아예 제공되지 않습니다. 대신 `details`(언제 / 어디서 / 무엇을 가져올지)와 날짜별 `eventCountdown`이 제공됩니다. 두 심사관 모두 주제에 맞는지 점수를 매깁니다. B1Admin은 계획에서 얻은 `pageType`을 각 `writePage` 호출에 전달합니다.

**짧은 요청으로 완전한 페이지 만들기.** 페이지는 중간 섹션 3–6개, 넉넉한 슬롯 길이, 카드 섹션의 소개 문장, 다섯 질문으로 된 FAQ를 가집니다. 보수 단계는 너무 짧게 돌아온 섹션을 확장합니다. 생성은 한 번의 클릭으로 끝나며 후속 질문은 없습니다. 요청이 완전한 페이지에 필요한 평범한 세부 정보(시작 시간, 장소, 준비물, 신청 방법)를 빠뜨렸다면, 작성 모델이 교회가 수정할 수 있는 그럴듯하고 소박한 선택을 채워 넣습니다. 섹션이 병렬로 작성되므로 이런 공백은 `planPage`에서 **한 번** 결정되고(`assumedDetails`, 레이아웃 샘플링과 함께 실행되는 작은 작성 호출 하나), `churchContext.assumedDetails`를 통해 모든 `writePage` 호출에 다시 전달됩니다. 그래서 한 섹션은 5:00이라고 하고 다른 섹션은 5:30이라고 하는 일이 없습니다. JEV는 요청, 교회 기록, 또는 이렇게 결정된 세부 사항과 모순되는 섹션을 수정합니다. 결정된 세부 사항은 UI에 노출되지 않으며, 교회는 다른 페이지와 똑같이 페이지를 검토하고 편집합니다. 어떤 것은 절대 지어내지 않습니다: 사람의 이름, 전화번호, 이메일과 웹 주소, 가격, 통계, 교회의 역사, 사람에게 귀속된 인용문, 그리고 요청이 제공하지 않은 날짜의 요일.

**시각 요소.** 템플릿은 사진이나 아이콘의 이름을 정하지 않습니다. 슬롯을 비워 두며, 하나의 일반 단계(`visualSlots` → `pickVisuals` → `applyVisuals`, `SiteGenHelper`)가 완성된 트리를 순회하며 모든 슬롯을 채웁니다. `auto:photo`로 표시된 섹션 배경이나 갤러리 항목, `auto:icon`, 히어로의 `auto:divider`, 그리고 마커가 전혀 없더라도 `photo`가 비어 있는 모든 `textWithPhoto`, `card`, `image` 요소가 대상입니다. JEV는 옆에 있는 텍스트에서 각각을 고릅니다. 카드의 사진은 그 카드의 제목과 본문에서, 배경은 섹션의 문구에서 고릅니다. 한 페이지에서 같은 주제가 반복되지 않습니다. 따라서 새 템플릿도 사진을 자동으로 얻습니다. 사진은 Pexels 검색 주제이며, `pexels:<term>` 자리표시자로 출력됩니다. B1Admin은 이를 `POST /content/stock/search`를 통해 해석합니다. `resolvesPhotos`를 보내지 않는 클라이언트는 기본 히어로 이미지, 단색 띠, 사진 없는 카드를 받습니다. 의도적으로 인물 사진 주제는 쓰지 않으며, 목사 템플릿에는 사진이 없습니다. 스톡 사진 속 낯선 사람이 실제 사람을 대신하는 일은 없어야 하기 때문입니다. 아직 페이지가 없는 교회의 경우 B1Admin은 `suggestedStyle`을 전역 스타일에 적용합니다. 기존 사이트는 외관을 유지합니다.

### 기타 엔드포인트

:::info
B1Admin의 `SectionToolbar` 재작성 버튼과 페이지 목록의 "Generate Site" 버튼은 클라이언트 측에서 여전히 주석 처리되어 있습니다. 아래의 AskApi 엔드포인트는 여전히 응답하며, 숨겨진 것은 UI뿐입니다.
:::

| 엔드포인트 | 용도 |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | 원래의 두 단계 페이지 흐름입니다(개요를 만든 뒤, 섹션마다 요소 JSON을 내는 LLM 호출 하나). 비용 때문에 B1Admin에서는 `planPage`/`writePage`로 대체되었으며, API 사용자를 위해 유지됩니다 |
| `POST /website/generateSite` | 사이트 전체 생성. **설계상 두 단계입니다**. `planOnly: true` 호출은 다중 페이지 계획만 반환하며(빠른 모델 호출 한 번), 그다음 클라이언트가 전체 콘텐츠를 요청합니다. 모든 요청을 Lambda/API Gateway 시간 제한 안에 유지하기 위해서입니다 |
| `POST /website/rewriteSection` | 구조를 보존하는 재작성입니다. 모델은 텍스트를 담는 답변만 바꿀 수 있습니다. 재귀적인 구조 시그니처(id + 유형 + 순서)를 전후로 비교하며, 불일치하면 손상된 구조 대신 `fallback: true`와 함께 원래 섹션을 반환합니다 |
| `POST /website/generateAltText` | 최대 20개의 이미지 URL에 대한 비전 호출입니다. 간결한 대체 텍스트(125자 이하, "photo of" 접두사 제거)를 반환합니다 |
| `POST /website/generateMetaDescription` | 페이지의 텍스트 내용에서 SEO 메타 설명 하나(155자 이하)를 만듭니다. B1Admin 페이지 설정의 Generate 버튼에 연결되어 있습니다 |

이 엔드포인트들의 프롬프트는 `AskApi/config/instructions/` 아래의 마크다운 파일이며, 모델이 생성하는 요소 카탈로그도 포함됩니다. 두 가지 설계 원칙이 카탈로그를 정확하게 유지합니다. 클라이언트는 모든 요청에 `availableElementTypes`를 전달하며(프롬프트는 이 목록의 유형만 사용할 수 있고, 서버는 전체 집합을 하드코딩하지 않습니다), API의 MCP `describe_page_builder` 도구도 [MCP](../api/mcp)를 통해 작업하는 AI 에이전트를 위해 같은 가이드를 담고 있습니다. 모델은 OpenRouter를 통한 Anthropic Claude입니다. 섹션 콘텐츠에는 3.5 Haiku(지연 시간 때문), 개요, 사이트 계획, 비전에는 3.5 Sonnet을 사용합니다. OpenRouter 키가 설정되지 않은 경우 OpenAI로 대체합니다.

## 대화형 양식

양식(membership 모듈)에 카드 연결형 페이지를 목표로 한 대화형 모드가 추가되었습니다. `forms`의 네 개 열이 이를 제어합니다: `displayMode`(`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **렌더링** -- `displayMode`가 `conversational`이면 apphelper의 `FormSubmissionEdit`가 `ConversationalForm` 컴포넌트(한 번에 질문 하나)로 전환하며, B1App의 양식 페이지는 이 모드를 그대로 전달합니다. 두 경우 모두 제출 페이로드는 같습니다.
- **사람 자동 생성** -- `autoCreatePerson`이 설정된 제출에서 `ConversationalFormHelper.findOrCreatePerson`은 이메일(대소문자 무시)로 중복을 찾습니다. 없으면 `membershipStatus: "Guest"`인 가구와 사람을 만들고, 제출 내용을 그 사람에 연결합니다.
- **후속 이메일** -- 제목과 본문이 설정되면 제출자는 기존 거래 이메일 경로(`TransactionalEmailHelper`)를 통해 템플릿 이메일을 받습니다(`{firstName}` / `{churchName}` 토큰 포함). 알림 요약 경로는 사용하지 않습니다. 두 부수 효과 모두 치명적이지 않습니다. 실패해도 제출 내용은 잃어버리지 않습니다.

이 네 개의 필드는 현재 API로만 설정할 수 있으며, B1Admin 양식 편집기에는 아직 노출되지 않습니다.

## 공개 사이트 캐시

B1App의 공개 렌더링 경로는 교회 태그가 붙은 가져오기를 캐시합니다(운영 환경에서는 `next: { revalidate: 300, tags: [sdSlug] }`, 개발 환경에서는 `0`). 그래서 ContentApi 쓰기 후에도 라이브 페이지가 최대 5분 동안 오래된 상태로 남을 수 있습니다. B1App의 `POST /api/revalidate/{sdSlug}`는 `revalidateTag(sdSlug)`를 호출하며, 이 캐시를 미리 지우는 유일한 방법입니다.

이 캐시에 쓰는 주체는 두 가지입니다:

1. **B1Admin** -- `B1Admin/src/site/siteCache.ts`의 `clearSiteCache()`가 편집기 저장 후 POST합니다. 활성 사이트의 서브도메인을 우선하므로, 보조 사이트는 교회의 기본 태그가 아니라 *그* 태그를 무효화해야 합니다.
2. **Api** -- B1Admin을 거치지 않는 콘텐츠 변경(API 키, MCP, AI)은 콘텐츠 컨트롤러에서 `SiteCacheHelper.bump(churchId)`를 실행합니다. 이 헬퍼는 `SubDomainHelper`로 교회 서브도메인을 확인하고 `{b1AppRoot}/api/revalidate/{sd}`에 POST합니다. 실패는 무시되므로, 도달할 수 없는 B1App이 저장을 실패시키지 않습니다.

캐시를 무효화하는 컨트롤러는 다음과 같습니다: 페이지(저장, 삭제, 복제, 게시, 취소, 게시 취소, AI 임시), 섹션, 요소, 블록, 링크, 전역 스타일, 게시물, 리디렉션. 개발 환경의 `b1AppRoot`는 `http://{subdomain}.localtest.me:3301`이고, 데모/운영 환경은 `https://{subdomain}.b1.church`를 사용합니다.

## 관련 페이지

- [웹사이트 라우팅 및 멀티 사이트](./websites) -- 요청이 교회/사이트로 해석되는 방식과 사용자 지정 도메인 라우팅
- [콘텐츠 엔드포인트](../api/endpoints/content) -- 페이지, 섹션, 요소, 블록, 게시물, 리디렉션, 설정의 전체 REST 표면
- [AppHelper](../shared-libraries/app-helper) -- 렌더러, 레지스트리, 구분선, 위젯을 배포하는 npm 패키지
- [MCP 서버](../api/mcp) -- `describe_page_builder` 가이드 도구 포함
- [페이지 편집기(최종 사용자)](/docs/b1-admin/website/page-editor) -- 직원용 편집기 문서
