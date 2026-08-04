---
title: "출석 엔드포인트"
---

# 출석 엔드포인트

<div class="article-intro">

Attendance 모듈은 캠퍼스 위치, 예배, 예배 시간, 출석 세션, 방문, 방문 세션을 관리합니다. 누가 어떤 예배나 그룹 모임에 참석했는지 추적하는 인프라를 제공하고, 체크인 워크플로우를 지원하며, 출석 추세 및 요약 리포트를 제공합니다.

</div>

**기본 경로:** `/attendance`

## Campuses

기본 경로: `/attendance/campuses`

표준 CRUD 컨트롤러입니다(GenericCrudController 확장). CRUD 기본 클래스를 통해 `getById`, `getAll`, `post`, `delete` 경로를 제공합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 캠퍼스 목록을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 캠퍼스를 가져옵니다 |
| POST | `/` | JWT | Services.Edit | 캠퍼스를 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Services.Edit | 캠퍼스를 삭제합니다 |

## Services

기본 경로: `/attendance/services`

GenericCrudController를 확장하여 `getById`, `getAll`, `post`, `delete` CRUD 경로를 제공합니다. `getAll`(`GET /`)과 `search` 엔드포인트는 사용자 정의 구현으로 재정의되어 있습니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 예배 목록을 가져옵니다(캠퍼스 정보 포함) |
| GET | `/:id` | JWT | — | ID로 예배를 가져옵니다 |
| GET | `/search?campusId=` | JWT | — | 캠퍼스 ID로 예배를 검색합니다 |
| POST | `/` | JWT | Services.Edit | 예배를 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Services.Edit | 예배를 삭제합니다 |

