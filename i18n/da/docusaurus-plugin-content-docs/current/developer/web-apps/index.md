---
title: "Webapps"
---

# Webapps

<div class="article-intro">

ChurchApps inkluderer tre webapplikationer, der hver bruger et forskellige publikum og formål. De deler et fælles tech-fundament af React 19, TypeScript og Material-UI 7, men adskiller sig i deres build-værktøj og installationsmål.

</div>

## Applikationer på et øjeblik

| App | Formål | Framework | Dev Port |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Kirkadministrationsdashboard | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Offentlig-vendt kirkmedlemsapp | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Lektionsindholdsadministration | Next.js 16 + React 19 | 3501 |

## Delt Tech Stack

Alle tre webapps er bygget med:

- **TypeScript** -- End-to-end type sikkerhed
- **React 19** -- UI-komponentbibliotek
- **Material-UI 7** -- Designsystem og komponenttoolkit
- **React Query 5** -- Serverstatusadministration

## Delte komponenter

Apperne deler UI-komponenter og værktøjer gennem `@churchapps/apphelper*`-pakke-familien:

| Package | Formål |
|---------|---------|
| `@churchapps/apphelper` | Kerne delte React-komponenter |
| `@churchapps/apphelper-login` | Godkendelse UI-komponenter |
| `@churchapps/apphelper-donations` | Donation og giverformularer |
| `@churchapps/apphelper-forms` | Formularbuilder-komponenter |
| `@churchapps/apphelper-markdown` | Markdown-gengivelse |
| `@churchapps/apphelper-website` | Websted/CMS-komponenter |

:::tip
For detaljer om udvikling af disse delte pakker lokalt, se [AppHelper](../shared-libraries/app-helper)-dokumentationen.
:::

## Postinstall-script

Hver webapp har et `postinstall`-script, der kopierer locale-filer og CSS-aktiver fra `@churchapps/apphelper` til projektet. Dette køres automatisk efter `npm install`.

:::info
Hvis komponenter ser uformatterede ud efter installation af afhængigheder, kørte `postinstall`-scriptet muligvis ikke korrekt. Du kan udløse det manuelt med `npm run postinstall`.
:::

## Build-værktøj

Apperne bruger to forskellige build-værktøjer:

- **B1Admin** bruger **Vite** -- en hurtig, moderne bundler ideal til single-page applikationer
- **B1App** og **LessonsApp** bruger **Next.js** -- levering af server-side rendering, filbaseret routing og optimerede produktionsbyggerier
