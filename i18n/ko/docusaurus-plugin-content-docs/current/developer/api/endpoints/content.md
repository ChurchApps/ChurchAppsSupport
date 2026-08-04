---
title: "콘텐츠 엔드포인트"
---

# 콘텐츠 엔드포인트

<div class="article-intro">

Content 모듈은 웹사이트 페이지, 섹션, 요소, 블록, 블로그 게시물, 리다이렉트, 설교, 재생목록, 스트리밍 서비스, 이벤트, 큐레이션된 캘린더, 파일, 갤러리, 성경 번역본 및 구절 조회, 곡, 편곡, 전역 스타일, 스톡 사진, 설정을 관리합니다. API에서 가장 규모가 큰 모듈로서 모든 ChurchApps 애플리케이션에서 CMS, 미디어/스트리밍, 예배 기획, 성경 기능을 지원합니다.

</div>

**기본 경로:** `/content`

## Pages

기본 경로: `/content/pages`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | URL 또는 ID로 전체 페이지 트리(섹션, 요소, 블록)를 가져옵니다. URL로 가져올 경우 내부 ID를 제거합니다. URL 기반 조회는 `pages.visibility`를 적용합니다 -- 게이트가 설정된 페이지는 (선택적) JWT가 게이트 조건을 충족하지 않으면 `{ restricted: true, visibility }`를 반환합니다 |
| GET | `/public/:churchId` | Public | — | 공개 페이지 목록(`url`, `title`, `metaDescription`)을 가져옵니다. `visibility = everyone`인 경우만 해당됩니다 |
| GET | `/:id` | JWT | — | ID로 페이지를 가져옵니다 |
| GET | `/` | JWT | — | 교회의 모든 페이지 목록을 가져옵니다 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 모든 섹션 및 요소를 포함해 페이지를 복제합니다 |
| POST | `/temp/ai` | JWT | Content.Edit | AI로 생성된 페이지를 저장합니다(페이지, 섹션, 요소를 한 번에 호출) |
| POST | `/` | JWT | Content.Edit | 페이지를 생성하거나 업데이트합니다(일괄 처리) |
| DELETE | `/:id` | JWT | Content.Edit | 페이지를 삭제합니다 |

### 예시: 페이지 트리 가져오기

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Sections

기본 경로: `/content/sections`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 섹션을 가져옵니다 |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | 섹션을 복제하거나 재사용 가능한 블록으로 변환합니다 |
| POST | `/` | JWT | Content.Edit | 섹션을 생성하거나 업데이트합니다(일괄 처리). 정렬 순서를 자동으로 업데이트합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 섹션을 삭제합니다(정렬 순서 자동 업데이트) |

## Elements

기본 경로: `/content/elements`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 요소를 가져옵니다 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 모든 하위 요소를 포함해 요소를 복제합니다 |
| POST | `/` | JWT | Content.Edit | 요소를 생성하거나 업데이트합니다(일괄 처리). 행 열과 캐러셀 슬라이드를 자동으로 관리합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 요소를 삭제합니다 |

## Blocks

기본 경로: `/content/blocks`

