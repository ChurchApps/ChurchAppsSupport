---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks चर्च को तीसरे पक्ष के उपकरणों - ऑटोमेशन प्लेटफार्म (Zapier, Make, n8n), CRM, लेखा प्रणालियों, या HTTP POST स्वीकार करने वाली किसी भी चीज़ को रीयल-टाइम सूचनाएं पुश करने देते हैं। जब B1 में कोई व्यक्ति, समूह या परिवार बदलता है, तो B1 उस घटना की सदस्यता लेने वाले प्रत्येक URL को एक हस्ताक्षरित JSON पेलोड भेजता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **चर्च सेटिंग्स संपादित करें** अनुमति वाला चर्च व्यवस्थापक webhooks को पंजीकृत और प्रबंधित करता है
- आपके प्राप्त करने वाले endpoint को सार्वजनिक पते पर **HTTPS** के माध्यम से पहुंचने योग्य होना चाहिए
- हस्ताक्षर रहस्य को सुरक्षित रूप से संग्रहीत करने का एक तरीका होना चाहिए - यह केवल एक बार दिखाया जाता है

</div>

## अवलोकन

Webhooks **आउटबाउंड** केवल हैं: B1 आपके endpoint को कॉल करता है, आप B1 को कॉल नहीं करते। प्रत्येक webhook एक प्रति-चर्च सदस्यता है जिसमें एक गंतव्य URL, एक हस्ताक्षर रहस्य और सदस्यता ली गई घटनाओं की सूची होती है।

डिलीवरी **टिकाऊ आउटबॉक्स** का उपयोग करती है: जब कोई सदस्यता ली गई घटना होती है, तो B1 एक डिलीवरी पंक्ति रिकॉर्ड करता है और एक पृष्ठभूमि कार्यकर्ता इसे लगभग एक मिनट के भीतर POST करता है। विफल डिलीवरी को घातीय backoff के साथ फिर से प्रयास किया जाता है। यदि कोई डिलीवरी धीमी है या आपका endpoint कुछ समय के लिए डाउन है तो कुछ भी खोता नहीं है।

## Webhook पंजीकृत करना

### B1Admin में

**सेटिंग्स → Webhooks → New Webhook** पर जाएं। एक नाम, पेलोड URL दर्ज करें और सदस्यता लेने के लिए घटनाओं का चयन करें। सहेजने पर, **हस्ताक्षर रहस्य एक बार प्रदर्शित होता है** - इसे तुरंत कॉपी करें और इसे अपने एकीकरण के साथ संग्रहीत करें। यह फिर कभी नहीं दिखाया जाता है (आप इसे बाद में घुमा सकते हैं, लेकिन आप मूल को पुनर्प्राप्त नहीं कर सकते)।

### API के माध्यम से

सभी endpoints Membership मॉड्यूल बेस पथ `/membership/webhooks` के अंतर्गत हैं और `Settings / Edit` अनुमति के साथ चर्च व्यवस्थापक से JWT की आवश्यकता होती है।

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

create प्रतिक्रिया - और **केवल** create प्रतिक्रिया - में `secret` शामिल है:

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

| विधि और पथ | उद्देश्य |
|---|---|
| `GET /membership/webhooks` | चर्च के webhooks की सूची बनाएं (रहस्य छोड़ा गया) |
| `GET /membership/webhooks/events` | वैध घटना नामों की कैटलॉग |
| `GET /membership/webhooks/:id` | एक webhook लोड करें |
| `POST /membership/webhooks` | बनाएं (`id` के बिना) या अपडेट करें (`id` के साथ) |
| `POST /membership/webhooks/:id/regenerate-secret` | हस्ताक्षर रहस्य घुमाएं; नया मान एक बार लौटाता है |
| `DELETE /membership/webhooks/:id` | webhook हटाएं |
| `GET /membership/webhooks/:id/deliveries` | webhook के लिए हाल की डिलीवरी प्रयास |
| `GET /membership/webhooks/deliveries/:deliveryId` | एक डिलीवरी के लिए पूर्ण पेलोड और प्रतिक्रिया |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | डिलीवरी को फिर से कतार में लगाएं |

## घटना कैटलॉग

घटना के नाम `{entity}.{action}` पैटर्न का पालन करते हैं। `GET /membership/webhooks/events` से लाइव सूची प्राप्त करें।

| घटना | कब होती है |
|---|---|
| `person.created` | कोई व्यक्ति जोड़ा जाता है |
| `person.updated` | व्यक्ति रिकॉर्ड बदला जाता है |
| `person.destroyed` | कोई व्यक्ति हटाया जाता है |
| `household.created` | कोई परिवार जोड़ा जाता है |
| `household.updated` | कोई परिवार बदला जाता है |
| `household.destroyed` | कोई परिवार हटाया जाता है |
| `group.created` | कोई समूह जोड़ा जाता है |
| `group.updated` | कोई समूह बदला जाता है |
| `group.destroyed` | कोई समूह हटाया जाता है |
| `group.member.added` | किसी व्यक्ति को समूह में जोड़ा जाता है |
| `group.member.removed` | किसी व्यक्ति को समूह से हटाया जाता है |

## पेलोड प्रारूप

