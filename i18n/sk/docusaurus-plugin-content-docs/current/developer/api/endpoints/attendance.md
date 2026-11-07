---
title: "Koncové body dochádzky"
description: "Referencia API účasti v B1 Admin a B1 Checkin: kampusy, bohoslužby, časy bohoslužieb, relácie, návštevy, pravidlá prihlasovania a koncové body exportu."
---

# Koncové body dochádzky

<div class="article-intro">

Modul Dochádzka spravuje pobočky, bohoslužby, časy bohoslužieb, relácie dochádzky, návštevy a relácie návštev. Poskytuje infraštruktúru na sledovanie, kto sa zúčastnil ktorej bohoslužby alebo stretnutia skupiny, podporuje pracovné postupy prezenčnej evidencie a ponúka reportovanie trendov a súhrnov dochádzky.

</div>

**Základná cesta:** `/attendance`

## Pobočky

Základná cesta: `/attendance/campuses`

Štandardný CRUD kontrolér (rozširuje GenericCrudController). Poskytuje trasy `getById`, `getAll`, `post` a `delete` cez základnú triedu CRUD.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/` | JWT | — | Zoznam všetkých pobočiek cirkvi |
| GET | `/:id` | JWT | — | Získať pobočku podľa ID |
| POST | `/` | JWT | Services.Edit | Vytvoriť alebo aktualizovať pobočky |
| DELETE | `/:id` | JWT | Services.Edit | Vymazať pobočku |

## Bohoslužby

Základná cesta: `/attendance/services`

Rozširuje GenericCrudController s trasami CRUD `getById`, `getAll`, `post` a `delete`. Koncové body `getAll` (`GET /`) a `search` sú prepísané vlastnými implementáciami.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/` | JWT | — | Zoznam všetkých bohoslužieb (vrátane informácií o pobočke) |
| GET | `/:id` | JWT | — | Získať bohoslužbu podľa ID |
| GET | `/search?campusId=` | JWT | — | Vyhľadať bohoslužby podľa ID pobočky |
| POST | `/` | JWT | Services.Edit | Vytvoriť alebo aktualizovať bohoslužby |
| DELETE | `/:id` | JWT | Services.Edit | Vymazať bohoslužbu |

### Príklad: Vyhľadanie bohoslužieb podľa pobočky

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

## Časy bohoslužieb

Základná cesta: `/attendance/servicetimes`

Rozširuje GenericCrudController s trasami CRUD `getById`, `post` a `delete`. Koncové body `getAll` a `search` sú vlastné implementácie.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/` | JWT | — | Zoznam všetkých časov bohoslužieb. Filtrovať pomocou `?serviceId=`. Pridaním `?include=groups` sa pripoja údaje o skupinách. Každý riadok obsahuje vypočítanú logickú hodnotu `checkinOpen` (false iba vtedy, ak má čas bohoslužby plán prezenčnej evidencie a jeho okno je práve zatvorené). Okno sa meria v časovom pásme pobočky bohoslužby, potom v časovom pásme cirkvi, potom v prvej pobočke, ktorá ho má, a nakoniec v `America/New_York` |
| GET | `/:id` | JWT | — | Získať čas bohoslužby podľa ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Vyhľadať časy bohoslužieb podľa pobočky a bohoslužby |
| GET | `/public/:churchId` | Verejné | — | Získať stromovú štruktúru pobočka → bohoslužba → čas pre cirkev. Poháňa prvok `serviceTimes` tvorcu webových stránok |
| POST | `/` | JWT | Services.Edit | Vytvoriť alebo aktualizovať časy bohoslužieb. Voliteľné polia rozvrhu: `dayOfWeek` (0 = nedeľa … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (pred začiatkom), `checkinCloseMinutes` (po skončení). Prezenčná evidencia je časovo obmedzená iba vtedy, ak sú nastavené `dayOfWeek` aj `startTime` |
| DELETE | `/:id` | JWT | Services.Edit | Vymazať čas bohoslužby |

## Časy bohoslužieb skupín

Základná cesta: `/attendance/groupservicetimes`

Prepája skupiny s konkrétnymi časmi bohoslužieb.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/` | JWT | — | Zoznam všetkých prepojení skupín a časov bohoslužieb. Filtrovať pomocou `?groupId=` na získanie prepojení s názvami bohoslužieb |
| GET | `/:id` | JWT | — | Získať prepojenie skupiny a času bohoslužby podľa ID |
| POST | `/` | JWT | Services.Edit | Vytvoriť alebo aktualizovať prepojenia skupín a časov bohoslužieb |
| DELETE | `/:id` | JWT | Services.Edit | Vymazať prepojenie skupiny a času bohoslužby |

## Záznamy o dochádzke

Základná cesta: `/attendance/attendancerecords`

