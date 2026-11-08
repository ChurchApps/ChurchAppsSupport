---
title: "Utviklerdokumentasjon"
description: "Finn frem i ChurchApps utviklerdokumentasjon: lokalt oppsett, API- og webapp-veiledninger, delte biblioteker, mobilbygg og distribusjon for prosjektene med åpen kildekode."
---

# Utviklerdokumentasjon

<div class="article-intro">

ChurchApps er en samling på omtrent 20 prosjekter med åpen kildekode som til sammen utgjør en komplett plattform for menighetsadministrasjon. Prosjektene omfatter backend-API-er, webapplikasjoner, mobilapper, et skrivebordsprogram og delte biblioteker, alt skrevet i TypeScript. Denne delen inneholder alt du trenger for å sette opp et lokalt utviklingsmiljø og begynne å bidra.

</div>

## Arkitektur i korte trekk

Prosjektene er **uavhengige repositorier** (ikke et monorepo). Delt kode publiseres til npm under `@churchapps/*`-scopet og brukes som vanlige avhengigheter. Det betyr at du kan jobbe med ett enkelt prosjekt uten å klone hele økosystemet.

Viktige kjennetegn:

- **Språk:** TypeScript gjennomgående
- **Backend:** Node.js / Express-API-er distribuert til AWS Lambda via Serverless Framework
- **Web:** React 19 (Vite og Next.js), Material-UI 7
- **Mobil:** React Native med Expo
- **Database:** MySQL 8.0, én database per API-modul

## Hva denne delen dekker

- **[Oppsett](./setup/index.md)** -- Lokalt utviklingsmiljø, forutsetninger og konfigurasjon
  - [Forutsetninger](./setup/prerequisites.md) -- Nødvendige verktøy og programvare
  - [Prosjektoversikt](./setup/project-overview.md) -- Alle prosjekter i oversikt
  - [Miljøvariabler](./setup/environment-variables.md) -- Konfigurering av `.env`-filer
- **[API](./api/index.md)** -- Lokalt oppsett av kjerne-API, databaseinitialisering og modulstruktur
- **[Webapper](./web-apps/index.md)** -- Kjøre B1Admin, B1App og LessonsApp lokalt
- **[Mobilapper](./mobile/index.md)** -- Bygge B1Checkin og andre Expo-apper
- **[Delte biblioteker](./shared-libraries/index.md)** -- Arbeide med Helpers, ApiHelper og AppHelper
- **[Distribusjon](./deployment/index.md)** -- Distribuere API-er, webapper og mobilapper
- **[FreePlay-innholdsleverandør](./freeplay-content-provider.md)** -- Integrere leksjonsbiblioteket ditt med FreePlay

## Fellesskap og ressurser

| Ressurs | Lenke |
|----------|------|
| GitHub-organisasjon | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Saksliste | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-fellesskap | [Bli med i Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Den raskeste måten å begynne å bidra på er å velge en webapp (som B1Admin), koble den til de delte **demo-API-ene**, og begynne å gjøre endringer i frontend. Ingen database- eller API-oppsett kreves.
:::
