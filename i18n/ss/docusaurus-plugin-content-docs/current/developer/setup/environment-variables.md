---
title: "Emavariyebuli Endzawo"
---

# Emavariyebuli Endzawo

<div class="article-intro">

Lonkhe liphrojekthi le-ChurchApps lisebentisa ifayela le-`.env` ekuhleleni kwendzawo yasekhaya. Ngalinye liphrojekthi lihlanganisa ifayela lesibonelo (sample) longalikopisha bese ulilungisa. Lelikhasi likhuluma ngemavariyebuli endzawo ema-API, tinhlelo te-web, kanye netinhlelo teselula, kuhlanganisa nendlela yekukhetsa emkatsi kwe-staging kanye netagethi te-API tasekhaya (local).

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekutsi Ucale</h4>

- Faka [tidzingo tekucala](./prerequisites) teliphrojekthi lakho
- Kopisha (clone) i-repository yeliphrojekthi lofuna kusebentela kulo
- Bukisisa [Simo Sonkhe Semaphrojekthi](./project-overview) kute ucondze kutsi ngimaphi ema-module e-API lawadzingekako liphrojekthi lakho

</div>

## Iphetheni Lejwayelekile

1. Funa i-`dotenv.sample.txt` kumbe i-`.env.sample` ku-root yeliphrojekthi.
2. Yikopishe uyifake ku-`.env`.
3. Lungisa emanani ngendlela lokuya ngayo.

```bash
# Sibonelo seliphrojekthi lelinele-.env.sample
cp .env.sample .env

# Sibonelo seliphrojekthi lelinele-dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Ungakemuva ufake emafayela e-`.env` ku-version control.** Aphetse imfihlo (secrets) njenge-database credentials, ema-API key, kanye ne-JWT secrets. Onkhe emaphrojekthi e-ChurchApps ahlanganisa i-`.env` ku-`.gitignore`, kodvwa chaka njalo ngaphambi kwekufaka (commit).
:::

## Kukhetsa Tagethi Ye-API

Sincumo lesibalulekile kakhulu kusiphi indzawo lapho i-frontend yakho ikhomba khona kutakwenta ema-API call. Kunetintfo letimbili longakhetsa kuto:

### Sincumo 1: Ema-Staging API (Kuncocedwa Ekutfutfukisweni Kwe-Frontend)

Sebentisa indzawo ye-staging lesabelwanako. Akudzingeki i-API yasekhaya kumbe kuhlelwa kwe-database.

```bash
# Iphetheni ye-Base URL
https://api.staging.churchapps.org/{module}

# Tibonelo tema-URL yema-module
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### Sincumo 2: I-API Yasekhaya

Gijimisa liphrojekthi le-Api emshinini wakho. Kudzinga i-MySQL 8.0+ nema-database lakhiwe kumamodyuli wonkhe. Bona umhlahlandlela we-[API local setup](../api/local-setup).

```bash
# Iphetheni ye-Base URL
http://localhost:8084/{module}

# Tibonelo tema-URL yema-module
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Emavariyebuli Endzawo Ye-API

Liphrojekthi le-core **Api** (`.env.sample`) linekuhlelwa lokunyenti kakhulu. Nawa emavariyebuli labalulekile:

### Kuhlelwa Lokusabelwanako

| Ivariyebuli | Incazelo | Sibonelo |
|----------|-------------|---------|
| `ENVIRONMENT` | Indzawo yekusebenta | `dev` |
| `SERVER_PORT` | I-HTTP port ye-dev server yasekhaya | `8084` |
| `ENCRYPTION_KEY` | Inkhinombolo (key) ye-encryption ye-192-bit yemininingwane lebalulekile | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Imfihlo yekusayina ema-JSON Web Token | `jwt-secret-dev` |
| `FILE_STORE` | Kutsi emafayela lafakiwe agcinwa kuphi (`disk` kumbe `s3`) | `disk` |
| `CORS_ORIGIN` | Ema-origin la-CORS lavunywe (`*` kutfutfukiswa kwasekhaya) | `*` |

### Kuxhuma Ku-Database

I-base URL yinye ikhomba i-API ku-MySQL. I-API yakha i-database yinye ngamunye we-module (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) kusuka kulobu-base.

| Ivariyebuli | Sibonelo |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Shintja i-`root:password` ube ne-credentials yakho yangempela ye-MySQL. Ngamunye we-database ye-module kufanele ibe khona ngaphambi kwekugijimisa i-API. Sebentisa i-`npm run initdb` kute wakhe i-schema kuwo onkhe ema-module, kumbe i-`npm run initdb:membership` ku-module yinye.
:::

### Kuhlelwa Kwe-WebSocket

| Ivariyebuli | Incazelo | Sibonelo |
|----------|-------------|---------|
| `SOCKET_PORT` | I-port ye-WebSocket server | `8087` |
| `SOCKET_URL` | I-WebSocket URL yekutsi tikhulumisani tixhume | `ws://localhost:8087` |

