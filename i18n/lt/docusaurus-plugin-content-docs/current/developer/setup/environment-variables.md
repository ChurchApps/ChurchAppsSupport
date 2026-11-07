---
title: "Aplinkos kintamieji"
---

# Aplinkos kintamieji

<div class="article-intro">

Kiekvienas ChurchApps projektas vietinei konfigūracijai naudoja `.env` failą. Kiekvienas projektas turi pavyzdinį failą, kurį nukopijuojate ir pritaikote. Šiame puslapyje aprašomi API, žiniatinklio programų ir mobiliųjų programų aplinkos kintamieji, įskaitant tai, kaip pasirinkti demonstracinį ar vietinį API tikslą.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiekite savo projektui reikalingus [reikalavimus](./prerequisites)
- Klonuokite projekto saugyklą, su kuria norite dirbti
- Peržiūrėkite [Projekto apžvalgą](./project-overview), kad suprastumėte, kokių API modulių jūsų projektui reikia

</div>

## Bendras modelis

1. Projekto šakniniame kataloge ieškokite `dotenv.sample.txt` arba `.env.sample`.
2. Nukopijuokite jį į `.env`.
3. Pagal poreikį pakeiskite reikšmes.

```bash
# Pavyzdys projektui su .env.sample
cp .env.sample .env

# Pavyzdys projektui su dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Niekada nekelkite `.env` failų į versijų valdymo sistemą.** Juose yra slaptų duomenų, pavyzdžiui, duomenų bazės prisijungimo duomenų, API raktų ir JWT paslapčių. Visi ChurchApps projektai įtraukia `.env` į `.gitignore`, tačiau prieš įkeldami visada patikrinkite dar kartą.
:::

## API tikslo pasirinkimas

Svarbiausias sprendimas – kur jūsų sąsaja siunčia API užklausas. Yra dvi galimybės:

### 1 variantas: demonstraciniai API (rekomenduojama sąsajos kūrimui)

Naudokite bendrą demonstracinę aplinką. Nereikia vietinio API ar duomenų bazės sąrankos. Ji veikia pagal naujausią kodą iš `main` šakos, o jos pavyzdiniai duomenys kiekvieną naktį atnaujinami.

```bash
# Bazinio URL šablonas
https://api.demo.churchapps.org/{module}

