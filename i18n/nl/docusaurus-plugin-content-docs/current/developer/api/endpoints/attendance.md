---
title: "Aanwezigheid Eindpunten"
---

# Aanwezigheid Eindpunten

<div class="article-intro">

De Aanwezigheidsmodule beheert campuslocaties, diensten, servicetijden, aanwezigheidssessies, bezoeken en bezoekssessies. Het biedt de infrastructuur voor het bijhouden van wie welke dienst of groepsbijeenkomst heeft bijgewoond, ondersteunt incheckinworkflows en biedt aanwezigheids- en samenvattingsrapportage.

</div>

**Basispad:** `/attendance`

## Campussen

Basispad: `/attendance/campuses`

Standaard CRUD controller (breidt GenericCrudController uit). Biedt `getById`, `getAll`, `post` en `delete` routes via de CRUD basisklasse.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | — | Lijst alle campussen voor de kerk |
| GET | `/:id` | JWT | — | Een campus op ID opvragen |
| POST | `/` | JWT | Services.Edit | Campussen maken of bijwerken |
| DELETE | `/:id` | JWT | Services.Edit | Een campus verwijderen |

## Diensten

Basispad: `/attendance/services`

Breidt GenericCrudController uit met CRUD routes `getById`, `getAll`, `post` en `delete`. De `getAll` (`GET /`) en `search` eindpunten worden overschreven met aangepaste implementaties.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | — | Lijst alle diensten (inclusief campusinfo) |
| GET | `/:id` | JWT | — | Een dienst op ID opvragen |
| GET | `/search?campusId=` | JWT | — | Diensten zoeken op campus-ID |
| POST | `/` | JWT | Services.Edit | Diensten maken of bijwerken |
| DELETE | `/:id` | JWT | Services.Edit | Een dienst verwijderen |

### Voorbeeld: Diensten zoeken per campus

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
    "name": "Zondagmorgen"
  }
]
```

## Servicetijden

Basispad: `/attendance/servicetimes`

Breidt GenericCrudController uit met CRUD routes `getById`, `post` en `delete`. De `getAll` en `search` eindpunten zijn aangepaste implementaties.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | — | Lijst alle servicetijden. Filter per `?serviceId=`. Voeg `?include=groups` toe om groepsgegevens toe te voegen |
| GET | `/:id` | JWT | — | Een servicetijd op ID opvragen |
| GET | `/search?campusId=&serviceId=` | JWT | — | Servicetijden zoeken per campus en dienst |
| POST | `/` | JWT | Services.Edit | Servicetijden maken of bijwerken |
| DELETE | `/:id` | JWT | Services.Edit | Een servicetijd verwijderen |

## Groepenservicetijden

Basispad: `/attendance/groupservicetimes`

Linkt groepen aan specifieke servicetijden.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | — | Lijst alle groep-servicetijd associaties. Filter per `?groupId=` om associaties met dienstnamen op te vragen |
| GET | `/:id` | JWT | — | Een groep-servicetijd associatie op ID opvragen |
| POST | `/` | JWT | Services.Edit | Groep-servicetijd associaties maken of bijwerken |
| DELETE | `/:id` | JWT | Services.Edit | Een groep-servicetijd associatie verwijderen |

## Aanwezigheidsverslagen

Basispad: `/attendance/attendancerecords`

Biedt alleen-lezen aggregate-weergaven van aanwezigheidsgegevens voor rapportage en weergave.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | Attendance.View | Laad aanwezigheidsverslagen voor een persoon. Vereist `?personId=` |
| GET | `/tree` | JWT | — | Laad de volledige aanwezigheidsboom (campussen, diensten, servicetijden, groepen) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Laad aanwezigheidstrend gegevens met optionele filters |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Laad groepsaanwezigheid voor een dienst op een bepaalde week |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Zoek aanwezigheidsverslagen met filters (campus, dienst, servicetijd, groep, datumbereik) |

### Voorbeeld: Aanwezigheidstrend

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

## Sessies

Basispad: `/attendance/sessions`

Breidt GenericCrudController uit met CRUD routes `getById` en `delete`. De `getAll` en `save` eindpunten zijn aangepaste implementaties die ook groepsleiders toestaan sessies voor hun groepen te beheren.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | Attendance.View of Group Leader | Lijst alle sessies. Filter per `?groupId=` (inclusief namen). Groepsleiders kunnen sessies voor hun eigen groepen bekijken |
| GET | `/:id` | JWT | Attendance.View | Een sessie op ID opvragen |
| POST | `/` | JWT | Attendance.Edit of Group Leader | Sessies maken of bijwerken. Groepsleiders kunnen sessies voor hun eigen groepen opslaan |
| DELETE | `/:id` | JWT | Attendance.Edit | Een sessie verwijderen |

## Bezoeken

Basispad: `/attendance/visits`

Beheert individuele bezoekverslagen (een persoon die op een bepaalde datum aanwezig is) en biedt de incheckinworkflow.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | Attendance.View | Lijst alle bezoeken. Filter per `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Een bezoek op ID opvragen |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View of Attendance.Checkin | Incheckingegevens voor personen bij een dienst laden. Retourneert bezoeken met bezoekssessies van de laatst aangemelde datum |
| POST | `/` | JWT | Attendance.Edit | Bezoeken maken of bijwerken |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit of Attendance.Checkin | Incheckingegevens indienen. Maakt/update bezoeken en bezoekssessies, verwijdert verouderde verslagen |
| DELETE | `/:id` | JWT | Attendance.Edit | Een bezoek verwijderen |

