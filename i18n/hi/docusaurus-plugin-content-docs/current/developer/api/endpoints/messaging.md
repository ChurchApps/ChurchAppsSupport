---
title: "मैसेजिंग एंडपॉइंट्स"
---

# मैसेजिंग एंडपॉइंट्स

<div class="article-intro">

मैसेजिंग मॉड्यूल रीयल-टाइम बातचीत, चैट संदेश, पुश सूचनाएँ, SMS/ईमेल डिलीवरी, WebSocket कनेक्शन, निजी संदेश, डिवाइस रजिस्ट्रेशन और टेक्स्टिंग प्रदाताओं का प्रबंधन करता है। यह सभी ChurchApps एप्लिकेशन में लाइव स्ट्रीमिंग चैट और अतुल्यकालिक (asynchronous) सूचनाओं, दोनों के लिए उपयोग होने वाली संचार परत प्रदान करता है।

</div>

**बेस पाथ:** `/messaging`

## बातचीत (Conversations)

बेस पाथ: `/messaging/conversations`

| विधि | पाथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | कॉमा से अलग की गई ID द्वारा बातचीत लोड करें, पहले और अंतिम संदेश के साथ |
| GET | `/messages/:contentType/:contentId` | JWT | — | किसी कंटेंट की बातचीत पेजिनेटेड संदेशों के साथ लोड करें (`?page=&limit=`) |
| GET | `/posts` | JWT | — | वर्तमान उपयोगकर्ता के समूहों की post-प्रकार की बातचीत प्राप्त करें |
| GET | `/posts/group/:groupId` | JWT | — | किसी विशेष समूह की post-प्रकार की बातचीत प्राप्त करें |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | B1 Admin Notes पेज के लिए हर रिकॉर्ड के सबसे नए नोट। `section` `people`, `groups`, `events` या `workflows` होता है (अन्यथा 400); `limit` का डिफ़ॉल्ट 25 है (अधिकतम 100); `before` पिछले पेज का कर्सर है। हर नोट अपने प्रकार के नियम से गुज़रता है (People Edit / गोपनीय नोट अनुमति, समूह के नेता, इवेंट देखने वाले, वर्कफ़्लो कार्ड देखने वाले), इसलिए कॉलर केवल वही नोट देखते हैं जिन्हें वे खोल सकते हैं। नोट का पाठ 300 अक्षरों पर काटा जाता है |
| GET | `/current/:churchId/:contentType/:contentId` | सार्वजनिक | — | किसी कंटेंट की वर्तमान बातचीत प्राप्त करें या बनाएँ (contentId को स्वतः डिक्रिप्ट करता है) |
| GET | `/:churchId/:contentType/:contentId` | सार्वजनिक | — | कंटेंट प्रकार और ID द्वारा बातचीत लोड करें |
| GET | `/:churchId/:id` | सार्वजनिक | — | ID से एक बातचीत लोड करें |
| POST | `/` | JWT | — | बातचीत बनाएँ या अपडेट करें (बैच) |
| POST | `/start` | JWT | — | प्रारंभिक टिप्पणी संदेश के साथ नई बातचीत शुरू करें |
| DELETE | `/:churchId/:id` | JWT | — | बातचीत हटाएँ |

### व्यक्ति नोट्स पर एक्सेस नियंत्रण

`contentType: "person"` (किसी व्यक्ति रिकॉर्ड पर Notes टैब) या `contentType: "personConfidential"` (Confidential Notes सेक्शन) वाली बातचीत हर पढ़ने और लिखने के पथ पर सुरक्षित रहती है, जिसमें ऊपर के सार्वजनिक रूट भी शामिल हैं। इन कंटेंट प्रकारों के लिए वे `401` लौटाते हैं। `person` के लिए MembershipApi **People / Edit** अनुमति आवश्यक है; `personConfidential` के लिए **People / View Confidential Notes** आवश्यक है। स्कोप्ड API कुंजियों के लिए `people:write` दोनों क्रियाएँ रखता है (कुंजी के उपयोगकर्ता के पास अंतर्निहित भूमिका अनुमति अब भी होनी चाहिए)।

