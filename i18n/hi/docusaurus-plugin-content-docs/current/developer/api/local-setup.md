---
title: "Local API Setup"
---

# Local API Setup

<div class="article-intro">

यह गाइड आपको ChurchApps API को local development के लिए सेट अप करने में मार्गदर्शन करती है। आप repository clone करेंगे, अपने database connections कॉन्फ़िगर करेंगे, schema initialize करेंगे, और hot reload के साथ dev server शुरू करेंगे।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js 22+**, **Git**, और **MySQL 8.0+** इंस्टॉल करें -- [Prerequisites](../setup/prerequisites) देखें
- database बनाने की privileges वाला एक MySQL user बनाएं
- API कॉन्फ़िगरेशन के लिए [Environment Variables](../setup/environment-variables) reference देखें

</div>

## चरण-दर-चरण Setup

### 1. Repository clone करें

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Dependencies इंस्टॉल करें

Project Yarn का उपयोग करता है (एक guard `npm install` को block करता है):

```bash
cd Api
yarn install
```

### 3. Environment variables कॉन्फ़िगर करें

```bash
cp .env.sample .env
```

`.env` खोलें और अपने MySQL connection strings कॉन्फ़िगर करें। हर module को अपना database connection चाहिए, निम्न format में:

```
mysql://root:password@localhost:3306/dbname
```

आपको सभी छह module databases (membership, attendance, content, giving, messaging, doing) के connection strings चाहिए।

### 4. Databases initialize करें

```bash
npm run initdb
```

यह सभी छह databases और उनकी tables अपने आप बनाता है।

:::tip
आप एक ही module का database `npm run initdb -- --module=membership` से initialize कर सकते हैं (या `attendance`, `content`, `giving`, `messaging`, `doing`)।
:::

### 5. Dev server शुरू करें

```bash
npm run dev
```

API hot reload के साथ [http://localhost:8084](http://localhost:8084) पर शुरू होता है।

## मुख्य Commands

| Command | विवरण |
|---------|-------------|
| `npm run dev` | hot reload (tsx watch) के साथ dev server शुरू करें |
| `npm run build` | साफ़ करें, TypeScript compile करें, और assets कॉपी करें |
| `npm run test` | Jest से tests चलाएं (coverage सहित) |
| `npm run test:watch` | watch mode में tests चलाएं |
| `npm run lint` | auto-fix के साथ ESLint चलाएं (ESLint ही एकमात्र formatter है) |

## Deployment

Staging environment अब बंद हो चुका है। API हर `main` पर push होने पर demo environment पर deploy होता है, और मैन्युअल **Deploy Prod** workflow के माध्यम से production पर, जो लंबित database migrations भी लागू करता है। विवरण के लिए [API Deployment](../deployment/apis) देखें।

## स्थानीय Library Development

यदि आपको API के साथ कोई shared library (`@churchapps/helpers` या `@churchapps/apihelper`) विकसित करनी है, तो उसे [Packages](https://github.com/ChurchApps/Packages) workspace में build करें और API में एक अस्थायी Yarn portal जोड़ें:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

इससे आप npm पर publish किए बिना API के विरुद्ध library बदलावों का परीक्षण कर सकते हैं। विवरण के लिए [Shared Libraries](../shared-libraries/#local-development-against-a-consuming-app) देखें — और link द्वारा `package.json` में लिखी portal resolution को कभी commit न करें।

## संबंधित लेख

- **[Database](./database)** -- प्रति-module database architecture को समझना
- **[Module Structure](./module-structure)** -- controllers, repositories, और models कैसे व्यवस्थित हैं
- **[Shared Libraries](../shared-libraries/)** -- `@churchapps/helpers` और `@churchapps/apihelper` के साथ काम करना
