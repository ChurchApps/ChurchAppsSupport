---
title: "Ema-Endpoint E-Attendance"
---

# Ema-Endpoint E-Attendance

<div class="article-intro">

I-module ye-Attendance iphatsa tindzawo tema-campus, ema-service, emasikhatsi ema-service, ticgawu tekubakhona, kuvakasha, kanye neticgawu tekuvakasha. Iniketa lulwandle lwekulandzelela kutsi ngubani lowaya ku-service nobe umhlangano welicembu lelitsite, isekela tinchubo tekungena, futsi iniketa kubika kwesifanekiso nesifingqo sekubakhona.

</div>

**Umkhondvo Losisekelo:** `/attendance`

## Ema-Campus

Umkhondvo losisekelo: `/attendance/campuses`

Layela lwe-CRUD levamile (yandzisa i-GenericCrudController). Iniketa imikhondvo ye-`getById`, `getAll`, `post`, kanye ne-`delete` nge-CRUD base class.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala onkhe ema-campus elibandla |
| GET | `/:id` | JWT | — | Tfola campus nge-ID |
| POST | `/` | JWT | Services.Edit | Akha nobe buyeketa ema-campus |
| DELETE | `/:id` | JWT | Services.Edit | Sula campus |

## Ema-Service

Umkhondvo losisekelo: `/attendance/services`

Yandzisa i-GenericCrudController ngemikhondvo ye-CRUD `getById`, `getAll`, `post`, kanye ne-`delete`. I-`getAll` (`GET /`) kanye ne-`search` tigudlwe nge-implementation lekhetsekile.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala onkhe ema-service (kufaka imininingwane ye-campus) |
| GET | `/:id` | JWT | — | Tfola service nge-ID |
| GET | `/search?campusId=` | JWT | — | Fumana ema-service nge-campus ID |
| POST | `/` | JWT | Services.Edit | Akha nobe buyeketa ema-service |
| DELETE | `/:id` | JWT | Services.Edit | Sula service |

### Sibonelo: Fumana Ema-Service Nge-Campus

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

## Emasikhatsi Ema-Service

Umkhondvo losisekelo: `/attendance/servicetimes`

Yandzisa i-GenericCrudController ngemikhondvo ye-CRUD `getById`, `post`, kanye ne-`delete`. I-`getAll` kanye ne-`search` yi-implementation lekhetsekile.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala onkhe emasikhatsi ema-service. Cenga nge-`?serviceId=`. Engeta `?include=groups` kufaka idatha yemacembu |
| GET | `/:id` | JWT | — | Tfola sikhatsi se-service nge-ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Fumana emasikhatsi ema-service nge-campus kanye ne-service |
| GET | `/public/:churchId` | Ngeyeveleni | — | Tfola i-tree ye-campus → service → sikhatsi yelibandla. Isebentisa element ye-`serviceTimes` ye-website builder |
| POST | `/` | JWT | Services.Edit | Akha nobe buyeketa emasikhatsi ema-service |
| DELETE | `/:id` | JWT | Services.Edit | Sula sikhatsi se-service |

## Emasikhatsi Ema-Service Emacembu

Umkhondvo losisekelo: `/attendance/groupservicetimes`

Ixhumanisa emacembu nemasikhatsi lakhetsekile ema-service.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala tonkhe kuhlanganiswa kwe-licembu-sikhatsi-se-service. Cenga nge-`?groupId=` kutfola kuhlanganiswa nemagama ema-service |
| GET | `/:id` | JWT | — | Tfola kuhlanganiswa kwelicembu-sikhatsi-se-service nge-ID |
| POST | `/` | JWT | Services.Edit | Akha nobe buyeketa kuhlanganiswa kwelicembu-sikhatsi-se-service |
| DELETE | `/:id` | JWT | Services.Edit | Sula kuhlanganiswa kwelicembu-sikhatsi-se-service |

## Imibhalo Yekubakhona

Umkhondvo losisekelo: `/attendance/attendancerecords`

Iniketa kubukwa kwelilonkhe kwekufundza kuphela kwedatha yekubakhona kwekubika nekukhomba.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Layisha imibhalo yekubakhona yemuntfu. Idzinga `?personId=` |
| GET | `/tree` | JWT | — | Layisha i-tree lephelele yekubakhona (ema-campus, ema-service, emasikhatsi ema-service, emacembu) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Layisha idatha ye-trend yekubakhona ngekucenga lokungakhetsi |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Layisha kubakhona kwemacembu ku-service ngeliviki lelikhetsekile |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Fumana imibhalo yekubakhona ngekucenga (campus, service, sikhatsi se-service, licembu, sikhala selanga) |

