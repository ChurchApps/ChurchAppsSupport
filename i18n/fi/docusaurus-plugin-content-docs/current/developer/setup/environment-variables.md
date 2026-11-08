---
title: "Ympäristömuuttujat"
description: "Määritä .env-tiedostot ChurchApps-projekteille, valitse jaettu demo-API tai paikallinen API ja täytä muuttujat B1 Admin-, B1.church-, B1 Checkin- ja muille sovelluksille."
---

# Ympäristömuuttujat

<div class="article-intro">

Jokainen ChurchApps-projekti käyttää paikallisiin asetuksiin `.env`-tiedostoa. Jokaisen projektin mukana tulee esimerkkitiedosto, jonka kopioit ja muokkaat. Tämä sivu käsittelee API-, verkkosovellus- ja mobiilisovellusten ympäristömuuttujia sekä sitä, miten valitset demo- ja paikallisen API-kohteen välillä.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna projektisi [esivaatimukset](./prerequisites.md)
- Kloonaa projektin repositorio, jonka kanssa haluat työskennellä
- Tutustu [projektin yleiskatsaukseen](./project-overview.md), jotta tiedät, mitä API-moduuleja projektisi tarvitsee

</div>

## Yleinen malli

1. Etsi projektin juuresta tiedosto `dotenv.sample.txt` tai `.env.sample`.
2. Kopioi se nimellä `.env`.
3. Muokkaa arvoja tarpeen mukaan.

```bash
# Esimerkki projektille, jossa on .env.sample
cp .env.sample .env

# Esimerkki projektille, jossa on dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Älä koskaan lisää `.env`-tiedostoja versionhallintaan.** Ne sisältävät salaisuuksia, kuten tietokantatunnuksia, API-avaimia ja JWT-salaisuuksia. Kaikki ChurchApps-projektit sisältävät `.env`-tiedoston `.gitignore`-tiedostossa, mutta tarkista aina ennen commitointia.
:::

## API-kohteen valitseminen

Tärkein päätös on se, mihin frontend osoittaa API-kutsuissaan. Vaihtoehtoja on kaksi:

### Vaihtoehto 1: Demo-API:t (suositeltu frontend-kehitykseen)

Käytä jaettua demo-ympäristöä. Paikallista API:a tai tietokannan asennusta ei tarvita. Se ajaa uusimman `main`-haaran koodin, ja sen esimerkkidata täytetään uudelleen joka yö.

```bash
# Perus-URL-malli
https://api.demo.churchapps.org/{module}

