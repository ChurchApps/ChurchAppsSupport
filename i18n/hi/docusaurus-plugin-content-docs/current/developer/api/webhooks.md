---
title: "वेबहुक"
description: "B1 Admin से रीयल-टाइम वेबहुक सेट करें: एंडपॉइंट पंजीकृत करें, इवेंट चुनें, HMAC हस्ताक्षर सत्यापित करें, पुनःप्रयास संभालें, और विफल पेलोड फिर से भेजें।"
---

# वेबहुक

<div class="article-intro">

वेबहुक की मदद से कोई चर्च तीसरे-पक्ष के टूल्स को तुरंत सूचनाएँ भेज सकता है। इनमें ऑटोमेशन प्लेटफ़ॉर्म (Zapier, Make, n8n), CRM, अकाउंटिंग सिस्टम, या ऐसा कोई भी सिस्टम शामिल है जो HTTP POST स्वीकार करता हो। जब B1 में कोई व्यक्ति, समूह या परिवार बदलता है, तो B1 उस इवेंट की सदस्यता लेने वाले हर URL पर एक हस्ताक्षरित JSON पेलोड भेजता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- वेबहुक पंजीकृत और प्रबंधित करने के लिए **Edit Church Settings** अनुमति वाला चर्च एडमिन चाहिए
- आपका प्राप्त करने वाला एंडपॉइंट एक सार्वजनिक पते पर **HTTPS** से पहुँच योग्य होना चाहिए
- हस्ताक्षर वाली सीक्रेट कुंजी को सुरक्षित रूप से संग्रहित करने का तरीका तैयार रखें — यह केवल एक बार दिखाई जाती है

</div>

## अवलोकन

वेबहुक केवल **आउटबाउंड** होते हैं: B1 आपके एंडपॉइंट को कॉल करता है, आप B1 को कॉल नहीं करते। हर वेबहुक एक प्रति-चर्च सदस्यता है, जिसमें एक गंतव्य URL, एक हस्ताक्षर सीक्रेट, और सदस्यता लिए गए इवेंट्स की सूची होती है।

डिलीवरी के लिए **टिकाऊ आउटबॉक्स** का उपयोग होता है: जब कोई सदस्यता वाला इवेंट होता है, तो B1 एक डिलीवरी रिकॉर्ड सहेजता है, और एक बैकग्राउंड वर्कर लगभग एक मिनट के भीतर उसे POST कर देता है। असफल डिलीवरी को एक्सपोनेंशियल बैकऑफ़ के साथ फिर से प्रयास किया जाता है। यदि डिलीवरी धीमी हो या आपका एंडपॉइंट थोड़ी देर के लिए डाउन हो, तब भी कुछ नहीं खोता।

## वेबहुक पंजीकृत करना

### B1Admin में

**Settings → Developer → Webhooks → New Webhook** पर जाएँ। नाम, पेलोड URL दर्ज करें और वे इवेंट चुनें जिनकी सदस्यता लेनी है। सहेजने पर **हस्ताक्षर सीक्रेट एक बार दिखाया जाता है** — उसे तुरंत कॉपी करें और अपने इंटीग्रेशन के साथ संग्रहित करें। इसे दोबारा नहीं दिखाया जाता (आप इसे बाद में बदल सकते हैं, लेकिन मूल मान वापस नहीं पा सकते)।

### API के माध्यम से

सभी एंडपॉइंट Membership मॉड्यूल के बेस पाथ `/membership/webhooks` के अंतर्गत हैं और इन्हें या तो `Settings / Edit` अनुमति वाले चर्च एडमिन के JWT की, **या `settings:write` स्कोप के साथ बनाई गई [API कुंजी](./api-keys.md) की** आवश्यकता होती है। ये दोनों तरीके एक ही रूट्स पर काम करते हैं। इसी की वजह से जब कोई Zap या scenario चालू किया जाता है, तो Zapier और Make चर्च की ओर से वेबहुक पंजीकृत कर पाते हैं।

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

क्रिएट रिस्पॉन्स — और **केवल** क्रिएट रिस्पॉन्स — में `secret` शामिल होता है:

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

