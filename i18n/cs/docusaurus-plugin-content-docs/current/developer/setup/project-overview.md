---
title: "Přehled projektu"
description: "Přehled všech repozitářů ChurchApps podle kategorií, včetně frameworků, vývojových portů, databází a způsobu propojení sdílených balíčků @churchapps v dokumentaci k nastavení vývojového prostředí."
---

# Přehled projektu

<div class="article-intro">

ChurchApps se skládá z přibližně 20 nezávislých repozitářů, z nichž každý je publikován v [GitHub organizaci ChurchApps](https://github.com/ChurchApps). Tato stránka obsahuje úplný přehled všech projektů uspořádaných podle kategorií spolu s jejich frameworky, porty a vzájemnými vztahy.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte [předpoklady](./prerequisites.md) pro kategorii projektů, na které chcete pracovat

</div>

## Backend API

Všechna API jsou postavena na Node.js, Expressu a TypeScriptu a jsou nasazována na AWS Lambda pomocí Serverless Frameworku.

| Projekt | Účel | Vývojový port | Databáze |
|---------|------|---------------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Hlavní modulární monolit pokrývající členství, docházku, obsah, dary, zprávy a úkoly | 8084 | Samostatná databáze MySQL pro každý modul (celkem 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend pro Lessons.church | -- | Jediná databáze MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Nástroj pro dotazy s umělou inteligencí založený na OpenAI | -- | -- |

:::info
Hlavní projekt **Api** je modulární monolit. Každý modul (členství, docházka, obsah, dary, zprávy, úkoly) má vlastní databázi a je dostupný na podcestě, například `/membership` nebo `/giving`. V produkčním prostředí jsou tyto moduly vystaveny jako samostatné funkce Lambda za službou API Gateway.
:::

## Webové aplikace

| Projekt | Framework | Vývojový port | Účel |
|---------|-----------|---------------|------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Administrační řídicí panel církve |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Veřejná aplikace pro členy církve |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend pro Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Nástroj pro import a export dat |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statický | -- | Statické propagační webové stránky církví |

## Mobilní aplikace

Všechny mobilní aplikace používají React Native s Expo.

| Projekt | Účel | Klíčové verze |
|---------|------|---------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Aplikace kiosku pro check-in | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Zobrazení lekcí na Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Přehrávání obsahu (včetně TV systémů) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobilní dálkové ovládání pro FreeShow | Expo |

## Desktop

| Projekt | Technologie | Účel |
|---------|-------------|------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software pro prezentace a bohoslužby |

## Sdílené knihovny

Sdílený kód je publikován na npm pod oborem `@churchapps` a výše uvedené projekty jej používají jako běžné npm závislosti. Všechny sdílené balíčky jsou umístěny v jediném repozitáři – [Packages](https://github.com/ChurchApps/Packages) – který je spravován jako pracovní prostor Yarn a vydáván pomocí changesets.

| Balíček | Účel | Používá |
|---------|------|---------|
| `@churchapps/helpers` | Základní pomocné funkce a sdílená rozhraní TypeScriptu (DateHelper, ApiHelper, CurrencyHelper a další) | Všechny projekty |
| `@churchapps/apihelper` | Pomocné nástroje pro server Express (autentizace, základní kontrolery, přístup k databázi, integrace s AWS) | Všechna API |
| `@churchapps/apphelper` | Knihovna komponent React s podmoduly pro přihlášení, dary, formuláře, markdown a tvorbu webových stránek | Všechny webové aplikace |
| `@churchapps/content-providers` | Abstrakce poskytovatelů obsahu třetích stran (Lessons.church, Planning Center, Dropbox a další) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Sada nástrojů pro integrace B1.church: webhooky, klient REST, OAuth | Externí vývojáři integrací |
| `@churchapps/texting` | Abstrakce poskytovatelů SMS | Api |

Nastavení pracovního prostoru a postup vydávání najdete v části [Sdílené knihovny](../shared-libraries/index.md).

## Vztahy mezi projekty

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Všechny frontendové aplikace závisí na `@churchapps/helpers`. Webové aplikace navíc závisí na balíčcích `@churchapps/apphelper`. Všechna backendová API závisí na `@churchapps/helpers` i `@churchapps/apihelper`.

## Další kroky

- **[Proměnné prostředí](./environment-variables.md)** -- Nastavte soubory `.env` pro připojení k API
- **[Lokální nastavení API](../api/local-setup.md)** -- Nastavte backendové API lokálně
