---
title: "Projektoversigt"
---

# Projektoversigt

<div class="article-intro">

ChurchApps består af cirka 20 uafhængige lagre, hver udgivet under [ChurchApps GitHub-organisationen](https://github.com/ChurchApps). Denne side giver et fuldstændigt lager over alle projekter organiseret efter kategori sammen med deres frameworks, porte og relationer.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer [forudsætningerne](./prerequisites) for den projektkategori, du vil arbejde med

</div>

## Backend-API'er

Alle API'er er bygget med Node.js, Express og TypeScript, og implementeres til AWS Lambda via Serverless Framework.

| Project | Formål | Dev Port | Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Core modulariseret monolith, der dækker medlemskab, tilstedeværelse, indhold, giver, meddelelser og gøre | 8084 | Separat MySQL-database pr. modul (6 i alt) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church-backend | -- | Enkelt `lessons` MySQL-database |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI-forespørgselsværktøj powered af OpenAI | -- | -- |

:::info
Core **Api**-projektet er en modulariseret monolith. Hvert modul (medlemskab, tilstedeværelse, indhold, giver, meddelelser, gør) har sin egen database og er tilgængelig på en understi såsom `/membership` eller `/giving`. I produktionen vises disse som separate Lambda-funktioner bag API Gateway.
:::

## Webapps

| Project | Framework | Dev Port | Formål |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | Kirkadministrationsdashboard |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Offentlig-vendt kirkmedlemsapp |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church frontend |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Dataindport-/udportværktøj |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statisk | -- | Statiske kirkbrochurewebsteder |

## Mobilapps

Alle mobilapps bruger React Native med Expo.

| Project | Formål | Vigtige versioner |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Kirkmedlemsapp til iOS og Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Check-in kiosk-app | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV-lektionsvisning | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Indholdsafspilning (inkl. TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobil fjernbetjening til FreeShow | Expo |

## Skrivebord

| Project | Stack | Formål |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Præsentations- og tilbedeelsessoftware |

## Delte biblioteker

Delt kode udgives til npm under `@churchapps` scope. Disse forbruges som almindelige npm-afhængigheder af projekterne ovenfor.

| Package | npm Name | Formål | Brugt af |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | Grundlæggende værktøjer (DateHelper, ApiHelper, CurrencyHelper osv.) | Alle projekter |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Express-serverværktøjer (auth middleware, DB-hjælpere, AWS-integration) | Alle API'er |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | Arbejdsrum med 6 pakker | React-komponentbibliotek | Alle webapps |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | YouTube-, Vimeo- og lokale indholdsudbydere | FreeShow, FreePlay, Api |

### AppHelper-underpakker

AppHelper-projektet er et monorepo-arbejdsrum, der udgiver seks pakker:

| Package | npm Name |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## Projektrelationer

```
Frontend-apps            Delte biblioteker       Backend-API'er
-----------              ----------------        -----------
B1Admin      ──────┐
B1App        ──────┤    @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►  @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                AskApi
FreeShow     ──────┘     @churchapps/apihelper ◄────┘
```

Alle frontend-apps afhænger af `@churchapps/helpers`. Webapps afhænger desuden af `@churchapps/apphelper`-pakker. Alle backend-API'er afhænger af både `@churchapps/helpers` og `@churchapps/apihelper`.

## Næste trin

- **[Miljøvariabler](./environment-variables)** -- Konfigurér dine `.env`-filer til at forbinde til API'er
- **[Lokalt API-setup](../api/local-setup)** -- Opsæt backend API'en lokalt
