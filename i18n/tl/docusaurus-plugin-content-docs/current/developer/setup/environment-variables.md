---
title: "Mga Environment Variable"
---

# Mga Environment Variable

<div class="article-intro">

Gumagamit ang bawat proyekto ng ChurchApps ng `.env` file para sa lokal na configuration. May kasamang sample file ang bawat proyekto na kinokopya at ini-customize mo. Sakop ng pahinang ito ang mga environment variable para sa mga API, web app, at mobile app, kasama kung paano pipiliin sa pagitan ng demo at local API target.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang [prerequisites](./prerequisites) para sa iyong proyekto
- I-clone ang project repository na gusto mong pagtrabahuhan
- Basahin ang [Project Overview](./project-overview) para maunawaan kung aling API module ang kailangan ng iyong proyekto

</div>

## Pangkalahatang Pattern

1. Hanapin ang `dotenv.sample.txt` o `.env.sample` sa root ng proyekto.
2. Kopyahin ito bilang `.env`.
3. I-edit ang mga value ayon sa kailangan.

```bash
# Example for a project with .env.sample
cp .env.sample .env

# Example for a project with dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Huwag kailanman i-commit ang mga `.env` file sa version control.** Naglalaman ang mga ito ng mga sensitibong bagay gaya ng database credentials, API keys, at JWT secrets. Lahat ng proyekto ng ChurchApps ay may `.env` sa `.gitignore`, pero laging i-double check bago mag-commit.
:::

## Pagpili ng API Target

Ang pinakamahalagang desisyon ay kung saan tuturo ang iyong frontend para sa mga API call. May dalawang opsyon:

### Opsyon 1: Demo API (Inirerekomenda para sa Frontend Development)

Gamitin ang shared demo environment. Walang kailangang local API o database setup. Pinapatakbo nito ang pinakabagong code mula sa `main`, at nire-repopulate ang sample data nito tuwing gabi.

```bash
# Base URL pattern
https://api.demo.churchapps.org/{module}

# Example module URLs
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Retired na ang staging environment (`api.staging.churchapps.org`, `api.staging.lessons.church`, at mga kaugnay na host). Maaaring may staging URL pa rin ang ilang sample `.env` file; palitan ang mga ito ng demo o local value na nakasaad sa pahinang ito. Walang shared non-production na Lessons API -- patakbuhin ang [LessonsApi](https://github.com/ChurchApps/LessonsApi) nang lokal (nakikinig ito sa port `8090`) kapag kailangan mo ito.
:::

### Opsyon 2: Local API

Patakbuhin ang Api project sa iyong makina. Nangangailangan ng MySQL 8.0+ na may mga database na nagawa para sa bawat module. Tingnan ang gabay na [API local setup](../api/local-setup).

```bash
# Base URL pattern
http://localhost:8084/{module}

# Example module URLs
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Mga Environment Variable ng API

Ang pangunahing **Api** project (`.env.sample`) ang may pinakamaraming configuration. Narito ang mga pangunahing variable:

### Mga Shared na Setting

| Variable | Paglalarawan | Halimbawa |
|----------|-------------|---------|
| `ENVIRONMENT` | Runtime environment | `dev` |
| `SERVER_PORT` | HTTP port para sa local dev server | `8084` |
| `ENCRYPTION_KEY` | 192-bit na encryption key para sa sensitibong data | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Secret para sa pag-sign ng JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Saan iimbak ang mga na-upload na file (`disk` o `s3`) | `disk` |
| `CORS_ORIGIN` | Mga pinapayagang CORS origin (`*` para sa local dev) | `*` |

### Koneksyon sa Database

Isang base URL lang ang tumuturo sa API sa MySQL. Gumagawa ang API ng isang database bawat module (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) mula sa base na ito.

| Variable | Halimbawa |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
I-update ang `root:password` gamit ang iyong aktwal na MySQL credentials. Dapat umiral na ang bawat per-module database bago patakbuhin ang API. Gamitin ang `npm run initdb` para gawin ang schema ng lahat ng module, o `npm run initdb:membership` para sa isang module lang.
:::

### Mga Setting ng WebSocket

| Variable | Paglalarawan | Halimbawa |
|----------|-------------|---------|
| `SOCKET_PORT` | Port para sa WebSocket server | `8087` |
| `SOCKET_URL` | WebSocket URL na kokonektahan ng mga client | `ws://localhost:8087` |

---

## Mga Environment Variable ng Web App

### B1Admin (React + Vite)

Sample file: `.env.sample`

| Variable | Paglalarawan | Halimbawa (Demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Pangalan ng environment | `demo` |
| `PORT` | Port ng dev server | `3101` |
| `REACT_APP_API_BASE` | Iisang base URL para sa lahat ng ChurchApps API (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` ay awtomatikong idinadagdag) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL ng content delivery | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (opsyonal) | `UA-123456789-1` |

Para sa local API development, ituro ang base URL sa iyong local stack:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Sample file: `.env.sample`

| Variable | Paglalarawan | Halimbawa (Demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Iisang base URL para sa lahat ng ChurchApps API (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` ay awtomatikong idinadagdag) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL ng content delivery | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (opsyonal) | `UA-123456789-1` |

:::info
Kailangan ng Next.js ang prefix na `NEXT_PUBLIC_` para sa anumang environment variable na kailangang available sa browser. Hindi kailangan ng prefix na ito ang mga variable na server-only.
:::

### LessonsApp (Next.js)

Sample file: `dotenv.sample.txt`

| Variable | Paglalarawan | Halimbawa (Local LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Stage ng environment (iwanang hindi naka-set o `dev` para sa local development) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL ng Lessons API | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL ng content delivery | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | ChurchApps API base na ginagamit sa sign-in (kinikilala lang kapag hindi naka-set ang `STAGE` o `dev`) | `https://api.demo.churchapps.org` |

---

## Mga Environment Variable ng Mobile App

### B1Mobile (React Native / Expo)

Sample file: `dotenv.sample.txt`

| Variable | Paglalarawan | Halimbawa (Demo) |
|----------|-------------|----------------|
| `STAGE` | Pangalan ng environment | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Isang URL bawat ChurchApps API module (default sa production kapag hindi naka-set) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons API (hiwalay na host; walang shared na non-production) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL ng content delivery | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL ng Lessons site | `https://lessons.church` |

:::info
Hindi gumagamit ng prefix na `REACT_APP_` o `NEXT_PUBLIC_` ang mga mobile app. Ang pag-access sa environment variable ay hinahawakan ng Expo configuration.
:::

---

## Mabilisang Sanggunian: Mga Lokasyon ng Sample File

| Proyekto | Sample File |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
