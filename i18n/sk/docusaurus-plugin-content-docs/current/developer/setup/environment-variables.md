---
title: "Premenné prostredia"
---

# Premenné prostredia

<div class="article-intro">

Každý projekt ChurchApps používa súbor `.env` na lokálnu konfiguráciu. Každý projekt obsahuje vzorový súbor, ktorý skopírujete a upravíte. Táto stránka popisuje premenné prostredia pre API, webové aplikácie a mobilné aplikácie vrátane výberu medzi demo a lokálnym cieľom API.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Nainštalujte [predpoklady](./prerequisites) pre svoj projekt
- Naklonujte repozitár projektu, na ktorom chcete pracovať
- Prečítajte si [Prehľad projektu](./project-overview), aby ste pochopili, ktoré moduly API váš projekt potrebuje

</div>

## Všeobecný postup

1. Vyhľadajte `dotenv.sample.txt` alebo `.env.sample` v koreňovom adresári projektu.
2. Skopírujte ho do `.env`.
3. Podľa potreby upravte hodnoty.

```bash
# Príklad pre projekt s .env.sample
cp .env.sample .env

# Príklad pre projekt s dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Nikdy neukladajte súbory `.env` do systému na správu verzií.** Obsahujú tajné údaje, ako sú prihlasovacie údaje k databáze, kľúče API a tajomstvá JWT. Všetky projekty ChurchApps majú `.env` v `.gitignore`, ale pred každým commitom si to vždy skontrolujte.
:::

## Výber cieľa API

Najdôležitejšie rozhodnutie je, kam má váš frontend smerovať volania API. Existujú dve možnosti:

### Možnosť 1: Demo API (odporúčané pre vývoj frontendu)

Použite zdieľané demo prostredie. Nie je potrebné lokálne nastavenie API ani databázy. Beží na najnovšom kóde z `main` a jeho vzorové údaje sa každú noc obnovujú.

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
Staging prostredie (`api.staging.churchapps.org`, `api.staging.lessons.church` a súvisiace hostiteľa) bolo vyradené z prevádzky. Niektoré vzorové súbory `.env` môžu stále obsahovať staging URL adresy. Nahraďte ich demo alebo lokálnymi hodnotami uvedenými na tejto stránke. Zdieľané neprodukčné API Lessons neexistuje. Keď ho potrebujete, spustite [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokálne (počúva na porte `8090`).
:::

### Možnosť 2: Lokálne API

Spustite projekt Api na svojom počítači. Vyžaduje MySQL 8.0+ s databázami vytvorenými pre každý modul. Pozrite si návod [lokálne nastavenie API](../api/local-setup).

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
| `FILE_STORE` | Kde ukladať nahrané súbory (`disk` alebo `s3`) | `disk` |
| `CORS_ORIGIN` | Povolené pôvody CORS (`*` pre lokálny vývoj) | `*` |

### Pripojenie k databáze

Jedna základná URL adresa smeruje API na MySQL. API z nej odvodí jednu databázu pre každý modul (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Premenná | Príklad |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Aktualizujte `root:password` svojimi skutočnými prihlasovacími údajmi k MySQL. Každá databáza pre jednotlivý modul musí existovať pred spustením API. Na vytvorenie schémy pre všetky moduly použite `npm run initdb`, alebo `npm run initdb:membership` pre jeden modul.
:::

### Nastavenia WebSocket

| Premenná | Popis | Príklad |
|----------|-------|---------|
| `SOCKET_PORT` | Port pre server WebSocket | `8087` |
| `SOCKET_URL` | URL adresa WebSocket, ku ktorej sa klienti pripájajú | `ws://localhost:8087` |

---

## Premenné prostredia webovej aplikácie

### B1Admin (React + Vite)

Vzorový súbor: `.env.sample`

| Premenná | Popis | Príklad (Demo) |
|----------|-------|----------------|
| `REACT_APP_STAGE` | Názov prostredia | `demo` |
| `PORT` | Port vývojového servera | `3101` |
| `REACT_APP_API_BASE` | Jedna základná URL pre všetky API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` sa pridávajú automaticky) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL pre doručovanie obsahu | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID Google Analytics (voliteľné) | `UA-123456789-1` |

Pri lokálnom vývoji API nasmerujte základnú URL na svoj lokálny stack:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Vzorový súbor: `.env.sample`

| Premenná | Popis | Príklad (Demo) |
|----------|-------|----------------|
| `NEXT_PUBLIC_API_BASE` | Jedna základná URL pre všetky API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` sa pridávajú automaticky) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL pre doručovanie obsahu | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID Google Analytics (voliteľné) | `UA-123456789-1` |

:::info
Next.js vyžaduje predponu `NEXT_PUBLIC_` pre každú premennú prostredia, ktorá má byť dostupná v prehliadači. Premenné dostupné iba na serveri túto predponu nepotrebujú.
:::

### LessonsApp (Next.js)

Vzorový súbor: `dotenv.sample.txt`

| Premenná | Popis | Príklad (lokálne LessonsApi) |
|----------|-------|------------------------------|
| `STAGE` | Fáza prostredia (ponechajte nenastavené alebo `dev` pre lokálny vývoj) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL pre doručovanie obsahu | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Základ API ChurchApps používaný na prihlásenie (rešpektuje sa len vtedy, keď je `STAGE` nenastavené alebo `dev`) | `https://api.demo.churchapps.org` |

---

## Premenné prostredia mobilnej aplikácie

### B1Mobile (React Native / Expo)

Vzorový súbor: `dotenv.sample.txt`

| Premenná | Popis | Príklad (Demo) |
|----------|-------|----------------|
| `STAGE` | Názov prostredia | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Jedna URL pre každý modul API ChurchApps (ak nie je nastavená, predvolene sa použije produkcia) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | API Lessons (samostatný hostiteľ; zdieľané neprodukčné prostredie neexistuje) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL pre doručovanie obsahu | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL stránky Lessons | `https://lessons.church` |

:::info
Mobilné aplikácie nepoužívajú predponu `REACT_APP_` ani `NEXT_PUBLIC_`. Prístup k premenným prostredia zabezpečuje konfigurácia Expo.
:::

---

## Rýchly prehľad: umiestnenie vzorových súborov

| Projekt | Vzorový súbor |
|---------|---------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
