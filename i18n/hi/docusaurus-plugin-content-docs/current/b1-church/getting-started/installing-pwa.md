---
title: "ऐप के रूप में Install करना (PWA)"
---

# ऐप के रूप में Install करना (PWA)

<div class="article-intro">

B1.church Progressive Web App (PWA) के रूप में installation का समर्थन करता है, जिससे आप अपने church के member portal को अपने phone की home screen पर बिल्कुल native app की तरह जोड़ सकते हैं। App Store या Google Play से गुज़रे बिना आपको पूर्ण-स्क्रीन, app जैसा अनुभव मिलता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको अपने church का B1.church URL चाहिए: `https://yourchurchname.b1.church`
- एक समर्थित browser उपयोग करें: iOS पर **Safari** या Android पर **Chrome**

</div>

## PWA क्या है?

Progressive Web App (PWA) एक website है जिसे आपके device पर install किया जा सकता है और जो native app की तरह व्यवहार करती है। जब आप B1.church को PWA के रूप में install करते हैं, तो वह:

- browser के navigation bars के बिना पूर्ण-स्क्रीन खुलता है
- आपके church के icon और नाम के साथ आपकी home screen पर दिखता है
- आपके church की branding और theme colors के साथ सहजता से काम करता है

:::tip
यदि आप App Store या Google Play से अलग app install नहीं करना चाहते, तो PWA एक बेहतरीन विकल्प है। यह browser में मिलने वाला वही member portal अनुभव अधिक सुविधाजनक रूप में देता है।
:::

## Install Page

install करने का सबसे आसान तरीका आपके church का समर्पित install page है:

```
https://yourchurchname.b1.church/mobile/install
```

यह page आपके device को पहचानता है और अपने-आप सही निर्देश दिखाता है:

- **iPhone** — चरण-दर-चरण Safari "Add to Home Screen" निर्देश
- **Android** — Chrome में एक-tap **Install on Home Screen** button
- **Desktop** — एक QR code, जिसे आप अपने phone से scan करके वहीं install page खोल सकते हैं

install page तक कई तरीकों से पहुंचा जा सकता है:

- member portal में **More** पर tap करें और **Account** के अंतर्गत **Install App** पर tap करें (ऐप पहले से install होने पर यह item छिप जाता है)
- आपके church द्वारा text, email, या Sunday screen से साझा किया गया link फॉलो करें
- URL सीधे अपने browser में टाइप करें

:::tip church staff के लिए
install page का link अपने congregation के साथ साझा करें -- इसे अपने bulletin, newsletter, या किसी slide पर लगाएं। यह हर सदस्य को उसके device के लिए सटीक चरणों से गुज़ारता है। आप इसे अपने B1Admin dashboard के **Download the App** quick action से भी खोल सकते हैं।
:::

आप नीचे दिए browser चरणों का उपयोग करके अपने church की B1.church site के **किसी भी page** से भी PWA को मैन्युअली install कर सकते हैं -- install page बस इसे करने का निर्देशित तरीका है।

जब आप install किया हुआ ऐप खोलते हैं, तो वह सीधे आपके member dashboard पर खुलता है, जहां आप log in कर सकते हैं।

## iPhone पर Install करना (iOS — Safari)

1. अपने iPhone पर **Safari** खोलें और `https://yourchurchname.b1.church/mobile/install` पर जाएं (`yourchurchname` को अपने church के URL slug से बदलें)।
2. स्क्रीन के नीचे **Share** button (ऊपर की ओर इशारा करता तीर वाला box) पर tap करें।
3. share sheet में नीचे scroll करें और **Add to Home Screen** पर tap करें।
4. नाम अपने-आप आपके church का नाम होगा। ऊपर-दाईं ओर **Add** पर tap करें।

ऐप का icon आपकी home screen पर दिखेगा। member portal को पूर्ण-स्क्रीन मोड में खोलने के लिए उस पर tap करें।

:::info
iOS पर PWA installation के लिए Safari आवश्यक है। यदि आप iPhone पर Chrome या कोई अन्य browser उपयोग कर रहे हैं, तो पहले Safari पर जाएं।
:::

## Android पर Install करना (Chrome)

1. अपने Android device पर **Chrome** खोलें और `https://yourchurchname.b1.church/mobile/install` पर जाएं।
2. **Install on Home Screen** button पर tap करें। (यदि button उपलब्ध नहीं है, तो ऊपर-दाईं ओर तीन-बिंदु वाला menu (⋮) tap करें और **Add to Home screen** चुनें।)
3. पूछे जाने पर **Add** पर tap करें।

ऐप का icon आपकी home screen पर दिखेगा। member portal खोलने के लिए उस पर tap करें।

## Install करने के बाद

एक बार install हो जाने पर, PWA एक समर्पित पूर्ण-स्क्रीन window में सीधे member portal खोलता है। आप:

- अपने मौजूदा ChurchApps account से log in कर सकते हैं
- आपके church द्वारा सक्षम सभी member features तक पहुंच सकते हैं -- groups, giving, check-in, serving plans, और बहुत कुछ
- home screen पर icon पर tap करके कभी भी वापस आ सकते हैं

जब आपके पास न पढ़े गए messages होते हैं, तो ऐप के icon पर **notification badge** (एक छोटी संख्या वाला badge) दिखता है, ताकि आप एक नज़र में देख सकें कि आपके लिए कुछ नया है या नहीं।

:::info
PWA को internet connection की आवश्यकता होती है। कुछ native apps के विपरीत, यह offline उपयोग के लिए सारी content cache नहीं करता।
:::

## पुराने B1 Mobile ऐप का क्या?

iOS और Android पर पुराना native **B1 Mobile** app deprecated हो चुका है और अब उसे update नहीं किया जा रहा है। आगे से phone पर B1.church member portal तक पहुंचने का समर्थित तरीका PWA है, और यह native app द्वारा दी गई हर member-facing feature को कवर करता है। यदि आपने पहले native app install किया था, तो अपनी सुविधानुसार PWA पर स्विच कर लें।

deprecated app के ऐतिहासिक documentation के लिए [B1 Mobile reference page](/docs/b1-mobile/) देखें।

## संबंधित लेख

- [Logging In](./logging-in.md) — अपने B1.church account में sign in कैसे करें
