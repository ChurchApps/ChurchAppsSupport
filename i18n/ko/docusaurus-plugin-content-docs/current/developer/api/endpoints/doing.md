---
title: "Doing 엔드포인트"
---

# Doing 엔드포인트

<div class="article-intro">

Doing 모듈은 예배 계획, 봉사자 일정 관리, 작업 관리, 자동화를 담당합니다. 시간과 포지션이 포함된 예배 계획 만들기, 봉사자 배정, 불가일(blockout date) 관리, 예배 순서 항목 구성, 외부 콘텐츠 제공자 연결, 조건과 액션을 갖춘 자동화 워크플로우 설정을 위한 도구를 제공합니다.

</div>

**기본 경로:** `/doing`

## Plans

기본 경로: `/doing/plans`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 계획 목록을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 계획을 가져옵니다 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획을 가져옵니다 |
| GET | `/types/:planTypeId` | JWT | — | 계획 유형별로 계획을 가져옵니다 |
| GET | `/presenter` | JWT | — | 향후 7일간의 계획을 가져옵니다(발표자 보기) |
| GET | `/public/current/:planTypeId` | Public | — | 계획 유형의 현재 계획을 가져옵니다 |
| GET | `/public/signup/:churchId` | Public | — | 자율 신청이 열려 있는 계획을 각 계획의 자율 신청 포지션(수락됨/미확인 배정의 `filledCount` 포함)과 시간과 함께 가져옵니다. 봉사자 이름은 포함되지 않습니다 |
| GET | `/signup/:planId/volunteers` | JWT | — | 계획의 자율 신청 포지션에 대한 `[{ positionId, names }]`입니다(수락됨/미확인 배정자의 표시 이름). 계획의 `showVolunteerNames`가 켜져 있지 않으면 `[]`를 반환합니다 |
| POST | `/` | JWT | — | 계획을 생성하거나 업데이트합니다(단일 객체 또는 배열 허용) |
| POST | `/copy/:id` | JWT | — | 포지션, 시간, 배정, 예배 순서 항목을 포함하여 계획을 복사합니다. 본문에는 `copyMode`("none", "positions", "all")와 `copyServiceOrder`(불리언)가 포함됩니다. `notes`와 `signupDeadlineHours`는 본문에서 제공하지 않으면 원본 계획에서 이어집니다 |
| POST | `/autofill/:id` | JWT | — | 계획의 봉사자 배정을 자동으로 채웁니다. 본문: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | 계획과 관련된 모든 시간, 배정, 포지션, 계획 항목을 삭제합니다 |

### 예시: 계획 복사

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Plan Types

기본 경로: `/doing/planTypes`

