---
title: "पूर्वापेक्षाएँ"
---

# पूर्वापेक्षाएँ

<div class="article-intro">

आपको किन उपकरणों की ज़रूरत है, यह इस पर निर्भर करता है कि आप किन प्रोजेक्ट्स पर काम करना चाहते हैं। यह पृष्ठ सभी आवश्यक सॉफ़्टवेयर को विकास क्षेत्र के अनुसार सूचीबद्ध करता है -- सार्वभौमिक आवश्यकताओं से लेकर प्लेटफ़ॉर्म-विशिष्ट टूलचेन तक।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- [Project Overview](./project-overview) की समीक्षा करें ताकि तय हो सके कि आप किन प्रोजेक्ट्स पर काम करना चाहते हैं
- सॉफ़्टवेयर इंस्टॉल करने के लिए अपनी विकास मशीन पर एडमिनिस्ट्रेटर पहुँच हो

</div>

## सभी प्रोजेक्ट्स

ये आवश्यक हैं, चाहे आप किसी भी प्रोजेक्ट पर काम करें:

| टूल | संस्करण | टिप्पणियाँ |
|------|---------|-------|
| **Node.js** | 20+ | B1App और LessonsApp (Next.js 16) के लिए 22+ आवश्यक; API के लिए 24+ आवश्यक |
| **npm** | Node.js के साथ आता है | सभी प्रोजेक्ट्स में पैकेज मैनेजर के रूप में उपयोग |
| **Git** | नवीनतम | हर प्रोजेक्ट एक अलग रिपॉज़िटरी है |

:::tip
Node के संस्करण आसानी से बदलने के लिए [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) या [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) जैसा Node version manager उपयोग करें।
:::

## बैकएंड API विकास

यदि आप API को स्थानीय रूप से चलाने की योजना बनाते हैं (demo APIs की ओर इंगित करने के बजाय):

| टूल | संस्करण | टिप्पणियाँ |
|------|---------|-------|
| **MySQL** | 8.0+ | हर API मॉड्यूल अपना डेटाबेस उपयोग करता है |

मुख्य API के लिए आपको छह डेटाबेस चाहिए: `membership`, `attendance`, `content`, `giving`, `messaging`, और `doing`। API में schema आरंभ करने के लिए स्क्रिप्ट शामिल हैं -- देखें [API local setup](../api/local-setup) गाइड।

## मोबाइल ऐप विकास

B1Mobile, B1Checkin, LessonsScreen, या अन्य React Native / Expo ऐप्स के लिए:

| टूल | संस्करण | टिप्पणियाँ |
|------|---------|-------|
| **Expo CLI** | नवीनतम | विश्व-स्तर पर इंस्टॉल करें: `npm install -g expo-cli` |
| **Android Studio** | नवीनतम | Android विकास के लिए आवश्यक (Android SDK शामिल) |
| **Xcode** | नवीनतम | iOS विकास के लिए आवश्यक (केवल macOS) |

:::info
Android Studio या Xcode के बिना त्वरित परीक्षण के लिए आप किसी वास्तविक डिवाइस पर Expo Go ऐप उपयोग कर सकते हैं। हालाँकि, प्रोडक्शन बाइनरी बनाने के लिए नेटिव टूलचेन आवश्यक हैं।
:::

## FreeShow (डेस्कटॉप ऐप) विकास

FreeShow की अतिरिक्त नेटिव build निर्भरताएँ हैं क्योंकि यह नेटिव Node मॉड्यूल (जैसे `canvas`) कंपाइल करता है:

### सभी प्लेटफ़ॉर्म

| टूल | संस्करण | टिप्पणियाँ |
|------|---------|-------|
| **Python** | 3.12 | नेटिव मॉड्यूल कंपाइल करने के लिए `node-gyp` द्वारा आवश्यक |
| **setuptools** | नवीनतम | `pip install setuptools` से इंस्टॉल करें |

### Windows

| टूल | टिप्पणियाँ |
|------|-------|
| **Visual Studio** | Community संस्करण पर्याप्त है |
| **"Desktop development with C++" workload** | Visual Studio इंस्टॉलेशन के दौरान चुनें |
| **Windows 10 SDK** | C++ workload में शामिल; सुनिश्चित करें कि यह चेक हो |

आप Visual Studio build tools कमांड लाइन से इंस्टॉल कर सकते हैं:

```bash
npm install --global windows-build-tools
```

या Visual Studio Community इंस्टॉल करें और इंस्टॉलेशन के दौरान "Desktop development with C++" workload चुनें।

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

आम तौर पर Xcode Command Line Tools पर्याप्त हैं:

```bash
xcode-select --install
```

## इंस्टॉलेशन सत्यापित करें

यह पुष्टि करने के लिए ये कमांड चलाएँ कि सब कुछ इंस्टॉल है:

```bash
node --version    # v20.x.x या उच्चतर प्रिंट होना चाहिए
npm --version     # 10.x.x या उच्चतर प्रिंट होना चाहिए
git --version     # git version 2.x.x प्रिंट होना चाहिए
mysql --version   # केवल स्थानीय API विकास के लिए आवश्यक
```

## अगले चरण

- **[Project Overview](./project-overview)** -- सभी प्रोजेक्ट्स और वे क्या करते हैं, देखें
- **[Environment Variables](./environment-variables)** -- अपनी `.env` फ़ाइलें कॉन्फ़िगर करें
