---
title: "Distribuzione"
---

# Distribuzione

<div class="article-intro">

ChurchApps utilizza diverse strategie di distribuzione a seconda del tipo di progetto. Le API vengono distribuite su AWS Lambda, le applicazioni web vengono distribuite come siti statici su S3 con CloudFront, e le applicazioni mobile vengono compilate e distribuite tramite Expo EAS e gli app store.

</div>

## Distribuzione per Tipo di Progetto

| Tipo di Progetto | Destinazione della Distribuzione | Strumenti |
|-----------------|--------------------------------|-----------|
| [API](./apis) | AWS Lambda | Serverless Framework v3 (runtime Node.js 22.x) |
| [Applicazioni Web](./web-apps) | S3 + CloudFront | Build statica, sincronizzazione S3, invalidazione CloudFront |
| [Applicazioni Mobile](./mobile) | App Store | Expo EAS Build + Aggiornamenti OTA |
| FreeShow | Download diretto | Electron Builder (binari multipiattaforma) |

## Ambienti

| Ambiente | Scopo |
|----------|-------|
| `dev` | Sviluppo locale |
| `demo` | Istanza demo pubblica |
| `staging` | Test pre-produzione |
| `prod` | Produzione |

:::info
Ogni ambiente ha il proprio set di endpoint API, database e configurazione. Le impostazioni specifiche per ambiente vengono gestite tramite file `.env` in locale e AWS SSM Parameter Store negli ambienti distribuiti.
:::
