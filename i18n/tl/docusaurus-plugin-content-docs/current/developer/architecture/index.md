---
title: "Arkitektura"
---

# Arkitektura

<div class="article-intro">

Ang mga pahina na ito ay cross-repo na mga mapa ng sistema: tinatanggal nila kung paano gumagana ang isang core ChurchApps system end-to-end -- sa mga app, ang Api modules, at ang mga shared libraries -- sa halip na paano ang anumang solong proyekto ay naitakda. Basahin ang mga ito bago baguhin ang behavior ng sistema; basahin ang [Setup](../setup/) upang makakuha ng proyekto na tumatakbo at ang [API section](../api/) para sa reference ng endpoint-level.

</div>

## Ang ecosystem sa isang sulyap

Ang ChurchApps ay ~20 independent repositories (hindi isang monorepo). Ang mga app ng kliyente ay nakikipag-usap sa isang maliit na hanay ng backend APIs sa HTTPS at WebSocket, at nagbabahagi ng code sa pamamagitan ng mga package ng npm na inilathala sa ilalim ng `@churchapps` scope.

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

Ang dalawang structural rules ay bumubuo sa lahat ng documented sa seksyon na ito:

1. **Ang mga module ay isolated.** Bawat Api module ay may-ari ng database nito at ang mga talahanayan nito; ang iba pang mga module at app ay maaabot ang data nito lamang sa pamamagitan ng REST endpoints nito. Tingnan ang [Module Structure](../api/module-structure).
2. **Ang shared code ay naghahatid bilang npm packages.** Ang mga app ay hindi kailanman nag-import ng source ng iba; anumang ginagamit ay tumatawid ng mga hangganan ng repo sa pamamagitan ng `@churchapps/helpers`, `@churchapps/apphelper`, o `@churchapps/apihelper`. Tingnan ang [Shared Libraries](../shared-libraries/).

## Ang mga mapa ng sistema

| Page | Ano ang ito ay sumasaklaw | Spans |
|------|----------------|-------|
| [Notifications & Reminders](./notifications) | Kung paano ang kahit anong nagsasabi sa isang tao ng isang bagay: ang dalawang dispatch doors, ang channel escalation chain, at ang reminder engine | Api (messaging), B1Admin, B1App |
| [Real-time Architecture](../realtime) | Ang WebSocket delivery framework sa likod ng chat, presence, at in-app delivery | Api (messaging), lahat ng web apps |
| [Web Push Notifications](../web-push) | Ang browser push channel: VAPID keys, subscription storage, delivery | Api (messaging), lahat ng web apps |
| [Giving](./giving) | Ang payment providers at gateways, donation flows, funds/batches, gateway webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Event Registrations](./registrations) | Ang registration commerce model: attendee types, selections, discount codes, payments sa pamamagitan ng giving gateway, at ang waitlist | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins) | Ang kiosk at self check-in, ang attendance data model, room routing, ang child-safety layer, label printing | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder) | Ang page/section/element tree, ang element-type contract at renderers, blog, access-gated pages, SEO, at AI generation | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website Routing & Multi-Site](./websites) | Kung paano ang isang request ay nalulutas sa isang simbahan at isang partikular na site, ang multi-site `siteId` data model, at ang Caddy custom-domain edge | B1App, Api (membership + content), B1Admin |
| [Integrations](./integrations) | Ang extension surface: OAuth, API keys, webhooks, content providers, MCP | Api, shared libraries, external apps |
| [Audit Log & Undoable Batches](./audit-log) | Ang default-on auditing ng bawat mutation sa controller choke point, at ang batch layer na gumagawa ng imports at bulk actions na undoable | Api (lahat ng module), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Ang binayaran na storage & texting-credit service: shared-JWT identity, service-key S2S, ang texting at storage provider seams, Stripe billing | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper packages, B1Admin |
| [Bring-Your-Own Storage](./byos-storage) | Ang mga simbahan ay nag-link ng Google Drive, Dropbox, OneDrive o isang S3-compatible bucket para sa uploads lampas sa libre 100MB: OAuth connect, per-provider upload shapes, ang pampublikong download redirect | Api (content + membership), helpers/apphelper packages, B1Admin, B1App |

:::tip
Kapag ang pagbabago ay nagbabago kung paano gumagana ang isa sa mga sistemang ito -- hindi lamang isang pahina sa loob ng isang app -- ang matching system map dito ay dapat na i-update sa parehong pagsisikap. Pinapanatili nito ang seksyon na ito na mapagkakatiwalaan bilang ang unang tumitigil para sa mga bagong contributor.
:::
