---
title: "प्रोजेक्ट अवलोकन"
description: "सभी ChurchApps रिपॉज़िटरी को श्रेणी के अनुसार मैप करें, जिसमें फ़्रेमवर्क, डेव पोर्ट, डेटाबेस और साझा @churchapps पैकेज कैसे इन्हें जोड़ते हैं, यह डेवलपर सेटअप दस्तावेज़ों में दिया गया है।"
---

# प्रोजेक्ट अवलोकन

<div class="article-intro">

ChurchApps में लगभग 20 स्वतंत्र रिपॉज़िटरी हैं, जिनमें से प्रत्येक [ChurchApps GitHub organization](https://github.com/ChurchApps) के अंतर्गत प्रकाशित है। यह पृष्ठ श्रेणी के अनुसार व्यवस्थित सभी प्रोजेक्ट की पूरी सूची देता है, साथ ही उनके फ़्रेमवर्क, पोर्ट और आपसी संबंध भी बताता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- जिस प्रोजेक्ट श्रेणी पर आप काम करना चाहते हैं, उसकी [आवश्यकताएँ](./prerequisites.md) इंस्टॉल करें

</div>

## बैकएंड API

सभी API Node.js, Express और TypeScript से बने हैं, और Serverless Framework के माध्यम से AWS Lambda पर डिप्लॉय किए जाते हैं।

| प्रोजेक्ट | उद्देश्य | डेव पोर्ट | डेटाबेस |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | मेंबरशिप, उपस्थिति, कंटेंट, दान, मैसेजिंग और डूइंग को कवर करने वाला मुख्य मॉड्यूलर मोनोलिथ | 8084 | प्रति मॉड्यूल अलग MySQL डेटाबेस (कुल 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church बैकएंड | -- | एकल `lessons` MySQL डेटाबेस |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAI द्वारा संचालित AI क्वेरी टूल | -- | -- |

:::info
मुख्य **Api** प्रोजेक्ट एक मॉड्यूलर मोनोलिथ है। प्रत्येक मॉड्यूल (मेंबरशिप, उपस्थिति, कंटेंट, दान, मैसेजिंग, डूइंग) का अपना डेटाबेस है और वह `/membership` या `/giving` जैसे सबपाथ पर उपलब्ध है। प्रोडक्शन में ये API Gateway के पीछे अलग-अलग Lambda फ़ंक्शन के रूप में उपलब्ध कराए जाते हैं।
:::

## वेब ऐप

| प्रोजेक्ट | फ़्रेमवर्क | डेव पोर्ट | उद्देश्य |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | चर्च प्रशासन डैशबोर्ड |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | सार्वजनिक, चर्च सदस्यों के लिए ऐप |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church फ़्रंटएंड |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | डेटा आयात/निर्यात उपयोगिता |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | स्टैटिक | -- | स्टैटिक चर्च ब्रोशर वेबसाइट |

## मोबाइल ऐप

सभी मोबाइल ऐप Expo के साथ React Native का उपयोग करते हैं।

| प्रोजेक्ट | उद्देश्य | मुख्य संस्करण |
|---------|---------|--------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | चेक-इन कियोस्क ऐप | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV पर पाठ प्रदर्शन | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | कंटेंट प्लेबैक (TV OS सहित) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow के लिए मोबाइल रिमोट कंट्रोल | Expo |

## डेस्कटॉप

| प्रोजेक्ट | स्टैक | उद्देश्य |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | प्रस्तुति और उपासना सॉफ़्टवेयर |

## साझा लाइब्रेरी

साझा कोड `@churchapps` स्कोप के अंतर्गत npm पर प्रकाशित होता है और ऊपर दिए प्रोजेक्ट द्वारा सामान्य npm डिपेंडेंसी के रूप में उपयोग किया जाता है। सभी साझा पैकेज एक ही रिपॉज़िटरी में रहते हैं -- [Packages](https://github.com/ChurchApps/Packages) -- जिसे Yarn workspace के रूप में प्रबंधित किया जाता है और changesets से रिलीज़ किया जाता है।

| पैकेज | उद्देश्य | उपयोग करने वाले |
|---------|---------|--------------|
| `@churchapps/helpers` | मूल उपयोगिताएँ और साझा TypeScript इंटरफ़ेस (DateHelper, ApiHelper, CurrencyHelper आदि) | सभी प्रोजेक्ट |
| `@churchapps/apihelper` | Express सर्वर उपयोगिताएँ (ऑथ, बेस कंट्रोलर, डेटाबेस एक्सेस, AWS एकीकरण) | सभी API |
| `@churchapps/apphelper` | React कंपोनेंट लाइब्रेरी, जिसमें लॉगिन, दान, फ़ॉर्म, मार्कडाउन और वेबसाइट बिल्डिंग के लिए सबपाथ मॉड्यूल हैं | सभी वेब ऐप |
| `@churchapps/content-providers` | तृतीय-पक्ष कंटेंट प्रदाताओं का एब्स्ट्रैक्शन (Lessons.church, Planning Center, Dropbox और अन्य) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church एकीकरण टूलकिट: वेबहुक, REST क्लाइंट, OAuth | बाहरी एकीकरण डेवलपर |
| `@churchapps/texting` | SMS प्रदाता एब्स्ट्रैक्शन | Api |

वर्कस्पेस सेटअप और रिलीज़ प्रक्रिया के लिए [साझा लाइब्रेरी](../shared-libraries/index.md) देखें।

## प्रोजेक्ट संबंध

```
फ़्रंटएंड ऐप              साझा लाइब्रेरी           बैकएंड API
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

सभी फ़्रंटएंड ऐप `@churchapps/helpers` पर निर्भर हैं। वेब ऐप अतिरिक्त रूप से `@churchapps/apphelper` पैकेज पर भी निर्भर हैं। सभी बैकएंड API `@churchapps/helpers` और `@churchapps/apihelper` दोनों पर निर्भर हैं।

## अगले चरण

- **[एनवायरनमेंट वेरिएबल्स](./environment-variables.md)** -- API से जुड़ने के लिए अपनी `.env` फ़ाइलें कॉन्फ़िगर करें
- **[API स्थानीय सेटअप](../api/local-setup.md)** -- बैकएंड API को स्थानीय रूप से सेट अप करें
