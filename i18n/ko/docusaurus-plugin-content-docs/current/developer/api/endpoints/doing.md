---
title: "Doing 엔드포인트"
---

# Doing 엔드포인트

<div class="article-intro">

Doing 모듈은 예배 계획, 봉사자 일정, 할 일 관리, 자동화를 담당합니다. 시간과 자리가 있는 예배 계획을 만들고, 봉사자를 배정하고, 제외 날짜를 관리하고, 예배 순서 항목을 만들고, 외부 콘텐츠 제공업체에 연결하고, 조건과 작업이 있는 자동 워크플로를 구성하는 도구를 제공합니다.

</div>

**Base path:** `/doing`

## 계획

Base path: `/doing/plans`

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 계획 나열 |
| GET | `/:id` | JWT | — | ID로 계획 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 조회 |
| GET | `/types/:planTypeId` | JWT | — | 계획 유형별 계획 조회 |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + ministry edit | 봉사 개요의 **Text Volunteers** 발송을 미리 봅니다: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }`. 범위 안에 배정된 봉사자를 대상으로 합니다(사람당 한 번, 수신 거부 및 번호 없음은 건너뜀, 공유 번호는 중복 제거, 최대 200명) |
| GET | `/presenter` | JWT | — | 다음 7일간의 계획 조회(프레젠터 보기) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Ministry edit | 계획이 선택할 수 있는 활성 봉사 배정 확인 워크플로(`workflowType = "assignmentConfirmation"`): `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Public | — | 계획 유형의 현재 계획 조회 |
| GET | `/public/signup/:churchId` | Public | — | 자가 신청이 열린 계획을 가까운 순으로 나열하며, 각 계획에는 자가 신청 자리(`categoryName`, 그다음 `name` 순 정렬, Accepted/Unconfirmed 배정의 `filledCount` 포함)와 시간이 포함됩니다. 교회 설정 `volunteerSignupNextOnly`가 `"true"`이면 계획 유형마다 첫 번째 계획만 반환합니다. 각 `plan`에는 계산된 `signupDeadline`(ISO 시각 또는 `null`)이 포함됩니다. 이는 계획의 가장 이른 `service` 유형 시간보다 `signupDeadlineHours` 전입니다(service 시간이 없으면 시간이 있는 항목 중 아무거나, 계획에 시간이 없으면 교회 시간대의 `serviceDate` 오전 9시) |
| GET | `/signup/:planId/volunteers` | JWT | — | 계획의 자가 신청 자리에 대한 `[{ positionId, names }]`(Accepted/Unconfirmed 배정자의 표시 이름). 계획의 `showVolunteerNames`가 켜져 있지 않으면 `[]`를 반환 |
| POST | `/` | JWT | — | 계획 생성 또는 업데이트(단일 객체 또는 배열 허용). 계획을 확인 워크플로에 참여시키려면 `confirmationWorkflowId`를 설정하고, 앞으로의 요청에서 빠지려면 `null`로 설정합니다. 마감을 지우려면 `signupDeadlineHours: null`을 보냅니다. 필드를 생략하면 저장된 값이 유지됩니다 |
| POST | `/copy/:id` | JWT | Ministry edit | 자리, 시간, 배정, 예배 순서 항목을 포함한 계획을 복사합니다. 본문에는 `ministryId`, `serviceDate`, `copyMode`("none", "positions", "all"), `copyServiceOrder`(불리언)가 포함됩니다. `targetPlanId`가 없으면 새 계획이 만들어지며, 본문이 따로 지정하지 않는 한 `notes`, `signupDeadlineHours`, `showVolunteerNames`, `autoReplaceOnDecline`은 원본 계획에서 이어집니다. `targetPlanId`가 있으면 대신 그 기존 계획을 채웁니다(호출자가 그 계획을 편집할 수 있어야 합니다). B1Admin의 **Repeat weekly** 옵션은 주마다 한 번씩 이를 호출하며, 매번 전 주에 만들어진 계획에서 복사합니다 |
| POST | `/textRange` | JWT | `texting.send` + ministry edit | 교회의 문자 제공업체를 통해 날짜 범위에 배정된 모든 봉사자에게 문자를 보냅니다. 본문: `{ startDate, endDate, ministryId, planTypeId?, message }`(메시지는 최대 1600자, 병합 필드는 수신자별로 해석됨). 미리 보기 개수와 함께 `recipientCount`, `successCount`, `failCount`, 그리고 발송이 중간에 멈추면 `error`(`no_provider` 또는 `insufficient_credits`)를 반환합니다 |
| POST | `/:id/issueRequests` | JWT | Plan edit | 계획의 새로운 Unconfirmed 상태이며 아직 알리지 않은 배정을 확인 워크플로를 통해 발행합니다. 각 배정을 알림 완료로 표시하고 배정당 워크플로 카드 하나를 시작합니다. 본문은 비워 두며, `{ issued }`를 반환합니다. 계획이 게시되어 있지 않거나(`prepared`가 아님), 활성 `confirmationWorkflowId`와 최소 한 개의 단계가 없거나, 응답 마감이 지났다면 실패합니다 |
| POST | `/autofill/:id` | JWT | — | 계획의 봉사자 배정을 자동으로 채웁니다. 본문: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | 계획과 관련된 모든 시간, 배정, 자리, 계획 항목을 삭제합니다 |

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

