---
title: "Database"
---

# Database

<div class="article-intro">

The ChurchApps API uses a **database-per-module** architecture. Each of the six data modules has its own MySQL database with an independent connection pool, providing clear data boundaries while keeping everything within a single deployment.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Install **MySQL 8.0+** -- see [Prerequisites](../setup/prerequisites)
- Configure database connection strings in your `.env` file -- see [Environment Variables](../setup/environment-variables)

</div>

## Architecture Overview

```
Api
├── membership_db   ← People, groups, permissions
├── attendance_db   ← Services, sessions, records
├── content_db      ← Pages, sections, elements
├── giving_db       ← Donations, funds, payments
├── messaging_db    ← Conversations, notifications
└── doing_db        ← Tasks, plans, assignments
```

### Key Design Decisions

- **One database per module** -- Each module maintains its own MySQL database with a dedicated connection pool (managed by `KyselyPool`). This keeps modules decoupled and allows independent schema evolution.
- **Exclusive ownership** -- A module's tables are read and written only by that module's own code. When another module needs the data, it calls the owning module's gateway rather than querying the tables itself -- see [Cross-Module Communication](./module-structure#cross-module-communication).
- **Repository pattern without an ORM** -- All data access goes through repository classes that build typed SQL with the Kysely query builder against the module's schema. This gives full control over query performance and behavior.
- **Multi-tenant by design** -- Every query is scoped by `churchId`. All tables include a `churchId` column, and the repository layer enforces tenant isolation automatically.

## Connection Strings

Each module's database connection is configured in `.env` using standard MySQL connection string format:

```
mysql://user:password@host:port/database
```

For example, a local development setup might look like:

Each module reads its connection from an environment variable named `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
In production, connection strings are stored in AWS SSM Parameter Store and read by the `Environment` class at startup.
:::

## Schema Scripts

Table schemas are defined as Kysely migrations in the `tools/migrations/` directory, organized by module:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migrations define table creation, indexes, and schema changes. The `tools/dbScripts/` directory holds demo and seed data that can be loaded on top of the schema.

## Database Initialization

### Initialize all databases

```bash
npm run initdb
```

This creates all six databases and runs the migrations for each one.

### Initialize a single module

```bash
npm run initdb -- --module=membership
```

:::tip
When working on a specific module, you can re-initialize just that module's database without affecting the others.
:::

## Data Access Pattern

Repositories build queries with the Kysely query builder against the module's typed database schema, obtained through the module's `getDb()` function. A typical repository method looks like this:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repositories are obtained via `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Always include `churchId` in your queries to maintain multi-tenant isolation. Never query across tenants unless you have a specific, authorized reason to do so.
:::

## Cross-Module References

Because each module's data lives in a separate database, there are no foreign keys or SQL joins across module boundaries. A record that relates to another module's data stores that record's id -- for example, a donation in the giving database carries the `personId` of a person in the membership database -- and any cross-module composition happens in application code.

This constraint is what makes the module boundaries real: each schema can evolve independently, a module's database can be moved to its own server, and a module could even be extracted into a standalone service without untangling shared tables or cross-database queries.

## Relaterte artikler

- **[Module Structure](./module-structure)** -- How controllers and repositories are organized within each module
- **[Local API Setup](./local-setup)** -- Full step-by-step setup guide
