---
title: "मोबाइल डिप्लॉयमेंट"
description: "B1 Checkin जैसे Expo ऐप्स के Android और iOS रिलीज़ बनाने, उन्हें ऐप स्टोर पर सबमिट करने और EAS के साथ OTA अपडेट भेजने की प्रक्रिया बताता है।"
---

# मोबाइल डिप्लॉयमेंट

<div class="article-intro">

ChurchApps के Expo मोबाइल ऐप्स, जैसे B1 Checkin, **Expo EAS Build** या स्थानीय Gradle बिल्ड से बनाए जाते हैं और ऐप स्टोर के ज़रिए वितरित किए जाते हैं। यह पेज B1 Checkin को उदाहरण के रूप में लेकर, Android और iOS दोनों के लिए बिल्ड बनाने, सबमिट करने और ओवर-द-एयर अपडेट भेजने की जानकारी देता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- ऐप को स्थानीय रूप से सेट करें -- देखें [Mobile Apps](../mobile/index.md#local-setup)
- [EAS CLI](https://docs.expo.dev/eas/) इंस्टॉल और कॉन्फ़िगर करें
- Google Play Console (Android) और/या Apple App Store Connect (iOS) तक पहुँच रखें

</div>

## बिल्डिंग

### Android

Android रिलीज़ बिल्ड स्थानीय रूप से चलते हैं और EAS से मिली रिलीज़ keystore से साइन किए जाते हैं। इसे एक बार डाउनलोड करने के लिए `npx eas-cli credentials -p android` चलाएँ (**credentials.json: Download credentials from EAS** चुनें), फिर चलाएँ:

```bash
yarn build:android
```

Google Play बंडल `android/app/build/outputs/bundle/release/app-release.aab` में बनता है। इसके बजाय EAS पर बिल्ड करने के लिए `yarn build:android:eas` चलाएँ।

### iOS

iOS बिल्ड हमेशा EAS पर चलते हैं:

```bash
yarn build:ios
```

## ऐप स्टोर पर सबमिट करना

### Android -- Google Play Store

AAB को Play Console के ज़रिए अपलोड करें, या EAS से सबमिट करें:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

iOS बिल्ड को सीधे EAS के ज़रिए सबमिट करें:

```bash
eas submit --platform ios
```

## OTA अपडेट

केवल JavaScript में किए गए बदलावों के लिए, जिनमें ऐप स्टोर की समीक्षा की ज़रूरत नहीं होती, ओवर-द-एयर (OTA) अपडेट का उपयोग करें:

```bash
yarn update
```

यह EAS Update का उपयोग करके पूरे स्टोर सबमिशन के बिना सीधे उपयोगकर्ताओं तक बदलाव पहुँचाता है।

:::tip
OTA अपडेट स्टोर बिल्ड से काफ़ी तेज़ होते हैं -- बदलाव दिनों के बजाय मिनटों में उपयोगकर्ताओं तक पहुँच सकते हैं। इन्हें बग फ़िक्स, टेक्स्ट बदलावों और छोटे UI अपडेट के लिए उपयोग करें, जिनमें नेटिव कोड में बदलाव शामिल न हो।
:::

## वर्ज़न नंबर

स्टोर बिल्ड बनाने से पहले, वर्ज़न नंबर कई फ़ाइलों में अपडेट करने होंगे:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` और `versionCode`)

iOS बिल्ड नंबर EAS द्वारा अपने-आप बढ़ाया जाता है।

:::warning
ऊपर सूचीबद्ध सभी फ़ाइलों में वर्ज़न नंबर अपडेट करना भूल जाने से बिल्ड विफल हो सकते हैं या ऐप स्टोर उसे अस्वीकार कर सकता है। प्रोडक्शन बिल्ड शुरू करने से पहले ऊपर की हर फ़ाइल को दोबारा जाँच लें।
:::

## संबंधित लेख

- **[Mobile Apps](../mobile/index.md)** -- स्थानीय सेटअप और डेवलपमेंट गाइड
- **[API Deployment](./apis.md)** -- बैकएंड API को डिप्लॉय करना
- **[Web App Deployment](./web-apps.md)** -- फ़्रंटएंड वेब एप्लिकेशन को डिप्लॉय करना
