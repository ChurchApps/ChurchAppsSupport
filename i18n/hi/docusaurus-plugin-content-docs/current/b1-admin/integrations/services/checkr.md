---
title: "Checkr"
description: "Make.com से B1 Admin स्वयंसेवक साइन-अप को Checkr पृष्ठभूमि जाँच से जोड़ें, साथ में सुरक्षित सेवा समन्वयक के लिए वैकल्पिक रिपोर्ट स्थिति अलर्ट।"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) स्टाफ और स्वयंसेवकों के लिए बैकग्राउंड स्क्रीनिंग चलाता है। किसी भी चर्च में बच्चों या युवा कार्यक्रम के लिए यह लगभग हर जगह ज़रूरी होता है। B1 में **कोई built-in बैकग्राउंड-चेक सुविधा नहीं है**। चेक का ऑर्डर देना, परिणाम ट्रैक करना और स्क्रीनिंग के नियमों का पालन, यह सब Checkr में होता है। नीचे दिया गया तरीका केवल B1 इवेंट्स को Checkr से जोड़ता है। Checkr का कोई Zapier ऐप नहीं है, लेकिन [Make.com का Checkr integration](https://www.make.com/en/integrations/checkr) सत्यापित है और उसमें वे actions मौजूद हैं जिनकी आपको B1 इवेंट से चेक शुरू करने के लिए ज़रूरत होती है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- API एक्सेस और कम से कम एक स्क्रीनिंग पैकेज कॉन्फ़िगर किया हुआ [Checkr](https://checkr.com) खाता
- एक [Make](https://www.make.com) खाता
- **Edit Settings** अनुमति वाला एक B1Admin उपयोगकर्ता

</div>

## आप क्या जोड़ सकते हैं

Make का Checkr ऐप 1 trigger और 6 actions देता है:

| दिशा | B1 / Make trigger | Action |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (एक स्वयंसेवक समूह तक सीमित) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook (invitation / report इवेंट) | B1: व्यक्ति का रिकॉर्ड अपडेट करें (जैसे टैग "Checkr cleared") |

Make के Checkr actions: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation। इनके अलावा 4 search modules भी हैं।

## सेटअप

### 1. B1 API key बनाएं

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — trigger webhook के लिए
- `people:read` — चेक शुरू करते समय व्यक्ति का नाम/ईमेल देखने के लिए
- (वैकल्पिक) `people:write`, यदि आप रिपोर्ट की स्थिति को custom field या टैग के रूप में वापस लिखना चाहते हैं

### 2. Make में "स्वयंसेवक साइनअप पर चेक शुरू करें" scenario बनाएं

1. **Trigger** — B1.church: Watch Events (`group.member.added`)।
2. **Filter** — तभी आगे बढ़ें जब `data.groupId` आपके "Children's Volunteers" (या समकक्ष) समूह से मेल खाए।
3. **Action** — B1.church: Find Person (`data.personId` से) ताकि ईमेल और पहला/अंतिम नाम मिल सके।
4. **Action** — Checkr: Create Candidate। चरण 3 से first/last/email मैप करें।
5. **Action** — Checkr: Create Background Check Invitation। चरण 4 में बने candidate id को *candidate_id* फ़ील्ड से मैप करें। स्क्रीनिंग पैकेज चुनें (जैसे `tasker_standard` या जो भी आपके खाते में उपलब्ध हो)।
6. (वैकल्पिक) **Action** — Slack: आपके safe-ministry coordinator को सूचित करें कि चेक शुरू किया गया है।

Scenario चालू करें। लक्षित समूह के नए स्वयंसेवकों को ईमेल से अपने आप Checkr का निमंत्रण मिलेगा। वे उसे अपने फ़ोन या लैपटॉप पर पूरा करेंगे, और Checkr स्क्रीनिंग चलाएगा।

### 3. (वैकल्पिक) रिपोर्ट वापस पाएं

1. **Trigger** — Checkr: Watch Events (webhook)। सक्रिय होने पर Make एक Checkr webhook पंजीकृत करता है।
2. **Filter** — तभी आगे बढ़ें जब `event_type = report.completed` हो।
3. **Action** — Checkr: Get Report (webhook से मिले report id का उपयोग करके)।
4. **Action** — B1.church: Find Person (candidate के ईमेल से)।
5. **Action** — शर्त के अनुसार Slack / Email: `clear` / `consider` / `suspended` स्थिति के साथ coordinator को सूचित करें।

ध्यान दें: B1 में अभी कोई built-in "background-check status" फ़ील्ड नहीं है। व्यावहारिक विकल्प ये हैं: (क) परिणाम को समीक्षा के लिए एक निजी Slack चैनल में भेजें, (ख) ऑडिट के लिए इसे Google Sheet में लिखें, या (ग) `clear` आने पर व्यक्ति को B1 समूह "Cleared volunteers" में जोड़ें।

## सामान्य व्यंजन (recipes)

### हर 2 साल में स्वयंसेवकों की फिर से स्क्रीनिंग

ऊपर के तरीके को Make के schedule trigger के साथ जोड़ें:

- **Trigger** — Make: Schedule (मासिक)
- **Action** — B1.church: "Cleared volunteers" के लिए List Group Members
- **Action** — Make से फ़िल्टर करें: cleared की तारीख 22 महीने से पुरानी हो
- **Action** — Checkr: Create Background Check Invitation (शुरुआती प्रवाह जैसा ही)

### चेक पूरा होने तक चरण 1 की पहुँच रोकें

यदि आपका चर्च B1 समूह सदस्यता से पहुँच नियंत्रित करता है (जैसे सेवा-सूचियों में केवल "Cleared" समूह के सदस्य दिखें), तो नए स्वयंसेवकों को तब तक एक अस्थायी समूह में रखें जब तक Checkr का `report.completed` इवेंट उन्हें बदल न दे।

## सीमाएँ और नोट्स

- अधिकांश स्क्रीनिंग पैकेजों के लिए **Checkr केवल US में उपलब्ध है**। ऑस्ट्रेलिया, UK और कनाडा के चर्चों को कोई दूसरा विकल्प चाहिए होगा।
- **मूल्य** प्रति चेक लगता है। Make में हर Create Invitation एक असली चेक खर्च करता है। पहले Checkr के sandbox / staging खाते में परीक्षण करें। (Make का Checkr ऐप कनेक्शन में दिए गए credentials का उपयोग करता है, इसलिए credentials बदलने से sandbox और live के बीच स्विच होता है।)
- **Checkr API एक्सेस प्लान पर निर्भर है।** छोटे Checkr खाते केवल UI वाले टियर पर हो सकते हैं। API सक्षम कराने के लिए Checkr से संपर्क करें।

## समस्या-निवारण

- **Create Candidate `403` के साथ विफल होता है** — Checkr API token केवल-पढ़ने वाला है या उसमें सही खाता अनुमतियाँ नहीं हैं। Checkr dashboard से write scope के साथ उसे दोबारा जारी करें।
- **निमंत्रण कभी नहीं पहुँचता** — चरण 3 में candidate का ईमेल जाँचें। B1 में उस व्यक्ति का ईमेल फ़ील्ड खाली हो सकता है। Checkr चरण से पहले एक "ईमेल आवश्यक" फ़िल्टर जोड़ें।
- **Webhook trigger शुरू नहीं होता** — यदि आपका Make खाता ऐसे पेड टियर पर नहीं है जो outbound webhooks का समर्थन करता हो, तो Checkr का webhook पंजीकरण कभी-कभी चुपचाप विफल हो जाता है। Checkr dashboard के *Webhooks* पेज पर जाकर जाँचें कि Make का URL सूचीबद्ध है।

## यह भी देखें

- [Make (overview)](../make.md) — हर Make scenario का B1 पक्ष
- [Mobile Message](./mobile-message.md) — ऐसे SMS प्रदाताओं के लिए जिनका Zapier ऐप नहीं है; वही Webhooks/HTTP पैटर्न जो Checkr के Make सेटअप में है
- [Checkr API docs](https://docs.checkr.com/)
