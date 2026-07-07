---
title: "स्थानीय API सेटअप"
---

# स्थानीय API सेटअप

<div class="article-intro">

यह गाइड आपको स्थानीय विकास के लिए ChurchApps API सेटअप करने की प्रक्रिया से गुज़ारती है। आप रिपॉज़िटरी क्लोन करेंगे, अपने डेटाबेस कनेक्शन कॉन्फ़िगर करेंगे, स्कीमा इनिशियलाइज़ करेंगे, और हॉट रीलोड के साथ डेव सर्वर शुरू करेंगे।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js 22+**, **Git**, और **MySQL 8.0+** इंस्टॉल करें -- देखें [पूर्वापेक्षाएं](../setup/prerequisites)
- डेटाबेस निर्माण विशेषाधिकारों के साथ एक MySQL उपयोगकर्ता बनाएं
- API कॉन्फ़िगरेशन के लिए [पर्यावरण चर](../setup/environment-variables) संदर्भ देखें

</div>

## चरण-दर-चरण सेटअप

### 1. रिपॉज़िटरी क्लोन करें

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. डिपेंडेंसी इंस्टॉल करें

प्रोजेक्ट Yarn का उपयोग करता है (एक गार्ड `npm install` को ब्लॉक करता है):

```bash
cd Api
yarn install
```

### 3. पर्यावरण चर कॉन्फ़िगर करें

```bash
cp .env.sample .env
```

`.env` खोलें और अपनी MySQL कनेक्शन स्ट्रिंग कॉन्फ़िगर करें। प्रत्येक मॉड्यूल को निम्नलिखित प्रारूप में अपने डेटाबेस कनेक्शन की आवश्यकता होती है:

```
mysql://root:password@localhost:3306/dbname
```

आपको सभी छह मॉड्यूल डेटाबेस (membership, attendance, content, giving, messaging, doing) के लिए कनेक्शन स्ट्रिंग की आवश्यकता होगी।

### 4. डेटाबेस इनिशियलाइज़ करें

```bash
npm run initdb
```

यह स्वचालित रूप से सभी छह डेटाबेस और उनकी तालिकाएं बनाता है।

:::tip
आप `npm run initdb -- --module=membership` (या `attendance`, `content`, `giving`, `messaging`, `doing`) के साथ एक मॉड्यूल का डेटाबेस इनिशियलाइज़ कर सकते हैं।
:::

### 5. डेव सर्वर शुरू करें

```bash
npm run dev
```

API हॉट रीलोड के साथ [http://localhost:8084](http://localhost:8084) पर शुरू होता है।

## प्रमुख कमांड

| कमांड | विवरण |
|---------|-------------|
| `npm run dev` | हॉट रीलोड के साथ डेव सर्वर शुरू करें (tsx watch) |
| `npm run build` | क्लीन, TypeScript कंपाइल करें, और एसेट कॉपी करें |
| `npm run test` | Jest के साथ परीक्षण चलाएं (कवरेज सहित) |
| `npm run test:watch` | वॉच मोड में परीक्षण चलाएं |
| `npm run lint` | ऑटो-फिक्स के साथ ESLint चलाएं (ESLint एकमात्र फॉर्मेटर है) |

## स्टेजिंग डिप्लॉयमेंट

स्टेजिंग एनवायरनमेंट पर डिप्लॉय करने के लिए:

```bash
npm run deploy-staging
```

यह प्रोडक्शन बिल्ड चलाता है और फिर Serverless Framework के माध्यम से डिप्लॉय करता है।

:::warning
डिप्लॉय कमांड चलाने से पहले सुनिश्चित करें कि आपके AWS क्रेडेंशियल कॉन्फ़िगर हैं।
:::

## स्थानीय लाइब्रेरी विकास

यदि आपको API के साथ-साथ एक साझा लाइब्रेरी (`@churchapps/helpers` या `@churchapps/apihelper`) विकसित करनी है, तो इसे [Packages](https://github.com/ChurchApps/Packages) वर्कस्पेस में बनाएं और API में एक अस्थायी Yarn पोर्टल जोड़ें:

```bash
# Packages वर्कस्पेस में
yarn build

# API डायरेक्टरी में
yarn link ../Packages/helpers
# ... परीक्षण ...
yarn unlink ../Packages/helpers && yarn install
```

यह आपको npm पर प्रकाशित किए बिना API के विरुद्ध लाइब्रेरी परिवर्तनों का परीक्षण करने देता है। विवरण के लिए [साझा लाइब्रेरीज](../shared-libraries/#local-development-against-a-consuming-app) देखें -- और कभी भी पोर्टल रेजोल्यूशन को `package.json` में कमिट न करें।

## संबंधित लेख

- **[Database](./database)** -- डेटाबेस-प्रति-मॉड्यूल आर्किटेक्चर को समझना
- **[मॉड्यूल संरचना](./module-structure)** -- कंट्रोलर, भंडार, और मॉडल कैसे व्यवस्थित हैं
- **[साझा लाइब्रेरीज](../shared-libraries/)** -- `@churchapps/helpers` और `@churchapps/apihelper` के साथ काम करना
