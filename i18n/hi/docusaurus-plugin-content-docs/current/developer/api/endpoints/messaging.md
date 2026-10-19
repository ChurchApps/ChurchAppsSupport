---
title: "Messaging एंडपॉइंट"
---

# Messaging एंडपॉइंट

<div class="article-intro">

Messaging मॉड्यूल रीयल-टाइम बातचीत, चैट संदेश, पुश सूचनाएं, SMS/ईमेल डिलीवरी, WebSocket कनेक्शन, निजी संदेश, डिवाइस रजिस्ट्रेशन, और टेक्स्टिंग प्रदाताओं को प्रबंधित करता है। यह सभी ChurchApps अनुप्रयोगों में लाइव स्ट्रीमिंग चैट और अतुल्यकालिक सूचनाओं, दोनों के लिए इस्तेमाल होने वाली संचार परत प्रदान करता है।

</div>

**Base path:** `/messaging`

## बातचीत

Base path: `/messaging/conversations`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | कॉमा-अलग IDs से बातचीत लोड करें, पहले/अंतिम संदेशों के साथ |
| GET | `/messages/:contentType/:contentId` | JWT | — | कंटेंट के लिए बातचीत लोड करें, पेजिनेटेड संदेशों के साथ (`?page=&limit=`) |
| GET | `/posts` | JWT | — | वर्तमान उपयोगकर्ता के समूहों की post-प्रकार बातचीत प्राप्त करें |
| GET | `/posts/group/:groupId` | JWT | — | किसी विशिष्ट समूह की post-प्रकार बातचीत प्राप्त करें |
| GET | `/current/:churchId/:contentType/:contentId` | सार्वजनिक | — | कंटेंट के लिए वर्तमान बातचीत प्राप्त करें या बनाएं (contentId को स्वतः डिक्रिप्ट करता है) |
| GET | `/:churchId/:contentType/:contentId` | सार्वजनिक | — | कंटेंट प्रकार और ID से बातचीत लोड करें |
| GET | `/:churchId/:id` | सार्वजनिक | — | ID से एक बातचीत लोड करें |
| POST | `/` | JWT | — | बातचीत बनाएं या अपडेट करें (बैच) |
| POST | `/start` | JWT | — | प्रारंभिक टिप्पणी संदेश के साथ नई बातचीत शुरू करें |
| DELETE | `/:churchId/:id` | JWT | — | एक बातचीत हटाएं |

### व्यक्ति नोट्स पर पहुंच नियंत्रण

`contentType: "person"` (व्यक्ति रिकॉर्ड पर Notes टैब) या `contentType: "personConfidential"` (Confidential Notes सेक्शन) वाली बातचीत हर पढ़ने और लिखने के रास्ते पर नियंत्रित होती हैं, जिनमें ऊपर दिए सार्वजनिक रूट भी शामिल हैं; इन कंटेंट प्रकारों के लिए वे `401` लौटाते हैं। `person` के लिए MembershipApi **People / Edit** अनुमति चाहिए; `personConfidential` के लिए **People / View Confidential Notes** चाहिए। स्कोप्ड API keys के लिए, `people:write` दोनों क्रियाएं वहन करता है (key के उपयोगकर्ता के पास अंतर्निहित भूमिका अनुमति अब भी होनी चाहिए)।

### समूह और इवेंट नोट्स पर पहुंच नियंत्रण {#group-and-event-notes-access-control}

दो और नोट कंटेंट प्रकार उसी तरह नियंत्रित होते हैं, हर पढ़ने और लिखने के रास्ते पर (ऊपर के सार्वजनिक रूट सहित), और इन्हें कभी भी अनाम पोस्टिंग के लिए नहीं खोला जाता:

