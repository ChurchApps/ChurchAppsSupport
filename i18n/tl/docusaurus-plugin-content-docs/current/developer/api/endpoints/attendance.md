---
title: "Mga Endpoint ng Attendance"
---

# Mga Endpoint ng Attendance

<div class="article-intro">

Pinapamahalaan ng Attendance module ang mga lokasyon ng campus, serbisyo, oras ng serbisyo, mga sesyon ng attendance, pagbisita, at mga sesyon ng pagbisita. Nagbibigay ito ng imprastraktura para sa pagsubaybay kung sino ang dumalo sa aling serbisyo o pulong ng grupo, sumusuporta sa mga daloy ng trabaho sa check-in, at nag-aalok ng ulat ng trend at buod ng attendance.

</div>

**Base path:** `/attendance`

## Mga Campus

Base path: `/attendance/campuses`

Karaniwang CRUD controller (nag-eextend ng GenericCrudController). Nagbibigay ng mga ruta na `getById`, `getAll`, `post`, at `delete` sa pamamagitan ng CRUD base class.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng campus para sa simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang campus ayon sa ID |
| POST | `/` | JWT | Services.Edit | Lumikha o mag-update ng mga campus |
| DELETE | `/:id` | JWT | Services.Edit | Burahin ang isang campus |

## Mga Serbisyo

Base path: `/attendance/services`

Nag-eextend ng GenericCrudController na may mga CRUD ruta na `getById`, `getAll`, `post`, at `delete`. Ang `getAll` (`GET /`) at `search` na mga endpoint ay na-override ng custom na implementasyon.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng serbisyo (kasama ang impormasyon ng campus) |
| GET | `/:id` | JWT | — | Kunin ang isang serbisyo ayon sa ID |
| GET | `/search?campusId=` | JWT | — | Maghanap ng mga serbisyo ayon sa campus ID |
| POST | `/` | JWT | Services.Edit | Lumikha o mag-update ng mga serbisyo |
| DELETE | `/:id` | JWT | Services.Edit | Burahin ang isang serbisyo |

### Halimbawa: Paghahanap ng Mga Serbisyo ayon sa Campus

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

Nag-eextend ng GenericCrudController na may mga CRUD ruta na `getById`, `post`, at `delete`. Ang `getAll` at `search` na mga endpoint ay custom na implementasyon.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng oras ng serbisyo. I-filter ayon sa `?serviceId=`. Magdagdag ng `?include=groups` para isama ang data ng grupo |
| GET | `/:id` | JWT | — | Kunin ang isang oras ng serbisyo ayon sa ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Maghanap ng mga oras ng serbisyo ayon sa campus at serbisyo |
| POST | `/` | JWT | Services.Edit | Lumikha o mag-update ng mga oras ng serbisyo |
| DELETE | `/:id` | JWT | Services.Edit | Burahin ang isang oras ng serbisyo |

## Mga Oras ng Serbisyo ng Grupo

Base path: `/attendance/groupservicetimes`

Nag-uugnay ng mga grupo sa mga partikular na oras ng serbisyo.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng ugnayan ng grupo-oras ng serbisyo. I-filter ayon sa `?groupId=` para makuha ang mga ugnayan na may pangalan ng serbisyo |
| GET | `/:id` | JWT | — | Kunin ang isang ugnayan ng grupo-oras ng serbisyo ayon sa ID |
| POST | `/` | JWT | Services.Edit | Lumikha o mag-update ng mga ugnayan ng grupo-oras ng serbisyo |
| DELETE | `/:id` | JWT | Services.Edit | Burahin ang isang ugnayan ng grupo-oras ng serbisyo |

## Mga Talaan ng Attendance

Base path: `/attendance/attendancerecords`

Nagbibigay ng read-only na pinagsama-samang view ng data ng attendance para sa pag-uulat at pagpapakita.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | I-load ang mga talaan ng attendance para sa isang tao. Kailangan ng `?personId=` |
| GET | `/tree` | JWT | — | I-load ang buong puno ng attendance (mga campus, serbisyo, oras ng serbisyo, grupo) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | I-load ang data ng trend ng attendance na may opsyonal na mga filter |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | I-load ang attendance ng grupo para sa isang serbisyo sa isang partikular na linggo |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Maghanap ng mga talaan ng attendance na may mga filter (campus, serbisyo, oras ng serbisyo, grupo, saklaw ng petsa) |

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