| मेथड और पाथ | उद्देश्य |
|---|---|
| `GET /membership/webhooks` | चर्च के वेबहुक की सूची (secret शामिल नहीं) |
| `GET /membership/webhooks/events` | मान्य इवेंट नामों की सूची |
| `GET /membership/webhooks/:id` | एक वेबहुक लोड करें |
| `POST /membership/webhooks` | बनाएँ (बिना `id` के) या अपडेट करें (`id` के साथ) |
| `POST /membership/webhooks/:id/regenerate-secret` | हस्ताक्षर सीक्रेट बदलें; नया मान एक बार लौटाता है |
| `DELETE /membership/webhooks/:id` | वेबहुक हटाएँ |
| `GET /membership/webhooks/:id/deliveries` | किसी वेबहुक के हालिया डिलीवरी प्रयास |
| `GET /membership/webhooks/deliveries/:deliveryId` | एक डिलीवरी का पूरा पेलोड और रिस्पॉन्स |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | किसी डिलीवरी को फिर से कतार में डालें |

## इवेंट सूची

इवेंट नाम `{entity}.{action}` पैटर्न का पालन करते हैं। मौजूदा सूची `GET /membership/webhooks/events` से प्राप्त करें।

| इवेंट | कब चलता है |
|---|---|
| `person.created` | कोई व्यक्ति जोड़ा जाता है |
| `person.updated` | किसी व्यक्ति का रिकॉर्ड बदला जाता है |
| `person.destroyed` | कोई व्यक्ति हटाया जाता है |
| `household.created` | कोई परिवार जोड़ा जाता है |
| `household.updated` | किसी परिवार में बदलाव होता है |
| `household.destroyed` | कोई परिवार हटाया जाता है |
| `group.created` | कोई समूह जोड़ा जाता है |
| `group.updated` | किसी समूह में बदलाव होता है |
| `group.destroyed` | कोई समूह हटाया जाता है |
| `group.member.added` | कोई व्यक्ति किसी समूह में जोड़ा जाता है |
| `group.member.removed` | कोई व्यक्ति किसी समूह से हटाया जाता है |
| `donation.created` | कोई दान दर्ज होता है — मैनुअल एंट्री, ऑनलाइन, या pending से complete की स्थिति में बदलाव |
| `donation.updated` | किसी दान रिकॉर्ड में संपादन होता है |
| `attendance.recorded` | कोई उपस्थिति दर्ज होती है (मैनुअल एंट्री या check-in) |
| `session.created` | नया उपस्थिति सत्र बनता है (मैनुअल रूप से या पहले check-in पर स्वचालित रूप से) |
| `form.submission.created` | कोई फ़ॉर्म सबमिट होता है |
| `event.created` | कैलेंडर इवेंट जोड़ा जाता है |
| `event.updated` | कैलेंडर इवेंट संपादित होता है |
| `event.destroyed` | कैलेंडर इवेंट हटाया जाता है |

## पेलोड फ़ॉर्मैट

हर डिलीवरी एक HTTP `POST` होती है, जिसमें JSON बॉडी और ये हेडर होते हैं:

| हेडर | विवरण |
|---|---|
| `Content-Type` | हमेशा `application/json` |
| `X-B1-Event` | इवेंट नाम, जैसे `person.created` |
| `X-B1-Delivery-Id` | इस डिलीवरी प्रयास का अनोखा ID — डुप्लिकेट पहचानने के लिए इसका उपयोग करें |
| `X-B1-Signature` | कच्ची बॉडी का HMAC-SHA256 हस्ताक्षर (नीचे देखें) |
| `X-B1-Timestamp` | अनुरोध भेजे जाने का Unix epoch सेकंड में समय |
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

`*.destroyed` इवेंट्स के लिए `data` में केवल हटाए गए रिकॉर्ड का `id` और `churchId` होता है।

जो इवेंट पेलोड दूसरे रिकॉर्ड्स को ID से संदर्भित करते हैं, उनमें डिलीवरी के समय हल किए गए मानव-पठनीय नाम भी होते हैं: समूह सदस्यता इवेंट्स पर `personName` और `groupName`, उपस्थिति, दान और सूची सदस्यता इवेंट्स पर `personName`, `session.created` पर `groupName`, और `form.submission.created` पर `formName` (और जब सबमिशन किसी व्यक्ति से जुड़ा हो तो `personName`)।

## कनेक्टर प्रकार

डिफ़ॉल्ट डिलीवरी फ़ॉर्मैट ऊपर वाला JSON envelope है — `connectorType: "standard"`। [Slack और Discord](/docs/b1-admin/integrations/slack-discord) के लिए वही वेबहुक इंजन एक चैट-शैली संदेश भेजता है, जिसे ये सेवाएँ सीधे स्वीकार करती हैं:

