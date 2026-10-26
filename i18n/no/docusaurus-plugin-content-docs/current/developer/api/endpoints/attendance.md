---
title: "Oppmøte-endepunkter"
---

# Oppmøte-endepunkter

<div class="article-intro">

Oppmøte-modulen administrerer campuser, tjenester, tjenestetider, oppmøteøkter, besøk og besøksøkter. Den gir infrastrukturen for å spore hvem som deltok på hvilken tjeneste eller gruppemøte, støtter innsjekkingsarbeidsflyter og tilbyr rapportering av oppmøtetrender og oppsummeringer.

</div>

**Basissti:** `/attendance`

## Campuser

Basissti: `/attendance/campuses`

Standard CRUD-kontroller (utvider GenericCrudController). Tilbyr `getById`, `getAll`, `post` og `delete`-ruter via CRUD-basisklassen.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle campuser for kirken |
| GET | `/:id` | JWT | — | Hent en campus etter ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater campuser |
| DELETE | `/:id` | JWT | Services.Edit | Slett en campus |

## Tjenester

Basissti: `/attendance/services`

Utvider GenericCrudController med CRUD-ruter `getById`, `getAll`, `post` og `delete`. Endepunktene `getAll` (`GET /`) og `search` er overstyrt med egne implementasjoner.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle tjenester (inkluderer campusinformasjon) |
| GET | `/:id` | JWT | — | Hent en tjeneste etter ID |
| GET | `/search?campusId=` | JWT | — | Søk etter tjenester etter campus-ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater tjenester |
| DELETE | `/:id` | JWT | Services.Edit | Slett en tjeneste |

### Eksempel: Søk etter tjenester etter campus

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

## Tjenestetider

Basissti: `/attendance/servicetimes`

