---
title: "जुड़ी हुई सेवाएँ"
description: "Zapier या Make रेसिपी का उपयोग करके B1 Admin को Mailchimp, Donorbox, Subsplash, VOMO, Clearstream और अन्य उपकरणों से जोड़ें, हर एक के लिए सेटअप गाइड के साथ।"
---

# जुड़ी हुई सेवाएँ

<div class="article-intro">

B1 को किसी अन्य चर्च-तकनीक उपकरण से जोड़ने का सबसे तेज़ तरीका आम तौर पर Zapier या Make रेसिपी होती है — आपको B1 का नया बुनियादी ढाँचा नहीं चाहिए, और workflow को तीसरा पक्ष होस्ट करता है। यह पेज उन सेवाओं की चुनी हुई सूची है जिन्हें हमने आज वायर होने योग्य पुष्ट किया है, हर एक के लिए छोटे, कॉपी-पेस्ट सेटअप गाइड के साथ।

</div>

## एक नज़र में {#at-a-glance}

| सेवा | श्रेणी | ब्रिज | आप क्या वायर कर सकते हैं |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | Email | B1 में अंतर्निहित (Webhooks tab) | Mailchimp audience को B1 के लोगों, groups, और सहेजी गई सूचियों के साथ सिंक रखें |
| [Donorbox](./donorbox.md) | Donations | Zapier | Donorbox donations और donors को B1 में वापस भेजें |
| [Subsplash](./subsplash.md) | App / Donations | Zapier | Subsplash giving और लोगों को B1 में लाएँ |
| [VOMO](./vomo.md) | Volunteering | Zapier | B1 groups और VOMO projects के बीच volunteer signups सिंक करें |
| [Clearstream](./clearstream.md) | SMS | Zapier | B1 events से Clearstream text शुरू करें; जवाबों को B1 रिकॉर्ड के रूप में लें |
| [Text In Church](./text-in-church.md) | SMS / Workflows | Zapier | B1 से Text In Church workflows शुरू करें; Connect Card डेटा प्राप्त करें |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Zapier या Make द्वारा Webhooks | किसी भी B1 event से SMS भेजें |
| [Checkr](./checkr.md) | Background checks | Make | किसी के serving team में जुड़ने पर background check शुरू करें |

## इन सबमें क्या समान है {#what-all-of-these-have-in-common}

1. **वायरिंग का B1 हिस्सा एक जैसा है** — **B1Admin → Settings → Developer → API Keys** में सही scopes के साथ API key बनाएँ, फिर या तो ब्रिज को trigger के लिए webhook रजिस्टर करने दें (Zapier / Make यह अपने-आप करते हैं, `settings:write` चाहिए), या किसी downstream action से B1 के REST endpoints call करें। B1.church Zapier ऐप को हर key पर `settings:write` चाहिए, क्योंकि connect करते समय वह key को B1 की webhook सूची से मिलाता है। (Mailchimp अपवाद है: उसका सिंक B1 में अंतर्निहित है और **Webhooks** tab पर सेट होता है, बिना API key या ब्रिज के।)
2. **ब्रिज का बिल आपको आता है, हमें नहीं।** ChurchApps मुफ़्त है; Zapier और Make दोनों में मुफ़्त स्तर हैं जो कुछ रेसिपी कवर करते हैं।
3. **आप बिना लाइव गए वायरिंग का परीक्षण कर सकते हैं।** Zapier में "Test step" बटन है जो B1 से नमूना डेटा लाता है और रेसिपी चालू करने से पहले डेटा का आकार दिखाता है।

## ब्रिज चुनना {#picking-a-bridge}

- **Zapier** आसान है और उसका ऐप catalogue बड़ा है — लागत समस्या न हो तो इसे डिफ़ॉल्ट बनाएँ।
- **Make** बड़े पैमाने पर सस्ता है और उसका routing/filter तर्क अधिक लचीला है — जब एक workflow में fan-out, शर्तें, या कई चरण हों तो इसका उपयोग करें।
- **Webhooks by Zapier** (Mobile Message दस्तावेज़ में उपयोग) एक सामान्य adapter है जो Zap से किसी भी HTTP endpoint पर POST करने देता है, जब गंतव्य पहली-श्रेणी का Zapier ऐप न हो।

अगर इस सूची में कुछ और चाहिए, तो B1 की [REST API](/docs/developer/api) और [webhooks](/docs/developer/api/webhooks) खुले हैं — आप [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) से कुछ घंटों में एक-बार का ब्रिज बना सकते हैं।

## यहाँ क्या नहीं है (और क्यों) {#whats-not-here-and-why}

कई लोकप्रिय चर्च-तकनीक उपकरण — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — के पास आज कोई प्रकाशित Zapier ऐप या Make module नहीं है। उनके अपने APIs हैं, पर उन्हें B1 से जोड़ना एक कस्टम-कोड काम है, रेसिपी नहीं, इसलिए वे इस सूची में फ़िट नहीं होते। अगर कोई विक्रेता Zapier ऐप या Make module जोड़ता है, तो हम दस्तावेज़ जोड़ेंगे।

हमने Planning Center-Services विशिष्ट उपकरणों (संगीत, प्रस्तुति), प्रतिस्पर्धी ChMS उत्पादों, migration consultants, और केवल PCO-विशिष्ट डेटा साफ़ करने वाले उपकरणों को भी जानबूझकर छोड़ा है — इनमें से किसी का B1 में उपयोगी वायरिंग मार्ग नहीं है।

## यह भी देखें {#see-also}

- [Zapier (overview)](../zapier.md) — हर Zapier रेसिपी का B1 हिस्सा एक जैसा है; यह दस्तावेज़ इसे एक बार कवर करता है
- [Make (overview)](../make.md) — Make scenarios के लिए भी यही
- [Slack & Discord](../slack-discord.md) — बिना किसी ब्रिज के chat सूचनाएँ
- [Google Sheets](../google-sheets.md) — मांग पर निर्यात
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — वह event सूची जिस पर हर रेसिपी निर्भर है
