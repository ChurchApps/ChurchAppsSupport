---
title: "멤버십 엔드포인트"
---

# 멤버십 엔드포인트

<div class="article-intro">

멤버십 모듈은 사람, 교회, 그룹, 가족, 역할, 권한, 양식 및 설정을 관리합니다. 가장 큰 모듈이며 모든 다른 모듈에 대한 핵심 신원 및 권한 부여 계층을 제공합니다.

</div>

**기본 경로:** `/membership`

## 사람

기본 경로: `/membership/people`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View 또는 Member | 교회의 모든 사람을 나열합니다 |
| GET | `/:id` | JWT | People.View 또는 자신의 기록 | ID로 사람을 가져옵니다(양식 제출 포함) |
| GET | `/ids?ids=` | JWT | People.View 또는 Member | 쉼표로 구분된 ID로 여러 사람을 가져옵니다 |
| GET | `/basic?ids=` | JWT | — | 여러 사람의 기본 정보(이름만)를 가져옵니다 |
| GET | `/recent` | JWT | People.View 또는 Member | 최근에 추가된 사람 |
| GET | `/search?term=&email=` | JWT | People.View 또는 Member | 이름 또는 이메일로 사람을 검색합니다 |
| GET | `/search/phone?number=` | JWT | People.View 또는 Member | 전화 번호로 검색합니다 |
| GET | `/search/group?groupId=` | JWT | People.View 또는 Member | 특정 그룹의 사람을 가져옵니다 |
| GET | `/household/:householdId` | JWT | — | 가족의 모든 사람을 가져옵니다 |
| GET | `/attendance` | JWT | People.Edit | 필터를 사용하여 참석자를 로드합니다(campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | 사람 및 그룹의 타임라인 데이터를 로드합니다 |
| GET | `/directory/:id` | JWT | — | 디렉토리 보기를 위해 사람을 가져옵니다(가시성 선호도 준수) |
| GET | `/claim/:churchId` | JWT | — | 교회에서 현재 사용자의 사람 기록을 청구합니다 |
| POST | `/` | JWT | People.Edit 또는 EditSelf | 사람을 만들거나 업데이트합니다(일괄) |
| POST | `/search` | JWT | People.View 또는 Member | 사람을 검색합니다(POST 변형) |
| POST | `/advancedSearch` | JWT | People.View 또는 Member | 다중 조건 검색(나이, birthMonth, membershipStatus 등) |
| POST | `/loadOrCreate` | Public | — | 이메일로 사람을 찾거나 만듭니다. 본문: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | 가족 멤버 할당을 업데이트합니다 |
| POST | `/public/email` | Public | — | 사람에게 이메일을 보냅니다. 본문: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | ID로 사람 이메일을 로드합니다(서버 간, jwtSecret 필요) |
| DELETE | `/:id` | JWT | People.Edit | 사람을 삭제합니다 |

### 예: 사람 검색

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

### 예: 사람 만들기

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## 사용자

기본 경로: `/membership/users`

로그인, 등록 및 비밀번호 관리 엔드포인트는 [인증 & 권한](./authentication)을 참조하세요.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | 로그인(이메일/비밀번호, JWT 새로 고침 또는 authGuid) |
| POST | `/register` | Public | — | 새 사용자 등록 |
| POST | `/forgot` | Public | — | 비밀번호 재설정 이메일 보내기 |
| POST | `/setPasswordGuid` | Public | — | 이메일 링크의 auth GUID를 사용하여 비밀번호 설정 |
| POST | `/verifyCredentials` | Public | — | 이메일/비밀번호를 확인하고 연결된 교회 반환 |
| POST | `/loadOrCreate` | JWT | — | 이메일/userId로 사용자를 찾거나 만듭니다 |
| POST | `/setDisplayName` | JWT | — | 사용자의 이름과 성을 업데이트합니다 |
| POST | `/updateEmail` | JWT | — | 사용자의 이메일 주소를 변경합니다 |
| POST | `/updatePassword` | JWT | — | 사용자의 비밀번호를 변경합니다(최소 6자) |
| POST | `/updateOptedOut` | JWT | — | 사람의 옵트아웃 상태를 설정합니다 |
| GET | `/search?term=` | JWT | Server.Admin | 이름/이메일로 모든 사용자를 검색합니다 |
| DELETE | `/` | JWT | — | 현재 사용자 계정을 삭제합니다 |

## 교회

기본 경로: `/membership/churches`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 현재 사용자의 모든 교회를 로드합니다 |
| GET | `/:id` | JWT | — | ID로 교회를 가져옵니다 |
| GET | `/:id/getDomainAdmin` | JWT | — | 교회의 도메인 관리자 사용자를 가져옵니다 |
| GET | `/:id/impersonate` | JWT | Server.Admin | 교회를 가장합니다(서버 관리자만) |
| GET | `/all?term=` | JWT | Server.Admin | 모든 교회를 검색합니다(관리자) |
| GET | `/search/?name=` | Public | — | 이름으로 교회를 검색합니다 |
| GET | `/lookup/?subDomain=&id=` | Public | — | 하위 도메인 또는 ID로 교회를 조회합니다 |
| POST | `/` | JWT | Settings.Edit | 교회 세부 정보를 업데이트합니다 |
| POST | `/add` | JWT | — | 새 교회를 등록합니다. 필수 필드: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | 이름으로 교회를 검색합니다(POST 변형) |
| POST | `/select` | JWT | — | 교회를 선택/전환합니다. 본문: `{ churchId }` 또는 `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | 교회를 보관하거나 보관 취소합니다 |
| POST | `/byIds` | Public | — | ID로 여러 교회를 로드합니다 |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7일 이상 방치된 교회를 삭제합니다 |

## 그룹

기본 경로: `/membership/groups`

표준 CRUD를 확장합니다(기본 클래스의 GET `/`, GET `/:id`).

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 그룹을 나열합니다 |
| GET | `/:id` | JWT | — | ID로 그룹을 가져옵니다 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | 서비스 필터로 그룹을 검색합니다 |
| GET | `/my` | JWT | — | 현재 사용자의 그룹을 가져옵니다 |
| GET | `/my/:tag` | JWT | — | 태그로 필터링된 현재 사용자의 그룹을 가져옵니다 |
| GET | `/tag/:tag` | JWT | — | 특정 태그가 있는 모든 그룹을 가져옵니다 |
| GET | `/public/:churchId/:id` | Public | — | 교회 및 ID로 공개 그룹을 가져옵니다 |
| GET | `/public/:churchId/tag/:tag` | Public | — | 태그별로 공개 그룹을 가져옵니다 |
| GET | `/public/:churchId/label?label=` | Public | — | 레이블별로 공개 그룹을 가져옵니다 |
| GET | `/public/:churchId/slug/:slug` | Public | — | 슬러그로 공개 그룹을 가져옵니다 |
| POST | `/` | JWT | Groups.Edit | 그룹을 만들거나 업데이트합니다(자동 생성 슬러그) |
| DELETE | `/:id` | JWT | Groups.Edit | 그룹을 삭제합니다(사역 그룹의 자식 팀도 삭제) |

## 그룹 멤버

기본 경로: `/membership/groupmembers`

표준 CRUD를 확장합니다(기본 클래스의 GET `/:id`, DELETE `/:id`).

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | 그룹 멤버를 ID로 가져옵니다 |
| GET | `/` | JWT | GroupMembers.View* | 그룹 멤버를 나열합니다. `?groupId=`, `?groupIds=` 또는 `?personId=`로 필터링합니다. *사용자가 그룹에 있거나 자신의 personId를 쿼리하는 경우에도 허용됨 |
| GET | `/my` | JWT | — | 현재 사용자의 그룹 멤버십을 가져옵니다 |
| GET | `/basic/:groupId` | JWT | — | 그룹의 기본 멤버 목록을 가져옵니다 |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | 그룹 리더를 가져옵니다(공개) |
| GET | `/public/:churchId/:groupId` | Public | — | 그룹의 공개 명부를 가져옵니다(최소 필드: `personId`, `displayName`, `leader`, photo). `publicRoster`를 통해 그룹이 옵트인한 경우만; 웹사이트 빌더의 `staffGrid` 요소를 강화합니다 |
| POST | `/` | JWT | GroupMembers.Edit | 그룹 멤버를 추가하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | GroupMembers.View | 그룹 멤버를 제거합니다 |

## 가족

기본 경로: `/membership/households`

표준 CRUD 컨트롤러입니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 가족을 나열합니다 |
| GET | `/:id` | JWT | — | ID로 가족을 가져옵니다 |
| POST | `/` | JWT | People.Edit | 가족을 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | People.Edit | 가족을 삭제합니다 |

## 역할

기본 경로: `/membership/roles`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | ID로 역할을 가져옵니다 |
| GET | `/church/:churchId` | JWT | Roles.View | 교회의 모든 역할을 가져옵니다 |
| POST | `/` | JWT | Roles.Edit | 역할을 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Roles.Edit | 역할을 삭제합니다(또한 권한 및 멤버를 제거함) |

## 역할 멤버

기본 경로: `/membership/rolemembers`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 역할의 멤버를 가져옵니다. `?include=users`를 추가하여 사용자 세부 정보 포함 |
| POST | `/` | JWT | Roles.Edit | 역할에 멤버를 추가합니다(이메일이 없으면 사용자 만듬) |
| DELETE | `/:id` | JWT | Roles.View | 역할 멤버를 제거합니다 |
| DELETE | `/self/:churchId/:userId` | JWT | — | 교회에서 자신을 제거합니다 |

## 역할 권한

기본 경로: `/membership/rolepermissions`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 역할의 권한을 가져옵니다("Everyone" 역할의 경우 `null`을 ID로 사용) |
| POST | `/` | JWT | Roles.Edit | 역할 권한을 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Roles.Edit | 역할 권한을 삭제합니다 |

## 권한

기본 경로: `/membership/permissions`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 사용 가능한 권한의 전체 목록을 가져옵니다 |

## 양식

기본 경로: `/membership/forms`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 모든 양식을 나열합니다(관리자는 모두 봄; 편집자는 할당됨 + 비멤버 양식 봄) |
| GET | `/:id` | JWT | 양식 액세스 | ID로 양식을 가져옵니다 |
| GET | `/archived` | JWT | Forms.Admin 또는 Forms.Edit | 보관된 양식을 나열합니다 |
| GET | `/standalone/:id?churchId=` | JWT | — | 독립형 양식을 가져옵니다(제한된 양식은 인증 필요) |
| POST | `/` | JWT | Forms.Admin 또는 Forms.Edit | 양식을 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | 양식 액세스 | 양식을 삭제합니다 |

## 양식 제출

기본 경로: `/membership/formsubmissions`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 제출을 나열합니다. `?personId=` 또는 `?formId=`로 필터링 |
| GET | `/:id` | JWT | Forms.Admin 또는 Forms.Edit | ID로 제출을 가져옵니다. `?include=form,questions,answers` 추가 |
| GET | `/formId/:formId` | JWT | 양식 액세스 | 양식의 모든 제출을 가져옵니다(양식, 질문, 답변 포함) |
| POST | `/` | JWT | — | 양식 답변을 제출합니다(제한/비제한 양식 처리, 이메일 알림 전송). 양식에 `autoCreatePerson`이 있으면 이메일로 Guest 사람을 찾거나 만들고 제출을 연결합니다. `followUpSubject`/`followUpBody`가 설정되면 제출자에게 템플릿 팔로우업 이메일을 보냅니다 |
| DELETE | `/:id` | JWT | Forms.Admin 또는 Forms.Edit | 제출 및 해당 답변을 삭제합니다 |

## 질문

기본 경로: `/membership/questions`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | 양식 액세스 | 양식의 질문을 나열합니다. `?formId=` 필요 |
| GET | `/:id` | JWT | 양식 액세스 | ID로 질문을 가져옵니다 |
| GET | `/unrestricted?formId=` | JWT | — | 제한되지 않은 양식의 질문을 가져옵니다 |
| GET | `/sort/:id/up` | JWT | — | 질문을 정렬 순서에서 위로 이동합니다 |
| GET | `/sort/:id/down` | JWT | — | 질문을 정렬 순서에서 아래로 이동합니다 |
| POST | `/` | JWT | 양식 액세스 | 질문을 만들거나 업데이트합니다(자동 정렬 순서 할당) |
| DELETE | `/:id?formId=` | JWT | 양식 액세스 | 질문을 삭제합니다 |

## 답변

기본 경로: `/membership/answers`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 또는 Forms.Edit | 답변을 나열합니다. `?formSubmissionId=`로 필터링 |
| POST | `/` | JWT | Forms.Admin 또는 Forms.Edit | 답변을 만들거나 업데이트합니다 |

## 멤버 권한

기본 경로: `/membership/memberpermissions`

특정 양식에 대한 멤버당 액세스를 제어합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | 양식 액세스 | ID로 멤버 권한을 가져옵니다 |
| GET | `/member/:id` | JWT | 양식 액세스 | 멤버의 모든 양식 권한을 가져옵니다 |
| GET | `/form/:id` | JWT | 양식 액세스 | 양식의 모든 멤버 권한을 가져옵니다 |
| GET | `/form/:id/my` | JWT | 양식 액세스 | 양식의 현재 사용자 권한을 가져옵니다 |
| POST | `/` | JWT | 양식 액세스 | 멤버 권한을 만들거나 업데이트합니다 |
| DELETE | `/:id?formId=` | JWT | 양식 액세스 | 멤버 권한을 삭제합니다 |
| DELETE | `/member/:id?formId=` | JWT | 양식 액세스 | 양식에 대한 멤버의 모든 권한을 삭제합니다 |

## 설정

기본 경로: `/membership/settings`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | 교회의 모든 설정을 가져옵니다 |
| GET | `/public/:churchId` | Public | — | 교회의 공개 설정을 가져옵니다 |
| POST | `/` | JWT | Settings.Edit | 설정을 저장합니다(base64 이미지 업로드 지원) |

## 도메인

기본 경로: `/membership/domains`

표준 CRUD를 확장합니다(기본 클래스의 GET `/:id`, GET `/`, DELETE `/:id`).

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 도메인을 나열합니다 |
| GET | `/:id` | JWT | — | ID로 도메인을 가져옵니다 |
| GET | `/lookup/:domainName` | JWT | — | 이름으로 도메인을 조회합니다 |
| GET | `/public/lookup/:domainName` | Public | — | 이름으로 공개 도메인 조회 |
| GET | `/health/check` | Public | — | 확인되지 않은 도메인에서 상태 확인 실행 |
| POST | `/` | JWT | Settings.Edit | 도메인을 만들거나 업데이트합니다(Caddy 업데이트 트리거) |
| DELETE | `/:id` | JWT | Settings.Edit | 도메인을 삭제합니다 |

## 사용자 교회

기본 경로: `/membership/userchurch`

사용자와 교회 간의 관계를 관리합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | 사용자 ID로 사용자-교회 기록을 가져옵니다 |
| GET | `/personid/:personId` | JWT | — | 연결된 사용자의 사람 이메일을 가져옵니다 |
| GET | `/user/:userId` | JWT | Server.Admin | 사용자의 모든 교회를 로드합니다 |
| POST | `/` | JWT | — | 사용자-교회 관계를 만듭니다 |
| PATCH | `/:userId` | JWT | — | 마지막 액세스 시간을 업데이트하고 액세스를 로그합니다 |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | 사용자-교회 기록을 삭제합니다 |

## 가시성 선호도

기본 경로: `/membership/visibilityPreferences`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 현재 사용자의 가시성 선호도를 가져옵니다 |
| POST | `/` | JWT | — | 가시성 선호도를 저장합니다(주소, 전화, 이메일 가시성) |

## 쿼리

기본 경로: `/membership/query`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | AI를 사용한 자연 언어 멤버 검색. 본문: `{ text, subDomain, siteUrl }` |

## 클라이언트 오류

기본 경로: `/membership/clientErrors`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | 클라이언트 측 오류를 로그합니다 |

## 관련 페이지

- [인증 & 권한](./authentication) -- 로그인 흐름, JWT, OAuth, 권한 모델
- [출석 엔드포인트](./attendance) -- 예배 및 방문 추적
- [모듈 구조](../module-structure) -- 코드 구성 패턴
