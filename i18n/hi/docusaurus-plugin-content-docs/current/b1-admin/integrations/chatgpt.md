---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

ChatGPT को अपने church के B1 डेटा से जोड़ें और उससे सादी भाषा में सवाल पूछें -- यह आपके live church रिकॉर्ड से उत्तर देता है। आप उससे ऐसे कामों में भी मदद मांग सकते हैं जिनमें B1 Admin में कई चरण लगेंगे।

**आप ये पूछ सकते हैं:**
- *"पिछले हफ्ते जो लोग आए थे पर किसी small group को असाइन नहीं हुए, उन सब को दिखाओ"*
- *"इस महीने के giving का सार fund के अनुसार बताओ"*
- *"हमारे सबसे नए सदस्य कौन हैं और क्या हमने उनसे follow-up किया है?"*
- *"मैं B1 में X कैसे करूं, समझ नहीं आ रहा -- मुझे कदम-दर-कदम बताओ?"*

</div>

<div class="prereqs">
<h4>आपको क्या चाहिए</h4>

- Mac या Windows के लिए **ChatGPT desktop app**
- **एक भुगतान वाला ChatGPT plan** (Plus या उससे ऊपर)। मुफ़्त ChatGPT accounts B1 से कनेक्ट नहीं हो सकते।
- **आपका B1 login**, church settings प्रबंधित करने की अनुमति के साथ (key बनाने के लिए ज़रूरी)। यह नहीं है? अपने church के B1 administrator से पूछें।

</div>

:::tip सुझाव: पहले Claude आज़माएं -- यह मुफ़्त है
[Claude](./claude) B1 से अपने **मुफ़्त plan** पर कनेक्ट होता है और 3 मिनट से कम में सेट हो जाता है -- बस B1 को connector के रूप में जोड़ें और अपने B1 account से sign in करें। किसी key की ज़रूरत नहीं। किसी भी चीज़ के लिए भुगतान करने से पहले आपके church के लिए AI को B1 के साथ आज़माने का यह सबसे आसान तरीका है।
:::

## सेट करें

आपके ChatGPT के संस्करण में स्क्रीन थोड़ी अलग दिख सकती हैं।

---

**चरण 1 — अपनी B1 key बनाएं**

key वह चीज़ है जो ChatGPT को *आपके* church के B1 में प्रवेश देती है -- इसे सिर्फ़ ChatGPT के लिए एक password समझें।

