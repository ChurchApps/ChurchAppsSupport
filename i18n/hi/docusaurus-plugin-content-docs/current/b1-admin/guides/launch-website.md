---
title: "मार्गदर्शिका: अपनी चर्च वेबसाइट लॉन्च करें"
description: "B1 Admin में चर्च वेबसाइट सेट करें: अपना होम पेज बनाएं, रंग और लोगो मिलाएं, मुख्य पेज जोड़ें, कस्टम डोमेन जोड़ें, और giving फ़ॉर्म जोड़ें।"
---

# अपनी चर्च वेबसाइट लॉन्च करें

<div class="article-intro">

B1.church में बिना अतिरिक्त शुल्क के एक पूर्ण वेबसाइट बिल्डर शामिल है। यह मार्गदर्शिका आपको शून्य से अपनी चर्च वेबसाइट बनाने की प्रक्रिया से गुज़ारती है -- अपना होम पेज सेट करना, अपना रूप और अनुभव कॉन्फ़िगर करना, मुख्य पेज जोड़ना, और वैकल्पिक रूप से ऑनलाइन giving और इवेंट पंजीकरण फ़ॉर्म जोड़ना।

</div>

## प्रशिक्षण वीडियो {#training-video}

<YouTube id="aA4UahZpmXg" title="Launching Your Church Website in B1" next="Editing Pages and Navigation in B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- अपना चर्च लोगो तैयार रखें (पारदर्शी पृष्ठभूमि वाला PNG सबसे अच्छा काम करता है)
- अपनी साइट के लिए 2–3 ब्रांड रंग चुनें
- यदि आप कस्टम डोमेन (जैसे yourchurch.com) उपयोग कर रहे हैं, तो अपने DNS प्रदाता (GoDaddy, Cloudflare, आदि) तक पहुंच रखें
- यदि आप अपनी साइट पर ऑनलाइन giving चाहते हैं, तो पहले [Online Giving Setup](../donations/online-giving-setup.md) (Stripe) पूरा करें

</div>

## चरण 1: प्रारंभिक वेबसाइट सेटअप {#step-1-initial-website-setup}

अपना होम पेज और बुनियादी साइट संरचना बनाकर शुरुआत करें।

[Website Initial Setup](../website/initial-setup.md) मार्गदर्शिका का पालन करके:

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) में **Website > Pages** चुनें
2. **Add Page** पर क्लिक करें, **Blank** चुनें, **Page Title** के रूप में "Home" दर्ज करें, और **Save** पर क्लिक करें। **Page Settings** में, **URL Path** को `/` पर सेट करें
3. **Edit Content** पर क्लिक करें, एक **Section** जोड़ें, फिर अपना हीरो, स्वागत संदेश, चर्च का नाम और टैगलाइन, और अन्य मुख्य जानकारी जोड़ें

