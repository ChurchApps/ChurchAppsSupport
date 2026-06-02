---
title: "Integrations"
---

# Integrations

<div class="article-intro">

B1 उन tools में plugs करता है जो आपकी टीम पहले से उपयोग करती है। Slack या Discord के लिए staff notifications को connect करें, Zapier या Make में workflows को automate करें, या Google Sheets को on demand में डेटा निर्यात करें — एक अलग integration platform के लिए भुगतान किए बिना और ChurchApps को कुछ extra host किए बिना। हर integration third party के अपने infrastructure पर चलता है और B1 के webhooks या REST API के माध्यम से आपके चर्च से बात करता है।

</div>

## क्या उपलब्ध है

| Integration | यह क्या करता है | दिशा | सेटअप के लिए प्रयास |
|---|---|---|---|
| **[Slack](./slack-discord)** | पठनीय notifications (नए लोग, दान, sign-ups, …) को एक Slack चैनल में पोस्ट करें | B1 → Slack | 2 मिनट |
| **[Discord](./slack-discord)** | समान, एक Discord चैनल में | B1 → Discord | 2 मिनट |
| **[Zapier](./zapier)** | B1 events को triggers के रूप में और Zapier के 7,000+ apps में B1 actions का उपयोग करें | दोनों | 5–10 मिनट प्रति Zap |
| **[Make](./make)** | Make के visual scenario builder में Zapier के समान विचार | दोनों | 5–10 मिनट प्रति scenario |
| **[Google Sheets](./google-sheets)** | People / Donations / Groups / Attendance को on demand में एक spreadsheet में निर्यात करें | B1 → Sheet | 5 मिनट |
| **[Claude](./claude)** | अपने चर्च डेटा के बारे में Anthropic के Claude से प्रश्न पूछें, आपकी अनुमतियों के लिए scoped | दोनों | 5 मिनट |
| **[ChatGPT](./chatgpt)** | एक Custom GPT या MCP-aware OpenAI tooling के माध्यम से OpenAI के ChatGPT के साथ समान विचार | दोनों | 10 मिनट |
| **[Connected services](./services/)** | Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr के लिए तैयार किए गए recipes | Varies | 5–10 मिनट each |

## कैसे चुनें

- **सिर्फ chat में एक notification चाहते हैं?** **Slack** या **Discord** का उपयोग करें — कोई third-party account नहीं, कोई Zap maintain नहीं। B1Admin के अंदर पूरी तरह से configured।
- **apps के बीच कुछ automate करना चाहते हैं** (उदाहरण के लिए "जब कोई देता है, उन्हें मेरी Mailchimp list और Slack #donations में जोड़ें")? **Zapier** या **Make** का उपयोग करें। Zapier अधिक friendly है; Make scale में सस्ता है और अधिक flexible logic है।
- **एक one-off डेटा pull या एक scheduled report चाहते हैं?** **Google Sheets** का उपयोग करें — add-on के sidebar में एक API कुंजी पेस्ट करें और Export पर क्लिक करें।
- **plain English में सवाल पूछना चाहते हैं** ("पिछले रविवार को कितने first-time visitors?", "इस महीने दान को सारांशित करें")? **[Claude](./claude)** या **[ChatGPT](./chatgpt)** का उपयोग करें — दोनों एक एकल API कुंजी के साथ B1 में connect करते हैं।
- **अपना स्वयं का custom integration बनाते हैं?** उपरोक्त कोई भी नहीं — [REST API](/docs/developer/api) के साथ सीधे [API कुंजी](/docs/developer/api/api-keys) से बात करें, या एक सर्वर को [webhooks](/docs/developer/api/webhooks) के लिए subscribe करें जो आप नियंत्रित करते हैं।

## उनके पास क्या समान है

हर integration एक **B1 API कुंजी** के साथ प्रमाणित करता है, B1Admin के तहत **Settings → Developer → API Keys** में बनाया गया है। कुंजी:

- आपके चर्च में एक विशिष्ट व्यक्ति के लिए बाध्य है और उस व्यक्ति की अनुमतियों को inherit करता है
- **scopes** के साथ narrowed किया जा सकता है — उदाहरण के लिए एक Google Sheets निर्यात को केवल `people:read` की आवश्यकता है, `settings:write` नहीं
- किसी भी समय revoke किया जा सकता है, तुरंत integration की access को काट दिया, बाकी कुछ को प्रभावित किए बिना

कुछ connectors (Zapier, Make) भी आपकी ओर से [webhook](/docs/developer/api/webhooks) को register करते हैं जब Zap या scenario को चालू किया जाता है, और इसे हटाते हैं जब आप इसे बंद करते हैं — आप webhook URL को स्वयं manage नहीं करते।

:::tip
Zapier और Make के लिए webhooks को automatically register करने के लिए, API कुंजी को **`settings:write`** scope की आवश्यकता है (plus resource scopes जो integration को touch करने के लिए)। एक read-only कुंजी actions और निर्यात के लिए काम करती है लेकिन triggers के लिए नहीं।
:::

## लागत

ChurchApps निःशुल्क और open-source है। Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), और आधिकारिक Zapier / Make / Google Sheets connectors हमारी ओर से भी निःशुल्क हैं। third parties अपने स्वयं के platforms के लिए charge कर सकते हैं (Zapier और Make दोनों के पास generous free tiers हैं; Slack, Discord, और Google Sheets इस उद्देश्य के लिए निःशुल्क हैं)।

## अपना स्वयं का बनाना

यदि उपरोक्त कोई भी फिट नहीं बैठता है, तो हर B1 सतह खुली है:

- **[REST API](/docs/developer/api)** — किसी भी भाषा से `Authorization: Bearer cak_…` हेडर के साथ B1 को कॉल करें
- **[Webhooks](/docs/developer/api/webhooks)** — एक public HTTPS endpoint को एक या अधिक event types के लिए subscribe करें और signed JSON payloads प्राप्त करें
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — यदि आप एक SaaS उत्पाद बना रहे हैं जिसका उपयोग कई चर्च करते हैं

## अगले कदम

- [Slack & Discord](./slack-discord) — chat notifications पोस्ट करें
- [Zapier](./zapier) — 7,000+ apps से connect करें
- [Make](./make) — visual workflow automation
- [Google Sheets](./google-sheets) — spreadsheets में निर्यात करें
- [Claude](./claude) — अपने चर्च डेटा के बारे में Anthropic के Claude से पूछें
- [ChatGPT](./chatgpt) — अपने चर्च डेटा के बारे में OpenAI के ChatGPT से पूछें
- [Connected services](./services/) — per-service recipes (Mailchimp, Donorbox, Clearstream, …)
