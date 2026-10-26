---
title: "Connected Apps और OAuth"
---

# Connected Apps और OAuth

<div class="article-intro">

B1 API OAuth 2.0 का समर्थन करता है, ताकि कोई तृतीय-पक्ष एप्लिकेशन हर चर्च प्रशासक से उनके डेटा तक पहुँच की अनुमति माँग सके -- बिना चर्च के कभी पासवर्ड या API कुंजी साझा किए। **Connected App** एक OAuth टोकन है जिसे कोई चर्च प्रशासक स्वीकृत करता है; इसे रद्द करने से तृतीय-पक्ष ऐप की पहुँच एक क्लिक में खत्म हो जाती है। मल्टी-टेनेंट SaaS कनेक्टरों के लिए यह मार्ग उपयोग करें। एकल-चर्च इंटीग्रेशन के लिए [API Keys](./api-keys) को प्राथमिकता दें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- चर्च उसे पहुँच देने से पहले एक OAuth **client** पंजीकृत होना चाहिए -- B1 सर्वर प्रशासक द्वारा, या [डायनेमिक पंजीकरण](#dynamic-client-registration) के माध्यम से क्लाइंट स्वयं द्वारा
- सभी OAuth एंडपॉइंट Membership मॉड्यूल के अंतर्गत हैं: `/membership/oauth/...`
- एक्सेस टोकन JWT होते हैं -- वे उपयोगकर्ता की अनुमतियाँ लेकर चलते हैं, जो स्वीकृत स्कोप द्वारा फ़िल्टर की जाती हैं

</div>

## अवधारणाएँ

| शब्द | अर्थ |
|---|---|
| **OAuth client** | तृतीय-पक्ष ऐप स्वयं -- `client_id` से पहचाना जाता है, `client_secret` से सुरक्षित। B1 के साथ एक बार पंजीकृत, और उसे इंस्टॉल करने वाले सभी चर्चों द्वारा साझा। |
| **Connected App** | एक विशिष्ट `(client, church-admin)` जोड़ी, जहाँ प्रशासक ने क्लाइंट को पहुँच दी है। हर Connected App एक OAuth रिफ़्रेश टोकन द्वारा समर्थित होता है। |
| **Access token** | एक अल्पकालिक JWT (≈ 7 दिन) जिसे क्लाइंट API कॉल के लिए उपयोग करता है। यह उपयोगकर्ता JWT जैसा ही है -- `Authorization: Bearer <jwt>`। |
| **Refresh token** | एक दीर्घकालिक अपारदर्शी स्ट्रिंग (≈ 90 दिन) जिसे क्लाइंट नए एक्सेस टोकन बनाने के लिए उपयोग करता है। |
| **Scope** | एक्सेस टोकन क्या कर सकता है, यह सीमित करता है -- [स्कोप सूची](./api-keys#scopes) देखें। |

## ग्रांट फ़्लो

B1 तीन OAuth फ़्लो का समर्थन करता है, जो सभी RFC 6749 + RFC 8628 द्वारा परिभाषित हैं।

### Authorization Code (वेब ऐप)

तब उपयोग करें जब आपके ऐप का एक सर्वर-साइड घटक हो और वह `client_secret` गोपनीय रख सके।

1. **Authorize**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   पब्लिक क्लाइंट (जिनके पास `client_secret` नहीं है) को `"code_challenge": "..."` और `"code_challenge_method": "S256"` भी भेजना होगा (PKCE, RFC 7636)। केवल `S256` स्वीकार्य है।

   `{ "code": "...", "state": "xyz" }` लौटाता है। authorization-code एंडपॉइंट जानबूझकर एक प्रमाणित POST है -- आपका ऐप उपयोगकर्ता का B1 JWT एकत्र करता है (आमतौर पर उपयोगकर्ता के B1 सत्र में एक बटन होस्ट करके) और सहमति चरण के हिस्से के रूप में उसे आगे भेजता है।

2. **कोड को टोकन में बदलें**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   यदि authorize चरण ने `code_challenge` भेजा था, तो मेल खाने वाला `"code_verifier": "..."` शामिल करें। पब्लिक क्लाइंट verifier भेजता है और `client_secret` छोड़ देता है। टोकन एंडपॉइंट JSON या फ़ॉर्म-एनकोडेड (`application/x-www-form-urlencoded`) बॉडी स्वीकार करता है।

   टोकन प्रतिक्रिया लौटाता है:

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

3. जब एक्सेस टोकन समाप्त होने वाला हो तो **रिफ़्रेश** करें:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   रिफ़्रेश टोकन 90 दिन उपयोग न होने पर समाप्त हो जाता है; यदि वह समाप्त हो गया हो, तो चर्च प्रशासक को फिर से अधिकृत करना होगा।

### Device Code (टीवी, किओस्क, CLI)

तब उपयोग करें जब डिवाइस में ब्राउज़र न हो। RFC 8628 द्वारा परिभाषित।

1. **डिवाइस कोड का अनुरोध करें**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   उपयोगकर्ता के लिए कोड और पोलिंग अंतराल लौटाता है:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. `user_code` और `verification_uri` उपयोगकर्ता को दिखाएँ।

3. `grant_type=urn:ietf:params:oauth:grant-type:device_code` और `device_code` के साथ `/membership/oauth/token` को **पोल** करें। मानक प्रतिक्रियाएँ:

   | त्रुटि | अर्थ |
   |---|---|
   | `authorization_pending` | उपयोगकर्ता ने अभी स्वीकृत नहीं किया है -- सुझाए गए अंतराल पर पोलिंग जारी रखें |
   | `expired_token` | डिवाइस कोड `expires_in` से आगे निकल गया है -- फिर से शुरू करें |
   | `access_denied` | उपयोगकर्ता ने अनुरोध अस्वीकार किया |
   | _(कोई त्रुटि नहीं -- 200 OK)_ | स्वीकृत -- बॉडी एक `B1TokenResponse` है |

4. स्वीकृत होने पर, `refresh_token` संग्रहीत करें और `access_token` को उसकी समाप्ति तक उपयोग करें।

B1 SDK में `B1OAuthClient.awaitDeviceToken(...)` शामिल है, जो RFC-अनुरूप उचित बैकऑफ़ के साथ पोलिंग लूप आपके लिए चलाता है।

### Refresh Token

एक बार `refresh_token` मिल जाने पर इसे हमेशा एक स्वतंत्र अनुरोध के रूप में उपलब्ध किया जा सकता है:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

एक नया `access_token` और `refresh_token` वापस आता है। **पब्लिक क्लाइंट** (जिनके पास `client_secret` नहीं है) रिफ़्रेश पर `client_secret` छोड़ सकते हैं -- यह मोबाइल/डेस्कटॉप OAuth ऐप के लिए उपयोगी है जो गोपनीय कुंजी नहीं रख सकते।

रिफ़्रेश टोकन घूमते हैं, लेकिन पुराने को तुरंत खारिज नहीं किया जाता। यदि कोई क्लाइंट रिफ़्रेश उत्तर कभी प्राप्त नहीं करता (उदाहरण के लिए, अनुरोध के बीच बिजली या Wi-Fi चली जाने वाला टीवी), तो वह **7 दिन** तक पिछले `refresh_token` से पुनः प्रयास कर सकता है। पुनः प्रयास तभी सफल होता है जब प्रतिस्थापन टोकन अभी तक उपयोग नहीं हुआ हो; तब अप्रयुक्त प्रतिस्थापन हटा दिया जाता है और एक नई जोड़ी जारी होती है। एक बार प्रतिस्थापन स्वयं रिफ़्रेश हो जाए, तो पुराना टोकन `invalid_grant` लौटाता है। किसी कनेक्शन को रद्द करने से उस ग्रेस विंडो में बचे घूमे हुए टोकन भी रद्द हो जाते हैं, और connected-apps सूची हर कनेक्शन को एक बार दिखाती है।

## टोकन का आकार

एक एक्सेस टोकन B1 द्वारा जारी JWT है, जो ठीक वैसा ही है जैसा उपयोगकर्ता `POST /membership/users/login` से पाता -- वही मॉड्यूलर अनुमति क्लेम, और हर कंट्रोलर में वही `checkAccess` व्यवहार -- **सिवाय** इसके कि अनुमतियों की सूची मिंट के समय दिए गए स्कोप से फ़िल्टर की गई होती है। एक सीमित एक्सेस टोकन वह कुछ नहीं कर सकता जो समान रूप से सीमित API कुंजी नहीं कर सकती, और किसी कंट्रोलर में कोई अलग "OAuth पथ" नहीं है; `actionWrapper` को यह पता नहीं होता कि बेरर कोई व्यक्ति है, API कुंजी है, या OAuth क्लाइंट।

## Connected Apps (उपयोगकर्ता के सामने)

किसी चर्च प्रशासक के दृष्टिकोण से, "Connected Apps" उन ऐप्स की सूची है जिन्हें उनके चर्च तक पहुँच दी गई है। हर पंक्ति एक जीवित `(OAuthClient, OAuthToken)` जोड़ी है।

B1Admin में: **सेटिंग्स → Developer → Connected Apps** दिखाता है:

- क्लाइंट का नाम
- प्रशासक द्वारा स्वीकृत स्कोप
- पहुँच देने की तारीख
- एक **Revoke** बटन

| मेथड और पथ | प्रमाणीकरण | उद्देश्य |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | कॉलर के अपने सक्रिय कनेक्शनों की सूची (क्लाइंट नाम + स्कोप के साथ जुड़े हुए) |
| `DELETE /membership/oauth/connections/:id` | JWT | OAuth-टोकन id द्वारा कनेक्शन रद्द करें -- टोकन अगले अनुरोध पर काम करना बंद कर देता है |

सूची समाप्त हो चुके टोकनों को स्वचालित रूप से बाहर रखती है।

## स्कोप और सहमति

स्कोप स्ट्रिंग वही कैटलॉग हैं जो [API कुंजियों](./api-keys#scopes) के लिए हैं। क्लाइंटों के लिए सर्वोत्तम प्रथाएँ:

- **वे सबसे सीमित स्कोप माँगें जो काम करें।** जब आपको केवल लोगों को पढ़ना हो, तब `donations:write` माँगने पर चर्च ध्यान देते हैं।
- **रिफ़्रेश टोकन के साथ अल्पकालिक एक्सेस टोकन उपयोग करें।** दीर्घकालिक एक्सेस टोकन को जल्दी रद्द करना कठिन होता है।
- **दिए गए स्कोप हमेशा उपयोगकर्ता को अपने UI में वापस दिखाएँ**, ताकि वे सत्यापित कर सकें कि उन्होंने किस बात की सहमति दी है।

## OAuth क्लाइंट प्रबंधन

OAuth क्लाइंट (तृतीय-पक्ष ऐप स्वयं) वैश्विक रूप से पंजीकृत होते हैं। `client_secret` वाला गोपनीय क्लाइंट B1 सर्वर प्रशासक द्वारा बनाया जाता है -- उसे भेजने के लिए ChurchApps टीम से `client_id` / `client_secret` जोड़ी माँगें और अपने redirect URIs पंजीकृत कराएँ। MCP कनेक्टर जैसे पब्लिक क्लाइंट स्वयं को पंजीकृत कर सकते हैं (नीचे)।

पंजीकृत redirect URIs अनुरोध के `redirect_uri` से बिल्कुल मेल खाने चाहिए; आंशिक या उपसर्ग मिलान अस्वीकार कर दिया जाता है।

| मेथड और पथ | अनुमति | विवरण |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | सभी OAuth क्लाइंट सूचीबद्ध करें |
| `GET /membership/oauth/clients/clientId/:clientId` | — | सार्वजनिक id द्वारा क्लाइंट प्राप्त करें (गुप्त मान छिपाया गया) |
| `POST /membership/oauth/clients` | Server.Admin | क्लाइंट बनाएँ या अपडेट करें |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | क्लाइंट हटाएँ |

### डायनेमिक क्लाइंट पंजीकरण

`POST /membership/oauth/register` (सार्वजनिक, RFC 7591) claude.ai के MCP कनेक्टर जैसे क्लाइंट को स्वयं को पंजीकृत करने देता है। यह API के `/.well-known/oauth-authorization-server` दस्तावेज़ द्वारा विज्ञापित है -- देखें [MCP Server → OAuth Discovery](./mcp#oauth-discovery)।

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

`client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`), और `token_endpoint_auth_method: "none"` के साथ 201 लौटाता है।

- कोई गुप्त मान कभी जारी नहीं होता, इसलिए क्लाइंट को हर प्राधिकरण पर PKCE का उपयोग करना होगा।
- `redirect_uris` 1–10 `https` URLs होने चाहिए, या `localhost`, `127.0.0.1`, या `[::1]` पर `http`।
- `client_name` 45 अक्षरों तक छोटा किया जाता है (डिफ़ॉल्ट "AI assistant")।
- प्रति IP प्रति घंटे 20 पंजीकरणों तक सीमित।

B1Admin सहमति पृष्ठ पर, स्वयं-पंजीकृत क्लाइंट को एक सूचना मिलती है कि उसने स्वयं को पंजीकृत किया है, वह उपयोगकर्ता के अपने B1 खाते से अधिक कभी नहीं कर सकता, और उसे **Settings → Developer → Connected Apps** के अंतर्गत डिस्कनेक्ट किया जा सकता है।

## SDK समर्थन

`@churchapps/integration-sdk` पैकेज हर OAuth फ़्लो को टाइप्ड हेल्पर्स के साथ लपेटता है -- `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`। एंड-टू-एंड उदाहरण के लिए पैकेज README और [Webhooks](./webhooks#sdk-support) देखें।
