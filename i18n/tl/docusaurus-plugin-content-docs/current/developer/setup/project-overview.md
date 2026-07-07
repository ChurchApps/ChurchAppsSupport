---
title: "Project Overview"
---

# Project Overview

<div class="article-intro">

Ang ChurchApps ay binubuo ng takrang 20 na independent repositories, bawat isa ay nai-publish sa ilalim ng [ChurchApps GitHub organization](https://github.com/ChurchApps). Ang page na ito ay nagbibigay ng isang kumpletong inventory ng lahat ng projects na ino-organize ayon sa category, kasama ang kanilang frameworks, ports, at relationships.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang [prerequisites](./prerequisites) para sa project category na nais mong magtrabaho

</div>

## Backend APIs

Ang lahat ng APIs ay itinayo gamit ang Node.js, Express, at TypeScript, at na-deploy sa AWS Lambda sa pamamagitan ng Serverless Framework.

| Project | Purpose | Dev Port | Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Core modular monolith na sumasaklaw sa membership, attendance, content, giving, messaging, at doing | 8084 | Hiwalay na MySQL database bawat module (6 total) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church backend | -- | Single `lessons` MySQL database |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI query tool na powered ng OpenAI | -- | -- |

:::info
Ang core **Api** project ay isang modular monolith. Bawat module (membership, attendance, content, giving, messaging, doing) ay may sarili nitong database at accessible sa isang subpath tulad ng `/membership` o `/giving`. Sa production, ang mga ito ay exposed bilang hiwalay na Lambda functions sa likod ng API Gateway.
:::

## Web Apps

| Project | Framework | Dev Port | Purpose |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Church administration dashboard |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Public-facing church member app |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church frontend |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Data import/export utility |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | Static church brochure websites |

## Mobile Apps

Ang lahat ng mobile apps ay gumagamit ng React Native na may Expo.

| Project | Purpose | Key Versions |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Church member app para sa iOS at Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Check-in kiosk app | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV lesson display | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Content playback (kasama ang TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobile remote control para sa FreeShow | Expo |

## Desktop

| Project | Stack | Purpose |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Presentation at worship software |

## Shared Libraries

Ang shared code ay nai-publish sa npm sa ilalim ng `@churchapps` scope at consumed bilang regular na npm dependencies ng mga projects sa itaas. Ang lahat ng shared packages ay nakatira sa isang repository -- [Packages](https://github.com/ChurchApps/Packages) -- pinamamahalaan bilang Yarn workspace at inilabas gamit ang changesets.

| Package | Purpose | Used By |
|---------|---------|---------|
| `@churchapps/helpers` | Base utilities at shared TypeScript interfaces (DateHelper, ApiHelper, CurrencyHelper, atbp.) | Lahat ng projects |
| `@churchapps/apihelper` | Express server utilities (auth, base controllers, database access, AWS integrations) | Lahat ng APIs |
| `@churchapps/apphelper` | React component library na may subpath modules para sa login, donations, forms, markdown, at website building | Lahat ng web apps |
| `@churchapps/content-providers` | Third-party content provider abstraction (Lessons.church, Planning Center, Dropbox, at iba pa) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church integration toolkit: webhooks, REST client, OAuth | External integration developers |
| `@churchapps/texting` | SMS provider abstraction | Api |

Tingnan ang [Shared Libraries](../shared-libraries/) para sa workspace setup at ang release workflow.

## Project Relationships

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Ang lahat ng frontend apps ay nakadepende sa `@churchapps/helpers`. Ang web apps ay dagdag na nakadepende sa `@churchapps/apphelper` packages. Ang lahat ng backend APIs ay nakadepende sa pareho ng `@churchapps/helpers` at `@churchapps/apihelper`.

## Next Steps

- **[Environment Variables](./environment-variables)** -- I-configure ang iyong `.env` files upang kumonekta sa APIs
- **[API Local Setup](../api/local-setup)** -- I-setup ang backend API nang lokal
