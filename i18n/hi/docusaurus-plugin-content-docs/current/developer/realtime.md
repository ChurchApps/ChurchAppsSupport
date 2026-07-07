---
title: "रीयल-टाइम आर्किटेक्चर"
---

# रीयल-टाइम आर्किटेक्चर

<div class="article-intro">

ChurchApps हर रीयल-टाइम सतह के लिए एक एकल WebSocket-आधारित डिलीवरी फ्रेमवर्क का उपयोग करता है -- समूह चैट, निजी संदेश, सामग्री नोट्स, लाइव स्ट्रीम चैट, और उपस्थिति/उपस्थिति। यह पृष्ठ प्रोटोकॉल, सर्वर, और क्लाइंट प्रारंभिकों को दस्तावेज़ करता है जो उपभोक्ता उपयोग करते हैं।

</div>

## अवलोकन

```
┌────────────────────┐                ┌────────────────────────────┐
│ Browser / B1Admin  │                │  MessagingApi (Lambda)     │
│ Browser / B1App    │ ─── WS ─────▶  │  ┌───────────────────────┐ │
│  - SocketHelper    │                │  │ SocketHelper (server) │ │
│  - SubscriptionMgr │   POST /msg ──▶│  │ MessageController     │ │
│  - ConversationStore│  POST /conn ─▶│  │ ConnectionController  │ │
│  - PresenceStore   │ ◀── action ──  │  │ DeliveryHelper        │ │
└────────────────────┘                │  └───────────────────────┘ │
                                      └────────────────────────────┘
```

प्रोटोकॉल के तीन टुकड़े हैं:

1. **एक लगातार WebSocket** प्रति ब्राउज़र टैब, `SocketHelper` द्वारा खोला गया।
2. **Connection rows** (`POST /messaging/connections`) `connections` तालिका में रिकॉर्ड किया गया -- ये एक `(socketId, churchId, conversationId)` tuple को एक कमरे के ग्राहक के रूप में चिह्नित करते हैं।
3. **Server-side fan-out** `DeliveryHelper.sendConversationMessages()` द्वारा -- जब एक संदेश सहेजा जाता है (`POST /messaging/messages/send`), सर्वर मेल खाते हुए connection rows को पढ़ता है और प्रत्येक खुले socket को एक टाइप किया गया payload भेजता है।

कोई Socket.IO नहीं है, कोई long-polling fallback नहीं है, और कोई अलग microservice नहीं है। WebSocket REST API के समान प्रक्रिया में चलता है (AWS में HTTP के लिए `web` Lambda, WebSocket के लिए `socket` Lambda; स्थानीय रूप से एक एकीकृत प्रक्रिया)।

## पोर्ट और परिवहन

