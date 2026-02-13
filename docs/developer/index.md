---
title: "Developer Documentation"
---

# Developer Documentation

ChurchApps is a collection of approximately 20 open-source projects that together provide a complete church management platform. The projects span backend APIs, web applications, mobile apps, a desktop application, and shared libraries -- all written in TypeScript.

## Architecture at a Glance

The projects are **independent repositories** (not a monorepo). Shared code is published to npm under the `@churchapps/*` scope and consumed as regular dependencies. This means you can work on a single project without cloning the entire ecosystem.

Key characteristics:

- **Language:** TypeScript throughout
- **Backend:** Node.js / Express APIs deployed to AWS Lambda via Serverless Framework
- **Web:** React 19 (Vite and Next.js), Material-UI 7
- **Mobile:** React Native with Expo
- **Database:** MySQL 8.0, one database per API module

## What This Section Covers

- **[Setup](setup/)** -- Local development environment, prerequisites, and configuration
  - [Prerequisites](setup/prerequisites) -- Required tools and software
  - [Project Overview](setup/project-overview) -- All projects at a glance
  - [Environment Variables](setup/environment-variables) -- Configuring `.env` files
- **[API](api/)** -- Core API local setup, database initialization, and module structure
- **[Web Apps](web-apps/)** -- Running B1Admin, B1App, and LessonsApp locally
- **[Mobile Apps](mobile/)** -- Building B1Mobile and other Expo apps
- **[Shared Libraries](shared-libraries/)** -- Working with Helpers, ApiHelper, and AppHelper
- **[Deployment](deployment/)** -- Deploying APIs, web apps, and mobile apps

## Community and Resources

| Resource | Link |
|----------|------|
| GitHub Organization | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Issue Tracker | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack Community | [Join Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
The fastest way to start contributing is to pick a web app (like B1Admin), point it at the **staging APIs**, and begin making frontend changes. No database or API setup required.
:::
