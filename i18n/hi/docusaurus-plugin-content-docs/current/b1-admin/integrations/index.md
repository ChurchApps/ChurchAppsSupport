---
title: "Integrations"
description: "B1 Admin को Slack, Discord, Zapier, Make, Google Sheets, और Claude जैसे AI सहायकों से जोड़ें, हर एक के लिए सेटअप चरण और आवश्यक API key scopes के साथ।"
---

# Integrations

<div class="article-intro">

B1 आपकी टीम के पहले से उपयोग किए जा रहे उपकरणों से जुड़ता है। staff सूचनाओं के लिए Slack या Discord जोड़ें, Zapier या Make में workflows स्वचालित करें, या Google Sheets में मांग पर डेटा निर्यात करें — बिना अलग integration platform के पैसे दिए और बिना ChurchApps द्वारा कुछ अतिरिक्त होस्ट किए। हर integration तीसरे पक्ष के अपने infrastructure पर चलता है और B1 के webhooks या REST API के माध्यम से आपके चर्च से बात करता है।

</div>

## क्या उपलब्ध है {#whats-available}

| Integration | यह क्या करता है | दिशा | सेटअप में लगने वाला प्रयास |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Slack channel में पढ़ने योग्य सूचनाएँ (नए लोग, donations, sign-ups, …) पोस्ट करता है | B1 → Slack | 2 मिनट |
| **[Discord](./slack-discord.md)** | वही, Discord channel में | B1 → Discord | 2 मिनट |
| **[Zapier](./zapier.md)** | Zapier के 7,000+ ऐप्स में से किसी में भी B1 events को triggers और B1 actions के रूप में उपयोग करें (Zapier की स्वीकृति की प्रतीक्षा है) | दोनों | प्रति Zap 5–10 मिनट |
| **[Make](./make.md)** | Zapier जैसा ही विचार, Make के visual scenario builder में (अभी रिलीज़ नहीं हुआ) | दोनों | प्रति scenario 5–10 मिनट |
| **[Google Sheets](./google-sheets.md)** | People / Donations / Groups / Attendance को मांग पर spreadsheet में निर्यात करें (अभी रिलीज़ नहीं हुआ) | B1 → Sheet | 5 मिनट |
| **[Claude](./claude.md)** | Anthropic के Claude से अपने चर्च के डेटा के बारे में पूछें, आपकी अनुमतियों के दायरे में — आज़माना मुफ़्त है, अनुशंसित | दोनों | 3 मिनट से कम |
| **[ChatGPT](./chatgpt.md)** | OpenAI के ChatGPT के साथ वही विचार (भुगतान वाला ChatGPT plan चाहिए) | दोनों | 10 मिनट |
| **[Mailchimp](./services/mailchimp.md)** | अपने लोगों, groups, और सहेजी गई सूचियों के साथ Mailchimp audience को सिंक रखें — B1 में अंतर्निहित | B1 → Mailchimp | 5 मिनट |
| **[जुड़ी हुई सेवाएँ](./services/index.md)** | Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr के लिए चुनी हुई विधियाँ | अलग-अलग | प्रत्येक के लिए 5–10 मिनट |

## कैसे चुनें {#how-to-pick}

- **बस chat में एक सूचना चाहिए?** **Slack** या **Discord** का उपयोग करें — किसी तीसरे पक्ष के account की ज़रूरत नहीं, संभालने के लिए कोई Zap नहीं। पूरी तरह B1Admin के अंदर कॉन्फ़िगर होता है।
- **ऐप्स के बीच कुछ स्वचालित करना चाहते हैं** (जैसे "जब कोई दान करे, तो उसे मेरी Mailchimp सूची और Slack #donations में जोड़ो")? **Zapier** या **Make** का उपयोग करें। Zapier आसान है; Make बड़े पैमाने पर सस्ता है और उसका तर्क अधिक लचीला है।
- **एक बार का डेटा निकालना या निर्धारित रिपोर्ट चाहिए?** **Google Sheets** का उपयोग करें — add-on के sidebar में API key चिपकाएँ और Export पर क्लिक करें।
- **सरल भाषा में सवाल पूछना चाहते हैं** ("पिछले रविवार कितने पहली बार आने वाले मेहमान थे?", "इस महीने की giving का सारांश दो")? **[Claude](./claude.md)** से शुरू करें — आज़माना मुफ़्त है और 3 मिनट से कम में सेट हो जाता है। **[ChatGPT](./chatgpt.md)** भी भुगतान वाले plan के साथ काम करता है। Claude अपने B1 account से साइन इन करके जुड़ता है; ChatGPT B1 API key का उपयोग करता है।
- **अपनी खुद की custom integration बना रहे हैं?** ऊपर में से कोई नहीं — [API key](/docs/developer/api/api-keys) के साथ सीधे [REST API](/docs/developer/api) से बात करें, या अपने नियंत्रण वाले server को [webhooks](/docs/developer/api/webhooks) की सदस्यता दें।