- **`groupNote`** (`contentId` = समूह ID) -- किसी समूह पर **Leader notes** फ़ीड। केवल उस समूह के लीडर (JWT पर `leaderGroupIds`) पढ़ या पोस्ट कर सकते हैं। कोई भी स्टाफ अनुमति पहुंच नहीं देती, जिसमें `content.edit` और समूह-सदस्यता अनुमतियां भी शामिल हैं।
- **`eventNote`** (`contentId` = इवेंट ID) -- कैलेंडर इवेंट पर नोट्स। `content.edit` या **Calendars / Admin** वाले स्टाफ हमेशा पढ़ और पोस्ट कर सकते हैं। अन्यथा पहुंच इवेंट के `notesViewRole` (पढ़ना) और `notesPostRole` (पोस्ट करना) का पालन करती है: `staff` (डिफ़ॉल्ट, जब फ़ील्ड `null` हो) किसी और को अनुमति नहीं देता, `leaders` इवेंट के समूह के लीडरों को अनुमति देता है, और `members` इवेंट समूह के सदस्यों और लीडरों को अनुमति देता है। जिस इवेंट में `groupId` नहीं है, वह केवल स्टाफ के लिए है।

### वर्कफ़्लो कार्ड नोट्स पर पहुंच नियंत्रण

`contentType: "workflowCard"` वाली बातचीत (वर्कफ़्लो कार्ड के नोट्स, जहां `contentId` कार्ड का टास्क ID है) केवल वही व्यक्ति पढ़ और लिख सकता है जो वह कार्ड खोल सकता है: DoingApi **Tasks / View** अनुमति वाला उपयोगकर्ता, या वह व्यक्ति या समूह जिसे कार्ड असाइन किया गया है, बनाया गया है, या जिसके बारे में है। बाकी सभी को ऊपर के सार्वजनिक रूट सहित हर पढ़ने वाले रास्ते पर `401` मिलता है। कार्ड की बातचीत कार्ड के माध्यम से `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; पहली जुड़ी बातचीत जीतती है) से जुड़ती है, जिसे कार्ड के संपादक और उसका असाइनी कॉल कर सकते हैं।

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

## संदेश

Base path: `/messaging/messages`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | किसी बातचीत के सभी संदेश लोड करें |
| GET | `/catchup/:churchId/:conversationId` | सार्वजनिक | — | किसी बातचीत के सभी संदेश लोड करें (लाइव चैट के लिए सार्वजनिक catchup) |
| GET | `/:churchId/:id` | सार्वजनिक | — | ID से एक संदेश लोड करें |
| POST | `/` | JWT | — | संदेश सहेजें (बैच)। रीयल-टाइम अपडेट भेजता है और सूचनाएं ट्रिगर करता है। मौजूदा संदेश अपडेट करने के लिए लेखक होना या `content.edit` होना आवश्यक है; सहेजा गया लेखक कभी बदला नहीं जा सकता |
| POST | `/send` | सार्वजनिक | — | संदेश भेजें (बैच, सार्वजनिक)। WebSocket के माध्यम से रीयल-टाइम अपडेट भेजता है और सूचनाएं ट्रिगर करता है |
| POST | `/setCallout` | JWT | — | (पुराना) एक callout संदेश रीयल टाइम में प्रसारित करें। कोई सक्रिय क्लाइंट नहीं; लाइव स्ट्रीम चैट अब callouts रेंडर नहीं करती |
| DELETE | `/:churchId/:id` | JWT | — | एक संदेश हटाएं और हटाने को रीयल टाइम में प्रसारित करें। देखें [संदेश मॉडरेशन](#message-moderation) |

### संदेश मॉडरेशन {#message-moderation}

संदेश हटाना इनके लिए अनुमति है:

- संदेश का लेखक;
- चर्च में कहीं भी `content.edit` वाला स्टाफ;
- **समूह लीडर**, उन बातचीत के लिए जिनका `contentType` `group` या `groupAnnouncement` है और जिनका `contentId` ऐसा समूह है जिसका वे नेतृत्व करते हैं (JWT पर `leaderGroupIds`)।

व्यक्ति-नोट बातचीत (`person` / `personConfidential`) कभी भी लीडर-मॉडरेट नहीं होती — वे इसके बजाय नोट्स अनुमतियां (`people.edit`, `people.viewConfidentialNotes`) उपयोग करती हैं।

लीडरों को केवल हटाने की अनुमति मिलती है, संपादन की नहीं: दूसरे सदस्य का संदेश फिर से लिखना केवल लेखक और `content.edit` स्टाफ तक सीमित रहता है।

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

## निजी संदेश

Base path: `/messaging/privatemessages`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के सभी निजी संदेश लोड करें (हर बातचीत का अंतिम संदेश शामिल, सभी को पढ़ा हुआ चिह्नित करता है) |
| GET | `/existing/:personId` | JWT | — | किसी विशिष्ट व्यक्ति के साथ मौजूदा निजी बातचीत खोजें |
| GET | `/:id` | JWT | — | ID से एक निजी संदेश लोड करें (यदि वर्तमान उपयोगकर्ता को संबोधित है तो सूचना साफ़ करता है) |
| POST | `/` | JWT | — | निजी संदेश भेजें (बैच)। प्राप्तकर्ता को पुश सूचना ट्रिगर करता है |

## सूचनाएं

Base path: `/messaging/notifications`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | वर्तमान उपयोगकर्ता के लिए अपठित सूचना संख्या प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की सभी सूचनाएं लोड करें (सभी को पढ़ा हुआ चिह्नित करता है) |
| GET | `/tmpEmail` | सार्वजनिक | — | दैनिक ईमेल सूचना डाइजेस्ट ट्रिगर करें (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | किसी विशिष्ट व्यक्ति की सूचनाएं लोड करें |
| GET | `/:churchId/:id` | JWT | — | ID से एक सूचना लोड करें |
| POST | `/` | JWT | — | सूचनाएं बनाएं या अपडेट करें (बैच) |
| POST | `/create` | JWT | — | कई लोगों के लिए सूचनाएं बनाएं। Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | किसी व्यक्ति की सभी सूचनाओं को पढ़ा हुआ चिह्नित करें |
| POST | `/sendTest` | JWT | — | एक टेस्ट पुश सूचना भेजें। Body: `{ personId, title }` |
| POST | `/ping` | सार्वजनिक | — | बाहरी ट्रिगर से एक सूचना बनाएं। Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | एक सूचना हटाएं |

### उदाहरण: सूचनाएं बनाना

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

## सूचना प्राथमिकताएं

Base path: `/messaging/notificationpreferences`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | सूचना श्रेणियां उनके डिफ़ॉल्ट और अनुमत चैनलों के साथ सूचीबद्ध करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की सूचना प्राथमिकताएं लोड करें (कोई न होने पर डिफ़ॉल्ट स्वतः बनाता है) |
| POST | `/` | JWT | — | वर्तमान उपयोगकर्ता की प्राथमिकताएं सहेजें। Body: `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, में से कोई भी, साथ ही वैकल्पिक `overrides: [{ categoryKey, channel, optedIn }]` (channel `push`, `email`, `in_app`, या `sms` हो सकता है; लॉक की गई श्रेणियां अनदेखी होती हैं)। `allowSms` सदस्य की टेक्स्ट रिमाइंडर के लिए सहमति है। पुराने पंक्ति-सरणी body को अब भी स्वीकार किया जाता है |

