---
title: "प्रमाणीकरण और अनुमतियां"
---

# प्रमाणीकरण और अनुमतियां {#authentication--permissions}

<div class="article-intro">

ChurchApps API JWT-आधारित प्रमाणीकरण का उपयोग करता है। उपयोगकर्ता लॉग इन करके एक टोकन प्राप्त करते हैं, जिसमें उनकी पहचान, चर्च की सदस्यता और अनुमतियां एन्कोड होती हैं। यह पेज ऑथ फ़्लो, अनुमति मॉडल और OAuth समर्थन को कवर करता है।

</div>

## लॉगिन फ़्लो {#login-flow}

### स्टैंडर्ड लॉगिन {#standard-login}

```
POST /membership/users/login
```

**प्रमाणीकरण:** सार्वजनिक

तीन प्रकार के क्रेडेंशियल में से कोई एक स्वीकार किया जाता है:

| फ़ील्ड | विवरण |
|-------|------|
| `email` + `password` | मानक ईमेल/पासवर्ड लॉगिन |
| `jwt` | मौजूदा JWT से पुनः प्रमाणीकरण |
| `authGuid` | एक बार उपयोग होने वाला ऑथ लिंक (स्वागत और पासवर्ड रीसेट ईमेल में उपयोग होता है) |

**प्रतिक्रिया:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

`token` फ़ील्ड एक JWT है, जिसे बाद के अनुरोधों में `Authorization: Bearer <token>` के रूप में भेजना चाहिए।

### टोकन की सामग्री {#token-contents}

JWT में ये जानकारियां एन्कोड होती हैं:
- `id` — उपयोगकर्ता ID
- `churchId` — वर्तमान में चुना गया चर्च
- `personId` — चुने गए चर्च के लिए व्यक्ति रिकॉर्ड
- प्रति-API अनुमति सरणियां

### चर्च चयन {#church-selection}

उपयोगकर्ता कई चर्चों के सदस्य हो सकते हैं। लॉगिन प्रतिक्रिया में उनकी अनुमतियों सहित सभी चर्च शामिल होते हैं। किसी दूसरे चर्च पर स्विच करने के लिए, क्लाइंट लॉगिन प्रतिक्रिया के डेटा से उस चर्च तक सीमित एक नया JWT तैयार करता है।

## उपयोगकर्ता पंजीकरण {#user-registration}

### नया उपयोगकर्ता पंजीकृत करें {#register-a-new-user}

```
POST /membership/users/register
```

**प्रमाणीकरण:** सार्वजनिक

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

एक अस्थायी पासवर्ड के साथ उपयोगकर्ता बनाया जाता है और ऑथ लिंक सहित एक स्वागत ईमेल भेजा जाता है। किसी नए इंस्टेंस पर पंजीकृत होने वाले पहले उपयोगकर्ता को अपने-आप सर्वर एडमिन एक्सेस मिल जाता है।

दो वैकल्पिक बॉट-ट्रैप फ़ील्ड स्वीकार किए जाते हैं: `website` (एक छिपा हुआ हनीपॉट फ़ील्ड, जिसे वास्तविक उपयोगकर्ता खाली छोड़ते हैं) और `fillMs` (फ़ॉर्म कितनी देर तक खुला रहा, मिलीसेकंड में)। यदि `website` भरा गया है या `fillMs` 2000 से कम है, तो कोई खाता नहीं बनता, लेकिन एंडपॉइंट फिर भी एक सामान्य दिखने वाला `200` लौटाता है, ताकि बॉट यह न पहचान सकें कि उन्हें अस्वीकार किया गया है। जो क्लाइंट दोनों फ़ील्ड छोड़ते हैं, वे सामान्य रूप से पंजीकरण करते हैं।

### नया चर्च पंजीकृत करें {#register-a-new-church}

```
POST /membership/churches/add
```

**प्रमाणीकरण:** JWT

उपयोगकर्ता पंजीकृत करने के बाद, चर्च बनाने और उपयोगकर्ता को उससे जोड़ने के लिए इस एंडपॉइंट को कॉल करें।

## पासवर्ड प्रबंधन {#password-management}

