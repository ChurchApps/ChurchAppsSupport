---
title: "Utrulling"
---

# Utrulling

<div class="article-intro">

ChurchApps bruker ulike utrullingsstrategier avhengig av prosjekttype. API-er deployes til AWS Lambda, webapper deployes som statiske sider til S3 med CloudFront, og mobilapper bygges og distribueres via Expo EAS og appbutikkene.

</div>

## Utrulling etter prosjekttype

| Prosjekttype | Utrullingsmål | Verktøy |
|-------------|-------------------|---------|
| [API-er](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x-kjøretid) |
| [Webapper](./web-apps) | S3 + CloudFront | Statisk bygg, S3-synkronisering, CloudFront-invalidering |
| [Mobilapper](./mobile) | Appbutikker | Expo EAS Build + OTA-oppdateringer |
| [Selvhosting (Railway)](./railway-template) | Railway | Ett-klikks-mal: MySQL + Api + B1Admin + B1App |
| [Selvhosting (Docker)](./docker) | Enhver Docker-vert | Ett-linjers installasjonsprogram; forhåndsbygde GHCR-images + Caddy, `./deploy/b1` for oppgradering, sikkerhetskopiering og tilbakerulling |
| [Caddy-proxy for eget domene](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Statisk Caddyfile + WinSW-tjeneste + planlagt synkronisering av kart |
| FreeShow | Direkte nedlasting | Electron Builder (binærfiler for alle plattformer) |

## Miljøer

| Miljø | Formål |
|-------------|---------|
| `dev` | Lokal utvikling |
| `demo` | Offentlig demoinstans; deployes ved hver push til `main`, så den fungerer også som testing før produksjon |
| `prod` | Produksjon |

:::info
Hvert miljø har sitt eget sett med API-endepunkter, databaser og konfigurasjon. Miljøspesifikke innstillinger administreres gjennom `.env`-filer lokalt og AWS SSM Parameter Store i deployede miljøer.
:::
