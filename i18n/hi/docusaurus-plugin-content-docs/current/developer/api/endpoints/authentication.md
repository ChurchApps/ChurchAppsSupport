---
title: "प्रमाणीकरण और अनुमतियाँ"
---

# प्रमाणीकरण और अनुमतियाँ

<div class="article-intro">

ChurchApps API JWT-आधारित प्रमाणीकरण का उपयोग करता है। उपयोगकर्ता एक टोकन प्राप्त करने के लिए लॉग इन करते हैं, जो उनकी पहचान, चर्च सदस्यता और अनुमतियों को एन्कोड करता है। यह पृष्ठ प्रमाणीकरण प्रवाह, अनुमति मॉडल और OAuth समर्थन को कवर करता है।

</div>

## लॉगिन प्रवाह

### मानक लॉगिन

```
POST /membership/users/login
```

**Auth:** Public

तीन में से एक क्रेडेंशियल प्रकार स्वीकार करता है:

| फ़ील्ड | विवरण |
|-------|-------------|
| `email` + `password` | मानक ईमेल/पासवर्ड लॉगिन |
| `jwt` | मौजूदा JWT के साथ पुनः प्रमाणीकरण |
| `authGuid` | एक बार का auth लिंक (स्वागत/रीसेट ईमेल में उपयोग होता है) |

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

`token` फ़ील्ड एक JWT है जिसे बाद के अनुरोधों में `Authorization: Bearer <token>` के रूप में भेजा जाना चाहिए।

### दो-चरणीय साइन-इन {#two-factor-sign-in}

उपयोगकर्ता ऑथेंटिकेटर-ऐप (TOTP) दो-चरणीय साइन-इन चालू कर सकते हैं। ऐसे उपयोगकर्ताओं के लिए, `email` + `password`, `authGuid`, या SSO लॉगिन टोकन नहीं लौटाता। इसके बजाय एक चुनौती (challenge) लौटाता है:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

