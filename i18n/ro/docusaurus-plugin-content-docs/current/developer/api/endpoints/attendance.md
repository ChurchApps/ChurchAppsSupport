---
title: "Endpoint-uri pentru prezențe"
description: "Referință pentru API-ul de prezență din B1 Admin și B1 Checkin: campusuri, slujbe, ore ale slujbelor, sesiuni, vizite, reguli de check-in și endpoint-uri de export."
---

# Endpoint-uri pentru prezențe

<div class="article-intro">

Modulul Attendance gestionează locațiile campusurilor, serviciile, orele de serviciu, sesiunile de prezență, vizitele și sesiunile de vizită. Oferă infrastructura pentru urmărirea cine a participat la ce serviciu sau la ce întâlnire de grup, susține fluxurile de check-in și oferă rapoarte privind tendințele și sumarele prezenței.

</div>

**Cale de bază:** `/attendance`

## Campusuri

Cale de bază: `/attendance/campuses`

Controller CRUD standard (extinde GenericCrudController). Oferă rutele `getById`, `getAll`, `post` și `delete` prin clasa de bază CRUD.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | — | Listează toate campusurile bisericii |
| GET | `/:id` | JWT | — | Obține un campus după ID |
| POST | `/` | JWT | Services.Edit | Creează sau actualizează campusuri |
| DELETE | `/:id` | JWT | Services.Edit | Șterge un campus |

## Servicii

Cale de bază: `/attendance/services`

Extinde GenericCrudController cu rutele CRUD `getById`, `getAll`, `post` și `delete`. Endpoint-urile `getAll` (`GET /`) și `search` sunt suprascrise cu implementări personalizate.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | — | Listează toate serviciile (include informații despre campus) |
| GET | `/:id` | JWT | — | Obține un serviciu după ID |
| GET | `/search?campusId=` | JWT | — | Caută servicii după ID-ul campusului |
| POST | `/` | JWT | Services.Edit | Creează sau actualizează servicii |
| DELETE | `/:id` | JWT | Services.Edit | Șterge un serviciu |

### Exemplu: Căutarea serviciilor după campus

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

## Orele serviciilor

Cale de bază: `/attendance/servicetimes`

