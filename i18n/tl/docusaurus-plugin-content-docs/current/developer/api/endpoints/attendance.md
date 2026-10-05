---
title: "Mga Endpoint ng Attendance"
---

# Mga Endpoint ng Attendance

<div class="article-intro">

Pinamamahalaan ng Attendance module ang mga lokasyon ng campus, mga serbisyo, mga oras ng serbisyo, mga sesyon ng attendance, mga visit, at mga visit session. Ito ang nagbibigay ng imprastraktura para masubaybayan kung sino ang dumalo sa aling serbisyo o pagtitipon ng grupo, sumusuporta sa mga workflow ng check-in, at nag-aalok ng pag-uulat ng mga trend at buod ng attendance.

</div>

**Base path:** `/attendance`

## Mga Campus

Base path: `/attendance/campuses`

Karaniwang CRUD controller (nag-e-extend ng GenericCrudController). Nagbibigay ng mga route na `getById`, `getAll`, `post`, at `delete` sa pamamagitan ng CRUD base class.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng campus ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang campus ayon sa ID |
| POST | `/` | JWT | Services.Edit | Gumawa o mag-update ng mga campus |
| DELETE | `/:id` | JWT | Services.Edit | Magtanggal ng campus |

## Mga Serbisyo

Base path: `/attendance/services`

Nag-e-extend ng GenericCrudController na may mga CRUD route na `getById`, `getAll`, `post`, at `delete`. Ang mga endpoint na `getAll` (`GET /`) at `search` ay pinalitan ng mga custom na implementasyon.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng serbisyo (kasama ang impormasyon ng campus) |
| GET | `/:id` | JWT | — | Kunin ang isang serbisyo ayon sa ID |
| GET | `/search?campusId=` | JWT | — | Maghanap ng mga serbisyo ayon sa campus ID |
| POST | `/` | JWT | Services.Edit | Gumawa o mag-update ng mga serbisyo |
| DELETE | `/:id` | JWT | Services.Edit | Magtanggal ng serbisyo |

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

## Mga Oras ng Serbisyo

Base path: `/attendance/servicetimes`

Nag-e-extend ng GenericCrudController na may mga CRUD route na `getById`, `post`, at `delete`. Ang mga endpoint na `getAll` at `search` ay mga custom na implementasyon.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng oras ng serbisyo. I-filter gamit ang `?serviceId=`. Idagdag ang `?include=groups` para isama ang data ng grupo |
| GET | `/:id` | JWT | — | Kunin ang isang oras ng serbisyo ayon sa ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Maghanap ng mga oras ng serbisyo ayon sa campus at serbisyo |
| GET | `/public/:churchId` | Public | — | Kunin ang puno ng campus → serbisyo → oras para sa isang simbahan. Ito ang nagpapagana sa elementong `serviceTimes` ng website builder |
| POST | `/` | JWT | Services.Edit | Gumawa o mag-update ng mga oras ng serbisyo |
| DELETE | `/:id` | JWT | Services.Edit | Magtanggal ng oras ng serbisyo |

## Mga Oras ng Serbisyo ng Grupo

Base path: `/attendance/groupservicetimes`

Nag-uugnay ng mga grupo sa mga partikular na oras ng serbisyo.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng ugnayan ng grupo at oras ng serbisyo. I-filter gamit ang `?groupId=` para makuha ang mga ugnayan kasama ang mga pangalan ng serbisyo |
| GET | `/:id` | JWT | — | Kunin ang isang ugnayan ng grupo at oras ng serbisyo ayon sa ID |
| POST | `/` | JWT | Services.Edit | Gumawa o mag-update ng mga ugnayan ng grupo at oras ng serbisyo |
| DELETE | `/:id` | JWT | Services.Edit | Magtanggal ng ugnayan ng grupo at oras ng serbisyo |

## Mga Tala ng Attendance

Base path: `/attendance/attendancerecords`

Nagbibigay ng mga read-only na pinagsama-samang tanaw ng data ng attendance para sa pag-uulat at pagpapakita.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Kunin ang mga tala ng attendance ng isang tao. Kailangan ang `?personId=` |
| GET | `/tree` | JWT | — | Kunin ang buong puno ng attendance (mga campus, serbisyo, oras ng serbisyo, grupo) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Kunin ang data ng trend ng attendance na may opsyonal na mga filter |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Kunin ang attendance ng mga grupo para sa isang serbisyo sa isang partikular na linggo |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Para sa bawat grupong nakatalaga sa oras ng serbisyo, ibabalik ang `{ groupId, sessionId, attendanceCount }` para sa petsang iyon (ang `date` ay `YYYY-MM-DD`; ang `sessionId` ay null kapag walang sesyon ang grupo). Ito ang sumusuporta sa dialog na **Who Still Needs Attendance** ng B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Maghanap ng mga tala ng attendance gamit ang mga filter (campus, serbisyo, oras ng serbisyo, grupo, saklaw ng petsa) |

