---
title: "Mga Environment Variable"
description: "I-set up ang mga .env file para sa mga proyekto ng ChurchApps, piliin ang shared demo API o lokal na API, at punan ang mga variable para sa B1 Admin, B1.church, B1 Checkin, at iba pa."
---

# Mga Environment Variable

<div class="article-intro">

Gumagamit ang bawat proyekto ng ChurchApps ng `.env` file para sa lokal na configuration. May kasamang sample file ang bawat proyekto na kokopyahin mo at ia-adjust. Tinatalakay ng pahinang ito ang mga environment variable para sa mga API, web app, at mobile app, kasama kung paano pipiliin ang pagitan ng demo at lokal na API target.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang [mga prerequisite](./prerequisites.md) para sa proyektong gusto mong gamitin
- I-clone ang project repository na gusto mong pagtrabahuhan
- Basahin ang [Project Overview](./project-overview.md) para maunawaan kung aling mga API module ang kailangan ng iyong proyekto

</div>

## Pangkalahatang Pattern

1. Hanapin ang `dotenv.sample.txt` o `.env.sample` sa root ng proyekto.
2. Kopyahin ito bilang `.env`.
3. I-edit ang mga value ayon sa kailangan.

```bash
# Halimbawa para sa proyektong may .env.sample
cp .env.sample .env

# Halimbawa para sa proyektong may dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Huwag na huwag mag-commit ng `.env` file sa version control.** Naglalaman ang mga ito ng mga sensitibong impormasyon gaya ng database credentials, API key, at JWT secret. Kasama sa `.gitignore` ng lahat ng proyekto ng ChurchApps ang `.env`, pero siguraduhin pa rin na tama ang lahat bago mag-commit.
:::

## Pagpili ng API Target

Ang pinakamahalagang desisyon ay kung saang API ituturo ng frontend ang mga tawag nito. May dalawang opsyon:

### Opsyon 1: Demo API (Inirerekomenda para sa Frontend Development)

Gamitin ang shared demo environment. Hindi na kailangan ng lokal na API o database setup. Pinapatakbo nito ang pinakabagong code mula sa `main`, at nire-reload ang sample data nito tuwing gabi.

```bash
# Pattern ng base URL
https://api.demo.churchapps.org/{module}

# Mga halimbawang URL ng module
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Wala na ang staging environment (`api.staging.churchapps.org`, `api.staging.lessons.church`, at mga kaugnay na host). Maaaring may staging URL pa rin ang ilang sample na `.env` file; palitan ang mga ito ng demo o lokal na value na nakalagay sa pahinang ito. Wala nang shared na non-production na Lessons API. Patakbuhin ang [LessonsApi](https://github.com/ChurchApps/LessonsApi) nang lokal (nakikinig ito sa port `8090`) kapag kailangan mo nito.
:::

### Opsyon 2: Lokal na API

Patakbuhin ang Api project sa iyong makina. Kailangan ang MySQL 8.0+ na may mga database na nagawa para sa bawat module. Tingnan ang gabay na [API local setup](../api/local-setup.md).

```bash
# Pattern ng base URL
http://localhost:8084/{module}

# Mga halimbawang URL ng module
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
|----------|-------------|-----------|
| `ENVIRONMENT` | Runtime environment | `dev` |
| `SERVER_PORT` | HTTP port para sa lokal na dev server | `8084` |
| `ENCRYPTION_KEY` | 192-bit na encryption key para sa sensitibong data | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Secret para sa pagpirma ng JSON Web Token | `jwt-secret-dev` |
| `FILE_STORE` | Saan iimbakin ang mga na-upload na file (`disk` o `s3`) | `disk` |
| `CORS_ORIGIN` | Mga pinapayagang CORS origin (`*` para sa lokal na dev) | `*` |

### Koneksyon sa Database

Iisang base URL lang ang itinuturo ng API sa MySQL. Gumagawa ang API ng isang database para sa bawat module (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) mula sa base na ito.

| Variable | Halimbawa |
|----------|-----------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
I-update ang `root:password` gamit ang totoong MySQL credentials mo. Dapat umiiral na ang bawat database ng module bago patakbuhin ang API. Gamitin ang `npm run initdb` para gawin ang schema ng lahat ng module, o `npm run initdb:membership` para sa isang module lang.
:::

### Mga Setting ng WebSocket

| Variable | Paglalarawan | Halimbawa |
|----------|-------------|-----------|
| `SOCKET_PORT` | Port para sa WebSocket server | `8087` |
| `SOCKET_URL` | WebSocket URL na kokonektahan ng mga client | `ws://localhost:8087` |

---

## Mga Environment Variable ng Web App

### B1Admin (React + Vite)

Sample file: `.env.sample`

| Variable | Paglalarawan | Halimbawa (Demo) |
|----------|-------------|------------------|
| `REACT_APP_STAGE` | Pangalan ng environment | `demo` |
| `PORT` | Port ng dev server | `3101` |
| `REACT_APP_API_BASE` | Iisang base URL para sa lahat ng ChurchApps API (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` ay awtomatikong idinadagdag) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL ng content delivery | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (opsyonal) | `UA-123456789-1` |

Para sa lokal na API development, ituro ang base URL sa lokal mong stack:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Sample file: `.env.sample`

| Variable | Paglalarawan | Halimbawa (Demo) |
|----------|-------------|------------------|
| `NEXT_PUBLIC_API_BASE` | Iisang base URL para sa lahat ng ChurchApps API (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` ay awtomatikong idinadagdag) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL ng content delivery | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (opsyonal) | `UA-123456789-1` |

:::info
Kailangan ng Next.js ang prefix na `NEXT_PUBLIC_` para sa anumang environment variable na kailangang makita sa browser. Hindi kailangan ng prefix na ito ang mga variable na para sa server lang.
:::

### LessonsApp (Next.js)

Sample file: `dotenv.sample.txt`

| Variable | Paglalarawan | Halimbawa (Lokal na LessonsApi) |
|----------|-------------|---------------------------------|
| `STAGE` | Yugto ng environment (iwanang walang laman o gawing `dev` para sa lokal na development) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL ng Lessons API | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL ng content delivery | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Base ng ChurchApps API na ginagamit sa sign-in (kinikilala lang kapag walang laman ang `STAGE` o `dev`) | `https://api.demo.churchapps.org` |

---

## Mga Environment Variable ng Mobile App

### B1Checkin (React Native / Expo)

Sample file: `dotenv.sample.txt`

| Variable | Paglalarawan | Halimbawa |
|----------|-------------|-----------|
| `EXPO_PUBLIC_STAGE` | Pinipili kung aling set ng API ang kokonektahan ng app: `dev` (lokal na API sa `http://127.0.0.1:8084`), `staging`, o `prod` (ang default kapag walang laman) | `dev` |

Ang B1Checkin ay gumagamit lamang ng Membership at Attendance API module at ng URL ng content delivery. Nakatakda ang kanilang mga address para sa bawat stage sa `src/helpers/EnvironmentHelper.ts`.

:::info
Tanging mga variable na may prefix na `EXPO_PUBLIC_` lang ang isinasama ng Expo sa app bundle. I-restart ang dev server gamit ang `yarn start --reset-cache` pagkatapos baguhin ang `.env`.
:::

---

## Mabilisang Sanggunian: Lokasyon ng Sample File

| Proyekto | Sample File |
|----------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