### 예시: 캠퍼스별 예배 검색

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
    "name": "Sunday Morning"
  }
]
```

## Service Times

기본 경로: `/attendance/servicetimes`

GenericCrudController를 확장하여 `getById`, `post`, `delete` CRUD 경로를 제공합니다. `getAll`과 `search` 엔드포인트는 사용자 정의 구현입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 예배 시간 목록을 가져옵니다. `?serviceId=`로 필터링합니다. `?include=groups`를 추가하면 그룹 데이터가 함께 반환됩니다 |
| GET | `/:id` | JWT | — | ID로 예배 시간을 가져옵니다 |
| GET | `/search?campusId=&serviceId=` | JWT | — | 캠퍼스와 예배로 예배 시간을 검색합니다 |
| GET | `/public/:churchId` | Public | — | 교회의 캠퍼스 → 예배 → 시간 트리를 가져옵니다. 웹사이트 빌더의 `serviceTimes` 요소를 지원합니다 |
| POST | `/` | JWT | Services.Edit | 예배 시간을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Services.Edit | 예배 시간을 삭제합니다 |

## Group Service Times

기본 경로: `/attendance/groupservicetimes`

그룹을 특정 예배 시간에 연결합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 그룹-예배시간 연결 목록을 가져옵니다. `?groupId=`로 필터링하면 예배 이름과 함께 연결 정보를 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 그룹-예배시간 연결을 가져옵니다 |
| POST | `/` | JWT | Services.Edit | 그룹-예배시간 연결을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Services.Edit | 그룹-예배시간 연결을 삭제합니다 |

## Attendance Records

기본 경로: `/attendance/attendancerecords`

리포트 및 표시를 위한 출석 데이터의 읽기 전용 집계 뷰를 제공합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 특정 인물의 출석 기록을 가져옵니다. `?personId=`가 필요합니다 |
| GET | `/tree` | JWT | — | 전체 출석 트리(캠퍼스, 예배, 예배 시간, 그룹)를 가져옵니다 |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | 선택적 필터로 출석 추세 데이터를 가져옵니다 |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | 특정 주의 예배에 대한 그룹 출석을 가져옵니다 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | 필터(캠퍼스, 예배, 예배 시간, 그룹, 날짜 범위)를 사용해 출석 기록을 검색합니다 |

### 예시: 출석 추세

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

## Sessions

기본 경로: `/attendance/sessions`

GenericCrudController를 확장하여 `getById`와 `delete` CRUD 경로를 제공합니다. `getAll`과 `save` 엔드포인트는 그룹 리더가 자신의 그룹 세션을 관리할 수 있도록 하는 사용자 정의 구현입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View 또는 그룹 리더 | 모든 세션 목록을 가져옵니다. `?groupId=`로 필터링합니다(이름 포함). 그룹 리더는 자신의 그룹 세션을 확인할 수 있습니다 |
| GET | `/:id` | JWT | Attendance.View | ID로 세션을 가져옵니다 |
| POST | `/` | JWT | Attendance.Edit 또는 그룹 리더 | 세션을 생성하거나 업데이트합니다. 그룹 리더는 자신의 그룹 세션을 저장할 수 있습니다 |
| DELETE | `/:id` | JWT | Attendance.Edit | 세션을 삭제합니다 |

## Visits

기본 경로: `/attendance/visits`

개별 방문 기록(특정 날짜에 참석한 인물)을 관리하고 체크인 워크플로우를 제공합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 모든 방문 목록을 가져옵니다. `?personId=`로 필터링합니다 |
| GET | `/:id` | JWT | Attendance.View | ID로 방문을 가져옵니다 |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View 또는 Attendance.Checkin | 특정 예배에 대한 인물들의 체크인 데이터를 가져옵니다. 마지막 기록 날짜의 방문 세션이 포함된 방문 정보를 반환합니다 |
| POST | `/` | JWT | Attendance.Edit | 방문을 생성하거나 업데이트합니다 |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit 또는 Attendance.Checkin | 체크인 데이터를 제출합니다. 방문 및 방문 세션을 생성/업데이트하고 오래된 기록을 제거합니다 |
| DELETE | `/:id` | JWT | Attendance.Edit | 방문을 삭제합니다 |

### 예시: 체크인 흐름

**1단계 -- 기존 체크인 데이터 가져오기:**

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

**2단계 -- 체크인 제출하기:**

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

## Visit Sessions

기본 경로: `/attendance/visitsessions`

방문과 세션 간의 연결(방문 중 인물이 참석한 구체적인 세션)을 관리합니다. 또한 빠른 기록용 엔드포인트와 다운로드/내보내기 엔드포인트를 제공합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View 또는 그룹 리더 | 방문 세션 목록을 가져옵니다. `?sessionId=`로 필터링합니다. 그룹 리더는 자신의 그룹 방문 세션을 확인할 수 있습니다 |
| GET | `/:id` | JWT | Attendance.View | ID로 방문 세션을 가져옵니다 |
| GET | `/download/:sessionId` | JWT | Attendance.View | 세션의 출석 정보를 다운로드합니다(참석/결석 상태와 함께 인물 이름 반환) |
| POST | `/` | JWT | Attendance.Edit | 방문 세션을 생성하거나 업데이트합니다 |
| POST | `/log` | JWT | Attendance.Edit 또는 그룹 리더 | 인물의 출석을 세션에 빠르게 기록합니다. 필요 시 방문을 자동으로 생성합니다. 그룹 리더는 자신의 그룹 출석을 기록할 수 있습니다 |
| DELETE | `/:id` | JWT | Attendance.Edit | ID로 방문 세션을 삭제합니다 |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit 또는 그룹 리더 | 세션에서 인물을 제거합니다. 방문 세션을 삭제하며, 남은 세션이 없으면 상위 방문도 삭제합니다. 그룹 리더는 자신의 그룹 출석을 제거할 수 있습니다 |

### 예시: 빠른 출석 기록

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

### 예시: 세션 출석 다운로드

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

## Streaks

기본 경로: `/attendance/streaks`

개인의 출석 연속 기록(연속으로 출석한 주 수)을 추적합니다. 참여 지표 및 게임화 요소에 유용합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | 특정 인물의 출석 연속 기록을 가져옵니다 |

## 관련 페이지

- [Membership 엔드포인트](./membership) — 인물, 그룹, 역할, 교회 관리
- [인증 및 권한](./authentication) — 로그인 흐름, JWT, 권한 모델
- [모듈 구조](../module-structure) — 코드 구성 패턴