प्रत्येक डिलीवरी JSON बॉडी और इन हेडर के साथ HTTP `POST` है:

| हेडर | विवरण |
|---|---|
| `Content-Type` | हमेशा `application/json` |
| `X-B1-Event` | घटना का नाम, उदाहरण के लिए `person.created` |
| `X-B1-Delivery-Id` | इस डिलीवरी प्रयास के लिए अनोखी id - इसे डुप्लीकेट हटाने के लिए उपयोग करें |
| `X-B1-Signature` | कच्चे बॉडी का HMAC-SHA256 हस्ताक्षर (नीचे देखें) |
| `X-B1-Timestamp` | Unix epoch सेकंड जब अनुरोध भेजा गया था |
| `User-Agent` | `B1-Webhooks/1.0` |

बॉडी एक छोटे envelope में बदले गए संसाधन को लपेटती है:

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

`*.destroyed` घटनाओं के लिए, `data` में केवल हटाए गए रिकॉर्ड की `id` और `churchId` होती है।

## हस्ताक्षर सत्यापित करना

पेलोड पर भरोसा करने से पहले हमेशा `X-B1-Signature` सत्यापित करें। हस्ताक्षर `sha256=` के बाद आपके हस्ताक्षर रहस्य के साथ कुंजीबद्ध **कच्चे अनुरोध बॉडी** के hex HMAC-SHA256 है। इसे आपको प्राप्त बाइट्स पर गणना करें - पार्स किए गए JSON को फिर से क्रमबद्ध न करें।

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

किसी भी अनुरोध को अस्वीकार करें जिसका हस्ताक्षर मेल नहीं खाता। वैकल्पिक रूप से उन अनुरोधों को भी अस्वीकार करें जिनका `X-B1-Timestamp` कुछ मिनट से अधिक पुराना है ताकि replay विंडो को सीमित किया जा सके।

## डिलीवरी और पुनः प्रयास

आपके endpoint को जितनी जल्दी हो सके `2xx` स्थिति के साथ प्रतिक्रिया देनी चाहिए - आदर्श रूप से केवल काम को कतार में लगाने के बाद, इसे संसाधित करने के बाद नहीं। कोई भी गैर-`2xx` प्रतिक्रिया, कनेक्शन विफलता, या **10 सेकंड** से धीमी प्रतिक्रिया को विफल डिलीवरी के रूप में गिना जाता है।

विफल डिलीवरी को घातीय backoff के साथ फिर से प्रयास किया जाता है - **लगभग 5 दिनों में 16 प्रयास**। अंतराल 1 मिनट से बढ़ता है, घंटों के माध्यम से, अंतिम प्रयासों के लिए 3-दिन के अंतराल तक। 16वें विफल प्रयास के बाद डिलीवरी को `exhausted` चिह्नित किया जाता है और छोड़ दिया जाता है।

डिलीवरी **कम-से-कम-एक-बार** है: डिलीवरी एक से अधिक बार आ सकती है (उदाहरण के लिए, यदि आपका endpoint सफल होता है लेकिन प्रतिक्रिया खो जाती है)। डुप्लीकेट हटाने के लिए `X-B1-Delivery-Id` हेडर का उपयोग करें - प्रत्येक id को केवल एक बार संसाधित करें और दोहराव को no-ops के रूप में मानें।

### ऑटो-अक्षम करना

यदि webhook **तीन लगातार exhausted डिलीवरी** उत्पन्न करता है, तो B1 इसे स्वचालित रूप से अक्षम कर देता है। अपना endpoint ठीक करें, फिर B1Admin में webhook को फिर से सक्षम करें (या `POST /membership/webhooks` के माध्यम से `"active": true` के साथ)।

## निरीक्षण और पुनः डिलीवरी

B1Admin में webhook संपादक **हाल की डिलीवरी** तालिका दिखाता है - घटना, स्थिति, प्रयास गणना, प्रतिक्रिया कोड और टाइमस्टैम्प। एक पंक्ति का चयन करने से पूर्ण पेलोड जो भेजा गया था और वापस आई प्रतिक्रिया प्रकट होती है।

किसी भी पिछली डिलीवरी को उसके मूल पेलोड के साथ फिर से कतार में लगाने के लिए **Redeliver** का उपयोग करें - अपने endpoint में बग को ठीक करने के बाद उपयोगी, या उन घटनाओं को backfill करने के लिए जो आपका endpoint डाउन होने के दौरान छूट गया।

## URL आवश्यकताएं

क्योंकि webhook URL चर्च द्वारा आपूर्ति किए जाते हैं, B1 सर्वर-साइड अनुरोध जालसाजी के खिलाफ गार्ड लागू करता है। एक webhook URL को अस्वीकार कर दिया जाता है - पंजीकरण पर और प्रत्येक डिलीवरी से पहले फिर से जांचा जाता है - यदि यह:

- **`https`** का उपयोग नहीं करता है
- `localhost`, `.local` / `.internal` होस्टनाम की ओर इशारा करता है, या
- **निजी, loopback, link-local, या cloud-metadata** IP पते को हल करता है

आपका endpoint सार्वजनिक रूप से पहुंचने योग्य HTTPS सेवा होना चाहिए।
