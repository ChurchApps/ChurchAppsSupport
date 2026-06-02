---
title: "Connected Apps और OAuth"
---

# Connected Apps और OAuth

<div class="article-intro">

B1 API OAuth 2.0 को सपोर्ट करता है ताकि एक तीसरे पक्ष का एप्लिकेशन प्रत्येक चर्च एडमिन से उनके डेटा को एक्सेस करने की अनुमति मांग सकता है -- चर्च के बिना कभी एक पासवर्ड या API key साझा किए। एक **Connected App** एक OAuth token है जिसे एक चर्च एडमिन ने approved किया है; इसे revoke करने से एक क्लिक में तीसरे पक्ष के ऐप का एक्सेस समाप्त हो जाता है। Multi-tenant SaaS कनेक्टर के लिए इस पाथ का उपयोग करें। एक single-church integration के लिए [API Keys](./api-keys) पसंद करें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक OAuth **client** को रजिस्टर किया जाना चाहिए (currently एक B1 server एडमिन द्वारा) इससे पहले कि चर्च इसे एक्सेस दें
- सभी OAuth endpoints Membership मॉड्यूल के तहत रहते हैं: `/membership/oauth/...`
- Access tokens JWTs हैं -- वे उपयोगकर्ता की अनुमतियों को granted scopes द्वारा filtered किए हुए carry करते हैं

</div>

## अवधारणाएं

