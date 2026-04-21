---
title: "Environment Variables"
---

# Environment Variables

<div class="article-intro">

Elk ChurchApps-project gebruikt een `.env`-bestand voor lokale configuratie. Elk project bevat een voorbeeldbestand dat u kopieert en aanpast. Deze pagina behandelt de omgevingsvariabelen voor API's, web-apps en mobiele apps, inclusief hoe u tussen staging- en lokale API-doelen kiest.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Installeer de [voorwaarden](./prerequisites) voor uw project
- Kloon de projectrepository die u wilt gebruiken
- Lees het [Project Overview](./project-overview) om te begrijpen welke API-modules uw project nodig heeft

</div>

## Algemeen Patroon

1. Zoek naar `dotenv.sample.txt` of `.env.sample` in de projectroot.
2. Kopieer het naar `.env`.
3. Bewerk de waarden naar behoefte.

```bash
# Voorbeeld voor een project met .env.sample
cp .env.sample .env

# Voorbeeld voor een project met dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Leg nooit `.env`-bestanden vast in versiebeheer.** Ze bevatten geheimen zoals databasegegevens, API-sleutels en JWT-geheimen. Alle ChurchApps-projecten nemen `.env` op in `.gitignore`, maar controleer altijd tweemaal voordat u doorvoert.
:::

## Kiezen van een API-doel

De belangrijkste beslissing is waar uw frontend naar wijst voor API-aanroepen. Er zijn twee opties:

### Optie 1: Staging API's (aanbevolen voor frontend-ontwikkeling)

Gebruik de gedeelde staging-omgeving. Geen lokale API- of databasesetup nodig.

```bash
# Base URL patroon
https://api.staging.churchapps.org/{module}

# Voorbeeld module-URL's
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### Optie 2: Lokale API

Voer het Api-project op uw machine uit. Vereist MySQL 8.0+ met databases gemaakt voor elke module. Zie de [API lokale setup](../api/local-setup)-gids.

```bash
# Base URL patroon
http://localhost:8084/{module}

# Voorbeeld module-URL's
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API-omgevingsvariabelen

Het kern **Api**-project (`.env.sample`) heeft de meeste configuratie. Hier zijn de sleutelvariabelen:

### Gedeelde Instellingen

| Variable | Beschrijving | Voorbeeld |
|----------|-------------|---------|
| `ENVIRONMENT` | Runtime-omgeving | `dev` |
| `SERVER_PORT` | HTTP-poort voor lokale dev-server | `8084` |
| `ENCRYPTION_KEY` | 192-bits versleutelingssleutel voor gevoelige gegevens | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Geheim voor ondertekening van JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Waar geupload bestanden opslaan (`disk` of `s3`) | `disk` |
| `CORS_ORIGIN` | Toegestane CORS-oorsprongen (`*` voor lokale dev) | `*` |

### Databaseverbindingen

Elke API-module heeft zijn eigen MySQL-database en verbindingsreeks:

| Variable | Database |
|----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
Werk `root:password` bij met uw werkelijke MySQL-gegevens. Elke database moet worden gemaakt voordat u de API uitvoert. Gebruik `npm run initdb` om het schema voor alle modules te maken, of `npm run initdb:membership` voor een enkele module.
:::

### WebSocket-instellingen

| Variable | Beschrijving | Voorbeeld |
|----------|-------------|---------|
| `SOCKET_PORT` | Poort voor WebSocket-server | `8087` |
| `SOCKET_URL` | WebSocket-URL voor clients om verbinding te maken | `ws://localhost:8087` |

---

## Web App-omgevingsvariabelen

### B1Admin (React + Vite)

Voorbeeldbestand: `.env.sample`

| Variable | Beschrijving | Voorbeeld (Staging) |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | Omgevingnaam | `demo` |
| `PORT` | Dev-server-poort | `3101` |
| `REACT_APP_MEMBERSHIP_API` | Lidmaatschap API-URL | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | Aanwezigheid API-URL | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | Donaties API-URL | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | Inhoudsleverings-URL | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics-ID (optioneel) | `UA-123456789-1` |

Voor lokale API-ontwikkeling kunt u de `localhost`-varianten uncomment en gebruiken:

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

Voorbeeldbestand: `.env.sample`

| Variable | Beschrijving | Voorbeeld (Staging) |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | Lidmaatschap API-URL | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | Aanwezigheid API-URL | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | Donaties API-URL | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | Messaging API-URL | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | Inhoud API-URL | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Inhoudsleverings-URL | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps-basis-URL | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics-ID (optioneel) | `UA-123456789-1` |

:::info
Next.js vereist het `NEXT_PUBLIC_`-voorvoegsel voor elke omgevingsvariabele die in de browser beschikbaar moet zijn. Alleen-server-variabelen hebben dit voorvoegsel niet nodig.
:::

### LessonsApp (Next.js)

Voorbeeldbestand: `dotenv.sample.txt`

| Variable | Beschrijving | Voorbeeld (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Omgevingsstage | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API-URL | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Inhoudsleverings-URL | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps-basis-URL | `https://staging.churchapps.org` |

---

## Mobiele app-omgevingsvariabelen

### B1Mobile (React Native / Expo)

Voorbeeldbestand: `dotenv.sample.txt`

| Variable | Beschrijving | Voorbeeld (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Omgevingnaam | `dev` |
| `MEMBERSHIP_API` | Lidmaatschap API-URL | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | Messaging API-URL | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | Aanwezigheid API-URL | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | Donaties API-URL | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | Taken API-URL | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | Inhoud API-URL | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | Inhoudsleverings-URL | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | Lessons-site-URL | `https://staging.lessons.church` |

:::info
Mobiele apps gebruiken het `REACT_APP_`- of `NEXT_PUBLIC_`-voorvoegsel niet. Omgevingsvariabeleentoegang wordt verwerkt door de Expo-configuratie.
:::

---

## Snelle Referentie: Voorbeeldbestandlocaties

| Project | Voorbeeldbestand |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