Poskytuje súhrnné zobrazenia dochádzky iba na čítanie pre reportovanie a zobrazovanie.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/` | JWT | Attendance.View | Načítať záznamy dochádzky pre osobu. Vyžaduje `?personId=` |
| GET | `/my` | JWT | — | Samoobslužné: vlastné záznamy dochádzky prihláseného člena za posledných 12 mesiacov, od najnovšieho. Ak používateľ nie je prepojený s osobou, vráti `401`. Poháňa sekciu **Moja účasť** na stránke B1 Me |
| GET | `/tree` | JWT | — | Načítať úplný strom dochádzky (pobočky, bohoslužby, časy bohoslužieb, skupiny) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Načítať údaje o trende dochádzky s voliteľnými filtrami |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Načítať dochádzku skupín pre bohoslužbu v danom týždni |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Pre každú skupinu priradenú k času bohoslužby vrátiť `{ groupId, sessionId, attendanceCount }` pre daný dátum (`date` je `YYYY-MM-DD`; `sessionId` je null, ak skupina nemá reláciu). Poháňa dialóg **Kto ešte potrebuje zapísať účasť** v B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Vyhľadať záznamy dochádzky s filtrami (pobočka, bohoslužba, čas bohoslužby, skupina, rozsah dátumov) |

### Príklad: Trend dochádzky

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

## Stretnutia

Základná cesta: `/attendance/sessions`

Rozširuje GenericCrudController s trasami CRUD `getById` a `delete`. Koncové body `getAll` a `save` sú vlastné implementácie, ktoré tiež umožňujú vedúcim skupín spravovať stretnutia svojich skupín.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/` | JWT | Attendance.View alebo Vedúci skupiny | Zoznam všetkých stretnutí. Filtrovať pomocou `?groupId=` (vrátane názvov). Vedúci skupín môžu zobraziť stretnutia svojich skupín |
| GET | `/:id` | JWT | Attendance.View | Získať stretnutie podľa ID |
| POST | `/` | JWT | Attendance.Edit alebo Vedúci skupiny | Vytvoriť alebo aktualizovať stretnutia. Vedúci skupín môžu ukladať stretnutia pre svoje skupiny |
| DELETE | `/:id` | JWT | Attendance.Edit | Vymazať stretnutie |

## Návštevy

Základná cesta: `/attendance/visits`

Spravuje jednotlivé záznamy návštev (osoba, ktorá sa zúčastnila v konkrétny dátum) a poskytuje pracovný postup prezenčnej evidencie.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/` | JWT | Attendance.View | Zoznam všetkých návštev. Filtrovať pomocou `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Získať návštevu podľa ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View alebo Attendance.Checkin | Načítať údaje prezenčnej evidencie osôb na bohoslužbe. Vráti návštevy so stretnutiami návštev z posledného zaznamenaného dátumu |
| POST | `/` | JWT | Attendance.Edit | Vytvoriť alebo aktualizovať návštevy |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit alebo Attendance.Checkin | Odoslať údaje prezenčnej evidencie. Vytvára a aktualizuje návštevy a stretnutia návštev, odstraňuje zastaralé záznamy |
| DELETE | `/:id` | JWT | Attendance.Edit | Vymazať návštevu |

### Príklad: Postup prezenčnej evidencie

**Krok 1 -- Načítať existujúce údaje prezenčnej evidencie:**

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

**Krok 2 -- Odoslať prezenčnú evidenciu:**

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

Ak cieľový čas bohoslužby má plán prezenčnej evidencie a jeho okno je zatvorené (meria sa v rovnakom poradí časových pásiem, ktoré začína pobočkou ako pri `checkinOpen`), nič sa neuloží a odpoveď je `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Prekročenie kapacity alebo pomeru dobrovoľníkov tiež vracia 409 (`error: "capacity"` alebo `"ratio"`). Stretnutia, ktoré osoba už dnes má (znovu odoslané pri každej prezenčnej evidencii), preskakujú kontrolu okna, takže domácnosť môže pridať otvorený čas bohoslužby potom, ako už zatvorilo okno predchádzajúceho času.

## Stretnutia návštev

Základná cesta: `/attendance/visitsessions`

Spravuje prepojenie medzi návštevami a stretnutiami (ktoré konkrétne stretnutie osoba navštívila počas návštevy). Poskytuje aj koncový bod rýchleho zápisu a koncový bod na stiahnutie a export.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/` | JWT | Attendance.View alebo Vedúci skupiny | Zoznam stretnutí návštev. Filtrovať pomocou `?sessionId=`. Vedúci skupín môžu zobraziť stretnutia návštev svojich skupín |
| GET | `/:id` | JWT | Attendance.View | Získať stretnutie návštevy podľa ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Stiahnuť dochádzku pre stretnutie (vráti mená osôb so stavom prítomný alebo neprítomný) |
| POST | `/` | JWT | Attendance.Edit | Vytvoriť alebo aktualizovať stretnutia návštev |
| POST | `/log` | JWT | Attendance.Edit alebo Vedúci skupiny | Rýchlo zapísať účasť osoby na stretnutie. Ak je potrebné, automaticky vytvorí návštevu. Vedúci skupín môžu zapisovať účasť pre svoje skupiny |
| DELETE | `/:id` | JWT | Attendance.Edit | Vymazať stretnutie návštevy podľa ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit alebo Vedúci skupiny | Odstrániť osobu zo stretnutia. Vymaže stretnutie návštevy a nadradenú návštevu, ak nezostali žiadne stretnutia. Vedúci skupín môžu odstrániť dochádzku pre svoje skupiny |

### Príklad: Rýchly zápis účasti

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

### Príklad: Stiahnutie dochádzky stretnutia

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

## Série účasti

Základná cesta: `/attendance/streaks`

Sleduje série účasti jednotlivcov, teda po sebe idúce týždne, počas ktorých sa osoba zúčastnila. Užitočné pre metriky zapojenia a gamifikáciu.

| Metóda | Cesta | Overenie | Oprávnenie | Popis |
|--------|-------|----------|------------|-------|
| GET | `/person/:personId` | JWT | — | Načítať série účasti osoby |

## Súvisiace stránky

- [Koncové body členstva](./membership.md) — Osoby, skupiny, roly a správa cirkvi
- [Autentifikácia a oprávnenia](./authentication.md) — Postup prihlásenia, JWT, model oprávnení
- [Štruktúra modulov](../module-structure.md) — Vzory organizácie kódu
