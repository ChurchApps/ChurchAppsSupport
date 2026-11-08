---
title: "Udviklerdokumentation"
description: "Find rundt i ChurchApps' udviklerdokumentation: lokal opsætning, guides til API og webapp, delte biblioteker, mobilbygs og udrulning af de open source-projekter."
---

# Udviklerdokumentation

<div class="article-intro">

ChurchApps er en samling af cirka 20 open source-projekter, der til sammen udgør en komplet platform til kirkeadministration. Projekterne omfatter backend-API'er, webapplikationer, mobilapps, et desktopprogram og delte biblioteker -- alle skrevet i TypeScript. Denne sektion indeholder alt, hvad du skal bruge for at opsætte et lokalt udviklingsmiljø og begynde at bidrage.

</div>

## Arkitektur i korte træk

Projekterne er **uafhængige repositories** (ikke et monorepo). Delt kode udgives til npm under `@churchapps/*`-scopet og bruges som almindelige afhængigheder. Det betyder, at du kan arbejde på ét enkelt projekt uden at klone hele økosystemet.

Vigtige kendetegn:

- **Sprog:** TypeScript overalt
- **Backend:** Node.js/Express-API'er, udrullet til AWS Lambda via Serverless Framework
- **Web:** React 19 (Vite og Next.js), Material-UI 7
- **Mobil:** React Native med Expo
- **Database:** MySQL 8.0, én database pr. API-modul

## Hvad denne sektion dækker

- **[Opsætning](./setup/index.md)** -- Lokalt udviklingsmiljø, forudsætninger og konfiguration
  - [Forudsætninger](./setup/prerequisites.md) -- Nødvendige værktøjer og software
  - [Projektoversigt](./setup/project-overview.md) -- Alle projekter i overblik
  - [Miljøvariabler](./setup/environment-variables.md) -- Konfiguration af `.env`-filer
- **[API](./api/index.md)** -- Lokal opsætning af kerne-API'et, initialisering af database og modulstruktur
- **[Webapps](./web-apps/index.md)** -- Sådan kører du B1Admin, B1App og LessonsApp lokalt
- **[Mobilapps](./mobile/index.md)** -- Bygning af B1Checkin og andre Expo-apps
- **[Delte biblioteker](./shared-libraries/index.md)** -- Arbejde med Helpers, ApiHelper og AppHelper
- **[Udrulning](./deployment/index.md)** -- Udrulning af API'er, webapps og mobilapps
- **[FreePlay-indholdsudbyder](./freeplay-content-provider.md)** -- Integration af dit lektionsbibliotek med FreePlay

## Fællesskab og ressourcer

| Ressource | Link |
|----------|------|
| GitHub-organisation | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Issue-tracker | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-fællesskab | [Tilslut dig Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Den hurtigste måde at begynde at bidrage på er at vælge en webapp (f.eks. B1Admin), pege den mod de fælles **demo-API'er** og begynde at lave ændringer i frontend. Der kræves hverken database eller API-opsætning.
:::
