---
title: "Slack और Discord"
description: "इनकमिंग webhook से B1 Admin इवेंट, जैसे नए लोग, दान और फ़ॉर्म सबमिशन, Slack या Discord चैनल पर पोस्ट करें, Zapier की ज़रूरत नहीं।"
---

# Slack और Discord

<div class="article-intro">

B1 से सीधे किसी Slack या Discord चैनल पर पठनीय सूचनाएँ भेजें: नए लोग, दान, समूह में नामांकन, फ़ॉर्म सबमिशन, कैलेंडर इवेंट और बहुत कुछ। इसके लिए किसी तीसरे-पक्ष खाते की ज़रूरत नहीं है, और कोई Zap बनाए रखना नहीं पड़ता। B1 इवेंट को चैट संदेशों में बदलता है और उन्हें चैनल के webhook URL पर खुद भेजता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपके पास B1Admin में **Edit Settings** अनुमति होनी चाहिए
- आपके Slack वर्कस्पेस या Discord सर्वर में किसी एडमिन की ज़रूरत होगी, जो चैनल के लिए Incoming Webhook बना सके
- तय करें कि सूचनाएँ किस चैनल में चाहिए (आप कई इवेंट प्रकारों के लिए एक ही चैनल रख सकते हैं, या उन्हें अलग-अलग चैनलों में बाँट सकते हैं)

</div>

## यह कैसे काम करता है

B1 में चैट प्लेटफ़ॉर्म के लिए एक built-in **Connector Type** है। जब आप **Slack** या **Discord** प्रकार का webhook बनाते हैं, तो webhook इंजन अपना सामान्य डिलीवरी, रीट्राई और साइन किए गए हेडर वाला काम जारी रखता है। लेकिन भेजी जाने वाली बॉडी को B1 के सामान्य `{event,churchId,data}` लिफ़ाफ़े से बदलकर उन सेवाओं के अपेक्षित छोटे `{text}` (Slack) या `{content}` (Discord) संदेश में बदल दिया जाता है।

मौजूदा outbound webhook प्रवाह के अलावा, B1 के सर्वर प्रति चर्च Slack से अलग से संपर्क नहीं करते। यहाँ होस्ट करने या अतिरिक्त भुगतान करने के लिए कुछ नया नहीं है।

## Slack: चरण-दर-चरण

### 1. Slack Incoming Webhook URL प्राप्त करें

