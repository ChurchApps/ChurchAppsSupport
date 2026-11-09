---
title: "Messaging एंडपॉइंट्स"
description: "ChurchApps messaging API एंडपॉइंट्स का संदर्भ: बातचीत, नोट्स तक पहुँच के नियम, टेक्स्टिंग, ईमेल टेम्पलेट, सूचनाएँ, और devices।"
---

# Messaging एंडपॉइंट्स

<div class="article-intro">

Messaging module वास्तविक-समय बातचीत, चैट संदेश, push सूचनाएँ, SMS/ईमेल डिलीवरी, WebSocket कनेक्शन, निजी संदेश, device पंजीकरण, और टेक्स्टिंग प्रदाताओं को प्रबंधित करता है। यह उस संचार परत को प्रदान करता है जिसका उपयोग सभी ChurchApps एप्लिकेशन लाइव स्ट्रीमिंग चैट और असिंक्रोनस सूचनाओं दोनों के लिए करते हैं।

</div>

**Base path:** `/messaging`

## बातचीत

Base path: `/messaging/conversations`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | अल्पविराम से अलग IDs द्वारा बातचीत लोड करें, पहले/अंतिम संदेशों के साथ |
| GET | `/messages/:contentType/:contentId` | JWT | — | किसी सामग्री के लिए पृष्ठांकित संदेशों सहित बातचीत लोड करें (`?page=&limit=`) |
| GET | `/posts` | JWT | — | वर्तमान उपयोगकर्ता के समूहों के लिए post-प्रकार बातचीत प्राप्त करें |
| GET | `/posts/group/:groupId` | JWT | — | किसी विशिष्ट समूह के लिए post-प्रकार बातचीत प्राप्त करें |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | B1 Admin Notes पेज के लिए हर रिकॉर्ड के सबसे नए नोट्स। `section` `people`, `groups`, `events`, या `workflows` है (अन्यथा 400); `limit` डिफ़ॉल्ट 25 है (अधिकतम 100); `before` पिछले पेज का cursor है। हर नोट अपने प्रकार के नियम से गुज़रता है (People Edit / गोपनीय नोट अनुमति, समूह के लीडर, इवेंट दर्शक, workflow कार्ड दर्शक), इसलिए कॉलर केवल वही नोट देखते हैं जो वे खोल सकते हैं। नोट का पाठ 300 अक्षरों पर काटा जाता है |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | सामग्री के लिए वर्तमान बातचीत प्राप्त करें या बनाएँ (contentId को स्वतः decrypt करता है) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | सामग्री प्रकार और ID द्वारा बातचीत लोड करें |
| GET | `/:churchId/:id` | Public | — | ID से एक बातचीत लोड करें |
| POST | `/` | JWT | — | बातचीत बनाएँ या अपडेट करें (बैच) |
| POST | `/start` | JWT | — | प्रारंभिक टिप्पणी संदेश के साथ नई बातचीत शुरू करें |
| DELETE | `/:churchId/:id` | JWT | — | एक बातचीत हटाएँ |

### व्यक्ति नोट्स पर पहुँच नियंत्रण

`contentType: "person"` (व्यक्ति रिकॉर्ड पर Notes टैब) या `contentType: "personConfidential"` (गोपनीय Notes सेक्शन) वाली बातचीत हर पढ़ने और लिखने के पथ पर गेटेड हैं, जिसमें ऊपर की सामान्य रूप से सार्वजनिक रूट भी शामिल हैं, जो इन सामग्री प्रकारों के लिए `401` लौटाती हैं। `person` के लिए MembershipApi **People / Edit** अनुमति चाहिए; `personConfidential` के लिए **People / View Confidential Notes**। स्कोप्ड API keys के लिए, `people:write` दोनों क्रियाएँ रखता है (key के उपयोगकर्ता के पास अंतर्निहित भूमिका अनुमति होनी चाहिए)।

### समूह और इवेंट नोट्स पर पहुँच नियंत्रण {#group-and-event-notes-access-control}

दो और नोट सामग्री प्रकार उसी तरह गेटेड हैं, हर पढ़ने और लिखने के पथ पर (ऊपर की सार्वजनिक रूट सहित), और कभी भी अनाम पोस्टिंग के लिए खुले नहीं हैं:

