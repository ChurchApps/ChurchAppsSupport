---
title: "Prosjektoversikt"
---

# Prosjektoversikt

<div class="article-intro">

ChurchApps består av omtrent 20 uavhengige repositorier, hver publisert under [ChurchApps GitHub-organisasjonen](https://github.com/ChurchApps). Denne siden gir en fullstendig oversikt over alle prosjekter organisert etter kategori, sammen med rammeverkene, portene og relasjonene deres.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer [forutsetningene](./prerequisites) for prosjektkategorien du vil jobbe med

</div>

## Backend-API-er

Alle API-er er bygget med Node.js, Express og TypeScript, og distribueres til AWS Lambda via Serverless Framework.

| Prosjekt | Formål | Utviklingsport | Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Kjerne-modulær monolitt som dekker membership, attendance, content, giving, messaging og doing | 8084 | Separat MySQL-database per modul (6 totalt) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend for Lessons.church | -- | Enkelt `lessons`-MySQL-database |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI-spørreverktøy drevet av OpenAI | -- | -- |

:::info
Kjerne-**Api**-prosjektet er en modulær monolitt. Hver modul (membership, attendance, content, giving, messaging, doing) har sin egen database og er tilgjengelig på en delsti som `/membership` eller `/giving`. I produksjon eksponeres disse som separate Lambda-funksjoner bak API Gateway.
:::

## Nettapper

| Prosjekt | Rammeverk | Utviklingsport | Formål |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Administrasjonsdashbord for kirken |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Offentlig medlemsapp for kirken |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend for Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Verktøy for dataimport/-eksport |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statisk | -- | Statiske brosjyrenettsteder for kirker |

## Mobilapper

Alle mobilapper bruker React Native med Expo.

| Prosjekt | Formål | Nøkkelversjoner |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Kirkemedlemsapp for iOS og Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Innsjekkingskiosk-app | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Leksjonsvisning for Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Innholdsavspilling (inkludert TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobil fjernkontroll for FreeShow | Expo |

## Skrivebord

| Prosjekt | Stack | Formål |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Presentasjons- og gudstjenesteprogramvare |

## Delte biblioteker

Delt kode publiseres til npm under `@churchapps`-omfanget, og konsumeres som vanlige npm-avhengigheter av prosjektene ovenfor. Alle delte pakker bor i ett enkelt repositorium -- [Packages](https://github.com/ChurchApps/Packages) -- administrert som et Yarn-arbeidsområde og utgitt med changesets.

| Pakke | Formål | Brukt av |
|---------|---------|---------|
| `@churchapps/helpers` | Grunnleggende verktøy og delte TypeScript-grensesnitt (DateHelper, ApiHelper, CurrencyHelper, osv.) | Alle prosjekter |
| `@churchapps/apihelper` | Express-serververktøy (autentisering, basiskontrollere, databasetilgang, AWS-integrasjoner) | Alle API-er |
| `@churchapps/apphelper` | React-komponentbibliotek med delsti-moduler for innlogging, donasjoner, skjemaer, markdown og nettstedsbygging | Alle nettapper |
| `@churchapps/content-providers` | Abstraksjon for tredjeparts innholdsleverandører (Lessons.church, Planning Center, Dropbox, og andre) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church-integrasjonsverktøy: webhooks, REST-klient, OAuth | Eksterne integrasjonsutviklere |
| `@churchapps/texting` | Abstraksjon for SMS-leverandører | Api |

Se [Delte biblioteker](../shared-libraries/) for arbeidsområdeoppsett og utgivelsesarbeidsflyt.

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

Alle frontend-apper avhenger av `@churchapps/helpers`. Nettapper avhenger i tillegg av `@churchapps/apphelper`-pakkene. Alle backend-API-er avhenger av både `@churchapps/helpers` og `@churchapps/apihelper`.

## Neste steg

- **[Miljøvariabler](./environment-variables)** -- Konfigurer `.env`-filene dine for å koble til API-er
- **[Lokalt API-oppsett](../api/local-setup)** -- Sett opp backend-API-et lokalt
