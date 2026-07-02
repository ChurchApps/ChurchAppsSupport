---
title: "Local API Setup"
---

# Local API Setup

<div class="article-intro">

This guide walks you through setting up the ChurchApps API for local development. You will clone the repository, configure your database connections, initialize the schema, and start the dev server with hot reload.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install **Node.js 22+**, **Git**, and **MySQL 8.0+** -- see [Prerequisites](../setup/prerequisites)
- Create a MySQL user with database creation privileges
- Review the [Environment Variables](../setup/environment-variables) reference for API configuration

</div>

## Step-by-Step Setup

### 1. Clone the repository

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Install dependencies

The project uses Yarn (a guard blocks `npm install`):

```bash
cd Api
yarn install
```

### 3. Configure environment variables

```bash
cp .env.sample .env
```

Open `.env` and configure your MySQL connection strings. Each module needs its own database connection in the following format:

```
mysql://root:password@localhost:3306/dbname
```

You will need connection strings for all six module databases (membership, attendance, content, giving, messaging, doing).

### 4. Initialize the databases

```bash
npm run initdb
```

This creates all six databases and their tables automatically.

:::tip
You can initialize a single module's database with `npm run initdb -- --module=membership` (or `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Start the dev server

```bash
npm run dev
```

The API starts with hot reload at [http://localhost:8084](http://localhost:8084).

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload (tsx watch) |
| `npm run build` | Clean, compile TypeScript, and copy assets |
| `npm run test` | Run tests with Jest (includes coverage) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint with auto-fix (ESLint is the sole formatter) |

## Staging Deployment

To deploy to the staging environment:

```bash
npm run deploy-staging
```

This runs a production build and then deploys via Serverless Framework.

:::warning
Make sure your AWS credentials are configured before running the deploy command.
:::

## Local Library Development

If you need to develop a shared library (`@churchapps/helpers` or `@churchapps/apihelper`) alongside the API, build it in the [Packages](https://github.com/ChurchApps/Packages) workspace and add a temporary Yarn portal in the API:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

This lets you test library changes against the API without publishing to npm. See [Shared Libraries](../shared-libraries/#local-development-against-a-consuming-app) for details -- and never commit the portal resolution the link writes into `package.json`.

## Related Articles

- **[Database](./database)** -- Understanding the database-per-module architecture
- **[Module Structure](./module-structure)** -- How controllers, repositories, and models are organized
- **[Shared Libraries](../shared-libraries/)** -- Working with `@churchapps/helpers` and `@churchapps/apihelper`
