---
title: "Web Apps"
---

# Web Apps

<div class="article-intro">

ChurchApps omvat drie webapplicaties, elk serveerend een ander publiek en doel. Ze delen een gemeenschappelijke technische basis van React 19, TypeScript en Material-UI 7, maar verschillen in hun build-tooling en implementatiedoelen.

</div>

## Applicaties in een Oogopslag

| App | Purpose | Framework | Dev Port |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Kerkbeheerbereidingsdashboard | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Publiek beschikbare kerkledapp | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Lessinhoudsbeheer | Next.js 16 + React 19 | 3501 |

## Gedeelde Tech Stack

Alle drie webapps zijn gebouwd met:

- **TypeScript** -- End-to-end typeveiligheid
- **React 19** -- UI-onderdelenbibliotheek
- **Material-UI 7** -- Designsysteem en onderdelentoolkit
- **React Query 5** -- Serverstaat-management

## Gedeelde Onderdelen

De apps delen UI-onderdelen en utilities via de `@churchapps/apphelper*`-familie van pakketten:

| Package | Purpose |
|---------|---------|
| `@churchapps/apphelper` | Kerngedeelde React-onderdelen |
| `@churchapps/apphelper-login` | Verificatie-UI-onderdelen |
| `@churchapps/apphelper-donations` | Donatie- en donatie-formulieren |
| `@churchapps/apphelper-forms` | Formuliermaker-onderdelen |
| `@churchapps/apphelper-markdown` | Markdown-rendering |
| `@churchapps/apphelper-website` | Website/CMS-onderdelen |

:::tip
Zie voor details over het lokaal ontwikkelen van deze gedeelde pakketten de [AppHelper](../shared-libraries/app-helper)-documentatie.
:::

## Postinstall-script

Elke web-app heeft een `postinstall`-script dat locale-bestanden en CSS-assets van `@churchapps/apphelper` in het project kopieert. Dit draait automatisch na `npm install`.

:::info
Als onderdelen na het installeren van afhankelijkheden unstyled zijn, is het `postinstall`-script mogelijk niet correct uitgevoerd. U kunt het handmatig activeren met `npm run postinstall`.
:::

## Build-tooling

De apps gebruiken twee verschillende build-tools:

- **B1Admin** gebruikt **Vite** -- een snelle, moderne bundler ideaal voor single-page applications
- **B1App** en **LessonsApp** gebruiken **Next.js** -- serverzijdig rendering, op bestand gebaseerde routing en geoptimaliseerde productiebuild
