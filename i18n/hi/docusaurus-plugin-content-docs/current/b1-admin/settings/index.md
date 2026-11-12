---
title: "सेटिंग्स"
description: "B1 Admin की Settings में अपना रास्ता खोजें: चर्च की जानकारी, ब्रांडिंग, कैंपस, कस्टम फ़ील्ड, उपयोगकर्ता भूमिकाएँ, और B1.church ऐप नेविगेशन।"
---

# सेटिंग्स

<div class="article-intro">

Settings अनुभाग वह जगह है जहाँ आप B1 Admin में अपने चर्च का खाता, ब्रांडिंग और प्रशासनिक विकल्प कॉन्फ़िगर करते हैं। यहाँ से आप अपने चर्च के नाम और सबडोमेन से लेकर उपयोगकर्ता अनुमतियों और मोबाइल ऐप कॉन्फ़िगरेशन तक सब कुछ प्रबंधित कर सकते हैं।

</div>

## यहाँ क्या मिलेगा {#what-you-will-find-here}

Settings क्षेत्र को इन उप-अनुभागों में व्यवस्थित किया गया है:

1. **Settings** -- अपने चर्च की बुनियादी जानकारी, सबडोमेन, क्षेत्र (दिनांक और फ़ोन प्रारूप), दान, टेक्स्टिंग प्रदाता, फ़ाइल भंडारण, और बहुत कुछ कॉन्फ़िगर करें। विवरण के लिए [Church Settings](./church-settings.md) देखें। अपना स्वयं का डोमेन नाम (जैसे yourchurch.org) उपयोग करने के लिए, [Custom Domain](./custom-domain.md) देखें।
2. **Campuses** -- अपने चर्च के कई भौतिक स्थान जोड़ें और प्रबंधित करें। एक बार बनने के बाद, कैंपस व्यक्ति की प्रोफ़ाइल, उपस्थिति सेटअप और Demographics डैशबोर्ड में दिखते हैं। यह अलग नेविगेशन आइटम के बजाय मुख्य Settings पेज पर एक अनुभाग के रूप में पहुँचा जाता है। विवरण के लिए [Campuses](./campuses.md) देखें।
3. **Custom Fields** -- लोगों पर ट्रैक करने के लिए अपने स्वयं के फ़ील्ड परिभाषित करें (तिथि, संख्या, हाँ/ना उत्तर, या चयन-सूची), फिर उन्हें प्रोफ़ाइल पर भरें और उन पर खोजें। यह भी मुख्य Settings पेज पर एक अनुभाग के रूप में पहुँचा जाता है। विवरण के लिए [Custom Fields](./custom-fields.md) देखें।
4. **Roles** -- नियंत्रित करें कि हर स्टाफ़ सदस्य और स्वयंसेवक क्या देख और बदल सकता है। देखें [Roles & Permissions](./roles-permissions.md)।
5. **Email Templates** -- मैन्युअल रूप से या किसी वर्कफ़्लो से भेजने के लिए पुन: उपयोग योग्य ईमेल सामग्री सहेजें। विवरण के लिए [Email Templates](./email-templates.md) देखें।
6. **Audit Log** और **Batches** -- अपने खाते में हुए बदलावों की समीक्षा करें ([Audit Log](../reports/audit-log.md)), और थोक इम्पोर्ट और कार्रवाइयों की समीक्षा या उन्हें वापस करें (**Batches**)।
7. **Server Admin** -- उन्नत प्रशासन उपकरण, जो केवल ChurchApps सर्वर एडमिनिस्ट्रेटरों को दिखते हैं।

:::info
**Mobile Apps** कॉन्फ़िगरेशन और **Forms** अब Settings के भीतर रहने के बजाय अपने स्वयं के शीर्ष-स्तरीय नेविगेशन आइटम रखते हैं -- **Mobile** और **Forms** (जो **People** के अंतर्गत मिलते हैं)। विवरण के लिए [Mobile App Settings](./mobile-app.md) और [Creating Forms](/docs/b1-admin/forms/creating-forms) देखें।
:::

