---
title: "멤버십 엔드포인트"
---

# 멤버십 엔드포인트

<div class="article-intro">

멤버십 모듈은 사람, 교회, 그룹, 가구, 역할, 권한, 양식, 설정을 관리합니다. 가장 큰 모듈이며, 다른 모든 모듈에 핵심 신원 및 인가 계층을 제공합니다.

</div>

**기본 경로:** `/membership`

## 사람

기본 경로: `/membership/people`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | People.View 또는 Member | 교회의 모든 사람 목록 조회 |
| GET | `/:id` | JWT | People.View 또는 본인 레코드 | ID로 사람 조회 (양식 제출 포함) |
| GET | `/ids?ids=` | JWT | People.View, Member 또는 People.ViewNames | 쉼표로 구분된 ID로 여러 사람 조회. People.ViewNames만 가진 호출자는 People.View가 없어도 기본 모델을 받으며, 공개 제외(opt-out)된 사람은 제외됩니다(호출자 본인은 제외 대상 아님) |
| GET | `/basic?ids=` | JWT | — | 여러 사람의 기본 정보(이름만) 조회 |
| GET | `/names?ids=` | JWT | 교회 권한 있음(모든 권한) | `[{ id, name: { display, first, last }, photo }]` 형태로 반환하며, 성 기준 후 이름 기준으로 정렬됩니다. 호출자가 이미 보유한 쉼표 구분 ID에 대해서만 동작하므로, People.View 권한이 없는 역할(헌금, 출석)도 사람 이름을 표시할 수 있습니다. 검색이나 디렉터리 필터는 없습니다 |
| POST | `/names` | JWT | 교회 권한 있음(모든 권한) | `GET /names`와 동일합니다. 본문: `{ peopleIds }` (또는 `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member 또는 People.ViewNames | 최근에 추가된 사람 목록. People.ViewNames만 가진 호출자(디렉터리 접근 권한이 있는 구성원 포함)는 기본 모델(`id`, `name.display`, `photo`, `membershipStatus`)을 받으며, 공개 제외된 사람은 제외됩니다 |
| GET | `/guest-register/options?churchId=` | 공개 | — | QR 게스트 등록 체크리스트를 반환합니다: `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`이며, 각 항목은 `"off"`, `"optional"`, `"required"` 중 하나입니다(공개 설정인 `guestRegistrationFields`에서 파싱하며, 값이 없거나 형식이 잘못된 경우 이메일과 전화번호는 optional, 나머지는 off로 처리됩니다). 일치하는 사이트/교회 토큰이 요청에 없으면 `enableQRGuestRegistration`이 필요하며, 요청 빈도가 제한됩니다(429) |
| GET | `/search?term=&email=` | JWT | People.View, Member 또는 People.ViewNames | 이름 또는 이메일로 사람 검색(최대 100명, 성 기준 후 이름 기준 정렬). People.ViewNames만 가진 호출자(디렉터리 접근 권한이 있는 구성원 포함)는 기본 모델을 반환하는 이름 검색만 가능하며, `email` 검색은 `[]`를 반환합니다 |
| GET | `/search/phone?number=` | JWT | People.View 또는 Member | 전화번호로 검색 |
| GET | `/search/group?groupId=` | JWT | People.View 또는 Member | 특정 그룹의 사람 조회 |
| GET | `/household/:householdId` | JWT | — | 가구의 모든 사람 조회 |
| GET | `/attendance` | JWT | People.Edit | 필터(campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate)를 적용해 참석자 조회 |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | 사람과 그룹의 타임라인 데이터 조회 |
| GET | `/directory/:id` | JWT | — | 디렉터리 보기용 사람 정보 조회(공개 설정 적용) |
| GET | `/claim/:churchId` | JWT | — | 교회에서 현재 사용자의 사람 레코드를 연결(claim) |
| POST | `/` | JWT | People.Edit 또는 EditSelf | 사람 생성 또는 수정(일괄) |
| POST | `/search` | JWT | People.View, Member 또는 People.ViewNames | 사람 검색(POST 방식). 본문: `{ term }` 또는 `{ email }`. `GET /search`와 동일한 이름 전용 규칙이 적용됩니다 |
| POST | `/advancedSearch` | JWT | People.View 또는 Member | 다중 조건 검색(나이, birthMonth, membershipStatus 등). 본문은 조건의 배열이며, 본문이 비어 있으면 조건이 없는 것으로 간주하고, 배열이 아닌 다른 본문은 400을 반환합니다 |
| POST | `/loadOrCreate` | 공개 | — | 이메일로 사람을 찾거나 생성합니다. 본문: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | 공개 | — | QR 게스트 등록. 본문: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1~10명, email/phone/maritalStatus는 첫 번째 구성원에게만 적용). 교회가 비활성화한 필드는 제거되며, 필수 값이 없거나 값이 잘못된 경우 400을 반환합니다. 첫 번째 구성원의 성을 따서 이름을 붙인 새 가구를 만들고, 모든 구성원을 `membershipStatus: "Visitor"`로 등록하며, `address`를 모든 구성원에게 공유하고, `comments`를 대표자(head)의 메모로 저장합니다. `guestRegistrationGroupId`가 설정되어 있으면 모든 사람을 비공개 그룹에 추가하며, `guestRegistrationRecordAttendance`가 `"true"`이면 해당 그룹의 예정된 예배 시간 중 체크인 기간이 지금 열려 있는 시간에 대해 출석을 기록합니다. `{ householdId, people: [{ id, name }] }`를 반환합니다. 옵트인/토큰 및 요청 빈도 제한 규칙은 옵션 호출과 동일합니다 |
| POST | `/household/:householdId` | JWT | People.Edit | 가구 구성원 배정 수정 |
| POST | `/public/email` | 공개 | — | 사람에게 이메일 보내기. 본문: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | 내부 | — | ID로 사람의 이메일 목록 조회(서버 간 통신, jwtSecret 필요) |
| DELETE | `/:id` | JWT | People.Edit | 사람 삭제 |

### 예시: 사람 검색

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### 예시: 사람 생성

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## 사용자

기본 경로: `/membership/users`

로그인, 회원가입, 비밀번호 관리 엔드포인트는 [인증 및 권한](./authentication)을 참고하세요.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/login` | 공개 | — | 로그인(이메일/비밀번호, JWT 갱신 또는 authGuid) |
| POST | `/register` | 공개 | — | 새 사용자 등록 |
| POST | `/forgot` | 공개 | — | 비밀번호 재설정 이메일 발송 |
| POST | `/setPasswordGuid` | 공개 | — | 이메일 링크의 auth GUID로 비밀번호 설정 |
| POST | `/verifyCredentials` | 공개 | — | 이메일/비밀번호를 확인하고 연결된 교회 목록 반환 |
| POST | `/loadOrCreate` | JWT | — | 이메일/userId로 사용자를 찾거나 생성 |
| POST | `/setDisplayName` | JWT | — | 사용자의 이름과 성 수정 |
| POST | `/updateEmail` | JWT | — | 사용자 이메일 주소 변경 |
| POST | `/updatePassword` | JWT | — | 사용자 비밀번호 변경(최소 6자) |
| POST | `/updateOptedOut` | JWT | — | 사람의 공개 제외(opted-out) 상태 설정 |
| POST | `/sendInviteEmail` | JWT | People.Edit | 이 교회의 사람에게 초대 이메일 발송(`email`, `personName`, `contextName`). 버튼은 계정이 없는 사람에게는 **Sign Up**, 기존 사용자에게는 **Log In**으로 표시됩니다. 한 번도 로그인하지 않은 사용자에게는 7일 후 만료되는 **Set Your Password** 링크가 대신 제공됩니다. 고정 템플릿이므로 교회의 일일 이메일 한도에 포함되지 않습니다 |
| GET | `/search?term=` | JWT | Server.Admin | 이름/이메일로 모든 사용자 검색 |
| DELETE | `/` | JWT | — | 현재 사용자 계정 삭제 |

## 교회

기본 경로: `/membership/churches`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 현재 사용자의 모든 교회 조회 |
| GET | `/:id` | JWT | — | ID로 교회 조회 |
| GET | `/:id/getDomainAdmin` | JWT | — | 교회의 도메인 관리자 사용자 조회 |
| GET | `/:id/impersonate` | JWT | Server.Admin | 교회로 대리 로그인(서버 관리자만 가능) |
| GET | `/all?term=` | JWT | Server.Admin | 모든 교회 검색(관리자) |
| GET | `/search/?name=` | 공개 | — | 이름으로 교회 검색 |
| GET | `/lookup/?subDomain=&id=` | 공개 | — | 서브도메인 또는 ID로 교회 조회 |
| POST | `/` | JWT | Settings.Edit | 교회 정보 수정 |
| POST | `/add` | JWT | — | 새 교회 등록. 필수 항목: name, address1, city, state, zip, country |
| POST | `/search` | 공개 | — | 이름으로 교회 검색(POST 방식) |
| POST | `/select` | JWT | — | 교회 선택 또는 전환. 본문: `{ churchId }` 또는 `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | 교회 보관 또는 보관 해제 |
| POST | `/byIds` | 공개 | — | ID로 여러 교회 조회 |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7일 이상 방치된 교회 삭제 |

## 그룹

기본 경로: `/membership/groups`

기본 클래스의 표준 CRUD(GET `/`, GET `/:id`)를 확장합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 그룹 목록 조회 |
| GET | `/:id` | JWT | — | ID로 그룹 조회 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | 예배 필터로 그룹 검색 |
| GET | `/my` | JWT | — | 현재 사용자의 그룹 조회 |
| GET | `/my/:tag` | JWT | — | 태그로 필터링한 현재 사용자의 그룹 조회 |
| GET | `/tag/:tag` | JWT | — | 특정 태그의 모든 그룹 조회 |
| GET | `/public/:churchId/:id` | 공개 | — | 교회와 ID로 공개 그룹 조회 |
| GET | `/public/:churchId/tag/:tag` | 공개 | — | 태그로 공개 그룹 조회 |
| GET | `/public/:churchId/label?label=` | 공개 | — | 레이블로 공개 그룹 조회 |
| GET | `/public/:churchId/slug/:slug` | 공개 | — | slug로 공개 그룹 조회 |
| POST | `/` | JWT | Groups.Edit | 그룹 생성 또는 수정(slug 자동 생성) |
| DELETE | `/:id` | JWT | Groups.Edit | 그룹 삭제(사역 그룹의 하위 팀도 함께 삭제) |

## 그룹 구성원

기본 경로: `/membership/groupmembers`

기본 클래스의 표준 CRUD(GET `/:id`, DELETE `/:id`)를 확장합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | GroupMembers.View | ID로 그룹 구성원 조회 |
| GET | `/` | JWT | GroupMembers.View* | 그룹 구성원 목록 조회. `?groupId=`, `?groupIds=`, `?personId=`로 필터링합니다. *사용자가 그룹의 구성원이거나 본인의 personId를 조회하는 경우, 그리고 Attendance.View 또는 Attendance.Edit 권한이 있는 사용자가 기밀이 아닌 그룹의 `?groupId=`를 조회하는 경우에도 허용됩니다(이 경우 13세 미만 구성원도 포함됨) |
| GET | `/my` | JWT | — | 현재 사용자의 그룹 구성원 자격 조회 |
| GET | `/basic/:groupId` | JWT | — | 그룹의 기본 구성원 목록 조회 |
| GET | `/public/leaders/:churchId/:groupId` | 공개 | — | 그룹 리더 조회(공개) |
| GET | `/public/:churchId/:groupId` | 공개 | — | 그룹의 공개 명단 조회(최소 필드: `personId`, `displayName`, `leader`, photo). 그룹이 `publicRoster`로 공개를 허용한 경우에만 제공되며, 웹사이트 빌더의 `staffGrid` 요소에 사용됩니다 |
| POST | `/` | JWT | GroupMembers.Edit | 그룹 구성원 추가 또는 수정 |
| DELETE | `/:id` | JWT | GroupMembers.View | 그룹 구성원 제거 |

## 가구

기본 경로: `/membership/households`

표준 CRUD 컨트롤러입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 가구 목록 조회 |
| GET | `/:id` | JWT | — | ID로 가구 조회 |
| POST | `/` | JWT | People.Edit | 가구 생성 또는 수정 |
| DELETE | `/:id` | JWT | People.Edit | 가구 삭제 |

## 역할

기본 경로: `/membership/roles`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | Roles.View | ID로 역할 조회 |
| GET | `/church/:churchId` | JWT | Roles.View | 교회의 모든 역할 조회. 각 역할에는 해당 역할에 속한 고유 사용자 수인 `memberCount`가 포함됩니다 |
| POST | `/` | JWT | Roles.Edit | 역할 생성 또는 수정 |
| DELETE | `/:id` | JWT | Roles.Edit | 역할 삭제(역할의 권한과 구성원도 함께 제거) |

## 역할 구성원

기본 경로: `/membership/rolemembers`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | 역할의 구성원 조회. 사용자 상세 정보를 포함하려면 `?include=users`를 추가합니다 |
| POST | `/` | JWT | Roles.Edit | 역할에 구성원 추가(이메일이 없으면 사용자 생성) |
| DELETE | `/:id` | JWT | Roles.View | 역할 구성원 제거 |
| DELETE | `/self/:churchId/:userId` | JWT | — | 본인을 교회에서 제거 |

## 역할 권한

기본 경로: `/membership/rolepermissions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | 역할의 권한 조회("Everyone" 역할은 ID로 `null` 사용) |
| POST | `/` | JWT | Roles.Edit | 역할 권한 생성 또는 수정 |
| DELETE | `/:id` | JWT | Roles.Edit | 역할 권한 삭제 |

## 권한

기본 경로: `/membership/permissions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 사용 가능한 전체 권한 목록 조회 |

각 항목에는 `apiName`, `section`(콘텐츠 유형), `action`, 그리고 B1Admin의 역할 편집기에 표시되는 `displaySection` / `displayAction` 레이블이 있습니다. 최근 추가된 항목은 `MembershipApi` / `People` / `View Names`(**View People Names Only**, People and Groups 아래)와 `GivingApi` / `Donations` / `Enter`(**Enter Donations**, Donations 아래; [헌금 배치](./giving.md#donation-batches) 참고)입니다.

## 양식

기본 경로: `/membership/forms`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 모든 양식 목록 조회(관리자는 전체, 편집자는 배정된 양식과 구성원 전용이 아닌 양식을 조회) |
| GET | `/:id` | JWT | 양식 접근 권한 | ID로 양식 조회 |
| GET | `/archived` | JWT | Forms.Admin 또는 Forms.Edit | 보관된 양식 목록 조회 |
| GET | `/group/:groupId` | JWT | 그룹 구성원, 그룹 리더 또는 Forms.Admin | 그룹에 연결된 독립형 양식(`forms.groupId`)을 조회합니다. 보관된 양식은 제외하고 이름순으로 정렬합니다. `id`, `name`, `description`, 그리고 신청 가능 기간 내인지 나타내는 `open`을 반환합니다. 구성원은 열린 양식만 받고, 리더와 양식 관리자는 마감된 양식도 함께 받습니다. 그룹 페이지의 연결된 양식 목록에 사용됩니다 |
| GET | `/standalone/:id?churchId=` | JWT | — | 독립형 양식 조회(제한된 양식은 인증 필요) |
| POST | `/` | JWT | Forms.Admin 또는 Forms.Edit | 양식 생성 또는 수정. 독립형 양식은 선택 항목인 `photoUrl`(양식 상단에 표시되는 헤더 사진)과 `groupId`(연결된 그룹)를 받을 수 있습니다 |
| DELETE | `/:id` | JWT | 양식 접근 권한 | 양식 삭제 |

## 양식 제출

기본 경로: `/membership/formsubmissions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 제출 목록 조회. `?personId=` 또는 `?formId=`로 필터링합니다 |
| GET | `/my?include=questions,answers` | JWT | — | 본인 범위: 로그인한 구성원이 제출했거나 본인의 사람 레코드와 연결된 독립형 양식 제출(사람 양식 제외)을 최대 50건까지 최신순으로 조회합니다. 각 항목에는 `form.name`이 포함됩니다(`contentType`이 `person`이고 `contentId`가 본인의 사람 ID인 경우도 포함됩니다. 예: 관리자가 사람 정보를 변경한 경우). `include`를 지정하면 각 양식의 질문과 제출의 답변도 함께 반환합니다. 사용자가 사람과 연결되어 있지 않으면 `401`을 반환합니다. B1 Me 페이지의 **My Forms** 섹션에 사용됩니다 |
| GET | `/group/:groupId` | JWT | 그룹 리더 | 그룹 리더를 위한 답변 조회. 연결된 양식과 등록 양식이 있는 그룹 행사마다 항목 하나씩을 반환하며, 각 항목에는 `form`, `event`(`id`, `title`, `start`; 행사 항목에만 해당), `questions`, 그리고 `submissions`(`answers`와 `personName` 포함, 익명인 경우 `null`)가 포함됩니다 |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit 또는 조회 권한 | ID로 제출 조회. `?include=form,questions,answers`를 추가할 수 있습니다. 양식이 연결된 그룹의 리더와, 행사 등록이 속한 그룹의 리더도 조회할 수 있습니다 |
| GET | `/formId/:formId` | JWT | 양식 접근 권한(조회) | 양식의 모든 제출 조회(form, questions, answers 포함). 양식이 연결된 그룹의 리더는 조회 권한을 가집니다 |
| POST | `/` | JWT | — | 양식 답변 제출(제한/비제한 양식 모두 처리하며, 이메일 알림을 보냅니다). 양식에 `autoCreatePerson`이 있으면 이메일로 게스트 사람을 찾거나 생성하고 제출과 연결합니다. 양식에 `groupId`도 있으면 해당 사람을 그룹에 추가합니다. `followUpSubject`/`followUpBody`가 설정되어 있으면 제출자에게 템플릿 기반의 후속 이메일을 보냅니다. 호출자가 양식을 관리할 수 있는 경우가 아니라면, `submittedBy`는 항상 로그인한 구성원의 사람으로 설정되며(익명 제출인 경우 비워 둡니다) |
| DELETE | `/:id` | JWT | Forms.Admin 또는 Forms.Edit | 제출과 그 답변 삭제 |

## 질문

기본 경로: `/membership/questions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | 양식 접근 권한 | 양식의 질문 목록 조회. `?formId=`가 필요합니다 |
| GET | `/:id` | JWT | 양식 접근 권한 | ID로 질문 조회 |
| GET | `/unrestricted?formId=` | JWT | — | 비제한 양식의 질문 조회 |
| GET | `/sort/:id/up` | JWT | — | 질문을 정렬 순서에서 위로 이동 |
| GET | `/sort/:id/down` | JWT | — | 질문을 정렬 순서에서 아래로 이동 |
| POST | `/` | JWT | 양식 접근 권한 | 질문 생성 또는 수정(정렬 순서 자동 지정) |
| DELETE | `/:id?formId=` | JWT | 양식 접근 권한 | 질문 삭제 |

## 답변

기본 경로: `/membership/answers`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 답변 목록 조회. `?formSubmissionId=`로 필터링합니다 |
| POST | `/` | JWT | Forms.Admin 또는 Forms.Edit | 답변 생성 또는 수정 |

## 구성원 권한

기본 경로: `/membership/memberpermissions`

구성원별 특정 양식 접근을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | 양식 접근 권한 | ID로 구성원 권한 조회 |
| GET | `/member/:id` | JWT | 양식 접근 권한 | 구성원의 모든 양식 권한 조회 |
| GET | `/form/:id` | JWT | 양식 접근 권한 | 양식의 모든 구성원 권한 조회 |
| GET | `/form/:id/my` | JWT | 양식 접근 권한 | 양식에 대한 현재 사용자의 권한 조회 |
| POST | `/` | JWT | 양식 접근 권한 | 구성원 권한 생성 또는 수정 |
| DELETE | `/:id?formId=` | JWT | 양식 접근 권한 | 구성원 권한 삭제 |
| DELETE | `/member/:id?formId=` | JWT | 양식 접근 권한 | 양식에 대한 구성원의 모든 권한 삭제 |

## 설정

기본 경로: `/membership/settings`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Settings.Edit | 교회의 모든 설정 조회 |
| GET | `/public/:churchId` | 공개 | — | 교회의 공개 설정 조회 |
| POST | `/` | JWT | Settings.Edit | 설정 저장(base64 이미지 업로드 지원) |

## 도메인

기본 경로: `/membership/domains`

기본 클래스의 표준 CRUD(GET `/:id`, GET `/`, DELETE `/:id`)를 확장합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 도메인 목록 조회 |
| GET | `/:id` | JWT | — | ID로 도메인 조회 |
| GET | `/lookup/:domainName` | JWT | — | 이름으로 도메인 조회 |
| GET | `/public/lookup/:domainName` | 공개 | — | 이름으로 공개 도메인 조회 |
| GET | `/health/check` | 공개 | — | 확인되지 않은 도메인에 대해 상태 점검 실행 |
| POST | `/` | JWT | Settings.Edit | 도메인 생성 또는 수정(Caddy 업데이트 실행) |
| DELETE | `/:id` | JWT | Settings.Edit | 도메인 삭제 |

## 사용자-교회

기본 경로: `/membership/userchurch`

사용자와 교회의 연결 관계를 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/userid/:userId` | JWT | — | 사용자 ID로 사용자-교회 레코드 조회 |
| GET | `/personid/:personId` | JWT | — | 사람과 연결된 사용자의 이메일 조회 |
| GET | `/user/:userId` | JWT | Server.Admin | 사용자의 모든 교회 조회 |
| POST | `/` | JWT | — | 사용자-교회 연결 생성 |
| PATCH | `/:userId` | JWT | — | 마지막 접근 시간을 갱신하고 접근 기록 |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | 사용자-교회 레코드 삭제 |

## 공개 범위 설정

기본 경로: `/membership/visibilityPreferences`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | 현재 사용자의 공개 범위 설정 조회 |
| POST | `/` | JWT | — | 공개 범위 설정 저장(주소, 전화번호, 이메일 공개 여부) |

## 쿼리

기본 경로: `/membership/query`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/members` | JWT | — | AI를 사용한 자연어 구성원 검색. 본문: `{ text, subDomain, siteUrl }` |

## 클라이언트 오류

기본 경로: `/membership/clientErrors`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/` | JWT | — | 클라이언트 측 오류 기록 |

## 관련 페이지

- [인증 및 권한](./authentication) — 로그인 흐름, JWT, OAuth, 권한 모델
- [출석 엔드포인트](./attendance) — 예배 및 방문 추적
- [모듈 구조](../module-structure) — 코드 구성 패턴
