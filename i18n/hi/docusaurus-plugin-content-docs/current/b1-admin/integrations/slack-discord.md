---
title: "Slack और Discord"
description: "B1 Admin की घटनाएँ जैसे नए लोग, donations, और form submissions एक incoming webhook के माध्यम से Slack या Discord channel पर पोस्ट करें, Zapier की ज़रूरत के बिना।"
---

# Slack और Discord

<div class="article-intro">

B1 से पढ़ने योग्य सूचनाएँ सीधे Slack या Discord channel पर पोस्ट करें — नए लोग, donations, group sign-ups, form submissions, calendar events, और भी बहुत कुछ। कोई तीसरे पक्ष का account नहीं, संभालने के लिए कोई Zap नहीं: B1 events को chat संदेशों में बदलता है और उन्हें channel के webhook URL पर खुद POST करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- B1Admin में **Edit Settings** अनुमति चाहिए
- आपके Slack workspace या Discord server में एक admin जो channel का Incoming Webhook बना सके
- तय करें कि सूचनाएँ किस channel में चाहिए (कई event प्रकारों के लिए एक ही channel उपयोग कर सकते हैं, या उन्हें अलग channels में बाँट सकते हैं)

</div>

## यह कैसे काम करता है {#how-it-works}

B1 में चैट प्लेटफ़ॉर्म के लिए एक अंतर्निहित **Connector Type** है। जब आप **Slack** या **Discord** प्रकार का webhook बनाते हैं, तो webhook engine अपना सामान्य delivery + retry + signed-header काम करता रहता है, पर भेजा गया body B1 के सामान्य `{event,churchId,data}` envelope से बदलकर उन सेवाओं के अपेक्षित छोटे `{text}` (Slack) या `{content}` (Discord) संदेश का रूप ले लेता है।

मौजूदा outbound webhook प्रवाह के अलावा, B1 के सर्वर प्रति-चर्च आधार पर Slack से संपर्क नहीं करते — कुछ नया होस्ट नहीं करना होता, और कुछ अतिरिक्त भुगतान नहीं करना होता।

## Slack — चरण-दर-चरण {#slack--step-by-step}

### 1. Slack Incoming Webhook URL प्राप्त करें {#1-get-a-slack-incoming-webhook-url}

