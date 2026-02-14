---
title: "Helpers"
---

# Helpers

<div class="article-intro">

The `@churchapps/helpers` package provides base utilities used by all ChurchApps projects, both frontend and backend. It is framework-agnostic and includes common helpers such as `DateHelper`, `ApiHelper`, `CurrencyHelper`, and other shared utilities.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install **Node.js** and **Git** -- see [Prerequisites](../setup/prerequisites)
- Familiarize yourself with the [npm link workflow](./index.md) for local development

</div>

## Setup for Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. Install dependencies:

   ```bash
   cd Helpers && npm install
   ```

3. Build the package (compiles TypeScript to `dist/`):

   ```bash
   npm run build
   ```

4. Make it available for local linking:

   ```bash
   npm link
   ```

You can then link it into any consuming project:

```bash
cd ../YourProject && npm link @churchapps/helpers
```

## Publishing

To publish a new version to npm:

1. Update the version in `package.json`
2. Publish:

   ```bash
   npm publish --access=public
   ```

:::warning
Since this package is used by every ChurchApps project, changes here have a wide impact. Test thoroughly with `npm link` in at least one consuming API and one consuming web app before publishing.
:::

## Related Articles

- **[ApiHelper](./api-helper)** -- Server-side utilities that depend on this package
- **[AppHelper](./app-helper)** -- React components that depend on this package
- **[Shared Libraries Overview](./index.md)** -- `npm link` workflow and package overview
