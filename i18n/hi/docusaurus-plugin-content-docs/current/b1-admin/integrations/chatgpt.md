---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

OpenAI के ChatGPT को अपने चर्च के B1 डेटा से कनेक्ट करें ताकि आप प्रश्न पूछ सकें जैसे "इस त्रैमासिक में कोई किस समूह में नहीं रहा है?" या "इस महीने बिल्डिंग फंड के लिए दान को सारांशित करें" और ChatGPT सीधे B1 से उत्तर खींचे। दो पथ समर्थित हैं: एक **कस्टम GPT** जो किसी भी ChatGPT Plus योजना पर काम करता है, और **MCP सर्वर** डेवलपर उपकरण के लिए जो इसका समर्थन करते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक चर्च प्रशासक जिसके पास **सेटिंग्स संपादित करने** की अनुमति है (एक API कुंजी बनाने के लिए)
- एक **ChatGPT Plus, Pro, Team, या Enterprise** खाता (मुक्त स्तर कस्टम GPTs या कनेक्टर का उपयोग नहीं कर सकता)
- आपके B1 API का पूर्ण URL — आम तौर पर होस्ट किए गए चर्चों के लिए `https://api.churchapps.org`, या आपका स्व-होस्ट किए गए Api होस्ट

</div>

## सही पथ चुनें

| पथ | आवश्यक योजना | प्रयास | आप क्या प्राप्त करते हैं |
|---|---|---|---|
| **कस्टम GPT क्रियाओं के साथ** | ChatGPT Plus / Team / Enterprise | 10 मिनट | एक साझा योग्य GPT जो किसी भी टीम के सदस्य के उपयोग के लिए B1 के REST API को कॉल करता है |
| **MCP OpenAI उपकरण के माध्यम से** | डेवलपर / एजेंट SDK / Pro कनेक्टर | अधिक | MCP सर्वर के माध्यम से पूर्ण खोज, कोडिंग उपकरण और एजेंट प्लेटफॉर्म के लिए उपयुक्त |

अधिकांश चर्चों के लिए **कस्टम GPT** पथ सही उत्तर है — इसके लिए कोई डेवलपर सेटअप की आवश्यकता नहीं है, नियमित ChatGPT ऐप और मोबाइल क्लाइंट के भीतर काम करता है, और आपकी टीम के साथ साझा किया जा सकता है। MCP पथ OpenAI के डेवलपर उपकरण या एजेंट प्लेटफॉर्म का उपयोग करने वाले तकनीकी कर्मचारियों के लिए नीचे दस्तावेज़ित है।

## पथ A — कस्टम GPT क्रियाओं के साथ

यह ChatGPT को सीधे B1 REST API से जोड़ता है। आपका कस्टम GPT B1 रिकॉर्ड को पढ़ने और (वैकल्पिक रूप से) लिखने में सक्षम होगा जो कोई भी इसका उपयोग करता है।

### 1. एक API कुंजी बनाएँ

1. B1Admin में **सेटिंग्स → डेवलपर → API कुंजियाँ** पर जाएँ।
2. **नई API कुंजी** पर क्लिक करें, इसे `ChatGPT` नाम दें और दायरों को चुनें। सामान्य स्टार्टर सेट:
   - **पढ़ने-केवल सहायक:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **पढ़ें + लिखें:** मिलान करने वाले `:write` दायरे जोड़ें
3. सहेजें और पूर्ण `cak_…` कुंजी की प्रतिलिपि बनाएँ।

संपूर्ण दायरा सूची के लिए [API कुंजियाँ](/docs/developer/api/api-keys) देखें।

### 2. कस्टम GPT बनाएँ

1. ChatGPT में, आपकी प्रोफ़ाइल पर क्लिक करें → **मेरे GPT** → **GPT बनाएँ**।
2. **कॉन्फ़िगर** टैब पर स्विच करें और GPT को एक नाम दें (जैसे "B1 असिस्टेंट") और ऐसी निर्देश:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. **क्रियाएँ** तक स्क्रॉल करें → **नई कार्रवाई बनाएँ** → **प्रमाणीकरण**।
   - **प्रमाणीकरण प्रकार:** API कुंजी
   - **API कुंजी:** `cak_<prefix>.<secret>`
   - **प्रमाणीकरण प्रकार:** Bearer
   - सहेजें।
4. **स्कीमा** बॉक्स में, एक न्यूनतम OpenAPI विनिर्देश पेस्ट करें जो उन समापन बिंदुओं का वर्णन करता है जिन्हें आप GPT का उपयोग करना चाहते हैं। एक स्टार्टर जो सबसे सामान्य पढ़ता है:

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

   आवश्यकतानुसार अधिक समापन बिंदुओं के साथ स्कीमा का विस्तार करें — B1 में हर प्रमाणीकृत मार्ग एक ही `cak_…` कुंजी को स्वीकार करता है। [REST API संदर्भ](/docs/developer/api/endpoints) सूचीबद्ध करता है कि क्या उपलब्ध है।

5. कार्रवाई सहेजें। "*चर्च में कितने लोग हैं?*" जैसे संकेत के साथ इसका परीक्षण करें — ChatGPT `listPeople` को कॉल करेगा और उत्तर देगा।
6. GPT को **प्रकाशित** करें (केवल मुझे / किसी के साथ कड़ी / संगठन) और अपनी टीम के साथ साझा करें।

### 3. इसका उपयोग करें

कोई भी आप जिसके साथ GPT को साझा करते हैं वह प्राकृतिक-भाषा प्रश्न पूछ सकते हैं — ChatGPT सही कार्रवाई चुनता है, B1 को कॉल करता है और उत्तर देता है। कुंजी के दायरे अभी भी लागू होते हैं: एक पढ़ने-केवल कुंजी स्कीमा में परिभाषित कार्रवाई की परवाह किए बिना लिखे जाने से इंकार करेगी।