## कनेक्शन

Base path: `/messaging/connections`

चैट, समूह बातचीत, निजी संदेश और लाइव स्ट्रीमिंग के लिए WebSocket/रीयल-टाइम कनेक्शन प्रबंधित करता है। पूरे एंड-टू-एंड प्रोटोकॉल के लिए [Real-time Architecture](../../realtime) देखें।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | सार्वजनिक | — | किसी बातचीत के सभी कनेक्शन लोड करें |
| POST | `/` | सार्वजनिक | — | कनेक्शन रजिस्टर करें (बैच)। बातचीत पर उपस्थिति प्रसारण ट्रिगर करता है। Body आइटम: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | सार्वजनिक | — | socket ID द्वारा एक कनेक्शन का प्रदर्शन नाम अपडेट करें। Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | सार्वजनिक | — | किसी बातचीत से एक कनेक्शन हटाएं। उपस्थिति प्रसारण ट्रिगर करता है |
| POST | `/tmpSendAlert` | सार्वजनिक | — | किसी व्यक्ति के कनेक्शनों को सूचना अलर्ट भेजें। Body: `{ churchId, personId }` |

## डिवाइस

Base path: `/messaging/devices`

पुश सूचनाओं और कंटेंट पेयरिंग (जैसे TV पर Lessons ऐप) के लिए डिवाइस रजिस्ट्रेशन प्रबंधित करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | डिवाइस enroll करें या अपडेट करें (मोबाइल पुश रजिस्ट्रेशन)। FCM token या डिवाइस ID से मेल खाता है |
| POST | `/enrollAnon` | सार्वजनिक | — | एक अनाम डिवाइस enroll करें और 4-अक्षरों का पेयरिंग कोड बनाएं |
| POST | `/` | सार्वजनिक | — | डिवाइस सहेजें (बैच) |
| GET | `/pair/:pairingCode` | JWT | — | पेयरिंग कोड का उपयोग करके एक डिवाइस पेयर करें। कंटेंट असाइन करने के लिए वैकल्पिक `?contentType=&contentId=` |
| GET | `/status/:deviceId` | सार्वजनिक | — | किसी डिवाइस की पेयरिंग स्थिति जांचें |
| GET | `/:churchId` | JWT | — | किसी चर्च के सभी डिवाइस लोड करें |
| GET | `/:churchId/person/:personId` | JWT | — | किसी व्यक्ति के सभी डिवाइस लोड करें |
| GET | `/:churchId/:id` | JWT | — | ID से एक डिवाइस लोड करें |
| DELETE | `/:churchId/:id` | JWT | — | एक डिवाइस हटाएं |

