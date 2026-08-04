---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks एक चर्च को थर्ड-पार्टी टूल्स — ऑटोमेशन प्लेटफ़ॉर्म (Zapier, Make, n8n), CRM, अकाउंटिंग सिस्टम, या HTTP POST स्वीकार करने वाली किसी भी चीज़ — को रीयल-टाइम सूचनाएँ पुश करने देते हैं। जब B1 में कोई व्यक्ति, समूह, या परिवार बदलता है, तो B1 उस इवेंट की सदस्यता लेने वाले हर URL को एक साइन किया गया JSON पेलोड भेजता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Edit Church Settings** अनुमति वाला एक चर्च व्यवस्थापक webhooks को पंजीकृत और प्रबंधित करता है
- आपका प्राप्तकर्ता एंडपॉइंट एक सार्वजनिक पते पर **HTTPS** के माध्यम से पहुँच योग्य होना चाहिए
- साइनिंग सीक्रेट को सुरक्षित रूप से स्टोर करने का एक तरीका रखें — यह केवल एक बार दिखाया जाता है

</div>

## अवलोकन

Webhooks केवल **आउटबाउंड** हैं: B1 आपके एंडपॉइंट को कॉल करता है, आप B1 को कॉल नहीं करते। प्रत्येक webhook एक प्रति-चर्च सदस्यता है जिसमें एक गंतव्य URL, एक साइनिंग सीक्रेट, और सदस्यता ली गई इवेंट्स की सूची होती है।

डिलीवरी एक **टिकाऊ आउटबॉक्स** का उपयोग करती है: जब कोई सदस्यता ली गई इवेंट होती है, तो B1 एक डिलीवरी पंक्ति रिकॉर्ड करता है और एक बैकग्राउंड वर्कर लगभग एक मिनट के भीतर उसे POST करता है। विफल डिलीवरी को एक्सपोनेंशियल बैकऑफ़ के साथ फिर से प्रयास किया जाता है। यदि कोई डिलीवरी धीमी है या आपका एंडपॉइंट थोड़े समय के लिए डाउन है तो कुछ भी नहीं खोता।

## एक Webhook पंजीकृत करना

### B1Admin में

**Settings → Developer → Webhooks → New Webhook** पर जाएँ। एक नाम, पेलोड URL दर्ज करें, और सदस्यता के लिए इवेंट्स चुनें। सेव करने पर, **साइनिंग सीक्रेट एक बार दिखाया जाता है** — इसे तुरंत कॉपी करें और अपने इंटीग्रेशन के साथ स्टोर करें। यह फिर कभी नहीं दिखाया जाता (आप इसे बाद में रोटेट कर सकते हैं, लेकिन मूल को पुनर्प्राप्त नहीं कर सकते)।

### API के माध्यम से

सभी एंडपॉइंट Membership मॉड्यूल के बेस पथ `/membership/webhooks` के अंतर्गत हैं और या तो `Settings / Edit` अनुमति वाले चर्च व्यवस्थापक से एक JWT की आवश्यकता होती है, **या `settings:write` scope के साथ बनाई गई एक [API key](./api-keys)** की। समान रूट दोनों को स्वीकार करते हैं। यही वह चीज़ है जो Zapier और Make को Zap या scenario चालू होने पर चर्च की ओर से webhooks पंजीकृत करने देती है।

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

