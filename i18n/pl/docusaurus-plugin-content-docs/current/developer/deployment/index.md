---
title: "Implementacja"
---

# Implementacja

<div class="article-intro">

ChurchApps stosuje różne strategie wdrażania w zależności od typu projektu. Interfejsy API są wdrażane w AWS Lambda, aplikacje internetowe jako statyczne witryny w S3 z CloudFront, a aplikacje mobilne są budowane i dystrybuowane za pośrednictwem Expo EAS oraz sklepów z aplikacjami.

</div>

## Wdrażanie według typu projektu

| Typ projektu | Cel wdrożenia | Narzędzia |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3 (środowisko Node.js 24.x) |
| [Aplikacje internetowe](./web-apps) | S3 + CloudFront | Build statyczny, synchronizacja S3, unieważnianie CloudFront |
| [Aplikacje mobilne](./mobile) | Sklepy z aplikacjami | Expo EAS Build + aktualizacje OTA |
| [Self-Hosting (Railway)](./railway-template) | Railway | Szablon jednym kliknięciem: MySQL + Api + B1Admin + B1App |
| [Self-Hosting (Docker)](./docker) | Dowolny host Docker | Instalator jednowierszowy; gotowe obrazy GHCR + Caddy, `./deploy/b1` do aktualizacji/kopii zapasowych/cofania |
| [Caddy Custom-Domain Proxy](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Statyczny Caddyfile + usługa WinSW + zaplanowana synchronizacja map |
| FreeShow | Bezpośrednie pobieranie | Electron Builder (pliki binarne dla wielu platform) |

## Środowiska

| Środowisko | Przeznaczenie |
|-------------|---------|
| `dev` | Lokalne środowisko deweloperskie |
| `demo` | Publiczna instancja demonstracyjna; wdrażana przy każdym wypchnięciu do `main`, więc służy także jako środowisko testów przedprodukcyjnych |
| `prod` | Produkcja |

:::info
Każde środowisko ma własny zestaw punktów końcowych API, baz danych i konfiguracji. Ustawienia specyficzne dla środowiska są zarządzane za pomocą plików `.env` lokalnie oraz AWS SSM Parameter Store we wdrożonych środowiskach.
:::