चुनौती टोकन 5 मिनट तक वैध है। कोड के साथ उसे उसी endpoint पर वापस भेजें:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` उपयोगकर्ता का वर्तमान 6-अंकीय ऑथेंटिकेटर कोड या उनके दस एकल-उपयोग backup codes में से कोई एक हो सकता है। गलत कोड `Invalid code` लौटाता है, और बार-बार विफलताएँ प्रति खाता दर-सीमित (rate limited) होती हैं। `jwt` पुनः-लॉगिन पर कभी चुनौती नहीं दी जाती, इसलिए मौजूदा सत्र लगातार रिफ़्रेश होते रहते हैं। लॉगिन प्रतिक्रिया की `user` ऑब्जेक्ट में `mfaEnabled` होता है।

स्व-सेवा endpoints (केवल साइन इन उपयोगकर्ता के लिए, `/membership/users/mfa` के अंतर्गत):

| Endpoint | विवरण |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | सेटअप शुरू करता है; QR कोड के लिए `{ secret, otpauthUrl }` लौटाता है |
| `POST /enable` | बॉडी `{ code }`; इसे चालू करता है और `{ backupCodes }` एक बार लौटाता है |
| `POST /disable` | बॉडी `{ code }` (ऑथेंटिकेटर या backup code); इसे बंद करता है |
| `POST /reset/:userId` | केवल Server.Admin; किसी अन्य उपयोगकर्ता के लिए इसे बंद करता है |

Secrets एन्क्रिप्टेड संग्रहीत होते हैं और backup codes हैश के रूप में संग्रहीत होते हैं। चालू करना, बंद करना और रीसेट करना ऑडिट लॉग में लिखे जाते हैं।

### टोकन की सामग्री

JWT में एन्कोड होता है:
- `id` — उपयोगकर्ता ID
- `churchId` — वर्तमान में चुना हुआ चर्च
- `personId` — चुने हुए चर्च के लिए व्यक्ति रिकॉर्ड
- प्रति-API अनुमति सरणियाँ

### चर्च चयन

उपयोगकर्ता कई चर्चों के सदस्य हो सकते हैं। लॉगिन प्रतिक्रिया में उनकी अनुमतियों सहित सभी चर्च शामिल होते हैं। चर्च बदलने के लिए, क्लाइंट लॉगिन डेटा के किसी भिन्न चर्च के लिए सीमित एक नया JWT बनाता है।

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

एक अस्थायी पासवर्ड के साथ उपयोगकर्ता बनाता है और एक auth लिंक के साथ स्वागत ईमेल भेजता है। किसी नए इंस्टेंस पर पंजीकृत होने वाला पहला उपयोगकर्ता अपने आप server admin पहुँच पाता है।

दो वैकल्पिक bot-trap फ़ील्ड स्वीकार होते हैं: `website` (एक छिपा हुआ honeypot फ़ील्ड जिसे असली उपयोगकर्ता खाली छोड़ते हैं) और `fillMs` (फ़ॉर्म कितनी देर खुला रहा, मिलीसेकंड में)। यदि `website` भरा है या `fillMs` 2000 से कम है, तो कोई खाता नहीं बनता, लेकिन endpoint फिर भी एक सामान्य दिखने वाला `200` लौटाता है ताकि बॉट यह न जान सकें कि उन्हें अस्वीकार किया गया है। जो क्लाइंट दोनों फ़ील्ड छोड़ते हैं, वे सामान्य रूप से पंजीकृत होते हैं।

### नया चर्च पंजीकृत करना

```
POST /membership/churches/add
```

**Auth:** JWT

उपयोगकर्ता को पंजीकृत करने के बाद, चर्च बनाने और उपयोगकर्ता को उससे जोड़ने के लिए इस endpoint को कॉल करें।

## पासवर्ड प्रबंधन

| विधि | पथ | Auth | विवरण |
|--------|------|------|--------|
| POST | `/membership/users/forgot` | Public | पासवर्ड रीसेट ईमेल भेजें। बॉडी: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | रीसेट ईमेल के auth GUID का उपयोग करके नया पासवर्ड सेट करें। बॉडी: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | वर्तमान उपयोगकर्ता का पासवर्ड बदलें। बॉडी: `{ "newPassword": "..." }` |

## अनुमति मॉडल

अनुमतियाँ मॉड्यूल के अनुसार व्यवस्थित होती हैं और भूमिकाओं के माध्यम से उपयोगकर्ताओं को सौंपी जाती हैं। हर अनुमति का एक **content type** और एक **action** होता है।

### अनुमति संदर्भ

| प्रदर्शन अनुभाग | Content Type | Action | विवरण |
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
| | Households | Edit | परिवार (household) असाइनमेंट संपादित करें |
| | People | Edit | कोई भी व्यक्ति रिकॉर्ड संपादित करें |
| | People | Edit Self | केवल अपना व्यक्ति रिकॉर्ड संपादित करें |
| | Roles | Edit | भूमिकाएँ और उपयोगकर्ता असाइनमेंट प्रबंधित करें |
| | Group Members | View | समूह सदस्य सूचियाँ देखें |
| | People | View Members | केवल सदस्य देखें (आगंतुक नहीं) |
| | People | View | सभी लोग देखें |
| | Roles | View | भूमिकाएँ और असाइनमेंट देखें |
| | Settings | Edit | चर्च सेटिंग्स संपादित करें |
| **Content** | Content | Edit | पृष्ठ, सेक्शन, एलिमेंट संपादित करें |
| | Settings | Edit | सामग्री सेटिंग्स संपादित करें |
| | StreamingServices | Edit | स्ट्रीमिंग सेवा कॉन्फ़िगरेशन प्रबंधित करें |
| | Chat | Host | चैट सत्रों की मेज़बानी/मॉडरेट करें |
| **Messaging** | Texting | Send | SMS टेक्स्ट संदेश भेजें |

### अनुमतियाँ कैसे जाँची जाती हैं

कंट्रोलरों में, अनुमतियाँ `au.checkAccess()` विधि से जाँची जाती हैं:

```typescript
// विशिष्ट अनुमति की आवश्यकता
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// या actionWrapper के भीतर — CRUD सिस्टम स्वचालित रूप से जाँचता है
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

