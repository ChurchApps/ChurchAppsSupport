---
title: "Nasadenie"
---

# Nasadenie

<div class="article-intro">

ChurchApps používa rôzne stratégie nasadenia v závislosti od typu projektu. API sa nasadzujú do AWS Lambda, webové aplikácie sa nasadzujú ako statické stránky do S3 s CloudFront a mobilné aplikácie sa zostavujú a distribuujú prostredníctvom Expo EAS a obchodov s aplikáciami.

</div>

## Nasadenie podľa typu projektu

| Typ projektu | Cieľ nasadenia | Nástroje |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3 (runtime Node.js 24.x) |
| [Webové aplikácie](./web-apps) | S3 + CloudFront | Statické zostavenie, synchronizácia S3, invalidácia CloudFront |
| [Mobilné aplikácie](./mobile) | Obchody s aplikáciami | Expo EAS Build + OTA aktualizácie |
| [Vlastné hostovanie (Railway)](./railway-template) | Railway | Jednokliková šablóna: MySQL + Api + B1Admin + B1App |
| [Vlastné hostovanie (Docker)](./docker) | Akýkoľvek hostiteľ Docker | Jednoriadkový inštalátor; predpripravené obrazy GHCR + Caddy, `./deploy/b1` aktualizácia/záloha/vrátenie |
| [Caddy proxy pre vlastnú doménu](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Statický Caddyfile + služba WinSW + plánovaná synchronizácia máp |
| FreeShow | Priame stiahnutie | Electron Builder (binárne súbory pre viaceré platformy) |

## Prostredia

| Prostredie | Účel |
|-------------|---------|
| `dev` | Lokálny vývoj |
| `demo` | Verejná demo inštancia; nasadzuje sa pri každom pushi do `main`, takže slúži aj ako predprodukčné testovanie |
| `prod` | Produkcia |

:::info
Každé prostredie má vlastnú sadu koncových bodov API, databáz a konfigurácie. Nastavenia špecifické pre prostredie sa spravujú cez súbory `.env` lokálne a v AWS SSM Parameter Store v nasadených prostrediach.
:::
