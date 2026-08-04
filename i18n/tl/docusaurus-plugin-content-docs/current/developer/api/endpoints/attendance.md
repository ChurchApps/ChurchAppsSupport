---
title: "Attendance Endpoints"
---

# Attendance Endpoints

<div class="article-intro">

Pinamamahalaan ng Attendance module ang mga lokasyon ng campus, serbisyo, oras ng serbisyo, attendance session, visit, at visit session. Nagbibigay ito ng imprastraktura para subaybayan kung sino ang dumalo sa aling serbisyo o pagpupulong ng grupo, sinusuportahan ang mga check-in workflow, at nag-aalok ng trend at summary reporting ng attendance.

</div>

**Base path:** `/attendance`

## Campuses

Base path: `/attendance/campuses`

Standard na CRUD controller (nag-e-extend ng GenericCrudController). Nagbibigay ng mga route na `getById`, `getAll`, `post`, at `delete` sa pamamagitan ng CRUD base class.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng campus para sa simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang campus ayon sa ID |
| POST | `/` | JWT | Services.Edit | Lumikha o mag-update ng mga campus |
| DELETE | `/:id` | JWT | Services.Edit | Tanggalin ang isang campus |

## Services

Base path: `/attendance/services`

Nag-e-extend ng GenericCrudController na may mga CRUD route na `getById`, `getAll`, `post`, at `delete`. Ang `getAll` (`GET /`) at `search` endpoint ay na-override gamit ang custom na implementasyon.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng serbisyo (kasama ang impormasyon ng campus) |
| GET | `/:id` | JWT | — | Kunin ang isang serbisyo ayon sa ID |
| GET | `/search?campusId=` | JWT | — | Maghanap ng mga serbisyo ayon sa campus ID |
| POST | `/` | JWT | Services.Edit | Lumikha o mag-update ng mga serbisyo |
| DELETE | `/:id` | JWT | Services.Edit | Tanggalin ang isang serbisyo |

### Halimbawa: Maghanap ng mga Serbisyo ayon sa Campus

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

Nag-e-extend ng GenericCrudController na may mga CRUD route na `getById`, `post`, at `delete`. Ang `getAll` at `search` endpoint ay mga custom na implementasyon.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng oras ng serbisyo. I-filter sa pamamagitan ng `?serviceId=`. Idagdag ang `?include=groups` upang isama ang data ng grupo |
| GET | `/:id` | JWT | — | Kunin ang isang oras ng serbisyo ayon sa ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Maghanap ng mga oras ng serbisyo ayon sa campus at serbisyo |
| GET | `/public/:churchId` | Public | — | Kunin ang campus → serbisyo → time tree para sa isang simbahan. Nagpapatakbo sa `serviceTimes` element ng website builder |
| POST | `/` | JWT | Services.Edit | Lumikha o mag-update ng mga oras ng serbisyo |
| DELETE | `/:id` | JWT | Services.Edit | Tanggalin ang isang oras ng serbisyo |

## Group Service Times

Base path: `/attendance/groupservicetimes`

Nag-uugnay ng mga grupo sa partikular na mga oras ng serbisyo.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng ugnayan ng group-service-time. I-filter sa pamamagitan ng `?groupId=` upang makuha ang mga ugnayan na may pangalan ng serbisyo |
| GET | `/:id` | JWT | — | Kunin ang isang ugnayan ng group-service-time ayon sa ID |
| POST | `/` | JWT | Services.Edit | Lumikha o mag-update ng mga ugnayan ng group-service-time |
| DELETE | `/:id` | JWT | Services.Edit | Tanggalin ang isang ugnayan ng group-service-time |

## Attendance Records

Base path: `/attendance/attendancerecords`

Nagbibigay ng read-only na aggregate view ng attendance data para sa reporting at pagpapakita.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | I-load ang mga attendance record para sa isang tao. Kailangan ang `?personId=` |
| GET | `/tree` | JWT | — | I-load ang buong attendance tree (mga campus, serbisyo, oras ng serbisyo, grupo) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | I-load ang attendance trend data na may opsyonal na mga filter |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | I-load ang group attendance para sa isang serbisyo sa isang naibigay na linggo |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Maghanap ng mga attendance record na may mga filter (campus, serbisyo, oras ng serbisyo, grupo, saklaw ng petsa) |

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

