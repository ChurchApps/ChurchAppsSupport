---
title: "इंटीग्रेशन और एक्सटेंशन सतह"
---

# इंटीग्रेशन और एक्सटेंशन सतह

<div class="article-intro">

तीसरा पक्ष जिस किसी चीज़ से जुड़ सकता है, वह सब एक API और एक प्राधिकरण मॉडल के ज़रिए चलता है। यह पृष्ठ उसका नक्शा है: यह हर इंटीग्रेशन सतह का नाम बताता है, दिखाता है कि वे कैसे जुड़ती हैं, और हर एक के विस्तृत संदर्भ से लिंक करता है। यदि आप B1 के विरुद्ध कुछ बना रहे हैं, तो सही द्वार चुनने के लिए यहाँ से शुरू करें, फिर उस पृष्ठ पर जाएँ जो उसे गहराई से दस्तावेज़ करता है।

</div>

## सतहें एक नज़र में

अंदर या बाहर जाने के छह तरीके हैं, और वे सभी एक ही auth परत साझा करते हैं:

- **[REST API](../api/api-keys)** — पूरी उत्पाद सतह, किसी भी भाषा से bearer token के साथ कॉल योग्य।
- **[API keys](../api/api-keys)** — सबसे सरल क्रेडेंशियल: एक `cak_…` token जो एक चर्च में एक व्यक्ति से बंधा होता है।
- **[OAuth 2.0 & Connected Apps](../api/connected-apps)** — मल्टी-टेनेंट ऐप्स के लिए प्रति-चर्च सहमति; वही JWT जारी करता है जो एक उपयोगकर्ता पाता है।
- **[Webhooks](../api/webhooks)** — हस्ताक्षरित, टिकाऊ रूप से डिलीवर होने वाले बाहरी इवेंट।
- **[MCP server](../api/mcp)** — `/mcp` पर REST API के ऊपर AI-उन्मुख रैपर।
- **[Content providers](../freeplay-content-provider)** — FreePlay और B1 ऐप्स में बाहरी मीडिया लाइब्रेरी के लिए इनबाउंड पथ।

