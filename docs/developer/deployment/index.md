---
title: "Deployment"
description: "Find where each ChurchApps project deploys, from AWS Lambda APIs and S3 web apps to Expo mobile builds and self-hosted B1 Admin on Railway or Docker."
---

# Deployment

<div class="article-intro">

ChurchApps uses different deployment strategies depending on the project type. APIs deploy to AWS Lambda, web apps deploy as static sites to S3 with CloudFront, and mobile apps are built and distributed through Expo EAS and the app stores.

</div>

## Deployment by Project Type

| Project Type | Deployment Target | Tooling |
|-------------|-------------------|---------|
| [APIs](./apis.md) | AWS Lambda | Serverless Framework v3 (Node.js 24.x runtime) |
| [Web Apps](./web-apps.md) | S3 + CloudFront | Static build, S3 sync, CloudFront invalidation |
| [Mobile Apps](./mobile.md) | App Stores | Expo EAS Build + OTA Updates |
| [Self-Hosting (Railway)](./railway-template.md) | Railway | One-click template: MySQL + Api + B1Admin + B1App |
| [Self-Hosting (Docker)](./docker.md) | Any Docker host | One-line installer; prebuilt GHCR images + Caddy, `./deploy/b1` upgrade/backup/rollback |
| [Caddy Custom-Domain Proxy](./caddy-proxy.md) | Windows EC2 (Elastic IP `3.23.251.61`) | Static Caddyfile + WinSW service + scheduled map sync |
| FreeShow | Direct download | Electron Builder (cross-platform binaries) |

## Environments

| Environment | Purpose |
|-------------|---------|
| `dev` | Local development |
| `demo` | Public demo instance; deployed on every push to `main`, so it doubles as pre-production testing |
| `prod` | Production |

:::info
Each environment has its own set of API endpoints, databases, and configuration. Environment-specific settings are managed through `.env` files locally and AWS SSM Parameter Store in deployed environments.
:::
