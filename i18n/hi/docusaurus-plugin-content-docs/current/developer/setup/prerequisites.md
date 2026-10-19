---
title: "पूर्वापेक्षाएँ"
---

# पूर्वापेक्षाएँ

<div class="article-intro">

आपको किन टूल की आवश्यकता है, यह इस पर निर्भर करता है कि आप किन प्रोजेक्ट पर काम करना चाहते हैं। यह पृष्ठ विकास क्षेत्र के अनुसार व्यवस्थित सभी आवश्यक सॉफ़्टवेयर सूचीबद्ध करता है, सार्वभौमिक आवश्यकताओं से लेकर प्लेटफ़ॉर्म-विशिष्ट टूलचेन तक।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- यह तय करने के लिए [प्रोजेक्ट अवलोकन](./project-overview) देखें कि आप किन प्रोजेक्ट पर काम करना चाहते हैं
- सॉफ़्टवेयर इंस्टॉल करने के लिए अपनी विकास मशीन पर administrator एक्सेस होना चाहिए

</div>

## सभी प्रोजेक्ट

ये आवश्यक हैं, चाहे आप किसी भी प्रोजेक्ट पर काम करें:

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | 20+ | B1App और LessonsApp (Next.js 16) के लिए 22+ आवश्यक |
| **npm** | Node.js के साथ आता है | सभी प्रोजेक्ट में पैकेज मैनेजर के रूप में उपयोग होता है |
| **Git** | नवीनतम | हर प्रोजेक्ट एक अलग रिपॉज़िटरी है |

:::tip
Node के संस्करणों के बीच आसानी से बदलने के लिए नोड वर्ज़न मैनेजर का उपयोग करें, जैसे [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) या [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows)।
:::

## बैकएंड API विकास

यदि आप API को स्थानीय रूप से चलाने की योजना बनाते हैं (demo APIs की ओर इंगित करने के बजाय):

| Tool | Version | Notes |
|------|---------|-------|
| **MySQL** | 8.0+ | हर API मॉड्यूल अपना अलग डेटाबेस उपयोग करता है |

मूल API के लिए आपको छह डेटाबेस चाहिए: `membership`, `attendance`, `content`, `giving`, `messaging`, और `doing`। स्कीमा शुरू करने के लिए API में स्क्रिप्ट शामिल हैं — देखें [API स्थानीय सेटअप](../api/local-setup) मार्गदर्शिका।

## मोबाइल ऐप विकास

B1Mobile, B1Checkin, LessonsScreen, या अन्य React Native / Expo ऐप्स के लिए:

| Tool | Version | Notes |
|------|---------|-------|
| **Expo CLI** | नवीनतम | ग्लोबली इंस्टॉल करें: `npm install -g expo-cli` |
| **Android Studio** | नवीनतम | Android विकास के लिए आवश्यक (Android SDK शामिल) |
| **Xcode** | नवीनतम | iOS विकास के लिए आवश्यक (केवल macOS) |

:::info
त्वरित परीक्षण के लिए आप Android Studio या Xcode के बिना, भौतिक डिवाइस पर Expo Go ऐप उपयोग कर सकते हैं। हालाँकि, प्रोडक्शन बाइनरी बनाने के लिए नेटिव टूलचेन आवश्यक हैं।
:::

## FreeShow (डेस्कटॉप ऐप) विकास

FreeShow में अतिरिक्त नेटिव बिल्ड निर्भरताएँ हैं, क्योंकि यह नेटिव Node मॉड्यूल (जैसे `canvas`) कंपाइल करता है:

### सभी प्लेटफ़ॉर्म

| Tool | Version | Notes |
|------|---------|-------|
| **Python** | 3.12 | नेटिव मॉड्यूल कंपाइल करने के लिए `node-gyp` द्वारा आवश्यक |
| **setuptools** | नवीनतम | `pip install setuptools` से इंस्टॉल करें |

### Windows

| Tool | Notes |
|------|-------|
| **Visual Studio** | Community संस्करण पर्याप्त है |
| **"C++ के साथ डेस्कटॉप विकास" वर्कलोड** | Visual Studio इंस्टॉलेशन के दौरान चुनें |
| **Windows 10 SDK** | C++ वर्कलोड में शामिल; सुनिश्चित करें कि यह चेक हो |

आप Visual Studio build tools कमांड लाइन से भी इंस्टॉल कर सकते हैं:

```bash
npm install --global windows-build-tools
```

या Visual Studio Community इंस्टॉल करें और इंस्टॉलेशन के दौरान "Desktop development with C++" वर्कलोड चुनें।

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

आम तौर पर Xcode Command Line Tools पर्याप्त होते हैं:

```bash
xcode-select --install
```

## इंस्टॉलेशन सत्यापित करें

पुष्टि करने के लिए ये कमांड चलाएँ कि सब कुछ इंस्टॉल है:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## अगले कदम

- **[प्रोजेक्ट अवलोकन](./project-overview)** -- सभी प्रोजेक्ट और वे क्या करते हैं, देखें
- **[एनवायरनमेंट वेरिएबल](./environment-variables)** -- अपनी `.env` फ़ाइलें कॉन्फ़िगर करें
