---
title: "प्रमाणीकरण और अनुमतियाँ"
---

# प्रमाणीकरण और अनुमतियाँ

<div class="article-intro">

ChurchApps API JWT-आधारित प्रमाणीकरण का उपयोग करता है। उपयोगकर्ता लॉग इन करके एक टोकन प्राप्त करते हैं, जो उनकी पहचान, चर्च की सदस्यता और अनुमतियों को एन्कोड करता है। यह पृष्ठ प्रमाणीकरण प्रवाह, अनुमति मॉडल और OAuth समर्थन को कवर करता है।

</div>

## लॉगिन प्रवाह

### मानक लॉगिन

```
POST /membership/users/login
```

**Auth:** Public

तीन प्रकार के क्रेडेंशियल में से एक स्वीकार करता है:

| फ़ील्ड | विवरण |
|-------|-------------|
| `email` + `password` | मानक ईमेल/पासवर्ड लॉगिन |
| `jwt` | मौजूदा JWT के साथ पुनः प्रमाणीकरण |
| `authGuid` | एक बार का प्रमाणीकरण लिंक (स्वागत/रीसेट ईमेल में उपयोग) |

**Response:**

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

### दो-चरणीय साइन-इन

उपयोगकर्ता ऑथेंटिकेटर-ऐप (TOTP) दो-चरणीय साइन-इन चालू कर सकते हैं। ऐसे उपयोगकर्ताओं के लिए, `email` + `password`, `authGuid`, या SSO लॉगिन टोकन नहीं लौटाता। इसके बजाय एक चुनौती (challenge) लौटाता है:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

