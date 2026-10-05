---
title: "Endepunkter for oppmøte"
---

# Endepunkter for oppmøte

<div class="article-intro">

Oppmøtemodulen håndterer campuser, gudstjenester, gudstjenestetidspunkter, oppmøteøkter, besøk og besøksøkter. Den gir infrastrukturen for å holde oversikt over hvem som møtte opp på hvilken gudstjeneste eller gruppesamling, støtter arbeidsflyter for innsjekking og tilbyr rapportering av oppmøtetrender og sammendrag.

</div>

**Basissti:** `/attendance`

## Campuser

Basissti: `/attendance/campuses`

Standard CRUD-kontroller (utvider GenericCrudController). Tilbyr rutene `getById`, `getAll`, `post` og `delete` via CRUD-baseklassen.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle campuser for menigheten |
| GET | `/:id` | JWT | — | Hent en campus etter ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater campuser |
| DELETE | `/:id` | JWT | Services.Edit | Slett en campus |

## Gudstjenester

Basissti: `/attendance/services`

Utvider GenericCrudController med CRUD-rutene `getById`, `getAll`, `post` og `delete`. Endepunktene `getAll` (`GET /`) og `search` er overstyrt med egne implementasjoner.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle gudstjenester (inkluderer campusinformasjon) |
| GET | `/:id` | JWT | — | Hent en gudstjeneste etter ID |
| GET | `/search?campusId=` | JWT | — | Søk etter gudstjenester på campus-ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater gudstjenester |
| DELETE | `/:id` | JWT | Services.Edit | Slett en gudstjeneste |

### Eksempel: søk etter gudstjenester på campus

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

## Gudstjenestetidspunkter

Basissti: `/attendance/servicetimes`

Utvider GenericCrudController med CRUD-rutene `getById`, `post` og `delete`. Endepunktene `getAll` og `search` er egne implementasjoner.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle gudstjenestetidspunkter. Filtrer med `?serviceId=`. Legg til `?include=groups` for å føye til gruppedata |
| GET | `/:id` | JWT | — | Hent et gudstjenestetidspunkt etter ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Søk etter gudstjenestetidspunkter på campus og gudstjeneste |
| GET | `/public/:churchId` | Offentlig | — | Hent treet campus → gudstjeneste → tidspunkt for en menighet. Driver nettstedsbyggerens `serviceTimes`-element |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater gudstjenestetidspunkter |
| DELETE | `/:id` | JWT | Services.Edit | Slett et gudstjenestetidspunkt |

## Gruppetidspunkter for gudstjenester

Basissti: `/attendance/groupservicetimes`

Knytter grupper til bestemte gudstjenestetidspunkter.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle koblinger mellom gruppe og gudstjenestetidspunkt. Filtrer med `?groupId=` for å få koblinger med gudstjenestenavn |
| GET | `/:id` | JWT | — | Hent en kobling mellom gruppe og gudstjenestetidspunkt etter ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater koblinger mellom gruppe og gudstjenestetidspunkt |
| DELETE | `/:id` | JWT | Services.Edit | Slett en kobling mellom gruppe og gudstjenestetidspunkt |

## Oppmøteregistreringer

Basissti: `/attendance/attendancerecords`

Tilbyr skrivebeskyttede, aggregerte visninger av oppmøtedata til rapportering og visning.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Last inn oppmøteregistreringer for en person. Krever `?personId=` |
| GET | `/tree` | JWT | — | Last inn hele oppmøtetreet (campuser, gudstjenester, gudstjenestetidspunkter, grupper) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Last inn data om oppmøtetrend med valgfrie filtre |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Last inn gruppeoppmøte for en gudstjeneste i en gitt uke |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | For hver gruppe som er tilordnet gudstjenestetidspunktet, returneres `{ groupId, sessionId, attendanceCount }` for den datoen (`date` er `YYYY-MM-DD`; `sessionId` er null når gruppen ikke har noen økt). Brukes av dialogen **Hvem mangler fortsatt oppmøte** i B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Søk i oppmøteregistreringer med filtre (campus, gudstjeneste, gudstjenestetidspunkt, gruppe, datointervall) |

### Eksempel: oppmøtetrend

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

Utvider GenericCrudController med CRUD-rutene `getById` og `delete`. Endepunktene `getAll` og `save` er egne implementasjoner som også lar gruppeledere administrere økter for sine egne grupper.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View eller gruppeleder | List alle økter. Filtrer med `?groupId=` (inkluderer navn). Gruppeledere kan se økter for sine egne grupper |
| GET | `/:id` | JWT | Attendance.View | Hent en økt etter ID |
| POST | `/` | JWT | Attendance.Edit eller gruppeleder | Opprett eller oppdater økter. Gruppeledere kan lagre økter for sine egne grupper |
| DELETE | `/:id` | JWT | Attendance.Edit | Slett en økt |

## Besøk

Basissti: `/attendance/visits`

Håndterer enkeltstående besøksregistreringer (en person som møter opp på en bestemt dato) og tilbyr arbeidsflyten for innsjekking.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | List alle besøk. Filtrer med `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Hent et besøk etter ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View eller Attendance.Checkin | Last inn innsjekkingsdata for personer på en gudstjeneste. Returnerer besøk med besøksøkter fra siste registrerte dato |
| POST | `/` | JWT | Attendance.Edit | Opprett eller oppdater besøk |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit eller Attendance.Checkin | Send inn innsjekkingsdata. Oppretter/oppdaterer besøk og besøksøkter og fjerner utdaterte registreringer |
| DELETE | `/:id` | JWT | Attendance.Edit | Slett et besøk |

### Eksempel: innsjekkingsflyt

**Trinn 1 -- Last inn eksisterende innsjekkingsdata:**

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

**Trinn 2 -- Send inn innsjekking:**

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

Håndterer koblingen mellom besøk og økter (hvilken bestemt økt en person deltok på under et besøk). Tilbyr også et endepunkt for hurtigregistrering og et for nedlasting/eksport.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View eller gruppeleder | List besøksøkter. Filtrer med `?sessionId=`. Gruppeledere kan se besøksøkter for sine egne grupper |
| GET | `/:id` | JWT | Attendance.View | Hent en besøksøkt etter ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Last ned oppmøtet for en økt (returnerer personnavn med status til stede/fraværende) |
| POST | `/` | JWT | Attendance.Edit | Opprett eller oppdater besøksøkter |
| POST | `/log` | JWT | Attendance.Edit eller gruppeleder | Hurtigregistrer en persons oppmøte på en økt. Oppretter besøk automatisk ved behov. Gruppeledere kan registrere oppmøte for sine egne grupper |
| DELETE | `/:id` | JWT | Attendance.Edit | Slett en besøksøkt etter ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit eller gruppeleder | Fjern en person fra en økt. Sletter besøksøkten og det overordnede besøket hvis ingen økter gjenstår. Gruppeledere kan fjerne oppmøte for sine egne grupper |

### Eksempel: hurtigregistrering av oppmøte

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

### Eksempel: last ned oppmøte for en økt

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

## Rekker

Basissti: `/attendance/streaks`

Følger oppmøterekker for enkeltpersoner -- antall påfølgende uker en person har møtt opp. Nyttig for engasjementsmålinger og spillifisering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Last inn oppmøterekker for en person |

## Relaterte sider

- [Endepunkter for medlemskap](./membership) — Personer, grupper, roller og menighetsadministrasjon
- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, tillatelsesmodell
- [Modulstruktur](../module-structure) — Mønstre for kodeorganisering
