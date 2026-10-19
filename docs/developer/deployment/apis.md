---
title: "API Deployment"
---

# API Deployment

<div class="article-intro">

ChurchApps APIs are deployed as AWS Lambda functions using the Serverless Framework. This page covers the build, deploy, and configuration workflow for the demo and production environments.

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

Deploy to the demo environment:

```bash
npm run deploy-demo
```

Deploy to production:

```bash
npm run deploy-prod
```

In practice the Api is deployed by GitHub Actions: **Deploy Demo** runs on every push to `main`, and **Deploy Prod** is started manually (workflow dispatch). There is no longer a staging environment.

## Database Migrations

**Deploy Prod** applies pending database migrations as part of the deploy. The production databases only accept connections from inside the VPC, so right after `serverless deploy` the workflow invokes the `migrate` Lambda (`api-Prod-migrate`), which runs every module's pending migrations and returns `{ ok, environment, modules }`. If any module fails or is refused (for example a database with no migration history), the job fails so the schema is never left behind the code. **Rollback Prod** reverts the Lambda code only; migrations stay applied, so keep them additive. See [Server Admin -- Database Migrations](../server-admin#database-migrations) for checking status or running migrations by hand.

## What Gets Created

Each API deployment creates or updates the following AWS Lambda functions:

| Function | Purpose |
|----------|---------|
| `web` | HTTP request handler via API Gateway |
| `socket` | WebSocket connection handler |
| `timer15Min` | Scheduled task that runs every 30 minutes (the name is historical) |
| `timerMidnight` | Scheduled task that runs daily at midnight |
| `migrate` | Applies pending database migrations; invoked by the Deploy Prod workflow |

## Environment Configuration

In deployed environments, configuration is read from **AWS SSM Parameter Store** rather than `.env` files. This keeps secrets out of the deployment package and allows configuration changes without redeploying.

:::warning
Never commit production credentials to the repository. All sensitive configuration should be stored in AWS SSM Parameter Store and accessed at runtime.
:::

:::tip
Every merge to `main` deploys to the demo environment first. Check your change there (for example on [demo.b1.church](https://demo.b1.church)) before running Deploy Prod.
:::

## Related Articles

- **[Local API Setup](../api/local-setup)** -- Setting up the API for development
- **[Module Structure](../api/module-structure)** -- Understanding the Lambda function architecture
- **[Web App Deployment](./web-apps)** -- Deploying the frontend applications
