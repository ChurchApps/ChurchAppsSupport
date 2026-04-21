---
title: "Documentatie voor ontwikkelaars"
---

# Documentatie voor ontwikkelaars

<div class="article-intro">

ChurchApps is een verzameling van ongeveer 20 open-source projecten die samen een compleet kerkbeheersysteem bieden. De projecten omvatten backend API's, webtoepassingen, mobiele apps, een desktopaplicatie en gedeelde bibliotheken -- allemaal geschreven in TypeScript. Dit gedeelte biedt alles wat u nodig hebt om een lokale ontwikkelingsomgeving in te stellen en bij te dragen.

</div>

## Architectuur in een oogopslag

De projecten zijn **onafhankelijke repositories** (geen monorepo). Gedeelde code wordt naar npm onder het bereik `@churchapps/*` gepubliceerd en gebruikt als normale afhankelijkheden. Dit betekent dat u aan één project kunt werken zonder het hele ecosysteem te klonen.

Belangrijke kenmerken:

- **Taal:** TypeScript overal
- **Backend:** Node.js / Express-API's geïmplementeerd op AWS Lambda via Serverless Framework
- **Web:** React 19 (Vite en Next.js), Material-UI 7
- **Mobiel:** React Native met Expo
- **Database:** MySQL 8.0, één database per API-module

## Wat dit gedeelte behandelt

- **[Instellen](setup/)** -- Lokale ontwikkelingsomgeving, vereisten en configuratie
  - [Vereisten](setup/prerequisites) -- Vereiste tools en software
  - [Projectoverzicht](setup/project-overview) -- Alle projecten in een oogopslag
  - [Omgevingsvariabelen](setup/environment-variables) -- Configuratie van `.env` bestanden
- **[API](api/)** -- Lokale API-instellingen, databaseinitialisatie en modulearchitectuur
- **[Webtoepassingen](web-apps/)** -- B1Admin, B1App en LessonsApp lokaal uitvoeren
- **[Mobiele apps](mobile/)** -- Expo-apps als B1Mobile bouwen
- **[Gedeelde bibliotheken](shared-libraries/)** -- Werken met Helpers, ApiHelper en AppHelper
- **[Implementatie](deployment/)** -- API's, webtoepassingen en mobiele apps implementeren

## Gemeenschap en hulpbronnen

| Hulpbron | Link |
|----------|------|
| GitHub-organisatie | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Tracker voor problemen | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-gemeenschap | [Join Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
De snelste manier om bij te dragen is door een webtoepassing (zoals B1Admin) te kiezen, deze naar de **staging API's** te wijzen en frontend-wijzigingen aan te brengen. Geen database- of API-instellingen vereist.
:::