- **`groupNote`** (`contentId` = समूह ID) -- किसी समूह पर **Leader notes** फ़ीड। केवल उस समूह के लीडर (JWT पर `leaderGroupIds`) पढ़ या पोस्ट कर सकते हैं। कोई भी स्टाफ़ अनुमति पहुँच नहीं देती, जिसमें `content.edit` और समूह-सदस्यता अनुमतियाँ भी शामिल हैं।
- **`eventNote`** (`contentId` = इवेंट ID) -- कैलेंडर इवेंट के नोट्स। `content.edit` या **Calendars / Admin** वाले स्टाफ़ हमेशा पढ़ और पोस्ट कर सकते हैं। अन्यथा पहुँच इवेंट के `notesViewRole` (पढ़ना) और `notesPostRole` (पोस्ट करना) का पालन करती है: `staff` (डिफ़ॉल्ट, जब फ़ील्ड `null` हो) किसी और को अनुमति नहीं देता, `leaders` इवेंट के समूह के लीडरों को अनुमति देता है, और `members` इवेंट समूह के सदस्यों और लीडरों को अनुमति देता है। जिस इवेंट में `groupId` नहीं है, वह केवल स्टाफ़ के लिए है।

### Workflow कार्ड नोट्स पर पहुँच नियंत्रण

`contentType: "workflowCard"` वाली बातचीत (workflow कार्ड पर नोट्स, जहाँ `contentId` कार्ड का task ID है) केवल वही व्यक्ति पढ़ और लिख सकता है जो वह कार्ड खोल सकता है: DoingApi **Tasks / View** अनुमति वाला उपयोगकर्ता, या वह व्यक्ति या समूह जिसे कार्ड सौंपा गया है, बनाया गया है, या जिसके बारे में है। बाकी सबको ऊपर की सार्वजनिक रूट सहित हर पढ़ने के पथ पर `401` मिलता है। कार्ड की बातचीत `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; पहली जुड़ी बातचीत जीतती है) के माध्यम से कार्ड से जुड़ती है, जिसे कार्ड के संपादक और उसका assignee कॉल कर सकते हैं।

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

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | किसी बातचीत के सभी संदेश लोड करें |
| GET | `/catchup/:churchId/:conversationId` | Public | — | किसी बातचीत के सभी संदेश लोड करें (लाइव चैट के लिए सार्वजनिक catchup) |
| GET | `/:churchId/:id` | Public | — | ID से एक संदेश लोड करें |
| POST | `/` | JWT | — | संदेश सहेजें (बैच)। वास्तविक-समय अपडेट भेजता है और सूचनाएँ ट्रिगर करता है। मौजूदा संदेश अपडेट करने के लिए उसका लेखक होना या `content.edit` रखना ज़रूरी है; संग्रहीत लेखक कभी पुनः असाइन नहीं हो सकता |
| POST | `/send` | Public | — | संदेश भेजें (बैच, सार्वजनिक)। WebSocket के ज़रिए वास्तविक-समय अपडेट भेजता है और सूचनाएँ ट्रिगर करता है |
| POST | `/setCallout` | JWT | — | (legacy) वास्तविक समय में callout संदेश प्रसारित करें। कोई सक्रिय क्लाइंट नहीं; लाइव स्ट्रीम चैट अब callouts रेंडर नहीं करता |
| DELETE | `/:churchId/:id` | JWT | — | एक संदेश हटाएँ और हटाने को वास्तविक समय में प्रसारित करें। देखें [संदेश मॉडरेशन](#message-moderation) |

### संदेश मॉडरेशन {#message-moderation}

संदेश हटाना इनके लिए अनुमति है:

- संदेश का लेखक;
- पूरे चर्च में `content.edit` वाले स्टाफ़;
- **समूह लीडर**, उन बातचीत के लिए जिनका `contentType` `group` या `groupAnnouncement` है और जिनका `contentId` ऐसा समूह है जिसका वे नेतृत्व करते हैं (JWT पर `leaderGroupIds`)।

Person-note बातचीत (`person` / `personConfidential`) को कभी लीडर द्वारा मॉडरेट नहीं किया जाता -- वे इसके बजाय नोट अनुमतियों (`people.edit`, `people.viewConfidentialNotes`) का उपयोग करते हैं।

लीडरों को केवल हटाने की अनुमति है, संपादन की नहीं: किसी और सदस्य का संदेश फिर से लिखना केवल लेखक और `content.edit` स्टाफ़ तक सीमित रहता है।

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

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | वर्तमान उपयोगकर्ता के सभी निजी संदेश लोड करें (हर बातचीत का अंतिम संदेश शामिल, सभी को पढ़ा हुआ चिह्नित करता है) |
| GET | `/existing/:personId` | JWT | — | किसी विशिष्ट व्यक्ति के साथ मौजूदा निजी बातचीत खोजें |
| GET | `/:id` | JWT | — | ID से एक निजी संदेश लोड करें (यदि वर्तमान उपयोगकर्ता को संबोधित है तो सूचना साफ़ करता है) |
| POST | `/` | JWT | — | निजी संदेश भेजें (बैच)। प्राप्तकर्ता को push सूचना ट्रिगर करता है |

## सूचनाएँ

Base path: `/messaging/notifications`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | वर्तमान उपयोगकर्ता के लिए बिना पढ़ी सूचनाओं की गिनती प्राप्त करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की सभी सूचनाएँ लोड करें (सभी को पढ़ा हुआ चिह्नित करता है) |
| GET | `/tmpEmail` | Public | — | दैनिक ईमेल सूचना डाइजेस्ट ट्रिगर करें (debug/cron endpoint) |
| GET | `/:churchId/person/:personId` | JWT | — | किसी विशिष्ट व्यक्ति की सूचनाएँ लोड करें |
| GET | `/:churchId/:id` | JWT | — | ID से एक सूचना लोड करें |
| POST | `/` | JWT | — | सूचनाएँ बनाएँ या अपडेट करें (बैच) |
| POST | `/create` | JWT | — | कई लोगों के लिए सूचनाएँ बनाएँ। Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | किसी व्यक्ति की सभी सूचनाएँ पढ़ी हुई चिह्नित करें |
| POST | `/sendTest` | JWT | — | एक परीक्षण push सूचना भेजें। Body: `{ personId, title }` |
| POST | `/ping` | Public | — | बाहरी ट्रिगर से एक सूचना बनाएँ। Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | एक सूचना हटाएँ |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | गिनें कि किसी समूह के कितने सदस्यों तक push पहुँचेगा |
| GET | `/churchPreview` | JWT | `content.edit` | गिनें कि ऐप वाले सभी लोगों तक push पहुँचे तो कितने लोग पहुँचेंगे |
| POST | `/group/send` | JWT | `groupMembers.edit` | अभी किसी समूह के सदस्यों को push भेजें |

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

## निर्धारित सूचनाएँ

Base path: `/messaging/scheduledNotifications`

पहले से निर्धारित push। `audience` `church` (ऐप वाले सभी लोग; `content.edit` चाहिए) या `group` (`groupMembers.edit` और `groupId` चाहिए) है। शीर्षक 80 अक्षरों और संदेश 240 अक्षरों तक सीमित है। देय पंक्ति 1-मिनट टाइमर द्वारा भेजी जाती है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` या `content.edit` | चर्च के लिए निर्धारित और हाल की सूचनाएँ सूचीबद्ध करें |
| POST | `/` | JWT | audience के अनुसार | निर्धारित सूचना बनाएँ, या `id` सेट होने पर अपडेट करें। Body: `{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`। जो अब लंबित नहीं है उसे अपडेट करने पर 409 |
| POST | `/:id/sendNow` | JWT | audience के अनुसार | एक लंबित सूचना अभी भेजें। पहले ही भेजी जा चुकी, रद्द की गई, या भेजी जा रही हो तो 409 |
| DELETE | `/:id` | JWT | audience के अनुसार | एक लंबित सूचना रद्द करें, या सूची से एक भेजी, विफल, या रद्द की गई सूचना हटाएँ। भेजे जाने के दौरान 409 |
| DELETE | `/` | JWT | `groupMembers.edit` या `content.edit` | उन सभी audiences के लिए जिन तक उपयोगकर्ता भेज सकता है, हर भेजी, विफल, और रद्द की गई सूचना हटाएँ। `{ deleted }` लौटाता है |