:::tip
शून्य से शुरू कर रहे हैं? एक [Site Template](../website/managing-pages.md#starting-from-a-site-template) तैयार पेजों का एक सेट बनाता है (होम, परिचय, connect, give, और अन्य) जिनके नेविगेशन लिंक पहले से जुड़े होते हैं -- प्लेसहोल्डर सामग्री को अपनी सामग्री से बदलें।
:::

## चरण 2: रूप कॉन्फ़िगर करें {#step-2-configure-appearance}

अपनी साइट की दृश्य पहचान सेट करें -- रंग, फ़ॉन्ट, लोगो और फ़ुटर।

[Appearance](../website/appearance.md) मार्गदर्शिका का पालन करके:

1. Jump menu में **Website > Appearance** चुनें
2. **Logo** के अंतर्गत, एक **Light Background Logo** और एक **Dark Background Logo** अपलोड करें
3. **Color Palette** के अंतर्गत, अपने ब्रांड रंग सेट करें और **Save Palette** पर क्लिक करें, फिर अपने **Fonts** चुनें
4. नेविगेशन बार को स्टाइल करने के लिए **Navigation** और हर पेज पर दिखने वाला फ़ुटर बनाने के लिए **Site Footer** उपयोग करें

:::tip
अपना रंग पैलेट सरल रखें -- एक प्राथमिक रंग और एक एक्सेंट रंग आमतौर पर पर्याप्त होता है। बाकी वेबसाइट बिल्डर संभाल लेगा।
:::

## चरण 3: सामग्री पेज जोड़ें {#step-3-add-content-pages}

वे पेज बनाएं जिनकी आपके आगंतुकों को सबसे अधिक ज़रूरत है।

[Managing Pages](../website/managing-pages.md) मार्गदर्शिका का पालन करके ऐसे पेज बनाएं जैसे:

- **About** — आपके चर्च की कहानी, विश्वास और नेतृत्व
- **Sermons** — अपनी [उपदेश लाइब्रेरी](../sermons/managing-sermons.md) से लिंक करें
- **Events** — आगामी इवेंट और पंजीकरण
- **Give** — ऑनलाइन giving पेज (इसके लिए [Stripe सेटअप](../donations/online-giving-setup.md) आवश्यक है)
- **Contact** — स्थान, सेवा समय और संपर्क जानकारी

## चरण 4: अपना डोमेन जोड़ें {#step-4-connect-your-domain}

यदि आप डिफ़ॉल्ट B1 URL के बजाय अपना डोमेन नाम (जैसे yourchurch.com) उपयोग करना चाहते हैं:

[Custom Domain](../settings/custom-domain.md) मार्गदर्शिका का पालन करके:

1. अपने डोमेन प्रदाता पर, `www` के लिए एक **CNAME** रिकॉर्ड जोड़ें जो `proxy.b1.church` की ओर इंगित करे (या अपने रूट डोमेन के लिए एक **A** रिकॉर्ड जो `3.23.251.61` की ओर इंगित करे)
2. Jump menu में **Settings > Settings** चुनें, **Domains** अनुभाग में **Edit** पर क्लिक करें, अपना डोमेन टाइप करें, और **Save** पर क्लिक करें

:::info
पहले DNS सेट करें: B1 डोमेन तुरंत सहेज लेता है, लेकिन जब तक DNS B1 की ओर इंगित नहीं करता तब तक वह आपकी साइट लोड नहीं करेगा (या उसका SSL प्रमाणपत्र नहीं लेगा)। DNS परिवर्तनों में कुछ मिनट से कुछ घंटे लग सकते हैं। डिफ़ॉल्ट B1 URL इस पूरे समय काम करता रहता है।
:::

## चरण 5: giving और फ़ॉर्म जोड़ें {#step-5-add-giving-and-forms}

अपनी साइट को इंटरैक्टिव तत्वों से बेहतर बनाएं:

- **Online Giving** — सदस्यों को आपकी वेबसाइट से सीधे दान करने देने के लिए एक **Donation** element जोड़ें। पहले Stripe कॉन्फ़िगर करने के लिए [Online Giving Setup](../donations/online-giving-setup.md) देखें।
- **Registration Forms** — **Form** element के साथ इवेंट साइन-अप, विज़िटर कार्ड, या स्वयंसेवक आवेदनों के लिए [Stand Alone फ़ॉर्म](../forms/creating-forms.md) एम्बेड करें। किसी भी पेज पर तत्व जोड़ने के तरीके के लिए [Page Editor](../website/page-editor.md) देखें।

## आप तैयार हैं! {#youre-done}

आपकी चर्च वेबसाइट लाइव है। URL अपनी मंडली और सोशल मीडिया पर साझा करें। आप B1 Admin के **Website** अनुभाग से कभी भी सामग्री अपडेट कर सकते हैं, नए पेज जोड़ सकते हैं, और रूप बदल सकते हैं।

## संबंधित लेख {#related-articles}

- [Website Initial Setup](../website/initial-setup.md) — विस्तृत सेटअप चरण
- [Managing Pages](../website/managing-pages.md) — पेज जोड़ें और संपादित करें
- [Appearance](../website/appearance.md) — रंग, लोगो और लेआउट
- [Page Editor](../website/page-editor.md) — सेक्शन, टेक्स्ट, छवियां, फ़ॉर्म और giving जोड़ें
- [Custom Domain](../settings/custom-domain.md) — अपना स्वयं का वेब पता उपयोग करें
- [Managing Files](../website/files.md) — छवियां और दस्तावेज़ अपलोड करें
- [Online Giving Setup](../donations/online-giving-setup.md) — Stripe कॉन्फ़िगर करें
- [Creating Forms](../forms/creating-forms.md) — पंजीकरण और सर्वेक्षण फ़ॉर्म बनाएं
