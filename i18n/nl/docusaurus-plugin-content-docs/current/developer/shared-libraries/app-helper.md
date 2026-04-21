---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

De `@churchapps/apphelper*`-pakketten bieden gedeelde React-onderdelen en utilities voor alle ChurchApps web-applicaties. AppHelper is gestructureerd als een monorepo-werkruimte met zes pakketten die kernonderdelen, verificatie, donaties, formulieren, markdown en website/CMS-functionaliteit omvatten.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Installeer **Node.js** en **Git** -- zie [Prerequisites](../setup/prerequisites)
- Maak jezelf vertrouwd met de [npm link workflow](./index.md) voor lokale ontwikkeling

</div>

## Pakketten

| Package | Beschrijving |
|---------|-------------|
| `@churchapps/apphelper` | Kernonderdelen en utilities |
| `@churchapps/apphelper-login` | Login- en registratie-UI |
| `@churchapps/apphelper-donations` | Donatie- en donatie-onderdelen |
| `@churchapps/apphelper-forms` | Formuliermaker-onderdelen |
| `@churchapps/apphelper-markdown` | Markdown-editor en -renderer |
| `@churchapps/apphelper-website` | Website- en CMS-onderdelen |

## Setup voor Lokale Ontwikkeling

1. Kloon de repository:

   ```bash
   git clone https://github.com/ChurchApps/AppHelper.git
   ```

2. Installeer afhankelijkheden:

   ```bash
   cd AppHelper && npm install
   ```

3. Bouw alle pakketten en start de Vite-speeltuin:

   ```bash
   npm run playground:reload
   ```

   Dit bouwt elk pakket in de werkruimte en start vervolgens de speeltuin-dev-server op **http://localhost:3001**.

:::tip
De speeltuin is de snelste manier om AppHelper-onderdelen te ontwikkelen en te testen. Het hot-reloadt de Vite-dev-server zodat u wijzigingen in real-time kunt zien.
:::

## Publicatie

Publiceer een enkel pakket:

```bash
npm run publish:apphelper
```

Publiceer alle pakketten:

```bash
npm run publish:all
```

:::warning
Zorg er bij publicatie voor dat u het versienummer in de relevante `package.json`-bestanden bijwerkt voordat u de publicatiecommando uitvoert. Alle pakketten die afhankelijk zijn van een gewijzigd pakket, moeten ook worden bijgewerkt.
:::

## Gerelateerde Artikelen

- **[Helpers](./helpers)** -- Het basisutiliteitspakket dat naast AppHelper wordt gebruikt
- **[Web Apps](../web-apps/)** -- De web-applicaties die deze pakketten gebruiken
- **[Shared Libraries Overview](./index.md)** -- `npm link` workflow en pakketoverzicht