### Halimbawa: Trend ng Attendance

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

## Mga Sesyon

Base path: `/attendance/sessions`

Nag-e-extend ng GenericCrudController na may mga CRUD route na `getById` at `delete`. Ang mga endpoint na `getAll` at `save` ay mga custom na implementasyon na nagpapahintulot din sa mga lider ng grupo na pamahalaan ang mga sesyon ng kanilang mga grupo.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Ilista ang lahat ng sesyon. I-filter gamit ang `?groupId=` (kasama ang mga pangalan). Makikita ng mga lider ng grupo ang mga sesyon ng sarili nilang mga grupo |
| GET | `/:id` | JWT | Attendance.View | Kunin ang isang sesyon ayon sa ID |
| POST | `/` | JWT | Attendance.Edit o Group Leader | Gumawa o mag-update ng mga sesyon. Maaaring i-save ng mga lider ng grupo ang mga sesyon ng sarili nilang mga grupo |
| DELETE | `/:id` | JWT | Attendance.Edit | Magtanggal ng sesyon |

## Mga Visit

Base path: `/attendance/visits`

Pinamamahalaan ang mga indibidwal na tala ng visit (isang taong dumalo sa isang partikular na petsa) at nagbibigay ng workflow ng check-in.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Ilista ang lahat ng visit. I-filter gamit ang `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Kunin ang isang visit ayon sa ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | Kunin ang data ng check-in para sa mga tao sa isang serbisyo. Ibinabalik ang mga visit kasama ang mga visit session mula sa huling naka-log na petsa |
| POST | `/` | JWT | Attendance.Edit | Gumawa o mag-update ng mga visit |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Isumite ang data ng check-in. Gumagawa/nag-a-update ng mga visit at visit session, at nag-aalis ng mga lumang tala |
| DELETE | `/:id` | JWT | Attendance.Edit | Magtanggal ng visit |

### Halimbawa: Daloy ng Check-in

**Hakbang 1 -- Kunin ang kasalukuyang data ng check-in:**

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

## Mga Visit Session

Base path: `/attendance/visitsessions`

Pinamamahalaan ang ugnayan ng mga visit at mga sesyon (kung aling partikular na sesyon ang dinaluhan ng isang tao sa isang visit). Nagbibigay din ng endpoint para sa mabilisang pag-log at endpoint para sa pag-download/pag-export.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Ilista ang mga visit session. I-filter gamit ang `?sessionId=`. Makikita ng mga lider ng grupo ang mga visit session ng sarili nilang mga grupo |
| GET | `/:id` | JWT | Attendance.View | Kunin ang isang visit session ayon sa ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | I-download ang attendance ng isang sesyon (ibinabalik ang mga pangalan ng tao kasama ang katayuang present/absent) |
| POST | `/` | JWT | Attendance.Edit | Gumawa o mag-update ng mga visit session |
| POST | `/log` | JWT | Attendance.Edit o Group Leader | Mabilisang i-log ang attendance ng isang tao sa isang sesyon. Awtomatikong gumagawa ng visit kung kailangan. Maaaring i-log ng mga lider ng grupo ang attendance ng sarili nilang mga grupo |
| DELETE | `/:id` | JWT | Attendance.Edit | Magtanggal ng visit session ayon sa ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o Group Leader | Alisin ang isang tao sa isang sesyon. Tinatanggal ang visit session at ang parent na visit kung wala nang natitirang sesyon. Maaaring alisin ng mga lider ng grupo ang attendance ng sarili nilang mga grupo |

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

### Halimbawa: I-download ang Attendance ng Sesyon

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

## Mga Streak

Base path: `/attendance/streaks`

Sinusubaybayan ang mga streak ng attendance ng mga indibidwal -- ang magkakasunod na linggong dumalo ang isang tao. Kapaki-pakinabang para sa mga sukatan ng pakikilahok at gamification.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Kunin ang mga streak ng attendance ng isang tao |

## Mga Kaugnay na Pahina

- [Mga Endpoint ng Membership](./membership) — Mga tao, grupo, role, at pamamahala ng simbahan
- [Authentication at Mga Permission](./authentication) — Daloy ng login, JWT, modelo ng permission
- [Istruktura ng Module](../module-structure) — Mga pattern sa pag-aayos ng code