| एनवायरनमेंट | HTTP | WebSocket |
|-------------|------|-----------|
| स्थानीय विकास | `8084` | `ws://localhost:8087` (अलग `WebSocketServer`) |
| Railway / single-port hosts | साझा | साझा HTTP सर्वर (`SocketHelper.attachToServer()`) |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default` routes) |

परिवहन चयनकर्ता `deliveryProvider` कॉन्फ़िगरेशन है:

- `local` → raw `ws` library; क्लाइंट `CommonEnvironmentHelper` से `MessagingApiSocket` से कनेक्ट करते हैं।
- `aws` → API Gateway WebSocket; सर्वर `@aws-sdk/client-apigatewaymanagementapi` के माध्यम से सक्रिय कनेक्शन को payload पोस्ट करता है।

क्लाइंट को कभी यह जानने की आवश्यकता नहीं है कि कौन सा उपयोग में है -- यह किसी भी तरह से समान JSON प्रोटोकॉल बोलता है।

## Wire प्रोटोकॉल

हर फ्रेम `PayloadInterface` के आकार का JSON है:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // "room" -- आमतौर पर एक UUID, कभी-कभी "alerts" या "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // सर्वर → क्लाइंट, कनेक्ट के बाद, socketId को कमरे में शामिल होने के लिए उपयोग करता है
  | "message"             // सर्वर → क्लाइंट, नया संदेश
  | "deleteMessage"       // सर्वर → क्लाइंट, संदेश हटाया गया
  | "privateMessage"      // सर्वर → क्लाइंट, badge-count ping प्राप्तकर्ता के "alerts" कमरे को जब एक प्रत्यक्ष संदेश बढ़ता है; संदेश निकाय खुद खुले बातचीत के अंदर सामान्य "message" कार्रवाई के माध्यम से आता है
  | "reaction"            // सर्वर → क्लाइंट, एक संदेश पर emoji प्रतिक्रिया टॉगल किया गया; डेटा { messageId, conversationId, personId, emoji, added } है (added=false का मतलब हटाया गया)। कमरे को POST /messaging/messages/:messageId/reactions द्वारा प्रसारित करें
  | "conversationActivity"// सर्वर → क्लाइंट, सामग्री-कमरे ग्राहकों के लिए माध्यमिक "कुछ हुआ" संकेत
  | "attendance"          // सर्वर → क्लाइंट, दर्शक सूची / उपस्थिति स्नैपशॉट
  | "notification"        // सर्वर → क्लाइंट, सामान्य सूचना (गणना, आदि)
  | "reconnect"           // क्लाइंट-आंतरिक, एक नए socketId हैंडशेक के बाद स्थानीय रूप से SocketHelper द्वारा भेजा गया एक ड्रॉप के बाद -- या तो एक अप्रत्याशित बंद के बाद घातीय-बैकऑफ reconnect, या पुनरारंभ जांच द्वारा ट्रिगर तत्काल reconnect (टैब focus/visibility/online); सर्वर द्वारा कभी नहीं भेजा जाता है
  | "alert" | "callout";  // legacy, Connections endpoint संदर्भ देखें
```

### हैंडशेक

1. क्लाइंट socket खोलता है और लिटरल स्ट्रिंग `"getId"` भेजता है।
2. सर्वर `{ action: "socketId", data: "<id>" }` के साथ उत्तर देता है।
3. क्लाइंट `socketId` को स्टोर करता है और इसे हर कमरे की सदस्यता के तीसरे समन्वय के रूप में उपयोग करता है।

### एक कमरे में शामिल होना

