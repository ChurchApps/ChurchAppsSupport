---
title: "आर्किटेक्चर"
---

# आर्किटेक्चर

<div class="article-intro">

ये पृष्ठ क्रॉस-रेपो सिस्टम maps हैं: वे document करते हैं कि एक core ChurchApps सिस्टम end-to-end कैसे काम करता है — apps, API modules, और shared libraries में — किसी एक project को कैसे set up किया जाए इसके बजाय। एक सिस्टम के behavior को change करने से पहले उन्हें read करें; एक project को चलाने के लिए [Setup](../setup/) read करें और endpoint-level reference के लिए [API section](../api/)।

</div>

## एक नज़र में ecosystem

ChurchApps ~20 independent repositories है (monorepo नहीं)। Client apps एक छोटे backend APIs के set से HTTPS और WebSocket पर बात करते हैं, और code को npm packages के माध्यम से `@churchapps` scope के तहत share करते हैं।

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

दो संरचनात्मक नियम इस section में documented सब कुछ को shape करते हैं:

1. **Modules isolated हैं।** हर Api module अपने database और अपनी tables को own करता है; अन्य modules और apps इसके डेटा को केवल अपने REST endpoints के माध्यम से reach करते हैं। देखें [Module Structure](../api/module-structure)।
2. **Shared code npm packages के रूप में ships होता है।** Apps कभी भी एक दूसरे के source को import नहीं करते हैं; कुछ भी reused `@churchapps/helpers`, `@churchapps/apphelper`, या `@churchapps/apihelper` के माध्यम से repo boundaries को cross करता है। देखें [Shared Libraries](../shared-libraries/)।

## सिस्टम maps

| पृष्ठ | यह क्या cover करता है | Spans |
|------|----------------|-------|
| [Notifications & Reminders](./notifications) | कैसे कुछ भी एक व्यक्ति को कुछ बताता है: दो dispatch doors, channel escalation chain, और reminder engine | Api (messaging), B1Admin, B1App |
| [Real-time Architecture](../realtime) | chat, presence, और in-app delivery के पीछे WebSocket delivery framework | Api (messaging), all web apps |
| [Web Push Notifications](../web-push) | browser push channel: VAPID keys, subscription storage, delivery | Api (messaging), all web apps |
| [Giving](./giving) | Payment providers और gateways, donation flows, funds/batches, gateway webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Event Registrations](./registrations) | Registration commerce model: attendee types, selections, discount codes, giving gateway के माध्यम से payments, और waitlist | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins) | Kiosk और self check-in, attendance data model, room routing, child-safety layer, label printing | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder) | page/section/element tree, element-type contract और renderers, blog, access-gated pages, SEO, और AI generation | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website Routing & Multi-Site](./websites) | कैसे एक request एक church और एक specific site को resolve करता है, multi-site `siteId` data model, और Caddy custom-domain edge | B1App, Api (membership + content), B1Admin |
| [Integrations](./integrations) | Extension surface: OAuth, API keys, webhooks, content providers, MCP | Api, shared libraries, external apps |
| [Audit Log & Undoable Batches](./audit-log) | Default-on auditing of every mutation at the controller choke point, और batch layer जो imports और bulk actions को undoable बनाता है | Api (all modules), B1Admin, B1Transfer |

:::tip
जब एक change इन systems में से किसी एक के behavior को alter करता है — केवल एक app के अंदर एक page नहीं — तो matching system map को यहां एक ही effort में update किया जाना चाहिए। यह इस section को new contributors के लिए trustworthy first stop के रूप में रखता है।
:::
