---
title: "MCP सर्वर"
---

# MCP सर्वर

<div class="article-intro">

B1 API `/mcp` पर एक [MCP (Model Context Protocol)](https://modelcontextprotocol.io) सर्वर उपलब्ध कराता है। कोई भी MCP-समर्थित AI क्लाइंट — claude.ai कस्टम कनेक्टर, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, या आपका अपना — इससे कनेक्ट होकर प्रमाणित चर्च उपयोगकर्ता की ओर से अंतर्निहित REST API को कॉल कर सकता है। यह एक हल्का, सामान्य उद्देश्य का रैपर है: तीन सामान्य टूल पूरे API सतह को गतिशील रूप से उजागर करते हैं, बजाय इसके कि हर एंडपॉइंट को अलग से मॉडल किया जाए, साथ ही वेबसाइट बिल्डर के लिए एक डोमेन गाइड टूल भी है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [B1 API कुंजी](./api-keys) (`cak_…`) जिसमें क्लाइंट के पास होने वाले स्कोप हों, या एक MCP क्लाइंट जो OAuth से साइन इन कर सके (देखें [OAuth डिस्कवरी](#oauth-discovery))
- एक पहुँच योग्य B1 API होस्ट — होस्टेड चर्चों के लिए `https://api.churchapps.org`, या आपकी अपनी डिप्लॉयमेंट
- एक MCP क्लाइंट। अंतिम-उपयोगकर्ता सेटअप के लिए [Claude](/docs/b1-admin/integrations/claude) और [ChatGPT](/docs/b1-admin/integrations/chatgpt) देखें

</div>

## एंडपॉइंट

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| पहलू | मान |
|---|---|
| **पाथ** | `/mcp` (API होस्ट के सापेक्ष) |
| **विधि** | केवल `POST` — अनुरोध/प्रतिक्रिया और SSE स्ट्रीमिंग, दोनों एक ही एंडपॉइंट पर होते हैं |
| **ट्रांसपोर्ट** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **सेशन मॉडल** | स्टेटलेस। हर अनुरोध पर एक नया MCP सर्वर इंस्टेंस बनता है — कोई सेशन ID नहीं, कोई रिज़्यूमेशन नहीं |
| **प्रमाणीकरण** | Bearer टोकन। `cak_…` API कुंजियाँ और B1 JWT (OAuth एक्सेस टोकन सहित) दोनों काम करते हैं; समाधान वही है जो किसी भी अन्य प्रमाणित एंडपॉइंट के लिए है |

जिस अनुरोध का `Authorization` हेडर गायब या अमान्य है, वह लौटाता है:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

इसके साथ HTTP 401 और `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"` हेडर आता है, जिसे OAuth-समर्थित क्लाइंट साइन-इन शुरू करने के लिए फ़ॉलो करते हैं।

होस्टेड API (प्रोडक्शन और डेमो) पर `/mcp`, बाकी एंडपॉइंट्स के लिए उपयोग होने वाले REST API के बजाय API Gateway HTTP API के माध्यम से सर्व होता है। REST API Lambda proxy रिस्पॉन्स पर `WWW-Authenticate` का नाम बदलकर `x-amzn-remapped-www-authenticate` कर देता था, जिससे ChatGPT जैसे क्लाइंट्स को केवल बिना विवरण वाला 401 मिलता था और उनके पास साइन-इन शुरू करने का कोई तरीका नहीं रहता था; HTTP API हेडर को बिना बदले आगे भेजता है।

## टूल

तीन सामान्य टूल और एक गाइड। मॉडल खोज के लिए `list_endpoints` का, किसी पेलोड का आकार जानने के लिए `describe_endpoint` का, API को वास्तव में कॉल करने के लिए `api_call` का, और वेबसाइट कंटेंट से जुड़े कार्य में `describe_page_builder` का उपयोग करता है।

### `list_endpoints`

वैकल्पिक सबस्ट्रिंग और/या HTTP क्रिया द्वारा फ़िल्टर किए गए पंजीकृत REST रूट्स की पूरी सूची लौटाता है। हर प्रविष्टि में कंट्रोलर का नाम और वे API कुंजी स्कोप शामिल हैं जिनकी सबसे अधिक संभावना है।

**इनपुट:**

| फ़ील्ड | प्रकार | विवरण |
|---|---|---|
| `filter` | string (वैकल्पिक) | पाथ में केस-इनसेंसिटिव सबस्ट्रिंग मिलान, जैसे `"people"` |
| `method` | enum (वैकल्पिक) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**आउटपुट:** इस रूप का JSON दस्तावेज़:

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

इन्वेंटरी API स्टार्टअप पर लाइव रूट टेबल से एक बार बनाई जाती है — जो भी `curl` से पहुँचा जा सकता है, वह यहाँ दिखता है।

### `describe_endpoint`

एक एंडपॉइंट के लिए संक्षिप्त सारांश लौटाता है, और जहाँ उपलब्ध हो, एक हाथ से क्यूरेट किया गया अनुरोध बॉडी और प्रतिक्रिया नमूना भी।

**इनपुट:**

| फ़ील्ड | प्रकार | विवरण |
|---|---|---|
| `method` | string | HTTP क्रिया |
| `path` | string | `list_endpoints` द्वारा लौटाया गया पूरा पाथ |

**आउटपुट:** क्यूरेट किए गए एंडपॉइंट्स के लिए `summary`, `requestBody`, और `responseSample` वाला उदाहरण। बिना क्यूरेशन वाले एंडपॉइंट्स के लिए एक फ़ॉलबैक संदेश, जो मॉडल को आकार जानने के लिए पहले `GET` कॉल करने को कहता है। लगभग एक दर्जन उच्च-ट्रैफ़िक रूट्स (लोग, समूह, दान, उपस्थिति, फ़ंड) क्यूरेट किए गए हैं।

### `api_call`

चुने गए REST एंडपॉइंट को इन-प्रोसेस, उसी Express मिडलवेयर स्टैक के माध्यम से कॉल करता है जो एक सामान्य HTTP अनुरोध के लिए होता है — प्रमाणीकरण, बॉडी पार्सिंग, ऑडिट लॉगिंग, और प्रति-चर्च स्कोपिंग, सभी लागू होते हैं।

**इनपुट:**

| फ़ील्ड | प्रकार | विवरण |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | मॉड्यूल प्रीफ़िक्स सहित पाथ, जैसे `/membership/people` |
| `query` | object (वैकल्पिक) | क्वेरी-स्ट्रिंग पैरामीटर का फ़्लैट ऑब्जेक्ट |
| `body` | any (वैकल्पिक) | JSON अनुरोध बॉडी — आमतौर पर `POST` के लिए मॉडल ऑब्जेक्ट्स की एक सरणी |

**आउटपुट:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

स्टेटस ≥ 400 वाली किसी भी प्रतिक्रिया के लिए टूल परिणाम `isError: true` के साथ चिह्नित होता है।

### `describe_page_builder`

एकमात्र गैर-सामान्य टूल: `/content/*` एंडपॉइंट्स के माध्यम से वेबसाइट पेज बनाने के लिए एक स्थिर, स्व-निहित गाइड — Page → Section → Element डेटा मॉडल, बनाने का वर्कफ़्लो, हर `elementType` और उसका `answersJSON` आकार, `dividerTop`/`dividerBottom` शेप डिवाइडर जैसी सेक्शन-स्तर सेटिंग्स, और एक कार्यरत अंत-से-अंत उदाहरण। यह B1Admin एडिटर में बनाए रखी गई एलिमेंट सूची को दर्शाता है (देखें [Website Builder Architecture](../architecture/website-builder))। एजेंट्स से अपेक्षा है कि पेज कंटेंट बनाने या संपादित करने से पहले इसे एक बार कॉल करें, फिर `api_call` के माध्यम से कार्य करें।

## प्रमाणीकरण मॉडल

MCP अनुरोध स्वयं `CustomAuthProvider.getUser()` से गुज़रता है — वही पथ जिसका उपयोग हर प्रमाणित B1 एंडपॉइंट करता है। `cak_…` बेयरर एक `Principal` में समाधान होता है, जिसकी अनुमतियाँ जारी करने वाले व्यक्ति की वर्तमान RBAC हैं, जो कुंजी के दिए गए स्कोप के साथ **इंटरसेक्ट** की जाती हैं। यह इंटरसेक्शन हर अनुरोध पर पुनः गणना किया जाता है, इसलिए:

- किसी कुंजी से स्कोप हटाने (उसे हटाकर फिर से बनाने) पर अगली कॉल पर पहुँच कट जाती है।
- B1Admin में अंतर्निहित व्यक्ति से अनुमति हटाने पर अगली कॉल पर पहुँच कट जाती है, भले ही कुंजी अब भी मौजूद हो।

नेस्टेड `api_call` इनवोकेशन के लिए, मूल `Authorization` हेडर सिंथेटिक अनुरोध पर कॉपी किया जाता है, इसलिए `CustomAuthProvider` फिर से चलता है और स्कोप इंटरसेक्शन हर कॉल पर फिर से लागू होता है। कोई टोकन कैशिंग नहीं है।

## पाथ ब्लॉकलिस्ट

कुछ रूट्स `api_call` के माध्यम से नहीं पहुँचे जा सकते, भले ही कुंजी वैध हो:

| पैटर्न | कारण |
|---|---|
| `/giving/donate/webhook/*` | प्रदाता वेबहुक एंडपॉइंट्स Stripe/PayPal से कच्चे, सिग्नेचर-सत्यापित बॉडी की अपेक्षा करते हैं — सामान्य कॉलर्स के लिए नहीं |
| `/membership/oauth/clients*` | OAuth क्लाइंट पंजीकरण केवल ऑपरेटर के लिए है |
| `/membership/people/apiEmails` | उपयोगकर्ता अनुमतियों के बजाय ऑपरेटर `jwtSecret` द्वारा सुरक्षित |
| `multipart/form-data` अपेक्षित करने वाला कोई भी रूट | फ़ाइल अपलोड JSON-RPC के अनुकूल नहीं हैं |

ब्लॉक किया गया पाथ एक वर्णनात्मक संदेश के साथ `isError: true` टूल परिणाम लौटाता है; अंतर्निहित रूट कभी नहीं कहा जाता।

## प्रतिक्रिया आकार सीमा

हर `api_call` प्रतिक्रिया बॉडी कैप्चर किए गए आउटपुट के **64 KB** तक सीमित है। यदि कोई क्वेरी सीमा से अधिक हो, तो प्रतिक्रिया में `"truncated": true` होता है और मॉडल से अपेक्षा है कि वह संकीर्ण क्वेरी पैरामीटर के साथ पुनः प्रयास करे। इससे एक ही टूल प्रतिक्रिया क्लाइंट के संदर्भ विंडो को भरने से रुकती है।

## दर सीमा (Rate Limiting)

`/mcp` पर कोई एप्लिकेशन-स्तरीय दर सीमा नहीं है। प्रोडक्शन में थ्रॉटलिंग API Gateway / Lambda concurrency पर टाली जाती है, और स्व-होस्टेड डिप्लॉयमेंट में वह जो आपका रिवर्स प्रॉक्सी लागू करता है।

## OAuth डिस्कवरी {#oauth-discovery}

MCP सर्वर OAuth 2.1 मेटाडेटा विज्ञापित करता है, ताकि केवल OAuth-discovered सर्वरों से जुड़ने वाले क्लाइंट — विशेष रूप से Claude.ai का "Add custom connector" UI — बिना चिपकाई गई कुंजी के उपयोगकर्ता को साइन इन करा सकें। `/mcp` संरक्षित संसाधन है, [OAuth provider](./connected-apps) जो `/membership/oauth` के अंतर्गत है उसका प्राधिकरण सर्वर है, और B1Admin का `/oauth` पेज सहमति स्क्रीन है।

| एंडपॉइंट | उद्देश्य |
|---|---|
| `GET /.well-known/oauth-protected-resource` (साथ ही `/.well-known/oauth-protected-resource/mcp`) | संरक्षित संसाधन मेटाडेटा (RFC 9728): `resource` `<api>/mcp` है, `authorization_servers` API रूट है, `scopes_supported` हर [API key scope](./api-keys#scopes) की सूची देता है |
| `GET /.well-known/oauth-authorization-server` | प्राधिकरण सर्वर मेटाडेटा (RFC 8414): `authorization_endpoint` B1Admin `/oauth` है, `token_endpoint` `/membership/oauth/token` है, `registration_endpoint` `/membership/oauth/register` है |
| `POST /membership/oauth/register` | डायनेमिक क्लाइंट पंजीकरण (RFC 7591) |

claude.ai जैसा क्लाइंट जो फ़्लो चलाता है:

1. बिना टोकन के `POST /mcp` संरक्षित संसाधन मेटाडेटा की ओर इशारा करने वाले `WWW-Authenticate` हेडर के साथ 401 लौटाता है।
2. क्लाइंट दोनों मेटाडेटा दस्तावेज़ पढ़ता है, फिर `POST /membership/oauth/register` के साथ स्वयं को पंजीकृत करता है, `client_name`, `redirect_uris`, और वैकल्पिक रूप से `scope` भेजते हुए। हर स्व-पंजीकृत क्लाइंट एक **सार्वजनिक** क्लाइंट है: कोई सीक्रेट जारी नहीं होता और प्रतिक्रिया में `token_endpoint_auth_method: "none"` होता है। Redirect URIs `https` होने चाहिए, या loopback पते (`localhost`, `127.0.0.1`, `[::1]`) पर `http`; प्रति क्लाइंट अधिकतम 10। पंजीकरण IP प्रति घंटे 20 तक सीमित है।
3. उपयोगकर्ता को `code_challenge` और `code_challenge_method=S256` के साथ B1Admin `/oauth` पर भेजा जाता है। सहमति पेज हर अनुरोधित स्कोप को सरल भाषा में सूचीबद्ध करता है (या कोई अनुरोध न होने पर "Everything your B1 account can access"), वह होस्ट दिखाता है जिस पर उपयोगकर्ता वापस भेजा जाएगा, और बताता है कि ऐप ने स्वयं को कब पंजीकृत किया। उपयोगकर्ता **Allow** पर क्लिक करता है।
4. क्लाइंट `grant_type=authorization_code` और अपने `code_verifier` के साथ `/membership/oauth/token` पर कोड का आदान-प्रदान करता है, और बाद में `grant_type=refresh_token` से रिफ़्रेश करता है। फ़ॉर्म-एनकोडेड और JSON दोनों बॉडी स्वीकार की जाती हैं।
5. परिणामी एक्सेस टोकन एक स्कोप्ड B1 JWT है, जिसे `/mcp` पर बेयरर के रूप में उपयोग किया जाता है।

PKCE नियम: केवल `S256` स्वीकार्य है। बिना सीक्रेट वाले क्लाइंट को authorize पर `code_challenge` और token एक्सचेंज पर मेल खाता `code_verifier` भेजना होगा; कॉन्फ़िडेंशियल क्लाइंट (सीक्रेट वाले) अब भी केवल सीक्रेट का उपयोग कर सकते हैं। Redirect URIs पंजीकृत URI से बिल्कुल मेल खाने चाहिए।

ऐसे क्लाइंट जो अपनी कॉन्फ़िगरेशन में स्थिर बेयरर टोकन स्वीकार करते हैं — Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, कस्टम कोड — इसके बजाय `cak_…` कुंजी का उपयोग जारी रख सकते हैं।

## स्थानीय विकास

जब API स्थानीय रूप से चलता है, तो MCP एंडपॉइंट बाकी सभी के साथ माउंट होता है:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

स्टार्टअप पर लॉग लाइन `📡 MCP server ready at /mcp — N routes in inventory` पुष्टि करती है कि इन्वेंटरी बन गई है।

MCP Inspector से इसकी जाँच करें:

```bash
npx @modelcontextprotocol/inspector
```

Inspector UI में इसे `http://localhost:8084/mcp` पर इंगित करें और `Authorization` हेडर को `Bearer cak_<prefix>.<secret>` पर सेट करें। पहले `list_endpoints` कॉल करें; आपको पूरी रूट सूची दिखनी चाहिए। फिर `api_call({ method: "GET", path: "/membership/people" })` आपके स्थानीय सीड किए गए लोग लौटाना चाहिए।

## कोड लेआउट

MCP सर्वर Api रिपो में `src/modules/mcp/` पर स्थित है। उल्लेखनीय फ़ाइलें:

| फ़ाइल | उद्देश्य |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; हर अनुरोध के लिए `StreamableHTTPServerTransport` जोड़ता है और 401 पर `WWW-Authenticate` चुनौती भेजता है |
| `WellKnownController.ts` / `OAuthMetadata.ts` | `/.well-known` OAuth डिस्कवरी दस्तावेज़ सर्व करते हैं |
| `McpServer.ts` | MCP `Server` बनाता है, चारों टूल पंजीकृत करता है |
| `RouteInventory.ts` | स्टार्टअप पर रूट्स गिनने के लिए inversify-express-utils मेटाडेटा को पार करता है |
| `internalDispatch.ts` | सिंथेटिक `req`/`res` जो इन-प्रोसेस Express ऐप में फिर से प्रवेश करता है |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | high-traffic एंडपॉइंट्स के लिए क्यूरेट किए गए अनुरोध/प्रतिक्रिया नमूने |

## संबंधित

- [API Keys](./api-keys)
- [Webhooks](./webhooks)
- [Connected Apps (OAuth)](./connected-apps)
- [Claude — अंतिम-उपयोगकर्ता सेटअप](/docs/b1-admin/integrations/claude)
- [ChatGPT — अंतिम-उपयोगकर्ता सेटअप](/docs/b1-admin/integrations/chatgpt)
