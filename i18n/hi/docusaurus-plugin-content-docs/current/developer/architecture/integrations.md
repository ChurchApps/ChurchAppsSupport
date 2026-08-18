---
title: "एकीकरण और एक्सटेंशन सतह"
---

# एकीकरण और एक्सटेंशन सतह

<div class="article-intro">

हर चीज़ जो एक तीसरी पार्टी प्लग इन कर सकता है वह एक API और एक प्राधिकरण मॉडल के माध्यम से चलता है। यह पृष्ठ नक्शा है: यह हर एकीकरण सतह का नाम देता है, वे कैसे जुड़ते हैं, और प्रत्येक के विस्तृत संदर्भ से जुड़ता है। यदि आप B1 के विरुद्ध निर्माण कर रहे हैं, तो यहाँ से शुरू करें सही दरवाजा चुनने के लिए, फिर उस पृष्ठ को अनुसरण करें जो इसे विस्तार में दस्तावेज करता है।

</div>

## एक नज़र में सतहें

छह रास्ते अंदर या बाहर हैं, और वे सभी एक ही प्राधिकरण परत साझा करते हैं:

- **[REST API](../api/api-keys)** — पूरी उत्पाद सतह, किसी भी भाषा से एक वाहक टोकन के साथ कॉल करने योग्य।
- **[API कुंजियां](../api/api-keys)** — सबसे सरल क्रेडेंशियल: एक `cak_…` टोकन एक व्यक्ति में एक चर्च तक बंधा हुआ।
- **[OAuth 2.0 और कनेक्टेड ऐप्स](../api/connected-apps)** — प्रति-चर्च सहमति बहु-किरायेदार ऐप्स के लिए; एक उपयोगकर्ता को प्राप्त होने वाले जैसे JWT जारी करता है।
- **[वेबहुक](../api/webhooks)** — हस्ताक्षरित, टिकाऊ रूप से वितरित आउटबाउंड घटनाएं।
- **[MCP सर्वर](../api/mcp)** — `/mcp` पर REST API के ऊपर एक AI-सामना करने वाला रैपर।
- **[सामग्री प्रदाता](../freeplay-content-provider)** — FreePlay और B1 ऐप्स में बाहरी मीडिया पुस्तकालयों के लिए आंतरिक पथ।

