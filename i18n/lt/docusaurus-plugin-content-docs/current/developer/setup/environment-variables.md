---
title: "Aplinkos kintamieji"
description: "Nustatykite .env failus ChurchApps projektams, pasirinkite bendrą demonstracinį API arba vietinį, ir užpildykite kintamuosius B1 Admin, B1.church, B1 Checkin ir kitiems."
---

# Aplinkos kintamieji

<div class="article-intro">

Kiekvienas ChurchApps projektas vietinei konfigūracijai naudoja `.env` failą. Kiekvienas projektas turi pavyzdinį failą, kurį nukopijuojate ir pritaikote. Šiame puslapyje aprašomi aplinkos kintamieji API, tinklalapių ir mobiliųjų programėlių projektams, taip pat paaiškinama, kaip pasirinkti tarp demonstracinio ir vietinio API.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiekite [reikalavimus](./prerequisites.md) savo projektui
- Klonuokite projekto repozitoriją, su kuriuo norite dirbti
- Peržiūrėkite [Projekto apžvalgą](./project-overview.md), kad suprastumėte, kurių API modulių reikia jūsų projektui

</div>

## Bendras principas

1. Projekto šakniniame kataloge ieškokite `dotenv.sample.txt` arba `.env.sample`.
2. Nukopijuokite jį į `.env`.
3. Pakeiskite reikšmes pagal poreikį.

```bash
# Pavyzdys projektui su .env.sample
cp .env.sample .env

# Pavyzdys projektui su dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Niekada nekelkite `.env` failų į versijų valdymo sistemą.** Jie talpina slaptus duomenis, pavyzdžiui, duomenų bazių prisijungimo duomenis, API raktus ir JWT slaptus raktus. Visi ChurchApps projektai įtraukia `.env` į `.gitignore`, tačiau prieš įkeldami visada patikrinkite dar kartą.
:::

## API tikslo pasirinkimas

Svarbiausias sprendimas – kur jūsų sąsaja kreipiasi API užklausomis. Yra dvi galimybės:

### 1 variantas: Demonstraciniai API (rekomenduojama sąsajos kūrimui)

Naudokite bendrą demonstracinę aplinką. Nereikia nei vietinio API, nei duomenų bazės diegimo. Ji veikia su naujausiu `main` šakos kodu, o jos pavyzdiniai duomenys kiekvieną naktį atkuriami.

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
Staging aplinka (`api.staging.churchapps.org`, `api.staging.lessons.church` ir susiję adresai) nebenaudojama. Kai kuriuose pavyzdiniuose `.env` failuose vis dar gali būti staging adresų; pakeiskite juos į demonstracines arba vietines reikšmes, nurodytas šiame puslapyje. Bendro ne produkcinio Lessons API nebėra – jei jo prireikia, paleiskite [LessonsApi](https://github.com/ChurchApps/LessonsApi) vietoje (jis klausosi prievado `8090`).
:::

### 2 variantas: Vietinis API

Paleiskite Api projektą savo kompiuteryje. Reikalinga MySQL 8.0+ versija su sukurtomis duomenų bazėmis kiekvienam moduliui. Žr. [vietinio API nustatymo](../api/local-setup.md) vadovą.

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

Pagrindinis **Api** projektas (`.env.sample`) turi daugiausiai konfigūracijos. Čia pateikiami svarbiausi kintamieji:

### Bendrieji nustatymai

| Kintamasis | Aprašymas | Pavyzdys |
|----------|-------------|---------|
| `ENVIRONMENT` | Veikimo aplinka | `dev` |
| `SERVER_PORT` | HTTP prievadas vietiniam kūrimo serveriui | `8084` |
| `ENCRYPTION_KEY` | 192 bitų šifravimo raktas jautriems duomenims | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Slaptas raktas JSON Web Token žetonams pasirašyti | `jwt-secret-dev` |
| `FILE_STORE` | Kur saugoti įkeltus failus (`disk` arba `s3`) | `disk` |
| `CORS_ORIGIN` | Leidžiami CORS šaltiniai (`*` vietiniam kūrimui) | `*` |

### Duomenų bazės ryšys

Vienas bazinis URL nukreipia API į MySQL. API iš šios bazės sukuria po vieną duomenų bazę kiekvienam moduliui (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Kintamasis | Pavyzdys |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Atnaujinkite `root:password` savo tikraisiais MySQL prisijungimo duomenimis. Kiekviena moduliui skirta duomenų bazė turi egzistuoti prieš paleidžiant API. Naudokite `npm run initdb`, kad sukurtumėte schemą visiems moduliams, arba `npm run initdb:membership` vienam moduliui.
:::

### WebSocket nustatymai

| Kintamasis | Aprašymas | Pavyzdys |
|----------|-------------|---------|
| `SOCKET_PORT` | WebSocket serverio prievadas | `8087` |
| `SOCKET_URL` | WebSocket URL, prie kurio jungiasi klientai | `ws://localhost:8087` |

---

## Tinklalapių programėlių aplinkos kintamieji

### B1Admin (React + Vite)

Pavyzdinis failas: `.env.sample`

| Kintamasis | Aprašymas | Pavyzdys (demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Aplinkos pavadinimas | `demo` |
| `PORT` | Kūrimo serverio prievadas | `3101` |
| `REACT_APP_API_BASE` | Vienas bazinis URL visiems ChurchApps API (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` pridedami automatiškai) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | Turinio pristatymo URL | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (neprivaloma) | `UA-123456789-1` |

Vietinio API kūrimui nukreipkite bazinį URL į savo vietinį rinkinį:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Pavyzdinis failas: `.env.sample`

| Kintamasis | Aprašymas | Pavyzdys (demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Vienas bazinis URL visiems ChurchApps API (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` pridedami automatiškai) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Turinio pristatymo URL | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (neprivaloma) | `UA-123456789-1` |

:::info
Next.js reikalauja `NEXT_PUBLIC_` priešdėlio kiekvienam aplinkos kintamajam, kuris turi būti prieinamas naršyklėje. Kintamiesiems, skirtiems tik serveriui, šio priešdėlio nereikia.
:::

### LessonsApp (Next.js)

Pavyzdinis failas: `dotenv.sample.txt`

| Kintamasis | Aprašymas | Pavyzdys (vietinis LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Aplinkos etapas (palikite nenustatytą arba `dev` vietiniam kūrimui) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API URL | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Turinio pristatymo URL | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | ChurchApps API bazė prisijungimui (naudojama tik tada, kai `STAGE` nenustatytas arba yra `dev`) | `https://api.demo.churchapps.org` |

---

## Mobiliųjų programėlių aplinkos kintamieji

### B1Checkin (React Native / Expo)

Pavyzdinis failas: `dotenv.sample.txt`

| Kintamasis | Aprašymas | Pavyzdys |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | Parenka API rinkinį, prie kurio jungiasi programėlė: `dev` (vietinis API adresu `http://127.0.0.1:8084`), `staging` arba `prod` (numatytoji reikšmė, jei nenustatyta) | `dev` |

B1Checkin naudoja tik Membership ir Attendance API modulius bei turinio pristatymo URL; jų adresai kiekvienam etapui nustatomi faile `src/helpers/EnvironmentHelper.ts`.

:::info
Expo į programėlės paketą įtraukia tik kintamuosius, turinčius `EXPO_PUBLIC_` priešdėlį. Pakeitę `.env`, kūrimo serverį paleiskite iš naujo su `yarn start --reset-cache`.
:::

---

## Greita nuoroda: pavyzdinių failų vietos

| Projektas | Pavyzdinis failas |
|---------|-----------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
