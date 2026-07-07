---
title: "API"
---

# API

<div class="article-intro">

Ang ChurchApps API ay isang **modular monolith** -- isang code base na nagsisilbi sa anim na data modules, bawat isa ay may sariling database. Ang architecture na ito ay nagbibigay sa iyo ng mga organizational benefits ng microservices (malinaw na boundaries, independent data stores) na may operational simplicity ng isang single deployment.

</div>

## Modules

| Module | Purpose |
|--------|---------|
| **Membership** | Mga tao, grupo, sambahayan, permissions |
| **Attendance** | Mga serbisyo, sesyon, check-in records |
| **Content** | Mga pahina, sections, elements, streaming |
| **Giving** | Mga donasyon, pondo, payment processing |
| **Messaging** | Mga pag-usap, notipikasyon, email |
| **Doing** | Mga gawain, plano, assignment |

## Tech Stack

- **Runtime:** Node.js 22.x na may TypeScript (ES modules)
- **Framework:** Express
- **Dependency Injection:** Inversify (decorator-based routing)
- **Database:** MySQL -- isang database bawat module, bawat isa ay may sariling connection pool
- **Auth:** JWT-based authentication sa pamamagitan ng `CustomAuthProvider`
- **Deployment:** AWS Lambda via Serverless Framework v3

## Ports

| Protocol | Port | Description |
|----------|------|-------------|
| HTTP | `8084` | Main REST API |
| WebSocket | `8087` | Real-time socket connections |

## Lambda Functions

Kapag deployed sa AWS, ang API ay tumatakbo bilang anim na Lambda functions:

- **`web`** -- Humawak ng lahat ng HTTP requests
- **`socket`** -- Namamahala sa WebSocket connections
- **`timer15Min`** -- Tumatakbo bawat 30 minuto para sa email notifications (ang pangalan ay historical)
- **`timerMidnight`** -- Tumatakbo araw-araw para sa digest emails at maintenance tasks
- **`timerScheduledTasks`** -- Tumatakbo araw-araw para sa due automations at overdue workflow processing
- **`timerWebhooks`** -- Tumatakbo bawat minuto upang maghatid ng queued outbound webhooks

## Shared Libraries

Ang API ay nakadepende sa dalawang shared ChurchApps packages:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Base utilities (DateHelper, ApiHelper, atbp.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express server utilities kasama ang auth, database helpers, at AWS integrations

:::info
Ang API ay gumagamit ng ES modules (`"type": "module"` sa `package.json`). Siguraduhing ang iyong imports ay gumagamit ng ES module syntax.
:::

## Sa Seksyong Ito

- **[Local Setup](./local-setup)** -- I-clone, i-configure, at patakbuhin ang API nang lokal
- **[Database](./database)** -- Database-per-module architecture, schema scripts, at data access patterns
- **[Module Structure](./module-structure)** -- Controllers, repositories, models, at authentication
- **[API Keys](./api-keys)** -- Personal access tokens para sa scripts at connectors
- **[Connected Apps (OAuth)](./connected-apps)** -- Multi-tenant OAuth flow para sa third-party apps
- **[Webhooks](./webhooks)** -- Push event notifications sa external systems
- **[MCP Server](./mcp)** -- Model Context Protocol endpoint na nagha-expose ng API sa AI assistants
- **[Endpoint Reference](./endpoints/)** -- Complete REST API documentation para sa lahat ng modules
