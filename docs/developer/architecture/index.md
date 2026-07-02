---
title: "Architecture"
---

# Architecture

<div class="article-intro">

These pages are cross-repo system maps: they document how a core ChurchApps system works end-to-end — across the apps, the API modules, and the shared libraries — rather than how any single project is set up. Read them before changing a system's behavior; read [Setup](../setup/) to get a project running and the [API section](../api/) for endpoint-level reference.

</div>

## The ecosystem at a glance

ChurchApps is ~20 independent repositories (not a monorepo). Client apps talk to a small set of backend APIs over HTTPS and WebSocket, and share code through npm packages published under the `@churchapps` scope.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Two structural rules shape everything documented in this section:

1. **Modules are isolated.** Each Api module owns its database and its tables; other modules and apps reach its data only through its REST endpoints. See [Module Structure](../api/module-structure).
2. **Shared code ships as npm packages.** Apps never import each other's source; anything reused crosses repo boundaries through `@churchapps/helpers`, `@churchapps/apphelper`, or `@churchapps/apihelper`. See [Shared Libraries](../shared-libraries/).

## System maps

| Page | What it covers | Spans |
|------|----------------|-------|
| [Notifications & Reminders](./notifications) | How anything tells a person something: the two dispatch doors, the channel escalation chain, and the reminder engine | Api (messaging), B1Admin, B1App |
| [Real-time Architecture](../realtime) | The WebSocket delivery framework behind chat, presence, and in-app delivery | Api (messaging), all web apps |
| [Web Push Notifications](../web-push) | The browser push channel: VAPID keys, subscription storage, delivery | Api (messaging), all web apps |
| [Giving](./giving) | Payment providers and gateways, donation flows, funds/batches, gateway webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Check-Ins](./check-ins) | Kiosk and self check-in, the attendance data model, room routing, label printing | B1Checkin, B1App, Api (attendance) |
| [Integrations](./integrations) | The extension surface: OAuth, API keys, webhooks, content providers, MCP | Api, shared libraries, external apps |

:::tip
When a change alters how one of these systems works — not just a page inside one app — the matching system map here should be updated in the same effort. That keeps this section trustworthy as the first stop for new contributors.
:::
