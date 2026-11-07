---
title: "Jelenléti végpontok"
description: "Referencia a jelenléti API-hoz a B1 Admin és a B1 Checkin számára: kampuszok, istentiszteletek, időpontok, munkamenetek, látogatások, bejelentkezési szabályok és exportvégpontok."
---

# Jelenléti végpontok

<div class="article-intro">

A Jelenlét modul kezeli a gyülekezeti helyszíneket, az istentiszteleteket, az istentiszteleti időpontokat, a jelenléti üléseket, a látogatásokat és a látogatási üléseket. Infrastruktúrát biztosít ahhoz, hogy nyomon lehessen követni, ki melyik istentiszteleten vagy csoportalkalmon vett részt, támogatja a bejelentkezési folyamatokat, és jelenléti trend- és összesítő jelentéseket kínál.

</div>

**Alap útvonal:** `/attendance`

## Gyülekezeti helyszínek

Alap útvonal: `/attendance/campuses`

Szabványos CRUD vezérlő (a GenericCrudController-ből származik). A CRUD alaposztályon keresztül biztosítja a `getById`, `getAll`, `post` és `delete` útvonalakat.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | A gyülekezet összes helyszínének listázása |
| GET | `/:id` | JWT | — | Egy helyszín lekérése azonosító alapján |
| POST | `/` | JWT | Services.Edit | Helyszínek létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | Services.Edit | Helyszín törlése |

## Istentiszteletek

Alap útvonal: `/attendance/services`

A GenericCrudController-ből származik, a `getById`, `getAll`, `post` és `delete` CRUD útvonalakkal. A `getAll` (`GET /`) és a `search` végpontot egyedi megvalósítás írja felül.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Az összes istentisztelet listázása (tartalmazza a helyszín adatait) |
| GET | `/:id` | JWT | — | Egy istentisztelet lekérése azonosító alapján |
| GET | `/search?campusId=` | JWT | — | Istentiszteletek keresése helyszín-azonosító alapján |
| POST | `/` | JWT | Services.Edit | Istentiszteletek létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | Services.Edit | Istentisztelet törlése |

### Példa: Istentiszteletek keresése helyszín szerint

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

## Istentiszteleti időpontok

Alap útvonal: `/attendance/servicetimes`

