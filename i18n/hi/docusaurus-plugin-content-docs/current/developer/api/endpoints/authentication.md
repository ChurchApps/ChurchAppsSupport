---
title: "प्रमाणीकरण और अनुमतियाँ"
---

# प्रमाणीकरण और अनुमतियाँ

<div class="article-intro">

ChurchApps API JWT-आधारित प्रमाणीकरण (authentication) का उपयोग करता है। उपयोगकर्ता लॉग इन करके एक टोकन प्राप्त करते हैं, जो उनकी पहचान, चर्च की सदस्यता और अनुमतियों को एन्कोड करता है। यह पेज प्रमाणीकरण प्रवाह, अनुमति मॉडल और OAuth समर्थन को कवर करता है।

</div>

## Login Flow

### Standard Login

```
POST /membership/users/login
```

**Auth:** Public

तीन प्रकार के क्रेडेंशियल में से कोई एक स्वीकार किया जाता है:

| फ़ील्ड | विवरण |
|-------|-------------|
| `email` + `password` | मानक ईमेल/पासवर्ड लॉगिन |
| `jwt` | मौजूदा JWT से पुनः प्रमाणीकरण |
| `authGuid` | एक-बार का प्रमाणीकरण लिंक (स्वागत/रीसेट ईमेल में उपयोग) |

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

`token` फ़ील्ड एक JWT है, जिसे बाद के अनुरोधों में `Authorization: Bearer <token>` के रूप में भेजा जाना चाहिए।

### Token Contents

JWT में एन्कोड होता है:
- `id` — उपयोगकर्ता ID
- `churchId` — वर्तमान में चुना गया चर्च
- `personId` — चुने गए चर्च के लिए व्यक्ति रिकॉर्ड
- प्रति-API अनुमति सूचियाँ

### Church Selection

उपयोगकर्ता कई चर्चों के सदस्य हो सकते हैं। लॉगिन प्रतिक्रिया में उनके अनुमति सहित सभी चर्च शामिल होते हैं। चर्च बदलने के लिए, क्लाइंट लॉगिन प्रतिक्रिया के डेटा से किसी दूसरे चर्च के लिए सीमित एक नया JWT बनाता है।

## User Registration

### Register a New User

```
POST /membership/users/register
```

**Auth:** Public

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

एक अस्थायी पासवर्ड के साथ उपयोगकर्ता बनाता है और प्रमाणीकरण लिंक सहित स्वागत ईमेल भेजता है। किसी नए इंस्टेंस पर पंजीकृत होने वाले पहले उपयोगकर्ता को स्वचालित रूप से सर्वर एडमिन एक्सेस मिलता है।

दो वैकल्पिक बॉट-ट्रैप फ़ील्ड स्वीकार किए जाते हैं: `website` (एक छिपा हुआ हनीपॉट फ़ील्ड जिसे वास्तविक उपयोगकर्ता खाली छोड़ते हैं) और `fillMs` (फ़ॉर्म कितने मिलीसेकंड तक खुला रहा)। यदि `website` भरा गया है या `fillMs` 2000 से कम है, तो कोई खाता नहीं बनता, लेकिन एंडपॉइंट फिर भी सामान्य दिखने वाला `200` लौटाता है, ताकि बॉट यह न जान सकें कि उन्हें अस्वीकार किया गया है। जो क्लाइंट दोनों फ़ील्ड छोड़ते हैं, वे सामान्य रूप से पंजीकृत होते हैं।

### Register a New Church

```
POST /membership/churches/add
```

**Auth:** JWT

उपयोगकर्ता को पंजीकृत करने के बाद, इस एंडपॉइंट को कॉल करके चर्च बनाएँ और उपयोगकर्ता को उससे जोड़ें।

## Password Management

| विधि | पथ | प्रमाणीकरण | विवरण |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | पासवर्ड रीसेट ईमेल भेजें। बॉडी: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | रीसेट ईमेल के auth GUID का उपयोग करके नया पासवर्ड सेट करें। बॉडी: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | वर्तमान उपयोगकर्ता का पासवर्ड बदलें। बॉडी: `{ "newPassword": "..." }` |

## Permission Model

अनुमतियाँ मॉड्यूल के अनुसार व्यवस्थित होती हैं और भूमिकाओं (roles) के माध्यम से उपयोगकर्ताओं को सौंपी जाती हैं। हर अनुमति का एक **content type** और एक **action** होता है।

### Permission Reference

| प्रदर्शन अनुभाग | Content Type | Action | विवरण |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | सेवाओं में सदस्यों का चेक-इन करें |
| | Attendance | Edit | उपस्थिति रिकॉर्ड संपादित करें |
| | Services | Edit | सेवाएँ और सेवा समय प्रबंधित करें |
| | Attendance | View | उपस्थिति रिकॉर्ड देखें |
| | Attendance | View Summary | उपस्थिति सारांश और रिपोर्ट देखें |
| **Donations** | Donations | Edit | दान रिकॉर्ड बनाएँ और संपादित करें |
| | Settings | Edit | दान/भुगतान सेटिंग्स संपादित करें |
| | Donations | View Summary | दान सारांश रिपोर्ट देखें |
| | Donations | View | व्यक्तिगत दान रिकॉर्ड देखें |
| **People and Groups** | Forms | Admin | फ़ॉर्म का पूर्ण प्रशासन |
| | Forms | Edit | फ़ॉर्म परिभाषाएँ संपादित करें |
| | Plans | Edit | सेवा योजनाएँ संपादित करें |
| | Group Members | Edit | समूह सदस्य जोड़ें/हटाएँ |
| | Groups | Edit | समूह बनाएँ और संपादित करें |
| | Households | Edit | परिवार (household) असाइनमेंट संपादित करें |
| | People | Edit | किसी भी व्यक्ति रिकॉर्ड को संपादित करें |
| | People | Edit Self | केवल अपना व्यक्ति रिकॉर्ड संपादित करें |
| | Roles | Edit | भूमिकाएँ और उपयोगकर्ता असाइनमेंट प्रबंधित करें |
| | Group Members | View | समूह सदस्य सूचियाँ देखें |
| | People | View Members | केवल सदस्य देखें (आगंतुक नहीं) |
| | People | View | सभी व्यक्ति देखें |
| | Roles | View | भूमिकाएँ और असाइनमेंट देखें |
| | Settings | Edit | चर्च सेटिंग्स संपादित करें |
| **Content** | Content | Edit | पेज, सेक्शन, एलिमेंट संपादित करें |
| | Settings | Edit | कंटेंट सेटिंग्स संपादित करें |
| | StreamingServices | Edit | स्ट्रीमिंग सेवा कॉन्फ़िगरेशन प्रबंधित करें |
| | Chat | Host | चैट सत्रों की मेज़बानी/मॉडरेशन करें |
| **Messaging** | Texting | Send | SMS टेक्स्ट संदेश भेजें |

