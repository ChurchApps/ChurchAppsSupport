---
title: "Prehľad projektu"
description: "Prehľad všetkých repozitárov ChurchApps podľa kategórií s frameworkmi, vývojovými portmi, databázami a spôsobom, akým zdieľané balíky @churchapps prepájajú jednotlivé projekty, v dokumentácii na nastavenie vývojového prostredia."
---

# Prehľad projektu

<div class="article-intro">

ChurchApps pozostáva z približne 20 nezávislých repozitárov, z ktorých každý je publikovaný v [GitHub organizácii ChurchApps](https://github.com/ChurchApps). Táto stránka poskytuje úplný prehľad všetkých projektov usporiadaných podľa kategórií spolu s ich frameworkmi, portmi a vzťahmi.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nainštalujte si [predpoklady](./prerequisites.md) pre kategóriu projektov, na ktorej chcete pracovať

</div>

## Backend API

Všetky API sú postavené na Node.js, Express a TypeScript a nasadzujú sa na AWS Lambda pomocou Serverless Framework.

| Projekt | Účel | Vývojový port | Databáza |
|---------|------|---------------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Hlavný modulárny monolit pokrývajúci členstvo, účasť, obsah, darovanie, správy a doing | 8084 | Samostatná databáza MySQL pre každý modul (spolu 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend pre Lessons.church | -- | Jediná databáza MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Nástroj na dotazy poháňaný umelou inteligenciou OpenAI | -- | -- |

:::info
Hlavný projekt **Api** je modulárny monolit. Každý modul (členstvo, účasť, obsah, darovanie, správy, doing) má vlastnú databázu a je dostupný na podceste, napríklad `/membership` alebo `/giving`. V produkčnom prostredí sú tieto moduly sprístupnené ako samostatné funkcie Lambda za API Gateway.
:::

## Webové aplikácie

| Projekt | Framework | Vývojový port | Účel |
|---------|-----------|---------------|------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Správny panel na správu cirkvi |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Verejná aplikácia pre členov cirkvi |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend pre Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Nástroj na import a export údajov |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statický | -- | Statické webové stránky cirkví typu brožúra |

## Mobilné aplikácie

Všetky mobilné aplikácie používajú React Native s Expo.

| Projekt | Účel | Kľúčové verzie |
|---------|------|----------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Aplikácia kiosku na prihlasovanie | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Zobrazenie lekcií na Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Prehrávanie obsahu (vrátane TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobilné diaľkové ovládanie pre FreeShow | Expo |

## Desktop

| Projekt | Technológie | Účel |
|---------|-------------|------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Prezentačný a bohoslužobný softvér |

## Zdieľané knižnice

Zdieľaný kód je publikovaný na npm v rozsahu `@churchapps` a projekty uvedené vyššie ho používajú ako bežné npm závislosti. Všetky zdieľané balíky sa nachádzajú v jedinom repozitári – [Packages](https://github.com/ChurchApps/Packages) – ktorý je spravovaný ako Yarn workspace a vydávaný pomocou changesets.

| Balík | Účel | Používa ho |
|-------|------|------------|
| `@churchapps/helpers` | Základné pomocné nástroje a zdieľané TypeScript rozhrania (DateHelper, ApiHelper, CurrencyHelper a ďalšie) | Všetky projekty |
| `@churchapps/apihelper` | Pomocné nástroje pre Express server (autentifikácia, základné kontroléry, prístup k databáze, integrácie s AWS) | Všetky API |
| `@churchapps/apphelper` | Knižnica React komponentov s podmodulmi pre prihlásenie, dary, formuláre, markdown a tvorbu webových stránok | Všetky webové aplikácie |
| `@churchapps/content-providers` | Abstrakcia poskytovateľov externého obsahu (Lessons.church, Planning Center, Dropbox a ďalší) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Nástroj na integrácie s B1.church: webhooky, REST klient, OAuth | Externí vývojári integrácií |
| `@churchapps/texting` | Abstrakcia poskytovateľov SMS | Api |

Informácie o nastavení workspace a postupe vydávania nájdete v časti [Zdieľané knižnice](../shared-libraries/index.md).

## Vzťahy medzi projektmi

```
Frontend aplikácie         Zdieľané knižnice         Backend API
------------------         ------------------        -----------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Všetky frontend aplikácie závisia od `@churchapps/helpers`. Webové aplikácie navyše závisia od balíkov `@churchapps/apphelper`. Všetky backend API závisia od `@churchapps/helpers` aj `@churchapps/apihelper`.

## Ďalšie kroky

- **[Premenné prostredia](./environment-variables.md)** -- Nakonfigurujte svoje súbory `.env` na pripojenie k API
- **[Lokálne nastavenie API](../api/local-setup.md)** -- Nastavte backendové API lokálne
