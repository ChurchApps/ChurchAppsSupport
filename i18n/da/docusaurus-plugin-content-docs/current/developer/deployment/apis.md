---
title: "API-installation"
---

# API-installation

<div class="article-intro">

ChurchApps API'er implementeres som AWS Lambda-funktioner ved hjælp af Serverless Framework. Denne side dækker build-, deploy- og konfigurationsworkflow for staging- og produktionsmiljøer.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Opsætning af API lokalt -- se [Lokalt API Setup](../api/local-setup)
- Konfigurér AWS-legitimationsoplysninger på din maskine
- Sørg for, at du har adgang til AWS-kontoen for målet

</div>

## Byg

API'er bygges til produktion ved hjælp af en dedikeret TypeScript-konfiguration:

```bash
npm run build:prod
```

Dette bruger `tsconfig.prod.json` til at kompilere projektet til Lambda-kørtid.

## Install

Installer til staging:

```bash
npm run deploy-staging
```

Installer til produktion:

```bash
npm run deploy-prod
```

## Hvad der skabes

Hver API-installation opretter eller opdaterer følgende AWS Lambda-funktioner:

| Function | Formål |
|----------|---------|
| `web` | HTTP-anmodningshandler via API Gateway |
| `socket` | WebSocket-forbindelseshandler |
| `timer15Min` | Planlagt opgave, der køres hver 15. minut |
| `timerMidnight` | Planlagt opgave, der køres dagligt ved midnat |

## Miljøkonfiguration

I implementerede miljøer læses konfigurationen fra **AWS SSM Parameter Store** i stedet for `.env`-filer. Dette holder hemmeligheder ud af installationspakken og tillader konfigurationsændringer uden at genimplementere.

:::warning
Commit aldrig produktionslegitimationsoplysninger til lageret. Al følsom konfiguration skal gemmes i AWS SSM Parameter Store og tilgås under kørtid.
:::

:::tip
For at teste en installation uden at påvirke produktionen skal du altid installere til staging først ved hjælp af `npm run deploy-staging` og bekræfte ændringerne, før du promoverer til prod.
:::

## Relaterede artikler

- **[Lokalt API-setup](../api/local-setup)** -- Opsætning af API'en til udvikling
- **[Modulstruktur](../api/module-structure)** -- Forståelse af Lambda-funktionsarkitektur
- **[Webapp-installation](./web-apps)** -- Installation af frontend-applikationer
