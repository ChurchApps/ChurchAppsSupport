---
title: "Claude"
description: "B1 Admin को Claude से जोड़ें ताकि आप सरल भाषा में attendance, giving, और groups के बारे में पूछ सकें — साइन-इन विकल्प और सीमित-अनुमति वाली key विकल्प के साथ।"
---

# Claude

<div class="article-intro">

Claude से सरल भाषा में अपने चर्च के बारे में पूछें और वह आपके B1 डेटा से जवाब देगा — जिसमें आपके FreePlay पाठ और classrooms भी शामिल हैं। सवाल जैसे *"रविवार को कितने पहली बार आने वाले मेहमान आए?"* या *"इस महीने कौन small group में जुड़ा?"* — या उससे कुछ करवाएँ, जैसे *"हमारी वेबसाइट पर Events नाम का नया पेज जोड़ो।"* सेटअप में 3 मिनट से कम लगते हैं और किसी तकनीकी कौशल या सॉफ़्टवेयर इंस्टॉल की ज़रूरत नहीं होती।

</div>

<div class="prereqs">
<h4>आपको क्या चाहिए</h4>

- **एक Claude account।** **मुफ़्त plan चलता है** — इसे आज़माने का अच्छा तरीका है। हालाँकि मुफ़्त accounts की एक दैनिक message सीमा होती है, और B1 में जानकारी खोजने में messages जल्दी खर्च होते हैं, इसलिए अगर आप इसे नियमित रूप से इस्तेमाल करते हैं तो हम **Claude Pro** (लगभग $20/माह) की सलाह देते हैं।
- **आपका B1 login** — वही जो आप B1 Admin के लिए उपयोग करते हैं।

</div>

:::tip सुझाव — आज़माने के लिए मुफ़्त
Claude B1 को AI से जोड़ने का सबसे आसान तरीका है, और यह Claude के **मुफ़्त plan** पर काम करता है — किसी भी चीज़ के लिए भुगतान करने से पहले आपके चर्च के लिए इसे आज़माने का एक सही तरीका।
:::

जोड़ने के दो तरीके हैं। **विकल्प 1 सबसे आसान है** — कोई key नहीं और कुछ इंस्टॉल नहीं करना।

## विकल्प 1 — B1 से साइन इन करें (सबसे आसान) {#option-1--sign-in-with-b1-easiest}

Claude वेबसाइट, Claude desktop ऐप और Claude फ़ोन ऐप पर काम करता है — एक बार सेट करें और वह सब पर चालू रहता है।

### चरण 1 — Claude की connector settings खोलें {#step-1--open-claudes-connector-settings}

