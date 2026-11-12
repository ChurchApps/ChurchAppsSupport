---
title: "Subsplash"
description: "Zapier के साथ Subsplash donations, नए लोगों और form responses को B1 से जोड़ें, ताकि उपहार और profiles अपने-आप B1 Admin में पहुँचें।"
---

# Subsplash

<div class="article-intro">

अगर आप अपने चर्च ऐप, giving, या forms के लिए Subsplash का उपयोग करते हैं, पर लोगों और donations के लिए B1 को system of record बनाना चाहते हैं, तो Subsplash का Zapier ऐप donations, नए profiles, और form responses को वास्तविक समय में B1 में भेज सकता है। ध्यान दें कि Subsplash का Zapier ऐप फ़िलहाल **केवल triggers** देता है — वायरिंग एक-तरफ़ा है (Subsplash → B1)।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- ऐसे plan पर Subsplash account जिसमें **API + Zapier** पहुँच शामिल हो (अपने Subsplash Client Success Manager से जाँचें — ये plan स्तर पर सीमित होते हैं)
- एक [Zapier](https://zapier.com) account
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या वायर कर सकते हैं {#what-you-can-wire-up}

नीचे के सभी triggers Subsplash के हैं। actions B1 के हैं।

| Subsplash trigger | B1 action |
|---|---|
| New Donation | Find Person → Add Donation (अगर न हो तो Create Person) |
| New Pledge | Add Donation (`notes` = "Pledge: …" के साथ) |
| New Person Created | Create Person |
| Person Updated Profile | (कोई सीधा B1 action नहीं — मैन्युअल समीक्षा के लिए Google Sheet में लॉग करें) |
| New Form Response | Create Person + (वैकल्पिक) form के आधार पर Add Group Member |

Subsplash → B1 ही वह एकमात्र दिशा है जिसे Subsplash का ऐप अभी समर्थन करता है।

## सेटअप {#setup}

### 1. B1 API key बनाएँ {#1-mint-a-b1-api-key}

B1Admin में: **Settings → Developer → API Keys → New API Key**। Scopes:

- `people:read` — email से donor खोजने के लिए
- `people:write` — अगर वे मौजूद नहीं हैं तो उन्हें बनाने के लिए
- `donations:write` — उपहार दर्ज करने के लिए
- `settings:write` — जब आप key जोड़ते हैं तो Zapier हर B1 key को B1 की webhook सूची से मिलाता है, इसलिए इसके बिना connection विफल हो जाता है (भले ही यहाँ trigger B1 के बजाय Subsplash का हो)

### 2. Subsplash को Zapier से जोड़ें {#2-connect-subsplash-to-zapier}

[Subsplash की Zapier integration गाइड](https://support.subsplash.com/en/articles/9825926-zapier-integration) का पालन करें। वे Subsplash Dashboard के भीतर से एक API token जारी करते हैं, जिसका उपयोग Zapier trigger पक्ष को प्रमाणित करने के लिए करता है।

### 3. "donation रिकॉर्ड करें" Zap बनाएँ {#3-build-the-record-a-donation-zap}

1. **Trigger** — Subsplash: New Donation
2. **Action** — B1.church: Find Person (email से)
3. **Action** — B1.church: Add Donation, चरण 2 के व्यक्ति की id का उपयोग करके। राशि, तारीख, fund, method = "Online", notes = Subsplash transaction id map करें।

जब कोई मेल नहीं खाता तो B1 का *Find Person* "No person found" त्रुटि के साथ Zap रोक देता है, इसलिए Filter या Path चरण उस पर शाखा नहीं बना सकता। पहली बार देने वाले donors को सँभालने के लिए, Find Person चरण के लिए Zapier की error handling चालू करें और उसके error path में B1.church: Create Person → B1.church: Add Donation (नए बने व्यक्ति की id का उपयोग करके) चलाएँ।

Zap चालू करें। आगे के Subsplash donations सेकंडों में **B1Admin → Donations** में आएँगे।

## सामान्य रेसिपी {#common-recipes}

### पहली बार उपहार आने पर धन्यवाद भेजें {#send-a-thank-you-when-a-first-time-gift-lands}

- **Trigger** — Subsplash: New Donation
- **Action** — Zapier द्वारा Filter: केवल तभी आगे बढ़ें जब यह donor का पहला उपहार हो (Donor Email पर पिछले givers की Google Sheet के विरुद्ध *Lookup Table* का उपयोग करें, या donor के बनने की तारीख पर Zapier *Paths* चरण)
- **Action** — Mailchimp / SMTP / SendGrid: पहले उपहार का धन्यवाद संदेश भेजें
- **Action** — B1.church: Add Donation (हमेशा की तरह)

### आवर्ती giving से pledges को अलग रखें {#filter-pledges-off-the-regular-giving-flow}

- **Trigger** — Subsplash: New Pledge
- **Action** — B1.church: Add Donation, `notes = "Pledge — Subsplash"` और `Pledges` नाम के fund के साथ (आपके operating fund से अलग), ताकि आप **B1Admin → Donations → Summary** में pledges की अलग रिपोर्ट बना सकें।

### नए ऐप उपयोगकर्ताओं को B1 लोगों के रूप में सिंक करें {#sync-new-app-users-as-b1-people}

- **Trigger** — Subsplash: New Person Created
- **Action** — B1.church: Create Person, नाम, email, फ़ोन भरें। नए व्यक्ति को "Subsplash App Users" जैसे group में जोड़कर B1 में tag करें।

## सीमाएँ और नोट्स {#limits--notes}

- **Subsplash का Zapier ऐप केवल triggers वाला है।** अगर आप B1 की ओर के बदलाव चाहते हैं (जैसे B1 में नया व्यक्ति Subsplash में भी जाए), तो आपको B1 के Zapier ऐप triggers से एक ब्रिज बनाना होगा जो एक कस्टम *Webhooks by Zapier — POST* action के माध्यम से Subsplash के REST API को call करे। वह एक कस्टम integration है, रेसिपी नहीं।
- **API पहुँच plan पर निर्भर है।** अगर Zapier connection `403 Forbidden` के साथ विफल होता है, तो आपके Subsplash plan में शायद API पहुँच शामिल नहीं है — अपने Client Success Manager से संपर्क करें।
- **Fund mapping मैन्युअल है।** Subsplash एक campaign या category नाम देता है; B1 को अपने ही funds में से एक चाहिए। या तो Add Donation चरण के **Fund** dropdown से fund चुनें, या Subsplash campaigns को B1 funds से मैप करने वाली Zapier *Lookup Table* रखें।

## समस्या निवारण {#troubleshooting}

- **donation के बाद कोई trigger फ़ायर नहीं होता** — Subsplash के Zapier dashboard में जाँचें कि connection अभी भी *Connected* दिखा रहा है। अगर Subsplash की ओर API token बदला गया है, तो Zap चुपचाप रुक जाता है; फिर से जोड़ें।
- **B1 *Add Donation* उपहार बिना fund के दर्ज करता है** — **Fund** फ़ील्ड खाली था या ऐसे मान से मैप हुआ जो B1 fund id नहीं है। चरण के **Fund** dropdown से fund चुनें (यह B1Admin में **Donations > Funds** के अंतर्गत के funds दिखाता है), या ऐसी Lookup Table मैप करें जो B1 fund ids देती है।
- **पहला उपहार दो बार trigger होता है** — अगर Zapier का ack छूट गया तो Subsplash कभी-कभी trigger फिर से भेजता है। डुप्लिकेट हटाने के लिए donation id (जो Subsplash payload में भेजता है) पर *Filter by Zapier* जोड़ें।

## यह भी देखें {#see-also}

- [Donorbox](./donorbox.md) — वही रेसिपी रूप, अलग donation platform
- [Zapier (overview)](../zapier.md) — हर Zapier रेसिपी का B1 हिस्सा
- [Subsplash Zapier integration guide](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplash के दस्तावेज़)
