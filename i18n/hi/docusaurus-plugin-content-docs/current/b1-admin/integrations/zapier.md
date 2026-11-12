---
title: "Zapier"
description: "नए लोगों, donations, और group members पर Zaps शुरू करने के लिए Zapier को B1 Admin से जोड़ें, और बिना कोडिंग के B1 में रिकॉर्ड वापस लिखें।"
---

# Zapier

<div class="article-intro">

Zapier पर आधिकारिक B1.church ऐप एक Zap को आपके चर्च की घटनाओं (नया व्यक्ति, नया donation, नया group member, …) पर प्रतिक्रिया देने देता है और B1 में रिकॉर्ड वापस लिखता है। कोई कोडिंग नहीं, कोई बुनियादी ढाँचा नहीं — आप इसे Zapier के drag-and-drop editor में वायर करते हैं, एक API key चिपकाते हैं, और Zap चालू कर देते हैं।

</div>

:::caution Zapier की स्वीकृति की प्रतीक्षा
B1.church ऐप बनकर काम कर रहा है, पर Zap editor की app directory में सार्वजनिक रूप से दिखने से पहले वह अब भी Zapier की समीक्षा की प्रतीक्षा में है। स्वीकृति तक केवल आमंत्रित accounts इसका उपयोग कर सकते हैं। नीचे का सब कुछ बताता है कि स्वीकृति के बाद यह कैसे काम करेगा।
:::

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [Zapier](https://zapier.com) account (मुफ़्त स्तर कुछ Zaps के लिए काफ़ी है)
- B1Admin में **Edit Settings** अनुमति वाला एक चर्च admin (आप एक API key बनाएँगे)
- इसका विचार कि आप क्या करना चाहते हैं — जैसे "जब B1 में कोई व्यक्ति जुड़े, तो उसे मेरी Mailchimp सूची में जोड़ो"

</div>

## Triggers और Actions {#triggers-and-actions}

| प्रकार | क्या | B1 event / endpoint |
|---|---|---|
| **Trigger** | New Person | `person.created` |
| **Trigger** | Updated Person | `person.updated` |
| **Trigger** | New Donation | `donation.created` |
| **Trigger** | New Group Member | `group.member.added` |
| **Trigger** | New Form Submission | `form.submission.created` |
| **Action** | Create Person | एक नया व्यक्ति जोड़ता है |
| **Action** | Add Donation | एक donation दर्ज करता है |
| **Action** | Add Group Member | किसी व्यक्ति को group में जोड़ता है |
| **Action** | Find Person | id, email, या नाम से व्यक्ति खोजता है; कोई मेल न होने पर कार्य विफल करता है |

इन्हें Zapier के 7,000+ समर्थित ऐप्स में से किसी के भी साथ स्वतंत्र रूप से जोड़ा जा सकता है।

## सेटअप {#setup}

### 1. B1 API key बनाएँ {#1-create-a-b1-api-key}

1. B1Admin में **Settings → Developer → API Keys** पर जाएँ।
2. **New API Key** पर क्लिक करें, उसे "Zapier" जैसा नाम दें, और Zap को जिन scopes की ज़रूरत है उन्हें चुनें।
3. **ज़रूरी:** हमेशा **`settings:write`** scope शामिल करें। जब आप connect करते हैं तो Zapier key को B1 की webhook सूची से मिलाता है, और जब Zap चालू होता है तो B1 triggers आपकी ओर से एक webhook रजिस्टर करते हैं — दोनों को `settings:write` चाहिए। इसके बिना key connection test में विफल होती है, भले ही आपके Zaps केवल B1 actions इस्तेमाल करें।
4. action के लिए ज़रूरी scopes भी दें — जैसे "Add Donation" action को `donations:write` चाहिए, "Create Person" को `people:write`।
5. सेव करें। पूरी `cak_…` key **एक बार** दिखाई जाती है — उसे कॉपी करें।

### 2. Zapier को B1 से जोड़ें {#2-connect-zapier-to-b1}

1. Zapier में एक नया Zap बनाएँ।
2. जब आप पहली बार कोई B1 trigger या action चुनते हैं, तो Zapier **Sign in to B1.church** के लिए पूछता है।
3. चरण 1 की key **API Key** में चिपकाएँ (**API URL** खाली छोड़ें) और **Yes, Continue** पर क्लिक करें। Zapier उसे आपके चर्च के विरुद्ध सत्यापित करता है।

connection Zapier में सहेजा जाता है और आपके account के हर Zap द्वारा दोबारा उपयोग होता है।

### 3. Zap बनाएँ {#3-build-the-zap}

एक trigger चुनें, फिर एक या अधिक action चरण जोड़ें। नीचे उदाहरण हैं।

## सामान्य रेसिपी {#common-recipes}

### नए B1 लोगों को Mailchimp में जोड़ें {#add-new-b1-people-to-mailchimp}

- **Trigger** — B1: New Person
- **Action** — Mailchimp: Add/Update Subscriber। B1 के `name__first`, `name__last`, `contactInfo__email` को Mailchimp के First Name / Last Name / Email फ़ील्ड्स में map करें।

### Slack channel पर donations को उस अंतर्निहित connector से समृद्ध कार्ड के साथ पोस्ट करें {#post-donations-to-a-slack-channel-with-a-richer-card-than-the-built-in-connector}

- **Trigger** — B1: New Donation
- **Action** — Slack: Send Channel Message। कोई भी लेआउट बनाएँ — buttons, attachments, आदि — जो [Slack connector](./slack-discord.md) नहीं कर सकता।

### नए group members को Google Group में जोड़ें {#add-new-group-members-to-a-google-group}

- **Trigger** — B1: New Group Member
- **Action** — Zapier द्वारा Filter: केवल तभी आगे बढ़ें जब trigger का `groupId` वही B1 group हो जिसकी आपको परवाह है
- **Action** — B1: Find Person (email लाने के लिए trigger के `personId` का उपयोग करें)
- **Action** — Google Groups: Add Member

### form submissions को project tracker पर भेजें {#forward-form-submissions-to-a-project-tracker}

- **Trigger** — B1: New Form Submission
- **Action** — Notion / Linear / Asana / Trello: page / issue / task बनाएँ

## Triggers पर्दे के पीछे कैसे काम करते हैं {#how-triggers-work-under-the-hood}

Triggers **REST hooks** हैं, polling नहीं — Zapier हर 15 मिनट में B1 को ping नहीं करता। जब आप Zap चालू करते हैं, तो Zapier B1 से एक निजी Zapier URL की ओर इशारा करता webhook रजिस्टर करने को कहता है; जब event फ़ायर होता है, तो B1 envelope को Zapier पर POST करता है और आपका Zap **कुछ ही सेकंड में** शुरू हो जाता है। Zap बंद करें और Zapier B1 से webhook हटाने को कहता है — कोई अनाथ subscriptions नहीं।

इसका मतलब है कि trigger केवल वे events फ़ायर करता है जो Zap चालू होने **के बाद** होते हैं। कोई backfill नहीं — Zap चालू करने से कल के donations फिर से नहीं चलते।

## सीमाएँ और नोट्स {#limits--notes}

- **एक ही trigger वाले कई Zaps** हर एक अपना B1 webhook रजिस्टर करते हैं — कोई टकराव नहीं, पर अगर आप **Settings → Developer → Webhooks** देख रहे हैं और सोचते हैं कि तीन एक जैसी `Zapier — donation.created` पंक्तियाँ क्यों हैं, तो यह जानना उपयोगी है।
- **Zap setup में परीक्षण डेटा** — Zap बनाते समय Zapier फ़ील्ड्स map करने के लिए नमूना डेटा माँगता है। अगर B1 में कोई हाल का मेल खाने वाला event है, तो वह उसे खींचता है; अन्यथा ऐप परिभाषा से एक कृत्रिम नमूना उपयोग करता है।
- **Action विफलताएँ Zapier के task इतिहास में Zap त्रुटियों के रूप में दिखती हैं।** आम कारण: सही scope के बिना API key (जैसे "Add Donation" action को `donations:write` चाहिए)। सही scopes के साथ key फिर से बनाएँ और Zapier में फिर से जोड़ें।
- **बाहरी API call कोटा** — action से हर B1 API call आपके Zapier task कोटा में गिना जाता है, B1 की ओर किसी चीज़ में नहीं।

## समस्या निवारण {#troubleshooting}

- **connect करते समय "Authentication failed"** — API key गलत है, हटा दी गई है, या उसमें `settings:write` नहीं है। B1Admin में `settings:write` और Zap जिन resource scopes को छूता है उनके साथ नई key बनाएँ (मौजूदा key के scopes सीधे नहीं बदले जा सकते), फिर connection अपडेट करें।
- **Trigger कभी फ़ायर नहीं होता** — पुष्टि करें कि webhook वास्तव में रजिस्टर हुआ: B1Admin में **Settings → Developer → Webhooks** में अब "Zapier — &lt;event&gt;" नाम की पंक्ति दिखनी चाहिए। अगर वह नहीं है, तो शायद Zap चालू करते समय API key में `settings:write` नहीं था। key ठीक करें, Zap बंद करें और फिर चालू करें।
- **Trigger दो बार फ़ायर होता है** — अगर acknowledgement खो गया तो Zapier कभी-कभी फिर से भेजता है। सख्त deduplication चाहिए तो किसी अनोखी id (जैसे व्यक्ति की `id`) पर "Filter by Zapier" चरण का उपयोग करें।

## यह भी देखें {#see-also}

- [Make](./make.md) — वही पैटर्न, अलग platform
- [Slack & Discord](./slack-discord.md) — Zapier के बिना सरल chat सूचनाएँ
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
