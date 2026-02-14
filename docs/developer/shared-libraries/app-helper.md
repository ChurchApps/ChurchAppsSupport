---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

The `@churchapps/apphelper*` packages provide shared React components and utilities for all ChurchApps web applications. AppHelper is structured as a monorepo workspace containing six packages covering core components, authentication, donations, forms, markdown, and website/CMS functionality.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install **Node.js** and **Git** -- see [Prerequisites](../setup/prerequisites)
- Familiarize yourself with the [npm link workflow](./index.md) for local development

</div>

## Packages

| Package | Description |
|---------|-------------|
| `@churchapps/apphelper` | Core components and utilities |
| `@churchapps/apphelper-login` | Login and registration UI |
| `@churchapps/apphelper-donations` | Giving and donation components |
| `@churchapps/apphelper-forms` | Form builder components |
| `@churchapps/apphelper-markdown` | Markdown editor and renderer |
| `@churchapps/apphelper-website` | Website and CMS components |

## Setup for Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/ChurchApps/AppHelper.git
   ```

2. Install dependencies:

   ```bash
   cd AppHelper && npm install
   ```

3. Build all packages and launch the Vite playground:

   ```bash
   npm run playground:reload
   ```

   This builds every package in the workspace, then starts the playground dev server at **http://localhost:3001**.

:::tip
The playground is the fastest way to develop and test AppHelper components. It hot-reloads the Vite dev server so you can see changes in real time.
:::

## Publishing

Publish a single package:

```bash
npm run publish:apphelper
```

Publish all packages:

```bash
npm run publish:all
```

:::warning
When publishing, make sure to update the version number in the relevant `package.json` file(s) before running the publish command. All packages that depend on a changed package should also be updated.
:::

## Related Articles

- **[Helpers](./helpers)** -- The base utility package used alongside AppHelper
- **[Web Apps](../web-apps/)** -- The web applications that consume these packages
- **[Shared Libraries Overview](./index.md)** -- `npm link` workflow and package overview