सामग्री प्रदाताओं को छोड़कर सब कुछ एक एकल monolithic API (the [Api](https://github.com/ChurchApps/Api) रिपॉजिटरी) द्वारा परिवेशित होता है जिसके मॉड्यूल स्थिर आधार पथ के तहत माउंट होते हैं — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` और `/mcp`।

## यह कैसे एक साथ फिट बैठता है

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  तीसरी पार्टी ऐप    │   वाहक cak_… / JWT    │              B1 API (Api)              │
   │  · सर्वर / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make    │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google शीट      │                          │  │   cak_ कुंजी ─┐                 │  │
   │  · CLI / स्क्रिप्ट │                          │  │   OAuth JWT ┴▶ प्रमुख           │  │
   │  · AI क्लाइंट (MCP)│ ─── POST /mcp ──────────▶ │  │   दायरे फ़िल्टर → अनुमतियां[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API मॉड्यूल: /membership /giving   │
             │        हस्ताक्षरित JSON POST           │  /attendance /content /messaging …   │
             │   (व्यक्ति / दान / समूह / …)         │                   │                    │
             └──────────── वेबहुक ◀─────────────────┼─ साझा/webhooks/WebhookDispatcher    │
                     (टिकाऊ, HMAC-SHA256 हस्ताक्षरित) └───────────────────────────────────────┘

   बाहरी सामग्री स्रोत (प्लानिंग सेंटर, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / डिवाइस प्रवाह / कोई नहीं  ──  B1 यहाँ OAuth *क्लाइंट* है  ──▶
             ▼
   पैकेज/सामग्री-प्रदाता   ──▶   FreePlay / B1 ऐप्स        (आंतरिक सामग्री पथ)
```

तीन तीर पूरी कहानी बताते हैं: एक तीसरी पार्टी एक वाहक टोकन (API कुंजी या OAuth JWT, `/mcp` के माध्यम से सहित) के साथ **कॉल** करता है; API **हस्ताक्षरित वेबहुक** के माध्यम से **बाहर कॉल** करता है; और सामग्री प्रदाता एक **आंतरिक-सामग्री** पथ हैं जहां B1 खुद ही OAuth *क्लाइंट* है जो एक बाहरी स्रोत से मीडिया खींच रहा है।

## साझा प्राधिकरण मॉडल

हर क्रेडेंशियल — एक उपयोगकर्ता की लॉगिन JWT, OAuth एक्सेस टोकन, या API कुंजी — एक ही **`Principal`** को हल करता है और एक ही तरीके से जांच की जाती है। कोई अलग "एकीकरण प्रमाणन" पथ नहीं है; एक दायरे वाली क्रेडेंशियल केवल एक निम्न-सुविधा प्राप्त उपयोगकर्ता से अप्रभेद्य है।

### JWT संरचना

B1 एक्सेस टोकन `Api/src/modules/membership/auth/AuthenticatedUser.ts` में टकसाल HS256 JWTs हैं। दावा सेट:

| दावा | अर्थ |
|---|---|
| `id`, `email`, `firstName`, `lastName` | टोकन के पीछे का व्यक्ति |
| `churchId` | एकल चर्च यह टोकन में काम करता है — सभी डेटा दायरे के लिए लंगर |
| `personId` | उस चर्च के भीतर व्यक्ति रिकॉर्ड |
| `permissions` | RBAC perm-स्ट्रिंग्स का फ्लैट सरणी (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | समूह सदस्यता / नेतृत्व, समूह-दायरे की जांच के लिए |
| `membershipStatus` | अतिथि बनाम। सदस्य, आत्म-सेवा gating के लिए |

एक OAuth एक्सेस टोकन लॉगिन JWT के बिल्कुल समान आकार है — एकमात्र अंतर यह है कि इसकी `permissions` सरणी स्वीकृत दायरों के माध्यम से **फ़िल्टर** की गई थी (`getCombinedApiJwt(...)`)।

### प्रति-चर्च दायरा

`churchId` एक टोकन दावा है, एक अनुरोध पैरामीटर नहीं, इसलिए क्रेडेंशियल चर्चों भर में कभी नहीं पहुंच सकता है। हर रिपॉजिटरी क्वेरी कॉलर के `churchId` पर फ़िल्टर करता है; एक API कुंजी या OAuth टोकन टकसाल समय पर बिल्कुल एक चर्च के लिए बंधा हुआ है।

### सीमा पर भूमिका-आधारित अनुमतियां

नियंत्रकों `au.checkAccess(contentType, action)` के साथ टोकन की `permissions` सरणी के विरुद्ध गेट कार्यों को `Api/src/shared/auth/Scopes.ts` के साथ। दायरे एक **फ़िल्टर, कभी नहीं अनुदान** (`filterPermissionsByScopes()`): `SCOPE_CATALOG` प्रत्येक दायरे को मैप करता है (जैसे `people:read`, `donations:write`) RBAC जोड़े के लिए जो वह अनुमति देता है, और `filterPermissionsByScopes()` को B1Admin में व्यक्ति की *वर्तमान* अनुमतियों के साथ हर समाधान पर प्रतिच्छेद करता है। परिणाम:

- B1Admin में एक अनुमति को रद्द करने से क्रेडेंशियल की पहुंच अगली अनुरोध पर काटता है — टोकन कभी भूमिका से दूर नहीं होता है।
- एक दायरा केवल अनुमति को *हटा* सकता है, इसलिए एक दायरे वाली क्रेडेंशियल सर्वर / डोमेन व्यवस्थापन में कभी नहीं बढ़ सकता है (वे अनुमतियां जानबूझकर किसी भी दायरे के लिए अमैप्ड हैं)।
- API कुंजियां `cak_` उपसर्ग ले जाती हैं; `CustomAuthProvider.getUser()` इसे शाखा करता है, हैश गोपनीयता को करता है, और हर कॉल पर मालिक व्यक्ति की लाइव RBAC को फिर से हल करता है।

[API कुंजियां → दायरे](../api/api-keys#scopes) के लिए पूरी सूची देखें।

## सतह संदर्भ

### REST API

पूरी उत्पाद सतह। कोई भी प्रमाणीकृत समापन बिंदु `Authorization: Bearer` शीर्षलेख में एक JWT या `cak_…` API कुंजी स्वीकार करता है — कोई अलग कुंजी-केवल या OAuth-केवल मार्ग तालिका नहीं। मॉड्यूल और उनके आधार पथ `Api/src/modules/*` के तहत रहते हैं।

### API कुंजियां

एक `cak_<prefix>.<secret>` व्यक्तिगत एक्सेस टोकन, **B1Admin → सेटिंग्स → डेवलपर → API कुंजियों** में बनाया गया। केवल SHA-256 हैश संग्रहीत होता है; कच्चा कुंजी एक बार दिखाया जाता है। `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`) पर प्रबंधित। एक एकल चर्च की अपनी स्क्रिप्ट और Zapier, Make और Google शीट जैसे कनेक्टर के लिए सर्वश्रेष्ठ। → **[API कुंजियां](../api/api-keys)**

### OAuth 2.0 और कनेक्टेड ऐप्स

बहु-किरायेदार ऐप्स के लिए जिन्हें प्रत्येक चर्च को सहमति की आवश्यकता है। `Api/src/modules/membership/controllers/OAuthController.ts` के तहत `/membership/oauth` में कार्यान्वित। सर्वर तीन अनुदान समर्थन करता है:

- **प्राधिकरण कोड** — `POST /oauth/authorize` (प्रमाणीकृत) एक अल्पकालिक कोड सौ करता है; `POST /oauth/token` साथ में `grant_type=authorization_code` इसे एक्सेस JWT (≈ 7 दिन) साथ में एक ताज़ी टोकन (≈ 90 दिन) के लिए विनिमय करता है।
- **डिवाइस कोड** (RFC 8628) — `POST /oauth/device/authorize` एक `user_code` जारी करता है; उपयोगकर्ता B1Admin में इसे अनुमोदन देता है (`/oauth/device/approve`); डिवाइस `/oauth/token` के लिए डिवाइस-कोड अनुदान के साथ पोल करता है। TVs, kiosks और CLIs के लिए कोई ब्राउजर नहीं।
- **ताज़ी टोकन** — `grant_type=refresh_token` एक नया एक्सेस टोकन टकसाल करता है; सार्वजनिक (गोपनीयता-less) क्लाइंट गोपनीयता को छोड़ सकते हैं।

एक **कनेक्टेड ऐप** चर्च-प्रशासक-सामना करने वाला दृश्य एक अनुदान किए गए टोकन का है, `/membership/oauth/connections` पर सूचीबद्ध और प्रतिसंहरण योग्य। नियंत्रक भी एक OAuth **रिले-सत्र** पुल (`/oauth/relay/*`) होस्ट करता है जो ब्राउजरलेस डिवाइस को एक *बाहरी* प्रदाता के विरुद्ध साइन-इन को पूरा करने देता है। → **[कनेक्टेड ऐप्स और OAuth](../api/connected-apps)**

### वेबहुक

एकमात्र आउटबाउंड सतह। एक चर्च घटनाओं के लिए एक सार्वजनिक HTTPS समापन बिंदु को सदस्य करता है; जब एक मिलान परिवर्तन होता है, तो `WebhookDispatcher.emit(churchId, event, payload)` id-केवल पेलोड को समृद्ध करता है मानव-पठनीय नाम (`personName`, `groupName`, `formName` — lookups केवल तभी चलते हैं जब एक सदस्यता मेल खाती है), एक वितरण रिकॉर्ड करता है, और एक पृष्ठभूमि कार्यकर्ता पुनः प्रयास/बैकऑफ और redelivery के साथ हस्ताक्षरित JSON लिफाफे को पोस्ट करता है। इंजन `Api/src/shared/webhooks/` पर, प्रति-चर्च CRUD `/membership/webhooks` (`WebhookController.ts`) के तहत। एक `connectorType` फ़ील्ड Slack / Discord के लिए शरीर को आकार देता है; `mailchimp` कनेक्टर आगे जाता है और पूरे HTTP विनिमय को स्वामित्व देता है (प्रति-घटना विधि/URL/auth Mailchimp API के विरुद्ध, गोपनीयता `webhooks.connectorConfig` में एन्क्रिप्ट)। → **[वेबहुक](../api/webhooks)**

### MCP सर्वर

एक AI-सामना करने वाला रैपर `/mcp` (`Api/src/modules/mcp/`) पर। तीन सामान्य उपकरण — `list_endpoints`, `describe_endpoint`, `api_call` — पूरी REST सतह को गतिशीलता से किसी भी MCP क्लाइंट को प्रकट करें। प्रमाणन वही वाहक टोकन है जैसे सब कुछ, और `api_call` सभी अनुमति और चर्च-दायरे नियम के साथ प्रक्रिया में Express स्टैक को फिर से दर्ज करता है अभी भी लागू होता है। → **[MCP सर्वर](../api/mcp)**

### सामग्री प्रदाता

आंतरिक-सामग्री पथ, अलग पैकेज `Packages/content-providers` (`@churchapps/content-providers`) में API के बजाय। प्रत्येक प्रदाता `IProvider` इंटरफेस (`src/interfaces.ts`) को कार्यान्वित करता है — `browse`, `getPlaylist`, `getInstructions`, साथ ही auth hooks — और खुद को `Map` रजिस्ट्री में पंजीकृत करता है (`src/providers/registry.ts`)। यहाँ **B1 OAuth क्लाइंट** है: एक प्रदाता `none`, `oauth_pkce`, `device_flow` या `form_login` की `AuthType` घोषित करता है, और साझा helpers (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) बाहरी स्रोत के विरुद्ध क्लाइंट-साइड PKCE / डिवाइस प्रवाह चलाते हैं। ग्यारह प्रदाता आज जहाज करते हैं — प्लानिंग सेंटर, Dropbox, Life.Church, CBN, BibleProject, Jesus फिल्म, Lessons.church, और B1.church सहित — FreePlay और B1 ऐप्स को feeding। → **[FreePlay सामग्री प्रदाता](../freeplay-content-provider)**

## सारांश

| सतह | प्रमाणन तंत्र | दिशा | कहां लागू किया गया | संदर्भ |
|---|---|---|---|---|
| REST API | `Bearer` JWT या `cak_…` कुंजी | आंतरिक | `Api/src/modules/*` | [API कुंजियां](../api/api-keys) |
| API कुंजियां | SHA-256-hashed `cak_` टोकन | क्रेडेंशियल | `Api/.../membership/controllers/ApiKeyController.ts` | [API कुंजियां](../api/api-keys) |
| OAuth 2.0 / कनेक्टेड ऐप्स | Auth कोड · डिवाइस · ताज़ी → JWT | आंतरिक | `Api/.../membership/controllers/OAuthController.ts` | [कनेक्टेड ऐप्स](../api/connected-apps) |
| वेबहुक | प्रति-hook गोपनीयता, HMAC-SHA256 हस्ताक्षर | आउटबाउंड | `Api/src/shared/webhooks/` + `WebhookController.ts` | [वेबहुक](../api/webhooks) |
| MCP सर्वर | `Bearer` JWT या `cak_…` कुंजी | आंतरिक (AI) | `Api/src/modules/mcp/` | [MCP सर्वर](../api/mcp) |
| सामग्री प्रदाता | प्रति-प्रदाता: कोई नहीं / OAuth PKCE / डिवाइस / फॉर्म | आंतरिक सामग्री | `Packages/content-providers/` | [सामग्री प्रदाता](../freeplay-content-provider) |

## पूर्व-निर्मित कनेक्टर

सब कुछ से शुरुआत करने के बजाय, ChurchApps ऊपर की सतहों पर कनेक्टर भेज देता है:

- **[Slack और Discord](/docs/b1-admin/integrations/slack-discord)** — एक webhook `connectorType` मानक लिफाफे को चैट संदेश में आकार देता है; B1Admin में पूरी तरह कॉन्फ़िगर किया गया, कोई तीसरी पार्टी खाता नहीं।
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — एक `mailchimp` connectorType जो लोगों को Mailchimp ऑडियंस में सिंक करता है और समूह/सूची सदस्यता को टैग करता है (`Api/src/shared/webhooks/MailchimpConnector.ts`)। चैट कनेक्टर के विपरीत यह चर्च-आपूर्ति URL को POST करने के बजाय प्रति घटना अपने प्रमाणीकृत अनुरोध जारी करता है (upsert/archive/tag); API कुंजी और ऑडियंस id `webhooks.connectorConfig` में एन्क्रिप्ट रहते हैं। एक-तरफा, मानक मर्ज क्षेत्र केवल।
- **[Zapier](/docs/b1-admin/integrations/zapier)** और **[Make](/docs/b1-admin/integrations/make)** — webhook घटनाओं पर ट्रिगर करें और REST API के माध्यम से अभिनय करें; वे अपने खुद के webhook को पंजीकृत करते हैं जब एक Zap/परिदृश्य चालू होता है (एक `settings:write` दायरे वाली कुंजी की जरूरत है)। Zapier ऐप का स्रोत `Integrations` रिपॉजिटरी के तहत `zapier/` में रहता है (Zapier CLI, `zapier push` के साथ तैनात)।
- **[Google शीट](/docs/b1-admin/integrations/google-sheets)** — एक API-कुंजी-प्रमाणीकृत ऐड-ऑन जो लोगों / दान / समूहों / उपस्थिति को मांग पर निर्यात करता है।
- **[Claude](/docs/b1-admin/integrations/claude)** और **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — MCP क्लाइंट `/mcp` पर इंगित करते हैं।

अपने खुद के कोड के लिए, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) यह सब लपेटता है: एक टाइप किया गया REST क्लाइंट, एक OAuth क्लाइंट (प्राधिकरण-कोड / ताज़ी / डिवाइस प्रवाह) और एक HMAC webhook सत्यापक Express मध्यस्थ के साथ।

## संबंधित पृष्ठ

- [API कुंजियां](../api/api-keys) — सरलतम क्रेडेंशियल और दायरे सूची
- [कनेक्टेड ऐप्स और OAuth](../api/connected-apps) — बहु-किरायेदार सहमति प्रवाह
- [वेबहुक](../api/webhooks) — आउटबाउंड घटना प्रणाली
- [MCP सर्वर](../api/mcp) — AI एकीकरण रैपर
- [FreePlay सामग्री प्रदाता](../freeplay-content-provider) — आंतरिक सामग्री स्रोत बनना
- [एकीकरण (अंत-उपयोगकर्ता)](/docs/b1-admin/integrations/) — पूर्व-निर्मित कनेक्टर सेटअप गाइड
