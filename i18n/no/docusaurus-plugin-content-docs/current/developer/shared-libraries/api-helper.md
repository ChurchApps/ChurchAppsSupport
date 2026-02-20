---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper`-pakken tilbyr serversideverktøy for alle ChurchApps Express.js-API-er. Den inkluderer basekontrollerklassen, JWT-autentiseringsmellomvare, databaseverktøy og AWS-integrasjoner som hvert API-prosjekt er avhengig av.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Gjør deg kjent med [npm link-arbeidsflyten](./index.md) for lokal utvikling
- Denne pakken avhenger av [`@churchapps/helpers`](./helpers)

</div>

## Hva er inkludert

- **CustomBaseController** -- baseklasse for API-kontrollere
- **Autentiseringsmellomvare** -- JWT-autentisering via `CustomAuthProvider`
- **Databaseverktøy** -- `DB.query`, `EnhancedPoolHelper` for MySQL-tilkoblingsadministrasjon
- **AWS-integrasjoner** -- hjelpere for S3, SSM Parameter Store og andre AWS-tjenester
- **Inversify DI-oppsett** -- konfigurasjon av avhengighetsinjeksjonsbeholder

## Oppsett for lokal utvikling

1. Klon repositoriet:

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. Installer avhengigheter:

   ```bash
   cd ApiHelper && npm install
   ```

3. Bygg pakken (kompilerer TypeScript til `dist/`):

   ```bash
   npm run build
   ```

4. Gjør den tilgjengelig for lokal lenking:

   ```bash
   npm link
   ```

## Viktige kommandoer

| Kommando | Beskrivelse |
|----------|-------------|
| `npm run build` | Kompiler TypeScript til `dist/` |
| `npm run lint` | Kjør ESLint |
| `npm run lint:fix` | Kjør ESLint med automatisk retting |
| `npm run format` | Formater kode med Prettier |

:::info
Denne pakken er en avhengighet for hvert ChurchApps API. Når du gjør endringer, bruk `npm link` for å teste mot et API lokalt før publisering.
:::

## Relaterte artikler

- **[Helpers](./helpers)** -- Basisverktøy-pakken som denne pakken avhenger av
- **[Modulstruktur](../api/module-structure)** -- Hvordan kontrollere og autentiseringsmellomvare brukes i API-moduler
- **[Lokalt API-oppsett](../api/local-setup)** -- Sette opp API-et for lokal utvikling
