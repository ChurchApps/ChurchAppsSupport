---
title: "Project Overview"
---

# Project Overview

ChurchApps consists of approximately 20 independent repositories, each published under the [ChurchApps GitHub organization](https://github.com/ChurchApps). Below is a complete inventory organized by category.

## Backend APIs

All APIs are built with Node.js, Express, and TypeScript, and are deployed to AWS Lambda via Serverless Framework.

| Project | Purpose | Dev Port | Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Core modular monolith covering membership, attendance, content, giving, messaging, and doing | 8084 | Separate MySQL database per module (6 total) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church backend | -- | Single `lessons` MySQL database |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI query tool powered by OpenAI | -- | -- |

:::info
The core **Api** project is a modular monolith. Each module (membership, attendance, content, giving, messaging, doing) has its own database and is accessible at a subpath such as `/membership` or `/giving`. In production, these are exposed as separate Lambda functions behind API Gateway.
:::

## Web Apps

| Project | Framework | Dev Port | Purpose |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | Church administration dashboard |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Public-facing church member app |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church frontend |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Data import/export utility |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | Static church brochure websites |

## Mobile Apps

All mobile apps use React Native with Expo.

| Project | Purpose | Key Versions |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Church member app for iOS and Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Check-in kiosk app | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV lesson display | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Content playback (including TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobile remote control for FreeShow | Expo |

## Desktop

| Project | Stack | Purpose |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Presentation and worship software |

## Shared Libraries

Shared code is published to npm under the `@churchapps` scope. These are consumed as regular npm dependencies by the projects above.

| Package | npm Name | Purpose | Used By |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | Base utilities (DateHelper, ApiHelper, CurrencyHelper, etc.) | All projects |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Express server utilities (auth middleware, DB helpers, AWS integration) | All APIs |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | Workspace with 6 packages | React component library | All web apps |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | YouTube, Vimeo, and local content providers | FreeShow, FreePlay, Api |

### AppHelper Sub-packages

The AppHelper project is a monorepo workspace that publishes six packages:

| Package | npm Name |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

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

All frontend apps depend on `@churchapps/helpers`. Web apps additionally depend on `@churchapps/apphelper` packages. All backend APIs depend on both `@churchapps/helpers` and `@churchapps/apihelper`.
