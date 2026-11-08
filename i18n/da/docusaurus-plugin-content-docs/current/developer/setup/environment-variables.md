---
title: "Miljøvariabler"
description: "Opsæt .env-filer til ChurchApps-projekter, vælg den delte demo-API eller en lokal API, og udfyld variablerne for B1 Admin, B1.church, B1 Checkin og flere."
---

# Miljøvariabler

<div class="article-intro">

Alle ChurchApps-projekter bruger en `.env`-fil til lokal konfiguration. Hvert projekt indeholder en eksempelfil, som du kopierer og tilpasser. Denne side beskriver miljøvariablerne for API'er, webapps og mobilapps, herunder hvordan du vælger mellem demo- og lokale API-mål.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer [forudsætningerne](./prerequisites.md) for dit projekt
- Klon det projektrepository, du vil arbejde på
- Gennemgå [Projektoversigten](./project-overview.md) for at forstå, hvilke API-moduler dit projekt har brug for

</div>

## Generelt mønster

1. Find `dotenv.sample.txt` eller `.env.sample` i projektets rodmappe.
2. Kopiér den til `.env`.
3. Rediger værdierne efter behov.

```bash
# Eksempel for et projekt med .env.sample
cp .env.sample .env

# Eksempel for et projekt med dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Commit aldrig `.env`-filer til versionsstyring.** De indeholder hemmeligheder såsom databaselegitimationsoplysninger, API-nøgler og JWT-secrets. Alle ChurchApps-projekter har `.env` med i `.gitignore`, men kontrollér altid dobbelt, før du committer.
:::

## Valg af API-mål

Den vigtigste beslutning er, hvor dit frontend sender API-kald hen. Der er to muligheder:

### Mulighed 1: Demo-API'er (anbefales til frontend-udvikling)

Brug det delte demomiljø. Der kræves ingen lokal API- eller databaseopsætning. Det kører den nyeste kode fra `main`, og dets eksempeldata genindlæses hver nat.

```bash
# Grundmønster for basis-URL
https://api.demo.churchapps.org/{module}

# Eksempler på modul-URL'er
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Staging-miljøet (`api.staging.churchapps.org`, `api.staging.lessons.church` og relaterede værter) er blevet udfaset. Nogle eksempel-`.env`-filer indeholder muligvis stadig staging-URL'er; erstat dem med demo- eller lokale værdier vist på denne side. Der findes ingen delt ikke-produktions-Lessons-API -- kør [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokalt (den lytter på port `8090`), når du har brug for en.
:::

### Mulighed 2: Lokal API

Kør Api-projektet på din maskine. Kræver MySQL 8.0+ med databaser oprettet for hvert modul. Se guiden [lokal opsætning af API'en](../api/local-setup.md).

```bash
# Grundmønster for basis-URL
http://localhost:8084/{module}

# Eksempler på modul-URL'er
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API-miljøvariabler

Det centrale **Api**-projekt (`.env.sample`) har mest konfiguration. Her er de vigtigste variabler:

### Fælles indstillinger

| Variabel | Beskrivelse | Eksempel |
|----------|-------------|----------|
| `ENVIRONMENT` | Kørselsmiljø | `dev` |
| `SERVER_PORT` | HTTP-port for den lokale udviklingsserver | `8084` |
| `ENCRYPTION_KEY` | 192-bit krypteringsnøgle til følsomme data | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Hemmelighed til signering af JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Hvor uploadede filer gemmes (`disk` eller `s3`) | `disk` |
| `CORS_ORIGIN` | Tilladte CORS-oprindelser (`*` til lokal udvikling) | `*` |

### Databaseforbindelse

En enkelt basis-URL peger API'en mod MySQL. API'en udleder én database pr. modul (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) ud fra denne basis.

| Variabel | Eksempel |
|----------|----------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Opdatér `root:password` med dine faktiske MySQL-legitimationsoplysninger. Hver database pr. modul skal findes, før API'en køres. Brug `npm run initdb` til at oprette skemaet for alle moduler, eller `npm run initdb:membership` for et enkelt modul.
:::

### WebSocket-indstillinger

| Variabel | Beskrivelse | Eksempel |
|----------|-------------|----------|
| `SOCKET_PORT` | Port for WebSocket-serveren | `8087` |
| `SOCKET_URL` | WebSocket-URL, som klienter forbinder til | `ws://localhost:8087` |

---

## Miljøvariabler for webapps

### B1Admin (React + Vite)

Eksempelfil: `.env.sample`

| Variabel | Beskrivelse | Eksempel (demo) |
|----------|-------------|-----------------|
| `REACT_APP_STAGE` | Miljønavn | `demo` |
| `PORT` | Port for udviklingsserveren | `3101` |
| `REACT_APP_API_BASE` | Enkelt basis-URL for alle ChurchApps-API'er (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` tilføjes automatisk) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL til indholdslevering | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics-ID (valgfrit) | `UA-123456789-1` |

Til lokal API-udvikling skal basis-URL'en pege på din lokale stak:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Eksempelfil: `.env.sample`

| Variabel | Beskrivelse | Eksempel (demo) |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_API_BASE` | Enkelt basis-URL for alle ChurchApps-API'er (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` tilføjes automatisk) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL til indholdslevering | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics-ID (valgfrit) | `UA-123456789-1` |

:::info
Next.js kræver præfikset `NEXT_PUBLIC_` for enhver miljøvariabel, der skal være tilgængelig i browseren. Variabler, der kun bruges på serveren, behøver ikke dette præfiks.
:::

### LessonsApp (Next.js)

Eksempelfil: `dotenv.sample.txt`

| Variabel | Beskrivelse | Eksempel (lokal LessonsApi) |
|----------|-------------|-----------------------------|
| `STAGE` | Miljøtrin (lad være uudfyldt eller sæt til `dev` til lokal udvikling) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL til Lessons-API'en | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL til indholdslevering | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Basis-URL for ChurchApps-API'en, der bruges til login (kun brugt, når `STAGE` er uudfyldt eller `dev`) | `https://api.demo.churchapps.org` |

---

## Miljøvariabler for mobilapps

### B1Checkin (React Native / Expo)

Eksempelfil: `dotenv.sample.txt`

| Variabel | Beskrivelse | Eksempel |
|----------|-------------|----------|
| `EXPO_PUBLIC_STAGE` | Vælger det API-sæt, appen forbinder til: `dev` (lokal API på `http://127.0.0.1:8084`), `staging` eller `prod` (standard, når ikke sat) | `dev` |

B1Checkin bruger kun modulerne Membership og Attendance i API'en samt URL'en til indholdslevering; deres adresser for hvert trin er angivet i `src/helpers/EnvironmentHelper.ts`.

:::info
Expo inkluderer kun variabler med præfikset `EXPO_PUBLIC_` i app-bundlen. Genstart udviklingsserveren med `yarn start --reset-cache`, efter du har ændret `.env`.
:::

---

## Hurtig reference: placering af eksempelfiler

| Projekt | Eksempelfil |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
