---
title: "Deployment"
---

# Deployment

<div class="article-intro">

ChurchApps uses different deployment strategies depending on the project type. APIs deploy to AWS Lambda, web apps deploy as static sites to S3 with CloudFront, and mobile apps are built and distributed through Expo EAS and the app stores.

</div>

## Deployment by Project Type

| Project Type | Deployment Target | Tooling |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 22.x runtime) |
| [Web Apps](./web-apps) | S3 + CloudFront | Static build, S3 sync, CloudFront invalidation |
| [Mobile Apps](./mobile) | App Stores | Expo EAS Build + OTA Updates |
| FreeShow | Direct download | Electron Builder (cross-platform binaries) |

## Environments

| Environment | Purpose |
|-------------|---------|
| `dev` | Local development |
| `demo` | Public demo instance |
| `staging` | Pre-production testing |
| `prod` | Production |

:::info
Each environment has its own set of API endpoints, databases, and configuration. Environment-specific settings are managed through `.env` files locally and AWS SSM Parameter Store in deployed environments.
:::
