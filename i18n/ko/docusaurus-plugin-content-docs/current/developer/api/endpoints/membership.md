---
title: "멤버십 엔드포인트"
---

# 멤버십 엔드포인트

<div class="article-intro">

Membership 모듈은 인물, 교회, 그룹, 가구(household), 역할, 권한, 양식, 설정을 관리합니다. 가장 규모가 큰 모듈이며 다른 모든 모듈의 핵심 신원 및 인가(authorization) 계층을 제공합니다.

</div>

**기본 경로:** `/membership`

## People

기본 경로: `/membership/people`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View 또는 Member | 교회의 모든 인물 목록을 가져옵니다 |
| GET | `/:id` | JWT | People.View 또는 본인 레코드 | ID로 인물을 가져옵니다(양식 제출 내용 포함) |
| GET | `/ids?ids=` | JWT | People.View 또는 Member | 쉼표로 구분된 ID로 여러 인물을 가져옵니다 |
| GET | `/basic?ids=` | JWT | — | 여러 인물의 기본 정보(이름만)를 가져옵니다 |
| GET | `/recent` | JWT | People.View 또는 Member | 최근 추가된 인물 목록 |
| GET | `/search?term=&email=` | JWT | People.View 또는 Member | 이름 또는 이메일로 인물을 검색합니다 |
| GET | `/search/phone?number=` | JWT | People.View 또는 Member | 전화번호로 검색합니다 |
| GET | `/search/group?groupId=` | JWT | People.View 또는 Member | 특정 그룹에 속한 인물을 가져옵니다 |
| GET | `/household/:householdId` | JWT | — | 특정 가구에 속한 모든 인물을 가져옵니다 |
| GET | `/attendance` | JWT | People.Edit | 필터(campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate)를 사용해 참석자를 가져옵니다 |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | 인물 및 그룹의 타임라인 데이터를 가져옵니다 |
| GET | `/directory/:id` | JWT | — | 디렉터리 뷰용 인물 정보를 가져옵니다(공개 범위 설정을 준수) |
| GET | `/claim/:churchId` | JWT | — | 특정 교회에서 현재 사용자의 인물 레코드를 소유권 주장(claim)합니다 |
| POST | `/` | JWT | People.Edit 또는 EditSelf | 인물을 생성하거나 업데이트합니다(일괄 처리) |
| POST | `/search` | JWT | People.View 또는 Member | 인물을 검색합니다(POST 방식) |
| POST | `/advancedSearch` | JWT | People.View 또는 Member | 다중 조건 검색(나이, birthMonth, membershipStatus 등) |
| POST | `/loadOrCreate` | Public | — | 이메일로 인물을 찾거나 생성합니다. 본문: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | 가구 구성원 배정을 업데이트합니다 |
| POST | `/public/email` | Public | — | 인물에게 이메일을 보냅니다. 본문: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | ID로 인물의 이메일 정보를 가져옵니다(서버 간 통신, jwtSecret 필요) |
| DELETE | `/:id` | JWT | People.Edit | 인물을 삭제합니다 |

### 예시: 인물 검색

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

### 예시: 인물 생성

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Users

기본 경로: `/membership/users`

로그인, 등록, 비밀번호 관리 엔드포인트는 [인증 및 권한](./authentication)을 참조하세요.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | 로그인합니다(이메일/비밀번호, JWT 갱신, 또는 authGuid) |
| POST | `/register` | Public | — | 새 사용자를 등록합니다 |
| POST | `/forgot` | Public | — | 비밀번호 재설정 이메일을 보냅니다 |
| POST | `/setPasswordGuid` | Public | — | 이메일 링크의 auth GUID를 사용해 비밀번호를 설정합니다 |
| POST | `/verifyCredentials` | Public | — | 이메일/비밀번호를 확인하고 연결된 교회 목록을 반환합니다 |
| POST | `/loadOrCreate` | JWT | — | 이메일/userId로 사용자를 찾거나 생성합니다 |
| POST | `/setDisplayName` | JWT | — | 사용자의 이름과 성을 업데이트합니다 |
| POST | `/updateEmail` | JWT | — | 사용자의 이메일 주소를 변경합니다 |
| POST | `/updatePassword` | JWT | — | 사용자의 비밀번호를 변경합니다(최소 6자) |
| POST | `/updateOptedOut` | JWT | — | 인물의 수신 거부 상태를 설정합니다 |
| GET | `/search?term=` | JWT | Server.Admin | 이름/이메일로 모든 사용자를 검색합니다 |
| DELETE | `/` | JWT | — | 현재 사용자 계정을 삭제합니다 |