### उदाहरण: डिवाइस enroll करना

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

## डिवाइस कंटेंट

Base path: `/messaging/devicecontents`

पेयर किए गए डिवाइसों के लिए कंटेंट असाइनमेंट प्रबंधित करता है (जैसे TV पर कौन-सा पाठ दिखाया जा रहा है)।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | किसी डिवाइस के कंटेंट असाइनमेंट लोड करें |
| POST | `/` | JWT | — | डिवाइस कंटेंट असाइनमेंट सहेजें (बैच) |
| DELETE | `/:id` | JWT | — | एक डिवाइस कंटेंट असाइनमेंट हटाएं |

## टेक्स्टिंग

Base path: `/messaging/texting`

SMS टेक्स्टिंग प्रदाता, समूह टेक्स्ट संदेश, और डिलीवरी ट्रैकिंग प्रबंधित करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | चर्च के लिए टेक्स्टिंग प्रदाता लोड करें (क्रेडेंशियल मास्क किए जाते हैं) |
| GET | `/status` | JWT | — | `{ enabled }` — क्या चर्च के पास सक्षम टेक्स्टिंग प्रदाता है। कोई भी साइन-इन चर्च उपयोगकर्ता; **Text** विकल्प तभी दिखाने के लिए उपयोग होता है जब टेक्स्ट भेजे जा सकें |
| GET | `/inboundUrl` | JWT | `texting.send` या `settings.edit` | `{ url }` — चर्च का इनबाउंड (STOP) webhook URL, प्रदाता में पेस्ट करने के लिए |
| POST | `/inbound/:churchId/:token` | सार्वजनिक | — | प्रदाता इनबाउंड-संदेश webhook। `token` चर्च ID का HMAC है। ठीक एक स्टॉप शब्द (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) वाला उत्तर मेल खाने वाले हर व्यक्ति को `optedOut` चिह्नित करता है और उनका `allowSms` बंद करता है। `{ optedOut: <count> }` लौटाता है; अन्य उत्तर `{ optedOut: 0 }` लौटाते हैं |
| GET | `/preview/:groupId` | JWT | — | समूह टेक्स्ट के लिए प्राप्तकर्ताओं का पूर्वावलोकन (योग्य, opted-out, बिना फ़ोन की गिनती) |
| GET | `/sent` | JWT | — | चर्च के सभी भेजे गए टेक्स्ट संदेश रिकॉर्ड लोड करें |
| GET | `/sent/:id/details` | JWT | — | प्रति-प्राप्तकर्ता डिलीवरी लॉग के साथ एक भेजा गया टेक्स्ट लोड करें |
| POST | `/providers` | JWT | — | टेक्स्टिंग प्रदाता सहेजें (बैच)। API क्रेडेंशियल एन्क्रिप्ट करता है |
| POST | `/send` | JWT | — | किसी समूह के सभी योग्य सदस्यों को SMS भेजें। Body: `{ groupId, message }`। मर्ज फ़ील्ड (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) प्रति प्राप्तकर्ता हल होते हैं |
| POST | `/sendPerson` | JWT | — | एक व्यक्ति को SMS भेजें। Body: `{ personId, phoneNumber, message }`। मर्ज फ़ील्ड हल होते हैं, और हल किया गया पाठ ही लॉग होता है |
| DELETE | `/providers/:id` | JWT | — | एक टेक्स्टिंग प्रदाता हटाएं |

