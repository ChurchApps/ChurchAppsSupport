---
title: "Attendance Endpoints"
---

# Attendance Endpoints

<div class="article-intro">

Ang Attendance module ay namamahala sa mga lokasyon ng campus, serbisyo, oras ng serbisyo, paghahabag session, pagbibisita, at pagbibisita ng session. Ito ay nagbibigay ng infrastructure para sa pagsubaybay kung sino ang dumalo sa aling serbisyo o grupo na pagpupulong, sinusuportahan ang check-in workflow, at nag-aalok ng paghahabag trend at summary reporting.

</div>

**Base path:** `/attendance`

## Campus

Base path: `/attendance/campuses`

Standard CRUD controller (nag-extend ng GenericCrudController). Nagbibigay ng `getById`, `getAll`, `post`, at `delete` route sa pamamagitan ng CRUD base class.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Itala ang lahat ng campus para sa simbahan |
| GET | `/:id` | JWT | — | Makakuha ng campus sa pamamagitan ng ID |
| POST | `/` | JWT | Services.Edit | Lumikha o i-update ang campus |
| DELETE | `/:id` | JWT | Services.Edit | Tanggalin ang campus |

## Serbisyo

Base path: `/attendance/services`

Nag-extend ng GenericCrudController na may CRUD route `getById`, `getAll`, `post`, at `delete`. Ang `getAll` (`GET /`) at `search` endpoint ay na-override gamit ang custom implementation.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Itala ang lahat ng serbisyo (kasama ang campus info) |
| GET | `/:id` | JWT | — | Makakuha ng serbisyo sa pamamagitan ng ID |
| GET | `/search?campusId=` | JWT | — | Maghanap ng serbisyo ayon sa campus ID |
| POST | `/` | JWT | Services.Edit | Lumikha o i-update ang serbisyo |
| DELETE | `/:id` | JWT | Services.Edit | Tanggalin ang serbisyo |

### Halimbawa: Maghanap ng Serbisyo ayon sa Campus

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

## Service Time

Base path: `/attendance/servicetimes`

Nag-extend ng GenericCrudController na may CRUD route `getById`, `post`, at `delete`. Ang `getAll` at `search` endpoint ay custom implementation.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Itala ang lahat ng service time. Filter sa pamamagitan ng `?serviceId=`. Idagdag ang `?include=groups` upang idagdag ang group data |
| GET | `/:id` | JWT | — | Makakuha ng service time sa pamamagitan ng ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Maghanap ng service time ayon sa campus at serbisyo |
| GET | `/public/:churchId` | Public | — | Makakuha ng campus → serbisyo → time tree para sa simbahan. Nag-power sa website builder's `serviceTimes` element |
| POST | `/` | JWT | Services.Edit | Lumikha o i-update ang service time |
| DELETE | `/:id` | JWT | Services.Edit | Tanggalin ang service time |

## Group Service Time

Base path: `/attendance/groupservicetimes`

Nag-link ng mga grupo sa specific na service time.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Itala ang lahat ng group-service-time association. Filter sa pamamagitan ng `?groupId=` upang makakuha ng association na may service name |
| GET | `/:id` | JWT | — | Makakuha ng group-service-time association sa pamamagitan ng ID |
| POST | `/` | JWT | Services.Edit | Lumikha o i-update ang group-service-time association |
| DELETE | `/:id` | JWT | Services.Edit | Tanggalin ang group-service-time association |

## Attendance Record

Base path: `/attendance/attendancerecords`

Nagbibigay ng read-only aggregate view ng attendance data para sa reporting at display.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | I-load ang attendance record para sa isang tao. Nangangailangan ng `?personId=` |
| GET | `/tree` | JWT | — | I-load ang full attendance tree (campus, serbisyo, service time, grupo) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | I-load ang attendance trend data na may optional na filter |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | I-load ang group attendance para sa serbisyo sa isang naibigay na linggo |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Maghanap ng attendance record na may filter (campus, serbisyo, service time, grupo, date range) |

### Halimbawa: Attendance Trend

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

