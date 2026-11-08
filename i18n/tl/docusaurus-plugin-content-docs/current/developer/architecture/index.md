---
title: "Arkitektura"
description: "Mga mapa ng sistema sa iba't ibang repo na nagpapakita kung paano gumagana ang pagbibigay, check-in, notipikasyon, at website sa B1 Admin, B1.church, at Api, bago mo baguhin ang mga ito."
---

# Arkitektura

<div class="article-intro">

Ang mga pahinang ito ay mga mapa ng sistema sa iba't ibang repo: idinodokumento nila kung paano gumagana ang isang pangunahing sistema ng ChurchApps mula simula hanggang dulo, sa iba't ibang app, API module, at shared library, sa halip na kung paano i-set up ang isang partikular na proyekto. Basahin ang mga ito bago baguhin ang behavior ng isang sistema; basahin ang [Setup](../setup/index.md) para mapatakbo ang isang proyekto, at ang [API section](../api/index.md) para sa reference ng endpoint.

</div>

## Ang buong ekosistema sa sulyap

Ang ChurchApps ay may humigit-kumulang 20 magkakahiwalay na repository (hindi monorepo). Nakikipag-usap ang mga client app sa iilang backend API sa pamamagitan ng HTTPS at WebSocket, at nagbabahagi ng code sa pamamagitan ng mga npm package na inilathala sa ilalim ng `@churchapps` scope.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Dalawang estruktural na tuntunin ang humuhubog sa lahat ng nakadokumento sa seksyong ito:

1. **Hiwalay ang mga module.** Bawat module ng Api ay may sariling database at mga talahanayan; ang ibang module at app ay naaabot lamang ang datos nito sa pamamagitan ng REST endpoint nito. Tingnan ang [Module Structure](../api/module-structure.md).
2. **Ang shared code ay ipinapamahagi bilang npm package.** Hindi kailanman ini-import ng mga app ang source code ng isa't isa; anumang muling ginagamit ay tumatawid sa hangganan ng repo sa pamamagitan ng `@churchapps/helpers`, `@churchapps/apphelper`, o `@churchapps/apihelper`. Tingnan ang [Shared Libraries](../shared-libraries/index.md).

## Mga mapa ng sistema

| Pahina | Saklaw | Sakop |
|------|----------------|-------|
| [Mga Notipikasyon at Paalala](./notifications.md) | Paano nagsasabi ang anuman ng isang bagay sa isang tao: ang dalawang dispatch door, ang channel escalation chain, at ang reminder engine | Api (messaging), B1Admin, B1App |
| [Arkitekturang Real-time](../realtime.md) | Ang WebSocket delivery framework sa likod ng chat, presence, at in-app delivery | Api (messaging), lahat ng web app |
| [Web Push Notifications](../web-push.md) | Ang browser push channel: VAPID keys, pag-iimbak ng subscription, delivery | Api (messaging), lahat ng web app |
| [Pagbibigay](./giving.md) | Mga payment provider at gateway, daloy ng donasyon, funds/batches, gateway webhook | Api (giving), apphelper, B1App, B1Admin |
| [Pagpaparehistro sa Event](./registrations.md) | Ang modelo ng commerce sa pagpaparehistro: mga uri ng attendee, pagpili, discount code, bayad sa pamamagitan ng giving gateway, at waitlist | Api (content + giving), B1App, B1Admin |
| [Check-In](./check-ins.md) | Kiosk at self check-in, ang data model ng attendance, room routing, child-safety layer, pag-print ng label | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Tagabuo ng Website](./website-builder.md) | Ang puno ng page/section/element, ang kontrata ng element type at mga renderer, blog, mga pahinang may access gate, SEO, at AI generation | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Routing ng Website at Multi-Site](./websites.md) | Paano nireresolba ang isang request sa isang simbahan at partikular na site, ang multi-site `siteId` data model, at ang Caddy custom-domain edge | B1App, Api (membership + content), B1Admin |
| [Mga Integrasyon](./integrations.md) | Ang extension surface: OAuth, API key, webhook, content provider, MCP | Api, shared libraries, mga external app |
| [Audit Log at mga Batch na Maaaring Ibalik](./audit-log.md) | Awtomatikong naka-on na auditing ng bawat mutation sa controller choke point, at ang batch layer na nagpapahintulot na maibalik ang mga import at bulk action | Api (lahat ng module), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Ang bayad na serbisyo ng storage at texting credit: shared-JWT identity, service-key S2S, ang texting at storage provider seam, Stripe billing | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper packages, B1Admin |
| [Sariling Storage (Bring-Your-Own Storage)](./byos-storage.md) | Ikinokonekta ng mga simbahan ang Google Drive, Dropbox, OneDrive, o S3-compatible bucket para sa mga upload na lampas sa libreng 100MB: OAuth connect, mga upload shape ayon sa provider, ang public download redirect | Api (content + membership), helpers/apphelper packages, B1Admin, B1App |
| [Content Commons](./commons.md) | Ang shared asset/submission spine sa likod ng user-generated content na lumalampas sa iisang produkto, at ang iisang moderation queue na para lamang sa staff sa B1Admin Server Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Kapag binago ng isang pagbabago kung paano gumagana ang isa sa mga sistemang ito, hindi lamang ang isang pahina sa loob ng isang app, dapat ding i-update ang kaukulang mapa ng sistema dito sa parehong gawain. Pinapanatili nitong mapagkakatiwalaan ang seksyong ito bilang unang sanggunian ng mga bagong contributor.
:::

## Mga Panukala

Ang mga dokumentong ito ay naglalarawan ng iminumungkahing gawain para sa pagsusuri, hindi ng umiiral nang behavior ng produkto.

| Panukala | Saklaw |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Account, keys, service, at phone number na pagmamay-ari ng simbahan; saklaw ng integrasyon, pahintulot, delivery, mga pagtataya, at mga pagsusuri bago ilabas |
| [Draft ng onboarding ng simbahan sa Twilio](./twilio-byok-onboarding-draft.md) | Iminumungkahing mga setting ng signup form sa B1, mga halimbawa ng campaign na partikular sa simbahan, at mga checklist para sa pag-apruba at operasyon |
