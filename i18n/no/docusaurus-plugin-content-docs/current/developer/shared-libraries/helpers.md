---
title: "Helpers"
---

# Helpers

<div class="article-intro">

`@churchapps/helpers`-pakken tilbyr basisverktøy som brukes av alle ChurchApps-prosjekter, både frontend og backend. Den er rammeverksagnostisk og inkluderer vanlige hjelpere som `DateHelper`, `ApiHelper`, `CurrencyHelper` og andre delte verktøy.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Gjør deg kjent med [npm link-arbeidsflyten](./index.md) for lokal utvikling

</div>

## Oppsett for lokal utvikling

1. Klon repositoriet:

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. Installer avhengigheter:

   ```bash
   cd Helpers && npm install
   ```

3. Bygg pakken (kompilerer TypeScript til `dist/`):

   ```bash
   npm run build
   ```

4. Gjør den tilgjengelig for lokal lenking:

   ```bash
   npm link
   ```

Du kan deretter lenke den inn i et prosjekt som bruker den:

```bash
cd ../DittProsjekt && npm link @churchapps/helpers
```

## Publisering

For å publisere en ny versjon til npm:

1. Oppdater versjonen i `package.json`
2. Publiser:

   ```bash
   npm publish --access=public
   ```

:::warning
Siden denne pakken brukes av hvert ChurchApps-prosjekt, har endringer her bred påvirkning. Test grundig med `npm link` i minst ett API-prosjekt og én webapp før publisering.
:::

## Relaterte artikler

- **[ApiHelper](./api-helper)** -- Serversideverktøy som avhenger av denne pakken
- **[AppHelper](./app-helper)** -- React-komponenter som avhenger av denne pakken
- **[Oversikt over delte biblioteker](./index.md)** -- `npm link`-arbeidsflyt og pakkeoversikt
