---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Paketet `@churchapps/apihelper` innehåller serverside-verktyg för alla ChurchApps Express.js-API:er. Det omfattar basklassen för kontroller, JWT-autentisering, databasverktyg och AWS-integrationer som varje API-projekt är beroende av.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera **Node.js** och **Git** -- se [Förutsättningar](../setup/prerequisites)
- Bekanta dig med [Packages-arbetsytan](./index.md) och släppflödet
- Det här paketet är beroende av [`@churchapps/helpers`](./helpers) (som peer dependency) och exporterar om det

</div>

## Vad ingår

- **CustomBaseController** -- basklass för API-kontroller, byggd på `inversify-express-utils`
- **Auth** -- JWT-autentisering via `CustomAuthProvider`, `AuthenticatedUser` och `Principal`
- **Databasverktyg** -- `DB.query` / `DB.queryOne` och klassen `Pool` för hantering av MySQL-anslutningar, samt `MySqlHelper` och `DBCreator` för schemauppsättning
- **AWS-integrationer** -- `AwsHelper` för S3-fillagring och läsning från SSM Parameter Store
- **E-post** -- `EmailHelper` som stöder SES- och SMTP-transporter
- **Inläsning av konfiguration** -- `EnvironmentBase` läser anslutningssträngar och hemligheter från miljövariabler eller Parameter Store
- **Övrigt** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Konfiguration för lokal utveckling

Det här paketet finns i [Packages](https://github.com/ChurchApps/Packages)-arbetsytan tillsammans med de andra delade biblioteken:

1. Klona arbetsytan:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installera beroenden i arbetsytans rot:

   ```bash
   cd Packages && yarn install
   ```

3. Bygg (kompilerar TypeScript till `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Eller kör `yarn build` i roten för att bygga alla paket i beroendeordning.

För att testa ändringar i ett API som använder paketet, använd en tillfällig Yarn-portal -- se [Lokal utveckling mot en konsumerande app](./index.md#local-development-against-a-consuming-app).

## Publicering

Släpp går via changesets: kör `yarn changeset` i arbetsytans rot för varje ändring och sedan `yarn publish-all` när du är redo att släppa. Se [Översikt över delade bibliotek](./index.md#releasing-with-changesets) för hela flödet.

:::info
Det här paketet är ett beroende för alla ChurchApps-API:er -- kärn-API:et Api, AskApi och LessonsApi. Testa mot ett API lokalt innan du publicerar när du gör ändringar.
:::

## Relaterade artiklar

- **[Helpers](./helpers)** -- Baspaketet för verktyg som det här paketet är beroende av
- **[Modulstruktur](../api/module-structure)** -- Hur kontroller och auth-middleware används i API-moduler
- **[Lokal API-konfiguration](../api/local-setup)** -- Konfigurera API:et för lokal utveckling
