---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper*`-pakkerne giver delte React-komponenter og værktøjer til alle ChurchApps-webapps. AppHelper er struktureret som et monorepo-arbejdsrum, der indeholder seks pakker, der dækker kernkomponenter, godkendelse, donationer, formularer, markdown og websted/CMS-funktionalitet.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer **Node.js** og **Git** -- se [Forudsætninger](../setup/prerequisites)
- Gør dig bekendt med [npm link workflow](./index.md) til lokal udvikling

</div>

## Pakker

| Package | Beskrivelse |
|---------|-------------|
| `@churchapps/apphelper` | Kernkomponenter og værktøjer |
| `@churchapps/apphelper-login` | Login og registrering af brugergrænsefladen |
| `@churchapps/apphelper-donations` | Giver og donationskomponenter |
| `@churchapps/apphelper-forms` | Formularbuilder-komponenter |
| `@churchapps/apphelper-markdown` | Markdown editor og renderer |
| `@churchapps/apphelper-website` | Websted og CMS-komponenter |

## Setup til lokal udvikling

1. Klon lageret:

   ```bash
   git clone https://github.com/ChurchApps/AppHelper.git
   ```

2. Installer afhængigheder:

   ```bash
   cd AppHelper && npm install
   ```

3. Byg alle pakker og start Vite-legen:

   ```bash
   npm run playground:reload
   ```

   Dette bygger hver pakke i arbejdsrummet, derefter starter legeldevelopmentserveren på **http://localhost:3001**.

:::tip
Legen er den hurtigste måde at udvikle og teste AppHelper-komponenter på. Det hot-genindlæser Vite dev-serveren, så du kan se ændringer i realtid.
:::

## Publicering

Publicer en enkelt pakke:

```bash
npm run publish:apphelper
```

Publicer alle pakker:

```bash
npm run publish:all
```

:::warning
Når du publicerer, skal du sørge for at opdatere versionsnummeret i den relevante `package.json`-fil(er), før du kører publiceringskommandoen. Alle pakker, der afhænger af en ændret pakke, bør også opdateres.
:::

## Relaterede artikler

- **[Helpers](./helpers)** -- Det grundlæggende værktøjspakke, der bruges sammen med AppHelper
- **[Webapps](../web-apps/)** -- De webapps, der forbruger disse pakker
- **[Oversigt over delte biblioteker](./index.md)** -- `npm link` workflow og pakke oversigt
