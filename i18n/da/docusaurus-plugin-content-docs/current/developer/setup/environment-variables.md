---
title: "Miljøvariabler"
---

# Miljøvariabler

<div class="article-intro">

Hvert ChurchApps-projekt bruger en `.env`-fil til lokal konfiguration. Hvert projekt inkluderer en sampelfil, som du kopierer og tilpasser. Denne side dækker miljøvariablerne for API'er, webapps og mobilapps, herunder hvordan du vælger mellem staging- og lokale API-mål.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer [forudsætningerne](./prerequisites) for dit projekt
- Klon det projekt-lager, du vil arbejde på
- Gennemgå [Projektoversigten](./project-overview) for at forstå, hvilke API-moduler dit projekt har brug for

</div>

## Generelt mønster

1. Se efter `dotenv.sample.txt` eller `.env.sample` i projektrodet.
2. Kopier det til `.env`.
3. Rediger værdierne efter behov.

```bash
# Eksempel på et projekt med .env.sample
cp .env.sample .env

# Eksempel på et projekt med dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Commit aldrig `.env`-filer til versionkontrol.** De indeholder hemmeligheder såsom databaselegitimationsoplysninger, API-nøgler og JWT-hemmeligheder. Alle ChurchApps-projekter inkluderer `.env` i `.gitignore`, men dobbeltkontroller altid før du committer.
:::

## Valg af API-mål

Den vigtigste beslutning er, hvor din frontend peger for API-kald. Der er to muligheder:

### Option 1: Staging API'er (anbefalet til frontend-udvikling)

Brug det delte staging-miljø. Ingen lokal API- eller databaseopsætning påkrævet.

```bash
# Basis URL-mønster
https://api.staging.churchapps.org/{module}

# Eksempel modul URL'er
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### Option 2: Lokale API

Kør Api-projektet på din maskine. Kræver MySQL 8.0+ med databaser oprettet for hvert modul. Se vejledningen [Lokalt API-setup](../api/local-setup).

```bash
# Basis URL-mønster
http://localhost:8084/{module}

# Eksempel modul URL'er
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API-miljøvariabler

Kerneprojektet **Api** (`.env.sample`) har den mest konfiguration. Her er vigtige variabler:

### Delte indstillinger

| Variable | Beskrivelse | Eksempel |
|----------|-------------|---------|
| `ENVIRONMENT` | Køretid miljø | `dev` |
| `SERVER_PORT` | HTTP-port til lokal dev-server | `8084` |
| `ENCRYPTION_KEY` | 192-bit krypteringsnøgle til følsomme data | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Hemmelighed til signing af JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Hvor uploadede filer skal gemmes (`disk` eller `s3`) | `disk` |
| `CORS_ORIGIN` | Tilladte CORS-kilder (`*` til lokal dev) | `*` |

### Databaseforbindelser

Hvert API-modul har sin egen MySQL-database og forbindelsesstreng:

| Variable | Database |
|----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
Opdater `root:password` med dine faktiske MySQL-legitimationsoplysninger. Hver database skal oprettes før kørsel af API'en. Brug `npm run initdb` til at oprette skemaet for alle moduler, eller `npm run initdb:membership` til et enkelt modul.
:::

### WebSocket-indstillinger

| Variable | Beskrivelse | Eksempel |
|----------|-------------|---------|
| `SOCKET_PORT` | Port til WebSocket-serveren | `8087` |
| `SOCKET_URL` | WebSocket-URL til klientforbindelse | `ws://localhost:8087` |

---

## Webapplikations miljøvariabler

### B1Admin (React + Vite)

Sampelfil: `.env.sample`

| Variable | Beskrivelse | Eksempel (Staging) |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | Miljønavn | `demo` |
| `PORT` | Dev-serverport | `3101` |
| `REACT_APP_MEMBERSHIP_API` | Medlemskabs API-URL | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | Deltagelses API-URL | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | Giving API-URL | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | Indholdsleverings-URL | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (valgfrit) | `UA-123456789-1` |

For lokal API-udvikling skal du kommentere ud og bruge `localhost`-varianterne:

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

Sampelfil: `.env.sample`

| Variable | Beskrivelse | Eksempel (Staging) |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | Medlemskabs API-URL | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | Deltagelses API-URL | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | Giving API-URL | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | Messaging API-URL | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | Indhold API-URL | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Indholdsleverings-URL | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps basis-URL | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (valgfrit) | `UA-123456789-1` |

:::info
Next.js kræver `NEXT_PUBLIC_` præfiket for enhver miljøvariabel, der skal være tilgængelig i browseren. Server-kun variabler behøver ikke dette præfiks.
:::

### LessonsApp (Next.js)

Sampelfil: `dotenv.sample.txt`

| Variable | Beskrivelse | Eksempel (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Miljøscene | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API-URL | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Indholdsleverings-URL | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps basis-URL | `https://staging.churchapps.org` |

---

## Mobil-app miljøvariabler

### B1Mobile (React Native / Expo)

Sampelfil: `dotenv.sample.txt`

| Variable | Beskrivelse | Eksempel (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Miljønavn | `dev` |
| `MEMBERSHIP_API` | Medlemskabs API-URL | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | Messaging API-URL | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | Deltagelses API-URL | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | Giving API-URL | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | Doing API-URL | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | Indhold API-URL | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | Indholdsleverings-URL | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | Lessons site-URL | `https://staging.lessons.church` |

:::info
Mobilapps bruger ikke `REACT_APP_` eller `NEXT_PUBLIC_` præfiktet. Miljøvariabel adgang håndteres af Expo-konfigurationen.
:::

---

## Hurtigreferance: Sampelfil lokaliteter

| Project | Sampelfil |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