1. [claude.ai](https://claude.ai) पर जाएँ और साइन इन करें (या मुफ़्त account बनाएँ)।
2. नीचे-बाईं ओर अपने नाम पर क्लिक करें, फिर **Customize** → **Connectors**।

### चरण 2 — B1 जोड़ें {#step-2--add-b1}

1. **Add** पर क्लिक करें, फिर **Add custom connector**।
2. **Name:** में `B1` लिखें।
3. **URL:** में `https://api.churchapps.org/mcp` चिपकाएँ।
4. बाकी विकल्प जैसे हैं वैसे छोड़ें और **Add** पर क्लिक करें।

### चरण 3 — B1 में साइन इन करें {#step-3--sign-in-to-b1}

1. **Connect** पर क्लिक करें। एक B1 साइन-इन पेज खुलता है।
2. अपने B1 account से लॉग इन करें। अगर आप एक से ज़्यादा चर्चों से जुड़े हैं, तो जाँचें कि पेज सही चर्च का नाम दिखाता है ("Would you like to access the following data from *your church*…")।
3. B1 बताता है कि Claude क्या माँग रहा है (**Everything your B1 account can access**), नोट करता है कि ऐप ने खुद को B1 में रजिस्टर किया है, और पुष्टि करता है कि आपको **claude.ai** पर वापस भेजा जाएगा। **Allow** पर क्लिक करें।

आप Claude में वापस आ जाएँगे, और B1 connected दिखेगा।

### चरण 4 — कुछ पूछें {#step-4--ask-it-something}

एक **नई chat** शुरू करें और आज़माएँ:

- *"हमारे चर्च में कितने लोग हैं?"*
- *"हमारे सक्रिय groups की सूची दो।"*
- *"इस महीने की giving का fund के अनुसार सारांश दो।"*
- *"पिछले 30 दिनों में कौन चर्च से जुड़ा?"*

पहली बार, Claude B1 का उपयोग करने की अनुमति माँगेगा — **Allow** पर क्लिक करें।

## विकल्प 2 — B1 key के साथ desktop extension {#option-2--desktop-extension-with-a-b1-key}

इसका उपयोग करें अगर आप Claude को सीमित अनुमतियों वाली key देना चाहते हैं (उदाहरण के लिए, केवल देखने की)। यह Mac या Windows के लिए Claude desktop ऐप में काम करता है, और key बनाने के लिए B1 में चर्च सेटिंग्स प्रबंधित करने की अनुमति चाहिए।

### चरण 1 — Claude ऐप प्राप्त करें {#step-1--get-the-claude-app}

[claude.com/download](https://claude.com/download) से Claude ऐप डाउनलोड करें, इंस्टॉल करें, खोलें, और साइन इन करें।

### चरण 2 — अपनी B1 key बनाएँ {#step-2--make-your-b1-key}

key ही वह चीज़ है जो Claude को *आपके* चर्च के B1 में प्रवेश देती है — इसे सिर्फ़ Claude के लिए एक password समझें।

1. [B1 Admin](https://admin.b1.church) में लॉग इन करें और [Settings → Developer](https://admin.b1.church/settings/developer) पर जाएँ।
2. **API Keys** tab पर, **New API Key** पर क्लिक करें।
3. **Name:** में `Claude` लिखें।
4. **Scopes:** चुनें कि Claude क्या कर सकता है। ज़्यादातर क्षेत्रों में एक **read** box (केवल देखना) और एक **write** box (बदलाव करना) होता है; forms में केवल **forms:write** होता है। पक्का नहीं? शुरू करने के लिए केवल **read** boxes चेक करें — बाद में ज़्यादा अनुमतियों के साथ नई key बना सकते हैं।
5. **Save** पर क्लिक करें, फिर key को **Copy** करें। यह केवल एक बार दिखाई जाती है, इसलिए सीधे चरण 3 पर जाएँ।

### चरण 3 — Claude में B1 जोड़ें {#step-3--add-b1-to-claude}

1. [B1 extension डाउनलोड करें](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb)।
2. डाउनलोड की गई फ़ाइल (`b1-churchapps.mcpb`) पर **double-click** करें। Claude खुलेगा और **B1 (ChurchApps)** दिखाएगा।
3. **Install** पर क्लिक करें।
4. जब वह आपकी **B1 API key** माँगे, तो चरण 2 की key चिपकाएँ और सेव करें।
5. **Claude को पूरी तरह बंद करें** (Mac: **Cmd+Q** · Windows: taskbar में Claude आइकन पर राइट-क्लिक करें → **Quit**) और उसे फिर से खोलें।

अगर double-click से Claude नहीं खुलता, तो Claude में **Settings → Extensions → Advanced settings → Install Extension…** पर जाएँ और डाउनलोड की गई फ़ाइल चुनें। फिर एक नई chat शुरू करें और कुछ पूछें।

:::tip extension पहले से इंस्टॉल है?
कुछ करने की ज़रूरत नहीं — FreePlay उसी connection से काम करता है। एक अपवाद है: संस्करण 1.1.0 ने B1 email और password माँगा था; उसे अपडेट करने के लिए extension फिर से डाउनलोड और इंस्टॉल करें। आपकी key वैसी ही रहती है।
:::

## क्या यह सुरक्षित है? {#is-it-safe}

- Claude केवल **आपके चर्च** का डेटा देख सकता है।
- **साइन इन करके (विकल्प 1):** Claude कभी भी उससे ज़्यादा नहीं कर सकता जो आपका अपना B1 login कर सकता है। **Allow** पर क्लिक करने से पहले B1 साइन-इन पेज दिखाता है कि Claude क्या माँग रहा है।
- **key के साथ (विकल्प 2):** Claude केवल वही कर सकता है जो key B1 में अनुमति देती है — जिस key में केवल **read** boxes चेक हों, वह केवल देख सकती है, कभी कुछ बदल नहीं सकती। FreePlay उसी key के तहत उसी तरह काम करता है।
- **बंद करने के लिए:** B1 Admin में **Settings → Developer** पर जाएँ और **Connected Apps** (विकल्प 1) के अंतर्गत ऐप रद्द करें, या **API Keys** (विकल्प 2) के अंतर्गत key हटाएँ। पहुँच तुरंत रुक जाती है। आप Claude में B1 connector पर **Disconnect** पर भी क्लिक कर सकते हैं।

## इसकी लागत क्या है? {#what-does-it-cost}

B1 से जुड़ना मुफ़्त है — यह ChurchApps का हिस्सा है। Claude का अपना मुफ़्त plan है; Claude Pro (लगभग $20/माह) बहुत ज़्यादा उपयोग देता है। देखें [claude.com/pricing](https://claude.com/pricing)।

## तकनीकी विवरण {#technical-details}

इस पेज का बाकी हिस्सा तकनीकी उपयोगकर्ताओं और AI सहायकों के लिए है: scopes, जुड़ने के अन्य तरीके, और यह कैसे काम करता है।

### Scopes {#scopes}

Claude B1 से **Model Context Protocol (MCP) server** के माध्यम से बात करता है, जो B1 API (`https://api.churchapps.org/mcp`) में बना है। हर call वही auth, अनुमति, और चर्च-सीमा के नियमों से गुज़रती है जो B1 Admin के किसी request पर लागू होते हैं। Claude API key की **अनुमतियों और scopes** तक सीमित है, और payment-provider webhooks, OAuth client admin endpoints, या sign-in और password endpoints तक नहीं पहुँच सकता।

आम शुरुआती scope सेट:

- **केवल-पढ़ने वाला assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **पढ़ना + notes / tasks जोड़ना:** `people:write` जोड़ें
- **पूर्ण operational assistant:** जो `:write` scopes चाहिए वे जोड़ें

`donations:read` key Claude को giving का सारांश देने देती है, पर कोई उपहार दर्ज नहीं कर सकती। `people:write` key कोई व्यक्ति जोड़ सकती है, पर donations नहीं देख सकती। हर scope क्या अनुमति देता है, यह देखने के लिए [API Keys](/docs/developer/api/api-keys) देखें।

### जुड़ने के अन्य तरीके {#other-ways-to-connect}

#### Claude Code (CLI) {#claude-code-cli}

टर्मिनल में:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

बस हो गया। किसी भी Claude Code session में `/mcp` टाइप करें यह पुष्टि करने के लिए कि `b1` server जुड़ा है, फिर अपने चर्च के बारे में Claude से कोई भी सवाल पूछें।

#### Claude Desktop — मैन्युअल config (उन्नत) {#claude-desktop--manual-config-advanced}

अगर आप extension का उपयोग नहीं करना चाहते, तो Claude Desktop की config फ़ाइल संपादित करें:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

एक `b1` server entry जोड़ें जो `mcp-remote` के माध्यम से B1 से जुड़ती है (इसके लिए [Node.js](https://nodejs.org) चाहिए):

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

Claude Desktop फिर से शुरू करें। chat composer के connector मेनू में `b1` अपने tools के साथ दिखेगा।

#### Claude.ai (वेब) — Custom Connector {#claudeai-web--custom-connector}

ऊपर **विकल्प 1** देखें। connector OAuth 2.1 का उपयोग करता है: Claude `https://api.churchapps.org/.well-known/oauth-protected-resource` से B1 का authorization server खोजता है, Dynamic Client Registration से खुद को रजिस्टर करता है, और PKCE के साथ साइन इन करता है। Team और Enterprise plans पर, किसी owner को पहले organization के लिए connector जोड़ना पड़ सकता है। Claude कोई विशिष्ट scopes नहीं माँगता, इसलिए सहमति पेज वह सब कुछ दिखाता है जो साइन-इन किया हुआ B1 account एक्सेस कर सकता है। B1 Admin में **Settings → Developer → Connected Apps** के अंतर्गत इसे रद्द करें।

### यह कैसे काम करता है {#how-it-works}

B1 API एक एकल MCP endpoint `/mcp` पर देता है। Claude उससे जुड़ता है, आपकी `cak_…` key से प्रमाणित होता है, और चार tools तक पहुँच पाता है:

| Tool | यह क्या करता है |
|---|---|
| `list_endpoints` | वे REST endpoints सूचीबद्ध करता है जिन्हें Claude call कर सकता है, path के अनुसार फ़िल्टर किए जा सकते हैं। खोज के लिए उपयोग होता है। |
| `describe_endpoint` | किसी विशिष्ट endpoint का संक्षिप्त सारांश और एक उदाहरण request/response लौटाता है। |
| `api_call` | प्रमाणित उपयोगकर्ता के रूप में वास्तव में एक REST endpoint को invoke करता है। |
| `describe_page_builder` | आपकी चर्च वेबसाइट के पेज बनाने और संपादित करने की गाइड, जिसे Claude वेबसाइट सामग्री पर काम करने से पहले पढ़ता है। |

यह वही `/membership/people`, `/giving/donations`, `/attendance/visits` आदि सतह है जिसका आपका B1 Admin उपयोग करता है — हर अनुमति नियम उसी तरह लागू होता है। FreePlay (lessons.church) के endpoints `/lessons/*` के अंतर्गत सूचीबद्ध हैं; उनके लिए Claude के calls उसी उपयोगकर्ता के रूप में, उन्हीं अनुमतियों के साथ FreePlay को भेजे जाते हैं।

### सुरक्षा और सीमाएँ {#safety-and-limits}

- **हर चर्च अलग रहता है।** API key एक चर्च से जुड़ी होती है। Claude के पास दूसरे चर्चों का डेटा देखने का कोई तरीका नहीं है।
- **अनुमति-सीमित।** अगर आप B1 Admin में उस व्यक्ति से, जिसने key बनाई थी, कोई अनुमति हटाते हैं, तो Claude उसे अगली call पर तुरंत खो देता है।
- **रद्द करने योग्य।** **Settings → Developer → API Keys** में key हटाएँ और Claude की पहुँच तुरंत समाप्त हो जाती है।
- **Blocklist।** Payment-provider webhook endpoints, OAuth client admin endpoints, और sign-in, registration, password तथा two-factor endpoints MCP के ज़रिए call नहीं किए जा सकते।
- **Response आकार की सीमा।** एक tool response 64 KB तक सीमित है ताकि लंबी सूचियाँ Claude के context को न भर दें — ऐसा होने पर Claude filters से query को संकुचित करेगा।
- **Audit trail।** बदलाव उसी audit log से गुज़रते हैं जो B1 Admin की कार्रवाइयों का है; आप उन्हें **Settings → Audit Log** के अंतर्गत देख सकते हैं।

### समस्या निवारण {#troubleshooting}

**FreePlay उपयोग करने के लिए Claude B1 email और password माँगता है:** आपके पास desktop extension का संस्करण 1.1.0 है। अपडेट करने के लिए उसे फिर से डाउनलोड और इंस्टॉल करें — नए संस्करण केवल आपकी key का उपयोग करते हैं।

**Claude "Unauthorized" या 401 बताता है:** bearer token गायब है, गलत format में है, या key रद्द हो चुकी है। यदि आपने extension का उपयोग किया है, तो Claude में **Settings → Extensions → B1 (ChurchApps)** खोलें और key फिर से चिपकाएँ। अन्यथा `Authorization: Bearer cak_…` header की जाँच करें (space और शाब्दिक `Bearer` शब्द पर ध्यान दें)।

**tool call 403 लौटाता है:** API key में उस endpoint के लिए scope नहीं है। **Settings → Developer → API Keys** में scope जोड़ें (आपको नई key बनानी होगी — scopes को सीधे नहीं बदला जा सकता) और नई key को extension की settings या Claude की config में चिपकाएँ।

**Claude को कोई endpoint नहीं मिल रहा:** उससे किसी filter के साथ `list_endpoints` call करने को कहें, जैसे *"सही path खोजने के लिए 'donations' filter के साथ list_endpoints का उपयोग करो"*। route सूची लाइव API से बनती है, इसलिए जो भी `curl` से पहुँच योग्य है, वह उसमें है।

**स्थानीय विकास:** `https://api.churchapps.org/mcp` की जगह `http://localhost:8084/mcp` लिखें — वही auth, वही tools।

## संबंधित {#related}

- [API Keys](/docs/developer/api/api-keys) — पूरा scope संदर्भ
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol विवरण और tool schemas
- [ChatGPT](./chatgpt.md) — वही विचार, OpenAI के models के लिए
