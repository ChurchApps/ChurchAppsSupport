---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

ChatGPT को अपने चर्च के B1 डेटा से कनेक्ट करें और उससे सरल भाषा में प्रश्न पूछें — यह आपके लाइव चर्च रिकॉर्ड से जवाब देता है। आप उससे उन कामों में मदद भी मांग सकते हैं जिनमें B1 Admin में कई चरण लगेंगे।

**कुछ चीजें जो आप पूछ सकते हैं:**
- *"मुझे वे सभी लोग दिखाएं जो पिछले हफ्ते आए लेकिन किसी छोटे समूह को असाइन नहीं किए गए हैं"*
- *"इस महीने के दान को निधि के अनुसार सारांशित करें"*
- *"हमारे नए सदस्य कौन हैं और क्या हमने उनके साथ अनुवर्ती कार्रवाई की है?"*
- *"मैं B1 में X कैसे करें यह पता नहीं लगा पा रहा हूं — क्या आप मुझे इसके चरण बता सकते हैं?"*

</div>

<div class="prereqs">
<h4>आपको क्या चाहिए</h4>

- Mac या Windows के लिए **ChatGPT डेस्कटॉप ऐप**
- **एक सशुल्क ChatGPT प्लान** (Plus या उससे ऊपर)। मुफ़्त ChatGPT खाते B1 से कनेक्ट नहीं हो सकते।
- चर्च सेटिंग्स प्रबंधित करने की अनुमति के साथ **आपका B1 लॉगिन** (कुंजी बनाने के लिए आवश्यक)। आपके पास नहीं है? अपने चर्च के B1 व्यवस्थापक से पूछें।

</div>

:::tip अनुशंसित: पहले Claude आज़माएं — यह मुफ़्त है
[Claude](./claude) अपने **मुफ़्त प्लान** पर B1 से कनेक्ट होता है और 3 मिनट से भी कम में सेट हो जाता है — बस B1 को एक कनेक्टर के रूप में जोड़ें और अपने B1 खाते से साइन इन करें। किसी कुंजी की ज़रूरत नहीं। किसी भी चीज़ के लिए भुगतान करने से पहले आपके चर्च के लिए B1 के साथ AI आज़माने का यह सबसे आसान तरीका है।
:::

## इसे सेट अप करें

आपके ChatGPT संस्करण में स्क्रीन थोड़ी अलग दिख सकती हैं।

---

**चरण 1 — अपनी B1 कुंजी बनाएं**

कुंजी ही वह चीज़ है जो ChatGPT को *आपके* चर्च के B1 में आने देती है — इसे केवल ChatGPT के लिए एक पासवर्ड की तरह समझें।

