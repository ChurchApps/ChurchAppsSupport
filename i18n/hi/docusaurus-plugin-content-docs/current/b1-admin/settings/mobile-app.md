---
title: "मोबाइल ऐप सेटिंग्स"
---

# मोबाइल ऐप सेटिंग्स

<div class="article-intro">

मोबाइल ऐप सेटिंग्स पृष्ठ आपको navigation tabs को कॉन्फ़िगर करने देता है जो आपकी चर्च के सदस्यों के लिए **B1.church mobile experience (PWA)** में दिखाई देते हैं। आप नियंत्रित करते हैं कि कौन सी tabs दिखाई देती हैं, वे किसे link करती हैं, और वे कैसे प्रदर्शित होती हैं।

</div>

:::info The native B1 Mobile app is deprecated
यहां कॉन्फ़िगर किए गए Tabs [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa) के माध्यम से delivered होते हैं, जिसने native B1 Mobile app को प्रतिस्थापित किया है। अपनी चर्च के install पृष्ठ को साझा करें — `https://yourchurchname.b1.church/mobile/install` — सदस्यों के साथ; यह उन्हें अपने डिवाइस पर ऐप install करने के माध्यम से चलाता है, बिना App Store या Google Play download की आवश्यकता के।
:::

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- आपको "Edit Church Settings" अनुमति की आवश्यकता है। यदि आपको एक्सेस नहीं है तो [Roles & Permissions](./roles-permissions.md) देखें।
- अपनी [Church Settings](./church-settings.md) को पहले कॉन्फ़िगर करें, अपनी चर्च का नाम और branding सहित

</div>

## मोबाइल ऐप सेटिंग्स तक पहुंचना

1. B1 Admin में, शीर्ष-बाएं कोने में **section menu** खोलें (छोटे तीर के साथ section का नाम) और **Settings** चुनें।
2. शीर्षलेख में **Mobile Apps** बटन पर क्लिक करें।
3. मोबाइल ऐप सेटिंग्स पृष्ठ आपके current app tabs प्रदर्शित करता है।

## एक नया Tab जोड़ना

1. पृष्ठ के शीर्ष पर **Add Tab** बटन पर क्लिक करें।
2. Tab विवरण भरें:
   - **Name** -- वह लेबल जो tab पर दिखाई देता है (उदाहरण के लिए, "Sermons" या "Give")।
   - **Icon** -- icon selector को click करने के लिए अपने tab के लिए एक icon चुनें। आप एक custom image भी upload कर सकते हैं।
   - **Tab Type** -- Bible, Live Stream, Donation, Website, और अधिक जैसे विकल्पों से select करें।
   - **URL** -- tab को link करना चाहिए उस web पते को दर्ज करें।
   - **Visibility** -- नियंत्रित करें कि यह tab कौन देख सकता है (everyone, members only, आदि)।
3. इसे अपने app में जोड़ने के लिए **Save Tab** पर क्लिक करें।

## एक मौजूदा Tab को संपादित करना

1. **App Tabs** सूची में किसी भी existing tab पर क्लिक करें।
2. Tab के नाम, icon, URL, type, या visibility settings को अपडेट करें।
3. अपने परिवर्तनों को लागू करने के लिए **Save Tab** पर क्लिक करें।

## Tabs को Reorder करना

आप उस order को बदल सकते हैं जिसमें tabs mobile app में दिखाई देते हैं। उन्हें reorder करने के लिए सूची में tabs को drag और drop करें। इस पृष्ठ पर दिखाया गया order आपके सदस्यों के app में देखेगा उसी order से मेल खाता है।

:::info
कुछ tabs स्वचालित रूप से दिखाई दे सकते हैं जब कुछ शर्तें पूरी हों -- उदाहरण के लिए, एक Live Stream tab जब एक stream सक्रिय हो तो दिखाई दे सकता है। Manually जोड़े गए tabs आपको किसी भी समय पूर्ण नियंत्रण देते हैं कि आपके सदस्य क्या देखते हैं।
:::

:::tip
अपने tab count को manageable रखें। ज्यादातर चर्चों के लिए तीन से पांच tabs अच्छी तरह काम करता है। बहुत ज्यादा tabs आपके सदस्यों के लिए navigation को confusing बना सकता है।
:::

## Member Directory & Messaging सेटिंग्स

**B1 Mobile** tab same Mobile section में member directory और private messaging को govern करने वाली settings रखता है B1.church experience में:

- **Directory Approval Group** -- वह group जो member directory updates को review करता है इससे पहले कि वे applied हों।
- **Show in Directory** -- कौन member directory में दिखाई दे सकता है (Staff Only से Everyone तक)।
- **Visibility Preferences** -- member addresses, phone numbers, और email addresses के लिए default visibility।
- **Minimum Age for Private Messages** -- एक child-safety control। B1 एक **new** private-message conversation नहीं खोलेगा जब either person इस age से कम है, उनके birthdate के आधार पर (household role है एक fallback जब file पर कोई birthdate नहीं है)। Age से कम लोग directory में पूरी तरह दिखाई देते हैं -- केवल direct messaging को blocked किया जाता है, **both directions** में, everyone के लिए including staff। Group conversations और messaging एक child के parents अभी भी काम करते हैं। विकल्प Off, 13, 16, या 18 हैं; default है **18**। Existing conversations प्रभावित नहीं होते हैं।

:::tip
क्योंकि minimum-age check birthdates पर निर्भर करता है, सुनिश्चित करें कि आपके congregation में बच्चों के लिए birthdates भरे हुए हैं। यह setting [check-in safety controls](../attendance/checkin-safety.md) के समान child-safety family में है।
:::

## ये Tabs कहां दिखाई देते हैं

जो tabs आप यहां कॉन्फ़िगर करते हैं वे **B1.church PWA** में displayed होते हैं जो आपके सदस्य `https://yourchurchname.b1.church` पर किसी भी पृष्ठ से install करते हैं। इस पृष्ठ पर जो परिवर्तन आप करते हैं वे अगली बार जब एक सदस्य app खोलता है तो reflected होते हैं। (Tabs legacy [B1 Mobile native app](/docs/b1-mobile/) द्वारा भी rendered होते हैं किसी भी सदस्य के लिए जो अभी भी इसे चला रहे हैं, लेकिन वह app deprecated है और अब update नहीं किया जा रहा है।)

## अगले कदम

- [Church Settings](./church-settings.md) -- अपनी चर्च की जानकारी और branding को configure करें
- [Roles & Permissions](./roles-permissions.md) -- अपनी team के लिए access manage करें
