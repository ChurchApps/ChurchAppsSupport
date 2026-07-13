---
title: "Kufakwa Kwe-API"
---

# Kufakwa Kwe-API

<div class="article-intro">

Ema-API e-ChurchApps afakwa njengemisebenti ye-AWS Lambda kusetjentiswa i-Serverless Framework. Lelikhasi likhuluma ngendlela yekwakha (build), kufaka (deploy), kanye nekuhlelwa ku-staging nase-production.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekutsi Ucale</h4>

- Hlela i-API ngasekhaya -- bona [API Local Setup](../api/local-setup)
- Hlela ema-credential e-AWS emshinini wakho
- Chaka kutsi unemvumo yekufinyelela ku-akhawunti ye-AWS lehlosiwe

</div>

## Kwakha (Build)

Ema-API akhiwa ku-production kusetjentiswa i-TypeScript config lekhetsekile:

```bash
npm run build:prod
```

Loku kusebentisa i-`tsconfig.prod.json` kuhlanganisa (compile) liphrojekthi kutsi lisebente ku-Lambda runtime.

## Kufaka (Deploy)

Faka ku-staging:

```bash
npm run deploy-staging
```

Faka ku-production:

```bash
npm run deploy-prod
```

## Loko Lokwakhiwako

Ngakunye kufakwa kwe-API kwakha kumbe kubuyeketa lemisebenti ye-AWS Lambda lelandzelako:

| Umsebenti | Injongo |
|----------|---------|
| `web` | Umphatsi weticelo te-HTTP ngeluhambo lwe-API Gateway |
| `socket` | Umphatsi wekuxhumana kwe-WebSocket |
| `timer15Min` | Umsebenti lohlelekile logijima nga-15 emaminithi |
| `timerMidnight` | Umsebenti lohlelekile logijima onkhe malanga ngesikhatsi sebusuku (midnight) |

## Kuhlelwa Kwendzawo Yekusebenta

Etindzaweni letifakiwe, kuhlelwa kufundvwa ku-**AWS SSM Parameter Store** esikhundleni semafayela e-`.env`. Loku kugcina imfihlo ingekho ku-phakheji yekufakwa futsi kuvumela kushintjwa kwekuhlelwa ngaphandle kwekufaka kabusha (redeploy).

:::warning
Ungakemuva ufake ema-credential e-production ku-repository. Konkhe kuhlelwa lokubalulekile kufanele kugcinwe ku-AWS SSM Parameter Store futsi kufinyelelwe ngesikhatsi se-runtime.
:::

:::tip
Kute uhlole kufakwa ngaphandle kwekutsintsa i-production, faka njalo ku-staging kucala kusetjentiswa i-`npm run deploy-staging` bese uchaka lushintjo ngaphambi kwekukhushulela (promote) ku-prod.
:::

## Emahloko Lahlobene

- **[API Local Setup](../api/local-setup)** -- Kuhlela i-API kutfutfukiswa
- **[Simo Semodyuli](../api/module-structure)** -- Kucondza sakhiwo semisebenti ye-Lambda
- **[Kufakwa Kwe-Web App](./web-apps)** -- Kufaka tinhlelo te-frontend
