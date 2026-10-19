---
title: "Distribuzione"
---

# Distribuzione

<div class="article-intro">

ChurchApps usa strategie di distribuzione diverse a seconda del tipo di progetto: le API vengono distribuite su AWS Lambda, le app web come siti statici su S3 con CloudFront, e le app mobili vengono compilate e distribuite tramite Expo EAS e gli store delle app.

</div>

## Distribuzione per tipo di progetto

| Tipo di progetto | Destinazione | Strumenti |
|------------------|--------------|-----------|
| [API](./apis) | AWS Lambda | Serverless Framework v3 (runtime Node.js 22.x) |
| [App web](./web-apps) | S3 + CloudFront | Build statica, sincronizzazione S3, invalidazione CloudFront |
| [App mobili](./mobile) | Store delle app | Expo EAS Build + aggiornamenti OTA |
| [Self-hosting (Railway)](./railway-template) | Railway | Template con un clic: MySQL + Api + B1Admin + B1App |
| [Self-hosting (Docker)](./docker) | Qualsiasi host Docker | Installer con una riga di comando; immagini GHCR precompilate + Caddy, aggiornamento, backup e rollback con `./deploy/b1` |
| [Proxy Caddy per domini personalizzati](./caddy-proxy) | EC2 Windows (Elastic IP `3.23.251.61`) | Caddyfile statico + servizio WinSW + sincronizzazione programmata della mappa |
| FreeShow | Download diretto | Electron Builder (binari multipiattaforma) |

## Ambienti

| Ambiente | Scopo |
|----------|-------|
| `dev` | Sviluppo locale |
| `demo` | Istanza demo pubblica; distribuita a ogni push su `main`, quindi funge anche da test di pre-produzione |
| `prod` | Produzione |

:::info
Ogni ambiente ha il proprio insieme di endpoint API, database e configurazioni. Le impostazioni specifiche di ogni ambiente sono gestite tramite file `.env` in locale e tramite AWS SSM Parameter Store negli ambienti distribuiti.
:::
