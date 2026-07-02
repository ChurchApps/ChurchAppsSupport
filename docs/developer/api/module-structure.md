---
title: "Module Structure"
---

# Module Structure

<div class="article-intro">

Each API module follows a consistent internal structure with controllers, repositories, models, and helpers. Understanding this layout makes it straightforward to navigate the codebase and add new functionality to any module.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up the API locally -- see [Local API Setup](./local-setup)
- Review the [Database](./database) architecture to understand the data access layer

</div>

## Directory Layout

Modules live under `src/modules/{name}/`. A typical module contains four directories:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

For example, the membership module:

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

The six core data modules -- membership, attendance, content, giving, messaging, and doing -- all follow this layout. A few specialized modules (such as reporting, which serves cross-module reports and owns no data of its own) sit alongside them under `src/modules/`.

## One Application, Many Modules

The API is a **modular monolith**: modules mark boundaries of code organization and data ownership, not separate services. At startup, every module's controllers are registered into a single dependency-injection container behind one Express application, so the entire API builds, runs, and deploys as one unit -- the deployed functions described below are all entry points into this same application.

Every module's routes live under a URL prefix matching the module name:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

This keeps each module's API surface self-contained while clients still talk to a single host.

## Controllers

Controllers define the API routes for a module. Each module has its own base controller (for example `MembershipBaseController`), which extends the shared `BaseController` -- itself built on `CustomBaseController` from `@churchapps/apihelper`. Routes are registered with Inversify decorators.

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

The `actionWrapper` authenticates the request and hydrates `this.repos` with the module's repositories before running your action.

### Route Decorators

| Decorator | HTTP Method |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

The `@controller("/base")` decorator sets the base path for all routes in the controller.

## Repositories

Repositories handle all database operations. There is no ORM -- queries are written with the Kysely query builder, typed against the module's database schema. Each module's `db/index.ts` exposes a `getDb()` function that returns the module's typed Kysely instance.

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

Inside a controller, the module's repositories are available as `this.repos`. Outside controllers, obtain them through `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Cross-Module Communication

Each module owns its own database (see [Database](./database)), and a module never queries another module's tables directly. When one module needs data owned by another -- for example, the doing module resolving people from membership -- it goes through the owning module's **gateway** in `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Every gateway (`MembershipModuleGateway`, `GivingModuleGateway`, and so on) is a TypeScript interface defining exactly which operations the owning module exposes to the rest of the API. The interface is the contract: the current implementations read the owning module's database in-process, but because callers depend only on the interface, an implementation could be swapped -- for example, for one that makes HTTP calls -- if a module were ever extracted into a separate service.

:::info
If the data you need lives in another module and its gateway does not expose an operation for it, extend the gateway interface rather than reaching into the other module's repositories or database.
:::

## Authentication and Authorization

### JWT Authentication

All requests are authenticated via JWT tokens handled by `CustomAuthProvider`. The token is validated automatically and the authenticated user context (`au`) is available in every controller action.

### Permission Checks

Use `au.checkAccess()` to verify the current user has the required permission. Permissions are predefined constants combining a content type and an action:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

If the user lacks the required permission, an error response is returned automatically.

:::warning
Always call `au.checkAccess()` before performing any data operations. Never skip permission checks, even for seemingly read-only endpoints.
:::

## Environment Configuration

The `Environment` class handles configuration across environments:

- **Local development:** Reads from the `.env` file in the project root
- **Deployed environments:** Reads from AWS SSM Parameter Store

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

This abstraction means your code does not need to know where the configuration comes from.

## Lambda Functions

When deployed to AWS, the API runs as six Lambda functions:

| Function | Purpose |
|----------|---------|
| `web` | Handles all HTTP REST API requests |
| `socket` | Manages WebSocket connections for real-time features |
| `timer15Min` | Scheduled every 30 minutes for email notifications (the name is historical) |
| `timerMidnight` | Scheduled daily for digest emails and maintenance |
| `timerScheduledTasks` | Scheduled daily for due automations and overdue workflow processing |
| `timerWebhooks` | Scheduled every minute to deliver queued outbound webhooks |

:::info
Locally, the `web` function runs on port 8084 and the `socket` function runs on port 8087. The timer functions can be triggered manually during development.
:::

## Related Articles

- **[Database](./database)** -- Connection strings, schema scripts, and data access patterns
- **[Local API Setup](./local-setup)** -- Full step-by-step setup guide
- **[ApiHelper](../shared-libraries/api-helper)** -- The shared library that provides `CustomBaseController` and auth middleware
