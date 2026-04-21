---
title: "Udvikler-dokumentation"
---

# Udvikler-dokumentation

<div class="article-intro">

ChurchApps er en samling af cirka 20 open-source-projekter, der sammen leverer en fuldstændig kirkestyringsplatform. Projekterne spænder over backend API'er, webapplikationer, mobilapps, en skrivebordsprogram og delte biblioteker -- alt sammen skrevet i TypeScript. Dette afsnit giver alt, hvad du har brug for til at opsætte et lokalt udvikling miljø og begynde at bidrage.

</div>

## Arkitektur i et øjeblik

Projekterne er **uafhængige lagre** (ikke et monorepo). Delt kode udgives til npm under `@churchapps/*` scope og forbruges som almindelige afhængigheder. Dette betyder, at du kan arbejde på et enkelt projekt uden at klone hele økosystemet.

Vigtige karakteristika:

- **Sprog:** TypeScript gennem hele projektet
- **Backend:** Node.js / Express API'er implementeret til AWS Lambda via Serverless Framework
- **Web:** React 19 (Vite og Next.js), Material-UI 7
- **Mobil:** React Native med Expo
- **Database:** MySQL 8.0, en database pr. API-modul

## Hvad dette afsnit dækker

- **[Setup](setup/)** -- Lokalt udvikling miljø, forudsætninger og konfiguration
  - [Forudsætninger](setup/prerequisites) -- Påkrævet værktøj og software
  - [Projektoversigt](setup/project-overview) -- Alle projekter på et øjeblik
  - [Miljøvariabler](setup/environment-variables) -- Konfigurering af `.env`-filer
- **[API](api/)** -- Kerne API lokalt setup, databaseinitialisering og modulstruktur
- **[Webapps](web-apps/)** -- Kørsel af B1Admin, B1App og LessonsApp lokalt
- **[Mobilapps](mobile/)** -- Byggeri af B1Mobile og andre Expo-apps
- **[Delte biblioteker](shared-libraries/)** -- Arbejde med Helpers, ApiHelper og AppHelper
- **[Installation](deployment/)** -- Installation af API'er, webapps og mobilapps

## Fællesskab og ressourcer

| Ressource | Link |
|----------|------|
| GitHub-organisation | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Problem-tracker | [ChurchAppsSupport-problemer](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-fællesskab | [Slut Slack-gruppe](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Den hurtigste måde at begynde at bidrage på er at vælge en webapp (som B1Admin), pege den på **staging API'erne** og begynde at foretage frontend-ændringer. Ingen database- eller API-setup påkrævet.
:::