content providers के अलावा हर चीज़ एक ही मोनोलिथिक API (यानी [Api](https://github.com/ChurchApps/Api) रिपॉज़िटरी) से दी जाती है, जिसके मॉड्यूल स्थिर बेस पथों के तहत माउंट होते हैं — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, और `/mcp`।

## यह कैसे एक साथ फ़िट होता है

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

तीन तीर पूरी कहानी बताते हैं: एक तीसरा पक्ष bearer token (API key या OAuth JWT, `/mcp` के ज़रिए भी) के साथ **भीतर कॉल** करता है; API साइन किए गए webhooks के ज़रिए **वापस बाहर कॉल** करता है; और content providers वह एकमात्र **इनबाउंड-सामग्री** पथ है जहाँ B1 स्वयं OAuth *client* है और बाहरी स्रोत से मीडिया खींचता है।

## साझा Auth मॉडल

हर क्रेडेंशियल — उपयोगकर्ता का लॉग-इन JWT, OAuth access token, या API key — एक ही **`Principal`** में हल होता है और उसी तरह जाँचा जाता है। कोई अलग "integration auth" पथ नहीं है; एक स्कोप्ड क्रेडेंशियल कम-विशेषाधिकार वाले उपयोगकर्ता से केवल अलग न दिखने वाला होता है।

### JWT संरचना

B1 access tokens HS256 JWTs हैं जो `Api/src/modules/membership/auth/AuthenticatedUser.ts` में बनते हैं। claim सेट:

| Claim | अर्थ |
|---|---|
| `id`, `email`, `firstName`, `lastName` | token के पीछे का व्यक्ति |
| `churchId` | वह एक चर्च जिसके भीतर यह token काम करता है — सारे डेटा स्कोपिंग का आधार |
| `personId` | उस चर्च के भीतर व्यक्ति रिकॉर्ड |
| `permissions` | RBAC perm-strings का सपाट array (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | समूह सदस्यता / नेतृत्व, समूह-स्कोप्ड जाँचों के लिए |
| `membershipStatus` | अतिथि बनाम सदस्य, स्व-सेवा गेटिंग के लिए |

OAuth access token लॉगिन JWT से बिल्कुल एक ही आकार का है — अंतर केवल इतना है कि उसका `permissions` array साइन करने से **पहले दिए गए स्कोप्स से छाना** गया था (`getCombinedApiJwt(...)`)।

### प्रति-चर्च स्कोपिंग

`churchId` एक token claim है, अनुरोध पैरामीटर नहीं, इसलिए कोई क्रेडेंशियल कभी चर्चों के पार नहीं पहुँच सकता। हर रिपॉज़िटरी क्वेरी कॉलर के `churchId` पर फ़िल्टर करती है; एक API key या OAuth token mint के समय ठीक एक चर्च से बंधा होता है।

### सीमा पर भूमिका-आधारित अनुमतियाँ

कंट्रोलर token के `permissions` array के विरुद्ध `au.checkAccess(contentType, action)` से क्रियाओं को गेट करते हैं। स्कोप्स एक **फ़िल्टर हैं, कभी अनुदान नहीं** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` हर स्कोप (जैसे `people:read`, `donations:write`) को उन RBAC जोड़ियों से मैप करता है जिन्हें वह अनुमति देता है, और `filterPermissionsByScopes()` हर resolve पर उसे व्यक्ति की *वर्तमान* अनुमतियों के साथ intersect करता है। परिणाम:

- B1Admin में किसी अनुमति को रद्द करने से अगले अनुरोध पर उस क्रेडेंशियल की पहुँच कट जाती है — tokens भूमिका से कभी अलग नहीं होते।
- कोई स्कोप केवल अनुमतियों को *हटा* सकता है, इसलिए एक स्कोप्ड क्रेडेंशियल कभी सर्वर / डोमेन प्रशासन तक नहीं पहुँच सकता (वे अनुमतियाँ जानबूझकर किसी स्कोप से मैप नहीं हैं)।
- API keys का `cak_` प्रीफ़िक्स होता है; `CustomAuthProvider.getUser()` उस पर शाखा बनाता है, secret को hash करता है, और हर कॉल पर स्वामी व्यक्ति के लाइव RBAC को फिर से हल करता है।

पूरी स्कोप सूची के लिए देखें [API Keys → Scopes](../api/api-keys#scopes)।

## सतह संदर्भ

### REST API

पूरी उत्पाद सतह। कोई भी प्रमाणित एंडपॉइंट `Authorization: Bearer` हेडर में या तो JWT या `cak_…` API key स्वीकार करता है — कोई अलग केवल-key या केवल-OAuth रूट टेबल नहीं है। मॉड्यूल और उनके बेस पथ `Api/src/modules/*` के अंतर्गत हैं।

### API keys

एक `cak_<prefix>.<secret>` personal access token, जो **B1Admin → Settings → Developer → API Keys** में बनता है। केवल SHA-256 hash संग्रहीत होता है; कच्ची key एक बार दिखाई जाती है। `/membership/apiKeys` पर प्रबंधित (`Api/src/modules/membership/controllers/ApiKeyController.ts`)। किसी एक चर्च की अपनी स्क्रिप्ट्स और Zapier, Make, और Google Sheets जैसे कनेक्टरों के लिए सबसे अच्छा। → **[API Keys](../api/api-keys)**

### OAuth 2.0 & Connected Apps

मल्टी-टेनेंट ऐप्स के लिए जिन्हें हर चर्च की सहमति चाहिए। `/membership/oauth` के तहत `Api/src/modules/membership/controllers/OAuthController.ts` में लागू। सर्वर तीन grants सपोर्ट करता है:

- **Authorization Code** — `POST /oauth/authorize` (प्रमाणित) एक अल्पकालिक कोड लौटाता है; `grant_type=authorization_code` के साथ `POST /oauth/token` उसे एक access JWT (≈ 7 दिन) और एक refresh token (≈ 90 दिन) के लिए बदलता है। सार्वजनिक (secret-रहित) क्लाइंट्स को PKCE (केवल `S256`) उपयोग करना होता है: authorize पर `code_challenge` और token विनिमय पर मेल खाता `code_verifier`।
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` एक `user_code` जारी करता है; उपयोगकर्ता उसे B1Admin (`/oauth/device/approve`) में स्वीकृत करता है; डिवाइस device-code grant के साथ `/oauth/token` पर poll करता है। TVs, किओस्क, और ब्राउज़र-रहित CLIs के लिए।
- **Refresh Token** — `grant_type=refresh_token` एक नया access token बनाता है; सार्वजनिक (secret-रहित) क्लाइंट्स secret छोड़ सकते हैं।

सार्वजनिक क्लाइंट्स `POST /oauth/register` (RFC 7591 dynamic client registration) से खुद को भी पंजीकृत कर सकते हैं; उन्हें `client_id` मिलता है और कोई secret नहीं, और उनके redirect URIs `https` या loopback होने चाहिए।

**Connected App** किसी दी गई token का चर्च-प्रशासक-उन्मुख दृश्य है, जो `/membership/oauth/connections` पर सूचीबद्ध और रद्द करने योग्य है। कंट्रोलर एक OAuth **relay-session** ब्रिज (`/oauth/relay/*`) भी होस्ट करता है जो एक ब्राउज़र-रहित डिवाइस को *बाहरी* प्रदाता के विरुद्ध साइन-इन पूरा करने देता है। → **[Connected Apps & OAuth](../api/connected-apps)**

### Webhooks

केवल बाहर जाने वाली सतह। एक चर्च इवेंट्स के लिए एक सार्वजनिक HTTPS एंडपॉइंट सब्सक्राइब करता है; जब कोई मेल खाने वाला परिवर्तन होता है, तो `WebhookDispatcher.emit(churchId, event, payload)` केवल-id payloads को प्रदर्शन नामों (`personName`, `groupName`, `formName`) से समृद्ध करता है — ये लुकअप तभी चलते हैं जब कोई सब्सक्रिप्शन मेल खाए — एक डिलीवरी रिकॉर्ड करता है, और एक बैकग्राउंड वर्कर retry/backoff और पुनः-डिलीवरी के साथ एक हस्ताक्षरित JSON envelope POST करता है। इंजन `Api/src/shared/webhooks/` में है, प्रति-चर्च CRUD `/membership/webhooks` के तहत (`WebhookController.ts`)। एक `connectorType` फ़ील्ड Slack / Discord के लिए बॉडी का आकार बदलता है; `mailchimp` कनेक्टर इससे आगे जाता है और पूरी HTTP बातचीत स्वयं संभालता है (Mailchimp API के विरुद्ध प्रति-इवेंट method/URL/auth, `webhooks.connectorConfig` में एन्क्रिप्टेड क्रेडेंशियल)। → **[Webhooks](../api/webhooks)**

### MCP server

`/mcp` पर AI-उन्मुख रैपर (`Api/src/modules/mcp/`)। तीन सामान्य टूल — `list_endpoints`, `describe_endpoint`, `api_call` — किसी भी MCP क्लाइंट को पूरी REST सतह गतिशील रूप से दिखाते हैं। Auth वही bearer token है जो बाकी सब पर लागू होता है। OAuth से साइन इन करने वाले क्लाइंट्स (claude.ai कस्टम कनेक्टर्स) के लिए, `/mcp` से 401 एक `WWW-Authenticate` हेडर के साथ आता है जो `/.well-known/oauth-protected-resource` की ओर इशारा करता है, और `/.well-known/oauth-authorization-server` `/membership/oauth` एंडपॉइंट्स, dynamic registration, PKCE, और B1Admin `/oauth` सहमति पृष्ठ का विज्ञापन करता है (`WellKnownController.ts`, `OAuthMetadata.ts`)। `api_call` इन-प्रोसेस Express स्टैक में फिर से प्रवेश करता है, ताकि हर अनुमति और चर्च-स्कोपिंग नियम अब भी लागू रहें। → **[MCP Server](../api/mcp)**

### Content providers

इनबाउंड-सामग्री पथ, API के बजाय अलग पैकेज `Packages/content-providers` (`@churchapps/content-providers`) में। हर प्रदाता `IProvider` इंटरफ़ेस (`src/interfaces.ts`) लागू करता है — `browse`, `getPlaylist`, `getInstructions`, plus auth hooks — और `Map` रजिस्ट्री (`src/providers/registry.ts`) में स्वयं-पंजीकृत होता है। यहाँ **B1 OAuth client है**: एक प्रदाता `none`, `oauth_pkce`, `device_flow`, या `form_login` का `AuthType` घोषित करता है, और साझा हेल्पर (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) बाहरी स्रोत के विरुद्ध क्लाइंट-साइड PKCE / device flow चलाते हैं। आज ग्यारह प्रदाता शिप होते हैं — जिनमें Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, और B1.church शामिल हैं — जो FreePlay और B1 ऐप्स को सामग्री देते हैं। → **[FreePlay Content Provider](../freeplay-content-provider)**

**Year plans** इसी पथ पर चलते हैं। एक पाठ्यक्रम प्रकाशक (`lessons.edit` के साथ) Lessons.church एडमिन में क्रमबद्ध सप्ताह-1/2/3 अनुक्रम बनाए रखता है (`LessonsApi` टेबल `yearPlans` / `yearPlanWeeks`, वैकल्पिक `startMonth` और प्रति-सप्ताह `anchor` `easter` / `christmas` के साथ); LessonsApi पर `GET /yearPlans/public` लाइव योजनाएँ अनाम रूप से देता है, हर सप्ताह के program/study/venue को lesson tree से भरते हुए। B1Admin की **Serving → Plans → Schedule Lesson → Apply Year Plan** इस एंडपॉइंट का उपभोग करती है और शामिल हर सप्ताह के लिए एक DoingApi योजना लिखती है (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`)। `startMonth` वाली योजनाएँ चुने गए वर्ष के विरुद्ध anchored सप्ताह हल करती हैं (Easter Gregorian computus से, Christmas 25 दिसंबर को या उससे पहले का रविवार) और उनके बीच की श्रृंखलाएँ भरती हैं; `startMonth` के बिना योजनाएँ भी सप्ताह N को `startDate + (N−1)×7` दिनों पर मैप करती हैं। बाहरी OLF प्रदाताओं के सप्ताह या अधूरे पथ वाले सप्ताह apply के समय छोड़ दिए जाते हैं; चर्च परिणामी योजनाओं को किसी भी अन्य योजना की तरह संपादित करते हैं, और FreePlay वही चलाता है जो योजना पर हो।

## सारांश

| सतह | प्रमाणीकरण तंत्र | दिशा | कहाँ लागू | संदर्भ |
|---|---|---|---|---|
| REST API | `Bearer` JWT या `cak_…` key | इनबाउंड | `Api/src/modules/*` | [API Keys](../api/api-keys) |
| API keys | SHA-256-hashed `cak_` token | क्रेडेंशियल | `Api/.../membership/controllers/ApiKeyController.ts` | [API Keys](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Auth code (PKCE) · device · refresh → JWT; dynamic client registration | इनबाउंड | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | प्रति-hook secret, HMAC-SHA256 signature | आउटबाउंड | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP server | `Bearer` JWT, OAuth JWT (`/.well-known` से खोजा गया), या `cak_…` key | इनबाउंड (AI) | `Api/src/modules/mcp/` | [MCP Server](../api/mcp) |
| Content providers | प्रति-प्रदाता: none / OAuth PKCE / device / form | इनबाउंड सामग्री | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider) |

## प्रीबिल्ट कनेक्टर

हर किसी को शुरू से बनाने के बजाय, ChurchApps ऊपर की सतहों के आधार पर कनेक्टर शिप करता है:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — एक webhook `connectorType` मानक envelope को चैट संदेश में बदलता है; पूरी तरह B1Admin में कॉन्फ़िगर, किसी तीसरे-पक्ष खाते की ज़रूरत नहीं।
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — एक `mailchimp` connectorType जो लोगों को Mailchimp audience में सिंक करता है और समूह/सूची सदस्यता को टैग से मैप करता है (`Api/src/shared/webhooks/MailchimpConnector.ts`)। चैट कनेक्टरों के विपरीत यह चर्च-प्रदत्त URL पर POST करने के बजाय हर इवेंट (upsert/archive/tag) के लिए अपने प्रमाणित अनुरोध करता है; API key और audience id `webhooks.connectorConfig` में एन्क्रिप्टेड रहते हैं। एक-तरफ़ा, केवल मानक merge fields।
- **[Zapier](/docs/b1-admin/integrations/zapier)** और **[Make](/docs/b1-admin/integrations/make)** — webhook इवेंट्स पर ट्रिगर होते हैं और REST API के ज़रिए कार्य करते हैं; जब Zap/scenario चालू होता है तो वे अपना webhook स्वयं रजिस्टर करते हैं (इसके लिए `settings:write` वाली key चाहिए)। Zapier ऐप का सोर्स `Integrations` रिपॉज़िटरी में `zapier/` के अंतर्गत है (Zapier CLI, `zapier push` से डिप्लॉय)।
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — API-key-प्रमाणित ऐड-ऑन जो माँग पर People / Donations / Groups / Attendance निर्यात करता है।
- **[Claude](/docs/b1-admin/integrations/claude)** और **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — `/mcp` की ओर इशारा करने वाले MCP क्लाइंट।

अपने कोड के लिए, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) इस सब को लपेटता है: एक टाइप्ड REST क्लाइंट, एक OAuth क्लाइंट (auth-code / refresh / device flow), और Express मिडिलवेयर के साथ एक HMAC webhook verifier।

## संबंधित पृष्ठ

- [API Keys](../api/api-keys) — सबसे सरल क्रेडेंशियल और स्कोप सूची
- [Connected Apps & OAuth](../api/connected-apps) — मल्टी-टेनेंट सहमति प्रवाह
- [Webhooks](../api/webhooks) — बाहर जाने वाली इवेंट प्रणाली
- [MCP Server](../api/mcp) — AI इंटीग्रेशन रैपर
- [FreePlay Content Provider](../freeplay-content-provider) — इनबाउंड सामग्री स्रोत बनना
- [Integrations (end-user)](/docs/b1-admin/integrations/) — प्रीबिल्ट कनेक्टर सेटअप गाइड
