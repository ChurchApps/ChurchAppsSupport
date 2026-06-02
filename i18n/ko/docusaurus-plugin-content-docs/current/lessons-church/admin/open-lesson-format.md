---
title: "공개 수업 형식"
---

# 공개 수업 형식

<div class="article-intro">

공개 수업 형식은 타사 콘텐츠 제공자가 Lessons.church의 커리큘럼을 게시할 수 있게 하는 표준화된 JSON 스키마입니다. 이 형식으로 피드를 호스팅하는 모든 조직을 외부 제공자로 추가할 수 있으므로 콘텐츠가 기본 제공 라이브러리와 함께 탐색하고 재생할 수 있습니다.

</div>

## 작동 방식

제공자는 두 가지 유형의 끝점을 호스팅합니다:

1. **제공자 트리** -- 프로그램, 연구, 수업, 장소의 전체 카탈로그를 반환하는 단일 URL. 각 장소는 상세한 수업 콘텐츠를 가리키는 피드 URL을 포함합니다.
2. **장소 피드** -- 장소당 하나의 URL로 전체 수업 콘텐츠(섹션, 작업, 미디어 파일)를 반환합니다.

교회가 Lessons.church에서 제공자 URL을 추가할 때 플랫폼이 트리를 가져와 사용 가능한 콘텐츠를 발견한 후 요청 시 개별 장소 피드를 가져옵니다.

## 제공자 트리

제공자 URL은 다음 구조의 JSON 객체를 반환해야 합니다:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "마가복음",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "마가복음을 통한 12주 연구.",
      "studies": [
        {
          "id": "study-1",
          "name": "시작",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "예수의 세례",
              "slug": "baptism-of-jesus",
              "title": "예수의 세례",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "예수님의 사역 소개.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "어린이",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "성인",
                  "apiUrl": "https://example.com/feed/venues/venue-2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### 트리 필드

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| `programs[].id` | string | 고유 프로그램 식별자 |
| `programs[].name` | string | 표시 이름 |
| `programs[].slug` | string | URL 친화적 이름 |
| `programs[].image` | string | 프로그램 이미지 URL (선택) |
| `programs[].about` | string | 설명 (선택) |
| `studies[].id` | string | 고유 연구 식별자 |
| `studies[].name` | string | 표시 이름 |
| `studies[].slug` | string | URL 친화적 이름 |
| `studies[].image` | string | 연구 이미지 URL (선택) |
| `lessons[].id` | string | 고유 수업 식별자 |
| `lessons[].name` | string | 표시 이름 |
| `lessons[].slug` | string | URL 친화적 이름 |
| `lessons[].title` | string | 전체 제목 |
| `lessons[].image` | string | 수업 이미지 URL (선택) |
| `lessons[].description` | string | 수업 요약 (선택) |
| `venues[].id` | string | 고유 장소 식별자 |
| `venues[].name` | string | 장소 이름 (예: "어린이", "성인", "청소년") |
| `venues[].apiUrl` | string | 장소 피드를 반환하는 URL |

**장소**는 다양한 청중(연령대, 설정 등)을 위해 맞춤형으로 제작된 동일한 수업의 다양한 버전을 나타냅니다.

## 장소 피드

각 장소의 `apiUrl`은 다음 스키마와 일치하는 JSON 객체를 반환해야 합니다.

### 피드 필드

#### 루트 객체

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| `id` | string | 장소 식별자 |
| `name` | string | 장소 이름 |
| `lessonId` | string | 수업 식별자 |
| `lessonName` | string | 수업 표시 이름 |
| `lessonImage` | string | 수업 이미지 URL |
| `lessonDescription` | string | 수업 요약 |
| `studyName` | string | 상위 연구 이름 |
| `studySlug` | string | 상위 연구 슬래그 |
| `programName` | string | 상위 프로그램 이름 |
| `programSlug` | string | 상위 프로그램 슬래그 |
| `programAbout` | string | 프로그램 설명 |
| `downloads` | array | 다운로드 가능한 파일 번들 |
| `sections` | array | 정렬된 수업 섹션 |

#### 섹션

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| `id` | string | 섹션 식별자 |
| `name` | string | 섹션 제목 |
| `sort` | number | 표시 순서 |
| `materials` | string | 자료 또는 준비 참고 (선택) |
| `actions` | array | 이 섹션 내의 정렬된 작업 |

#### 작업

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| `id` | string | 작업 식별자 |
| `actionType` | string | 다음 중 하나: play, text, question, quote, subhead |
| `content` | string | 텍스트 콘텐츠 또는 미디어 레이블 |
| `sort` | number | 표시 순서 |
| `role` | string | 역할 이름 (선택) |
| `roleId` | string | 역할 식별자 (선택) |
| `files` | array | play 작업을 위한 미디어 파일 (선택) |

#### 파일

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| `id` | string | 파일 식별자 |
| `name` | string | 파일 이름 |
| `url` | string | 직접 다운로드 URL |
| `streamUrl` | string | 스트리밍 URL (선택) |
| `fileType` | string | MIME 유형 |
| `seconds` | number | 오디오/비디오 지속 시간(초) (선택) |
| `bytes` | number | 파일 크기(바이트) (선택) |
| `thumbnail` | string | 썸네일 이미지 URL (선택) |
| `loop` | boolean | 미디어 루프 여부 (선택, 기본값 false) |

#### 다운로드

| 필드 | 유형 | 설명 |
|-------|------|-------------|
| `name` | string | 다운로드 번들 이름 |
| `files` | array | 이 번들의 파일 |

## 작업 유형

| 유형 | 목적 |
|------|---------|
| `play` | 미디어 재생 -- 비디오, 오디오 또는 슬라이드쇼 |
| `text` | 정적 텍스트 콘텐츠 |
| `question` | 토론 또는 성찰 질문 |
| `quote` | 인용문 또는 성경 구절 |
| `subhead` | 제목 또는 구분선 |

:::tip
작동하는 피드의 예를 보려면 `https://api.lessons.church/lessons/public/tree`에서 기본 제공 Lessons.church 콘텐츠 트리를 보고 임의의 장소 피드 URL을 가져올 수 있습니다.
:::
