---
title: "Proměnné prostředí"
description: "Nastavte soubory .env pro projekty ChurchApps, vyberte sdílené demo API nebo lokální API a vyplňte proměnné pro B1 Admin, B1.church, B1 Checkin a další."
---

# Proměnné prostředí

<div class="article-intro">

Každý projekt ChurchApps používá soubor `.env` pro lokální konfiguraci. Každý projekt obsahuje ukázkový soubor, který zkopírujete a upravíte. Tato stránka popisuje proměnné prostředí pro API, webové aplikace a mobilní aplikace, včetně výběru mezi demo a lokálním cílem API.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte [požadavky](./prerequisites.md) pro svůj projekt
- Naklonujte repozitář projektu, na kterém chcete pracovat
- Prostudujte si [Přehled projektu](./project-overview.md), abyste pochopili, které moduly API váš projekt potřebuje

</div>

## Obecný postup

1. Vyhledejte v kořenovém adresáři projektu soubor `dotenv.sample.txt` nebo `.env.sample`.
2. Zkopírujte ho jako `.env`.
3. Upravte hodnoty podle potřeby.

```bash
# Příklad pro projekt s .env.sample
cp .env.sample .env

# Příklad pro projekt s dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Nikdy neukládejte soubory `.env` do správy verzí.** Obsahují citlivé údaje, jako jsou přihlašovací údaje k databázi, API klíče a JWT tajné klíče. Všechny projekty ChurchApps mají `.env` uvedený v `.gitignore`, ale před commitem vždy zkontrolujte, že se do něj nedostal.
:::

## Výběr cíle API

Nejdůležitější rozhodnutí je, kam bude váš frontend směřovat volání API. Existují dvě možnosti:

### Možnost 1: Demo API (doporučeno pro vývoj frontendu)

Použijte sdílené demo prostředí. Není potřeba žádné lokální API ani nastavení databáze. Běží na nejnovějším kódu z `main` a jeho ukázková data se každou noc obnovují.

```bash
# Vzor základní URL
https://api.demo.churchapps.org/{module}

# Příklady URL modulů
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Staging prostředí (`api.staging.churchapps.org`, `api.staging.lessons.church` a související hostitelé) bylo vyřazeno. Některé ukázkové soubory `.env` mohou stále obsahovat staging URL; nahraďte je demo nebo lokálními hodnotami uvedenými na této stránce. Sdílené neprodukční API Lessons již neexistuje – když ho potřebujete, spusťte [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokálně (naslouchá na portu `8090`).
:::

### Možnost 2: Lokální API

Spusťte projekt Api na svém počítači. Vyžaduje MySQL 8.0+ s databázemi vytvořenými pro každý modul. Viz návod [nastavení lokálního API](../api/local-setup.md).

```bash
# Vzor základní URL
http://localhost:8084/{module}

# Příklady URL modulů
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Proměnné prostředí API

Základní projekt **Api** (`.env.sample`) má nejrozsáhlejší konfiguraci. Zde jsou klíčové proměnné:

### Sdílená nastavení

| Proměnná | Popis | Příklad |
|----------|-------|---------|
| `ENVIRONMENT` | Běhové prostředí | `dev` |
| `SERVER_PORT` | HTTP port pro lokální vývojový server | `8084` |
| `ENCRYPTION_KEY` | 192bitový šifrovací klíč pro citlivá data | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Tajný klíč pro podepisování JSON Web Tokenů | `jwt-secret-dev` |
| `FILE_STORE` | Kam ukládat nahrané soubory (`disk` nebo `s3`) | `disk` |
| `CORS_ORIGIN` | Povolené zdroje CORS (`*` pro lokální vývoj) | `*` |

### Připojení k databázi

Jedna základní URL nasměruje API na MySQL. API z této základní adresy odvozuje jednu databázi pro každý modul (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Proměnná | Příklad |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Upravte `root:password` podle svých skutečných přihlašovacích údajů MySQL. Každá databáze modulu musí existovat dříve, než spustíte API. Pro vytvoření schématu všech modulů použijte `npm run initdb`, nebo `npm run initdb:membership` pro jeden konkrétní modul.
:::

### Nastavení WebSocket

| Proměnná | Popis | Příklad |
|----------|-------|---------|
| `SOCKET_PORT` | Port pro server WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket, ke které se klienti připojují | `ws://localhost:8087` |

---

## Proměnné prostředí webových aplikací

### B1Admin (React + Vite)

Ukázkový soubor: `.env.sample`

| Proměnná | Popis | Příklad (demo) |
|----------|-------|----------------|
| `REACT_APP_STAGE` | Název prostředí | `demo` |
| `PORT` | Port vývojového serveru | `3101` |
| `REACT_APP_API_BASE` | Jedna základní URL pro všechna API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` se připojují automaticky) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL pro doručování obsahu | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID Google Analytics (volitelné) | `UA-123456789-1` |

Pro vývoj s lokálním API nasměrujte základní URL na svůj lokální stack:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Ukázkový soubor: `.env.sample`

| Proměnná | Popis | Příklad (demo) |
|----------|-------|----------------|
| `NEXT_PUBLIC_API_BASE` | Jedna základní URL pro všechna API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` se připojují automaticky) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL pro doručování obsahu | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID Google Analytics (volitelné) | `UA-123456789-1` |

:::info
Next.js vyžaduje předponu `NEXT_PUBLIC_` pro každou proměnnou prostředí, která má být dostupná v prohlížeči. Proměnné určené pouze pro server tuto předponu nepotřebují.
:::

### LessonsApp (Next.js)

Ukázkový soubor: `dotenv.sample.txt`

| Proměnná | Popis | Příklad (lokální LessonsApi) |
|----------|-------|------------------------------|
| `STAGE` | Fáze prostředí (ponechte nenastavené nebo `dev` pro lokální vývoj) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL pro doručování obsahu | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Základ API ChurchApps používaný pro přihlášení (uplatní se pouze tehdy, když `STAGE` není nastaveno nebo je `dev`) | `https://api.demo.churchapps.org` |

---

## Proměnné prostředí mobilních aplikací

### B1Checkin (React Native / Expo)

Ukázkový soubor: `dotenv.sample.txt`

| Proměnná | Popis | Příklad |
|----------|-------|---------|
| `EXPO_PUBLIC_STAGE` | Určuje sadu API, ke které se aplikace připojí: `dev` (lokální API na `http://127.0.0.1:8084`), `staging`, nebo `prod` (výchozí, pokud není nastaveno) | `dev` |

B1Checkin používá pouze moduly API Membership a Attendance a URL pro doručování obsahu. Jejich adresy pro jednotlivá prostředí jsou nastaveny v `src/helpers/EnvironmentHelper.ts`.

:::info
Expo do balíčku aplikace začleňuje pouze proměnné s předponou `EXPO_PUBLIC_`. Po změně `.env` restartujte vývojový server příkazem `yarn start --reset-cache`.
:::

---

## Rychlý přehled: umístění ukázkových souborů

| Projekt | Ukázkový soubor |
|---------|-----------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