| `connectorType` | भेजी गई बॉडी | कब उपयोग करें |
|---|---|---|
| `"standard"` (डिफ़ॉल्ट) | `{event, churchId, occurredAt, data}` envelope, हस्ताक्षरित | जब आप अपना इंटीग्रेशन बना रहे हों, या Zapier / Make / किसी कस्टम सर्वर की ओर इशारा कर रहे हों |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | जब आप सीधे Slack Incoming Webhook URL पर पोस्ट कर रहे हों |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | जब आप सीधे Discord चैनल वेबहुक URL पर पोस्ट कर रहे हों |
| `"mailchimp"` | लागू नहीं — कनेक्टर स्वयं Mailchimp API को कॉल करता है | जब आप बिना होस्ट करने वाले URL के [ऑडियंस सिंक](/docs/b1-admin/integrations/services/mailchimp) चाहते हों |

कनेक्टर प्रकार वेबहुक एडिटर पर **Connector Type** ड्रॉपडाउन से, या `POST /membership/webhooks` बॉडी में `connectorType` के माध्यम से सेट होता है। Slack/Discord डिलीवरी के लिए भी हस्ताक्षरित `X-B1-Signature` हेडर भेजा जाता है (वे उसे बिना नुकसान के नज़रअंदाज़ कर देते हैं), इसलिए बाद में वेबहुक को `standard` पर वापस बदलने के लिए दोबारा हस्ताक्षर करने की ज़रूरत नहीं होती।

Slack और Discord केवल बॉडी का रूप बदलने वाले कनेक्टर हैं — इंजन अब भी चर्च द्वारा दिए गए URL पर POST करता है। `mailchimp` पहला कनेक्टर है जो अपना HTTP संवाद स्वयं संभालता है: हर इवेंट के लिए यह Mailchimp API पर प्रमाणीकृत upsert/archive/tag अनुरोध भेजता है (`MailchimpConnector.deliver`), और इसके क्रेडेंशियल (`{apiKey, audienceId}`) `webhooks.connectorConfig` में AES-एन्क्रिप्टेड संग्रहित होते हैं, और API के माध्यम से केवल लिखे जा सकते हैं, पढ़े नहीं। Mailchimp वेबहुक केवल व्यक्ति, समूह-सदस्य और सूची-सदस्य इवेंट्स स्वीकार करते हैं; सेव रूट सहेजने से पहले Mailchimp पर की और ऑडियंस की पुष्टि करता है। डिलीवरी रिकॉर्ड में मानक envelope सहेजा जाता है, ताकि डिलीवरी लॉग में दिखे कि B1 ने क्या देखा और Mailchimp का रिस्पॉन्स क्या था। जो स्थितियाँ मैप नहीं हो सकीं (बिना ईमेल वाला व्यक्ति, बिना मैपिंग वाला इवेंट) उन्हें `Skipped:` रिस्पॉन्स बॉडी के साथ सफल मान लिया जाता है, ताकि वे बेवजह retry न करें।

## टेस्ट डिलीवरी

हर वेबहुक एडिटर में **Send Test Event** बटन होता है — इसका संबंधित API कॉल `POST /membership/webhooks/:id/test` है। टेस्ट रूट पहली सदस्यता वाले इवेंट के लिए एक सिंथेटिक पेलोड बनाता है, उसे असली हस्ताक्षरित डिलीवरी पथ से (और Slack/Discord के लिए `formatForConnector` से) तुरंत भेजता है, और परिणामी डिलीवरी रिकॉर्ड लौटाता है, जिसमें `responseStatus` और `responseBody` शामिल हैं। इसका उपयोग वास्तविक रूप से इंटीग्रेशन चालू करने से पहले कनेक्टिविटी और हस्ताक्षर संभाल की पुष्टि के लिए करें। `mailchimp` वेबहुक के लिए टेस्ट इसके बजाय संग्रहित क्रेडेंशियल की Mailchimp API पर पुष्टि करता है (एक सिंथेटिक इवेंट चर्च की असली ऑडियंस में नकली सब्सक्राइबर लिख देगा), और बिना कोई रिकॉर्ड बनाए डिलीवरी-जैसा परिणाम लौटाता है।

## हस्ताक्षर सत्यापित करना

किसी पेलोड पर भरोसा करने से पहले हमेशा `X-B1-Signature` सत्यापित करें। हस्ताक्षर `sha256=` के बाद, आपकी साइनिंग सीक्रेट से की गई **कच्ची अनुरोध बॉडी** का hex HMAC-SHA256 होता है। उन बाइट्स पर गणना करें जो आपको मिले हैं — पार्स किए गए JSON को दोबारा सीरियलाइज़ न करें।

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