Base path: `/doing/planTypes`

기본 CRUD 클래스를 확장합니다(GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — 권한 확인 없음).

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 계획 유형 나열 |
| GET | `/:id` | JWT | — | ID로 계획 유형 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 유형 조회 |
| GET | `/ministryId/:ministryId` | JWT | — | 사역의 계획 유형 조회 |
| POST | `/` | JWT | — | 계획 유형 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 계획 유형 삭제 |

## 계획 항목

Base path: `/doing/planItems`

부모-자식 트리 구조로 구성된 예배 순서 항목(머리글, 섹션, 찬양 등)을 관리합니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 계획 항목 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 항목 조회 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 계획 항목 조회(트리 구조 반환) |
| GET | `/presenter/:churchId/:planId` | Public | — | 프레젠터 보기를 위한 계획 항목 조회(트리 구조 반환) |
| POST | `/` | JWT | — | 계획 항목 생성 또는 업데이트 |
| POST | `/sort` | JWT | — | 계획 항목의 정렬 순서 업데이트(형제 항목을 다시 정렬) |
| DELETE | `/:id` | JWT | — | 계획 항목 삭제 |

## 계획 피드

Base path: `/doing/planFeed`

프레젠터를 위한 계획 항목 피드를 제공합니다. 계획 항목이 없으면 계획의 `contentId`를 사용해 Lessons.church 베뉴 피드에서 자동으로 채워집니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | 프레젠터를 위한 계획 피드 조회(비어 있으면 베뉴 피드에서 자동 채움) |

## 자리

Base path: `/doing/positions`

기본 CRUD 클래스를 확장합니다(GET `/:id`, POST `/`, DELETE `/:id` — 권한 확인 없음).

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 자리 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 자리 조회 |
| GET | `/plan/ids?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 자리 조회 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 자리 조회 |
| POST | `/` | JWT | — | 자리 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 자리 삭제 |

## 시간

Base path: `/doing/times`

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | 교회의 모든 시간 나열 |
| GET | `/:id` | JWT | — | ID로 시간 조회 |
| GET | `/plans?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 시간 조회 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 시간 조회 |
| POST | `/` | JWT | — | 시간 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 시간 삭제 |

## 배정