"room" सिर्फ एक `(churchId, conversationId)` tuple है। सदस्यता लेने के लिए, क्लाइंट एक `Connection` row पोस्ट करता है:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // वैकल्पिक; anonymous लाइव स्ट्रीम दर्शकों के लिए null
    "displayName": "Anonymous4823"
  }
]
```

पोस्ट करना बातचीत पर एक `attendance` प्रसारण भी ट्रिगर करता है ताकि मौजूदा ग्राहक जान सकें कि एक नया दर्शक जुड़ गया है।

### एक संदेश भेजना

`POST /messaging/messages/send` (anonymous-allowed) या `POST /messaging/messages/` (auth-required):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

सर्वर संदेश सहेजता है, फिर `DeliveryHelper.sendConversationMessages()` उस `conversationId` के लिए हर connection row को देखता है और प्रत्येक socket को एक `{ action: "message", data: <message> }` फ्रेम भेजता है।

सामग्री-बाध्य बातचीत के लिए (उदाहरण के लिए, किसी व्यक्ति से जुड़े नोट्स), `action: "conversationActivity"` के साथ एक दूसरा प्रसारण सिंथेटिक `"content-{type}-{id}"` कमरे पर आग लगाता है ताकि सूची-दृश्य उपभोक्ता अंतर्निहित बातचीत खुली रखे बिना ताज़ा करना जानते हैं।

### एक कमरे से जाना

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

कनेक्शन row को साफ़ करता है और एक अंतिम attendance प्रसारण ट्रिगर करता है।

## Server-side घटक

| File | Role |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | `WebSocketServer` का मालिक। कनेक्ट पर `socketId` निर्दिष्ट करता है। एक 30s ping/pong heartbeat (`startHeartbeat`) चलाता है जो किसी भी कनेक्शन को `terminate()` और साफ़ करता है जो एक pong को याद करता है। मृत sockets को साफ़ करता है और डिस्कनेक्ट पर एक attendance rebroadcast ट्रिगर करता है। `getLiveSocketIds()` और `reapStaleConnections()` को उजागर करता है, 30-मिनट के टाइमर job द्वारा उपयोग किया जाता है स्टेल `connections` rows को हटाने के लिए -- स्थानीय रूप से जांचकर कि कौन से socketIds अभी भी in-process में रहते हैं, AWS पर 24h-TTL backstop के रूप में मिस किए गए `$disconnect` events के लिए (API Gateway कनेक्शन को ~2h पर कैप करता है, इसलिए यह एक live को नहीं reap कर सकता) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` कमरे के लिए कनेक्शन पढ़ता है और प्रत्येक फ्रेम को स्थानीय socket या AWS API Gateway कनेक्शन को मार्ग करता है। `sendAttendance(churchId, conversationId)` दर्शक स्नैपशॉट बनाता है और प्रसारित करता है |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` शामिल होता है, `DELETE /:churchId/:conversationId/:socketId` जाता है, `POST /setName` प्रदर्शन नाम अपडेट करता है |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonymous) और `POST /` (authed) सहेजते हैं फिर fan out करते हैं |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` किसके सदस्य हैं इसका स्रोत-सत्य है |

## Client-side प्रारंभिकों (`@churchapps/apphelper`)

सभी पांच प्रारंभिक `apphelper/src/helpers/` में स्थिर singletons हैं। वे सहयोग करते हैं ताकि प्रत्येक टैब **एक** WebSocket खोलता है पृष्ठ पर कितने भी घटक माउंट होने से कोई फर्क नहीं।

### `SocketHelper`

एकल WebSocket कनेक्शन का मालिक। Re-entrant `init()` idempotent है -- कई घटक इसे बिना डुप्लिकेट sockets खोले कॉल कर सकते हैं। Exposes:

- `init()` -- socket खोलता है (या पुनः-उपयोग करता है) और `getId` हैंडशेक पूरा करता है। एक बार resolve होता है जब हैंडशेक पूरा हो जाता है या, 5s timeout के बाद, एक बार जब पृष्ठभूमि retry loop ने संभाल लिया हो; यह कभी reject नहीं करता है, इसलिए कॉलर को एक failed first connect को विशेष-केस करने की आवश्यकता नहीं है।
- `addHandler(action, id, fn)` / `removeHandler(id)` -- register/unregister listeners `action` से। कई handlers एक ही कार्रवाई को सुन सकते हैं।
- `setPersonChurch({ personId, churchId })` -- प्रमाणीकृत कॉलर के लिए; एक `"alerts"` कमरे सदस्यता ट्रिगर करता है ताकि push सूचनाएं इस socket पर आएं।
- `onSocketIdReady(fn)` -- हर नए socketId पर आग लगाता है, केवल पहले नहीं -- प्रारंभिक हैंडशेक और प्रत्येक बाद का reconnect। `SubscriptionManager` द्वारा pending joins को flush करने के लिए उपयोग किया जाता है।
- `checkConnection()` -- नीचे दिए गए resume listeners द्वारा आह्वान किया जाता है; तुरंत reconnects करता है यदि socket पहले से ही बंद है, या liveness probe भेजता है यदि यह खुला लगता है।

