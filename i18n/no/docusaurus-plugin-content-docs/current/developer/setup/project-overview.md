---
title: "Prosjektoversikt"
description: "Oversikt over alle ChurchApps-repositorier etter kategori, med rammeverk, utviklingsporter, databaser og hvordan de delte @churchapps-pakkene henger sammen, i utviklerdokumentasjonen for oppsett."
---

# Prosjektoversikt

<div class="article-intro">

ChurchApps består av omtrent 20 uavhengige repositorier, som hver er publisert under [ChurchApps GitHub-organisasjonen](https://github.com/ChurchApps). Denne siden gir en fullstendig oversikt over alle prosjekter, organisert etter kategori, sammen med rammeverk, porter og relasjoner.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer [forutsetningene](./prerequisites.md) for prosjektkategorien du vil jobbe med

</div>

## Backend-API-er

Alle API-er er bygget med Node.js, Express og TypeScript, og distribueres til AWS Lambda via Serverless Framework.

| Prosjekt | Formål | Utviklingsport | Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Kjernemonolitt med moduler for medlemskap, oppmøte, innhold, gaver, meldinger og oppgaver | 8084 | Egen MySQL-database per modul (6 totalt) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend for Lessons.church | -- | Enkelt `lessons`-MySQL-database |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI-søkeverktøy drevet av OpenAI | -- | -- |

:::info
Kjerneprosjektet **Api** er en modulær monolitt. Hver modul (medlemskap, oppmøte, innhold, gaver, meldinger og oppgaver) har sin egen database og er tilgjengelig på en underbane, for eksempel `/membership` eller `/giving`. I produksjon eksponeres disse som separate Lambda-funksjoner bak API Gateway.
:::

## Webapper

| Prosjekt | Rammeverk | Utviklingsport | Formål |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Administrasjonsdashbord for menigheten |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Offentlig app for menighetsmedlemmer |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend for Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Verktøy for import og eksport av data |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statisk | -- | Statiske brosjyrenettsteder for menigheter |

## Mobilapper

Alle mobilapper bruker React Native med Expo.

| Prosjekt | Formål | Viktige versjoner |
|---------|--------------|---------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Innsjekkingsapp for kiosk | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Visning av leksjoner på Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Avspilling av innhold (inkludert TV-operativsystemer) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobil fjernkontroll for FreeShow | Expo |

## Desktop

| Prosjekt | Stakk | Formål |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Presentasjons- og gudstjenestesoftware |

## Delte biblioteker

Delt kode publiseres til npm under `@churchapps`-scopet og brukes som vanlige npm-avhengigheter av prosjektene ovenfor. Alle delte pakker ligger i ett enkelt repositorium – [Packages](https://github.com/ChurchApps/Packages) – som administreres som et Yarn-arbeidsområde og slippes med changesets.

| Pakke | Formål | Brukes av |
|---------|---------|---------|
| `@churchapps/helpers` | Grunnleggende verktøy og delte TypeScript-grensesnitt (DateHelper, ApiHelper, CurrencyHelper osv.) | Alle prosjekter |
| `@churchapps/apihelper` | Verktøy for Express-server (autentisering, grunnkontrollere, databasetilgang, AWS-integrasjoner) | Alle API-er |
| `@churchapps/apphelper` | React-komponentbibliotek med undermoduler for innlogging, donasjoner, skjemaer, markdown og nettstedbygging | Alle webapper |
| `@churchapps/content-providers` | Abstraksjon for tredjeparts innholdsleverandører (Lessons.church, Planning Center, Dropbox m.fl.) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Verktøykasse for B1.church-integrasjoner: webhooks, REST-klient, OAuth | Eksterne integrasjonsutviklere |
| `@churchapps/texting` | Abstraksjon for SMS-leverandører | Api |

Se [Delte biblioteker](../shared-libraries/index.md) for oppsett av arbeidsområdet og utgivelsesflyten.

## Prosjektrelasjoner

```
Frontend-apper             Delte biblioteker          Backend-API-er
--------------             -----------------          --------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Alle frontend-apper er avhengige av `@churchapps/helpers`. Webapper er i tillegg avhengige av `@churchapps/apphelper`-pakkene. Alle backend-API-er er avhengige av både `@churchapps/helpers` og `@churchapps/apihelper`.

## Neste steg

- **[Miljøvariabler](./environment-variables.md)** -- Konfigurer `.env`-filene dine for å koble til API-ene
- **[Lokalt oppsett av API](../api/local-setup.md)** -- Sett opp backend-API-et lokalt
