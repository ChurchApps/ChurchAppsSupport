---
title: "वेब पुश सूचनाएं"
---

# वेब पुश सूचनाएं

<div class="article-intro">

ChurchApps वेब ऐप्स W3C Web Push API के माध्यम से पुश सूचनाएं भेजते हैं -- वही तंत्र जो सर्वर साइड पर Firebase Cloud Messaging इस्तेमाल करता है, लेकिन यहां डिलीवरी FCM के बजाय ब्राउज़र के मूल `PushManager` से होती है। MessagingApi पर एक एकल VAPID key pair हर उपभोक्ता (B1Admin, B1App, भविष्य के PWAs) को कवर करता है।

</div>

## पुश कब चलता है {#when-push-fires}

पुश `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`) में एक ही डिलीवरी पास का एक स्तर है: पहले एक इन-ऐप प्राथमिकता गेट, फिर सॉकेट डिलीवरी और पुश एक ही पास में प्रयास किए जाते हैं (हर एक अपने प्राथमिकता गेट के पीछे), फिर ईमेल। जिस प्राप्तकर्ता ने श्रेणी म्यूट की है, वह पुश तक कभी नहीं पहुंचता। सॉकेट डिलीवरी सफल होने पर अब पुश नहीं रुकता -- हर सूचना प्रकार अब उसी तरह व्यवहार करता है जैसे निजी संदेश हमेशा करते थे, ताकि बैकग्राउंड में पड़ी इंस्टॉल की गई PWA फिर भी OS-स्तरीय सूचना दिखाए, भले ही सॉकेट डिलीवरी पहले ही हो चुकी हो; डुप्लिकेट बैनर इसके बजाय सर्विस वर्कर द्वारा क्लाइंट-साइड पर दबाए जाते हैं (देखें [सर्विस वर्कर आवश्यकता](#service-worker-requirement))। निर्धारित रिमाइंडर और स्टाफ द्वारा शुरू किए गए ब्रॉडकास्ट सीधे पुश स्तर से शुरू होते हैं, सॉकेट चरण को पूरी तरह छोड़ते हुए। ईमेल टाइमर-आधारित रहता है, और इस पास के हिस्से के रूप में नहीं बल्कि अपने शेड्यूल पर अपठित पंक्तियों को बढ़ाते हुए चलता है।

पुश तक पहुंचने वाले सबसे आम रास्ते:

1. **Content notifications** — उस बातचीत का जवाब जिसे व्यक्ति फ़ॉलो करता है, एक मेंशन, या `NotificationHelper.createNotifications()` के माध्यम से भेजी गई कोई अन्य घटना।
2. **Private messages** — सीधा संदेश उसी डिलीवरी फ़ंक्शन से जाता है और हमेशा सॉकेट डिलीवरी के साथ पुश का प्रयास करता है।
3. **Scheduled reminders** — इवेंट, टास्क और सर्विंग रिमाइंडर, जिन्हें रिमाइंडर इंजन विस्तारित करके भेजता है, और जो नई घटनाएं सीधे पुश स्तर से शुरू करता है।
4. **Staff-triggered pushes** — एकल या समूह ब्रॉडकास्ट के लिए `POST /messaging/notifications/create`, `/ping`, और `/group/send`।

## सर्वर फ़्लो

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app preference gate                  ← muted recipients stop here, no push
       ├─ same pass, both attempted (neither gates the other):
       │    ├─ socket delivery via DeliveryHelper  ← skipped for reminders/broadcasts (they start at push)
       │    └─ push preference gate
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signed POST → browser push service
       └─ email preference gate → timer-driven, escalates unread rows separately
```

### आवश्यक पर्यावरण चर

VAPID keys `Environment` में संग्रहीत होती हैं, और पुश सक्षम करने के लिए मौजूद होनी चाहिए:

| चर | विवरण |
|----------|-------------|
| `webPushPublicKey` | VAPID सार्वजनिक key (base64url)। `GET /messaging/webpush/publicKey` के माध्यम से क्लाइंट्स को लौटाई जाती है |
| `webPushPrivateKey` | VAPID निजी key। हर बाहरी पुश पर हस्ताक्षर करने के लिए उपयोग होती है |
| `webPushSubject` | पुश सेवाओं को रिपोर्ट किया गया `mailto:` URI। डिफ़ॉल्ट `mailto:support@churchapps.org` है |

`WebPushHelper.isEnabled()` `false` लौटाता है जब दोनों में से कोई भी key गायब हो -- मैसेजिंग मॉड्यूल चलता रहता है, पुश डिलीवरी बस कुछ नहीं करती।

### VAPID key pair बनाना

```bash
npx web-push generate-vapid-keys
```

आउटपुट को अपनी `.env` (लोकल) में, या डिप्लॉय किए गए वातावरण में AWS SSM Parameter Store में जोड़ें। Keys बदलने से हर मौजूदा सब्सक्रिप्शन अमान्य हो जाता है -- क्लाइंट्स को अगले पेज लोड पर फिर से enroll होना होगा।

## स्टोरेज मॉडल

Web Push सब्सक्रिप्शन मौजूदा `devices` टेबल में FCM डिवाइस रिकॉर्ड के साथ संग्रहीत होते हैं। वे `fcmToken` कॉलम पर `webpush:` प्रिफ़िक्स से अलग पहचाने जाते हैं:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

इससे एक ही `loadByPersonId` कॉल किसी उपयोगकर्ता के enroll किए गए हर डिवाइस को लौटा सकती है, प्लेटफ़ॉर्म चाहे जो हो। `WebPushHelper.isWebPushToken(token)` और `decodeSubscription(token)` प्रिफ़िक्स लॉजिक संभालते हैं।

## Endpoints

Base path: `/messaging/webpush`

| विधि | पथ | प्रमाणीकरण | विवरण |
|--------|------|------|-------------|
| GET | `/publicKey` | सार्वजनिक | `{ publicKey, enabled }` लौटाता है। क्लाइंट `publicKey` को `pushManager.subscribe({ applicationServerKey })` को पास करते हैं |
| POST | `/subscribe` | JWT | प्रमाणित उपयोगकर्ता के लिए एक सब्सक्रिप्शन रजिस्टर (या अपसर्ट) करता है। Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | सार्वजनिक | ऐसी कोई भी डिवाइस पंक्ति हटाता है जिसके `fcmToken` में दिया गया endpoint हो। Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | सर्वर-साइड id से एक विशिष्ट डिवाइस पंक्ति हटाता है |

## क्लाइंट प्रिमिटिव: `WebPushHelper`

`@churchapps/apphelper` का `WebPushHelper` एकल क्लाइंट-साइड एंट्री पॉइंट है। होस्ट इसे एक बार बूट पर कॉन्फ़िगर करते हैं और लॉगिन के बाद `subscribe()` कॉल करते हैं।

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// In your app's bootstrap (e.g., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; matches sw.js registration
  appName: "B1AppPwa"        // stored on the device row, useful for filtering by surface
});

// After login (and after every userChurch change)
await WebPushHelper.subscribe();
```

उपभोक्ताओं को मुफ़्त में मिलने वाले व्यवहार:

- **Capability check** — `isSupported()` उन ब्राउज़रों पर `false` लौटाता है जिनमें `serviceWorker` / `PushManager` / `Notification` नहीं है।
- **Cooldown** — `canPromptNow()` `localStorage` के माध्यम से प्रॉम्प्ट के बीच 7-दिन का cooldown लागू करता है, ताकि OS प्रॉम्प्ट खारिज करने वाले उपयोगकर्ताओं से हर सत्र में फिर न पूछा जाए।
- **Opt-out** — `setOptedOut(true)` और `unsubscribe()` फिर से प्रॉम्प्ट होने से रोकते हैं और सर्वर-साइड डिवाइस पंक्ति हटाते हैं।
- **Standalone-PWA detection** — `isStandalone()` होस्ट्स को iOS पुश प्रॉम्प्ट को "उपयोगकर्ता ने PWA को होम स्क्रीन पर इंस्टॉल किया है" के पीछे रखने देता है (iOS केवल इंस्टॉल किए गए PWAs से पुश की अनुमति देता है)।
- **Re-enroll on church switch** — `refreshEnrollment()` उपयोगकर्ता से फिर से प्रॉम्प्ट किए बिना मौजूदा ब्राउज़र सब्सक्रिप्शन को नए `userChurch` के लिए फिर से पोस्ट करता है। इसे `userChurch` बदलाव हैंडलर से कॉल करें।

### सर्विस वर्कर आवश्यकता {#service-worker-requirement}

ब्राउज़र का `PushManager` तभी सब्सक्रिप्शन हल करता है जब कॉन्फ़िगर किए गए scope पर सर्विस वर्कर रजिस्टर हो। ChurchApps PWAs सर्विस वर्कर जनरेशन के लिए [Serwist](https://serwist.dev/) (Next.js ऐप्स) या workbox का उपयोग करते हैं। चूंकि सर्वर अब हमेशा सॉकेट डिलीवरी के साथ पुश का प्रयास करता है (देखें [पुश कब चलता है](#when-push-fires)), इसलिए सर्विस वर्कर डुप्लिकेशन रोकने का बिंदु है: इसका `push` हैंडलर `showNotification` तब दबाना चाहिए जब कोई फ़ोकस्ड/दिखाई देने वाला क्लाइंट पहले से सूचना के डीप-लिंक लक्ष्य पर हो, लेकिन ऐप बैज को बैनर दिखा या न दिखा हो, हमेशा अपडेट करना चाहिए:

```javascript
// public/sw.js (or whatever Serwist/workbox emits)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // always runs, even if the banner is suppressed

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Same pathname; for private messages, also same conversationId.
    const alreadyViewing = clients.some((client) => (client.focused || client.visibilityState === "visible") && clientMatchesTarget(client.url, target));
    if (alreadyViewing) return;

    await self.registration.showNotification(title, {
      body: data.body,
      data: { type: data.type, contentId: data.contentId, url: target },
      icon: "/icons/icon-192.png"
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { url: target } = event.notification.data || {};
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });

    const exact = clients.find((client) => clientMatchesTarget(client.url, target));
    if (exact) return exact.focus(); // already on the target: focus, don't navigate

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` उपभोक्ता-विशिष्ट हैं -- संदर्भ कार्यान्वयन के लिए `B1App/src/app/sw.ts` देखें। B1App `privateMessage` को `/mobile/messages/:personId` पर रूट करता है, B1Admin `notification` को अपने alerts पैनल पर रूट करता है, आदि।

## परिचालन नोट्स

- **`gone: true` परिणाम** — `WebPushHelper.sendBulk` प्रति प्राप्तकर्ता `{ token, success, gone, errorMessage }` लौटाता है। `gone: true` परिणाम (पुश सेवा ने `404` या `410` दिया) का अर्थ है कि सब्सक्रिप्शन स्थायी रूप से अमान्य है; `NotificationHelper` में नीचे का कोड उन डिवाइस पंक्तियों को हटा देता है ताकि उन्हें फिर से न आज़माया जाए।
- **TTL** — पुश संदेश `TTL: 86400` (24 घंटे) के साथ भेजे जाते हैं। अगर उपयोगकर्ता का ब्राउज़र 24 घंटों के भीतर पुश सेवा से कनेक्ट नहीं होता, तो पुश हटा दिया जाता है।
- **कोई पुनः प्रयास नहीं** — अस्थायी विफलता (timeout, 5xx) लॉग होती है और दोबारा प्रयास नहीं होता। पुश सर्वोत्तम-प्रयास है; पेज के भीतर का सॉकेट और ईमेल सूचना स्तर टिकाऊपन संभालते हैं।
- **अक्षम वातावरण** — डेव वातावरण में VAPID keys खाली छोड़ी जा सकती हैं; `WebPushHelper.isEnabled()` `false` लौटाएगा और पुश short-circuit हो जाएंगे। जिन वातावरणों की अपनी VAPID पहचान नहीं है, उनके लिए यही इच्छित व्यवहार है।

## संबंधित पेज

- [Notifications Architecture](./architecture/notifications) -- पूरा इन-ऐप/पुश/ईमेल एस्केलेशन फ़नल और रिमाइंडर इंजन
- [Real-time Architecture](./realtime) -- WebSocket डिलीवरी; पुश अब उसी इन-ऐप फ़नल से सॉकेट डिलीवरी के साथ उसी पास में चलता है, केवल तब का फ़ॉलबैक नहीं जब सॉकेट डिलीवरी न पहुंचे
- [Messaging Endpoints](./api/endpoints/messaging) -- सूचनाएं, डिवाइस, और messaging की बाकी सतह
- [AppHelper](./shared-libraries/app-helper) -- npm पैकेज जो `WebPushHelper` भेजता है
