---
title: "Lokalt oppsett av API"
---

# Lokalt oppsett av API

<div class="article-intro">

Denne veiledningen går gjennom oppsett av ChurchApps-API-et for lokal utvikling. Du klonar repositoriet, konfigurerer databaseforbindelsene, initialiserer skjemaet og starter utviklingsserveren med hot reload.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js 24+**, **Git** og **MySQL 8.0+** — se [Forutsetninger](../setup/prerequisites)
- Opprett en MySQL-bruker med rettigheter til å opprette databaser
- Gå gjennom referansen [Miljøvariabler](../setup/environment-variables) for API-konfigurasjon

</div>

## Trinn for trinn

### 1. Klon repositoriet

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

Åpne `.env` og konfigurer MySQL-tilkoblingsstrengene dine. Hver modul trenger sin egen databasetilkobling i følgende format:

```
mysql://root:password@localhost:3306/dbname
```

Du trenger tilkoblingsstrenger for alle seks moduldatabasene (membership, attendance, content, giving, messaging, doing).

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
| `npm run dev` | Start utviklingsserver med hot reload (tsx watch) |
| `npm run build` | Rydd, kompiler TypeScript og kopier ressurser |
| `npm run test` | Kjør tester med Jest (inkluderer dekning) |
| `npm run test:watch` | Kjør tester i watch-modus |
| `npm run lint` | Kjør ESLint med automatisk retting (ESLint er den eneste formatereren) |

## Utrulling

Staging-miljøet er faset ut. API-et rulles ut til demomiljøet ved hver push til `main`, og til produksjon gjennom den manuelle arbeidsflyten **Deploy Prod**, som også bruker ventende databasemigreringer. Se [API-utrulling](../deployment/apis) for detaljer.

## Lokal bibliotekutvikling

Hvis du trenger å utvikle et delt bibliotek (`@churchapps/helpers` eller `@churchapps/apihelper`) sammen med API-et, bygg det i [Packages](https://github.com/ChurchApps/Packages)-arbeidsområdet og legg til en midlertidig Yarn-portal i API-et:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Dette lar deg teste endringer i biblioteket mot API-et uten å publisere til npm. Se [Delte biblioteker](../shared-libraries/#local-development-against-a-consuming-app) for detaljer — og committ aldri portal-oppløsningen som lenken skriver til `package.json`.

## Relaterte artikler

- **[Database](./database)** — forstå arkitekturen med database per modul
- **[Modulstruktur](./module-structure)** — hvordan kontrollere, repositorier og modeller er organisert
- **[Delte biblioteker](../shared-libraries/)** — arbeid med `@churchapps/helpers` og `@churchapps/apihelper`
