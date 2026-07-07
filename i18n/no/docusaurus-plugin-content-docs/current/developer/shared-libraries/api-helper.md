---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper`-pakken gir server-side verktøy for alle ChurchApps Express.js API-er. Det inkluderer basiskontoller-klassen, JWT-autentisering, databaseverktøy og AWS-integrasjoner som hver API-prosjekt er avhengig av.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Gjør deg kjent med [Packages-arbeidsområdet](./index.md) oppsett og frigjøringsflyt
- Denne pakken avhenger av [`@churchapps/helpers`](./helpers) (som en peer-avhengighet) og gjeneksporterer det

</div>

## Hva som er inkludert

- **CustomBaseController** -- basisklasse for API-kontroller, bygget på `inversify-express-utils`
- **Auth** -- JWT-autentisering via `CustomAuthProvider`, `AuthenticatedUser` og `Principal`
- **Databaseverktøy** -- `DB.query` / `DB.queryOne` og `Pool`-klassen for MySQL-tilkoblingsstyring, pluss `MySqlHelper` og `DBCreator` for schemeoppsett
- **AWS-integrasjoner** -- `AwsHelper` for S3-fillagring og SSM Parameter Store-lesing
- **E-post** -- `EmailHelper` som støtter SES og SMTP-transportere
- **Konfigurasjonslasting** -- `EnvironmentBase` leser tilkoblingstrenger og hemmeligheter fra miljøvariabler eller Parameter Store
- **Div** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Oppsett for lokal utvikling

Denne pakken bor i [Packages](https://github.com/ChurchApps/Packages)-arbeidsområdet sammen med de andre delte bibliotekene:

1. Klon arbeidsområdet:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installer avhengigheter ved arbeidsområderoten:

   ```bash
   cd Packages && yarn install
   ```

3. Bygg (kompiler TypeScript til `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Eller kjør `yarn build` ved roten for å bygge hver pakke i avhengighetsrekkefølge.

For å teste endringer inne i en forbruke-API, bruk en midlertidig Yarn-portal -- se [Lokal utvikling mot en forbrukerapp](./index.md#local-development-against-a-consuming-app).

## Publisering

Frigjøringer går gjennom changesets: kjør `yarn changeset` ved arbeidsområderoten med hver endring, deretter `yarn publish-all` når du er klar til å frigjøre. Se [Oversikt over delte biblioteker](./index.md#releasing-with-changesets) for den fullstendige flyten.

:::info
Denne pakken er en avhengighet av hver ChurchApps API -- kjerne-Api, AskApi og LessonsApi. Når du gjør endringer, test mot en API lokalt før publisering.
:::

## Relaterte artikler

- **[Helpers](./helpers)** -- Grunnleggende utilitetspakke som denne pakken avhenger av
- **[Modulstruktur](../api/module-structure)** -- Hvordan kontroller og auth-middleware brukes i API-moduler
- **[Lokalt API-oppsett](../api/local-setup)** -- Oppsett av API for lokal utvikling
