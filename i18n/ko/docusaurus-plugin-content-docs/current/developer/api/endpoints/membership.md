---
title: "Membership 엔드포인트"
---

# Membership 엔드포인트 {#membership-endpoints}

<div class="article-intro">

Membership 모듈은 사람, 교회, 그룹, 가구, 역할, 권한, 양식, 설정을 관리합니다. 가장 큰 모듈이며, 다른 모든 모듈에 핵심 신원 및 권한 부여 계층을 제공합니다.

</div>

**기본 경로:** `/membership`

## 사람 {#people}

기본 경로: `/membership/people`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | People.View 또는 Member | 교회의 모든 사람 목록 조회 |
| GET | `/:id` | JWT | People.View 또는 본인 기록 | ID로 사람 조회(양식 제출 포함) |
| GET | `/ids?ids=` | JWT | People.View, Member 또는 People.ViewNames | 쉼표로 구분한 ID로 여러 사람 조회. People.View 없이 People.ViewNames만 가진 호출자는 기본 모델을 받으며, 공개를 거부한 사람은 제외됨(호출자 본인은 제외 대상이 아님) |
| GET | `/basic?ids=` | JWT | — | 여러 사람의 기본 정보(이름만) 조회 |
| GET | `/names?ids=` | JWT | 교회의 모든 권한 | 호출자가 이미 가진 쉼표 구분 ID에 대해 `[{ id, name: { display, first, last }, photo }]`를 성, 이름 순으로 정렬하여 반환. 사람을 표시할 수 있도록 People.View가 없는 역할(헌금, 출석)에서도 사용 가능. 검색과 명부 필터는 없음 |
| POST | `/names` | JWT | 교회의 모든 권한 | `GET /names`와 같음. 본문: `{ peopleIds }`(또는 `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member 또는 People.ViewNames | 최근에 추가된 사람. People.View 없이 People.ViewNames만 가진 호출자(디렉터리 접근 권한이 있는 구성원도 포함)는 기본 모델(`id`, `name.display`, `photo`, `membershipStatus`)을 받으며, 공개를 거부한 사람은 제외됨 |
| GET | `/search?term=&email=` | JWT | People.View, Member 또는 People.ViewNames | 이름 또는 이메일로 사람 검색(최대 100명, 성, 이름 순 정렬). People.View 없이 People.ViewNames만 가진 호출자(디렉터리 접근 권한이 있는 구성원도 포함)는 기본 모델을 반환하는 이름 검색을 받으며, `email` 검색은 `[]`를 반환 |
| GET | `/search/phone?number=` | JWT | People.View 또는 Member | 전화번호로 검색 |
| GET | `/search/group?groupId=` | JWT | People.View 또는 Member | 특정 그룹의 사람 조회 |
| GET | `/household/:householdId` | JWT | — | 가구의 모든 사람 조회 |
| GET | `/attendance` | JWT | People.Edit | 필터(campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate)로 참석자 조회 |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | 사람과 그룹의 타임라인 데이터 조회 |
| GET | `/directory/:id` | JWT | — | 디렉터리 보기용 사람 조회(공개 설정을 따름) |
| GET | `/claim/:churchId` | JWT | — | 교회에서 현재 사용자를 위해 사람 기록을 확보 |
| POST | `/` | JWT | People.Edit 또는 EditSelf | 사람 생성 또는 업데이트(일괄) |
| POST | `/search` | JWT | People.View, Member 또는 People.ViewNames | 사람 검색(POST 변형). 본문: `{ term }` 또는 `{ email }`. `GET /search`와 같은 이름 전용 규칙 적용 |
| POST | `/advancedSearch` | JWT | People.View 또는 Member | 다중 조건 검색(나이, birthMonth, membershipStatus 등) |
| POST | `/loadOrCreate` | Public | — | 이메일로 사람을 찾거나 만들기. 본문: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | 가구 구성원 배정 업데이트 |
| POST | `/public/email` | Public | — | 사람에게 이메일 보내기. 본문: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | ID로 사람의 이메일 조회(서버 간 통신, jwtSecret 필요) |
| DELETE | `/:id` | JWT | People.Edit | 사람 삭제 |

### 예시: 사람 검색 {#example-search-people}

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

### 예시: 사람 만들기 {#example-create-a-person}

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## 사용자 {#users}

기본 경로: `/membership/users`

로그인, 등록, 비밀번호 관리 엔드포인트는 [인증 및 권한](./authentication)을 참조하세요.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/login` | Public | — | 로그인(이메일/비밀번호, JWT 갱신, 또는 authGuid) |
| POST | `/register` | Public | — | 새 사용자 등록 |
| POST | `/forgot` | Public | — | 비밀번호 재설정 이메일 발송 |
| POST | `/setPasswordGuid` | Public | — | 이메일 링크의 인증 GUID로 비밀번호 설정 |
| POST | `/verifyCredentials` | Public | — | 이메일/비밀번호를 확인하고 연결된 교회 반환 |
| POST | `/loadOrCreate` | JWT | — | 이메일/userId로 사용자를 찾거나 만들기 |
| POST | `/setDisplayName` | JWT | — | 사용자의 이름과 성 업데이트 |
| POST | `/updateEmail` | JWT | — | 사용자의 이메일 주소 변경 |
| POST | `/updatePassword` | JWT | — | 사용자의 비밀번호 변경(최소 6자) |
| POST | `/updateOptedOut` | JWT | — | 사람의 수신 거부 상태 설정 |
| POST | `/sendInviteEmail` | JWT | People.Edit | 이 교회의 사람에게 초대 이메일 보내기(`email`, `personName`, `contextName`). 버튼은 계정이 없는 사람에게 **가입하기**, 기존 사용자에게 **로그인**으로 표시됩니다. 한 번도 로그인하지 않은 사용자에게는 대신 7일 후 만료되는 **비밀번호 설정** 링크가 제공됩니다. 고정 템플릿이므로 교회의 일일 이메일 한도에 포함되지 않음 |
| GET | `/search?term=` | JWT | Server.Admin | 이름/이메일로 모든 사용자 검색 |
| DELETE | `/` | JWT | — | 현재 사용자 계정 삭제 |

## 교회 {#churches}

기본 경로: `/membership/churches`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 현재 사용자의 모든 교회 조회 |
| GET | `/:id` | JWT | — | ID로 교회 조회 |
| GET | `/:id/getDomainAdmin` | JWT | — | 교회의 도메인 관리자 사용자 조회 |
| GET | `/:id/impersonate` | JWT | Server.Admin | 교회로 가장(서버 관리자만) |
| GET | `/all?term=` | JWT | Server.Admin | 모든 교회 검색(관리자) |
| GET | `/search/?name=` | Public | — | 이름으로 교회 검색 |
| GET | `/lookup/?subDomain=&id=` | Public | — | 하위 도메인 또는 ID로 교회 조회 |
| POST | `/` | JWT | Settings.Edit | 교회 세부 정보 업데이트 |
| POST | `/add` | JWT | — | 새 교회 등록. 필수 필드: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | 이름으로 교회 검색(POST 변형) |
| POST | `/select` | JWT | — | 교회 선택/전환. 본문: `{ churchId }` 또는 `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | 교회 보관 또는 보관 해제 |
| POST | `/byIds` | Public | — | ID로 여러 교회 조회 |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7일 이상 방치된 교회 삭제 |

## 그룹 {#groups}

기본 경로: `/membership/groups`

기본 CRUD를 확장합니다(기본 클래스의 GET `/`, GET `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 그룹 목록 조회 |
| GET | `/:id` | JWT | — | ID로 그룹 조회 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | 예배 필터로 그룹 검색 |
| GET | `/my` | JWT | — | 현재 사용자의 그룹 조회 |
| GET | `/my/:tag` | JWT | — | 태그로 걸러진 현재 사용자의 그룹 조회 |
| GET | `/tag/:tag` | JWT | — | 특정 태그가 있는 모든 그룹 조회 |
| GET | `/public/:churchId/:id` | Public | — | 교회와 ID로 공개 그룹 조회 |
| GET | `/public/:churchId/tag/:tag` | Public | — | 태그로 공개 그룹 조회 |
| GET | `/public/:churchId/label?label=` | Public | — | 라벨로 공개 그룹 조회 |
| GET | `/public/:churchId/slug/:slug` | Public | — | slug로 공개 그룹 조회 |
| POST | `/` | JWT | Groups.Edit | 그룹 생성 또는 업데이트(slug 자동 생성) |
| DELETE | `/:id` | JWT | Groups.Edit | 그룹 삭제(사역 그룹의 하위 팀도 함께 삭제) |

## 그룹 구성원 {#group-members}

기본 경로: `/membership/groupmembers`

기본 CRUD를 확장합니다(기본 클래스의 GET `/:id`, DELETE `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | GroupMembers.View | ID로 그룹 구성원 조회 |
| GET | `/` | JWT | GroupMembers.View* | 그룹 구성원 목록 조회. `?groupId=`, `?groupIds=`, 또는 `?personId=`로 필터링. *사용자가 그룹의 구성원이거나 본인의 personId를 조회하는 경우, 그리고 사용자가 Attendance.View 또는 Attendance.Edit을 가진 경우 비공개가 아닌 그룹의 `?groupId=`에도 허용(이 경우 13세 미만 구성원도 포함됨) |
| GET | `/my` | JWT | — | 현재 사용자의 그룹 구성원 자격 조회 |
| GET | `/basic/:groupId` | JWT | — | 그룹의 기본 구성원 목록 조회 |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | 그룹 리더 조회(공개) |
| GET | `/public/:churchId/:groupId` | Public | — | 그룹의 공개 명단 조회(최소 필드: `personId`, `displayName`, `leader`, 사진). 그룹이 `publicRoster`로 공개를 선택한 경우에만 제공되며, 웹사이트 빌더의 `staffGrid` 요소를 구동 |
| POST | `/` | JWT | GroupMembers.Edit | 그룹 구성원 추가 또는 업데이트 |
| DELETE | `/:id` | JWT | GroupMembers.View | 그룹 구성원 제거 |

## 가구 {#households}

기본 경로: `/membership/households`

표준 CRUD 컨트롤러입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 가구 목록 조회 |
| GET | `/:id` | JWT | — | ID로 가구 조회 |
| POST | `/` | JWT | People.Edit | 가구 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | People.Edit | 가구 삭제 |

## 역할 {#roles}

기본 경로: `/membership/roles`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | Roles.View | ID로 역할 조회 |
| GET | `/church/:churchId` | JWT | Roles.View | 교회의 모든 역할 조회 |
| POST | `/` | JWT | Roles.Edit | 역할 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Roles.Edit | 역할 삭제(권한과 구성원도 함께 제거) |

## 역할 구성원 {#role-members}

기본 경로: `/membership/rolemembers`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | 역할의 구성원 조회. 사용자 세부 정보를 포함하려면 `?include=users` 추가 |
| POST | `/` | JWT | Roles.Edit | 역할에 구성원 추가(이메일이 없으면 사용자를 생성) |
| DELETE | `/:id` | JWT | Roles.View | 역할 구성원 제거 |
| DELETE | `/self/:churchId/:userId` | JWT | — | 교회에서 본인 제거 |

## 역할 권한 {#role-permissions}

기본 경로: `/membership/rolepermissions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | 역할의 권한 조회("Everyone" 역할은 ID로 `null` 사용) |
| POST | `/` | JWT | Roles.Edit | 역할 권한 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Roles.Edit | 역할 권한 삭제 |

## 권한 {#permissions}

기본 경로: `/membership/permissions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 사용 가능한 모든 권한의 전체 목록 조회 |

각 항목에는 `apiName`, `section`(콘텐츠 유형), `action`, 그리고 B1Admin 역할 편집기가 표시하는 `displaySection` / `displayAction` 라벨이 있습니다. 최근 추가된 항목은 다음과 같습니다. `MembershipApi` / `People` / `View Names`(**사람 이름만 보기**, 사람 및 그룹 아래)와 `GivingApi` / `Donations` / `Enter`(**헌금 입력**, 헌금 아래. [헌금 배치](./giving.md#donation-batches)를 참조하세요).

## 양식 {#forms}

기본 경로: `/membership/forms`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 모든 양식 목록 조회(관리자는 전체를, 편집자는 배정된 양식과 비구성원 양식을 봄) |
| GET | `/:id` | JWT | 양식 접근 권한 | ID로 양식 조회 |
| GET | `/archived` | JWT | Forms.Admin 또는 Forms.Edit | 보관된 양식 목록 조회 |
| GET | `/standalone/:id?churchId=` | JWT | — | 독립 양식 조회(제한된 양식은 인증 필요) |
| POST | `/` | JWT | Forms.Admin 또는 Forms.Edit | 양식 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | 양식 접근 권한 | 양식 삭제 |

## 양식 제출 {#form-submissions}

기본 경로: `/membership/formsubmissions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 제출 목록 조회. `?personId=` 또는 `?formId=`로 필터링 |
| GET | `/my?include=questions,answers` | JWT | — | 본인 전용: 로그인한 회원이 제출한 독립 양식 제출(사람 양식 제외)을 최신순으로 최대 50개 조회하며, 각각 `form.name`을 포함. `include`는 각 양식의 질문과 제출의 답변을 덧붙임. 사용자가 사람과 연결되어 있지 않으면 `401`을 반환. B1 나 페이지의 **내 양식** 섹션을 지원 |
| GET | `/:id` | JWT | Forms.Admin 또는 Forms.Edit | ID로 제출 조회. `?include=form,questions,answers` 추가 가능 |
| GET | `/formId/:formId` | JWT | 양식 접근 권한 | 양식의 모든 제출 조회(양식, 질문, 답변 포함) |
| POST | `/` | JWT | — | 양식 답변 제출(제한된/제한되지 않은 양식을 처리하고 이메일 알림을 보냄). 양식에 `autoCreatePerson`이 있으면 이메일로 손님 사람을 찾거나 만들고 제출과 연결하며, `followUpSubject`/`followUpBody`가 설정되어 있으면 제출자에게 템플릿 기반 후속 이메일을 보냄. 호출자가 양식을 관리할 수 있는 경우가 아니라면 `submittedBy`는 항상 로그인한 회원의 사람으로 설정되며(익명 제출이면 비어 있음) |
| DELETE | `/:id` | JWT | Forms.Admin 또는 Forms.Edit | 제출과 그 답변 삭제 |

## 질문 {#questions}

기본 경로: `/membership/questions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | 양식 접근 권한 | 양식의 질문 목록 조회. `?formId=`가 필요함 |
| GET | `/:id` | JWT | 양식 접근 권한 | ID로 질문 조회 |
| GET | `/unrestricted?formId=` | JWT | — | 제한되지 않은 양식의 질문 조회 |
| GET | `/sort/:id/up` | JWT | — | 질문을 정렬 순서에서 위로 이동 |
| GET | `/sort/:id/down` | JWT | — | 질문을 정렬 순서에서 아래로 이동 |
| POST | `/` | JWT | 양식 접근 권한 | 질문 생성 또는 업데이트(정렬 순서 자동 할당) |
| DELETE | `/:id?formId=` | JWT | 양식 접근 권한 | 질문 삭제 |

## 답변 {#answers}

기본 경로: `/membership/answers`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 답변 목록 조회. `?formSubmissionId=`로 필터링 |
| POST | `/` | JWT | Forms.Admin 또는 Forms.Edit | 답변 생성 또는 업데이트 |

## 구성원 권한 {#member-permissions}

기본 경로: `/membership/memberpermissions`

특정 양식에 대한 구성원별 접근을 제어합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/:id` | JWT | 양식 접근 권한 | ID로 구성원 권한 조회 |
| GET | `/member/:id` | JWT | 양식 접근 권한 | 구성원의 모든 양식 권한 조회 |
| GET | `/form/:id` | JWT | 양식 접근 권한 | 양식의 모든 구성원 권한 조회 |
| GET | `/form/:id/my` | JWT | 양식 접근 권한 | 양식에 대한 현재 사용자의 권한 조회 |
| POST | `/` | JWT | 양식 접근 권한 | 구성원 권한 생성 또는 업데이트 |
| DELETE | `/:id?formId=` | JWT | 양식 접근 권한 | 구성원 권한 삭제 |
| DELETE | `/member/:id?formId=` | JWT | 양식 접근 권한 | 양식에 대한 구성원의 모든 권한 삭제 |

## 설정 {#settings}

기본 경로: `/membership/settings`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Settings.Edit | 교회의 모든 설정 조회 |
| GET | `/public/:churchId` | Public | — | 교회의 공개 설정 조회 |
| POST | `/` | JWT | Settings.Edit | 설정 저장(base64 이미지 업로드 지원) |

## 도메인 {#domains}

기본 경로: `/membership/domains`

기본 CRUD를 확장합니다(기본 클래스의 GET `/:id`, GET `/`, DELETE `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 도메인 목록 조회 |
| GET | `/:id` | JWT | — | ID로 도메인 조회 |
| GET | `/lookup/:domainName` | JWT | — | 이름으로 도메인 조회 |
| GET | `/public/lookup/:domainName` | Public | — | 이름으로 공개 도메인 조회 |
| GET | `/health/check` | Public | — | 확인되지 않은 도메인에 대해 상태 점검 실행 |
| POST | `/` | JWT | Settings.Edit | 도메인 생성 또는 업데이트(Caddy 업데이트를 트리거) |
| DELETE | `/:id` | JWT | Settings.Edit | 도메인 삭제 |

## 사용자-교회 {#user-church}

기본 경로: `/membership/userchurch`

사용자와 교회의 연결을 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/userid/:userId` | JWT | — | 사용자 ID로 사용자-교회 기록 조회 |
| GET | `/personid/:personId` | JWT | — | 사람과 연결된 사용자의 이메일 조회 |
| GET | `/user/:userId` | JWT | Server.Admin | 사용자의 모든 교회 조회 |
| POST | `/` | JWT | — | 사용자-교회 연결 생성 |
| PATCH | `/:userId` | JWT | — | 마지막 접근 시간을 업데이트하고 접근을 기록 |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | 사용자-교회 기록 삭제 |

## 공개 설정 {#visibility-preferences}

기본 경로: `/membership/visibilityPreferences`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | 현재 사용자의 공개 설정 조회 |
| POST | `/` | JWT | — | 공개 설정 저장(주소, 전화, 이메일 공개 여부) |

## 질의 {#query}

기본 경로: `/membership/query`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/members` | JWT | — | AI를 사용한 자연어 구성원 검색. 본문: `{ text, subDomain, siteUrl }` |

## 클라이언트 오류 {#client-errors}

기본 경로: `/membership/clientErrors`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| POST | `/` | JWT | — | 클라이언트 측 오류 기록 |

## 관련 문서 {#related-pages}

- [인증 및 권한](./authentication) — 로그인 흐름, JWT, OAuth, 권한 모델
- [출석 엔드포인트](./attendance) — 예배 및 방문 추적
- [모듈 구조](../module-structure) — 코드 구성 패턴
