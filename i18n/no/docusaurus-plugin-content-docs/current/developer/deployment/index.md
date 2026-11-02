---
title: "Distribusjon"
---

# Distribusjon

<div class="article-intro">

ChurchApps bruker ulike distribusjonsstrategier avhengig av prosjekttype. API-er distribueres til AWS Lambda, webapper distribueres som statiske sider til S3 med CloudFront, og mobilapper bygges og distribueres via Expo EAS og appbutikkene.

</div>

## Distribusjon etter prosjekttype

| Prosjekttype | Distribusjonsmål | Verktøy |
|-------------|-------------------|---------|
| [API-er](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 24.x-kjøretid) |
| [Webapper](./web-apps) | S3 + CloudFront | Statisk bygg, S3-synkronisering, CloudFront-invalidering |
| [Mobilapper](./mobile) | Appbutikker | Expo EAS Build + OTA-oppdateringer |
| [Selvhosting (Railway)](./railway-template) | Railway | Ett-klikks-mal: MySQL + Api + B1Admin + B1App |
| [Selvhosting (Docker)](./docker) | Enhver Docker-vert | Installasjonsprogram med én linje; ferdigbygde GHCR-images + Caddy, oppgradering/sikkerhetskopi/tilbakerulling med `./deploy/b1` |
| [Caddy-proxy for egendefinerte domener](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Statisk Caddyfile + WinSW-tjeneste + planlagt kartsynkronisering |
| FreeShow | Direkte nedlasting | Electron Builder (plattformuavhengige binærfiler) |

## Miljøer

| Miljø | Formål |
|-------------|---------|
| `dev` | Lokal utvikling |
| `demo` | Offentlig demoinstans; distribueres ved hver push til `main`, så den fungerer som testing før produksjon |
| `prod` | Produksjon |

:::info
Hvert miljø har sitt eget sett med API-endepunkter, databaser og konfigurasjon. Miljøspesifikke innstillinger administreres gjennom `.env`-filer lokalt og AWS SSM Parameter Store i distribuerte miljøer.
:::
