---
title: "Utrulling"
---

# Utrulling

<div class="article-intro">

ChurchApps bruker ulike utrullingsstrategier avhengig av prosjekttype. API-er rulles ut til AWS Lambda, webapper rulles ut som statiske sider til S3 med CloudFront, og mobilapper bygges og distribueres gjennom Expo EAS og appbutikkene.

</div>

## Utrulling etter prosjekttype

| Prosjekttype | Utrullingsmål | Verktøy |
|-------------|-------------------|---------|
| [API-er](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 24.x-kjøretid) |
| [Webapper](./web-apps) | S3 + CloudFront | Statisk bygg, S3-synkronisering, CloudFront-invalidering |
| [Mobilapper](./mobile) | Appbutikker | Expo EAS Build + OTA-oppdateringer |
| [Selvhosting (Railway)](./railway-template) | Railway | Ett-klikks-mal: MySQL + Api + B1Admin + B1App |
| [Selvhosting (Docker)](./docker) | Enhver Docker-vert | Ett-linjes installasjonsprogram; forhåndsbygde GHCR-bilder + Caddy, `./deploy/b1` for oppgradering/sikkerhetskopiering/tilbakerulling |
| [Caddy-proxy for egne domener](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Statisk Caddyfile + WinSW-tjeneste + planlagt kartsynkronisering |
| FreeShow | Direkte nedlasting | Electron Builder (plattformuavhengige binærfiler) |

## Miljøer

| Miljø | Formål |
|-------------|---------|
| `dev` | Lokal utvikling |
| `demo` | Offentlig demoinstans; rulles ut ved hver push til `main`, så den fungerer som testing før produksjon |
| `prod` | Produksjon |

:::info
Hvert miljø har sitt eget sett med API-endepunkter, databaser og konfigurasjon. Miljøspesifikke innstillinger administreres gjennom `.env`-filer lokalt og AWS SSM Parameter Store i utrullede miljøer.
:::
