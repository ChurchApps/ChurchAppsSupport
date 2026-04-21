---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Het `@churchapps/apihelper`-pakket biedt serverutilities voor alle ChurchApps Express.js API's. Het omvat de basiscontrollerklasse, JWT-verificatiemiddleware, databaseutilities en AWS-integraties waarvan elk API-project afhankelijk is.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Installeer **Node.js** en **Git** -- zie [Prerequisites](../setup/prerequisites)
- Maak jezelf vertrouwd met de [npm link workflow](./index.md) voor lokale ontwikkeling
- Dit pakket is afhankelijk van [`@churchapps/helpers`](./helpers)

</div>

## Wat Is Inbegrepen

- **CustomBaseController** -- basisklasse voor API-controllers
- **Verificatiemiddleware** -- JWT-verificatie via `CustomAuthProvider`
- **Databaseutilities** -- `DB.query`, `EnhancedPoolHelper` voor MySQL-verbindingsbeheer
- **AWS-integraties** -- helpers voor S3, SSM Parameter Store en andere AWS-services
- **Inversify DI setup** -- afhankelijkheidsinjectiecontainerconfiguratie

## Setup voor Lokale Ontwikkeling

1. Kloon de repository:

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. Installeer afhankelijkheden:

   ```bash
   cd ApiHelper && npm install
   ```

3. Bouw het pakket (compileert TypeScript naar `dist/`):

   ```bash
   npm run build
   ```

4. Maak het beschikbaar voor lokaal koppelen:

   ```bash
   npm link
   ```

## Sleutelcommando's

| Command | Beschrijving |
|---------|-------------|
| `npm run build` | Compileer TypeScript naar `dist/` |
| `npm run lint` | ESLint uitvoeren |
| `npm run lint:fix` | ESLint met auto-fix uitvoeren |
| `npm run format` | Code met Prettier opmaken |

:::info
Dit pakket is een afhankelijkheid van elke ChurchApps API. Gebruik `npm link` bij het maken van wijzigingen om deze lokaal tegen een API te testen voordat u publiceert.
:::

## Gerelateerde Artikelen

- **[Helpers](./helpers)** -- Het basisutiliteitspakket waarvan dit pakket afhankelijk is
- **[Module Structure](../api/module-structure)** -- Hoe controllers en verificatiemiddleware in API-modules worden gebruikt
- **[Local API Setup](../api/local-setup)** -- De API lokaal instellen voor ontwikkeling
