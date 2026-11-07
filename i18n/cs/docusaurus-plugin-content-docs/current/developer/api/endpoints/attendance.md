---
title: "Endpointy docházky"
description: "Referenční příručka k API docházky v B1 Admin a B1 Checkin: kampusy, bohoslužby, časy bohoslužeb, relace, návštěvy, pravidla check-inu a exportní endpointy."
---

# Endpointy docházky

<div class="article-intro">

Modul docházky spravuje kampusy, služby, časy služeb, relace docházky, návštěvy a relace návštěv. Umožňuje sledovat, kdo se zúčastnil které bohoslužby nebo schůzky skupiny, podporuje postupy odbavení a nabízí přehledy a souhrnné reporty docházky.

</div>

**Základní cesta:** `/attendance`

## Kampusy

Základní cesta: `/attendance/campuses`

Standardní CRUD kontroler (rozšiřuje GenericCrudController). Poskytuje trasy `getById`, `getAll`, `post` a `delete` prostřednictvím základní třídy CRUD.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Seznam všech kampusů sboru |
| GET | `/:id` | JWT | — | Získání kampusu podle ID |
| POST | `/` | JWT | Services.Edit | Vytvoření nebo aktualizace kampusů |
| DELETE | `/:id` | JWT | Services.Edit | Smazání kampusu |

## Služby

Základní cesta: `/attendance/services`

Rozšiřuje GenericCrudController s trasami CRUD `getById`, `getAll`, `post` a `delete`. Endpointy `getAll` (`GET /`) a `search` jsou přepsány vlastními implementacemi.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Seznam všech služeb (včetně informací o kampusu) |
| GET | `/:id` | JWT | — | Získání služby podle ID |
| GET | `/search?campusId=` | JWT | — | Vyhledání služeb podle ID kampusu |
| POST | `/` | JWT | Services.Edit | Vytvoření nebo aktualizace služeb |
| DELETE | `/:id` | JWT | Services.Edit | Smazání služby |

### Příklad: Vyhledání služeb podle kampusu

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

## Časy služeb

Základní cesta: `/attendance/servicetimes`

