---
title: "API"
description: "Ipinapaliwanag ang modular monolith design ng ChurchApps API, anim na data module, tech stack, port, at Lambda function, may link sa setup at endpoint docs."
---

# API

<div class="article-intro">

Ang ChurchApps API ay isang **modular monolith** -- iisang codebase na naglilingkod sa anim na data module, bawat isa ay may sariling database. Ibinibigay ng arkitekturang ito ang mga benepisyo sa organisasyon ng microservices (malinaw na hangganan, independenteng data store) kasama ang pagiging simple sa operasyon ng iisang deployment.

</div>

## Mga Module

| Module | Layunin |
|--------|---------|
| **Membership** | Mga tao, grupo, household, permiso |
| **Attendance** | Mga serbisyo, session, record ng check-in |
| **Content** | Mga pahina, seksyon, elemento, streaming |
| **Giving** | Mga donasyon, fund, pagproseso ng bayad |
| **Messaging** | Mga usapan, notification, email |
| **Doing** | Mga task, plan, takda |

## Tech Stack

- **Runtime:** Node.js 24.x na may TypeScript (ES modules)
- **Framework:** Express
- **Dependency Injection:** Inversify (routing na nakabatay sa decorator)
- **Database:** MySQL -- isang database bawat module, bawat isa ay may sariling connection pool
- **Auth:** JWT-based na authentication sa pamamagitan ng `CustomAuthProvider`
- **Deployment:** AWS Lambda gamit ang Serverless Framework v3

## Mga Port

| Protocol | Port | Paglalarawan |
|----------|------|-------------|
| HTTP | `8084` | Pangunahing REST API |
| WebSocket | `8087` | Real-time na socket connection |

## Mga Lambda Function

Kapag na-deploy sa AWS, tumatakbo ang API bilang anim na Lambda function:

- **`web`** -- Humahawak sa lahat ng HTTP request
- **`socket`** -- Namamahala sa mga WebSocket connection
- **`timer15Min`** -- Tumatakbo kada 30 minuto para sa mga email notification (historikal ang pangalan)
- **`timerMidnight`** -- Tumatakbo araw-araw para sa digest email at maintenance task
- **`timerScheduledTasks`** -- Tumatakbo araw-araw para sa mga automation na dapat tumakbo at pagproseso ng overdue na workflow
- **`timerWebhooks`** -- Tumatakbo kada minuto para ihatid ang mga naka-queue na outbound webhook

## Mga Shared Library

Umaasa ang API sa dalawang shared ChurchApps package:

- **[`@churchapps/helpers`](../shared-libraries/helpers.md)** -- Mga pangunahing utility (DateHelper, ApiHelper, atbp.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper.md)** -- Mga utility ng Express server kabilang ang auth, database helper, at AWS integration

:::info
Gumagamit ang API ng ES modules (`"type": "module"` sa `package.json`). Siguraduhing ginagamit ng iyong mga import ang ES module syntax.
:::

## Nasa Seksyong Ito

- **[Local Setup](./local-setup.md)** -- I-clone, i-configure, at patakbuhin ang API nang lokal
- **[Database](./database.md)** -- Arkitekturang database-per-module, mga schema script, at mga pattern ng pag-access ng datos
- **[Module Structure](./module-structure.md)** -- Mga controller, repository, model, at authentication
- **[API Keys](./api-keys.md)** -- Mga personal na access token para sa mga script at connector
- **[Connected Apps (OAuth)](./connected-apps.md)** -- Multi-tenant na OAuth flow para sa mga third-party app
- **[Webhooks](./webhooks.md)** -- Magpadala ng push notification ng mga event sa mga external na sistema
- **[MCP Server](./mcp.md)** -- Model Context Protocol endpoint na naglalantad ng API sa mga AI assistant
- **[Endpoint Reference](./endpoints/index.md)** -- Kumpletong REST API documentation para sa lahat ng module
