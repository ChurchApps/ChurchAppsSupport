---
title: "Mailchimp"
description: "B1 Admin के लोगों और group या saved-list सदस्यता को tags के रूप में Mailchimp audience से सिंक करें, सेटअप, प्रारंभिक इंपोर्ट और समस्या निवारण चरणों के साथ।"
---

# Mailchimp

<div class="article-intro">

Mailchimp audience को अपने-आप B1 के साथ सिंक रखें: लोग अपने नाम, email, और फ़ोन के साथ आते हैं; group और list सदस्यता Mailchimp tags बन जाती है; हटाए गए लोग archive हो जाते हैं। यह सिंक B1 में अंतर्निहित है — कोई तीसरी-पक्ष सेवा नहीं, कोई प्रति-कार्य मीटरिंग नहीं, और बदलाव रात के शेड्यूल के बजाय लगभग वास्तविक समय में पहुँचते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- वह audience वाला [Mailchimp](https://mailchimp.com) account जिसे आप B1 से प्रबंधित कराना चाहते हैं
- एक Mailchimp **API key** (Mailchimp: profile आइकन → **Account & billing → Extras → API keys**)
- आपकी **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## क्या सिंक होता है {#what-syncs}

| B1 में बदलाव | Mailchimp पर असर |
|---|---|
| व्यक्ति जोड़ा या अपडेट किया गया | Subscriber जोड़ा/अपडेट किया गया (पहला नाम, अंतिम नाम, फ़ोन; नए subscribers `subscribed` के रूप में आते हैं) |
| व्यक्ति हटाया गया (या GDPR के तहत मिटाया गया) | Subscriber archive हो जाता है |
| व्यक्ति किसी group में जुड़ता है | group के नाम पर tag जुड़ता है |
| व्यक्ति किसी group से निकलता है | वह tag हटता है |
| व्यक्ति किसी saved list में आता है | list के नाम पर tag जुड़ता है |
| व्यक्ति किसी saved list से निकलता है | वह tag हटता है |

**Saved lists आम तौर पर बेहतर tag स्रोत होती हैं।** B1 की [saved list](/docs/b1-admin/people/lists) एक नियम-आधारित audience है जो खुद का पुनर्मूल्यांकन करती है — "North campus के सभी लोग," "pastoral emails के लिए opt-in करने वाले सदस्य।" अपने Mailchimp segments को list tags की ओर इंगित करें और सिंक उन्हें बनाए रखता है; ministry-team mailings के लिए group tags का उपयोग करें।

सिंक **एक-तरफ़ा** है (B1 → Mailchimp) और केवल Mailchimp के मानक फ़ील्ड्स छूता है, इसलिए यह Mailchimp के अंदर आपके प्रबंधित merge fields या segments से टकरा नहीं सकता।

## सेटअप {#setup}

1. B1Admin में **Settings → Developer → Webhooks → New Webhook** पर जाएँ।
2. **Connector Type** को **Mailchimp** पर सेट करें।
3. अपनी **Mailchimp API Key** और **Audience ID** चिपकाएँ। key एन्क्रिप्टेड संग्रहीत होती है और दोबारा कभी नहीं दिखाई जाती।
4. संबंधित events पहले से चुने हुए होते हैं; जो नहीं चाहिए उन्हें अनचेक करें (जैसे person events चालू रखें पर group tags छोड़ दें)।
5. सेव करें। B1 स्वीकार करने से पहले Mailchimp के विरुद्ध key और audience सत्यापित करता है — टाइपो तुरंत कारण के साथ विफल होता है।

webhook फिर से खोलें और कभी भी connection फिर से सत्यापित करने के लिए **Send Test Event** पर क्लिक करें (Mailchimp के लिए यह नमूना subscriber भेजने के बजाय आपकी key और audience जाँचता है)। हर सिंक प्रयास webhook की delivery history में Mailchimp के वास्तविक जवाब के साथ दर्ज होता है, और विफल deliveries लगभग पाँच दिनों तक backoff के साथ अपने-आप फिर से प्रयास होते हैं।

## प्रारंभिक इंपोर्ट {#initial-import}

connector चालू होने के क्षण से *बदलावों* को सिंक करता है; यह आपकी मौजूदा directory को पीछे की ओर नहीं भरता। सेटअप के दिन के लिए:

1. B1Admin में **People** पर जाएँ, जिन लोगों को चाहिए उन्हें खोजें (या कोई saved list चलाएँ), और CSV डाउनलोड करने के लिए **Export** पर क्लिक करें।
2. Mailchimp में **Audience → Import contacts** से CSV लोड करें, और इंपोर्ट के दौरान कोई भी tags लागू करें।

प्रारंभिक लोड Mailchimp के importer से करने पर सहमति के सवाल पर आपका नियंत्रण रहता है — केवल उन्हीं लोगों को इंपोर्ट करें जिन्होंने वास्तव में आपके emails पाने की सहमति दी है। पूरी directory को subscribed contacts के रूप में थोक में इंपोर्ट करना Mailchimp की शर्तों और spam-रोधी कानून (CAN-SPAM/GDPR) का उल्लंघन कर सकता है।

## सीमाएँ और नोट्स {#limits--notes}

- **एक-तरफ़ा सिंक।** Mailchimp में unsubscribes, bounces, और संपादन B1 में वापस नहीं आते। Mailchimp में unsubscribe करने वाले व्यक्ति को B1 से सीधे भेजे गए email अब भी मिल सकते हैं — थोक-मेल सहमति के लिए Mailchimp को सत्य का स्रोत मानें।
- **जिन लोगों का email पता नहीं है उन्हें छोड़ दिया जाता है** (delivery history में ऐसा दर्ज होता है) — Mailchimp subscribers email से पहचाने जाते हैं।
- **Email पता बदलने से नया subscriber बनता है।** Mailchimp लोगों को email से पहचानता है, इसलिए B1 में किसी का email बदलने से वे नए पते से जुड़ जाते हैं; पुराना subscriber तब तक रहता है जब तक आप उसे Mailchimp में archive न करें।
- **केवल मानक फ़ील्ड्स सिंक होते हैं** — पहला नाम, अंतिम नाम, फ़ोन। इस संस्करण में membership status, campus, और custom B1 fields Mailchimp merge fields से नहीं मिलते; segment करने के लिए list tags का उपयोग करें।
- **Tag के नाम group/list के नाम हैं।** group या list का नाम बदलने पर नए नाम से tagging शुरू होती है; पुराना tag मौजूदा subscribers पर तब तक रहता है जब तक Mailchimp में हटाया न जाए।
- **Mailchimp की contact सीमाएँ अब भी लागू होती हैं** — जो सिंक free-tier audience को उसकी सीमा से ऊपर धकेलता है, वह delivery history में `Member limit reached` त्रुटियाँ दर्ज करेगा।

## अन्य रेसिपी (Zapier / Make) {#other-recipes-zapier--make}

audience सिंक से आगे की कोई भी चीज़ — `donation.created` पर giving देने वालों को tag करना, Mailchimp → B1 की उल्टी दिशा, या पूरी तरह अलग email platform (Constant Contact, Brevo, आदि) पर सिंक — अब भी [Zapier](../zapier.md) या [Make](../make.md) के माध्यम से उपलब्ध है, जो उन्हीं webhook events पर trigger होते हैं:

- **Giving देने वालों को tag करें:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **दो-तरफ़ा:** Mailchimp *New Subscriber* → B1 *Create Person*

अगर आपने पहले person/group सिंक Zapier के ज़रिए वायर किया था, तो नेटिव connector चालू करने के बाद वे Zaps बंद कर दें — दोनों चलाने से हर event दो बार प्रोसेस होता है और बिना किसी कारण Zapier tasks खर्च होते हैं।

## समस्या निवारण {#troubleshooting}

- **सेव "Mailchimp rejected the API key" के साथ विफल** — key रद्द हो गई थी या टाइप में गलती है। keys `-us21` जैसे data-center प्रत्यय पर खत्म होनी चाहिए।
- **सेव "audience not found" के साथ विफल** — उस account के अंतर्गत Audience ID मौजूद नहीं है। इसे **Audience → Settings → Audience name and defaults** से कॉपी करें (यह audience का नाम नहीं है)।
- **कोई व्यक्ति Mailchimp में कभी नहीं दिखा** — webhook की delivery history जाँचें। "Skipped: person has no email address" का मतलब बस यही है; Mailchimp से `4xx` जवाब में कारण दिखाता है।
- **Deliveries पूरी तरह रुक गईं** — बार-बार समाप्त deliveries के बाद webhook अपने-आप बंद हो जाता है। कारण ठीक करें (आमतौर पर रद्द की गई key), उसे फिर से चालू करें, और पुष्टि के लिए **Send Test Event** का उपयोग करें।

## यह भी देखें {#see-also}

- [Webhooks (developer reference)](/docs/developer/api/webhooks) — नीचे का इंजन, event सूची, delivery/retry नियम
- [Saved Lists](/docs/b1-admin/people/lists) — नियम-आधारित audiences जो स्वाभाविक रूप से Mailchimp tags से मेल खाती हैं
- [Zapier (overview)](../zapier.md) — audience सिंक से आगे की रेसिपी के लिए