1. उस Slack वर्कस्पेस में [api.slack.com/apps](https://api.slack.com/apps) खोलें जहाँ आप सूचनाएँ चाहते हैं।
2. **Create New App → From scratch** पर क्लिक करें, उसे "B1 Notifications" जैसा कोई नाम दें, और वर्कस्पेस चुनें।
3. बाएँ नेविगेशन में **Incoming Webhooks** चुनें और **Activate Incoming Webhooks** को *On* पर टॉगल करें।
4. **Add New Webhook to Workspace** पर क्लिक करें, चैनल चुनें (जैसे `#donations`), फिर **Allow** करें।
5. Slack आपको एक नए **Webhook URL** वाले पेज पर वापस ले जाएगा, जो कुछ इस तरह दिखता है: `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`। इसे कॉपी करें। B1 को बस यही जानकारी चाहिए।

:::caution
Slack webhook URL को गोपनीय रहस्य मानें। जिसके पास भी यह है, वह चैनल में कोई भी संदेश भेज सकता है। अगर यह गलती से उजागर हो जाए, तो Slack ऐप पेज से इसे regenerate करें। Regenerate करने पर सिर्फ URL बदलता है, इसलिए B1 में भी उसे अपडेट करें।
:::

### 2. B1Admin में जोड़ें

1. B1Admin में **Settings → Developer → Webhooks** पर जाएँ।
2. **New Webhook** पर क्लिक करें।
3. ये फ़ील्ड भरें:
   - **Name**: कोई पठनीय नाम जैसे "Donations → #donations"। इसे केवल आपकी टीम देखेगी।
   - **Connector Type**: **Slack** चुनें।
   - **Payload URL**: चरण 1 का Slack URL चिपकाएँ।
   - **Events**: जिन इवेंट को संदेश के रूप में चाहिए, उन्हें टिक करें। दान वाले चैनल के लिए बस `donation.created`। #people चैनल के लिए `person.created` और `group.member.added` आज़माएँ।
4. **Save** पर क्लिक करें। एक "Signing Secret" डायलॉग दिखेगा। Slack के लिए आप इसे अनदेखा कर सकते हैं (Slack B1 के हस्ताक्षर सत्यापित नहीं करता), इसलिए उसे बंद कर दें।

### 3. जाँचें

सूची से webhook को फिर खोलें और **Send Test Event** पर क्लिक करें। एक-दो सेकंड में आपके Slack चैनल में ऐसा संदेश दिखेगा

> 💝 New donation: $50.00

और उसी स्क्रीन की **Recent Deliveries** तालिका में `succeeded` स्थिति वाली एक नई पंक्ति दिखेगी। बस हो गया।

## Discord: चरण-दर-चरण

### 1. Discord Webhook URL प्राप्त करें

1. अपने Discord सर्वर में, जिस चैनल में सूचनाएँ चाहिए उस पर होवर करें और **⚙ gear** (Edit Channel) पर क्लिक करें।
2. **Integrations → Webhooks → New Webhook** खोलें।
3. उसे एक नाम दें और (वैकल्पिक रूप से) अवतार चुनें, फिर **Copy Webhook URL** पर क्लिक करें। यह कुछ ऐसा दिखता है: `https://discord.com/api/webhooks/123…/abc…`।

### 2. B1Admin में जोड़ें

ऊपर वाले Slack प्रवाह जैसा ही, बस **Connector Type** को **Discord** पर सेट करें। Discord URL को **Payload URL** में चिपकाएँ और सेव करें।

:::tip
आपको Discord URL के अंत में `/slack` जोड़ने की **ज़रूरत नहीं** है। B1 Discord-नेटिव `{content}` पेलोड भेजता है, Slack-संगत नहीं। बस वह URL चिपकाएँ जो Discord ने दिया है।
:::

### 3. जाँचें

वही **Send Test Event** बटन। Discord चुने गए चैनल में संदेश दिखाएगा और डिलीवरी लॉग `succeeded` में बदल जाएगा।

## संदेश कैसे दिखते हैं

| इवेंट | उदाहरण संदेश |
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

पूरी सूची [webhook event catalog](/docs/developer/api/webhooks#event-catalog) में है। वहाँ का कोई भी इवेंट Slack/Discord पर भेजा जा सकता है।

## एक चैनल प्रति विषय

आपको हर इवेंट एक ही जगह रखने की ज़रूरत नहीं है। ज़्यादातर चर्च कुछ webhooks सेट करते हैं:

- **#donations** चैनल, जो केवल `donation.created` सुनता है
- **#new-people** चैनल, `person.created` और `group.member.added` के लिए
- **#admin-alerts** चैनल, `form.submission.created` जैसे कम-मात्रा वाले इवेंट के लिए

प्रति चर्च webhooks की संख्या पर कोई सीमा नहीं है। हर एक स्वतंत्र है। किसी एक को हटाने या बंद करने से दूसरों पर असर नहीं पड़ता।

## डिलीवरी की जाँच

webhook एडिटर की **Recent Deliveries** तालिका पिछले 50 प्रयास दिखाती है। किसी पंक्ति पर क्लिक करें तो भेजा गया सटीक पेलोड और लौटा हुआ जवाब दिखता है। Slack connector के लिए पेलोड `{"text":"💝 New donation: $50.00"}` होता है, कच्चा `{event,churchId,...}` लिफ़ाफ़ा नहीं, क्योंकि डिलीवरी से पहले B1 उसे बदल देता है।

अगर कुछ विफल हुआ (लाल `failed` या `exhausted` बैज), तो डायलॉग HTTP स्थिति और response body दिखाता है, ताकि आप देख सकें कि Slack या Discord ने क्या अस्वीकार किया। आम तौर पर यह URL में कॉपी/पेस्ट की गलती होती है।

## समस्या निवारण

- **कोई संदेश नहीं आता और डिलीवरी स्थिति `400` है**: आम तौर पर Connector Type **Standard** पर होता है, जबकि URL Slack या Discord का होता है। Slack/Discord कच्चे लिफ़ाफ़े को अस्वीकार करते हैं। ड्रॉपडाउन को **Slack** या **Discord** पर बदलें और टेस्ट फिर से भेजें।
- **Webhook अपने-आप बंद हो गया**: लगातार 3 विफल डिलीवरी के बाद B1 webhook बंद कर देता है। URL ठीक करें (या Slack/Discord पर उसे rotate करें) और **Active** को फिर से चालू करें।
- **संदेश आया पर विवरण गायब है**: हर चैट प्लेटफ़ॉर्म संदेश के आकार को सीमित करता है। B1 के संदेश डिज़ाइन से एक-पंक्ति वाले होते हैं। समृद्ध सूचनाओं के लिए [Zapier](./zapier.md) या [Make](./make.md) का उपयोग करें, ताकि उनकी Slack actions से पूरा Slack संदेश बनाया जा सके।

## बाद में Connector Types बदलना

मौजूदा webhook का Connector Type बदला जा सकता है। यह अगली डिलीवरी से लागू होगा। अगर आप Slack से Standard पर जाते हैं, तो URL को अपने HTTPS endpoint पर इंगित करें। वही signing secret (जो webhook बनाते समय जारी हुआ था) कच्चे लिफ़ाफ़े के रूप में सत्यापन योग्य हो जाएगा।

## यह भी देखें

- [Zapier](./zapier.md): B1 इवेंट से शुरू होने वाले बहु-चरणीय वर्कफ़्लो के लिए
- [Make](./make.md): विज़ुअल सिनेरियो बिल्डर
- [Webhooks (developer reference)](/docs/developer/api/webhooks): यदि आप कभी webhook को अपने सर्वर पर इंगित करें, तो पूरा पेलोड और हस्ताक्षर प्रारूप यहाँ है
