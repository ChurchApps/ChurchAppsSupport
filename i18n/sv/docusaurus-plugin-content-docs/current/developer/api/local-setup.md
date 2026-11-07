---
title: "Lokal API-installation"
description: "Konfigurera ChurchApps API lokalt: klona repot, konfigurera sex MySQL-moduldatabaser, initiera schemat och starta utvecklingsservern med omladdning."
---

# Lokal API-installation

<div class="article-intro">

Den här guiden visar hur du konfigurerar ChurchApps API för lokal utveckling. Du klonar förvaret, konfigurerar databasanslutningarna, initierar schemat och startar utvecklingsservern med hot reload.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera **Node.js 24+**, **Git** och **MySQL 8.0+** -- se [Förutsättningar](../setup/prerequisites.md)
- Skapa en MySQL-användare med behörighet att skapa databaser
- Läs igenom referensen [Miljövariabler](../setup/environment-variables.md) för API-konfigurationen

</div>

## Steg för steg

### 1. Klona förvaret

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Installera beroenden

Projektet använder Yarn (en spärr blockerar `npm install`):

```bash
cd Api
yarn install
```

### 3. Konfigurera miljövariabler

```bash
cp .env.sample .env
```

Öppna `.env` och konfigurera dina MySQL-anslutningssträngar. Varje modul behöver sin egen databasanslutning i följande format:

```
mysql://root:password@localhost:3306/dbname
```

Du behöver anslutningssträngar för alla sex moduldatabaser (membership, attendance, content, giving, messaging, doing).

### 4. Initiera databaserna

```bash
npm run initdb
```

Detta skapar alla sex databaser och deras tabeller automatiskt.

:::tip
Du kan initiera databasen för en enskild modul med `npm run initdb -- --module=membership` (eller `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Starta utvecklingsservern

```bash
npm run dev
```

API:et startar med hot reload på [http://localhost:8084](http://localhost:8084).

## Viktiga kommandon

| Kommando | Beskrivning |
|---------|-------------|
| `npm run dev` | Starta utvecklingsservern med hot reload (tsx watch) |
| `npm run build` | Rensa, kompilera TypeScript och kopiera resurser |
| `npm run test` | Kör tester med Jest (inklusive kodtäckning) |
| `npm run test:watch` | Kör tester i watch-läge |
| `npm run lint` | Kör ESLint med automatisk rättning (ESLint är den enda formateraren) |

## Driftsättning

Staging-miljön har tagits bort. API:et driftsätts till demomiljön vid varje push till `main` och till produktion via det manuella arbetsflödet **Deploy Prod**, som dessutom tillämpar väntande databasmigreringar. Se [API-driftsättning](../deployment/apis.md) för detaljer.

## Lokal utveckling av bibliotek

Om du behöver utveckla ett delat bibliotek (`@churchapps/helpers` eller `@churchapps/apihelper`) tillsammans med API:et, bygg det i arbetsytan [Packages](https://github.com/ChurchApps/Packages) och lägg till en tillfällig Yarn-portal i API:et:

```bash
# I Packages-arbetsytan
yarn build

# I API-katalogen
yarn link ../Packages/helpers
# ... testa ...
yarn unlink ../Packages/helpers && yarn install
```

Så kan du testa ändringar i biblioteket mot API:et utan att publicera till npm. Se [Delade bibliotek](../shared-libraries/index.md#local-development-against-a-consuming-app) för detaljer -- och checka aldrig in den portalupplösning som länkningen skriver i `package.json`.

## Relaterade artiklar

- **[Databas](./database.md)** -- Förstå arkitekturen med en databas per modul
- **[Modulstruktur](./module-structure.md)** -- Hur controllers, repositories och modeller är organiserade
- **[Delade bibliotek](../shared-libraries/index.md)** -- Arbeta med `@churchapps/helpers` och `@churchapps/apihelper`
