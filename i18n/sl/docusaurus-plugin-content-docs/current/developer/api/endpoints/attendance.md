---
title: "Končne točke za obiskanost"
---

# Končne točke za obiskanost

<div class="article-intro">

Modul za obiskanost upravlja kampusne lokacije, bogoslužja, čase bogoslužij, seje obiskanosti, obiske in seje obiskov. Zagotavlja infrastrukturo za sledenje, kdo je obiskal katero bogoslužje ali srečanje skupine, podpira postopke prijave ob prihodu in ponuja poročila o trendih ter povzetke obiskanosti.

</div>

**Osnovna pot:** `/attendance`

## Kampusi

Osnovna pot: `/attendance/campuses`

Standardni CRUD krmilnik (razširja GenericCrudController). Prek osnovnega razreda CRUD zagotavlja poti `getById`, `getAll`, `post` in `delete`.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | — | Seznam vseh kampusov za cerkev |
| GET | `/:id` | JWT | — | Pridobi kampus po ID-ju |
| POST | `/` | JWT | Services.Edit | Ustvari ali posodobi kampuse |
| DELETE | `/:id` | JWT | Services.Edit | Izbriše kampus |

## Bogoslužja

Osnovna pot: `/attendance/services`

Razširja GenericCrudController s potmi CRUD `getById`, `getAll`, `post` in `delete`. Končnici `getAll` (`GET /`) in `search` sta prepisani z lastnimi implementacijami.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | — | Seznam vseh bogoslužij (vključuje podatke o kampusu) |
| GET | `/:id` | JWT | — | Pridobi bogoslužje po ID-ju |
| GET | `/search?campusId=` | JWT | — | Išči bogoslužja po ID-ju kampusa |
| POST | `/` | JWT | Services.Edit | Ustvari ali posodobi bogoslužja |
| DELETE | `/:id` | JWT | Services.Edit | Izbriše bogoslužje |

### Primer: iskanje bogoslužij po kampusu

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

## Časi bogoslužij

Osnovna pot: `/attendance/servicetimes`

