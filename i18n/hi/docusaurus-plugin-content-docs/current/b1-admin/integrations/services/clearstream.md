---
title: "Clearstream"
description: "Zapier के माध्यम से Clearstream SMS को B1 Admin से जोड़ें: नए उपहार या फ़ॉर्म सबमिशन पर टेक्स्ट भेजें, और आने वाले उत्तर लोगों के रूप में वापस लाएँ।"
---

# Clearstream

<div class="article-intro">

किसी भी B1 इवेंट — नया व्यक्ति, नया उपहार, फ़ॉर्म सबमिशन, कैलेंडर अपडेट — से [Clearstream](https://clearstream.io) टेक्स्ट संदेश भेजें, और उत्तर B1 रिकॉर्ड के रूप में वापस लाएँ। Clearstream का Zapier ऐप दोनों दिशाओं को उपलब्ध कराता है, इसलिए पूरी व्यवस्था एक रेसिपी है, कोई कस्टम कोड नहीं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- कम से कम एक सूची और SMS सीमा वाला [Clearstream](https://clearstream.io) खाता
- एक [Zapier](https://zapier.com) खाता
- **Edit Settings** अनुमति वाला एक B1Admin उपयोगकर्ता

</div>

## आप क्या जोड़ सकते हैं

| दिशा | ट्रिगर | क्रिया |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (जैसे वित्त टीम को सूचित करने के लिए) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: किसी रूटिंग सूची पर Send Text (जैसे प्रार्थना अनुरोध टीम) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; जिस कीवर्ड से उन्होंने टेक्स्ट किया, उसके साथ टैग करें |

Clearstream की Zapier क्रियाएँ: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*।

## सेटअप

### 1. B1 API कुंजी बनाएँ

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — B1 के लिए ट्रिगर वेबहुक पंजीकृत करने हेतु आवश्यक
- `people:read` — इवेंट से व्यक्ति को खोजने के लिए आवश्यक (`personId` → नाम/फ़ोन/ईमेल)
- (वैकल्पिक) `people:write` यदि Clearstream के उत्तरों से B1 संपर्क बनाने हों

### 2. "नए उपहार पर टेक्स्ट" Zap बनाएँ

1. **ट्रिगर** — B1.church: New Donation
2. **क्रिया** — B1.church: Find Person (दान के `personId` से)
3. **क्रिया** — Clearstream: Send Text to Number। प्राप्तकर्ता के रूप में चरण 2 के व्यक्ति का फ़ोन नंबर उपयोग करें, और संदेश लिखें (`"Thanks for your gift, {first}! …"`)।

Zap चालू करें। सक्रिय होने पर B1 दान वेबहुक पंजीकृत करता है; आपको **Settings → Developer → Webhooks** में `Zapier — donation.created` दिखेगा।

### 3. (वैकल्पिक) उत्तर B1 रिकॉर्ड के रूप में वापस लाएँ

1. **ट्रिगर** — Clearstream: New Incoming Text
2. **क्रिया** — कीवर्ड पर Zapier द्वारा Filter — जैसे केवल तभी आगे बढ़ें जब टेक्स्ट संदेश `PRAY` से शुरू हो
3. **क्रिया** — B1.church: Find Person (फ़ोन से)
4. **क्रिया** — Filter / Path — यदि न मिले तो उन्हें बनाएँ; किसी भी स्थिति में टेक्स्ट संदेश को कहीं सुरक्षित करें (Slack, Google Sheet, या Zapier द्वारा Webhooks के माध्यम से B1 फ़ॉर्म सबमिशन)।

## सामान्य रेसिपी

### स्वयंसेवक टीम को पेज करना

- **ट्रिगर** — B1.church: New Form Submission (प्रार्थना-अनुरोध फ़ॉर्म की आईडी पर फ़िल्टर किया गया)
- **क्रिया** — Clearstream: Send Text to List, जहाँ सूची आपकी ऑन-कॉल पास्टोरल टीम है। संदेश का मुख्य भाग इस प्रकार लिखें: `New prayer request: {data.questions.0.answer}`।

### पहली बार आने वाले आगंतुक के लिए फ़ॉलो-अप क्रम

- **ट्रिगर** — B1.church: New Person, B1 व्यक्ति टैग "First-time visitor" पर फ़िल्टर किया गया
- **क्रिया** — Clearstream: Add Subscriber to Automated Workflow। वर्कफ़्लो आईडी को पहले से बने 7-दिन के टेक्स्ट ड्रिप से मैप करें।

### कीवर्ड-आधारित समूह में शामिल होना

- **ट्रिगर** — Clearstream: New Incoming Text (कीवर्ड `MENS` पर फ़िल्टर करें)
- **क्रिया** — B1.church: Find Person (फ़ोन से); न मिलने पर → Create Person पर शाखा बनाएँ
- **क्रिया** — B1.church: Men's Ministry समूह में Add Group Member

## सीमाएँ और टिप्पणियाँ

- **Clearstream SMS की गणना संदेश के हिसाब से करता है।** हर Send Text क्रिया संदेश की लंबाई और प्राप्तकर्ताओं की संख्या के आधार पर एक या अधिक क्रेडिट खर्च करती है — अपनी योजना की सीमा जाँच लें।
- **Send Text to Number के लिए फ़ोन E.164 प्रारूप में होना चाहिए** (जैसे `+15555550199`)। B1 का व्यक्ति रिकॉर्ड जो भी दर्ज हुआ हो, उसी को संग्रहीत करता है; यदि आप प्रारूप की गारंटी नहीं दे सकते तो *Formatter by Zapier — Numbers → Format Phone Number* चरण का उपयोग करें।
- **B1 की ओर से किसी हेडर की आवश्यकता नहीं है** — Clearstream का प्रमाणीकरण पूरी तरह उसके Zapier कनेक्शन के अंदर रहता है।

## समस्या निवारण

- **ट्रिगर कभी नहीं चलता** — Zap चालू करने के बाद `Settings → Developer → Webhooks` में `Zapier — <event>` पंक्ति दिखनी चाहिए। यदि नहीं, तो B1 API कुंजी में `settings:write` नहीं है। कुंजी फिर से बनाएँ और फिर से कनेक्ट करें।
- **Clearstream "Invalid phone number" लौटाता है** — प्राप्तकर्ता फ़ील्ड E.164 में नहीं है। Format Phone Number चरण जोड़ें।
- **Send Text to List `403` के साथ विफल होता है** — Clearstream API उपयोगकर्ता के पास उस सूची की अनुमति नहीं है, या सूची आईडी गलत है। सूची आईडी Clearstream के सूची विवरण पृष्ठ पर दिखाई देती हैं।

## यह भी देखें

- [Text In Church](./text-in-church.md) — वैकल्पिक SMS प्लेटफ़ॉर्म, लगभग समान व्यवस्था
- [Mobile Message](./mobile-message.md) — अमेरिका के बाहर के चर्चों के लिए
- [Zapier (overview)](../zapier.md) — हर Zapier रेसिपी का B1 पक्ष
- [Clearstream API docs](https://api-docs.clearstream.io/) — Zapier ऐप से परे कस्टम इंटीग्रेशन के लिए
