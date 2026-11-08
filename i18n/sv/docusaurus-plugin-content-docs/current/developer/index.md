---
title: "Utvecklardokumentation"
description: "Hitta rätt i ChurchApps utvecklardokumentation: lokal installation, guider för API och webbappar, delade bibliotek, mobilbyggen och driftsättning för de open source-projekten."
---

# Utvecklardokumentation

<div class="article-intro">

ChurchApps är en samling på cirka 20 open source-projekt som tillsammans utgör en komplett plattform för kyrkoadministration. Projekten omfattar backend-API:er, webbappar, mobilappar, en skrivbordsapplikation och delade bibliotek -- allt skrivet i TypeScript. Det här avsnittet innehåller allt du behöver för att sätta upp en lokal utvecklingsmiljö och börja bidra.

</div>

## Arkitektur i korthet

Projekten är **separata repositorier** (inte en monorepo). Delad kod publiceras till npm under paketnamnsrymden `@churchapps/*` och används som vanliga beroenden. Det innebär att du kan arbeta med ett enskilt projekt utan att klona hela ekosystemet.

Viktiga egenskaper:

- **Språk:** TypeScript genomgående
- **Backend:** Node.js / Express-API:er som driftsätts på AWS Lambda via Serverless Framework
- **Webb:** React 19 (Vite och Next.js), Material-UI 7
- **Mobil:** React Native med Expo
- **Databas:** MySQL 8.0, en databas per API-modul

## Vad avsnittet omfattar

- **[Installation](./setup/index.md)** -- Lokal utvecklingsmiljö, förutsättningar och konfiguration
  - [Förutsättningar](./setup/prerequisites.md) -- Nödvändiga verktyg och programvara
  - [Projektöversikt](./setup/project-overview.md) -- Alla projekt i korthet
  - [Miljövariabler](./setup/environment-variables.md) -- Konfigurera `.env`-filer
- **[API](./api/index.md)** -- Lokal installation av kärn-API:et, databasinitiering och modulstruktur
- **[Webbappar](./web-apps/index.md)** -- Köra B1Admin, B1App och LessonsApp lokalt
- **[Mobilappar](./mobile/index.md)** -- Bygga B1Checkin och andra Expo-appar
- **[Delade bibliotek](./shared-libraries/index.md)** -- Arbeta med Helpers, ApiHelper och AppHelper
- **[Driftsättning](./deployment/index.md)** -- Driftsätta API:er, webbappar och mobilappar
- **[FreePlay-innehållsleverantör](./freeplay-content-provider.md)** -- Integrera ditt lektionsbibliotek med FreePlay

## Community och resurser

| Resurs | Länk |
|----------|------|
| Organisation på GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Ärendehantering | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-community | [Gå med i Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Det snabbaste sättet att börja bidra är att välja en webbapp (till exempel B1Admin), peka den mot de delade **demo-API:erna** och börja göra ändringar i frontend. Ingen databas eller API-installation krävs.
:::
