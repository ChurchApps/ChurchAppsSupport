---
title: "Bereitstellung"
---

# Bereitstellung

<div class="article-intro">

ChurchApps verwendet unterschiedliche Bereitstellungsstrategien je nach Projekttyp. APIs werden in AWS Lambda bereitgestellt, Web-Apps werden als statische Websites auf S3 mit CloudFront bereitgestellt, und Mobile Apps werden durch Expo EAS erstellt und über die App Stores verteilt.

</div>

## Bereitstellung nach Projekttyp

| Projekttyp | Bereitstellungsziel | Tooling |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x Runtime) |
| [Web-Apps](./web-apps) | S3 + CloudFront | Statischer Build, S3-Sync, CloudFront-Invalidierung |
| [Mobile Apps](./mobile) | App Stores | Expo EAS Build + OTA Updates |
| [Self-Hosting (Railway)](./railway-template) | Railway | One-Click-Vorlage: MySQL + Api + B1Admin + B1App |
| [Self-Hosting (Docker)](./docker) | Jeder Docker-Host | `docker compose up` aus dem B1Admin-Repo |
| [Caddy Custom-Domain Proxy](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Statische Caddyfile + WinSW-Service + geplante Map-Synchronisierung |
| FreeShow | Direkter Download | Electron Builder (plattformübergreifende Binärdateien) |

## Umgebungen

| Umgebung | Zweck |
|-------------|---------|
| `dev` | Lokale Entwicklung |
| `demo` | Öffentliche Demo-Instanz |
| `staging` | Vor-Produktions-Tests |
| `prod` | Produktion |

:::info
Jede Umgebung hat ihre eigenen API-Endpunkte, Datenbanken und Konfiguration. Umgebungsspezifische Einstellungen werden lokal über `.env`-Dateien und im AWS SSM Parameter Store in bereitgestellten Umgebungen verwaltet.
:::
