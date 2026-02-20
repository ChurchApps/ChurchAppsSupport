---
title: "प्रमाणीकरण और अनुमतियाँ"
---

# प्रमाणीकरण और अनुमतियाँ

<div class="article-intro">

ChurchApps API JWT-आधारित प्रमाणीकरण का उपयोग करता है। उपयोगकर्ता एक टोकन प्राप्त करने के लिए लॉग इन करते हैं जो उनकी पहचान, चर्च सदस्यता और अनुमतियों को एन्कोड करता है। यह पृष्ठ प्रमाणीकरण प्रवाह, अनुमति मॉडल और OAuth समर्थन को कवर करता है।

</div>

## लॉगिन प्रवाह

### मानक लॉगिन

```
POST /membership/users/login
```

**Auth:** Public

तीन क्रेडेंशियल प्रकारों में से एक स्वीकार करता है:

| फ़ील्ड | विवरण |
|-------|-------------|
| `email` + `password` | मानक ईमेल/पासवर्ड लॉगिन |
| `jwt` | मौजूदा JWT के साथ पुनः प्रमाणीकरण |
| `authGuid` | वन-टाइम प्रमाणीकरण लिंक (स्वागत/रीसेट ईमेल में उपयोग) |

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

`token` फ़ील्ड एक JWT है जिसे बाद के अनुरोधों पर `Authorization: Bearer <token>` के रूप में भेजा जाना चाहिए।

### टोकन सामग्री

JWT एन्कोड करता है:
- `id` — उपयोगकर्ता ID
- `churchId` — वर्तमान में चयनित चर्च
- `personId` — चयनित चर्च के लिए व्यक्ति रिकॉर्ड
- प्रति-API अनुमति एरे

### चर्च चयन

उपयोगकर्ता कई चर्चों से संबंधित हो सकते हैं। लॉगिन प्रतिक्रिया उनकी अनुमतियों के साथ सभी चर्चों को शामिल करती है। चर्च बदलने के लिए, क्लाइंट लॉगिन प्रतिक्रिया डेटा से एक अलग चर्च के लिए स्कोप किया गया नया JWT जनरेट करता है।

## उपयोगकर्ता पंजीकरण

### नया उपयोगकर्ता पंजीकृत करें

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

एक अस्थायी पासवर्ड के साथ उपयोगकर्ता बनाता है और एक प्रमाणीकरण लिंक के साथ स्वागत ईमेल भेजता है। नए इंस्टेंस पर पंजीकृत पहले उपयोगकर्ता को स्वचालित रूप से सर्वर एडमिन एक्सेस प्रदान किया जाता है।

### नया चर्च पंजीकृत करें

```
POST /membership/churches/add
```

**Auth:** JWT

उपयोगकर्ता पंजीकृत करने के बाद, चर्च बनाने और उपयोगकर्ता को इससे जोड़ने के लिए इस एंडपॉइंट को कॉल करें।

## पासवर्ड प्रबंधन

| Method | Path | Auth | विवरण |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | पासवर्ड रीसेट ईमेल भेजें। बॉडी: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | रीसेट ईमेल से प्रमाणीकरण GUID का उपयोग करके नया पासवर्ड सेट करें। बॉडी: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | वर्तमान उपयोगकर्ता का पासवर्ड बदलें। बॉडी: `{ "newPassword": "..." }` |

## अनुमति मॉडल

अनुमतियाँ मॉड्यूल के अनुसार व्यवस्थित हैं और भूमिकाओं के माध्यम से उपयोगकर्ताओं को असाइन की जाती हैं। प्रत्येक अनुमति में एक **सामग्री प्रकार** और एक **क्रिया** होती है।

### अनुमति संदर्भ

| प्रदर्शन खंड | Content Type | Action | विवरण |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | सेवाओं में सदस्यों को चेक इन करें |
| | Attendance | Edit | उपस्थिति रिकॉर्ड संपादित करें |
| | Services | Edit | सेवाएँ और सेवा समय प्रबंधित करें |
| | Attendance | View | उपस्थिति रिकॉर्ड देखें |
| | Attendance | View Summary | उपस्थिति सारांश और रिपोर्ट देखें |
| **Donations** | Donations | Edit | दान रिकॉर्ड बनाएँ और संपादित करें |
| | Settings | Edit | दान/भुगतान सेटिंग्स संपादित करें |
| | Donations | View Summary | दान सारांश रिपोर्ट देखें |
| | Donations | View | व्यक्तिगत दान रिकॉर्ड देखें |
| **People and Groups** | Forms | Admin | पूर्ण फ़ॉर्म प्रशासन |
| | Forms | Edit | फ़ॉर्म परिभाषाएँ संपादित करें |
| | Plans | Edit | सेवा योजनाएँ संपादित करें |
| | Group Members | Edit | समूह सदस्य जोड़ें/हटाएँ |
| | Groups | Edit | समूह बनाएँ और संपादित करें |
| | Households | Edit | परिवार असाइनमेंट संपादित करें |
| | People | Edit | कोई भी व्यक्ति रिकॉर्ड संपादित करें |
| | People | Edit Self | केवल अपना व्यक्ति रिकॉर्ड संपादित करें |
| | Roles | Edit | भूमिकाएँ और उपयोगकर्ता असाइनमेंट प्रबंधित करें |
| | Group Members | View | समूह सदस्य सूचियाँ देखें |
| | People | View Members | केवल सदस्य देखें (आगंतुक नहीं) |
| | People | View | सभी लोग देखें |
| | Roles | View | भूमिकाएँ और असाइनमेंट देखें |
| | Settings | Edit | चर्च सेटिंग्स संपादित करें |
| **Content** | Content | Edit | पृष्ठ, खंड, तत्व संपादित करें |
| | Settings | Edit | सामग्री सेटिंग्स संपादित करें |
| | StreamingServices | Edit | स्ट्रीमिंग सेवा कॉन्फ़िगरेशन प्रबंधित करें |
| | Chat | Host | चैट सत्र होस्ट/मॉडरेट करें |
| **Messaging** | Texting | Send | SMS टेक्स्ट संदेश भेजें |

