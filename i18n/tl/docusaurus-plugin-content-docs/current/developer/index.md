---
title: "Dokumentasyon para sa Developer"
---

# Dokumentasyon para sa Developer

<div class="article-intro">

Ang ChurchApps ay isang koleksyon ng humigit-kumulang 20 open-source na proyekto na sama-samang nagbibigay ng kumpletong church management platform. Sakop ng mga proyekto ang backend APIs, web applications, mobile apps, isang desktop application, at mga shared library -- lahat ay nakasulat sa TypeScript. Ibinibigay ng seksyong ito ang lahat ng kailangan mo para mag-set up ng local development environment at magsimulang mag-contribute.

</div>

## Pangkalahatang Tanaw ng Arkitektura

Ang mga proyekto ay **independent repositories** (hindi monorepo). Ang shared code ay inilalathala sa npm sa ilalim ng `@churchapps/*` scope at ginagamit bilang regular na dependencies. Ibig sabihin, puwede kang magtrabaho sa iisang proyekto nang hindi kinakailangang i-clone ang buong ecosystem.

Mga pangunahing katangian:

- **Language:** TypeScript sa kabuuan
- **Backend:** Node.js / Express APIs na dine-deploy sa AWS Lambda gamit ang Serverless Framework
- **Web:** React 19 (Vite at Next.js), Material-UI 7
- **Mobile:** React Native gamit ang Expo
- **Database:** MySQL 8.0, isang database bawat API module

## Saklaw ng Seksyong Ito

- **[Setup](setup/)** -- Local development environment, prerequisites, at configuration
  - [Prerequisites](setup/prerequisites) -- Mga kinakailangang tool at software
  - [Project Overview](setup/project-overview) -- Lahat ng proyekto sa isang sulyap
  - [Environment Variables](setup/environment-variables) -- Pag-configure ng mga `.env` file
- **[API](api/)** -- Core API local setup, database initialization, at module structure
- **[Web Apps](web-apps/)** -- Pagpapatakbo ng B1Admin, B1App, at LessonsApp nang local
- **[Mobile Apps](mobile/)** -- Pag-build ng B1Mobile at iba pang Expo apps
- **[Shared Libraries](shared-libraries/)** -- Pagtatrabaho sa Helpers, ApiHelper, at AppHelper
- **[Deployment](deployment/)** -- Pag-deploy ng APIs, web apps, at mobile apps
- **[FreePlay Content Provider](freeplay-content-provider)** -- Pag-integrate ng iyong lesson library sa FreePlay

## Komunidad at Mga Mapagkukunan

| Mapagkukunan | Link |
|----------|------|
| GitHub Organization | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Issue Tracker | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack Community | [Join Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Ang pinakamabilis na paraan para magsimulang mag-contribute ay pumili ng web app (tulad ng B1Admin), ituro ito sa shared **demo APIs**, at magsimulang gumawa ng frontend changes. Walang kinakailangang database o API setup.
:::
