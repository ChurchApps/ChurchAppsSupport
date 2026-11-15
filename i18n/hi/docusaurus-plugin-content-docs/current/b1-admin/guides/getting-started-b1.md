---
title: "मार्गदर्शिका: B1 के साथ अपने चर्च की शुरुआत करें"
description: "B1 Admin में एक नया चर्च सेट करने की प्रक्रिया: अपना खाता बनाएं, सेटिंग कॉन्फ़िगर करें, भूमिकाएं जोड़ें, सदस्य आयात करें, और मुख्य सुविधाएं शुरू करें।"
---

# B1 के साथ अपने चर्च की शुरुआत करें

<div class="article-intro">

नए चर्चों के लिए एक पूर्ण ऑनबोर्डिंग मार्गदर्शिका -- अपना खाता बनाने से लेकर अपनी सदस्य निर्देशिका आयात करने और अपनी पहली सुविधाएं कॉन्फ़िगर करने तक। B1 पर अपने चर्च को चालू करने के लिए इन चरणों को क्रम से पूरा करें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक वैध ईमेल पता
- आपका चर्च लोगो और ब्रांडिंग सामग्री (रंग, छवियां) -- शुरू करने के लिए अनुशंसित, पर आवश्यक नहीं

</div>

## चरण 1: अपना खाता बनाएं {#step-1-create-your-account}

अपने चर्च को पंजीकृत करें और पहले प्रशासक बनें।

[Create Account](../../getting-started/create-account.md) मार्गदर्शिका का पालन करके:

1. b1.church पर जाएं और अपने ईमेल से पंजीकरण करें
2. अपना ईमेल पता सत्यापित करें
3. "Create a new church" चुनें और अपने चर्च का नाम दर्ज करें
4. आप स्वतः Domain Admin बन जाते हैं, जिसके पास हर चीज़ तक पूरी पहुंच होती है

## चरण 2: चर्च सेटिंग कॉन्फ़िगर करें {#step-2-configure-church-settings}

अपने चर्च की बुनियादी जानकारी और ब्रांडिंग दर्ज करें।

