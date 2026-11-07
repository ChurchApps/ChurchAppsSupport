---
title: "API"
description: "Explains the ChurchApps API's modular monolith design, its six data modules, tech stack, ports, and Lambda functions, with links to setup, database, auth, and endpoint docs for developers."
---

# API

<div class="article-intro">

The ChurchApps API is a **modular monolith** -- a single codebase that serves six data modules, each with its own database. This architecture gives you the organizational benefits of microservices (clear boundaries, independent data stores) with the operational simplicity of a single deployment.

</div>

## Modules

| Module | Purpose |
|--------|---------|
| **Membership** | People, groups, households, permissions |
| **Attendance** | Services, sessions, check-in records |
| **Content** | Pages, sections, elements, streaming |
| **Giving** | Donations, funds, payment processing |
| **Messaging** | Conversations, notifications, email |
| **Doing** | Tasks, plans, assignments |

## Tech Stack

- **Runtime:** Node.js 24.x with TypeScript (ES modules)
- **Framework:** Express
- **Dependency Injection:** Inversify (decorator-based routing)
- **Database:** MySQL -- one database per module, each with its own connection pool
- **Auth:** JWT-based authentication via `CustomAuthProvider`
- **Deployment:** AWS Lambda via Serverless Framework v3

## Ports

| Protocol | Port | Description |
|----------|------|-------------|
| HTTP | `8084` | Main REST API |
| WebSocket | `8087` | Real-time socket connections |

## Lambda Functions

When deployed to AWS, the API runs as six Lambda functions:

- **`web`** -- Handles all HTTP requests
- **`socket`** -- Manages WebSocket connections
- **`timer15Min`** -- Runs every 30 minutes for email notifications (the name is historical)
- **`timerMidnight`** -- Runs daily for digest emails and maintenance tasks
- **`timerScheduledTasks`** -- Runs daily for due automations and overdue workflow processing
- **`timerWebhooks`** -- Runs every minute to deliver queued outbound webhooks

## Shared Libraries

The API depends on two shared ChurchApps packages:

- **[`@churchapps/helpers`](../shared-libraries/helpers.md)** -- Base utilities (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper.md)** -- Express server utilities including auth, database helpers, and AWS integrations

:::info
The API uses ES modules (`"type": "module"` in `package.json`). Make sure your imports use the ES module syntax.
:::

## In This Section

- **[Local Setup](./local-setup.md)** -- Clone, configure, and run the API locally
- **[Database](./database.md)** -- Database-per-module architecture, schema scripts, and data access patterns
- **[Module Structure](./module-structure.md)** -- Controllers, repositories, models, and authentication
- **[API Keys](./api-keys.md)** -- Personal access tokens for scripts and connectors
- **[Connected Apps (OAuth)](./connected-apps.md)** -- Multi-tenant OAuth flow for third-party apps
- **[Webhooks](./webhooks.md)** -- Push event notifications to external systems
- **[MCP Server](./mcp.md)** -- Model Context Protocol endpoint that exposes the API to AI assistants
- **[Endpoint Reference](./endpoints/index.md)** -- Complete REST API documentation for all modules
