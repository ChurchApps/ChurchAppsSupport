---
title: "स्थानीय API सेटअप"
---

# स्थानीय API सेटअप

<div class="article-intro">

यह गाइड आपको विकास के लिए ChurchApps API स्थानीय रूप से सेट करने में मार्गदर्शन करती है। आप repository clone करेंगे, अपने डेटाबेस कनेक्शन कॉन्फ़िगर करेंगे, schema initialize करेंगे, और hot reload के साथ dev server शुरू करेंगे।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js 24+**, **Git**, और **MySQL 8.0+** इंस्टॉल करें -- देखें [Prerequisites](../setup/prerequisites)
- डेटाबेस बनाने की अनुमति वाला एक MySQL उपयोगकर्ता बनाएँ
- API कॉन्फ़िगरेशन के लिए [Environment Variables](../setup/environment-variables) संदर्भ की समीक्षा करें

</div>

## चरण-दर-चरण सेटअप

### 1. Repository clone करें

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Dependencies इंस्टॉल करें

प्रोजेक्ट Yarn का उपयोग करता है (एक guard `npm install` को रोकता है):

```bash
cd Api
yarn install
```

### 3. Environment variables कॉन्फ़िगर करें

```bash
cp .env.sample .env
```

`.env` खोलें और अपने MySQL connection strings कॉन्फ़िगर करें। हर मॉड्यूल को निम्न प्रारूप में अपना डेटाबेस कनेक्शन चाहिए:

```
mysql://root:password@localhost:3306/dbname
```

आपको सभी छह मॉड्यूल डेटाबेस के लिए connection strings चाहिए (membership, attendance, content, giving, messaging, doing)।

### 4. डेटाबेस initialize करें

```bash
npm run initdb
```

यह अपने आप सभी छह डेटाबेस और उनकी tables बनाता है।

:::tip
आप `npm run initdb -- --module=membership` (या `attendance`, `content`, `giving`, `messaging`, `doing`) से केवल एक मॉड्यूल का डेटाबेस initialize कर सकते हैं।
:::

### 5. Dev server शुरू करें

```bash
npm run dev
```

API hot reload के साथ [http://localhost:8084](http://localhost:8084) पर शुरू होता है।

## मुख्य कमांड

| Command | विवरण |
|---------|-------------|
| `npm run dev` | hot reload (tsx watch) के साथ dev server शुरू करें |
| `npm run build` | साफ़ करें, TypeScript compile करें, और assets कॉपी करें |
| `npm run test` | Jest के साथ tests चलाएँ (coverage सहित) |
| `npm run test:watch` | watch mode में tests चलाएँ |
| `npm run lint` | auto-fix के साथ ESLint चलाएँ (ESLint ही एकमात्र formatter है) |

## Deployment

staging environment बंद कर दिया गया है। API `main` पर हर push पर demo environment पर deploy होता है, और मैन्युअल **Deploy Prod** workflow के माध्यम से production पर deploy होता है, जो लंबित डेटाबेस migrations भी लागू करता है। विवरण के लिए [API Deployment](../deployment/apis) देखें।

## स्थानीय लाइब्रेरी विकास

यदि आपको API के साथ एक साझा लाइब्रेरी (`@churchapps/helpers` या `@churchapps/apihelper`) विकसित करनी है, तो उसे [Packages](https://github.com/ChurchApps/Packages) workspace में build करें और API में एक अस्थायी Yarn portal जोड़ें:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

इससे आप npm पर प्रकाशित किए बिना API के विरुद्ध लाइब्रेरी बदलावों का परीक्षण कर सकते हैं। विवरण के लिए [Shared Libraries](../shared-libraries/#local-development-against-a-consuming-app) देखें -- और link द्वारा `package.json` में लिखा गया portal resolution कभी commit न करें।

## संबंधित लेख

- **[Database](./database)** -- मॉड्यूल-प्रति-डेटाबेस आर्किटेक्चर को समझना
- **[Module Structure](./module-structure)** -- controllers, repositories, और models कैसे व्यवस्थित हैं
- **[Shared Libraries](../shared-libraries/)** -- `@churchapps/helpers` और `@churchapps/apihelper` के साथ काम करना
