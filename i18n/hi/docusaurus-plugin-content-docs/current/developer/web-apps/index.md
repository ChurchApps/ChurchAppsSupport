---
title: "वेब ऐप्स"
description: "ChurchApps के तीन वेब ऐप्स (B1 Admin, B1.church, Lessons.church) का अवलोकन: उनका साझा React और MUI स्टैक, apphelper पैकेज और बिल्ड टूलिंग।"
---

# वेब ऐप्स

<div class="article-intro">

ChurchApps में तीन वेब एप्लिकेशन शामिल हैं, जिनमें से हर एक अलग दर्शकों और उद्देश्य की सेवा करता है। इन सभी का साझा तकनीकी आधार है: React 19, TypeScript और Material-UI 7। हालांकि, इनके बिल्ड टूल और डिप्लॉयमेंट लक्ष्य अलग-अलग हैं।

</div>

## एक नज़र में ऐप्स

| ऐप | उद्देश्य | फ्रेमवर्क | डेव पोर्ट |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | चर्च प्रशासन डैशबोर्ड | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | चर्च के सदस्यों के लिए सार्वजनिक ऐप | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | पाठ सामग्री प्रबंधन | Next.js 16 + React 19 | 3501 |

## साझा टेक स्टैक

तीनों वेब ऐप इन तकनीकों से बने हैं:

- **TypeScript** -- एंड-टू-एंड टाइप सुरक्षा
- **React 19** -- UI कंपोनेंट लाइब्रेरी
- **Material-UI 7** -- डिज़ाइन सिस्टम और कंपोनेंट टूलकिट
- **React Query 5** -- सर्वर स्टेट प्रबंधन

## साझा कंपोनेंट

ये ऐप UI कंपोनेंट और utilities को `@churchapps/apphelper*` पैकेज परिवार के माध्यम से साझा करते हैं:

| पैकेज | उद्देश्य |
|---------|---------|
| `@churchapps/apphelper` | मुख्य साझा React कंपोनेंट |
| `@churchapps/apphelper-login` | प्रमाणीकरण UI कंपोनेंट |
| `@churchapps/apphelper-donations` | दान और दान देने के फ़ॉर्म |
| `@churchapps/apphelper-forms` | फ़ॉर्म बिल्डर कंपोनेंट |
| `@churchapps/apphelper-markdown` | Markdown रेंडरिंग |
| `@churchapps/apphelper-website` | वेबसाइट/CMS कंपोनेंट |

:::tip
इन साझा पैकेजों को स्थानीय रूप से विकसित करने के बारे में जानकारी के लिए, [AppHelper](../shared-libraries/app-helper.md) दस्तावेज़ देखें।
:::

## Postinstall स्क्रिप्ट

हर वेब ऐप में एक `postinstall` स्क्रिप्ट होती है, जो `@churchapps/apphelper` से locale फ़ाइलें और CSS एसेट्स प्रोजेक्ट में कॉपी करती है। यह `npm install` के बाद अपने आप चलती है।

:::info
अगर dependencies इंस्टॉल करने के बाद कंपोनेंट बिना स्टाइल के दिखें, तो `postinstall` स्क्रिप्ट ठीक से नहीं चली होगी। आप इसे मैन्युअली `npm run postinstall` से चला सकते हैं।
:::

## बिल्ड टूलिंग

ये ऐप दो अलग-अलग बिल्ड टूल इस्तेमाल करते हैं:

- **B1Admin** **Vite** का उपयोग करता है -- एक तेज़, आधुनिक bundler जो single-page applications के लिए आदर्श है
- **B1App** और **LessonsApp** **Next.js** का उपयोग करते हैं -- जो server-side rendering, file-based routing और optimized production builds प्रदान करता है
