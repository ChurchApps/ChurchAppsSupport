---
title: "आर्किटेक्चर"
---

# आर्किटेक्चर

<div class="article-intro">

ये पृष्ठ क्रॉस-रेपो सिस्टम मैप हैं: ये दस्तावेज़ करते हैं कि एक core ChurchApps सिस्टम end-to-end कैसे काम करता है — apps, API modules, और shared libraries में — न कि किसी एक प्रोजेक्ट को कैसे सेट अप किया जाए। किसी सिस्टम का व्यवहार बदलने से पहले इन्हें पढ़ें; किसी प्रोजेक्ट को चलाने के लिए [Setup](../setup/) और endpoint-स्तर के संदर्भ के लिए [API सेक्शन](../api/) पढ़ें।

</div>

## एक नज़र में इकोसिस्टम

ChurchApps ~20 स्वतंत्र रिपॉज़िटरी हैं (monorepo नहीं)। क्लाइंट ऐप्स HTTPS और WebSocket पर बैकएंड APIs के एक छोटे सेट से बात करते हैं, और `@churchapps` स्कोप के तहत publish किए गए npm पैकेज के माध्यम से कोड शेयर करते हैं।

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

दो संरचनात्मक नियम इस सेक्शन में डॉक्यूमेंट की गई हर चीज़ को आकार देते हैं:

1. **मॉड्यूल आइसोलेटेड हैं।** हर Api मॉड्यूल अपने डेटाबेस और अपनी टेबल का मालिक है; अन्य मॉड्यूल और ऐप्स इसके डेटा तक केवल इसके REST एंडपॉइंट्स के माध्यम से पहुँचते हैं। देखें [Module Structure](../api/module-structure)।
2. **शेयर्ड कोड npm पैकेज के रूप में शिप होता है।** ऐप्स कभी भी एक-दूसरे का सोर्स इम्पोर्ट नहीं करते; जो कुछ भी दोबारा उपयोग किया जाता है वह `@churchapps/helpers`, `@churchapps/apphelper`, या `@churchapps/apihelper` के माध्यम से रिपॉज़िटरी सीमाओं को पार करता है। देखें [Shared Libraries](../shared-libraries/)।

## सिस्टम मैप

| पृष्ठ | यह क्या कवर करता है | दायरा |
|------|----------------|-------|
| [Notifications & Reminders](./notifications) | कैसे कोई भी चीज़ किसी व्यक्ति को कुछ बताती है: दो डिस्पैच दरवाज़े, चैनल एस्केलेशन चेन, और रिमाइंडर इंजन | Api (messaging), B1Admin, B1App |
| [Real-time Architecture](../realtime) | चैट, प्रेजेंस, और इन-ऐप डिलीवरी के पीछे WebSocket डिलीवरी फ्रेमवर्क | Api (messaging), सभी वेब ऐप्स |
| [Web Push Notifications](../web-push) | ब्राउज़र पुश चैनल: VAPID कीज़, सब्सक्रिप्शन स्टोरेज, डिलीवरी | Api (messaging), सभी वेब ऐप्स |
| [Giving](./giving) | पेमेंट प्रोवाइडर और गेटवे, डोनेशन फ़्लो, फंड्स/बैच, गेटवे वेबहुक्स | Api (giving), apphelper, B1App, B1Admin |
| [Event Registrations](./registrations) | रजिस्ट्रेशन कॉमर्स मॉडल: अटेंडी टाइप, सिलेक्शन, डिस्काउंट कोड, giving गेटवे के माध्यम से पेमेंट, और वेटलिस्ट | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins) | कियोस्क और सेल्फ चेक-इन, अटेंडेंस डेटा मॉडल, रूम राउटिंग, चाइल्ड-सेफ्टी लेयर, लेबल प्रिंटिंग | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder) | पेज/सेक्शन/एलिमेंट ट्री, एलिमेंट-टाइप कॉन्ट्रैक्ट और रेंडरर, ब्लॉग, एक्सेस-गेटेड पेज, SEO, और AI जनरेशन | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website Routing & Multi-Site](./websites) | कैसे एक रिक्वेस्ट किसी चर्च और किसी specific साइट को resolve करती है, multi-site `siteId` डेटा मॉडल, और Caddy custom-domain edge | B1App, Api (membership + content), B1Admin |
| [Integrations](./integrations) | एक्सटेंशन सतह: OAuth, API keys, वेबहुक्स, कंटेंट प्रोवाइडर, MCP | Api, शेयर्ड लाइब्रेरी, बाहरी ऐप्स |
| [Audit Log & Undoable Batches](./audit-log) | कंट्रोलर चोक पॉइंट पर हर mutation की डिफ़ॉल्ट-ऑन auditing, और वह बैच लेयर जो इम्पोर्ट और बल्क एक्शन को undoable बनाती है | Api (सभी मॉड्यूल), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | पेड स्टोरेज और टेक्सटिंग-क्रेडिट सर्विस: शेयर्ड-JWT आइडेंटिटी, service-key S2S, texting और storage प्रोवाइडर सीम, Stripe बिलिंग | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper पैकेज, B1Admin |

:::tip
जब कोई बदलाव इनमें से किसी एक सिस्टम के काम करने के तरीके को बदलता है — न कि सिर्फ किसी एक ऐप के भीतर एक पेज को — तो यहाँ मौजूद संबंधित सिस्टम मैप को उसी प्रयास में अपडेट किया जाना चाहिए। इससे यह सेक्शन नए कंट्रीब्यूटर्स के लिए पहले पड़ाव के रूप में भरोसेमंद बना रहता है।
:::
