---
title: "API Deployment"
---

# Pag-deploy ng API

<div class="article-intro">

Ang mga API ng ChurchApps ay dine-deploy bilang mga AWS Lambda function gamit ang Serverless Framework. Sakop ng pahinang ito ang workflow ng build, deploy, at configuration para sa demo at production environment.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang API nang lokal -- tingnan ang [Local API Setup](../api/local-setup)
- I-configure ang AWS credentials sa iyong makina
- Siguraduhing mayroon kang access sa target na AWS account

</div>

## Build

Ang mga API ay binubuo para sa production gamit ang nakalaang TypeScript config:

```bash
npm run build:prod
```

Ginagamit nito ang `tsconfig.prod.json` para i-compile ang proyekto para sa Lambda runtime.

## Deploy

I-deploy sa demo environment:

```bash
npm run deploy-demo
```

I-deploy sa production:

```bash
npm run deploy-prod
```

Sa aktwal na praktika, dine-deploy ang Api ng GitHub Actions: tumatakbo ang **Deploy Demo** sa bawat push sa `main`, at manu-manong sinisimulan ang **Deploy Prod** (workflow dispatch). Wala na ang staging environment.

## Mga Migration sa Database

Inilalapat ng **Deploy Prod** ang mga nakabinbing migration sa database bilang bahagi ng deploy. Ang mga production database ay tumatanggap lamang ng koneksyon mula sa loob ng VPC, kaya pagkatapos ng `serverless deploy`, ia-invoke ng workflow ang `migrate` Lambda (`api-Prod-migrate`), na nagpapatakbo ng lahat ng nakabinbing migration ng bawat module at nagbabalik ng `{ ok, environment, modules }`. Kung may module na pumalya o tinanggihan (halimbawa isang database na walang kasaysayan ng migration), papalya ang job para hindi kailanman maiwan ang schema sa likod ng code. Ang **Rollback Prod** ay nagbabalik lamang ng code ng Lambda; nananatiling nakalapat ang mga migration, kaya panatilihing additive ang mga ito. Tingnan ang [Server Admin -- Database Migrations](../server-admin#database-migrations) para sa pagsuri ng status o pagpapatakbo ng mga migration nang manu-mano.

## Ano ang Nagagawa

Bawat deployment ng API ay gumagawa o nag-a-update ng mga sumusunod na AWS Lambda function:

| Function | Layunin |
|----------|---------|
| `web` | HTTP request handler sa pamamagitan ng API Gateway |
| `socket` | WebSocket connection handler |
| `timer15Min` | Naka-iskedyul na gawain na tumatakbo kada 30 minuto (historikal ang pangalan) |
| `timerMidnight` | Naka-iskedyul na gawain na tumatakbo araw-araw sa hatinggabi |
| `migrate` | Naglalapat ng mga nakabinbing migration sa database; ini-invoke ng Deploy Prod workflow |

## Configuration ng Environment

Sa mga naka-deploy na environment, binabasa ang configuration mula sa **AWS SSM Parameter Store** sa halip na mula sa mga `.env` file. Pinananatiling wala sa deployment package ang mga secret at nagbibigay-daan na mabago ang configuration nang hindi nagre-redeploy.

:::warning
Huwag kailanman i-commit ang mga production credential sa repository. Dapat nakaimbak sa AWS SSM Parameter Store at kinukuha sa runtime ang lahat ng sensitibong configuration.
:::

:::tip
Bawat merge sa `main` ay nagde-deploy muna sa demo environment. Suriin ang iyong pagbabago roon (halimbawa sa [demo.b1.church](https://demo.b1.church)) bago patakbuhin ang Deploy Prod.
:::

## Mga Kaugnay na Artikulo

- **[Local API Setup](../api/local-setup)** -- Pag-set up ng API para sa development
- **[Module Structure](../api/module-structure)** -- Pag-unawa sa arkitektura ng Lambda function
- **[Web App Deployment](./web-apps)** -- Pag-deploy ng mga frontend application
