---
title: "परियोजना अवलोकन"
---

# परियोजना अवलोकन

<div class="article-intro">

ChurchApps में लगभग 20 स्वतंत्र रिपॉज़िटरी हैं, जिनमें से प्रत्येक [ChurchApps GitHub organization](https://github.com/ChurchApps) के अंतर्गत प्रकाशित है। यह पृष्ठ सभी परियोजनाओं की पूरी सूची श्रेणी के अनुसार व्यवस्थित करके देता है, साथ ही उनके फ़्रेमवर्क, पोर्ट और आपसी संबंध भी बताता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- जिस परियोजना श्रेणी पर आप काम करना चाहते हैं, उसकी [आवश्यकताएँ](./prerequisites) इंस्टॉल करें

</div>

## बैकएंड API

सभी API Node.js, Express और TypeScript से बने हैं, और Serverless Framework के माध्यम से AWS Lambda पर deploy किए जाते हैं।

| परियोजना | उद्देश्य | डेव पोर्ट | डेटाबेस |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | मुख्य मॉड्यूलर मोनोलिथ, जो सदस्यता, उपस्थिति, सामग्री, दान, संदेश और कार्य को कवर करता है | 8084 | प्रत्येक मॉड्यूल के लिए अलग MySQL डेटाबेस (कुल 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church का बैकएंड | -- | एकल `lessons` MySQL डेटाबेस |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAI द्वारा संचालित AI क्वेरी टूल | -- | -- |

:::info
मुख्य **Api** परियोजना एक मॉड्यूलर मोनोलिथ है। प्रत्येक मॉड्यूल (सदस्यता, उपस्थिति, सामग्री, दान, संदेश, कार्य) का अपना डेटाबेस होता है और वह `/membership` या `/giving` जैसे सबपाथ पर उपलब्ध होता है। उत्पादन में, ये API Gateway के पीछे अलग-अलग Lambda फ़ंक्शन के रूप में उपलब्ध कराए जाते हैं।
:::

## वेब ऐप

| परियोजना | फ़्रेमवर्क | डेव पोर्ट | उद्देश्य |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | चर्च प्रशासन डैशबोर्ड |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | सार्वजनिक रूप से उपलब्ध चर्च सदस्य ऐप |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church फ़्रंटएंड |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | डेटा आयात/निर्यात उपयोगिता |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | स्टैटिक | -- | स्टैटिक चर्च ब्रोशर वेबसाइट |

## मोबाइल ऐप

सभी मोबाइल ऐप Expo के साथ React Native का उपयोग करते हैं।

| परियोजना | उद्देश्य | मुख्य संस्करण |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | iOS और Android के लिए चर्च सदस्य ऐप | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | चेक-इन किओस्क ऐप | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV पर पाठ प्रदर्शन | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | सामग्री प्लेबैक (TV OS सहित) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow के लिए मोबाइल रिमोट कंट्रोल | Expo |

## डेस्कटॉप

| परियोजना | स्टैक | उद्देश्य |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | प्रस्तुति और आराधना सॉफ़्टवेयर |

## साझा लाइब्रेरी

साझा कोड `@churchapps` स्कोप के तहत npm पर प्रकाशित होता है और ऊपर की परियोजनाओं द्वारा सामान्य npm निर्भरताओं के रूप में उपयोग किया जाता है। सभी साझा पैकेज एक ही रिपॉज़िटरी में रहते हैं, [Packages](https://github.com/ChurchApps/Packages), जिसे Yarn workspace के रूप में प्रबंधित किया जाता है और changesets के साथ जारी किया जाता है।

| पैकेज | उद्देश्य | उपयोग करने वाले |
|---------|---------|----------|
| `@churchapps/helpers` | मूल उपयोगिताएँ और साझा TypeScript interfaces (DateHelper, ApiHelper, CurrencyHelper, आदि) | सभी परियोजनाएँ |
| `@churchapps/apihelper` | Express server उपयोगिताएँ (auth, base controllers, डेटाबेस एक्सेस, AWS एकीकरण) | सभी API |
| `@churchapps/apphelper` | React component लाइब्रेरी, जिसमें login, donations, forms, markdown और वेबसाइट निर्माण के लिए subpath मॉड्यूल हैं | सभी वेब ऐप |
| `@churchapps/content-providers` | तृतीय-पक्ष सामग्री प्रदाताओं के लिए abstraction (Lessons.church, Planning Center, Dropbox और अन्य) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church इंटीग्रेशन टूलकिट: webhooks, REST client, OAuth | बाहरी इंटीग्रेशन डेवलपर |
| `@churchapps/texting` | SMS प्रदाता abstraction | Api |

workspace सेटअप और release प्रक्रिया के लिए [Shared Libraries](../shared-libraries/) देखें।

## परियोजनाओं के बीच संबंध

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

सभी फ़्रंटएंड ऐप `@churchapps/helpers` पर निर्भर हैं। वेब ऐप इसके अलावा `@churchapps/apphelper` पैकेज पर भी निर्भर हैं। सभी बैकएंड API `@churchapps/helpers` और `@churchapps/apihelper` दोनों पर निर्भर हैं।

## अगले चरण

- **[पर्यावरण चर](./environment-variables)** -- APIs से जुड़ने के लिए अपनी `.env` फ़ाइलें कॉन्फ़िगर करें
- **[API स्थानीय सेटअप](../api/local-setup)** -- बैकएंड API को स्थानीय रूप से सेट करें
