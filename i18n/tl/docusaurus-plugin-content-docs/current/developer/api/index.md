---
title: "API"
---

# API

<div class="article-intro">

Ang ChurchApps API ay isang **modular monolith** -- isang single codebase na nagsisilbi sa anim na natatanging module, bawat isa ay may sariling database. Ang architektura na ito ay nagbibigay sa iyo ng mga benepisyo ng organisasyon ng microservices (malinaw na hangganan, independyente na mga data store) na may operational simplicity ng isang deployment.

</div>

## Mga Module

| Module | Layunin |
|--------|---------|
| **Membership** | Mga tao, grupo, pamilya, mga pahintulot |
| **Attendance** | Mga serbisyo, sesyon, mga record ng check-in |
| **Content** | Mga pahina, seksyon, elemento, streaming |
| **Giving** | Mga donasyon, pundo, pagpoproseso ng bayad |
| **Messaging** | Mga pag-usap, notification, email |
| **Doing** | Mga gawain, mga plano, mga assignment |

## Tech Stack

- **Runtime:** Node.js 22.x na may TypeScript (ES modules)
- **Framework:** Express
- **Dependency Injection:** Inversify (decorator-based routing)
- **Database:** MySQL -- isang database bawat module, bawat isa ay may sariling connection pool
- **Auth:** JWT-based authentication via `CustomAuthProvider`
- **Deployment:** AWS Lambda via Serverless Framework v3

## Mga Port

| Protocol | Port | Paglalarawan |
|----------|------|-------------|
| HTTP | `8084` | Main REST API |
| WebSocket | `8087` | Real-time socket connections |

## Lambda Functions

Kapag na-deploy sa AWS, ang API ay tumatakbo bilang apat na Lambda functions:

- **`web`** -- Humahawak ng lahat ng HTTP requests
- **`socket`** -- Namamahal sa WebSocket connections
- **`timer15Min`** -- Tumatakbo bawat 15 minuto para sa email notifications
- **`timerMidnight`** -- Tumatakbo araw-araw para sa digest emails at maintenance tasks

## Mga Shared Libraries

Ang API ay umaasa sa dalawang shared ChurchApps packages:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Base utilities (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express server utilities kabilang ang auth, database helpers, at AWS integrations

:::info
Ang API ay gumagamit ng ES modules (`"type": "module"` sa `package.json`). Siguraduhin na ang iyong imports ay gumagamit ng ES module syntax.
:::

## Sa Seksyong Ito

- **[Local Setup](./local-setup)** -- Clone, configure, at patakbuhin ang API locally
- **[Database](./database)** -- Database-per-module architecture, schema scripts, at data access patterns
- **[Module Structure](./module-structure)** -- Controllers, repositories, models, at authentication
- **[API Keys](./api-keys)** -- Personal access tokens para sa scripts at connectors
- **[Connected Apps (OAuth)](./connected-apps)** -- Multi-tenant OAuth flow para sa third-party apps
- **[Webhooks](./webhooks)** -- Itulak ang event notifications sa external systems
- **[MCP Server](./mcp)** -- Model Context Protocol endpoint na naglalantad ng API sa AI assistants
- **[Endpoint Reference](./endpoints/)** -- Kumpleto REST API documentation para sa lahat ng module