### अनुमतियाँ कैसे जाँची जाती हैं

कंट्रोलर में, अनुमतियाँ `au.checkAccess()` मेथड का उपयोग करके जाँची जाती हैं:

```typescript
// विशिष्ट अनुमति आवश्यक
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// या actionWrapper के भीतर — CRUD सिस्टम स्वचालित रूप से जाँचता है
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### सर्वर एडमिन

`Server.Admin` अनुमति सभी चर्चों में पूर्ण एक्सेस प्रदान करती है। यह पहले पंजीकृत उपयोगकर्ता को असाइन की जाती है और सर्वर एडमिन भूमिका के माध्यम से दूसरों को प्रदान की जा सकती है।

## OAuth 2.0

API तृतीय-पक्ष एकीकरण के लिए OAuth 2.0 का समर्थन करता है। दो ग्रांट प्रकार उपलब्ध हैं।

### Authorization Code Flow

1. **अधिकृत करें:** `POST /membership/oauth/authorize` (JWT आवश्यक)
   - बॉडी: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - लौटाता है: `{ "code": "...", "state": "..." }`

2. **कोड को टोकन में बदलें:** `POST /membership/oauth/token` (Public)
   - बॉडी: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - लौटाता है: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **टोकन रिफ्रेश करें:** `POST /membership/oauth/token` (Public)
   - बॉडी: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

एक्सेस टोकन **12 घंटे** बाद समाप्त होते हैं।

### Device Code Flow (RFC 8628)

बिना ब्राउज़र वाले डिवाइस (TV ऐप्स, कियोस्क) के लिए:

1. **डिवाइस कोड अनुरोध करें:** `POST /membership/oauth/device/authorize` (Public)
   - बॉडी: `{ "client_id": "...", "scope": "..." }`
   - लौटाता है: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **उपयोगकर्ता सत्यापन URI पर कोड दर्ज करता है** और अनुमोदन या अस्वीकृति करता है

3. **टोकन के लिए पोल करें:** `POST /membership/oauth/token` (Public)
   - बॉडी: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - अनुमोदित होने तक `authorization_pending` लौटाता है, फिर एक्सेस टोकन लौटाता है

### OAuth क्लाइंट प्रबंधन

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | सभी OAuth क्लाइंट सूचीबद्ध करें |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | ID द्वारा क्लाइंट प्राप्त करें |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | क्लाइंट ID द्वारा क्लाइंट प्राप्त करें (सीक्रेट छुपा हुआ) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | क्लाइंट बनाएँ या अपडेट करें |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | क्लाइंट हटाएँ |

### डिवाइस अनुमोदन एंडपॉइंट

| Method | Path | Auth | विवरण |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | अनुमोदन UI के लिए लंबित डिवाइस कोड जानकारी प्राप्त करें |
| POST | `/membership/oauth/device/approve` | JWT | डिवाइस प्राधिकरण अनुमोदित करें। बॉडी: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | डिवाइस प्राधिकरण अस्वीकार करें। बॉडी: `{ "user_code": "..." }` |

## Public बनाम प्रमाणित एंडपॉइंट

API दो रैपर फंक्शन का उपयोग करता है जो प्रमाणीकरण आवश्यकताएँ निर्धारित करते हैं:

- **`actionWrapper`** — एक वैध JWT आवश्यक है। प्रमाणित उपयोगकर्ता ऑब्जेक्ट (`au`) `churchId`, `userId` और अनुमति जाँच के साथ उपलब्ध है।
- **`actionWrapperAnon`** — कोई प्रमाणीकरण आवश्यक नहीं। लॉगिन, पंजीकरण, सार्वजनिक सामग्री लुकअप और webhook रिसीवर के लिए उपयोग किया जाता है।

इस दस्तावेज़ीकरण में एंडपॉइंट तालिकाओं में, इन्हें Auth कॉलम में क्रमशः **JWT** और **Public** के रूप में इंगित किया जाता है।

## संबंधित पृष्ठ

- [मॉड्यूल संरचना](../module-structure) — कंट्रोलर, रिपॉज़िटरी और मॉडल कैसे व्यवस्थित हैं
- [स्थानीय सेटअप](../local-setup) — विकास के लिए API को स्थानीय रूप से चलाना
