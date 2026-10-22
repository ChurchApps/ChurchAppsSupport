---
title: "इंटीग्रेशन और एक्सटेंशन सतह"
---

# इंटीग्रेशन और एक्सटेंशन सतह {#integration--extension-surface}

<div class="article-intro">

कोई भी तीसरा पक्ष जिस चीज़ से जुड़ सकता है, वह सब एक ही API और एक ही ऑथराइज़ेशन मॉडल से होकर गुज़रता है। यह पेज उस मानचित्र की तरह है: यह हर इंटीग्रेशन सतह का नाम बताता है, दिखाता है कि वे आपस में कैसे जुड़ती हैं, और हर एक के विस्तृत संदर्भ से लिंक करता है। अगर आप B1 के लिए कुछ बना रहे हैं, तो सही दरवाज़ा चुनने के लिए यहां से शुरू करें, फिर उस पेज का लिंक फॉलो करें जो उसे गहराई से समझाता है।

</div>

## एक नज़र में सतहें {#the-surfaces-at-a-glance}

अंदर या बाहर जाने के छह तरीके हैं, और ये सभी एक ही ऑथ लेयर साझा करते हैं:

- **[REST API](../api/api-keys)** — पूरी प्रोडक्ट सतह, जिसे किसी भी भाषा से bearer टोकन के साथ कॉल किया जा सकता है।
- **[API keys](../api/api-keys)** — सबसे सरल क्रेडेंशियल: एक `cak_…` टोकन जो एक चर्च में एक व्यक्ति से बंधा होता है।
- **[OAuth 2.0 & Connected Apps](../api/connected-apps)** — मल्टी-टेनेंट ऐप्स के लिए प्रति-चर्च सहमति; यह वही JWT जारी करता है जो कोई उपयोगकर्ता पाता है।
- **[Webhooks](../api/webhooks)** — हस्ताक्षरित और टिकाऊ रूप से डिलीवर होने वाली आउटबाउंड घटनाएं।
- **[MCP server](../api/mcp)** — `/mcp` पर REST API के ऊपर एक AI-उन्मुख रैपर।
- **[Content providers](../freeplay-content-provider)** — FreePlay और B1 ऐप्स में बाहरी मीडिया लाइब्रेरी के लिए इनबाउंड मार्ग।

