---
title: "Attendance-päätepisteet"
---

# Attendance-päätepisteet

<div class="article-intro">

Attendance-moduuli hallinnoi kampuksia, palveluita, palveluaikoja, osallistumisistuntoja, käyntejä ja käyntiistuntoja. Se tarjoaa perustan sen seuraamiseen, kuka osallistui mihinkin palveluun tai ryhmäkokoukseen, tukee sisäänkirjautumisprosesseja ja tarjoaa osallistumisen trendi- ja yhteenvetoraportointia.

</div>

**Perusreitti:** `/attendance`

## Kampukset

Perusreitti: `/attendance/campuses`

Tavallinen CRUD-kontrolleri (laajentaa GenericCrudController-luokkaa). Tarjoaa `getById`-, `getAll`-, `post`- ja `delete`-reitit CRUD-perusluokan kautta.

| Metodi | Polku | Todennus | Oikeus | Kuvaus |
|--------|-------|----------|--------|--------|
| GET | `/` | JWT | — | Listaa kaikki seurakunnan kampukset |
| GET | `/:id` | JWT | — | Hae kampus tunnuksella |
| POST | `/` | JWT | Services.Edit | Luo tai päivitä kampuksia |
| DELETE | `/:id` | JWT | Services.Edit | Poista kampus |

## Palvelut

Perusreitti: `/attendance/services`

Laajentaa GenericCrudController-luokkaa CRUD-reiteillä `getById`, `getAll`, `post` ja `delete`. Reitit `getAll` (`GET /`) ja `search` on korvattu omilla toteutuksilla.

| Metodi | Polku | Todennus | Oikeus | Kuvaus |
|--------|-------|----------|--------|--------|
| GET | `/` | JWT | — | Listaa kaikki palvelut (sisältää kampuksen tiedot) |
| GET | `/:id` | JWT | — | Hae palvelu tunnuksella |
| GET | `/search?campusId=` | JWT | — | Hae palveluita kampuksen tunnuksella |
| POST | `/` | JWT | Services.Edit | Luo tai päivitä palveluita |
| DELETE | `/:id` | JWT | Services.Edit | Poista palvelu |

### Esimerkki: Hae palveluita kampuksen mukaan

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

## Palveluajat

Perusreitti: `/attendance/servicetimes`

Laajentaa GenericCrudController-luokkaa CRUD-reiteillä `getById`, `post` ja `delete`. Reitit `getAll` ja `search` ovat omia toteutuksia.