## Churches

기본 경로: `/membership/churches`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 현재 사용자의 모든 교회를 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 교회를 가져옵니다 |
| GET | `/:id/getDomainAdmin` | JWT | — | 교회의 도메인 관리자 사용자를 가져옵니다 |
| GET | `/:id/impersonate` | JWT | Server.Admin | 교회로 가장(impersonate)합니다(서버 관리자 전용) |
| GET | `/all?term=` | JWT | Server.Admin | 모든 교회를 검색합니다(관리자용) |
| GET | `/search/?name=` | Public | — | 이름으로 교회를 검색합니다 |
| GET | `/lookup/?subDomain=&id=` | Public | — | 서브도메인 또는 ID로 교회를 조회합니다 |
| POST | `/` | JWT | Settings.Edit | 교회 정보를 업데이트합니다 |
| POST | `/add` | JWT | — | 새 교회를 등록합니다. 필수 필드: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | 이름으로 교회를 검색합니다(POST 방식) |
| POST | `/select` | JWT | — | 교회를 선택/전환합니다. 본문: `{ churchId }` 또는 `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | 교회를 보관하거나 보관 해제합니다 |
| POST | `/byIds` | Public | — | ID 목록으로 여러 교회를 가져옵니다 |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7일 이상 방치된 교회를 삭제합니다 |

## Groups

기본 경로: `/membership/groups`

표준 CRUD를 확장합니다(기본 클래스의 GET `/`, GET `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 그룹 목록을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 그룹을 가져옵니다 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | 예배 관련 필터로 그룹을 검색합니다 |
| GET | `/my` | JWT | — | 현재 사용자의 그룹을 가져옵니다 |
| GET | `/my/:tag` | JWT | — | 태그로 필터링된 현재 사용자의 그룹을 가져옵니다 |
| GET | `/tag/:tag` | JWT | — | 특정 태그가 있는 모든 그룹을 가져옵니다 |
| GET | `/public/:churchId/:id` | Public | — | 교회 및 ID로 공개 그룹을 가져옵니다 |
| GET | `/public/:churchId/tag/:tag` | Public | — | 태그별 공개 그룹을 가져옵니다 |
| GET | `/public/:churchId/label?label=` | Public | — | 라벨별 공개 그룹을 가져옵니다 |
| GET | `/public/:churchId/slug/:slug` | Public | — | 슬러그로 공개 그룹을 가져옵니다 |
| POST | `/` | JWT | Groups.Edit | 그룹을 생성하거나 업데이트합니다(슬러그 자동 생성) |
| DELETE | `/:id` | JWT | Groups.Edit | 그룹을 삭제합니다(사역 그룹의 경우 하위 팀도 함께 삭제) |

## Group Members

기본 경로: `/membership/groupmembers`