create प्रतिक्रिया — और **केवल** create प्रतिक्रिया — में `secret` शामिल होता है:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| मेथड और पथ | उद्देश्य |
|---|---|
| `GET /membership/webhooks` | चर्च के webhooks की सूची (सीक्रेट छोड़ा गया) |
| `GET /membership/webhooks/events` | मान्य इवेंट नामों की सूची |
| `GET /membership/webhooks/:id` | एक webhook लोड करें |
| `POST /membership/webhooks` | बनाएँ (`id` के बिना) या अपडेट करें (`id` के साथ) |
| `POST /membership/webhooks/:id/regenerate-secret` | साइनिंग सीक्रेट रोटेट करें; नया मान एक बार लौटाता है |
| `DELETE /membership/webhooks/:id` | एक webhook हटाएँ |
| `GET /membership/webhooks/:id/deliveries` | एक webhook के लिए हाल के डिलीवरी प्रयास |
| `GET /membership/webhooks/deliveries/:deliveryId` | एक डिलीवरी के लिए पूर्ण पेलोड और प्रतिक्रिया |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | एक डिलीवरी को फिर से कतार में लगाएँ |

## इवेंट सूची

इवेंट नाम `{entity}.{action}` पैटर्न का पालन करते हैं। `GET /membership/webhooks/events` से लाइव सूची लाएँ।

| इवेंट | कब फायर होता है |
|---|---|
| `person.created` | एक व्यक्ति जोड़ा जाता है |
| `person.updated` | एक व्यक्ति रिकॉर्ड बदला जाता है |
| `person.destroyed` | एक व्यक्ति हटाया जाता है |
| `household.created` | एक परिवार जोड़ा जाता है |
| `household.updated` | एक परिवार बदला जाता है |
| `household.destroyed` | एक परिवार हटाया जाता है |
| `group.created` | एक समूह जोड़ा जाता है |
| `group.updated` | एक समूह बदला जाता है |
| `group.destroyed` | एक समूह हटाया जाता है |
| `group.member.added` | एक व्यक्ति को समूह में जोड़ा जाता है |
| `group.member.removed` | एक व्यक्ति को समूह से हटाया जाता है |
| `donation.created` | एक दान रिकॉर्ड किया जाता है — मैनुअल एंट्री, ऑनलाइन, या pending → complete ट्रांज़िशन |
| `donation.updated` | एक दान रिकॉर्ड संपादित किया जाता है |
| `attendance.recorded` | एक विज़िट लॉग की जाती है (मैनुअल एंट्री या चेक-इन) |
| `session.created` | एक नया उपस्थिति सत्र बनाया जाता है (मैनुअल रूप से या पहले चेक-इन पर स्वतः) |
| `form.submission.created` | एक फ़ॉर्म सबमिट किया जाता है |
| `event.created` | एक कैलेंडर इवेंट जोड़ा जाता है |
| `event.updated` | एक कैलेंडर इवेंट संपादित किया जाता है |
| `event.destroyed` | एक कैलेंडर इवेंट हटाया जाता है |

## पेलोड प्रारूप

प्रत्येक डिलीवरी एक JSON बॉडी और इन हेडर्स के साथ एक HTTP `POST` है:

| हेडर | विवरण |
|---|---|
| `Content-Type` | हमेशा `application/json` |
| `X-B1-Event` | इवेंट का नाम, जैसे `person.created` |
| `X-B1-Delivery-Id` | इस डिलीवरी प्रयास के लिए अद्वितीय id — डिडुप्लीकेट करने के लिए इसका उपयोग करें |
| `X-B1-Signature` | रॉ बॉडी का HMAC-SHA256 सिग्नेचर (नीचे देखें) |
| `X-B1-Timestamp` | जब अनुरोध भेजा गया था तब का Unix epoch सेकंड |
| `User-Agent` | `B1-Webhooks/1.0` |

बॉडी बदले गए रिसोर्स को एक छोटे envelope में लपेटती है:

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

`*.destroyed` इवेंट्स के लिए, `data` में केवल हटाए गए रिकॉर्ड की `id` और `churchId` होती है।

जिन इवेंट्स के पेलोड id द्वारा अन्य रिकॉर्ड को संदर्भित करते हैं वे भी डिलीवरी के समय resolve किए गए मानव-पठनीय नाम ले जाते हैं: ग्रुप मेंबरशिप इवेंट्स पर `personName` और `groupName`, उपस्थिति, दान, और लिस्ट मेंबरशिप इवेंट्स पर `personName`, `session.created` पर `groupName`, और `form.submission.created` पर `formName` (साथ ही जब सबमिशन किसी व्यक्ति से जुड़ा हो तो `personName`)।

