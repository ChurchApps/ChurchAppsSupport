---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

OpenAI के ChatGPT को अपनी church के B1 data से जोड़ें और भारी काम उसे करने दें। एक बार जुड़ने के बाद, ChatGPT आपके live church records देख सकता है और ऐसे काम पूरे करने में मदद कर सकता है जिनमें B1 Admin में कई चरण लगते, या जिन्हें आप शायद कर ही नहीं पाते।

**कुछ काम जो आप इससे कह सकते हैं:**
- *"Sunday School की classrooms सेट करें और हर teacher को उसके group के आधार पर सही कमरे में रखें"*
- *"मुझे वे सभी लोग दिखाएं जो पिछले हफ्ते आए थे लेकिन किसी small group में assign नहीं हैं"*
- *"इस महीने का giving fund के अनुसार सारांश दें"*
- *"हमारे सबसे नए members कौन हैं और क्या हमने उनसे follow-up किया है?"*
- *"मैं B1 में X कैसे करूं, समझ नहीं आ रहा — क्या आप मुझे समझा सकते हैं या मेरे लिए कर सकते हैं?"*

ChatGPT जवाब और कार्रवाई सीधे आपके B1 data से लेता है, और केवल आपकी church तक सीमित रहता है।

:::tip अनुशंसित: Claude Code
MCP का सबसे सहज अनुभव पाने के लिए, [Claude Code](./claude) अनुशंसित client है — setup में एक ही command लगती है और यह तुरंत काम करता है। ChatGPT भी काम करता है और अगर आपकी team पहले से इसका उपयोग करती है तो यह एक अच्छा विकल्प है।
:::

दो तरीके समर्थित हैं: **MCP Connector** (ChatGPT में पहले से शामिल) और एक **Custom GPT**, उन teams के लिए जो एक साझा किया जा सकने वाला assistant चाहती हैं।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- B1 Admin में **Edit Settings** अनुमति वाला एक church admin (API key बनाने के लिए आवश्यक)
- एक **ChatGPT Plus, Pro, Team, या Enterprise** account

</div>

## त्वरित सेटअप गाइड {#quick-setup-guide}

ये चरण **ChatGPT desktop app** (Mac/Windows) में फ़ॉलो करें। अन्य versions में स्क्रीन थोड़ी अलग दिख सकती हैं।

---

**चरण 1 — पहले B1 Admin से अपनी API key लें**

ChatGPT को छूने से पहले, B1 Admin में एक API key बनाएं ताकि आपके पास उसे paste करने के लिए तैयार हो:

1. B1 Admin में **Settings → Developer → API Keys** पर जाएं
2. **New API Key** पर click करें, उसका नाम `ChatGPT` रखें, अपने scopes चुनें (शुरुआत `people:read`, `groups:read`, `attendance:read`, `donations:read` से करें), और **Save** पर click करें
3. `cak_…` key copy करें — यह केवल एक बार दिखाई जाती है

---

**चरण 2 — ChatGPT में नीचे-बाईं ओर अपने नाम पर click करें**

![अपने profile नाम पर click करें](/img/guides/chatgpt-mcp/01.png)

---

**चरण 3 — Settings पर click करें**

![मेनू से Settings पर click करें](/img/guides/chatgpt-mcp/02.png)

---

**चरण 4 — बाईं sidebar में Plugins पर click करें**

![Integrations के अंतर्गत Plugins पर click करें](/img/guides/chatgpt-mcp/03.png)

---

**चरण 5 — MCPs tab पर click करें**

![MCPs tab पर click करें](/img/guides/chatgpt-mcp/04.png)

जिन MCP servers को आप पहले जोड़ चुके हैं, वे यहां दिखेंगे।

---

**चरण 6 — Add → Add MCP server पर click करें**

![Add और फिर Add MCP server पर click करें](/img/guides/chatgpt-mcp/06.png)

---

**चरण 7 — फ़ॉर्म भरें और Save पर click करें**

![Custom MCP से जुड़ने का फ़ॉर्म](/img/guides/chatgpt-mcp/07.png)

**Streamable HTTP** पर click करें, फिर भरें:

| फ़ील्ड | क्या दर्ज करें |
|---|---|
| **Name** | `B1 Church` (या कोई भी नाम जो आप चाहें) |
| **Type** | **Streamable HTTP** पर click करें |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | खाली छोड़ें |
| **Headers** | **+ Add header** पर click करें → Key: `Authorization` → Value: नीचे देखें |

