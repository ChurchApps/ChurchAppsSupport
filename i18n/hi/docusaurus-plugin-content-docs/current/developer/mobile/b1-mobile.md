---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile ChurchApps के लिए मुख्य सदस्य-उन्मुख मोबाइल ऐप है, जिसे React Native और Expo से बनाया गया है। यह चर्च के सदस्यों को डायरेक्टरी देखने, giving तक पहुँचने, उपस्थिति जाँचने, सूचनाएँ पाने, और अपने चर्च समुदाय से जुड़ने देता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js** और **Expo CLI** इंस्टॉल करें -- देखें [पूर्वापेक्षाएँ](../setup/prerequisites)
- **Android Studio** (Android emulator के लिए) या **Xcode** (iOS simulator के लिए) इंस्टॉल करें
- अपना API लक्ष्य कॉन्फ़िगर करें (demo या local) -- देखें [एनवायरनमेंट वेरिएबल](../setup/environment-variables)

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

3. एनवायरनमेंट वेरिएबल कॉन्फ़िगर करें -- नमूना फ़ाइल कॉपी करें और API endpoints अपडेट करें:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Expo dev server शुरू करें:

   ```bash
   npm start
   ```

:::tip
Android Studio या Xcode सेट किए बिना त्वरित परीक्षण के लिए आप भौतिक डिवाइस पर **Expo Go** ऐप उपयोग कर सकते हैं।
:::

## एनवायरनमेंट वेरिएबल

| Variable | विवरण |
|----------|-------------|
| `STAGE` | एनवायरनमेंट स्टेज (जैसे `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | कंटेंट डिलीवरी के लिए रूट URL |
| `MEMBERSHIP_API` | Membership API endpoint |
| `MESSAGING_API` | Messaging API endpoint |
| `ATTENDANCE_API` | Attendance API endpoint |
| `GIVING_API` | Giving API endpoint |
| `DOING_API` | Doing API endpoint |
| `CONTENT_API` | Content API endpoint |
| `LESSONS_ROOT` | Lessons कंटेंट के लिए रूट URL |

## प्रमुख कमांड

| Command | विवरण |
|---------|-------------|
| `npm start` | Expo dev server लॉन्च करें |
| `npm run android` | Android emulator पर चलाएँ |
| `npm run ios` | iOS simulator पर चलाएँ |
| `npm run test` | टेस्ट चलाएँ (Jest) |

## प्रोडक्शन बिल्ड

प्रोडक्शन बिल्ड बनाने से पहले, निम्नलिखित सभी फ़ाइलों में वर्ज़न नंबर अपडेट करें:

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

ओवर-द-एयर अपडेट भेजने के लिए (ऐप स्टोर समीक्षा से गुज़रे बिना):

```bash
npm run update:production
```

:::info
OTA अपडेट केवल JavaScript में हुए बदलावों के लिए आदर्श हैं। यदि आप नेटिव कोड या डिपेंडेंसी बदलते हैं, तो आपको पूरा स्टोर बिल्ड सबमिट करना होगा।
:::

## संबंधित लेख

- **[मोबाइल डिप्लॉयमेंट](../deployment/mobile)** -- मोबाइल ऐप बनाने, सबमिट करने और डिप्लॉय करने की पूरी मार्गदर्शिका
- **[एनवायरनमेंट वेरिएबल](../setup/environment-variables)** -- मोबाइल एनवायरनमेंट कॉन्फ़िगरेशन का पूरा संदर्भ
