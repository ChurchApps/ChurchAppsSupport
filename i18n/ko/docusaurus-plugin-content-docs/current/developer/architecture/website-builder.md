---
title: "웹사이트 빌더 아키텍처"
---
# 웹사이트 빌더 아키텍처
<div class="article-intro">
B1App이 제공하는 모든 교회 웹사이트는 콘텐츠 API에 저장되고 B1Admin에서 시각적으로 편집되는 콘텐츠 트리에서 렌더링됩니다. 하나의 공유 구성 요소 라이브러리는 편집기 미리보기와 라이브 사이트를 모두 렌더링합니다.
</div>

## 개요

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — 편집기            │             │  Api — /content 모듈                   │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements blocks    │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings  styles   │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │
           │        공유 렌더 파이프라인                     ▼
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — 공개 사이트            │
               │    ElementTypes.ts            │   │  Zone → Section → Element        │
               │  @churchapps/apphelper        │   │  + 위젯, JSON-LD, 사이트맵      │
               │    ElementRegistry, 렌더러   │   │    리다이렉트, 브랜드된 404      │
               │    SectionDivider, 위젯      │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/*         │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  교회 데이터 요소들                    │
│  generateAltText · metaDesc  │             │  /giving/funds/public/…/total         │
│  JSON 반환; B1Admin이 저장  │             │  /membership/groupmembers/public/…    │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

## 콘텐츠 트리

콘텐츠 모듈(`Api/src/modules/content`)이 빌더의 데이터를 소유합니다:

| 테이블 | 역할 |
|-------|------|
| `pages` | 각 URL당 하나의 페이지 |
| `sections` | 페이지의 가로 밴드 |
| `elements` | 섹션 내의 콘텐츠 조각 |
| `blocks` | 재사용 가능한 섹션/요소 그룹 |
| `posts` | 독립형 블로그 포스트 |
| `redirects` | `fromPath → toPath` 쌍 |
| `settings` | 키-값 교회 설정 |

## 요소 카탈로그

`Packages/helpers/src/ElementTypes.ts`는 35개 요소 타입을 정의합니다:

| 카테고리 | 요소 타입 |
|----------|---------|
| 레이아웃 (6) | 행, 열, 상자, 캐러셀, 공백, 블록 |
| 콘텐츠 (11) | 텍스트, 사진 포함 텍스트, 카드, FAQ, 아이콘 기능, 추천, 소셜 아이콘 등 |
| 미디어 (4) | 이미지, 갤러리, 비디오, 지도 |
| 교회 (12) | 로고, 설교, 스트림, 기부금, 양식, 달력, 그룹 목록, 캠페인 진행률 등 |
| 고급 (2) | 원시 HTML, iframe |

## 관련 페이지

- [웹사이트 라우팅 & 다중 사이트](./websites)
- [콘텐츠 엔드포인트](../api/endpoints/content)
- [AppHelper](../shared-libraries/app-helper)
