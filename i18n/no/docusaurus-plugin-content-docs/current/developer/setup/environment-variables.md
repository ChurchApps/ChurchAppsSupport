---
title: "Miljøvariabler"
---

# Miljøvariabler

<div class="article-intro">

Hvert ChurchApps-prosjekt bruker en `.env`-fil for lokal konfigurasjon. Hvert prosjekt inkluderer en eksempelfil som du kopierer og tilpasser. Denne siden dekker miljøvariablene for API-er, webapper og mobilapper, inkludert hvordan du velger mellom staging og lokale API-mål.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer [forutsetningene](./prerequisites) for prosjektet ditt
- Klon prosjektrepositoriet du ønsker å jobbe med
- Gjennomgå [Prosjektoversikten](./project-overview) for å forstå hvilke API-moduler prosjektet ditt trenger

</div>

## Generelt mønster

1. Se etter `dotenv.sample.txt` eller `.env.sample` i prosjektroten.
2. Kopier den til `.env`.
3. Rediger verdiene etter behov.

```bash
# Eksempel for et prosjekt med .env.sample
cp .env.sample .env

# Eksempel for et prosjekt med dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Aldri commit `.env`-filer til versjonskontroll.** De inneholder hemmeligheter som databaselegitimasjon, API-nøkler og JWT-hemmeligheter. Alle ChurchApps-prosjekter inkluderer `.env` i `.gitignore`, men dobbeltsjekk alltid før du committer.
:::

## Velge et API-mål

Den viktigste beslutningen er hvor frontenden din peker for API-kall. Det er to alternativer:

### Alternativ 1: Staging-API-er (anbefalt for frontend-utvikling)

Bruk det delte staging-miljøet. Ingen lokalt API- eller databaseoppsett er nødvendig.

```bash
# Basis-URL-mønster
https://api.staging.churchapps.org/{modul}

# Eksempel på modul-URL-er
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### Alternativ 2: Lokalt API

Kjør Api-prosjektet på maskinen din. Krever MySQL 8.0+ med databaser opprettet for hver modul. Se guiden for [lokalt API-oppsett](../api/local-setup).

```bash
# Basis-URL-mønster
http://localhost:8084/{modul}

# Eksempel på modul-URL-er
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API-miljøvariabler

Kjerne-**Api**-prosjektet (`.env.sample`) har mest konfigurasjon. Her er de viktigste variablene:

### Delte innstillinger

| Variabel | Beskrivelse | Eksempel |
|----------|-------------|---------|
| `ENVIRONMENT` | Kjøremiljø | `dev` |
| `SERVER_PORT` | HTTP-port for lokal utviklingsserver | `8084` |
| `ENCRYPTION_KEY` | 192-bit krypteringsnøkkel for sensitive data | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Hemmelighet for signering av JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Hvor opplastede filer lagres (`disk` eller `s3`) | `disk` |
| `CORS_ORIGIN` | Tillatte CORS-opprinnelser (`*` for lokal utvikling) | `*` |

### Databasetilkoblinger

Hver API-modul har sin egen MySQL-database og tilkoblingsstreng:

| Variabel | Database |
|----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
Oppdater `root:password` med din faktiske MySQL-legitimasjon. Hver database må opprettes før du kjører API-et. Bruk `npm run initdb` for å opprette skjemaet for alle moduler, eller `npm run initdb:membership` for en enkelt modul.
:::

### WebSocket-innstillinger

| Variabel | Beskrivelse | Eksempel |
|----------|-------------|---------|
| `SOCKET_PORT` | Port for WebSocket-serveren | `8087` |
| `SOCKET_URL` | WebSocket-URL for klienter å koble til | `ws://localhost:8087` |

---

## Webapp-miljøvariabler

### B1Admin (React + Vite)

Eksempelfil: `.env.sample`

| Variabel | Beskrivelse | Eksempel (staging) |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | Miljønavn | `demo` |
| `PORT` | Utviklingsserverport | `3101` |
| `REACT_APP_MEMBERSHIP_API` | Membership API-URL | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | Attendance API-URL | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | Giving API-URL | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | URL for innholdslevering | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics-ID (valgfri) | `UA-123456789-1` |

For lokal API-utvikling, fjern kommentar og bruk `localhost`-variantene:

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

Eksempelfil: `.env.sample`

| Variabel | Beskrivelse | Eksempel (staging) |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | Membership API-URL | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | Attendance API-URL | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | Giving API-URL | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | Messaging API-URL | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | Content API-URL | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL for innholdslevering | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps basis-URL | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics-ID (valgfri) | `UA-123456789-1` |

:::info
Next.js krever `NEXT_PUBLIC_`-prefikset for enhver miljøvariabel som må være tilgjengelig i nettleseren. Variabler som kun brukes på serveren trenger ikke dette prefikset.
:::

### LessonsApp (Next.js)

Eksempelfil: `dotenv.sample.txt`

| Variabel | Beskrivelse | Eksempel (staging) |
|----------|-------------|-------------------|
| `STAGE` | Miljøsteg | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API-URL | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL for innholdslevering | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps basis-URL | `https://staging.churchapps.org` |

---

## Mobilapp-miljøvariabler

### B1Mobile (React Native / Expo)

Eksempelfil: `dotenv.sample.txt`

| Variabel | Beskrivelse | Eksempel (staging) |
|----------|-------------|-------------------|
| `STAGE` | Miljønavn | `dev` |
| `MEMBERSHIP_API` | Membership API-URL | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | Messaging API-URL | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | Attendance API-URL | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | Giving API-URL | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | Doing API-URL | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | Content API-URL | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | URL for innholdslevering | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | Lessons-nettsted-URL | `https://staging.lessons.church` |

:::info
Mobilapper bruker ikke `REACT_APP_`- eller `NEXT_PUBLIC_`-prefikset. Tilgang til miljøvariabler håndteres av Expo-konfigurasjonen.
:::

---

## Hurtigreferanse: Eksempelfilplasseringer

| Prosjekt | Eksempelfil |
|----------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
