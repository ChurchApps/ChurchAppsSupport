---
title: "Bereitstellung"
---

# Bereitstellung

<div class="article-intro">

ChurchApps verwendet je nach Projekttyp unterschiedliche Bereitstellungsstrategien. APIs werden auf AWS Lambda bereitgestellt, Web-Apps als statische Sites auf S3 mit CloudFront, und mobile Apps werden über Expo EAS und die App Stores gebaut und verteilt.

</div>

## Bereitstellung nach Projekttyp

| Projekttyp | Ziel der Bereitstellung | Werkzeuge |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (Laufzeitumgebung Node.js 24.x) |
| [Web-Apps](./web-apps) | S3 + CloudFront | Statischer Build, S3-Synchronisation, Invalidierung bei CloudFront |
| [Mobile Apps](./mobile) | App Stores | Expo EAS Build + OTA-Updates |
| [Selbsthosting (Railway)](./railway-template) | Railway | Vorlage mit einem Klick: MySQL + Api + B1Admin + B1App |
| [Selbsthosting (Docker)](./docker) | Jeder Docker-Host | Installer mit einer Zeile; vorgefertigte GHCR-Images + Caddy, `./deploy/b1` für Aktualisierung/Sicherung/Zurücksetzen |
| [Caddy-Proxy für eigene Domains](./caddy-proxy) | Windows-EC2 (Elastic IP `3.23.251.61`) | Statische Caddyfile + WinSW-Dienst + geplante Synchronisation der Abbildung |
| FreeShow | Direkter Download | Electron Builder (plattformübergreifende Binärdateien) |

## Umgebungen

| Umgebung | Zweck |
|-------------|-------------|
| `dev` | Lokale Entwicklung |
| `demo` | Öffentliche Demo-Instanz; wird bei jedem Push auf `main` bereitgestellt und dient daher als Test vor der Produktion |
| `prod` | Produktion |

:::info
Jede Umgebung hat eigene API-Endpunkte, Datenbanken und Konfigurationen. Umgebungsspezifische Einstellungen werden lokal über `.env`-Dateien verwaltet und in bereitgestellten Umgebungen über den AWS Systems Manager Parameter Store (SSM).
:::
