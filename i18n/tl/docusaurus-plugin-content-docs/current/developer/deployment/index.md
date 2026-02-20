---
title: "Pag-deploy"
---

# Pag-deploy

<div class="article-intro">

Gumagamit ang ChurchApps ng iba't ibang estratehiya sa pag-deploy depende sa uri ng proyekto. Ang mga API ay dine-deploy sa AWS Lambda, ang mga web app ay dine-deploy bilang mga static site sa S3 na may CloudFront, at ang mga mobile app ay binubuo at ipinamamahagi sa pamamagitan ng Expo EAS at mga app store.

</div>

## Pag-deploy ayon sa Uri ng Proyekto

| Uri ng Proyekto | Target ng Pag-deploy | Kasangkapan |
|-------------|-------------------|---------|
| [Mga API](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x runtime) |
| [Mga Web App](./web-apps) | S3 + CloudFront | Static build, S3 sync, CloudFront invalidation |
| [Mga Mobile App](./mobile) | Mga App Store | Expo EAS Build + OTA Updates |
| FreeShow | Direktang pag-download | Electron Builder (cross-platform na mga binary) |

## Mga Kapaligiran

| Kapaligiran | Layunin |
|-------------|---------|
| `dev` | Lokal na development |
| `demo` | Pampublikong demo instance |
| `staging` | Pre-production na pagsubok |
| `prod` | Production |

:::info
Ang bawat kapaligiran ay may sariling hanay ng mga API endpoint, database, at configuration. Ang mga setting na partikular sa kapaligiran ay pinapamahalaan sa pamamagitan ng mga `.env` file nang lokal at AWS SSM Parameter Store sa mga na-deploy na kapaligiran.
:::
