---
title: "Mga Variable ng Kapaligiran"
---

# Mga Variable ng Kapaligiran

<div class="article-intro">

Ang bawat proyekto ng ChurchApps ay gumagamit ng `.env` file para sa lokal na configuration. Ang bawat proyekto ay may kasamang sample file na iyong kokopyahin at ipa-customize. Sinasaklaw ng pahinang ito ang mga variable ng kapaligiran para sa mga API, web app, at mobile app, kasama ang kung paano pumili sa pagitan ng staging at lokal na API target.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-install ng mga [pangangailangan](./prerequisites) para sa iyong proyekto
- I-clone ang repository ng proyektong gusto mong gamitin
- Suriin ang [Pangkalahatang-tanaw ng Proyekto](./project-overview) upang maunawaan kung aling mga API module ang kailangan ng iyong proyekto

</div>

## Pangkalahatang Pattern

1. Maghanap ng `dotenv.sample.txt` o `.env.sample` sa root ng proyekto.
2. Kopyahin ito sa `.env`.
3. I-edit ang mga halaga kung kinakailangan.

```bash
# Halimbawa para sa isang proyekto na may .env.sample
cp .env.sample .env

# Halimbawa para sa isang proyekto na may dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Huwag kailanman mag-commit ng mga `.env` file sa version control.** Naglalaman ang mga ito ng mga lihim tulad ng mga kredensyal ng database, mga API key, at mga JWT secret. Lahat ng proyekto ng ChurchApps ay may kasamang `.env` sa `.gitignore`, ngunit palaging mag-double check bago mag-commit.
:::

## Pagpili ng API Target

Ang pinakamahalagang desisyon ay kung saan ituturo ng iyong frontend ang mga API call. Dalawang opsyon ang mayroon:

### Opsyon 1: Mga Staging API (Inirerekomenda para sa Frontend Development)

Gamitin ang shared na staging environment. Walang kinakailangang lokal na API o database setup.

```bash
# Pattern ng Base URL
https://api.staging.churchapps.org/{module}

# Halimbawa ng mga module URL
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### Opsyon 2: Lokal na API

Patakbuhin ang proyekto ng Api sa iyong makina. Nangangailangan ng MySQL 8.0+ na may mga database na nilikha para sa bawat module. Tingnan ang gabay sa [lokal na pag-setup ng API](../api/local-setup).

```bash
# Pattern ng Base URL
http://localhost:8084/{module}

# Halimbawa ng mga module URL
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Mga Variable ng Kapaligiran ng API

Ang pangunahing proyektong **Api** (`.env.sample`) ang may pinakamaraming configuration. Narito ang mga pangunahing variable:

### Mga Shared Setting

| Variable | Paglalarawan | Halimbawa |
|----------|-------------|---------|
| `ENVIRONMENT` | Kapaligiran ng runtime | `dev` |
| `SERVER_PORT` | HTTP port para sa lokal na dev server | `8084` |
| `ENCRYPTION_KEY` | 192-bit na encryption key para sa sensitibong data | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Lihim para sa pag-sign ng mga JSON Web Token | `jwt-secret-dev` |
| `FILE_STORE` | Kung saan iimbak ang mga na-upload na file (`disk` o `s3`) | `disk` |
| `CORS_ORIGIN` | Mga pinapayagang CORS origin (`*` para sa lokal na dev) | `*` |

### Mga Koneksyon sa Database

Ang bawat API module ay may sariling MySQL database at connection string:

| Variable | Database |
|----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
I-update ang `root:password` ng iyong aktwal na mga MySQL credential. Ang bawat database ay kailangang malikha bago patakbuhin ang API. Gamitin ang `npm run initdb` para likhain ang schema para sa lahat ng module, o `npm run initdb:membership` para sa isang module.
:::

### Mga Setting ng WebSocket

| Variable | Paglalarawan | Halimbawa |
|----------|-------------|---------|
| `SOCKET_PORT` | Port para sa WebSocket server | `8087` |
| `SOCKET_URL` | WebSocket URL para sa pagkonekta ng mga client | `ws://localhost:8087` |

---

## Mga Variable ng Kapaligiran ng Web App

### B1Admin (React + Vite)

Sample file: `.env.sample`

| Variable | Paglalarawan | Halimbawa (Staging) |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | Pangalan ng kapaligiran | `demo` |
| `PORT` | Port ng dev server | `3101` |
| `REACT_APP_MEMBERSHIP_API` | URL ng Membership API | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | URL ng Attendance API | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | URL ng Giving API | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | URL ng content delivery | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (opsyonal) | `UA-123456789-1` |

Para sa lokal na API development, alisin ang comment at gamitin ang mga `localhost` variant:

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

Sample file: `.env.sample`

| Variable | Paglalarawan | Halimbawa (Staging) |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | URL ng Membership API | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | URL ng Attendance API | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | URL ng Giving API | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | URL ng Messaging API | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | URL ng Content API | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL ng content delivery | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | Base URL ng ChurchApps | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (opsyonal) | `UA-123456789-1` |

:::info
Nangangailangan ang Next.js ng prefix na `NEXT_PUBLIC_` para sa anumang variable ng kapaligiran na kailangang magamit sa browser. Ang mga variable na para sa server lamang ay hindi nangangailangan ng prefix na ito.
:::

### LessonsApp (Next.js)

Sample file: `dotenv.sample.txt`

| Variable | Paglalarawan | Halimbawa (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Yugto ng kapaligiran | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | URL ng Lessons API | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL ng content delivery | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | Base URL ng ChurchApps | `https://staging.churchapps.org` |

---

## Mga Variable ng Kapaligiran ng Mobile App

### B1Mobile (React Native / Expo)

Sample file: `dotenv.sample.txt`

| Variable | Paglalarawan | Halimbawa (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Pangalan ng kapaligiran | `dev` |
| `MEMBERSHIP_API` | URL ng Membership API | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | URL ng Messaging API | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | URL ng Attendance API | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | URL ng Giving API | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | URL ng Doing API | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | URL ng Content API | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | URL ng content delivery | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | URL ng Lessons site | `https://staging.lessons.church` |

:::info
Ang mga mobile app ay hindi gumagamit ng prefix na `REACT_APP_` o `NEXT_PUBLIC_`. Ang pag-access ng variable ng kapaligiran ay hina-handle ng Expo configuration.
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
