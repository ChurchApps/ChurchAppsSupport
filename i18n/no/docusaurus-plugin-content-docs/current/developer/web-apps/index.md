---
title: "Webapper"
---

# Webapper

<div class="article-intro">

ChurchApps inkluderer tre webapplikasjoner, hver med et forskjellig publikum og formål. De deler et felles teknologisk grunnlag av React 19, TypeScript og Material-UI 7, men skiller seg i byggeverktøy og distribusjonsmål.

</div>

## Applikasjoner i oversikt

| App | Formål | Rammeverk | Utviklingsport |
|-----|--------|-----------|----------------|
| [**B1Admin**](./b1-admin.md) | Kirkeadministrasjonsdashbord | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Offentlig kirkemedlemsapp | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Leksjonsinnholdsadministrasjon | Next.js 16 + React 19 | 3501 |

## Delt teknologistabel

Alle tre webappene er bygget med:

- **TypeScript** -- Ende-til-ende typesikkerhet
- **React 19** -- UI-komponentbibliotek
- **Material-UI 7** -- Designsystem og komponentverktøy
- **React Query 5** -- Serverstatusadministrasjon

## Delte komponenter

Appene deler UI-komponenter og verktøy gjennom `@churchapps/apphelper*`-pakkefamilien:

| Pakke | Formål |
|-------|--------|
| `@churchapps/apphelper` | Delte React-kjernekomponenter |
| `@churchapps/apphelper-login` | Autentiserings-UI-komponenter |
| `@churchapps/apphelper-donations` | Gave- og donasjonsformularer |
| `@churchapps/apphelper-forms` | Skjemabyggerkomponenter |
| `@churchapps/apphelper-markdown` | Markdown-rendering |
| `@churchapps/apphelper-website` | Nettsted-/CMS-komponenter |

:::tip
For detaljer om utvikling av disse delte pakkene lokalt, se [AppHelper](../shared-libraries/app-helper)-dokumentasjonen.
:::

## Postinstall-skript

Hver webapp har et `postinstall`-skript som kopierer lokaliseringsfiler og CSS-ressurser fra `@churchapps/apphelper` inn i prosjektet. Dette kjøres automatisk etter `npm install`.

:::info
Hvis komponenter ser ut til å mangle stiler etter installering av avhengigheter, kan det hende at `postinstall`-skriptet ikke kjørte korrekt. Du kan utløse det manuelt med `npm run postinstall`.
:::

## Byggeverktøy

Appene bruker to forskjellige byggeverktøy:

- **B1Admin** bruker **Vite** -- en rask, moderne bunter som er ideell for enkeltsideapplikasjoner
- **B1App** og **LessonsApp** bruker **Next.js** -- som gir serversiderendering, filbasert ruting og optimaliserte produksjonsbygginger