CRUD 기본 클래스를 확장합니다(GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — 권한 확인 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 계획 유형 목록을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 계획 유형을 가져옵니다 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 유형을 가져옵니다 |
| GET | `/ministryId/:ministryId` | JWT | — | 사역의 계획 유형을 가져옵니다 |
| POST | `/` | JWT | — | 계획 유형을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | — | 계획 유형을 삭제합니다 |

## Plan Items

기본 경로: `/doing/planItems`

부모-자식 트리 구조로 구성된 예배 순서 항목(헤더, 섹션, 찬양 등)을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 계획 항목을 가져옵니다 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 항목을 가져옵니다 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 계획 항목을 가져옵니다(트리 구조 반환) |
| GET | `/presenter/:churchId/:planId` | Public | — | 발표자 보기용 계획 항목을 가져옵니다(트리 구조 반환) |
| POST | `/` | JWT | — | 계획 항목을 생성하거나 업데이트합니다 |
| POST | `/sort` | JWT | — | 계획 항목의 정렬 순서를 업데이트합니다(형제 항목을 다시 정렬) |
| DELETE | `/:id` | JWT | — | 계획 항목을 삭제합니다 |

## Plan Feed

기본 경로: `/doing/planFeed`

발표자를 위한 계획 항목 피드를 제공합니다. 계획 항목이 없으면 계획의 `contentId`를 사용하여 Lessons.church 장소 피드에서 자동으로 채웁니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | 발표자용 계획 피드를 가져옵니다(비어 있으면 장소 피드에서 자동으로 채움) |

## Positions

기본 경로: `/doing/positions`

CRUD 기본 클래스를 확장합니다(GET `/:id`, POST `/`, DELETE `/:id` — 권한 확인 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 포지션을 가져옵니다 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 포지션을 가져옵니다 |
| GET | `/plan/ids?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 포지션을 가져옵니다 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 포지션을 가져옵니다 |
| POST | `/` | JWT | — | 포지션을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | — | 포지션을 삭제합니다 |

## Times

기본 경로: `/doing/times`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | 교회의 모든 시간 목록을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 시간을 가져옵니다 |
| GET | `/plans?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 시간을 가져옵니다 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 시간을 가져옵니다 |
| POST | `/` | JWT | — | 시간을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | — | 시간을 삭제합니다 |

## Assignments

기본 경로: `/doing/assignments`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 현재 사용자의 배정을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 배정을 가져옵니다 |
| GET | `/plan/ids?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 배정을 가져옵니다 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 배정을 가져옵니다 |
| POST | `/` | JWT | — | 배정을 생성하거나 업데이트합니다(상태 기본값은 "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | 배정을 수락합니다(배정된 본인이어야 함) |
| POST | `/decline/:id` | JWT | — | 배정을 거절합니다(배정된 본인이어야 함) |
| DELETE | `/:id` | JWT | — | 배정을 삭제합니다 |

### 예시: 배정 수락

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Blockout Dates

기본 경로: `/doing/blockoutDates`

CRUD 기본 클래스를 확장합니다(GET `/:id`, DELETE `/:id` — 권한 확인 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 불가일을 가져옵니다 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 불가일을 가져옵니다 |
| GET | `/my` | JWT | — | 현재 사용자의 불가일을 가져옵니다 |
| GET | `/upcoming` | JWT | — | 교회의 모든 예정된 불가일을 가져옵니다 |
| POST | `/` | JWT | — | 불가일을 생성하거나 업데이트합니다(personId가 제공되지 않으면 현재 사용자로 기본 설정) |
| DELETE | `/:id` | JWT | — | 불가일을 삭제합니다 |

## Tasks

기본 경로: `/doing/tasks`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 현재 사용자의 진행 중인 작업을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 작업을 가져옵니다 |
| GET | `/closed` | JWT | — | 현재 사용자의 완료된 작업을 가져옵니다 |
| GET | `/timeline?taskIds=` | JWT | — | 쉼표로 구분된 작업 ID로 작업의 타임라인 데이터를 가져옵니다 |
| GET | `/directoryUpdate/:personId` | JWT | — | 사람의 주소록 업데이트 작업을 가져옵니다 |
| POST | `/` | JWT | — | 작업을 생성하거나 업데이트합니다. 주소록 업데이트 작업을 처리하려면 `?type=directoryUpdate`를 추가합니다(사진 자동 업로드) |
| POST | `/loadForGroups` | JWT | — | 특정 그룹의 작업을 불러옵니다. 본문: `{ groupIds: [], status: "Open" }` |

## Automations

기본 경로: `/doing/automations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 자동화 목록을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 자동화를 가져옵니다 |
| GET | `/check` | Public | — | 모든 자동화에 대한 확인을 실행합니다 |
| POST | `/` | JWT | — | 자동화를 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | — | 자동화를 삭제합니다 |

## Actions

기본 경로: `/doing/actions`

액션은 자동화가 실행될 때 어떤 일이 일어나는지를 정의합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 액션을 가져옵니다 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 액션을 가져옵니다 |
| POST | `/` | JWT | — | 액션을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | — | 액션을 삭제합니다 |

## Conditions

기본 경로: `/doing/conditions`

조건은 자동화를 실행시키는 기준을 정의합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 조건을 가져옵니다 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 조건을 가져옵니다 |
| POST | `/` | JWT | — | 조건을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | — | 조건을 삭제합니다 |

## Conjunctions

기본 경로: `/doing/conjunctions`

접속(Conjunction)은 자동화에서 여러 조건을 서로 연결합니다(AND/OR 논리).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 접속을 가져옵니다 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 접속을 가져옵니다 |
| POST | `/` | JWT | — | 접속을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | — | 접속을 삭제합니다 |

## Content Provider Auths

기본 경로: `/doing/contentProviderAuths`

CRUD 기본 클래스를 확장합니다(GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — 권한 확인 없음).

외부 콘텐츠 제공자(예: 프레젠테이션 소프트웨어 연동)의 OAuth 인증 레코드를 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 콘텐츠 제공자 인증 목록을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 콘텐츠 제공자 인증을 가져옵니다 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 콘텐츠 제공자 인증을 가져옵니다 |
| GET | `/ministry/:ministryId` | JWT | — | 사역의 모든 콘텐츠 제공자 인증을 가져옵니다 |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | 특정 사역과 제공자의 인증 레코드를 가져옵니다 |
| POST | `/` | JWT | — | 콘텐츠 제공자 인증을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | — | 콘텐츠 제공자 인증을 삭제합니다 |

## Provider Proxy

기본 경로: `/doing/providerProxy`

외부 콘텐츠 제공자(예: ProPresenter, EasyWorship)로 요청을 프록시합니다. 토큰이 만료되면 자동으로 토큰을 갱신합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | 콘텐츠 제공자의 파일을 탐색합니다. 본문: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | 콘텐츠 제공자에서 프레젠테이션을 가져옵니다. 본문: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | 콘텐츠 제공자에서 재생목록을 가져옵니다. 본문: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | 콘텐츠 항목의 지침을 가져옵니다. 본문: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | 콘텐츠 항목의 확장된 지침을 가져옵니다. 본문: `{ ministryId, providerId, path }` |

## 관련 페이지

- [Membership 엔드포인트](./membership) — 사람, 그룹, 역할, 권한
- [출석 엔드포인트](./attendance) — 예배 및 방문 추적
- [모듈 구조](../module-structure) — 코드 구성 패턴
