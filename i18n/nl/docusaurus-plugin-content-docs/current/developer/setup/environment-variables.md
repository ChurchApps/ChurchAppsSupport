---
title: "Omgevingsvariabelen"
description: "Stel .env-bestanden in voor ChurchApps-projecten, kies de gedeelde demo-API of een lokale API, en vul variabelen in voor B1 Admin, B1.church, B1 Checkin en meer."
---

# Omgevingsvariabelen

<div class="article-intro">

Elk ChurchApps-project gebruikt een `.env`-bestand voor lokale configuratie. Elk project bevat een voorbeeldbestand dat je kopieert en aanpast. Deze pagina behandelt de omgevingsvariabelen voor API's, webapps en mobiele apps, inclusief hoe je kiest tussen het demo- en het lokale API-doel.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Installeer de [vereisten](./prerequisites.md) voor je project
- Kloon de projectrepository waaraan je wilt werken
- Bekijk het [Projectoverzicht](./project-overview.md) om te begrijpen welke API-modules je project nodig heeft

</div>

## Algemeen patroon

1. Zoek naar `dotenv.sample.txt` of `.env.sample` in de hoofdmap van het project.
2. Kopieer het naar `.env`.
3. Pas de waarden aan waar nodig.

```bash
# Voorbeeld voor een project met .env.sample
cp .env.sample .env

# Voorbeeld voor een project met dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Commit nooit `.env`-bestanden naar versiebeheer.** Ze bevatten geheimen zoals databasegegevens, API-sleutels en JWT-geheimen. Alle ChurchApps-projecten nemen `.env` op in `.gitignore`, maar controleer altijd nog eens voordat je commit.
:::

## Een API-doel kiezen

De belangrijkste beslissing is waar je frontend naartoe verwijst voor API-aanroepen. Er zijn twee opties:

### Optie 1: Demo-API's (aanbevolen voor frontend-ontwikkeling)

Gebruik de gedeelde demo-omgeving. Er is geen lokale API- of databaseconfiguratie nodig. Deze draait de nieuwste code van `main`, en de voorbeelddata wordt elke nacht opnieuw geladen.

```bash
# Basis-URL-patroon
https://api.demo.churchapps.org/{module}

# Voorbeeld-URL's van modules
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
De staging-omgeving (`api.staging.churchapps.org`, `api.staging.lessons.church` enverwante hosts) is uitgefaseerd. Sommige voorbeeld-`.env`-bestanden bevatten mogelijk nog staging-URL's; vervang die door de demo- of lokale waarden die op deze pagina worden getoond. Er is geen gedeelde niet-productie Lessons-API -- voer [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokaal uit (die luistert op poort `8090`) wanneer je die nodig hebt.
:::

### Optie 2: Lokale API

Voer het Api-project op je eigen machine uit. Vereist MySQL 8.0+ met databases die voor elke module zijn aangemaakt. Zie de handleiding [lokale API-installatie](../api/local-setup.md).

```bash
# Basis-URL-patroon
http://localhost:8084/{module}

# Voorbeeld-URL's van modules
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Omgevingsvariabelen van de API

Het kernproject **Api** (`.env.sample`) heeft de meeste configuratie. Dit zijn de belangrijkste variabelen:

### Gedeelde instellingen

| Variabele | Beschrijving | Voorbeeld |
|----------|-------------|---------|
| `ENVIRONMENT` | Runtimeomgeving | `dev` |
| `SERVER_PORT` | HTTP-poort voor de lokale ontwikkelserver | `8084` |
| `ENCRYPTION_KEY` | 192-bits versleutelingssleutel voor gevoelige gegevens | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Geheim voor het ondertekenen van JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Waar geüploade bestanden worden opgeslagen (`disk` of `s3`) | `disk` |
| `CORS_ORIGIN` | Toegestane CORS-oorsprongen (`*` voor lokale ontwikkeling) | `*` |

### Databaseverbinding

Eén basis-URL wijst de API naar MySQL. De API leidt hiervan één database per module af (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Variabele | Voorbeeld |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Vervang `root:password` door je eigen MySQL-gegevens. Elke database per module moet bestaan voordat je de API start. Gebruik `npm run initdb` om het schema voor alle modules aan te maken, of `npm run initdb:membership` voor één module.
:::

### WebSocket-instellingen

| Variabele | Beschrijving | Voorbeeld |
|----------|-------------|---------|
| `SOCKET_PORT` | Poort voor de WebSocket-server | `8087` |
| `SOCKET_URL` | WebSocket-URL waarmee clients verbinding maken | `ws://localhost:8087` |

---

## Omgevingsvariabelen van de webapps

### B1Admin (React + Vite)

Voorbeeldbestand: `.env.sample`

| Variabele | Beschrijving | Voorbeeld (demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Naam van de omgeving | `demo` |
| `PORT` | Poort van de ontwikkelserver | `3101` |
| `REACT_APP_API_BASE` | Eén basis-URL voor alle ChurchApps-API's (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` worden automatisch toegevoegd) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL voor contentlevering | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics-ID (optioneel) | `UA-123456789-1` |

Voor ontwikkeling met een lokale API wijs je de basis-URL naar je lokale omgeving:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Voorbeeldbestand: `.env.sample`

| Variabele | Beschrijving | Voorbeeld (demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Eén basis-URL voor alle ChurchApps-API's (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` worden automatisch toegevoegd) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL voor contentlevering | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics-ID (optioneel) | `UA-123456789-1` |

:::info
Next.js vereist het voorvoegsel `NEXT_PUBLIC_` voor elke omgevingsvariabele die in de browser beschikbaar moet zijn. Variabelen die alleen op de server worden gebruikt, hebben dit voorvoegsel niet nodig.
:::

### LessonsApp (Next.js)

Voorbeeldbestand: `dotenv.sample.txt`

| Variabele | Beschrijving | Voorbeeld (lokale LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Omgevingsfase (laat leeg of stel in op `dev` voor lokale ontwikkeling) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL van de Lessons-API | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL voor contentlevering | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | ChurchApps-API-basis voor aanmelden (wordt alleen gebruikt wanneer `STAGE` leeg is of `dev` is) | `https://api.demo.churchapps.org` |

---

## Omgevingsvariabelen van de mobiele apps

### B1Checkin (React Native / Expo)

Voorbeeldbestand: `dotenv.sample.txt`

| Variabele | Beschrijving | Voorbeeld |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | Bepaalt welke set API's de app gebruikt: `dev` (lokale API op `http://127.0.0.1:8084`), `staging` of `prod` (de standaard wanneer niet ingesteld) | `dev` |

B1Checkin gebruikt alleen de API-modules Membership en Attendance, plus de URL voor contentlevering; de adressen per fase zijn ingesteld in `src/helpers/EnvironmentHelper.ts`.

:::info
Expo voegt alleen variabelen met het voorvoegsel `EXPO_PUBLIC_` toe aan de app-bundel. Start de ontwikkelserver opnieuw met `yarn start --reset-cache` nadat je `.env` hebt gewijzigd.
:::

---

## Snelle referentie: locaties van voorbeeldbestanden

| Project | Voorbeeldbestand |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
