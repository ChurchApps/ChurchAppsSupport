# Database

The ChurchApps API uses a **database-per-module** architecture. Each of the six modules has its own MySQL database with an independent connection pool, providing clear data boundaries while keeping everything within a single deployment.

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

- **One database per module** -- Each module maintains its own MySQL database with a dedicated connection pool (`EnhancedPoolHelper`). This keeps modules decoupled and allows independent schema evolution.
- **Repository pattern with direct SQL** -- There is no ORM. All data access goes through repository classes that execute SQL directly using `DB.query()`. This gives full control over query performance and behavior.
- **Multi-tenant by design** -- Every query is scoped by `churchId`. All tables include a `churchId` column, and the repository layer enforces tenant isolation automatically.

## Connection Strings

Each module's database connection is configured in `.env` using standard MySQL connection string format:

```
mysql://user:password@host:port/database
```

For example, a local development setup might look like:

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::note
In production, connection strings are stored in AWS SSM Parameter Store and read by the `Environment` class at startup.
:::

## Schema Scripts

Database schema scripts are located in the `tools/dbScripts/` directory, organized by module:

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

These scripts define table creation, indexes, and any necessary seed data.

## Database Initialization

### Initialize all databases

```bash
npm run initdb
```

This creates all six databases and runs the schema scripts for each one.

### Initialize a single module

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
When working on a specific module, you can re-initialize just that module's database without affecting the others.
:::

## Data Access Pattern

Repositories access data through the `DB.query()` method. A typical repository method looks like this:

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

Repositories are obtained via `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
Always include `churchId` in your queries to maintain multi-tenant isolation. Never query across tenants unless you have a specific, authorized reason to do so.
:::
