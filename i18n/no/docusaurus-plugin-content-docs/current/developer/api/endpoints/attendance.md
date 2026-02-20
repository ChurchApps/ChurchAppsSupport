---
title: "Attendance-endepunkter"
---

# Attendance-endepunkter

<div class="article-intro">

Attendance-modulen administrerer campuslokasjoner, gudstjenester, gudstjenestetider, oppmøteøkter, besøk og besøksøkter. Den tilbyr infrastruktur for sporing av hvem som deltok på hvilken gudstjeneste eller gruppemøte, støtter innsjekkingsarbeidsflyter og tilbyr oppmøtetrend- og oppsummeringsrapportering.

</div>

**Basissti:** `/attendance`

## Campuser

Basissti: `/attendance/campuses`

Standard CRUD-kontroller (utvider GenericCrudController). Tilbyr `getById`, `getAll`, `post` og `delete`-ruter via CRUD-baseklassen.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle campuser for kirken |
| GET | `/:id` | JWT | — | Hent en campus etter ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater campuser |
| DELETE | `/:id` | JWT | Services.Edit | Slett en campus |

## Gudstjenester

Basissti: `/attendance/services`

Utvider GenericCrudController med CRUD-ruter `getById`, `getAll`, `post` og `delete`. `getAll` (`GET /`) og `search`-endepunktene er overstyrt med egendefinerte implementasjoner.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle gudstjenester (inkluderer campusinformasjon) |
| GET | `/:id` | JWT | — | Hent en gudstjeneste etter ID |
| GET | `/search?campusId=` | JWT | — | Søk gudstjenester etter campus-ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater gudstjenester |
| DELETE | `/:id` | JWT | Services.Edit | Slett en gudstjeneste |

### Eksempel: Søk gudstjenester etter campus

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

## Gudstjenestetider

Basissti: `/attendance/servicetimes`

Utvider GenericCrudController med CRUD-ruter `getById`, `post` og `delete`. `getAll`- og `search`-endepunktene er egendefinerte implementasjoner.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle gudstjenestetider. Filtrer med `?serviceId=`. Legg til `?include=groups` for å legge ved gruppedata |
| GET | `/:id` | JWT | — | Hent en gudstjenestetid etter ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Søk gudstjenestetider etter campus og gudstjeneste |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater gudstjenestetider |
| DELETE | `/:id` | JWT | Services.Edit | Slett en gudstjenestetid |

## Gruppe-gudstjenestetider

Basissti: `/attendance/groupservicetimes`

Kobler grupper til spesifikke gudstjenestetider.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle gruppe-gudstjenestetid-tilknytninger. Filtrer med `?groupId=` for å hente tilknytninger med gudstjenestenavn |
| GET | `/:id` | JWT | — | Hent en gruppe-gudstjenestetid-tilknytning etter ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater gruppe-gudstjenestetid-tilknytninger |
| DELETE | `/:id` | JWT | Services.Edit | Slett en gruppe-gudstjenestetid-tilknytning |

## Oppmøteregistreringer

Basissti: `/attendance/attendancerecords`

Tilbyr skrivebeskyttede aggregerte visninger av oppmøtedata for rapportering og visning.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Last oppmøteregistreringer for en person. Krever `?personId=` |
| GET | `/tree` | JWT | — | Last det fullstendige oppmøtetreet (campuser, gudstjenester, gudstjenestetider, grupper) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Last oppmøtetrenddata med valgfrie filtre |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Last gruppeoppmøte for en gudstjeneste på en gitt uke |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Søk oppmøteregistreringer med filtre (campus, gudstjeneste, gudstjenestetid, gruppe, datoperiode) |

### Eksempel: Oppmøtetrend

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

## Økter

Basissti: `/attendance/sessions`

Utvider GenericCrudController med CRUD-ruter `getById` og `delete`. `getAll`- og `save`-endepunktene er egendefinerte implementasjoner som også lar gruppeledere administrere økter for sine grupper.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View eller gruppeleder | List alle økter. Filtrer med `?groupId=` (inkluderer navn). Gruppeledere kan se økter for sine egne grupper |
| GET | `/:id` | JWT | Attendance.View | Hent en økt etter ID |
| POST | `/` | JWT | Attendance.Edit eller gruppeleder | Opprett eller oppdater økter. Gruppeledere kan lagre økter for sine egne grupper |
| DELETE | `/:id` | JWT | Attendance.Edit | Slett en økt |

## Besøk

Basissti: `/attendance/visits`

Administrerer individuelle besøksoppføringer (en person som deltar på en bestemt dato) og tilbyr innsjekkingsarbeidsflyten.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | List alle besøk. Filtrer med `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Hent et besøk etter ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View eller Attendance.Checkin | Last innsjekkingsdata for personer ved en gudstjeneste. Returnerer besøk med besøksøkter fra sist loggede dato |
| POST | `/` | JWT | Attendance.Edit | Opprett eller oppdater besøk |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit eller Attendance.Checkin | Send innsjekkingsdata. Oppretter/oppdaterer besøk og besøksøkter, fjerner utdaterte oppføringer |
| DELETE | `/:id` | JWT | Attendance.Edit | Slett et besøk |

### Eksempel: Innsjekkingsflyt

**Steg 1 -- Last eksisterende innsjekkingsdata:**

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

**Steg 2 -- Send innsjekking:**

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

## Besøksøkter

Basissti: `/attendance/visitsessions`

Administrerer tilknytningen mellom besøk og økter (hvilken spesifikk økt en person deltok på under et besøk). Tilbyr også et hurtigloggingsendepunkt og et nedlastings-/eksportendepunkt.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View eller gruppeleder | List besøksøkter. Filtrer med `?sessionId=`. Gruppeledere kan se besøksøkter for sine egne grupper |
| GET | `/:id` | JWT | Attendance.View | Hent en besøksøkt etter ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Last ned oppmøte for en økt (returnerer personnavn med tilstede-/fraværsstatus) |
| POST | `/` | JWT | Attendance.Edit | Opprett eller oppdater besøksøkter |
| POST | `/log` | JWT | Attendance.Edit eller gruppeleder | Hurtiglogg en persons oppmøte til en økt. Oppretter besøk automatisk ved behov. Gruppeledere kan logge oppmøte for sine egne grupper |
| DELETE | `/:id` | JWT | Attendance.Edit | Slett en besøksøkt etter ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit eller gruppeleder | Fjern en person fra en økt. Sletter besøksøkten og det overordnede besøket hvis ingen økter gjenstår. Gruppeledere kan fjerne oppmøte for sine egne grupper |

### Eksempel: Hurtiglogging av oppmøte

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

### Eksempel: Last ned øktoppmøte

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

## Relaterte sider

- [Membership-endepunkter](./membership) — Personer, grupper, roller og kirkeadministrasjon
- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, tillatelsesmodell
- [Modulstruktur](../module-structure) — Kodeorganiseringsmønstre
