---
title: "Deployment"
description: "Waar elk ChurchApps-project wordt gedeployd, van AWS Lambda-API's en S3-webapps tot Expo-mobielbuilds en zelf gehoste B1 Admin op Railway of Docker."
---

# Deployment

<div class="article-intro">

ChurchApps gebruikt verschillende implementatiestrategieën, afhankelijk van het projecttype. API's worden in AWS Lambda geïmplementeerd, web-apps als statische sites in S3 met CloudFront, en mobiele apps worden gebouwd en verdeeld via Expo EAS en de app-stores.

</div>

## Implementatie per Projecttype

| Projecttype | Implementatiedoel | Tooling |
|-------------|-------------------|---------|
| [APIs](./apis.md) | AWS Lambda | Serverless Framework v3 (Node.js 22.x runtime) |
| [Web Apps](./web-apps.md) | S3 + CloudFront | Statische build, S3 sync, CloudFront-invalidatie |
| [Mobile Apps](./mobile.md) | App Stores | Expo EAS Build + OTA-updates |
| FreeShow | Direct download | Electron Builder (cross-platform binaries) |

## Omgevingen

| Omgeving | Doel |
|-------------|---------|
| `dev` | Lokale ontwikkeling |
| `demo` | Openbare demo-instantie |
| `staging` | Pre-productietesting |
| `prod` | Productie |

:::info
Elke omgeving heeft zijn eigen set API-eindpunten, databases en configuratie. Omgevingsspecifieke instellingen worden lokaal via `.env`-bestanden en in geïmplementeerde omgevingen via AWS SSM Parameter Store beheerd.
:::
