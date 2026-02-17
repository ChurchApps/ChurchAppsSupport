---
title: "Attendance Endpoints"
---

# Attendance Endpoints

<div class="article-intro">

The Attendance module manages campus locations, services, service times, attendance sessions, visits, and visit sessions. It provides the infrastructure for tracking who attended which service or group meeting, supports check-in workflows, and offers attendance trend and summary reporting.

</div>

**Base path:** `/attendance`

## Campuses

Base path: `/attendance/campuses`

Standard CRUD controller (extends GenericCrudController). Provides `getById`, `getAll`, `post`, and `delete` routes via the CRUD base class.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all campuses for the church |
| GET | `/:id` | JWT | — | Get a campus by ID |
| POST | `/` | JWT | Services.Edit | Create or update campuses |
| DELETE | `/:id` | JWT | Services.Edit | Delete a campus |

## Services

Base path: `/attendance/services`

Extends GenericCrudController with CRUD routes `getById`, `getAll`, `post`, and `delete`. The `getAll` (`GET /`) and `search` endpoints are overridden with custom implementations.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all services (includes campus info) |
| GET | `/:id` | JWT | — | Get a service by ID |
| GET | `/search?campusId=` | JWT | — | Search services by campus ID |
| POST | `/` | JWT | Services.Edit | Create or update services |
| DELETE | `/:id` | JWT | Services.Edit | Delete a service |

### Example: Search Services by Campus

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

Base path: `/attendance/servicetimes`

Extends GenericCrudController with CRUD routes `getById`, `post`, and `delete`. The `getAll` and `search` endpoints are custom implementations.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all service times. Filter by `?serviceId=`. Add `?include=groups` to append group data |
| GET | `/:id` | JWT | — | Get a service time by ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Search service times by campus and service |
| POST | `/` | JWT | Services.Edit | Create or update service times |
| DELETE | `/:id` | JWT | Services.Edit | Delete a service time |

## Group Service Times

Base path: `/attendance/groupservicetimes`

Links groups to specific service times.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all group-service-time associations. Filter by `?groupId=` to get associations with service names |
| GET | `/:id` | JWT | — | Get a group-service-time association by ID |
| POST | `/` | JWT | Services.Edit | Create or update group-service-time associations |
| DELETE | `/:id` | JWT | Services.Edit | Delete a group-service-time association |

## Attendance Records

Base path: `/attendance/attendancerecords`

Provides read-only aggregate views of attendance data for reporting and display.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Load attendance records for a person. Requires `?personId=` |
| GET | `/tree` | JWT | — | Load the full attendance tree (campuses, services, service times, groups) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Load attendance trend data with optional filters |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Load group attendance for a service on a given week |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Search attendance records with filters (campus, service, service time, group, date range) |

### Example: Attendance Trend

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

Base path: `/attendance/sessions`

Extends GenericCrudController with CRUD routes `getById` and `delete`. The `getAll` and `save` endpoints are custom implementations that also allow group leaders to manage sessions for their groups.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View or Group Leader | List all sessions. Filter by `?groupId=` (includes names). Group leaders can view sessions for their own groups |
| GET | `/:id` | JWT | Attendance.View | Get a session by ID |
| POST | `/` | JWT | Attendance.Edit or Group Leader | Create or update sessions. Group leaders can save sessions for their own groups |
| DELETE | `/:id` | JWT | Attendance.Edit | Delete a session |

## Visits

Base path: `/attendance/visits`

Manages individual visit records (a person attending on a specific date) and provides the check-in workflow.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | List all visits. Filter by `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Get a visit by ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View or Attendance.Checkin | Load check-in data for people at a service. Returns visits with visit sessions from the last logged date |
| POST | `/` | JWT | Attendance.Edit | Create or update visits |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit or Attendance.Checkin | Submit check-in data. Creates/updates visits and visit sessions, removes stale records |
| DELETE | `/:id` | JWT | Attendance.Edit | Delete a visit |

### Example: Check-in Flow

**Step 1 -- Load existing check-in data:**

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

**Step 2 -- Submit check-in:**

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

Base path: `/attendance/visitsessions`

Manages the association between visits and sessions (which specific session a person attended during a visit). Also provides a quick log endpoint and a download/export endpoint.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View or Group Leader | List visit sessions. Filter by `?sessionId=`. Group leaders can view visit sessions for their own groups |
| GET | `/:id` | JWT | Attendance.View | Get a visit session by ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Download attendance for a session (returns person names with present/absent status) |
| POST | `/` | JWT | Attendance.Edit | Create or update visit sessions |
| POST | `/log` | JWT | Attendance.Edit or Group Leader | Quick-log a person's attendance to a session. Automatically creates visit if needed. Group leaders can log attendance for their own groups |
| DELETE | `/:id` | JWT | Attendance.Edit | Delete a visit session by ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit or Group Leader | Remove a person from a session. Deletes the visit session and the parent visit if no sessions remain. Group leaders can remove attendance for their own groups |

### Example: Quick-Log Attendance

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

### Example: Download Session Attendance

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

## Related Pages

- [Membership Endpoints](./membership) — People, groups, roles, and church management
- [Authentication & Permissions](./authentication) — Login flow, JWT, permission model
- [Module Structure](../module-structure) — Code organization patterns
