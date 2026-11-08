---
title: "Projektoversigt"
description: "Kortlæg alle ChurchApps-repositorier efter kategori, med frameworks, udviklingsporte, databaser og hvordan de delte @churchapps-pakker forbinder dem, i udviklingsopsætningsdokumentationen."
---

# Projektoversigt

<div class="article-intro">

ChurchApps består af cirka 20 uafhængige repositorier, som hver er udgivet under [ChurchApps GitHub-organisationen](https://github.com/ChurchApps). Denne side giver en komplet oversigt over alle projekter, organiseret efter kategori, sammen med deres frameworks, porte og indbyrdes relationer.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer [forudsætningerne](./prerequisites.md) for den projektkategori, du vil arbejde med

</div>

## Backend-API'er

Alle API'er er bygget med Node.js, Express og TypeScript og deployes til AWS Lambda via Serverless Framework.

| Projekt | Formål | Dev-port | Database |
|---------|--------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Kernemodulær monolit, der dækker medlemskab, fremmøde, indhold, donationer, beskeder og opgaver | 8084 | Separat MySQL-database pr. modul (6 i alt) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend til Lessons.church | -- | Enkelt `lessons` MySQL-database |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI-forespørgselsværktøj drevet af OpenAI | -- | -- |

:::info
Kerneprojektet **Api** er en modulær monolit. Hvert modul (membership, attendance, content, giving, messaging, doing) har sin egen database og er tilgængeligt på en underadresse som `/membership` eller `/giving`. I produktion eksponeres disse som separate Lambda-funktioner bag API Gateway.
:::

## Webapps

| Projekt | Framework | Dev-port | Formål |
|---------|-----------|----------|--------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Dashboard til kirkeadministration |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Offentlig app til kirkens medlemmer |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend til Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Værktøj til import/eksport af data |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statisk | -- | Statiske brochure-websites til kirker |

## Mobilapps

Alle mobilapps bruger React Native med Expo.

| Projekt | Formål | Nøgleversioner |
|---------|--------|----------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Check-in-kioskapp | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Visning af lektioner på Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Afspilning af indhold (inklusive TV-OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobil fjernbetjening til FreeShow | Expo |

## Desktop

| Projekt | Stack | Formål |
|---------|-------|--------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Præsentations- og gudstjenestesoftware |

## Delte biblioteker

Delt kode publiceres til npm under `@churchapps`-scopet og bruges som almindelige npm-afhængigheder af projekterne ovenfor. Alle delte pakker findes i ét repositorie -- [Packages](https://github.com/ChurchApps/Packages) -- som administreres som en Yarn-workspace og udgives med changesets.

| Pakke | Formål | Brugt af |
|-------|--------|----------|
| `@churchapps/helpers` | Grundlæggende hjælpefunktioner og delte TypeScript-interfaces (DateHelper, ApiHelper, CurrencyHelper osv.) | Alle projekter |
| `@churchapps/apihelper` | Hjælpefunktioner til Express-servere (autentificering, basiscontrollere, databaseadgang, AWS-integrationer) | Alle API'er |
| `@churchapps/apphelper` | React-komponentbibliotek med underpath-moduler til login, donationer, formularer, markdown og websitebygning | Alle webapps |
| `@churchapps/content-providers` | Abstraktion for tredjepartsindholdsudbydere (Lessons.church, Planning Center, Dropbox m.fl.) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Integrationsværktøjer til B1.church: webhooks, REST-klient, OAuth | Eksterne integrationsudviklere |
| `@churchapps/texting` | Abstraktion for SMS-udbydere | Api |

Se [Delte biblioteker](../shared-libraries/index.md) for opsætning af workspace og udgivelsesprocessen.

## Projektrelationer

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Alle frontend-apps afhænger af `@churchapps/helpers`. Webapps afhænger desuden af `@churchapps/apphelper`-pakkerne. Alle backend-API'er afhænger af både `@churchapps/helpers` og `@churchapps/apihelper`.

## Næste skridt

- **[Miljøvariabler](./environment-variables.md)** -- Konfigurer dine `.env`-filer for at forbinde til API'er
- **[Lokal opsætning af API](../api/local-setup.md)** -- Opsæt backend-API'et lokalt
