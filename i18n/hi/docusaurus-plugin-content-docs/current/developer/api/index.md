---
title: "API"
description: "ChurchApps API का मॉड्यूलर मोनोलिथ डिज़ाइन, इसके छह डेटा मॉड्यूल, तकनीकी स्टैक, पोर्ट और Lambda फ़ंक्शन समझाता है, साथ ही डेवलपर्स के लिए सेटअप, डेटाबेस, प्रमाणीकरण और एंडपॉइंट दस्तावेज़ों के लिंक।"
---

# API

<div class="article-intro">

ChurchApps API एक **मॉड्यूलर मोनोलिथ** है -- एक ही कोडबेस जो छह डेटा मॉड्यूल की सेवा करता है, जिनमें से हर एक का अपना डेटाबेस है। यह आर्किटेक्चर माइक्रोसर्विसेज़ के संगठनात्मक लाभ (स्पष्ट सीमाएँ, स्वतंत्र डेटा स्टोर) को एकल डिप्लॉयमेंट की परिचालन सरलता के साथ देता है।

</div>

## मॉड्यूल

| मॉड्यूल | उद्देश्य |
|--------|---------|
| **Membership** | लोग, समूह, परिवार (households), अनुमतियाँ |
| **Attendance** | सेवाएँ, सत्र, चेक-इन रिकॉर्ड |
| **Content** | पृष्ठ, सेक्शन, एलिमेंट, स्ट्रीमिंग |
| **Giving** | दान, फंड, भुगतान प्रसंस्करण |
| **Messaging** | बातचीत, सूचनाएँ, ईमेल |
| **Doing** | कार्य, योजनाएँ, असाइनमेंट |

## टेक स्टैक

- **Runtime:** TypeScript (ES modules) के साथ Node.js 24.x
- **Framework:** Express
- **Dependency Injection:** Inversify (decorator-आधारित routing)
- **Database:** MySQL -- हर मॉड्यूल के लिए एक डेटाबेस, हर एक का अपना connection pool
- **Auth:** `CustomAuthProvider` के माध्यम से JWT-आधारित प्रमाणीकरण
- **Deployment:** Serverless Framework v3 के माध्यम से AWS Lambda

## Ports

| प्रोटोकॉल | Port | विवरण |
|----------|------|-------------|
| HTTP | `8084` | मुख्य REST API |
| WebSocket | `8087` | रियल-टाइम सॉकेट कनेक्शन |

## Lambda Functions

जब AWS पर डिप्लॉय किया जाता है, तो API छह Lambda functions के रूप में चलता है:

- **`web`** -- सभी HTTP अनुरोध संभालता है
- **`socket`** -- WebSocket कनेक्शन प्रबंधित करता है
- **`timer15Min`** -- ईमेल सूचनाओं के लिए हर 30 मिनट पर चलता है (नाम ऐतिहासिक है)
- **`timerMidnight`** -- डाइजेस्ट ईमेल और रखरखाव कार्यों के लिए रोज़ चलता है
- **`timerScheduledTasks`** -- देय स्वचालन और अतिदेय वर्कफ़्लो प्रसंस्करण के लिए रोज़ चलता है
- **`timerWebhooks`** -- कतारबद्ध आउटबाउंड webhooks भेजने के लिए हर मिनट चलता है

## साझा लाइब्रेरी

API दो साझा ChurchApps पैकेजों पर निर्भर है:

- **[`@churchapps/helpers`](../shared-libraries/helpers.md)** -- बुनियादी utilities (DateHelper, ApiHelper, आदि)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper.md)** -- Express सर्वर utilities, जिनमें auth, database helpers, और AWS एकीकरण शामिल हैं

:::info
API ES modules (`package.json` में `"type": "module"`) का उपयोग करता है। सुनिश्चित करें कि आपके imports ES module सिंटैक्स का उपयोग करते हैं।
:::

## इस अनुभाग में

- **[Local Setup](./local-setup.md)** -- API को स्थानीय रूप से क्लोन, कॉन्फ़िगर और चलाएँ
- **[Database](./database.md)** -- मॉड्यूल-प्रति-डेटाबेस आर्किटेक्चर, schema scripts, और डेटा access पैटर्न
- **[Module Structure](./module-structure.md)** -- कंट्रोलर, रिपॉज़िटरी, मॉडल, और प्रमाणीकरण
- **[API Keys](./api-keys.md)** -- स्क्रिप्ट और कनेक्टरों के लिए personal access tokens
- **[Connected Apps (OAuth)](./connected-apps.md)** -- तृतीय-पक्ष ऐप्स के लिए मल्टी-टेनेंट OAuth प्रवाह
- **[Webhooks](./webhooks.md)** -- बाहरी सिस्टमों को push इवेंट सूचनाएँ
- **[MCP Server](./mcp.md)** -- Model Context Protocol endpoint जो API को AI सहायकों के लिए उपलब्ध कराता है
- **[Endpoint Reference](./endpoints/index.md)** -- सभी मॉड्यूलों के लिए पूर्ण REST API दस्तावेज़ीकरण
