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

Every module lives under `src/modules/{name}/` and contains four directories:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (direct SQL)
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
│   ├── PersonRepository.ts
│   ├── GroupRepository.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

## Controllers

Controllers define the API routes for a module. They extend `CustomBaseController` from `@churchapps/apihelper` and use Inversify decorators for route registration.

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = authenticated user context
      au.checkAccess("People", "View");
      const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
      return repos.person.loadByChurchId(au.churchId);
    });
  }

  @httpPost("/")
  public async save() {
    return this.actionWrapper(async (au) => {
      au.checkAccess("People", "Edit");
      const data = this.request.body;
      // ... save logic
    });
  }
}
```

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

Repositories handle all database operations using direct SQL via `DB.query()`. There is no ORM -- you write SQL directly.

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // INSERT or UPDATE logic
  }
}
```

Access repositories through the `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## Authentication and Authorization

### JWT Authentication

All requests are authenticated via JWT tokens handled by `CustomAuthProvider`. The token is validated automatically and the authenticated user context (`au`) is available in every controller action.

### Permission Checks

Use `au.checkAccess()` to verify the current user has the required permission:

```typescript
au.checkAccess("People", "View");    // Read access
au.checkAccess("People", "Edit");    // Write access
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
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

This abstraction means your code does not need to know where the configuration comes from.

## Lambda Functions

When deployed to AWS, the API runs as four Lambda functions:

| Function | Purpose |
|----------|---------|
| `web` | Handles all HTTP REST API requests |
| `socket` | Manages WebSocket connections for real-time features |
| `timer15Min` | Scheduled every 15 minutes for email notifications |
| `timerMidnight` | Scheduled daily for digest emails and maintenance |

:::info
Locally, the `web` function runs on port 8084 and the `socket` function runs on port 8087. The timer functions can be triggered manually during development.
:::

## Related Articles

- **[Database](./database)** -- Connection strings, schema scripts, and data access patterns
- **[Local API Setup](./local-setup)** -- Full step-by-step setup guide
- **[ApiHelper](../shared-libraries/api-helper)** -- The shared library that provides `CustomBaseController` and auth middleware
