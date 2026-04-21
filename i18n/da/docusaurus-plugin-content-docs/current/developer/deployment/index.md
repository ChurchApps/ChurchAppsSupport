---
title: "Installation"
---

# Installation

<div class="article-intro">

ChurchApps bruger forskellige installationsstrategier afhængigt af projekttypen. API'er installeres til AWS Lambda, webapps installeres som statiske websteder til S3 med CloudFront, og mobilapps bygges og distribueres gennem Expo EAS og app-butikkerne.

</div>

## Installation efter projekttype

| Projekttype | Installationsmål | Værktøj |
|-------------|-------------------|---------|
| [API'er](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x runtime) |
| [Webapps](./web-apps) | S3 + CloudFront | Statisk build, S3 sync, CloudFront invalidation |
| [Mobilapps](./mobile) | App Stores | Expo EAS Build + OTA Updates |
| FreeShow | Direkte download | Electron Builder (cross-platform binære filer) |

## Miljøer

| Miljø | Formål |
|-------------|---------|
| `dev` | Lokal udvikling |
| `demo` | Offentlig demo-instans |
| `staging` | Test før produktion |
| `prod` | Produktion |

:::info
Hvert miljø har sit eget sæt API-endpoints, databaser og konfiguration. Miljø-specifikke indstillinger administreres gennem `.env`-filer lokalt og AWS SSM Parameter Store i implementerede miljøer.
:::