### Sibonelo: Trend Yekubakhona

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

## Ticgawu

Umkhondvo losisekelo: `/attendance/sessions`

Yandzisa i-GenericCrudController ngemikhondvo ye-CRUD `getById` kanye ne-`delete`. I-`getAll` kanye ne-`save` yi-implementation lekhetsekile leyavumela nebaholi bemacembu kuphatsa ticgawu temacembu abo.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View nobe Umholi Welicembu | Bala tonkhe ticgawu. Cenga nge-`?groupId=` (kufaka emagama). Baholi bemacembu bangabuka ticgawu temacembu abo |
| GET | `/:id` | JWT | Attendance.View | Tfola sigcawu nge-ID |
| POST | `/` | JWT | Attendance.Edit nobe Umholi Welicembu | Akha nobe buyeketa ticgawu. Baholi bemacembu bangagcina ticgawu temacembu abo |
| DELETE | `/:id` | JWT | Attendance.Edit | Sula sigcawu |

## Kuvakasha

Umkhondvo losisekelo: `/attendance/visits`

Iphatsa imibhalo yekuvakasha yakamunye (umuntfu loya ngelilanga lelitsite) futsi iniketa inchubo yekungena.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Bala konkhe kuvakasha. Cenga nge-`?personId=` |
| GET | `/:id` | JWT | Attendance.View | Tfola kuvakasha nge-ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View nobe Attendance.Checkin | Layisha idatha yekungena yebantfu ku-service. Ibuyisela kuvakasha neticgawu tekuvakasha kusuka kulilanga lekugcina lokubhaliwe |
| POST | `/` | JWT | Attendance.Edit | Akha nobe buyeketa kuvakasha |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit nobe Attendance.Checkin | Fakela idatha yekungena. Yakha/ibuyeketa kuvakasha neticgawu tekuvakasha, isule imibhalo lengasasebenti |
| DELETE | `/:id` | JWT | Attendance.Edit | Sula kuvakasha |

### Sibonelo: Inchubo Yekungena

**Sinyatselo 1 -- Layisha idatha yekungena lesele ikhona:**

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

**Sinyatselo 2 -- Fakela kungena:**

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

## Ticgawu Tekuvakasha

Umkhondvo losisekelo: `/attendance/visitsessions`

Iphatsa kuhlanganiswa emkhatsini wekuvakasha neticgawu (kutsi ngusiphi sigcawu lomuntfu ahambele ngesikhatsi sekuvakasha). Iniketa futsi umkhondvo wekubhala ngekushesha kanye ne-endpoint yekulayisha/kukhipha.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View nobe Umholi Welicembu | Bala ticgawu tekuvakasha. Cenga nge-`?sessionId=`. Baholi bemacembu bangabuka ticgawu tekuvakasha temacembu abo |
| GET | `/:id` | JWT | Attendance.View | Tfola sigcawu sekuvakasha nge-ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Layisha kubakhona kwesigcawu (ibuyisela emagama abantfu nesimo sekhona/kungekho) |
| POST | `/` | JWT | Attendance.Edit | Akha nobe buyeketa ticgawu tekuvakasha |
| POST | `/log` | JWT | Attendance.Edit nobe Umholi Welicembu | Bhala ngekushesha kubakhona kwemuntfu esigcawini. Izenzakalelisa kwakha kuvakasha nangabe kudzingekile. Baholi bemacembu bangabhala kubakhona kwemacembu abo |
| DELETE | `/:id` | JWT | Attendance.Edit | Sula sigcawu sekuvakasha nge-ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit nobe Umholi Welicembu | Susa umuntfu esigcawini. Isula sigcawu sekuvakasha kanye nekuvakasha komzali nangabe kute ticgawu letisele. Baholi bemacembu bangasusa kubakhona kwemacembu abo |

### Sibonelo: Bhala Ngekushesha Kubakhona

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

### Sibonelo: Khipha Kubakhona Kwesigcawu

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

## Kulandzelana (Streaks)

Umkhondvo losisekelo: `/attendance/streaks`

Ilandzelela kulandzelana kwekubakhona kwemuntfu ngamunye -- emaviki lalandzelanako lomuntfu abekhona. Kusita ekubaleni kubambeka nekudlala.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Layisha kulandzelana kwekubakhona kwemuntfu |

## Emakhasi Lahlobene

- [Membership Endpoints](./membership) — Bantfu, emacembu, ema-role, kanye nekuphatsa libandla
- [Authentication & Permissions](./authentication) — Inchubo yekungena, JWT, sifanekiso semvumo
- [Module Structure](../module-structure) — Sifanekiso sekuhlelwa kwekhodi
