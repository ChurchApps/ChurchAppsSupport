---
title: "Project Overview"
---

# Project Overview

<div class="article-intro">

ChurchApps bestaat uit ongeveer 20 onafhankelijke repositories, elk gepubliceerd onder de [ChurchApps GitHub-organisatie](https://github.com/ChurchApps). Deze pagina biedt een volledige inventaris van alle projecten ingedeeld naar categorie, samen met hun frameworks, poorten en relaties.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Installeer de [voorwaarden](./prerequisites) voor de projectcategorie waarin u wilt werken

</div>

## Backend API's

Alle API's zijn gebouwd met Node.js, Express en TypeScript en worden naar AWS Lambda geïmplementeerd via Serverless Framework.

| Project | Purpose | Dev Port | Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Kernmodulaire monoliet die lidmaatschap, aanwezigheid, inhoud, donaties, messaging en taken omvat | 8084 | Aparte MySQL-database per module (6 totaal) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church backend | -- | Enkele `lessons` MySQL-database |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI-querytool aangedreven door OpenAI | -- | -- |

:::info
Het kern **Api**-project is een modulaire monoliet. Elke module (lidmaatschap, aanwezigheid, inhoud, donaties, messaging, taken) heeft zijn eigen database en is toegankelijk op een subpad zoals `/membership` of `/giving`. In productie zijn deze beschikbaar gesteld als afzonderlijke Lambda-functies achter API Gateway.
:::

## Web Apps

| Project | Framework | Dev Port | Purpose |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | Kerkbeheerbereidingsdashboard |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Openbare kerkledapp |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church frontend |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Hulpprogramma voor gegevensimport/export |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | Statische kerkbrochurewebsites |

## Mobiele Apps

Alle mobiele apps gebruiken React Native met Expo.

| Project | Purpose | Key Versions |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Kerkledapp voor iOS en Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Check-in-kiosk-app | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV-lessenweergave | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Inhoudsafspeling (inclusief TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobiele afstandsbediening voor FreeShow | Expo |

## Desktop

| Project | Stack | Purpose |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Presentatie- en aanbiddingssoftware |

## Gedeelde Bibliotheken

Gedeelde code wordt naar npm gepubliceerd onder het `@churchapps`-bereik. Deze worden als reguliere npm-afhankelijkheden door de bovenstaande projecten gebruikt.

| Package | npm Name | Purpose | Used By |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | Basisutilities (DateHelper, ApiHelper, CurrencyHelper, enz.) | Alle projecten |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Express-serverutilities (verificatiemiddleware, databasehelpers, AWS-integratie) | Alle API's |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | Werkruimte met 6 pakketten | React-onderdelenbibliotheek | Alle web-apps |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | YouTube, Vimeo en lokale inhoudsproviders | FreeShow, FreePlay, Api |

### AppHelper Sub-packages

Het AppHelper-project is een monorepo-werkruimte die zes pakketten publiceert:

| Package | npm Name |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## Project Relaties

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Alle frontend-apps zijn afhankelijk van `@churchapps/helpers`. Web-apps zijn daarnaast afhankelijk van `@churchapps/apphelper`-pakketten. Alle backend-API's zijn afhankelijk van zowel `@churchapps/helpers` als `@churchapps/apihelper`.

## Volgende Stappen

- **[Environment Variables](./environment-variables)** -- Configureer uw `.env`-bestanden om verbinding te maken met API's
- **[API Local Setup](../api/local-setup)** -- Stel de backend API lokaal in
