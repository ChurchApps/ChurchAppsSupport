---
title: "Přehled projektu"
description: "Přehled repozitářů ChurchApps podle kategorie: frameworky, porty, databáze a způsob propojení sdílených balíčků @churchapps v dokumentaci k nastavení."
---

# Přehled projektu

<div class="article-intro">

ChurchApps se skládá z přibližně 20 nezávislých repozitářů, každý je zveřejněn v [organizaci ChurchApps na GitHubu](https://github.com/ChurchApps). Tato stránka poskytuje úplný přehled všech projektů seřazených podle kategorií, včetně jejich frameworků, portů a vzájemných vztahů.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte [předpoklady](./prerequisites.md) pro kategorii projektů, na které chcete pracovat

</div>

## Backendová API

Všechna API jsou postavena na Node.js, Express a TypeScriptu a nasazují se na AWS Lambda pomocí Serverless Frameworku.

| Projekt | Účel | Vývojový port | Databáze |
|---------|------|---------------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Hlavní modulární monolit pokrývající členství, docházku, obsah, dary, zprávy a služby | 8084 | Samostatná databáze MySQL pro každý modul (celkem 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend pro Lessons.church | -- | Jediná databáze MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Nástroj pro dotazy s umělou inteligencí poháněný OpenAI | -- | -- |

:::info
Hlavní projekt **Api** je modulární monolit. Každý modul (členství, docházka, obsah, dary, zprávy, služby) má vlastní databázi a je dostupný na podcestě, například `/membership` nebo `/giving`. V produkčním prostředí jsou tyto moduly zpřístupněny jako samostatné funkce Lambda za API Gateway.
:::

## Webové aplikace

| Projekt | Framework | Vývojový port | Účel |
|---------|-----------|---------------|------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Administrativní panel církve |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Veřejně přístupná aplikace pro členy církve |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend pro Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Nástroj pro import a export dat |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statické | -- | Statické brožurové webové stránky církví |

## Mobilní aplikace

Všechny mobilní aplikace používají React Native s Expo.

| Projekt | Účel | Klíčové verze |
|---------|------|---------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Aplikace pro členy církve pro iOS a Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Kiosková aplikace pro přihlašování | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Zobrazení lekcí na Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Přehrávání obsahu (včetně TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobilní dálkové ovládání pro FreeShow | Expo |

## Desktop

| Projekt | Technologie | Účel |
|---------|-------------|------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software pro prezentace a bohoslužby |

## Sdílené knihovny

Sdílený kód je publikován na npm pod oborem `@churchapps` a výše uvedené projekty ho používají jako běžné npm závislosti. Všechny sdílené balíčky se nacházejí v jediném repozitáři [Packages](https://github.com/ChurchApps/Packages), spravovaném jako Yarn workspace a vydávaném pomocí changesets.

| Balíček | Účel | Používá |
|---------|------|---------|
| `@churchapps/helpers` | Základní pomocné funkce a sdílená TypeScript rozhraní (DateHelper, ApiHelper, CurrencyHelper atd.) | Všechny projekty |
| `@churchapps/apihelper` | Pomocné nástroje pro Express server (autentizace, základní kontrolery, přístup k databázi, integrace s AWS) | Všechna API |
| `@churchapps/apphelper` | Knihovna komponent React s podmoduly pro přihlašování, dary, formuláře, markdown a tvorbu webů | Všechny webové aplikace |
| `@churchapps/content-providers` | Abstrakce poskytovatelů obsahu třetích stran (Lessons.church, Planning Center, Dropbox a další) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Sada nástrojů pro integrace B1.church: webhooky, REST klient, OAuth | Vývojáři externích integrací |
| `@churchapps/texting` | Abstrakce poskytovatelů SMS | Api |

Nastavení workspace a postup vydávání najdete v části [Sdílené knihovny](../shared-libraries/index.md).

## Vztahy mezi projekty

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Všechny frontendové aplikace závisí na `@churchapps/helpers`. Webové aplikace navíc závisí na balíčcích `@churchapps/apphelper`. Všechna backendová API závisí na `@churchapps/helpers` i `@churchapps/apihelper`.

## Další kroky

- **[Proměnné prostředí](./environment-variables.md)** -- Nastavte soubory `.env` pro připojení k API
- **[Lokální nastavení API](../api/local-setup.md)** -- Lokální spuštění backendového API
