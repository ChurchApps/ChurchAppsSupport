---
title: "मोबाइल डिप्लॉयमेंट"
---

# मोबाइल डिप्लॉयमेंट

<div class="article-intro">

ChurchApps के मोबाइल ऐप्स **Expo EAS Build** का उपयोग करके बनाए और डिप्लॉय किए जाते हैं, और ऐप स्टोर के माध्यम से वितरित किए जाते हैं। इस पेज में Android और iOS दोनों के लिए बिल्ड बनाना, सबमिट करना और OTA (over-the-air) अपडेट भेजना शामिल है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- मोबाइल ऐप को अपने कंप्यूटर पर सेट अप करें -- देखें [B1 Mobile](../mobile/b1-mobile)
- [EAS CLI](https://docs.expo.dev/eas/) इंस्टॉल और कॉन्फ़िगर करें
- Google Play Console (Android) और/या Apple App Store Connect (iOS) तक पहुँच रखें

</div>

## बिल्डिंग

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## ऐप स्टोर पर सबमिट करना

### Android -- Google Play Store

सफल EAS बिल्ड के बाद, Android बाइनरी (AAB) को Play Console के माध्यम से Google Play Store पर सबमिट किया जाता है।

### iOS -- Apple App Store

iOS बिल्ड को सीधे EAS के माध्यम से सबमिट करें:

```bash
eas submit --platform ios
```

## OTA अपडेट

केवल JavaScript में किए गए बदलावों के लिए, जिनमें ऐप स्टोर की समीक्षा की ज़रूरत नहीं होती, OTA (over-the-air) अपडेट का उपयोग करें:

```bash
npm run update:production
```

यह EAS Update का उपयोग करके पूरे स्टोर सबमिशन के बिना सीधे उपयोगकर्ताओं तक बदलाव भेजता है।

:::tip
OTA अपडेट स्टोर बिल्ड की तुलना में काफ़ी तेज़ होते हैं -- बदलाव दिनों के बजाय मिनटों में उपयोगकर्ताओं तक पहुँच सकते हैं। इनका उपयोग बग फ़िक्स, टेक्स्ट में बदलाव और छोटे UI अपडेट के लिए करें, जिनमें नेटिव कोड में बदलाव शामिल न हो।
:::

## वर्शन नंबर

स्टोर बिल्ड बनाने से पहले, वर्शन नंबर कई फ़ाइलों में अपडेट करने होते हैं:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
ऊपर सूचीबद्ध सभी फ़ाइलों में वर्शन नंबर अपडेट करना भूल जाने से बिल्ड विफल हो सकते हैं या ऐप स्टोर द्वारा अस्वीकार किया जा सकता है। प्रोडक्शन बिल्ड शुरू करने से पहले ऊपर की हर फ़ाइल को दोबारा जाँच लें।
:::

## संबंधित लेख

- **[B1 Mobile](../mobile/b1-mobile)** -- स्थानीय सेटअप और डेवलपमेंट गाइड
- **[API डिप्लॉयमेंट](./apis)** -- बैकएंड APIs को डिप्लॉय करना
- **[वेब ऐप डिप्लॉयमेंट](./web-apps)** -- फ़्रंटएंड वेब एप्लिकेशन को डिप्लॉय करना
