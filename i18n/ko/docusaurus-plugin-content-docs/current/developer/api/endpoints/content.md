---
title: "콘텐츠 엔드포인트"
---

# 콘텐츠 엔드포인트 {#content-endpoints}

<div class="article-intro">

콘텐츠 모듈은 웹사이트 페이지, 섹션, 요소, 블록, 블로그 글, 리디렉션, 설교, 재생목록, 스트리밍 서비스, 이벤트, 큐레이션 달력, 파일, 갤러리, 성경 번역본과 구절 조회, 찬양곡, 편곡, 전역 스타일, 스톡 사진, 설정을 관리합니다. API에서 가장 큰 모듈이며, 모든 ChurchApps 애플리케이션에서 CMS, 미디어/스트리밍, 예배 계획, 성경 기능을 뒷받침합니다.

</div>

**기본 경로:** `/content`

## 페이지 {#pages}

기본 경로: `/content/pages`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | URL 또는 ID로 전체 페이지 트리(섹션, 요소, 블록) 조회. URL로 가져올 때는 내부 ID를 제거함. URL 기반 조회는 `pages.visibility`를 적용하며, 제한된 페이지는 (선택적) JWT가 조건을 충족하지 않으면 `{ restricted: true, visibility }`를 반환 |
| GET | `/public/:churchId` | Public | — | 공개 페이지 목록(`url`, `title`, `metaDescription`); `visibility = everyone`인 것만 |
| GET | `/:id` | JWT | — | ID로 페이지 조회 |
| GET | `/` | JWT | — | 교회의 모든 페이지 목록 조회 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 모든 섹션과 요소를 포함하여 페이지 복제 |
| POST | `/temp/ai` | JWT | Content.Edit | AI가 생성한 페이지 저장(페이지, 섹션, 요소를 한 번의 호출로) |
| POST | `/importTree` | JWT | Content.Edit | 중첩된 트리(`title`, `url`, `sections[].elements[]…`)로 페이지 생성. 항상 호출자의 교회 아래에 삽입되며, 본문의 ID는 무시됨. 행에는 `column` 자식이 포함되어야 함. 최대 섹션 30개 / 요소 500개 |
| POST | `/` | JWT | Content.Edit | 페이지 생성 또는 업데이트(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 페이지 삭제 |

### 예시: 페이지 트리 불러오기 {#example-load-page-tree}

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

## 섹션 {#sections}

기본 경로: `/content/sections`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 섹션 조회 |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | 섹션을 복제하거나 재사용 가능한 블록으로 변환 |
| POST | `/` | JWT | Content.Edit | 섹션 생성 또는 업데이트(일괄). 정렬 순서를 자동 업데이트 |
| DELETE | `/:id` | JWT | Content.Edit | 섹션 삭제(정렬 순서 자동 업데이트) |

## 요소 {#elements}

기본 경로: `/content/elements`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 요소 조회 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 모든 자식을 포함하여 요소 복제 |
| POST | `/` | JWT | Content.Edit | 요소 생성 또는 업데이트(일괄). 행의 열과 캐러셀 슬라이드를 자동 관리 |
| DELETE | `/:id` | JWT | Content.Edit | 요소 삭제 |

## 블록 {#blocks}

기본 경로: `/content/blocks`

기본 CRUD를 확장합니다(기본 클래스의 GET `/:id`, GET `/`, POST `/`, DELETE `/:id`이며, 쓰기에는 Content.Edit 권한이 필요).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 블록 조회 |
| GET | `/` | JWT | — | 모든 블록 목록 조회 |
| GET | `/:churchId/tree/:id` | Public | — | 섹션과 요소를 포함한 전체 블록 트리 조회 |
| GET | `/blockType/:blockType` | JWT | — | 유형별 블록 조회(예: footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | 교회의 바닥글 블록 트리 조회 |
| POST | `/` | JWT | Content.Edit | 블록 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Content.Edit | 블록 삭제 |

## 링크 {#links}

기본 경로: `/content/links`

기본 CRUD를 확장합니다(기본 클래스의 GET `/:id`, GET `/`, POST `/`, DELETE `/:id`이며, 쓰기에는 Content.Edit 권한이 필요).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 링크 조회 |
| GET | `/` | JWT | — | 모든 링크 목록 조회. 선택적 `?category=` 필터. 저장 후 자동 정렬 |
| GET | `/church/:churchId/filtered?category=` | JWT | — | 공개 범위(everyone, visitors, members, staff, groups)로 걸러진 링크 조회 |
| GET | `/church/:churchId?category=` | Public | — | 분류별 교회 링크 조회(공개) |
| POST | `/` | JWT | Content.Edit | 링크 생성 또는 업데이트(일괄). 분류별로 자동 정렬 |
| DELETE | `/:id` | JWT | Content.Edit | 링크 삭제 |

## 전역 스타일 {#global-styles}

기본 경로: `/content/globalStyles`

기본 CRUD를 확장합니다(기본 클래스의 POST `/`, DELETE `/:id`이며, 쓰기에는 Content.Edit 권한이 필요).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | 교회의 전역 스타일 조회(설정이 없으면 기본값 반환) |
| GET | `/` | JWT | — | 인증된 교회의 전역 스타일 조회 |
| POST | `/` | JWT | Content.Edit | 전역 스타일 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Content.Edit | 전역 스타일 삭제 |

## 페이지 기록 {#page-history}

기본 경로: `/content/pageHistory`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | 페이지의 기록 항목 목록 조회 |
| GET | `/block/:blockId` | JWT | Content.Edit | 블록의 기록 항목 목록 조회 |
| GET | `/:id` | JWT | Content.Edit | ID로 기록 항목 조회 |
| POST | `/` | JWT | Content.Edit | 페이지/블록 스냅숏 저장. 30일보다 오래된 항목을 주기적으로 정리 |
| POST | `/restore/:id` | JWT | Content.Edit | 기록 스냅숏으로 페이지/블록 복원(현재 콘텐츠를 삭제하고 스냅숏에서 다시 생성) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | 인라인 스냅숏 객체로 복원. 본문: `{ pageId, blockId, snapshot }` |

## 글(블로그) {#posts-blog}

기본 경로: `/content/posts`

블로그 글은 독립된 행입니다. `title`, `slug`(교회마다 고유), `excerpt`, `content`(마크다운 본문), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`를 가집니다. `publishDate`가 설정되고 과거 날짜일 때 글이 게시됩니다. 읽기 엔드포인트는 각 글에 `authorId`로 확인한 `authorName`을 덧붙입니다. [웹사이트 빌더 아키텍처](../../architecture/website-builder#blog)를 참조하세요.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | 게시된 글 목록을 페이지로 나누어 조회(페이지당 최대 50개) |
| GET | `/public/:churchId/categories` | Public | — | 게시된 글 전체의 고유 분류 목록 |
| GET | `/public/:churchId/slug/:slug` | Public | — | slug로 게시된 글 조회 |
| GET | `/rss/:churchId?siteUrl=` | Public | — | 게시된 글의 RSS 2.0 피드(링크는 `{siteUrl}/blog/{slug}` 형식으로 생성) |
| GET | `/:id` | JWT | — | ID로 글 조회 |
| GET | `/` | JWT | — | 교회의 모든 글 목록 조회 |
| POST | `/` | JWT | Content.Edit | 글 생성 또는 업데이트(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 글 삭제 |

## 리디렉션 {#redirects}

기본 경로: `/content/redirects`

교회별 URL 리디렉션(`fromPath` → `toPath`)이며, 교회당 최대 200개로 제한됩니다. 경로는 정규화되고(소문자, 앞에 슬래시, 뒤에 슬래시 없음), `fromPath`는 교회마다 고유합니다. B1App은 404가 발생할 때 이를 확인하고 HTTP 308을 반환합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | 경로를 확인(`path`를 생략하면 모든 리디렉션 목록 반환) |
| GET | `/:id` | JWT | — | ID로 리디렉션 조회 |
| GET | `/` | JWT | — | 교회의 모든 리디렉션 목록 조회 |
| POST | `/` | JWT | Content.Edit | 리디렉션 생성 또는 업데이트. `fromPath = toPath`는 거부하며 200행 상한을 적용 |
| DELETE | `/:id` | JWT | Content.Edit | 리디렉션 삭제 |

## 설교 {#sermons}

기본 경로: `/content/sermons`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | FreeShow 재생목록 구조 샘플 조회 |
| GET | `/public/tvWrapper/:churchId` | JWT | — | 설교, 공과, FreeShow 소스가 포함된 TV 앱 래퍼 조회 |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | 설교 한 편을 TV 피드 재생목록으로 조회 |
| GET | `/public/tvFeed/:churchId` | Public | — | 모든 공개 재생목록/설교를 TV 피드로 조회 |
| GET | `/public/:churchId` | Public | — | 교회의 모든 공개 설교 목록 조회 |
| GET | `/timeline?sermonIds=` | JWT | — | 설교의 타임라인 데이터 조회 |
| GET | `/lookup?videoType=&videoData=` | Public | — | YouTube 또는 Vimeo에서 설교 메타데이터 조회 |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | 설교 자막으로부터 AI 소셜 미디어 게시물 제안 생성 |
| GET | `/outline?url=&title=&author=` | JWT | — | URL로부터 AI 공과 개요 생성 |
| GET | `/youtubeImport/:channelId` | JWT | — | YouTube 채널에서 동영상 가져오기 |
| GET | `/vimeoImport/:channelId` | JWT | — | Vimeo 채널에서 동영상 가져오기 |
| GET | `/:id` | JWT | — | ID로 설교 조회 |
| GET | `/` | JWT | — | 모든 설교 목록 조회 |
| POST | `/` | JWT | StreamingServices.Edit | 설교 생성 또는 업데이트(일괄, base64 썸네일 업로드 지원) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 설교 삭제 |

### 예시: YouTube 설교 조회하기 {#example-look-up-a-youtube-sermon}

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

## 재생목록 {#playlists}

기본 경로: `/content/playlists`

기본 CRUD를 확장합니다(기본 클래스의 GET `/:id`, GET `/`, DELETE `/:id`이며, 쓰기에는 StreamingServices.Edit 권한이 필요).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 재생목록 조회 |
| GET | `/` | JWT | — | 모든 재생목록 조회 |
| GET | `/public/:churchId` | Public | — | 교회의 모든 공개 재생목록 조회 |
| POST | `/` | JWT | StreamingServices.Edit | 재생목록 생성 또는 업데이트(일괄, base64 썸네일 업로드 지원) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 재생목록 삭제 |

## 스트리밍 서비스 {#streaming-services}

기본 경로: `/content/streamingServices`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | 서비스의 암호화된 호스트 채팅방 ID 조회 |
| GET | `/` | JWT | — | 모든 스트리밍 서비스 목록 조회. 만료된 비반복 서비스는 자동으로 정리하고, 반복 서비스는 다음 회차로 진행 |
| POST | `/` | JWT | StreamingServices.Edit | 스트리밍 서비스 생성 또는 업데이트(일괄) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 스트리밍 서비스 삭제(차단된 IP도 함께 삭제) |

## 이벤트 {#events}

기본 경로: `/content/events`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | 그룹의 타임라인 이벤트 조회(예외 날짜 포함. 삭제된 회차는 건너뛸 수 있음) |
| GET | `/timeline?eventIds=` | JWT | — | 현재 사용자의 그룹에 대한 타임라인 이벤트 조회(예외 날짜 포함) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | 이벤트를 ICS 달력 피드로 구독 |
| GET | `/group/:groupId` | JWT | — | 그룹의 이벤트 조회(예외 날짜 포함) |
| GET | `/public/group/:churchId/:groupId` | Public | — | 그룹의 공개 이벤트 조회 |
| GET | `/public/:churchId/:id` | Public | — | 공개 페이지용 이벤트 하나 조회. 거부되지 않은 예약의 방 이름을 `roomNames`로 포함. 대기 중 또는 거부된 이벤트와, 등록을 받지 않는 비공개 이벤트에는 `null`을 반환 |
| GET | `/public/:churchId/:id/ical` | Public | — | 이벤트 하나를 `.ics` 파일로 내려받기(`text/calendar`, 예외 날짜 적용). 같은 규칙으로 숨겨진 이벤트는 `404` |
| GET | `/:id` | JWT | — | ID로 이벤트 조회 |
| POST | `/` | JWT | — | 이벤트 생성 또는 업데이트(일괄) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin 또는 그룹 리더 | 이벤트와 그 예약 삭제. 이벤트 그룹의 리더는 삭제할 수 있으며, 요청자는 본인의 대기 중 요청을 철회할 수 있음 |

이벤트 레코드에는 `photoUrl`(공개 이벤트 페이지와 다가오는 이벤트 타일에 표시되는 16:9 이벤트 사진), `tags`(쉼표로 구분, 웹사이트 달력 요소의 태그 필터에서 사용), `notesViewRole` / `notesPostRole`(`null`이면 `staff`, 또는 `leaders`, `members`)이 포함됩니다. 이 값은 이벤트의 `eventNote` 대화에 대한 접근을 제어합니다. [그룹 및 이벤트 메모 접근 제어](./messaging.md#group-and-event-notes-access-control)를 참조하세요. 공개 큐레이션 이벤트 응답에도 각 이벤트의 `photoUrl`과 `tags`가 포함됩니다.

## 이벤트 예외 {#event-exceptions}

기본 경로: `/content/eventExceptions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 이벤트 예외 조회 |
| POST | `/` | JWT | Content.Edit, Calendars.Admin 또는 그룹 리더 | 이벤트 예외 생성 또는 업데이트(일괄). 리더는 자신이 이끄는 그룹의 이벤트에 대해서만 예외를 추가할 수 있음 |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin 또는 그룹 리더 | 이벤트 예외 삭제 |

## 큐레이션 달력 {#curated-calendars}

기본 경로: `/content/curatedCalendars`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 큐레이션 달력 조회 |
| GET | `/` | JWT | — | 모든 큐레이션 달력 목록 조회 |
| POST | `/` | JWT | Content.Edit | 큐레이션 달력 생성 또는 업데이트(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 큐레이션 달력 삭제 |

## 큐레이션 이벤트 {#curated-events}

기본 경로: `/content/curatedEvents`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | 달력의 큐레이션 이벤트 조회(이벤트 세부 정보와 예외 날짜 포함. `?withoutEvents`를 설정하면 제외) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | 달력의 공개 큐레이션 이벤트 조회 |
| GET | `/:id` | JWT | — | ID로 큐레이션 이벤트 조회 |
| GET | `/` | JWT | — | 모든 큐레이션 이벤트 목록 조회 |
| POST | `/` | JWT | Content.Edit | 큐레이션 이벤트 생성 또는 업데이트. 특정 그룹 이벤트를 추가하는 `eventIds` 배열 지원 |
| DELETE | `/:id` | JWT | Content.Edit | 큐레이션 이벤트 삭제 |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | 큐레이션 달력에서 특정 이벤트 제거 |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | 큐레이션 달력에서 그룹의 모든 이벤트 제거 |

## 파일 {#files}

기본 경로: `/content/files`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | 콘텐츠 유형과 콘텐츠 ID로 파일 조회 |
| GET | `/` | JWT | — | 교회 웹사이트의 모든 파일 목록 조회 |
| GET | `/:id` | JWT | — | ID로 파일 조회 |
| POST | `/` | JWT | Content.Edit* | 파일 업로드(base64). *`contentId`와 일치하는 그룹의 구성원이면 허용 |
| POST | `/postUrl` | JWT | Content.Edit* | 사전 서명된 S3 업로드 URL 받기. *그룹 구성원도 허용. 콘텐츠 항목당 최대 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | 파일 삭제 및 저장소에서 제거. *그룹 구성원도 허용 |

## 갤러리 {#gallery}

기본 경로: `/content/gallery`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | 폴더의 스톡 사진 목록 조회 |
| GET | `/:folder` | JWT | Content.Edit | 폴더의 갤러리 이미지 목록 조회 |
| POST | `/requestUpload` | JWT | Content.Edit | 갤러리 이미지용 사전 서명된 S3 업로드 URL 받기 |
| DELETE | `/:folder/:image` | JWT | Content.Edit | 갤러리 이미지 삭제 |

## 성경 {#bibles}

기본 경로: `/content/bibles`

모든 성경 엔드포인트는 공개입니다(인증 불필요). 데이터는 외부 출처에서 가져와 로컬에 캐시합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | 모든 성경 번역본 목록 조회(캐시가 비어 있으면 출처에서 가져옴) |
| GET | `/stats?startDate=&endDate=` | Public | — | 날짜 범위의 성경 조회 통계 조회 |
| GET | `/availableTranslations/:source` | Public | — | 출처(예: api.bible)에서 사용 가능한 번역본 목록 조회 |
| GET | `/updateTranslations` | Public | — | 모든 출처의 번역본을 모두 동기화 |
| GET | `/updateTranslations/:source` | Public | — | 특정 출처의 번역본 동기화 |
| GET | `/updateCopyrights` | Public | — | 저작권 정보가 없는 번역본의 저작권 정보 업데이트 |
| GET | `/:translationKey/updateCopyright` | Public | — | 특정 번역본의 저작권 업데이트 |
| GET | `/:translationKey/search?query=&limit=` | Public | — | 번역본에서 구절 검색 |
| GET | `/:translationKey/books` | Public | — | 번역본의 책 목록 조회(로컬에 캐시) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | 책의 장 목록 조회(로컬에 캐시) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | 장의 절 목록 조회(로컬에 캐시) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | 범위의 구절 본문 조회. 조회 기록을 남김. 일부 번역본은 라이선스 때문에 캐시를 우회함 |

### 예시: 구절 본문 가져오기 {#example-get-verse-text}

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

## 찬양곡 {#songs}

기본 경로: `/content/songs`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | 검색어로 찬양곡 검색 |
| GET | `/:id` | JWT | — | ID로 찬양곡 조회 |
| GET | `/` | JWT | Content.Edit | 모든 찬양곡 목록 조회 |
| POST | `/` | JWT | Content.Edit | 찬양곡 생성 또는 업데이트(일괄) |
| POST | `/import` | JWT | — | FreeShow에서 찬양곡 가져오기(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 찬양곡 삭제 |

## 찬양곡 상세 정보 {#song-details}

기본 경로: `/content/songDetails`

찬양곡 상세 정보는 전역입니다(교회 범위가 아님). 교회들이 공유하는 표준 찬양곡 메타데이터를 나타냅니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 찬양곡 상세 정보 조회(전역) |
| GET | `/` | JWT | — | 교회의 찬양곡 상세 정보 목록 조회 |
| POST | `/create` | JWT | — | PraiseCharts ID로 찬양곡 상세 정보 생성(이미 생성되었다면 기존 항목 반환). PraiseCharts와 MusicBrainz에서 메타데이터를 자동으로 가져옴 |
| POST | `/` | JWT | — | 찬양곡 상세 정보 생성 또는 업데이트(일괄) |

## 찬양곡 상세 링크 {#song-detail-links}

기본 경로: `/content/songDetailLinks`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 찬양곡 상세 링크 조회 |
| GET | `/songDetail/:songDetailId` | JWT | — | 찬양곡 상세 정보의 모든 링크 조회 |
| POST | `/` | JWT | — | 찬양곡 상세 링크 생성 또는 업데이트(일괄). 연결된 경우 MusicBrainz 데이터를 자동으로 가져옴 |
| DELETE | `/:id` | JWT | — | 찬양곡 상세 링크 삭제 |

## 편곡 {#arrangements}

기본 경로: `/content/arrangements`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 편곡 조회 |
| GET | `/song/:songId` | JWT | Content.Edit | 찬양곡의 편곡 조회 |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | 찬양곡 상세 정보의 편곡 조회 |
| GET | `/` | JWT | Content.Edit | 모든 편곡 목록 조회 |
| POST | `/` | JWT | Content.Edit | 편곡 생성 또는 업데이트(일괄) |
| POST | `/freeShow/missing` | JWT | — | 교회에 없는 FreeShow ID 찾기. 본문: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | 편곡 삭제(키도 함께 삭제. 남은 편곡이 없으면 찬양곡도 삭제) |

## 편곡 키 {#arrangement-keys}

기본 경로: `/content/arrangementKeys`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | 프레젠터 보기를 위한 찬양곡 전체 데이터가 포함된 편곡 키 조회 |
| GET | `/:id` | JWT | — | ID로 편곡 키 조회 |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | 편곡의 키 조회 |
| GET | `/` | JWT | Content.Edit | 모든 편곡 키 목록 조회 |
| POST | `/` | JWT | Content.Edit | 편곡 키 생성 또는 업데이트(일괄) |
| DELETE | `/:id` | JWT | Content.Edit | 편곡 키 삭제 |

## 설정 {#settings}

기본 경로: `/content/settings`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 현재 사용자의 설정 조회 |
| GET | `/` | JWT | Settings.Edit | 교회의 모든 설정 조회 |
| GET | `/public/:churchId` | Public | — | 교회의 공개 설정 조회(키-값 쌍으로 반환) |
| POST | `/my` | JWT | — | 사용자 수준 설정 저장(base64 이미지 업로드 지원) |
| POST | `/` | JWT | Settings.Edit | 교회 수준 설정 저장(base64 이미지 업로드 지원) |
| DELETE | `/my/:id` | JWT | — | 사용자 설정 삭제 |

## 미리 보기 {#preview}

기본 경로: `/content/preview`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | 하위 도메인 키로 교회의 스트리밍 미리 보기 데이터(탭, 링크, 서비스, 설교) 조회 |

## 갤러리(스톡 사진) {#gallery-stock-photos}

기본 경로: `/content/stock`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Pexels 스톡 사진 검색. 본문: `{ term: "church" }` |

## PraiseCharts {#praisecharts}

기본 경로: `/content/praiseCharts`

예배 찬양곡 발견과 악보 다운로드를 위한 PraiseCharts 연동입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | 찬양곡의 PraiseCharts 원본 데이터 조회 |
| GET | `/hasAccount` | JWT | — | 사용자가 PraiseCharts 계정을 연결했는지 확인 |
| GET | `/search?q=` | JWT | — | PraiseCharts 카탈로그 검색 |
| GET | `/products/:id?keys=` | JWT | — | 찬양곡의 제품 조회(인증된 경우 라이브러리에서, 그렇지 않으면 카탈로그에서) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | 라이브러리에서 편곡 원본 데이터 조회 |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | PraiseCharts에서 파일(PDF 또는 ZIP) 다운로드. `{ redirectUrl }` 반환 |
| GET | `/authUrl?returnUrl=` | Public | — | PraiseCharts용 OAuth 인증 URL 조회 |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth 검증자를 액세스 토큰으로 교환하고 사용자 설정에 저장 |
| GET | `/library` | JWT | — | 사용자의 PraiseCharts 라이브러리 둘러보기 |

## 지원 {#support}

기본 경로: `/content/support`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | AWS Polly를 사용하여 SSML을 MP3 오디오로 변환. 본문: `{ ssml: "<speak>...</speak>" }` |

## 관련 문서 {#related-pages}

- [웹사이트 빌더 아키텍처](../../architecture/website-builder) -- 페이지, 섹션, 요소, 글, 리디렉션이 여러 앱에서 어떻게 연결되는지
- [Membership 엔드포인트](./membership) -- 사람, 교회, 그룹, 역할, 권한
- [출석 엔드포인트](./attendance) -- 예배 및 방문 추적
- [인증 및 권한](./authentication) -- 로그인 흐름, JWT, 권한 모델
- [모듈 구조](../module-structure) -- 코드 구성 패턴
