---
title: "प्रोजेक्ट अवलोकन"
---

# प्रोजेक्ट अवलोकन

<div class="article-intro">

ChurchApps में लगभग 20 स्वतंत्र रिपॉज़िटरीज़ शामिल हैं, जो सभी [ChurchApps GitHub संगठन](https://github.com/ChurchApps) के तहत प्रकाशित हैं। यह पृष्ठ श्रेणी के अनुसार सभी प्रोजेक्ट्स की एक पूर्ण सूची प्रदान करता है, साथ ही उनके फ्रेमवर्क, पोर्ट और संबंधों का विवरण भी।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- जिस प्रोजेक्ट श्रेणी पर आप काम करना चाहते हैं, उसके लिए [आवश्यक शर्तें](./prerequisites) इंस्टॉल करें

</div>

## बैकएंड API

सभी API Node.js, Express, और TypeScript के साथ बनाए गए हैं, और Serverless Framework के माध्यम से AWS Lambda पर डिप्लॉय किए जाते हैं।

| प्रोजेक्ट | उद्देश्य | डेव पोर्ट | डेटाबेस |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | membership, attendance, content, giving, messaging, और doing को कवर करने वाला कोर मॉड्यूलर मोनोलिथ | 8084 | प्रति मॉड्यूल अलग MySQL डेटाबेस (कुल 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church बैकएंड | -- | एकल `lessons` MySQL डेटाबेस |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAI द्वारा संचालित AI क्वेरी टूल | -- | -- |

:::info
कोर **Api** प्रोजेक्ट एक मॉड्यूलर मोनोलिथ है। प्रत्येक मॉड्यूल (membership, attendance, content, giving, messaging, doing) का अपना डेटाबेस है और `/membership` या `/giving` जैसे सबपाथ पर पहुँचा जा सकता है। प्रोडक्शन में, ये API Gateway के पीछे अलग Lambda फ़ंक्शन के रूप में एक्सपोज़ किए जाते हैं।
:::

## वेब ऐप्स

| प्रोजेक्ट | फ्रेमवर्क | डेव पोर्ट | उद्देश्य |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | चर्च प्रशासन डैशबोर्ड |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | सार्वजनिक चर्च सदस्य ऐप |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church फ्रंटएंड |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | डेटा आयात/निर्यात उपयोगिता |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | स्थिर चर्च ब्रोशर वेबसाइटें |

## मोबाइल ऐप्स

सभी मोबाइल ऐप्स Expo के साथ React Native का उपयोग करते हैं।

| प्रोजेक्ट | उद्देश्य | मुख्य संस्करण |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | iOS और Android के लिए चर्च सदस्य ऐप | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | चेक-इन कियोस्क ऐप | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV पाठ प्रदर्शन | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | सामग्री प्लेबैक (TV OS सहित) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow के लिए मोबाइल रिमोट कंट्रोल | Expo |

## डेस्कटॉप

| प्रोजेक्ट | स्टैक | उद्देश्य |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | प्रस्तुतीकरण और उपासना सॉफ़्टवेयर |

## साझा लाइब्रेरीज़

साझा कोड npm पर `@churchapps` स्कोप के तहत प्रकाशित किया जाता है। इन्हें ऊपर के प्रोजेक्ट्स द्वारा नियमित npm डिपेंडेंसीज़ के रूप में उपयोग किया जाता है।

| पैकेज | npm नाम | उद्देश्य | उपयोगकर्ता |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | आधार उपयोगिताएँ (DateHelper, ApiHelper, CurrencyHelper, आदि) | सभी प्रोजेक्ट्स |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Express सर्वर उपयोगिताएँ (auth middleware, DB helpers, AWS इंटीग्रेशन) | सभी API |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | 6 पैकेज के साथ Workspace | React कंपोनेंट लाइब्रेरी | सभी वेब ऐप्स |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | YouTube, Vimeo, और स्थानीय सामग्री प्रदाता | FreeShow, FreePlay, Api |

### AppHelper उप-पैकेज

AppHelper प्रोजेक्ट एक मोनोरेपो workspace है जो छह पैकेज प्रकाशित करता है:

| पैकेज | npm नाम |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## प्रोजेक्ट संबंध

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

सभी फ्रंटएंड ऐप्स `@churchapps/helpers` पर निर्भर करते हैं। वेब ऐप्स अतिरिक्त रूप से `@churchapps/apphelper` पैकेजों पर निर्भर करते हैं। सभी बैकएंड API `@churchapps/helpers` और `@churchapps/apihelper` दोनों पर निर्भर करते हैं।

## अगले कदम

- **[एनवायरनमेंट वेरिएबल्स](./environment-variables)** -- API से कनेक्ट करने के लिए अपनी `.env` फ़ाइलें कॉन्फ़िगर करें
- **[API स्थानीय सेटअप](../api/local-setup)** -- बैकएंड API को स्थानीय रूप से सेट करें
