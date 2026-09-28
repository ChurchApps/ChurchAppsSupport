---
title: "콘텐츠 엔드포인트"
---

# 콘텐츠 엔드포인트

<div class="article-intro">

콘텐츠 모듈은 웹사이트 페이지, 섹션, 엘리먼트, 블록, 블로그 게시물, 리다이렉트, 설교, 재생목록, 스트리밍 서비스, 이벤트, 큐레이션된 캘린더, 파일, 갤러리, 성경 번역 및 절 검색, 노래, 배치, 글로벌 스타일, 스톡 사진 및 설정을 관리합니다. API에서 가장 큰 모듈이며 모든 ChurchApps 애플리케이션에서 CMS, 미디어/스트리밍, 예배 계획 및 성경 기능을 제공합니다.

</div>

**기본 경로:** `/content`

## 페이지

기본 경로: `/content/pages`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | URL 또는 ID로 전체 페이지 트리(섹션, 엘리먼트, 블록) 로드. URL로 가져올 때는 내부 ID 제거. URL 기반 가져오기는 `pages.visibility`를 적용 — 게이트된 페이지는 (선택적) JWT가 게이트를 만족하지 않으면 `{ restricted: true, visibility }`를 반환 |
| GET | `/public/:churchId` | Public | — | 공개 페이지 나열(`url`, `title`, `metaDescription`); `visibility = everyone`만 해당 |
| GET | `/:id` | JWT | — | ID로 페이지 가져오기 |
| GET | `/` | JWT | — | 교회의 모든 페이지 나열 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 모든 섹션 및 엘리먼트와 함께 페이지 복제 |
| POST | `/temp/ai` | JWT | Content.Edit | AI 생성 페이지 저장(한 번의 호출로 페이지, 섹션 및 엘리먼트) |
| POST | `/importTree` | JWT | Content.Edit | 중첩된 트리에서 페이지 생성(`title`, `url`, `sections[].elements[]…`). 항상 호출자의 교회 아래에 삽입; 본문의 id는 무시됨. 행에는 `column` 자식이 포함되어야 함. 최대 30개 섹션 / 500개 엘리먼트 |
| POST | `/` | JWT | Content.Edit | 페이지 생성 또는 업데이트(배치) |
| DELETE | `/:id` | JWT | Content.Edit | 페이지 삭제 |

### 예시: 페이지 트리 로드

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

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 섹션 가져오기 |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | 섹션 복제 또는 재사용 가능한 블록으로 변환 |
| POST | `/` | JWT | Content.Edit | 섹션 생성 또는 업데이트(배치). 자동으로 정렬 순서 업데이트 |
| DELETE | `/:id` | JWT | Content.Edit | 섹션 삭제(자동으로 정렬 순서 업데이트) |

## 엘리먼트

기본 경로: `/content/elements`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 엘리먼트 가져오기 |
| POST | `/duplicate/:id` | JWT | Content.Edit | 모든 자식이 있는 엘리먼트 복제 |
| POST | `/` | JWT | Content.Edit | 엘리먼트 생성 또는 업데이트(배치). 자동으로 행 열 및 캐러셀 슬라이드 관리 |
| DELETE | `/:id` | JWT | Content.Edit | 엘리먼트 삭제 |

## 블록

기본 경로: `/content/blocks`

