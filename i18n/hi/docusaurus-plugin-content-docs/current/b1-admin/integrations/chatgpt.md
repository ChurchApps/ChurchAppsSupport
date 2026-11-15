---
title: "ChatGPT"
description: "API key के साथ ChatGPT को अपने चर्च के B1 डेटा से जोड़ें, ताकि आप B1 Admin में people, giving, और attendance के बारे में सरल भाषा में सवाल पूछ सकें।"
---

# ChatGPT

<div class="article-intro">

ChatGPT को अपने चर्च के B1 डेटा से जोड़ें और सरल भाषा में उससे सवाल पूछें — वह आपके लाइव चर्च रिकॉर्ड से जवाब देता है। आप उससे ऐसे काम भी करवा सकते हैं जिनमें B1 Admin में कई चरण लगते।

**आप ये चीज़ें पूछ सकते हैं:**
- *"मुझे हर उस व्यक्ति की सूची दिखाओ जो पिछले हफ़्ते आया था पर किसी small group में नहीं जोड़ा गया"*
- *"इस महीने की giving का fund के अनुसार सारांश दो"*
- *"हमारे सबसे नए सदस्य कौन हैं और क्या हमने उनसे संपर्क किया है?"*
- *"मैं B1 में X कैसे करूँ, समझ नहीं आ रहा — क्या आप मुझे चरण-दर-चरण बता सकते हैं?"*

</div>

<div class="prereqs">
<h4>आपको क्या चाहिए</h4>

- Mac या Windows के लिए **ChatGPT desktop app**
- **एक भुगतान वाला ChatGPT plan** (Plus या उससे ऊपर)। मुफ़्त ChatGPT accounts B1 से नहीं जुड़ सकते।
- **आपका B1 login**, जिसमें चर्च सेटिंग्स प्रबंधित करने की अनुमति हो (key बनाने के लिए ज़रूरी)। यह नहीं है? अपने चर्च के B1 administrator से पूछें।

</div>

:::tip सुझाव: पहले Claude आज़माएँ — यह मुफ़्त है
[Claude](./claude.md) B1 से अपने **मुफ़्त plan** पर जुड़ता है और 3 मिनट से कम में सेट हो जाता है — बस B1 को connector के रूप में जोड़ें और अपने B1 account से साइन इन करें। कोई key नहीं चाहिए। किसी भी चीज़ के लिए भुगतान करने से पहले आपका चर्च B1 के साथ AI आज़माने का यह सबसे आसान तरीका है।
:::

## इसे सेट करें {#set-it-up}

आपके ChatGPT के संस्करण में स्क्रीन थोड़ी अलग दिख सकती हैं।

---

**चरण 1 — अपनी B1 key बनाएँ**

key ही वह चीज़ है जो ChatGPT को *आपके* चर्च के B1 में प्रवेश देती है — इसे सिर्फ़ ChatGPT के लिए एक password समझें।

