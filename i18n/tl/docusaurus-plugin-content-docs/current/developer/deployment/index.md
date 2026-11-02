---
title: "Deployment"
---

# Deployment

<div class="article-intro">

Gumagamit ang ChurchApps ng iba't ibang estratehiya sa deployment depende sa uri ng proyekto. Nagde-deploy ang mga API sa AWS Lambda, ang mga web app ay nagde-deploy bilang static site sa S3 gamit ang CloudFront, at ang mga mobile app ay ginagawa at ipinamamahagi sa pamamagitan ng Expo EAS at ng mga app store.

</div>

## Deployment ayon sa Uri ng Proyekto

| Uri ng Proyekto | Target ng Deployment | Tooling |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 24.x runtime) |
| [Web Apps](./web-apps) | S3 + CloudFront | Static build, S3 sync, CloudFront invalidation |
| [Mobile Apps](./mobile) | App Stores | Expo EAS Build + OTA Updates |
| [Self-Hosting (Railway)](./railway-template) | Railway | One-click template: MySQL + Api + B1Admin + B1App |
| [Self-Hosting (Docker)](./docker) | Anumang Docker host | One-line installer; prebuilt na GHCR image + Caddy, `./deploy/b1` upgrade/backup/rollback |
| [Caddy Custom-Domain Proxy](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Static na Caddyfile + WinSW service + scheduled map sync |
| FreeShow | Direktang download | Electron Builder (cross-platform na binary) |

## Mga Environment

| Environment | Layunin |
|-------------|---------|
| `dev` | Lokal na development |
| `demo` | Pampublikong demo instance; dine-deploy sa bawat push sa `main`, kaya nagsisilbi rin itong pre-production testing |
| `prod` | Production |

:::info
Bawat environment ay may sariling hanay ng API endpoint, database, at configuration. Ang mga setting na partikular sa environment ay pinamamahalaan sa pamamagitan ng mga file na `.env` nang lokal, at ng AWS SSM Parameter Store sa mga naka-deploy na environment.
:::
