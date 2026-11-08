---
title: "Projectoverzicht"
description: "Bekijk alle ChurchApps-repositories per categorie, met frameworks, ontwikkelpoorten, databases en hoe de gedeelde @churchapps-pakketten ze met elkaar verbinden, in de ontwikkelaarsinstallatiedocumentatie."
---

# Projectoverzicht

<div class="article-intro">

ChurchApps bestaat uit ongeveer 20 onafhankelijke repositories, die elk worden gepubliceerd onder de [ChurchApps GitHub-organisatie](https://github.com/ChurchApps). Deze pagina biedt een volledig overzicht van alle projecten, ingedeeld per categorie, met hun frameworks, poorten en onderlinge relaties.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Installeer de [vereisten](./prerequisites.md) voor de projectcategorie waaraan je wilt werken

</div>

## Backend-API's

Alle API's zijn gebouwd met Node.js, Express en TypeScript, en worden via het Serverless Framework naar AWS Lambda gedeployed.

| Project | Doel | Ontwikkelpoort | Database |
|---------|------|----------------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Kern-monoliet met modules voor ledenbeheer, aanwezigheid, inhoud, giften, berichten en taken | 8084 | Aparte MySQL-database per module (6 in totaal) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend van Lessons.church | -- | Enkele `lessons` MySQL-database |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI-zoektool aangedreven door OpenAI | -- | -- |

:::info
Het kernproject **Api** is een modulaire monoliet. Elke module (membership, attendance, content, giving, messaging, doing) heeft zijn eigen database en is bereikbaar via een subpad, zoals `/membership` of `/giving`. In productie worden deze blootgesteld als afzonderlijke Lambda-functies achter API Gateway.
:::

## Webapps

| Project | Framework | Ontwikkelpoort | Doel |
|---------|-----------|----------------|------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Dashboard voor kerkbeheer |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Publieke app voor kerkleden |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend van Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Hulpprogramma voor gegevensimport en -export |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statisch | -- | Statische brochurewebsites voor kerken |

## Mobiele apps

Alle mobiele apps gebruiken React Native met Expo.

| Project | Doel | Belangrijke versies |
|---------|------|---------------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Inchecken-kioskapp | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Lessenweergave voor Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Afspelen van inhoud (inclusief TV-besturingssystemen) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobiele afstandsbediening voor FreeShow | Expo |

## Desktop

| Project | Stack | Doel |
|---------|-------|------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Presentatie- en aanbiddingssoftware |

## Gedeelde bibliotheken

Gedeelde code wordt gepubliceerd op npm onder de `@churchapps`-scope en door de bovenstaande projecten gebruikt als gewone npm-afhankelijkheden. Alle gedeelde pakketten staan in één repository -- [Packages](https://github.com/ChurchApps/Packages) -- beheerd als Yarn-workspace en uitgebracht met changesets.

| Pakket | Doel | Gebruikt door |
|--------|------|---------------|
| `@churchapps/helpers` | Basishulpprogramma's en gedeelde TypeScript-interfaces (DateHelper, ApiHelper, CurrencyHelper, enz.) | Alle projecten |
| `@churchapps/apihelper` | Express-serverhulpprogramma's (authenticatie, basiscontrollers, databasetoegang, AWS-integraties) | Alle API's |
| `@churchapps/apphelper` | React-componentenbibliotheek met subpadmodules voor inloggen, donaties, formulieren, markdown en websitebouw | Alle webapps |
| `@churchapps/content-providers` | Abstractielaag voor externe contentproviders (Lessons.church, Planning Center, Dropbox en andere) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Integratietoolkit van B1.church: webhooks, REST-client, OAuth | Externe integratieontwikkelaars |
| `@churchapps/texting` | Abstractielaag voor sms-providers | Api |

Zie [Gedeelde bibliotheken](../shared-libraries/index.md) voor de workspace-instelling en de releaseworkflow.

## Relaties tussen projecten

```
Frontend-apps              Gedeelde bibliotheken      Backend-API's
--------------             ---------------------      -------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Alle frontend-apps zijn afhankelijk van `@churchapps/helpers`. Webapps zijn daarnaast afhankelijk van de `@churchapps/apphelper`-pakketten. Alle backend-API's zijn afhankelijk van zowel `@churchapps/helpers` als `@churchapps/apihelper`.

## Volgende stappen

- **[Omgevingsvariabelen](./environment-variables.md)** -- Configureer je `.env`-bestanden om verbinding te maken met de API's
- **[Lokale API-installatie](../api/local-setup.md)** -- Stel de backend-API lokaal in
