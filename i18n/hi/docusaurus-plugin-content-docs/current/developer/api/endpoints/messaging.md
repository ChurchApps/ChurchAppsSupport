---
title: "मैसेजिंग एंडपॉइंट"
description: "ChurchApps मैसेजिंग API एंडपॉइंट का संदर्भ: बातचीत, नोट तक पहुँच के नियम, टेक्स्टिंग, ईमेल टेम्पलेट, सूचनाएँ और डिवाइस।"
---

# मैसेजिंग एंडपॉइंट

<div class="article-intro">

मैसेजिंग मॉड्यूल रीयल-टाइम बातचीत, चैट संदेश, पुश सूचनाएँ, SMS/ईमेल डिलीवरी, WebSocket कनेक्शन, निजी संदेश, डिवाइस पंजीकरण और टेक्स्टिंग प्रदाताओं का प्रबंधन करता है। यह सभी ChurchApps एप्लिकेशन में लाइव स्ट्रीमिंग चैट और अतुल्यकालिक (asynchronous) सूचनाओं, दोनों के लिए उपयोग होने वाली संचार परत प्रदान करता है।

</div>

**मूल पथ:** `/messaging`

## बातचीत

मूल पथ: `/messaging/conversations`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | कॉमा से अलग किए गए ID द्वारा बातचीत लोड करें, पहले और आखिरी संदेशों के साथ |
| GET | `/messages/:contentType/:contentId` | JWT | — | कंटेंट के लिए बातचीत पेजिनेटेड संदेशों के साथ लोड करें (`?page=&limit=`) |
| GET | `/posts` | JWT | — | वर्तमान उपयोगकर्ता के समूहों की post-प्रकार की बातचीत प्राप्त करें |
| GET | `/posts/group/:groupId` | JWT | — | किसी विशिष्ट समूह की post-प्रकार की बातचीत प्राप्त करें |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | B1 Admin के Notes पेज के लिए हर रिकॉर्ड के सबसे नए नोट। `section` `people`, `groups`, `events` या `workflows` होना चाहिए (अन्यथा 400); `limit` का डिफ़ॉल्ट 25 है (अधिकतम 100); `before` पिछले पेज का कर्सर है। हर नोट अपने प्रकार के नियम से गुज़रता है (People Edit / गोपनीय नोट अनुमति, समूह के लीडर, इवेंट देखने वाले, वर्कफ़्लो कार्ड देखने वाले), इसलिए कॉलर केवल वही नोट देखते हैं जिन्हें वे खोल सकते हैं। नोट का टेक्स्ट 300 अक्षरों पर काटा जाता है |
| GET | `/current/:churchId/:contentType/:contentId` | सार्वजनिक | — | कंटेंट के लिए वर्तमान बातचीत प्राप्त करें या बनाएँ (contentId को स्वतः डिक्रिप्ट करता है) |
| GET | `/:churchId/:contentType/:contentId` | सार्वजनिक | — | कंटेंट प्रकार और ID के आधार पर बातचीत लोड करें |
| GET | `/:churchId/:id` | सार्वजनिक | — | ID से एक बातचीत लोड करें |
| POST | `/` | JWT | — | बातचीत बनाएँ या अपडेट करें (बैच) |
| POST | `/start` | JWT | — | प्रारंभिक टिप्पणी संदेश के साथ नई बातचीत शुरू करें |
| DELETE | `/:churchId/:id` | JWT | — | बातचीत हटाएँ |

### व्यक्ति नोट का एक्सेस नियंत्रण

`contentType: "person"` (व्यक्ति रिकॉर्ड पर Notes टैब) या `contentType: "personConfidential"` (Confidential Notes सेक्शन) वाली बातचीत हर पढ़ने और लिखने के मार्ग पर सीमित है, जिनमें ऊपर दिए सार्वजनिक रूट भी शामिल हैं। इन कंटेंट प्रकारों के लिए वे `401` लौटाते हैं। `person` के लिए MembershipApi **People / Edit** अनुमति चाहिए; `personConfidential` के लिए **People / View Confidential Notes** चाहिए। स्कोप्ड API कुंजियों के लिए `people:write` में दोनों क्रियाएँ शामिल होती हैं (कुंजी के उपयोगकर्ता के पास भी अंतर्निहित भूमिका की अनुमति होनी चाहिए)।

