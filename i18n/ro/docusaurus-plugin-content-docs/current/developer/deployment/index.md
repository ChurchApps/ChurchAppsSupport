---
title: "Implementare"
description: "Aflați unde se implementează fiecare proiect ChurchApps, de la API-uri AWS Lambda și aplicații web S3 până la build-uri mobile Expo și B1 Admin self-hosted pe Railway sau Docker."
---

# Implementare

<div class="article-intro">

ChurchApps folosește strategii de implementare diferite în funcție de tipul proiectului. API-urile se implementează pe AWS Lambda, aplicațiile web se implementează ca site-uri statice pe S3 cu CloudFront, iar aplicațiile mobile sunt construite și distribuite prin Expo EAS și magazinele de aplicații.

</div>

## Implementare pe tip de proiect

| Tip de proiect | Destinația implementării | Instrumente |
|-------------|-------------------|---------|
| [API-uri](./apis.md) | AWS Lambda | Serverless Framework v3 (runtime Node.js 24.x) |
| [Aplicații web](./web-apps.md) | S3 + CloudFront | Build static, sincronizare S3, invalidare CloudFront |
| [Aplicații mobile](./mobile.md) | Magazine de aplicații | Expo EAS Build + actualizări OTA |
| [Auto-găzduire (Railway)](./railway-template.md) | Railway | Șablon dintr-un clic: MySQL + Api + B1Admin + B1App |
| [Auto-găzduire (Docker)](./docker.md) | Orice gazdă Docker | Instalator dintr-o linie; imagini GHCR precompilate + Caddy, `./deploy/b1` pentru actualizare/backup/revenire |
| [Proxy Caddy pentru domenii personalizate](./caddy-proxy.md) | EC2 Windows (IP elastic `3.23.251.61`) | Caddyfile static + serviciu WinSW + sincronizare programată a hărții |
| FreeShow | Descărcare directă | Electron Builder (binare multiplatformă) |

## Medii

| Mediu | Scop |
|-------------|---------|
| `dev` | Dezvoltare locală |
| `demo` | Instanță demo publică; implementată la fiecare push pe `main`, astfel că servește și ca testare de preproducție |
| `prod` | Producție |

:::info
Fiecare mediu are propriul set de endpoint-uri API, baze de date și configurare. Setările specifice fiecărui mediu sunt gestionate prin fișiere `.env` local și prin AWS SSM Parameter Store în mediile implementate.
:::
