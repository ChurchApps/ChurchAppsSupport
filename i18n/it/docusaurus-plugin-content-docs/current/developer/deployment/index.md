---
title: "Distribuzione"
---

# Distribuzione

<div class="article-intro">

ChurchApps utilizza strategie di distribuzione diverse a seconda del tipo di progetto. Le API vengono distribuite su AWS Lambda, le applicazioni web come siti statici su S3 con CloudFront, mentre le app mobili vengono compilate e distribuite tramite Expo EAS e gli store delle app.

</div>

## Distribuzione per tipo di progetto

| Tipo di progetto | Destinazione di distribuzione | Strumenti |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3 (runtime Node.js 24.x) |
| [Applicazioni web](./web-apps) | S3 + CloudFront | Build statica, sincronizzazione S3, invalidazione CloudFront |
| [App mobili](./mobile) | Store delle app | Expo EAS Build + OTA Updates |
| [Self-Hosting (Railway)](./railway-template) | Railway | Template con un clic: MySQL + Api + B1Admin + B1App |
| [Self-Hosting (Docker)](./docker) | Qualsiasi host Docker | Installer con una sola riga; immagini GHCR precompilate + Caddy, aggiornamento/backup/rollback con `./deploy/b1` |
| [Proxy Caddy con dominio personalizzato](./caddy-proxy) | EC2 Windows (Elastic IP `3.23.251.61`) | Caddyfile statico + servizio WinSW + sincronizzazione pianificata della mappa |
| FreeShow | Download diretto | Electron Builder (binari multipiattaforma) |

## Ambienti

| Ambiente | Scopo |
|-------------|---------|
| `dev` | Sviluppo locale |
| `demo` | Istanza demo pubblica; distribuita a ogni push su `main`, quindi funge anche da test pre-produzione |
| `prod` | Produzione |

:::info
Ogni ambiente ha un proprio set di endpoint API, database e configurazioni. Le impostazioni specifiche di ciascun ambiente sono gestite tramite file `.env` in locale e tramite AWS SSM Parameter Store negli ambienti distribuiti.
:::
