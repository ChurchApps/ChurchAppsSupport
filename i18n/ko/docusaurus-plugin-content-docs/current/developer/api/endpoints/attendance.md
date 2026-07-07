---
title: "출석 엔드포인트"
---

# 출석 엔드포인트

<div class="article-intro">

출석 모듈은 캠퍼스 위치, 예배, 예배 시간, 출석 세션, 방문 및 방문 세션을 관리합니다. 누가 어떤 예배 또는 그룹 회의에 참석했는지 추적하기 위한 인프라를 제공하고, 체크인 워크플로우를 지원하고, 출석 추세 및 요약 보고를 제공합니다.

</div>

**기본 경로:** `/attendance`

## 캠퍼스

기본 경로: `/attendance/campuses`

표준 CRUD 컨트롤러(GenericCrudController 확장). CRUD 기본 클래스를 통해 `getById`, `getAll`, `post` 및 `delete` 경로를 제공합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 캠퍼스를 나열합니다 |
| GET | `/:id` | JWT | — | ID로 캠퍼스를 가져옵니다 |
| POST | `/` | JWT | Services.Edit | 캠퍼스를 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Services.Edit | 캠퍼스를 삭제합니다 |

## 예배

기본 경로: `/attendance/services`

`getById`, `getAll`, `post` 및 `delete` CRUD 경로로 GenericCrudController를 확장합니다. `getAll`(`GET /`) 및 `search` 끝점은 사용자 정의 구현으로 재정의됩니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 예배를 나열합니다(캠퍼스 정보 포함) |
| GET | `/:id` | JWT | — | ID로 예배를 가져옵니다 |
| GET | `/search?campusId=` | JWT | — | 캠퍼스 ID로 예배를 검색합니다 |
| POST | `/` | JWT | Services.Edit | 예배를 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Services.Edit | 예배를 삭제합니다 |

