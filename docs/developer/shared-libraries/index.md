---
title: "Shared Libraries"
---

# Shared Libraries

<div class="article-intro">

ChurchApps shared code is published to npm under the `@churchapps/*` scope. All of the shared packages live in a single repository -- [Packages](https://github.com/ChurchApps/Packages) -- managed as a Yarn (Berry) workspace and versioned with [changesets](https://github.com/changesets/changesets).

</div>

## Packages

| Package | Description | Used By |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Foundation layer: framework-free helper functions and the shared TypeScript interfaces that form the cross-app data contract | All projects |
| [`@churchapps/apihelper`](./api-helper) | Server-side Express utilities: auth, base controllers, database access, AWS and email integrations | All APIs |
| [`@churchapps/apphelper`](./app-helper) | Shared React components and feature modules (login, donations, forms, markdown, website) | All web apps |
| `@churchapps/content-providers` | Abstraction over third-party content providers (Lessons.church, Planning Center, Dropbox, and others) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit for building B1.church integrations: webhook verification, typed REST client, OAuth helpers | External integration developers |
| `@churchapps/texting` | SMS provider abstraction (Text In Church, Clearstream, Mutual Ministry) | Api |

Dependency direction is strictly downward: apps depend on `apihelper` and `apphelper`, which declare `@churchapps/helpers` as a **peer dependency** so each app resolves exactly one copy of it.

## Workspace Setup

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

The repo uses Yarn Berry (the root `packageManager` field is authoritative) with a single lockfile. `yarn build` builds every package in dependency order; `yarn test` runs all package tests.

## Releasing with Changesets

Every change to a package ships with a changeset:

1. Run `yarn changeset` at the workspace root. Pick the package(s) you touched, the bump type (patch = fix, minor = new export or feature, major = breaking), and write a one-line summary -- it becomes the CHANGELOG entry.
2. Commit the generated `.changeset/*.md` file together with your code change. A pre-commit hook blocks commits that change a package's source without a staged changeset.
3. When ready to publish, run `yarn publish-all` at the root. This consumes pending changesets (bumping versions, writing CHANGELOGs, syncing internal dependency ranges), builds everything in dependency order, and publishes the bumped packages to npm. Then commit and push the version bumps.

:::warning
Never run a raw `npm publish` inside a single package -- it skips build ordering and the version bookkeeping the release script handles. Publishing requires an npm account with publish rights to the `@churchapps` scope.
:::

## Local Development Against a Consuming App

Inside the workspace, packages build directly against their siblings -- no linking needed. To test an unpublished package build inside a consuming app (B1Admin, B1App, etc.), add a temporary Yarn portal in the consumer:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Build the package first (`yarn build` at the workspace root) -- the consumer reads the compiled `dist/` output, not the source.

:::warning
`yarn link` writes a portal resolution into the consumer's `package.json`. Never commit it -- always `yarn unlink` and reinstall when done.
:::
