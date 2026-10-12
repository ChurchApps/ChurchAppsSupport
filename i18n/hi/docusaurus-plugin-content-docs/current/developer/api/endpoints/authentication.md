---
title: "प्रमाणीकरण और अनुमतियां"
---

# प्रमाणीकरण और अनुमतियां

<div class="article-intro">

ChurchApps API JWT-आधारित प्रमाणीकरण का उपयोग करता है। उपयोगकर्ता लॉग इन करके एक token प्राप्त करते हैं, जो उनकी पहचान, चर्च की सदस्यता, और अनुमतियों को एन्कोड करता है। यह पृष्ठ auth flow, अनुमति मॉडल, और OAuth समर्थन को कवर करता है।

</div>

## लॉगिन फ़्लो

### मानक लॉगिन

```
POST /membership/users/login
```

**Auth:** Public

तीन प्रकार के credentials में से एक स्वीकार करता है:

| Field | विवरण |
|-------|-------------|
| `email` + `password` | मानक email/password लॉगिन |
| `jwt` | मौजूदा JWT से पुनः प्रमाणीकरण |
| `authGuid` | एक बार का auth लिंक (welcome/reset ईमेल में उपयोग होता है) |

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

### Token की सामग्री

JWT में ये एन्कोड होते हैं:
- `id` -- उपयोगकर्ता ID
- `churchId` -- वर्तमान में चुना गया चर्च
- `personId` -- चुने गए चर्च के लिए person रिकॉर्ड
- प्रति-API अनुमति सरणियां

### चर्च चयन

उपयोगकर्ता कई चर्चों के सदस्य हो सकते हैं। लॉगिन प्रतिक्रिया में उनकी अनुमतियों के साथ सभी चर्च शामिल होते हैं। चर्च बदलने के लिए, क्लाइंट लॉगिन प्रतिक्रिया के डेटा से किसी दूसरे चर्च के लिए नया JWT बनाता है।

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

एक अस्थायी पासवर्ड के साथ उपयोगकर्ता बनाता है और auth लिंक वाला welcome ईमेल भेजता है। किसी नए instance पर पंजीकृत होने वाला पहला उपयोगकर्ता स्वचालित रूप से server admin access प्राप्त करता है।

दो वैकल्पिक bot-trap फ़ील्ड स्वीकार किए जाते हैं: `website` (एक छिपा हुआ honeypot फ़ील्ड जिसे असली उपयोगकर्ता खाली छोड़ते हैं) और `fillMs` (फ़ॉर्म कितने मिलीसेकंड खुला रहा)। यदि `website` भरा है या `fillMs` 2000 से कम है, तो कोई खाता नहीं बनता, लेकिन endpoint फिर भी सामान्य दिखने वाली `200` प्रतिक्रिया देता है ताकि bots को पता न चले कि उन्हें अस्वीकार किया गया है। जो क्लाइंट दोनों फ़ील्ड छोड़ते हैं, वे सामान्य रूप से पंजीकृत होते हैं।

### नया चर्च पंजीकृत करें

```
POST /membership/churches/add
```

**Auth:** JWT

उपयोगकर्ता पंजीकृत करने के बाद, चर्च बनाने और उपयोगकर्ता को उससे जोड़ने के लिए इस endpoint को कॉल करें।

## पासवर्ड प्रबंधन

| Method | Path | Auth | विवरण |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | पासवर्ड रीसेट ईमेल भेजें। Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | रीसेट ईमेल के auth GUID से नया पासवर्ड सेट करें। Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | वर्तमान उपयोगकर्ता का पासवर्ड बदलें। Body: `{ "newPassword": "..." }` |

## अनुमति मॉडल

अनुमतियां मॉड्यूल के अनुसार व्यवस्थित होती हैं और roles के माध्यम से उपयोगकर्ताओं को दी जाती हैं। हर अनुमति का एक **content type** और एक **action** होता है।

### अनुमति संदर्भ

