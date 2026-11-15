---
title: "Checkr"
description: "Make.com का उपयोग करके B1 Admin volunteer sign-ups को Checkr background checks से जोड़ें, अपने safe-ministry coordinator के लिए वैकल्पिक report status alerts के साथ।"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) staff और volunteers के लिए background screening चलाता है — बच्चों या युवा कार्यक्रम चलाने वाले किसी भी चर्च की लगभग सार्वभौमिक ज़रूरत। B1 में **कोई अंतर्निहित background-check सुविधा नहीं है** — checks मंगवाना, परिणाम ट्रैक करना, और screening compliance सब Checkr में होता है; नीचे दी गई रेसिपी केवल B1 events को उससे जोड़ती है। Checkr के पास Zapier ऐप नहीं है, पर [Make.com का Checkr integration](https://www.make.com/en/integrations/checkr) सत्यापित है और उन actions को उजागर करता है जिनसे B1 event से check शुरू किया जा सकता है।

</div>

:::caution
यह रेसिपी B1.church Make app का उपयोग करती है, जो अभी रिलीज़ नहीं हुआ है (देखें [Make](../make.md))। तब तक इन scenarios का B1 हिस्सा Make के **HTTP** module से B1 की [REST API](/docs/developer/api) को call करके बनाना होगा।
:::

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- API पहुँच और कम से कम एक screening package कॉन्फ़िगर किए हुए [Checkr](https://checkr.com) account
- एक [Make](https://www.make.com) account
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या जोड़ सकते हैं {#what-you-can-wire-up}

Make का Checkr app 1 trigger और 6 actions उजागर करता है:

| दिशा | B1 / Make trigger | Action |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (एक volunteer group तक सीमित) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook (invitation / report event) | B1: व्यक्ति का record अपडेट करें (जैसे tag "Checkr cleared") |

Make के Checkr actions: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation। साथ ही 4 search modules।

## सेटअप {#setup}

### 1. B1 API key बनाएँ {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — trigger webhook के लिए
- `people:read` — check शुरू करते समय व्यक्ति का नाम/email खोजने के लिए
- (वैकल्पिक) `people:write` अगर आप report status को custom field या tag के रूप में वापस लिखना चाहते हैं

### 2. Make में "volunteer signup पर check शुरू करें" scenario बनाएँ {#2-build-the-kick-off-a-check-on-volunteer-signup-scenario-in-make}

1. **Trigger** — B1.church: Watch Events (`group.member.added`)।
2. **Filter** — केवल तभी आगे बढ़ें जब `data.groupId` आपके "Children's Volunteers" (या समकक्ष) group से मेल खाए।
3. **Action** — B1.church: Find Person (`data.personId` से) ताकि email + पहला/अंतिम नाम मिले।
4. **Action** — Checkr: Create Candidate। चरण 3 से first/last/email map करें।
5. **Action** — Checkr: Create Background Check Invitation। चरण 4 के नए candidate id को *candidate_id* फ़ील्ड में map करें। screening package चुनें (जैसे `tasker_standard` या जो भी आपका account दिखाता है)।
6. (वैकल्पिक) **Action** — Slack: अपने safe-ministry coordinator को सूचित करें कि check शुरू हो गया है।

scenario चालू करें। लक्षित group के नए volunteers को ईमेल से अपने-आप Checkr invitation मिलता है; वे उसे अपने फ़ोन या laptop पर पूरा करते हैं; Checkr screening चलाता है।

### 3. (वैकल्पिक) रिपोर्ट वापस प्राप्त करें {#3-optional-receive-the-report-back}

1. **Trigger** — Checkr: Watch Events (webhook)। Make सक्रिय होने पर एक Checkr webhook रजिस्टर करता है।
2. **Filter** — केवल तभी आगे बढ़ें जब `event_type = report.completed` हो।
3. **Action** — Checkr: Get Report (webhook से report id का उपयोग करके)।
4. **Action** — B1.church: Find Person (candidate email से)।
5. **Action** — शर्तीय Slack / Email: coordinator को `clear` / `consider` / `suspended` status के साथ सूचित करें।

नोट: B1 में आज "background-check status" का कोई अंतर्निहित फ़ील्ड नहीं है। व्यावहारिक विकल्प हैं (a) समीक्षा के लिए परिणाम एक निजी Slack channel पर पोस्ट करना, (b) ऑडिट के लिए Google Sheet में लिखना, या (c) `clear` पर व्यक्ति को B1 group "Cleared volunteers" में जोड़ना।

## सामान्य रेसिपी {#common-recipes}

### हर 2 साल में volunteers को फिर से screen करें {#re-screen-volunteers-every-2-years}

ऊपर की विधि को Make के schedule trigger के साथ जोड़ें:

- **Trigger** — Make: Schedule (मासिक)
- **Action** — HTTP — Make a request: अपने "Cleared volunteers" group के लिए B1 के `/membership/groupmembers?groupId=…` पर GET करें (B1.church ऐप में कोई list action नहीं है)
- **Action** — Make द्वारा filter: cleared date 22 महीने से पुरानी
- **Action** — Checkr: Create Background Check Invitation (प्रारंभिक प्रवाह जैसा ही)

### check पूरा होने तक चरण 1 की पहुँच रोकें {#block-stage-1-access-until-check-completes}

अगर आपका चर्च पहुँच नियंत्रित करने के लिए B1 group membership का उपयोग करता है (जैसे केवल "Cleared" group के सदस्य serving schedules में दिखें), तो नए volunteers को एक holding group में रखें जब तक Checkr का `report.completed` event उन्हें न बदल दे।

## सीमाएँ और नोट्स {#limits--notes}

- अधिकांश screening packages के लिए **Checkr केवल US में** है। ऑस्ट्रेलिया, UK, और कनाडा के चर्चों को कोई विकल्प चाहिए होगा।
- **मूल्य** प्रति check है — Make में हर Create Invitation एक असली check खर्च करता है। पहले Checkr के sandbox / staging account में परीक्षण करें (Make का Checkr app connection में दिए credentials का सम्मान करता है, इसलिए credentials बदलने से sandbox/live बदल जाता है)।
- **Checkr API पहुँच plan पर निर्भर है।** छोटे Checkr accounts केवल UI वाले स्तर पर हो सकते हैं; API सक्षम करने के लिए Checkr से संपर्क करें।

## समस्या निवारण {#troubleshooting}

- **Create Candidate `403` के साथ विफल** — Checkr API token केवल-पढ़ने वाला है या सही account अनुमतियाँ नहीं हैं। Checkr dashboard से write scope के साथ उसे फिर से जारी करें।
- **Invitation कभी नहीं आता** — चरण 3 में candidate का email जाँचें; B1 में उस व्यक्ति का email फ़ील्ड खाली हो सकता है। Checkr चरण से पहले एक email-आवश्यक filter जोड़ें।
- **Webhook trigger फ़ायर नहीं होता** — अगर आपका Make account outbound webhooks समर्थन करने वाले भुगतान स्तर पर नहीं है, तो Checkr का webhook रजिस्ट्रेशन कभी-कभी चुपचाप विफल हो जाता है। Checkr dashboard के *Webhooks* पेज पर जाँचें कि Make का URL सूचीबद्ध है।

## यह भी देखें {#see-also}

- [Make (overview)](../make.md) — हर Make scenario का B1 हिस्सा
- [Mobile Message](./mobile-message.md) — Zapier ऐप के बिना SMS providers के लिए, Checkr Make वायरिंग जैसा ही Webhooks/HTTP पैटर्न
- [Checkr API docs](https://docs.checkr.com/)