### समूह और इवेंट नोट्स पर एक्सेस नियंत्रण {#group-and-event-notes-access-control}

दो और नोट कंटेंट प्रकार उसी तरह सुरक्षित हैं, हर पढ़ने और लिखने के पथ पर (ऊपर के सार्वजनिक रूट सहित), और इन पर गुमनाम पोस्टिंग कभी नहीं होती:

- **`groupNote`** (`contentId` = समूह ID) -- किसी समूह पर **Leader notes** फ़ीड। केवल उस समूह के नेता (JWT पर `leaderGroupIds`) पढ़ या पोस्ट कर सकते हैं। कोई भी स्टाफ़ अनुमति एक्सेस नहीं देती, जिसमें `content.edit` और समूह-सदस्यता अनुमतियाँ भी शामिल हैं।
- **`eventNote`** (`contentId` = इवेंट ID) -- कैलेंडर इवेंट के नोट्स। `content.edit` वाले या **Calendars / Admin** वाले स्टाफ़ हमेशा पढ़ और पोस्ट कर सकते हैं। अन्यथा एक्सेस इवेंट के `notesViewRole` (पढ़ना) और `notesPostRole` (पोस्ट करना) के अनुसार चलता है: `staff` (डिफ़ॉल्ट, जब फ़ील्ड `null` हो) किसी और को अनुमति नहीं देता, `leaders` इवेंट के समूह के नेताओं को अनुमति देता है, और `members` इवेंट समूह के सदस्यों और नेताओं को अनुमति देता है। जिस इवेंट में `groupId` नहीं है, वह केवल स्टाफ़ के लिए है।

### वर्कफ़्लो कार्ड नोट्स पर एक्सेस नियंत्रण

`contentType: "workflowCard"` वाली बातचीत (वर्कफ़्लो कार्ड के नोट्स, जहाँ `contentId` कार्ड का task ID है) केवल वही व्यक्ति पढ़ और लिख सकता है जो वह कार्ड खोल सकता है: DoingApi **Tasks / View** अनुमति वाला उपयोगकर्ता, या वह व्यक्ति या समूह जिसे कार्ड असाइन किया गया है, बनाया गया है, या जिसके बारे में है। अन्य सभी को ऊपर के सार्वजनिक रूट सहित हर पढ़ने के पथ पर `401` मिलता है। किसी कार्ड की बातचीत कार्ड के माध्यम से `POST /doing/tasks/:id/conversation` (बॉडी `{ "conversationId": "..." }`; जो पहली बातचीत जोड़ी जाती है वही मान्य रहती है) द्वारा जुड़ती है, जिसे कार्ड के एडिटर्स और उसका असाइनी कॉल कर सकते हैं।

### उदाहरण: बातचीत शुरू करना

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

## संदेश (Messages)

बेस पाथ: `/messaging/messages`