1. [B1 Admin](https://admin.b1.church) में sign in करें और [Settings → Developer](https://admin.b1.church/settings/developer) पर जाएं।
2. **API Keys** tab पर, **New API Key** पर click करें और उसका नाम `ChatGPT` रखें।
3. **Scopes:** चुनें कि ChatGPT क्या कर सकता है। हर क्षेत्र में एक **read** बॉक्स (केवल देखने के लिए) और एक **write** बॉक्स (बदलाव करने के लिए) है। पता नहीं? शुरू में केवल **read** बॉक्स चिह्नित करें।
4. **Save** पर click करें, फिर key को **Copy** करें (यह `cak_` से शुरू होती है)। यह केवल एक बार दिखती है।

---

**चरण 2 — ChatGPT के नीचे-बाईं ओर अपने नाम पर click करें**

![अपना profile नाम क्लिक करें](/img/guides/chatgpt-mcp/01.png)

---

**चरण 3 — Settings पर click करें**

![मेनू से Settings पर click करें](/img/guides/chatgpt-mcp/02.png)

---

**चरण 4 — बाईं sidebar में Plugins पर click करें**

![Integrations के अंतर्गत Plugins पर click करें](/img/guides/chatgpt-mcp/03.png)

---

**चरण 5 — MCPs tab पर click करें**

![MCPs tab पर click करें](/img/guides/chatgpt-mcp/04.png)

आपने जो MCP servers पहले जोड़े हैं, वे यहां दिखेंगे।

---

**चरण 6 — Add → Add MCP server पर click करें**

![Add और फिर Add MCP server पर click करें](/img/guides/chatgpt-mcp/06.png)

---

**चरण 7 — form भरें और Save पर click करें**

![Custom MCP form से कनेक्ट करें](/img/guides/chatgpt-mcp/07.png)

**Streamable HTTP** पर click करें, फिर भरें:

| Field | क्या डालें |
|---|---|
| **Name** | `B1 Church` (या कोई भी नाम जो आपको पसंद हो) |
| **Type** | **Streamable HTTP** पर click करें |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | खाली छोड़ें |
| **Headers** | **+ Add header** पर click करें → Key: `Authorization` → Value: नीचे देखें |

![उदाहरण: Key में Authorization और Value में Bearer key दिख रही है](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` -- शब्द Bearer, एक space, फिर आपकी key

**Save** पर click करें।

बस हो गया! किसी chat में वापस जाएं और कुछ ऐसा पूछें जैसे *"हमारे church में कितने लोग हैं?"* और ChatGPT सीधे B1 से उत्तर लाएगा।

---

## क्या यह सुरक्षित है?

- ChatGPT केवल **आपके church** का डेटा देख सकता है।
- वह केवल वही कर सकता है जो आपकी key अनुमति देती है -- केवल **read** बॉक्स वाली key देख सकती है, पर कभी कुछ बदल नहीं सकती।
- इसे बंद करने के लिए, B1 Admin में **Settings → Developer** के अंतर्गत key हटाएं। पहुंच तुरंत बंद हो जाती है।

## इसकी लागत कितनी है?

B1 कनेक्शन मुफ़्त है -- यह ChurchApps का हिस्सा है। ChatGPT को कनेक्ट करने के लिए एक भुगतान वाला plan (Plus या उससे ऊपर) चाहिए; OpenAI की pricing देखें।

## तकनीकी विवरण

इस पेज का बाकी हिस्सा तकनीकी उपयोगकर्ताओं और AI assistants के लिए है। B1 का MCP server `https://api.churchapps.org/mcp` पर है (Streamable HTTP) और API key को `Authorization: Bearer cak_…` header के रूप में लेता है। देखें [MCP Server developer reference](/docs/developer/api/mcp)।

### Actions वाला Custom GPT

Custom GPT से आप एक समर्पित assistant बना सकते हैं जिसे आपकी पूरी team साझा कर सकती है -- वे एक link खोलते हैं और उनकी ओर से बिना किसी setup के सवाल पूछना शुरू कर देते हैं। इसके लिए ChatGPT Plus, Team, या Enterprise account और लगभग 10 मिनट चाहिए।

#### 1. API key बनाएं

अगर आपने पहले से नहीं किया है, तो ऊपर "सेट करें" के चरण 1 का पालन करें।

#### 2. Custom GPT बनाएं

1. ChatGPT में, अपने profile → **My GPTs** → **Create a GPT** पर click करें।
2. **Configure** tab पर जाएं, GPT को नाम दें (जैसे "B1 Assistant") और निर्देश जोड़ें:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. **Actions** → **Create new action** → **Authentication** तक scroll करें।
   - **Authentication type:** API Key
   - **API Key:** अपनी `cak_…` key डालें
   - **Auth Type:** Bearer
   - Save करें।

4. **Schema** box में यह starter OpenAPI spec डालें:

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

5. action सेव करें। उसे जांचें: *"चर्च में कितने लोग हैं?"* -- ChatGPT `listPeople` को कॉल करेगा और उत्तर देगा।
6. GPT को **Publish** करें (Only me / Anyone with link / Organization) और link अपनी team के साथ साझा करें।

#### 3. इसका उपयोग करें

जिसके पास भी link है, वह सादी भाषा में सवाल पूछ सकता है। key के scopes फिर भी लागू होते हैं -- केवल-read key write-अनुरोधों को अस्वीकार करती है, भले ही action schema कुछ भी कहे।

---

### सुरक्षा और सीमाएं

- **प्रति-church अलगाव।** API key केवल एक church को पहचानती है। ChatGPT दूसरे churches का डेटा नहीं देख सकता।
- **अनुमति-सीमित।** key केवल वही scopes लेकर चलती है जो आपने दिए हैं। किसी scope को हटाने (key को हटाकर फिर से बनाने) से अगले call पर वह पहुंच बंद हो जाती है।
- **तुरंत रद्द करने योग्य।** **Settings → Developer → API Keys** में key हटाएं और पहुंच तुरंत खत्म हो जाती है।
- **Custom GPT साझा करने से डेटा भी साझा होता है।** GPT तक पहुंच रखने वाला हर व्यक्ति वह सब देख सकता है जो key के scopes अनुमति देते हैं। व्यापक रूप से साझा किए गए GPTs के लिए संकीर्ण scopes चुनें (जैसे `donations:read` छोड़ दें)।
- **Audit trail।** ChatGPT के ज़रिए किए गए किसी भी बदलाव का वही audit log होता है जो B1 Admin की कार्रवाइयों का होता है -- उन्हें **Settings → Audit Log** के अंतर्गत देखें।

### समस्या निवारण

**MCP connector "Unauthorized" कहता है या 401 error दिखाता है:** आपकी API key गायब है या गलत है। connector settings खोलें और **Authorization** header जांचें: मान शब्द `Bearer`, एक space, फिर पूरी `cak_…` key होनी चाहिए, बिना किसी अतिरिक्त space के।

**ChatGPT कहता है कि उसे कुछ डेटा नहीं मिल रहा:** key में शायद सही scopes नहीं हैं। **Settings → Developer → API Keys** में अतिरिक्त scopes के साथ नई key बनाएं और connector अपडेट करें।

**Custom GPT action 401 लौटाता है:** action की authentication panel में पुष्टि करें कि **Auth Type: Bearer** चुना गया है, और key में शब्द `Bearer` शामिल नहीं है (ChatGPT उसे अपने-आप जोड़ता है)।

**Custom GPT action 403 लौटाता है:** key के पास उस endpoint का scope नहीं है। सही scopes के साथ नई key बनाएं और GPT अपडेट करें।

**Action schema अस्वीकार हो जाता है:** ChatGPT को OpenAPI 3.1 चाहिए, जिसमें कम से कम एक `paths` entry और एक `servers` URL हो। चिपकाने से पहले YAML को [editor.swagger.io](https://editor.swagger.io) पर जांचें।

## संबंधित

- [API Keys](/docs/developer/api/api-keys) — पूर्ण scope संदर्भ
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol विवरण और tool schemas
- [Claude](./claude) — वही विचार, Anthropic के models के लिए
- [REST API reference](/docs/developer/api/endpoints) — हर endpoint जिसे Custom GPT action कॉल कर सकता है