चुनौती टोकन 5 मिनट तक मान्य है। कोड के साथ उसे उसी endpoint पर वापस भेजें:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` वर्तमान 6-अंकों का ऑथेंटिकेटर कोड या उपयोगकर्ता के दस एक-बार-उपयोग वाले बैकअप कोडों में से एक हो सकता है। गलत कोड `Invalid code` लौटाता है, और बार-बार विफलताएँ प्रति खाता दर-सीमित (rate limited) होती हैं। `jwt` पुनः-लॉगिन पर कभी चुनौती नहीं दी जाती, इसलिए मौजूदा सत्र ताज़ा होते रहते हैं। लॉगिन प्रतिक्रिया की `user` ऑब्जेक्ट में `mfaEnabled` होता है।

स्व-सेवा endpoints (केवल साइन-इन उपयोगकर्ता के लिए, `/membership/users/mfa` के अंतर्गत):

| Endpoint | विवरण |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | सेटअप शुरू करता है; QR कोड के लिए `{ secret, otpauthUrl }` लौटाता है |
| `POST /enable` | Body `{ code }`; इसे चालू करता है और `{ backupCodes }` एक बार लौटाता है |
| `POST /disable` | Body `{ code }` (ऑथेंटिकेटर या बैकअप कोड); इसे बंद करता है |
| `POST /reset/:userId` | केवल Server.Admin; किसी अन्य उपयोगकर्ता के लिए इसे बंद करता है |

Secrets एन्क्रिप्टेड रूप में संग्रहीत होते हैं और बैकअप कोड हैश के रूप में। चालू करना, बंद करना, और रीसेट ऑडिट लॉग में दर्ज होते हैं।

### टोकन सामग्री

JWT इनको एन्कोड करता है:
- `id` — उपयोगकर्ता ID
- `churchId` — वर्तमान में चुना गया चर्च
- `personId` — चुने गए चर्च के लिए व्यक्ति रिकॉर्ड
- प्रति-API अनुमति सरणियाँ

### चर्च चयन

उपयोगकर्ता कई चर्चों के सदस्य हो सकते हैं। लॉगिन प्रतिक्रिया में उनकी अनुमतियों के साथ सभी चर्च शामिल होते हैं। चर्च बदलने के लिए, क्लाइंट लॉगिन प्रतिक्रिया के डेटा से किसी दूसरे चर्च के लिए सीमित एक नया JWT बनाता है।

## उपयोगकर्ता पंजीकरण

### नया उपयोगकर्ता पंजीकृत करना

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

एक अस्थायी पासवर्ड के साथ उपयोगकर्ता बनाता है और प्रमाणीकरण लिंक के साथ एक स्वागत ईमेल भेजता है। एक नए इंस्टेंस पर पंजीकृत पहले उपयोगकर्ता को स्वचालित रूप से server admin पहुँच दी जाती है।

दो वैकल्पिक bot-trap फ़ील्ड स्वीकार किए जाते हैं: `website` (एक छिपा हुआ honeypot फ़ील्ड जिसे वास्तविक उपयोगकर्ता खाली छोड़ते हैं) और `fillMs` (फ़ॉर्म कितनी देर खुला रहा, मिलीसेकंड में)। यदि `website` भरा है या `fillMs` 2000 से कम है, तो कोई खाता नहीं बनाया जाता, लेकिन endpoint फिर भी एक सामान्य दिखने वाला `200` लौटाता है, ताकि बॉट यह न जान सकें कि उन्हें अस्वीकार किया गया है। जो क्लाइंट दोनों फ़ील्ड छोड़ते हैं, वे सामान्य रूप से पंजीकरण करते हैं।

### नया चर्च पंजीकृत करना

```
POST /membership/churches/add
```

**Auth:** JWT

एक उपयोगकर्ता पंजीकृत करने के बाद, चर्च बनाने और उपयोगकर्ता को उससे जोड़ने के लिए इस endpoint को कॉल करें।

## पासवर्ड प्रबंधन

| Method | Path | Auth | विवरण |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | पासवर्ड रीसेट ईमेल भेजें। Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | रीसेट ईमेल के auth GUID से नया पासवर्ड सेट करें। Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | वर्तमान उपयोगकर्ता का पासवर्ड बदलें। Body: `{ "newPassword": "..." }` |

## अनुमति मॉडल

अनुमतियाँ मॉड्यूल के अनुसार व्यवस्थित होती हैं और भूमिकाओं के माध्यम से उपयोगकर्ताओं को सौंपी जाती हैं। हर अनुमति का एक **content type** और एक **action** होता है।

### अनुमति संदर्भ

| Display Section | Content Type | Action | विवरण |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | सेवाओं में सदस्यों को चेक इन करें |
| | Attendance | Edit | उपस्थिति रिकॉर्ड संपादित करें |
| | Services | Edit | सेवाएँ और सेवा समय प्रबंधित करें |
| | Attendance | View | उपस्थिति रिकॉर्ड देखें |
| | Attendance | View Summary | उपस्थिति सारांश और रिपोर्ट देखें |
| **Donations** | Donations | Edit | दान रिकॉर्ड बनाएँ और संपादित करें |
| | Settings | Edit | giving/भुगतान सेटिंग्स संपादित करें |
| | Donations | View Summary | दान सारांश रिपोर्ट देखें |
| | Donations | View | व्यक्तिगत दान रिकॉर्ड देखें |
| **People and Groups** | Forms | Admin | फ़ॉर्म का पूर्ण प्रशासन |
| | Forms | Edit | फ़ॉर्म परिभाषाएँ संपादित करें |
| | Plans | Edit | सेवा योजनाएँ संपादित करें |
| | Group Members | Edit | समूह सदस्य जोड़ें/हटाएँ |
| | Groups | Edit | समूह बनाएँ और संपादित करें |
| | Households | Edit | household असाइनमेंट संपादित करें |
| | People | Edit | कोई भी व्यक्ति रिकॉर्ड संपादित करें |
| | People | Edit Self | केवल अपना व्यक्ति रिकॉर्ड संपादित करें |
| | Roles | Edit | भूमिकाएँ और उपयोगकर्ता असाइनमेंट प्रबंधित करें |
| | Group Members | View | समूह सदस्य सूचियाँ देखें |
| | People | View Members | केवल सदस्य देखें (आगंतुक नहीं) |
| | People | View | सभी लोग देखें |
| | Roles | View | भूमिकाएँ और असाइनमेंट देखें |
| | Settings | Edit | चर्च सेटिंग्स संपादित करें |
| **Content** | Content | Edit | पेज, अनुभाग, एलिमेंट संपादित करें |
| | Settings | Edit | सामग्री सेटिंग्स संपादित करें |
| | StreamingServices | Edit | स्ट्रीमिंग सेवा कॉन्फ़िगरेशन प्रबंधित करें |
| | Chat | Host | चैट सत्रों की मेज़बानी/संचालन करें |
| **Messaging** | Texting | Send | SMS टेक्स्ट संदेश भेजें |

### अनुमतियाँ कैसे जाँची जाती हैं

Controllers में, अनुमतियाँ `au.checkAccess()` मेथड से जाँची जाती हैं:

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

`Server.Admin` अनुमति सभी चर्चों में पूर्ण पहुँच देती है। यह पहले पंजीकृत उपयोगकर्ता को दी जाती है और server admin भूमिका के माध्यम से दूसरों को दी जा सकती है।

## OAuth 2.0

API तीसरे-पक्ष एकीकरण के लिए OAuth 2.0 समर्थित करता है। दो grant types उपलब्ध हैं।

### Authorization Code Flow

1. **Authorize:** `POST /membership/oauth/authorize` (JWT आवश्यक)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, केवल `S256`) उन public clients के लिए आवश्यक हैं जिनके पास secret नहीं है
   - लौटाता है: `{ "code": "...", "state": "..." }`

2. **कोड को टोकन से बदलें:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - जब authorize चरण में `code_challenge` उपयोग हुआ हो तो `code_verifier` भेजें; public clients `client_secret` छोड़ते हैं। JSON या form-encoded body दोनों स्वीकार्य हैं
   - लौटाता है: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Refresh token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Access tokens **12 घंटे** बाद समाप्त हो जाते हैं।

### Device Code Flow (RFC 8628)

ब्राउज़र के बिना डिवाइसों के लिए (TV ऐप, किओस्क):

1. **Device code का अनुरोध करें:** `POST /membership/oauth/device/authorize` (Public)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - लौटाता है: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **उपयोगकर्ता verification URI पर कोड दर्ज करता है** और स्वीकृत या अस्वीकृत करता है

3. **टोकन के लिए poll करें:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - स्वीकृति होने तक `authorization_pending` लौटाता है, फिर access token लौटाता है

### OAuth क्लाइंट प्रबंधन

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | सभी OAuth क्लाइंट सूचीबद्ध करें |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | ID से क्लाइंट प्राप्त करें |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | client ID से क्लाइंट प्राप्त करें (secret छिपा हुआ) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | क्लाइंट बनाएँ या अपडेट करें |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | क्लाइंट हटाएँ |
| POST | `/membership/oauth/register` | Public | — | public clients जैसे MCP connectors के लिए Dynamic client registration (RFC 7591)। देखें [Connected Apps](../connected-apps#dynamic-client-registration) |

### Device Approval Endpoints

| Method | Path | Auth | विवरण |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | approval UI के लिए लंबित device code जानकारी प्राप्त करें |
| POST | `/membership/oauth/device/approve` | JWT | device authorization स्वीकृत करें। Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | device authorization अस्वीकृत करें। Body: `{ "user_code": "..." }` |

## सार्वजनिक बनाम प्रमाणित Endpoints

API दो wrapper functions का उपयोग करता है जो प्रमाणीकरण आवश्यकताएँ तय करते हैं:

- **`actionWrapper`** — वैध JWT आवश्यक है। प्रमाणित उपयोगकर्ता ऑब्जेक्ट (`au`) `churchId`, `userId`, और अनुमति जाँचों के साथ उपलब्ध है।
- **`actionWrapperAnon`** — कोई प्रमाणीकरण आवश्यक नहीं। लॉगिन, पंजीकरण, सार्वजनिक सामग्री खोज, और webhook receivers के लिए उपयोग होता है।

इस दस्तावेज़ की endpoint तालिकाओं में, इन्हें Auth कॉलम में क्रमशः **JWT** और **Public** के रूप में दर्शाया गया है।

## संबंधित पृष्ठ

- [Module Structure](../module-structure) — controllers, repositories, और models कैसे व्यवस्थित हैं
- [Local Setup](../local-setup) — विकास के लिए API को स्थानीय रूप से चलाना
