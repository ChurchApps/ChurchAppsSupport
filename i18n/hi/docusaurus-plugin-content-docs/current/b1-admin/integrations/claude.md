---
title: "Claude"
---

# Claude

<div class="article-intro">

Claude से अपने चर्च के बारे में सरल भाषा में पूछें, और वह आपके B1 डेटा से जवाब देगा। जैसे *"रविवार को कितने पहली बार आने वाले मेहमान आए?"* या *"इस महीने कौन किसी स्मॉल ग्रुप में शामिल हुआ?"* — या उसे कुछ करने को कहें, जैसे *"हमारी वेबसाइट पर Events नाम का नया पेज जोड़ो।"* सेटअप में 3 मिनट से कम लगते हैं और इसके लिए किसी तकनीकी कौशल या सॉफ़्टवेयर इंस्टॉल की ज़रूरत नहीं है।

</div>

<div class="prereqs">
<h4>आपको क्या चाहिए</h4>

- **एक Claude खाता।** **मुफ़्त प्लान चलता है** — इसे आज़माने का अच्छा तरीका है। मुफ़्त खातों में दैनिक संदेश सीमा होती है, और B1 में जानकारी खोजने में संदेश जल्दी खर्च होते हैं, इसलिए अगर आप इसे नियमित रूप से इस्तेमाल करते हैं तो हम **Claude Pro** (लगभग $20/माह) की सलाह देते हैं।
- **आपका B1 लॉगिन** — वही जो आप B1 Admin के लिए उपयोग करते हैं।

</div>

:::tip सुझाया गया — आज़माने के लिए मुफ़्त
Claude B1 को AI से जोड़ने का सबसे आसान तरीका है, और यह Claude के **मुफ़्त प्लान** पर काम करता है — किसी भी चीज़ के लिए पैसे देने से पहले अपने चर्च के लिए इसे आज़माने का एक बढ़िया तरीका।
:::

जोड़ने के दो तरीके हैं। **विकल्प 1 सबसे आसान है** — इसमें कोई key नहीं चाहिए और कुछ इंस्टॉल नहीं करना होता।

## विकल्प 1 — B1 से साइन इन करें (सबसे आसान)

यह Claude वेबसाइट, Claude डेस्कटॉप ऐप और Claude फ़ोन ऐप पर काम करता है — एक बार सेट करें और यह सभी पर उपलब्ध हो जाएगा।

### चरण 1 — Claude की connector सेटिंग्स खोलें