| विधि | पथ | प्रमाणीकरण | विवरण |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | सार्वजनिक | पासवर्ड रीसेट ईमेल भेजें। Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | सार्वजनिक | रीसेट ईमेल के auth GUID का उपयोग करके नया पासवर्ड सेट करें। Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | वर्तमान उपयोगकर्ता का पासवर्ड बदलें। Body: `{ "newPassword": "..." }` |

## अनुमति मॉडल {#permission-model}

अनुमतियां मॉड्यूल के अनुसार व्यवस्थित होती हैं और भूमिकाओं के माध्यम से उपयोगकर्ताओं को सौंपी जाती हैं। प्रत्येक अनुमति का एक **कंटेंट प्रकार** और एक **क्रिया** होती है।

### अनुमति संदर्भ {#permission-reference}

| प्रदर्शन अनुभाग | कंटेंट प्रकार | क्रिया | विवरण |
|----------------|--------------|--------|-------------|
| **उपस्थिति** | Attendance | Checkin | सेवाओं में सदस्यों की चेक-इन करें |
| | Attendance | Edit | उपस्थिति रिकॉर्ड संपादित करें |
| | Services | Edit | सेवाएं और सेवा समय प्रबंधित करें |
| | Attendance | View | उपस्थिति रिकॉर्ड देखें |
| | Attendance | View Summary | उपस्थिति सारांश और रिपोर्ट देखें |
| **दान** | Donations | Edit | दान रिकॉर्ड बनाएं और संपादित करें |
| | Settings | Edit | दान/भुगतान सेटिंग्स संपादित करें |
| | Donations | View Summary | दान सारांश रिपोर्ट देखें |
| | Donations | View | व्यक्तिगत दान रिकॉर्ड देखें |
| **लोग और समूह** | Forms | Admin | फ़ॉर्म का पूर्ण प्रशासन |
| | Forms | Edit | फ़ॉर्म परिभाषाएं संपादित करें |
| | Plans | Edit | सेवा योजनाएं संपादित करें |
| | Group Members | Edit | समूह सदस्य जोड़ें/हटाएं |
| | Groups | Edit | समूह बनाएं और संपादित करें |
| | Households | Edit | परिवार असाइनमेंट संपादित करें |
| | People | Edit | किसी भी व्यक्ति रिकॉर्ड को संपादित करें |
| | People | Edit Self | केवल अपना व्यक्ति रिकॉर्ड संपादित करें |
| | Roles | Edit | भूमिकाएं और उपयोगकर्ता असाइनमेंट प्रबंधित करें |
| | Group Members | View | समूह सदस्य सूचियां देखें |
| | People | View Members | केवल सदस्य देखें (आगंतुक नहीं) |
| | People | View | सभी लोग देखें |
| | Roles | View | भूमिकाएं और असाइनमेंट देखें |
| | Settings | Edit | चर्च सेटिंग्स संपादित करें |
| **कंटेंट** | Content | Edit | पेज, सेक्शन, एलिमेंट संपादित करें |
| | Settings | Edit | कंटेंट सेटिंग्स संपादित करें |
| | StreamingServices | Edit | स्ट्रीमिंग सेवा कॉन्फ़िगरेशन प्रबंधित करें |
| | Chat | Host | चैट सत्रों की होस्टिंग/मॉडरेशन करें |
| **मैसेजिंग** | Texting | Send | SMS टेक्स्ट संदेश भेजें |

### अनुमतियां कैसे जांची जाती हैं {#how-permissions-are-checked}

कंट्रोलर में, अनुमतियां `au.checkAccess()` मेथड से जांची जाती हैं:

```typescript
// Require specific permission
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Or within actionWrapper — the CRUD system checks automatically
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### सर्वर एडमिन {#server-admin}

`Server.Admin` अनुमति सभी चर्चों में पूर्ण एक्सेस देती है। यह पहले पंजीकृत उपयोगकर्ता को दी जाती है, और सर्वर एडमिन भूमिका के माध्यम से दूसरों को भी दी जा सकती है।

## OAuth 2.0 {#oauth-20}

API तृतीय-पक्ष एकीकरण के लिए OAuth 2.0 समर्थित करता है। दो ग्रांट प्रकार उपलब्ध हैं।

### ऑथराइज़ेशन कोड फ़्लो {#authorization-code-flow}

1. **ऑथराइज़ करें:** `POST /membership/oauth/authorize` (JWT आवश्यक)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, केवल `S256`) उन सार्वजनिक क्लाइंट्स के लिए आवश्यक हैं जिनका कोई secret नहीं है
   - लौटाता है: `{ "code": "...", "state": "..." }`

2. **कोड को टोकन से बदलें:** `POST /membership/oauth/token` (सार्वजनिक)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - authorize चरण में `code_challenge` का उपयोग हुआ हो, तो `code_verifier` भेजें; सार्वजनिक क्लाइंट `client_secret` छोड़ते हैं। JSON या form-encoded बॉडी दोनों स्वीकार की जाती हैं
   - लौटाता है: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **रिफ़्रेश टोकन:** `POST /membership/oauth/token` (सार्वजनिक)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

एक्सेस टोकन **12 घंटे** बाद समाप्त हो जाते हैं।

### डिवाइस कोड फ़्लो (RFC 8628) {#device-code-flow-rfc-8628}

उन डिवाइसों के लिए जिनमें ब्राउज़र नहीं है (जैसे TV ऐप्स, किओस्क):

1. **डिवाइस कोड का अनुरोध करें:** `POST /membership/oauth/device/authorize` (सार्वजनिक)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - लौटाता है: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **उपयोगकर्ता सत्यापन URI पर कोड दर्ज करता है** और स्वीकृत या अस्वीकृत करता है

3. **टोकन के लिए पोल करें:** `POST /membership/oauth/token` (सार्वजनिक)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - स्वीकृत होने तक `authorization_pending` लौटाता है, और उसके बाद एक्सेस टोकन लौटाता है

### OAuth क्लाइंट प्रबंधन {#oauth-client-management}

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | सभी OAuth क्लाइंट सूचीबद्ध करें |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | ID द्वारा क्लाइंट प्राप्त करें |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | client ID द्वारा क्लाइंट प्राप्त करें (secret छिपा हुआ) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | क्लाइंट बनाएं या अपडेट करें |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | क्लाइंट हटाएं |
| POST | `/membership/oauth/register` | सार्वजनिक | — | MCP कनेक्टर्स जैसे सार्वजनिक क्लाइंट्स के लिए डायनामिक क्लाइंट पंजीकरण (RFC 7591)। देखें [कनेक्टेड ऐप्स](../connected-apps#dynamic-client-registration) |

### डिवाइस अनुमोदन एंडपॉइंट {#device-approval-endpoints}

| विधि | पथ | प्रमाणीकरण | विवरण |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | अनुमोदन UI के लिए लंबित डिवाइस कोड की जानकारी प्राप्त करें |
| POST | `/membership/oauth/device/approve` | JWT | डिवाइस प्राधिकरण स्वीकृत करें। Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | डिवाइस प्राधिकरण अस्वीकृत करें। Body: `{ "user_code": "..." }` |

## सार्वजनिक बनाम प्रमाणित एंडपॉइंट {#public-vs-authenticated-endpoints}

API दो रैपर फ़ंक्शन का उपयोग करता है, जो तय करते हैं कि प्रमाणीकरण आवश्यक है या नहीं:

- **`actionWrapper`** — वैध JWT आवश्यक है। प्रमाणित उपयोगकर्ता ऑब्जेक्ट (`au`) `churchId`, `userId` और अनुमति जांच के साथ उपलब्ध होता है।
- **`actionWrapperAnon`** — कोई प्रमाणीकरण आवश्यक नहीं। इसका उपयोग लॉगिन, पंजीकरण, सार्वजनिक कंटेंट लुकअप और वेबहुक रिसीवर के लिए होता है।

इस दस्तावेज़ की सभी एंडपॉइंट तालिकाओं में, इन्हें Auth कॉलम में क्रमशः **JWT** और **सार्वजनिक** के रूप में दर्शाया गया है।

## संबंधित पेज {#related-pages}

- [मॉड्यूल संरचना](../module-structure) — कंट्रोलर, रिपॉज़िटरी और मॉडल कैसे व्यवस्थित हैं
- [लोकल सेटअप](../local-setup) — विकास के लिए API को स्थानीय रूप से चलाना