## Sessions

Base path: `/attendance/sessions`

Nag-e-extend ng GenericCrudController na may mga CRUD route na `getById` at `delete`. Ang `getAll` at `save` endpoint ay mga custom na implementasyon na nagpapahintulot din sa mga leader ng grupo na pamahalaan ang mga session para sa kanilang mga grupo.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Ilista ang lahat ng session. I-filter sa pamamagitan ng `?groupId=` (kasama ang mga pangalan). Maaaring tingnan ng mga leader ng grupo ang mga session para sa kanilang sariling mga grupo |
| GET | `/:id` | JWT | Attendance.View | Kunin ang isang session ayon sa ID |
| POST | `/` | JWT | Attendance.Edit o Group Leader | Lumikha o mag-update ng mga session. Maaaring mag-save ng mga session ang mga leader ng grupo para sa kanilang sariling mga grupo |
| DELETE | `/:id` | JWT | Attendance.Edit | Tanggalin ang isang session |

## Visits

Base path: `/attendance/visits`

Pinamamahalaan ang mga indibidwal na visit record (isang tao na dumalo sa isang partikular na petsa) at nagbibigay ng check-in workflow.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Ilista ang lahat ng visit. I-filter sa pamamagitan ng `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Kunin ang isang visit ayon sa ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | I-load ang check-in data para sa mga tao sa isang serbisyo. Nagbabalik ng mga visit na may mga visit session mula sa huling naka-log na petsa |
| POST | `/` | JWT | Attendance.Edit | Lumikha o mag-update ng mga visit |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Isumite ang check-in data. Lumilikha/nag-a-update ng mga visit at visit session, inaalis ang mga lipas nang record |
| DELETE | `/:id` | JWT | Attendance.Edit | Tanggalin ang isang visit |

### Halimbawa: Daloy ng Check-in

**Hakbang 1 -- I-load ang umiiral nang check-in data:**

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

**Hakbang 2 -- Isumite ang check-in:**

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

Pinamamahalaan ang ugnayan sa pagitan ng mga visit at session (kung aling partikular na session ang dinaluhan ng isang tao sa panahon ng isang visit). Nagbibigay din ng mabilisang log endpoint at isang download/export endpoint.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Ilista ang mga visit session. I-filter sa pamamagitan ng `?sessionId=`. Maaaring tingnan ng mga leader ng grupo ang mga visit session para sa kanilang sariling mga grupo |
| GET | `/:id` | JWT | Attendance.View | Kunin ang isang visit session ayon sa ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | I-download ang attendance para sa isang session (nagbabalik ng mga pangalan ng tao kasama ang katayuang present/absent) |
| POST | `/` | JWT | Attendance.Edit | Lumikha o mag-update ng mga visit session |
| POST | `/log` | JWT | Attendance.Edit o Group Leader | Mabilis na i-log ang attendance ng isang tao sa isang session. Awtomatikong lumilikha ng visit kung kailangan. Maaaring mag-log ng attendance ang mga leader ng grupo para sa kanilang sariling mga grupo |
| DELETE | `/:id` | JWT | Attendance.Edit | Tanggalin ang isang visit session ayon sa ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o Group Leader | Alisin ang isang tao mula sa isang session. Tinatanggal ang visit session at ang parent visit kung walang natitirang session. Maaaring alisin ng mga leader ng grupo ang attendance para sa kanilang sariling mga grupo |

### Halimbawa: Mabilisang Pag-log ng Attendance

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

### Halimbawa: I-download ang Attendance ng Session

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

Base path: `/attendance/streaks`

Sinusubaybayan ang mga attendance streak ng mga indibidwal -- ang magkakasunod na linggo na dumalo ang isang tao. Kapaki-pakinabang para sa mga engagement metric at gamification.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | I-load ang mga attendance streak para sa isang tao |

## Mga Kaugnay na Pahina

- [Membership Endpoints](./membership) — Mga tao, grupo, tungkulin, at pamamahala ng simbahan
- [Authentication & Permissions](./authentication) — Daloy ng pag-login, JWT, permission model
- [Module Structure](../module-structure) — Mga pattern ng pag-oorganisa ng code
