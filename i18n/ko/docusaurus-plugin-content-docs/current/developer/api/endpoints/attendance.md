---
title: "출석 엔드포인트"
---

# 출석 엔드포인트 {#attendance-endpoints}

<div class="article-intro">

출석 모듈은 캠퍼스 위치, 예배, 예배 시간, 출석 세션, 방문, 방문 세션을 관리합니다. 누가 어느 예배나 그룹 모임에 참석했는지 추적하는 기반을 제공하며, 체크인 흐름을 지원하고, 출석 추세와 요약 보고를 제공합니다.

</div>

**기본 경로:** `/attendance`

## 캠퍼스 {#campuses}

기본 경로: `/attendance/campuses`

표준 CRUD 컨트롤러(GenericCrudController를 확장)입니다. CRUD 기본 클래스를 통해 `getById`, `getAll`, `post`, `delete` 라우트를 제공합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 캠퍼스 목록 조회 |
| GET | `/:id` | JWT | — | ID로 캠퍼스 조회 |
| POST | `/` | JWT | Services.Edit | 캠퍼스 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Services.Edit | 캠퍼스 삭제 |

## 예배 {#services}

기본 경로: `/attendance/services`

GenericCrudController를 확장하며, CRUD 라우트 `getById`, `getAll`, `post`, `delete`를 가집니다. `getAll`(`GET /`)과 `search` 엔드포인트는 사용자 지정 구현으로 재정의되어 있습니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 예배 목록 조회(캠퍼스 정보 포함) |
| GET | `/:id` | JWT | — | ID로 예배 조회 |
| GET | `/search?campusId=` | JWT | — | 캠퍼스 ID로 예배 검색 |
| POST | `/` | JWT | Services.Edit | 예배 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Services.Edit | 예배 삭제 |

### 예시: 캠퍼스별 예배 검색 {#example-search-services-by-campus}

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

## 예배 시간 {#service-times}

기본 경로: `/attendance/servicetimes`

GenericCrudController를 확장하며, CRUD 라우트 `getById`, `post`, `delete`를 가집니다. `getAll`과 `search` 엔드포인트는 사용자 지정 구현입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 예배 시간 목록 조회. `?serviceId=`로 필터링합니다. 그룹 데이터를 덧붙이려면 `?include=groups`를 추가합니다. 각 행에는 계산된 `checkinOpen` 불리언이 포함됩니다(예배 시간에 체크인 일정이 있고 그 기간이 지금 닫혀 있을 때만 false). 기간은 예배가 열리는 캠퍼스의 시간대, 그다음 교회의 시간대, 그다음 시간대가 설정된 첫 번째 캠퍼스의 시간대, 마지막으로 `America/New_York` 순서로 계산됩니다 |
| GET | `/:id` | JWT | — | ID로 예배 시간 조회 |
| GET | `/search?campusId=&serviceId=` | JWT | — | 캠퍼스와 예배로 예배 시간 검색 |
| GET | `/public/:churchId` | Public | — | 교회의 캠퍼스 → 예배 → 시간 트리 조회. 웹사이트 빌더의 `serviceTimes` 요소를 구동 |
| POST | `/` | JWT | Services.Edit | 예배 시간 생성 또는 업데이트. 선택적 일정 필드: `dayOfWeek`(0 = 일요일 … 6), `startTime` / `endTime`(`HH:mm`), `checkinOpenMinutes`(시작 전), `checkinCloseMinutes`(종료 후). 체크인은 `dayOfWeek`와 `startTime`이 모두 설정된 경우에만 시간으로 제한됨 |
| DELETE | `/:id` | JWT | Services.Edit | 예배 시간 삭제 |

## 그룹 예배 시간 {#group-service-times}

기본 경로: `/attendance/groupservicetimes`

그룹을 특정 예배 시간에 연결합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 그룹-예배 시간 연결 목록 조회. `?groupId=`로 필터링하면 예배 이름이 포함된 연결을 가져옴 |
| GET | `/:id` | JWT | — | ID로 그룹-예배 시간 연결 조회 |
| POST | `/` | JWT | Services.Edit | 그룹-예배 시간 연결 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Services.Edit | 그룹-예배 시간 연결 삭제 |

## 출석 기록 {#attendance-records}

기본 경로: `/attendance/attendancerecords`

보고와 표시를 위해 출석 데이터의 읽기 전용 집계 뷰를 제공합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 사람의 출석 기록 조회. `?personId=`가 필요함 |
| GET | `/my` | JWT | — | 본인 전용: 로그인한 회원 본인의 최근 12개월 출석 기록, 최신순. 사용자가 사람과 연결되어 있지 않으면 `401`을 반환. B1 나 페이지의 **내 출석** 섹션을 지원 |
| GET | `/tree` | JWT | — | 전체 출석 트리(캠퍼스, 예배, 예배 시간, 그룹) 조회 |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | 선택적 필터를 적용한 출석 추세 데이터 조회 |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | 특정 주의 예배에 대한 그룹 출석 조회 |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | 예배 시간에 배정된 모든 그룹에 대해, 해당 날짜의 `{ groupId, sessionId, attendanceCount }`를 반환(`date`는 `YYYY-MM-DD`; 그룹에 세션이 없으면 `sessionId`는 null). B1Admin의 **아직 출석이 필요한 그룹** 대화상자를 지원 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | 필터(캠퍼스, 예배, 예배 시간, 그룹, 날짜 범위)로 출석 기록 검색 |

