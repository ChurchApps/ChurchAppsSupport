---
title: "Mga Shared Library"
---

# Mga Shared Library

<div class="article-intro">

Ang shared code ng ChurchApps ay naka-publish sa npm sa ilalim ng `@churchapps/*` scope. Ang mga package na ito ay nagbibigay ng mga karaniwang utility, server-side helper, at React component na ginagamit ng lahat ng proyekto ng ChurchApps bilang mga karaniwang npm dependency.

</div>

## Mga Package

| Package | Paglalarawan | Ginagamit Ng |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Mga base utility (DateHelper, ApiHelper, atbp.) | Lahat ng proyekto |
| [`@churchapps/apihelper`](./api-helper) | Mga server-side Express.js utility | Lahat ng API |
| [`@churchapps/apphelper`](./app-helper) | Mga shared React component at utility | Lahat ng web app |

## Lokal na Development gamit ang `npm link`

Kapag nagde-develop ng shared library kasabay ng isang gumagamit na proyekto, gamitin ang `npm link` upang subukan ang mga pagbabago nang hindi nagpu-publish sa npm:

```bash
# Buuin at i-link ang library
cd Helpers && npm run build && npm link

# I-link ito sa gumagamit na proyekto
cd ../Api && npm link @churchapps/helpers
```

Lumilikha ito ng symlink mula sa `node_modules/@churchapps/helpers` ng gumagamit na proyekto sa iyong lokal na build output, kaya ang mga pagbabago ay agad na makikita pagkatapos mag-rebuild.

:::tip
Tandaang patakbuhin ang `npm run build` sa proyekto ng library pagkatapos gumawa ng mga pagbabago -- ang gumagamit na proyekto ay nagbabasa mula sa compiled na `dist/` folder, hindi sa source.
:::

:::warning
Ang mga koneksyon ng `npm link` ay nire-reset tuwing magpapatakbo ka ng `npm install` sa gumagamit na proyekto. Kailangan mong patakbuhin muli ang utos na `npm link @churchapps/<package>` pagkatapos mag-install ng mga dependency.
:::
