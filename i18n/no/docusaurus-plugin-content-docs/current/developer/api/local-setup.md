---
title: "Lokalt API-oppsett"
---

# Lokalt API-oppsett

<div class="article-intro">

Denne guiden veileder deg gjennom oppsett av ChurchApps API for lokal utvikling. Du vil klone repositoriet, konfigurere databasetilkoblingene, initialisere skjemaet og starte utviklingsserveren med automatisk omlasting.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js 22+**, **Git** og **MySQL 8.0+** -- se [Forutsetninger](../setup/prerequisites)
- Opprett en MySQL-bruker med rettigheter til å opprette databaser
- Gjennomgå referansen for [Miljøvariabler](../setup/environment-variables) for API-konfigurasjon

</div>

## Trinnvis oppsett

### 1. Klon repositoriet

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Installer avhengigheter

```bash
cd Api
npm install
```

### 3. Konfigurer miljøvariabler

```bash
cp .env.sample .env
```

Åpne `.env` og konfigurer MySQL-tilkoblingsstrengene dine. Hver modul trenger sin egen databasetilkobling i følgende format:

```
mysql://root:password@localhost:3306/dbnavn
```

Du trenger tilkoblingsstrenger for alle seks moduldatabaser (membership, attendance, content, giving, messaging, doing).

### 4. Initialiser databasene

```bash
npm run initdb
```

Dette oppretter alle seks databaser og deres tabeller automatisk.

:::tip
Du kan initialisere en enkelt moduls database med `npm run initdb:membership` (eller `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Start utviklingsserveren

```bash
npm run dev
```

API-et starter med automatisk omlasting på [http://localhost:8084](http://localhost:8084).

## Viktige kommandoer

| Kommando | Beskrivelse |
|----------|-------------|
| `npm run dev` | Start utviklingsserver med automatisk omlasting (tsx watch) |
| `npm run build` | Rens, kompiler TypeScript og kopier ressurser |
| `npm run test` | Kjør tester med Jest (inkluderer dekning) |
| `npm run test:watch` | Kjør tester i overvåkingsmodus |
| `npm run lint` | Kjør Prettier og ESLint med automatisk retting |

## Distribusjon til staging

For å distribuere til staging-miljøet:

```bash
npm run deploy-staging
```

Dette kjører en produksjonsbygging og distribuerer deretter via Serverless Framework.

:::warning
Sørg for at AWS-legitimasjonen din er konfigurert før du kjører distribusjonskommandoen.
:::

## Lokal bibliotekutvikling

Hvis du trenger å utvikle et delt bibliotek (`@churchapps/helpers` eller `@churchapps/apihelper`) sammen med API-et, bruk `npm link`:

```bash
# I bibliotekskatalogen
cd Helpers
npm run build
npm link

# I API-katalogen
cd ../Api
npm link @churchapps/helpers
```

Dette lar deg teste bibliotekendringer mot API-et uten å publisere til npm.

## Relaterte artikler

- **[Database](./database)** -- Forstå database-per-modul-arkitekturen
- **[Modulstruktur](./module-structure)** -- Hvordan kontrollere, repositories og modeller er organisert
- **[Delte biblioteker](../shared-libraries/)** -- Jobbe med `@churchapps/helpers` og `@churchapps/apihelper`
