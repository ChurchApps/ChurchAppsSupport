---
title: "출석 엔드포인트"
---

# 출석 엔드포인트

<div class="article-intro">

출석 모듈은 캠퍼스 위치, 예배, 예배 시간, 출석 세션, 방문, 방문 세션을 관리합니다. 누가 어떤 예배 또는 그룹 모임에 참석했는지 추적하기 위한 인프라를 제공하고, 체크인 워크플로우를 지원하며, 출석 추세 및 요약 보고를 제공합니다.

</div>

**기본 경로:** `/attendance`

## 캠퍼스

기본 경로: `/attendance/campuses`

표준 CRUD 컨트롤러(GenericCrudController 확장). CRUD 기본 클래스를 통해 `getById`, `getAll`, `post`, `delete` 경로를 제공합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 교회의 모든 캠퍼스 나열 |
| GET | `/:id` | JWT | — | ID로 캠퍼스 가져오기 |
| POST | `/` | JWT | Services.Edit | 캠퍼스 만들기 또는 업데이트 |
| DELETE | `/:id` | JWT | Services.Edit | 캠퍼스 삭제 |

## 예배

기본 경로: `/attendance/services`

CRUD 경로 `getById`, `getAll`, `post`, `delete`로 GenericCrudController 확장. `getAll` (`GET /`) 및 `search` 엔드포인트는 사용자 정의 구현으로 재정의됩니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 예배 나열(캠퍼스 정보 포함) |
| GET | `/:id` | JWT | — | ID로 예배 가져오기 |
| GET | `/search?campusId=` | JWT | — | 캠퍼스 ID로 예배 검색 |
| POST | `/` | JWT | Services.Edit | 예배 만들기 또는 업데이트 |
| DELETE | `/:id` | JWT | Services.Edit | 예배 삭제 |

## 관련 페이지

- [회원 엔드포인트](./membership) — 사람, 그룹, 역할, 교회 관리
- [인증 및 권한](./authentication) — 로그인 흐름, JWT, 권한 모델
- [모듈 구조](../module-structure) — 코드 구성 패턴
