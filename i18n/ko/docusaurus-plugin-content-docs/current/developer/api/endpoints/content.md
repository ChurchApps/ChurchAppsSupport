---
title: "콘텐츠 엔드포인트"
---

# 콘텐츠 엔드포인트

<div class="article-intro">

콘텐츠 모듈은 웹사이트 페이지, 섹션, 요소, 블록, 블로그 게시물, 리다이렉트, 설교, 재생 목록, 스트리밍 서비스, 행사, 큐레이션된 달력, 파일, 갤러리, 성경 번역 및 구절 조회, 곡, 편곡, 전역 스타일, 스톡 사진 및 설정을 관리합니다. API에서 가장 큰 모듈이며 모든 ChurchApps 애플리케이션에서 CMS, 미디어/스트리밍, 예배 계획 및 성경 기능을 제공합니다.

</div>

**기본 경로:** `/content`

## 페이지

기본 경로: `/content/pages`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | URL 또는 ID로 전체 페이지 트리(섹션, 요소, 블록)를 로드합니다. URL로 가져올 때 내부 ID를 제거합니다. URL 기반 가져오기는 `pages.visibility`를 적용합니다. 게이트된 페이지는 선택적 JWT가 게이트를 만족하지 않으면 `{ restricted: true, visibility }`를 반환합니다 |
| GET | `/public/:churchId` | Public | — | 공개 페이지(`url`, `title`, `metaDescription`)를 나열합니다. `visibility = everyone`만 |
| GET | `/:id` | JWT | — | ID로 페이지를 가져옵니다 |
| GET | `/` | JWT | — | 교회의 모든 페이지를 나열합니다 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 모든 섹션 및 요소와 함께 페이지를 복제합니다 |
| POST | `/temp/ai` | JWT | Content.Edit | AI가 생성한 페이지를 저장합니다(한 번의 호출에서 페이지, 섹션 및 요소) |
| POST | `/` | JWT | Content.Edit | 페이지를 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 페이지를 삭제합니다 |

