---
title: "Oppmøte-endepunkter"
---

# Oppmøte-endepunkter

<div class="article-intro">

Oppmøte-modulen administrerer campus-lokasjoner, gudstjenester, gudstjenestetider, oppmøtesesjoner, besøk og besøkssesjoner. Den gir infrastrukturen for å spore hvem som deltok på hvilken gudstjeneste eller gruppemøte, støtter innsjekkingsarbeidsflyter, og tilbyr rapportering av oppmøtetrender og -sammendrag.

</div>

**Basissti:** `/attendance`

## Campus

Basissti: `/attendance/campuses`

Standard CRUD-kontroller (utvider GenericCrudController). Tilbyr rutene `getById`, `getAll`, `post` og `delete` via CRUD-basisklassen.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle campus for kirken |
| GET | `/:id` | JWT | — | Hent et campus etter ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater campus |
| DELETE | `/:id` | JWT | Services.Edit | Slett et campus |

## Gudstjenester

Basissti: `/attendance/services`

Utvider GenericCrudController med CRUD-rutene `getById`, `getAll`, `post` og `delete`. Endepunktene `getAll` (`GET /`) og `search` overstyres med egendefinerte implementasjoner.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle gudstjenester (inkluderer campus-info) |
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

Utvider GenericCrudController med CRUD-rutene `getById`, `post` og `delete`. Endepunktene `getAll` og `search` er egendefinerte implementasjoner.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle gudstjenestetider. Filtrer med `?serviceId=`. Legg til `?include=groups` for å inkludere gruppedata |
| GET | `/:id` | JWT | — | Hent en gudstjenestetid etter ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Søk gudstjenestetider etter campus og gudstjeneste |
| GET | `/public/:churchId` | Public | — | Hent campus → gudstjeneste → tid-treet for en kirke. Driver nettstedbyggerens `serviceTimes`-element |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater gudstjenestetider |
| DELETE | `/:id` | JWT | Services.Edit | Slett en gudstjenestetid |

## Gruppe-gudstjenestetider

Basissti: `/attendance/groupservicetimes`

Kobler grupper til spesifikke gudstjenestetider.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle gruppe-gudstjenestetid-koblinger. Filtrer med `?groupId=` for å hente koblinger med gudstjenestenavn |
| GET | `/:id` | JWT | — | Hent en gruppe-gudstjenestetid-kobling etter ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater gruppe-gudstjenestetid-koblinger |
| DELETE | `/:id` | JWT | Services.Edit | Slett en gruppe-gudstjenestetid-kobling |

## Oppmøteoppføringer

Basissti: `/attendance/attendancerecords`

Tilbyr skrivebeskyttede aggregerte visninger av oppmøtedata for rapportering og visning.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Last oppmøteoppføringer for en person. Krever `?personId=` |
| GET | `/tree` | JWT | — | Last hele oppmøtetreet (campus, gudstjenester, gudstjenestetider, grupper) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Last oppmøtetrenddata med valgfrie filtre |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Last gruppeoppmøte for en gudstjeneste i en gitt uke |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Søk oppmøteoppføringer med filtre (campus, gudstjeneste, gudstjenestetid, gruppe, datointervall) |

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

## Sesjoner

Basissti: `/attendance/sessions`

Utvider GenericCrudController med CRUD-rutene `getById` og `delete`. Endepunktene `getAll` og `save` er egendefinerte implementasjoner som også lar gruppeledere administrere sesjoner for sine egne grupper.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View eller gruppeleder | List alle sesjoner. Filtrer med `?groupId=` (inkluderer navn). Gruppeledere kan se sesjoner for sine egne grupper |
| GET | `/:id` | JWT | Attendance.View | Hent en sesjon etter ID |
| POST | `/` | JWT | Attendance.Edit eller gruppeleder | Opprett eller oppdater sesjoner. Gruppeledere kan lagre sesjoner for sine egne grupper |
| DELETE | `/:id` | JWT | Attendance.Edit | Slett en sesjon |

## Besøk

Basissti: `/attendance/visits`

Administrerer individuelle besøksoppføringer (en person som deltar på en bestemt dato) og tilbyr innsjekkingsarbeidsflyten.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | List alle besøk. Filtrer med `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Hent et besøk etter ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View eller Attendance.Checkin | Last innsjekkingsdata for personer på en gudstjeneste. Returnerer besøk med besøkssesjoner fra siste loggførte dato |
| POST | `/` | JWT | Attendance.Edit | Opprett eller oppdater besøk |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit eller Attendance.Checkin | Send inn innsjekkingsdata. Oppretter/oppdaterer besøk og besøkssesjoner, fjerner utdaterte oppføringer |
| DELETE | `/:id` | JWT | Attendance.Edit | Slett et besøk |

### Eksempel: Innsjekkingsflyt

**Trinn 1 -- Last eksisterende innsjekkingsdata:**

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

## Besøkssesjoner

Basissti: `/attendance/visitsessions`

Administrerer koblingen mellom besøk og sesjoner (hvilken bestemt sesjon en person deltok på under et besøk). Tilbyr også et hurtiglogg-endepunkt og et nedlastings-/eksportendepunkt.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View eller gruppeleder | List besøkssesjoner. Filtrer med `?sessionId=`. Gruppeledere kan se besøkssesjoner for sine egne grupper |
| GET | `/:id` | JWT | Attendance.View | Hent en besøkssesjon etter ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Last ned oppmøte for en sesjon (returnerer personnavn med til stede/fraværende-status) |
| POST | `/` | JWT | Attendance.Edit | Opprett eller oppdater besøkssesjoner |
| POST | `/log` | JWT | Attendance.Edit eller gruppeleder | Hurtiglogg en persons oppmøte til en sesjon. Oppretter automatisk besøk om nødvendig. Gruppeledere kan logge oppmøte for sine egne grupper |
| DELETE | `/:id` | JWT | Attendance.Edit | Slett en besøkssesjon etter ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit eller gruppeleder | Fjern en person fra en sesjon. Sletter besøkssesjonen og det overordnede besøket hvis ingen sesjoner gjenstår. Gruppeledere kan fjerne oppmøte for sine egne grupper |

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

### Eksempel: Last ned sesjonsoppmøte

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

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Last oppmøterekker for en person |

## Relaterte sider

- [Medlemskaps-endepunkter](./membership) — Personer, grupper, roller og kirkeadministrasjon
- [Autentisering og tillatelser](./authentication) — Innloggingsflyt, JWT, tillatelsesmodell
- [Modulstruktur](../module-structure) — Kodeorganiseringsmønstre
