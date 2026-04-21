---
title: "API"
---

# API

<div class="article-intro">

De ChurchApps API is een **modulaire monoliet** -- een enkele codebase die zes afzonderlijke modules serveert, elk met zijn eigen database. Deze architectuur geeft u de organisatorische voordelen van microservices (duidelijke grenzen, onafhankelijke gegevensarchieven) met de operationele eenvoud van een enkele implementatie.

</div>

## Modules

| Module | Doel |
|--------|---------|
| **Membership** | Personen, groepen, huishoudens, machtigingen |
| **Attendance** | Services, sessies, check-in-records |
| **Content** | Pagina's, secties, elementen, streaming |
| **Giving** | Donaties, fondsen, betalingsverwerking |
| **Messaging** | Gesprekken, meldingen, e-mail |
| **Doing** | Taken, plannen, toewijzingen |

## Tech Stack

- **Runtime:** Node.js 22.x met TypeScript (ES modules)
- **Framework:** Express
- **Dependency Injection:** Inversify (decorator-gebaseerde routing)
- **Database:** MySQL -- één database per module, elk met zijn eigen verbindingspool
- **Auth:** JWT-verificatie via `CustomAuthProvider`
- **Deployment:** AWS Lambda via Serverless Framework v3

## Poorten

| Protocol | Port | Beschrijving |
|----------|------|-------------|
| HTTP | `8084` | Hoofd REST API |
| WebSocket | `8087` | Real-time socket-verbindingen |

## Lambda-functies

Bij implementatie in AWS draait de API als vier Lambda-functies:

- **`web`** -- Behandelt alle HTTP-verzoeken
- **`socket`** -- Beheert WebSocket-verbindingen
- **`timer15Min`** -- Draait elke 15 minuten voor e-mailmeldingen
- **`timerMidnight`** -- Draait dagelijks voor digest-e-mails en onderhoudstaken

## Gedeelde Bibliotheken

De API is afhankelijk van twee gedeelde ChurchApps-pakketten:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Basisutilities (DateHelper, ApiHelper, enz.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express-serverutilities, inclusief verificatie, databasehelpers en AWS-integraties

:::info
De API gebruikt ES modules (`"type": "module"` in `package.json`). Zorg ervoor dat uw imports ES module-syntaxis gebruiken.
:::

## In Dit Gedeelte

- **[Local Setup](./local-setup)** -- Kloon, configureer en voer de API lokaal uit
- **[Database](./database)** -- Database-per-module-architectuur, schemaschriften en gegevenstoegangspatronen
- **[Module Structure](./module-structure)** -- Controllers, repositories, modellen en verificatie
- **[Endpoint Reference](./endpoints/)** -- Volledige REST API-documentatie voor alle modules
