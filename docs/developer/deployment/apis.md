---
title: "API Deployment"
---

# API Deployment

<div class="article-intro">

ChurchApps APIs are deployed as AWS Lambda functions using the Serverless Framework. This page covers the build, deploy, and configuration workflow for staging and production environments.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up the API locally -- see [Local API Setup](../api/local-setup)
- Configure AWS credentials on your machine
- Ensure you have access to the target AWS account

</div>

## Build

APIs are built for production using a dedicated TypeScript config:

```bash
npm run build:prod
```

This uses `tsconfig.prod.json` to compile the project for the Lambda runtime.

## Deploy

Deploy to staging:

```bash
npm run deploy-staging
```

Deploy to production:

```bash
npm run deploy-prod
```

## What Gets Created

Each API deployment creates or updates the following AWS Lambda functions:

| Function | Purpose |
|----------|---------|
| `web` | HTTP request handler via API Gateway |
| `socket` | WebSocket connection handler |
| `timer15Min` | Scheduled task that runs every 15 minutes |
| `timerMidnight` | Scheduled task that runs daily at midnight |

## Environment Configuration

In deployed environments, configuration is read from **AWS SSM Parameter Store** rather than `.env` files. This keeps secrets out of the deployment package and allows configuration changes without redeploying.

:::warning
Never commit production credentials to the repository. All sensitive configuration should be stored in AWS SSM Parameter Store and accessed at runtime.
:::

:::tip
To test a deployment without affecting production, always deploy to staging first using `npm run deploy-staging` and verify the changes before promoting to prod.
:::

## Related Articles

- **[Local API Setup](../api/local-setup)** -- Setting up the API for development
- **[Module Structure](../api/module-structure)** -- Understanding the Lambda function architecture
- **[Web App Deployment](./web-apps)** -- Deploying the frontend applications
