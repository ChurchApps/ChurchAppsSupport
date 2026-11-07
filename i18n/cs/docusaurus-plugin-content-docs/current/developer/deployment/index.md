---
title: "Nasazení"
description: "Kde nasadit jednotlivé projekty ChurchApps: API na AWS Lambda, weby na S3, mobilní sestavení v Expo a vlastní hostování B1 Admin na Railway nebo Dockeru."
---

# Nasazení

<div class="article-intro">

ChurchApps používá různé strategie nasazení podle typu projektu. API se nasazují na AWS Lambda, webové aplikace se nasazují jako statické weby na S3 s CloudFrontem a mobilní aplikace se sestavují a distribuují přes Expo EAS a obchody s aplikacemi.

</div>

## Nasazení podle typu projektu

| Typ projektu | Cíl nasazení | Nástroje |
|-------------|-------------------|---------|
| [API](./apis.md) | AWS Lambda | Serverless Framework v3 (runtime Node.js 24.x) |
| [Webové aplikace](./web-apps.md) | S3 + CloudFront | Statický build, synchronizace S3, invalidace CloudFrontu |
| [Mobilní aplikace](./mobile.md) | Obchody s aplikacemi | Expo EAS Build + OTA aktualizace |
| [Vlastní hosting (Railway)](./railway-template.md) | Railway | Šablona na jedno kliknutí: MySQL + Api + B1Admin + B1App |
| [Vlastní hosting (Docker)](./docker.md) | Libovolný hostitel s Dockerem | Instalátor na jeden řádek; předsestavené obrazy GHCR + Caddy, `./deploy/b1` pro aktualizaci/zálohu/vrácení zpět |
| [Caddy proxy pro vlastní doménu](./caddy-proxy.md) | Windows EC2 (Elastic IP `3.23.251.61`) | Statický Caddyfile + služba WinSW + plánovaná synchronizace mapy |
| FreeShow | Přímé stažení | Electron Builder (binární soubory pro více platforem) |

## Prostředí

| Prostředí | Účel |
|-------------|---------|
| `dev` | Lokální vývoj |
| `demo` | Veřejná demo instance; nasazuje se při každém odeslání do `main`, takže slouží také jako předprodukční testování |
| `prod` | Produkce |

:::info
Každé prostředí má vlastní sadu API endpointů, databází a konfigurace. Nastavení specifická pro prostředí se spravují lokálně pomocí souborů `.env` a v nasazených prostředích pomocí AWS SSM Parameter Store.
:::
