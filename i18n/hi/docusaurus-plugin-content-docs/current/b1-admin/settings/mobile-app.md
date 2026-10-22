---
title: "मोबाइल ऐप सेटिंग्स"
---

# मोबाइल ऐप सेटिंग्स {#mobile-app-settings}

<div class="article-intro">

Mobile App Settings पेज आपको उन navigation tabs को configure करने देता है जो आपके चर्च के सदस्यों के लिए **B1.church mobile experience (PWA)** में दिखते हैं। आप नियंत्रित करते हैं कि कौन से tabs दिखें, वे कहां link करें, और वे कैसे दिखाए जाएं।

</div>

:::info मूल B1 Mobile ऐप अब उपयोग में नहीं है
यहां configure किए गए tabs [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa) के ज़रिए दिए जाते हैं, जिसने मूल B1 Mobile ऐप की जगह ले ली है। अपने सदस्यों के साथ अपने चर्च का install page साझा करें — `https://yourchurchname.b1.church/mobile/install` — यह उन्हें अपने device पर ऐप install करने के चरण बताता है, और इसके लिए App Store या Google Play से download की ज़रूरत नहीं है।
:::

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको "Edit Church Settings" की अनुमति चाहिए। अगर आपके पास पहुंच नहीं है, तो [भूमिकाएं और अनुमतियां](./roles-permissions.md) देखें।
- पहले अपनी [चर्च सेटिंग्स](./church-settings.md) configure करें, जिसमें आपके चर्च का नाम और branding शामिल है

</div>

## Navigation सेटिंग्स तक पहुंचना {#accessing-navigation-settings}

1. B1 Admin में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ऊपर-बाईं ओर का search bar) खोलें और **Mobile** को expand करें।
2. **Navigation** (`/mobile/navigation`) पर click करें।
3. Navigation पेज आपके मौजूदा app tabs दिखाता है।

## नया tab जोड़ना {#adding-a-new-tab}

