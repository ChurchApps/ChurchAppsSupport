---
title: "Pangkalahatang-tanaw ng Proyekto"
---

# Pangkalahatang-tanaw ng Proyekto

<div class="article-intro">

Ang ChurchApps ay binubuo ng humigit-kumulang 20 independiyenteng mga repository, lahat ay naka-publish sa ilalim ng [ChurchApps GitHub organization](https://github.com/ChurchApps). Nagbibigay ang pahinang ito ng kompletong imbentaryo ng lahat ng proyekto na nakaayos ayon sa kategorya, kasama ang kanilang mga framework, port, at relasyon.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang [mga kinakailangan](./prerequisites) para sa kategorya ng proyektong gusto mong gawin

</div>

## Mga Backend API

Lahat ng API ay binuo gamit ang Node.js, Express, at TypeScript, at naka-deploy sa AWS Lambda sa pamamagitan ng Serverless Framework.

| Proyekto | Layunin | Dev Port | Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Core modular monolith na sumasaklaw sa membership, attendance, content, giving, messaging, at doing | 8084 | Hiwalay na MySQL database sa bawat module (6 sa kabuuan) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church backend | -- | Isang `lessons` MySQL database |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI query tool na pinapagana ng OpenAI | -- | -- |

:::info
Ang core na **Api** na proyekto ay isang modular monolith. Ang bawat module (membership, attendance, content, giving, messaging, doing) ay may sariling database at maa-access sa isang subpath tulad ng `/membership` o `/giving`. Sa production, ang mga ito ay nakabukas bilang hiwalay na Lambda function sa likod ng API Gateway.
:::

## Mga Web App

| Proyekto | Framework | Dev Port | Layunin |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | Dashboard para sa administrasyon ng simbahan |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Pampublikong app para sa mga miyembro ng simbahan |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church frontend |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utility para sa pag-import/export ng data |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | Mga static na brochure website ng simbahan |

## Mga Mobile App

Lahat ng mobile app ay gumagamit ng React Native na may Expo.

| Proyekto | Layunin | Mga Pangunahing Bersyon |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | App para sa mga miyembro ng simbahan para sa iOS at Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Kiosk app para sa check-in | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV display ng mga aralin | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Content playback (kasama ang TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobile remote control para sa FreeShow | Expo |

## Desktop

| Proyekto | Stack | Layunin |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software para sa presentasyon at pagsamba |

## Mga Shared Library

Ang shared code ay nai-publish sa npm sa ilalim ng `@churchapps` scope. Ginagamit ang mga ito bilang regular na npm dependency ng mga proyekto sa itaas.

| Package | npm Name | Layunin | Ginagamit Ng |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | Mga base utility (DateHelper, ApiHelper, CurrencyHelper, atbp.) | Lahat ng proyekto |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Mga Express server utility (auth middleware, DB helper, AWS integration) | Lahat ng API |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | Workspace na may 6 na package | React component library | Lahat ng web app |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | YouTube, Vimeo, at lokal na content provider | FreeShow, FreePlay, Api |

### Mga Sub-package ng AppHelper

Ang AppHelper na proyekto ay isang monorepo workspace na nag-publish ng anim na package:

| Package | npm Name |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## Mga Relasyon ng Proyekto

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Lahat ng frontend app ay umaasa sa `@churchapps/helpers`. Ang mga web app ay karagdagang umaasa sa mga `@churchapps/apphelper` package. Lahat ng backend API ay umaasa sa parehong `@churchapps/helpers` at `@churchapps/apihelper`.

## Mga Susunod na Hakbang

- **[Mga Environment Variable](./environment-variables)** -- I-configure ang iyong mga `.env` file para kumonekta sa mga API
- **[Lokal na API Setup](../api/local-setup)** -- I-set up ang backend API nang lokal
