---
title: "आर्किटेक्चर"
---

# आर्किटेक्चर

<div class="article-intro">

ये पृष्ठ क्रॉस-रिपो सिस्टम मैप हैं: ये दस्तावेज़ करते हैं कि कोई कोर ChurchApps सिस्टम पूरी तरह से कैसे काम करता है — ऐप्स, API मॉड्यूल और साझा लाइब्रेरी के पार — न कि यह कि कोई एक प्रोजेक्ट कैसे सेट किया जाता है। किसी सिस्टम का व्यवहार बदलने से पहले इन्हें पढ़ें; किसी प्रोजेक्ट को चालू करने के लिए [सेटअप](../setup/) पढ़ें, और एंडपॉइंट-स्तरीय संदर्भ के लिए [API खंड](../api/)।

</div>

## ईकोसिस्टम एक नज़र में

ChurchApps लगभग 20 स्वतंत्र रिपॉज़िटरी है (मोनोरिपो नहीं)। क्लाइंट ऐप्स HTTPS और WebSocket पर कुछ बैकएंड APIs से बात करते हैं, और `@churchapps` स्कोप के तहत npm पैकेज के ज़रिए कोड साझा करते हैं।

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

इस सेक्शन में दस्तावेज़ किए गए हर चीज़ को आकार देने वाले दो संरचनात्मक नियम:

1. **मॉड्यूल अलग-थलग हैं।** हर Api मॉड्यूल अपना डेटाबेस और अपनी टेबल रखता है; अन्य मॉड्यूल और ऐप्स उसके डेटा तक केवल उसके REST एंडपॉइंट्स के ज़रिए पहुँचते हैं। देखें [Module Structure](../api/module-structure)।
2. **साझा कोड npm पैकेज के रूप में आता है।** ऐप्स एक-दूसरे का सोर्स कभी इम्पोर्ट नहीं करते; जो कुछ भी दोबारा उपयोग होता है वह `@churchapps/helpers`, `@churchapps/apphelper`, या `@churchapps/apihelper` के माध्यम से रिपो सीमाएँ पार करता है। देखें [Shared Libraries](../shared-libraries/)।

## सिस्टम मैप

| पृष्ठ | यह किस बारे में है | किन्हें छूता है |
|------|----------------|-------|
| [Notifications & Reminders](./notifications) | कोई किसी व्यक्ति को कुछ कैसे बताता है: दो डिस्पैच द्वार, चैनल एस्कलेशन श्रृंखला, और रिमाइंडर इंजन | Api (messaging), B1Admin, B1App |
| [Real-time Architecture](../realtime) | WebSocket डिलीवरी फ़्रेमवर्क जो चैट, प्रेज़ेंस और इन-ऐप डिलीवरी के पीछे है | Api (messaging), सभी वेब ऐप्स |
| [Web Push Notifications](../web-push) | ब्राउज़र पुश चैनल: VAPID कुंजियाँ, सब्सक्रिप्शन स्टोरेज, डिलीवरी | Api (messaging), सभी वेब ऐप्स |
| [Giving](./giving) | भुगतान प्रदाता और गेटवे, दान प्रवाह, फ़ंड/बैच, गेटवे webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Event Registrations](./registrations) | पंजीकरण वाणिज्य मॉडल: attendee प्रकार, चयन, डिस्काउंट कोड, giving गेटवे के ज़रिए भुगतान, और प्रतीक्षा सूची | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins) | किओस्क और सेल्फ़ चेक-इन, उपस्थिति डेटा मॉडल, कमरा रूटिंग, बाल-सुरक्षा परत, लेबल प्रिंटिंग | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder) | पेज/सेक्शन/एलिमेंट ट्री, एलिमेंट-प्रकार अनुबंध और रेंडरर, ब्लॉग, एक्सेस-गेटेड पेज, SEO, और AI जेनरेशन | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website Routing & Multi-Site](./websites) | कोई अनुरोध एक चर्च और एक विशिष्ट साइट तक कैसे हल होता है, मल्टी-साइट `siteId` डेटा मॉडल, और Caddy कस्टम-डोमेन एज | B1App, Api (membership + content), B1Admin |
| [Integrations](./integrations) | एक्सटेंशन सतह: OAuth, API keys, webhooks, content providers, MCP | Api, साझा लाइब्रेरी, बाहरी ऐप्स |
| [Audit Log & Undoable Batches](./audit-log) | कंट्रोलर चोक पॉइंट पर हर म्यूटेशन का डिफ़ॉल्ट-चालू ऑडिटिंग, और वह बैच परत जो इम्पोर्ट और बल्क कार्रवाइयों को पूर्ववत करने योग्य बनाती है | Api (सभी मॉड्यूल), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | भुगतान वाली स्टोरेज और टेक्स्टिंग-क्रेडिट सेवा: shared-JWT पहचान, service-key S2S, टेक्स्टिंग और स्टोरेज प्रदाता सीम, Stripe बिलिंग | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper पैकेज, B1Admin |
| [Bring-Your-Own Storage](./byos-storage) | चर्च 100MB की मुफ़्त सीमा से आगे अपलोड के लिए Google Drive, Dropbox, OneDrive या S3-संगत बकेट जोड़ते हैं: OAuth कनेक्ट, प्रति-प्रदाता अपलोड आकार, सार्वजनिक डाउनलोड रीडायरेक्ट | Api (content + membership), helpers/apphelper पैकेज, B1Admin, B1App |
| [Content Commons](./commons) | क्रॉस-प्रोडक्ट उपयोगकर्ता-जनित सामग्री के पीछे की साझा एसेट/सबमिशन रीढ़, और B1Admin Server Admin में केवल-स्टाफ़ मॉडरेशन कतार | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
जब कोई बदलाव इनमें से किसी सिस्टम के काम करने के तरीके को बदलता है — केवल किसी एक ऐप के भीतर के पेज को नहीं — तो यहाँ का संबंधित सिस्टम मैप उसी प्रयास में अपडेट होना चाहिए। इससे यह सेक्शन नए योगदानकर्ताओं के लिए भरोसेमंद पहला पड़ाव बना रहता है।
:::

## प्रस्ताव

ये दस्तावेज़ समीक्षा के लिए प्रस्तावित कार्य का वर्णन करते हैं, न कि उपलब्ध उत्पाद व्यवहार का।

| प्रस्ताव | यह किस बारे में है |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | चर्च-स्वामित्व वाला खाता, कुंजियाँ, सेवा और फ़ोन नंबर; इंटीग्रेशन का दायरा, सहमति, डिलीवरी, अनुमान, और रिलीज़ जाँचें |
| [Twilio church onboarding draft](./twilio-byok-onboarding-draft) | प्रस्तावित B1 साइनअप-फ़ॉर्म सेटिंग्स, चर्च-विशिष्ट कैंपेन उदाहरण, और स्वीकृति/संचालन चेकलिस्ट |