## सूचना प्राथमिकताएँ

Base path: `/messaging/notificationpreferences`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | सूचना श्रेणियाँ उनके डिफ़ॉल्ट और अनुमत चैनलों सहित सूचीबद्ध करें |
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की सूचना प्राथमिकताएँ लोड करें (कोई न होने पर डिफ़ॉल्ट स्वतः बनाता है) |
| POST | `/` | JWT | — | वर्तमान उपयोगकर्ता की प्राथमिकताएँ सहेजें। Body: `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay` में से कोई भी, साथ में वैकल्पिक `overrides: [{ categoryKey, channel, optedIn }]` (channel `push`, `email`, `in_app`, या `sms` हो सकता है; locked श्रेणियाँ अनदेखी होती हैं)। `allowSms` टेक्स्ट रिमाइंडर के लिए सदस्य की opt-in है। पंक्तियों के array वाला legacy body अब भी स्वीकार होता है |

## Connections

Base path: `/messaging/connections`

चैट, समूह बातचीत, निजी संदेश, और लाइव स्ट्रीमिंग के लिए WebSocket/वास्तविक-समय कनेक्शन प्रबंधित करता है। पूरे अंत-से-अंत प्रोटोकॉल के लिए [Real-time Architecture](../../realtime.md) देखें।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | किसी बातचीत के सभी कनेक्शन लोड करें |
| POST | `/` | Public | — | कनेक्शन रजिस्टर करें (बैच)। बातचीत पर उपस्थिति प्रसारण ट्रिगर करता है। Body आइटम: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | socket ID द्वारा एक कनेक्शन का प्रदर्शन नाम अपडेट करें। Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | एक बातचीत से कनेक्शन हटाएँ। उपस्थिति प्रसारण ट्रिगर करता है |
| POST | `/tmpSendAlert` | Public | — | किसी व्यक्ति के कनेक्शनों को एक सूचना अलर्ट भेजें। Body: `{ churchId, personId }` |

