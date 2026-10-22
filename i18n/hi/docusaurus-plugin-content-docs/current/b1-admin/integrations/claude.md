---
title: "Claude"
---

# Claude

<div class="article-intro">

Anthropic के Claude को अपनी church के B1 data से जोड़ें। claude.ai पर B1 को एक custom connector के रूप में जोड़ें और sign in करें, या Claude Code या Claude Desktop के साथ API key का उपयोग करें। कुछ मिनट के setup के बाद, आप Claude से ऐसे सवाल पूछ सकते हैं जैसे "रविवार को कितने पहली बार आने वाले visitors आए?" या "इस महीने building fund में दान देने वाले लोगों को एक thank-you email का draft बनाएं" — और Claude आपकी church के records से सीधे जवाब पढ़ेगा, जो आपकी अनुमतियों तक सीमित रहेगा।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- एक **Claude Pro/Max/Team/Enterprise** account (claude.ai custom connector के लिए), या **Claude Code** (CLI / IDE extension) या **Claude Desktop** (Mac/Windows)
- API key setup के लिए: B1 Admin में **Edit Settings** अनुमति वाला एक church admin (API key बनाने के लिए)
- आपके B1 API का पूरा URL — hosted churches के लिए आमतौर पर `https://api.churchapps.org`, या आपका self-hosted Api host

</div>

## Claude क्या देख सकता है {#what-claude-can-see}

Claude B1 से **Model Context Protocol (MCP) server** के माध्यम से बात करता है, जो B1 API में अंतर्निर्मित है। Claude की हर call वही auth, अनुमति और church-scoping नियमों से गुजरती है जो B1Admin के किसी request पर लागू होते हैं — यानी Claude:

- केवल **आपकी** church का data देखता है
- उन **अनुमतियों और scopes** तक सीमित रहता है जो API key या sign-in के पास हैं
- Webhooks, OAuth admin endpoints, या अन्य केवल-operator paths तक नहीं पहुंच सकता (वे blocklist में हैं)

एक `donations:read` key Claude को giving का सारांश देने देती है, लेकिन दान दर्ज नहीं करने देती। एक `people:write` key किसी व्यक्ति को जोड़ सकती है, लेकिन donations नहीं देख सकती। काम से मेल खाने वाले scopes चुनें।

## सेटअप {#setup}

दो तरीकों से जुड़ा जा सकता है:

- **Claude.ai custom connector** — सबसे आसान। आप B1 में sign in करते हैं और अपने browser में access approve करते हैं, कोई key copy नहीं करनी पड़ती। एक बार आपके account में जुड़ने के बाद यह connector Claude Desktop और Claude mobile apps में भी काम करता है।
- **API key** — Claude Code के लिए, या Claude Desktop config file के लिए। आप एक key बनाते हैं और उसे Claude की settings में paste करते हैं।

### Claude.ai (web) — कस्टम Connector {#claudeai-web--custom-connector}

1. Claude में **Settings → Connectors** खोलें और **Add custom connector** पर click करें। (Team और Enterprise plans पर, किसी owner को पहले संगठन के लिए इसे जोड़ना पड़ सकता है।)
2. इसे `B1` नाम दें और server URL `https://api.churchapps.org/mcp` दर्ज करें, फिर **Add** पर click करें।
3. **Connect** पर click करें। एक B1 sign-in window खुलेगी। अपने B1 account से log in करें और पूछे जाने पर अपनी church चुनें।
4. **AUTHORIZATION REQUIRED** पेज app का नाम, वह data जो वह मांग रहा है (जैसे **View people, households and contact details**, या **Everything your B1 account can access** यदि उसने कुछ सीमित नहीं मांगा), और वह पता दिखाता है जहां आप चुनने के बाद वापस भेजे जाएंगे — जांचें कि वह **claude.ai** है।
5. **Allow** पर click करें। आप Claude पर वापस आ जाएंगे, और B1 connected दिखेगा।

Claude पहली बार जुड़ने पर खुद को B1 में register करता है, इसलिए पेज यह भी बताता है कि app ने खुद को register किया है और वह कभी भी आपके अपने B1 account से ज़्यादा नहीं कर सकता। बाद में इसे हटाने के लिए, B1Admin में **Settings → Developer → Connected Apps** पर जाएं और उसकी पहुंच रद्द करें।

### API key का उपयोग {#using-an-api-key}

#### 1. API key बनाएं {#1-create-an-api-key}

1. B1Admin में **Settings → Developer → API Keys** पर जाएं।
2. **New API Key** पर click करें, उसका नाम `Claude` रखें, और वे scopes चुनें जो Claude के पास होने चाहिए। सामान्य शुरुआती sets:
   - **केवल-पढ़ने वाला assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **पढ़ना + notes / tasks जोड़ना:** `people:write` जोड़ें
   - **पूर्ण operational assistant:** वे मेल खाते `:write` scopes जोड़ें जो आप चाहते हैं
3. Save करें। पूरी `cak_…` key **एक बार** दिखाई जाती है — उसे copy कर लें।

देखें कि हर scope क्या अनुमति देता है, [API Keys](/docs/developer/api/api-keys) देखें।

#### 2. Claude से जोड़ें {#2-connect-claude}

वह Claude client चुनें जिसका आप उपयोग करते हैं:

##### Claude Code (CLI)

एक terminal में:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

बस इतना ही। किसी भी Claude Code session के अंदर, यह पुष्टि करने के लिए `/mcp` टाइप करें कि `b1` server जुड़ा है, फिर अपने church के बारे में कोई भी सवाल पूछें।

##### Claude Desktop

Claude Desktop की config file संपादित करें:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

