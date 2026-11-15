---
title: "Make"
description: "स्वचालित workflows के लिए B1 Admin को Make से जोड़ें: API key बनाएँ, B1.church trigger और actions सेट करें, और सामान्य त्रुटियों का समाधान करें।"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (पूर्व में Integromat) एक visual workflow स्वचालन platform है — भावना में Zapier जैसा, पर अधिक लचीले तर्क और बड़े पैमाने पर सस्ते बिल के साथ। आधिकारिक B1.church Make app आपको ऐसे "scenarios" बनाने देता है जो B1 events पर तुरंत प्रतिक्रिया देते हैं और रिकॉर्ड वापस B1 में लिखते हैं।

</div>

:::caution अभी उपलब्ध नहीं
B1.church Make app अभी Make की app directory में प्रकाशित नहीं है, इसलिए आज आप नीचे दिए **B1.church** modules को किसी scenario में नहीं जोड़ सकते। तब तक [Zapier](./zapier.md) का उपयोग करें, या Make के **HTTP — Make a request** module से [API key](/docs/developer/api/api-keys) के साथ B1 की [REST API](/docs/developer/api) को call करें। नीचे दिया गया सब कुछ बताता है कि app रिलीज़ होने के बाद कैसे काम करेगा।
:::

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [Make](https://www.make.com) account (मुफ़्त स्तर छोटे workflows के लिए काफ़ी है)
- B1Admin में **Edit Settings** अनुमति वाला एक चर्च admin
- आप जो scenario बनाना चाहते हैं उसका मोटा विचार

</div>

## Modules {#modules}

| प्रकार | क्या | B1 event / endpoint |
|---|---|---|
| **Instant Trigger** | Watch Events | कोई भी subscribed B1 event (`person.created`, `donation.created`, …) |
| **Action** | Create Person | एक नया व्यक्ति जोड़ता है |
| **Action** | Add Donation | एक donation दर्ज करता है |
| **Action** | Add Group Member | किसी व्यक्ति को group में जोड़ता है |
| **Search** | Search People | नाम या email से लोगों को खोजता है |

instant trigger आपको चुनने देता है कि कौन सा event सुनना है — हर scenario में एक trigger module, जो हर event के लिए अलग से कॉन्फ़िगर होता है।

## सेटअप {#setup}

### 1. B1 API key बनाएँ {#1-create-a-b1-api-key}

1. B1Admin में **Settings → Developer → API Keys** पर जाएँ।
2. **New API Key** पर क्लिक करें, उसका नाम "Make" रखें, और जो scopes चाहिए वे दें।
3. अगर आपके किसी scenario में instant trigger है तो **`settings:write` शामिल करें** — scenario चालू होने पर Make आपकी ओर से एक webhook रजिस्टर करता है।
4. action modules को चाहिए scopes भी दें (जैसे Add Donation module के लिए `donations:write`)।
5. सेव करें और `cak_…` key कॉपी करें।

### 2. Connection इंस्टॉल करें {#2-install-the-connection}

1. Make में नया scenario बनाएँ और canvas पर **B1.church** trigger module रखें।
2. पूछे जाने पर **Create a connection** करें। *API Key* फ़ील्ड में API key चिपकाएँ और *API Base URL* को `https://api.churchapps.org` ही रहने दें (जब तक आप staging पर परीक्षण न कर रहे हों)।
3. **Save** पर क्लिक करें — Make आपका चर्च profile पढ़कर key की जाँच करता है।

connection आपके Make account में सहेजा जाता है और scenarios के बीच दोबारा उपयोग होता है।

### 3. Trigger कॉन्फ़िगर करें {#3-configure-the-trigger}

1. **Watch Events** module की settings खोलें।
2. जो event चाहिए उसे चुनें — जैसे `donation.created`।
3. सेव करें। Make एक अनोखा webhook URL बनाता है और उसे आंतरिक रूप से संग्रहीत करता है।

### 4. आगे के modules जोड़ें {#4-add-downstream-modules}

Make के सैकड़ों app modules में से कोई भी canvas पर रखें — Mailchimp, Google Sheets, Slack, HubSpot, आपका अपना HTTP endpoint, आदि। trigger के आउटपुट (`event`, `churchId`, `data.id`, `data.amount`, …) को उनके input फ़ील्ड्स में map करें। Make के flatten / iterator / router / aggregator modules आपको ऐसे branching और parallel flows बनाने देते हैं जो Zapier में कठिन होते।

### 5. Scenario चालू करें {#5-turn-the-scenario-on}

scenario के header में **Active** टॉगल करें। Make URL रजिस्टर करने के लिए B1 का `POST /membership/webhooks` call करता है। उसी क्षण से, हर मेल खाने वाला B1 event वास्तविक समय में scenario से गुज़रता है।

scenario बंद करने पर `DELETE /membership/webhooks/{id}` call होता है ताकि कोई अनाथ subscription न रहे।

## सामान्य रेसिपी {#common-recipes}

### वित्त समीक्षा के लिए donations को Google Sheet में सिंक करें {#sync-donations-to-a-google-sheet-for-finance-review}

- **Trigger** — B1: Watch Events (`donation.created`)
- **Action** — Google Sheets: Add a Row। `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` को sheet के columns में map करें।

### donation की राशि के अनुसार शर्तीय Slack सूचना {#conditional-slack-notification-by-donation-amount}

- **Trigger** — B1: Watch Events (`donation.created`)
- **Router**:
  - Branch A — Filter: `data.amount >= 1000` → Slack: `#major-gifts` में पोस्ट करें
  - Branch B — fallthrough → Slack: `#donations` में पोस्ट करें

### नया व्यक्ति → CRM + स्वागत ईमेल + Slack {#new-person--crm--welcome-email--slack}

- **Trigger** — B1: Watch Events (`person.created`)
- **Action** — HubSpot: Create Contact
- **Action** — Mailgun: Send Welcome Email
- **Action** — Slack: `#new-people` को सूचित करें (समानांतर में — Make के router का उपयोग करके)

## Instant Trigger कैसे काम करता है {#how-the-instant-trigger-works}

instant trigger webhook-आधारित है, polling पर नहीं — सक्रिय होने पर Make अपने बनाए URL और चुने हुए event के साथ `POST /membership/webhooks` call करता है। जब B1 में event होता है, तो B1 envelope को Make के URL पर POST करता है और आपका scenario कुछ ही सेकंड में चलता है। scenario निष्क्रिय करने पर webhook हट जाता है।

trigger केवल उन events पर चलता है जो scenario **चालू रहते हुए** होते हैं। कोई backfill नहीं होता।

## सीमाएँ और नोट्स {#limits--notes}

- **हर Watch Events module में एक event।** कई events सुनने के लिए, हर event के लिए एक scenario बनाएँ।
- **Signature verification उपलब्ध नहीं है** — Make `X-B1-Signature` को scenario तक नहीं पहुँचाता; भरोसे की सीमा Make के अनुमान न लगाए जा सकने वाले प्रति-scenario webhook URL पर है। यह Make की सामान्य प्रथा है। अगर आपको स्पष्ट signature जाँच चाहिए, तो इसके बजाय [SDK](/docs/developer/api/webhooks#sdk-support) से एक custom integration बनाएँ।
- **Operation गिनती** — action module से हर API call आपके Make operations कोटा में गिना जाता है, B1 की ओर किसी चीज़ में नहीं।

## समस्या निवारण {#troubleshooting}

- **Connection test विफल** — ज़्यादातर API key में टाइपो के कारण। B1Admin से उसे फिर से कॉपी करें (पूरी key केवल एक बार दिखाई जाती है; अगर खो गई है, तो नई key बनाएँ)।
- **Trigger module सक्रिय नहीं होता** — B1Admin में **Settings → Developer → Webhooks** जाँचें। scenario सक्रिय करने के बाद अगर आपको "Make — &lt;event&gt;" पंक्ति नहीं दिखती, तो key में `settings:write` नहीं है। key अपडेट करें और फिर सक्रिय करें।
- **Action `403 Forbidden` लौटाता है** — API key में उस endpoint के लिए scope नहीं है। उदाहरण के लिए, Add Donation को `donations:write` चाहिए। B1Admin में key अपडेट करें और फिर से परीक्षण करें।

## कोई module गायब है? {#missing-a-module}

अगर आपको ऐसा module चाहिए जो मौजूद नहीं है (जैसे किसी ऐसे endpoint के लिए नया action जो हमने कवर नहीं किया), तो [support@churchapps.org](mailto:support@churchapps.org) पर ईमेल करें। तब तक, Make का **HTTP — Make a request** module `Authorization: Bearer cak_…` header के साथ किसी भी B1 endpoint को call कर सकता है।

## यह भी देखें {#see-also}

- [Zapier](./zapier.md) — वही पैटर्न, सरल UI और बड़े app catalog के साथ
- [Slack & Discord](./slack-discord.md) — Make के बिना अंतर्निहित chat सूचनाएँ
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
