---
title: "Membership 엔드포인트"
---

# Membership 엔드포인트

<div class="article-intro">

Membership 모듈은 교인, 교회, 그룹, 가구, 역할, 권한, 양식, 설정을 관리합니다. 가장 큰 모듈이며, 다른 모든 모듈의 핵심 신원 및 인가 계층을 제공합니다.

</div>

**기본 경로:** `/membership`

## 교인

기본 경로: `/membership/people`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | People.View 또는 Member | 교회의 모든 교인 목록 |
| GET | `/:id` | JWT | People.View 또는 본인 기록 | ID로 교인 가져오기(양식 제출 내역 포함) |
| GET | `/ids?ids=` | JWT | People.View, Member, 또는 People.ViewNames | 쉼표로 구분된 ID로 여러 교인 가져오기. People.View 없이 People.ViewNames만 있는 호출자는 기본 모델을 받으며, 공개를 거부한 교인은 제외됨(본인 제외) |
| GET | `/basic?ids=` | JWT | — | 여러 교인의 기본 정보(이름만) 가져오기 |
| GET | `/names?ids=` | JWT | 교회 권한 아무거나 | `[{ id, name: { display, first, last }, photo }]`를 성, 그다음 이름 순으로 정렬해 반환. 호출자가 이미 알고 있는 쉼표 구분 ID에 대해서만 제공하므로, People.View가 없는 역할(헌금, 출석)도 교인 이름을 표시할 수 있음. 검색이나 디렉터리 필터는 없음 |
| POST | `/names` | JWT | 교회 권한 아무거나 | `GET /names`와 같음. 본문: `{ peopleIds }`(또는 `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, 또는 People.ViewNames | 최근 추가된 교인. People.View 없이 People.ViewNames만 있는 호출자(디렉터리 접근 권한이 있는 교인 포함)는 기본 모델(`id`, `name.display`, `photo`, `membershipStatus`)을 받으며, 공개를 거부한 교인은 제외됨 |
| GET | `/guest-register/options?churchId=` | 공개 | — | QR 손님 가입 체크리스트. `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`를 반환하며, 각 값은 `"off"`, `"optional"`, `"required"` 중 하나(공개 `guestRegistrationFields` 설정에서 파싱. 값이 없거나 잘못되어 있으면 이메일/전화번호는 선택, 나머지는 끔으로 대체). 요청에 일치하는 사이트/교회 토큰이 없으면 `enableQRGuestRegistration`이 필요하며, 요청 빈도가 제한됨(429) |
| GET | `/search?term=&email=` | JWT | People.View, Member, 또는 People.ViewNames | 이름이나 이메일로 교인 검색(최대 100명, 성, 그다음 이름 순 정렬). People.View 없이 People.ViewNames만 있는 호출자(디렉터리 접근 권한이 있는 교인 포함)는 기본 모델을 반환하는 이름 검색만 가능하며, `email` 검색은 `[]`를 반환 |
| GET | `/search/phone?number=` | JWT | People.View 또는 Member | 전화번호로 검색 |
| GET | `/search/group?groupId=` | JWT | People.View 또는 Member | 특정 그룹의 교인 가져오기 |
| GET | `/household/:householdId` | JWT | — | 가구의 모든 교인 가져오기 |
| GET | `/attendance` | JWT | People.Edit | 필터(campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate)로 참석자 불러오기 |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | 교인과 그룹의 타임라인 데이터 불러오기 |
| GET | `/directory/:id` | JWT | — | 디렉터리 보기용 교인 가져오기(공개 설정을 따름) |
| GET | `/claim/:churchId` | JWT | — | 교회에서 현재 사용자에게 교인 기록을 연결(claim) |
| POST | `/` | JWT | People.Edit 또는 EditSelf | 교인 생성 또는 업데이트(일괄) |
| POST | `/search` | JWT | People.View, Member, 또는 People.ViewNames | 교인 검색(POST 버전). 본문: `{ term }` 또는 `{ email }`. `GET /search`와 같은 이름 전용 규칙 적용 |
| POST | `/advancedSearch` | JWT | People.View 또는 Member | 여러 조건 검색(나이, birthMonth, membershipStatus 등). 본문은 조건의 배열이며, 본문이 비어 있으면 조건이 없는 것으로 보고, 배열이 아닌 다른 본문은 400을 반환 |
| POST | `/loadOrCreate` | 공개 | — | 이메일로 교인을 찾거나 만들기. 본문: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | 공개 | — | QR 손님 가입. 본문: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }`(1–10명. email/phone/maritalStatus는 첫 번째 교인에게만 적용). 교회가 끈 필드는 버리며, 필수 값이 없거나 잘못된 값이면 400을 반환. 먼저 기존 교인을 재사용함. 교인은 정확히 한 명의 삭제되지 않은 사람이 같은 이름(대소문자 무시)과 같은 이메일 또는 전화번호 숫자(집, 직장, 휴대폰)를 가질 때 일치함. 이메일과 전화번호가 없는 교인은 일치한 가구 안에서 이름으로 일치함. 일치한 교인은 절대 수정하지 않음. 일치하지 않은 교인은 일치한 가구에 들어가거나, 그렇지 않으면 공유 `address`를 가진 새 가구(첫 번째 교인의 성을 이름으로 사용)에 `membershipStatus: "Visitor"`로 들어감. `comments`는 첫 번째 교인의 메모로 저장하고, 설정되어 있으면 모든 사람을 비공개 `guestRegistrationGroupId` 그룹에 추가하며, `guestRegistrationRecordAttendance`가 `"true"`이면 그 그룹의 예정된 예배 시간 중 지금 체크인 창이 열린 시간에 출석을 기록함. `{ householdId, people: [{ id, name }] }`를 반환하며, 저장된 이름이 아니라 제출된 이름을 그대로 돌려줌. 옵션 호출과 같은 옵트인/토큰 및 요청 빈도 규칙 적용 |
| POST | `/household/:householdId` | JWT | People.Edit | 가구 구성원 배정 업데이트 |
| POST | `/public/email` | 공개 | — | 교인에게 이메일 보내기. 본문: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | 내부 | — | ID로 교인 이메일 불러오기(서버 간 호출, jwtSecret 필요) |
| DELETE | `/:id` | JWT | People.Edit | 교인 삭제 |

### 예시: 교인 검색하기

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

### 예시: 교인 만들기

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## 사용자 {#users}

기본 경로: `/membership/users`

로그인, 등록, 비밀번호 관리 엔드포인트는 [인증 및 권한](./authentication)을 참고하세요.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/login` | 공개 | — | 로그인(이메일/비밀번호, JWT 갱신, 또는 authGuid) |
| POST | `/register` | 공개 | — | 새 사용자 등록 |
| POST | `/forgot` | 공개 | — | 비밀번호 재설정 이메일 발송 |
| POST | `/setPasswordGuid` | 공개 | — | 이메일 링크의 인증 GUID로 비밀번호 설정 |
| POST | `/verifyCredentials` | 공개 | — | 이메일/비밀번호를 확인하고 연결된 교회 반환 |
| POST | `/loadOrCreate` | JWT | — | 이메일/userId로 사용자를 찾거나 만들기 |
| POST | `/setDisplayName` | JWT | — | 사용자의 이름과 성 업데이트 |
| POST | `/updateEmail` | JWT | — | 사용자의 이메일 주소 변경 |
| POST | `/updatePassword` | JWT | — | 사용자의 비밀번호 변경(최소 6자) |
| POST | `/updateOptedOut` | JWT | — | 교인의 수신 거부 상태 설정 |
| POST | `/sendInviteEmail` | JWT | People.Edit | 이 교회의 교인에게 초대 이메일 보내기(`email`, `personName`, `contextName`). 버튼은 계정이 없는 사람에게는 **Sign Up**, 기존 사용자에게는 **Log In**으로 표시됨. 한 번도 로그인하지 않은 사용자에게는 대신 7일 뒤 만료되는 **Set Your Password** 링크가 제공됨. 고정 템플릿이므로 교회의 일일 이메일 한도에 포함되지 않음 |
| GET | `/search?term=` | JWT | Server.Admin | 이름/이메일로 모든 사용자 검색 |
| DELETE | `/` | JWT | — | 현재 사용자 계정 삭제 |

## 교회

기본 경로: `/membership/churches`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 현재 사용자의 모든 교회 불러오기 |
| GET | `/:id` | JWT | — | ID로 교회 가져오기 |
| GET | `/:id/getDomainAdmin` | JWT | — | 교회의 도메인 관리자 사용자 가져오기 |
| GET | `/:id/impersonate` | JWT | Server.Admin | 교회로 대리 로그인(서버 관리자만) |
| GET | `/all?term=` | JWT | Server.Admin | 모든 교회 검색(관리자) |
| GET | `/search/?name=` | 공개 | — | 이름으로 교회 검색 |
| GET | `/lookup/?subDomain=&id=` | 공개 | — | 서브도메인 또는 ID로 교회 찾기 |
| POST | `/` | JWT | Settings.Edit | 교회 정보 업데이트 |
| POST | `/add` | JWT | — | 새 교회 등록. 필수 필드: name, address1, city, state, zip, country |
| POST | `/search` | 공개 | — | 이름으로 교회 검색(POST 버전) |
| POST | `/select` | JWT | — | 교회 선택/전환. 본문: `{ churchId }` 또는 `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | 교회 보관 또는 보관 해제 |
| POST | `/byIds` | 공개 | — | ID로 여러 교회 불러오기 |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7일 이상 방치된 교회 삭제 |

## 그룹

기본 경로: `/membership/groups`

표준 CRUD를 확장합니다(기본 클래스의 GET `/`, GET `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 그룹 목록 |
| GET | `/:id` | JWT | — | ID로 그룹 가져오기 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | 예배 필터로 그룹 검색 |
| GET | `/my` | JWT | — | 현재 사용자의 그룹 가져오기 |
| GET | `/my/:tag` | JWT | — | 태그로 필터링한 현재 사용자의 그룹 가져오기 |
| GET | `/tag/:tag` | JWT | — | 특정 태그를 가진 모든 그룹 가져오기 |
| GET | `/public/:churchId/:id` | 공개 | — | 교회와 ID로 공개 그룹 가져오기 |
| GET | `/public/:churchId/tag/:tag` | 공개 | — | 태그로 공개 그룹 가져오기 |
| GET | `/public/:churchId/label?label=` | 공개 | — | 라벨로 공개 그룹 가져오기 |
| GET | `/public/:churchId/slug/:slug` | 공개 | — | 슬러그로 공개 그룹 가져오기 |
| POST | `/` | JWT | Groups.Edit | 그룹 생성 또는 업데이트(슬러그 자동 생성) |
| DELETE | `/:id` | JWT | Groups.Edit | 그룹 삭제(사역 그룹이면 하위 팀도 삭제) |

## 그룹 구성원

기본 경로: `/membership/groupmembers`

표준 CRUD를 확장합니다(기본 클래스의 GET `/:id`, DELETE `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | GroupMembers.View | ID로 그룹 구성원 가져오기 |
| GET | `/` | JWT | GroupMembers.View* | 그룹 구성원 목록. `?groupId=`, `?groupIds=`, `?personId=`로 필터링. *사용자가 그 그룹에 속해 있거나 본인 personId를 조회하는 경우에도 허용되며, Attendance.View 또는 Attendance.Edit 권한이 있으면 기밀이 아닌 모든 그룹의 `?groupId=`도 허용됨(이 경우 13세 미만 구성원도 포함) |
| GET | `/my` | JWT | — | 현재 사용자의 그룹 소속 가져오기 |
| GET | `/basic/:groupId` | JWT | — | 그룹의 기본 구성원 목록 가져오기 |
| GET | `/public/leaders/:churchId/:groupId` | 공개 | — | 그룹 리더 가져오기(공개) |
| GET | `/public/:churchId/:groupId` | 공개 | — | 그룹의 공개 명단 가져오기(최소 필드: `personId`, `displayName`, `leader`, 사진). 그룹이 `publicRoster`로 옵트인한 경우에만 제공. 웹사이트 빌더의 `staffGrid` 요소를 뒷받침 |
| POST | `/` | JWT | GroupMembers.Edit | 그룹 구성원 추가 또는 업데이트 |
| DELETE | `/:id` | JWT | GroupMembers.View | 그룹 구성원 제거 |

## 가구

기본 경로: `/membership/households`

표준 CRUD 컨트롤러입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 가구 목록 |
| GET | `/:id` | JWT | — | ID로 가구 가져오기 |
| POST | `/` | JWT | People.Edit | 가구 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | People.Edit | 가구 삭제 |

## 역할

기본 경로: `/membership/roles`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | Roles.View | ID로 역할 가져오기 |
| GET | `/church/:churchId` | JWT | Roles.View | 교회의 모든 역할 가져오기. 각 역할에는 그 역할에 속한 서로 다른 사용자 수인 `memberCount`가 포함됨 |
| POST | `/` | JWT | Roles.Edit | 역할 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Roles.Edit | 역할 삭제(권한과 구성원도 함께 제거) |

## 역할 구성원

기본 경로: `/membership/rolemembers`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | 역할의 구성원 가져오기. `?include=users`를 추가하면 사용자 세부 정보 포함 |
| POST | `/` | JWT | Roles.Edit | 역할에 구성원 추가(이메일이 없으면 사용자 생성) |
| DELETE | `/:id` | JWT | Roles.View | 역할 구성원 제거 |
| DELETE | `/self/:churchId/:userId` | JWT | — | 교회에서 본인 제거 |

## 역할 권한

기본 경로: `/membership/rolepermissions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | 역할의 권한 가져오기("Everyone" 역할은 ID로 `null` 사용) |
| POST | `/` | JWT | Roles.Edit | 역할 권한 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Roles.Edit | 역할 권한 삭제 |

## 권한

기본 경로: `/membership/permissions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 사용 가능한 모든 권한의 전체 목록 가져오기 |

각 항목에는 `apiName`, `section`(콘텐츠 유형), `action`, 그리고 B1Admin 역할 편집기가 보여 주는 `displaySection` / `displayAction` 레이블이 있습니다. 최근 추가된 항목은 `MembershipApi` / `People` / `View Names`(**View People Names Only**, People and Groups 아래)와 `GivingApi` / `Donations` / `Enter`(**Enter Donations**, Donations 아래. [헌금 묶음](./giving.md#donation-batches) 참고)입니다.

## 양식

기본 경로: `/membership/forms`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 모든 양식 목록(관리자는 전부 보고, 편집자는 배정된 양식과 교인이 아닌 양식을 봄) |
| GET | `/:id` | JWT | 양식 접근 | ID로 양식 가져오기 |
| GET | `/archived` | JWT | Forms.Admin 또는 Forms.Edit | 보관된 양식 목록 |
| GET | `/group/:groupId` | JWT | 그룹 구성원, 그룹 리더, 또는 Forms.Admin | 그룹에 연결된 독립형 양식(`forms.groupId`). 보관된 양식은 제외하고 이름순 정렬. `id`, `name`, `description`, `open`(사용 가능 기간 안에 있는지)을 반환. 구성원은 열린 양식만 받고, 리더와 양식 관리자는 닫힌 양식도 받음. 그룹 페이지의 연결된 양식을 뒷받침 |
| GET | `/standalone/:id?churchId=` | JWT | — | 독립형 양식 가져오기(제한된 양식은 인증 필요) |
| POST | `/` | JWT | Forms.Admin 또는 Forms.Edit | 양식 생성 또는 업데이트. 독립형 양식은 선택 항목인 `photoUrl`(양식 위에 표시되는 머리글 사진)과 `groupId`(연결된 그룹)를 받음 |
| DELETE | `/:id` | JWT | 양식 접근 | 양식 삭제 |

## 양식 제출

기본 경로: `/membership/formsubmissions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 제출 목록. `?personId=` 또는 `?formId=`로 필터링 |
| GET | `/my?include=questions,answers` | JWT | — | 본인 범위: 로그인한 교인이 제출했거나 본인 교인 기록에 연결된 독립형 양식 제출(교인 양식 제외)을 최대 50개, 최신순으로 반환. 각 항목에 `form.name`이 포함됨. 연결된 교인 기록은 `contentType` `person`, `contentId` = 본인의 교인 ID(예: 관리자가 교인 정보를 바꾼 뒤)를 말함. `include`를 지정하면 각 양식의 질문과 제출의 답변을 붙임. 사용자가 교인과 연결되지 않았으면 `401` 반환. 교인 Me 페이지의 **My Forms** 섹션을 뒷받침 |
| GET | `/group/:groupId` | JWT | 그룹 리더 | 그룹 리더를 위한 답변. 연결된 양식마다 한 항목, 등록 양식이 있는 그룹 행사마다 한 항목을 제공하며, 각각 `form`, `event`(`id`, `title`, `start`. 행사 항목에만 있음), `questions`, `submissions`(`answers`와 `personName` 포함. 익명이면 `null`)를 가짐 |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit, 또는 보기 권한 | ID로 제출 가져오기. `?include=form,questions,answers`를 추가할 수 있음. 양식에 연결된 그룹의 리더와 행사 등록이 속한 그룹의 리더도 읽을 수 있음 |
| GET | `/formId/:formId` | JWT | 양식 접근(보기) | 양식의 모든 제출 가져오기(양식, 질문, 답변 포함). 양식에 연결된 그룹의 리더는 보기 권한이 있음 |
| POST | `/` | JWT | — | 양식 답변 제출(제한된/제한되지 않은 양식을 처리하고 이메일 알림을 보냄). 양식에 `autoCreatePerson`이 있으면 이메일로 손님 교인을 찾거나 만들고 제출을 연결함. 양식에 `groupId`도 있으면 그 교인을 그룹에 추가함. `followUpSubject`/`followUpBody`가 설정되어 있으면 제출자에게 템플릿 후속 이메일을 보냄. 호출자가 양식을 관리할 수 없는 경우 `submittedBy`는 항상 로그인한 교인의 교인 ID로 설정되며(익명 제출이면 비어 있음) |
| DELETE | `/:id` | JWT | Forms.Admin 또는 Forms.Edit | 제출과 그 답변 삭제 |

## 질문

기본 경로: `/membership/questions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | 양식 접근 | 양식의 질문 목록. `?formId=` 필요 |
| GET | `/:id` | JWT | 양식 접근 | ID로 질문 가져오기 |
| GET | `/unrestricted?formId=` | JWT | — | 제한되지 않은 양식의 질문 가져오기 |
| GET | `/sort/:id/up` | JWT | — | 질문을 정렬 순서에서 위로 이동 |
| GET | `/sort/:id/down` | JWT | — | 질문을 정렬 순서에서 아래로 이동 |
| POST | `/` | JWT | 양식 접근 | 질문 생성 또는 업데이트(정렬 순서 자동 배정) |
| DELETE | `/:id?formId=` | JWT | 양식 접근 | 질문 삭제 |

## 답변

기본 경로: `/membership/answers`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 답변 목록. `?formSubmissionId=`로 필터링 |
| POST | `/` | JWT | Forms.Admin 또는 Forms.Edit | 답변 생성 또는 업데이트 |

## 교인별 권한

기본 경로: `/membership/memberpermissions`

교인별로 특정 양식에 대한 접근을 제어합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | 양식 접근 | ID로 교인 권한 가져오기 |
| GET | `/member/:id` | JWT | 양식 접근 | 교인의 모든 양식 권한 가져오기 |
| GET | `/form/:id` | JWT | 양식 접근 | 양식의 모든 교인 권한 가져오기 |
| GET | `/form/:id/my` | JWT | 양식 접근 | 양식에 대한 현재 사용자의 권한 가져오기 |
| POST | `/` | JWT | 양식 접근 | 교인 권한 생성 또는 업데이트 |
| DELETE | `/:id?formId=` | JWT | 양식 접근 | 교인 권한 삭제 |
| DELETE | `/member/:id?formId=` | JWT | 양식 접근 | 양식에서 교인의 모든 권한 삭제 |

## 설정

기본 경로: `/membership/settings`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Settings.Edit | 교회의 모든 설정 가져오기 |
| GET | `/public/:churchId` | 공개 | — | 교회의 공개 설정 가져오기 |
| POST | `/` | JWT | Settings.Edit | 설정 저장(base64 이미지 업로드 지원) |

## 도메인

기본 경로: `/membership/domains`

표준 CRUD를 확장합니다(기본 클래스의 GET `/:id`, GET `/`, DELETE `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 도메인 목록 |
| GET | `/:id` | JWT | — | ID로 도메인 가져오기 |
| GET | `/lookup/:domainName` | JWT | — | 이름으로 도메인 찾기 |
| GET | `/public/lookup/:domainName` | 공개 | — | 이름으로 공개 도메인 찾기 |
| GET | `/health/check` | 공개 | — | 확인되지 않은 도메인에 대해 상태 점검 실행 |
| POST | `/` | JWT | Settings.Edit | 도메인 생성 또는 업데이트(Caddy 업데이트를 발동) |
| DELETE | `/:id` | JWT | Settings.Edit | 도메인 삭제 |

## 사용자-교회

기본 경로: `/membership/userchurch`

사용자와 교회의 연결을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/userid/:userId` | JWT | — | 사용자 ID로 사용자-교회 기록 가져오기 |
| GET | `/personid/:personId` | JWT | — | 교인과 연결된 사용자의 이메일 가져오기 |
| GET | `/user/:userId` | JWT | Server.Admin | 사용자의 모든 교회 불러오기 |
| POST | `/` | JWT | — | 사용자-교회 연결 생성 |
| PATCH | `/:userId` | JWT | — | 마지막 접근 시각을 업데이트하고 접근을 기록 |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | 사용자-교회 기록 삭제 |

## 공개 설정 선호도

기본 경로: `/membership/visibilityPreferences`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | 현재 사용자의 공개 설정 선호도 가져오기 |
| POST | `/` | JWT | — | 공개 설정 선호도 저장(주소, 전화, 이메일 공개 여부) |

## 쿼리

기본 경로: `/membership/query`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/members` | JWT | — | AI를 사용한 자연어 교인 검색. 본문: `{ text, subDomain, siteUrl }` |

## 클라이언트 오류

기본 경로: `/membership/clientErrors`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/` | JWT | — | 클라이언트 측 오류 기록 |

## 관련 문서

- [인증 및 권한](./authentication) — 로그인 흐름, JWT, OAuth, 권한 모델
- [출석 엔드포인트](./attendance) — 예배 및 방문 기록
- [모듈 구조](../module-structure) — 코드 구성 패턴