| विधि | पाथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | किसी बातचीत के सभी संदेश लोड करें |
| GET | `/catchup/:churchId/:conversationId` | सार्वजनिक | — | किसी बातचीत के सभी संदेश लोड करें (लाइव चैट के लिए सार्वजनिक catchup) |
| GET | `/:churchId/:id` | सार्वजनिक | — | ID से एक संदेश लोड करें |
| POST | `/` | JWT | — | संदेश सहेजें (बैच)। रीयल-टाइम अपडेट भेजता है और सूचनाएँ शुरू करता है। मौजूदा संदेश अपडेट करने के लिए उसका लेखक होना या `content.edit` होना आवश्यक है; संग्रहीत लेखक कभी बदला नहीं जा सकता |
| POST | `/send` | सार्वजनिक | — | संदेश भेजें (बैच, सार्वजनिक)। WebSocket के माध्यम से रीयल-टाइम अपडेट भेजता है और सूचनाएँ शुरू करता है |
| POST | `/setCallout` | JWT | — | (पुराना) संदेश को रीयल टाइम में कॉलआउट के रूप में प्रसारित करें। कोई सक्रिय क्लाइंट नहीं; लाइव स्ट्रीम चैट अब कॉलआउट नहीं दिखाता |
| DELETE | `/:churchId/:id` | JWT | — | संदेश हटाएँ और हटाने को रीयल टाइम में प्रसारित करें। देखें [संदेश मॉडरेशन](#message-moderation) |

### संदेश मॉडरेशन {#message-moderation}

संदेश हटाने की अनुमति इन्हें है:

- संदेश का लेखक;
- चर्च में कहीं भी `content.edit` वाले स्टाफ़;
- **समूह के नेता**, उन बातचीत के लिए जिनका `contentType` `group` या `groupAnnouncement` है और जिनका `contentId` वह समूह है जिसका वे नेतृत्व करते हैं (JWT पर `leaderGroupIds`)।

व्यक्ति-नोट बातचीत (`person` / `personConfidential`) को कभी नेताओं द्वारा मॉडरेट नहीं किया जाता — वे इसके बजाय नोट अनुमतियों (`people.edit`, `people.viewConfidentialNotes`) का उपयोग करती हैं।

नेताओं को केवल हटाने की अनुमति है, संपादन की नहीं: किसी और सदस्य का संदेश फिर से लिखना केवल लेखक और `content.edit` स्टाफ़ तक सीमित रहता है।

### उदाहरण: संदेश भेजना

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

## निजी संदेश (Private Messages)

बेस पाथ: `/messaging/privatemessages`

| विधि | पाथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के सभी निजी संदेश लोड करें (हर बातचीत का अंतिम संदेश शामिल, सभी को पढ़ा हुआ चिह्नित करता है) |
| GET | `/existing/:personId` | JWT | — | किसी विशेष व्यक्ति के साथ मौजूदा निजी बातचीत खोजें |
| GET | `/:id` | JWT | — | ID से निजी संदेश लोड करें (यदि वर्तमान उपयोगकर्ता को संबोधित है तो सूचना साफ़ करता है) |
| POST | `/` | JWT | — | निजी संदेश भेजें (बैच)। प्राप्तकर्ता को पुश सूचना भेजता है |

## सूचनाएँ (Notifications)

बेस पाथ: `/messaging/notifications`

| विधि | पाथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | वर्तमान उपयोगकर्ता के लिए बिना पढ़ी सूचनाओं की संख्या प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की सभी सूचनाएँ लोड करें (सभी को पढ़ा हुआ चिह्नित करता है) |
| GET | `/tmpEmail` | सार्वजनिक | — | दैनिक ईमेल सूचना डाइजेस्ट शुरू करें (डिबग/cron एंडपॉइंट) |
| GET | `/:churchId/person/:personId` | JWT | — | किसी विशेष व्यक्ति की सूचनाएँ लोड करें |
| GET | `/:churchId/:id` | JWT | — | ID से सूचना लोड करें |
| POST | `/` | JWT | — | सूचनाएँ बनाएँ या अपडेट करें (बैच) |
| POST | `/create` | JWT | — | कई लोगों के लिए सूचनाएँ बनाएँ। बॉडी: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | किसी व्यक्ति की सभी सूचनाएँ पढ़ी हुई चिह्नित करें |
| POST | `/sendTest` | JWT | — | परीक्षण पुश सूचना भेजें। बॉडी: `{ personId, title }` |
| POST | `/ping` | सार्वजनिक | — | किसी बाहरी ट्रिगर से सूचना बनाएँ। बॉडी: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | सूचना हटाएँ |

### उदाहरण: सूचनाएँ बनाना

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

## सूचना प्राथमिकताएँ (Notification Preferences)

बेस पाथ: `/messaging/notificationpreferences`

| विधि | पाथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | सूचना श्रेणियों की सूची उनके डिफ़ॉल्ट और अनुमत चैनलों के साथ |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की सूचना प्राथमिकताएँ लोड करें (कोई न होने पर डिफ़ॉल्ट स्वतः बनाता है) |
| POST | `/` | JWT | — | वर्तमान उपयोगकर्ता की प्राथमिकताएँ सहेजें। बॉडी: `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay` में से कोई भी, साथ में वैकल्पिक `overrides: [{ categoryKey, channel, optedIn }]` (channel `push`, `email`, `in_app`, या `sms` हो सकता है; लॉक की गई श्रेणियाँ अनदेखी की जाती हैं)। `allowSms` सदस्य की टेक्स्ट रिमाइंडर के लिए सहमति है। पंक्तियों की पुरानी सरणी वाली बॉडी अब भी स्वीकार की जाती है |

## कनेक्शन (Connections)

बेस पाथ: `/messaging/connections`

चैट, समूह बातचीत, निजी संदेश और लाइव स्ट्रीमिंग के लिए WebSocket/रीयल-टाइम कनेक्शन प्रबंधित करता है। पूरे प्रोटोकॉल के लिए [रीयल-टाइम आर्किटेक्चर](../../realtime) देखें।

| विधि | पाथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | सार्वजनिक | — | किसी बातचीत के सभी कनेक्शन लोड करें |
| POST | `/` | सार्वजनिक | — | कनेक्शन रजिस्टर करें (बैच)। बातचीत पर उपस्थिति प्रसारण शुरू करता है। बॉडी आइटम: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | सार्वजनिक | — | socket ID द्वारा कनेक्शन का प्रदर्शन नाम अपडेट करें। बॉडी: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | सार्वजनिक | — | किसी बातचीत से कनेक्शन हटाएँ। उपस्थिति प्रसारण शुरू करता है |
| POST | `/tmpSendAlert` | सार्वजनिक | — | किसी व्यक्ति के कनेक्शनों को सूचना अलर्ट भेजें। बॉडी: `{ churchId, personId }` |

## डिवाइस (Devices)

बेस पाथ: `/messaging/devices`

पुश सूचनाओं और कंटेंट पेयरिंग (जैसे TV डिस्प्ले पर Lessons एप) के लिए डिवाइस रजिस्ट्रेशन प्रबंधित करता है।

| विधि | पाथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | डिवाइस नामांकित या अपडेट करें (मोबाइल पुश रजिस्ट्रेशन)। FCM टोकन या डिवाइस ID से मिलान करता है |
| POST | `/enrollAnon` | सार्वजनिक | — | गुमनाम डिवाइस नामांकित करें और 4-अक्षर का पेयरिंग कोड बनाएँ |
| POST | `/` | सार्वजनिक | — | डिवाइस सहेजें (बैच) |
| GET | `/pair/:pairingCode` | JWT | — | पेयरिंग कोड से डिवाइस पेयर करें। कंटेंट असाइन करने के लिए वैकल्पिक `?contentType=&contentId=` |
| GET | `/status/:deviceId` | सार्वजनिक | — | डिवाइस की पेयरिंग स्थिति जाँचें |
| GET | `/:churchId` | JWT | — | किसी चर्च के सभी डिवाइस लोड करें |
| GET | `/:churchId/person/:personId` | JWT | — | किसी व्यक्ति के सभी डिवाइस लोड करें |
| GET | `/:churchId/:id` | JWT | — | ID से डिवाइस लोड करें |
| DELETE | `/:churchId/:id` | JWT | — | डिवाइस हटाएँ |

### उदाहरण: डिवाइस नामांकित करना

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

## डिवाइस कंटेंट (Device Contents)

बेस पाथ: `/messaging/devicecontents`

पेयर किए गए डिवाइसों के लिए कंटेंट असाइनमेंट प्रबंधित करता है (जैसे TV पर कौन सा पाठ दिख रहा है)।

| विधि | पाथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | किसी डिवाइस के कंटेंट असाइनमेंट लोड करें |
| POST | `/` | JWT | — | डिवाइस कंटेंट असाइनमेंट सहेजें (बैच) |
| DELETE | `/:id` | JWT | — | डिवाइस कंटेंट असाइनमेंट हटाएँ |

## टेक्स्टिंग (Texting)

बेस पाथ: `/messaging/texting`

SMS टेक्स्टिंग प्रदाता, ग्रुप टेक्स्ट मैसेजिंग और डिलीवरी ट्रैकिंग प्रबंधित करता है।

| विधि | पाथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | चर्च के लिए टेक्स्टिंग प्रदाता लोड करें (क्रेडेंशियल मास्क किए जाते हैं) |
| GET | `/status` | JWT | — | `{ enabled }` — क्या चर्च के पास सक्षम टेक्स्टिंग प्रदाता है। कोई भी साइन-इन चर्च उपयोगकर्ता; इसका उपयोग तभी **Text** विकल्प दिखाने के लिए होता है जब टेक्स्ट भेजे जा सकें |
| GET | `/inboundUrl` | JWT | `texting.send` या `settings.edit` | `{ url }` — प्रदाता में चिपकाने के लिए चर्च का इनबाउंड (STOP) वेबहुक URL |
| POST | `/inbound/:churchId/:token` | सार्वजनिक | — | प्रदाता इनबाउंड-संदेश वेबहुक। `token` चर्च ID का HMAC है। ठीक एक स्टॉप शब्द वाला उत्तर (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) मेल खाने वाले हर व्यक्ति को `optedOut` चिह्नित करता है और उनका `allowSms` बंद करता है। `{ optedOut: <count> }` लौटाता है; अन्य उत्तर `{ optedOut: 0 }` लौटाते हैं |
| GET | `/preview/:groupId` | JWT | — | किसी समूह के ग्रुप टेक्स्ट के प्राप्तकर्ताओं का पूर्वावलोकन करें (योग्य, ऑप्ट-आउट, बिना फ़ोन की गिनती) |
| GET | `/sent` | JWT | — | चर्च के सभी भेजे गए टेक्स्ट संदेश रिकॉर्ड लोड करें |
| GET | `/sent/:id/details` | JWT | — | प्रति-प्राप्तकर्ता डिलीवरी लॉग के साथ भेजा गया टेक्स्ट लोड करें |
| POST | `/providers` | JWT | — | टेक्स्टिंग प्रदाता सहेजें (बैच)। API क्रेडेंशियल एन्क्रिप्ट करता है |
| POST | `/send` | JWT | — | किसी समूह के सभी योग्य सदस्यों को SMS भेजें। बॉडी: `{ groupId, message }`। मर्ज फ़ील्ड (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) प्रति प्राप्तकर्ता हल किए जाते हैं |
| POST | `/sendPerson` | JWT | — | किसी एक व्यक्ति को SMS भेजें। बॉडी: `{ personId, phoneNumber, message }`। मर्ज फ़ील्ड हल किए जाते हैं, और हल किया गया पाठ ही लॉग होता है |
| DELETE | `/providers/:id` | JWT | — | टेक्स्टिंग प्रदाता हटाएँ |

### उदाहरण: ग्रुप टेक्स्ट भेजना

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

## ईमेल टेम्पलेट (Email Templates)

बेस पाथ: `/messaging/emailTemplates`

पुन: उपयोग योग्य ईमेल टेम्पलेट प्रबंधित करता है और समूहों को टेम्पलेट वाले ईमेल भेजता है।

| विधि | पाथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के सभी ईमेल टेम्पलेट लोड करें |
| GET | `/:id` | JWT | — | ID से एक ईमेल टेम्पलेट लोड करें |
| GET | `/sendStatus` | JWT | `groupMembers.edit` या `tasks.admin` | चर्च की ग्रुप ईमेल स्थिति: `{ approved, paused, remaining, requested }`। B1Admin का Send Email डायलॉग और वर्कफ़्लो की **Send email** क्रिया इसका उपयोग करती हैं ताकि ईमेल न जाने पर चेतावनी दी जा सके |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | ग्रुप ईमेल के लिए चर्च को अनुमोदित करने हेतु सपोर्ट से अनुरोध करें (प्रति चर्च प्रति सप्ताह अधिकतम एक बार) |
| GET | `/preview/:groupId` | JWT | — | किसी समूह के लिए ईमेल डिलीवरी का पूर्वावलोकन करें (योग्य प्राप्तकर्ताओं की संख्या, बिना ईमेल वाले सदस्य) |
| POST | `/` | JWT | — | ईमेल टेम्पलेट बनाएँ या अपडेट करें (बैच) |
| POST | `/send` | JWT | — | किसी समूह के सभी सदस्यों को टेम्पलेट वाला ईमेल भेजें। बॉडी: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | ईमेल टेम्पलेट हटाएँ |

### उदाहरण: समूह को ईमेल भेजना

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

**समर्थित मर्ज फ़ील्ड:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## ब्लॉक किए गए IP (Blocked IPs)

बेस पाथ: `/messaging/blockedips`

(पुराना) लाइव स्ट्रीमिंग चैट के लिए IP ब्लॉकिंग। B1App क्लाइंट अब `POST /` को कॉल नहीं करता — IP ब्लॉकिंग को unified-delivery माइग्रेशन में हटा दिया गया था। `/clear` रूट अब भी `StreamingServiceController` द्वारा सर्वर-से-सर्वर तरीके से तब कॉल होता है जब स्ट्रीमिंग सेवाएँ सहेजी जाती हैं।

| विधि | पाथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (पुराना) ब्लॉक किए गए IP सहेजें (बैच)। कोई सक्रिय क्लाइंट नहीं |
| POST | `/clear` | JWT | — | विशेष सेवाओं के लिए सभी ब्लॉक किए गए IP साफ़ करें। बॉडी: `[{ serviceId, churchId }]` |

## डिलीवरी लॉग (Delivery Logs)

बेस पाथ: `/messaging/deliverylogs`

भेजे गए संदेशों (SMS, पुश सूचनाएँ, ईमेल) की डिलीवरी स्थिति ट्रैक करता है।

| विधि | पाथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | कंटेंट प्रकार और ID द्वारा डिलीवरी लॉग लोड करें |
| GET | `/person/:personId` | JWT | — | किसी व्यक्ति के डिलीवरी लॉग लोड करें। वैकल्पिक `?startDate=&endDate=` फ़िल्टर |
| GET | `/recent` | JWT | — | चर्च के हाल के डिलीवरी लॉग लोड करें। वैकल्पिक `?limit=` (डिफ़ॉल्ट 100) |
| GET | `/:id` | JWT | — | ID से डिलीवरी लॉग लोड करें |

## संबंधित पृष्ठ

- [रीयल-टाइम आर्किटेक्चर](../../realtime) -- WebSocket प्रोटोकॉल, रूम सब्सक्रिप्शन, और यूनिफ़ाइड डिलीवरी फ़्रेमवर्क
- [वेब पुश सूचनाएँ](../../web-push) -- ब्राउज़र पुश नामांकन और डिलीवरी
- [मेंबरशिप एंडपॉइंट्स](./membership) -- लोग, समूह, भूमिकाएँ, और मुख्य पहचान
- [उपस्थिति एंडपॉइंट्स](./attendance) -- सेवा और विज़िट ट्रैकिंग
- [प्रमाणीकरण और अनुमतियाँ](./authentication) -- लॉगिन फ़्लो, JWT, OAuth, अनुमति मॉडल
- [मॉड्यूल संरचना](../module-structure) -- कोड संगठन के पैटर्न
