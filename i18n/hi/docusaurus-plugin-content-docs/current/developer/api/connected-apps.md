---
title: "Connected Apps और OAuth"
---

# Connected Apps और OAuth {#connected-apps--oauth}

<div class="article-intro">

B1 API OAuth 2.0 को सपोर्ट करता है, ताकि कोई तृतीय-पक्ष एप्लिकेशन हर चर्च एडमिन से उसका डेटा एक्सेस करने की अनुमति माँग सके -- और चर्च कभी पासवर्ड या API कुंजी साझा किए बिना ऐसा कर सके। **Connected App** एक OAuth टोकन है जिसे कोई चर्च एडमिन स्वीकृत कर चुका है; उसे रद्द करने से तृतीय-पक्ष ऐप की पहुँच एक क्लिक में समाप्त हो जाती है। बहु-किरायेदार SaaS कनेक्टर के लिए यह मार्ग उपयोग करें। एकल-चर्च इंटीग्रेशन के लिए [API कुंजियाँ](./api-keys) पसंद करें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- चर्च उसे पहुँच देने से पहले एक OAuth **क्लाइंट** पंजीकृत होना चाहिए -- या तो B1 सर्वर एडमिन द्वारा, या क्लाइंट द्वारा स्वयं [डायनामिक पंजीकरण](#dynamic-client-registration) के माध्यम से
- सभी OAuth एंडपॉइंट Membership मॉड्यूल के अंतर्गत हैं: `/membership/oauth/...`
- एक्सेस टोकन JWT हैं -- वे स्वीकृत स्कोप द्वारा फ़िल्टर की गई उपयोगकर्ता की अनुमतियाँ रखते हैं

</div>

## अवधारणाएँ {#concepts}

| शब्द | अर्थ |
|---|---|
| **OAuth client** | तृतीय-पक्ष ऐप स्वयं -- `client_id` से पहचाना जाता है, `client_secret` से सुरक्षित रहता है। B1 के साथ एक बार पंजीकृत होता है और उसे इंस्टॉल करने वाले सभी चर्चों में साझा होता है। |
| **Connected App** | एक विशिष्ट `(client, church-admin)` जोड़ी जहाँ एडमिन ने क्लाइंट को पहुँच दी है। हर Connected App एक OAuth रिफ़्रेश टोकन पर आधारित होता है। |
| **Access token** | एक अल्पकालिक JWT (≈ 7 दिन) जिसे क्लाइंट API कॉल के लिए उपयोग करता है। यह उपयोगकर्ता JWT जैसा ही आकार रखता है -- `Authorization: Bearer <jwt>`। |
| **Refresh token** | एक दीर्घकालिक अपारदर्शी स्ट्रिंग (≈ 90 दिन) जिससे क्लाइंट नए एक्सेस टोकन बनाता है। |
| **Scope** | बताता है कि एक्सेस टोकन क्या कर सकता है -- देखें [स्कोप सूची](./api-keys#scopes)। |

## ग्रांट फ़्लो {#grant-flows}

B1 तीन OAuth फ़्लो सपोर्ट करता है, जो सभी RFC 6749 + RFC 8628 द्वारा परिभाषित हैं।

### Authorization Code (वेब ऐप्स) {#authorization-code-web-apps}

तब उपयोग करें जब आपके ऐप में सर्वर-साइड घटक हो और वह `client_secret` को निजी रख सके।

1. **Authorize**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   सार्वजनिक क्लाइंट (जिनके पास `client_secret` नहीं है) को `"code_challenge": "..."` और `"code_challenge_method": "S256"` भी भेजना होगा (PKCE, RFC 7636)। केवल `S256` स्वीकार्य है।

   यह `{ "code": "...", "state": "xyz" }` लौटाता है। Authorization-code एंडपॉइंट जानबूझकर प्रमाणित POST है -- आपका ऐप उपयोगकर्ता का B1 JWT एकत्र करता है (आमतौर पर उपयोगकर्ता के B1 सत्र में एक बटन होस्ट करके) और उसे सहमति चरण के हिस्से के रूप में आगे भेजता है।

2. **कोड का टोकन के लिए आदान-प्रदान करें**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   यदि authorize चरण में `code_challenge` भेजा गया था, तो मेल खाता `"code_verifier": "..."` शामिल करें। सार्वजनिक क्लाइंट verifier भेजता है और `client_secret` छोड़ देता है। टोकन एंडपॉइंट JSON या form-encoded (`application/x-www-form-urlencoded`) बॉडी स्वीकार करता है।

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

3. जब एक्सेस टोकन समाप्त होने वाला हो तो **रिफ़्रेश करें**:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   रिफ़्रेश टोकन 90 दिन की निष्क्रियता के बाद समाप्त हो जाता है; यदि वह समाप्त हो गया हो तो चर्च एडमिन को दोबारा अधिकृत करना होगा।

### Device Code (TV, किओस्क, CLI) {#device-code-tvs-kiosks-cli}

तब उपयोग करें जब डिवाइस में ब्राउज़र न हो। RFC 8628 द्वारा परिभाषित।

1. **डिवाइस कोड का अनुरोध करें**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   उपयोगकर्ता-मुखी कोड और पोलिंग अंतराल लौटाता है:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. उपयोगकर्ता को `user_code` और `verification_uri` दिखाएँ।

3. `grant_type=urn:ietf:params:oauth:grant-type:device_code` और `device_code` के साथ `/membership/oauth/token` को **पोल** करें। मानक प्रतिक्रियाएँ:

   | त्रुटि | अर्थ |
   |---|---|
   | `authorization_pending` | उपयोगकर्ता ने अभी स्वीकृति नहीं दी -- सुझाए गए अंतराल पर पोल करते रहें |
   | `expired_token` | डिवाइस कोड `expires_in` से आगे निकल गया -- दोबारा शुरू करें |
   | `access_denied` | उपयोगकर्ता ने अनुरोध अस्वीकार किया |
   | _(कोई नहीं -- 200 OK)_ | स्वीकृत -- बॉडी एक `B1TokenResponse` है |

4. स्वीकृति के बाद, `refresh_token` संग्रहीत करें और जब तक `access_token` समाप्त न हो उसका उपयोग करें।

B1 SDK में `B1OAuthClient.awaitDeviceToken(...)` शामिल है, जो उचित RFC-अनुरूप बैकऑफ़ के साथ पोलिंग लूप आपके लिए चलाता है।

### Refresh Token {#refresh-token}

जब आपके पास `refresh_token` हो, तो यह एक स्वतंत्र अनुरोध के रूप में हमेशा उपलब्ध है:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

एक नया `access_token` और `refresh_token` वापस आता है। **सार्वजनिक क्लाइंट** (जिनके पास `client_secret` नहीं है) रिफ़्रेश पर `client_secret` छोड़ सकते हैं -- यह मोबाइल/डेस्कटॉप OAuth ऐप्स के लिए उपयोगी है जो सीक्रेट नहीं रख सकते।

## टोकन का आकार {#token-shape}

एक एक्सेस टोकन B1 द्वारा जारी किया गया JWT है, जो वैसा ही है जैसा उपयोगकर्ता `POST /membership/users/login` से पाता है -- वही मॉड्यूलर अनुमति क्लेम, हर कंट्रोलर में वही `checkAccess` व्यवहार -- **सिवाय इसके** कि अनुमतियों की सूची टोकन बनते समय स्वीकृत स्कोप से फ़िल्टर की जा चुकी होती है। स्कोप किया गया एक्सेस टोकन वह कुछ नहीं कर सकता जो समान स्कोप वाली API कुंजी नहीं कर सकती, और किसी भी कंट्रोलर में कोई अलग "OAuth पथ" नहीं है; `actionWrapper` को नहीं पता कि बियरर कोई व्यक्ति है, API कुंजी है, या OAuth क्लाइंट।

## Connected Apps (उपयोगकर्ता-मुखी) {#connected-apps-user-facing}

किसी चर्च एडमिन के दृष्टिकोण से, "Connected Apps" उन ऐप्स की सूची है जिन्हें उनके चर्च तक पहुँच दी गई है। हर पंक्ति एक जीवित `(OAuthClient, OAuthToken)` जोड़ी है।

B1Admin में: **Settings → Developer → Connected Apps** दिखाता है:

- क्लाइंट का नाम
- एडमिन द्वारा स्वीकृत स्कोप
- पहुँच देने की तारीख
- एक **Revoke** बटन

| विधि और पथ | प्रमाणीकरण | उद्देश्य |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | कॉलर के अपने सक्रिय कनेक्शनों की सूची (क्लाइंट नाम और स्कोप के साथ जुड़ी हुई) |
| `DELETE /membership/oauth/connections/:id` | JWT | OAuth-टोकन आईडी से कनेक्शन रद्द करें -- अगले अनुरोध पर टोकन काम करना बंद कर देता है |

सूची में समाप्त टोकन स्वतः शामिल नहीं होते।

## स्कोप और सहमति {#scopes--consent}

स्कोप स्ट्रिंग वही सूची है जो [API कुंजियों](./api-keys#scopes) की है। क्लाइंट्स के लिए सर्वोत्तम प्रथाएँ:

- **काम करने वाले सबसे संकीर्ण स्कोप माँगें।** यदि आपको केवल लोगों को पढ़ना है और आप `donations:write` माँगते हैं, तो चर्च इसे नोटिस करेंगे।
- **रिफ़्रेश टोकन के साथ अल्पकालिक एक्सेस टोकन उपयोग करें।** दीर्घकालिक एक्सेस टोकन को जल्दी रद्द करना कठिन होता है।
- **स्वीकृत स्कोप हमेशा अपने UI में उपयोगकर्ता के सामने दोबारा प्रस्तुत करें** ताकि वे सत्यापित कर सकें कि उन्होंने किस बात की सहमति दी है।

## OAuth क्लाइंट प्रबंधन {#oauth-client-management}

OAuth क्लाइंट (तृतीय-पक्ष ऐप्स स्वयं) वैश्विक रूप से पंजीकृत होते हैं। `client_secret` वाला गोपनीय (confidential) क्लाइंट B1 सर्वर एडमिन द्वारा बनाया जाता है -- एक भेजने के लिए ChurchApps टीम से `client_id` / `client_secret` जोड़ी माँगें और अपने redirect URI पंजीकृत करवाएँ। MCP कनेक्टर जैसे सार्वजनिक क्लाइंट स्वयं को पंजीकृत कर सकते हैं (नीचे देखें)।

पंजीकृत redirect URI अनुरोध पर `redirect_uri` से बिल्कुल मेल खाने चाहिए; प्रीफ़िक्स या आंशिक मिलान अस्वीकार किया जाता है।

| विधि और पथ | अनुमति | विवरण |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | सभी OAuth क्लाइंट की सूची |
| `GET /membership/oauth/clients/clientId/:clientId` | — | सार्वजनिक आईडी से क्लाइंट प्राप्त करें (secret छिपा हुआ) |
| `POST /membership/oauth/clients` | Server.Admin | क्लाइंट बनाएँ या अपडेट करें |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | क्लाइंट हटाएँ |

### डायनामिक क्लाइंट पंजीकरण {#dynamic-client-registration}

`POST /membership/oauth/register` (सार्वजनिक, RFC 7591) claude.ai के MCP कनेक्टर जैसे क्लाइंट को स्वयं को पंजीकृत करने देता है। यह API के `/.well-known/oauth-authorization-server` दस्तावेज़ द्वारा विज्ञापित है -- देखें [MCP सर्वर → OAuth डिस्कवरी](./mcp#oauth-discovery)।

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

201 के साथ `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`), और `token_endpoint_auth_method: "none"` लौटाता है।

- कोई सीक्रेट कभी जारी नहीं होता, इसलिए क्लाइंट को हर authorization पर PKCE उपयोग करना होगा।
- `redirect_uris` 1–10 `https` URL होने चाहिए, या `localhost`, `127.0.0.1`, या `[::1]` पर `http`।
- `client_name` 45 अक्षरों तक ट्रिम किया जाता है (डिफ़ॉल्ट "AI assistant")।
- प्रति IP प्रति घंटे 20 पंजीकरणों तक सीमित।

B1Admin की सहमति पेज पर, स्वयं-पंजीकृत क्लाइंट के लिए एक सूचना दिखती है कि उसने स्वयं को पंजीकृत किया है, वह उपयोगकर्ता के अपने B1 खाते से अधिक कभी कुछ नहीं कर सकता, और उसे **Settings → Developer → Connected Apps** के अंतर्गत डिस्कनेक्ट किया जा सकता है।

## SDK सपोर्ट {#sdk-support}

`@churchapps/integration-sdk` पैकेज हर OAuth फ़्लो को टाइप्ड हेल्पर्स के साथ रैप करता है -- `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`। पैकेज README और एंड-टू-एंड उदाहरण के लिए [Webhooks](./webhooks#sdk-support) देखें।
