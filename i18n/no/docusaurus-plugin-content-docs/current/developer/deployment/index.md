---
title: "Distribusjon"
---

# Distribusjon

<div class="article-intro">

ChurchApps bruker ulike distribusjonsstrategier avhengig av prosjekttype. API-er distribueres til AWS Lambda, nettapper distribueres som statiske nettsteder til S3 med CloudFront, og mobilapper bygges og distribueres gjennom Expo EAS og app-butikkene.

</div>

## Distribusjon etter prosjekttype

| Prosjekttype | Distribusjonsmål | Verktøy |
|-------------|-------------------|---------|
| [API-er](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x-kjøretid) |
| [Nettapper](./web-apps) | S3 + CloudFront | Statisk bygg, S3-synkronisering, CloudFront-invalidering |
| [Mobilapper](./mobile) | App-butikker | Expo EAS Build + OTA-oppdateringer |
| [Selvhosting (Railway)](./railway-template) | Railway | Mal med ett klikk: MySQL + Api + B1Admin + B1App |
| [Selvhosting (Docker)](./docker) | Enhver Docker-vert | `docker compose up` fra B1Admin-repositoriet |
| [Caddy tilpasset-domene-proxy](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Statisk Caddyfile + WinSW-tjeneste + planlagt kartsynkronisering |
| FreeShow | Direkte nedlasting | Electron Builder (binærfiler for flere plattformer) |

## Miljøer

| Miljø | Formål |
|-------------|---------|
| `dev` | Lokal utvikling |
| `demo` | Offentlig demoinstans |
| `staging` | Testing før produksjon |
| `prod` | Produksjon |

:::info
Hvert miljø har sitt eget sett med API-endepunkter, databaser og konfigurasjon. Miljøspesifikke innstillinger administreres gjennom `.env`-filer lokalt og AWS SSM Parameter Store i distribuerte miljøer.
:::