### समूह और इवेंट नोट का एक्सेस नियंत्रण {#group-and-event-notes-access-control}

दो और नोट कंटेंट प्रकार उसी तरह सीमित हैं, हर पढ़ने और लिखने के मार्ग पर (ऊपर के सार्वजनिक रूट सहित), और इन पर गुमनाम पोस्टिंग कभी नहीं होती:

- **`groupNote`** (`contentId` = समूह ID) -- किसी समूह पर **Leader notes** फ़ीड। केवल उस समूह के लीडर (JWT पर `leaderGroupIds`) पढ़ या पोस्ट कर सकते हैं। `content.edit` और समूह-सदस्यता अनुमतियों सहित कोई भी स्टाफ अनुमति एक्सेस नहीं देती।
- **`eventNote`** (`contentId` = इवेंट ID) -- कैलेंडर इवेंट पर नोट। `content.edit` या **Calendars / Admin** वाले स्टाफ हमेशा पढ़ और पोस्ट कर सकते हैं। अन्यथा एक्सेस इवेंट के `notesViewRole` (पढ़ना) और `notesPostRole` (पोस्ट करना) का पालन करता है: `staff` (डिफ़ॉल्ट, जब फ़ील्ड `null` हो) किसी और को अनुमति नहीं देता, `leaders` इवेंट के समूह के लीडर को अनुमति देता है, और `members` इवेंट समूह के सदस्यों और लीडर्स को अनुमति देता है। जिस इवेंट में `groupId` नहीं है, वह केवल स्टाफ के लिए है।

### वर्कफ़्लो कार्ड नोट का एक्सेस नियंत्रण

`contentType: "workflowCard"` वाली बातचीत (वर्कफ़्लो कार्ड पर नोट, जहाँ `contentId` कार्ड का टास्क ID है) केवल वही व्यक्ति पढ़ और लिख सकता है जो वह कार्ड खोल सकता है: DoingApi **Tasks / View** अनुमति वाला उपयोगकर्ता, या वह व्यक्ति या समूह जिसे कार्ड सौंपा गया है, जिसने उसे बनाया है, या जिससे वह संबंधित है। अन्य सभी को ऊपर के सार्वजनिक रूट सहित हर पढ़ने के मार्ग पर `401` मिलता है। कार्ड की बातचीत स्वयं कार्ड के माध्यम से `POST /doing/tasks/:id/conversation` (बॉडी `{ "conversationId": "..." }`) से जुड़ती है; पहली जुड़ी बातचीत ही मान्य रहती है। इसे कार्ड के संपादक और उसका असाइनी कॉल कर सकते हैं।

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

