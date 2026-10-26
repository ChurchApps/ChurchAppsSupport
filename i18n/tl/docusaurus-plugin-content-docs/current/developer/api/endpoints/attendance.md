---
title: "Mga Endpoint ng Attendance"
---

# Mga Endpoint ng Attendance

<div class="article-intro">

Pinamamahalaan ng Attendance module ang mga lokasyon ng campus, mga serbisyo, oras ng serbisyo, mga sesyon ng attendance, mga visit, at mga visit session. Nagbibigay ito ng imprastraktura para subaybayan kung sino ang dumalo sa aling serbisyo o pulong ng grupo, sumusuporta sa mga daloy ng check-in, at nag-aalok ng pag-uulat ng trend at buod ng attendance.

</div>

**Base path:** `/attendance`

## Mga Campus

Base path: `/attendance/campuses`

Karaniwang CRUD controller (nagmamana mula sa GenericCrudController). Nagbibigay ng `getById`, `getAll`, `post`, at `delete` na mga route sa pamamagitan ng CRUD base class.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng campus ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang campus ayon sa ID |
| POST | `/` | JWT | Services.Edit | Gumawa o mag-update ng mga campus |
| DELETE | `/:id` | JWT | Services.Edit | Burahin ang isang campus |

## Mga Serbisyo

Base path: `/attendance/services`

Nagmamana mula sa GenericCrudController na may mga CRUD route na `getById`, `getAll`, `post`, at `delete`. Ang `getAll` (`GET /`) at ang `search` na endpoint ay may sariling custom na implementasyon.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng serbisyo (kasama ang impormasyon ng campus) |
| GET | `/:id` | JWT | — | Kunin ang isang serbisyo ayon sa ID |
| GET | `/search?campusId=` | JWT | — | Hanapin ang mga serbisyo ayon sa campus ID |
| POST | `/` | JWT | Services.Edit | Gumawa o mag-update ng mga serbisyo |
| DELETE | `/:id` | JWT | Services.Edit | Burahin ang isang serbisyo |

### Halimbawa: Maghanap ng Serbisyo Ayon sa Campus

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