### Voorbeeld: Incheckinflow

**Stap 1 -- Bestaande incheckingegevens laden:**

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

**Stap 2 -- Incheckin indienen:**

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

## Bezoekssessies

Basispad: `/attendance/visitsessions`

Beheert de associatie tussen bezoeken en sessies (welke specifieke sessie een persoon tijdens een bezoek heeft bijgewoond). Biedt ook een quick log eindpunt en een download/export eindpunt.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | Attendance.View of Group Leader | Lijst bezoekssessies. Filter per `?sessionId=`. Groepsleiders kunnen bezoekssessies voor hun eigen groepen bekijken |
| GET | `/:id` | JWT | Attendance.View | Een bezoekssessie op ID opvragen |
| GET | `/download/:sessionId` | JWT | Attendance.View | Download aanwezigheid voor een sessie (retourneert persoonssnamen met aanwezig/afwezig status) |
| POST | `/` | JWT | Attendance.Edit | Bezoekssessies maken of bijwerken |
| POST | `/log` | JWT | Attendance.Edit of Group Leader | Snel aanwezigheid van een persoon in een sessie registreren. Maakt automatisch bezoek aan als nodig. Groepsleiders kunnen aanwezigheid voor hun eigen groepen registreren |
| DELETE | `/:id` | JWT | Attendance.Edit | Een bezoekssessie verwijderen |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit of Group Leader | Een persoon uit een sessie verwijderen. Verwijdert de bezoekssessie en het bovenliggende bezoek als er geen sessies meer zijn. Groepsleiders kunnen aanwezigheid voor hun eigen groepen verwijderen |

### Voorbeeld: Snel aanwezigheid registreren

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

### Voorbeeld: Sessie-aanwezigheid downloaden

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
    "personName": "Jan Jansen",
    "status": "aanwezig"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Marieke Smit",
    "status": "afwezig"
  }
]
```

## Streaks

Basispad: `/attendance/streaks`

Volgt aanwezigheidstreaks voor individuen -- opeenvolgende weken dat een persoon is geweest. Nuttig voor betrokkenheidsstatistieken en gamification.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/person/:personId` | JWT | — | Laad aanwezigheidsstreaks voor een persoon |

## Gerelateerde pagina's

- [Lidmaatschap Eindpunten](./membership) — Mensen, groepen, rollen en kerkbeheer
- [Verificatie & Toestemmingen](./authentication) — Inlogflow, JWT, toestemmingsmodel
- [Modulestructuur](../module-structure) — Codeorganisatiepatronen
