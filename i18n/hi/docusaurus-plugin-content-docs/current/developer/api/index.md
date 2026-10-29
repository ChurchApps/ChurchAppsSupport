---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API एक **modular monolith** है -- एक ही codebase जो छह डेटा मॉड्यूल की सेवा करता है, जिनमें से हर एक का अपना डेटाबेस है। यह आर्किटेक्चर माइक्रोसर्विसेज़ के संगठनात्मक लाभ (स्पष्ट सीमाएँ, स्वतंत्र डेटा स्टोर) को एक ही deployment की परिचालन सरलता के साथ देता है।

</div>

## मॉड्यूल

| Module | उद्देश्य |
|--------|---------|
| **Membership** | लोग, समूह, households, अनुमतियाँ |
| **Attendance** | सेवाएँ, sessions, चेक-इन रिकॉर्ड |
| **Content** | पेज, sections, elements, streaming |
| **Giving** | दान, फंड, भुगतान प्रसंस्करण |
| **Messaging** | बातचीत, सूचनाएँ, ईमेल |
| **Doing** | कार्य, योजनाएँ, असाइनमेंट |

## तकनीकी स्टैक

- **Runtime:** Node.js 24.x with TypeScript (ES modules)
- **Framework:** Express
- **Dependency Injection:** Inversify (decorator-based routing)
- **Database:** MySQL -- हर मॉड्यूल के लिए एक डेटाबेस, हर एक का अपना connection pool
- **Auth:** `CustomAuthProvider` के माध्यम से JWT-आधारित प्रमाणीकरण
- **Deployment:** Serverless Framework v3 के माध्यम से AWS Lambda

## Ports

| Protocol | Port | विवरण |
|----------|------|-------------|
| HTTP | `8084` | मुख्य REST API |
| WebSocket | `8087` | रियल-टाइम socket कनेक्शन |

## Lambda Functions

AWS पर deploy होने पर, API छह Lambda functions के रूप में चलता है:

- **`web`** -- सभी HTTP अनुरोध संभालता है
- **`socket`** -- WebSocket कनेक्शन प्रबंधित करता है
- **`timer15Min`** -- ईमेल सूचनाओं के लिए हर 30 मिनट में चलता है (नाम ऐतिहासिक है)
- **`timerMidnight`** -- डाइजेस्ट ईमेल और रखरखाव कार्यों के लिए रोज़ चलता है
- **`timerScheduledTasks`** -- देय automations और लंबित workflow प्रसंस्करण के लिए रोज़ चलता है
- **`timerWebhooks`** -- कतार में लगे outbound webhooks भेजने के लिए हर मिनट चलता है

## साझा लाइब्रेरी

API दो साझा ChurchApps packages पर निर्भर है:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- बुनियादी utilities (DateHelper, ApiHelper, आदि)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express server utilities, जिनमें auth, database helpers, और AWS integrations शामिल हैं

:::info
API ES modules का उपयोग करता है (`package.json` में `"type": "module"`)। सुनिश्चित करें कि आपके imports ES module syntax में हों।
:::

## इस अनुभाग में

- **[Local Setup](./local-setup)** -- API को स्थानीय रूप से clone, कॉन्फ़िगर और चलाएँ
- **[Database](./database)** -- मॉड्यूल-प्रति-डेटाबेस आर्किटेक्चर, schema scripts, और डेटा एक्सेस पैटर्न
- **[Module Structure](./module-structure)** -- Controllers, repositories, models, और authentication
- **[API Keys](./api-keys)** -- scripts और connectors के लिए personal access tokens
- **[Connected Apps (OAuth)](./connected-apps)** -- तृतीय-पक्ष ऐप्स के लिए multi-tenant OAuth flow
- **[Webhooks](./webhooks)** -- बाहरी सिस्टम को push इवेंट सूचनाएँ
- **[MCP Server](./mcp)** -- Model Context Protocol endpoint जो API को AI सहायकों के सामने लाता है
- **[Endpoint Reference](./endpoints/)** -- सभी मॉड्यूलों के लिए पूर्ण REST API दस्तावेज़ीकरण