| Display Section | Content Type | Action | विवरण |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | सेवाओं में सदस्यों को चेक इन करें |
| | Attendance | Edit | उपस्थिति रिकॉर्ड संपादित करें |
| | Services | Edit | सेवाओं और सेवा समयों का प्रबंधन करें |
| | Attendance | View | उपस्थिति रिकॉर्ड देखें |
| | Attendance | View Summary | उपस्थिति सारांश और रिपोर्ट देखें |
| **Donations** | Donations | Edit | दान रिकॉर्ड बनाएं और संपादित करें |
| | Settings | Edit | giving/payment settings संपादित करें |
| | Donations | View Summary | दान सारांश रिपोर्ट देखें |
| | Donations | View | व्यक्तिगत दान रिकॉर्ड देखें |
| **People and Groups** | Forms | Admin | फ़ॉर्म का पूर्ण प्रशासन |
| | Forms | Edit | फ़ॉर्म परिभाषाएं संपादित करें |
| | Plans | Edit | सेवा योजनाएं संपादित करें |
| | Group Members | Edit | समूह सदस्य जोड़ें/हटाएं |
| | Groups | Edit | समूह बनाएं और संपादित करें |
| | Households | Edit | घर के असाइनमेंट संपादित करें |
| | People | Edit | कोई भी person रिकॉर्ड संपादित करें |
| | People | Edit Self | केवल अपना person रिकॉर्ड संपादित करें |
| | Roles | Edit | roles और उपयोगकर्ता असाइनमेंट का प्रबंधन करें |
| | Group Members | View | समूह सदस्य सूचियां देखें |
| | People | View Members | केवल सदस्य देखें (आगंतुक नहीं) |
| | People | View | सभी लोग देखें |
| | Roles | View | roles और असाइनमेंट देखें |
| | Settings | Edit | चर्च settings संपादित करें |
| **Content** | Content | Edit | पृष्ठ, खंड, तत्व संपादित करें |
| | Settings | Edit | content settings संपादित करें |
| | StreamingServices | Edit | streaming service configuration का प्रबंधन करें |
| | Chat | Host | chat sessions को होस्ट/मॉडरेट करें |
| **Messaging** | Texting | Send | SMS text संदेश भेजें |

### अनुमतियां कैसे जांची जाती हैं

Controllers में, अनुमतियां `au.checkAccess()` method से जांची जाती हैं:

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

`Server.Admin` अनुमति सभी चर्चों में पूर्ण access देती है। यह पहले पंजीकृत उपयोगकर्ता को दी जाती है और server admin role के माध्यम से दूसरों को दी जा सकती है।

## OAuth 2.0

API तृतीय-पक्ष integrations के लिए OAuth 2.0 का समर्थन करता है। दो grant types उपलब्ध हैं।

### Authorization Code Flow

1. **Authorize:** `POST /membership/oauth/authorize` (JWT आवश्यक)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - लौटाता है: `{ "code": "...", "state": "..." }`

2. **Code को token से बदलें:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - लौटाता है: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Refresh token:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Access tokens **12 घंटे** बाद समाप्त हो जाते हैं।

### Device Code Flow (RFC 8628)

ऐसे devices के लिए जिनमें browser नहीं है (TV apps, kiosks):

1. **Device code का अनुरोध करें:** `POST /membership/oauth/device/authorize` (Public)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - लौटाता है: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **उपयोगकर्ता verification URI पर code दर्ज करता है** और स्वीकृत या अस्वीकृत करता है

3. **Token के लिए poll करें:** `POST /membership/oauth/token` (Public)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - स्वीकृत होने तक `authorization_pending` लौटाता है, फिर access token लौटाता है

### OAuth Client प्रबंधन

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | सभी OAuth clients की सूची |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | ID द्वारा client प्राप्त करें |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | client ID द्वारा client प्राप्त करें (secret छिपा हुआ) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | client बनाएं या अपडेट करें |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | client हटाएं |

### Device Approval Endpoints

| Method | Path | Auth | विवरण |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | approval UI के लिए लंबित device code जानकारी प्राप्त करें |
| POST | `/membership/oauth/device/approve` | JWT | device authorization स्वीकृत करें। Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | device authorization अस्वीकृत करें। Body: `{ "user_code": "..." }` |

## Public बनाम Authenticated Endpoints

API दो wrapper functions का उपयोग करता है जो प्रमाणीकरण आवश्यकताएं तय करते हैं:

- **`actionWrapper`** -- वैध JWT आवश्यक है। प्रमाणीकृत उपयोगकर्ता ऑब्जेक्ट (`au`) `churchId`, `userId`, और अनुमति जांच के साथ उपलब्ध है।
- **`actionWrapperAnon`** -- कोई प्रमाणीकरण आवश्यक नहीं। लॉगिन, पंजीकरण, सार्वजनिक content lookups, और webhook receivers के लिए उपयोग होता है।

इस दस्तावेज़ की endpoint तालिकाओं में, इन्हें Auth कॉलम में क्रमशः **JWT** और **Public** के रूप में दर्शाया गया है।

## संबंधित पृष्ठ

- [Module Structure](../module-structure) -- controllers, repositories, और models कैसे व्यवस्थित हैं
- [Local Setup](../local-setup) -- विकास के लिए API को स्थानीय रूप से चलाना
