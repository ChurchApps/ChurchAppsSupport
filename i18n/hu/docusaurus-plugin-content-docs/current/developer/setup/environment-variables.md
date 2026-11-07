---
title: "Környezeti változók"
description: "A .env fájl beállítása ChurchApps-projektekhez: közös demó API vagy helyi API választása, a változók kitöltése (B1 Admin, B1.church, Lessons.church stb.)."
---

# Környezeti változók

<div class="article-intro">

Minden ChurchApps-projekt helyi konfigurációhoz `.env` fájlt használ. Minden projekt tartalmaz egy mintafájlt, amelyet át kell másolni és testre kell szabni. Ez az oldal az API-k, a webalkalmazások és a mobilalkalmazások környezeti változóit ismerteti, beleértve azt is, hogyan válasszon a demó és a helyi API-cél között.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Telepítse a projekthez szükséges [előfeltételeket](./prerequisites.md)
- Klónozza le a projekt tárolóját, amellyel dolgozni szeretne
- Tekintse át a [Projekt áttekintést](./project-overview.md), hogy megértse, mely API-modulokra van szüksége a projektnek

</div>

## Általános minta

1. Keresse meg a `dotenv.sample.txt` vagy `.env.sample` fájlt a projekt gyökerében.
2. Másolja át `.env` néven.
3. Szükség szerint módosítsa az értékeket.

```bash
# Példa a .env.sample fájllal rendelkező projektre
cp .env.sample .env

# Példa a dotenv.sample.txt fájllal rendelkező projektre
cp dotenv.sample.txt .env
```

:::warning
**Soha ne commitolja a `.env` fájlokat a verziókezelőbe.** Ezek titkos adatokat tartalmaznak, például adatbázis-hitelesítő adatokat, API-kulcsokat és JWT-titkokat. Minden ChurchApps-projekt felveszi a `.env` fájlt a `.gitignore` fájlba, de commitolás előtt mindig ellenőrizze még egyszer.
:::

## API-cél kiválasztása

A legfontosabb döntés az, hogy a frontend hova küldje az API-hívásait. Két lehetőség van:

### 1. lehetőség: Demó API-k (ajánlott frontend-fejlesztéshez)

Használja a megosztott demókörnyezetet. Nincs szükség helyi API-ra vagy adatbázis-beállításra. A `main` ágból futtatja a legfrissebb kódot, mintaadatai pedig éjszakánként újratöltődnek.

```bash
# Alap URL-minta
https://api.demo.churchapps.org/{module}

# Példa modul-URL-ekre
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
A staging környezet (`api.staging.churchapps.org`, `api.staging.lessons.church` és a kapcsolódó gépnevek) megszűnt. Néhány mintafájl `.env` még tartalmazhat staging URL-eket; cserélje ki őket az ezen az oldalon látható demó vagy helyi értékekre. Nincs megosztott, nem éles Lessons API – ha szükséges, futtassa helyben a [LessonsApi](https://github.com/ChurchApps/LessonsApi) projektet (a `8090` porton figyel).
:::

### 2. lehetőség: Helyi API

Futtassa az Api projektet a saját gépén. MySQL 8.0+ szükséges, minden modulhoz létrehozott adatbázisokkal. Lásd az [API helyi beállítása](../api/local-setup.md) útmutatót.

```bash
# Alap URL-minta
http://localhost:8084/{module}

# Példa modul-URL-ekre
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API környezeti változók

A fő **Api** projekt (`.env.sample`) rendelkezik a legtöbb beállítással. Íme a legfontosabb változók:

### Megosztott beállítások

| Változó | Leírás | Példa |
|----------|-------------|---------|
| `ENVIRONMENT` | Futtatási környezet | `dev` |
| `SERVER_PORT` | A helyi fejlesztői szerver HTTP-portja | `8084` |
| `ENCRYPTION_KEY` | 192 bites titkosítókulcs az érzékeny adatokhoz | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | A JSON Web Tokenek aláírásához használt titok | `jwt-secret-dev` |
| `FILE_STORE` | Hol tárolja a feltöltött fájlokat (`disk` vagy `s3`) | `disk` |
| `CORS_ORIGIN` | Engedélyezett CORS-források (`*` helyi fejlesztéshez) | `*` |

### Adatbázis-kapcsolat

Egyetlen alap URL mutat az API-nak a MySQL-re. Az API ebből az alapból modulonként egy adatbázist származtat (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Változó | Példa |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Cserélje ki a `root:password` részt a saját MySQL-hitelesítő adataira. Az API indítása előtt minden modulhoz tartozó adatbázisnak léteznie kell. Az összes modul sémájának létrehozásához használja az `npm run initdb` parancsot, egyetlen modulhoz pedig az `npm run initdb:membership` parancsot.
:::

### WebSocket-beállítások

| Változó | Leírás | Példa |
|----------|-------------|---------|
| `SOCKET_PORT` | A WebSocket-szerver portja | `8087` |
| `SOCKET_URL` | A kliensek által használt WebSocket URL | `ws://localhost:8087` |

---

## Webalkalmazások környezeti változói

### B1Admin (React + Vite)

Mintafájl: `.env.sample`

| Változó | Leírás | Példa (demó) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | A környezet neve | `demo` |
| `PORT` | A fejlesztői szerver portja | `3101` |
| `REACT_APP_API_BASE` | Egyetlen alap URL minden ChurchApps API-hoz (a `/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` automatikusan hozzáfűződik) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | A tartalomkézbesítés URL-je | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics-azonosító (opcionális) | `UA-123456789-1` |

Helyi API-fejlesztéshez irányítsa az alap URL-t a helyi környezetére:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Mintafájl: `.env.sample`

| Változó | Leírás | Példa (demó) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Egyetlen alap URL minden ChurchApps API-hoz (a `/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` automatikusan hozzáfűződik) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | A tartalomkézbesítés URL-je | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics-azonosító (opcionális) | `UA-123456789-1` |

:::info
A Next.js minden olyan környezeti változónál megköveteli a `NEXT_PUBLIC_` előtagot, amelynek a böngészőben is elérhetőnek kell lennie. A csak szerveroldali változókhoz nem kell ez az előtag.
:::

### LessonsApp (Next.js)

Mintafájl: `dotenv.sample.txt`

| Változó | Leírás | Példa (helyi LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | A környezet szakasza (hagyja üresen vagy `dev` értéken helyi fejlesztéshez) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | A Lessons API URL-je | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | A tartalomkézbesítés URL-je | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | A bejelentkezéshez használt ChurchApps API-alap (csak akkor érvényesül, ha a `STAGE` nincs beállítva vagy `dev`) | `https://api.demo.churchapps.org` |

---

## Mobilalkalmazások környezeti változói

### B1Mobile (React Native / Expo)

Mintafájl: `dotenv.sample.txt`

| Változó | Leírás | Példa (demó) |
|----------|-------------|----------------|
| `STAGE` | A környezet neve | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Modulonként egy URL minden ChurchApps API-modulhoz (beállítás hiányában mindegyik az éles környezetre mutat) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons API (külön gépnév; nincs megosztott, nem éles változata) | `https://api.lessons.church` |
| `CONTENT_ROOT` | A tartalomkézbesítés URL-je | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | A Lessons oldal URL-je | `https://lessons.church` |

:::info
A mobilalkalmazások nem használják a `REACT_APP_` vagy `NEXT_PUBLIC_` előtagot. A környezeti változók elérését az Expo-konfiguráció kezeli.
:::

---

## Gyors áttekintés: mintafájlok helye

| Projekt | Mintafájl |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