## Devices

Base path: `/messaging/devices`

Push सूचनाओं और सामग्री पेयरिंग (जैसे TV डिस्प्ले पर Lessons ऐप) के लिए device पंजीकरण प्रबंधित करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | एक device enroll या अपडेट करें (मोबाइल push पंजीकरण)। FCM token या device ID से मिलान करता है |
| POST | `/enrollAnon` | Public | — | एक अनाम device enroll करें और 4-अक्षर का पेयरिंग कोड बनाएँ |
| POST | `/` | Public | — | Devices सहेजें (बैच) |
| GET | `/pair/:pairingCode` | JWT | — | उसके पेयरिंग कोड से एक device पेयर करें। सामग्री असाइन करने के लिए वैकल्पिक `?contentType=&contentId=` |
| GET | `/status/:deviceId` | Public | — | एक device की पेयरिंग स्थिति जाँचें |
| GET | `/:churchId` | JWT | — | किसी चर्च के सभी devices लोड करें |
| GET | `/:churchId/person/:personId` | JWT | — | किसी व्यक्ति के सभी devices लोड करें |
| GET | `/:churchId/:id` | JWT | — | ID से एक device लोड करें |
| DELETE | `/:churchId/:id` | JWT | — | एक device हटाएँ |

### उदाहरण: एक device enroll करना

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

## Device Contents

Base path: `/messaging/devicecontents`

पेयर किए गए devices के लिए सामग्री असाइनमेंट प्रबंधित करता है (जैसे TV पर कौन सा पाठ दिख रहा है)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | एक device के लिए सामग्री असाइनमेंट लोड करें |
| POST | `/` | JWT | — | Device सामग्री असाइनमेंट सहेजें (बैच) |
| DELETE | `/:id` | JWT | — | एक device सामग्री असाइनमेंट हटाएँ |

## टेक्स्टिंग

Base path: `/messaging/texting`

SMS टेक्स्टिंग प्रदाताओं, समूह टेक्स्ट संदेश, और डिलीवरी ट्रैकिंग प्रबंधित करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | चर्च के लिए टेक्स्टिंग प्रदाता लोड करें (credentials मास्क किए जाते हैं) |
| GET | `/status` | JWT | — | `{ enabled }` -- क्या चर्च के पास सक्षम टेक्स्टिंग प्रदाता है। कोई भी साइन-इन चर्च उपयोगकर्ता; **Text** विकल्प तभी दिखाने के लिए उपयोग होता है जब टेक्स्ट भेजे जा सकें |
| GET | `/inboundUrl` | JWT | `texting.send` या `settings.edit` | `{ url }` -- चर्च का inbound (STOP) webhook URL जिसे प्रदाता में चिपकाना है |
| POST | `/inbound/:churchId/:token` | Public | — | प्रदाता का inbound-संदेश webhook। `token` चर्च ID का HMAC है। एक उत्तर जो बिल्कुल stop शब्द हो (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) हर मेल खाते व्यक्ति को `optedOut` चिह्नित करता है और उनका `allowSms` बंद करता है। `{ optedOut: <count> }` लौटाता है; अन्य उत्तर `{ optedOut: 0 }` लौटाते हैं |
| GET | `/preview/:groupId` | JWT | — | समूह टेक्स्ट के लिए प्राप्तकर्ताओं का पूर्वावलोकन (योग्य, opted-out, बिना फ़ोन की गिनती) |
| GET | `/sent` | JWT | — | चर्च के सभी भेजे गए टेक्स्ट संदेश रिकॉर्ड लोड करें |
| GET | `/sent/:id/details` | JWT | — | प्रति-प्राप्तकर्ता डिलीवरी लॉग सहित एक भेजा गया टेक्स्ट लोड करें |
| POST | `/providers` | JWT | — | टेक्स्टिंग प्रदाता सहेजें (बैच)। API credentials एन्क्रिप्ट करता है |
| POST | `/send` | JWT | — | किसी समूह के सभी योग्य सदस्यों को SMS भेजें। Body: `{ groupId, message }`। Merge fields (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) प्रति प्राप्तकर्ता हल होते हैं |
| POST | `/sendPerson` | JWT | — | एक व्यक्ति को SMS भेजें। Body: `{ personId, phoneNumber, message }`। Merge fields हल होते हैं, और हल किया गया पाठ ही लॉग होता है |
| DELETE | `/providers/:id` | JWT | — | एक टेक्स्टिंग प्रदाता हटाएँ |

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

