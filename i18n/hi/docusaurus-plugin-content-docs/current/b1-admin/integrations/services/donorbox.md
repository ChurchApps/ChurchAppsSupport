---
title: "Donorbox"
description: "Zapier के साथ Donorbox को B1 Admin से जोड़ें, ताकि ऑनलाइन donations अपने-आप donation records और donor person profiles बनाएँ, किसी मैन्युअल निर्यात की ज़रूरत के बिना।"
---

# Donorbox

<div class="article-intro">

अगर आपका चर्च Donorbox के माध्यम से donations लेता है पर लोगों और statements को B1 में ट्रैक करता है, तो आप Donorbox के तत्काल Zapier triggers से B1 के अंदर मेल खाते donation records बनवा सकते हैं — और अगर donor पहले से मौजूद नहीं है तो उसे B1 व्यक्ति के रूप में बना सकते हैं। कोई मैन्युअल मिलान नहीं, कोई मासिक निर्यात नहीं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- कम से कम एक campaign वाला [Donorbox](https://donorbox.org) account
- एक [Zapier](https://zapier.com) account
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या जोड़ सकते हैं {#what-you-can-wire-up}

| दिशा | Donorbox trigger | B1 action |
|---|---|---|
| Donorbox → B1 | नई या अपडेट की गई Donation (तत्काल) | Find Person → Add Donation |
| Donorbox → B1 | नया या अपडेट किया गया Donor | Create Person |
| Donorbox → B1 | नया या अपडेट किया गया Plan (आवर्ती) | Find Person → Add Donation (note के रूप में Plan id का उपयोग करें) |

Donorbox अपने triggers को **तत्काल** प्रकाशित करता है — वास्तविक donation के कुछ सेकंड के भीतर फ़ायर होते हैं। कोई polling में देरी नहीं।

## सेटअप {#setup}

### 1. B1 API key बनाएँ {#1-mint-a-b1-api-key}

B1Admin में: **Settings → Developer → API Keys → New API Key**। Scopes:

- `people:read` — email से donor खोजने के लिए
- `people:write` — अगर वे नए हैं तो उन्हें बनाने के लिए
- `donations:write` — उपहार दर्ज करने के लिए

- `settings:write` — जब आप key जोड़ते हैं तो Zapier हर B1 key को B1 की webhook सूची से मिलाता है, इसलिए इसके बिना connection विफल हो जाता है (भले ही यहाँ trigger B1 के बजाय Donorbox का हो)

### 2. "donation रिकॉर्ड करें" Zap बनाएँ {#2-build-the-record-a-donation-zap}

1. **Trigger** — Donorbox: New Donation। Donorbox की API key से जोड़ें (Donorbox में: *Account → Profile → API Settings*)।
2. **Action** — B1.church: Find Person। trigger से donor का email *Email* फ़ील्ड में map करें।
3. **Action** — B1.church: Add Donation। map करें:
   - Person → चरण 2 की id
   - Amount → trigger की donation राशि
   - Donation Date → trigger की donation तारीख
   - Fund → वह B1 fund चुनें जो Donorbox campaign को दर्शाता है (Zapier filter या formatter चरण के आधार पर fund बदलने देता है)
   - Method → "Online"
   - Notes → Donorbox transaction id (मिलान के समय उपयोगी)

Zap चालू करें। Donorbox के ज़रिए अगला लाइव donation अपने-आप **B1Admin → Donations** में आ जाएगा।

जब किसी का वह email नहीं होता तो B1 का *Find Person* "No person found" त्रुटि के साथ Zap रोक देता है, इसलिए Filter चरण उस पर शाखा नहीं बना सकता। पहली बार देने वालों को सँभालने के लिए, Find Person चरण के लिए Zapier की error handling चालू करें और उसके error path में B1.church: Create Person (first/last/email map करके) और फिर नए व्यक्ति की id के साथ Add Donation चलाएँ। या ऊपर की तालिका से *New Donor* → *Create Person* Zap चलाएँ ताकि उपहार आने से पहले donors B1 में मौजूद हों।

## सामान्य रेसिपी {#common-recipes}

### हर fund के लिए एक Zap {#one-zap-per-fund}

अगर आप कई Donorbox campaigns चलाते हैं जो अलग-अलग B1 funds से मेल खाते हैं, तो सबसे साफ़ व्यवस्था है हर campaign के लिए एक Zap, जिसके शीर्ष पर Donorbox *campaign* filter हो — इससे fund mapping पहले से तय रहती है और lookup चरण छूट जाता है।

### अपडेट की गई donations को सुधार मानें {#treat-updated-donations-as-corrections}

Donorbox का *New or Updated Donation* संपादन पर भी फ़ायर होता है। `event_type` पर Zapier *Path* चरण से शाखा बनाएँ: "new" → Add Donation, "updated" → Find Donation + Update (ध्यान दें: B1 के Zapier ऐप में अभी Update Donation action नहीं है — फ़िलहाल "updated" events को मैन्युअल समीक्षा के लिए Slack channel पर लॉग करें)।

### आवर्ती plan बदलावों को Slack channel पर सिंक करें {#sync-recurring-plan-changes-to-a-slack-channel}

- **Trigger** — Donorbox: New or Updated Plan
- **Action** — Slack: `#donations` पर Send Message (जैसे "Plan changed — Sarah's monthly gift is now $200")

## सीमाएँ और नोट्स {#limits--notes}

- **Email से donors का मिलान करें।** Donorbox B1 की person id साझा नहीं करता; केवल email ही स्थायी जोड़ने वाली कुंजी है। जो donors किसी अलग email से देते हैं वे एक नया B1 व्यक्ति बनाएँगे — आपके मासिक मिलान में इन्हें खोजना चाहिए।
- **Refunds अलग से उजागर नहीं होते** — Donorbox उसी donation पर status अपडेट भेजता है। B1 के Zapier ऐप में फ़िलहाल *Update Donation* action नहीं है; आज का सुरक्षित तरीका है refund events को बाहर से लॉग करना और donation को हाथ से समायोजित करना।
- **पहले Donorbox के sandbox में परीक्षण करें** ताकि उत्पादन B1 में नकली उपहार न बनें। Donorbox live से अलग test mode credentials देता है।

## समस्या निवारण {#troubleshooting}

- **"No person found" त्रुटियाँ** — donor अभी B1 में नहीं है (या किसी अलग email से दिया)। ऊपर बताया गया error path जोड़ें, और जाँचें कि API key में `people:write` है ताकि *Create Person* चल सके।
- **Donation राशि 100× बड़ी या छोटी दिखती है** — Donorbox कुछ payload रूपों में cents और कुछ में dollars भेजता है। ज़रूरत हो तो *Formatter by Zapier — Numbers* चरण से 100 से भाग दें।
- **एक ही उपहार से डुप्लिकेट donations** — Donorbox *New Donation* और *Updated Donation* दोनों फ़ायर करता है। या तो `event_type = "donation.succeeded"` पर filter करें या गैर-overlapping filters वाले दो Zaps बनाएँ।

## यह भी देखें {#see-also}

- [Zapier (overview)](../zapier.md) — हर Zapier रेसिपी का B1 हिस्सा
- [Subsplash](./subsplash.md) — Zapier ऐप वाला एक और donation platform
- [Mailchimp](./mailchimp.md) — "नया उपहार" को email tag से जोड़ें
