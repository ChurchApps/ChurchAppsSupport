---
title: "Architecture"
---

# Architecture

<div class="article-intro">

Ang mga pahinang ito ay mga cross-repo system maps: sila ay nag-document kung paano gumagana ang core ChurchApps system end-to-end — sa lahat ng apps, ang API modules, at ang shared libraries — sa halip na kung paano na-set up ang anumang solong proyekto. Basahin sila bago baguhin ang behavior ng system; basahin ang [Setup](../setup/) upang makakuha ng proyekto na tumatakbo at ang [API section](../api/) para sa endpoint-level reference.

</div>

## Ang ecosystem sa isang sulyap

Ang ChurchApps ay ~20 independent repositories (hindi isang monorepo). Ang mga client apps ay nakikipag-usap sa isang maliit na set ng backend APIs sa pamamagit ng HTTPS at WebSocket, at nagbabahagi ng code sa pamamagit ng npm packages na na-publish sa ilalim ng `@churchapps` scope.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Mga kliyente                  │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             mga website ng     │            │                                              │
│             simbahan           │ ◀───WS───▶ │   isang MySQL database bawat module (6 total)
│  B1Checkin  check-in kiosk     │            └──────────────────────────────────────────────┘
│  B1Mobile   (maintenance-only) │            ┌──────────────────────────────────────────────┐
│  FreePlay   TV content player  │            │  LessonsApi — Lessons.church backend         │
└───────────────┬────────────────┘            └──────────────────────────────────────────────┘
                │                             
                │  ibinabahaging code sa pamamagit ng npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Dalawang structural rules ang bumubuo sa lahat na naidokumento sa section na ito:

1. **Ang mga Modules ay isolated.** Bawat Api module ay nagmamay-ari ng database at tables nito; ang ibang modules at apps ay umaabot sa data nito lamang sa pamamagit ng REST endpoints nito. Tingnan ang [Module Structure](../api/module-structure).
2. **Ang ibinabahaging code ay nagpapadala bilang npm packages.** Ang mga apps ay hindi kailanman nag-import ng source ng isa't isa; ang anumang ginagamit muli ay tumatawid sa repo boundaries sa pamamagit ng `@churchapps/helpers`, `@churchapps/apphelper`, o `@churchapps/apihelper`. Tingnan ang [Shared Libraries](../shared-libraries/).

## Mga System maps

| Pahina | Ano ang saklaw nito | Sumasaklaw |
|------|----------------|-------|
| [Mga Notification at Reminder](./notifications) | Paano nagsasabi ng kahit ano sa isang tao ng something: ang dalawang dispatch doors, ang channel escalation chain, at ang reminder engine | Api (messaging), B1Admin, B1App |
| [Real-time Architecture](../realtime) | Ang WebSocket delivery framework sa likod ng chat, presence, at in-app delivery | Api (messaging), lahat ng web apps |
| [Mga Web Push Notification](../web-push) | Ang browser push channel: VAPID keys, subscription storage, paghahatid | Api (messaging), lahat ng web apps |
| [Giving](./giving) | Mga payment providers at gateways, donation flows, funds/batches, gateway webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Mga Event Registration](./registrations) | Ang registration commerce model: attendee types, mga pagpipilian, mga discount codes, mga pagbabayad sa pamamagit ng giving gateway, at ang waitlist | Api (content + giving), B1App, B1Admin |
| [Mga Check-In](./check-ins) | Kiosk at self check-in, ang attendance data model, room routing, ang child-safety layer, label printing | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder) | Ang page/section/element tree, ang element-type contract at renderers, blog, access-gated pages, SEO, at AI generation | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website Routing & Multi-Site](./websites) | Paano ang request ay nagresolba sa isang simbahan at isang specific site, ang multi-site `siteId` data model, at ang Caddy custom-domain edge | B1App, Api (membership + content), B1Admin |
| [Mga Integration](./integrations) | Ang extension surface: OAuth, API keys, webhooks, content providers, MCP | Api, shared libraries, external apps |
| [Audit Log & Undoable Batches](./audit-log) | Default-on auditing ng bawat mutation sa controller choke point, at ang batch layer na gumagawa ng imports at bulk actions na undoable | Api (lahat ng modules), B1Admin, B1Transfer |

:::tip
Kung ang pagbabago ay binabago kung paano gumagana ang isa sa mga system na ito — hindi lamang isang pahina sa loob ng isang app — ang matching system map dito ay dapat na ma-update sa parehong effort. Pinapanatili nito ang section na ito na mapagkakatiwalaan bilang ang unang stop para sa mga bagong contributors.
:::
