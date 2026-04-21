---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Het `@churchapps/helpers`-pakket biedt basisutilities die door alle ChurchApps-projecten worden gebruikt, zowel frontend als backend. Het is frameworkagnostisch en bevat gemeenschappelijke helpers zoals `DateHelper`, `ApiHelper`, `CurrencyHelper` en andere gedeelde utilities.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Installeer **Node.js** en **Git** -- zie [Prerequisites](../setup/prerequisites)
- Maak jezelf vertrouwd met de [npm link workflow](./index.md) voor lokale ontwikkeling

</div>

## Setup voor Lokale Ontwikkeling

1. Kloon de repository:

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. Installeer afhankelijkheden:

   ```bash
   cd Helpers && npm install
   ```

3. Bouw het pakket (compileert TypeScript naar `dist/`):

   ```bash
   npm run build
   ```

4. Maak het beschikbaar voor lokaal koppelen:

   ```bash
   npm link
   ```

U kunt het vervolgens in elk verbruikend project koppelen:

```bash
cd ../YourProject && npm link @churchapps/helpers
```

## Publicatie

Om een nieuwe versie naar npm te publiceren:

1. Werk het versienummer in `package.json` bij
2. Publiceren:

   ```bash
   npm publish --access=public
   ```

:::warning
Aangezien dit pakket door elk ChurchApps-project wordt gebruikt, hebben wijzigingen hier een breed bereik. Test grondvoetig met `npm link` in ten minste één verbruikende API en één verbruikende web-app voordat u publiceert.
:::

## Gerelateerde Artikelen

- **[ApiHelper](./api-helper)** -- Serverutilities die afhankelijk zijn van dit pakket
- **[AppHelper](./app-helper)** -- React-onderdelen die afhankelijk zijn van dit pakket
- **[Shared Libraries Overview](./index.md)** -- `npm link` workflow en pakketoverzicht