---

## Emavariyebuli Endzawo Tinhlelo Te-Web

### B1Admin (React + Vite)

Ifayela lesibonelo: `.env.sample`

| Ivariyebuli | Incazelo | Sibonelo (Staging) |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | Ligama lendzawo yekusebenta | `demo` |
| `PORT` | I-port ye-dev server | `3101` |
| `REACT_APP_API_BASE` | I-base URL yinye kuwo onkhe ema-API e-ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` tengetwa ngekutitigenzi) | `https://api.staging.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | I-URL yekulethwa kwekucuketfwe | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | I-ID ye-Google Analytics (akudzingeki) | `UA-123456789-1` |

Ekutfutfukisweni kwe-API yasekhaya, khomba i-base URL kusitulo sakho sasekhaya:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Ifayela lesibonelo: `.env.sample`

| Ivariyebuli | Incazelo | Sibonelo (Staging) |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_API_BASE` | I-base URL yinye kuwo onkhe ema-API e-ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` tengetwa ngekutitigenzi) | `https://api.staging.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | I-URL yekulethwa kwekucuketfwe | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | I-base URL ye-ChurchApps | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | I-ID ye-Google Analytics (akudzingeki) | `UA-123456789-1` |

:::info
I-Next.js idzinga i-prefix ye-`NEXT_PUBLIC_` kunoma nguluphi luvariyebuli lolwendzawo lolufuneka lutfolakale ku-browser. Emavariyebuli lasebentela ku-server kuphela awadzingi lesiprefix.
:::

### LessonsApp (Next.js)

Ifayela lesibonelo: `dotenv.sample.txt`

| Ivariyebuli | Incazelo | Sibonelo (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Isigaba sendzawo yekusebenta | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | I-URL ye-Lessons API | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | I-URL yekulethwa kwekucuketfwe | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | I-base URL ye-ChurchApps | `https://staging.churchapps.org` |

---

## Emavariyebuli Endzawo Tinhlelo Teselula

### B1Mobile (React Native / Expo)

Ifayela lesibonelo: `dotenv.sample.txt`

| Ivariyebuli | Incazelo | Sibonelo (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Ligama lendzawo yekusebenta | `dev` |
| `API_BASE` | I-base URL yinye kuwo onkhe ema-API e-ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing` tengetwa ngekutitigenzi) | `https://api.staging.churchapps.org` |
| `LESSONS_API` | I-Lessons API (host lehlukene) | `https://api.staging.lessons.church` |
| `CONTENT_ROOT` | I-URL yekulethwa kwekucuketfwe | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | I-URL yesayithi ye-Lessons | `https://staging.lessons.church` |

:::info
Tinhlelo teselula atisebentisi i-prefix ye-`REACT_APP_` kumbe i-`NEXT_PUBLIC_`. Kufinyelelwa kwemavariyebuli endzawo kuphatfwa yikuhlelwa kwe-Expo.
:::

---

## Kubuka Ngekushesha: Tindzawo Tema-Fayela Esibonelo

| Liphrojekthi | Ifayela Lesibonelo |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
