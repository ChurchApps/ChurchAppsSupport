---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Paketas `@churchapps/apihelper` teikia serverio pusės pagalbines priemones visoms ChurchApps Express.js API. Jame yra bazinė valdiklių klasė, JWT autentifikacija, duomenų bazės pagalbinės funkcijos ir AWS integracijos, nuo kurių priklauso kiekvienas API projektas.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiekite **Node.js** ir **Git** -- žr. [Reikalavimai](../setup/prerequisites)
- Susipažinkite su [Paketų darbo sritimi](./index.md) ir leidimo eiga
- Šis paketas priklauso nuo [`@churchapps/helpers`](./helpers) (kaip lygiavertis priklausomybė) ir jį eksportuoja toliau

</div>

## Kas įtraukta

- **CustomBaseController** -- bazinė API valdiklių klasė, sukurta naudojant `inversify-express-utils`
- **Auth** -- JWT autentifikacija per `CustomAuthProvider`, `AuthenticatedUser` ir `Principal`
- **Duomenų bazės pagalbinės funkcijos** -- `DB.query` / `DB.queryOne` ir `Pool` klasė MySQL ryšiams valdyti, taip pat `MySqlHelper` ir `DBCreator` schemai paruošti
- **AWS integracijos** -- `AwsHelper` S3 failų saugyklai ir SSM Parameter Store nuskaitymui
- **El. paštas** -- `EmailHelper`, palaikantis SES ir SMTP perdavimo būdus
- **Konfigūracijos įkėlimas** -- `EnvironmentBase` nuskaito ryšio eilutes ir paslaptis iš aplinkos kintamųjų arba Parameter Store
- **Įvairūs** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Sąranka vietiniam kūrimui

Šis paketas yra [Packages](https://github.com/ChurchApps/Packages) darbo srityje kartu su kitomis bendrinėmis bibliotekomis:

1. Klonuokite darbo sritį:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Įdiekite priklausomybes darbo srities šakniniame aplanke:

   ```bash
   cd Packages && yarn install
   ```

3. Sukurkite (kompiliuojamas TypeScript į `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Arba paleiskite `yarn build` šakniniame aplanke, kad būtų sukurti visi paketai priklausomybių tvarka.

Norėdami išbandyti pakeitimus vartojančiame API, naudokite laikiną Yarn portal -- žr. [Vietinis kūrimas su vartojančia programa](./index.md#local-development-against-a-consuming-app).

## Publikavimas

Leidimai vykdomi per changesets: su kiekvienu pakeitimu šakniniame darbo srities aplanke paleiskite `yarn changeset`, o kai būsite pasiruošę leisti -- `yarn publish-all`. Visą eigą žr. [Bendrinių bibliotekų apžvalga](./index.md#releasing-with-changesets).

:::info
Šis paketas yra kiekvieno ChurchApps API priklausomybė -- pagrindinio Api, AskApi ir LessonsApi. Keisdami kodą, prieš publikuodami, išbandykite jį vietiniame API.
:::

## Susiję straipsniai

- **[Helpers](./helpers)** -- Bazinis pagalbinių funkcijų paketas, nuo kurio priklauso šis paketas
- **[Modulio struktūra](../api/module-structure)** -- Kaip valdikliai ir autentifikacijos tarpiniai programinės įrangos komponentai naudojami API moduliuose
- **[Vietinė API sąranka](../api/local-setup)** -- API paruošimas vietiniam kūrimui
