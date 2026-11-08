---
title: "Premenljivke okolja"
description: "Nastavite datoteke .env za projekte ChurchApps, izberite skupni demo API ali lokalni API ter izpolnite spremenljivke za B1 Admin, B1.church, B1 Checkin in druge."
---

# Premenljivke okolja

<div class="article-intro">

Vsak projekt ChurchApps za lokalno konfiguracijo uporablja datoteko `.env`. Vsak projekt vključuje vzorčno datoteko, ki jo kopirate in prilagodite. Ta stran opisuje premenljivke okolja za API-je, spletne aplikacije in mobilne aplikacije, vključno z izbiro med demo in lokalnim API-jem.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite [predpogoje](./prerequisites.md) za vaš projekt
- Klonirajte repozitorij projekta, na katerem želite delati
- Preglejte [Pregled projekta](./project-overview.md), da razumete, katere module API-ja vaš projekt potrebuje

</div>

## Splošni vzorec

1. V korenski mapi projekta poiščite `dotenv.sample.txt` ali `.env.sample`.
2. Datoteko kopirajte v `.env`.
3. Vrednosti po potrebi uredite.

```bash
# Primer za projekt z datoteko .env.sample
cp .env.sample .env

# Primer za projekt z datoteko dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Datotek `.env` nikoli ne dodajajte v sistem za nadzor različic.** Vsebujejo skrivnosti, kot so poverilnice za podatkovno bazo, ključi API-jev in skrivnosti JWT. Vsi projekti ChurchApps imajo `.env` v datoteki `.gitignore`, vendar pred potrditvijo vedno še enkrat preverite.
:::

## Izbira cilja API-ja

Najpomembnejša odločitev je, kam vaš frontend pošilja klice API-ja. Na voljo sta dve možnosti:

### Možnost 1: Demo API-ji (priporočeno za razvoj frontenda)

Uporabite skupno demo okolje. Lokalni API in nastavitev podatkovne baze nista potrebna. Deluje z najnovejšo kodo iz `main`, njegovi vzorčni podatki pa se ponovno napolnijo vsak večer.

```bash
# Vzorec osnovnega naslova URL
https://api.demo.churchapps.org/{module}

# Primeri naslovov URL modulov
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Testno okolje (`api.staging.churchapps.org`, `api.staging.lessons.church` in sorodni gostitelji) je bilo ukinjeno. Nekatere vzorčne datoteke `.env` lahko še vedno vsebujejo naslove testnega okolja; zamenjajte jih z vrednostmi za demo ali lokalni API, prikazanimi na tej strani. Skupnega neproizvodnega API-ja za Lessons ni več – kadar ga potrebujete, zaženite [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokalno (posluša na vratih `8090`).
:::

### Možnost 2: Lokalni API

Zaženite projekt Api na svojem računalniku. Potrebujete MySQL 8.0+ z ustvarjenimi podatkovnimi bazami za vsak modul. Glejte vodnik [lokalna nastavitev API-ja](../api/local-setup.md).

```bash
# Vzorec osnovnega naslova URL
http://localhost:8084/{module}

# Primeri naslovov URL modulov
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Spremenljivke okolja API-ja

Osrednji projekt **Api** (`.env.sample`) ima največ nastavitev. Tu so ključne spremenljivke:

### Skupne nastavitve

| Spremenljivka | Opis | Primer |
|----------|-------------|---------|
| `ENVIRONMENT` | Okolje izvajanja | `dev` |
| `SERVER_PORT` | HTTP-vrata za lokalni razvojni strežnik | `8084` |
| `ENCRYPTION_KEY` | 192-bitni šifrirni ključ za občutljive podatke | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Skrivnost za podpisovanje žetonov JSON Web Token | `jwt-secret-dev` |
| `FILE_STORE` | Kam shraniti naložene datoteke (`disk` ali `s3`) | `disk` |
| `CORS_ORIGIN` | Dovoljeni izvori CORS (`*` za lokalni razvoj) | `*` |

### Povezava s podatkovno bazo

Ena sama osnovna naslov URL usmeri API na MySQL. API iz te osnove izpelje po eno podatkovno bazo za vsak modul (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Spremenljivka | Primer |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Vrednost `root:password` zamenjajte s svojimi dejanskimi poverilnicami za MySQL. Vsaka podatkovna baza za posamezen modul mora obstajati, preden zaženete API. Za ustvarjanje sheme za vse module uporabite `npm run initdb`, za en sam modul pa `npm run initdb:membership`.
:::

### Nastavitve WebSocket

| Spremenljivka | Opis | Primer |
|----------|-------------|---------|
| `SOCKET_PORT` | Vrata za strežnik WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket, na katerega se povežejo odjemalci | `ws://localhost:8087` |

---

## Spremenljivke okolja spletnih aplikacij

### B1Admin (React + Vite)

Vzorčna datoteka: `.env.sample`

| Spremenljivka | Opis | Primer (demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Ime okolja | `demo` |
| `PORT` | Vrata razvojnega strežnika | `3101` |
| `REACT_APP_API_BASE` | Ena osnovna naslov URL za vse API-je ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` se samodejno pripnejo) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | Naslov URL za dostavo vsebine | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID za Google Analytics (neobvezno) | `UA-123456789-1` |

Za razvoj z lokalnim API-jem usmerite osnovni naslov URL na svoj lokalni sklop:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Vzorčna datoteka: `.env.sample`

| Spremenljivka | Opis | Primer (demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Ena osnovna naslov URL za vse API-je ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` se samodejno pripnejo) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Naslov URL za dostavo vsebine | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID za Google Analytics (neobvezno) | `UA-123456789-1` |

:::info
Next.js zahteva predpono `NEXT_PUBLIC_` za vsako spremenljivko okolja, ki mora biti na voljo v brskalniku. Spremenljivke, ki so namenjene samo strežniku, te predpone ne potrebujejo.
:::

### LessonsApp (Next.js)

Vzorčna datoteka: `dotenv.sample.txt`

| Spremenljivka | Opis | Primer (lokalni LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Faza okolja (pustite nenastavljeno ali `dev` za lokalni razvoj) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Naslov URL API-ja za Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Naslov URL za dostavo vsebine | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Osnovni naslov URL API-ja ChurchApps, uporabljen za prijavo (upošteva se le, če je `STAGE` nenastavljen ali `dev`) | `https://api.demo.churchapps.org` |

---

## Spremenljivke okolja mobilnih aplikacij

### B1Checkin (React Native / Expo)

Vzorčna datoteka: `dotenv.sample.txt`

| Spremenljivka | Opis | Primer |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | Izbere nabor API-jev, s katerimi se aplikacija poveže: `dev` (lokalni API na `http://127.0.0.1:8084`), `staging` ali `prod` (privzeto, če ni nastavljeno) | `dev` |

B1Checkin uporablja samo module API-ja Membership in Attendance ter naslov URL za dostavo vsebine; njihovi naslovi za posamezno fazo so nastavljeni v `src/helpers/EnvironmentHelper.ts`.

:::info
Expo v paket aplikacije vključi samo spremenljivke s predpono `EXPO_PUBLIC_`. Po spremembi datoteke `.env` ponovno zaženite razvojni strežnik z ukazom `yarn start --reset-cache`.
:::

---

## Hitri pregled: mesta vzorčnih datotek

| Projekt | Vzorčna datoteka |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
