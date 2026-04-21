---
title: "Helpers"
---

# Helpers

<div class="article-intro">

`@churchapps/helpers`-pakken giver grundlæggende værktøjer, der bruges af alle ChurchApps-projekter, både frontend og backend. Det er framework-agnostisk og inkluderer almindelige hjælpere såsom `DateHelper`, `ApiHelper`, `CurrencyHelper` og andre delte værktøjer.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer **Node.js** og **Git** -- se [Forudsætninger](../setup/prerequisites)
- Gør dig bekendt med [npm link workflow](./index.md) til lokal udvikling

</div>

## Setup til lokal udvikling

1. Klon lageret:

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. Installer afhængigheder:

   ```bash
   cd Helpers && npm install
   ```

3. Byg pakken (kompilerer TypeScript til `dist/`):

   ```bash
   npm run build
   ```

4. Gør det tilgængeligt til lokal linking:

   ```bash
   npm link
   ```

Du kan derefter linke det til ethvert forbrugerprojekt:

```bash
cd ../YourProject && npm link @churchapps/helpers
```

## Publicering

For at publicere en ny version til npm:

1. Opdater versionen i `package.json`
2. Publicer:

   ```bash
   npm publish --access=public
   ```

:::warning
Da denne pakke bruges af alle ChurchApps-projekter, har ændringer her en bred påvirkning. Test grundigt med `npm link` i mindst ét forbrugerings-API og ét forbrugerings-webapp, før du publicerer.
:::

## Relaterede artikler

- **[ApiHelper](./api-helper)** -- Serversidesværktøjer, der afhænger af denne pakke
- **[AppHelper](./app-helper)** -- React-komponenter, der afhænger af denne pakke
- **[Oversigt over delte biblioteker](./index.md)** -- `npm link` workflow og pakke oversigt
