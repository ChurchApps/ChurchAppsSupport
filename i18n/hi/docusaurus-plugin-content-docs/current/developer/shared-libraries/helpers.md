---
title: "सहायक उपयोगिताएँ"
description: "@churchapps/helpers पैकेज के डेवलपर्स के लिए: यह क्या देता है, कौन से ऐप इसका उपयोग करते हैं, Packages वर्कस्पेस में लोकल बिल्ड सेटअप, और changesets-आधारित प्रकाशन प्रवाह।"
---

# सहायक उपयोगिताएँ

<div class="article-intro">

`@churchapps/helpers` पैकेज सभी ChurchApps प्रोजेक्ट्स के लिए आधारभूत उपयोगिताएँ प्रदान करता है, चाहे वे फ़्रंटएंड हों या बैकएंड। यह किसी विशेष फ़्रेमवर्क पर निर्भर नहीं है और इसमें `DateHelper`, `ApiHelper`, `CurrencyHelper` जैसे सामान्य हेल्पर्स के साथ-साथ साझा TypeScript इंटरफ़ेस भी शामिल हैं, जो ऐप्स और APIs के बीच डेटा का अनुबंध बनाते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js** और **Git** इंस्टॉल करें -- देखें [आवश्यक शर्तें](../setup/prerequisites.md)
- [Packages workspace](./index.md) के सेटअप और रिलीज़ फ़्लो से परिचित हो जाएँ

</div>

## इसका उपयोग कौन करता है

हर ChurchApps API (मुख्य Api, AskApi और LessonsApi) और हर वेब फ़्रंटएंड (B1Admin, B1App, B1Transfer, LessonsApp) सीधे इस पैकेज पर निर्भर करता है। फ़्रंटएंड को इसके कई एक्सपोर्ट्स [`@churchapps/apphelper`](./app-helper.md) के माध्यम से भी मिलते हैं, जिनमें `ApiHelper`, `DateHelper`, `UserHelper` और अन्य इंटरफ़ेस शामिल हैं। अन्य साझा पैकेज इसे peer dependency के रूप में घोषित करते हैं, ताकि हर ऐप में इसकी केवल एक प्रति का उपयोग हो।

## स्थानीय विकास के लिए सेटअप

यह पैकेज [Packages](https://github.com/ChurchApps/Packages) वर्कस्पेस में रहता है, जिसमें अन्य साझा लाइब्रेरीज़ भी हैं:

1. वर्कस्पेस क्लोन करें:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. वर्कस्पेस रूट पर डिपेंडेंसीज़ इंस्टॉल करें:

   ```bash
   cd Packages && yarn install
   ```

3. बिल्ड करें (TypeScript को `dist/` में कंपाइल करता है):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   या निर्भरता के क्रम में हर पैकेज बनाने के लिए रूट पर `yarn build` चलाएँ।

किसी उपभोक्ता प्रोजेक्ट में बदलावों की जाँच करने के लिए अस्थायी Yarn portal का उपयोग करें -- देखें [उपभोक्ता ऐप के विरुद्ध स्थानीय विकास](./index.md#local-development-against-a-consuming-app)।

## प्रकाशन

रिलीज़ मैनुअल वर्शन बढ़ाने के बजाय changesets के माध्यम से होती हैं:

1. वर्कस्पेस रूट पर `yarn changeset` चलाएँ, `@churchapps/helpers` चुनें और उचित bump type चुनें; बने हुए changeset फ़ाइल को अपने बदलाव के साथ commit करें।
2. रिलीज़ के लिए तैयार होने पर रूट पर `yarn publish-all` चलाएँ -- यह वर्शन बढ़ाता है, CHANGELOGs लिखता है, निर्भरता के क्रम में बिल्ड करता है और npm पर प्रकाशित करता है।

नए साझा इंटरफ़ेस `helpers/src/interfaces/` में जाते हैं और पैकेज barrel के माध्यम से री-एक्सपोर्ट होते हैं। वेबसाइट बिल्डर का element-type कैटलॉग (`ElementTypes.ts` — 35 प्रकार, उनके answers schemas सहित) भी यहीं रहता है; यह वह अनुबंध है जिसे apphelper renderers, B1Admin एडिटर फ़ॉर्म और AI जनरेशन prompts साझा करते हैं (देखें [Website Builder Architecture](../architecture/website-builder.md))।

:::warning
चूँकि यह पैकेज हर ChurchApps प्रोजेक्ट में उपयोग होता है, यहाँ के बदलावों का व्यापक प्रभाव पड़ता है। `helpers` की रिलीज़ अपने आप `apihelper` और `apphelper` के वर्शन बढ़ा देती है, ताकि उनकी dependency ranges अद्यतन रहें। प्रकाशित करने से पहले कम से कम एक उपभोक्ता API और एक उपभोक्ता वेब ऐप में Yarn portal के साथ परीक्षण करें।
:::

## संबंधित लेख

- **[ApiHelper](./api-helper.md)** -- सर्वर-साइड उपयोगिताएँ जो इस पैकेज पर निर्भर हैं
- **[AppHelper](./app-helper.md)** -- React कंपोनेंट्स जो इस पैकेज पर निर्भर हैं
- **[Shared Libraries Overview](./index.md)** -- वर्कस्पेस सेटअप, रिलीज़ फ़्लो और लोकल-लिंक वर्कफ़्लो