Nagmamana mula sa GenericCrudController na may mga CRUD route na `getById`, `post`, at `delete`. Ang `getAll` at `search` na mga endpoint ay custom na implementasyon.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng oras ng serbisyo. I-filter gamit ang `?serviceId=`. Idagdag ang `?include=groups` para isama ang datos ng grupo. Ang bawat row ay may computed na `checkinOpen` na boolean (false lamang kapag ang oras ng serbisyo ay may check-in schedule at sarado ang window nito sa mismong oras na ito). Sinusukat ang window sa time zone ng campus ng serbisyo, pagkatapos ang time zone ng simbahan, pagkatapos ang unang campus na may time zone, at panghuli ang `America/New_York` |
| GET | `/:id` | JWT | — | Kunin ang isang oras ng serbisyo ayon sa ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Hanapin ang mga oras ng serbisyo ayon sa campus at serbisyo |
| GET | `/public/:churchId` | Public | — | Kunin ang puno ng campus → serbisyo → oras para sa isang simbahan. Ito ang nagpapagana sa `serviceTimes` element ng website builder |
| POST | `/` | JWT | Services.Edit | Gumawa o mag-update ng mga oras ng serbisyo. Opsyonal na mga field ng iskedyul: `dayOfWeek` (0 = Linggo … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (bago magsimula), `checkinCloseMinutes` (pagkatapos magtapos). Limitado lamang sa oras ang check-in kapag parehong nakatakda ang `dayOfWeek` at `startTime` |
| DELETE | `/:id` | JWT | Services.Edit | Burahin ang isang oras ng serbisyo |

## Mga Group Service Time

Base path: `/attendance/groupservicetimes`

Nag-uugnay ng mga grupo sa mga partikular na oras ng serbisyo.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng ugnayan ng grupo at oras ng serbisyo. I-filter gamit ang `?groupId=` para makuha ang mga ugnayan kasama ang mga pangalan ng serbisyo |
| GET | `/:id` | JWT | — | Kunin ang isang ugnayan ng grupo at oras ng serbisyo ayon sa ID |
| POST | `/` | JWT | Services.Edit | Gumawa o mag-update ng mga ugnayan ng grupo at oras ng serbisyo |
| DELETE | `/:id` | JWT | Services.Edit | Burahin ang isang ugnayan ng grupo at oras ng serbisyo |

## Mga Attendance Record

Base path: `/attendance/attendancerecords`

Nagbibigay ng read-only na pinagsamang tanaw ng datos ng attendance para sa pag-uulat at pagpapakita.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Iload ang mga attendance record ng isang tao. Kinakailangan ang `?personId=` |
| GET | `/my` | JWT | — | Self-scoped: ang sariling attendance record ng naka-sign in na miyembro sa nakalipas na 12 buwan, pinakabago muna. Nagbabalik ng `401` kung hindi naka-link ang user sa isang tao. Sinusuportahan ang seksyong **My Attendance** ng B1 Me page |
| GET | `/tree` | JWT | — | Iload ang buong attendance tree (mga campus, serbisyo, oras ng serbisyo, grupo) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Iload ang datos ng trend ng attendance na may opsyonal na mga filter |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Iload ang attendance ng grupo para sa isang serbisyo sa isang partikular na linggo |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Para sa bawat grupong nakatalaga sa oras ng serbisyo, ibalik ang `{ groupId, sessionId, attendanceCount }` para sa petsang iyon (ang `date` ay `YYYY-MM-DD`; null ang `sessionId` kapag walang sesyon ang grupo). Sinusuportahan ang dialog na **Who Still Needs Attendance** ng B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Hanapin ang mga attendance record gamit ang mga filter (campus, serbisyo, oras ng serbisyo, grupo, saklaw ng petsa) |

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

Nagmamana mula sa GenericCrudController na may mga CRUD route na `getById` at `delete`. Ang `getAll` at `save` na mga endpoint ay custom na implementasyon na nagpapahintulot din sa mga group leader na pamahalaan ang mga sesyon ng kanilang mga grupo.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Ilista ang lahat ng sesyon. I-filter gamit ang `?groupId=` (kasama ang mga pangalan). Maaaring tingnan ng mga group leader ang mga sesyon ng sarili nilang mga grupo |
| GET | `/:id` | JWT | Attendance.View | Kunin ang isang sesyon ayon sa ID |
| POST | `/` | JWT | Attendance.Edit o Group Leader | Gumawa o mag-update ng mga sesyon. Maaaring mag-save ng mga sesyon ang mga group leader para sa sarili nilang mga grupo |
| DELETE | `/:id` | JWT | Attendance.Edit | Burahin ang isang sesyon |

## Mga Visit

Base path: `/attendance/visits`

Pinamamahalaan ang mga indibidwal na visit record (isang taong dumalo sa partikular na petsa) at nagbibigay ng daloy ng check-in.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Ilista ang lahat ng visit. I-filter gamit ang `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Kunin ang isang visit ayon sa ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | Iload ang datos ng check-in para sa mga tao sa isang serbisyo. Nagbabalik ng mga visit kasama ang mga visit session mula sa huling naitalang petsa |
| POST | `/` | JWT | Attendance.Edit | Gumawa o mag-update ng mga visit |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Isumite ang datos ng check-in. Gumagawa/nag-a-update ng mga visit at visit session, at nag-aalis ng mga lumang record |
| DELETE | `/:id` | JWT | Attendance.Edit | Burahin ang isang visit |

### Halimbawa: Daloy ng Check-in

**Hakbang 1 -- Iload ang kasalukuyang datos ng check-in:**

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

Kung ang tinutukoy na oras ng serbisyo ay may check-in schedule at sarado ang window nito (sinusukat gamit ang parehong pagkakasunod-sunod ng time zone na campus-muna gaya ng `checkinOpen`), walang nise-save at ang tugon ay `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Nagbabalik din ng 409 ang mga paglabag sa kapasidad at sa ratio ng boluntaryo (`error: "capacity"` o `"ratio"`). Ang mga sesyon na hawak na ng isang tao ngayong araw (muling ipinapadala sa bawat check-in) ay nilalaktawan ang pagsusuri ng window, kaya maaaring magdagdag ang isang sambahayan ng bukas na oras ng serbisyo kahit sarado na ang window ng naunang oras.

## Mga Visit Session

Base path: `/attendance/visitsessions`

Pinamamahalaan ang ugnayan ng mga visit at sesyon (aling partikular na sesyon ang dinaluhan ng isang tao sa isang visit). Nagbibigay din ng mabilisang endpoint sa pag-log at endpoint sa pag-download/pag-export.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Group Leader | Ilista ang mga visit session. I-filter gamit ang `?sessionId=`. Maaaring tingnan ng mga group leader ang mga visit session ng sarili nilang mga grupo |
| GET | `/:id` | JWT | Attendance.View | Kunin ang isang visit session ayon sa ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | I-download ang attendance para sa isang sesyon (nagbabalik ng mga pangalan ng tao kasama ang status na present/absent) |
| POST | `/` | JWT | Attendance.Edit | Gumawa o mag-update ng mga visit session |
| POST | `/log` | JWT | Attendance.Edit o Group Leader | Mabilisang i-log ang attendance ng isang tao sa isang sesyon. Awtomatikong gumagawa ng visit kung kinakailangan. Maaaring mag-log ng attendance ang mga group leader para sa sarili nilang mga grupo |
| DELETE | `/:id` | JWT | Attendance.Edit | Burahin ang isang visit session ayon sa ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o Group Leader | Alisin ang isang tao sa isang sesyon. Binubura ang visit session at ang magulang na visit kung wala nang natitirang sesyon. Maaaring mag-alis ng attendance ang mga group leader para sa sarili nilang mga grupo |

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

### Halimbawa: Mag-download ng Attendance ng Sesyon

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

Sinusubaybayan ang mga streak ng attendance ng mga indibidwal -- magkakasunod na linggong dumalo ang isang tao. Kapaki-pakinabang para sa mga sukatan ng pakikilahok at gamification.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Iload ang mga streak ng attendance ng isang tao |

## Mga Kaugnay na Pahina

- [Membership Endpoints](./membership) — Mga tao, grupo, tungkulin, at pamamahala ng simbahan
- [Authentication & Permissions](./authentication) — Daloy ng pag-login, JWT, modelo ng pahintulot
- [Module Structure](../module-structure) — Mga pattern ng organisasyon ng code
