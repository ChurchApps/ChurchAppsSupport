---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

अगर आप अपने चर्च ऐप, giving, या forms के लिए Subsplash इस्तेमाल करते हैं, लेकिन लोगों और donations के लिए B1 को मुख्य रिकॉर्ड मानना चाहते हैं, तो Subsplash का Zapier ऐप donations, नई profiles और form responses को रियल टाइम में B1 में भेज सकता है। ध्यान दें कि Subsplash का Zapier ऐप फ़िलहाल **केवल triggers** देता है — यह कनेक्शन एक-तरफ़ा है (Subsplash → B1)।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक Subsplash खाता जिसके प्लान में **API + Zapier** एक्सेस शामिल हो (अपने Subsplash Client Success Manager से जाँचें — ये प्लान स्तर पर सीमित होते हैं)
- एक [Zapier](https://zapier.com) खाता
- एक B1Admin उपयोगकर्ता जिसके पास **Edit Settings** अनुमति हो

</div>

## आप क्या जोड़ सकते हैं

नीचे के सभी triggers Subsplash के हैं। actions B1 के हैं।

| Subsplash trigger | B1 action |
|---|---|
| New Donation | Find Person → Add Donation (अगर व्यक्ति नहीं है तो Create Person) |
| New Pledge | Add Donation (`notes` = "Pledge: …" के साथ) |
| New Person Created | Create Person |
| Person Updated Profile | (कोई सीधा B1 action नहीं — मैन्युअल समीक्षा के लिए Google Sheet में लॉग करें) |
| New Form Response | Create Person + (वैकल्पिक) फ़ॉर्म के आधार पर Add Group Member |

Subsplash की ओर से अभी केवल Subsplash → B1 दिशा समर्थित है।

## सेटअप

### 1. B1 API key बनाएँ

B1Admin में: **Settings → Developer → API Keys → New API Key**। Scopes:

- `people:read` — ईमेल से donor को खोजने के लिए
- `people:write` — अगर donor मौजूद नहीं है तो उसे बनाने के लिए
- `donations:write` — gift दर्ज करने के लिए
- (`settings:write` की ज़रूरत नहीं — यहाँ trigger Subsplash का है, B1 का नहीं।)

### 2. Subsplash को Zapier से जोड़ें

[Subsplash की Zapier integration गाइड](https://support.subsplash.com/en/articles/9825926-zapier-integration) का पालन करें। वे Subsplash Dashboard के अंदर से एक API token जारी करते हैं, जिसका उपयोग Zapier trigger की तरफ़ से प्रमाणीकरण के लिए करता है।

### 3. "gift दर्ज करें" वाला Zap बनाएँ

1. **Trigger** — Subsplash: New Donation
2. **Action** — B1.church: Find Person (ईमेल से)
3. **Filter / Path** — "person found" के आधार पर शाखा बनाएँ:
   - **मिला:** B1.church: Add Donation। amount, date, fund, method = "Online", और notes = Subsplash transaction id मैप करें।
   - **नहीं मिला:** B1.church: Create Person → B1.church: Add Donation (नए बनाए गए व्यक्ति के id के साथ)।

Zap चालू करें। आगे के Subsplash donations कुछ ही सेकंड में **B1Admin → Donations** में आने लगेंगे।

## सामान्य रेसिपी

### पहली बार दी गई gift पर धन्यवाद संदेश भेजें

- **Trigger** — Subsplash: New Donation
- **Action** — Zapier द्वारा Filter: केवल तभी आगे बढ़ें जब यह donor की पहली gift हो (Donor Email पर पिछले givers की Google Sheet के विरुद्ध *Lookup Table* का उपयोग करें, या donor के बनाए जाने की तारीख पर Zapier *Paths* step का उपयोग करें)
- **Action** — Mailchimp / SMTP / SendGrid: पहली gift का धन्यवाद संदेश भेजें
- **Action** — B1.church: Add Donation (सामान्य रूप से)

### नियमित giving से pledges अलग करें

- **Trigger** — Subsplash: New Pledge
- **Action** — B1.church: Add Donation, `notes = "Pledge — Subsplash"` और `Pledges` नाम के fund के साथ (अपने operating fund से अलग), ताकि आप **B1Admin → Donations → Summary** में pledges की रिपोर्ट अलग से निकाल सकें।

### नए ऐप उपयोगकर्ताओं को B1 लोगों के रूप में सिंक करें

- **Trigger** — Subsplash: New Person Created
- **Action** — B1.church: Create Person, जिसमें नाम, ईमेल, फ़ोन भरे जाएँ। नए व्यक्ति को "Subsplash App Users" जैसे ग्रुप में जोड़कर B1 में टैग करें।

## सीमाएँ और ध्यान देने योग्य बातें

- **Subsplash का Zapier ऐप केवल triggers देता है।** अगर आप चाहते हैं कि B1 की ओर से हुए बदलाव (जैसे B1 में नया व्यक्ति) Subsplash में भी दिखें, तो आपको B1 Zapier ऐप के triggers से Subsplash के REST API को *Webhooks by Zapier — POST* action के ज़रिए कॉल करने वाला पुल बनाना होगा। यह एक कस्टम integration है, कोई सीधी रेसिपी नहीं।
- **API पहुँच प्लान-सीमित है।** अगर Zapier कनेक्शन `403 Forbidden` दिखाए, तो आपके Subsplash प्लान में API पहुँच शामिल नहीं हो सकती — अपने Client Success Manager से संपर्क करें।
- **Fund मैपिंग मैन्युअल है।** Subsplash campaign या category का नाम भेजता है; B1 को एक संख्यात्मक fund id चाहिए। या तो Zap में fund को हार्ड-कोड करें, या Subsplash campaigns को B1 funds से मैप करने वाली Zapier *Lookup Table* रखें।

## समस्या निवारण

- **donation के बाद कोई trigger नहीं चलता** — Subsplash के Zapier dashboard में जाँचें कि कनेक्शन अभी भी *Connected* दिखा रहा है। अगर Subsplash की ओर से API token बदला गया है, तो Zap चुपचाप रुक जाता है; फिर से कनेक्ट करें।
- **B1 *Add Donation* 422 के साथ विफल** — अधिकतर कारण गायब या अपरिचित `fundId` होता है। **B1Admin → Donations → Funds** में अपने funds की सूची देखें और सटीक id को Zap step में कॉपी करें।
- **पहली gift दो बार trigger होती है** — Subsplash कभी-कभी trigger को दोबारा भेज देता है, अगर Zapier उसकी acknowledgment चूक जाए। डुप्लिकेट हटाने के लिए donation id (जो Subsplash payload में भेजता है) पर *Filter by Zapier* जोड़ें।

## इसे भी देखें

- [Donorbox](./donorbox) — वही रेसिपी ढाँचा, अलग donation प्लेटफ़ॉर्म के लिए
- [Zapier (overview)](../zapier) — हर Zapier रेसिपी का B1 पक्ष
- [Subsplash Zapier integration guide](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplash के अपने दस्तावेज़)