1. उस Slack workspace में [api.slack.com/apps](https://api.slack.com/apps) खोलें जहाँ आप सूचनाएँ चाहते हैं।
2. **Create New App → From scratch** पर क्लिक करें, उसे "B1 Notifications" जैसा नाम दें, और workspace चुनें।
3. बाईं nav में **Incoming Webhooks** चुनें और **Activate Incoming Webhooks** को *On* पर टॉगल करें।
4. **Add New Webhook to Workspace** पर क्लिक करें, channel चुनें (जैसे `#donations`), फिर **Allow** करें।
5. Slack आपको उसी पेज पर वापस लाता है जहाँ एक नया **Webhook URL** होता है, जो `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…` जैसा दिखता है। उसे कॉपी करें — B1 को बस यही जानकारी चाहिए।

:::caution
Slack webhook URL को गुप्त मानें। जिसके पास भी यह है, वह channel में मनमाने संदेश पोस्ट कर सकता है। अगर यह गलती से उजागर हो जाए, तो Slack app पेज से इसे फिर से बनाएँ (फिर से बनाने से केवल URL बदलता है; B1 में उसे मेल में अपडेट करें)।
:::

### 2. B1Admin में जोड़ें {#2-connect-it-in-b1admin}

1. B1Admin में **Settings → Developer → Webhooks** पर जाएँ।
2. **New Webhook** पर क्लिक करें।
3. भरें:
   - **Name** — "Donations → #donations" जैसा पढ़ने योग्य नाम। इसे केवल आपकी टीम देखती है।
   - **Connector Type** — **Slack** चुनें।
   - **Payload URL** — चरण 1 का Slack URL चिपकाएँ।
   - **Events** — जो events आप संदेशों के रूप में चाहते हैं उन्हें टिक करें। donations channel के लिए केवल `donation.created`। #people channel के लिए `person.created` और `group.member.added` आज़माएँ।
4. **Save** पर क्लिक करें। "Signing Secret" dialog दिखता है — Slack के लिए आप उसे अनदेखा कर सकते हैं (Slack B1 हस्ताक्षर सत्यापित नहीं करता) और बंद कर सकते हैं।

### 3. परीक्षण करें {#3-test-it}

सूची से webhook दोबारा खोलें और **Send Test Event** पर क्लिक करें। B1 आपके टिक किए गए पहले event का नमूना भेजता है, इसलिए एक-दो सेकंड में आपके Slack channel में ऐसा संदेश दिखेगा

> 💝 New donation: $50.00

और उसी स्क्रीन की **Recent Deliveries** तालिका में `succeeded` स्थिति वाली नई पंक्ति दिखेगी। बस हो गया।

## Discord — चरण-दर-चरण {#discord--step-by-step}

### 1. Discord Webhook URL प्राप्त करें {#1-get-a-discord-webhook-url}

1. अपने Discord server में उस channel पर होवर करें जहाँ आप सूचनाएँ चाहते हैं और **⚙ gear** (Edit Channel) पर क्लिक करें।
2. **Integrations → Webhooks → New Webhook** खोलें।
3. उसे नाम दें और (वैकल्पिक रूप से) avatar, फिर **Copy Webhook URL** पर क्लिक करें — यह `https://discord.com/api/webhooks/123…/abc…` जैसा दिखता है।

### 2. B1Admin में जोड़ें {#2-connect-it-in-b1admin-1}

ऊपर के Slack प्रवाह जैसा ही, बस **Connector Type** को **Discord** पर सेट करें। Discord URL को **Payload URL** में चिपकाएँ और सेव करें।

:::tip
आपको Discord URL के अंत में `/slack` जोड़ने की **ज़रूरत नहीं** है — B1 Discord-नेटिव `{content}` payloads भेजता है, Slack-संगत नहीं। बस वह URL चिपकाएँ जो Discord ने दिया।
:::

### 3. परीक्षण करें {#3-test-it-1}

वही **Send Test Event** बटन — Discord चुने हुए channel में संदेश दिखाता है और delivery log `succeeded` में बदल जाता है।

## संदेश कैसे दिखते हैं {#what-the-messages-look-like}

| Event | उदाहरण संदेश |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

पूरी सूची [webhook event catalog](/docs/developer/api/webhooks#event-catalog) में है — उसमें का कोई भी event Slack/Discord पर भेजा जा सकता है।

## हर विषय के लिए एक Channel {#one-channel-per-topic}

आपको हर event को एक ही जगह डालने की ज़रूरत नहीं है। ज़्यादातर चर्च कुछ webhooks सेट करते हैं:

- **#donations** channel जो केवल `donation.created` सुनता है
- **#new-people** channel `person.created` और `group.member.added` के लिए
- **#admin-alerts** channel `form.submission.created` जैसी कम-मात्रा वाली चीज़ों के लिए

हर चर्च के लिए webhooks की संख्या पर कोई सीमा नहीं है। हर एक स्वतंत्र है — एक को हटाने या बंद करने से दूसरे प्रभावित नहीं होते।

## Deliveries की जाँच {#inspecting-deliveries}

webhook editor की **Recent Deliveries** तालिका अंतिम 50 प्रयास दिखाती है। किसी पंक्ति पर क्लिक करें और ठीक वह payload देखें जो भेजा गया, और जो response वापस आया। Slack connector के लिए payload `{"text":"💝 New donation: $50.00"}` होता है — कच्चा `{event,churchId,...}` envelope नहीं — क्योंकि B1 भेजने से पहले उसका रूप बदल देता है।

अगर कुछ विफल हुआ (जब B1 अभी भी पुनः प्रयास कर रहा हो तो एक पीला `failed` badge, या हार मानने के बाद लाल `exhausted` badge), तो **Response** कॉलम HTTP status दिखाता है और पंक्ति का dialog response body दिखाता है, ताकि आप देख सकें कि Slack या Discord को क्या पसंद नहीं आया — आमतौर पर URL में कॉपी/पेस्ट की गलती। वह delivery फिर से भेजने के लिए **Redeliver** पर क्लिक करें।

## समस्या निवारण {#troubleshooting}

- **कोई संदेश नहीं आता + delivery स्थिति `400`** — आमतौर पर Connector Type **Standard** पर है, पर URL Slack/Discord का है। Slack/Discord कच्चा envelope अस्वीकार करते हैं। dropdown को **Slack** या **Discord** पर बदलें और परीक्षण फिर से भेजें।
- **Webhook अपने-आप बंद हो गया** — B1 हर विफल delivery को लगभग पाँच दिनों तक फिर से प्रयास करता है। अगर लगातार तीन deliveries के पुनः प्रयास समाप्त हो जाएँ, तो B1 webhook बंद कर देता है (उसकी स्थिति **Disabled** दिखती है)। URL ठीक करें (या Slack/Discord पर उसे बदलें), **Active** फिर से चालू करें, और सेव करें।
- **संदेश आया पर विवरण गायब है** — हर चैट प्लेटफ़ॉर्म संदेश के आकार पर सीमा लगाता है। B1 के संदेश डिज़ाइन से एक-पंक्ति वाले हैं; समृद्ध सूचनाओं के लिए [Zapier](./zapier.md) या [Make](./make.md) का उपयोग करें ताकि उनके Slack actions से पूरा Slack संदेश बने।

## बाद में Connector Types बदलना {#switching-connector-types-later}

मौजूदा webhook का Connector Type बदला जा सकता है — यह अगली delivery पर लागू होता है। अगर आप Slack से Standard पर जाते हैं, तो URL को अपने HTTPS endpoint पर इंगित करें और वही signing secret (जो webhook बनाते समय जारी हुआ था) कच्चे envelope के रूप में सत्यापित होने योग्य हो जाता है।

## यह भी देखें {#see-also}

- [Zapier](./zapier.md) — B1 events से शुरू होने वाले बहु-चरण workflows के लिए
- [Make](./make.md) — visual scenario builder
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — अगर आप कभी webhook को अपने सर्वर पर इंगित करें तो पूरा payload और signature प्रारूप