## कनेक्टर प्रकार

डिफ़ॉल्ट डिलीवरी प्रारूप ऊपर दिया गया JSON envelope है — `connectorType: "standard"`। [Slack और Discord](/docs/b1-admin/integrations/slack-discord) के लिए वही webhook इंजन इसके बजाय एक चैट-आकार का संदेश पोस्ट करता है जिसे वे सेवाएँ सीधे स्वीकार करती हैं:

| `connectorType` | भेजी गई बॉडी | कब उपयोग करें |
|---|---|---|
| `"standard"` (डिफ़ॉल्ट) | `{event, churchId, occurredAt, data}` envelope, साइन किया हुआ | आप अपना खुद का इंटीग्रेशन लिख रहे हैं, या Zapier / Make / एक कस्टम सर्वर की ओर इशारा कर रहे हैं |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | आप सीधे एक Slack Incoming Webhook URL पर पोस्ट कर रहे हैं |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | आप सीधे एक Discord चैनल webhook URL पर पोस्ट कर रहे हैं |

कनेक्टर प्रकार webhook संपादक पर **Connector Type** ड्रॉपडाउन में, या `POST /membership/webhooks` बॉडी में `connectorType` के माध्यम से सेट किया जाता है। साइन किया गया `X-B1-Signature` हेडर अभी भी Slack/Discord डिलीवरी के लिए भेजा जाता है (वे इसे हानिरहित रूप से नज़रअंदाज़ करते हैं), इसलिए बाद में एक webhook को `standard` पर वापस बदलने के लिए किसी पुनः-साइनिंग की आवश्यकता नहीं है।

## टेस्ट डिलीवरी

हर webhook संपादक में एक **Send Test Event** बटन होता है — संबंधित API कॉल है `POST /membership/webhooks/:id/test`। टेस्ट रूट पहली सदस्यता ली गई इवेंट के लिए एक सिंथेटिक पेलोड बनाता है, इसे वास्तविक साइन की गई डिलीवरी पथ के माध्यम से समकालिक रूप से भेजता है (और Slack/Discord के लिए `formatForConnector` के माध्यम से भी), और परिणामी डिलीवरी पंक्ति को `responseStatus` और `responseBody` सहित लौटाता है। इसे वास्तव में इंटीग्रेशन को चालू करने से पहले कनेक्टिविटी और सिग्नेचर हैंडलिंग की पुष्टि करने के लिए उपयोग करें।

## सिग्नेचर सत्यापित करना

किसी पेलोड पर भरोसा करने से पहले हमेशा `X-B1-Signature` को सत्यापित करें। सिग्नेचर `sha256=` है जिसके बाद आपके साइनिंग सीक्रेट के साथ keyed **रॉ अनुरोध बॉडी** का hex HMAC-SHA256 आता है। इसे उन बाइट्स पर गणना करें जो आपने प्राप्त किए — पार्स किए गए JSON को फिर से सीरियलाइज़ न करें।

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

किसी भी अनुरोध को अस्वीकार करें जिसका सिग्नेचर मेल नहीं खाता। रीप्ले विंडो को सीमित करने के लिए वैकल्पिक रूप से उन अनुरोधों को भी अस्वीकार करें जिनका `X-B1-Timestamp` कुछ मिनटों से अधिक पुराना है।

## SDK समर्थन