[Church Settings](../settings/church-settings.md) मार्गदर्शिका का पालन करके:

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) में **Settings > Settings** चुनें और **Church Information** अनुभाग में **Edit** पर क्लिक करें
2. अपने चर्च का नाम और पता दर्ज करें, और अपना **Subdomain** सेट करें (यह yourchurch.b1.church बन जाता है)
3. **Website > Appearance** के अंतर्गत अपना चर्च लोगो अपलोड करें और अपने रंग चुनें (देखें [Logo and Branding](../website/appearance.md#logo-and-branding)), और **Mobile > App Theme** के अंतर्गत B1 ऐप के रंग सेट करें

:::tip
आपका सबडोमेन आपके वेबसाइट URL और giving पेज URL में दिखता है, इसलिए कुछ छोटा और पहचानने योग्य चुनें (जैसे, Grace Community Church के लिए "grace")।
:::

## चरण 3: भूमिकाएं सेट करें और अपनी टीम को आमंत्रित करें {#step-3-set-up-roles--invite-your-team}

नियंत्रित करें कि किसकी किस चीज़ तक पहुंच है, और अपनी टीम को शामिल करें।

[Roles & Permissions](../settings/roles-permissions.md) मार्गदर्शिका का पालन करके:

1. Jump menu में **Settings > Roles** चुनें और अपनी टीम के लिए भूमिकाएं बनाएं (जैसे, "Pastor", "Office Admin", "Finance Team", "Worship Leader")
2. हर भूमिका को विशिष्ट अनुमतियां दें ताकि लोग केवल वही देखें जो उन्हें चाहिए
3. किसी भूमिका के **Members** पैनल में **Add** पर क्लिक करके टीम के सदस्यों को आमंत्रित करें -- B1 उन्हें आमंत्रण ईमेल भेजने की पेशकश करता है (जो व्यक्ति अभी आपके चर्च में नहीं है उसके लिए **Create New User** उपयोग करें)

:::info
आपको सब कुछ अकेले नहीं करना है। अपने कार्यालय स्टाफ़, पास्टरों और सेवकाई लीडरों को जल्दी आमंत्रित करें ताकि वे अपने क्षेत्र सेट करने में मदद कर सकें।
:::

## चरण 4: अपने लोगों को आयात करें {#step-4-import-your-people}

अपनी मौजूदा सदस्य निर्देशिका को B1 में लाएं।

[Importing Data](../people/importing-data.md) मार्गदर्शिका का पालन करें। **Settings** में, B1 Transfer उपकरण खोलने के लिए **Import/Export** पर क्लिक करें, फिर अपना स्रोत चुनें:

1. **Custom CSV / Excel** — अपने वर्तमान सिस्टम या स्प्रेडशीट से निर्यात करें, अपलोड करें, और अपने कॉलम को B1 फ़ील्ड से मैप करें
2. **किसी अन्य सिस्टम से माइग्रेट करना** — **Breeze**, **Planning Center**, **Tithe.ly**, या **CCB / Pushpay** से निर्यात अपलोड करें

:::tip
Breeze से माइग्रेट कर रहे हैं? अपनी **People**, **Tags**, और **Contributions** फ़ाइलें निर्यात करें, उन्हें एक zip में मिलाएं, और zip को **Breeze Import Zip** के रूप में अपलोड करें -- आपके लोग, समूह और दान रिकॉर्ड एक ही चरण में आ जाते हैं।
:::

## चरण 5: मोबाइल ऐप कॉन्फ़िगर करें {#step-5-configure-the-mobile-app}

अपनी मंडली के लिए B1 ऐप के अनुभव को अनुकूलित करें।

[Mobile App Settings](../settings/mobile-app.md) मार्गदर्शिका का पालन करके:

1. Jump menu में **Mobile > Navigation** चुनें और **Add Tab** पर क्लिक करें ताकि चुन सकें कि आपके सदस्यों के लिए B1 ऐप में कौन से टैब दिखें
2. हर टैब का नाम, आइकन, और **Tab Type** सेट करें (Bible, Live Stream, Sermons, Donation, External URL, Internal Page, आदि)
3. हर टैब की **Visibility** का उपयोग करके नियंत्रित करें कि उसे कौन देखता है

## चरण 6: सुविधाएं सेट करना शुरू करें {#step-6-start-setting-up-features}

अब जब आपकी नींव तैयार है, तो विशिष्ट सुविधाएं सेट करने के लिए ये मार्गदर्शिकाएं देखें:

- [Set Up Online Giving](./online-giving.md) — अपनी वेबसाइट और ऐप के माध्यम से दान स्वीकार करें
- [Launch Your Church Website](./launch-website.md) — अपनी चर्च वेबसाइट बनाएं
- [Run Small Groups](./small-groups.md) — समूह, बाइबल अध्ययन और सेवकाईं व्यवस्थित करें
- [Set Up Children's Check-In](./childrens-checkin.md) — बच्चों की सेवकाई के लिए कियोस्क चेक-इन
- [Manage Sunday Volunteers](./sunday-volunteers.md) — अपनी सेवा टीमों का समन्वय करें
- [Build Your Sermon Library](./sermon-library.md) — उपदेश ऑनलाइन लाएं और लाइव स्ट्रीमिंग सेट करें
- [Track Attendance](./track-attendance.md) — देखें कि सेवाओं और समूहों में कौन आ रहा है

## आप तैयार हैं! {#youre-done}

आपका चर्च B1 पर सेट हो गया है। आपकी टीम के पास पहुंच है, आपके लोग आयात हो चुके हैं, और आप उन सुविधाओं का उपयोग शुरू करने के लिए तैयार हैं जो आपकी सेवकाई के लिए सबसे अधिक मायने रखती हैं। हर क्षेत्र सेट करने के लिए ऊपर की सुविधा मार्गदर्शिकाएं देखें।

## संबंधित लेख {#related-articles}

- [Create Account](../../getting-started/create-account.md) — खाता पंजीकरण
- [Initial Setup](../../getting-started/initial-setup.md) — निर्देशित ऑनबोर्डिंग का अवलोकन
- [Church Settings](../settings/church-settings.md) — चर्च की जानकारी और ब्रांडिंग
- [Roles & Permissions](../settings/roles-permissions.md) — टीम पहुंच नियंत्रण
- [Importing Data](../people/importing-data.md) — बल्क डेटा आयात
- [Mobile App Settings](../settings/mobile-app.md) — सदस्य ऐप को अनुकूलित करें
