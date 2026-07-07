---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Ang `@churchapps/apihelper` package ay nagbibigay ng server-side utilities para sa lahat ng ChurchApps Express.js APIs. Ito ay may kasamang base controller class, JWT authentication, database utilities, at AWS integrations na bawat API project ay nakadepende sa.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang **Node.js** at **Git** -- tingnan ang [Prerequisites](../setup/prerequisites)
- Pamilyarin mo ang sarili mo sa [Packages workspace](./index.md) setup at release flow
- Ang package na ito ay nakadepende sa [`@churchapps/helpers`](./helpers) (bilang peer dependency) at muling nag-export nito

</div>

## What's Included

- **CustomBaseController** -- base class para sa API controllers, itinayo sa `inversify-express-utils`
- **Auth** -- JWT authentication sa pamamagitan ng `CustomAuthProvider`, `AuthenticatedUser`, at `Principal`
- **Database utilities** -- `DB.query` / `DB.queryOne` at ang `Pool` class para sa MySQL connection management, at `MySqlHelper` at `DBCreator` para sa schema setup
- **AWS integrations** -- `AwsHelper` para sa S3 file storage at SSM Parameter Store reads
- **Email** -- `EmailHelper` na sumusuporta sa SES at SMTP transports
- **Config loading** -- `EnvironmentBase` ay nagsasaad ng connection strings at secrets mula sa environment variables o Parameter Store
- **Misc** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Setup para sa Local Development

Ang package na ito ay nakatira sa [Packages](https://github.com/ChurchApps/Packages) workspace kasama ang iba pang shared libraries:

1. I-clone ang workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. I-install ang dependencies sa workspace root:

   ```bash
   cd Packages && yarn install
   ```

3. I-build (nag-compile ng TypeScript sa `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   O patakbuhin ang `yarn build` sa root upang i-build ang bawat package sa dependency order.

Upang subukan ang changes sa loob ng isang consuming API, gamitin ang isang temporary Yarn portal -- tingnan ang [Local Development Against a Consuming App](./index.md#local-development-against-a-consuming-app).

## Publishing

Ang mga releases ay napupunta sa pamamagitan ng changesets: patakbuhin ang `yarn changeset` sa workspace root sa bawat change, pagkatapos ay `yarn publish-all` kapag handa na mag-release. Tingnan ang [Shared Libraries Overview](./index.md#releasing-with-changesets) para sa buong flow.

:::info
Ang package na ito ay isang dependency ng bawat ChurchApps API -- ang core Api, AskApi, at LessonsApi. Kapag gumagawa ng changes, subukan laban sa isang API nang lokal bago mag-publish.
:::

## Related Articles

- **[Helpers](./helpers)** -- Ang base utility package na ang package na ito ay nakadepende sa
- **[Module Structure](../api/module-structure)** -- Paano ginagamit ang controllers at auth middleware sa API modules
- **[Local API Setup](../api/local-setup)** -- Pag-setup ng API para sa local development
