---
title: "Prehľad projektov"
---

# Prehľad projektov

<div class="article-intro">

ChurchApps pozostáva z približne 20 nezávislých repozitárov, z ktorých každý je publikovaný pod [organizáciou ChurchApps na GitHube](https://github.com/ChurchApps). Táto stránka poskytuje úplný prehľad všetkých projektov usporiadaných podľa kategórie spolu s ich frameworkami, portmi a vzájomnými vzťahmi.

</div>

<div class="prereqs">
<h4>Skôr než začnete</h4>

- Nainštalujte si [predpoklady](./prerequisites) pre kategóriu projektov, na ktorej chcete pracovať

</div>

## Backendové API

Všetky API sú postavené na Node.js, Express a TypeScripte a nasadzujú sa do AWS Lambda pomocou Serverless Frameworku.

| Projekt | Účel | Vývojový port | Databáza |
|---------|------|---------------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Hlavný modulárny monolit pokrývajúci členstvo, dochádzku, obsah, dary, komunikáciu a úlohy | 8084 | Samostatná databáza MySQL pre každý modul (spolu 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend Lessons.church | -- | Jediná databáza MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Nástroj na AI dotazy poháňaný OpenAI | -- | -- |

:::info
Hlavný projekt **Api** je modulárny monolit. Každý modul (členstvo, dochádzka, obsah, dary, komunikácia, úlohy) má vlastnú databázu a je dostupný na podceste, napríklad `/membership` alebo `/giving`. V produkcii sú tieto moduly sprístupnené ako samostatné funkcie Lambda za API Gateway.
:::

## Webové aplikácie

| Projekt | Framework | Vývojový port | Účel |
|---------|-----------|---------------|------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Správcovský panel na administráciu cirkvi |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Verejná aplikácia pre členov cirkvi |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Nástroj na import a export dát |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statický | -- | Statické webové stránky cirkví (brožúry) |

## Mobilné aplikácie

Všetky mobilné aplikácie používajú React Native s Expo.

| Projekt | Účel | Kľúčové verzie |
|---------|------|----------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Aplikácia pre členov cirkvi pre iOS a Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Kiosková aplikácia na check-in | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Zobrazenie lekcií na Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Prehrávanie obsahu (vrátane TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobilné diaľkové ovládanie pre FreeShow | Expo |

## Desktop

| Projekt | Technológie | Účel |
|---------|-------------|------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Prezentačný a bohoslužobný softvér |

## Zdieľané knižnice

Zdieľaný kód je publikovaný na npm pod rozsahom `@churchapps` a projekty uvedené vyššie ho používajú ako bežné npm závislosti. Všetky zdieľané balíky sa nachádzajú v jedinom repozitári -- [Packages](https://github.com/ChurchApps/Packages) -- ktorý je spravovaný ako Yarn workspace a vydávaný pomocou changesets.

| Balík | Účel | Používa |
|-------|------|---------|
| `@churchapps/helpers` | Základné pomocné nástroje a zdieľané TypeScript rozhrania (DateHelper, ApiHelper, CurrencyHelper a ďalšie) | Všetky projekty |
| `@churchapps/apihelper` | Pomocné nástroje pre Express server (autentifikácia, základné kontrolóry, prístup k databáze, integrácie s AWS) | Všetky API |
| `@churchapps/apphelper` | Knižnica React komponentov s podmodulmi pre prihlasovanie, dary, formuláre, markdown a tvorbu webových stránok | Všetky webové aplikácie |
| `@churchapps/content-providers` | Abstrakcia poskytovateľov externého obsahu (Lessons.church, Planning Center, Dropbox a ďalší) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Sada nástrojov pre integrácie B1.church: webhooky, REST klient, OAuth | Vývojári externých integrácií |
| `@churchapps/texting` | Abstrakcia poskytovateľov SMS | Api |

Pozrite si [Zdieľané knižnice](../shared-libraries/), kde nájdete informácie o nastavení workspace a postupe vydávania.

## Vzťahy medzi projektmi

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Všetky frontendové aplikácie závisia od `@churchapps/helpers`. Webové aplikácie navyše závisia od balíkov `@churchapps/apphelper`. Všetky backendové API závisia od `@churchapps/helpers` aj `@churchapps/apihelper`.

## Ďalšie kroky

- **[Premenné prostredia](./environment-variables)** -- Nastavte si súbory `.env` tak, aby sa pripájali k API
- **[Lokálne nastavenie API](../api/local-setup)** -- Nastavte si backendové API lokálne
