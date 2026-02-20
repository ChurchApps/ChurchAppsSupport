---
title: "Utviklerdokumentasjon"
---

# Utviklerdokumentasjon

<div class="article-intro">

ChurchApps er en samling av omtrent 20 åpen kildekode-prosjekter som sammen utgjør en komplett plattform for kirkeadministrasjon. Prosjektene spenner over backend-API-er, webapplikasjoner, mobilapper, en skrivebordsapplikasjon og delte biblioteker -- alle skrevet i TypeScript. Denne seksjonen gir deg alt du trenger for å sette opp et lokalt utviklingsmiljø og begynne å bidra.

</div>

## Arkitektur i et nøtteskall

Prosjektene er **uavhengige repositorier** (ikke et monorepo). Delt kode publiseres til npm under `@churchapps/*`-scope og konsumeres som vanlige avhengigheter. Dette betyr at du kan jobbe på et enkelt prosjekt uten å klone hele økosystemet.

Hovedegenskaper:

- **Språk:** TypeScript gjennomgående
- **Backend:** Node.js / Express API-er distribuert til AWS Lambda via Serverless Framework
- **Web:** React 19 (Vite og Next.js), Material-UI 7
- **Mobil:** React Native med Expo
- **Database:** MySQL 8.0, én database per API-modul

## Hva denne seksjonen dekker

- **[Oppsett](setup/)** -- Lokalt utviklingsmiljø, forutsetninger og konfigurasjon
  - [Forutsetninger](setup/prerequisites) -- Nødvendige verktøy og programvare
  - [Prosjektoversikt](setup/project-overview) -- Alle prosjekter i en oversikt
  - [Miljøvariabler](setup/environment-variables) -- Konfigurering av `.env`-filer
- **[API](api/)** -- Lokalt oppsett av kjerne-API, databaseinitialisering og modulstruktur
- **[Webapper](web-apps/)** -- Kjøring av B1Admin, B1App og LessonsApp lokalt
- **[Mobilapper](mobile/)** -- Bygging av B1Mobile og andre Expo-apper
- **[Delte biblioteker](shared-libraries/)** -- Arbeid med Helpers, ApiHelper og AppHelper
- **[Distribusjon](deployment/)** -- Distribusjon av API-er, webapper og mobilapper

## Fellesskap og ressurser

| Ressurs | Lenke |
|----------|------|
| GitHub-organisasjon | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Feilsporing | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-fellesskap | [Bli med på Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Den raskeste måten å begynne å bidra på er å velge en webapp (som B1Admin), peke den mot **staging-API-ene**, og begynne å gjøre frontend-endringer. Ingen database- eller API-oppsett kreves.
:::