Node.js के लिए, `@churchapps/integration-sdk` एक टाइप किया गया verifier और एक Express middleware देता है जो आपके लिए रॉ-बॉडी कैप्चर, सिग्नेचर जाँच, और envelope पार्सिंग को संभालता है:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// JSON parsing से पहले रॉ बॉडी कैप्चर करें — यह आवश्यक है ताकि सिग्नेचर अभी भी सत्यापित हो।
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDK non-Express रनटाइम (serverless functions, Fastify, आदि) के लिए `WebhookVerifier.verify(secret, rawBody, signatureHeader)` भी उजागर करता है। पैकेज को npm पर देखें।

## डिलीवरी और पुनः प्रयास

आपके एंडपॉइंट को जितनी जल्दी हो सके एक `2xx` स्थिति के साथ प्रतिक्रिया देनी चाहिए — आदर्श रूप से केवल काम को कतार में लगाने के बाद, उसे प्रोसेस करने के बाद नहीं। कोई भी गैर-`2xx` प्रतिक्रिया, एक कनेक्शन विफलता, या **10 सेकंड** से धीमी प्रतिक्रिया एक विफल डिलीवरी के रूप में गिनी जाती है।

विफल डिलीवरी को एक्सपोनेंशियल बैकऑफ़ के साथ फिर से प्रयास किया जाता है — लगभग **5 दिनों में 16 प्रयास**। अंतराल 1 मिनट से बढ़ता है, घंटों के माध्यम से, अंतिम प्रयासों के लिए 3-दिन के अंतराल तक। 16वें विफल प्रयास के बाद डिलीवरी को `exhausted` चिह्नित किया जाता है और छोड़ दिया जाता है।

डिलीवरी **at-least-once** है: एक डिलीवरी एक से अधिक बार आ सकती है (उदाहरण के लिए, यदि आपका एंडपॉइंट सफल होता है लेकिन प्रतिक्रिया खो जाती है)। डिडुप्लीकेट करने के लिए `X-B1-Delivery-Id` हेडर का उपयोग करें — प्रत्येक id को केवल एक बार प्रोसेस करें और दोहराव को no-ops के रूप में मानें।

### स्वतः-निष्क्रियकरण

यदि कोई webhook **लगातार तीन exhausted डिलीवरी** उत्पन्न करता है, तो B1 इसे स्वतः निष्क्रिय कर देता है। अपना एंडपॉइंट ठीक करें, फिर B1Admin में webhook को फिर से सक्षम करें (या `"active": true` के साथ `POST /membership/webhooks` के माध्यम से)।

## निरीक्षण और पुनः डिलीवरी

B1Admin में webhook संपादक एक **Recent Deliveries** तालिका दिखाता है — इवेंट, स्थिति, प्रयास गणना, प्रतिक्रिया कोड, और टाइमस्टैम्प। एक पंक्ति चुनने पर भेजा गया पूर्ण पेलोड और वापस आई प्रतिक्रिया दिखती है।

किसी भी पिछली डिलीवरी को उसके मूल पेलोड के साथ फिर से कतार में लगाने के लिए **Redeliver** का उपयोग करें — यह आपके एंडपॉइंट में एक बग ठीक करने के बाद, या जब आपका एंडपॉइंट डाउन था तब छूटी इवेंट्स को बैकफ़िल करने के लिए उपयोगी है।

## URL आवश्यकताएँ

क्योंकि webhook URL चर्च द्वारा दिए जाते हैं, B1 सर्वर-साइड रिक्वेस्ट फोर्जरी के खिलाफ सुरक्षा लागू करता है। एक webhook URL को अस्वीकार कर दिया जाता है — पंजीकरण पर और हर डिलीवरी से पहले फिर से जाँचा जाता है — यदि यह:

- **`https`** का उपयोग नहीं करता है
- `localhost`, एक `.local` / `.internal` होस्टनेम की ओर इशारा करता है, या
- एक **प्राइवेट, लूपबैक, लिंक-लोकल, या क्लाउड-मेटाडेटा** IP पते को resolve करता है

आपका एंडपॉइंट एक सार्वजनिक रूप से पहुँच योग्य HTTPS सेवा होना चाहिए।