# Esimerkki moduulien URL-osoitteista
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Staging-ympäristö (`api.staging.churchapps.org`, `api.staging.lessons.church` ja niihin liittyvät palvelimet) on poistettu käytöstä. Jotkin esimerkkinä olevat `.env`-tiedostot saattavat yhä sisältää staging-osoitteita; korvaa ne tämän sivun demo- tai paikallisilla arvoilla. Jaettua ei-tuotantokäyttöistä Lessons-API:a ei ole enää olemassa. Jos tarvitset sellaisen, aja [LessonsApi](https://github.com/ChurchApps/LessonsApi) paikallisesti (se kuuntelee porttia `8090`).
:::

### Vaihtoehto 2: Paikallinen API

Aja Api-projekti omalla koneellasi. Vaatii MySQL 8.0+:n, jossa on luotu tietokannat jokaiselle moduulille. Katso ohje [API:n paikallinen asennus](../api/local-setup.md).

```bash
# Perus-URL-malli
http://localhost:8084/{module}

# Esimerkki moduulien URL-osoitteista
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API:n ympäristömuuttujat

Ydinprojektilla **Api** (`.env.sample`) on eniten asetuksia. Tässä ovat tärkeimmät muuttujat:

### Yleiset asetukset

| Muuttuja | Kuvaus | Esimerkki |
|----------|--------|-----------|
| `ENVIRONMENT` | Suoritusympäristö | `dev` |
| `SERVER_PORT` | Paikallisen kehityspalvelimen HTTP-portti | `8084` |
| `ENCRYPTION_KEY` | 192-bittinen salausavain arkaluonteiselle tiedolle | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | JSON Web Tokenien allekirjoittamiseen käytettävä salaisuus | `jwt-secret-dev` |
| `FILE_STORE` | Minne ladatut tiedostot tallennetaan (`disk` tai `s3`) | `disk` |
| `CORS_ORIGIN` | Sallitut CORS-alkuperät (`*` paikalliseen kehitykseen) | `*` |

### Tietokantayhteys

Yksi perus-URL osoittaa API:n MySQL-palvelimelle. API johtaa tästä perusosoitteesta yhden tietokannan kullekin moduulille (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Muuttuja | Esimerkki |
|----------|-----------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Päivitä `root:password` omilla MySQL-tunnuksillasi. Jokaisen moduulin tietokannan on oltava olemassa ennen API:n käynnistämistä. Käytä komentoa `npm run initdb` kaikkien moduulien skeeman luomiseen tai `npm run initdb:membership` yksittäisen moduulin skeeman luomiseen.
:::

### WebSocket-asetukset

| Muuttuja | Kuvaus | Esimerkki |
|----------|--------|-----------|
| `SOCKET_PORT` | WebSocket-palvelimen portti | `8087` |
| `SOCKET_URL` | WebSocket-osoite, johon asiakkaat yhdistävät | `ws://localhost:8087` |

---

## Verkkosovellusten ympäristömuuttujat

### B1Admin (React + Vite)

Esimerkkitiedosto: `.env.sample`

| Muuttuja | Kuvaus | Esimerkki (demo) |
|----------|--------|------------------|
| `REACT_APP_STAGE` | Ympäristön nimi | `demo` |
| `PORT` | Kehityspalvelimen portti | `3101` |
| `REACT_APP_API_BASE` | Yksi perus-URL kaikille ChurchApps-API:lle (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing` ja `/reporting` lisätään automaattisesti) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | Sisällön jakelun URL | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics -tunnus (valinnainen) | `UA-123456789-1` |

Paikallista API-kehitystä varten osoita perus-URL paikalliseen pinoosi:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Esimerkkitiedosto: `.env.sample`

| Muuttuja | Kuvaus | Esimerkki (demo) |
|----------|--------|------------------|
| `NEXT_PUBLIC_API_BASE` | Yksi perus-URL kaikille ChurchApps-API:lle (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing` ja `/reporting` lisätään automaattisesti) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Sisällön jakelun URL | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics -tunnus (valinnainen) | `UA-123456789-1` |

:::info
Next.js vaatii etuliitteen `NEXT_PUBLIC_` jokaiselle ympäristömuuttujalle, jonka täytyy olla saatavilla selaimessa. Pelkästään palvelimella käytettävät muuttujat eivät tarvitse tätä etuliitettä.
:::

### LessonsApp (Next.js)

Esimerkkitiedosto: `dotenv.sample.txt`

| Muuttuja | Kuvaus | Esimerkki (paikallinen LessonsApi) |
|----------|--------|------------------------------------|
| `STAGE` | Ympäristövaihe (jätä asettamatta tai käytä arvoa `dev` paikalliseen kehitykseen) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons-API:n URL | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Sisällön jakelun URL | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | ChurchApps-API:n perus-URL, jota käytetään kirjautumiseen (huomioidaan vain, kun `STAGE` on asettamatta tai `dev`) | `https://api.demo.churchapps.org` |

---

## Mobiilisovellusten ympäristömuuttujat

### B1Checkin (React Native / Expo)

Esimerkkitiedosto: `dotenv.sample.txt`

| Muuttuja | Kuvaus | Esimerkki |
|----------|--------|-----------|
| `EXPO_PUBLIC_STAGE` | Valitsee API-joukon, johon sovellus yhdistää: `dev` (paikallinen API osoitteessa `http://127.0.0.1:8084`), `staging` tai `prod` (oletus, kun arvoa ei ole asetettu) | `dev` |

B1Checkin käyttää vain Membership- ja Attendance-API-moduuleja sekä sisällön jakelun URL-osoitetta. Niiden osoitteet kullekin vaiheelle on asetettu tiedostossa `src/helpers/EnvironmentHelper.ts`.

:::info
Expo sisällyttää sovelluksen pakettiin vain etuliitteellä `EXPO_PUBLIC_` alkavat muuttujat. Käynnistä kehityspalvelin uudelleen komennolla `yarn start --reset-cache` aina, kun olet muuttanut `.env`-tiedostoa.
:::

---

## Pikaviite: esimerkkitiedostojen sijainnit

| Projekti | Esimerkkitiedosto |
|----------|-------------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
