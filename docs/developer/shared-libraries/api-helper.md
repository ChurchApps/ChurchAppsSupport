---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

The `@churchapps/apihelper` package provides server-side utilities for all ChurchApps Express.js APIs. It includes the base controller class, JWT authentication, database utilities, and AWS integrations that every API project depends on.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install **Node.js** and **Git** -- see [Prerequisites](../setup/prerequisites)
- Familiarize yourself with the [Packages workspace](./index.md) setup and release flow
- This package depends on [`@churchapps/helpers`](./helpers) (as a peer dependency) and re-exports it

</div>

## What's Included

- **CustomBaseController** -- base class for API controllers, built on `inversify-express-utils`
- **Auth** -- JWT authentication via `CustomAuthProvider`, `AuthenticatedUser`, and `Principal`
- **Database utilities** -- `DB.query` / `DB.queryOne` and the `Pool` class for MySQL connection management, plus `MySqlHelper` and `DBCreator` for schema setup
- **AWS integrations** -- `AwsHelper` for S3 file storage and SSM Parameter Store reads
- **Email** -- `EmailHelper` supporting SES and SMTP transports
- **Config loading** -- `EnvironmentBase` reads connection strings and secrets from environment variables or Parameter Store
- **Misc** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Setup for Local Development

This package lives in the [Packages](https://github.com/ChurchApps/Packages) workspace alongside the other shared libraries:

1. Clone the workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Install dependencies at the workspace root:

   ```bash
   cd Packages && yarn install
   ```

3. Build (compiles TypeScript to `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Or run `yarn build` at the root to build every package in dependency order.

To test changes inside a consuming API, use a temporary Yarn portal -- see [Local Development Against a Consuming App](./index.md#local-development-against-a-consuming-app).

## Publishing

Releases go through changesets: run `yarn changeset` at the workspace root with every change, then `yarn publish-all` when ready to release. See the [Shared Libraries Overview](./index.md#releasing-with-changesets) for the full flow.

:::info
This package is a dependency of every ChurchApps API -- the core Api, AskApi, and LessonsApi. When making changes, test against an API locally before publishing.
:::

## Related Articles

- **[Helpers](./helpers)** -- The base utility package that this package depends on
- **[Module Structure](../api/module-structure)** -- How controllers and auth middleware are used in API modules
- **[Local API Setup](../api/local-setup)** -- Setting up the API for local development
