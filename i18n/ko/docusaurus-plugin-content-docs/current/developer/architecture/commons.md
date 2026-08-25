---
title: "콘텐츠 커먼즈"
---
# 콘텐츠 커먼즈 — 공유 자산 라이브러리 & 조정

사용자가 제출한 콘텐츠는 제품별 검토 흐름이 아니라 하나의 조정 큐를 거칩니다.

## 자산 척추

두 테이블은 모든 커먼즈 항목을 수행합니다:

- **`assets`** — 공개 신원 행. `status`: `pending` | `published` | `unpublished` | `removed`.
- **`assetFiles`** — 자산에 첨부된 모든 파일.
- **`submissions`** — 조정 단위. 생명 주기: `draft → pending → approved | rejected | withdrawn`.

## 제출 흐름

`CommonsSubmissionController` (`Api/src/modules/commons/`)는 사용자 대면 API입니다: 초안 생성, 파일 첨부, 검토를 위해 제출, 또는 철회.

## 조정 큐

큐는 **B1Admin → 서버 관리자 → 커먼즈** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`)에 있습니다.

3개의 하위 탭:

- **큐** — 모든 제품의 보류 중인 모든 제출, 제품/자산 유형별로 필터링 가능
- **보고** — 게시된 자산에 대한 저작권 및 정책/품질 보고
- **자산** — 게시된 콘텐츠의 검색 가능한 브라우저

## 범위

Api (커먼즈 모듈), B1Admin (서버 관리자), 외부 제작자 사이트: WorshipCommons, Lessons.church, FreeShow, B1 웹사이트 빌더 템플릿.