기본 클래스에서 표준 CRUD 확장(GET `/:id`, GET `/`, POST `/`, DELETE `/:id`는 쓰기 권한으로 Content.Edit).

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 블록 가져오기 |
| GET | `/` | JWT | — | 모든 블록 나열 |
| GET | `/:churchId/tree/:id` | Public | — | 섹션 및 엘리먼트가 있는 전체 블록 트리 로드 |
| GET | `/blockType/:blockType` | JWT | — | 유형별로 블록 로드(예: footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | 교회의 바닥글 블록 트리 로드 |
| POST | `/` | JWT | Content.Edit | 블록 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Content.Edit | 블록 삭제 |

## 링크

기본 경로: `/content/links`

기본 클래스에서 표준 CRUD 확장(GET `/:id`, GET `/`, POST `/`, DELETE `/:id`는 쓰기 권한으로 Content.Edit).

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 링크 가져오기 |
| GET | `/` | JWT | — | 모든 링크 나열. 선택적 `?category=` 필터. 저장 후 자동 정렬 |
| GET | `/church/:churchId/filtered?category=` | JWT | — | 표시 여부별 필터링된 링크 로드(모두, 방문자, 회원, 직원, 그룹) |
| GET | `/church/:churchId?category=` | Public | — | 카테고리별로 교회의 링크 로드(공개) |
| POST | `/` | JWT | Content.Edit | 링크 생성 또는 업데이트(배치). 카테고리별로 자동 정렬 |
| DELETE | `/:id` | JWT | Content.Edit | 링크 삭제 |

## 글로벌 스타일

기본 경로: `/content/globalStyles`

기본 클래스에서 표준 CRUD 확장(POST `/`, DELETE `/:id`는 쓰기 권한으로 Content.Edit).

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | 교회의 글로벌 스타일 로드(설정되지 않은 경우 기본값 반환) |
| GET | `/` | JWT | — | 인증된 교회의 글로벌 스타일 로드 |
| POST | `/` | JWT | Content.Edit | 글로벌 스타일 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Content.Edit | 글로벌 스타일 삭제 |

## 페이지 기록

기본 경로: `/content/pageHistory`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | 페이지의 기록 항목 나열 |
| GET | `/block/:blockId` | JWT | Content.Edit | 블록의 기록 항목 나열 |
| GET | `/:id` | JWT | Content.Edit | ID로 기록 항목 가져오기 |
| POST | `/` | JWT | Content.Edit | 페이지/블록 스냅샷 저장. 30일이 지난 항목을 주기적으로 정리 |
| POST | `/restore/:id` | JWT | Content.Edit | 기록 스냅샷에서 페이지/블록 복원(현재 콘텐츠 삭제 및 스냅샷에서 재생성) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | 인라인 스냅샷 객체에서 복원. 본문: `{ pageId, blockId, snapshot }` |

## 게시물(블로그)

기본 경로: `/content/posts`

블로그 게시물은 독립 실행형 행입니다: `title`, `slug`(교회당 고유), `excerpt`, `content`(마크다운 본문), `authorId`, `photoUrl`, `publishDate`, `category` 및 `tags`. 게시물은 `publishDate`가 설정되고 과거일 때 게시됩니다. 읽기 엔드포인트는 `authorId`에서 확인된 `authorName`으로 각 게시물을 보강합니다. [웹사이트 빌더 아키텍처](../../architecture/website-builder#blog)를 참조하세요.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | 게시된 게시물 나열, 페이지 매김(페이지당 최대 50개) |
| GET | `/public/:churchId/categories` | Public | — | 게시된 게시물의 고유 카테고리 |
| GET | `/public/:churchId/slug/:slug` | Public | — | 슬러그별 게시된 게시물 가져오기 |
| GET | `/rss/:churchId?siteUrl=` | Public | — | 게시된 게시물의 RSS 2.0 피드(`{siteUrl}/blog/{slug}`로 링크 작성) |
| GET | `/:id` | JWT | — | ID로 게시물 가져오기 |
| GET | `/` | JWT | — | 교회의 모든 게시물 나열 |
| POST | `/` | JWT | Content.Edit | 게시물 생성 또는 업데이트(배치) |
| DELETE | `/:id` | JWT | Content.Edit | 게시물 삭제 |

## 리다이렉트

기본 경로: `/content/redirects`

교회별 URL 리다이렉트(`fromPath` → `toPath`), 교회당 200개로 제한. 경로는 정규화되고(소문자, 선행 슬래시, 후행 슬래시 없음) `fromPath`는 교회별로 고유합니다. B1App은 발생할 404에서 이를 확인하고 HTTP 308을 발급합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | 경로 확인(또는 `path`를 생략할 때 모든 리다이렉트 나열) |
| GET | `/:id` | JWT | — | ID로 리다이렉트 가져오기 |
| GET | `/` | JWT | — | 교회의 모든 리다이렉트 나열 |
| POST | `/` | JWT | Content.Edit | 리다이렉트 생성 또는 업데이트. `fromPath = toPath` 거부 및 200행 제한 적용 |
| DELETE | `/:id` | JWT | Content.Edit | 리다이렉트 삭제 |

## 설교

기본 경로: `/content/sermons`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | 샘플 FreeShow 재생목록 구조 가져오기 |
| GET | `/public/tvWrapper/:churchId` | JWT | — | 설교, 강의 및 FreeShow 소스가 있는 TV 앱 래퍼 가져오기 |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | 단일 설교를 TV 피드 재생목록으로 가져오기 |
| GET | `/public/tvFeed/:churchId` | Public | — | 모든 공개 재생목록/설교를 TV 피드로 가져오기 |
| GET | `/public/:churchId` | Public | — | 교회의 모든 공개 설교 나열 |
| GET | `/timeline?sermonIds=` | JWT | — | 설교의 타임라인 데이터 로드 |
| GET | `/lookup?videoType=&videoData=` | Public | — | YouTube 또는 Vimeo에서 설교 메타데이터 검색 |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | 설교 자막에서 AI 소셜 미디어 게시물 제안 생성 |
| GET | `/outline?url=&title=&author=` | JWT | — | URL에서 AI 강의 개요 생성 |
| GET | `/youtubeImport/:channelId` | JWT | — | YouTube 채널에서 동영상 가져오기 |
| GET | `/vimeoImport/:channelId` | JWT | — | Vimeo 채널에서 동영상 가져오기 |
| GET | `/:id` | JWT | — | ID로 설교 가져오기 |
| GET | `/` | JWT | — | 모든 설교 나열 |
| POST | `/` | JWT | StreamingServices.Edit | 설교 생성 또는 업데이트(배치, base64 축소판 업로드 지원) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 설교 삭제 |

### 예시: YouTube 설교 검색

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

## 재생목록

기본 경로: `/content/playlists`

기본 클래스에서 표준 CRUD 확장(GET `/:id`, GET `/`, DELETE `/:id`는 쓰기 권한으로 StreamingServices.Edit).

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 재생목록 가져오기 |
| GET | `/` | JWT | — | 모든 재생목록 나열 |
| GET | `/public/:churchId` | Public | — | 교회의 모든 공개 재생목록 나열 |
| POST | `/` | JWT | StreamingServices.Edit | 재생목록 생성 또는 업데이트(배치, base64 축소판 업로드 지원) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 재생목록 삭제 |

## 스트리밍 서비스

기본 경로: `/content/streamingServices`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | 서비스의 암호화된 호스트 채팅 방 ID 가져오기 |
| GET | `/` | JWT | — | 모든 스트리밍 서비스 나열. 자동으로 만료된 비반복 서비스를 정리하고 반복 서비스를 진행 |
| POST | `/` | JWT | StreamingServices.Edit | 스트리밍 서비스 생성 또는 업데이트(배치) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | 스트리밍 서비스 삭제(차단된 IP도 지우기) |

## 이벤트

기본 경로: `/content/events`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | 그룹의 타임라인 이벤트 로드 |
| GET | `/timeline?eventIds=` | JWT | — | 현재 사용자의 그룹의 타임라인 이벤트 로드 |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | 이벤트를 ICS 캘린더 피드로 구독 |
| GET | `/group/:groupId` | JWT | — | 그룹의 이벤트 가져오기(예외 날짜 포함) |
| GET | `/public/group/:churchId/:groupId` | Public | — | 그룹의 공개 이벤트 가져오기 |
| GET | `/:id` | JWT | — | ID로 이벤트 가져오기 |
| POST | `/` | JWT | — | 이벤트 생성 또는 업데이트(배치) |
| DELETE | `/:id` | JWT | Content.Edit | 이벤트 삭제 |

## 이벤트 예외

기본 경로: `/content/eventExceptions`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 이벤트 예외 가져오기 |
| POST | `/` | JWT | Content.Edit | 이벤트 예외 생성 또는 업데이트(배치) |
| DELETE | `/:id` | JWT | Content.Edit | 이벤트 예외 삭제 |

## 큐레이션된 캘린더

기본 경로: `/content/curatedCalendars`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 큐레이션된 캘린더 가져오기 |
| GET | `/` | JWT | — | 모든 큐레이션된 캘린더 나열 |
| POST | `/` | JWT | Content.Edit | 큐레이션된 캘린더 생성 또는 업데이트(배치) |
| DELETE | `/:id` | JWT | Content.Edit | 큐레이션된 캘린더 삭제 |

## 큐레이션된 이벤트

기본 경로: `/content/curatedEvents`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | 캘린더의 큐레이션된 이벤트 가져오기(`?withoutEvents`가 설정되지 않으면 이벤트 세부 정보 및 예외 날짜 포함) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | 캘린더의 공개 큐레이션된 이벤트 가져오기 |
| GET | `/:id` | JWT | — | ID로 큐레이션된 이벤트 가져오기 |
| GET | `/` | JWT | — | 모든 큐레이션된 이벤트 나열 |
| POST | `/` | JWT | Content.Edit | 큐레이션된 이벤트 생성 또는 업데이트. 특정 그룹 이벤트를 추가하는 `eventIds` 배열 지원 |
| DELETE | `/:id` | JWT | Content.Edit | 큐레이션된 이벤트 삭제 |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | 큐레이션된 캘린더에서 특정 이벤트 제거 |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | 큐레이션된 캘린더에서 그룹의 모든 이벤트 제거 |

## 파일

기본 경로: `/content/files`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | 콘텐츠 유형 및 콘텐츠 ID별로 파일 가져오기 |
| GET | `/` | JWT | — | 교회 웹사이트의 모든 파일 나열 |
| GET | `/:id` | JWT | — | ID로 파일 가져오기 |
| POST | `/` | JWT | Content.Edit* | 파일 업로드(base64). *`contentId`와 일치하는 그룹의 멤버인 경우에도 허용 |
| POST | `/postUrl` | JWT | Content.Edit* | 사전 서명된 S3 업로드 URL 가져오기. *그룹 멤버도 허용. 콘텐츠 항목당 최대 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | 파일 삭제 및 저장소에서 제거. *그룹 멤버도 허용 |

## 갤러리

기본 경로: `/content/gallery`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | 폴더의 스톡 사진 나열 |
| GET | `/:folder` | JWT | Content.Edit | 폴더의 갤러리 이미지 나열 |
| POST | `/requestUpload` | JWT | Content.Edit | 갤러리 이미지의 사전 서명된 S3 업로드 URL 가져오기 |
| DELETE | `/:folder/:image` | JWT | Content.Edit | 갤러리 이미지 삭제 |

## 성경

기본 경로: `/content/bibles`

모든 성경 엔드포인트는 공개입니다(인증 필요 없음). 데이터는 외부 소스에서 가져오고 로컬로 캐시됩니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | 모든 성경 번역 나열(캐시가 비어 있으면 소스에서 가져오기) |
| GET | `/stats?startDate=&endDate=` | Public | — | 날짜 범위의 성경 검색 통계 가져오기 |
| GET | `/availableTranslations/:source` | Public | — | 소스의 사용 가능한 번역 나열(예: api.bible) |
| GET | `/updateTranslations` | Public | — | 모든 소스의 모든 번역 동기화 |
| GET | `/updateTranslations/:source` | Public | — | 특정 소스의 번역 동기화 |
| GET | `/updateCopyrights` | Public | — | 저작권이 없는 번역의 저작권 정보 업데이트 |
| GET | `/:translationKey/updateCopyright` | Public | — | 특정 번역의 저작권 업데이트 |
| GET | `/:translationKey/search?query=&limit=` | Public | — | 번역에서 절 검색 |
| GET | `/:translationKey/books` | Public | — | 번역의 책 가져오기(로컬로 캐시) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | 책의 장 가져오기(로컬로 캐시) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | 장의 절 가져오기(로컬로 캐시) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | 범위의 절 텍스트 가져오기. 검색을 기록합니다. 일부 번역은 라이선싱을 위해 캐싱 무시 |

### 예시: 절 텍스트 가져오기

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

## 노래

기본 경로: `/content/songs`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | 쿼리로 노래 검색 |
| GET | `/:id` | JWT | — | ID로 노래 가져오기 |
| GET | `/` | JWT | Content.Edit | 모든 노래 나열 |
| POST | `/` | JWT | Content.Edit | 노래 생성 또는 업데이트(배치) |
| POST | `/import` | JWT | — | FreeShow에서 노래 가져오기(배치) |
| DELETE | `/:id` | JWT | Content.Edit | 노래 삭제 |

## 노래 세부 정보

기본 경로: `/content/songDetails`

노래 세부 정보는 전역이며(교회 범위 지정 없음), 교회 전체에서 공유되는 표준 노래 메타데이터를 나타냅니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 노래 세부 정보 가져오기(전역) |
| GET | `/` | JWT | — | 교회의 노래 세부 정보 나열 |
| POST | `/create` | JWT | — | PraiseCharts ID에서 노래 세부 정보 생성(이미 생성되었으면 기존 반환). PraiseCharts 및 MusicBrainz에서 메타데이터 자동 가져오기 |
| POST | `/` | JWT | — | 노래 세부 정보 생성 또는 업데이트(배치) |

## 노래 세부 정보 링크

기본 경로: `/content/songDetailLinks`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 노래 세부 정보 링크 가져오기 |
| GET | `/songDetail/:songDetailId` | JWT | — | 노래 세부 정보의 모든 링크 가져오기 |
| POST | `/` | JWT | — | 노래 세부 정보 링크 생성 또는 업데이트(배치). 링크된 경우 MusicBrainz 데이터 자동 가져오기 |
| DELETE | `/:id` | JWT | — | 노래 세부 정보 링크 삭제 |

## 배치

기본 경로: `/content/arrangements`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 배치 가져오기 |
| GET | `/song/:songId` | JWT | Content.Edit | 노래의 배치 가져오기 |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | 노래 세부 정보의 배치 가져오기 |
| GET | `/` | JWT | Content.Edit | 모든 배치 나열 |
| POST | `/` | JWT | Content.Edit | 배치 생성 또는 업데이트(배치) |
| POST | `/freeShow/missing` | JWT | — | 교회에 존재하지 않는 FreeShow ID 찾기. 본문: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | 배치 삭제(키도 삭제; 배치가 남지 않으면 노래 삭제) |

## 배치 키

기본 경로: `/content/arrangementKeys`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | 발표자 보기의 전체 노래 데이터가 있는 배치 키 가져오기 |
| GET | `/:id` | JWT | — | ID로 배치 키 가져오기 |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | 배치의 키 가져오기 |
| GET | `/` | JWT | Content.Edit | 모든 배치 키 나열 |
| POST | `/` | JWT | Content.Edit | 배치 키 생성 또는 업데이트(배치) |
| DELETE | `/:id` | JWT | Content.Edit | 배치 키 삭제 |

## 설정

기본 경로: `/content/settings`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 현재 사용자의 설정 가져오기 |
| GET | `/` | JWT | Settings.Edit | 교회의 모든 설정 가져오기 |
| GET | `/public/:churchId` | Public | — | 교회의 공개 설정 가져오기(키-값 쌍으로 반환) |
| POST | `/my` | JWT | — | 사용자 수준 설정 저장(base64 이미지 업로드 지원) |
| POST | `/` | JWT | Settings.Edit | 교회 수준 설정 저장(base64 이미지 업로드 지원) |
| DELETE | `/my/:id` | JWT | — | 사용자 설정 삭제 |

## 미리보기

기본 경로: `/content/preview`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | 하위 도메인 키별로 교회의 스트리밍 미리보기 데이터 로드(탭, 링크, 서비스, 설교) |

## 갤러리(스톡 사진)

기본 경로: `/content/stock`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Pexels 스톡 사진 검색. 본문: `{ term: "church" }` |

## PraiseCharts

기본 경로: `/content/praiseCharts`

예배 노래 발견 및 악보 다운로드를 위한 PraiseCharts와의 통합.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | 노래의 원본 PraiseCharts 데이터 가져오기 |
| GET | `/hasAccount` | JWT | — | 사용자가 연결된 PraiseCharts 계정을 가지고 있는지 확인 |
| GET | `/search?q=` | JWT | — | PraiseCharts 카탈로그 검색 |
| GET | `/products/:id?keys=` | JWT | — | 노래의 제품 가져오기(인증된 경우 라이브러리, 그렇지 않으면 카탈로그) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | 라이브러리의 원본 배치 데이터 가져오기 |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | PraiseCharts에서 파일 다운로드(PDF 또는 ZIP). `{ redirectUrl }`를 반환 |
| GET | `/authUrl?returnUrl=` | Public | — | PraiseCharts의 OAuth 인증 URL 가져오기 |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth 검증 프로그램을 액세스 토큰으로 교환하고 사용자 설정에 저장 |
| GET | `/library` | JWT | — | 사용자의 PraiseCharts 라이브러리 탐색 |

## 지원

기본 경로: `/content/support`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | AWS Polly를 사용하여 SSML을 MP3 오디오로 변환. 본문: `{ ssml: "<speak>...</speak>" }` |

## 관련 페이지

- [웹사이트 빌더 아키텍처](../../architecture/website-builder) -- 페이지, 섹션, 엘리먼트, 게시물 및 리다이렉트가 앱 전체에서 어떻게 함께 작동하는지
- [멤버십 엔드포인트](./membership) -- 사람, 교회, 그룹, 역할, 권한
- [출석 엔드포인트](./attendance) -- 서비스 및 방문 추적
- [인증 및 권한](./authentication) -- 로그인 흐름, JWT, 권한 모델
- [모듈 구조](../module-structure) -- 코드 조직 패턴
