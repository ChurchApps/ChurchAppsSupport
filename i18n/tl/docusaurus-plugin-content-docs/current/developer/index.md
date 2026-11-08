---
title: "Dokumentasyon para sa Developer"
description: "Alamin ang mga pasikot-sikot ng ChurchApps developer docs: lokal na setup, mga gabay sa API at web app, mga shared library, mobile build, at deployment para sa mga open-source na proyekto."
---

# Dokumentasyon para sa Developer

<div class="article-intro">

Ang ChurchApps ay koleksyon ng humigit-kumulang 20 open-source na proyekto na sama-samang nagbibigay ng kumpletong plataporma sa pamamahala ng simbahan. Sakop ng mga proyekto ang backend API, web application, mobile app, desktop application, at mga shared library -- lahat ay nakasulat sa TypeScript. Nagbibigay ang seksyong ito ng lahat ng kailangan mo para mag-set up ng lokal na development environment at magsimulang mag-ambag.

</div>

## Pangkalahatang-tanaw sa Arkitektura

Ang mga proyekto ay **magkakahiwalay na repository** (hindi monorepo). Ang shared code ay ini-publish sa npm sa ilalim ng scope na `@churchapps/*` at ginagamit bilang regular na dependency. Ibig sabihin, maaari kang magtrabaho sa iisang proyekto nang hindi kino-clone ang buong ecosystem.

Mga pangunahing katangian:

- **Wika:** TypeScript sa buong proyekto
- **Backend:** Node.js / Express APIs na dinedeploy sa AWS Lambda gamit ang Serverless Framework
- **Web:** React 19 (Vite at Next.js), Material-UI 7
- **Mobile:** React Native gamit ang Expo
- **Database:** MySQL 8.0, isang database bawat API module

## Ano ang Saklaw ng Seksyong Ito

- **[Setup](./setup/index.md)** -- Lokal na development environment, mga kinakailangan, at configuration
  - [Prerequisites](./setup/prerequisites.md) -- Mga kinakailangang tool at software
  - [Project Overview](./setup/project-overview.md) -- Lahat ng proyekto sa isang sulyap
  - [Environment Variables](./setup/environment-variables.md) -- Pag-configure ng mga `.env` file
- **[API](./api/index.md)** -- Lokal na setup ng Core API, database initialization, at istruktura ng module
- **[Web Apps](./web-apps/index.md)** -- Pagpapatakbo ng B1Admin, B1App, at LessonsApp nang lokal
- **[Mobile Apps](./mobile/index.md)** -- Pagbuo ng B1Checkin at iba pang Expo app
- **[Shared Libraries](./shared-libraries/index.md)** -- Paggamit ng Helpers, ApiHelper, at AppHelper
- **[Deployment](./deployment/index.md)** -- Pag-deploy ng mga API, web app, at mobile app
- **[FreePlay Content Provider](./freeplay-content-provider.md)** -- Pagsasama ng iyong lesson library sa FreePlay

## Komunidad at mga Mapagkukunan

| Mapagkukunan | Link |
|----------|------|
| GitHub Organization | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Tracker ng Isyu | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Komunidad sa Slack | [Sumali sa Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Ang pinakamabilis na paraan para magsimulang mag-ambag ay pumili ng web app (gaya ng B1Admin), itutok ito sa shared **demo API**, at simulan ang paggawa ng mga pagbabago sa frontend. Hindi kailangan ng database o API setup.
:::
