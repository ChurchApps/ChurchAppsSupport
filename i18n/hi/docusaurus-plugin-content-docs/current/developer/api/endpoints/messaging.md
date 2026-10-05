---
title: "Messaging Endpoints"
---

# Messaging Endpoints

<div class="article-intro">

Messaging मॉड्यूल रीयल-टाइम वार्तालाप, चैट संदेश, पुश सूचनाएं, SMS/ईमेल डिलीवरी, WebSocket कनेक्शन, निजी संदेश, डिवाइस पंजीकरण, और texting प्रदाताओं को प्रबंधित करता है। यह सभी ChurchApps एप्लिकेशन में लाइव स्ट्रीमिंग चैट और asynchronous सूचनाओं दोनों के लिए उपयोग किए जाने वाले communication layer प्रदान करता है।

</div>

**Base path:** `/messaging`

## Conversations

Base path: `/messaging/conversations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | comma-separated IDs के साथ वार्तालाप पहले/आखिरी संदेशों के साथ लोड करें |
| GET | `/messages/:contentType/:contentId` | JWT | — | paginated संदेशों के साथ सामग्री के लिए वार्तालाप लोड करें (`?page=&limit=`) |
| GET | `/posts` | JWT | — | वर्तमान उपयोगकर्ता के समूहों के लिए post-type वार्तालाप प्राप्त करें |
| GET | `/posts/group/:groupId` | JWT | — | किसी विशिष्ट समूह के लिए post-type वार्तालाप प्राप्त करें |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | सामग्री के लिए वर्तमान वार्तालाप प्राप्त या बनाएं (auto-decrypts contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | सामग्री type और ID द्वारा वार्तालाप लोड करें |
| GET | `/:churchId/:id` | Public | — | ID द्वारा एक एकल वार्तालाप लोड करें |
| POST | `/` | JWT | — | वार्तालाप बनाएं या अपडेट करें (batch) |
| POST | `/start` | JWT | — | एक प्रारंभिक comment संदेश के साथ नया वार्तालाप शुरू करें |
| DELETE | `/:churchId/:id` | JWT | — | एक वार्तालाप हटाएं |

### व्यक्ति नोट्स access control

`contentType: "person"` (किसी व्यक्ति रिकॉर्ड पर Notes टैब) या `contentType: "personConfidential"` (Confidential Notes सेक्शन) के साथ वार्तालाप सभी read और write पाथ पर gated हैं, अन्यथा-public routes सहित, जो इन content types के लिए `401` लौटाते हैं। `person` को MembershipApi **People / Edit** अनुमति की आवश्यकता होती है; `personConfidential` को **People / View Confidential Notes** की आवश्यकता होती है। scoped API keys के लिए, `people:write` दोनों actions को carries करता है (key के उपयोगकर्ता को अभी भी अंतर्निहित role अनुमति को hold करना होगा)।

### उदाहरण: एक वार्तालाप शुरू करें

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Messages

Base path: `/messaging/messages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | किसी वार्तालाप के लिए सभी संदेश लोड करें |
| GET | `/catchup/:churchId/:conversationId` | Public | — | किसी वार्तालाप के लिए सभी संदेश लोड करें (लाइव चैट के लिए public catchup) |
| GET | `/:churchId/:id` | Public | — | ID द्वारा एक एकल संदेश लोड करें |
| POST | `/` | JWT | — | संदेश सहेजें (batch)। रीयल-टाइम अपडेट भेजता है और सूचनाएं trigger करता है। एक existing संदेश को अपडेट करने के लिए उसके author होना या `content.edit` को hold करना आवश्यक है; stored author कभी reassignable नहीं है |
| POST | `/send` | Public | — | संदेश भेजें (batch, public)। WebSocket के माध्यम से रीयल-टाइम अपडेट भेजता है और सूचनाएं trigger करता है |
| POST | `/setCallout` | JWT | — | (legacy) रीयल टाइम में एक callout संदेश broadcast करें। कोई active client नहीं; लाइव स्ट्रीम चैट अब callouts render नहीं करता है |
| DELETE | `/:churchId/:id` | JWT | — | एक संदेश हटाएं और deletion को रीयल टाइम में broadcast करें। [Message moderation](#message-moderation) देखें |

### Message moderation

किसी संदेश को हटाने की अनुमति है:

- संदेश के author के लिए;
- चर्च में कहीं भी `content.edit` के साथ स्टाफ के लिए;
- **समूह नेताओं** के लिए, `contentType` के साथ वार्तालाप के लिए `group` या `groupAnnouncement` जिनका `contentId` एक ऐसा समूह है जो वे lead करते हैं (`leaderGroupIds` JWT पर)।

Person-note वार्तालाप (`person` / `personConfidential`) कभी leader-moderated नहीं होते हैं — वे notes अनुमतियों (`people.edit`, `people.viewConfidentialNotes`) का उपयोग करते हैं।

नेताओं को केवल delete मिलता है, edit नहीं: किसी अन्य सदस्य के संदेश को rewrite करना author और `content.edit` स्टाफ के लिए restricted रहता है।

### उदाहरण: एक संदेश भेजें

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Private Messages

Base path: `/messaging/privatemessages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के लिए सभी private संदेश लोड करें (प्रति वार्तालाप last संदेश शामिल, सभी को read के रूप में मार्क करता है) |
| GET | `/existing/:personId` | JWT | — | किसी विशिष्ट व्यक्ति के साथ मौजूदा private वार्तालाप खोजें |
| GET | `/:id` | JWT | — | ID द्वारा एक private संदेश लोड करें (यदि वर्तमान उपयोगकर्ता को संबोधित है तो सूचना को clear करता है) |
| POST | `/` | JWT | — | private संदेश भेजें (batch)। प्राप्तकर्ता को push सूचना trigger करता है |

## Notifications

Base path: `/messaging/notifications`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | वर्तमान उपयोगकर्ता के लिए unread सूचना count प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के लिए सभी सूचनाएं लोड करें (सभी को read के रूप में मार्क करता है) |
| GET | `/tmpEmail` | Public | — | दैनिक ईमेल सूचना digest trigger करें (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | किसी विशिष्ट व्यक्ति के लिए सूचनाएं लोड करें |
| GET | `/:churchId/:id` | JWT | — | ID द्वारा एक सूचना लोड करें |
| POST | `/` | JWT | — | सूचनाएं बनाएं या अपडेट करें (batch) |
| POST | `/create` | JWT | — | कई लोगों के लिए सूचनाएं बनाएं। Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | किसी व्यक्ति के लिए सभी सूचनाओं को read के रूप में मार्क करें |
| POST | `/sendTest` | JWT | — | एक test push सूचना भेजें। Body: `{ personId, title }` |
| POST | `/ping` | Public | — | एक external trigger से एक सूचना बनाएं। Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | एक सूचना हटाएं |

### उदाहरण: सूचनाएं बनाएं

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Notification Preferences

Base path: `/messaging/notificationpreferences`

Standard CRUD को extend करता है। Base class `POST /` (create या update, कोई अनुमति की आवश्यकता नहीं) प्रदान करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | सूचना preferences बनाएं या अपडेट करें (CRUD base class से) |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता के लिए सूचना preferences लोड करें (यदि कोई मौजूद नहीं है तो स्वचालित रूप से defaults बनाता है) |

## Connections

Base path: `/messaging/connections`

चैट, समूह वार्तालाप, private संदेश, और लाइव स्ट्रीमिंग के लिए WebSocket/रीयल-टाइम कनेक्शन को प्रबंधित करता है। [Real-time Architecture](../../realtime) के लिए end-to-end protocol देखें।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | किसी वार्तालाप के लिए सभी कनेक्शन लोड करें |
| POST | `/` | Public | — | कनेक्शन पंजीकृत करें (batch)। वार्तालाप पर attendance broadcast trigger करता है। Body items: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | socket ID द्वारा कनेक्शन के लिए display name अपडेट करें। Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | किसी वार्तालाप से कनेक्शन को drop करें। attendance broadcast trigger करता है |
| POST | `/tmpSendAlert` | Public | — | किसी व्यक्ति के कनेक्शन को एक सूचना alert भेजें। Body: `{ churchId, personId }` |

## Devices

Base path: `/messaging/devices`

पुश सूचनाओं और content pairing (उदाहरण के लिए, TV प्रदर्शन पर Lessons ऐप) के लिए device पंजीकरण को प्रबंधित करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | एक device को enroll या अपडेट करें (mobile push पंजीकरण)। FCM token या device ID द्वारा match करता है |
| POST | `/enrollAnon` | Public | — | एक anonymous device को enroll करें और एक 4-character pairing code उत्पन्न करें |
| POST | `/` | Public | — | devices को सहेजें (batch) |
| GET | `/pair/:pairingCode` | JWT | — | एक pairing code का उपयोग करके device को pair करें। Optional `?contentType=&contentId=` content को assign करने के लिए |
| GET | `/status/:deviceId` | Public | — | device की pairing status check करें |
| GET | `/:churchId` | JWT | — | किसी चर्च के लिए सभी devices लोड करें |
| GET | `/:churchId/person/:personId` | JWT | — | किसी व्यक्ति के लिए सभी devices लोड करें |
| GET | `/:churchId/:id` | JWT | — | ID द्वारा एक device लोड करें |
| DELETE | `/:churchId/:id` | JWT | — | एक device हटाएं |

### उदाहरण: एक Device को Enroll करें

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Device Contents

Base path: `/messaging/devicecontents`

paired devices के लिए content assignments को प्रबंधित करता है (उदाहरण के लिए, कौन सा पाठ TV पर प्रदर्शित होता है)।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | एक device के लिए content assignments लोड करें |
| POST | `/` | JWT | — | device content assignments को सहेजें (batch) |
| DELETE | `/:id` | JWT | — | एक device content assignment हटाएं |

## Texting

Base path: `/messaging/texting`

SMS texting providers, समूह text messaging, और delivery tracking को प्रबंधित करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | चर्च के लिए texting providers लोड करें (credentials को mask किया गया है) |
| GET | `/preview/:groupId` | JWT | — | एक समूह text के लिए प्राप्तकर्ताओं को preview करें (eligible, opted-out, no-phone counts) |
| GET | `/sent` | JWT | — | चर्च के लिए सभी sent text संदेश रिकॉर्ड लोड करें |
| GET | `/sent/:id/details` | JWT | — | एक sent text को per-recipient delivery logs के साथ लोड करें |
| POST | `/providers` | JWT | — | texting providers को सहेजें (batch)। API credentials को encrypts करता है |
| POST | `/send` | JWT | — | किसी समूह के सभी eligible सदस्यों को SMS भेजें। Body: `{ groupId, message }`। Merge fields (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) प्रत्येक प्राप्तकर्ता के लिए resolved होते हैं |
| POST | `/sendPerson` | JWT | — | एक एकल व्यक्ति को SMS भेजें। Body: `{ personId, phoneNumber, message }`। Merge fields को resolved किया जाता है, और resolved text वह है जो logged होता है |
| DELETE | `/providers/:id` | JWT | — | एक texting provider हटाएं |

### उदाहरण: समूह Text भेजें

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## Email Templates

Base path: `/messaging/emailTemplates`

reusable email templates को प्रबंधित करता है और templated emails को समूहों में भेजता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के लिए सभी email templates लोड करें |
| GET | `/:id` | JWT | — | ID द्वारा एक एकल email template लोड करें |
| GET | `/preview/:groupId` | JWT | — | एक समूह के लिए email delivery को preview करें (eligible recipient count, कोई ईमेल के बिना सदस्य) |
| POST | `/` | JWT | — | email templates बनाएं या अपडेट करें (batch) |
| POST | `/send` | JWT | — | एक समूह के सभी सदस्यों को एक templated email भेजें। Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | एक email template हटाएं |

### उदाहरण: समूह को ईमेल भेजें

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**समर्थित merge fields:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blocked IPs

Base path: `/messaging/blockedips`

(legacy) लाइव स्ट्रीमिंग चैट के लिए IP-blocking। B1App client अब `POST /` को कॉल नहीं करता है -- IP blocking को unified-delivery migration में हटाया गया था। `/clear` route अभी भी `StreamingServiceController` द्वारा server-to-server को invoke किया जाता है जब streaming services को saved किया जाता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) blocked IPs को सहेजें (batch)। कोई active client नहीं |
| POST | `/clear` | JWT | — | विशिष्ट services के लिए सभी blocked IPs को clear करें। Body: `[{ serviceId, churchId }]` |

## Delivery Logs

Base path: `/messaging/deliverylogs`

sent messages (SMS, पुश सूचनाएं, email) के लिए delivery status को ट्रैक करता है।

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | content type और ID द्वारा delivery logs लोड करें |
| GET | `/person/:personId` | JWT | — | किसी व्यक्ति के लिए delivery logs लोड करें। Optional `?startDate=&endDate=` filters |
| GET | `/recent` | JWT | — | चर्च के लिए recent delivery logs लोड करें। Optional `?limit=` (default 100) |
| GET | `/:id` | JWT | — | ID द्वारा एक delivery log लोड करें |

## संबंधित पृष्ठ

- [Real-time Architecture](../../realtime) -- WebSocket protocol, room subscriptions, और unified delivery framework
- [Web Push Notifications](../../web-push) -- Browser push enrollment और delivery
- [Membership Endpoints](./membership) -- लोग, समूह, भूमिकाएं, और core identity
- [Attendance Endpoints](./attendance) -- Service और visit tracking
- [Authentication & Permissions](./authentication) -- लॉगिन flow, JWT, OAuth, अनुमति मॉडल
- [Module Structure](../module-structure) -- कोड संगठन पैटर्न
