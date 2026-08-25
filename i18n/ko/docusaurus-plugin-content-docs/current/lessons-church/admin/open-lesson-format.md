---
title: "Open Lesson Format"
---
# Open Lesson Format
<div class="article-intro">
Open Lesson Format은 제3자 콘텐츠 제공자가 Lessons.church용 교육 과정을 게시할 수 있도록 하는 표준화된 JSON 스키마입니다. 이 형식으로 피드를 호스팅하는 모든 조직을 외부 제공자로 추가하여 기본 제공 라이브러리와 함께 콘텐츠를 탐색할 수 있습니다.
</div>

## 작동 방식

제공자는 두 가지 유형의 엔드포인트를 호스팅합니다:

1. **제공자 트리** — 프로그램, 스터디, 수업, 장소의 전체 카탈로그를 반환하는 하나의 URL입니다.
2. **장소 피드** — 각 장소당 하나의 URL로, 전체 수업 콘텐츠를 반환합니다.

교회가 Lessons.church에서 제공자 URL을 추가하면, 플랫폼은 사용 가능한 콘텐츠를 발견하기 위해 트리를 가져오고, 개별 장소 피드를 요청할 때 온디맨드로 가져옵니다.

## 제공자 트리

제공자 URL은 다음 구조의 JSON 객체를 반환해야 합니다:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [
        {
          "id": "study-1",
          "name": "The Beginning",
          "slug": "the-beginning",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "The Baptism of Jesus",
              "slug": "baptism-of-jesus",
              "bottomLine": "God keeps His promises.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
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

## 관련 페이지

- [프로그램 관리](./managing-programs.md)
- [수업 관리](./managing-lessons.md)
