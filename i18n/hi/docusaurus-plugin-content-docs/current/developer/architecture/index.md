---
title: "Architecture"
---

# Architecture

<div class="article-intro">

ये pages cross-repo system maps हैं: वे document करते हैं कि एक core ChurchApps system कैसे end-to-end काम करता है — apps, API modules, और shared libraries के across — बजाय इसके कि कोई single project कैसे set up होता है। system के behavior को change करने से पहले उन्हें read करें; project को run करने के लिए [Setup](../setup/) read करें और endpoint-level reference के लिए [API section](../api/) पढ़ें।

</div>

## The ecosystem at a glance

ChurchApps ~20 independent repositories है (monorepo नहीं)। Client apps एक small set के backend APIs से HTTPS और WebSocket के over talk करते हैं, और `@churchapps` scope के तहत published npm packages के through code share करते हैं।

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

दो structural rules सब कुछ को इस section में documented को shape करते हैं:

1. **Modules isolated हैं।** प्रत्येक Api module अपना database और अपनी tables own करता है; अन्य modules और apps इसके data को केवल अपने REST endpoints के through reach करते हैं। [Module Structure](../api/module-structure) देखें।
2. **Shared code npm packages के रूप में ships करता है।** Apps कभी एक दूसरे के source को import नहीं करते; कुछ भी reused `@churchapps/helpers`, `@churchapps/apphelper`, या `@churchapps/apihelper` के through repo boundaries को cross करता है। [Shared Libraries](../shared-libraries/) देखें।

## System maps

| Page | What it covers | Spans |
|------|---|---|
| [Notifications & Reminders](./notifications) | कैसे कुछ भी एक person को कुछ कहता है: two dispatch doors, channel escalation chain, और reminder engine | Api (messaging), B1Admin, B1App |
| [Real-time Architecture](../realtime) | Chat, presence, और in-app delivery के पीछे WebSocket delivery framework | Api (messaging), सभी web apps |
| [Web Push Notifications](../web-push) | Browser push channel: VAPID keys, subscription storage, delivery | Api (messaging), सभी web apps |
| [Giving](./giving) | Payment providers और gateways, donation flows, funds/batches, gateway webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Event Registrations](./registrations) | Registration commerce model: attendee types, selections, discount codes, payments giving gateway के through, और waitlist | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins) | Kiosk और self check-in, attendance data model, room routing, child-safety layer, label printing | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder) | Page/section/element tree, element-type contract और renderers, blog, access-gated pages, SEO, और AI generation | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website Routing & Multi-Site](./websites) | कैसे एक request एक church को एक specific site को resolve करता है, multi-site `siteId` data model, और Caddy custom-domain edge | B1App, Api (membership + content), B1Admin |
| [Integrations](./integrations) | Extension surface: OAuth, API keys, webhooks, content providers, MCP | Api, shared libraries, external apps |
| [Audit Log & Undoable Batches](./audit-log) | Default-on auditing हर mutation का controller choke point पर, और batch layer जो imports और bulk actions को undoable बनाता है | Api (सभी modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Paid storage & texting-credit service: shared-JWT identity, service-key S2S, texting और storage provider seams, Stripe billing | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper packages, B1Admin |
| [Bring-Your-Own Storage](./byos-storage) | Churches link Google Drive, Dropbox, OneDrive या एक S3-compatible bucket uploads के लिए free 100MB के पास: OAuth connect, per-provider upload shapes, public download redirect | Api (content + membership), helpers/apphelper packages, B1Admin, B1App |

:::tip
जब एक change alters करता है कि एक के ये systems कैसे काम करते हैं — केवल एक के अंदर एक page नहीं — matching system map यहाँ को updated किया जाना चाहिए same effort में। यह इस section को trustworthy रखता है new contributors के लिए first stop के रूप में।
:::
