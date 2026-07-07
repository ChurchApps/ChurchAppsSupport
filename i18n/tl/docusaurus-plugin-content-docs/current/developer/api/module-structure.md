---
title: "Module Structure"
---

# Module Structure

<div class="article-intro">

Bawat API module ay sumusunod sa isang consistent internal structure na may controllers, repositories, models, at helpers. Ang pag-unawa sa layout na ito ay ginagawang straightforward na mag-navigate sa codebase at magdagdag ng bagong functionality sa anumang module.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-setup ang API nang lokal -- tingnan ang [Local API Setup](./local-setup)
- Suriin ang [Database](./database) architecture upang maunawaan ang data access layer

</div>

## Directory Layout

Ang modules ay nakatira sa `src/modules/{name}/`. Isang typical module ay naglalaman ng apat na directories:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces at types
└── helpers/        ← Module-specific business logic
```

Halimbawa, ang membership module:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

Ang anim na core data modules -- membership, attendance, content, giving, messaging, at doing -- ay lahat ay sumusunod sa layout na ito. Ilang specialized modules (tulad ng reporting, na nagsisilbi ng cross-module reports at walang sariling data) ay umuupo sa kanilang panig sa `src/modules/`.

## One Application, Many Modules

Ang API ay isang **modular monolith**: ang modules ay nagtutukoy ng boundaries ng code organization at data ownership, hindi separate services. Sa startup, ang bawat module's controllers ay naka-register sa isang single dependency-injection container sa likod ng isang Express application, kaya ang buong API ay bumubuo, tumatakbo, at nag-deploy bilang isang unit -- ang deployed functions na inilarawan sa ibaba ay lahat ng entry points sa parehong application.

Ang bawat module's routes ay nakatira sa ilalim ng isang URL prefix na tumutugma sa module name:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Ito ay nagpapanatili sa bawat module's API surface na self-contained habang ang clients ay nag-uusap pa rin sa isang single host.

## Controllers

Ang controllers ay tumutukoy ng API routes para sa isang module. Bawat module ay may sarili nitong base controller (halimbawa `MembershipBaseController`), na nag-extend ng shared `BaseController` -- mismo itong itinayo sa `CustomBaseController` mula sa `@churchapps/apihelper`. Ang routes ay naka-register sa Inversify decorators.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = authenticated user context
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

Ang `actionWrapper` ay nag-authenticate ng request at nag-hydrate ng `this.repos` na may module's repositories bago patakbuhin ang iyong action.

### Route Decorators

| Decorator | HTTP Method |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Ang `@controller("/base")` decorator ay nagtakda ng base path para sa lahat ng routes sa controller.

## Repositories

Ang repositories ay humawak ng lahat ng database operations. Walang ORM -- ang queries ay isinusulat gamit ang Kysely query builder, typed laban sa module's database schema. Bawat module's `db/index.ts` ay nagha-expose ng `getDb()` function na nagbabalik ng module's typed Kysely instance.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

Sa loob ng isang controller, ang module's repositories ay available bilang `this.repos`. Sa labas ng controllers, makuha ang mga ito sa pamamagitan ng `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Cross-Module Communication

Bawat module ay may-ari ng sarili nitong database (tingnan ang [Database](./database)), at isang module ay hindi kailanman nag-query ng iba pang module's tables nang direkta. Kapag isang module ay kailangan ng data na-own ng iba -- halimbawa, ang doing module na nag-resolve ng people mula sa membership -- ito ay napupunta sa pamamagitan ng owning module's **gateway** sa `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Bawat gateway (`MembershipModuleGateway`, `GivingModuleGateway`, at iba pa) ay isang TypeScript interface na tumutukoy kung aling operations ang nag-expose ng owning module sa natitirang API. Ang interface ay ang contract: ang current implementations ay nagsasaad ng owning module's database in-process, ngunit dahil ang callers ay nakadepende lamang sa interface, isang implementation ay maaaring baguhin -- halimbawa, para sa isa na gumagawa ng HTTP calls -- kung isang module ay kailanman mai-extract sa isang separate service.

:::info
Kung ang data na kailangan mo ay nakatira sa iba pang module at ang gateway nito ay hindi nag-expose ng operation para dito, palawakin ang gateway interface sa halip na umaabot sa iba pang module's repositories o database.
:::

## Authentication at Authorization

### JWT Authentication

Lahat ng requests ay naka-authenticate sa pamamagitan ng JWT tokens na hinahawakan ng `CustomAuthProvider`. Ang token ay automatically na-validate at ang authenticated user context (`au`) ay available sa bawat controller action.

### Permission Checks

Gamitin ang `au.checkAccess()` upang i-verify na ang current user ay may required permission. Ang permissions ay predefined constants na pinagsasama ang content type at isang action:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

Kung ang user ay nag-lack ng required permission, isang error response ay automatically na ibinabalik.

:::warning
Laging tawakin ang `au.checkAccess()` bago magsagawa ng anumang data operations. Hindi kailanman i-skip ang permission checks, kahit para sa seemingly read-only endpoints.
:::

## Environment Configuration

Ang `Environment` class ay humawak ng configuration sa buong environments:

- **Local development:** Nagsasaad mula sa `.env` file sa project root
- **Deployed environments:** Nagsasaad mula sa AWS SSM Parameter Store

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Ang abstraction na ito ay nangangahulugan na ang iyong code ay hindi kailangang malaman kung saan nanggagaling ang configuration.

## Lambda Functions

Kapag na-deploy sa AWS, ang API ay tumatakbo bilang anim na Lambda functions:

| Function | Purpose |
|----------|---------|
| `web` | Humawak ng lahat ng HTTP REST API requests |
| `socket` | Namamahala sa WebSocket connections para sa real-time features |
| `timer15Min` | Scheduled bawat 30 minuto para sa email notifications (ang pangalan ay historical) |
| `timerMidnight` | Scheduled araw-araw para sa digest emails at maintenance |
| `timerScheduledTasks` | Scheduled araw-araw para sa due automations at overdue workflow processing |
| `timerWebhooks` | Scheduled bawat minuto upang maghatid ng queued outbound webhooks |

:::info
Nang lokal, ang `web` function ay tumatakbo sa port 8084 at ang `socket` function ay tumatakbo sa port 8087. Ang timer functions ay maaaring i-trigger nang manu-mano sa development.
:::

## Related Articles

- **[Database](./database)** -- Connection strings, schema scripts, at data access patterns
- **[Local API Setup](./local-setup)** -- Full step-by-step setup guide
- **[ApiHelper](../shared-libraries/api-helper)** -- Ang shared library na nagbibigay ng `CustomBaseController` at auth middleware
