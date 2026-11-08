---
title: "Környezeti változók"
description: "Állítson be .env fájlokat a ChurchApps-projektekhez, válassza ki a közös demó API-t vagy a helyi API-t, és töltse ki a változókat a B1 Adminhoz, a B1.churchhöz, a B1 Checkinhez és más alkalmazásokhoz."
---

# Környezeti változók

<div class="article-intro">

Minden ChurchApps-projekt a helyi konfigurációhoz `.env` fájlt használ. Minden projekt tartalmaz egy mintafájlt, amelyet át kell másolni és testre kell szabni. Ez az oldal az API-k, a webalkalmazások és a mobilalkalmazások környezeti változóit ismerteti, beleértve azt is, hogyan lehet a demó és a helyi API-célpont között választani.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Telepítse a [előfeltételeket](./prerequisites.md) az adott projekthez
- Klónozza le a projekt tárolóját, amelyen dolgozni szeretne
- Tekintse át a [Projekt áttekintést](./project-overview.md), hogy megismerje, mely API-modulokra van szüksége a projektnek

</div>

## Általános működés

1. Keressen `dotenv.sample.txt` vagy `.env.sample` fájlt a projekt gyökerében.
2. Másolja át `.env` néven.
3. Szerkessze a értékeket szükség szerint.

```bash
# Példa a .env.sample fájllal rendelkező projekthez
cp .env.sample .env

# Példa a dotenv.sample.txt fájllal rendelkező projekthez
cp dotenv.sample.txt .env
```

:::warning
**Soha ne commitolja a `.env` fájlokat a verziókezelőbe.** Ezek titkos adatokat tartalmaznak, például adatbázis-hitelesítő adatokat, API-kulcsokat és JWT-titkokat. Minden ChurchApps-projekt felveszi a `.env` fájlt a `.gitignore` fájlba, de commitolás előtt mindig ellenőrizze újra.
:::

## API-célpont kiválasztása

A legfontosabb döntés, hogy a frontend hová irányítsa az API-hívásokat. Két lehetőség van:

### 1. lehetőség: Demó API-k (ajánlott frontend-fejlesztéshez)

Használja a közös demókörnyezetet. Nincs szükség helyi API-ra vagy adatbázis-beállításra. Ez a `main` ágon lévő legfrissebb kódot futtatja, a mintaadatai pedig éjszaka újratöltődnek.

```bash
# Alap URL-minta
https://api.demo.churchapps.org/{module}

# Példa modul-URL-ek
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
A staging környezet (`api.staging.churchapps.org`, `api.staging.lessons.church` és a kapcsolódó gazdagépek) megszűnt. Egyes mintafájlok `.env` még tartalmazhatnak staging URL-eket; cserélje ki őket az ezen az oldalon látható demó vagy helyi értékekre. Nincs megosztott, nem éles Lessons API – ha szükséges, futtassa helyben a [LessonsApi](https://github.com/ChurchApps/LessonsApi) projektet (a `8090` porton figyel).
:::

### 2. lehetőség: Helyi API

Futtassa az Api projektet a saját gépén. MySQL 8.0+ szükséges, minden modulhoz létrehozott adatbázisokkal. Lásd: [helyi API-beállítás](../api/local-setup.md) útmutató.

```bash
# Alap URL-minta
http://localhost:8084/{module}

# Példa modul-URL-ek
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API környezeti változói

A fő **Api** projekt (`.env.sample`) rendelkezik a legtöbb beállítással. Íme a legfontosabb változók:

### Közös beállítások

| Változó | Leírás | Példa |
|---------|--------|-------|
| `ENVIRONMENT` | Futtatókörnyezet | `dev` |
| `SERVER_PORT` | A helyi fejlesztői szerver HTTP-portja | `8084` |
| `ENCRYPTION_KEY` | 192 bites titkosítókulcs az érzékeny adatokhoz | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | A JSON Web Tokenek aláírásához használt titkos kulcs | `jwt-secret-dev` |
| `FILE_STORE` | Hol tárolja a feltöltött fájlokat (`disk` vagy `s3`) | `disk` |
| `CORS_ORIGIN` | Engedélyezett CORS-eredetek (`*` helyi fejlesztéshez) | `*` |

