---
title: "Pag-deploy ng API"
---

# Pag-deploy ng API

<div class="article-intro">

Ang mga ChurchApps API ay dine-deploy bilang mga AWS Lambda function gamit ang Serverless Framework. Sinasaklaw ng pahinang ito ang daloy ng trabaho sa pagbuo, pag-deploy, at configuration para sa mga kapaligiran ng staging at production.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-setup ang API nang lokal -- tingnan ang [Lokal na Pag-setup ng API](../api/local-setup)
- I-configure ang mga AWS credential sa iyong makina
- Siguraduhing may access ka sa target na AWS account

</div>

## Pagbuo

Ang mga API ay binubuo para sa production gamit ang isang dedikadong TypeScript config:

```bash
npm run build:prod
```

Gumagamit ito ng `tsconfig.prod.json` upang i-compile ang proyekto para sa Lambda runtime.

## Pag-deploy

Mag-deploy sa staging:

```bash
npm run deploy-staging
```

Mag-deploy sa production:

```bash
npm run deploy-prod
```

## Ano ang Nililikha

Ang bawat pag-deploy ng API ay lumilikha o nag-a-update ng mga sumusunod na AWS Lambda function:

| Function | Layunin |
|----------|---------|
| `web` | HTTP request handler sa pamamagitan ng API Gateway |
| `socket` | WebSocket connection handler |
| `timer15Min` | Naka-schedule na gawain na tumatakbo tuwing 15 minuto |
| `timerMidnight` | Naka-schedule na gawain na tumatakbo araw-araw sa hatinggabi |

## Configuration ng Kapaligiran

Sa mga na-deploy na kapaligiran, ang configuration ay binabasa mula sa **AWS SSM Parameter Store** sa halip na mga `.env` file. Pinapanatili nitong wala ang mga lihim sa deployment package at pinapayagan ang mga pagbabago sa configuration nang hindi nagre-redeploy.

:::warning
Huwag kailanman mag-commit ng mga production credential sa repository. Lahat ng sensitibong configuration ay dapat na naka-imbak sa AWS SSM Parameter Store at ina-access sa runtime.
:::

:::tip
Upang subukan ang isang deployment nang hindi naaapektuhan ang production, palaging mag-deploy muna sa staging gamit ang `npm run deploy-staging` at i-verify ang mga pagbabago bago mag-promote sa prod.
:::

## Mga Kaugnay na Artikulo

- **[Lokal na Pag-setup ng API](../api/local-setup)** -- Pag-setup ng API para sa development
- **[Istraktura ng Module](../api/module-structure)** -- Pag-unawa sa arkitektura ng Lambda function
- **[Pag-deploy ng Web App](./web-apps)** -- Pag-deploy ng mga frontend na aplikasyon