![Key में Authorization और Value में Bearer key दिखाता भरा हुआ उदाहरण](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — शब्द Bearer, एक space, और फिर आपकी key

**Save** पर click करें।

बस हो गया! किसी chat पर वापस जाएं और कुछ ऐसा पूछें जैसे *"हमारे church में कितने लोग हैं?"* और ChatGPT सीधे B1 से जवाब लाएगा।

---

## चरण 1 — B1 Admin में API Key बनाएं {#step-1--create-an-api-key-in-b1-admin}

B1 से हर connection एक API key का उपयोग करता है जो आप बनाते हैं। यह key आपके church की पहचान करती है, नियंत्रित करती है कि ChatGPT क्या देख सकता है, और इसे कभी भी रद्द किया जा सकता है।

1. **B1 Admin** खोलें और **Settings → Developer → API Keys** पर जाएं।
2. **New API Key** पर click करें।
3. Key को एक नाम दें — `ChatGPT` अच्छा काम करता है।
4. वे scopes (अनुमतियां) चुनें जो ChatGPT के पास होनी चाहिए। केवल-पढ़ने वाले assistant के लिए एक अच्छा शुरुआती set:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. **Save** पर click करें।
6. दिखाई देने वाली पूरी key copy करें — यह `cak_` से शुरू होती है और केवल **एक बार** दिखाई जाती है। इसे किसी सुरक्षित जगह पर रख लें।

:::tip
अगर आपको कभी ChatGPT की पहुंच रद्द करनी हो, तो **Settings → Developer → API Keys** पर वापस जाएं और key delete करें। पहुंच तुरंत समाप्त हो जाएगी।
:::

---

## विकल्प A — ChatGPT MCP Connector (अनुशंसित) {#path-a--chatgpt-mcp-connector-recommended}

यह जुड़ने का सबसे सरल तरीका है। ChatGPT में एक अंतर्निर्मित "Connect to a custom MCP" dialog है जो सीधे B1 के MCP server से काम करता है — इसके लिए Custom GPT की आवश्यकता नहीं है।

### आपको क्या चाहिए

- चरण 1 से आपकी `cak_…` key

### ChatGPT में MCP connector खोलें

ChatGPT में **Settings → Plugins → MCPs** पर जाएं और **Add → Add MCP server** पर click करें।

### Dialog भरें

**Streamable HTTP** पर click करें, फिर ये मान उपयोग करें:

| फ़ील्ड | मान |
|---|---|
| **Name** | `B1 Church` (या कोई भी नाम जो आप चाहें) |
| **Type** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | खाली छोड़ें |
| **Headers** | Key: `Authorization` / Value: `Bearer cak_yourprefix.yoursecret` |

Value फ़ील्ड के लिए, शब्द `Bearer` टाइप करें, एक space, फिर अपनी key paste करें — सब कुछ उसी box में। उदाहरण: `Bearer cak_prefix.secret`।

**Save** पर click करें।

### ChatGPT से कुछ पूछें

जुड़ने के बाद, बस सामान्य भाषा में पूछें — किसी विशेष command की आवश्यकता नहीं है:

- *"हमारे church में कितने लोग हैं?"*
- *"पिछले 30 दिनों में कौन जुड़ा?"*
- *"अभी कौन से groups active हैं?"*
- *"इस महीने का giving fund के अनुसार सारांश दें।"*

ChatGPT पर्दे के पीछे B1 को call करेगा और आपके live data से जवाब देगा।

---

## विकल्प B — Actions वाला Custom GPT {#path-b--custom-gpt-with-actions}

Custom GPT आपको एक समर्पित assistant बनाने देता है जिसे आपकी पूरी team साझा कर सकती है — वे एक link खोलते हैं और बिना किसी setup के सवाल पूछना शुरू कर देते हैं। इसके लिए ChatGPT Plus, Team, या Enterprise account और लगभग 10 मिनट चाहिए।

### 1. API key बनाएं

अगर आपने पहले से नहीं किया है, तो ऊपर के चरण 1 का पालन करें।

### 2. Custom GPT बनाएं

1. ChatGPT में, अपने profile पर click करें → **My GPTs** → **Create a GPT**।
2. **Configure** tab पर जाएं, GPT को एक नाम दें (जैसे "B1 Assistant") और instructions जोड़ें:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. **Actions** तक scroll करें → **Create new action** → **Authentication**।
   - **Authentication type:** API Key
   - **API Key:** अपनी `cak_…` key paste करें
   - **Auth Type:** Bearer
   - Save करें।

4. **Schema** box में यह starter OpenAPI spec paste करें:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Action save करें। इसे जांचें: *"चर्च में कितने लोग हैं?"* — ChatGPT `listPeople` call करता है और जवाब देता है।
6. GPT को **Publish** करें (Only me / Anyone with link / Organization) और link अपनी team के साथ साझा करें।

### 3. इसका उपयोग करें

जिसके पास भी link है वह सामान्य भाषा में सवाल पूछ सकता है। Key के scopes फिर भी लागू होते हैं — एक केवल-पढ़ने वाली key, action schema जो कहे उसके बावजूद लिखने के अनुरोध ठुकरा देगी।

---

## सुरक्षा और सीमाएं {#safety-and-limits}

- **प्रति-church अलगाव।** API key एक ही church से जुड़ती है। ChatGPT दूसरे churches का data नहीं देख सकता।
- **अनुमति-सीमित।** Key केवल वही scopes रखती है जो आपने दिए हैं। किसी scope को हटाने (key delete करके नई बनाने से) पर अगली call से वह पहुंच बंद हो जाती है।
- **तुरंत रद्द करने योग्य।** **Settings → Developer → API Keys** में key delete करें और पहुंच तुरंत समाप्त हो जाएगी।
- **Custom GPT साझा करने से data भी साझा होता है।** GPT तक पहुंच रखने वाला हर व्यक्ति वह देख सकता है जो key के scopes अनुमति देते हैं। जिन GPTs को व्यापक रूप से साझा किया जाएगा, उनके लिए संकीर्ण scopes चुनें (जैसे `donations:read` छोड़ दें)।
- **Audit trail।** ChatGPT के माध्यम से किए गए कोई भी बदलाव B1 Admin की क्रियाओं वाले उसी audit log से गुजरते हैं — इन्हें **Settings → Audit Log** के अंतर्गत देखें।

## लागत {#cost}

ChurchApps निःशुल्क और open-source है — ChatGPT जिस API को call करता है वह उस सेवा का हिस्सा है जो आपकी church पहले से चलाती है। ChatGPT के उपयोग का शुल्क OpenAI अपनी योजनाओं के अनुसार लेता है। ChurchApps की ओर से प्रति call कोई शुल्क नहीं है।

## समस्या-निवारण {#troubleshooting}

**MCP connector "Unauthorized" कहता है या 401 error दिखाता है:** आपकी API key गायब है या गलत है। Connector settings खोलें और जांचें कि `Authorization:Bearer` argument में key पूरी `cak_…` वैल्यू है और उसमें कोई अतिरिक्त space नहीं है।

**ChatGPT कहता है कि उसे कुछ data नहीं मिल रहा:** हो सकता है key के पास सही scopes न हों। **Settings → Developer → API Keys** में अतिरिक्त scopes के साथ नई key बनाएं और connector को अपडेट करें।

**`npx` command विफल होता है:** हो सकता है Node.js इंस्टॉल न हो। इसे [nodejs.org](https://nodejs.org) से डाउनलोड और इंस्टॉल करें, फिर connector को दोबारा save करने का प्रयास करें।

**Custom GPT action 401 देता है:** action के authentication panel में पुष्टि करें कि **Auth Type: Bearer** चुना गया है और key में शब्द `Bearer` शामिल नहीं है (ChatGPT इसे अपने-आप जोड़ देता है)।

**Custom GPT action 403 देता है:** key के पास उस endpoint के लिए scope नहीं है। सही scopes के साथ नई key बनाएं और GPT को अपडेट करें।

**Action schema अस्वीकार हो जाता है:** ChatGPT को OpenAPI 3.1 चाहिए जिसमें कम से कम एक `paths` entry और एक `servers` URL हो। पेस्ट करने से पहले YAML को [editor.swagger.io](https://editor.swagger.io) पर validate करें।

## संबंधित {#related}

- [API Keys](/docs/developer/api/api-keys) — scopes का पूरा संदर्भ
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol विवरण और tool schemas
- [Claude](./claude) — वही विचार, Anthropic के models के लिए
- [REST API reference](/docs/developer/api/endpoints) — हर endpoint जिसे Custom GPT action call कर सकता है