## मुख्य Settings पेज {#the-main-settings-page}

जब आप पहली बार Settings पेज खोलते हैं, तो बाएँ पैनल में आपका **चर्च का नाम**, **सबडोमेन**, और पता दिखता है, साथ ही एक **Import/Export** लिंक जो सिस्टमों के बीच डेटा स्थानांतरित करने के लिए इम्पोर्ट/एक्सपोर्ट उपकरण खोलता है।

उसके नीचे एक **Configuration** सूची हर सेटिंग्स अनुभाग से लिंक करती है: **Church Information**, **General**, **Region**, **Giving**, **Texting**, **File Storage**, **Domains**, **Grade Promotion**, **Check-In**, **Volunteer Signup**, **Giving privacy**, **Campuses**, **Custom Fields**, और **Developer**। हर आइटम अपनी वर्तमान सेटिंग का एक पंक्ति का सारांश दिखाता है, और जिन अनुभागों को अभी सेट करना बाकी है (जैसे Giving, Texting, या Domains) उन पर एक छोटा बिंदु होता है। **Giving** केवल उन लोगों को दिखता है जो दान सेटिंग्स संपादित कर सकते हैं। फ़ोन पर सूची छिपी होती है; हर अनुभाग तक पहुँचने के लिए पेज स्क्रॉल करें। सभी अनुभाग एक ही पेज पर हैं -- उन तक स्क्रॉल करने के लिए सूची में किसी नाम पर क्लिक करें, या बस नीचे स्क्रॉल करें। हर अनुभाग अपनी वर्तमान सेटिंग्स दिखाता है; उन्हें बदलने के लिए किसी अनुभाग में **Edit** पर क्लिक करें।

**Developer** अनुभाग में तीन टैब हैं: **API Keys**, **Webhooks**, और **Connected Apps**। देखें [API Keys](../../developer/api/api-keys.md), [Webhooks](../../developer/api/webhooks.md), और [Connected Apps](../../developer/api/connected-apps.md)।

**Email Templates**, **Audit Log**, और **Batches** अलग पेज हैं -- इन्हें [Jump menu](../introduction.md#getting-around-with-the-jump-menu) में **Settings** के अंतर्गत खोलें।

**Church Information** अनुभाग से शुरू करें ताकि अपने चर्च का नाम, पता, और संपर्क जानकारी संपादित कर सकें -- देखें [Church Settings](./church-settings.md)। उपयोगकर्ता भूमिकाएँ प्रबंधित करने के लिए, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें और **Settings > Roles** चुनें -- देखें [Roles & Permissions](./roles-permissions.md)।

:::tip
**Church Information** के अंतर्गत अपने चर्च का नाम और ब्रांडिंग सेट करके शुरू करें, फिर सही स्तर की पहुँच के साथ अपनी टीम के सदस्यों को आमंत्रित करने के लिए [Roles](./roles-permissions.md) सेट करें।
:::

:::info
यह जानने के लिए कि आपके डेटा की सुरक्षा कैसे होती है, [Data Security](./data-security.md) देखें।
:::

## अगले कदम {#next-steps}

- [Church Settings](./church-settings.md) -- अपने चर्च की जानकारी और ब्रांडिंग कॉन्फ़िगर करें
- [Campuses](./campuses.md) -- कई-स्थान वाले चर्चों के लिए स्थान जोड़ें
- [Roles & Permissions](./roles-permissions.md) -- उपयोगकर्ता भूमिकाएँ और पहुँच नियंत्रण सेट करें
- [Mobile App Settings](./mobile-app.md) -- B1.church PWA के नेविगेशन टैब और ऐप थीम के रंग अनुकूलित करें
- [Push Notifications](./mobile-app.md#push-notifications) -- अपने ऐप के उपयोगकर्ताओं को पुश सूचनाएँ भेजें या शेड्यूल करें
- [Data Security](./data-security.md) -- जानें कि आपके डेटा की सुरक्षा कैसे होती है