Utvider GenericCrudController med CRUD-ruter `getById`, `post` og `delete`. Endepunktene `getAll` og `search` er egne implementasjoner.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle tjenestetider. Filtrer med `?serviceId=`. Legg til `?include=groups` for å legge til gruppedata. Hver rad inkluderer en beregnet `checkinOpen`-boolsk verdi (false bare når tjenestetiden har en innsjekkingsplan der tidsvinduet er stengt akkurat nå). Vinduet måles i tidssonen til tjenestens campus, deretter kirkens tidssone, deretter første campus som har en, deretter `America/New_York` |
| GET | `/:id` | JWT | — | Hent en tjenestetid etter ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Søk etter tjenestetider etter campus og tjeneste |
| GET | `/public/:churchId` | Offentlig | — | Hent campus → tjeneste → tid-treet for en kirke. Driver `serviceTimes`-elementet i nettsidebyggeren |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater tjenestetider. Valgfrie planleggingsfelt: `dayOfWeek` (0 = søndag … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (før start), `checkinCloseMinutes` (etter slutt). Innsjekking er bare tidsstyrt når både `dayOfWeek` og `startTime` er satt |
| DELETE | `/:id` | JWT | Services.Edit | Slett en tjenestetid |

## Gruppetjenestetider

Basissti: `/attendance/groupservicetimes`

Kobler grupper til spesifikke tjenestetider.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle gruppe-tjenestetid-koblinger. Filtrer med `?groupId=` for å hente koblinger med tjenestenavn |
| GET | `/:id` | JWT | — | Hent en gruppe-tjenestetid-kobling etter ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater gruppe-tjenestetid-koblinger |
| DELETE | `/:id` | JWT | Services.Edit | Slett en gruppe-tjenestetid-kobling |

## Oppmøteposter

Basissti: `/attendance/attendancerecords`

Tilbyr skrivebeskyttede aggregerte visninger av oppmøtedata for rapportering og visning.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Last inn oppmøteposter for en person. Krever `?personId=` |
| GET | `/my` | JWT | — | Selvbetjent: den innloggede medlemmens egne oppmøteposter fra de siste 12 månedene, nyeste først. Returnerer `401` hvis brukeren ikke er koblet til en person. Driver **Mitt oppmøte**-seksjonen på B1 Me-siden |
| GET | `/tree` | JWT | — | Last inn hele oppmøtetreet (campuser, tjenester, tjenestetider, grupper) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Last inn oppmøtetrenddata med valgfrie filtre |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Last inn gruppeoppmøte for en tjeneste i en gitt uke |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | For hver gruppe tildelt tjenestetiden, returner `{ groupId, sessionId, attendanceCount }` for den datoen (`date` er `YYYY-MM-DD`; `sessionId` er null når gruppen ikke har en økt). Driver B1Admin sin **Hvem mangler fortsatt oppmøte**-dialog |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Søk i oppmøteposter med filtre (campus, tjeneste, tjenestetid, gruppe, datoområde) |

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

Utvider GenericCrudController med CRUD-ruter `getById` og `delete`. Endepunktene `getAll` og `save` er egne implementasjoner som også lar gruppeledere administrere økter for sine grupper.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View eller gruppeleder | List alle økter. Filtrer med `?groupId=` (inkluderer navn). Gruppeledere kan se økter for sine egne grupper |
| GET | `/:id` | JWT | Attendance.View | Hent en økt etter ID |
| POST | `/` | JWT | Attendance.Edit eller gruppeleder | Opprett eller oppdater økter. Gruppeledere kan lagre økter for sine egne grupper |
| DELETE | `/:id` | JWT | Attendance.Edit | Slett en økt |

## Besøk

Basissti: `/attendance/visits`

Administrerer individuelle besøksposter (en person som deltar på en bestemt dato) og tilbyr innsjekkingsarbeidsflyten.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | List alle besøk. Filtrer med `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Hent et besøk etter ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View eller Attendance.Checkin | Last inn innsjekkingsdata for personer på en tjeneste. Returnerer besøk med besøksøkter fra siste loggførte dato |
| POST | `/` | JWT | Attendance.Edit | Opprett eller oppdater besøk |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit eller Attendance.Checkin | Send inn innsjekkingsdata. Oppretter/oppdaterer besøk og besøksøkter, og fjerner utdaterte poster |
| DELETE | `/:id` | JWT | Attendance.Edit | Slett et besøk |

### Eksempel: Innsjekkingsflyt

**Steg 1 -- Last inn eksisterende innsjekkingsdata:**

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

**Steg 2 -- Send inn innsjekking:**

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

Hvis en målrettet tjenestetid har en innsjekkingsplan og tidsvinduet er stengt (målt i samme campus-først tidssonerekkefølge som `checkinOpen`), lagres ingenting og svaret er `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Kapasitets- og frivillig-forholdsbrudd returnerer også 409 (`error: "capacity"` eller `"ratio"`). Økter en person allerede har i dag (sendt på nytt med hver innsjekking) hopper over vindussjekken, slik at en husstand kan legge til en åpen tjenestetid etter at vinduet til en tidligere har lukket seg.

## Besøksøkter

Basissti: `/attendance/visitsessions`

Administrerer forbindelsen mellom besøk og økter (hvilken spesifikk økt en person deltok på under et besøk). Tilbyr også et hurtiglogg-endepunkt og et nedlastings-/eksportendepunkt.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View eller gruppeleder | List besøksøkter. Filtrer med `?sessionId=`. Gruppeledere kan se besøksøkter for sine egne grupper |
| GET | `/:id` | JWT | Attendance.View | Hent en besøksøkt etter ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Last ned oppmøte for en økt (returnerer personnavn med status tilstede/fraværende) |
| POST | `/` | JWT | Attendance.Edit | Opprett eller oppdater besøksøkter |
| POST | `/log` | JWT | Attendance.Edit eller gruppeleder | Hurtiglogg en persons oppmøte til en økt. Oppretter besøk automatisk ved behov. Gruppeledere kan logge oppmøte for sine egne grupper |
| DELETE | `/:id` | JWT | Attendance.Edit | Slett en besøksøkt etter ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit eller gruppeleder | Fjern en person fra en økt. Sletter besøksøkten og det overordnede besøket hvis ingen økter gjenstår. Gruppeledere kan fjerne oppmøte for sine egne grupper |

### Eksempel: Hurtiglogg oppmøte

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

### Eksempel: Last ned oppmøte for økt

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

Sporer oppmøterekker for enkeltpersoner -- sammenhengende uker en person har deltatt. Nyttig for engasjementsmålinger og gamification.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Last inn oppmøterekker for en person |

## Relaterte sider

- [Medlemskap-endepunkter](./membership) — Personer, grupper, roller og kirkeadministrasjon
- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, tillatelsesmodell
- [Modulstruktur](../module-structure) — Kodeorganiseringsmønstre
