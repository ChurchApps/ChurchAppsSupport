---
title: "Distribusjon"
---

# Distribusjon

<div class="article-intro">

ChurchApps bruker ulike distribusjonsstrategier avhengig av prosjekttype. APIer distribueres til AWS Lambda, nettapps distribueres som statiske nettsteder til S3 med CloudFront, og mobilapps bygges og distribueres gjennom Expo EAS og appbutikkene.

</div>

## Distribusjon etter prosjekttype

| Prosjekttype | Distribusjonsmål | Verktøy |
|-------------|-------------------|---------|
| [APIer](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x runtime) |
| [Nettapper](./web-apps) | S3 + CloudFront | Statisk bygging, S3-synkronisering, CloudFront-invalidering |
| [Mobilapper](./mobile) | Appbutikker | Expo EAS Build + OTA Updates |
| [Caddy Custom-Domain Proxy](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Statisk Caddyfile + WinSW-tjeneste + planlagt kartssynkronisering |
| FreeShow | Direkte nedlasting | Electron Builder (tverrplattform-binærer) |

## Miljøer

| Miljø | Formål |
|-------------|---------|
| `dev` | Lokal utvikling |
| `demo` | Offentlig demoinstans |
| `staging` | Før-produksjon testing |
| `prod` | Produksjon |

:::info
Hvert miljø har sitt eget sett med API-endepunkter, databaser og konfigurering. Miljøspesifikke innstillinger styres gjennom `.env`-filer lokalt og AWS SSM Parameter Store i distribuerte miljøer.
:::