# Modulių URL pavyzdžiai
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Pakopinė aplinka (`api.staging.churchapps.org`, `api.staging.lessons.church` ir susiję serveriai) buvo išjungta. Kai kuriuose pavyzdiniuose `.env` failuose vis dar gali būti pakopinių URL; pakeiskite juos į demonstracines ar vietines reikšmes, nurodytas šiame puslapyje. Bendro ne produkcinio Lessons API nebėra – jei jo reikia, paleiskite [LessonsApi](https://github.com/ChurchApps/LessonsApi) vietiniu būdu (jis klausosi prievado `8090`).
:::

### 2 variantas: vietinis API

Paleiskite Api projektą savo kompiuteryje. Reikia MySQL 8.0+ su duomenų bazėmis, sukurtomis kiekvienam moduliui. Žr. [vietinio API sąrankos](../api/local-setup) vadovą.

```bash
# Bazinio URL šablonas
http://localhost:8084/{module}

# Modulių URL pavyzdžiai
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API aplinkos kintamieji

Pagrindinis **Api** projektas (`.env.sample`) turi daugiausia konfigūracijos. Čia pateikiami svarbiausi kintamieji:

### Bendri nustatymai

| Kintamasis | Aprašymas | Pavyzdys |
|----------|-------------|---------|
| `ENVIRONMENT` | Vykdymo aplinka | `dev` |
| `SERVER_PORT` | HTTP prievadas vietiniam kūrimo serveriui | `8084` |
| `ENCRYPTION_KEY` | 192 bitų šifravimo raktas neskelbtiniams duomenims | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Paslaptis JSON Web Token pasirašymui | `jwt-secret-dev` |
| `FILE_STORE` | Kur saugoti įkeltus failus (`disk` arba `s3`) | `disk` |
| `CORS_ORIGIN` | Leidžiami CORS šaltiniai (`*` vietiniam kūrimui) | `*` |

### Duomenų bazės ryšys

Vienas bazinis URL nukreipia API į MySQL. API iš šio pagrindo sukuria po vieną duomenų bazę kiekvienam moduliui (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Kintamasis | Pavyzdys |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Atnaujinkite `root:password` savo tikraisiais MySQL prisijungimo duomenimis. Prieš paleisdami API, turite sukurti kiekvieno modulio duomenų bazę. Naudokite `npm run initdb`, kad sukurtumėte schemą visiems moduliams, arba `npm run initdb:membership` vienam moduliui.
:::

### WebSocket nustatymai

| Kintamasis | Aprašymas | Pavyzdys |
|----------|-------------|---------|
| `SOCKET_PORT` | WebSocket serverio prievadas | `8087` |
| `SOCKET_URL` | WebSocket URL, prie kurio jungiasi klientai | `ws://localhost:8087` |

---

## Žiniatinklio programų aplinkos kintamieji

### B1Admin (React + Vite)

Pavyzdinis failas: `.env.sample`

| Kintamasis | Aprašymas | Pavyzdys (demonstracinė) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Aplinkos pavadinimas | `demo` |
| `PORT` | Kūrimo serverio prievadas | `3101` |
| `REACT_APP_API_BASE` | Vienas bazinis URL visiems ChurchApps API (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` pridedami automatiškai) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | Turinio pristatymo URL | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (neprivaloma) | `UA-123456789-1` |

Vietiniam API kūrimui nukreipkite bazinį URL į savo vietinę aplinką:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Pavyzdinis failas: `.env.sample`

| Kintamasis | Aprašymas | Pavyzdys (demonstracinė) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Vienas bazinis URL visiems ChurchApps API (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` pridedami automatiškai) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Turinio pristatymo URL | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (neprivaloma) | `UA-123456789-1` |

:::info
Next.js reikalauja `NEXT_PUBLIC_` priešdėlio kiekvienam aplinkos kintamajam, kurį reikia pasiekti naršyklėje. Kintamiesiems, skirtiems tik serveriui, šio priešdėlio nereikia.
:::

### LessonsApp (Next.js)

Pavyzdinis failas: `dotenv.sample.txt`

| Kintamasis | Aprašymas | Pavyzdys (vietinis LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Aplinkos etapas (palikite nenustatytą arba `dev` vietiniam kūrimui) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API URL | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Turinio pristatymo URL | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | ChurchApps API bazė, naudojama prisijungimui (taikoma tik tada, kai `STAGE` nenustatytas arba yra `dev`) | `https://api.demo.churchapps.org` |

---

## Mobiliųjų programų aplinkos kintamieji

### B1Mobile (React Native / Expo)

Pavyzdinis failas: `dotenv.sample.txt`

| Kintamasis | Aprašymas | Pavyzdys (demonstracinė) |
|----------|-------------|----------------|
| `STAGE` | Aplinkos pavadinimas | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Vienas URL kiekvienam ChurchApps API moduliui (kiekvienas pagal numatytuosius nustatymus naudoja produkcinę aplinką, jei nenustatytas) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons API (atskiras serveris; bendros ne produkcinės aplinkos nėra) | `https://api.lessons.church` |
| `CONTENT_ROOT` | Turinio pristatymo URL | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | Lessons svetainės URL | `https://lessons.church` |

:::info
Mobiliosios programos nenaudoja `REACT_APP_` ar `NEXT_PUBLIC_` priešdėlio. Aplinkos kintamuosius pasiekia Expo konfigūracija.
:::

---

## Greita nuoroda: pavyzdinių failų vietos

| Projektas | Pavyzdinis failas |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
