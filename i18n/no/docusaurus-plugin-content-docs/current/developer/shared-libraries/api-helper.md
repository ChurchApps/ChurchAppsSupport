---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Pakken `@churchapps/apihelper` gir server-side verktøy for alle ChurchApps Express.js-API-er. Den inkluderer basiskontroller-klassen, JWT-autentisering, databaseverktøy og AWS-integrasjoner som hvert API-prosjekt er avhengig av.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Gjør deg kjent med oppsettet og utgivelsesflyten til [Packages-arbeidsområdet](./index.md)
- Denne pakken avhenger av [`@churchapps/helpers`](./helpers) (som en peer-avhengighet) og re-eksporterer den

</div>

## Hva som er inkludert

- **CustomBaseController** -- basisklasse for API-kontrollere, bygget på `inversify-express-utils`
- **Auth** -- JWT-autentisering via `CustomAuthProvider`, `AuthenticatedUser` og `Principal`
- **Databaseverktøy** -- `DB.query` / `DB.queryOne` og `Pool`-klassen for MySQL-tilkoblingsstyring, pluss `MySqlHelper` og `DBCreator` for skjemaoppsett
- **AWS-integrasjoner** -- `AwsHelper` for S3-fillagring og lesing fra SSM Parameter Store
- **E-post** -- `EmailHelper` med støtte for SES- og SMTP-transporter
- **Konfigurasjonslasting** -- `EnvironmentBase` leser tilkoblingsstrenger og hemmeligheter fra miljøvariabler eller Parameter Store
- **Diverse** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Oppsett for lokal utvikling

Denne pakken bor i [Packages](https://github.com/ChurchApps/Packages)-arbeidsområdet sammen med de andre delte bibliotekene:

1. Klon arbeidsområdet:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installer avhengigheter ved roten av arbeidsområdet:

   ```bash
   cd Packages && yarn install
   ```

3. Bygg (kompilerer TypeScript til `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Eller kjør `yarn build` ved roten for å bygge hver pakke i avhengighetsrekkefølge.

For å teste endringer inne i et konsumerende API, bruk en midlertidig Yarn-portal -- se [Lokal utvikling mot en konsumerende app](./index.md#local-development-against-a-consuming-app).

## Publisering

Utgivelser går gjennom changesets: kjør `yarn changeset` ved roten av arbeidsområdet for hver endring, og deretter `yarn publish-all` når du er klar til å publisere. Se [Oversikt over delte biblioteker](./index.md#releasing-with-changesets) for hele flyten.

:::info
Denne pakken er en avhengighet for hvert ChurchApps-API -- kjerne-Api-et, AskApi og LessonsApi. Når du gjør endringer, test mot et API lokalt før publisering.
:::

## Relaterte artikler

- **[Helpers](./helpers)** -- Den grunnleggende verktøypakken som denne pakken avhenger av
- **[Modulstruktur](../api/module-structure)** -- Hvordan kontrollere og autentiseringsmellomvare brukes i API-moduler
- **[Lokalt API-oppsett](../api/local-setup)** -- Sette opp API-et for lokal utvikling
