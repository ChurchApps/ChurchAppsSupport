---
title: "Prosjektoversikt"
---

# Prosjektoversikt

<div class="article-intro">

ChurchApps består av omtrent 20 uavhengige repositorier, hver publisert under [ChurchApps GitHub-organisasjonen](https://github.com/ChurchApps). Denne siden gir en komplett oversikt over alle prosjekter organisert etter kategori, sammen med deres rammeverk, porter og relasjoner.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer [forutsetningene](./prerequisites) for prosjektkategorien du vil arbeide med

</div>

## Backend-APIer

Alle APIer bygges med Node.js, Express og TypeScript og distribueres til AWS Lambda via Serverless Framework.

| Prosjekt | Formål | Dev-port | Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Kjernmodul monolitt som dekker medlemskap, oppmøte, innhold, giver, meldinger og gjøremål | 8084 | Separat MySQL-database per modul (6 totalt) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church backend | -- | Enkelt `lessons` MySQL-database |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI-spørsmålverktøy drevet av OpenAI | -- | -- |

:::info
Kjerne **Api**-prosjektet er en modulær monolitt. Hver modul (medlemskap, oppmøte, innhold, giver, meldinger, gjøremål) har sin egen database og er tilgjengelig på en delsti som `/membership` eller `/giving`. I produksjon eksponeres disse som separate Lambda-funksjoner bak API Gateway.
:::

## Nettapper

| Prosjekt | Rammeverk | Dev-port | Formål |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Kirkadministrasjonsdashbord |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Offentlig kirkemedlemsapp |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church frontend |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Data import/eksportverktøy |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statisk | -- | Statiske kirkebrosjorenettsted |

## Mobilapper

Alle mobilapper bruker React Native med Expo.

| Prosjekt | Formål | Nøkkelversjoner |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Kirkemeldingsapp for iOS og Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Sjekkinn-kioskapp | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV-leksjonsvisning | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Innholdsavspilling (inkludert TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobilfjernkontroll for FreeShow | Expo |

## Skrivebord

| Prosjekt | Stakk | Formål |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Presentasjons- og adorasjonsprogramvare |

## Delte biblioteker

Delt kode publiseres til npm under `@churchapps`-omfanget og forbrukes som vanlige npm-avhengigheter av prosjektene ovenfor. Alle delte pakker bor i ett enkelt repository -- [Packages](https://github.com/ChurchApps/Packages) -- administrert som Yarn-arbeidsområde og utgitt med changesets.

| Pakke | Formål | Brukt av |
|---------|---------|---------|
| `@churchapps/helpers` | Grunnleggende verktøy og delte TypeScript-grensesnitt (DateHelper, ApiHelper, CurrencyHelper, osv.) | Alle prosjekter |
| `@churchapps/apihelper` | Express-serververktøy (auth, basisontroller, databaseadgang, AWS-integrasjoner) | Alle APIer |
| `@churchapps/apphelper` | React-komponentbibliotek med delstiesmoduler for pålogging, donasjoner, skjemaer, markdown og nettstedsbygging | Alle nettapper |
| `@churchapps/content-providers` | Abstrahering av tredjeparts-innholdsleverandør (Lessons.church, Planning Center, Dropbox og andre) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church integrasjonsverktøy: webhooks, REST-klient, OAuth | Eksterne integrasjonsutviklere |
| `@churchapps/texting` | SMS-leverandørabstrahering | Api |

Se [Delte biblioteker](../shared-libraries/) for arbeidsområdeoppsett og frigjøringsarbeidsflyt.

## Prosjektrelasjoner

```
Frontend-apper              Delte biblioteker           Backend-APIer
--------------              ----------------            -----------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Alle frontend-apper avhenger av `@churchapps/helpers`. Nettapper avhenger i tillegg av `@churchapps/apphelper`-pakker. Alle backend-APIer avhenger av både `@churchapps/helpers` og `@churchapps/apihelper`.

## Neste trinn

- **[Miljøvariabler](./environment-variables)** -- Konfigurer dine `.env`-filer for å koble til APIer
- **[API lokalt oppsett](../api/local-setup)** -- Sett opp backend-API lokalt
