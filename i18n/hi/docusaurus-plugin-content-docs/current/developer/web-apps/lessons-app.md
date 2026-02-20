---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp [Lessons.church](https://lessons.church) के लिए पाठ सामग्री प्रबंधन एप्लिकेशन है। यह Next.js और React के साथ बनाया गया चर्च पाठ पाठ्यक्रम बनाने, व्यवस्थित करने और प्रकाशित करने के लिए इंटरफ़ेस प्रदान करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js 22+** और **Git** इंस्टॉल करें -- देखें [पूर्वापेक्षाएँ](../setup/prerequisites)
- अपना API लक्ष्य (स्टेजिंग या स्थानीय) कॉन्फ़िगर करें -- देखें [पर्यावरण चर](../setup/environment-variables)

</div>

:::warning
LessonsApp के लिए Node.js 22 या बाद का संस्करण आवश्यक है। पुराने संस्करण समर्थित नहीं हैं।
:::

## सेटअप

### 1. रिपॉज़िटरी क्लोन करें

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. डिपेंडेंसी इंस्टॉल करें

```bash
cd LessonsApp
npm install
```

### 3. पर्यावरण चर कॉन्फ़िगर करें

पर्यावरण नमूना फ़ाइल को `.env` में कॉपी करें और API एंडपॉइंट कॉन्फ़िगर करें:

```bash
cp dotenv.sample.txt .env
```

API एंडपॉइंट URL को स्टेजिंग API या अपने स्थानीय API इंस्टेंस पर पॉइंट करने के लिए अपडेट करें।

### 4. डेव सर्वर शुरू करें

```bash
npm run dev
```

Next.js डेव सर्वर [http://localhost:3501](http://localhost:3501) पर लॉन्च होता है।

## प्रमुख कमांड

| कमांड | विवरण |
|---------|-------------|
| `npm run dev` | पोर्ट 3501 पर Next.js डेव सर्वर शुरू करें |
| `npm run build` | Next.js के माध्यम से प्रोडक्शन बिल्ड |

## तकनीकी स्टैक

- **Next.js 16** TypeScript के साथ
- **React 19** UI कंपोनेंट के लिए
- **`@churchapps/apphelper*`** साझा कंपोनेंट के लिए पैकेज

:::info
LessonsApp **LessonsApi** बैकएंड के साथ संवाद करता है, जो मुख्य ChurchApps Api से एक अलग API है। सुनिश्चित करें कि आपका एनवायरनमेंट सही Lessons API एंडपॉइंट के साथ कॉन्फ़िगर किया गया है।
:::

## डिप्लॉयमेंट

प्रोडक्शन बिल्ड **S3 + CloudFront** पर डिप्लॉय किए जाते हैं:

1. `npm run build` ऑप्टिमाइज़्ड Next.js बिल्ड जनरेट करता है
2. बिल्ड आउटपुट S3 बकेट पर सिंक किया जाता है
3. नया संस्करण सर्व करने के लिए CloudFront इनवैलिडेशन ट्रिगर किया जाता है

:::tip
विस्तृत डिप्लॉयमेंट निर्देशों के लिए, [वेब ऐप डिप्लॉयमेंट](../deployment/web-apps) गाइड देखें।
:::
