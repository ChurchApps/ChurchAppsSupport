---
title: "Doing 엔드포인트"
---

# Doing 엔드포인트

<div class="article-intro">

Doing 모듈은 예배 계획, 봉사자 일정, 할 일 관리, 자동화를 담당합니다. 시간과 자리가 있는 예배 계획을 만들고, 봉사자를 배정하고, 불가능한 날짜를 관리하고, 예배 순서 항목을 만들고, 외부 콘텐츠 제공자에 연결하며, 조건과 동작이 있는 자동 워크플로를 설정하는 도구를 제공합니다.

</div>

**기본 경로:** `/doing`

## 계획

기본 경로: `/doing/plans`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 교회의 모든 계획 목록 |
| GET | `/:id` | JWT | — | ID로 계획 가져오기 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 가져오기 |
| GET | `/types/:planTypeId` | JWT | — | 계획 유형별 계획 가져오기 |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + 사역 편집 | 봉사 개요의 **봉사자에게 문자 보내기** 발송 미리 보기: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }`. 기간 안에 배정된 봉사자 대상(사람당 한 번, 수신 거부 및 번호 없는 사람은 건너뜀, 공유 번호는 중복 제거, 200명으로 제한) |
| GET | `/presenter` | JWT | — | 향후 7일 동안의 계획 가져오기(발표자 화면) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | 사역 편집 | 계획이 선택할 수 있는 활성 봉사 배정 확인 워크플로(`workflowType = "assignmentConfirmation"`): `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | 공개 | — | 계획 유형의 현재 계획 가져오기 |
| GET | `/public/signup/:churchId` | 공개 | — | 셀프 가입이 열린 계획을 가까운 순서로 반환. 각 계획에는 셀프 가입 자리(`categoryName`, 그다음 `name`으로 정렬, 수락됨/미확인 배정의 `filledCount` 포함)와 시간이 포함됨. 봉사자 이름은 없음. 교회 설정 `volunteerSignupNextOnly`가 `"true"`이면 계획 유형마다 첫 번째 계획만 반환. 각 `plan`에는 계산된 `signupDeadline`(ISO 시각 또는 `null`)이 포함됨. 계획의 가장 이른 `service` 유형 시간보다 `signupDeadlineHours`만큼 앞선 시각(예배 시간이 없으면 시간이 있는 항목 중 아무거나, 계획에 시간이 없으면 `serviceDate`의 교회 시간대 9:00) |
| GET | `/signup/:planId/volunteers` | JWT | — | 계획의 셀프 가입 자리별 `[{ positionId, names }]`(수락됨/미확인 배정자의 표시 이름). 계획의 `showVolunteerNames`가 켜져 있지 않으면 `[]` 반환 |
| POST | `/` | JWT | — | 계획 생성 또는 업데이트(단일 객체 또는 배열 허용). `confirmationWorkflowId`를 설정하면 계획이 봉사 확인 워크플로에 참여하며, `null`이면 이후 요청부터 참여하지 않음. 마감일을 지우려면 `signupDeadlineHours: null`을 보내세요. 필드를 생략하면 저장된 값이 유지됨 |
| POST | `/copy/:id` | JWT | 사역 편집 | 자리, 시간, 배정, 예배 순서 항목을 포함해 계획을 복사. 본문에는 `ministryId`, `serviceDate`, `copyMode`("none", "positions", "all"), `copyServiceOrder`(불리언)이 포함됨. `targetPlanId`가 없으면 새 계획을 만들며, 본문에서 값을 주지 않는 한 `notes`, `signupDeadlineHours`, `showVolunteerNames`, `autoReplaceOnDecline`은 원본 계획에서 이어짐. `targetPlanId`가 있으면 복사 내용이 그 기존 계획을 채움(호출자는 그 계획을 편집할 수 있어야 함). B1Admin의 **Repeat weekly** 옵션은 주마다 이 엔드포인트를 한 번씩 호출하며, 매번 바로 전 주에 만든 계획에서 복사함 |
| POST | `/textRange` | JWT | `texting.send` + 사역 편집 | 기간 안에 배정된 모든 봉사자에게 교회의 문자 제공자로 문자 보내기. 본문: `{ startDate, endDate, ministryId, planTypeId?, message }`(메시지는 1600자 이하, 병합 필드는 수신자마다 해석됨). 미리 보기 수치와 함께 `recipientCount`, `successCount`, `failCount`를 반환하며, 발송이 중간에 멈추면 `error`(`no_provider` 또는 `insufficient_credits`)를 반환 |
| POST | `/:id/issueRequests` | JWT | 계획 편집 | 계획의 새 미확인, 아직 알림을 받지 않은 배정을 확인 워크플로로 발급. 각 배정을 알림 완료로 표시하고 배정마다 워크플로 카드 하나를 시작함. 빈 본문. `{ issued }` 반환. 계획이 게시되지 않았거나(`prepared`가 아님), 활성 `confirmationWorkflowId`가 없거나, 단계가 하나도 없거나, 응답 마감이 지났으면 실패 |
| POST | `/autofill/:id` | JWT | — | 계획의 봉사자 배정 자동 채우기. 본문: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | 계획과 관련된 모든 시간, 배정, 자리, 계획 항목 삭제 |

