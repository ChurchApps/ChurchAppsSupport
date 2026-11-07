---
title: "Utvecklardokumentation"
---

# Utvecklardokumentation

<div class="article-intro">

ChurchApps är en samling av cirka 20 projekt med öppen källkod som tillsammans utgör en komplett plattform för kyrkoadministration. Projekten omfattar backend-API:er, webbappar, mobilappar, ett skrivbordsprogram och delade bibliotek, allt skrivet i TypeScript. Det här avsnittet innehåller allt du behöver för att konfigurera en lokal utvecklingsmiljö och börja bidra.

</div>

## Arkitekturen i korthet

Projekten är **självständiga repositorier** (inte en monorepo). Delad kod publiceras till npm under paketnamnsrymden `@churchapps/*` och används som vanliga beroenden. Det innebär att du kan arbeta med ett enskilt projekt utan att klona hela ekosystemet.

Viktiga egenskaper:

- **Språk:** TypeScript genomgående
- **Backend:** Node.js / Express-API:er som driftsätts på AWS Lambda via Serverless Framework
- **Webb:** React 19 (Vite och Next.js), Material-UI 7
- **Mobil:** React Native med Expo
- **Databas:** MySQL 8.0, en databas per API-modul

## Vad det här avsnittet omfattar

- **[Installation](setup/)** -- Lokal utvecklingsmiljö, förutsättningar och konfiguration
  - [Förutsättningar](setup/prerequisites) -- Nödvändiga verktyg och programvara
  - [Projektöversikt](setup/project-overview) -- Alla projekt i korthet
  - [Miljövariabler](setup/environment-variables) -- Konfigurera `.env`-filer
- **[API](api/)** -- Lokal installation av kärn-API:et, databasinitiering och modulstruktur
- **[Webbappar](web-apps/)** -- Köra B1Admin, B1App och LessonsApp lokalt
- **[Mobilappar](mobile/)** -- Bygga B1Mobile och andra Expo-appar
- **[Delade bibliotek](shared-libraries/)** -- Arbeta med Helpers, ApiHelper och AppHelper
- **[Driftsättning](deployment/)** -- Driftsätta API:er, webbappar och mobilappar
- **[FreePlay-innehållsleverantör](freeplay-content-provider)** -- Integrera ditt lektionsbibliotek med FreePlay

## Gemenskap och resurser

| Resurs | Länk |
|----------|------|
| GitHub-organisation | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Ärendehantering | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-gemenskap | [Gå med i Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Det snabbaste sättet att börja bidra är att välja en webbapp (som B1Admin), peka den mot de delade **demo-API:erna** och börja göra ändringar i frontend. Ingen databas- eller API-konfiguration krävs.
:::
