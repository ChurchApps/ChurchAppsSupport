---
title: "Mobile Message"
description: "B1 Admin events को Mobile Message (एक ऑस्ट्रेलियाई SMS API) से जोड़ें, Zapier या Make webhooks का उपयोग करके स्वागत, donation, और reminder texts भेजें।"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) एक ऑस्ट्रेलियाई SMS API है — AU चर्चों में लोकप्रिय, क्योंकि यह स्थानीय नंबर और प्रतिस्पर्धी AU मूल्य निर्धारण देता है, जहाँ Clearstream और Text In Church अमेरिका-केंद्रित हैं। Mobile Message के पास आज पहली-श्रेणी का Zapier ऐप नहीं है, पर वह एक सार्वजनिक REST API प्रकाशित करता है, इसलिए आप **Webhooks by Zapier** (या Make के HTTP module) के माध्यम से B1 events को Mobile Message texts से कुछ ही मिनटों में वायर कर सकते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- पंजीकृत Sender ID और API credentials वाला [Mobile Message](https://mobilemessage.com.au) account (API username + password, *Account → API Settings* के अंतर्गत)
- एक [Zapier](https://zapier.com) account (या [Make](https://www.make.com))
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या वायर कर सकते हैं {#what-you-can-wire-up}

Mobile Message का API "SMS भेजो"-आकार का है — कोई triggers नहीं, केवल outbound text। इसलिए सारी रेसिपी B1 → SMS हैं:

| दिशा | B1 trigger | परिणाम |
|---|---|---|
| B1 → Mobile Message | `person.created` | नए व्यक्ति को स्वागत text |
| B1 → Mobile Message | `donation.created` | donor को धन्यवाद text |
| B1 → Mobile Message | `form.submission.created` | on-call टीम को पेज करना |
| B1 → Mobile Message | `event.created` | एक list को reminder broadcast |

## सेटअप {#setup}

### 1. B1 API key बनाएँ {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — trigger webhook के रजिस्टर होने के लिए
- `people:read` — `personId` से प्राप्तकर्ता का फ़ोन नंबर खोजने के लिए

### 2. Webhooks by Zapier के साथ Zap बनाएँ {#2-build-the-zap-with-webhooks-by-zapier}

1. **Trigger** — B1.church: वह event चुनें जो चाहिए (जैसे New Donation)।
2. **Action** — B1.church: Find Person (`data.personId` से) ताकि फ़ोन नंबर और नाम मिले।
3. **Action** — Webhooks by Zapier: **POST**। नीचे के अनुसार कॉन्फ़िगर करें।

POST चरण की settings:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier इसे अपने-आप जोड़ता है)
- **Basic Auth** — *Basic Auth* फ़ील्ड में `<api_username>|<api_password>` सेट करें (Zapier इसे सही `Authorization: Basic …` header में बदल देता है)

Zap चालू करें। text पहुँचने की पुष्टि के लिए B1Admin में एक परीक्षण उपहार भेजें।

## सामान्य रेसिपी {#common-recipes}

### सुबह के समय event reminders {#event-reminders-the-morning-of}

- **Trigger** — Schedule by Zapier (रोज़ाना, सुबह 7 बजे)
- **Action** — आज के events की सूची एक Google Sheet में (या किसी अन्य ऐप में जिसे Zapier पढ़ सके) रखें और आज की पंक्तियाँ खोजें — B1 के Zapier ऐप में events खोजने के लिए कोई action नहीं है
- **Action** — Webhooks by Zapier: पंजीकृत subscriber group को event सूची के साथ Mobile Message पर POST करें

### सूची broadcast के लिए batch endpoint का उपयोग करें {#use-the-batch-endpoint-for-a-list-broadcast}

Mobile Message का `/v1/messages` endpoint प्रति call 10,000 messages तक स्वीकार करता है। किसी B1 group पर broadcast करने के लिए:

- **Trigger** — B1.church: New Form Submission (किसी विशिष्ट form पर filter)
- **Action** — Webhooks by Zapier: लक्षित group के सदस्यों की सूची के लिए GET `/membership/groupmembers?groupId=…` (B1 के Zapier ऐप में इसके लिए list action नहीं है; API key को `Authorization: Bearer cak_…` header के रूप में भेजें)
- **Action** — Formatter by Zapier → Utilities → Line-itemize प्रतिक्रिया को `messages` array में बदलने के लिए
- **Action** — Webhooks by Zapier: पूरे array को `/v1/messages` पर POST करें

### Make विकल्प {#make-alternative}

अगर आप Make पसंद करते हैं, तो B1 Watch Events trigger के बाद **HTTP — Make a request** module रखें, उसे उसी तरह कॉन्फ़िगर करें (POST, Basic Auth, JSON body)। B1 की ओर के लिए [Make overview](../make.md) देखें — ध्यान दें कि B1.church Make ऐप अभी रिलीज़ नहीं हुआ है।

## सीमाएँ और नोट्स {#limits--notes}

- **Basic Auth ही एकमात्र authentication विधि है** — Mobile Message डैशबोर्ड से username और password जारी करता है। दोनों को गुप्त मानें।
- **`sender` आपके Mobile Message account पर पंजीकृत Sender ID होना चाहिए**, नहीं तो भेजना `400 Invalid sender` लौटाएगा। AU नियम sender पंजीकरण अनिवार्य करते हैं।
- **AU फ़ोन नंबर** `0412345678` (स्थानीय) या `+61412345678` (अंतरराष्ट्रीय) हो सकते हैं। API दोनों स्वीकार करता है, पर अगर आप विदेश में भी भेजते हैं तो `+61…` पर सामान्यीकृत करें।
- **प्रति request 10,000 messages तक** — broadcasts के लिए उपयोगी, पर एक B1 webhook delivery शायद ही इतनी बड़ी सूची देगी; batch endpoint को निर्धारित थोक Zaps के लिए रखें।

## समस्या निवारण {#troubleshooting}

- **POST `401 Unauthorized` लौटाता है** — Basic Auth credentials गलत हैं। Mobile Message डैशबोर्ड *Account → API Settings* से फिर से कॉपी करें। ध्यान दें कि username डिफ़ॉल्ट रूप से आपका account email है, कोई अलग API key नहीं।
- **POST `400 Invalid sender` लौटाता है** — `sender` मान आपके account पर पंजीकृत Sender ID नहीं है। पहले उसे Mobile Message डैशबोर्ड में पंजीकृत करें।
- **Text पहुँचता है पर कटा हुआ होता है** — Mobile Message लगभग 160 अक्षरों से बड़े messages को कई भागों में बाँटता है; हर भाग का शुल्क लगता है। response body जाँचें — उसमें भागों की संख्या दी होती है।

## यह भी देखें {#see-also}

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — मूल Zapier ऐप वाले वैकल्पिक SMS providers (Webhooks-by-Zapier चरण की ज़रूरत नहीं)
- [Zapier (overview)](../zapier.md) — हर Zapier रेसिपी का B1 हिस्सा
- [Mobile Message API docs](https://mobilemessage.com.au/api-documentation)