### 예: 페이지 트리 로드

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "정보",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "환영합니다" } }
      ]
    }
  ]
}
```

## 섹션

기본 경로: `/content/sections`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 섹션을 가져옵니다 |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | 섹션을 복제하거나 재사용 가능한 블록으로 변환합니다 |
| POST | `/` | JWT | Content.Edit | 섹션을 만들거나 업데이트합니다(일괄). 자동으로 정렬 순서를 업데이트합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 섹션을 삭제합니다(자동으로 정렬 순서를 업데이트함) |

## 요소

기본 경로: `/content/elements`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 요소를 가져옵니다 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 모든 자식과 함께 요소를 복제합니다 |
| POST | `/` | JWT | Content.Edit | 요소를 만들거나 업데이트합니다(일괄). 자동으로 행 열 및 캐러셀 슬라이드를 관리합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 요소를 삭제합니다 |

## 블록

기본 경로: `/content/blocks`

표준 CRUD를 확장합니다(기본 클래스의 GET `/:id`, GET `/`, POST `/`, DELETE `/:id` Content.Edit 권한으로 쓰기).

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 블록을 가져옵니다 |
| GET | `/` | JWT | — | 모든 블록을 나열합니다 |
| GET | `/:churchId/tree/:id` | Public | — | 섹션 및 요소가 있는 전체 블록 트리를 로드합니다 |
| GET | `/blockType/:blockType` | JWT | — | 유형별로 블록을 로드합니다(예: footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | 교회의 바닥글 블록 트리를 로드합니다 |
| POST | `/` | JWT | Content.Edit | 블록을 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 블록을 삭제합니다 |

## 링크

기본 경로: `/content/links`

표준 CRUD를 확장합니다(기본 클래스의 GET `/:id`, GET `/`, POST `/`, DELETE `/:id` Content.Edit 권한으로 쓰기).

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 링크를 가져옵니다 |
| GET | `/` | JWT | — | 모든 링크를 나열합니다. 선택적 `?category=` 필터. 저장 후 자동 정렬 |
| GET | `/church/:churchId/filtered?category=` | JWT | — | 표시(모두, 방문객, 멤버, 직원, 그룹)별로 필터링된 링크를 로드합니다 |
| GET | `/church/:churchId?category=` | Public | — | 카테고리별로 교회의 링크를 로드합니다(공개) |
| POST | `/` | JWT | Content.Edit | 링크를 만들거나 업데이트합니다(일괄). 카테고리별로 자동 정렬 |
| DELETE | `/:id` | JWT | Content.Edit | 링크를 삭제합니다 |

## 전역 스타일

기본 경로: `/content/globalStyles`

표준 CRUD를 확장합니다(기본 클래스의 POST `/`, DELETE `/:id` Content.Edit 권한으로 쓰기).

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | 교회의 전역 스타일을 로드합니다(설정되지 않으면 기본값 반환) |
| GET | `/` | JWT | — | 인증된 교회의 전역 스타일을 로드합니다 |
| POST | `/` | JWT | Content.Edit | 전역 스타일을 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 전역 스타일을 삭제합니다 |

## 페이지 기록

기본 경로: `/content/pageHistory`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | 페이지의 기록 항목을 나열합니다 |
| GET | `/block/:blockId` | JWT | Content.Edit | 블록의 기록 항목을 나열합니다 |
| GET | `/:id` | JWT | Content.Edit | ID로 기록 항목을 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 페이지/블록 스냅샷을 저장합니다. 30일보다 오래된 항목을 주기적으로 정리합니다 |
| POST | `/restore/:id` | JWT | Content.Edit | 기록 스냅샷에서 페이지/블록을 복원합니다(현재 콘텐츠를 삭제하고 스냅샷에서 다시 만들기) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | 인라인 스냅샷 개체에서 복원합니다. 본문: `{ pageId, blockId, snapshot }` |

## 게시물(블로그)

기본 경로: `/content/posts`

블로그 게시물은 일반 페이지에 대한 메타데이터입니다: 각 게시물의 `pageId`는 본문을 보유하는 페이지를 참조하고 게시물 행은 `title`, `slug`(교회당 고유), `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category` 및 `tags`를 추가합니다. 게시물은 `publishDate`가 설정되고 과거일 때 게시됩니다. [웹사이트 빌더 아키텍처](../../architecture/website-builder#blog-posts-over-pages) 참조.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | 게시된 게시물, 페이지 매김을 나열합니다(페이지당 최대 50개) |
| GET | `/public/:churchId/slug/:slug` | Public | — | 슬러그별로 게시된 게시물의 메타데이터를 가져옵니다 |
| GET | `/rss/:churchId?siteUrl=` | Public | — | 게시된 게시물의 RSS 2.0 피드(`{siteUrl}/blog/{slug}`로 만들어진 링크) |
| GET | `/:id` | JWT | — | ID로 게시물을 가져옵니다 |
| GET | `/` | JWT | — | 교회의 모든 게시물을 나열합니다 |
| POST | `/` | JWT | Content.Edit | 게시물을 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 게시물을 삭제합니다 |

## 리다이렉트

기본 경로: `/content/redirects`

교회당 URL 리다이렉트(`fromPath` → `toPath`), 교회당 200개로 제한됩니다. 경로는 정규화되고(소문자, 선행 슬래시, 후행 슬래시 없음) `fromPath`는 교회당 고유합니다. B1App은 404가 될 상황에서 이들을 해결하고 HTTP 308을 발행합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | 경로를 해결합니다(또는 `path`가 생략되면 모든 리다이렉트를 나열) |
| GET | `/:id` | JWT | — | ID로 리다이렉트를 가져옵니다 |
| GET | `/` | JWT | — | 교회의 모든 리다이렉트를 나열합니다 |
| POST | `/` | JWT | Content.Edit | 리다이렉트를 만들거나 업데이트합니다. `fromPath = toPath`를 거부하고 200행 상한을 적용합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 리다이렉트를 삭제합니다 |

## 설교

기본 경로: `/content/sermons`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | 샘플 FreeShow 재생 목록 구조를 가져옵니다 |
| GET | `/public/tvWrapper/:churchId` | JWT | — | 설교, 레슨 및 FreeShow 소스가 있는 TV 앱 래퍼를 가져옵니다 |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | 단일 설교를 TV 피드 재생 목록으로 가져옵니다 |
| GET | `/public/tvFeed/:churchId` | Public | — | 모든 공개 재생 목록/설교를 TV 피드로 가져옵니다 |
| GET | `/public/:churchId` | Public | — | 교회의 모든 공개 설교를 나열합니다 |
| GET | `/timeline?sermonIds=` | JWT | — | 설교의 타임라인 데이터를 로드합니다 |
| GET | `/lookup?videoType=&videoData=` | Public | — | YouTube 또는 Vimeo에서 설교 메타데이터를 조회합니다 |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | 설교 자막에서 AI 소셜 미디어 게시물 제안을 생성합니다 |
| GET | `/outline?url=&title=&author=` | JWT | — | URL에서 AI 레슨 개요를 생성합니다 |
| GET | `/youtubeImport/:channelId` | JWT | — | YouTube 채널에서 비디오를 가져옵니다 |
| GET | `/vimeoImport/:channelId` | JWT | — | Vimeo 채널에서 비디오를 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 설교를 가져옵니다 |
| GET | `/` | JWT | — | 모든 설교를 나열합니다 |
| POST | `/` | JWT | StreamingServices.Edit | 설교를 만들거나 업데이트합니다(일괄, base64 썸네일 업로드 지원) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 설교를 삭제합니다 |

### 예: YouTube 설교 조회

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "일요일 예배 - 행동의 믿음",
  "description": "목사 John이 믿음에 대해 이야기합니다...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## 재생 목록

기본 경로: `/content/playlists`

표준 CRUD를 확장합니다(기본 클래스의 GET `/:id`, GET `/`, DELETE `/:id` StreamingServices.Edit 권한으로 쓰기).

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 재생 목록을 가져옵니다 |
| GET | `/` | JWT | — | 모든 재생 목록을 나열합니다 |
| GET | `/public/:churchId` | Public | — | 교회의 모든 공개 재생 목록을 나열합니다 |
| POST | `/` | JWT | StreamingServices.Edit | 재생 목록을 만들거나 업데이트합니다(일괄, base64 썸네일 업로드 지원) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 재생 목록을 삭제합니다 |

## 스트리밍 서비스

기본 경로: `/content/streamingServices`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | 서비스에 대한 암호화된 호스트 채팅방 ID를 가져옵니다 |
| GET | `/` | JWT | — | 모든 스트리밍 서비스를 나열합니다. 만료된 비반복 서비스를 자동으로 정리하고 반복 서비스를 진행합니다 |
| POST | `/` | JWT | StreamingServices.Edit | 스트리밍 서비스를 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 스트리밍 서비스를 삭제합니다(또한 차단된 IP를 지웁니다) |

## 행사

기본 경로: `/content/events`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | 그룹의 타임라인 이벤트를 로드합니다 |
| GET | `/timeline?eventIds=` | JWT | — | 현재 사용자 그룹의 타임라인 이벤트를 로드합니다 |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | 이벤트를 ICS 달력 피드로 구독합니다 |
| GET | `/group/:groupId` | JWT | — | 그룹의 이벤트를 가져옵니다(예외 날짜 포함) |
| GET | `/public/group/:churchId/:groupId` | Public | — | 그룹의 공개 이벤트를 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 이벤트를 가져옵니다 |
| POST | `/` | JWT | — | 이벤트를 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 이벤트를 삭제합니다 |

## 이벤트 예외

기본 경로: `/content/eventExceptions`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 이벤트 예외를 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 이벤트 예외를 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 이벤트 예외를 삭제합니다 |

## 큐레이션된 달력

기본 경로: `/content/curatedCalendars`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 큐레이션된 달력을 가져옵니다 |
| GET | `/` | JWT | — | 모든 큐레이션된 달력을 나열합니다 |
| POST | `/` | JWT | Content.Edit | 큐레이션된 달력을 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 큐레이션된 달력을 삭제합니다 |

## 큐레이션된 이벤트

기본 경로: `/content/curatedEvents`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | 달력의 큐레이션된 이벤트를 가져옵니다(`?withoutEvents`가 설정되지 않으면 이벤트 세부 정보 및 예외 날짜 포함) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | 달력의 공개 큐레이션된 이벤트를 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 큐레이션된 이벤트를 가져옵니다 |
| GET | `/` | JWT | — | 모든 큐레이션된 이벤트를 나열합니다 |
| POST | `/` | JWT | Content.Edit | 큐레이션된 이벤트를 만들거나 업데이트합니다. 특정 그룹 이벤트를 추가하기 위해 `eventIds` 배열을 지원합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 큐레이션된 이벤트를 삭제합니다 |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | 큐레이션된 달력에서 특정 이벤트를 제거합니다 |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | 큐레이션된 달력에서 그룹의 모든 이벤트를 제거합니다 |

## 파일

기본 경로: `/content/files`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | 콘텐츠 유형 및 콘텐츠 ID별로 파일을 가져옵니다 |
| GET | `/` | JWT | — | 교회 웹사이트의 모든 파일을 나열합니다 |
| GET | `/:id` | JWT | — | ID로 파일을 가져옵니다 |
| POST | `/` | JWT | Content.Edit* | 파일을 업로드합니다(base64). *`contentId`와 일치하는 그룹의 멤버인 경우에도 허용됨 |
| POST | `/postUrl` | JWT | Content.Edit* | 사전 서명된 S3 업로드 URL을 가져옵니다. *그룹 멤버도 허용됨. 콘텐츠 항목당 최대 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | 파일을 삭제하고 스토리지에서 제거합니다. *그룹 멤버도 허용됨 |

## 갤러리

기본 경로: `/content/gallery`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | 폴더의 스톡 사진을 나열합니다 |
| GET | `/:folder` | JWT | Content.Edit | 폴더의 갤러리 이미지를 나열합니다 |
| POST | `/requestUpload` | JWT | Content.Edit | 갤러리 이미지용 사전 서명된 S3 업로드 URL을 가져옵니다 |
| DELETE | `/:folder/:image` | JWT | Content.Edit | 갤러리 이미지를 삭제합니다 |

## 성경

기본 경로: `/content/bibles`

모든 성경 끝점은 공개입니다(인증 필요 없음). 데이터는 외부 소스에서 가져와지고 로컬로 캐시됩니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | 모든 성경 번역을 나열합니다(캐시가 비어있으면 소스에서 가져옴) |
| GET | `/stats?startDate=&endDate=` | Public | — | 날짜 범위에 대한 성경 조회 통계를 가져옵니다 |
| GET | `/availableTranslations/:source` | Public | — | 소스의 사용 가능한 번역을 나열합니다(예: api.bible) |
| GET | `/updateTranslations` | Public | — | 모든 소스의 모든 번역을 동기화합니다 |
| GET | `/updateTranslations/:source` | Public | — | 특정 소스의 번역을 동기화합니다 |
| GET | `/updateCopyrights` | Public | — | 저작권 정보가 누락된 번역에 대해 저작권 정보를 업데이트합니다 |
| GET | `/:translationKey/updateCopyright` | Public | — | 특정 번역의 저작권을 업데이트합니다 |
| GET | `/:translationKey/search?query=&limit=` | Public | — | 번역에서 구절을 검색합니다 |
| GET | `/:translationKey/books` | Public | — | 번역의 책을 가져옵니다(로컬로 캐시) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | 책의 장을 가져옵니다(로컬로 캐시) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | 장의 구절을 가져옵니다(로컬로 캐시) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | 범위의 구절 텍스트를 가져옵니다. 조회를 로그합니다. 일부 번역은 라이센싱을 위해 캐싱을 우회합니다 |

### 예: 구절 텍스트 가져오기

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "태초에 하나님이 천지를 창조하셨다.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "땅은 혼돈하고 공허하며...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "하나님이 이르시되 빛이 있으라 하시니 빛이 있었고", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## 곡

기본 경로: `/content/songs`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | 쿼리로 곡을 검색합니다 |
| GET | `/:id` | JWT | — | ID로 곡을 가져옵니다 |
| GET | `/` | JWT | Content.Edit | 모든 곡을 나열합니다 |
| POST | `/` | JWT | Content.Edit | 곡을 만들거나 업데이트합니다(일괄) |
| POST | `/import` | JWT | — | FreeShow에서 곡을 가져옵니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 곡을 삭제합니다 |

## 곡 세부 정보

기본 경로: `/content/songDetails`

곡 세부 정보는 전역입니다(교회 범위가 아님). 이들은 교회에서 공유하는 정규 곡 메타데이터를 나타냅니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 곡 세부 정보를 가져옵니다(전역) |
| GET | `/` | JWT | — | 교회의 곡 세부 정보를 나열합니다 |
| POST | `/create` | JWT | — | PraiseCharts ID에서 곡 세부 정보를 만듭니다(이미 만들어진 경우 기존 반환). PraiseCharts 및 MusicBrainz에서 자동으로 메타데이터를 가져옵니다 |
| POST | `/` | JWT | — | 곡 세부 정보를 만들거나 업데이트합니다(일괄) |

## 곡 세부 정보 링크

기본 경로: `/content/songDetailLinks`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 곡 세부 정보 링크를 가져옵니다 |
| GET | `/songDetail/:songDetailId` | JWT | — | 곡 세부 정보의 모든 링크를 가져옵니다 |
| POST | `/` | JWT | — | 곡 세부 정보 링크를 만들거나 업데이트합니다(일괄). 연결된 경우 MusicBrainz 데이터를 자동으로 가져옵니다 |
| DELETE | `/:id` | JWT | — | 곡 세부 정보 링크를 삭제합니다 |

## 편곡

기본 경로: `/content/arrangements`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 편곡을 가져옵니다 |
| GET | `/song/:songId` | JWT | Content.Edit | 곡의 편곡을 가져옵니다 |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | 곡 세부 정보의 편곡을 가져옵니다 |
| GET | `/` | JWT | Content.Edit | 모든 편곡을 나열합니다 |
| POST | `/` | JWT | Content.Edit | 편곡을 만들거나 업데이트합니다(일괄) |
| POST | `/freeShow/missing` | JWT | — | 교회에 없는 FreeShow ID를 찾습니다. 본문: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | 편곡을 삭제합니다(또한 키를 삭제함; 편곡이 남지 않으면 곡을 삭제함) |

## 편곡 키

기본 경로: `/content/arrangementKeys`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | 발표자 보기를 위한 전체 곡 데이터가 있는 편곡 키를 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 편곡 키를 가져옵니다 |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | 편곡의 키를 가져옵니다 |
| GET | `/` | JWT | Content.Edit | 모든 편곡 키를 나열합니다 |
| POST | `/` | JWT | Content.Edit | 편곡 키를 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 편곡 키를 삭제합니다 |

## 설정

기본 경로: `/content/settings`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 현재 사용자의 설정을 가져옵니다 |
| GET | `/` | JWT | Settings.Edit | 교회의 모든 설정을 가져옵니다 |
| GET | `/public/:churchId` | Public | — | 교회의 공개 설정을 가져옵니다(키-값 쌍으로 반환됨) |
| POST | `/my` | JWT | — | 사용자 수준 설정을 저장합니다(base64 이미지 업로드 지원) |
| POST | `/` | JWT | Settings.Edit | 교회 수준 설정을 저장합니다(base64 이미지 업로드 지원) |
| DELETE | `/my/:id` | JWT | — | 사용자 설정을 삭제합니다 |

## 미리보기

기본 경로: `/content/preview`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | 도메인 이름 키로 교회의 스트리밍 미리보기 데이터를 로드합니다(탭, 링크, 예배, 설교) |

## 갤러리(스톡 사진)

기본 경로: `/content/stock`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Pexels 스톡 사진을 검색합니다. 본문: `{ term: "church" }` |

## PraiseCharts

기본 경로: `/content/praiseCharts`

PraiseCharts와의 통합으로 예배 곡 발견 및 악보 다운로드를 제공합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | 곡의 원본 PraiseCharts 데이터를 가져옵니다 |
| GET | `/hasAccount` | JWT | — | 사용자가 연결된 PraiseCharts 계정을 가지고 있는지 확인합니다 |
| GET | `/search?q=` | JWT | — | PraiseCharts 카탈로그를 검색합니다 |
| GET | `/products/:id?keys=` | JWT | — | 곡의 제품을 가져옵니다(인증된 경우 라이브러리에서 가져옴, 그렇지 않으면 카탈로그) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | 라이브러리에서 원본 편곡 데이터를 가져옵니다 |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | PraiseCharts에서 파일을 다운로드합니다(PDF 또는 ZIP). `{ redirectUrl }` 반환 |
| GET | `/authUrl?returnUrl=` | Public | — | PraiseCharts에 대한 OAuth 권한 부여 URL을 가져옵니다 |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth 검증자를 액세스 토큰으로 교환하고 사용자 설정에 저장합니다 |
| GET | `/library` | JWT | — | 사용자의 PraiseCharts 라이브러리를 찾아봅니다 |

## 지원

기본 경로: `/content/support`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | AWS Polly를 사용하여 SSML을 MP3 오디오로 변환합니다. 본문: `{ ssml: "<speak>...</speak>" }` |

## 관련 페이지

- [웹사이트 빌더 아키텍처](../../architecture/website-builder) -- 페이지, 섹션, 요소, 게시물 및 리다이렉트가 모든 앱에 걸쳐 어떻게 적응하는지
- [멤버십 엔드포인트](./membership) — 사람, 교회, 그룹, 역할, 권한
- [출석 엔드포인트](./attendance) -- 예배 및 방문 추적
- [인증 & 권한](./authentication) -- 로그인 흐름, JWT, 권한 모델
- [모듈 구조](../module-structure) -- 코드 구성 패턴