표준 CRUD를 확장합니다(쓰기 작업에는 Content.Edit 권한이 필요한 기본 클래스의 GET `/:id`, GET `/`, POST `/`, DELETE `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 블록을 가져옵니다 |
| GET | `/` | JWT | — | 모든 블록 목록을 가져옵니다 |
| GET | `/:churchId/tree/:id` | Public | — | 섹션과 요소를 포함한 전체 블록 트리를 가져옵니다 |
| GET | `/blockType/:blockType` | JWT | — | 유형별 블록을 가져옵니다(예: footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | 교회의 푸터 블록 트리를 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 블록을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 블록을 삭제합니다 |

## Links

기본 경로: `/content/links`

표준 CRUD를 확장합니다(쓰기 작업에는 Content.Edit 권한이 필요한 기본 클래스의 GET `/:id`, GET `/`, POST `/`, DELETE `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 링크를 가져옵니다 |
| GET | `/` | JWT | — | 모든 링크 목록을 가져옵니다. 선택적으로 `?category=` 필터를 사용할 수 있습니다. 저장 후 자동 정렬됩니다 |
| GET | `/church/:churchId/filtered?category=` | JWT | — | 공개 범위(everyone, visitors, members, staff, groups)로 필터링된 링크를 가져옵니다 |
| GET | `/church/:churchId?category=` | Public | — | 교회의 카테고리별 링크를 가져옵니다(공개) |
| POST | `/` | JWT | Content.Edit | 링크를 생성하거나 업데이트합니다(일괄 처리). 카테고리별로 자동 정렬됩니다 |
| DELETE | `/:id` | JWT | Content.Edit | 링크를 삭제합니다 |

## Global Styles

기본 경로: `/content/globalStyles`

표준 CRUD를 확장합니다(쓰기 작업에는 Content.Edit 권한이 필요한 기본 클래스의 POST `/`, DELETE `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | 교회의 전역 스타일을 가져옵니다(설정된 값이 없으면 기본값 반환) |
| GET | `/` | JWT | — | 인증된 교회의 전역 스타일을 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 전역 스타일을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 전역 스타일을 삭제합니다 |

## Page History

기본 경로: `/content/pageHistory`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | 페이지의 기록 항목 목록을 가져옵니다 |
| GET | `/block/:blockId` | JWT | Content.Edit | 블록의 기록 항목 목록을 가져옵니다 |
| GET | `/:id` | JWT | Content.Edit | ID로 기록 항목을 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 페이지/블록 스냅샷을 저장합니다. 30일이 지난 항목을 주기적으로 정리합니다 |
| POST | `/restore/:id` | JWT | Content.Edit | 기록 스냅샷으로부터 페이지/블록을 복원합니다(현재 콘텐츠를 삭제하고 스냅샷으로부터 다시 생성) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | 인라인 스냅샷 객체로부터 복원합니다. 본문: `{ pageId, blockId, snapshot }` |

## Posts (블로그)

기본 경로: `/content/posts`

블로그 게시물은 독립적인 레코드입니다: `title`, `slug`(교회별 고유), `excerpt`, `content`(마크다운 본문), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`로 구성됩니다. 게시물은 `publishDate`가 설정되어 있고 이미 지난 시점이면 게시된 것으로 처리됩니다. 조회 엔드포인트는 각 게시물에 `authorId`로 조회된 `authorName`을 추가합니다. [웹사이트 빌더 아키텍처](../../architecture/website-builder#blog)를 참조하세요.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | 게시된 게시물을 페이지 단위로 가져옵니다(페이지당 최대 50개) |
| GET | `/public/:churchId/categories` | Public | — | 게시된 게시물 전체의 고유 카테고리 목록을 가져옵니다 |
| GET | `/public/:churchId/slug/:slug` | Public | — | 슬러그로 게시된 게시물을 가져옵니다 |
| GET | `/rss/:churchId?siteUrl=` | Public | — | 게시된 게시물의 RSS 2.0 피드를 가져옵니다(링크는 `{siteUrl}/blog/{slug}` 형식으로 생성) |
| GET | `/:id` | JWT | — | ID로 게시물을 가져옵니다 |
| GET | `/` | JWT | — | 교회의 모든 게시물 목록을 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 게시물을 생성하거나 업데이트합니다(일괄 처리) |
| DELETE | `/:id` | JWT | Content.Edit | 게시물을 삭제합니다 |

## Redirects

기본 경로: `/content/redirects`

교회별 URL 리다이렉트(`fromPath` → `toPath`)이며, 교회당 최대 200개로 제한됩니다. 경로는 정규화되며(소문자화, 앞에 슬래시 포함, 끝에 슬래시 없음) `fromPath`는 교회별로 고유해야 합니다. B1App은 404가 발생할 위치에서 이를 확인해 HTTP 308을 반환합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | 경로를 확인합니다(`path`를 생략하면 모든 리다이렉트 목록을 반환) |
| GET | `/:id` | JWT | — | ID로 리다이렉트를 가져옵니다 |
| GET | `/` | JWT | — | 교회의 모든 리다이렉트 목록을 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 리다이렉트를 생성하거나 업데이트합니다. `fromPath = toPath`인 경우 거부하며 200개 제한을 적용합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 리다이렉트를 삭제합니다 |

## Sermons

기본 경로: `/content/sermons`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | 샘플 FreeShow 재생목록 구조를 가져옵니다 |
| GET | `/public/tvWrapper/:churchId` | JWT | — | 설교, 레슨, FreeShow 소스가 포함된 TV 앱 래퍼를 가져옵니다 |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | 단일 설교를 TV 피드 재생목록으로 가져옵니다 |
| GET | `/public/tvFeed/:churchId` | Public | — | 모든 공개 재생목록/설교를 TV 피드로 가져옵니다 |
| GET | `/public/:churchId` | Public | — | 교회의 모든 공개 설교 목록을 가져옵니다 |
| GET | `/timeline?sermonIds=` | JWT | — | 설교의 타임라인 데이터를 가져옵니다 |
| GET | `/lookup?videoType=&videoData=` | Public | — | YouTube 또는 Vimeo에서 설교 메타데이터를 조회합니다 |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | 설교 자막으로부터 AI 소셜 미디어 게시물 제안을 생성합니다 |
| GET | `/outline?url=&title=&author=` | JWT | — | URL로부터 AI 레슨 개요를 생성합니다 |
| GET | `/youtubeImport/:channelId` | JWT | — | YouTube 채널에서 영상을 가져옵니다 |
| GET | `/vimeoImport/:channelId` | JWT | — | Vimeo 채널에서 영상을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 설교를 가져옵니다 |
| GET | `/` | JWT | — | 모든 설교 목록을 가져옵니다 |
| POST | `/` | JWT | StreamingServices.Edit | 설교를 생성하거나 업데이트합니다(일괄 처리, base64 썸네일 업로드 지원) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 설교를 삭제합니다 |

### 예시: YouTube 설교 조회

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Playlists

기본 경로: `/content/playlists`

표준 CRUD를 확장합니다(쓰기 작업에는 StreamingServices.Edit 권한이 필요한 기본 클래스의 GET `/:id`, GET `/`, DELETE `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 재생목록을 가져옵니다 |
| GET | `/` | JWT | — | 모든 재생목록을 가져옵니다 |
| GET | `/public/:churchId` | Public | — | 교회의 모든 공개 재생목록을 가져옵니다 |
| POST | `/` | JWT | StreamingServices.Edit | 재생목록을 생성하거나 업데이트합니다(일괄 처리, base64 썸네일 업로드 지원) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 재생목록을 삭제합니다 |

## Streaming Services

기본 경로: `/content/streamingServices`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | 서비스의 암호화된 호스트 채팅방 ID를 가져옵니다 |
| GET | `/` | JWT | — | 모든 스트리밍 서비스 목록을 가져옵니다. 만료된 비반복 서비스는 자동 정리되고 반복 서비스는 자동으로 진행됩니다 |
| POST | `/` | JWT | StreamingServices.Edit | 스트리밍 서비스를 생성하거나 업데이트합니다(일괄 처리) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 스트리밍 서비스를 삭제합니다(차단된 IP도 함께 정리) |

## Events

기본 경로: `/content/events`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | 그룹의 타임라인 이벤트를 가져옵니다 |
| GET | `/timeline?eventIds=` | JWT | — | 현재 사용자 그룹의 타임라인 이벤트를 가져옵니다 |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | ICS 캘린더 피드로 이벤트를 구독합니다 |
| GET | `/group/:groupId` | JWT | — | 그룹의 이벤트를 가져옵니다(예외 날짜 포함) |
| GET | `/public/group/:churchId/:groupId` | Public | — | 그룹의 공개 이벤트를 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 이벤트를 가져옵니다 |
| POST | `/` | JWT | — | 이벤트를 생성하거나 업데이트합니다(일괄 처리) |
| DELETE | `/:id` | JWT | Content.Edit | 이벤트를 삭제합니다 |

## Event Exceptions

기본 경로: `/content/eventExceptions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 이벤트 예외를 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 이벤트 예외를 생성하거나 업데이트합니다(일괄 처리) |
| DELETE | `/:id` | JWT | Content.Edit | 이벤트 예외를 삭제합니다 |

## Curated Calendars

기본 경로: `/content/curatedCalendars`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 큐레이션된 캘린더를 가져옵니다 |
| GET | `/` | JWT | — | 모든 큐레이션된 캘린더 목록을 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 큐레이션된 캘린더를 생성하거나 업데이트합니다(일괄 처리) |
| DELETE | `/:id` | JWT | Content.Edit | 큐레이션된 캘린더를 삭제합니다 |

## Curated Events

기본 경로: `/content/curatedEvents`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | 캘린더의 큐레이션된 이벤트를 가져옵니다(`?withoutEvents`가 없으면 이벤트 세부 정보와 예외 날짜 포함) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | 캘린더의 공개 큐레이션된 이벤트를 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 큐레이션된 이벤트를 가져옵니다 |
| GET | `/` | JWT | — | 모든 큐레이션된 이벤트 목록을 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 큐레이션된 이벤트를 생성하거나 업데이트합니다. 특정 그룹 이벤트를 추가하는 `eventIds` 배열을 지원합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 큐레이션된 이벤트를 삭제합니다 |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | 큐레이션된 캘린더에서 특정 이벤트를 제거합니다 |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | 큐레이션된 캘린더에서 그룹의 모든 이벤트를 제거합니다 |

## Files

기본 경로: `/content/files`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | 콘텐츠 유형 및 콘텐츠 ID로 파일을 가져옵니다 |
| GET | `/` | JWT | — | 교회 웹사이트의 모든 파일 목록을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 파일을 가져옵니다 |
| POST | `/` | JWT | Content.Edit* | 파일을 업로드합니다(base64). *`contentId`와 일치하는 그룹의 구성원인 경우에도 허용됩니다 |
| POST | `/postUrl` | JWT | Content.Edit* | 사전 서명된 S3 업로드 URL을 가져옵니다. *그룹 구성원에게도 허용됩니다. 콘텐츠 항목당 최대 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | 파일을 삭제하고 스토리지에서 제거합니다. *그룹 구성원에게도 허용됩니다 |

## Gallery

기본 경로: `/content/gallery`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | 폴더 내 스톡 사진 목록을 가져옵니다 |
| GET | `/:folder` | JWT | Content.Edit | 폴더 내 갤러리 이미지 목록을 가져옵니다 |
| POST | `/requestUpload` | JWT | Content.Edit | 갤러리 이미지용 사전 서명된 S3 업로드 URL을 가져옵니다 |
| DELETE | `/:folder/:image` | JWT | Content.Edit | 갤러리 이미지를 삭제합니다 |

## Bibles

기본 경로: `/content/bibles`

모든 성경 엔드포인트는 공개이며 인증이 필요하지 않습니다. 데이터는 외부 소스에서 가져와 로컬에 캐시됩니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | 모든 성경 번역본 목록을 가져옵니다(캐시가 비어 있으면 소스에서 가져옴) |
| GET | `/stats?startDate=&endDate=` | Public | — | 날짜 범위에 대한 성경 조회 통계를 가져옵니다 |
| GET | `/availableTranslations/:source` | Public | — | 소스에서 사용 가능한 번역본 목록을 가져옵니다(예: api.bible) |
| GET | `/updateTranslations` | Public | — | 모든 소스의 번역본을 동기화합니다 |
| GET | `/updateTranslations/:source` | Public | — | 특정 소스의 번역본을 동기화합니다 |
| GET | `/updateCopyrights` | Public | — | 저작권 정보가 누락된 번역본의 저작권 정보를 업데이트합니다 |
| GET | `/:translationKey/updateCopyright` | Public | — | 특정 번역본의 저작권 정보를 업데이트합니다 |
| GET | `/:translationKey/search?query=&limit=` | Public | — | 번역본에서 구절을 검색합니다 |
| GET | `/:translationKey/books` | Public | — | 번역본의 성경책 목록을 가져옵니다(로컬 캐시) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | 성경책의 장 목록을 가져옵니다(로컬 캐시) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | 장의 구절 목록을 가져옵니다(로컬 캐시) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | 범위 내 구절 텍스트를 가져옵니다. 조회 내역을 기록합니다. 일부 번역본은 라이선스 문제로 캐싱을 우회합니다 |

### 예시: 구절 텍스트 가져오기

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Songs

기본 경로: `/content/songs`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | 쿼리로 곡을 검색합니다 |
| GET | `/:id` | JWT | — | ID로 곡을 가져옵니다 |
| GET | `/` | JWT | Content.Edit | 모든 곡 목록을 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 곡을 생성하거나 업데이트합니다(일괄 처리) |
| POST | `/import` | JWT | — | FreeShow에서 곡을 가져옵니다(일괄 처리) |
| DELETE | `/:id` | JWT | Content.Edit | 곡을 삭제합니다 |

## Song Details

기본 경로: `/content/songDetails`

곡 세부 정보는 전역(global) 데이터입니다(교회별 범위가 아님). 여러 교회가 공유하는 표준 곡 메타데이터를 나타냅니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 곡 세부 정보를 가져옵니다(전역) |
| GET | `/` | JWT | — | 교회의 곡 세부 정보 목록을 가져옵니다 |
| POST | `/create` | JWT | — | PraiseCharts ID로부터 곡 세부 정보를 생성합니다(이미 생성된 경우 기존 데이터 반환). PraiseCharts 및 MusicBrainz에서 메타데이터를 자동으로 가져옵니다 |
| POST | `/` | JWT | — | 곡 세부 정보를 생성하거나 업데이트합니다(일괄 처리) |

## Song Detail Links

기본 경로: `/content/songDetailLinks`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 곡 세부 정보 링크를 가져옵니다 |
| GET | `/songDetail/:songDetailId` | JWT | — | 곡 세부 정보의 모든 링크를 가져옵니다 |
| POST | `/` | JWT | — | 곡 세부 정보 링크를 생성하거나 업데이트합니다(일괄 처리). 연결된 경우 MusicBrainz 데이터를 자동으로 가져옵니다 |
| DELETE | `/:id` | JWT | — | 곡 세부 정보 링크를 삭제합니다 |

## Arrangements

기본 경로: `/content/arrangements`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 편곡을 가져옵니다 |
| GET | `/song/:songId` | JWT | Content.Edit | 곡의 편곡 목록을 가져옵니다 |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | 곡 세부 정보의 편곡 목록을 가져옵니다 |
| GET | `/` | JWT | Content.Edit | 모든 편곡 목록을 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 편곡을 생성하거나 업데이트합니다(일괄 처리) |
| POST | `/freeShow/missing` | JWT | — | 교회에 존재하지 않는 FreeShow ID를 찾습니다. 본문: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | 편곡을 삭제합니다(관련 키도 함께 삭제되며, 남은 편곡이 없으면 곡도 삭제) |

## Arrangement Keys

기본 경로: `/content/arrangementKeys`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | 프리젠터 화면용 전체 곡 데이터가 포함된 편곡 키를 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 편곡 키를 가져옵니다 |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | 편곡의 키 목록을 가져옵니다 |
| GET | `/` | JWT | Content.Edit | 모든 편곡 키 목록을 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 편곡 키를 생성하거나 업데이트합니다(일괄 처리) |
| DELETE | `/:id` | JWT | Content.Edit | 편곡 키를 삭제합니다 |

## Settings

기본 경로: `/content/settings`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 현재 사용자의 설정을 가져옵니다 |
| GET | `/` | JWT | Settings.Edit | 교회의 모든 설정을 가져옵니다 |
| GET | `/public/:churchId` | Public | — | 교회의 공개 설정을 가져옵니다(키-값 쌍으로 반환) |
| POST | `/my` | JWT | — | 사용자 수준 설정을 저장합니다(base64 이미지 업로드 지원) |
| POST | `/` | JWT | Settings.Edit | 교회 수준 설정을 저장합니다(base64 이미지 업로드 지원) |
| DELETE | `/my/:id` | JWT | — | 사용자 설정을 삭제합니다 |

## Preview

기본 경로: `/content/preview`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | 서브도메인 키로 교회의 스트리밍 미리보기 데이터를 가져옵니다(탭, 링크, 예배, 설교) |

## Gallery (Stock Photos)

기본 경로: `/content/stock`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Pexels 스톡 사진을 검색합니다. 본문: `{ term: "church" }` |

## PraiseCharts

기본 경로: `/content/praiseCharts`

예배 곡 검색과 악보 다운로드를 위한 PraiseCharts 연동입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | 곡의 원본 PraiseCharts 데이터를 가져옵니다 |
| GET | `/hasAccount` | JWT | — | 사용자가 연결된 PraiseCharts 계정을 가지고 있는지 확인합니다 |
| GET | `/search?q=` | JWT | — | PraiseCharts 카탈로그를 검색합니다 |
| GET | `/products/:id?keys=` | JWT | — | 곡의 상품 정보를 가져옵니다(인증된 경우 라이브러리에서, 아니면 카탈로그에서) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | 라이브러리에서 원본 편곡 데이터를 가져옵니다 |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | PraiseCharts에서 파일을 다운로드합니다(PDF 또는 ZIP). `{ redirectUrl }`을 반환합니다 |
| GET | `/authUrl?returnUrl=` | Public | — | PraiseCharts용 OAuth 인증 URL을 가져옵니다 |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth verifier를 액세스 토큰으로 교환하여 사용자 설정에 저장합니다 |
| GET | `/library` | JWT | — | 사용자의 PraiseCharts 라이브러리를 조회합니다 |

## Support

기본 경로: `/content/support`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | AWS Polly를 사용해 SSML을 MP3 오디오로 변환합니다. 본문: `{ ssml: "<speak>...</speak>" }` |

## 관련 페이지

- [웹사이트 빌더 아키텍처](../../architecture/website-builder) -- 페이지, 섹션, 요소, 게시물, 리다이렉트가 모든 앱에서 어떻게 결합되는지
- [Membership 엔드포인트](./membership) -- 인물, 교회, 그룹, 역할, 권한
- [Attendance 엔드포인트](./attendance) -- 예배 및 방문 추적
- [인증 및 권한](./authentication) -- 로그인 흐름, JWT, 권한 모델
- [모듈 구조](../module-structure) -- 코드 구성 패턴
