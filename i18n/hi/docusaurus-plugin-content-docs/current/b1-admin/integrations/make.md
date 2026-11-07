---
title: "Make"
description: "Make से B1 Admin को जोड़कर वर्कफ़्लो स्वचालित करें: API कुंजी बनाएँ, B1.church ट्रिगर और क्रियाएँ सेट करें, और आम त्रुटियों का समाधान करें।"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (पहले Integromat) एक विज़ुअल वर्कफ़्लो ऑटोमेशन प्लेटफ़ॉर्म है। इसका मूल विचार Zapier जैसा ही है, लेकिन इसमें अधिक लचीला लॉजिक है और बड़े पैमाने पर इस्तेमाल करने पर लागत कम आती है। आधिकारिक B1.church Make ऐप की मदद से आप "scenarios" बना सकते हैं, जो B1 के इवेंट होते ही तुरंत प्रतिक्रिया देते हैं और B1 में रिकॉर्ड वापस लिखते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [Make](https://www.make.com) अकाउंट (मुफ़्त टियर छोटे वर्कफ़्लो के लिए काफ़ी है)
- B1Admin में **Edit Settings** अनुमति वाला चर्च एडमिन
- आप जो scenario बनाना चाहते हैं, उसका मोटा अंदाज़ा

</div>

## मॉड्यूल

| प्रकार | क्या करता है | B1 इवेंट / एंडपॉइंट |
|---|---|---|
| **Instant Trigger** | Watch Events | कोई भी सब्सक्राइब किया गया B1 इवेंट (`person.created`, `donation.created`, …) |
| **Action** | Create Person | एक नया व्यक्ति जोड़ता है |
| **Action** | Add Donation | दान दर्ज करता है |
| **Action** | Add Group Member | किसी व्यक्ति को ग्रुप में जोड़ता है |
| **Search** | Search People | नाम या ईमेल से लोगों को खोजता है |

Instant trigger आपको चुनने देता है कि कौन-सा इवेंट सुनना है। हर scenario में एक trigger मॉड्यूल होता है, जिसे हर इवेंट के लिए अलग से कॉन्फ़िगर किया जाता है।

## सेटअप

### 1. B1 API key बनाएँ

1. B1Admin में **Settings → Developer → API Keys** पर जाएँ।
2. **New API Key** पर क्लिक करें, उसका नाम "Make" रखें और जिन scopes की ज़रूरत है, वे दें।
3. अगर आपके किसी scenario में instant trigger है, तो **`settings:write` शामिल करें**। Scenario चालू होने पर Make आपकी ओर से एक webhook रजिस्टर करता है।
4. Action मॉड्यूल के लिए ज़रूरी scopes भी दें (जैसे Add Donation मॉड्यूल के लिए `donations:write`)।
5. सेव करें और `cak_…` key कॉपी कर लें।

### 2. कनेक्शन इंस्टॉल करें

1. Make में नया scenario बनाएँ और **B1.church** trigger मॉड्यूल को कैनवास पर डालें।
2. पूछे जाने पर **Create a connection** चुनें। API key को *API Key* फ़ील्ड में चिपकाएँ और *API Base URL* को `https://api.churchapps.org` पर ही रहने दें (जब तक आप staging पर टेस्ट न कर रहे हों)।
3. **Save** पर क्लिक करें। Make आपकी चर्च प्रोफ़ाइल पढ़कर key की जाँच करता है।

यह कनेक्शन आपके Make अकाउंट में सेव रहता है और सभी scenarios में दोबारा इस्तेमाल होता है।

### 3. Trigger कॉन्फ़िगर करें

1. **Watch Events** मॉड्यूल की सेटिंग्स खोलें।
2. वह इवेंट चुनें जो चाहिए, जैसे `donation.created`।
3. सेव करें। Make एक अनोखा webhook URL बनाता है और उसे अपने भीतर सेव कर लेता है।

### 4. आगे के मॉड्यूल जोड़ें

Make के सैकड़ों ऐप मॉड्यूल में से कोई भी कैनवास पर डालें, जैसे Mailchimp, Google Sheets, Slack, HubSpot, या आपका अपना HTTP endpoint। Trigger का आउटपुट (`event`, `churchId`, `data.id`, `data.amount`, …) उनके इनपुट फ़ील्ड में मैप करें। Make के flatten, iterator, router और aggregator मॉड्यूल आपको ऐसे branching और parallel flows बनाने देते हैं, जो Zapier में कठिन होते।

### 5. Scenario चालू करें

Scenario के हेडर में **Active** टॉगल करें। Make B1 के `POST /membership/webhooks` को कॉल करके URL रजिस्टर करता है। उसी क्षण से, हर मेल खाने वाला B1 इवेंट रीयल टाइम में इस scenario से होकर गुज़रता है।

Scenario बंद करने पर `DELETE /membership/webhooks/{id}` कॉल होता है, ताकि कोई बेकार subscription न बचे।

## आम रेसिपी

### वित्त समीक्षा के लिए दान Google Sheet में सिंक करें

- **Trigger** — B1: Watch Events (`donation.created`)
- **Action** — Google Sheets: Add a Row। `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` को शीट के कॉलम में मैप करें।

### दान की रकम के आधार पर शर्तीय Slack सूचना

- **Trigger** — B1: Watch Events (`donation.created`)
- **Router**:
  - शाखा A — Filter: `data.amount >= 1000` → Slack: `#major-gifts` में पोस्ट करें
  - शाखा B — बाकी सभी स्थितियाँ → Slack: `#donations` में पोस्ट करें

### नया व्यक्ति → CRM + स्वागत ईमेल + Slack

- **Trigger** — B1: Watch Events (`person.created`)
- **Action** — HubSpot: Create Contact
- **Action** — Mailgun: Send Welcome Email
- **Action** — Slack: `#new-people` को सूचित करें (समानांतर में, Make के router का उपयोग करके)

## Instant Trigger कैसे काम करता है

Instant trigger polling पर नहीं, webhook पर आधारित है। चालू होने पर Make अपने बनाए URL और आपके चुने इवेंट के साथ `POST /membership/webhooks` कॉल करता है। जब B1 में इवेंट होता है, तो B1 उसका envelope Make के URL पर POST करता है और आपका scenario कुछ ही सेकंड में चल पड़ता है। Scenario बंद करने पर webhook हट जाता है।

Trigger केवल उन इवेंट्स पर चलता है जो **scenario के सक्रिय रहने के दौरान** होते हैं। पुराने इवेंट्स का बैकफ़िल नहीं होता।

## सीमाएँ और नोट्स

- **हर Watch Events मॉड्यूल में एक इवेंट।** एक ही scenario में कई इवेंट सुनने के लिए, अलग-अलग scenarios में कई trigger मॉड्यूल डालें (या इवेंट सूची को मिलाकर एक ही मॉड्यूल का उपयोग करें, नीचे देखें)।
- **Signature सत्यापन उपलब्ध नहीं है।** Make `X-B1-Signature` को scenario तक नहीं पहुँचाता। भरोसे की सीमा Make के हर scenario के लिए अनुमान न लगाए जा सकने वाले webhook URL पर टिकी है। यह Make की सामान्य प्रथा है। अगर आपको स्पष्ट signature जाँच चाहिए, तो [SDK](/docs/developer/api/webhooks#sdk-support) से एक कस्टम इंटीग्रेशन बनाएँ।
- **ऑपरेशन गिनती।** Action मॉड्यूल की हर API कॉल आपके Make ऑपरेशन कोटे में गिनी जाती है, B1 की ओर से उस पर कोई शुल्क नहीं लगता।

## समस्या-निवारण

- **कनेक्शन टेस्ट विफल होता है**: ज़्यादातर API key में टाइपो होता है। B1Admin से दोबारा कॉपी करें (पूरी key केवल एक बार दिखाई जाती है; खो गई हो तो नई key बनाएँ)।
- **Trigger मॉड्यूल सक्रिय नहीं होता**: B1Admin में **Settings → Developer → Webhooks** देखें। Scenario चालू करने के बाद अगर "Make — &lt;event&gt;" वाली पंक्ति नहीं दिखती, तो key में `settings:write` नहीं है। Key अपडेट करें और scenario दोबारा चालू करें।
- **Action `403 Forbidden` लौटाता है**: API key के पास उस endpoint का scope नहीं है। उदाहरण के लिए, Add Donation को `donations:write` चाहिए। B1Admin में key अपडेट करें और दोबारा टेस्ट करें।

## ऐप को अनुकूलित करना

B1.church Make ऐप ओपन सोर्स है। JSON परिभाषाएँ `B1Integrations/Make/` रिपॉज़िटरी में हैं। अगर आपको कोई ऐसा मॉड्यूल चाहिए जो मौजूद नहीं है (जैसे किसी ऐसे endpoint के लिए नया action जिसे हमने कवर नहीं किया), तो वहाँ issue या PR खोलें।

## यह भी देखें

- [Zapier](./zapier.md) — वही पैटर्न, सरल UI और बड़ी ऐप सूची के साथ
- [Slack & Discord](./slack-discord.md) — Make के बिना बनी चैट सूचनाएँ
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