### 예시: 계획 복사하기

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

CRUD 기본 클래스를 확장합니다(GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — 권한 확인 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 계획 유형 목록 |
| GET | `/:id` | JWT | — | ID로 계획 유형 가져오기 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 유형 가져오기 |
| GET | `/ministryId/:ministryId` | JWT | — | 사역의 계획 유형 가져오기 |
| POST | `/` | JWT | — | 계획 유형 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 계획 유형 삭제 |

## 계획 항목

기본 경로: `/doing/planItems`

부모-자식 트리 구조로 정리된 예배 순서 항목(머리글, 섹션, 찬양 등)을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID로 계획 항목 가져오기 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 계획 항목 가져오기 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 계획 항목 가져오기(트리 구조로 반환) |
| GET | `/presenter/:churchId/:planId` | 공개 | — | 발표자 화면용 계획 항목 가져오기(트리 구조로 반환) |
| POST | `/` | JWT | — | 계획 항목 생성 또는 업데이트 |
| POST | `/sort` | JWT | — | 계획 항목의 정렬 순서 업데이트(형제 항목을 다시 정렬) |
| DELETE | `/:id` | JWT | — | 계획 항목 삭제 |

## 계획 피드

기본 경로: `/doing/planFeed`

발표자용 계획 항목 피드를 제공합니다. 계획 항목이 없으면 계획의 `contentId`를 사용해 Lessons.church 장소 피드에서 자동으로 채웁니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:planId` | 공개 | — | 발표자용 계획 피드 가져오기(비어 있으면 장소 피드에서 자동으로 채움) |

## 자리

기본 경로: `/doing/positions`

CRUD 기본 클래스를 확장합니다(GET `/:id`, POST `/`, DELETE `/:id` — 권한 확인 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID로 자리 가져오기 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 자리 가져오기 |
| GET | `/plan/ids?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 자리 가져오기 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 자리 가져오기 |
| POST | `/` | JWT | — | 자리 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 자리 삭제 |

## 시간

기본 경로: `/doing/times`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/all` | JWT | — | 교회의 모든 시간 목록 |
| GET | `/:id` | JWT | — | ID로 시간 가져오기 |
| GET | `/plans?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 시간 가져오기 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 시간 가져오기 |
| POST | `/` | JWT | — | 시간 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 시간 삭제 |

## 배정

기본 경로: `/doing/assignments`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | 현재 사용자의 배정 가져오기 |
| GET | `/my/upcoming` | JWT | — | 어제 이후 날짜의 계획에 있는 현재 사용자의 배정을 최대 20개까지 가까운 순서로 반환(임시 배정 또는 `prepared` 상태 계획은 건너뜀): `{ assignmentId, status, positionName, planId, planName, serviceDate }`. 교인 홈 페이지의 봉사 미리 보기를 뒷받침 |
| GET | `/:id` | JWT | — | ID로 배정 가져오기 |
| GET | `/plan/ids?planIds=` | JWT | — | 쉼표로 구분된 계획 ID로 여러 계획의 배정 가져오기 |
| GET | `/plan/:planId` | JWT | — | 계획의 모든 배정 가져오기 |
| POST | `/` | JWT | — | 배정 생성 또는 업데이트(상태 기본값은 "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | 배정 수락(배정된 사람이어야 함) |
| POST | `/decline/:id` | JWT | — | 배정 거절(배정된 사람이어야 함) |
| POST | `/signup` | JWT | — | 자리에 셀프 가입. 본문: `{ positionId }`. 자리가 셀프 가입을 허용하고 자리가 남아 있어야 하며, 수락됨 상태의 배정을 만듦. 계획의 가입 마감일(위와 같이 첫 예배 시간에서 거꾸로 계산)이 지나면 "Signup deadline has passed"로 거부됨 |
| DELETE | `/signup/:id` | JWT | — | 본인의 셀프 가입 취소. 계획의 가입 마감일이 지나면 "Removal deadline has passed"로 거부됨 |
| DELETE | `/:id` | JWT | — | 배정 삭제 |

### 예시: 배정 수락하기

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

## 불가능한 날짜

기본 경로: `/doing/blockoutDates`

CRUD 기본 클래스를 확장합니다(GET `/:id`, DELETE `/:id` — 권한 확인 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID로 불가능한 날짜 가져오기 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 불가능한 날짜 가져오기 |
| GET | `/my` | JWT | — | 현재 사용자의 불가능한 날짜 가져오기 |
| GET | `/upcoming` | JWT | — | 교회의 모든 예정된 불가능한 날짜 가져오기 |
| POST | `/` | JWT | — | 불가능한 날짜 생성 또는 업데이트(제공하지 않으면 personId 기본값은 현재 사용자) |
| DELETE | `/:id` | JWT | — | 불가능한 날짜 삭제 |

## 할 일

기본 경로: `/doing/tasks`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 현재 사용자의 열린 할 일 가져오기 |
| GET | `/:id` | JWT | — | ID로 할 일 가져오기 |
| GET | `/:id/contact` | JWT | 카드를 볼 수 있음 | 워크플로 카드의 대상 인물 연락처: `{ personId, displayName, mobilePhone, email }`. 교인 정보 권한이 없는 배정된 호출자도 대상 인물에게 연락할 수 있게 함 |
| GET | `/closed` | JWT | — | 현재 사용자의 완료된 할 일 가져오기 |
| GET | `/timeline?taskIds=` | JWT | — | 쉼표로 구분된 할 일 ID로 할 일의 타임라인 데이터 가져오기 |
| GET | `/directoryUpdate/:personId` | JWT | — | 인물의 교인 정보 업데이트 할 일 가져오기 |
| POST | `/` | JWT | — | 할 일 생성 또는 업데이트. 교인 정보 업데이트 할 일을 처리하려면 `?type=directoryUpdate`를 추가(사진을 자동으로 업로드) |
| POST | `/:id/conversation` | JWT | `tasks.edit` 또는 카드 담당자 | 카드에 메모 대화를 연결. 본문: `{ conversationId }`. 처음 연결된 대화가 유지되며, 이후 호출은 카드를 변경 없이 반환 |
| POST | `/loadForGroups` | JWT | — | 특정 그룹의 할 일 불러오기. 본문: `{ groupIds: [], status: "Open" }` |

## 자동화

기본 경로: `/doing/automations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 교회의 모든 자동화 목록 |
| GET | `/:id` | JWT | — | ID로 자동화 가져오기 |
| GET | `/check` | 공개 | — | 모든 자동화 점검 실행 |
| POST | `/` | JWT | — | 자동화 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 자동화 삭제 |

## 동작

기본 경로: `/doing/actions`

동작은 자동화가 실행될 때 무엇이 일어날지 정의합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID로 동작 가져오기 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 동작 가져오기 |
| POST | `/` | JWT | — | 동작 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 동작 삭제 |

## 조건

기본 경로: `/doing/conditions`

조건은 자동화를 실행시키는 기준을 정의합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID로 조건 가져오기 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 조건 가져오기 |
| POST | `/` | JWT | — | 조건 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 조건 삭제 |

## 접속사

기본 경로: `/doing/conjunctions`

접속사는 자동화 안의 여러 조건을 연결합니다(AND/OR 논리).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | ID로 접속사 가져오기 |
| GET | `/automation/:id` | JWT | — | 자동화의 모든 접속사 가져오기 |
| POST | `/` | JWT | — | 접속사 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 접속사 삭제 |

## 콘텐츠 제공자 인증

기본 경로: `/doing/contentProviderAuths`

CRUD 기본 클래스를 확장합니다(GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — 권한 확인 없음).

외부 콘텐츠 제공자(예: 프레젠테이션 소프트웨어 연동)의 OAuth 인증 기록을 관리합니다.

`accessToken`과 `refreshToken`은 저장될 때 `EncryptionHelper`로 암호화되고, 읽을 때 복호화됩니다. 따라서 API는 여전히 평문 토큰을 반환합니다. 암호화 이전에 저장된 행은 평문을 담고 있으며(평문에는 `|`가 들어 있지 않음), 그대로 반환되고 다음 저장 때 암호화됩니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 콘텐츠 제공자 인증 목록 |
| GET | `/:id` | JWT | — | ID로 콘텐츠 제공자 인증 가져오기 |
| GET | `/ids?ids=` | JWT | — | 쉼표로 구분된 ID로 여러 콘텐츠 제공자 인증 가져오기 |
| GET | `/ministry/:ministryId` | JWT | — | 사역의 모든 콘텐츠 제공자 인증 가져오기 |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | 특정 사역과 제공자의 인증 기록 가져오기 |
| POST | `/` | JWT | — | 콘텐츠 제공자 인증 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | — | 콘텐츠 제공자 인증 삭제 |

## 제공자 프록시

기본 경로: `/doing/providerProxy`

외부 콘텐츠 제공자(예: ProPresenter, EasyWorship)로 요청을 전달합니다. 토큰이 만료되면 토큰 갱신을 자동으로 처리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/browse` | JWT | — | 콘텐츠 제공자의 파일 찾아보기. 본문: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | 콘텐츠 제공자에서 프레젠테이션 가져오기. 본문: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | 콘텐츠 제공자에서 재생 목록 가져오기. 본문: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | 콘텐츠 항목의 지침 가져오기. 본문: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | 콘텐츠 항목의 확장된 지침 가져오기. 본문: `{ ministryId, providerId, path }` |

## 관련 문서

- [Membership 엔드포인트](./membership) — 교인, 그룹, 역할, 권한
- [Attendance 엔드포인트](./attendance) — 예배 및 방문 기록
- [모듈 구조](../module-structure) — 코드 구성 패턴
