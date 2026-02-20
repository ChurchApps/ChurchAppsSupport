---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper` पैकेज सभी ChurchApps Express.js API के लिए सर्वर-साइड उपयोगिताएँ प्रदान करता है। इसमें बेस कंट्रोलर क्लास, JWT प्रमाणीकरण मिडलवेयर, डेटाबेस उपयोगिताएँ और AWS एकीकरण शामिल हैं जिन पर प्रत्येक API प्रोजेक्ट निर्भर करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js** और **Git** इंस्टॉल करें -- देखें [पूर्वापेक्षाएँ](../setup/prerequisites)
- स्थानीय विकास के लिए [npm link वर्कफ़्लो](./index.md) से परिचित हों
- यह पैकेज [`@churchapps/helpers`](./helpers) पर निर्भर करता है

</div>

## क्या शामिल है

- **CustomBaseController** -- API कंट्रोलर के लिए बेस क्लास
- **Auth मिडलवेयर** -- `CustomAuthProvider` के माध्यम से JWT प्रमाणीकरण
- **डेटाबेस उपयोगिताएँ** -- MySQL कनेक्शन प्रबंधन के लिए `DB.query`, `EnhancedPoolHelper`
- **AWS एकीकरण** -- S3, SSM Parameter Store और अन्य AWS सेवाओं के लिए हेल्पर्स
- **Inversify DI सेटअप** -- डिपेंडेंसी इंजेक्शन कंटेनर कॉन्फ़िगरेशन

## स्थानीय विकास के लिए सेटअप

1. रिपॉज़िटरी क्लोन करें:

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. डिपेंडेंसी इंस्टॉल करें:

   ```bash
   cd ApiHelper && npm install
   ```

3. पैकेज बिल्ड करें (TypeScript को `dist/` में कंपाइल करता है):

   ```bash
   npm run build
   ```

4. स्थानीय लिंकिंग के लिए उपलब्ध करें:

   ```bash
   npm link
   ```

## प्रमुख कमांड

| कमांड | विवरण |
|---------|-------------|
| `npm run build` | TypeScript को `dist/` में कंपाइल करें |
| `npm run lint` | ESLint चलाएँ |
| `npm run lint:fix` | ऑटो-फिक्स के साथ ESLint चलाएँ |
| `npm run format` | Prettier से कोड फ़ॉर्मेट करें |

:::info
यह पैकेज प्रत्येक ChurchApps API की डिपेंडेंसी है। परिवर्तन करते समय, प्रकाशित करने से पहले किसी API के विरुद्ध स्थानीय रूप से परीक्षण करने के लिए `npm link` का उपयोग करें।
:::

## संबंधित लेख

- **[Helpers](./helpers)** -- आधार उपयोगिता पैकेज जिस पर यह पैकेज निर्भर करता है
- **[मॉड्यूल संरचना](../api/module-structure)** -- API मॉड्यूल में कंट्रोलर और प्रमाणीकरण मिडलवेयर का उपयोग कैसे होता है
- **[स्थानीय API सेटअप](../api/local-setup)** -- स्थानीय विकास के लिए API सेटअप करना
