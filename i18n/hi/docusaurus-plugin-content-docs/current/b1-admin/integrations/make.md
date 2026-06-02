---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (पहले Integromat) एक visual workflow automation platform है — Zapier के समान spirit में, अधिक flexible logic और scale में एक सस्ता बिल के साथ। आधिकारिक B1.church Make app आपको "scenarios" बनाने देता है जो B1 events पर तुरंत प्रतिक्रिया करते हैं और B1 में records को वापस लिखते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [Make](https://www.make.com) खाता (free tier छोटे workflows को cover करता है)
- B1Admin में **Edit Settings** अनुमति वाला एक चर्च प्रशासक
- आप जो scenario बनाना चाहते हैं उसका एक rough idea

</div>

## Modules

| Type | क्या | B1 event / endpoint |
|---|---|---|
| **Instant Trigger** | Watch Events | कोई भी subscribed B1 event (`person.created`, `donation.created`, …) |
| **Action** | Create Person | एक नया व्यक्ति जोड़ता है |
| **Action** | Add Donation | एक दान records करता है |
| **Action** | Add Group Member | किसी को एक group में जोड़ता है |
| **Search** | Search People | नाम या email द्वारा लोगों को खोजता है |

instant trigger आपको pick करने देता है कि किस event को सुनना है — एक scenario प्रति trigger module, event per configured।

## सेटअप

### 1. एक B1 API कुंजी बनाएं

1. B1Admin में **Settings → Developer → API Keys** पर जाएं।
2. **New API Key** पर क्लिक करें, इसे "Make" नाम दें, और आपको जो scopes चाहिए वह प्रदान करें।
3. **Include `settings:write`** यदि आपके किसी भी scenarios instant trigger का उपयोग करते हैं — Make scenario को चालू करते समय आपकी ओर से एक webhook registers करता है।
4. action modules को जरूरत वाले scopes को भी प्रदान करें (उदाहरण के लिए Add Donation module के लिए `donations:write`)।
5. सहेजें और `cak_…` कुंजी की प्रतिलिपि बनाएं।

### 2. connection को स्थापित करें

1. Make में, एक नया scenario बनाएं और **B1.church** trigger module को canvas पर ड्रॉप करें।
2. जब prompted, **Create a connection**। API कुंजी को *API Key* field में पेस्ट करें और *API Base URL* को `https://api.churchapps.org` के रूप में छोड़ दें (जब तक आप staging के विरुद्ध परीक्षण नहीं कर रहे)।
3. **Save** पर क्लिक करें — Make आपके चर्च profile को reading द्वारा कुंजी को परीक्षण करता है।

connection आपके Make account पर saved है और scenarios में reused है।

### 3. trigger को कॉन्फ़िगर करें

1. **Watch Events** module की सेटिंग को खोलें।
2. वह event pick करें जो आप चाहते हैं — उदाहरण के लिए `donation.created`।
3. सहेजें। Make एक अद्वितीय webhook URL generate करता है और इसे internally store करता है।

### 4. downstream modules जोड़ें

Make के सैकड़ों app modules को canvas पर ड्रॉप करें — Mailchimp, Google Sheets, Slack, HubSpot, आपका स्वयं का HTTP endpoint, आदि। trigger के output (`event`, `churchId`, `data.id`, `data.amount`, …) को उनके input fields में map करें। Make के flatten / iterator / router / aggregator modules आपको branching और parallel flows बनाने देते हैं जो Zapier में कठिन होंगे।

### 5. scenario को चालू करें

scenario header में **Active** को toggle करें। Make `POST /membership/webhooks` को B1 के लिए URL को register करने के लिए call करता है। उस क्षण से, हर matching B1 event real time में scenario के माध्यम से flows करता है।

scenario को बंद करने से `DELETE /membership/webhooks/{id}` को call किया जाता है ताकि कोई orphan subscriptions न हों।

## सामान्य Recipes

### donations को finance review के लिए एक Google Sheet में sync करें

- **Trigger** — B1: Watch Events (`donation.created`)
- **Action** — Google Sheets: Add a Row। Map `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` को sheet के columns में।

### donation amount द्वारा conditional Slack notification

- **Trigger** — B1: Watch Events (`donation.created`)
- **Router**:
  - Branch A — Filter: `data.amount >= 1000` → Slack: `#major-gifts` में post करें
  - Branch B — fallthrough → Slack: `#donations` में post करें

### New person → CRM + welcome email + Slack

- **Trigger** — B1: Watch Events (`person.created`)
- **Action** — HubSpot: Create Contact
- **Action** — Mailgun: Send Welcome Email
- **Action** — Slack: `#new-people` को notify करें (parallel में — Make के router का उपयोग करें)

## Instant Trigger कैसे काम करता है

instant trigger webhook-backed है, polling नहीं — जब activated, Make `POST /membership/webhooks` को अपने generated URL और आपकी चुनी हुई event के साथ कॉल करता है। जब event B1 में fires, B1 envelope को Make के URL पर POSTs करता है और आपका scenario सेकंड के अंदर चलता है। scenario को deactivate करने से webhook को remove किया जाता है।

trigger केवल events के लिए fires जो **scenario active होने के दौरान होते हैं**। कोई backfill नहीं है।

## Limits & Notes

- **One event per Watch Events module।** कई events को एक scenario में सुनने के लिए, अलग scenarios में कई trigger modules को ड्रॉप करें (या एकल module को union event list के साथ use करें — नीचे देखें)।
- **Signature verification expose नहीं है** — Make `X-B1-Signature` को scenario के माध्यम से pass नहीं करता; trust boundary Make के unguessable per-scenario webhook URL है। यह normal Make practice है। यदि आपको explicit signature checks की आवश्यकता है, तो [SDK](/docs/developer/api/webhooks#sdk-support) के साथ एक custom integration बनाएं।
- **Operation count** — एक action module से हर API कॉल Make के operations quota के विरुद्ध count करता है, B1 के side में कुछ भी नहीं।

## समस्या निवारण

- **Connection test fails** — अक्सर API कुंजी में एक typo। B1Admin से इसे फिर से कॉपी करें (पूर्ण कुंजी केवल एक बार दिखाई जाती है; यदि आपने इसे खो दिया है, एक नई कुंजी बनाएं)।
- **Trigger module activate नहीं होता** — B1Admin में **Settings → Developer → Webhooks** को check करें। यदि आप scenario को activate करने के बाद "Make — &lt;event&gt;" row नहीं देखते, तो कुंजी में `settings:write` गायब है। कुंजी को अपडेट करें और फिर से activate करें।
- **Action returns `403 Forbidden`** — API कुंजी के पास उस endpoint के लिए scope नहीं है। उदाहरण के लिए, Add Donation को `donations:write` चाहिए। B1Admin में कुंजी को अपडेट करें और फिर से test करें।

## App को कस्टमाइज़ करना

B1.church Make app open source है — JSON definitions `B1Integrations/Make/` repo में रहते हैं। यदि आपको एक module की आवश्यकता है जो मौजूद नहीं है (उदाहरण के लिए एक endpoint के लिए एक नया action जिसे हमने cover नहीं किया), वहां एक issue या PR खोलें।

## यह भी देखें

- [Zapier](./zapier) — एक simpler UI और एक बड़े app catalog के साथ same pattern
- [Slack & Discord](./slack-discord) — Make के बिना built-in chat notifications
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
