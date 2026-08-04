---
title: "इंटीग्रेशन और एक्सटेंशन सतह"
---

# इंटीग्रेशन और एक्सटेंशन सतह

<div class="article-intro">

कोई भी तीसरा पक्ष जिस चीज़ में plug कर सकता है वह एक API और एक authorization मॉडल से होकर गुज़रती है। यह पृष्ठ नक्शा है: यह हर इंटीग्रेशन सतह को नाम देता है, दिखाता है कि वे कैसे जुड़ते हैं, और हर एक के लिए विस्तृत संदर्भ से लिंक करता है। अगर आप B1 के विरुद्ध बना रहे हैं, तो सही दरवाज़ा चुनने के लिए यहाँ से शुरू करें, फिर उस पृष्ठ के लिंक का अनुसरण करें जो इसे गहराई से डॉक्यूमेंट करता है।

</div>

## एक नज़र में सतहें

अंदर या बाहर जाने के छह तरीके हैं, और वे सभी एक ही auth लेयर शेयर करते हैं:

- **[REST API](../api/api-keys)** — पूरी प्रोडक्ट सतह, किसी भी भाषा से bearer token के साथ कॉल करने योग्य।
- **[API keys](../api/api-keys)** — सबसे सरल क्रेडेंशियल: एक `cak_…` टोकन जो एक चर्च में एक व्यक्ति से बंधा है।
- **[OAuth 2.0 & Connected Apps](../api/connected-apps)** — मल्टी-टेनेंट ऐप्स के लिए प्रति-चर्च सहमति; वही JWT जारी करता है जो एक यूज़र को मिलता है।
- **[Webhooks](../api/webhooks)** — signed, durably-delivered आउटबाउंड इवेंट्स।
- **[MCP server](../api/mcp)** — `/mcp` पर REST API का एक AI-facing wrapper।
- **[Content providers](../freeplay-content-provider)** — FreePlay और B1 ऐप्स में बाहरी मीडिया लाइब्रेरी के लिए इनबाउंड पाथ।