## Session

Base path: `/attendance/sessions`

Nag-extend ng GenericCrudController na may CRUD route `getById` at `delete`. Ang `getAll` at `save` endpoint ay custom implementation na nagbibigay-daan din sa mga lider ng grupo na pamahalaan ang session para sa kanilang mga grupo.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Itala ang lahat ng session. Filter sa pamamagitan ng `?groupId=` (kasama ang mga pangalan). Ang mga lider ng grupo ay maaaring tingnan ang session para sa kanilang mga grupo |
| GET | `/:id` | JWT | Attendance.View | Makakuha ng session sa pamamagitan ng ID |
| POST | `/` | JWT | Attendance.Edit o Group Leader | Lumikha o i-update ang session. Ang mga lider ng grupo ay maaaring magsave ng session para sa kanilang mga grupo |
| DELETE | `/:id` | JWT | Attendance.Edit | Tanggalin ang session |

## Pagbibisita

Base path: `/attendance/visits`

Namamahala ng individual na visit record (isang tao na dumalo sa isang specific na petsa) at nagbibigay ng check-in workflow.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Itala ang lahat ng pagbibisita. Filter sa pamamagitan ng `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Makakuha ng pagbibisita sa pamamagitan ng ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | I-load ang check-in data para sa mga tao sa isang serbisyo. Nagbabalik ng pagbibisita na may pagbibisita ng session mula sa huling naka-log na petsa |
| POST | `/` | JWT | Attendance.Edit | Lumikha o i-update ang pagbibisita |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Ipadala ang check-in data. Lumilikha/nag-update ng pagbibisita at pagbibisita ng session, nag-aalis ng stale record |
| DELETE | `/:id` | JWT | Attendance.Edit | Tanggalin ang pagbibisita |

### Halimbawa: Check-in Flow

**Hakbang 1 -- I-load ang umiiral na check-in data:**

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

**Hakbang 2 -- Ipadala ang check-in:**

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

## Visit Session

Base path: `/attendance/visitsessions`

Namamahala ang association sa pagitan ng pagbibisita at session (kung aling specific na session ang dumalo ng tao sa panahon ng pagbibisita). Nagbibigay din ng isang quick log endpoint at isang download/export endpoint.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Itala ang visit session. Filter sa pamamagitan ng `?sessionId=`. Ang mga lider ng grupo ay maaaring tingnan ang visit session para sa kanilang mga grupo |
| GET | `/:id` | JWT | Attendance.View | Makakuha ng visit session sa pamamagitan ng ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | I-download ang attendance para sa isang session (nagbabalik ng mga pangalan ng tao na may present/absent status) |
| POST | `/` | JWT | Attendance.Edit | Lumikha o i-update ang visit session |
| POST | `/log` | JWT | Attendance.Edit o Group Leader | Quick-log ng paghahabag ng tao sa isang session. Awtomatikong lumilikha ng pagbibisita kung kinakailangan. Ang mga lider ng grupo ay maaaring mag-log ng attendance para sa kanilang mga grupo |
| DELETE | `/:id` | JWT | Attendance.Edit | Tanggalin ang visit session sa pamamagitan ng ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o Group Leader | Alisin ang isang tao mula sa isang session. Tinatanggal ang visit session at ang parent visit kung walang session na natitira. Ang mga lider ng grupo ay maaaring alisin ang attendance para sa kanilang mga grupo |

### Halimbawa: Quick-Log Attendance

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

### Halimbawa: I-download ang Session Attendance

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

## Streak

Base path: `/attendance/streaks`

Sinusubaybayan ang attendance streak para sa mga indibidwal -- bertikal na linggo ang tao ay dumalo. Kapaki-pakinabang para sa engagement metric at gamification.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | I-load ang attendance streak para sa isang tao |

## Mga Kaugnay na Pahina

- [Membership Endpoint](./membership) — Mga tao, grupo, tungkulin, at church management
- [Authentication & Permission](./authentication) — Login flow, JWT, permission model
- [Module Structure](../module-structure) — Code organization pattern
