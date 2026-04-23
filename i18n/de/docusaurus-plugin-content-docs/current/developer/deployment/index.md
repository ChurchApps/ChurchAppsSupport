---
title: "Deployment"
---

# Deployment

<div class="article-intro">

ChurchApps nutzt verschiedene Deployment-Strategien je nach Projekttyp. APIs deployen zu AWS Lambda, Web-Apps als statische Seiten zu S3 mit CloudFront, und Mobile-Apps werden durch Expo EAS und die App-Stores gebaut und verteilt.

</div>

## Deployment nach Projekttyp

| Projekttyp | Deployment-Ziel | Tooling |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x Runtime) |
| [Web-Apps](./web-apps) | S3 + CloudFront | Statischer Build, S3-Sync, CloudFront-Invalidation |
| [Mobile-Apps](./mobile) | App-Stores | Expo EAS Build + OTA-Updates |
| FreeShow | Direkter Download | Electron Builder (Cross-Plattform-Binärdateien) |

## Umgebungen

| Umgebung | Zweck |
|-------------|---------|
| `dev` | Lokale Entwicklung |
| `demo` | Öffentliche Demo-Instanz |
| `staging` | Pre-Production-Tests |
| `prod` | Production |

:::info
Jede Umgebung hat ihre eigenen API-Endpoints, Datenbanken und Konfiguration. Umgebungsspezifische Einstellungen werden lokal über `.env`-Dateien und in bereitgestellten Umgebungen über AWS SSM Parameter Store verwaltet.
:::
