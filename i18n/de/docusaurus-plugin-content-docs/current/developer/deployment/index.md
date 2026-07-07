---
title: "Bereitstellung"
---

# Bereitstellung

ChurchApps verwendet verschiedene Bereitstellungsstrategien je nach Projekttyp. APIs werden auf AWS Lambda bereitgestellt, Web-Apps werden als statische Seiten auf S3 mit CloudFront bereitgestellt, und Mobile-Apps werden über Expo EAS und die App-Stores erstellt und verteilt.

## Bereitstellung nach Projekttyp

| Projekttyp | Bereitstellungs-Ziel | Tools |
|-------------|-------------------|---------|
| APIs | AWS Lambda | Serverless Framework v3 (Node.js 22.x Runtime) |
| Web-Apps | S3 + CloudFront | Statischer Build, S3-Sync, CloudFront-Invalidierung |
| Mobile-Apps | App Stores | Expo EAS Build + OTA-Updates |
| Caddy Custom-Domain Proxy | Windows EC2 | Static Caddyfile + WinSW-Service |
| FreeShow | Direkter Download | Electron Builder |

## Umgebungen

| Umgebung | Zweck |
|-------------|---------|
| `dev` | Lokale Entwicklung |
| `demo` | Öffentliche Demo-Instanz |
| `staging` | Pre-Production-Tests |
| `prod` | Production |

:::info
Jede Umgebung hat ihre eigenen API-Endpunkte, Datenbanken und Konfiguration. Umgebungsspezifische Einstellungen werden lokal über `.env`-Dateien und in bereitgestellten Umgebungen über AWS SSM Parameter Store verwaltet.
:::
