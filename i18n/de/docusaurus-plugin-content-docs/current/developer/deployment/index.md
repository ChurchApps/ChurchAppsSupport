---
title: "Bereitstellung"
---

# Bereitstellung

<div class="article-intro">

ChurchApps nutzt verschiedene Bereitstellungsstrategien je nach Projekttyp. APIs werden auf AWS Lambda bereitgestellt, Web-Apps als statische Seiten auf S3 mit CloudFront, und mobile Apps werden durch Expo EAS und die App Stores gebaut und verteilt.

</div>

## Bereitstellung nach Projekttyp

| Projekttyp | Bereitstellungsziel | Werkzeuge |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x runtime) |
| [Web-Apps](./web-apps) | S3 + CloudFront | Statischer Build, S3 Sync, CloudFront Invalidation |
| [Mobile Apps](./mobile) | App Stores | Expo EAS Build + OTA Updates |
| [Selbst-Hosting (Railway)](./railway-template) | Railway | Ein-Klick-Template: MySQL + Api + B1Admin + B1App |
| [Selbst-Hosting (Docker)](./docker) | Beliebiger Docker Host | `docker compose up` aus dem B1Admin Repo |
| [Caddy Custom-Domain Proxy](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Statischer Caddyfile + WinSW Service + geplante Map-Synchronisation |
| FreeShow | Direkter Download | Electron Builder (Cross-Platform Binärdateien) |

## Umgebungen

| Umgebung | Zweck |
|-------------|---------|
| `dev` | Lokale Entwicklung |
| `demo` | Öffentliche Demo-Instanz |
| `staging` | Pre-Production Testing |
| `prod` | Produktion |

:::info
Jede Umgebung hat ihren eigenen Satz von API-Endpunkten, Datenbanken und Konfiguration. Umgebungsspezifische Einstellungen werden lokal über `.env`-Dateien und in bereitgestellten Umgebungen über AWS SSM Parameter Store verwaltet.
:::