Rozšiřuje GenericCrudController s trasami CRUD `getById`, `post` a `delete`. Endpointy `getAll` a `search` jsou vlastní implementace.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Seznam všech časů služeb. Filtrování pomocí `?serviceId=`. Přidání `?include=groups` připojí údaje o skupinách. Každý řádek obsahuje vypočtenou logickou hodnotu `checkinOpen` (je `false` pouze tehdy, když čas služby má plán odbavení a jeho okno je právě zavřené). Okno se měří v časovém pásmu kampusu služby, poté v časovém pásmu sboru, poté v časovém pásmu prvního kampusu, který jej má, a nakonec v pásmu `America/New_York` |
| GET | `/:id` | JWT | — | Získání času služby podle ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Vyhledání časů služeb podle kampusu a služby |
| GET | `/public/:churchId` | Veřejné | — | Získání stromu kampus → služba → čas pro sbor. Slouží k elementu `serviceTimes` v nástroji pro tvorbu webu |
| POST | `/` | JWT | Services.Edit | Vytvoření nebo aktualizace časů služeb. Volitelná pole plánu: `dayOfWeek` (0 = neděle … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (před začátkem), `checkinCloseMinutes` (po skončení). Odbavení je časově omezeno pouze tehdy, když jsou nastaveny `dayOfWeek` i `startTime` |
| DELETE | `/:id` | JWT | Services.Edit | Smazání času služby |

## Časy služeb skupin

Základní cesta: `/attendance/groupservicetimes`

Propojuje skupiny s konkrétními časy služeb.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | — | Seznam všech propojení skupina–čas služby. Filtrování pomocí `?groupId=` vrátí propojení s názvy služeb |
| GET | `/:id` | JWT | — | Získání propojení skupina–čas služby podle ID |
| POST | `/` | JWT | Services.Edit | Vytvoření nebo aktualizace propojení skupina–čas služby |
| DELETE | `/:id` | JWT | Services.Edit | Smazání propojení skupina–čas služby |

## Záznamy docházky

Základní cesta: `/attendance/attendancerecords`

Poskytuje pouze pro čtení souhrnné pohledy na data docházky pro reporty a zobrazení.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | Attendance.View | Načtení záznamů docházky osoby. Vyžaduje `?personId=` |
| GET | `/my` | JWT | — | Pouze pro přihlášeného uživatele: vlastní záznamy docházky přihlášeného člena za posledních 12 měsíců, od nejnovějšího. Vrací `401`, pokud uživatel není propojen s osobou. Slouží sekci **Moje docházka** na stránce B1 Me |
| GET | `/tree` | JWT | — | Načtení úplného stromu docházky (kampusy, služby, časy služeb, skupiny) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Načtení dat o trendu docházky s volitelnými filtry |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Načtení docházky skupin pro službu v daném týdnu |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Pro každou skupinu přiřazenou k času služby vrátí `{ groupId, sessionId, attendanceCount }` pro dané datum (`date` je ve formátu `YYYY-MM-DD`; `sessionId` je null, pokud skupina nemá relaci). Slouží dialogu **Kdo ještě potřebuje docházku** v B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Vyhledání záznamů docházky s filtry (kampus, služba, čas služby, skupina, rozsah dat) |

### Příklad: Trend docházky

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

## Relace

Základní cesta: `/attendance/sessions`

Rozšiřuje GenericCrudController s trasami CRUD `getById` a `delete`. Endpointy `getAll` a `save` jsou vlastní implementace, které také umožňují vedoucím skupin spravovat relace jejich skupin.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | Attendance.View nebo vedoucí skupiny | Seznam všech relací. Filtrování pomocí `?groupId=` (včetně názvů). Vedoucí skupin mohou zobrazit relace svých skupin |
| GET | `/:id` | JWT | Attendance.View | Získání relace podle ID |
| POST | `/` | JWT | Attendance.Edit nebo vedoucí skupiny | Vytvoření nebo aktualizace relací. Vedoucí skupin mohou ukládat relace svých skupin |
| DELETE | `/:id` | JWT | Attendance.Edit | Smazání relace |

## Návštěvy

Základní cesta: `/attendance/visits`

Spravuje jednotlivé záznamy návštěv (osoba přítomná na konkrétním datu) a poskytuje postup odbavení.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | Attendance.View | Seznam všech návštěv. Filtrování pomocí `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Získání návštěvy podle ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View nebo Attendance.Checkin | Načtení dat odbavení osob na službu. Vrací návštěvy s relacemi návštěv z posledního zaznamenaného data |
| POST | `/` | JWT | Attendance.Edit | Vytvoření nebo aktualizace návštěv |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit nebo Attendance.Checkin | Odeslání dat odbavení. Vytvoří nebo aktualizuje návštěvy a relace návštěv a odstraní zastaralé záznamy |
| DELETE | `/:id` | JWT | Attendance.Edit | Smazání návštěvy |

### Příklad: Postup odbavení

**Krok 1 -- Načtení existujících dat odbavení:**

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

**Krok 2 -- Odeslání odbavení:**

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

Pokud má cílový čas služby plán odbavení a jeho okno je zavřené (měřeno ve stejném pořadí časových pásem s prioritou kampusu jako u `checkinOpen`), nic se neuloží a odpověď je `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Překročení kapacity a poměru dobrovolníků také vrací 409 (`error: "capacity"` nebo `"ratio"`). Relace, které osoba již dnes má (znovu odeslané při každém odbavení), přeskakují kontrolu okna, takže domácnost může přidat otevřený čas služby poté, co okno předchozího času už bylo zavřeno.

## Relace návštěv

Základní cesta: `/attendance/visitsessions`

Spravuje propojení mezi návštěvami a relacemi (kterou konkrétní relaci osoba během návštěvy navštívila). Poskytuje také rychlý endpoint pro zápis a endpoint pro stažení a export.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/` | JWT | Attendance.View nebo vedoucí skupiny | Seznam relací návštěv. Filtrování pomocí `?sessionId=`. Vedoucí skupin mohou zobrazit relace návštěv svých skupin |
| GET | `/:id` | JWT | Attendance.View | Získání relace návštěvy podle ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Stažení docházky relace (vrací jména osob se stavem přítomen/nepřítomen) |
| POST | `/` | JWT | Attendance.Edit | Vytvoření nebo aktualizace relací návštěv |
| POST | `/log` | JWT | Attendance.Edit nebo vedoucí skupiny | Rychlý zápis docházky osoby do relace. Pokud je potřeba, automaticky vytvoří návštěvu. Vedoucí skupin mohou zapisovat docházku pro svoje skupiny |
| DELETE | `/:id` | JWT | Attendance.Edit | Smazání relace návštěvy podle ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit nebo vedoucí skupiny | Odebrání osoby z relace. Smaže relaci návštěvy a nadřazenou návštěvu, pokud nezůstanou žádné relace. Vedoucí skupin mohou odebírat docházku pro svoje skupiny |

### Příklad: Rychlý zápis docházky

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

### Příklad: Stažení docházky relace

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

## Série

Základní cesta: `/attendance/streaks`

Sleduje série docházky jednotlivců, tedy počet po sobě jdoucích týdnů, kdy se osoba zúčastnila. Je užitečná pro metriky zapojení a gamifikaci.

| Metoda | Cesta | Autentizace | Oprávnění | Popis |
|--------|-------|-------------|-----------|-------|
| GET | `/person/:personId` | JWT | — | Načtení sérií docházky osoby |

## Související stránky

- [Endpointy členství](./membership.md) — Lidé, skupiny, role a správa sboru
- [Autentizace a oprávnění](./authentication.md) — Přihlášení, JWT, model oprávnění
- [Struktura modulů](../module-structure.md) — Vzory organizace kódu