| Term | Meaning |
|---|---|
| **OAuth client** | तीसरे पक्ष का ऐप स्वयं -- `client_id`, `client_secret` द्वारा secured के लिए पहचाना जाता है। B1 के साथ एक बार रजिस्टर किया जाता है, सभी चर्चों द्वारा साझा किया जाता है जो इसे इंस्टॉल करते हैं। |
| **Connected App** | एक specific `(client, church-admin)` pair जहां एडमिन ने क्लाइंट को एक्सेस दिया है। प्रत्येक Connected App एक OAuth refresh token द्वारा backed है। |
| **Access token** | एक short-lived JWT (≈ 7 दिन) जो क्लाइंट API calls के लिए उपयोग करता है। एक उपयोगकर्ता JWT के समान shape -- `Authorization: Bearer <jwt>`। |
| **Refresh token** | एक long-lived opaque string (≈ 90 दिन) जो क्लाइंट नए access tokens को mint करने के लिए उपयोग करता है। |
| **Scope** | Narrows जो access token कर सकता है -- [scope catalog](./api-keys#scopes) देखें। |

## Grant Flows

B1 तीन OAuth flows को सपोर्ट करता है, सभी RFC 6749 + RFC 8628 द्वारा defined।

### Authorization Code (web apps)

उपयोग करें जब आपके ऐप में एक server-side component हो और `client_secret` को private रख सकते हों।

1. **Authorize**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   `{ "code": "...", "state": "xyz" }` रिटर्न करता है। authorization-code endpoint intentionally एक authenticated POST है -- आपका ऐप उपयोगकर्ता का B1 JWT कलेक्ट करता है (typically user के B1 session में एक बटन host करके) और इसे consent step के हिस्से के रूप में forward करता है।

2. **Code को tokens के लिए एक्सचेंज करें**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Token response रिटर्न करता है:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Refresh** जब access token expire होने वाला हो:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Refresh token disuse के 90 दिन बाद expire हो जाता है; यदि यह expired है तो चर्च एडमिन फिर से authorize करता है।

### Device Code (TVs, kiosks, CLI)

उपयोग करें जब डिवाइस के पास कोई ब्राउज़र न हो। RFC 8628 द्वारा defined।

1. **एक device code request करें**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   user-facing code और polling interval रिटर्न करता है:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. `user_code` + `verification_uri` को उपयोगकर्ता को display करें।

3. **Poll** `/membership/oauth/token` को `grant_type=urn:ietf:params:oauth:grant-type:device_code` और `device_code` के साथ। Standard responses:

   | Error | Meaning |
   |---|---|
   | `authorization_pending` | उपयोगकर्ता अभी approve नहीं किया है -- suggested interval पर polling जारी रखें |
   | `expired_token` | Device code past `expires_in` है -- शुरू से करें |
   | `access_denied` | उपयोगकर्ता ने request को deny किया |
   | _(none — 200 OK)_ | Approved -- body एक `B1TokenResponse` है |

4. एक बार approved, `refresh_token` को store करें और `access_token` को उपयोग करें जब तक यह expire न हो।

B1 SDK में `B1OAuthClient.awaitDeviceToken(...)` शामिल है जो polling loop को आपके लिए sane RFC-compliant backoff के साथ चलाता है।

### Refresh Token

हमेशा उपलब्ध एक standalone request के रूप में एक बार जब आप `refresh_token` hold करते हैं:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

एक नया `access_token` और `refresh_token` वापस आते हैं। **Public clients** (no `client_secret`) refresh पर `client_secret` को omit कर सकते हैं -- mobile/desktop OAuth ऐप्स के लिए उपयोगी जो secret नहीं रख सकते।

## Token Shape

एक access token एक B1-issued JWT है same जो एक उपयोगकर्ता को `POST /membership/users/login` से मिलेगा -- same modular permission claim, same `checkAccess` behavior हर controller में -- **except** permissions array granted scopes के through filtered किया गया है mint time पर। एक scoped access token कुछ नहीं कर सकता जो एक similarly-scoped API key नहीं कर सकता, और कोई separate "OAuth path" किसी भी controller में नहीं है; `actionWrapper` unaware है कि bearer एक व्यक्ति, एक API key, या एक OAuth client है।

## Connected Apps (User-Facing)

एक चर्च एडमिन के दृष्टिकोण से, "Connected Apps" उन ऐप्स की सूची है जिन्हें उनके चर्च को एक्सेस दिया गया है। प्रत्येक पंक्ति एक live `(OAuthClient, OAuthToken)` pair है।

B1Admin में: **Settings → Developer → Connected Apps** दिखाता है:

- क्लाइंट का नाम
- Scopes जिन्हें एडमिन ने approved किया
- जब access दी गई थी की तारीख
- एक **Revoke** बटन

| Method & Path | Auth | Purpose |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Caller के अपने active connections की सूची करें (क्लाइंट नाम + scopes के साथ joined) |
| `DELETE /membership/oauth/connections/:id` | JWT | एक connection को उसके OAuth-token id द्वारा revoke करें -- token अगले अनुरोध पर काम करना बंद कर देता है |

सूची स्वचालित रूप से expired tokens को exclude करती है।

## Scopes और Consent

Scope strings [API keys](./api-keys#scopes) के समान कैटलॉग हैं। क्लाइंट्स के लिए सर्वोत्तम प्रथाएं:

- **सबसे संकीर्ण scopes request करें जो काम करें।** चर्च notice करते हैं यदि आप `donations:write` ask करते हैं जब आप केवल लोगों को read करने की आवश्यकता रखते हैं।
- **एक refresh token plus short-lived access tokens का उपयोग करें।** Long-lived access tokens को जल्दी revoke करना कठिन है।
- **हमेशा granted scopes को अपने स्वयं के UI में उपयोगकर्ता को present करें** ताकि वे verify कर सकें कि उन्होंने किस चीज़ को consent दिया।

## OAuth Client प्रबंधन

OAuth clients (तीसरे पक्ष के ऐप्स स्वयं) currently एक B1 server एडमिन द्वारा globally रजिस्टर किए जाते हैं। Per-church self-registration roadmap पर है -- जब तक नहीं, एक public कनेक्टर ship करने के लिए ChurchApps टीम को एक `client_id` / `client_secret` pair को mint करने और अपने redirect URIs को रजिस्टर करने के लिए contact करें।

| Method & Path | Permission | Description |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | सभी OAuth clients की सूची करें |
| `GET /membership/oauth/clients/clientId/:clientId` | — | एक client को इसके public id द्वारा प्राप्त करें (secret redacted) |
| `POST /membership/oauth/clients` | Server.Admin | एक client बनाएं या अपडेट करें |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | एक client को डिलीट करें |

## SDK सपोर्ट

`@churchapps/integration-sdk` पैकेज हर OAuth flow को typed helpers के साथ wrap करता है -- `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`। पैकेज README और [Webhooks](./webhooks#sdk-support) को एक end-to-end उदाहरण के लिए देखें।
