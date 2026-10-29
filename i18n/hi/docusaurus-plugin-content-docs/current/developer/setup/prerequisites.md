---
title: "पूर्वापेक्षाएँ"
---

# पूर्वापेक्षाएँ

<div class="article-intro">

आपको किन टूल्स की ज़रूरत है, यह इस पर निर्भर करता है कि आप किन प्रोजेक्ट्स पर काम करना चाहते हैं। यह पृष्ठ सभी आवश्यक सॉफ़्टवेयर को विकास क्षेत्र के अनुसार सूचीबद्ध करता है, सार्वभौमिक आवश्यकताओं से लेकर प्लेटफ़ॉर्म-विशिष्ट toolchains तक।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- अपने प्रोजेक्ट चुनने के लिए [Project Overview](./project-overview) की समीक्षा करें
- सॉफ़्टवेयर इंस्टॉल करने के लिए अपनी development मशीन पर एडमिनिस्ट्रेटर एक्सेस रखें

</div>

## सभी प्रोजेक्ट्स

ये आवश्यकताएँ इस बात से स्वतंत्र हैं कि आप किस प्रोजेक्ट पर काम करते हैं:

| Tool | Version | नोट्स |
|------|---------|-------|
| **Node.js** | 20+ | B1App और LessonsApp (Next.js 16) के लिए 22+ आवश्यक; Api के लिए 24+ आवश्यक |
| **npm** | Node.js के साथ आता है | सभी प्रोजेक्ट्स में package manager के रूप में उपयोग |
| **Git** | नवीनतम | हर प्रोजेक्ट एक अलग repository है |

:::tip
Node के संस्करण आसानी से बदलने के लिए [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) या [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) जैसा Node version manager उपयोग करें।
:::

## Backend API विकास

यदि आप API को स्थानीय रूप से चलाना चाहते हैं (demo APIs की ओर इशारा करने के बजाय):

| Tool | Version | नोट्स |
|------|---------|-------|
| **MySQL** | 8.0+ | हर API module का अपना डेटाबेस है |

मुख्य API के लिए आपको छह डेटाबेस चाहिए: `membership`, `attendance`, `content`, `giving`, `messaging`, और `doing`। schema initialize करने के लिए API में scripts शामिल हैं -- देखें [API local setup](../api/local-setup) गाइड।

## मोबाइल ऐप विकास

B1Mobile, B1Checkin, LessonsScreen, या अन्य React Native / Expo ऐप्स के लिए:

| Tool | Version | नोट्स |
|------|---------|-------|
| **Expo CLI** | नवीनतम | वैश्विक रूप से इंस्टॉल करें: `npm install -g expo-cli` |
| **Android Studio** | नवीनतम | Android विकास के लिए आवश्यक (Android SDK शामिल) |
| **Xcode** | नवीनतम | iOS विकास के लिए आवश्यक (केवल macOS) |

:::info
Android Studio या Xcode के बिना त्वरित परीक्षण के लिए आप किसी भौतिक डिवाइस पर Expo Go ऐप उपयोग कर सकते हैं। हालाँकि, production binaries बनाने के लिए native toolchains आवश्यक हैं।
:::

## FreeShow (Desktop App) विकास

FreeShow में अतिरिक्त native build dependencies हैं क्योंकि यह native Node modules (जैसे `canvas`) compile करता है:

### सभी प्लेटफ़ॉर्म

| Tool | Version | नोट्स |
|------|---------|-------|
| **Python** | 3.12 | native module compilation के लिए `node-gyp` द्वारा आवश्यक |
| **setuptools** | नवीनतम | `pip install setuptools` से इंस्टॉल करें |

### Windows

| Tool | नोट्स |
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

## अपना इंस्टॉलेशन सत्यापित करें

सब कुछ इंस्टॉल है या नहीं, यह पुष्टि करने के लिए ये कमांड चलाएँ:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## आगे के चरण

- **[Project Overview](./project-overview)** -- सभी प्रोजेक्ट्स और उनका काम देखें
- **[Environment Variables](./environment-variables)** -- अपनी `.env` फ़ाइलें कॉन्फ़िगर करें
