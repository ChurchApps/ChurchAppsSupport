---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper`-pakken giver serversidesværktøjer til alle ChurchApps Express.js-API'er. Den inkluderer basiscontrollerklassen, JWT-godkendelsesmiddelware, databaseværktøjer og AWS-integrationer, som alle API-projekter afhænger af.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer **Node.js** og **Git** -- se [Forudsætninger](../setup/prerequisites)
- Gør dig bekendt med [npm link workflow](./index.md) til lokal udvikling
- Denne pakke afhænger af [`@churchapps/helpers`](./helpers)

</div>

## Hvad er inkluderet

- **CustomBaseController** -- basisklasse til API-controllere
- **Auth middleware** -- JWT-godkendelse via `CustomAuthProvider`
- **Databaseværktøjer** -- `DB.query`, `EnhancedPoolHelper` til MySQL-forbindelsesstyringsadministration
- **AWS-integrationer** -- hjælpere til S3, SSM Parameter Store og andre AWS-tjenester
- **Inversify DI-setup** -- dependency injection-containerberegning

## Setup til lokal udvikling

1. Klon lageret:

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. Installer afhængigheder:

   ```bash
   cd ApiHelper && npm install
   ```

3. Byg pakken (kompilerer TypeScript til `dist/`):

   ```bash
   npm run build
   ```

4. Gør det tilgængeligt til lokal linking:

   ```bash
   npm link
   ```

## Vigtige kommandoer

| Command | Beskrivelse |
|---------|-------------|
| `npm run build` | Kompilér TypeScript til `dist/` |
| `npm run lint` | Kør ESLint |
| `npm run lint:fix` | Kør ESLint med auto-fix |
| `npm run format` | Formater kode med Prettier |

:::info
Denne pakke er en afhængighed af hver ChurchApps API. Når du foretager ændringer, skal du bruge `npm link` til at teste mod en API lokalt, før du udgiver.
:::

## Relaterede artikler

- **[Helpers](./helpers)** -- Det grundlæggende værktøjspakke, som denne pakke afhænger af
- **[Modulstruktur](../api/module-structure)** -- Hvordan controllere og auth middleware bruges i API-moduler
- **[Lokalt API-setup](../api/local-setup)** -- Opsætning af API'en til lokal udvikling
