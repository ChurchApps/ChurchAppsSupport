---
title: "Bereitstellung"
---

# Bereitstellung

<div class="article-intro">

ChurchApps verwendet je nach Projekttyp unterschiedliche Bereitstellungsstrategien. APIs werden auf AWS Lambda bereitgestellt, Web-Apps als statische Websites auf S3 mit CloudFront, und mobile Apps werden über Expo EAS und die App-Stores gebaut und verteilt.

</div>

## Bereitstellung nach Projekttyp

| Projekttyp | Bereitstellungsziel | Werkzeuge |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (Laufzeitumgebung Node.js 24.x) |
| [Web-Apps](./web-apps) | S3 + CloudFront | Statischer Build, S3-Synchronisierung, Invalidierung von CloudFront |
| [Mobile Apps](./mobile) | App-Stores | Expo EAS Build + OTA-Updates |
| [Selbst-Hosting (Railway)](./railway-template) | Railway | Ein-Klick-Vorlage: MySQL + Api + B1Admin + B1App |
| [Selbst-Hosting (Docker)](./docker) | Beliebiger Docker-Host | Installer mit einer Zeile; vorgefertigte GHCR-Images + Caddy, Aktualisierung/Sicherung/Zurücksetzen mit `./deploy/b1` |
| [Caddy-Proxy für eigene Domains](./caddy-proxy) | Windows-EC2 (Elastic IP `3.23.251.61`) | Statische Caddyfile + WinSW-Dienst + geplante Synchronisierung der Zuordnung |
| FreeShow | Direkter Download | Electron Builder (plattformübergreifende Binärdateien) |

## Umgebungen

| Umgebung | Zweck |
|-------------|-------------|
| `dev` | Lokale Entwicklung |
| `demo` | Öffentliche Demo-Instanz; wird bei jedem Push auf `main` bereitgestellt und dient daher auch als Vorproduktionstest |
| `prod` | Produktion |

:::info
Jede Umgebung hat eigene API-Endpunkte, Datenbanken und Konfigurationen. Umgebungsspezifische Einstellungen verwaltet man lokal über `.env`-Dateien und in bereitgestellten Umgebungen über den AWS Systems Manager Parameter Store (SSM).
:::