Extinde GenericCrudController cu rutele CRUD `getById`, `post` și `delete`. Endpoint-urile `getAll` și `search` sunt implementări personalizate.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | — | Listează toate orele de serviciu. Filtrează cu `?serviceId=`. Adaugă `?include=groups` pentru a include datele grupurilor. Fiecare rând include un boolean calculat `checkinOpen` (false doar când ora de serviciu are un program de check-in a cărui fereastră este închisă chiar acum). Fereastra este măsurată în fusul orar al campusului serviciului, apoi în fusul orar al bisericii, apoi în fusul orar al primului campus care are unul, apoi `America/New_York` |
| GET | `/:id` | JWT | — | Obține o oră de serviciu după ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Caută ore de serviciu după campus și serviciu |
| GET | `/public/:churchId` | Public | — | Obține arborele campus → serviciu → oră pentru o biserică. Alimentează elementul `serviceTimes` al constructorului de site-uri |
| POST | `/` | JWT | Services.Edit | Creează sau actualizează ore de serviciu. Câmpuri opționale de program: `dayOfWeek` (0 = duminică … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (înainte de început), `checkinCloseMinutes` (după sfârșit). Check-in-ul este limitat în timp doar când sunt setate atât `dayOfWeek`, cât și `startTime` |
| DELETE | `/:id` | JWT | Services.Edit | Șterge o oră de serviciu |

## Orele serviciilor pentru grupuri

Cale de bază: `/attendance/groupservicetimes`

Asociază grupuri cu anumite ore de serviciu.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | — | Listează toate asocierile grup–oră de serviciu. Filtrează cu `?groupId=` pentru a obține asocierile cu numele serviciilor |
| GET | `/:id` | JWT | — | Obține o asociere grup–oră de serviciu după ID |
| POST | `/` | JWT | Services.Edit | Creează sau actualizează asocieri grup–oră de serviciu |
| DELETE | `/:id` | JWT | Services.Edit | Șterge o asociere grup–oră de serviciu |

## Înregistrările de prezență

Cale de bază: `/attendance/attendancerecords`

Oferă vizualizări agregate, doar în citire, ale datelor de prezență pentru rapoarte și afișare.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | Attendance.View | Încarcă înregistrările de prezență ale unei persoane. Necesită `?personId=` |
| GET | `/my` | JWT | — | Limitat la propriul utilizator: înregistrările de prezență ale membrului autentificat din ultimele 12 luni, de la cele mai recente. Returnează `401` dacă utilizatorul nu este asociat unei persoane. Alimentează secțiunea **Prezența mea** din pagina B1 Me |
| GET | `/tree` | JWT | — | Încarcă arborele complet de prezență (campusuri, servicii, ore de serviciu, grupuri) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Încarcă datele de tendință a prezenței, cu filtre opționale |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Încarcă prezența grupurilor pentru un serviciu într-o anumită săptămână |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Pentru fiecare grup alocat orei de serviciu, returnează `{ groupId, sessionId, attendanceCount }` pentru data respectivă (`date` este în formatul `YYYY-MM-DD`; `sessionId` este null când grupul nu are o sesiune). Alimentează dialogul **Cine mai are nevoie de prezență** din B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Caută înregistrări de prezență cu filtre (campus, serviciu, oră de serviciu, grup, interval de date) |

### Exemplu: Tendința prezenței

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

## Sesiuni

Cale de bază: `/attendance/sessions`

Extinde GenericCrudController cu rutele CRUD `getById` și `delete`. Endpoint-urile `getAll` și `save` sunt implementări personalizate, care permit și liderilor de grupuri să gestioneze sesiunile grupurilor lor.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | Attendance.View sau lider de grup | Listează toate sesiunile. Filtrează cu `?groupId=` (include nume). Liderii de grupuri pot vedea sesiunile grupurilor lor |
| GET | `/:id` | JWT | Attendance.View | Obține o sesiune după ID |
| POST | `/` | JWT | Attendance.Edit sau lider de grup | Creează sau actualizează sesiuni. Liderii de grupuri pot salva sesiuni pentru grupurile lor |
| DELETE | `/:id` | JWT | Attendance.Edit | Șterge o sesiune |

## Vizite

Cale de bază: `/attendance/visits`

Gestionează înregistrările individuale de vizită (o persoană prezentă într-o anumită dată) și oferă fluxul de check-in.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | Attendance.View | Listează toate vizitele. Filtrează cu `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obține o vizită după ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View sau Attendance.Checkin | Încarcă datele de check-in pentru persoanele dintr-un serviciu. Returnează vizitele cu sesiunile de vizită din ultima dată înregistrată |
| POST | `/` | JWT | Attendance.Edit | Creează sau actualizează vizite |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit sau Attendance.Checkin | Trimite datele de check-in. Creează/actualizează vizite și sesiuni de vizită, elimină înregistrările învechite |
| DELETE | `/:id` | JWT | Attendance.Edit | Șterge o vizită |

### Exemplu: Fluxul de check-in

**Pasul 1 -- Încarcă datele existente de check-in:**

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

**Pasul 2 -- Trimite check-in-ul:**

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

Dacă o oră de serviciu vizată are un program de check-in, iar fereastra acestuia este închisă (măsurată în aceeași ordine a fusurilor orare, cu prioritate pentru campus, ca la `checkinOpen`), nu se salvează nimic, iar răspunsul este `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Încălcările de capacitate și ale raportului voluntari–participanți returnează, de asemenea, 409 (`error: "capacity"` sau `"ratio"`). Sesiunile pe care o persoană le deține deja astăzi (retrimise la fiecare check-in) omit verificarea ferestrei, astfel încât o gospodărie poate adăuga o oră de serviciu deschisă după ce fereastra uneia anterioare s-a închis.

## Sesiuni de vizită

Cale de bază: `/attendance/visitsessions`

Gestionează asocierea dintre vizite și sesiuni (la ce sesiune specifică a participat o persoană în timpul unei vizite). Oferă, de asemenea, un endpoint de înregistrare rapidă și un endpoint de descărcare/export.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/` | JWT | Attendance.View sau lider de grup | Listează sesiunile de vizită. Filtrează cu `?sessionId=`. Liderii de grupuri pot vedea sesiunile de vizită ale grupurilor lor |
| GET | `/:id` | JWT | Attendance.View | Obține o sesiune de vizită după ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Descarcă prezența pentru o sesiune (returnează numele persoanelor cu starea prezent/absent) |
| POST | `/` | JWT | Attendance.Edit | Creează sau actualizează sesiuni de vizită |
| POST | `/log` | JWT | Attendance.Edit sau lider de grup | Înregistrare rapidă a prezenței unei persoane la o sesiune. Creează automat vizita, dacă este necesar. Liderii de grupuri pot înregistra prezența pentru grupurile lor |
| DELETE | `/:id` | JWT | Attendance.Edit | Șterge o sesiune de vizită după ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit sau lider de grup | Elimină o persoană dintr-o sesiune. Șterge sesiunea de vizită și vizita-părinte dacă nu mai rămân sesiuni. Liderii de grupuri pot elimina prezența pentru grupurile lor |

### Exemplu: Înregistrarea rapidă a prezenței

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

### Exemplu: Descărcarea prezenței la sesiune

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

## Serii de prezență

Cale de bază: `/attendance/streaks`

Urmărește seriile de prezență ale persoanelor -- numărul de săptămâni consecutive în care o persoană a participat. Util pentru metricile de implicare și gamificare.

| Metodă | Cale | Autentificare | Permisiune | Descriere |
|--------|------|---------------|------------|-----------|
| GET | `/person/:personId` | JWT | — | Încarcă seriile de prezență ale unei persoane |

## Pagini conexe

- [Endpoint-uri pentru membri](./membership.md) — Persoane, grupuri, roluri și administrarea bisericii
- [Autentificare și permisiuni](./authentication.md) — Fluxul de autentificare, JWT, modelul de permisiuni
- [Structura modulelor](../module-structure.md) — Modele de organizare a codului