### How Permissions Are Checked

कंट्रोलर में, अनुमतियाँ `au.checkAccess()` मेथड से जाँची जाती हैं:

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

### Server Admin

`Server.Admin` अनुमति सभी चर्चों में पूर्ण एक्सेस देती है। यह पहले पंजीकृत उपयोगकर्ता को सौंपी जाती है और सर्वर एडमिन भूमिका के माध्यम से दूसरों को भी दी जा सकती है।

## OAuth 2.0

API तृतीय-पक्ष इंटीग्रेशन के लिए OAuth 2.0 का समर्थन करता है। दो ग्रांट प्रकार उपलब्ध हैं।

### Authorization Code Flow

1. **Authorize:** `POST /membership/oauth/authorize` (JWT आवश्यक)
   - बॉडी: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, केवल `S256`) उन सार्वजनिक क्लाइंट्स के लिए आवश्यक हैं जिनके पास कोई सीक्रेट नहीं है
   - लौटाता है: `{ "code": "...", "state": "..." }`

2. **कोड को टोकन से बदलें:** `POST /membership/oauth/token` (Public)
   - बॉडी: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - जब authorize चरण में `code_challenge` उपयोग हुआ था, तब `code_verifier` भेजें; सार्वजनिक क्लाइंट `client_secret` छोड़ते हैं। JSON या फ़ॉर्म-एन्कोडेड बॉडी स्वीकार की जाती हैं
   - लौटाता है: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Refresh token:** `POST /membership/oauth/token` (Public)
   - बॉडी: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Access tokens **12 घंटे** बाद समाप्त हो जाते हैं।

### Device Code Flow (RFC 8628)

उन उपकरणों के लिए जिनमें ब्राउज़र नहीं है (TV ऐप्स, किओस्क):

1. **Device code का अनुरोध करें:** `POST /membership/oauth/device/authorize` (Public)
   - बॉडी: `{ "client_id": "...", "scope": "..." }`
   - लौटाता है: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **उपयोगकर्ता सत्यापन URI पर कोड दर्ज करता है** और स्वीकृति दें या अस्वीकार करता है

3. **टोकन के लिए पोल करें:** `POST /membership/oauth/token` (Public)
   - बॉडी: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - स्वीकृति मिलने तक `authorization_pending` लौटाता है, फिर access token लौटाता है

### OAuth Client Management

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | सभी OAuth क्लाइंट सूचीबद्ध करें |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | ID के आधार पर क्लाइंट प्राप्त करें |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | client ID के आधार पर क्लाइंट प्राप्त करें (सीक्रेट छिपाया गया) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | क्लाइंट बनाएँ या अपडेट करें |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | क्लाइंट हटाएँ |
| POST | `/membership/oauth/register` | Public | — | सार्वजनिक क्लाइंट्स, जैसे MCP कनेक्टर्स, के लिए डायनामिक क्लाइंट पंजीकरण (RFC 7591)। देखें [Connected Apps](../connected-apps#dynamic-client-registration) |

### Device Approval Endpoints

| विधि | पथ | प्रमाणीकरण | विवरण |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | स्वीकृति UI के लिए लंबित device code की जानकारी प्राप्त करें |
| POST | `/membership/oauth/device/approve` | JWT | device प्राधिकरण स्वीकृत करें। बॉडी: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | device प्राधिकरण अस्वीकार करें। बॉडी: `{ "user_code": "..." }` |

## Public vs Authenticated Endpoints

API दो रैपर फ़ंक्शन का उपयोग करता है जो प्रमाणीकरण आवश्यकताएँ तय करते हैं:

- **`actionWrapper`** — मान्य JWT आवश्यक। प्रमाणित उपयोगकर्ता ऑब्जेक्ट (`au`) `churchId`, `userId` और अनुमति जाँच के साथ उपलब्ध होता है।
- **`actionWrapperAnon`** — प्रमाणीकरण आवश्यक नहीं। लॉगिन, पंजीकरण, सार्वजनिक कंटेंट खोज और webhook रिसीवर के लिए उपयोग होता है।

इस दस्तावेज़ की एंडपॉइंट तालिकाओं में, Auth कॉलम में इन्हें क्रमशः **JWT** और **Public** के रूप में दर्शाया गया है।

## Related Pages

- [Module Structure](../module-structure) — कंट्रोलर, रिपॉज़िटरी और मॉडल कैसे व्यवस्थित हैं
- [Local Setup](../local-setup) — विकास के लिए API को स्थानीय रूप से चलाना