표준 CRUD를 확장합니다(기본 클래스의 GET `/:id`, DELETE `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | ID로 그룹 구성원을 가져옵니다 |
| GET | `/` | JWT | GroupMembers.View* | 그룹 구성원 목록을 가져옵니다. `?groupId=`, `?groupIds=`, 또는 `?personId=`로 필터링합니다. *해당 그룹의 구성원이거나 본인의 personId를 조회하는 경우에도 허용됩니다 |
| GET | `/my` | JWT | — | 현재 사용자의 그룹 소속 정보를 가져옵니다 |
| GET | `/basic/:groupId` | JWT | — | 그룹의 기본 구성원 목록을 가져옵니다 |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | 그룹 리더 목록을 가져옵니다(공개) |
| GET | `/public/:churchId/:groupId` | Public | — | 그룹의 공개 명단을 가져옵니다(최소 필드: `personId`, `displayName`, `leader`, photo). 그룹이 `publicRoster`로 옵트인한 경우에만 제공되며, 웹사이트 빌더의 `staffGrid` 요소를 지원합니다 |
| POST | `/` | JWT | GroupMembers.Edit | 그룹 구성원을 추가하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | GroupMembers.View | 그룹 구성원을 제거합니다 |

## Households

기본 경로: `/membership/households`

표준 CRUD 컨트롤러입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 가구 목록을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 가구를 가져옵니다 |
| POST | `/` | JWT | People.Edit | 가구를 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | People.Edit | 가구를 삭제합니다 |

## Roles

기본 경로: `/membership/roles`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | ID로 역할을 가져옵니다 |
| GET | `/church/:churchId` | JWT | Roles.View | 교회의 모든 역할을 가져옵니다 |
| POST | `/` | JWT | Roles.Edit | 역할을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Roles.Edit | 역할을 삭제합니다(관련 권한 및 구성원도 함께 제거) |

## Role Members

기본 경로: `/membership/rolemembers`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 역할의 구성원을 가져옵니다. `?include=users`를 추가하면 사용자 세부 정보가 포함됩니다 |
| POST | `/` | JWT | Roles.Edit | 역할에 구성원을 추가합니다(이메일이 존재하지 않으면 사용자를 생성) |
| DELETE | `/:id` | JWT | Roles.View | 역할 구성원을 제거합니다 |
| DELETE | `/self/:churchId/:userId` | JWT | — | 본인을 교회에서 제거합니다 |

## Role Permissions

기본 경로: `/membership/rolepermissions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 역할의 권한을 가져옵니다("Everyone" 역할은 ID로 `null`을 사용) |
| POST | `/` | JWT | Roles.Edit | 역할 권한을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Roles.Edit | 역할 권한을 삭제합니다 |

## Permissions

기본 경로: `/membership/permissions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 사용 가능한 전체 권한 목록을 가져옵니다 |

## Forms

기본 경로: `/membership/forms`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 모든 양식 목록을 가져옵니다(관리자는 전체를 확인하며, 편집자는 배정된 양식과 비회원용 양식을 확인합니다) |
| GET | `/:id` | JWT | 양식 접근 권한 | ID로 양식을 가져옵니다 |
| GET | `/archived` | JWT | Forms.Admin 또는 Forms.Edit | 보관된 양식 목록을 가져옵니다 |
| GET | `/standalone/:id?churchId=` | JWT | — | 독립형 양식을 가져옵니다(제한된 양식은 인증 필요) |
| POST | `/` | JWT | Forms.Admin 또는 Forms.Edit | 양식을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | 양식 접근 권한 | 양식을 삭제합니다 |

## Form Submissions

기본 경로: `/membership/formsubmissions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 제출 내역을 가져옵니다. `?personId=` 또는 `?formId=`로 필터링합니다 |
| GET | `/:id` | JWT | Forms.Admin 또는 Forms.Edit | ID로 제출 내역을 가져옵니다. `?include=form,questions,answers`를 추가할 수 있습니다 |
| GET | `/formId/:formId` | JWT | 양식 접근 권한 | 양식의 모든 제출 내역을 가져옵니다(양식, 질문, 답변 포함) |
| POST | `/` | JWT | — | 양식 답변을 제출합니다(제한/비제한 양식 처리, 이메일 알림 발송). 양식에 `autoCreatePerson`이 설정된 경우 이메일로 게스트 인물을 찾거나 생성하여 제출 내역에 연결합니다. `followUpSubject`/`followUpBody`가 설정된 경우 제출자에게 템플릿 후속 이메일을 발송합니다 |
| DELETE | `/:id` | JWT | Forms.Admin 또는 Forms.Edit | 제출 내역과 답변을 삭제합니다 |

## Questions

기본 경로: `/membership/questions`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | 양식 접근 권한 | 양식의 질문 목록을 가져옵니다. `?formId=`가 필요합니다 |
| GET | `/:id` | JWT | 양식 접근 권한 | ID로 질문을 가져옵니다 |
| GET | `/unrestricted?formId=` | JWT | — | 비제한 양식의 질문을 가져옵니다 |
| GET | `/sort/:id/up` | JWT | — | 질문을 정렬 순서에서 위로 이동합니다 |
| GET | `/sort/:id/down` | JWT | — | 질문을 정렬 순서에서 아래로 이동합니다 |
| POST | `/` | JWT | 양식 접근 권한 | 질문을 생성하거나 업데이트합니다(정렬 순서 자동 배정) |
| DELETE | `/:id?formId=` | JWT | 양식 접근 권한 | 질문을 삭제합니다 |

## Answers

기본 경로: `/membership/answers`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 답변 목록을 가져옵니다. `?formSubmissionId=`로 필터링합니다 |
| POST | `/` | JWT | Forms.Admin 또는 Forms.Edit | 답변을 생성하거나 업데이트합니다 |

## Member Permissions

기본 경로: `/membership/memberpermissions`

특정 양식에 대한 회원별 접근을 제어합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | 양식 접근 권한 | ID로 회원 권한을 가져옵니다 |
| GET | `/member/:id` | JWT | 양식 접근 권한 | 회원의 모든 양식 권한을 가져옵니다 |
| GET | `/form/:id` | JWT | 양식 접근 권한 | 양식의 모든 회원 권한을 가져옵니다 |
| GET | `/form/:id/my` | JWT | 양식 접근 권한 | 양식에 대한 현재 사용자의 권한을 가져옵니다 |
| POST | `/` | JWT | 양식 접근 권한 | 회원 권한을 생성하거나 업데이트합니다 |
| DELETE | `/:id?formId=` | JWT | 양식 접근 권한 | 회원 권한을 삭제합니다 |
| DELETE | `/member/:id?formId=` | JWT | 양식 접근 권한 | 특정 양식에 대한 회원의 모든 권한을 삭제합니다 |

## Settings

기본 경로: `/membership/settings`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | 교회의 모든 설정을 가져옵니다 |
| GET | `/public/:churchId` | Public | — | 교회의 공개 설정을 가져옵니다 |
| POST | `/` | JWT | Settings.Edit | 설정을 저장합니다(base64 이미지 업로드 지원) |

## Domains

기본 경로: `/membership/domains`

표준 CRUD를 확장합니다(기본 클래스의 GET `/:id`, GET `/`, DELETE `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 도메인 목록을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 도메인을 가져옵니다 |
| GET | `/lookup/:domainName` | JWT | — | 이름으로 도메인을 조회합니다 |
| GET | `/public/lookup/:domainName` | Public | — | 이름으로 도메인을 공개 조회합니다 |
| GET | `/health/check` | Public | — | 확인되지 않은 도메인에 대해 상태 점검을 실행합니다 |
| POST | `/` | JWT | Settings.Edit | 도메인을 생성하거나 업데이트합니다(Caddy 업데이트 트리거) |
| DELETE | `/:id` | JWT | Settings.Edit | 도메인을 삭제합니다 |

## User Church

기본 경로: `/membership/userchurch`

사용자와 교회 간의 연관 관계를 관리합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | 사용자 ID로 user-church 레코드를 가져옵니다 |
| GET | `/personid/:personId` | JWT | — | 인물의 연결된 사용자 이메일을 가져옵니다 |
| GET | `/user/:userId` | JWT | Server.Admin | 사용자의 모든 교회를 가져옵니다 |
| POST | `/` | JWT | — | user-church 연관 관계를 생성합니다 |
| PATCH | `/:userId` | JWT | — | 마지막 접근 시각을 업데이트하고 접근 기록을 남깁니다 |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | user-church 레코드를 삭제합니다 |

## Visibility Preferences

기본 경로: `/membership/visibilityPreferences`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 현재 사용자의 공개 범위 설정을 가져옵니다 |
| POST | `/` | JWT | — | 공개 범위 설정을 저장합니다(주소, 전화번호, 이메일 공개 여부) |

## Query

기본 경로: `/membership/query`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | AI를 이용한 자연어 회원 검색. 본문: `{ text, subDomain, siteUrl }` |

## Client Errors

기본 경로: `/membership/clientErrors`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | 클라이언트 측 오류를 기록합니다 |

## 관련 페이지

- [인증 및 권한](./authentication) — 로그인 흐름, JWT, OAuth, 권한 모델
- [Attendance 엔드포인트](./attendance) — 예배 및 방문 추적
- [모듈 구조](../module-structure) — 코드 구성 패턴