**Reconnect lifecycle.** एक अप्रत्याशित बंद exponential backoff (1s, दोगुना 30s cap तक) के साथ एक reconnect शेड्यूल करता है। `SocketHelper` एक resumed tab का पता लगाने के लिए `window`/`document` पर `online`, `focus`, `pageshow`, और `visibilitychange` भी सुनता है: यदि socket पहले से ही बंद है तो तुरंत reconnects और backoff को reset करता है; यदि यह खुला लगता है, तो यह एक `"getId"` liveness probe भेजता है और 3s के भीतर कोई फ्रेम नहीं आता है तो reconnect को force करता है -- यह आधे-खुले sockets को पकड़ता है जो एक mobile OS के अवसर देने के बाद छोड़ दिए जाते हैं। एक सफल re-handshake पर, `SocketHelper` स्थानीय `"reconnect"` कार्रवाई को उस कार्रवाई के लिए हर रजिस्टर किए गए handler में dispatch करता है।

### `SubscriptionManager`

Ref-counted कमरे की सदस्यता। समान बातचीत की कई घटक सदस्यता केवल एक server-side कनेक्शन row को register करती हैं।

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... घटक render करता है, ConversationStore.subscribe के माध्यम से socket फ्रेम प्राप्त करता है ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

तीन व्यवहार जो उपभोक्ता को मुफ्त मिलते हैं:

- **Debounced leave (300 ms)** -- React StrictMode के double mount/unmount और छोटी remount cycles को बिना server-side सदस्यता को छोड़े survive करता है; `reset()` किसी भी pending debounced leaves को भी cancel करता है।
- **Reconnect rejoin** -- `SubscriptionManager` `personId`/`displayName` को याद रखता है जो प्रत्येक कमरे में शामिल होने के लिए उपयोग किया जाता है, तो `SocketHelper` के `"reconnect"` event पर (और हर `onSocketIdReady` call पर) यह identity intact के साथ हर सक्रिय कनेक्शन row को फिर से पोस्ट करता है। Rejoins को socketId per deduped किया जाता है ताकि एक ही reconnect एक कमरे को दोबारा पोस्ट न करे।
- **Late-binding socketId** -- `joinRoom` socket के हैंडशेक से पहले intent को रिकॉर्ड करता है; वास्तविक `POST /connections` `onSocketIdReady` पर fires।

### `ConversationStore`

