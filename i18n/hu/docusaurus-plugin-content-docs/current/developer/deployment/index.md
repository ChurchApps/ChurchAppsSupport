---
title: "Telepítés"
description: "Tudd meg, hol telepíti az egyes ChurchApps-projekteket: az AWS Lambda API-kat, az S3-as webalkalmazásokat, az Expo mobilbuildeket és a Railway-en vagy Dockerben futó saját B1 Admint."
---

# Telepítés

<div class="article-intro">

A ChurchApps a projekt típusától függően különböző telepítési stratégiákat használ. Az API-k AWS Lambda-ra települnek, a webalkalmazások statikus oldalakként S3-ra és CloudFrontra, a mobilalkalmazásokat pedig Expo EAS segítségével építjük meg és juttatjuk el az alkalmazásboltokba.

</div>

## Telepítés projekttípus szerint

| Projekttípus | Telepítési cél | Eszközök |
|-------------|-------------------|---------|
| [API-k](./apis.md) | AWS Lambda | Serverless Framework v3 (Node.js 24.x futtatókörnyezet) |
| [Webalkalmazások](./web-apps.md) | S3 + CloudFront | Statikus build, S3-szinkronizálás, CloudFront-gyorsítótár-érvénytelenítés |
| [Mobilalkalmazások](./mobile.md) | Alkalmazásboltok | Expo EAS Build + OTA-frissítések |
| [Saját üzemeltetés (Railway)](./railway-template.md) | Railway | Egykattintásos sablon: MySQL + Api + B1Admin + B1App |
| [Saját üzemeltetés (Docker)](./docker.md) | Bármely Docker-gazdagép | Egysoros telepítőprogram; előre elkészített GHCR-image-ek + Caddy, `./deploy/b1` frissítés/mentés/visszaállítás |
| [Caddy egyéni domain proxy](./caddy-proxy.md) | Windows EC2 (Elastic IP: `3.23.251.61`) | Statikus Caddyfile + WinSW-szolgáltatás + ütemezett térképszinkronizálás |
| FreeShow | Közvetlen letöltés | Electron Builder (többplatformos bináris fájlok) |

## Környezetek

| Környezet | Cél |
|-------------|---------|
| `dev` | Helyi fejlesztés |
| `demo` | Nyilvános demópéldány; minden `main`-ba küldéskor települ, így éles előtti tesztelésre is szolgál |
| `prod` | Éles környezet |

:::info
Minden környezetnek saját API-végpontjai, adatbázisai és konfigurációi vannak. A környezetspecifikus beállításokat helyben `.env` fájlok, a telepített környezetekben pedig az AWS SSM Parameter Store kezeli.
:::
