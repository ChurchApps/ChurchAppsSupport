---
title: "Lokalt API-oppsett"
---

# Lokalt API-oppsett

<div class="article-intro">

Denne veiledningen leder deg gjennom oppsett av ChurchApps API for lokal utvikling. Du vil klone depotet, konfigurere databaseforbindelsene dine, initialisere skjemaet og starte dev-serveren med hot reload.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js 22+**, **Git** og **MySQL 8.0+** -- se [Forutsetninger](../setup/prerequisites)
- Opprett en MySQL-bruker med databaseopprettingsprivilegier
- Gjennomgå referansen for [Miljøvariabler](../setup/environment-variables) for API-konfigurering

</div>

## Trinn-for-trinn oppsett

### 1. Klon depotet

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Installer avhengigheter

Prosjektet bruker Yarn (en vakt blokkerer `npm install`):

```bash
cd Api
yarn install
```

### 3. Konfigurer miljøvariabler

```bash
cp .env.sample .env
```

Åpne `.env` og konfigurer dine MySQL-tilkoblingstrenger. Hver modul trenger sin egen databaseforbindelse i følgende format:

```
mysql://root:password@localhost:3306/dbname
```

Du trenger tilkoblingstrenger for alle seks moduldatabaser (medlemskap, oppmøte, innhold, giver, meldinger, gjøremål).

### 4. Initialisér databasene

```bash
npm run initdb
```

Dette oppretter alle seks databaser og deres tabeller automatisk.

:::tip
Du kan initialisere en enkelt moduls database med `npm run initdb -- --module=membership` (eller `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Start dev-serveren

```bash
npm run dev
```

API-en starter med hot reload på [http://localhost:8084](http://localhost:8084).

## Nøkkelkommandoer

| Kommando | Beskrivelse |
|---------|-------------|
| `npm run dev` | Start dev-server med hot reload (tsx watch) |
| `npm run build` | Rengjøring, kompiler TypeScript og kopier ressurser |
| `npm run test` | Kjør tester med Jest (inkluderer dekning) |
| `npm run test:watch` | Kjør tester i watch-modus |
| `npm run lint` | Kjør ESLint med auto-fix (ESLint er den eneste formattereren) |

## Staging-distribusjon

For å distribuere til staging-miljøet:

```bash
npm run deploy-staging
```

Dette kjører et produksjonsbygget og distribuerer deretter via Serverless Framework.

:::warning
Sørg for at dine AWS-legitimasjon er konfigurert før du kjører deploy-kommandoen.
:::

## Lokal bibliotekutvikling

Hvis du trenger å utvikle et delt bibliotek (`@churchapps/helpers` eller `@churchapps/apihelper`) sammen med API-en, bygg det i [Packages](https://github.com/ChurchApps/Packages)-arbeidsområdet og legg til en midlertidig Yarn-portal i API-en:

```bash
# I Packages-arbeidsområdet
yarn build

# I API-katalogen
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Dette lar deg teste bibliotekendringer mot API-en uten å publisere til npm. Se [Delte biblioteker](../shared-libraries/#local-development-against-a-consuming-app) for detaljer -- og aldri commit portal-oppløsningen som lenken skriver til `package.json`.

## Relaterte artikler

- **[Database](./database)** -- Forstå database-per-modul-arkitekturen
- **[Modulstruktur](./module-structure)** -- Hvordan kontrollere, repositorier og modeller er organisert
- **[Delte biblioteker](../shared-libraries/)** -- Arbeide med `@churchapps/helpers` og `@churchapps/apihelper`