In-memory cache `conversationId` द्वारा keyed। `message` / `deleteMessage` / `privateMessage` socket handlers को बिल्कुल एक बार register करता है और inbound frames को जो भी बातचीत खुली है उसे apply करता है।

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ प्रमाणीकृत होने पर /messages/conversation/:id, anonymous होने पर /messages/catchup/:churchId/:id का उपयोग करता है

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // नवीनतम स्नैपशॉट के साथ पुनः-render करें
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // वैकल्पिक स्पष्ट cleanup
```

प्रमाणीकृत कॉलर **लोगों का hydration** भी प्राप्त करते हैं -- incoming messages पर `personId`s को `PersonInterface` ऑब्जेक्ट में एक cached `GET /people/ids` lookup के माध्यम से resolve किया जाता है। Anonymous कॉलर इसे छोड़ते हैं।

`SocketHelper` के `"reconnect"` event पर, `ConversationStore` हर बातचीत को refetches करता है जिसके पास सक्रिय `subscribe` listeners हैं, socket के नीचे रहने के दौरान missed messages को recover करता है। Anonymous बातचीत इस catch-up को छोड़ता है यदि उनकी `churchId` कभी recorded नहीं हुई (catch-up endpoint को एक की आवश्यकता है)।

### `PresenceStore`

`ConversationStore` के pattern को `attendance` action के लिए mirrors। ग्राहक जब भी सर्वर presence को rebroadcast करता है तब `PresenceSnapshot { conversationId, totalViewers, viewers }` प्राप्त करते हैं। समान स्नैपशॉट को notify से पहले deduped किया जाता है, इसलिए reconnect storms unnecessary re-renders को trigger नहीं करते हैं।

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

**प्रमाणीकृत** कॉलर के लिए top-level boot। `SocketHelper.init()` को wraps, व्यक्ति/चर्च context को set करता है (जो स्वचालित रूप से `"alerts"` कमरे में शामिल होता है), और `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` को बिल्कुल एक बार कॉल करता है। यह अपना स्वयं का `"reconnect"` handler भी register करता है जो सूचना/PM गणना को पुनः load करता है, इसलिए badges एक dropped connection के बाद recover होते हैं।

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Anonymous flows (लाइव स्ट्रीम चैट प्रामाणिक उदाहरण है) `NotificationService` को छोड़ते हैं और सीधे प्रारंभिकों को कॉल करते हैं -- reference implementation के लिए `B1App/src/helpers/StreamChatManager.ts` देखें।

## लाइव स्ट्रीम चैट

लाइव स्ट्रीम फ्रेमवर्क का सबसे बड़ा anonymous consumer है। यह कमरे scoping के लिए दो `contentType`s का उपयोग करता है:

- `streamingLive` -- `/stream` पर सार्वजनिक चैट tab (एक room per `streamingService`)।
- `streamingLiveHost` -- एक निजी room केवल `contentApi.chat.host` अनुमति वाले कर्मचारी को दिखाई दे रहा है। room id सर्वर पर encrypted है (`GET /streamingServices/:id/hostChat`) ताकि casual scraping इसे reveal न करे।

`B1App/src/helpers/StreamChatManager.ts` unified प्रारंभिकों के माध्यम से दोनों rooms को boots करता है -- अब कोई live-stream-specific socket code नहीं है।

## पैटर्न और नुकसान

- **अपना स्वयं का WebSocket न खोलें।** `SocketHelper` एक कारण से एक singleton है। यदि आपको एक कस्टम कार्रवाई को सुनने की आवश्यकता है, तो `SocketHelper.addHandler` के माध्यम से मौजूदा socket पर एक handler को register करें।
- **`SubscriptionManager` को bypass न करें।** Direct `POST /connections` कॉल काम करते हैं लेकिन ref counting, debounced leave, और reconnect rejoin को खो देते हैं। Group chat और PM उपभोक्ता सभी `SubscriptionManager` के माध्यम से जाते हैं।
- **Handler ids प्रत्येक action के लिए unique होने चाहिए।** `SocketHelper.addHandler(action, id, fn)` `(action, id)` द्वारा keyed; एक ही id को दो listeners के लिए पुनः-उपयोग करना पहले को replace करता है। unified stores `"ConversationStore-Message"` और `"PresenceStore-Attendance"` जैसे ids का उपयोग करते हैं consumer ids को स्पष्ट रखने के लिए।
- **Room ids opaque strings हैं।** अधिकांश conversation UUIDs हैं लेकिन सिस्टम `"alerts"` (प्रति-व्यक्ति सूचनाएं), `"content-{type}-{id}"` (सिंथेटिक activity rooms), और encrypted `streamingLiveHost` ids को भी समर्थन करता है।
- **प्रमाणीकरण REST boundary पर चेक किया जाता है, socket पर नहीं।** `POST /connections` द्वारा एक room में शामिल होना anonymous-allowed है; एक्सेस नियंत्रण message-send time पर होता है (message controller decide करता है कि anonymous caller कौन से `messageType`s भेज सकते हैं)।

## संबंधित पृष्ठ

- [सूचना आर्किटेक्चर](./architecture/notifications) -- The in-app/push/email escalation funnel यह transport feeds into
- [Messaging Endpoints](./api/endpoints/messaging) -- संदेश, बातचीत, कनेक्शन, डिवाइस के लिए पूर्ण REST सतह
- [वेब Push सूचनाएं](./web-push) -- ब्राउज़र push, in-page socket delivery से अलग
- [AppHelper](./shared-libraries/app-helper) -- npm package जो क्लाइंट प्रारंभिकों को ships करता है
- [मॉड्यूल संरचना](./api/module-structure) -- messaging module को server-side कैसे व्यवस्थित किया जाता है