API तृतीय-पक्ष एकीकरण के लिए OAuth 2.0 सपोर्ट करता है। दो ग्रांट प्रकार उपलब्ध हैं।

### Authorization Code Flow

1. **Authorize:** `POST /membership/oauth/authorize` (JWT आवश्यक)
   - बॉडी: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - बिना secret वाले public clients के लिए `code_challenge` / `code_challenge_method` (PKCE, केवल `S256`) आवश्यक हैं
   - लौटाता है: `{ "code": "...", "state": "..." }`

2. **कोड को टोकन में बदलें:** `POST /membership/oauth/token` (Public)
   - बॉडी: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - जब authorize चरण में `code_challenge` उपयोग हुआ था, तो `code_verifier` भेजें; public clients `client_secret` छोड़ते हैं। JSON या form-encoded बॉडी स्वीकार होती हैं
   - लौटाता है: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Refresh token:** `POST /membership/oauth/token` (Public)
   - बॉडी: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Access tokens **12 घंटे** बाद समाप्त हो जाते हैं।

### Device Code Flow (RFC 8628)

बिना ब्राउज़र वाले डिवाइसों (TV ऐप, किओस्क) के लिए:

1. **डिवाइस कोड माँगें:** `POST /membership/oauth/device/authorize` (Public)
   - बॉडी: `{ "client_id": "...", "scope": "..." }`
   - लौटाता है: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **उपयोगकर्ता verification URI पर कोड दर्ज करता है** और स्वीकृति या अस्वीकृति देता है

3. **टोकन के लिए poll करें:** `POST /membership/oauth/token` (Public)
   - बॉडी: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - स्वीकृत होने तक `authorization_pending` लौटाता है, फिर access token लौटाता है

### OAuth क्लाइंट प्रबंधन

| विधि | पथ | Auth | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | सभी OAuth क्लाइंट सूचीबद्ध करें |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | ID से क्लाइंट प्राप्त करें |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | client ID से क्लाइंट प्राप्त करें (secret छिपा हुआ) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | क्लाइंट बनाएँ या अपडेट करें |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | क्लाइंट हटाएँ |
| POST | `/membership/oauth/register` | Public | — | MCP कनेक्टर जैसे public clients के लिए Dynamic client registration (RFC 7591)। देखें [Connected Apps](../connected-apps#dynamic-client-registration) |

### डिवाइस स्वीकृति endpoints

| विधि | पथ | Auth | विवरण |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | स्वीकृति UI के लिए लंबित डिवाइस कोड की जानकारी प्राप्त करें |
| POST | `/membership/oauth/device/approve` | JWT | डिवाइस प्राधिकरण स्वीकृत करें। बॉडी: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | डिवाइस प्राधिकरण अस्वीकृत करें। बॉडी: `{ "user_code": "..." }` |

## सार्वजनिक बनाम प्रमाणित endpoints

API दो रैपर फ़ंक्शन उपयोग करता है जो प्रमाणीकरण आवश्यकताएँ तय करते हैं:

- **`actionWrapper`** — एक वैध JWT आवश्यक है। प्रमाणित उपयोगकर्ता ऑब्जेक्ट (`au`) `churchId`, `userId`, और अनुमति जाँचों के साथ उपलब्ध होता है।
- **`actionWrapperAnon`** — कोई प्रमाणीकरण आवश्यक नहीं। लॉगिन, पंजीकरण, सार्वजनिक सामग्री खोज और webhook receivers के लिए उपयोग होता है।

इस दस्तावेज़ीकरण के endpoint तालिकाओं में, इन्हें Auth कॉलम में क्रमशः **JWT** और **Public** द्वारा दर्शाया गया है।

## संबंधित पृष्ठ

- [Module Structure](../module-structure) — कंट्रोलर, रिपॉज़िटरी और मॉडल कैसे व्यवस्थित हैं
- [Local Setup](../local-setup) — विकास के लिए API को स्थानीय रूप से चलाना