जिस अनुरोध का हस्ताक्षर मेल न खाए, उसे अस्वीकार करें। वैकल्पिक रूप से, रीप्ले विंडो सीमित करने के लिए उन अनुरोधों को भी अस्वीकार किया जा सकता है जिनका `X-B1-Timestamp` कुछ मिनटों से ज़्यादा पुराना हो।

## SDK समर्थन

Node.js के लिए, `@churchapps/integration-sdk` एक टाइप्ड वेरिफ़ायर और एक Express मिडलवेयर देता है, जो raw-body कैप्चर, हस्ताक्षर जाँच और envelope पार्सिंग आपके लिए संभालता है:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// JSON पार्सिंग से पहले raw body कैप्चर करें — हस्ताक्षर सत्यापित होने के लिए यह ज़रूरी है।
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDK गैर-Express रनटाइम (सर्वरलेस फ़ंक्शन, Fastify आदि) के लिए `WebhookVerifier.verify(secret, rawBody, signatureHeader)` भी देता है। विवरण के लिए npm पर पैकेज देखें।

## डिलीवरी और retry

आपके एंडपॉइंट को जितनी जल्दी हो सके `2xx` स्टेटस लौटाना चाहिए — आदर्श रूप से, काम प्रोसेस करने के बाद नहीं, बल्कि केवल उसे कतार में डालने के बाद। कोई भी गैर-`2xx` रिस्पॉन्स, कनेक्शन विफलता, या **10 सेकंड** से धीमा रिस्पॉन्स असफल डिलीवरी माना जाता है।

असफल डिलीवरी को एक्सपोनेंशियल बैकऑफ़ के साथ फिर से प्रयास किया जाता है — **लगभग 5 दिनों में 16 प्रयास**। अंतराल 1 मिनट से शुरू होकर घंटों तक बढ़ता है, और अंतिम प्रयासों के बीच 3-दिन का अंतर होता है। 16वें असफल प्रयास के बाद डिलीवरी को `exhausted` चिह्नित कर दिया जाता है और छोड़ दिया जाता है।

डिलीवरी **at-least-once** है: कोई डिलीवरी एक से अधिक बार भी पहुँच सकती है (उदाहरण के लिए, यदि आपका एंडपॉइंट सफल हो गया लेकिन रिस्पॉन्स खो गया)। डुप्लिकेट से बचने के लिए `X-B1-Delivery-Id` हेडर का उपयोग करें — हर ID को केवल एक बार प्रोसेस करें और दोहराव को कोई प्रभाव न डालने वाला मानें।

### अपने-आप बंद होना

यदि किसी वेबहुक की **तीन लगातार exhausted डिलीवरी** होती हैं, तो B1 उसे स्वतः बंद कर देता है। अपना एंडपॉइंट ठीक करें, फिर B1Admin में वेबहुक दोबारा चालू करें (या `"active": true` के साथ `POST /membership/webhooks` के माध्यम से)।

## जाँचना और दोबारा भेजना

B1Admin का वेबहुक एडिटर एक **Recent Deliveries** तालिका दिखाता है — इवेंट, स्थिति, प्रयासों की संख्या, रिस्पॉन्स कोड और समय। किसी पंक्ति को चुनने पर भेजा गया पूरा पेलोड और लौटा हुआ रिस्पॉन्स दिखता है।

किसी भी पुरानी डिलीवरी को उसके मूल पेलोड के साथ फिर से कतार में डालने के लिए **Redeliver** का उपयोग करें — यह आपके एंडपॉइंट में बग ठीक करने के बाद उपयोगी है, या उन इवेंट्स को दोबारा भेजने के लिए जो आपका एंडपॉइंट डाउन रहने के दौरान छूट गए।

## URL की आवश्यकताएँ

चूँकि वेबहुक URL चर्च द्वारा दिए जाते हैं, B1 server-side request forgery के विरुद्ध सुरक्षा लागू करता है। वेबहुक URL को पंजीकरण के समय अस्वीकार किया जाता है — और हर डिलीवरी से पहले फिर से जाँचा जाता है — यदि वह:

- **`https`** का उपयोग नहीं करता
- `localhost`, किसी `.local` / `.internal` होस्टनेम की ओर इशारा करता है, या
- किसी **प्राइवेट, loopback, link-local, या cloud-metadata** IP पर हल होता है

आपका एंडपॉइंट एक सार्वजनिक रूप से पहुँच योग्य HTTPS सेवा होना चाहिए।
