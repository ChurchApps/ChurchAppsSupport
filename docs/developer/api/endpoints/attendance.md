---
title: "Attendance Endpoints"
description: "Reference for the attendance API in B1 Admin and B1 Checkin: services, service times, sessions, visits, check-in and checkout, headcounts, and label templates."
---

# Attendance Endpoints

<div class="article-intro">

The Attendance module manages services, service times, attendance sessions, visits, and visit sessions, along with headcounts and check-in label templates. It provides the infrastructure for tracking who attended which service or group meeting, supports check-in and checkout workflows (including texting a checked-in person's household adults), and offers attendance trend and summary reporting. Campuses are now managed in the Membership module; the campus routes here are read-only.

</div>

**Base path:** `/attendance`

## Campuses

Base path: `/attendance/campuses`

Deprecated and read-only. Campuses are now managed in the Membership module: create, update, and delete them through `/membership/campuses` (Settings.Edit), documented on the [Membership Endpoints](./membership.md) page. The two routes below read the attendance module's own frozen copy of the campus list, which is slated for removal, so new integrations should read campuses from `/membership/campuses` too. `POST /attendance/campuses` and `DELETE /attendance/campuses/:id` no longer exist.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all campuses for the church |
| GET | `/:id` | JWT | — | Get a campus by ID |

## Services

Base path: `/attendance/services`

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

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all service times. Filter by `?serviceId=`. Add `?include=groups` to append group data. Each row includes a computed `checkinOpen` boolean (false only when the service time has a check-in schedule whose window is closed right now). The window is measured in the time zone of the service's campus, then the church's time zone, then the first campus that has one, then `America/New_York` |
| GET | `/:id` | JWT | — | Get a service time by ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Search service times by campus and service |
| GET | `/public/:churchId` | Public | — | Get the campus → service → time tree for a church. Powers the website builder's `serviceTimes` element |
| POST | `/` | JWT | Services.Edit | Create or update service times. Optional schedule fields: `dayOfWeek` (0 = Sunday … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (before start), `checkinCloseMinutes` (after end). Check-in is only time-gated when both `dayOfWeek` and `startTime` are set |
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
| GET | `/my` | JWT | — | Self-scoped: the signed-in member's own attendance records from the last 12 months, newest first. Returns `401` if the user isn't linked to a person. Backs the **My Attendance** section of the B1 Me page |
| GET | `/tree` | JWT | — | Load the full attendance tree (campuses, services, service times, groups) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Load attendance trend data with optional filters |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Load group attendance for a service on a given week |
| GET | `/groupsummary?weeks=` | JWT | Attendance.View Summary | Per-group attendance summary over sessions dated in the last `weeks` weeks (default 13, minimum 1): `[{ groupId, sessionCount, totalVisits, averageAttendance, lastSessionDate }]`. `averageAttendance` is visits per session, rounded to one decimal. Groups with no session in the window are left out |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | For every group assigned to the service time, return `{ groupId, sessionId, attendanceCount }` for that date (`date` is `YYYY-MM-DD`; `sessionId` is null when the group has no session). Backs B1Admin's **Who Still Needs Attendance** dialog |
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

Group leaders can create and update sessions for the groups they lead, and a group's members and leaders can list that group's sessions, without holding an attendance permission.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View or group member | List all sessions. Filter by `?groupId=` (includes names). Without Attendance.View, the caller must pass the `groupId` of a group they belong to or lead |
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
| GET | `/active?peopleIds=` | JWT | Attendance.View or Attendance.Checkin | Today's visits that have not been checked out, for a comma-separated list of person IDs. Each visit includes its `visitSessions`, each with its `session`. `400` when `peopleIds` is empty |
| GET | `/code/:code` | JWT | Attendance.View or Attendance.Checkin | Today's visits that have not been checked out and carry the security code `code` (case-insensitive), with `visitSessions` and their `session`. Used at checkout to find everyone checked in under one code |
| GET | `/:id/guardians` | JWT | Attendance.Checkin or Attendance.Edit | The adults in the household of the visit's person (household members whose role is not `Child`): `[{ personId, name, mobilePhone }]`. Returns `[]` when the visit is not found |
| POST | `/` | JWT | Attendance.Edit | Create or update visits |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit or Attendance.Checkin | Submit check-in data. Creates/updates visits and visit sessions, removes stale records. Returns `{ streaks, securityCode }`: `streaks` maps each person ID in `peopleIds` to their number of consecutive weeks attended, up to and including this week, and `securityCode` is the 4-character code for this batch (a re-check-in keeps the code those people already hold today when the request sends it back) |
| POST | `/checkout` | JWT | Attendance.Edit or Attendance.Checkin | Check out visits. Body: `{ visitIds, checkedOutBy?, checkedOutById? }`. Sets `checkoutTime` to now on each visit and stores who collected them, emits an `attendance.checkout` webhook per visit, and returns the updated visits. An empty `visitIds` returns `[]` |
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

If a targeted service time has a check-in schedule and its window is closed (measured in the same campus-first time zone order as `checkinOpen`), nothing is saved and the response is `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Capacity and volunteer-ratio violations also return 409 (`error: "capacity"` or `"ratio"`). Sessions a person already holds today (re-posted with each check-in) skip the window check, so a household can add an open service time after an earlier one's window has closed.

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

## Check-in

Base path: `/attendance/checkin`

Support routes for check-in stations: the church settings a kiosk needs, and text messages to the adults of checked-in people. Texts are sent through the church's texting provider to the mobile phone of each adult in the person's household (household members whose role is not `Child`). Adults with no mobile phone or who have opted out of texts are skipped, a number shared by several adults is texted once, and one request reaches at most 500 numbers. Each send is saved as a sent text with per-recipient delivery logs. See [Check-Ins](../../architecture/check-ins.md) for how check-in fits together.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/settings` | JWT | Attendance.Checkin or Attendance.View | The church settings a kiosk needs: `{ gradePromotionDate, checkinAnnouncement }`. `gradePromotionDate` is `null` and `checkinAnnouncement` is `""` when not set |
| POST | `/page` | JWT | Attendance.Checkin or Attendance.Edit | Text the household adults of one checked-in person. Body: `{ visitId, message }` (`message` up to 480 characters). Returns `{ sent, failed, skippedOptedOut, skippedNoPhone }`. `400` when a field is missing, the message is too long, or the church has no texting provider; `404` when the visit is not found |
| POST | `/broadcast` | JWT | Attendance.Checkin or Attendance.Edit | Text the household adults of everyone still checked in to a service (today's visits for `serviceId` with no checkout time). Body: `{ serviceId, message }` (`message` up to 480 characters). Returns `{ sent, failed, skippedOptedOut, skippedNoPhone }`, with `sent: 0` when nobody is checked in. Limited to 10 broadcasts per church per hour (`429`); `400` for the same reasons as `/page` |

## Headcounts

Base path: `/attendance/headcounts`

Manually entered head counts: a number of people for a service, service time, or group on a date.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | List headcounts, newest date first. Filter by `?serviceTimeId=` or `?groupId=`. The unfiltered list also includes `serviceName` and `serviceTimeName` |
| GET | `/:id` | JWT | Attendance.View | Get a headcount by ID |
| POST | `/` | JWT | Attendance.Edit | Create or update headcounts (batch). Each item needs `headcountDate`, a whole-number `value` of zero or more, and at least one of `serviceId`, `serviceTimeId`, or `groupId` (`campusId` is optional); otherwise `400`. New rows record the caller as `enteredBy` |
| DELETE | `/:id` | JWT | Attendance.Edit | Delete a headcount |

## Label Templates

Base path: `/attendance/labeltemplates`

Designable check-in label layouts. Each template has a `name`, `labelType`, `width`, `height`, `content`, and an `isDefault` flag; a church has at most one default per `labelType`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View or Attendance.Checkin | List the church's label templates, sorted by name |
| GET | `/:id` | JWT | Attendance.View or Attendance.Checkin | Get a label template by ID |
| POST | `/` | JWT | Attendance.Edit | Create or update label templates (batch). Saving a template with `isDefault` set clears `isDefault` on the church's other templates of the same `labelType` |
| DELETE | `/:id` | JWT | Attendance.Edit | Delete a label template |

## Related Pages

- [Check-Ins](../../architecture/check-ins.md) — How check-in works across the kiosk, member, and admin apps
- [Membership Endpoints](./membership.md) — People, groups, roles, and church management
- [Authentication & Permissions](./authentication.md) — Login flow, JWT, permission model
- [Module Structure](../module-structure.md) — Code organization patterns