### उदाहरण: समूह टेक्स्ट भेजना

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

## ईमेल टेम्पलेट

Base path: `/messaging/emailTemplates`

पुन: उपयोग योग्य ईमेल टेम्पलेट और समूहों को टेम्पलेटेड ईमेल भेजना प्रबंधित करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के सभी ईमेल टेम्पलेट लोड करें |
| GET | `/:id` | JWT | — | ID से एक ईमेल टेम्पलेट लोड करें |
| GET | `/preview/:groupId` | JWT | — | किसी समूह के लिए ईमेल डिलीवरी का पूर्वावलोकन करें (योग्य प्राप्तकर्ता संख्या, बिना ईमेल वाले सदस्य) |
| POST | `/` | JWT | — | ईमेल टेम्पलेट बनाएं या अपडेट करें (बैच) |
| POST | `/send` | JWT | — | किसी समूह के सभी सदस्यों को टेम्पलेटेड ईमेल भेजें। Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | एक ईमेल टेम्पलेट हटाएं |

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

## ब्लॉक किए गए IP

Base path: `/messaging/blockedips`

(पुराना) लाइव स्ट्रीमिंग चैट के लिए IP-ब्लॉकिंग। B1App क्लाइंट अब `POST /` को कॉल नहीं करता — IP ब्लॉकिंग unified-delivery माइग्रेशन में हटा दी गई थी। `/clear` रूट अब भी `StreamingServiceController` द्वारा सर्वर-से-सर्वर कॉल होता है, जब स्ट्रीमिंग सेवाएं सहेजी जाती हैं।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (पुराना) ब्लॉक किए गए IP सहेजें (बैच)। कोई सक्रिय क्लाइंट नहीं |
| POST | `/clear` | JWT | — | विशिष्ट सेवाओं के लिए सभी ब्लॉक किए गए IP साफ़ करें। Body: `[{ serviceId, churchId }]` |

## डिलीवरी लॉग

Base path: `/messaging/deliverylogs`

भेजे गए संदेशों (SMS, पुश सूचनाएं, ईमेल) की डिलीवरी स्थिति ट्रैक करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | कंटेंट प्रकार और ID द्वारा डिलीवरी लॉग लोड करें |
| GET | `/person/:personId` | JWT | — | किसी व्यक्ति के डिलीवरी लॉग लोड करें। वैकल्पिक `?startDate=&endDate=` फ़िल्टर |
| GET | `/recent` | JWT | — | चर्च के हाल के डिलीवरी लॉग लोड करें। वैकल्पिक `?limit=` (डिफ़ॉल्ट 100) |
| GET | `/:id` | JWT | — | ID से एक डिलीवरी लॉग लोड करें |

## संबंधित पेज

- [Real-time Architecture](../../realtime) -- WebSocket प्रोटोकॉल, रूम सब्सक्रिप्शन, और unified delivery framework
- [Web Push Notifications](../../web-push) -- ब्राउज़र पुश enrollment और डिलीवरी
- [Membership Endpoints](./membership) -- लोग, समूह, भूमिकाएं, और मूल पहचान
- [Attendance Endpoints](./attendance) -- सेवा और विज़िट ट्रैकिंग
- [Authentication & Permissions](./authentication) -- लॉगिन फ़्लो, JWT, OAuth, अनुमति मॉडल
- [Module Structure](../module-structure) -- कोड संगठन पैटर्न
