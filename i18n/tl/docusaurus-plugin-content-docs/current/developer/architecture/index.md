---
title: "Architecture"
---

# Architecture

<div class="article-intro">

Mga cross-repo system map ang mga pahinang ito: dinodokumento nila kung paano gumagana nang end-to-end ang isang core na sistema ng ChurchApps — sa buong mga app, mga API module, at mga shared library — sa halip na kung paano nakasetup ang isang partikular na proyekto lamang. Basahin ang mga ito bago baguhin ang kilos ng isang sistema; basahin ang [Setup](../setup/) para mapatakbo ang isang proyekto at ang [API section](../api/) para sa reference sa antas ng endpoint.

</div>

## Ang ecosystem sa isang tingin

Humigit-kumulang 20 independiyenteng repository ang ChurchApps (hindi isang monorepo). Nakikipag-usap ang mga client app sa isang maliit na hanay ng backend API sa pamamagitan ng HTTPS at WebSocket, at nagbabahagi ng code sa pamamagitan ng mga npm package na na-publish sa ilalim ng `@churchapps` scope.

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

May dalawang structural na patakaran na humuhubog sa lahat ng nasa section na ito:

1. **Nakahiwalay ang mga module.** Bawat module ng Api ang may-ari ng sarili nitong database at mga table; naaabot lang ng ibang module at app ang datos nito sa pamamagitan ng mga REST endpoint nito. Tingnan ang [Module Structure](../api/module-structure).
2. **Ipinapadala ang shared code bilang mga npm package.** Hindi kailanman nag-i-import ang mga app ng source code ng isa't isa; anumang muling ginagamit ay tumatawid sa hangganan ng repo sa pamamagitan ng `@churchapps/helpers`, `@churchapps/apphelper`, o `@churchapps/apihelper`. Tingnan ang [Shared Libraries](../shared-libraries/).

## Mga mapa ng sistema

| Pahina | Sakop nito | Sumasaklaw sa |
|------|----------------|-------|
| [Mga Notification at Reminder](./notifications) | Kung paano may sinasabi ang kahit ano sa isang tao: ang dalawang pintuan ng dispatch, ang chain ng channel escalation, at ang reminder engine | Api (messaging), B1Admin, B1App |
| [Real-time Architecture](../realtime) | Ang WebSocket delivery framework sa likod ng chat, presence, at in-app delivery | Api (messaging), lahat ng web app |
| [Web Push Notifications](../web-push) | Ang browser push channel: mga VAPID key, imbakan ng subscription, paghahatid | Api (messaging), lahat ng web app |
| [Giving](./giving) | Mga payment provider at gateway, mga daloy ng donasyon, funds/batches, mga webhook ng gateway | Api (giving), apphelper, B1App, B1Admin |
| [Event Registrations](./registrations) | Ang commerce model ng registration: mga uri ng attendee, mga pagpili, mga discount code, mga bayad sa pamamagitan ng giving gateway, at ang waitlist | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins) | Kiosk at self check-in, ang data model ng attendance, room routing, ang child-safety layer, pag-print ng label | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder) | Ang page/section/element tree, ang kontrata ng element-type at mga renderer, blog, mga pahinang access-gated, SEO, at AI generation | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website Routing & Multi-Site](./websites) | Kung paano nagreresolba ang isang request patungo sa isang simbahan at isang partikular na site, ang multi-site `siteId` data model, at ang Caddy custom-domain edge | B1App, Api (membership + content), B1Admin |
| [Integrations](./integrations) | Ang extension surface: OAuth, API keys, webhooks, content providers, MCP | Api, shared libraries, external apps |
| [Audit Log & Undoable Batches](./audit-log) | Default-on na pag-audit sa bawat mutation sa controller choke point, at ang batch layer na nagpapagawi (undoable) sa mga import at bulk action | Api (lahat ng module), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Ang bayad na serbisyo ng storage at texting-credit: shared-JWT na identity, service-key S2S, ang texting at storage provider seams, Stripe billing | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), mga package na texting/apihelper, B1Admin |

:::tip
Kapag binabago ng isang pagbabago kung paano gumagana ang isa sa mga sistemang ito — hindi lang isang pahina sa loob ng isang app — dapat i-update ang katugmang system map dito sa parehong pagkilos. Napapanatili nitong mapagkakatiwalaan ang seksyong ito bilang unang hintuan para sa mga bagong contributor.
:::
