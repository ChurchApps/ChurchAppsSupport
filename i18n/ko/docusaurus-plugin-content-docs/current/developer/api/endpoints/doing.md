---
title: "Doing 엔드포인트"
---

# Doing 엔드포인트

<div class="article-intro">

Doing 모듈은 예배 계획, 봉사자 일정, 작업 관리, 자동화를 담당합니다. 시간과 포지션이 포함된 예배 계획 생성, 봉사자 배정, 블록아웃 날짜 관리, 예배 순서 항목 구성, 외부 콘텐츠 제공업체 연결, 조건과 동작이 있는 자동화 워크플로 설정을 위한 도구를 제공합니다.

</div>

**기본 경로:** `/doing`

## 계획

기본 경로: `/doing/plans`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 교회의 모든 계획을 나열 |
| GET | `/:id` | JWT | — | ID로 계획 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 조회 |
| GET | `/types/:planTypeId` | JWT | — | 계획 유형별 계획 조회 |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + 사역 편집 | 서비스 개요의 **Text Volunteers** 발송 미리보기: 범위 내 배정된 봉사자에 대해 `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` 반환(사람당 한 명, 수신 거부 및 번호 없는 사람은 건너뜀, 공유 번호는 중복 제거, 최대 200명) |
| GET | `/presenter` | JWT | — | 향후 7일의 계획 조회(프레젠터 보기) |
| GET | `/public/current/:planTypeId` | 공개 | — | 계획 유형의 현재 계획 조회 |
| GET | `/public/signup/:churchId` | 공개 | — | 자체 신청이 열린 계획을 가까운 날짜순으로 반환하며, 각 계획에는 자체 신청 포지션(`categoryName`, 그다음 `name` 순 정렬, Accepted/Unconfirmed 배정의 `filledCount` 포함)과 시간이 포함됨. 봉사자 이름은 포함되지 않음. 교회 설정 `volunteerSignupNextOnly`가 `"true"`이면 계획 유형별 첫 번째 계획만 반환 |
| GET | `/signup/:planId/volunteers` | JWT | — | 계획의 자체 신청 포지션에 대한 `[{ positionId, names }]`(Accepted/Unconfirmed 배정자의 표시 이름). 계획의 `showVolunteerNames`가 켜져 있지 않으면 `[]` 반환 |
| POST | `/` | JWT | — | 계획 생성 또는 업데이트(단일 객체 또는 배열 허용) |
| POST | `/copy/:id` | JWT | 사역 편집 | 포지션, 시간, 배정, 예배 순서 항목을 포함하여 계획 복사. 본문에는 `ministryId`, `serviceDate`, `copyMode`("none", "positions", "all"), `copyServiceOrder`(불리언)가 포함됨. `targetPlanId`가 없으면 새 계획이 만들어지며, 본문에서 값을 지정하지 않는 한 `notes`, `signupDeadlineHours`, `showVolunteerNames`, `autoReplaceOnDecline`은 원본 계획에서 이어짐. `targetPlanId`가 있으면 대신 그 기존 계획을 채움(호출자가 해당 계획을 편집할 수 있어야 함). B1Admin의 **Repeat weekly** 옵션은 주마다 이 엔드포인트를 한 번씩 호출하며, 매번 전주에 만들어진 계획에서 복사함 |
| POST | `/textRange` | JWT | `texting.send` + 사역 편집 | 교회의 문자 제공업체를 통해 날짜 범위에 배정된 모든 봉사자에게 문자 발송. 본문: `{ startDate, endDate, ministryId, planTypeId?, message }`(메시지는 최대 1600자, 병합 필드는 수신자별로 해석됨). 미리보기 개수와 함께 `recipientCount`, `successCount`, `failCount`, 발송이 조기에 중단되면 `error`(`no_provider` 또는 `insufficient_credits`)를 반환 |
| POST | `/autofill/:id` | JWT | — | 계획의 봉사자 배정을 자동으로 채움. 본문: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | 계획과 관련된 모든 시간, 배정, 포지션, 계획 항목 삭제 |

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

## 계획 유형

기본 경로: `/doing/planTypes`