पुन: उपयोग योग्य ईमेल टेम्पलेट प्रबंधित करता है और समूहों को टेम्पलेट वाले ईमेल भेजता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | चर्च के सभी ईमेल टेम्पलेट लोड करें |
| GET | `/:id` | JWT | — | ID से एक ईमेल टेम्पलेट लोड करें |
| GET | `/sendStatus` | JWT | `groupMembers.edit` या `tasks.admin` | चर्च की समूह ईमेल स्थिति: `{ approved, paused, remaining, requested }`। B1Admin का Send Email डायलॉग और workflow **Send email** कार्रवाई इसका उपयोग करके चेतावनी देते हैं जब ईमेल नहीं जाएगा |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | समर्थन से चर्च को समूह ईमेल के लिए स्वीकृत करने का अनुरोध करें (प्रति चर्च प्रति सप्ताह अधिकतम एक बार) |
| GET | `/preview/:groupId` | JWT | — | किसी समूह के लिए ईमेल डिलीवरी का पूर्वावलोकन (योग्य प्राप्तकर्ता गिनती, बिना ईमेल वाले सदस्य) |
| POST | `/` | JWT | — | ईमेल टेम्पलेट बनाएँ या अपडेट करें (बैच) |
| POST | `/send` | JWT | — | किसी समूह के सभी सदस्यों को टेम्पलेट वाला ईमेल भेजें। Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | एक ईमेल टेम्पलेट हटाएँ |

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

**समर्थित merge fields:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## ब्लॉक्ड IPs

Base path: `/messaging/blockedips`

लाइव स्ट्रीमिंग चैट के लिए (legacy) IP-ब्लॉकिंग। B1App क्लाइंट अब `POST /` को कॉल नहीं करता -- IP ब्लॉकिंग unified-delivery माइग्रेशन में हटा दी गई थी। `/clear` रूट अब भी `StreamingServiceController` द्वारा सर्वर-से-सर्वर तब कॉल होता है जब स्ट्रीमिंग सेवाएँ सहेजी जाती हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (legacy) ब्लॉक्ड IPs सहेजें (बैच)। कोई सक्रिय क्लाइंट नहीं |
| POST | `/clear` | JWT | — | विशिष्ट सेवाओं के सभी ब्लॉक्ड IPs साफ़ करें। Body: `[{ serviceId, churchId }]` |

## डिलीवरी लॉग

Base path: `/messaging/deliverylogs`

भेजे गए संदेशों (SMS, push सूचनाएँ, ईमेल) की डिलीवरी स्थिति ट्रैक करता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | सामग्री प्रकार और ID द्वारा डिलीवरी लॉग लोड करें |
| GET | `/person/:personId` | JWT | — | किसी व्यक्ति के डिलीवरी लॉग लोड करें। वैकल्पिक `?startDate=&endDate=` फ़िल्टर |
| GET | `/recent` | JWT | — | चर्च के हाल के डिलीवरी लॉग लोड करें। वैकल्पिक `?limit=` (डिफ़ॉल्ट 100) |
| GET | `/:id` | JWT | — | ID से एक डिलीवरी लॉग लोड करें |

## संबंधित पेज

- [Real-time Architecture](../../realtime.md) -- WebSocket प्रोटोकॉल, रूम सब्सक्रिप्शन, और unified delivery framework
- [Web Push Notifications](../../web-push.md) -- ब्राउज़र push enrollment और डिलीवरी
- [Membership Endpoints](./membership.md) -- लोग, समूह, भूमिकाएँ, और मूल पहचान
- [Attendance Endpoints](./attendance.md) -- सेवा और विज़िट ट्रैकिंग
- [Authentication & Permissions](./authentication.md) -- लॉगिन प्रवाह, JWT, OAuth, अनुमति मॉडल
- [Module Structure](../module-structure.md) -- कोड संगठन पैटर्न
