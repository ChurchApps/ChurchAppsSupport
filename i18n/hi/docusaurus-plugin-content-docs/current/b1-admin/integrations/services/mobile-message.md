---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) एक Australian SMS API है — AU churches के साथ लोकप्रिय क्योंकि यह local numbers और competitive AU pricing offer करता है जहां Clearstream और Text In Church US-centric हैं। Mobile Message के पास आज एक first-class Zapier app नहीं है, लेकिन यह एक public REST API को publish करता है, तो आप B1 events को **Webhooks by Zapier** (या Make HTTP module) के माध्यम से कुछ मिनटों में Mobile Message texts में wire कर सकते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक registered Sender ID और API credentials (*Account → API Settings* के तहत API username + password) के साथ एक [Mobile Message](https://mobilemessage.com.au) खाता
- एक [Zapier](https://zapier.com) खाता (या [Make](https://www.make.com))
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या Wire Up कर सकते हैं

Mobile Message का API "send SMS"-shaped है — कोई triggers नहीं, सिर्फ outbound text। तो recipes सभी B1 → SMS हैं:

| Direction | B1 trigger | Outcome |
|---|---|---|
| B1 → Mobile Message | `person.created` | नए person को welcome text |
| B1 → Mobile Message | `donation.created` | donor को thank-you text |
| B1 → Mobile Message | `form.submission.created` | on-call team को page करें |
| B1 → Mobile Message | `event.created` | एक list को reminder broadcast करें |

## सेटअप

### 1. एक B1 API कुंजी Mint करें

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — trigger webhook को register करने के लिए
- `people:read` — एक `personId` से recipient के phone number को lookup करने के लिए

### 2. Webhooks by Zapier के साथ Zap बनाएं

1. **Trigger** — B1.church: आप जो event चाहते हैं उसे pick करें (उदाहरण के लिए New Donation)।
2. **Action** — B1.church: Find Person (`data.personId` का उपयोग करके) phone number और name को प्राप्त करने के लिए।
3. **Action** — Webhooks by Zapier: **POST**। नीचे के रूप में कॉन्फ़िगर करें।

POST step की सेटिंग:

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
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier यह automatically add करता है)
- **Basic Auth** — *Basic Auth* field को `<api_username>|<api_password>` पर set करें (Zapier को सही `Authorization: Basic …` header में convert करता है)

Zap को चालू करें। B1Admin में एक test gift भेजें verify करने के लिए कि एक text arrive करता है।

## सामान्य Recipes

### Event reminders की morning में

- **Trigger** — Schedule by Zapier (daily, 7am)
- **Action** — B1.church: Find Events for today (या एक Find step को fixed date filter के साथ use करें, या आज के event list को एक Google Sheet में store करें)
- **Action** — Webhooks by Zapier: Mobile Message को एक registered subscriber group में event list के साथ POST करें

### Batch endpoint का उपयोग एक list broadcast के लिए

Mobile Message का `/v1/messages` endpoint 10,000 messages तक accept करता है per call। एक B1 group को broadcast करने के लिए:

- **Trigger** — B1.church: New Form Submission (एक specific form को filter करें)
- **Action** — B1.church: List Group Members एक target group के लिए (एक *Webhooks by Zapier — GET* step के माध्यम से `/membership/groupmembers?groupId=…` पर)
- **Action** — Formatter by Zapier → Utilities → response को एक `messages` array में line-itemize करें
- **Action** — Webhooks by Zapier: `/v1/messages` में पूर्ण array को POST करें

### Make alternative

यदि आप Make को prefer करते हैं, तो B1 Watch Events trigger के बाद **HTTP — Make a request** module को drop करें, इसे same way में कॉन्फ़िगर करें (POST, Basic Auth, JSON body)। B1 side के लिए [Make overview](../make) देखें।

## Limits & Notes

- **Basic Auth एकमात्र authentication method है** — Mobile Message dashboard से एक username और password को issue करता है। दोनों को secrets के रूप में treat करें।
- **`sender` को आपके Mobile Message account पर एक registered Sender ID होना चाहिए**, या send एक `400 Invalid sender` को return करेगा। AU regulations को sender registration require करते हैं।
- **AU phone numbers** `0412345678` (local) या `+61412345678` (international) हो सकते हैं। API दोनों को accept करता है, लेकिन यदि आप overseas को भी भेज रहे हैं तो `+61…` पर normalise करें।
- **Per request 10,000 messages तक** — broadcasts के लिए उपयोगी, लेकिन एक single B1 webhook delivery rarely एक list को emit करेगा जो बड़ा हो; batch endpoint को scheduled bulk Zaps के लिए reserve करें।

## समस्या निवारण

- **POST returns `401 Unauthorized`** — Basic Auth credentials गलत हैं। Mobile Message dashboard *Account → API Settings* से फिर से copy करें। Note username आपका account email है by default, एक अलग API कुंजी नहीं।
- **POST returns `400 Invalid sender`** — `sender` value आपके account पर एक registered Sender ID नहीं है। पहले Mobile Message dashboard में इसे register करें।
- **Text arrive करता है लेकिन truncated है** — Mobile Message ~160 characters के over messages को multiple parts में split करता है; आपको per part बिल किया जाता है। response body को check करें — यह part count को बताता है।

## यह भी देखें

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — alternative SMS providers native Zapier apps के साथ (कोई Webhooks-by-Zapier step की जरूरत नहीं)
- [Zapier (overview)](../zapier) — हर Zapier recipe का B1 side
- [Mobile Message API docs](https://mobilemessage.com.au/api-documentation)
