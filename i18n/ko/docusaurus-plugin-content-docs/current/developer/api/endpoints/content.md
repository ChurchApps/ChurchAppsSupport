---
title: "Content 엔드포인트"
---

# Content 엔드포인트

<div class="article-intro">

Content 모듈은 웹사이트 페이지, 섹션, 요소, 블록, 블로그 게시물, 리디렉션, 설교, 재생 목록, 스트리밍 서비스, 이벤트, 큐레이션된 캘린더, 파일, 갤러리, 성경 번역 및 구절 검색, 찬양, 편곡, 전역 스타일, 스톡 사진, 설정을 관리합니다. API에서 가장 큰 모듈이며, 모든 ChurchApps 애플리케이션에서 CMS, 미디어/스트리밍, 예배 계획, 성경 기능을 지원합니다.

</div>

**기본 경로:** `/content`

## 페이지

기본 경로: `/content/pages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | 공개 | — | URL 또는 ID로 전체 페이지 트리(섹션, 요소, 블록)를 불러옵니다. URL로 가져올 때는 내부 ID를 제거합니다. URL 기반 조회는 `pages.visibility`를 적용합니다. 제한된 페이지는 (선택 사항인) JWT가 조건을 충족하지 않으면 `{ restricted: true, visibility }`를 반환합니다 |
| GET | `/public/:churchId` | 공개 | — | 공개 페이지(`url`, `title`, `metaDescription`)를 나열합니다. `visibility = everyone`인 페이지만 포함합니다 |
| GET | `/:id` | JWT | — | ID로 페이지를 가져옵니다 |
| GET | `/` | JWT | — | 교회의 모든 페이지를 나열합니다 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 모든 섹션과 요소를 포함하여 페이지를 복제합니다 |
| POST | `/temp/ai` | JWT | Content.Edit | AI로 생성한 페이지를 저장합니다(페이지, 섹션, 요소를 한 번의 호출로 처리) |
| POST | `/importTree` | JWT | Content.Edit | 중첩된 트리(`title`, `url`, `sections[].elements[]…`)로 페이지를 만듭니다. 항상 호출자의 교회 아래에 삽입되며, 본문의 ID는 무시됩니다. 행에는 `column` 하위 항목이 포함되어야 합니다. 최대 섹션 30개, 요소 500개 |
| POST | `/` | JWT | Content.Edit | 페이지를 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 페이지를 삭제합니다 |

### 예시: 페이지 트리 불러오기

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

## 섹션

기본 경로: `/content/sections`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 섹션을 가져옵니다 |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | 섹션을 복제하거나 재사용 가능한 블록으로 변환합니다 |
| POST | `/` | JWT | Content.Edit | 섹션을 만들거나 업데이트합니다(일괄). 정렬 순서를 자동으로 갱신합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 섹션을 삭제합니다(정렬 순서 자동 갱신) |

## 요소

기본 경로: `/content/elements`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 요소를 가져옵니다 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 모든 하위 항목을 포함하여 요소를 복제합니다 |
| POST | `/` | JWT | Content.Edit | 요소를 만들거나 업데이트합니다(일괄). 행의 열과 캐러셀 슬라이드를 자동으로 관리합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 요소를 삭제합니다 |

## 블록

기본 경로: `/content/blocks`

기본 CRUD(GET `/:id`, GET `/`, POST `/`, DELETE `/:id`)를 확장합니다. 쓰기 작업에는 기본 클래스의 Content.Edit 권한이 필요합니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 블록을 가져옵니다 |
| GET | `/` | JWT | — | 모든 블록을 나열합니다 |
| GET | `/:churchId/tree/:id` | 공개 | — | 섹션과 요소를 포함한 전체 블록 트리를 불러옵니다 |
| GET | `/blockType/:blockType` | JWT | — | 유형별로 블록을 불러옵니다(예: footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | 공개 | — | 교회의 푸터 블록 트리를 불러옵니다 |
| POST | `/` | JWT | Content.Edit | 블록을 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 블록을 삭제합니다 |

## 링크

기본 경로: `/content/links`

기본 CRUD(GET `/:id`, GET `/`, POST `/`, DELETE `/:id`)를 확장합니다. 쓰기 작업에는 기본 클래스의 Content.Edit 권한이 필요합니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 링크를 가져옵니다 |
| GET | `/` | JWT | — | 모든 링크를 나열합니다. 선택적으로 `?category=` 필터를 사용할 수 있습니다. 저장 후 자동 정렬됩니다 |
| GET | `/church/:churchId/filtered?category=` | JWT | — | 공개 범위(everyone, visitors, members, staff, groups)에 따라 필터링된 링크를 불러옵니다 |
| GET | `/church/:churchId?category=` | 공개 | — | 카테고리별로 교회의 링크를 불러옵니다(공개) |
| POST | `/` | JWT | Content.Edit | 링크를 만들거나 업데이트합니다(일괄). 카테고리별로 자동 정렬합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 링크를 삭제합니다 |

## 전역 스타일

기본 경로: `/content/globalStyles`

기본 CRUD(POST `/`, DELETE `/:id`)를 확장합니다. 쓰기 작업에는 기본 클래스의 Content.Edit 권한이 필요합니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | 공개 | — | 교회의 전역 스타일을 불러옵니다(설정이 없으면 기본값을 반환) |
| GET | `/` | JWT | — | 인증된 교회의 전역 스타일을 불러옵니다 |
| POST | `/` | JWT | Content.Edit | 전역 스타일을 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 전역 스타일을 삭제합니다 |

## 페이지 기록

기본 경로: `/content/pageHistory`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | 페이지의 기록 항목을 나열합니다 |
| GET | `/block/:blockId` | JWT | Content.Edit | 블록의 기록 항목을 나열합니다 |
| GET | `/:id` | JWT | Content.Edit | ID로 기록 항목을 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 페이지/블록 스냅샷을 저장합니다. 30일이 지난 항목을 주기적으로 정리합니다 |
| POST | `/restore/:id` | JWT | Content.Edit | 기록 스냅샷에서 페이지/블록을 복원합니다(현재 콘텐츠를 삭제하고 스냅샷에서 다시 만듭니다) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | 인라인 스냅샷 객체에서 복원합니다. 본문: `{ pageId, blockId, snapshot }` |

## 게시물(블로그)

기본 경로: `/content/posts`

블로그 게시물은 독립된 행으로, `title`, `slug`(교회마다 고유), `excerpt`, `content`(마크다운 본문), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`로 구성됩니다. `publishDate`가 설정되고 과거 날짜이면 게시물이 공개됩니다. 읽기 엔드포인트는 각 게시물에 `authorId`로부터 확인한 `authorName`을 추가합니다. 자세한 내용은 [웹사이트 빌더 아키텍처](../../architecture/website-builder#blog)를 참조하세요.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | 공개 | — | 공개된 게시물을 페이지 단위로 나열합니다(페이지당 최대 50개) |
| GET | `/public/:churchId/categories` | 공개 | — | 공개된 게시물의 고유 카테고리 목록 |
| GET | `/public/:churchId/slug/:slug` | 공개 | — | slug로 공개된 게시물을 가져옵니다 |
| GET | `/rss/:churchId?siteUrl=` | 공개 | — | 공개된 게시물의 RSS 2.0 피드(링크는 `{siteUrl}/blog/{slug}` 형식으로 만듭니다) |
| GET | `/:id` | JWT | — | ID로 게시물을 가져옵니다 |
| GET | `/` | JWT | — | 교회의 모든 게시물을 나열합니다 |
| POST | `/` | JWT | Content.Edit | 게시물을 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 게시물을 삭제합니다 |

## 리디렉션

기본 경로: `/content/redirects`

교회별 URL 리디렉션(`fromPath` → `toPath`)이며, 교회당 200개로 제한됩니다. 경로는 정규화됩니다(소문자, 앞에 슬래시, 뒤에 슬래시 없음). `fromPath`는 교회 안에서 고유합니다. B1App은 404가 발생할 때 이를 확인하고 HTTP 308을 반환합니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | 공개 | — | 경로를 확인합니다(`path`를 생략하면 모든 리디렉션을 나열) |
| GET | `/:id` | JWT | — | ID로 리디렉션을 가져옵니다 |
| GET | `/` | JWT | — | 교회의 모든 리디렉션을 나열합니다 |
| POST | `/` | JWT | Content.Edit | 리디렉션을 만들거나 업데이트합니다. `fromPath = toPath`는 거부하며 200개 행 제한을 적용합니다 |
| DELETE | `/:id` | JWT | Content.Edit | 리디렉션을 삭제합니다 |

## 설교

기본 경로: `/content/sermons`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | FreeShow 재생 목록 구조의 샘플을 가져옵니다 |
| GET | `/public/tvWrapper/:churchId` | JWT | — | 설교, 수업, FreeShow 소스를 포함한 TV 앱 래퍼를 가져옵니다 |
| GET | `/public/tvFeed/:churchId/:sermonId` | 공개 | — | 설교 하나를 TV 피드 재생 목록으로 가져옵니다 |
| GET | `/public/tvFeed/:churchId` | 공개 | — | 모든 공개 재생 목록/설교를 TV 피드로 가져옵니다 |
| GET | `/public/:churchId` | 공개 | — | 교회의 모든 공개 설교를 나열합니다 |
| GET | `/timeline?sermonIds=` | JWT | — | 설교의 타임라인 데이터를 불러옵니다 |
| GET | `/lookup?videoType=&videoData=` | 공개 | — | YouTube 또는 Vimeo에서 설교 메타데이터를 조회합니다 |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | 설교 자막을 바탕으로 AI 소셜 미디어 게시 제안을 생성합니다 |
| GET | `/outline?url=&title=&author=` | JWT | — | URL로 AI 수업 개요를 생성합니다 |
| GET | `/youtubeImport/:channelId` | JWT | — | YouTube 채널의 동영상을 가져옵니다 |
| GET | `/vimeoImport/:channelId` | JWT | — | Vimeo 채널의 동영상을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 설교를 가져옵니다 |
| GET | `/` | JWT | — | 모든 설교를 나열합니다 |
| POST | `/` | JWT | StreamingServices.Edit | 설교를 만들거나 업데이트합니다(일괄, base64 썸네일 업로드 지원) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 설교를 삭제합니다 |

### 예시: YouTube 설교 조회하기

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

## 재생 목록

기본 경로: `/content/playlists`

기본 CRUD(GET `/:id`, GET `/`, DELETE `/:id`)를 확장합니다. 쓰기 작업에는 기본 클래스의 StreamingServices.Edit 권한이 필요합니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 재생 목록을 가져옵니다 |
| GET | `/` | JWT | — | 모든 재생 목록을 나열합니다 |
| GET | `/public/:churchId` | 공개 | — | 교회의 모든 공개 재생 목록을 나열합니다 |
| POST | `/` | JWT | StreamingServices.Edit | 재생 목록을 만들거나 업데이트합니다(일괄, base64 썸네일 업로드 지원) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 재생 목록을 삭제합니다 |

## 스트리밍 서비스

기본 경로: `/content/streamingServices`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | 서비스의 암호화된 호스트 채팅방 ID를 가져옵니다 |
| GET | `/` | JWT | — | 모든 스트리밍 서비스를 나열합니다. 반복되지 않는 만료된 서비스는 자동으로 정리하고, 반복 서비스는 다음 회차로 넘깁니다 |
| POST | `/` | JWT | StreamingServices.Edit | 스트리밍 서비스를 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 스트리밍 서비스를 삭제합니다(차단된 IP도 함께 지움) |

## 이벤트

기본 경로: `/content/events`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | 그룹의 타임라인 이벤트를 불러옵니다 |
| GET | `/timeline?eventIds=` | JWT | — | 현재 사용자의 그룹에 대한 타임라인 이벤트를 불러옵니다 |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | 공개 | — | 이벤트를 ICS 캘린더 피드로 구독합니다 |
| GET | `/group/:groupId` | JWT | — | 그룹의 이벤트를 가져옵니다(예외 날짜 포함) |
| GET | `/public/group/:churchId/:groupId` | 공개 | — | 그룹의 공개 이벤트를 가져옵니다 |
| GET | `/public/:churchId/:id` | 공개 | — | 공개 페이지용 이벤트 하나를 가져옵니다. 거절되지 않은 예약의 장소를 `roomNames`로 포함합니다. 대기 중이거나 거절된 이벤트, 그리고 등록을 받지 않는 비공개 이벤트에는 `null`을 반환합니다 |
| GET | `/public/:churchId/:id/ical` | 공개 | — | 해당 이벤트를 `.ics` 파일(`text/calendar`, 예외 날짜 적용)로 다운로드합니다. 같은 규칙으로 숨겨진 이벤트는 `404`를 반환합니다 |
| GET | `/:id` | JWT | — | ID로 이벤트를 가져옵니다 |
| POST | `/` | JWT | — | 이벤트를 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 이벤트를 삭제합니다 |

이벤트 레코드에는 `photoUrl`(공개 이벤트 페이지와 다가오는 이벤트 타일에 표시되는 16:9 이벤트 사진), `tags`(쉼표로 구분, 웹사이트 캘린더 요소의 태그 필터에서 사용), `notesViewRole` / `notesPostRole`(`null`이면 `staff`, 그 외 `leaders` 또는 `members`)이 포함되며, 이들은 이벤트의 `eventNote` 대화 접근을 제어합니다. 자세한 내용은 [그룹 및 이벤트 메모 접근 제어](./messaging.md#group-and-event-notes-access-control)를 참조하세요. 공개 큐레이션 이벤트 응답에도 각 이벤트의 `photoUrl`과 `tags`가 포함됩니다.

## 이벤트 예외

기본 경로: `/content/eventExceptions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 이벤트 예외를 가져옵니다 |
| POST | `/` | JWT | Content.Edit | 이벤트 예외를 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 이벤트 예외를 삭제합니다 |

## 큐레이션 캘린더

기본 경로: `/content/curatedCalendars`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 큐레이션 캘린더를 가져옵니다 |
| GET | `/` | JWT | — | 모든 큐레이션 캘린더를 나열합니다 |
| POST | `/` | JWT | Content.Edit | 큐레이션 캘린더를 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 큐레이션 캘린더를 삭제합니다 |

## 큐레이션 이벤트

기본 경로: `/content/curatedEvents`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | 캘린더의 큐레이션 이벤트를 가져옵니다(`?withoutEvents`를 설정하지 않으면 이벤트 상세와 예외 날짜 포함) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | 공개 | — | 캘린더의 공개 큐레이션 이벤트를 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 큐레이션 이벤트를 가져옵니다 |
| GET | `/` | JWT | — | 모든 큐레이션 이벤트를 나열합니다 |
| POST | `/` | JWT | Content.Edit | 큐레이션 이벤트를 만들거나 업데이트합니다. `eventIds` 배열로 특정 그룹 이벤트를 추가할 수 있습니다 |
| DELETE | `/:id` | JWT | Content.Edit | 큐레이션 이벤트를 삭제합니다 |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | 큐레이션 캘린더에서 특정 이벤트를 제거합니다 |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | 큐레이션 캘린더에서 그룹의 모든 이벤트를 제거합니다 |

## 파일

기본 경로: `/content/files`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | 콘텐츠 유형과 콘텐츠 ID로 파일을 가져옵니다 |
| GET | `/` | JWT | — | 교회 웹사이트의 모든 파일을 나열합니다 |
| GET | `/:id` | JWT | — | ID로 파일을 가져옵니다 |
| POST | `/` | JWT | Content.Edit* | 파일을 업로드합니다(base64). *`contentId`에 해당하는 그룹의 구성원인 경우에도 허용됩니다 |
| POST | `/postUrl` | JWT | Content.Edit* | 사전 서명된 S3 업로드 URL을 가져옵니다. *그룹 구성원에게도 허용됩니다. 콘텐츠 항목당 최대 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | 파일을 삭제하고 스토리지에서도 제거합니다. *그룹 구성원에게도 허용됩니다 |

## 갤러리

기본 경로: `/content/gallery`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | 공개 | — | 폴더의 스톡 사진을 나열합니다 |
| GET | `/:folder` | JWT | Content.Edit | 폴더의 갤러리 이미지를 나열합니다 |
| POST | `/requestUpload` | JWT | Content.Edit | 갤러리 이미지용 사전 서명된 S3 업로드 URL을 가져옵니다 |
| DELETE | `/:folder/:image` | JWT | Content.Edit | 갤러리 이미지를 삭제합니다 |

## 성경

기본 경로: `/content/bibles`

모든 성경 엔드포인트는 공개되어 있습니다(인증 불필요). 데이터는 외부 소스에서 가져오며 로컬에 캐시됩니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | 공개 | — | 모든 성경 번역을 나열합니다(캐시가 비어 있으면 소스에서 가져옴) |
| GET | `/stats?startDate=&endDate=` | 공개 | — | 날짜 범위의 성경 조회 통계를 가져옵니다 |
| GET | `/availableTranslations/:source` | 공개 | — | 소스(예: api.bible)에서 사용 가능한 번역을 나열합니다 |
| GET | `/updateTranslations` | 공개 | — | 모든 소스의 번역을 모두 동기화합니다 |
| GET | `/updateTranslations/:source` | 공개 | — | 특정 소스의 번역을 동기화합니다 |
| GET | `/updateCopyrights` | 공개 | — | 저작권 정보가 없는 번역의 저작권 정보를 업데이트합니다 |
| GET | `/:translationKey/updateCopyright` | 공개 | — | 특정 번역의 저작권 정보를 업데이트합니다 |
| GET | `/:translationKey/search?query=&limit=` | 공개 | — | 번역에서 구절을 검색합니다 |
| GET | `/:translationKey/books` | 공개 | — | 번역의 책 목록을 가져옵니다(로컬에 캐시) |
| GET | `/:translationKey/:bookKey/chapters` | 공개 | — | 책의 장 목록을 가져옵니다(로컬에 캐시) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | 공개 | — | 장의 절 목록을 가져옵니다(로컬에 캐시) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | 공개 | — | 범위의 구절 본문을 가져옵니다. 조회를 기록합니다. 일부 번역은 라이선스 때문에 캐시를 우회합니다 |

### 예시: 구절 본문 가져오기

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

## 찬양

기본 경로: `/content/songs`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | 검색어로 찬양을 검색합니다 |
| GET | `/:id` | JWT | — | ID로 찬양을 가져옵니다 |
| GET | `/` | JWT | Content.Edit | 모든 찬양을 나열합니다 |
| POST | `/` | JWT | Content.Edit | 찬양을 만들거나 업데이트합니다(일괄) |
| POST | `/import` | JWT | — | FreeShow에서 찬양을 가져옵니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 찬양을 삭제합니다 |

## 찬양 세부 정보

기본 경로: `/content/songDetails`

찬양 세부 정보는 교회 단위가 아닌 전역 데이터입니다. 교회 간에 공유되는 표준 찬양 메타데이터를 나타냅니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 찬양 세부 정보를 가져옵니다(전역) |
| GET | `/` | JWT | — | 교회의 찬양 세부 정보를 나열합니다 |
| POST | `/create` | JWT | — | PraiseCharts ID로 찬양 세부 정보를 만듭니다(이미 만들어져 있으면 기존 항목을 반환). PraiseCharts와 MusicBrainz에서 메타데이터를 자동으로 가져옵니다 |
| POST | `/` | JWT | — | 찬양 세부 정보를 만들거나 업데이트합니다(일괄) |

## 찬양 세부 정보 링크

기본 경로: `/content/songDetailLinks`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 찬양 세부 정보 링크를 가져옵니다 |
| GET | `/songDetail/:songDetailId` | JWT | — | 찬양 세부 정보의 모든 링크를 가져옵니다 |
| POST | `/` | JWT | — | 찬양 세부 정보 링크를 만들거나 업데이트합니다(일괄). 연결된 경우 MusicBrainz 데이터를 자동으로 가져옵니다 |
| DELETE | `/:id` | JWT | — | 찬양 세부 정보 링크를 삭제합니다 |

## 편곡

기본 경로: `/content/arrangements`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 편곡을 가져옵니다 |
| GET | `/song/:songId` | JWT | Content.Edit | 찬양의 편곡을 가져옵니다 |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | 찬양 세부 정보의 편곡을 가져옵니다 |
| GET | `/` | JWT | Content.Edit | 모든 편곡을 나열합니다 |
| POST | `/` | JWT | Content.Edit | 편곡을 만들거나 업데이트합니다(일괄) |
| POST | `/freeShow/missing` | JWT | — | 교회에 없는 FreeShow ID를 찾습니다. 본문: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | 편곡을 삭제합니다(키도 함께 삭제하며, 남은 편곡이 없으면 찬양도 삭제) |

## 편곡 키

기본 경로: `/content/arrangementKeys`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | 공개 | — | 프레젠터 화면용으로 찬양 데이터 전체를 포함한 편곡 키를 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 편곡 키를 가져옵니다 |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | 편곡의 키를 가져옵니다 |
| GET | `/` | JWT | Content.Edit | 모든 편곡 키를 나열합니다 |
| POST | `/` | JWT | Content.Edit | 편곡 키를 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 편곡 키를 삭제합니다 |

## 설정

기본 경로: `/content/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 현재 사용자의 설정을 가져옵니다 |
| GET | `/` | JWT | Settings.Edit | 교회의 모든 설정을 가져옵니다 |
| GET | `/public/:churchId` | 공개 | — | 교회의 공개 설정을 키-값 쌍으로 가져옵니다 |
| POST | `/my` | JWT | — | 사용자 수준 설정을 저장합니다(base64 이미지 업로드 지원) |
| POST | `/` | JWT | Settings.Edit | 교회 수준 설정을 저장합니다(base64 이미지 업로드 지원) |
| DELETE | `/my/:id` | JWT | — | 사용자 설정을 삭제합니다 |

## 미리 보기

기본 경로: `/content/preview`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | 공개 | — | 서브도메인 키로 교회의 스트리밍 미리 보기 데이터(탭, 링크, 서비스, 설교)를 불러옵니다 |

## 갤러리(스톡 사진)

기본 경로: `/content/stock`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/search` | 공개 | — | Pexels 스톡 사진을 검색합니다. 본문: `{ term: "church" }` |

## PraiseCharts

기본 경로: `/content/praiseCharts`

예배 찬양 탐색과 악보 다운로드를 위한 PraiseCharts 연동입니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | 찬양의 원본 PraiseCharts 데이터를 가져옵니다 |
| GET | `/hasAccount` | JWT | — | 사용자가 연결된 PraiseCharts 계정이 있는지 확인합니다 |
| GET | `/search?q=` | JWT | — | PraiseCharts 카탈로그를 검색합니다 |
| GET | `/products/:id?keys=` | JWT | — | 찬양의 제품을 가져옵니다(인증된 경우 라이브러리에서, 그렇지 않으면 카탈로그에서) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | 라이브러리에서 원본 편곡 데이터를 가져옵니다 |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | PraiseCharts에서 파일(PDF 또는 ZIP)을 다운로드합니다. `{ redirectUrl }`을 반환합니다 |
| GET | `/authUrl?returnUrl=` | 공개 | — | PraiseCharts의 OAuth 인증 URL을 가져옵니다 |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth 검증 코드를 액세스 토큰으로 교환하고 사용자 설정에 저장합니다 |
| GET | `/library` | JWT | — | 사용자의 PraiseCharts 라이브러리를 탐색합니다 |

## 지원

기본 경로: `/content/support`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | 공개 | — | AWS Polly를 사용하여 SSML을 MP3 오디오로 변환합니다. 본문: `{ ssml: "<speak>...</speak>" }` |

## 관련 페이지

- [웹사이트 빌더 아키텍처](../../architecture/website-builder) -- 페이지, 섹션, 요소, 게시물, 리디렉션이 여러 앱에서 어떻게 연결되는지
- [Membership 엔드포인트](./membership) -- 사람, 교회, 그룹, 역할, 권한
- [Attendance 엔드포인트](./attendance) -- 서비스 및 방문 기록
- [인증 및 권한](./authentication) -- 로그인 흐름, JWT, 권한 모델
- [모듈 구조](../module-structure) -- 코드 구성 패턴
