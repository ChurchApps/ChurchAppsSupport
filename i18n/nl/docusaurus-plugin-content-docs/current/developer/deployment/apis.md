---
title: "API Deployment"
---

# API Deployment

<div class="article-intro">

ChurchApps API's worden geïmplementeerd als AWS Lambda-functies met behulp van het Serverless Framework. Deze pagina behandelt de bouw-, implementatie- en configuratieworkflow voor staging- en productieomgevingen.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Stel de API lokaal in -- zie [Local API Setup](../api/local-setup)
- Configureer AWS-gegevens op uw machine
- Zorg ervoor dat u toegang hebt tot het doel-AWS-account

</div>

## Build

API's worden voor productie gebouwd met behulp van een speciale TypeScript-configuratie:

```bash
npm run build:prod
```

Dit gebruikt `tsconfig.prod.json` om het project voor de Lambda-runtime te compileren.

## Deploy

Implementeer naar staging:

```bash
npm run deploy-staging
```

Implementeer naar productie:

```bash
npm run deploy-prod
```

## Wat Wordt Aangemaakt

Elke API-implementatie maakt of werkt de volgende AWS Lambda-functies bij:

| Functie | Doel |
|----------|---------|
| `web` | HTTP-verzoekhandler via API Gateway |
| `socket` | WebSocket-verbindingshandler |
| `timer15Min` | Geplande taak die elke 15 minuten draait |
| `timerMidnight` | Geplande taak die dagelijks om middernacht draait |

## Omgevingsconfiguratie

In geïmplementeerde omgevingen wordt configuratie gelezen uit **AWS SSM Parameter Store** in plaats van `.env`-bestanden. Dit houdt geheimen uit het implementatiepakket en maakt configuratiewijzigingen mogelijk zonder opnieuw in te dienen.

:::warning
Leg nooit productiegegevens vast in de repository. Alle gevoelige configuratie moet worden opgeslagen in AWS SSM Parameter Store en tijdens runtime worden geopend.
:::

:::tip
Implementeer altijd eerst naar staging met behulp van `npm run deploy-staging` om de wijzigingen te verifiëren voordat u naar prod promoveert.
:::

## Gerelateerde Artikelen

- **[Local API Setup](../api/local-setup)** -- De API instellen voor ontwikkeling
- **[Module Structure](../api/module-structure)** -- De Lambda-functie-architectuur begrijpen
- **[Web App Deployment](./web-apps)** -- De frontend-applicaties implementeren
