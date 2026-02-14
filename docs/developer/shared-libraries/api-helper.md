---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

The `@churchapps/apihelper` package provides server-side utilities for all ChurchApps Express.js APIs. It includes the base controller class, JWT authentication middleware, database utilities, and AWS integrations that every API project depends on.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install **Node.js** and **Git** -- see [Prerequisites](../setup/prerequisites)
- Familiarize yourself with the [npm link workflow](./index.md) for local development
- This package depends on [`@churchapps/helpers`](./helpers)

</div>

## What's Included

- **CustomBaseController** -- base class for API controllers
- **Auth middleware** -- JWT authentication via `CustomAuthProvider`
- **Database utilities** -- `DB.query`, `EnhancedPoolHelper` for MySQL connection management
- **AWS integrations** -- helpers for S3, SSM Parameter Store, and other AWS services
- **Inversify DI setup** -- dependency injection container configuration

## Setup for Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. Install dependencies:

   ```bash
   cd ApiHelper && npm install
   ```

3. Build the package (compiles TypeScript to `dist/`):

   ```bash
   npm run build
   ```

4. Make it available for local linking:

   ```bash
   npm link
   ```

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |

:::info
This package is a dependency of every ChurchApps API. When making changes, use `npm link` to test against an API locally before publishing.
:::

## Related Articles

- **[Helpers](./helpers)** -- The base utility package that this package depends on
- **[Module Structure](../api/module-structure)** -- How controllers and auth middleware are used in API modules
- **[Local API Setup](../api/local-setup)** -- Setting up the API for local development
