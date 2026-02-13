# Deployment

ChurchApps uses different deployment strategies depending on the project type.

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
