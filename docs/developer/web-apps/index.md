---
title: "Web Apps"
---

# Web Apps

<div class="article-intro">

ChurchApps includes three web applications, each serving a different audience and purpose. They share a common tech foundation of React 19, TypeScript, and Material-UI 7, but differ in their build tooling and deployment targets.

</div>

## Applications at a Glance

| App | Purpose | Framework | Dev Port |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Church administration dashboard | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Public-facing church member app | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Lesson content management | Next.js 16 + React 19 | 3501 |

## Shared Tech Stack

All three web apps are built with:

- **TypeScript** -- End-to-end type safety
- **React 19** -- UI component library
- **Material-UI 7** -- Design system and component toolkit
- **React Query 5** -- Server state management

## Shared Components

The apps share UI components and utilities through the `@churchapps/apphelper*` family of packages:

| Package | Purpose |
|---------|---------|
| `@churchapps/apphelper` | Core shared React components |
| `@churchapps/apphelper-login` | Authentication UI components |
| `@churchapps/apphelper-donations` | Donation and giving forms |
| `@churchapps/apphelper-forms` | Form builder components |
| `@churchapps/apphelper-markdown` | Markdown rendering |
| `@churchapps/apphelper-website` | Website/CMS components |

:::tip
For details on developing these shared packages locally, see the [AppHelper](../shared-libraries/app-helper) documentation.
:::

## Postinstall Script

Each web app has a `postinstall` script that copies locale files and CSS assets from `@churchapps/apphelper` into the project. This runs automatically after `npm install`.

:::info
If components look unstyled after installing dependencies, the `postinstall` script may not have run correctly. You can trigger it manually with `npm run postinstall`.
:::

## Build Tooling

The apps use two different build tools:

- **B1Admin** uses **Vite** -- a fast, modern bundler ideal for single-page applications
- **B1App** and **LessonsApp** use **Next.js** -- providing server-side rendering, file-based routing, and optimized production builds
