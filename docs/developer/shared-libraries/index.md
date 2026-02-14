---
title: "Shared Libraries"
---

# Shared Libraries

<div class="article-intro">

ChurchApps shared code is published to npm under the `@churchapps/*` scope. These packages provide common utilities, server-side helpers, and React components that are consumed by all ChurchApps projects as regular npm dependencies.

</div>

## Packages

| Package | Description | Used By |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Base utilities (DateHelper, ApiHelper, etc.) | All projects |
| [`@churchapps/apihelper`](./api-helper) | Server-side Express.js utilities | All APIs |
| [`@churchapps/apphelper`](./app-helper) | Shared React components and utilities | All web apps |

## Local Development with `npm link`

When developing a shared library alongside a consuming project, use `npm link` to test changes without publishing to npm:

```bash
# Build and link the library
cd Helpers && npm run build && npm link

# Link it into the consuming project
cd ../Api && npm link @churchapps/helpers
```

This creates a symlink from the consuming project's `node_modules/@churchapps/helpers` to your local build output, so changes are reflected immediately after rebuilding.

:::tip
Remember to run `npm run build` in the library project after making changes -- the consuming project reads from the compiled `dist/` folder, not the source.
:::

:::warning
`npm link` connections are reset whenever you run `npm install` in the consuming project. You will need to re-run the `npm link @churchapps/<package>` command after installing dependencies.
:::
