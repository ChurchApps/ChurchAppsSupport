---
title: "Närvaroendpoints"
description: "Referens för närvaro-API:et i B1 Admin och B1 Checkin: campus, gudstjänster, gudstjänsttider, sessioner, besök, incheckningsregler och exportendpoints."
---

# Närvaroendpoints

<div class="article-intro">

Modulen Närvaro hanterar campusplatser, gudstjänster, gudstjänsttider, närvarosessioner, besök och besakssessioner. Den tillhandahåller infrastrukturen för att spåra vem som deltog i vilken gudstjänst eller gruppmöte, stödjer incheckningsflöden och erbjuder rapportering av närvarotrender och sammanfattningar.

</div>

**Basväg:** `/attendance`

## Campuser

Basväg: `/attendance/campuses`

Standardcontroller för CRUD (utökar GenericCrudController). Tillhandahåller rutterna `getById`, `getAll`, `post` och `delete` via basklassen för CRUD.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Lista alla campuser för församlingen |
| GET | `/:id` | JWT | — | Hämta en campus med ID |
| POST | `/` | JWT | Services.Edit | Skapa eller uppdatera campuser |
| DELETE | `/:id` | JWT | Services.Edit | Ta bort en campus |

## Gudstjänster

Basväg: `/attendance/services`

Utökar GenericCrudController med CRUD-rutterna `getById`, `getAll`, `post` och `delete`. Endpoints `getAll` (`GET /`) och `search` är åsidosatta med egna implementeringar.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Lista alla gudstjänster (inkluderar campusinformation) |
| GET | `/:id` | JWT | — | Hämta en gudstjänst med ID |
| GET | `/search?campusId=` | JWT | — | Sök gudstjänster efter campus-ID |
| POST | `/` | JWT | Services.Edit | Skapa eller uppdatera gudstjänster |
| DELETE | `/:id` | JWT | Services.Edit | Ta bort en gudstjänst |

### Exempel: Sök gudstjänster efter campus

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

## Gudstjänsttider

Basväg: `/attendance/servicetimes`

