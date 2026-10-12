---
title: "Mailchimp"
---

# Mailchimp {#mailchimp}

<div class="article-intro">

B1 के साथ एक Mailchimp audience को अपने आप sync रखें: लोग अपने नाम, email और फ़ोन नंबर के साथ आते हैं; group और list की membership Mailchimp tags बन जाती है; और हटाए गए लोग archive हो जाते हैं। यह sync B1 में पहले से बना है — किसी तीसरे-पक्ष service की ज़रूरत नहीं, प्रति task कोई metering नहीं, और बदलाव रात के एक तय समय पर नहीं, बल्कि लगभग realtime में पहुँचते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [Mailchimp](https://mailchimp.com) account, जिसमें वह audience हो जिसे B1 को manage करना है
- एक Mailchimp **API key** (Mailchimp: profile icon → **Account & billing → Extras → API keys**)
- आपकी **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- एक B1Admin user जिसके पास **Edit Settings** permission हो

</div>

## क्या Sync होता है {#what-syncs}

| B1 में बदलाव | Mailchimp पर असर |
|---|---|
| कोई व्यक्ति जोड़ा या अपडेट किया गया | Subscriber जोड़ा/अपडेट किया गया (first name, last name, phone; नए subscribers `subscribed` के रूप में आते हैं) |
| कोई व्यक्ति हटाया गया (या GDPR के तहत मिटाया गया) | Subscriber archive हो जाता है |
| कोई व्यक्ति किसी group में शामिल होता है | Group के नाम पर एक tag जुड़ जाता है |
| कोई व्यक्ति किसी group से निकलता है | वह tag हट जाता है |
| कोई व्यक्ति किसी सहेजी गई list में आता है | List के नाम पर एक tag जुड़ जाता है |
| कोई व्यक्ति किसी सहेजी गई list से निकलता है | वह tag हट जाता है |

**Tag के स्रोत के रूप में सहेजी गई lists आम तौर पर बेहतर होती हैं।** B1 की एक [saved list](/docs/b1-admin/people/lists) एक नियम-आधारित audience होती है जो खुद को फिर से evaluate करती है — जैसे "North campus के सभी लोग" या "वे members जिन्होंने pastoral emails के लिए opt-in किया है।" अपने Mailchimp segments को list tags की ओर इंगित करें, और sync उन्हें अपने आप बनाए रखेगा; ministry-team mailings के लिए group tags का उपयोग करें।

Sync **एक-तरफ़ा** है (B1 → Mailchimp) और केवल Mailchimp के standard fields को छूता है, इसलिए वह उन merge fields या segments से टकराएगा नहीं जिन्हें आप Mailchimp के अंदर manage करते हैं।

## सेटअप {#setup}

1. B1Admin में **Settings → Developer → Webhooks → New Webhook** पर जाएँ।
2. **Connector Type** को **Mailchimp** पर सेट करें।
3. अपनी **Mailchimp API Key** और **Audience ID** paste करें। Key encrypted रूप में सहेजी जाती है और दोबारा कभी दिखाई नहीं जाती।
4. संबंधित events पहले से चुने होते हैं; जो नहीं चाहिए उन्हें uncheck करें (उदाहरण के लिए, person events चालू रखें लेकिन group tags छोड़ दें)।
5. Save करें। B1 स्वीकार करने से पहले Mailchimp के साथ key और audience की पुष्टि करता है — कोई गलत टाइप तुरंत कारण सहित विफल हो जाता है।

Connection को दोबारा जाँचने के लिए कभी भी **Send Test** का उपयोग करें। हर sync प्रयास webhook के delivery history में Mailchimp के वास्तविक response के साथ दर्ज होता है, और विफल deliveries लगभग पाँच दिनों तक backoff के साथ अपने आप retry होती हैं।

## प्रारंभिक Import {#initial-import}

Connector चालू होने के क्षण से *बदलावों* को sync करता है; यह आपकी मौजूदा directory को पीछे की ओर नहीं भरता। सेटअप के दिन के लिए:

1. B1Admin में **People** पर जाएँ, वे लोग खोजें जिन्हें आप चाहते हैं (या कोई सहेजी गई list चलाएँ), और CSV डाउनलोड करने के लिए **Export** पर क्लिक करें।
2. Mailchimp में **Audience → Import contacts** का उपयोग करके CSV लोड करें, import के दौरान कोई भी tags लागू करते हुए।

Mailchimp के importer से प्रारंभिक लोड करने से सहमति (consent) का सवाल आपके नियंत्रण में रहता है — केवल उन्हीं लोगों को import करें जिन्होंने वास्तव में आपके emails पाने की सहमति दी है। पूरी directory को subscribed contacts के रूप में बड़े पैमाने पर import करना Mailchimp की शर्तों और anti-spam कानून (CAN-SPAM/GDPR) का उल्लंघन कर सकता है।

## सीमाएँ और नोट्स {#limits--notes}

- **एक-तरफ़ा sync।** Mailchimp में किए गए unsubscribes, bounces और बदलाव B1 में वापस नहीं आते। जो व्यक्ति Mailchimp में unsubscribe करता है, उसे B1 से सीधे भेजे गए emails अब भी मिल सकते हैं — bulk-mail सहमति के लिए Mailchimp को ही source of truth मानें।
- **बिना email पते वाले लोग छोड़ दिए जाते हैं** (delivery history में ऐसा दर्ज होता है) — Mailchimp subscribers email से पहचाने जाते हैं।
- **Email पते में बदलाव से एक नया subscriber बनता है।** Mailchimp लोगों को email से पहचानता है, इसलिए B1 में किसी का email बदलने पर वह नए पते के तहत जुड़ जाता है; पुराना subscriber तब तक बना रहता है जब तक आप उसे Mailchimp में archive न करें।
- **केवल standard fields sync होते हैं** — first name, last name, phone। Membership status, campus और custom B1 fields इस संस्करण में Mailchimp merge fields से map नहीं होते; segment करने के लिए list tags का उपयोग करें।
- **Tag के नाम group/list के नाम ही होते हैं।** किसी group या list का नाम बदलने पर नए नाम से tagging शुरू होती है; पुराना tag मौजूदा subscribers पर तब तक रहता है जब तक उसे Mailchimp में हटाया न जाए।
- **Mailchimp की contact सीमाएँ अब भी लागू होती हैं** — यदि कोई sync free-tier audience को उसकी सीमा से आगे धकेलता है, तो delivery history में `Member limit reached` errors दर्ज होंगे।

## अन्य Recipes (Zapier / Make) {#other-recipes-zapier--make}

Audience sync से परे के काम — `donation.created` पर givers को tag करना, Mailchimp → B1 की उल्टी दिशा, या पूरी तरह किसी दूसरे email platform (Constant Contact, Brevo, आदि) से sync — अब भी [Zapier](../zapier) या [Make](../make) के ज़रिए संभव हैं, जो उसी webhook events पर trigger होते हैं:

- **Givers को tag करें:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **दो-तरफ़ा:** Mailchimp *New Subscriber* → B1 *Create Person*

यदि आपने पहले person/group sync Zapier के ज़रिए जोड़ा था, तो native connector चालू करने के बाद उन Zaps को बंद कर दें — दोनों चलाने से हर event दो बार प्रोसेस होता है और बिना किसी कारण Zapier tasks खर्च होते हैं।

## समस्या-निवारण {#troubleshooting}

- **Save विफल होता है "Mailchimp rejected the API key" के साथ** — key revoke हो गई है या गलत टाइप हुई है। Keys किसी data-center suffix जैसे `-us21` पर खत्म होनी चाहिए।
- **Save विफल होता है "audience not found" के साथ** — वह Audience ID उस account के तहत मौजूद नहीं है। इसे **Audience → Settings → Audience name and defaults** से कॉपी करें (यह audience का नाम नहीं है)।
- **कोई व्यक्ति Mailchimp में कभी दिखाई नहीं दिया** — webhook का delivery history देखें। "Skipped: person has no email address" का मतलब बिल्कुल वही है; Mailchimp से `4xx` का कारण response body में दिखता है।
- **Deliveries पूरी तरह रुक गईं** — बार-बार विफल deliveries के बाद webhook अपने आप बंद हो जाता है। कारण ठीक करें (आमतौर पर revoked key), उसे फिर से चालू करें, और पुष्टि के लिए **Send Test** का उपयोग करें।

## यह भी देखें {#see-also}

- [Webhooks (developer reference)](/docs/developer/api/webhooks) — इसके नीचे का engine, event catalog, delivery/retry के नियम
- [Saved Lists](/docs/b1-admin/people/lists) — नियम-आधारित audiences जो Mailchimp tags से स्वाभाविक रूप से मेल खाती हैं
- [Zapier (overview)](../zapier) — audience sync से परे के recipes के लिए
