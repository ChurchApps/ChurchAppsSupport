---
title: "Distribuzione"
---

# Distribuzione

<div class="article-intro">

ChurchApps utilizza diverse strategie di distribuzione a seconda del tipo di progetto. Le API vengono distribuite su AWS Lambda, le applicazioni web vengono distribuite come siti statici su S3 con CloudFront, e le applicazioni mobile vengono compilate e distribuite tramite Expo EAS e gli app store.

</div>

## Distribuzione per Tipo di Progetto

| Tipo di Progetto | Destinazione della Distribuzione | Strumenti |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3 (runtime Node.js 22.x) |
| [Applicazioni Web](./web-apps) | S3 + CloudFront | Build statica, sincronizzazione S3, invalidazione CloudFront |
| [Applicazioni Mobile](./mobile) | App Store | Expo EAS Build + Aggiornamenti OTA |
| [Self-Hosting (Railway)](./railway-template) | Railway | Modello one-click: MySQL + Api + B1Admin + B1App |
| [Self-Hosting (Docker)](./docker) | Qualsiasi host Docker | `docker compose up` dal repository B1Admin |
| [Proxy Caddy per Domini Personalizzati](./caddy-proxy) | Windows EC2 (IP elastico `3.23.251.61`) | Caddyfile statico + servizio WinSW + sincronizzazione mappe pianificata |
| FreeShow | Download diretto | Electron Builder (binari multipiattaforma) |

## Ambienti

| Ambiente | Scopo |
|-------------|---------|
| `dev` | Sviluppo locale |
| `demo` | Istanza demo pubblica |
| `staging` | Test pre-produzione |
| `prod` | Produzione |

:::info
Ogni ambiente ha il proprio set di endpoint API, database e configurazione. Le impostazioni specifiche per ambiente sono gestite tramite file `.env` in locale e AWS SSM Parameter Store negli ambienti distribuiti.
:::