1. [B1 Admin](https://admin.b1.church) में लॉग इन करें और [Settings → Developer](https://admin.b1.church/settings/developer) पर जाएं।
2. **API Keys** टैब पर, **New API Key** पर क्लिक करें और इसका नाम `ChatGPT` रखें।
3. **Scopes:** चुनें कि ChatGPT क्या कर सकता है। हर क्षेत्र में एक **read** बॉक्स (केवल देखना) और एक **write** बॉक्स (बदलाव करना) होता है। निश्चित नहीं हैं? शुरुआत में केवल **read** बॉक्स चुनें।
4. **Save** पर क्लिक करें, फिर कुंजी को **Copy** करें (यह `cak_` से शुरू होती है)। यह केवल एक बार दिखाई जाती है।

---

**चरण 2 — ChatGPT के निचले-बाएं कोने में अपने नाम पर क्लिक करें**

![अपने प्रोफ़ाइल नाम पर क्लिक करें](/img/guides/chatgpt-mcp/01.png)

---

**चरण 3 — Settings (सेटिंग्स) पर क्लिक करें**

![मेनू से Settings पर क्लिक करें](/img/guides/chatgpt-mcp/02.png)

---

**चरण 4 — बाईं साइडबार में Plugins पर क्लिक करें**

![Integrations के अंतर्गत Plugins पर क्लिक करें](/img/guides/chatgpt-mcp/03.png)

---

**चरण 5 — MCPs टैब पर क्लिक करें**

![MCPs टैब पर क्लिक करें](/img/guides/chatgpt-mcp/04.png)

आपके द्वारा पहले से जोड़े गए सभी MCP सर्वर आपको यहां दिखाई देंगे।

---

**चरण 6 — Add → Add MCP server पर क्लिक करें**

![Add पर क्लिक करें फिर Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**चरण 7 — फ़ॉर्म भरें और Save पर क्लिक करें**

![कस्टम MCP से कनेक्ट करने का फ़ॉर्म](/img/guides/chatgpt-mcp/07.png)

**Streamable HTTP** पर क्लिक करें, फिर भरें:

| फ़ील्ड | क्या दर्ज करें |
|---|---|
| **Name** | `B1 Church` (या आपकी पसंद का कोई भी नाम) |
| **Type** | **Streamable HTTP** पर क्लिक करें |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | खाली छोड़ दें |
| **Headers** | **+ Add header** पर क्लिक करें → Key: `Authorization` → Value: नीचे देखें |

![भरा हुआ उदाहरण जिसमें Key में Authorization और Value में Bearer कुंजी दिखाई गई है](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — शब्द Bearer, एक स्पेस, फिर आपकी कुंजी

**Save** पर क्लिक करें।

बस इतना ही! किसी चैट पर वापस जाएं और कुछ ऐसा पूछें जैसे *"हमारे चर्च में कितने लोग हैं?"* और ChatGPT सीधे B1 से जवाब लाएगा।

---

## क्या यह सुरक्षित है?

- ChatGPT केवल **आपके चर्च का** डेटा देख सकता है।
- यह केवल वही कर सकता है जो आपकी कुंजी अनुमति देती है — केवल **read** बॉक्स वाली कुंजी देख सकती है लेकिन कभी कुछ नहीं बदल सकती।
- इसे बंद करने के लिए, B1 Admin में **Settings → Developer** के अंतर्गत कुंजी हटा दें। पहुंच तुरंत बंद हो जाती है।

## इसकी लागत क्या है?

B1 कनेक्शन मुफ़्त है — यह ChurchApps का हिस्सा है। कनेक्ट करने के लिए ChatGPT को एक सशुल्क प्लान (Plus या उससे ऊपर) की आवश्यकता होती है; OpenAI का मूल्य निर्धारण देखें।

## तकनीकी विवरण

इस पेज का बाकी हिस्सा तकनीकी उपयोगकर्ताओं और AI सहायकों के लिए है। B1 का MCP सर्वर `https://api.churchapps.org/mcp` (Streamable HTTP) पर है और API कुंजी को `Authorization: Bearer cak_…` हेडर के रूप में लेता है। [MCP सर्वर डेवलपर संदर्भ](/docs/developer/api/mcp) देखें।

### Actions के साथ कस्टम GPT

एक कस्टम GPT आपको एक समर्पित सहायक बनाने देता है जिसे आपकी पूरी टीम साझा कर सकती है — वे एक लिंक खोलते हैं और बिना किसी सेटअप के प्रश्न पूछना शुरू कर देते हैं। इसके लिए ChatGPT Plus, Team, या Enterprise खाते और लगभग 10 मिनट की आवश्यकता होती है।

#### 1. एक API कुंजी बनाएं

यदि आपने पहले से नहीं किया है, तो ऊपर "इसे सेट अप करें" का चरण 1 फ़ॉलो करें।

#### 2. कस्टम GPT बनाएं

1. ChatGPT में, अपनी प्रोफ़ाइल → **My GPTs** → **Create a GPT** पर क्लिक करें।
2. **Configure** टैब पर जाएं, GPT को एक नाम दें (जैसे "B1 Assistant") और निर्देश जोड़ें:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. **Actions** → **Create new action** → **Authentication** तक स्क्रॉल करें।
   - **Authentication type:** API Key
   - **API Key:** अपनी `cak_…` कुंजी पेस्ट करें
   - **Auth Type:** Bearer
   - सेव करें।

4. **Schema** बॉक्स में, यह शुरुआती OpenAPI स्पेक पेस्ट करें:

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

5. action को सेव करें। इसे टेस्ट करें: *"how many people are in the church?"* — ChatGPT `listPeople` को कॉल करता है और जवाब देता है।
6. GPT को **Publish** (प्रकाशित) करें (Only me / Anyone with link / Organization) और लिंक अपनी टीम के साथ साझा करें।

#### 3. इसका उपयोग करें

लिंक वाला कोई भी व्यक्ति सामान्य भाषा में प्रश्न पूछ सकता है। कुंजी के स्कोप फिर भी लागू होते हैं — केवल-पढ़ने वाली कुंजी लिखने से इनकार करती है, चाहे action स्कीमा कुछ भी कहे।

---

### सुरक्षा और सीमाएं

- **प्रति-चर्च अलगाव।** API कुंजी केवल एक चर्च से जुड़ी होती है। ChatGPT अन्य चर्चों का डेटा नहीं देख सकता।
- **अनुमति-सीमित।** कुंजी में केवल वही स्कोप होते हैं जो आपने दिए हैं। किसी स्कोप को हटाने से (कुंजी हटाकर और फिर से बनाकर) अगली कॉल पर वह पहुंच कट जाती है।
- **तुरंत रद्द करने योग्य।** **Settings → Developer → API Keys** में कुंजी हटाएं और पहुंच तुरंत समाप्त हो जाती है।
- **कस्टम GPT साझा करने से डेटा भी साझा होता है।** GPT तक पहुंच रखने वाला हर कोई वह सब देख सकता है जिसकी कुंजी के स्कोप अनुमति देते हैं। व्यापक रूप से साझा किए गए GPT के लिए सीमित स्कोप चुनें (जैसे `donations:read` छोड़ दें)।
- **ऑडिट ट्रेल।** ChatGPT के माध्यम से किए गए सभी बदलाव उसी ऑडिट लॉग से गुज़रते हैं जिससे B1 Admin की कार्रवाइयां गुज़रती हैं — उन्हें **Settings → Audit Log** के अंतर्गत देखें।

### समस्या निवारण

**MCP कनेक्टर "Unauthorized" कहता है या 401 त्रुटि दिखाता है:** आपकी API कुंजी गायब है या गलत है। कनेक्टर सेटिंग्स खोलें और **Authorization** हेडर जांचें: मान में शब्द `Bearer` , एक स्पेस, फिर पूरी `cak_…` कुंजी होनी चाहिए, बिना किसी अतिरिक्त स्पेस के।

**ChatGPT कहता है कि उसे कुछ डेटा नहीं मिल रहा:** हो सकता है कुंजी के पास सही स्कोप न हों। **Settings → Developer → API Keys** में अतिरिक्त स्कोप के साथ एक नई कुंजी बनाएं और कनेक्टर अपडेट करें।

**कस्टम GPT action 401 लौटाता है:** action के प्रमाणीकरण पैनल में पुष्टि करें कि **Auth Type: Bearer** चुना गया है और कुंजी में शब्द `Bearer` शामिल नहीं है (ChatGPT इसे स्वचालित रूप से जोड़ता है)।

**कस्टम GPT action 403 लौटाता है:** कुंजी के पास उस endpoint का स्कोप नहीं है। सही स्कोप के साथ एक नई कुंजी बनाएं और GPT अपडेट करें।

**action स्कीमा अस्वीकार कर दिया जाता है:** ChatGPT को कम से कम एक `paths` प्रविष्टि और एक `servers` URL के साथ OpenAPI 3.1 चाहिए। पेस्ट करने से पहले YAML को [editor.swagger.io](https://editor.swagger.io) पर सत्यापित करें।

## संबंधित

- [API Keys](/docs/developer/api/api-keys) — पूर्ण स्कोप संदर्भ
- [MCP सर्वर (डेवलपर संदर्भ)](/docs/developer/api/mcp) — प्रोटोकॉल विवरण और टूल स्कीमा
- [Claude](./claude) — वही विचार, Anthropic के मॉडल के लिए
- [REST API संदर्भ](/docs/developer/api/endpoints) — हर endpoint जिसे एक कस्टम GPT action कॉल कर सकता है