1. पेज के ऊपर **Add Tab** button पर click करें।
2. Tab का विवरण भरें:
   - **Name** -- वह label जो tab पर दिखता है (उदाहरण के लिए, "Sermons" या "Give")।
   - **Icon** -- अपने tab के लिए icon चुनने हेतु icon selector पर click करें।
   - **Image** -- tab को एक फ़ोटो देने के लिए **Select Image** (या **Change Image**) पर click करें। फ़ोटो वाले tabs ऐप की Home screen पर photo tiles के रूप में दिखते हैं -- देखें [Home Screen Tiles](#home-screen-tiles)।
   - **Tab Type** -- Bible, Live Stream, Donation, Website, और अन्य विकल्पों में से चुनें।
   - **URL** -- वह web address दर्ज करें जिससे tab link होना चाहिए।
   - **Visibility** -- नियंत्रित करें कि यह tab कौन देख सकता है (सभी, केवल members, आदि)। **Member Directory** tab के लिए, यह केवल नियंत्रित करता है कि tab कौन देखे; directory कौन खोल सकता है, यह Member portal पेज पर **Show in Directory** से तय होता है (देखें [Member Directory और Messaging सेटिंग्स](#member-directory--messaging-settings))।
3. अपने ऐप में tab जोड़ने के लिए **Save Tab** पर click करें।

## मौजूदा tab संपादित करना {#editing-an-existing-tab}

1. **App Tabs** सूची में किसी भी मौजूदा tab पर click करें।
2. Tab का नाम, icon, URL, type, या visibility settings अपडेट करें।
3. अपने बदलाव लागू करने के लिए **Save Tab** पर click करें।

## Tabs का क्रम बदलना {#reordering-tabs}

आप बदल सकते हैं कि tabs mobile app में किस क्रम में दिखें। सूची में tabs को drag and drop करके उन्हें फिर से व्यवस्थित करें। इस पेज पर दिखाया गया क्रम वही है जो आपके सदस्य ऐप में देखेंगे।

:::info
कुछ tabs अपने-आप तब दिख सकते हैं जब कुछ शर्तें पूरी हों -- उदाहरण के लिए, जब कोई stream चालू हो, तब Live Stream tab दिख सकता है। हाथ से जोड़े गए tabs आपको यह पूरा नियंत्रण देते हैं कि आपके सदस्य हर समय क्या देखें।
:::

:::tip
Tabs की संख्या सीमित रखें। ज़्यादातर चर्चों के लिए तीन से पांच tabs अच्छे रहते हैं। बहुत सारे tabs सदस्यों के लिए navigation को उलझन भरा बना सकते हैं।
:::

## Member Directory और Messaging सेटिंग्स {#member-directory--messaging-settings}

Mobile section में **Member portal** आइटम उन सेटिंग्स को रखता है जो B1.church अनुभव में member directory और private messaging को नियंत्रित करती हैं:

- **Directory Approval Group** -- वह group जो member directory के अपडेट, और [account deletion के अनुरोध](../profile/account-deletion.md), लागू होने से पहले उनकी समीक्षा करता है।
- **Show in Directory** -- कौन member directory खोल सकता है और कौन उसमें सूचीबद्ध होता है: **Staff Only**, **Members & Staff** (डिफ़ॉल्ट), **Regular Attendees & Above**, या **Everyone (Including Visitors)**। जिन लोगों की membership status आपके चुने स्तर से नीचे है, वे directory नहीं देखते और उसमें सूचीबद्ध नहीं होते। People &gt; View अनुमति वाले staff हमेशा directory खोल सकते हैं और सभी को देख सकते हैं, चाहे यह कुछ भी सेट हो।
- **Visibility Preference** -- उन सदस्यों के लिए चर्च-व्यापी डिफ़ॉल्ट सेट करता है जिन्होंने अभी तक अपनी सेटिंग नहीं चुनी है। **Address**, **Phone Number**, और **Email** में से हर एक का अपना dropdown है, जिसमें वही पांच स्तर उपलब्ध हैं जो visibility configure करने की हर जगह पर हैं:
  - **Everyone** -- किसी को भी दिखता है, अनाम आगंतुकों सहित
  - **Members** -- केवल उन लोगों को दिखता है जिनका Member या Staff record है
  - **Groups Only** -- केवल उन लोगों को दिखता है जो इस व्यक्ति के साथ कोई group साझा करते हैं
  - **My Group Leaders and Staff** -- केवल उस व्यक्ति के किसी group के leaders को, और staff को दिखता है
  - **Staff Only** -- केवल People &gt; View अनुमति वाले staff को, और व्यक्ति स्वयं को दिखता है

  सदस्य B1.church PWA में अपने profile के **Privacy** tab से अपने record के लिए ये डिफ़ॉल्ट बदल सकते हैं -- देखें [अपनी प्रोफ़ाइल संपादित करना](/docs/b1-church/getting-started/me-page)।
- **Minimum Age for Private Messages** -- एक child-safety नियंत्रण। जब दोनों में से कोई भी व्यक्ति इस उम्र से कम हो, तो B1 एक **नई** private-message बातचीत शुरू नहीं होने देगा, जन्मतिथि के आधार पर (जन्मतिथि फ़ाइल में न हो तो household role को विकल्प के रूप में इस्तेमाल किया जाता है)। इस उम्र से कम के लोग directory में पूरी तरह दिखते रहते हैं -- केवल direct messaging **दोनों दिशाओं** में बंद होती है, staff सहित सभी के लिए। Group conversations और किसी बच्चे के माता-पिता को message करना अब भी काम करता है। विकल्प Off, 13, 16, या 18 हैं; डिफ़ॉल्ट **18** है। मौजूदा बातचीत पर असर नहीं पड़ता।

:::tip
चूंकि minimum-age जांच जन्मतिथि पर निर्भर करती है, सुनिश्चित करें कि आपके मंडली के बच्चों की जन्मतिथि भरी हुई हो। यह setting उसी child-safety परिवार की है जिसमें [check-in सुरक्षा नियंत्रण](../attendance/checkin-safety.md) आते हैं।
:::

### Home Screen Sign-In Prompt {#home-screen-sign-in-prompt}

जो आगंतुक साइन इन किए बिना ऐप की [होम स्क्रीन](/docs/b1-church/getting-started/navigating#home) खोलते हैं, उन्हें एक छोटा prompt दिखता है -- डिफ़ॉल्ट रूप से, *"Sign in to see your groups, giving, and more."* -- जिसके साथ एक **Sign In** button होता है। उसी Member portal पेज (`/mobile/b1-mobile`) पर **Home screen sign-in prompt** settings इसे बदलने देती हैं:

- **Show sign-in prompt on the app home screen** -- इसे बंद करने से Home screen से prompt और **Sign In** button दोनों छिप जाते हैं। आगंतुक फिर भी app menu से साइन इन कर सकते हैं।
- **Sign-in prompt text** -- डिफ़ॉल्ट शब्दों की जगह अपना संदेश रखें (अधिकतम 150 अक्षर)। डिफ़ॉल्ट इस्तेमाल करने के लिए इसे खाली छोड़ें। Prompt बंद होने पर यह box disabled रहता है।

सेव करने के लिए **Save** पर click करें। Save करने पर ऐप की cached settings refresh होती हैं, इसलिए बदलाव अगली बार Home screen लोड होने पर दिखता है।

### Home Screen Tiles {#home-screen-tiles}

जिन tabs में फ़ोटो है (देखें [नया tab जोड़ना](#adding-a-new-tab) में **Image**), वे ऐप की [होम स्क्रीन](/docs/b1-church/getting-started/navigating#home) पर photo tiles के रूप में दिखते हैं, जो आपके चर्च के नाम वाले section में होते हैं। इसमें Verse of the Day tab भी शामिल है, अगर आप उसे फ़ोटो देते हैं। फ़ोटो वाले tabs tab bar में भी दिखते रहते हैं।

उसी Member portal पेज (`/mobile/b1-mobile`) पर **Home screen tiles** setting नियंत्रित करती है कि ये tiles कैसे व्यवस्थित हों। एक **Layout** चुनें:

- **Grid** -- हर पंक्ति में दो tiles (डिफ़ॉल्ट)। जब tiles की संख्या विषम हो, तो पहला tile पूरी चौड़ाई लेता है।
- **Scrolling row** -- tiles की एक पंक्ति जिसे सदस्य बगल में swipe करते हैं।
- **List** -- एक सूची जिसमें हर tab के नाम के बगल में एक छोटा फ़ोटो thumbnail होता है।

लागू करने के लिए **Save** पर click करें।

## ये tabs कहां दिखते हैं {#where-these-tabs-appear}

यहां configure किए गए tabs **B1.church PWA** में दिखते हैं, जिसे आपके सदस्य `https://yourchurchname.b1.church` के किसी भी पेज से install करते हैं। इस पेज पर किए गए बदलाव अगली बार सदस्य के ऐप खोलने पर दिखते हैं।

फ़ोन पर, नीचे की tab bar में **Home**, आपके अधिकतम तीन tabs, और **More** दिखते हैं; कंप्यूटर पर, header में अधिकतम पांच दिखते हैं। अंतर्निर्मित screens (जैसे Sermons, Giving, या Groups) को पहले स्लॉट मिलते हैं, और **Internal Page** tabs बचे हुए स्लॉट भरते हैं। **External URL** और **Verse of the Day** tabs को कभी स्लॉट नहीं मिलता। हर tab, जिसमें वे भी शामिल हैं जो फ़िट नहीं होते, ऐप के **More** पेज पर सूचीबद्ध होता है। सदस्य क्या देखते हैं, इसके लिए [B1App का नेविगेशन](/docs/b1-church/getting-started/navigating) देखें। (Tabs उन सदस्यों के लिए पुराने [मूल B1 Mobile ऐप](/docs/b1-mobile/) में भी दिखाए जाते हैं जो अभी भी उसे चलाते हैं, लेकिन वह ऐप अब deprecated है और उसे अपडेट नहीं किया जा रहा।)

## अगले कदम {#next-steps}

- [चर्च सेटिंग्स](./church-settings.md) -- अपने चर्च की जानकारी और branding कॉन्फ़िगर करें
- [भूमिकाएं और अनुमतियां](./roles-permissions.md) -- अपनी टीम के लिए पहुंच प्रबंधित करें
