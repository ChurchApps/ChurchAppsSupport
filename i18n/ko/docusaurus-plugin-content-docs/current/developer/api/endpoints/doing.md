---
title: "Doing 엔드포인트"
---

# Doing 엔드포인트

<div class="article-intro">

Doing 모듈은 예배 계획, 봉사자 일정 관리, 작업 관리, 자동화를 담당합니다. 시간과 직책이 포함된 예배 계획을 만들고, 봉사자를 배정하며, 불가능 날짜를 관리하고, 예배 순서 항목을 구성하며, 외부 콘텐츠 제공자와 연결하고, 조건과 동작이 있는 자동 워크플로를 설정하는 도구를 제공합니다.

</div>

**기본 경로:** `/doing`

## 계획

기본 경로: `/doing/plans`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 계획 목록 조회 |
| GET | `/:id` | JWT | — | ID로 계획 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 조회 |
| GET | `/types/:planTypeId` | JWT | — | 계획 유형별 계획 조회 |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + 사역 편집 | 예배 개요에서 **봉사자에게 문자 보내기**가 보낼 대상을 미리 봅니다: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }`. 범위 내에 배정된 봉사자를 대상으로 하며(사람당 한 번), 수신을 거부했거나 번호가 없는 사람은 건너뛰고, 공유 번호는 중복 제거하며, 최대 200명으로 제한 |
| GET | `/presenter` | JWT | — | 향후 7일간의 계획 조회(프레젠터 보기) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | 사역 편집 | 계획에서 선택할 수 있는 활성 봉사 배정 확인 워크플로(`workflowType = "assignmentConfirmation"`): `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Public | — | 계획 유형의 현재 계획 조회 |
| GET | `/public/signup/:churchId` | Public | — | 자가 등록이 열려 있는 계획을 가까운 순으로 조회. 각 계획에는 자가 등록 직책(`categoryName`, 그다음 `name` 순 정렬, 승인된/미확인 배정의 `filledCount` 포함)과 시간이 포함. 봉사자 이름은 없음. 교회 설정 `volunteerSignupNextOnly`가 `"true"`이면 계획 유형마다 첫 번째 계획만 반환. 각 `plan`에는 계산된 `signupDeadline`(ISO 시각 또는 `null`)이 포함되며, 계획의 가장 이른 `service` 유형 시간보다 `signupDeadlineHours`만큼 앞선 시각(예배 시간이 없으면 시간이 있는 첫 항목 기준, 시간이 전혀 없으면 교회 시간대 기준 `serviceDate`의 오전 9시) |
| GET | `/signup/:planId/volunteers` | JWT | — | 계획의 자가 등록 직책에 대한 `[{ positionId, names }]`(승인된/미확인 배정자의 표시 이름). 계획의 `showVolunteerNames`가 켜져 있지 않으면 `[]` 반환 |
| POST | `/` | JWT | — | 계획 생성 또는 수정(단일 객체 또는 배열 허용). 계획을 서빙 확인 워크플로에 포함하려면 `confirmationWorkflowId`를 설정하고, 이후 요청에서 제외하려면 `null`로 설정. 마감 시한을 지우려면 `signupDeadlineHours: null`을 보내며, 필드를 생략하면 저장된 값을 유지 |
| POST | `/copy/:id` | JWT | 사역 편집 | 직책, 시간, 배정, 예배 순서 항목을 포함해 계획 복사. 본문에는 `ministryId`, `serviceDate`, `copyMode`("none", "positions", "all"), `copyServiceOrder`(불리언)가 포함. `targetPlanId`가 없으면 새 계획을 만들고, `notes`, `signupDeadlineHours`, `showVolunteerNames`, `autoReplaceOnDecline`은 본문에서 값을 제공하지 않는 한 원본 계획에서 이어받음. `targetPlanId`가 있으면 그 기존 계획을 채움(호출자는 해당 계획을 편집할 수 있어야 함). B1Admin의 **매주 반복** 옵션은 주마다 이 엔드포인트를 한 번씩 호출하며, 매번 전주에 만든 계획에서 복사 |
| POST | `/textRange` | JWT | `texting.send` + 사역 편집 | 날짜 범위에 배정된 모든 봉사자에게 교회의 문자 제공업체를 통해 문자 발송. 본문: `{ startDate, endDate, ministryId, planTypeId?, message }`(메시지는 최대 1600자, 수신자별로 병합 필드 해석). 미리보기 수치와 함께 `recipientCount`, `successCount`, `failCount`를 반환하며, 발송이 중간에 멈추면 `error`(`no_provider` 또는 `insufficient_credits`)를 반환 |
| POST | `/:id/issueRequests` | JWT | 계획 편집 | 계획의 새로운 미확인, 아직 알리지 않은 배정을 확인 워크플로로 발송. 각 배정을 알림 처리하고 배정마다 워크플로 카드를 하나씩 시작. 본문 없음. `{ issued }` 반환. 계획이 게시된 상태(`prepared`가 아님)가 아니거나, 활성 `confirmationWorkflowId`와 최소 한 개의 단계가 없거나, 응답 마감 시한이 지났으면 실패 |
| POST | `/autofill/:id` | JWT | — | 계획의 봉사자 배정을 자동으로 채움. 본문: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | 계획과 관련된 모든 시간, 배정, 직책, 계획 항목 삭제 |

