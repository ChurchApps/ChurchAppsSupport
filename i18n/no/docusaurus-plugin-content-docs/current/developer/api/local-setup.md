---
title: "Lokalt oppsett av API"
---

# Lokalt oppsett av API

<div class="article-intro">

Denne veiledningen går gjennom oppsettet av ChurchApps-API-et for lokal utvikling. Du kloner repositoryet, konfigurerer databaseforbindelsene, initialiserer skjemaet og starter utviklingsserveren med hot reload.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js 22+**, **Git** og **MySQL 8.0+**. Se [Forutsetninger](../setup/prerequisites)
- Opprett en MySQL-bruker med rettigheter til å opprette databaser
- Se gjennom referansen for [miljøvariabler](../setup/environment-variables) for konfigurasjon av API-et

</div>

## Trinn for trinn

### 1. Klon repositoryet

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

Åpne `.env` og konfigurer MySQL-forbindelsesstrengene. Hver modul trenger sin egen databaseforbindelse i følgende format:

```
mysql://root:password@localhost:3306/dbname
```

Du trenger forbindelsesstrenger for alle seks moduldatabasene (membership, attendance, content, giving, messaging, doing).

### 4. Initialiser databasene

```bash
npm run initdb
```

Dette oppretter alle seks databasene og tabellene deres automatisk.

:::tip
Du kan initialisere databasen for én enkelt modul med `npm run initdb -- --module=membership` (eller `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Start utviklingsserveren

```bash
npm run dev
```

API-et starter med hot reload på [http://localhost:8084](http://localhost:8084).

## Viktige kommandoer

| Kommando | Beskrivelse |
|---------|-------------|
| `npm run dev` | Start utviklingsserveren med hot reload (tsx watch) |
| `npm run build` | Rydd opp, kompiler TypeScript og kopier ressurser |
| `npm run test` | Kjør tester med Jest (inkluderer dekningsrapport) |
| `npm run test:watch` | Kjør tester i watch-modus |
| `npm run lint` | Kjør ESLint med automatisk retting (ESLint er den eneste formateringsverktøyet) |

## Distribusjon

Staging-miljøet er avviklet. API-et distribueres til demomiljøet ved hver push til `main`, og til produksjon via den manuelle arbeidsflyten **Deploy Prod**, som også kjører ventende databasemigreringer. Se [distribusjon av API](../deployment/apis) for detaljer.

## Lokal utvikling av biblioteker

Hvis du trenger å utvikle et delt bibliotek (`@churchapps/helpers` eller `@churchapps/apihelper`) sammen med API-et, bygger du det i [Packages](https://github.com/ChurchApps/Packages)-arbeidsområdet og legger til en midlertidig Yarn-portal i API-et:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Dette lar deg teste endringer i biblioteker mot API-et uten å publisere til npm. Se [Delte biblioteker](../shared-libraries/#local-development-against-a-consuming-app) for detaljer. Og aldri commit portalløsningen som lenken skriver til `package.json`.

## Relaterte artikler

- **[Database](./database)**: Forstå arkitekturen med én database per modul
- **[Modulstruktur](./module-structure)**: Hvordan kontrollere, repositorier og modeller er organisert
- **[Delte biblioteker](../shared-libraries/)**: Arbeid med `@churchapps/helpers` og `@churchapps/apihelper`
