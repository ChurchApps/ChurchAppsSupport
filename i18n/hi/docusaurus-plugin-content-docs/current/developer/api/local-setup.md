---
title: "स्थानीय API सेटअप"
---

# स्थानीय API सेटअप

<div class="article-intro">

यह गाइड आपको स्थानीय विकास के लिए ChurchApps API सेट करने की प्रक्रिया बताती है। आप रिपॉज़िटरी क्लोन करेंगे, अपने डेटाबेस कनेक्शन कॉन्फ़िगर करेंगे, schema आरंभ करेंगे, और hot reload के साथ dev server शुरू करेंगे।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js 24+**, **Git**, और **MySQL 8.0+** इंस्टॉल करें -- देखें [Prerequisites](../setup/prerequisites)
- डेटाबेस बनाने की अनुमति वाला एक MySQL उपयोगकर्ता बनाएँ
- API कॉन्फ़िगरेशन के लिए [Environment Variables](../setup/environment-variables) संदर्भ देखें

</div>

## चरण-दर-चरण सेटअप

### 1. रिपॉज़िटरी क्लोन करें

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. डिपेंडेंसी इंस्टॉल करें

प्रोजेक्ट Yarn का उपयोग करता है (एक guard `npm install` को रोकता है):

```bash
cd Api
yarn install
```

### 3. Environment variables कॉन्फ़िगर करें

```bash
cp .env.sample .env
```

`.env` खोलें और अपने MySQL कनेक्शन स्ट्रिंग कॉन्फ़िगर करें। हर मॉड्यूल को अपने डेटाबेस कनेक्शन के लिए निम्न प्रारूप चाहिए:

```
mysql://root:password@localhost:3306/dbname
```

आपको सभी छह मॉड्यूल डेटाबेस (membership, attendance, content, giving, messaging, doing) के लिए कनेक्शन स्ट्रिंग चाहिए होंगी।

### 4. डेटाबेस आरंभ करें

```bash
npm run initdb
```

यह सभी छह डेटाबेस और उनकी तालिकाएँ अपने आप बनाता है।

:::tip
आप `npm run initdb -- --module=membership` (या `attendance`, `content`, `giving`, `messaging`, `doing`) से किसी एक मॉड्यूल का डेटाबेस आरंभ कर सकते हैं।
:::

### 5. Dev server शुरू करें

```bash
npm run dev
```

API hot reload के साथ [http://localhost:8084](http://localhost:8084) पर शुरू होता है।

## मुख्य कमांड

| कमांड | विवरण |
|---------|-------------|
| `npm run dev` | hot reload (tsx watch) के साथ dev server शुरू करें |
| `npm run build` | साफ़ करें, TypeScript compile करें, और assets कॉपी करें |
| `npm run test` | Jest से टेस्ट चलाएँ (कवरेज सहित) |
| `npm run test:watch` | watch मोड में टेस्ट चलाएँ |
| `npm run lint` | ऑटो-फ़िक्स के साथ ESLint चलाएँ (ESLint ही एकमात्र formatter है) |

## डिप्लॉयमेंट

staging वातावरण हटा दिया गया है। API `main` पर हर push पर demo वातावरण में डिप्लॉय होता है, और मैन्युअल **Deploy Prod** workflow के माध्यम से production में, जो लंबित डेटाबेस माइग्रेशन भी लागू करता है। विवरण के लिए [API Deployment](../deployment/apis) देखें।

## स्थानीय लाइब्रेरी विकास

यदि आपको API के साथ एक साझा लाइब्रेरी (`@churchapps/helpers` या `@churchapps/apihelper`) विकसित करनी है, तो उसे [Packages](https://github.com/ChurchApps/Packages) workspace में बनाएँ और API में एक अस्थायी Yarn portal जोड़ें:

```bash
# Packages workspace में
yarn build

# API directory में
yarn link ../Packages/helpers
# ... परीक्षण करें ...
yarn unlink ../Packages/helpers && yarn install
```

इससे आप npm पर प्रकाशित किए बिना API के विरुद्ध लाइब्रेरी बदलावों का परीक्षण कर सकते हैं। विवरण के लिए [Shared Libraries](../shared-libraries/#local-development-against-a-consuming-app) देखें -- और link द्वारा `package.json` में लिखा गया portal resolution कभी commit न करें।

## संबंधित लेख

- **[Database](./database)** -- मॉड्यूल-प्रति-डेटाबेस आर्किटेक्चर को समझना
- **[Module Structure](./module-structure)** -- कंट्रोलर, रिपॉज़िटरी और मॉडल कैसे व्यवस्थित हैं
- **[Shared Libraries](../shared-libraries/)** -- `@churchapps/helpers` और `@churchapps/apihelper` के साथ काम करना
