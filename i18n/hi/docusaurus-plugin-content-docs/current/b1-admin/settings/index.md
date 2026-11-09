---
title: "सेटिंग"
description: "B1 Admin की Settings में नेविगेट करें: चर्च की जानकारी, ब्रांडिंग, कैंपस, कस्टम फ़ील्ड, उपयोगकर्ता भूमिकाएँ, और B1.church ऐप नेविगेशन।"
---

# सेटिंग

<div class="article-intro">

Settings सेक्शन वह जगह है जहाँ आप B1 Admin में अपने चर्च का खाता, ब्रांडिंग और प्रशासनिक विकल्प कॉन्फ़िगर करते हैं। यहाँ से आप अपने चर्च के नाम और subdomain से लेकर उपयोगकर्ता अनुमतियों और मोबाइल ऐप कॉन्फ़िगरेशन तक सब कुछ प्रबंधित कर सकते हैं।

</div>

## यहाँ क्या मिलेगा

Settings क्षेत्र इन उप-सेक्शनों में व्यवस्थित है:

1. **Settings** -- अपने चर्च की बुनियादी जानकारी, ब्रांडिंग, subdomain, क्षेत्र (तारीख और फ़ोन फ़ॉर्मेट), टेक्स्टिंग प्रदाता, और फ़ाइल स्टोरेज कॉन्फ़िगर करें। विवरण के लिए [Church Settings](./church-settings.md) देखें। अपना खुद का डोमेन नाम (जैसे yourchurch.org) इस्तेमाल करने के लिए [Custom Domain](./custom-domain.md) देखें।
2. **Campuses** -- अपने चर्च के कई भौतिक स्थानों को जोड़ें और प्रबंधित करें। एक बार बन जाने पर, कैंपस व्यक्ति प्रोफ़ाइल, उपस्थिति सेटअप, और Demographics डैशबोर्ड में दिखते हैं। यह मुख्य Settings पेज पर एक सेक्शन के रूप में पहुँचा जाता है, न कि अलग नेविगेशन आइटम के रूप में। विवरण के लिए [Campuses](./campuses.md) देखें।
3. **Custom Fields** -- लोगों पर ट्रैक करने के लिए अपने खुद के फ़ील्ड परिभाषित करें (एक तारीख, संख्या, हाँ/नहीं उत्तर, या चुनाव सूची), फिर प्रोफ़ाइल पर उनके मान भरें और उन पर खोज करें। यह भी मुख्य Settings पेज पर एक सेक्शन के रूप में पहुँचा जाता है। विवरण के लिए [Custom Fields](./custom-fields.md) देखें।
4. **Email Templates** -- मैन्युअली या workflow से भेजने के लिए दोबारा उपयोग होने वाली ईमेल सामग्री सहेजें। विवरण के लिए [Email Templates](./email-templates.md) देखें।
5. **Audit Log** और **Batches** -- आपके खाते में हुए बदलावों की समीक्षा करें ([Audit Log](../reports/audit-log.md)), और बल्क आयात और कार्रवाइयों की समीक्षा या पूर्ववत करें (**Batches**)।
6. **Server Admin** -- अपने चर्च की सर्वर-स्तरीय सेटिंग प्रबंधित करने के लिए उन्नत प्रशासन उपकरण।

:::info
**Mobile Apps** कॉन्फ़िगरेशन और **Forms** अब अपने अलग शीर्ष-स्तरीय नेविगेशन आइटम रखते हैं -- **Mobile** और **Forms** (जो **People** के अंतर्गत मिलता है) -- Settings के भीतर रहने के बजाय। विवरण के लिए [Mobile App Settings](./mobile-app.md) और [Creating Forms](/docs/b1-admin/forms/creating-forms) देखें।
:::

## मुख्य Settings पेज

जब आप Settings पेज खोलते हैं, तो बाईं ओर का पैनल आपका **चर्च का नाम**, **subdomain**, और पता दिखाता है, साथ में एक **Import/Export** लिंक, जो सिस्टमों के बीच डेटा स्थानांतरण के लिए आयात/निर्यात टूल खोलता है।

उसके नीचे एक **Configuration** सूची हर सेटिंग सेक्शन से लिंक करती है: **Church Information**, **General**, **Region**, **Giving**, **Texting**, **File Storage**, **Domains**, **Grade Promotion**, **Check-In**, **Campuses**, **Custom Fields**, और **Developer**। जो सेक्शन अभी सेट करने बाकी हैं (जैसे Giving, Texting, या Domains), उन पर एक छोटा बिंदु होता है। सभी सेक्शन एक ही पेज पर हैं -- किसी सेक्शन तक जाने के लिए सूची में उसके नाम पर क्लिक करें, या बस नीचे स्क्रॉल करें। हर सेक्शन अपनी मौजूदा सेटिंग दिखाता है; बदलने के लिए सेक्शन में **Edit** पर क्लिक करें।

**Email Templates**, **Audit Log**, और **Batches** अलग पेज हैं -- उन्हें Settings के अंतर्गत [Jump menu](../introduction.md#getting-around-with-the-jump-menu) से खोलें।

चर्च की जानकारी संपादित करने के लिए **Church Information** सेक्शन से शुरू करें -- देखें [Church Settings](./church-settings.md)। उपयोगकर्ता भूमिकाएँ प्रबंधित करने के लिए, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें और **Settings > Roles** चुनें -- देखें [Roles & Permissions](./roles-permissions.md)।

:::tip
**Church Information** के अंतर्गत अपने चर्च का नाम और ब्रांडिंग कॉन्फ़िगर करके शुरुआत करें, फिर अपनी टीम के सदस्यों को उचित पहुँच के साथ आमंत्रित करने के लिए [Roles](./roles-permissions.md) सेट करें।
:::

:::info
आपके डेटा की सुरक्षा कैसे होती है, इसकी जानकारी के लिए [Data Security](./data-security.md) देखें।
:::

## आगे के कदम

- [Church Settings](./church-settings.md) -- अपने चर्च की जानकारी और ब्रांडिंग कॉन्फ़िगर करें
- [Campuses](./campuses.md) -- मल्टी-साइट चर्चों के लिए स्थान जोड़ें
- [Roles & Permissions](./roles-permissions.md) -- उपयोगकर्ता भूमिकाएँ और पहुँच नियंत्रण सेट करें
- [Mobile App Settings](./mobile-app.md) -- B1.church PWA के नेविगेशन टैब और ऐप थीम रंग अनुकूलित करें
- [Push Notifications](./push-notifications.md) -- अपने ऐप के उपयोगकर्ताओं को पुश सूचनाएँ भेजें या निर्धारित करें
- [Data Security](./data-security.md) -- जानें कि आपके डेटा की सुरक्षा कैसे होती है
