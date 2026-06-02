---
title: "API Keys"
---

# API Keys

<div class="article-intro">

API keys (personal access tokens) B1 API के विरुद्ध एक सर्वर-साइड स्क्रिप्ट, तीसरे पक्ष के कनेक्टर (Zapier, Make, Google Sheets), या कहीं भी एक full OAuth flow overkill है, से प्रमाणীकरण करने का सबसे सरल तरीका है। एक key एक निर्दिष्ट चर्च में एक निर्दिष्ट व्यक्ति को bound है और उस व्यक्ति की अनुमतियों को inherit करता है, एक optional scopes सेट द्वारा narrowed।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक चर्च एडमिन **Edit Settings** अनुमति के साथ keys बनाता है और प्रबंधित करता है
- raw key **एक बार** creation पर दिखाया जाता है -- इसे तुरंत कहीं सुरक्षित स्टोर करें
- सभी API अनुरोधों को **HTTPS** का उपयोग करना चाहिए

</div>

## Key Format

एक B1 API key इस तरह दिखता है:

```
cak_<prefix>.<secret>
```

- `cak_` -- fixed identifier (API key prefix जो auth layer match करता है)
- `<prefix>` -- 8-character public lookup segment
- `<secret>` -- 48-character secret; केवल SHA-256 hash server-side पर store किया जाता है

पूरा key मानक bearer हेडर में सर्वर को प्रस्तुत किया जाता है:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

API auth layer किसी भी token को `cak_` से शुरू होने वाले को API-key path पर route करता है, secret को hash करता है, prefix द्वारा इसे look up करता है, और key के व्यक्ति की current permissions को resolve करता है -- तो B1Admin में एक अनुमति को revoke करना अगले अनुरोध पर प्रभाव में जाता है, और key कभी भी अनुमतियों के साथ out of sync नहीं होता।

## Key बनाना (B1Admin)

1. **Edit Settings** के साथ एक उपयोगकर्ता के रूप में B1Admin में साइन इन करें।
2. **Settings → Developer → API Keys** खोलें।
3. **New API Key** पर क्लिक करें, एक recognizable नाम दें (जैसे "Zapier — donations sync"), key के पास जो scopes होने चाहिए उन्हें चुनें, और **Save** करें।
4. पूरा `cak_…` key एक dialog में **एक बार** दिखाया जाता है। इसे बंद करने से पहले अपने integration के config में कॉपी करें -- इसे बाद में retrieve करने का कोई तरीका नहीं है। आप हमेशा एक नया key बना सकते हैं।

## Scopes

एक scope **narrows** क्या एक key कर सकता है -- यह कभी भी ऐसी अनुमति नहीं दे सकता जो underlying व्यक्ति के पास नहीं है। खाली / कोई scopes नहीं मतलब key व्यक्ति के full permission set carry करता है।

| Scope | अनुमति देता है |
|---|---|
| `people:read` / `people:write` | लोगों को देखें / संपादित करें, परिवार, समूह सदस्य |
| `groups:read` / `groups:write` | समूहों को देखें / संपादित करें और उनकी membership |
| `donations:read` / `donations:write` | दान को देखें / दान रिकॉर्ड करें |
| `attendance:read` / `attendance:write` | उपस्थिति, सत्र, चेक-इन को देखें / रिकॉर्ड करें |
| `forms:write` | फॉर्म्स को प्रबंधित करें (read access implicit है write में) |
| `content:read` / `content:write` | वेबसाइट कंटेंट को देखें / संपादित करें, registrations, streaming |
| `messaging:read` / `messaging:write` | messaging को पढ़ें; write भी SMS भेजने की अनुमति देता है |
| `roles:read` / `roles:write` | भूमिका परिभाषाओं को देखें / संपादित करें |
| `settings:read` / `settings:write` | चर्च सेटिंग्स को देखें / संपादित करें (**आवश्यक** webhooks को programmatically रजिस्टर करने के लिए) |
| `offline_access` | दीर्घकालिक refresh tokens की अनुमति दें (OAuth flows केवल -- API keys पर कोई प्रभाव नहीं) |

`write` scopes implicitly में matching `read` शामिल है। Server- और domain-admin अनुमतियां deliberately scopes के रूप में exposed नहीं होती हैं -- scoped credential कभी भी site administration को elevate नहीं कर सकता।

:::tip
यदि आप key का उपयोग webhooks को रजिस्टर करने के लिए करेंगे (जैसे Zapier या Make integration के लिए), तो key को `settings:write` की आवश्यकता है। एक `people:read`-only key silently 403s `POST /membership/webhooks` पर।
:::

## Key का उपयोग करना

किसी भी bearer token के समान -- हर authenticated endpoint API keys को exactly जैसे JWTs को स्वीकार करता है:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

एक अनुरोध जिसके key में insufficient scopes हैं **403 Forbidden** के साथ respond करता है समान shape जो कोई भी permission-denied error उपयोग करता है।

## API के माध्यम से Keys को प्रबंधित करना

सभी endpoints Membership मॉड्यूल के `/membership/apiKeys` पाथ के तहत हैं और एक JWT (API key नहीं) की आवश्यकता है **Edit Settings** के साथ एक चर्च एडमिन से।

| Method & Path | Purpose |
|---|---|
| `GET /membership/apiKeys` | चर्च के keys की सूची करें (कोई secret नहीं -- केवल `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | सभी उपलब्ध scope names की सूची -- एक key-creation UI के लिए |
| `POST /membership/apiKeys` | एक नया key बनाएं। Body: `{ "name": "...", "scopes": ["people:read"] }`. Response में raw `cak_…` key **एक बार** शामिल है। |
| `DELETE /membership/apiKeys/:id` | एक key को revoke करें -- अगले अनुरोध पर प्रभाव में जाता है |

एक revoked key तुरंत gone है -- कोई grace period नहीं है।

## सर्वोत्तम प्रथाएं

- **Integration प्रति एक key।** यदि कुछ compromise हो तो आप सभी को तोड़े बिना एक single key revoke करते हैं।
- **सबसे संकीर्ण scopes को mint करें जो काम करें।** एक Google Sheets export को केवल `people:read` की आवश्यकता है, `settings:write` की नहीं।
- **key को एक service account से bind करें, एक real staff member से नहीं।** यदि कोई staff member छोड़ता है, उनकी B1 access समाप्त होती है -- और तो कोई भी key उनकी पहचान के तहत minted हैं।
- **keys को एक secret manager में store करें** (आपके hosting provider की environment variables, AWS Secrets Manager, आदि) -- कभी source control में नहीं।
- **keys को rotate करें** यदि आप exposure को संदेह करते हैं: एक नया key बनाएं, integration को अपडेट करें, फिर पुराने को delete करें।

## यह OAuth से कैसे भिन्न है

API keys उपयुक्त हैं जब **आपका चर्च एकमात्र है जो integration का उपयोग कर रहा है**। एक कनेक्टर जिसे कई चर्चों को एक्सेस करना चाहिए प्रत्येक के explicit consent के साथ -- जैसे एक SaaS app B1 community में साझा -- [OAuth और Connected Apps](./connected-apps) का उपयोग करें।

| | API key | OAuth |
|---|---|---|
| कौन इसे इंस्टॉल करता है | एक चर्च एडमिन | प्रत्येक चर्च एडमिन ऐप को authorize करता है |
| Auth हेडर | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Token lifetime | revoke तक | Access ≈ 7 दिन, refresh ≈ 90 दिन |
| सर्वोत्तम | आंतरिक scripts, Zapier/Make/Sheets कनेक्टर | Multi-tenant तीसरे पक्ष के ऐप्स |