Base path: `/doing/assignments`

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 현재 사용자의 배정 조회 |
| GET | `/my/upcoming` | JWT | — | 어제 이후 날짜의 계획에서 현재 사용자의 배정을 최대 20개까지 가까운 순으로 조회합니다(계획 전 단계로 두었거나 `prepared` 상태인 계획은 건너뜀): `{ assignmentId, status, positionName, planId, planName, serviceDate }`. 교인 홈 페이지의 봉사 미리 보기를 지원합니다 |
| GET | `/:id` | JWT | — | ID로 배정 조회 |
| GET | `/plan/ids?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 배정 조회 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 배정 조회 |
| POST | `/` | JWT | — | 배정 생성 또는 업데이트(상태 기본값은 "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | 배정 수락(배정된 사람이어야 함) |
| POST | `/decline/:id` | JWT | — | 배정 거절(배정된 사람이어야 함) |
| POST | `/signup` | JWT | — | 자리에 자가 신청. 본문: `{ positionId }`. 자리에서 자가 신청을 허용하고 여유가 있어야 하며, Accepted 배정을 만듭니다. 계획의 신청 마감(위와 같이 첫 번째 예배 시간에서 거꾸로 계산)이 지나면 "Signup deadline has passed"로 거부됩니다 |
| DELETE | `/signup/:id` | JWT | — | 본인의 자가 신청 취소. 계획의 신청 마감 이후에는 "Removal deadline has passed"로 거부됩니다 |
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

## 제외 날짜

Base path: `/doing/blockoutDates`

기본 CRUD 클래스를 확장합니다(GET `/:id`, DELETE `/:id` — 권한 확인 없음).

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 제외 날짜 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 제외 날짜 조회 |
| GET | `/my` | JWT | — | 현재 사용자의 제외 날짜 조회 |
| GET | `/upcoming` | JWT | — | 교회의 다가오는 모든 제외 날짜 조회 |
| POST | `/` | JWT | — | 제외 날짜 생성 또는 업데이트(personId가 없으면 현재 사용자로 기본 설정) |
| DELETE | `/:id` | JWT | — | 제외 날짜 삭제 |

## 할 일

Base path: `/doing/tasks`

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 현재 사용자의 열린 할 일 조회 |
| GET | `/:id` | JWT | — | ID로 할 일 조회 |
| GET | `/:id/contact` | JWT | 카드를 볼 수 있음 | 워크플로 카드가 가리키는 사람의 연락처 정보: `{ personId, displayName, mobilePhone, email }`. 사람 접근 권한이 없는 배정된 호출자도 그 사람에게 연락할 수 있게 합니다 |
| GET | `/closed` | JWT | — | 현재 사용자의 마감된 할 일 조회 |
| GET | `/timeline?taskIds=` | JWT | — | 쉼표로 구분된 할 일 ID로 할 일의 타임라인 데이터 조회 |
| GET | `/directoryUpdate/:personId` | JWT | — | 사람의 디렉터리 업데이트 할 일 조회 |
| POST | `/` | JWT | — | 할 일 생성 또는 업데이트. 디렉터리 업데이트 할 일을 처리하려면 `?type=directoryUpdate`를 추가합니다(사진 자동 업로드) |
| POST | `/:id/conversation` | JWT | `tasks.edit` 또는 카드 담당자 | 카드에 메모 대화를 첨부합니다. 본문: `{ conversationId }`. 처음 첨부된 대화가 유지되며, 이후 호출은 카드를 변경 없이 반환합니다 |
| POST | `/loadForGroups` | JWT | — | 특정 그룹의 할 일 로드. 본문: `{ groupIds: [], status: "Open" }` |

## 자동화

Base path: `/doing/automations`

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 자동화 나열 |
| GET | `/:id` | JWT | — | ID로 자동화 조회 |
| GET | `/check` | Public | — | 모든 자동화 확인 실행 |
| POST | `/` | JWT | — | 자동화 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 자동화 삭제 |

## 작업

Base path: `/doing/actions`

작업은 자동화가 실행될 때 일어날 일을 정의합니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 작업 조회 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 작업 조회 |
| POST | `/` | JWT | — | 작업 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 작업 삭제 |

## 조건

Base path: `/doing/conditions`

조건은 자동화를 트리거하는 기준을 정의합니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 조건 조회 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 조건 조회 |
| POST | `/` | JWT | — | 조건 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 조건 삭제 |

## 조건 연결

Base path: `/doing/conjunctions`

조건 연결은 자동화에서 여러 조건을 함께 묶습니다(AND/OR 논리).

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID로 조건 연결 조회 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 조건 연결 조회 |
| POST | `/` | JWT | — | 조건 연결 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 조건 연결 삭제 |

## 콘텐츠 제공업체 인증

Base path: `/doing/contentProviderAuths`

기본 CRUD 클래스를 확장합니다(GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — 권한 확인 없음).

외부 콘텐츠 제공업체(예: 프레젠테이션 소프트웨어 연동)의 OAuth 인증 기록을 관리합니다.

`accessToken`과 `refreshToken`은 저장될 때 `EncryptionHelper`로 암호화되며, 읽을 때 복호화됩니다. 따라서 API는 여전히 평문 토큰을 반환합니다. 암호화 이전에 저장된 행은 평문입니다(평문에는 `|`가 들어가지 않습니다). 이런 행은 그대로 반환되며, 다음에 저장될 때 암호화됩니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 콘텐츠 제공업체 인증 나열 |
| GET | `/:id` | JWT | — | ID로 콘텐츠 제공업체 인증 조회 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 콘텐츠 제공업체 인증 조회 |
| GET | `/ministry/:ministryId` | JWT | — | 사역의 모든 콘텐츠 제공업체 인증 조회 |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | 특정 사역과 제공업체의 인증 기록 조회 |
| POST | `/` | JWT | — | 콘텐츠 제공업체 인증 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 콘텐츠 제공업체 인증 삭제 |

## 제공업체 프록시

Base path: `/doing/providerProxy`

외부 콘텐츠 제공업체(예: ProPresenter, EasyWorship)로 요청을 전달합니다. 토큰이 만료되면 토큰 갱신을 자동으로 처리합니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | 콘텐츠 제공업체의 파일 둘러보기. 본문: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | 콘텐츠 제공업체에서 프레젠테이션 조회. 본문: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | 콘텐츠 제공업체에서 재생 목록 조회. 본문: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | 콘텐츠 항목의 지시 사항 조회. 본문: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | 콘텐츠 항목의 확장된 지시 사항 조회. 본문: `{ ministryId, providerId, path }` |

## 관련 페이지

- [Membership 엔드포인트](./membership) — 사람, 그룹, 역할, 권한
- [Attendance 엔드포인트](./attendance) — 예배 및 방문 추적
- [모듈 구조](../module-structure) — 코드 구성 패턴