| Metodi | Polku | Todennus | Oikeus | Kuvaus |
|--------|-------|----------|--------|--------|
| GET | `/` | JWT | — | Listaa kaikki palveluajat. Suodata `?serviceId=`-parametrilla. Lisää `?include=groups` liittääksesi ryhmätiedot. Jokaisella rivillä on laskettu `checkinOpen`-totuusarvo (epätosi vain, jos palveluajalla on sisäänkirjautumisaikataulu, jonka ikkuna on juuri nyt suljettu). Ikkuna mitataan palvelun kampuksen aikavyöhykkeessä, sitten seurakunnan aikavyöhykkeessä, sitten ensimmäisen aikavyöhykkeen omaavan kampuksen aikavyöhykkeessä ja lopuksi `America/New_York`-aikavyöhykkeessä |
| GET | `/:id` | JWT | — | Hae palveluaika tunnuksella |
| GET | `/search?campusId=&serviceId=` | JWT | — | Hae palveluaikoja kampuksen ja palvelun mukaan |
| GET | `/public/:churchId` | Julkinen | — | Hae seurakunnan kampus → palvelu → palveluaika -puu. Tukee verkkosivurakentajan `serviceTimes`-elementtiä |
| POST | `/` | JWT | Services.Edit | Luo tai päivitä palveluaikoja. Valinnaiset aikataulukentät: `dayOfWeek` (0 = sunnuntai … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (ennen alkua), `checkinCloseMinutes` (lopun jälkeen). Sisäänkirjautuminen on aikarajattu vain, kun sekä `dayOfWeek` että `startTime` on asetettu |
| DELETE | `/:id` | JWT | Services.Edit | Poista palveluaika |

## Ryhmien palveluajat

Perusreitti: `/attendance/groupservicetimes`

Yhdistää ryhmiä tiettyihin palveluaikoihin.

| Metodi | Polku | Todennus | Oikeus | Kuvaus |
|--------|-------|----------|--------|--------|
| GET | `/` | JWT | — | Listaa kaikki ryhmä-palveluaika-yhteydet. Suodata `?groupId=`-parametrilla saadaksesi yhteydet palvelujen nimineen |
| GET | `/:id` | JWT | — | Hae ryhmä-palveluaika-yhteys tunnuksella |
| POST | `/` | JWT | Services.Edit | Luo tai päivitä ryhmä-palveluaika-yhteyksiä |
| DELETE | `/:id` | JWT | Services.Edit | Poista ryhmä-palveluaika-yhteys |

## Osallistumistietueet

Perusreitti: `/attendance/attendancerecords`

Tarjoaa vain-luku-yhteenvetonäkymiä osallistumistiedoista raportointia ja näyttämistä varten.

| Metodi | Polku | Todennus | Oikeus | Kuvaus |
|--------|-------|----------|--------|--------|
| GET | `/` | JWT | Attendance.View | Lataa henkilön osallistumistietueet. Vaatii `?personId=`-parametrin |
| GET | `/my` | JWT | — | Vain omat tiedot: kirjautuneen jäsenen omat osallistumistietueet viimeiseltä 12 kuukaudelta, uusimmat ensin. Palauttaa `401`, jos käyttäjää ei ole liitetty henkilöön. Tukee B1 Me -sivun **Oma osallistuminen** -osiota |
| GET | `/tree` | JWT | — | Lataa koko osallistumispuu (kampukset, palvelut, palveluajat, ryhmät) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Lataa osallistumistrendin tiedot valinnaisin suodattimin |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Lataa ryhmien osallistuminen palveluun tiettynä viikkona |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Palauttaa jokaiselle palveluaikaan määritetylle ryhmälle objektin `{ groupId, sessionId, attendanceCount }` kyseiseltä päivältä (`date` on muodossa `YYYY-MM-DD`; `sessionId` on null, jos ryhmällä ei ole istuntoa). Tukee B1Admin-sovelluksen **Kenellä osallistuminen vielä puuttuu** -valintaikkunaa |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Hae osallistumistietueita suodattimin (kampus, palvelu, palveluaika, ryhmä, päivämääräväli) |

### Esimerkki: Osallistumistrendi

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

## Istunnot

Perusreitti: `/attendance/sessions`

Laajentaa GenericCrudController-luokkaa CRUD-reiteillä `getById` ja `delete`. Reitit `getAll` ja `save` ovat omia toteutuksia, jotka sallivat myös ryhmänjohtajien hallita oman ryhmänsä istuntoja.

| Metodi | Polku | Todennus | Oikeus | Kuvaus |
|--------|-------|----------|--------|--------|
| GET | `/` | JWT | Attendance.View tai ryhmänjohtaja | Listaa kaikki istunnot. Suodata `?groupId=`-parametrilla (sisältää nimet). Ryhmänjohtajat voivat tarkastella oman ryhmänsä istuntoja |
| GET | `/:id` | JWT | Attendance.View | Hae istunto tunnuksella |
| POST | `/` | JWT | Attendance.Edit tai ryhmänjohtaja | Luo tai päivitä istuntoja. Ryhmänjohtajat voivat tallentaa istuntoja omille ryhmilleen |
| DELETE | `/:id` | JWT | Attendance.Edit | Poista istunto |

## Käynnit

Perusreitti: `/attendance/visits`

Hallinnoi yksittäisiä käyntitietueita (henkilö osallistuu tiettynä päivänä) ja tarjoaa sisäänkirjautumisprosessin.

| Metodi | Polku | Todennus | Oikeus | Kuvaus |
|--------|-------|----------|--------|--------|
| GET | `/` | JWT | Attendance.View | Listaa kaikki käynnit. Suodata `?personId=`-parametrilla |
| GET | `/:id` | JWT | Attendance.View | Hae käynti tunnuksella |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View tai Attendance.Checkin | Lataa palvelun henkilöiden sisäänkirjautumistiedot. Palauttaa käynnit käyntiistuntoineen viimeisestä kirjatusta päivästä |
| POST | `/` | JWT | Attendance.Edit | Luo tai päivitä käyntejä |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit tai Attendance.Checkin | Lähetä sisäänkirjautumistiedot. Luo tai päivittää käyntejä ja käyntiistuntoja sekä poistaa vanhentuneet tietueet |
| DELETE | `/:id` | JWT | Attendance.Edit | Poista käynti |

### Esimerkki: Sisäänkirjautumisen kulku

**Vaihe 1 -- Lataa olemassa olevat sisäänkirjautumistiedot:**

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

**Vaihe 2 -- Lähetä sisäänkirjautuminen:**

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

Jos kohteena oleva palveluaika on sisäänkirjautumisaikataulun alainen ja sen ikkuna on suljettu (mitattuna samassa kampusetusisessa aikavyöhykejärjestyksessä kuin `checkinOpen`), mitään ei tallenneta ja vastaus on `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Kapasiteetti- ja vapaaehtoissuhderikkomukset palauttavat myös 409-virheen (`error: "capacity"` tai `"ratio"`). Istunnot, joihin henkilöllä on jo tänään oikeus (lähetetään uudelleen jokaisen sisäänkirjautumisen yhteydessä), ohittavat ikkunatarkistuksen, joten talous voi lisätä avoimen palveluajan sen jälkeen, kun aiemman palveluajan ikkuna on sulkeutunut.

## Käyntiistunnot

Perusreitti: `/attendance/visitsessions`

Hallinnoi käyntien ja istuntojen välistä yhteyttä (mihin tiettyyn istuntoon henkilö osallistui käynnin aikana). Tarjoaa myös pikakirjauksen ja lataus-/vientipäätepisteen.

| Metodi | Polku | Todennus | Oikeus | Kuvaus |
|--------|-------|----------|--------|--------|
| GET | `/` | JWT | Attendance.View tai ryhmänjohtaja | Listaa käyntiistunnot. Suodata `?sessionId=`-parametrilla. Ryhmänjohtajat voivat tarkastella oman ryhmänsä käyntiistuntoja |
| GET | `/:id` | JWT | Attendance.View | Hae käyntiistunto tunnuksella |
| GET | `/download/:sessionId` | JWT | Attendance.View | Lataa istunnon osallistuminen (palauttaa henkilöiden nimet läsnäolo- tai poissaolotilalla) |
| POST | `/` | JWT | Attendance.Edit | Luo tai päivitä käyntiistuntoja |
| POST | `/log` | JWT | Attendance.Edit tai ryhmänjohtaja | Kirjaa henkilön osallistuminen istuntoon pikana. Luo käynnin automaattisesti tarvittaessa. Ryhmänjohtajat voivat kirjata osallistumisen omille ryhmilleen |
| DELETE | `/:id` | JWT | Attendance.Edit | Poista käyntiistunto tunnuksella |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit tai ryhmänjohtaja | Poista henkilö istunnosta. Poistaa käyntiistunnon ja emokäynnin, jos istuntoja ei enää jää. Ryhmänjohtajat voivat poistaa osallistumisia omista ryhmistään |

### Esimerkki: Osallistumisen pikakirjaus

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

### Esimerkki: Istunnon osallistumisen lataus

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

## Putket

Perusreitti: `/attendance/streaks`

Seuraa yksittäisten henkilöiden osallistumisputkia eli peräkkäisiä viikkoja, joina henkilö on osallistunut. Hyödyllinen sitoutumismittareille ja pelillistämiseen.

| Metodi | Polku | Todennus | Oikeus | Kuvaus |
|--------|-------|----------|--------|--------|
| GET | `/person/:personId` | JWT | — | Lataa henkilön osallistumisputket |

## Liittyvät sivut

- [Membership-päätepisteet](./membership) — Henkilöt, ryhmät, roolit ja seurakunnan hallinta
- [Todennus ja oikeudet](./authentication) — Kirjautumisprosessi, JWT, oikeusmalli
- [Moduulirakenne](../module-structure) — Koodin järjestelyn mallit