### 예제: 계획 복사

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

CRUD 기본 클래스를 확장합니다(GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — 권한 검사 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 계획 유형 목록 조회 |
| GET | `/:id` | JWT | — | ID로 계획 유형 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 유형 조회 |
| GET | `/ministryId/:ministryId` | JWT | — | 사역의 계획 유형 조회 |
| POST | `/` | JWT | — | 계획 유형 생성 또는 수정 |
| DELETE | `/:id` | JWT | — | 계획 유형 삭제 |

## 계획 항목

기본 경로: `/doing/planItems`

부모-자식 트리 구조로 구성된 예배 순서 항목(머리글, 섹션, 찬양곡 등)을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 계획 항목 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 항목 조회 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 계획 항목 조회(트리 구조로 반환) |
| GET | `/presenter/:churchId/:planId` | Public | — | 프레젠터 보기용 계획 항목 조회(트리 구조로 반환) |
| POST | `/` | JWT | — | 계획 항목 생성 또는 수정 |
| POST | `/sort` | JWT | — | 계획 항목의 정렬 순서 업데이트(형제 항목 재정렬) |
| DELETE | `/:id` | JWT | — | 계획 항목 삭제 |

## 계획 피드

기본 경로: `/doing/planFeed`

프레젠터를 위한 계획 항목 피드를 제공합니다. 계획 항목이 없으면 계획의 `contentId`를 사용해 Lessons.church 장소 피드에서 자동으로 채웁니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | 프레젠터용 계획 피드 조회(비어 있으면 장소 피드에서 자동 채움) |

## 직책

기본 경로: `/doing/positions`

CRUD 기본 클래스를 확장합니다(GET `/:id`, POST `/`, DELETE `/:id` — 권한 검사 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 직책 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 직책 조회 |
| GET | `/plan/ids?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 직책 조회 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 직책 조회 |
| POST | `/` | JWT | — | 직책 생성 또는 수정 |
| DELETE | `/:id` | JWT | — | 직책 삭제 |

## 시간

기본 경로: `/doing/times`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | 교회의 모든 시간 목록 조회 |
| GET | `/:id` | JWT | — | ID로 시간 조회 |
| GET | `/plans?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 시간 조회 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 시간 조회 |
| POST | `/` | JWT | — | 시간 생성 또는 수정 |
| DELETE | `/:id` | JWT | — | 시간 삭제 |

## 배정

기본 경로: `/doing/assignments`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 현재 사용자의 배정 조회 |
| GET | `/my/upcoming` | JWT | — | 어제 이후 날짜의 계획 중 현재 사용자의 배정을 최대 20개까지 가까운 순으로 조회(임시 배정(penciled-in) 또는 `prepared` 계획은 건너뜀): `{ assignmentId, status, positionName, planId, planName, serviceDate }`. 회원 홈 페이지의 봉사 미리보기에 데이터를 제공 |
| GET | `/:id` | JWT | — | ID로 배정 조회 |
| GET | `/plan/ids?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 배정 조회 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 배정 조회 |
| POST | `/` | JWT | — | 배정 생성 또는 수정(상태 기본값은 "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | 배정 수락(배정된 본인이어야 함) |
| POST | `/decline/:id` | JWT | — | 배정 거절(배정된 본인이어야 함) |
| POST | `/signup` | JWT | — | 직책에 자가 등록. 본문: `{ positionId }`. 직책이 자가 등록을 허용하고 자리가 있어야 하며, 승인된(Accepted) 배정을 생성. 계획의 등록 마감 시한(위와 같이 첫 예배 시간부터 거꾸로 계산)이 지나면 "Signup deadline has passed"와 함께 거부 |
| DELETE | `/signup/:id` | JWT | — | 본인의 자가 등록 취소. 계획의 등록 마감 시한 이후에는 "Removal deadline has passed"와 함께 거부 |
| DELETE | `/:id` | JWT | — | 배정 삭제 |

### 예제: 배정 수락

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

## 불가능 날짜

기본 경로: `/doing/blockoutDates`

CRUD 기본 클래스를 확장합니다(GET `/:id`, DELETE `/:id` — 권한 검사 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 불가능 날짜 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 불가능 날짜 조회 |
| GET | `/my` | JWT | — | 현재 사용자의 불가능 날짜 조회 |
| GET | `/upcoming` | JWT | — | 교회의 다가오는 모든 불가능 날짜 조회 |
| POST | `/` | JWT | — | 불가능 날짜 생성 또는 수정(`personId`를 제공하지 않으면 현재 사용자로 기본 설정) |
| DELETE | `/:id` | JWT | — | 불가능 날짜 삭제 |

## 작업

기본 경로: `/doing/tasks`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 현재 사용자의 열린 작업 조회 |
| GET | `/:id` | JWT | — | ID로 작업 조회 |
| GET | `/:id/contact` | JWT | 카드 조회 가능 | 워크플로 카드의 대상 인물 연락처: `{ personId, displayName, mobilePhone, email }`. 사람 기능에 접근 권한이 없는 배정된 호출자도 대상 인물에게 연락할 수 있도록 함 |
| GET | `/closed` | JWT | — | 현재 사용자의 닫힌 작업 조회 |
| GET | `/timeline?taskIds=` | JWT | — | 쉼표로 구분된 작업 ID로 작업의 타임라인 데이터 조회 |
| GET | `/directoryUpdate/:personId` | JWT | — | 사람의 디렉터리 업데이트 작업 조회 |
| POST | `/` | JWT | — | 작업 생성 또는 수정. 디렉터리 업데이트 작업을 처리하려면 `?type=directoryUpdate` 추가(사진 자동 업로드) |
| POST | `/:id/conversation` | JWT | `tasks.edit` 또는 카드 담당자 | 카드에 메모 대화 첨부. 본문: `{ conversationId }`. 처음 첨부된 대화가 적용되며, 이후 호출은 카드를 변경 없이 반환 |
| POST | `/loadForGroups` | JWT | — | 특정 그룹의 작업 로드. 본문: `{ groupIds: [], status: "Open" }` |

## 자동화

기본 경로: `/doing/automations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 자동화 목록 조회 |
| GET | `/:id` | JWT | — | ID로 자동화 조회 |
| GET | `/check` | Public | — | 모든 자동화 검사 실행 |
| POST | `/` | JWT | — | 자동화 생성 또는 수정 |
| DELETE | `/:id` | JWT | — | 자동화 삭제 |

## 동작

기본 경로: `/doing/actions`

동작은 자동화가 실행될 때 무엇을 할지 정의합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 동작 조회 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 동작 조회 |
| POST | `/` | JWT | — | 동작 생성 또는 수정 |
| DELETE | `/:id` | JWT | — | 동작 삭제 |

## 조건

기본 경로: `/doing/conditions`

조건은 자동화를 실행시키는 기준을 정의합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 조건 조회 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 조건 조회 |
| POST | `/` | JWT | — | 조건 생성 또는 수정 |
| DELETE | `/:id` | JWT | — | 조건 삭제 |

## 연결자

기본 경로: `/doing/conjunctions`

연결자는 자동화에서 여러 조건을 연결합니다(AND/OR 논리).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 연결자 조회 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 연결자 조회 |
| POST | `/` | JWT | — | 연결자 생성 또는 수정 |
| DELETE | `/:id` | JWT | — | 연결자 삭제 |

## 콘텐츠 제공자 인증

기본 경로: `/doing/contentProviderAuths`

CRUD 기본 클래스를 확장합니다(GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — 권한 검사 없음).

외부 콘텐츠 제공자(예: 프레젠테이션 소프트웨어 연동)의 OAuth 인증 기록을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 콘텐츠 제공자 인증 목록 조회 |
| GET | `/:id` | JWT | — | ID로 콘텐츠 제공자 인증 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 콘텐츠 제공자 인증 조회 |
| GET | `/ministry/:ministryId` | JWT | — | 사역의 모든 콘텐츠 제공자 인증 조회 |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | 특정 사역과 제공자의 인증 기록 조회 |
| POST | `/` | JWT | — | 콘텐츠 제공자 인증 생성 또는 수정 |
| DELETE | `/:id` | JWT | — | 콘텐츠 제공자 인증 삭제 |

## 제공자 프록시

기본 경로: `/doing/providerProxy`

외부 콘텐츠 제공자(예: ProPresenter, EasyWorship)에 요청을 중계합니다. 토큰이 만료되면 토큰 갱신을 자동으로 처리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | 콘텐츠 제공자 파일 탐색. 본문: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | 콘텐츠 제공자에서 프레젠테이션 조회. 본문: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | 콘텐츠 제공자에서 재생목록 조회. 본문: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | 콘텐츠 항목의 지침 조회. 본문: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | 콘텐츠 항목의 확장 지침 조회. 본문: `{ ministryId, providerId, path }` |

## 관련 페이지

- [멤버십 엔드포인트](./membership) — 사람, 그룹, 역할, 권한
- [출석 엔드포인트](./attendance) — 예배 및 방문 추적
- [모듈 구조](../module-structure) — 코드 구성 패턴
