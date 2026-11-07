---
title: "Project Overview"
description: "Karta över alla ChurchApps-repositorier per kategori, med ramverk, utvecklingsportar, databaser och hur de delade @churchapps-paketen kopplar ihop dem."
---

# Project Overview

<div class="article-intro">

ChurchApps består av cirka 20 oberoende repositories, var och en publicerad under [ChurchApps GitHub-organisationen](https://github.com/ChurchApps). Den här sidan innehåller en fullständig förteckning över alla projekt, ordnade efter kategori, tillsammans med deras ramverk, portar och relationer.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera [förutsättningarna](./prerequisites.md) för den projektkategori du vill arbeta med

</div>

## Backend-API:er

Alla API:er är byggda med Node.js, Express och TypeScript, och distribueras till AWS Lambda via Serverless Framework.

| Projekt | Syfte | Dev-port | Databas |
|---------|-------|----------|---------|
| **[Api](https://github.com/ChurchApps/Api)** | Kärnan i den modulära monoliten som täcker medlemskap, närvaro, innehåll, givande, meddelanden och uppgifter | 8084 | Separat MySQL-databas per modul (6 totalt) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend för Lessons.church | -- | Enskild MySQL-databas `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI-frågeverktyg som drivs av OpenAI | -- | -- |

:::info
Kärnprojektet **Api** är en modulär monolit. Varje modul (medlemskap, närvaro, innehåll, givande, meddelanden, uppgifter) har sin egen databas och nås via en underväg som `/membership` eller `/giving`. I produktion exponeras dessa som separata Lambda-funktioner bakom API Gateway.
:::

## Webbappar

| Projekt | Ramverk | Dev-port | Syfte |
|---------|---------|----------|-------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Administrationspanel för kyrkan |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Publik app för kyrkans medlemmar |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Gränssnitt för Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Verktyg för import/export av data |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statisk | -- | Statiska broschyrwebbplatser för kyrkor |

## Mobilappar

Alla mobilappar använder React Native med Expo.

| Projekt | Syfte | Viktiga versioner |
|---------|-------|-------------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | App för kyrkans medlemmar på iOS och Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Kiosk-app för incheckning | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Visning av lektioner på Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Uppspelning av innehåll (inklusive TV-OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobil fjärrkontroll för FreeShow | Expo |

## Skrivbord

| Projekt | Stack | Syfte |
|---------|-------|-------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Programvara för presentationer och gudstjänster |

## Delade bibliotek

Delad kod publiceras till npm under `@churchapps`-scopet och används som vanliga npm-beroenden av projekten ovan. Alla delade paket finns i ett enda repository -- [Packages](https://github.com/ChurchApps/Packages) -- som hanteras som en Yarn-workspace och släpps med changesets.

| Paket | Syfte | Används av |
|-------|-------|------------|
| `@churchapps/helpers` | Grundläggande verktyg och delade TypeScript-gränssnitt (DateHelper, ApiHelper, CurrencyHelper m.fl.) | Alla projekt |
| `@churchapps/apihelper` | Verktyg för Express-servern (autentisering, basskontroller, databasåtkomst, AWS-integrationer) | Alla API:er |
| `@churchapps/apphelper` | React-komponentbibliotek med undermoduler för inloggning, donationer, formulär, markdown och webbplatsbyggare | Alla webbappar |
| `@churchapps/content-providers` | Abstraktion för tredjepartsleverantörer av innehåll (Lessons.church, Planning Center, Dropbox m.fl.) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Verktygslåda för B1.church-integrationer: webhooks, REST-klient, OAuth | Externa integrationsutvecklare |
| `@churchapps/texting` | Abstraktion för SMS-leverantörer | Api |

Se [Delade bibliotek](../shared-libraries/index.md) för workspace-konfiguration och releaseprocessen.

## Projektrelationer

```
Frontend-appar            Delade bibliotek           Backend-API:er
--------------            ----------------           --------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Alla frontend-appar är beroende av `@churchapps/helpers`. Webbappar är dessutom beroende av paketen i `@churchapps/apphelper`. Alla backend-API:er är beroende av både `@churchapps/helpers` och `@churchapps/apihelper`.

## Nästa steg

- **[Miljövariabler](./environment-variables.md)** -- Konfigurera dina `.env`-filer för att ansluta till API:erna
- **[Lokal installation av API](../api/local-setup.md)** -- Ställ in backend-API:et lokalt