एक `b1` server entry जोड़ें। Claude Desktop के नए versions HTTP MCP को सीधे समझते हैं:

```json
{
  "mcpServers": {
    "b1": {
      "url": "https://api.churchapps.org/mcp",
      "headers": {
        "Authorization": "Bearer cak_<prefix>.<secret>"
      }
    }
  }
}
```

यदि आपका Claude Desktop version केवल stdio servers समर्थित करता है, तो `mcp-remote` के माध्यम से जोड़ें:

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

Claude Desktop को restart करें। chat composer में connector icon पर `b1` दिखेगा जिसमें तीन tools होंगे (`list_endpoints`, `describe_endpoint`, `api_call`)।

### Claude से कुछ पूछें {#ask-claude-something}

जुड़ने के बाद, किसी विशेष syntax की आवश्यकता नहीं है — Claude अपने-आप पता लगा लेता है कि क्या उपलब्ध है। उदाहरण:

- *"मेरे church में कितने लोग हैं और कौन से groups active हैं?"*
- *"इस महीने की donations का fund के अनुसार सारांश दें।"*
- *"पिछले रविवार 10 बजे की service में आए उन लोगों की सूची दें जो पिछले 60 दिनों में किसी बुधवार के group में नहीं गए।"*
- *"इस हफ्ते जोड़े गए चार लोगों के लिए पहले नाम से संबोधित करते हुए एक स्वागत email का draft बनाएं।"*

पर्दे के पीछे Claude MCP tools को call करेगा — पहले सही endpoint खोजने के लिए, फिर data लाने के लिए — और सामान्य भाषा में जवाब देगा।

## यह कैसे काम करता है {#how-it-works}

B1 API एक ही MCP endpoint `/mcp` पर उपलब्ध कराता है। Claude उससे जुड़ता है, आपकी `cak_…` key या आपके स्वीकृत sign-in से प्रमाणित होता है, और तीन tools तक पहुंच पाता है:

| टूल | यह क्या करता है |
|---|---|
| `list_endpoints` | उन REST endpoints की सूची देता है जिन्हें Claude call कर सकता है, path के अनुसार filter किए जा सकने वाले। खोज के लिए उपयोग होता है। |
| `describe_endpoint` | किसी विशेष endpoint का संक्षिप्त सारांश और एक उदाहरण request/response देता है। |
| `api_call` | प्रमाणित उपयोगकर्ता के रूप में वास्तव में एक REST endpoint को invoke करता है। |

यह वही `/membership/people`, `/giving/donations`, `/attendance/visits` आदि surface है जिसका उपयोग आपका B1Admin करता है — हर authorization नियम समान रूप से लागू होता है।

## सुरक्षा और सीमाएं {#safety-and-limits}

- **प्रति-church अलगाव।** API key या sign-in एक ही church से जुड़ता है। Claude के पास दूसरे churches का data देखने का कोई तरीका नहीं है।
- **अनुमति-सीमित।** यदि आप B1Admin में उस व्यक्ति से अनुमति हटा देते हैं जिसने key बनाई (या sign in किया), तो Claude अगली call पर उसे तुरंत खो देता है।
- **रद्द करने योग्य।** **Settings → Developer → API Keys** में key delete करें, या **Settings → Developer → Connected Apps** में claude.ai connection रद्द करें, और Claude की पहुंच तुरंत समाप्त हो जाएगी।
- **Blocklist।** Provider webhooks, OAuth client admin endpoints, और केवल-operator `apiEmails` route MCP के माध्यम से call नहीं किए जा सकते।
- **Response size सीमा।** एक tool response 64 KB तक सीमित है ताकि लंबी सूचियां Claude के context को न भर दें — ऐसा होने पर Claude filters से query को संकीर्ण करेगा।
- **Audit trail।** बदलाव B1Admin की क्रियाओं वाले उसी audit log से गुजरते हैं; इन्हें **Settings → Audit Log** के अंतर्गत देख सकते हैं।

## लागत {#cost}

ChurchApps निःशुल्क और open-source है — MCP server उस API का हिस्सा है जो आपकी church पहले से चलाती है। Claude के उपयोग का शुल्क Anthropic अपनी योजनाओं के अनुसार लेता है। ChurchApps की ओर से प्रति call कोई शुल्क नहीं है।

## समस्या-निवारण {#troubleshooting}

**Claude "Unauthorized" या 401 बताता है:** bearer token गायब है, गलत है, या key रद्द की जा चुकी है। `Authorization: Bearer cak_…` header दोबारा जांचें (space और शाब्दिक `Bearer` पर ध्यान दें)। claude.ai पर, दोबारा sign in करने के लिए B1 connector को disconnect और फिर reconnect करें।

**एक tool call 403 देता है:** API key के पास उस endpoint के लिए scope नहीं है। **Settings → Developer → API Keys** में scope जोड़ें (आपको नई key बनानी होगी — scopes को बदला नहीं जा सकता) और Claude की config अपडेट करें।

**Claude को कोई endpoint नहीं मिल रहा:** उससे किसी filter के साथ `list_endpoints` call करने को कहें, जैसे *"path खोजने के लिए list_endpoints को filter 'donations' के साथ उपयोग करो"*। Route inventory live API से बनती है, इसलिए जो भी `curl` से पहुंच योग्य है, वह यहां है।

**स्थानीय विकास (local development):** `https://api.churchapps.org/mcp` की जगह `http://localhost:8084/mcp` रखें — वही auth, वही tools।

## संबंधित {#related}

- [API Keys](/docs/developer/api/api-keys) — scopes का पूरा संदर्भ
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol विवरण और tool schemas
- [ChatGPT](./chatgpt) — वही विचार, OpenAI के models के लिए
