---
title: "Pag-deploy"
---

# Pag-deploy

<div class="article-intro">

Iba-iba ang deployment strategy ng ChurchApps depende sa uri ng proyekto. Dine-deploy ang mga API sa AWS Lambda, ang mga web app ay dine-deploy bilang static sites sa S3 na may CloudFront, at ang mga mobile app ay binubuo at ipinamamahagi sa pamamagitan ng Expo EAS at mga app store.

</div>

## Deployment ayon sa Uri ng Proyekto

| Uri ng Proyekto | Deployment Target | Tooling |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x runtime) |
| [Web Apps](./web-apps) | S3 + CloudFront | Static build, S3 sync, CloudFront invalidation |
| [Mobile Apps](./mobile) | App Stores | Expo EAS Build + OTA Updates |
| [Self-Hosting (Railway)](./railway-template) | Railway | One-click template: MySQL + Api + B1Admin + B1App |
| [Self-Hosting (Docker)](./docker) | Anumang Docker host | One-line installer; prebuilt GHCR images + Caddy, `./deploy/b1` upgrade/backup/rollback |
| [Caddy Custom-Domain Proxy](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Static Caddyfile + WinSW service + scheduled map sync |
| FreeShow | Direktang download | Electron Builder (cross-platform binaries) |

## Mga Environment

| Environment | Layunin |
|-------------|-------------------|
| `dev` | Lokal na development |
| `demo` | Pampublikong demo instance; dine-deploy sa bawat push sa `main`, kaya nagsisilbi rin itong pre-production testing |
| `prod` | Production |

:::info
Ang bawat environment ay may sariling hanay ng API endpoints, database, at configuration. Ang mga setting na partikular sa environment ay pinamamahalaan sa pamamagitan ng mga `.env` file nang lokal at ng AWS SSM Parameter Store sa mga naka-deploy na environment.
:::