A GenericCrudController-ből származik, a `getById`, `post` és `delete` CRUD útvonalakkal. A `getAll` és a `search` végpontok egyedi megvalósítások.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Az összes istentiszteleti időpont listázása. Szűrés: `?serviceId=`. A `?include=groups` paraméterrel csoportadatok is hozzáfűzhetők. Minden sor tartalmaz egy számított `checkinOpen` logikai értéket (csak akkor `false`, ha az istentiszteleti időpontnak van bejelentkezési ütemezése, és annak időablaka éppen zárva van). Az időablakot a szolgálat helyszínének időzónája szerint számítjuk, ezt követi a gyülekezet időzónája, majd az első olyan helyszín időzónája, amelyhez van beállítva, végül `America/New_York` |
| GET | `/:id` | JWT | — | Egy istentiszteleti időpont lekérése azonosító alapján |
| GET | `/search?campusId=&serviceId=` | JWT | — | Istentiszteleti időpontok keresése helyszín és istentisztelet szerint |
| GET | `/public/:churchId` | Nyilvános | — | Egy gyülekezet helyszín → istentisztelet → időpont fájának lekérése. A weboldal-szerkesztő `serviceTimes` elemét táplálja |
| POST | `/` | JWT | Services.Edit | Istentiszteleti időpontok létrehozása vagy frissítése. Opcionális ütemezési mezők: `dayOfWeek` (0 = vasárnap … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (a kezdés előtt), `checkinCloseMinutes` (a vége után). A bejelentkezés csak akkor időkorlátozott, ha a `dayOfWeek` és a `startTime` is be van állítva |
| DELETE | `/:id` | JWT | Services.Edit | Istentiszteleti időpont törlése |

## Csoport-istentiszteleti időpontok

Alap útvonal: `/attendance/groupservicetimes`

Csoportokat köt össze konkrét istentiszteleti időpontokhoz.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Az összes csoport–időpont kapcsolat listázása. Szűrés: `?groupId=`, ekkor az istentiszteletek nevével együtt kapjuk meg a kapcsolatokat |
| GET | `/:id` | JWT | — | Egy csoport–időpont kapcsolat lekérése azonosító alapján |
| POST | `/` | JWT | Services.Edit | Csoport–időpont kapcsolatok létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | Services.Edit | Csoport–időpont kapcsolat törlése |

## Jelenléti rekordok

Alap útvonal: `/attendance/attendancerecords`

Csak olvasható, összesített nézeteket biztosít a jelenléti adatokról jelentéskészítéshez és megjelenítéshez.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Egy személy jelenléti rekordjainak betöltése. A `?personId=` megadása kötelező |
| GET | `/my` | JWT | — | Saját hatókör: a bejelentkezett tag saját jelenléti rekordjai az elmúlt 12 hónapból, a legújabbtól a legrégebbiig. `401` választ ad, ha a felhasználó nincs személyhez kapcsolva. A B1 Me oldal **Saját jelenlét** szakaszát táplálja |
| GET | `/tree` | JWT | — | A teljes jelenléti fa betöltése (helyszínek, istentiszteletek, istentiszteleti időpontok, csoportok) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Jelenléti trendadatok betöltése opcionális szűrőkkel |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Egy istentisztelet csoportjainak jelenléte adott héten |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Az istentiszteleti időponthoz rendelt minden csoporthoz visszaadja a `{ groupId, sessionId, attendanceCount }` értéket az adott napra (a `date` formátuma `YYYY-MM-DD`; a `sessionId` null, ha a csoportnak nincs ülése). A B1Admin **Kik hiányoznak még a jelenlétből** párbeszédablakát táplálja |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Jelenléti rekordok keresése szűrőkkel (helyszín, istentisztelet, istentiszteleti időpont, csoport, dátumtartomány) |

### Példa: Jelenléti trend

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

## Ülések

Alap útvonal: `/attendance/sessions`

A GenericCrudController-ből származik, a `getById` és `delete` CRUD útvonalakkal. A `getAll` és a `save` végpontok egyedi megvalósítások, amelyek lehetővé teszik, hogy a csoportvezetők is kezeljék saját csoportjaik üléseit.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View vagy Csoportvezető | Az összes ülés listázása. Szűrés: `?groupId=` (a neveket is tartalmazza). A csoportvezetők saját csoportjaik üléseit tekinthetik meg |
| GET | `/:id` | JWT | Attendance.View | Egy ülés lekérése azonosító alapján |
| POST | `/` | JWT | Attendance.Edit vagy Csoportvezető | Ülések létrehozása vagy frissítése. A csoportvezetők saját csoportjaik üléseit menthetik |
| DELETE | `/:id` | JWT | Attendance.Edit | Ülés törlése |

## Látogatások

Alap útvonal: `/attendance/visits`

Egyedi látogatási rekordokat kezel (egy személy adott napon történő részvételét), és biztosítja a bejelentkezési folyamatot.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Az összes látogatás listázása. Szűrés: `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Egy látogatás lekérése azonosító alapján |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View vagy Attendance.Checkin | Bejelentkezési adatok betöltése személyekhez egy istentiszteleten. Az utolsó rögzített dátum látogatásait és látogatási üléseit adja vissza |
| POST | `/` | JWT | Attendance.Edit | Látogatások létrehozása vagy frissítése |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit vagy Attendance.Checkin | Bejelentkezési adatok beküldése. Létrehozza, illetve frissíti a látogatásokat és látogatási üléseket, eltávolítja az elavult rekordokat |
| DELETE | `/:id` | JWT | Attendance.Edit | Látogatás törlése |

### Példa: Bejelentkezési folyamat

**1. lépés — Meglévő bejelentkezési adatok betöltése:**

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

**2. lépés — Bejelentkezés beküldése:**

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

Ha a megcélzott istentiszteleti időpontnak van bejelentkezési ütemezése, és annak időablaka zárva van (ugyanabban a helyszín-elsőbbségi időzóna-sorrendben mérve, mint a `checkinOpen` esetén), semmi sem mentődik, és a válasz `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. A kapacitás- és önkéntes-arány-túllépések szintén 409-et adnak (`error: "capacity"` vagy `"ratio"`). Azok az ülések, amelyeket egy személy már aznap birtokol (minden bejelentkezéskor újra beküldve), kihagyják az időablak-ellenőrzést, így egy háztartás hozzáadhat nyitott istentiszteleti időpontot akkor is, ha egy korábbi időpont időablaka már bezárult.

## Látogatási ülések

Alap útvonal: `/attendance/visitsessions`

A látogatások és ülések közötti kapcsolatot kezeli (hogy a látogatás során a személy melyik konkrét ülésen vett részt). Emellett gyors naplózási végpontot és letöltési/exportálási végpontot biztosít.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View vagy Csoportvezető | Látogatási ülések listázása. Szűrés: `?sessionId=`. A csoportvezetők saját csoportjaik látogatási üléseit tekinthetik meg |
| GET | `/:id` | JWT | Attendance.View | Egy látogatási ülés lekérése azonosító alapján |
| GET | `/download/:sessionId` | JWT | Attendance.View | Egy ülés jelenlétének letöltése (személyek nevét adja vissza jelenléti/hiányzási státusszal) |
| POST | `/` | JWT | Attendance.Edit | Látogatási ülések létrehozása vagy frissítése |
| POST | `/log` | JWT | Attendance.Edit vagy Csoportvezető | Egy személy jelenlétének gyors rögzítése egy ülésre. Szükség esetén automatikusan létrehoz látogatást. A csoportvezetők saját csoportjaik jelenlétét rögzíthetik |
| DELETE | `/:id` | JWT | Attendance.Edit | Látogatási ülés törlése azonosító alapján |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit vagy Csoportvezető | Személy eltávolítása egy ülésről. Törli a látogatási ülést, és a szülő látogatást is, ha nem maradt ülése. A csoportvezetők saját csoportjaik jelenlétét törölhetik |

### Példa: Jelenlét gyors rögzítése

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

### Példa: Egy ülés jelenlétének letöltése

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

## Sorozatok

Alap útvonal: `/attendance/streaks`

Személyek jelenléti sorozatait követi nyomon — azt, hogy egy személy hány egymást követő héten vett részt. Elkötelezettségi mutatókhoz és játékosításhoz hasznos.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Egy személy jelenléti sorozatainak betöltése |

## Kapcsolódó oldalak

- [Tagsági végpontok](./membership.md) — Személyek, csoportok, szerepkörök és gyülekezetkezelés
- [Hitelesítés és jogosultságok](./authentication.md) — Bejelentkezési folyamat, JWT, jogosultsági modell
- [Modulok szerkezete](../module-structure.md) — Kódszervezési minták
