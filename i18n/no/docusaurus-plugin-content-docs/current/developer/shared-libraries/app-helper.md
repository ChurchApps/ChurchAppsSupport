---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper*`-pakkene tilbyr delte React-komponenter og verktøy for alle ChurchApps webapplikasjoner. AppHelper er strukturert som et monorepo-arbeidsområde som inneholder seks pakker som dekker kjernekomponenter, autentisering, gaver, skjemaer, markdown og nettsted-/CMS-funksjonalitet.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Gjør deg kjent med [npm link-arbeidsflyten](./index.md) for lokal utvikling

</div>

## Pakker

| Pakke | Beskrivelse |
|-------|-------------|
| `@churchapps/apphelper` | Kjernekomponenter og verktøy |
| `@churchapps/apphelper-login` | Innloggings- og registrerings-UI |
| `@churchapps/apphelper-donations` | Gave- og donasjonskomponenter |
| `@churchapps/apphelper-forms` | Skjemabyggerkomponenter |
| `@churchapps/apphelper-markdown` | Markdown-redigerer og -renderer |
| `@churchapps/apphelper-website` | Nettsted- og CMS-komponenter |

## Oppsett for lokal utvikling

1. Klon repositoriet:

   ```bash
   git clone https://github.com/ChurchApps/AppHelper.git
   ```

2. Installer avhengigheter:

   ```bash
   cd AppHelper && npm install
   ```

3. Bygg alle pakker og start Vite-lekeplassen:

   ```bash
   npm run playground:reload
   ```

   Dette bygger hver pakke i arbeidsområdet og starter deretter lekeplassens utviklingsserver på **http://localhost:3001**.

:::tip
Lekeplassen er den raskeste måten å utvikle og teste AppHelper-komponenter på. Den omlaster Vite-utviklingsserveren automatisk slik at du kan se endringer i sanntid.
:::

## Publisering

Publiser en enkelt pakke:

```bash
npm run publish:apphelper
```

Publiser alle pakker:

```bash
npm run publish:all
```

:::warning
Når du publiserer, sørg for å oppdatere versjonsnummeret i den relevante `package.json`-filen(e) før du kjører publiseringskommandoen. Alle pakker som avhenger av en endret pakke bør også oppdateres.
:::

## Relaterte artikler

- **[Helpers](./helpers)** -- Basisverktøy-pakken som brukes sammen med AppHelper
- **[Webapper](../web-apps/)** -- Webapplikasjonene som bruker disse pakkene
- **[Oversikt over delte biblioteker](./index.md)** -- `npm link`-arbeidsflyt og pakkeoversikt
