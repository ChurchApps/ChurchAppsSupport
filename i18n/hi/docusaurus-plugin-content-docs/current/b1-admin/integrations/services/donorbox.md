---
title: "Donorbox"
description: "Zapier के साथ Donorbox को B1 Admin से जोड़ें, ताकि ऑनलाइन दान अपने-आप दान रिकॉर्ड और दानदाता प्रोफ़ाइल बनाएँ, मैन्युअल निर्यात की ज़रूरत नहीं।"
---

# Donorbox

<div class="article-intro">

यदि आपका चर्च Donorbox के माध्यम से दान लेता है लेकिन लोगों और विवरणों का हिसाब B1 में रखता है, तो आप Donorbox के तत्काल Zapier ट्रिगर्स से B1 के अंदर मिलते-जुलते दान रिकॉर्ड बनवा सकते हैं, और यदि दाता पहले से मौजूद नहीं है तो उसे B1 व्यक्ति के रूप में भी बना सकते हैं। न कोई मैनुअल मिलान, न हर महीने का एक्सपोर्ट।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- कम से कम एक अभियान (campaign) वाला [Donorbox](https://donorbox.org) खाता
- एक [Zapier](https://zapier.com) खाता
- **Edit Settings** अनुमति वाला एक B1Admin उपयोगकर्ता

</div>

## आप क्या जोड़ सकते हैं

| दिशा | Donorbox ट्रिगर | B1 क्रिया |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (तत्काल) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (आवर्ती) | Find Person → Add Donation (नोट के रूप में Plan id का उपयोग करें) |

Donorbox अपने ट्रिगर्स को **तत्काल** के रूप में प्रकाशित करता है, यानी असली दान के कुछ ही सेकंड के भीतर ये चल जाते हैं। कोई पोलिंग में देरी नहीं होती।

## सेटअप

### 1. B1 API key बनाएँ

B1Admin में: **Settings → Developer → API Keys → New API Key**। Scopes:

- `people:read` — ईमेल से दाता को खोजने के लिए
- `people:write` — यदि दाता नया है तो उसे बनाने के लिए
- `donations:write` — उपहार दर्ज करने के लिए

इस दिशा के ट्रिगर Donorbox के हैं, B1 के नहीं, इसलिए यहाँ `settings:write` की आवश्यकता नहीं है।

### 2. "दान दर्ज करें" Zap बनाएँ

1. **Trigger** — Donorbox: New Donation। Donorbox की API key से कनेक्ट करें (Donorbox में: *Account → Profile → API Settings*)।
2. **Action** — B1.church: Find Person। ट्रिगर से दाता का ईमेल *Email* खोज फ़ील्ड में मैप करें।
3. **Action** — Filter by Zapier (वैकल्पिक): केवल तभी आगे बढ़ें जब दाता न मिला हो, फिर…
4. **Action** — B1.church: Create Person। first/last/email मैप करें ताकि दाता केवल दान रिकॉर्ड नहीं, बल्कि एक सदस्य के रूप में जुड़े।
5. **Action** — B1.church: Add Donation। मैप करें:
   - Amount → `data.amount`
   - Donation Date → ट्रिगर की दान तिथि
   - Fund → वह B1 fund चुनें जो Donorbox अभियान से मेल खाता हो (Zapier फ़िल्टर या Formatter स्टेप के आधार पर fund बदलने देता है)
   - Method → "Online"
   - Notes → Donorbox transaction id (मिलान के समय उपयोगी)

Zap चालू करें। Donorbox के माध्यम से अगला लाइव दान अपने आप **B1Admin → Donations** में आ जाएगा।

## सामान्य नुस्खे

### हर fund के लिए एक Zap

यदि आप कई Donorbox अभियान चलाते हैं जो अलग-अलग B1 funds से मेल खाते हैं, तो सबसे साफ़ व्यवस्था यह है कि हर अभियान के लिए एक Zap हो, जिसके शुरू में Donorbox *campaign* फ़िल्टर लगा हो। इससे fund मैपिंग स्थिर रहती है और lookup स्टेप छूट जाता है।

### अपडेट किए गए दानों को सुधार मानें

Donorbox का *New or Updated Donation* संपादनों पर भी चलता है। `event_type` पर Zapier *Path* स्टेप का उपयोग करके शाखाएँ बनाएँ: "new" → Add Donation, "updated" → Find Donation + Update (ध्यान दें: B1 के Zapier ऐप में अभी Update Donation क्रिया नहीं है, इसलिए फ़िलहाल "updated" घटनाओं को मैनुअल समीक्षा के लिए Slack चैनल में लॉग करें)।

### आवर्ती योजना के बदलावों को Slack चैनल में भेजें

- **Trigger** — Donorbox: New or Updated Plan
- **Action** — Slack: Send Message to `#donations` (जैसे "Plan changed — Sarah's monthly gift is now $200")

## सीमाएँ और नोट्स

- **ईमेल से दाताओं का मिलान करें।** Donorbox B1 का person id साझा नहीं करता; केवल ईमेल ही स्थायी जोड़ने वाली कुंजी है। जो दाता किसी अलग ईमेल से दान देते हैं, उनके लिए B1 में नया person बनेगा, और आपके मासिक मिलान में इन्हें खोजना चाहिए।
- **रिफ़ंड अलग से नहीं दिखाए जाते** — Donorbox उसी दान पर स्थिति अपडेट भेजता है। B1 के Zapier ऐप में अभी *Update Donation* क्रिया नहीं है; आज का सुरक्षित तरीका यह है कि रिफ़ंड की घटनाओं को बाहर से लॉग करें और दान को मैनुअली समायोजित करें।
- **पहले Donorbox के sandbox में परीक्षण करें** ताकि उत्पादन B1 में नकली उपहार न बनें। Donorbox लाइव क्रेडेंशियल से अलग test mode के क्रेडेंशियल देता है।

## समस्या निवारण

- **हर बार "Person not found" चेतावनी** — यह ठीक है, यदि आपने स्टेप्स इस तरह क्रम में रखे हैं कि *Create Person* not-found शाखा में चले। यदि Create Person स्टेप कभी नहीं चलता, तो दोबारा जाँचें कि API key में `people:write` है।
- **दान की राशि 100 गुना बड़ी या छोटी दिखती है** — Donorbox कुछ payload रूपों में सेंट और कुछ में डॉलर भेजता है। ज़रूरत हो तो *Formatter by Zapier — Numbers* स्टेप से 100 से भाग दें।
- **एक ही उपहार से डुप्लिकेट दान** — Donorbox *New Donation* और *Updated Donation* दोनों चलाता है। या तो फ़िल्टर लगाएँ `event_type = "donation.succeeded"` पर, या दो Zap बनाएँ जिनके फ़िल्टर आपस में न टकराएँ।

## इन्हें भी देखें

- [Zapier (अवलोकन)](../zapier.md) — हर Zapier नुस्खे का B1 पक्ष
- [Subsplash](./subsplash.md) — Zapier ऐप वाला एक और दान प्लेटफ़ॉर्म
- [Mailchimp](./mailchimp.md) — "नए उपहार" को ईमेल टैग से जोड़ें
