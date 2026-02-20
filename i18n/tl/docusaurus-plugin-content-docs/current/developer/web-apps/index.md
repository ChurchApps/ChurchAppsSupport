---
title: "Mga Web App"
---

# Mga Web App

<div class="article-intro">

Kasama sa ChurchApps ang tatlong web application, bawat isa ay nagsisilbi sa ibang audience at layunin. Nagbabahagi sila ng isang karaniwang pundasyon ng teknolohiya na React 19, TypeScript, at Material-UI 7, ngunit nagkakaiba sa kanilang build tooling at mga target ng deployment.

</div>

## Mga Application sa Isang Tingin

| App | Layunin | Framework | Dev Port |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Dashboard ng administrasyon ng simbahan | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Pampublikong church member app | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Pamamahala ng nilalaman ng aralin | Next.js 16 + React 19 | 3501 |

## Shared Tech Stack

Lahat ng tatlong web app ay binuo gamit ang:

- **TypeScript** -- End-to-end na type safety
- **React 19** -- Library ng UI component
- **Material-UI 7** -- Design system at component toolkit
- **React Query 5** -- Pamamahala ng server state

## Mga Shared Component

Nagbabahagi ang mga app ng mga UI component at utility sa pamamagitan ng pamilya ng mga `@churchapps/apphelper*` package:

| Package | Layunin |
|---------|---------|
| `@churchapps/apphelper` | Mga core shared React component |
| `@churchapps/apphelper-login` | Mga component ng authentication UI |
| `@churchapps/apphelper-donations` | Mga form ng donasyon at pagbibigay |
| `@churchapps/apphelper-forms` | Mga component ng form builder |
| `@churchapps/apphelper-markdown` | Pag-render ng Markdown |
| `@churchapps/apphelper-website` | Mga component ng Website/CMS |

:::tip
Para sa mga detalye sa pag-develop ng mga shared package na ito nang lokal, tingnan ang dokumentasyon ng [AppHelper](../shared-libraries/app-helper).
:::

## Postinstall Script

Ang bawat web app ay may `postinstall` script na kumokopya ng mga locale file at CSS asset mula sa `@churchapps/apphelper` papunta sa proyekto. Awtomatiko itong tumatakbo pagkatapos ng `npm install`.

:::info
Kung ang mga component ay mukhang walang estilo pagkatapos mag-install ng mga dependency, maaaring hindi tumakbo nang tama ang `postinstall` script. Maaari mo itong ma-trigger nang mano-mano gamit ang `npm run postinstall`.
:::

## Build Tooling

Gumagamit ang mga app ng dalawang magkaibang build tool:

- Ang **B1Admin** ay gumagamit ng **Vite** -- isang mabilis at modernong bundler na angkop para sa mga single-page application
- Ang **B1App** at **LessonsApp** ay gumagamit ng **Next.js** -- na nagbibigay ng server-side rendering, file-based routing, at mga optimized na production build
