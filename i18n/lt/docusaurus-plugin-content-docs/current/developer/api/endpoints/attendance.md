---
title: "Lankomumo galutiniai taškai"
description: "Lankomumo API nuorodos B1 Admin ir B1 Checkin: filialai, pamaldos, laikai, sesijos, apsilankymai, registracijos taisyklės ir eksporto galiniai taškai."
---

# Lankomumo galutiniai taškai

<div class="article-intro">

Lankomumo modulis valdo filialų vietas, pamaldas, pamaldų laikus, lankomumo sesijas, apsilankymus ir apsilankymo sesijas. Jis suteikia infrastruktūrą, skirtą sekti, kas dalyvavo kurioje pamaldose ar grupės susitikime, palaiko registracijos procesus ir pateikia lankomumo tendencijų bei suvestinių ataskaitų funkcijas.

</div>

**Bazinis kelias:** `/attendance`

## Filialai

Bazinis kelias: `/attendance/campuses`

Standartinis CRUD valdiklis (paveldi GenericCrudController). Per CRUD bazinę klasę pateikia `getById`, `getAll`, `post` ir `delete` maršrutus.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Išvardyti visus bažnyčios filialus |
| GET | `/:id` | JWT | — | Gauti filialą pagal ID |
| POST | `/` | JWT | Services.Edit | Sukurti arba atnaujinti filialus |
| DELETE | `/:id` | JWT | Services.Edit | Ištrinti filialą |

## Pamaldos

Bazinis kelias: `/attendance/services`

Paveldi GenericCrudController su CRUD maršrutais `getById`, `getAll`, `post` ir `delete`. Galutiniai taškai `getAll` (`GET /`) ir `search` perrašyti pagal individualias realizacijas.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Išvardyti visas pamaldas (įskaitant filialo informaciją) |
| GET | `/:id` | JWT | — | Gauti pamaldas pagal ID |
| GET | `/search?campusId=` | JWT | — | Ieškoti pamaldų pagal filialo ID |
| POST | `/` | JWT | Services.Edit | Sukurti arba atnaujinti pamaldas |
| DELETE | `/:id` | JWT | Services.Edit | Ištrinti pamaldas |

### Pavyzdys: pamaldų paieška pagal filialą

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

## Pamaldų laikai

Bazinis kelias: `/attendance/servicetimes`

