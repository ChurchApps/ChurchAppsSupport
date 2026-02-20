---
title: "Distribusjon"
---

# Distribusjon

<div class="article-intro">

ChurchApps bruker ulike distribusjonsstrategier avhengig av prosjekttype. API-er distribueres til AWS Lambda, webapper distribueres som statiske nettsteder til S3 med CloudFront, og mobilapper bygges og distribueres gjennom Expo EAS og appbutikkene.

</div>

## Distribusjon etter prosjekttype

| Prosjekttype | Distribusjonsmål | Verktøy |
|-------------|-------------------|---------|
| [API-er](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x-kjøretid) |
| [Webapper](./web-apps) | S3 + CloudFront | Statisk bygging, S3-synkronisering, CloudFront-invalidering |
| [Mobilapper](./mobile) | Appbutikker | Expo EAS Build + OTA-oppdateringer |
| FreeShow | Direkte nedlasting | Electron Builder (kryssplattform-binærfiler) |

## Miljøer

| Miljø | Formål |
|-------|--------|
| `dev` | Lokal utvikling |
| `demo` | Offentlig demoinstans |
| `staging` | Testing før produksjon |
| `prod` | Produksjon |

:::info
Hvert miljø har sitt eget sett med API-endepunkter, databaser og konfigurasjon. Miljøspesifikke innstillinger administreres gjennom `.env`-filer lokalt og AWS SSM Parameter Store i distribuerte miljøer.
:::
