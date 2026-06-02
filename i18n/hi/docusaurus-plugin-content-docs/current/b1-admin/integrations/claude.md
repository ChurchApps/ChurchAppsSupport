---
title: "Claude"
---

# Claude

<div class="article-intro">

Anthropic के Claude को अपने चर्च के B1 डेटा से जोड़ें। एक API कुंजी और कुछ मिनटों की सेटअप के साथ, आप Claude से सवाल पूछ सकते हैं जैसे "रविवार को कितने नए आगंतुक आए?" या "इस महीने भवन कोष में दान देने वाले लोगों को धन्यवाद ईमेल का मसौदा बनाएं" — और Claude सीधे आपके चर्च के रिकॉर्ड से उत्तर पढ़ेगा, आपकी अनुमतियों के दायरे में।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक चर्च प्रशासक जिसके पास **Edit Settings** अनुमति है (एक API कुंजी बनाने के लिए)
- निम्न में से एक: **Claude Code** (CLI / IDE एक्सटेंशन), **Claude Desktop** (Mac/Windows), या **Claude Pro/Max/Team** खाता
- आपके B1 API का पूरा URL — आमतौर पर होस्ट किए गए चर्चों के लिए `https://api.churchapps.org`, या आपका स्व-होस्ट किया गया Api होस्ट

</div>

## Claude क्या देख सकता है

Claude B1 से **Model Context Protocol (MCP) server** के माध्यम से बात करता है जो B1 API में निर्मित है। Claude द्वारा की जाने वाली हर कॉल B1Admin से एक अनुरोध के समान auth, अनुमति और चर्च-स्कोपिंग नियमों से गुजरती है — जिसका मतलब है कि Claude:

- केवल **आपके** चर्च के डेटा को देख सकता है
- आप जो API कुंजी देते हैं उसके **अनुमतियों और scopes** तक सीमित है
- webhooks, OAuth admin endpoints, या अन्य ऑपरेटर-केवल पथों तक नहीं पहुंच सकता (वे ब्लॉकलिस्ट किए गए हैं)

एक `donations:read` कुंजी Claude को दान को सारांशित करने देती है लेकिन एक उपहार रिकॉर्ड नहीं कर सकती। एक `people:write` कुंजी एक व्यक्ति जोड़ सकती है लेकिन दान नहीं देख सकती। उन scopes को चुनें जो काम से मेल खाएं।

## सेटअप

### 1. एक API कुंजी बनाएं

1. B1Admin में **Settings → Developer → API Keys** पर जाएं।
2. **New API Key** पर क्लिक करें, इसे `Claude` नाम दें, और वह scopes चुनें जो Claude के पास होनी चाहिए। सामान्य स्टार्टर सेट:
   - **केवल-पढ़ने वाला सहायक:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **पढ़ें + नोट्स / कार्य जोड़ें:** `people:write` जोड़ें
   - **पूर्ण परिचालन सहायक:** आप जो matching `:write` scopes चाहते हैं वह जोड़ें
3. सहेजें। पूर्ण `cak_…` कुंजी **एक बार** दिखाई जाती है — इसे कॉपी करें।

[API Keys](/docs/developer/api/api-keys) देखें कि प्रत्येक scope क्या अनुमति देता है।

### 2. Claude को कनेक्ट करें

अपने द्वारा उपयोग किए जाने वाले Claude क्लाइंट को चुनें:

#### Claude Code (CLI)

एक टर्मिनल में:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

बस। किसी भी Claude Code सेशन के अंदर, `/mcp` टाइप करें `b1` सर्वर से जुड़ा हुआ है यह सुनिश्चित करने के लिए, फिर Claude से अपने चर्च के बारे में कोई भी सवाल पूछें।

#### Claude Desktop

Claude Desktop की कॉन्फ़िगरेशन फ़ाइल संपादित करें:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

एक `b1` सर्वर प्रविष्टि जोड़ें। Claude Desktop के नए संस्करण HTTP MCP को जन्मजात तरीके से बोलते हैं:

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

यदि आपका Claude Desktop संस्करण केवल stdio सर्वर का समर्थन करता है, तो `mcp-remote` के माध्यम से पुल करें:

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

Claude Desktop को पुनरारंभ करें। चैट कंपोज़र में कनेक्टर आइकन `b1` को तीन उपकरणों के साथ दिखाएगा (`list_endpoints`, `describe_endpoint`, `api_call`)।

#### Claude.ai (web) — कस्टम कनेक्टर

Claude.ai की "कस्टम कनेक्टर जोड़ें" सुविधा के लिए OAuth की आवश्यकता है, जिसे B1 MCP सर्वर आज समर्थन नहीं करता। इसके बजाय Claude Code या Claude Desktop का उपयोग करें।

### 3. Claude से कुछ पूछें

एक बार कनेक्ट होने पर, कोई विशेष सिंटैक्स आवश्यक नहीं है — Claude उड़ान भरते समय पता चलता है कि क्या उपलब्ध है। उदाहरण:

