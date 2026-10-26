---
title: "Arkitektura"
---

# Arkitektura

<div class="article-intro">

Ang mga pahinang ito ay mga mapa ng buong sistema na naglalarawan kung paano gumagana ang isang core na sistema ng ChurchApps mula simula hanggang dulo, sa pagitan ng mga app, mga API module, at mga shared library. Hindi ito nagpapaliwanag kung paano i-set up ang isang proyekto. Basahin ang mga ito bago baguhin ang kilos ng isang sistema. Basahin ang [Setup](../setup/) para mapatakbo ang isang proyekto, at ang [API section](../api/) para sa reference ng bawat endpoint.

</div>

## Ang ecosystem sa maikling sulyap

Mahigit-kumulang 20 malayang repository ang ChurchApps (hindi ito monorepo). Ang mga client app ay nakikipag-usap sa iilang backend API sa pamamagitan ng HTTPS at WebSocket, at nagbabahagi ng code sa pamamagitan ng mga npm package na nasa ilalim ng scope na `@churchapps`.

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

Dalawang estrukturang panuntunan ang humuhubog sa lahat ng nakadokumento sa seksyong ito:

1. **Nakahiwalay ang mga module.** Bawat Api module ang may-ari ng sarili nitong database at mga table. Ang iba pang module at app ay naaabot lamang ang datos nito sa pamamagitan ng mga REST endpoint nito. Tingnan ang [Module Structure](../api/module-structure).
2. **Naka-ship ang shared code bilang mga npm package.** Hindi kailanman inaangkat ng mga app ang source ng isa't isa. Ang anumang muling ginagamit ay tumatawid sa hangganan ng repo sa pamamagitan ng `@churchapps/helpers`, `@churchapps/apphelper`, o `@churchapps/apihelper`. Tingnan ang [Shared Libraries](../shared-libraries/).

## Mga mapa ng sistema

| Pahina | Ano ang saklaw | Sumasaklaw sa |
|------|----------------|---------------|
| [Notifications & Reminders](./notifications) | Paano nagsasabi ang anuman ng isang bagay sa isang tao: ang dalawang pinto ng dispatch, ang chain ng pagtaas ng channel, at ang reminder engine | Api (messaging), B1Admin, B1App |
| [Real-time Architecture](../realtime) | Ang WebSocket delivery framework sa likod ng chat, presence, at in-app delivery | Api (messaging), lahat ng web app |
| [Web Push Notifications](../web-push) | Ang browser push channel: VAPID keys, pag-iimbak ng subscription, delivery | Api (messaging), lahat ng web app |
| [Giving](./giving) | Mga payment provider at gateway, daloy ng donasyon, funds/batches, gateway webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Event Registrations](./registrations) | Ang modelo ng commerce sa registration: mga uri ng attendee, mga pagpili, discount code, bayad sa pamamagitan ng giving gateway, at ang waitlist | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins) | Kiosk at self check-in, ang attendance data model, room routing, ang child-safety layer, pag-print ng label | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder) | Ang puno ng page/section/element, ang element-type contract at mga renderer, blog, mga page na may access gate, SEO, at AI generation | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website Routing & Multi-Site](./websites) | Paano nireresolba ng isang request ang simbahan at ang partikular na site, ang multi-site na `siteId` data model, at ang Caddy custom-domain edge | B1App, Api (membership + content), B1Admin |
| [Integrations](./integrations) | Ang extension surface: OAuth, API key, webhooks, content provider, MCP | Api, mga shared library, mga external app |
| [Audit Log & Undoable Batches](./audit-log) | Naka-on by default na pag-audit ng bawat mutation sa controller choke point, at ang batch layer na nagpapahintulot na i-undo ang mga import at bulk action | Api (lahat ng module), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Ang bayad na serbisyo ng storage at texting credit: shared-JWT identity, service-key S2S, ang texting at storage provider seam, Stripe billing | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper packages, B1Admin |
| [Bring-Your-Own Storage](./byos-storage) | Ikinokonekta ng mga simbahan ang Google Drive, Dropbox, OneDrive, o isang S3-compatible bucket para sa mga upload na lampas sa libreng 100MB: OAuth connect, mga hugis ng upload kada provider, ang public download redirect | Api (content + membership), helpers/apphelper packages, B1Admin, B1App |
| [Content Commons](./commons) | Ang shared na asset/submission spine sa likod ng user-generated na content na sumasaklaw sa maraming produkto, at ang iisang moderation queue na para lamang sa staff sa B1Admin Server Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Kapag binago ng isang pagbabago ang paggana ng isa sa mga sistemang ito, hindi lamang ang isang page sa loob ng isang app, dapat ding i-update ang kaukulang system map dito sa parehong gawain. Ganito nananatiling mapagkakatiwalaan ang seksyong ito bilang unang hihintuan ng mga bagong contributor.
:::

## Mga Panukala

Inilalarawan ng mga dokumentong ito ang iminumungkahing gawain para sa pagrepaso, at hindi ang umiiral nang kilos ng produkto.

| Panukala | Ano ang saklaw |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Account, mga key, service, at phone number na pag-aari ng simbahan; saklaw ng integrasyon, pahintulot, delivery, mga tantiya, at mga check bago ilabas |
| [Twilio church onboarding draft](./twilio-byok-onboarding-draft) | Iminumungkahing mga setting ng B1 signup form, mga halimbawa ng campaign na tiyak sa simbahan, at mga checklist sa pag-apruba at operasyon |
