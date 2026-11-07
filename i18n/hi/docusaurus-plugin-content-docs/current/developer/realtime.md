---
title: "रियल-टाइम आर्किटेक्चर"
---

# रियल-टाइम आर्किटेक्चर

<div class="article-intro">

ChurchApps हर रियल-टाइम सुविधा के लिए एक ही WebSocket-आधारित डिलीवरी फ़्रेमवर्क का उपयोग करता है: ग्रुप चैट, निजी संदेश, कंटेंट नोट्स, लाइव स्ट्रीम चैट, और प्रेज़ेंस/उपस्थिति। यह पेज प्रोटोकॉल, सर्वर, और क्लाइंट प्रिमिटिव्स का दस्तावेज़ है, जिनका उपयोग कंज़्यूमर करते हैं।

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

इस प्रोटोकॉल के तीन हिस्से हैं:

1. **हर ब्राउज़र टैब के लिए एक स्थायी WebSocket**, जिसे `SocketHelper` खोलता है।
2. **कनेक्शन रो** (`POST /messaging/connections`) जो `connections` टेबल में दर्ज होती हैं। ये `(socketId, churchId, conversationId)` टपल को किसी रूम का सब्सक्राइबर चिह्नित करती हैं।
3. **सर्वर-साइड फ़ैन-आउट** `DeliveryHelper.sendConversationMessages()` के ज़रिए। जब कोई संदेश सेव होता है (`POST /messaging/messages/send`), तो सर्वर मेल खाने वाली कनेक्शन रो पढ़ता है और हर खुले सॉकेट को एक टाइप्ड पेलोड भेजता है।

इसमें न Socket.IO है, न long-polling फ़ॉलबैक, और न कोई अलग माइक्रोसर्विस। WebSocket उसी प्रोसेस में चलता है जिसमें REST API चलता है (AWS में HTTP के लिए `web` Lambda और WebSocket के लिए `socket` Lambda; लोकल और Railway पर एक ही संयुक्त प्रोसेस)।

## पोर्ट और ट्रांसपोर्ट