CRUD 기본 클래스를 확장합니다(GET `/`, GET `/:id`, POST `/`, DELETE `/:id`이며 권한 검사 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 계획 유형 나열 |
| GET | `/:id` | JWT | — | ID로 계획 유형 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 유형 조회 |
| GET | `/ministryId/:ministryId` | JWT | — | 사역의 계획 유형 조회 |
| POST | `/` | JWT | — | 계획 유형 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 계획 유형 삭제 |

## 계획 항목

기본 경로: `/doing/planItems`

부모-자식 트리 구조로 구성된 예배 순서 항목(제목, 섹션, 찬양 등)을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID로 계획 항목 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 항목 조회 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 계획 항목 조회(트리 구조 반환) |
| GET | `/presenter/:churchId/:planId` | 공개 | — | 프레젠터 보기용 계획 항목 조회(트리 구조 반환) |
| POST | `/` | JWT | — | 계획 항목 생성 또는 업데이트 |
| POST | `/sort` | JWT | — | 계획 항목의 정렬 순서 업데이트(형제 항목 재정렬) |
| DELETE | `/:id` | JWT | — | 계획 항목 삭제 |

## 계획 피드

기본 경로: `/doing/planFeed`

프레젠터용 계획 항목 피드를 제공합니다. 계획 항목이 없으면 계획의 `contentId`를 사용하여 Lessons.church 베뉴 피드에서 자동으로 채웁니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:planId` | 공개 | — | 프레젠터용 계획 피드 조회(비어 있으면 베뉴 피드에서 자동 채움) |

## 포지션

기본 경로: `/doing/positions`

CRUD 기본 클래스를 확장합니다(GET `/:id`, POST `/`, DELETE `/:id`이며 권한 검사 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID로 포지션 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 포지션 조회 |
| GET | `/plan/ids?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 포지션 조회 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 포지션 조회 |
| POST | `/` | JWT | — | 포지션 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 포지션 삭제 |

## 시간

기본 경로: `/doing/times`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/all` | JWT | — | 교회의 모든 시간 나열 |
| GET | `/:id` | JWT | — | ID로 시간 조회 |
| GET | `/plans?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 시간 조회 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 시간 조회 |
| POST | `/` | JWT | — | 시간 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 시간 삭제 |

## 배정

기본 경로: `/doing/assignments`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | 현재 사용자의 배정 조회 |
| GET | `/my/upcoming` | JWT | — | 어제부터 날짜가 잡힌 계획에 대한 현재 사용자의 배정을 최대 20개까지 가까운 날짜순으로 반환(penciled-in 또는 `prepared` 상태의 계획은 제외): `{ assignmentId, status, positionName, planId, planName, serviceDate }`. 회원 홈 화면의 봉사 미리보기를 지원 |
| GET | `/:id` | JWT | — | ID로 배정 조회 |
| GET | `/plan/ids?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 배정 조회 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 배정 조회 |
| POST | `/` | JWT | — | 배정 생성 또는 업데이트(상태 기본값은 "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | 배정 수락(배정된 사람이어야 함) |
| POST | `/decline/:id` | JWT | — | 배정 거절(배정된 사람이어야 함) |
| DELETE | `/:id` | JWT | — | 배정 삭제 |

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

## 블록아웃 날짜

기본 경로: `/doing/blockoutDates`

CRUD 기본 클래스를 확장합니다(GET `/:id`, DELETE `/:id`이며 권한 검사 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID로 블록아웃 날짜 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 블록아웃 날짜 조회 |
| GET | `/my` | JWT | — | 현재 사용자의 블록아웃 날짜 조회 |
| GET | `/upcoming` | JWT | — | 교회의 다가오는 모든 블록아웃 날짜 조회 |
| POST | `/` | JWT | — | 블록아웃 날짜 생성 또는 업데이트(personId가 없으면 현재 사용자로 기본 설정) |
| DELETE | `/:id` | JWT | — | 블록아웃 날짜 삭제 |

## 작업

기본 경로: `/doing/tasks`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 현재 사용자의 열린 작업 조회 |
| GET | `/:id` | JWT | — | ID로 작업 조회 |
| GET | `/:id/contact` | JWT | 카드 보기 권한 | 워크플로 카드의 대상 사람 연락처 정보: `{ personId, displayName, mobilePhone, email }`. 사람 보기 권한이 없는 배정된 호출자도 그 사람에게 연락할 수 있게 함 |
| GET | `/closed` | JWT | — | 현재 사용자의 종료된 작업 조회 |
| GET | `/timeline?taskIds=` | JWT | — | 쉼표로 구분된 작업 ID로 작업의 타임라인 데이터 조회 |
| GET | `/directoryUpdate/:personId` | JWT | — | 사람의 디렉토리 업데이트 작업 조회 |
| POST | `/` | JWT | — | 작업 생성 또는 업데이트. 디렉토리 업데이트 작업을 처리하려면 `?type=directoryUpdate` 추가(사진 자동 업로드) |
| POST | `/:id/conversation` | JWT | `tasks.edit` 또는 카드 담당자 | 메모 대화를 카드에 첨부. 본문: `{ conversationId }`. 처음 첨부된 대화가 유지되며, 이후 호출은 카드를 변경 없이 반환 |
| POST | `/loadForGroups` | JWT | — | 특정 그룹의 작업 로드. 본문: `{ groupIds: [], status: "Open" }` |

## 자동화

기본 경로: `/doing/automations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 교회의 모든 자동화 나열 |
| GET | `/:id` | JWT | — | ID로 자동화 조회 |
| GET | `/check` | 공개 | — | 모든 자동화 검사 실행 |
| POST | `/` | JWT | — | 자동화 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 자동화 삭제 |

## 동작

기본 경로: `/doing/actions`

동작은 자동화가 실행될 때 일어나는 일을 정의합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID로 동작 조회 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 동작 조회 |
| POST | `/` | JWT | — | 동작 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 동작 삭제 |

## 조건

기본 경로: `/doing/conditions`

조건은 자동화를 실행시키는 기준을 정의합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID로 조건 조회 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 조건 조회 |
| POST | `/` | JWT | — | 조건 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 조건 삭제 |

## 접속사

기본 경로: `/doing/conjunctions`

접속사는 자동화에서 여러 조건을 연결합니다(AND/OR 논리).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID로 접속사 조회 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 접속사 조회 |
| POST | `/` | JWT | — | 접속사 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 접속사 삭제 |

## 콘텐츠 제공업체 인증

기본 경로: `/doing/contentProviderAuths`

CRUD 기본 클래스를 확장합니다(GET `/`, GET `/:id`, POST `/`, DELETE `/:id`이며 권한 검사 없음).

외부 콘텐츠 제공업체(예: 프레젠테이션 소프트웨어 연동)의 OAuth 인증 기록을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 콘텐츠 제공업체 인증 나열 |
| GET | `/:id` | JWT | — | ID로 콘텐츠 제공업체 인증 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 콘텐츠 제공업체 인증 조회 |
| GET | `/ministry/:ministryId` | JWT | — | 사역의 모든 콘텐츠 제공업체 인증 조회 |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | 특정 사역과 제공업체의 인증 기록 조회 |
| POST | `/` | JWT | — | 콘텐츠 제공업체 인증 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 콘텐츠 제공업체 인증 삭제 |

## 제공업체 프록시

기본 경로: `/doing/providerProxy`

외부 콘텐츠 제공업체(예: ProPresenter, EasyWorship)로 요청을 프록시합니다. 토큰이 만료되면 자동으로 토큰을 갱신합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/browse` | JWT | — | 콘텐츠 제공업체의 파일 탐색. 본문: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | 콘텐츠 제공업체에서 프레젠테이션 조회. 본문: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | 콘텐츠 제공업체에서 재생 목록 조회. 본문: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | 콘텐츠 항목의 지침 조회. 본문: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | 콘텐츠 항목의 확장된 지침 조회. 본문: `{ ministryId, providerId, path }` |

## 관련 페이지

- [Membership 엔드포인트](./membership) — 사람, 그룹, 역할, 권한
- [Attendance 엔드포인트](./attendance) — 예배 및 방문 추적
- [모듈 구조](../module-structure) — 코드 구성 패턴
