---
title: "इंटीग्रेशन"
---

# इंटीग्रेशन {#integrations}

<div class="article-intro">

B1 आपकी टीम द्वारा पहले से उपयोग किए जा रहे tools से जुड़ता है। staff notifications के लिए Slack या Discord जोड़ें, Zapier या Make में workflows स्वचालित करें, या Google Sheets में मांग पर डेटा export करें -- बिना अलग integration platform के पैसे दिए और बिना ChurchApps की ओर से कुछ अतिरिक्त होस्ट किए। हर integration तीसरे पक्ष के अपने infrastructure पर चलता है और B1 के webhooks या REST API के माध्यम से आपके church से बात करता है।

</div>

## क्या उपलब्ध है {#whats-available}

| इंटीग्रेशन | यह क्या करता है | दिशा | सेटअप में लगने वाला समय |
|---|---|---|---|
| **[Slack](./slack-discord)** | किसी Slack channel पर पढ़ने योग्य notifications पोस्ट करें (नए लोग, donations, sign-ups, …) | B1 → Slack | 2 मिनट |
| **[Discord](./slack-discord)** | वही, किसी Discord channel में | B1 → Discord | 2 मिनट |
| **[Zapier](./zapier)** | B1 इवेंट्स को triggers के रूप में, और Zapier के 7,000+ apps में B1 actions का उपयोग करें | दोनों | हर Zap के लिए 5–10 मिनट |
| **[Make](./make)** | Zapier जैसा ही विचार, Make के visual scenario builder में | दोनों | हर scenario के लिए 5–10 मिनट |
| **[Google Sheets](./google-sheets)** | People / Donations / Groups / Attendance को मांग पर एक spreadsheet में export करें | B1 → Sheet | 5 मिनट |
| **[Claude](./claude)** | Anthropic के Claude से अपने church के डेटा के बारे में सवाल पूछें, आपकी permissions के दायरे में — मुफ़्त में आज़माएं, अनुशंसित | दोनों | 3 मिनट से कम |
| **[ChatGPT](./chatgpt)** | वही विचार OpenAI के ChatGPT के साथ (paid ChatGPT plan की ज़रूरत है) | दोनों | 10 मिनट |
| **[Connected services](./services/)** | Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr के लिए curated recipes | अलग-अलग | हर एक के लिए 5–10 मिनट |

## कौन सा चुनें {#how-to-pick}

- **बस chat में एक notification चाहिए?** **Slack** या **Discord** का उपयोग करें -- कोई तीसरे पक्ष का account नहीं, कोई Zap रखरखाव नहीं। सब कुछ B1Admin के भीतर कॉन्फ़िगर होता है।
- **कई apps में कुछ स्वचालित करना चाहते हैं** (जैसे "जब कोई दान दे, तो उसे मेरी Mailchimp list और Slack #donations में जोड़ें")? **Zapier** या **Make** का उपयोग करें। Zapier अधिक सरल है; Make बड़े पैमाने पर सस्ता है और उसका logic अधिक लचीला है।
- **एक बार का डेटा निकालना या नियमित रिपोर्ट चाहिए?** **Google Sheets** का उपयोग करें -- add-on के sidebar में एक API key पेस्ट करें और Export पर click करें।
- **सादी भाषा में सवाल पूछना चाहते हैं** ("पिछले रविवार कितने पहली बार आने वाले visitors थे?", "इस महीने के giving का सारांश दें")? **[Claude](./claude)** से शुरू करें — इसे मुफ़्त में आज़मा सकते हैं और यह 3 मिनट से भी कम में सेट हो जाता है। **[ChatGPT](./chatgpt)** भी paid plan के साथ काम करता है। Claude आपके B1 account से sign in करके जुड़ता है; ChatGPT एक B1 API key का उपयोग करता है।
- **अपना custom integration बना रहे हैं?** ऊपर में से कोई नहीं -- सीधे [REST API](/docs/developer/api) से बात करें, एक [API key](/docs/developer/api/api-keys) के साथ, या अपने नियंत्रण वाले server को [webhooks](/docs/developer/api/webhooks) की सदस्यता दें।

## उनमें क्या समानता है {#what-they-have-in-common}

हर integration एक **B1 API key** से authenticate करता है, जो B1Admin में **Settings → Developer → API Keys** के अंतर्गत बनाई जाती है। यह key:

- आपके church के एक विशिष्ट व्यक्ति से बंधी होती है और उस व्यक्ति की permissions विरासत में लेती है
- **scopes** से सीमित की जा सकती है -- उदाहरण के लिए, Google Sheets export को केवल `people:read` चाहिए, `settings:write` नहीं
- किसी भी समय रद्द की जा सकती है, जिससे integration की पहुंच तुरंत बंद हो जाती है, बिना किसी और चीज़ पर असर डाले

कुछ connectors (Zapier, Make) Zap या scenario चालू होने पर आपकी ओर से एक [webhook](/docs/developer/api/webhooks) भी पंजीकृत करते हैं, और Zap बंद करने पर उसे हटा देते हैं -- आपको webhook URL स्वयं प्रबंधित नहीं करना पड़ता।

:::tip
Zapier और Make के स्वचालित रूप से webhooks पंजीकृत करने के लिए, API key को **`settings:write`** scope चाहिए (साथ ही उन resource scopes के लिए भी जिन्हें integration छूता है)। केवल-पढ़ने वाली key actions और exports के लिए काम करती है, लेकिन triggers के लिए नहीं।
:::

## लागत {#cost}

ChurchApps मुफ़्त और open-source है। Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), और आधिकारिक Zapier / Make / Google Sheets connectors भी हमारी ओर से मुफ़्त हैं। तीसरे पक्ष अपने platforms के लिए शुल्क ले सकते हैं (Zapier और Make दोनों में उदार मुफ़्त tiers हैं; Slack, Discord, और Google Sheets इस उद्देश्य के लिए मुफ़्त हैं)।

## अपना खुद बनाना {#building-your-own}

यदि ऊपर का कोई भी विकल्प फिट नहीं बैठता, तो हर B1 surface खुला है:

- **[REST API](/docs/developer/api)** -- किसी भी भाषा से `Authorization: Bearer cak_…` header के साथ B1 को कॉल करें
- **[Webhooks](/docs/developer/api/webhooks)** -- एक सार्वजनिक HTTPS endpoint को एक या अधिक event types की सदस्यता दें और signed JSON payloads प्राप्त करें
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** -- यदि आप कई churches द्वारा उपयोग किया जाने वाला SaaS product बना रहे हैं

## अगले कदम {#next-steps}

- [Slack & Discord](./slack-discord) -- chat notifications पोस्ट करें
- [Zapier](./zapier) -- 7,000+ apps से जुड़ें
- [Make](./make) -- visual workflow automation
- [Google Sheets](./google-sheets) -- spreadsheets में export करें
- [Claude](./claude) -- अपने church के डेटा के बारे में Anthropic के Claude से पूछें
- [ChatGPT](./chatgpt) -- अपने church के डेटा के बारे में OpenAI के ChatGPT से पूछें
- [Connected services](./services/) -- हर service के लिए recipes (Mailchimp, Donorbox, Clearstream, …)
