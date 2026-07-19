---
title: "Deployment"
---

# Deployment

<div class="article-intro">

Ang ChurchApps ay gumagamit ng iba't ibang deployment strategies depende sa project type. Ang APIs ay nag-deploy sa AWS Lambda, ang web apps ay nag-deploy bilang static sites sa S3 na may CloudFront, at ang mobile apps ay binubuo at distributed sa pamamagitan ng Expo EAS at ang app stores.

</div>

## Deployment by Project Type

| Project Type | Deployment Target | Tooling |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x runtime) |
| [Web Apps](./web-apps) | S3 + CloudFront | Static build, S3 sync, CloudFront invalidation |
| [Mobile Apps](./mobile) | App Stores | Expo EAS Build + OTA Updates |
| [Caddy Custom-Domain Proxy](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Static Caddyfile + WinSW service + scheduled map sync |
| FreeShow | Direct download | Electron Builder (cross-platform binaries) |

## Environments

| Environment | Purpose |
|-------------|---------|
| `dev` | Local development |
| `demo` | Public demo instance |
| `staging` | Pre-production testing |
| `prod` | Production |

:::info
Bawat environment ay may sarili nitong set ng API endpoints, databases, at configuration. Ang environment-specific settings ay pinamamahalaan sa pamamagitan ng `.env` files nang lokal at AWS SSM Parameter Store sa deployed environments.
:::
