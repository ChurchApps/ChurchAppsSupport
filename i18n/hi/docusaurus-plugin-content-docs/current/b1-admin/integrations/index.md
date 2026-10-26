---
title: "Integrations"
---

# इंटीग्रेशन

<div class="article-intro">

B1 उन टूल्स से जुड़ता है जिन्हें आपकी टीम पहले से इस्तेमाल करती है। स्टाफ़ सूचनाओं के लिए Slack या Discord से जुड़ें, Zapier या Make में workflows स्वचालित करें, या Google Sheets में ज़रूरत पड़ने पर डेटा एक्सपोर्ट करें — बिना किसी अलग integration platform के पैसे दिए और बिना ChurchApps की ओर से कुछ अतिरिक्त होस्ट किए। हर integration तीसरे पक्ष के अपने इंफ़्रास्ट्रक्चर पर चलता है और B1 के webhooks या REST API के ज़रिए आपके चर्च से बात करता है।

</div>

## क्या उपलब्ध है

| Integration | यह क्या करता है | दिशा | सेट करने में लगने वाला समय |
|---|---|---|---|
| **[Slack](./slack-discord)** | Slack channel में पढ़ने योग्य सूचनाएँ पोस्ट करता है (नए लोग, donations, sign-ups, …) | B1 → Slack | 2 मिनट |
| **[Discord](./slack-discord)** | वही, Discord channel में | B1 → Discord | 2 मिनट |
| **[Zapier](./zapier)** | B1 के events को triggers और B1 actions को Zapier के 7,000+ apps में उपयोग करें | दोनों | प्रति Zap 5–10 मिनट |
| **[Make](./make)** | Zapier जैसा ही विचार, Make के visual scenario builder में | दोनों | प्रति scenario 5–10 मिनट |
| **[Google Sheets](./google-sheets)** | People / Donations / Groups / Attendance को मांग पर spreadsheet में एक्सपोर्ट करें | B1 → Sheet | 5 मिनट |
| **[Claude](./claude)** | Anthropic के Claude से अपने चर्च के डेटा के बारे में सवाल पूछें, जो आपकी अनुमतियों तक सीमित हैं — आज़माना मुफ़्त है, सुझाया गया | दोनों | 3 मिनट से कम |
| **[ChatGPT](./chatgpt)** | OpenAI के ChatGPT के साथ वही विचार (पेड ChatGPT प्लान चाहिए) | दोनों | 10 मिनट |
| **[Connected services](./services/)** | Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr के लिए चुनी हुई रेसिपी | अलग-अलग | प्रत्येक के लिए 5–10 मिनट |

## कौन सा चुनें

- **बस चैट में एक सूचना चाहिए?** **Slack** या **Discord** का उपयोग करें — किसी तीसरे पक्ष का खाता नहीं, कोई Zap संभालना नहीं। यह पूरी तरह B1Admin के भीतर कॉन्फ़िगर होता है।
- **कई ऐप्स में कुछ स्वचालित करना चाहते हैं** (जैसे "जब कोई giving करे, तो उसे मेरी Mailchimp सूची और Slack #donations में जोड़ें")? **Zapier** या **Make** का उपयोग करें। Zapier इस्तेमाल में आसान है; Make बड़े पैमाने पर सस्ता है और उसका लॉजिक अधिक लचीला है।
- **एक बार का डेटा निकालना या नियमित रिपोर्ट चाहिए?** **Google Sheets** का उपयोग करें — add-on के sidebar में API key डालें और Export पर क्लिक करें।
- **सामान्य भाषा में सवाल पूछना चाहते हैं** ("पिछले रविवार को कितने पहली बार आने वाले मेहमान थे?", "इस महीने की giving का सारांश दो")? **[Claude](./claude)** से शुरू करें — यह आज़माने के लिए मुफ़्त है और 3 मिनट से कम में सेट हो जाता है। **[ChatGPT](./chatgpt)** भी पेड प्लान के साथ काम करता है। Claude आपके B1 खाते से साइन इन करके जुड़ता है; ChatGPT B1 API key का उपयोग करता है।
- **अपना खुद का कस्टम integration बना रहे हैं?** ऊपर में से कोई नहीं — [API key](/docs/developer/api/api-keys) के साथ सीधे [REST API](/docs/developer/api) से बात करें, या अपने नियंत्रण वाले सर्वर को [webhooks](/docs/developer/api/webhooks) की सदस्यता दें।

## इन सबमें समानता

हर integration एक **B1 API key** से प्रमाणित होता है, जिसे B1Admin में **Settings → Developer → API Keys** के तहत बनाया जाता है। यह key:

- आपके चर्च के किसी विशिष्ट व्यक्ति से जुड़ी होती है और उस व्यक्ति की अनुमतियाँ लेती है
- **scopes** से सीमित की जा सकती है — उदाहरण के लिए, Google Sheets एक्सपोर्ट को केवल `people:read` चाहिए, `settings:write` नहीं
- किसी भी समय रद्द की जा सकती है, जिससे integration की पहुँच तुरंत बंद हो जाती है, बिना किसी और चीज़ को प्रभावित किए

कुछ connectors (Zapier, Make) जब Zap या scenario चालू होता है तो आपकी ओर से एक [webhook](/docs/developer/api/webhooks) रजिस्टर करते हैं, और Zap बंद होने पर उसे हटा देते हैं — webhook URL आपको खुद नहीं संभालना पड़ता।

:::tip
Zapier और Make के webhooks अपने आप रजिस्टर करने के लिए, API key में **`settings:write`** scope होना चाहिए (साथ ही उस integration द्वारा छुए जाने वाले संसाधनों के scopes भी)। केवल-पढ़ने वाली key actions और exports के लिए काम करती है, लेकिन triggers के लिए नहीं।
:::

## लागत

ChurchApps मुफ़्त और open-source है। Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), और आधिकारिक Zapier / Make / Google Sheets connectors भी हमारी ओर से मुफ़्त हैं। तीसरे पक्ष अपने प्लेटफ़ॉर्म के लिए शुल्क ले सकते हैं (Zapier और Make दोनों में उदार मुफ़्त स्तर हैं; Slack, Discord और Google Sheets इस उपयोग के लिए मुफ़्त हैं)।

## अपना खुद बनाना

अगर ऊपर का कुछ भी फ़िट नहीं होता, तो B1 की हर सतह खुली है:

- **[REST API](/docs/developer/api)** — `Authorization: Bearer cak_…` header के साथ किसी भी भाषा से B1 को कॉल करें
- **[Webhooks](/docs/developer/api/webhooks)** — एक सार्वजनिक HTTPS endpoint को एक या अधिक event types की सदस्यता दें और हस्ताक्षरित JSON payloads प्राप्त करें
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — अगर आप एक SaaS उत्पाद बना रहे हैं जिसे कई चर्च इस्तेमाल करते हैं

## अगले चरण

- [Slack और Discord](./slack-discord) — चैट सूचनाएँ पोस्ट करें
- [Zapier](./zapier) — 7,000+ ऐप्स से जुड़ें
- [Make](./make) — visual workflow automation
- [Google Sheets](./google-sheets) — spreadsheets में एक्सपोर्ट करें
- [Claude](./claude) — Anthropic के Claude से अपने चर्च के डेटा के बारे में पूछें
- [ChatGPT](./chatgpt) — OpenAI के ChatGPT से अपने चर्च के डेटा के बारे में पूछें
- [Connected services](./services/) — प्रति-सेवा रेसिपी (Mailchimp, Donorbox, Clearstream, …)