1. [B1 Admin](https://admin.b1.church) में लॉग इन करें और [Settings → Developer](https://admin.b1.church/settings/developer) पर जाएँ।
2. **API Keys** tab पर, **New API Key** पर क्लिक करें और उसका नाम `ChatGPT` रखें।
3. **Scopes:** चुनें कि ChatGPT क्या कर सकता है। हर क्षेत्र में एक **read** box (केवल देखना) और एक **write** box (बदलाव करना) होता है। पक्का नहीं? शुरू करने के लिए केवल **read** boxes चेक करें।
4. **Save** पर क्लिक करें, फिर key को **Copy** करें (यह `cak_` से शुरू होती है)। यह केवल एक बार दिखाई जाती है।

---

**चरण 2 — ChatGPT में नीचे-बाईं ओर अपने नाम पर क्लिक करें**

![अपने profile नाम पर क्लिक करें](/img/guides/chatgpt-mcp/01.png)

---

**चरण 3 — Settings पर क्लिक करें**

![मेनू से Settings पर क्लिक करें](/img/guides/chatgpt-mcp/02.png)

---

**चरण 4 — बाईं sidebar में Plugins पर क्लिक करें**

![Integrations के अंतर्गत Plugins पर क्लिक करें](/img/guides/chatgpt-mcp/03.png)

---

**चरण 5 — MCPs tab पर क्लिक करें**

![MCPs tab पर क्लिक करें](/img/guides/chatgpt-mcp/04.png)

जो MCP servers आप पहले ही जोड़ चुके हैं, वे यहाँ दिखेंगे।

---

**चरण 6 — Add → Add MCP server पर क्लिक करें**

![Add और फिर Add MCP server पर क्लिक करें](/img/guides/chatgpt-mcp/06.png)

---

**चरण 7 — फ़ॉर्म भरें और Save पर क्लिक करें**

![custom MCP से जुड़ने का फ़ॉर्म](/img/guides/chatgpt-mcp/07.png)

**Streamable HTTP** पर क्लिक करें, फिर भरें:

| Field | क्या दर्ज करें |
|---|---|
| **Name** | `B1 Church` (या कोई भी नाम जो आपको पसंद हो) |
| **Type** | **Streamable HTTP** पर क्लिक करें |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | खाली छोड़ें |
| **Headers** | **+ Add header** पर क्लिक करें → Key: `Authorization` → Value: नीचे देखें |

![उदाहरण: Key में Authorization और Value में Bearer key](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — शब्द Bearer, एक space, फिर आपकी key

**Save** पर क्लिक करें।

बस हो गया! किसी chat पर वापस जाएँ और पूछें जैसे *"हमारे चर्च में कितने लोग हैं?"* — और ChatGPT जवाब सीधे B1 से लाएगा।

---

## क्या यह सुरक्षित है? {#is-it-safe}

- ChatGPT केवल **आपके चर्च** का डेटा देख सकता है।
- वह केवल वही कर सकता है जिसकी आपकी key अनुमति देती है — जिस key में केवल **read** boxes चेक हों, वह केवल देख सकती है, कभी कुछ बदल नहीं सकती।
- इसे बंद करने के लिए B1 Admin में **Settings → Developer** के अंतर्गत key हटाएँ। पहुँच तुरंत रुक जाती है।

## इसकी लागत क्या है? {#what-does-it-cost}

B1 से जुड़ना मुफ़्त है — यह ChurchApps का हिस्सा है। ChatGPT से जुड़ने के लिए भुगतान वाला plan (Plus या उससे ऊपर) चाहिए; OpenAI की कीमतें देखें।

## तकनीकी विवरण {#technical-details}

इस पेज का बाकी हिस्सा तकनीकी उपयोगकर्ताओं और AI सहायकों के लिए है। B1 का MCP server `https://api.churchapps.org/mcp` पर है (Streamable HTTP) और API key को `Authorization: Bearer cak_…` header के रूप में लेता है। देखें [MCP Server developer reference](/docs/developer/api/mcp)।

### Actions वाला Custom GPT {#custom-gpt-with-actions}

Custom GPT से आप एक समर्पित assistant बना सकते हैं जिसे आपकी पूरी टीम साझा कर सके — वे एक link खोलते हैं और उनकी तरफ़ से कोई सेटअप किए बिना सवाल पूछना शुरू कर देते हैं। इसके लिए ChatGPT Plus, Team, या Enterprise account और लगभग 10 मिनट चाहिए।

#### 1. API key बनाएँ {#1-create-an-api-key}

अगर आपने पहले से नहीं किया है तो ऊपर "इसे सेट करें" के चरण 1 का पालन करें।

#### 2. Custom GPT बनाएँ {#2-build-the-custom-gpt}

1. ChatGPT में अपने profile पर क्लिक करें → **My GPTs** → **Create a GPT**।
2. **Configure** tab पर जाएँ, GPT को एक नाम दें (जैसे "B1 Assistant") और निर्देश जोड़ें:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. **Actions** तक नीचे जाएँ → **Create new action** → **Authentication**।
   - **Authentication type:** API Key
   - **API Key:** अपनी `cak_…` key चिपकाएँ
   - **Auth Type:** Bearer
   - Save करें।

4. **Schema** box में यह starter OpenAPI spec चिपकाएँ:

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
         summary: List everyone in the church
         responses:
           "200":
             description: OK
     /membership/people/search:
       get:
         operationId: searchPeople
         summary: Find people by name, or by exact email
         parameters:
           - in: query
             name: term
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
         summary: List donations for one person, or between two dates (send both startDate and endDate as YYYY-MM-DD)
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
     /attendance/attendancerecords/search:
       get:
         operationId: listAttendance
         summary: List attendance records between two dates, optionally for one campus, service, service time, or group
         parameters:
           - in: query
             name: startDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: endDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: campusId
             schema: { type: string }
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: groupId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. action सेव करें। जाँचें: *"चर्च में कितने लोग हैं?"* — ChatGPT `listPeople` कॉल करता है और जवाब देता है।
6. GPT **Publish** करें (Only me / Anyone with link / Organization) और link अपनी टीम के साथ साझा करें।

#### 3. इसका उपयोग करें {#3-use-it}

link वाला कोई भी व्यक्ति सामान्य भाषा में सवाल पूछ सकता है। key के scopes फिर भी लागू होते हैं — केवल-पढ़ने वाली key action schema चाहे जो कहे, लिखने से इनकार करेगी।

---

### सुरक्षा और सीमाएँ {#safety-and-limits}

- **हर चर्च अलग रहता है।** API key केवल एक चर्च से जुड़ी होती है। ChatGPT दूसरे चर्चों का डेटा नहीं देख सकता।
- **अनुमति-सीमित।** key में केवल वही scopes होते हैं जो आपने दिए। scope हटाने (key हटाकर नई बनाने) से अगली कॉल पर वह पहुँच बंद हो जाती है।
- **तुरंत रद्द।** **Settings → Developer → API Keys** में key हटाएँ और पहुँच तुरंत समाप्त हो जाती है।
- **Custom GPT साझा करने से डेटा भी साझा होता है।** GPT तक पहुँच रखने वाला हर व्यक्ति key के scopes के अनुसार जो कुछ अनुमति है वह देख सकता है। व्यापक रूप से साझा GPTs के लिए संकीर्ण scopes चुनें (जैसे `donations:read` छोड़ दें)।
- **Audit trail।** ChatGPT के ज़रिए किए गए किसी भी बदलाव का B1 Admin की कार्रवाइयों वाला ही audit log होता है — उन्हें **Settings → Audit Log** के अंतर्गत खोजें।

### समस्या निवारण {#troubleshooting}

**MCP connector "Unauthorized" कहता है या 401 error दिखाता है:** आपकी API key गायब है या गलत है। connector settings खोलें और **Authorization** header जाँचें: मान शब्द `Bearer`, एक space, फिर पूरी `cak_…` key होनी चाहिए, बिना किसी अतिरिक्त space के।

**ChatGPT कहता है कि उसे कुछ डेटा नहीं मिल रहा:** key में सही scopes नहीं हो सकते। **Settings → Developer → API Keys** में अतिरिक्त scopes के साथ नई key बनाएँ और connector अपडेट करें।

**Custom GPT action 401 लौटाता है:** action के authentication panel में पुष्टि करें कि **Auth Type: Bearer** चुना है और key में शब्द `Bearer` नहीं है (ChatGPT उसे अपने-आप जोड़ता है)।

**Custom GPT action 403 लौटाता है:** key में उस endpoint के लिए scope नहीं है। सही scopes के साथ नई key बनाएँ और GPT अपडेट करें।

**Action schema अस्वीकार हो जाता है:** ChatGPT को OpenAPI 3.1 चाहिए जिसमें कम से कम एक `paths` entry और एक `servers` URL हो। चिपकाने से पहले YAML को [editor.swagger.io](https://editor.swagger.io) पर जाँचें।

## संबंधित {#related}

- [API Keys](/docs/developer/api/api-keys) — पूरा scope संदर्भ
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol विवरण और tool schemas
- [Claude](./claude.md) — वही विचार, Anthropic के models के लिए
- [REST API reference](/docs/developer/api/endpoints) — हर endpoint जिसे Custom GPT action कॉल कर सकता है
