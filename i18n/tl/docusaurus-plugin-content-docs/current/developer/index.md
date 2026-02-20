---
title: "Dokumentasyon para sa mga Developer"
---

# Dokumentasyon para sa mga Developer

<div class="article-intro">

Ang ChurchApps ay isang koleksyon ng humigit-kumulang 20 open-source na mga proyekto na magkasamang nagbibigay ng kompletong platform para sa pamamahala ng simbahan. Saklaw ng mga proyekto ang backend na mga API, web application, mobile app, desktop application, at mga shared library -- lahat ay nakasulat sa TypeScript. Ibinibigay ng seksyong ito ang lahat ng kailangan mo para mag-set up ng lokal na development environment at magsimulang mag-ambag.

</div>

## Arkitektura sa Isang Sulyap

Ang mga proyekto ay **independiyenteng mga repository** (hindi monorepo). Ang shared code ay nai-publish sa npm sa ilalim ng `@churchapps/*` scope at ginagamit bilang mga regular na dependency. Ibig sabihin nito, maaari kang magtrabaho sa isang proyekto nang hindi kine-clone ang buong ecosystem.

Mga pangunahing katangian:

- **Wika:** TypeScript sa buong proyekto
- **Backend:** Node.js / Express na mga API na naka-deploy sa AWS Lambda sa pamamagitan ng Serverless Framework
- **Web:** React 19 (Vite at Next.js), Material-UI 7
- **Mobile:** React Native na may Expo
- **Database:** MySQL 8.0, isang database sa bawat API module

## Mga Saklaw ng Seksyong Ito

- **[Setup](setup/)** -- Lokal na development environment, mga kinakailangan, at configuration
  - [Mga Kinakailangan](setup/prerequisites) -- Mga kinakailangang tool at software
  - [Pangkalahatang-tanaw ng Proyekto](setup/project-overview) -- Lahat ng proyekto sa isang sulyap
  - [Mga Environment Variable](setup/environment-variables) -- Pag-configure ng mga `.env` file
- **[API](api/)** -- Lokal na setup ng core API, pag-initialize ng database, at module structure
- **[Mga Web App](web-apps/)** -- Pagpapatakbo ng B1Admin, B1App, at LessonsApp nang lokal
- **[Mga Mobile App](mobile/)** -- Pagbuo ng B1Mobile at iba pang Expo app
- **[Mga Shared Library](shared-libraries/)** -- Paggamit ng Helpers, ApiHelper, at AppHelper
- **[Deployment](deployment/)** -- Pag-deploy ng mga API, web app, at mobile app

## Komunidad at mga Mapagkukunan

| Mapagkukunan | Link |
|----------|------|
| GitHub Organization | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Issue Tracker | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack Community | [Sumali sa Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Ang pinakamabilis na paraan para magsimulang mag-ambag ay pumili ng web app (tulad ng B1Admin), ituro ito sa **staging na mga API**, at magsimulang gumawa ng mga pagbabago sa frontend. Hindi kailangan ng database o API setup.
:::