Utökar GenericCrudController med CRUD-rutterna `getById`, `post` och `delete`. Endpoints `getAll` och `search` är egna implementeringar.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Lista alla gudstjänsttider. Filtrera med `?serviceId=`. Lägg till `?include=groups` för att bifoga gruppdata. Varje rad innehåller ett beräknat booleskt värde `checkinOpen` (falskt endast när gudstjänsttiden har ett incheckningsschema vars tidsfönster är stängt just nu). Fönstret mäts i tidszonen för gudstjänstens campus, sedan församlingens tidszon, sedan första campus som har en tidszon, och sist `America/New_York` |
| GET | `/:id` | JWT | — | Hämta en gudstjänsttid med ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Sök gudstjänsttider efter campus och gudstjänst |
| GET | `/public/:churchId` | Publik | — | Hämta trädet campus → gudstjänst → tid för en församling. Driver elementet `serviceTimes` i webbplatsbyggaren |
| POST | `/` | JWT | Services.Edit | Skapa eller uppdatera gudstjänsttider. Valfria schemafält: `dayOfWeek` (0 = söndag … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (före starten), `checkinCloseMinutes` (efter slutet). Incheckningen styrs av tid endast när både `dayOfWeek` och `startTime` är satta |
| DELETE | `/:id` | JWT | Services.Edit | Ta bort en gudstjänsttid |

## Gruppgudstjänsttider

Basväg: `/attendance/groupservicetimes`

Kopplar grupper till specifika gudstjänsttider.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Lista alla kopplingar mellan grupp och gudstjänsttid. Filtrera med `?groupId=` för att få kopplingar med gudstjänstnamn |
| GET | `/:id` | JWT | — | Hämta en koppling mellan grupp och gudstjänsttid med ID |
| POST | `/` | JWT | Services.Edit | Skapa eller uppdatera kopplingar mellan grupp och gudstjänsttid |
| DELETE | `/:id` | JWT | Services.Edit | Ta bort en koppling mellan grupp och gudstjänsttid |

## Närvaroposter

Basväg: `/attendance/attendancerecords`

Tillhandahåller skrivskyddade sammanställda vyer av närvarodata för rapportering och visning.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | Attendance.View | Hämta närvaroposter för en person. Kräver `?personId=` |
| GET | `/my` | JWT | — | Självavgränsad: den inloggade medlemmens egna närvaroposter från de senaste 12 månaderna, nyast först. Returnerar `401` om användaren inte är kopplad till en person. Ligger bakom avsnittet **Min närvaro** på sidan Me i B1 |
| GET | `/tree` | JWT | — | Hämta hela närvarohierarkin (campus, gudstjänster, gudstjänsttider, grupper) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Hämta trenddata för närvaro med valfria filter |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Hämta gruppnärvaro för en gudstjänst under en given vecka |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | För varje grupp som är tilldelad gudstjänsttiden, returnera `{ groupId, sessionId, attendanceCount }` för det datumet (`date` är `YYYY-MM-DD`; `sessionId` är null när gruppen saknar session). Ligger bakom dialogrutan **Vem saknar fortfarande närvaroregistrering** i B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Sök närvaroposter med filter (campus, gudstjänst, gudstjänsttid, grupp, datumintervall) |

### Exempel: Närvarotrend

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

## Sessioner

Basväg: `/attendance/sessions`

Utökar GenericCrudController med CRUD-rutterna `getById` och `delete`. Endpoints `getAll` och `save` är egna implementeringar som även gör det möjligt för gruppledare att hantera sessioner för sina grupper.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | Attendance.View eller gruppledare | Lista alla sessioner. Filtrera med `?groupId=` (inkluderar namn). Gruppledare kan visa sessioner för sina egna grupper |
| GET | `/:id` | JWT | Attendance.View | Hämta en session med ID |
| POST | `/` | JWT | Attendance.Edit eller gruppledare | Skapa eller uppdatera sessioner. Gruppledare kan spara sessioner för sina egna grupper |
| DELETE | `/:id` | JWT | Attendance.Edit | Ta bort en session |

## Besök

Basväg: `/attendance/visits`

Hanterar enskilda besöksposter (en person som deltar på ett specifikt datum) och tillhandahåller incheckningsflödet.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | Attendance.View | Lista alla besök. Filtrera med `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Hämta ett besök med ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View eller Attendance.Checkin | Hämta incheckningsdata för personer vid en gudstjänst. Returnerar besök med besakssessioner från senast loggade datum |
| POST | `/` | JWT | Attendance.Edit | Skapa eller uppdatera besök |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit eller Attendance.Checkin | Skicka incheckningsdata. Skapar/uppdaterar besök och besakssessioner samt tar bort inaktuella poster |
| DELETE | `/:id` | JWT | Attendance.Edit | Ta bort ett besök |

### Exempel: Incheckningsflöde

**Steg 1 -- Läs in befintlig incheckningsdata:**

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

**Steg 2 -- Skicka incheckning:**

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

Om en vald gudstjänsttid har ett incheckningsschema och fönstret är stängt (mätt i samma ordning för tidszoner med campus först som för `checkinOpen`), sparas ingenting och svaret är `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Överskridanden av kapacitet och volontärsratio returnerar också 409 (`error: "capacity"` eller `"ratio"`). Sessioner som en person redan har idag (skickas om vid varje incheckning) hoppar över kontrollen av fönstret, så att ett hushåll kan lägga till en öppen gudstjänsttid efter att fönstret för en tidigare har stängts.

## Besakssessioner

Basväg: `/attendance/visitsessions`

Hanterar kopplingen mellan besök och sessioner (vilken specifik session en person deltog i under ett besök). Tillhandahåller även en snabbloggningsendpoint och en endpoint för nedladdning/export.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/` | JWT | Attendance.View eller gruppledare | Lista besakssessioner. Filtrera med `?sessionId=`. Gruppledare kan visa besakssessioner för sina egna grupper |
| GET | `/:id` | JWT | Attendance.View | Hämta en besakssession med ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Ladda ner närvaro för en session (returnerar personnamn med status närvarande/frånvarande) |
| POST | `/` | JWT | Attendance.Edit | Skapa eller uppdatera besakssessioner |
| POST | `/log` | JWT | Attendance.Edit eller gruppledare | Snabblogga en persons närvaro till en session. Skapar automatiskt besök vid behov. Gruppledare kan logga närvaro för sina egna grupper |
| DELETE | `/:id` | JWT | Attendance.Edit | Ta bort en besakssession med ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit eller gruppledare | Ta bort en person från en session. Tar bort besakssessionen och det överordnade besöket om inga sessioner återstår. Gruppledare kan ta bort närvaro för sina egna grupper |

### Exempel: Snabblogga närvaro

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

### Exempel: Ladda ner sessionens närvaro

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

## Serier

Basväg: `/attendance/streaks`

Följer närvaroserier för enskilda personer -- antal veckor i följd som en person har deltagit. Användbart för engagemangsmått och gamification.

| Metod | Sökväg | Autentisering | Behörighet | Beskrivning |
|--------|------|------|------|------|
| GET | `/person/:personId` | JWT | — | Hämta närvaroserier för en person |

## Relaterade sidor

- [Medlemsendpoints](./membership.md) — Personer, grupper, roller och församlingshantering
- [Autentisering och behörigheter](./authentication.md) — Inloggningsflöde, JWT, behörighetsmodell
- [Modulstruktur](../module-structure.md) — Mönster för kodorganisation