### 예: 캠퍼스별 예배 검색

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "일요일 아침"
  }
]
```

## 예배 시간

기본 경로: `/attendance/servicetimes`

`getById`, `post` 및 `delete` CRUD 경로로 GenericCrudController를 확장합니다. `getAll` 및 `search` 끝점은 사용자 정의 구현입니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 예배 시간을 나열합니다. `?serviceId=`로 필터링합니다. `?include=groups`를 추가하여 그룹 데이터를 추가합니다 |
| GET | `/:id` | JWT | — | ID로 예배 시간을 가져옵니다 |
| GET | `/search?campusId=&serviceId=` | JWT | — | 캠퍼스 및 예배로 예배 시간을 검색합니다 |
| GET | `/public/:churchId` | Public | — | 교회의 캠퍼스 → 예배 → 시간 트리를 가져옵니다. 웹사이트 빌더의 `serviceTimes` 요소를 강화합니다 |
| POST | `/` | JWT | Services.Edit | 예배 시간을 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Services.Edit | 예배 시간을 삭제합니다 |

## 그룹 예배 시간

기본 경로: `/attendance/groupservicetimes`

그룹을 특정 예배 시간에 연결합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 그룹-예배-시간 관계를 나열합니다. `?groupId=`로 필터링하여 예배 이름과 함께 관계를 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 그룹-예배-시간 관계를 가져옵니다 |
| POST | `/` | JWT | Services.Edit | 그룹-예배-시간 관계를 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Services.Edit | 그룹-예배-시간 관계를 삭제합니다 |

## 출석 기록

기본 경로: `/attendance/attendancerecords`

보고 및 표시를 위한 출석 데이터의 읽기 전용 집계 보기를 제공합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 사람의 출석 기록을 로드합니다. `?personId=` 필요 |
| GET | `/tree` | JWT | — | 전체 출석 트리를 로드합니다(캠퍼스, 예배, 예배 시간, 그룹) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | 선택적 필터를 사용하여 출석 추세 데이터를 로드합니다 |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | 주어진 주의 예배에 대한 그룹 출석을 로드합니다 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | 필터(캠퍼스, 예배, 예배 시간, 그룹, 날짜 범위)가 있는 출석 기록을 검색합니다 |

### 예: 출석 추세

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## 세션

기본 경로: `/attendance/sessions`

`getById` 및 `delete` CRUD 경로로 GenericCrudController를 확장합니다. `getAll` 및 `save` 끝점은 또한 그룹 리더가 자신의 그룹에 대한 세션을 관리할 수 있도록 하는 사용자 정의 구현입니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View 또는 Group Leader | 모든 세션을 나열합니다. `?groupId=`로 필터링(이름 포함). 그룹 리더는 자신의 그룹에 대한 세션을 볼 수 있습니다 |
| GET | `/:id` | JWT | Attendance.View | ID로 세션을 가져옵니다 |
| POST | `/` | JWT | Attendance.Edit 또는 Group Leader | 세션을 만들거나 업데이트합니다. 그룹 리더는 자신의 그룹에 대한 세션을 저장할 수 있습니다 |
| DELETE | `/:id` | JWT | Attendance.Edit | 세션을 삭제합니다 |

## 방문

기본 경로: `/attendance/visits`

개별 방문 기록(특정 날짜에 사람이 참석하는 것)을 관리하고 체크인 워크플로우를 제공합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 모든 방문을 나열합니다. `?personId=`로 필터링 |
| GET | `/:id` | JWT | Attendance.View | ID로 방문을 가져옵니다 |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View 또는 Attendance.Checkin | 예배에서 사람들에 대한 체크인 데이터를 로드합니다. 마지막 로그 날짜부터 방문 세션이 있는 방문을 반환합니다 |
| POST | `/` | JWT | Attendance.Edit | 방문을 만들거나 업데이트합니다 |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit 또는 Attendance.Checkin | 체크인 데이터를 제출합니다. 방문 및 방문 세션을 생성/업데이트하고 낡은 기록을 제거합니다 |
| DELETE | `/:id` | JWT | Attendance.Edit | 방문을 삭제합니다 |

### 예: 체크인 흐름

**1단계 -- 기존 체크인 데이터 로드:**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**2단계 -- 체크인 제출:**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

## 방문 세션

기본 경로: `/attendance/visitsessions`

방문과 세션 간의 관계(방문 중 사람이 참석한 특정 세션)를 관리합니다. 또한 빠른 로그 끝점 및 다운로드/내보내기 끝점을 제공합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View 또는 Group Leader | 방문 세션을 나열합니다. `?sessionId=`로 필터링합니다. 그룹 리더는 자신의 그룹에 대한 방문 세션을 볼 수 있습니다 |
| GET | `/:id` | JWT | Attendance.View | ID로 방문 세션을 가져옵니다 |
| GET | `/download/:sessionId` | JWT | Attendance.View | 세션에 대한 출석을 다운로드합니다(출석/부재 상태와 함께 사람 이름 반환) |
| POST | `/` | JWT | Attendance.Edit | 방문 세션을 만들거나 업데이트합니다 |
| POST | `/log` | JWT | Attendance.Edit 또는 Group Leader | 세션에 사람의 출석을 빠르게 로그합니다. 필요한 경우 자동으로 방문을 만듭니다. 그룹 리더는 자신의 그룹에 대한 출석을 로그할 수 있습니다 |
| DELETE | `/:id` | JWT | Attendance.Edit | ID로 방문 세션을 삭제합니다 |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit 또는 Group Leader | 세션에서 사람을 제거합니다. 방문 세션을 삭제하고 세션이 남지 않으면 상위 방문을 삭제합니다. 그룹 리더는 자신의 그룹에 대한 출석을 제거할 수 있습니다 |

### 예: 빠른 로그 출석

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### 예: 세션 출석 다운로드

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## 스트릭스

기본 경로: `/attendance/streaks`

개인의 출석 스트릭스(사람이 참석한 연속 주)를 추적합니다. 참여 지표 및 게임화에 유용합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | 사람의 출석 스트릭스를 로드합니다 |

## 관련 페이지

- [멤버십 엔드포인트](./membership) — 사람, 그룹, 역할 및 교회 관리
- [인증 & 권한](./authentication) — 로그인 흐름, JWT, 권한 모델
- [모듈 구조](../module-structure) — 코드 구성 패턴