- *"मेरे चर्च में कितने लोग हैं और सक्रिय समूह क्या हैं?"*
- *"इस महीने के दान को fund द्वारा सारांशित करें।"*
- *"उन लोगों को सूचीबद्ध करें जिन्होंने पिछले रविवार को 10am सेवा में भाग लिया लेकिन पिछले 60 दिनों में बुधवार समूह में नहीं गए।"*
- *"इस सप्ताह जोड़े गए चार लोगों के लिए एक स्वागत ईमेल का मसौदा बनाएं, पहले नाम से संबोधित किया।"*

पर्दे के पीछे Claude MCP tools को कॉल करेगा — पहले सही endpoint की खोज करने के लिए, फिर डेटा प्राप्त करने के लिए — और सादी भाषा में जवाब दें।

## यह कैसे काम करता है

B1 API `/mcp` पर एक एकल MCP endpoint को उजागर करता है। Claude इससे जुड़ता है, आपकी `cak_…` कुंजी के साथ प्रमाणित होता है, और तीन उपकरणों तक पहुंच प्राप्त करता है:

| Tool | यह क्या करता है |
|---|---|
| `list_endpoints` | उन REST endpoints को सूचीबद्ध करता है जिन्हें Claude कॉल कर सकता है, पथ द्वारा filterable। खोज के लिए प्रयोग किया जाता है। |
| `describe_endpoint` | एक विशिष्ट endpoint के लिए एक संक्षिप्त सारांश और एक उदाहरण अनुरोध/प्रतिक्रिया देता है। |
| `api_call` | वास्तव में एक प्रमाणित उपयोगकर्ता के रूप में एक REST endpoint को लागू करता है। |

यह वही `/membership/people`, `/giving/donations`, `/attendance/visits` आदि सतह है जो आपका B1Admin उपयोग करता है — हर प्राधिकरण नियम समान रूप से लागू होता है।

## सुरक्षा और सीमाएं

- **प्रति-चर्च अलगाव।** API कुंजी एक चर्च को हल करती है। Claude के पास अन्य चर्चों के डेटा को देखने का कोई तरीका नहीं है।
- **अनुमति-scoped।** यदि आप **Settings → Developer → API Keys** में कुंजी को mint करने वाले व्यक्ति से अनुमति हटाते हैं, तो Claude अगली कॉल पर इसे खो देता है — तुरंत।
- **Revocable।** **Settings → Developer → API Keys** में कुंजी को हटाएं और Claude की पहुंच तुरंत समाप्त हो जाती है।
- **Blocklist।** Provider webhooks, OAuth client admin endpoints, और ऑपरेटर-केवल `apiEmails` route MCP के माध्यम से कॉल योग्य नहीं हैं।
- **प्रतिक्रिया आकार सीमा।** एक एकल tool प्रतिक्रिया 64 KB तक सीमित है ताकि लंबी सूचियां Claude के context को न उड़ाएं — Claude जब ऐसा होता है तो Claude फ़िल्टर के साथ क्वेरी को संकीर्ण करेगा।
- **ऑडिट ट्रेल।** Mutations B1Admin कार्यों के समान ऑडिट लॉग से गुजरते हैं; आप उन्हें **Reports → Audit Log** के तहत समीक्षा कर सकते हैं।

## लागत

ChurchApps निःशुल्क और open-source है — MCP सर्वर आपके चर्च द्वारा पहले से चलाए जाने वाले API का हिस्सा है। Anthropic अपनी योजनाओं के अनुसार Claude उपयोग के लिए शुल्क लेता है। ChurchApps से कोई प्रति-कॉल लागत नहीं है।

## समस्या निवारण

**Claude "Unauthorized" या 401 की रिपोर्ट करता है:** bearer टोकन गायब है, malformed है, या कुंजी को revoke कर दिया गया है। `Authorization: Bearer cak_…` हेडर को फिर से जांचें (ध्यान दें space और literal `Bearer`)।

**एक tool कॉल 403 देता है:** API कुंजी के पास उस endpoint के लिए scope नहीं है। **Settings → Developer → API Keys** में scope जोड़ें (आपको एक नई कुंजी बनानी होगी — scopes को जगह में नहीं बदला जा सकता) और Claude की कॉन्फ़िगरेशन अपडेट करें।

**Claude कोई endpoint नहीं खोज सकता:** इसे `list_endpoints` फ़िल्टर के साथ कॉल करने के लिए कहें, उदाहरण के लिए *"donations" फ़िल्टर के साथ सही पथ खोजने के लिए list_endpoints का उपयोग करें"*। मार्ग inventory live API से उत्पन्न होता है, तो कुछ भी आप `curl` के साथ हिट कर सकते हैं वह वहां है।

**स्थानीय विकास:** `https://api.churchapps.org/mcp` को `http://localhost:8084/mcp` में स्वैप करें — समान auth, समान उपकरण।

## संबंधित

- [API Keys](/docs/developer/api/api-keys) — पूर्ण scope संदर्भ
- [MCP Server (developer reference)](/docs/developer/api/mcp) — प्रोटोकॉल विवरण और tool schemas
- [ChatGPT](./chatgpt) — समान विचार, OpenAI के मॉडल के लिए
