---
title: "Deployment"
---

# Deployment

<div class="article-intro">

ChurchApps verwendet verschiedene Deployment-Strategien abhängig vom Projekttyp. APIs werden zu AWS Lambda deployed, Web-Apps werden als statische Sites zu S3 mit CloudFront deployed, und Mobile-Apps werden durch Expo EAS und App Stores gebaut und verteilt.

</div>

## Deployment nach Projekttyp

| Projekttyp | Deployment-Ziel | Werkzeug |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x runtime) |
| [Web Apps](./web-apps) | S3 + CloudFront | Statischer Build, S3 Sync, CloudFront Invalidierung |
| [Mobile Apps](./mobile) | App Stores | Expo EAS Build + OTA Updates |
| [Self-Hosting (Railway)](./railway-template) | Railway | One-Click-Vorlage |
| [Self-Hosting (Docker)](./docker) | Jeder Docker-Host | `docker compose up` |
| [Caddy Custom-Domain-Proxy](./caddy-proxy) | Windows EC2 | Statische Caddyfile |
| FreeShow | Direkter Download | Electron Builder |

## Umgebungen

| Umgebung | Zweck |
|-------------|---------|
| `dev` | Lokale Entwicklung |
| `demo` | Öffentliche Demo-Instanz |
| `staging` | Vor-Produktions-Test |
| `prod` | Produktion |

:::info
Jede Umgebung hat ihre eigenen API-Endpunkte, Datenbanken und Konfiguration. Umgebungsspezifische Einstellungen werden durch `.env`-Dateien lokal und AWS SSM Parameter Store in bereitgestellten Umgebungen verwaltet.
:::