मूल पथ: `/messaging/messages`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | किसी बातचीत के सभी संदेश लोड करें |
| GET | `/catchup/:churchId/:conversationId` | सार्वजनिक | — | किसी बातचीत के सभी संदेश लोड करें (लाइव चैट के लिए सार्वजनिक catchup) |
| GET | `/:churchId/:id` | सार्वजनिक | — | ID से एक संदेश लोड करें |
| POST | `/` | JWT | — | संदेश सहेजें (बैच)। रीयल-टाइम अपडेट भेजता है और सूचनाएँ ट्रिगर करता है। मौजूदा संदेश अपडेट करने के लिए लेखक होना या `content.edit` रखना ज़रूरी है; सहेजा गया लेखक कभी बदला नहीं जा सकता |
| POST | `/send` | सार्वजनिक | — | संदेश भेजें (बैच, सार्वजनिक)। WebSocket के ज़रिए रीयल-टाइम अपडेट भेजता है और सूचनाएँ ट्रिगर करता है |
| POST | `/setCallout` | JWT | — | (पुराना) संदेश को रीयल-टाइम में callout के रूप में प्रसारित करें। कोई सक्रिय क्लाइंट नहीं; लाइव स्ट्रीम चैट अब callouts नहीं दिखाता |
| DELETE | `/:churchId/:id` | JWT | — | संदेश हटाएँ और हटाने को रीयल-टाइम में प्रसारित करें। देखें [संदेश मॉडरेशन](#message-moderation) |

### संदेश मॉडरेशन

संदेश हटाने की अनुमति इन्हें है:

- संदेश का लेखक;
- `content.edit` वाला स्टाफ (चर्च में कहीं भी);
- **समूह लीडर**, उन बातचीत के लिए जिनका `contentType` `group` या `groupAnnouncement` है और जिनका `contentId` ऐसा समूह है जिसका वे नेतृत्व करते हैं (JWT पर `leaderGroupIds`)।

व्यक्ति-नोट बातचीत (`person` / `personConfidential`) का मॉडरेशन लीडर कभी नहीं करते; उनके लिए नोट की अनुमतियाँ (`people.edit`, `people.viewConfidentialNotes`) लागू होती हैं।

लीडर केवल हटा सकते हैं, संपादित नहीं कर सकते: किसी और सदस्य का संदेश फिर से लिखना केवल लेखक और `content.edit` स्टाफ तक सीमित रहता है।

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

मूल पथ: `/messaging/privatemessages`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के सभी निजी संदेश लोड करें (हर बातचीत का आखिरी संदेश शामिल, सभी को पढ़ा हुआ चिह्नित करता है) |
| GET | `/existing/:personId` | JWT | — | किसी विशिष्ट व्यक्ति के साथ मौजूदा निजी बातचीत खोजें |
| GET | `/:id` | JWT | — | ID से निजी संदेश लोड करें (यदि वर्तमान उपयोगकर्ता को संबोधित है तो सूचना हटाता है) |
| POST | `/` | JWT | — | निजी संदेश भेजें (बैच)। प्राप्तकर्ता को पुश सूचना भेजता है |

## सूचनाएँ

मूल पथ: `/messaging/notifications`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | वर्तमान उपयोगकर्ता की बिना पढ़ी सूचनाओं की गिनती प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की सभी सूचनाएँ लोड करें (सभी को पढ़ा हुआ चिह्नित करता है) |
| GET | `/tmpEmail` | सार्वजनिक | — | दैनिक ईमेल सूचना डाइजेस्ट ट्रिगर करें (डीबग/cron एंडपॉइंट) |
| GET | `/:churchId/person/:personId` | JWT | — | किसी विशिष्ट व्यक्ति की सूचनाएँ लोड करें |
| GET | `/:churchId/:id` | JWT | — | ID से सूचना लोड करें |
| POST | `/` | JWT | — | सूचनाएँ बनाएँ या अपडेट करें (बैच) |
| POST | `/create` | JWT | — | कई लोगों के लिए सूचनाएँ बनाएँ। बॉडी: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | किसी व्यक्ति की सभी सूचनाओं को पढ़ा हुआ चिह्नित करें |
| POST | `/sendTest` | JWT | — | परीक्षण पुश सूचना भेजें। बॉडी: `{ personId, title }` |
| POST | `/ping` | सार्वजनिक | — | बाहरी ट्रिगर से सूचना बनाएँ। बॉडी: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
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

## सूचना प्राथमिकताएँ

मूल पथ: `/messaging/notificationpreferences`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | सूचना श्रेणियों की सूची उनके डिफ़ॉल्ट और अनुमत चैनलों के साथ |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की सूचना प्राथमिकताएँ लोड करें (कोई न होने पर डिफ़ॉल्ट स्वतः बनाता है) |
| POST | `/` | JWT | — | वर्तमान उपयोगकर्ता की प्राथमिकताएँ सहेजें। बॉडी: `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay` में से कोई भी, साथ में वैकल्पिक `overrides: [{ categoryKey, channel, optedIn }]` (channel `push`, `email`, `in_app`, या `sms` हो सकता है; लॉक की गई श्रेणियाँ अनदेखी होती हैं)। `allowSms` सदस्य की टेक्स्ट रिमाइंडर के लिए सहमति है। पंक्तियों की पुरानी सरणी वाली बॉडी अभी भी स्वीकार की जाती है |

## कनेक्शन

मूल पथ: `/messaging/connections`

चैट, समूह बातचीत, निजी संदेश और लाइव स्ट्रीमिंग के लिए WebSocket/रीयल-टाइम कनेक्शन का प्रबंधन करता है। पूरे प्रोटोकॉल के लिए देखें [रीयल-टाइम आर्किटेक्चर](../../realtime.md)।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | सार्वजनिक | — | किसी बातचीत के सभी कनेक्शन लोड करें |
| POST | `/` | सार्वजनिक | — | कनेक्शन पंजीकृत करें (बैच)। बातचीत पर उपस्थिति प्रसारण ट्रिगर करता है। बॉडी आइटम: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | सार्वजनिक | — | socket ID द्वारा कनेक्शन का प्रदर्शन नाम अपडेट करें। बॉडी: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | सार्वजनिक | — | किसी बातचीत से कनेक्शन हटाएँ। उपस्थिति प्रसारण ट्रिगर करता है |
| POST | `/tmpSendAlert` | सार्वजनिक | — | किसी व्यक्ति के कनेक्शन को सूचना अलर्ट भेजें। बॉडी: `{ churchId, personId }` |

## डिवाइस

मूल पथ: `/messaging/devices`

पुश सूचनाओं और कंटेंट पेयरिंग (जैसे TV डिस्प्ले पर Lessons ऐप) के लिए डिवाइस पंजीकरण का प्रबंधन करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | डिवाइस नामांकित करें या अपडेट करें (मोबाइल पुश पंजीकरण)। FCM टोकन या डिवाइस ID से मेल खाता है |
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
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## डिवाइस कंटेंट

मूल पथ: `/messaging/devicecontents`

पेयर किए गए डिवाइसों के लिए कंटेंट असाइनमेंट का प्रबंधन करता है (जैसे TV पर कौन-सा पाठ दिख रहा है)।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | किसी डिवाइस के कंटेंट असाइनमेंट लोड करें |
| POST | `/` | JWT | — | डिवाइस कंटेंट असाइनमेंट सहेजें (बैच) |
| DELETE | `/:id` | JWT | — | डिवाइस कंटेंट असाइनमेंट हटाएँ |

## टेक्स्टिंग

मूल पथ: `/messaging/texting`

SMS टेक्स्टिंग प्रदाताओं, समूह टेक्स्ट संदेश और डिलीवरी ट्रैकिंग का प्रबंधन करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | चर्च के लिए टेक्स्टिंग प्रदाता लोड करें (क्रेडेंशियल मास्क किए जाते हैं) |
| GET | `/status` | JWT | — | `{ enabled }` -- क्या चर्च के पास सक्षम टेक्स्टिंग प्रदाता है। कोई भी साइन-इन चर्च उपयोगकर्ता; केवल तब **Text** विकल्प दिखाने के लिए जब टेक्स्ट भेजे जा सकें |
| GET | `/inboundUrl` | JWT | `texting.send` या `settings.edit` | `{ url }` -- चर्च का इनबाउंड (STOP) webhook URL, जिसे प्रदाता में चिपकाना होता है |
| POST | `/inbound/:churchId/:token` | सार्वजनिक | — | प्रदाता इनबाउंड-संदेश webhook। `token` चर्च ID का HMAC है। ऐसा उत्तर जो बिल्कुल स्टॉप शब्द हो (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) तो मेल खाने वाले हर व्यक्ति को `optedOut` चिह्नित करता है और उनका `allowSms` बंद करता है। `{ optedOut: <count> }` लौटाता है; अन्य उत्तर `{ optedOut: 0 }` लौटाते हैं |
| GET | `/preview/:groupId` | JWT | — | समूह टेक्स्ट के प्राप्तकर्ताओं का पूर्वावलोकन करें (योग्य, opt-out, बिना फ़ोन की गिनती) |
| GET | `/sent` | JWT | — | चर्च के सभी भेजे गए टेक्स्ट संदेश रिकॉर्ड लोड करें |
| GET | `/sent/:id/details` | JWT | — | प्रति प्राप्तकर्ता डिलीवरी लॉग के साथ भेजा गया टेक्स्ट लोड करें |
| POST | `/providers` | JWT | — | टेक्स्टिंग प्रदाता सहेजें (बैच)। API क्रेडेंशियल एन्क्रिप्ट करता है |
| POST | `/send` | JWT | — | किसी समूह के सभी योग्य सदस्यों को SMS भेजें। बॉडी: `{ groupId, message }`। मर्ज फ़ील्ड (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) हर प्राप्तकर्ता के लिए हल किए जाते हैं |
| POST | `/sendPerson` | JWT | — | किसी एक व्यक्ति को SMS भेजें। बॉडी: `{ personId, phoneNumber, message }`। मर्ज फ़ील्ड हल किए जाते हैं, और हल किया हुआ टेक्स्ट ही लॉग होता है |
| DELETE | `/providers/:id` | JWT | — | टेक्स्टिंग प्रदाता हटाएँ |

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

मूल पथ: `/messaging/emailTemplates`

पुन: उपयोग योग्य ईमेल टेम्पलेट का प्रबंधन और समूहों को टेम्पलेट-आधारित ईमेल भेजना।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के सभी ईमेल टेम्पलेट लोड करें |
| GET | `/:id` | JWT | — | ID से एक ईमेल टेम्पलेट लोड करें |
| GET | `/sendStatus` | JWT | `groupMembers.edit` या `tasks.admin` | चर्च की समूह ईमेल स्थिति: `{ approved, paused, remaining, requested }`। B1Admin का Send Email डायलॉग और वर्कफ़्लो **Send email** क्रिया इसका उपयोग करते हैं ताकि ईमेल न जाने पर चेतावनी दी जा सके |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | समूह ईमेल के लिए चर्च को स्वीकृति देने हेतु सहायता टीम से अनुरोध करें (प्रति चर्च प्रति सप्ताह अधिकतम एक बार) |
| GET | `/preview/:groupId` | JWT | — | किसी समूह के लिए ईमेल डिलीवरी का पूर्वावलोकन करें (योग्य प्राप्तकर्ताओं की संख्या, बिना ईमेल वाले सदस्य) |
| POST | `/` | JWT | — | ईमेल टेम्पलेट बनाएँ या अपडेट करें (बैच) |
| POST | `/send` | JWT | — | किसी समूह के सभी सदस्यों को टेम्पलेट-आधारित ईमेल भेजें। बॉडी: `{ groupId, subject, htmlContent }` |
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

## ब्लॉक किए गए IP

मूल पथ: `/messaging/blockedips`

(पुराना) लाइव स्ट्रीमिंग चैट के लिए IP ब्लॉकिंग। B1App क्लाइंट अब `POST /` को कॉल नहीं करता -- unified-delivery माइग्रेशन में IP ब्लॉकिंग हटा दी गई थी। `/clear` रूट अभी भी `StreamingServiceController` द्वारा सर्वर-से-सर्वर कॉल होता है, जब स्ट्रीमिंग सेवाएँ सहेजी जाती हैं।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (पुराना) ब्लॉक किए गए IP सहेजें (बैच)। कोई सक्रिय क्लाइंट नहीं |
| POST | `/clear` | JWT | — | विशिष्ट सेवाओं के लिए सभी ब्लॉक किए गए IP साफ़ करें। बॉडी: `[{ serviceId, churchId }]` |

## डिलीवरी लॉग

मूल पथ: `/messaging/deliverylogs`

भेजे गए संदेशों (SMS, पुश सूचनाएँ, ईमेल) की डिलीवरी स्थिति ट्रैक करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | कंटेंट प्रकार और ID के आधार पर डिलीवरी लॉग लोड करें |
| GET | `/person/:personId` | JWT | — | किसी व्यक्ति के डिलीवरी लॉग लोड करें। वैकल्पिक `?startDate=&endDate=` फ़िल्टर |
| GET | `/recent` | JWT | — | चर्च के हालिया डिलीवरी लॉग लोड करें। वैकल्पिक `?limit=` (डिफ़ॉल्ट 100) |
| GET | `/:id` | JWT | — | ID से डिलीवरी लॉग लोड करें |

## संबंधित पृष्ठ

- [रीयल-टाइम आर्किटेक्चर](../../realtime.md) -- WebSocket प्रोटोकॉल, रूम सब्सक्रिप्शन और unified delivery फ़्रेमवर्क
- [वेब पुश सूचनाएँ](../../web-push.md) -- ब्राउज़र पुश नामांकन और डिलीवरी
- [मेंबरशिप एंडपॉइंट](./membership.md) -- लोग, समूह, भूमिकाएँ और मूल पहचान
- [उपस्थिति एंडपॉइंट](./attendance.md) -- सेवा और विज़िट ट्रैकिंग
- [प्रमाणीकरण और अनुमतियाँ](./authentication.md) -- लॉगिन फ़्लो, JWT, OAuth, अनुमति मॉडल
- [मॉड्यूल संरचना](../module-structure.md) -- कोड संगठन के पैटर्न
