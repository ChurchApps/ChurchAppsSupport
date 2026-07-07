---
title: "MCP सर्वर"
---

# MCP सर्वर

<div class="article-intro">

B1 API `/mcp` पर एक [MCP (Model Context Protocol)](https://modelcontextprotocol.io) सर्वर जहाज करता है। कोई भी MCP-जागरूक AI क्लाइंट -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, या आपका स्वयं का -- इसे कनेक्ट कर सकता है और एक प्रमाणीकृत चर्च उपयोगकर्ता की ओर से अंतर्निहित REST API को कॉल कर सकता है। यह एक पतला, सामान्य रैपर है: तीन सामान्य उपकरण संपूर्ण API सतह को गतिशील रूप से उजागर करते हैं बजाय प्रत्येक एंडपॉइंट को हाथ से मॉडलिंग करने के, साथ ही वेबसाइट बिल्डर के लिए एक डोमेन गाइड उपकरण।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [B1 API key](./api-keys) (`cak_…`) जिसके पास वह scopes हैं जो क्लाइंट को होने चाहिए
- एक पहुंच योग्य B1 API होस्ट -- होस्ट किए गए चर्चों के लिए `https://api.churchapps.org`, या आपका स्वयं का तैनाती
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
| **Path** | `/mcp` (API होस्ट के सापेक्ष) |
| **Method** | `POST` केवल -- अनुरोध/प्रतिक्रिया और SSE स्ट्रीमिंग दोनों समान एंडपॉइंट पर होते हैं |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Session model** | Stateless। प्रति अनुरोध एक ताजा MCP सर्वर उदाहरण बनाया जाता है -- कोई सत्र आईडी, कोई पुनरारंभ नहीं |
| **Auth** | Bearer token। `cak_…` API keys और B1 JWTs दोनों काम करते हैं; resolution किसी अन्य प्रमाणीकृत एंडपॉइंट के समान है |

एक अनुरोध जिसका `Authorization` हेडर अनुपस्थित या अमान्य है:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

HTTP 401 के साथ रिटर्न करता है।

## उपकरण

तीन सामान्य उपकरण साथ ही एक गाइड। मॉडल खोज के लिए `list_endpoints` का उपयोग करता है, एक एंडपॉइंट सीखने के लिए `describe_endpoint`, वास्तव में API को आमंत्रित करने के लिए `api_call`, और जब कार्य वेबसाइट सामग्री में शामिल हो तो `describe_page_builder`।

### `list_endpoints`

पंजीकृत REST मार्गों का पूरा सूची रिटर्न करता है, एक वैकल्पिक सबस्ट्रिंग और/या HTTP क्रिया द्वारा फ़िल्टर किया गया। प्रत्येक प्रविष्टि में नियंत्रक नाम और सबसे संभावित आवश्यक API key scopes शामिल हैं।

**Input:**

| Field | Type | Description |
|---|---|---|
| `filter` | string (optional) | पथ से मेल खाया गया केस-असंवेदनशील सबस्ट्रिंग, जैसे `"people"` |
| `method` | enum (optional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Output:** निम्न रूप के एक JSON दस्तावेज़

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

सूची API स्टार्टअप से एक बार लाइव मार्ग तालिका से बनाई जाती है -- कुछ भी जो आप `curl` के साथ हिट कर सकते हैं यहां दिखाई देता है।

### `describe_endpoint`

एक संक्षिप्त सारांश साथ ही, जहां उपलब्ध हो, एक हाथ से तैयार किया गया अनुरोध निकाय और एक एंडपॉइंट के लिए प्रतिक्रिया नमूना।

**Input:**

| Field | Type | Description |
|---|---|---|
| `method` | string | HTTP क्रिया |
| `path` | string | पूर्ण पथ जैसा `list_endpoints` द्वारा रिटर्न किया जाता है |

**Output:** curated एंडपॉइंट के लिए, `summary`, `requestBody`, और `responseSample` के साथ एक उदाहरण। Un-curated एंडपॉइंट के लिए, एक फॉलबैक संदेश मॉडल को पहली बार `GET` कॉल करने के लिए आकार देखने का निर्देश देता है। लगभग दर्जन उच्च-ट्रैफिक मार्ग (people, groups, donations, attendance, funds) curated हैं।

### `api_call`

चुने गए REST एंडपॉइंट को invoke करता है, in-process, Express middleware स्टैक के माध्यम से एक सामान्य HTTP अनुरोध के रूप में -- auth, body parsing, audit logging, और per-church scoping सभी लागू होते हैं।

**Input:**

| Field | Type | Description |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | किसी भी मॉड्यूल उपसर्ग सहित पथ, जैसे `/membership/people` |
| `query` | object (optional) | query-string पैरामीटर का सपाट ऑब्जेक्ट |
| `body` | any (optional) | JSON अनुरोध निकाय -- आमतौर पर `POST` के लिए मॉडल ऑब्जेक्ट की एक सरणी |

**Output:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* नियंत्रक का JSON प्रतिक्रिया */ ]
}
```

Tool result को `isError: true` के साथ चिह्नित किया जाता है किसी भी प्रतिक्रिया के लिए जहां स्थिति ≥ 400।

### `describe_page_builder`

एक गैर-सामान्य उपकरण: `/content/*` एंडपॉइंट के माध्यम से वेबसाइट पृष्ठ बनाने के लिए एक स्थिर, आत्मनिर्भर गाइड -- Page → Section → Element डेटा मॉडल, create workflow, प्रत्येक `elementType` इसके `answersJSON` आकार के साथ, section-स्तर की सेटिंग जैसे `dividerTop`/`dividerBottom` आकार dividers, और एक काम किया अंत-से-अंत उदाहरण। यह कोई input नहीं लेता है और B1Admin संपादक में बनाए गए element कैटलॉग को दर्शाता है (देखें [वेबसाइट बिल्डर आर्किटेक्चर](../architecture/website-builder))। Agents को पृष्ठ सामग्री बनाने या संपादित करने से पहले एक बार इसे कॉल करने की उम्मीद है, फिर `api_call` के माध्यम से कार्य करें।

## Auth मॉडल

MCP अनुरोध स्वयं `CustomAuthProvider.getUser()` के माध्यम से चलता है -- same path हर प्रमाणीकृत B1 एंडपॉइंट उपयोग करता है। एक `cak_…` bearer एक `Principal` को resolve करता है जिसकी अनुमतियां जारी करने वाले व्यक्ति की current RBAC हैं, **key के granted scopes के साथ प्रतिच्छेद**। यह प्रतिच्छेदन हर अनुरोध पर पुनः गणना की जाती है, इसलिए:

- एक key से एक scope को हटाना (हटाकर और फिर से बनाकर) अगली call पर एक्सेस को काट देता है।
- B1Admin में अंतर्निहित व्यक्ति से एक अनुमति हटाना अगली call पर एक्सेस को काट देता है, यहां तक कि यदि key अभी भी मौजूद है।

Nested `api_call` invocations के लिए, original `Authorization` हेडर को synthetic request पर कॉपी किया जाता है, तो `CustomAuthProvider` फिर से चलता है और scope प्रतिच्छेदन को प्रति call पर पुनः लागू किया जाता है। कोई token caching नहीं है।

## पथ Blocklist

मार्गों का एक छोटा सेट `api_call` के माध्यम से पहुंचने योग्य नहीं है, यहां तक कि एक valid key के साथ:

| Pattern | Why |
|---|---|
| `/giving/donate/webhook/*` | Provider webhook एंडपॉइंट raw, signature-verified bodies की अपेक्षा करते हैं Stripe/PayPal से -- general callers से नहीं |
| `/membership/oauth/clients*` | OAuth client registration operator-only है |
| `/membership/people/apiEmails` | Operator `jwtSecret` द्वारा gated है, user permissions द्वारा नहीं |
| कोई भी route जिसे `multipart/form-data` की अपेक्षा है | फाइल uploads JSON-RPC-friendly नहीं हैं |

एक blocked path एक `isError: true` tool result एक descriptive संदेश के साथ रिटर्न करता है; अंतर्निहित route को कभी invoke नहीं किया जाता है।

## प्रतिक्रिया आकार कैप

प्रत्येक `api_call` प्रतिक्रिया निकाय को captured output के **64 KB** पर सीमित किया जाता है। यदि एक query cap को exceed करता है, तो response `"truncated": true` carry करता है और मॉडल को narrower query parameters के साथ retry करने की अपेक्षा की जाती है। यह एक single tool response को क्लाइंट के context window को blow out होने से रोकता है।

## रेट लिमिटिंग

`/mcp` पर कोई application-level rate limit नहीं है। Throttling को production में API Gateway / Lambda concurrency को defer किया जाता है, और जो कुछ भी आपके reverse proxy self-hosted deployments में enforce करता है।

## OAuth आविष्कार

MCP सर्वर OAuth 2.1 metadata (`/.well-known/oauth-authorization-server`, dynamic client registration, PKCE flow) advertise **नहीं** करता है। Clients जिन्हें OAuth-discovered MCP servers की आवश्यकता है -- विशेष रूप से Claude.ai के "Add custom connector" UI और ChatGPT के "Connectors" feature -- उस सतह के बिना कनेक्ट नहीं कर सकते।

Clients जो उनके config में एक static bearer token स्वीकार करते हैं -- Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, custom code -- आज काम करते हैं। Existing [OAuthController](/docs/developer/api/connected-apps) पहले से ही authorization-code + PKCE के माध्यम से tokens को तीसरे पक्ष के ऐप्स के लिए issue करता है; इसके top पर एक MCP-spec-compliant discovery layer अंतराल को बंद करेगा।

## स्थानीय विकास

MCP एंडपॉइंट सब कुछ के साथ mount करता है जब API locally चलता है:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Startup पर log line `📡 MCP server ready at /mcp — N routes in inventory` सूची के बनने की पुष्टि करता है।

MCP Inspector के साथ probe करें:

```bash
npx @modelcontextprotocol/inspector
```

Inspector UI में, इसे `http://localhost:8084/mcp` पर point करें और `Authorization` हेडर को `Bearer cak_<prefix>.<secret>` पर set करें। पहले `list_endpoints` कॉल करें; आपको पूरी route list दिखनी चाहिए। फिर `api_call({ method: "GET", path: "/membership/people" })` आपके स्थानीय seed लोगों को रिटर्न करना चाहिए।

## कोड लेआउट

MCP सर्वर Api repo में `src/modules/mcp/` पर रहता है। उल्लेखनीय फाइलें:

| File | Purpose |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; per request `StreamableHTTPServerTransport` को wire करता है |
| `McpServer.ts` | एक MCP `Server` बनाता है, चार उपकरणों को रजिस्टर करता है |
| `RouteInventory.ts` | Startup पर routes को enumerate करने के लिए inversify-express-utils metadata को walk करता है |
| `internalDispatch.ts` | Synthetic `req`/`res` जो in-process Express app में फिर से प्रवेश करता है |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | High-traffic endpoints के लिए curated request/response नमूने |

## संबंधित

- [API कुंजियां](./api-keys)
- [Webhooks](./webhooks)
- [कनेक्ट किए गए ऐप्स (OAuth)](./connected-apps)
- [Claude -- अंतिम-उपयोगकर्ता सेटअप](/docs/b1-admin/integrations/claude)
- [ChatGPT -- अंतिम-उपयोगकर्ता सेटअप](/docs/b1-admin/integrations/chatgpt)
