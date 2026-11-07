---
title: "Miljövariabler"
description: "Ställ in .env-filen för ChurchApps-projekt, välj delat demo-API eller lokalt API och fyll i variabler för B1 Admin, B1.church, B1 Mobile och Lessons.church."
---

# Miljövariabler

<div class="article-intro">

Varje ChurchApps-projekt använder en `.env`-fil för lokal konfiguration. Varje projekt innehåller en exempelfil som du kopierar och anpassar. Den här sidan beskriver miljövariablerna för API:er, webbappar och mobilappar, inklusive hur du väljer mellan demo-API:et och det lokala API:et.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera [förutsättningarna](./prerequisites.md) för ditt projekt
- Klona projektets repository som du vill arbeta med
- Läs [Projektöversikt](./project-overview.md) för att förstå vilka API-moduler ditt projekt behöver

</div>

## Allmänt mönster

1. Leta efter `dotenv.sample.txt` eller `.env.sample` i projektets rotmapp.
2. Kopiera den till `.env`.
3. Redigera värdena efter behov.

```bash
# Exempel för ett projekt med .env.sample
cp .env.sample .env

# Exempel för ett projekt med dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Committa aldrig `.env`-filer till versionshantering.** De innehåller hemligheter som databasuppgifter, API-nycklar och JWT-hemligheter. Alla ChurchApps-projekt har `.env` med i `.gitignore`, men dubbelkolla alltid innan du committar.
:::

## Välja ett API-mål

Det viktigaste beslutet är vart din frontend pekar för API-anrop. Det finns två alternativ:

### Alternativ 1: Demo-API:er (rekommenderas för frontend-utveckling)

Använd den delade demomiljön. Ingen lokal API- eller databasinstallation behövs. Den kör den senaste koden från `main`, och dess exempeldata fylls på nytt varje natt.

```bash
# Mönster för bas-URL
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
Stagingmiljön (`api.staging.churchapps.org`, `api.staging.lessons.church` och relaterade värdar) har avvecklats. Vissa exempelfiler för `.env` kan fortfarande innehålla staging-URL:er; ersätt dem med demo- eller lokala värden som visas på den här sidan. Det finns inget delat icke-produktions-API för Lessons -- kör [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokalt (det lyssnar på port `8090`) när du behöver ett.
:::

### Alternativ 2: Lokalt API

Kör Api-projektet på din dator. Kräver MySQL 8.0+ med databaser skapade för varje modul. Se guiden [lokal installation av API](../api/local-setup.md).

```bash
# Mönster för bas-URL
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

### Delade inställningar

| Variabel | Beskrivning | Exempel |
|----------|-------------|---------|
| `ENVIRONMENT` | Körmiljö | `dev` |
| `SERVER_PORT` | HTTP-port för den lokala utvecklingsservern | `8084` |
| `ENCRYPTION_KEY` | 192-bitars krypteringsnyckel för känsliga data | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Hemlighet för signering av JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Var uppladdade filer ska lagras (`disk` eller `s3`) | `disk` |
| `CORS_ORIGIN` | Tillåtna CORS-ursprung (`*` för lokal utveckling) | `*` |

### Databasanslutning

En enda bas-URL pekar API:et mot MySQL. API:et härleder en databas per modul (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) från denna bas.

| Variabel | Exempel |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Uppdatera `root:password` med dina faktiska MySQL-uppgifter. Varje databas per modul måste finnas innan API:et startas. Använd `npm run initdb` för att skapa schemat för alla moduler, eller `npm run initdb:membership` för en enskild modul.
:::

### Inställningar för WebSocket

| Variabel | Beskrivning | Exempel |
|----------|-------------|---------|
| `SOCKET_PORT` | Port för WebSocket-servern | `8087` |
| `SOCKET_URL` | WebSocket-URL som klienterna ansluter till | `ws://localhost:8087` |

---

## Miljövariabler för webbappar

### B1Admin (React + Vite)

Exempelfil: `.env.sample`

| Variabel | Beskrivning | Exempel (demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Miljöns namn | `demo` |
| `PORT` | Port för utvecklingsservern | `3101` |
| `REACT_APP_API_BASE` | En enda bas-URL för alla ChurchApps-API:er (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` läggs till automatiskt) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL för innehållsleverans | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics-ID (valfritt) | `UA-123456789-1` |

För lokal API-utveckling, peka bas-URL:en mot din lokala installation:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Exempelfil: `.env.sample`

| Variabel | Beskrivning | Exempel (demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | En enda bas-URL för alla ChurchApps-API:er (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` läggs till automatiskt) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL för innehållsleverans | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics-ID (valfritt) | `UA-123456789-1` |

:::info
Next.js kräver prefixet `NEXT_PUBLIC_` för alla miljövariabler som behöver vara tillgängliga i webbläsaren. Variabler som endast används på servern behöver inte detta prefix.
:::

### LessonsApp (Next.js)

Exempelfil: `dotenv.sample.txt`

| Variabel | Beskrivning | Exempel (lokalt LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Miljöns steg (lämna ej satt eller använd `dev` för lokal utveckling) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL till Lessons-API:et | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL för innehållsleverans | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | ChurchApps API-bas som används för inloggning (används endast när `STAGE` är ej satt eller `dev`) | `https://api.demo.churchapps.org` |

---

## Miljövariabler för mobilappar

### B1Mobile (React Native / Expo)

Exempelfil: `dotenv.sample.txt`

| Variabel | Beskrivning | Exempel (demo) |
|----------|-------------|----------------|
| `STAGE` | Miljöns namn | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | En URL per ChurchApps API-modul (var och en använder produktionsmiljön när den inte är satt) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons-API (separat värd; det finns inget delat icke-produktionsalternativ) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL för innehållsleverans | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL till Lessons-webbplatsen | `https://lessons.church` |

:::info
Mobilappar använder inte prefixet `REACT_APP_` eller `NEXT_PUBLIC_`. Åtkomst till miljövariabler hanteras av Expo-konfigurationen.
:::

---

## Snabbreferens: platser för exempelfiler

| Projekt | Exempelfil |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
