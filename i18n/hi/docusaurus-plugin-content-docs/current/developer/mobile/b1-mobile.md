---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile ChurchApps के लिए प्राथमिक सदस्य-सामने वाला मोबाइल ऐप है, जो React Native और Expo के साथ बनाया गया है। यह चर्च सदस्यों को डायरेक्टरी देखने, दान एक्सेस करने, उपस्थिति जाँचने, सूचनाएँ प्राप्त करने और अपने चर्च समुदाय के साथ बातचीत करने की अनुमति देता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js** और **Expo CLI** इंस्टॉल करें -- देखें [पूर्वापेक्षाएँ](../setup/prerequisites)
- **Android Studio** (Android एमुलेटर के लिए) या **Xcode** (iOS सिम्युलेटर के लिए) इंस्टॉल करें
- अपना API लक्ष्य (स्टेजिंग या स्थानीय) कॉन्फ़िगर करें -- देखें [पर्यावरण चर](../setup/environment-variables)

</div>

## सेटअप

1. रिपॉज़िटरी क्लोन करें:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. डिपेंडेंसी इंस्टॉल करें:

   ```bash
   cd B1Mobile && npm install
   ```

3. पर्यावरण चर कॉन्फ़िगर करें -- नमूना फ़ाइल कॉपी करें और API एंडपॉइंट अपडेट करें:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Expo डेव सर्वर शुरू करें:

   ```bash
   npm start
   ```

:::tip
Android Studio या Xcode सेटअप किए बिना त्वरित परीक्षण के लिए भौतिक डिवाइस पर **Expo Go** ऐप का उपयोग कर सकते हैं।
:::

## पर्यावरण चर

| चर | विवरण |
|----------|-------------|
| `STAGE` | एनवायरनमेंट स्टेज (जैसे `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | सामग्री डिलीवरी के लिए रूट URL |
| `MEMBERSHIP_API` | Membership API एंडपॉइंट |
| `MESSAGING_API` | Messaging API एंडपॉइंट |
| `ATTENDANCE_API` | Attendance API एंडपॉइंट |
| `GIVING_API` | Giving API एंडपॉइंट |
| `DOING_API` | Doing API एंडपॉइंट |
| `CONTENT_API` | Content API एंडपॉइंट |
| `LESSONS_ROOT` | पाठ सामग्री के लिए रूट URL |

## प्रमुख कमांड

| कमांड | विवरण |
|---------|-------------|
| `npm start` | Expo डेव सर्वर लॉन्च करें |
| `npm run android` | Android एमुलेटर पर चलाएँ |
| `npm run ios` | iOS सिम्युलेटर पर चलाएँ |
| `npm run test` | टेस्ट चलाएँ (Jest) |

## प्रोडक्शन बिल्ड

प्रोडक्शन बिल्ड बनाने से पहले, निम्नलिखित सभी फ़ाइलों में वर्शन नंबर अपडेट करें:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

यह Android बाइनरी बनाने के लिए EAS Build का उपयोग करता है।

### iOS

```bash
eas build --platform ios --profile production
```

### OTA अपडेट

ओवर-द-एयर अपडेट पुश करने के लिए (ऐप स्टोर समीक्षा के बिना):

```bash
npm run update:production
```

:::info
OTA अपडेट JavaScript-केवल परिवर्तनों के लिए आदर्श हैं। यदि आप नेटिव कोड या डिपेंडेंसी संशोधित करते हैं, तो आपको इसके बजाय पूर्ण स्टोर बिल्ड सबमिट करनी होगी।
:::

## संबंधित लेख

- **[मोबाइल डिप्लॉयमेंट](../deployment/mobile)** -- मोबाइल ऐप बिल्ड, सबमिट और डिप्लॉय करने की पूर्ण गाइड
- **[पर्यावरण चर](../setup/environment-variables)** -- मोबाइल पर्यावरण कॉन्फ़िगरेशन के लिए पूर्ण संदर्भ