Content providers को छोड़कर सब कुछ एक ही मोनोलिथिक API ([Api](https://github.com/ChurchApps/Api) रिपॉज़िटरी) से सेवा पाता है, जिसके मॉड्यूल स्थिर बेस पाथ के अंतर्गत माउंट होते हैं — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, और `/mcp`।

## यह कैसे एक साथ जुड़ता है {#how-it-fits-together}

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

तीन तीर पूरी कहानी बताते हैं: एक तीसरा पक्ष बेयरर टोकन (API key या OAuth JWT, `/mcp` के माध्यम से भी) के साथ **अंदर कॉल** करता है; API साइन किए गए webhooks के माध्यम से **बाहर कॉल** करता है; और कॉन्टेंट प्रोवाइडर वह एकमात्र **इनबाउंड-कॉन्टेंट** मार्ग है, जहां B1 स्वयं एक OAuth *क्लाइंट* है और बाहरी स्रोत से मीडिया खींचता है।

## साझा ऑथ मॉडल {#the-shared-auth-model}

हर क्रेडेंशियल — उपयोगकर्ता का लॉगिन JWT, OAuth एक्सेस टोकन, या API key — **एक ही `Principal`** पर resolve होता है और उसी तरह जांचा जाता है। कोई अलग "इंटीग्रेशन ऑथ" पाथ नहीं है; स्कोप्ड क्रेडेंशियल कम-विशेषाधिकार वाले उपयोगकर्ता से अलग नहीं दिखता।

### JWT संरचना {#jwt-structure}

B1 एक्सेस टोकन `Api/src/modules/membership/auth/AuthenticatedUser.ts` में बनाए गए HS256 JWT होते हैं। क्लेम सेट इस प्रकार है:

| क्लेम | अर्थ |
|---|---|
| `id`, `email`, `firstName`, `lastName` | टोकन के पीछे का व्यक्ति |
| `churchId` | वह एकल चर्च जिसके भीतर यह टोकन कार्य करता है — सभी डेटा स्कोपिंग का आधार |
| `personId` | उस चर्च के भीतर व्यक्ति रिकॉर्ड |
| `permissions` | RBAC perm-strings की फ्लैट सूची (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | समूह सदस्यता / नेतृत्व, समूह-स्कोप्ड जांचों के लिए |
| `membershipStatus` | सेल्फ-सर्विस गेटिंग के लिए गेस्ट बनाम सदस्य |

OAuth एक्सेस टोकन लॉगिन JWT के बिल्कुल समान आकार का होता है — अंतर केवल इतना है कि उसका `permissions` ऐरे साइन करने से **पहले दिए गए स्कोप्स से फ़िल्टर** किया जाता है (`getCombinedApiJwt(...)`)।

### प्रति-चर्च स्कोपिंग {#per-church-scoping}

`churchId` एक टोकन क्लेम है, अनुरोध पैरामीटर नहीं, इसलिए कोई भी क्रेडेंशियल दूसरे चर्चों तक नहीं पहुंच सकता। हर रिपॉज़िटरी क्वेरी कॉलर के `churchId` पर फ़िल्टर करती है; API key या OAuth टोकन मिंट होने के समय ठीक एक चर्च से बंधा होता है।

### सीमा पर भूमिका-आधारित अनुमतियां {#role-based-permissions-at-the-boundary}

कंट्रोलर `au.checkAccess(contentType, action)` के माध्यम से टोकन के `permissions` ऐरे के विरुद्ध क्रियाओं को गेट करते हैं। स्कोप्स एक **फ़िल्टर हैं, कभी अनुदान नहीं** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` हर स्कोप (जैसे `people:read`, `donations:write`) को उन RBAC जोड़ियों से मैप करता है जिन्हें वह अनुमति देता है, और `filterPermissionsByScopes()` हर resolve पर उसे व्यक्ति की *वर्तमान* अनुमतियों के साथ intersect करता है। इसके परिणाम:

- B1Admin में अनुमति रद्द करने से अगले अनुरोध पर क्रेडेंशियल की पहुंच कट जाती है — टोकन कभी भी भूमिका से विचलित नहीं होते।
- स्कोप केवल अनुमतियां *हटा* सकता है, इसलिए स्कोप्ड क्रेडेंशियल कभी भी सर्वर / डोमेन एडमिनिस्ट्रेशन तक नहीं पहुंच सकता (वे अनुमतियां जानबूझकर किसी भी स्कोप से मैप नहीं की गई हैं)।
- API keys में `cak_` प्रीफ़िक्स होता है; `CustomAuthProvider.getUser()` उसी पर शाखा बनाता है, सीक्रेट को हैश करता है, और हर कॉल पर मालिक व्यक्ति की लाइव RBAC को फिर से resolve करता है।

पूरी कैटलॉग के लिए [API Keys → Scopes](../api/api-keys#scopes) देखें।

## सतह संदर्भ {#surface-reference}

### REST API {#rest-api}

पूरी प्रोडक्ट सतह। कोई भी प्रमाणित एंडपॉइंट `Authorization: Bearer` हेडर में JWT या `cak_…` API key स्वीकार करता है — केवल-key या केवल-OAuth के लिए कोई अलग रूट टेबल नहीं है। मॉड्यूल और उनके बेस पाथ `Api/src/modules/*` के अंतर्गत हैं।

### API keys {#api-keys}

एक `cak_<prefix>.<secret>` पर्सनल एक्सेस टोकन, जो **B1Admin → Settings → Developer → API Keys** में बनाया जाता है। केवल SHA-256 हैश संग्रहीत होता है; कच्ची key एक बार दिखाई जाती है। इसका प्रबंधन `/membership/apiKeys` पर होता है (`Api/src/modules/membership/controllers/ApiKeyController.ts`)। एक चर्च की अपनी स्क्रिप्ट्स और Zapier, Make, तथा Google Sheets जैसे कनेक्टरों के लिए सबसे उपयुक्त। → **[API Keys](../api/api-keys)**

### OAuth 2.0 और Connected Apps {#oauth-20--connected-apps}

मल्टी-टेनेंट ऐप्स के लिए, जिन्हें हर चर्च की सहमति चाहिए। यह `/membership/oauth` के अंतर्गत `Api/src/modules/membership/controllers/OAuthController.ts` में लागू है। सर्वर तीन ग्रांट्स समर्थित करता है:

- **Authorization Code** — `POST /oauth/authorize` (प्रमाणित) एक अल्पकालिक कोड लौटाता है; `grant_type=authorization_code` के साथ `POST /oauth/token` उसे एक्सेस JWT (≈ 7 दिन) और रिफ्रेश टोकन (≈ 90 दिन) में बदलता है। पब्लिक (बिना सीक्रेट वाले) क्लाइंट्स को PKCE (केवल `S256`) इस्तेमाल करना होगा: authorize पर `code_challenge` और token एक्सचेंज पर मेल खाता `code_verifier`।
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` एक `user_code` जारी करता है; उपयोगकर्ता उसे B1Admin (`/oauth/device/approve`) में स्वीकृत करता है; डिवाइस device-code ग्रांट के साथ `/oauth/token` को पोल करता है। बिना ब्राउज़र वाले TV, किओस्क और CLI के लिए।
- **Refresh Token** — `grant_type=refresh_token` एक नया एक्सेस टोकन मिंट करता है; पब्लिक (बिना सीक्रेट वाले) क्लाइंट सीक्रेट छोड़ सकते हैं।

पब्लिक क्लाइंट `POST /oauth/register` के साथ खुद को भी रजिस्टर कर सकते हैं (RFC 7591 डायनामिक क्लाइंट रजिस्ट्रेशन); उन्हें `client_id` मिलता है और कोई सीक्रेट नहीं, और उनके redirect URIs `https` या loopback होने चाहिए।

**Connected App** दिए गए टोकन का चर्च-एडमिन के लिए दृश्य है, जो `/membership/oauth/connections` पर सूचीबद्ध और रद्द करने योग्य है। कंट्रोलर एक OAuth **relay-session** ब्रिज (`/oauth/relay/*`) भी होस्ट करता है, जो ब्राउज़र-रहित डिवाइस को *बाहरी* प्रदाता के विरुद्ध साइन-इन पूरा करने देता है। → **[Connected Apps & OAuth](../api/connected-apps)**

### Webhooks {#webhooks}

यही एकमात्र आउटबाउंड सतह है। एक चर्च एक सार्वजनिक HTTPS एंडपॉइंट को इवेंट्स की सदस्यता देता है; जब कोई मेल खाने वाला बदलाव होता है, तो `WebhookDispatcher.emit(churchId, event, payload)` केवल-ID पेलोड को डिस्प्ले नामों (`personName`, `groupName`, `formName`; ये लुकअप केवल तभी चलते हैं जब कोई सब्सक्रिप्शन मेल खाए) से समृद्ध करता है, एक डिलीवरी रिकॉर्ड करता है, और एक बैकग्राउंड वर्कर retry/backoff और रीडिलीवरी के साथ एक हस्ताक्षरित JSON envelope POST करता है। इंजन `Api/src/shared/webhooks/` में है, और प्रति-चर्च CRUD `/membership/webhooks` (`WebhookController.ts`) के अंतर्गत है। `connectorType` फ़ील्ड Slack और Discord के लिए body का आकार बदलता है; `mailchimp` कनेक्टर इससे आगे जाता है और पूरा HTTP एक्सचेंज स्वयं संभालता है (Mailchimp के API के विरुद्ध हर इवेंट के लिए method/URL/auth, और credentials `webhooks.connectorConfig` में एन्क्रिप्टेड)। → **[Webhooks](../api/webhooks)**

### MCP server {#mcp-server}

`/mcp` पर AI-उन्मुख रैपर (`Api/src/modules/mcp/`)। तीन जेनेरिक टूल — `list_endpoints`, `describe_endpoint`, `api_call` — किसी भी MCP क्लाइंट को पूरी REST सतह गतिशील रूप से उपलब्ध कराते हैं। ऑथ वही बेयरर टोकन है जो बाकी सब पर लागू होता है। OAuth से साइन इन करने वाले क्लाइंट (claude.ai कस्टम कनेक्टर) के लिए, `/mcp` से आने वाले 401 में एक `WWW-Authenticate` हेडर होता है जो `/.well-known/oauth-protected-resource` की ओर इशारा करता है, और `/.well-known/oauth-authorization-server` `/membership/oauth` एंडपॉइंट्स, डायनामिक रजिस्ट्रेशन, PKCE, और B1Admin के `/oauth` सहमति पेज का विज्ञापन करता है (`WellKnownController.ts`, `OAuthMetadata.ts`)। `api_call` प्रक्रिया के भीतर ही Express स्टैक में फिर से प्रवेश करता है, ताकि हर अनुमति और चर्च-स्कोपिंग नियम अब भी लागू हों। → **[MCP Server](../api/mcp)**

### Content providers {#content-providers}

इनबाउंड-कॉन्टेंट मार्ग API में नहीं, बल्कि अलग पैकेज `Packages/content-providers` (`@churchapps/content-providers`) में है। हर प्रोवाइडर `IProvider` इंटरफ़ेस (`src/interfaces.ts`) लागू करता है — `browse`, `getPlaylist`, `getInstructions`, साथ ही ऑथ हुक — और एक `Map` रजिस्ट्री (`src/providers/registry.ts`) में स्वयं को रजिस्टर करता है। यहां **B1 OAuth क्लाइंट है**: प्रोवाइडर एक `AuthType` घोषित करता है — `none`, `oauth_pkce`, `device_flow`, या `form_login` — और साझा हेल्पर्स (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) बाहरी स्रोत के विरुद्ध क्लाइंट-साइड PKCE या डिवाइस फ़्लो चलाते हैं। आज ग्यारह प्रोवाइडर उपलब्ध हैं — जिनमें Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, और B1.church शामिल हैं — जो FreePlay और B1 ऐप्स को कॉन्टेंट देते हैं। → **[FreePlay Content Provider](../freeplay-content-provider)**

**Year plans** (वर्ष योजनाएं) इसी मार्ग पर चलती हैं। एक पाठ्यक्रम प्रकाशक (जिसके पास `lessons.edit` है) Lessons.church एडमिन में क्रमबद्ध week-1/2/3 अनुक्रम बनाए रखता है (`LessonsApi` टेबल `yearPlans` / `yearPlanWeeks`, वैकल्पिक `startMonth`, और प्रति-सप्ताह `anchor` जिसका मान `easter` या `christmas` हो सकता है)। LessonsApi पर `GET /yearPlans/public` लाइव योजनाएं बिना ऑथ के देता है, और हर सप्ताह का program/study/venue lesson tree से भरता है। B1Admin का **Serving → Plans → Schedule Lesson → Apply Year Plan** इस एंडपॉइंट का उपयोग करता है और शामिल हर सप्ताह के लिए एक DoingApi योजना लिखता है (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`)। `startMonth` वाली योजनाएं चुने गए वर्ष के आधार पर anchored सप्ताह resolve करती हैं (Easter Gregorian computus से, और Christmas 25 दिसंबर को या उससे पहले का रविवार) और उनके बीच के रन भरती हैं; `startMonth` के बिना योजनाएं भी सप्ताह N को `startDate + (N−1)×7` दिनों से मैप करती हैं। बाहरी OLF प्रोवाइडर के सप्ताह, या अधूरे पाथ वाले सप्ताह, apply के समय छोड़ दिए जाते हैं; चर्च परिणामी योजनाओं को किसी भी अन्य योजना की तरह संपादित करते हैं, और FreePlay योजना पर जो भी है वही चलाता है।

## सारांश {#summary}

| सतह | ऑथ तंत्र | दिशा | कहां लागू | संदर्भ |
|---|---|---|---|---|
| REST API | `Bearer` JWT या `cak_…` key | इनबाउंड | `Api/src/modules/*` | [API Keys](../api/api-keys) |
| API keys | SHA-256-हैश्ड `cak_` टोकन | क्रेडेंशियल | `Api/.../membership/controllers/ApiKeyController.ts` | [API Keys](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Auth कोड (PKCE) · device · refresh → JWT; डायनामिक क्लाइंट रजिस्ट्रेशन | इनबाउंड | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | प्रति-हुक सीक्रेट, HMAC-SHA256 सिग्नेचर | आउटबाउंड | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| MCP server | `Bearer` JWT, OAuth JWT (`/.well-known` से खोजा गया), या `cak_…` key | इनबाउंड (AI) | `Api/src/modules/mcp/` | [MCP Server](../api/mcp) |
| Content providers | प्रति-प्रोवाइडर: none / OAuth PKCE / device / form | इनबाउंड कॉन्टेंट | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider) |

## तैयार कनेक्टर {#prebuilt-connectors}

हर किसी को शून्य से बनाने के बजाय, ChurchApps ऊपर दी गई सतहों के ऊपर कनेक्टर उपलब्ध कराता है:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — एक webhook `connectorType` मानक envelope को चैट संदेश में बदलता है; पूरी तरह B1Admin में कॉन्फ़िगर होता है, किसी तीसरे-पक्ष खाते की आवश्यकता नहीं।
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — एक `mailchimp` connectorType जो लोगों को Mailchimp audience में सिंक करता है और समूह/सूची सदस्यता को टैग से मैप करता है (`Api/src/shared/webhooks/MailchimpConnector.ts`)। चैट कनेक्टर्स के विपरीत, यह चर्च-प्रदत्त URL पर POST करने के बजाय हर इवेंट के लिए अपने प्रमाणित अनुरोध (upsert/archive/tag) स्वयं करता है; API key और audience id `webhooks.connectorConfig` में एन्क्रिप्टेड रहते हैं। यह एक-तरफ़ा है और केवल मानक merge fields का उपयोग करता है।
- **[Zapier](/docs/b1-admin/integrations/zapier)** और **[Make](/docs/b1-admin/integrations/make)** — webhook इवेंट्स पर ट्रिगर होते हैं और REST API के माध्यम से कार्य करते हैं; जब कोई Zap या scenario चालू होता है तो वे अपना webhook स्वयं रजिस्टर करते हैं (इसके लिए `settings:write` वाली key चाहिए)। Zapier ऐप का स्रोत `Integrations` रिपॉज़िटरी में `zapier/` के अंतर्गत है (Zapier CLI, `zapier push` से डिप्लॉय होता है)।
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — एक API-key-प्रमाणित ऐड-ऑन जो मांग पर People / Donations / Groups / Attendance एक्सपोर्ट करता है।
- **[Claude](/docs/b1-admin/integrations/claude)** और **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — `/mcp` की ओर इशारा करने वाले MCP क्लाइंट।

अपने कोड के लिए, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) इन सबको एक जगह लपेटता है: एक टाइप्ड REST क्लाइंट, एक OAuth क्लाइंट (auth-code / refresh / device flow), और Express middleware के साथ एक HMAC webhook verifier।

## संबंधित पेज {#related-pages}

- [API Keys](../api/api-keys) — सबसे सरल क्रेडेंशियल और स्कोप कैटलॉग
- [Connected Apps & OAuth](../api/connected-apps) — मल्टी-टेनेंट सहमति प्रवाह
- [Webhooks](../api/webhooks) — आउटबाउंड इवेंट सिस्टम
- [MCP Server](../api/mcp) — AI इंटीग्रेशन रैपर
- [FreePlay Content Provider](../freeplay-content-provider) — इनबाउंड कॉन्टेंट स्रोत बनना
- [Integrations (end-user)](/docs/b1-admin/integrations/) — प्रीबिल्ट कनेक्टर सेटअप गाइड
