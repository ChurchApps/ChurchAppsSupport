---
title: "Developerdocumentatie"
description: "Vind je weg in de developerdocumentatie van ChurchApps: lokale installatie, handleidingen voor API en webapps, gedeelde bibliotheken, mobiele builds en implementatie voor de open-sourceprojecten."
---

# Developerdocumentatie

<div class="article-intro">

ChurchApps is een verzameling van ongeveer 20 open-sourceprojecten die samen een compleet platform voor kerkbeheer vormen. De projecten omvatten backend-API's, webapplicaties, mobiele apps, een desktopapplicatie en gedeelde bibliotheken -- allemaal geschreven in TypeScript. Deze sectie biedt alles wat je nodig hebt om een lokale ontwikkelomgeving in te richten en te beginnen met bijdragen.

</div>

## Architectuur in een oogopslag

De projecten zijn **onafhankelijke repositories** (geen monorepo). Gedeelde code wordt gepubliceerd naar npm onder de `@churchapps/*`-scope en gebruikt als gewone afhankelijkheden. Dit betekent dat je aan één project kunt werken zonder het hele ecosysteem te klonen.

Belangrijkste kenmerken:

- **Taal:** overal TypeScript
- **Backend:** Node.js / Express-API's, geïmplementeerd op AWS Lambda via het Serverless Framework
- **Web:** React 19 (Vite en Next.js), Material-UI 7
- **Mobiel:** React Native met Expo
- **Database:** MySQL 8.0, één database per API-module

## Wat deze sectie behandelt

- **[Installatie](./setup/index.md)** -- Lokale ontwikkelomgeving, vereisten en configuratie
  - [Vereisten](./setup/prerequisites.md) -- Benodigde tools en software
  - [Projectoverzicht](./setup/project-overview.md) -- Alle projecten in één oogopslag
  - [Omgevingsvariabelen](./setup/environment-variables.md) -- Configureren van `.env`-bestanden
- **[API](./api/index.md)** -- Lokale installatie van de kern-API, initialisatie van de database en modulestructuur
- **[Webapps](./web-apps/index.md)** -- B1Admin, B1App en LessonsApp lokaal uitvoeren
- **[Mobiele apps](./mobile/index.md)** -- B1Checkin en andere Expo-apps bouwen
- **[Gedeelde bibliotheken](./shared-libraries/index.md)** -- Werken met Helpers, ApiHelper en AppHelper
- **[Implementatie](./deployment/index.md)** -- API's, webapps en mobiele apps implementeren
- **[FreePlay Content Provider](./freeplay-content-provider.md)** -- Je lesbibliotheek koppelen aan FreePlay

## Gemeenschap en bronnen

| Bron | Link |
|----------|------|
| GitHub-organisatie | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Issuetracker | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-gemeenschap | [Word lid van Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
De snelste manier om bij te dragen is het kiezen van een webapp (zoals B1Admin), deze laten verwijzen naar de gedeelde **demo-API's** en beginnen met frontend-wijzigingen. Geen database- of API-installatie nodig.
:::
