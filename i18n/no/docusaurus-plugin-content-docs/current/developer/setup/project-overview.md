---
title: "Prosjektoversikt"
---

# Prosjektoversikt

<div class="article-intro">

ChurchApps består av omtrent 20 uavhengige repositorier, alle publisert under [ChurchApps GitHub-organisasjonen](https://github.com/ChurchApps). Denne siden gir en komplett oversikt over alle prosjekter organisert etter kategori, sammen med deres rammeverk, porter og relasjoner.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer [forutsetningene](./prerequisites) for prosjektkategorien du vil jobbe med

</div>

## Backend-API-er

Alle API-er er bygget med Node.js, Express og TypeScript, og distribueres til AWS Lambda via Serverless Framework.

| Prosjekt | Formål | Dev-port | Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Kjerne modulær monolitt som dekker membership, attendance, content, giving, messaging og doing | 8084 | Separat MySQL-database per modul (6 totalt) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church backend | -- | Enkel `lessons` MySQL-database |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI-spørringsverktøy drevet av OpenAI | -- | -- |

:::info
Kjerne-**Api**-prosjektet er en modulær monolitt. Hver modul (membership, attendance, content, giving, messaging, doing) har sin egen database og er tilgjengelig på en understi som `/membership` eller `/giving`. I produksjon eksponeres disse som separate Lambda-funksjoner bak API Gateway.
:::

## Webapper

| Prosjekt | Rammeverk | Dev-port | Formål |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | Dashboard for kirkeadministrasjon |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Offentlig app for kirkemedlemmer |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church frontend |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Verktøy for dataimport/-eksport |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | Statiske brosjyrenettsteder for kirker |

## Mobilapper

Alle mobilapper bruker React Native med Expo.

| Prosjekt | Formål | Nøkkelversjoner |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Kirkemedlemsapp for iOS og Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Kiosk-app for innsjekking | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV-visning av leksjoner | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Innholdsavspilling (inkludert TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobil fjernkontroll for FreeShow | Expo |

## Skrivebord

| Prosjekt | Stack | Formål |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Presentasjons- og gudstjenesteprogramvare |

## Delte biblioteker

Delt kode publiseres til npm under `@churchapps`-scope. Disse konsumeres som vanlige npm-avhengigheter av prosjektene ovenfor.

| Pakke | npm-navn | Formål | Brukt av |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | Basisverktøy (DateHelper, ApiHelper, CurrencyHelper, osv.) | Alle prosjekter |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Express-serververktøy (auth middleware, DB-hjelpere, AWS-integrasjon) | Alle API-er |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | Workspace med 6 pakker | React-komponentbibliotek | Alle webapper |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | YouTube, Vimeo og lokale innholdsleverandører | FreeShow, FreePlay, Api |

### AppHelper underpakker

AppHelper-prosjektet er et monorepo-workspace som publiserer seks pakker:

| Pakke | npm-navn |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## Prosjektrelasjoner

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Alle frontend-apper avhenger av `@churchapps/helpers`. Webapper avhenger i tillegg av `@churchapps/apphelper`-pakkene. Alle backend-API-er avhenger av både `@churchapps/helpers` og `@churchapps/apihelper`.

## Neste steg

- **[Miljøvariabler](./environment-variables)** -- Konfigurer `.env`-filene dine for å koble til API-ene
- **[Lokalt API-oppsett](../api/local-setup)** -- Sett opp backend-API-et lokalt