## पथ B — OpenAI उपकरण के माध्यम से MCP

B1 API में `/mcp` पर एक MCP सर्वर शामिल है जो कोई भी MCP-जागरूक OpenAI उपकरण उपयोग कर सकता है — उदाहरण के लिए [OpenAI एजेंट SDK](https://platform.openai.com/docs/guides/agents), प्रतिक्रियाएँ API का MCP उपकरण, या तीसरे पक्ष के एजेंट प्लेटफॉर्म जो MCP सर्वर का उपभोग करते हैं।

`Authorization: Bearer` शीर्षकलेख में समान `cak_…` कुंजी के साथ प्रमाणीकृत करें। तीन उपकरण उजागर होते हैं: `list_endpoints`, `describe_endpoint` और `api_call`। प्रोटोकॉल, परिवहन और उपकरण स्कीमा के लिए [MCP सर्वर डेवलपर संदर्भ](/docs/developer/api/mcp) देखें।

ChatGPT के अंतर्निहित "कनेक्टर" (Pro/Business/Enterprise) वर्तमान में विशिष्ट `search` और `fetch` उपकरण आकार और OAuth-आधारित प्रमाणीकरण की अपेक्षा करते हैं, जिसे B1 MCP सर्वर विज्ञापन नहीं देता। उपभोक्ता ऐप के अंदर ChatGPT के लिए, ऊपर कस्टम GPT पथ व्यावहारिक पसंद है।

## सुरक्षा और सीमाएँ

- **प्रति-चर्च अलग।** API कुंजी एक चर्च को हल करती है। ChatGPT अन्य चर्चों के डेटा को नहीं देख सकता।
- **अनुमति-दायरे।** यदि आप किसी को हटाते हैं जिसकी कुंजी खनन की, तो ChatGPT अगली कॉल पर इसे खो देता है — तुरंत।
- **रद्द योग्य।** **सेटिंग्स → डेवलपर → API कुंजियाँ** में कुंजी को हटाएँ और ChatGPT का एक्सेस तुरंत समाप्त हो जाता है।
- **कस्टम GPT साझा करना डेटा साझा करता है।** जिसके पास GPT तक पहुँच है वह इससे प्रश्न पूछ सकता है और कुंजी के दायरे में कुछ भी देख सकता है। उन कर्मचारियों के लिए साझा करना सीमित करें जिन्हें वह डेटा देखना चाहिए, और संकीर्ण दायरे को वरीयता दें (जैसे, व्यापक रूप से साझा किए गए GPT के लिए `donations:read` छोड़ें)।
- **ऑडिट ट्रेल।** Mutations B1Admin क्रियाओं के समान ऑडिट लॉग के माध्यम से जाते हैं; **रिपोर्ट → ऑडिट लॉग** के तहत उनकी समीक्षा करें।

## लागत

ChurchApps मुक्त और खुला स्रोत है — API जो आपका कस्टम GPT कॉल करता है वह API का हिस्सा है जिसे आपका चर्च पहले से चलाता है। OpenAI अपनी योजना के अनुसार ChatGPT उपयोग के लिए शुल्क लेता है। ChurchApps से कोई प्रति-कॉल लागत नहीं है।

## समस्या निवारण

**कार्रवाई 401 लौटाती है:** bearer शीर्षकलेख सही तरीके से सेट नहीं है। कार्रवाई की प्रमाणीकरण पैनल में सुनिश्चित करें कि **प्रमाणीकरण प्रकार: Bearer** चुना गया है और कुंजी मान में शब्द `Bearer` शामिल नहीं है (ChatGPT आपके लिए इसे तैयार करता है)।

**कार्रवाई 403 लौटाती है:** कुंजी के पास उस समापन बिंदु का दायरा नहीं है। सही दायरों के साथ एक नई कुंजी बनाएँ और GPT को अपडेट करें।

**ChatGPT गलत कार्रवाई को कॉल करता है:** अपनी OpenAPI स्कीमा में `summary` और `description` फ़ील्ड को कसें ताकि मॉडल सही चुने। GPT के निर्देशों में उदाहरण प्रश्न जोड़ना भी मदद करता है।

**कार्रवाई पैनल स्कीमा को अस्वीकार करता है:** ChatGPT के लिए कम से कम एक `paths` प्रविष्टि और `servers` URL के साथ OpenAPI 3.1 की आवश्यकता है। पेस्ट करने से पहले किसी भी ऑनलाइन OpenAPI सत्यापनकर्ता में YAML को सत्यापित करें।

**स्थानीय विकास:** कार्रवाई के `servers` URL को अपने स्थानीय Api (जैसे `http://localhost:8084`) की ओर इशारा करें — लेकिन ध्यान दें कि ChatGPT की क्रियाएँ केवल सार्वजनिक URL को कॉल करती हैं, इसलिए स्थानीय परीक्षण के लिए `ngrok` जैसी सुरंग का उपयोग करें या कुंजी की पुष्टि करने के लिए API को `curl` के साथ सीधे हिट करें।

## संबंधित

- [API कुंजियाँ](/docs/developer/api/api-keys) — संपूर्ण दायरा संदर्भ
- [MCP सर्वर (डेवलपर संदर्भ)](/docs/developer/api/mcp) — प्रोटोकॉल विवरण और उपकरण स्कीमा
- [Claude](./claude) -- Anthropic के मॉडल के लिए एक ही विचार
- [REST API संदर्भ](/docs/developer/api/endpoints) -- हर समापन बिंदु जो कस्टम GPT कार्रवाई को हिट कर सकता है
