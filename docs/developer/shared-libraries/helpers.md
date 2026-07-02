---
title: "Helpers"
---

# Helpers

<div class="article-intro">

The `@churchapps/helpers` package provides base utilities used by all ChurchApps projects, both frontend and backend. It is framework-agnostic and includes common helpers such as `DateHelper`, `ApiHelper`, `CurrencyHelper`, plus the shared TypeScript interfaces that form the data contract between apps and APIs.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install **Node.js** and **Git** -- see [Prerequisites](../setup/prerequisites)
- Familiarize yourself with the [Packages workspace](./index.md) setup and release flow

</div>

## Who Consumes This

Every ChurchApps API (the core Api, AskApi, and LessonsApi) and every web frontend (B1Admin, B1App, B1Transfer, LessonsApp) depends on this package directly. Frontends also get many of its exports (`ApiHelper`, `DateHelper`, `UserHelper`, and other interfaces) re-exported through [`@churchapps/apphelper`](./app-helper). The other shared packages declare it as a peer dependency so each app resolves exactly one copy.

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
   yarn workspace @churchapps/helpers build
   ```

   Or run `yarn build` at the root to build every package in dependency order.

To test changes inside a consuming project, use a temporary Yarn portal -- see [Local Development Against a Consuming App](./index.md#local-development-against-a-consuming-app).

## Publishing

Releases go through changesets rather than manual version bumps:

1. Run `yarn changeset` at the workspace root and select `@churchapps/helpers` with the appropriate bump type; commit the generated changeset file with your change.
2. When ready to release, run `yarn publish-all` at the root -- it bumps versions, writes CHANGELOGs, builds in dependency order, and publishes to npm.

New shared interfaces go in `helpers/src/interfaces/` and are re-exported through the package barrel. The website builder's element-type catalog (`ElementTypes.ts` — 35 types with their answers schemas) also lives here; it is the contract shared by the apphelper renderers, the B1Admin editor forms, and the AI generation prompts (see [Website Builder Architecture](../architecture/website-builder)).

:::warning
Since this package is used by every ChurchApps project, changes here have a wide impact. A release of `helpers` automatically bumps `apihelper` and `apphelper` so their dependency ranges stay current. Test with a Yarn portal in at least one consuming API and one consuming web app before publishing.
:::

## Related Articles

- **[ApiHelper](./api-helper)** -- Server-side utilities that depend on this package
- **[AppHelper](./app-helper)** -- React components that depend on this package
- **[Shared Libraries Overview](./index.md)** -- Workspace setup, release flow, and local-link workflow
