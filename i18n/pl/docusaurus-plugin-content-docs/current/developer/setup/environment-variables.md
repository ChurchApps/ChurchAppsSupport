---
title: "Premenné prostredia"
description: "Nastavte súbory .env pre projekty ChurchApps, vyberte zdieľané demo API alebo lokálne API a vyplňte premenné pre B1 Admin, B1.church, B1 Checkin a ďalšie."
---

# Premenné prostredia

<div class="article-intro">

Každý projekt ChurchApps používa súbor `.env` na lokálnu konfiguráciu. Každý projekt obsahuje vzorový súbor, ktorý skopírujete a upravíte. Táto stránka popisuje premenné prostredia pre API, webové aplikácie a mobilné aplikácie vrátane toho, ako vybrať medzi cieľom demo a lokálnym API.

</div>

<div class="prereqs">
<h4>Skôr než začnete</h4>

- Nainštalujte [predpoklady](./prerequisites.md) pre váš projekt
- Naklonujte repozitár projektu, s ktorým chcete pracovať
- Prečítajte si [Prehľad projektu](./project-overview.md), aby ste pochopili, ktoré moduly API váš projekt potrebuje

</div>

## Všeobecný postup

1. V koreňovom adresári projektu vyhľadajte `dotenv.sample.txt` alebo `.env.sample`.
2. Skopírujte ho do súboru `.env`.
3. Podľa potreby upravte hodnoty.

```bash
# Príklad pre projekt so súborom .env.sample
cp .env.sample .env

# Príklad pre projekt so súborom dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Nikdy neodovzdávajte súbory `.env` do systému na správu verzií.** Obsahujú citlivé údaje, ako sú prihlasovacie údaje k databáze, API kľúče a tajomstvá JWT. Všetky projekty ChurchApps majú `.env` uvedený v `.gitignore`, no pred každým commitom si to vždy skontrolujte.
:::

## Výber cieľa API

Najdôležitejšie rozhodnutie spočíva v tom, kam má váš frontend smerovať volania API. Existujú dve možnosti:

### Možnosť 1: Demo API (odporúčané pre vývoj frontendu)

Použite zdieľané demo prostredie. Nie je potrebné nastavovať lokálne API ani databázu. Beží na najnovšom kóde z vetvy `main` a jeho vzorové dáta sa každú noc obnovujú.

```bash
# Vzor základnej URL
https://api.demo.churchapps.org/{module}

# Príklady URL modulov
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Staging prostredie (`api.staging.churchapps.org`, `api.staging.lessons.church` a súvisiace hostiteľské servery) bolo vyradené z prevádzky. Niektoré vzorové súbory `.env` môžu stále obsahovať staging URL adresy; nahraďte ich demo alebo lokálnymi hodnotami uvedenými na tejto stránke. Zdieľané API pre Lessons mimo produkcie už neexistuje -- ak ho potrebujete, spustite [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokálne (počúva na porte `8090`).
:::

### Možnosť 2: Lokálne API

Spustite projekt Api na svojom počítači. Vyžaduje MySQL 8.0+ s databázami vytvorenými pre každý modul. Pozrite si príručku [Lokálne nastavenie API](../api/local-setup.md).

```bash
# Vzor základnej URL
http://localhost:8084/{module}

# Príklady URL modulov
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Premenné prostredia API

Hlavný projekt **Api** (`.env.sample`) má najviac konfigurácie. Tu sú kľúčové premenné:

### Zdieľané nastavenia

| Premenná | Popis | Príklad |
|----------|-------|---------|
| `ENVIRONMENT` | Runtime prostredie | `dev` |
| `SERVER_PORT` | HTTP port pre lokálny vývojový server | `8084` |
| `ENCRYPTION_KEY` | 192-bitový šifrovací kľúč pre citlivé údaje | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Tajomstvo na podpisovanie JSON Web Tokenov | `jwt-secret-dev` |
| `FILE_STORE` | Kam ukladať nahrané súbory (`disk` alebo `s3`) | `disk` |
| `CORS_ORIGIN` | Povolené CORS pôvody (`*` pre lokálny vývoj) | `*` |

### Pripojenie k databáze

Jedna základná URL nasmeruje API na MySQL. API z nej odvodí jednu databázu pre každý modul (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Premenná | Príklad |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Nahraďte `root:password` skutočnými prihlasovacími údajmi k MySQL. Každá databáza modulu musí existovať pred spustením API. Na vytvorenie schémy pre všetky moduly použite `npm run initdb`, alebo `npm run initdb:membership` pre jeden modul.
:::

### Nastavenia WebSocket

| Premenná | Popis | Príklad |
|----------|-------|---------|
| `SOCKET_PORT` | Port pre WebSocket server | `8087` |
| `SOCKET_URL` | WebSocket URL, ku ktorej sa klienti pripájajú | `ws://localhost:8087` |

---

## Premenné prostredia webových aplikácií

### B1Admin (React + Vite)

Vzorový súbor: `.env.sample`

| Premenná | Popis | Príklad (Demo) |
|----------|-------|----------------|
| `REACT_APP_STAGE` | Názov prostredia | `demo` |
| `PORT` | Port vývojového servera | `3101` |
| `REACT_APP_API_BASE` | Jedna základná URL pre všetky API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` sa pridávajú automaticky) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL doručovania obsahu | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID Google Analytics (voliteľné) | `UA-123456789-1` |

Pri vývoji s lokálnym API nasmerujte základnú URL na svoj lokálny stack:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Vzorový súbor: `.env.sample`

| Premenná | Popis | Príklad (Demo) |
|----------|-------|----------------|
| `NEXT_PUBLIC_API_BASE` | Jedna základná URL pre všetky API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` sa pridávajú automaticky) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL doručovania obsahu | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID Google Analytics (voliteľné) | `UA-123456789-1` |

:::info
Next.js vyžaduje prefix `NEXT_PUBLIC_` pre každú premennú prostredia, ktorá má byť dostupná v prehliadači. Premenné určené len pre server tento prefix nepotrebujú.
:::

### LessonsApp (Next.js)

Vzorový súbor: `dotenv.sample.txt`

| Premenná | Popis | Príklad (lokálne LessonsApi) |
|----------|-------|------------------------------|
| `STAGE` | Názov fázy prostredia (ponechajte nenastavené alebo `dev` pre lokálny vývoj) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL doručovania obsahu | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Základ API ChurchApps používaný na prihlásenie (rešpektuje sa len vtedy, ak je `STAGE` nenastavené alebo `dev`) | `https://api.demo.churchapps.org` |

---

## Premenné prostredia mobilných aplikácií

### B1Checkin (React Native / Expo)

Vzorový súbor: `dotenv.sample.txt`

| Premenná | Popis | Príklad |
|----------|-------|---------|
| `EXPO_PUBLIC_STAGE` | Vyberá sadu API, ku ktorým sa aplikácia pripája: `dev` (lokálne API na `http://127.0.0.1:8084`), `staging` alebo `prod` (predvolená hodnota, ak nie je nastavená) | `dev` |

B1Checkin používa iba moduly API Membership a Attendance spolu s URL doručovania obsahu; ich adresy pre jednotlivé fázy sú nastavené v `src/helpers/EnvironmentHelper.ts`.

:::info
Expo do balíka aplikácie zahŕňa iba premenné s prefixom `EXPO_PUBLIC_`. Po zmene `.env` reštartujte vývojový server príkazom `yarn start --reset-cache`.
:::

---

## Rýchly prehľad: umiestnenia vzorových súborov

| Projekt | Vzorový súbor |
|---------|---------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