### 예시: 출석 추세 {#example-attendance-trend}

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

## 세션 {#sessions}

기본 경로: `/attendance/sessions`

GenericCrudController를 확장하며, CRUD 라우트 `getById`와 `delete`를 가집니다. `getAll`과 `save` 엔드포인트는 사용자 지정 구현이며, 그룹 리더도 자신의 그룹에 대한 세션을 관리할 수 있도록 허용합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View 또는 그룹 리더 | 모든 세션 목록 조회. `?groupId=`로 필터링(이름 포함). 그룹 리더는 자신의 그룹 세션을 볼 수 있음 |
| GET | `/:id` | JWT | Attendance.View | ID로 세션 조회 |
| POST | `/` | JWT | Attendance.Edit 또는 그룹 리더 | 세션 생성 또는 업데이트. 그룹 리더는 자신의 그룹 세션을 저장할 수 있음 |
| DELETE | `/:id` | JWT | Attendance.Edit | 세션 삭제 |

## 방문 {#visits}

기본 경로: `/attendance/visits`

개별 방문 기록(특정 날짜에 참석한 사람)을 관리하고, 체크인 흐름을 제공합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 모든 방문 목록 조회. `?personId=`로 필터링 |
| GET | `/:id` | JWT | Attendance.View | ID로 방문 조회 |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View 또는 Attendance.Checkin | 예배에서 사람들의 체크인 데이터 조회. 마지막으로 기록된 날짜의 방문 세션이 포함된 방문을 반환 |
| POST | `/` | JWT | Attendance.Edit | 방문 생성 또는 업데이트 |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit 또는 Attendance.Checkin | 체크인 데이터 제출. 방문과 방문 세션을 생성 또는 업데이트하고, 오래된 기록을 제거 |
| DELETE | `/:id` | JWT | Attendance.Edit | 방문 삭제 |

### 예시: 체크인 흐름 {#example-check-in-flow}

**1단계 -- 기존 체크인 데이터 불러오기:**

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

대상 예배 시간에 체크인 일정이 있고 그 기간이 닫혀 있다면(`checkinOpen`과 같은 캠퍼스 우선 시간대 순서로 계산), 아무것도 저장되지 않으며 응답은 `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`입니다. 정원 및 봉사자 비율 위반도 409를 반환합니다(`error: "capacity"` 또는 `"ratio"`). 한 사람이 오늘 이미 가진 세션(체크인할 때마다 다시 전송됨)은 기간 검사를 건너뛰므로, 가구는 이전 예배 시간의 기간이 닫힌 뒤에도 열려 있는 이후 예배 시간을 추가할 수 있습니다.

## 방문 세션 {#visit-sessions}

기본 경로: `/attendance/visitsessions`

방문과 세션의 연결(방문 중 사람이 참석한 특정 세션)을 관리합니다. 빠른 기록 엔드포인트와 다운로드/내보내기 엔드포인트도 제공합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View 또는 그룹 리더 | 방문 세션 목록 조회. `?sessionId=`로 필터링. 그룹 리더는 자신의 그룹 방문 세션을 볼 수 있음 |
| GET | `/:id` | JWT | Attendance.View | ID로 방문 세션 조회 |
| GET | `/download/:sessionId` | JWT | Attendance.View | 세션의 출석 다운로드(출석/결석 상태가 포함된 사람 이름 반환) |
| POST | `/` | JWT | Attendance.Edit | 방문 세션 생성 또는 업데이트 |
| POST | `/log` | JWT | Attendance.Edit 또는 그룹 리더 | 사람의 출석을 세션에 빠르게 기록. 필요하면 방문을 자동으로 생성. 그룹 리더는 자신의 그룹 출석을 기록할 수 있음 |
| DELETE | `/:id` | JWT | Attendance.Edit | ID로 방문 세션 삭제 |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit 또는 그룹 리더 | 세션에서 사람을 제거. 방문 세션을 삭제하고, 남은 세션이 없으면 상위 방문도 삭제. 그룹 리더는 자신의 그룹 출석을 제거할 수 있음 |

### 예시: 출석 빠른 기록 {#example-quick-log-attendance}

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

### 예시: 세션 출석 다운로드 {#example-download-session-attendance}

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

## 연속 출석 {#streaks}

기본 경로: `/attendance/streaks`

개인의 연속 출석, 즉 한 사람이 연속으로 참석한 주를 추적합니다. 참여도 지표와 게임화에 유용합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | 사람의 연속 출석 기록 조회 |

## 관련 문서 {#related-pages}

- [Membership 엔드포인트](./membership) — 사람, 그룹, 역할, 교회 관리
- [인증 및 권한](./authentication) — 로그인 흐름, JWT, 권한 모델
- [모듈 구조](../module-structure) — 코드 구성 패턴
