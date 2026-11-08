---
title: "Miljövariabler"
description: "Konfigurera .env-filer för ChurchApps-projekt, välj det delade demo-API:et eller ett lokalt API, och fyll i variabler för B1 Admin, B1.church, B1 Checkin och fler."
---

# Miljövariabler

<div class="article-intro">

Varje ChurchApps-projekt använder en `.env`-fil för lokal konfiguration. Varje projekt innehåller en exempelfil som du kopierar och anpassar. Den här sidan beskriver miljövariablerna för API:er, webbappar och mobilappar, inklusive hur du väljer mellan demo- och lokala API-mål.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera [förutsättningarna](./prerequisites.md) för projektet du vill arbeta med
- Klona projektets repository
- Läs igenom [Projektöversikten](./project-overview.md) för att förstå vilka API-moduler ditt projekt behöver

</div>

## Allmänt mönster

1. Leta efter `dotenv.sample.txt` eller `.env.sample` i projektets rotkatalog.
2. Kopiera den till `.env`.
3. Redigera värdena efter behov.

```bash
# Exempel för ett projekt med .env.sample
cp .env.sample .env

# Exempel för ett projekt med dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Checka aldrig in `.env`-filer i versionshantering.** De innehåller hemligheter som databasuppgifter, API-nycklar och JWT-hemligheter. Alla ChurchApps-projekt har `.env` med i `.gitignore`, men kontrollera alltid en extra gång innan du committar.
:::

## Välja ett API-mål

Det viktigaste beslutet är vart din frontend pekar för API-anrop. Det finns två alternativ:

### Alternativ 1: Demo-API:er (rekommenderas för frontendutveckling)

Använd den delade demomiljön. Ingen lokal API- eller databasinstallation behövs. Den kör den senaste koden från `main`, och dess exempeldata fylls på nytt varje natt.

```bash
# Basadress-mönster
https://api.demo.churchapps.org/{module}

# Exempel på modul-URL:er
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Staging-miljön (`api.staging.churchapps.org`, `api.staging.lessons.church` och relaterade värdar) har avvecklats. Vissa exempelfiler för `.env` kan fortfarande innehålla staging-URL:er; ersätt dem med demo- eller lokala värden som visas på den här sidan. Det finns inget delat icke-produktionsbaserat Lessons-API – kör [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokalt (den lyssnar på port `8090`) när du behöver ett.
:::

### Alternativ 2: Lokalt API

Kör Api-projektet på din dator. Kräver MySQL 8.0+ med databaser skapade för varje modul. Se guiden [lokal installation av API](../api/local-setup.md).

```bash
# Basadress-mönster
http://localhost:8084/{module}

# Exempel på modul-URL:er
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Miljövariabler för API

Kärnprojektet **Api** (`.env.sample`) har mest konfiguration. Här är de viktigaste variablerna:

### Gemensamma inställningar

| Variabel | Beskrivning | Exempel |
|----------|-------------|---------|
| `ENVIRONMENT` | Körmiljö | `dev` |
| `SERVER_PORT` | HTTP-port för den lokala utvecklingsservern | `8084` |
| `ENCRYPTION_KEY` | 192-bitars krypteringsnyckel för känsliga data | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Hemlighet för signering av JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Var uppladdade filer ska lagras (`disk` eller `s3`) | `disk` |
| `CORS_ORIGIN` | Tillåtna CORS-ursprung (`*` för lokal utveckling) | `*` |

### Databasanslutning

En enda basadress pekar API:et mot MySQL. API:et härleder en databas per modul (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) från denna bas.

| Variabel | Exempel |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Uppdatera `root:password` med dina faktiska MySQL-uppgifter. Varje databas per modul måste finnas innan API:et startas. Använd `npm run initdb` för att skapa schemat för alla moduler, eller `npm run initdb:membership` för en enskild modul.
:::

### WebSocket-inställningar

| Variabel | Beskrivning | Exempel |
|----------|-------------|---------|
| `SOCKET_PORT` | Port för WebSocket-servern | `8087` |
| `SOCKET_URL` | WebSocket-URL som klienterna ansluter till | `ws://localhost:8087` |

---

## Miljövariabler för webbappar

### B1Admin (React + Vite)

Exempelfil: `.env.sample`

| Variabel | Beskrivning | Exempel (Demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Miljönamn | `demo` |
| `PORT` | Port för utvecklingsservern | `3101` |
| `REACT_APP_API_BASE` | Enskild basadress för alla ChurchApps-API:er (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` läggs till automatiskt) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL för innehållsleverans | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics-ID (valfritt) | `UA-123456789-1` |

För lokal API-utveckling, peka basadressen mot ditt lokala stack:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Exempelfil: `.env.sample`

| Variabel | Beskrivning | Exempel (Demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Enskild basadress för alla ChurchApps-API:er (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` läggs till automatiskt) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL för innehållsleverans | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics-ID (valfritt) | `UA-123456789-1` |

:::info
Next.js kräver prefixet `NEXT_PUBLIC_` för alla miljövariabler som behöver vara tillgängliga i webbläsaren. Variabler som bara används på servern behöver inte detta prefix.
:::

### LessonsApp (Next.js)

Exempelfil: `dotenv.sample.txt`

| Variabel | Beskrivning | Exempel (lokalt LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Miljöstadium (lämna oinställd eller `dev` för lokal utveckling) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL till Lessons-API:et | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL för innehållsleverans | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | ChurchApps API-bas som används för inloggning (tillämpas endast när `STAGE` är oinställd eller `dev`) | `https://api.demo.churchapps.org` |

---

## Miljövariabler för mobilappar

### B1Checkin (React Native / Expo)

Exempelfil: `dotenv.sample.txt`

| Variabel | Beskrivning | Exempel |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | Väljer vilken uppsättning API:er appen ansluter till: `dev` (lokalt API på `http://127.0.0.1:8084`), `staging` eller `prod` (standard när variabeln inte är satt) | `dev` |

B1Checkin använder endast API-modulerna Membership och Attendance samt URL:en för innehållsleverans. Adresserna för varje miljö anges i `src/helpers/EnvironmentHelper.ts`.

:::info
Expo bäddar endast in variabler med prefixet `EXPO_PUBLIC_` i appens bundle. Starta om utvecklingsservern med `yarn start --reset-cache` efter att du har ändrat `.env`.
:::

---

## Snabbreferens: Platser för exempelfiler

| Projekt | Exempelfil |
|---------|-----------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