Content providers को छोड़कर सब कुछ एक ही monolithic API ([Api](https://github.com/ChurchApps/Api) रिपॉज़िटरी) द्वारा सर्व किया जाता है जिसके मॉड्यूल स्थिर base paths के तहत माउंट होते हैं — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, और `/mcp`।

## यह सब कैसे एक साथ फिट होता है

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

तीन तीर पूरी कहानी बताते हैं: एक तीसरा पक्ष एक bearer token (API key या OAuth JWT, `/mcp` के माध्यम से भी) के साथ **कॉल इन करता है**; API signed webhooks के माध्यम से **कॉल बैक आउट करता है**; और content providers वह एकमात्र **इनबाउंड-कंटेंट** पाथ है जहाँ B1 खुद वह OAuth *क्लाइंट* है जो किसी बाहरी स्रोत से मीडिया खींच रहा है।

## शेयर्ड Auth मॉडल

हर क्रेडेंशियल — एक यूज़र का लॉगिन JWT, एक OAuth access token, या एक API key — उसी **`Principal`** को resolve करता है और उसी तरह चेक किया जाता है। कोई अलग "इंटीग्रेशन auth" पाथ नहीं है; एक scoped क्रेडेंशियल एक कम-privilege वाले यूज़र से बस अलग पहचाना नहीं जा सकता।

### JWT संरचना

B1 access tokens `Api/src/modules/membership/auth/AuthenticatedUser.ts` में minted HS256 JWTs हैं। क्लेम सेट:

| क्लेम | अर्थ |
|---|---|
| `id`, `email`, `firstName`, `lastName` | टोकन के पीछे का व्यक्ति |
| `churchId` | वह एकमात्र चर्च जिसके भीतर यह टोकन कार्य करता है — सभी डेटा स्कोपिंग का आधार |
| `personId` | उस चर्च के अंदर person रिकॉर्ड |
| `permissions` | RBAC perm-strings का flat array (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Group membership / leadership, group-scoped जाँच के लिए |
| `membershipStatus` | Guest बनाम member, self-service gating के लिए |

एक OAuth access token बिल्कुल उसी shape का होता है जैसा एक लॉगिन JWT — एकमात्र अंतर यह है कि इसका `permissions` array **साइन होने से पहले granted scopes के माध्यम से फ़िल्टर किया गया था** (`getCombinedApiJwt(...)`)।

### प्रति-चर्च स्कोपिंग

`churchId` एक टोकन क्लेम है, रिक्वेस्ट पैरामीटर नहीं, इसलिए एक क्रेडेंशियल कभी भी चर्चों के पार नहीं पहुँच सकता। हर रिपॉज़िटरी क्वेरी caller के `churchId` पर फ़िल्टर करती है; एक API key या OAuth token mint होने के समय ठीक एक चर्च से बाउंड होता है।

### सीमा पर भूमिका-आधारित अनुमतियाँ

कंट्रोलर टोकन के `permissions` array के विरुद्ध `au.checkAccess(contentType, action)` के साथ actions को gate करते हैं। Scopes एक **फ़िल्टर हैं, कभी grant नहीं** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` हर scope (जैसे `people:read`, `donations:write`) को उन RBAC जोड़ों से मैप करता है जिनकी वह अनुमति देता है, और `filterPermissionsByScopes()` हर resolve पर उसे व्यक्ति की *वर्तमान* अनुमतियों के साथ इंटरसेक्ट करता है। परिणाम:

- B1Admin में एक अनुमति रद्द करने से अगली रिक्वेस्ट पर क्रेडेंशियल की पहुँच कट जाती है — टोकन कभी role से drift नहीं करते।
- एक scope कभी भी केवल अनुमतियों को *हटा* सकता है, इसलिए एक scoped क्रेडेंशियल कभी सर्वर/डोमेन एडमिनिस्ट्रेशन तक elevate नहीं हो सकता (वे अनुमतियाँ जानबूझकर किसी scope से unmapped हैं)।
- API keys एक `cak_` prefix carry करती हैं; `CustomAuthProvider.getUser()` इस पर branch करता है, secret को hash करता है, और हर कॉल पर owning person के live RBAC को re-resolve करता है।

पूरा catalog देखने के लिए [API Keys → Scopes](../api/api-keys#scopes) देखें।

## सतह संदर्भ

### REST API

पूरी प्रोडक्ट सतह। कोई भी authenticated endpoint `Authorization: Bearer` header में या तो JWT या `cak_…` API key स्वीकार करता है — कोई अलग key-only या OAuth-only route table नहीं है। मॉड्यूल और उनके base paths `Api/src/modules/*` के तहत रहते हैं।

### API keys

एक `cak_<prefix>.<secret>` personal access token, जो **B1Admin → Settings → Developer → API Keys** में बनाई जाती है। केवल एक SHA-256 hash संग्रहीत होता है; raw key एक बार दिखाई जाती है। `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`) पर मैनेज की जाती है। एक चर्च के अपने स्क्रिप्ट और Zapier, Make, और Google Sheets जैसे कनेक्टर्स के लिए सबसे उपयुक्त। → **[API Keys](../api/api-keys)**

### OAuth 2.0 & Connected Apps

मल्टी-टेनेंट ऐप्स के लिए जिन्हें हर चर्च की सहमति चाहिए। `Api/src/modules/membership/controllers/OAuthController.ts` में `/membership/oauth` के तहत लागू। सर्वर तीन grants का समर्थन करता है:

- **Authorization Code** — `POST /oauth/authorize` (authenticated) एक short-lived कोड लौटाता है; `POST /oauth/token` `grant_type=authorization_code` के साथ इसे एक access JWT (≈ 7 दिन) प्लस एक refresh token (≈ 90 दिन) से exchange करता है।
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` एक `user_code` जारी करता है; यूज़र इसे B1Admin में अनुमोदित करता है (`/oauth/device/approve`); डिवाइस device-code grant के साथ `/oauth/token` को poll करता है। TVs, kiosks, और बिना ब्राउज़र वाले CLIs के लिए।
- **Refresh Token** — `grant_type=refresh_token` एक नया access token mint करता है; public (secret-less) क्लाइंट secret को छोड़ सकते हैं।

एक **Connected App** एक granted token का church-admin-facing दृश्य है, जो `/membership/oauth/connections` पर सूचीबद्ध और निरस्त करने योग्य है। कंट्रोलर एक OAuth **relay-session** ब्रिज (`/oauth/relay/*`) भी होस्ट करता है जो एक browserless डिवाइस को किसी *बाहरी* प्रोवाइडर के विरुद्ध sign-in पूरा करने देता है। → **[Connected Apps & OAuth](../api/connected-apps)**

### Webhooks

एकमात्र आउटबाउंड सतह। एक चर्च इवेंट्स के लिए एक सार्वजनिक HTTPS endpoint सब्सक्राइब करता है; जब एक matching बदलाव होता है, `WebhookDispatcher.emit(churchId, event, payload)` id-only payloads को display names (`personName`, `groupName`, `formName` — lookups केवल तभी चलते हैं जब कोई सब्सक्रिप्शन मैच करती है) से समृद्ध करता है, एक delivery रिकॉर्ड करता है, और एक बैकग्राउंड वर्कर retry/backoff और redelivery के साथ एक signed JSON envelope POST करता है। इंजन `Api/src/shared/webhooks/` पर, प्रति-चर्च CRUD `/membership/webhooks` के तहत (`WebhookController.ts`)। एक `connectorType` फ़ील्ड Slack / Discord के लिए बॉडी को reshape करता है। → **[Webhooks](../api/webhooks)**

### MCP server

`/mcp` पर एक AI-facing wrapper (`Api/src/modules/mcp/`)। तीन जेनेरिक टूल्स — `list_endpoints`, `describe_endpoint`, `api_call` — पूरी REST सतह को किसी भी MCP क्लाइंट के लिए dynamically expose करते हैं। Auth बाकी सब चीज़ों जैसा ही bearer token है, और `api_call` Express stack में in-process re-enter करता है ताकि हर अनुमति और चर्च-स्कोपिंग नियम अभी भी लागू हो। → **[MCP Server](../api/mcp)**

### Content providers

इनबाउंड-कंटेंट पाथ, API के बजाय एक अलग पैकेज `Packages/content-providers` (`@churchapps/content-providers`) में। हर प्रोवाइडर `IProvider` इंटरफ़ेस (`src/interfaces.ts`) लागू करता है — `browse`, `getPlaylist`, `getInstructions`, प्लस auth hooks — और एक `Map` रजिस्ट्री में स्वयं रजिस्टर होता है (`src/providers/registry.ts`)। यहाँ **B1 OAuth क्लाइंट है**: एक प्रोवाइडर एक `AuthType` घोषित करता है `none`, `oauth_pkce`, `device_flow`, या `form_login`, और शेयर्ड helpers (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) क्लाइंट-साइड PKCE / device flow को बाहरी स्रोत के विरुद्ध चलाते हैं। आज ग्यारह प्रोवाइडर शिप होते हैं — Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, और B1.church सहित — FreePlay और B1 ऐप्स को feed करते हुए। → **[FreePlay Content Provider](../freeplay-content-provider)**

## सारांश

| सतह | Auth तंत्र | दिशा | कहाँ लागू | संदर्भ |
|---|---|---|---|---|
| REST API | `Bearer` JWT या `cak_…` key | इनबाउंड | `Api/src/modules/*` | [API Keys](../api/api-keys) |
| API keys | SHA-256-hashed `cak_` token | क्रेडेंशियल | `Api/.../membership/controllers/ApiKeyController.ts` | [API Keys](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Auth code · device · refresh → JWT | इनबाउंड | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | प्रति-hook secret, HMAC-SHA256 signature | आउटबाउंड | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP server | `Bearer` JWT या `cak_…` key | इनबाउंड (AI) | `Api/src/modules/mcp/` | [MCP Server](../api/mcp) |
| Content providers | प्रति-प्रोवाइडर: none / OAuth PKCE / device / form | इनबाउंड कंटेंट | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider) |

## प्रीबिल्ट कनेक्टर्स

हर किसी को शुरू से बनाने के बजाय, ChurchApps ऊपर की सतहों के ऊपर कनेक्टर्स शिप करता है:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — एक webhook `connectorType` मानक envelope को एक चैट संदेश में reshape करता है; पूरी तरह B1Admin में कॉन्फ़िगर, कोई तीसरे-पक्ष का अकाउंट नहीं।
- **[Zapier](/docs/b1-admin/integrations/zapier)** और **[Make](/docs/b1-admin/integrations/make)** — webhook इवेंट्स पर ट्रिगर करते हैं और REST API के माध्यम से कार्य करते हैं; जब एक Zap/scenario चालू होता है वे अपना खुद का webhook रजिस्टर करते हैं (`settings:write` वाली एक key चाहिए)। Zapier ऐप का सोर्स `Integrations` रिपॉज़िटरी में `zapier/` के तहत रहता है (Zapier CLI, `zapier push` के साथ deploy किया गया)।
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — एक API-key-authenticated ऐड-ऑन जो People / Donations / Groups / Attendance को माँग पर export करता है।
- **[Claude](/docs/b1-admin/integrations/claude)** और **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — `/mcp` की ओर पॉइंट किए गए MCP क्लाइंट।

अपने खुद के कोड के लिए, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) यह सब wrap करता है: एक typed REST क्लाइंट, एक OAuth क्लाइंट (auth-code / refresh / device flow), और Express middleware के साथ एक HMAC webhook verifier।

## संबंधित पृष्ठ

- [API Keys](../api/api-keys) — सबसे सरल क्रेडेंशियल और scope catalog
- [Connected Apps & OAuth](../api/connected-apps) — मल्टी-टेनेंट सहमति फ़्लो
- [Webhooks](../api/webhooks) — आउटबाउंड इवेंट सिस्टम
- [MCP Server](../api/mcp) — AI इंटीग्रेशन wrapper
- [FreePlay Content Provider](../freeplay-content-provider) — एक इनबाउंड कंटेंट स्रोत बनना
- [Integrations (end-user)](/docs/b1-admin/integrations/) — प्रीबिल्ट कनेक्टर सेटअप गाइड
