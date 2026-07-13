---
title: "API"
---

# API

<div class="article-intro">

I-ChurchApps API yi-**modular monolith** -- codebase yinye lesebentela ema-module lasi-6 edatha, module ngayinye inedatabase yayo. Lomumo uniketa inzuzo yekuhlelwa yema-microservice (imincele lecacile, tigcini tedatha letimele) kanye nekulula kwekusebenta kwe-deployment yinye.

</div>

## Ema-Module

| Module | Injongo |
|--------|---------|
| **Membership** | Bantfu, emacembu, emakhaya, timvumo |
| **Attendance** | Ema-service, ticgawu, imibhalo yekungena |
| **Content** | Emakhasi, tigaba, ema-element, kusakaza |
| **Giving** | Eminikelo, tikhwama, kucutjwa kwetinkhokhelo |
| **Messaging** | Tinkhulumo, tatiso, i-imeyili |
| **Doing** | Imisebenti, ema-plan, kwabelwa |

## Tech Stack

- **Runtime:** Node.js 22.x ne-TypeScript (ema-ES module)
- **Framework:** Express
- **Dependency Injection:** Inversify (kubhalisa imikhondvo ngema-decorator)
- **Database:** MySQL -- database yinye ku-module ngayinye, ngayinye inayo i-connection pool yayo
- **Auth:** Kutivakalisa lokusekelwe yi-JWT nge-`CustomAuthProvider`
- **Deployment:** AWS Lambda nge-Serverless Framework v3

## Ema-Port

| Protocol | Port | Incazelo |
|----------|------|-------------|
| HTTP | `8084` | I-REST API lesisekelo |
| WebSocket | `8087` | Kuxhumana kwe-socket kwesikhatsi lesiphila |

## Ema-Function e-Lambda

Nawudeployiwe ku-AWS, i-API isebenta njengema-function lasi-6 e-Lambda:

- **`web`** -- Iphatsa tonkhe ticelo te-HTTP
- **`socket`** -- Iphatsa kuxhumana kwe-WebSocket
- **`timer15Min`** -- Isebenta njalo ngemizuzu langu-30 kutatiso te-imeyili (ligama ngelemlandvo)
- **`timerMidnight`** -- Isebenta langa nga langa kuma-digest emeyili nemisebenti yekugcinwa
- **`timerScheduledTasks`** -- Isebenta langa nga langa kuma-automation lasadzingeka kanye nekuchubekisa i-workflow lesendlulile sikhatsi
- **`timerWebhooks`** -- Isebenta njalo ngemzuzu kuletfula ema-webhook laphumako lasesetja

## Emaphakheji Lahlanganyelwako

I-API incike kumaphakheji lamabili la-ChurchApps lahlanganyelwako:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Emathulusi lasisekelo (DateHelper, ApiHelper, njll.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Emathulusi e-Express server lafaka kutivakalisa, ema-helper edatabase, kanye nekuhlanganiswa ne-AWS

:::info
I-API isebentisa ema-ES module (`"type": "module"` ku-`package.json`). Cinisekisa kutsi kungeniswa kwakho kusebentisa i-syntax ye-ES module.
:::

## Kulesigaba

- **[Local Setup](./local-setup)** -- Klona, hlela, futsi usebentise i-API endzaweni yakho
- **[Database](./database)** -- Umumo we-database-nga-module ngayinye, ema-script e-schema, kanye netindlela tekufinyelela idatha
- **[Module Structure](./module-structure)** -- Ema-controller, ema-repository, ema-model, kanye nekutivakalisa
- **[API Keys](./api-keys)** -- Ema-token ekufinyelela lomuntfu kuma-script nema-connector
- **[Connected Apps (OAuth)](./connected-apps)** -- Inchubo ye-OAuth ye-multi-tenant kuma-app etitsatfu
- **[Webhooks](./webhooks)** -- Tfumela tatiso temicimbi kuletinye tinsita
- **[MCP Server](./mcp)** -- I-endpoint ye-Model Context Protocol lekhipha i-API kubasiti be-AI
- **[Endpoint Reference](./endpoints/)** -- Emibhalo lephelele ye-REST API kuwo wonkhe ema-module