## इनमें क्या समान है {#what-they-have-in-common}

सब कुछ B1Admin में **Settings → Developer** के अंतर्गत सेट होता है, जिसमें तीन tabs हैं: **API Keys**, **Webhooks**, और **Connected Apps**।

- **Slack, Discord, और Mailchimp** वे webhooks हैं जिन्हें आप **Webhooks** tab पर खुद बनाते हैं (मेल खाता **Connector Type** चुनें)। इन्हें API key की ज़रूरत नहीं होती।
- **Claude** (अपने B1 account से साइन इन करके) **Connected Apps** tab पर दिखता है, जहाँ आप उसे रद्द कर सकते हैं।
- **Zapier, Make, Google Sheets, ChatGPT, और key वाला Claude** एक **B1 API key** से प्रमाणित होते हैं, जो **API Keys** tab पर बनती है। key:

  - उस व्यक्ति से बंधी होती है जिसने उसे बनाया और उस व्यक्ति की अनुमतियाँ लेती है
  - **scopes** से सीमित की जा सकती है — उदाहरण के लिए Google Sheets निर्यात को केवल `people:read` चाहिए, `settings:write` नहीं
  - किसी भी समय हटाई जा सकती है, जिससे integration की पहुँच तुरंत रुक जाती है और कुछ और प्रभावित नहीं होता

कुछ connectors (Zapier, Make) Zap या scenario चालू होने पर आपकी ओर से एक [webhook](/docs/developer/api/webhooks) भी रजिस्टर करते हैं, और Zap बंद होने पर उसे हटा देते हैं — webhook URL आपको खुद प्रबंधित नहीं करना होता।

:::tip
Zapier और Make के webhooks अपने-आप रजिस्टर करने के लिए, API key में **`settings:write`** scope (साथ ही integration जो भी छूता है उसके resource scopes) होना चाहिए। केवल-पढ़ने वाली key actions और निर्यात के लिए काम करती है, पर triggers के लिए नहीं।
:::

## लागत {#cost}

ChurchApps मुफ़्त और open-source है। Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), और आधिकारिक Zapier / Make / Google Sheets connectors भी हमारी ओर से मुफ़्त हैं। तीसरे पक्ष अपने platforms के लिए शुल्क ले सकते हैं (Zapier और Make दोनों में उदार मुफ़्त स्तर हैं; इस उद्देश्य के लिए Slack, Discord, और Google Sheets मुफ़्त हैं)।

## अपना खुद का बनाना {#building-your-own}

अगर ऊपर का कोई भी विकल्प फ़िट नहीं बैठता, तो B1 का हर सतह खुला है:

- **[REST API](/docs/developer/api)** — `Authorization: Bearer cak_…` header के साथ किसी भी भाषा से B1 को call करें
- **[Webhooks](/docs/developer/api/webhooks)** — एक सार्वजनिक HTTPS endpoint को एक या अधिक event प्रकारों की सदस्यता दें और हस्ताक्षरित JSON payloads प्राप्त करें
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — अगर आप एक SaaS उत्पाद बना रहे हैं जिसे कई चर्च उपयोग करते हैं

## अगले चरण {#next-steps}

- [Slack & Discord](./slack-discord.md) — chat सूचनाएँ पोस्ट करें
- [Zapier](./zapier.md) — 7,000+ ऐप्स से जुड़ें
- [Make](./make.md) — visual workflow स्वचालन
- [Google Sheets](./google-sheets.md) — spreadsheets में निर्यात करें
- [Claude](./claude.md) — Anthropic के Claude से अपने चर्च के डेटा के बारे में पूछें
- [ChatGPT](./chatgpt.md) — OpenAI के ChatGPT से अपने चर्च के डेटा के बारे में पूछें
- [जुड़ी हुई सेवाएँ](./services/index.md) — सेवा-विशिष्ट विधियाँ (Mailchimp, Donorbox, Clearstream, …)
