---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

यदि आपका चर्च Donorbox के माध्यम से दान लेता है लेकिन B1 में लोगों और statements को track करता है, तो आप Donorbox के instant Zapier triggers को B1 के अंदर matching donation records बनाने दे सकते हैं — और यदि वे पहले से exist नहीं करते तो donor को एक B1 person के रूप में बनाएं। कोई manual reconciliation नहीं, कोई monthly export नहीं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- कम से कम एक campaign के साथ एक [Donorbox](https://donorbox.org) खाता
- एक [Zapier](https://zapier.com) खाता
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या Wire Up कर सकते हैं

| Direction | Donorbox trigger | B1 action |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (instant) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (recurring) | Find Person → Add Donation (use Plan id as note) |

Donorbox अपने triggers को **instant** के रूप में publish करता है — वे एक real donation के seconds के अंदर fire करते हैं। कोई polling delay नहीं।

## सेटअप

### 1. एक B1 API कुंजी Mint करें

B1Admin में: **Settings → Developer → API Keys → New API Key**। Scopes:

- `people:read` — email द्वारा donor को lookup करने के लिए
- `people:write` — यदि वे नए हैं तो उन्हें create करने के लिए
- `donations:write` — gift को record करने के लिए

इस direction में Triggers Donorbox के हैं, B1 के नहीं, इसलिए आपको यहां `settings:write` की जरूरत नहीं है।

### 2. "record a donation" Zap बनाएं

1. **Trigger** — Donorbox: New Donation। Donorbox के API कुंजी से connect करें (Donorbox में: *Account → Profile → API Settings*)।
2. **Action** — B1.church: Find Person। donor के email को trigger से *Email* search field में map करें।
3. **Action** — Filter by Zapier (optional): केवल continue यदि donor नहीं मिला, फिर…
4. **Action** — B1.church: Create Person। first/last/email को map करें ताकि donor एक member के रूप में land हो, केवल एक gift record के रूप में नहीं।
5. **Action** — B1.church: Add Donation। Map:
   - Amount → `data.amount`
   - Donation Date → trigger का donation date
   - Fund → B1 fund जो Donorbox campaign को mirror करता है (Zapier आपको एक filter या formatter step के आधार पर funds को switch करने देता है)
   - Method → "Online"
   - Notes → Donorbox transaction id (handy जब reconciling करते हैं)

Zap को चालू करें। अगला Donorbox के माध्यम से live donation **B1Admin → Donations** में automatically land करता है।

## सामान्य Recipes

### One Zap per fund

यदि आप कई Donorbox campaigns चलाते हैं जो अलग B1 funds में map करते हैं, तो cleanest layout एक Zap per campaign है जिसमें Donorbox *campaign* filter की top पर हो — इस तरह fund mapping hard-coded है और आप lookup step को skip करते हैं।

### Treat updated donations as corrections

Donorbox का *New or Updated Donation* edits पर भी fires। एक Zapier *Path* step को `event_type` पर use करें fork के लिए: "new" → Add Donation, "updated" → Find Donation + Update (note: B1 का Zapier app वर्तमान में एक Update Donation action नहीं है — अभी के लिए, "updated" events को एक Slack channel में manual review के लिए log करें)।

### Sync recurring plan changes to a Slack channel

- **Trigger** — Donorbox: New or Updated Plan
- **Action** — Slack: Send Message to `#donations` (उदाहरण के लिए "Plan changed — Sarah's monthly gift is now $200")

## Limits & Notes

- **Match donors by email.** Donorbox B1 के person id को share नहीं करता; एकमात्र durable join key email है। जो donors एक अलग email के तहत देते हैं वह एक नया B1 person बनाएंगे — आपकी monthly reconciliation को इन्हें देखना चाहिए।
- **Refunds अलग से expose नहीं होते** — Donorbox same donation पर एक status update emit करता है। B1 का Zapier app वर्तमान में एक *Update Donation* action नहीं है; safe pattern आज refund events को out-of-band में log करना और donation को manually adjust करना है।
- **Production B1 में fake gifts को बनाने से बचने के लिए Donorbox के sandbox में पहले test करें।** Donorbox live से अलग test mode credentials प्रदान करता है।

## समस्या निवारण

- **"Person not found" warning हर run** — यह fine है यदि आपने steps को order किया है ताकि एक *Create Person* not-found branch में चले। यदि Create Person step कभी नहीं चलता, तो double-check करें कि API कुंजी के पास `people:write` है।
- **Donation amount 100× बहुत बड़ा या छोटा दिख रहा है** — Donorbox कुछ payload variants में cents भेजता है और दूसरों में dollars। यदि जरूरत हो तो एक *Formatter by Zapier — Numbers* step का उपयोग करके 100 से divide करें।
- **Duplicate donations से एक single gift** — Donorbox दोनों *New Donation* और *Updated Donation* को fire करता है। या तो `event_type = "donation.succeeded"` को filter करें या non-overlapping filters के साथ दो Zaps बनाएं।

## यह भी देखें

- [Zapier (overview)](../zapier) — हर Zapier recipe का B1 side
- [Subsplash](./subsplash) — एक और donation platform एक Zapier app के साथ
- [Mailchimp](./mailchimp) — "new gift" को एक email tag में chain करें
