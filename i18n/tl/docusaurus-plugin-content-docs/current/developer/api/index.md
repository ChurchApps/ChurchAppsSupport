---
title: "API"
---

# API

<div class="article-intro">

Ang ChurchApps API ay isang **modular monolith** -- isang codebase na nagsisilbi sa anim na magkakaibang module, bawat isa ay may sariling database. Ang arkitekturang ito ay nagbibigay sa iyo ng mga benepisyong pang-organisasyon ng mga microservice (malinaw na mga hangganan, independiyenteng mga data store) na may simplisidad ng operasyon ng isang deployment.

</div>

## Mga Module

| Module | Layunin |
|--------|---------|
| **Membership** | Mga tao, grupo, sambahayan, pahintulot |
| **Attendance** | Mga serbisyo, sesyon, talaan ng check-in |
| **Content** | Mga pahina, seksyon, elemento, streaming |
| **Giving** | Mga donasyon, pondo, pagpoproseso ng bayad |
| **Messaging** | Mga pag-uusap, abiso, email |
| **Doing** | Mga gawain, plano, takdang-aralin |

## Tech Stack

- **Runtime:** Node.js 22.x na may TypeScript (ES modules)
- **Framework:** Express
- **Dependency Injection:** Inversify (decorator-based routing)
- **Database:** MySQL -- isang database bawat module, bawat isa ay may sariling connection pool
- **Auth:** JWT-based na authentication sa pamamagitan ng `CustomAuthProvider`
- **Deployment:** AWS Lambda sa pamamagitan ng Serverless Framework v3

## Mga Port

| Protocol | Port | Paglalarawan |
|----------|------|-------------|
| HTTP | `8084` | Pangunahing REST API |
| WebSocket | `8087` | Mga real-time na koneksyon ng socket |

## Mga Lambda Function

Kapag na-deploy sa AWS, ang API ay tumatakbo bilang apat na Lambda function:

- **`web`** -- Hina-handle ang lahat ng HTTP request
- **`socket`** -- Pinapamahalaan ang mga koneksyon ng WebSocket
- **`timer15Min`** -- Tumatakbo tuwing 15 minuto para sa mga abiso sa email
- **`timerMidnight`** -- Tumatakbo araw-araw para sa mga digest email at gawain ng maintenance

## Mga Shared Library

Ang API ay umaasa sa dalawang shared na ChurchApps package:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Mga base utility (DateHelper, ApiHelper, atbp.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Mga utility ng Express server kasama ang auth, mga helper ng database, at mga integrasyon sa AWS

:::info
Gumagamit ang API ng ES modules (`"type": "module"` sa `package.json`). Siguraduhing gumagamit ang iyong mga import ng ES module syntax.
:::

## Sa Seksyong Ito

- **[Lokal na Pag-setup](./local-setup)** -- I-clone, i-configure, at patakbuhin ang API nang lokal
- **[Database](./database)** -- Arkitekturang database-per-module, mga script ng schema, at mga pattern ng pag-access ng data
- **[Istraktura ng Module](./module-structure)** -- Mga controller, repository, modelo, at authentication
- **[Sanggunian ng Endpoint](./endpoints/)** -- Kumpletong dokumentasyon ng REST API para sa lahat ng module
