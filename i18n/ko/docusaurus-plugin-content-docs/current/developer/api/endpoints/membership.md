---
title: "회원 엔드포인트"
---

# 회원 엔드포인트

<div class="article-intro">

회원 모듈은 사람, 교회, 그룹, 가구, 역할, 권한, 양식, 설정을 관리합니다. 이는 가장 큰 모듈이며 모든 다른 모듈을 위한 핵심 신원 및 권한 부여 계층을 제공합니다.

</div>

**기본 경로:** `/membership`

## 사람

기본 경로: `/membership/people`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View or Member | 교회의 모든 사람 나열 |
| GET | `/:id` | JWT | People.View or own record | ID로 사람 가져오기 (양식 제출 포함) |
| GET | `/ids?ids=` | JWT | People.View or Member | 쉼표로 구분된 ID로 여러 사람 가져오기 |
| GET | `/basic?ids=` | JWT | — | 여러 사람의 기본 정보 가져오기 (이름만) |
| GET | `/recent` | JWT | People.View or Member | 최근에 추가된 사람 |
| GET | `/search?term=&email=` | JWT | People.View or Member | 이름이나 이메일로 사람 검색 |
| GET | `/search/phone?number=` | JWT | People.View or Member | 전화번호로 검색 |
| GET | `/search/group?groupId=` | JWT | People.View or Member | 특정 그룹의 사람 가져오기 |
| GET | `/household/:householdId` | JWT | — | 가구의 모든 사람 가져오기 |
| GET | `/attendance` | JWT | People.Edit | 참석자를 필터와 함께 로드 (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | 사람과 그룹의 타임라인 데이터 로드 |
| GET | `/directory/:id` | JWT | — | 디렉토리 보기를 위해 사람 가져오기 (가시성 환경설정 존중) |
| GET | `/claim/:churchId` | JWT | — | 교회의 현재 사용자를 위한 사람 기록 요청 |
| POST | `/` | JWT | People.Edit or EditSelf | 사람 생성 또는 업데이트 (배치) |
| POST | `/search` | JWT | People.View or Member | 사람 검색 (POST 변형) |
| POST | `/advancedSearch` | JWT | People.View or Member | 다중 조건 검색 (나이, 생일월, 회원 상태 등) |
| POST | `/loadOrCreate` | Public | — | 이메일로 사람 찾기 또는 생성. 본문: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | 가구 회원 할당 업데이트 |
| POST | `/public/email` | Public | — | 사람에게 이메일 보내기. 본문: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | ID로 사람 이메일 로드 (서버 간, jwtSecret 필요) |
| DELETE | `/:id` | JWT | People.Edit | 사람 삭제 |

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

### 예: 사람 생성

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## 사용자

기본 경로: `/membership/users`

로그인, 등록, 비밀번호 관리 엔드포인트는 [인증 및 권한](./authentication)을 참조하세요.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | 로그인 (이메일/비밀번호, JWT 새로고침, 또는 authGuid) |
| POST | `/register` | Public | — | 새 사용자 등록 |
| POST | `/forgot` | Public | — | 비밀번호 재설정 이메일 보내기 |
| POST | `/setPasswordGuid` | Public | — | 이메일 링크의 인증 GUID를 사용하여 비밀번호 설정 |
| POST | `/verifyCredentials` | Public | — | 이메일/비밀번호 검증 및 관련 교회 반환 |
| POST | `/loadOrCreate` | JWT | — | 이메일/userId로 사용자 찾기 또는 생성 |
| POST | `/setDisplayName` | JWT | — | 사용자의 이름과 성 업데이트 |
| POST | `/updateEmail` | JWT | — | 사용자의 이메일 주소 변경 |
| POST | `/updatePassword` | JWT | — | 사용자의 비밀번호 변경 (최소 6자) |
| POST | `/updateOptedOut` | JWT | — | 사람의 옵트아웃 상태 설정 |
| GET | `/search?term=` | JWT | Server.Admin | 이름/이메일로 모든 사용자 검색 |
| DELETE | `/` | JWT | — | 현재 사용자 계정 삭제 |

## 교회

기본 경로: `/membership/churches`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 현재 사용자를 위한 모든 교회 로드 |
| GET | `/:id` | JWT | — | ID로 교회 가져오기 |
| GET | `/:id/getDomainAdmin` | JWT | — | 교회의 도메인 관리자 사용자 가져오기 |
| GET | `/:id/impersonate` | JWT | Server.Admin | 교회 사칭 (서버 관리자만) |
| GET | `/all?term=` | JWT | Server.Admin | 모든 교회 검색 (관리자) |
| GET | `/search/?name=` | Public | — | 이름으로 교회 검색 |
| GET | `/lookup/?subDomain=&id=` | Public | — | 하위 도메인 또는 ID로 교회 조회 |
| POST | `/` | JWT | Settings.Edit | 교회 세부사항 업데이트 |
| POST | `/add` | JWT | — | 새 교회 등록. 필수 필드: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | 이름으로 교회 검색 (POST 변형) |
| POST | `/select` | JWT | — | 교회 선택/전환. 본문: `{ churchId }` 또는 `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | 교회 보관 또는 보관 해제 |
| POST | `/byIds` | Public | — | ID별로 여러 교회 로드 |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7일 이상 방치된 교회 삭제 |

## 그룹

기본 경로: `/membership/groups`

표준 CRUD 확장 (기본 클래스에서 GET `/`, GET `/:id`).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 그룹 나열 |
| GET | `/:id` | JWT | — | ID로 그룹 가져오기 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | 서비스 필터로 그룹 검색 |
| GET | `/my` | JWT | — | 현재 사용자의 그룹 가져오기 |
| GET | `/my/:tag` | JWT | — | 태그로 필터된 현재 사용자의 그룹 가져오기 |
| GET | `/tag/:tag` | JWT | — | 특정 태그를 가진 모든 그룹 가져오기 |
| GET | `/public/:churchId/:id` | Public | — | 교회와 ID로 public 그룹 가져오기 |
| GET | `/public/:churchId/tag/:tag` | Public | — | 태그별 public 그룹 가져오기 |
| GET | `/public/:churchId/label?label=` | Public | — | 레이블별 public 그룹 가져오기 |
| GET | `/public/:churchId/slug/:slug` | Public | — | slug로 public 그룹 가져오기 |
| POST | `/` | JWT | Groups.Edit | 그룹 생성 또는 업데이트 (자동 slug 생성) |
| DELETE | `/:id` | JWT | Groups.Edit | 그룹 삭제 (사역 그룹의 자식 팀도 삭제) |

## 관련 페이지

- [인증 및 권한](./authentication) — 로그인 흐름, JWT, OAuth, 권한 모델
- [참석 엔드포인트](./attendance) — 서비스 및 방문 추적
- [모듈 구조](../module-structure) — 코드 구성 패턴
