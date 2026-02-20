---
title: "Helpers"
---

# Helpers

<div class="article-intro">

`@churchapps/helpers` पैकेज सभी ChurchApps प्रोजेक्ट, फ्रंटएंड और बैकएंड दोनों द्वारा उपयोग की जाने वाली आधार उपयोगिताएँ प्रदान करता है। यह फ्रेमवर्क-अज्ञेय है और इसमें `DateHelper`, `ApiHelper`, `CurrencyHelper` जैसे सामान्य हेल्पर्स और अन्य साझा उपयोगिताएँ शामिल हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js** और **Git** इंस्टॉल करें -- देखें [पूर्वापेक्षाएँ](../setup/prerequisites)
- स्थानीय विकास के लिए [npm link वर्कफ़्लो](./index.md) से परिचित हों

</div>

## स्थानीय विकास के लिए सेटअप

1. रिपॉज़िटरी क्लोन करें:

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. डिपेंडेंसी इंस्टॉल करें:

   ```bash
   cd Helpers && npm install
   ```

3. पैकेज बिल्ड करें (TypeScript को `dist/` में कंपाइल करता है):

   ```bash
   npm run build
   ```

4. स्थानीय लिंकिंग के लिए उपलब्ध करें:

   ```bash
   npm link
   ```

फिर इसे किसी भी उपभोक्ता प्रोजेक्ट में लिंक कर सकते हैं:

```bash
cd ../YourProject && npm link @churchapps/helpers
```

## प्रकाशन

npm पर नया संस्करण प्रकाशित करने के लिए:

1. `package.json` में वर्शन अपडेट करें
2. प्रकाशित करें:

   ```bash
   npm publish --access=public
   ```

:::warning
चूँकि यह पैकेज प्रत्येक ChurchApps प्रोजेक्ट द्वारा उपयोग किया जाता है, यहाँ के परिवर्तनों का व्यापक प्रभाव होता है। प्रकाशित करने से पहले कम से कम एक उपभोक्ता API और एक उपभोक्ता वेब ऐप में `npm link` के साथ अच्छी तरह परीक्षण करें।
:::

## संबंधित लेख

- **[ApiHelper](./api-helper)** -- सर्वर-साइड उपयोगिताएँ जो इस पैकेज पर निर्भर करती हैं
- **[AppHelper](./app-helper)** -- React कंपोनेंट जो इस पैकेज पर निर्भर करते हैं
- **[साझा लाइब्रेरी अवलोकन](./index.md)** -- `npm link` वर्कफ़्लो और पैकेज अवलोकन
