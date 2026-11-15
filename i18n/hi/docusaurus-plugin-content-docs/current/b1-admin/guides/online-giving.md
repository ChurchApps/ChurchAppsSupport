---
title: "मार्गदर्शिका: ऑनलाइन giving सेट करें"
description: "B1 Admin में दान फ़ंड बनाकर, Stripe जोड़कर, और सदस्यों के लिए अपनी B1.church वेबसाइट में Donate पेज जोड़कर ऑनलाइन giving सेट करें।"
---

# ऑनलाइन giving सेट करें

<div class="article-intro">

अपने चर्च में ऑनलाइन दान स्वीकार करने के लिए आवश्यक हर चीज़ से गुज़रें -- दान फ़ंड बनाने से, भुगतान प्रोसेसिंग के लिए Stripe जोड़ने तक, और giving पेज को अपनी मंडली के साथ साझा करने तक। अंत में, सदस्य अपनी वेबसाइट और मोबाइल ऐप के माध्यम से ऑनलाइन दे सकेंगे।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एडमिन एक्सेस वाला B1 Admin खाता -- [Roles & Permissions](../people/roles-permissions.md) देखें
- एक Stripe खाता (आवश्यकता हो तो [stripe.com](https://stripe.com) पर मुफ़्त बनाएं)

</div>

## चरण 1: दान फ़ंड बनाएं {#step-1-create-donation-funds}

फ़ंड वे श्रेणियां हैं जिनमें दाता दे सकते हैं। दान स्वीकार करने से पहले आपको कम से कम एक फ़ंड चाहिए।

अपनी giving श्रेणियां सेट करने के लिए [Funds](../donations/funds.md) मार्गदर्शिका का पालन करें:

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) में **Donations > Funds** चुनें और **Add Fund** पर क्लिक करें
2. अपने सबसे सामान्य फ़ंड बनाएं (जैसे, "General Fund", "Building Fund", "Missions")
3. उन फ़ंड पर **Tax Deductible** चेक करें जिनके उपहार वर्ष-अंत giving विवरण में होने चाहिए, और उन फ़ंड पर **Visible to Donors** चेक रहने दें जिन्हें दाता ऑनलाइन चुन सकें

:::tip
आप किसी भी समय और फ़ंड जोड़ सकते हैं। अपनी सबसे सामान्य giving श्रेणियों से शुरू करें।
:::

## चरण 2: Stripe जोड़ें {#step-2-connect-stripe}

सभी भुगतान प्रोसेसिंग Stripe संभालता है। आप अपना Stripe खाता B1 Admin से जोड़ेंगे ताकि दान आपके बैंक खाते में पहुंचें।

Stripe जोड़ने के लिए [Online Giving Setup](../donations/online-giving-setup.md) मार्गदर्शिका का पालन करें:

1. अपने Stripe डैशबोर्ड में लॉग इन करें और अपनी Publishable Key और Secret Key खोजने के लिए **Developers > API Keys** पर जाएं
2. B1 Admin में, **Settings** पर जाएं, **Giving** अनुभाग में **Edit** पर क्लिक करें, और **Provider** को **Stripe** पर सेट करें
3. Publishable Key को **Public Key** में और Secret Key को **Secret Key** में पेस्ट करें, **Currency** जांचें, और **Save** पर क्लिक करें

B1 giving providers के रूप में **Kingdom Funding** और **Paystack** (अफ़्रीका के चर्चों के लिए) का भी समर्थन करता है -- देखें [Online Giving Setup](../donations/online-giving-setup.md)।

:::warning
Stripe आपकी Secret Key केवल एक बार दिखाता है। Stripe डैशबोर्ड छोड़ने से पहले उसे कॉपी करके सहेज लें। यदि यह खो जाए, तो आपको नई बनानी होगी।
:::

## चरण 3: अपनी वेबसाइट पर giving पेज जोड़ें {#step-3-add-a-giving-page-to-your-website}

अपनी B1 वेबसाइट पर एक दान पेज जोड़कर giving को सुलभ बनाएं।

[Online Giving Setup](../donations/online-giving-setup.md) और [Managing Pages](../website/managing-pages.md) मार्गदर्शिकाओं का पालन करके:

1. अपनी B1.church साइट में एक **Donation** टैब जोड़ें (या वेबसाइट बिल्डर में किसी पेज पर एक **Donation** element)
2. आपका giving URL होगा: `https://yoursubdomain.b1.church/donate`
3. सदस्य बिना लॉग इन किए दे सकते हैं (सार्वजनिक पेज), या सहेजे गए भुगतान तरीकों और दान इतिहास के लिए लॉग इन कर सकते हैं
4. दाताओं को सीधे एक फ़ंड पर भेजने के लिए, **Donations > Funds** के अंतर्गत उस फ़ंड पर **Giving Link** पर क्लिक करें ताकि फ़ंड और राशि पहले से चुने हुए लिंक को कॉपी किया जा सके (या QR कोड डाउनलोड किया जा सके)

## चरण 4: एक परीक्षण दान करें {#step-4-make-a-test-donation}

अपनी मंडली को घोषणा करने से पहले, सब कुछ सत्यापित करें।

1. प्रवाह को शुरू से अंत तक सत्यापित करने के लिए एक छोटा परीक्षण दान करें
2. जांचें कि दान B1 Admin में **Donations > Batches** के अंतर्गत दिखता है

:::tip
वास्तविक शुल्क लगाए बिना सत्यापित करने के लिए, पहले Stripe की test keys सहेजें, फिर अपनी मंडली को घोषणा करने से पहले **Settings > Giving** में उन्हें अपनी live keys से बदल दें।
:::

## चरण 5: अपनी मंडली को सूचित करें {#step-5-announce-to-your-congregation}

बात फैलाएं ताकि सदस्य जानें कि वे ऑनलाइन दे सकते हैं।

1. अपनी वेबसाइट, ईमेल न्यूज़लेटर, बुलेटिन और सोशल मीडिया के माध्यम से giving URL साझा करें
2. सदस्य [B1 ऐप](../../b1-church/giving/index.md) के माध्यम से भी दे सकते हैं -- giving सुविधा उसमें बनी हुई है

:::info
लॉग इन सदस्य सहेजे गए भुगतान तरीके सेट कर सकते हैं, आवर्ती दान सेट कर सकते हैं, और अपना giving इतिहास देख सकते हैं। गुमनाम giving भी काम करती है -- किसी लॉगिन की आवश्यकता नहीं।
:::

## चरण 6: निरंतर प्रबंधन {#step-6-ongoing-management}

अपने दान रिकॉर्ड अद्यतन रखें और पूरे वर्ष रिपोर्ट बनाएं।

1. ऑनलाइन उपहार स्वतः दर्ज होते हैं। जो Stripe लेनदेन सिंक नहीं हुए, उन्हें पकड़ने के लिए [Stripe Import](../donations/stripe-import.md) का उपयोग करें -- क्या छूटा है यह देखने के लिए **Preview** पर क्लिक करें, फिर **Import Missing**
2. फ़ंड के अनुसार giving ट्रेंड और कुल ट्रैक करने के लिए **Donations > Summary** के अंतर्गत [दान रिपोर्ट देखें](../donations/donation-reports.md)
3. ऐसे आवर्ती उपहारों के लिए **Donations > Failed Gifts** देखें जिनका कार्ड अस्वीकृत हुआ था, और दाता के भुगतान तरीका अपडेट करने के बाद **Retry** पर क्लिक करें
4. अपने दाताओं के कर रिकॉर्ड के लिए [वर्ष-अंत giving विवरण बनाएं](../donations/giving-statements.md)

:::tip
हर महीने बंद करने से पहले Stripe Import का पूर्वावलोकन चलाएं ताकि आपके रिकॉर्ड Stripe से मेल खाएं। पूरी वर्ष-अंत प्रक्रिया के लिए [Year-End Reports Guide](./year-end-reports.md) देखें।
:::

## आप तैयार हैं! {#youre-done}

आपका चर्च अब ऑनलाइन दान स्वीकार कर रहा है। सदस्य आपकी वेबसाइट, B1 ऐप, या किसी भी वेब ब्राउज़र वाले डिवाइस से दे सकते हैं। सभी दान B1 Admin में स्वतः ट्रैक होते हैं।

## संबंधित लेख {#related-articles}

- [Funds](../donations/funds.md) — दान श्रेणियां बनाएं और प्रबंधित करें
- [Batches](../donations/batches.md) — दानों को समूहों में व्यवस्थित करें
- [Recording Donations](../donations/recording-donations.md) — नकद और चेक दान मैन्युअल रूप से दर्ज करें
- [Stripe Import](../donations/stripe-import.md) — ऑनलाइन लेनदेन B1 Admin में लाएं
- [Donation Reports](../donations/donation-reports.md) — giving ट्रेंड और कुल देखें
- [Giving Statements](../donations/giving-statements.md) — वर्ष-अंत कर विवरण बनाएं
- [Making Donations](../../b1-church/giving/making-donations.md) — B1.church और B1 ऐप पर सदस्य का giving अनुभव