Razširja GenericCrudController s potmi CRUD `getById`, `post` in `delete`. Končnici `getAll` in `search` imata lastni implementaciji.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | — | Seznam vseh časov bogoslužij. Filtriraj s `?serviceId=`. Dodaj `?include=groups`, da dodaš podatke o skupinah. Vsaka vrstica vključuje izračunano logično vrednost `checkinOpen` (false le, če ima čas bogoslužja urnik prijave, katerega okno je trenutno zaprto). Okno se meri v časovnem pasu kampusa bogoslužja, nato v časovnem pasu cerkve, nato v prvem kampusu, ki ga ima, nato v `America/New_York` |
| GET | `/:id` | JWT | — | Pridobi čas bogoslužja po ID-ju |
| GET | `/search?campusId=&serviceId=` | JWT | — | Išči čase bogoslužij po kampusu in bogoslužju |
| GET | `/public/:churchId` | Javno | — | Pridobi drevo kampus → bogoslužje → čas za cerkev. Napaja element `serviceTimes` v graditelju spletnih strani |
| POST | `/` | JWT | Services.Edit | Ustvari ali posodobi čase bogoslužij. Neobvezna polja urnika: `dayOfWeek` (0 = nedelja … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (pred začetkom), `checkinCloseMinutes` (po koncu). Prijava je časovno omejena le, če sta nastavljena oba polja `dayOfWeek` in `startTime` |
| DELETE | `/:id` | JWT | Services.Edit | Izbriše čas bogoslužja |

## Časi bogoslužij skupin

Osnovna pot: `/attendance/groupservicetimes`

Poveže skupine z določenimi časi bogoslužij.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | — | Seznam vseh povezav med skupinami in časi bogoslužij. Filtriraj s `?groupId=`, da dobiš povezave z imeni bogoslužij |
| GET | `/:id` | JWT | — | Pridobi povezavo med skupino in časom bogoslužja po ID-ju |
| POST | `/` | JWT | Services.Edit | Ustvari ali posodobi povezave med skupinami in časi bogoslužij |
| DELETE | `/:id` | JWT | Services.Edit | Izbriše povezavo med skupino in časom bogoslužja |

## Zapisi obiskanosti

Osnovna pot: `/attendance/attendancerecords`

Zagotavlja samo za branje agregirane poglede na podatke o obiskanosti za poročila in prikaz.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | Attendance.View | Naloži zapise obiskanosti za osebo. Zahteva `?personId=` |
| GET | `/my` | JWT | — | Samo za prijavljenega uporabnika: lastni zapisi obiskanosti prijavljenega člana za zadnjih 12 mesecev, od najnovejšega. Vrne `401`, če uporabnik ni povezan z osebo. Napaja razdelek **Moja obiskanost** na strani B1 Me |
| GET | `/tree` | JWT | — | Naloži celotno drevo obiskanosti (kampusi, bogoslužja, časi bogoslužij, skupine) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Naloži podatke o trendu obiskanosti z neobveznimi filtri |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Naloži obiskanost skupin za bogoslužje v določenem tednu |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Za vsako skupino, dodeljeno času bogoslužja, vrne `{ groupId, sessionId, attendanceCount }` za ta datum (`date` je `YYYY-MM-DD`; `sessionId` je null, če skupina nima seje). Napaja pogovorno okno **Kdo še potrebuje prisotnost** v B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Išči zapise obiskanosti s filtri (kampus, bogoslužje, čas bogoslužja, skupina, časovni razpon) |

### Primer: trend obiskanosti

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

## Seje

Osnovna pot: `/attendance/sessions`

Razširja GenericCrudController s potmi CRUD `getById` in `delete`. Končnici `getAll` in `save` sta lastni implementaciji, ki vodjem skupin omogočata tudi upravljanje sej za njihove skupine.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | Attendance.View ali vodja skupine | Seznam vseh sej. Filtriraj s `?groupId=` (vključuje imena). Vodje skupin lahko pregledujejo seje za svoje skupine |
| GET | `/:id` | JWT | Attendance.View | Pridobi sejo po ID-ju |
| POST | `/` | JWT | Attendance.Edit ali vodja skupine | Ustvari ali posodobi seje. Vodje skupin lahko shranjujejo seje za svoje skupine |
| DELETE | `/:id` | JWT | Attendance.Edit | Izbriše sejo |

## Obiski

Osnovna pot: `/attendance/visits`

Upravlja posamezne zapise obiskov (oseba, ki obiskuje na določen datum) in zagotavlja postopek prijave ob prihodu.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | Attendance.View | Seznam vseh obiskov. Filtriraj s `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Pridobi obisk po ID-ju |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View ali Attendance.Checkin | Naloži podatke o prijavi ob prihodu za osebe na bogoslužju. Vrne obiske s sejami obiska iz zadnjega zabeleženega datuma |
| POST | `/` | JWT | Attendance.Edit | Ustvari ali posodobi obiske |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit ali Attendance.Checkin | Pošlji podatke o prijavi ob prihodu. Ustvari ali posodobi obiske in seje obiska ter odstrani zastarele zapise |
| DELETE | `/:id` | JWT | Attendance.Edit | Izbriše obisk |

### Primer: postopek prijave ob prihodu

**Korak 1 -- Naloži obstoječe podatke o prijavi:**

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

**Korak 2 -- Pošlji prijavo:**

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

Če ima ciljni čas bogoslužja urnik prijave in je njegovo okno zaprto (merjeno v enakem vrstnem redu časovnih pasov kot pri `checkinOpen`, s prednostjo kampusa), se ničesar ne shrani in odgovor je `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Kršitve kapacitete in razmerja prostovoljcev prav tako vrnejo 409 (`error: "capacity"` ali `"ratio"`). Seje, ki jih oseba že ima danes (ponovno poslane pri vsaki prijavi), preskočijo preverjanje okna, zato lahko gospodinjstvo doda odprt čas bogoslužja, potem ko je okno prejšnjega že zaprto.

## Seje obiska

Osnovna pot: `/attendance/visitsessions`

Upravlja povezavo med obiski in sejami (katero določeno sejo je oseba obiskala med obiskom). Zagotavlja tudi hitro beleženje in končno točko za prenos ali izvoz.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/` | JWT | Attendance.View ali vodja skupine | Seznam sej obiska. Filtriraj s `?sessionId=`. Vodje skupin lahko pregledujejo seje obiska za svoje skupine |
| GET | `/:id` | JWT | Attendance.View | Pridobi sejo obiska po ID-ju |
| GET | `/download/:sessionId` | JWT | Attendance.View | Prenesi obiskanost za sejo (vrne imena oseb s statusom prisoten ali odsoten) |
| POST | `/` | JWT | Attendance.Edit | Ustvari ali posodobi seje obiska |
| POST | `/log` | JWT | Attendance.Edit ali vodja skupine | Hitro zabeleži obiskanost osebe na seji. Samodejno ustvari obisk, če je potreben. Vodje skupin lahko beležijo obiskanost za svoje skupine |
| DELETE | `/:id` | JWT | Attendance.Edit | Izbriše sejo obiska po ID-ju |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit ali vodja skupine | Odstrani osebo iz seje. Izbriše sejo obiska in nadrejeni obisk, če ne ostane nobena seja. Vodje skupin lahko odstranijo obiskanost za svoje skupine |

### Primer: hitro beleženje obiskanosti

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

### Primer: prenos obiskanosti seje

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

## Zaporedja obiskov

Osnovna pot: `/attendance/streaks`

Spremlja zaporedja obiskanosti posameznikov -- zaporedne tedne, v katerih je oseba obiskovala. Uporabno za merjenje angažiranosti in gamifikacijo.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|-----|---------------|------------|------|
| GET | `/person/:personId` | JWT | — | Naloži zaporedja obiskanosti za osebo |

## Sorodne strani

- [Končne točke članstva](./membership) — Osebe, skupine, vloge in upravljanje cerkve
- [Overjanje in dovoljenja](./authentication) — Potek prijave, JWT, model dovoljenj
- [Struktura modula](../module-structure) — Vzorci organizacije kode