1. [claude.ai](https://claude.ai) पर जाएँ और साइन इन करें (या मुफ़्त खाता बनाएँ)।
2. नीचे-बाईं ओर अपने नाम पर क्लिक करें, फिर **Settings** → **Connectors** चुनें।

### चरण 2 — B1 जोड़ें

1. **Add** पर क्लिक करें, फिर **Add custom connector** चुनें।
2. **Name:** में `B1` लिखें।
3. **URL:** में `https://api.churchapps.org/mcp` पेस्ट करें।
4. बाकी विकल्प जैसे हैं वैसे ही छोड़ दें और **Add** पर क्लिक करें।

### चरण 3 — B1 में साइन इन करें

1. **Connect** पर क्लिक करें। B1 का साइन-इन पेज खुलेगा।
2. अपने B1 खाते से लॉग इन करें। अगर आप एक से अधिक चर्च से जुड़े हैं, तो जाँच लें कि ऊपर सही चर्च दिख रहा है।
3. B1 बताएगा कि Claude क्या करने की अनुमति माँग रहा है, और पुष्टि करेगा कि आपको **claude.ai** पर वापस भेजा जाएगा। **Allow** पर क्लिक करें।

आप वापस Claude में आ जाएँगे, और B1 connected दिखेगा।

### चरण 4 — कुछ पूछें

एक **नई chat** शुरू करें और यह आज़माएँ:

- *"हमारे चर्च में कितने लोग हैं?"*
- *"हमारे सक्रिय ग्रुप की सूची दो।"*
- *"इस महीने की giving का fund के अनुसार सारांश दो।"*
- *"पिछले 30 दिनों में चर्च में कौन शामिल हुआ?"*

पहली बार में, Claude B1 इस्तेमाल करने की अनुमति माँगेगा — **Allow** पर क्लिक करें।

## विकल्प 2 — B1 key के साथ डेस्कटॉप एक्सटेंशन

इसका उपयोग तब करें जब आप Claude को सीमित अनुमतियों वाली key देना चाहें (उदाहरण के लिए, केवल देखने की अनुमति)। यह Mac या Windows के लिए Claude डेस्कटॉप ऐप में काम करता है, और key बनाने के लिए आपको B1 में चर्च सेटिंग्स प्रबंधित करने की अनुमति चाहिए।

### चरण 1 — Claude ऐप प्राप्त करें

[claude.com/download](https://claude.com/download) से Claude ऐप डाउनलोड करें, इंस्टॉल करें, खोलें और साइन इन करें।

### चरण 2 — अपनी B1 key बनाएँ

Key वह चीज़ है जो Claude को *आपके* चर्च के B1 में प्रवेश देती है — इसे Claude के लिए अलग से बने पासवर्ड की तरह समझें।

1. [B1 Admin](https://admin.b1.church) में लॉग इन करें और [Settings → Developer](https://admin.b1.church/settings/developer) पर जाएँ।
2. **API Keys** टैब पर **New API Key** पर क्लिक करें।
3. **Name:** में `Claude` लिखें।
4. **Scopes:** चुनें कि Claude क्या कर सकता है। हर क्षेत्र में एक **read** बॉक्स (केवल देखना) और एक **write** बॉक्स (बदलाव करना) होता है। पक्का नहीं? शुरुआत में केवल **read** बॉक्स चुनें — बाद में अधिक अनुमतियों वाली नई key बना सकते हैं।
5. **Save** पर क्लिक करें, फिर key को **Copy** करें। यह केवल एक बार दिखती है, इसलिए सीधे चरण 3 पर जाएँ।

### चरण 3 — Claude में B1 जोड़ें

1. [B1 एक्सटेंशन डाउनलोड करें](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb)।
2. डाउनलोड की गई फ़ाइल (`b1-churchapps.mcpb`) पर **डबल-क्लिक** करें। Claude खुलेगा और **B1 (ChurchApps)** दिखाएगा।
3. **Install** पर क्लिक करें।
4. जब यह आपकी **B1 API key** माँगे, तो चरण 2 की key पेस्ट करके सेव करें।
5. **Claude को पूरी तरह बंद करें** (Mac: **Cmd+Q** · Windows: टास्कबार में Claude आइकन पर राइट-क्लिक करें → **Quit**) और उसे फिर से खोलें।

अगर डबल-क्लिक से Claude नहीं खुलता, तो Claude में **Settings → Extensions → Advanced settings → Install Extension…** पर जाएँ और डाउनलोड की गई फ़ाइल चुनें। फिर एक नई chat शुरू करें और कुछ पूछें।

## क्या यह सुरक्षित है?

- Claude केवल **आपके चर्च** का डेटा देख सकता है।
- **साइन इन करके (विकल्प 1):** Claude अपने B1 लॉगिन से ज़्यादा कुछ नहीं कर सकता। **Allow** पर क्लिक करने से पहले B1 का साइन-इन पेज बताता है कि Claude क्या-क्या कर सकता है।
- **key के साथ (विकल्प 2):** Claude केवल वही कर सकता है जो key अनुमति देती है — जिस key में केवल **read** बॉक्स चुने गए हों, वह केवल देख सकती है, कोई बदलाव नहीं कर सकती।
- **इसे बंद करने के लिए:** B1 Admin में **Settings → Developer** पर जाएँ और **Connected Apps** (विकल्प 1) के तहत ऐप रद्द करें, या **API Keys** (विकल्प 2) के तहत key हटाएँ। पहुँच तुरंत बंद हो जाएगी। आप Claude में B1 connector पर **Disconnect** पर क्लिक करके भी ऐसा कर सकते हैं।

## इसकी लागत कितनी है?

B1 कनेक्शन मुफ़्त है — यह ChurchApps का हिस्सा है। Claude का अपना मुफ़्त प्लान है; Claude Pro (लगभग $20/माह) में इस्तेमाल की सीमा कहीं ज़्यादा है। देखें [claude.com/pricing](https://claude.com/pricing)।

## तकनीकी विवरण

इस पेज का बाकी हिस्सा तकनीकी उपयोगकर्ताओं और AI सहायकों के लिए है: scopes, कनेक्ट करने के अन्य तरीके, और यह कैसे काम करता है।

### Scopes

Claude, B1 API में बने **Model Context Protocol (MCP) server** (`https://api.churchapps.org/mcp`) के माध्यम से B1 से बात करता है। हर कॉल उसी auth, अनुमति और चर्च-स्कोपिंग नियमों से गुजरती है जिनसे B1 Admin का अनुरोध गुजरता है। Claude API key की **permissions और scopes** तक सीमित रहता है, और webhooks, OAuth admin endpoints या केवल-operator वाले अन्य रास्तों तक नहीं पहुँच सकता।

सामान्य शुरुआती scope सेट:

- **केवल-पढ़ने वाला सहायक:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **पढ़ना + नोट / टास्क जोड़ना:** `people:write` जोड़ें
- **पूर्ण संचालन सहायक:** जो `:write` scopes चाहिए, वे जोड़ें

`donations:read` key Claude को giving का सारांश देने देती है, लेकिन कोई gift दर्ज नहीं कर सकती। `people:write` key किसी व्यक्ति को जोड़ सकती है, लेकिन donations नहीं देख सकती। हर scope क्या अनुमति देता है, यह जानने के लिए [API Keys](/docs/developer/api/api-keys) देखें।

### कनेक्ट करने के अन्य तरीके

#### Claude Code (CLI)

एक टर्मिनल में:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

बस इतना ही। किसी भी Claude Code session में `/mcp` टाइप करके पुष्टि करें कि `b1` server connected है, फिर अपने चर्च के बारे में कोई भी सवाल पूछें।

#### Claude Desktop — मैनुअल कॉन्फ़िग (उन्नत)

अगर आप एक्सटेंशन इस्तेमाल नहीं करना चाहते, तो Claude Desktop की config फ़ाइल संपादित करें:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

एक `b1` server entry जोड़ें जो `mcp-remote` के माध्यम से B1 से जुड़े (इसके लिए [Node.js](https://nodejs.org) चाहिए):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Claude Desktop को फिर से शुरू करें। chat composer के connector मेनू में `b1` अपने tools के साथ दिखेगा।

#### Claude.ai (वेब) — कस्टम Connector

ऊपर **विकल्प 1** देखें। यह connector OAuth 2.1 इस्तेमाल करता है: Claude `https://api.churchapps.org/.well-known/oauth-protected-resource` से B1 का authorization server खोजता है, Dynamic Client Registration से खुद को रजिस्टर करता है, और PKCE के साथ साइन इन करता है। Team और Enterprise plans पर, किसी owner को पहले organization के लिए connector जोड़ना पड़ सकता है। Claude कोई विशेष scopes नहीं माँगता, इसलिए consent पेज पर वह सब दिखता है जो साइन इन किया हुआ B1 खाता एक्सेस कर सकता है। इसे B1 Admin में **Settings → Developer → Connected Apps** के तहत रद्द करें।

### यह कैसे काम करता है

B1 API एक ही MCP endpoint `/mcp` पर उपलब्ध कराता है। Claude इससे जुड़ता है, आपकी `cak_…` key से प्रमाणित होता है, और चार tools तक पहुँच पाता है:

| Tool | यह क्या करता है |
|---|---|
| `list_endpoints` | फ़िल्टर किए जा सकने वाले REST endpoints की सूची देता है, path के अनुसार। खोज के लिए उपयोग होता है। |
| `describe_endpoint` | किसी विशिष्ट endpoint का छोटा सारांश और एक उदाहरण request/response लौटाता है। |
| `api_call` | प्रमाणित उपयोगकर्ता के रूप में वास्तव में एक REST endpoint को कॉल करता है। |
| `describe_page_builder` | आपकी चर्च वेबसाइट के पेज बनाने और संपादित करने का गाइड, जिसे Claude वेबसाइट सामग्री पर काम करने से पहले पढ़ता है। |

यह वही `/membership/people`, `/giving/donations`, `/attendance/visits` आदि surface है जिसका उपयोग आपका B1Admin करता है — हर authorization नियम उसी तरह लागू होता है।

### सुरक्षा और सीमाएँ

- **हर चर्च अलग रहता है।** API key एक ही चर्च से जुड़ी होती है। Claude के पास दूसरे चर्चों का डेटा देखने का कोई रास्ता नहीं है।
- **अनुमति-सीमित।** अगर B1Admin में key बनाने वाले व्यक्ति से कोई अनुमति हटा दी जाए, तो Claude अगली कॉल पर ही वह अनुमति खो देता है।
- **रद्द करने योग्य।** **Settings → Developer → API Keys** में key हटाएँ, और Claude की पहुँच तुरंत खत्म हो जाएगी।
- **Blocklist।** Provider webhooks, OAuth client admin endpoints और केवल-operator वाला `apiEmails` route MCP से कॉल नहीं किए जा सकते।
- **Response का आकार सीमित।** एक tool response 64 KB तक सीमित है, ताकि लंबी सूचियाँ Claude के context को न भर दें — ऐसा होने पर Claude filters से query को संकीर्ण कर देगा।
- **Audit trail।** बदलाव उसी audit log से गुजरते हैं जिससे B1Admin की क्रियाएँ जाती हैं; आप इन्हें **Settings → Audit Log** में देख सकते हैं।

### समस्या निवारण

**Claude "Unauthorized" या 401 बताता है:** bearer token गायब है, गलत है, या key रद्द हो चुकी है। अगर आपने एक्सटेंशन इस्तेमाल किया है, तो Claude में **Settings → Extensions → B1 (ChurchApps)** खोलें और key फिर से पेस्ट करें। अन्यथा `Authorization: Bearer cak_…` header की जाँच करें (space और शाब्दिक `Bearer` पर ध्यान दें)।

**कोई tool call 403 लौटाता है:** API key में उस endpoint के लिए scope नहीं है। **Settings → Developer → API Keys** में scope जोड़ें (आपको नई key बनानी होगी — scopes को सीधे नहीं बदला जा सकता) और नई key को एक्सटेंशन की सेटिंग्स या Claude की config में पेस्ट करें।

**Claude को कोई endpoint नहीं मिलता:** उससे किसी filter के साथ `list_endpoints` कॉल करने को कहें, जैसे *"filter 'donations' के साथ list_endpoints का उपयोग करके सही path खोजो"*। route सूची लाइव API से बनती है, इसलिए जो भी `curl` से पहुँचा जा सकता है, वह वहाँ मौजूद है।

**स्थानीय विकास:** `https://api.churchapps.org/mcp` की जगह `http://localhost:8084/mcp` लिखें — वही auth, वही tools।

## संबंधित

- [API Keys](/docs/developer/api/api-keys) — scopes का पूरा संदर्भ
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol विवरण और tool schemas
- [ChatGPT](./chatgpt) — यही विचार, OpenAI के मॉडलों के लिए
