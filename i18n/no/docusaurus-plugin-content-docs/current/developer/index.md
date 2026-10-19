---
title: "Utviklerdokumentasjon"
---

# Utviklerdokumentasjon

<div class="article-intro">

ChurchApps er en samling av omtrent 20 åpen kildekode-prosjekter som sammen utgjør en komplett plattform for menighetsadministrasjon. Prosjektene spenner over backend-API-er, webapper, mobilapper, et skrivebordsprogram og delte biblioteker – alt skrevet i TypeScript. Denne delen gir deg alt du trenger for å sette opp et lokalt utviklingsmiljø og begynne å bidra.

</div>

## Arkitektur i korte trekk

Prosjektene er **uavhengige repositorier** (ikke et monorepo). Delt kode publiseres til npm under `@churchapps/*`-scopet og brukes som vanlige avhengigheter. Det betyr at du kan jobbe med ett enkelt prosjekt uten å klone hele økosystemet.

Viktige kjennetegn:

- **Språk:** TypeScript gjennomgående
- **Backend:** Node.js / Express-API-er deployet til AWS Lambda via Serverless Framework
- **Web:** React 19 (Vite og Next.js), Material-UI 7
- **Mobil:** React Native med Expo
- **Database:** MySQL 8.0, én database per API-modul

## Hva denne delen dekker

- **[Oppsett](setup/)** – Lokalt utviklingsmiljø, forutsetninger og konfigurasjon
  - [Forutsetninger](setup/prerequisites) – Nødvendige verktøy og programvare
  - [Prosjektoversikt](setup/project-overview) – Alle prosjekter samlet
  - [Miljøvariabler](setup/environment-variables) – Konfigurere `.env`-filer
- **[API](api/)** – Lokalt oppsett av kjerne-API-et, databaseinitialisering og modulstruktur
- **[Webapper](web-apps/)** – Kjøre B1Admin, B1App og LessonsApp lokalt
- **[Mobilapper](mobile/)** – Bygge B1Mobile og andre Expo-apper
- **[Delte biblioteker](shared-libraries/)** – Arbeide med Helpers, ApiHelper og AppHelper
- **[Utrulling](deployment/)** – Deploye API-er, webapper og mobilapper
- **[FreePlay-innholdsleverandør](freeplay-content-provider)** – Integrere leksjonsbiblioteket ditt med FreePlay

## Fellesskap og ressurser

| Ressurs | Lenke |
|----------|------|
| GitHub-organisasjon | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Saksliste | [ChurchAppsSupport-saker](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-fellesskap | [Bli med i Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Den raskeste måten å begynne å bidra på er å velge en webapp (som B1Admin), peke den mot de delte **demo-API-ene**, og begynne å gjøre frontend-endringer. Ingen database- eller API-oppsett kreves.
:::
