---
title: "Miljøvariabler"
description: "Sett opp .env-filer for ChurchApps-prosjekter, velg den delte demo-API-en eller en lokal, og fyll inn variabler for B1 Admin, B1.church, B1 Checkin og flere."
---

# Miljøvariabler

<div class="article-intro">

Hvert ChurchApps-prosjekt bruker en `.env`-fil for lokal konfigurasjon. Hvert prosjekt inkluderer en eksempelfil som du kopierer og tilpasser. Denne siden dekker miljøvariablene for API-er, webapper og mobilapper, inkludert hvordan du velger mellom demo- og lokale API-mål.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer [forutsetningene](./prerequisites.md) for prosjektet ditt
- Klon prosjektrepositoriet du vil jobbe med
- Se gjennom [Prosjektoversikt](./project-overview.md) for å forstå hvilke API-moduler prosjektet ditt trenger

</div>

## Generelt mønster

1. Se etter `dotenv.sample.txt` eller `.env.sample` i prosjektets rotmappe.
2. Kopier den til `.env`.
3. Rediger verdiene etter behov.

```bash
# Eksempel for et prosjekt med .env.sample
cp .env.sample .env

# Eksempel for et prosjekt med dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Commit aldri `.env`-filer til versjonskontroll.** De inneholder hemmeligheter som databasepassord, API-nøkler og JWT-hemmeligheter. Alle ChurchApps-prosjekter har `.env` i `.gitignore`, men dobbeltsjekk alltid før du committer.
:::

## Velge API-mål

Den viktigste avgjørelsen er hvor frontend-en din peker for API-kall. Det finnes to alternativer:

### Alternativ 1: Demo-API-er (anbefalt for frontend-utvikling)

Bruk det delte demo-miljøet. Ingen lokal API- eller databaseoppsett er nødvendig. Det kjører den nyeste koden fra `main`, og eksempeldataene fylles på nytt hver natt.

```bash
# Base-URL-mønster
https://api.demo.churchapps.org/{module}

# Eksempler på modul-URL-er
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Staging-miljøet (`api.staging.churchapps.org`, `api.staging.lessons.church` og tilhørende verter) er avviklet. Noen eksempel-`.env`-filer kan fortsatt inneholde staging-URL-er; erstatt dem med demo- eller lokale verdier vist på denne siden. Det finnes ingen delt ikke-produksjons-Lessons-API -- kjør [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokalt (den lytter på port `8090`) når du trenger en.
:::

### Alternativ 2: Lokal API

Kjør Api-prosjektet på maskinen din. Krever MySQL 8.0+ med databaser opprettet for hver modul. Se veiledningen [lokalt API-oppsett](../api/local-setup.md).

```bash
# Base-URL-mønster
http://localhost:8084/{module}

# Eksempler på modul-URL-er
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API-miljøvariabler

Kjerneprosjektet **Api** (`.env.sample`) har mest konfigurasjon. Her er de viktigste variablene:

### Felles innstillinger

| Variabel | Beskrivelse | Eksempel |
|----------|-------------|----------|
| `ENVIRONMENT` | Kjøremiljø | `dev` |
| `SERVER_PORT` | HTTP-port for den lokale utviklingsserveren | `8084` |
| `ENCRYPTION_KEY` | 192-bits krypteringsnøkkel for sensitive data | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Hemmelighet for signering av JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Hvor opplastede filer skal lagres (`disk` eller `s3`) | `disk` |
| `CORS_ORIGIN` | Tillatte CORS-opprinnelser (`*` for lokal utvikling) | `*` |

### Databasetilkobling

En enkelt base-URL peker API-et mot MySQL. API-et utleder én database per modul (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) fra denne basen.

| Variabel | Eksempel |
|----------|----------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Oppdater `root:password` med dine faktiske MySQL-legitimasjoner. Hver database per modul må finnes før API-et kjøres. Bruk `npm run initdb` for å opprette skjemaet for alle moduler, eller `npm run initdb:membership` for én enkelt modul.
:::

### WebSocket-innstillinger

| Variabel | Beskrivelse | Eksempel |
|----------|-------------|----------|
| `SOCKET_PORT` | Port for WebSocket-serveren | `8087` |
| `SOCKET_URL` | WebSocket-URL som klienter kobler til | `ws://localhost:8087` |

---

## Miljøvariabler for webapper

### B1Admin (React + Vite)

Eksempelfil: `.env.sample`

| Variabel | Beskrivelse | Eksempel (demo) |
|----------|-------------|-----------------|
| `REACT_APP_STAGE` | Miljønavn | `demo` |
| `PORT` | Port for utviklingsserveren | `3101` |
| `REACT_APP_API_BASE` | Enkelt base-URL for alle ChurchApps-API-er (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` legges til automatisk) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL for innholdslevering | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics-ID (valgfritt) | `UA-123456789-1` |

For lokal API-utvikling, pek base-URL-en mot ditt lokale oppsett:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Eksempelfil: `.env.sample`

| Variabel | Beskrivelse | Eksempel (demo) |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_API_BASE` | Enkelt base-URL for alle ChurchApps-API-er (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` legges til automatisk) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL for innholdslevering | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics-ID (valgfritt) | `UA-123456789-1` |

:::info
Next.js krever `NEXT_PUBLIC_`-prefikset for alle miljøvariabler som må være tilgjengelige i nettleseren. Variabler som kun brukes på serveren trenger ikke dette prefikset.
:::

### LessonsApp (Next.js)

Eksempelfil: `dotenv.sample.txt`

| Variabel | Beskrivelse | Eksempel (lokal LessonsApi) |
|----------|-------------|-----------------------------|
| `STAGE` | Miljøtrinn (la den være uten verdi eller sett `dev` for lokal utvikling) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL til Lessons-API | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL for innholdslevering | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | ChurchApps API-base brukt for innlogging (respekteres kun når `STAGE` er uten verdi eller `dev`) | `https://api.demo.churchapps.org` |

---

## Miljøvariabler for mobilapper

### B1Checkin (React Native / Expo)

Eksempelfil: `dotenv.sample.txt`

| Variabel | Beskrivelse | Eksempel |
|----------|-------------|----------|
| `EXPO_PUBLIC_STAGE` | Velger API-settet appen kobler til: `dev` (lokal API på `http://127.0.0.1:8084`), `staging` eller `prod` (standard når den ikke er satt) | `dev` |

B1Checkin bruker kun API-modulene Membership og Attendance samt URL-en for innholdslevering. Adressene for hvert miljø er satt i `src/helpers/EnvironmentHelper.ts`.

:::info
Expo inkluderer kun variabler med prefikset `EXPO_PUBLIC_` i app-pakken. Start utviklingsserveren på nytt med `yarn start --reset-cache` etter endringer i `.env`.
:::

---

## Hurtigreferanse: plassering av eksempelfiler

| Prosjekt | Eksempelfil |
|----------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
