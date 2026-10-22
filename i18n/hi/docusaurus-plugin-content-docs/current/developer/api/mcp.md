---
title: "MCP सर्वर"
---

# MCP सर्वर {#mcp-server}

<div class="article-intro">

B1 API `/mcp` पर एक [MCP (Model Context Protocol)](https://modelcontextprotocol.io) सर्वर भेजता है। कोई भी MCP-सक्षम AI क्लाइंट -- claude.ai कस्टम कनेक्टर, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, या आपका अपना -- इससे जुड़ सकता है और किसी प्रमाणित चर्च उपयोगकर्ता की ओर से अंतर्निहित REST API को कॉल कर सकता है। यह एक पतला, सामान्य रैपर है: तीन सामान्य टूल पूरी API सतह को गतिशील रूप से उजागर करते हैं, हर एंडपॉइंट को अलग से मॉडल करने के बजाय, साथ ही वेबसाइट बिल्डर के लिए एक डोमेन गाइड टूल।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [B1 API कुंजी](./api-keys) (`cak_…`) जिसमें क्लाइंट के पास आवश्यक स्कोप हों, या एक MCP क्लाइंट जो OAuth से साइन इन कर सके (देखें [OAuth डिस्कवरी](#oauth-discovery))
- एक पहुँच योग्य B1 API होस्ट -- होस्ट किए गए चर्चों के लिए `https://api.churchapps.org`, या आपका अपना डिप्लॉयमेंट
- एक MCP क्लाइंट। एंड-यूज़र सेटअप के लिए देखें [Claude](/docs/b1-admin/integrations/claude) और [ChatGPT](/docs/b1-admin/integrations/chatgpt)

</div>

## एंडपॉइंट {#endpoint}

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| पहलू | मान |
|------|-----|
| **पथ** | `/mcp` (API होस्ट के सापेक्ष) |
| **विधि** | केवल `POST` -- अनुरोध/प्रतिक्रिया और SSE स्ट्रीमिंग दोनों एक ही एंडपॉइंट पर होते हैं |
| **ट्रांसपोर्ट** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **सेशन मॉडल** | स्टेटलेस। हर अनुरोध पर एक नया MCP सर्वर इंस्टेंस बनता है -- कोई सेशन आईडी नहीं, कोई रिज़्यूमेशन नहीं |
| **ऑथ** | Bearer टोकन। `cak_…` API कुंजियाँ और B1 JWT (OAuth एक्सेस टोकन सहित) सभी काम करते हैं; हल करने का तरीका किसी भी अन्य प्रमाणित एंडपॉइंट जैसा ही है |

जिस अनुरोध का `Authorization` हेडर गायब या अमान्य है, उसे यह मिलता है:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

यह HTTP 401 और `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"` हेडर के साथ आता है, जिसे OAuth-सक्षम क्लाइंट साइन इन शुरू करने के लिए फ़ॉलो करते हैं।

## टूल {#tools}

तीन सामान्य टूल और एक गाइड। मॉडल खोज के लिए `list_endpoints` उपयोग करता है, पेलोड का आकार जानने के लिए `describe_endpoint`, वास्तव में API को कॉल करने के लिए `api_call`, और जब कार्य में वेबसाइट कंटेंट शामिल हो तब `describe_page_builder`।

### `list_endpoints` {#list_endpoints}

पंजीकृत REST रूट्स की पूरी सूची लौटाता है, जिसे वैकल्पिक सबस्ट्रिंग और/या HTTP क्रिया द्वारा फ़िल्टर किया जा सकता है। हर प्रविष्टि में कंट्रोलर का नाम और वे API कुंजी स्कोप शामिल होते हैं जिनकी सबसे अधिक संभावना है।

**इनपुट:**

| फ़ील्ड | प्रकार | विवरण |
|---|---|---|
| `filter` | string (वैकल्पिक) | पथ से मेल खाने वाला केस-इनसेंसिटिव सबस्ट्रिंग, जैसे `"people"` |
| `method` | enum (वैकल्पिक) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**आउटपुट:** इस रूप में एक JSON दस्तावेज़:

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

सूची API स्टार्टअप पर लाइव रूट टेबल से एक बार बनाई जाती है -- जो कुछ भी `curl` से हिट हो सकता है, वह यहाँ दिखता है।

### `describe_endpoint` {#describe_endpoint}

एक एंडपॉइंट के लिए एक संक्षिप्त सारांश लौटाता है और, जहाँ उपलब्ध हो, हाथ से तैयार किया गया अनुरोध बॉडी और प्रतिक्रिया नमूना।

**इनपुट:**

| फ़ील्ड | प्रकार | विवरण |
|---|---|---|
| `method` | string | HTTP क्रिया |
| `path` | string | `list_endpoints` द्वारा लौटाया गया पूरा पथ |

**आउटपुट:** क्यूरेटेड एंडपॉइंट्स के लिए, `summary`, `requestBody`, और `responseSample` वाला एक उदाहरण। बिना क्यूरेट किए एंडपॉइंट्स के लिए, एक फ़ॉलबैक संदेश जो मॉडल को आकार देखने के लिए पहले `GET` कॉल करने का निर्देश देता है। लगभग एक दर्जन उच्च-ट्रैफ़िक रूट (people, groups, donations, attendance, funds) क्यूरेट किए गए हैं।

### `api_call` {#api_call}

चुने गए REST एंडपॉइंट को इन-प्रोसेस, उसी Express मिडलवेयर स्टैक के माध्यम से कॉल करता है जो एक सामान्य HTTP अनुरोध के लिए होता है -- ऑथ, बॉडी पार्सिंग, ऑडिट लॉगिंग, और प्रति-चर्च स्कोपिंग सब लागू होते हैं।

**इनपुट:**

| फ़ील्ड | प्रकार | विवरण |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | मॉड्यूल प्रीफ़िक्स सहित पथ, जैसे `/membership/people` |
| `query` | object (वैकल्पिक) | क्वेरी-स्ट्रिंग पैरामीटर का फ़्लैट ऑब्जेक्ट |
| `body` | any (वैकल्पिक) | JSON अनुरोध बॉडी -- आमतौर पर `POST` के लिए मॉडल ऑब्जेक्ट्स की सूची |

**आउटपुट:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

400 या उससे अधिक स्थिति वाली किसी भी प्रतिक्रिया के लिए टूल परिणाम `isError: true` के रूप में चिह्नित होता है।

### `describe_page_builder` {#describe_page_builder}

एकमात्र गैर-सामान्य टूल: `/content/*` एंडपॉइंट्स के माध्यम से वेबसाइट पेज बनाने के लिए एक स्थिर, स्व-निहित गाइड -- Page → Section → Element डेटा मॉडल, बनाने का वर्कफ़्लो, हर `elementType` उसके `answersJSON` आकार के साथ, `dividerTop`/`dividerBottom` शेप डिवाइडर जैसी सेक्शन-स्तरीय सेटिंग्स, और एक कार्यरत एंड-टू-एंड उदाहरण। यह B1Admin एडिटर में रखी गई एलिमेंट सूची को दर्शाता है (देखें [वेबसाइट बिल्डर आर्किटेक्चर](../architecture/website-builder))। एजेंट्स से अपेक्षा है कि वे पेज कंटेंट बनाने या संपादित करने से पहले इसे एक बार कॉल करें, फिर `api_call` के माध्यम से कार्य करें।

## ऑथ मॉडल {#auth-model}

MCP अनुरोध स्वयं `CustomAuthProvider.getUser()` से गुजरता है -- वही पथ जो हर प्रमाणित B1 एंडपॉइंट उपयोग करता है। `cak_…` बियरर एक `Principal` में हल होता है जिसकी अनुमतियाँ जारी करने वाले व्यक्ति की वर्तमान RBAC हैं, जो कुंजी के दिए गए स्कोप के साथ **इंटरसेक्ट** की जाती हैं। यह इंटरसेक्शन हर अनुरोध पर पुनः गणना होता है, इसलिए:

- किसी कुंजी से स्कोप हटाने पर (उसे हटाकर और दोबारा बनाकर) अगली कॉल पर पहुँच बंद हो जाती है।
- B1Admin में अंतर्निहित व्यक्ति से अनुमति हटाने पर अगली कॉल पर पहुँच बंद हो जाती है, भले ही कुंजी अभी भी मौजूद हो।

नेस्टेड `api_call` आह्वानों के लिए, मूल `Authorization` हेडर सिंथेटिक अनुरोध पर कॉपी किया जाता है, इसलिए `CustomAuthProvider` फिर से चलता है और स्कोप इंटरसेक्शन हर कॉल पर फिर से लागू होता है। कोई टोकन कैशिंग नहीं है।

## पाथ ब्लॉकलिस्ट {#path-blocklist}

कुछ रूट `api_call` के माध्यम से नहीं पहुँचे जा सकते, भले ही कुंजी मान्य हो:

| पैटर्न | कारण |
|---|---|
| `/giving/donate/webhook/*` | प्रदाता वेबहुक एंडपॉइंट्स Stripe/PayPal से कच्ची, सिग्नेचर-सत्यापित बॉडी की अपेक्षा करते हैं -- सामान्य कॉलर्स के लिए नहीं |
| `/membership/oauth/clients*` | OAuth क्लाइंट पंजीकरण केवल ऑपरेटर के लिए है |
| `/membership/people/apiEmails` | उपयोगकर्ता अनुमतियों के बजाय ऑपरेटर `jwtSecret` द्वारा सुरक्षित |
| `multipart/form-data` अपेक्षित करने वाला कोई भी रूट | फ़ाइल अपलोड JSON-RPC के अनुकूल नहीं हैं |

ब्लॉक किए गए पथ पर एक वर्णनात्मक संदेश के साथ `isError: true` टूल परिणाम मिलता है; अंतर्निहित रूट कभी नहीं चलता।

## प्रतिक्रिया आकार सीमा {#response-size-cap}

हर `api_call` प्रतिक्रिया बॉडी कैप्चर किए गए आउटपुट के **64 KB** तक सीमित है। यदि कोई क्वेरी सीमा से अधिक हो जाए, तो प्रतिक्रिया में `"truncated": true` होता है और मॉडल से अपेक्षा है कि वह संकीर्ण क्वेरी पैरामीटर के साथ पुनः प्रयास करे। इससे एक ही टूल प्रतिक्रिया क्लाइंट के कंटेक्स्ट विंडो को नहीं भर पाती।

## रेट लिमिटिंग {#rate-limiting}

`/mcp` पर कोई एप्लिकेशन-स्तर की रेट लिमिट नहीं है। प्रोडक्शन में थ्रॉटलिंग API Gateway / Lambda concurrency पर टाली गई है, और सेल्फ-होस्टेड डिप्लॉयमेंट में आपके रिवर्स प्रॉक्सी द्वारा लागू की गई सीमा पर।

## OAuth डिस्कवरी {#oauth-discovery}

MCP सर्वर OAuth 2.1 मेटाडेटा विज्ञापित करता है, ताकि केवल OAuth-डिस्कवर किए गए सर्वरों से जुड़ने वाले क्लाइंट -- विशेष रूप से Claude.ai का "Add custom connector" UI -- बिना पेस्ट की गई कुंजी के उपयोगकर्ता को साइन इन करा सकें। `/mcp` संरक्षित संसाधन है, `/membership/oauth` के अंतर्गत मौजूदा [OAuth प्रदाता](./connected-apps) इसका ऑथराइज़ेशन सर्वर है, और B1Admin का `/oauth` पेज सहमति स्क्रीन है।

| एंडपॉइंट | उद्देश्य |
|---|---|
| `GET /.well-known/oauth-protected-resource` (साथ ही `/.well-known/oauth-protected-resource/mcp`) | संरक्षित संसाधन मेटाडेटा (RFC 9728): `resource` `<api>/mcp` है, `authorization_servers` API रूट है, `scopes_supported` हर [API कुंजी स्कोप](./api-keys#scopes) की सूची देता है |
| `GET /.well-known/oauth-authorization-server` | ऑथराइज़ेशन सर्वर मेटाडेटा (RFC 8414): `authorization_endpoint` B1Admin `/oauth` है, `token_endpoint` `/membership/oauth/token` है, `registration_endpoint` `/membership/oauth/register` है |
| `POST /membership/oauth/register` | डायनामिक क्लाइंट पंजीकरण (RFC 7591) |

claude.ai जैसा क्लाइंट जो फ़्लो चलाता है:

1. टोकन के बिना `POST /mcp` 401 लौटाता है, जिसके `WWW-Authenticate` हेडर में संरक्षित संसाधन मेटाडेटा की ओर इशारा होता है।
2. क्लाइंट दोनों मेटाडेटा दस्तावेज़ पढ़ता है, फिर `client_name`, `redirect_uris`, और वैकल्पिक रूप से `scope` भेजकर `POST /membership/oauth/register` के साथ स्वयं को पंजीकृत करता है। हर स्वयं-पंजीकृत क्लाइंट एक **सार्वजनिक** क्लाइंट है: कोई सीक्रेट जारी नहीं होता और प्रतिक्रिया में `token_endpoint_auth_method: "none"` होता है। Redirect URI `https` होने चाहिए, या loopback पते (`localhost`, `127.0.0.1`, `[::1]`) पर `http`; प्रति क्लाइंट अधिकतम 10। पंजीकरण प्रति IP प्रति घंटे 20 तक सीमित है।
3. उपयोगकर्ता को `code_challenge` और `code_challenge_method=S256` के साथ B1Admin `/oauth` पर भेजा जाता है। सहमति पेज हर अनुरोधित स्कोप को सरल भाषा में सूचीबद्ध करता है (या कोई अनुरोध न होने पर "Everything your B1 account can access"), वह होस्ट दिखाता है जिस पर उपयोगकर्ता वापस भेजा जाएगा, और बताता है कि ऐप ने स्वयं को पंजीकृत किया है। उपयोगकर्ता **Allow** पर क्लिक करता है।
4. क्लाइंट `grant_type=authorization_code` और अपने `code_verifier` के साथ `/membership/oauth/token` पर कोड का आदान-प्रदान करता है, और बाद में `grant_type=refresh_token` से रिफ़्रेश करता है। फ़ॉर्म-encoded और JSON दोनों बॉडी स्वीकार्य हैं।
5. परिणामी एक्सेस टोकन एक स्कोप्ड B1 JWT है, जिसे `/mcp` पर बियरर के रूप में उपयोग किया जाता है।

PKCE नियम: केवल `S256` स्वीकार्य है। बिना सीक्रेट वाले क्लाइंट को authorize पर `code_challenge` और टोकन आदान-प्रदान पर मेल खाता `code_verifier` भेजना होगा; गोपनीय क्लाइंट (सीक्रेट के साथ) अब भी केवल सीक्रेट का उपयोग कर सकते हैं। Redirect URI पंजीकृत URI से बिल्कुल मेल खाने चाहिए।

जो क्लाइंट अपनी कॉन्फ़िगरेशन में स्टैटिक बियरर टोकन स्वीकार करते हैं -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, कस्टम कोड -- वे इसके बजाय `cak_…` कुंजी उपयोग करना जारी रख सकते हैं।

## स्थानीय डेवलपमेंट {#local-development}

जब API स्थानीय रूप से चलता है, तो MCP एंडपॉइंट बाकी सब कुछ के साथ माउंट होता है:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

स्टार्टअप पर लॉग लाइन `📡 MCP server ready at /mcp — N routes in inventory` पुष्टि करती है कि सूची बन चुकी है।

MCP Inspector से जाँचें:

```bash
npx @modelcontextprotocol/inspector
```

Inspector UI में, उसे `http://localhost:8084/mcp` पर इंगित करें और `Authorization` हेडर को `Bearer cak_<prefix>.<secret>` पर सेट करें। पहले `list_endpoints` कॉल करें; आपको पूरी रूट सूची दिखनी चाहिए। फिर `api_call({ method: "GET", path: "/membership/people" })` से आपके स्थानीय सीड लोग मिलने चाहिए।

## कोड लेआउट {#code-layout}

MCP सर्वर Api रिपो में `src/modules/mcp/` पर स्थित है। उल्लेखनीय फ़ाइलें:

| फ़ाइल | उद्देश्य |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; हर अनुरोध के लिए `StreamableHTTPServerTransport` जोड़ता है और 401 पर `WWW-Authenticate` चुनौती भेजता है |
| `WellKnownController.ts` / `OAuthMetadata.ts` | `/.well-known` OAuth डिस्कवरी दस्तावेज़ सेवा करते हैं |
| `McpServer.ts` | MCP `Server` बनाता है, चारों टूल पंजीकृत करता है |
| `RouteInventory.ts` | स्टार्टअप पर रूट गिनने के लिए inversify-express-utils मेटाडेटा को स्कैन करता है |
| `internalDispatch.ts` | सिंथेटिक `req`/`res` जो इन-प्रोसेस Express ऐप में फिर से प्रवेश करता है |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | उच्च-ट्रैफ़िक एंडपॉइंट्स के लिए क्यूरेटेड अनुरोध/प्रतिक्रिया नमूने |

## संबंधित {#related}

- [API कुंजियाँ](./api-keys)
- [Webhooks](./webhooks)
- [Connected Apps (OAuth)](./connected-apps)
- [Claude -- एंड-यूज़र सेटअप](/docs/b1-admin/integrations/claude)
- [ChatGPT -- एंड-यूज़र सेटअप](/docs/b1-admin/integrations/chatgpt)
