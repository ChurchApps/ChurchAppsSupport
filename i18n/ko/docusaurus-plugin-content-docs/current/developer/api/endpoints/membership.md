---
title: "멤버십 엔드포인트"
---

# 멤버십 엔드포인트

<div class="article-intro">

멤버십 모듈은 사람, 교회, 그룹, 가구, 역할, 권한, 양식 및 설정을 관리합니다. 가장 큰 모듈이며, 다른 모든 모듈에 핵심 신원 및 인가 계층을 제공합니다.

</div>

**기본 경로:** `/membership`

## 사람

기본 경로: `/membership/people`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View 또는 Member | 교회의 모든 사람 목록 조회 |
| GET | `/:id` | JWT | People.View 또는 본인 레코드 | ID로 사람 조회 (양식 제출 포함) |
| GET | `/ids?ids=` | JWT | People.View 또는 Member | 쉼표로 구분된 ID로 여러 사람 조회 |
| GET | `/basic?ids=` | JWT | — | 여러 사람의 기본 정보(이름만) 조회 |
| GET | `/names?ids=` | JWT | 교회 권한 있는 모든 사용자 | `[{ id, name: { display, first, last }, photo }]` 형식으로 반환하며, 성 후 이름 순으로 정렬됨. 호출자가 이미 알고 있는 쉼표 구분 ID에 대해 제공되므로 People.View가 없는 역할(헌금, 출석)도 사람에게 이름을 표시할 수 있음. 검색이나 디렉터리 필터는 없음 |
| POST | `/names` | JWT | 교회 권한 있는 모든 사용자 | `GET /names`와 동일. 본문: `{ peopleIds }` (또는 `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member 또는 People.ViewNames | 최근 추가된 사람. People.ViewNames만 있는 호출자는 기본 모델(`id`, `name.display`, `photo`, `membershipStatus`)을 받으며, 공개를 거부한 사람은 제외됨 |
| GET | `/search?term=&email=` | JWT | People.View, Member 또는 People.ViewNames | 이름 또는 이메일로 사람 검색(최대 100명, 성 후 이름 순 정렬). People.ViewNames만 있는 호출자는 기본 모델을 반환하는 이름 검색을 받으며, `email` 검색은 `[]`를 반환 |
| GET | `/search/phone?number=` | JWT | People.View 또는 Member | 전화번호로 검색 |
| GET | `/search/group?groupId=` | JWT | People.View 또는 Member | 특정 그룹의 사람 조회 |
| GET | `/household/:householdId` | JWT | — | 가구에 속한 모든 사람 조회 |
| GET | `/attendance` | JWT | People.Edit | 필터(campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate)로 참석자 조회 |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | 사람과 그룹의 타임라인 데이터 조회 |
| GET | `/directory/:id` | JWT | — | 디렉터리 보기용 사람 조회(공개 설정 적용) |
| GET | `/claim/:churchId` | JWT | — | 교회에서 현재 사용자의 사람 레코드를 연결(claim) |
| POST | `/` | JWT | People.Edit 또는 EditSelf | 사람 생성 또는 업데이트(일괄) |
| POST | `/search` | JWT | People.View, Member 또는 People.ViewNames | 사람 검색(POST 버전). 본문: `{ term }` 또는 `{ email }`; `GET /search`와 동일한 이름 전용 규칙 적용 |
| POST | `/advancedSearch` | JWT | People.View 또는 Member | 다중 조건 검색(나이, birthMonth, membershipStatus 등) |
| POST | `/loadOrCreate` | 공개 | — | 이메일로 사람 찾기 또는 생성. 본문: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | 가구 구성원 배정 업데이트 |
| POST | `/public/email` | 공개 | — | 사람에게 이메일 발송. 본문: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | 내부 | — | ID로 사람 이메일 조회(서버 간 통신, jwtSecret 필요) |
| DELETE | `/:id` | JWT | People.Edit | 사람 삭제 |

### 예제: 사람 검색

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

### 예제: 사람 생성

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## 사용자 {#users}

기본 경로: `/membership/users`

로그인, 등록 및 비밀번호 관리 엔드포인트는 [인증 및 권한](./authentication)을 참조하세요.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | 공개 | — | 로그인(이메일/비밀번호, JWT 갱신 또는 authGuid) |
| POST | `/register` | 공개 | — | 새 사용자 등록 |
| POST | `/forgot` | 공개 | — | 비밀번호 재설정 이메일 발송 |
| POST | `/setPasswordGuid` | 공개 | — | 이메일 링크의 인증 GUID로 비밀번호 설정 |
| POST | `/verifyCredentials` | 공개 | — | 이메일/비밀번호를 확인하고 연결된 교회 반환 |
| POST | `/loadOrCreate` | JWT | — | 이메일/userId로 사용자 찾기 또는 생성 |
| POST | `/setDisplayName` | JWT | — | 사용자의 이름과 성 업데이트 |
| POST | `/updateEmail` | JWT | — | 사용자의 이메일 주소 변경 |
| POST | `/updatePassword` | JWT | — | 사용자의 비밀번호 변경(최소 6자) |
| POST | `/updateOptedOut` | JWT | — | 사람의 수신 거부(opt-out) 상태 설정 |
| POST | `/sendInviteEmail` | JWT | People.Edit | 이 교회의 사람에게 초대 이메일 발송(`email`, `personName`, `contextName`). 계정이 없는 사람에게는 버튼에 **가입하기**, 기존 사용자에게는 **로그인**이 표시됨. 한 번도 로그인하지 않은 사용자는 대신 7일 후 만료되는 **비밀번호 설정** 링크를 받음. 교회의 일일 이메일 한도에 포함되며, 한도에 도달하면 `429` 반환 |
| GET | `/search?term=` | JWT | Server.Admin | 이름/이메일로 모든 사용자 검색 |
| DELETE | `/` | JWT | — | 현재 사용자 계정 삭제 |

## 교회

기본 경로: `/membership/churches`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 현재 사용자의 모든 교회 조회 |
| GET | `/:id` | JWT | — | ID로 교회 조회 |
| GET | `/:id/getDomainAdmin` | JWT | — | 교회의 도메인 관리자 사용자 조회 |
| GET | `/:id/impersonate` | JWT | Server.Admin | 교회로 가장(impersonate)(서버 관리자 전용) |
| GET | `/all?term=` | JWT | Server.Admin | 모든 교회 검색(관리자) |
| GET | `/search/?name=` | 공개 | — | 이름으로 교회 검색 |
| GET | `/lookup/?subDomain=&id=` | 공개 | — | 서브도메인 또는 ID로 교회 조회 |
| POST | `/` | JWT | Settings.Edit | 교회 정보 업데이트 |
| POST | `/add` | JWT | — | 새 교회 등록. 필수 항목: name, address1, city, state, zip, country |
| POST | `/search` | 공개 | — | 이름으로 교회 검색(POST 버전) |
| POST | `/select` | JWT | — | 교회 선택/전환. 본문: `{ churchId }` 또는 `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | 교회 보관 또는 보관 해제 |
| POST | `/byIds` | 공개 | — | ID로 여러 교회 조회 |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7일 이상 방치된 교회 삭제 |

## 그룹

기본 경로: `/membership/groups`

표준 CRUD를 확장합니다(기본 클래스에서 GET `/`, GET `/:id`).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 그룹 목록 조회 |
| GET | `/:id` | JWT | — | ID로 그룹 조회 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | 예배 필터로 그룹 검색 |
| GET | `/my` | JWT | — | 현재 사용자의 그룹 조회 |
| GET | `/my/:tag` | JWT | — | 태그로 필터링한 현재 사용자의 그룹 조회 |
| GET | `/tag/:tag` | JWT | — | 특정 태그가 있는 모든 그룹 조회 |
| GET | `/public/:churchId/:id` | 공개 | — | 교회와 ID로 공개 그룹 조회 |
| GET | `/public/:churchId/tag/:tag` | 공개 | — | 태그로 공개 그룹 조회 |
| GET | `/public/:churchId/label?label=` | 공개 | — | 라벨로 공개 그룹 조회 |
| GET | `/public/:churchId/slug/:slug` | 공개 | — | 슬러그로 공개 그룹 조회 |
| POST | `/` | JWT | Groups.Edit | 그룹 생성 또는 업데이트(슬러그 자동 생성) |
| DELETE | `/:id` | JWT | Groups.Edit | 그룹 삭제(사역 그룹의 하위 팀도 삭제) |

## 그룹 구성원

기본 경로: `/membership/groupmembers`

표준 CRUD를 확장합니다(기본 클래스에서 GET `/:id`, DELETE `/:id`).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | ID로 그룹 구성원 조회 |
| GET | `/` | JWT | GroupMembers.View* | 그룹 구성원 목록 조회. `?groupId=`, `?groupIds=` 또는 `?personId=`로 필터링. *사용자가 그룹에 속해 있거나 본인의 personId를 조회하는 경우에도 허용 |
| GET | `/my` | JWT | — | 현재 사용자의 그룹 구성 조회 |
| GET | `/basic/:groupId` | JWT | — | 그룹의 기본 구성원 목록 조회 |
| GET | `/public/leaders/:churchId/:groupId` | 공개 | — | 그룹 리더 조회(공개) |
| GET | `/public/:churchId/:groupId` | 공개 | — | 그룹의 공개 명단 조회(최소 필드: `personId`, `displayName`, `leader`, photo). 그룹이 `publicRoster`에 참여한 경우에만 제공되며, 웹사이트 빌더의 `staffGrid` 요소에 사용됨 |
| POST | `/` | JWT | GroupMembers.Edit | 그룹 구성원 추가 또는 업데이트 |
| DELETE | `/:id` | JWT | GroupMembers.View | 그룹 구성원 제거 |

## 가구

기본 경로: `/membership/households`

표준 CRUD 컨트롤러입니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 가구 목록 조회 |
| GET | `/:id` | JWT | — | ID로 가구 조회 |
| POST | `/` | JWT | People.Edit | 가구 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | People.Edit | 가구 삭제 |

## 역할

기본 경로: `/membership/roles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | ID로 역할 조회 |
| GET | `/church/:churchId` | JWT | Roles.View | 교회의 모든 역할 조회 |
| POST | `/` | JWT | Roles.Edit | 역할 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Roles.Edit | 역할 삭제(해당 권한과 구성원도 함께 제거) |

## 역할 구성원

기본 경로: `/membership/rolemembers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 역할의 구성원 조회. 사용자 세부 정보를 포함하려면 `?include=users` 추가 |
| POST | `/` | JWT | Roles.Edit | 역할에 구성원 추가(이메일이 없으면 사용자 생성) |
| DELETE | `/:id` | JWT | Roles.View | 역할 구성원 제거 |
| DELETE | `/self/:churchId/:userId` | JWT | — | 본인을 교회에서 제거 |

## 역할 권한

기본 경로: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 역할의 권한 조회("Everyone" 역할은 ID로 `null` 사용) |
| POST | `/` | JWT | Roles.Edit | 역할 권한 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Roles.Edit | 역할 권한 삭제 |

## 권한

기본 경로: `/membership/permissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 사용 가능한 전체 권한 목록 조회 |

각 항목에는 `apiName`, `section`(콘텐츠 유형), `action`과 B1Admin의 역할 편집기에 표시되는 `displaySection` / `displayAction` 라벨이 있습니다. 최근 추가된 항목은 `MembershipApi` / `People` / `View Names`(**사람 이름만 보기**, 사람 및 그룹 아래)와 `GivingApi` / `Donations` / `Enter`(**헌금 입력**, 헌금 아래; [헌금 일괄 처리](./giving.md#donation-batches) 참조)입니다.

## 양식

기본 경로: `/membership/forms`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 모든 양식 목록 조회(관리자는 전체, 편집자는 할당된 양식과 비구성원 양식을 조회) |
| GET | `/:id` | JWT | 양식 접근 권한 | ID로 양식 조회 |
| GET | `/archived` | JWT | Forms.Admin 또는 Forms.Edit | 보관된 양식 목록 조회 |
| GET | `/standalone/:id?churchId=` | JWT | — | 독립형 양식 조회(제한된 양식은 인증 필요) |
| POST | `/` | JWT | Forms.Admin 또는 Forms.Edit | 양식 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | 양식 접근 권한 | 양식 삭제 |

## 양식 제출

기본 경로: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 제출 목록 조회. `?personId=` 또는 `?formId=`로 필터링 |
| GET | `/:id` | JWT | Forms.Admin 또는 Forms.Edit | ID로 제출 조회. `?include=form,questions,answers` 추가 가능 |
| GET | `/formId/:formId` | JWT | 양식 접근 권한 | 양식의 모든 제출 조회(양식, 질문, 답변 포함) |
| POST | `/` | JWT | — | 양식 답변 제출(제한/비제한 양식 처리, 이메일 알림 발송). 양식에 `autoCreatePerson`이 설정된 경우 이메일로 Guest 사람을 찾거나 생성하고 제출과 연결하며, `followUpSubject`/`followUpBody`가 설정된 경우 제출자에게 템플릿 기반 후속 이메일을 발송 |
| DELETE | `/:id` | JWT | Forms.Admin 또는 Forms.Edit | 제출과 해당 답변 삭제 |

## 질문

기본 경로: `/membership/questions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | 양식 접근 권한 | 양식의 질문 목록 조회. `?formId=` 필수 |
| GET | `/:id` | JWT | 양식 접근 권한 | ID로 질문 조회 |
| GET | `/unrestricted?formId=` | JWT | — | 비제한 양식의 질문 조회 |
| GET | `/sort/:id/up` | JWT | — | 질문을 정렬 순서에서 위로 이동 |
| GET | `/sort/:id/down` | JWT | — | 질문을 정렬 순서에서 아래로 이동 |
| POST | `/` | JWT | 양식 접근 권한 | 질문 생성 또는 업데이트(정렬 순서 자동 할당) |
| DELETE | `/:id?formId=` | JWT | 양식 접근 권한 | 질문 삭제 |

## 답변

기본 경로: `/membership/answers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 답변 목록 조회. `?formSubmissionId=`로 필터링 |
| POST | `/` | JWT | Forms.Admin 또는 Forms.Edit | 답변 생성 또는 업데이트 |

## 구성원 권한

기본 경로: `/membership/memberpermissions`

구성원별로 특정 양식에 대한 접근을 제어합니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | 양식 접근 권한 | ID로 구성원 권한 조회 |
| GET | `/member/:id` | JWT | 양식 접근 권한 | 구성원의 모든 양식 권한 조회 |
| GET | `/form/:id` | JWT | 양식 접근 권한 | 양식의 모든 구성원 권한 조회 |
| GET | `/form/:id/my` | JWT | 양식 접근 권한 | 양식에 대한 현재 사용자의 권한 조회 |
| POST | `/` | JWT | 양식 접근 권한 | 구성원 권한 생성 또는 업데이트 |
| DELETE | `/:id?formId=` | JWT | 양식 접근 권한 | 구성원 권한 삭제 |
| DELETE | `/member/:id?formId=` | JWT | 양식 접근 권한 | 양식에 대한 구성원의 모든 권한 삭제 |

## 설정

기본 경로: `/membership/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | 교회의 모든 설정 조회 |
| GET | `/public/:churchId` | 공개 | — | 교회의 공개 설정 조회 |
| POST | `/` | JWT | Settings.Edit | 설정 저장(base64 이미지 업로드 지원) |

## 도메인

기본 경로: `/membership/domains`

표준 CRUD를 확장합니다(기본 클래스에서 GET `/:id`, GET `/`, DELETE `/:id`).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 도메인 목록 조회 |
| GET | `/:id` | JWT | — | ID로 도메인 조회 |
| GET | `/lookup/:domainName` | JWT | — | 이름으로 도메인 조회 |
| GET | `/public/lookup/:domainName` | 공개 | — | 이름으로 공개 도메인 조회 |
| GET | `/health/check` | 공개 | — | 확인되지 않은 도메인에 대해 상태 점검 실행 |
| POST | `/` | JWT | Settings.Edit | 도메인 생성 또는 업데이트(Caddy 업데이트 트리거) |
| DELETE | `/:id` | JWT | Settings.Edit | 도메인 삭제 |

## 사용자-교회

기본 경로: `/membership/userchurch`

사용자와 교회 간의 연결을 관리합니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | 사용자 ID로 사용자-교회 레코드 조회 |
| GET | `/personid/:personId` | JWT | — | 사람과 연결된 사용자의 이메일 조회 |
| GET | `/user/:userId` | JWT | Server.Admin | 사용자의 모든 교회 조회 |
| POST | `/` | JWT | — | 사용자-교회 연결 생성 |
| PATCH | `/:userId` | JWT | — | 마지막 접근 시간 업데이트 및 접근 기록 |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | 사용자-교회 레코드 삭제 |

## 공개 설정

기본 경로: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 현재 사용자의 공개 설정 조회 |
| POST | `/` | JWT | — | 공개 설정 저장(주소, 전화, 이메일 공개 여부) |

## 쿼리

기본 경로: `/membership/query`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | AI를 사용한 자연어 구성원 검색. 본문: `{ text, subDomain, siteUrl }` |

## 클라이언트 오류

기본 경로: `/membership/clientErrors`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | 클라이언트 측 오류 기록 |

## 관련 페이지

- [인증 및 권한](./authentication) — 로그인 흐름, JWT, OAuth, 권한 모델
- [출석 엔드포인트](./attendance) — 서비스 및 방문 추적
- [모듈 구조](../module-structure) — 코드 구성 패턴