### Adatbázis-kapcsolat

Egyetlen alap URL mutatja meg az API-nak a MySQL-t. Az API ebből az alapból modulonként egy adatbázist származtat (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Változó | Példa |
|---------|-------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Cserélje le a `root:password` részt a saját MySQL-hitelesítő adataira. Minden modulhoz tartozó adatbázisnak léteznie kell az API indítása előtt. Az összes modul sémáját az `npm run initdb` paranccsal hozhatja létre, vagy egyetlen modulét az `npm run initdb:membership` paranccsal.
:::

### WebSocket-beállítások

| Változó | Leírás | Példa |
|---------|--------|-------|
| `SOCKET_PORT` | A WebSocket-szerver portja | `8087` |
| `SOCKET_URL` | Az a WebSocket-URL, amelyhez a kliensek csatlakoznak | `ws://localhost:8087` |

---

## Webalkalmazások környezeti változói

### B1Admin (React + Vite)

Mintafájl: `.env.sample`

| Változó | Leírás | Példa (demó) |
|---------|--------|--------------|
| `REACT_APP_STAGE` | Környezet neve | `demo` |
| `PORT` | A fejlesztői szerver portja | `3101` |
| `REACT_APP_API_BASE` | Egyetlen alap URL minden ChurchApps API-hoz (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` automatikusan hozzáfűződik) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | A tartalomkézbesítő URL-je | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics-azonosító (opcionális) | `UA-123456789-1` |

Helyi API-fejlesztéshez irányítsa az alap URL-t a helyi környezetre:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Mintafájl: `.env.sample`

| Változó | Leírás | Példa (demó) |
|---------|--------|--------------|
| `NEXT_PUBLIC_API_BASE` | Egyetlen alap URL minden ChurchApps API-hoz (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` automatikusan hozzáfűződik) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | A tartalomkézbesítő URL-je | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics-azonosító (opcionális) | `UA-123456789-1` |

:::info
A Next.js megköveteli a `NEXT_PUBLIC_` előtagot minden olyan környezeti változónál, amelynek a böngészőben is elérhetőnek kell lennie. A csak a szerveren használt változóknak nincs szükségük erre az előtagra.
:::

### LessonsApp (Next.js)

Mintafájl: `dotenv.sample.txt`

| Változó | Leírás | Példa (helyi LessonsApi) |
|---------|--------|--------------------------|
| `STAGE` | Környezeti szakasz (helyi fejlesztéshez hagyja üresen vagy `dev`) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | A Lessons API URL-je | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | A tartalomkézbesítő URL-je | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | A bejelentkezéshez használt ChurchApps API alap URL-je (csak akkor érvényesül, ha a `STAGE` nincs beállítva vagy `dev`) | `https://api.demo.churchapps.org` |

---

## Mobilalkalmazások környezeti változói

### B1Checkin (React Native / Expo)

Mintafájl: `dotenv.sample.txt`

| Változó | Leírás | Példa |
|---------|--------|-------|
| `EXPO_PUBLIC_STAGE` | Azt határozza meg, hogy az alkalmazás melyik API-készletre csatlakozzon: `dev` (helyi API a `http://127.0.0.1:8084` címen), `staging` vagy `prod` (alapértelmezett, ha nincs beállítva) | `dev` |

A B1Checkin csak a Membership és Attendance API-modulokat, valamint a tartalomkézbesítő URL-t használja; az egyes szakaszokhoz tartozó címek a `src/helpers/EnvironmentHelper.ts` fájlban vannak beállítva.

:::info
Az Expo csak az `EXPO_PUBLIC_` előtaggal rendelkező változókat építi bele az alkalmazás csomagjába. A `.env` módosítása után indítsa újra a fejlesztői szervert a `yarn start --reset-cache` paranccsal.
:::

---

## Gyors áttekintés: mintafájlok helye

| Projekt | Mintafájl |
|---------|-----------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
