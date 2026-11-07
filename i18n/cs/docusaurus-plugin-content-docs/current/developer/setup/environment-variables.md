---
title: "Proměnné prostředí"
---

# Proměnné prostředí

<div class="article-intro">

Každý projekt ChurchApps používá soubor `.env` pro lokální konfiguraci. Každý projekt obsahuje ukázkový soubor, který zkopírujete a upravíte. Tato stránka popisuje proměnné prostředí pro API, webové aplikace a mobilní aplikace, včetně výběru mezi demo a lokálním cílem API.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte [předpoklady](./prerequisites) pro svůj projekt
- Naklonujte repozitář projektu, na kterém chcete pracovat
- Prostudujte si [Přehled projektu](./project-overview), abyste věděli, které moduly API váš projekt potřebuje

</div>

## Obecný postup

1. V kořenovém adresáři projektu vyhledejte `dotenv.sample.txt` nebo `.env.sample`.
2. Zkopírujte jej do `.env`.
3. Podle potřeby upravte hodnoty.

```bash
# Příklad pro projekt s .env.sample
cp .env.sample .env

# Příklad pro projekt s dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Soubory `.env` nikdy nevkládejte do správy verzí.** Obsahují tajné údaje, jako jsou přihlašovací údaje k databázi, klíče API a tajné klíče JWT. Všechny projekty ChurchApps mají `.env` v souboru `.gitignore`, ale před každým commitem to vždy ještě jednou zkontrolujte.
:::

## Výběr cíle API

Nejdůležitější rozhodnutí je, kam má váš frontend směřovat volání API. Existují dvě možnosti:

### Možnost 1: Demo API (doporučeno pro vývoj frontendu)

Použijte sdílené demo prostředí. Není potřeba žádné lokální API ani nastavení databáze. Běží na nejnovějším kódu z větve `main` a jeho ukázková data se každou noc obnovují.

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
Staging prostředí (`api.staging.churchapps.org`, `api.staging.lessons.church` a související hostitelé) bylo vyřazeno. Některé ukázkové soubory `.env` mohou stále obsahovat staging URL adresy; nahraďte je demo nebo lokálními hodnotami uvedenými na této stránce. Sdílené nevývojové Lessons API neexistuje – když ho potřebujete, spusťte [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokálně (naslouchá na portu `8090`).
:::

### Možnost 2: Lokální API

Spusťte projekt Api na svém počítači. Vyžaduje MySQL 8.0+ s databázemi vytvořenými pro každý modul. Viz průvodce [lokálním nastavením API](../api/local-setup).

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

Základní projekt **Api** (`.env.sample`) má nejvíce konfigurace. Zde jsou klíčové proměnné:

### Sdílená nastavení

| Proměnná | Popis | Příklad |
|----------|-------|---------|
| `ENVIRONMENT` | Běhové prostředí | `dev` |
| `SERVER_PORT` | Port HTTP pro lokální vývojový server | `8084` |
| `ENCRYPTION_KEY` | 192bitový šifrovací klíč pro citlivá data | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Tajný klíč pro podepisování JSON Web Tokenů | `jwt-secret-dev` |
| `FILE_STORE` | Kam ukládat nahrané soubory (`disk` nebo `s3`) | `disk` |
| `CORS_ORIGIN` | Povolené zdroje CORS (`*` pro lokální vývoj) | `*` |

### Připojení k databázi

Jediná základní URL nasměruje API na MySQL. API z této základní URL odvodí jednu databázi pro každý modul (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Proměnná | Příklad |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Nahraďte `root:password` svými skutečnými přihlašovacími údaji k MySQL. Každá databáze pro jednotlivý modul musí existovat dříve, než API spustíte. Pro vytvoření schématu všech modulů použijte `npm run initdb`, nebo `npm run initdb:membership` pro jeden modul.
:::

### Nastavení WebSocket

| Proměnná | Popis | Příklad |
|----------|-------|---------|
| `SOCKET_PORT` | Port serveru WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket, ke které se klienti připojují | `ws://localhost:8087` |

---

## Proměnné prostředí webových aplikací

### B1Admin (React + Vite)

Ukázkový soubor: `.env.sample`

| Proměnná | Popis | Příklad (demo) |
|----------|-------|----------------|
| `REACT_APP_STAGE` | Název prostředí | `demo` |
| `PORT` | Port vývojového serveru | `3101` |
| `REACT_APP_API_BASE` | Jediná základní URL pro všechna API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` se připojují automaticky) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL doručování obsahu | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID Google Analytics (volitelné) | `UA-123456789-1` |

Pro lokální vývoj API nasměrujte základní URL na svůj lokální stack:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Ukázkový soubor: `.env.sample`

| Proměnná | Popis | Příklad (demo) |
|----------|-------|----------------|
| `NEXT_PUBLIC_API_BASE` | Jediná základní URL pro všechna API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` se připojují automaticky) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL doručování obsahu | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID Google Analytics (volitelné) | `UA-123456789-1` |

:::info
Next.js vyžaduje předponu `NEXT_PUBLIC_` u každé proměnné prostředí, která má být dostupná v prohlížeči. Proměnné určené pouze pro server tuto předponu nepotřebují.
:::

### LessonsApp (Next.js)

Ukázkový soubor: `dotenv.sample.txt`

| Proměnná | Popis | Příklad (lokální LessonsApi) |
|----------|-------|------------------------------|
| `STAGE` | Stage prostředí (ponechte nenastavené nebo `dev` pro lokální vývoj) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL Lessons API | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL doručování obsahu | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Základní URL API ChurchApps použitá při přihlášení (uplatní se pouze tehdy, když je `STAGE` nenastavený nebo `dev`) | `https://api.demo.churchapps.org` |

---

## Proměnné prostředí mobilní aplikace

### B1Mobile (React Native / Expo)

Ukázkový soubor: `dotenv.sample.txt`

| Proměnná | Popis | Příklad (demo) |
|----------|-------|----------------|
| `STAGE` | Název prostředí | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Jedna URL pro každý modul API ChurchApps (každá má výchozí produkční hodnotu, pokud není nastavena) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons API (samostatný hostitel; sdílené nevývojové neexistuje) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL doručování obsahu | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL webu Lessons | `https://lessons.church` |

:::info
Mobilní aplikace nepoužívají předponu `REACT_APP_` ani `NEXT_PUBLIC_`. Přístup k proměnným prostředí zajišťuje konfigurace Expo.
:::

---

## Rychlý přehled: umístění ukázkových souborů

| Projekt | Ukázkový soubor |
|---------|-----------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