Paveldi GenericCrudController su CRUD maršrutais `getById`, `post` ir `delete`. Galutiniai taškai `getAll` ir `search` yra individualios realizacijos.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Išvardyti visus pamaldų laikus. Filtruoti pagal `?serviceId=`. Pridėkite `?include=groups`, kad būtų pridėti grupių duomenys. Kiekvienoje eilutėje yra apskaičiuota `checkinOpen` loginė reikšmė (ji yra false tik tada, kai pamaldų laikas turi registracijos tvarkaraštį, kurio langas šiuo metu uždarytas). Langas matuojamas pagal pamaldų filialo laiko juostą, tada pagal bažnyčios laiko juostą, tada pagal pirmąjį filialą, turintį laiko juostą, ir galiausiai pagal `America/New_York` |
| GET | `/:id` | JWT | — | Gauti pamaldų laiką pagal ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Ieškoti pamaldų laikų pagal filialą ir pamaldas |
| GET | `/public/:churchId` | Viešas | — | Gauti bažnyčios medį: filialas → pamaldos → laikas. Maitina svetainės kūrėjo `serviceTimes` elementą |
| POST | `/` | JWT | Services.Edit | Sukurti arba atnaujinti pamaldų laikus. Papildomi tvarkaraščio laukai: `dayOfWeek` (0 = sekmadienis … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (prieš pradžią), `checkinCloseMinutes` (po pabaigos). Registracija riboja laiką tik tada, kai nustatyti ir `dayOfWeek`, ir `startTime` |
| DELETE | `/:id` | JWT | Services.Edit | Ištrinti pamaldų laiką |

## Grupių pamaldų laikai

Bazinis kelias: `/attendance/groupservicetimes`

Sieja grupes su konkrečiais pamaldų laikais.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Išvardyti visas grupės ir pamaldų laiko sąsajas. Filtruoti pagal `?groupId=`, kad gautumėte sąsajas su pamaldų pavadinimais |
| GET | `/:id` | JWT | — | Gauti grupės ir pamaldų laiko sąsają pagal ID |
| POST | `/` | JWT | Services.Edit | Sukurti arba atnaujinti grupės ir pamaldų laiko sąsajas |
| DELETE | `/:id` | JWT | Services.Edit | Ištrinti grupės ir pamaldų laiko sąsają |

## Lankomumo įrašai

Bazinis kelias: `/attendance/attendancerecords`

Pateikia tik skaitymui skirtas bendrąsias lankomumo duomenų peržiūras ataskaitoms ir atvaizdavimui.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/` | JWT | Attendance.View | Įkelti asmens lankomumo įrašus. Reikalingas `?personId=` |
| GET | `/my` | JWT | — | Tik savo duomenys: prisijungusio nario lankomumo įrašai už paskutinius 12 mėnesių, nuo naujausių. Grąžina `401`, jei vartotojas nesusietas su asmeniu. Maitina **Mano lankomumo** skyrių B1 Me puslapyje |
| GET | `/tree` | JWT | — | Įkelti visą lankomumo medį (filialai, pamaldos, pamaldų laikai, grupės) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Įkelti lankomumo tendencijų duomenis su pasirenkamais filtrais |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Įkelti grupių lankomumą pamaldoms nurodytą savaitę |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Kiekvienai pamaldų laikui priskirtai grupei grąžinti `{ groupId, sessionId, attendanceCount }` tai datai (`date` yra `YYYY-MM-DD`; `sessionId` yra null, jei grupė neturi sesijos). Maitina B1Admin dialogą **Kas dar nepažymėtas** |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Ieškoti lankomumo įrašų pagal filtrus (filialas, pamaldos, pamaldų laikas, grupė, datų intervalas) |

### Pavyzdys: lankomumo tendencija

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

## Sesijos

Bazinis kelias: `/attendance/sessions`

Paveldi GenericCrudController su CRUD maršrutais `getById` ir `delete`. Galutiniai taškai `getAll` ir `save` yra individualios realizacijos, leidžiančios grupių vadovams tvarkyti savo grupių sesijas.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/` | JWT | Attendance.View arba grupės vadovas | Išvardyti visas sesijas. Filtruoti pagal `?groupId=` (įtraukia pavadinimus). Grupių vadovai gali peržiūrėti savo grupių sesijas |
| GET | `/:id` | JWT | Attendance.View | Gauti sesiją pagal ID |
| POST | `/` | JWT | Attendance.Edit arba grupės vadovas | Sukurti arba atnaujinti sesijas. Grupių vadovai gali išsaugoti savo grupių sesijas |
| DELETE | `/:id` | JWT | Attendance.Edit | Ištrinti sesiją |

## Apsilankymai

Bazinis kelias: `/attendance/visits`

Tvarko atskirus apsilankymų įrašus (asmens dalyvavimas konkrečią dieną) ir pateikia registracijos procesą.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/` | JWT | Attendance.View | Išvardyti visus apsilankymus. Filtruoti pagal `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Gauti apsilankymą pagal ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View arba Attendance.Checkin | Įkelti asmenų registracijos duomenis pamaldoms. Grąžina apsilankymus su apsilankymo sesijomis nuo paskutinės įrašytos datos |
| POST | `/` | JWT | Attendance.Edit | Sukurti arba atnaujinti apsilankymus |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit arba Attendance.Checkin | Pateikti registracijos duomenis. Sukuria arba atnaujina apsilankymus ir apsilankymo sesijas, pašalina pasenusius įrašus |
| DELETE | `/:id` | JWT | Attendance.Edit | Ištrinti apsilankymą |

### Pavyzdys: registracijos eiga

**1 žingsnis – įkelti esamus registracijos duomenis:**

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

**2 žingsnis – pateikti registraciją:**

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

Jei nurodytas pamaldų laikas turi registracijos tvarkaraštį ir jo langas uždarytas (matuojama tokia pačia laiko juostos tvarka, kaip ir `checkinOpen`, pradedant filialu), niekas neišsaugoma, o atsakymas yra `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Talpos ir savanorių santykio pažeidimai taip pat grąžina 409 (`error: "capacity"` arba `"ratio"`). Sesijos, kurias asmuo jau turi šiandien (pakartotinai siunčiamos su kiekviena registracija), praleidžia lango tikrinimą, todėl šeima gali pridėti atviras pamaldas po to, kai ankstesnių pamaldų langas jau uždarytas.

## Apsilankymo sesijos

Bazinis kelias: `/attendance/visitsessions`

Tvarko ryšį tarp apsilankymų ir sesijų (kurioje konkrečioje sesijoje asmuo dalyvavo apsilankymo metu). Taip pat pateikia greitojo įrašymo ir atsisiuntimo / eksporto galutinius taškus.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/` | JWT | Attendance.View arba grupės vadovas | Išvardyti apsilankymo sesijas. Filtruoti pagal `?sessionId=`. Grupių vadovai gali peržiūrėti savo grupių apsilankymo sesijas |
| GET | `/:id` | JWT | Attendance.View | Gauti apsilankymo sesiją pagal ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Atsisiųsti sesijos lankomumą (grąžina asmenų vardus su būsenomis „dalyvavo“ / „nedalyvavo“) |
| POST | `/` | JWT | Attendance.Edit | Sukurti arba atnaujinti apsilankymo sesijas |
| POST | `/log` | JWT | Attendance.Edit arba grupės vadovas | Greitai įrašyti asmens lankomumą sesijai. Prireikus automatiškai sukuria apsilankymą. Grupių vadovai gali įrašyti lankomumą savo grupėms |
| DELETE | `/:id` | JWT | Attendance.Edit | Ištrinti apsilankymo sesiją pagal ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit arba grupės vadovas | Pašalinti asmenį iš sesijos. Ištrina apsilankymo sesiją, o jei sesijų nelieka, ir tėvinį apsilankymą. Grupių vadovai gali pašalinti lankomumą savo grupėms |

### Pavyzdys: greitas lankomumo įrašymas

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

### Pavyzdys: sesijos lankomumo atsisiuntimas

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

## Serijos

Bazinis kelias: `/attendance/streaks`

Seka asmenų lankomumo serijas – iš eilės einančias savaites, per kurias asmuo dalyvavo. Naudinga įsitraukimo metrikoms ir žaidybiniams elementams.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/person/:personId` | JWT | — | Įkelti asmens lankomumo serijas |

## Susiję puslapiai

- [Narystės galutiniai taškai](./membership.md) — Asmenys, grupės, vaidmenys ir bažnyčios valdymas
- [Autentifikacija ir leidimai](./authentication.md) — Prisijungimo eiga, JWT, leidimų modelis
- [Modulio struktūra](../module-structure.md) — Kodo organizavimo modeliai