Nag-eextend ng GenericCrudController na may mga CRUD ruta na `getById` at `delete`. Ang `getAll` at `save` na mga endpoint ay custom na implementasyon na nagpapahintulot din sa mga lider ng grupo na pamahalaan ang mga sesyon para sa kanilang mga grupo.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Lider ng Grupo | Ilista ang lahat ng sesyon. I-filter ayon sa `?groupId=` (kasama ang mga pangalan). Maaaring tingnan ng mga lider ng grupo ang mga sesyon para sa kanilang sariling mga grupo |
| GET | `/:id` | JWT | Attendance.View | Kunin ang isang sesyon ayon sa ID |
| POST | `/` | JWT | Attendance.Edit o Lider ng Grupo | Lumikha o mag-update ng mga sesyon. Maaaring i-save ng mga lider ng grupo ang mga sesyon para sa kanilang sariling mga grupo |
| DELETE | `/:id` | JWT | Attendance.Edit | Burahin ang isang sesyon |

## Mga Pagbisita

Base path: `/attendance/visits`

Pinapamahalaan ang mga indibidwal na talaan ng pagbisita (isang tao na dumalo sa isang partikular na petsa) at nagbibigay ng daloy ng trabaho sa check-in.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Ilista ang lahat ng pagbisita. I-filter ayon sa `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Kunin ang isang pagbisita ayon sa ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View o Attendance.Checkin | I-load ang data ng check-in para sa mga tao sa isang serbisyo. Nagbabalik ng mga pagbisita na may mga sesyon ng pagbisita mula sa huling naitala na petsa |
| POST | `/` | JWT | Attendance.Edit | Lumikha o mag-update ng mga pagbisita |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit o Attendance.Checkin | Magsumite ng data ng check-in. Lumilikha/nag-a-update ng mga pagbisita at sesyon ng pagbisita, nag-aalis ng mga lumang talaan |
| DELETE | `/:id` | JWT | Attendance.Edit | Burahin ang isang pagbisita |

### Halimbawa: Daloy ng Check-in

**Hakbang 1 -- I-load ang kasalukuyang data ng check-in:**

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

## Mga Sesyon ng Pagbisita

Base path: `/attendance/visitsessions`

Pinapamahalaan ang ugnayan sa pagitan ng mga pagbisita at sesyon (kung aling partikular na sesyon ang dinaluhan ng isang tao sa isang pagbisita). Nagbibigay din ng mabilis na log endpoint at download/export endpoint.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View o Lider ng Grupo | Ilista ang mga sesyon ng pagbisita. I-filter ayon sa `?sessionId=`. Maaaring tingnan ng mga lider ng grupo ang mga sesyon ng pagbisita para sa kanilang sariling mga grupo |
| GET | `/:id` | JWT | Attendance.View | Kunin ang isang sesyon ng pagbisita ayon sa ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | I-download ang attendance para sa isang sesyon (nagbabalik ng mga pangalan ng tao na may katayuang naroroon/wala) |
| POST | `/` | JWT | Attendance.Edit | Lumikha o mag-update ng mga sesyon ng pagbisita |
| POST | `/log` | JWT | Attendance.Edit o Lider ng Grupo | Mabilis na mag-log ng attendance ng isang tao sa isang sesyon. Awtomatikong lumilikha ng pagbisita kung kinakailangan. Maaaring mag-log ang mga lider ng grupo ng attendance para sa kanilang sariling mga grupo |
| DELETE | `/:id` | JWT | Attendance.Edit | Burahin ang isang sesyon ng pagbisita ayon sa ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit o Lider ng Grupo | Alisin ang isang tao mula sa isang sesyon. Binubura ang sesyon ng pagbisita at ang parent na pagbisita kung walang natitirang sesyon. Maaaring alisin ng mga lider ng grupo ang attendance para sa kanilang sariling mga grupo |

### Halimbawa: Mabilis na Pag-log ng Attendance

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

## Mga Kaugnay na Pahina

- [Mga Endpoint ng Membership](./membership) — Mga tao, grupo, tungkulin, at pamamahala ng simbahan
- [Authentication at Mga Pahintulot](./authentication) — Daloy ng pag-login, JWT, modelo ng pahintulot
- [Istraktura ng Module](../module-structure) — Mga pattern ng organisasyon ng code