| वातावरण | HTTP | WebSocket |
|-------------|------|-----------|
| लोकल डेवलपमेंट | `8084` | `ws://localhost:8087` (अलग `WebSocketServer`) |
| Railway / Docker / एकल-पोर्ट होस्ट (`RAILWAY_ENVIRONMENT` या `SELF_HOSTED` सेट) | साझा | साझा HTTP सर्वर (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (`$connect` / `$disconnect` / `$default` रूट) |

ट्रांसपोर्ट चुनने वाला कॉन्फ़िग `deliveryProvider` है:

- `local` → सादी `ws` लाइब्रेरी; क्लाइंट `CommonEnvironmentHelper` से `MessagingApiSocket` पर कनेक्ट होते हैं।
- `aws` → API Gateway WebSocket; सर्वर `@aws-sdk/client-apigatewaymanagementapi` के ज़रिए सक्रिय कनेक्शनों पर पेलोड भेजता है।

क्लाइंट को यह जानने की ज़रूरत नहीं होती कि कौन-सा ट्रांसपोर्ट इस्तेमाल हो रहा है। दोनों स्थितियों में वह एक ही JSON प्रोटोकॉल बोलता है।

## वायर प्रोटोकॉल

हर फ़्रेम `PayloadInterface` आकार का JSON होता है:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // the "room" — usually a UUID, sometimes "alerts" or "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, after connect, carries the socketId to use for room joins
  | "message"             // server → client, new message
  | "deleteMessage"       // server → client, message removed
  | "privateMessage"      // server → client, badge-count ping to the recipient's "alerts" room when a direct message escalates; the message body itself arrives via the ordinary "message" action inside the open conversation
  | "reaction"            // server → client, emoji reaction toggled on a message; data is { messageId, conversationId, personId, emoji, added } (added=false means removed). Broadcast to the conversation room by POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, secondary "something happened" signal for content-room subscribers
  | "attendance"          // server → client, viewer list / presence snapshot
  | "notification"        // server → client, generic notification (counts, etc.)
  | "reconnect"           // client-internal, dispatched locally by SocketHelper after a new socketId handshake completes following a drop — either an exponential-backoff reconnect after an unexpected close, or an immediate reconnect triggered by the resume probe (tab focus/visibility/online); never sent by the server
  | "alert" | "callout";  // legacy, see Connections endpoint reference
```

### हैंडशेक

1. क्लाइंट सॉकेट खोलता है और शाब्दिक स्ट्रिंग `"getId"` भेजता है।
2. सर्वर `{ action: "socketId", data: "<id>" }` के साथ जवाब देता है।
3. क्लाइंट `socketId` सेव करता है और उसे हर रूम सब्सक्रिप्शन के तीसरे निर्देशांक के रूप में इस्तेमाल करता है।

### रूम में शामिल होना

"रूम" बस एक `(churchId, conversationId)` टपल है। सब्सक्राइब करने के लिए क्लाइंट एक `Connection` रो पोस्ट करता है:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null for anonymous live stream viewers
    "displayName": "Anonymous4823"
  }
]
```

पोस्ट करने पर उस conversation में `attendance` ब्रॉडकास्ट भी होता है, ताकि मौजूदा सब्सक्राइबर जान सकें कि कोई नया दर्शक जुड़ा है।

### संदेश भेजना

`POST /messaging/messages/send` (अनामी उपयोगकर्ताओं के लिए अनुमति) या `POST /messaging/messages/` (प्रमाणीकरण आवश्यक):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

सर्वर संदेश सेव करता है, फिर `DeliveryHelper.sendConversationMessages()` उस `conversationId` की हर कनेक्शन रो खोजता है और हर सॉकेट को `{ action: "message", data: <message> }` फ़्रेम भेजता है।

कंटेंट से जुड़े conversations (जैसे किसी व्यक्ति से जुड़े नोट्स) के लिए, `action: "conversationActivity"` वाला दूसरा ब्रॉडकास्ट synthetic `"content-{type}-{id}"` रूम पर जाता है। इससे लिस्ट-व्यू कंज़्यूमर को पता चलता है कि उन्हें रिफ़्रेश करना है, और उन्हें अंतर्निहित conversation खुला रखने की ज़रूरत नहीं पड़ती।

### रूम छोड़ना

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

यह कनेक्शन रो मिटाता है और एक अंतिम attendance ब्रॉडकास्ट करता है।

## सर्वर-साइड कंपोनेंट्स

| फ़ाइल | भूमिका |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | `WebSocketServer` का मालिक है। कनेक्ट होने पर `socketId` असाइन करता है। हर 30 सेकंड पर ping/pong हार्टबीट (`startHeartbeat`) चलाता है, जो किसी भी ऐसे कनेक्शन को `terminate()` करके साफ़ करता है जो pong मिस करता है। डिसकनेक्ट होने पर मृत सॉकेट साफ़ करता है और attendance दोबारा ब्रॉडकास्ट करता है। `getLiveSocketIds()` और `reapStaleConnections()` देता है, जिनका इस्तेमाल 30-मिनट वाला टाइमर जॉब पुरानी `connections` रो मिटाने के लिए करता है: लोकल पर यह देखकर कि कौन-से socketId अभी प्रोसेस में जीवित हैं, और AWS पर छूटे हुए `$disconnect` इवेंट्स के लिए 24 घंटे TTL बैकस्टॉप के रूप में (API Gateway कनेक्शन लगभग 2 घंटे पर सीमित करता है, इसलिए यह किसी जीवित कनेक्शन को नहीं हटा सकता) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` रूम के कनेक्शन पढ़ता है और हर फ़्रेम को लोकल सॉकेट या AWS API Gateway कनेक्शन पर भेजता है। `sendAttendance(churchId, conversationId)` दर्शक स्नैपशॉट बनाकर ब्रॉडकास्ट करता है |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` जॉइन करता है, `DELETE /:churchId/:conversationId/:socketId` छोड़ता है, `POST /setName` डिस्प्ले नाम अपडेट करता है |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (अनामी) और `POST /` (प्रमाणित) संदेश सेव करके फ़ैन आउट करते हैं |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` यह तय करने का स्रोत है कि कौन सब्सक्राइब है |

## क्लाइंट-साइड प्रिमिटिव्स (`@churchapps/apphelper`)

पाँचों प्रिमिटिव्स `apphelper/src/helpers/` में स्टैटिक सिंगलटन हैं। वे मिलकर काम करते हैं, ताकि पेज पर चाहे जितने कंपोनेंट माउंट हों, हर टैब केवल **एक** WebSocket खोले।

### `SocketHelper`

एकमात्र WebSocket कनेक्शन का मालिक। री-एंट्रेंट `init()` idempotent है, यानी कई कंपोनेंट इसे बिना डुप्लिकेट सॉकेट खोले कॉल कर सकते हैं। यह ये उपलब्ध कराता है:

- `init()`: सॉकेट खोलता (या दोबारा इस्तेमाल करता) है और `getId` हैंडशेक पूरा करता है। हैंडशेक पूरा होने पर या 5 सेकंड के टाइमआउट के बाद, जब बैकग्राउंड रिट्राई लूप संभाल लेता है, तब resolve होता है। यह कभी reject नहीं होता, इसलिए कॉलर को पहले कनेक्ट विफल होने का विशेष इलाज नहीं करना पड़ता।
- `addHandler(action, id, fn)` / `removeHandler(id)`: `action` के आधार पर लिस्नर रजिस्टर/अनरजिस्टर करता है। एक ही action को कई हैंडलर सुन सकते हैं।
- `setPersonChurch({ personId, churchId })`: प्रमाणित कॉलर के लिए; `"alerts"` रूम सब्सक्रिप्शन शुरू करता है, ताकि पुश नोटिफ़िकेशन इस सॉकेट पर आएँ।
- `onSocketIdReady(fn)`: हर नए socketId पर फ़ायर होता है, सिर्फ़ पहली बार नहीं: शुरुआती हैंडशेक और हर बाद का रीकनेक्ट। `SubscriptionManager` इसका उपयोग लंबित जॉइन फ़्लश करने के लिए करता है।
- `checkConnection()`: नीचे दिए resume listeners द्वारा कॉल होता है; अगर सॉकेट पहले से बंद है तो तुरंत रीकनेक्ट करता है, और अगर खुला लगता है तो liveness probe भेजता है।

**रीकनेक्ट लाइफ़साइकल।** अनपेक्षित बंद होने पर exponential backoff के साथ रीकनेक्ट शेड्यूल होता है (1 सेकंड से शुरू, हर बार दोगुना, 30 सेकंड की सीमा तक)। `SocketHelper` `window`/`document` पर `online`, `focus`, `pageshow`, और `visibilitychange` भी सुनता है, ताकि फिर से सक्रिय हुए टैब का पता चले। अगर सॉकेट पहले से बंद है तो यह तुरंत रीकनेक्ट करता है और backoff रीसेट करता है। अगर वह खुला लगता है, तो `"getId"` liveness probe भेजता है और 3 सेकंड में कोई फ़्रेम न आने पर ज़बरदस्ती रीकनेक्ट करता है। इससे उन "हाफ-ओपन" सॉकेट्स का पता चलता है जो मोबाइल OS द्वारा ऐप सस्पेंड करने पर छूट जाते हैं। सफल री-हैंडशेक के बाद, `SocketHelper` उस action के हर रजिस्टर्ड हैंडलर को स्थानीय `"reconnect"` action भेजता है (देखें [वायर प्रोटोकॉल](#wire-protocol))।

### `SubscriptionManager`

रेफ़रेंस-काउंटेड रूम सदस्यता। एक ही conversation को सब्सक्राइब करने वाले कई कंपोनेंट सर्वर पर केवल एक कनेक्शन रो रजिस्टर करते हैं।

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

कंज़्यूमर को मुफ़्त में मिलने वाले तीन व्यवहार:

- **डिबाउंस्ड लीव (300 ms):** React StrictMode के डबल माउंट/अनमाउंट और छोटे रीमाउंट चक्रों को झेल जाता है, बिना सर्वर-साइड सब्सक्रिप्शन गिराए। `reset()` लंबित डिबाउंस्ड लीव्स को भी रद्द करता है।
- **रीकनेक्ट रिजॉइन:** `SubscriptionManager` हर रूम में जॉइन करने के लिए इस्तेमाल किए गए `personId`/`displayName` याद रखता है। इसलिए `SocketHelper` के `"reconnect"` इवेंट पर (और हर `onSocketIdReady` कॉल पर) वह हर सक्रिय कनेक्शन रो को पहचान सहित दोबारा पोस्ट करता है। रिजॉइन हर socketId के लिए डिडुप किए जाते हैं, ताकि एक ही रीकनेक्ट में कोई रूम दो बार पोस्ट न हो।
- **बाद में बाइंड होने वाला socketId:** `joinRoom` हैंडशेक पूरा होने से पहले ही इरादा दर्ज कर लेता है, और वास्तविक `POST /connections` `onSocketIdReady` पर चलता है।

### `ConversationStore`

`conversationId` द्वारा कुंजीबद्ध इन-मेमोरी कैश। यह `message` / `deleteMessage` / `privateMessage` सॉकेट हैंडलर केवल एक बार रजिस्टर करता है और आने वाले फ़्रेम को उन conversations पर लागू करता है जो इस समय खुली हैं।

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ uses /messages/conversation/:id when authenticated, /messages/catchup/:churchId/:id when anonymous

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render with the latest snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optional explicit cleanup
```

प्रमाणित कॉलर्स को **लोगों की हाइड्रेशन** भी मिलती है। आने वाले संदेशों के `personId` को कैश्ड `GET /people/ids` लुकअप के ज़रिए `PersonInterface` ऑब्जेक्ट्स में बदला जाता है। अनामी कॉलर्स इसे छोड़ देते हैं।

`SocketHelper` के `"reconnect"` इवेंट पर, `ConversationStore` हर उस conversation को दोबारा लाता है जिसके पास इस समय सक्रिय `subscribe` लिस्नर हैं, ताकि सॉकेट बंद रहते छूटे संदेश वापस मिल जाएँ। अनामी conversations में यह कैच-अप तब छोड़ा जाता है जब उनका `churchId` कभी रिकॉर्ड नहीं हुआ था (कैच-अप एंडपॉइंट को उसकी ज़रूरत होती है)।

### `PresenceStore`

`attendance` action के लिए `ConversationStore` के पैटर्न जैसा ही। सब्सक्राइबर को `PresenceSnapshot { conversationId, totalViewers, viewers }` तब मिलता है जब भी सर्वर प्रेज़ेंस दोबारा ब्रॉडकास्ट करता है। एक जैसे स्नैपशॉट सूचित करने से पहले डिडुप हो जाते हैं, ताकि रीकनेक्ट के तूफ़ान से अनावश्यक री-रेंडर न हों।

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

**प्रमाणित** कॉलर्स के लिए शीर्ष-स्तरीय बूट। यह `SocketHelper.init()` को रैप करता है, व्यक्ति/चर्च संदर्भ सेट करता है (जो `"alerts"` रूम में अपने-आप जॉइन करता है), और `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` को ठीक एक बार कॉल करता है। यह अपना `"reconnect"` हैंडलर भी रजिस्टर करता है, जो नोटिफ़िकेशन और PM गिनती दोबारा लोड करता है, ताकि ड्रॉप हुए कनेक्शन के बाद बैज वापस आ जाएँ।

```typescript
await NotificationService.getInstance().initialize(userContext);
```

अनामी फ़्लो (लाइव स्ट्रीम चैट इसका मुख्य उदाहरण है) `NotificationService` को छोड़ते हैं और प्रिमिटिव्स को सीधे कॉल करते हैं। एक संदर्भ कार्यान्वयन के लिए `B1App/src/helpers/StreamChatManager.ts` देखें।

## लाइव स्ट्रीम चैट

लाइव स्ट्रीम इस फ़्रेमवर्क का सबसे बड़ा अनामी उपभोक्ता है। रूम स्कोप करने के लिए इसमें दो `contentType` इस्तेमाल होते हैं:

- `streamingLive`: `/stream` पर सार्वजनिक चैट टैब (हर `streamingService` के लिए एक रूम)।
- `streamingLiveHost`: एक निजी रूम, जो केवल `contentApi.chat.host` अनुमति वाले स्टाफ़ को दिखता है। रूम आईडी सर्वर पर एन्क्रिप्ट की जाती है (`GET /streamingServices/:id/hostChat`), ताकि आम स्क्रैपिंग से वह उजागर न हो।

`B1App/src/helpers/StreamChatManager.ts` दोनों रूम को एकीकृत प्रिमिटिव्स के ज़रिए बूट करता है। अब लाइव स्ट्रीम के लिए कोई अलग सॉकेट कोड नहीं है।

## पैटर्न और सावधानियाँ

- **अपना WebSocket न खोलें।** `SocketHelper` एक कारण से सिंगलटन है। अगर आपको कोई कस्टम action सुनना है, तो `SocketHelper.addHandler` के ज़रिए मौजूदा सॉकेट पर हैंडलर रजिस्टर करें।
- **`SubscriptionManager` को बायपास न करें।** सीधे `POST /connections` कॉल काम करते हैं, लेकिन इनमें रेफ़रेंस काउंटिंग, डिबाउंस्ड लीव और रीकनेक्ट रिजॉइन नहीं होते। ग्रुप चैट और PM कंज़्यूमर सब `SubscriptionManager` के माध्यम से चलते हैं।
- **हैंडलर आईडी हर action के लिए यूनिक होनी चाहिए।** `SocketHelper.addHandler(action, id, fn)` `(action, id)` से कुंजीबद्ध करता है; दो लिस्नर के लिए एक ही आईडी दोबारा इस्तेमाल करने पर पहला हैंडलर बदल जाता है। एकीकृत स्टोर्स `"ConversationStore-Message"` और `"PresenceStore-Attendance"` जैसी आईडी इस्तेमाल करते हैं, ताकि वे कंज़्यूमर की आईडी से न टकराएँ।
- **रूम आईडी अपारदर्शी स्ट्रिंग हैं।** ज़्यादातर conversation UUID होते हैं, लेकिन सिस्टम `"alerts"` (हर व्यक्ति की नोटिफ़िकेशन), `"content-{type}-{id}"` (synthetic गतिविधि रूम), और एन्क्रिप्टेड `streamingLiveHost` आईडी भी सपोर्ट करता है।
- **प्रमाणीकरण REST सीमा पर जाँचा जाता है, सॉकेट पर नहीं।** `POST /connections` से रूम जॉइन करना अनामी उपयोगकर्ताओं के लिए अनुमत है; एक्सेस कंट्रोल संदेश भेजने के समय होता है (मैसेज कंट्रोलर तय करता है कि अनामी कॉलर कौन-से `messageType` भेज सकता है)।

## संबंधित पेज

- [नोटिफ़िकेशन आर्किटेक्चर](./architecture/notifications) -- वह इन-ऐप/पुश/ईमेल एस्केलेशन फ़नल, जिसमें यह ट्रांसपोर्ट डेटा देता है
- [मैसेजिंग एंडपॉइंट्स](./api/endpoints/messaging) -- संदेशों, conversations, कनेक्शनों और डिवाइसों के लिए पूरा REST सेट
- [वेब पुश नोटिफ़िकेशन](./web-push) -- ब्राउज़र पुश, जो पेज के अंदर के सॉकेट डिलीवरी से अलग है
- [AppHelper](./shared-libraries/app-helper) -- वह npm पैकेज जो क्लाइंट प्रिमिटिव्स शिप करता है
- [मॉड्यूल स्ट्रक्चर](./api/module-structure) -- सर्वर-साइड पर मैसेजिंग मॉड्यूल कैसे व्यवस्थित है
