---
title: "Clearstream"
description: "Zapier के माध्यम से Clearstream SMS को B1 Admin से जोड़ें: नए उपहारों या form submissions पर texts भेजें, और आने वाले जवाबों को लोगों के रूप में वापस लाएँ।"
---

# Clearstream

<div class="article-intro">

किसी भी B1 event से — नया व्यक्ति, नया उपहार, form submission, calendar अपडेट — [Clearstream](https://clearstream.io) text message शुरू करें, और जवाबों को B1 रिकॉर्ड के रूप में वापस लाएँ। Clearstream का Zapier ऐप दोनों दिशाएँ उजागर करता है, इसलिए पूरी वायरिंग एक रेसिपी है, कस्टम कोड नहीं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- कम से कम एक list और SMS कोटा वाला [Clearstream](https://clearstream.io) account
- एक [Zapier](https://zapier.com) account
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या जोड़ सकते हैं {#what-you-can-wire-up}

| दिशा | Trigger | Action |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Subscriber बनाएँ/अपडेट करें + नंबर पर Text भेजें |
| B1 → Clearstream | B1 `donation.created` | Clearstream: list पर Text भेजें (जैसे वित्त टीम को सूचित करना) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: routing list पर Text भेजें (जैसे प्रार्थना अनुरोध टीम) |
| Clearstream → B1 | New Incoming Text | B1: व्यक्ति बनाएँ; जिस keyword से उन्होंने text किया उससे tag करें |

Clearstream के Zapier actions: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*।

## सेटअप {#setup}

### 1. B1 API key बनाएँ {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — key को Zapier से जोड़ने और B1 द्वारा trigger webhook रजिस्टर करने के लिए ज़रूरी
- `people:read` — event से व्यक्ति खोजने के लिए (`personId` → नाम/फ़ोन/email)
- (वैकल्पिक) `people:write` अगर Clearstream के जवाब B1 contacts बनाएँ

### 2. "नए उपहार पर text" Zap बनाएँ {#2-build-the-text-on-new-gift-zap}

1. **Trigger** — B1.church: New Donation
2. **Action** — B1.church: Find Person (donation का `personId`)
3. **Action** — Clearstream: Send Text to Number। चरण 2 के व्यक्ति का फ़ोन प्राप्तकर्ता के रूप में उपयोग करें, संदेश लिखें (`"Thanks for your gift, {first}! …"`)।

Zap चालू करें। B1 सक्रिय होने पर donation webhook रजिस्टर करता है; आप **Settings → Developer → Webhooks** में `Zapier — donation.created` दिखेगा।

### 3. (वैकल्पिक) जवाब वापस B1 रिकॉर्ड के रूप में लाएँ {#3-optional-pull-replies-back-as-b1-records}

1. **Trigger** — Clearstream: New Incoming Text
2. **Action** — keyword पर Zapier द्वारा Filter — जैसे केवल तभी आगे बढ़ें जब text का मुख्य भाग `PRAY` से शुरू हो
3. **Action** — text का मुख्य भाग ऐसी जगह दर्ज करें जहाँ आपकी टीम उसे देखे (Slack, Google Sheet, या B1 task)। B1 का *Find Person* लोगों को केवल id, email, या नाम से खोजता है, फ़ोन से नहीं, इसलिए जवाब को हाथ से B1 व्यक्ति से मिलाएँ (या B1 के `/membership/people/search/phone?number=…` endpoint पर Webhooks by Zapier GET जोड़ें)।

## सामान्य रेसिपी {#common-recipes}

### स्वयंसेवक टीम को पेज करना {#volunteer-team-paging}

- **Trigger** — B1.church: New Form Submission (प्रार्थना-अनुरोध form id पर filter किया हुआ)
- **Action** — Clearstream: Send Text to List, जहाँ list आपकी on-call pastoral टीम है। संदेश इस तरह लिखें: `New prayer request: {data.questions.0.answer}`।

### पहली बार आने वाले मेहमान का फ़ॉलो-अप क्रम {#first-time-visitor-follow-up-sequence}

- **Trigger** — B1.church: New Person, व्यक्ति की membership स्थिति पर filter किया हुआ (जैसे *Visitor*)
- **Action** — Clearstream: Add Subscriber to Automated Workflow। workflow id को एक पहले से बने 7-दिन के text drip से map करें।

### keyword से group में जुड़ना {#keyword-driven-group-join}

- **Trigger** — Clearstream: New Incoming Text (keyword `MENS` पर filter)
- **Action** — B1.church: texter के नाम और फ़ोन से Create Person (B1 का *Find Person* फ़ोन से लोगों को नहीं खोज सकता, इसलिए बाद में **People** में duplicates जाँचें)
- **Action** — B1.church: Men's Ministry group में Add Group Member

## सीमाएँ और नोट्स {#limits--notes}

- **Clearstream SMS को संदेश के हिसाब से मापता है।** हर Send Text action लंबाई और प्राप्तकर्ताओं की संख्या के अनुसार एक या अधिक credits खर्च करता है — अपने plan का कोटा जाँचें।
- ***Send Text to Number* के लिए फ़ोन E.164 format में होना चाहिए** (जैसे `+15555550199`)। B1 का व्यक्ति record जो भी दर्ज हुआ वही संग्रहीत करता है; अगर format की गारंटी नहीं है तो *Formatter by Zapier — Numbers → Format Phone Number* चरण का उपयोग करें।
- **B1 की ओर से कोई header आवश्यक नहीं** — Clearstream का auth पूरी तरह उसके Zapier connection के अंदर रहता है।

## समस्या निवारण {#troubleshooting}

- **Trigger कभी फ़ायर नहीं होता** — Zap चालू करने के बाद `Settings → Developer → Webhooks` में `Zapier — <event>` पंक्ति दिखनी चाहिए। न दिखे तो B1 API key में `settings:write` नहीं है। फिर से बनाएँ और फिर से जोड़ें।
- **Clearstream "Invalid phone number" लौटाता है** — प्राप्तकर्ता फ़ील्ड E.164 में नहीं है। Format Phone Number चरण जोड़ें।
- **Send Text to List `403` के साथ विफल** — Clearstream API user के पास उस list की अनुमति नहीं है, या list id गलत है। list ids Clearstream list विवरण पेज पर दिखते हैं।

## यह भी देखें {#see-also}

- [Text In Church](./text-in-church.md) — वैकल्पिक SMS platform, समान वायरिंग रूप
- [Mobile Message](./mobile-message.md) — अमेरिका के बाहर के चर्चों के लिए
- [Zapier (overview)](../zapier.md) — हर Zapier रेसिपी का B1 हिस्सा
- [Clearstream API docs](https://api-docs.clearstream.io/) — Zapier ऐप से आगे की कस्टम integrations के लिए
